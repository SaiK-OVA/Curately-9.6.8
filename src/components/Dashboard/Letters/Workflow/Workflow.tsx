import {React,Suspense} from '../../../../shared/modules/React';

import { CircularProgress } from '../../../../shared/modules/MaterialImports/CircularProgress';

import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
// import { trackPromise } from 'react-promise-tracker';
// import ListWorkflow from './List/ListWorkflow';
// import NavBar from "./NavBar/NavBar";

// import ApiService from '../../shared/api/api';
// import { appVersion } from '../../shared/data/version';

const AddWorkflow = React.lazy(() => import('./Add/AddWorkflow'));
const EditWorkflow = React.lazy(() => import('./Add/EditWorkflow'));
const ListWorkflow = React.lazy(() => import('./List/ListWorkflow'));

import './Workflow.scss';

const Workflow = () => {


    // const navigateUrl = useNavigate();
    
    // useEffect(() => {
    //     // checkVersion();
    //     if (!recrID && localStorage.getItem('CandidateToken') && localStorage.getItem('stageDataStageId') && localStorage.getItem('assessmentIndex')) {
    //         navigateUrl("/stages/emmersionAssessment/" + localStorage.getItem('CandidateToken') + "/" + localStorage.getItem('stageDataStageId') + "/" + localStorage.getItem('assessmentIndex'));
    //         // window.location.href = "https://resume.accuick.com/workflow/#/stages/emmersionAssessment/" + localStorage.getItem('CandidateToken') + "/" + localStorage.getItem('stageDataStageId') + "/" + localStorage.getItem('assessmentIndex');
    //     }
    // }, []);

    return <div className='pl-4 py-1'>
        <Routes>
            <Route path="list" element={<Suspense fallback={<CircularProgress className='centered' />}><ListWorkflow /></Suspense>} />
            <Route path="add" element={<Suspense fallback={<CircularProgress className='centered' />}><AddWorkflow /></Suspense>} />
            <Route path="edit/:WorkflowId" element={<Suspense fallback={<CircularProgress className='centered' />}><EditWorkflow /></Suspense>} />
            <Route path="*" element={<Navigate to="list" />} />
        </Routes>
        <Outlet></Outlet>
    </div>;
}

export default Workflow;