import { React, Suspense } from '../../../shared/modules/React';
import { Outlet, Routes, Route } from 'react-router-dom';
import { CircularProgress } from '../../../shared/modules/MaterialImports/CircularProgress';
// import { RequireAuth } from '../../../shared/services/auth/validating';
import UnAuthorized from '../../UnAuthorized/UnAuthorized';
// const AddJob = React.lazy(() => import('./Add/AddJob'));
const FindJob = React.lazy(() => import('./Find/FindJob'));
// const EditJob = React.lazy(() => import('./Edit/EditJob'));
const ViewJob = React.lazy(() => import('./View/ViewJob'));
const ListJob = React.lazy(() => import('./List/ListJob1'));
const Workflow = React.lazy(() => import('./Workflow/Workflow'));
const Job = () => {

    const { integrationIds } = localStorage.getItem("masterRequireAuthSettings") ? JSON.parse(localStorage.getItem("masterRequireAuthSettings") as string) : {
        // settingIds: {},
        integrationIds: {},
        // adminIds: {}
    };

    return (
        <div>
            <Routes>
                {/* <Route path="add" element={<Suspense fallback={<CircularProgress className="centered" />}><AddJob /></Suspense>} /> */}
                {/* <Route path="edit" element={<Suspense fallback={<CircularProgress className="centered" />}><EditJob /></Suspense>} /> */}
                <Route path="find" element={<Suspense fallback={<CircularProgress className="centered" />}>
                { integrationIds[40001] ? <FindJob /> : <UnAuthorized /> }</Suspense>} />
                {/* <Route path="view/:id" element={<Suspense fallback={<CircularProgress className="centered" />}><ViewJob /></Suspense>} /> */}
                <Route path="list" element={<Suspense fallback={<CircularProgress className="centered" />}><ListJob /></Suspense>} />
                <Route path="workflows/:jobId" element={<Suspense fallback={<CircularProgress className="centered" />}><Workflow /></Suspense>} />

                <Route path="view/:jobId" element={
                    <Suspense fallback={<CircularProgress className="centered" />}>
                        {
                            integrationIds[40001] ? <ViewJob /> : <UnAuthorized />
                        }
                        {/* <RequireAuth integrationId={40001}><ViewJob /></RequireAuth> */}
                    </Suspense>}
                ></Route>
            </Routes>
            <Outlet></Outlet>
        </div>
    );
}
export default Job;
