// import React, { useState } from 'react';
import { useState } from '../../../../../shared/modules/React';
import {Dialog, DialogTitle, DialogContent} from '../../../../../shared/modules/MaterialImports/Dialog';
import {Divider} from '../../../../../shared/modules/MaterialImports/Divider';
import {Grid} from '../../../../../shared/modules/MaterialImports/Grid';
import CloseIcon from '@mui/icons-material/Close';
// import DialogActions from '@mui/material/DialogActions';
// import Button from '@mui/material/Button';
// import Accordion from '@mui/material/Accordion';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import FormGroup from '@mui/material/FormGroup';
import {Checkbox} from '../../../../../shared/modules/MaterialImports/FormElements';
import {TextField,FormControlLabel} from '../../../../../shared/modules/MaterialImports/FormInputs';
// import Switch from '@mui/material/Switch';
// import Stack from '@mui/material/Stack';
import {MenuItem} from '../../../../../shared/modules/MaterialImports/Menu';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useFormik, Yup } from "../../../../../shared/modules/Formik";
import Typography from '@mui/material/Typography';
import './AddCompany.scss';
import ErrorMessage from '../../../../shared/Error/ErrorMessage';

const AddCompany = ({ open, closePopup }: {
    open: boolean;
    closePopup: () => void;
}) => {
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const initialAddCompanyDetails = {
        
        "company": {
            "companyName": "",
            "weburl": "",
            "companyType": "",
        },
        "branding": {
            "logo": "",
            "favicon": "",
            "brandcolor": "",
            "buttoncolor": ""
        },
        "adminUser": {
            "fullName": "",
            "email": "",
            "phone": "",
        },
        "platForm": {
            "directsourcing": true,
            "highVolumeHiring": true,
            "talentCRM": true,
            "staffing": true,
            "adhoc": true,
            "freelanceManagement": true
        },
        "core": {
            "jobs": true,
            "candidates": true,
            "clients": true,
            "contacts": true
        },
        "addon": {
            "carrerPortal": true,
            "chatbot": true,
            "ProjectsTalentpool": true,
            "referral": true,
            "SMS": true,
            "chromeExtension": true,
            "publicTalentCloud": true,
            "documentSigning": true,
            "peopleContact": true,
            "peopleCandidate": true,
            "systemChecker": true,

        },
        "plan": {
            "users": "",
            "emailCredits": "",
            "mobilePhoneCredits": "",
            "aigenerated": "",
            "documentSigning": "",
            "smsCredits": ""

        },
    }

    const addCompanySchema = Yup.object().shape({
              
        company: Yup.object().shape({
            companyName:Yup.string(),
            weburl:Yup.string(),
            companyType:Yup.string(),
        }),
        branding: Yup.object().shape({
            logo:Yup.string(),
            favicon:Yup.string(),
            brandcolor:Yup.string(),
            buttoncolor:Yup.string(),
        }),
        adminUser: Yup.object().shape({
            fullName:Yup.string(),
            email:Yup.string().required('Email  is required.'),
            phone:Yup.string(),
        }),
        platForm: Yup.object().shape({
            directsourcing: Yup.boolean(),
            highVolumeHiring: Yup.boolean(),
            talentCRM: Yup.boolean(),
            staffing: Yup.boolean(),
            adhoc: Yup.boolean(),
            freelanceManagement : Yup.boolean()
        }),
        core: Yup.object().shape({
            jobs: Yup.boolean(),
            candidates: Yup.boolean(),
            clients: Yup.boolean(),
            contacts: Yup.boolean()
        }),
        addon: Yup.object().shape({
            carrerPortal: Yup.boolean(),
            chatbot: Yup.boolean(),
            projectsTalentpool: Yup.boolean(),
            referral: Yup.boolean(),
            SMS: Yup.boolean(),
            chromeExtension: Yup.boolean(),
            publicTalentCloud: Yup.boolean(),
            documentSigning: Yup.boolean(),
            peopleContact: Yup.boolean(),
            peopleCandidate: Yup.boolean(),
            systemChecker: Yup.boolean(),

        }),
        plan: Yup.object().shape({
            users:Yup.string(),
            emailCredits:Yup.string().required('Email  is required.'),
            mobilePhoneCredits:Yup.string(),
            aigenerated:Yup.string(),
            documentSigning:Yup.string(),
            smsCredits:Yup.string(),

        }),
        
    })

    const addCompanyFormik = useFormik({
        initialValues: initialAddCompanyDetails,
        validationSchema: addCompanySchema,
        onSubmit: () => {
            addCompany();
        },
    });
    const addCompany = () => {
        setIsFormSubmitted(true);
        console.log(addCompanyFormik.values);
    }

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
                        <Typography className='header'>Add Company</Typography>
                        <span onClick={closePopup}>
                            <CloseIcon />
                        </span>
                    </Grid>
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <div className='jobPanelDiv'>

                        <Typography className='header mb-2'>Setup Company</Typography>

                        <Grid container spacing={2} className="">
                            <Grid size={4}>
                                <TextField fullWidth
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    label="Company Name"
                                    name="companyname"
                                    id="companyname"
                                    value={addCompanyFormik.values.company.companyName}
                                />
                            </Grid>
                            <Grid size={4}>
                                <TextField fullWidth
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    label="Web URL"
                                    name="weburl"
                                    id="weburl"
                                    value={addCompanyFormik.values.company.weburl}
                                />
                            </Grid>
                            <Grid size={4} className='mb-2'>
                                <TextField fullWidth
                                    select
                                    id="demo-simple-select"
                                    size="small"
                                    name="companyType"
                                    defaultValue={2}
                                >
                                    <MenuItem value="1" ></MenuItem>
                                    <MenuItem value="2">Company Type</MenuItem>
                                    <MenuItem value="3">Curator</MenuItem>
                                    <MenuItem value="4">Direct</MenuItem>
                                    <MenuItem value="5">Staffing</MenuItem>
                                    <MenuItem value="6">EOR/AOR Provider</MenuItem>

                                </TextField>
                            </Grid>
                        </Grid>
                        <Typography className='header mt-5 mb-2'>Branding</Typography>
                        <Grid container spacing={2} className="">
                            <Grid size={6}>
                                <TextField fullWidth
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    label="Logo"
                                    name="logo"
                                    id="logo"
                                    value={addCompanyFormik.values.branding.logo}
                                    onChange={addCompanyFormik.handleChange}
                                />
                            </Grid>
                            <Grid size={6}>
                                <TextField fullWidth
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    label="Favicon"
                                    name="favicon"
                                    id="favicon"
                                    value={addCompanyFormik.values.branding.favicon}
                                    onChange={addCompanyFormik.handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} className="mt-1">
                            <Grid size={6}>
                                <TextField fullWidth
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    label="Brand Color"
                                    name="Brandcolor"
                                    id="Brandcolor"
                                    value={addCompanyFormik.values.branding.brandcolor}
                                    onChange={addCompanyFormik.handleChange}
                                />
                            </Grid>
                            <Grid size={6}>
                                <TextField fullWidth
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    label="Button color"
                                    name="buttoncolor"
                                    id="buttoncolor"
                                    value={addCompanyFormik.values.branding.buttoncolor}
                                    onChange={addCompanyFormik.handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Typography className='header mt-5 mb-2'>Admin User</Typography>
                        <Grid container spacing={2} className="">
                            <Grid size={4}>
                                <TextField fullWidth
                                    variant="outlined"
                                    //a type="text"
                                    size="small"
                                    label="Full Name"
                                    name="name"
                                    id="name"
                                    value={addCompanyFormik.values.adminUser.fullName}
                                    onChange={addCompanyFormik.handleChange}
                                />
                            </Grid>
                            <Grid size={4}>
                                <TextField fullWidth
                                    variant="outlined"
                                    type="email"
                                    size="small"
                                    label="Email"
                                    name="email"
                                    id="email"
                                    value={addCompanyFormik.values.adminUser.email}
                                    onChange={addCompanyFormik.handleChange}
                                />
                                <ErrorMessage formikObj={ addCompanyFormik} name={'email'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                            </Grid>
                            <Grid size={4}>
                                <TextField fullWidth
                                    variant="outlined"
                                    type="phone"
                                    size="small"
                                    label="Phone"
                                    name="Phone"
                                    id="Phone"
                                    value={addCompanyFormik.values.adminUser.phone}
                                    onChange={addCompanyFormik.handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Typography className='header mt-5 mb-2'>Platform</Typography>
                        <Grid container spacing={2} className="">
                            <Grid size={4}>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Direct Sourcing"
                                    labelPlacement="end"
                                    id="active"
                                    name="active"
                                    value={addCompanyFormik.values.platForm.directsourcing}
                                    onChange={addCompanyFormik.handleChange}
                                />
                            </Grid>
                            <Grid size={4}>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="High Volume Hiring"
                                    labelPlacement="end"
                                    id="hiring"
                                    name="hiring"
                                    value={addCompanyFormik.values.platForm.highVolumeHiring}
                                    onChange={addCompanyFormik.handleChange}
                                />
                            </Grid>
                            <Grid size={4}>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Talent CRM"
                                    labelPlacement="end"
                                    id="talent"
                                    name="talent"
                                    value={addCompanyFormik.values.platForm.talentCRM}
                                    onChange={addCompanyFormik.handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} className="">
                            <Grid size={4}>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Staffing"
                                    labelPlacement="end"
                                    id="staffing"
                                    name="staffing"
                                    value={addCompanyFormik.values.platForm.staffing}
                                    onChange={addCompanyFormik.handleChange}
                                />
                            </Grid>
                            <Grid size={4}>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Adhoc"
                                    labelPlacement="end"
                                    id="formattedResume"
                                    name="formattedResume"
                                    value={addCompanyFormik.values.platForm.adhoc}
                                    onChange={addCompanyFormik.handleChange} 
                                />
                            </Grid>
                            <Grid size={4}>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Freelance Management (FMS)"
                                    labelPlacement="end"
                                    id="formattedResume"
                                    name="formattedResume"
                                    value={addCompanyFormik.values.platForm.freelanceManagement}
                                    onChange={addCompanyFormik.handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Typography className='header mt-5 mb-2'>Modules</Typography>
                        <Typography className='header mt-5 mb-1'>Core</Typography>
                        <Grid container spacing={2} className="">
                            <Grid size={3}>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Jobs"
                                    labelPlacement="end"
                                    id="formattedResume"
                                    name="formattedResume"
                                    value={addCompanyFormik.values.core.jobs}
                                    onChange={addCompanyFormik.handleChange}
                                />
                            </Grid>
                            <Grid size={3}>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Candidates"
                                    labelPlacement="end"
                                    id="formattedResume"
                                    name="formattedResume"
                                    value={addCompanyFormik.values.core.candidates}
                                    onChange={addCompanyFormik.handleChange}
                                />
                            </Grid>
                            <Grid size={3}>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Clients"
                                    labelPlacement="end"
                                    id="formattedResume"
                                    name="formattedResume"
                                    value={addCompanyFormik.values.core.clients}
                                    onChange={addCompanyFormik.handleChange}
                                />
                            </Grid>
                            <Grid size={3}>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Contacts"
                                    labelPlacement="end"
                                    id="formattedResume"
                                    name="formattedResume"
                                    value={addCompanyFormik.values.core.contacts}
                                    onChange={addCompanyFormik.handleChange}
                                />
                            </Grid>          
                        </Grid>
                        <Typography className='header mt-4'>Add On</Typography>
                        <Grid container spacing={2} className="">
                            <Grid size={3}>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Career portal "
                                    labelPlacement="end"
                                    id="formattedResume"
                                    name="formattedResume"
                                    value={addCompanyFormik.values.addon.carrerPortal}
                                    onChange={addCompanyFormik.handleChange}
                                />
                            </Grid>
                            <Grid size={3}>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Chatbot"
                                    labelPlacement="end"
                                    id="formattedResume"
                                    name="formattedResume"
                                    value={addCompanyFormik.values.addon.chatbot}
                                    onChange={addCompanyFormik.handleChange}
                                />
                            </Grid>
                            <Grid size={3}>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Projects/Talentpool"
                                    labelPlacement="end"
                                    id="formattedResume"
                                    name="formattedResume"
                                    value={addCompanyFormik.values.addon.ProjectsTalentpool}
                                    onChange={addCompanyFormik.handleChange}
                                />
                            </Grid>
                            <Grid size={3}>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Referral"
                                    labelPlacement="end"
                                    id="formattedResume"
                                    name="formattedResume"
                                    value={addCompanyFormik.values.addon.referral}
                                    onChange={addCompanyFormik.handleChange}
                                />
                            </Grid>

                        </Grid>
                        <Grid container spacing={2} className="">
                            <Grid size={3}>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="SMS"
                                    labelPlacement="end"
                                    id="sms"
                                    name="sms"
                                    value={addCompanyFormik.values.addon.SMS}
                                    onChange={addCompanyFormik.handleChange}
                                />
                            </Grid>
                            <Grid size={3}>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Chrome Extension"
                                    labelPlacement="end"
                                    id="chromeExtension"
                                    name="chromeExtension"
                                    value={addCompanyFormik.values.addon.chromeExtension}
                                    onChange={addCompanyFormik.handleChange}
                                />
                            </Grid>
                            <Grid size={3}>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Public Talent Cloud"
                                    labelPlacement="end"
                                    id="public"
                                    name="public"
                                    value={addCompanyFormik.values.addon.publicTalentCloud}
                                    onChange={addCompanyFormik.handleChange}
                                />
                            </Grid>
                            <Grid size={3}>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Document Signing"
                                    labelPlacement="end"
                                    id="document"
                                    name="document"
                                    value={addCompanyFormik.values.addon.documentSigning}
                                    onChange={addCompanyFormik.handleChange}
                                />
                            </Grid>

                        </Grid>
                        <Grid container spacing={2} className="">
                            <Grid size={3}>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="People Contact"
                                    labelPlacement="end"
                                    id="peoplecontact"
                                    name="peoplecontact"
                                    value={addCompanyFormik.values.addon.peopleContact}
                                    onChange={addCompanyFormik.handleChange}
                                />
                            </Grid>
                            <Grid size={3}>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="People Candidate"
                                    labelPlacement="end"
                                    id="peopleCandidate"
                                    name="peopleCandidate"
                                    value={addCompanyFormik.values.addon.peopleCandidate}
                                    onChange={addCompanyFormik.handleChange}
                                />
                            </Grid>
                            <Grid size={3}>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="System Checker"
                                    labelPlacement="end"
                                    id="systemChecker"
                                    name="systemChecker"
                                    value={addCompanyFormik.values.addon.systemChecker}
                                    onChange={addCompanyFormik.handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Typography className='header mt-4 mb-2'>Plan</Typography>
                        <Grid container spacing={2} className="">
                            <Grid size={4}>
                                <label>Users</label>
                                <TextField fullWidth
                                    select
                                    id="demo-simple-select"
                                    size="small"
                                    name="companyType"
                                    defaultValue={1}
                                >
                                    <MenuItem value="1" >Select</MenuItem>
                                    <MenuItem value="2">1</MenuItem>
                                    <MenuItem value="3">5</MenuItem>
                                    <MenuItem value="4">10</MenuItem>
                                </TextField>
                            </Grid>
                           
                            <Grid size={4}>
                            <label>Email credits</label>
                                <TextField fullWidth
                                    select
                                    id="demo-simple-select"
                                    size="small"
                                    name="emailcredits"
                                    defaultValue={"sel"}
                                >
                                    <MenuItem value="sel" >Select</MenuItem>
                                    <MenuItem value="Unlimited">Unlimited</MenuItem>
                                    <MenuItem value="10000">10,000</MenuItem>

                                </TextField>
                                <ErrorMessage formikObj={ addCompanyFormik} name={'emailcredits'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                            </Grid>
                            <Grid size={4}>
                            <label>Mobile Phone</label>
                            <TextField fullWidth
                                    select
                                    id="demo-simple-select"
                                    size="small"
                                    name="emailcredits"
                                    defaultValue={"sel"}
                                >
                                    <MenuItem value="sel" >Select</MenuItem>
                                    <MenuItem value="Unlimited">Unlimited</MenuItem>
                                    <MenuItem value="10000">10,000</MenuItem>

                                </TextField>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} className="mt-1">
                        <Grid size={4} className='mt-5'>
                                <TextField fullWidth
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    label="AI-generated words credit"                                    
                                    name="generated"
                                    id="generated"
                                    value={addCompanyFormik.values.plan.aigenerated}
                                    onChange={addCompanyFormik.handleChange} 
                                />
                            </Grid>
                            <Grid size={4}>
                            <label>Document Signing</label>
                            <TextField fullWidth
                                    select
                                    id="demo-simple-select"
                                    size="small"
                                    name="emailcredits"
                                    defaultValue={"sel"}
                                >
                                    <MenuItem value="sel" >Select</MenuItem>
                                    <MenuItem value="Unlimited">Unlimited</MenuItem>
                                    <MenuItem value="10000">10,000</MenuItem>

                                </TextField>
                            </Grid>
                            <Grid size={4} className='mt-5'>
                                <TextField fullWidth
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    label="SMS Credits"
                                    name="smscredits"
                                    id="smscredits"
                                    value={addCompanyFormik.values.plan.smsCredits}
                                    onChange={addCompanyFormik.handleChange}
                                />
                            </Grid>
                        </Grid>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
export default AddCompany;