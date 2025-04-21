import { React, Suspense } from '../../../shared/modules/React';
import { Outlet, Routes, Route } from 'react-router-dom';
import { CircularProgress } from '../../../shared/modules/MaterialImports/CircularProgress';
// import { RequireAuth } from '../../../shared/services/auth/validating';
import Hubspot from './Integrations/Hubspot/Hubspot';
import { Grid } from '../../../shared/modules/MaterialImports/Grid';
import { userLocalData } from '../../../shared/services/userData';
// import { userLocalData } from '../../../shared/services/userData';


const Users = React.lazy(() => import('./Users/Users'));
const Roles = React.lazy(() => import('./Roles/Roles'));
const Branding = React.lazy(() => import('./Branding/Branding'));
const JobContent = React.lazy(() => import('./JobContent/JobContent'));
const Sources = React.lazy(() => import('./Sources/Sources'));
const Holidays = React.lazy(() => import('./Holidays/Holidays'));
const Goals = React.lazy(() => import('./Goals/Goals'));
const Metrics = React.lazy(() => import("./Goals/Metric"))
const Templates = React.lazy(() => import('./Templates/Templates'));
const Templates1 = React.lazy(() => import('./Templates/Templates1'));
const Reason = React.lazy(() => import('./Reason/Reason'));
const OptionBanks = React.lazy(() => import('./OptionBank/OptionBank'));
const DuplicateSettings = React.lazy(() => import('./DuplicateSettings/DuplicateSettings'));
const CustomForms = React.lazy(() => import('./CustomForms/CustomForms'));

const JobBoards = React.lazy(() => import('./JobBoards/JobBoards'));
const Policies = React.lazy(() => import('./Policies/Policies'));
const Integrations = React.lazy(() => import('./Integrations/Integrations'))
const EmailAccountsList = React.lazy(() => import('./Email/EmailAccountsList'));
const Email = React.lazy(() => import('./Email/Email'));

const AddVideo = React.lazy(() => import('./AddVideo/AddVideo'));
const AutomationFlow = React.lazy(() => import('./AutomationFlow/AutomationFlow'));

const ReferFriend = React.lazy(() => import('./ReferFriend/ReferFriend'));
const AddVideoList = React.lazy(() => import('./AddVideoList/AddVideoList'));
const DataLabs = React.lazy(() => import('../Resume/People/components/DataLabs/DataLabs'));

import UnAuthorized from '../../UnAuthorized/UnAuthorized';

// const User = React.lazy(() => import('./User/User'));
// const Users = React.lazy(() => import('./Users/Users'));
// const Templates = React.lazy(() => import('./Templates/Templates'));
// const Registration = React.lazy(() => import('./Registration/Registration'));



import './Settings.scss';
import { ID_ROLE_EMAIL_AND_SMS_CAN_EDIT_VIEW_MESSAGE_TEMPLATES } from '../../../shared/services/Permissions/IDs';


const Settings = () => {


    const { settingIds, integrationIds, adminIds } = localStorage.getItem("masterRequireAuthSettings") ? JSON.parse(localStorage.getItem("masterRequireAuthSettings") as string) : {
        settingIds: {},
        integrationIds: {},
        adminIds: {}
    };


    return (

        <Grid sx={{ display: 'flex' }} id='settings'>
            <Grid sx={{ flexGrow: 1, maxWidth: "100%" }}>
                <Routes>
                    <Route path="users" element={<Suspense fallback={<CircularProgress className="centered" />}>
                        {
                            settingIds[100001] ? <Users /> : <UnAuthorized />
                        }
                        {/* <RequireAuth settingId={100001}><Users /></RequireAuth> */}
                    </Suspense>} />
                    <Route path="roles" element={<Suspense fallback={<CircularProgress className="centered" />}>
                        {
                            settingIds[100002] ? <Roles /> : <UnAuthorized />
                        }
                        {/* <RequireAuth settingId={100002}><Roles /></RequireAuth> */}
                    </Suspense>} />
                    <Route path="branding" element={<Suspense fallback={<CircularProgress className="centered" />}>
                        {
                            settingIds[110001] && !adminIds[30003] && adminIds[20005] ? <Branding /> : <UnAuthorized />
                        }
                        {/* <RequireAuth settingId={110001}><Branding /></RequireAuth> */}
                    </Suspense>} />
                    <Route path="job-content" element={<Suspense fallback={<CircularProgress className="centered" />}>
                        {
                            settingIds[110001] && !adminIds[30003] && adminIds[20005] ? <JobContent /> : <UnAuthorized />
                        }
                    </Suspense>} />
                    <Route path="sources" element={<Suspense fallback={<CircularProgress className="centered" />}>
                        {
                            settingIds[110005] && adminIds[20005] ? <Sources /> : <UnAuthorized />
                        }
                        {/* <RequireAuth settingId={110005}><Sources /></RequireAuth> */}
                    </Suspense>} />
                    <Route path="holidays" element={<Suspense fallback={<CircularProgress className="centered" />}>
                        {
                            settingIds[130008] ? <Holidays /> : <UnAuthorized />
                        }
                        {/* <RequireAuth settingId={130008}><Holidays /></RequireAuth> */}
                    </Suspense>} />
                    <Route path="goals" element={<Suspense fallback={<CircularProgress className="centered" />}>
                        {!userLocalData.isChromeExtensionEnabled() ? <Goals /> : <UnAuthorized />}
                    </Suspense>} />
                    <Route path="metrics" element={<Suspense fallback={<CircularProgress className="centered" />}>
                        {!userLocalData.isChromeExtensionEnabled() ? <Metrics /> : <UnAuthorized />}
                    </Suspense>} />
                    <Route path="templates" element={<Suspense fallback={<CircularProgress className="centered" />}>
                        {integrationIds[ID_ROLE_EMAIL_AND_SMS_CAN_EDIT_VIEW_MESSAGE_TEMPLATES] ? <Templates /> : <UnAuthorized />}
                    </Suspense>} />
                    <Route path="Templates1" element={<Suspense fallback={<CircularProgress className="centered" />}><Templates1 /></Suspense>} />
                    <Route path="reasons" element={<Suspense fallback={<CircularProgress className="centered" />}>
                        {
                            settingIds[130003] && adminIds[20025] ? <Reason /> : <UnAuthorized />
                        }
                        {/* <RequireAuth settingId={130003}><Reason /></RequireAuth> */}
                    </Suspense>} />
                    <Route path="optionBank" element={<Suspense fallback={<CircularProgress className="centered" />}>
                        {
                            settingIds[130004] && !adminIds[30002] && !adminIds[30003] && adminIds[20023] ? <OptionBanks /> : <UnAuthorized />
                        }
                        {/* <RequireAuth settingId={130004}><OptionBanks /></RequireAuth> */}
                    </Suspense>} />
                    <Route path="duplicatesettings" element={<Suspense fallback={<CircularProgress className="centered" />}>
                        {
                            settingIds[130005] && !adminIds[30003] && adminIds[20005] ? <DuplicateSettings /> : <UnAuthorized />
                        }
                        {/* <RequireAuth settingId={130005}><DuplicateSettings /></RequireAuth> */}
                    </Suspense>} />
                    <Route path="CustomFields" element={<Suspense fallback={<CircularProgress className="centered" />}>
                        {
                            settingIds[130002] && adminIds[20005] ? <CustomForms /> : <UnAuthorized />
                        }
                        {/* <RequireAuth settingId={130002}><CustomForms /></RequireAuth> */}
                    </Suspense>} />

                    <Route path="jobBoards" element={<Suspense fallback={<CircularProgress className="centered" />}>
                        {!adminIds[30003] && adminIds[20016] ? <JobBoards /> : <UnAuthorized />}
                    </Suspense>} />
                    <Route path="policies" element={<Suspense fallback={<CircularProgress className="centered" />}>
                        {!adminIds[30003] && adminIds[20005] ? <Policies /> : <UnAuthorized />}
                    </Suspense>} />
                    <Route path="integrations" element={<Suspense fallback={<CircularProgress className="centered" />}>
                        {userLocalData.getvalue('paymentType') !== 1 ? <Integrations /> : <UnAuthorized />}
                    </Suspense>} />
                    <Route path="integrations/hubspot" element={<Suspense fallback={<CircularProgress className="centered" />}><Hubspot /></Suspense>} />
                    <Route path="email" element={<Suspense fallback={<CircularProgress className="centered" />}><EmailAccountsList /></Suspense>} />
                    <Route path="email/:accountId" element={<Suspense fallback={<CircularProgress className="centered" />}><Email /></Suspense>} />

                    <Route path="videos/*" element={<Suspense fallback={<CircularProgress className="centered" />}><AddVideo /></Suspense>} />
                    <Route path="videoslist/*" element={<Suspense fallback={<CircularProgress className="centered" />}>
                        {!adminIds[30003] && adminIds[20025] ? <AddVideoList /> : <UnAuthorized />}
                    </Suspense>} />
                    <Route path="hiringWorkflow/*" element={<Suspense fallback={<CircularProgress className="centered" />}>
                        {
                            adminIds[20027] && !adminIds[30003] ? <AutomationFlow /> : <UnAuthorized />
                        }
                        {/* <RequireAuth adminId={20027}><AutomationFlow /></RequireAuth> */}
                    </Suspense>} />
                    <Route path="refer-a-friend" element={<Suspense fallback={<CircularProgress className="centered" />}>
                        {!userLocalData.isChromeExtensionEnabled() ? <ReferFriend /> : <UnAuthorized />}
                    </Suspense>} />
                    <Route path="persona" element={<Suspense fallback={<CircularProgress className="centered" />}>
                        {adminIds[20022] ? <DataLabs showOnlyPersona={true} /> : <UnAuthorized />}
                    </Suspense>} />
                    <Route path="/" element={<Suspense fallback={<CircularProgress className="centered" />}><></></Suspense>} />
                    {/* <Route path="users" element={<Suspense fallback={<CircularProgress className="centered" />}><Users /></Suspense>} />
                <Route path="user" element={<Suspense fallback={<CircularProgress className="centered" />}><User /></Suspense>} />
                <Route path="branding" element={<Suspense fallback={<CircularProgress className="centered" />}><Branding /></Suspense>} />
                <Route path="templates" element={<Suspense fallback={<CircularProgress />}><Templates /></Suspense>} />
                <Route path="registration" element={<Suspense fallback={<CircularProgress />}><Registration /></Suspense>} /> */}
                </Routes>
                <Outlet></Outlet>
            </Grid >
        </Grid >
    )
}

export default Settings;