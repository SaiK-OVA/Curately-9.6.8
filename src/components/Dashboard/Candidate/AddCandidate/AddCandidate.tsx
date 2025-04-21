import { React, useCallback, useState } from '../../../../shared/modules/React';
import { useDropzone } from 'react-dropzone';
// import Grid from '@mui/material/Grid';
import { Button } from '../../../../shared/modules/MaterialImports/Button';
// import Stack from '@mui/material/Stack';
// import Divider from '@mui/material/Divider';
// import Container from '@mui/material/Container';
import { TextField } from '../../../../shared/modules/MaterialImports/TextField';
// import Typography from '@mui/material/Typography';
// import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { Grid } from '../../../../shared/modules/MaterialImports/Grid';
import { showToaster } from '../../../shared/SnackBar/SnackBar';
import ApiService from '../../../../shared/api/api';
import { Dialog, DialogContent, DialogTitle } from '../../../../shared/modules/MaterialImports/Dialog';
import { Divider } from '../../../../shared/modules/MaterialImports/Divider';
import './AddCandidate.scss';
import { Yup, useFormik } from '../../../../shared/modules/Formik'
// import { FormControl } from '@mui/material';
import ErrorMessage from '../../../shared/Error/ErrorMessage';
import { userLocalData } from '../../../../shared/services/userData';
import { Box } from '../../../../shared/modules/MaterialImports/Box';
import { Tab, Tabs } from '../../../../shared/modules/MaterialImports/Tabs';
import { globalData } from '../../../../shared/services/globalData';
import { trackPromise } from '../../../../shared/modules/PromiseTrackter';



export interface SimpleDialogProps {
    open: boolean;
    closePopup: () => void;
}


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
            id={`candidateTabsPanel-${index}`}
            aria-labelledby={`candidateTabsPanel-${index}`}
            {...other}
            className='candidateTabsPanel customTabsPanel mx-0'
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}


const AddCandidate = (
    { open, closePopup }: SimpleDialogProps
) => {

    const onDrop = useCallback((acceptedFiles: any) => {
        // Do something with the files

        addCandidateFormik.setFieldValue('resume', acceptedFiles && acceptedFiles.length ? acceptedFiles[0] : null);
    }, []);
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDrop, multiple: false })

    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const initialValues = {
        resume: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNo: '',
    }

    const addCandidateSchema = Yup.object({
        resume: Yup.string().required('Required'),
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        email: Yup.string().required('Required').email('Invalid email format'),
        phoneNo: Yup.string(),
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
        // console.log(acceptedFiles);
        if (addCandidateFormik.values.resume || (addCandidateFormik.values.firstName && addCandidateFormik.values.lastName && addCandidateFormik.values.email)) {
            // Contacts/contacts_save.jsp
            let tempFormData = new FormData();
            tempFormData.append('Fname', (addCandidateFormik.values.firstName) ? addCandidateFormik.values.firstName : "");
            tempFormData.append('Lname', (addCandidateFormik.values.lastName) ? addCandidateFormik.values.lastName : "");
            tempFormData.append('Email', (addCandidateFormik.values.email) ? addCandidateFormik.values.email : "");
            tempFormData.append('Resume', addCandidateFormik.values.resume);
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
                                window.open(globalData.getWindowLocation() + "candidate/view/" + response.data.candidateId);
                            }, 250);
                            closePopup();
                        } else {
                            showToaster((response.data.message) ? response.data.message : "An error occured while saving the Candidate.", 'error')
                        }
                    }
                )
            )
        } else {
            showToaster('Please fill all required fields.', 'error');
        }
    }
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        if (event) { }
        setValue(newValue);

        setIsFormSubmitted(false);
        acceptedFiles.splice(0, 1)
        addCandidateFormik.setFieldValue('resume', null);
    };

    const files = acceptedFiles.map((file: any) => (
        <span key={file.path}>
            {file.path} - {(file.size / (1024 * 1024)).toFixed(2)} MB
        </span>
    ));
    // console.log(files);

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
                    <span className='addHeader'>Create New Candidate</span>
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
                            >Save Candidate</Button>
                        </Grid>
                    </div>
                </Grid>
            </DialogTitle>
            <Divider />
            <DialogContent className='px-5'>
                <Box sx={{ width: '100%' }}>
                    <Box
                        className='customCard py-0 customCenteredTabs '
                        sx={{ borderBottom: 1, borderColor: 'divider', minHeight: 'auto !important', marginBottom: '0 !important' }}

                    >
                        <Tabs value={value} onChange={handleChange} aria-label="View Company Tabs" centered>
                            <Tab
                                label={
                                    <Grid container direction="row">
                                        <span className='tabLabelName'>With Resume</span>
                                    </Grid>
                                }
                                className='tabButton'
                            />
                            <Tab
                                label={
                                    <Grid container direction="row">
                                        <span className='tabLabelName'>Without Resume</span>
                                    </Grid>
                                }
                                className='tabButton'
                            />
                        </Tabs>
                    </Box>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <div className='customDropZone'>
                        <div {...getRootProps({
                            className: `dropzone ${acceptedFiles.length > 0 ? 'fileDroped' : ''}`
                        })}>
                            <input {...getInputProps()} multiple={false} />
                            {
                                isDragActive ?
                                    <p>Drop the resume here ... *</p> :
                                    (files && files.length) ?
                                        <p>{files}</p>
                                        :
                                        <p>Drag 'n' drop resume here, or click to select <span style={{ color: 'red' }}>*</span></p>
                            }
                        </div>
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <Grid container spacing={2} className="mb-1">
                        <Grid size={6} className='mt-1'>
                            <label className='inputLabel'>First Name </label><span style={{ color: 'red' }}>*</span>
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
                            <label className='inputLabel'>Last Name </label><span style={{ color: 'red' }}>*</span>
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
                            <label className='inputLabel'>Email </label><span style={{ color: 'red' }}>*</span>
                            <TextField fullWidth className='mt-1'
                                id="email"
                                name="email"
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
                            <label className='inputLabel'>Phone No </label>
                            <TextField fullWidth className='mt-1'
                                id="phoneNo"
                                name="phoneNo"
                                variant="outlined"
                                type="text"
                                size="small"
                                value={addCandidateFormik.values.phoneNo}
                                onChange={addCandidateFormik.handleChange}
                                error={(addCandidateFormik.errors.phoneNo && isFormSubmitted) ? true : false}
                            />
                            {/* <ErrorMessage formikObj={addCandidateFormik} name={'phoneNo'} isFormSubmitted={isFormSubmitted}></ErrorMessage> */}
                        </Grid>
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
                    </Grid>
                </CustomTabPanel>

            </DialogContent>
        </Dialog>
    );
}

export default AddCandidate;
