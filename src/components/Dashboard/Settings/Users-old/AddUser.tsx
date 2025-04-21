// import React, { useState, useMemo } from 'react';
import  {React, useState } from '../../../../shared/modules/React';
import {Grid, Button} from '../../../../shared/modules/commonImports';
import {Box} from '../../../../shared/modules/MaterialImports/Box';
import {Checkbox} from '../../../../shared/modules/MaterialImports/FormElements';
import {TextField, FormControlLabel} from '../../../../shared/modules/MaterialImports/FormInputs';
import CloseIcon from '@mui/icons-material/Close';
import {Dialog, DialogTitle, DialogContent, DialogActions} from '../../../../shared/modules/MaterialImports/Dialog';
import {Divider} from '../../../../shared/modules/MaterialImports/Divider';
import { useFormik, Yup } from "../../../../shared/modules/Formik";
import ErrorMessage from '../../../shared/Error/ErrorMessage';
// import FormControl from '@mui/material/FormControl';
import {Accordion, AccordionDetails, AccordionSummary} from '../../../../shared/modules/MaterialImports/Accordion';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {Stack} from '../../../../shared/modules/MaterialImports/Stack';
// import Typography from '@mui/material/Typography';
import './AddUser.scss';

import {FormGroup} from '../../../../shared/modules/MaterialImports/FormGroup';
import {Switch} from '../../../../shared/modules/MaterialImports/Switch';

const AddUser = ({ open, closePopup }: {
    open: boolean;
    closePopup: () => void;
}) => {
    const [expanded, setExpanded] = useState<string | false>(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const initialAddUserDetails = {
        admin: '',
        firstName: "",
        lastName: "",
        email: "",
        jobTitle: "",
        phoneNo: "",
        password: "",
        applicants: "",
        formBuilder: "",
        community: "",
        sequence: "",
        talentPool: "",
        workflow: "",
        resumes: "",
        emailBuilder: "",
        people: "",
        talentCommunityInsights: "",
        users: "",
        executiveInsights: "",
        branding: "",
        hiringInsights: "",
        emailbuilder: "",
        sourcingInsights: "",
        pipelineInsights: "",
        recruiterActivityInsights: "",
        customReport: "",

    }
    const addUserSchema = Yup.object().shape({
        admin: Yup.string(),
        firstName: Yup.string().required('FirstName is required.'),
        lastName: Yup.string(),
        email: Yup.string(),
        jobTitle: Yup.string(),
        phoneNo: Yup.string(),
        password: Yup.string(),
        applicants: Yup.string(),
        formBuilder: Yup.string(),
        community: Yup.string(),
        sequence: Yup.string(),
        talentPool: Yup.string(),
        workflow: Yup.string(),
        resumes: Yup.string(),
        emailBuilder: Yup.string(),
        people: Yup.string(),
        talentCommunityInsights: Yup.string(),
        users: Yup.string(),
        executiveInsights: Yup.string(),
        branding: Yup.string(),
        hiringInsights: Yup.string(),
        emailbuilder: Yup.string(),
        sourcingInsights: Yup.string(),
        pipelineInsights: Yup.string(),
        recruiterActivityInsights: Yup.string(),
        customReport: Yup.string(),
    });
    const addUserFormik = useFormik({
        initialValues: initialAddUserDetails,
        validationSchema: addUserSchema,
        onSubmit: () => {
            add();
        },
    });
    const add = () => {
        setIsFormSubmitted(true);
        console.log(addUserFormik.values);
    }


    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };
    // const [filtersExpand, setFiltersExpand] = useState(false);
    // const toggleFilers = () => {
    //     setFiltersExpand(!filtersExpand);
    // }
    return (
        <div>
            <Dialog
                maxWidth={'md'}
                open={open} fullWidth={true} className='AddUserModal customInputs'>
                <DialogTitle className='py-2'>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <span style={{ fontWeight: 'bold' }}>Add User</span>
                        <span onClick={closePopup}>
                            <CloseIcon />
                        </span>
                    </Grid>
                </DialogTitle>
                <Divider />
                <DialogContent className='px-0'>
                    <div className='jobPanelDiv'>
                                <Grid container spacing={2}>
                                    <Grid size={6}className='pr-2'>
                                        <Box>
                                            <FormControlLabel
                                                control={<Checkbox />}
                                                label="Admin"
                                                labelPlacement="end"
                                                sx={{ mr: 0 }}
                                                id="admin"
                                                name="admin"
                                                value={addUserFormik.values.admin}
                                                onChange={addUserFormik.handleChange}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid size={6} className='pr-2'>
                                        <label className='inputLabel'>First Name<span style={{ color: 'red' }}>*</span> </label>
                                        <TextField fullWidth className='mt-1'
                                            id="firstName"
                                            name="firstName"
                                            value={addUserFormik.values.firstName}
                                            onChange={addUserFormik.handleChange}
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            error={(addUserFormik.errors.firstName && isFormSubmitted) ? true : false}
                                        />
                                        <ErrorMessage formikObj={addUserFormik} name={'firstName'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                    </Grid>
                                    <Grid size={6}>
                                        <label className='inputLabel'>Last Name </label>
                                        <TextField fullWidth className='mt-1'
                                            id="lastName"
                                            name="lastName"
                                            value={addUserFormik.values.lastName}
                                            onChange={addUserFormik.handleChange}
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                        />
                                    </Grid>
                                    </Grid>
                                    <Grid container spacing={2} className='mb-5'>
                                    <Grid size={6}>
                                        <label className='inputLabel'>Email</label>
                                        <TextField fullWidth className='mt-1'
                                            id="email"
                                            name="email"
                                            value={addUserFormik.values.email}
                                            onChange={addUserFormik.handleChange}
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid size={6}>
                                        <label className='inputLabel'>Job Title</label>
                                        <TextField fullWidth className='mt-1'
                                            id="jobTitle"
                                            name="jobTitle"
                                            value={addUserFormik.values.jobTitle}
                                            onChange={addUserFormik.handleChange}
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                        />
                                    </Grid>
                                    </Grid>
                                    <Grid container spacing={2}>
                                    <Grid size={6}>
                                        <label className='inputLabel'>Phone No </label>
                                        <TextField fullWidth className='mt-1'
                                            id="phoneNo"
                                            name="phoneNo"
                                            value={addUserFormik.values.phoneNo}
                                            onChange={addUserFormik.handleChange}
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid size={6}>
                                        <label className='inputLabel'>Password</label>
                                        <TextField fullWidth className='mt-1'
                                            id="password"
                                            name="password"
                                            value={addUserFormik.values.password}
                                            onChange={addUserFormik.handleChange}
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                        />
                                    </Grid>
                                </Grid>
                    </div>
                    <div className='jobPanelDiv'>
                    <span style={{ fontWeight: 'bold' }}>Assign Permissions</span>
                                <Grid container spacing={2} className="mt-1">
                                    <Grid size={6}>
                                        <span style={{ fontWeight: '600' }}>Candidate</span>
                                        <Accordion disableGutters square expanded={expanded === 'panel1'} onChange={handleChange('panel1')} className="mt-2">
                                            <AccordionSummary expandIcon={<ArrowDropDownIcon />}
                                                aria-controls="panel1bh-content"
                                                id="panel1bh-header">
                                                <Stack sx={{ width: '100%' }}>
                                                    <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                        <Stack direction="row" alignItems="center">
                                                            <FormGroup>
                                                                <FormControlLabel control={<Switch />} label="Applicants" />
                                                            </FormGroup>
                                                        </Stack>
                                                    </Stack>
                                                </Stack>
                                            </AccordionSummary>
                                        </Accordion>
                                    </Grid>
                                    <Grid size={6} className="mt-1">
                                        <span style={{ fontWeight: '600' }}>Automation</span>
                                        <Accordion disableGutters square expanded={expanded === 'panel2'} onChange={handleChange('panel2')} className="mt-2">
                                            <AccordionSummary expandIcon={<ArrowDropDownIcon />}
                                                aria-controls="panel2bh-content"
                                                id="panel2bh-header">
                                                <Stack sx={{ width: '100%' }}>
                                                    <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                        <Stack direction="row" alignItems="center">
                                                            <FormGroup>
                                                                <FormControlLabel control={<Switch />} label="Formbuilder" />
                                                            </FormGroup>
                                                        </Stack>
                                                    </Stack>
                                                </Stack>
                                            </AccordionSummary>
                                        </Accordion>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid size={6}>
                                        <Accordion disableGutters square expanded={expanded === 'panel3'} onChange={handleChange('panel3')} className="mt-2">
                                            <AccordionSummary expandIcon={<ArrowDropDownIcon />}
                                                aria-controls="panel3bh-content"
                                                id="panel3bh-header">
                                                <Stack sx={{ width: '100%' }}>
                                                    <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                        <Stack direction="row" alignItems="center">
                                                            <FormGroup>
                                                                <FormControlLabel control={<Switch />} label="Community" />
                                                            </FormGroup>
                                                        </Stack>
                                                    </Stack>
                                                </Stack>
                                            </AccordionSummary>
                                        </Accordion>
                                    </Grid>
                                    <Grid size={6}>
                                        <Accordion disableGutters square expanded={expanded === 'panel4'} onChange={handleChange('panel4')} className="mt-2">
                                            <AccordionSummary expandIcon={<ArrowDropDownIcon />}
                                                aria-controls="panel4bh-content"
                                                id="panel4bh-header">
                                                <Stack sx={{ width: '100%' }}>
                                                    <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                        <Stack direction="row" alignItems="center">
                                                            <FormGroup>
                                                                <FormControlLabel control={<Switch />} label="Sequence" />
                                                            </FormGroup>
                                                        </Stack>
                                                    </Stack>
                                                </Stack>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox/>} label="Can add sequences" />
                                                    <FormControlLabel control={<Checkbox />} label="Can view private sequences" />
                                                </FormGroup>
                                            </AccordionDetails>
                                        </Accordion>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid size={6}>
                                        <Accordion disableGutters square expanded={expanded === 'panel5'} onChange={handleChange('panel5')} className="mt-2">
                                            <AccordionSummary expandIcon={<ArrowDropDownIcon />}
                                                aria-controls="panel5bh-content"
                                                id="panel5bh-header">
                                                <Stack sx={{ width: '100%' }}>
                                                    <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                        <Stack direction="row" alignItems="center">
                                                            <FormGroup>
                                                                <FormControlLabel control={<Switch />} label="Talent Pool" />
                                                            </FormGroup>
                                                        </Stack>
                                                    </Stack>
                                                </Stack>
                                            </AccordionSummary>
                                        </Accordion>
                                    </Grid>
                                    <Grid size={6}>
                                        <Accordion disableGutters square expanded={expanded === 'panel6'} onChange={handleChange('panel6')} className="mt-2">
                                            <AccordionSummary expandIcon={<ArrowDropDownIcon />}
                                                aria-controls="panel6bh-content"
                                                id="panel6bh-header">
                                                <Stack sx={{ width: '100%' }}>
                                                    <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                        <Stack direction="row" alignItems="center">
                                                            <FormGroup>
                                                                <FormControlLabel control={<Switch />} label="Workflow" />
                                                            </FormGroup>
                                                        </Stack>
                                                    </Stack>
                                                </Stack>
                                            </AccordionSummary>
                                        </Accordion>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid size={6}>
                                        <Accordion disableGutters square expanded={expanded === 'panel7'} onChange={handleChange('panel7')} className="mt-2">
                                            <AccordionSummary expandIcon={<ArrowDropDownIcon />}
                                                aria-controls="panel7bh-content"
                                                id="panel7bh-header">
                                                <Stack sx={{ width: '100%' }}>
                                                    <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                        <Stack direction="row" alignItems="center">
                                                            <FormGroup>
                                                                <FormControlLabel control={<Switch />} label="Resumes" />
                                                            </FormGroup>
                                                        </Stack>
                                                    </Stack>
                                                </Stack>
                                            </AccordionSummary>
                                        </Accordion>
                                    </Grid>
                                    <Grid size={6}>
                                        <Accordion disableGutters square expanded={expanded === 'panel8'} onChange={handleChange('panel8')} className="mt-2">
                                            <AccordionSummary expandIcon={<ArrowDropDownIcon />}
                                                aria-controls="panel8bh-content"
                                                id="panel8bh-header">
                                                <Stack sx={{ width: '100%' }}>
                                                    <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                        <Stack direction="row" alignItems="center">
                                                            <FormGroup>
                                                                <FormControlLabel control={<Switch />} label="Email Builder" />
                                                            </FormGroup>
                                                        </Stack>
                                                    </Stack>
                                                </Stack>
                                            </AccordionSummary>
                                        </Accordion>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid size={6}>
                                        <Accordion disableGutters square expanded={expanded === 'panel9'} onChange={handleChange('panel9')} className="mt-2">
                                            <AccordionSummary expandIcon={<ArrowDropDownIcon />}
                                                aria-controls="panel9bh-content"
                                                id="panel9bh-header">
                                                <Stack sx={{ width: '100%' }}>
                                                    <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                        <Stack direction="row" alignItems="center">
                                                            <FormGroup>
                                                                <FormControlLabel control={<Switch />} label="People" />
                                                            </FormGroup>
                                                        </Stack>
                                                    </Stack>
                                                </Stack>
                                            </AccordionSummary>
                                        </Accordion>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} className='mt-2'>
                                    <Grid size={6}>
                                        <span style={{ fontWeight: '600', marginTop: '10px' }}>Reports</span>
                                        <Accordion disableGutters square expanded={expanded === 'panel10'} onChange={handleChange('panel10')} className="mt-2">
                                            <AccordionSummary expandIcon={<ArrowDropDownIcon />}
                                                aria-controls="panel10bh-content"
                                                id="panel10bh-header">
                                                <Stack sx={{ width: '100%' }}>
                                                    <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                        <Stack direction="row" alignItems="center">
                                                            <FormGroup>
                                                                <FormControlLabel control={<Switch />} label="Talent Community Insights" />
                                                            </FormGroup>
                                                        </Stack>
                                                    </Stack>
                                                </Stack>
                                            </AccordionSummary>
                                        </Accordion>
                                    </Grid>
                                    <Grid size={6}>
                                        <span style={{ fontWeight: '600' }}>Settings</span>
                                        <Accordion disableGutters square expanded={expanded === 'panel11'} onChange={handleChange('panel11')} className="mt-2">
                                            <AccordionSummary expandIcon={<ArrowDropDownIcon />}
                                                aria-controls="panel11bh-content"
                                                id="panel11bh-header">
                                                <Stack sx={{ width: '100%' }}>
                                                    <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                        <Stack direction="row" alignItems="center">
                                                            <FormGroup>
                                                                <FormControlLabel control={<Switch />} label="Users" />
                                                            </FormGroup>
                                                        </Stack>
                                                    </Stack>
                                                </Stack>
                                            </AccordionSummary>
                                        </Accordion>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid size={6}>
                                        <Accordion disableGutters square expanded={expanded === 'panel12'} onChange={handleChange('panel12')} className="mt-2">
                                            <AccordionSummary expandIcon={<ArrowDropDownIcon />}
                                                aria-controls="panel12bh-content"
                                                id="panel12bh-header">
                                                <Stack sx={{ width: '100%' }}>
                                                    <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                        <Stack direction="row" alignItems="center">
                                                            <FormGroup>
                                                                <FormControlLabel control={<Switch />} label="Executive Insights" />
                                                            </FormGroup>
                                                        </Stack>
                                                    </Stack>
                                                </Stack>
                                            </AccordionSummary>
                                        </Accordion>
                                    </Grid>
                                    <Grid size={6}>
                                        <Accordion disableGutters square expanded={expanded === 'panel13'} onChange={handleChange('panel13')} className="mt-2">
                                            <AccordionSummary expandIcon={<ArrowDropDownIcon />}
                                                aria-controls="panel13bh-content"
                                                id="panel13bh-header">
                                                <Stack sx={{ width: '100%' }}>
                                                    <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                        <Stack direction="row" alignItems="center">
                                                            <FormGroup>
                                                                <FormControlLabel control={<Switch />} label="Branding" />
                                                            </FormGroup>
                                                        </Stack>
                                                    </Stack>
                                                </Stack>
                                            </AccordionSummary>
                                        </Accordion>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid size={6}>
                                        <Accordion disableGutters square expanded={expanded === 'panel14'} onChange={handleChange('panel14')} className="mt-2">
                                            <AccordionSummary expandIcon={<ArrowDropDownIcon />}
                                                aria-controls="panel14bh-content"
                                                id="panel14bh-header">
                                                <Stack sx={{ width: '100%' }}>
                                                    <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                        <Stack direction="row" alignItems="center">
                                                            <FormGroup>
                                                                <FormControlLabel control={<Switch />} label="Hiring Insights" />
                                                            </FormGroup>
                                                        </Stack>
                                                    </Stack>
                                                </Stack>
                                            </AccordionSummary>
                                        </Accordion>
                                    </Grid>
                                    <Grid size={6}>
                                        <Accordion disableGutters square expanded={expanded === 'panel15'} onChange={handleChange('panel15')} className="mt-2">
                                            <AccordionSummary expandIcon={<ArrowDropDownIcon />}
                                                aria-controls="panel15bh-content"
                                                id="panel15bh-header">
                                                <Stack sx={{ width: '100%' }}>
                                                    <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                        <Stack direction="row" alignItems="center">
                                                            <FormGroup>
                                                                <FormControlLabel control={<Switch />} label="Email Builder" />
                                                            </FormGroup>
                                                        </Stack>
                                                    </Stack>
                                                </Stack>
                                            </AccordionSummary>
                                        </Accordion>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid size={6}>
                                        <Accordion disableGutters square expanded={expanded === 'panel16'} onChange={handleChange('panel16')} className="mt-2">
                                            <AccordionSummary expandIcon={<ArrowDropDownIcon />}
                                                aria-controls="panel16bh-content"
                                                id="panel16bh-header">
                                                <Stack sx={{ width: '100%' }}>
                                                    <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                        <Stack direction="row" alignItems="center">
                                                            <FormGroup>
                                                                <FormControlLabel control={<Switch />} label="Sourcing Insights" />
                                                            </FormGroup>
                                                        </Stack>
                                                    </Stack>
                                                </Stack>
                                            </AccordionSummary>
                                        </Accordion>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid size={6}>
                                        <Accordion disableGutters square expanded={expanded === 'panel17'} onChange={handleChange('panel17')} className="mt-2">
                                            <AccordionSummary expandIcon={<ArrowDropDownIcon />}
                                                aria-controls="panel17bh-content"
                                                id="panel17bh-header">
                                                <Stack sx={{ width: '100%' }}>
                                                    <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                        <Stack direction="row" alignItems="center">
                                                            <FormGroup>
                                                                <FormControlLabel control={<Switch />} label="Pipeline Insights" />
                                                            </FormGroup>
                                                        </Stack>
                                                    </Stack>
                                                </Stack>
                                            </AccordionSummary>
                                        </Accordion>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid size={6}>
                                        <Accordion disableGutters square expanded={expanded === 'panel18'} onChange={handleChange('panel18')} className="mt-2">
                                            <AccordionSummary expandIcon={<ArrowDropDownIcon />}
                                                aria-controls="panel18bh-content"
                                                id="panel18bh-header">
                                                <Stack sx={{ width: '100%' }}>
                                                    <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                        <Stack direction="row" alignItems="center">
                                                            <FormGroup>
                                                                <FormControlLabel control={<Switch />} label="Recruiter Activity Insights" />
                                                            </FormGroup>
                                                        </Stack>
                                                    </Stack>
                                                </Stack>
                                            </AccordionSummary>
                                        </Accordion>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid size={6}>
                                        <Accordion disableGutters square expanded={expanded === 'panel19'} onChange={handleChange('panel19')} className="mt-2">
                                            <AccordionSummary expandIcon={<ArrowDropDownIcon />}
                                                aria-controls="panel19bh-content"
                                                id="panel19bh-header">
                                                <Stack sx={{ width: '100%' }}>
                                                    <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                        <Stack direction="row" alignItems="center">
                                                            <FormGroup>
                                                                <FormControlLabel control={<Switch />} label="Custom Report" />
                                                            </FormGroup>
                                                        </Stack>
                                                    </Stack>
                                                </Stack>
                                            </AccordionSummary>
                                        </Accordion>
                                    </Grid>
                                </Grid>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" variant="contained" type="button" onClick={add}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default AddUser;