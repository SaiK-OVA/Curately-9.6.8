import { useState, Fragment } from "../../../../../../../../shared/modules/React";
import { Dialog, DialogTitle, DialogContent, DialogActions } from '../../../../../../../../shared/modules/MaterialImports/Dialog';
import { Grid, IconButton, Button } from '../../../../../../../../shared/modules/commonImports';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary }  from '../../../../../../../../shared/modules/MaterialImports/Accordion';
import { Typography } from '../../../../../../../../shared/modules/MaterialImports/Typography';
import { TextField, FormControlLabel, FormControl } from '../../../../../../../../shared/modules/MaterialImports/FormInputs';
import { MenuItem } from '../../../../../../../../shared/modules/MaterialImports/Menu';
import { Radio, RadioGroup, Checkbox } from '../../../../../../../../shared/modules/MaterialImports/FormElements';
import { Stack } from '../../../../../../../../shared/modules/MaterialImports/Stack';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { useFormik, Yup } from "../../../../../../../../shared/modules/Formik";
import { DatePicker, AdapterLuxon, LocalizationProvider } from '../../../../../../../../shared/modules/MaterialImports/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { MUIAutoComplete } from "../../../../../../../shared/MUIAutoComplete/MUIAutoComplete";
import { DateTime } from "../../../../../../../../shared/modules/Luxon";
import { userLocalData } from "../../../../../../../../shared/services/userData";

import './InitiateOnboard.scss';

const InitiateOnboard = (
    { dialogOpen, handleDialogClose, recruiter }: { dialogOpen: boolean, handleDialogClose: any, recruiter: any }
) => {
    const [assignedTo, setAssignedTo] = useState("");
    const [actionDate, setActionDate] = useState("");
    const [actionTime, setActionTime] = useState("");

    const initialValues = {

        sourceId: "",
        subVendorName: "",
        subVendorEmailId: "",
        firstName: "",
        middleName: "",
        lastName: "",
        emailId: "",
        phoneNo: "",
        citizenShipOtherName: "",
        address: "",
        apartmentSuiteNumber: "",
        city: "",
        state: "",
        zipcode: "",
        jobCategory: "",
        jobType: "",
        jobTitle: "",
        jobId: "",
        accountManagerName: "",
        accountManagerEmailId: "",
        sourcerName: "",
        recruiterName: "",
        recruiterEmailId: "",
        portfolioManager: "",
        notes: "",
        clientId: "",
        durationOfTheContract: "",
        tentiveStartDate: "",
        tentiveEndDate: "",
        clientCity: "",
        clientState: "",
        clientZipcode: "",
        exemptType: "",
        payRate: "",
        billRate: "",
        otRate: "",
        otbillRate: "",
        doubleTimeRate: "",
        doubleTimeBillRate: "",
        perdiemRate: "",
        perdiem: "",
        mileageReimbursement: ""
    }
    const validationSchema = Yup.object({
        sourceId: Yup.string(),
        subVendorName: Yup.string(),
        subVendorEmailId: Yup.string(),
        firstName: Yup.string(),
        middleName: Yup.string(),
        lastName: Yup.string(),
        emailId: Yup.string(),
        phoneNo: Yup.string(),
        citizenShipOtherName: Yup.string(),
        address: Yup.string(),
        apartmentSuiteNumber: Yup.string(),
        city: Yup.string(),
        state: Yup.string(),
        zipcode: Yup.string(),
        jobCategory: Yup.string(),
        jobType: Yup.string(),
        jobTitle: Yup.string(),
        jobId: Yup.string(),
        accountManagerName: Yup.string(),
        accountManagerEmailId: Yup.string(),
        sourcerName: Yup.string(),
        recruiterName: Yup.string(),
        recruiterEmailId: Yup.string(),
        portfolioManager: Yup.string(),
        notes: Yup.string(),
        clientId: Yup.string(),
        durationOfTheContract: Yup.string(),
        tentiveStartDate: Yup.string(),
        tentiveEndDate: Yup.string(),
        clientCity: Yup.string(),
        clientState: Yup.string(),
        clientZipcode: Yup.string(),
        exemptType: Yup.string(),
        payRate: Yup.string(),
        billRate: Yup.string(),
        otRate: Yup.string(),
        otbillRate: Yup.string(),
        doubleTimeRate: Yup.string(),
        doubleTimeBillRate: Yup.string(),
        perdiemRate: Yup.string(),
        perdiem: Yup.string(),
        mileageReimbursement: Yup.string()
    });

    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            // console.log(values)

        },
        validationSchema,
    });
    const saveInitiateOnboard = () => {
        // console.log(formik.values);
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

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Dialog
                    maxWidth={'md'}
                    fullWidth={true} open={dialogOpen} className='AddJobModal customInputs'
                    id='intiateOnboard'
                >
                    <DialogTitle className="header">
                        <span className='addHeader'>Initiate Onboard</span>
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
                                <label className="inputLabel">Taking action on behalf of <span style={{ color: 'red' }}>*</span></label>
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
                                        value={actionDate ? DateTime.fromISO(actionDate) : null}
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
                        <div className="accordianWrap">
                            <Accordion defaultExpanded={true}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>Candidate Details </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container spacing={2} className="mb-1">
                                        <Grid size={6} className='mt-1'>
                                            <label className='inputLabel'>Hire Category<span style={{ color: 'red' }}>*</span></label>

                                            <FormControl>
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    name="row-radio-buttons-group"
                                                >
                                                    <FormControlLabel value="W2" control={<Radio />} label="W2" />
                                                    <FormControlLabel value="C2C" control={<Radio />} label="C2C" />
                                                    <FormControlLabel value="1099" control={<Radio />} label="1099" />

                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                        <Grid size={6} className='mt-1'>
                                            <label className='inputLabel'>Source</label><span style={{ color: 'red' }}>*</span>
                                            <TextField fullWidth className='mt-1'
                                                size="small"
                                                id="sourceId"
                                                name='sourceId'
                                                variant="outlined"
                                                select
                                                defaultValue={""}
                                                value={formik.values.sourceId}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            >
                                                <MenuItem value="" selected disabled ></MenuItem>
                                                <MenuItem value="1">Career Builder</MenuItem>
                                                <MenuItem value="29">Dice</MenuItem>
                                                <MenuItem value="6">Employee Referral</MenuItem>
                                                <MenuItem value="4">Indeed</MenuItem>
                                                <MenuItem value="5">Linked In</MenuItem>
                                                <MenuItem value="28">Monster</MenuItem>
                                                <MenuItem value="27">Naukri</MenuItem>
                                                <MenuItem value="19">Referal</MenuItem>
                                                <MenuItem value="31">others</MenuItem>
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} className="mb-1">
                                        <Grid size={4} className='mt-1'>
                                            <label className='inputLabel'>Sub Vendor Name</label><span style={{ color: 'red' }}>*</span>
                                            <TextField fullWidth className='mt-1'
                                                id="subVendorName"
                                                name="subVendorName"
                                                variant="outlined"
                                                type="text"
                                                size="small"
                                                value={formik.values.subVendorName}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur} />
                                        </Grid>
                                        <Grid size={4} className='mt-1'>
                                            <label className='inputLabel'>Sub Vendor Email</label><span style={{ color: 'red' }}>*</span>
                                            <TextField fullWidth className='mt-1'
                                                size="small"
                                                id="subVendorEmailId"
                                                name='subVendorEmailId'
                                                variant="outlined"
                                                value={formik.values.subVendorEmailId}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            >
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} className="mb-1">
                                        <Grid size={4} className='mt-1'>
                                            <label className='inputLabel'>First Name</label><span style={{ color: 'red' }}>*</span>
                                            <TextField fullWidth className='mt-1'
                                                id="firstName"
                                                name="firstName"
                                                variant="outlined"
                                                type="text"
                                                size="small"
                                                value={formik.values.firstName}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                        </Grid>
                                        <Grid size={4} className='mt-1'>
                                            <label className='inputLabel'>Middle Name</label>
                                            <TextField fullWidth className='mt-1'
                                                size="small"
                                                id="middleName"
                                                name='middleName'
                                                variant="outlined"
                                                value={formik.values.middleName}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            >
                                            </TextField>
                                        </Grid>
                                        <Grid size={4} className='mt-1'>
                                            <label className='inputLabel'>Last Name</label><span style={{ color: 'red' }}>*</span>
                                            <TextField fullWidth className='mt-1'
                                                size="small"
                                                id="lastName"
                                                name='lastName'
                                                variant="outlined"
                                                value={formik.values.lastName}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            >
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} className="mb-1">
                                        <Grid size={4} className='mt-1'>
                                            <label className='inputLabel'>Email ID</label><span style={{ color: 'red' }}>*</span>
                                            <TextField fullWidth className='mt-1'
                                                id="emailId"
                                                name="emailId"
                                                variant="outlined"
                                                type="text"
                                                size="small"
                                                value={formik.values.emailId}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                        </Grid>
                                        <Grid size={4} className='mt-1'>
                                            <label className='inputLabel'>Phone</label><span style={{ color: 'red' }}>*</span>
                                            <TextField fullWidth className='mt-1'
                                                size="small"
                                                id="phoneNo"
                                                name='phoneNo'
                                                variant="outlined"
                                                value={formik.values.phoneNo}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            >
                                            </TextField>
                                        </Grid>
                                        <Grid size={4} className='mt-1'>
                                            <label className='inputLabel'>Citizenship</label><span style={{ color: 'red' }}>*</span>
                                            <TextField fullWidth className='mt-1'
                                                size="small"
                                                id="citizenShipOtherName"
                                                name='citizenShipOtherName'
                                                variant="outlined"
                                                select
                                                defaultValue={" "}
                                                value={formik.values.citizenShipOtherName}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            >
                                                <MenuItem value=" "></MenuItem>
                                                <MenuItem value="US Citizen">US Citizen</MenuItem>
                                                <MenuItem value="Green Card">Green Card</MenuItem>
                                                <MenuItem value="GC EAD">GC EAD</MenuItem>
                                                <MenuItem value="H1B">H1B</MenuItem>
                                                <MenuItem value="Others">Others</MenuItem>
                                            </TextField>
                                        </Grid>

                                    </Grid>
                                    <Stack
                                        direction="row"
                                        justifyContent="flex-end"
                                        alignItems="center"
                                        spacing={2}
                                    >

                                        <span style={{ color: 'red' }}>**</span>Please verify all information prior to submitting.
                                    </Stack>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion defaultExpanded={true}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography >Mailing Address</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container spacing={2} className="mb-1">
                                        <Grid size={8} className='mt-1'>
                                            <label className='inputLabel'>Address</label>
                                            <TextareaAutosize
                                                value={formik.values.address}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                aria-label="minimum height"
                                                minRows={3}
                                                // placeholder="Minimum 3 rows"
                                                style={{ width: '100%' }}
                                            />
                                        </Grid>
                                        <Grid size={4} className='mt-1'>
                                            <label className='inputLabel'>APT/STE</label>
                                            <TextField fullWidth className='mt-1'
                                                size="small"
                                                id="apartmentSuiteNumber"
                                                name='apartmentSuiteNumber'
                                                variant="outlined"
                                                value={formik.values.apartmentSuiteNumber}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            >
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} className="mb-1">
                                        <Grid size={4} className='mt-1'>
                                            <label className='inputLabel'>City</label>
                                            <TextField fullWidth className='mt-1'
                                                id="city"
                                                name="city"
                                                variant="outlined"
                                                type="text"
                                                size="small"
                                                value={formik.values.city}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                        </Grid>
                                        <Grid size={4} className='mt-1'>
                                            <label className='inputLabel'>State</label><span style={{ color: 'red' }}>*</span>
                                            <TextField fullWidth className='mt-1'
                                                size="small"
                                                id="state"
                                                name='state'
                                                variant="outlined"
                                                value={formik.values.state}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            >
                                            </TextField>
                                        </Grid>
                                        <Grid size={4} className='mt-1'>
                                            <label className='inputLabel'>Zipcode</label><span style={{ color: 'red' }}>*</span>
                                            <TextField fullWidth className='mt-1'
                                                size="small"
                                                id="zipcode"
                                                name='zipcode'
                                                variant="outlined"
                                                value={formik.values.zipcode}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            >
                                            </TextField>
                                        </Grid>
                                    </Grid>


                                </AccordionDetails>
                            </Accordion>
                            <Accordion defaultExpanded={true}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography >Job Details </Typography>
                                </AccordionSummary>
                                <AccordionDetails>

                                    <Grid container spacing={2} className="mb-1">
                                        <Grid size={4} className='mt-1'>
                                            <label className='inputLabel'>Job Category</label><span style={{ color: 'red' }}>*</span>
                                            <TextField fullWidth className='mt-1'
                                                id="jobCategory"
                                                name="jobCategory"
                                                variant="outlined"
                                                type="text"
                                                size="small"
                                                select
                                                value={formik.values.jobCategory}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            >
                                                <MenuItem value=""></MenuItem>
                                                <MenuItem value="IT">IT</MenuItem>
                                                <MenuItem value="NON-IT">NON-IT</MenuItem>
                                            </TextField>
                                        </Grid>
                                        <Grid size={4} className='mt-1'>
                                            <label className='inputLabel'>Job Type</label><span style={{ color: 'red' }}>*</span>
                                            <TextField fullWidth className='mt-1'
                                                size="small"
                                                id="jobType"
                                                name='jobType'
                                                variant="outlined"
                                                select
                                                value={formik.values.jobType}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            >
                                                <MenuItem value=""></MenuItem>
                                                <MenuItem value="Portal">Portal</MenuItem>
                                                <MenuItem value="P2R">P2R</MenuItem>
                                                <MenuItem value="Relationship">Relationship</MenuItem>
                                            </TextField>
                                        </Grid>
                                        <Grid size={4} className='mt-1'>
                                            <label className='inputLabel'>Job Title</label><span style={{ color: 'red' }}>*</span>
                                            <TextField fullWidth className='mt-1'
                                                size="small"
                                                id="jobTitle"
                                                name='jobTitle'
                                                variant="outlined"
                                                value={formik.values.jobTitle}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            >
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} className="mb-1">
                                        <Grid size={4} className='mt-1'>
                                            <label className='inputLabel'>Job Id</label>
                                            <TextField fullWidth className='mt-1'
                                                id="jobId"
                                                name="jobId"
                                                variant="outlined"
                                                type="text"
                                                size="small"
                                                value={formik.values.jobId}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                        </Grid>
                                        <Grid size={4} className='mt-1'>
                                            <label className='inputLabel'>Account Manager Name</label><span style={{ color: 'red' }}>*</span>
                                            <TextField fullWidth className='mt-1'
                                                size="small"
                                                id="accountManagerName"
                                                name='accountManagerName'
                                                variant="outlined"
                                                value={formik.values.accountManagerName}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            >
                                            </TextField>
                                        </Grid>
                                        <Grid size={4} className='mt-1'>
                                            <label className='inputLabel'>Account Manager Email</label><span style={{ color: 'red' }}>*</span>
                                            <TextField fullWidth className='mt-1'
                                                size="small"
                                                id="accountManagerEmailId"
                                                name='accountManagerEmailId'
                                                variant="outlined"
                                                value={formik.values.accountManagerEmailId}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            >
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} className="mb-1">
                                        <Grid size={4} className='mt-1'>
                                            <label className='inputLabel'>Sourcer Name</label>
                                            <TextField fullWidth className='mt-1'
                                                id="sourcerName"
                                                name="sourcerName"
                                                variant="outlined"
                                                type="text"
                                                size="small"
                                                value={formik.values.sourcerName}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                        </Grid>
                                        <Grid size={4} className='mt-1'>
                                            <label className='inputLabel'>Recruiter Name</label><span style={{ color: 'red' }}>*</span>
                                            <TextField fullWidth className='mt-1'
                                                size="small"
                                                id="recruiterName"
                                                name='recruiterName'
                                                variant="outlined"
                                                value={formik.values.recruiterName}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            >
                                            </TextField>
                                        </Grid>
                                        <Grid size={4} className='mt-1'>
                                            <label className='inputLabel'>Recruiter Email</label><span style={{ color: 'red' }}>*</span>
                                            <TextField fullWidth className='mt-1'
                                                size="small"
                                                id="recruiterEmailId"
                                                name='recruiterEmailId'
                                                variant="outlined"
                                                value={formik.values.recruiterEmailId}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            >
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} className="mb-1">
                                        <Grid size={4} className='mt-1'>
                                            <label className='inputLabel'>Portfolio Manager</label><span style={{ color: 'red' }}>*</span>
                                            <TextField fullWidth className='mt-1'
                                                size="small"
                                                id="portfolioManager"
                                                name='portfolioManager'
                                                variant="outlined"
                                                select
                                                value={formik.values.portfolioManager}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            >
                                                <MenuItem value=""></MenuItem>
                                                <MenuItem value="Mike Nocella">Mike Nocella</MenuItem>
                                                <MenuItem value="Fahad Khawaja">Fahad Khawaja</MenuItem>
                                                <MenuItem value="Jennifer Roberts">Jennifer Roberts</MenuItem>
                                                <MenuItem value="Greg Iannuzzi">Greg Iannuzzi</MenuItem>
                                                <MenuItem value="Tejal Fitch">Tejal Fitch</MenuItem>
                                                <MenuItem value="Lorena Fugedy">Lorena Fugedy</MenuItem>
                                            </TextField>
                                        </Grid>

                                    </Grid>
                                    <Grid container spacing={2} className="mb-1">
                                        <Grid size={12} className='mt-1'>
                                            <label className='inputLabel'>Notes:</label>
                                            <TextareaAutosize
                                                value={formik.values.notes}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                aria-label="minimum height"
                                                minRows={3}
                                                // placeholder="Minimum 3 rows"
                                                style={{ width: '100%' }}
                                            />
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion defaultExpanded={true}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>Client Details</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container spacing={2} className="mb-1">
                                        <Grid size={3} className='mt-1'>
                                            <label className='inputLabel'>Client Name</label><span style={{ color: 'red' }}>*</span>
                                            <TextField fullWidth className='mt-1'
                                                id="clientId"
                                                name="clientId"
                                                variant="outlined"
                                                type="text"
                                                size="small"
                                                select
                                                value={formik.values.clientId}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            >
                                                <MenuItem value="" selected disabled></MenuItem>
                                                <MenuItem value="112">ADP Inc</MenuItem>
                                                <MenuItem value="204">ADT</MenuItem>
                                                <MenuItem value="111">AG First</MenuItem>
                                                <MenuItem value="74">AON Hewitt</MenuItem>
                                                <MenuItem value="219">ASK In-house</MenuItem>
                                                <MenuItem value="113">AT&amp;T</MenuItem>
                                                <MenuItem value="72">Accenture</MenuItem>
                                                <MenuItem value="110">Adobe Systems</MenuItem>
                                                <MenuItem value="174">Alcon</MenuItem>
                                                <MenuItem value="109">Alight Solutions</MenuItem>
                                                <MenuItem value="119">Alnylam</MenuItem>
                                            </TextField>
                                        </Grid>
                                        <Grid size={3} className='mt-1'>
                                            <label className='inputLabel'>Duration of Contract(In Months)</label><span style={{ color: 'red' }}>*</span>
                                            <TextField fullWidth className='mt-1'
                                                size="small"
                                                id="durationOfTheContract"
                                                name='durationOfTheContract'
                                                variant="outlined"
                                                type='number'
                                                value={formik.values.durationOfTheContract}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            >
                                            </TextField>
                                        </Grid>
                                        <Grid size={3} className='mt-1'>
                                            <label className='inputLabel'>Tentaive Start Date</label>
                                            <LocalizationProvider dateAdapter={AdapterLuxon}>
                                                <DatePicker
                                                    slotProps={{ textField: { size: 'small' } }}
                                                    onChange={(date: any) => console.log(date)}
                                                // value={formik.values.tentiveStartDate}
                                                //  onChange={formik.handleChange}
                                                //  onBlur={formik.handleBlur}
                                                />
                                            </LocalizationProvider>
                                        </Grid>

                                        <Grid size={3} className='mt-1'>
                                            <label className='inputLabel'>Tentaive End Date</label>
                                            <LocalizationProvider dateAdapter={AdapterLuxon}>
                                                <DatePicker
                                                    slotProps={{ textField: { size: 'small' } }}
                                                    onChange={(date: any) => console.log(date)}
                                                //value={formik.values.tentiveEndDate}
                                                //onChange={formik.handleChange}
                                                //  onBlur={formik.handleBlur}
                                                />
                                            </LocalizationProvider>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} className="mb-1">
                                        <Grid size={8} className='mt-1'>
                                            <label className='inputLabel'>Client Address</label><span style={{ color: 'red' }}>*</span>
                                            <TextareaAutosize
                                                aria-label="minimum height"
                                                minRows={3}
                                                // placeholder="Minimum 3 rows"
                                                style={{ width: '100%' }}
                                            />
                                        </Grid>
                                        <Grid size={4} className='mt-1'>
                                            <label className='inputLabel'>Client APT/STE</label>
                                            <TextField fullWidth className='mt-1'
                                                size="small"
                                                id="clientAPT/STE"
                                                name='clientAPT/STE'
                                                variant="outlined"

                                            >
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} className="mb-1">
                                        <Grid size={4} className='mt-1'>
                                            <label className='inputLabel'>Client City</label><span style={{ color: 'red' }}>*</span>
                                            <TextField fullWidth className='mt-1'
                                                id="clientCity"
                                                name="clientCity"
                                                variant="outlined"
                                                type="text"
                                                size="small"
                                                value={formik.values.clientCity}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                        </Grid>
                                        <Grid size={4} className='mt-1'>
                                            <label className='inputLabel'>Client State</label><span style={{ color: 'red' }}>*</span>
                                            <TextField fullWidth className='mt-1'
                                                size="small"
                                                id="Client State"
                                                name='clientState'
                                                variant="outlined"
                                                value={formik.values.clientState}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            >
                                            </TextField>
                                        </Grid>
                                        <Grid size={4} className='mt-1'>
                                            <label className='inputLabel'>Client ZipCode</label><span style={{ color: 'red' }}>*</span>
                                            <TextField fullWidth className='mt-1'
                                                size="small"
                                                id="Client ZipCode"
                                                name='clientZipcode'
                                                variant="outlined"
                                                value={formik.values.clientZipcode}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            >
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                    <Stack
                                        direction="row"
                                        justifyContent="flex-end"
                                        alignItems="center"
                                        spacing={2}
                                    >

                                        <span style={{ color: 'red' }}>**</span>Please verify all information prior to submitting.
                                    </Stack>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion defaultExpanded={true}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography >Job Details </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container spacing={2} className="mb-1">
                                        <Grid size={6} className='mt-1'>
                                            <label className='inputLabel'>Exempt Type</label><span style={{ color: 'red' }}>*</span>

                                            <FormControl>
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    name="row-radio-buttons-group"
                                                    value={formik.values.exemptType}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                >
                                                    <FormControlLabel value="Exempt" control={<Radio />} label="Exempt" />
                                                    <FormControlLabel value="Non Exempt" control={<Radio />} label="Non Exempt" />

                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} className="mb-1">
                                        <Grid size={3} className='mt-1'>
                                            <label className='inputLabel'>Pay Rate</label><span style={{ color: 'red' }}>*</span>
                                            <TextField fullWidth className='mt-1'
                                                id="payRate"
                                                name="payRate"
                                                variant="outlined"
                                                type="text"
                                                size="small"
                                                value={formik.values.payRate}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                        </Grid>
                                        <Grid size={3} className='mt-1'>
                                            <label className='inputLabel'>Bill Rate </label><span style={{ color: 'red' }}>*</span>
                                            <TextField fullWidth className='mt-1'
                                                size="small"
                                                id="billRate"
                                                name='billRate'
                                                variant="outlined"
                                                value={formik.values.billRate}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            >
                                            </TextField>
                                        </Grid>
                                        <Grid size={3} className='mt-1'>
                                            <label className='inputLabel'>OT Rate</label><span style={{ color: 'red' }}>*</span>
                                            <TextField fullWidth className='mt-1'
                                                size="small"
                                                id="otRate"
                                                name='otRate'
                                                variant="outlined"
                                                value={formik.values.otRate}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            >
                                            </TextField>
                                        </Grid>
                                        <Grid size={3} className='mt-1'>
                                            <label className='inputLabel'>OT Bill Rate</label><span style={{ color: 'red' }}>*</span>
                                            <TextField fullWidth className='mt-1'
                                                size="small"
                                                id="otbillRate"
                                                name='otbillRate'
                                                variant="outlined"
                                                value={formik.values.otbillRate}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            >
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} className="mb-1">
                                        <Grid size={3} className='mt-1'>
                                            <label className='inputLabel'>Double Time Rate</label>
                                            <TextField fullWidth className='mt-1'
                                                id="doubleTimeRate"
                                                name="doubleTimeRate"
                                                variant="outlined"
                                                type="text"
                                                size="small"
                                                value={formik.values.doubleTimeRate}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                        </Grid>
                                        <Grid size={3} className='mt-1'>
                                            <label className='inputLabel'>Double Time Bill Rate</label>
                                            <TextField fullWidth className='mt-1'
                                                id="doubleTimeBillRate"
                                                name="doubleTimeBillRate"
                                                variant="outlined"
                                                type="text"
                                                size="small"
                                                value={formik.values.doubleTimeBillRate}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} className="mb-1">
                                        <Grid size={3} className='mt-1'>
                                            <FormControlLabel
                                                control={<Checkbox />}
                                                label="Per diem is applicable?"
                                                id="perdiem"
                                                name="perdiem"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.perdiem}
                                            />
                                        </Grid>
                                        <Grid size={3} className='mt-1'>
                                            <label className='inputLabel'>Per diem Rate</label><span style={{ color: 'red' }}>*</span>
                                            <TextField fullWidth className='mt-1'
                                                id="perdiemRate"
                                                name="perdiemRate"
                                                variant="outlined"
                                                type="text"
                                                size="small"
                                                value={formik.values.perdiemRate}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}

                                            />
                                        </Grid>
                                    </Grid>

                                    <FormControlLabel
                                        control={<Checkbox />}
                                        label="Mileage Reimbursement"
                                        id="mileageReimbursement"
                                        name="mileageReimbursement"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.mileageReimbursement}
                                    /><br></br>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" type="button" onClick={saveInitiateOnboard}>Save</Button>
                    </DialogActions>
                </Dialog>
            </form>
        </>
    )
}

export default InitiateOnboard;