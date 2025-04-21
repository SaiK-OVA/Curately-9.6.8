import { useEffect, useState } from 'react';
import { userLocalData } from '../../../../shared/services/userData';
import updateDocumentTitle from '../../../../shared/services/title';



const AccuickResumeSearch = () => {


    const [src, setSrc] = useState(`https://resume.accuick.com/Sovren/Curately.jsp;jsessionid=` + userLocalData.getvalue('sessid') + `?Userid=` + userLocalData.getvalue('encoded') + `&CompId=12938&JobId=208057&JobTitle=Angular%20Developer`);
    // https://qaapi.cxninja.com/AccuickResumeSearch/

    useEffect(() => {
        updateDocumentTitle.set('Talent Community');
        return () => {
            updateDocumentTitle.set('');
          }
    }, []);


    return (
        <>
            <iframe src={src} title='AccuickResumeSearch' className='iframeInApp'></iframe>
        </>
    )
}
export default AccuickResumeSearch;
