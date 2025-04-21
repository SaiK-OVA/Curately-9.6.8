import { CircularProgress } from '../../../../shared/modules/MaterialImports/CircularProgress';
import {React, Suspense } from '../../../../shared/modules/React';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

const AddSequence = React.lazy(() => import('./Add/AddSequence'));
// const EditSequence = React.lazy(() => import('./Edit/EditSequence'));
const ListSequence = React.lazy(() => import('./List/ListSequence'));
const AuditLog = React.lazy(() => import('./AuditLog/AuditLog'));
const ReportSequence = React.lazy(() => import('./Report/ReportSequence'));


const Campaign = () => {
    return <>
        <Routes>
            <Route path=":sequenceType/add" element={<Suspense fallback={<CircularProgress className='centered' />}><AddSequence /></Suspense>} />
            <Route path=":sequenceType/edit/:SequenceId" element={<Suspense fallback={<CircularProgress className='centered' />}><AddSequence /></Suspense>} />
            <Route path=":sequenceType/report/:SequenceId" element={<Suspense fallback={<CircularProgress className='centered' />}><ReportSequence /></Suspense>} />
            <Route path=":sequenceType/list" element={<Suspense fallback={<CircularProgress className='centered' />}><ListSequence /></Suspense>} />
            <Route path="/list" element={<Suspense fallback={<CircularProgress className='centered' />}><ListSequence /></Suspense>} />
            <Route path=":sequenceType/auditlog" element={<Suspense fallback={<CircularProgress className='centered' />}><AuditLog /></Suspense>} />
            <Route path="*" element={<Navigate to="list" />} />
        </Routes>
        <Outlet></Outlet>

    </>;
}

export default Campaign;