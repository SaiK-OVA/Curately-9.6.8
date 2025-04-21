import { useEffect, useState } from 'react';
import { CuratelyLogo } from '../../shared/images/CuratelyLogo';
import './Feedback.scss';
import FormControl from '@mui/material/FormControl/FormControl';
import { MenuItem } from '../../shared/modules/MaterialImports/Menu';
import { Select } from '../../shared/modules/MaterialImports/FormElements';
import { SelectChangeEvent } from '@mui/material/Select';
import { Button } from '../../shared/modules/MaterialImports/Button';
import { Typography } from '../../shared/modules/MaterialImports/Typography';
import { trackPromise } from '../../shared/modules/PromiseTrackter';
import ApiService from "../../shared/api/api";
import { showToaster } from '../../shared/modules/commonImports';
import { useFormik, Yup } from '../../shared/modules/Formik';
import ErrorMessage from '../shared/Error/ErrorMessage';
import { useAuth } from '../../shared/services/auth/validating';
import { useLocation, useNavigate } from 'react-router-dom';
import { userLocalData } from '../../shared/services/userData';
import { cookieStore } from '../../shared/services/cookies/cookies';

const Feedback = () => {
    const [recrId, setRecrId] = useState<any>('');
    const [clientId, setClientId] = useState<any>('');
    const [isFormSubmitted, setIsFormSubmitted] = useState(false)
    const auth = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const openWebSite = (link: string) => {
        window.open(link, '_blank');
    };

    const initialValues = {
        reason: '',
        feedback: ''
    }

    const validationSchema = Yup.object({
        reason: Yup.string().required('Reason is Required'),
        feedback: Yup.string().required('Feedback is Required')
    });

    const feedbackFormik = useFormik({
        initialValues,
        validationSchema: validationSchema,
        onSubmit: () => {
            setIsFormSubmitted(true);
            handleFeedback();
        },

    });


    const handleFeedback = () => {
        if (feedbackFormik.values.reason !== "" && feedbackFormik.values.feedback !== "") {
            const payload = {
                reason: feedbackFormik.values.reason,
                description: feedbackFormik.values.feedback,
                recrId: recrId ? Number(recrId) : '',
                clientId: clientId ? Number(clientId) : ''
            }

            trackPromise(
                ApiService.postWithData("admin", "submitFeedback", payload).then(
                    (result) => {
                        if (result.data.Success) {
                            showToaster("Thank you for sharing your Feedback", 'success');
                            if (!auth.user) {
                                if (cookieStore.getCookie('extensionClient')) navigate("/signin", { state: { from: location }, replace: true })
                                else navigate("/login", { state: { from: location }, replace: true })
                            } else {
                                navigate(`/${userLocalData.getvalue("clientName")}/home`)
                            }
                        } else {
                            showToaster(result.data.Message ? result.data.Message : "Feedback not sent", 'error');
                        }
                    }
                ).catch(error => {
                    showToaster(error.message, 'error');
                })
            );
        } else {
            showToaster("Please fill all the fields", 'error');
        }
    }

    useEffect(() => {
        const queryString = window.location.href.split('?')[1];
        const urlParams = new URLSearchParams(queryString);
        setRecrId(urlParams.get('recrId') ? urlParams.get('recrId') : "")
        setClientId(urlParams.get('clientId') ? urlParams.get('clientId') : "")
    }, [])

    return (
        <div id="feedback-container">
            <div className='main-wrap'>
                <div className='header'>
                    <img src={CuratelyLogo} alt=""></img>
                    <h3>We're sorry to see you go.</h3>
                </div>

                <div className='box-container'>
                    <form onSubmit={feedbackFormik.handleSubmit} autoComplete='off'>
                        <FormControl fullWidth>
                            <label className='mb-1'>Why did you uninstall the extension?</label>
                            <Select
                                id="reason"
                                value={feedbackFormik.values.reason}
                                onChange={(e) => feedbackFormik.setFieldValue('reason', e.target.value)}
                                size='small'
                                displayEmpty
                            >
                                <MenuItem disabled value="">Select...</MenuItem>
                                <MenuItem value="linkedin_usage">Not using LinkedIn frequently enough</MenuItem>
                                <MenuItem value="irrelevant_responses">The responses weren't helpful or relevant</MenuItem>
                                <MenuItem value="alternative">Found a better alternative</MenuItem>
                                <MenuItem value="slow_browser">Extension was slowing down my browser</MenuItem>
                                <MenuItem value="privacy_concerns">Privacy concerns</MenuItem>
                                <MenuItem value="tech_issues">Technical issues/bugs</MenuItem>
                                <MenuItem value="expensive">Too expensive/credit system</MenuItem>
                                <MenuItem value="limited_free_trial">Limited free features</MenuItem>
                                <MenuItem value="too_difficult">Didn't understand how to use it</MenuItem>
                                <MenuItem value="company_policy">Company policy/compliance issues</MenuItem>
                                <MenuItem value="just_testing">Just testing - will reinstall later</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </Select>
                            <ErrorMessage formikObj={feedbackFormik} name={'reason'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                        </FormControl>

                        <FormControl fullWidth className='mt-5'>
                            <label className='mb-1'>What can we do to bring you back?</label>
                            <textarea
                                id="feedback"
                                value={feedbackFormik.values.feedback}
                                onChange={feedbackFormik.handleChange}
                                placeholder='Type your feedback...'
                                rows={5}
                            ></textarea>
                            <ErrorMessage formikObj={feedbackFormik} name={'feedback'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                        </FormControl>

                        <Button
                            fullWidth
                            variant='contained'
                            color='primary'
                            className='mt-5 submit-btn'
                            type='submit'
                        >Share Feedback</Button>
                    </form>
                </div>
                <div className='footer'>
                    By clicking the "Submit" button, you agree to our <Typography className='privacy-text' onClick={() => openWebSite('https://www.curately.ai/privacy')}>Privacy Policy</Typography>
                </div>
            </div>
        </div>
    )
}

export default Feedback;