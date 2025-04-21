
import { useContext, useMemo } from 'react';
import { React, useState, useEffect, useRef, Fragment } from "../../../../../../shared/modules/React";

import { Button, TextField, Grid, IconButton, InputAdornment } from '../../../../../../shared/modules/commonImports';
import { Rating } from '../../../../../../shared/modules/MaterialImports/Rating'
import { Typography } from '../../../../../../shared/modules/MaterialImports/Typography';
import { Stack } from '../../../../../../shared/modules/MaterialImports/Stack';
import { Box } from '../../../../../../shared/modules/MaterialImports/Box';
import { useFormik, Yup } from '../../../../../../shared/modules/Formik';
import { ToggleButtonGroup, ToggleButton } from '../../../../../../shared/modules/MaterialImports/ToggleButton';
import { ButtonGroup } from '../../../../../../shared/modules/MaterialImports/ButtonGroup';
import Modal from '@mui/material/Modal';
import LinearProgress from "@mui/material/LinearProgress";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarRateIcon from '@mui/icons-material/StarRate';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckIcon from '@mui/icons-material/Check';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DateComponent from "../forms/DateComponent";
import FileUploadComponent from "../forms/FileUploadComponent";
import AddressComponent from "../forms/AddressComponent";
import smartyStreetAddress from "../shared/utills/smartyStreetAddress";
import AutocompleteComponent from "../forms/AutocompleteComponent";
import RankingComponent from "../forms/RankingComponent";
import DoneIcon from '@mui/icons-material/Done';
import { isMobile, isMobileSafari } from 'react-device-detect';
import { Tweet } from 'react-twitter-widgets';
import '../forms/form.scss';
import ApiService from '../../../../../../shared/api/api';
import VerifyModal from "../shared/modal/VerfiyModal";
import VerifyCode from "../shared/modal/VerifyCode";
import { showToaster } from "../../../../../shared/SnackBar/SnackBar";
import ErrorMessage from "../../../../../shared/Error/ErrorMessage";
import { FormStore } from "../../../../../../App";
import './Preview.scss';
import useDebounce from '../../../../../../shared/services/CustomDebounce';

const PreviewComponent = ({ formNamePassed, isPreview, saveCandidateData, isShowOneByOne, formAnswers = {} }: { formId: string, formNamePassed: string, isPreview: boolean, saveCandidateData: any, isShowOneByOne: boolean, formAnswers?: any }) => {
    const [flag, setFlag] = useState(false);
    const [formData, setFormData] = useContext(FormStore);
    const [formName, setFormName] = useState("");
    const savedData = useRef<any[]>([]);
    const opinionScaleArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const [currentSelectedIndex, setCurrentSelectedIndex] = useState(0);
    const [selectedId, setSelectedId] = useState("");
    const [currPageElements, setCurrPageElements] = useState<any[]>([]);
    const [arrayList, setArrayList] = useState<any[]>([]);
    const [idVal, setIdVal] = useState<any>(null)
    const [displayView, setDisplayView] = useState(isMobile ? "mobile" : "desktop");
    const [refreshPage, setRefreshPage] = useState(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [counter, setCounter] = React.useState(5);
    const [pageData, setPageData] = useState<any[]>([]);
    const [progress, setProgress] = useState<any>(0);
    const [isForward, setIsForward] = useState(true);

    const [localFieldsState, setLocalFieldsState] = useState<any>(null);

    const HIDE_COMPONENTS = ["conditionallogic", "pagebreak"];

    const splitDataById = () => {
        let inc = 0;
        let finalAry: any[] = [[]];
        let finalData = formData.filter((item: any) => item.fieldType !== 'conditionallogic' && item.isShow);

        for (const item of finalData) {
            if (item.fieldType === 'pagebreak') {
                inc++; 
                finalAry[inc] = [];
            } else {
                finalAry[inc].push(item);
            }
        }

        return finalAry;
    };

    // It will run on first mount
    useEffect(() => {
        setFormName(formNamePassed);
    }, []);

    // keep all the fields to show on initial mount
    useEffect(() => {
        formData.forEach((form: any) => {
            form.isShow = true
        });
        setFormData([...formData]);
    }, []);

    // this effect will run on every time formData has changed
    useEffect(() => {
        if (!isShowOneByOne) {
            let finalArray = splitDataById();
            setArrayList(finalArray);
            if (finalArray?.length) {
                setCurrPageElements(finalArray[finalArray.length === 1 ? 0 : currentSelectedIndex]);
            }
        } else if (formData.length) {
            let data = formData.filter((form: any) => HIDE_COMPONENTS.indexOf(form.fieldType) === -1 && form.displayName !== 'Conditional Logic');
            setPageData(data);
            setCurrPageElements(data)
            setSelectedId((data[0].id) ? data[0].id : "")
        }
    }, [JSON.stringify(formData)]);

    const formBackBtn = () => {
        setCurrentSelectedIndex(currentSelectedIndex - 1);
        setIsSubmitted(false);
        setIsForward(false);
        let tempAct = currentSelectedIndex - 1;
        let data = formData.filter((form: any) => HIDE_COMPONENTS.indexOf(form.fieldType) === -1 && form.displayName !== 'Conditional Logic');
        let width = 100 / data.length;
        setProgress((prev: any) => prev - width);

        setPageData(data);
        console.log([data[tempAct]]);
        setSelectedId((data[tempAct].id) ? data[tempAct].id : "");
    }

    const getCustomDateValidation = (date1: any, date2: any, type: string, conditionVal: string) => {
        let isValidateDate = false;
        let years = Number(type.split(" ")[0]);
        let validYears = new Date().getFullYear();
        let validateMonth = new Date().getMonth()
        let actualYears = new Date(date1).getFullYear();
        let actualMonth = new Date(date1).getMonth()
        let yearsToCompare = Math.abs(validYears - actualYears)
        switch (conditionVal) {
            case "less than":
                if (years === yearsToCompare) {
                    if (actualMonth < validateMonth)
                        isValidateDate = true
                }
                else {
                    if (years < yearsToCompare) {
                        isValidateDate = true
                    }
                }

                break;
            case "greater than":
                if (years === yearsToCompare) {
                    if (actualMonth > validateMonth) {
                        isValidateDate = true
                    }
                }
                else {
                    if (years > yearsToCompare) {
                        isValidateDate = true
                    }
                }

                break;
            case "equal to":
                if (years === yearsToCompare) {
                    isValidateDate = true
                }

                break;
            case "less or equal":
                if (years <= yearsToCompare) {
                    isValidateDate = true
                }

                break;
            case "greater or equal":
                if (years >= yearsToCompare) {
                    isValidateDate = true
                }

                break;
        }

        return isValidateDate;

    }

    const validateDate = (data: any) => {
        let dateErrObj = { isValid: true, errorText: "" }
        let toCompareDate
        let dataObj = formData.filter((formVal: any) => formVal.id === data.id);
        let [conditions, otherFields] = dataObj[0].dateConditions?.dependencyObjs;
        let customDateRanges = ["15 years", "20 years"]
        if (conditions.value && otherFields.value) {
            switch (conditions.value[0]) {
                case "Less than(<)": {
                    let dateValue = formik.values[data.id]
                    let checkObj = formData.filter((dataVal: any) => dataVal.labelName === otherFields.value[0])
                    if (checkObj) {
                        toCompareDate = formik.values[checkObj[0]?.id];

                    }

                    if (customDateRanges.indexOf(otherFields.value[0]) === -1) {
                        dateErrObj.isValid = (new Date(dateValue) < new Date(toCompareDate)) ? true : false
                        dateErrObj.errorText = `${data.labelName} should be less than ${otherFields.value} `
                    }
                    else {
                        const customDateVal = getCustomDateValidation(dateValue, toCompareDate, otherFields.value[0], "less than");
                        dateErrObj.isValid = customDateVal;
                        dateErrObj.errorText = `${data.labelName} should be less than ${otherFields.value} `
                    }
                }
                    break;

                case "Greater than(>)": {
                    let dateValue = formik.values[data.id]
                    let checkObj = formData.filter((dataVal: any) => dataVal.labelName === otherFields.value[0])
                    if (checkObj) {
                        toCompareDate = formik.values[checkObj[0]?.id];
                    }
                    if (customDateRanges.indexOf(otherFields.value[0]) === -1) {
                        dateErrObj.isValid = (new Date(dateValue) < new Date(toCompareDate)) ? true : false
                        dateErrObj.errorText = `${data.labelName} should be greater than ${otherFields.value} `
                    }
                    else {
                        const customDateVal = getCustomDateValidation(dateValue, toCompareDate, otherFields.value[0], "greater than");
                        dateErrObj.isValid = customDateVal;
                        dateErrObj.errorText = `${data.labelName} should be greater than ${otherFields.value} `
                    }
                }
                    break;

                case "Equals(=)": {
                    let dateValue = formik.values[data.id]
                    let checkObj = formData.filter((dataVal: any) => dataVal.labelName === otherFields.value[0])
                    if (checkObj) {
                        toCompareDate = formik.values[checkObj[0]?.id];
                    }
                    if (customDateRanges.indexOf(otherFields.value[0]) === -1) {
                        dateErrObj.isValid = (new Date(dateValue) < new Date(toCompareDate)) ? true : false
                        dateErrObj.errorText = `${data.labelName} and ${otherFields.value} should be same`
                    }
                    else {
                        const customDateVal = getCustomDateValidation(dateValue, toCompareDate, otherFields.value[0], "equal to");
                        dateErrObj.isValid = customDateVal;
                        dateErrObj.errorText = `${data.labelName} should be equal to ${otherFields.value} `
                    }
                }
                    break;
                case "Greater than or equals(>=)": {
                    let dateValue = formik.values[data.id]
                    let checkObj = formData.filter((dataVal: any) => dataVal.labelName === otherFields.value[0])
                    if (checkObj) {
                        toCompareDate = formik.values[checkObj[0]?.id];
                    }

                    if (customDateRanges.indexOf(otherFields.value[0]) === -1) {
                        dateErrObj.isValid = (new Date(dateValue) < new Date(toCompareDate)) ? true : false
                        dateErrObj.errorText = `${data.labelName} should be greather than or equal to ${otherFields.value}`
                    }
                    else {
                        const customDateVal = getCustomDateValidation(dateValue, toCompareDate, otherFields.value[0], "greater or equal");
                        dateErrObj.isValid = customDateVal;
                        dateErrObj.errorText = `${data.labelName} should be greather than or equal to ${otherFields.value}`
                    }
                }
                    break;
                case "Less than or equals(<=)": {
                    let dateValue = formik.values[data.id]
                    let checkObj = formData.filter((dataVal: any) => dataVal.labelName === otherFields.value[0])
                    if (checkObj) {
                        toCompareDate = formik.values[checkObj[0]?.id];
                    }
                    if (customDateRanges.indexOf(otherFields.value[0]) === -1) {
                        dateErrObj.isValid = (new Date(dateValue) < new Date(toCompareDate)) ? true : false
                        dateErrObj.errorText = `${data.labelName} should be less than or equal to ${otherFields.value}`
                    }
                    else {
                        const customDateVal = getCustomDateValidation(dateValue, toCompareDate, otherFields.value[0], "less or equal");
                        dateErrObj.isValid = customDateVal;
                        dateErrObj.errorText = `${data.labelName} should be less than or equal to ${otherFields.value}`
                    }

                }
                    break;
            }
        }
        return dateErrObj
    }

    const checkPhoneNumber = async (value: any) => {
        let isValid;
        let phoneVal = value.split("-").join("") + "";
        let data = { "phones": value }
        try {
            const header: any = new Headers();
            header.append('Access-Control-Allow-Origin', '*');
            header.append("Content-Type", "multipart/form-data");
            let response = await ApiService.postWithHeaders(214, 'validatePhone', data, header);
            if (response.data?.data[phoneVal]?.status === "Invalid") {
                isValid = false
                return isValid;
            }
            else {
                isValid = true
                return isValid;
            }
        }
        catch (e) {

        }

        return isValid

    }

    const validationData = useMemo(() => {
        return formData?.reduce((acc: any, obj: any) => {
            if (obj) {
                if (obj.fieldType !== "conditionallogic") {
    
                    if (obj.isRequired) {
    
                        switch (obj.fieldType) {
                            case "phone":
                                if (obj.isValidate) {
                                    acc[obj.id] = Yup.string().required(obj.labelName + " is required.").min(12, 'Phone number should be min 10 characters').test({
                                        async test(value: any, ctx: any) {
                                            if (value?.length === 12) {
                                                const isValid = await checkPhoneNumber(value)
                                                if (!isValid) {
                                                    return ctx.createError({ message: "Please enter valid phone number" })
                                                }
                                                return true
                                            }
    
                                        }
                                    })
                                }
                                else {
                                    acc[obj.id] = Yup.string().required(obj.labelName + " is required.").min(12, 'Phone number should be min 10 characters')
                                }
                                break;
                            case "email":
                                acc[obj.id] = Yup.string().required(obj.labelName + " is required.").test({
                                    test(value: any, ctx: any) {
                                        if (value) {
                                            let isValid;
                                            if (value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                                                isValid = true
                                            }
                                            else {
                                                isValid = false
                                            }
                                            if (!isValid) {
                                                return ctx.createError({ message: "Please enter a valid email" })
                                            }
                                            return true
                                        }
                                        else {
                                            return true
                                        }
    
                                    }
                                })
                                break
                            case "date": {
                                let [conditions, otherFields] = obj.dateConditions?.dependencyObjs
    
                                if (conditions.value) {
                                    acc[obj.id] = Yup.date().test(
                                        {
                                            test(value: any, ctx: any) {
                                                const isValid = validateDate(obj).isValid
                                                if (!isValid) {
                                                    return ctx.createError({ message: validateDate(obj).errorText })
                                                }
                                                return true
    
                                            }
                                        }
    
                                    ).required(obj.labelName + " is required.")
                                }
                                else {
                                    acc[obj.id] = Yup.date().required(obj.labelName + " is required.")
                                }
                            }
                                break;
                            case "address":
    
                                if (!obj.enableAddressValidation) {
                                    acc[obj.id] = Yup.object().shape({
                                        full_address: Yup.string().required(),
                                        city: Yup.string().required(),
                                        state: Yup.string().required(),
                                    })
                                }
                                else {
                                    acc[obj.id] = Yup.object().test({
                                        async test(value: any, ctx: any) {
                                            if (value.full_address && value.city && value.state) {
                                                let errorPromise = await smartyStreetAddress(value);
                                                if (errorPromise?.isError) {
                                                    return ctx.createError({ message: errorPromise?.errorText })
                                                }
                                                return true
                                            }
                                        }
                                    }).shape({
                                        full_address: Yup.string().required(),
                                        city: Yup.string().required(),
                                        state: Yup.string().required(),
                                    })
                                }
                                break;
                            case "textbox":
                                if (obj.maxCharacter) {
                                    acc[obj.id] = Yup.string().required(obj.labelName + " is required.").max(Number(obj.maxCharacter), `${obj.labelName} characters length should be equal to ${obj.maxCharacter}`)
                                }
                                else if (obj.allowedInputs.length) {
                                    let pattern;
                                    let errorMessage = ""
                                    switch (obj.allowedInputs[0]) {
                                        case 'Numeric with decimal':
                                            pattern = /^\d+$|^\d+\.\d{0,2}$/;
                                            errorMessage = "Please enter only Numeric values with decimal points"
                                            break;
                                        case 'Text':
                                            pattern = /^[a-zA-Z`~!@#$%^&*()_+-=[\]\;',.\/{}|:"<>?\s]+$/;
                                            errorMessage = "Please enter only text input with alphabatical values"
                                            break;
                                        case 'Numeric':
                                            pattern = /^[0-9]+$/;
                                            errorMessage = "Please enter only Numeric values"
                                            break;
                                        default:
                                            pattern = /^[a-zA-Z`~!@#$%^&*()_+-=[\]\;',.\/{}|:"<>?\s]+$/;
                                    }
    
                                    acc[obj.id] = Yup.string().matches(pattern, errorMessage).required(obj.labelName + " is required.");
                                }
                                else if (obj.maxCharacter && obj.allowedInputs.length) {
                                    let pattern;
                                    let errorMessage = ""
                                    switch (obj.allowedInputs[0]) {
                                        case 'Numeric with decimal':
                                            pattern = /^\d+$|^\d+\.\d{0,2}$/;
                                            errorMessage = "Please enter only Numeric values with decimal points"
                                            break;
                                        case 'Text':
                                            pattern = /^[a-zA-Z`~!@#$%^&*()_+-=[\]\;',.\/{}|:"<>?\s]+$/;
                                            errorMessage = "Please enter only text input with alphabatical values"
                                            break;
                                        case 'Numeric':
                                            pattern = /^[0-9]+$/;
                                            errorMessage = "Please enter only Numeric values"
                                            break;
                                        default:
                                            pattern = /^[a-zA-Z`~!@#$%^&*()_+-=[\]\;',.\/{}|:"<>?\s]+$/;
                                    }
    
                                    acc[obj.id] = Yup.string().matches(pattern, errorMessage).max(Number(obj.maxCharacter), `${obj.labelName} characters length should be equal to ${obj.maxCharacter}`).required(obj.labelName + " is required.");
                                }
                                else {
                                    acc[obj.id] = Yup.string().required(obj.labelName + " is required.");
                                }
                                break
                            case "multiplechoice":
                                acc[obj.id] = Yup.array().required(obj.labelName + " is required.").test({
                                    test(value: any, ctx: any) {
                                        if (value.length === 0) {
                                            return ctx.createError({ message: obj.labelName + " is required." })
                                        }
                                        else {
                                            return true
                                        }
    
                                    }
                                })
                                break
                            default:
                                acc[obj.id] = Yup.string().required(obj.labelName + " is required.");
    
                        }
                    }
                    else {
                        switch (obj.fieldType) {
                            case "textbox":
                                if (obj.maxCharacter) {
                                    acc[obj.id] = Yup.string().max(Number(obj.maxCharacter), `${obj.labelName} characters length should be equal to ${obj.maxCharacter}`)
                                }
                                if (obj.allowedInputs && obj.allowedInputs.length) {
                                    let pattern;
                                    let errorMessage = ""
                                    switch (obj.allowedInputs[0]) {
                                        case 'Numeric with decimal':
                                            pattern = /^\d+$|^\d+\.\d{0,2}$/;
                                            errorMessage = "Please enter only Numeric values with decimal points"
                                            break;
                                        case 'Text':
                                            pattern = /^[a-zA-Z`~!@#$%^&*()_+-=[\]\;',.\/{}|:"<>?\s]+$/;
                                            errorMessage = "Please enter only text input with alphabatical values"
                                            break;
                                        case 'Numeric':
                                            pattern = /^[0-9]+$/;
                                            errorMessage = "Please enter only Numeric values"
                                            break;
                                        default:
                                            pattern = /^[a-zA-Z`~!@#$%^&*()_+-=[\]\;',.\/{}|:"<>?\s]+$/;
                                    }
    
                                    acc[obj.id] = Yup.string().matches(pattern, errorMessage)
                                }
                                if (obj.maxCharacter && obj.allowedInputs.length) {
                                    let pattern;
                                    let errorMessage = ""
                                    switch (obj.allowedInputs[0]) {
                                        case 'Numeric with decimal':
                                            pattern = /^\d+$|^\d+\.\d{0,2}$/;
                                            errorMessage = "Please enter only Numeric values with decimal points"
                                            break;
                                        case 'Text':
                                            pattern = /^[a-zA-Z`~!@#$%^&*()_+-=[\]\;',.\/{}|:"<>?\s]+$/;
                                            errorMessage = "Please enter only text input with alphabatical values"
                                            break;
                                        case 'Numeric':
                                            pattern = /^[0-9]+$/;
                                            errorMessage = "Please enter only Numeric values"
                                            break;
                                        default:
                                            pattern = /^[a-zA-Z`~!@#$%^&*()_+-=[\]\;',.\/{}|:"<>?\s]+$/;
                                    }
    
                                    acc[obj.id] = Yup.string().matches(pattern, errorMessage).max(Number(obj.maxCharacter), `${obj.labelName} characters length should be equal to ${obj.maxCharacter}`)
                                }
                                if (!obj?.maxCharacter && !obj?.allowedInputs?.length) {
                                    acc[obj.id] = Yup.string()
                                }
                                break;
                            case "phone":
    
                                if (obj.isValidate) {
                                    acc[obj.id] = Yup.string().min(12, 'Phone number should be min 10 characters').test({
                                        async test(value: any, ctx: any) {
                                            if (value?.length === 12) {
                                                const isValid = await checkPhoneNumber(value)
                                                if (!isValid) {
                                                    return ctx.createError({ message: "Please enter valid phone number" })
                                                }
                                                return true
                                            }
                                            else {
                                                return true
                                            }
    
                                        }
                                    })
                                }
                                else {
                                    acc[obj.id] = Yup.string().min(12, 'Phone number should be min 10 characters')
                                }
                                break;
                            case "email":
                                acc[obj.id] = Yup.string().test({
                                    test(value: any, ctx: any) {
                                        if (value) {
                                            let isValid;
                                            if (value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                                                isValid = true
                                            }
                                            else {
                                                isValid = false
                                            }
                                            if (!isValid) {
                                                return ctx.createError({ message: "Please enter a valid email" })
                                            }
                                            return true
                                        }
                                        else {
                                            return true
                                        }
                                    }
                                })
                                break
                            case "date": {
                                let [conditions, otherFields] = obj.dateConditions?.dependencyObjs
    
                                if (conditions.value) {
                                    acc[obj.id] = Yup.date().test(
                                        {
                                            test(value: any, ctx: any) {
                                                const isValid = validateDate(obj).isValid;
                                                if (!isValid) {
                                                    return ctx.createError({ message: validateDate(obj).errorText })
                                                }
                                                return true
    
                                            }
                                        }
    
                                    )
                                }
                                else {
                                    acc[obj.id] = null
                                }
                            }
                                break;
                            case "address":
    
                                if (obj.enableAddressValidation) {
                                    acc[obj.id] = Yup.object().test({
                                        async test(value: any, ctx: any) {
                                            let errorPromise = await smartyStreetAddress(formik.values[obj.id])
                                            const isValid = errorPromise?.isError
    
                                            if (isValid) {
                                                return ctx.createError({ message: errorPromise?.errorText })
                                            }
                                            return true
    
                                        }
                                    })
                                }
                                else {
                                    acc[obj.id] = Yup.object()
                                }
                                break;
    
                            case "fileupload":
    
                                acc[obj.id] = Yup.mixed().test("fileSize", "The file size should be less than 10 mb", (value: any) => {
                                    const file = Math.round((value?.size / 1024));
                                    let isValid = true
                                    if (file > 10240) {
                                        isValid = false
                                    }
                                    return isValid
                                })
                                break
                            case "multiplechoice":
                                acc[obj.id] = Yup.array()
                                break
                            default:
                                acc[obj.id] = Yup.string()
                        }
    
    
                    }
                }
            }
            return acc
        }, {})
    }, [formData]);

    const initialValues = useMemo(() => {
        const values: any = {};

        Object.keys(validationData).forEach(key => {
            const value = formAnswers[key];

            if (value) {
                values[key] = validationData[key]?.type === "array" ? value.split(",") : value;
            } else {
                values[key] = validationData[key]?.type === "array" ? [] : "";
            }
        });

        return values;
    }, [validationData, formAnswers]);

    const validations = useMemo(() => Yup.object(validationData), [validationData]);

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validations,
        validateOnChange: true,
        onSubmit: () => {
            console.log('on submit called from useFormik.. !');
        },
        validateOnMount: true,
        enableReinitialize: true,
    });

    useEffect(() => {
        savedData.current = Object.keys(formik.values).map(key => [key, formik.values[key]]);
        let unique = savedData.current.map((cur: any) => {
            if (cur[1] instanceof File) {
                let fileObject = cur[1]
                let newObject = {
                    'lastModified': fileObject.lastModified,
                    'name': fileObject.name,
                    'size': fileObject.size,
                    'type': fileObject.type
                };
                cur = [cur[0], newObject]
            }
            return JSON.stringify(cur)
        }
        ).filter(function (curr: any, index: number, self: any) {
            return self.indexOf(curr) === index;
        }).map(cur => JSON.parse(cur));
        savedData.current = unique
    }, [])

    function generateStars(count: any) {
        let stars = '';
        for (let i = 0; i < count; i++) {
            stars += '*';
        }
        return stars;
    }

    const handleLocalChange = (e: any) => {
        const key = e?.target?.name;
        const val = e?.target?.value || '';
        setLocalFieldsState({
            ...localFieldsState,
            [key]: val
        })
    }

    const handleChange = (event: any, id: any): void => {
    
        const keyCode = event.keyCode || event.charCode;
    
        const isDeleteOrBackspace = keyCode === 46 || keyCode === 8;
        const actVal = event.key;
        const ssnLetters = /^[0-9]+$/;
    
        const updatedFormData = formData.map((field: any) => {
            if (field.id !== id) return field;
    
            let updatedValue = field.actVal || "";
    
            if (isDeleteOrBackspace) {
                updatedValue = updatedValue.slice(0, -1);
            } else if (ssnLetters.test(actVal) && updatedValue.length < 9) {
                updatedValue += actVal;
            } else {
                return field;
            }
    
            formik.setFieldValue(id, generateStars(updatedValue.length));
            return { ...field, actVal: updatedValue };
        });
    
        setFormData(updatedFormData);
    };

    const debouncedHandleChange = useDebounce((e: any, id: any): void => {
        setFlag(prev => !prev);
        handleChange(e, id);
    }, 100);

    const debouncedFormikHandleChange = useDebounce((e) => {
        setFlag(prev => !prev);
        console.log('debounced handle change triggered')
        formik.handleChange(e);
    }, 100);
    
    const showActValue = (event: any, id: any): void => {
        const artwork = formData.find((field: any) => field.id === id);
        if (!artwork) return;

        setTimeout(() => {
            formik.setFieldValue(id, artwork.actVal);
            setFormData([...formData]);
        }, 500);
    };

    const showStarValue = (event: any, id: any): void => {
        const artwork = formData.find((field: any) => field.id === id);
        if (!artwork?.actVal?.length) return;
    
        const stars = generateStars(artwork.actVal.length);
    
        setTimeout(() => {
            formik.setFieldValue(id, stars);
            setFormData([...formData]);
        }, 500);
    };
    
    const getFile = (file: any, id: any) => {
        let formobj = { id: id }
        setFlag((prev) => !prev)
        setIdVal(formobj.id)
        formik.setFieldValue(id, file)
    }

    const getDateValue = (dateVal: any, formId: any) => {
        let formobj = { id: formId }
        setFlag((prev) => !prev)
        setIdVal(formobj.id)
        console.log(dateVal, 'dateVal')
        formik.setFieldValue(formId, dateVal?.toFormat('MM/dd/yyyy'))
    }

    const formatPhoneNumber = (value: any) => {

        const phoneNum = value.replace(/[^\d]/g, '')
        const phoneLength = phoneNum.length

        let phoneNumValue
        if (!value) {
            phoneNumValue = value
        }
        else if (phoneLength < 4) {
            phoneNumValue = phoneNum
        }
        else if (phoneLength < 7) {
            phoneNumValue = `${phoneNum.slice(0, 3)}-${phoneNum.slice(3)}`
        }
        else {
            phoneNumValue = `${phoneNum.slice(0, 3)}-${phoneNum.slice(3, 6)}-${phoneNum.slice(6, 10)}`
        }
        return phoneNumValue
    };

    const getAddressValue = (addressObj: any, formId: any) => {

        let formobj = { id: formId }
        setFlag((prev) => !prev)
        setIdVal(formobj.id)
        formik.setFieldValue(formId, addressObj);
    }

    const handleOpinionChange = (e: any, form: any) => {
        console.log(e, 'opiii')
        formik.setFieldValue(form.id, e.target.value)
    }

    const handleRadioChange = (e: any, form: any) => {

        formik.setFieldValue(form.id, e.target.value)
    }

    const handleCheckboxChange = (e: any, form: any) => {
        if (e.target.checked) {
            formik.setFieldValue(form.id, [...formik.values[form.id], e.target.value])
        } else {
            let temArr = formik.values[form.id];
            const newArry = temArr.splice(0, temArr.indexOf(e.target.value));
            formik.setFieldValue(form.id, [...newArry])
        }
    }

    const getSelectedValue = (value: any, id: any) => {
        let event = {
            "target": {
                "value": value || ""
            }
        }
        let formobj = { id: id }
        formik.setFieldValue(id, value || "")
        setFlag((prev) => !prev)
        setIdVal(formobj.id)
    }

    const getRankValues = (value: any, id: any) => {
        if (value) {
            const serializedValue = JSON.stringify(value);
            formik.setFieldValue(id, serializedValue);
        }
        else formik.setFieldValue(id, "")
        setIdVal(id)
        setFlag((prev) => !prev)
    }

    const conditionalData = useMemo(() => {
        return formData.filter((form: any) => form.fieldType === "conditionallogic");
    }, [formData]);
   
    useEffect(() => {
        if (conditionalData.length > 0) {
            conditionalData.forEach((data: any) => {
                const settings = data.settings;
                if (!Object.keys(settings).length) return;
    
                let finalConditions = false;
                const conditionsData = settings.conditions || [];
                const whenSettings = settings.when;
                const mainList = whenSettings.mainList?.selectedList[0];
                const conditionalList = whenSettings.conditionalList?.selectedList[0];
                const valueToCheck = whenSettings.values?.selectedList[0];
    
                if (conditionsData.length === 0 && mainList && conditionalList) {
                    const checkId = mainList.id;
                    const checkType = mainList.type;
                    const formikValue = formik.values[checkId];
    
                    if (checkType === "radio" || checkType === "dropdown") {
                        finalConditions = evaluateCondition(conditionalList, formikValue, valueToCheck);
                    } else {
                        finalConditions = evaluateCheckboxCondition(conditionalList, formikValue);
                    }
    
                    updateConditionalElements(settings.then, finalConditions);
                } else {
                    let finalExpression: any = buildConditionExpression(conditionsData, whenSettings, idVal);
                    updateConditionalElements(settings.then, finalExpression);
                }
            });
    
            setFormData([...formData]);
        }
    }, [JSON.stringify(formData), idVal, flag, currentSelectedIndex]);

    const evaluateCheckboxCondition = (condition: string, formikValue: any) => {
        return ["isfilled", "ischecked", "is"].includes(condition) ? !!formikValue : condition === "isblank" ? !formikValue : false;
    };    

    const evaluateCondition = (condition: string, formikValue: any, valueToCheck: any) => {
        switch (condition) {
            case "isfilled":
                return !!formikValue;
            case "is":
                return formikValue === valueToCheck;
            case "isblank":
                return !formikValue;
            case "isnot":
                return formikValue !== valueToCheck;
            default:
                return false;
        }
    };

    const updateConditionalElements = (conditionalShowHide: any, conditionResult: boolean) => {
        if (!conditionalShowHide || conditionalShowHide.length === 0) return;
    
        conditionalShowHide.forEach((rule: any) => {
            const isHideBlock = rule.mainList.selectedList[0] === "Hide blocks";
            const updateKey = isHideBlock ? "removed" : "listed";
    
            rule.components?.[updateKey]?.forEach((component: any) => {
                component.isShow = isHideBlock ? !conditionResult : conditionResult;
            });
    
            formData.forEach((form: any) => {
                rule.components?.[updateKey]?.forEach((component: any) => {
                    if (form.id === component.id) {
                        form.isShow = component.isShow;
                    }
                });
            });
        });
    };
    
    const buildConditionExpression = (conditionsData: any[], whenSettings: any, idVal: any) => {
        let checkArr: any[] = [];
        let conditions = [
            {
                mainList: [],
                subList: whenSettings.mainList,
                conditionalList: whenSettings.conditionalList,
                values: whenSettings.values
            },
            ...conditionsData
        ];
    
        conditions.forEach((condition, index) => {
            let conditionResult = doFinalLogic(condition, condition.values.selectedList, condition.subList?.selectedList[0]?.id, idVal);
            if (index === 0) {
                checkArr.push(conditionResult);
            } else {
                let operator = conditions[1]?.mainList?.selectedList[0]?.label === "And" ? "&&" : "||";
                checkArr.push(operator, conditionResult);
            }
        });
    
        return checkArr.join(" ");
    };
    
    const doFinalLogic = (data: any, value: any, checkId: any, id: any) => {
        let isFinalCheck: any = false
        let conditionCheck = data.conditionalList?.selectedList[0];
        let type = data.subList?.selectedList[0]?.type
        if (type === 'radio' || type === 'dropdown') {
            switch (conditionCheck) {
                case "isfilled":
                    isFinalCheck = formik.values[value] ? true : false;
                    break;
                case 'is':
                    isFinalCheck = (value[0] === formik.values[checkId]) ? true : false;
                    break;
                case 'isblank':
                    isFinalCheck = formik.values[value] ? false : true;
                    break;
                case 'isnot':
                    isFinalCheck = ((value[0] === formik.values[checkId]) ? false : true);
                    break;
            }
        }
        else {
            switch (conditionCheck) {
                case 'isfilled':

                    isFinalCheck = formik.values[checkId] ? true : false;
                    break
                case 'ischecked':
                    isFinalCheck = formik.values[checkId] ? true : false;
                    break;
                case 'is':
                    isFinalCheck = formik.values[checkId] ? true : false;
                    break;
                case 'isblank':
                    isFinalCheck = formik.values[checkId] ? false : true;
                    break;
                case 'isnot':
                    isFinalCheck = formik.values[checkId] ? false : false;
                    break;
                default:
            }
        }
        return isFinalCheck
    }

    const getPageBreakValue = () => {
        let pageValue = ""
        let filterPageData = formData.filter((form: any) => form.fieldType === "pagebreak")
        pageValue = filterPageData[currentSelectedIndex].btnValue ? filterPageData[currentSelectedIndex].btnValue : "Continue"
        return pageValue
    }



    const [openVerifyModal, setOpenVerifyModal] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [modalValue, setModalValue] = useState<any>(null)
    const [modalFormId, setModalFormID] = useState<any>(null)
    const handleOpenVerifyModal = (item: any) => {
        setModalValue(formik.values[item.id])
        setModalFormID(item.id)
        setOpenVerifyModal(true);
    };
    const handleCloseVerifyModal = (): void => {
        setOpenVerifyModal(false);
    };

    const [openVerifyCodeModal, setOpenVerifyCodeModal] = useState(false);
    const [otpVal, setOtp] = useState<any>(null)

    const handleOpenCodeVerifyModal = (value: any, phone: any, formId: any) => {
        formik.setFieldValue(formId, phone)
        setModalValue(phone)
        setOtp(value)
        setOpenVerifyCodeModal(true);
        handleCloseVerifyModal()
    }

    const handleCloseVerifyCodeModal = (val: any) => {
        setRefreshPage(val)
        setOpenVerifyCodeModal(false)
    };

    function extractRemovedComponents(json: any) {
        const removedComponents: any = [];

        if (json.then && Array.isArray(json.then)) {
            json.then.forEach((item: any) => {
                if (item.components && (item.components.removed || item.components.listed)) {
                    if (item.components.removed) {
                        removedComponents.push(...item.components.removed);
                    }
                    if (item.components.listed) {
                        removedComponents.push(...item.components.listed);
                    }

                }
            });
        }

        return removedComponents;
    }


    const shouldDisplayBlock = (formData, formik, formItem) => {
        const conditionalField = formData.find(item => item.fieldType === "conditionallogic");

        if (!conditionalField) return true;

        const components = extractRemovedComponents(conditionalField.settings);
        const selectedCondition = conditionalField?.settings?.when?.conditionalList?.selectedList[0];
        const selectedValue = conditionalField?.settings?.when?.values?.selectedList?.[0] || conditionalField?.settings?.conditions?.[0]?.values?.selectedList?.[0];
        const action = conditionalField?.settings?.then?.[0]?.mainList?.selectedList?.[0]?.toLowerCase();
        const dependentFieldId = conditionalField?.settings?.when?.mainList?.selectedList?.[0]?.id;
        let expectedValue = formik?.values?.[dependentFieldId] || "";
        expectedValue = Array.isArray(expectedValue) ? expectedValue[0] : expectedValue;
        const conditions = conditionalField?.settings?.conditions || [];
        const isConditionMet = (condition) => {
            const subDependentFieldId = condition?.subList?.selectedList?.[0]?.id;
            const subSelectedCondition = condition?.conditionalList?.selectedList?.[0];
            const expectedSubValue = condition?.values?.selectedList?.[0];
            const actualSubValue = formik?.values?.[subDependentFieldId] || "";

            if (!subSelectedCondition) return true;

            const normalizedSubValue = Array.isArray(actualSubValue) ? actualSubValue[0] : actualSubValue;

            switch (subSelectedCondition) {
                case "is":
                    return normalizedSubValue === expectedSubValue;
                case "isnot":
                    return normalizedSubValue !== expectedSubValue;
                case "isfilled":
                    return !!normalizedSubValue;
                case "isblank":
                    return !normalizedSubValue;
                case "ischecked":
                    return !!normalizedSubValue;
                default:
                    return true;
            }
        };

        const areAllConditionsMet = (conditionsList) => {
            if (!conditionsList || conditionsList.length === 0) {
                if (conditionMet) return true;
                return false;
            }

            return conditionsList.every(isConditionMet);
        };
        let conditionMet = true;
        switch (selectedCondition) {
            case "is":
                conditionMet = selectedValue === expectedValue;
                break;
            case "isnot":
                conditionMet = selectedValue !== expectedValue;
                break;
            case "isfilled":
                conditionMet = !!expectedValue;
                break;
            case "isblank":
                conditionMet = !expectedValue;
                break;
            default:
                conditionMet = true;
        }
        const mainList = conditionalField?.settings?.conditions?.[0]?.mainList?.selectedList?.[0]?.label || "Or";
        let finalConditionMet = true;


        if (mainList === "And") {
            finalConditionMet = conditionMet && areAllConditionsMet(conditions);
        } else if (mainList === "Or") {
            finalConditionMet = conditionMet || areAllConditionsMet(conditions);
        } else {
            finalConditionMet = conditionMet; 
        }


        if (finalConditionMet && components.some(component => component.id === formItem.id)) {
            const isHideAction = action === "hide blocks";
            const isShowAction = action === "show blocks";
            if (isHideAction) {
                return !components.some(component => component.id === formItem.id);
            }

            if (isShowAction) {
                return components.some(component => component.id === formItem.id);
            }
        }
        else if (!finalConditionMet && components.some(component => component.id === formItem.id)) {
            const isHideAction = action === "hide blocks";
            const isShowAction = action === "show blocks";
            if (action === "hide blocks") {
                return true
            }
            else if (action === "show blocks") {
                return false
            }
        }
        else {
            return true;
        }
    };

    const formElementByItem = (formItem: any, formIndex: number) => {
        const shouldDisplay = shouldDisplayBlock(formData, formik, formItem);
        if (!shouldDisplay) return null;
        switch (formItem?.fieldType) {

            case "ssn":
                return (
                    <>
                        <Box sx={{ mb: 2 }} className={`${isShowOneByOne ? isForward ? "preview-form-item forward-dir" : "preview-form-item backward-dir" : ""}`} key={formItem.id}>
                            <Box sx={{ position: "relative" }}>
                                <Box sx={{ display: "flex" }}>
                                    <Typography className="preview-header-title" dangerouslySetInnerHTML={{ __html: formItem.labelName }}></Typography>
                                    {formItem.isRequired && <Box component="span" style={{ color: "red", fontSize: "20px", position: "relative", right: "0px", top: "-2px" }}>*</Box>}
                                </Box>
                            </Box>
                            <Typography className="preview-label-desc-title" dangerouslySetInnerHTML={{ __html: (formItem.description && formItem.description.length) ? formItem.description : "" }}></Typography>
                            <TextField
                                className="input-controle"
                                fullWidth
                                id={formItem.id}
                                name={formItem.id.toString()}
                                sx={{
                                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                        color: '#1A1A1A',
                                        padding: "10px",
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        fontFamily: 'Segoe UI',
                                    },
                                    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'var(--c-primary-color)',
                                    },
                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'var(--c-primary-color)',
                                        borderWidth: '2px',
                                    },
                                }}

                                onChange={(e: any) => {
                                    debouncedHandleChange(e, formItem.id);
                                    handleLocalChange(e);
                                }}
                                onKeyUp={(e: any) => {
                                    handleLocalChange(e);
                                    debouncedHandleChange(e, formItem.id);
                                    setIdVal(formItem.id);
                                }}
                                value={localFieldsState?.[formItem.id] || ''}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="start">
                                            <VisibilityIcon onMouseOver={(e) => showActValue(e, formItem.id)} onMouseOut={(e) => showStarValue(e, formItem.id)} sx={{ "cursor": "pointer" }} />
                                        </InputAdornment>)
                                }}

                            />
                            {isShowOneByOne &&
                                <Box className="preview-label-error">
                                    {formik.errors[formItem.id] && isSubmitted ? <div>{formik.errors[formItem.id] as string}</div> : null}
                                </Box>
                            }
                        </Box>

                    </>
                )

            case "textbox":
                return (
                    <>
                        <Box
                            sx={{ mb: 2 }}
                            className={`${isShowOneByOne ? isForward ? "preview-form-item forward-dir" : "preview-form-item backward-dir" : ""} }`}
                            key={formItem.id}
                        >
                            <Box sx={{ position: "relative" }}>
                                <Box sx={{ display: "flex" }}>
                                    <Typography
                                        className="preview-header"
                                        dangerouslySetInnerHTML={{ __html: formItem.labelName }}
                                    ></Typography>
                                    {formItem.isRequired && (
                                        <Box
                                            component="span"
                                            style={{
                                                color: "red",
                                                fontSize: "20px",
                                                position: "relative",
                                                right: "0px",
                                                top: "-2px",
                                            }}
                                        >
                                            *
                                        </Box>
                                    )}
                                </Box>
                            </Box>

                            <Typography
                                className="preview-label-desc"
                                dangerouslySetInnerHTML={{
                                    __html: formItem.description && formItem.description.length
                                        ? formItem.description
                                        : "",
                                }}
                            ></Typography>
                            {formItem.isMask ? (
                                <TextField
                                    className="input-controle"
                                    fullWidth
                                    id={"" + formItem.id}
                                    name={formItem.id.toString()}
                                    placeholder={formItem.placeholder}
                                    sx={{
                                        "& .MuiInputBase-input.MuiOutlinedInput-input": {
                                            color: "#1A1A1A",
                                            padding: "10px",
                                            fontSize: "14px",
                                            fontWeight: 600,
                                            fontFamily: "Segoe UI",
                                        },
                                        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "var(--c-primary-color)",
                                        },
                                        "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                                            borderColor: formItem.readonly
                                                ? "rgb(187, 186, 184)"
                                                : "var(--c-primary-color)",
                                        },
                                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "var(--c-primary-color)",
                                            borderWidth: "2px",
                                        },
                                    }}
                                    value={localFieldsState?.[formItem.id] || ''}
                                    onChange={e => {
                                        if (/^\s/.test(e?.target?.value)) {
                                            e.target.value = "";
                                        } else {
                                            handleLocalChange(e);
                                            debouncedHandleChange(e, formItem.id);
                                            setIdVal(formItem.id);
                                        }
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="start">
                                                <VisibilityIcon
                                                    onMouseOver={(e) =>
                                                        showActValue(e, formItem.id)
                                                    }
                                                    onMouseOut={(e) =>
                                                        showStarValue(e, formItem.id)
                                                    }
                                                    sx={{ cursor: "pointer" }}
                                                />
                                            </InputAdornment>
                                        ),
                                        disabled: !!formItem.readonly,
                                    }}
                                />
                            ) : (
                                <TextField
                                    className="input-controle"
                                    fullWidth
                                    id={"" + formItem.id}
                                    name={formItem.id.toString()}
                                    placeholder={formItem.placeholder}
                                        type={formItem.isSecure ? "password" : "text"}
                                        autoComplete="new-password"
                                        sx={{
                                            "& .MuiInputBase-input.MuiOutlinedInput-input": {
                                                color: "#1A1A1A",
                                                padding: "10px",
                                                fontSize: "14px",
                                                fontWeight: 600,
                                                fontFamily: "Segoe UI",
                                            },
                                            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "rgb(187, 186, 184)",
                                            },
                                            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                                                borderColor: formItem.readonly
                                                    ? "rgb(187, 186, 184)"
                                                    : "var(--c-primary-color)",
                                            },
                                            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                borderColor: formItem.readonly
                                                    ? "rgb(187, 186, 184)"
                                                    : "var(--c-primary-color)",
                                                borderWidth: formItem.readonly ? "1px" : "2px",
                                            },
                                        }}
                                        value={localFieldsState?.[formItem.id] || ''}
                                        onChange={(e: any) => {
                                            if (/^\s/.test(e.target.value))
                                                e.target.value = '';
                                            else {
                                                handleLocalChange(e);
                                                debouncedFormikHandleChange(e);
                                                setIdVal(formItem.id)
                                            }
                                        }}
                                    inputProps={{
                                        disabled: !!formItem.readonly,
                                    }}
                                />
                            )}
                            {isShowOneByOne && (
                                <Box className="preview-label-error">
                                    {formik.errors[formItem.id] && isSubmitted ? (
                                        <div>{formik.errors[formItem.id]}</div>
                                    ) : null}
                                </Box>
                            )}
                        </Box>
                    </>
                )


            case "date":
                return (
                    <>
                        <Box sx={{ mb: 2 }} className={`${isShowOneByOne ? isForward ? "preview-form-item forward-dir" : "preview-form-item backward-dir" : ""}  dateComponent`} key={formItem.id}>
                            <Box sx={{ position: "relative" }}>
                                <Box sx={{ display: "flex" }}>
                                    <Typography className="preview-header" dangerouslySetInnerHTML={{ __html: formItem.labelName }}></Typography>
                                    {formItem.isRequired && <Box component="span" style={{ color: "red", fontSize: "20px", position: "relative", right: "0px", top: "-2px" }}>*</Box>}
                                </Box>
                            </Box>

                            <Typography className="preview-label-desc" dangerouslySetInnerHTML={{ __html: (formItem.description && formItem.description.length) ? formItem.description : "" }}></Typography>
                            <DateComponent
                                value={formik.values[formItem.id]}
                                label=""
                                width="100%"
                                isFromPreview={true}
                                dateItem={formItem}
                                getDateValue={getDateValue}
                                id={formItem.id}
                                name={formItem.id.toString()}
                                isReadonly={formItem.readonly ? formItem.readonly : false} />
                            {isShowOneByOne && <Box className="preview-label-error">
                                {formik.errors[formItem.id] && isSubmitted ? <div>{formik.errors[formItem.id] as string}</div> : null}
                            </Box>
                            }
                        </Box>
                    </>
                )

            case "address":
                return (
                    <>
                        <Box sx={{ mb: 2 }} className={`${isShowOneByOne ? isForward ? "preview-form-item forward-dir" : "preview-form-item backward-dir" : ""} `} key={formItem.id}>
                            <Box sx={{ position: "relative" }}>
                                <Box sx={{ display: "flex" }}>
                                    <Typography className="preview-header" dangerouslySetInnerHTML={{ __html: formItem.labelName }}></Typography>
                                    {formItem.isRequired && <Box component="span" style={{ color: "red", fontSize: "20px", position: "relative", right: "0px", top: "-2px" }}>*</Box>}
                                </Box>
                            </Box>
                            <Typography className="preview-label-desc" dangerouslySetInnerHTML={{ __html: (formItem.description && formItem.description.length) ? formItem.description : "" }}></Typography>
                            <Box>
                                <AddressComponent value={formik.values[formItem.id]} field={formItem} id={formItem.id} name={formItem.id.toString()} getAddressValue={getAddressValue} errorObj={(formik.errors[formItem.id] && isSubmitted) ? formik.errors[formItem.id] : ""} isFromPreview={true} />
                            </Box>
                            {isShowOneByOne && <Box className="preview-label-error">
                                {(typeof formik.errors[formItem.id] !== "object" && formik.errors[formItem.id] && isSubmitted) ? <div>{formik.errors[formItem.id] as string}</div> : null}
                            </Box>}
                        </Box>

                    </>
                )

            case "multiplechoice":
                return (
                    <>
                        <Box sx={{ mb: 2, overflow: "auto" }} className="multi-container" key={formItem.id}>
                            <Box sx={{ position: "relative" }}>
                                <Box sx={{ display: "flex" }}>
                                    <Typography className="preview-header" dangerouslySetInnerHTML={{ __html: formItem.labelName }}></Typography>
                                    {formItem.isRequired && <Box component="span" style={{ color: "red", fontSize: "20px", position: "relative", right: "0px", top: "-2px" }}>*</Box>}
                                </Box>
                            </Box>
                            <Typography className="preview-label-desc" dangerouslySetInnerHTML={{ __html: (formItem.description && formItem.description.length) ? formItem.description : "" }}></Typography>
                            {formItem.choices?.map((choice: any, index: number) => {
                                return (
                                    <span key={index}>
                                        <input type="checkbox" id={formItem.id + "yes" + index} name={formItem.id.toString()} style={{ display: "none" }} value={choice.value} 
                                            onChange={(e) => {
                                                setIdVal(formItem.id)
                                                debouncedFormikHandleChange(e);
                                                handleCheckboxChange(e, formItem);
                                            }}
                                            onKeyUp={(e) => {
                                                debouncedFormikHandleChange(e);
                                            }}
                                        />
                                        <label htmlFor={formItem.id + "yes" + index}>
                                            <Box className="multi-parent" sx={{ cursor: "pointer", width: "50% !important", borderColor: "#1565c0 !important" }}>
                                                <Box className="mult-cancel-box" sx={{ position: "relative", }}>
                                                    <Box sx={{ display: "flex", width: "95%" }}>
                                                        <Typography className="multi-opt" >{choice.character.toUpperCase()}</Typography>

                                                        <Box sx={{
                                                            minWidth: "69%",
                                                            maxWidth: "90%",
                                                            wordWrap: "normal",
                                                            alignSelf: "center",
                                                        }} title={choice.value}>{choice.value}</Box>
                                                    </Box>
                                                    {formik.values[formItem.id].includes(choice.value) && <Box>
                                                        <CheckIcon sx={{ fontSize: "18px", color: "#08adff", position: "absolute", top: "8px", right: "15px" }} />
                                                    </Box>}
                                                </Box>
                                            </Box>

                                        </label>
                                    </span>


                                )
                            })}
                            {isShowOneByOne && <Box className="preview-label-error">
                                {formik.errors[formItem.id] && isSubmitted ? <div>{formik.errors[formItem.id] as string}</div> : null}
                            </Box>}
                        </Box>

                    </>
                )

            case "weightedmultiplechoice":
                return (
                    <>
                        <Box sx={{ mb: 2, overflow: "auto" }} className="multi-container" key={formItem.id}>
                            <Box sx={{ position: "relative" }}>
                                <Box sx={{ display: "flex" }}>
                                    <Typography className="preview-header" dangerouslySetInnerHTML={{ __html: formItem.labelName }}></Typography>
                                    {formItem.isRequired && <Box component="span" style={{ color: "red", fontSize: "20px", position: "relative", right: "0px", top: "-2px" }}>*</Box>}


                                </Box>


                            </Box>
                            <Typography className="preview-label-desc" dangerouslySetInnerHTML={{ __html: (formItem.description && formItem.description.length) ? formItem.description : "" }}></Typography>
                            {formItem.choices?.map((choice: any, index: number) => {
                                return (
                                    <span key={index}>
                                        <input type="radio" id={formItem.id + "yes" + index} name={formItem.id.toString()} style={{ display: "none" }} value={choice.value} onChange={(e) => {
                                            setIdVal(formItem.id)
                                            handleRadioChange(e, formItem)
                                            debouncedFormikHandleChange(e);
                                        }}
                                            onKeyUp={(e) => {
                                                debouncedFormikHandleChange(e);
                                            }}
                                        />
                                        <label htmlFor={formItem.id + "yes" + index}>
                                            <Box className="multi-parent" sx={{ cursor: "pointer", width: "50% !important", borderColor: "#1565c0 !important" }}>
                                                <Box className="mult-cancel-box" sx={{ position: "relative", }}>
                                                    <Box sx={{ display: "flex", width: "95%" }}>
                                                        <Typography className="multi-opt" >{choice.character.toUpperCase()}</Typography>

                                                        <Box sx={{
                                                            minWidth: "69%",
                                                            maxWidth: "90%",
                                                            wordWrap: "normal",
                                                            alignSelf: "center",
                                                        }} title={choice.value}>{choice.value}</Box>
                                                    </Box>
                                                    {formik.values[formItem.id] === choice.value && <Box>
                                                        <CheckIcon sx={{ fontSize: "18px", color: "#08adff", position: "absolute", top: "8px", right: "15px" }} />
                                                    </Box>}

                                                </Box>
                                            </Box>

                                        </label>
                                    </span>


                                )
                            })}
                            {isShowOneByOne && <Box className="preview-label-error">
                                {formik.errors[formItem.id] && isSubmitted ? <div>{formik.errors[formItem.id] as string}</div> : null}
                            </Box>}
                        </Box>

                    </>
                )


            case "checkbox":
                return (
                    <>
                        <Box sx={{ mb: 2 }} className="checkbox-container preview-form-item" key={formItem.id}>
                            <Box sx={{ position: "relative" }}>
                                <Box sx={{ display: "flex" }}>
                                    <Typography className="preview-header" dangerouslySetInnerHTML={{ __html: formItem.labelName }}></Typography>
                                    {formItem.isRequired && (
                                        <Box component="span" style={{ color: "red", fontSize: "20px", position: "relative", right: "0px", top: "-2px" }}>*</Box>
                                    )}
                                </Box>
                            </Box>
                            <Typography className="preview-label-desc" dangerouslySetInnerHTML={{ __html: formItem.description || "" }}></Typography>
                            <div key={formItem.checkboxOption.id}>
                                <input
                                    type="checkbox"
                                    id={`checkbox-${formItem.id}`}
                                    name={formItem.id}
                                    checked={formik.values[formItem.id]}
                                    onChange={(e) => formik.setFieldValue(formItem.id, e.target.checked ? true : false)}
                                />
                                <label htmlFor={`checkbox_${formItem.id}_${formItem.checkboxOption.id}`}>
                                    {formItem.checkboxOption.value}
                                </label>
                            </div>
                            {isShowOneByOne && <Box className="preview-label-error">
                                {formik.errors[formItem.id] && isSubmitted ? <div>{formik.errors[formItem.id] as string}</div> : null}
                            </Box>}
                        </Box>
                    </>
                ) 

            case "textarea":
                return (
                    <>
                        <Box sx={{ mb: 2 }} className={`${isShowOneByOne ? isForward ? "preview-form-item forward-dir" : "preview-form-item backward-dir" : ""}}`} key={formItem.id}>
                            <Box sx={{ position: "relative" }}>
                                <Box sx={{ display: "flex" }}>
                                    <Typography className="preview-header" dangerouslySetInnerHTML={{ __html: formItem.labelName }}></Typography>
                                    {formItem.isRequired && <Box component="span" style={{ color: "red", fontSize: "20px", position: "relative", right: "0px", top: "-2px" }}>*</Box>}
                                </Box>
                            </Box>

                            <Typography className="preview-label-desc" dangerouslySetInnerHTML={{ __html: (formItem.description && formItem.description.length) ? formItem.description : "" }}></Typography>
                            <TextField
                                className="input-controle"
                                fullWidth
                                id={formItem.id}
                                name={formItem.id.toString()}
                                label=""
                                multiline
                                rows={2}
                                sx={{
                                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                        color: '#1A1A1A',
                                        padding: "10px",
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        fontFamily: 'Segoe UI',
                                    },
                                    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'rgb(187, 186, 184)',
                                    },
                                    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: formItem.readonly ? 'rgb(187, 186, 184)' : 'var(--c-primary-color)',
                                    },
                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: formItem.readonly ? 'rgb(187, 186, 184)' : 'var(--c-primary-color)',
                                        borderWidth: formItem.readonly ? '1px' : '2px',
                                    },
                                }}
                                value={localFieldsState?.[formItem.id] || ''}
                                onFocus={() => console.log('On focus triggered...!!!')}
                                onChange={(e) => {
                                    setIdVal(formItem.id);
                                    handleLocalChange(e);
                                    debouncedFormikHandleChange(e);
                                }}
                                onKeyUp={(e) => {
                                    setIdVal(formItem.id);
                                    debouncedFormikHandleChange(e);
                                }}
                                inputProps={
                                    { readOnly: formItem.readonly ? formItem.readonly : false, }
                                }

                            />
                            {isShowOneByOne && <Box className="preview-label-error">
                                {formik.errors[formItem.id] && isSubmitted ? <div>{formik.errors[formItem.id] as string}</div> : null}
                            </Box>}
                        </Box>

                    </>
                )

            case 'displaytext':
                return (<>
                    <Box className={isShowOneByOne ? isForward ? "preview-display-text preview-form-item forward-dir" : "preview-display-text preview-form-item backward-dir" : "preview-display-text preview-form-item"} dangerouslySetInnerHTML={{ __html: formItem.htmlContent }} sx={{
                        '& p': {
                            margin: 0
                        },
                        '& h1': {
                            margin: 0
                        },
                        '& h2': {
                            margin: 0
                        },
                        '& h3': {
                            margin: 0
                        },
                        marginLeft: "2em"
                    }} key={formItem.id}>
                    </Box>
                </>
                )

            case "phone":
                return (
                    <>
                        <Box sx={{ mb: 2 }} className={`${isShowOneByOne ? isForward ? "preview-form-item forward-dir" : "preview-form-item backward-dir" : ""} }`} key={formItem.id}>
                            <Box sx={{ position: "relative" }}>
                                <Box sx={{ display: "flex" }}>
                                    <Typography className="preview-header" dangerouslySetInnerHTML={{ __html: formItem.labelName }}></Typography>
                                    {formItem.isRequired && <Box component="span" style={{ color: "red", fontSize: "20px", position: "relative", right: "0px", top: "-2px" }}>*</Box>}
                                </Box>
                            </Box>

                            <Typography className="preview-label-desc" dangerouslySetInnerHTML={{ __html: (formItem.description && formItem.description.length) ? formItem.description : "" }}></Typography>

                            <TextField
                                className="input-controle"
                                fullWidth
                                id={"" + formItem.id}
                                name={formItem.id.toString()}
                                type="tel"
                                sx={{
                                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                        color: '#1A1A1A',
                                        padding: "10px",
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        fontFamily: 'Segoe UI',
                                    },
                                    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'var(--c-primary-color)',
                                    },
                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'var(--c-primary-color)',
                                        borderWidth: '2px',
                                    },
                                }}
                                placeholder="123-456-7891"
                                value={formik.values[formItem.id] ? formik.values[formItem.id] : ""}
                                onChange={(event) => {
                                    const inputValue = event.target.value;
                                    const formattedValue = formatPhoneNumber(inputValue);
                                    formik.setFieldValue(formItem.id, formattedValue);
                                    setFlag((prev) => !prev);
                                    setIdVal(formItem.id);
                                }}
                                onKeyUp={(e) => {
                                    setFlag((prev) => !prev);
                                    setIdVal(formItem.id);
                                }}
                                InputProps={{
                                    endAdornment: (

                                        <InputAdornment position="end">

                                            {!formItem.isPhoneVerified ? <Button
                                                disableRipple
                                                variant="contained"
                                                className="verify-btn"
                                                id="verify_button"
                                                onClick={() => handleOpenVerifyModal(formItem)}
                                                sx={{
                                                    boxShadow: 0,
                                                    '&:hover': {
                                                        boxShadow: 0,
                                                    }
                                                }}
                                                disabled={!formik.values[formItem.id] || formik.values[formItem.id]?.length < 12 || formik.errors[formItem.id] !== undefined}
                                            >
                                                Verify
                                            </Button> : <Typography sx={{ color: "green" }}>
                                                <CheckIcon sx={{ color: "green", fontSize: "18px", position: "relative", top: "5px" }} /> Verified
                                            </Typography>}

                                        </InputAdornment>),
                                }}

                            />

                            <Modal
                                open={openVerifyModal}
                                onClose={handleCloseVerifyModal}
                                aria-labelledby="child-modal-title"
                                aria-describedby="child-modal-description"
                            >
                                <Box className='verify-modal'>
                                    <VerifyModal
                                        handleCloseVerifyModal={handleCloseVerifyModal}
                                        handleOpenCodeVerifyModal={handleOpenCodeVerifyModal}
                                        formValue={modalValue}
                                        formId={modalFormId}
                                    />
                                </Box>
                            </Modal>


                            <Modal
                                open={openVerifyCodeModal}
                                onClose={handleCloseVerifyCodeModal}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box className='verify-code-modal'>
                                    <VerifyCode handleCloseVerifyCodeModal={handleCloseVerifyCodeModal} otpToVerify={otpVal} phoneValue={modalValue} formId={modalFormId} isRefreshPage={refreshPage} />
                                </Box>
                            </Modal>

                            {isShowOneByOne && <Box className="preview-label-error">
                                {formik.errors[formItem.id] && isSubmitted ? <div>{formik.errors[formItem.id] as string}</div> : null}
                            </Box>}
                        </Box>

                    </>
                )

            case "email":
                return (
                    <>
                        <Box sx={{ mb: 2 }} className={`${isShowOneByOne ? isForward ? "preview-form-item forward-dir" : "preview-form-item backward-dir" : ""}}`} key={formItem.id}>
                            <Box sx={{ position: "relative" }}>
                                <Box sx={{ display: "flex" }}>
                                    <Typography className="preview-header" dangerouslySetInnerHTML={{ __html: formItem.labelName }}></Typography>
                                    {formItem.isRequired && <Box component="span" style={{ color: "red", fontSize: "20px", position: "relative", right: "0px", top: "-2px" }}>*</Box>}


                                </Box>


                            </Box>

                            <Typography className="preview-label-desc" dangerouslySetInnerHTML={{ __html: (formItem.description && formItem.description.length) ? formItem.description : "" }}></Typography>
                            <TextField
                                className="input-controle"
                                fullWidth
                                id={"" + formItem.id}
                                name={formItem.id.toString()}
                                // label="First Name"
                                sx={{
                                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                        color: '#1A1A1A',
                                        padding: "10px",
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        fontFamily: 'Segoe UI',
                                    },
                                    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'var(--c-primary-color)',
                                    },
                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'var(--c-primary-color)',
                                        borderWidth: '2px',
                                    },
                                }}
                                value={localFieldsState?.[formItem.id] || ''}
                                onChange={(e) => {
                                    setIdVal(formItem.id)
                                    handleLocalChange(e);
                                    debouncedFormikHandleChange(e);
                                }}
                                onKeyUp={(e) => {
                                    setIdVal(formItem.id)
                                    debouncedFormikHandleChange(e);
                                }}
                            />
                            {isShowOneByOne && <Box className="preview-label-error">
                                {formik.errors[formItem.id] && isSubmitted ? <div>{formik.errors[formItem.id] as string}</div> : null}
                            </Box>}
                        </Box>
                    </>
                )

            case "yes/no":
                return (
                    <>
                        <Box className={isShowOneByOne ? isForward ? "yes-preview-container forward-dir" : "yes-preview-container  backward-dir" : "yes-preview-container"} sx={{ mb: 2 }} key={formItem.id}>
                            <Box sx={{ position: "relative" }}>
                                <Box sx={{ display: "flex" }}>
                                    <Typography className="preview-header" dangerouslySetInnerHTML={{ __html: formItem.labelName }}></Typography>
                                    {formItem.isRequired && <Box component="span" style={{ color: "red", fontSize: "20px", position: "relative", right: "0px", top: "-2px" }}>*</Box>}
                                </Box>
                            </Box>

                            <Typography className="preview-label-desc" dangerouslySetInnerHTML={{ __html: (formItem.description && formItem.description.length) ? formItem.description : "" }}></Typography>
                            {formItem?.choices?.map((choice: any, index: number) => {
                                return (
                                    <Fragment key={index}>
                                        <input type="radio" id={formItem.id + "yes" + index} name={formItem.id.toString()} style={{ display: "none" }} value={choice.value} onChange={(e) => {
                                            setIdVal(formItem.id)
                                            handleRadioChange(e, formItem)
                                            debouncedFormikHandleChange(e);
                                        }}

                                        />
                                        <label htmlFor={formItem.id + "yes" + index}>
                                            <Box className="yes-preview-box" sx={{ position: "relative" }}>
                                                <Box className="yes-preview-box-child">{choice.value.charAt(0)}</Box>

                                                <Box className="yes-preview-box-text" >{choice.value}</Box>
                                                {formik.values[formItem.id] === choice.value && <Box>
                                                    <CheckIcon sx={{ fontSize: "18px", color: "#08adff", position: "absolute", top: "8px", right: "15px" }} />
                                                </Box>}

                                            </Box>
                                        </label>
                                    </Fragment>

                                )
                            })}

                            {isShowOneByOne && <Box className="preview-label-error">
                                {formik.errors[formItem.id] && isSubmitted ? <div>{formik.errors[formItem.id] as string}</div> : null}
                            </Box>}
                        </Box>
                    </>
                ) 

            case "divider":
                return (
                    <>
                        <Box sx={{ borderBottom: "1px solid grey", width: "100%", mb: 2 }} key={formItem.id}></Box>
                    </>
                );

            case "label":
                return (
                    <>
                        <Box sx={{ mb: 2 }} className={`${isShowOneByOne ? isForward ? "preview-form-item forward-dir" : "preview-form-item backward-dir" : ""} }`} key={formItem.id}>
                            <Typography className="preview-label">{formItem.labelValue}</Typography>
                        </Box>
                    </>
                )


            case 'embedvideo':
                const youtubeURL = formItem.value;
                const videoId = youtubeURL.split("v=")[1];

                return (
                    <>
                        <Box key={formItem.id} sx={{ mb: 2 }} className={`${isShowOneByOne ? isForward ? "preview-form-item forward-dir" : "preview-form-item backward-dir" : ""} }`} >
                            <iframe src={`https://www.youtube.com/embed/${videoId}`}
                                key={formItem.id}
                                title='EmbedVideo'
                                className="preview-emd"

                            />
                        </Box>
                    </>
                )


            case 'embedaudio':
                return (
                    <>
                        <Box sx={{ mb: 2 }} className={`${isShowOneByOne ? isForward ? "preview-form-item forward-dir" : "preview-form-item backward-dir" : ""} }`} key={formItem.id}>
                            <audio controls style={{ width: '100%', height: '100%', maxWidth: '800px', minHeight: "50px" }}>
                                <source src={formItem.value} type="audio/mpeg" />
                            </audio>
                        </Box>
                    </>
                )

            case "embedimage":
                return (
                    <>
                        <Box sx={{ mb: 2 }} className={`${isShowOneByOne ? isForward ? "preview-form-item forward-dir" : "preview-form-item backward-dir" : ""} `} key={formItem.id}>
                            <img key={formItem.id} src={formItem.value} alt={`formImage ${formItem.id}`}
                                className="preview-emd" />
                        </Box>
                    </>
                )

            case 'embedanything':
                let anySourceContent
                const value = formItem.value

                if (value.endsWith('.pdf')) {
                    anySourceContent = <iframe src={value} allowFullScreen loading="lazy"
                        className="preview-emd" title="pdfIframe"
                    />
                } else if (value.startsWith('https://www.youtube.com/')) {
                    const youtubeURL = value;
                    const videoId = youtubeURL.split("v=")[1];
                    anySourceContent = <iframe src={`https://www.youtube.com/embed/${videoId}`} allowFullScreen loading="lazy"
                        className="preview-emd" title="videoIframe"
                    />
                } else if ((value.endsWith('.mp3') || value.endsWith('.ogg') || value.endsWith('.wav'))) {
                    anySourceContent = <Box><audio controls style={{ width: '100%', height: '100%', maxWidth: '800px', minHeight: "50px" }}>
                        <source src={value} type="audio/mpeg" />
                    </audio>
                    </Box>
                } else if (value.startsWith('https://www.figma.com/')) {
                    anySourceContent =
                        <iframe
                            src={`https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(value)}`}
                            allowFullScreen
                            loading="lazy"
                            className="preview-emd"
                            title="figmaIframe"
                        />

                } else if (value.startsWith('https://www.twitter.com/') || value.startsWith('https://twitter.com/')) {
                    const tweetId: any = value.split('/').pop();

                    anySourceContent = <Tweet tweetId={tweetId} options={{ width: '100%', height: 100 }} />

                } else if (
                    value.endsWith('.jpg') ||
                    value.endsWith('.jpeg') ||
                    value.endsWith('.png') ||
                    value.endsWith('.gif') ||
                    value.startsWith('https://picsum.photos/')
                ) {
                    anySourceContent = (
                        <img src={value} alt="allImage" className="preview-emd" />
                    );
                } else if (value.startsWith('https://calendly.com/')) {
                    anySourceContent = (
                        <iframe
                            src={value}
                            className='preview-emd'
                            loading="lazy"
                            title="Calendly Embed"
                        />
                    );
                } else {
                    anySourceContent =
                        <Box className='google-maps'>
                            <Box dangerouslySetInnerHTML={{ __html: value }} />
                        </Box>

                }
                return (
                    <>
                        <Box sx={{ mb: 2 }} className={`${isShowOneByOne ? isForward ? "preview-form-item forward-dir" : "preview-form-item backward-dir" : ""} `} key={formItem.id}>
                            {anySourceContent}
                        </Box>
                    </>
                )


            case 'rating':
                return (
                    <>
                        <Box sx={{ mb: 2 }} className={`${isShowOneByOne ? isForward ? "preview-form-item forward-dir" : "preview-form-item backward-dir" : ""} `} key={formItem.id}>
                            <Box sx={{ position: "relative" }}>
                                <Box sx={{ display: "flex" }}>
                                    <Typography className="preview-header" dangerouslySetInnerHTML={{ __html: formItem.labelName }}></Typography>
                                    {formItem.isRequired && <Box component="span" style={{ color: "red", fontSize: "20px", position: "relative", right: "0px", top: "-2px" }}>*</Box>}


                                </Box>


                            </Box>

                            <Typography className="preview-label-desc" dangerouslySetInnerHTML={{ __html: (formItem.description && formItem.description.length) ? formItem.description : "" }}></Typography>
                            <Stack>

                                <Stack sx={{ mt: "10px" }}>
                                    <Rating
                                        sx={{ width: "200px" }}
                                        icon={<StarRateIcon fontSize="large" sx={{ color: "rgb(4 69 175 / 50%)" }} />}
                                        emptyIcon={<StarBorderIcon fontSize="large" />}
                                        value={Number(localFieldsState?.[formItem.id])}
                                        name={(formItem.id) ? formItem.id.toString() : ""}
                                        onChange={(event, newValue) => {
                                            setIdVal(formItem.id);
                                            handleLocalChange(event);
                                            formik.setFieldValue(formItem.id, newValue);
                                            debouncedFormikHandleChange(event);
                                        }}
                                        onKeyUp={(e) => {
                                            debouncedFormikHandleChange(e);
                                        }}
                                    />
                                    {isShowOneByOne && <Box className="preview-label-error">
                                        {
                                            (formik.errors[formItem.id] && isSubmitted) ? <div>{formik.errors[formItem.id] as string}</div> : null
                                        }

                                    </Box>}
                                </Stack>
                            </Stack >
                        </Box >
                    </>
                )


            case 'ranking':
                return (
                    <>
                        <Box className={`${isShowOneByOne ? isForward ? "preview-form-item forward-dir" : "preview-form-item backward-dir" : ""} `} key={formItem.id}>

                            <Box sx={{ position: "relative" }}>
                                <Box sx={{ display: "flex" }}>
                                    <Typography className="preview-header" dangerouslySetInnerHTML={{ __html: formItem.labelName }}></Typography>
                                    {formItem.isRequired && <Box component="span" style={{ color: "red", fontSize: "20px", position: "relative", right: "0px", top: "-2px" }}>*</Box>}


                                </Box>


                            </Box>

                            <Box className="preview-label-desc1" dangerouslySetInnerHTML={{ __html: (formItem.description && formItem.description.length) ? formItem.description : "" }}>
                            </Box>
                            <RankingComponent isFromPreview={true} field={formItem} changeHandler={formik} getRankValues={getRankValues} optionsList={formik.values[formItem.id]} />

                            {isShowOneByOne && <Box className="preview-label-error">
                                {formik.errors[formItem.id] && isSubmitted ? <div>{formik.errors[formItem.id] as string}</div> : null}
                            </Box>}
                        </Box>
                    </>
                )

            case 'opinionscale':
                return (
                    <>
                        <Box sx={{ mb: 2, width: '100%' }} className={`${isShowOneByOne ? isForward ? "preview-form-item forward-dir" : "preview-form-item backward-dir" : ""} `} key={formItem.id}>
                            <Box sx={{ position: "relative" }}>
                                <Box sx={{ display: "flex" }}>
                                    <Typography className="preview-header" dangerouslySetInnerHTML={{ __html: formItem.labelName }}></Typography>
                                    {formItem.isRequired && <Box component="span" style={{ color: "red", fontSize: "20px", position: "relative", right: "0px", top: "-2px" }}>*</Box>}


                                </Box>


                            </Box>

                            <Typography className="preview-label-desc" dangerouslySetInnerHTML={{ __html: (formItem.description && formItem.description.length) ? formItem.description : "" }}></Typography>
                            <Stack key="${index}" className="opinion-container radio-button">
                                <Stack sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: "4px",
                                    width: '100%'
                                }}>

                                    {
                                        formItem.choices?.map((item: any, index: number) => (
                                            <div key={index} style={{ backgroundColor: formik.values[formItem.id] == item ? "rgb(4 69 175 / 30%)" : "", width: '100%', }}>
                                                <input type="radio" id={formItem.id + "id" + index} name={formItem.id.toString()} value={item} onChange={(e: any) => {
                                                    setIdVal(formItem.id);
                                                    debouncedFormikHandleChange(e);
                                                    handleOpinionChange(e, formItem)
                                                }}
                                                />
                                                <label htmlFor={formItem.id + "id" + index} className="opinion-child-container preview-label" >
                                                    {item}
                                                </label>
                                            </div>
                                        ))
                                    }

                                </Stack>
                                {isShowOneByOne && <Box className="preview-label-error">
                                    {(formik.errors[formItem.id] && isSubmitted) ? <div>{formik.errors[formItem.id] as string}</div> : null}
                                </Box>}

                            </Stack>
                        </Box>
                    </>
                )

            case 'netprometer':
                return (
                    <>
                        <Box sx={{ mb: 2 }} className={`${isShowOneByOne ? isForward ? "preview-form-item forward-dir" : "preview-form-item backward-dir" : ""} `} key={formItem.id}>
                            <Box sx={{ position: "relative" }}>
                                <Box sx={{ display: "flex" }}>
                                    <Typography className="preview-header" dangerouslySetInnerHTML={{ __html: formItem.labelName }}></Typography>
                                    {formItem.isRequired && <Box component="span" style={{ color: "red", fontSize: "20px", position: "relative", right: "0px", top: "-2px" }}>*</Box>}
                                </Box>
                            </Box>

                            <Typography className="preview-label-desc" dangerouslySetInnerHTML={{ __html: (formItem.description && formItem.description.length) ? formItem.description : "" }}></Typography>
                            <Stack key="${index}" className="radio-button">

                                <Stack sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: "4px",
                                }}>

                                    {
                                        opinionScaleArray.map((item: any, index: number) => (
                                            <div style={{ backgroundColor: formik.values[formItem.id] == item ? "rgb(4 69 175 / 30%)" : "" }} className="net-main" key={index}>
                                                <input type="radio" id={formItem.id + "net" + index} name={formItem.id.toString()} value={item} onChange={(e) => {
                                                    setIdVal(formItem.id);
                                                    handleRadioChange(e, formItem);
                                                    debouncedFormikHandleChange(e);
                                                }}
                                                    onKeyUp={(e) => {
                                                        debouncedFormikHandleChange(e);
                                                    }}
                                                />
                                                <label htmlFor={formItem.id + "net" + index} className="opinion-child-container net-prometer" >

                                                    {item}
                                                </label>
                                            </div>
                                        ))
                                    }

                                </Stack>

                                <Stack
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        marginTop: "5px",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontFamily: "Segoe UI",
                                            fontSize: "14px",
                                            fontWeight: "400",
                                            color: "#1a1a1a",
                                        }}
                                    >
                                        Not Likely
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontFamily: "Segoe UI",
                                            fontSize: "14px",
                                            fontWeight: "400",
                                            color: "#1a1a1a",
                                        }}
                                    >
                                        Extremely Likely
                                    </Typography>
                                </Stack>

                                {isShowOneByOne && <Box className="preview-label-error">
                                    {
                                        (formik.errors[formItem.id] && isSubmitted) ? <div>{formik.errors[formItem.id] as string}</div> : null
                                    }
                                </Box>}
                            </Stack>

                        </Box>
                    </>
                )

            case "dropdown":
                return (
                    <>
                        <Box sx={{ mb: 2 }} className={`${isShowOneByOne ? isForward ? "preview-form-item forward-dir" : "preview-form-item backward-dir" : ""} `} key={formItem.id}>
                            <Box sx={{ position: "relative" }}>
                                <Box sx={{ display: "flex" }}>
                                    <Typography className="preview-header" dangerouslySetInnerHTML={{ __html: formItem.labelName }}></Typography>
                                    {formItem.isRequired && <Box component="span" style={{ color: "red", fontSize: "20px", position: "relative", right: "0px", top: "-2px" }}>*</Box>}


                                </Box>


                            </Box>

                            <Box className="preview-label-desc1" dangerouslySetInnerHTML={{ __html: (formItem.description && formItem.description.length) ? formItem.description : "" }}>
                            </Box>

                            <AutocompleteComponent field={formItem} changeHandler={formik} name={formItem.id.toString()} getSelectedValue={getSelectedValue} dropdownValue={formik.values[formItem.id]} />

                            {isShowOneByOne && <Box sx={{ fontWeight: "400" }} className="preview-label-error">
                                {
                                    (formik.errors[formItem.id] && isSubmitted) ? <div>{formik.errors[formItem.id] as string}</div> : null
                                }
                            </Box>}
                        </Box>
                    </>
                )

            case "fileupload":
                return (
                    <>
                        <Box sx={{ mb: 2 }} className={`${isShowOneByOne ? isForward ? "preview-form-item forward-dir" : "preview-form-item backward-dir" : ""} `} key={formItem.id}>
                            <Box sx={{ position: "relative" }}>
                                <Box sx={{ display: "flex" }}>
                                    <Typography className="preview-header" dangerouslySetInnerHTML={{ __html: formItem.labelName }}></Typography>
                                    {formItem.isRequired && <Box component="span" style={{ color: "red", fontSize: "20px", position: "relative", right: "0px", top: "-2px" }}>*</Box>}


                                </Box>

                            </Box>

                            <Box className="preview-label-desc1" dangerouslySetInnerHTML={{ __html: (formItem.description && formItem.description.length) ? formItem.description : "" }}>
                            </Box>
                            <FileUploadComponent isPreview={true} getFile={getFile} changeHandler={formik} name={formItem.id.toString()} width={"100%"} field={formItem} indexVal={formIndex} fileData={formik.values[formItem.id]} />

                            {isShowOneByOne && <Box className="preview-label-error">
                                {formik.errors[formItem.id] && isSubmitted ? <div>{formik.errors[formItem.id] as string}</div> : null}
                            </Box>}
                        </Box>
                    </>
                )
            default: return null;
        }
    }


    const onSaveChangesCalled = (e: any) => {
        formik.submitForm();
        e.preventDefault();
        setIsSubmitted(true);
        setIsForward(true);
        if (!formik.errors[selectedId]) {
            setCurrentSelectedIndex(currentSelectedIndex + 1);
            let tempAct = currentSelectedIndex + 1;
            setIsSubmitted(false);
            let data = formData.filter((form: any) => HIDE_COMPONENTS.indexOf(form.fieldType) === -1 && form.displayName !== 'Conditional Logic');
            setSelectedId((data[tempAct]?.id) ? data[tempAct]?.id : "");
            let width: any = 100 / data.length
            setProgress((prev: any) => prev + width)
            setPageData(data);
            if ((data.length === tempAct) || !isShowOneByOne || (data.length === currentSelectedIndex)) {
                setIsFormSubmitted(true);
                if (isShowOneByOne) {
                }
                
                let resultToPass = Object.keys(formik.values).map(
                    key => (
                        {
                            quesId: key,
                            answer: formik.values[key],
                            quesType: ""
                        }
                    )
                );
                let dataToSaveForDB = Object.keys(formik.values).map(
                    key => ({
                        question: "",
                        quesId: key,
                        answer: formik.values[key],
                        datakey: ""
                    })
                );;

                for (let tf = 0; tf < resultToPass.length; tf++) {
                    let tempObj = formData.find((c: any) => c.id?.toString() === resultToPass[tf]?.quesId?.toString());
                    if (tempObj?.inputType === "label") {

                    } else {
                        dataToSaveForDB[tf].question = (tempObj?.labelName) ? tempObj?.labelName : "";
                        dataToSaveForDB[tf].datakey = (tempObj?.datakey) ? tempObj?.datakey : "";
                        resultToPass[tf].quesType = (tempObj?.inputType) ? tempObj?.inputType : "";
                        if (tempObj?.inputType === "fileupload") {
                            resultToPass[tf].answer = tempObj.value;
                            dataToSaveForDB[tf].answer = tempObj.value;
                        }
                        else if (tempObj?.inputType === "checkbox") {
                            resultToPass[tf].answer = tempObj.checked ? "Yes" : "No";
                            dataToSaveForDB[tf].answer = tempObj.checked ? "Yes" : "No";
                            dataToSaveForDB[tf].question = tempObj.checkboxOption?.value;
                        }
                        else if ((tempObj?.fieldType === "address") || (tempObj?.fieldType === "rating")) {
                            resultToPass[tf].answer = JSON.stringify(resultToPass[tf].answer);
                            dataToSaveForDB[tf].answer = JSON.stringify(dataToSaveForDB[tf].answer);
                        }
                        else if ((tempObj?.fieldType === "ssn")) {
                            resultToPass[tf].answer = tempObj.actVal;
                            dataToSaveForDB[tf].answer = tempObj.actVal;
                        }
                        else if ((tempObj?.fieldType === "multiplechoice")) {
                            resultToPass[tf].answer = JSON.stringify(resultToPass[tf].answer.toString());
                            dataToSaveForDB[tf].answer = JSON.stringify(resultToPass[tf].answer.toString());
                        }
                    }
                }

                if (!isPreview && !Object.keys(formik.errors).length) {
                    saveCandidateData(resultToPass, dataToSaveForDB);
                }
                if (!isShowOneByOne && Object.keys(formik.errors).length) {
                    showToaster('Please fill all the required fields.', 'error');
                }
            }
        }
    }

    return (
        <div className={`componentView ${isShowOneByOne ? '' : 'showAllFields'}`} style={{ paddingTop: isPreview ? 0 : '10px' }}>
            <div className={`moduleView ${displayView} ${isMobileSafari ? 'isMobileSafari' : 'isNotMobileSafari'}`}>

                <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="stretch"
                    className={`${isPreview ? 'preview' : ''}`}
                >

                    <Grid
                        size={12}
                    >

                        {/*  */}
                        <form onSubmit={(e: any) => onSaveChangesCalled(e)} className={`previewContainter`}>
                            {
                                isShowOneByOne && <Box>
                                    {
                                        !isPreview ?
                                            <Typography className="formTitle">
                                                {formName}
                                            </Typography>
                                            :
                                            null
                                    }
                                    <LinearProgress variant="determinate" value={progress} />

                                </Box>
                            }
                            <div className="onlyFoe">
                                <Grid
                                    container
                                    direction="column"
                                    className={`formInputsGrid ${isForward ? "forward-dir" : "backward-dir"}`}
                                >
                                    {currPageElements && currPageElements?.map((formItem: any, formIndex: number) => {
                                        return (
                                            <div className={`${((currentSelectedIndex === formIndex) || !isShowOneByOne) ? "" : "d-none"}`} key={formItem.id}>
                                                {
                                                    formElementByItem(formItem, formIndex)
                                                }
                                                {
                                                    !isShowOneByOne ?
                                                        <ErrorMessage formikObj={formik} name={formItem.id} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                                        :
                                                        null
                                                }
                                                {

                                                    (displayView !== "mobile") ?
                                                        <Grid
                                                            container
                                                            direction="row"
                                                            justifyContent="flex-start"
                                                            alignItems="center"
                                                            // sx={{ my: 6 }}
                                                        >

                                                            {

                                                                isShowOneByOne ? (currentSelectedIndex === (pageData.length - 1)) ?
                                                                    <Button size="small" variant="contained" type="submit" endIcon={<DoneIcon />}
                                                                        style={{ marginLeft: "2em" }}>Submit</Button>
                                                                    :
                                                                    <Button size="small" variant="contained" type="submit" endIcon={<DoneIcon />}
                                                                        style={{ marginLeft: "20px" }}>Ok</Button>
                                                                    :
                                                                    null

                                                            }
                                                        </Grid>
                                                        :
                                                        null
                                                }
                                            </div>
                                        )
                                    })}
                                    {isShowOneByOne && (currentSelectedIndex == (pageData.length)) && !isFormSubmitted &&
                                        < Button size="small" variant="contained" type="submit" endIcon={<DoneIcon />}
                                            style={{ marginLeft: "2em" }}>Submit</Button>}

                                    {
                                        isFormSubmitted && isShowOneByOne ?
                                            <Grid style={{ margin: "0 2em" }}>
                                                <Grid>Thank you for your response. Our Team will get in touch with you shortly for further proceedings.</Grid>
                                                <Grid>Please wait. You will be redirected in {counter} seconds</Grid>
                                            </Grid>
                                            :
                                            null
                                    }

                                </Grid>
                            </div>
                            {
                                (displayView === "mobile") && !isFormSubmitted ?
                                    <Grid className={`${isForward ? "forward-dir" : "backward-dir"}`} container
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="center"
                                        sx={{ my: 1 }}
                                    >
                                        {
                                            isShowOneByOne ? (currentSelectedIndex === (pageData.length - 1)) ?
                                                <Button size="small" variant="contained" type="submit" endIcon={<DoneIcon />}>Submit</Button>   
                                                :
                                                <Button size="small" variant="contained" type="submit" endIcon={<DoneIcon />} >Ok</Button>    
                                                :
                                                null

                                        }
                                    </Grid>
                                    :
                                    null
                            }

                            <Grid size={12}>

                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                >

                                    {!isShowOneByOne ?
                                        <>

                                            <Button variant="contained" type="submit">
                                                {currentSelectedIndex < (arrayList.length - 1) && arrayList[currentSelectedIndex + 1].length > 0 ? getPageBreakValue() : "Submit"}
                                            </Button>
                                        </>
                                        :
                                        <>
                                            {
                                                !isFormSubmitted ?

                                                    <ButtonGroup variant="contained" size="small" aria-label="small button group">
                                                        <IconButton aria-label="Previuos" color="primary" onClick={formBackBtn} disabled={currentSelectedIndex === 0} size="small">
                                                            <KeyboardArrowUpIcon />
                                                        </IconButton>
                                                        <IconButton aria-label="Next" color="primary" disabled={currentSelectedIndex === (formData.length - 1) || currentSelectedIndex === formData.length} type="submit" size="small">
                                                            <KeyboardArrowDownIcon />
                                                        </IconButton>
                                                    </ButtonGroup>
                                                    :
                                                    null
                                            }
                                        </>

                                    }

                                </Grid>
                            </Grid>

                        </form>

                    </Grid >

                    {
                        isPreview ?
                            <Grid size={12}>
                                < Grid
                                    container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <ToggleButtonGroup
                                        color="primary"
                                        value={displayView}
                                        exclusive
                                        onChange={(e, val) => { setDisplayView(val) }}
                                        aria-label="Device Type"
                                        size="small"
                                        sx={{ mt: 2 }}
                                    >
                                        <ToggleButton value="mobile">Mobile</ToggleButton>
                                        <ToggleButton value="desktop">Desktop</ToggleButton>
                                    </ToggleButtonGroup>
                                </Grid >
                            </Grid >
                            :
                            null
                    }
                </Grid >
            </div>
        </div>

    )
}
export default PreviewComponent;