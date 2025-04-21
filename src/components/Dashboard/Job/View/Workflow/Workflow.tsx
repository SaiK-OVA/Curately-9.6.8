import { useState } from 'react';
import { useParams } from 'react-router-dom';



const Workflow = () => {

    const { jobId } = useParams();

    const [src, setSrc] = useState('https://sequence.accuick.com/Accuick_QA/workflow_job.html?jobId=' + jobId);

    return (
        <>
            {
                (jobId) ?
                    <iframe src={src} title='Workflow' className='iframeInApp'></iframe>
                    :
                    null
            }
        </>
    )
}
export default Workflow;
