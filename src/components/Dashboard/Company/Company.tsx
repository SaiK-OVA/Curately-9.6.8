import  {React, Suspense } from '../../../shared/modules/React';
import { Outlet, Routes, Route } from 'react-router-dom';

import {CircularProgress} from '../../../shared/modules/MaterialImports/CircularProgress';

import './Company.scss';

// const AddCompany = React.lazy(() => import('./Add/AddCompany'));
const FindCompany = React.lazy(() => import('./Find/FindCompany'));
// const ViewCompany = React.lazy(() => import('./View/ViewCompany'));




const Company = () => {
    return (
        <div>
            <Routes>
                {/* <Route path="add" element={<Suspense fallback={<CircularProgress className="centered" />}><AddCompany /></Suspense>}/> */}
                <Route path="find" element={<Suspense fallback={<CircularProgress className="centered" />}><FindCompany /></Suspense>} />
                {/* <Route path="view/:id" element={<Suspense fallback={<CircularProgress className="centered" />}><ViewCompany /></Suspense>} /> */}
            </Routes>
            <Outlet></Outlet>
        </div>
    );
}

export default Company;
