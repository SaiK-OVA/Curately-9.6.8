import { useEffect, useRef, useState } from '../../../shared/modules/React';
import ApiService from '../../../shared/api/api';
import { userLocalData } from '../../../shared/services/userData';

import './Billing.scss';

const Billing = () => {


    const isLoaded = useRef(false);

    useEffect(() => {
        if (!isLoaded.current) {
            isLoaded.current = true;
            // https://adminapi.cxninja.com/bullhorn-service-qa/stripe/createSession/%7BclientId%7D/%7BrecruiterId%7D?returnUrl=%7BreturnUrl
            ApiService.getByParams('ats', `stripe/createSession/${userLocalData.getvalue('clientId')}/${userLocalData.getvalue('recrId')}`, {
                returnUrl: window.location.origin + '/#/' + userLocalData.getvalue('clientName') + '/home',
                type: 'update'
                // &type=update
                // &type=cancel
                // &type=reactivate

            }).then((response) => {
                console.log(response.data);
                if (response.data.Success) {
                    // setSrc();
                    window.open(response.data.data);
                }
            });
        }
    }, [])
    return (
        <></>
    )
}
export default Billing;