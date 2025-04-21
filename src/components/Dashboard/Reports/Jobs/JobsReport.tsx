import { useState } from "react";

const JobsReport = () => {

    const [src, setSrc] = useState('https://www4.accuick.com/Accuick/Reports/Reports.jsp');

    return (
        <>
            <iframe src={src} title='Reports' className='iframeInApp'></iframe>
        </>
    )
}


export default JobsReport;