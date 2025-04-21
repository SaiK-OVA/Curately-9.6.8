// import { Helmet } from 'react-helmet';
// import * as React from 'react';
import {
    React,
    // useEffect,
    // useState
} from '../../../shared/modules/React';
// import ApiService from '../../../shared/api/api';
// import { userLocalData } from '../../../shared/services/userData';

import './Upgrade.scss';

// If using TypeScript, add the following snippet to your file as well.
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'stripe-pricing-table': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
}
const Upgrade = () => {

    // import.meta.env.VITE_APP_NAME === "CURATELY_PROD"   "curatelyClientDev"   "CURATELY_QA"
    // const [src, setSrc] = useState("https://billing.stripe.com/p/login/test_cN2eYiekqaxzaOYaEE");
    // const [src, setSrc] = useState("");
    // const [showStripe, setShowStripe] = useState(false);

    // useEffect(() => {
    //     if (userLocalData.getvalue('stripeCustomerId')) {
    //         window.open("https://billing.stripe.com/p/login/" + userLocalData.getvalue('stripeCustomerId'));
    //     }
    // }, []);
    // const loadStripe = () => {
    //     setShowStripe(true);
    // }


    return (
        <>
            {/* <Helmet>
                <script src="https://js.stripe.com/v3/pricing-table.js" ></script>
            </Helmet> */}
            {/* {
                showStripe ? */}
            <stripe-pricing-table pricing-table-id={import.meta.env.VITE_STRIPE_TABLE_ID}
                publishable-key={import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}>
            </stripe-pricing-table>
            {/* :
                    null
            } */}
            {/* {
                src ?
                    <iframe src={src} title='Billing' className='iframeInApp'></iframe>
                    :
                    null
            } */}
        </>
    )
}

export default Upgrade;


// import { Elements, PaymentElement } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';


// // Make sure to call `loadStripe` outside of a component’s render to avoid
// // recreating the `Stripe` object on every render.
// const stripePromise = loadStripe('pk_test_51PICH9RwmwbNTU5FcsAH4U8OJlFsN4hRaKHSpJ8D3WepCGXyx7NAkFJDVtE0xDNqYTZDHLJH7Vr7SDCNFxXd5c4f00PBIy7wgB');

// export default function App() {
//     const options = {
//         // passing the client secret obtained from the server
//         clientSecret: 'prctbl_1QRyaKRwmwbNTU5FdVcqmOql' // '{{CLIENT_SECRET}}',
//     };

//     return (
//         <Elements stripe={stripePromise} options={options}>
//             <PaymentElement />
//         </Elements>
//     );
// };