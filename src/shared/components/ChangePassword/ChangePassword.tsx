import { useState } from "../../modules/React";
import { Dialog, DialogContent, CloseIcon, DialogTitle, DialogActions } from '../../modules/MaterialImports/Dialog';
import { Divider } from '../../modules/MaterialImports/Divider';
import { Button, TextField, InputAdornment } from '../../modules/commonImports';
import { Grid } from '../../modules/MaterialImports/Grid';
import { useFormik, Yup } from "../../modules/Formik";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ErrorMessage from "../../../components/shared/Error/ErrorMessage";
import { trackPromise } from "../../modules/PromiseTrackter";
import ApiService from '../../api/api';
import { userLocalData } from "../../services/userData";
import { showToaster } from "../../modules/commonImports";
import './ChangePassword.scss';
const ChangePassword = ({ open, closePopup }:
    { open: boolean, closePopup: () => void }) => {
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const initialChangePasswordDetails = {
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    }
    const changePasswordSchema = Yup.object().shape({
        currentPassword:Yup.string().required(),
        newPassword:Yup.string().label('new password').required( ).oneOf([Yup.ref('newPassword'), ""], 'Passwords must match'),
        confirmNewPassword: Yup.string().label('confirm new password').required().oneOf([Yup.ref('newPassword'), ""], 'Passwords must match'),
    })
    const addChangePasswordFormik = useFormik({
        initialValues: initialChangePasswordDetails,
        validationSchema: changePasswordSchema,
        onSubmit: () => {
            password();
        },
    });
    const password = () => {
        setIsFormSubmitted(true);
        console.log(addChangePasswordFormik.values);
        // https://qaadminapi.curately.ai/curatelyAdmin/changePassword
        const changePasswordDetails = {
            clientId: userLocalData.getvalue('clientId'),
            recrId: userLocalData.getvalue('recrId'),
            currentPassword: addChangePasswordFormik.values.currentPassword,
            newPassword: addChangePasswordFormik.values.newPassword,
            // confirmnewPassword: addChangePasswordFormik.values.confirmNewPassword,
        }
        trackPromise(
            ApiService.postWithData("admin", 'changePassword', changePasswordDetails)
                .then((response) => {
                    // console.log(response);
                    if (response.data.Success) {
                        showToaster(response.data.Message, 'success');
                        closePopup();
                    } else {
                        showToaster(response.data.Message ? response.data.Message : "An error occured while updating Password", 'error');
                    }
                }
                )
        )
    }
    const handleClickShowCurrentPassword = () => setShowCurrentPassword((show) => !show);
    const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
    const handleClickConfirmPassword = () => setShowConfirmPassword((show) => !show);


    return (
        <div id='changepassword'>
            <Dialog maxWidth={'sm'} fullWidth={true}
                open={open}>
                <DialogTitle className='py-2'>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <span>Change Password</span>
                        <span onClick={closePopup}>
                            <CloseIcon />
                        </span>
                    </Grid>
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <div>
                        <form onSubmit={addChangePasswordFormik.handleSubmit}>
                            <Grid container className="mb-1">
                                <Grid size={12} className='mt-1'>
                                    <label className='inputLabel'>Current Password</label>
                                    <TextField fullWidth className='mt-1'
                                        variant="outlined"
                                        type={showCurrentPassword ? 'text' : 'password'}
                                        size="small"
                                        id="currentPassword"
                                        name="currentPassword"
                                        value={addChangePasswordFormik.values.currentPassword}
                                        onChange={addChangePasswordFormik.handleChange}
                                        inputProps={{
                                            autoComplete: 'new-password',
                                        }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    {showCurrentPassword ? <VisibilityOff onClick={handleClickShowCurrentPassword} className='cursor-pointer' /> : <Visibility onClick={handleClickShowCurrentPassword} className='cursor-pointer' />}
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                    <ErrorMessage formikObj={addChangePasswordFormik} name={'currentPassword'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                </Grid>
                            </Grid>
                            <Grid container className="mb-1 mt-1">
                                <Grid size={12} className='mt-1'>
                                    <label className='inputLabel'>New Password</label>
                                    <TextField fullWidth className='mt-1'
                                        variant="outlined"
                                        type={showNewPassword ? 'text' : 'password'}
                                        size="small"
                                        id="newPassword"
                                        name="newPassword"
                                        value={addChangePasswordFormik.values.newPassword}
                                        onChange={addChangePasswordFormik.handleChange}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    {showNewPassword ? <VisibilityOff onClick={handleClickShowNewPassword} className='cursor-pointer' /> : <Visibility onClick={handleClickShowNewPassword} className='cursor-pointer' />}
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                    <ErrorMessage formikObj={addChangePasswordFormik} name={'newPassword'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                </Grid>
                            </Grid>
                            <Grid container className="mb-1 mt-1">
                                <Grid size={12} className='mt-1'>
                                    <label className='inputLabel'>Confirm New Password</label>
                                    <TextField fullWidth className='mt-1'
                                        variant="outlined"
                                        size="small"
                                        id="confirmNewPassword"
                                        name="confirmNewPassword"
                                        value={addChangePasswordFormik.values.confirmNewPassword}
                                        onChange={addChangePasswordFormik.handleChange}
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    {showConfirmPassword ? <VisibilityOff onClick={handleClickConfirmPassword} className='cursor-pointer' /> : <Visibility onClick={handleClickConfirmPassword} className='cursor-pointer' />}
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                    <ErrorMessage formikObj={addChangePasswordFormik} name={'confirmNewPassword'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" variant='contained' size="small" onClick={password}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ChangePassword;