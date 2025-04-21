import { Fragment, useState } from '../../../../../shared/modules/React'
import { Grid } from '../../../../../shared/modules/MaterialImports/Grid';
import { Dialog, DialogContent, CloseIcon, DialogTitle } from '../../../../../shared/modules/MaterialImports/Dialog'
import { FormControl, InputLabel } from '../../../../../shared/modules/MaterialImports/FormInputs';
import { MenuItem } from '../../../../../shared/modules/MaterialImports/Menu';
import { Yup, useFormik } from '../../../../../shared/modules/Formik';
import { Divider } from '../../../../../shared/modules/MaterialImports/Divider';
import ErrorMessage from '../../../../shared/Error/ErrorMessage';
import { MUIAutoComplete } from '../../../../shared/MUIAutoComplete/MUIAutoComplete';
import { showToaster } from '../../../../shared/SnackBar/SnackBar';
import { trackPromise } from '../../../../../shared/modules/PromiseTrackter';
import ApiService from "../../../../../shared/api/api";
import { userLocalData } from '../../../../../shared/services/userData';
import './InviteUser.scss'
import { Select } from '../../../../../shared/modules/MaterialImports/FormElements';
import { Button } from '../../../../../shared/modules/MaterialImports/Button';


interface Role {
    roleId: string;
    roleName: string;
}
const InviteUser = ({ open, closePopup, roleData }: {
    open: boolean;
    closePopup: () => void;
    roleData: Role[];

}) => {
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const initialInviteUserDetails = {
        "users": "",
        "role": "",
    }
    const inviteUserSchema = Yup.object().shape({
        "users": Yup.string().required('Users are required.'),
        "role": Yup.string().required('Role is required.'),
    });
    const inviteUserFormik = useFormik({
        initialValues: initialInviteUserDetails,
        validationSchema: inviteUserSchema,
        onSubmit: () => {
            // console.log(inviteUserFormik.values)
            handleInviteUser()
        },
    });

    const handleInviteUser = () => {
        const requestData = {
            roleId: inviteUserFormik.values.role,
            recrId: inviteUserFormik.values.users,
            clientId: userLocalData.getvalue('clientId'),
            senderEmail: userLocalData.getvalue('email'),
            senderName: userLocalData.getvalue('userName')

        };
        trackPromise(
            ApiService.postWithData("admin", 'recruiterInvite', requestData)
                .then((response) => {
                    // console.log(response.data);
                    if (response.data.Message === "Success") {
                        showToaster("Invitation sent successfully", "success");
                        inviteUserFormik.resetForm()
                        closePopup()

                    } else {
                        showToaster("Failed to send the invitation: " + response.data.Message, "error");
                    }
                })
                .catch((error) => {
                    console.error("Failed to send the invite:", error);
                    showToaster("An error occurred while sending the invite", "error");
                })
        );
    }

    const saveAuditLog = (id: number) => {
        ApiService.saveAuditLog(id);
    }

    return (

        <Dialog
            open={open} maxWidth="sm" fullWidth >
            <DialogTitle className='py-2'>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <span style={{ fontWeight: 'bold' }}>Invite Users</span>
                    <span onClick={closePopup}>
                        <CloseIcon />
                    </span>
                </Grid>
            </DialogTitle>
            <Divider />
            <DialogContent>

                <form
                    onSubmit={inviteUserFormik.handleSubmit}
                >
                    <Grid
                        container

                    >
                        <Grid size={12} className='m-1'>
                            <MUIAutoComplete
                                id='collaborator'
                                handleChange={(id: any, name: string) => {
                                    // console.log(id, name)
                                    inviteUserFormik.setFieldValue('users', id);
                                }}
                                valuePassed={[]
                                }
                                isMultiple={true}
                                width="100%"
                                type='id'
                                placeholder={
                                    <Fragment>
                                        Invite Users
                                        <span style={{ color: 'red' }}> *</span>
                                    </Fragment>
                                }
                            />
                            <ErrorMessage formikObj={inviteUserFormik} name={'users'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                        </Grid>


                        <Grid size={12} className='m-1'>
                            <FormControl fullWidth size="small">
                                <InputLabel id="role-select-label">Role <span style={{ color: 'red' }}>*</span></InputLabel>
                                <Select
                                    labelId="role-select-label"
                                    id="role-select"
                                    value={inviteUserFormik.values.role}
                                    onChange={inviteUserFormik.handleChange}
                                    label="Role" name="role"
                                >
                                    {roleData.map((role) => (
                                        <MenuItem key={role.roleId} value={role.roleId}>
                                            {role.roleName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <ErrorMessage formikObj={inviteUserFormik} name={'role'} isFormSubmitted={isFormSubmitted}></ErrorMessage>

                        </Grid>

                        <Grid size={12} container justifyContent="end">

                            <Button type='submit' variant='contained' color='primary' onClick={() => saveAuditLog(4220)}>
                                <span>Send Invitation</span>
                            </Button>
                        </Grid>

                    </Grid>
                </form>

            </DialogContent>
        </Dialog>

    )
}

export default InviteUser