import { Helmet } from 'react-helmet';

const HubspotScript = () => {
    return (
        <Helmet>
            <script type="text/javascript" id="hs-script-loader" async defer src="//js-na1.hs-scripts.com/45279392.js"></script>
        </Helmet>
    )
}

export default HubspotScript