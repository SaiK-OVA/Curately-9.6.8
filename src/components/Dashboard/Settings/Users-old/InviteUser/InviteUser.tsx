// import React, { useState } from 'react';
import { useState } from '../../../../../shared/modules/React';
import {Grid} from '../../../../../shared/modules/MaterialImports/Grid';
import {Dialog, DialogTitle, DialogContent} from '../../../../../shared/modules/MaterialImports/Dialog';
import {Divider} from '../../../../../shared/modules/MaterialImports/Divider';
import CloseIcon from '@mui/icons-material/Close';
import {TextField} from '../../../../../shared/modules/MaterialImports/TextField';
import {MenuItem} from '../../../../../shared/modules/MaterialImports/Menu';
import { useFormik, Yup } from "../../../../../shared/modules/Formik";
import ErrorMessage from '../../../../shared/Error/ErrorMessage';
import './InviteUser.scss'



const InviteUser = ({ open, closePopup}: {
    open: boolean;
    closePopup: () => void;
}) => {


    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const initialInviteUserDetails = {
        "email": "",
        "role": "",
    }
    const inviteUserSchema = Yup.object().shape({
        "email": Yup.string().required('Email is required.'),
        "role": Yup.string().required('Role is required.'),
    });
    const inviteUserFormik = useFormik({
        initialValues: initialInviteUserDetails,
        validationSchema: inviteUserSchema,
        onSubmit: () => {
            invite();
        },
    });
    const invite = () => {
        setIsFormSubmitted(true);
        console.log(inviteUserFormik.values);
    }


    return (
        <div>
            <Dialog
                open={open} className='AddUserModal customInputs'>
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
                <DialogContent className='py-2'>
                    <div>
                        <form
                            onSubmit={inviteUserFormik.handleSubmit}
                        >
                            <Grid container spacing={2} className='mb-2'>
                                <Grid size={12}>
                               



                    <label className='inputLabel'>Email<span style={{ color: 'red' }}>*</span></label>
                                    <textarea className='textarea' name="email" id="email" value={inviteUserFormik.values.email} onChange={inviteUserFormik.handleChange}
                                    />
                                    <ErrorMessage formikObj={inviteUserFormik} name={'email'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} className='mb-2'>
                                <Grid size={12}>
                                    <label className='inputLabel'>Role<span style={{ color: 'red' }}>*</span></label>
                                    <TextField fullWidth className='mt-1'
                                        size="small"
                                        variant="outlined"
                                        select
                                        name="role" id="role" value={inviteUserFormik.values.role} onChange={inviteUserFormik.handleChange}
                                    >
                                        <MenuItem value="Admin">Admin</MenuItem>
                                    </TextField>
                                    <ErrorMessage formikObj={inviteUserFormik} name={'role'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                </Grid>
                            </Grid>
                            <button type="submit" className="send" onClick={invite}>
                                <span>Send Invitation</span>
                            </button>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default InviteUser