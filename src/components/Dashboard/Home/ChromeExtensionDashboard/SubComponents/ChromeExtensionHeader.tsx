import { useEffect, useState } from 'react';
import './ChromeExtensionHeader.scss'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import CloseIcon from '@mui/icons-material/Close';
import { userLocalData } from "../../../../../shared/services/userData";
import ApiService from '../../../../../shared/api/api';
import { useNavigate } from 'react-router-dom';
import { trackPromise } from 'react-promise-tracker';
import IsValidUrl from '../../../../../shared/utils/IsValidUrl';
import { CloseIcon, Dialog, DialogContent, DialogTitle } from '../../../../../shared/modules/MaterialImports/Dialog';
import { Grid } from '../../../../../shared/modules/MaterialImports/Grid';

import InviteTeamMembers from '../../../Settings/Invite/InviteTeamMembers/InviteTeamMembers';
import { ID_ROLE_CANDIDATE_MODULE, ID_SETTINGS_SOVREN } from '../../../../../shared/services/Permissions/IDs';

const ChromeExtensionHeader = () => {

    const navigate = useNavigate();

    const [showSteps, setShowSteps] = useState(false);

    const [steps, setSteps] = useState<{ label: string; completed: boolean; link?: string; inlineLink?: string }[]>([]);

    const capitalizeWords = (text: string): string => {
        return text
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };

    useEffect(() => {
        if (!Boolean(Number(localStorage.getItem('emailEngineAccountActive')))) {
            getEmailAccountsList();
        } else {
            getSteps();
        }
    }, []);

    const getEmailAccountsList = () => {

        trackPromise(
            ApiService.getByParams(193, '/Curately/EmailEngine/getAccounts.jsp', {
                clientId: userLocalData.getvalue('clientId'),
                recrId: userLocalData.getvalue('recrId')
            })
                .then(
                    (response) => {
                        if (response.data.account === `${userLocalData.getvalue('clientId')}_${userLocalData.getvalue('recrId')}`) {
                            if (!Boolean(Number(localStorage.getItem('emailEngineAccountActive')))) {
                                localStorage.setItem('emailEngineAccountActive', "1");
                                updateEmailAccountStatus(true);
                            }
                        }
                        getSteps();
                    }
                )
        )
    }

    const updateEmailAccountStatus = (status: boolean) => {
        // https://qaadminapi.curately.ai/curatelyAdmin/updateRecrEmailEngineAccountStatus
        ApiService.postWithData('admin', 'updateRecrEmailEngineAccountStatus', {
            clientId: userLocalData.getvalue('clientId'),
            recrId: userLocalData.getvalue('recrId'),
            emailEngineAccountCreated: status
        }).then((response) => {
            console.log(response.data);
        })
    }

    const getSteps = () => {
        // https://qaadminapi.curately.ai/curatelyAdmin/getRecrChromeExtensionDetails
        ApiService.postWithData('admin', 'getRecrChromeExtensionDetails', {
            "clientId": userLocalData.getvalue('clientId'),
            "recrId": userLocalData.getvalue('recrId')
        }).then((response) => {
            console.log(response.data);
            if (response.data.Success) {
                //   "recrChromeExtensionDetails": {
                //     "talentPoolCreated": false,
                //     "campaignCreated": false,
                //     "invitedYourTeamMates": false
                // }
                let steps = [];

                // steps.push({ label: 'Connect your email', completed: false });
                // steps.push({ label: 'Install Chrome Extension', completed: false, link: "https://chromewebstore.google.com/detail/curatelyai/bllnefaigeffjgfhpgkpacnlbbldbblm" });
                // steps.push({ label: 'Create a Talent Pool', completed: false, inlineLink: "/" + userLocalData.getvalue('clientName') + "/talentPool/find" });
                // steps.push({ label: 'Create a Campaign', completed: false, inlineLink: "/" + userLocalData.getvalue('clientName') + "/letter/campaigns/candidate/add" });
                // steps.push({ label: 'Invite Your Teammates', completed: false });



                steps.push({ label: 'Connect your email', completed: Boolean(Number(localStorage.getItem('emailEngineAccountActive'))) });
                steps.push({ label: 'Install Chrome Extension', completed: Boolean(localStorage.getItem('curatelyExtensionForLinkedinInstalled')), link: "https://chromewebstore.google.com/detail/curatelyai/bllnefaigeffjgfhpgkpacnlbbldbblm" });
                if (userLocalData.isClient7() || (userLocalData.isChromeExtensionEnabled() && userLocalData.adminSettings(ID_SETTINGS_SOVREN))) {
                    if (userLocalData.checkIntegration(ID_ROLE_CANDIDATE_MODULE)) {
                        steps.push({ label: 'Create a Talent Pool', completed: Boolean(response.data.recrChromeExtensionDetails?.talentPoolCreated), inlineLink: "/" + userLocalData.getvalue('clientName') + "/talentPool/find" });
                    }
                    if (userLocalData.isPaid()) {
                        steps.push({ label: 'Create a Campaign', completed: Boolean(response.data.recrChromeExtensionDetails?.campaignCreated), inlineLink: "/" + userLocalData.getvalue('clientName') + "/letter/campaigns/candidate/add" });
                        if (!userLocalData.getvalue('invitedBy') && (userLocalData.getvalue('paymentType') !== 1) && userLocalData.isClient7()) {
                            steps.push({ label: 'Invite Your Teammates', completed: Boolean(response.data.recrChromeExtensionDetails?.invitedYourTeamMates) });
                        }
                    }
                }

                setSteps(steps);
                if (userLocalData.isPaid()) {
                    if (
                        !Boolean(Number(localStorage.getItem('emailEngineAccountActive'))) ||
                        !Boolean(localStorage.getItem('curatelyExtensionForLinkedinInstalled')) ||
                        !Boolean(response.data.recrChromeExtensionDetails?.talentPoolCreated) ||
                        !Boolean(response.data.recrChromeExtensionDetails?.campaignCreated) ||
                        !Boolean(response.data.recrChromeExtensionDetails?.invitedYourTeamMates)
                    ) {
                        setShowSteps(true);
                    }
                }
                else if (
                    !Boolean(Number(localStorage.getItem('emailEngineAccountActive'))) ||
                    !Boolean(localStorage.getItem('curatelyExtensionForLinkedinInstalled')) ||
                    !Boolean(response.data.recrChromeExtensionDetails.talentPoolCreated)
                ) {
                    setShowSteps(true);
                }
            }
        })
    }

    const createAccount = () => {
        // https://app.curately.ai/Accuick_API/Curately/EmailEngine/createAccount.jsp?account=accuick5&name=Accuick5&email=accuicktest5@gmail.com
        // setIsFormSubmitted(true);
        // if (emailAccountCreateFormik.isValid) {
        trackPromise(
            ApiService.getByParams(193, '/Curately/EmailEngine/createAccount.jsp', {
                clientId: userLocalData.getvalue('clientId'),
                account: `${userLocalData.getvalue('clientId')}_${userLocalData.getvalue('recrId')}`,
                name: userLocalData.getvalue('recrFullName'),
                email: '',
                redirectUrl: window.location.origin + '/#/' + userLocalData.getvalue('clientName') + '/home',
            })
                .then((response) => {
                    console.log(response.data);

                    if (response.data.url) {
                        let tempUrl = response.data.url.replace('http://54.187.123.62:3000', 'https://emailengine.curately.ai');
                        if (IsValidUrl.check(tempUrl)) {
                            // setAccountUrl(tempUrl);
                            window.location.href = tempUrl;
                        }
                    }

                })
        )
        // } else {
        //     showToaster('Please fill all required fields.', 'error');
        // }
    }

    const [openInviteMembersPopup, setOpenInviteMembersPopup] = useState(false);

    return (
        <>
            {
                showSteps ?
                    <div id="ChromeExtensionHeader">
                        <div className="header">
                            <span className="title">Hey {capitalizeWords(userLocalData.getvalue('recrFullName'))}, Let’s Get Started with Curately.ai</span>
                            {/* <CloseIcon className="close-icon" /> */}
                        </div>
                        <div className="progress-bar">
                            <div className="progress" />
                        </div>
                        <div className="steps">
                            {steps.map((step, index) => (
                                // (step.link || step.inlineLink || (step.label === 'Connect your email')) &&
                                <div key={index} className={`step ${!step.completed ? 'cursor-pointer' : ''} ${step.completed ? 'completed' : ''}`} onClick={() => {
                                    if (!step.completed) {
                                        if (step.label === 'Connect your email') {
                                            createAccount();
                                        } else if (step.label === 'Invite Your Teammates') {
                                            setOpenInviteMembersPopup(true);
                                        } else if (step.link) {
                                            window.open(step.link);
                                        } else if (step.inlineLink) {
                                            navigate(step.inlineLink)
                                        }
                                    }
                                }}>
                                    {step.completed ? (
                                        <CheckCircleIcon className="icon" />
                                    ) : (
                                        <ArrowForwardIcon className="icon" />
                                    )}
                                    <span className="step-label">{step.completed ? <s>{step.label}</s> : step.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    :
                    null
            }

            {
                openInviteMembersPopup ?
                    <Dialog open={openInviteMembersPopup} onClose={() => setOpenInviteMembersPopup(false)} >
                        <DialogTitle>
                            <Grid container direction="row" justifyContent="space-between" alignItems="center" >
                                <span className='addHeader'>
                                    Invite Team Members
                                </span>
                                <CloseIcon onClick={() => setOpenInviteMembersPopup(false)} />

                            </Grid>
                        </DialogTitle>
                        <DialogContent sx={{ minWidth: 500 }} className='pt-4'>
                            <InviteTeamMembers closeInvitePopup={(refresh) => {
                                if (refresh) {
                                    getSteps();
                                }
                                setOpenInviteMembersPopup(false);
                            }} />
                        </DialogContent>

                    </Dialog>
                    :
                    null
            }
        </>
    );
};

export default ChromeExtensionHeader;
