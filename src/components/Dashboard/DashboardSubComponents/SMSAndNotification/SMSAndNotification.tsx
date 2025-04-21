import { userLocalData } from '../../../../shared/services/userData';
import { Badge } from '../../../../shared/modules/MaterialImports/Badge';
import { lazy, Suspense, useEffect, useState } from '../../../../shared/modules/React';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import { CircularProgress } from '../../../../shared/modules/MaterialImports/CircularProgress';

import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';


import Pusher from 'pusher-js';


const Notification = lazy(() => import('../../../../shared/components/Notification/Notification'));
const SmsComponent = lazy(() => import('../../SmsComponent/SmsComponent'));


const SMSAndNotification = () => {


    const isCRMEnabled = !userLocalData.adminSettings(30003) && !userLocalData.isChromeExtensionEnabled();

    const isSMSEnabled = userLocalData.adminSettings(20009) && Number(userLocalData.getvalue('phone')) && !userLocalData.isChromeExtensionEnabled();

    const [smsCount, setSmsCount] = useState(0);
    const [chatOpen, setChatOpen] = useState(false);
    const [notificationCount, setNotificationCount] = useState(0);
    const [notificationOpen, setNotificationOpen] = useState(false);


    useEffect(() => {
        var pusher = new Pusher("7bee4d362f076c25d7d6", {
            cluster: "ap2",
        });

        if (isSMSEnabled) {


            var smsChannel = pusher.subscribe(`clientid_${userLocalData.getvalue('clientId')}_recrId_${userLocalData.getvalue('recrId')}`);

            smsChannel.bind('smsCount', (data: string) => {
                let response = JSON.parse(data);
                if ((response.recrId == userLocalData.getvalue('recrId')) && response.count && response.count != "0" && Number(response.count)) {
                    setSmsCount(Number(response.count));
                }
            });
        }
        if (isCRMEnabled) {

            var notificationPusherChannel = pusher.subscribe(`clientid_${userLocalData.getvalue('clientId')}_recrId_${userLocalData.getvalue('recrId')}`);

            notificationPusherChannel.bind('NotificationCount', (data: string) => {
                let response = JSON.parse(data);
                if (response) {
                    setNotificationCount(1);
                }
            });
        }
    }, []);
    const openSmsWindow = () => {
        setChatOpen(!chatOpen);
        //  window.open(`https://search.accuick.com/Twilio/chat.jsp?userid=${userLocalData.getvalue('recrId')}&phone=${Number(userLocalData.getvalue('phone'))}&userName=${userLocalData.getvalue('userName')}`);
    }


    return (
        <>
            {
                smsCount ?
                    <Badge badgeContent={smsCount ? smsCount : ''} color="error" onClick={openSmsWindow}>
                        <ChatOutlinedIcon className={`cursor-pointer  ${chatOpen ? 'c-skyblue' : ''}`} />
                    </Badge>
                    :
                    <ChatOutlinedIcon className={`cursor-pointer  ${chatOpen ? 'c-skyblue' : ''}`} onClick={openSmsWindow} />
            }
            {
                isCRMEnabled ?
                    notificationCount ?
                        <NotificationsIcon className={`cursor-pointer ml-4 mr-3 fs-24 c-red`} onClick={() => { setNotificationOpen(!notificationOpen); setNotificationCount(0) }} />
                        :
                        <NotificationsNoneOutlinedIcon className={`cursor-pointer ml-4 mr-3 fs-24 ${notificationOpen ? 'c-skyblue' : ''}`} onClick={() => setNotificationOpen(!notificationOpen)} />

                    :
                    null
            }
            {
                notificationOpen ?
                    <Suspense fallback={<CircularProgress className="centered" />}>
                        <Notification
                            open={notificationOpen}
                            closePopup={() => setNotificationOpen(false)}
                        />
                    </Suspense>
                    : null
            }
            {
                chatOpen ?
                    // <PhoneChat
                    //     open={chatOpen}
                    //     closePopup={() => setChatOpen(false)}
                    // /> : null
                    <Suspense fallback={<CircularProgress className="centered" />}>
                        <SmsComponent dialogOpen={chatOpen} onClose={() => setChatOpen(false)} />
                    </Suspense>
                    :
                    null
            }
        </>
    )
}

export default SMSAndNotification;