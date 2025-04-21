
import { useIdleTimer } from 'react-idle-timer';
import { lazy, useEffect, useState } from '../../../../shared/modules/React';
import { useNavigate } from 'react-router-dom';


const LogoutPopup = lazy(() => import('./LogoutPopup'));



const StillLoggedIn = () => {


    let navigate = useNavigate();

    const idelTimeout = 1_800_000;
    const promptBeforeIdle = 10_000

    const [showTimeOutModal, setShowTimeOutModal] = useState<boolean>(false)
    const [remaining, setRemaining] = useState<number>(idelTimeout)

    const onIdleTimeOut = () => {
        // signOut();
        // alert('sigout');
        localStorage.clear();

        navigate("/login");
        // in profile Menu Component, removing this for Performance issue as of now
    }

    const onActive = () => {
        setShowTimeOutModal(false);

    }
    const handleStillHere = () => {
        setShowTimeOutModal(false);
        activate();

    }

    const showPrompt = () => {
        setShowTimeOutModal(true);
    }


    const {
        getRemainingTime,
        // getTabId,
        // isLeader,
        // isLastActiveTab,
        // message
        activate
    } = useIdleTimer({
        onIdle: onIdleTimeOut,
        onPrompt: showPrompt,
        onActive,
        promptBeforeIdle,
        timeout: idelTimeout,
        crossTab: true,
        leaderElection: true,
        syncTimers: 200
    });



    useEffect(() => {
        const idleTimeOutInterval = setInterval(() => {
            setRemaining(Math.ceil(getRemainingTime() / 1000))
        }, 500)

        return () => {
            clearInterval(idleTimeOutInterval)
        }
    });

    return (
        <>
            {
                showTimeOutModal ? <LogoutPopup
                    showTimeOutModal={showTimeOutModal}
                    closePopup={() => setShowTimeOutModal(false)}
                    remaining={remaining}
                    handleStillHere={handleStillHere}
                />
                    :
                    null
            }
        </>
    )
}

export default StillLoggedIn