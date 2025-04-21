import { useState } from 'react';
import { userLocalData } from '../../../../shared/services/userData';
// import { userLocalData } from '../../../../shared/services/userData';



const ReactFlow = () => {


    // const [src, setSrc] = useState(`${import.meta.env.VITE_URL_193}automation-flow?clientId=${userLocalData.getvalue('clientId')}`);
    const [src, setSrc] = useState((window.location.protocol === 'http:') ? `http://52.41.18.83:41088/automation-flow?clientId=${userLocalData.getvalue('clientId')}&recrId=${userLocalData.getvalue('recrId')}` : `${window.location.origin}/automation-flow?clientId=${userLocalData.getvalue('clientId')}&recrId=${userLocalData.getvalue('recrId')}`);

    return (
        <>
            <iframe src={src} title='ReactFlow' className='iframeInApp'></iframe>
        </>
    )
}
export default ReactFlow;
