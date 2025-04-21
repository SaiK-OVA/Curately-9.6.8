import { KeyboardEvent, useContext } from 'react';
import { useEffect, useState } from '../../shared/modules/React';

// import Box from '@mui/material/Box';
import logoImage from '../../assets/images/curatelyLogo.png';

import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
// import Grid from '@mui/material/Grid';
// import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { useFormik, Yup } from '../../shared/modules/Formik';
import { useAuth } from '../../shared/services/auth/validating';
// import { checkAuth } from '../../shared/services/auth/auth';
import { TextField, FormControlLabel } from '../../shared/modules/MaterialImports/FormInputs';
import { Checkbox } from '../../shared/modules/MaterialImports/FormElements';
import { trackPromise } from '../../shared/modules/PromiseTrackter';
import ApiService from '../../shared/api/noTokenApi';
import { showToaster } from '../shared/SnackBar/SnackBar';

import { ClientNameStore } from '../../App';
import { useAuth0 } from '@auth0/auth0-react';

// import { Button } from '@mui/material';
import ErrorMessage from '../shared/Error/ErrorMessage';
import { ContinuousLoader } from '../shared/ContinuousLoader/ContinuousLoader';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, InputAdornment } from '../../shared/modules/commonImports';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

import { Grid } from '../../shared/modules/MaterialImports/Grid2';

import { cookieStore } from '../../shared/services/cookies/cookies';
// import EncryptDecryptService from '../../shared/services/encryption/encrypt-decrypt.service';
import ReactPasswordChecklist from 'react-password-checklist';
// import { data } from '../Dashboard/Resume/SearchBot/makeData';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';


import './Login.scss';

const validationSchema = Yup.object({
    userEmail: Yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: Yup
        .string()
        // .min(4, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

const ForgotvalidationSchema = Yup.object({
    userEmailCheck: Yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    confirmuserEmailCheck: Yup
        .string()
        .email('Email a valid email')
        .oneOf([Yup.ref('userEmailCheck')], 'Email does not match')
        .required('Confirm Email is required'),
});

const ResetPasswordvalidationSchema = Yup.object({
    resetPassword: Yup.string()
        .min(8, "Must Contain 8 Characters")
        .required('Password is required.')
        .matches(/^(?=.*[a-z])/, "Must Contain One Lowercase Character")
        .matches(/^(?=.*[A-Z])/, "Must Contain One Uppercase Character")
        .matches(/^(?=.*[0-9])/, "Must Contain One Number")
        .matches(/^(?=.*[!@#\$%\^&_\*])/, "Must Contain One Special Character"),
    confirmResetPassword: Yup.string().min(8, "Must Contain 8 Characters")
        .required('Confirm Password is required')
        .matches(/^(?=.*[a-z])/, "Must Contain One Lowercase Character")
        .matches(/^(?=.*[A-Z])/, "Must Contain One Uppercase Character")
        .matches(/^(?=.*[0-9])/, "Must Contain One Number")
        .matches(/^(?=.*[!@#\$%\^&_\*])/, "Must Contain One Special Character")
        .oneOf([Yup.ref('resetPassword')], 'Password does not match')
});

const Login = () => {

    const location = useLocation();
    const { pathname } = location;

    const [isForgotPage, setForgotPage] = useState(false);
    const [isResetPage, setResetPage] = useState(false);

    // https://appqa.curately.ai/#/login?invite=3f071c2a-c49c-4520-bdb5-535c4d59c57d&email=sombabub@ovahq.com

    const [searchParams] = useSearchParams();
    const referralCode = searchParams.get("referral") ? searchParams.get("referral") : "";
    const inviteCode = searchParams.get("invite") ? searchParams.get("invite") : "";
    const emailFromUrl = searchParams.get("email") ? searchParams.get("email") : "";
    const tokenFromUrl = searchParams.get("token") ? searchParams.get("token") : "";



    const [_clientName, setClientName] = useContext(ClientNameStore);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [clientsList, setClientsList] = useState<{ id: number; status: boolean; name: string; logo: string; }[]>([]);
    const handleClickShowPassword = () => setShowPassword((show) => !show);



    const [showResetChecklist, setShowResetChecklist] = useState(false);
    const [showResetConfirmChecklist, setShowResetConfirmChecklist] = useState(false);


    const [hideForAuth, setHideForAuth] = useState(false);
    const {
        isAuthenticated,
        loginWithRedirect,
        user,
        isLoading
    } = useAuth0();

    useEffect(() => {
        console.log(user);
        console.log("isAuthenticated", isAuthenticated);
        if (pathname === '/forgot') {
            setForgotPage(true);
            setHideForAuth(true);
        } else if ((pathname === '/reset') || (pathname === '/password-reset')) {
            setResetPage(true);
            setHideForAuth(true);
        }
        else if (isAuthenticated && user?.email) {
            trackPromise(
                ApiService.getByParams(193, 'Curately/Admin/auth0Login.jsp', { userEmail: (user?.email ? user?.email.toLowerCase() : "") }).then(
                    (response: any) => {
                        // console.log(response.data);
                        if (response.data.recrId) {
                            auth.signIn(response.data, "", () => {
                                // console.log(response.data);
                                setClientName(response.data.shortName.toLowerCase());
                                navigate(`/${response.data.shortName.toLowerCase()}/home`);
                            });
                        } else {
                            showToaster('Please enter Valid Credentials.', 'error');
                            setHideForAuth(true);
                        }
                    }
                )
            )
        } else {
            if (isForgotPage) {
                setForgotPage(false);
            }
            if (isResetPage) {
                setResetPage(false);
            }
            setTimeout(() => {
                setHideForAuth(true);
            }, 1000);
        }
    }, [user, isAuthenticated, location]);

    // useEffect(() => {
    //     console.log(isLoading);
    // },[isLoading]);
    // console.log(isLoading);


    const navigate = useNavigate();
    let auth = useAuth();
    // if (checkAuth.checkSignIn()) {
    //     navigate("/home");
    // }

    // const [searchParams] = useSearchParams();
    // const redirectToUrl = searchParams.get('redirectTo');

    const formik = useFormik({
        initialValues: {
            userEmail: searchParams.get("email") ? searchParams.get("email") : '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (_values) => {
            // alert(JSON.stringify(values, null, 2));
            // console.log(formik);

        },
    });

    interface FormValues {
        userEmailCheck: string;
        confirmuserEmailCheck: string;
    }

    const forgotformik = useFormik<FormValues>({
        initialValues: {
            userEmailCheck: '',
            confirmuserEmailCheck: '',
        },
        validationSchema: ForgotvalidationSchema,
        onSubmit: values => {
            console.log(values);
        },
    });

    interface ResetPasswordValues {
        resetPassword: string;
        confirmResetPassword: string;
    }

    const resetPasswordformik = useFormik<ResetPasswordValues>({
        initialValues: {
            resetPassword: '',
            confirmResetPassword: '',
        },
        validationSchema: ResetPasswordvalidationSchema,
        onSubmit: values => {
            console.log(values);
        },
    });


    const login = (clientId?: number) => {

        setIsFormSubmitted(true);
        if (formik.values.userEmail && formik.values.password && formik.isValid) {
            let dataToPass: { email: string, password: string, clientId?: number; inviteCode?: string; referralCode?: string; } = { email: formik.values.userEmail, password: formik.values.password, clientId };
            if (!clientId) {
                delete dataToPass.clientId;
            }
            if (inviteCode || referralCode) {
                dataToPass.clientId = 7;
            }
            if (inviteCode) {
                dataToPass.inviteCode = inviteCode;
            }
            if (referralCode) {
                dataToPass.referralCode = referralCode;
            }
            trackPromise(
                // ApiService.postWithData('admin', 'recruiterLogin', { email: formik.values.userEmail, password: formik.values.password }).then(
                // ApiService.postWithData(2168095, 'curatelyAdmin/recruiterLogin', dataToPass).then(
                ApiService.postWithData('admin', 'recruiterLogin', dataToPass).then(
                    (response: any) => {
                        // console.log(response.data);
                        if (response.data.isMultiple && response.data.clients?.length && response.data.clients.length > 1) {
                            setClientsList(response.data.clients);
                            localStorage.setItem('curatelyClientList', JSON.stringify(response.data.clients));
                            localStorage.setItem('curatelyPassword', formik.values.password);
                        } else if (response.data.recrId) {
                            localStorage.setItem('accessToken', response.headers['inc-auth-token']);
                            auth.signIn(response.data, response.headers['inc-auth-token'], () => {

                                // window.postMessage({
                                //     LOGIN_DATA_FROM_CURATELY: true,
                                //     jsonObject: EncryptDecryptService.e(JSON.stringify({
                                //         loginData: response.data, authToken: response.headers['inc-auth-token']
                                //     }), 'curately')
                                // }, "*");

                                setClientName(response.data.shortName.toLowerCase());
                                navigate(`/${response.data.shortName.toLowerCase()}/home`);

                                // if(redirectToUrl){
                                //     navigate(`${redirectToUrl}`);
                                // }
                                // if (response.data.Userid === "46" || response.data.Userid === "61") {
                                // } else {
                                //     navigate("/askconsulting/home");
                                // }
                            });
                        } else {
                            localStorage.removeItem('curatelyClientList');
                            showToaster(response.data.Message ? response.data.Message : 'Please enter Valid Credentials.', 'error');
                        }
                    }
                )
            ).catch((error) => {
                console.log(error);
                if (error.response?.data?.Error && error.response?.data?.Message) {
                    showToaster(error.response?.data?.Message, 'error');
                }
            });

        } else {
            if (!formik.values.userEmail) {
                showToaster('Please enter Email.', 'error');
            } else if (!formik.values.password) {
                showToaster('Please enter Password.', 'error');
            } else if (Object.values(formik.errors).length) {
                showToaster(Object.values(formik.errors)[0].toString(), 'error');
            }
        }
    }
    // const [values, setValues] = React.useState({
    //     showPassword: false,
    // });

    // const handleClickShowPassword = () => {
    //     setValues({
    //         showPassword: !values.showPassword,
    //     });
    // };
    // const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     event.preventDefault();
    // };

    useEffect(() => {
        window.postMessage({
            CHECK_LOGIN_DATA_FROM_CURATELY: true
        }, "*");
        cookieStore.eraseCookie('extensionClient');
    }, []);


    useEffect(() => {

        const handler = (ev: MessageEvent<{
            checkIfCuratelyLoginDataExist: string;
            DATA_FROM_CURATELY: boolean;
            LOGIN_DATA: string;
        }>) => {

            if (ev?.data?.checkIfCuratelyLoginDataExist) {
                window.postMessage({
                    CHECK_LOGIN_DATA_FROM_CURATELY: true
                }, "*");
            }

            if (ev?.data?.DATA_FROM_CURATELY) {
                // console.log(EncryptDecryptService.ds(ev.data.LOGIN_DATA, 'curately'));
            }

        }

        window.addEventListener('message', handler)

        return () => window.removeEventListener('message', handler)
    }, []);

    const goTosignUp = () => {
        navigate('/signup');
    }


    const year = new Date().getFullYear();

    const updatePassword = () => {
        trackPromise(
            ApiService.postWithData('admin', 'recruiterResetPassword',
                {
                    email: emailFromUrl,
                    password: resetPasswordformik.values.resetPassword,
                    token: tokenFromUrl,
                }
            ).then(
                (response: any) => {
                    if (response.data.Success) {
                        showToaster(response.data.Message, 'success');
                        navigate('/login');
                    } else {
                        showToaster(response.data.Message ? response.data.Message : 'Error occured while updating Password', 'error');
                    }
                }
            ).catch((error) => {
                console.log(error);
                if (error.response?.data?.Error && error.response?.data?.Message) {
                    showToaster(error.response?.data?.Message, 'error');
                }
            })
        )

    }

    const sendInstructions = () => {
        trackPromise(
            ApiService.postWithData('admin', 'recruiterForgotPassword', { email: forgotformik.values.userEmailCheck }).then(
                (response: any) => {
                    if (response.data.Success) {
                        showToaster(response.data.Message, 'success');
                        navigate('/login');
                    } else {
                        showToaster(response.data.Message ? response.data.Message : 'Error occured while sending Email', 'error');
                    }
                }
            ).catch((error) => {
                console.log(error);
                if (error.response?.data?.Error && error.response?.data?.Message) {
                    showToaster(error.response?.data?.Message, 'error');
                }
            })
        )
    }

    return (
        <div id='loginPage' className='customInputs'>
            {
                (!hideForAuth || isLoading || isAuthenticated) ?
                    <ContinuousLoader />
                    :
                    <>
                        <div className="logo_container" >
                            <img src={logoImage} alt="" className="logoImg"></img>
                        </div>
                        {
                            isForgotPage ?
                                <form className="form_container checkform_container" onSubmit={forgotformik.handleSubmit} autoComplete='off'>
                                    <div className="checktitle_container">
                                        <h3 className="check_title">Reset Your Password</h3>
                                        <h3 className='check_desc'>
                                            Please enter your email address below to
                                            <span className='centered-text'>which we can send you instructions.</span>
                                        </h3>
                                    </div>
                                    <div className='w-100'>
                                        <label className='inputLabel'>Email<span style={{ color: 'red' }}>*</span> </label>
                                        <TextField fullWidth className='mt-1'
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            id="userEmailCheck"
                                            name="userEmailCheck"
                                            value={forgotformik.values.userEmailCheck}
                                            onChange={forgotformik.handleChange}
                                            onBlur={forgotformik.handleBlur}
                                        />
                                        <ErrorMessage formikObj={forgotformik} name='userEmailCheck' isFormSubmitted />
                                    </div>
                                    <div className='w-100'>
                                        <label className='inputLabel'>Confirm Email<span style={{ color: 'red' }}>*</span> </label>
                                        <TextField fullWidth className={`mt-1 `}
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            id="confirmuserEmailCheck"
                                            name="confirmuserEmailCheck"
                                            value={forgotformik.values.confirmuserEmailCheck}
                                            onChange={forgotformik.handleChange}
                                            onBlur={forgotformik.handleBlur}
                                        // disabled={!forgotformik.values.userEmailCheck}
                                        />
                                        <ErrorMessage formikObj={forgotformik} name='confirmuserEmailCheck' isFormSubmitted />
                                    </div>

                                    <Button className="check_button" type="button" variant='contained' fullWidth disabled={!forgotformik.isValid || !forgotformik.values.userEmailCheck || !forgotformik.values.confirmuserEmailCheck} onClick={() => { sendInstructions() }}>
                                        Send Instructions
                                    </Button>

                                    <div className='backToLoginDiv mt-1 fs-12'>
                                        Have an account? <span className='ml-1 c-primary cursor-pointer' onClick={() => navigate('/login')}>Log in here</span>
                                    </div>
                                </form>
                                :
                                isResetPage ?
                                    <form className="form_container checkform_container" onSubmit={resetPasswordformik.handleSubmit} autoComplete='off'>
                                        <div className="checktitle_container">
                                            <span className="fw-7">Password Reset</span>
                                            <span className='text-center'>
                                                Almost there ! Now let's set up your new Curately AI password.
                                            </span>
                                            {/* Make sure it has atleast 10 characters long and atleast one
                                            <span className='centered-text'> one number.</span> */}
                                        </div>
                                        <div className='w-100'>
                                            <label className='inputLabel'>Password<span style={{ color: 'red' }}>*</span> </label>
                                            <TextField fullWidth className='mt-1'
                                                variant="outlined"
                                                type="password"
                                                size="small"
                                                id="resetPassword"
                                                name="resetPassword"
                                                value={resetPasswordformik.values.resetPassword}
                                                onChange={resetPasswordformik.handleChange}
                                                // onBlur={resetPasswordformik.handleBlur}
                                                onFocus={() => {
                                                    setShowResetChecklist(true);
                                                }}
                                                onBlur={() => {
                                                    setShowResetChecklist(false);
                                                }}
                                            />

                                            <ReactPasswordChecklist
                                                rules={["minLength", "specialChar", "number", "capital", "lowercase"]}
                                                minLength={8}
                                                value={resetPasswordformik.values.resetPassword} // Updated to match Formik value
                                                // onChange={(isValid) => {
                                                //     setIsPasswordValid(isValid);
                                                // }}
                                                invalidTextColor="Inherited color"
                                                style={{
                                                    display: (resetPasswordformik.values.resetPassword && showResetChecklist) ? "block" : "none",
                                                }}
                                                iconComponents={{
                                                    ValidIcon: <CheckCircleIcon className='fs-14 mr-2 c-green' />,
                                                    InvalidIcon: <ErrorOutlineIcon className='fs-14 mr-2' />
                                                }}
                                                className='passwordCheckList'
                                            />
                                            <ErrorMessage formikObj={resetPasswordformik} name='resetPassword' isFormSubmitted />
                                        </div>
                                        <div className='w-100'>
                                            <label className='inputLabel'>Repeat Password<span style={{ color: 'red' }}>*</span> </label>
                                            <TextField fullWidth className='mt-1'
                                                variant="outlined"
                                                type="password"
                                                size="small"
                                                id="confirmResetPassword"
                                                name="confirmResetPassword"
                                                value={resetPasswordformik.values.confirmResetPassword}
                                                onChange={resetPasswordformik.handleChange}
                                                // onBlur={resetPasswordformik.handleBlur}
                                                // disabled={!resetPasswordformik.values.resetPassword}
                                                onFocus={() => {
                                                    setShowResetConfirmChecklist(true);
                                                }}
                                                onBlur={() => {
                                                    setShowResetConfirmChecklist(false);
                                                }}
                                            />

                                            <ReactPasswordChecklist
                                                rules={["minLength", "specialChar", "number", "capital", "lowercase"]}
                                                minLength={8}
                                                value={resetPasswordformik.values.confirmResetPassword} // Updated to match Formik value
                                                // onChange={(isValid) => {
                                                //     setIsPasswordValid(isValid);
                                                // }}
                                                invalidTextColor="Inherited color"
                                                style={{
                                                    display: (resetPasswordformik.values.confirmResetPassword && showResetConfirmChecklist) ? "block" : "none",
                                                }}
                                                iconComponents={{
                                                    ValidIcon: <CheckCircleIcon className='fs-14 mr-2 c-green' />,
                                                    InvalidIcon: <ErrorOutlineIcon className='fs-14 mr-2' />
                                                }}
                                                className='passwordCheckList'
                                            />
                                            <ErrorMessage formikObj={resetPasswordformik} name='confirmResetPassword' isFormSubmitted />
                                        </div>

                                        <Button className="check_button" type="button" variant='contained' fullWidth disabled={!resetPasswordformik.isValid || !resetPasswordformik.values.resetPassword || !resetPasswordformik.values.confirmResetPassword} onClick={() => updatePassword()}>
                                            Confirm Password
                                        </Button>
                                    </form>
                                    :
                                    clientsList.length ?
                                        <div className='clients_container'>
                                            <div className='chooseClient text-center'>Choose Company</div>
                                            <div className='clients_list'>
                                                {
                                                    clientsList.map((item) => {
                                                        return <Grid className={`clientListItem ${item.status ? '' : 'disabled'}`} key={item.id} onClick={() => login(item.id)}>
                                                            <div className='clientLogoSpan'>
                                                                <img alt={item.name} src={`${import.meta.env.VITE_URL_AWS}curately/${item.logo}`} className='clientLogo' />
                                                            </div>
                                                            {/* logoImage /> */}
                                                            <span className='itemName pl-3'>{item.name} </span>
                                                        </Grid>
                                                    })
                                                }
                                            </div>
                                            <div className='backToLoginDiv'>
                                                <Button type="button" color='secondary' className='backToLoginBtn' variant='outlined' onClick={() => setClientsList([])}>Sign in with a different account</Button>
                                            </div>
                                        </div>
                                        :
                                        <form className="form_container" onSubmit={formik.handleSubmit} autoComplete='off'>
                                            <div className="title_container">
                                                <p className="title">Log In</p>
                                            </div>
                                            {/* <Divider className='w-100' /> */}

                                            <Button type="button" color='secondary' variant='outlined' fullWidth onClick={() => loginWithRedirect()}>
                                                <VpnKeyIcon className='keyIcon' />Log In with SSO
                                            </Button>
                                            <div className='orParent'>
                                                <div className='orChild'></div>
                                                <div id='orDiv'>OR</div>
                                                <div className='orChild'></div>
                                            </div>
                                            <div className='w-100'>
                                                <label className='inputLabel'>Email<span style={{ color: 'red' }}>*</span> </label>
                                                <TextField fullWidth className='mt-1'
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    id="userEmail"
                                                    name="userEmail"
                                                    value={formik.values.userEmail}
                                                    onChange={formik.handleChange}
                                                    InputProps={{
                                                        onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => {
                                                            if (e.key === "Enter") {
                                                                // console.log('Input value', e.target.value);
                                                                e.preventDefault();
                                                                login();
                                                            }
                                                        }
                                                    }}
                                                // inputProps={{
                                                //     autoComplete: 'new-password',
                                                // }}
                                                />
                                                <ErrorMessage formikObj={formik} name='userEmail' isFormSubmitted={isFormSubmitted} />
                                            </div>
                                            <div className='w-100'>
                                                <label className='inputLabel'>Password<span style={{ color: 'red' }}>*</span> </label>
                                                <TextField fullWidth className='mt-1'
                                                    variant="outlined"
                                                    type={showPassword ? 'text' : 'password'}
                                                    size="small"
                                                    id="password"
                                                    name="password"
                                                    value={formik.values.password}
                                                    onChange={formik.handleChange}
                                                    inputProps={{
                                                        autoComplete: 'new-password',
                                                    }}

                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                {showPassword ? <VisibilityOff onClick={handleClickShowPassword} className='cursor-pointer' /> : < Visibility onClick={handleClickShowPassword} className='cursor-pointer' />}
                                                            </InputAdornment>
                                                        ),
                                                        onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => {
                                                            if (e.key === "Enter") {
                                                                // console.log('Input value', e.target.value);
                                                                e.preventDefault();
                                                                login();
                                                            }
                                                        }
                                                    }}
                                                />
                                                <ErrorMessage formikObj={formik} name='password' isFormSubmitted={isFormSubmitted} />
                                            </div>

                                            <Button className='mt-2' type="button" color='primary' variant='contained' fullWidth onClick={() => login()}>
                                                Log In
                                            </Button>

                                            <Button className='mt-2' type="button" color='primary' variant='contained' fullWidth onClick={() => goTosignUp()}>
                                                Sign Up
                                            </Button>
                                            <div className='text-center'>
                                                <FormControlLabel control={<Checkbox defaultChecked size='small' />} label="Keep me Signed in" />
                                            </div>
                                            <div className='forgotPasswordDiv mt-1 fs-12 text-center'>
                                                Forgot your password? <span className='ml-1 c-primary cursor-pointer' onClick={() => navigate('/forgot')}>Reset it here</span>
                                            </div>

                                        </form>

                        }
                        <div className='copyRightFooter'>
                            <span>Copyright &copy; {year} Curately. All Rights Reserved.</span>
                        </div>
                    </>
            }
        </div >
    );
}

export default Login;
