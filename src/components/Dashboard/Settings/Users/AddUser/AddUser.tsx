import { useEffect, useCallback, useState } from '../../../../../shared/modules/React'
import { Grid } from '../../../../../shared/modules/MaterialImports/Grid2';
import { MenuItem } from '../../../../../shared/modules/MaterialImports/Menu';
import Visibility from '@mui/icons-material/Visibility';
import { Button } from '../../../../../shared/modules/MaterialImports/Button';
import ErrorMessage from '../../../../shared/Error/ErrorMessage';
import { Yup, useFormik } from '../../../../../shared/modules/Formik';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Dialog, DialogContent, DialogTitle } from '../../../../../shared/modules/MaterialImports/Dialog';
import { TextField, InputAdornment } from '../../../../../shared/modules/MaterialImports/FormInputs';
import { Divider } from '../../../../../shared/modules/MaterialImports/Divider';
import { trackPromise } from "../../../../../shared/modules/PromiseTrackter";
import { showToaster } from '../../../../shared/SnackBar/SnackBar';
import ApiService from '../../../../../shared/api/api'
import './AddUser.scss'
import { AxiosResponse } from 'axios';
import { userLocalData } from '../../../../../shared/services/userData';
import { RoleDataInterface } from '../../Roles/Roles';
// import { InputMask } from "primereact/inputmask";
import { Loader } from '../../../../shared/Loader/Loader';
import { debounce } from "lodash";
import PasswordChecklist from "react-password-checklist";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import PhoneInput from '../../../Candidate/ViewCandidate/PhoneInput';
import { userEmailValidation } from '../../../../../shared/data/FreeEmailDomains/FreeEmailDomains';

const AddUser = ({ open, closePopup, add, userData }: {
    open: boolean;
    closePopup: (addOrCancel: 'add' | '') => void;
    userData: any;
    add: boolean;
}) => {

    const [showPassword, setShowPassword] = useState(false);
    const [showChecklist, setShowChecklist] = useState(false);
    // const [isPasswordValid, setIsPasswordValid] = useState(false);
    // const [password, setPassword] = useState("")

    // const handlePasswordChange = (e: any) => {
    //     const value = e.target.value;
    //     setPassword(value);
    //     // setIsFocused(value.length > 0);

    //     addUserFormik.setFieldValue('password', value);
    // };
    // const [confirmPassword, setConfirmPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    // const handleClickShowConfirmPassword = () => setConfirmPassword((prev) => !prev);

    // const clientdomain = userLocalData.getvalue('email').split('@')[1];


    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const initialAddUserDetails = userData?.recrId ? userData : {
        "email": "",
        "firstName": "",
        "lastName": "",
        "phone": "",
        "timezone": "",
        "password": "",
        // "confirmPassword": "",
        "statusId": "",
        "roleId": "",
    }
    // console.log(userData);
    const addUserSchema = (isUpdate: any) => Yup.object().shape({
        email: userEmailValidation,
        firstName: Yup.string().required('First Name is required.'),
        lastName: Yup.string().required('Last Name is required.'),
        phone: Yup.string().required('Phone is required.')
            // .matches(/^((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}$/, {
            //     message: "Please enter a valid phone number",
            //     excludeEmptyString: false,
            // })
            .min(10, 'Please enter a valid phone number')
            .test('no-all-zeros', 'Phone number cannot be all zeros', value => {
                const stringValue = value ?? '';
                return !/^((\(\d{3}\) ?)|(\d{3}-))?000-0000$/.test(stringValue);
            }),
        timeZone: Yup.string().required('Time Zone is required.'),
        password: isUpdate ? Yup.string().notRequired() : Yup.string()
            .min(8, "Must Contain 8 Characters")
            .required('Password is required.')
            .matches(/^(?=.*[a-z])/, "Must Contain One Lowercase Character")
            .matches(/^(?=.*[A-Z])/, "Must Contain One Uppercase Character")
            .matches(/^(?=.*[0-9])/, "Must Contain One Number")
            .matches(/^(?=.*[!@#\$%\^&\*])/, "Must Contain One Special Character"),
        // confirmPassword: Yup.string()
        //     .when('password', {
        //         is: (password: any) => !!password,
        //         then: (f:any) => f.oneOf([Yup.ref('password')], 'Passwords must match')
        //     }),
        statusId: Yup.string().required('Status is required.'),
        roleId: Yup.string().required('Role is required.'),
    });

    const register = (_isUpdate?: any) => {
        setIsFormSubmitted(true);
        const isRoleValid = roleData.some(role => role.roleId === addUserFormik.values.roleId);

        if (!isRoleValid) {
            showToaster('Please select a valid role.', 'error');
            addUserFormik.setFieldValue('roleId', "");
            return;
        }

        if (addUserFormik.isValid) {
            const validatePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?&])[A-Za-z\d@$!#%*?&]{8,}$/;
            // if (add) {
            if (!validatePassword.test(addUserFormik.values.password)) {
                showToaster('Please enter Valid Password', 'error');
                return false;
            }
            // }

            const userDetailsData = {
                clientId: userLocalData.getvalue('clientId'),
                action: userData?.recrId ? 'update' : 'save',
                rfirstName: addUserFormik.values.firstName,
                rlastName: addUserFormik.values.lastName,
                fullName: addUserFormik.values.fullName,
                email: addUserFormik.values.email,
                phone: (addUserFormik.values.phone) ? addUserFormik.values.phone.replace(/[^0-9]/g, '') : '',
                timezone: addUserFormik.values.timeZone,
                recrId: userData?.recrId || "",
                createdBy: userLocalData.getvalue('recrId'),
                password: addUserFormik.values.password,
                status: addUserFormik.values.statusId,
                roleId: addUserFormik.values.roleId,
            };

            trackPromise(
                ApiService.postWithData("admin", 'getRecruiterAction', userDetailsData)
                    .then((response: AxiosResponse) => {
                        if (response.data.Success) {
                            showToaster(`User has been ${userData?.recrId ? 'updated' : 'added'} Successfully`, 'success');
                            addUserFormik.resetForm();
                            closePopup("add");
                        } else {
                            showToaster((response.data.Message) ? response.data.Message : "An error occurred while saving the User.", 'error');
                        }
                    })
            );
        } else {
            showToaster('Please fill all required fields.', 'error');
        }
    };

    const addUserFormik = useFormik({
        initialValues: initialAddUserDetails,
        validationSchema: addUserSchema(userData?.recrId), // Pass whether it's an update or not
        onSubmit: () => {
            setIsFormSubmitted(true);
        },
        validateOnMount: true,
        validateOnChange: true,
        validateOnBlur: true,
    });



    const [roleData, setRoleData] = useState<RoleDataInterface[]>([]);
    const [statusData, setStatusData] = useState<{ statusId: string; statusName: string }[]>([]);
    const getRolesList = useCallback(debounce(() => {
        // http://35.155.202.216:8080/QADemoCurately/getRoleList
        trackPromise(
            ApiService.getCall('admin', `getRoleList/${userLocalData.getvalue('clientId')}`)
                .then((response: AxiosResponse) => {
                    const respData = response.data;
                    if (respData.Success) {
                        setRoleData(respData.list);
                    }
                })
        )
    }, 600), [])

    const getStatusList = useCallback(debounce(() => {
        console.log('statuslist')
        // https://app.curately.ai/Accuick_API/Curately/Admin/recruiters_status_list.jsp?clientId=3
        let clientId = userLocalData.getvalue('clientId');
        let recrId = userLocalData.getvalue('recrId');
        trackPromise(
            ApiService.getCall("admin", `getRecruitersStatusList/${clientId}/${recrId}`)
                .then((response: AxiosResponse) => {
                    const respData = response.data;
                    if (respData.Success === true) {
                        setStatusData(respData.list);
                    }
                })
        )
    }, 600), [])

    useEffect(() => {
        getRolesList();
        getStatusList();
    }, [])

    const saveAuditLog = (id: number) => {
        ApiService.saveAuditLog(id);
    }

    return (
        (<div>
            <Dialog maxWidth={'sm'} fullWidth={true}
                open={open} className='AddUserModal customInputs' id="AddUserDialog">
                <DialogTitle className='py-2'>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <span className='addHeader'>
                            {add ? "Add" : "Edit"} User
                        </span>
                        <div id="AddUser">
                            <Grid
                                container
                                direction="row"
                                justifyContent="end"
                                alignItems="center"
                            >
                                {/* <CloseIcon /> onClick={() => closePopup()}  */}
                                <Button variant="outlined"
                                    type='button'
                                    color="secondary"
                                    className='mr-2'
                                    onClick={() => { closePopup(""); saveAuditLog(4222) }}
                                >Cancel</Button>
                                <Button variant="contained"
                                    type='button'
                                    color="primary"
                                    onClick={() => { register(); saveAuditLog(4223) }}
                                >{add ? "Save" : "Update"} User</Button>
                            </Grid>
                        </div>
                        {/* <span style={{ fontWeight: 'bold',marginLeft:'50px' }}>Add User</span> */}
                        {/* <span onClick={closePopup}>
                            <CloseIcon />
                        </span> */}
                    </Grid>
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <Loader />
                    <div className='registerPanelDiv'>
                        <Grid container spacing={2}>
                            <Grid size={6} className='mb-1 pr-2'>
                                <label className='inputLabel'>Email Address<span style={{ color: 'red' }}>*</span></label>
                                <TextField fullWidth className='mt-1'
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    id="email"
                                    name="email"
                                    // InputProps={{
                                    //     endAdornment: <InputAdornment sx={{ fontWeight: "bold" }} variant="filled" position="end">@{clientdomain}</InputAdornment>,
                                    // }}

                                    value={addUserFormik.values.email}
                                    // onChange={(e) => { addUserFormik.setFieldValue('email', (e.target.value) ? e.target.value?.split('@')[0] : "") }}
                                    onChange={(e) => {
                                        addUserFormik.handleChange(e);
                                        addUserFormik.setFieldTouched("email", true, false);
                                        addUserFormik.validateField("email")
                                    }}
                                    onBlur={addUserFormik.handleBlur}
                                />
                                <ErrorMessage formikObj={addUserFormik} name={'email'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid size={6} className='mb-1'>
                                <label className='inputLabel'>First Name<span style={{ color: 'red' }}>*</span> </label>
                                <TextField fullWidth className='mt-1'
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    id="firstName"
                                    name="firstName"
                                    value={addUserFormik.values.firstName}
                                    onChange={addUserFormik.handleChange}
                                />
                                <ErrorMessage formikObj={addUserFormik} name={'firstName'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                            </Grid>
                            <Grid size={6}>
                                <label className='inputLabel'>Last Name<span style={{ color: 'red' }}>*</span> </label>
                                <TextField fullWidth className='mt-1'
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    id="lastName"
                                    name="lastName"
                                    value={addUserFormik.values.lastName}
                                    onChange={addUserFormik.handleChange}
                                />
                                <ErrorMessage formikObj={addUserFormik} name={'lastName'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid size={6}>
                                <label className='inputLabel'>Phone Number<span style={{ color: 'red' }}>*</span> </label>
                                <PhoneInput
                                    id="phone"
                                    name="phone"
                                    placeholder="(999) 999-9999"
                                    value={addUserFormik.values.phone}
                                    onChange={(e: any) => {
                                        addUserFormik.setFieldValue('phone', e.target.value);
                                    }}
                                    className='phoneinput_adduser d-block mt-1 w-100 fs-13'
                                    autoClear={false}
                                    onBlur={() => addUserFormik.validateField('phone')}
                                />
                                {/* <InputMask
                                    id="phone"
                                    name="phone"
                                    mask="(999) 999-9999"
                                    placeholder="(999) 999-9999"
                                    // /^((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}$/
                                    value={addUserFormik.values.phone}
                                    onChange={(e) => {
                                        addUserFormik.setFieldValue('phone', e.target.value);
                                    }}
                                    className='d-block p-3 mt-1 w-100 fs-13'
                                    autoClear={false}
                                    onBlur={() => addUserFormik.validateField('phone')}
                                /> */}
                                {/* <TextField fullWidth className='mt-1'
                                        variant="outlined"
                                        type="text"
                                        size="small"
                                        id="phone"
                                        name="phone"
                                        value={addUserFormik.values.phone}
                                        onChange={addUserFormik.handleChange}
                                    /> */}
                                <ErrorMessage formikObj={addUserFormik} name={'phone'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                            </Grid>
                            <Grid size={6}>
                                <label className='inputLabel'>Time Zone<span style={{ color: 'red' }}>*</span> </label>
                                <TextField fullWidth className='mt-1'
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    select
                                    id="timeZone"
                                    name="timeZone"
                                    value={addUserFormik.values.timeZone}
                                    onChange={addUserFormik.handleChange}
                                >
                                    <MenuItem value="EST">EST</MenuItem>
                                    <MenuItem value="CST">CST</MenuItem>
                                    <MenuItem value="MST">MST</MenuItem>
                                    <MenuItem value="PST">PST</MenuItem>
                                </TextField>
                                <ErrorMessage formikObj={addUserFormik} name={'timeZone'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid size={6} className='mb-1'>
                                <label className='inputLabel'>Status<span style={{ color: 'red' }}>*</span> </label>
                                <TextField fullWidth className='mt-1'
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    id="statusId"
                                    name="statusId"
                                    value={addUserFormik.values.statusId}
                                    onChange={addUserFormik.handleChange}
                                    select
                                >
                                    {
                                        statusData.map((val) => {
                                            return <MenuItem key={val.statusId} value={val.statusId} >{val.statusName}</MenuItem>
                                        })
                                    }
                                </TextField>
                                <ErrorMessage formikObj={addUserFormik} name={'statusId'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                            </Grid>
                            <Grid size={6}>
                                <label className='inputLabel'>Role<span style={{ color: 'red' }}>*</span> </label>
                                <TextField fullWidth className='mt-1'
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    id="roleId"
                                    name="roleId"
                                    value={addUserFormik.values.roleId}
                                    onChange={addUserFormik.handleChange}
                                    select
                                >
                                    {
                                        roleData.map((val) => {
                                            return <MenuItem key={val.roleId} value={val.roleId} >{val.roleName}</MenuItem>
                                        })
                                    }
                                </TextField>
                                <ErrorMessage formikObj={addUserFormik} name={'roleId'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                            </Grid>
                        </Grid>
                    </div>
                    {/* ${userData.recrId ? 'd-none' : ""} */}
                    <div className={`registerPanel`}>
                        <Grid container spacing={2}>
                            <Grid size={6}>
                                <label className='inputLabel'>Password<span style={{ color: 'red' }}>*</span> </label>
                                <TextField fullWidth className='mt-1'
                                    variant="outlined"
                                    type={showPassword ? 'text' : 'password'}
                                    size="small"
                                    id="password"
                                    name="password"
                                    onFocus={() => {
                                        setShowChecklist(true);
                                    }}
                                    onBlur={() => {
                                        setShowChecklist(false);
                                    }}
                                    value={addUserFormik.values.password}
                                    onChange={(e) => {
                                        const passwordWithoutSpaces = e.target.value.replace(/\s/g, ''); // Remove spaces from input
                                        addUserFormik.setFieldValue('password', passwordWithoutSpaces);
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                {showPassword ? <VisibilityOff onClick={handleClickShowPassword} className='cursor-pointer' /> : <Visibility onClick={handleClickShowPassword} className='cursor-pointer' />}
                                            </InputAdornment>
                                        )
                                    }}
                                    inputProps={{
                                        autoComplete: 'new-password',
                                    }}
                                />

                                <PasswordChecklist
                                    rules={["minLength", "specialChar", "number", "capital", "lowercase"]}
                                    minLength={8}
                                    value={addUserFormik.values.password} // Updated to match Formik value
                                    // onChange={(isValid) => {
                                    //     setIsPasswordValid(isValid);
                                    // }}
                                    invalidTextColor="Inherited color"
                                    style={{
                                        display: (addUserFormik.values.password && showChecklist) ? "block" : "none",
                                        fontSize: "13px",
                                        marginTop: "2px",
                                        position: 'absolute',
                                        overflowY: 'auto',
                                        overflowX: 'hidden',
                                        background: '#fff',
                                        bottom: '-98px',
                                        boxShadow: "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
                                        borderRadius: '4px',
                                        padding: '12px'
                                    }}
                                    iconComponents={{
                                        ValidIcon: <CheckCircleIcon className='fs-14 mr-2 c-green' />,
                                        InvalidIcon: <ErrorOutlineIcon className='fs-14 mr-2' />
                                    }}
                                />

                                <ErrorMessage formikObj={addUserFormik} name={'password'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                            </Grid>
                        </Grid>

                    </div>

                </DialogContent>
            </Dialog>
        </div>)
    );
}

export default AddUser;



