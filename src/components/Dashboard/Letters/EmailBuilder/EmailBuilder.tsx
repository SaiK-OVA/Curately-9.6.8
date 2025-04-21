import { React, Suspense } from '../../../../shared/modules/React';
import { Outlet, Routes, Route, Navigate } from 'react-router-dom';
import { CircularProgress } from '../../../../shared/modules/MaterialImports/CircularProgress';

import './EmailBuilder.scss';
import EmailBuilderData from './Add/EmailBuilderData';

// const AddEmailBuilder = React.lazy(() => import('./Add/AddEmailBuilder'));
const ListEmailBuilder = React.lazy(() => import('./List/ListEmailBuilder'));



const EmailBuilder = () => {
    return (
        <>
            <Routes>
                <Route path="add" element={<Suspense fallback={<CircularProgress className="centered" />}><EmailBuilderData /></Suspense>} />
                <Route path="edit/:templateId" element={<Suspense fallback={<CircularProgress className="centered" />}><EmailBuilderData /></Suspense>} />
                <Route path="list" element={<Suspense fallback={<CircularProgress className="centered" />}><ListEmailBuilder /></Suspense>} />

                <Route path="*" element={<Navigate to="list" />} />
            </Routes>
            <Outlet></Outlet>
        </>
    )
}


export default EmailBuilder;