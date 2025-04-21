import { useState } from 'react';
import { userLocalData } from '../../../shared/services/userData';



const HomeCards = () => {

    const [src, setSrc] = useState('https://www4.accuick.com/Accuick/Home_new_cards_for_react.html?userId=' + userLocalData.getvalue('recrId'));

    return (
        <>
            <iframe src={src} title='HomeCards' className='iframeInApp'></iframe>
        </>
    )
}
export default HomeCards;
