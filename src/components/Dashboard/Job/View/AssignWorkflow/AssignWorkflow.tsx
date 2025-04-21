import { Grid } from '../../../../../shared/modules/MaterialImports/Grid';
import { Typography } from '../../../../../shared/modules/MaterialImports/Typography';
import { TextField, FormControlLabel, FormControl, FormLabel } from '../../../../../shared/modules/MaterialImports/FormInputs';
import { Card } from '../../../../../shared/modules/MaterialImports/Card';

import { MenuItem } from '../../../../../shared/modules/MaterialImports/Menu';

import ApiService from "../../../../../shared/api/api";
import { MUIAutoComplete } from '../../../../shared/MUIAutoComplete/MUIAutoComplete';
import { useFormik, Yup } from "../../../../../shared/modules/Formik";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DateTime } from '../../../../../shared/modules/Luxon';
import { AdapterLuxon, LocalizationProvider } from "../../../../../shared/modules/MaterialImports/DatePicker";
// import { trackPromise } from 'react-promise-tracker';

// import { FocusError } from 'focus-formik-error';

import { ConferencingImages } from '../../../../../shared/images/ConferencingImages';
import ErrorMessage from '../../../../shared/Error/ErrorMessage';
import { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from 'react';

import { useParams } from 'react-router-dom';
import { trackPromise } from '../../../../../shared/modules/PromiseTrackter';
import { userLocalData } from '../../../../../shared/services/userData';
import { showToaster } from '../../../../../shared/modules/commonImports';
import { Radio, RadioGroup } from '../../../../../shared/modules/MaterialImports/FormElements';
// import Box from '@mui/material/Box';
import { Divider } from '../../../../../shared/modules/MaterialImports/Divider';
import { AssignWorkflowInterface } from './AssignWorkflowInterface';
// import { Label } from '@mui/icons-material';
// import { CardContent } from '@mui/material';


import { StageInterface } from '../../../Letters/Workflow/Add/AddWorkflow';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

import './AssignWorkflow.scss';
import Autocomplete from '@mui/material/Autocomplete/Autocomplete';


const AssignWorkflow = forwardRef<AssignWorkflowInterface, { closePopup: (isUpdated: boolean) => void; }>(({ closePopup }, ref) => {

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
    // useEffect(() => {
    //     console.log('closePopup ')
    // }, [closePopup]);

    const jobIdRef = useRef("")
        ;
    const { jobId } = useParams();
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);


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
        assignRecruiterType: Yup.string().when("assignRecruiterId", (val, schema) => {
            if (val && val[0]?.split(',').length > 1) {
                return Yup.string().required('Recruiter Type is required');
            }
            else {
                return Yup.string();
            }
        }),
        statesList: Yup.array().when("assignRecruiterType", (val, schema) => {
            if (val[0] === "2") {
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
    const [recruiters, setRecruiters] = useState<{ id: string; label: string }[]>([]);


    const loadEventIds = () => {
        let eventIdsToPass: string[] = [];
        let recrIds = assignFormik.values.assignRecruiterId.split(',');
        for (let ri = 0; ri < recrIds.length; ri++) {
            // const element = recrIds[ri];

            let tempData = {
                action: "list",
                recrId: recrIds[ri],
                clientId: userLocalData.getvalue('clientId')
            }

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
                                                username: "",
                                                recrId: recrIds[ri],
                                                cronofyId: "",
                                                clientId: userLocalData.getvalue('clientId')
                                            };
                                            ApiService.postWithParams(193, 'Curately/Workflow/workflow_cronofy_action.jsp', tempData).then((addEventResponse: any) => {
                                                // console.log(addEventResponse.data);
                                                if (addEventResponse.data.message === "Success" && addEventResponse.data.eventId) {
                                                    eventIdsToPass.push(addEventResponse.data.eventId + '::' + recrIds[ri] + '::' + tempStageIdsList[ssl].stageId);

                                                    if (addEventResponse.data.eventId) {
                                                        // tempData.cronofyId = addEventResponse.data.eventId;
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
                                                            ApiService.postWithParams(193, 'Curately/Workflow/workflow_cronofy_postman_post.jsp', data).then((finalResponse: any) => {
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
        setIsFormSubmitted(true);
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

    const getStagesData = (wId: string) => {
        if (wId) {
            trackPromise(
                ApiService.postWithParams(193, 'Curately/Workflow/workflow_stages_list.jsp', {
                    workflowId: wId,
                    clientId: userLocalData.getvalue('clientId')
                }).then((response: any) => {
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
                        // console.log(result);
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

    const handleStatesChange = (i: number, id: string) => {
        let tempState: { states: string; recrId: string; recrName: string }[] = [...assignFormik.values.statesList];
        tempState[i].states = id;
        assignFormik.setFieldValue('statesList', tempState);
    }
    const loadRecruiterStatesData = () => {
        const requestData = {
            clientId: userLocalData.getvalue("clientId"),
        };
        trackPromise(
            ApiService.postWithData("admin", "getCronofyUserList", requestData)
                .then((response) => {
                    if (response?.data?.Success) {
                        const uniqueRecruiters = Array.from(
                            new Set(response.data.cronofyUserList.map((recruiter: any) =>
                                JSON.stringify({ id: recruiter.recrId.toString(), label: recruiter.recrName })
                            ))
                        ).map((str: any) => JSON.parse(str) as { id: string; label: string })
                        setRecruiters(uniqueRecruiters);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching recruiters:", error);
                })
        );
    };
    const loadRecruiterStates = (id: string, name: string) => {
        // assignFormik.setFieldValue('assignRecruiterName', (name));
        // assignFormik.setFieldValue('assignRecruiterId', (id));
        let statesList: { states: string, recrName: string, recrId: string }[] = [];
        if (id) {
            let tempIds = [...new Set(id.split(','))];
            let tempNames = [...new Set(name.split(','))];
            if (tempIds.length > 1) {
                let tempStatesList: { states: string, recrName: string, recrId: string }[] = [...assignFormik.values.statesList];
                for (let ti = 0; ti < tempIds.length; ti++) {
                    if (tempStatesList.some(function (el) { return el.recrId === tempIds[ti] })) {

                    } else {
                        tempStatesList.push({
                            recrId: tempIds[ti],
                            recrName: tempNames[ti],
                            states: ""
                        })
                    }
                }
                statesList = tempStatesList.filter(x => tempIds.some(y => y === x.recrId));
            }
            // console.log(id);
            // console.log(name);
            assignFormik.setValues({
                ...assignFormik.values,
                assignRecruiterName: tempNames.join(),
                assignRecruiterId: tempIds.join(),
                statesList: statesList
            })
        } else {
            assignFormik.setValues({
                ...assignFormik.values,
                assignRecruiterName: name,
                assignRecruiterId: id,
                statesList: statesList
            })
        }
    }


    useEffect(() => {
        console.log('Assign Workflow');
        loadRecruiterStatesData();
    }, [])



    return (

        <form
            onSubmit={assignFormik.handleSubmit}
            id='AssignWorkflow'
        >
            <Grid container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >

                <Grid className='mb-2 mt-2' size={6}>
                    <label className="input-label">Select Workflow</label>
                    <MUIAutoComplete
                        id='workflowId'
                        handleChange={(id: any, name: string) => {
                            assignFormik.setFieldValue('workflowId', id);
                            assignFormik.setFieldValue('workflowName', name, true);
                            getStagesData(id);
                        }}
                        valuePassed={(assignFormik.values.workflowId) ? { label: assignFormik.values.workflowName, id: assignFormik.values.workflowId } : {}}
                        isMultiple={false}
                        textToShow=""
                        width="95%"
                        type='workflow'
                        placeholder=""
                    />
                    <ErrorMessage formikObj={assignFormik} name={`workflowName`} isFormSubmitted={isFormSubmitted} />
                </Grid>
                {
                    assignFormik.values.workflowId ?
                        <>
                            {/* <Box sx={{ width: '100%' }}>
                                        <Box
                                            className='customCard py-0 customCenteredTabs '
                                            sx={{ borderBottom: 1, borderColor: 'divider', minHeight: 'auto !important', marginBottom: '0 !important' }}
                                        >
                                        <label>Trigger</label>    
                                        </Box>
                                        
                                    </Box> */}

                            <Grid
                                container
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                size={12}

                                sx={{
                                    backgroundColor: "var(--gray-100)",
                                    marginBottom: "15px",
                                    borderRadius: "5px",
                                    padding: "7px"
                                }}
                            >
                                <Typography variant='subtitle1' sx={{ justifyContent: "flex-start" }}>Stages in <span className='c-skyblue tt-capital'>{assignFormik.values.workflowName}</span></Typography>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    size={12}
                                >
                                    <Breadcrumbs aria-label="breadcrumb" className='breadcrumbStageList' separator={<ArrowForwardIosOutlinedIcon />}>
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

                            <Grid className='mb-2 mt-2 pr-4' size={6}>
                                <label className="input-label">Assign Recruiter</label>
                                {/* <MUIAutoComplete
                                    id='recruiter'
                                    handleChange={(id: any, name: string) => {
                                        //setAutoCompleteValue(id);
                                        loadRecruiterStates(id, name);
                                    }}
                                    valuePassed={(assignFormik.values.assignRecruiterId) ? { label: assignFormik.values.assignRecruiterName, id: assignFormik.values.assignRecruiterId } : {}}
                                    isMultiple={true}
                                    width="100%"
                                    type='id'
                                    placeholder=""
                                /> */}
                                <Autocomplete
                                    id='recruiter'
                                    multiple
                                    options={recruiters}
                                    getOptionLabel={(option) => option.label}
                                    value={assignFormik.values.assignRecruiterId
                                        ? recruiters.filter((rec) => assignFormik.values.assignRecruiterId.includes(rec.id))
                                        : []
                                    }
                                    onChange={(event, values) => {
                                        if (values.length) {
                                            assignFormik.setValues({
                                                ...assignFormik.values,
                                                assignRecruiterId: values.map((rec) => rec.id).join(','),
                                                assignRecruiterName: values.map((rec) => rec.label).join(', ')
                                            });
                                        } else {
                                            assignFormik.setValues({
                                                ...assignFormik.values,
                                                assignRecruiterId: "",
                                                assignRecruiterName: ""
                                            });
                                        }
                                    }}
                                    fullWidth
                                    sx={{
                                        '.MuiOutlinedInput-root': {
                                            minHeight: '40px',
                                            maxHeight: 'none',
                                            padding: '4px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            flexWrap: 'wrap',
                                        },
                                        '.MuiAutocomplete-tag': {
                                            height: '24px',
                                            fontSize: '12px',
                                            margin: '2px',
                                        },
                                        '.MuiInputBase-root': {
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                        }
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            // label="Select Recruiters"
                                            error={assignFormik.touched.assignRecruiterId && Boolean(assignFormik.errors.assignRecruiterId)}
                                            helperText={assignFormik.touched.assignRecruiterId && assignFormik.errors.assignRecruiterId}
                                            InputProps={{
                                                ...params.InputProps,
                                                sx: {
                                                    minHeight: '40px',
                                                    padding: '4px 8px',
                                                    fontSize: '14px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    flexWrap: 'wrap',
                                                },
                                            }}
                                        />
                                    )}
                                />

                                <ErrorMessage formikObj={assignFormik} name={`assignRecruiterId`} isFormSubmitted={isFormSubmitted} />
                            </Grid>
                            <Grid className='mb-2 mt-2 pl-3' size={6}>

                                {
                                    (assignFormik.values.assignRecruiterId.split(',').length > 1) ?

                                        // <Grid className='mb-2' size={12}>
                                        //     <label>Recruiter Type<span style={{color:"red"}}>*</span></label>
                                        //     <TextField
                                        //         className={`mt-2`}
                                        //         size='small'
                                        //         id={`assignRecruiterType`}
                                        //         value={assignFormik.values.assignRecruiterType}
                                        //         onChange={assignFormik.handleChange}
                                        //         name={`assignRecruiterType`}
                                        //         fullWidth
                                        //         //label='Assign Recruiter Type'
                                        //         type={'number'}
                                        //         select
                                        //     >
                                        //         <MenuItem value="" selected></MenuItem>
                                        //         <MenuItem value="1">Round Robin</MenuItem>
                                        //         <MenuItem value="2">Location Wise</MenuItem>
                                        //     </TextField>
                                        //     <ErrorMessage formikObj={assignFormik} name={`assignRecruiterType`} isFormSubmitted={isFormSubmitted} />
                                        // </Grid>
                                        <Grid className='mb-2' size={12}>
                                            <FormControl>
                                                <FormLabel id={`assignRecruiterType`} className='input-label'>Recruiter Type<span style={{ color: "red" }}>*</span></FormLabel>
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    name={`assignRecruiterType`}
                                                    value={assignFormik.values.assignRecruiterType}
                                                    onChange={assignFormik.handleChange}
                                                >
                                                    <FormControlLabel value="1" control={<Radio />} label="Round Robin" />
                                                    <FormControlLabel value="2" control={<Radio />} label="Location Wise" />

                                                </RadioGroup>
                                                <ErrorMessage formikObj={assignFormik} name={`assignRecruiterType`} isFormSubmitted={isFormSubmitted} />
                                            </FormControl>

                                        </Grid>
                                        :
                                        null
                                }
                            </Grid>
                            <Grid container size={12} spacing={2} className='mb-4'>
                                {
                                    (assignFormik.values.assignRecruiterType === "2") && assignFormik.values.assignRecruiterId && assignFormik.values.statesList.map((item: { recrName: string, recrId: string, states: string }, i: number) => {
                                        return (

                                            <Grid size={6}>
                                                <label className="input-label">Location for <b> {item.recrName} </b></label>
                                                <MUIAutoComplete
                                                    id="state"
                                                    handleChange={(id: any, name: string) => {
                                                        handleStatesChange(i, id);
                                                        // console.log(id);
                                                    }}
                                                    valuePassed={
                                                        Array.isArray((item.states)) ?
                                                            { label: item.states.join(), id: item.states.join() }
                                                            :
                                                            (item.states) ?
                                                                { label: item.states, id: item.states }
                                                                :
                                                                {}
                                                    }
                                                    isMultiple={true}
                                                    // width="200px"
                                                    type='states'
                                                    placeholder=""
                                                />
                                                <ErrorMessage formikObj={assignFormik} name={`statesList`} array={[i + "", 'states']} isFormSubmitted={isFormSubmitted} />

                                            </Grid>
                                        )
                                    })
                                }

                            </Grid>
                            {/* <Grid>
                                        <Typography variant="h5" gutterBottom>
                                            Schedule event details
                                        </Typography>
                                    </Grid> */}
                            {
                                assignFormik.values.schedulingsList.map((schedule: any, index) => (
                                    <Card className='customCard Card1' key={`schedule${index}`}>
                                        <Grid spacing={2}>
                                            <Typography className='AssignJobData' gutterBottom>
                                                Scheduling {index + 1}
                                            </Typography>
                                            < Divider />
                                            <Grid container spacing={2} sx={{ marginTop: "2px" }}>
                                                <Grid size={12}>
                                                    <label className="input-label">Title <span style={{ color: 'red' }}>*</span></label>
                                                    <TextField
                                                        size='small'
                                                        id={`schedulingsList.${index}.title`}
                                                        value={schedule.title}
                                                        onChange={assignFormik.handleChange}
                                                        name={`schedulingsList.${index}.title`}
                                                        fullWidth
                                                    //label='Title'
                                                    />
                                                    <ErrorMessage formikObj={assignFormik} name={`schedulingsList`} array={[index + "", 'title']} isFormSubmitted={isFormSubmitted} />
                                                </Grid>
                                                <Grid size={12}>
                                                    <label className="input-label">Description</label>
                                                    <TextField
                                                        size='small'
                                                        id={`schedulingsList.${index}.description`}
                                                        value={schedule.description}
                                                        onChange={assignFormik.handleChange}
                                                        name={`schedulingsList.${index}.description`}
                                                        fullWidth
                                                        //label='Description'
                                                        className='mb-3'
                                                    />
                                                </Grid>
                                                <Grid size={6}>
                                                    <label className="input-label">Start Date <span style={{ color: 'red' }}>*</span></label>
                                                    <LocalizationProvider dateAdapter={AdapterLuxon}>
                                                        <DemoContainer components={['DateTimePicker']}>
                                                            <DateTimePicker
                                                                // label="Start Date"
                                                                value={
                                                                    (schedule.startDate) ?
                                                                        schedule.startDate
                                                                        :
                                                                        null
                                                                }
                                                                onChange={
                                                                    (newValue) => {
                                                                        assignFormik.setFieldValue(`schedulingsList.${index}.startDate`, newValue)
                                                                    }
                                                                }
                                                                // disableMaskedInput={true}
                                                                // renderInput={(params) => <TextField size='small' {...params} required fullWidth />}
                                                                minDate={DateTime.now()}
                                                                maxDate={(schedule.endDate) ? schedule.endDate : DateTime.now().plus({ years: 10 })}
                                                            />
                                                        </DemoContainer>
                                                    </LocalizationProvider>
                                                    <ErrorMessage formikObj={assignFormik} name={`schedulingsList`} array={[index + "", 'startDate']} isFormSubmitted={isFormSubmitted} />

                                                </Grid>
                                                <Grid size={6}>
                                                    <label className="input-label">End Date <span style={{ color: 'red' }}>*</span></label>
                                                    <LocalizationProvider dateAdapter={AdapterLuxon}>
                                                        <DemoContainer components={['DateTimePicker']}>
                                                            <DateTimePicker
                                                                // label="End Date"
                                                                value={
                                                                    (schedule.endDate) ?
                                                                        schedule.endDate
                                                                        :
                                                                        null
                                                                }
                                                                onChange={
                                                                    (newValue) => {
                                                                        assignFormik.setFieldValue(`schedulingsList.${index}.endDate`, newValue)
                                                                    }
                                                                }
                                                                // disableMaskedInput={true}
                                                                // renderInput={(params) => <TextField size='small' {...params} required fullWidth />}
                                                                // maxDate={(eventRuleFormik.values.endDate) ? eventRuleFormik.values.endDate : DateTime.now().plus({ years: 10 })}
                                                                minDate={(schedule.startDate) ? schedule.startDate : DateTime.now()}

                                                            />
                                                        </DemoContainer>
                                                    </LocalizationProvider>
                                                    <ErrorMessage formikObj={assignFormik} name={`schedulingsList`} array={[index + "", 'endDate']} isFormSubmitted={isFormSubmitted} />
                                                </Grid>
                                                <Grid size={6}>
                                                    <label className="input-label">Location <span style={{ color: 'red' }}>*</span></label>
                                                    <TextField
                                                        size='small'
                                                        id={`schedulingsList.${index}.conferencing`}
                                                        value={schedule.conferencing}
                                                        onChange={assignFormik.handleChange}
                                                        name={`schedulingsList.${index}.conferencing`}
                                                        select
                                                        defaultValue={"-"}
                                                        fullWidth
                                                    // label='Location'
                                                    >
                                                        <MenuItem value="-" selected={true}>
                                                            <Grid
                                                                container
                                                                direction="row"
                                                                justifyContent="flex-start"
                                                                alignItems="center"
                                                            >
                                                                <LocationOnIcon sx={{ color: 'var(--curatelyGreen)' }} />
                                                                <span className='pl-3'>In-person meeting</span>
                                                            </Grid>
                                                        </MenuItem>
                                                        <MenuItem value="ms_teams">
                                                            <Grid
                                                                container
                                                                direction="row"
                                                                justifyContent="flex-start"
                                                                alignItems="center"
                                                            >
                                                                <img src={ConferencingImages.GetImage('teams')} alt="" className="conferencingIcon" />
                                                                <span className='pl-3'>Microsoft Teams</span>
                                                            </Grid>
                                                        </MenuItem>
                                                        <MenuItem value="zoom">
                                                            <Grid
                                                                container
                                                                direction="row"
                                                                justifyContent="flex-start"
                                                                alignItems="center"
                                                            >
                                                                <img src={ConferencingImages.GetImage('zoom')} alt="" className="conferencingIcon" />
                                                                <span className='pl-3'>Zoom</span>
                                                            </Grid>
                                                        </MenuItem>
                                                    </TextField>
                                                    <ErrorMessage formikObj={assignFormik} name={`schedulingsList`} array={[index + "", 'conferencing']} isFormSubmitted={isFormSubmitted} />
                                                </Grid>
                                                <Grid size={6}>
                                                    <label className={`input-label ${(schedule.conferencing === "zoom") ? '' : 'd-none'}`}>Zoom Link <span style={{ color: 'red' }}>*</span></label>
                                                    <TextField
                                                        className={`${(schedule.conferencing === "zoom") ? '' : 'd-none'}`}
                                                        size='small'
                                                        id={`schedulingsList.${index}.zoomLink`}
                                                        value={schedule.zoomLink}
                                                        onChange={assignFormik.handleChange}
                                                        name={`schedulingsList.${index}.zoomLink`}
                                                        fullWidth
                                                        label='Zoom Link'
                                                    />
                                                    <ErrorMessage formikObj={assignFormik} name={`schedulingsList`} array={[index + "", 'zoomLink']} isFormSubmitted={isFormSubmitted} />
                                                </Grid>
                                                <Grid size={6}>
                                                    <label className="input-label">Duration in minutes <span style={{ color: 'red' }}>*</span></label>
                                                    <TextField
                                                        className={``}
                                                        size='small'
                                                        id={`schedulingsList.${index}.duration`}
                                                        value={schedule.duration}
                                                        onChange={assignFormik.handleChange}
                                                        name={`schedulingsList.${index}.duration`}
                                                        fullWidth
                                                        // label='Duration in minutes'
                                                        type={'number'}
                                                        select
                                                    >
                                                        <MenuItem value="" selected></MenuItem>
                                                        <MenuItem value="15">15</MenuItem>
                                                        <MenuItem value="30">30</MenuItem>
                                                        <MenuItem value="45">45</MenuItem>
                                                        <MenuItem value="60">60</MenuItem>
                                                    </TextField>
                                                    <ErrorMessage formikObj={assignFormik} name={`schedulingsList`} array={[index + "", 'duration']} isFormSubmitted={isFormSubmitted} />
                                                </Grid>
                                                <Grid size={6}>
                                                    <label className="input-label">Location Description </label>
                                                    <TextField
                                                        className={``}
                                                        size='small'
                                                        id={`schedulingsList.${index}.locationDescription`}
                                                        value={schedule.locationDescription}
                                                        onChange={assignFormik.handleChange}
                                                        name={`schedulingsList.${index}.locationDescription`}
                                                        fullWidth
                                                    // label='Location Description'
                                                    />
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

            </Grid>
        </form>


    )
})
export default memo(AssignWorkflow);