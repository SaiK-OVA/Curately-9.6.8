import {
    useEffect,
    useState
} from 'react';
import { Dialog } from 'primereact/dialog';
import './PhoneChat.scss';
import { globalData } from '../../services/globalData';
import { userLocalData } from '../../../shared/services/userData';

import Pusher from 'pusher-js';
import { DateTime } from 'luxon';

const PhoneChat = (
    { open, closePopup }:
        { open: boolean, closePopup: () => void }
) => {


    let chatUrl = `https://search.accuick.com/Twilio/chat.jsp?userid=${userLocalData.getvalue('recrId')}&phone=${Number(userLocalData.getvalue('phone'))}&userName=${userLocalData.getvalue('userName')}`;

    const [src, setSrc] = useState(chatUrl);
    // https://careers.curately.ai/peoples?clientId=2

    return <Dialog dismissableMask={true} header="SMS" visible={open} position={'right'} onHide={() => closePopup()} draggable={false} resizable={false} modal={false} id="PhoneChatDialog">
        {
            <>
                <iframe src={src} title='PhoneChat' id='PhoneChat'></iframe>
            </>
        }
    </Dialog >
}

export default PhoneChat;