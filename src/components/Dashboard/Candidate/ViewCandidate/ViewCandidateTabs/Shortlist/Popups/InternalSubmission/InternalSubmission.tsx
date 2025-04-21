import { useState, Fragment } from "../../../../../../../../shared/modules/React";
import { Dialog, DialogTitle, DialogContent, DialogActions } from '../../../../../../../../shared/modules/MaterialImports/Dialog';
import { IconButton, Grid, Button } from '../../../../../../../../shared/modules/commonImports';
import CloseIcon from '@mui/icons-material/Close';
import { Accordion, AccordionSummary, AccordionDetails } from '../../../../../../../../shared/modules/MaterialImports/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography } from '../../../../../../../../shared/modules/MaterialImports/Typography';
import { TextField, FormControlLabel, FormControl } from '../../../../../../../../shared/modules/MaterialImports/FormInputs';
import { MenuItem } from '../../../../../../../../shared/modules/MaterialImports/Menu';
import { Radio, RadioGroup, Checkbox } from '../../../../../../../../shared/modules/MaterialImports/FormElements';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { useFormik, Yup } from "../../../../../../../../shared/modules/Formik";

import { Card, CardContent } from '../../../../../../../../shared/modules/MaterialImports/Card';
import { DatePicker, LocalizationProvider, AdapterLuxon } from '../../../../../../../../shared/modules/MaterialImports/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { MUIAutoComplete } from "../../../../../../../shared/MUIAutoComplete/MUIAutoComplete";
import { Stack } from "../../../../../../../../shared/modules/MaterialImports/Stack";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { userLocalData } from "../../../../../../../../shared/services/userData";
import ApiService from '../../../../../../../../shared/api/api';


import './InternalSubmission.scss';
import { showToaster } from "../../../../../../../shared/SnackBar/SnackBar";

export interface InternalSubmissionProps {
    dialogOpen: boolean,
    handleDialogClose: any,
    nextAction: string,
    recruiter: any,
    candidateId: string,
    jobId: string,
    currStatus: string
    refreshShortlistBar: any
}

const InternalSubmission = ({
    dialogOpen,
    handleDialogClose,
    nextAction,
    recruiter,
    candidateId,
    jobId,
    currStatus,
    refreshShortlistBar,
}: InternalSubmissionProps
) => {

    const [assignedTo, setAssignedTo] = useState("");
    const initialInternalSubmissionDetails = {
        "assignedTo": "",
        "otherUser": "",
        "date": "",
        "time": "",
        "firstName": "",
        "middleName": "",
        "lastName": "",
        "candidateMiddleName": "",
        "bestPhoneNumber": "",
        "emailID": "",
        "skypeId": "",
        "linkedInProfile": "",
        "bestTimeToCall": "",
        "candidateVisaStatus": "",
        "highestEducationCompleted": "",
        "yearOfGraduation": "",
        "dateOfEmploymentFrom": "",
        "dateOfEmploymentTo": "",
        "previouslyWorkedAs": "",
        "reportingManager": "",
        "managerPhone": "",
        "managerEmail": "",
        "newAssignment": "",
        "currentlyWorking": "",
        "position": "",
        "endDate": "",
        "offer": "",
        "availability": "",
        "vacDetails": "",
        "skill": "",
        "yearsOfExperience": "",
        "lastUsed": "",
        "proficiency": "",
        "felony": "",
        "backgroundCheck": "",
        "additionalAttachments": "",
        "employerName": "",
        "contactName": "",
        "contactPhoneNumber": "",
        "contactEmail": "",
        "datesOfGapFrom": "",
        "datesOfGapTo": "",
        "explanation": "",
        "companyName": "",
        "positionTitle": "",
        "managerName": "",
        "managerEmailInRef": "",
        "managerPhoneInRef": "",
        "employmentFrom": "",
        "employmentTo": "",
        "candidateSummary": "",
        "candidateSource": "",
        "sourcedBy": "",
        "sid": "",
        "payRate": "",
        "amount": "",
        "taxTerms": "",
        "currentLocation": "",
        "jobLocation": "",
        "distance": "",
        "recipient": "",
        "otherEmailID": "",
        "comments": "",
        "worked_previous": "",
        "vacation_planned": "",
        "anotherVendor": "",
        "local": "",
        "signed": "",
        "refFromDate": "",
        "refToDate": "",
    }
    const internalSubmissionSchema = Yup.object().shape({
        "assignedTo": Yup.string(),
        "otherUser": Yup.string(),
        "date": Yup.string(),
        "time": Yup.string(),
        "firstName": Yup.string(),
        "middleName": Yup.string(),
        "lastName": Yup.string(),
        "candidateMiddleName": Yup.string(),
        "bestPhoneNumber": Yup.string(),
        "emailID": Yup.string(),
        "skypeId": Yup.string(),
        "linkedInProfile": Yup.string(),
        "bestTimeToCall": Yup.string(),
        "candidateVisaStatus": Yup.string(),
        "highestEducationCompleted": Yup.string(),
        "yearOfGraduation": Yup.string(),
        "dateOfEmploymentFrom": Yup.string(),
        "dateOfEmploymentTo": Yup.string(),
        "previouslyWorkedAs": Yup.string(),
        "reportingManager": Yup.string(),
        "managerPhone": Yup.string(),
        "managerEmail": Yup.string(),
        "newAssignment": Yup.string(),
        "currentlyWorking": Yup.string(),
        "position": Yup.string(),
        "endDate": Yup.string(),
        "offer": Yup.string(),
        "availability": Yup.string(),
        "vacDetails": Yup.string(),
        "skill": Yup.string(),
        "yearsOfExperience": Yup.string(),
        "lastUsed": Yup.string(),
        "proficiency": Yup.string(),
        "felony": Yup.string(),
        "backgroundCheck": Yup.string(),
        "additionalAttachments": Yup.string(),
        "employerName": Yup.string(),
        "contactName": Yup.string(),
        "contactPhoneNumber": Yup.string(),
        "contactEmail": Yup.string(),
        "datesOfGapFrom": Yup.string(),
        "datesOfGapTo": Yup.string(),
        "explanation": Yup.string(),
        "companyName": Yup.string(),
        "positionTitle": Yup.string(),
        "managerName": Yup.string(),
        "managerEmailInRef": Yup.string(),
        "managerPhoneInRef": Yup.string(),
        "employmentFrom": Yup.string(),
        "employmentTo": Yup.string(),
        "candidateSummary": Yup.string(),
        "candidateSource": Yup.string(),
        "sourcedBy": Yup.string(),
        "sid": Yup.string(),
        "payRate": Yup.string(),
        "amount": Yup.string(),
        "taxTerms": Yup.string(),
        "currentLocation": Yup.string(),
        "jobLocation": Yup.string(),
        "distance": Yup.string(),
        "recipient": Yup.string(),
        "otherEmailID": Yup.string(),
        "comments": Yup.string(),
        "worked_previous": Yup.string(),
        "vacation_planned": Yup.string(),
        "anotherVendor": Yup.string(),
        "local": Yup.string(),
        "signed": Yup.string(),
        "refFromDate": Yup.string(),
        "refToDate": Yup.string(),
    });
    const formik = useFormik({
        initialValues: initialInternalSubmissionDetails,
        validationSchema: internalSubmissionSchema,
        onSubmit: (values: any) => {
        }
    });
    const saveInternalSubmission = () => {

        let formData = new FormData();

        formData.append('jobid', (jobId) ? jobId : '');
        formData.append('candid', (candidateId) ? candidateId : '');
        formData.append('subid', '');
        formData.append('fname', (formik.values.firstName) ? formik.values.firstName : '');
        formData.append('mname', (formik.values.middleName) ? formik.values.middleName : '');
        formData.append('lname', (formik.values.lastName) ? formik.values.lastName : '');
        formData.append('phonetype', '');
        formData.append('phoneno', (formik.values.bestPhoneNumber) ? formik.values.bestPhoneNumber : '');
        formData.append('emailtype', '');
        formData.append('email', (formik.values.emailID) ? formik.values.emailID : '');
        formData.append('skypeid', (formik.values.skypeId) ? formik.values.skypeId : '');
        formData.append('linkedin', (formik.values.linkedInProfile) ? formik.values.linkedInProfile : '');
        formData.append('visastatus', (formik.values.candidateVisaStatus) ? formik.values.candidateVisaStatus : '');
        formData.append('worked_previous', (formik.values.worked_previous) ? formik.values.worked_previous : '');
        formData.append('education', (formik.values.highestEducationCompleted) ? formik.values.highestEducationCompleted : '');
        formData.append('education_year', (formik.values.yearOfGraduation) ? formik.values.yearOfGraduation : '');
        formData.append('employer_name', (formik.values.employerName) ? formik.values.employerName : '');
        formData.append('contact_name', (formik.values.contactName) ? formik.values.contactName : '');
        formData.append('contact_phone', (formik.values.contactPhoneNumber) ? formik.values.contactPhoneNumber : '');
        formData.append('contact_email', (formik.values.contactEmail) ? formik.values.contactEmail : '');
        formData.append('signed', (formik.values.signed) ? formik.values.signed : '');
        formData.append('assignment', (formik.values.newAssignment) ? formik.values.newAssignment : '');
        formData.append('current_working', (formik.values.currentlyWorking) ? formik.values.currentlyWorking : '');
        formData.append('position', (formik.values.position) ? formik.values.position : '');
        formData.append('enddate_assignment', (formik.values.endDate) ? formik.values.endDate : '');
        formData.append('opportunities', (formik.values.offer) ? formik.values.offer : '');
        formData.append('availbility', (formik.values.availability) ? formik.values.availability : '');
        formData.append('vacations_planed', (formik.values.vacation_planned) ? formik.values.vacation_planned : '');
        formData.append('vacation_details', (formik.values.vacDetails) ? formik.values.vacDetails : '');
        formData.append('communication', '');
        formData.append('criminal_history', (formik.values.felony) ? formik.values.felony : '');
        formData.append('drugtest', (formik.values.backgroundCheck) ? formik.values.backgroundCheck : '');
        formData.append('another_vendor', (formik.values.anotherVendor) ? formik.values.anotherVendor : '');
        formData.append('resumeid', '');
        formData.append('documentids', '');
        formData.append('summary', (formik.values.candidateSummary) ? formik.values.candidateSummary : '');
        formData.append('source', (formik.values.candidateSource) ? formik.values.candidateSource : '');
        formData.append('sid', (formik.values.sid) ? formik.values.sid : '');
        formData.append('payrate_hour', '');
        formData.append('payrate', (formik.values.amount) ? formik.values.amount : '');
        formData.append('payrate_type', (formik.values.payRate) ? formik.values.payRate : '');
        formData.append('current_location', (formik.values.currentLocation) ? formik.values.currentLocation : '');
        formData.append('job_location', (formik.values.jobLocation) ? formik.values.jobLocation : '');
        formData.append('distance', (formik.values.distance) ? formik.values.distance : '');
        formData.append('local', (formik.values.local) ? formik.values.local : '');
        formData.append('sourcedby', (formik.values.sourcedBy) ? formik.values.sourcedBy : '');
        formData.append('recipeints', (formik.values.recipient) ? formik.values.recipient : '');
        formData.append('other_emailids', (formik.values.otherEmailID) ? formik.values.otherEmailID : '');
        formData.append('comments', (formik.values.comments) ? formik.values.comments : '');
        formData.append('userid', (userLocalData.getvalue("recrId")) ? userLocalData.getvalue("recrId") : '');
        formData.append('timetocall', (formik.values.bestTimeToCall) ? formik.values.bestTimeToCall : '');
        formData.append('emp_fromdate', (formik.values.employmentFrom) ? formik.values.employmentFrom : '');
        formData.append('emp_todate', (formik.values.employmentTo) ? formik.values.employmentTo : '');
        formData.append('emp_workedas', (formik.values.previouslyWorkedAs) ? formik.values.previouslyWorkedAs : '');
        formData.append('emp_manager_name', (formik.values.reportingManager) ? formik.values.reportingManager : '');
        formData.append('emp_manager_phone', (formik.values.managerPhone) ? formik.values.managerPhone : '');
        formData.append('emp_manager_email', (formik.values.managerEmail) ? formik.values.managerEmail : '');
        formData.append('gap_fromdate', (formik.values.datesOfGapFrom) ? formik.values.datesOfGapFrom : '');
        formData.append('gap_todate', (formik.values.datesOfGapTo) ? formik.values.datesOfGapTo : '');
        formData.append('gap_explanation', (formik.values.explanation) ? formik.values.explanation : '');
        formData.append('ref_fromdate', (formik.values.refFromDate) ? formik.values.refFromDate : '');
        formData.append('ref_todate', (formik.values.refToDate) ? formik.values.refToDate : '');
        formData.append('ref_company', (formik.values.companyName) ? formik.values.companyName : '');
        formData.append('ref_title', (formik.values.positionTitle) ? formik.values.positionTitle : '');
        formData.append('ref_manager_name', (formik.values.managerName) ? formik.values.managerName : '');
        formData.append('ref_manager_email', (formik.values.managerEmailInRef) ? formik.values.managerEmailInRef : '');
        formData.append('ref_manager_phone', (formik.values.managerPhoneInRef) ? formik.values.managerPhoneInRef : '');
        formData.append('skill', (formik.values.skill) ? formik.values.skill : '');
        formData.append('skill_experience', (formik.values.yearsOfExperience) ? formik.values.yearsOfExperience : '');
        formData.append('skill_lastused', (formik.values.lastUsed) ? formik.values.lastUsed : '');
        formData.append('skill_proficiency', (formik.values.proficiency) ? formik.values.proficiency : '');
        formData.append('additionalAttachments', '');
        formData.append('action', ('ADD') ? 'ADD' : '');
        formData.append('username', (userLocalData.getvalue("userName")) ? userLocalData.getvalue("userName") : '');

        const nameData = {
            id: candidateId,
            fName: formik.values.firstName,
            lName: formik.values.lastName,
            mName: formik.values.middleName,
            jobId: jobId
        }

        ApiService.getByParams(193, 'Candidate/Shortlist/candidate_fullname_save.jsp', nameData).then(
            (response: any) => {
                // console.log(response);
                if (response.data.success === true) {
                    // console.log(response.data.message);
                } else {
                    // console.log(response.data.message);
                }
            })

        ApiService.postWithFileData(193, 'Candidate/Shortlist/submission_save.jsp', formData).then(
            (response: any) => {
                // console.log(response);
                if (response.data.success === true) {
                    showToaster(response.data.message, 'success');
                    refreshShortlistBar();
                } else {
                    showToaster(response.data.message, 'error');
                }
            })
    }
    return (
        <form onSubmit={formik.handleSubmit}>
            <Dialog
                maxWidth={'md'}
                fullWidth={true} open={dialogOpen} className='AddJobModal'
                id='internalSubDialogBox'
            >
                <DialogTitle className="header">
                    <span>Internal Submission</span>
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
                                value={assignedTo}
                                onChange={(e) => setAssignedTo((e.target as HTMLInputElement).value)}
                            >
                                <FormControlLabel value={userLocalData.getvalue("recrId")} control={<Radio />} label="You" />
                                <FormControlLabel value={recruiter.id} control={<Radio />} label="Mastan Vali" />
                                <FormControlLabel value="other" control={<Radio />} label="Other User" />
                            </RadioGroup>
                        </FormControl>

                        {assignedTo === "other" && <div className="userInput">
                            <MUIAutoComplete
                                id='user'
                                handleChange={(id: any, name: string) => {
                                    // console.log(id, name)
                                }}
                                valuePassed={{}}
                                isMultiple={false}
                                width="476px"
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
                                    onChange={(date: any) => console.log(date)}
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
                                    viewRenderers={{
                                        hours: renderTimeViewClock,
                                        minutes: renderTimeViewClock,
                                        seconds: renderTimeViewClock,
                                    }}
                                    onChange={(time: any) => console.log(time)}
                                />
                            </LocalizationProvider>
                        </Stack>
                    </div>

                    <div className="accordianWrap">
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className="acc-title">PERSONAL INFORMATION</Typography>
                            </AccordionSummary>
                            <AccordionDetails className="subAccordians">
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={
                                            <Fragment>
                                                <AddIcon className="add" />
                                                <RemoveIcon className="remove" />
                                            </Fragment>
                                        }
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>CONTACT DETAILS </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container spacing={2} className="mb-1">
                                            <Grid size={4} className='mt-1'>
                                                <label className='inputLabel'>First Name:</label><span style={{ color: 'red' }}> * </span>
                                                <TextField fullWidth className='mt-1'
                                                    id="firstName"
                                                    name="firstName"
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    value={formik.values.firstName}
                                                    onChange={formik.handleChange}
                                                />
                                            </Grid>
                                            <Grid size={4} className='mt-1'>
                                                <label className='inputLabel'>Middle Name:</label>
                                                <TextField fullWidth className='mt-1'
                                                    id="middleName"
                                                    name="middleName"
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    value={formik.values.middleName}
                                                    onChange={formik.handleChange}
                                                />
                                            </Grid>
                                            <Grid size={4} className='mt-1'>
                                                <label className='inputLabel'>Last Name:</label><span style={{ color: 'red' }}> * </span>
                                                <TextField fullWidth className='mt-1'
                                                    id="lastName"
                                                    name="lastName"
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    value={formik.values.lastName}
                                                    onChange={formik.handleChange}
                                                />
                                            </Grid>
                                            <Grid container
                                                direction="row"
                                                justifyContent="center"
                                                alignItems="flex-start" className='mt-1 ml-5'>
                                                <FormControlLabel
                                                    control={<Checkbox />}
                                                    labelPlacement="end"
                                                    id="closed"
                                                    name="closed"
                                                    label={<div className='inputLabel'>Candidate does not have Middle Name</div>}
                                                    value={formik.values.candidateMiddleName}
                                                    onChange={formik.handleChange} />
                                            </Grid>
                                            <Grid size={4} className='mt-1 '>
                                                <label className='inputLabel'>Best Phone Number:</label>
                                                <TextField fullWidth className='mt-1'
                                                    id="bestPhoneNumber"
                                                    name="bestPhoneNumber"
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    select
                                                    label="6785516345"
                                                    defaultValue={""}
                                                    value={formik.values.bestPhoneNumber}
                                                    onChange={formik.handleChange}
                                                >
                                                    <MenuItem value="6785516345">6785516345</MenuItem>
                                                    <MenuItem value="other">other</MenuItem>
                                                </TextField>
                                            </Grid>
                                            <Grid size={4} className='mt-1'>
                                                <label className='inputLabel'>Email ID:</label>
                                                <TextField fullWidth className='mt-1'
                                                    id="emailID"
                                                    name="emailID"
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    select
                                                    label="dataask01@gmail.com"
                                                    defaultValue={""}
                                                    value={formik.values.emailID}
                                                    onChange={formik.handleChange}
                                                >
                                                    <MenuItem value="dataask01@gmail.com">dataask01@gmail.com</MenuItem>
                                                    <MenuItem value="other">other</MenuItem>
                                                </TextField>
                                            </Grid>
                                            <Grid size={4} className='mt-1'>
                                                <label className='inputLabel'>Skype ID:</label>
                                                <TextField fullWidth className='mt-1'
                                                    id="skypeId"
                                                    name="skypeId"
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    value={formik.values.skypeId}
                                                    onChange={formik.handleChange}
                                                />
                                            </Grid>
                                            <Grid size={4} className='mt-1'>
                                                <label className='inputLabel'>LinkedIn Profile:</label>
                                                <TextField fullWidth className='mt-1'
                                                    id="linkedInProfile"
                                                    name="linkedInProfile"
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    value={formik.values.linkedInProfile}
                                                    onChange={formik.handleChange}
                                                />
                                            </Grid>
                                            <Grid size={4} className='mt-1'>
                                                <label className='inputLabel'>Best Time to Call:</label>
                                                <TextField fullWidth className='mt-1'
                                                    id="bestTimeToCall"
                                                    name="bestTimeToCall"
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    value={formik.values.bestTimeToCall}
                                                    onChange={formik.handleChange}
                                                />
                                            </Grid>
                                            <Grid size={4} className='mt-1'>
                                                <label className='inputLabel'>Candidate Visa Status</label>
                                                <TextField fullWidth className='mt-1'
                                                    id="candidateVisaStatus"
                                                    name="candidateVisaStatus"
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    value={formik.values.candidateVisaStatus}
                                                    onChange={formik.handleChange}
                                                />
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<Fragment>
                                            <AddIcon className="add" />
                                            <RemoveIcon className="remove" />
                                        </Fragment>}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>EDUCATION</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container spacing={2} className="mb-1">
                                            <Grid size={6} className='mt-1 '>
                                                <label className='inputLabel'>Highest Education Completed:</label>
                                                <TextField fullWidth className='mt-1'
                                                    id="highestEducationCompleted"
                                                    name="highestEducationCompleted"
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    select
                                                    label="PHDd"
                                                    defaultValue={""}
                                                    value={formik.values.highestEducationCompleted}
                                                    onChange={formik.handleChange}
                                                >
                                                    <MenuItem value="GED">GED</MenuItem>
                                                    <MenuItem value="High School">High School</MenuItem>
                                                    <MenuItem value="Associates">Associates</MenuItem>
                                                    <MenuItem value="Bachelors">Bachelors</MenuItem>
                                                    <MenuItem value="Masters">Masters</MenuItem>
                                                    <MenuItem value="PHDd">PHDd</MenuItem>
                                                </TextField>
                                            </Grid>
                                            <Grid size={6} className='mt-1'>
                                                <label className='inputLabel'>Year of Graduation</label>
                                                <TextField fullWidth className='mt-1'
                                                    id="yearOfGraduation"
                                                    name="yearOfGraduation"
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    label="2023"
                                                    value={formik.values.yearOfGraduation}
                                                    onChange={formik.handleChange}
                                                />
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<Fragment>
                                            <AddIcon className="add" />
                                            <RemoveIcon className="remove" />
                                        </Fragment>}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>EMPLOYMENT INFORMATION</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container spacing={2} className="mb-1">
                                            <Grid container
                                                direction="row"
                                                justifyContent="flex-start"
                                                alignItems="center" item size={12} className='mt-1'>
                                                <label className='inputLabel'>Has the candidate worked previously at the client:</label>
                                                <FormControl className='ml-5'>
                                                    <RadioGroup row
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        onChange={(e) => formik.setFieldValue('worked_previous', e.target.value)}
                                                    >
                                                        <FormControlLabel value="yes" control={<Radio />} label={<div className='inputLabel'>Yes</div>} />
                                                        <FormControlLabel value="no" control={<Radio />} label={<div className='inputLabel'>No</div>} />
                                                    </RadioGroup>
                                                </FormControl>
                                            </Grid>
                                            <Grid size={4}>
                                                <FormControl fullWidth>
                                                    <label className='input-label mb-2'>Date of Employment</label>
                                                    <LocalizationProvider dateAdapter={AdapterLuxon}>
                                                        <DatePicker
                                                            label={
                                                                <Fragment>
                                                                    From (MM/DD/YYYY)
                                                                </Fragment>
                                                            }
                                                            slotProps={{ textField: { size: 'small' } }}
                                                        />
                                                    </LocalizationProvider>
                                                </FormControl>
                                            </Grid>
                                            <Grid size={4}>
                                                <FormControl fullWidth style={{ marginTop: '20px' }}>
                                                    <LocalizationProvider dateAdapter={AdapterLuxon}>
                                                        <DatePicker
                                                            label={
                                                                <Fragment>
                                                                    To (MM/DD/YYYY)

                                                                </Fragment>
                                                            }
                                                            slotProps={{ textField: { size: 'small' } }}
                                                        />
                                                    </LocalizationProvider>
                                                </FormControl>
                                            </Grid>
                                            <Grid size={4}>
                                                <label className='inputLabel'>Previously worked as:</label>
                                                <TextField fullWidth className='mt-1'
                                                    id="previouslyWorkedAs"
                                                    name="previouslyWorkedAs"
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    select
                                                    defaultValue={""}
                                                    value={formik.values.previouslyWorkedAs}
                                                    onChange={formik.handleChange}
                                                >
                                                    <MenuItem value="Contractor">Contractor</MenuItem >
                                                    <MenuItem value="Employee">Employee</MenuItem >
                                                </TextField>
                                            </Grid>
                                            <Grid size={4} className='mt-1'>
                                                <label className='inputLabel'>Reporting Manager:</label>
                                                <TextField fullWidth className='mt-1'
                                                    id="reportingManager"
                                                    name="reportingManager"
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    value={formik.values.reportingManager}
                                                    onChange={formik.handleChange}
                                                />
                                            </Grid>
                                            <Grid size={4} className='mt-1'>
                                                <label className='inputLabel'>Manager Phone:</label>
                                                <TextField fullWidth className='mt-1'
                                                    id="managerPhone"
                                                    name="managerPhone"
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    value={formik.values.managerPhone}
                                                    onChange={formik.handleChange}
                                                />
                                            </Grid>
                                            <Grid size={4} className='mt-1'>
                                                <label className='inputLabel'>Manager Email:</label>
                                                <TextField fullWidth className='mt-1'
                                                    id="managerEmail"
                                                    name="Manager Email"
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    value={formik.values.managerEmail}
                                                    onChange={formik.handleChange}
                                                />
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<Fragment>
                                            <AddIcon className="add" />
                                            <RemoveIcon className="remove" />
                                        </Fragment>}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>MOTIVATION</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container rowSpacing={1}>
                                            <Grid size={6} container
                                                direction="row"
                                                justifyContent="flex-start"
                                                alignItems="flex-end" className='mt-1'>
                                                <label className='inputLabel'>Why is the candidate looking for a new assignment?</label>
                                                <textarea
                                                    className="textarea"
                                                    id="newAssignment" name="newAssignment" value={formik.values.newAssignment}
                                                    onChange={formik.handleChange}
                                                />
                                            </Grid>
                                            <Grid size={6} className="pl-5">
                                                <label className='inputLabel'>Is this candidate currently working ?</label>
                                                <TextField fullWidth className='mt-1'
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    select
                                                    id="currentlyWorking"
                                                    name="currentlyWorking"
                                                    defaultValue={""}
                                                    value={formik.values.currentlyWorking}
                                                    onChange={formik.handleChange}
                                                >
                                                    <MenuItem value="Working">Working</MenuItem >
                                                    <MenuItem value="Not Working">Not Working</MenuItem >
                                                    <MenuItem value="In between Assignments">In between
                                                        Assignments</MenuItem >
                                                </TextField>
                                                <label className='inputLabel'>Is the current/ most recent position contract or perm?</label>
                                                <TextField fullWidth className='mt-1'
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    select
                                                    id="position"
                                                    name="position"
                                                    defaultValue={""}
                                                    value={formik.values.position}
                                                    onChange={formik.handleChange}
                                                >
                                                    <MenuItem value="Contract">Contract</MenuItem >
                                                    <MenuItem value="Perm">Perm</MenuItem >
                                                </TextField>
                                                <label className='inputLabel'>When is/ was the end date of the most recent assignment?</label>
                                                <TextField fullWidth className='mt-1'
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    select
                                                    label="MM/DD/YYYY"
                                                    id="endDate"
                                                    name="endDate"
                                                    defaultValue={""}
                                                    value={formik.values.endDate}
                                                    onChange={formik.handleChange}
                                                >
                                                    <MenuItem value="other">other</MenuItem>
                                                </TextField>
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<Fragment>
                                            <AddIcon className="add" />
                                            <RemoveIcon className="remove" />
                                        </Fragment>}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>OTHER OPPORTUNITIES</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container rowSpacing={1} >
                                            <Grid size={12}>
                                                <label className='inputLabel'>Is the candidate close to an offer: Possibility of getting a job offer soon (been interviewing with several companies for the past two weeks). Why would he take this job. Where does he rate this position in his search.</label>
                                                <textarea className='textarea mt-1' id="offer" name="offer" value={formik.values.offer}
                                                    onChange={formik.handleChange}></textarea>
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<Fragment>
                                            <AddIcon className="add" />
                                            <RemoveIcon className="remove" />
                                        </Fragment>}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>AVAILABILITY</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container spacing={1}>
                                            <Grid size={6} container
                                                direction="row"
                                                justifyContent="flex-start"
                                                alignItems="flex-end">
                                                <label className='inputLabel'>Availability to start a new assignment?</label>
                                                <TextField fullWidth className='mt-1'
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    select
                                                    id="availability"
                                                    name="availability"
                                                    defaultValue={""}
                                                    value={formik.values.availability}
                                                    onChange={formik.handleChange}
                                                >
                                                    <MenuItem value="immediately">Immediately</MenuItem >
                                                    <MenuItem value="2 weeks">2 weeks</MenuItem >
                                                    <MenuItem value="More than 2 weeks">More than 2 weeks</MenuItem >
                                                </TextField>
                                            </Grid>
                                            <Grid size={6} className="pl-5">
                                                <label className='inputLabel'>Are there any vacations planned in within next 90 days</label>
                                                <FormControl>
                                                    <RadioGroup row
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        onChange={(e) => formik.setFieldValue('vacation_planned', e.target.value)}
                                                    >
                                                        <FormControlLabel value="yes" control={<Radio />} label={<div className='inputLabel'>Yes</div>} />
                                                        <FormControlLabel value="no" control={<Radio />} label={<div className='inputLabel'>No</div>} />
                                                    </RadioGroup>
                                                </FormControl>
                                            </Grid>
                                            <Grid size={12} className='mt-1'>
                                                <label className='inputLabel'>If Yes, Provide details:</label>
                                                <textarea className='textarea mt-1' id="details" name="details" value={formik.values.vacDetails}
                                                    onChange={formik.handleChange} ></textarea>
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<Fragment>
                                            <AddIcon className="add" />
                                            <RemoveIcon className="remove" />
                                        </Fragment>}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>TECHNICAL COMPETENCY </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Card>
                                            <CardContent>
                                                <Grid container spacing={1} columns={16} className="mb-1">
                                                    <Grid size={4} className='mt-1'>
                                                        <label className='inputLabel'>Skill:</label>
                                                        <TextField fullWidth className='mt-1'
                                                            variant="outlined"
                                                            type="text"
                                                            size="small"
                                                            label="AWS"
                                                            id="skill"
                                                            name="skill"
                                                            value={formik.values.skill}
                                                            onChange={formik.handleChange}
                                                        />
                                                    </Grid>
                                                    <Grid size={5} className='mt-1'>
                                                        <label className='inputLabel'>Years of Experience:</label>
                                                        <TextField fullWidth className='mt-1'
                                                            variant="outlined"
                                                            type="text"
                                                            size="small"
                                                            id="yearsOfExperience"
                                                            name="yearsOfExperience"
                                                            value={formik.values.yearsOfExperience}
                                                            onChange={formik.handleChange}
                                                        />
                                                    </Grid>
                                                    <Grid size={3} className='mt-1'>
                                                        <label className='inputLabel'>Last Used:</label>
                                                        <TextField fullWidth className='mt-1'
                                                            variant="outlined"
                                                            type="text"
                                                            size="small"
                                                            id="lastUsed"
                                                            name="lastUsed"
                                                            value={formik.values.lastUsed}
                                                            onChange={formik.handleChange}
                                                        />
                                                    </Grid>
                                                    <Grid size={4} className='mt-1'>
                                                        <label className='inputLabel'>Proficiency</label>
                                                        <TextField fullWidth className='mt-1'
                                                            variant="outlined"
                                                            type="text"
                                                            size="small"
                                                            select
                                                            id="proficiency"
                                                            name="proficiency"
                                                            defaultValue={""}
                                                            value={formik.values.proficiency}
                                                            onChange={formik.handleChange}
                                                        >
                                                            <MenuItem value="Beginner">Beginner</MenuItem >
                                                            <MenuItem value="Intermediate">Intermediate</MenuItem >
                                                            <MenuItem value="Expert">Expert</MenuItem >
                                                        </TextField>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<Fragment>
                                            <AddIcon className="add" />
                                            <RemoveIcon className="remove" />
                                        </Fragment>}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>SOFT SKILLS </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <TextField fullWidth className='mt-1'
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            select
                                        >
                                            <MenuItem value="other">other</MenuItem>
                                        </TextField>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<Fragment>
                                            <AddIcon className="add" />
                                            <RemoveIcon className="remove" />
                                        </Fragment>}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>PREQUISITES</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container direction="row"
                                            justifyContent="flex-start"
                                            alignItems="flex-end" spacing={1}>
                                            <Grid size={6}>
                                                <label className='inputLabel'>Does the candidate has any Felony/Misdemeanor/Criminal History?</label>
                                                <textarea className="textarea mt-1"
                                                    id="felony" name="felony" value={formik.values.felony}
                                                    onChange={formik.handleChange} />
                                            </Grid>

                                            <Grid size={6} className="pl-5">
                                                <label className='inputLabel'>Is the Candidate open for Drug Test and Background Check, does he anticipate any problem with that?</label>
                                                <textarea className="textarea mt-1" id="backgroundCheck" name="backgroundCheck" value={formik.values.backgroundCheck}
                                                    onChange={formik.handleChange}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2} className="mb-1">
                                            <Grid container
                                                direction="row"
                                                justifyContent="flex-start"
                                                alignItems="center" item size={12} className='mt-1'>
                                                <label className='inputLabel'>Has this candidate been submitted for this position through another vendor?</label>
                                                <FormControl className='ml-5'>
                                                    <RadioGroup row
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        onChange={(e) => formik.setFieldValue('anotherVendor', e.target.value)}
                                                    >
                                                        <FormControlLabel value="yes" control={<Radio />} label={<div className='inputLabel'>Yes</div>} />
                                                        <FormControlLabel value="no" control={<Radio />} label={<div className='inputLabel'>No</div>} />
                                                    </RadioGroup>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<Fragment>
                                            <AddIcon className="add" />
                                            <RemoveIcon className="remove" />
                                        </Fragment>}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>DOCUMENTS</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container spacing={1} className="mb-1">
                                            <Grid size={3} className='mt-1'>
                                                <label className='inputLabel'>Select Resume</label>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={1} className="mb-1">
                                            <Grid size={4} className='mt-1'>
                                                <label className='inputLabel'>Available documents</label>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={1} className="mb-1">
                                            <Grid size={6} className='mt-1'>
                                                <label className='inputLabel'>Additional Attachments</label>
                                                <TextField fullWidth className='mt-1'
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    label="choose file"
                                                    id="additionalAttachments"
                                                    name="additionalAttachments"
                                                    value={formik.values.additionalAttachments}
                                                    onChange={formik.handleChange}
                                                />
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className="acc-title">EMPLOYER INFORMATION</Typography>
                            </AccordionSummary>
                            <AccordionDetails className="subAccordians">
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<Fragment>
                                            <AddIcon className="add" />
                                            <RemoveIcon className="remove" />
                                        </Fragment>}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>EMPLOYER INFORMATION</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container spacing={2} className="mb-1">
                                            <Grid size={4} className='mt-1'>
                                                <label className='inputLabel'>Employer Name:</label>
                                                <TextField fullWidth className='mt-1'
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    id="employerName" name="employerName"
                                                    value={formik.values.employerName}
                                                    onChange={formik.handleChange}
                                                />
                                            </Grid>
                                            <Grid size={3} className='mt-1'>
                                                <label className='inputLabel'>Contact Name:</label>
                                                <TextField fullWidth className='mt-1'
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    id="contactName" name="contactName"
                                                    value={formik.values.contactName}
                                                    onChange={formik.handleChange}
                                                />
                                            </Grid>
                                            <Grid size={5} className='mt-1'>
                                                <label className='inputLabel'>Contact Phone Number:</label>
                                                <TextField fullWidth className='mt-1'
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    id="contactPhoneNumber"
                                                    name="contactPhoneNumber"
                                                    value={formik.values.contactPhoneNumber}
                                                    onChange={formik.handleChange}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2} className="mb-1">
                                            <Grid container
                                                direction="row"
                                                justifyContent="flex-start"
                                                alignItems="flex-end" item size={4} className='mt-1'>
                                                <label className='inputLabel'>Contact Email:</label>
                                                <TextField fullWidth className='mt-1'
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    id="contactEmail"
                                                    name="contactEmail"
                                                    value={formik.values.contactEmail}
                                                    onChange={formik.handleChange}
                                                />
                                            </Grid>
                                            <Grid size={4} className='mt-1'>
                                                <FormControl>
                                                    <label className='inputLabel mt-1'>Signed MSA:</label>
                                                    <RadioGroup row
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        onChange={(e: any) => formik.setFieldValue("signed", e.target.value)}
                                                    >
                                                        <FormControlLabel value="yes" control={<Radio />} label={<div className='inputLabel'>Yes</div>} />
                                                        <FormControlLabel value="no" control={<Radio />} label={<div className='inputLabel'>No</div>} />
                                                    </RadioGroup>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<Fragment>
                                            <AddIcon className="add" />
                                            <RemoveIcon className="remove" />
                                        </Fragment>}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>GAPS IN EMPLOYMENT</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container spacing={2}>
                                            <Grid size={3}>
                                                <label className='inputLabel'>Dates of Gap:</label>
                                                <FormControl fullWidth >
                                                    <LocalizationProvider dateAdapter={AdapterLuxon}>
                                                        <DatePicker
                                                            label={
                                                                <Fragment>
                                                                    From (MM/DD/YYYY)
                                                                </Fragment>
                                                            }
                                                            slotProps={{ textField: { size: 'small' } }}
                                                        />
                                                    </LocalizationProvider>
                                                </FormControl>
                                            </Grid>
                                            <Grid size={3} >
                                                <FormControl fullWidth style={{ marginTop: '20px' }}>
                                                    <LocalizationProvider dateAdapter={AdapterLuxon}>
                                                        <DatePicker
                                                            label={
                                                                <Fragment>
                                                                    To (MM/DD/YYYY)

                                                                </Fragment>
                                                            }
                                                            slotProps={{ textField: { size: 'small' } }}
                                                        />
                                                    </LocalizationProvider>
                                                </FormControl>
                                            </Grid>
                                            <Grid container
                                                direction="row"
                                                justifyContent="flex-start"
                                                alignItems="flex-end" item size={6} >
                                                <label className='inputLabel'>Explanation :</label>
                                                <TextareaAutosize id="explanation"
                                                    name="explanation"
                                                    value={formik.values.explanation}
                                                    onChange={formik.handleChange}
                                                    aria-label="minimum height"
                                                    minRows={2}
                                                    // placeholder="Minimum 3 rows"
                                                    style={{ width: '100%' }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className="acc-title">REFERENCE DETAILS</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={1}>
                                    <Grid size={6} className='mt-1'>
                                        <label className='inputLabel'>Company Name</label>
                                        <TextField fullWidth className='mt-1'
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            id="companyName"
                                            name="companyName"
                                            value={formik.values.companyName}
                                            onChange={formik.handleChange}
                                        />
                                    </Grid>
                                    <Grid size={6} className='mt-1'>
                                        <label className='inputLabel'>Position Title</label>
                                        <TextField fullWidth className='mt-1'
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            id="positionTitle"
                                            name="positionTitle"
                                            value={formik.values.positionTitle}
                                            onChange={formik.handleChange}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1}>
                                    <Grid size={6} className='mt-1'>
                                        <label className='inputLabel'>Manager Name</label>
                                        <TextField fullWidth className='mt-1'
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            id="managerName"
                                            name="managerName"
                                            value={formik.values.managerName}
                                            onChange={formik.handleChange}
                                        />
                                    </Grid>
                                    <Grid size={6} className='mt-1'>
                                        <label className='inputLabel'>Manager Email</label>
                                        <TextField fullWidth className='mt-1'
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            id="managerEmailInRef"
                                            name="managerEmailInRef"
                                            value={formik.values.managerEmailInRef}
                                            onChange={formik.handleChange}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1}>
                                    <Grid size={6} className='mt-1'>
                                        <label className='inputLabel'>Manager Phone</label>
                                        <TextField fullWidth className='mt-1'
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            id="managerPhoneInRef"
                                            name="managerPhoneInRef"
                                            value={formik.values.managerPhone}
                                            onChange={formik.handleChange}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid size={3} className='mt-2'>
                                        <FormControl fullWidth>
                                            <label className="input-label mb-2">Date:</label>
                                            <LocalizationProvider dateAdapter={AdapterLuxon}>
                                                <DatePicker
                                                    label={
                                                        <Fragment>
                                                            From (MM/DD/YYYY)
                                                        </Fragment>
                                                    }
                                                    slotProps={{ textField: { size: 'small' } }}
                                                    onChange={(d: any) => formik.setFieldValue('refFromDate', d?.toFormat('MM-dd-yyyy'))}
                                                />
                                            </LocalizationProvider>
                                        </FormControl>
                                    </Grid>
                                    <Grid size={3} >
                                        <FormControl fullWidth style={{ marginTop: '30px' }}>
                                            <LocalizationProvider dateAdapter={AdapterLuxon}>
                                                <DatePicker
                                                    label={
                                                        <Fragment>
                                                            To (MM/DD/YYYY)

                                                        </Fragment>
                                                    }
                                                    slotProps={{ textField: { size: 'small' } }}
                                                    onChange={(d: any) => formik.setFieldValue('refToDate', d?.toFormat('MM-dd-yyyy'))}
                                                />
                                            </LocalizationProvider>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className="acc-title">SUBMISSION DETAILS</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={1}>
                                    <Grid size={12} className='mt-1'>
                                        <label className='inputLabel'>Candidate Summary</label>
                                        <textarea className='textarea mt-1' id="candidateSummary"
                                            name="candidateSummary"
                                            value={formik.values.candidateSummary}
                                            onChange={formik.handleChange} ></textarea>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} className="mb-1">
                                    <Grid size={4} className='mt-1'>
                                        <label className='inputLabel'>Candidate Source:</label>
                                        <TextField fullWidth className='mt-1'
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            select
                                            id="candidateSource"
                                            name="candidateSource"
                                            defaultValue={""}
                                            value={formik.values.candidateSource}
                                            onChange={formik.handleChange}
                                        >
                                            <MenuItem value="Monster">Monster</MenuItem >
                                            <MenuItem value="Careerbuilder">Careerbuilder</MenuItem >
                                            <MenuItem value="Linkedin">Linkedin</MenuItem >
                                            <MenuItem value="Indeed">Indeed</MenuItem >
                                            <MenuItem value="Sub vendor">Sub vendor</MenuItem >
                                            <MenuItem value="Referral">Referral</MenuItem >
                                            <MenuItem value="Applicant">Applicant</MenuItem >
                                        </TextField>
                                    </Grid>
                                    <Grid size={4} className='mt-1'>
                                        <label className='inputLabel'>Sourced By</label>
                                        <TextField fullWidth className='mt-1'
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            id="sourcedBy"
                                            name="sourcedBy"
                                            value={formik.values.sourcedBy}
                                            onChange={formik.handleChange}
                                        />
                                    </Grid>
                                    <Grid size={4} className='mt-1'>
                                        <label className='inputLabel'>SID </label>
                                        <TextField fullWidth className='mt-1'
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            id="sid"
                                            name="sid"
                                            value={formik.values.sid}
                                            onChange={formik.handleChange}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} className="mb-1">
                                    <Grid size={4} className='mt-1'>
                                        <label className='inputLabel'>Pay Rate:</label>
                                        <TextField fullWidth className='mt-1'
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            select
                                            id="payRate"
                                            name="payRate"
                                            defaultValue={""}
                                            value={formik.values.payRate}
                                            onChange={formik.handleChange}
                                        >
                                            <MenuItem value="Hourly">Hourly</MenuItem>
                                            <MenuItem value="Weekly">Weekly</MenuItem>
                                            <MenuItem value="Yearly">Yearly</MenuItem>
                                        </TextField>
                                    </Grid>
                                    <Grid size={4} className='mt-1'>
                                        <label className='inputLabel'>Amount</label>
                                        <TextField fullWidth className='mt-1'
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            id="amount"
                                            name="amount"
                                            value={formik.values.amount}
                                            onChange={formik.handleChange}
                                        />
                                    </Grid>
                                    <Grid size={4} className='mt-1'>
                                        <label className='inputLabel'>Tax Terms</label><span style={{ color: 'red' }}> * </span>
                                        <TextField fullWidth className='mt-1'
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            select
                                            id="taxTerms"
                                            name="taxTerms"
                                            defaultValue={""}
                                            value={formik.values.taxTerms}
                                            onChange={formik.handleChange}
                                        >
                                            <MenuItem value="W2">W2</MenuItem >
                                            <MenuItem value="C2C">C2C</MenuItem >
                                        </TextField>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} className="mb-1">
                                    <Grid size={6} className='mt-1'>
                                        <label className='inputLabel'>Current Location :</label>
                                        <TextField fullWidth className='mt-1'
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            id="currentLocation"
                                            name="currentLocation"
                                            value={formik.values.currentLocation}
                                            onChange={formik.handleChange}
                                        />
                                    </Grid>
                                    <Grid size={6} className='mt-1'>
                                        <label className='inputLabel'>Job Location :</label>
                                        <TextField fullWidth className='mt-1'
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            id="jobLocation"
                                            name="jobLocation"
                                            value={formik.values.jobLocation}
                                            onChange={formik.handleChange}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} className="mb-1">
                                    <Grid size={6} className='mt-1'>
                                        <label className='inputLabel'>Distance from Job Location :</label>
                                        <TextField fullWidth className='mt-1'
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            id="distance"
                                            name="distance"
                                            value={formik.values.distance}
                                            onChange={formik.handleChange}
                                        />
                                    </Grid>
                                    <Grid size={6} container
                                        direction="row"
                                        justifyContent="flex-start"
                                        alignItems="flex-end" className='mt-1'>
                                        <FormControl>
                                            <RadioGroup row
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                onChange={(e) => formik.setFieldValue('local', e.target.value)}
                                            >
                                                <FormControlLabel value="yes" control={<Radio />} label={<div className='inputLabel'>Local</div>} />
                                                <FormControlLabel value="no" control={<Radio />} label={<div className='inputLabel'>Non-Local</div>} />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} className="mb-1">
                                    <Grid size={6} className='mt-1'>
                                        <label className='inputLabel'>Recipient :</label><span style={{ color: 'red' }}> * </span>
                                        <TextField fullWidth className='mt-1'
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            id="recipient"
                                            name="recipient"
                                            value={formik.values.recipient}
                                            onChange={formik.handleChange}
                                        />
                                    </Grid>
                                    <Grid size={6} className='mt-1'>
                                        <label className='inputLabel mb-1'>Other Email ID's:</label>
                                        <TextField fullWidth className='mt-1'
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            id="otherEmailID"
                                            name="otherEmailID"
                                            value={formik.values.otherEmailID}
                                            onChange={formik.handleChange}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1}>
                                    <Grid size={12} className='mt-1'>
                                        <label className='inputLabel'>Comments</label>
                                        <textarea className='textarea mt-1'></textarea>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    </div>


                </DialogContent >
                <DialogActions>
                    <Button
                        color="primary"
                        onClick={saveInternalSubmission}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog >
        </form >
    )
}

export default InternalSubmission;