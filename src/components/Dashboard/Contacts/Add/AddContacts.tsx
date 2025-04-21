import { Button } from '../../../../shared/modules/MaterialImports/Button';

// import Stack from '@mui/material/Stack';
import { Typography } from '../../../../shared/modules/MaterialImports/Typography';
import { TextField, FormControlLabel } from '../../../../shared/modules/MaterialImports/FormInputs';
import { useFormik, Yup } from "../../../../shared/modules/Formik";
import { MenuItem } from '../../../../shared/modules/MaterialImports/Menu';
import { Grid } from '../../../../shared/modules/MaterialImports/Grid';
import { Box } from "../../../../shared/modules/MaterialImports/Box";
import './AddContacts.scss'
import { showToaster } from '../../../shared/SnackBar/SnackBar';
import ApiService from '../../../../shared/api/api';
import { Dialog, DialogContent, DialogTitle } from '../../../../shared/modules/MaterialImports/Dialog';

// import Divider from '@mui/material/Divider';

import { Checkbox } from '../../../../shared/modules/MaterialImports/FormElements';
// import CloseIcon from '@mui/icons-material/Close';
// import { DialogActions } from '@mui/material';
// import { MUIAutoComplete } from '../../../shared/MUIAutoComplete/MUIAutoComplete';
import ErrorMessage from '../../../shared/Error/ErrorMessage';
import { useRef, useState } from '../../../../shared/modules/React';
import { trackPromise } from '../../../../shared/modules/PromiseTrackter';
import { userLocalData } from '../../../../shared/services/userData';
import { MUIAutoComplete } from '../../../shared/MUIAutoComplete/MUIAutoComplete';
// import { InputMask } from 'primereact/inputmask';
import PhoneInput from '../../Candidate/ViewCandidate/PhoneInput';


const AddContacts = (
    { open, closePopup, add, contactData }: {
        open: boolean;
        closePopup: (refresh: boolean) => void;
        add: boolean;
        contactData: any;
    }
) => {

    // console.log(contactData);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const initialAddContactsDetails = contactData?.contId ? contactData : {
        // "companyName": "",
        "firstName": "",
        "lastName": "",
        "contEmail": "",
        "contEmail2": "",
        "mobile": "",
        "directPhone": "",
        "linkedIn": "",
        "jobTitle": "",
        "department": "",
        "pipelineStatus": "",
        "nle": false,
        "street": "",
        "city": "",
        "state": "",
        "stateName": "",
        "zipcode": "",
        "country": "",

    }
    const addcontactsSchema = Yup.object().shape({
        // "companyName": Yup.string(),
        // "companyId": Yup.string(),
        "firstName": Yup.string().trim().required('First Name is required.'),
        "lastName": Yup.string().trim().required('Last Name is required.'),
        "contEmail": Yup.string().email('Please enter Valid Email'),
        "contEmail2": Yup.string().email('Please enter Valid Email'),
        "mobile": Yup.string()
            .min(10, {
                message: "Please enter a valid phone number",
                excludeEmptyString: false,
            }),
        // .matches(/^((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}$/, {
        //         message: "Please enter a valid phone number",
        //         excludeEmptyString: false,
        //     }),
        "directPhone": Yup.string()
            .min(10, {
                message: "Please enter a valid phone number",
                excludeEmptyString: false,
            }),
        // .matches(/^((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}$/, {
        //      message: "Please enter a valid phone number",
        //      excludeEmptyString: false,
        //  }),
        "linkedIn": Yup.string(),
        "jobTitle": Yup.string(),
        "department": Yup.string(),
        "pipelineStatus": Yup.string().optional(),
        "nle": Yup.boolean(),
        "street": Yup.string(),
        "city": Yup.string(),
        "state": Yup.string(),
        "stateName": Yup.string(),
        "zipcode": Yup.string(),
        "country": Yup.string(),
        // "contactId": Yup.string(),
    });
    const saveForm = () => {
        setIsFormSubmitted(true);
        if ((addcontactsFormik.dirty || contactData.contId) && addcontactsFormik.isValid) {
            // console.log(addcontactsFormik.values);
            // Contacts/contacts_save.jsp



            // http://35.155.202.216:8080/QADemoCurately/saveOrUpdateContacts 
            // http://52.88.252.214:90/QADemoCurately/saveOrUpdateContacts 

            let tempData = {
                clientId: userLocalData.getvalue('clientId'),
                createdBy: userLocalData.getvalue('recrId'),
                contId: Number(contactData?.contId) ? Number(contactData.contId) : 0,
                firstName: addcontactsFormik.values.firstName.trim(),
                lastName: addcontactsFormik.values.lastName.trim(),
                contEmail: addcontactsFormik.values.contEmail,
                contEmail2: addcontactsFormik.values.contEmail2,
                mobile: addcontactsFormik.values.mobile,
                directPhone: addcontactsFormik.values.directPhone,
                compid: addcontactsFormik.values.compid,
                linkedIn: addcontactsFormik.values.linkedIn,
                jobTitle: addcontactsFormik.values.jobTitle,
                department: addcontactsFormik.values.department,
                pipelineStatus: addcontactsFormik.values.pipelineStatus,
                nle: addcontactsFormik.values.nle,
                street: addcontactsFormik.values.street,
                city: addcontactsFormik.values.city,
                state: addcontactsFormik.values.state,
                country: addcontactsFormik.values.country,
                zipcode: addcontactsFormik.values.zipcode,


            }
            trackPromise(
                ApiService.postWithData('admin', 'saveOrUpdateContacts ', tempData).then(
                    (response: any) => {
                        // console.log(response.data)
                        if (response.data.Success) {
                            showToaster('Contact has been saved Successfully.', 'success');
                            saveAuditLog(4131);
                            addcontactsFormik.resetForm();
                            closePopup(true);

                        } else {
                            showToaster((response.data.Message) ? response.data.Message : "An error occured while saving the Contact.", 'error')
                        }
                    }
                )
            )
        } else {
            if (!addcontactsFormik.values.firstName) {
                firstNameRef.current?.focus();
            }
            else {
                if (!addcontactsFormik.values.lastName) {
                    lastNameRef.current?.focus();
                }
                showToaster('Please fill all required fields.', 'error');
            }
        }
    }
    const addcontactsFormik = useFormik({
        initialValues: initialAddContactsDetails,
        validationSchema: addcontactsSchema,
        onSubmit: () => {
            saveForm();
        },
        validateOnMount: true
    });

    const saveAuditLog = (id: number) => {
        ApiService.saveAuditLog(id);
    }

    const firstNameRef = useRef<HTMLInputElement>();
    const lastNameRef = useRef<HTMLInputElement>();

    return (
        <Dialog
            maxWidth={'md'}
            // sx={{ width: 900, maxWidth: 900, minWidth: 900 }}
            fullWidth={false} open={open} className='AddContactModal customInputs' disableRestoreFocus >
            <DialogTitle
                className='py-2'
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <span className='addHeader'>
                        {contactData?.contId ? "Edit" : "Create New"} Contact
                    </span>
                    <div>
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
                                onClick={() => closePopup(false)}
                            >Cancel</Button>
                            <Button variant="contained"
                                type='button'
                                color="primary"
                                onClick={saveForm}
                            >{contactData?.contId ? "Update" : "Save"} Contact</Button>
                        </Grid>
                    </div>
                </Grid>
            </DialogTitle>
            <DialogContent className='px-0'>
                <form
                    onSubmit={addcontactsFormik.handleSubmit}
                >
                    <div className='addContacts-wrap'>
                        {/* <div className='header'>
                            <Typography variant='h4'>Create New Contact</Typography>
                            <Stack direction="row" justifyContent="flex-end">
                                <Button variant="text" className='btnSecondary mr-4 ' type='button' onClick={() => addcontactsFormik.resetForm()}>Cancel</Button>
                                <Button variant="text" type='button' className='btnPrimary' onClick={saveForm}>Save Contact</Button>
                            </Stack>
                        </div> */}
                        <div className='form-block'>
                            <Typography variant='h5' className='sub-heading'>Basic Information</Typography>
                            <div className='block-inner'>
                                {/* <Grid container spacing={2} className="mb-1">
                                    <Grid size={6} className='mt-1'>
                                        <label className='inputLabel'>Company Name</label><span style={{ color: 'red' }}>*</span> */}
                                {/* <TextField fullWidth className='mt-1'
                                            id="companyName"
                                            name="companyName"
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            value={addcontactsFormik.values.companyName}
                                            onChange={addcontactsFormik.handleChange}
                                        /> */}
                                {/* <MUIAutoComplete
                                            id='companyName'
                                            handleChange={(id: any, name: string) => {
                                                addcontactsFormik.setFieldValue("companyName", name);
                                                addcontactsFormik.setFieldValue("companyId", id);
                                            }}
                                            valuePassed={{}}
                                            isMultiple={false}
                                            width="100%"
                                            type='companyName'
                                            placeholder="" */}
                                {/* // error={(addcontactsFormik.errors.companyName && isFormSubmitted) ? true : false}
                                        /> */}
                                {/* <ErrorMessage formikObj={addcontactsFormik} name={'companyId'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                    </Grid>
                                </Grid> */}
                                <Grid container spacing={2} className="mb-1">
                                    <Grid size={6} className='mt-1'>
                                        <label className='inputLabel'>First Name</label><span style={{ color: 'red' }}>*</span>
                                        <TextField fullWidth className='mt-1'
                                            id="firstName"
                                            name="firstName"
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            margin="dense"
                                            autoFocus={true}
                                            inputRef={firstNameRef}
                                            value={addcontactsFormik.values.firstName}
                                            onChange={addcontactsFormik.handleChange}
                                            error={(addcontactsFormik.errors.firstName && isFormSubmitted) ? true : false}
                                        />
                                        <ErrorMessage formikObj={addcontactsFormik} name={'firstName'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                    </Grid>
                                    <Grid size={6} className='mt-1'>
                                        <label className='inputLabel'>Last Name</label><span style={{ color: 'red' }}>*</span>
                                        <TextField fullWidth className='mt-1'
                                            id="lastName"
                                            name="lastName"
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            inputRef={lastNameRef}
                                            value={addcontactsFormik.values.lastName}
                                            onChange={addcontactsFormik.handleChange}
                                            error={(addcontactsFormik.errors.lastName && isFormSubmitted) ? true : false}
                                        />
                                        <ErrorMessage formikObj={addcontactsFormik} name={'lastName'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} className="mb-1">
                                    <Grid size={6} className='mt-1'>
                                        <label className='inputLabel'>Job Title </label>
                                        <TextField fullWidth className='mt-1'
                                            id="jobTitle"
                                            name="jobTitle"
                                            type="text"
                                            size="small"
                                            value={addcontactsFormik.values.jobTitle}
                                            onChange={addcontactsFormik.handleChange}
                                        />
                                    </Grid>
                                    <Grid size={6} className='mt-1'>
                                        <label className='inputLabel'>Department</label>
                                        <TextField fullWidth className='mt-1'
                                            id="department"
                                            name="department"
                                            type="text"
                                            size="small"
                                            value={addcontactsFormik.values.department}
                                            onChange={addcontactsFormik.handleChange}
                                        />
                                    </Grid>

                                </Grid>
                                <Grid container spacing={2} className="mb-1">
                                    <Grid size={6} className='mt-1'>
                                        <label className='inputLabel'>Mobile Number</label>
                                        {/* <InputMask
                                            id="mobile"
                                            name="mobile"
                                            mask="(999) 999-9999"
                                            placeholder="(999) 999-9999"
                                            // /^((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}$/
                                            value={addcontactsFormik.values.mobile}
                                            onChange={(e) => {
                                                addcontactsFormik.setFieldValue('mobile', e.target.value);
                                            }}
                                            className='d-block p-3 mt-1 w-100 fs-13'
                                            autoClear={false}
                                        /> */}
                                        <PhoneInput
                                            id="mobile"
                                            name="mobile"
                                            placeholder="(999) 999-9999"
                                            value={addcontactsFormik.values.mobile}
                                            onChange={(e: any) => {
                                                addcontactsFormik.setFieldValue('mobile', e.target.value);
                                            }}
                                            className='Phone_input_addcontact d-block mt-1 w-100 fs-13'
                                            autoClear={false}
                                        />
                                        <ErrorMessage formikObj={addcontactsFormik} name={'mobile'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                        {/* <TextField fullWidth className='mt-1' id="mobile" name="mobile" variant="outlined" type="text" size="small" value={addcontactsFormik.values.mobile} onChange={addcontactsFormik.handleChange} /> */}

                                    </Grid>
                                    <Grid size={6} className='mt-1'>
                                        <label className='inputLabel'>Phone Number</label>
                                        {/* <InputMask
                                            id="directPhone"
                                            name="directPhone"
                                            mask="(999) 999-9999"
                                            placeholder="(999) 999-9999"
                                            // /^((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}$/
                                            value={addcontactsFormik.values.directPhone}
                                            onChange={(e) => {
                                                addcontactsFormik.setFieldValue('directPhone', e.target.value);
                                            }}
                                            className='d-block p-3 mt-1 w-100 fs-13'
                                            autoClear={false}
                                        /> */}
                                        <PhoneInput
                                            id="directPhone"
                                            name="directPhone"
                                            placeholder="(999) 999-9999"
                                            value={addcontactsFormik.values.directPhone}
                                            onChange={(e: any) => {
                                                addcontactsFormik.setFieldValue('directPhone', e.target.value);
                                            }}
                                            className='Phone_input_addcontact d-block mt-1 w-100 fs-13'
                                            autoClear={false}
                                        />
                                        <ErrorMessage formikObj={addcontactsFormik} name={'directPhone'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                        {/* <TextField fullWidth className='mt-1' id="directPhone" name="directPhone" variant="outlined" type="text" size="small" value={addcontactsFormik.values.directPhone} onChange={addcontactsFormik.handleChange} /> */}

                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} className="mb-1">
                                    <Grid size={6} className='mt-1'>
                                        <label className='inputLabel'>Primary Email </label>
                                        <TextField fullWidth className='mt-1'
                                            id="contEmail"
                                            name="contEmail"
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            value={addcontactsFormik.values.contEmail}
                                            onChange={addcontactsFormik.handleChange}
                                        />
                                        <ErrorMessage formikObj={addcontactsFormik} name={'contEmail'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                    </Grid>
                                    <Grid size={6} className='mt-1'>
                                        <label className='inputLabel'>Secondary Email </label>
                                        <TextField fullWidth className='mt-1'
                                            id="contEmail2"
                                            name="contEmail2"
                                            variant="outlined"
                                            type="email"
                                            size="small"
                                            value={addcontactsFormik.values.contEmail2}
                                            onChange={addcontactsFormik.handleChange}
                                        />
                                        <ErrorMessage formikObj={addcontactsFormik} name={'contEmail2'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} className="mb-1">
                                    <Grid size={6} className='mt-1'>
                                        <label className='inputLabel'>Linkedin</label>
                                        <TextField fullWidth className='mt-1'
                                            id="linkedIn"
                                            name="linkedIn"
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            value={addcontactsFormik.values.linkedIn}
                                            onChange={addcontactsFormik.handleChange}
                                        />
                                    </Grid>
                                    <Grid size={6} className='mt-1'>
                                        <Box>
                                            <label className='inputLabel'>Employer Pipeline Status</label>
                                            <TextField fullWidth className='inputLabel mt-1'
                                                id="pipelineStatus"
                                                name="pipelineStatus"
                                                size="small"
                                                select
                                                value={addcontactsFormik.values.pipelineStatus}
                                                onChange={addcontactsFormik.handleChange}
                                            >
                                                <MenuItem value="0"></MenuItem>
                                                <MenuItem value="1">0: Inactive</MenuItem>
                                                <MenuItem value="2">1: Target</MenuItem>
                                                <MenuItem value="4">2: Sendouts</MenuItem>
                                                <MenuItem value="6">3: Interviewing</MenuItem>
                                                <MenuItem value="7">4: $ Key Account $</MenuItem>
                                                <MenuItem value="9">5: New Lead</MenuItem>
                                                <MenuItem value="30">6: Non-Employer</MenuItem>
                                                <MenuItem value="31">7: Account</MenuItem>
                                                <MenuItem value="32">8: Human Resources</MenuItem>
                                                <MenuItem value="33">9: Interviewer</MenuItem>
                                                <MenuItem value="34">10: Client</MenuItem>
                                            </TextField>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} className="mb-1">
                                    <Grid size={6} className='mt-1'>
                                        <FormControlLabel
                                            // value="end"
                                            control={
                                                <Checkbox
                                                    id="nle"
                                                    name='nle'
                                                    size='small'
                                                    value={addcontactsFormik.values.nle}
                                                    onChange={(e, checked) => addcontactsFormik.setFieldValue('nle', checked)}
                                                    checked={addcontactsFormik.values.nle}
                                                />
                                            }
                                            label="NLE"
                                            labelPlacement="end"
                                        />
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                        <div className='form-block'>
                            <Typography variant='h5' className='sub-heading'>Location</Typography>
                            <div className='block-inner'>
                                <Grid container spacing={2} className="mb-1">
                                    <Grid size={12} className='mt-1'>
                                        <label className='inputLabel'>Address</label>
                                        <TextField fullWidth className='mt-1'
                                            id="street"
                                            name="street"
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            value={addcontactsFormik.values.street}
                                            onChange={addcontactsFormik.handleChange}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} className="mb-1">
                                    <Grid size={6} className='mt-1'>
                                        <label className='inputLabel'>City</label>
                                        <TextField fullWidth className='mt-1'
                                            id="city"
                                            name="city"
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            value={addcontactsFormik.values.city}
                                            onChange={addcontactsFormik.handleChange}
                                        />
                                    </Grid>
                                    <Grid size={6} className='mt-1'>
                                        <label className='inputLabel'>State</label>
                                        <MUIAutoComplete
                                            id="state"
                                            handleChange={(id: any, name: string) => {
                                                addcontactsFormik.setValues({
                                                    ...addcontactsFormik.values,
                                                    state: id,
                                                    stateName: name
                                                });
                                            }}
                                            valuePassed={
                                                (addcontactsFormik.values.state) ?
                                                    { label: addcontactsFormik.values.stateName, id: addcontactsFormik.values.state } : {}
                                            }
                                            isMultiple={false}
                                            // width="200px"
                                            type='states'
                                            placeholder=""
                                        />

                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} className="mb-1">
                                    <Grid size={6} className='mt-1'>
                                        <label className='inputLabel'>Zip Code</label>
                                        <TextField fullWidth className='mt-1'
                                            id="zipcode"
                                            name="zipcode"
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            value={addcontactsFormik.values.zipcode}
                                            onChange={addcontactsFormik.handleChange}
                                        />
                                    </Grid>
                                    <Grid size={6} className='mt-1'>
                                        <label className='inputLabel'>Country</label>
                                        <TextField fullWidth className='mt-1'
                                            id="country"
                                            name="country"
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            value={addcontactsFormik.values.country}
                                            onChange={addcontactsFormik.handleChange}
                                        />
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </div>
                </form >
            </DialogContent >
            {/* <DialogActions></DialogActions> */}
        </Dialog>
    )
}

export default AddContacts