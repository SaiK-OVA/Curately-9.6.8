// import React, { useState, useEffect, useCallback } from 'react';
import { useState, useEffect, useCallback, Fragment } from '../../../../shared/modules/React';
import './AddNewPool.scss'
// import { Box, Button, Checkbox, Chip, Dialog, DialogContent, DialogTitle, Divider, FormControl, FormControlLabel, FormGroup, Grid, IconButton, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, Stack, TextField, Typography } from '@mui/material';
import { Box } from '../../../../shared/modules/MaterialImports/Box';
import { FormControl, FormControlLabel, TextField } from '../../../../shared/modules/MaterialImports/FormInputs';
import { Grid, IconButton, InputLabel, Button, } from '../../../../shared/modules/commonImports';
import { Radio, RadioGroup, Select, Checkbox } from '../../../../shared/modules/MaterialImports/FormElements';
import { Typography } from '../../../../shared/modules/MaterialImports/Typography';
import { Stack } from '../../../../shared/modules/MaterialImports/Stack';
import { Divider } from '../../../../shared/modules/MaterialImports/Divider';
import { MenuItem } from '../../../../shared/modules/MaterialImports/Menu';
import { Dialog } from '../../../../shared/modules/MaterialImports/Dialog';
import { Chip } from '../../../../shared/modules/MaterialImports/Chip';
import { MUIAutoComplete } from '../../../shared/MUIAutoComplete/MUIAutoComplete';
import masterStatesList from '../../../../shared/data/States';
import Autocomplete from '@mui/material/Autocomplete';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useFormik, Yup } from '../../../../shared/modules/Formik';
import { trackPromise } from '../../../../shared/modules/PromiseTrackter';
import { userLocalData } from '../../../../shared/services/userData';
import ApiService from '../../../../shared/api/api';
import Parsable from '../../../../shared/utils/Parsable';
import { showToaster } from '../../../shared/SnackBar/SnackBar'
// import { PreferencesData } from "../../../../shared/data/Community/Preferences";

//import masterJobStatus from "../../../../shared/data/JobStatus";
// import { CurrentEmpStatus_10010, EmpAvailabilityStatus_10011, EmpJobPref_10012, EmpLocPref_10013, Preferredworkinghours_10019 } from '../../../../shared/data/Community/Preference';

interface AddNewPoolProps {
    open: boolean;
    closePopup: () => void;

}
export interface HiringStatus {
    candStatusId: string;
    label: string;
}
export interface CandidateStatus {
    candidateStatusId: string;
    candidateStatusName: string;
}
interface ConditionOption {
    value: string;
    name: string;
}
interface CustomField {
    labelName: string;
    inputType: string;
    options?: string[];
    choices?: string[];
}
interface FormValues {
    talentpoolId: number | null;
    talentPoolName: string;
    private: boolean;
    notes: string;
    jobId: string;
    candidate: string;
    criteria: string;
    locationCriteria: string;
    aiJob: {
        aiJobId: number;
        aiCondition: string;
        aiScore: string;
    };
    jobSkills: {
        candidateJobTitle: string;
        candidateJobSkills: string;
    };
    status: {
        candidateStatus: string;
        hiringStatus: string;
        communityStatus: string;
        availabilityStatus: string;
    };
    preference: {
        currentEmpStatus: string;
        empAvailabilityStatus: string;
        empJobPref: string;
        empLocPref: string;
        empWorkHoursPref: string;
    };
    location: {
        city: string;
        state: string | null;
        zipcode: string;
        radius: string;
    };
    tags: string;
    tagNames: string;
    campaigns: string;
    campaignNames: string;
    customfields: Array<{
        customFieldName: string;
        condition: string;
        customFieldValue: string;
        type: string;
    }>;
    candidateActivities: {
        candidateActivityType: string;
        candidatePeriodValues: string;
    };
    recrId: string;
    clientId: string;
}

const AddNewPool = ({ open, closePopup, add, talentPoolId, onSaveUpdatePool, onSave }: {
    open: boolean;
    closePopup: () => void;
    add: boolean;
    talentPoolId: any;
    onSaveUpdatePool: any;
    onSave: any
}) => {
    const [customFields, setCustomFields] = useState([
        { customFieldName: '', condition: '', customFieldValue: '', type: '' },
    ]);
    const [hiringStatusList, setHiringStatusList] = useState<HiringStatus[]>([]);
    const [customFieldsData, setCustomFieldsData] = useState<CustomField[]>([]);
    const [candidateStatusList, setcandidateStatusList] = useState<CandidateStatus[]>([]);
    const [dropdownValues, setDropdownValues] = useState<any>([])
    const [customfieldCondition, setCustomfieldCondition] = useState<Array<ConditionOption>[]>([]);

    const [talentPoolData, setTalentPoolData] = useState<any>({});
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [isCustonFieldsPrefillData, setIsCustonFieldsPrefillData] = useState(false);
    const [isFormikCustonFieldsPrefillData, setIsFormikCustonFieldsPrefillData] = useState(false);


    const initialAddTalentPoolDetails = {
        talentpoolId: null,
        talentPoolName: '',
        private: false,
        notes: '',
        jobId: '',
        candidate: 'manual',
        criteria: 'jobSkills',
        locationCriteria: 'region',
        aiJob: {
            aiJobId: '',
            aiJobName: '',
            aiCondition: '',
            aiScore: '',
        },
        jobSkills: {
            candidateJobTitle: '',
            candidateJobSkills: '',
        },
        status: {
            candidateStatus: '',
            hiringStatus: '',
            communityStatus: '',
            availabilityStatus: '',
        },
        preference: {
            currentEmpStatus: '',
            empAvailabilityStatus: '',
            empJobPref: '',
            empLocPref: '',
            empWorkHoursPref: '',
        },
        location: {
            city: '',
            state: '',
            zipcode: '',
            radius: '5',
        },
        tags: '',
        tagNames: '',
        campaigns: '',
        campaignNames: '',
        customfields: [
            {
                customFieldName: '',
                condition: '',
                customFieldValue: '',
                type: ''
            },
        ],
        candidateActivities: {
            candidateActivityType: '',
            candidatePeriodValues: '',
        },
        recrId: userLocalData.getvalue('recrId'),
        clientId: userLocalData.getvalue('clientId')

    }
    const addTalentPoolSchema = Yup.object({
        talentpoolId: Yup.number().nullable(),
        talentPoolName: Yup.string().required('Talent Pool Name is required'),
        private: Yup.boolean(),
        notes: Yup.string().nullable(),
        candidate: Yup.string().nullable(),
        criteria: Yup.string().nullable(),
        locationCriteria: Yup.string().nullable(),
        aiJob: Yup.object({
            aiJobId: Yup.number().nullable(),
            aiJobName: Yup.string().nullable(),
            aiCondition: Yup.string().nullable(),
            aiScore: Yup.string().nullable(),
        }).nullable(),
        jobSkills: Yup.object({
            candidateJobTitle: Yup.string().nullable(),
            candidateJobSkills: Yup.string().nullable(),
        }).nullable(),
        location: Yup.object().shape({
            city: Yup.string().nullable(),
            state: Yup.string().nullable(),
            zipcode: Yup.string(),
            radius: Yup.string(),
        }).nullable(),
        tags: Yup.string().nullable(),
        tagNames: Yup.string().nullable(),
        campaigns: Yup.string().nullable(),
        campaignNames: Yup.string().nullable(),
        customfields: Yup.array(
            Yup.object({
                customFieldName: Yup.string().nullable(),
                condition: Yup.string().nullable(),
                customFieldValue: Yup.string().nullable(),
                type: Yup.string().nullable()
            })
        ).nullable(),
        candidateActivities: Yup.object({
            candidateActivityType: Yup.string().nullable(),
            candidatePeriodValues: Yup.string().nullable(),
        }).nullable(),
    });


    const addTalentPoolFormik = useFormik({
        initialValues: initialAddTalentPoolDetails,
        validationSchema: addTalentPoolSchema,
        onSubmit: () => {
            saveForm();
            setIsFormSubmitted(true);
        },
        validateOnMount: true
    });


    // const getPreferenceValue = (val: string) => {

    //     const categoryID = parseInt(val.toString().substring(0, 5));

    //     const category = PreferencesData.find(item => item.categoryID === categoryID);
    //     if (!category) {
    //         return "";
    //     }
    //     let sendvalue = "";
    //     if ((val.toString().length > 8)) {
    //         let preVal = val.split(",");
    //         for (let i = 0; i < preVal.length; i++) {
    //             if (preVal[i].trim() !== "") {
    //                 const preference = category.lookupsList.find(item => item.lookupId === parseInt(preVal[i]));
    //                 if (preference) {
    //                     sendvalue = sendvalue + ", " + preference.lookupValue;
    //                 }
    //             }
    //         }
    //         sendvalue = sendvalue.startsWith(',') ? sendvalue.slice(1) : sendvalue;

    //     } else {
    //         const preference = category.lookupsList.find(item => item.lookupId === parseInt(val.toString()));
    //         if (!preference) {
    //             return "";
    //         }
    //         sendvalue = preference.lookupValue;
    //     }

    //     return sendvalue;
    // };

    const fetchJobDetails = async (id: any) => {
        try {
            const response = await ApiService.getCall('admin', `getjobdatabase/${id}/${userLocalData.getvalue('clientId')}`);
            if (response.data.Success && response.data.Job && response.data.Job.length) {
                const jobDetails = response.data.Job[0];
                if (jobDetails.estEndDate && new Date(jobDetails.estEndDate) < new Date("1990-01-01")) {
                    jobDetails.estEndDate = "";
                }
                // console.log(jobDetails);
                addTalentPoolFormik.setFieldValue('aiJob.aiJobId', jobDetails.jobId);
                addTalentPoolFormik.setFieldValue('aiJob.aiJobName', jobDetails.jobTitle);
                addTalentPoolFormik.setFieldValue('location.city', jobDetails.workCity);
                addTalentPoolFormik.setFieldValue('location.state', jobDetails.workState);
                if (jobDetails.workZipcode !== 0) {
                    addTalentPoolFormik.setFieldValue('location.zipcode', jobDetails.workZipcode);
                }
                addTalentPoolFormik.setFieldValue('location.radius', jobDetails.radius ? jobDetails.radius : "5");

            } else {
                console.error('Job details not found');
            }
        } catch (error) {
            console.error('Error fetching job details:', error);

        }
    };


    const saveForm = () => {
        setIsFormSubmitted(true);
        // console.log(addTalentPoolFormik.values);

        // console.log(requestData);
        //  let locationValidated = false;
        if (addTalentPoolFormik.values.talentPoolName === "") {
            showToaster("Please enter Talent Pool Name", "error");
            return false;
        }


        const invalidCustomFields = addTalentPoolFormik.values.customfields.some((field, index) => {
            const isAnyFieldFilled =
                field.customFieldName?.trim() ||
                field.condition?.trim() ||
                field.customFieldValue?.trim();

            if (isAnyFieldFilled) {
                if (!field.customFieldName) {
                    showToaster(`Please select a Custom Field of  ${field.customFieldName}`, "error");
                    return true;
                }
                if (!field.condition) {
                    showToaster(`Please select a Condition for Custom Field of  ${field.customFieldName}`, "error");
                    return true;
                }
                if (!field.customFieldValue) {
                    showToaster(`Please enter a Value for Custom Field of ${field.customFieldName}`, "error");
                    return true;
                }
            }
            return false;
        });

        if (invalidCustomFields) {
            return false;
        }

        if (addTalentPoolFormik.values.candidate === 'dynamic') {
            if (addTalentPoolFormik.values.criteria === 'aiJob') {
                if (addTalentPoolFormik.values.aiJob.aiJobId === "") {
                    showToaster("Please select AI Job Name", "error");
                    return false;
                }
                if (addTalentPoolFormik.values.aiJob.aiCondition === "") {
                    showToaster("Please select AI Job Condition", "error");
                    return false;
                }
                if (addTalentPoolFormik.values.aiJob.aiScore === "") {
                    showToaster("Please Enter AI Job Score", "error");
                    return false;
                }

            } else if (addTalentPoolFormik.values.criteria === 'jobSkills') {
                if (addTalentPoolFormik.values.jobSkills.candidateJobTitle === "") {
                    showToaster("Please Enter Candidate Job Title", "error");
                    return false;
                }
                if (addTalentPoolFormik.values.jobSkills.candidateJobSkills === "") {
                    showToaster("Please Enter Candidate Skills", "error");
                    return false;
                }
            }

            if (addTalentPoolFormik.values.locationCriteria === 'region') {
                if (addTalentPoolFormik.values.location.city === "" && addTalentPoolFormik.values.location.state === "") {
                    showToaster("Please Enter City or State", "error");
                    // locationValidated = false;
                    return false;
                } else {
                    //  locationValidated = true;
                    addTalentPoolFormik.setFieldValue('location.zipcode', "");
                }
            } else if (addTalentPoolFormik.values.locationCriteria === 'zipcodeRadius') {
                if (addTalentPoolFormik.values.location.zipcode === "") {
                    showToaster("Please Enter ZIP code", "error");
                    //   locationValidated = false;
                    return false;
                } else {
                    //   locationValidated = true;
                    addTalentPoolFormik.setFieldValue('location.city', "");
                    addTalentPoolFormik.setFieldValue('location.state', "");
                }
            }
        }

        const requestData = {
            ...addTalentPoolFormik.values,
            aiJob: addTalentPoolFormik.values.criteria === 'aiJob' ? addTalentPoolFormik.values.aiJob : {
                aiJobId: '',
                aiJobName: '',
                aiCondition: '',
                aiScore: '',
            },
            jobSkills: addTalentPoolFormik.values.criteria === 'jobSkills' ? addTalentPoolFormik.values.jobSkills : {
                candidateJobTitle: '',
                candidateJobSkills: '',
            },
            location:
                addTalentPoolFormik.values.locationCriteria === 'zipcodeRadius'
                    ? {
                        ...addTalentPoolFormik.values.location,
                        city: '',
                        state: ''
                    }
                    : addTalentPoolFormik.values.locationCriteria === 'region'
                        ? {
                            ...addTalentPoolFormik.values.location,
                            zipcode: '',
                            radius: ''
                        }
                        : addTalentPoolFormik.values.location,
            recrId: userLocalData.getvalue('recrId'),
            clientId: userLocalData.getvalue('clientId')
        };


        const requestManual = {
            talentpoolId: addTalentPoolFormik.values.talentpoolId,
            talentPoolName: addTalentPoolFormik.values.talentPoolName,
            private: addTalentPoolFormik.values.private,
            notes: addTalentPoolFormik.values.notes,
            candidate: addTalentPoolFormik.values.candidate,
            recrId: userLocalData.getvalue('recrId'),
            clientId: userLocalData.getvalue('clientId')
        };

        //   if (locationValidated) {
        //  if (addTalentPoolFormik.isValid) {
        trackPromise(
            ApiService.postWithData('admin', 'saveOrUpdateDynamicTalentPool', (addTalentPoolFormik.values.candidate === 'dynamic') ? requestData : requestManual)
                .then(
                    (response: any) => {
                        // console.log(response.data);
                        if (response.data.Success) {
                            showToaster('Talent Pool has been saved successfully.', 'success');
                            onSaveUpdatePool()
                            closePopup();
                            addTalentPoolFormik.resetForm();
                        } else {
                            showToaster((response.data.Message) ? response.data.Message : 'An error occured', 'error')
                        }
                    })
        )
        //  } else {
        //    showToaster('Please fill all fields.', 'error');
        //   }
        // }
    }


    // const validateLocation = () => {
    //     const errors = {};
    //     const { city, state, zipcode, radius } = addTalentPoolFormik.values.location;
    //     const isStateCityFilled = Boolean(city && state);
    //     const isZipcodeRadiusFilled = Boolean(zipcode && radius);
    //     const fieldsFilled = [city, state, zipcode, radius].filter(Boolean).length;
    //     if (fieldsFilled === 0) {
    //         return errors;
    //     }
    //     // if (fieldsFilled === 3) {
    //     //     showToaster('You cannot provide three values. Provide either City & State or Zipcode & Radius.', 'error');
    //     //     errors.location = 'You cannot provide three values. Provide either City & State or Zipcode & Radius.';
    //     // }
    //     // if (isStateCityFilled && isZipcodeRadiusFilled) {
    //     //     showToaster('Provide either City & State or Zipcode & Radius, not both.', 'error');
    //     //     errors.location = 'Provide either City & State or Zipcode & Radius, not both.';
    //     // }
    //     // if (!isStateCityFilled && !isZipcodeRadiusFilled) {
    //     //     showToaster('Please provide either City & State or Zipcode & Radius.', 'error');
    //     //     errors.location = 'Please provide either City & State or Zipcode & Radius.';
    //     // }

    //     if (addTalentPoolFormik.values.candidate === 'dynamic') {
    //         if (addTalentPoolFormik.values.criteria === 'aiJob') {
    //             if (addTalentPoolFormik.values.aiJob.aiJobId.trim() === "") {
    //                 showToaster("Please select AI Job Name", "error");
    //                 return false;
    //             }
    //             if (addTalentPoolFormik.values.aiJob.aiCondition.trim() === "") {
    //                 showToaster("Please select AI Job Condition", "error");
    //                 return false;
    //             }
    //             if (addTalentPoolFormik.values.aiJob.aiScore.trim() === "") {
    //                 showToaster("Please Enter AI Job Score", "error");
    //                 return false;
    //             }

    //         } else if (addTalentPoolFormik.values.criteria === 'jobSkills') {
    //             if (addTalentPoolFormik.values.jobSkills.candidateJobTitle.trim() === "") {
    //                 showToaster("Please Enter Candidate Job Title", "error");
    //                 return false;
    //             }
    //             if (addTalentPoolFormik.values.jobSkills.candidateJobSkills.trim() === "") {
    //                 showToaster("Please Enter Candidate Skills", "error");
    //                 return false;
    //             }
    //         }

    //     }

    //     return errors;
    // };


    //custom fields

    // useEffect(() => {

    //     const fetchTalentPoolDetails = (someTalentPoolId) => {
    //         trackPromise(
    //             ApiService.postWithData(
    //                 'admin',
    //                 'getDynamicTalentPoolByTalentPoolId',
    //                 {
    //                     clientId: userLocalData.getvalue('clientId'),
    //                     talentpoolId: someTalentPoolId // Replace with your variable
    //                 }
    //             ).then((response: any) => {
    //                 if (response.data.Success) {
    //                     console.log('response', response.data);
    //                     const apiData = response.data.dynamicTalentPoolResponse;

    //                     // Recursive function to update Formik fields
    //                     const updateFormikFields = (data, prefix = '') => {
    //                         Object.keys(data).forEach((key) => {
    //                             const value = data[key];
    //                             const fieldName = prefix ? `${prefix}.${key}` : key;

    //                             if (value && typeof value === 'object' && !Array.isArray(value)) {
    //                                 // Handle nested objects
    //                                 updateFormikFields(value, fieldName);
    //                             } else if (Array.isArray(value) && key === 'customfields') {
    //                                 // Handle 'customfields' array
    //                                 value.forEach((field, index) => {
    //                                     Object.keys(field).forEach((fieldKey) => {
    //                                         addTalentPoolFormik.setFieldValue(
    //                                             `customfields[${index}].${fieldKey}`,
    //                                             field[fieldKey]
    //                                         );
    //                                     });
    //                                 });
    //                             } else {
    //                                 // Directly update scalar values
    //                                 addTalentPoolFormik.setFieldValue(fieldName, value);
    //                             }
    //                         });
    //                     };

    //                     // Update all fields
    //                     updateFormikFields(apiData);
    //                     if (apiData.aiJob.aiJobId) {
    //                         // await fetchJobDetails(apiData.aiJob.aiJobId);
    //                     }
    //                     console.log('addTalentPoolFormik', addTalentPoolFormik.values);

    //                 } else {
    //                     showToaster(
    //                         response.data.Message
    //                             ? response.data.Message
    //                             : 'Failed to fetch Talent Pool data.',
    //                         'error'
    //                     );
    //                 }
    //             }).catch((error: any) => {
    //                 console.error('Error fetching talent pool data:', error);
    //                 // showToaster('An error occurred while fetching Talent Pool data.', 'error');
    //             })
    //         );
    //     }


    //     fetchTalentPoolDetails(talentPoolId);
    // }, [talentPoolId]);





    const getCompareDropDownValues = (inputType: string) => {
        switch (inputType) {
            case "number":
                return [
                    { value: "=", name: "is equal to" },
                    { value: "!=", name: "is not equal to" },
                    { value: "<", name: "is lower than" },
                    { value: ">", name: "is greater than" },
                    { value: "<=", name: "is lower or equal to" },
                    { value: ">=", name: "is greater or equal than" },
                ];
            case "date":
                return [
                    { value: "=", name: "is on" },
                    { value: "!=", name: "is not on" },
                    { value: "<", name: "is before" },
                    { value: ">", name: "is after" },
                    { value: "<=", name: "is before or on" },
                    { value: ">=", name: "is after or on" },
                ];
            case "checkbox":
            case "radio":
            case "dropdown":
                return [
                    { value: "=", name: "is" },
                    { value: "!=", name: "is not" },
                ];
            case "textarea":
            case "text":
            default:
                return [
                    { value: "=", name: "is equal to" },
                    { value: "!=", name: "is not equal to" },
                    { value: "**", name: "contains" },
                    { value: "!*", name: "does not contain" },
                ];
        }
    };

    const handleAddField = () => {
        // setCustomFields((prevFields:any) => [
        //     ...prevFields,
        //     { customFieldName: '', condition: '', customFieldValue: '', type: '' }
        // ]);
        addTalentPoolFormik.setFieldValue('customfields', [
            ...addTalentPoolFormik.values.customfields,
            { customFieldName: '', condition: '', customFieldValue: '', type: '' }
        ]);
    };

    const handleRemoveField = (index: number) => {
        const tempCustomFields = [...addTalentPoolFormik.values.customfields];
        const updatedFields = tempCustomFields.filter((_, i) => i !== index);

        const tempDropdownValues = [...dropdownValues];
        const updatedDropdownValues = tempDropdownValues.filter((_, i) => i !== index);

        const tempCustomfieldCondition = [...customfieldCondition];
        const updatedCustomfieldCondition = tempCustomfieldCondition.filter((_, i) => i !== index);

        setCustomFields(updatedFields);
        setCustomfieldCondition([...updatedCustomfieldCondition])
        setDropdownValues([...updatedDropdownValues]);
        addTalentPoolFormik.setFieldValue('customfields', updatedFields);
    };

    const handleFieldChange = useCallback((index: number, field: string, value: string) => {
        addTalentPoolFormik.setFieldValue(`customfields[${index}].${field}`, value);
        if (field === 'customFieldName') {
            const selectedOption = customFieldsData.find(option => option.labelName === value);
            if (selectedOption) {
                addTalentPoolFormik.setFieldValue(`customfields[${index}].type`, selectedOption.inputType);
                const conditions = getCompareDropDownValues(selectedOption.inputType);
                // const tempConditions = [...customfieldCondition];
                // tempConditions[index] = conditions;
                setCustomfieldCondition((prevState: any) => [
                    ...prevState,
                    conditions
                ]);

                // addTalentPoolFormik.setFieldValue(`customfields[${index}].conditionOptions`, conditions);
                let tempOptions = [...dropdownValues];
                if (selectedOption.inputType === 'dropdown' || selectedOption.inputType === 'radio') {
                    // tempOptions[index] = (selectedOption.options || selectedOption.choices || "");
                    const tempOption = (selectedOption.options || selectedOption.choices || "");
                    setDropdownValues((prevState: any) => [
                        ...prevState,
                        tempOption
                    ]);
                } else {
                    // tempOptions[index] = "";
                    const tempOption = "";
                    setDropdownValues((prevState: any) => [
                        ...prevState,
                        tempOption
                    ]);
                }
            } else {
                setCustomfieldCondition((prevState: any) => [
                    ...prevState,
                    ""
                ]);
                setDropdownValues((prevState: any) => [
                    ...prevState,
                    ""
                ]);
            }
        }
    }, [customFieldsData, addTalentPoolFormik]);

    //Api call

    useEffect(() => {
        const fetchData = async () => {
            const requestData = {
                clientId: userLocalData.getvalue("clientId"),
                recrId: userLocalData.getvalue("recrId"),
            };
            try {
                const [hiringStatusRes, candidateStatusRes] = await Promise.all([
                    ApiService.postWithData("admin", "getHiringStatusList", requestData),
                    ApiService.postWithData("admin", "getCandidateStatusList", requestData)
                ]);
                if (hiringStatusRes.data?.hiringStatusList) {
                    setHiringStatusList(hiringStatusRes.data.hiringStatusList);
                }
                if (candidateStatusRes.data?.candidateStatusList) {
                    setcandidateStatusList(candidateStatusRes.data.candidateStatusList);
                }
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };
        trackPromise(fetchData());
        onClickCustomFields();
        talentPoolId ? onEditTalentPoolData(talentPoolId) : null;
    }, []);


    const onEditTalentPoolData = (talentpoolId: any) => {

        const getData = {
            "clientId": userLocalData.getvalue('clientId'),
            "talentpoolId": talentpoolId
        }

        trackPromise(
            ApiService.postWithData("admin", `getDynamicTalentPoolByTalentPoolId`, getData).then(async (response: any) => {
                const result = response.data?.dynamicTalentPoolResponse;
                let tempTalentCustoms = [];
                if (response.data?.dynamicTalentPoolResponse?.customfields?.length > 0) {

                    const talentCustomsFields = response.data?.dynamicTalentPoolResponse?.customfields;

                    for (let tr = 0; tr < talentCustomsFields.length; tr++) {
                        if (talentCustomsFields[tr]) {
                            let tempObj: any = {};
                            tempObj.customFieldName = talentCustomsFields[tr].customFieldName;
                            tempObj.condition = talentCustomsFields[tr].condition;
                            tempObj.customFieldValue = talentCustomsFields[tr].customFieldValue;
                            tempObj.type = talentCustomsFields[tr].type;

                            setIsFormikCustonFieldsPrefillData(true);
                            tempTalentCustoms.push(tempObj);
                        }

                    }
                } else {
                    let tempObj: any = {};
                    tempObj.customFieldName = "";
                    tempObj.condition = "";
                    tempObj.customFieldValue = "";
                    tempObj.type = "";

                    setIsFormikCustonFieldsPrefillData(true);
                    tempTalentCustoms.push(tempObj);

                }
                const tagNames = result.tags?.map((tag: { tagName: string }) => tag.tagName).join(', ') || '';
                const tagIds = result.tags?.map((tag: { tagId: number }) => tag.tagId).join(', ') || '';
                const campaignNames = result.campaigns?.map((campaign: { sequenceName: string }) => campaign.sequenceName).join(', ') || '';
                const campaignIds = result.campaigns?.map((campaign: { sequenceId: number }) => campaign.sequenceId).join(', ') || '';

                addTalentPoolFormik.setValues({
                    talentpoolId: result.talentpoolId ? result.talentpoolId : talentpoolId,
                    talentPoolName: String(result.talentPoolName ? result.talentPoolName : ""),
                    private: ((result.private === "true") || (result.private === true)) ? true : false,
                    notes: String(result.notes ? result.notes : ""),
                    jobId: String(result.jobId ? result.jobId : ""),
                    candidate: String(result.candidate ? result.candidate : ""),
                    criteria: String(result.criteria ? result.criteria : ""),
                    locationCriteria: String(result.locationCriteria ? result.locationCriteria : "region"),
                    aiJob: {
                        aiJobId: result.aiJob.aiJobId ? result.aiJob.aiJobId : "",
                        aiJobName: result.aiJob.aiJobName ? result.aiJob.aiJobName : "",
                        aiCondition: String(result.aiJob.aiCondition ? result.aiJob.aiCondition : ""),
                        aiScore: String(result.aiJob.aiScore ? result.aiJob.aiScore : ""),
                    },
                    jobSkills: {
                        candidateJobTitle: String(result.jobSkills.candidateJobTitle ? result.jobSkills.candidateJobTitle : ""),
                        candidateJobSkills: String(result.jobSkills.candidateJobSkills ? result.jobSkills.candidateJobSkills : ""),
                    },
                    status: {
                        candidateStatus: String(result.status.candidateStatus ? result.status.candidateStatus : ""),
                        hiringStatus: String(result.status.hiringStatus ? result.status.hiringStatus : ""),
                        communityStatus: String(result.status.communityStatus ? result.status.communityStatus : ""),
                        availabilityStatus: String(result.status.availabilityStatus ? result.status.availabilityStatus : ""),
                    },
                    preference: {
                        currentEmpStatus: String(result.preference.currentEmpStatus ? result.preference.currentEmpStatus : ""),
                        empAvailabilityStatus: String(result.preference.empAvailabilityStatus ? result.preference.empAvailabilityStatus : ""),
                        empJobPref: String(result.preference.empJobPref ? result.preference.empJobPref : ""),
                        empLocPref: String(result.preference.empLocPref ? result.preference.empLocPref : ""),
                        empWorkHoursPref: String(result.preference.empWorkHoursPref ? result.preference.empWorkHoursPref : ""),
                    },
                    location: {
                        city: String(result.location.city ? result.location.city : ""),
                        state: String(result.location.state ? result.location.state : ""),
                        zipcode: String(result.location.zipcode ? result.location.zipcode : ""),
                        radius: String(result.location.radius ? result.location.radius : "5"),
                    },
                    tags: tagIds,
                    tagNames: tagNames,
                    campaigns: campaignIds,
                    campaignNames: campaignNames,
                    customfields: tempTalentCustoms,
                    candidateActivities: {
                        candidateActivityType: String(result.candidateActivities?.candidateActivityType ? result.candidateActivities?.candidateActivityType : ""),
                        candidatePeriodValues: String(result.candidateActivities?.candidatePeriodValues ? result.candidateActivities?.candidatePeriodValues : ""),
                    },
                    recrId: userLocalData.getvalue('recrId'),
                    clientId: userLocalData.getvalue('clientId')
                });
                if (result.aiJob.aiJobId) {
                    await fetchJobDetails(result.aiJob.aiJobId);
                }

            })
        )
    }

    const onClickCustomFields = () => {
        let moduleId = '20002';
        trackPromise(
            //      ApiService.getById(214, 'getCustomSettingsById', '20002' + "/" + userLocalData.getvalue('clientId'))
            ApiService.getById('admin', 'getCustomSettingsById', moduleId + "/" + userLocalData.getvalue('clientId'))
                .then((response: any) => {
                    if (response?.data?.Success) {
                        const list = response.data.list;
                        if (list?.length && Parsable.isJSON(list[0].json)) {
                            let tempArray = JSON.parse(list[0].json);
                            // console.log("tempArray");
                            // console.log(tempArray);
                            setCustomFieldsData(tempArray);
                            setIsCustonFieldsPrefillData(true);
                        }
                    }
                })
                .catch((error) => {
                    console.error("Error fetching custom fields", error);
                })
        );
    }

    useEffect(() => {
        if (isCustonFieldsPrefillData && isFormikCustonFieldsPrefillData) {
            const preFillCustomFields = addTalentPoolFormik.values.customfields;
            for (let cf = 0; cf < preFillCustomFields.length; cf++) {
                handleFieldChange(cf, 'customFieldName', preFillCustomFields[cf].customFieldName)
                handleFieldChange(cf, 'condition', preFillCustomFields[cf].condition)
            }
        }

    }, [isCustonFieldsPrefillData, isFormikCustonFieldsPrefillData])

    useEffect(() => {
        if (!addTalentPoolFormik.values.customfields || addTalentPoolFormik.values.customfields.length === 0) {
            addTalentPoolFormik.setFieldValue('customfields', [{ customFieldName: '', condition: '', customFieldValue: '', type: '' }]);
        }
    }, []);

    return (
        <Dialog open={open} fullWidth maxWidth="md" scroll="paper" className="AddNewPool">
            <form onSubmit={addTalentPoolFormik.handleSubmit}>
                <Box pl={1} pr={1} m={2} >
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <span className='addHeader'>
                            Create New Pool
                        </span>
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
                                    size='small'
                                    onClick={saveForm}
                                >{add ? "Create" : "Update"} Pool</Button>

                            </Grid>
                        </div>
                    </Grid>
                </Box>
                <Divider />
                <Box style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                    <Box pt={1} pr={2} pb={1} pl={2} bgcolor={"#f3f5f7"}  >

                        <Box className="apply-card-wrapper" mt={2}>
                            <Typography className='addHeader' mb={2}>Basic Information</Typography>
                            <Grid size={12} >
                                <TextField
                                    fullWidth
                                    name="talentPoolName"
                                    label={
                                        <span>
                                            TalentPool Name <span style={{ color: 'red' }}>*</span>
                                        </span>
                                    }
                                    size='small'
                                    value={addTalentPoolFormik.values.talentPoolName}
                                    onChange={addTalentPoolFormik.handleChange}
                                    error={addTalentPoolFormik.touched.talentPoolName && Boolean(addTalentPoolFormik.errors.talentPoolName)}
                                    helperText={addTalentPoolFormik.touched.talentPoolName && addTalentPoolFormik.errors.talentPoolName}
                                />
                            </Grid>
                            <Grid size={12}  >
                                <FormControlLabel
                                    control={<Checkbox checked={addTalentPoolFormik.values.private}
                                        onChange={addTalentPoolFormik.handleChange} />}
                                    label="Private"
                                    labelPlacement="end"
                                    id="private"
                                    name="private"
                                    sx={{ ml: 0 }}
                                />
                            </Grid>

                            <Grid size={12} >
                                <TextField
                                    fullWidth
                                    id="notes"
                                    name="notes"
                                    label="Notes"
                                    size="small"
                                    variant="outlined"
                                    type="text"
                                    multiline
                                    rows={2}
                                    value={addTalentPoolFormik.values.notes}
                                    onChange={addTalentPoolFormik.handleChange}
                                />
                            </Grid>

                        </Box>
                    </Box>

                    <Box pl={2} pr={2} bgcolor={"#f3f5f7"} >
                        <Box className="apply-card-wrapper">
                            <Typography className='addHeader' mb={2} pl={1}>Candidate Selection</Typography>
                            <Grid container spacing={2} pl={1}>
                                <Grid size={6}>

                                    <RadioGroup
                                        row
                                        aria-labelledby="candidate"
                                        name="candidate"
                                        value={addTalentPoolFormik.values.candidate}
                                        onChange={addTalentPoolFormik.handleChange}
                                    >
                                        <FormControlLabel value="manual" control={<Radio />} label="Manual" />
                                        <FormControlLabel value="dynamic" control={<Radio />} label="Dynamic" />
                                    </RadioGroup>

                                </Grid>

                            </Grid>
                            {addTalentPoolFormik.values?.candidate === 'dynamic' && (
                                <>
                                    <Box mt={2}>
                                        <Box className="apply-card-wrapper">
                                            <Typography variant='subtitle1' sx={{ fontWeight: '600' }} mb={1}>Selection Criteria</Typography>
                                            <Grid container spacing={2}  >

                                                <Grid size={8}> <RadioGroup
                                                    row
                                                    aria-labelledby="candidate-selection"
                                                    name="criteria"
                                                    value={addTalentPoolFormik.values.criteria}
                                                    onChange={addTalentPoolFormik.handleChange}
                                                >

                                                    <FormControlLabel
                                                        value="aiJob"
                                                        control={<Radio />}
                                                        label="AI Job Match"
                                                    />

                                                    <FormControlLabel
                                                        value="jobSkills"
                                                        control={<Radio />}
                                                        label="Job Title and Skills"
                                                    />

                                                </RadioGroup>
                                                </Grid>
                                            </Grid>
                                            {addTalentPoolFormik.values.criteria === 'aiJob' && (
                                                <Grid container justifyContent="space-between" spacing={2} pt={1}>
                                                    <Grid size={4}  >
                                                        <MUIAutoComplete
                                                            id={`aiJob.aiJobId`}
                                                            handleChange={fetchJobDetails}
                                                            valuePassed={(addTalentPoolFormik.values?.aiJob?.aiJobId) ? { label: addTalentPoolFormik.values.aiJob.aiJobName, id: Number(addTalentPoolFormik.values.aiJob.aiJobId) } : {}}
                                                            isMultiple={false}
                                                            textToShow=""
                                                            width="100%"
                                                            type='jobTitle'
                                                            // placeholder="Select Job*"
                                                            placeholder={
                                                                <Fragment>Select Job<span style={{ color: "red" }}>*</span></Fragment>
                                                            }
                                                        />
                                                    </Grid>
                                                    <Grid size={4}  >
                                                        <TextField
                                                            fullWidth
                                                            label={
                                                                <Fragment>Condition<span style={{ color: "red" }}>*</span></Fragment>
                                                            }
                                                            variant="outlined"
                                                            size="small"
                                                            select
                                                            id="aiJob.aiCondition"
                                                            name="aiJob.aiCondition"
                                                            value={addTalentPoolFormik.values.aiJob.aiCondition || ''}
                                                            onChange={addTalentPoolFormik.handleChange}
                                                        >
                                                            <MenuItem value="=">Is Equal to</MenuItem>
                                                            <MenuItem value="!=">Is Not Equal to</MenuItem>
                                                            <MenuItem value=">">Is Greater Than</MenuItem>
                                                            <MenuItem value="<">Is Less Than</MenuItem>
                                                            <MenuItem value=">=">Is Equal to and Greater Than</MenuItem>
                                                            <MenuItem value="<=">Is Equal to and Less Than</MenuItem>
                                                        </TextField>
                                                    </Grid>
                                                    <Grid size={4}  >
                                                        <TextField
                                                            fullWidth
                                                            // label="AI Match Score"
                                                            label={<Fragment>AI Match Score<span style={{ color: "red" }}>*</span></Fragment>}
                                                            variant="outlined"
                                                            size="small"
                                                            name="aiJob.aiScore"
                                                            id="aiJob.aiScore"
                                                            value={addTalentPoolFormik.values.aiJob.aiScore}
                                                            onChange={addTalentPoolFormik.handleChange}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            )}
                                            {addTalentPoolFormik.values.criteria === 'jobSkills' && (
                                                <Grid container justifyContent="space-between" spacing={2} pt={1}>
                                                    <Grid size={6} >
                                                        <TextField
                                                            fullWidth
                                                            // label="Candidate Job Title"
                                                            label={
                                                                <Fragment>Candidate Job Title<span style={{ color: "red" }}>*</span></Fragment>
                                                            }
                                                            variant="outlined"
                                                            size="small"
                                                            name="jobSkills.candidateJobTitle"
                                                            value={addTalentPoolFormik.values.jobSkills.candidateJobTitle}
                                                            onChange={addTalentPoolFormik.handleChange}
                                                        />
                                                    </Grid>
                                                    <Grid size={6}  >
                                                        <FormControl fullWidth size='small'>
                                                            <Autocomplete
                                                                multiple
                                                                id="jobSkills.candidateJobSkills"
                                                                options={[]}
                                                                freeSolo
                                                                size="small"
                                                                renderTags={(value, getTagProps) =>
                                                                    value.map((option, index) => (
                                                                        <Chip variant="outlined" label={option} size="small" {...getTagProps({ index })} />
                                                                    ))
                                                                }
                                                                renderInput={(params) => (
                                                                    <TextField
                                                                        {...params}
                                                                        variant="outlined"
                                                                        // label="Skills"
                                                                        placeholder="Enter Skills"
                                                                        label={
                                                                            <Fragment>Skills<span style={{ color: "red" }}>*</span></Fragment>
                                                                        }
                                                                        size='small'
                                                                    />
                                                                )}
                                                                sx={{ "& .MuiAutocomplete-input": { p: "3px 14px !important" } }}
                                                                onChange={(event: any, values: any) => {
                                                                    const skillsString = values.join(',');
                                                                    addTalentPoolFormik.setFieldValue('jobSkills.candidateJobSkills', skillsString);
                                                                }}
                                                                value={addTalentPoolFormik.values.jobSkills.candidateJobSkills ? addTalentPoolFormik.values.jobSkills.candidateJobSkills.split(',') : []}
                                                            />
                                                        </FormControl>
                                                    </Grid>
                                                </Grid>
                                            )}
                                        </Box>
                                        <Box className="apply-card-wrapper">
                                            {/* Status ID has to be passed */}
                                            <Typography variant='subtitle1' sx={{ fontWeight: '600' }} mb={1}>Status</Typography>
                                            <Grid container spacing={1} alignItems="center">
                                                <Grid size={4} >
                                                    <TextField
                                                        className={`mt-2`}
                                                        fullWidth
                                                        variant="outlined"
                                                        size="small"
                                                        label="Candidate Status"
                                                        select
                                                        name={`status.candidateStatus`}
                                                        value={addTalentPoolFormik.values.status.candidateStatus || ''}
                                                        onChange={(e) => {
                                                            addTalentPoolFormik.setFieldValue("status.candidateStatus", e.target.value);
                                                        }}
                                                    >
                                                        {candidateStatusList.map((status: CandidateStatus) => (
                                                            <MenuItem key={status.candidateStatusId} value={status.candidateStatusId}>
                                                                {status.candidateStatusName}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                </Grid>
                                                <Grid size={4} >
                                                    <TextField
                                                        className={`mt-2`}
                                                        fullWidth
                                                        variant="outlined"
                                                        size="small"
                                                        select
                                                        label="Hiring Status"
                                                        name={`status.hiringStatus`}
                                                        value={addTalentPoolFormik.values.status.hiringStatus || ''}
                                                        onChange={(e) => {
                                                            addTalentPoolFormik.setFieldValue("status.hiringStatus", e.target.value);
                                                        }}
                                                    >
                                                        {hiringStatusList.map((status: HiringStatus) => (
                                                            <MenuItem key={status.candStatusId} value={status.candStatusId}>
                                                                {status.label}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                </Grid>
                                                {/* <Grid size={4} sm={3}>
                                                    <FormControl fullWidth>
                                                        <TextField
                                                            fullWidth
                                                            label="Availability Job Status"
                                                            id="status.availabilityStatus"
                                                            name="status.availabilityStatus"
                                                            className={`mt-2`}
                                                            size="small"
                                                            select
                                                            value={addTalentPoolFormik.values.status.availabilityStatus || ''}
                                                            onChange={addTalentPoolFormik.handleChange}
                                                        >
                                                            <MenuItem value="0"></MenuItem>
                                                            {
                                                                [...masterJobStatus.list].map((val) => {
                                                                    return <MenuItem value={val.id} key={val.id}>{val.label}</MenuItem>
                                                                })

                                                            }

                                                        </TextField>
                                                    </FormControl>
                                                </Grid> */}
                                                <Grid size={4}  >
                                                    <TextField
                                                        className={`mt-2`}
                                                        fullWidth
                                                        variant="outlined"
                                                        size="small"
                                                        select
                                                        label="Community Member Status"
                                                        name={`status.communityStatus`}
                                                        value={addTalentPoolFormik.values.status.communityStatus || ''}
                                                        onChange={(e) => {
                                                            addTalentPoolFormik.setFieldValue("status.communityStatus", e.target.value);
                                                        }}
                                                    >
                                                        {["Joined", "Pending", "Not Invited"].map((each: string, index: number) => (
                                                            <MenuItem key={index} value={each}>{each}</MenuItem>
                                                        ))}
                                                    </TextField>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        <Box className="apply-card-wrapper">
                                            <Typography variant='subtitle1' sx={{ fontWeight: '600' }} mb={1}>Preferences</Typography>
                                            <Grid container spacing={1}>
                                                <Grid size={4}   >
                                                    <FormControl fullWidth>
                                                        <MUIAutoComplete
                                                            id="currentEmpStatusOptionId"
                                                            handleChange={(id: any, name: string) => {
                                                                addTalentPoolFormik.setFieldValue('preference.currentEmpStatus', id); // Store the label (name) only
                                                            }}
                                                            valuePassed={
                                                                Array.isArray((addTalentPoolFormik.values.preference.currentEmpStatus)) ?
                                                                    { label: addTalentPoolFormik.values.preference.currentEmpStatus.join(), id: addTalentPoolFormik.values.preference.currentEmpStatus.join() }
                                                                    :
                                                                    (addTalentPoolFormik.values.preference.currentEmpStatus) ?
                                                                        { label: addTalentPoolFormik.values.preference.currentEmpStatus, id: addTalentPoolFormik.values.preference.currentEmpStatus }
                                                                        :
                                                                        {}
                                                            } // Pass only the label (name)
                                                            isMultiple={true}
                                                            type='PreferencesEmpStatus'
                                                            placeholder="Current Employment Status"
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid size={4}  >
                                                    <FormControl fullWidth>
                                                        <MUIAutoComplete
                                                            id="EmpAvailabilityStatusId"
                                                            handleChange={(id: any, name: string) => {
                                                                addTalentPoolFormik.setFieldValue('preference.empAvailabilityStatus', id);
                                                            }}
                                                            valuePassed={
                                                                Array.isArray((addTalentPoolFormik.values.preference.empAvailabilityStatus)) ?
                                                                    { label: addTalentPoolFormik.values.preference.empAvailabilityStatus.join(), id: addTalentPoolFormik.values.preference.empAvailabilityStatus.join() }
                                                                    :
                                                                    (addTalentPoolFormik.values.preference.empAvailabilityStatus) ?
                                                                        { label: addTalentPoolFormik.values.preference.empAvailabilityStatus, id: addTalentPoolFormik.values.preference.empAvailabilityStatus }
                                                                        :
                                                                        {}
                                                            }
                                                            isMultiple={true}
                                                            type='PreferencesAvailabilityStatus'
                                                            placeholder="Availability Status"
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid size={4}  >
                                                    <MUIAutoComplete
                                                        id="EmpJobPrefId"
                                                        handleChange={(id: any, name: string) => {
                                                            addTalentPoolFormik.setFieldValue('preference.empJobPref', id);
                                                        }}
                                                        valuePassed={
                                                            Array.isArray((addTalentPoolFormik.values.preference.empJobPref)) ?
                                                                { label: addTalentPoolFormik.values.preference.empJobPref.join(), id: addTalentPoolFormik.values.preference.empJobPref.join() }
                                                                :
                                                                (addTalentPoolFormik.values.preference.empJobPref) ?
                                                                    { label: addTalentPoolFormik.values.preference.empJobPref, id: addTalentPoolFormik.values.preference.empJobPref }
                                                                    :
                                                                    {}
                                                        }
                                                        isMultiple={true}
                                                        type='PreferencesEmpJob'
                                                        placeholder="Employment Preference"
                                                    />
                                                </Grid>
                                                <Grid size={4}   >
                                                    <MUIAutoComplete
                                                        id="EmpLocPrefId"
                                                        handleChange={(id: any, name: string) => {
                                                            addTalentPoolFormik.setFieldValue('preference.empLocPref', id);
                                                        }}
                                                        valuePassed={
                                                            Array.isArray((addTalentPoolFormik.values.preference.empLocPref)) ?
                                                                { label: addTalentPoolFormik.values.preference.empLocPref.join(), id: addTalentPoolFormik.values.preference.empLocPref.join() }
                                                                :
                                                                (addTalentPoolFormik.values.preference.empLocPref) ?
                                                                    { label: addTalentPoolFormik.values.preference.empLocPref, id: addTalentPoolFormik.values.preference.empLocPref }
                                                                    :
                                                                    {}
                                                        }
                                                        isMultiple={true}
                                                        type='PreferencesEmpLoc'
                                                        placeholder="Flexibility Preference"
                                                    />
                                                </Grid>
                                                <Grid size={4} >
                                                    <MUIAutoComplete
                                                        id="EmpWorkHoursPrefId"
                                                        handleChange={(id: any, name: string) => {
                                                            addTalentPoolFormik.setFieldValue('preference.empWorkHoursPref', id);
                                                        }}
                                                        valuePassed={
                                                            Array.isArray((addTalentPoolFormik.values?.preference?.empWorkHoursPref)) ?
                                                                { label: addTalentPoolFormik.values.preference?.empWorkHoursPref.join(), id: addTalentPoolFormik.values.preference?.empWorkHoursPref.join() }
                                                                :
                                                                (addTalentPoolFormik.values.preference.empWorkHoursPref) ?
                                                                    { label: addTalentPoolFormik.values.preference?.empWorkHoursPref, id: addTalentPoolFormik.values.preference?.empWorkHoursPref }
                                                                    :
                                                                    {}
                                                        }
                                                        isMultiple={true}
                                                        type='Preferencesworkinghours'
                                                        placeholder="Preferred working hours"
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        <Box className="apply-card-wrapper">
                                            <Typography variant='subtitle1' sx={{ fontWeight: '600' }} mb={1}>Location</Typography>
                                            <Grid container spacing={2}>

                                                <Grid size={8}>
                                                    <RadioGroup
                                                        row
                                                        aria-labelledby="candidate-location"
                                                        name="locationCriteria"
                                                        value={addTalentPoolFormik.values.locationCriteria}
                                                        onChange={(event) => {
                                                            addTalentPoolFormik.handleChange;
                                                            const selectedValue = event.target.value;
                                                            addTalentPoolFormik.setFieldValue("locationCriteria", selectedValue);

                                                            if (selectedValue === "region") {
                                                                addTalentPoolFormik.setFieldValue("location.zipcode", "");
                                                                addTalentPoolFormik.setFieldValue("location.radius", "");
                                                            } else if (selectedValue === "zipcodeRadius") {
                                                                addTalentPoolFormik.setFieldValue("location.city", "");
                                                                addTalentPoolFormik.setFieldValue("location.state", "");
                                                            }
                                                        }}
                                                    >
                                                        <FormControlLabel
                                                            value="region"
                                                            control={<Radio />}
                                                            label="Select Region"
                                                        />
                                                        <FormControlLabel
                                                            value="zipcodeRadius"
                                                            control={<Radio />}
                                                            label="Select ZIP code Radius"
                                                        />
                                                    </RadioGroup>
                                                </Grid>
                                            </Grid>
                                            {addTalentPoolFormik.values.locationCriteria === 'region' && (
                                                <Grid container spacing={1}>
                                                    <Grid size={6}>
                                                        <TextField fullWidth
                                                            id="city"
                                                            name="location.city"
                                                            size="small"
                                                            variant="outlined"
                                                            type="text"
                                                            label="City"
                                                            value={addTalentPoolFormik.values.location.city}
                                                            onChange={addTalentPoolFormik.handleChange}
                                                        // error={
                                                        //     addTalentPoolFormik.touched.location?.city &&
                                                        //     Boolean(addTalentPoolFormik.errors.location?.city)
                                                        // }
                                                        // helperText={
                                                        //     addTalentPoolFormik.touched.location?.city &&
                                                        //     addTalentPoolFormik.errors.location?.city
                                                        // }
                                                        />
                                                    </Grid>
                                                    <Grid size={6} >
                                                        <FormControl fullWidth size='small'>
                                                            <Autocomplete
                                                                id='state'
                                                                options={masterStatesList.map((option) => option.label)}
                                                                value={addTalentPoolFormik.values.location.state || ''}
                                                                freeSolo
                                                                renderTags={(value: readonly string[], getTagProps) =>
                                                                    value.map((option: string, index: number) => (
                                                                        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                                                    ))
                                                                }
                                                                renderInput={(params) => (
                                                                    <TextField
                                                                        {...params}
                                                                        variant="outlined"
                                                                        label="State"
                                                                        size='small'
                                                                    // error={
                                                                    //     addTalentPoolFormik.touched.location?.state &&
                                                                    //     Boolean(addTalentPoolFormik.errors.location?.state)
                                                                    // }
                                                                    // helperText={
                                                                    //     addTalentPoolFormik.touched.location?.state &&
                                                                    //     addTalentPoolFormik.errors.location?.state
                                                                    // }
                                                                    />
                                                                )}
                                                                sx={{ "& .MuiAutocomplete-input": { p: "3px 14px !important" } }}
                                                                // PaperComponent={CustomPaper}
                                                                onChange={(event, value) => {
                                                                    addTalentPoolFormik.setFieldValue('location.state', value || '');
                                                                }}
                                                                size='small'
                                                            />
                                                        </FormControl>
                                                    </Grid>
                                                </Grid>
                                            )}
                                            {addTalentPoolFormik.values.locationCriteria === 'zipcodeRadius' && (
                                                <Grid container spacing={1}>
                                                    <Grid size={6}>
                                                        <TextField fullWidth
                                                            id="zipcode"
                                                            name="location.zipcode"
                                                            size="small"
                                                            variant="outlined"
                                                            type="text"
                                                            label="Zipcode"
                                                            value={addTalentPoolFormik.values.location.zipcode}
                                                            onChange={addTalentPoolFormik.handleChange}
                                                        // error={
                                                        //     addTalentPoolFormik.touched.location?.zipcode &&
                                                        //     Boolean(addTalentPoolFormik.errors.location?.zipcode)
                                                        // }
                                                        // helperText={
                                                        //     addTalentPoolFormik.touched.location?.zipcode &&
                                                        //     addTalentPoolFormik.errors.location?.zipcode
                                                        // }
                                                        />
                                                    </Grid>
                                                    <Grid size={6}>
                                                        <TextField
                                                            fullWidth
                                                            id="radius"
                                                            name="location.radius"
                                                            size="small"
                                                            select
                                                            value={addTalentPoolFormik.values.location.radius}
                                                            onChange={addTalentPoolFormik.handleChange}
                                                            label="Mile Radius"
                                                        // error={
                                                        //     addTalentPoolFormik.touched.location?.radius &&
                                                        //     Boolean(addTalentPoolFormik.errors.location?.radius)
                                                        // }
                                                        // helperText={
                                                        //     addTalentPoolFormik.touched.location?.radius &&
                                                        //     addTalentPoolFormik.errors.location?.radius
                                                        // }
                                                        >
                                                            <MenuItem value="5">5 miles</MenuItem>
                                                            <MenuItem value="10">10 miles</MenuItem>
                                                            <MenuItem value="20">20 miles</MenuItem>
                                                            <MenuItem value="30">30 miles</MenuItem>
                                                            <MenuItem value="40">40 miles</MenuItem>
                                                            <MenuItem value="50">50 miles</MenuItem>
                                                            <MenuItem value="75">75 miles</MenuItem>
                                                            <MenuItem value="100">100 miles</MenuItem>
                                                        </TextField>
                                                    </Grid>
                                                </Grid>
                                            )}
                                        </Box>
                                        <Box className="apply-card-wrapper">
                                            <Grid container spacing={1}>
                                                <Grid size={6}>
                                                    <Typography variant='subtitle1' sx={{ fontWeight: '600' }} mb={1}>Tags</Typography>
                                                    <FormControl fullWidth>
                                                        <MUIAutoComplete
                                                            id='tagId'
                                                            handleChange={(id: any, name: string) => {
                                                                addTalentPoolFormik.setFieldValue('tagNames', name);
                                                                addTalentPoolFormik.setFieldValue('tags', id); // Assuming 'tags' is a string, adjust if it's an array
                                                            }}
                                                            valuePassed={
                                                                addTalentPoolFormik.values?.tags ? { label: addTalentPoolFormik.values?.tagNames, id: addTalentPoolFormik.values?.tags } : {} // Bind the current value of 'tags' from Formik
                                                            }
                                                            isMultiple={true}
                                                            textToShow="Select Tag"
                                                            width="100%"
                                                            type='tag'
                                                            placeholder="Search Tag"
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid size={6}>
                                                    <Typography variant='subtitle1' sx={{ fontWeight: '600' }} mb={1}>Campaigns</Typography>
                                                    <MUIAutoComplete
                                                        id='campaignsIds'
                                                        handleChange={(id: any, name: string) => {
                                                            addTalentPoolFormik.setFieldValue('campaignNames', name);
                                                            addTalentPoolFormik.setFieldValue('campaigns', id);
                                                        }}
                                                        valuePassed={
                                                            addTalentPoolFormik.values?.campaigns ? { label: addTalentPoolFormik.values?.campaignNames, id: addTalentPoolFormik.values?.campaigns } : {} // Bind current Formik value for 'campaigns'
                                                        }
                                                        isMultiple={true}
                                                        textToShow="Select Campaign"
                                                        type='sequence'
                                                        placeholder="Select Campaign"
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        <Box className="apply-card-wrapper d-none">

                                            <Typography variant='subtitle1' sx={{ fontWeight: '600' }} mb={1}>Custom fields</Typography>

                                            {addTalentPoolFormik.values.customfields.map((field, index) => (
                                                <Grid container spacing={1} key={index} mt={1}>
                                                    <Grid size={4}>
                                                        <FormControl fullWidth size='small'>
                                                            <InputLabel id={`customFieldName-label-${index}`}>Custom Field</InputLabel>

                                                            <Select
                                                                labelId={`customFieldName-label-${index}`}
                                                                name={`customfields[${index}].customFieldName`}
                                                                label="Custom Field"
                                                                value={addTalentPoolFormik.values.customfields[index]?.customFieldName || ''}
                                                                onChange={(e) => handleFieldChange(index, 'customFieldName', e.target.value)}
                                                            >
                                                                {customFieldsData.filter(
                                                                    (option) =>
                                                                        option.labelName !== "Rank Your skill" &&
                                                                        !addTalentPoolFormik.values.customfields.some(
                                                                            (field, fieldIndex) => field.customFieldName === option.labelName && fieldIndex !== index
                                                                        )
                                                                )
                                                                    .map((option, i) => (
                                                                        <MenuItem key={i} value={option.labelName}>
                                                                            {option.labelName}
                                                                        </MenuItem>
                                                                    ))}
                                                            </Select>

                                                        </FormControl>
                                                    </Grid>
                                                    <Grid size={3}>
                                                        <TextField
                                                            fullWidth
                                                            select
                                                            label="Condition"
                                                            name={`customfields[${index}].condition`}
                                                            value={addTalentPoolFormik.values.customfields[index].condition || ''}
                                                            onChange={(e) => handleFieldChange(index, 'condition', e.target.value)}
                                                            size="small"
                                                        >

                                                            {(customfieldCondition[index] || [])?.map((option, i) => (
                                                                <MenuItem key={i} value={option.value}>
                                                                    {option.name}
                                                                </MenuItem>
                                                            ))}
                                                        </TextField>

                                                    </Grid>
                                                    <Grid size={3}>
                                                        {addTalentPoolFormik.values.customfields[index].type === 'dropdown' ? (
                                                            <FormControl size="small" fullWidth>
                                                                <Select
                                                                    fullWidth
                                                                    value={addTalentPoolFormik.values.customfields[index].customFieldValue || ''}
                                                                    onChange={(e) => addTalentPoolFormik.setFieldValue(
                                                                        `customfields[${index}].customFieldValue`,
                                                                        e.target.value
                                                                    )}
                                                                >
                                                                    {(dropdownValues[index] || [])?.map((option: string, i: number) => (
                                                                        <MenuItem key={i} value={option}>
                                                                            {option}
                                                                        </MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        ) : addTalentPoolFormik.values.customfields[index].type === 'radio' ? (
                                                            <FormControl size="small" fullWidth>
                                                                <Select
                                                                    fullWidth
                                                                    value={addTalentPoolFormik.values.customfields[index].customFieldValue || ''}
                                                                    onChange={(e) => addTalentPoolFormik.setFieldValue(
                                                                        `customfields[${index}].customFieldValue`,
                                                                        e.target.value
                                                                    )}
                                                                >
                                                                    {Array.isArray(dropdownValues[index]) && dropdownValues[index].map((option: string, i: number) => (
                                                                        <MenuItem key={i} value={option}>
                                                                            {option}
                                                                        </MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        ) :
                                                            addTalentPoolFormik.values.customfields[index].type === 'text' &&
                                                                addTalentPoolFormik.values.customfields[index].customFieldName === "Rank Your skill" ? (
                                                                <FormControl size="small" fullWidth>
                                                                    <InputLabel id={`ranking-label-${index}`}>Select Rank</InputLabel>
                                                                    <Select
                                                                        labelId={`ranking-label-${index}`}
                                                                        value={addTalentPoolFormik.values.customfields[index].customFieldValue || ''}
                                                                        onChange={(e) =>
                                                                            addTalentPoolFormik.setFieldValue(
                                                                                `customfields[${index}].customFieldValue`,
                                                                                e.target.value
                                                                            )
                                                                        }
                                                                    >

                                                                        {(customFieldsData
                                                                            ?.find((field) => field.displayName === "Ranking")?.ranks || []
                                                                        ).map((rank) => (
                                                                            <MenuItem key={rank.id} value={rank.rank}>
                                                                                {rank.rank}
                                                                            </MenuItem>
                                                                        ))}

                                                                    </Select>
                                                                </FormControl>)
                                                                : (
                                                                    <TextField
                                                                        fullWidth
                                                                        name={`customfields[${index}].customFieldValue`}
                                                                        label="Value"
                                                                        value={addTalentPoolFormik.values.customfields[index].customFieldValue}
                                                                        onChange={(e) =>
                                                                            addTalentPoolFormik.setFieldValue(
                                                                                `customfields[${index}].customFieldValue`,
                                                                                e.target.value
                                                                            )
                                                                        }
                                                                        size="small"
                                                                    />
                                                                )}
                                                    </Grid>
                                                    <Grid size={2}>
                                                        <Stack direction="row">
                                                            <IconButton color="primary"
                                                                onClick={handleAddField}
                                                            >
                                                                <AddIcon fontSize='small' />
                                                            </IconButton>

                                                            {addTalentPoolFormik.values.customfields.length > 1 && (
                                                                <IconButton
                                                                    color="error"
                                                                    onClick={() => handleRemoveField(index)}
                                                                >
                                                                    <RemoveCircleIcon fontSize='small' />
                                                                </IconButton>
                                                            )}
                                                        </Stack>
                                                    </Grid>
                                                </Grid>
                                            ))}
                                        </Box>
                                        <Box className="apply-card-wrapper">
                                            <Typography variant='subtitle1' sx={{ fontWeight: '600' }} mb={1}>Candidate Activity</Typography>
                                            <Grid container spacing={1}>
                                                <Grid size={6}  ><FormControl fullWidth size="small">
                                                    <InputLabel id="activity-label">Select Activity</InputLabel>
                                                    <Select
                                                        labelId="activity-label"
                                                        name="candidateActivities.candidateActivityType"
                                                        value={addTalentPoolFormik.values.candidateActivities.candidateActivityType || ''}
                                                        onChange={addTalentPoolFormik.handleChange}
                                                        size='small'
                                                        label="Candidate Activity"
                                                    //   error={Boolean(addTalentPoolFormik.errors.candidateActivities?.candidateActivityType)}
                                                    >
                                                        <MenuItem value="applied-to-job">Has applied to Job</MenuItem>
                                                        <MenuItem value="updated-profile">Has updated Profile</MenuItem>
                                                        <MenuItem value="replied-email">Has replied to email</MenuItem>
                                                        <MenuItem value="replied-sms">Has replied to SMS</MenuItem>
                                                        <MenuItem value="availability-changed">Availability Status changed</MenuItem>
                                                        <MenuItem value="visited-portal">Visited Career Portal</MenuItem>
                                                        <MenuItem value="visited-profile">Visited Profile</MenuItem>
                                                    </Select>
                                                </FormControl></Grid>
                                                <Grid size={6}  >
                                                    <FormControl fullWidth size="small">
                                                        <InputLabel id="time-period-label">Time Period</InputLabel>
                                                        <Select
                                                            labelId="time-period-label"
                                                            name="candidateActivities.candidatePeriodValues"
                                                            value={addTalentPoolFormik.values.candidateActivities.candidatePeriodValues || ''}
                                                            onChange={addTalentPoolFormik.handleChange}
                                                            label="Time Period"
                                                            size="small"
                                                        // error={Boolean(addTalentPoolFormik.errors.candidateActivities?.candidatePeriodValues)}
                                                        >
                                                            <MenuItem value="30">In last 30 Days</MenuItem>
                                                            <MenuItem value="60">In last 60 Days</MenuItem>
                                                            <MenuItem value="90">In last 90 Days</MenuItem>
                                                            <MenuItem value="120">In last 120 Days</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Box>
                                </>
                            )}

                        </Box>
                    </Box>
                </Box>
            </form>

        </Dialog >
    )
}

export default AddNewPool