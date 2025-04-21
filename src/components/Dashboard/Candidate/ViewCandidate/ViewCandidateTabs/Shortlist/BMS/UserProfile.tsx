import { React, useState, useEffect } from '../../../../../../../shared/modules/React';

import { Typography } from '../../../../../../../shared/modules/MaterialImports/Typography';
import { Grid, Button, FormControl, IconButton, TextField, FormHelperText, showToaster } from '../../../../../../../shared/modules/commonImports';
// import Select from '@mui/material/Select';
import { MenuItem } from '../../../../../../../shared/modules/MaterialImports/Menu';
import { Divider } from '../../../../../../../shared/modules/MaterialImports/Divider';
import { Chip } from '../../../../../../../shared/modules/MaterialImports/Chip';
// import Drawer from '@mui/material/Drawer';
import { Box } from '../../../../../../../shared/modules/MaterialImports/Box';
import { FormLabel, FormControlLabel } from '../../../../../../../shared/modules/MaterialImports/FormInputs';
import { Checkbox } from '../../../../../../../shared/modules/MaterialImports/FormElements';
import { Stack } from '../../../../../../../shared/modules/MaterialImports/Stack';

// import CloseIcon from '@mui/icons-material/Close';
import Autocomplete from '@mui/material/Autocomplete';
// import SideMenu from '../../../../../Home/SideMenu';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { FormGroup } from '../../../../../../../shared/modules/MaterialImports/FormGroup';
import { LocalizationProvider, AdapterLuxon, DatePicker } from '../../../../../../../shared/modules/MaterialImports/DatePicker';
// import { TimePicker } from '@mui/x-date-pickers';
import { DateTime } from '../../../../../../../shared/modules/Luxon';

import { CountriesList } from '../../../../../../../shared/data/Countrieslist';
import ApiService from '../../../../../../../shared/api/api';
import { InputMask } from 'primereact/inputmask';
import { trackPromise } from '../../../../../../../shared/modules/PromiseTrackter';
import { NumericFormat } from "react-number-format";
// import PhoneInput from '../../../PhoneInput';



interface FormErrors {
    [key: string]: string;
}

interface UserProfileProps {
    candidateData: any;
    candidateId: string;
    open: boolean;
    closePopup: (state: boolean) => void;
    saveData: (json: any) => void;
    clientSubmission: boolean;
    completedStages: any;
}


interface BMSInternalSubmissionObject {
    address: Address;
    available: boolean;
    'available-date': string;
    // 'desired-location': Address;
    'desired-positions': string[];
    email: string;
    'employment-preferences': string[];
    experience: Experience[];
    'first-name': string;
    headline: string;
    'is-active': boolean;
    'last-name': string;
    'payment-preference': string;
    phone: string;
    rates: Rate[];
    resume: Resume;
    skills: string[];
    summary: string;
    'willing-to-relocate': boolean;
}

interface Resume {
    'content-type': string;
    data: string;
    name: string;
}

interface Rate {
    amount: number;
    currency: string;
    unit: string;
}

interface Experience {
    city: string;
    'end-date': string;
    'is-current': boolean;
    'job-title': string;
    organization: string;
    phone: string;
    'start-date': string;
    state: string;
    summary: string;
}

interface Address {
    address1: string;
    address2: string;
    city: string;
    'country-code': string;
    'postal-code': string;
    state: string;
    street1: string;
    street2: string;
}

const UserProfile = ({ candidateData, open, closePopup, saveData, candidateId, clientSubmission, completedStages }: UserProfileProps) => {

    const [profile, setProfile] = useState<BMSInternalSubmissionObject>({
        "first-name": "",
        "last-name": "",
        "headline": "",
        "summary": "",
        "available-date": "",
        "is-active": false,
        "rates": [{ unit: "Hourly", currency: "USD", amount: 0 }],
        "available": false,
        "willing-to-relocate": false,
        "email": "",
        "phone": "",
        "payment-preference": "",
        "desired-positions": [],
        "employment-preferences": [],
        "skills": [],
        "experience": [],
        "address": {
            "address1": "",
            "address2": "",
            "city": "",
            "state": "",
            "postal-code": "",
            "country-code": "US",
            "street1": "",
            "street2": ""
        },
        "resume": {
            "name": "",
            "data": "",
            "content-type": ""
        }
    });
    // const [docURL, setDocURL] = useState('');
    const [formProfile, setFormProfile] = useState<BMSInternalSubmissionObject>({
        "first-name": "",
        "last-name": "",
        "headline": "",
        "summary": "",
        "available-date": "",
        "is-active": false,
        "rates": [{ unit: "Hourly", currency: "USD", amount: 0 }],
        "available": false,
        "willing-to-relocate": false,
        "email": "",
        "phone": "",
        "payment-preference": "",
        "desired-positions": [],
        "employment-preferences": [],
        "skills": [],
        "experience": [],
        "address": {
            "address1": "",
            "address2": "",
            "city": "",
            "state": "",
            "postal-code": "",
            "country-code": "US",
            "street1": "",
            "street2": ""
        },
        "resume": {
            "name": "",
            "data": "",
            "content-type": ""
        }
    });
    const [errors, setErrors] = useState<FormErrors>({});
    // const [showMore, setShowMore] = useState(false);
    const [isViewMode, setIsViewMode] = useState(false);
    // const toggleViewMode = () => setIsViewMode((prevMode) => !prevMode);



    useEffect(() => {
        if (clientSubmission) {
            if (completedStages?.length) {
                for (let cs = 0; cs < completedStages.length; cs++) {
                    if (completedStages[cs]?.json?.isCustomForm && (completedStages[cs]?.json?.customStageName === "BMS_InternalSubmission")) {
                        if (completedStages[cs]?.json?.jsonData?.['first-name']) {
                            setProfile(completedStages[cs]?.json?.jsonData);
                            break;
                        }
                    }
                }
            }
        } else {
            const {
                summary,
                firstName,
                lastName,
                email,
                cellPhone,
                street,
                city,
                state,
                zipCode,
                workHistory,
                skillsList
            } = candidateData;
            setProfile(prevState => ({
                ...prevState,

                summary: summary ? summary.replace(/\t/g, '&emsp;').replace(/\n/g, '<br/>') : prevState.summary,

                "first-name": firstName || prevState["first-name"],
                "last-name": lastName || prevState["last-name"],
                email: email || prevState.email,
                phone: cellPhone || prevState.phone,

                address: {
                    ...prevState.address,
                    "address1": street || prevState.address?.address1,
                    city: city || prevState.address?.city,
                    state: state || prevState.address?.state,
                    "postal-code": zipCode || prevState.address?.["postal-code"]
                },

                experience: workHistory
                    ? workHistory.map((job: { jobTitle: string; companyName: string; startDate: string; endDate: string; }) => ({
                        "city": "",
                        "end-date": formatDateForUI(job.endDate),
                        "is-current": false,
                        "job-title": job.jobTitle,
                        "organization": job.companyName,
                        "phone": "",
                        "start-date": formatDateForUI(job.startDate),
                        "state": "",
                        "summary": "",
                    }))
                    : [{
                        "city": "",
                        "end-date": "",
                        "is-current": false,
                        "job-title": "",
                        "organization": "",
                        "phone": "",
                        "start-date": "",
                        "state": "",
                        "summary": "",
                    }],

                skills: skillsList ? skillsList.map((skill: { skillName: string }) => skill.skillName) : prevState.skills
            }));
        }
    }, []);
    useEffect(() => {
        setFormProfile({ ...profile });
    }, [profile]);

    // const toggleDrawer = (state: boolean) => () => {
    //     closePopup(state)
    // };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormProfile({
            ...formProfile,
            [name]: value
        });
    };

    const addNewRate = () => {
        setFormProfile({
            ...formProfile,
            rates: [...formProfile.rates, { unit: "Hourly", currency: "USD", amount: 0 }]
        });
    };

    const addNewExperience = () => {
        setFormProfile({
            ...formProfile,
            experience: [...formProfile.experience, {
                city: "string", 'end-date': "string", 'is-current': false, 'job-title': "string", organization: "string", phone: "string", 'start-date': "string", state: "string", summary: "string",
            }]
        });
    };

    // const addNewSkill = () => {
    //     setFormProfile({
    //         ...formProfile,
    //         skills: [...formProfile.skills, ""]
    //     });
    // };

    // const addNewPosition = () => {
    //     setFormProfile({
    //         ...formProfile,
    //         'desired-positions': [...formProfile['desired-positions'], ""]
    //     });
    // };

    const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = (reader.result as string)?.split(',')[1] || '';
                setFormProfile({
                    ...formProfile,
                    resume: {
                        name: file.name,
                        data: base64String,
                        'content-type': file.type,
                    }
                });

                // setDocURL(URL.createObjectURL(file));
            };
            reader.readAsDataURL(file);
        }
    };
    const employmentPreferencesOptions = [
        "Freelancer",
        "IndependentContractor",
        "Contract",
        "Contract to Hire",
        "Payrollee",
        "LimitedCompany",
        "PAYE",
        "T4"
    ];


    const validateForm = (): FormErrors => {
        const errors: FormErrors = {};


        if (formProfile['is-active'] === undefined || formProfile['is-active'] === null) {
            errors['is-active'] = 'Active status is required.';
        }


        // if (!formProfile.address) {
        //     errors.address = 'Address is required.';
        // } else {
        //     const address = formProfile.address;


        //     if ('street1' in address && typeof address.street1 !== 'string') {
        //         errors['address.street1'] = 'Street 1 must be a string.';
        //     }
        //     if ('street2' in address && typeof address.street2 !== 'string') {
        //         errors['address.street2'] = 'Street 2 must be a string.';
        //     }


        //     if (!address.address1 || address.address1.trim() === '') {
        //         errors['address.address1'] = 'Address Line 1 is required.';
        //     } else if (typeof address.address1 !== 'string') {
        //         errors['address.address1'] = 'Address Line 1 must be a string.';
        //     }

        //     if ('address2' in address && typeof address.address2 !== 'string') {
        //         errors['address.address2'] = 'Address Line 2 must be a string.';
        //     }


        //     if (!address.city || address.city.trim() === '') {
        //         errors['address.city'] = 'City is required.';
        //     } else if (typeof address.city !== 'string') {
        //         errors['address.city'] = 'City must be a string.';
        //     }

        //     if (!address.state || address.state.trim() === '') {
        //         errors['address.state'] = 'State is required.';
        //     } else if (typeof address.state !== 'string') {
        //         errors['address.state'] = 'State must be a string.';
        //     }

        //     if (!address['postal-code'] || address['postal-code'].trim() === '') {
        //         errors['address.postal-code'] = 'Postal Code is required.';
        //     } else if (typeof address['postal-code'] !== 'string') {
        //         errors['address.postal-code'] = 'Postal Code must be a string.';
        //     }

        //     if (!address['country-code'] || address['country-code'].trim() === '') {
        //         errors['address.country-code'] = 'Country Code is required.';
        //     } else if (typeof address['country-code'] !== 'string') {
        //         errors['address.country-code'] = 'Country Code must be a string.';
        //     } else if (address['country-code'].trim().length !== 2) {
        //         errors['address.country-code'] = 'Country Code must be a 2-character ISO 3166 code.';
        //     }
        // }


        // if (!formProfile['desired-location']) {

        // } else {
        //     const desiredLocation = formProfile['desired-location'];


        //     if ('street1' in desiredLocation && typeof desiredLocation.street1 !== 'string') {
        //         errors['desired-location.street1'] = 'Desired Street 1 must be a string.';
        //     }
        //     if ('street2' in desiredLocation && typeof desiredLocation.street2 !== 'string') {
        //         errors['desired-location.street2'] = 'Desired Street 2 must be a string.';
        //     }


        //     if (!desiredLocation.address1 || desiredLocation.address1.trim() === '') {
        //         errors['desired-location.address1'] = 'Desired Address Line 1 is required.';
        //     } else if (typeof desiredLocation.address1 !== 'string') {
        //         errors['desired-location.address1'] = 'Desired Address Line 1 must be a string.';
        //     }

        //     if ('address2' in desiredLocation && typeof desiredLocation.address2 !== 'string') {
        //         errors['desired-location.address2'] = 'Desired Address Line 2 must be a string.';
        //     }


        //     if (!desiredLocation.city || desiredLocation.city.trim() === '') {
        //         errors['desired-location.city'] = 'Desired City is required.';
        //     } else if (typeof desiredLocation.city !== 'string') {
        //         errors['desired-location.city'] = 'Desired City must be a string.';
        //     }

        //     if (!desiredLocation.state || desiredLocation.state.trim() === '') {
        //         errors['desired-location.state'] = 'Desired State is required.';
        //     } else if (typeof desiredLocation.state !== 'string') {
        //         errors['desired-location.state'] = 'Desired State must be a string.';
        //     }

        //     if (!desiredLocation['postal-code'] || desiredLocation['postal-code'].trim() === '') {
        //         errors['desired-location.postal-code'] = 'Desired Postal Code is required.';
        //     } else if (typeof desiredLocation['postal-code'] !== 'string') {
        //         errors['desired-location.postal-code'] = 'Desired Postal Code must be a string.';
        //     }

        //     if (!desiredLocation['country-code'] || desiredLocation['country-code'].trim() === '') {
        //         errors['desired-location.country-code'] = 'Desired Country Code is required.';
        //     } else if (typeof desiredLocation['country-code'] !== 'string') {
        //         errors['desired-location.country-code'] = 'Desired Country Code must be a string.';
        //     } else if (desiredLocation['country-code'].trim().length !== 2) {
        //         errors['desired-location.country-code'] = 'Desired Country Code must be a 2-character ISO 3166 code.';
        //     }
        // }


        if (!formProfile['first-name'] || formProfile['first-name'].trim() === '') {
            errors['first-name'] = 'First Name is required.';
        } else if (typeof formProfile['first-name'] !== 'string') {
            errors['first-name'] = 'First Name must be a string.';
        }


        if (!formProfile['last-name'] || formProfile['last-name'].trim() === '') {
            errors['last-name'] = 'Last Name is required.';
        } else if (typeof formProfile['last-name'] !== 'string') {
            errors['last-name'] = 'Last Name must be a string.';
        }


        if (!formProfile.skills || formProfile.skills.length === 0) {
            errors.skills = 'At least one skill is required.';
        } else if (!Array.isArray(formProfile.skills)) {
            errors.skills = 'Skills must be an array of strings.';
        } else {
            formProfile.skills.forEach((skill, idx) => {
                if (typeof skill !== 'string' || skill.trim() === '') {
                    errors[`skills.${idx}`] = 'Each skill must be a non-empty string.';
                }
            });
        }


        /*
        if (formProfile['preferred-rate'] === undefined || formProfile['preferred-rate'] === '') {
            errors['preferred-rate'] = 'Preferred rate is required.';
        } else if (typeof formProfile['preferred-rate'] !== 'number') {
            errors['preferred-rate'] = 'Preferred rate must be a number.';
        }
        */


        if (!formProfile.rates || formProfile.rates.length === 0) {
            errors.rates = 'At least one rate entry is required.';
        } else if (!Array.isArray(formProfile.rates)) {
            errors.rates = 'Rates must be an array of objects.';
        } else {
            formProfile.rates.forEach((rate: Rate, idx: number) => {

                if (!rate.unit || rate.unit.trim() === '') {
                    errors[`rates.${idx}.unit`] = 'Unit is required.';
                } else if (typeof rate.unit !== 'string') {
                    errors[`rates.${idx}.unit`] = 'Unit must be a string.';
                } else {
                    const unitOptions = ["Hourly", "Daily", "Monthly"];
                    if (!unitOptions.includes(rate.unit)) {
                        errors[`rates.${idx}.unit`] = `Unit must be one of: ${unitOptions.join(', ')}.`;
                    }
                }


                if (!rate.currency || rate.currency.trim() === '') {
                    errors[`rates.${idx}.currency`] = 'Currency is required.';
                } else if (typeof rate.currency !== 'string') {
                    errors[`rates.${idx}.currency`] = 'Currency must be a string.';
                } else {
                    const currencyOptions = ["USD", "EUR", "GBP", "SGD", "CAD"];
                    if (!currencyOptions.includes(rate.currency)) {
                        errors[`rates.${idx}.currency`] = `Currency must be one of: ${currencyOptions.join(', ')}.`;
                    }
                }


                if (rate.amount === undefined || rate.amount === null || (typeof rate.amount === 'string' && (rate.amount as string).trim() === '')) {
                    errors[`rates.${idx}.amount`] = 'Amount is required.';
                } else if (typeof rate.amount !== 'number') {
                    errors[`rates.${idx}.amount`] = 'Amount must be a number.';
                } else if (isNaN(rate.amount)) {
                    errors[`rates.${idx}.amount`] = 'Amount must be a valid number.';
                }
            });
        }


        const paymentOptions = ["Freelancer", "IndependentContractor", "Contract", "Contract to Hire", "Payrollee", "LimitedCompany", "PAYE", "T4"];
        if (!formProfile['payment-preference'] || formProfile['payment-preference'].trim() === '') {
            errors['payment-preference'] = 'Payment preference is required.';
        } else if (typeof formProfile['payment-preference'] !== 'string') {
            errors['payment-preference'] = 'Payment preference must be a string.';
        } else if (!paymentOptions.includes(formProfile['payment-preference'])) {
            errors['payment-preference'] = `Payment preference must be one of: ${paymentOptions.join(', ')}.`;
        }


        // if (!formProfile.resume) {
        //     errors.resume = 'Resume is required.';
        // } else {
        //     const resume = formProfile.resume;
        //     if (!resume.name || typeof resume.name !== 'string') {
        //         errors['resume.name'] = 'Resume name must be a string.';
        //     }
        //     if (!resume.data || typeof resume.data !== 'string') {
        //         errors['resume.data'] = 'Resume data must be a string.';
        //     }
        //     if (!resume['content-type'] || typeof resume['content-type'] !== 'string') {
        //         errors['resume.content-type'] = 'Resume content-type must be a string.';
        //     }
        // }


        if (!formProfile.experience || formProfile.experience.length === 0) {
            errors.experience = 'At least one experience entry is required.';
        } else if (!Array.isArray(formProfile.experience)) {
            errors.experience = 'Experience must be an array of objects.';
        } else {
            formProfile.experience.forEach((exp, idx: number) => {

                if (!exp['job-title'] || exp['job-title'].trim() === '') {
                    errors[`experience.${idx}.job-title`] = 'Job Title is required.';
                } else if (typeof exp['job-title'] !== 'string') {
                    errors[`experience.${idx}.job-title`] = 'Job Title must be a string.';
                }


                if (!exp['start-date'] || exp['start-date'].trim() === '') {
                    errors[`experience.${idx}.start-date`] = 'Start Date is required.';
                } else if (typeof exp['start-date'] !== 'string') {
                    errors[`experience.${idx}.start-date`] = 'Start Date must be a string.';
                }

                if (!exp['end-date'] || exp['end-date'].trim() === '') {
                    errors[`experience.${idx}.end-date`] = 'End Date is required.';
                } else if (typeof exp['end-date'] !== 'string') {
                    errors[`experience.${idx}.end-date`] = 'End Date must be a string.';
                }


                // if (!exp.organization || exp.organization.trim() === '') {
                //     errors[`experience.${idx}.organization`] = 'Organization is required.';
                // } else if (typeof exp.organization !== 'string') {
                //     errors[`experience.${idx}.organization`] = 'Organization must be a string.';
                // }


                // if (!exp.summary || exp.summary.trim() === '') {
                //     errors[`experience.${idx}.summary`] = 'Summary is required.';
                // } else if (typeof exp.summary !== 'string') {
                //     errors[`experience.${idx}.summary`] = 'Summary must be a string.';
                // }


                // if ('city' in exp && typeof exp.city !== 'string') {
                //     errors[`experience.${idx}.city`] = 'City must be a string.';
                // }
                // if ('state' in exp && typeof exp.state !== 'string') {
                //     errors[`experience.${idx}.state`] = 'State must be a string.';
                // }


                // if ('is-current' in exp && typeof exp['is-current'] !== 'boolean') {
                //     errors[`experience.${idx}.is-current`] = 'Is Current must be a boolean.';
                // }


                // if ('phone' in exp && typeof exp.phone !== 'string') {
                //     errors[`experience.${idx}.phone`] = 'Phone must be a string.';
                // }


                // if ('skills' in exp) {
                //     if (!Array.isArray(exp.skills)) {
                //         errors[`experience.${idx}.skills`] = 'Skills must be an array of strings.';
                //     } else {
                //         exp.skills.forEach((skill: string, skillIdx: number) => {
                //             if (typeof skill !== 'string' || skill.trim() === '') {
                //                 errors[`experience.${idx}.skills.${skillIdx}`] = 'Each skill must be a non-empty string.';
                //             }
                //         });
                //     }
                // }
            });
        }
        if (!formProfile.address['country-code']) {
            errors['address.country-code'] = 'Country is required.';
        }

        return errors;
    };


    const handleSubmit = () => {
        const validationErrors = validateForm();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) {
            console.log('validation errors ', validationErrors);
            return;
        }

        const updatedExperience = formProfile.experience.map(({ ...rest }) => ({
            ...rest,
        }));

        setProfile({ ...formProfile, experience: updatedExperience });

        let dataToPass = {
            ...formProfile,
            "desired-location": formProfile.address
        }
        console.log(dataToPass);
        // return;

        // return;
        // https://adminapi.cxninja.com/beeline-service-dev/candidate/id
        // /beeline-service-dev/candidate/{id}
        if (clientSubmission) {
            trackPromise(
                ApiService.putWithData('beeline', `candidate/${candidateId}`, dataToPass).then((response) => {
                    console.log(response);
                    console.log(response.data);
                    // message:"Profile id 58333 created."
                    if (response.data?.Success) {
                        //  response.data.message?.includes('created') || response.data.message?.includes('updated')
                        saveData({ ...dataToPass });
                        // toggleViewMode();
                    } else {
                        showToaster(response.data?.Message ? response.data?.Message : "Error occured while saving ", 'error');
                    }
                })
            )
        } else {
            saveData({ ...dataToPass });
        }
        // closePopup(false)
    };

    // const handleCheckboxChange = (preference) => (event) => {
    //     const { checked } = event.target;
    //     const updatedPreferences = checked
    //         ? [...formProfile['employment-preferences'], preference]
    //         : formProfile['employment-preferences'].filter(p => p !== preference);

    //     setFormProfile({ ...formProfile, 'employment-preferences': updatedPreferences });
    // };

    const handleAutocompleteChange = (event: React.SyntheticEvent, value: string[]) => {
        setFormProfile(prevState => ({
            ...prevState,
            'employment-preferences': value
        }));
    };

    // const handleSkillChange = (event, newValue, index) => {
    //     const updatedExperience = [...formProfile.experience];
    //     updatedExperience[index].skills = newValue;
    //     setFormProfile({ ...formProfile, experience: updatedExperience });
    // };

    const formatDateForUI = (dateStr: string) => {
        if (!dateStr) return '';
        const [year, month, dayWithTime] = dateStr.split('T')[0].split('-');
        const day = dayWithTime.split(' ')[0];
        return `${day}-${month}-${year}`;
    };





    // const parseDateFromUI = (dateStr) => {
    //     if (!dateStr) return '';
    //     const [day, month, year] = dateStr.split('-');
    //     return `${year}-${month}-${day}`;
    // };


    return (
        (<div>
            {/* <Drawer
                anchor="right"
                open={open}
                // onClose={toggleDrawer(false)}
                onClose={() => toggleDrawer(false)}

                PaperProps={{
                    sx: { width: '900px' },
                    transition: 'transform 0.3s ease-in-out',
                }}
            > */}
            <Box p={3} role="presentation">
                {/* <IconButton onClick={toggleDrawer(false)} style={{ float: 'right' }}>
                    <CloseIcon />
                </IconButton>


                <Box display="flex" justifyContent="space-between">
                    <Typography variant="h4" gutterBottom>
                        {isViewMode ? 'View Profile' : 'Edit Profile'}
                    </Typography>

                </Box> */}

                <Box className="apply-card-wrapper">
                    <Typography variant='h6' mb={2}>Candidate Details</Typography>
                    <Grid container spacing={3}>

                        <Grid size={4}>
                            {isViewMode ? (
                                <Typography variant="body1">
                                    <strong>First Name:</strong> {formProfile['first-name']}
                                </Typography>
                            ) : (
                                <TextField
                                    fullWidth
                                    name="first-name"
                                    value={formProfile['first-name']}
                                    label={
                                        <span>
                                            First Name <span style={{ color: 'red' }}>*</span>
                                        </span>
                                    }
                                    onChange={handleChange}
                                    error={!!errors['first-name']}
                                    helperText={errors['first-name']}
                                    size='small'
                                />
                            )}
                        </Grid>
                        <Grid size={4}>
                            {isViewMode ? (
                                <Typography variant="body1">
                                    <strong>Last Name:</strong> {formProfile['last-name']}
                                </Typography>
                            ) : (
                                <TextField
                                    fullWidth
                                    name="last-name"
                                    label={
                                        <span>
                                            Last Name <span style={{ color: 'red' }}>*</span>
                                        </span>
                                    }
                                    value={formProfile['last-name']}
                                    onChange={handleChange}
                                    error={!!errors['last-name']}
                                    helperText={errors['last-name']}
                                    size='small'
                                />
                            )}
                        </Grid>



                        <Grid size={4}>
                            {isViewMode ? (
                                <Typography variant="body1">
                                    <strong>Headline:</strong> {formProfile.headline}
                                </Typography>
                            ) : (
                                <TextField
                                    fullWidth
                                    label="Headline"
                                    name="headline"
                                    value={formProfile.headline}
                                    onChange={handleChange}
                                    error={!!errors.headline}
                                    helperText={errors.headline}
                                    size='small'
                                />
                            )}
                        </Grid>

                        <Grid size={12}>
                            {isViewMode ? (
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    variant="outlined"
                                    value={formProfile.summary
                                        ? formProfile.summary.replace(/&emsp;/g, '\t').replace(/<br\/>/g, '\n')
                                        : ''
                                    }
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    size='small'
                                />
                            ) : (
                                <TextField
                                    fullWidth
                                    multiline
                                    label="Summary"
                                    name="summary"
                                    rows={3}
                                    value={formProfile.summary
                                        ? formProfile.summary.replace(/&emsp;/g, '\t').replace(/<br\/>/g, '\n')
                                        : ''
                                    }
                                    onChange={handleChange}
                                    error={!!errors.summary}
                                    helperText={errors.summary} size='small'
                                />
                            )}
                        </Grid>

                        <Grid size={3}>
                            {isViewMode ? (
                                <Typography variant="body1">
                                    <strong>Willing to Relocate:</strong> {formProfile['willing-to-relocate'] ? 'Yes' : 'No'}
                                </Typography>
                            ) : (
                                <FormControl component="fieldset" fullWidth error={!!errors['willing-to-relocate']}>
                                    <FormGroup row>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={formProfile['willing-to-relocate'] === true}
                                                    onChange={(e) =>
                                                        setFormProfile((prevState) => ({
                                                            ...prevState,
                                                            'willing-to-relocate': e.target.checked
                                                        }))
                                                    } size='small'
                                                />
                                            }
                                            label="Willing to Relocate"
                                        />
                                    </FormGroup>
                                    {errors['willing-to-relocate'] && (
                                        <Typography color="error" variant="caption">
                                            {errors['willing-to-relocate']}
                                        </Typography>
                                    )}
                                </FormControl>
                            )}
                        </Grid>





                        <Grid size={3}>
                            {isViewMode ? (
                                <FormControl component="fieldset" fullWidth>
                                    <FormLabel component="legend"> <strong>Status:</strong></FormLabel>
                                    <Typography variant="body1">
                                        {formProfile['is-active'] ? "Active" : "Inactive"}
                                    </Typography>
                                </FormControl>
                            ) : (
                                <FormControl component="fieldset" fullWidth required error={!!errors['is-active']}>
                                    <FormGroup row>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={formProfile['is-active'] === true}
                                                    onChange={(e) =>
                                                        setFormProfile((prevState) => ({
                                                            ...prevState,
                                                            'is-active': e.target.checked
                                                        }))
                                                    } size='small'
                                                />
                                            }
                                            label="Active"
                                        />
                                    </FormGroup>
                                    {errors['is-active'] && (
                                        <Typography color="error" variant="caption">
                                            {errors['is-active']}
                                        </Typography>
                                    )}
                                </FormControl>
                            )}
                        </Grid>



                        <Grid size={3}>
                            {isViewMode ? (
                                <FormControl component="fieldset" fullWidth>
                                    <FormLabel component="legend"> <strong>Select Availability:</strong></FormLabel>
                                    <Typography variant="body1">
                                        {formProfile.available ? "Available" : "Not Available"}
                                    </Typography>
                                </FormControl>
                            ) : (
                                <FormControl component="fieldset" fullWidth error={!!errors.available}>
                                    <FormGroup row>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={formProfile.available === true}
                                                    onChange={(e) =>
                                                        setFormProfile((prevState) => ({
                                                            ...prevState,
                                                            available: e.target.checked
                                                        }))
                                                    } size='small'
                                                />
                                            }
                                            label="Available"
                                        />
                                    </FormGroup>
                                    {errors.available && (
                                        <Typography color="error" variant="caption">
                                            {errors.available}
                                        </Typography>
                                    )}
                                </FormControl>
                            )}
                        </Grid>



                        <Grid size={3}>
                            {isViewMode ? (
                                <FormControl component="fieldset" fullWidth>
                                    <FormLabel component="legend"> <strong>Available Date:</strong></FormLabel>
                                    <Typography variant="body1">
                                        {formProfile['available-date']
                                            ? DateTime.fromFormat(formProfile['available-date'], 'dd-MM-yyyy').toFormat('dd MMMM yyyy')
                                            : "Not specified"}
                                    </Typography>
                                </FormControl>
                            ) : (
                                <LocalizationProvider dateAdapter={AdapterLuxon}>
                                    <DatePicker
                                        label="Available Date"
                                        sx={{ width: '100%' }}
                                        value={formProfile['available-date'] ? DateTime.fromFormat(formProfile['available-date'], 'dd-MM-yyyy') : null}
                                        onChange={(newValue) => {
                                            const formattedDate = newValue ? newValue.toFormat('dd-MM-yyyy') : '';
                                            setFormProfile({ ...formProfile, 'available-date': formattedDate });
                                        }}
                                        slotProps={{
                                            textField: {
                                                size: 'small', fullWidth: true,
                                                error: !!errors['available-date'],
                                                helperText: errors['available-date'],
                                                InputLabelProps: { shrink: true },
                                            },
                                        }}
                                    />
                                </LocalizationProvider>
                            )}
                        </Grid>



                        <Grid size={4}>
                            {isViewMode ? (
                                <FormControl component="fieldset" fullWidth>
                                    <FormLabel component="legend"> <strong>Email:</strong></FormLabel>
                                    <Typography variant="body1">
                                        {formProfile.email || "Not specified"}
                                    </Typography>
                                </FormControl>
                            ) : (
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    value={formProfile.email}
                                    onChange={handleChange}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    size='small'
                                />
                            )}
                        </Grid>

                        <Grid size={4}>
                            {isViewMode ? (
                                <FormControl component="fieldset" fullWidth>
                                    <FormLabel component="legend"> <strong>Phone:</strong></FormLabel>
                                    <Typography variant="body1">
                                        {formProfile.phone || "Not specified"}
                                    </Typography>
                                </FormControl>
                            ) : (
                                <TextField
                                    fullWidth
                                    label="Phone"
                                    name="phone"
                                    value={formProfile.phone}
                                    onChange={handleChange}
                                    error={!!errors.phone}
                                    helperText={errors.phone}
                                    size='small'
                                />
                            )}
                        </Grid>

                        <Grid size={4}>
                            {isViewMode ? (
                                <FormControl component="fieldset" fullWidth>
                                    <FormLabel component="legend"> <strong>Payment Preference:</strong></FormLabel>
                                    <Typography variant="body1">
                                        {formProfile['payment-preference'] || "Not specified"}
                                    </Typography>
                                </FormControl>
                            ) : (
                                <>
                                    <FormControl fullWidth error={!!errors['payment-preference']}>
                                        <TextField
                                            name="payment-preference" fullWidth
                                            value={formProfile['payment-preference']}
                                            onChange={handleChange} select
                                            label={"Payment Preference"}
                                            size='small'
                                        >
                                            <MenuItem value=""><em>Select Payment Preference</em></MenuItem>
                                            <MenuItem value="Freelancer">Freelancer</MenuItem>
                                            <MenuItem value="IndependentContractor">Independent Contractor</MenuItem>
                                            <MenuItem value="Contract">Contract</MenuItem>
                                            <MenuItem value="Contract to Hire">Contract to Hire</MenuItem>
                                            <MenuItem value="Payrollee">Payrollee</MenuItem>
                                            <MenuItem value="LimitedCompany">Limited Company</MenuItem>
                                            <MenuItem value="PAYE">PAYE</MenuItem>
                                            <MenuItem value="T4">T4</MenuItem>
                                        </TextField>
                                        {errors['payment-preference'] && (
                                            <Typography color="error" variant="caption">
                                                {errors['payment-preference']}
                                            </Typography>
                                        )}
                                    </FormControl>
                                </>
                            )}
                        </Grid>
                    </Grid>
                </Box>

                <Box className="apply-card-wrapper">
                    <Typography variant="h6" mb={2}>Rates</Typography>
                    {(formProfile.rates.length === 0) ? [] : formProfile.rates.map((rate, index) => (
                        <Box className="apply-card-inner-wrapper" key={index}>
                            <Grid container spacing={2} key={index} alignItems="center">
                                {isViewMode ? (
                                    <>
                                        <Grid size={4}>
                                            <Typography variant="body1">
                                                <strong>Amount:</strong> {rate.amount ? `$${rate.amount}` : "Not specified"}
                                            </Typography>
                                        </Grid>
                                        <Grid size={4}>
                                            <Typography variant="body1">
                                                <strong>Currency:</strong> {rate.currency || "Not specified"}
                                            </Typography>
                                        </Grid>
                                        <Grid size={3}>
                                            <Typography variant="body1">
                                                <strong>Unit:</strong> {rate.unit || "Not specified"}
                                            </Typography>
                                        </Grid>
                                    </>
                                ) : (
                                    <>
                                        <Grid size={4}>
                                            <NumericFormat
                                                fullWidth
                                                name="amount"
                                                label={
                                                    <span>
                                                        Amount <span style={{ color: 'red' }}>*</span>
                                                    </span>
                                                }
                                                value={rate.amount || ''}
                                                onValueChange={(val) => {
                                                    const newRates = [...formProfile.rates];
                                                    newRates[index] = { ...newRates[index], amount: val.floatValue as number };
                                                    setFormProfile({ ...formProfile, rates: newRates });
                                                    console.log(errors);
                                                }}
                                                error={!!errors[`rates.${index}.amount`]}
                                                helperText={errors[`rates.${index}.amount`]}
                                                size='small'
                                                decimalScale={2}
                                                customInput={TextField}
                                            />
                                            {/* onChange={(e) => {
                                                    const newRates = [...formProfile.rates];
                                                    const parsedAmount = e.target.value === '' ? '' :
                                                        (e.target.value.includes('.') && (e.target.value.split('.')[1].length > 1)) ?
                                                            parseFloat(e.target.value).toFixed(2)
                                                            :
                                                            parseFloat(e.target.value);
                                                    newRates[index] = { ...newRates[index], amount: parsedAmount as number };
                                                    setFormProfile({ ...formProfile, rates: newRates });
                                                }} */}
                                        </Grid>

                                        <Grid size={3.5}>
                                            <TextField
                                                fullWidth select
                                                label={
                                                    <span>
                                                        Currency <span style={{ color: 'red' }}>*</span>
                                                    </span>
                                                }
                                                name="currency"
                                                value={rate.currency || ''}
                                                onChange={(e) => {
                                                    const newRates = [...formProfile.rates];
                                                    newRates[index] = { ...newRates[index], currency: e.target.value };
                                                    setFormProfile({ ...formProfile, rates: newRates });
                                                }}
                                                error={!!errors[`rates.${index}.currency`]}
                                                helperText={errors[`rates.${index}.currency`]}
                                                size='small'
                                            >
                                                {["USD", "EUR", "GBP", "SGD", "CAD"].map((each, index) => (
                                                    <MenuItem value={each} key={index}>{each}</MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>

                                        <Grid size={3.5}>
                                            <TextField
                                                fullWidth select
                                                label={
                                                    <span>
                                                        Unit <span style={{ color: 'red' }}>*</span>
                                                    </span>
                                                }
                                                name="unit"
                                                value={rate.unit || ''}
                                                onChange={(e) => {
                                                    const newRates = [...formProfile.rates];
                                                    newRates[index] = { ...newRates[index], unit: e.target.value };
                                                    setFormProfile({ ...formProfile, rates: newRates });
                                                }}
                                                error={!!errors[`rates.${index}.unit`]}
                                                helperText={errors[`rates.${index}.unit`]}
                                                size='small'
                                            >
                                                {["Hourly", "Daily", "Monthly"].map((each, index) => (
                                                    <MenuItem key={index} value={each}>{each}</MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>

                                        <Grid size={1}>
                                            <Stack direction={"row"}>
                                                {index === (formProfile.rates.length - 1) && (<IconButton
                                                    color="primary"
                                                    onClick={addNewRate}
                                                >
                                                    <AddIcon fontSize='small' />
                                                </IconButton>)}

                                                {index > 0 && (
                                                    <IconButton
                                                        color="error"
                                                        onClick={() => {
                                                            const newRates = formProfile.rates.filter((_, i) => i !== index);
                                                            setFormProfile({ ...formProfile, rates: newRates });
                                                        }}
                                                    >
                                                        <RemoveCircleIcon fontSize='small' />
                                                    </IconButton>
                                                )}
                                            </Stack>
                                        </Grid>
                                    </>
                                )}
                            </Grid>
                        </Box>
                    ))}



                    {/* <IconButton
                        color="primary"
                        onClick={addNewRate}
                        sx={{ marginTop: '10px' }}
                    >
                        <AddIcon />
                    </IconButton> */}


                    {errors.rates && (
                        <Typography color="error" variant="caption">
                            {errors.rates}
                        </Typography>
                    )}
                </Box>

                {/* <Button variant="contained" onClick={addNewRate} style={{ marginTop: '10px' }}>Add New Rate</Button>
                    {errors.rates && (
                        <Typography color="error" variant="caption">
                            {errors.rates}
                        </Typography>
                    )} */}
                <Box className="apply-card-wrapper">
                    <Grid container spacing={2}>
                        <Grid size={6}>
                            {(formProfile['desired-positions'].length > 0 ? formProfile['desired-positions'] : ['']).map((position, index) => (
                                isViewMode ? (
                                    <Typography variant="body1" key={index}>
                                        <strong>Position {index + 1}:</strong> {position || "Not specified"}
                                    </Typography>
                                ) : (
                                    <TextField
                                        fullWidth
                                        label={
                                            <span>
                                                Position <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                                            </span>
                                        }
                                        value={position || ''}
                                        key={index}
                                        onChange={(e) => {
                                            const newPositions = [...formProfile['desired-positions']];
                                            newPositions[index] = e.target.value;
                                            setFormProfile({ ...formProfile, 'desired-positions': newPositions });
                                        }}
                                        error={!!errors[`desired-positions.${index}`]}
                                        helperText={errors[`desired-positions.${index}`]}
                                        // sx={{
                                        //     '& .MuiInputBase-root': {
                                        //         height: '40px',
                                        //     },
                                        // }}
                                        size='small'
                                    />
                                )
                            ))}
                            {errors['desired-positions'] && (
                                <Typography color="error" variant="caption">
                                    {errors['desired-positions']}
                                </Typography>
                            )}
                        </Grid>



                        <Grid size={6}>
                            {isViewMode ? (
                                <Typography variant="body1">
                                    {formProfile['employment-preferences'].length > 0
                                        ? formProfile['employment-preferences'].join(', ')
                                        : "Not specified"}
                                </Typography>
                            ) : (
                                <FormControl fullWidth error={!!errors['employment-preferences']}>
                                    <Autocomplete
                                        multiple size='small'
                                        options={employmentPreferencesOptions}
                                        value={formProfile['employment-preferences'] || []}
                                        onChange={handleAutocompleteChange}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params} size='small'
                                                label="Employment Preferences"
                                                variant="outlined"
                                            />
                                        )}
                                        sx={{ "& .MuiAutocomplete-input": { p: "3px 14px !important" } }}
                                    />
                                    {errors['employment-preferences'] && (
                                        <FormHelperText>{errors['employment-preferences']}</FormHelperText>
                                    )}
                                </FormControl>
                            )}
                        </Grid>

                    </Grid>
                </Box>

                <Box className="apply-card-wrapper" sx={{ backgroundColor: 'var(--c-neutral-10) !important' }}>
                    <Typography variant="h6" mb={2}>Experience</Typography>
                    {formProfile?.experience?.map((exp, index: number) => (
                        <Box className="apply-card-inner-wrapper">
                            <Grid container spacing={2} key={index} alignItems="center">
                                {isViewMode ? (
                                    <>
                                        <div key={index} style={{ marginLeft: '25px', marginTop: '15px' }}>
                                            <Grid container spacing={3} style={{ marginBottom: '20px' }} alignItems="center">
                                                <Grid size={4}>
                                                    <Typography variant="subtitle1">
                                                        <strong>Job Title:</strong> {exp['job-title'] || "Not specified"}
                                                    </Typography>
                                                </Grid>
                                                <Grid size={4}>
                                                    <Typography variant="subtitle1">
                                                        <strong>Organization:</strong> {exp.organization || "Not specified"}
                                                    </Typography>
                                                </Grid>
                                                <Grid size={4}>
                                                    <Typography variant="subtitle1">
                                                        <strong>Summary:</strong> {exp.summary || "Not specified"}
                                                    </Typography>
                                                </Grid>
                                                <Grid size={3}>
                                                    <Typography variant="subtitle1">
                                                        <strong>Start Date:</strong> {exp['start-date'] || "Not specified"}
                                                    </Typography>
                                                </Grid>
                                                <Grid size={3}>
                                                    <Typography variant="subtitle1">
                                                        <strong>End Date:</strong> {exp['end-date'] || "Not specified"}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Divider style={{ margin: '20px 0' }} />
                                        </div>
                                    </>


                                ) : (
                                    <>
                                        <Grid size={3}>
                                            <TextField
                                                fullWidth
                                                label={
                                                    <span>
                                                        Job Title <span style={{ color: 'red' }}>*</span>
                                                    </span>
                                                }
                                                name="job-title"
                                                value={exp['job-title']}
                                                onChange={(e) => {
                                                    const updatedExperience = [...formProfile.experience];
                                                    updatedExperience[index]['job-title'] = e.target.value;
                                                    setFormProfile({ ...formProfile, experience: updatedExperience });
                                                }}
                                                error={!!errors[`experience.${index}.job-title`]}
                                                helperText={errors[`experience.${index}.job-title`]}
                                                size='small'
                                            />
                                        </Grid>

                                        <Grid size={3}>
                                            <TextField
                                                fullWidth
                                                label={
                                                    <span>
                                                        Organization
                                                    </span>
                                                }
                                                name="organization"
                                                value={exp.organization}
                                                onChange={(e) => {
                                                    const updatedExperience = [...formProfile.experience];
                                                    updatedExperience[index].organization = e.target.value;
                                                    setFormProfile({ ...formProfile, experience: updatedExperience });
                                                }}
                                                // error={!!errors[`experience.${index}.organization`]}
                                                // helperText={errors[`experience.${index}.organization`]}
                                                size='small'
                                            />
                                        </Grid>

                                        <Grid size={3}>
                                            <LocalizationProvider dateAdapter={AdapterLuxon}>
                                                <DatePicker
                                                    label="Start Date"
                                                    sx={{ width: '100%' }}
                                                    value={exp['start-date'] ? DateTime.fromFormat(exp['start-date'], 'dd-MM-yyyy') : null}
                                                    onChange={(newValue) => {
                                                        const updatedExperience = [...formProfile.experience];
                                                        const formattedDate = newValue ? newValue.toFormat('dd-MM-yyyy') : '';
                                                        updatedExperience[index]['start-date'] = formattedDate;
                                                        setFormProfile({ ...formProfile, experience: updatedExperience });
                                                    }}
                                                    slotProps={{
                                                        textField: {
                                                            size: 'small', fullWidth: true,
                                                            error: !!errors[`experience.${index}.start-date`],
                                                            helperText: errors[`experience.${index}.start-date`],
                                                            InputLabelProps: { shrink: true },
                                                        },
                                                    }}
                                                />
                                            </LocalizationProvider>
                                        </Grid>

                                        <Grid size={3}>
                                            <LocalizationProvider dateAdapter={AdapterLuxon}>
                                                <DatePicker
                                                    label="End Date"
                                                    sx={{ width: '100%' }}
                                                    value={exp['end-date'] ? DateTime.fromFormat(exp['end-date'], 'dd-MM-yyyy') : null}
                                                    onChange={(newValue) => {
                                                        const updatedExperience = [...formProfile.experience];
                                                        const formattedDate = newValue ? newValue.toFormat('dd-MM-yyyy') : '';
                                                        updatedExperience[index]['end-date'] = formattedDate;
                                                        setFormProfile({ ...formProfile, experience: updatedExperience });
                                                    }}
                                                    slotProps={{
                                                        textField: {
                                                            size: 'small', fullWidth: true,
                                                            error: !!errors[`experience.${index}.end-date`],
                                                            helperText: errors[`experience.${index}.end-date`],
                                                            InputLabelProps: { shrink: true },
                                                        },
                                                    }}
                                                />
                                            </LocalizationProvider>
                                        </Grid>

                                        <Grid size={3}>
                                            <TextField
                                                fullWidth
                                                label={
                                                    <span>
                                                        City
                                                    </span>
                                                }
                                                name="city"
                                                value={exp.city}
                                                onChange={(e) => {
                                                    const updatedExperience = [...formProfile.experience];
                                                    updatedExperience[index].city = e.target.value;
                                                    setFormProfile({ ...formProfile, experience: updatedExperience });
                                                }}
                                                // error={!!errors[`experience.${index}.city`]}
                                                // helperText={errors[`experience.${index}.city`]}
                                                size='small'
                                            />
                                        </Grid>

                                        <Grid size={3}>
                                            <TextField
                                                fullWidth
                                                label={
                                                    <span>
                                                        State
                                                    </span>
                                                }
                                                name="state"
                                                value={exp.state}
                                                onChange={(e) => {
                                                    const updatedExperience = [...formProfile.experience];
                                                    updatedExperience[index].state = e.target.value;
                                                    setFormProfile({ ...formProfile, experience: updatedExperience });
                                                }}
                                                // error={!!errors[`experience.${index}.state`]}
                                                // helperText={errors[`experience.${index}.state`]}
                                                size='small'
                                            />
                                        </Grid>


                                        <Grid size={3}>
                                            {/* <TextField
                                                fullWidth
                                                label={
                                                    <span>
                                                        Phone <span style={{ color: 'red' }}>*</span>
                                                    </span>
                                                }
                                                name="phone"
                                                value={exp.phone}
                                                onChange={(e) => {
                                                    const updatedExperience = [...formProfile.experience];
                                                    updatedExperience[index].phone = e.target.value;
                                                    setFormProfile({ ...formProfile, experience: updatedExperience });
                                                }}
                                                error={!!errors[`experience.${index}.phone`]}
                                                helperText={errors[`experience.${index}.phone`]}
                                                size='small'
                                            /> */}
                                            {/* <PhoneInput
                                            id="phone"
                                            name="phone"
                                            placeholder="(999) 999-9999"
                                            value={exp.phone}
                                                onChange={(e:any) => {
                                                    const updatedExperience = [...formProfile.experience];
                                                    updatedExperience[index].phone = (e.target.value) ? e.target.value : "";
                                                    setFormProfile({ ...formProfile, experience: updatedExperience });
                                                }}
                                                className='phoneinput_adduser mt-1 w-100 fs-13'
                                        /> */}
                                            <InputMask
                                                id="phone"
                                                name="phone"
                                                mask="(999) 999-9999"
                                                placeholder="(999) 999-9999"
                                                // /^((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}$/
                                                value={exp.phone}
                                                onChange={(e) => {
                                                    const updatedExperience = [...formProfile.experience];
                                                    updatedExperience[index].phone = (e.target.value) ? e.target.value : "";
                                                    setFormProfile({ ...formProfile, experience: updatedExperience });
                                                }}
                                                className='p-3 w-100 fs-13'
                                            />
                                        </Grid>
                                        <Grid size={3}>
                                            <FormControl component="fieldset" fullWidth >
                                                <FormGroup row>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={exp['is-current'] === true}
                                                                onChange={(e) => {
                                                                    const updatedExperience = [...formProfile.experience];
                                                                    updatedExperience[index]['is-current'] = e.target.checked;
                                                                    setFormProfile({ ...formProfile, experience: updatedExperience });
                                                                }
                                                                } size='small'
                                                            />
                                                        }
                                                        label="Is Current"
                                                    />
                                                </FormGroup>
                                            </FormControl>
                                        </Grid>

                                        <Grid size={9}>
                                            <TextField
                                                fullWidth
                                                label={
                                                    <span>
                                                        Summary
                                                    </span>
                                                }
                                                name="summary"
                                                value={exp.summary}
                                                onChange={(e) => {
                                                    const updatedExperience = [...formProfile.experience];
                                                    updatedExperience[index].summary = e.target.value;
                                                    setFormProfile({ ...formProfile, experience: updatedExperience });
                                                }}
                                                // error={!!errors[`experience.${index}.summary`]}
                                                // helperText={errors[`experience.${index}.summary`]}
                                                size='small' multiline rows={1}
                                            />
                                        </Grid>



                                        {/* <Grid size={12} md={10}>
                                            <Autocomplete
                                                multiple
                                                freeSolo
                                                options={formProfile.skills}
                                                filterSelectedOptions
                                                size="small"
                                                getOptionLabel={(option) => option}
                                                renderTags={(value, getTagProps) =>
                                                    value.map((option, skillIndex) => (
                                                        <Chip
                                                            key={skillIndex}
                                                            variant="outlined"
                                                            label={option}
                                                            size="small"
                                                            {...getTagProps({ index })}
                                                            onDelete={() => {
                                                                const updatedExperience = [...formProfile.experience];
                                                                updatedExperience[index].skills = updatedExperience[index].skills.filter((skill) => skill !== option);
                                                                setFormProfile({ ...formProfile, experience: updatedExperience });
                                                            }}
                                                        />
                                                    ))
                                                }
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        variant="outlined"
                                                        placeholder="Enter Skills"
                                                        error={!!errors[`experience.${index}.skills`]}
                                                        helperText={errors[`experience.${index}.skills`]}
                                                    />
                                                )}
                                                onChange={(event, newValue) => {
                                                    const updatedExperience = [...formProfile.experience];
                                                    updatedExperience[index].skills = newValue;
                                                    setFormProfile({ ...formProfile, experience: updatedExperience });
                                                }}
                                                value={formProfile.experience[index].skills || []}
                                            />
                                        </Grid> */}

                                        <Grid size={2} display="flex" justifyContent="center" alignItems="center">

                                            {index > 0 && (
                                                <IconButton
                                                    color="error"
                                                    onClick={() => {
                                                        const updatedExperience = formProfile.experience.filter((_, i) => i !== index);
                                                        setFormProfile({ ...formProfile, experience: updatedExperience });
                                                    }}
                                                >
                                                    <RemoveCircleIcon fontSize='small' />
                                                </IconButton>
                                            )}
                                            <Divider style={{ margin: '20px 0' }} />
                                        </Grid>

                                    </>
                                )}
                            </Grid>
                        </Box>
                    ))}
                    <Stack direction={"row"} mt={2} justifyContent={"flex-end"}>
                        <Button startIcon={<AddIcon fontSize='small' />} variant='contained' onClick={addNewExperience}>Add Experience</Button>
                    </Stack>
                </Box>

                <Box className="apply-card-wrapper">
                    <Grid size={12}>
                        <Typography variant="h6" mb={2}>Skills</Typography>
                        {isViewMode ? (
                            <>
                                <Typography variant="subtitle1">
                                    {formProfile.skills?.slice(0, 5).join(', ') || "Not specified"}
                                </Typography>
                                <Divider style={{ margin: '20px 0' }} />
                            </>
                        ) : (
                            <Autocomplete
                                multiple
                                id="general-skills-autocomplete"
                                options={formProfile.skills}
                                freeSolo
                                // required
                                fullWidth
                                filterSelectedOptions
                                size="small"
                                renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                        <Chip
                                            // key={index}
                                            variant="outlined"
                                            label={option}
                                            size="small"
                                            {...getTagProps({ index })}
                                        />
                                    ))
                                }
                                renderInput={(params) => (
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            placeholder="Enter Skills (max 6)"
                                            error={!!errors.skills}
                                            helperText={errors.skills}
                                        />
                                    </Stack>
                                )}
                                onChange={(event, newValue) => {
                                    const limitedSkills = newValue.slice(0, 6);
                                    setFormProfile({ ...formProfile, skills: limitedSkills });
                                }}
                                value={formProfile.skills.slice(0, 6) || []}
                            />

                        )}
                    </Grid>
                </Box>


                <Box className="apply-card-wrapper">
                    <Typography variant="h6" mb={2}>Address</Typography>
                    <Grid container spacing={2}>
                        <Grid size={6}>
                            {!isViewMode ? (
                                <TextField
                                    fullWidth
                                    label={
                                        <span>
                                            Address Line 1
                                        </span>
                                    }
                                    name="address1"
                                    value={formProfile.address.address1}
                                    size='small'
                                    onChange={(e) =>
                                        setFormProfile({
                                            ...formProfile,
                                            address: { ...formProfile.address, address1: e.target.value },
                                        })
                                    }
                                />
                            ) : (
                                <Typography variant="body1">
                                    <strong>Address Line 1:</strong> {formProfile.address.address1 || 'N/A'}
                                </Typography>
                            )}
                        </Grid>
                        <Grid size={6}>
                            {!isViewMode ? (
                                <TextField
                                    fullWidth
                                    label="Address Line 2"
                                    name="address2"
                                    value={formProfile.address.address2}
                                    size='small'
                                    onChange={(e) =>
                                        setFormProfile({
                                            ...formProfile,
                                            address: { ...formProfile.address, address2: e.target.value },
                                        })
                                    }
                                />
                            ) : (
                                <Typography variant="body1">
                                    <strong>Address Line 2:</strong> {formProfile.address.address2 || 'N/A'}
                                </Typography>
                            )}
                        </Grid>
                        <Grid size={3}>
                            {!isViewMode ? (
                                <TextField
                                    fullWidth
                                    label={
                                        <span>
                                            City
                                        </span>
                                    }
                                    name="city"
                                    value={formProfile.address.city}
                                    size='small'
                                    onChange={(e) =>
                                        setFormProfile({
                                            ...formProfile,
                                            address: { ...formProfile.address, city: e.target.value },
                                        })
                                    }
                                />
                            ) : (
                                <Typography variant="body1">
                                    <strong>City:</strong> {formProfile.address.city || 'N/A'}
                                </Typography>
                            )}
                        </Grid>
                        <Grid size={3}>
                            {!isViewMode ? (
                                <TextField
                                    fullWidth
                                    label={
                                        <span>
                                            State
                                        </span>
                                    }
                                    name="state"
                                    value={formProfile.address.state}
                                    size='small'
                                    onChange={(e) =>
                                        setFormProfile({
                                            ...formProfile,
                                            address: { ...formProfile.address, state: e.target.value },
                                        })
                                    }
                                />
                            ) : (
                                <Typography variant="body1">
                                    <strong>State:</strong> {formProfile.address.state || 'N/A'}
                                </Typography>
                            )}
                        </Grid>
                        <Grid size={3}>
                            {!isViewMode ? (
                                <TextField
                                    fullWidth
                                    label={
                                        <span>
                                            Postal Code
                                        </span>
                                    }
                                    name="postal-code"
                                    value={formProfile.address['postal-code']}
                                    size='small'
                                    onChange={(e) =>
                                        setFormProfile({
                                            ...formProfile,
                                            address: { ...formProfile.address, 'postal-code': e.target.value },
                                        })
                                    }
                                />
                            ) : (
                                <Typography variant="body1">
                                    <strong>Postal Code:</strong> {formProfile.address['postal-code'] || 'N/A'}
                                </Typography>
                            )}
                        </Grid>
                        <Grid size={3}>
                            {!isViewMode ? (
                                (<FormControl fullWidth error={!!errors['payment-preference']}>
                                    <TextField
                                        name="coutry-code"
                                        fullWidth
                                        value={formProfile.address['country-code']}
                                        onChange={(e) => setFormProfile({
                                            ...formProfile,
                                            address: {
                                                ...formProfile.address,
                                                'country-code': e.target.value,
                                            },
                                        })}
                                        select
                                        label={"Country"}
                                        size='small'
                                    >
                                        {CountriesList.map((item) => <MenuItem value={item.code}>{item.name}</MenuItem>)}
                                    </TextField>
                                    {errors['address.country-code'] && (
                                        <Typography color="error" variant="caption">
                                            {errors['address.country-code']}
                                        </Typography>
                                    )}
                                </FormControl>)
                                // <Autocomplete
                                //     fullWidth
                                //     options={countryOptions}
                                //     getOptionLabel={(option) => option.name}
                                //     size='small'
                                //     sx={{ "& .MuiAutocomplete-input": { p: "3px 14px !important" } }}
                                //     value={
                                //         countryOptions.find((option) => option.name === formProfile.address.country) || null
                                //     }
                                //     onChange={(event, newValue) => {
                                //         if (newValue) {
                                //             setFormProfile({
                                //                 ...formProfile,
                                //                 address: {
                                //                     ...formProfile.address,
                                //                     country: newValue.name,
                                //                     'country-code': newValue.code,
                                //                 },
                                //             });
                                //         }
                                //     }}
                                //     renderInput={(params) => (
                                //         <TextField
                                //             {...params}
                                //             name="country"
                                //             label={
                                //                 <span>
                                //                     Country
                                //                     <span style={{ color: 'red' }}>*</span>
                                //                 </span>
                                //             }
                                //             size='small'
                                //             error={!!errors['address.country']}
                                //             helperText={errors['address.country']}
                                //         />
                                //     )}
                                // />
                            ) : (
                                <Typography variant="body1">
                                    <strong>Country:</strong> {formProfile.address['country-code'] || 'N/A'}
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                </Box>


                <Box className="apply-card-wrapper">
                    <Typography variant="h6" mb={2}>Resume</Typography>
                    {isViewMode ? (

                        formProfile.resume ? (
                            <Box
                                sx={{
                                    width: '50%',
                                    marginTop: '20px',
                                    padding: '10px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography variant="subtitle1" gutterBottom>
                                    {formProfile.resume.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Type: {formProfile.resume['content-type']}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Size: {(formProfile.resume.data.length * 0.75 / 1024).toFixed(2)} KB
                                </Typography>
                            </Box>
                        ) : (
                            <Typography variant="body2" color="textSecondary">
                                No resume uploaded.
                            </Typography>
                        )
                    ) : (

                        <>
                            {formProfile.resume && (
                                <Button variant="text"
                                    component="label"
                                    color={errors.resume ? 'error' : 'inherit'}
                                    sx={{
                                        textTransform: "none", width: "30vw",
                                        padding: '10px',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                    }}
                                    disableElevation
                                >
                                    <Box
                                        sx={{
                                            width: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                        }}
                                    >
                                        {formProfile.resume.name ? <Typography variant="subtitle1" gutterBottom>
                                            {formProfile.resume.name}
                                        </Typography> :
                                            <Typography variant="body1" color="textPrimary">Click here to upload resume</Typography>
                                        }
                                        <Typography variant="body2" color="textSecondary">
                                            Type: {formProfile.resume['content-type']}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Size: {(formProfile.resume.data.length * 0.75 / 1024).toFixed(2)} KB
                                        </Typography>
                                    </Box>
                                    <input
                                        type="file"
                                        hidden
                                        onChange={handleResumeUpload}
                                    />
                                </Button>
                            )}
                        </>
                    )}

                    {errors.resume && (
                        <Typography color="error" variant="caption">
                            {errors.resume}
                        </Typography>
                    )}

                </Box>


                {!isViewMode && (
                    <Grid container direction="row" justifyContent="start" alignItems="center">
                        {/* <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} className='mr-4'>
                            {clientSubmission ? 'Update' : 'Save'} Profile
                        </Button>
                        {
                            clientSubmission ?
                                <Button variant="contained" color="primary" fullWidth onClick={() => saveData({})}>
                                    Continue
                                </Button>
                                :
                                null
                        } */}
                        <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} className='mr-4'>
                            Save Profile
                        </Button>

                    </Grid>
                )}
            </Box>
            {/* </Drawer> */}
        </div >)
    );
};

export default UserProfile;
