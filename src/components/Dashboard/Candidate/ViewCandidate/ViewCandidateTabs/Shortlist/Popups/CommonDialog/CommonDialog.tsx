// import { useState, Fragment, SyntheticEvent } from "react";
import { useState, Fragment } from "../../../../../../../../shared/modules/React";
import { Stack } from "../../../../../../../../shared/modules/MaterialImports/Stack";
import { Dialog, DialogTitle, DialogContent, DialogActions } from '../../../../../../../../shared/modules/MaterialImports/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Button } from '../../../../../../../../shared/modules/MaterialImports/Button';
import { Radio, RadioGroup, Checkbox } from '../../../../../../../../shared/modules/MaterialImports/FormElements';
import { FormControlLabel, FormControl, TextField } from '../../../../../../../../shared/modules/MaterialImports/FormInputs';
import { MUIAutoComplete } from "../../../../../../../shared/MUIAutoComplete/MUIAutoComplete";
import { DatePicker, LocalizationProvider, AdapterLuxon } from '../../../../../../../../shared/modules/MaterialImports/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { DateTime } from "../../../../../../../../shared/modules/Luxon";
import { MenuItem } from "../../../../../../../../shared/modules/MaterialImports/Menu";
import { userLocalData } from "../../../../../../../../shared/services/userData";
import { useFormik, Yup } from '../../../../../../../../shared/modules/Formik';
import ApiService from '../../../../../../../../shared/api/api';

import './CommonDialog.scss';
import { showToaster } from "../../../../../../../shared/SnackBar/SnackBar";

export interface commomDialogProps {
    dialogOpen: boolean,
    handleDialogClose: any,
    nextAction: string,
    recruiter: any,
    candidateId: string,
    jobId: string,
    currStatus: string,
    refreshShortlistBar: any,
    openId: string
}

const CommonDialog = ({
    dialogOpen,
    handleDialogClose,
    nextAction,
    recruiter,
    candidateId,
    jobId,
    currStatus,
    refreshShortlistBar,
    openId
}: commomDialogProps) => {
    const [assignedTo, setAssignedTo] = useState("");
    const [actionDate, setActionDate] = useState("");
    const [actionTime, setActionTime] = useState("");
    const actionList = {
        "1": "View",
        "0": "Shortlist",
        "2": "Shortlist",
        "3": "Contacted",
        "4": "Pipeline",
        "5": "Not Interested",
        "6": "Not Available",
        "7": "Submitted by Competition",
        "8": "Internal Submission",
        "9": "Call First",
        "50": "Not Qualified",
        "11": "Client Submission",
        "12": "Interview Requested",
        "13": "Offer Made",
        "14": "Forward to HM",
        "15": "Placement",
        "16": "Bad Delivery",
        "17": "Off Market",
        "18": "Internal Reject",
        "19": "Client Reject",
        "20": "1st Round Interview",
        "21": "2nd Round Interview",
        "22": "Interview No Show",
        "23": "Start",
        "24": "3rd Round Interview",
        "25": "Final Round Interview",
        "26": "Direct Offer",
        "27": "Initiate Onboard",
        "28": "Withdrawn",
        "29": "Offer Rescinded",
        "30": "Clone",
        "31": "AM/RM Approved",
        "32": "AM/RM Left MSG",
    }

    const getCurrentDateTime = (checked: boolean) => {
        if (checked) {
            setActionDate(DateTime.now().toFormat('yyyy-MM-dd'));
            setActionTime(`${DateTime.now().toFormat('yyyy-MM-dd')}T${DateTime.now().toLocaleString(DateTime.TIME_24_SIMPLE)}`);
        } else {
            setActionDate("");
            setActionTime("");
        }
    }

    const initialValues = {
        assignedTo: '',
        otherUser: '',
        date: '',
        time: '',
        outcome: '',
        contdesc: '',
        unavailableDate: '',
        notavaidesc: '',
        notInterestedReason: '',
        notintdesc: '',
        subbycompcmts: '',
        notQualifiedReason: '',
        notqualdesc: '',
        rejectReason: '',
        rejectedBy: '',
        rejectCategory: '',
        resonforrej: '',
        offMarketReason: '',
        dissdesc: '',
        badDeliveryReason: '',
        baddelidesc: '',
        offerRescindedReason: '',
        rescindeddesc: '',
        noShowdesc: '',
        dateCandidateStarted: '',
        startdesc: '',
    }

    const dialogueSchema = Yup.object({
        assignedTo: Yup.string(),
        otherUser: Yup.string(),
        date: Yup.string(),
        time: Yup.string(),
        outcome: Yup.string(),
        contdesc: Yup.string(),
        unavailableDate: Yup.string(),
        notavaidesc: Yup.string(),
        notInterestedReason: Yup.string(),
        notintdesc: Yup.string(),
        subbycompcmts: Yup.string(),
        notQualifiedReason: Yup.string(),
        notqualdesc: Yup.string(),
        rejectReason: Yup.string(),
        rejectedBy: Yup.string(),
        rejectCategory: Yup.string(),
        resonforrej: Yup.string(),
        offMarketReason: Yup.string(),
        dissdesc: Yup.string(),
        badDeliveryReason: Yup.string(),
        baddelidesc: Yup.string(),
        offerRescindedReason: Yup.string(),
        rescindeddesc: Yup.string(),
        noShowdesc: Yup.string(),
        dateCandidateStarted: Yup.string(),
        startdesc: Yup.string(),
    })

    const formik = useFormik({
        initialValues,
        validationSchema: dialogueSchema,
        onSubmit: () => {
            onDialogSave();
        },

    });

    const onDialogSave = () => {
        let column1 = '';
        let column2 = '';
        let comments = '';

        if (nextAction === '3') {
            if (formik.values.outcome === "") {
                showToaster("Please fill the madetory fields", "error");
            } else column1 = formik.values.outcome

            comments = formik.values.contdesc;
        }

        if (nextAction === '6') {
            if (formik.values.unavailableDate === "") {
                showToaster("Please fill the madetory fields", "error");
            } else column1 = formik.values.unavailableDate

            if (formik.values.notavaidesc === "") {
                showToaster("Please fill the madetory fields", "error");
            } else comments = formik.values.notavaidesc;
        }

        if (nextAction === '5') {
            if (formik.values.notInterestedReason === "") {
                showToaster("Please fill the madetory fields", "error");
            } else column1 = formik.values.notInterestedReason

            if (formik.values.notintdesc === "") {
                showToaster("Please fill the madetory fields", "error");
            } else comments = formik.values.notintdesc;
        }

        if (nextAction === '7') {
            if (formik.values.subbycompcmts === "") {
                showToaster("Please fill the madetory fields", "error");
            } else comments = formik.values.subbycompcmts;
        }

        if (nextAction === "50") {
            if (formik.values.notQualifiedReason === "") {
                showToaster("Please fill the madetory fields", "error");
            } else column1 = formik.values.notQualifiedReason

            if (formik.values.notqualdesc === "") {
                showToaster("Please fill the madetory fields", "error");
            } else comments = formik.values.notqualdesc;
        }

        if (nextAction === "18") {
            if (formik.values.rejectReason === "") {
                showToaster("Please fill the madetory fields", "error");
            } else column1 = formik.values.rejectReason

        }

        if (nextAction === "19") {
            if (formik.values.rejectedBy === "") {
                showToaster("Please fill the madetory fields", "error");
            } else column1 = formik.values.rejectedBy

            if (formik.values.rejectCategory === "") {
                showToaster("Please fill the madetory fields", "error");
            } else column2 = formik.values.rejectCategory

            if (formik.values.resonforrej === "") {
                showToaster("Please fill the madetory fields", "error");
            } else comments = formik.values.resonforrej;

        }

        if (nextAction === "17") {
            if (formik.values.offMarketReason === "") {
                showToaster("Please fill the madetory fields", "error");
            } else column1 = formik.values.offMarketReason

            if (formik.values.dissdesc === "") {
                showToaster("Please fill the madetory fields", "error");
            } else comments = formik.values.dissdesc;

        }

        if (nextAction === "16") {
            if (formik.values.badDeliveryReason === "") {
                showToaster("Please fill the madetory fields", "error");
            } else column1 = formik.values.badDeliveryReason

            if (formik.values.baddelidesc === "") {
                showToaster("Please fill the madetory fields", "error");
            } else comments = formik.values.baddelidesc;

        }

        if (nextAction === "29") {
            if (formik.values.offerRescindedReason === "") {
                showToaster("Please fill the madetory fields", "error");
            } else column1 = formik.values.offerRescindedReason

            if (formik.values.rescindeddesc === "") {
                showToaster("Please fill the madetory fields", "error");
            } else comments = formik.values.rescindeddesc;
        }

        if (nextAction === "22") {
            if (formik.values.noShowdesc === "") {
                showToaster("Please fill the madetory fields", "error");
            } else comments = formik.values.noShowdesc;
        }

        if (nextAction === "23") {
            if (formik.values.dateCandidateStarted === "") {
                showToaster("Please fill the madetory fields", "error");
            } else column1 = formik.values.dateCandidateStarted;

            if (formik.values.startdesc === "") {
                showToaster("Please fill the madetory fields", "error");
            } else comments = formik.values.startdesc;
        }


        const updateApiData = {
            "jobid": jobId,
            "candid": candidateId,
            "status": nextAction,
            "column1": column1,
            "column2": column2,
            "comments": comments
        }

        ApiService.getByParams(193, 'Candidate/Shortlist/Shortlist_Comments.jsp', updateApiData).then(
            (response: any) => {
                // console.log(response);
                if (response.data.success === true) {
                    onDialogConfirm();
                    // showToaster(response.data.message, 'success');
                } else {
                    showToaster(response.data.message, 'error');
                }
            })
    }

    const onDialogConfirm = () => {
        let doneby = '';
        let dateToPass = '';

        if (formik.values.assignedTo !== "") {
            if (formik.values.assignedTo === 'other') {
                if (formik.values.otherUser === '') {
                    showToaster("Please fill the madetory fields", "error");
                    return false;
                } else doneby = formik.values.otherUser
            } else doneby = formik.values.assignedTo
        } else {
            showToaster("Please fill the madetory fields", "error");
            return false;
        }

        if (formik.values.date === '' && formik.values.time === '') {
            showToaster("Please fill the madetory fields", "error");
            return false;
        } else dateToPass = `${formik.values.date} ${formik.values.time}`;

        let apiData = {
            'JobId': jobId,
            'Username': userLocalData.getvalue("userName"),
            'doneBy': userLocalData.getvalue("recrId"),
            'Status': nextAction,
            'CandId': candidateId,
            'prevStatus': currStatus,
            'EmpId': doneby,
            'statusDate': dateToPass,
            'openId': openId
        }

        ApiService.getByParams(193, 'Curately/Candidate/shortlistSave.jsp', apiData).then(
            (response: any) => {
                // console.log(response)
                if (response.data.success === true) {
                    showToaster(response.data.message, 'success');
                    refreshShortlistBar();
                    handleDialogClose();
                } else {
                    showToaster(response.data.message, 'error');
                }
            })
    }

    return (
        <Dialog
            maxWidth={'md'}
            fullWidth={true} open={dialogOpen} className='AddJobModal'
            id='nextActionDialogBox'
        >
            <DialogTitle className="header">
                {nextAction !== '28' && <span>{actionList[nextAction as keyof typeof actionList]}</span>}
                {nextAction === "28" && <span>Change Status</span>}

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
                    <FormControl>
                        <label className="input-label">Taking action on behalf of <span style={{ color: 'red' }}>*</span></label>
                        <RadioGroup
                            row
                            name="assignedTo"
                            value={formik.values.assignedTo}
                            onChange={(e) => formik.setFieldValue("assignedTo", (e.target as HTMLInputElement).value)}
                        >
                            <FormControlLabel value={userLocalData.getvalue('recrId')} control={<Radio />} label="You" />
                            {/* <FormControlLabel value={recruiter.id} control={<Radio />} label="Mastan Vali" /> */}
                            <FormControlLabel value="other" control={<Radio />} label="Other User" />
                        </RadioGroup>
                    </FormControl>

                    {formik.values.assignedTo === "other" && <div className="userInput">
                        <MUIAutoComplete
                            id='user'
                            handleChange={(id: any, name: string) => {
                                // console.log(id, name);
                                formik.setFieldValue('otherUser', id);
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
                    {(nextAction === "19" || nextAction === "28" || nextAction === "26" || nextAction === "17" || nextAction === "16" || nextAction === "29" || nextAction === "22" || nextAction === "13" || nextAction === "23" || nextAction === "11") && <FormControlLabel
                        control={<Checkbox />}
                        label="Current Date/Time"
                        labelPlacement="end"
                        id="currentDateTime"
                        name="currentDateTime"
                        className="mt-3"
                        onChange={(e: any) => getCurrentDateTime(e.target.checked)}
                    />}
                </div>

                {nextAction === "3" && <div className="callOutcome">
                    <FormControl fullWidth>
                        <label className="input-label mb-2">Call Outcome:<span style={{ color: 'red' }}>*</span></label>
                        <TextField
                            fullWidth
                            id="outcome"
                            name="outcome"
                            size="small"
                            variant="outlined"
                            select
                            label="Select an outcome"
                            value={formik.values.outcome}
                            onChange={(e) => formik.setFieldValue("outcome", e.target.value)}
                        >
                            <MenuItem value=""></MenuItem>
                            <MenuItem value="None">None</MenuItem>
                            <MenuItem value="No Answer">No Answer</MenuItem>
                            <MenuItem value="Busy">Busy</MenuItem>
                            <MenuItem value="Wrong Number">Wrong Number</MenuItem>
                            <MenuItem value="Left live message">Left live message</MenuItem>
                            <MenuItem value="Left voicemail">Left voicemail</MenuItem>
                            <MenuItem value="Connected">Connected</MenuItem>
                        </TextField>
                    </FormControl>

                    <FormControl fullWidth>
                        <label className="input-label mb-2">Describe the Call:</label>
                        <textarea
                            rows={5}
                            name="contdesc"
                            id="contdesc"
                            value={formik.values.contdesc}
                            onChange={formik.handleChange}
                        ></textarea>
                    </FormControl>
                </div>}

                {nextAction === "4" && <div className="callOutcome">
                    <label className="input-label mt-4 d-block">Do you want to move this candidate to Pipeline status?</label>
                </div>}

                {nextAction === "6" && <div className="callOutcome">
                    <FormControl fullWidth>
                        <label className="input-label mb-2">Unavailable until:<span style={{ color: 'red' }}>*</span></label>
                        <LocalizationProvider dateAdapter={AdapterLuxon}>
                            <DatePicker
                                label="Date"
                                slotProps={{ textField: { size: 'small' } }}
                                onChange={(date: any) => formik.setFieldValue("unavailableDate", date?.toFormat('MM-dd-yyyy'))}
                                sx={{ width: '50%' }}
                            />
                        </LocalizationProvider>
                    </FormControl>

                    <FormControl fullWidth>
                        <label className="input-label mb-2">Comment:<span style={{ color: 'red' }}>*</span></label>
                        <textarea rows={5} name="notavaidesc" id="notavaidesc" value={formik.values.notavaidesc} onChange={formik.handleChange}></textarea>
                    </FormControl>
                </div>}

                {nextAction === "5" && <div className="callOutcome">
                    <FormControl fullWidth>
                        <label className="input-label mb-2">Reason for not interested:<span style={{ color: 'red' }}>*</span></label>
                        <TextField
                            fullWidth
                            id="notInterestedReason"
                            name="notInterestedReason"
                            size="small"
                            variant="outlined"
                            select
                            label="Select Reason"
                            value={formik.values.notInterestedReason}
                            onChange={formik.handleChange}
                        >
                            <MenuItem value="Commute">Commute</MenuItem>
                            <MenuItem value="Money">Money</MenuItem>
                            <MenuItem value="Duration">Duration</MenuItem>
                            <MenuItem value="Looking for Perm">Looking for Perm</MenuItem>
                            <MenuItem value="Looking for Contract">Looking for Contract</MenuItem>
                            <MenuItem value="Client">Client</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </TextField>
                    </FormControl>

                    <FormControl fullWidth>
                        <label className="input-label mb-2">Comment:<span style={{ color: 'red' }}>*</span></label>
                        <textarea rows={5} name="notintdesc" id="notintdesc" value={formik.values.notintdesc} onChange={formik.handleChange}></textarea>
                    </FormControl>
                </div>}

                {nextAction === "7" && <div className="callOutcome">
                    <FormControl fullWidth>
                        <label className="input-label mb-2">Comment:<span style={{ color: 'red' }}>*</span></label>
                        <textarea rows={5} name="subbycompcmts" id="subbycompcmts" value={formik.values.subbycompcmts} onChange={formik.handleChange}></textarea>
                    </FormControl>
                </div>}

                {nextAction === "50" && <div className="callOutcome">
                    <FormControl fullWidth>
                        <label className="input-label mb-2">Reason for not qualified: <span style={{ color: 'red' }}>*</span></label>
                        <TextField
                            fullWidth
                            id="notQualifiedReason"
                            name="notQualifiedReason"
                            size="small"
                            variant="outlined"
                            select
                            label="Select Reason"
                            value={formik.values.notQualifiedReason}
                            onChange={formik.handleChange}
                        >
                            <MenuItem value="MSP">MSP</MenuItem>
                            <MenuItem value="Industry">Industry</MenuItem>
                            <MenuItem value="Location">Location</MenuItem>
                            <MenuItem value="Visa Status">Visa Status</MenuItem>
                            <MenuItem value="Gaps in Employment">Gaps in Employment</MenuItem>
                            <MenuItem value="Experience">Experience</MenuItem>
                            <MenuItem value="Pay rate">Pay rate</MenuItem>
                            <MenuItem value="Not Deliverable">Not Deliverable</MenuItem>
                        </TextField>
                    </FormControl>

                    <FormControl fullWidth>
                        <label className="input-label mb-2">Comment:<span style={{ color: 'red' }}>*</span></label>
                        <textarea rows={5} name="notqualdesc" id="notqualdesc" value={formik.values.notqualdesc}
                            onChange={formik.handleChange}></textarea>
                    </FormControl>
                </div>}

                {nextAction === "18" && <div className="callOutcome">
                    <FormControl fullWidth>
                        <label className="input-label mb-2">Reject Reason: <span style={{ color: 'red' }}>*</span></label>
                        <TextField
                            fullWidth
                            id="rejectReason"
                            name="rejectReason"
                            size="small"
                            variant="outlined"
                            select
                            label="Select Reason"
                            value={formik.values.rejectReason}
                            onChange={formik.handleChange}
                        >
                            <MenuItem value="MSP">MSP</MenuItem>
                            <MenuItem value="Hiring Manager">Hiring Manager</MenuItem>
                            <MenuItem value="Fake Candidate">Fake Candidate</MenuItem>
                            <MenuItem value="Industry">Industry</MenuItem>
                            <MenuItem value="Visa Status">Visa Status</MenuItem>
                            <MenuItem value="Availability">Availability</MenuItem>
                            <MenuItem value="Not Deliverable">Not Deliverable</MenuItem>
                            <MenuItem value="Pay rate">Pay rate</MenuItem>
                        </TextField>
                    </FormControl>
                </div>}

                {nextAction === "31" && <div className="callOutcome">
                    <label className="input-label mt-4 d-block">Do you want to move this candidate to AM/RM Approved status?</label>
                </div>}

                {nextAction === "32" && <div className="callOutcome">
                    <label className="input-label mt-4 d-block">Do you want to move this candidate to AM/RM Msg status?</label>
                </div>}

                {nextAction === "19" && <div className="callOutcome">
                    <Stack direction="row" spacing={2} className="mt-4">
                        <FormControl fullWidth>
                            <label className="input-label mb-2">Rejected by: <span style={{ color: 'red' }}>*</span></label>
                            <TextField
                                fullWidth
                                id="rejectedBy"
                                name="rejectedBy"
                                size="small"
                                variant="outlined"
                                select
                                label="Rejected by"
                                value={formik.values.rejectedBy}
                                onChange={formik.handleChange}
                            >
                                <MenuItem value="MSP">MSP</MenuItem>
                                <MenuItem value="Hiring Manager">Hiring Manager</MenuItem>
                            </TextField>
                        </FormControl>
                        <FormControl fullWidth>
                            <label className="input-label mb-2">Rejection Category: <span style={{ color: 'red' }}>*</span></label>
                            <TextField
                                fullWidth
                                id="rejectCategory"
                                name="rejectCategory"
                                size="small"
                                variant="outlined"
                                select
                                label="Rejection Category"
                                value={formik.values.rejectCategory}
                                onChange={formik.handleChange}
                            >
                                <MenuItem value="Duplication submission">Duplication submission</MenuItem>
                                <MenuItem value="Missing Skill set">Missing Skill set</MenuItem>
                                <MenuItem value="Resume Format">Resume Format</MenuItem>
                            </TextField>
                        </FormControl>
                    </Stack>

                    <FormControl fullWidth>
                        <label className="input-label mb-2">Reason for rejection: <span style={{ color: 'red' }}>*</span></label>
                        <textarea rows={5} name="resonforrej" id="resonforrej" value={formik.values.resonforrej} onChange={formik.handleChange}></textarea>
                    </FormControl>
                </div>}

                {nextAction === "26" && <div className="callOutcome">
                    <label className="input-label mt-4 d-block">Do you want to move the candidate to Direct Offer?</label>
                </div>}

                {nextAction === "17" && <div className="callOutcome">
                    <FormControl fullWidth>
                        <label className="input-label mb-2">Reason: <span style={{ color: 'red' }}>*</span></label>
                        <TextField
                            fullWidth
                            id="offMarketReason"
                            name="offMarketReason"
                            size="small"
                            variant="outlined"
                            select
                            label="Select Reason"
                            value={formik.values.offMarketReason}
                            onChange={formik.handleChange}
                        >
                            <MenuItem value="Accepted new position">Accepted new position</MenuItem>
                            <MenuItem value="Current position extended">Current position extended</MenuItem>
                            <MenuItem value="Staying in current role">Staying in current role</MenuItem>
                        </TextField>
                    </FormControl>

                    <FormControl fullWidth>
                        <label className="input-label mb-2">Describe your discussion:<span style={{ color: 'red' }}>*</span></label>
                        <textarea rows={5} name="dissdesc" id="dissdesc" value={formik.values.dissdesc} onChange={formik.handleChange}></textarea>
                    </FormControl>
                </div>}

                {nextAction === "16" && <div className="callOutcome">
                    <FormControl fullWidth>
                        <label className="input-label mb-2">Reason: <span style={{ color: 'red' }}>*</span></label>
                        <TextField
                            fullWidth
                            id="badDeliveryReason"
                            name="badDeliveryReason"
                            size="small"
                            variant="outlined"
                            select
                            label="Select Reason"
                            value={formik.values.badDeliveryReason}
                            onChange={formik.handleChange}
                        >
                            <MenuItem value="Current position extended">Current position extended</MenuItem>
                            <MenuItem value="Counter offer">Counter offer</MenuItem>
                            <MenuItem value="accepted other contract position">accepted other contract position</MenuItem>
                            <MenuItem value="Accepted Perm position">Accepted Perm position</MenuItem>
                            <MenuItem value="Failed BG/DT">Failed BG/DT</MenuItem>
                            <MenuItem value="others">others</MenuItem>
                        </TextField>
                    </FormControl>

                    <FormControl fullWidth>
                        <label className="input-label mb-2">Comment:<span style={{ color: 'red' }}>*</span></label>
                        <textarea rows={5} name="baddelidesc" id="baddelidesc" value={formik.values.baddelidesc} onChange={formik.handleChange}></textarea>
                    </FormControl>
                </div>}

                {nextAction === "29" && <div className="callOutcome">
                    <FormControl fullWidth>
                        <label className="input-label mb-2">Reason: <span style={{ color: 'red' }}>*</span></label>
                        <TextField
                            fullWidth
                            id="offerRescindedReason"
                            name="offerRescindedReason"
                            size="small"
                            variant="outlined"
                            select
                            label="Select Reason"
                            value={formik.values.offerRescindedReason}
                            onChange={formik.handleChange}
                        >
                            <MenuItem value="Client Cancelled job">Client Cancelled job</MenuItem>
                            <MenuItem value="Client Filled internally">Client Filled internally</MenuItem>
                            <MenuItem value="Client Lost budget">Client Lost budget</MenuItem>
                            <MenuItem value="Others">Others</MenuItem>
                        </TextField>
                    </FormControl>

                    <FormControl fullWidth>
                        <label className="input-label mb-2">Comment:<span style={{ color: 'red' }}>*</span></label>
                        <textarea rows={5} name="rescindeddesc" id="rescindeddesc" value={formik.values.rescindeddesc} onChange={formik.handleChange}></textarea>
                    </FormControl>
                </div>}

                {nextAction === "22" && <div className="callOutcome">
                    <FormControl fullWidth>
                        <label className="input-label mb-2">Comment:<span style={{ color: 'red' }}>*</span></label>
                        <textarea rows={5} name="noShowdesc" id="noShowdesc" value={formik.values.noShowdesc} onChange={formik.handleChange}></textarea>
                    </FormControl>
                </div>}

                {nextAction === "13" && <div className="callOutcome">
                    <label className="input-label mt-4 d-block">Do you want to move the candidate to offered status?</label>
                </div>}

                {nextAction === "23" && <div className="callOutcome">
                    <FormControl fullWidth>
                        <label className="input-label mb-2">Date candidate started:<span style={{ color: 'red' }}>*</span>
                            <small className="d-block">Note: only pick this status after candidate starts the assignment.</small></label>
                        <LocalizationProvider dateAdapter={AdapterLuxon}>
                            <DatePicker
                                label="Date"
                                slotProps={{ textField: { size: 'small' } }}
                                onChange={(date: any) => formik.setFieldValue("dateCandidateStarted", date?.toFormat('MM-dd-yyyy'))}
                                sx={{ width: '50%' }}
                            />
                        </LocalizationProvider>
                    </FormControl>

                    <FormControl fullWidth>
                        <label className="input-label mb-2">Comment:<span style={{ color: 'red' }}>*</span></label>
                        <textarea rows={5} name="startdesc" id="startdesc" value={formik.values.startdesc} onChange={formik.handleChange}></textarea>
                    </FormControl>
                </div>}

                {nextAction === "11" && <div className="callOutcome">
                    <label className="input-label mt-4 d-block">Do you want to move the status of this candidate to client submission?</label>
                </div>}

            </DialogContent>
            <DialogActions>
                {(nextAction === "3" || nextAction === "6" || nextAction === "5" || nextAction === "7" || nextAction === "50" || nextAction === "18" || nextAction === "19" || nextAction === "28" || nextAction === "14" || nextAction === "17" || nextAction === "16" || nextAction === "29" || nextAction === "22" || nextAction === "23") && <>
                    <Button
                        color="secondary"
                        onClick={handleDialogClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        onClick={onDialogSave}
                    >
                        Save
                    </Button>
                </>}
                {(nextAction === "4" || nextAction === "31" || nextAction === "32" || nextAction === "26" || nextAction === "13" || nextAction === "11") && <>
                    <Button
                        color="primary"
                        onClick={onDialogConfirm}
                    >
                        Yes
                    </Button>
                    <Button
                        color="secondary"
                        onClick={handleDialogClose}
                    >
                        No
                    </Button>
                </>}
            </DialogActions>
        </Dialog >
    )
}

export default CommonDialog;