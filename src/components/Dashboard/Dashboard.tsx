
import { matchPath, Navigate, Outlet, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Suspense, useEffect, useState, lazy } from '../../shared/modules/React';

import { userLocalData } from '../../shared/services/userData';


import { Button, IconButton } from './../../shared/modules/MaterialImports/Button';
import { CircularProgress } from './../../shared/modules/MaterialImports/CircularProgress';
import { Grid } from './../../shared/modules/MaterialImports/Grid';
// import { InputAdornment } from './../../shared/modules/MaterialImports/InputAdornment';



import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import UpgradeOutlinedIcon from '@mui/icons-material/UpgradeOutlined';
// import BoltIcon from '@mui/icons-material/Bolt';
// import SearchIcon from '@mui/icons-material/Search';




const Reports = lazy(() => import('./Reports/Reports'));
const CreateReport = lazy(() => import('./Reports/CreateReport/CreateReport'));
const Sidenav = lazy(() => import('../shared/SideNav/Sidenav'));
const Charts = lazy(() => import('./Reports/Charts/Charts'));
const Refer = lazy(() => import('./Settings/Refer/Refer'));

const Candidate = lazy(() => import('./Candidate/Candidate'));
const Contacts = lazy(() => import('./Contacts/Contacts'));
const Company = lazy(() => import('./Company/Company'));
const Job = lazy(() => import('./Job/Job'));
const ReferralProgram = lazy(() => import('./Referral/ReferralProgram'))
const TalentPool = lazy(() => import('./Pool/TalentPool'));
const Letters = lazy(() => import('./Letters/Letters'));
const Resume = lazy(() => import('./Resume/Resume'));
const UniversalSearch = lazy(() => import('./UniversalSearch/UniversalSearch'));
const DashboardCard = lazy(() => import('./Home/DashboardCard/DashboardCard'));
const Settings = lazy(() => import('./Settings/Settings'));

const UnAuthorized = lazy(() => import('../UnAuthorized/UnAuthorized'));
const ChromeExtensionDashboard = lazy(() => import('./Home/ChromeExtensionDashboard/ChromeExtensionDashboard'));
const ChromeExtensionStatusBar = lazy(() => import('./Home/ChromeExtensionDashboard/SubComponents/ChromeExtensionStatusBar'));
const TeamMembers = lazy(() => import('./Settings/TeamMembers/TeamMembers'));
const Bullhorn = lazy(() => import('./Bullhorn/Bullhorn'));
const Outreach = lazy(() => import('./Reports/Charts/Outreach/Outreach'));
const OutreachKPI = lazy(() => import('./Reports/Charts/OutreachKPI/OutreachKPI'));
const Billing = lazy(() => import('./Billing/Billing'));
const Upgrade = lazy(() => import('./Upgrade/Upgrade'));
const CandidateStatic = lazy(() => import('./Bullhorn/Static/Candidate/Candidate'));
const JobStatic = lazy(() => import('./Bullhorn/Static/Job/Job'));
// const TemplatesStatic = lazy(() => import('./Settings/Templates/TemplatesStatic'));
// import JobStatic from './Bullhorn/Static/Job/Job';

const LinkedInUsage = lazy(() => import('./Reports/LinkedInUsage/LinkedInUsage'));

const DynamicTalentPool = lazy(() => import('./Pool/DynamicTalentPool'));
const Activitylog = lazy(() => import('./Reports/Activitylog/Activitylog'));
const SendingLimit = lazy(() => import('./Settings/SendingLimit/SendingLimit'));
const CreditLimit = lazy(() => import('./Settings/CreditLimit/CreditLimit'));
const JobDiva = lazy(() => import('./JobDiva/JobDiva'))

const Explo = lazy(() => import('./Reports/ExploCharts/Explo'));

const ClientList = lazy(() => import('./DashboardSubComponents/ClientList/ClientList'));

const StillLoggedIn = lazy(() => import('./DashboardSubComponents/StillLoggedIn/StillLoggedIn'));

const ProfileMenu = lazy(() => import('./DashboardSubComponents/ProfileMenu'));
const SMSAndNotification = lazy(() => import('./DashboardSubComponents/SMSAndNotification/SMSAndNotification'));

const HubspotScript = lazy(() => import('./DashboardSubComponents/HubspotScript/HubspotScript'));



import { CuratelyLogo } from '../../shared/images/CuratelyLogo';


import ApiService from '../../shared/api/api';
import { DateTime } from 'luxon';
import { ID_ADDON_PEOPLE_CANDIDATE, ID_ADDON_PEOPLE_CONTACT, ID_ROLE_CONTACT_MODULE, ID_ROLE_PEOPLE } from '../../shared/services/Permissions/IDs';
import { showToaster } from '../shared/SnackBar/SnackBar';
import { trackPromise } from 'react-promise-tracker';
import { useAuth } from '../../shared/services/auth/validating';
import { ChangeEvent, useContext } from 'react';
import { ClientNameStore } from '../../App';
import { globalData } from '../../shared/services/globalData';




import './Dashboard.scss';


// import Grid from '@mui/material/Grid';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import { Link } from 'react-router-dom';
// import logoImage from '../../assets/images/curatelyLogo.png';
// import PermIdentityIcon from '@mui/icons-material/PermIdentity';
// import Header from '../shared/Header/Header';
// import Footer from '../shared/Footer/Footer';
// import Tasks from '../shared/Tasks/Tasks';
// import HomeCards from './HomeCards/HomeCards';
// import MessageIcon from '@mui/icons-material/Message';
// import ApiService from '../../shared/api/api';
// import { trackPromise } from 'react-promise-tracker';
// import { CustomThemeStore } from '../../App';
// import Demo from './Reports/ChartsDemo/Demo';
// import PhoneChat from '../../shared/components/PhoneChat/PhoneChat';
// const Home = lazy(() => import('./Home/Home'));
// const Users = lazy(() => import('./Settings/Users/Users'));
// const DynamicShortlist = lazy(() => import('./DynamicShortlist/DynamicShortlist'));
// const SmsComponent = lazy(() => import('./SmsComponent/SmsComponent'));
// const CreateReport = lazy(() => import('./Reports/CreateReport/CreateReport'));
// import Parsable from '../../shared/utils/Parsable';
// import { Padding } from '@mui/icons-material';



const Dashboard = () => {
    const clientId = userLocalData.getvalue("clientId");
    window.name = 'CuratelyHome';

    const [sideNavOpen, setSideNavOpen] = useState(false);

    const isCRMEnabled = !userLocalData.adminSettings(30003) && !userLocalData.isChromeExtensionEnabled();

    // const [universalSearch, setUniversalSearch] = useState("");
    // const location = useLocation();
    const { pathname } = useLocation();
    const { clientName } = useParams();
    const isSettingsPath = matchPath(`${userLocalData.getvalue('clientName')}/settings/*`, pathname);
    const [isSettingsRoute, setIsSettingsRoute] = useState(false);

    const isJourneysPath = matchPath(`${userLocalData.getvalue('clientName')}/letter/journeys`, pathname);

    // const [searchText, setSearchText] = useState("");

    // const [showSms, setShowSms] = useState(false);

    const toggleOpen = () => {
        setSideNavOpen(!sideNavOpen);
    }

    // const [colorObj, setcolorObj] = useContext(CustomThemeStore);

    useEffect(() => {
        setIsSettingsRoute(isSettingsPath ? true : false)
        // setShowSms(Number(userLocalData.getvalue('phone')) > 99999);

        if (userLocalData.isChromeExtensionEnabled() || userLocalData.adminSettings(ID_ADDON_PEOPLE_CONTACT) || userLocalData.adminSettings(ID_ADDON_PEOPLE_CANDIDATE)) {


            //   const getCredits = () => {
            ApiService.getById('admin', `getCredits/${userLocalData.getvalue('clientId')}`, userLocalData.getvalue('recrId')).then((response) => {
                // console.log(response.data);
                if (response.data.Success) {
                    localStorage.setItem(`credits_${userLocalData.getvalue('recrId')}`, JSON.stringify({
                        consumedEmailCredits: response.data.consumedEmailCredits,
                        consumedProfileCredits: response.data.consumedProfileCredits,
                        consumedSmsCredits: ((response.data.paymentType === 1) || (response.data.paymentType === 2)) ? 0 : response.data.consumedSmsCredits,
                        daysLeft: response.data.daysLeft,
                        totalEmailCredits: response.data.totalEmailCredits,
                        totalProfileCredits: response.data.totalProfileCredits,
                        totalSmsCredits: ((response.data.paymentType === 1) || (response.data.paymentType === 2)) ? 0 : response.data.totalSmsCredits,
                        profilePercentage: ((response.data.consumedProfileCredits / response.data.totalProfileCredits) * 100),
                        isPackageEmailValidity: Number(response.data.totalEmailCredits) ? (Number(response.data.totalEmailCredits) > Number(response.data.consumedEmailCredits)) ? true : false : false,
                        isPackagePhoneValidity: ((response.data.paymentType !== 1) && (response.data.paymentType !== 2) && Number(response.data.totalSmsCredits)) ? (Number(response.data.totalSmsCredits) - Number(response.data.consumedSmsCredits)) ? true : false : false,
                        startDate: response.data.startDate ? DateTime.fromFormat(response.data.startDate.substring(0, 19), 'yyyy-MM-dd hh:mm:ss').toFormat('MM/dd/yyyy ') : "",
                        expireDate: response.data.expireDate ? DateTime.fromFormat(response.data.expireDate.substring(0, 19), 'yyyy-MM-dd hh:mm:ss').toFormat('MM/dd/yyyy ') : ""
                    }));




                    // getDomainRecruitersList(response.data.invitedRecruiterDetails);
                }
            })
            //   }
        }
        // if (userLocalData.getvalue('clientId')) {
        //     getBrandingColors();
        // }
    }, []);

    // const getBrandingColors = () => {
    //     // http://35.155.202.216:8080/QADemoCurately/getbranding/3
    //     // trackPromise(
    //     //     ApiService.getCall(214, `getbrandingColors/${userLocalData.getvalue('clientId')}`).then(
    //     //         (response) => {
    //     //             // console.log(response.data);
    //     //             if (response.data?.Success && response.data?.brandColor && response.data?.buttonColor) {
    //     //                 localStorage.setItem('colorSchema', JSON.stringify({
    //     //                     primary: response.data?.brandColor, // 'var(--c-primary-color)',
    //     //                     secondary: response.data?.buttonColor // '#474747'
    //     //                 }));
    //     //                 setcolorObj({
    //     //                     primary: response.data?.brandColor,
    //     //                     secondary: response.data?.buttonColor
    //     //                 });
    //     //             }
    //     //         }
    //     //     )
    //     // )
    //     let localBrandingData = (localStorage.getItem('brandingData') && Parsable.isJSON(localStorage.getItem('brandingData') || "")) ? JSON.parse(localStorage.getItem('brandingData') || "{}") : {};
    //     if (localBrandingData && (localBrandingData?.brandColor && localBrandingData?.buttonColor)) {
    //         setcolorObj({
    //             primary: localBrandingData?.brandColor,
    //             secondary: localBrandingData?.buttonColor
    //         });
    //     } else {
    //         trackPromise(
    //             ApiService.getCall(214, `getBranding/${userLocalData.getvalue('clientId')}`).then(
    //                 (response) => {
    //                     const tempRespData = response.data;
    //                     if (tempRespData?.Success && tempRespData?.brandColor && tempRespData?.buttonColor) {
    //                         setcolorObj({
    //                             primary: tempRespData?.brandColor,
    //                             secondary: tempRespData?.buttonColor
    //                         });
    //                         localStorage.setItem('brandingData', JSON.stringify({
    //                             "brandId": (tempRespData.brandId) ? tempRespData.brandId : "",
    //                             "logoPath": (tempRespData.logoPath) ? tempRespData.logoPath : "",
    //                             "faviconPath": (tempRespData.faviconPath) ? tempRespData.faviconPath : "",
    //                             "bannerPath": (tempRespData.bannerPath) ? tempRespData.bannerPath : "",
    //                             "buttonColor": (tempRespData.buttonColor) ? tempRespData.buttonColor : colorObj.secondary,
    //                             "brandColor": (tempRespData.brandColor) ? tempRespData.brandColor : colorObj.primary,
    //                             "logoName": (tempRespData.logoName) ? tempRespData.logoName : "",
    //                             "bannerName": (tempRespData.bannerName) ? tempRespData.bannerName : "",
    //                             "chatLogoPath": (tempRespData.chatLogoPath) ? tempRespData.chatLogoPath : "",
    //                             "chatName": (tempRespData.chatName) ? tempRespData.chatName : "",
    //                             "socialPostImagePath": (tempRespData.socialPostImagePath) ? tempRespData.socialPostImagePath : "",
    //                             "socialPostName": (tempRespData.socialPostName) ? tempRespData.socialPostName : "",
    //                             "secondaryLogoPath": (tempRespData.secondaryLogoPath) ? tempRespData.secondaryLogoPath : "",
    //                             "miscellaneousColor": (tempRespData.miscellaneousColor) ? tempRespData.miscellaneousColor : colorObj.miscellaneous,
    //                             "logoUrl": (tempRespData.logoUrl) ? tempRespData.logoUrl : "",
    //                             "secondaryLogoUrl": (tempRespData.secondaryLogoUrl) ? tempRespData.secondaryLogoUrl : "",
    //                             "iconTitle": (tempRespData.iconTitle) ? tempRespData.iconTitle : "",
    //                             "content": (tempRespData.content) ? tempRespData.content : "",
    //                             "logo": "",
    //                             "favicon": "",
    //                             "banner": "",
    //                             "secondaryLogo": "",
    //                             "chatLogo": "",
    //                             "socialPostImage": "",
    //                             "shortName": (tempRespData.shortName) ? tempRespData.shortName : "",
    //                             "clientName": (tempRespData.clientName) ? tempRespData.clientName : "",

    //                         }));
    //                     }


    //                 }
    //             )
    //         )

    //     }
    // }


    const isSMSEnabled = userLocalData.adminSettings(20009) && Number(userLocalData.getvalue('phone')) && !userLocalData.isChromeExtensionEnabled();


    // useEffect(() => {
    //     if (!location.pathname.startsWith("/universalSearch")) {
    //         setUniversalSearch("");
    //     }
    //     // console.log(location.pathname);
    // }, [location]);
    const channelToBroadcast = new BroadcastChannel("checkConsumedProfileCredits");


    useEffect(() => {
        console.log(clientName);
        setTimeout(() => {
            channelToBroadcast.postMessage({
                checkCreditScore: true
            });
        }, 10);
    }, [clientName]);



    let navigate = useNavigate();

    const goToHome = () => {
        setIsSettingsRoute(false);
        navigate("/" + userLocalData.getvalue('clientName') + "/home");
    }
    // const goToRefer = () => {
    //     navigate("/" + userLocalData.getvalue('clientName') + "/refer");
    // }
    const goToUpgrade = () => {
        setIsSettingsRoute(false);
        navigate("/" + userLocalData.getvalue('clientName') + "/upgrade");
    }


    const hubSpotCSS = `#hubspot-messages-iframe-container iframe, #hubspot-messages-iframe-container{
                        display: none !important
                    }`;


    useEffect(() => {

        const handler = (ev: MessageEvent<{
            curatelyExtensionForLinkedin: string;
        }>) => {

            if (ev?.data?.curatelyExtensionForLinkedin) {
                localStorage.setItem('curatelyExtensionForLinkedin', "true")
            }

        }


        localStorage.removeItem('switchCuratelyAccount');

        // const onStorageChange = async () => {
        //     if (Number(selectedClientId) !== Number(userLocalData.getvalue('clientId'))) {
        //         await setSelectedClientId(userLocalData.getvalue('clientId'));
        //         window.location.href = `${globalData.getWindowLocation()}`;
        //     }
        // }

        window.addEventListener('message', handler);
        // window.addEventListener('storage', onStorageChange);


        return () => {
            window.removeEventListener('message', handler);
            // window.removeEventListener('storage', onStorageChange);
        }
    }, []);


    const { settingIds, integrationIds,
        adminIds
    } = localStorage.getItem("masterRequireAuthSettings") ? JSON.parse(localStorage.getItem("masterRequireAuthSettings") as string) : {
        settingIds: {},
        integrationIds: {},
        adminIds: {}
    };

    const [selectedClientId, setSelectedClientId] = useState(userLocalData.getvalue('clientId'));
    const [_clientName, setClientName] = useContext(ClientNameStore);

    let auth = useAuth();
    const handleClientChange = (event: ChangeEvent<HTMLInputElement>) => {

        const dataToPass: { email: string, password: string, clientId?: number; } = {
            email: userLocalData.getvalue('email'),
            password: localStorage.getItem('curatelyPassword') || "",
            clientId: Number(event.target.value)
        };
        trackPromise(
            ApiService.postWithData('admin', 'recruiterLogin', dataToPass).then(
                (response: any) => {
                    // console.log(response.data);
                    if (response.data.recrId) {
                        setSelectedClientId(event.target.value as string);
                        localStorage.setItem('switchCuratelyAccount', "true");
                        localStorage.setItem('accessToken', response.headers['inc-auth-token']);
                        auth.signIn(response.data, response.headers['inc-auth-token'], async () => {
                            await setClientName(response.data.shortName.toLowerCase());
                            window.location.href = `${globalData.getWindowLocation()}`;

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
    };

    const [clientList] = useState<{
        id: number;
        logo: string;
        name: string;
        status: boolean;
    }[]>(
        (localStorage.getItem('curatelyClientList') && JSON.parse(localStorage.getItem('curatelyClientList') as string)?.length)
            ?
            JSON.parse(localStorage.getItem('curatelyClientList') as string)
            :
            []
    )



    return (
        <>
            {
                isJourneysPath && <style>{hubSpotCSS}</style>
            }
            {
                (clientId === 2) ?
                    <Suspense fallback={<CircularProgress className="centered" />}>
                        <HubspotScript />
                    </Suspense>
                    :
                    null
            }
            <Grid sx={{ display: 'flex' }}>
                {/* <nav>
                <Link to="/login">Logout</Link>
            </nav> */}
                <Grid sx={{ flexGrow: 1 }}>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center" className='topBar px-4'>
                        <Grid>
                            <Grid
                                container
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                            >
                                <img src={CuratelyLogo} alt="" className="dashLogoImg" onClick={goToHome}></img>
                                {/* <img src={logoImage} alt="" className="dashLogoImg" onClick={goToHome}></img> */}
                                {
                                    (isSettingsRoute) ?
                                        <></>
                                        :
                                        <IconButton aria-label="Open/Close Menu" onClick={toggleOpen} className='ml-3'>
                                            <MenuOutlinedIcon />
                                        </IconButton>
                                }
                                {
                                    clientList.length ?
                                        <Suspense fallback={<CircularProgress className="centered" />}>
                                            <ClientList
                                                selectedClientId={selectedClientId}
                                                handleClientChange={handleClientChange}
                                                clientList={clientList}
                                            />
                                        </Suspense>
                                        :
                                        null
                                }
                            </Grid>
                        </Grid>
                        <div>
                            <Grid container direction="row" justifyContent="end" alignItems="center" >
                                {/* {
                                showSms ?
                                    <Grid className='mr-5'>
                                        <Tooltip title='Send SMS'>
                                            <IconButton aria-label="Send SMS" onClick={openSmsWindow}>
                                                <MessageIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                    :
                                    null
                            } */}
                                {/* <Grid>
                                <Tooltip title='Sign Out'>
                                    
                                        Sign Out
                                </Tooltip>
                            </Grid> */}
                                <Grid className='mr-5'>
                                    {/* <TextField
                                        id="universalSearch"
                                        name="universalSearch"
                                        // label="Universal Search"
                                        placeholder="Universal Search"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <SearchIcon
                                                        className='searchIcon'
                                                        onClick={
                                                            () => {
                                                                if (universalSearch) {
                                                                    setTimeout(() => {
                                                                        navigate("/" + userLocalData.getvalue('clientName') + "/universalSearch/" + universalSearch);
                                                                    }, 100);
                                                                }
                                                            }
                                                        }
                                                    />
                                                </InputAdornment>
                                            ),
                                            sx: {
                                                // fontSize: 14,
                                                // paddingTop: '0px !important',
                                                // paddingBottom: '0px !important'
                                            }
                                        }}
                                        onKeyDown={(ev) => {
                                            // console.log(`Pressed keyCode ${ev.key}`);
                                            if (ev.key === 'Enter') {
                                                // Do code here
                                                ev.preventDefault();
                                                // setSearchText(universalSearch);
                                                if (universalSearch) {
                                                    setTimeout(() => {
                                                        navigate("/" + userLocalData.getvalue('clientName') + "/universalSearch/" + universalSearch);
                                                    }, 100);
                                                }
                                            }
                                        }}
                                        variant="outlined"
                                        size='small'
                                        value={universalSearch}
                                        onChange={(e) => setUniversalSearch(e.target.value)}
                                    /> */}
                                </Grid>
                                <Grid className='mr-5'>

                                    {/* <Button startIcon={<PermIdentityIcon />}>{fullName}</Button> */}
                                    {/* <Button></Button> */}
                                    <Grid container direction="row" justifyContent="end" alignItems="center">

                                        {
                                            userLocalData.isClient7() && (userLocalData.getvalue('paymentType') !== 4) ?
                                                <Button variant='contained' color='primary' size='small' className='mr-3' onClick={() => {
                                                    goToUpgrade();
                                                }}
                                                    startIcon={<UpgradeOutlinedIcon fontSize="small" />}
                                                >Upgrade</Button>
                                                :
                                                null
                                        }
                                        {
                                            (isSMSEnabled || isCRMEnabled) ?
                                                <Suspense fallback={<CircularProgress className="centered" />}>
                                                    <SMSAndNotification />
                                                </Suspense>
                                                :
                                                null
                                        }

                                        {
                                            userLocalData.isChromeExtensionEnabled() || ((userLocalData.checkIntegration(ID_ROLE_CONTACT_MODULE) || userLocalData.checkIntegration(ID_ROLE_PEOPLE))) ?
                                                <Suspense fallback={<CircularProgress className="centered" />}>
                                                    <ChromeExtensionStatusBar />
                                                </Suspense>
                                                :
                                                null
                                        }
                                        <Suspense fallback={<CircularProgress className="centered" />}>
                                            <ProfileMenu />
                                        </Suspense>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                    {/* <Header></Header> */}
                    <Grid sx={{ display: 'flex' }}>
                        <Grid>
                            <Sidenav open={sideNavOpen} isSettingsRoute={isSettingsRoute} handleSettingsRoute={(value: boolean) => setIsSettingsRoute(value)} />
                        </Grid>
                        <Grid sx={{ flexGrow: 1, minWidth: (sideNavOpen || isSettingsRoute) ? 800 : 1000, maxWidth: (sideNavOpen || isSettingsRoute) ? 'calc(100vw - 220px)' : 'calc(100vw - 55px)' }}>
                            <div className={`routerHeight ${isSettingsPath ? 'pt-0' : ''}`}>
                                <Routes>
                                    <Route index element={
                                        <Navigate to="home" />} />
                                    {/* <Route path="home" element={
                                    <Home />} /> */}
                                    <Route path="home" element={
                                        <Suspense fallback={<CircularProgress className="centered" />}>
                                            {
                                                userLocalData.isChromeExtensionEnabled() ?
                                                    <ChromeExtensionDashboard />
                                                    :
                                                    <DashboardCard />
                                            }
                                        </Suspense>
                                    } />

                                    <Route path="/unAuthorized" element={<UnAuthorized />} />
                                    <Route path="sms" element={
                                        <Suspense fallback={<CircularProgress className="centered" />}>
                                            {/* <SmsComponent /> */}
                                        </Suspense>
                                    } />
                                    <Route path="universalSearch/:searchString" element={
                                        <Suspense fallback={<CircularProgress className="centered" />}>
                                            <UniversalSearch />
                                        </Suspense>
                                    } />
                                    <Route path="candidate/*" element={
                                        <Suspense fallback={<CircularProgress className="centered" />}>
                                            {
                                                integrationIds[40002] ? <Candidate /> : <UnAuthorized />
                                            }
                                            {/* <RequireAuth integrationId={40002}></RequireAuth> */}
                                        </Suspense>
                                    }
                                    />
                                    <Route path="contact/*" element={
                                        <Suspense fallback={<CircularProgress className="centered" />}>
                                            {
                                                integrationIds[40003] ? <Contacts /> : <UnAuthorized />
                                            }
                                            {/* <RequireAuth integrationId={40003}><Contacts /></RequireAuth> */}
                                        </Suspense>
                                    }
                                    />
                                    <Route path="company/*" element={
                                        <Suspense fallback={<CircularProgress className="centered" />}>
                                            {
                                                settingIds[10002] ? <Company /> : <UnAuthorized />
                                            }
                                            {/* <RequireAuth settingId={10002}><Company /></RequireAuth> */}
                                        </Suspense>
                                    }
                                    />
                                    <Route path="Job/*" element={
                                        <Suspense fallback={<CircularProgress className="centered" />}>
                                            {
                                                integrationIds[40001] ? <Job /> : <UnAuthorized />
                                            }
                                            {/* <RequireAuth integrationId={40001}><Job /></RequireAuth> */}
                                        </Suspense>
                                    } />
                                    <Route path="Letter/*" element={
                                        <Suspense fallback={<CircularProgress className="centered" />}>
                                            <Letters />
                                        </Suspense>
                                    } />
                                    <Route path="resume/*" element={
                                        <Suspense fallback={<CircularProgress className="centered" />}>
                                            <Resume />
                                            {/* <RequireAuth integrationId={40007}><Resume /></RequireAuth> */}
                                        </Suspense>
                                    } />
                                    <Route path="Bullhorn/*" element={
                                        <Suspense fallback={<CircularProgress className="centered" />}>
                                            {
                                                adminIds[20043] ? <Bullhorn /> : <UnAuthorized />
                                            }
                                        </Suspense>
                                    } />
                                    <Route path="JobDiva/*" element={
                                        <Suspense fallback={<CircularProgress className="centered" />}>
                                            <JobDiva />
                                            {/* {
                                                adminIds[20047] ? <JobDiva /> : <UnAuthorized />
                                            } */}
                                        </Suspense>
                                    } />
                                    <Route path="settings/*" element={
                                        <Suspense fallback={<CircularProgress className="centered" />}>
                                            {
                                                settingIds[10001] ? <Settings /> : <UnAuthorized />
                                            }
                                            {/* <RequireAuth settingId={10001}><Settings /></RequireAuth> */}
                                        </Suspense>
                                    } />

                                    <Route path="settings/sendingLimit" element={
                                        <Suspense fallback={<CircularProgress className="centered" />}>
                                            {adminIds[20024] ? <SendingLimit /> : <UnAuthorized />}
                                        </Suspense>
                                    } />

                                    <Route path="settings/credit-limit" element={
                                        <Suspense fallback={<CircularProgress className="centered" />}>
                                            <CreditLimit />
                                        </Suspense>
                                    } />

                                    {/* <Route path="settings/users" element={
                                        <Suspense fallback={<CircularProgress className="centered" />}>
                                        {
                                        settingIds[100001] ? <Users />}    : <UnAuthorized />
                                        // <RequireAuth settingId={100001}><Users /></RequireAuth>
                                        </Suspense>
                                    } /> */}

                                    <Route path="talentPool/*" element={
                                        <Suspense fallback={<CircularProgress className="centered" />}>
                                            {integrationIds[400006] || integrationIds[400007] && adminIds[20020] ? <TalentPool /> : <UnAuthorized />}
                                            {/* <RequireAuth integrationId={400007}><TalentPool /></RequireAuth> */}
                                        </Suspense>
                                    } />
                                    <Route path="dynamictalentPool/*" element={
                                        <Suspense fallback={<CircularProgress className="centered" />}>
                                            {
                                                integrationIds[400006] || integrationIds[400007] && adminIds[20020] && (userLocalData.getvalue('paymentType') !== 1) && !userLocalData.isChromeExtensionEnabled() ? <DynamicTalentPool /> : <UnAuthorized />
                                            }
                                        </Suspense>
                                    } />
                                    <Route path="referralProgram" element={
                                        <Suspense fallback={<CircularProgress className="centered" />}>
                                            <ReferralProgram />
                                        </Suspense>
                                    } />
                                    <Route path="reports/usage" element={
                                        <Suspense fallback={<CircularProgress className="centered" />}>
                                            <Activitylog type='' closeInvitePopup={() => { }} />
                                        </Suspense>
                                    } />
                                    <Route path="reports/outreachactivity" element={
                                        <Suspense fallback={<CircularProgress className="centered" />}>
                                            {adminIds[20049] ? <Outreach /> : <UnAuthorized />}
                                        </Suspense>
                                    } />
                                    <Route path="reports/outreachkpi" element={
                                        <Suspense fallback={<CircularProgress className="centered" />}>
                                            {adminIds[20050] ? <OutreachKPI /> : <UnAuthorized />}
                                        </Suspense>
                                    } />

                                    <Route path="reports/LinkedInViewedProfiles" element={
                                        <Suspense fallback={<CircularProgress className="centered" />}>
                                            {adminIds[20051] ? <LinkedInUsage /> : <UnAuthorized />}
                                        </Suspense>
                                    } />


                                    <Route path="reports/:reportName" element={
                                        <Suspense fallback={<CircularProgress className="centered" />}>
                                            <Reports />
                                        </Suspense>
                                    } />
                                    <Route path="reports/custom/*" element={
                                        <Suspense fallback={<CircularProgress className="centered" />}>
                                            {integrationIds[400037] && adminIds[20037] && !adminIds[30003] ? <CreateReport /> : <UnAuthorized />}
                                            {/* <RequireAuth integrationId={400037}><CreateReport /></RequireAuth> */}
                                        </Suspense>
                                    } />
                                    <Route path="reports/charts/*" element={
                                        <Suspense fallback={<CircularProgress className="centered" />}>
                                            <Charts />
                                        </Suspense>
                                    } />

                                    {/* <Route path="/dynamicShortlist" element={

                                    <Suspense fallback={<CircularProgress className="centered" />}>
                                        <DynamicShortlist />
                                    </Suspense>
                                }
                                ></Route> */}
                                    <Route path="reports/explocharts/*" element={<Suspense fallback={<CircularProgress className="centered" />}><Explo /></Suspense>} />

                                    <Route path="billing" element={<Suspense fallback={<CircularProgress className="centered" />}><Billing /></Suspense>} />
                                    <Route path="upgrade" element={<Suspense fallback={<CircularProgress className="centered" />}>
                                        {userLocalData.isChromeExtensionEnabled() || userLocalData.isClient7() ? <Upgrade /> : <UnAuthorized />}</Suspense>} />
                                    <Route path="refer" element={<Suspense fallback={<CircularProgress className="centered" />}>
                                        {userLocalData.isChromeExtensionEnabled() && userLocalData.isClient7() ? <Refer /> : <UnAuthorized />}</Suspense>} />
                                    <Route path="team" element={<Suspense fallback={<CircularProgress className="centered" />}>
                                        {userLocalData.isChromeExtensionEnabled() && (userLocalData.getvalue('paymentType') !== 1) && userLocalData.isClient7() ? <TeamMembers /> : <UnAuthorized />}
                                    </Suspense>} />
                                    <Route path="static/candidate" element={<Suspense fallback={<CircularProgress className="centered" />}><CandidateStatic reRoute={false} /></Suspense>} />
                                    <Route path="static/job" element={<Suspense fallback={<CircularProgress className="centered" />}><JobStatic reRoute={false} /></Suspense>} />


                                    <Route path="*" element={
                                        <main style={{ padding: "1rem" }}> <p>There's nothing here!</p> </main>} />

                                    {/* <Route path="*" element={
                                    <Navigate to="home" />} /> */}
                                </Routes>
                                <Outlet></Outlet>
                            </div>
                        </Grid>
                    </Grid>
                    {/* <Footer></Footer> */}
                </Grid>
            </Grid >
            <Suspense fallback={<CircularProgress className="centered" />}>
                <StillLoggedIn />
            </Suspense>
        </>
    );
}

export default Dashboard;
