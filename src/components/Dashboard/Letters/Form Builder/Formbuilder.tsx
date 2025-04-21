// import { userLocalData } from '../../../../shared/services/userData';

import  {React, Suspense } from '../../../../shared/modules/React';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

import { CircularProgress } from '../../../../shared/modules/MaterialImports/CircularProgress';
const ListComponent = React.lazy(() => import('../Workflow/FormBuilder/List/ListComponent'));
const AddFormBuilder = React.lazy(() => import('../Workflow/FormBuilder/Add/AddFormBuilder'));
const View = React.lazy(() => import('../Workflow/FormBuilder/Preview/View'));


const Formbuilder = () => {

    // // https://resume.accuick.com/frmb/#/settings/' + userLocalData.getvalue("recrId") + '/design-webforms
    // const [src, setSrc] = useState('https://resume.accuick.com/workflow/#/formBuilder/list');
    // // https://www4.accuick.com/formBuilderNew/

    // return (
    //     <>
    //         <iframe src={src} title='Formbuilder' className='iframeInApp'></iframe>
    //     </>
    // )
    return (
        <div className='formBuilder'>
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
export default Formbuilder;
