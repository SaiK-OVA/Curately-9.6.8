// import { KeyboardEvent, useContext, useEffect, useState } from 'react';
import { KeyboardEvent, useContext, useEffect } from 'react';
import { useState } from '../../shared/modules/React';
// import Box from '@mui/material/Box';
import logoImage from '../../assets/images/curatelyLogo.png';

import { matchPath, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
// import Grid from '@mui/material/Grid';
// import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { useFormik, Yup } from '../../shared/modules/Formik';
import { useAuth } from '../../shared/services/auth/validating';
// import { checkAuth } from '../../shared/services/auth/auth';
import { FormControlLabel } from '../../shared/modules/MaterialImports/FormInputs';
import { Checkbox } from '../../shared/modules/MaterialImports/FormElements';
import { trackPromise } from '../../shared/modules/PromiseTrackter';
import ApiService from '../../shared/api/noTokenApi';
import { showToaster } from '../shared/SnackBar/SnackBar';

import { ClientNameStore } from '../../App';

// import { Button } from '@mui/material';
import ErrorMessage from '../shared/Error/ErrorMessage';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { TextField, InputAdornment, IconButton } from '../../shared/modules/commonImports';
import { Button } from '../../shared/modules/MaterialImports/Button';
// import VpnKeyIcon from '@mui/icons-material/VpnKey';

import { Grid } from '../../shared/modules/MaterialImports/Grid2';

import './../Login/Login.scss';
import { cookieStore } from '../../shared/services/cookies/cookies';
import ReactPasswordChecklist from 'react-password-checklist';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Dialog, DialogContent, DialogTitle, CloseIcon } from '../../shared/modules/MaterialImports/Dialog';
import { InputOtp } from 'primereact/inputotp';
// import { verify } from 'crypto';
// import { userLocalData } from '../../shared/services/userData';
// import { data } from '../Dashboard/Resume/SearchBot/makeData';
import { userEmailValidation } from '../../shared/data/FreeEmailDomains/FreeEmailDomains';
import { checkEmailExists } from '../../shared/services/validation/EmailValidation';
// import Link from '@mui/material/Link';

const SignIn = () => {
  const { pathname } = useLocation();
  const isSignUpPath = matchPath(`/signup`, pathname);


  const [searchParams] = useSearchParams();
  // https://appqa.curately.ai/#/signUp?referral=5c02d06d-98f9-4027-8189-ff05b7fe4f1b
  const referralCode = searchParams.get("referral") ? searchParams.get("referral") : "";
  const inviteCode = searchParams.get("invite") ? searchParams.get("invite") : "";
  const clientId = searchParams.get("clientId") ? searchParams.get("clientId") : "";
  const token = searchParams.get("token") ? searchParams.get("token") : "";

  const [_clientName, setClientName] = useContext(ClientNameStore);
  const [isLoginFormSubmitted, setIsLoginFormSubmitted] = useState(false);
  const [isSignUpFormSubmitted, setIsSignUpFormSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSignUp, setShowSignUp] = useState((isSignUpPath?.pathname || referralCode || inviteCode) ? true : false);
  const [clientsList, setClientsList] = useState<{ id: number; status: boolean; name: string; logo: string; }[]>([]);
  const handleClickShowPassword = () => setShowPassword((show) => !show);




  const navigate = useNavigate();
  let auth = useAuth();



  const loginValidationSchema = Yup.object({
    userEmail: Yup
      .string()
      .email('Enter a valid email')
      .required('Email is required'),
    password: Yup
      .string()
      // .min(4, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
  });
  const loginFormik = useFormik({
    initialValues: {
      userEmail: searchParams.get("email") ? searchParams.get("email") : '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: () => {

    },
  });


  const signupValidationSchema = Yup.object({
    firstName: Yup.string().required('Enter First Name'),
    lastName: Yup.string().required('Enter Last Name'),
    userEmail: userEmailValidation,
    password: Yup.string()
      .min(8, "Must Contain 8 Characters")
      .required('Password is required.')
      .matches(/^(?=.*[a-z])/, "Must Contain One Lowercase Character")
      .matches(/^(?=.*[A-Z])/, "Must Contain One Uppercase Character")
      .matches(/^(?=.*[0-9])/, "Must Contain One Number")
      .matches(/^(?=.*[!@#\$%\^&_\*])/, "Must Contain One Special Character"),
    // .min(4, 'Password should be of minimum 8 characters length')
  });
  const signupFormik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      userEmail: searchParams.get("email") ? searchParams.get("email") : '',
      password: '',
    },
    validationSchema: signupValidationSchema,
    onSubmit: () => {

    },
  });

  const login = (_clientId?: number) => {

    setIsLoginFormSubmitted(true);
    if (loginFormik.values.userEmail && loginFormik.values.password && loginFormik.isValid) {
      loginWithValues(loginFormik.values.userEmail, loginFormik.values.password, false);

    } else {
      if (!loginFormik.values.userEmail) {
        showToaster('Please enter Email.', 'error');
      } else if (!loginFormik.values.password) {
        showToaster('Please enter Password.', 'error');
      } else if (Object.values(loginFormik.errors).length) {
        showToaster(Object.values(loginFormik.errors)[0].toString(), 'error');
      }
    }
  }

  const loginWithValues = (email: string, password: string, redirectToInvite: boolean) => {
    let dataToPass = { email: email, password: password, clientId: clientId ? clientId : 7 };
    // if (!clientId) {
    //   delete dataToPass.clientId;
    // }
    trackPromise(
      // ApiService.postWithData('admin', 'recruiterLogin', { email: loginFormik.values.userEmail, password: loginFormik.values.password }).then(
      // ApiService.postWithData(2168095, 'curatelyAdmin/recruiterLogin', dataToPass).then(
      ApiService.postWithData('admin', 'recruiterLogin', dataToPass).then(
        (response: any) => {
          // console.log(response.data);
          if (response.data.isMultiple && response.data.clients?.length && response.data.clients.length > 1) {
            setClientsList(response.data.clients);
          } else if (response.data.recrId) {
            localStorage.setItem('accessToken', response.headers['inc-auth-token']);
            auth.signIn(response.data, response.headers['inc-auth-token'], () => {
              setClientName(response.data.shortName.toLowerCase());
              // if(redirectToUrl){
              //     navigate(`${redirectToUrl}`);
              // }
              if (redirectToInvite) {
                addToStripe(response.data.recrId, response.data.clientId);
                setTimeout(() => {
                  navigate(`/${response.data.shortName.toLowerCase()}/welcome`);
                }, 100);
              } else {
                navigate(`/${response.data.shortName.toLowerCase()}/home`);
              }
              // if (response.data.Userid === "46" || response.data.Userid === "61") {
              // } else {
              //     navigate("/askconsulting/home");
              // }
            });
          } else {
            showToaster(response.data.Message ? response.data.Message : 'Please enter Valid Credentials.', 'error');
          }
        }
      )
    )
  }

  const signUp = async () => {

    setIsSignUpFormSubmitted(true);
    if (signupFormik.values.userEmail && signupFormik.values.password && signupFormik.values.firstName && signupFormik.values.lastName && signupFormik.isValid) {
      // const isValidEmail = await validateEmailDomain(signupFormik.values.userEmail);
      // if (isValidEmail) {
        sendOTP();
      // } else {
      //   showToaster('Please enter your Work Email.', 'error');
      // }
    } else {
      if (!signupFormik.values.firstName) {
        showToaster('Please enter First Name.', 'error');
      } else if (!signupFormik.values.lastName) {
        showToaster('Please enter Last Name.', 'error');
      } else if (!signupFormik.values.userEmail) {
        showToaster('Please enter Email.', 'error');
      } else if (!signupFormik.values.password) {
        showToaster('Please enter Password.', 'error');
      } else if (Object.values(signupFormik.errors).length) {
        showToaster(Object.values(signupFormik.errors)[0].toString(), 'error');
      }
    }

  }

  const signUpAPICall = () => {
    loginFormik.setValues({
      userEmail: signupFormik.values.userEmail,
      password: signupFormik.values.password,
    });
    let dataToPass = {
      email: signupFormik.values.userEmail,
      password: signupFormik.values.password,
      firstName: signupFormik.values.firstName,
      lastName: signupFormik.values.lastName,
      phone: "", // signupFormik.values.phone,
      companyName: "", // signupFormik.values.companyName,
      referralCode: referralCode ? referralCode : "",
      inviteCode: inviteCode ? inviteCode : "",
      clientId: clientId ? clientId : "",
      token: token ? token : "",
    };
    trackPromise(
      // https://qaadminapi.curately.ai/curatelyAdmin/bookRecruiterDemo
      ApiService.postWithData('admin', 'bookRecruiterDemo', dataToPass).then(
        (response: any) => {
          // console.log(response.data);
          if (response.data.Success) {
            showToaster('Sign Up successful.', 'success');
            // signupFormik.resetForm();
            loginWithValues(signupFormik.values.userEmail ? signupFormik.values.userEmail : "", signupFormik.values.password, true);
            // setIsSignUpFormSubmitted(false);
            // setShowSignUp(false);
          } else {
            showToaster(response.data.Message ? response.data.Message : 'Failed to Sign Up.', 'error');
          }
        }
      )
    )
  }



  // const validateEmailDomain = async (email: any) => {
  //   try {
  //     // Mock API request (replace with your actual API call)
  //     //   const response = await axios.get('https://api.example.com/validate-email', {
  //     //     params: { email }
  //     //   });

  //     let response = await trackPromise(ApiService.validateWorkEmail(email));
  //     console.log(response, 'response')
  //     let isBoolean = response.data.debounce.free_email === "false" ? true : false
  //     // Assuming the API returns a response with a "valid" field
  //     return isBoolean; // e.g., true or false
  //   } catch (error) {
  //     console.error('Error validating email:', error);
  //     return false; // Fallback if API request fails
  //   }
  // };

  const addToStripe = (recrId: string, clientId: string) => {
    trackPromise(
      // https://adminapi.cxninja.com/bullhorn-service-qa/stripe/createCustomer
      ApiService.postWithData('ats', 'stripe/createCustomer', {
        "firstName": signupFormik.values.firstName,
        "lastName": signupFormik.values.lastName,
        "email": signupFormik.values.userEmail,
        "recruiterId": Number(recrId),
        "clientId": Number(clientId)
      }).then((response: any) => {
        console.log(response.data);
      })
    )
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
    cookieStore.eraseCookie('extensionClient');
  }, []);


  const year = new Date().getFullYear();


  const [showChecklist, setShowChecklist] = useState(false);

  const [openOTPdialog, setOpenOTPdialog] = useState(false)
  const [inputOTP, setInputOTP] = useState();
  const [OTP, setOTP] = useState<any>(null);
  // const [OTPValidated, setOTPValidated] = useState(false);

  const sendOTP = () => {

    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    // console.log(randomNumber);
    setOTP(randomNumber);
    trackPromise(
      ApiService.postWithData('admin', 'verifyRecruiterEmail', {
        email: signupFormik.values.userEmail,
        code: window.btoa(randomNumber.toString())
      }).then(
        (response: any) => {
          if (response.data.Success) {
            setOpenOTPdialog(true);
          } else {
            showToaster(response.data.Message ? response.data.Message : 'Failed to Send Veification OTP.', 'error');
          }
        }
      )
    );
  }

  const handleOTPDialogClose = () => {
    setOpenOTPdialog(false);
  };

  const verifyOTP = () => {
    if (Number(inputOTP) === OTP) {
      // setOTPValidated(true);
      setOpenOTPdialog(false);
      // signUp();
      showToaster("OTP Verified Succesfully", 'success');
      signUpAPICall();
    } else {
      showToaster("The entered OTP is not correct", 'error');
    }
  }

  const openWebSite = (link: string) => {
    window.open(link, '_blank');
  };

  const duplicateEmailCheck = async (email: string) => {
    const result = await checkEmailExists(email, clientId ? Number(clientId) : 7);
    if (result.exists) {
      signupFormik.setFieldError('userEmail', result.message);
      return false;
    }
    signupFormik.setFieldError('userEmail', undefined);
    return true;
  };

  return (
    <div id='loginPage' className='customInputs'>

      <div className="logo_container" >
        <img src={logoImage} alt="" className="logoImg"></img>
      </div>
      {
        clientsList.length ?
          <div className='clients_container'>
            <div className='chooseClient text-center'>Choose Company</div>
            <div className='clients_list'>
              {
                clientsList.map((item) => {
                  return <Grid className={`clientListItem ${item.status ? '' : 'disabled'}`} key={item.id} onClick={() => login(item.id)}>
                    <span className='clientLogoSpan'>
                      <img alt={item.name} src={`${import.meta.env.VITE_URL_AWS}curately/${item.logo}`} className='clientLogo' />
                    </span>
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
          showSignUp ?
            <form className="form_container mt-2" onSubmit={signupFormik.handleSubmit} autoComplete='off'>
              <div className="title_container">
                <p className="title">Sign Up</p>
              </div>

              <div className='w-100'>
                <label className='inputLabel'>First Name<span style={{ color: 'red' }}>*</span> </label>
                <TextField fullWidth className='mt-1'
                  variant="outlined"
                  type="text"
                  size="small"
                  id="firstName"
                  name="firstName"
                  value={signupFormik.values.firstName}
                  onChange={signupFormik.handleChange}
                  InputProps={{
                    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => {
                      if (e.key === "Enter") {
                        // console.log('Input value', e.target.value);
                        e.preventDefault();
                        signUp();
                      }
                    }
                  }}
                />
                <ErrorMessage formikObj={signupFormik} name='firstName' isFormSubmitted={isSignUpFormSubmitted} />
              </div>
              <div className='w-100'>
                <label className='inputLabel'>Last Name<span style={{ color: 'red' }}>*</span> </label>
                <TextField fullWidth className='mt-1'
                  variant="outlined"
                  type="text"
                  size="small"
                  id="lastName"
                  name="lastName"
                  value={signupFormik.values.lastName}
                  onChange={signupFormik.handleChange}
                  InputProps={{
                    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => {
                      if (e.key === "Enter") {
                        // console.log('Input value', e.target.value);
                        e.preventDefault();
                        signUp();
                      }
                    }
                  }}
                />
                <ErrorMessage formikObj={signupFormik} name='lastName' isFormSubmitted={isSignUpFormSubmitted} />
              </div>
              <div className='w-100'>
                <label className='inputLabel'>Email<span style={{ color: 'red' }}>*</span> </label>
                <TextField fullWidth className='mt-1'
                  variant="outlined"
                  type="text"
                  size="small"
                  id="userEmail"
                  name="userEmail"
                  value={signupFormik.values.userEmail}
                  error={Boolean(signupFormik.touched.userEmail && signupFormik.errors.userEmail)}
                  onChange={(e) => {
                    signupFormik.handleChange(e);
                    if (signupFormik.errors.userEmail) {
                      signupFormik.setFieldError('userEmail', undefined);
                    }
                  }}
                  onBlur={async (e) => {
                    await signupFormik.handleBlur(e);
                    const emailValue = e.target.value;
                    if (emailValue && !signupFormik.errors.userEmail) {
                      await duplicateEmailCheck(emailValue);
                    }
                  }}
                  InputProps={{
                    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        signUp();
                      }
                    }
                  }}
                // inputProps={{
                //     autoComplete: 'new-password',
                // }}
                />
                <ErrorMessage formikObj={signupFormik} name='userEmail' isFormSubmitted={isSignUpFormSubmitted} />
              </div>
              <div className='w-100 ' style={{ position: 'relative' }}>
                <label className='inputLabel'>Password<span style={{ color: 'red' }}>*</span> </label>
                <TextField fullWidth className='mt-1'
                  variant="outlined"
                  type={showPassword ? 'text' : 'password'}
                  size="small"
                  id="password"
                  name="password"
                  value={signupFormik.values.password}
                  onChange={signupFormik.handleChange}
                  onFocus={() => {
                    setShowChecklist(true);
                  }}
                  onBlur={() => {
                    setShowChecklist(false);
                  }}
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
                        signUp();
                      }
                    }
                  }}
                />

                <ReactPasswordChecklist
                  rules={["minLength", "specialChar", "number", "capital", "lowercase"]}
                  minLength={8}
                  value={signupFormik.values.password} // Updated to match Formik value
                  // onChange={(isValid) => {
                  //     setIsPasswordValid(isValid);
                  // }}
                  invalidTextColor="Inherited color"
                  style={{
                    display: (signupFormik.values.password && showChecklist) ? "block" : "none",
                    fontSize: "13px",
                    marginTop: "2px",
                    position: 'absolute',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    background: '#fff',
                    bottom: '-115px',
                    boxShadow: "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
                    borderRadius: '4px',
                    padding: '12px',
                    zIndex: 999
                  }}
                  iconComponents={{
                    ValidIcon: <CheckCircleIcon className='fs-14 mr-2 c-green' />,
                    InvalidIcon: <ErrorOutlineIcon className='fs-14 mr-2' />
                  }}
                />
                <ErrorMessage formikObj={signupFormik} name='password' isFormSubmitted={isSignUpFormSubmitted} />
              </div>

              <Button className='mt-2' type="button" color='primary' variant='contained' fullWidth onClick={() => signUp()}>
                Sign Up
              </Button>
              <Button type="button" color='primary' variant='text' onClick={() => setShowSignUp(false)} className='tt-capital mt-3'>Already have an account?</Button>
              <div className='text-center'>
                <FormControlLabel control={<Checkbox defaultChecked size='small' />} label="Keep me Signed in" />
              </div>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <div className='mt-2 text-center'>
                  <span>By signing up, you agree to our</span>
                  <div>
                    <span className='privacy-text mr-1' onClick={() => openWebSite('https://www.curately.ai/privacy')}>Privacy Policy</span>
                    and
                    <span className='privacy-text ml-1' onClick={() => openWebSite('https://www.curately.ai/terms')}>Terms & Conditions</span>
                  </div>
                </div>
              </Grid>
            </form>
            :
            <form className="form_container" onSubmit={loginFormik.handleSubmit} autoComplete='off'>
              <div className="title_container">
                <p className="title">Log In</p>
              </div>

              <div className='w-100'>
                <label className='inputLabel'>Email<span style={{ color: 'red' }}>*</span> </label>
                <TextField fullWidth className='mt-1'
                  variant="outlined"
                  type="text"
                  size="small"
                  id="userEmail"
                  name="userEmail"
                  value={loginFormik.values.userEmail}
                  onChange={loginFormik.handleChange}
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
                <ErrorMessage formikObj={loginFormik} name='userEmail' isFormSubmitted={isLoginFormSubmitted} />
              </div>
              <div className='w-100'>
                <label className='inputLabel'>Password<span style={{ color: 'red' }}>*</span> </label>
                <TextField fullWidth className='mt-1'
                  variant="outlined"
                  type={showPassword ? 'text' : 'password'}
                  size="small"
                  id="password"
                  name="password"
                  value={loginFormik.values.password}
                  onChange={loginFormik.handleChange}
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
                <ErrorMessage formikObj={loginFormik} name='password' isFormSubmitted={isLoginFormSubmitted} />
              </div>

              <Button className="mt-2" type="button" color='primary' variant='contained' fullWidth onClick={() => login()}>
                Log In
              </Button>

              <Button type="button" color='primary' variant='text' fullWidth onClick={() => setShowSignUp(true)} className='tt-capital mt-3'>
                Sign Up
              </Button>
              <div className='text-center'>
                <FormControlLabel control={<Checkbox defaultChecked size='small' />} label="Keep me Signed in" />
              </div>
            </form>

      }
      <div className='copyRightFooter'>
        <span>Copyright &copy; {year} Curately. All Rights Reserved.</span>
      </div>
      <Dialog
        id='OTP-dialog'
        open={openOTPdialog}
      >
        <DialogTitle className="p-0">
          <Grid
            container
            direction="row"
            justifyContent="end"
            alignItems="center"
          >
            <IconButton
              aria-label="close"
              onClick={handleOTPDialogClose}
              className="closeBtn"
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <h4 className='mt-3 text-center'>Verify your Email</h4>
          <p className='mt-4'>Please enter Verification code received on Email on {signupFormik.values?.userEmail}</p>
          <InputOtp value={inputOTP} length={6} onChange={(e: any) => setInputOTP(e.value)} integerOnly />
          <Button
            color='primary'
            variant='contained'
            className='verify-btn'
            onClick={verifyOTP}
          >Verify OTP</Button>

          <Button
            color='secondary'
            variant='text'
            className='resend'
            onClick={sendOTP}
          >Resend OTP</Button>
        </DialogContent>
      </Dialog>

    </div>
  );
}

export default SignIn;
