import { React } from '../../shared/modules/React';

// import Box from '@mui/material/Box';
import logoImage from '../../assets/images/curatelyLogo.png';

import { useNavigate } from 'react-router-dom';
// import Grid from '@mui/material/Grid';
import './Login.scss';
// import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { useFormik, Yup } from '../../shared/modules/Formik';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { useAuth } from '../../shared/services/auth/validating';
// import { checkAuth } from '../../shared/services/auth/auth';
import { Grid, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '../../shared/modules/commonImports';
import { showToaster } from '../shared/SnackBar/SnackBar';

const validationSchema = Yup.object({
    userName: Yup
        .string()
        // .email('Enter a valid email')
        .required('User Name is required'),
    password: Yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

const Login = () => {
    const navigate = useNavigate();
    let auth = useAuth();
    // if (checkAuth.checkSignIn()) {
    //     navigate("/home");
    // }

    const formik = useFormik({
        initialValues: {
            userName: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // alert(JSON.stringify(values, null, 2));
            if (values.userName === "admin" && values.password === "12345678") {

                auth.signIn(values.userName, () => {
                    // Send them back to the page they tried to visit when they were
                    // redirected to the login page. Use { replace: true } so we don't create
                    // another entry in the history stack for the login page.  This means that
                    // when they get to the protected page and click the back button, they
                    // won't end up back on the login page, which is also really nice for the
                    // user experience.
                    // navigate(from, { replace: true });
                    navigate("/home");
                });
            } else {
                showToaster('Enter Valid Credentials.', 'error');
            }
        },
    });
    const [values, setValues] = React.useState({
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({
            showPassword: !values.showPassword,
        });
    };
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
        <div>
            <div>
                <img src={logoImage} alt="" className="logoImg"></img>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <Grid container direction="row" justifyContent="flex-end" alignItems="center"
                    id={"bgImg"}>
                    <Grid container direction="column" justifyContent="space-evenly" alignItems="stretch" id={"loginDiv"}>
                        <Grid justifyContent="center" alignItems="center" container direction="column" spacing="0px">
                            <div className="cusH1">Log in into Account</div>
                            <div className="mat-h4">Please enter valid credentials to proceed...</div>
                            {/* <div className="mat-h4">Username: admin</div>
                            <div className="mat-h4">Password: 12345678</div> */}
                        </Grid>
                        <Grid container direction="column" justifyContent="space-evenly" alignItems="stretch" id={"loginFields"}>
                            <TextField
                                fullWidth
                                id="userName"
                                name="userName"
                                label="User Name"
                                value={formik.values.userName}
                                onChange={formik.handleChange}
                                error={formik.touched.userName && Boolean(formik.errors.userName)}
                                helperText={formik.touched.userName && formik.errors.userName}
                            />
                            {/* <TextField
                                fullWidth
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            /> */}
                            <FormControl variant="outlined">
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <OutlinedInput
                                    id="password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>
                            {/* <TextField label="User Email" variant="outlined" size="small" />
                            <TextField label="Password" variant="outlined" size="small" /> */}
                        </Grid >
                        <Grid container direction="row" justifyContent="center" alignItems="center">
                            {/* <Button component={Link} to="/dashboard" variant="outlined" href="dashboard">
                                Login
                            </Button> */}
                            <Button color="primary" variant="contained" fullWidth type="submit">
                                Login
                            </Button>
                        </Grid>
                    </Grid >
                </Grid >
            </form>

        </div >
    );
}

export default Login;
