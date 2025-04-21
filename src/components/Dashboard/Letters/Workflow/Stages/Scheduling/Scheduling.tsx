
// import nylas-schedule-editor from "../../"
// import Nylas from 'nylas-js';

import { useRef, useEffect, useState } from '../../../../../../shared/modules/React'
import {
//  Button, 
    Grid, 
// TextField 
} from '../../../../../../shared/modules/commonImports';
import {Card, CardContent} from '../../../../../../shared/modules/MaterialImports/Card';
import {Typography} from '../../../../../../shared/modules/MaterialImports/Typography';
// import MenuItem from '@mui/material/MenuItem';

import ApiService from '../../../../../../shared/api/api';

import './Scheduling.scss';
import Cronofy from './cronofy/cronofy';
import AddCalendarEvent from './cronofy/AddCalendarEvent/AddCalendarEvent';
import { trackPromise } from '../../../../../../shared/modules/PromiseTrackter';
import ListEvents from './cronofy/ListEvents/ListEvents';
import ViewCalendarEvent from './cronofy/ViewCalendarEvent/ViewCalendarEvent';
// import Tooltip from '@mui/material/Tooltip';


// import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
// import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
// import EditIcon from '@mui/icons-material/Edit';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { userLocalData } from '../../../../../../shared/services/userData';
// import { confirmDialog } from '../../../../../shared/ConfirmDialog/ConfirmDialog';
import { FormControlLabel } from '../../../../../../shared/modules/MaterialImports/FormInputs';
import { Checkbox } from '../../../../../../shared/modules/MaterialImports/FormElements';



// const nylas = new Nylas({
//     // Config
// });




const Scheduling = (
    {
        stageId, passedStageData = {}
    }: {
        stageId: string, passedStageData: any
    }
) => {

    const [schedulerList, setSchedulerList] = useState([]);
    const [selectedSchedulerId, setSelectedSchedulerId] = useState((passedStageData.cronofyId) ? passedStageData.cronofyId : "");

    const tokensObj = useRef({
        accessToken: "",
        accountId: "",
        // calendarId: "",
        calendarData: [],
        selectedCronofyIndex: -1,
        selectedCronofyId: "",
        selectedEventId: "",
        selectedRecrId: "",
    });
    const selectedScheduler = useRef({
        cronofyId: "",
        eventId: ""
    });
    const schedulerListRef = useRef([]);


    const recrID = userLocalData.getvalue('recrId');
    const [moveStage, setMoveStage] = useState(false);
    const [initialLoad, setInitialLoad] = useState(false);
    const [showEventsList, setShowEventsList] = useState(false);
    const [showAddCalendar, setShowAddCalendar] = useState(false);
    const [showViewCalendar, setShowViewCalendar] = useState(false);
    const [showAvailabilityRules, setShowAvailabilityRules] = useState(false);
    const initialRender = useRef(true);
    // var nylas: any;

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
        } else {
            loadSchedulers(false, "")
        }

        // const script = document.createElement('script');
        // script.src = "https://schedule.nylas.com/schedule-editor/v1.0/schedule-editor.js";
        // script.async = true;

        // document.body.appendChild(script);

        // return () => {
        //     document.body.removeChild(script);
        // }
    }, []);

    // const showNylas = useCallback(() => {
    //     // @ts-ignore
    //     var instance = nylas.scheduler.show({
    //         auth: {
    //             accessToken: "QZPB2CsbhRDLw5RbyY3CcAd4hlFigJ",
    //         },
    //         style: {
    //             tintColor: '#32325d',
    //             backgroundColor: 'white',
    //         },
    //         defaults: {
    //             event: {
    //                 // title: '30-min Interview',
    //                 // duration: 30,
    //                 // conferencing: {
    //                 //     provider: "Zoom Meeting",
    //                 //     autocreate: {}
    //                 // },
    //             },
    //             appearance: {
    //                 logo: "https://www.askconsulting.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBMUF2RFE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--fde0ce7385e1d2d4d7b98f496e0e0dd1b9d176a9/logo.png",
    //                 company_name: "ASK Consulting",
    //                 thank_you_redirect: "https://resume.accuick.com/workflow/#/stages/RedirectSchedulerUrl",
    //             },
    //             // conferencing: {
    //             //     provider: "Microsoft Teams",
    //             //     autocreate: {}
    //             // },
    //         },
    //         appearance: {
    //             logo: "https://www.askconsulting.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBMUF2RFE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--fde0ce7385e1d2d4d7b98f496e0e0dd1b9d176a9/logo.png",
    //             company_name: "ASK Consulting",
    //             thank_you_redirect: "https://resume.accuick.com/workflow/#/stages/RedirectSchedulerUrl",
    //         },
    //     });
    //     instance.addEventListener('close', () => {
    //         console.log(instance);
    //         loadSchedulers();
    //         // alert('Editor Closed!')
    //     })
    //     // checkIfNylasIsOpened();
    // }, []);
    // const checkIfNylasIsOpened = () => {
    //     if (document.getElementsByClassName('nylas-backdrop').length) {
    //         setTimeout(() => {
    //             checkIfNylasIsOpened();
    //         }, 1000);
    //     } else {
    //         loadSchedulers();
    //     }
    // }
    const loadSchedulers = (fromList: boolean, cronofyId: string) => {

        // ApiService.getCronofyServiceAccountToken("adityak@askconsulting.com").then((response: any) => {
        //     console.log(response);
        // });
        // {"authorization":{"code":"rbk6dlKdWnjAXjpIwc2OBwObc-xh7VtW"}}

        let tempData = {
            action: "list",
            recrId: userLocalData.getvalue('recrId'),
            clientId: userLocalData.getvalue('clientId')
        }

        let recrData = {
            recrId: userLocalData.getvalue('recrId'),
            clientId: userLocalData.getvalue('clientId')
        }
        trackPromise(
            ApiService.postWithParams(193, 'Curately/Workflow/workflow_cronofy_users.jsp', recrData).then((response1: any) => {
                // tokensObj.current.accountId = response1.data.subId;
                let refreshData = {
                    json: JSON.stringify(
                        {
                            "client_id": import.meta.env.VITE_CRONOFY_CLIENT_ID,
                            "client_secret": import.meta.env.VITE_CRONOFY_CLIENT_SECRET,
                            // "client_id": response1.data.client_id,
                            // "client_secret": response1.data.client_secret,
                            "grant_type": "refresh_token",
                            "refresh_token": response1.data.refreshToken
                        }
                    )
                }
                trackPromise(
                    ApiService.postWithParams(193, 'Curately/Workflow/workflow_cronofy_refresh_token.jsp', refreshData).then((response2: any) => {
                        // tokensObj.current.accessToken = "uiibPBv0CKjpQ-vP6ElCuqMKwcfnlxoJ";
                        tokensObj.current.accessToken = response2.data.access_token;
                        let cronofyParams = {
                            url: "https://api.cronofy.com/v1/userinfo",
                            token: response2.data.access_token
                        }
                        trackPromise(
                            ApiService.postWithParams(193, 'Curately/Workflow/workflow_cronofy_postman_get.jsp', cronofyParams).then((response3: any) => {
                                // console.log(response3);
                                tokensObj.current.accountId = response3.data.sub;
                                tokensObj.current.calendarData = response3.data["cronofy.data"].profiles[0].profile_calendars;
                                // tokensObj.current.calendarId = response3.data["cronofy.data"].profiles[0].profile_calendars[0].calendar_id;
                            })
                        )
                    })
                )
                trackPromise(
                    ApiService.postWithParams(193, 'Curately/Workflow/workflow_cronofy_action.jsp', tempData).then((response4: any) => {
                        // console.log(response4.data);
                        setSchedulerList(response4.data);
                        schedulerListRef.current = response4.data;
                        if (cronofyId && (cronofyId !== selectedSchedulerId)) {
                            setSelectedSchedulerId(cronofyId);
                            saveScheduler(cronofyId);
                        }
                        if (!initialLoad) {
                            loadInitialData(response4.data, cronofyId ? cronofyId : selectedSchedulerId);
                            setInitialLoad(true);
                        }
                        if (fromList) {
                            loadInitialData(response4.data, cronofyId ? cronofyId : selectedSchedulerId);
                            setShowEventsList(true);
                        }
                    })
                )
            })
        )
    }
    const loadInitialData = (tempSchedulerList: any, val: string) => {
        let tempObj: any = tempSchedulerList.find((obj: any) => {
            return obj.cronofyId === val
        });
        if (!tempObj) {
            setSelectedSchedulerId("");
        }
        selectedScheduler.current = (tempObj) ? tempObj : {};
        tokensObj.current.selectedRecrId = (tempObj?.recrId) ? tempObj?.recrId : "";
        tokensObj.current.selectedEventId = (tempObj?.eventId) ? tempObj?.eventId : "";
        selectedScheduler.current.eventId = (tempObj?.eventId) ? tempObj?.eventId : "";
        tokensObj.current.selectedCronofyId = (val) ? tempObj?.cronofyId : "";
        tokensObj.current.selectedCronofyIndex = (val) ? tempSchedulerList.findIndex((obj: any) => obj.cronofyId === val) : -1;
        // console.log(tempSchedulerList.findIndex((obj: any) => obj.cronofyId === val))
    }
    const saveScheduler = (val: string) => {
        // 
        if (val) {
            let tempObj: any = schedulerListRef.current.find((obj: any) => {
                return obj.cronofyId === val
            });
            tokensObj.current.selectedRecrId = (tempObj?.recrId) ? tempObj?.recrId : "";
            tokensObj.current.selectedEventId = tempObj?.eventId;
            selectedScheduler.current.eventId = tempObj?.eventId;
            tokensObj.current.selectedCronofyId = (val) ? tempObj?.cronofyId : "";
            tokensObj.current.selectedCronofyIndex = (val) ? schedulerListRef.current.findIndex((obj: any) => obj.cronofyId === val) : -1;
            tempObj.accountId = tokensObj.current.accountId;
            // tempObj.calendarId = tokensObj.current.calendarId;
            if (tempObj?.cronofyId) {
                let tempData = {
                    stageId: stageId,
                    scheduler_id: tempObj.cronofyId,
                    scheduler_name: tempObj.summary,
                    scheduler_slug: tempObj.join_url,
                    json: JSON.stringify(tempObj),
                    recrid: userLocalData.getvalue('recrId'),
                    clientId: userLocalData.getvalue('clientId'),
                };
                trackPromise(
                    ApiService.postWithParams(193, 'Curately/Workflow/workflow_scheduler_save.jsp', tempData).then((response: any) => {
                        // console.log(response.data);
                    })
                )
            }
        }
    }


    const deleteEvent = (id: string | number, fromList: boolean) => {

        let tempData = {
            action: "delete",
            cronofyId: (id) ? id : tokensObj.current.selectedCronofyIndex,
            clientId: userLocalData.getvalue('clientId')
        };
        trackPromise(
            ApiService.postWithParams(193, 'Curately/Workflow/workflow_cronofy_action.jsp', tempData).then((response: any) => {
                if (fromList) {
                    loadSchedulers(true, "");
                } else {
                    loadSchedulers(false, "");
                    setSelectedSchedulerId("");

                }
            })
        )
    }

    const saveAvailabilityRule = (eventId: string, calendarId: string) => {
        let data: any = {
            url: "https://api.cronofy.com/v1/availability_rules",
            json: JSON.stringify({
                "availability_rule_id": eventId,
                // "tzid": "America/Chicago",
                tzid: Intl.DateTimeFormat().resolvedOptions().timeZone,
                "calendar_ids": [
                    calendarId
                ],
                "weekly_periods": [
                    {
                        "day": "monday",
                        "start_time": "09:00",
                        "end_time": "17:30"
                    },
                    {
                        "day": "tuesday",
                        "start_time": "09:00",
                        "end_time": "17:30"
                    },
                    {
                        "day": "wednesday",
                        "start_time": "09:00",
                        "end_time": "17:30"
                    },
                    {
                        "day": "thursday",
                        "start_time": "09:00",
                        "end_time": "17:30"
                    },
                    {
                        "day": "friday",
                        "start_time": "09:00",
                        "end_time": "17:30"
                    }
                ]
            }),
            token: tokensObj.current.accessToken
        }
        trackPromise(
            ApiService.postWithParams(193, 'Curately/Workflow/workflow_cronofy_postman_post.jsp', data).then((response: any) => {
                // console.log(response);
                setShowAvailabilityRules(true);
                loadSchedulers(false, "");
            })
        );
    }

    const showSelectedAvailabilityRule = () => {
        tokensObj.current.selectedEventId = selectedScheduler.current.eventId;
        setShowAvailabilityRules(true);
    }

    return (
        <div className='scheduling'>
            {/* <nylas-schedule-editor></nylas-schedule-editor> */}

            <Card className='assessment'>
                <CardContent>

                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Typography variant='h6' className='mb-3'>Schedule</Typography>
                        {/* <Grid>
                            <Button onClick={() => setShowEventsList(true)} variant='outlined'>Create/Edit Scheduler</Button>
                        </Grid> */}
                        {/* Create Cronofy */}
                        {/* <Button onClick={showNylas} variant='outlined'>Create/Edit Scheduler</Button> */}
                        {/* Setup/Modify Calendar */}
                    </Grid>

                    {/* <Grid
                        container
                        direction="row"
                        justifyContent="start"
                        alignItems="center"
                        className='mt-2'
                    > */}
                        {/* <TextField
                            size='small'
                            id='schedule'
                            select
                            onChange={
                                (e) => {
                                    setSelectedSchedulerId(e.target.value);
                                    saveScheduler(e.target.value);
                                }
                            }
                            value={selectedSchedulerId}
                            name={`schedule`}
                            className='mb-2'
                            // label='Schedule'
                            sx={{ width: 300 }}
                        > */}
                            {/* <MenuItem value="" disabled={true}></MenuItem>
                            {schedulerList.map(
                                (schedule: any, i: number) => {
                                    return <MenuItem value={schedule.cronofyId} key={schedule.cronofyId}>{schedule.summary}</MenuItem>
                                }
                            )} */}
                            {/* {schedulerList.map(
                            (schedule: any, i: number) => {
                                return <MenuItem value={schedule.id} key={schedule.id}>{schedule.name}</MenuItem>
                            }
                        )} */}

                        {/* </TextField> */}
                        {/* {
                            selectedSchedulerId ?
                                <span className="actionIcons">
                                    <Tooltip title="Edit">
                                        <EditIcon onClick={() => {
                                            setShowAddCalendar(true);
                                        }} />
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <DeleteOutlineOutlinedIcon onClick={() => {
                                            confirmDialog('Are you sure you want to delete?', () =>
                                                deleteEvent(selectedScheduler.current.cronofyId, false)
                                            );
                                        }} />
                                    </Tooltip>

                                    <Tooltip title="Availability Rules">
                                        <AssessmentOutlinedIcon
                                            onClick={
                                                () => {
                                                    showSelectedAvailabilityRule();
                                                }
                                            }
                                        />
                                    </Tooltip>
                                </span>
                                :
                                null
                        } */}
                        {/* {
                            !schedulerList.length ?
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<AddCircleOutlineIcon />}
                                    onClick={
                                        () => {
                                            tokensObj.current.selectedCronofyIndex = -1;
                                            setShowAddCalendar(true);
                                        }
                                    }
                                    className='mb-3'
                                >
                                    Add Event
                                </Button>
                                :
                                null
                        } */}
                    {/* </Grid> */}
                    <FormControlLabel
                        className='mt-3'
                        control={
                            <Checkbox
                                name="moveStage"
                                checked={moveStage}
                                onChange={(e, checked) => setMoveStage(checked)}
                            />
                        }
                        label={`Automatically move the candidate to Next Stage after the Scheduled Event.`}
                    />

                </CardContent>
            </Card>
            {
                showEventsList ?
                    <ListEvents
                        eventsList={schedulerList}
                        open={showEventsList}
                        openEdit={
                            (index: any) => {
                                // console.log(index);
                                tokensObj.current.selectedCronofyIndex = index;
                                setShowEventsList(false);
                                setShowAddCalendar(true);
                            }
                        }
                        openView={
                            (index: any) => {
                                // console.log(index);
                                tokensObj.current.selectedCronofyIndex = index;
                                setShowEventsList(false);
                                setShowViewCalendar(true);
                            }
                        }
                        closePopup={
                            () => setShowEventsList(false)
                        }
                        openAdd={
                            () => {
                                // console.log(-1);
                                tokensObj.current.selectedCronofyIndex = -1;
                                setShowEventsList(false);
                                setShowAddCalendar(true);
                            }
                        }
                        deleteEvent={
                            (id) => {
                                deleteEvent(id, true);
                            }
                        }
                        openAvailabilityRules={
                            (eventId) => {
                                tokensObj.current.selectedEventId = eventId;
                                setShowEventsList(false);
                                setShowAvailabilityRules(true);
                            }
                        }
                    // eventData={(tokensObj.current.selectedCronofyIndex !== 0) ? tokensObj.current.selectedCronofyIndex : {}}
                    />
                    :
                    null
            }
            {
                showViewCalendar ?
                    <ViewCalendarEvent
                        calendarData={tokensObj.current.calendarData}
                        open={showViewCalendar}
                        closePopup={
                            () => setShowViewCalendar(false)
                        }
                        eventData={(tokensObj.current.selectedCronofyIndex !== -1) ? schedulerList[tokensObj.current.selectedCronofyIndex] : {}}
                    />
                    :
                    null
            }
            {
                showAddCalendar ?
                    <AddCalendarEvent
                        calendarData={tokensObj.current.calendarData}
                        open={showAddCalendar}
                        onClose={
                            () => setShowAddCalendar(false)
                        }
                        closePopup={
                            () => setShowAddCalendar(false)
                        }
                        itemSaved={
                            (eventId, addOrUpdate, calendarId, cronofyId) => {
                                // console.log(eventId);
                                tokensObj.current.selectedEventId = eventId;
                                selectedScheduler.current.eventId = eventId;
                                setShowAddCalendar(false);
                                setShowAvailabilityRules(false);
                                loadSchedulers(false, cronofyId);
                                if (addOrUpdate === "update") {
                                    setShowAvailabilityRules(true);
                                } else {
                                    setTimeout(() => {
                                        setShowAddCalendar(false);
                                    }, 500);
                                    saveAvailabilityRule(eventId, calendarId);
                                }
                            }
                        }
                        eventData={
                            (tokensObj.current.selectedCronofyIndex !== -1)
                                ?
                                schedulerList[tokensObj.current.selectedCronofyIndex]
                                :
                                {
                                    summary: "",
                                    description: "",
                                    start_date: "",
                                    end_date: "",
                                    location: "",
                                    providerid: "",
                                    join_url: "",
                                    calendarId: "",
                                    duration: ""
                                }
                        }
                    />
                    :
                    null
            }
            {
                showAvailabilityRules ?
                    <Cronofy
                        open={showAvailabilityRules}
                        onClose={
                            () => {
                                setShowAvailabilityRules(false)
                            }
                        }
                        accessToken={tokensObj.current.accessToken}
                        subAccountId={tokensObj.current.accountId}
                        itemSaved={
                            () => {
                                setShowAvailabilityRules(false);
                            }
                        }
                        availability_rule_id={tokensObj.current.selectedEventId}
                        isRecruiter={`${(recrID !== tokensObj.current.selectedRecrId) ? '' : ''}`}
                    // isRecruiter={`${(recrID !== tokensObj.current.selectedRecrId) ? 'notRecruiter' : ''}`}
                    />
                    :
                    null
            }
            {/* <Cronofy stageId={stageId} /> */}
        </div>
    )
}

export default Scheduling