import { Suspense, lazy } from '../../../shared/modules/React';
import { Outlet, Routes, Route } from 'react-router-dom';
import { CircularProgress } from '../../../shared/modules/MaterialImports/CircularProgress';
// import { RequireAuth } from '../../../shared/services/auth/validating';
import UnAuthorized from '../../UnAuthorized/UnAuthorized';
import { userLocalData } from '../../../shared/services/userData';

const Templates = lazy(() => import('./Letters Template/Templates'));
const Formbuilder = lazy(() => import('./Form Builder/Formbuilder'));
const Campaign = lazy(() => import('./Sequence/Sequence'));
const AICampaign = lazy(() => import('./AICampaigns/AICampaigns'));
const Workflow = lazy(() => import('./Workflow/Workflow'));
// const AddVideo = lazy(() => import('./AddVideo/AddVideo'));
const EmailBuilder = lazy(() => import('./EmailBuilder/EmailBuilder'));
// const AutomationFlow = lazy(() => import('./AutomationFlow/AutomationFlow'));
const ReactFlow = lazy(() => import('./ReactFlow/ReactFlow'));



const Letters = () => {

    const { settingIds, adminIds } = localStorage.getItem("masterRequireAuthSettings") ? JSON.parse(localStorage.getItem("masterRequireAuthSettings") as string) : {
        settingIds: {},
        // integrationIds: {},
        adminIds: {}
    };

    return (
        <div>
            <Routes>
                <Route path="templates" element={<Suspense fallback={<CircularProgress className="centered" />}><Templates /></Suspense>} />

                <Route path="forms/*" element={<Suspense fallback={<CircularProgress className="centered" />}>
                    {adminIds[20023] && !adminIds[30003]? <Formbuilder /> : <UnAuthorized />}
                    {/* <RequireAuth adminId={20023}><Formbuilder /></RequireAuth> */}
                </Suspense>} />

                <Route path="campaigns/*" element={<Suspense fallback={<CircularProgress className="centered" />}>
                    {settingIds[110007] && adminIds[20024] && (userLocalData.getvalue('paymentType') !== 1) ? <Campaign /> : <UnAuthorized />}
                    {/* <RequireAuth settingId={110007} adminId={20024}><Campaign /></RequireAuth> */}
                </Suspense>} />
                <Route path="aicampaigns/*" element={<Suspense fallback={<CircularProgress className="centered" />}>
                    {settingIds[110007] && adminIds[20024] &&  (userLocalData.getvalue('paymentType') !== 1) ? <AICampaign /> : <UnAuthorized />}
                    {/* <RequireAuth settingId={110007} adminId={20024}><AICampaign /></RequireAuth> */}
                </Suspense>} />

                <Route path="workflows/*" element={<Suspense fallback={<CircularProgress className="centered" />}>
                    {adminIds[20025] && !adminIds[30003] ? <Workflow /> : <UnAuthorized />}
                    {/* <RequireAuth adminId={20025}><Workflow /></RequireAuth> */}
                </Suspense>} />

                {/* <Route path="videos/*" element={<Suspense fallback={<CircularProgress className="centered" />}><AddVideo /></Suspense>} /> */}

                <Route path="EmailBuilder/*" element={<Suspense fallback={<CircularProgress className="centered" />}>
                    {adminIds[20026] ? <EmailBuilder /> : <UnAuthorized />}
                    {/* <RequireAuth adminId={20026}><EmailBuilder /></RequireAuth> */}
                </Suspense>} />

                {/* <Route path="hiringWorkflow/*" element={<Suspense fallback={<CircularProgress className="centered" />}>
                { adminIds[20027] ? <AutomationFlow /> : <UnAuthorized /> }
                    // <RequireAuth adminId={20027}><AutomationFlow /></RequireAuth>
                </Suspense>} /> */}

                <Route path="journeys" element={<Suspense fallback={<CircularProgress className="centered" />}>
                    {adminIds[20028] && !adminIds[30003] ? <ReactFlow /> : <UnAuthorized />}
                    {/* <RequireAuth adminId={20028}><ReactFlow /></RequireAuth> */}
                </Suspense>} />

            </Routes>
            <Outlet></Outlet>
        </div>
    );
}
export default Letters;
