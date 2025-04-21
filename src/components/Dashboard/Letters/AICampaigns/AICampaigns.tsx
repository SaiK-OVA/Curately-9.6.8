import { CircularProgress } from '../../../../shared/modules/MaterialImports/CircularProgress';
import { React, Suspense } from '../../../../shared/modules/React';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

const AddAICampaigns = React.lazy(() => import('./Add/AddAICampaigns'));
const ListAICampaigns = React.lazy(() => import('./List/ListAICampaigns'));


const AICampaign = () => {
    return <>
        <Routes>
            <Route path=":sequenceType/add" element={<Suspense fallback={<CircularProgress className='centered' />}><AddAICampaigns /></Suspense>} />
            <Route path=":sequenceType/edit/:SequenceId" element={<Suspense fallback={<CircularProgress className='centered' />}><AddAICampaigns /></Suspense>} />
            <Route path=":sequenceType/list" element={<Suspense fallback={<CircularProgress className='centered' />}><ListAICampaigns /></Suspense>} />
            <Route path="*" element={<Navigate to="list" />} />
        </Routes>
        <Outlet></Outlet>

    </>;
}

export default AICampaign;