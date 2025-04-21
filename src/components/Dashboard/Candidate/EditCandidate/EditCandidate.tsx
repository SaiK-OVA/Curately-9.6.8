import { useState } from '../../../../shared/modules/React';
import { useFormik, Yup } from '../../../../shared/modules/Formik';
import { trackPromise } from '../../../../shared/modules/PromiseTrackter';


import { showToaster } from '../../../shared/SnackBar/SnackBar';
import ApiService from '../../../../shared/api/api';
import ErrorMessage from '../../../shared/Error/ErrorMessage';
import { userLocalData } from '../../../../shared/services/userData';
import { globalData } from '../../../../shared/services/globalData';


import { Button } from '../../../../shared/modules/MaterialImports/Button';
import { TextField, FormControlLabel } from '../../../../shared/modules/MaterialImports/FormInputs';
import { Grid } from '../../../../shared/modules/MaterialImports/Grid';
import { Dialog, DialogContent, DialogTitle, } from '../../../../shared/modules/MaterialImports/Dialog';
import { Divider } from '../../../../shared/modules/MaterialImports/Divider';
import { Accordion, AccordionSummary, AccordionDetails } from '../../../../shared/modules/MaterialImports/Accordion';
import { Typography } from '../../../../shared/modules/MaterialImports/Typography';
import { MenuItem } from '../../../../shared/modules/MaterialImports/Menu';
import { Checkbox } from '../../../../shared/modules/MaterialImports/FormElements';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



import './EditCandidate.scss';

// import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';



const EditCandidate = (
    { open, closePopup, candidateData }: {
        open: boolean;
        closePopup: () => void;
        candidateData: any;
    }
) => {

    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    // console.log(candidateData);
    const initialValues = candidateData;
    // {
    //     resume: '',
    //     firstName: '',
    //     lastName: '',
    //     email: '',
    //     cellPhone: '',
    // }

    const addCandidateSchema = Yup.object({
        resume: Yup.string().required('Required'),
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        email: Yup.string().required('Required').email('Invalid email format'),
        cellPhone: Yup.string(),
    })
    const addCandidateFormik = useFormik({
        initialValues,
        validationSchema: addCandidateSchema,
        onSubmit: () => {
            saveForm();
        },
        validateOnMount: true

    });

    const saveForm = () => {
        setIsFormSubmitted(true);
        // if (addCandidateFormik.dirty && addCandidateFormik.isValid) {
        // console.log(addCandidateFormik.values);
        if (addCandidateFormik.values.resume || (addCandidateFormik.values.firstName && addCandidateFormik.values.lastName && addCandidateFormik.values.email)) {
            // Contacts/contacts_save.jsp
            let tempFormData = new FormData();
            tempFormData.append('Fname', (addCandidateFormik.values.firstName) ? addCandidateFormik.values.firstName : "");
            tempFormData.append('Lname', (addCandidateFormik.values.lastName) ? addCandidateFormik.values.lastName : "");
            tempFormData.append('Email', (addCandidateFormik.values.email) ? addCandidateFormik.values.email : "");
            // tempFormData.append('Resume', addCandidateFormik.values.resume);
            tempFormData.append('userName', userLocalData.getvalue('userName'));
            tempFormData.append('userId', userLocalData.getvalue('recrId'));
            // { ...addCandidateFormik.values, rdCand: "1" }
            trackPromise(
                ApiService.postWithFileData(193, 'Candidate/candidate_upload.jsp', tempFormData).then(
                    (response: any) => {
                        if (response.data.success) {
                            showToaster(response.data.message, 'success');
                            addCandidateFormik.resetForm();
                            setTimeout(() => {
                                window.open(globalData.getWindowLocation() + "candidate/view/" + response.data.candidateId.trim());
                            }, 250);
                            closePopup();
                        } else {
                            showToaster((response.data.message) ? response.data.message : "An error occured while saving the Candidate.", 'error')
                        }
                    }
                ))
        } else {
            showToaster('Please fill all required fields.', 'error');
        }
    }


    return (
        <Dialog
            maxWidth={'sm'}
            // sx={{ maxWidth: '650px !important' }}
            fullWidth={false} open={open} className='AddCandidateModal customInputs'>
            <DialogTitle
                className='py-2'
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    // sx={{ width: '475px' }}
                    alignItems="center"
                >
                    <span className='addHeader'>Edit Candidate</span>
                    <div>
                        <Grid
                            container
                            direction="row"
                            justifyContent="end"
                            alignItems="center"
                        >
                            <Button variant="outlined"
                                type='button'
                                color="secondary"
                                className='mr-2'
                                onClick={closePopup}
                            >Cancel</Button>
                            <Button variant="contained"
                                type='button'
                                color="primary"
                                onClick={saveForm}
                            >Update Candidate</Button>
                        </Grid>
                    </div>
                </Grid>
            </DialogTitle>
            <Divider />
            <DialogContent className='px-5'>
                <Accordion defaultExpanded={true}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Candidate Information</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2} className="mb-1">
                            <Grid size={6} className='mt-1'>
                                <label className='inputLabel'>Person ID</label>
                                <TextField fullWidth className='mt-1'
                                    id="personId"
                                    name="personId"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                />
                            </Grid>
                            <Grid size={6} className='mt-1'>
                                <label className='inputLabel'>Prefix</label>
                                <TextField fullWidth className='mt-1'
                                    size="small"
                                    id="prefix"
                                    name='prefix'
                                    variant="outlined"
                                    select
                                    value={0}
                                >
                                    <MenuItem value="0"></MenuItem>
                                    <MenuItem value="Mr.">Mr.</MenuItem>
                                    <MenuItem value="Mrs.">Mrs.</MenuItem>
                                    <MenuItem value="Ms.">Ms.</MenuItem>
                                    <MenuItem value="Dr.">Dr.</MenuItem>
                                    <MenuItem value="Rev.">Rev.</MenuItem>
                                    <MenuItem value="Hon.">Hon.</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid size={6} className='mt-1'>
                                <label className='inputLabel'>First Name</label>
                                <TextField fullWidth className='mt-1'
                                    id="firstName"
                                    name="firstName"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    value={addCandidateFormik.values.firstName}
                                    onChange={addCandidateFormik.handleChange}
                                    error={(addCandidateFormik.errors.firstName && isFormSubmitted) ? true : false}
                                />
                                <ErrorMessage formikObj={addCandidateFormik} name={'firstName'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                            </Grid>
                            <Grid size={6} className='mt-1'>
                                <label className='inputLabel'>Last Name</label>
                                <TextField fullWidth className='mt-1'
                                    id="lastName"
                                    name="lastName"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    value={addCandidateFormik.values.lastName}
                                    onChange={addCandidateFormik.handleChange}
                                    error={(addCandidateFormik.errors.lastName && isFormSubmitted) ? true : false}
                                />
                                <ErrorMessage formikObj={addCandidateFormik} name={'lastName'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                            </Grid>
                            <Grid size={6} className='mt-1'>
                                <label className='inputLabel'>Owner</label>
                                <TextField fullWidth className='mt-1'
                                    size="small"
                                    id="prefix"
                                    name='prefix'
                                    variant="outlined"
                                    select
                                    value={0}
                                >
                                    <MenuItem value="0"></MenuItem>
                                </TextField>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion defaultExpanded={true}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>Profile</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2} className="mb-1">
                            <Grid size={6} className='mt-1'>
                                <label className='inputLabel mr-2'>Active</label>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label=""
                                    labelPlacement="end"
                                    id="active"
                                    name="active"
                                />
                            </Grid>
                            <Grid size={6} className='mt-1'>
                                <label className='inputLabel mr-2'>Employee</label>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label=""
                                    labelPlacement="end"
                                    id="employee"
                                    name="employee"
                                />
                            </Grid>
                            <Grid size={6} className='mt-1'>
                                <label className='inputLabel'>Candidate Status</label>
                                <TextField fullWidth className='mt-1'
                                    size="small"
                                    id="candidateStatus"
                                    name='candidateStatus'
                                    variant="outlined"
                                    select
                                    value={0}
                                >
                                    <MenuItem value="0"></MenuItem>
                                </TextField>
                            </Grid>
                            <Grid size={6} className='mt-1'>
                                <label className='inputLabel'>Source</label>
                                <TextField fullWidth className='mt-1'
                                    size="small"
                                    id="source"
                                    name='source'
                                    variant="outlined"
                                    select
                                    value={0}
                                >
                                    <MenuItem value="0"></MenuItem>
                                </TextField>
                            </Grid>
                            <Grid size={6} className='mt-1'>
                                <label className='inputLabel'>Referred By / Source Notes</label>
                                <TextField fullWidth className='mt-1'
                                    id="referredBy"
                                    name="referredBy"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                />
                            </Grid>
                            <Grid size={6} className='mt-1'>
                                <label className='inputLabel'>Default / Current Resume</label>
                                <Grid container flexWrap="nowrap" alignItems="center">
                                    <TextField className='mt-1'
                                        id="defaultResume"
                                        name="defaultResume"
                                        variant="outlined"
                                        type="text"
                                        size="small"
                                    />
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        className='mt-1 ml-1'
                                        sx={{ height: '32px !important' }}
                                    >
                                        View
                                    </Button>

                                </Grid>
                            </Grid>
                            <Grid size={6} className='mt-1'>
                                <label className='inputLabel'>Specific Job Title Sought</label>
                                <TextField fullWidth className='mt-1'
                                    id="jobTitleSought"
                                    name="jobTitleSought"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                />
                            </Grid>
                            <Grid size={6} className='mt-1'>
                                <label className='inputLabel'>Available To Start</label>
                                <TextField fullWidth className='mt-1'
                                    id="availableToStart"
                                    name="availableToStart"
                                    variant="outlined"
                                    type="date"
                                    size="small"
                                />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion defaultExpanded={true}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                    >
                        <Typography>Personal Data</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2} className="mb-1">
                            <Grid size={6} className='mt-1'>
                                <label className='inputLabel'>Primary Email</label>
                                <TextField fullWidth className='mt-1'
                                    id="primaryEmail"
                                    name="primaryEmail"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    value={addCandidateFormik.values.email}
                                    onChange={addCandidateFormik.handleChange}
                                    error={(addCandidateFormik.errors.email && isFormSubmitted) ? true : false}
                                />
                                <ErrorMessage formikObj={addCandidateFormik} name={'email'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                            </Grid>
                            <Grid size={6} className='mt-1'>
                                <label className='inputLabel'>Secondary Email</label>
                                <TextField fullWidth className='mt-1'
                                    id="secondaryEmail"
                                    name="secondaryEmail"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    value={addCandidateFormik.values.email2}
                                    onChange={addCandidateFormik.handleChange}
                                    error={(addCandidateFormik.errors.email2 && isFormSubmitted) ? true : false}
                                />
                                <ErrorMessage formikObj={addCandidateFormik} name={'email2'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                            </Grid>
                            <Grid size={6} className='mt-1'>
                                <label className='inputLabel'>Linked in Profile</label>
                                <TextField fullWidth className='mt-1'
                                    id="linkedIn"
                                    name="linkedIn"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    value={addCandidateFormik.values.linkedIn}
                                    onChange={addCandidateFormik.handleChange}
                                    error={(addCandidateFormik.errors.linkedIn && isFormSubmitted) ? true : false}
                                />
                                <ErrorMessage formikObj={addCandidateFormik} name={'linkedIn'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                            </Grid>
                            <Grid size={6} className='mt-1'>
                                <label className='inputLabel'>Landline</label>
                                <TextField fullWidth className='mt-1'
                                    id="homePhone"
                                    name="homePhone"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    value={addCandidateFormik.values.homePhone}
                                    onChange={addCandidateFormik.handleChange}
                                    error={(addCandidateFormik.errors.homePhone && isFormSubmitted) ? true : false}
                                />
                                <ErrorMessage formikObj={addCandidateFormik} name={'homePhone'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                            </Grid>
                            <Grid size={6} className='mt-1'>
                                <label className='inputLabel'>Landline2</label>
                                <TextField fullWidth className='mt-1'
                                    id="homePhone2"
                                    name="homePhone2"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    value={addCandidateFormik.values.homePhone2}
                                    onChange={addCandidateFormik.handleChange}
                                    error={(addCandidateFormik.errors.homePhone2 && isFormSubmitted) ? true : false}
                                />
                                <ErrorMessage formikObj={addCandidateFormik} name={'homePhone2'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                            </Grid>
                            <Grid size={6} className='mt-1'>
                                <label className='inputLabel'>Cell Phone</label>
                                <TextField fullWidth className='mt-1'
                                    id="cellPhone"
                                    name="cellPhone"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    value={addCandidateFormik.values.cellPhone}
                                    onChange={addCandidateFormik.handleChange}
                                />
                            </Grid>
                            <Grid size={6} className='mt-1'>
                                <label className='inputLabel'>Cell Phone2</label>
                                <TextField fullWidth className='mt-1'
                                    id="cellPhone2"
                                    name="cellPhone2"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    value={addCandidateFormik.values.cellPhone2}
                                    onChange={addCandidateFormik.handleChange}
                                    error={(addCandidateFormik.errors.cellPhone2 && isFormSubmitted) ? true : false}
                                />
                                <ErrorMessage formikObj={addCandidateFormik} name={'cellPhone2'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                            </Grid>
                            <Grid size={6} className='mt-1'>
                                <label className='inputLabel'>Invalid Phone</label>
                                <TextField fullWidth className='mt-1'
                                    id="invalidPhone"
                                    name="invalidPhone"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                />
                            </Grid>
                            <Grid size={6} className='mt-1'>
                                <label className='inputLabel'>Invalid Phone2</label>
                                <TextField fullWidth className='mt-1'
                                    id="invalidPhone2"
                                    name="invalidPhone2"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                />
                            </Grid>
                            <Grid size={6} className='mt-1'>
                                <label className='inputLabel'>Invalid Phone3</label>
                                <TextField fullWidth className='mt-1'
                                    id="invalidPhone3"
                                    name="invalidPhone3"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                />
                            </Grid>
                            <Grid size={6} className='mt-1'>
                                <label className='inputLabel'>Email3</label>
                                <TextField fullWidth className='mt-1'
                                    id="email3"
                                    name="email3"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                />
                            </Grid>
                            <Grid size={6} className='mt-1'>
                                <label className='inputLabel'>Pager</label>
                                <TextField fullWidth className='mt-1'
                                    id="pager"
                                    name="pager"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                />
                            </Grid>
                            <Grid size={6} className='mt-1'>
                                <label className='inputLabel'>Home FAX</label>
                                <TextField fullWidth className='mt-1'
                                    id="homeFax"
                                    name="homeFax"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                />
                            </Grid>
                            <Grid size={6} className='mt-1'>
                                <label className='inputLabel'>Street Address</label>
                                <TextField fullWidth className='mt-1'
                                    id="streetAddress"
                                    name="streetAddress"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    value={addCandidateFormik.values.street}
                                    onChange={addCandidateFormik.handleChange}
                                />
                            </Grid>
                            <Grid size={6} className='mt-1'>
                                <label className='inputLabel'>City</label>
                                <TextField fullWidth className='mt-1'
                                    id="city"
                                    name="city"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    value={addCandidateFormik.values.city}
                                    onChange={addCandidateFormik.handleChange}
                                />
                            </Grid>
                            <Grid size={6} className='mt-1'>
                                <label className='inputLabel'>State or Prov.</label>
                                <TextField fullWidth className='mt-1'
                                    id="state"
                                    name="state"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    value={addCandidateFormik.values.state}
                                    onChange={addCandidateFormik.handleChange}
                                />
                            </Grid>
                            <Grid size={6} className='mt-1'>
                                <label className='inputLabel'>Zip Code</label>
                                <TextField fullWidth className='mt-1'
                                    id="zip"
                                    name="zip"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    value={addCandidateFormik.values.zip}
                                    onChange={addCandidateFormik.handleChange}
                                />
                            </Grid>
                            <Grid size={6} className='mt-1'>
                                <label className='inputLabel'>Country/Locale</label>
                                <TextField fullWidth className='mt-1'
                                    id="country"
                                    name="country"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                />
                            </Grid>
                            <Grid size={6} className='mt-1'>
                                <label className='inputLabel'>Region</label>
                                <TextField fullWidth className='mt-1'
                                    size="small"
                                    id="region"
                                    name='region'
                                    variant="outlined"
                                    select
                                    value={0}
                                >
                                    <MenuItem value="0"></MenuItem>
                                    <MenuItem value="-PST">-PST</MenuItem>
                                    <MenuItem value="-MST">-MST</MenuItem>
                                    <MenuItem value="-CST">-CST</MenuItem>
                                    <MenuItem value="-EST">-EST</MenuItem>
                                    <MenuItem value="-GMT">-GMT</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid size={6} className='mt-1'>
                                <label className='inputLabel'>SSN</label>
                                <TextField fullWidth className='mt-1'
                                    id="ssn"
                                    name="ssn"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion defaultExpanded={true}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4a-content"
                        id="panel4a-header"
                    >
                        <Typography>Summary</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2} className="mb-1">
                            <Grid size={12} className='mt-1'>
                                <label className='inputLabel'>Summary</label>
                                <textarea className='mt-1'
                                    id="summary"
                                    name="summary"
                                    rows={5}
                                />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion defaultExpanded={true}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel5a-content"
                        id="panel5a-header"
                    >
                        <Typography>Education</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2} className="mb-1">
                            <Grid size={6} className='mt-1'>
                                <label className='inputLabel'>School Name</label>
                                <TextField fullWidth className='mt-1'
                                    id="schoolName"
                                    name="availableToStart"
                                    variant="outlined"
                                    type="date"
                                    size="small"
                                />
                            </Grid>
                            <Grid size={6} className='mt-1'>
                                <label className='inputLabel'>Degree Type</label>
                                <TextField fullWidth className='mt-1'
                                    id="degreeType"
                                    name="degreeType"
                                    variant="outlined"
                                    type="date"
                                    size="small"
                                />
                            </Grid>
                            <Grid size={6} className='mt-1'>
                                <label className='inputLabel'>Degree Name</label>
                                <TextField fullWidth className='mt-1'
                                    id="degreeName"
                                    name="degreeName"
                                    variant="outlined"
                                    type="date"
                                    size="small"
                                />
                            </Grid>
                            <Grid size={6} className='mt-1'>
                                <label className='inputLabel'>Degree Date</label>
                                <TextField fullWidth className='mt-1'
                                    id="degreeDate"
                                    name="degreeDate"
                                    variant="outlined"
                                    type="date"
                                    size="small"
                                />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion defaultExpanded={true}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel5a-content"
                        id="panel5a-header"
                    >
                        <Typography>Experience</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2} className="mb-1">
                            <Grid size={6} className='mt-1'>
                                <label className='inputLabel'>Company Name</label>
                                <TextField fullWidth className='mt-1'
                                    id="companyName"
                                    name="companyName"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                />
                            </Grid>
                            <Grid size={6} className='mt-1'>
                                <label className='inputLabel'>Job Title</label>
                                <TextField fullWidth className='mt-1'
                                    id="jobTitle"
                                    name="jobTitle"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                />
                            </Grid>
                            <Grid size={12} className='mt-1'>
                                <label className='inputLabel'>Date</label>
                                <Grid container spacing={2}>
                                    <Grid size={6}>
                                        <TextField fullWidth className='mt-1'
                                            id="fromDate"
                                            name="fromDate"
                                            variant="outlined"
                                            type="date"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid size={6}>
                                        <TextField fullWidth className='mt-1'
                                            id="toDate"
                                            name="toDate"
                                            variant="outlined"
                                            type="date"
                                            size="small"
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                    </AccordionDetails>
                </Accordion>
                {/* <Grid size={6} className='mt-1'>
                            <label className='inputLabel'>Resume</label>
                            <TextField fullWidth className='mt-1'
                                id="resume"
                                name="resume"
                                variant="outlined"
                                type='file'
                                size="small"
                                // value={addCandidateFormik.values.resume}
                                onChange={
                                    (e) => {
                                        addCandidateFormik.setFieldValue('resume', (e.currentTarget as HTMLInputElement)?.files?.[0]);
                                        // console.log((e.currentTarget as HTMLInputElement)?.files?.[0]);
                                    }
                                }
                                error={(addCandidateFormik.errors.resume && isFormSubmitted) ? true : false}
                            />
                            <ErrorMessage formikObj={addCandidateFormik} name={'resume'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                        </Grid> */}

            </DialogContent>
        </Dialog>
    );
}

export default EditCandidate;
