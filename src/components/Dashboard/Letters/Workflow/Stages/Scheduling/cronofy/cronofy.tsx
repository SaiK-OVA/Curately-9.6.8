import { useEffect, useRef, useState } from '../../../../../../../shared/modules/React';
import AvailabilityRules from './AvailabilityRules';
// import AvailabilityViewerWrapper from './AvailabilityViewerWrapper';
// import SlotPicker from './SlotPicker';

import ApiService from '../../../../../../../shared/api/api';
// import CronofyData from '../../../../../shared/data/cronofy';
import { trackPromise } from '../../../../../../../shared/modules/PromiseTrackter';
import { showToaster, Grid } from '../../../../../../../shared/modules/commonImports';

import {Dialog, DialogContent, DialogTitle} from '../../../../../../../shared/modules/MaterialImports/Dialog';
import CloseIcon from '@mui/icons-material/Close';

import {Divider} from '../../../../../../../shared/modules/MaterialImports/Divider';
import { userLocalData } from '../../../../../../../shared/services/userData';

const Cronofy = (
    {
        open,
        onClose,
        accessToken,
        subAccountId,
        itemSaved,
        availability_rule_id,
        isRecruiter
    }: {
        open: boolean;
        onClose: () => void;
        accessToken: string;
        subAccountId: string;
        itemSaved: () => void;
        availability_rule_id: string;
        isRecruiter: string;
    }
) => {

    const tokensObj = useRef({
        client_secret: '',
        uiLoaded: 0
    });
    const [uiToken, setUiToken] = useState('');

    useEffect(() => {
        // console.log(availability_rule_id);
        if (!tokensObj.current.client_secret) {
            loadAccessToken();
        }
    }, []);
    const loadAccessToken = () => {
        trackPromise(
            ApiService.getCall(193, 'Curately/Workflow/workflow_cronofy_access_token.jsp?clientId=' + userLocalData.getvalue('clientId')).then((response: any) => {
                tokensObj.current.client_secret = response.data.client_secret;
                // tokensObj.current.client_secret = "CRN_4a6egUiMAk8NPAT9AhrH9sK8wY6njiUGqaQHab";
                loadUiToken();
            })

        );
    }
    const loadUiToken = () => {
        tokensObj.current.uiLoaded = tokensObj.current.uiLoaded + 1;
        if (tokensObj.current.uiLoaded > 10) {
            showToaster('Error loading Token', 'error');
        }
        else if (accessToken) {
            let data = {
                url: "https://api.cronofy.com/v1/element_tokens",
                json: JSON.stringify({
                    version: "1",
                    permissions: ["agenda", "account_management", "availability", "managed_availability"],
                    subs: [subAccountId],
                    origin: window.location.origin
                    // origin: (window.location.protocol === "http:") ? "http://localhost:3000" : "https://resume.accuick.com"
                }),
                token: tokensObj.current.client_secret,
                clientId: userLocalData.getvalue('clientId')
            }
            trackPromise(
                ApiService.postWithParams(193, 'Curately/Workflow/workflow_cronofy_ui_element_token.jsp', data).then((response: any) => {
                    // console.log(response);
                    setUiToken(response.data.element_token.token);

                })
            );
        } else {
            setTimeout(() => {
                loadUiToken();
            }, 1000);
        }
    }

    // const availabilityViewerOptions = {
    //     element_token: uiToken,
    //     target_id: "cronofy-availability-viewer-div",
    //     availability_query: {
    //         participants: [
    //             {
    //                 required: "all",
    //                 members: [
    //                     { sub: "acc_640b570b908897005fea28c9" }
    //                 ]
    //             }
    //         ],
    //         required_duration: { minutes: 45 },
    //         query_periods: [

    //             { start: "2023-03-22T09:00:00Z", end: "2023-03-22T13:00:00Z" },
    //             { start: "2023-03-22T16:00:00Z", end: "2023-03-22T19:00:00Z" },
    //             { start: "2023-03-23T09:00:00Z", end: "2023-03-23T13:00:00Z" },
    //             { start: "2023-03-23T16:00:00Z", end: "2023-03-23T19:00:00Z" }
    //             // { start: "2023-03-21T07:00:00Z", end: "2023-03-21T18:00:00Z" },
    //             // // { start: "2023-03-21T10:00:00Z", end: "2023-03-21T11:00:00Z" },
    //             // // { start: "2023-03-21T11:00:00Z", end: "2023-03-21T12:00:00Z" },
    //             // // { start: "2023-03-21T12:00:00Z", end: "2023-03-21T13:00:00Z" },
    //             // // { start: "2023-03-21T13:00:00Z", end: "2023-03-21T14:00:00Z" },
    //             // // { start: "2023-03-21T14:00:00Z", end: "2023-03-21T15:00:00Z" },
    //             // // { start: "2023-03-21T15:00:00Z", end: "2023-03-21T16:00:00Z" },
    //             // // { start: "2023-03-21T16:00:00Z", end: "2023-03-21T17:00:00Z" },
    //             // // { start: "2023-03-21T17:00:00Z", end: "2023-03-21T18:00:00Z" },
    //             // { start: "2023-03-23T07:00:00Z", end: "2023-03-23T18:00:00Z" },
    //             // // { start: "2023-03-22T10:00:00Z", end: "2023-03-22T11:00:00Z" },
    //             // // { start: "2023-03-22T11:00:00Z", end: "2023-03-22T12:00:00Z" },
    //             // // { start: "2023-03-22T12:00:00Z", end: "2023-03-22T13:00:00Z" },
    //             // // { start: "2023-03-22T13:00:00Z", end: "2023-03-22T14:00:00Z" },
    //             // // { start: "2023-03-22T14:00:00Z", end: "2023-03-22T15:00:00Z" },
    //             // // { start: "2023-03-22T15:00:00Z", end: "2023-03-22T16:00:00Z" },
    //             // // { start: "2023-03-22T16:00:00Z", end: "2023-03-22T17:00:00Z" },
    //             // // { start: "2023-03-22T17:00:00Z", end: "2023-03-22T18:00:00Z" }
    //         ],
    //     },
    //     config: {
    //         start_time: "09:00",
    //         end_time: "15:30",
    //         interval: 30
    //     },
    //     styles: {
    //         prefix: "custom-name"
    //     },
    //     callback: (notification: any) => {
    //         console.log(notification);
    //     }
    // };
    // console.log(availability_rule_id)
    const availabilityRuleOptions = {
        element_token: uiToken,
        target_id: "cronofy-availability-rules-div",
        availability_rule_id: (availability_rule_id) ? availability_rule_id : "default",
        config: {
            start_time: "08:00",
            end_time: "18:00",
            duration: 60
        },
        styles: {
            colors: {
                available: "green",
                unavailable: "white"
            },
            prefix: "custom-name"
        },
        // tzid: "America/Chicago",
        tzid: Intl.DateTimeFormat().resolvedOptions().timeZone,
        callback: (response: any) => {
            if (response.notification.type === "availability_rule_saved") {
                // console.log(response);
                showToaster('Rules have been saved', 'success');
                onClose();
            }
        }
    };
    // const slotPickerOptions = {
    //     element_token: uiToken,
    //     target_id: "cronofy-slot-picker-div",
    //     availability_query: {
    //         participants: [
    //             {
    //                 required: "all",
    //                 members: [
    //                     { sub: "acc_640b570b908897005fea28c9" }
    //                 ]
    //             }
    //         ],
    //         required_duration: { minutes: 30 },
    //         query_periods: [

    //             { start: "2023-03-22T09:00:00Z", end: "2023-03-22T13:00:00Z" },
    //             { start: "2023-03-22T16:00:00Z", end: "2023-03-22T19:00:00Z" },
    //             { start: "2023-03-23T09:00:00Z", end: "2023-03-23T13:00:00Z" },
    //             { start: "2023-03-23T16:00:00Z", end: "2023-03-23T19:00:00Z" }
    //         ]
    //     },
    //     styles: {
    //         prefix: "custom-name"
    //     },
    //     callback: (notification: any) => {
    //         console.log(notification);
    //     }
    // };



    return (
        <Dialog
            maxWidth={'xl'}
            // sx={{ width: 900, maxWidth: 900, minWidth: 900 }}
            fullWidth={false}
            onClose={onClose} open={open} className='Cronofy'>
            <DialogTitle
                className='py-2'
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <span>
                        Availability Rules
                    </span>
                    <span onClick={() => onClose()} className="closePopup">
                        <CloseIcon />
                    </span>
                </Grid>
            </DialogTitle>
            <Divider />
            <DialogContent
                sx={{
                    width: '740px',
                    minHeight: '320px',
                    maxHeight: '70vh'
                }}
            >
                {
                    uiToken ?
                        <div>
                            {/* <label>Slot Picker</label>
                        <div className='mb-5'>
                            <SlotPicker options={slotPickerOptions} />
                        </div> */}
                            {/* <label>Availability Rules</label> */}
                            <div className={`mb-5 ${isRecruiter}`}>
                                <AvailabilityRules options={availabilityRuleOptions} />
                            </div>
                            {/* <label>Availability Viewer</label>
                        <div className='mb-5'>
                            <AvailabilityViewerWrapper options={availabilityViewerOptions} />
                        </div> */}
                        </div>
                        :
                        null
                }
            </DialogContent>
        </Dialog>
    )
}

export default Cronofy