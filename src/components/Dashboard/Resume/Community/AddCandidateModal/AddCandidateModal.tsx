// import React, {useCallback, useState, useEffect } from 'react';
import { useCallback, useState, useEffect } from '../../../../../shared/modules/React';
import { Box } from "../../../../../shared/modules/MaterialImports/Box";
import { Grid, Button, InputAdornment } from "../../../../../shared/modules/commonImports";
import { TextField, FormControlLabel } from '../../../../../shared/modules/MaterialImports/FormInputs';
import { Checkbox, Radio } from "../../../../../shared/modules/MaterialImports/FormElements";
// import Card from '@mui/material/Card';
import { CardContent } from '../../../../../shared/modules/MaterialImports/Card';
import { ToggleButton, ToggleButtonGroup } from '../../../../../shared/modules/MaterialImports/ToggleButton';
import { MenuItem } from '../../../../../shared/modules/MaterialImports/Menu';
import { useFormik, Yup } from '../../../../../shared/modules/Formik';
import { Dialog, DialogTitle, DialogContent } from "../../../../../shared/modules/MaterialImports/Dialog";
// import CloseIcon from '@mui/icons-material/Close';
import { Divider } from '../../../../../shared/modules/MaterialImports/Divider';
import './AddCandidateModal.scss';
//import { PreferencesData } from '../../../../../shared/data/Community/Preferences';
import { ApplicationPreference_10009, CurrentEmpStatus_10010, EmpAvailabilityStatus_10011, EmpJobPref_10012, EmpLocPref_10013, Preferredworkinghours_10019 } from '../../../../../shared/data/Community/Preference';
import { trackPromise } from "../../../../../shared/modules/PromiseTrackter";
import ApiService from '../../../../../shared/api/api';
import ErrorMessage from '../../../../shared/Error/ErrorMessage';
import { showToaster } from '../../../../shared/SnackBar/SnackBar';
// import { globalData } from '../../../../../shared/services/globalData';
// import DialogActions from "@mui/material/DialogActions";
// import { InputMask } from 'primereact/inputmask';
import { userLocalData } from '../../../../../shared/services/userData';
import { debounce } from "lodash";
import { Typography } from '../../../../../shared/modules/MaterialImports/Typography';
import PhoneInput from '../../../Candidate/ViewCandidate/PhoneInput';
const Visa = ['Yes', 'No']
const Authorized = ['Yes', 'No']

const AddCandidateModal = (
    { open, closePopup, candidateData }: {
        open: boolean;
        closePopup: (type?: "ADD") => void;
        candidateData: any;
    }) => {



    let clientId = userLocalData.getvalue('clientId');
    const [sourceData, setSourceData] = useState<any[] | never[]>([]);

    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const initialAddCandidateDetails = candidateData.userId ? {
        "userId": candidateData?.userId ? candidateData.userId : "",
        "firstName": candidateData?.firstName ? candidateData.firstName : "",
        "lastName": candidateData?.lastName ? candidateData.lastName : "",
        "email": candidateData?.email ? candidateData.email : "",
        "phoneNo": candidateData?.phoneNo ? candidateData.phoneNo : "",
        "source": "",
        "title": candidateData?.jobTitle ? candidateData.jobTitle : "",
        "skills": "",
        "address": candidateData?.address ? candidateData.address : "",
        "apt": candidateData?.apt ? candidateData.apt : "",
        "cityName": candidateData?.cityName ? candidateData.cityName : "",
        "stateName": candidateData?.stateName ? candidateData.stateName : "",
        "countryName": candidateData?.countryName ? candidateData.countryName : "",
        "zipcode": candidateData?.zipcode ? candidateData.zipcode : "",
        "empAvailLookupID": 0,
        "applicationRefID": 0,
        "empPrefLookupID": [],
        "empFlexLookupID": [],
        "empStatusLookupID": [],
        "prefferdWorkingHours": [],
        "legalStatus": "",
        "visaSponsorStatus": "",
        "empHourCompensation": 0,
        "empYearCompensation": 0,
        "empCompThreshhold": false,
        "clientId": userLocalData.getvalue('clientId'),
    } : {
        "userId": "",
        "firstName": "",
        "lastName": "",
        "email": "",
        "phoneNo": "",
        "source": "",
        "title": "",
        "skills": "",
        "address": "",
        "apt": "",
        "cityName": "",
        "stateName": "",
        "countryName": "",
        "zipcode": "",
        "empAvailLookupID": 0,
        "applicationRefID": 0,
        "empPrefLookupID": [],
        "empFlexLookupID": [],
        "empStatusLookupID": [],
        "prefferdWorkingHours": [],
        "legalStatus": "",
        "visaSponsorStatus": "",
        "empHourCompensation": 0,
        "empYearCompensation": 0,
        "empCompThreshhold": false,
        "clientId": userLocalData.getvalue('clientId'),
    }
    const addCandidateSchema = Yup.object().shape({
        "userId": Yup.string(),
        "firstName": Yup.string().required('First Name is required.').trim(),
        "lastName": Yup.string().required('Last Name is required.').trim(),
        "email": Yup.string().required('Email is required.').email('Invalid email Format').trim(),
        "phoneNo": Yup.string().required('Phone Number is required.')
            .min(10, {
                message: "Please enter a valid phone number",
                excludeEmptyString: false,
            }),
        // .matches(/^((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}$/, {
        //     message: "Please enter a valid phone number",
        //     excludeEmptyString: false,
        // }),
        "source": Yup.string(),
        "title": Yup.string(),
        "skills": Yup.string(),
        "address": Yup.string(),
        "apt": Yup.string(),
        "cityName": Yup.string(),
        "stateName": Yup.string(),
        "countryName": Yup.string(),
        "zipcode": Yup.string(),
        "empAvailLookupID": Yup.number(),
        "applicationRefID": Yup.number().required("Applicant preference is required"),
        "empPrefLookupID": Yup.array(),
        "empFlexLookupID": Yup.array(),
        "empStatusLookupID": Yup.array(),
        "prefferdWorkingHours": Yup.array(),
        "legalStatus": Yup.string(),
        "visaSponsorStatus": Yup.string(),
        "empHourCompensation": Yup.number(),
        "empYearCompensation": Yup.number(),
        "empCompThreshhold": Yup.boolean(),
        "clientId": Yup.string(),
    });
    const addCandidateModalFormik = useFormik({
        initialValues: initialAddCandidateDetails,
        validationSchema: addCandidateSchema,
        onSubmit: () => {
            // addCandidate();
            setIsFormSubmitted(true);
        },
    });
    useEffect(() => {
        if (!addCandidateModalFormik.values.applicationRefID) {
            // Ensure the applicationRefID has an initial value that is not one of the "hidden" values
            addCandidateModalFormik.setFieldValue("applicationRefID", "");  // Default to an empty string or non-matching ID
        }
    }, [addCandidateModalFormik.values.applicationRefID]);
    const shouldHideFields = !addCandidateModalFormik.values.applicationRefID || addCandidateModalFormik.values.applicationRefID === "10009003" || addCandidateModalFormik.values.applicationRefID === "10009002";



    useEffect(() => {
        loadSourceList();
    }, []);

    const addCandidate = () => {
        setIsFormSubmitted(true);
        //console.log("Submitted");
        // console.log(addCandidateModalFormik.values);

        if (["", null, undefined].includes(addCandidateModalFormik?.values?.firstName?.trim())) {
            showToaster('Please enter first name.', 'error');
            return;
        }

        if (["", null, undefined].includes(addCandidateModalFormik?.values?.lastName?.trim())) {
            showToaster('Please enter last name.', 'error');
            return;
        }

        if (["", null, undefined].includes(addCandidateModalFormik?.values?.email?.trim())) {
            showToaster('Please enter valid email.', 'error');
            return;
        }

        if (["", null, undefined].includes(addCandidateModalFormik?.values?.phoneNo?.trim())) {
            showToaster('Please enter valid phone number.', 'error');
            return;
        }


        if (!addCandidateModalFormik.values.applicationRefID) {
            showToaster('Please select any applicant preference.', 'error');
            return;
        }


        let candidateData = {
            userId: addCandidateModalFormik.values.userId || 0,
            // userBasicID: 0,
            // userProfileID: 0,
            // profileID: 0,
            jobTitle: addCandidateModalFormik.values.title?.trim(),
            firstName: addCandidateModalFormik.values.firstName.trim(),
            lastName: addCandidateModalFormik.values.lastName.trim(),
            phoneNo: addCandidateModalFormik.values.phoneNo,
            email: addCandidateModalFormik.values.email.trim(),
            countryName: addCandidateModalFormik.values.countryName?.trim() || "",
            stateName: addCandidateModalFormik.values.stateName?.trim() || "",
            cityName: addCandidateModalFormik.values.cityName?.trim() || "",
            zipcode: addCandidateModalFormik.values.zipcode?.toString()?.trim() || "",
            // genderLookupID: 0,
            // accuickId: 0,
            // userAdditionID: 0,
            // empStatusLookupID: "",
            empAvailLookupID: Number(addCandidateModalFormik.values.applicationRefID) === 10009001
                ? Number(addCandidateModalFormik.values.empAvailLookupID) || 0
                : "",
            applicationRefID: Number(addCandidateModalFormik.values.applicationRefID) || 0,
            empPrefLookupID: Number(addCandidateModalFormik.values.applicationRefID) === 10009001
                ? addCandidateModalFormik.values.empPrefLookupID.toString() || ""
                : "",
            empFlexLookupID: Number(addCandidateModalFormik.values.applicationRefID) === 10009001
                ? addCandidateModalFormik.values.empFlexLookupID.toString() || ""
                : "",
            empStatusLookupID: Number(addCandidateModalFormik.values.applicationRefID) === 10009001
                ? addCandidateModalFormik.values.empStatusLookupID.toString() || ""
                : "",
            prefferdWorkingHours: Number(addCandidateModalFormik.values.applicationRefID) === 10009001
                ? addCandidateModalFormik.values.prefferdWorkingHours.toString() || ""
                : "",
            empYearCompensation: Number(addCandidateModalFormik.values.applicationRefID) === 10009001
                ? Number(addCandidateModalFormik.values.empYearCompensation) || undefined : "",
            empHourCompensation: Number(addCandidateModalFormik.values.applicationRefID) === 10009001
                ? Number(addCandidateModalFormik.values.empHourCompensation) || undefined : "",
            empCompThreshhold: (addCandidateModalFormik.values.empCompThreshhold ? true : false) || false,
            legalStatus: Number(addCandidateModalFormik.values.applicationRefID) === 10009001
                // empTravelMilesLookupID: 0,
                // empTravelPerTimeLookupID: 0,
                // empRelocPrefLookupID: 0,
                // empPrefRoleTitle: "",
                // empPrefLocation: "",
                // empRoleMilesLookupID: 0,
                ? (addCandidateModalFormik.values.legalStatus === "Yes" ? 1 : 0) : "",
            visaSponsorStatus: Number(addCandidateModalFormik.values.applicationRefID) === 10009001
                ? (addCandidateModalFormik.values.visaSponsorStatus === "Yes" ? 1 : 0) : "",
            // modifledDateTime: 2022-01-26 14:30:00,
            // prefferdWorkingHours: "",
            address: addCandidateModalFormik.values.address || "",
            apt: addCandidateModalFormik.values.apt || "",
            source: addCandidateModalFormik.values.source || "",
            title: addCandidateModalFormik.values.title || "",
            skills: addCandidateModalFormik.values.skills || "",
            clientId: userLocalData.getvalue("clientId"),
            recrId: userLocalData.getvalue("recrId")
        };

        // console.log("candidateData");
        // console.log(candidateData);

        // Validate the form before submitting
        if (addCandidateModalFormik.values.firstName.trim() && addCandidateModalFormik.values.lastName.trim() && addCandidateModalFormik.values.email.trim() && addCandidateModalFormik.values.phoneNo && addCandidateModalFormik.isValid) {
            trackPromise(
                ApiService.postWithData('admin', 'saveorupdateCandidateDetails', candidateData)
                    .then((response: any) => {
                        // console.log(response.data);
                        if (response.data.Success) {
                            showToaster(response.data.Message, 'success');
                            addCandidateModalFormik.resetForm();
                            closePopup("ADD");
                        } else {
                            showToaster((response.data.Message) ? response.data.Message : "An error occurred while saving the Candidate.", 'error');
                        }
                    })
            );
        } else {
            showToaster('Please fill all fields.', 'error');
        }
    };



    const loadSourceList = useCallback(debounce(() => {
        trackPromise(

            //ApiService.getCall(216, `QADemoCurately/getSourceList/${clientId}`)
            ApiService.getCall('admin', `getSourceList/${clientId}`)
                .then((response: any) => {
                    setSourceData(response.data.list);
                }
                )
        )
    }, 400), [])

    const handleEmpStatusChange = (svalue: any) => {
        const currentIndex = addCandidateModalFormik.values.empStatusLookupID.indexOf(svalue);
        const newSelection = [...addCandidateModalFormik.values.empStatusLookupID];

        if (currentIndex === -1) {
            newSelection.push(svalue);
        } else {
            newSelection.splice(currentIndex, 1);
        }

        addCandidateModalFormik.setFieldValue('empStatusLookupID', newSelection, true);
    };

    const handleEmpFlexibilityChange = (value: any) => {
        const currentIndex = addCandidateModalFormik.values.empFlexLookupID.indexOf(value);
        const newSelection = [...addCandidateModalFormik.values.empFlexLookupID];

        if (currentIndex === -1) {
            newSelection.push(value);
        } else {
            newSelection.splice(currentIndex, 1);
        }

        addCandidateModalFormik.setFieldValue('empFlexLookupID', newSelection, true);
    };


    const handleEmpPreferenceChange = (value: any) => {
        const currentIndex = addCandidateModalFormik.values.empPrefLookupID.indexOf(value);
        const newSelection = [...addCandidateModalFormik.values.empPrefLookupID];

        if (currentIndex === -1) {
            newSelection.push(value);
        } else {
            newSelection.splice(currentIndex, 1);
        }

        addCandidateModalFormik.setFieldValue('empPrefLookupID', newSelection, true);
    };


    const handleWorkingHoursChange = (value: any) => {
        const currentIndex = addCandidateModalFormik.values.prefferdWorkingHours.indexOf(value);
        const newSelection = [...addCandidateModalFormik.values.prefferdWorkingHours];

        if (currentIndex === -1) {
            newSelection.push(value);
        } else {
            newSelection.splice(currentIndex, 1);
        }

        addCandidateModalFormik.setFieldValue('prefferdWorkingHours', newSelection, true);
    };



    return (
        <div>
            <form onSubmit={addCandidateModalFormik.handleSubmit}>
                <Dialog
                    maxWidth={'md'}
                    open={open} fullWidth={true}>
                    <DialogTitle className='py-2'>
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <span className='addHeader'>
                                {candidateData.userId ? 'Update' : 'Add'}  a Candidate
                            </span>
                            <div>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="end"
                                    alignItems="center"
                                >
                                    {/* <CloseIcon /> onClick={() => closePopup()}  */}
                                    <Button variant="outlined"
                                        type='button'
                                        color="secondary"
                                        className='mr-2'
                                        onClick={() => closePopup()}
                                    >Cancel</Button>
                                    <Button variant="contained"
                                        type='button'
                                        color="primary"
                                        onClick={addCandidate}
                                    > {candidateData.userId ? 'Update' : 'Add'}</Button>
                                </Grid>
                            </div>
                        </Grid>
                    </DialogTitle>
                    <Divider />
                    <DialogContent className='p-0'>
                        <div id="addCandidateModal" >
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="start"
                            >
                                {/* <Card className='customCard' sx={{ width: '750px !important' }}> */}
                                <CardContent sx={{ backgroundColor: "#f3f5f7" }}>


                                    <Box pr={2} pl={2} bgcolor={"#f3f5f7"}  >

                                        <Box className="apply-card-wrapper" mt={2}>
                                            <Typography className='addHeader' mb={2}>Basic Information</Typography>

                                            <Grid container spacing={2} className='mb-2'>
                                                <Grid size={6} className='mb-1'>
                                                    <label className='inputLabel'>First Name<span style={{ color: 'red' }}>*</span></label>
                                                    <TextField fullWidth className='mt-1'
                                                        variant="outlined"
                                                        type="text"
                                                        size="small"
                                                        id="firstName"
                                                        name="firstName"
                                                        value={addCandidateModalFormik.values.firstName}
                                                        onChange={addCandidateModalFormik.handleChange}
                                                    />
                                                    <ErrorMessage formikObj={addCandidateModalFormik} name={'firstName'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                                </Grid>
                                                <Grid size={6}>
                                                    <label className='inputLabel'>Last Name<span style={{ color: 'red' }}>*</span></label>
                                                    <TextField fullWidth className='mt-1'
                                                        variant="outlined"
                                                        type="text"
                                                        size="small"
                                                        id="lastName"
                                                        name="lastName"
                                                        value={addCandidateModalFormik.values.lastName}
                                                        onChange={addCandidateModalFormik.handleChange}
                                                    />
                                                    <ErrorMessage formikObj={addCandidateModalFormik} name={'lastName'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2} className='mb-2'>
                                                <Grid size={6} className='mb-1'>
                                                    <label className='inputLabel'>Email<span style={{ color: 'red' }}>*</span></label>
                                                    <TextField fullWidth className='mt-1'
                                                        variant="outlined"
                                                        type="text"
                                                        size="small"
                                                        id="email"
                                                        name="email"
                                                        value={addCandidateModalFormik.values.email}
                                                        onChange={addCandidateModalFormik.handleChange}
                                                    />
                                                    <ErrorMessage formikObj={addCandidateModalFormik} name={'email'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                                </Grid>
                                                <Grid size={6}>
                                                    <label className='inputLabel'>Phone<span style={{ color: 'red' }}>*</span></label>
                                                    <PhoneInput
                                                        id="phoneNo"
                                                        name="phoneNo"
                                                        placeholder="(999) 999-9999"
                                                        value={addCandidateModalFormik.values.phoneNo}
                                                        onChange={(e: any) => {
                                                            addCandidateModalFormik.setFieldValue('phoneNo', e.target.value);
                                                        }}
                                                        className='phoneinput_candidate d-block mt-1 w-100 fs-13'
                                                        autoClear={false}
                                                    />
                                                    {/* <InputMask
                                                    id="phoneNo"
                                                    name="phoneNo"
                                                    mask="(999) 999-9999"
                                                    placeholder="(999) 999-9999"
                                                    // /^((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}$/
                                                    value={addCandidateModalFormik.values.phoneNo}
                                                    onChange={(e) => {
                                                        addCandidateModalFormik.setFieldValue('phoneNo', e.target.value);
                                                    }}
                                                    className='d-block p-3 mt-1 w-100 fs-13'
                                                    autoClear={false}
                                                /> */}
                                                    <ErrorMessage formikObj={addCandidateModalFormik} name={'phoneNo'} isFormSubmitted={isFormSubmitted}></ErrorMessage>

                                                    {/* <TextField fullWidth className='mt-1'
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    id="phoneNo"
                                                    name="phoneNo"
                                                    value={addCandidateModalFormik.values.phoneNo}
                                                    onChange={addCandidateModalFormik.handleChange}
                                                />
                                                <ErrorMessage formikObj={addCandidateModalFormik} name={'phoneNo'} isFormSubmitted={isFormSubmitted}></ErrorMessage> */}
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2} className='mb-2'>
                                                <Grid size={6} className='mb-1'>
                                                    <label className='inputLabel'>Source</label>
                                                    <TextField fullWidth className='mt-1'
                                                        variant="outlined"
                                                        type="text"
                                                        size="small"
                                                        id="source"
                                                        name="source"
                                                        select
                                                        value={addCandidateModalFormik.values.source}
                                                        onChange={addCandidateModalFormik.handleChange}
                                                    >
                                                        {sourceData && sourceData.map((item: any, index: any) => {

                                                            return (<MenuItem key={index} value={`${item.sourceName}`}>{item.sourceName}</MenuItem>)

                                                        })

                                                        }
                                                        {/* <MenuItem value="" >Select</MenuItem>
                                                    <MenuItem value="Linked In">Linked In</MenuItem>
                                                    <MenuItem value="Facebook">Facebook</MenuItem>
                                                    <MenuItem value="Gmail">Gmail</MenuItem>
                                                    <MenuItem value="Indeed">Indeed</MenuItem>
                                                    <MenuItem value="Manual">Manual</MenuItem>
                                                    <MenuItem value="-999">Other</MenuItem> */}
                                                    </TextField>
                                                </Grid>
                                                <Grid size={6}>
                                                    <label className='inputLabel'>Title</label>
                                                    <TextField fullWidth className='mt-1'
                                                        variant="outlined"
                                                        type="text"
                                                        size="small"
                                                        id="title"
                                                        name="title"
                                                        value={addCandidateModalFormik.values.title}
                                                        onChange={addCandidateModalFormik.handleChange}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2} className='mb-2'>
                                                <Grid size={12} className='mb-1'>
                                                    <label className='inputLabel'>Skills</label>
                                                    <TextField fullWidth className='mt-1'
                                                        variant="outlined"
                                                        type="text"
                                                        size="small"
                                                        id="skills"
                                                        name="skills"
                                                        value={addCandidateModalFormik.values.skills}
                                                        onChange={addCandidateModalFormik.handleChange}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Box>
                                    <Box pr={2} pl={2} bgcolor={"#f3f5f7"}  >

                                        <Box className="apply-card-wrapper" mt={2}>
                                            <Typography className='addHeader' mb={2}>Location</Typography>
                                            <Grid container spacing={2} className='mb-2'>
                                                <Grid size={6} className='mb-1'>
                                                    <label className='inputLabel'>Address Line 1</label>
                                                    <TextField fullWidth className='mt-1'
                                                        variant="outlined"
                                                        type="text"
                                                        size="small"
                                                        id="address"
                                                        name="address"
                                                        value={addCandidateModalFormik.values.address}
                                                        onChange={addCandidateModalFormik.handleChange}
                                                    />
                                                </Grid>
                                                <Grid size={6}>
                                                    <label className='inputLabel'>APT/STE </label><span>#</span>
                                                    <TextField fullWidth className='mt-1'
                                                        variant="outlined"
                                                        type="text"
                                                        size="small"
                                                        id="apt"
                                                        name="apt"
                                                        value={addCandidateModalFormik.values.apt}
                                                        onChange={addCandidateModalFormik.handleChange}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2} className='mb-2'>
                                                <Grid size={3} className='mb-1'>
                                                    <label className='inputLabel'>City</label>
                                                    <TextField fullWidth className='mt-1'
                                                        variant="outlined"
                                                        type="text"
                                                        size="small"
                                                        id="cityName"
                                                        name="cityName"
                                                        value={addCandidateModalFormik.values.cityName}
                                                        onChange={addCandidateModalFormik.handleChange}
                                                    />
                                                </Grid>
                                                <Grid size={3} className='mb-1'>
                                                    <label className='inputLabel'>State</label>
                                                    <TextField fullWidth className='mt-1'
                                                        variant="outlined"
                                                        type="text"
                                                        size="small"
                                                        id="stateName"
                                                        name="stateName"
                                                        value={addCandidateModalFormik.values.stateName}
                                                        onChange={addCandidateModalFormik.handleChange}
                                                    />
                                                </Grid>
                                                <Grid size={3} className='mb-1'>
                                                    <label className='inputLabel'>Country</label>
                                                    <TextField fullWidth className='mt-1'
                                                        variant="outlined"
                                                        type="text"
                                                        size="small"
                                                        id="countryName"
                                                        name="countryName"
                                                        value={addCandidateModalFormik.values.countryName}
                                                        onChange={addCandidateModalFormik.handleChange}
                                                    />
                                                </Grid>
                                                <Grid size={3} className='mb-1'>
                                                    <label className='inputLabel'>Zipcode</label>
                                                    <TextField fullWidth className='mt-1'
                                                        variant="outlined"
                                                        type="text"
                                                        size="small"
                                                        id="zipcode"
                                                        name="zipcode"
                                                        value={addCandidateModalFormik.values.zipcode}
                                                        onChange={addCandidateModalFormik.handleChange}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Box>
                                    <Box pr={2} pl={2} bgcolor={"#f3f5f7"}  >

                                        <Box className="apply-card-wrapper" mt={2}>

                                            <Grid container spacing={2} direction="row"
                                                justifyContent="center"
                                                alignItems="flex-start">

                                                <Grid size={12}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Typography className='addHeader'>Select any applicant preference </Typography><span style={{ color: 'red', height: '10px' }}> *</span></div>
                                                </Grid>
                                                <Grid size={12}>
                                                    <Box sx={{ marginBottom: 2 }}>
                                                        {/* <Grid
                                                        container
                                                        direction="row"
                                                        justifyContent="start"
                                                        alignItems="start"
                                                        spacing={2}
                                                    > */}

                                                        {/* <Grid size={12}> */}

                                                        <ToggleButtonGroup value={addCandidateModalFormik.values.empStatusLookupID}
                                                        // onChange={(event, newFormats: any) => {
                                                        //     addCandidateModalFormik.setFieldValue('empStatusLookupID', newFormats, true);
                                                        // }}
                                                        // className='toggle_button_group'
                                                        >
                                                            {
                                                                ApplicationPreference_10009 && ApplicationPreference_10009.map((o: any, i) => (
                                                                    <ToggleButton value={ApplicationPreference_10009} style={{ textTransform: 'capitalize' }} className={`toggle_button_group ${(o.id === addCandidateModalFormik.values.applicationRefID) ? "selectedCheckBox" : ""}`}
                                                                        onClick={() => {
                                                                            addCandidateModalFormik.setFieldValue('applicationRefID', o.id, true);
                                                                        }}

                                                                    >
                                                                        <FormControlLabel
                                                                            control={<Radio checked={o.id === addCandidateModalFormik.values.applicationRefID}
                                                                            />}
                                                                            labelPlacement="end"
                                                                            label={
                                                                                <label key={i} className={`fw-6 ${(o.id === addCandidateModalFormik.values.applicationRefID) ? "fw-6" : ""}`}>
                                                                                    {o.label} </label>
                                                                            }
                                                                        />
                                                                    </ToggleButton>
                                                                ))
                                                            }
                                                        </ToggleButtonGroup>
                                                        <ErrorMessage formikObj={addCandidateModalFormik} name={'applicationRefID'} isFormSubmitted={isFormSubmitted} ></ErrorMessage>

                                                        {/* addCandidateModalFormik.values.applicationRefID */}

                                                        {/* </Grid> */}
                                                        {/* </Grid> */}
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                            {!shouldHideFields && (
                                                <>

                                                    <Box className="apply-card-wrapper">
                                                        <Typography className='addHeader' mb={2}>Work Preferences</Typography>
                                                        <Grid container spacing={2} direction="row"
                                                            justifyContent="center"
                                                            alignItems="flex-start">

                                                            <Grid size={12}>
                                                                <span>Current Employment Status</span>
                                                            </Grid>
                                                            <Grid size={12}>
                                                                <Box sx={{ marginBottom: 2 }}>
                                                                    <Grid
                                                                        container
                                                                        direction="row"
                                                                        justifyContent="start"
                                                                        alignItems="start"
                                                                        spacing={2}
                                                                    >

                                                                        <Grid size={12}>

                                                                            <ToggleButtonGroup value={addCandidateModalFormik.values.empStatusLookupID}
                                                                            // onChange={(event, newFormats: any) => {
                                                                            //     addCandidateModalFormik.setFieldValue('empStatusLookupID', newFormats, true);
                                                                            // }}
                                                                            >
                                                                                {
                                                                                    CurrentEmpStatus_10010 && CurrentEmpStatus_10010.map((o: any, i) => (
                                                                                        <ToggleButton key={o.id} value={o.id} style={{ textTransform: 'capitalize' }} className={`cursor-pointer ${(addCandidateModalFormik.values.empStatusLookupID.includes(o.id)) ? "selectedCheckBox" : ""}`}
                                                                                            onClick={() => handleEmpStatusChange(o.id)}
                                                                                        >
                                                                                            <FormControlLabel
                                                                                                control={<Checkbox checked={addCandidateModalFormik.values.empStatusLookupID.includes(o.id)} onClick={() => handleEmpStatusChange(o.id)} />}
                                                                                                labelPlacement="end"
                                                                                                label={
                                                                                                    <label key={i} className={`cursor-pointer fw-6 ${(addCandidateModalFormik.values.empStatusLookupID.includes(o.id)) ? "c-white fw-6" : ""}`}>
                                                                                                        {o.label} </label>
                                                                                                }
                                                                                            />
                                                                                        </ToggleButton>
                                                                                    ))
                                                                                }
                                                                            </ToggleButtonGroup>

                                                                        </Grid>
                                                                    </Grid>
                                                                </Box>
                                                            </Grid>
                                                        </Grid>

                                                        <Grid container spacing={2} direction="row"
                                                            justifyContent="center"
                                                            alignItems="flex-start">

                                                            <Grid size={12}>
                                                                <span>Availability Status</span>
                                                            </Grid>
                                                            <Grid size={12}>
                                                                <Box sx={{ marginBottom: 2 }}>
                                                                    <Grid
                                                                        container
                                                                        direction="row"
                                                                        justifyContent="start"
                                                                        alignItems="start"
                                                                        spacing={2}
                                                                    >

                                                                        <Grid size={12}>
                                                                            <ToggleButtonGroup >
                                                                                {
                                                                                    EmpAvailabilityStatus_10011 && EmpAvailabilityStatus_10011.map((o, i) => (
                                                                                        <ToggleButton value={EmpAvailabilityStatus_10011} style={{ textTransform: 'capitalize' }} className={`cursor-pointer ${(o.id === addCandidateModalFormik.values.empAvailLookupID) ? "selectedCheckBox" : ""}`}
                                                                                            onClick={() => {
                                                                                                addCandidateModalFormik.setFieldValue('empAvailLookupID', o.id, true);
                                                                                            }}

                                                                                        >
                                                                                            <FormControlLabel
                                                                                                control={<Checkbox checked={o.id === addCandidateModalFormik.values.empAvailLookupID}
                                                                                                />}
                                                                                                labelPlacement="end"
                                                                                                label={
                                                                                                    <label key={i} className={`cursor-pointer fw-6 ${(o.id === addCandidateModalFormik.values.empAvailLookupID) ? "c-white fw-6" : ""}`}>
                                                                                                        {o.label} </label>
                                                                                                }
                                                                                            />
                                                                                        </ToggleButton>
                                                                                    ))
                                                                                }
                                                                            </ToggleButtonGroup>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Box>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container spacing={2} direction="row"
                                                            justifyContent="center"
                                                            alignItems="flex-start">
                                                            <Grid size={12}>
                                                                <span>Employment Preference</span>
                                                            </Grid>
                                                            <Grid size={12}>
                                                                <Box sx={{ marginBottom: 2 }}>
                                                                    <Grid
                                                                        container
                                                                        direction="row"
                                                                        justifyContent="start"
                                                                        alignItems="start"
                                                                        spacing={2}
                                                                    >
                                                                        <Grid size={12}>

                                                                            <ToggleButtonGroup value={addCandidateModalFormik.values.empPrefLookupID}
                                                                            // onChange={(event, newFormats: any) => {
                                                                            //     addCandidateModalFormik.setFieldValue('empPrefLookupID', newFormats, true);
                                                                            // }}
                                                                            >
                                                                                {
                                                                                    EmpJobPref_10012 && EmpJobPref_10012.map((o, i) => (
                                                                                        <ToggleButton key={o.id} value={o.id} style={{ textTransform: 'capitalize' }} className={`cursor-pointer ${(addCandidateModalFormik.values.empPrefLookupID.includes(o.id)) ? "selectedCheckBox" : ""}`}
                                                                                            onClick={() => handleEmpPreferenceChange(o.id)}
                                                                                        >
                                                                                            <FormControlLabel
                                                                                                control={<Checkbox checked={addCandidateModalFormik.values.empPrefLookupID.includes(o.id)} onClick={() => handleEmpPreferenceChange(o.id)} />}
                                                                                                labelPlacement="end"
                                                                                                label={
                                                                                                    <label key={i} className={`cursor-pointer fw-6 ${(addCandidateModalFormik.values.empPrefLookupID.includes(o.id)) ? "c-white fw-6" : ""}`}>
                                                                                                        {o.label} </label>
                                                                                                }
                                                                                            />
                                                                                        </ToggleButton>
                                                                                    ))
                                                                                }
                                                                            </ToggleButtonGroup>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Box>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container spacing={2} direction="row"
                                                            justifyContent="center"
                                                            alignItems="flex-start">
                                                            <Grid size={12}>
                                                                <span>Flexibility Preference</span>
                                                            </Grid>
                                                            <Grid size={12}>
                                                                <Box sx={{ marginBottom: 2 }}>
                                                                    <Grid
                                                                        container
                                                                        direction="row"
                                                                        justifyContent="start"
                                                                        alignItems="start"
                                                                        spacing={2}
                                                                    >

                                                                        <Grid size={12}>
                                                                            <ToggleButtonGroup value={addCandidateModalFormik.values.empFlexLookupID}
                                                                            // onChange={(event, newFormats: any) => {
                                                                            //     addCandidateModalFormik.setFieldValue('empFlexLookupID', newFormats, true);
                                                                            // }}
                                                                            >
                                                                                {
                                                                                    EmpLocPref_10013 && EmpLocPref_10013.map((o, i) => (
                                                                                        <ToggleButton key={o.id} value={o.id} style={{ textTransform: 'capitalize' }} className={`cursor-pointer ${(addCandidateModalFormik.values.empFlexLookupID.includes(o.id)) ? "selectedCheckBox" : ""}`}
                                                                                            onClick={() => handleEmpFlexibilityChange(o.id)}
                                                                                        >
                                                                                            <FormControlLabel
                                                                                                control={<Checkbox checked={addCandidateModalFormik.values.empFlexLookupID.includes(o.id)} onClick={() => handleEmpFlexibilityChange(o.id)} />}
                                                                                                labelPlacement="end"
                                                                                                label={
                                                                                                    <label key={i} className={`cursor-pointer fw-6 ${(addCandidateModalFormik.values.empFlexLookupID.includes(o.id)) ? "c-white fw-6" : ""}`}>
                                                                                                        {o.label} </label>
                                                                                                }
                                                                                            />
                                                                                        </ToggleButton>
                                                                                    ))
                                                                                }
                                                                            </ToggleButtonGroup>

                                                                        </Grid>
                                                                    </Grid>
                                                                </Box>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container spacing={2} direction="row"
                                                            justifyContent="center"
                                                            alignItems="flex-start">
                                                            <Grid size={12}>
                                                                <span>Preferred working hours</span>
                                                            </Grid>
                                                            <Grid size={12}>
                                                                <Box sx={{ marginBottom: 2 }}>
                                                                    <Grid
                                                                        container
                                                                        direction="row"
                                                                        justifyContent="start"
                                                                        alignItems="start"
                                                                        spacing={2}
                                                                    >

                                                                        <Grid size={12}>
                                                                            <ToggleButtonGroup value={addCandidateModalFormik.values.prefferdWorkingHours}
                                                                            // onChange={(event, newFormats: any) => {
                                                                            //     addCandidateModalFormik.setFieldValue('prefferdWorkingHours', newFormats, true);
                                                                            // }}
                                                                            >
                                                                                {
                                                                                    Preferredworkinghours_10019 && Preferredworkinghours_10019.map((o, i) => (
                                                                                        <ToggleButton key={o.id} value={o.id} style={{ textTransform: 'capitalize' }} className={`cursor-pointer ${(addCandidateModalFormik.values.prefferdWorkingHours.includes(o.id)) ? "selectedCheckBox" : ""}`}
                                                                                            onClick={() => handleWorkingHoursChange(o.id)}
                                                                                        >
                                                                                            <FormControlLabel
                                                                                                control={<Checkbox checked={addCandidateModalFormik.values.prefferdWorkingHours.includes(o.id)} onClick={() => handleWorkingHoursChange(o.id)} />}
                                                                                                labelPlacement="end"
                                                                                                label={
                                                                                                    <label key={i} className={`cursor-pointer fw-6 ${(addCandidateModalFormik.values.prefferdWorkingHours.includes(o.id)) ? "c-white fw-6" : ""}`}>
                                                                                                        {o.label} </label>
                                                                                                }
                                                                                            />
                                                                                        </ToggleButton>
                                                                                    ))
                                                                                }
                                                                            </ToggleButtonGroup>

                                                                        </Grid>
                                                                    </Grid>
                                                                </Box>
                                                            </Grid>
                                                        </Grid>

                                                        <Grid container spacing={2} direction="row"
                                                            justifyContent="center"
                                                            alignItems="flex-start">
                                                            <Grid size={12}>
                                                                <span>Are you legally authorized to work in United State?</span>
                                                            </Grid>
                                                            <Grid size={12}>
                                                                <Box sx={{ marginBottom: 2 }}>
                                                                    <Grid
                                                                        container
                                                                        direction="row"
                                                                        justifyContent="start"
                                                                        alignItems="start"
                                                                        spacing={2}
                                                                    >

                                                                        <Grid size={12}>
                                                                            <ToggleButtonGroup>
                                                                                {Authorized.map((o, i) => (
                                                                                    <ToggleButton value={o} style={{ textTransform: 'capitalize' }} className={`cursor-pointer ${(o === addCandidateModalFormik.values.legalStatus) ? "selectedCheckBox" : ""}`} onClick={() => { addCandidateModalFormik.setFieldValue('legalStatus', o, true) }}>
                                                                                        <FormControlLabel control={<Checkbox checked={o === addCandidateModalFormik.values.legalStatus} />}
                                                                                            labelPlacement="end"
                                                                                            label={<label key={i}>
                                                                                                {o} </label>
                                                                                            } />

                                                                                    </ToggleButton>))}
                                                                            </ToggleButtonGroup>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Box>
                                                            </Grid>
                                                        </Grid>

                                                        <Grid container spacing={2} direction="row"
                                                            justifyContent="center"
                                                            alignItems="flex-start">
                                                            <Grid size={12}>
                                                                <span>Do you require a Visa sponsorship?</span>
                                                            </Grid>
                                                            <Grid size={12}>
                                                                <Box sx={{ marginBottom: 2 }}>

                                                                    <Grid size={12}>
                                                                        <Box sx={{ marginBottom: 2 }}>
                                                                            <Grid
                                                                                container
                                                                                direction="row"
                                                                                justifyContent="start"
                                                                                alignItems="start"
                                                                                spacing={2}
                                                                            >

                                                                                <Grid size={12}>
                                                                                    <ToggleButtonGroup>
                                                                                        {Visa.map((o, i) => (
                                                                                            <ToggleButton value={o} style={{ textTransform: 'capitalize' }} className={`cursor-pointer ${(o === addCandidateModalFormik.values.visaSponsorStatus) ? "selectedCheckBox" : ""}`} onClick={() => { addCandidateModalFormik.setFieldValue('visaSponsorStatus', o, true) }} >
                                                                                                <FormControlLabel control={<Checkbox checked={o === addCandidateModalFormik.values.visaSponsorStatus} />}
                                                                                                    labelPlacement="end"
                                                                                                    label={<label key={i}>
                                                                                                        {o} </label>
                                                                                                    } />
                                                                                            </ToggleButton>))}
                                                                                    </ToggleButtonGroup>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Box>
                                                                    </Grid>
                                                                </Box>
                                                            </Grid>
                                                        </Grid>
                                                        <span style={{ fontWeight: 'bold' }}>Compensation Preference</span>
                                                        <Grid container spacing={2}>
                                                            <Grid size={12} className="mb-2 mt-1">
                                                                <div>Fill out this section to tell hiring managers what you are looking to make in your next role, To receive the best matches, please share the minimum threshold at which you'd start considering roles. You will only be presented with opportunities that meet or exceed your requirements </div>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container spacing={2} direction="row"
                                                            justifyContent="center"
                                                            alignItems="flex-start">
                                                            <Grid size={12} className='mb-1'>
                                                                <div className='c-lightOrange'> <span style={{ fontWeight: 'bold' }}>You may enter either or both</span></div>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container spacing={2}>
                                                            <Grid size={6} className='mb-2'>
                                                                <TextField size='small' type="number" id="empYearCompensation"
                                                                    name="empYearCompensation" value={addCandidateModalFormik.values.empYearCompensation}
                                                                    onChange={addCandidateModalFormik.handleChange}
                                                                    InputProps={{
                                                                        startAdornment: (
                                                                            <InputAdornment position="start">
                                                                                <span style={{ fontWeight: 'bold' }}>$</span>
                                                                            </InputAdornment>
                                                                        ),
                                                                        endAdornment: (
                                                                            <InputAdornment position="start">
                                                                                <span style={{ fontWeight: 'bold' }}>Per Year</span>
                                                                            </InputAdornment>
                                                                        )
                                                                    }} />
                                                            </Grid>
                                                            <Grid size={6} className='mb-2'>
                                                                <TextField size='small' type="number" id="empHourCompensation"
                                                                    name="empHourCompensation" value={addCandidateModalFormik.values.empHourCompensation}
                                                                    onChange={addCandidateModalFormik.handleChange}
                                                                    InputProps={{
                                                                        startAdornment: (
                                                                            <InputAdornment position="start">
                                                                                <span style={{ fontWeight: 'bold' }}>$</span>
                                                                            </InputAdornment>
                                                                        ),
                                                                        endAdornment: (
                                                                            <InputAdornment position="start">
                                                                                <span style={{ fontWeight: 'bold' }}>Per Hour</span>
                                                                            </InputAdornment>
                                                                        )
                                                                    }} />
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container spacing={2} className='mb-2'>
                                                            <Grid size={12} className='mb-1'>

                                                                <FormControlLabel
                                                                    control={<Checkbox />}
                                                                    label="Present jobs with compensation below the minimum threshold I provided above."
                                                                    labelPlacement="end"
                                                                    id="compensation"
                                                                    name="compensation"
                                                                    value={addCandidateModalFormik.values.empCompThreshhold}
                                                                    onChange={addCandidateModalFormik.handleChange}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </>
                                            )}
                                        </Box>
                                    </Box>
                                </CardContent>
                                {/* </Card> */}
                            </Grid>
                        </div>
                    </DialogContent >
                    {/* <DialogActions>
                    <Grid
                        container
                        direction="row"
                        justifyContent="end"
                        alignItems="center"
                    >
                        <Button variant="contained"
                            type='button'
                            color="primary"
                            className='mr-2' onClick={candidate}
                        >Add Candidate</Button>
                        <Button variant="outlined"
                            type='button'
                            color="secondary"
                            className='mr-2'
                            onClick={closePopup}>Cancel</Button>
                    </Grid>
                </DialogActions> */}
                </Dialog >
            </form>
        </div >
    )
}

export default AddCandidateModal;