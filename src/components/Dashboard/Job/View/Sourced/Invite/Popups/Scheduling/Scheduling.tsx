// import Typography from '@mui/material/Typography';
// import Card from '@mui/material/Card';

import {Stack} from './../../../../../../../../shared/modules/MaterialImports/Stack';

import { MenuItem } from './../../../../../../../../shared/modules/MaterialImports/Menu';
import { Button } from './../../../../../../../../shared/modules/MaterialImports/Button';
import { Grid } from './../../../../../../../../shared/modules/MaterialImports/Grid';
import { Typography } from './../../../../../../../../shared/modules/MaterialImports/Typography';
import { TextField } from './../../../../../../../../shared/modules/MaterialImports/FormInputs';
import { useFormik, Yup } from './../../../../../../../../shared/modules/Formik';

import LocationOnIcon from "@mui/icons-material/LocationOn";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DateTime } from './../../../../../../../../shared/modules/Luxon';
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { trackPromise } from 'react-promise-tracker';

// import { FocusError } from 'focus-formik-error';

import { useEffect, useRef, useState } from './../../../../../../../../shared/modules/React';

import { useParams } from 'react-router-dom';
import { trackPromise } from './../../../../../../../../shared/modules/PromiseTrackter';
// import Box from '@mui/material/Box';
// import Divider from '@mui/material/Divider';
// import { Label } from '@mui/icons-material';
// import { CardContent } from '@mui/material';

// import './Scheduling.scss';
import { userLocalData } from '../../../../../../../../shared/services/userData';
import ApiService from '../../../../../../../../shared/api/api';
import { showToaster } from '../../../../../../../shared/SnackBar/SnackBar';
import { MUIAutoComplete } from '../../../../../../../shared/MUIAutoComplete/MUIAutoComplete';
import ErrorMessage from '../../../../../../../shared/Error/ErrorMessage';
import { ConferencingImages } from '../../../../../../../../shared/images/ConferencingImages';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';



const Scheduling = ({
    updated, passedSchedulingData, selectedRows, inviteToAssignCB, inviteToLinks, closePopup
}: {
    passedSchedulingData: {
        summary: string;
        end_date: string;
        eventId: string;
        join_url: string;
        description: string;
        duration: string;
        accountId: string;
        calendarId: string;
        providerid: string;
        location: string;
        recrId: string;
        created_date: string;
        cronofyId: string;
        start_date: string;
    }; selectedRows: any;
    inviteToLinks: string[];
    inviteToAssignCB: { (inviteTypeId: number, userId?: string): void };
    updated: { (title: string): void };
    closePopup: () => void;
}) => {

    const jobIdRef = useRef("");
    const { jobId } = useParams();
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);


    const [isFormSaved, setIsFormSaved] = useState(false);
    const [isEditClicked, setIsEditClicked] = useState(false);

    useEffect(() => {
        if (passedSchedulingData?.summary) {
            setIsFormSaved(true);
        }
    }, [passedSchedulingData]);


    const initialValues: {
        assignRecruiterId: string;
        assignRecruiterName: string;
        schedulingsList: {
            title: string;
            description: string;
            conferencing: string;
            zoomLink: string;
            duration: string;
            locationDescription: string;
            // stageId: string;
            // stageNumber: string;
            startDate: DateTime;
            endDate: DateTime;
        }[]
    } = {
        assignRecruiterId: "",
        assignRecruiterName: "",
        schedulingsList: [{
            title: passedSchedulingData.summary ? passedSchedulingData.summary : "",
            description: passedSchedulingData.description ? passedSchedulingData.description : "",
            startDate: (passedSchedulingData.start_date &&
                DateTime.fromFormat(passedSchedulingData.start_date.substring(0, 20).replace('T', ' '), 'yyyy-MM-dd hh:mm:ss') > DateTime.now()) ?
                DateTime.fromFormat(passedSchedulingData.start_date.substring(0, 20).replace('T', ' '), 'yyyy-MM-dd hh:mm:ss') :
                DateTime.now().set({ hour: 9, minute: 30 }).plus({ day: 1 }),
            endDate: (passedSchedulingData.end_date &&
                DateTime.fromFormat(passedSchedulingData.end_date.substring(0, 20).replace('T', ' '), 'yyyy-MM-dd hh:mm:ss') > DateTime.now().plus({ day: 6 })) ?
                DateTime.fromFormat(passedSchedulingData.end_date.substring(0, 20).replace('T', ' '), 'yyyy-MM-dd hh:mm:ss') :
                DateTime.now().set({ hour: 17, minute: 30 }).plus({ day: 7 }),
            locationDescription: passedSchedulingData.location ? passedSchedulingData.location : "",
            conferencing: passedSchedulingData.providerid ? passedSchedulingData.providerid : "",
            zoomLink: passedSchedulingData.join_url ? passedSchedulingData.join_url : "",
            duration: passedSchedulingData.duration ? passedSchedulingData.duration : "",
            // stageId: "",
            // stageNumber: ""
        }],
    }

    const assignWorkflowSchema = Yup.object().shape({
        assignRecruiterId: Yup.string(),
        // .required('Recruiter is required'),
        assignRecruiterName: Yup.string(),
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
                    then: (f:any) => f.required('Zoom Link is required')
                }),
                duration: Yup.number().required('Duration is required').min(15, "Minimum Duration should be 15 Minutes"),
                // stageId: Yup.string(),
                // stageNumber: Yup.string(),
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




    const loadEventIds = (callCandidateAssign: boolean) => {
        let eventIdsToPass: string[] = [];
        // let recrIds = assignFormik.values.assignRecruiterId.split(',');
        let recrIds = [userLocalData.getvalue('recrId')];
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
                                    let tempScheduleList = [...assignFormik.values.schedulingsList];
                                    for (let ssl = 0; ssl < tempScheduleList.length; ssl++) {
                                        if (tokensObj.current.accountId && tempCalendarId) {
                                            let tempData = {
                                                summary: tempScheduleList[ssl].title,
                                                description: tempScheduleList[ssl].description,
                                                location: tempScheduleList[ssl].locationDescription,
                                                start_date: tempScheduleList[ssl].startDate?.toISO()?.substring(19, 0),
                                                end_date: tempScheduleList[ssl].endDate?.toISO()?.substring(19, 0),
                                                duration: tempScheduleList[ssl].duration,
                                                providerid: tempScheduleList[ssl].conferencing,
                                                join_url: (tempScheduleList[ssl].conferencing === "zoom") ? tempScheduleList[ssl].zoomLink : "",
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
                                                    eventIdsToPass.push(addEventResponse.data.eventId + '::' + recrIds[ri] + '::' + jobId);

                                                    if (addEventResponse.data.eventId) {
                                                        tempData.cronofyId = addEventResponse.data.eventId;
                                                        let data: any = {
                                                            url: "https://api.cronofy.com/v1/availability_rules",
                                                            json: JSON.stringify({
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
                                                            }),
                                                            token: tokensObj.current.accessToken
                                                        }
                                                        trackPromise(
                                                            ApiService.postWithParams(193, 'Curately/Workflow/workflow_cronofy_postman_post.jsp', data).then((wresponse: any) => {
                                                                // console.log(finalResponse.data);
                                                                // if ((ri == recrIds.length - 1) && (ssl == tempScheduleList.length - 1)) {
                                                                // callWorkflowAssignAPI(eventIdsToPass);
                                                                // }
                                                                saveDataForm(eventIdsToPass);
                                                                if (callCandidateAssign) {
                                                                    assignSchedulingToCandidate();
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


    const saveDataForm = (eventIds: string[]) => {
        let saveCronofyData = {
            jobId: jobId,
            recrId: userLocalData.getvalue('recrId'),
            eventIds: eventIds.join(),
            clientId: userLocalData.getvalue('clientId')
        }

        trackPromise(
            ApiService.postWithParams(193, 'Curately/Invite/invite_job_cronofy_save.jsp', saveCronofyData).then((finalResponse: any) => {
                console.log(finalResponse.data);
                // if ((ri == recrIds.length - 1) && (ssl == tempScheduleList.length - 1)) {
                // }
            })
        );
    }
    // http://52.41.18.83:41088/Accuick_API/Curately/Invite/invite_user_cronofy_save.jsp

    const inviteCandidate = (candId: string[]) => {


        let saveCandidateData = {
            jobId: jobId,
            recrId: userLocalData.getvalue('recrId'),
            clientId: userLocalData.getvalue('clientId')
        }

        trackPromise(
            ApiService.postWithParams(193, 'Curately/Invite/invite_user_cronofy_save.jsp', saveCandidateData).then((finalResponse: any) => {
                console.log(finalResponse.data);
                // if ((ri == recrIds.length - 1) && (ssl == tempScheduleList.length - 1)) {
                // }
            })
        );
    }

    const assignSchedulingToCandidate = () => {
        let userIds = Object.keys(selectedRows)
        if (!!userIds?.length && userIds.length > 1) {
            userIds.forEach((userId) => {
                inviteToAssignCB(2, userId);
            })
        } else {
            inviteToAssignCB(2);
            updated("1");
        }
    }


    return (

        <div>
            {
                (isFormSaved && !isEditClicked) ?
                    <Stack direction={"row"} alignItems={"flex-start"} justifyContent={"space-between"}>
                        <Stack>
                            <Typography variant='h6' className='data-collection-form-name'>Title: <Typography variant='caption'>{passedSchedulingData.summary}</Typography></Typography>
                            <Typography variant='h6' className='data-collection-form-name'>Description: <Typography variant='caption'>{passedSchedulingData.description}</Typography></Typography>
                            <Typography variant='h6' className='data-collection-form-name'>Start Date: <Typography variant='caption'>{passedSchedulingData.start_date ? DateTime.fromFormat(passedSchedulingData.start_date.substring(0, 20).replace('T', ' '), 'yyyy-MM-dd hh:mm:ss').toFormat('MM/dd/yyyy hh:mm a') : ""}</Typography></Typography>
                            <Typography variant='h6' className='data-collection-form-name'>End Date: <Typography variant='caption'>{passedSchedulingData.end_date ? DateTime.fromFormat(passedSchedulingData.end_date.substring(0, 20).replace('T', ' '), 'yyyy-MM-dd hh:mm:ss').toFormat('MM/dd/yyyy hh:mm a') : ""}</Typography></Typography>
                            <Typography variant='h6' className='data-collection-form-name'>Duration in Minutes: <Typography variant='caption'>{passedSchedulingData.duration}</Typography></Typography>
                            <Typography variant='h6' className='data-collection-form-name'>Location Description: <Typography variant='caption'>{passedSchedulingData.location}</Typography></Typography>
                        </Stack>
                        {passedSchedulingData?.summary && <EditOutlinedIcon onClick={() => setIsEditClicked(true)} />}
                    </Stack>
                    :
                    <form
                        onSubmit={assignFormik.handleSubmit}
                        id='Scheduling'
                    >
                        <Grid className='mb-2 mt-2 d-none' size={6}>
                            <label className="input-label">Assign Recruiter</label>
                            <MUIAutoComplete
                                id='recruiter'
                                handleChange={(id: any, name: string) => {
                                    assignFormik.setValues({
                                        ...assignFormik.values,
                                        assignRecruiterName: name,
                                        assignRecruiterId: id
                                    })
                                }}
                                valuePassed={(assignFormik.values.assignRecruiterId) ? { label: assignFormik.values.assignRecruiterName, id: assignFormik.values.assignRecruiterId } : {}}
                                isMultiple={true}
                                width="100%"
                                type='id'
                                placeholder=""
                            />
                            <ErrorMessage formikObj={assignFormik} name={`assignRecruiterId`} isFormSubmitted={isFormSubmitted} />
                        </Grid>
                        {
                            assignFormik.values.schedulingsList.map((schedule: any, index) => (
                                <Grid spacing={2} key={`schedule${index}`}>
                                    <Grid container spacing={2} sx={{ marginTop: "2px" }}>
                                        <Grid size={12}>
                                            <label className="input-label">Title</label>
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
                                            <LocalizationProvider dateAdapter={AdapterLuxon}>
                                                <DemoContainer components={['DateTimePicker']}>
                                                    <DateTimePicker
                                                        label="Start Date"
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
                                            <LocalizationProvider dateAdapter={AdapterLuxon}>
                                                <DemoContainer components={['DateTimePicker']}>
                                                    <DateTimePicker
                                                        label="End Date"
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
                                            <TextField
                                                size='small'
                                                id={`schedulingsList.${index}.conferencing`}
                                                value={schedule.conferencing}
                                                onChange={assignFormik.handleChange}
                                                name={`schedulingsList.${index}.conferencing`}
                                                select
                                                defaultValue={"-"}
                                                fullWidth
                                                label='Location'
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
                                            <TextField
                                                className={``}
                                                size='small'
                                                id={`schedulingsList.${index}.duration`}
                                                value={schedule.duration}
                                                onChange={assignFormik.handleChange}
                                                name={`schedulingsList.${index}.duration`}
                                                fullWidth
                                                label='Duration in minutes'
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
                                            <TextField
                                                className={``}
                                                size='small'
                                                id={`schedulingsList.${index}.locationDescription`}
                                                value={schedule.locationDescription}
                                                onChange={assignFormik.handleChange}
                                                name={`schedulingsList.${index}.locationDescription`}
                                                fullWidth
                                                label='Location Description'
                                            />
                                        </Grid>


                                    </Grid>

                                </Grid>
                            ))
                        }

                    </form>
            }

            <Stack direction={"row"} justifyContent={"flex-end"} alignItems={"center"} spacing={1} my={1} mr={1}>
                {!isFormSaved && <Button variant='contained' disableElevation onClick={() => loadEventIds(false)}>Save</Button>}
                {(isFormSaved && selectedRows && !!Object.values(selectedRows)?.length && (!inviteToLinks?.length)) && <Button variant='contained' onClick={assignSchedulingToCandidate} disableElevation>Assign</Button>}
                {(!isFormSaved && selectedRows && !!Object.values(selectedRows)?.length) && <Button variant='contained' disableElevation onClick={() => loadEventIds(true)}>Save & Assign</Button>}
                {(isEditClicked && <Button variant='contained' disableElevation onClick={() => loadEventIds(false)}>Update</Button>)}
            </Stack>
        </div>


    )
}
export default Scheduling;