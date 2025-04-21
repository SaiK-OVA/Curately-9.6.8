import { Grid } from '../../../../../shared/modules/MaterialImports/Grid';
import { Typography } from '../../../../../shared/modules/MaterialImports/Typography';
// import TextField from '@mui/material/TextField';
import { Card } from '../../../../../shared/modules/MaterialImports/Card';

// import MenuItem from '@mui/material/MenuItem';

import ApiService from "../../../../../shared/api/api";
// import { MUIAutoComplete } from '../../../../shared/MUIAutoComplete/MUIAutoComplete';
import { useFormik, Yup } from "../../../../../shared/modules/Formik";
import LocationOnIcon from "@mui/icons-material/LocationOn";
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DateTime, DateTimeMaybeValid } from '../../../../../shared/modules/Luxon';
// import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { trackPromise } from 'react-promise-tracker';

// import Button from '@mui/material/Button';
import { Tooltip } from '../../../../../shared/modules/MaterialImports/ToolTip';
// import { FocusError } from 'focus-formik-error';

import { ConferencingImages } from '../../../../../shared/images/ConferencingImages';
// import ErrorMessage from '../../../../shared/Error/ErrorMessage';
import { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from 'react';

import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { useParams } from 'react-router-dom';
import { trackPromise } from '../../../../../shared/modules/PromiseTrackter';
import { userLocalData } from '../../../../../shared/services/userData';
import { showToaster } from '../../../../../shared/modules/commonImports';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
// import Box from '@mui/material/Box';
import { Divider } from '../../../../../shared/modules/MaterialImports/Divider';
import { AssignWorkflowInterface } from './AssignWorkflowInterface';
// import { Label } from '@mui/icons-material';
// import { CardContent } from '@mui/material';


import EditWorkflowScheduling from '../EditWorkflowScheduling/EditWorkflowScheduling';
import { StageInterface } from '../../../Letters/Workflow/Add/AddWorkflow';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { Chip } from './../../../../../shared/modules/MaterialImports/Chip';

import './AssignWorkflow.scss';
import masterStatesList from '../../../../../shared/data/States';


const ViewWorkflow = forwardRef<AssignWorkflowInterface, { closePopup: (isUpdated: boolean) => void; workflowJobID: any }>(({ closePopup, workflowJobID }, ref) => {

    useImperativeHandle(
        ref,
        () => ({
            // showAlert() {
            //     alert("Child Function Called")
            //     console.log('hello world')
            // },
            assignWorkflow(jobIdPassed: string) {
                jobIdRef.current = jobIdPassed;
                assignWorkflowToJob();
            },
            checkIsValid() {
                if (!assignFormik.values.workflowId) {
                    return true;
                }
                return Boolean(assignFormik.isValid);
            },
            isWorkflowSelected() {
                return Boolean(assignFormik.values.workflowId);
            }
        }),
    )


    function formatDate(dateString: string): string {
        const date = new Date(dateString);
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const yyyy = date.getFullYear();
        const h = String(date.getHours()).padStart(2, '0');
        const i = String(date.getMinutes()).padStart(2, '0');
        // const s = String(date.getSeconds()).padStart(2, '0');

        return `${mm}/${dd}/${yyyy} ${h}:${i}`;
    }

    // useEffect(() => {
    //     console.log('closePopup ')
    // }, [closePopup]);
    const [workflowSchedulingOpen, setWorkflowSchedulingOpen] = useState(false);

    const jobIdRef = useRef("")
        ;
    const { jobId } = useParams();
    // const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    interface workflowdataInterface {
        assignBy: string;
        assignStates: {
            recrId: string;
            state: string;
        }[],
        assignRecrNames: {
            recrId: string;
            recrName: string;
            state?: string;
        }[],
        stages: string[],
        SchedulingEvents: {
            stageNumber: string;
            title: string;
            events: {
                end_date: string;
                summary: string;
                eventId: string;
                start_date: string;
            }[],
            stageId: string;
        }[],
        schedulesList: {
            startDate: DateTime;
            endDate: DateTime;
            eventId: string;
            summary: string;
        }[]
        workflowId: string;
        assignRecrIds: string;
    }

    const [workflowData, setWorkflowData] = useState<workflowdataInterface>({
        assignBy: "",
        assignStates: [],
        assignRecrNames: [],
        stages: [],
        SchedulingEvents: [],
        workflowId: "",
        assignRecrIds: "",
        schedulesList: []
    });



    const initialValues: {
        workflowId: string;
        workflowName: string;
        assignRecruiterId: string;
        assignRecruiterName: string;
        assignRecruiterType: string;
        schedulingsList: {
            title: string;
            description: string;
            conferencing: string;
            zoomLink: string;
            duration: string;
            locationDescription: string;
            stageId: string;
            stageNumber: string;
            startDate: DateTime;
            endDate: DateTime;
        }[],
        statesList: { states: string; recrName: string; recrId: string; }[]
    } = {
        workflowId: "",
        workflowName: "",
        assignRecruiterId: "",
        assignRecruiterName: "",
        assignRecruiterType: "",
        schedulingsList: [],
        statesList: []
    }

    const assignWorkflowSchema = Yup.object().shape({
        workflowId: Yup.string(),
        workflowName: Yup.string().required('Workflow is required'),
        assignRecruiterId: Yup.string().when('workflowId', {
            is: (workflowId: string | number) => (workflowId) ? true : false,
            then: (f: any) => f.required('Recruiter is required')
        }),
        assignRecruiterName: Yup.string(),
        assignRecruiterType: Yup.string().when("assignRecruiterId", (val: any) => {
            let tempVal = (typeof val === 'string' && val.length) ? val?.split(',') : (Array.isArray(val) && val.length && val[0]) ? val : [];
            if (tempVal.length > 1) {
                return Yup.string().required('Recruiter Type is required');
            }
            else {
                return Yup.string();
            }
        }),
        statesList: Yup.array().when("assignRecruiterType", (val) => {
            let tempVal = (typeof val === 'string') ? val : (Array.isArray(val) && val.length && val[0]) ? val[0] : "";
            if (tempVal === "2") {
                return Yup.array().of(
                    Yup.object().shape({
                        recrID: Yup.string(),
                        recrName: Yup.string(),
                        states: Yup.string().required('States is required')
                    })
                )
            } else {
                return Yup.array().of(
                    Yup.object().shape({
                        recrID: Yup.string(),
                        recrName: Yup.string(),
                        states: Yup.string()
                    })
                )
            }
        }),
        schedulingsList: Yup.array().of(
            Yup.object().shape({
                title: Yup.string().required('Title is required'),
                description: Yup.string(),
                startDate: Yup.date().required('Start Date is required'),
                endDate: Yup.date().required('End Date is required'),
                locationDescription: Yup.string(),
                conferencing: Yup.string(),
                zoomLink: Yup.string().when('conferencing', {
                    is: "zoom",
                    then: (f: any) => f.required('Zoom Link is required')
                }),
                duration: Yup.number().required('Duration is required').min(15, "Minimum Duration should be 15 Minutes"),
                stageId: Yup.string(),
                stageNumber: Yup.string(),
            })
        )
    })

    const assignFormik = useFormik({
        initialValues: initialValues,
        validationSchema: assignWorkflowSchema,
        onSubmit: () => {
            // console.log(assignFormik.values);
        },
        // validateOnMount: true
    });


    const [stagesList, setStagesList] = useState<StageInterface[]>([]);


    const loadEventIds = () => {
        let eventIdsToPass: string[] = [];
        let recrIds = assignFormik.values.assignRecruiterId.split(',');
        for (let ri = 0; ri < recrIds.length; ri++) {
            // const element = recrIds[ri];

            // let tempData = {
            //     action: "list",
            //     recrId: recrIds[ri],
            //     clientId: userLocalData.getvalue('clientId')
            // }

            let recrData = {
                recrId: recrIds[ri],
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
                                // "client_id": "3n3CtZnF2prjQNVeKvUmeoytPalQXnDo",
                                // "client_secret": "CRN_qhfu57exU7IdW4xyUKJnDCURe2JNQ9NUo2zUFP",
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

                                    let tempCalendarId = (response3.data["cronofy.data"] && response3.data["cronofy.data"].profiles.length && response3.data["cronofy.data"].profiles[0].profile_calendars.length && response3.data["cronofy.data"].profiles[0].profile_calendars[0].calendar_id) ? response3.data["cronofy.data"].profiles[0].profile_calendars[0].calendar_id : ""; response3.data["cronofy.data"].profiles[0].profile_calendars[0].calendar_id;
                                    // let ScheduleStageIds = [];
                                    let tempStageIdsList = [...assignFormik.values.schedulingsList];
                                    for (let ssl = 0; ssl < tempStageIdsList.length; ssl++) {
                                        if (tokensObj.current.accountId && tempCalendarId) {
                                            let tempData = {
                                                summary: tempStageIdsList[ssl].title,
                                                description: tempStageIdsList[ssl].description,
                                                location: tempStageIdsList[ssl].locationDescription,
                                                start_date: tempStageIdsList[ssl].startDate?.toISO()?.substring(19, 0),
                                                end_date: tempStageIdsList[ssl].endDate?.toISO()?.substring(19, 0),
                                                duration: tempStageIdsList[ssl].duration,
                                                providerid: tempStageIdsList[ssl].conferencing,
                                                join_url: (tempStageIdsList[ssl].conferencing === "zoom") ? tempStageIdsList[ssl].zoomLink : "",
                                                calendarId: tempCalendarId,
                                                action: "add",
                                                username: userLocalData.getvalue('userName'),
                                                recrId: userLocalData.getvalue('recrId'),
                                                cronofyId: "",
                                                clientId: userLocalData.getvalue('clientId')
                                            };
                                            ApiService.postWithParams(193, 'Curately/Workflow/workflow_cronofy_action.jsp', tempData).then((addEventResponse: any) => {
                                                // console.log(addEventResponse.data);
                                                if (addEventResponse.data.message === "Success" && addEventResponse.data.eventId) {
                                                    eventIdsToPass.push(addEventResponse.data.eventId + '::' + recrIds[ri] + '::' + tempStageIdsList[ssl].stageId);

                                                    if (addEventResponse.data.eventId) {
                                                        tempData.cronofyId = addEventResponse.data.eventId;
                                                        let data: any = {
                                                            url: "https://api.cronofy.com/v1/availability_rules",
                                                            json: encodeURIComponent(JSON.stringify({
                                                                "availability_rule_id": addEventResponse.data.eventId,
                                                                // "tzid": "America/Chicago",
                                                                tzid: Intl.DateTimeFormat().resolvedOptions().timeZone,
                                                                "calendar_ids": [
                                                                    tempCalendarId
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
                                                            })),
                                                            token: tokensObj.current.accessToken
                                                        }
                                                        trackPromise(
                                                            ApiService.postWithParams(193, 'Curately/Workflow/workflow_cronofy_postman_post.jsp', data).then((
                                                                // finalResponse: any
                                                            ) => {
                                                                // console.log(finalResponse.data);
                                                                if ((ri == recrIds.length - 1) && (ssl == tempStageIdsList.length - 1)) {
                                                                    callWorkflowAssignAPI(eventIdsToPass);
                                                                }
                                                            })
                                                        );
                                                    }
                                                } else {
                                                    showToaster(addEventResponse.data.message, 'error');

                                                }
                                            });
                                        } else {
                                            if (!tempCalendarId) {
                                                showToaster('No Calendar ID found', 'error');
                                            }
                                            if (!tokensObj.current.accountId) {
                                                showToaster('No Account ID found', 'error');
                                            }

                                        }
                                    }
                                })
                            )
                        })
                    )
                })
            );

        }
    }
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
    const callWorkflowAssignAPI = (eventIds: string[]) => {

        let tempStatesList = [...assignFormik.values.statesList.map(a => a.states)];

        let tempData = {
            workflowId: assignFormik.values.workflowId,
            jobId: jobId || jobIdRef.current,
            recrId: userLocalData.getvalue('recrId'),
            assignRecrIds: assignFormik.values.assignRecruiterId,
            assignStates: tempStatesList.join('::'),
            assignType: assignFormik.values.assignRecruiterType,
            eventIds: eventIds.join()
        }
        trackPromise(
            ApiService.getByParams(193, 'Curately/Workflow/workflow_assignjob.jsp', tempData)
                .then((result) => {
                    if (result.data.message === "Success") {
                        closePopup(true);
                        if (jobId) {
                            showToaster('Workflow has been Assigned successfully.', 'success');
                            setTimeout(() => {
                                window.location.reload();
                            }, 1000);
                        } else {
                            showToaster('Job Created successfully.', 'success');
                        }
                    } else if (result.data.message && result.data.message.includes("already")) {
                        showToaster('The Job is already assigned to a Workflow', 'info');
                    } else {
                        showToaster((result.data.message) ? result.data.message : "An error occured.", 'error');
                    }


                })

                .catch((error) => {
                    console.error('Error Assigning Job to Workflow: ', error);
                })
        )
    }


    const assignWorkflowToJob = () => {
        console.log(assignFormik.values);
        // setIsFormSubmitted(true);
        if (assignFormik.isValid && assignFormik.values.workflowId) {
            if (assignFormik.values.schedulingsList.length) {
                loadEventIds();
            } else {
                callWorkflowAssignAPI([]);
            }
        } else {
            showToaster('Please fill all mandatory fields.', 'error');
        }
    }
    const getEditWorkflow = (id: string) => {
        trackPromise(
            ApiService.getByParams(193, 'Curately/Workflow/workflow_assignjob_edit.jsp', {
                workflow_job_id: id // editJobData.workflowDetails.workflow_job_id
            })
                .then((response) => {
                    let tempResp = response.data;
                    let tempScheduling: {
                        startDate: DateTime;
                        endDate: DateTime;
                        eventId: string;
                        summary: string;
                    }[] = [];
                    if (tempResp.workflowId) {
                        tempResp.assignRecrNamesList = tempResp.assignRecrNames.map((a: any) => a.recrName);
                        // tempResp.assignStatesList = tempResp.assignStates.map((a: any) => a.state);
                        for (let ar = 0; ar < tempResp.assignRecrNames.length; ar++) {
                            tempResp.assignRecrNames[ar].states = tempResp.assignStates.filter((a: any) => a.recrId == tempResp.assignRecrNames[ar].recrId).map((a: any) => getStateById(a.state)).join(', ');
                        }
                        if (tempResp.SchedulingEvents?.length) {
                            for (let se = 0; se < tempResp.SchedulingEvents.length; se++) {
                                const eventsList = tempResp.SchedulingEvents[se].events;
                                for (let el = 0; el < eventsList.length; el++) {
                                    let startDate = DateTime.fromFormat(eventsList[el].start_date.replace('T', ' '), 'yyyy-MM-dd hh:mm:ss');
                                    let endDay = DateTime.fromFormat(eventsList[el].end_date.replace('T', ' '), 'yyyy-MM-dd hh:mm:ss');

                                    let nextDay: DateTimeMaybeValid = DateTime.now().plus({ day: 1 });

                                    let nextWeek: DateTimeMaybeValid = DateTime.now().plus({ week: 1 });

                                    nextDay = (startDate > nextDay) ? startDate : nextDay;
                                    nextWeek = (startDate > endDay) ? startDate : endDay;

                                    tempScheduling.push({
                                        endDate: nextWeek,
                                        startDate: nextDay,
                                        eventId: eventsList[el].eventId,
                                        summary: eventsList[el].summary,
                                    });
                                }
                            }
                        }
                        //  console.log("eete");
                        // console.log(tempResp.assignRecrNames);

                        setWorkflowData({ ...tempResp, schedulesList: tempScheduling });
                        getStagesData(tempResp.workflowId);
                    }

                }
                )
        )
    }
    const getStateById = (id: string) => {
        let tempObj = masterStatesList.find((obj) => {
            return obj.id === id
        });
        return (tempObj && tempObj.label) ? tempObj.label : ""
    }
    const getStagesData = (wId: string) => {
        if (wId) {
            trackPromise(
                ApiService.postWithParams(193, 'Curately/Workflow/workflow_stages_list.jsp', {
                    workflowId: wId,
                    clientId: userLocalData.getvalue('clientId')
                }).then((response: any) => {
                    // console.log(response.data)
                    assignFormik.setFieldValue('workflowId', response.data.workflowId);
                    assignFormik.setFieldValue('workflowName', response.data.workflowName, true);

                    if (response.data?.stages?.length) {
                        setStagesList(response.data?.stages);
                        if (response.data?.stages.some((stage: StageInterface) => stage.stageTypeId === "9")) {
                            getScheduleData(wId);
                        }
                    } else {
                        setStagesList([]);
                    }
                })
            )
        } else {
            setStagesList([]);
            assignFormik.setFieldValue('schedulingsList', []);
            assignFormik.resetForm();
        }
    }

    const getScheduleData = (id: string) => {
        if (id) {
            // http://35.155.228.233:41088/DemoAutomation/schedulerList/20/3
            trackPromise(
                ApiService.getCall('admin', `schedulerList/${id}/${userLocalData.getvalue('clientId')}`)
                    .then((result) => {
                        //      console.log("result");
                        //      console.log(result);
                        if (result.data.schedulerList && result.data.schedulerList.length) {
                            let tempScheduleList = [];
                            for (let sl = 0; sl < result.data.schedulerList.length; sl++) {
                                const element = result.data.schedulerList[sl];

                                tempScheduleList.push({
                                    title: element.title,
                                    description: "",
                                    startDate: DateTime.now().set({ hour: 9, minute: 30 }).plus({ day: 1 }),
                                    endDate: DateTime.now().plus({ days: 8 }).set({ hour: 17, minute: 30 }),
                                    locationDescription: "",
                                    conferencing: "",
                                    zoomLink: "",
                                    duration: "",
                                    stageId: element.stageId,
                                    stageNumber: element.number
                                })
                            }
                            // console.log(tempScheduleList);
                            assignFormik.setFieldValue('schedulingsList', tempScheduleList);
                        }
                    })
                    .catch((error) => {
                        console.error('Error Assigning Job to Workflow: ', error);
                    })
            );
        } else {
            assignFormik.setFieldValue('schedulingsList', []);

        }
    }

    // const handleStatesChange = (i: number, id: string) => {
    //     let tempState: { states: string; recrId: string; recrName: string }[] = [...assignFormik.values.statesList];
    //     tempState[i].states = id;
    //     assignFormik.setFieldValue('statesList', tempState);
    // }
    // const loadRecruiterStates = (id: string, name: string) => {
    //     // assignFormik.setFieldValue('assignRecruiterName', (name));
    //     // assignFormik.setFieldValue('assignRecruiterId', (id));
    //     let statesList: { states: string, recrName: string, recrId: string }[] = [];
    //     if (id) {
    //         let tempIds = [...new Set(id.split(','))];
    //         let tempNames = [...new Set(name.split(','))];
    //         if (tempIds.length > 1) {
    //             let tempStatesList: { states: string, recrName: string, recrId: string }[] = [...assignFormik.values.statesList];
    //             for (let ti = 0; ti < tempIds.length; ti++) {
    //                 if (tempStatesList.some(function (el) { return el.recrId === tempIds[ti] })) {

    //                 } else {
    //                     tempStatesList.push({
    //                         recrId: tempIds[ti],
    //                         recrName: tempNames[ti],
    //                         states: ""
    //                     })
    //                 }
    //             }
    //             statesList = tempStatesList.filter(x => tempIds.some(y => y === x.recrId));
    //         }
    //         console.log(id);
    //         console.log(name);
    //         assignFormik.setValues({
    //             ...assignFormik.values,
    //             assignRecruiterName: tempNames.join(),
    //             assignRecruiterId: tempIds.join(),
    //             statesList: statesList
    //         })
    //     } else {
    //         assignFormik.setValues({
    //             ...assignFormik.values,
    //             assignRecruiterName: name,
    //             assignRecruiterId: id,
    //             statesList: statesList
    //         })
    //     }
    // }


    useEffect(() => {
        console.log('Assign Workflow' + workflowJobID);
        getEditWorkflow(workflowJobID);
        console.log(workflowData);
    }, [])



    return (

        <form
            onSubmit={assignFormik.handleSubmit}
            id='ViewWorkflow'
        >
            <Grid container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >

                <Grid className='mb-1 mt-0' size={12}>
                    <h4> Workflow Name : - {assignFormik.values.workflowName} </h4>
                </Grid>
                {
                    assignFormik.values.workflowId ?
                        <>

                            <Grid
                                container
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"

                                sx={{
                                    backgroundColor: "var(--gray-100)",
                                    marginBottom: "15px",
                                    borderRadius: "5px",
                                    padding: "7px"
                                }}
                            >
                                <Typography variant='subtitle1' sx={{ justifyContent: "flex-start" }}> <b>Stages in : </b></Typography>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                >
                                    <Breadcrumbs aria-label="breadcrumb" maxItems={50} className='breadcrumbStageList' separator={<ArrowForwardIosOutlinedIcon />}>
                                        {
                                            stagesList.map((stage) => {
                                                return <span>{stage.title ? stage.title : stage.name}</span>
                                            })
                                        }
                                    </Breadcrumbs>

                                    {/* <Box sx={{ width: '10%' }}>Info</Box>
                                    <Divider orientation="vertical" flexItem sx={{ marginRight: "13px" }} /> */}
                                </Grid>
                            </Grid>

                            <Grid className='mb-2 mt-2 pr-4' size={12}>
                                <label className="input-label"> <b>Assigned Recruiters : -  </b></label>
                                {
                                    workflowData.assignRecrNames && workflowData.assignRecrNames.map((recrData) => {
                                        return <Chip label={recrData.recrName ? recrData.recrName : recrData.recrId} variant="outlined" className='mr-2' size='medium' />
                                    })
                                }

                            </Grid>
                            <Grid className='mb-2 mt-2 ' size={12}>

                                {
                                    (workflowData.assignRecrIds.split(',').length > 1) ?
                                        <label className="input-label"> <b>Recruiter Type : -  </b> {(workflowData.assignBy === "2") ? "Location Wise" : "Round Robin"}</label>


                                        :
                                        null
                                }
                            </Grid>
                            <Grid size={12} direction={"row"} spacing={2} className='mb-2 mt-2  '>
                                {
                                    ((workflowData.assignBy === "2") && workflowData.assignRecrIds.split(',').length > 1) ?
                                        <div>
                                            {workflowData.assignRecrNames && workflowData.assignRecrNames.map((Recname: any) => {
                                                return (<Grid size={12} className='mb-2 '>
                                                    <label className="input-label"> <b>Location for {Recname.recrName} : - </b></label>
                                                    <span> {Recname.states}</span>
                                                </Grid>)
                                            })}
                                        </div>
                                        :
                                        null
                                }

                            </Grid>

                            {
                                workflowData.SchedulingEvents.length > 1 &&
                                <Grid container direction={"row"}>
                                    <Typography variant="h6" gutterBottom className='mr-2'>
                                        Schedule event details
                                    </Typography>

                                    {
                                        workflowData.SchedulingEvents?.length ?
                                            <Tooltip title="Edit">
                                                <span><ModeEditOutlineOutlinedIcon
                                                    sx={{ color: '#7f7f7f' }}
                                                    className="cursor-pointer"
                                                    onClick={() => setWorkflowSchedulingOpen(true)}
                                                />
                                                </span>
                                            </Tooltip>
                                            :
                                            null
                                    }
                                </Grid>
                            }

                            {
                                workflowData.SchedulingEvents && workflowData.SchedulingEvents.map((schedule: any, index: number) => (
                                    <Card className='customCard Card1' key={`schedule${index}`}>
                                        <Grid spacing={2}>
                                            <Typography className='AssignJobData' gutterBottom>
                                                <b>   Scheduling {index + 1} </b>
                                            </Typography>
                                            < Divider />
                                            <Grid container spacing={2} sx={{ marginTop: "2px" }}>
                                                <Grid size={12}>

                                                    <Typography><label className="input-label">Title : </label> {schedule.title}</Typography>

                                                </Grid>
                                                <Grid size={12}>
                                                    <Typography><label className="input-label">Description : </label> {schedule.events[0]?.description}</Typography>

                                                </Grid>
                                                <Grid size={6}>
                                                    <Typography><label className="input-label">Start Date : </label>{
                                                        (schedule.events[0]?.start_date) ?
                                                            formatDate(schedule.events[0]?.start_date)
                                                            :
                                                            null
                                                    }
                                                        {

                                                            //  console.log(formattedDate); // Output: 03/21/2024

                                                            //   schedule.events[0].start_date ? DateTime.fromFormat(schedule.events[0].start_date.substring(0, 19), 'yyyy-MM-dd hh:mm:ss').toFormat('MM/dd/yyyy hh:mm a') : ""
                                                        }</Typography>

                                                </Grid>
                                                <Grid size={6}>
                                                    <Typography><label className="input-label">End Date : </label>{
                                                        (schedule.events[0]?.end_date) ?
                                                            formatDate(schedule.events[0]?.end_date)
                                                            :
                                                            null
                                                    }</Typography>
                                                </Grid>
                                                <Grid size={6} >
                                                    <Grid
                                                        container
                                                        direction="row"
                                                        justifyContent="flex-start"
                                                        alignItems="center"
                                                    >
                                                        <label className="input-label pr-2">Location : </label>
                                                        {
                                                            (schedule.events[0]?.providername === "ms_teams") ?
                                                                <>
                                                                    <img src={ConferencingImages.GetImage('teams')} alt="" className="conferencingIcon" />
                                                                    <span className='pl-3'>Microsoft Teams</span>
                                                                </>
                                                                : (schedule.events[0]?.providername === "zoom") ?
                                                                    <>
                                                                        <img src={ConferencingImages.GetImage('zoom')} alt="" className="conferencingIcon" />
                                                                        <span className='pl-3'>Zoom</span>
                                                                    </>
                                                                    : (schedule.events[0]?.providername === "-") ?
                                                                        <>
                                                                            <LocationOnIcon sx={{ color: 'var(--curatelyGreen)' }} />
                                                                            <span className='pl-3'>In-person meeting</span>
                                                                        </>
                                                                        : null
                                                        }

                                                    </Grid>
                                                </Grid>
                                                <Grid size={6}>
                                                    <Typography className={`${(schedule.events[0]?.providername === "zoom") ? '' : 'd-none'}`} ><label className="input-label">Zoom Link : </label> {schedule.events[0]?.join_url}</Typography>

                                                </Grid>
                                                <Grid size={6}>
                                                    <Typography ><label className="input-label">Duration in minutes : </label> {schedule.events[0]?.duration}</Typography>
                                                </Grid>
                                                <Grid size={6}>
                                                    <Typography ><label className="input-label">Location Description : </label> {schedule.events[0]?.location}</Typography>
                                                </Grid>


                                            </Grid>
                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="flex-start"
                                                alignItems="center"
                                            >
                                            </Grid>

                                        </Grid>
                                    </Card>
                                ))
                            }
                        </>
                        :
                        null
                }

                {
                    workflowSchedulingOpen ?
                        <EditWorkflowScheduling open={workflowSchedulingOpen} schedulingData={workflowData.schedulesList} closePopup={() => setWorkflowSchedulingOpen(false)} getEditWorkflow={getEditWorkflow}/>
                        :
                        null
                }


            </Grid>
        </form >


    )
})
export default memo(ViewWorkflow);