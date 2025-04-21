import { useFormik, Yup } from '../../../../../../../shared/modules/Formik';
import { FormControl, FormControlLabel, FormLabel, TextField } from '../../../../../../../shared/modules/MaterialImports/FormInputs';
import { Typography } from '../../../../../../../shared/modules/MaterialImports/Typography';
import { Button } from '../../../../../../../shared/modules/MaterialImports/Button';
import { Grid } from '../../../../../../../shared/modules/MaterialImports/Grid';
import { MenuItem } from '../../../../../../../shared/modules/MaterialImports/Menu';
import ErrorMessage from '../../../../../../shared/Error/ErrorMessage';
import { trackPromise } from '../../../../../../../shared/modules/PromiseTrackter';
import ApiService from '../../../../../../../shared/api/noTokenApi';
// import { useNavigate } from 'react-router-dom';
import { showToaster } from '../../../../../../shared/SnackBar/SnackBar';

import { Radio, RadioGroup } from '../../../../../../../shared/modules/MaterialImports/FormElements';

import { useEffect, useState } from 'react';
import { userLocalData } from '../../../../../../../shared/services/userData';

import './AgileoneInternalSubmission.scss';
import { AgileOneInternalSubmissionInterface } from '../BMS/ViewShortlistCustomForm/model/CustomForms/AgileOneInternalSubmission';
import Convert from '../../../../../../../shared/utils/Convert';

interface RegisterFormValues {
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    phone: string;
    addressline1: string;
    addressline2: string;
    city: string;
    stateProvince: string;
    postalCode: string;
    country: string;
    resume: {
        name: string;
        data: string;
        contentType: string;
    };
    gender: string;
    ethnicity: string;
    race: string;
    veteran: string;
    militarySpouse: string;
    disability: string;
    disabilityNote: string;
    payRate: string;
    billRate: string;
    estimatedCost: string;
}

const RegisterformvalidationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().required('Email is required'),
    phone: Yup.string(),
    addressline1: Yup.string(),
    addressline2: Yup.string(),
    city: Yup.string(),
    stateProvince: Yup.string(),
    postalCode: Yup.string(),
    country: Yup.string(),
    // fileName: Yup.string(),
    // fileContent: Yup.string().required('Resume is required'),
    resume: Yup.object().shape({
        name: Yup.string(),
        data: Yup.string().required('Resume is required'),
        "contentType": Yup.string()
    }),
    gender: Yup.string(),
    ethnicity: Yup.string(),
    race: Yup.string(),
    veteran: Yup.string(),
    militarySpouse: Yup.string(),
    disability: Yup.string(),
    disabilityNote: Yup.string(),
    payRate: Yup.string().required('Pay Rate is required')
        .test('test-billGreater', 'Pay Rate should be less than Bill Rate.', function () {
            const { payRate, billRate } = this.parent;
            if (billRate && payRate && (Number(billRate) > Number(payRate))) {
                return true;
            }
            return false;
        }),
    billRate: Yup.string().required('Bill Rate is required')
        .test('test-billGreater', 'Bill Rate should be greater than Pay Rate.', function () {
            const { payRate, billRate } = this.parent;
            if (billRate && payRate && (Number(billRate) > Number(payRate))) {
                return true;
            }
            return false;
        }),
    estimatedCost: Yup.string(),
});

// const navigate = useNavigate();


// const fields = [
//     'firstName', 'middleName', 'lastName', 'email', 'phone', 'addressline1',
//     'addressline2', 'city', 'stateProvince', 'postalCode', 'country', 'fileName',
//     'fileContent', 'gender', 'ethnicity', 'race', 'veteran', 'militarySpouse',
//     'disability', 'disabilityNote', 'xRefCode'
// ];


const AgileoneInternalSubmission = (
    { candidateData, open, closePopup, saveData, candidateId, openId, jobId }
        :
        {
            candidateData: any;
            candidateId: string;
            open: boolean;
            closePopup: (state: boolean) => void;
            saveData: (json: any) => void;
            openId: string;
            jobId: string;
        }
) => {


    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const registerformformik = useFormik<RegisterFormValues>({
        initialValues: {
            firstName: '',
            middleName: '',
            lastName: '',
            email: '',
            phone: '',
            addressline1: '',
            addressline2: '',
            city: '',
            stateProvince: '',
            postalCode: '',
            country: '',
            // fileName: '',
            // fileContent: '',
            resume: {
                name: "",
                data: "",
                "contentType": ""
            },
            gender: '',
            ethnicity: '',
            race: '',
            veteran: '',
            militarySpouse: '',
            disability: '',
            disabilityNote: '',
            payRate: '',
            billRate: '',
            estimatedCost: '',
        },
        validationSchema: RegisterformvalidationSchema,
        onSubmit: values => {
            console.log(values);
        },
    });



    const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = (reader.result as string)?.split(',')[1] || '';
                registerformformik.setValues({
                    ...registerformformik.values,
                    resume: {
                        name: file.name,
                        data: base64String,
                        'contentType': file.type,
                    }
                });

                // setDocURL(URL.createObjectURL(file));
            };
            reader.readAsDataURL(file);
        }
    };


    useEffect(() => {
        const {
            firstName,
            lastName,
            email,
            cellPhone,
            street,
            city,
            state,
            zipCode
        } = candidateData;

        registerformformik.setValues({
            ...registerformformik.values,
            firstName: firstName ? Convert.capitalizeWords(firstName) : '',
            lastName: lastName ? Convert.capitalizeWords(lastName) : '',
            email: email || '',
            phone: cellPhone || '',
            addressline1: street || '',
            city: city || '',
            stateProvince: state || '',
            postalCode: zipCode || '',
            country: 'USA',
            resume: {
                name: "",
                data: "",
                "contentType": ""
            },
        })

    }, []);
    const saveToAgile = () => {
        setIsFormSubmitted(true);
        console.log(registerformformik.errors);
        console.log(registerformformik.values);
        // return
        if (registerformformik.isValid) {
            registerFormSubmit();
        } else {
            console.log(registerformformik.errors);
        }
    }

    const registerFormSubmit = () => {
        const dataToPass: AgileOneInternalSubmissionInterface = {
            applicant: {
                firstName: registerformformik.values.firstName,
                lastName: registerformformik.values.lastName,
                email: registerformformik.values.email
            }
        }

        if (openId) {
            dataToPass.applicant.xRefCode = openId;
            dataToPass.xRefCode = openId;
        }
        if (registerformformik.values.phone) {
            dataToPass.applicant.phone = registerformformik.values.phone;
        }
        if (Number(registerformformik.values.payRate)) {
            dataToPass.payRate = Number(registerformformik.values.payRate);
        }
        if (Number(registerformformik.values.billRate)) {
            dataToPass.billRate = Number(registerformformik.values.billRate);
        }
        if (Number(registerformformik.values.estimatedCost)) {
            dataToPass.estimatedCost = Number(registerformformik.values.estimatedCost);
        }
        if (
            registerformformik.values.addressline1 ||
            registerformformik.values.addressline2 ||
            registerformformik.values.city ||
            registerformformik.values.stateProvince ||
            registerformformik.values.postalCode ||
            registerformformik.values.country
        ) {
            dataToPass.applicant.address = {}
            if (registerformformik.values.addressline1) {
                dataToPass.applicant.address.addressLine1 = registerformformik.values.addressline1;
            }
            if (registerformformik.values.addressline2) {
                dataToPass.applicant.address.addressLine2 = registerformformik.values.addressline2;
            }
            if (registerformformik.values.city) {
                dataToPass.applicant.address.city = registerformformik.values.city;
            }
            if (registerformformik.values.stateProvince) {
                dataToPass.applicant.address.stateProvince = registerformformik.values.stateProvince;
            }
            if (registerformformik.values.postalCode) {
                dataToPass.applicant.address.postalCode = registerformformik.values.postalCode;
            }
            if (registerformformik.values.country) {
                dataToPass.applicant.address.country = registerformformik.values.country;
            }
        }

        if (registerformformik.values.resume.name || registerformformik.values.resume.data) {
            dataToPass.applicant.resume = {};

            if (registerformformik.values.resume.name) {
                dataToPass.applicant.resume.fileName = registerformformik.values.resume.name;
            }
            if (registerformformik.values.resume.data) {
                dataToPass.applicant.resume.fileContent = registerformformik.values.resume.data;
            }
        }
        if (
            registerformformik.values.gender ||
            Number(registerformformik.values.ethnicity) ||
            registerformformik.values.race ||
            Number(registerformformik.values.veteran) ||
            registerformformik.values.militarySpouse ||
            registerformformik.values.disability ||
            registerformformik.values.disabilityNote
        ) {
            dataToPass.applicant.eeoc = {};
            if (registerformformik.values.gender) {
                dataToPass.applicant.eeoc.gender = registerformformik.values.gender;
            }
            if (Number(registerformformik.values.ethnicity)) {
                dataToPass.applicant.eeoc.ethnicity = Number(registerformformik.values.ethnicity);
            }
            if (registerformformik.values.race) {
                dataToPass.applicant.eeoc.race = registerformformik.values.race;
            }
            if (Number(registerformformik.values.veteran)) {
                dataToPass.applicant.eeoc.veteran = Number(registerformformik.values.veteran);
            }
            if (registerformformik.values.militarySpouse) {
                dataToPass.applicant.eeoc.militarySpouse = registerformformik.values.militarySpouse;
            }
            if (registerformformik.values.disability) {
                dataToPass.applicant.eeoc.disability = registerformformik.values.disability;
            }
            if (registerformformik.values.disabilityNote) {
                dataToPass.applicant.eeoc.disabilityNote = registerformformik.values.disabilityNote;
            }
        }

        console.log(dataToPass);



        trackPromise(
            ApiService.postWithData('ats', `agileOne/createAssignment/${userLocalData.getvalue('clientId')}/${userLocalData.getvalue('recrId')}/${jobId}`, dataToPass).then(
                (response: any) => {
                    if (response.data?.Success) {
                        //  response.data.message?.includes('created') || response.data.message?.includes('updated')
                        saveData({ ...dataToPass });
                        // toggleViewMode();
                    } else {
                        showToaster(response.data?.Message ? response.data.Message : "Error occured while saving ", 'error');
                    }
                }
            ).catch((error) => {
                console.error("API Error:", error);
            })
        )

    }


    return (
        <Grid id="RegistrationForm" container className="p-3">
            <form className="Registerform_container" onSubmit={registerformformik.handleSubmit} autoComplete='off'>

                <Grid container spacing={3} size={12}>

                    <Grid className="apply-card-wrapper" container>
                        <Grid size={6}>
                            <TextField
                                label={<label className='inputLabel'>First Name<span style={{ color: 'red' }}>*</span> </label>}
                                fullWidth className='mt-1' variant="outlined" type="text" size="small" id="firstName" name="firstName"
                                value={registerformformik.values.firstName}
                                onChange={registerformformik.handleChange}
                                onBlur={registerformformik.handleBlur}
                            />
                            <ErrorMessage formikObj={registerformformik} name='firstName' isFormSubmitted={isFormSubmitted} />
                        </Grid>

                        <Grid size={6}>
                            <TextField
                                label={<label className='inputLabel'> Middle Name</label>}
                                fullWidth className='mt-1' variant="outlined" type="text" size="small" id="middleName" name="middleName"
                                value={registerformformik.values.middleName}
                                onChange={registerformformik.handleChange}
                                onBlur={registerformformik.handleBlur}
                            />
                            <ErrorMessage formikObj={registerformformik} name='middleName' isFormSubmitted={isFormSubmitted} />
                        </Grid>
                        <Grid size={6}>
                            <TextField
                                label={<label className='inputLabel'> Last Name<span style={{ color: 'red' }}>*</span> </label>}
                                fullWidth className='mt-1' variant="outlined" type="text" size="small" id="lastName" name="lastName"
                                value={registerformformik.values.lastName}
                                onChange={registerformformik.handleChange}
                                onBlur={registerformformik.handleBlur}
                            />
                            <ErrorMessage formikObj={registerformformik} name='lastName' isFormSubmitted={isFormSubmitted} />
                        </Grid>
                        <Grid size={6}>
                            <TextField
                                label={<label className='inputLabel'> Email<span style={{ color: 'red' }}>*</span> </label>}
                                fullWidth className='mt-1' variant="outlined" type="text" size="small" id="email" name="email"
                                value={registerformformik.values.email}
                                onChange={registerformformik.handleChange}
                                onBlur={registerformformik.handleBlur}
                            />
                            <ErrorMessage formikObj={registerformformik} name='email' isFormSubmitted={isFormSubmitted} />
                        </Grid>
                        <Grid size={6}>
                            <TextField
                                label={<label className='inputLabel'> Phone </label>}
                                fullWidth className='mt-1' variant="outlined" type="text" size="small" id="phone" name="phone"
                                value={registerformformik.values.phone}
                                onChange={registerformformik.handleChange}
                                onBlur={registerformformik.handleBlur}
                            />
                            <ErrorMessage formikObj={registerformformik} name='phone' isFormSubmitted={isFormSubmitted} />
                        </Grid>

                        <Grid container>
                            <Grid size={6}>
                                <TextField
                                    label={<label className='inputLabel'> Address line 1</label>}
                                    fullWidth className='mt-1' variant="outlined" type="text" size="small" id="addressline1" name="addressline1"
                                    value={registerformformik.values.addressline1}
                                    onChange={registerformformik.handleChange}
                                />
                                <ErrorMessage formikObj={registerformformik} name='addressline1' isFormSubmitted={isFormSubmitted} />
                            </Grid>
                            <Grid size={6}>
                                <TextField
                                    label={<label className='inputLabel'> Address line 2 </label>}
                                    fullWidth className='mt-1' variant="outlined" type="text" size="small" id="addressline2" name="addressline2"
                                    value={registerformformik.values.addressline2}
                                    onChange={registerformformik.handleChange}
                                />
                                <ErrorMessage formikObj={registerformformik} name='addressline2' isFormSubmitted={isFormSubmitted} />
                            </Grid>
                            <Grid size={6}>
                                <TextField
                                    label={<label className='inputLabel'> City </label>}
                                    fullWidth className='mt-1' variant="outlined" type="text" size="small" id="city" name="city"
                                    value={registerformformik.values.city}
                                    onChange={registerformformik.handleChange}
                                />
                                <ErrorMessage formikObj={registerformformik} name='city' isFormSubmitted={isFormSubmitted} />
                            </Grid>
                            <Grid size={6}>
                                <TextField
                                    label={<label className='inputLabel'> State Province </label>}
                                    fullWidth className='mt-1' variant="outlined" type="text" size="small" id="stateProvince" name="stateProvince"
                                    value={registerformformik.values.stateProvince}
                                    onChange={registerformformik.handleChange}
                                />
                                <ErrorMessage formikObj={registerformformik} name='stateProvince' isFormSubmitted={isFormSubmitted} />
                            </Grid>
                            <Grid size={6}>
                                <TextField
                                    label={<label className='inputLabel'> Postal Code</label>}
                                    fullWidth className='mt-1' variant="outlined" type="text" size="small" id="postalCode" name="postalCode"
                                    value={registerformformik.values.postalCode}
                                    onChange={registerformformik.handleChange}
                                />
                                <ErrorMessage formikObj={registerformformik} name='postalCode' isFormSubmitted={isFormSubmitted} />
                            </Grid>
                            <Grid size={6}>
                                <TextField
                                    label={<label className='inputLabel'> Country </label>}
                                    fullWidth className='mt-1' variant="outlined" type="text" size="small" id="country" name="country"
                                    value={registerformformik.values.country}
                                    onChange={registerformformik.handleChange}
                                />
                                <ErrorMessage formikObj={registerformformik} name='country' isFormSubmitted={isFormSubmitted} />
                            </Grid>
                        </Grid>
                        <Grid container className="d-none">
                            <Grid size={6}>
                                <TextField
                                    label={<label className='inputLabel'> Gender  </label>}
                                    fullWidth className='mt-1' variant="outlined" type="text" size="small" id="gender" name="gender"
                                    value={registerformformik.values.gender}
                                    onChange={registerformformik.handleChange}
                                    select
                                >
                                    <MenuItem value=""><em>Select Gender</em></MenuItem>
                                    <MenuItem value="female">Female</MenuItem>
                                    <MenuItem value="male">Male</MenuItem>
                                    <MenuItem value="nonbinary">Nonbinary</MenuItem>
                                </TextField>
                                <ErrorMessage formikObj={registerformformik} name='gender' isFormSubmitted={isFormSubmitted} />
                            </Grid>
                            <Grid size={6}>
                                <TextField
                                    label={<label className='inputLabel'> Ethnicity  </label>}
                                    fullWidth className='mt-1' variant="outlined" type="text" size="small" id="ethnicity" name="ethnicity"
                                    value={registerformformik.values.ethnicity}
                                    onChange={registerformformik.handleChange}
                                    select
                                >
                                    <MenuItem value=""><em>Select Ethnicity</em></MenuItem>
                                    <MenuItem value={1}>Prefer no to answer</MenuItem>
                                    <MenuItem value={2}>Hispanic or Latino</MenuItem>
                                    <MenuItem value={3}>Not Hispanic or Latino</MenuItem>

                                </TextField>
                                <ErrorMessage formikObj={registerformformik} name='ethnicity' isFormSubmitted={isFormSubmitted} />
                            </Grid>
                            <Grid size={6}>
                                <TextField
                                    label={<label className='inputLabel'> Race  </label>}
                                    fullWidth className='mt-1' variant="outlined" type="text" size="small" id="race" name="race"
                                    value={registerformformik.values.race}
                                    onChange={registerformformik.handleChange}
                                    select
                                >
                                    <MenuItem value=""><em>Select Race</em></MenuItem>
                                    <MenuItem value="americanindian">American Indian</MenuItem>
                                    <MenuItem value="asian">Asian</MenuItem>
                                    <MenuItem value="black">Black</MenuItem>
                                    <MenuItem value="nativealaskan">Native Alaskan</MenuItem>
                                    <MenuItem value="nativehawaiian">Native Hawaiian</MenuItem>
                                    <MenuItem value="pacificislander">Pacific Islander</MenuItem>
                                    <MenuItem value="twoormoreraces">Two Or More Races</MenuItem>
                                    <MenuItem value="white">White</MenuItem>

                                </TextField>
                                <ErrorMessage formikObj={registerformformik} name='race' isFormSubmitted={isFormSubmitted} />
                            </Grid>
                            <Grid size={6}>
                                <TextField
                                    label={<label className='inputLabel'>Veteran</label>}
                                    fullWidth className='mt-1' variant="outlined" type="text" size="small" id="veteran" name="veteran"
                                    value={registerformformik.values.veteran}
                                    onChange={registerformformik.handleChange}
                                    select
                                >
                                    <MenuItem value=""><em>Select Veteran</em></MenuItem>
                                    <MenuItem value="5">I am a Veteran</MenuItem>
                                    <MenuItem value="6">I surrently serve in the military</MenuItem>
                                    <MenuItem value="7">No</MenuItem>
                                    <MenuItem value="8">Prefer Not to Answer</MenuItem>

                                </TextField>
                                <ErrorMessage formikObj={registerformformik} name='veteran' isFormSubmitted={isFormSubmitted} />
                            </Grid>
                            <Grid size={6}>
                                <FormControl>
                                    <FormLabel id="military-spouse-group-label">Military Spouse</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="military-spouse-group-label"
                                        value={registerformformik.values.militarySpouse}
                                        onChange={registerformformik.handleChange}
                                        id="militarySpouse" name="militarySpouse"
                                    >
                                        <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                                        <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                                        <FormControlLabel value="na" control={<Radio size="small" />} label="N/A" />
                                    </RadioGroup>
                                </FormControl>
                                <ErrorMessage formikObj={registerformformik} name='militarySpouse' isFormSubmitted={isFormSubmitted} />
                            </Grid>
                            <Grid size={6}>
                                <FormControl>
                                    <FormLabel id="disability-group-label">Disability </FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="disability-group-label"
                                        value={registerformformik.values.disability}
                                        onChange={registerformformik.handleChange}
                                        id="disability" name="disability"
                                    >
                                        <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                                        <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                                        <FormControlLabel value="na" control={<Radio size="small" />} label="N/A" />
                                    </RadioGroup>
                                </FormControl>
                                <ErrorMessage formikObj={registerformformik} name='disability' isFormSubmitted={isFormSubmitted} />
                            </Grid>
                            <Grid size={6}>
                                <TextField
                                    label={<label className='inputLabel'> Disability Note  </label>}
                                    fullWidth className='mt-1' variant="outlined" type="text" size="small" id="disabilityNote" name="disabilityNote"
                                    value={registerformformik.values.disabilityNote}
                                    onChange={registerformformik.handleChange}
                                />
                                <ErrorMessage formikObj={registerformformik} name='disabilityNote' isFormSubmitted={isFormSubmitted} />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid className="apply-card-wrapper" container size={12}>
                        <Grid size={6}>
                            <TextField
                                label={<>Pay Rate<span style={{ color: 'red' }}>*</span></>}
                                size="small"
                                fullWidth
                                id="payRate"
                                name='payRate'
                                value={registerformformik.values.payRate}
                                onChange={registerformformik.handleChange}
                                type="number"
                            />
                            <ErrorMessage formikObj={registerformformik} name='payRate' isFormSubmitted={isFormSubmitted} />
                        </Grid>
                        <Grid size={6}>
                            <TextField
                                label={<>Bill Rate<span style={{ color: 'red' }}>*</span></>}
                                size="small"
                                fullWidth
                                id="billRate"
                                name='billRate'
                                value={registerformformik.values.billRate}
                                onChange={registerformformik.handleChange}
                                type="number"
                            />
                            <ErrorMessage formikObj={registerformformik} name='billRate' isFormSubmitted={isFormSubmitted} />
                        </Grid>
                        <Grid size={6}>
                            <TextField
                                label={<>Estimated Cost</>}
                                size="small"
                                fullWidth
                                id="estimatedCost"
                                name='estimatedCost'
                                value={registerformformik.values.estimatedCost}
                                onChange={registerformformik.handleChange}
                                type="number"
                            />
                        </Grid>
                    </Grid>
                    <Grid className="apply-card-wrapper" container size={12}>
                        <Grid size={12}>
                            <Typography variant="h6" mb={2}>Resume<span style={{ color: 'red' }}>*</span></Typography>
                            <Button variant="text"
                                component="label"
                                color={registerformformik.errors.resume ? 'error' : 'inherit'}
                                sx={{
                                    textTransform: "none", width: "50%",
                                    padding: '10px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                }}
                                disableElevation
                            >
                                <Grid
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    {registerformformik.values.resume.name ? <Typography variant="subtitle1" gutterBottom>
                                        {registerformformik.values.resume.name}
                                    </Typography> :
                                        <Typography variant="body1" color="textPrimary">Click here to upload resume</Typography>
                                    }
                                    <Typography variant="body2" color="textSecondary">
                                        Type: {registerformformik.values.resume.contentType}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Size: {(registerformformik.values.resume.data.length * 0.75 / 1024).toFixed(2)} KB
                                    </Typography>
                                </Grid>
                                <input
                                    type="file"
                                    hidden
                                    onChange={handleResumeUpload}
                                />
                            </Button>
                            <ErrorMessage formikObj={registerformformik} name='resume' subName='data' isFormSubmitted={isFormSubmitted} />
                        </Grid>
                    </Grid>
                </Grid>
                <Button className="check_button" type="submit" variant='contained' fullWidth onClick={() => saveToAgile()}>Submit</Button>
            </form>
        </Grid>

    )
}

export default AgileoneInternalSubmission;

