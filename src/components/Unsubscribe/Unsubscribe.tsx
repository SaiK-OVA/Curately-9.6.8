// import ErrorMessage from '../shared/Error/ErrorMessage';
// import { useFormik, Yup } from '../../shared/modules/Formik';
import logoImage from '../../assets/images/curatelyLogo.png';
import './Unsubscribe.scss';
import { Button } from '../../shared/modules/MaterialImports/Button';
import { Checkbox } from '../../shared/modules/MaterialImports/FormElements';
import { FormControlLabel } from '../../shared/modules/MaterialImports/FormInputs';

// import { TextField } from '../../shared/modules/MaterialImports/TextField';
import { showToaster } from '../../shared/modules/commonImports';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../shared/api/noTokenApi';
import { useEffect, useState } from '../../shared/modules/React';
import { trackPromise } from '../../shared/modules/PromiseTrackter';
import { ChangeEvent } from 'react';

// const validateEmail = (email: string): boolean => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
// };

// const unsubscribevalidationSchema = Yup.object({
//     unsubscribeEmailCheck: Yup
//         .string()
//         .email('Enter a valid email')
//         .test('is-valid-email', 'Enter a valid email', value => validateEmail(value || ''))
//         .required('Email is required')
// });


const Unsubscribe = () => {


    const queryString = window.location.href.split('?')[1];
    const urlParams = new URLSearchParams(queryString);
    const clientNameFromParams = urlParams.get('client');
    const emailFromParams = urlParams.get('email');

    // https://app.curately.ai/#/unsubscribe?03=agileoneaxalta&email=sally.smith@example.com

    const year = new Date().getFullYear();
    const navigate = useNavigate();


    // interface unsubscribeFormValues {
    //     unsubscribeEmailCheck: string;
    // }

    // const unsubscribeformik = useFormik<unsubscribeFormValues>({
    //     initialValues: {
    //         unsubscribeEmailCheck: emailFromParams ? emailFromParams : '',
    //     },
    //     validationSchema: unsubscribevalidationSchema,
    //     onSubmit: values => {
    //         console.log(values);
    //     },
    // });

    const unsubscribeCandidate = () => {
        //         https://qaadminapi.curately.ai/curatelyAdmin/candidateUnsubscribe

        // {
        //     "clientId": 3,
        //     "email": "mj.whyno.ea@gmail.com",
        //     "emailAndSmsUnsubscribe": true
        //     or
        //     "emailUnsubscribe":true
        //      or
        //     "smsUnsubscribe":true
        // }
        if (emailChecked || smsChecked) {
            let unsubscribeData: {
                clientShortName: string;
                email: string;
                emailAndSmsUnsubscribe?: boolean;
                emailUnsubscribe?: boolean;
                smsUnsubscribe?: boolean;
            } = {
                clientShortName: clientNameFromParams ? clientNameFromParams : "",
                email: emailFromParams ? emailFromParams : "",
            };
            if(emailChecked && smsChecked) {
                unsubscribeData.emailAndSmsUnsubscribe = true;
            } else if(emailChecked) {
                unsubscribeData.emailUnsubscribe = true;
            } else if(smsChecked) {
                unsubscribeData.smsUnsubscribe = true;
            }
            trackPromise(
                ApiService.postWithData('admin', 'candidateUnsubscribe',
                    unsubscribeData
                ).then(
                    (response: any) => {
                        if (response.data.Success) {
                            showToaster(response.data.Message, 'success');
                            navigate('/login');
                        } else {
                            showToaster(response.data.Message ? response.data.Message : 'Error occured while Unsubscribing', 'error');
                        }
                    }
                ).catch((error: { response: { data: { Error: any; Message: string; }; }; }) => {
                    console.log(error);
                    if (error.response?.data?.Error && error.response?.data?.Message) {
                        showToaster(error.response?.data?.Message, 'error');
                    }
                })
            )
        } else {
            showToaster('Please select atleast one of the checkbox.', 'error');
        }
    }

    const [emailChecked, setEmailChecked] = useState(false);

    const updateEmailCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
        setEmailChecked(event.target.checked);
    };


    const [smsChecked, setSmsChecked] = useState(false);

    const updateSmsCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
        setSmsChecked(event.target.checked);
    };


    return (
        <div>
            <div className="logo_container" >
                <img src={logoImage} alt="" className="logoImg"></img>
            </div>
            {/* <form className="form_container" onSubmit={unsubscribeformik.handleSubmit} autoComplete='off'> */}
            <div className='form_container'>
                <div className="title_container">
                    <p className="title">Manage your subscriptions</p>
                    <p className="">Please check the emails and SMS you don't want to receive on {emailFromParams}</p>
                </div>
                <div className='w-100'>
                    <div>
                        <FormControlLabel control={
                            <Checkbox
                                checked={emailChecked}
                                onChange={updateEmailCheckBox}
                            />
                        } label="Email" />
                    </div>
                    <div>
                        <FormControlLabel control={
                            <Checkbox
                                checked={smsChecked}
                                onChange={updateSmsCheckBox}
                            />
                        } label="SMS" />
                    </div>
                    {/* <label className='inputLabel'>Email<span style={{ color: 'red' }}>*</span> </label>
                    <TextField fullWidth className='mt-1'
                        variant="outlined"
                        type="text"
                        size="small"
                        id="unsubscribeEmailCheck"
                        name="unsubscribeEmailCheck"
                        value={unsubscribeformik.values.unsubscribeEmailCheck}
                        onChange={unsubscribeformik.handleChange}
                        onBlur={unsubscribeformik.handleBlur}
                    />
                    <ErrorMessage formikObj={unsubscribeformik} name='unsubscribeEmailCheck' /> */}
                </div>
                <Button className="button" type="button" variant='contained' fullWidth onClick={() => unsubscribeCandidate()}> unsubscribe </Button>
                {/* </form> */}
            </div>
            <div className='copyRightFooter'>
                <span>Copyright &copy; {year} Curately. All Rights Reserved.</span>
            </div>
        </div>
    )
}

export default Unsubscribe;