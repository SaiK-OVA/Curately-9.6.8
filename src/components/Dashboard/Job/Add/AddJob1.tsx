import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
// import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from "@mui/material/FormControl";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
// import FormLabel from '@mui/material/FormLabel';
import Divider from '@mui/material/Divider';
import React, { useEffect, useState, Fragment } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import FormatBoldIcon from '@mui/icons-material/FormatBold';
// import FormatItalicIcon from '@mui/icons-material/FormatItalic';
// import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
// import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
// import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
// import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
// import LinkIcon from '@mui/icons-material/Link';
// import PanoramaIcon from '@mui/icons-material/Panorama';
// import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import * as Yup from "yup";
import { useFormik } from "formik";
import { showToaster } from '../../../shared/SnackBar/SnackBar';
import ApiService from '../../../../shared/api/api';
import updateDocumentTitle from '../../../../shared/services/title';
import { MUIAutoComplete } from '../../../shared/MUIAutoComplete/MUIAutoComplete';
import Editor from '../../../shared/EmailDialogBox/EmailBody';
import ErrorMessage from '../../../shared/Error/ErrorMessage';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { DialogActions } from "@mui/material";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTime } from 'luxon';


import './AddJob.scss';
import { trackPromise } from "react-promise-tracker";


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`addJobTabsPanel-${index}`}
            aria-labelledby={`addJobTabsPanel-${index}`}
            {...other}
            className='addJobTabsPanel customTabsPanel'
        >
            {value === index && (
                <div>{children}</div>
            )}
        </div>
    );
}

function tabProperties(index: number) {
    return {
        id: `companyTabs-${index}`,
        'aria-controls': `addJobTabsPanel-${index}`,
    };
}

const AddJob1 = (
    { open, closePopup, add, jobData }: {
        open: boolean;
        closePopup: () => void;
        add: boolean;
        jobData: any;
    }
) => {


    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    // submissionsAllowed
    // mspCoordinator
    // costCenterNumber
    // businessUnit
    const initialAddJObDetails = jobData.jobId ? jobData : {
        "companyName": "",
        "companyId": "",
        "jobTitle": "",
        "primaryRecruiter": "",
        "secondaryRecruiter": "",
        "accountManager": "",
        "jobCategory": "",
        "pipelineStatus": "",
        "closed": "",
        "notWorking": "",
        "reason": "",
        "priority": "",
        "filledBy": "",
        "publicDescription": "",
        "originalDescription": "",
        "hiringAuthority": "",
        "requisition": "",
        "requisitionTitle": "",
        "ofPosition": "",
        "positionDuration": "",
        "partTime": "",
        "startDate": "",
        "endDate": "",
        "submissionsAllowed": "",
        "mspCoordinator": "",
        "costCenterNumber": "",
        "businessUnit": "",
        "remoteJob": "",
        "streetAddress": "",
        "jobCity": "",
        "stateOrPro": "",
        "jobPostalCode": "",
        "areaCode": "",
        "countryOrLocale": "",
        "jobRegion": "",
        "travel": "",
        "txtJobEmpType": "",
        "txtBillrate2": "",
        "txtBillrate": "",
        "txtTargetPay2": "",
        "txtTargetPay": "",
        "parttime_value": "",
        "remote_value": "",
        "rdjobtype": "",
        "txtFreelancePayRange": "",
        "txtFreelancePayRange1": "",
        "freelancePayType": "",
        "txtJobPayRange": "",
        "txtJobPayRange1": "",
        "txtJobpayType": "",
    }
    const addJobSchema = Yup.object().shape({
        "companyName": Yup.string().required('Company Name is required.'),
        "companyId": Yup.string().required('Company Name is required.'),
        "jobTitle": Yup.string().required('Job Title is required.'),
        "primaryRecruiter": Yup.string(),
        "secondaryRecruiter": Yup.string(),
        "accountManager": Yup.string(),
        "jobCategory": Yup.string().required('Job Category * is required.'),
        "pipelineStatus": Yup.string(),
        "closed": Yup.string(),
        "notWorking": Yup.string(),
        "reason": Yup.string(),
        "priority": Yup.string(),
        "filledBy": Yup.string(),
        "publicDescription": Yup.string().required('Public Description is required.'),
        "originalDescription": Yup.string().required('Original Description By is required.'),
        "hiringAuthority": Yup.string(),
        "requisition": Yup.string(),
        "requisitionTitle": Yup.string(),
        "ofPosition": Yup.string(),
        "positionDuration": Yup.string().required('Position Duration is required.'),
        "partTime": Yup.string(),
        "startDate": Yup.string(),
        "endDate": Yup.string(),
        "submissionsAllowed": Yup.string(),
        "mspCoordinator": Yup.string(),
        "costCenterNumber": Yup.string(),
        "businessUnit": Yup.string(),
        "remoteJob": Yup.string(),
        "streetAddress": Yup.string().required('Street Address : is required.'),
        "jobCity": Yup.string().required('Job City * is required.'),
        "stateOrPro": Yup.string().required('State or Pro * is required.'),
        "jobPostalCode": Yup.string().required('Job Postal Code * is required.'),
        "areaCode": Yup.string(),
        "countryOrLocale": Yup.string(),
        "jobRegion": Yup.string(),
        "travel": Yup.string(),
        "parttime_value": Yup.string(),
        "remote_value": Yup.string(),
        "rdjobtype": Yup.string(),
        "txtFreelancePayRange": Yup.string()
            .when('rdjobtype', {
                is: (rdjobtype: any) => rdjobtype === "freelancer" ? true : false,
                then: (f:any) => f.required('Pay range is required.')
            }),
        "txtFreelancePayRange1": Yup.string()
            .when('rdjobtype', {
                is: (rdjobtype: any) => rdjobtype === "freelancer" ? true : false,
                then: (f:any) => f.required('Pay range is required.')
            }),
        "freelancePayType": Yup.string(),
        "txtJobPayRange": Yup.string()
            .when('rdjobtype', {
                is: (rdjobtype: any) => rdjobtype === "directHire" ? true : false,
                then: (f:any) => f.required('Pay range is required.')
            }),
        "txtJobPayRange1": Yup.string()
            .when('rdjobtype', {
                is: (rdjobtype: any) => rdjobtype === "directHire" ? true : false,
                then: (f:any) => f.required('Pay range is required.')
            }),
        "txtJobpayType": Yup.string(),
        "txtJobEmpType": Yup.string()
            .when('rdjobtype', {
                is: (rdjobtype: any) => rdjobtype === "contract" ? true : false,
                then: (f:any) => f.required('Employment Type is required.')
            }),
        "txtBillrate2": Yup.string()
            .when('rdjobtype', {
                is: (rdjobtype: any) => rdjobtype === "contract" ? true : false,
                then: (f:any) => f.required('Bill Rate (Min) * is required.')
            }),
        "txtBillrate": Yup.string()
            .when('rdjobtype', {
                is: (rdjobtype: any) => rdjobtype === "contract" ? true : false,
                then: (f:any) => f.required('Bill Rate (Max) * is required.')
            }),
        "txtTargetPay2": Yup.string(),
        "txtTargetPay": Yup.string(),
    });
    const saveForm = () => {
        setIsFormSubmitted(true);
        console.log(addJobFormik.values);
        if (addJobFormik.isValid) {
            trackPromise(
                ApiService.getByParams(193, 'Jobs/jobs_save.jsp', { ...addJobFormik.values }).then((response: any) => {
                    if (response.data.success) {
                        showToaster
                            ('Job has been saved successfully.', 'success');
                        addJobFormik.resetForm();
                    } else {
                        showToaster((response.data.message) ? response.data.message : 'An error occured', 'error')
                    }
                })
            )
        } else {
            showToaster('Please fill all fields.', 'error');
        }
    }

    const addJobFormik = useFormik({
        initialValues: initialAddJObDetails,
        validationSchema: addJobSchema,
        onSubmit: () => {
            setIsFormSubmitted(true);
            // console.log(addJobFormik.values);
        },
        validateOnMount: true
    });


    const [value, setValue] = useState(0);
    const [tabState, settabState] = useState([false, false, false, false, false]);

    // const labels = ["BasicDetails", "Description", "Requirement", "Location", "Compensation"]
    const checkValidations = (i: number) => {
        if (i === 1) {
            if (!addJobFormik.values.companyName || !addJobFormik.values.jobTitle || !addJobFormik.values.jobCategory) {
                // showToaster('Please select companyName', 'error');
                return false
            }
            // else if (!addJobFormik.values.jobTitle) {
            //     showToaster('Please enter jobTitle', 'error');
            //     return false
            // }
            // else if (!addJobFormik.values.jobCategory) {
            //     showToaster('Please select jobCategory', 'error');
            //     return false
            // }
        } else if (i === 2) {
            if (!addJobFormik.values.publicDescription || !addJobFormik.values.originalDescription) {
                // showToaster('Please enter Public Description', 'error');
                return false
            }
            // else if (!addJobFormik.values.originalDescription) {
            //     showToaster('Please enter Original Description', 'error');
            //     return false
            // }
        } else if (i === 3) {
            if (!addJobFormik.values.positionDuration) {
                // showToaster('Please select Position Duration', 'error');
                return false
            }
        } else if (i === 4) {
            if (!addJobFormik.values.streetAddress || !addJobFormik.values.jobCity || !addJobFormik.values.stateOrPro || !addJobFormik.values.jobPostalCode) {
                // showToaster('Please enter Street Address', 'error');
                return false
            }
            // if (!addJobFormik.values.jobCity) {
            //     showToaster('Please enter City', 'error');
            //     return false
            // }
            // if (!addJobFormik.values.stateOrPro) {
            //     showToaster('Please enter State', 'error');
            //     return false
            // }
            // if (!addJobFormik.values.jobPostalCode) {
            //     showToaster('Please enter Postal Code', 'error');
            //     return false
            // }
        } else if (i === 5) {
            if (!addJobFormik.values.employmentType) {
                // showToaster('Please select Employment Type', 'error');
                return false
            }
        }
        // employmentType
        // billRateMin
        // billRateMax
        // payRateMin
        // payRateMax
        return true;
    }
    const updateTabState = (event: any, newValue: any) => {
        console.log(newValue);
        if (checkValidations(newValue)) {
            setValue(newValue);
            if (newValue === 5) {
                saveForm();
            } else if (newValue > 0) {
                let tempTabState = tabState;
                tempTabState[newValue - 1] = true;
                settabState({
                    ...tempTabState
                })
            }
            setIsFormSubmitted(false);
        } else {
            setIsFormSubmitted(true);
        }
        // if (newValue === 4) {
        //     let tempTabState = tabState;
        //     tempTabState[newValue] = true;
        //     settabState({
        //         ...tempTabState
        //     })
        // }
    };

    useEffect(() => {
        updateDocumentTitle.set('Add Job');
    }, []);



    return (
        <Dialog
            maxWidth={'lg'}
            // sx={{ width: 900, maxWidth: 900, minWidth: 900 }}
            fullWidth={true} open={open} className='AddJobModal'
            id='addJob'
        >
            <DialogTitle
                className='py-2'
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <span className='addHeader'>
                        {add ? "Add" : "Edit"} Job
                    </span>
                    <div>
                        <Grid
                            container
                            direction="row"
                            justifyContent="end"
                            alignItems="center"
                        >
                            {/* <CloseIcon /> onClick={() => closePopup()}  */}
                            <Button variant="text"
                                type='button'
                                color="secondary"
                                className='mr-2'
                                onClick={closePopup}
                            >Cancel</Button>
                            <Button variant="text"
                                type='button'
                                color="primary"
                                onClick={saveForm}
                                disabled={(value !== 4)}
                            >{add ? "Save" : "Update"} Job</Button>
                        </Grid>
                    </div>
                </Grid>
            </DialogTitle>
            <Divider />
            <DialogContent className='py-0'>
                <form
                    onSubmit={addJobFormik.handleSubmit}
                >
                    <Grid className='customCard mt-2 px-0 pb-0' sx={{ width: "850px !important", margin: 'auto', bgcolor: '#ffffff' }}>
                        {/* <span className='addHeader pl-3'>Add New Job</span>
                        <Divider className='mt-3' /> */}
                        <Box
                            className='py-0 customCenteredTabs '
                            sx={{ borderBottom: 1, borderColor: 'divider', minHeight: 'auto !important', marginBottom: '0 !important' }}

                        >
                            <Tabs value={value} onChange={updateTabState} aria-label="Add Job Tabs" variant="fullWidth">
                                <Tab className={`tabLabelName ${(tabState[0]) ? 'c-green' : ''}`} label="Basic Details" {...tabProperties(0)} />
                                <Tab className={`tabLabelName ${(tabState[1]) ? 'c-green' : ''}`} label="Description" {...tabProperties(1)} />
                                <Tab className={`tabLabelName ${(tabState[2]) ? 'c-green' : ''}`} label="Requirement" {...tabProperties(2)} />
                                <Tab className={`tabLabelName ${(tabState[3]) ? 'c-green' : ''}`} label="Location" {...tabProperties(3)} />
                                <Tab className={`tabLabelName ${(tabState[4]) ? 'c-green' : ''}`} label="Compensation" {...tabProperties(4)} />
                            </Tabs>
                        </Box>
                        <div className=''>
                            <CustomTabPanel value={value} index={0}>
                                <div className='jobPanelDiv'>
                                    <Grid container spacing={2} className="mb-2">
                                        <Grid size={12} className='mt-5 pr-2'>
                                            {/* <TextField fullWidth
                                            id="companyName"
                                            name="companyName"
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            label="Company Name"
                                            value={addJobFormik.values.companyName}
                                            onChange={addJobFormik.handleChange}
                                        /> */}
                                            <MUIAutoComplete
                                                id='companyName'
                                                handleChange={(id: any, name: string) => {
                                                    addJobFormik.setFieldValue("companyName", name);
                                                    addJobFormik.setFieldValue("companyId", id);
                                                }}
                                                valuePassed={{}}
                                                isMultiple={false}
                                                width="100%"
                                                type='companyName'
                                                placeholder={
                                                    <Fragment>
                                                        Company Name
                                                        <span style={{ color: 'red' }}>*</span>
                                                    </Fragment>
                                                }
                                            />
                                            <ErrorMessage formikObj={addJobFormik} name={'companyId'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} className="mb-2">
                                        <Grid size={12} className='pr-2'>
                                            <TextField fullWidth
                                                id="jobTitle"
                                                size="small"
                                                variant="outlined"
                                                type="text"
                                                value={addJobFormik.values.jobTitle}
                                                onChange={addJobFormik.handleChange}
                                                label={
                                                    <Fragment>
                                                        Job Title
                                                        <span style={{ color: 'red' }}>*</span>
                                                    </Fragment>
                                                }
                                            />
                                            <ErrorMessage formikObj={addJobFormik} name={'jobTitle'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                            <div className='subTextForInput'>
                                                (This information will be published on job boards)
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} className="mb-2">
                                        <Grid size={6} className='pr-2'>
                                            {/* <TextField fullWidth
                                                id="primaryRecruiter"
                                                name="primaryRecruiter"
                                                size="small"
                                                variant="outlined"
                                                type="text"
                                                label="Primary Recruiter"
                                                value={addJobFormik.values.primaryRecruiter}
                                                onChange={addJobFormik.handleChange}
                                            /> */}

                                            <MUIAutoComplete
                                                id='primaryRecruiter'
                                                handleChange={(id: any, name: string) => {
                                                    addJobFormik.setFieldValue('primaryRecruiter', id);
                                                }}
                                                valuePassed={{}}
                                                isMultiple={false}
                                                width="100%"
                                                type='userName'
                                                placeholder="Select Primary Recruiter"
                                            />
                                        </Grid>
                                        <Grid size={6} className='pr-2'>
                                            {/* <TextField fullWidth
                                                id="secondaryRecruiter"
                                                name="secondaryRecruiter"
                                                size="small"
                                                variant="outlined"
                                                type="text"
                                                label="Secondary Recruiter"
                                                value={addJobFormik.values.secondaryRecruiter}
                                                onChange={addJobFormik.handleChange}
                                            /> */}

                                            <MUIAutoComplete
                                                id='secondaryRecruiter'
                                                handleChange={(id: any, name: string) => {
                                                    addJobFormik.setFieldValue('secondaryRecruiter', id);
                                                }}
                                                valuePassed={{}}
                                                isMultiple={false}
                                                width="100%"
                                                type='userName'
                                                placeholder="Select Secondary Recruiter"
                                            />
                                        </Grid>
                                        <Grid size={6} className='pr-2'>
                                            <TextField fullWidth
                                                id="accountManager"
                                                name="accountManager"
                                                size="small"
                                                variant="outlined"
                                                type="text"
                                                label="Account Manager"
                                                value={addJobFormik.values.accountManager}
                                                onChange={addJobFormik.handleChange}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} className="mb-1">
                                        <Grid size={6} className='mt-1 pr-2'>
                                            <Box>
                                                <TextField
                                                    fullWidth
                                                    id="jobCategory"
                                                    name="jobCategory"
                                                    size="small"
                                                    variant="outlined"
                                                    select
                                                    value={addJobFormik.values.jobCategory}
                                                    onChange={addJobFormik.handleChange}
                                                    label={
                                                        <Fragment>
                                                            Job Category
                                                            <span style={{ color: 'red' }}>*</span>
                                                        </Fragment>
                                                    }
                                                >
                                                    <MenuItem value=""></MenuItem>
                                                    <MenuItem value="490">Accounting Finance</MenuItem>
                                                    <MenuItem value="463">Admin Clerical</MenuItem>
                                                    <MenuItem value="37">Call Center</MenuItem>
                                                    <MenuItem value="492">Clinical</MenuItem>
                                                    <MenuItem value="491">Creative Marketing</MenuItem>
                                                    <MenuItem value="39">Engineering</MenuItem>
                                                    <MenuItem value="494">Health IT</MenuItem>
                                                    <MenuItem value="493">Healthcare</MenuItem>
                                                    <MenuItem value="58">Human Resources</MenuItem>
                                                    <MenuItem value="102">Industrial</MenuItem>
                                                    <MenuItem value="59">Information Technology</MenuItem>
                                                    <MenuItem value="497">Lab</MenuItem>
                                                    <MenuItem value="63">Legal</MenuItem>
                                                    <MenuItem value="498">Pharma</MenuItem>
                                                    <MenuItem value="496">Professional</MenuItem>
                                                    <MenuItem value="72">Sales</MenuItem>
                                                    <MenuItem value="103">Scientific</MenuItem>
                                                    <MenuItem value="495">Supply Chain</MenuItem>

                                                </TextField>
                                                <ErrorMessage formikObj={addJobFormik} name={'jobCategory'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                                <div className='subTextForInput'>
                                                    (This information will be published on job boards)
                                                </div>
                                            </Box>
                                        </Grid>
                                        <Grid size={6} className='mt-1 pr-2'>
                                            <Box>
                                                <TextField
                                                    fullWidth
                                                    label="Pipeline Status"
                                                    id="pipelineStatus"
                                                    name="pipelineStatus"
                                                    size="small"
                                                    select
                                                    value={addJobFormik.values.pipelineStatus}
                                                    onChange={addJobFormik.handleChange}
                                                >
                                                    <MenuItem value=""></MenuItem>
                                                    <MenuItem value="1: Open Req">Open</MenuItem>
                                                    <MenuItem value="0: Hold">Halted</MenuItem>
                                                    <MenuItem value="0: Inactive">Closed</MenuItem>
                                                    <MenuItem value="0: Canceled">Cancelled </MenuItem>
                                                    <MenuItem value="Pipeline">Pipeline</MenuItem>
                                                    <MenuItem value="Heads Up">Heads Up </MenuItem>
                                                    <MenuItem value="Re-Opened">Re-Opened </MenuItem>
                                                    <MenuItem value="Automation">Automation</MenuItem>
                                                    <MenuItem value="POC"> POC </MenuItem>
                                                    <MenuItem value="Knowledge Bank"> Knowledge Bank </MenuItem>
                                                </TextField>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2}>
                                        <Grid size={3} className='pr-2'>
                                            {/* <label>Closed :</label> */}
                                            <FormControlLabel
                                                control={<Checkbox />}
                                                label="Closed :"
                                                labelPlacement="start"
                                                id="closed"
                                                name="closed"
                                                value={addJobFormik.values.closed}
                                                onChange={addJobFormik.handleChange}
                                                sx={{ ml: 0 }}
                                            />
                                        </Grid>
                                        <Grid size={3} className='pr-2 text-right'>
                                            {/* <label>Not Working :</label> */}
                                            <FormControlLabel
                                                control={<Checkbox />}
                                                label="Not Working :"
                                                labelPlacement="start"
                                                id="notWorking"
                                                name="notWorking"
                                                value={addJobFormik.values.notWorking}
                                                onChange={addJobFormik.handleChange}
                                                sx={{ ml: 0 }}
                                            />
                                        </Grid>

                                        <Grid size={6} className='pr-2'>
                                            <TextField
                                                fullWidth
                                                label="Reason"
                                                id="reason"
                                                name="reason"
                                                size="small"
                                                select
                                                value={addJobFormik.values.reason}
                                                onChange={addJobFormik.handleChange}
                                                disabled={!addJobFormik.values.notWorking}
                                            >
                                                <MenuItem value="0"></MenuItem>
                                                <MenuItem value="258">Bill Rate too low</MenuItem>
                                                <MenuItem value="259">Duration too short</MenuItem>
                                                <MenuItem value="260">Location not supported</MenuItem>
                                                <MenuItem value="261">Pre-ID candidate</MenuItem>
                                                <MenuItem value="262">High Risk Workers comp</MenuItem>
                                                <MenuItem value="263">Patient Facing Healthcare Job</MenuItem>
                                            </TextField>
                                        </Grid>

                                        <Grid size={6} className='pr-2'>
                                            <Box>
                                                <TextField
                                                    fullWidth
                                                    label="Priority"
                                                    id="priority"
                                                    name="priority"
                                                    size="small"
                                                    variant="outlined"
                                                    select
                                                    value={addJobFormik.values.priority}
                                                    onChange={addJobFormik.handleChange}
                                                >
                                                    <MenuItem value="0">none</MenuItem>
                                                    <MenuItem value="D">A+</MenuItem>
                                                    <MenuItem value="A">A</MenuItem>
                                                    <MenuItem value="B">B</MenuItem>
                                                    <MenuItem value="E">C</MenuItem>
                                                    <MenuItem value="C">Covered</MenuItem>
                                                    <MenuItem value="G">FYI</MenuItem>
                                                    <MenuItem value="H">Hot</MenuItem>
                                                    <MenuItem value="N">New</MenuItem>
                                                    <MenuItem value="F">Forecasted</MenuItem>
                                                    <MenuItem value="I">Interviewing</MenuItem>
                                                </TextField>
                                            </Box>
                                        </Grid>
                                        <Grid size={6} className='pr-2'>
                                            <Box>
                                                {/* <TextField
                                                    fullWidth
                                                    label="Filled By:"
                                                    id="filledBy"
                                                    name="filledBy"
                                                    size="small"
                                                    variant="outlined"
                                                    select
                                                    value={addJobFormik.values.filledBy}
                                                    onChange={addJobFormik.handleChange}
                                                >
                                                </TextField> */}

                                                <MUIAutoComplete
                                                    id='filledBy'
                                                    handleChange={(id: any, name: string) => {
                                                        addJobFormik.setFieldValue('filledBy', id);
                                                    }}
                                                    valuePassed={{}}
                                                    isMultiple={false}
                                                    width="100%"
                                                    type='userName'
                                                    placeholder="Select Filled by"
                                                />
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </div>
                                {/* <Grid className="customCard"
                                    container
                                    direction="row"
                                    justifyContent="flex-end"
                                    alignItems="center"
                                    sx={{ minHeight: 'auto !important' }}
                                >
                                    <Button variant="contained" className='btnPrimary' type='button' onClick={() => updateTabState("e", 1)} >Enter Job Description<ArrowForwardIosIcon /></Button>
                                </Grid> */}
                            </CustomTabPanel>
                            {/* <Stack direction="row" justifyContent="flex-end">
                            <Button variant="text" className='btnSecondary mr-4 ' type='button' onClick={() => addJobFormik.resetForm()}>Cancel</Button>
                            <Button
                                type="submit"
                                variant="contained"
                                className='btnPrimary'
                            >
                                Submit
                            </Button>
                        </Stack> */}
                            <CustomTabPanel value={value} index={1}>
                                <div className='jobPanelDiv'>
                                    <Grid container spacing={2} className="mb-2">
                                        <Grid size={12} className='pr-2'>
                                            <label>Public Job Description <span style={{ color: 'red' }}>*</span></label><span className='subTextForInput'> (This information will be published on job boards)</span>
                                            <Editor
                                                toolbarId='publicDescription'
                                                placeholder='Public Description'
                                                id='publicDescription'
                                                handleChange={(e: any) => {
                                                    addJobFormik.setFieldValue('publicDescription', e);
                                                }}
                                                editorHtml={addJobFormik.values.publicDescription}
                                                mentions={false}
                                                saveTemplate={false}
                                            />
                                            <ErrorMessage formikObj={addJobFormik} name={'publicDescription'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                        </Grid>
                                    </Grid>
                                    {/* <Grid container spacing={2} className="mb-2">
                                <Grid size={12} className='pr-2'>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            width: 'fit-content',
                                            border: (theme) => `1px solid ${theme.palette.divider}`,
                                            borderRadius: 1,
                                            bgcolor: 'background.paper',
                                            color: 'text.secondary',
                                            '& svg': {
                                                m: 0.5,
                                            },
                                            '& hr': {
                                                mx: 0.5,
                                            },
                                        }}
                                    >
                                        <FormatBoldIcon />
                                        <FormatItalicIcon />
                                        < FormatUnderlinedIcon />
                                        <Divider orientation="vertical" flexItem />
                                        <FormatAlignLeftIcon />

                                        <FormatAlignRightIcon />
                                        <FormatListNumberedIcon />
                                        <Divider orientation="vertical" flexItem />
                                        <LinkIcon />
                                        <PanoramaIcon />
                                        <SentimentSatisfiedAltIcon />
                                    </Box>
                                </Grid>
                            </Grid> */}
                                    <Grid container spacing={2} className="mb-2">
                                        <Grid size={12} className='pr-2'>
                                            <label>Original Job Description <span style={{ color: 'red' }}>*</span></label>
                                            <Editor
                                                toolbarId='originalDescription'
                                                placeholder='Original Description'
                                                id='originalDescription'
                                                handleChange={(e: any) => {
                                                    addJobFormik.setFieldValue('originalDescription', e);
                                                }}
                                                editorHtml={addJobFormik.values.originalDescription}
                                                mentions={false}
                                                saveTemplate={false}
                                            />
                                            <ErrorMessage formikObj={addJobFormik} name={'originalDescription'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                        </Grid>
                                    </Grid>
                                    {/* <Grid container spacing={2} className="mb-2">
                                    <Grid size={12} className='pr-2'>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                width: 'fit-content',
                                                border: (theme) => `1px solid ${theme.palette.divider}`,
                                                borderRadius: 1,
                                                bgcolor: 'background.paper',
                                                color: 'text.secondary',
                                                '& svg': {
                                                    m: 0.5,
                                                },
                                                '& hr': {
                                                    mx: 0.5,
                                                },
                                            }}>
                                            <FormatBoldIcon />
                                            <FormatItalicIcon />
                                            < FormatUnderlinedIcon />
                                            <Divider orientation="vertical" flexItem />
                                            <FormatAlignLeftIcon />

                                            <FormatAlignRightIcon />
                                            <FormatListNumberedIcon />
                                            <Divider orientation="vertical" flexItem />
                                            <LinkIcon />
                                            <PanoramaIcon />
                                            <SentimentSatisfiedAltIcon />
                                        </Box>
                                    </Grid>
                                </Grid> */}
                                </div>
                                {/* <Stack
                                    direction="row"
                                    className="customCard px-4 py-2"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    sx={{ minHeight: 'auto !important' }}
                                >
                                    <Button onClick={() => setValue(0)}><ArrowBackIosNewIcon />Basic Details</Button>
                                    <Stack direction="row" className="btn-container" spacing={1}  >
                                        <Button variant="contained" className='btnPrimary ' type='button' onClick={() => updateTabState("e", 2)}>Enter Requirement<ArrowForwardIosIcon /></Button>
                                    </Stack>
                                </Stack> */}
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={2}>

                                <div className='jobPanelDiv'>
                                    <Grid container spacing={2} className="mb-2">
                                        <Grid size={6} className='pr-2'>
                                            <TextField
                                                id="hiringAuthority" name='hiringAuthority'
                                                size="small"
                                                variant="outlined"
                                                fullWidth
                                                label="Hiring Authority"
                                                value={addJobFormik.values.hiringAuthority}
                                                onChange={addJobFormik.handleChange} />
                                            <div>
                                                (Select company to add hiring manager)
                                            </div>
                                        </Grid>
                                        <Grid size={6} className='pr-2'>
                                            <TextField
                                                id="requisition" name='requisition'
                                                size="small"
                                                label="Requisition #" variant="outlined"
                                                fullWidth
                                                value={addJobFormik.values.requisition}
                                                onChange={addJobFormik.handleChange} />
                                        </Grid>
                                        <Grid size={6} className='pr-2'>
                                            <TextField
                                                id="requisitionTitle" name='requisitionTitle' size="small"
                                                label="Requisition Title" variant="outlined"
                                                fullWidth
                                                value={addJobFormik.values.requisitionTitle}
                                                onChange={addJobFormik.handleChange} />
                                        </Grid>
                                        <Grid size={6} className='pr-2'>
                                            <TextField
                                                label="# of Positions"
                                                size="small"
                                                fullWidth
                                                id="ofPosition"
                                                name="ofPosition"
                                                value={addJobFormik.values.ofPosition}
                                                onChange={addJobFormik.handleChange}
                                            />
                                        </Grid>
                                        <Grid size={6} className='pr-2'>
                                            <Box>
                                                <TextField
                                                    fullWidth
                                                    label={
                                                        <Fragment>
                                                            Position Duration
                                                            <span style={{ color: 'red' }}>*</span>
                                                        </Fragment>
                                                    }
                                                    size="small"
                                                    id="positionDuration"
                                                    name='positionDuration'
                                                    variant="outlined"
                                                    select
                                                    value={addJobFormik.values.positionDuration}
                                                    onChange={addJobFormik.handleChange}
                                                >
                                                    <MenuItem value=""></MenuItem>
                                                    <MenuItem value="1 Month">1 Month</MenuItem>
                                                    <MenuItem value="2 Months">2 Months </MenuItem>
                                                    <MenuItem value="3 Months">3 Months </MenuItem>
                                                    <MenuItem value="4 Months">4 Months </MenuItem>
                                                    <MenuItem value="5 Months">5 Months </MenuItem>
                                                    <MenuItem value="6 Months">6 Months </MenuItem>
                                                    <MenuItem value="7 Months">7 Months </MenuItem>
                                                    <MenuItem value="8 Months">8 Months </MenuItem>
                                                    <MenuItem value="9 Months">9 Months </MenuItem>
                                                    <MenuItem value="10 Months">10 Months </MenuItem>
                                                    <MenuItem value="11 Months">11 Months </MenuItem>
                                                    <MenuItem value="12 Months">12 Months </MenuItem>
                                                    <MenuItem value="18 Months">18 Months </MenuItem>
                                                    <MenuItem value="24 Months">24 Months </MenuItem>
                                                    <MenuItem value="30 Months">30 Months </MenuItem>
                                                    <MenuItem value="36 Months">36 Months </MenuItem>
                                                    <MenuItem value="0-6 mo. contract">0-6 mo. contract </MenuItem>
                                                    <MenuItem value="1 year contract">1 year contract </MenuItem>
                                                    <MenuItem value="1: Full-time / Perm">1: Full-time / Perm </MenuItem>
                                                    <MenuItem value="13 wk contract">13 wk contract </MenuItem>
                                                    <MenuItem value="2: Contract to Perm">2: Contract to Perm </MenuItem>
                                                    <MenuItem value="26 wk contract">26 wk contract </MenuItem>
                                                    <MenuItem value="6 mo. + contract only">6 mo. + contract only</MenuItem>
                                                </TextField>
                                                <ErrorMessage formikObj={addJobFormik} name={'positionDuration'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                            </Box>
                                        </Grid>
                                        <Grid size={2} className='pr-2'>
                                            <FormControlLabel
                                                control={<Checkbox />}
                                                label="Part Time"
                                                labelPlacement="end"
                                                id="partTime"
                                                name="partTime"
                                                value={addJobFormik.values.partTime}
                                                onChange={addJobFormik.handleChange}
                                                sx={{ mr: 0 }}
                                            />
                                        </Grid>
                                        <Grid size={4} className='pr-2'>
                                            <Box>
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    id="parttime_value"
                                                    name="parttime_value"
                                                    value={addJobFormik.values.parttime_value}
                                                    onChange={addJobFormik.handleChange}
                                                    disabled={!addJobFormik.values.partTime}
                                                    select
                                                >
                                                    <MenuItem value=""></MenuItem>
                                                    <MenuItem value="1-30">1 - 30 Hours</MenuItem>
                                                    <MenuItem value="31-40">31 - 40 Hours</MenuItem>
                                                </TextField>
                                            </Box>
                                        </Grid>
                                        <Grid size={6} className='pr-2'>
                                            {/* <TextField
                                                label="Start Date"
                                                size="small"
                                                fullWidth
                                                id="startDate"
                                                name='startDate'
                                                value={addJobFormik.values.startDate}
                                                onChange={addJobFormik.handleChange}
                                                type="date"
                                            /> */}
                                            <LocalizationProvider dateAdapter={AdapterLuxon} >
                                                <DatePicker
                                                    label="Start Date"
                                                    slotProps={{ textField: { size: 'small' } }}
                                                    sx={{ width: '100%' }}
                                                    onChange={(date: any) => addJobFormik.setFieldValue("startDate", date.toFormat('MM-dd-yyyy'))}
                                                />
                                            </LocalizationProvider>
                                        </Grid>
                                        <Grid size={6} className='pr-2'>
                                            {/* <TextField
                                                label="Est.End Date"
                                                size="small"
                                                fullWidth
                                                id="endDate"
                                                name='endDate'
                                                value={addJobFormik.values.endDate}
                                                onChange={addJobFormik.handleChange}
                                            /> */}
                                            <LocalizationProvider dateAdapter={AdapterLuxon} >
                                                <DatePicker
                                                    label="Est.End Date"
                                                    slotProps={{ textField: { size: 'small' } }}
                                                    sx={{ width: '100%' }}
                                                    onChange={(date: any) => addJobFormik.setFieldValue("endDate", date.toFormat('MM-dd-yyyy'))}
                                                />
                                            </LocalizationProvider>
                                        </Grid>
                                        <Grid size={6} className='pr-2'>
                                            <TextField
                                                id="submissionsAllowed" label="Submissions Allowed" name='submissionsAllowed' size="small"
                                                variant="outlined"
                                                fullWidth
                                                type="number"
                                                value={addJobFormik.values.submissionsAllowed}
                                                onChange={addJobFormik.handleChange} />
                                        </Grid>
                                        <Grid size={6} className='pr-2'>
                                            <TextField
                                                label="MSP Coordinator"
                                                id="mspCoordinator" name='mspCoordinator'
                                                size="small" variant="outlined"
                                                fullWidth
                                                value={addJobFormik.values.mspCoordinator}
                                                onChange={addJobFormik.handleChange} />
                                        </Grid>
                                        <Grid size={6} className='pr-2'>
                                            <TextField
                                                label="Cost Center Number"
                                                id="costCenterNumber" name='costCenterNumber'
                                                size="small"
                                                variant="outlined"
                                                fullWidth
                                                value={addJobFormik.values.costCenterNumber}
                                                onChange={addJobFormik.handleChange} />
                                        </Grid>
                                        <Grid size={6} className='pr-2'>
                                            <TextField
                                                label="Business Unit"
                                                id="businessUnit"
                                                name='businessUnit'
                                                size="small"
                                                variant="outlined"
                                                fullWidth
                                                value={addJobFormik.values.businessUnit}
                                                onChange={addJobFormik.handleChange} />
                                        </Grid>
                                    </Grid>
                                </div>
                                {/* <Stack
                                    direction="row"
                                    className="customCard px-4 py-2"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    sx={{ minHeight: 'auto !important' }}
                                >
                                    <Button onClick={() => setValue(1)}><ArrowBackIosNewIcon />Description</Button>
                                    <Stack direction="row" className="btn-container" spacing={1}>
                                        <Button onClick={() => updateTabState("e", 3)} variant="contained" type='button' className='btnPrimary'>Enter Location<ArrowForwardIosIcon /></Button>
                                    </Stack>
                                </Stack> */}
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={3}>
                                <div className='jobPanelDiv'>
                                    <Grid container spacing={2} className="mb-2">
                                        <Grid size={6} className='pr-2'>
                                            <Box>
                                                <FormControlLabel
                                                    control={<Checkbox />}
                                                    label="Remote Job"
                                                    labelPlacement="end"
                                                    id="remoteJob"
                                                    name="remoteJob"
                                                    value={addJobFormik.values.remoteJob}
                                                    onChange={addJobFormik.handleChange}
                                                    sx={{ mr: 0 }}
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid size={6} className='pr-2'>
                                            <Box>
                                                <TextField fullWidth
                                                    label="Remote Job"
                                                    id="remote_value"
                                                    name="remote_value"
                                                    select
                                                    size="small"
                                                    value={addJobFormik.values.remote_value}
                                                    onChange={addJobFormik.handleChange}
                                                    disabled={!addJobFormik.values.remoteJob}
                                                >
                                                    <MenuItem value=""></MenuItem>
                                                    <MenuItem value="always">Always </MenuItem>
                                                    <MenuItem value="until covid">Until Covid</MenuItem>
                                                </TextField>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} className="mb-2">
                                        <Grid size={6} className='pr-2'>
                                            <TextField
                                                label={
                                                    <Fragment>
                                                        Street Address :
                                                        <span style={{ color: 'red' }}>*</span>
                                                    </Fragment>
                                                }
                                                id="streetAddress"
                                                name='streetAddress'
                                                size="small"
                                                variant="outlined"
                                                fullWidth
                                                value={addJobFormik.values.streetAddress}
                                                onChange={addJobFormik.handleChange} />
                                            <ErrorMessage formikObj={addJobFormik} name={'streetAddress'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                        </Grid>
                                        <Grid size={6} className='pr-2'>
                                            <TextField
                                                label={
                                                    <Fragment>
                                                        Job City
                                                        <span style={{ color: 'red' }}>*</span>
                                                    </Fragment>
                                                }
                                                id="jobCity"
                                                name='jobCity'
                                                size="small"
                                                fullWidth
                                                value={addJobFormik.values.jobCity}
                                                onChange={addJobFormik.handleChange}
                                            />
                                            <ErrorMessage formikObj={addJobFormik} name={'jobCity'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                        </Grid>
                                        <Grid size={6} className='pr-2'>
                                            <Box>
                                                <TextField fullWidth
                                                    label={
                                                        <Fragment>
                                                            State or Prov :
                                                            <span style={{ color: 'red' }}>*</span>
                                                        </Fragment>
                                                    }
                                                    id="stateOrPro"
                                                    name='stateOrPro'
                                                    size="small"
                                                    variant="outlined"
                                                    select
                                                    value={addJobFormik.values.stateOrPro}
                                                    onChange={addJobFormik.handleChange} >
                                                    <MenuItem value="--Select State--">--Select State--</MenuItem>
                                                    <MenuItem value="AL">Alabama</MenuItem>
                                                    <MenuItem value="AK">Alaska</MenuItem>
                                                    <MenuItem value="AZ">Arizona</MenuItem>
                                                    <MenuItem value="AR">Arkansas</MenuItem>
                                                    <MenuItem value="CA">California</MenuItem>
                                                    <MenuItem value="CO">Colorado</MenuItem>
                                                    <MenuItem value="CT">Connecticut</MenuItem>
                                                    <MenuItem value="DC">District of Columbia</MenuItem>
                                                    <MenuItem value="DE">Delaware</MenuItem>
                                                    <MenuItem value="FL">Florida</MenuItem>
                                                    <MenuItem value="GA">Georgia</MenuItem>
                                                    <MenuItem value="HI">Hawaii</MenuItem>
                                                    <MenuItem value="ID">Idaho</MenuItem>
                                                    <MenuItem value="IL">Illinois</MenuItem>
                                                    <MenuItem value="IN">Indiana</MenuItem>
                                                    <MenuItem value="IA">Iowa</MenuItem>
                                                    <MenuItem value="KS">Kansas</MenuItem>
                                                    <MenuItem value="KY">Kentucky</MenuItem>
                                                    <MenuItem value="LA">Louisiana</MenuItem>
                                                    <MenuItem value="ME">Maine</MenuItem>
                                                    <MenuItem value="MD">Maryland</MenuItem>
                                                    <MenuItem value="MA">Massachusetts</MenuItem>
                                                    <MenuItem value="MH">Marshall Islands</MenuItem>
                                                    <MenuItem value="MI">Michigan</MenuItem>
                                                    <MenuItem value="MN">Minnesota</MenuItem>
                                                    <MenuItem value="MS">Mississippi</MenuItem>
                                                    <MenuItem value="MO">Missouri</MenuItem>
                                                    <MenuItem value="MT">Montana</MenuItem>
                                                    <MenuItem value="NE">Nebraska</MenuItem>
                                                    <MenuItem value="NV">Nevada</MenuItem>
                                                    <MenuItem value="NH">New Hampshire</MenuItem>
                                                    <MenuItem value="NJ">New Jersey</MenuItem>
                                                    <MenuItem value="NM">New Mexico</MenuItem>
                                                    <MenuItem value="NY">New York</MenuItem>
                                                    <MenuItem value="NC">North Carolina</MenuItem>
                                                    <MenuItem value="ND">North Dakota</MenuItem>
                                                    <MenuItem value="OH">Ohio</MenuItem>
                                                    <MenuItem value="OK">Oklahoma</MenuItem>
                                                    <MenuItem value="OR">Oregon</MenuItem>
                                                    <MenuItem value="PA">Pennsylvania</MenuItem>
                                                    <MenuItem value="RI">Rhode Island</MenuItem>
                                                    <MenuItem value="SC">South Carolina</MenuItem>
                                                    <MenuItem value="SD">South Dakota</MenuItem>
                                                    <MenuItem value="TN">Tennessee</MenuItem>
                                                    <MenuItem value="TX">Texas</MenuItem>
                                                    <MenuItem value="UT">Utah</MenuItem>
                                                    <MenuItem value="VT">Vermont</MenuItem>
                                                    <MenuItem value="VA">Virginia</MenuItem>
                                                    <MenuItem value="WA">Washington</MenuItem>
                                                    <MenuItem value="WV">West Virginia</MenuItem>
                                                    <MenuItem value="WI">Wisconsin</MenuItem>
                                                    <MenuItem value="WY">Wyoming</MenuItem>
                                                </TextField>
                                                <ErrorMessage formikObj={addJobFormik} name={'stateOrPro'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                            </Box>
                                        </Grid>
                                        <Grid size={6} className='pr-2'>
                                            <TextField
                                                label={
                                                    <Fragment>
                                                        Job Postal Code
                                                        <span style={{ color: 'red' }}>*</span>
                                                    </Fragment>
                                                }
                                                size="small"
                                                fullWidth
                                                id="jobPostalCode"
                                                name='jobPostalCode'
                                                value={addJobFormik.values.jobPostalCode}
                                                onChange={addJobFormik.handleChange}
                                            />
                                            <ErrorMessage formikObj={addJobFormik} name={'jobPostalCode'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                        </Grid>
                                        <Grid size={6} className='pr-2'>
                                            <TextField
                                                label="Area Code"
                                                size="small"
                                                fullWidth
                                                id="areaCode"
                                                name='areaCode'
                                                value={addJobFormik.values.areaCode}
                                                onChange={addJobFormik.handleChange}
                                            />
                                        </Grid>
                                        <Grid size={6} className='pr-2'>
                                            <TextField
                                                label="Country/Locale"
                                                id="countryOrLocale" name='countryOrLocale'
                                                size="small"
                                                variant="outlined"
                                                fullWidth
                                                value={addJobFormik.values.countryOrLocale}
                                                onChange={addJobFormik.handleChange} />
                                        </Grid>
                                        <Grid size={6} className='pr-2'>
                                            <Box>
                                                <TextField fullWidth label="Job Region"
                                                    id="jobRegion"
                                                    name='jobRegion'
                                                    size="small"
                                                    select
                                                    value={addJobFormik.values.jobRegion}
                                                    onChange={addJobFormik.handleChange}
                                                >
                                                    <MenuItem value="0"></MenuItem>
                                                    <MenuItem value="-PST"> -PST </MenuItem>
                                                    <MenuItem value="-MST"> -MST </MenuItem>
                                                    <MenuItem value="-CST"> -CST </MenuItem>
                                                    <MenuItem value="-EST"> -EST </MenuItem>
                                                    <MenuItem value="-GMT"> -GMT </MenuItem>
                                                </TextField>
                                            </Box>
                                        </Grid>
                                        <Grid size={6} className='pr-2'>
                                            <TextField
                                                label="Travel %"
                                                id="travel"
                                                name='travel'
                                                size="small"
                                                variant="outlined"
                                                fullWidth
                                                value={addJobFormik.values.travel}
                                                onChange={addJobFormik.handleChange} />
                                        </Grid>
                                    </Grid>
                                </div>
                                {/* <Stack
                                    direction="row"
                                    className="customCard px-4 py-2"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    sx={{ minHeight: 'auto !important' }}
                                >
                                    <Button onClick={() => setValue(2)} ><ArrowBackIosNewIcon />Requirement</Button>
                                    <Stack direction="row" className="btn-container" spacing={1}>
                                        <Button onClick={() => updateTabState("e", 4)} variant="contained" type='button' className='btnPrimary'>Enter Compensation<ArrowForwardIosIcon /></Button>
                                    </Stack>
                                </Stack> */}
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={4}>
                                <div className='jobPanelDiv'>
                                    <Grid container spacing={2} className="mb-2">
                                        <Grid size={6} className='pr-2'>
                                            <div>
                                                <label>Select Compensation Type</label>
                                                <FormControl>
                                                    <RadioGroup row
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        defaultValue=""
                                                        name="rdjobtype"
                                                        value={addJobFormik.values.rdjobtype}
                                                        onChange={addJobFormik.handleChange}
                                                    >
                                                        <FormControlLabel value="freelancer" control={<Radio />} label="Freelancer" />
                                                        <FormControlLabel value="directHire" control={<Radio />} label="Direct Hire" />
                                                        <FormControlLabel value="contract" control={<Radio />} label="Contract" />
                                                    </RadioGroup>
                                                </FormControl>
                                            </div>
                                        </Grid>
                                    </Grid>

                                    {addJobFormik.values.rdjobtype === "freelancer" && <Grid
                                        container
                                        spacing={2}
                                        className="mb-2"
                                    >
                                        <Grid size={12} className='pr-2'>
                                            <label>Pay Range<span style={{ color: 'red' }}>*</span></label>
                                        </Grid>
                                        <Grid size={6} className='pr-2 pt-1'>
                                            <TextField
                                                label="From"
                                                id="txtFreelancePayRange"
                                                name='txtFreelancePayRange'
                                                size="small"
                                                variant="outlined"
                                                fullWidth
                                                value={addJobFormik.values.txtFreelancePayRange}
                                                onChange={addJobFormik.handleChange}
                                                type="number"
                                            />
                                            <ErrorMessage formikObj={addJobFormik} name={'txtFreelancePayRange'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                        </Grid>
                                        <Grid size={6} className='pr-2 pt-1'>
                                            <TextField
                                                label="To"
                                                id="txtFreelancePayRange1"
                                                name='txtFreelancePayRange1'
                                                size="small"
                                                variant="outlined"
                                                fullWidth
                                                value={addJobFormik.values.txtFreelancePayRange1}
                                                onChange={addJobFormik.handleChange}
                                                type="number"
                                            />
                                            <ErrorMessage formikObj={addJobFormik} name={'txtFreelancePayRange1'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                        </Grid>
                                        <Grid size={6} className='pr-2'>
                                            <Box>
                                                <TextField fullWidth
                                                    label={
                                                        <Fragment>
                                                            Employment Type
                                                            <span style={{ color: 'red' }}>*</span>
                                                        </Fragment>
                                                    }
                                                    id="freelancePayType"
                                                    name="freelancePayType"
                                                    select
                                                    size="small"
                                                    value={addJobFormik.values.freelancePayType}
                                                    onChange={addJobFormik.handleChange}
                                                >
                                                    <MenuItem value="0"></MenuItem>
                                                    <MenuItem value="P">Project</MenuItem>
                                                    <MenuItem value="H">Hourly</MenuItem>
                                                </TextField>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    }
                                    {addJobFormik.values.rdjobtype === "directHire" && <Grid
                                        container
                                        spacing={2}
                                        className="mb-2"
                                    >
                                        <Grid size={12} className='pr-2'>
                                            <label>Pay Range<span style={{ color: 'red' }}>*</span></label>
                                        </Grid>
                                        <Grid size={6} className='pr-2 pt-1'>
                                            <TextField
                                                label="From"
                                                id="txtJobPayRange"
                                                name='txtJobPayRange'
                                                size="small"
                                                variant="outlined"
                                                fullWidth
                                                value={addJobFormik.values.txtJobPayRange}
                                                onChange={addJobFormik.handleChange}
                                                type="number"
                                            />
                                            <ErrorMessage formikObj={addJobFormik} name={'txtJobPayRange'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                        </Grid>
                                        <Grid size={6} className='pr-2 pt-1'>
                                            <TextField
                                                label="To"
                                                id="txtJobPayRange1"
                                                name='txtJobPayRange1'
                                                size="small"
                                                variant="outlined"
                                                fullWidth
                                                value={addJobFormik.values.txtJobPayRange1}
                                                onChange={addJobFormik.handleChange}
                                                type="number"
                                            />
                                            <ErrorMessage formikObj={addJobFormik} name={'txtJobPayRange1'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                        </Grid>
                                        <Grid size={6} className='pr-2'>
                                            <Box>
                                                <TextField fullWidth
                                                    label={
                                                        <Fragment>
                                                            Employment Type
                                                            <span style={{ color: 'red' }}>*</span>
                                                        </Fragment>
                                                    }
                                                    id="freelancePayType"
                                                    name="freelancePayType"
                                                    select
                                                    size="small"
                                                    value={addJobFormik.values.freelancePayType}
                                                    onChange={addJobFormik.handleChange}
                                                >
                                                    <MenuItem value="0"></MenuItem>
                                                    <MenuItem value="S">Salary</MenuItem>
                                                    <MenuItem value="H">Hourly</MenuItem>
                                                </TextField>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    }
                                    {addJobFormik.values.rdjobtype === "contract" && <Grid
                                        container
                                        spacing={2}
                                        className="mb-2"
                                    >
                                        <Grid size={6} className='pr-2'>
                                            <Box>
                                                <TextField fullWidth
                                                    label={
                                                        <Fragment>
                                                            Employment Type
                                                            <span style={{ color: 'red' }}>*</span>
                                                        </Fragment>
                                                    }
                                                    id="txtJobEmpType"
                                                    name="txtJobEmpType"
                                                    select
                                                    size="small"
                                                    value={addJobFormik.values.txtJobEmpType}
                                                    onChange={addJobFormik.handleChange}
                                                >
                                                    <MenuItem value=""></MenuItem>
                                                    <MenuItem value="1">Employee </MenuItem>
                                                    <MenuItem value="2">Independent</MenuItem>
                                                    <MenuItem value="3">W2 Only</MenuItem>
                                                    <MenuItem value="4">Corp-corp</MenuItem>
                                                    <MenuItem value="5">W2 OR corp-corp</MenuItem>
                                                </TextField>
                                                <ErrorMessage formikObj={addJobFormik} name={'txtJobEmpType'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                            </Box>
                                        </Grid>
                                        <Grid size={12} className='pr-2'>

                                            <Grid container spacing={2} className="mb-2">
                                                <Grid size={6} className='pr-2'>
                                                    <TextField fullWidth
                                                        id="txtBillrate2"
                                                        name="txtBillrate2"
                                                        size="small"
                                                        label={
                                                            <Fragment>
                                                                Bill Rate (Min)
                                                                <span style={{ color: 'red' }}>*</span>
                                                            </Fragment>
                                                        }
                                                        variant="outlined"
                                                        value={addJobFormik.values.txtBillrate2}
                                                        onChange={addJobFormik.handleChange}
                                                        type="number"
                                                    />
                                                    <ErrorMessage formikObj={addJobFormik} name={'txtBillrate2'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                                </Grid>
                                                <Grid size={6} className='pr-2'>
                                                    <TextField fullWidth
                                                        id="txtBillrate"
                                                        name="txtBillrate"
                                                        size="small"
                                                        label={
                                                            <Fragment>
                                                                Bill Rate (Max)
                                                                <span style={{ color: 'red' }}>*</span>
                                                            </Fragment>
                                                        }
                                                        variant="outlined"
                                                        value={addJobFormik.values.txtBillrate}
                                                        onChange={addJobFormik.handleChange}
                                                        type="number"
                                                    />
                                                    <ErrorMessage formikObj={addJobFormik} name={'txtBillrate'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                                </Grid>
                                                <Grid size={6} className='pr-2'>
                                                    <TextField fullWidth
                                                        id="txtTargetPay2"
                                                        name="txtTargetPay2"
                                                        size="small"
                                                        label={
                                                            <Fragment>
                                                                Pay Rate (Min)
                                                                <span style={{ color: 'red' }}>*</span>
                                                            </Fragment>
                                                        }
                                                        variant="outlined"
                                                        value={addJobFormik.values.txtTargetPay2}
                                                        onChange={addJobFormik.handleChange}
                                                        type="number"
                                                    />
                                                    <ErrorMessage formikObj={addJobFormik} name={'txtTargetPay2'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                                </Grid>
                                                <Grid size={6} className='pr-2'>
                                                    <TextField fullWidth
                                                        id="txtTargetPay"
                                                        name="txtTargetPay"
                                                        size="small"
                                                        label={
                                                            <Fragment>
                                                                Pay Rate (Max)
                                                                <span style={{ color: 'red' }}>*</span>
                                                            </Fragment>
                                                        }
                                                        variant="outlined"
                                                        value={addJobFormik.values.txtTargetPay}
                                                        onChange={addJobFormik.handleChange}
                                                        type="number"
                                                    />
                                                    <ErrorMessage formikObj={addJobFormik} name={'txtTargetPay'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    }

                                </div>
                                {/* <Stack
                                    direction="row"
                                    className="customCard px-4 py-2"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    sx={{ minHeight: 'auto !important' }}
                                >
                                    <Button onClick={() => setValue(3)} ><ArrowBackIosNewIcon />Location</Button>
                                    <Stack direction="row" className="btn-container" spacing={1}>
                                        <Button variant="contained" className='btnPrimary' type='button' onClick={saveForm}>Create and Save Job<ArrowForwardIosIcon /></Button>
                                    </Stack>
                                </Stack> */}
                            </CustomTabPanel>
                        </div>
                    </Grid>
                </form >
            </DialogContent >
            <Divider />
            <DialogActions>
                <Grid
                    container
                    direction="row"
                    justifyContent={`${(value === 0) ? 'flex-end' : (value === 5) ? 'flex-start' : 'space-between'}`}
                    // sx={{ minHeight: 'auto !important' }}
                    alignItems="center"
                    className="px-4"
                >
                    <Button type="button" color="secondary" className={`${value !== 0 ? '' : 'v-hidden'}`} onClick={() => setValue(value - 1)} size="medium">
                        <ArrowBackIosNewIcon />
                        {
                            (value === 1) ? 'Basic Details' : (value === 2) ? 'Job Description' : (value === 3) ? 'Requirement' : (value === 4) ? 'Location' : ''
                        }
                    </Button>

                    <Button type="button" color="primary" className={`${value !== 4 ? '' : 'v-hidden'}`} onClick={() => updateTabState("e", value + 1)} size="medium" variant="contained">
                        {
                            (value === 0) ? 'Job Description' : (value === 1) ? 'Requirement' : (value === 2) ? 'Location' : (value === 3) ? 'Compensation' : ''
                        }
                        <ArrowForwardIosIcon />
                    </Button>
                </Grid>
            </DialogActions>
        </Dialog>
    );
}
export default AddJob1;