import { React, useState } from '../../../../shared/modules/React';
import { Grid, TextField, InputAdornment, Button } from "../../../../shared/modules/commonImports";
import { Card, CardContent } from '../../../../shared/modules/MaterialImports/Card';
import { MenuItem } from '../../../../shared/modules/MaterialImports/Menu';
import Visibility from '@mui/icons-material/Visibility';
import ErrorMessage from '../../../shared/Error/ErrorMessage';
import { useFormik, Yup } from "../../../../shared/modules/Formik";
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './Registration.scss'
const Registration = () => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);



    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const initialRegistrationDetails = {
        "email": "",
        "firstName": "",
        "lastName": "",
        "phone": "",
        "timeZone": "",
        "newPassword": "",
        "confirmPassword": "",
    }
    const registrationSchema = Yup.object().shape({
        "email": Yup.string().required('Email  is required.'),
        "firstName": Yup.string().required('First Name  is required.'),
        "lastName": Yup.string().required('Last Name  is required.'),
        "phone": Yup.string().required('Phone is required.'),
        "timeZone": Yup.string().required('Time Zone  is required.'),
        "newPassword": Yup.string().required('New Password  is required.'),
        "confirmPassword": Yup.string().required('Confirm Password  is required.'),
    });
    const registerUserFormik = useFormik({
        initialValues: initialRegistrationDetails,
        validationSchema: registrationSchema,
        onSubmit: () => {
            register();
        },
    });
    const register = () => {
        setIsFormSubmitted(true);
        console.log(registerUserFormik.values);
    }






    return (
        <div>
            <form
                onSubmit={registerUserFormik.handleSubmit}
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <h3>Complete Registration</h3>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="start"
                >
                    <Card className='customCard' sx={{ width: '650px !important' }}>

                        <CardContent>

                            <h4>Enter Details</h4>
                            <Grid container spacing={2}>
                                <Grid size={6} className='mb-1'>
                                    <label className='inputLabel'>Email Address<span style={{ color: 'red' }}>*</span></label>
                                    <TextField fullWidth className='mt-1'
                                        variant="outlined"
                                        type="text"
                                        size="small"
                                        id="email"
                                        name="email"
                                        value={registerUserFormik.values.email}
                                        onChange={registerUserFormik.handleChange}
                                    />
                                    <ErrorMessage formikObj={registerUserFormik} name={'email'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
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
                                        value={registerUserFormik.values.firstName}
                                        onChange={registerUserFormik.handleChange}
                                    />
                                    <ErrorMessage formikObj={registerUserFormik} name={'firstName'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                </Grid>
                                <Grid size={6}>
                                    <label className='inputLabel'>Last Name<span style={{ color: 'red' }}>*</span> </label>
                                    <TextField fullWidth className='mt-1'
                                        variant="outlined"
                                        type="text"
                                        size="small"
                                        id="lastName"
                                        name="lastName"
                                        value={registerUserFormik.values.lastName}
                                        onChange={registerUserFormik.handleChange}
                                    />
                                    <ErrorMessage formikObj={registerUserFormik} name={'lastName'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid size={6}>
                                    <label className='inputLabel'>Phone Number<span style={{ color: 'red' }}>*</span> </label>
                                    <TextField fullWidth className='mt-1'
                                        variant="outlined"
                                        type="text"
                                        size="small"
                                        id="phone"
                                        name="phone"
                                        value={registerUserFormik.values.phone}
                                        onChange={registerUserFormik.handleChange}
                                    />
                                    <ErrorMessage formikObj={registerUserFormik} name={'phone'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
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
                                        value={registerUserFormik.values.timeZone}
                                        onChange={registerUserFormik.handleChange}
                                    >
                                        <MenuItem value="GMT">GMT</MenuItem>
                                    </TextField>
                                    <ErrorMessage formikObj={registerUserFormik} name={'timeZone'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="start"
                    className='mt-5'
                >
                    <Card className='customCard' sx={{ width: '650px !important' }}>

                        <CardContent>
                            <h4>Set Password</h4>
                            <Grid container spacing={2}>
                                <Grid size={6}>
                                    <label className='inputLabel'>New Password<span style={{ color: 'red' }}>*</span> </label>
                                    <TextField fullWidth className='mt-1'
                                        variant="outlined"
                                        type={showPassword ? 'text' : 'password'}
                                        size="small"
                                        label="Create Password"
                                        id="newPassword"
                                        name="newPassword"
                                        value={registerUserFormik.values.newPassword}
                                        onChange={registerUserFormik.handleChange}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">{showPassword ? <VisibilityOff /> : < Visibility />}
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                    <ErrorMessage formikObj={registerUserFormik} name={'newPassword'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                </Grid>
                                <Grid size={6}>
                                    <label className='inputLabel'>Confirm Password<span style={{ color: 'red' }}>*</span> </label>
                                    <TextField fullWidth
                                        className='mt-1'
                                        variant="outlined"
                                        type={showPassword ? 'text' : 'password'}
                                        size="small"
                                        label="Retype Password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={registerUserFormik.values.confirmPassword}
                                        onChange={registerUserFormik.handleChange}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    {showPassword ? <VisibilityOff onClick={handleClickShowPassword} /> : < Visibility />}
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                    <ErrorMessage formikObj={registerUserFormik} name={'confirmPassword'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="flex-end"
                >
                    <Button color="primary" variant="contained" className='mt-5' type="submit" onClick={register}>Save</Button>
                </Grid>

            </form>
        </div>
    )
}

export default Registration



