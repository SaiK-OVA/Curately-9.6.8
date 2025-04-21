import { Suspense, lazy } from '../../../../../shared/modules/React';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

import { CircularProgress } from '../../../../../shared/modules/MaterialImports/CircularProgress';
// import FormContainer from './forms/FormContainer';
const ListComponent = lazy(() => import('./List/ListComponent'));
const View = lazy(() => import('./Preview/View'));
const AddFormBuilder = lazy(() => import('./Add/AddFormBuilder'));



const FormBuilder = () => {

    return (
        <div>
            <Routes>
                <Route path="list" element={<Suspense fallback={<CircularProgress className='centered' />}><ListComponent /></Suspense>} />
                <Route path="add" element={<Suspense fallback={<CircularProgress className='centered' />}><AddFormBuilder /></Suspense>} />
                <Route path="edit/:formId" element={<Suspense fallback={<CircularProgress className='centered' />}><AddFormBuilder /></Suspense>} />
                <Route path="view/:formId" element={<Suspense fallback={<CircularProgress className='centered' />}><View /></Suspense>} />
                <Route path="*" element={<Navigate to="list" />} />
            </Routes>
            <Outlet></Outlet>
        </div>

    )
}
export default FormBuilder;