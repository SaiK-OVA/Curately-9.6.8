import { useState } from 'react';



const PipelineInsights = () => {


    const [src, setSrc] = useState('https://app.mokkup.ai/embed/5b44ae4d-d8c3-42ad-b90a-f98f0314dbd9');

    return (
        <>
            <iframe src={src} title='PipelineInsights' className='iframeInApp' allow="fullscreen"></iframe>
            {/* <iframe src="https://app.mokkup.ai/embed/5b44ae4d-d8c3-42ad-b90a-f98f0314dbd9" height="730px" width="100%" allow="fullscreen" allowfullscreen="allowfullscreen"></iframe> */}

        </>
    )
}
export default PipelineInsights;
