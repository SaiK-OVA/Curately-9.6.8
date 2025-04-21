import { useState } from 'react';
import { userLocalData } from '../../../../shared/services/userData';



const Templates = () => {

    const [src, setSrc] = useState('https://www4.accuick.com/Accuick/Email/EmailUpdate2.jsp?userId=' + userLocalData.getvalue('recrId'));

    return (
        <>
            <iframe src={src} title='Templates' className='iframeInApp'></iframe>
        </>
    )
}
export default Templates;