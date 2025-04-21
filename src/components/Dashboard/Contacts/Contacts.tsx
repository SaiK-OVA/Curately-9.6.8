import { React, Suspense } from '../../../shared/modules/React';
import { Outlet, Routes, Route } from 'react-router-dom';

import { CircularProgress } from '../../../shared/modules/MaterialImports/CircularProgress';

import './Contacts.scss';
// import { RequireAuth } from '../../../shared/services/auth/validating';
import UnAuthorized from '../../UnAuthorized/UnAuthorized';

// const AddContacts = React.lazy(() => import('./Add/AddContacts'));
const FindContacts = React.lazy(() => import('./Find/FindContacts'));
// const ListContacts = React.lazy(() => import('./List/ListContacts/ListContacts'));
const ViewContact = React.lazy(() => import('./View/ViewContact'));
const People = React.lazy(() => import('../Resume/People/People'));
const ListPage = React.lazy(() => import('./List/ListPage/ListPage'))


const Candidate = () => {


    const { integrationIds, adminIds } = localStorage.getItem("masterRequireAuthSettings") ? JSON.parse(localStorage.getItem("masterRequireAuthSettings") as string) : {
        // settingIds: {},
        integrationIds: {},
        adminIds: {}
    };

    return (
        <div>
            <Routes>
                {/* <Route path="add" element={<Suspense fallback={<CircularProgress className="centered" />}><AddContacts /></Suspense>} /> */}
                <Route path="find" element={<Suspense fallback={<CircularProgress className="centered" />}>
                    {integrationIds[40003] && !adminIds[30003] ? <FindContacts /> : <UnAuthorized />}
                </Suspense>} />
                <Route path="people/*" element={<Suspense fallback={<CircularProgress className="centered" />}><People /></Suspense>} />
                {/* <Route path="list" element={<Suspense fallback={<CircularProgress className="centered" />}><ListContacts /></Suspense>} /> */}
                <Route path="list" element={<Suspense fallback={<CircularProgress className="centered" />}><ListPage /></Suspense>} />
                <Route path="list/:listId" element={<Suspense fallback={<CircularProgress className="centered" />}>
                    {integrationIds[40003] && !adminIds[30003] ? <FindContacts /> : <UnAuthorized />}
                </Suspense>} />
                {/* <Route path='/view/:id' element={<ViewContact />}></Route> */}
                <Route path="view/:contactId/:companyId" element={
                    <Suspense fallback={<CircularProgress className="centered" />}>
                        {
                            integrationIds[400011] ? <ViewContact /> : <UnAuthorized />
                        }
                        {/* <RequireAuth integrationId={400011}><ViewContact /></RequireAuth> */}
                    </Suspense>}
                ></Route>
                <Route path="view/:contactId/" element={
                    <Suspense fallback={<CircularProgress className="centered" />}>
                        {
                            integrationIds[400011] ? <ViewContact /> : <UnAuthorized />
                        }
                        {/* <RequireAuth integrationId={400011}><ViewContact /></RequireAuth> */}
                    </Suspense>}
                ></Route>
            </Routes>
            <Outlet></Outlet>
        </div>
    );
}

export default Candidate;
