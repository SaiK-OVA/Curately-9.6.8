// import { useState, Fragment, useEffect } from "react";
import { useState, Fragment } from "../../../../../../../../shared/modules/React";
import { Dialog, DialogTitle, DialogContent, DialogActions } from '../../../../../../../../shared/modules/MaterialImports/Dialog';
import { IconButton, Button, Grid } from '../../../../../../../../shared/modules/commonImports';
import CloseIcon from '@mui/icons-material/Close';
import { FormControl, TextField, FormControlLabel } from "../../../../../../../../shared/modules/MaterialImports/FormInputs";
import { Radio, RadioGroup, Checkbox } from '../../../../../../../../shared/modules/MaterialImports/FormElements';
import { MUIAutoComplete } from "../../../../../../../shared/MUIAutoComplete/MUIAutoComplete";
import { DatePicker, AdapterLuxon, LocalizationProvider } from '../../../../../../../../shared/modules/MaterialImports/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { DateTime } from "../../../../../../../../shared/modules/Luxon";
import { Stack } from "../../../../../../../../shared/modules/MaterialImports/Stack";
import { MenuItem } from "../../../../../../../../shared/modules/MaterialImports/Menu";
import { userLocalData } from "../../../../../../../../shared/services/userData";
// import { Formik, useFormik } from 'formik';
import { useFormik,  Yup } from '../../../../../../../../shared/modules/Formik';
import './InterviewsDialog.scss';
import { showToaster } from "../../../../../../../shared/SnackBar/SnackBar";
import ApiService from '../../../../../../../../shared/api/api';

export interface interviewDialogProps {
    dialogOpen: boolean,
    handleDialogClose: any,
    nextAction: string,
    recruiter: any,
    candidateId: string,
    jobId: string,
    currStatus: string
}

const InterviewsDialog = ({
    dialogOpen,
    handleDialogClose,
    nextAction,
    recruiter,
    candidateId,
    jobId,
    currStatus
}: interviewDialogProps) => {
    const [actionDate, setActionDate] = useState("");
    const [actionTime, setActionTime] = useState("");

    const initialValues = {
        assignedTo: '',
        otherUser: '',
        date: '',
        time: '',
        candname: '',
        jobtitle: '',
        hiringmanger1: '',
        additionalhm1: '',
        round: '',
        type: '',
        phone: '',
        whowillcall: '',
        intdate: '',
        starttime: '',
        endtime: '',
        timezone: '',
        status: '',
        comments: ''
    }

    const dialogueSchema = Yup.object({
        assignedTo: Yup.string(),
        otherUser: Yup.string(),
        date: Yup.string(),
        time: Yup.string(),
        candname: Yup.string(),
        jobtitle: Yup.string(),
        hiringmanger1: Yup.string(),
        additionalhm1: Yup.string(),
        round: Yup.string(),
        type: Yup.string(),
        phone: Yup.string(),
        whowillcall: Yup.string(),
        intdate: Yup.string(),
        starttime: Yup.string(),
        endtime: Yup.string(),
        timezone: Yup.string(),
        status: Yup.string(),
        comments: Yup.string()
    })

    const formik = useFormik({
        initialValues,
        validationSchema: dialogueSchema,
        onSubmit: () => {
            onDialogSave();
        },

    });

    const onDialogSave = () => {
        let doneby = '';
        let dateToPass = '';

        if (formik.values.assignedTo !== "") {
            if (formik.values.assignedTo === 'other') {
                if (formik.values.otherUser === '') {
                    showToaster("Please fill the madetory fields1", "error");
                    return false
                } else doneby = formik.values.otherUser
            } else doneby = formik.values.assignedTo
        } else {
            showToaster("Please fill the madetory fields2", "error");
            return false
        }

        if (formik.values.date === '' && formik.values.time === '') {
            showToaster("Please fill the madetory fields3", "error");
            return false
        } else dateToPass = `${formik.values.date} ${formik.values.time}`;

        const data = {
            userid: userLocalData.getvalue("recrId"),
            jobid: jobId,
            candid: candidateId,
            candname: formik.values.candname,
            jobtitle: formik.values.jobtitle,
            hiringmanger: formik.values.hiringmanger1,
            additionalhm: formik.values.additionalhm1,
            status: formik.values.status,
            type: formik.values.type,
            round: formik.values.round,
            intdate: formik.values.intdate,
            intstarttime: formik.values.starttime,
            intendtime: formik.values.endtime,
            timezone: formik.values.timezone,
            videolink: "",
            address: "",
            whowillcall: formik.values.whowillcall,
            phone: formik.values.phone,
            comments: formik.values.comments,
            action: 'ADD',
            intid: ''
        }

        ApiService.getByParams(193, 'Candidate/Shortlist/interview_save.jsp', data).then(
            (response: any) => {
                // console.log(response);
                if (response.data.success === true) {
                    updateStatus(doneby, dateToPass);
                    // showToaster(response.data.message, 'success');
                } else {
                    showToaster(response.data.message, 'error');
                }
            })
    }

    const updateStatus = (doneby: string, dateToPass: string) => {
        const apiData = {
            'JobId': jobId,
            'Username': userLocalData.getvalue("userName"),
            'doneBy': userLocalData.getvalue("recrId"),
            'Status': nextAction,
            'CandId': candidateId,
            'prevStatus': currStatus,
            'EmpId': doneby,
            'statusDate': dateToPass,
        }

        ApiService.getByParams(193, 'Curately/Candidate/shortlistSave.jsp', apiData).then(
            (response: any) => {
                // console.log(response)
                if (response.data.success === true) {
                    showToaster(response.data.message, 'success');
                    handleDialogClose();
                } else {
                    showToaster(response.data.message, 'error');
                }
            })
    }

    const getCurrentDateTime = (checked: boolean) => {
        if (checked) {
            setActionDate(DateTime.now().toFormat('yyyy-MM-dd'));
            setActionTime(`${DateTime.now().toFormat('yyyy-MM-dd')}T${DateTime.now().toLocaleString(DateTime.TIME_24_SIMPLE)}`);
            formik.setFieldValue("date", DateTime.now().toFormat('yyyy-MM-dd'));
            formik.setFieldValue("time", DateTime.now().toLocaleString(DateTime.TIME_24_SIMPLE));
        } else {
            setActionDate("");
            setActionTime("");
        }
    }

    return (
        <Dialog
            maxWidth={'md'}
            fullWidth={true} open={dialogOpen} className='AddJobModal'
            id='interviewsDialogBox'
        >
            <DialogTitle className="header">
                <span>Candidate Interview Module</span>

                <IconButton
                    aria-label="close"
                    onClick={handleDialogClose}
                    className="closeBtn"
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <div className="actionCard">
                    <Stack direction="row" spacing={2} justifyContent="space-between">
                        <div>

                            <FormControl>
                                <label className="input-label">Taking action on behalf of <span style={{ color: 'red' }}>*</span></label>
                                <RadioGroup
                                    row
                                    name="assignedTo"
                                    value={formik.values.assignedTo}
                                    onChange={formik.handleChange}
                                >
                                    <FormControlLabel value={userLocalData.getvalue("recrId")} control={<Radio />} label="You" />
                                    <FormControlLabel value={recruiter.id} control={<Radio />} label="Mastan Vali" />
                                    <FormControlLabel value="other" control={<Radio />} label="Other User" />
                                </RadioGroup>
                            </FormControl>

                            {formik.values.assignedTo === "other" && <div className="userInput">
                                <MUIAutoComplete
                                    id='user'
                                    handleChange={(id: any, name: string) => {
                                        formik.setFieldValue('otherUser', id)
                                    }}
                                    valuePassed={{}}
                                    isMultiple={false}
                                    width="100%"
                                    type='id'
                                    placeholder={
                                        <Fragment>
                                            user
                                            <span style={{ color: 'red' }}>*</span>
                                        </Fragment>
                                    }
                                />
                            </div>}
                        </div>
                        <div>
                            <Stack direction="row" spacing={2} mt={2}>
                                <LocalizationProvider dateAdapter={AdapterLuxon}>
                                    <DatePicker
                                        label={
                                            <Fragment>
                                                Date
                                                <span style={{ color: 'red' }}>*</span>
                                            </Fragment>
                                        }
                                        slotProps={{ textField: { size: 'small' } }}
                                        value={actionDate ? DateTime.fromISO(actionDate) : null}
                                        onChange={(e) => formik.setFieldValue("date", e?.toFormat('MM-dd-yyyy'))}
                                    />
                                </LocalizationProvider>
                                <LocalizationProvider dateAdapter={AdapterLuxon}>
                                    <TimePicker
                                        label={
                                            <Fragment>
                                                Time
                                                <span style={{ color: 'red' }}>*</span>
                                            </Fragment>
                                        }
                                        slotProps={{ textField: { size: 'small' } }}
                                        value={actionTime ? DateTime.fromISO(actionTime) : null}
                                        viewRenderers={{
                                            hours: renderTimeViewClock,
                                            minutes: renderTimeViewClock,
                                            seconds: renderTimeViewClock,
                                        }}
                                        onChange={(e) => formik.setFieldValue("time", e?.toLocaleString(DateTime.TIME_24_SIMPLE))}
                                    />
                                </LocalizationProvider>
                            </Stack>
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Current Date/Time"
                                labelPlacement="end"
                                id="currentDateTime"
                                name="currentDateTime"
                                className="mt-3"
                                onChange={(e: any) => getCurrentDateTime(e.target.checked)}
                            />
                        </div>
                    </Stack>
                </div>

                <div className="callOutcome mt-4">
                    <Grid container spacing={2}>
                        <Grid size={4}>
                            <FormControl fullWidth>
                                <label className="input-label mb-2">Candidate Name:</label>
                                <TextField
                                    fullWidth
                                    id="candname"
                                    name="candname"
                                    size="small"
                                    variant="outlined"
                                    value={formik.values.candname}
                                    onChange={formik.handleChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid size={8}>
                            <FormControl fullWidth>
                                <label className="input-label mb-2">JobID / Job title:</label>
                                <TextField
                                    fullWidth
                                    id="jobtitle"
                                    name="jobtitle"
                                    size="small"
                                    variant="outlined"
                                    value={formik.values.jobtitle}
                                    onChange={formik.handleChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid size={4}>
                            <FormControl fullWidth>
                                <label className="input-label mb-2">Hiring Manager / Interviewer:</label>
                                <TextField
                                    fullWidth
                                    id="hiringmanger1"
                                    name="hiringmanger1"
                                    size="small"
                                    variant="outlined"
                                    value={formik.values.hiringmanger1}
                                    onChange={formik.handleChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid size={4}>
                            <FormControl fullWidth>
                                <label className="input-label mb-2">Additional Interviewer:</label>
                                <TextField
                                    fullWidth
                                    id="additionalhm1"
                                    name="additionalhm1"
                                    size="small"
                                    variant="outlined"
                                    value={formik.values.additionalhm1}
                                    onChange={formik.handleChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid size={4}>
                            <FormControl fullWidth>
                                <label className="input-label mb-2">No. of Rounds:</label>
                                <TextField
                                    fullWidth
                                    id="round"
                                    name="round"
                                    size="small"
                                    variant="outlined"
                                    select
                                    onChange={(e) => formik.setFieldValue("round", e.target.value)}
                                >
                                    <MenuItem value=""></MenuItem>
                                    <MenuItem value="20">First</MenuItem>
                                    <MenuItem value="21">Second</MenuItem>
                                    <MenuItem value="24">Third</MenuItem>
                                    <MenuItem value="25">Final</MenuItem>
                                </TextField>
                            </FormControl>
                        </Grid>
                        <Grid size={4}>
                            <FormControl fullWidth>
                                <label className="input-label mb-2">Interview Type:</label>
                                <TextField
                                    fullWidth
                                    id="type"
                                    name="type"
                                    size="small"
                                    variant="outlined"
                                    select
                                    onChange={(e) => formik.setFieldValue("type", e.target.value)}
                                >
                                    <MenuItem value=""></MenuItem>
                                    <MenuItem value="Phone">Phone</MenuItem>
                                    <MenuItem value="Video">Video</MenuItem>
                                    <MenuItem value="Inperson">Inperson</MenuItem>
                                </TextField>
                            </FormControl>
                        </Grid>
                        <Grid size={4}>
                            <FormControl fullWidth>
                                <label className="input-label mb-2">Phone Number:</label>
                                <TextField
                                    fullWidth
                                    id="phone"
                                    name="phone"
                                    size="small"
                                    variant="outlined"
                                    value={formik.values.phone}
                                />
                            </FormControl>
                        </Grid>
                        <Grid size={4}>
                            <FormControl fullWidth>
                                <label className="input-label mb-2">Who will call where?:</label>
                                <TextField
                                    fullWidth
                                    id="whowillcall"
                                    name="whowillcall"
                                    size="small"
                                    variant="outlined"
                                    select
                                    onChange={(e) => formik.setFieldValue("whowillcall", e.target.value)}
                                >
                                    <MenuItem value=""></MenuItem>
                                    <MenuItem value="Manager to call candidate">Manager to call candidate</MenuItem>
                                    <MenuItem value="Conference bridge">Conference bridge</MenuItem>
                                    <MenuItem value="Candidate will call manager">Candidate will call manager
                                    </MenuItem>
                                </TextField>
                            </FormControl>
                        </Grid>
                        <Grid size={8}>
                            <Grid container spacing={2}>
                                <Grid size={4}>
                                    <FormControl fullWidth>
                                        <label className="input-label mb-2">Date:</label>
                                        <LocalizationProvider dateAdapter={AdapterLuxon}>
                                            <DatePicker
                                                slotProps={{ textField: { size: 'small' } }}
                                                onChange={(e: any) => formik.setFieldValue("intdate", e?.toFormat('MM-dd-yyyy'))}
                                            />
                                        </LocalizationProvider>
                                    </FormControl>
                                </Grid>
                                <Grid size={4}>
                                    <FormControl fullWidth>
                                        <label className="input-label mb-2">Interview Start Time:</label>
                                        <LocalizationProvider dateAdapter={AdapterLuxon}>
                                            <TimePicker
                                                slotProps={{ textField: { size: 'small' } }}
                                                viewRenderers={{
                                                    hours: renderTimeViewClock,
                                                    minutes: renderTimeViewClock,
                                                    seconds: renderTimeViewClock,
                                                }}
                                                onChange={(e: any) => formik.setFieldValue("starttime", e?.toLocaleString(DateTime.TIME_24_SIMPLE))}
                                            />
                                        </LocalizationProvider>
                                    </FormControl>
                                </Grid>
                                <Grid size={4}>
                                    <FormControl fullWidth>
                                        <label className="input-label mb-2">Interview End Time:</label>
                                        <LocalizationProvider dateAdapter={AdapterLuxon}>
                                            <TimePicker
                                                slotProps={{ textField: { size: 'small' } }}
                                                viewRenderers={{
                                                    hours: renderTimeViewClock,
                                                    minutes: renderTimeViewClock,
                                                    seconds: renderTimeViewClock,
                                                }}
                                                onChange={(e: any) => formik.setFieldValue("endtime", e?.toLocaleString(DateTime.TIME_24_SIMPLE))}
                                            />
                                        </LocalizationProvider>
                                    </FormControl>
                                </Grid>
                            </Grid>

                        </Grid>
                        <Grid size={4}>
                            <FormControl fullWidth>
                                <label className="input-label mb-2">Timezone:</label>
                                <TextField
                                    fullWidth
                                    id="timezone"
                                    name="timezone"
                                    size="small"
                                    variant="outlined"
                                    select
                                    onChange={(e) => formik.setFieldValue("timezone", e.target.value)}
                                >
                                    <MenuItem value=""></MenuItem>
                                    <MenuItem value="EST">EST</MenuItem>
                                    <MenuItem value="CST">CST</MenuItem>
                                    <MenuItem value="MST">MST</MenuItem>
                                    <MenuItem value="PST">PST</MenuItem>
                                </TextField>
                            </FormControl>
                        </Grid>
                        <Grid size={4}>
                            <FormControl fullWidth>
                                <label className="input-label mb-2">Interview Status:</label>
                                <TextField
                                    fullWidth
                                    id="status"
                                    name="status"
                                    size="small"
                                    variant="outlined"
                                    select
                                    onChange={(e) => formik.setFieldValue("status", e.target.value)}
                                >
                                    <MenuItem value=""></MenuItem>
                                    <MenuItem value="Requested">Requested</MenuItem>
                                    <MenuItem value="Scheduled">Scheduled</MenuItem>
                                    <MenuItem value="Completed">Completed</MenuItem>
                                    <MenuItem value="Cancelled">Cancelled</MenuItem>
                                    <MenuItem value="Rescheduled">Rescheduled</MenuItem>
                                </TextField>
                            </FormControl>
                        </Grid>
                        <Grid size={8}>
                            <FormControl fullWidth>
                                <label className="input-label mb-2">Comments / Notes:</label>
                                <TextField
                                    fullWidth
                                    id="comments"
                                    name="comments"
                                    size="small"
                                    variant="outlined"
                                    value={formik.values.comments}
                                    onChange={formik.handleChange}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </div>
            </DialogContent>
            <DialogActions>
                <Button
                    color="primary"
                    onClick={onDialogSave}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default InterviewsDialog;