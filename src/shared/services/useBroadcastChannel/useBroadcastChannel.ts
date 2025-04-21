import { useEffect, useState } from 'react';

const useBroadcastChannel = (channelName: string) => {
    const [broadcastMessage, setMessage] = useState(null);
    const channel = new BroadcastChannel(channelName);

    useEffect(() => {
        const handleMessage = (event: any) => {
            setMessage(event.data);
        };

        channel.onmessage = handleMessage;

        // Clean up the channel when the component unmounts
        return () => {
            channel.close();
        };
    }, [channel]);

    const sendBroadcastMessageMessage = (msg: any) => {
        channel.postMessage(msg);
    };

    return { broadcastMessage, sendBroadcastMessageMessage };
};

export default useBroadcastChannel;