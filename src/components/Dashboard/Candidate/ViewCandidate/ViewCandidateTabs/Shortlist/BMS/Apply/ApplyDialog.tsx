// import { 
//    import  AppBar from '@mui/material/AppBar';
import { FC } from 'react';
import { Fragment, SyntheticEvent, useEffect, useState } from '../../../../../../../../shared/modules/React';
import { useParams } from 'react-router-dom';
import { trackPromise } from '../../../../../../../../shared/modules/PromiseTrackter';
import Autocomplete from '@mui/material/Autocomplete';
import { Box } from '../../../../../../../../shared/modules/MaterialImports/Box';
import { Checkbox } from '../../../../../../../../shared/modules/MaterialImports/FormElements';
import { Chip } from '../../../../../../../../shared/modules/MaterialImports/Chip';
//    import  Dialog from '@mui/material/Dialog';
//    import  DialogContent from '@mui/material/DialogContent';
//    import  DialogTitle from '@mui/material/DialogTitle';
//    import  Divider from '@mui/material/Divider';
//    import  Drawer from '@mui/material/Drawer';
import { FormControlLabel } from '../../../../../../../../shared/modules/MaterialImports/FormInputs';

//    import  IconButton from '@mui/material/IconButton';
import { MenuItem } from '../../../../../../../../shared/modules/MaterialImports/Menu';
import { Stack } from '../../../../../../../../shared/modules/MaterialImports/Stack';
//    import  TextareaAutosize from '@mui/material/TextareaAutosize';
import { TextField, Grid, Button, FormHelperText, } from '../../../../../../../../shared/modules/commonImports';
import { TextFieldProps, TextFieldVariants } from '@mui/material/TextField';
import { Typography } from '../../../../../../../../shared/modules/MaterialImports/Typography';
import { DatePicker, LocalizationProvider, AdapterLuxon } from '../../../../../../../../shared/modules/MaterialImports/DatePicker';
import { useFormik, Yup } from '../../../../../../../../shared/modules/Formik';
import { DateTime } from '../../../../../../../../shared/modules/Luxon';

// import ErrorMessage from '../../../../../../../shared/Error/ErrorMessage';
import { showToaster } from '../../../../../../../shared/SnackBar/SnackBar';
import ApiService from '../../../../../../../../shared/api/api';
import { userLocalData } from '../../../../../../../../shared/services/userData';
import { CountriesList } from '../../../../../../../../shared/data/Countrieslist';

import { NumericFormat } from "react-number-format";

// import { CheckBox } from '@mui/icons-material';

import "./ApplyDialog.scss";

interface IApplyDialogProps {
    open: boolean,
    handleClose: () => void,
    saveData: (json: any) => void;
    profile: any,
    handleBack: () => void,
    jobId?: string;
    candidateId: string;
}

const FieldDataTypes = {
    DATE: "date",
    SINGLE_SELECT_LIST: "single-select-list",
    MULTI_SELECT_LIST: "multi-select-list",
    STRING: "string",
    MONEY: "money",
    CHECKBOX: "checkbox",
    INTEGER: "integer",
    ATTACHMENT: "attachment",
}

const FileUploader: FC<{ textFieldProps: any, value: any, handleChange: any }> = ({ textFieldProps, value, handleChange }) => {
    const [fileValue, setFileValue] = useState("");
    return (
        <TextField
            type='file'
            {...textFieldProps}
            value={fileValue || ""}
            onChange={(e: any) => {
                handleChange(e);
                setFileValue(e.target.value)
            }}
            InputLabelProps={{ shrink: true }}
        />
    )

}

const ApplyDialog: FC<IApplyDialogProps> = ({ open, handleClose, profile, saveData, handleBack, candidateId }) => {
    const [formFieldsData, setFormFieldsData] = useState<any>({});
    const [initialValues, setInitialValues] = useState<any>({});
    const [validationSchema, setValidationSchema] = useState<any>({});
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const { jobId }: any = useParams();
    const [manualDyanmicValidations, setManualDynamicValidations] = useState<any>({});


    let applyFormFormik = useFormik({
        initialValues,
        validationSchema: Yup.object().shape({ ...validationSchema }),
        enableReinitialize: true,
        onSubmit: (values, { setSubmitting }) => {
            // alert("triggered")
            setIsFormSubmitted(true);
            setSubmitting(true);
        },
        validateOnMount: true,
        validateOnChange: true,
        validateOnBlur: true,
    });


    useEffect(() => {
        getClientResponseJson();
    }, []);

    const getClientResponseJson = () => {
        trackPromise(
            ApiService.getCall("beeline", `candidate/${userLocalData.getvalue("clientId")}/${jobId}`).then((res: any) => {
                if (res.data?.Success && res.data?.data?.json && res.data?.data?.requestId) {
                    let parsedJson = JSON.parse(res.data.data.json);
                    let applicationSubmissionDetails = parsedJson["client-defined-fields"]["application-submission"] || [];
                    handleFormFieldsData(res.data.data.requestId, applicationSubmissionDetails)
                } else {
                    showToaster(res.data?.Message ? res.data?.Message : "Request ID not found", 'error');
                }
            })
        )
    }

    const getFieldRequiredAndValidation = (fieldType: any, data: any) => {
        let fieldTypeYup = fieldType;
        if (data["is-required"]) {
            fieldTypeYup = fieldTypeYup.required(`${data.label} is required`);

            if (!!data?.validations?.length) {
                let minValue = data.validations.find((each: any) => each.code === "min-value")?.value || undefined;
                let maxValue = data.validations.find((each: any) => each.code === "max-value")?.value || undefined;
                let minLength = data.validations.find((each: any) => each.code === "min-length")?.value || undefined;
                let maxLength = data.validations.find((each: any) => each.code === "max-length")?.value || undefined;
                let regexValidation = data.validations.find((each: any) => each.code === "regex")?.value || undefined;

                if (minValue) {
                    fieldTypeYup = fieldTypeYup.min(minValue, `${data.label} has min value of ${minValue}`);
                }
                if (maxValue) {
                    fieldTypeYup = fieldTypeYup.max(maxValue, `${data.label} has max value of ${maxValue}`);
                }
                if (minLength && maxLength) {
                    fieldTypeYup = fieldTypeYup.test("len", `${data.label} must has max length of ${maxLength} characters`, (val: any) => Boolean(val && val.toString().length >= minLength && val.toString().length <= maxLength))
                }

                if (regexValidation) {
                    fieldTypeYup = fieldTypeYup.matches(regexValidation, `${data.label} is required`);
                }
            }
            return fieldTypeYup;
        } else {
            return fieldTypeYup;
        }
    }

    const getSchemaBasedOnFieldType = (data: any) => {
        switch (data["data-type"]) {
            case FieldDataTypes.ATTACHMENT: return getFieldRequiredAndValidation(Yup.mixed(), data);
            case FieldDataTypes.CHECKBOX: return getFieldRequiredAndValidation(Yup.boolean(), data);
            case FieldDataTypes.DATE: return getFieldRequiredAndValidation(Yup.string(), data);
            case FieldDataTypes.INTEGER: return getFieldRequiredAndValidation(Yup.number(), data);
            case FieldDataTypes.MONEY: return getFieldRequiredAndValidation(Yup.number(), data);
            case FieldDataTypes.MULTI_SELECT_LIST: return getFieldRequiredAndValidation(Yup.array(), data);
            case FieldDataTypes.SINGLE_SELECT_LIST: return getFieldRequiredAndValidation(Yup.string(), data);
            default: return getFieldRequiredAndValidation(Yup.string(), data);
        }
    }

    const handleFormFieldsData = (requestId: string, appSubmissionForm: any[]) => {

        let applicationSubmissionValues = appSubmissionForm.reduce((acc: any, current: any) => {
            acc[current.name] = [FieldDataTypes.INTEGER, FieldDataTypes.MONEY].includes(current["data-type"]) ? 0 :
                current["data-type"] === FieldDataTypes.MULTI_SELECT_LIST ? [] :
                    current["data-type"] === FieldDataTypes.CHECKBOX ? false : ""
            return acc;
        }, {});


        let applicationSubmissionSchema = appSubmissionForm.reduce((acc: any, current: any) => {
            acc[current.name] = getSchemaBasedOnFieldType(current);
            return acc;
        }, {});

        let tempInitialValues = profile ? {
            "protected": {
                "date-of-birth": { "month": 1, "day": 1 },
                "email": (profile?.email) ? profile?.email : "",
                "home-address": {
                    "address1": (profile?.address.address1) ? profile?.address.address1 : "",
                    "address2": (profile?.address.address2) ? profile?.address.address2 : "",
                    "country-code": (profile?.address['country-code']) ? profile?.address['country-code'] : "",
                    "postal-code": (profile?.address['postal-code']) ? profile?.address['postal-code'] : "",
                    "city": (profile?.address.city) ? profile?.address.city : "",
                    "street1": (profile?.address.address1) ? profile?.address.address1 : "",
                    "street2": (profile?.address.address2) ? profile?.address.address2 : "",
                    "state": (profile?.address.state) ? profile?.address.state : "",
                },
                "last-4-ssn": "",
                "name": { "first": (profile?.['first-name']) ? profile?.['first-name'] : "", "last": (profile?.['last-name']) ? profile?.['last-name'] : "", },
                "phone-number": (profile?.phone) ? (profile?.phone).replace(/[- )(]/g, '') : "",
                "national-id": "",
                "preferred-rate": 0
            },
            "preferred-rate-outer": {
                "amount": 0,
                "currency": "",
                "unit": "",
            },
            "talent-pool": "curately-bms",
            "selected-payment-model": (profile?.['payment-preference']) ? profile?.['payment-preference'] : "",
            "supplier-comments": "",
            "former-consultant": false,
            "former-employee": false,
            "profile-id": candidateId,
            "request-id": requestId,
            "resume": {
                "content-type": profile.resume["content-type"] ? profile.resume["content-type"] : "",
                "data": profile.resume?.data ? profile.resume?.data : "",
                "name": profile.resume?.name ? profile.resume?.name : ""
            },
            "resume-id": "",
            "applicationsubmission": applicationSubmissionValues
        } : {
            "protected": {
                "date-of-birth": { "month": 1, "day": 1 },
                "email": "",
                "home-address": {
                    "address1": "",
                    "address2": "",
                    "country-code": "",
                    "postal-code": "",
                    "city": "",
                    "street1": "",
                    "street2": "",
                    "state": "",
                },
                "last-4-ssn": "",
                "name": { "last": "", "first": "", },
                "phone-number": "",
                "national-id": "",
                "preferred-rate": 0
            },
            "preferred-rate-outer": {
                "amount": 0,
                "currency": "",
                "unit": "",
            },
            "talent-pool": "curately-bms",
            "selected-payment-model": "",
            "supplier-comments": "",
            "former-consultant": false,
            "former-employee": false,
            "profile-id": candidateId,
            "request-id": requestId,
            "resume": {
                "content-type": profile.resume["content-type"] ? profile.resume["content-type"] : "",
                "data": profile.resume?.data ? profile.resume?.data : "",
                "name": profile.resume?.name ? profile.resume?.name : ""
            },
            "resume-id": "",
            "applicationsubmission": applicationSubmissionValues
        }

        let tempValidationSchema = {
            "protected": Yup.object().shape({
                "date-of-birth": Yup.object().shape({
                    "month": Yup.number().required("Month is required").positive("Month must be greater than 0"),
                    "day": Yup.number().required("Day is required").positive("Day must be greater than 0")
                }),
                "email": Yup.string().required("Email is required").email("Invalid email format"),
                "home-address": Yup.object().shape({
                    "address1": Yup.string().required("Address 1 is required"),
                    "address2": Yup.string(),
                    "country-code": Yup.string().required("Country code is required"),
                    "postal-code": Yup.string().required("Postal code is required"),
                    "city": Yup.string().required("City is required"),
                    "street1": Yup.string(),
                    "street2": Yup.string(),
                    "state": Yup.string().required("State is required").max(2, "State contains max 2 characters"),
                }),
                "last-4-ssn": Yup.string().required("Last 4 SSN is required").matches("^[0-9]{4}$" as any, `Last 4 ssn must matches 4 digit`).max(4, 'Last 4 SSN should be 4 digit.'),
                "name": Yup.object().shape({ "last": Yup.string().required("Last name is required"), "first": Yup.string().required("First name is required"), }),
                "phone-number": Yup.number().required("Phone Number is required"),
                "national-id": Yup.string().required("National ID is required"),
                "preferred-rate": Yup.number().required("Protected Preferred Rate is required").positive("Preferred rate must be greater than 0"),
            }),
            "preferred-rate-outer": Yup.object().shape({
                "amount": Yup.number().required("Preferred Rate is required"),
                "currency": Yup.string().required("Preferred Rate is required"),
                "unit": Yup.string().required("Preferred Rate is required"),
            }),
            // ("len", `${data.label} must has max length of ${maxLength} characters`, (val: any) => Boolean(val && val.toString().length >= minLength && val.toString().length <= maxLength))
            "talent-pool": Yup.string(),
            "selected-payment-model": Yup.string().required("Selected payment model is required"),
            "supplier-comments": Yup.string(),
            "former-consultant": Yup.boolean(),
            "former-employee": Yup.boolean(),
            "profile-id": Yup.string(),
            "request-id": Yup.string(),
            "resume": Yup.object().shape({
                "content-type": Yup.string(),
                "data": Yup.string(),
                "name": Yup.string()
            }),
            "resume-id": Yup.string(),
            "applicationsubmission": Yup.object().shape({ ...applicationSubmissionSchema })
        }

        setValidationSchema(tempValidationSchema);
        setInitialValues({ ...tempInitialValues });
        setFormFieldsData([...appSubmissionForm]);
    }

    const handleDynamicFieldsOnChange = (e: any, data: any) => {
        applyFormFormik.handleChange(e);
        let manualValidations = manualDyanmicValidations;
        let { value } = e.target;
        if (!data["is-required"] && !!data?.validations?.length && ![null, undefined, 0, ""].includes(value)) {
            let minValue = data.validations.find((each: any) => each.code === "min-value")?.value || undefined;
            let maxValue = data.validations.find((each: any) => each.code === "max-value")?.value || undefined;
            let minLength = data.validations.find((each: any) => each.code === "min-length")?.value || undefined;
            let maxLength = data.validations.find((each: any) => each.code === "max-length")?.value || undefined;
            let regexValidation = data.validations.find((each: any) => each.code === "regex")?.value || undefined;

            let parsedValue = parseInt(value);
            let stringValue = value.toString();

            if (minValue) {
                if (`applicationsubmission.${data.name}` in manualValidations) {
                    if (parsedValue >= minValue) delete manualValidations[`applicationsubmission.${data.name}`];
                    else {
                        manualValidations[`applicationsubmission.${data.name}`] = `${data.label} has min value of ${minValue}`;
                        return;
                    }
                }
            }

            if (maxValue) {
                if (parsedValue <= maxValue) delete manualValidations[`applicationsubmission.${data.name}`];
                else {
                    manualValidations[`applicationsubmission.${data.name}`] = `${data.label} has max value of ${minValue}`;
                    return;
                }
            }

            if (minLength && maxLength) {
                if ((stringValue.length >= minLength) && (stringValue.length <= maxLength)) delete manualValidations[`applicationsubmission.${data.name}`];
                else {
                    manualValidations[`applicationsubmission.${data.name}`] = `${data.label} has max length of ${maxLength} characters`;
                    return;
                }
            }

            if (regexValidation) {
                if (!!stringValue.match(regexValidation)) delete manualValidations[`applicationsubmission.${data.name}`];
                else {
                    manualValidations[`applicationsubmission.${data.name}`] = `${data.label} must matches ${regexValidation}`;
                    return;
                }
            }

        } else delete manualValidations[`applicationsubmission.${data.name}`];
        setManualDynamicValidations({ ...manualDyanmicValidations });
    }

    const renderField = (data: any) => {
        let inputProps: { variant?: TextFieldVariants } & Omit<TextFieldProps, "variant"> = {
            size: 'small',
            fullWidth: true,
            name: `applicationsubmission.${data.name}`,
            id: `applicationsubmission.${data.name}`,
            variant: "outlined",
            label: <Fragment>
                {data.label}
                {data["is-required"] && <span style={{ color: 'red' }}>*</span>}
            </Fragment>,
            error: (isFormSubmitted ? (![null, "", undefined].includes(data["is-required"] ?
                getErrorMessage(`applicationsubmission.${data.name}`) :
                (manualDyanmicValidations[`applicationsubmission.${data.name}`] || ""))
            ) : false)
        }
        switch (data["data-type"]) {
            case FieldDataTypes.ATTACHMENT:
                return <FileUploader textFieldProps={{ ...inputProps }} value={applyFormFormik.values["applicationsubmission"][data.name]} handleChange={(e: any) => {
                    applyFormFormik.setFieldValue(`applicationsubmission.${data.name}`, e.target.files[0])
                }} />

            case FieldDataTypes.CHECKBOX:
                return <FormControlLabel
                    label={<Fragment>
                        {data.label}
                        {data["is-required"] && <span style={{ color: 'red' }}>*</span>}
                    </Fragment>}
                    control={<Checkbox
                        size='small'
                        checked={applyFormFormik.values["applicationsubmission"][data.name] || false}
                    />}
                    name={`applicationsubmission.${data.name}`}
                    id={`applicationsubmission.${data.name}`}
                    value={applyFormFormik.values["applicationsubmission"][data.name] || false}
                    onChange={(e: any) => handleDynamicFieldsOnChange(e, data)}
                />;

            case FieldDataTypes.DATE: return (
                <Box>
                    <LocalizationProvider dateAdapter={AdapterLuxon} >
                        <DatePicker
                            name={`applicationsubmission.${data.name}`}
                            label={
                                <Fragment>
                                    {data.label}
                                    {data["is-required"] && <span style={{ color: 'red' }}>*</span>}
                                </Fragment>
                            }
                            slotProps={{ textField: { size: 'small', name: `applicationsubmission.${data.name}`, id: `applicationsubmission.${data.name}`, error: (![null, "", undefined].includes(getErrorMessage(`applicationsubmission.${data.name}`))) } }}
                            sx={{ width: '100%' }}
                            value={applyFormFormik.values["applicationsubmission"][data.name] ? DateTime.fromFormat(applyFormFormik.values["applicationsubmission"][data.name], 'MM/dd/yyyy') : null}
                            onChange={(date: any) => {
                                applyFormFormik.setFieldValue(`applicationsubmission.${data.name}`, (date) ? date?.toFormat('MM/dd/yyyy') : null)
                            }}
                        />
                    </LocalizationProvider>
                </Box>
            )

            case FieldDataTypes.INTEGER:
                return <TextField
                    type='number'
                    {...inputProps}
                    value={applyFormFormik.values["applicationsubmission"][data.name] || null}
                    onChange={(e: any) => handleDynamicFieldsOnChange(e, data)}
                />;

            case FieldDataTypes.MONEY:
                return <TextField
                    type='number'
                    {...inputProps}
                    value={applyFormFormik.values["applicationsubmission"][data.name] || ""}
                    onChange={(e: any) => handleDynamicFieldsOnChange(e, data)}
                />;

            case FieldDataTypes.MULTI_SELECT_LIST:
                return <Autocomplete
                    multiple
                    size='small'
                    fullWidth
                    id={`applicationsubmission.${data.name}`}
                    renderInput={(params: any) => <TextField {...params} name={`applicationsubmission.${data.name}`}
                        label={<Fragment>
                            {data.label}
                            {data["is-required"] && <span style={{ color: 'red' }}>*</span>}
                        </Fragment>}
                        error={(![null, "", undefined].includes(getErrorMessage(`applicationsubmission.${data.name}`)))}
                    />}
                    renderTags={(value: readonly string[], getTagProps) =>
                        value.map((option: string, index: number) => (
                            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                        ))
                    }
                    options={data["field-items"].map((each: any) => each.name)}
                    sx={{ "& .MuiAutocomplete-input": { p: "3px 14px !important" } }}
                    value={applyFormFormik.values["applicationsubmission"][data.name] || []}
                    onChange={(_: SyntheticEvent, newValue: any[]) => applyFormFormik.setFieldValue(`applicationsubmission.${data.name}`, newValue)}
                />;

            case FieldDataTypes.SINGLE_SELECT_LIST:
                return <TextField
                    {...inputProps}
                    select
                    value={applyFormFormik.values["applicationsubmission"][data.name] || ""}
                    onChange={(e: any) => handleDynamicFieldsOnChange(e, data)}
                >
                    {data["field-items"].map((each: any, index: number) => (
                        <MenuItem key={index} value={each.code}>{each.name}</MenuItem>
                    ))}
                </TextField>;

            default:
                return <TextField
                    type='text'
                    {...inputProps}
                    value={applyFormFormik?.values["applicationsubmission"][data.name] || ""}
                    onChange={(e: any) => handleDynamicFieldsOnChange(e, data)}
                />;
        }
    }

    const getErrorMessagesArray = (errorObj: any) => {
        let errorMessages: any = [];
        const values = Object.values(errorObj);
        values.forEach((each) => {
            if (typeof each === "object") {
                errorMessages.push(...getErrorMessagesArray(each))
            } else errorMessages.push(each);
        })
        return errorMessages;
    }

    const validateStaticFields = () => {
        let errorMessages = [...getErrorMessagesArray(applyFormFormik.errors), ...Object.values(manualDyanmicValidations)];
        if (!!errorMessages?.length) {
            showToaster(errorMessages[0], "error");
        }
        return !!errorMessages?.length ? false : true;
    }

    const convertToBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => { resolve(reader.result); };
            reader.onerror = (error: any) => { reject(""); };
            reader.readAsDataURL(file);
        });
    };

    const handleApplySubmit = async () => {
        let { values: { ...formikValues } } = applyFormFormik;
        setIsFormSubmitted(true);
        let staticFields = validateStaticFields();
        const isFormFieldsValid = formFieldsData.every((each: any) => {
            if (each["is-required"]) {
                if (["", null, undefined, false, 0].includes(formikValues["applicationsubmission"][each.name])) {
                    return false;
                } else return true;
            } else return true;
        });

        let payLoad = [];
        if (isFormFieldsValid && staticFields) {
            for (let i = 0; i < formFieldsData.length; i++) {
                let each = formFieldsData[i];
                //Filtering non contained values
                if (![null, undefined, "", 0, {}].includes(formikValues["applicationsubmission"][each.name])) {
                    if (each["data-type"] === FieldDataTypes.ATTACHMENT) {
                        let base64Url: any = "";
                        if (formikValues["applicationsubmission"][each.name]) {
                            base64Url = await convertToBase64(formikValues["applicationsubmission"][each.name])
                        }
                        payLoad.push({
                            name: each.name,
                            value: {
                                "base64-data": base64Url,
                                "file-name": formikValues["applicationsubmission"][each.name]?.name || "",
                                "content-type": formikValues["applicationsubmission"][each.name]?.type || ""
                            }
                        });
                    } else payLoad.push({ name: each.name, value: formikValues["applicationsubmission"][each.name] });
                }
            }
        }

        if (applyFormFormik.isValid && Object.keys(manualDyanmicValidations)?.length == 0) {

            delete formikValues["applicationsubmission"];
            delete formikValues["preferred-rate-outer"];
            let filteredApiData = {
                ...formikValues,
                "client-defined-fields": {
                    "application-submission": payLoad
                },
                "preferred-rate": { ...applyFormFormik.values["preferred-rate-outer"], amount: Number(applyFormFormik.values["preferred-rate-outer"]['amount']) }
            }

            trackPromise(
                ApiService.postWithData('beeline', `candidate`, filteredApiData)
                    .then((response: any) => {
                        console.log({ response }, "response");
                        if (response.data.Success) {
                            // if (response.data.message.includes('created') || response.data.message.includes('updated')) {
                            showToaster("Successfully applied  ", 'success');
                            saveData({ ...filteredApiData });
                            //  handleDialogClose();
                        } else {
                            showToaster((response.data.Message) ? response.data.Message : "An error occured while submitting data.", 'error');
                        }

                    }).catch(error => {
                        console.log("Apply : " + error.message);
                        showToaster(error.message, 'error');
                    })
            )
            // saveData({ ...filteredApiData });
        }
    }

    const getErrorMessage = (key: string, isValidating?: boolean) => {
        if (key && (isFormSubmitted || isValidating)) {
            let message = key.split('.').reduce((acc: any, current: any) => {
                return acc[current] ? acc[current] : ""
            }, applyFormFormik.errors) || "";
            return message;
        } else return "";
    }

    return (
        // </Drawer >
        (<Fragment>
            {!!Object.keys(applyFormFormik.values)?.length &&
                <Stack px={3} pt={4} spacing={3}>
                    <form onSubmit={applyFormFormik.handleSubmit}>
                        <Box className="apply-card-wrapper">
                            <Typography mb={2} variant='h6'>Protected Fields</Typography>
                            <Grid container spacing={2}>
                                <Grid size={6}>
                                    <TextField name={"protected.name.first"}
                                        label={<Fragment>First Name{<span style={{ color: 'red' }}>*</span>}</Fragment>}
                                        variant='outlined' size='small' fullWidth
                                        value={applyFormFormik.values.protected.name.first} onChange={applyFormFormik.handleChange}
                                        error={![null, "", undefined].includes(getErrorMessage("protected.name.first"))}
                                    />
                                    <FormHelperText error className='ml-2 mt-1'>
                                        {isFormSubmitted && getErrorMessage("protected.name.first")}
                                    </FormHelperText>
                                </Grid>
                                <Grid size={6}>
                                    <TextField name={"protected.name.last"}
                                        label={<Fragment>Last Name{<span style={{ color: 'red' }}>*</span>}</Fragment>}
                                        variant='outlined' size='small' fullWidth
                                        onChange={applyFormFormik.handleChange} value={applyFormFormik.values.protected.name.last}
                                        error={![null, "", undefined].includes(getErrorMessage("protected.name.last"))}
                                    />
                                    <FormHelperText error className='ml-2 mt-1'>
                                        {isFormSubmitted && getErrorMessage("protected.name.last")}
                                    </FormHelperText>
                                </Grid>
                                <Grid size={6}>

                                    <TextField name={"protected.phone-number"}
                                        label={<Fragment>Phone Number{<span style={{ color: 'red' }}>*</span>}</Fragment>}
                                        variant='outlined' size='small' fullWidth type='number'
                                        onChange={applyFormFormik.handleChange} value={applyFormFormik.values.protected["phone-number"]}
                                        error={![null, "", undefined].includes(getErrorMessage("protected.phone-number"))}
                                    />
                                    <FormHelperText error className='ml-2 mt-1'>
                                        {isFormSubmitted && getErrorMessage("protected.phone-number")}
                                    </FormHelperText>
                                </Grid>
                                <Grid size={6}>
                                    <TextField name={"protected.email"}
                                        label={<Fragment>Email{<span style={{ color: 'red' }}>*</span>}</Fragment>}
                                        variant='outlined' size='small' fullWidth type='email'
                                        onChange={applyFormFormik.handleChange} value={applyFormFormik.values.protected.email}
                                        error={![null, "", undefined].includes(getErrorMessage("protected.email"))}
                                    />
                                    <FormHelperText error className='ml-2 mt-1'>
                                        {isFormSubmitted && getErrorMessage("protected.email")}
                                    </FormHelperText>
                                </Grid>

                                <Grid size={4}>
                                    <TextField name={"protected.last-4-ssn"}
                                        label={<Fragment>Last 4 ssn{<span style={{ color: 'red' }}>*</span>}</Fragment>}
                                        variant='outlined' size='small' fullWidth type='text' inputProps={{ maxLength: 4 }}
                                        onChange={applyFormFormik.handleChange} value={applyFormFormik.values.protected["last-4-ssn"]}
                                        error={![null, "", undefined].includes(getErrorMessage("protected.last-4-ssn"))}
                                    />
                                    <FormHelperText error className='ml-2 mt-1'>
                                        {isFormSubmitted && getErrorMessage("protected.last-4-ssn")}
                                    </FormHelperText>
                                </Grid>
                                <Grid size={4}>
                                    <TextField name={"protected.date-of-birth.month"}
                                        label={<Fragment>{"DOB(month)"}{<span style={{ color: 'red' }}>*</span>}</Fragment>}
                                        variant='outlined' size='small' fullWidth type='number'
                                        onChange={applyFormFormik.handleChange} value={applyFormFormik.values.protected["date-of-birth"].month} select
                                        error={![null, "", undefined].includes(getErrorMessage("protected.date-of-birth.month"))}
                                    >
                                        {new Array(12).fill("month").map((each: string, index: number) => (
                                            <MenuItem value={index + 1} key={each + index}>{index + 1}</MenuItem>
                                        ))}
                                    </TextField>
                                    <FormHelperText error className='ml-2 mt-1'>
                                        {isFormSubmitted && getErrorMessage("protected.date-of-birth.month")}
                                    </FormHelperText>
                                </Grid>

                                <Grid size={4}>
                                    <TextField name={"protected.date-of-birth.day"}
                                        label={<Fragment>{"DOB(day)"}{<span style={{ color: 'red' }}>*</span>}</Fragment>}
                                        variant='outlined' size='small' fullWidth type='number'
                                        onChange={applyFormFormik.handleChange} value={applyFormFormik.values.protected["date-of-birth"].day} select
                                        error={![null, "", undefined].includes(getErrorMessage("protected.date-of-birth.day"))}
                                    >
                                        {new Array(31).fill("day").map((each: string, index: number) => (
                                            <MenuItem value={index + 1} key={each + index}>{index + 1}</MenuItem>
                                        ))}
                                    </TextField>
                                    <FormHelperText error className='ml-2 mt-1'>
                                        {isFormSubmitted && getErrorMessage("protected.date-of-birth.day")}
                                    </FormHelperText>
                                </Grid>

                                <Grid size={4}>
                                    <TextField name={"protected.national-id"} variant='outlined' size='small' fullWidth type='number'
                                        onChange={applyFormFormik.handleChange} value={applyFormFormik.values.protected["national-id"]}
                                        error={![null, "", undefined].includes(getErrorMessage("protected.national-id"))}
                                        label={<Fragment>National Id{<span style={{ color: 'red' }}>*</span>}</Fragment>}
                                    />
                                    <FormHelperText error className='ml-2 mt-1'>
                                        {isFormSubmitted && getErrorMessage("protected.national-id")}
                                    </FormHelperText>
                                </Grid>

                                <Grid size={4}>

                                    <NumericFormat
                                        name={"protected.preferred-rate"}
                                        variant='outlined'
                                        size='small'
                                        fullWidth
                                        label={<Fragment>Preferred Rate{<span style={{ color: 'red' }}>*</span>}</Fragment>}
                                        // onChange={applyFormFormik.handleChange}
                                        onValueChange={(val) => {
                                            const protectedValues = { ...applyFormFormik.values.protected };
                                            applyFormFormik.setFieldValue('protected', { ...protectedValues, 'preferred-rate': val.floatValue as number });
                                        }}
                                        value={applyFormFormik.values.protected["preferred-rate"]}
                                        error={![null, "", undefined].includes(getErrorMessage("protected.preferred-rate"))}

                                        decimalScale={2}
                                        customInput={TextField}
                                    />
                                    <FormHelperText error className='ml-2 mt-1'>
                                        {isFormSubmitted && getErrorMessage("protected.preferred-rate")}
                                    </FormHelperText>
                                </Grid>

                            </Grid>
                        </Box>

                        <Box className="apply-card-wrapper">
                            <Typography variant='h6' mb={2}>Address</Typography>
                            <Grid container spacing={2}>
                                <Grid size={4}>
                                    <TextField name={"protected.home-address.address1"} variant='outlined' size='small' fullWidth
                                        onChange={(e: any) => {
                                            applyFormFormik.setFieldValue("protected.home-address", {
                                                ...applyFormFormik.values.protected["home-address"],
                                                address1: e.target.value,
                                                street1: e.target.value,
                                            })

                                        }} value={applyFormFormik.values.protected["home-address"]["address1"]}
                                        label={<Fragment>Address1{<span style={{ color: 'red' }}>*</span>}</Fragment>}
                                        error={![null, "", undefined].includes(getErrorMessage("protected.home-address.address1"))}
                                    />
                                    <FormHelperText error className='ml-2 mt-1'>
                                        {isFormSubmitted && getErrorMessage("protected.home-address.address1")}
                                    </FormHelperText>
                                </Grid>
                                <Grid size={4}>
                                    <TextField name={"protected.home-address.address2"} label="Address2" variant='outlined' size='small' fullWidth
                                        onChange={(e: any) => {
                                            applyFormFormik.setFieldValue("protected.home-address", {
                                                ...applyFormFormik.values.protected["home-address"],
                                                address2: e.target.value,
                                                street2: e.target.value,
                                            })
                                        }} value={applyFormFormik.values.protected["home-address"]["address2"]}
                                    />
                                </Grid>
                                <Grid size={4}>
                                    <TextField name={"protected.home-address.country-code"} variant='outlined' size='small' fullWidth
                                        onChange={applyFormFormik.handleChange} value={applyFormFormik.values.protected["home-address"]["country-code"]} select
                                        error={![null, "", undefined].includes(getErrorMessage("protected.home-address.country-code"))}
                                        label={<Fragment>Country Code{<span style={{ color: 'red' }}>*</span>}</Fragment>}
                                    >
                                        {CountriesList.map((item: any) => <MenuItem value={item.code}>{item.name}</MenuItem>)}
                                    </TextField>
                                    <FormHelperText error className='ml-2 mt-1'>
                                        {isFormSubmitted && getErrorMessage("protected.home-address.country-code")}
                                    </FormHelperText>
                                </Grid>
                                <Grid size={4}>
                                    <TextField name={"protected.home-address.postal-code"} variant='outlined' size='small' fullWidth
                                        onChange={applyFormFormik.handleChange} value={applyFormFormik.values.protected["home-address"]["postal-code"]}
                                        error={![null, "", undefined].includes(getErrorMessage("protected.home-address.postal-code"))}
                                        label={<Fragment>Postal Code{<span style={{ color: 'red' }}>*</span>}</Fragment>}
                                    />
                                    <FormHelperText error className='ml-2 mt-1'>
                                        {isFormSubmitted && getErrorMessage("protected.home-address.postal-code")}
                                    </FormHelperText>
                                </Grid>
                                <Grid size={4}>
                                    <TextField name={"protected.home-address.state"} variant='outlined' size='small' fullWidth
                                        onChange={applyFormFormik.handleChange} value={applyFormFormik.values.protected["home-address"]["state"]}
                                        error={![null, "", undefined].includes(getErrorMessage("protected.home-address.state"))}
                                        label={<Fragment>State{<span style={{ color: 'red' }}>*</span>}</Fragment>}
                                    />
                                    <FormHelperText error className='ml-2 mt-1'>
                                        {isFormSubmitted && getErrorMessage("protected.home-address.state")}
                                    </FormHelperText>
                                </Grid>
                                <Grid size={4}>
                                    <TextField name={"protected.home-address.city"} variant='outlined' size='small' fullWidth
                                        onChange={applyFormFormik.handleChange} value={applyFormFormik.values.protected["home-address"]["city"]}
                                        error={![null, "", undefined].includes(getErrorMessage("protected.home-address.city"))}
                                        label={<Fragment>City{<span style={{ color: 'red' }}>*</span>}</Fragment>}
                                    />
                                    <FormHelperText error className='ml-2 mt-1'>
                                        {isFormSubmitted && getErrorMessage("protected.home-address.city")}
                                    </FormHelperText>
                                </Grid>
                            </Grid>

                        </Box>

                        <Box className="apply-card-wrapper">
                            <Grid container spacing={2}>
                                <Grid size={3}>
                                    <TextField name={"preferred-rate-outer"} variant='outlined' size='small' fullWidth
                                        id={"preferred-rate-outer"}
                                        select placeholder='Select preferred rate'
                                        value={Object.values(applyFormFormik.values["preferred-rate-outer"]).join("") === "" ? "" : Object.values(applyFormFormik.values["preferred-rate-outer"]).join("-")}
                                        error={
                                            !!Object.values(getErrorMessage("preferred-rate-outer"))?.length ? true : false
                                        }
                                        label={<Fragment>Preferred Rate{<span style={{ color: 'red' }}>*</span>}</Fragment>}
                                        onChange={(e: any) => {
                                            let values = e.target.value.split("-")
                                            applyFormFormik.setFieldValue("preferred-rate-outer", {
                                                amount: values[0] || "", currency: values[1] || "", unit: values[2] || ""
                                            })
                                        }}
                                    >
                                        <MenuItem value=""> -- Select Preferred Rate - </MenuItem>
                                        {(profile && profile.rates.length === 0) ? [] : profile.rates.map((rate: any, index: number) => (
                                            <MenuItem key={index} value={rate.amount + "-" + rate.currency + "-" + rate.unit}>{rate.amount + " - " + rate.currency + " - " + rate.unit}</MenuItem>
                                        ))
                                        }
                                        {/* {["100000-USD-Hourly", "500000-EUR-Dialy", "1000000-CAD-Monthly"].map((each: any, index: number) => (
                                            <MenuItem key={index} value={each}>{each}</MenuItem>
                                        ))} */}
                                    </TextField>
                                    <FormHelperText error className='ml-2 mt-1'>
                                        {/* {isFormSubmitted && getErrorMessage("preferred-rate-outer")} */}
                                        {isFormSubmitted ? (!!Object.values(getErrorMessage("preferred-rate-outer"))?.length ? "Preferred rate is required" : "") : ""}
                                    </FormHelperText>
                                </Grid>


                                <Grid size={3}>
                                    <TextField name={"selected-payment-model"} variant='outlined' size='small' fullWidth
                                        id={"selected-payment-model"}
                                        select placeholder='Selected Payment Model'
                                        value={applyFormFormik.values["selected-payment-model"]}
                                        onChange={applyFormFormik.handleChange}
                                        label={<Fragment>Selected Payment Model{<span style={{ color: 'red' }}>*</span>}</Fragment>}
                                        error={![null, "", undefined].includes(getErrorMessage("selected-payment-model"))}
                                    >
                                        {["Freelancer", "IndependentContractor", "Contract", "Contract to Hire", "Payrollee", "LimitedCompany", "PAYE", "T4"].map((each: string, index: number) => (
                                            <MenuItem key={index} value={each}>{each}</MenuItem>
                                        ))}
                                    </TextField>
                                    <FormHelperText error className='ml-2 mt-1'>
                                        {isFormSubmitted && getErrorMessage("selected-payment-model")}
                                    </FormHelperText>
                                </Grid>

                                <Grid size={3}>
                                    <FormControlLabel
                                        label={"Former consultant"}
                                        control={<Checkbox
                                            size='small'
                                            checked={applyFormFormik.values["former-consultant"] || false}
                                        />}
                                        name={"former-consultant"}
                                        id={`former-consultant`}
                                        value={applyFormFormik.values["former-consultant"] || false}
                                        onChange={applyFormFormik.handleChange}
                                    />
                                </Grid>

                                <Grid size={3}>
                                    <FormControlLabel
                                        label={"Former employee"}
                                        control={<Checkbox
                                            size='small'
                                            checked={applyFormFormik.values["former-employee"] || false}
                                        />}
                                        name={"former-employee"}
                                        id={`former-employee`}
                                        value={applyFormFormik.values["former-employee"] || false}
                                        onChange={applyFormFormik.handleChange}
                                    />
                                </Grid>

                                <Grid size={12}>
                                    <TextField variant='outlined' size='small' fullWidth label={"Supplier Comments"} minRows={3}
                                        name={"supplier-comments"} id={"supplier-comments"} multiline placeholder='Enter supplier comments'
                                        onChange={applyFormFormik.handleChange} value={applyFormFormik.values["supplier-comments"]}
                                    />
                                </Grid>
                            </Grid>
                        </Box>


                        <Box className="apply-card-wrapper">
                            <Typography mb={2} variant='h6'>Application Submission Fields</Typography>
                            {!!formFieldsData?.length && <Grid container spacing={1.5} >
                                {formFieldsData.map((each: any, index: any) => (
                                    <Grid key={index + each.name} size={4}>
                                        {renderField(each)}
                                        <FormHelperText error className='ml-2 mt-1'>
                                            {isFormSubmitted && (each["is-required"] ?
                                                getErrorMessage(`applicationsubmission.${each.name}`) :
                                                (manualDyanmicValidations[`applicationsubmission.${each.name}`] || "")
                                            )}
                                        </FormHelperText>
                                    </Grid>
                                ))}
                            </Grid>}

                        </Box>
                    </form>
                    <Stack direction={"row"} alignItems={"center"} spacing={1.5} justifyContent={"flex-end"} py={2} height={"100%"} >
                        <Button variant='outlined' color='primary' sx={{ textTransform: "none", height: "26px" }} onClick={handleBack}>Back</Button>
                        <Button variant='outlined' color='inherit' onClick={handleClose} sx={{ textTransform: "none", height: "26px" }}>Cancel</Button>
                        <Button variant="contained" onClick={handleApplySubmit} type='button'>Submit</Button>
                    </Stack>
                </Stack>}
        </Fragment >)
    );
}

export default ApplyDialog;
