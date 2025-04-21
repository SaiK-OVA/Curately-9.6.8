import { useEffect, useState } from '../../../../../../../../shared/modules/React';
// import Card from '@mui/material/Card';
import {Dialog, DialogContent, DialogTitle, DialogActions} from '../../../../../../../../shared/modules/MaterialImports/Dialog';
// import CardContent from '@mui/material/CardContent';

import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from "@mui/icons-material/LocationOn";

import './AddCalendarEvent.scss';
import {Divider} from '../../../../../../../../shared/modules/MaterialImports/Divider';
import { Button, showToaster, TextField, Grid } from '../../../../../../../../shared/modules/commonImports';

import { useFormik, Yup } from '../../../../../../../../shared/modules/Formik';
import {MenuItem} from '../../../../../../../../shared/modules/MaterialImports/Menu';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import ListItemButton from '@mui/material/ListItemButton';
import { LocalizationProvider, AdapterLuxon  } from '../../../../../../../../shared/modules/MaterialImports/DatePicker';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DateTime } from '../../../../../../../../shared/modules/Luxon';
import ApiService from '../../../../../../../../shared/api/api';
// import { trackPromise } from 'react-promise-tracker';

import { FocusError } from 'focus-formik-error';
import ErrorMessage from '../../../../../../../shared/Error/ErrorMessage';
import { userLocalData } from '../../../../../../../../shared/services/userData';
import { ConferencingImages } from '../../../../../../../../shared/images/ConferencingImages';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';



const AddCalendarEvent = (
    { calendarData,
        //  onClose, 
         open, closePopup, itemSaved, eventData }: {
        calendarData: any;
        open: boolean;
        onClose: (value: any) => void;
        closePopup: () => void;
        itemSaved: (eventId: string, addOrUpdate: string, calendarId: string, cronofyId: string) => void;
        eventData?: any;
    }
) => {

    // console.log(eventData);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const cronofyId = (eventData.cronofyId) ? eventData.cronofyId : "";

    const eventRuleSchema = Yup.object().shape({
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
        calendarId: Yup.string().required('Calendar is required'),
        duration: Yup.number().required('Duration is required').min(15, "Minimum Duration should be 15 Minutes")
    });
    const eventInitialValues = {
        title: eventData.summary,
        description: eventData.description,
        startDate: (eventData.start_date) ? DateTime.fromFormat(eventData.start_date.replace('T', ' '), 'yyyy-MM-dd hh:mm:ss') : DateTime.now().set({ hour: 9, minute: 30 }).plus({ day: 1 }), // start_date
        endDate: (eventData.end_date) ? DateTime.fromFormat(eventData.end_date.replace('T', ' '), 'yyyy-MM-dd hh:mm:ss') : DateTime.now().plus({ days: 7 }).set({ hour: 17, minute: 30 }).plus({ day: 1 }), // end_date
        locationDescription: eventData.location,
        conferencing: eventData.providerid,
        zoomLink: eventData.join_url,
        calendarId: eventData.calendarId,
        duration: eventData.duration,
    }
    const eventRuleFormik = useFormik({
        initialValues: eventInitialValues,
        // enableReinitialize: true,
        validationSchema: eventRuleSchema,
        onSubmit: (
            // values
        ) => {
            // console.log(values);
            saveEventRule();
        },
    });


    const saveEventRule = () => {
        setIsFormSubmitted(true);
        console.log(eventRuleFormik.values);
        // eventRuleFormik.values.startDate.toISO().substring(19,0) + "Z"
        // 2023-03-24T04:19:00
        // 2023-03-24T18:05:00Z
        if (eventRuleFormik.isValid) {
            if (eventRuleFormik.values.conferencing === "zoom" && !eventRuleFormik.values.zoomLink) {
                showToaster('Enter Zoom Link', 'error');
            }
            else {
                let tempData = {
                    summary: eventRuleFormik.values.title,
                    description: eventRuleFormik.values.description,
                    location: eventRuleFormik.values.locationDescription,
                    start_date: eventRuleFormik.values.startDate?.toISO()?.substring(19, 0),
                    end_date: eventRuleFormik.values.endDate?.toISO()?.substring(19, 0),
                    duration: eventRuleFormik.values.duration,
                    providerid: eventRuleFormik.values.conferencing,
                    join_url: (eventRuleFormik.values.conferencing === "zoom") ? eventRuleFormik.values.zoomLink : "",
                    calendarId: eventRuleFormik.values.calendarId,
                    action: "add",
                    username: userLocalData.getvalue('userName'),
                    recrId: userLocalData.getvalue('recrId'),
                    cronofyId: "",
                    clientId: userLocalData.getvalue('clientId')
                };
                if (cronofyId) {
                    tempData.action = "update";
                    tempData.cronofyId = cronofyId;
                }
                ApiService.postWithParams(193, 'Curately/Workflow/workflow_cronofy_action.jsp', tempData).then((response: any) => {
                    // console.log(response.data);
                    if (response.data.message === "Success" && (eventData.eventId || response.data.eventId)) {
                        showToaster(`Event ${(cronofyId) ? "updated" : "saved"} Successfully.`, 'success');
                        itemSaved((cronofyId) ? eventData.eventId : response.data.eventId, (cronofyId) ? "update" : "add", eventRuleFormik.values.calendarId, response.data.cronofyId);
                    } else {
                        showToaster(response.data.message, 'error');

                    }
                });
            }
        }
    }

    useEffect(() => {

    }, [])


    const handleClose = () => {
    };

    // const handleListItemClick = (stage: any) => {
    //     onClose(stage);
    // };

    return (
        <Dialog
            maxWidth={'xl'}
            // sx={{ width: 900, maxWidth: 900, minWidth: 900 }}
            fullWidth={false}
            onClose={handleClose} open={open} className='AddCalendarEvent'>
            <form
                onSubmit={eventRuleFormik.handleSubmit}
            >

                <FocusError formik={eventRuleFormik} />
                {/* <Formik
                onSubmit={saveEventRule}
                initialValues={eventRuleFormik.initialValues}
            >
                {
                    ({ errors, values, touched, setFieldValue, handleChange }) => (
                        <Form> */}
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
                            {cronofyId ? "Edit" : "Add"} Event
                        </span>
                        <span onClick={() => closePopup()} className="closePopup">
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
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <TextField
                                size='small'
                                id={`title`}
                                value={eventRuleFormik.values.title}
                                onChange={eventRuleFormik.handleChange}
                                name={`title`}
                                fullWidth
                                label='Title'
                            />
                            <ErrorMessage formikObj={eventRuleFormik} name={`title`} isFormSubmitted={isFormSubmitted} />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                size='small'
                                id={`description`}
                                value={eventRuleFormik.values.description}
                                onChange={eventRuleFormik.handleChange}
                                name={`description`}
                                fullWidth
                                label='Description'
                                className='mb-3'
                            />
                        </Grid>
                        <Grid size={6}>
                            <LocalizationProvider dateAdapter={AdapterLuxon}>
                                <DemoContainer components={['DateTimePicker']}>
                                    <DateTimePicker
                                        label="Start Date"
                                        value={
                                            (eventRuleFormik.values.startDate) ?
                                                eventRuleFormik.values.startDate
                                                :
                                                null
                                        }
                                        onChange={
                                            (newValue) => {
                                                eventRuleFormik.setFieldValue('startDate', newValue)
                                            }
                                        }
                                        // disableMaskedInput={true}
                                        // renderInput={(params) => <TextField size='small' {...params} required fullWidth />}
                                        minDate={DateTime.now()}
                                        maxDate={(eventRuleFormik.values.endDate) ? eventRuleFormik.values.endDate : DateTime.now().plus({ years: 10 })}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                            <ErrorMessage formikObj={eventRuleFormik} name={`startDate`} isFormSubmitted={isFormSubmitted} />

                        </Grid>
                        <Grid size={6}>
                            {/* <TextField
                                            size='small'
                                            id={`endDate`}
                                            value={eventRuleFormik.values.endDate}
                                            onChange={eventRuleFormik.handleChange}
                                            name={`endDate`}
                                            fullWidth
                                            label='End Date'
                                            type={'date'}
                                        /> */}

                            <LocalizationProvider dateAdapter={AdapterLuxon}>
                                <DemoContainer components={['DateTimePicker']}>
                                    <DateTimePicker
                                        label="End Date"
                                        value={
                                            (eventRuleFormik.values.endDate) ?
                                                eventRuleFormik.values.endDate
                                                :
                                                null
                                        }
                                        onChange={
                                            (newValue) => {
                                                eventRuleFormik.setFieldValue('endDate', newValue)
                                            }
                                        }
                                        // disableMaskedInput={true}
                                        // renderInput={(params) => <TextField size='small' {...params} required fullWidth />}
                                        minDate={(eventRuleFormik.values.startDate) ? eventRuleFormik.values.startDate : DateTime.now()}
                                    // maxDate={(eventRuleFormik.values.endDate) ? eventRuleFormik.values.endDate : DateTime.now().plus({ years: 10 })}

                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                            <ErrorMessage formikObj={eventRuleFormik} name={`endDate`} isFormSubmitted={isFormSubmitted} />
                        </Grid>
                        <Grid size={6}>
                            <TextField
                                size='small'
                                id={`conferencing`}
                                select
                                value={eventRuleFormik.values.conferencing}
                                onChange={eventRuleFormik.handleChange}
                                name={`conferencing`}
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
                                    {/* <ListItemButton sx={{ padding: 0 }}>
                                        <ListItemIcon sx={{ minWidth: 30 }}>
                                            <img src={ConferencingImages.GetImage('teams')} alt="" className="conferencingIcon" />
                                        </ListItemIcon>
                                        <ListItemText primary="Microsoft Teams" />
                                    </ListItemButton> */}
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
                                    {/* <ListItemButton sx={{ padding: 0 }}>
                                        <ListItemIcon sx={{ minWidth: 30 }}>
                                            <img src={ConferencingImages.GetImage('zoom')} alt="" className="conferencingIcon" />
                                        </ListItemIcon>
                                        <ListItemText primary="Zoom" />
                                    </ListItemButton> */}
                                </MenuItem>
                            </TextField>
                            <ErrorMessage formikObj={eventRuleFormik} name={`conferencing`} isFormSubmitted={isFormSubmitted} />
                        </Grid>
                        <Grid size={6}>
                            <TextField
                                className={`${(eventRuleFormik.values.conferencing === "zoom") ? '' : 'd-none'}`}
                                size='small'
                                id={`zoomLink`}
                                value={eventRuleFormik.values.zoomLink}
                                onChange={eventRuleFormik.handleChange}
                                name={`zoomLink`}
                                fullWidth
                                label='Zoom Link'
                            />
                            <ErrorMessage formikObj={eventRuleFormik} name={`zoomLink`} isFormSubmitted={isFormSubmitted} />
                        </Grid>
                        <Grid size={6}>
                            <TextField
                                className={``}
                                size='small'
                                id={`duration`}
                                value={eventRuleFormik.values.duration}
                                onChange={eventRuleFormik.handleChange}
                                name={`duration`}
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
                            <ErrorMessage formikObj={eventRuleFormik} name={`duration`} isFormSubmitted={isFormSubmitted} />
                        </Grid>
                        <Grid size={6}>
                            <TextField
                                className={``}
                                size='small'
                                id={`locationDescription`}
                                value={eventRuleFormik.values.locationDescription}
                                onChange={eventRuleFormik.handleChange}
                                name={`locationDescription`}
                                fullWidth
                                label='Location Description'
                            />
                        </Grid>


                        <Grid size={6}>
                            <TextField
                                size='small'
                                id={`calendarId`}
                                select
                                value={eventRuleFormik.values.calendarId}
                                onChange={eventRuleFormik.handleChange}
                                name={`calendarId`}
                                defaultValue={""}
                                fullWidth
                                label='Calendar List'
                            >
                                <MenuItem value="" selected></MenuItem>
                                {/* {
                                    "calendar_attachments_available": true,
                                    "calendar_deleted": false,
                                    "calendar_id": "cal_ZAtbnw3aJgEtNpZc_bZ5WOHzGJTICQv9zxPSjoQ",
                                    "calendar_integrated_conferencing_available": false,
                                    "calendar_name": "United States holidays",
                                    "calendar_primary": false,
                                    "calendar_readonly": true,
                                    "permission_level": "sandbox"
                                } */}
                                {
                                    calendarData.map((d: {
                                        "calendar_attachments_available": boolean;
                                        "calendar_deleted": boolean;
                                        "calendar_id": string;
                                        "calendar_integrated_conferencing_available": boolean;
                                        "calendar_name": string;
                                        "calendar_primary": boolean;
                                        "calendar_readonly": boolean;
                                        "permission_level": string;
                                    }) => {
                                        return (
                                            <MenuItem value={d.calendar_id} key={d.calendar_id}>{d.calendar_name}</MenuItem>
                                        )
                                    })
                                }
                            </TextField>
                            <ErrorMessage formikObj={eventRuleFormik} name={`calendarId`} isFormSubmitted={isFormSubmitted} />
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                    >
                    </Grid>
                </DialogContent>
                <Divider />
                <DialogActions>
                    <Button
                        variant='contained'
                        startIcon={<SaveIcon />}
                        // onClick={saveNewHireForm}
                        size={'small'}
                        type='submit'
                    >
                        Next
                        {/* {cronofyId ? "Update" : "Save"} */}
                    </Button>
                </DialogActions>
            </form>
            {/* </Form >
                    )
                }
            </Formik> */}
        </Dialog>
    );
}
export default AddCalendarEvent;