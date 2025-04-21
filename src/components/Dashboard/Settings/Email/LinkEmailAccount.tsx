import { useEffect, useState } from "../../../../shared/modules/React"
import { trackPromise } from '../../../../shared/modules/PromiseTrackter';
import ApiService from "../../../../shared/api/api";
import { userLocalData } from "../../../../shared/services/userData";
import Alert from "@mui/material/Alert";
import { Stack } from "../../../../shared/modules/MaterialImports/Stack";

const LinkEmailAccount = () => {
    const [accountLinked, setAccountLinked] = useState(false);

    useEffect(() => {

        const handler = (ev: MessageEvent) => {

            trackPromise(
                // ApiService.getCall(216, 'DemoCurately/listadminusers')
                ApiService.postWithData('admin', 'getAccounts', { clientId: userLocalData.getvalue('clientId') })
                    .then(
                        (response) => {
                            if (response.data?.response?.length) {
                                let tempData = JSON.parse(response.data?.response);
                                let tempAccounts = tempData?.accounts?.length ? tempData?.accounts : [];
                                tempAccounts = tempAccounts.filter((accountData: { account: string }) => accountData.account == `${userLocalData.getvalue('clientId')}_${userLocalData.getvalue('recrId')}`)
                                console.log(tempAccounts.length);
                                console.log(tempAccounts);
                            }


                        }
                    )
            )
        }

        window.addEventListener('message', handler)

        return () => window.removeEventListener('message', handler)
    }, [])
    return (
        <Stack direction="row" justifyContent="center" alignItems="center" className="pt-5">
            {accountLinked === true && <Alert severity="success">Account Linked, Please close the popup and refresh the page</Alert>}
            {accountLinked === false && <Alert severity="error">Error! Please try again</Alert>}
        </Stack>
    )
}

export default LinkEmailAccount