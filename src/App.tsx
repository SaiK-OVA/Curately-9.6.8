import { createContext } from 'react';

import { useState, useMemo, useEffect, Suspense, lazy, Fragment, SyntheticEvent } from './shared/modules/React';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { AuthProvider, RequireAuth } from './shared/services/auth/validating';
import { Loader } from './components/shared/Loader/Loader';

import { trackPromise, usePromiseTracker } from 'react-promise-tracker';

import { StyledEngineProvider, ThemeProvider, createTheme } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';

import customTheme from "./shared/styles/theme/theme";
import ApiService from './shared/api/api';
// import AppData from './shared/data/version';
import { ToasterSnackbar } from './components/shared/SnackBar/SnackBar';
import { ConfirmDialog } from './components/shared/ConfirmDialog/ConfirmDialog';


import { Button, IconButton } from './shared/modules/MaterialImports/Button'
import { CircularProgress } from './shared/modules/MaterialImports/CircularProgress'

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import { userLocalData } from './shared/services/userData';

import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import Parsable from './shared/utils/Parsable';



const AccuickResumeSearch1 = lazy(() => import('./components/Dashboard/Resume/AccuickResumeSearch/AccuickResumeSearch1'));
const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'));
const Login = lazy(() => import('./components/Login/Login'));
const Logout = lazy(() => import('./components/Login/Logout'));
const SignIn = lazy(() => import('./components/Signin/Signin'));
const CallReport = lazy(() => import('./components/Dashboard/Reports/CallReport/CallReport'));
const ViewCandidateTalentPool = lazy(() => import('./components/Dashboard/Candidate/ViewCandidate/ViewCandidateTalentPool'));
const GetActivity = lazy(() => import('./components/Dashboard/Candidate/ViewCandidate/GetActivities'))
const LinkEmailAccount = lazy(() => import('./components/Dashboard/Settings/Email/LinkEmailAccount'));
const Invite = lazy(() => import('./components/Dashboard/Settings/Invite/Invite'));
const Feedback = lazy(() => import('./components/Feedback/Feedback'));
const Unsubscribe = lazy(() => import('./components/Unsubscribe/Unsubscribe'));

// const VerifyAuth = lazy(() => import('./components/Login/VerifyAuth/VerifyAuth'));

// const ViewCompany = lazy(() => import('./components/Dashboard/Company/View/ViewCompany'));
// const ViewContact = lazy(() => import('./components/Dashboard/Contacts/View/ViewContact'));
// const ViewJob = lazy(() => import('./components/Dashboard/Job/View/ViewJob'));
// const ListJob = lazy(() => import('./components/Dashboard/Job/List/ListJob'));
// const ViewCandidate = lazy(() => import('./components/Dashboard/Candidate/ViewCandidate/ViewCandidate'));
// const Activities = lazy(() => import('./components/shared/Activities/Activities'));
// const Tasks = lazy(() => import('./components/shared/Tasks/Tasks'));
// const Workflow = lazy(() => import('./components/Dashboard/Job/Workflow/Workflow'));

// import CircularProgress from '@mui/material/CircularProgress';

// import CustomCss from './shared/styles/custom';
const CustomCss = lazy(() => import('./shared/styles/custom'));
const CandidateStatic = lazy(() => import('./components/Dashboard/Bullhorn/Static/Candidate/Candidate'));
const JobStatic = lazy(() => import('./components/Dashboard/Bullhorn/Static/Job/Job'));
const PinCuratelyCard = lazy(() => import('./components/Login/PinCuratelyCard/PinCuratelyCard'));
const TemplatesStatic = lazy(() => import('./components/Dashboard/Settings/Templates/TemplatesStatic'));


import './App.scss';
import ErrorModal from './components/shared/ErrorModal/ErrorModal';




export const CustomThemeStore = createContext<any>({});
export const ClientNameStore = createContext<any>("");


export const Store = createContext<any>(null);

export const FormStore = createContext<any>([]);

export const EmbedModalState = createContext<any>(null);

export const AllStore = createContext<any>(null);

// { primary: string; secondary: string }
// { primary: '#146ef6', secondary: 'var(--c-secondary-color)' }

function App() {
    // console.clear();
    // console.log(new Date());
    // CSS.supports('color', '#007')
    // useEffect(() => {
    //     console.log(import.meta.env.VITE_APP_VERSION);
    // }, [])



    // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [colorObj, setcolorObj] = useState({
        primary: '#146ef6',
        secondary: '#474747'
    });
    const checkVersion = () => {
        trackPromise(
            // ApiService.getByParams(193, 'version_control.jsp', { clientName: import.meta.env.VITE_APP_NAME }).then((response: any) => {
            ApiService.postWithData('admin', 'getVersionControl', { clientName: import.meta.env.VITE_APP_NAME }).then((response: any) => {
                // console.log(response.data.version);
                if (response.data.version) {
                    if (response.data.version === import.meta.env.VITE_APP_VERSION) {

                    } else {
                        setReloadOpen(true);
                        if (process.env.NODE_ENV === "development" || window.location.protocol === 'http:') {
                            // alert('Version not matching');
                            // window.stop();
                        } else {
                            // window.location.reload();
                        }
                    }
                }
            })
        )
    }

    const checkColorSchema = () => {
        let tempColorObjFromLocal = localStorage.getItem('colorSchema');
        if (tempColorObjFromLocal && Parsable.isJSON(tempColorObjFromLocal)) {
            let tempColorObj = JSON.parse(tempColorObjFromLocal);
            if (tempColorObj.primary && tempColorObj.secondary) {
                // setcolorObj({
                //     primary: tempColorObj.primary,
                //     secondary: tempColorObj.secondary
                // })
            }
        }
    }

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    primary: { main: colorObj.primary },
                    secondary: {
                        main: colorObj.secondary,
                    },
                    // mode: prefersDarkMode ? 'dark' : 'light',
                },
                typography: customTheme.typography
            }),
        [colorObj.primary, colorObj.secondary]
    );
    // useEffect(() => {
    //     document.body.style.setProperty('--c-primary-color', colorObj.primary);
    //     document.body.style.setProperty('--c-secondary-color', colorObj.secondary);
    //     // console.log(colorObj.primary);
    //     // console.log(colorObj.secondary);
    // }, [colorObj.primary, colorObj.secondary]);

    const [showChromeExtensionPinPopup, setShowChromeExtensionPinPopup] = useState(false);

    // const [searchParams] = useSearchParams();
    // const showPopup = searchParams.get("showPopup") ? searchParams.get("showPopup") : "";

    useEffect(() => {
        async function loadInitialData() {
            checkVersion();
            checkColorSchema();
            // const myInterval = setInterval(() => {
            //     checkVersion();
            // }, 120 * 1000);
            // return () => clearInterval(myInterval);
            sessionStorage.clear();


            const matchQueryString = window.location.href.match(/\?(.*?)#/);
            if (matchQueryString) {
                const urlParams = new URLSearchParams(matchQueryString ? matchQueryString[1] : "");
                if (urlParams.get('showPopup') === "ce") {
                    await localStorage.setItem('showPopup', 'ce');
                    const removeextrParameters = window.location.href.replace(/\?.*?#/, '#');
                    window.location.href = removeextrParameters;
                    return;
                }
                if (urlParams.get('account') && urlParams.get('state') && userLocalData.getvalue('clientName')) {
                    await localStorage.setItem('redirectToEmailSettings', 'true');
                    const removeextrParameters = window.location.href.replace(/\?.*?#/, '#');
                    window.location.href = removeextrParameters;
                    return;
                }
                if (urlParams.get('code') && urlParams.get('state') === 'cronofyCode') {
                    // await localStorage.setItem('redirectToCronfy', 'true');
                    await localStorage.setItem('cronofyCode', urlParams.get('code') || '');
                    // const removeextrParameters = window.location.href.replace(/\?.*?#/, '#');
                    // window.location.href = removeextrParameters;
                    window.location.href = window.location.origin + "/#/" + userLocalData.getvalue('clientName') + "/settings/email"
                    return;
                }
            }

            const queryString = window.location.href.split('?')[1];
            const urlParams = new URLSearchParams(queryString);

            if (urlParams.get('showPopup') === "ce") {
                setShowChromeExtensionPinPopup(true);
            } else if (localStorage.getItem('showPopup') === 'ce') {
                setShowChromeExtensionPinPopup(true);
                localStorage.removeItem('showPopup');
            } else if (localStorage.getItem('redirectToEmailSettings') === 'true') {
                // navigate('/linkEmailAccount');
                localStorage.removeItem('redirectToEmailSettings');

                let navigate = useNavigate();
                navigate("/" + userLocalData.getvalue('clientName') + "/settings/email");
            }
            // else if (localStorage.getItem('redirectToCronfy') === 'true') {
            //     localStorage.removeItem('redirectToCronfy');
            //     let navigate = useNavigate();
            //     navigate("/" + userLocalData.getvalue('clientName') + "/settings/email");
            // }
        }

        loadInitialData();
    }, []);


    const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setReloadOpen(false);
        if (event) { }
    };

    const reloadApplication = () => {
        window.location.reload();
    }

    const [reloadOpen, setReloadOpen] = useState(false);


    const { promiseInProgress } = usePromiseTracker();
    const [clientName, setClientName] = useState<string>(userLocalData.getvalue('clientName') || "");

    const [propsData, setPropsData] = useState({
        isPreview: false,
        isEmbedImg: ({}),
        isEmbedAudio: ({}),
        isEmbedVideo: ({}),
        isEmbedAnything: ({}),
        embedfields: [],
        rankingOptions: [],
        rankingChoices: [],
        dropDownOptions: [],
        multipleChoices: [],
        embededImages: [],
        embededVideos: [],
        embededAudios: [],
        embededFiles: []
    });
    const [modalData, setEmbedModalOpen] = useState({
        open: false,
        field: null
    });

    const [formData, setFormData] = useState([]);
    const [allData, setAllData] = useState({});

    // useEffect(() => {
    //     console.log(clientName);
    // }, [clientName]);

    const { isLoading } = useAuth0();

    return (
        <Auth0Provider
            domain={import.meta.env.VITE_AUTH0_DOMAIN}
            clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
            authorizationParams={{
                redirect_uri: `${window.location.origin}${window.location.pathname}#/login`,
            }}
        >
            <StyledEngineProvider injectFirst>
                <div className={`App ${promiseInProgress ? 'loading' : ''}`} data-name={import.meta.env.VITE_APP_NAME} data-version={import.meta.env.VITE_APP_VERSION}>
                    <ClientNameStore.Provider value={[clientName, setClientName]}>
                        <CustomThemeStore.Provider value={[colorObj, setcolorObj]}>
                            <ThemeProvider theme={theme}>
                                <AuthProvider>
                                    <Store.Provider value={[propsData, setPropsData]}>
                                        <EmbedModalState.Provider value={[modalData, setEmbedModalOpen]}>

                                            <FormStore.Provider value={[formData, setFormData]} >
                                                <AllStore.Provider value={[allData, setAllData]} >
                                                    <Routes>
                                                        <Route path="/login" element={<Suspense fallback={<CircularProgress className="centered" />}><Login /></Suspense>} />
                                                        <Route path="/forgot" element={<Suspense fallback={<CircularProgress className="centered" />}><Login /></Suspense>} />
                                                        <Route path="/reset" element={<Suspense fallback={<CircularProgress className="centered" />}><Login /></Suspense>} />
                                                        <Route path="/password-reset" element={<Suspense fallback={<CircularProgress className="centered" />}><Login /></Suspense>} />

                                                        <Route path="/signin" element={<Suspense fallback={<CircularProgress className="centered" />}><SignIn /></Suspense>} />
                                                        <Route path="/signup" element={<Suspense fallback={<CircularProgress className="centered" />}><SignIn /></Suspense>} />
                                                        <Route path="/logout" element={<Suspense fallback={<CircularProgress className="centered" />}><Logout /></Suspense>} />
                                                        <Route path="/feedback" element={<Suspense fallback={<CircularProgress className="centered" />}><Feedback /></Suspense>} />
                                                        <Route path="/unsubscribe" element={<Suspense fallback={<CircularProgress className="centered" />}><Unsubscribe /></Suspense>} />
                                                        <Route path="static/candidate" element={<Suspense fallback={<CircularProgress className="centered" />}><CandidateStatic reRoute={true} /></Suspense>} />
                                                        <Route path="static/job" element={<Suspense fallback={<CircularProgress className="centered" />}><JobStatic reRoute={true} /></Suspense>} />

                                                        <Route path="static/template/:templateId" element={
                                                            <Suspense fallback={<CircularProgress className="centered" />}>
                                                                <TemplatesStatic />
                                                            </Suspense>
                                                        } />

                                                        <Route path="/:clientName/welcome" element={<Suspense fallback={<CircularProgress className="centered" />}><RequireAuth><Invite /></RequireAuth></Suspense>} />
                                                        {/* <Route path="/authVerify" element={<VerifyAuth />} /> */}
                                                        <Route path="/:clientName/googleJobs" element={<Suspense fallback={<CircularProgress className="centered" />}><AccuickResumeSearch1 /></Suspense>} />
                                                        <Route path="/:clientName/talentPool/Candidate/view/:candidateId" element={
                                                            <Suspense fallback={<CircularProgress className="centered" />}><ViewCandidateTalentPool /></Suspense>
                                                        }
                                                        ></Route>
                                                        <Route path="/:clientName/candidate/activityLog" element={
                                                            <Suspense fallback={<CircularProgress className="centered" />}><GetActivity /></Suspense>
                                                        }
                                                        ></Route>
                                                        <Route path="/:clientName/*" element={
                                                            <Suspense fallback={<CircularProgress className="centered" />}>
                                                                <RequireAuth>
                                                                    <Dashboard />
                                                                </RequireAuth>
                                                            </Suspense>
                                                        }
                                                        >
                                                        </Route>
                                                        <Route path="/:clientName/callReport" element={
                                                            <Suspense fallback={<CircularProgress className="centered" />}><RequireAuth><CallReport /></RequireAuth></Suspense>}>
                                                        </Route>
                                                        <Route path="/:clientName/linkEmailAccount" element={
                                                            <Suspense fallback={<CircularProgress className="centered" />}><RequireAuth><LinkEmailAccount /></RequireAuth></Suspense>}>
                                                        </Route>
                                                        {/* <Route path="/:clientName/job/workflow/:jobId" element={
                                                            <Suspense fallback={<CircularProgress className="centered" />}><RequireAuth integrationId={40001}><Workflow /></RequireAuth></Suspense>}
                                                        ></Route> */}
                                                        {/* <Route path="/:clientName/company/view/:companyId" element={
                                                            <Suspense fallback={<CircularProgress className="centered" />}><RequireAuth><ViewCompany /></RequireAuth></Suspense>}
                                                        ></Route> */}
                                                        <Route path="*" element={<Navigate to={(clientName) ? `/${clientName}/home` : "/login"} />} />
                                                        {/* <Route path="*" element={<Navigate to={(clientName) ? `/${clientName}/home` : `/login?redirectTo=${window.location.hash}`} />} /> */}

                                                    </Routes>
                                                </AllStore.Provider>
                                            </FormStore.Provider>
                                        </EmbedModalState.Provider>
                                    </Store.Provider>
                                    <Suspense fallback={<div></div>}>
                                        <CustomCss />
                                    </Suspense>
                                </AuthProvider>
                            </ThemeProvider>

                        </CustomThemeStore.Provider>
                    </ClientNameStore.Provider>
                </div>
                <ToasterSnackbar />
                <ConfirmDialog />
                <ErrorModal />
                <Snackbar
                    open={reloadOpen}
                    autoHideDuration={60000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                // message=""
                >
                    <Alert
                        onClose={handleClose}
                        severity="info"
                        // sx={{ width: '100%' }}
                        action={
                            <Fragment>
                                <Button color="primary" size="small" onClick={reloadApplication}>
                                    Reload
                                </Button>
                                <IconButton
                                    size="small"
                                    aria-label="close"
                                    color="inherit"
                                    onClick={handleClose}
                                >
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </Fragment>
                        }>
                        A new version of Application is available!
                    </Alert>
                </Snackbar>
                {
                    (promiseInProgress || isLoading) ? <Loader /> : null
                }

                {showChromeExtensionPinPopup ?
                    <PinCuratelyCard
                        onClose={() => setShowChromeExtensionPinPopup(false)}
                    />
                    :
                    null
                }
            </StyledEngineProvider>
        </Auth0Provider >
    );
}

export default App;
