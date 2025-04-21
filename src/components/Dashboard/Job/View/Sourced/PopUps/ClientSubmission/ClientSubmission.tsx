import { useCallback, useState } from '../../../../../../../shared/modules/React';
import { useDropzone } from 'react-dropzone';
// import Grid from '@mui/material/Grid';
import { Button, TextField, Grid } from '../../../../../../../shared/modules/commonImports';
// import Stack from '@mui/material/Stack';
// import Divider from '@mui/material/Divider';
// import Container from '@mui/material/Container';
// import Typography from '@mui/material/Typography';
// import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { showToaster } from '../../../../../../shared/SnackBar/SnackBar';
import ApiService from '../../../../../../../shared/api/api';
import { trackPromise } from '../../../../../../../shared/modules/PromiseTrackter';

// import { FormControlLabel } from '../../../../../../../shared/modules/MaterialImports/FormInputs';
// import { Switch } from '../../../../../../../shared/modules/MaterialImports/Switch';
import { useFormik, Yup } from '../../../../../../../shared/modules/Formik';
import { DateTime } from '../../../../../../../shared/modules/Luxon';
import { Dialog, DialogContent, DialogTitle } from '../../../../../../../shared/modules/MaterialImports/Dialog';
import { Divider } from '../../../../../../../shared/modules/MaterialImports/Divider';
// import { globalData } from '../../../../../../../shared/services/globalData';
import ErrorMessage from '../../../../../../shared/Error/ErrorMessage';

import './ClientSubmission.scss';
import { Loader } from '../../../../../../shared/Loader/Loader';
import { userLocalData } from '../../../../../../../shared/services/userData';





const ClientSubmission = (
    { open, closePopup, userId, jobId, openId, refreshSourcedData }: {
        open: boolean;
        closePopup: () => void;
        userId: string;
        jobId: string;
        openId: string;
        refreshSourcedData: () => void
    }
) => {

    const onDrop = useCallback((acceptedFiles: any) => {
        // Do something with the files
        console.log(acceptedFiles);
        if (acceptedFiles?.length) {
            if (acceptedFiles[0].path.split('.').pop() === 'docx') {
                ClientSubmissionFormik.setFieldValue('resume', acceptedFiles && acceptedFiles.length ? acceptedFiles[0] : null);
            } else {
                showToaster('File should be docx format', 'error');
                ClientSubmissionFormik.setFieldValue('resume', null);
            }
        } else {
            ClientSubmissionFormik.setFieldValue('resume', null);
        }
    }, []);
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
        onDrop,
        multiple: false,
        accept: {
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
        }
    })

    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const initialValues = {
        mmdd: DateTime.now().toFormat("MMdd"),
        employee_Number: userId,
        ssn: "",
        residential_status: 21,
        ratesEnable: true,
        formerContractor: true,
        former_Employee_of_Client: true,
        pay_rate: "",
        bill_rate: "",
        resume: null
    }

    // console.log(initialValues);

    const ClientSubmissionSchema = Yup.object({
        mmdd: Yup.string(),
        employee_Number: Yup.string(),
        ssn: Yup.string(),
        residential_status: Yup.number(),
        ratesEnable: Yup.boolean(),
        formerContractor: Yup.boolean(),
        former_Employee_of_Client: Yup.boolean(),
        pay_rate: Yup.number()
            .test('test-billGreater', 'Pay Rate should be less than Bill Rate.', function () {
                const { pay_rate, bill_rate } = this.parent;
                // min && max && min > max
                if (bill_rate && pay_rate && bill_rate > pay_rate) {
                    return true;
                }
                return false;
            })
            .required('Bill Rate is required.'),
        bill_rate: Yup.number()
            // .when('pay_rate', {
            //     is: val => val && val > 0,
            //     then: Yup.number().test('test-billGreater', 'Bill Rate should be greater than Pay Rate.', function )
            // })
            .test('test-billGreater', 'Bill Rate should be greater than Pay Rate.', function () {
                const { pay_rate, bill_rate } = this.parent;
                // min && max && min > max
                if (bill_rate && pay_rate && bill_rate > pay_rate) {
                    return true;
                }
                return false;
            })
            .required('Bill Rate is required.'),
        resume: Yup.mixed().required('Resume is required.')
            .test('fileFormat', 'Only Docx files are allowed', value => {
                if (value) {
                    const supportedFormats = ['docx'];
                    return supportedFormats.includes(value.name.split('.').pop());
                }
                return true;
            })
            .test('fileSize', 'File size must be less than 5MB', value => {
                if (value) {
                    return value.size <= 5242880;
                }
                return true;
            }),
    })
    const ClientSubmissionFormik = useFormik({
        initialValues,
        validationSchema: ClientSubmissionSchema,
        onSubmit: () => {
            saveForm();
        },
        validateOnMount: true

    });

    const saveForm = () => {
        console.log(ClientSubmissionFormik.values);
        setIsFormSubmitted(true);
        // if (ClientSubmissionFormik.dirty && ClientSubmissionFormik.isValid) {
        // console.log(ClientSubmissionFormik.values);
        // console.log(acceptedFiles);
        let min = Number(ClientSubmissionFormik.values.pay_rate);
        let max = Number(ClientSubmissionFormik.values.bill_rate);
        if (min && max && min > max) {
            showToaster("PayRate should be less than BillRate", 'error');
            return
        }
        let tempReferenceNo = localStorage.getItem(`curately_${userLocalData.getvalue('clientId')}_jobId_${jobId}`);
        if (ClientSubmissionFormik.values.resume && ClientSubmissionFormik.isValid) {
            // Contacts/contacts_save.jsp
            let tempFormData = new FormData();
            tempFormData.append('mmdd', (ClientSubmissionFormik.values.mmdd) ? ClientSubmissionFormik.values.mmdd : "");
            tempFormData.append('employee_Number', (ClientSubmissionFormik.values.employee_Number) ? ClientSubmissionFormik.values.employee_Number : "");
            tempFormData.append('ssn', (ClientSubmissionFormik.values.ssn) ? ClientSubmissionFormik.values.ssn : "");
            tempFormData.append('residential_status', "" + ClientSubmissionFormik.values.residential_status);
            tempFormData.append('ratesEnable', "" + ClientSubmissionFormik.values.ratesEnable);
            tempFormData.append('formerContractor', "" + ClientSubmissionFormik.values.formerContractor);
            tempFormData.append('former_Employee_of_Client', "" + ClientSubmissionFormik.values.former_Employee_of_Client);
            tempFormData.append('pay_rate', (ClientSubmissionFormik.values.pay_rate) ? ClientSubmissionFormik.values.pay_rate : "");
            tempFormData.append('bill_rate', (ClientSubmissionFormik.values.bill_rate) ? ClientSubmissionFormik.values.bill_rate : "");
            tempFormData.append('resume', (ClientSubmissionFormik.values.resume) ? ClientSubmissionFormik.values.resume : "");
            tempFormData.append('jobId', tempReferenceNo ? tempReferenceNo : "");


            // http://35.155.202.216:8095/rw/addCandateDetails
            trackPromise(
                ApiService.postWithFileData(2168095, 'rw1/addCandateDetails', tempFormData).then(
                    (response: any) => {
                        // {
                        //     "error_list": [],
                        //     "success_list": [
                        //         {
                        //             "cand_name": "Joel Wasko",
                        //             "message": "applied successfully",
                        //             "job_id": 1224,
                        //             "job_application_id": 1180
                        //         }
                        //     ],
                        //     "Status": 200,
                        //     "Success": true
                        // }
                        if (response.data.Success) {
                            shortlistLog();
                            showToaster("Candidate has been Submitted Successfully.", 'success');
                            ClientSubmissionFormik.resetForm();
                            closePopup();
                        } else {
                            let tempMessage = (response.data.message) ? response.data.message : "An error occured while Submitting the Candidate.";
                            if (response.data.non_field_errors?.length) {
                                tempMessage = response.data.non_field_errors[0];
                            } else if (response.data.error_list?.length) {
                                tempMessage = response.data.error_list[0];
                            }
                            showToaster(tempMessage, 'error')
                        }
                    }
                )
            )
        } else {
            showToaster('Please fill all required fields.', 'error');
        }
    }


    const shortlistBarLog = [
        // {
        //     recrId: userLocalData.getvalue('recrId'),
        //     openId: openId,
        //     status: 10,
        //     clientId: userLocalData.getvalue('clientId'),
        //     stageId: 10,
        //     json: ""
        // },
        // {
        //     recrId: userLocalData.getvalue('recrId'),
        //     openId: openId,
        //     status: 1002,
        //     clientId: userLocalData.getvalue('clientId'),
        //     stageId: 100,
        //     json: ""
        // },
        {
            recrId: userLocalData.getvalue('recrId'),
            openId: openId,
            status: 1009,
            clientId: userLocalData.getvalue('clientId'),
            stageId: 100,
            json: ""
        }
    ];

    const shortlistLog = () => {
        for (let sb = 0; sb < shortlistBarLog.length; sb++) {
            const apiData = shortlistBarLog[sb];
            setTimeout(() => {
                ApiService.getByParams(193, 'Curately/Candidate/shortlistSave.jsp', apiData)
                    .then((response: any) => {
                        // console.log(response)
                        if (response.data.Message === "Success") {
                            // showToaster("Candidate status has been Updated  ", 'success');
                            refreshSourcedData();
                        } else {
                            showToaster(response.data.Message, 'error');
                        }
                    });
            }, 1000 * sb);

        }
    }


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
            fullWidth={false} open={open} id="ClientSubmissionPopup" className='customInputs'>
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
                    <span className='addHeader'>Client Submission</span>
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
                            >Submit Candidate</Button>
                        </Grid>
                    </div>
                </Grid>
            </DialogTitle>
            <Divider />
            <DialogContent className='px-5'>
                <Loader />
                <Grid container className="mb-1" spacing={0}>
                    <Grid size={6} className='mt-1'>
                        <label className='inputLabel'>SSN </label><span style={{ color: 'red' }}>*</span>
                        <TextField fullWidth className='mt-1'
                            id="ssn"
                            name="ssn"
                            variant="outlined"
                            size="small"
                            value={ClientSubmissionFormik.values.ssn}
                            onChange={ClientSubmissionFormik.handleChange}
                            error={(ClientSubmissionFormik.errors.ssn && isFormSubmitted) ? true : false}
                            type='number'
                        />
                        <ErrorMessage formikObj={ClientSubmissionFormik} name={'ssn'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                    </Grid>
                    {/*<Grid size={12} className='mt-1'>
                        <Grid container direction="row" justifyContent="start" alignItems="center" >
                            <Grid size={1} className='mt-3' justifyContent={'center'}>
                                <label className=''> &nbsp; - &nbsp; </label>
                            </Grid> 
                        </Grid>
                    </Grid>*/}
                    {/* <Grid size={12} className='mt-1'>
                        <FormControlLabel control={
                            <Switch
                                onChange={(e) => ClientSubmissionFormik.setFieldValue('ratesEnable', e.target.checked)}
                                checked={ClientSubmissionFormik.values.ratesEnable}
                            />}
                            label={"Rates Enable"}
                        />
                    </Grid>
                    <Grid size={12} className='mt-1'>
                        <FormControlLabel control={
                            <Switch
                                onChange={(e) => ClientSubmissionFormik.setFieldValue('formerContractor', e.target.checked)}
                                checked={ClientSubmissionFormik.values.formerContractor}
                            />}
                            label={"Former Contractor"}
                        />
                    </Grid>
                    <Grid size={12} className='mt-1'>
                        <FormControlLabel control={
                            <Switch
                                onChange={(e) => ClientSubmissionFormik.setFieldValue('former_Employee_of_Client', e.target.checked)}
                                checked={ClientSubmissionFormik.values.former_Employee_of_Client}
                            />}
                            label={"Former Employee of Client"}
                        />
                    </Grid> */}
                    <Grid size={12} className='mt-1'>
                        <Grid container direction="row" justifyContent="start" alignItems="center" spacing={2}>
                            <Grid size={6} className='mt-1'>
                                <label className='inputLabel'>Pay Rate </label><span style={{ color: 'red' }}>*</span>
                                <TextField
                                    size="small"
                                    fullWidth
                                    id="pay_rate"
                                    name='pay_rate'
                                    value={ClientSubmissionFormik.values.pay_rate}
                                    onChange={ClientSubmissionFormik.handleChange}
                                    onBlur={() => {
                                        const min = Number(ClientSubmissionFormik.values.pay_rate);
                                        const max = Number(ClientSubmissionFormik.values.bill_rate);
                                        if (min && max && min > max) {
                                            ClientSubmissionFormik.setFieldError('pay_rate', "PayRate should be less than BillRate");
                                        }
                                    }}
                                    type="number"


                                />
                                <ErrorMessage formikObj={ClientSubmissionFormik} name={'pay_rate'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                            </Grid>
                            <Grid size={6} className='mt-1'>
                                <label className='inputLabel'>Bill Rate </label><span style={{ color: 'red' }}>*</span>
                                <TextField
                                    size="small"
                                    fullWidth
                                    id="bill_rate"
                                    name='bill_rate'
                                    value={ClientSubmissionFormik.values.bill_rate}
                                    onChange={ClientSubmissionFormik.handleChange}
                                    onBlur={() => {
                                        // const min = Number(ClientSubmissionFormik.values.pay_rate);
                                        // const max = Number(ClientSubmissionFormik.values.bill_rate);
                                        // if (max && min && max < min) {
                                        //     ClientSubmissionFormik.setFieldError('bill_rate', "BillRate should be greater than PayRate");
                                        // }
                                    }}
                                    type="number"
                                />
                                <ErrorMessage formikObj={ClientSubmissionFormik} name={'bill_rate'} isFormSubmitted={isFormSubmitted}></ErrorMessage>

                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid size={12} className='mt-1'>

                        <div className='customDropZone'>
                            <div {...getRootProps({
                                className: `dropzone ${acceptedFiles.length > 0 ? 'fileDroped' : ''}`
                            })}>
                                <input {...getInputProps()} multiple={false} accept='.docx' />
                                {
                                    isDragActive ?
                                        <p>Drop the resume here ... *</p> :
                                        (files && files.length) ?
                                            <p>{files}</p>
                                            :
                                            <>
                                                <p>Drag 'n' drop resume here, or click to select <span style={{ color: 'red' }}>*</span></p>
                                                <em>(Only *.docx file will be accepted)</em>
                                            </>
                                }
                            </div>
                        </div>
                    </Grid>
                </Grid>

            </DialogContent>
        </Dialog>
    );
}

export default ClientSubmission;
