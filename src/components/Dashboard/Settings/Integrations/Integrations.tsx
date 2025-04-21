import { Typography } from '../../../../shared/modules/MaterialImports/Typography';
import { Divider } from '../../../../shared/modules/MaterialImports/Divider';
import { Link } from 'react-router-dom';
import MergeTo from "./MergeTo/MergeTo";
import { useEffect, useState } from '../../../../shared/modules/React';
// import TextField from '@mui/material/TextField';
// import { showToaster } from '../../../shared/SnackBar/SnackBar';
import ApiService from '../../../../shared/api/api';
import { trackPromise } from '../../../../shared/modules/PromiseTrackter';
import { Grid, Button } from '../../../../shared/modules/commonImports';
// import { Yup, useFormik, Formik, Form } from '../../../../shared/modules/Formik';
// import { Dialog, DialogActions, DialogContent, DialogTitle } from '../../../../shared/modules/MaterialImports/Dialog';
// import CloseIcon from '@mui/icons-material/Close';
// import { showToaster } from '../../../shared/SnackBar/SnackBar';
// import ErrorMessage from '../../../shared/Error/ErrorMessage';

// import { TextField } from '../../../../shared/modules/MaterialImports/FormInputs';
// import { MenuItem } from '../../../../shared/modules/MaterialImports/Menu';





import './Integrations.scss';
// import { userLocalData } from '../../../../shared/services/userData';



const Integrations = () => {


    const [integrationData, setIntegrationData] = useState({
        linkToken: "",
        clientName: "",
        integrationName: "",
        uniqueId: ""
    });
    const [connectedData, setConnectedData] = useState<{ image: string; integrationName: string; uniqueId: string; } | null>(null)

    // const [mergeDialogOpen, setMergeDialogOpen] = useState(false);

    // const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    // const submitForm = () => {
    //     if (integrationId) {
    //         setIsFormSubmitted(true);
    //     } else {
    //         showToaster("Please enter integration Id", 'error');
    //     }
    // }
    // http://35.155.202.216:8095/merge-uapi-service/link-token

    const getApiToken = () => {
        // setIsFormSubmitted(true);
        // if (mergeToFormik.isValid) {
        //     { ...mergeToFormik.values }
        trackPromise(
            ApiService.getCall('merge', `link-token`,).then((response: any) => {
                console.log(response.data);
                setIntegrationData(response.data);
                // setMergeDialogOpen(false);
            })
        )
        // } else {
        //     showToaster("Please enter valid details", 'error');
        // }
    }

    // const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    // const initialValues = {
    //     orginId: "",
    //     organizationName: "",
    //     email: "",
    //     category: "ats"
    // }

    // const mergeToSchema = Yup.object({
    //     orginId: Yup.string().required('Origin Id is Required'),
    //     organizationName: Yup.string().required('Organization Name Required'),
    //     email: Yup.string().required('Email is Required').email('Invalid email format'),
    //     category: Yup.string().required('Catergory is required'),
    // })
    // const mergeToFormik = useFormik({
    //     initialValues,
    //     validationSchema: mergeToSchema,
    //     onSubmit: () => {
    //         // getApiToken();
    //     },
    //     validateOnMount: true

    // });

    const getLatestIntegration = () => {
        trackPromise(
            // https://merge.curately.ai/merge-uapi-service-qa/getLatest/{clientId}
            // ${userLocalData.getvalue("clientId")}
            // ed25cd50bb2be4301ac98037d74e2af2-3
            ApiService.getCall("merge", `getLatest/3`).then((res) => {
                if (res.data?.Success) {
                    setConnectedData(res.data.data || null);
                } else getApiToken();
            })
        )
    }

    useEffect(() => {
        // getApiToken();
        getLatestIntegration();
        saveAuditLog(4290);
    }, []);


    const saveAuditLog = (id: number) => {
        ApiService.saveAuditLog(id);
    }

    return (
        <div>
            <Typography variant="h5" className='mb-2 pl-2' >Integrations</Typography>
            <Divider className='mb-1' />

            <Grid container sx={{ width: 770, margin: "auto", marginTop: "20px" }} >
                <Typography className='mb-2 fs-14 fw-5'>Connected integrations</Typography>
                {/* {
                    isMergeToView && !isFormSubmitted ?
                        <div className='customCard mt-3 d-flex'>
                            <TextField fullWidth className='mt-1'
                                id="integrationId"
                                name="integrationId"
                                variant="outlined"
                                type="text"
                                size="small"
                                value={integrationId}
                                onChange={(e) => setIntegrationId(e.target.value)}
                                label='Enter Integration ID for MergeTo'
                            />

                            <Button variant="contained" onClick={submitForm} className='ml-4 mt-2'>Submit</Button>
                        </div>
                        :
                        null
                } */}
                {
                    (integrationData?.linkToken || connectedData?.uniqueId) ?
                        <div className='d-flex w-100'>

                            <MergeTo integrationData={integrationData} passedData={connectedData} />
                            {/* <div>
                                <Button variant="outlined" size='small' onClick={() => setIsFormSubmitted(false)} className='ml-4 mt-2'>close</Button>
                            </div> */}
                        </div>
                        :
                        // <Grid container className='py-3'>  <Button variant="contained" size="large" onClick={() => setMergeDialogOpen(true)}>Open Merge To</Button> </Grid>  :
                        null
                }
                <div className='customCard pr-0 pt-1 pl-0 mt-3'>
                    <Grid container spacing={2} className=""
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center">
                        <Grid size={1} className='mt-4 ml-4'>
                            <img src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAf5JREFUaAXtmM9KAzEQxid/im5bexEriPRWL76AIHj3Fbz6KD6DzyD4DJ7Ecz1VvAiyeChaKFht0W4SE2GhzZ7KTjDEWSjNbLdf5/t+u4UMA8Tj8HrYLlqdAXDeN6qop8wA1Axg/mgXpp7U8rf5cvEf1mQ4dcpEmAgnlgDd0okBrdghwpVIEjtBhBMDWrFDhCuRJHaCCCcGtGKHCFciWePEZDLXa1z+J5fKy+FrG+uX76YfrfsxMGPsTAZjLOM07IQH85BZpznAEHR9nTQz/vA86r1/a+AYjhmD7GAT1bTkXPaxDAuhHV4whQaDQIYJANG03SFolR6lKhbluta760kpjPvYawNZkv6lvXyTK4lwckg9Q0TYCyS5kggnh9QzRIS9QJIriXBySD1DRNgLJLny3xGWAsmy2w8Lu3d10x2Nsoc1dmrCgAmJOwB4GSuU29YZXlinWUP8Tjvq58hAM1h8GZVrw7SdpKDMPdj+RY7EA4Dbls5Pt2BvW4CqOb8UUloN9XQ7mh3f5OPP7g4KF5BYU5kytYZ1vSEYqJo8hH3WlH1Aznrd6dXR7uwNxy/Imn2ttOG0nPHytfLhmkWpkU/so4x4oIoh9hVMigwHizYSYSIcCYhgbRDhYNFGIkyEIwERrA0iHCzaSISJcCQggrVBhINFG4kwEY4ERLA2fgBFg2ypewjy4AAAAABJRU5ErkJggg=="} alt="Favicon Preview" style={{ width: '36px', maxHeight: '40px', borderRadius: "20px" }} />
                        </Grid>
                        <Grid size={8} className=''>
                            <Typography variant="h6" gutterBottom>SendGrid</Typography>
                            <Typography>Connect with Sendgrid to more safely send high volumes of emails.</Typography>
                        </Grid>
                        <Grid size={2} className='mt-4'>
                            <Link to="hubspot" >
                                <Button variant="outlined" size="small" onClick={() => saveAuditLog(4292)}>
                                    View
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </div>
                <div className='customCard pr-0 pt-1 pl-0 mt-3'>
                    <Grid container spacing={2} direction="row"
                        justifyContent="flex-start"
                        alignItems="center">
                        <Grid size={1} className='mt-4 ml-4'>
                            <img src="https://zenprospect-production.s3.amazonaws.com/uploads/pictures/663ec5e4d78e4800015714b5/picture" alt="Favicon Preview" style={{ width: '36px', maxHeight: '40px', borderRadius: "20px" }} />
                        </Grid>
                        <Grid size={8} className=''>
                            <Typography variant="h6" gutterBottom>Criteria Corp</Typography>
                            <Typography>Connect your company's Criteria Corp account to Application Conversations to get insights and analytics from video call meeting</Typography>
                        </Grid>
                        <Grid size={2} className='mt-4'>
                            <Button variant="contained" size="large" onClick={() => saveAuditLog(4291)}>Connect</Button>
                        </Grid>
                    </Grid>
                </div>
                <div className='customCard pr-0 pt-1 pl-0 mt-3'>
                    <Grid container spacing={2} className=""
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center">
                        <Grid size={1} className='mt-4 ml-2'>
                            <img src="https://zenprospect-production.s3.amazonaws.com/uploads/pictures/663d96e9b41f7800017b73dc/picture" alt="Favicon Preview" style={{ width: '70px', maxHeight: '70px', borderRadius: "20px" }} />
                        </Grid>
                        <Grid size={8} className='ml-2'>
                            <Typography variant="h6" gutterBottom>Twilio</Typography>
                            <Typography>Connect your company's Twilio account to Application Conversations to get insights and analytics from video call meetings.</Typography>
                        </Grid>
                        <Grid size={2} className='mt-4'>
                            <Button variant="contained" size='large' onClick={() => saveAuditLog(4291)}>Connect</Button>
                        </Grid>
                    </Grid>
                </div>
            </Grid>

            {/* <Dialog open={mergeDialogOpen} id="mergeDialog" fullWidth maxWidth={'sm'} className='customInputs'>
                <DialogTitle
                    className='py-2'
                >
                    <Grid container direction="row" justifyContent="space-between" alignItems="center" >
                        <span>Merge</span>
                        <span>
                            <Grid container direction="row" justifyContent="end" alignItems="center">
                                <Button variant="outlined" type='button' color="secondary" className='mr-2' onClick={() => setMergeDialogOpen(false)}>Close</Button>
                                <Button variant="contained" type='button' color="primary" onClick={getApiToken} >Submit</Button>
                            </Grid>
                        </span>

                    </Grid>
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <Grid size={6} className='mt-1'>
                        <label className='inputLabel'>Origin Id</label>
                        <TextField fullWidth className='mt-1'
                            id="orginId"
                            name="orginId"
                            variant="outlined"
                            type="text"
                            size="small"
                            value={mergeToFormik.values.orginId}
                            onChange={mergeToFormik.handleChange}
                            error={(mergeToFormik.errors.orginId && isFormSubmitted) ? true : false}
                        />
                        <ErrorMessage formikObj={mergeToFormik} name={'orginId'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                    </Grid>
                    <Grid size={6} className='mt-1'>
                        <label className='inputLabel'>Organization Name</label>
                        <TextField fullWidth className='mt-1'
                            id="organizationName"
                            name="organizationName"
                            variant="outlined"
                            type="text"
                            size="small"
                            value={mergeToFormik.values.organizationName}
                            onChange={mergeToFormik.handleChange}
                            error={(mergeToFormik.errors.organizationName && isFormSubmitted) ? true : false}
                        />
                        <ErrorMessage formikObj={mergeToFormik} name={'organizationName'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                    </Grid>
                    <Grid size={6} className='mt-1'>
                        <label className='inputLabel'>Email ID</label>
                        <TextField fullWidth className='mt-1'
                            id="email"
                            name="email"
                            variant="outlined"
                            type="text"
                            size="small"
                            value={mergeToFormik.values.email}
                            onChange={mergeToFormik.handleChange}
                            error={(mergeToFormik.errors.email && isFormSubmitted) ? true : false}
                        />
                        <ErrorMessage formikObj={mergeToFormik} name={'email'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                    </Grid>
                    <Grid size={6} className='mt-1'>
                        <label className='inputLabel'>Category</label>
                        <TextField fullWidth className='mt-1'
                            id="category"
                            name="category"
                            variant="outlined"
                            type="text"
                            size="small"
                            value={mergeToFormik.values.category}
                            onChange={mergeToFormik.handleChange}
                            error={(mergeToFormik.errors.category && isFormSubmitted) ? true : false}
                            select
                        >
                            <MenuItem value="ats">ATS</MenuItem>
                        </TextField>
                        <ErrorMessage formikObj={mergeToFormik} name={'category'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                    </Grid>
                </DialogContent>
            </Dialog> */}
        </div>

    )
}
export default Integrations;