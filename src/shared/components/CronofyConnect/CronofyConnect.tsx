import { React, useState } from '../../modules/React';
import axios from 'axios';
import { Button } from '../../modules/MaterialImports/Button';

function CronofyConnect() {
    const [accessToken, setAccessToken] = useState(null);
    const CLIENT_ID = import.meta.env.VITE_CRONOFY_CLIENT_ID;
    const REDIRECT_URI = window.location.href;
    const SCOPES = 'read_calendar create_calendar';

    const handleConnectClick = () => {
        const authURL = `https://app.cronofy.com/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}`;
        window.location.href = authURL;
        // https://app.cronofy.com/oauth/v2/authorize?client_id=m9CLjBOcu4YrcgJge5vBCRxEHVj2OjHi&redirect_uri=preview&response_type=code&scope=read_only
    };

    const handleRedirect = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            try {
                const response = await axios.post('/api/cronofy/token', { code });
                setAccessToken(response.data.access_token);
                setAccessToken(response.data);
            } catch (error) {
                console.error('Error exchanging code for token:', error);
            }
        }
    };

    React.useEffect(() => {
        handleRedirect();
    }, []);

    return (
        <div className='mt-5'>
            {accessToken ? (
                <p className='c-green fs-18'>Connected to Cronofy!</p>
            ) : (
                <Button color='primary' variant='contained' onClick={handleConnectClick}>Connect to Cronofy</Button>
            )}
        </div>
    );
}

export default CronofyConnect;