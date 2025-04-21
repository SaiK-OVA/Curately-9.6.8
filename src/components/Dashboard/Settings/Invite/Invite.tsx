
import { useEffect, useState } from '../../../../shared/modules/React';
import { Divider } from '../../../../shared/modules/MaterialImports/Divider';
import { Button } from '../../../../shared/modules/MaterialImports/Button';
import { Typography } from '../../../../shared/modules/MaterialImports/Typography';
import { Box } from '../../../../shared/modules/MaterialImports/Box';
// import { Stack } from './../../shared/modules/MaterialImports/Stack';

// import { Avatar } from './../../shared/modules/MaterialImports/Avatar';

// import { Accordion, AccordionDetails, AccordionSummary, ExpandMoreIcon } from '../../shared/modules/MaterialImports/Accordion';
// import { List, ListItem, ListItemIcon, ListItemText } from "./../../shared/modules/MaterialImports/List";
// import { Checkbox } from "../../shared/modules/MaterialImports/FormElements";

import logoImage from '../../../../assets/images/curatelyLogo.png';

import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';

// import AddIcon from '@mui/icons-material/Add';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
// import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

// import { useTheme } from '@mui/material/styles';
// import { Autocomplete, Chip, FormControlLabel, FormGroup, TextField } from '@mui/material';
// import { showToaster } from '../shared/SnackBar/SnackBar';
import { useNavigate } from 'react-router-dom';
import { userLocalData } from '../../../../shared/services/userData';
import { trackPromise } from 'react-promise-tracker';
import ApiService from '../../../../shared/api/api';
// import { getShortName } from '../../shared/utils/ShortName';

import InviteTeamMembers from './InviteTeamMembers/InviteTeamMembers';

import IsValidUrl from '../../../../shared/utils/IsValidUrl';
// import { Grid } from '../../shared/modules/MaterialImports/Grid2';

import './Invite.scss';



const Invite = () => {

    const navigate = useNavigate();


    const [steps, setSteps] = useState<{ label: string; stepName: string }[]>([
    ]);
    // {
    //     label: "Invite your teammates",
    //     stepName: "teammates"
    // },
    // const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = steps.length;

    const handleNext = () => {
        if (activeStep === (maxSteps - 1)) {
            navigate(`/`);
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }

    useEffect(() => {
        let dummySteps = [];
        if (!Boolean(localStorage.getItem('curatelyExtensionForLinkedinInstalled'))) {
            dummySteps.push({
                label: "Download Chrome Extension",
                stepName: "extension"
            });
        }
        dummySteps.push({
            label: "Connect your Email",
            stepName: "email"
        });
        setSteps(dummySteps);
    }, []);


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

    return (
        <div id='Invite'>
            <div className="logo_container" >
                <img src={logoImage} alt="" className="logoImg"></img>
            </div>
            {
                steps.length ?
                    <div className="form_container">
                        <Paper square elevation={0} sx={{ display: 'flex', alignItems: 'center', height: 50, pl: 2, bgcolor: 'background.default', }}>
                            <Typography className='fw-6 fs-16'>{steps[activeStep].label}</Typography>
                        </Paper>
                        <Divider />
                        <div className='body'>

                            <Box sx={{ height: 430, width: '100%', p: 2 }}>
                                {
                                    (steps[activeStep].stepName === "teammates") ?
                                        <InviteTeamMembers closeInvitePopup={(refresh) => {
                                            if (refresh) {
                                                handleNext();
                                            }
                                        }} />
                                        :
                                        null
                                }
                                {
                                    (steps[activeStep].stepName === "extension") ?
                                        <div id="download">
                                            {/* <Stack direction="row" alignItems="center">
                                        <div className='img'>
                                            <img src="/src/assets/images/chrome.png" />
                                        </div>
                                        <AddIcon className='icon' />
                                        <div className='img'>
                                            <img src="/src/assets/images/curately-d.png" />
                                        </div>
                                    </Stack> */}

                                            <div className='teamContent'>
                                                <h3>Download our chrome extension and start smarter onboarding.</h3>
                                                <p className='info'>Curately.ai Chrome extension works right inside LinkedIn, letting you source candidates with one click. You also can use Curately web app simultaneously.</p>
                                                <Button className='download-btn' variant="contained" endIcon={<OpenInNewIcon />} size="large"
                                                    onClick={() => {
                                                        window.open('https://chromewebstore.google.com/detail/curatelyai/bllnefaigeffjgfhpgkpacnlbbldbblm');
                                                        handleNext();
                                                    }}
                                                >
                                                    Download the Chrome Extension
                                                </Button>
                                            </div>
                                        </div>
                                        :
                                        null
                                }
                                {
                                    (steps[activeStep].stepName === "email") ?
                                        <div id="">
                                            <div className='teamContent'>
                                                <h3>Let’s link your mailbox.</h3>
                                                <p className='info'>Link your mailboxes with Curately to gain full functionality of core engagement tools, like emails, Campaigns, meetings and more.</p>
                                                <Button className='download-btn' variant="contained" size="large" onClick={createAccount} >
                                                    Connect Email
                                                </Button>
                                            </div>
                                        </div>
                                        :
                                        null
                                }

                            </Box>
                        </div>
                        <div className='footer'>

                            <MobileStepper
                                variant="dots"
                                steps={maxSteps}
                                position="static"
                                activeStep={activeStep}
                                sx={{ flexGrow: 1, justifyContent: 'space-between' }}
                                nextButton={
                                    <Button size="small"
                                        // disabled={activeStep === (maxSteps - 1)}
                                        onClick={handleNext}
                                        variant='outlined'
                                        color='primary'
                                    >I'll do it later
                                        {
                                            // (activeStep === (maxSteps - 1)) ?
                                            //     <>Go to Dashboard</> :
                                            //     <>I'll do it later</>
                                            // theme.direction === 'rtl' ? (
                                            // <KeyboardArrowLeft />
                                            // ) : (
                                            //     <KeyboardArrowRight />
                                            // )
                                        }
                                    </Button>
                                }
                                backButton={
                                    // <span></span>
                                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                        {/* {theme.direction === 'rtl' ? ( */}
                                        {/* <KeyboardArrowRight /> */}
                                        {/* ) : ( */}
                                        <KeyboardArrowLeft />
                                        {/* )}  */}
                                        {/* Back */}
                                    </Button>
                                }
                            />
                        </div>
                    </div>
                    :
                    null
            }


        </div>
    );
}

export default Invite;
