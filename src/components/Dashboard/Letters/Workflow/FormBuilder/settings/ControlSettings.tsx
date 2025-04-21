import  {React} from '../../../../../../shared/modules/React';
import {Box} from '../../../../../../shared/modules/MaterialImports/Box';
// import Popper from '@mui/material/Popper';
import {Typography} from '../../../../../../shared/modules/MaterialImports/Typography';
import {Grid} from '../../../../../../shared/modules/MaterialImports/Grid';
// import Button from '@mui/material/Button';
// import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
// import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
// import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import {FormGroup} from '../../../../../../shared/modules/MaterialImports/FormGroup';
import {TextField,FormControl,FormControlLabel} from '../../../../../../shared/modules/MaterialImports/FormInputs';
// import Switch, { SwitchProps } from '@mui/material/Switch';
import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
import {MenuItem} from '../../../../../../shared/modules/MaterialImports/Menu';
import {ListItemText} from '../../../../../../shared/modules/MaterialImports/List';
import  { SelectChangeEvent } from '@mui/material/Select';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {Popover} from '../../../../../../shared/modules/MaterialImports/Popover';
import {Select,Checkbox} from '../../../../../../shared/modules/MaterialImports/FormElements';

import { getSettings } from '../shared/utills/Constants';
import { FormStore } from "../../../../../../App";
import './Controls.scss'
import { MUIAutoComplete } from '../../../../../shared/MUIAutoComplete/MUIAutoComplete';
// import { date } from 'yup';
// import { Stack } from '@mui/material';




const BpIcon = styled("span")(({ theme }) => ({
    borderRadius: 1,
    width: 18,
    height: 18,
    backgroundColor: "#ffffff",
}));

const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: 'var(--c-primary-color)',
    "&:before": {
        display: "block",
        width: 18,
        height: 18,
        backgroundImage:
            "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
            " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
            "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
        content: '""',
    },
});

const BpCheckboxContainer = styled("div")({
    ".bp-icon": {
        border: "1px var(--c-secondary-color) solid",
    },
    "& .bp-checkbox:hover .bp-icon": {
        borderColor: 'var(--c-primary-color)',
    },
    // "& .bp-checkbox .bp-icon.checked": {
    //   border: "none", // Remove border when checked
    // },
    // "& .bp-checkbox.checked:hover .bp-icon": {
    //   borderColor: "transparent", // Remove border when checked and hovered
    // },
});

// const Android12Switch = styled(Switch)(({ theme }) => ({
//     padding: 8,
//     '& .MuiSwitch-track': {
//         borderRadius: 22 / 2,
//         '&:before, &:after': {
//             content: '""',
//             position: 'absolute',
//             top: '50%',
//             transform: 'translateY(-50%)',
//             width: 16,
//             height: 16,
//         },
//         '&:before': {
//             backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
//                 theme.palette.getContrastText(theme.palette.primary.main),
//             )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
//             left: 12,
//         },
//         '&:after': {
//             backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
//                 theme.palette.getContrastText(theme.palette.primary.main),
//             )}" d="M19,13H5V11H19V13Z" /></svg>')`,
//             right: 12,
//         },
//     },
//     '& .MuiSwitch-thumb': {
//         boxShadow: 'none',
//         width: 16,
//         height: 16,
//         margin: 2,
//     },
// }));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: "auto",
            zIndex: "35001"
        },
    },
};

const inputFormats = ["Text", "Numeric", "Numeric with decimal"]

interface SettingsProps {
    anchorElement: any;
    handleMenuClose: (value: any) => void;
    fieldValue: string;
    indexVal: number;
    field: any;
    reload: boolean;
    handleReload: (value: boolean) => void;
    selectedField: any,
    labelValue: string;
    labelStateChangeCallback: () => void;
}


// const inputTypes = [
//     "Text Input",
//     "Textarea"
// ]

// const users = [
//     "John",
//     "Amith"
// ]
// import { shallow } from 'zustand/shallow';
// import useFormBuilderStore, { FORMBUILDER_STATE } from '../../../../../../shared/store/FormBuilderStore';


// const formBuilderSelector = (state: FORMBUILDER_STATE) => ({
//     formData: state.formData,
//     setFormData: state.setFormData
// });

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const ControlSettings: React.FC<SettingsProps> = ({ anchorElement, handleMenuClose, fieldValue, indexVal, field, reload, handleReload, selectedField }) => {
    const open = Boolean(anchorElement);
    const [formData, setFormData] = React.useContext(FormStore);
    // const { formData, setFormData } = useFormBuilderStore(formBuilderSelector, shallow);
    const [placeholderValue, setplaceholderValue] = React.useState("")
    const [labelNameValue, setlabelNameValue] = React.useState(field.labelName)
    const [inputType, setInputType] = React.useState<string[]>([]);
    // const [userName, setUser] = React.useState<string[]>([]);
    const [isShowAdvanced, setShowAdvanced] = React.useState(false)
    const [helpTextValue, setHelpText] = React.useState("")
    const [dateValidations, setDateValidations] = React.useState(["15 years", "20 Years"])
    const [dateValidationValue, setDateValue] = React.useState<string[]>([])
    const [conditionValue, setConditionValue] = React.useState<string[]>([])
    const [dateTypes, setDateTypes] = React.useState(["MM/yyyy", "MM/dd/yyyy"])
    const [dateType, setDateType] = React.useState<string[]>([])
    const [isReadonly, setReadonly] = React.useState(false)
    const [enableAutocomplete, setEnabelAuto] = React.useState(false)
    const [isAddressValidation, setAddressValidation] = React.useState(false)
    const [showMaxText, setShowMaxText] = React.useState((field.maxCharacter && field.maxCharacter !== "") ? true : false)
    const [maxTextValue, setMaxTextValue] = React.useState("")
    const [isMasked, setIsMasked] = React.useState(false)
    const [settings, setSettings] = React.useState<any[]>([])
    const [isPrefillClick, setIsPrefillClick] = React.useState(false)
    const [prefillDropDown, setPrefillDropDown] = React.useState('');
    const [checked, setChecked] = React.useState(false)
    const [isEnableValidation, setEnableValidation] = React.useState(false)
    const [rangeMin, setRangeMin] = React.useState(1);
    const [rangeMax, setRangeMax] = React.useState(10)
    const [isValidate, setIsValidate] = React.useState(false);
    const [isResume, setIsResume] = React.useState(false)
    const [points, setPoints] = React.useState(field.weightedPoints);
    const [correctAnswer, setCorrectAnswer] = React.useState(field.weightedCorrectAnswer);
    const [customFieldMap, setCustomFieldMap] = React.useState({
        id: field.map ? field.map.replace(/[- {}]/g, '') : "",
        name: field.map ? field.map : "",
    });

    const handleValidatePhone = (e: any) => {
        const value = e?.target?.checked;
        setIsValidate(value)
        let index = formData.findIndex((form: any) => form.id === field.id)
        // console.log(formData[index], 'formData[index]')
        if (formData[index].isValidate !== undefined) {
            formData[index].isValidate = value
        }
    }

    const handleIsResume = (e: any) => {
        const value = e?.target?.checked;
        setIsResume(value);
        let index = formData.findIndex((form: any) => form.id === field.id);
        if (formData[index].isResume !== undefined) {
            formData[index].isResume = value;
        }
    }

    const handleopinionRangeMin = (e: any) => {
        console.log(e.target.value, "here in select")
        setRangeMin(e.target.value)
    }

    const handleopinionRangeMax = (e: any) => {

        setRangeMax(e.target.value)
    }

    React.useEffect(() => {
        let options: any[] = []
        for (let i = rangeMin; i <= rangeMax; i++) {
            let toStr = i.toString()
            options.push(toStr)
        }
        if (field.fieldType === "opinionscale") {
            formData.forEach((obj: any, idx: number, fdArr: any[]) => {
                if (obj.id === field.id) {
                    fdArr[idx] = { ...obj, choices: options, maxValue: rangeMax, minValue: rangeMin };
                }
            });
        }
    }, [rangeMax, rangeMin])

    const handleConditionVal = (e: any) => {
        const {
            target: { value },
        } = e;
        setConditionValue(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        updateDateDependency(value, "conditions")
    }

    const handleDateTypes = (e: any) => {
        const {
            target: { value },
        } = e;
        setDateType(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        sessionStorage.setItem("dateformat", e.target.value)
    }

    const handleReadonly = (e: any) => {
        const value = e?.target?.checked;
        setReadonly(value)
        let index = formData.findIndex((form: any) => form.id === field.id)
        // console.log(formData[index], 'formData[index]')
        if (formData[index].readonly !== undefined) {
            formData[index].readonly = !formData[index].readonly;;
        }
    }

    React.useEffect(() => {
        if (field.readonly !== undefined) {
            setReadonly(field.readonly)
        }

        if (sessionStorage.getItem("dateformat")) {
            let date_format: string[] = [JSON.stringify(sessionStorage.getItem("dateformat"))];
            let final_format = [date_format[0].replace(/"/g, "")]
            setDateType(final_format)
        }
        else {
            setDateType(["MM/dd/yyyy"])
        }
        if (field.fieldType === "address")
            setEnabelAuto(field.enableAutocomplete)
        setAddressValidation(field.enableAddressValidation)

        if (field.fieldType === "date")
            setEnableValidation(field.enableDependencyVaildation)

        if (field.fieldType === "textbox") {
            if (field.maxCharacter) {
                setMaxTextValue(field.maxCharacter)
            }
            else {
                setShowMaxText(false)
            }
        }
        if (field.allowedInputs) {
            // let allowedInputVal = []
            // allowedInputVal.push(field.allowedInputs)
            setInputType(field.allowedInputs)
        }
        else {
            setInputType([])
        }

        if (field.fieldType === "opinionscale") {
            // console.log(field, 'fied')
            setRangeMax(Number(field.maxValue))
            setRangeMin(Number(field.minValue))
        }

        setChecked(field.isRequired)
        if (field.isMask) {
            setIsMasked(field.isMask)
        }
        else {
            setIsMasked(false)
        }

        if (field.description) {
            setHelpText(field.description)
        }
        else {
            setHelpText("")
        }

        if (field.placeholder) {
            setplaceholderValue(field.placeholder)
        }
        else {
            setplaceholderValue("")
        }
        if (field.isValidate !== undefined) {
            setIsValidate(field.isValidate)
        }
        else {
            setIsValidate(false)
        }
        if (field.isResume !== undefined) {
            setIsResume(field.isResume)
        }
        else {
            setIsResume(false)
        }

    }, [anchorElement])

    const handleDateValidation = (event: SelectChangeEvent<typeof dateValidationValue>) => {
        const {
            target: { value },
        } = event;
        setDateValue(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        updateDateDependency(value, "otherfield")
    }

    React.useEffect(() => {
        if (field.fieldType === "date") {
            let [conditions, otherFields] = field.dateConditions?.dependencyObjs;
            if (conditions.value) {
                setConditionValue(conditions.value)
            }
            if (otherFields.value) {
                setDateValue(otherFields.value)
            }
        }


        // console.log(conditions, 'conditionsconditions')
    }, [])

    const updateDateDependency = (value: any, type: string) => {
        formData.forEach((obj: any, idx: number, fdArr: any[]) => {
            if (obj.id === field.id && field.fieldType === "date") {
                let dateConditionsVal = field.dateConditions;
                let dateDepenedencyArr = field.dateConditions.dependencyObjs;
                let updatedVal = dateDepenedencyArr.map((dateCon: any) => {
                    if (dateCon.type === type) {
                        dateCon.value = typeof value === 'string' ? value.split(',') : value
                    }
                    return dateCon;
                })
                dateConditionsVal.dependencyObjs = updatedVal;
                fdArr[idx] = { ...obj, dateConditions: dateConditionsVal };
            }
        });
    }

    React.useEffect(() => {
        let staticData = ["15 years", "20 years"]
        let dateValues: any[] = []
        dateValues = formData.filter((form: any) => form.inputType === "date").map((date: any) => date.labelName).filter((val: any) => val !== field.labelName);
        setDateValidations([...staticData, ...dateValues])
    }, [anchorElement])

    const handlePlaceholder = (e: any) => {
        setplaceholderValue(e.target.value);
        if (formData[indexVal] && formData[indexVal].hasOwnProperty('placeholder')) {
            formData[indexVal].placeholder = e.target.value
        }
    }
    const handleHelpText = (e: any) => {
        const value = e?.target?.value;
        setHelpText(value);

        if (Object(field).hasOwnProperty('helptext')) {
            formData.forEach((obj: any, idx: number, fdArr: any[]) => {
                if (obj.id === field.id) {
                    fdArr[idx] = { ...obj, description: value };
                }
            });
        }
    }

    const handleInputChange = (event: SelectChangeEvent<typeof inputType>) => {
        const {
            target: { value },
        } = event;
        setInputType(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleAddressValidation = (e: any) => {
        const value = e?.target?.checked;
        setAddressValidation(value)
        let index = formData.findIndex((form: any) => form.id === field.id)
        if (value) {
            formData[index].isRequired = true;
            setChecked(true)
        }
        formData[index].enableAddressValidation = value;
    }

    const updateFormData = () => {
        setFormData([...formData]);
    }

    const handleClose = () => {
        updateFormData();
        handleMenuClose(null);
    }

    React.useEffect(() => {
        if (getSettings(fieldValue)[0]) {
            let settingValue = Object.keys(getSettings(fieldValue)[0])
            setSettings(settingValue)
        }
    }, [anchorElement])

    React.useEffect(() => {
        setlabelNameValue(field.labelName);
    }, [field.labelName])

    React.useEffect(() => {
        setCorrectAnswer(field.weightedCorrectAnswer);
    }, [field.weightedCorrectAnswer])

    React.useEffect(() => {
        setPoints(field.weightedPoints);
    }, [field.weightedPoints])

    const handlePopupPrefill = () => {
        setIsPrefillClick(true)
    }

    const handleChangePrefillDropDown = (event: SelectChangeEvent) => {
        setPrefillDropDown(event.target.value as string);
    };

    const handleChangeMaskData = (e: any) => {
        const value = e?.target?.checked;
        setIsMasked(value);
        // setEnabelAuto(value)
        let index = formData.findIndex((form: any) => form.id === field.id);
        formData[index].isMask = value;
    }


    const hanldeRequired = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleReload(!reload)
        setChecked(event.target.checked);
        let index = formData.findIndex((form: any) => form.id === field.id)
        formData[index].isRequired = event.target.checked;
    }

    const hanldeAutoComplete = (e: any) => {
        setEnabelAuto(e.target.checked)
        let index = formData.findIndex((form: any) => form.id === field.id)
        // console.log(formData[index], 'formData[index]')
        formData[index].enableAutocomplete = !formData[index].enableAutocomplete;;
    }
    const handleShowDateVaildation = (e: any) => {
        setEnableValidation(e.target.checked)
        let index = formData.findIndex((form: any) => form.id === field.id)
        // console.log(formData[index], 'formData[index]')
        formData[index].enableDependencyVaildation = !formData[index].enableDependencyVaildation;;
    }

    const changeLabel = (event: any) => {
        const newContent = event.target.value;
        setlabelNameValue(newContent);
        formData.forEach((obj: any, idx : number , fdArr: any[]) => {
            if (obj.id === field.id) {
                fdArr[idx] = { ...obj, labelName: newContent};
            }
        });
    }

    const changePoints = (event: any) => {
        const value = event?.target?.checked;
        setPoints(value);
        formData.forEach((obj: any, idx: number, fdArr: any[]) => {
            if (obj.id === field.id) {
                fdArr[idx] = { ...obj, weightedPoints: value };
            }
            return obj;
        });
    }

    const changeCorrectAnswer = (event: any) => {
        const newContent = event.target.value;
        setCorrectAnswer(newContent);
        formData.forEach((obj: any, idx: number, fdArr: any[]) => {
            if (obj.id === field.id) {
                fdArr[idx] = { ...obj, weightedCorrectAnswer: newContent };
            }
        });
    }

    const handleMappingChange = (id: any, name: string) => {
        setCustomFieldMap({ id: id, name: name });
        formData.forEach((obj: any, idx : number , fdArr: any[]) => {
            if (obj.id === field.id) {
                fdArr[idx] = { ...obj, map: name};
            }
        });
    }

    React.useEffect(() => {
        formData.forEach((obj: any, idx: number, fdArr: any[]) => {
            if (obj.id === field.id) {
                fdArr[idx] = { ...obj, allowedInputs: inputType };
            }
        });
    }, [inputType])

    React.useEffect(() => {
        if (Object(field).hasOwnProperty("maxCharacter")) {
            formData.forEach((obj: any, idx: number, fdArr: any[]) => {
                if (obj.id === field.id) {
                    fdArr[idx] = { ...obj, maxCharacter: maxTextValue };
                }
            });
        }
    }, [anchorElement, maxTextValue])


    return (
        (<Box sx={{ background: "#f7f8f9" }} >
            <Popover open={open} anchorEl={anchorElement} onClose={handleClose}
                sx={{
                    zIndex: "4",
                }} id="control-settings"
                PaperProps={{
                    style: { width: '380px', },
                }}
                // anchorReference="anchorPosition"
                // anchorPosition={{ top: 80, left: 875 }}
                // anchorReference="anchorPosition"
                // anchorPosition={{ top: 400, left: 885 }}
                // anchorOrigin={{
                //     // vertical: 'top',
                //     vertical: 'center',
                //     horizontal: 'right',
                // }}
                transformOrigin={{
                    // vertical: 'top',
                    vertical: 'center',
                    horizontal: 'left',
                }}
                className="control-settings popover-content"
            >

                <Paper className='controlSettingsPaper' >
                    <Box sx={{ display: "flex", justifyContent: "space-between", }}>
                        <Box sx={{ fontSize: "13px", textTransform: "uppercase", color: "#727a83" }}>Component Settings</Box>
                        {/* <Box>
                            <ContentCopyOutlinedIcon sx={{ fontSize: "21px", color: "#727a83", mr: 2 }} />
                            <DeleteIcon sx={{ fontSize: "24px", color: "#727a83" }} />
                        </Box> */}
                    </Box>
                    <Grid container sx={{ alignItems: "center", justifyContent: "center", maxHeight: "370px", overflow: "auto" }}>
                        <Grid size={12} className="section-grid" sx={{ paddingBottom: "6px" }}>
                            <Box className="row">
                                <Typography className="row-label">
                                    Label
                                </Typography>
                                <Box>
                                    <TextField variant="outlined"
                                        value={labelNameValue}
                                        sx={{
                                            '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                                color: '#1A1A1A',
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
                                        onChange={changeLabel}
                                        inputProps={{
                                            style: {
                                                height: "4px",
                                            },
                                        }} />
                                </Box>
                            </Box>
                        </Grid>
                        <Grid size={12} className="section-grid">
                            <Box className="row">
                                <Typography className="row-label">
                                    Required
                                </Typography>
                                <Box className="required-label">
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                // < Android12Switch checked={checked} onChange={hanldeRequired} />

                                                <BpCheckboxContainer>
                                                    <Checkbox
                                                        {...label}
                                                        className="bp-checkbox"
                                                        disableRipple
                                                        checked={checked}
                                                        onChange={hanldeRequired}
                                                        checkedIcon={
                                                            <BpCheckedIcon
                                                                className="bp-icon"
                                                                style={{
                                                                    borderColor: 'var(--c-primary-color)',
                                                                }}
                                                            />
                                                        }
                                                        icon={
                                                            <BpIcon
                                                                className="bp-icon"
                                                                sx={{
                                                                    border: "1px solid var(--c-secondary-color)",
                                                                    borderRadius: "1px",
                                                                }}
                                                            />
                                                        }
                                                    />
                                                </BpCheckboxContainer>
                                            }
                                            label=""
                                        />
                                    </FormGroup>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid size={12} className="section-grid">
                            <Box className="row">
                                <Typography className="row-label">
                                    Map
                                </Typography>
                                <Box>
                                    <MUIAutoComplete
                                        id='appJob'
                                        handleChange={(id: any, name: string) => {
                                            handleMappingChange(id, name)
                                        }}
                                        valuePassed={{ id: customFieldMap.id, label: customFieldMap.name }}
                                        isMultiple={false}
                                        width="196px"
                                        type='customFields'
                                        placeholder="Select Custom Field"
                                    />
                                </Box>
                            </Box>
                        </Grid>

                        {settings.map((setting: any, i: number) => {
                            return (
                                (<Grid size={12} className="section-grid" sx={{ pb: 1 }} key={i}>
                                    {setting === "Resume" && <Box>
                                        <Typography className="row-label" sx={{ textTransform: "capitalize", pt: 1 }}>
                                            {"Document Type"}
                                        </Typography>
                                    </Box>}
                                    <Box className="row" sx={{ marginTop: setting === "Resume" ? "0px" : "10px" }}>

                                        <Typography className="row-label" sx={{ textTransform: "capitalize", marginTop: setting === "Resume" ? "5px" : "10px" }}>
                                            {(setting === "points") || (setting === "correct answer") ? <>{setting} <Typography color='red' display='inline'>*</Typography></> : setting}
                                        </Typography>
                                        {setting === "input Type" ? <Box>
                                            <FormControl sx={{ width: 220 }}>
                                                {/* <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel> */}
                                                <Select
                                                    labelId="demo-multiple-checkbox-label"
                                                    id="demo-multiple-checkbox"
                                                    defaultValue={["Text"]}
                                                    value={inputType}
                                                    onChange={handleInputChange}
                                                    input={<OutlinedInput label="" />}
                                                    renderValue={(selected) => selected.join(', ')}
                                                    MenuProps={MenuProps}
                                                    size="small"
                                                >
                                                    {inputFormats.map((inputType: any) => (
                                                        <MenuItem key={inputType} value={inputType}>

                                                            <ListItemText primary={inputType} sx={{ textTransform: "capitalize", fontSize: "13px" }} />
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Box> : setting === "placeholder" ?
                                            <Box>
                                                <TextField variant="outlined"
                                                    sx={{
                                                        '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                                            color: '#1A1A1A',
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
                                                    inputProps={{
                                                        style: {
                                                            height: "4px",
                                                        },

                                                    }}
                                                    value={placeholderValue}
                                                    onChange={handlePlaceholder}
                                                />
                                            </Box> : setting === "help text" ? <TextField
                                                variant="outlined"
                                                sx={{
                                                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                                        color: '#1A1A1A',
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
                                                inputProps={{
                                                    style: {
                                                        height: "4px",
                                                    },
                                                }}
                                                value={helpTextValue}
                                                onChange={handleHelpText}
                                            /> : setting === "Google maps" ? <Box className="required-label">
                                                {/* <Checkbox
                                                    {...label}
                                                    checked={enableAutocomplete}
                                                    onChange={hanldeAutoComplete}
                                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                                /> */}

                                                <BpCheckboxContainer>
                                                    <Checkbox
                                                        {...label}
                                                        className="bp-checkbox"
                                                        disableRipple
                                                        checked={enableAutocomplete}
                                                        onChange={hanldeAutoComplete}
                                                        checkedIcon={
                                                            <BpCheckedIcon
                                                                className="bp-icon"
                                                                style={{
                                                                    borderColor: 'var(--c-primary-color)',
                                                                }}
                                                            />
                                                        }
                                                        icon={
                                                            <BpIcon
                                                                className="bp-icon"
                                                                sx={{
                                                                    border: "1px solid var(--c-secondary-color)",
                                                                    borderRadius: "1px",
                                                                }}
                                                            />
                                                        }
                                                    />
                                                </BpCheckboxContainer>
                                            </Box> :
                                                setting === "Verify mobile number" ?

                                                    < BpCheckboxContainer >
                                                        <Checkbox
                                                            {...label}
                                                            className="bp-checkbox"
                                                            disableRipple
                                                            checked={isValidate}
                                                            onChange={handleValidatePhone}
                                                            checkedIcon={
                                                                <BpCheckedIcon
                                                                    className="bp-icon"
                                                                    style={{
                                                                        borderColor: 'var(--c-primary-color)',
                                                                    }}
                                                                />
                                                            }
                                                            icon={
                                                                <BpIcon
                                                                    className="bp-icon"
                                                                    sx={{
                                                                        border: "1px solid var(--c-secondary-color)",
                                                                        borderRadius: "1px",
                                                                    }}
                                                                />
                                                            }
                                                        />
                                                    </BpCheckboxContainer> :
                                                    setting === "Resume" ?
                                                        < BpCheckboxContainer >
                                                            <Checkbox
                                                                {...label}
                                                                className="bp-checkbox"
                                                                disableRipple
                                                                checked={isResume}
                                                                onChange={handleIsResume}
                                                                checkedIcon={
                                                                    <BpCheckedIcon
                                                                        className="bp-icon"
                                                                        style={{
                                                                            borderColor: 'var(--c-primary-color)',
                                                                        }}
                                                                    />
                                                                }
                                                                icon={
                                                                    <BpIcon
                                                                        className="bp-icon"
                                                                        sx={{
                                                                            border: "1px solid var(--c-secondary-color)",
                                                                            borderRadius: "1px",
                                                                        }}
                                                                    />
                                                                }
                                                            />
                                                        </BpCheckboxContainer>

                                                        : setting === "Read only" ?
                                                            // <Checkbox
                                                            //     {...label}
                                                            //     checked={isReadonly}
                                                            //     onChange={handleReadonly}
                                                            //     sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                                            // />

                                                            <BpCheckboxContainer>
                                                                <Checkbox
                                                                    {...label}
                                                                    className="bp-checkbox"
                                                                    disableRipple
                                                                    checked={isReadonly}
                                                                    onChange={handleReadonly}
                                                                    checkedIcon={
                                                                        <BpCheckedIcon
                                                                            className="bp-icon"
                                                                            style={{
                                                                                borderColor: 'var(--c-primary-color)',
                                                                            }}
                                                                        />
                                                                    }
                                                                    icon={
                                                                        <BpIcon
                                                                            className="bp-icon"
                                                                            sx={{
                                                                                border: "1px solid var(--c-secondary-color)",
                                                                                borderRadius: "1px",
                                                                            }}
                                                                        />
                                                                    }
                                                                />
                                                            </BpCheckboxContainer>
                                                            : setting === "Address validation" ? <Box className="required-label">
                                                                {/* <Checkbox
                                                    {...label}
                                                    checked={isAddressValidation}
                                                    onChange={handleAddressValidation}
                                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                                /> */}

                                                                <BpCheckboxContainer>
                                                                    <Checkbox
                                                                        {...label}
                                                                        className="bp-checkbox"
                                                                        disableRipple
                                                                        checked={isAddressValidation}
                                                                        onChange={handleAddressValidation}
                                                                        checkedIcon={
                                                                            <BpCheckedIcon
                                                                                className="bp-icon"
                                                                                style={{
                                                                                    borderColor: 'var(--c-primary-color)',
                                                                                }}
                                                                            />
                                                                        }
                                                                        icon={
                                                                            <BpIcon
                                                                                className="bp-icon"
                                                                                sx={{
                                                                                    border: "1px solid var(--c-secondary-color)",
                                                                                    borderRadius: "1px",
                                                                                }}
                                                                            />
                                                                        }
                                                                    />
                                                                </BpCheckboxContainer>
                                                            </Box> : setting === "mask data" ?
                                                                //  <Checkbox
                                                                //     {...label}
                                                                //     onChange={handleChangeMaskData}
                                                                //     sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                                                // /> 

                                                                <BpCheckboxContainer>
                                                                    <Checkbox
                                                                        className="bp-checkbox"
                                                                        disableRipple
                                                                        {...label}
                                                                        //   checked={ismodalChecked1}
                                                                        checked={isMasked}
                                                                        onChange={handleChangeMaskData}
                                                                        checkedIcon={
                                                                            <BpCheckedIcon
                                                                                className="bp-icon"
                                                                                style={{
                                                                                    borderColor: 'var(--c-primary-color)',
                                                                                }}
                                                                            />
                                                                        }
                                                                        icon={
                                                                            <BpIcon
                                                                                className="bp-icon"
                                                                                sx={{
                                                                                    border: "1px solid var(--c-secondary-color)",
                                                                                    borderRadius: "1px",
                                                                                }}
                                                                            />
                                                                        }
                                                                    />
                                                                </BpCheckboxContainer>
                                                                : setting === 'prefill' ? <Box>
                                                                    {isPrefillClick ? (<Box sx={{ width: 220 }}>
                                                                        <FormControl fullWidth size='small'>
                                                                            <Select
                                                                                labelId="demo-simple-select-label"
                                                                                id="demo-simple-select"
                                                                                value={prefillDropDown}
                                                                                onChange={handleChangePrefillDropDown}

                                                                            >
                                                                                <MenuItem value={10}>Ten</MenuItem>
                                                                                <MenuItem value={20}>Twenty</MenuItem>
                                                                                <MenuItem value={30}>Thirty</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Box>) : (
                                                                        // <Button sx={{ textTransform: "capitalize" }} onClick={handlePopupPrefill}>Add</Button>
                                                                        (<Box
                                                                            onClick={handlePopupPrefill}
                                                                            component='p'
                                                                            sx={{
                                                                                fontSize: '15px',
                                                                                fontWeight: 600,
                                                                                fontFamily: 'Segoe UI',
                                                                                color: 'var(--c-primary-color)',
                                                                                fontStyle: 'italic',
                                                                                cursor: 'pointer',
                                                                                mr: 2,
                                                                                '&:hover': {
                                                                                    textDecoration: 'underline'
                                                                                }
                                                                            }}
                                                                        >Add
                                                                                                                                                    </Box>)
                                                                    )}
                                                                </Box> : setting === "max character" ? <Box>
                                                                    {!showMaxText ?
                                                                        // <Button sx={{ textTransform: "capitalize" }} onClick={() => setShowMaxText(true)}>Add</Button> 
                                                                        <Box
                                                                            onClick={() => setShowMaxText(true)}
                                                                            component='p'
                                                                            sx={{
                                                                                fontSize: '15px',
                                                                                fontWeight: 600,
                                                                                fontFamily: 'Segoe UI',
                                                                                color: 'var(--c-primary-color)',
                                                                                fontStyle: 'italic',
                                                                                cursor: 'pointer',
                                                                                mr: 2,
                                                                                '&:hover': {
                                                                                    textDecoration: 'underline'
                                                                                }
                                                                            }}
                                                                        >
                                                                            Add
                                                                        </Box> : <Box>
                                                                            <TextField variant="outlined"
                                                                                sx={{
                                                                                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                                                                        color: '#1A1A1A',
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
                                                                                inputProps={{
                                                                                    style: {
                                                                                        height: "4px",
                                                                                    },

                                                                                }}
                                                                                value={maxTextValue}
                                                                                onChange={(e) => {
                                                                                    const re = /^[0-9\b]+$/;
                                                                                    if (e.target.value === '' || re.test(e.target.value)) {
                                                                                        setMaxTextValue(e.target.value)
                                                                                    }
                                                                                }

                                                                                }
                                                                            // onBlur={handleMaxTextSave}
                                                                            />
                                                                        </Box>
                                                                    }

                                                                </Box> : setting === "range" ? <Box sx={{ display: "flex", justifyContent: "space-between", width: "57%" }}>
                                                                    <Box sx={{ minWidth: "70px" }}>
                                                                        <FormControl fullWidth size='small'>
                                                                            <Select
                                                                                labelId="demo-simple-select-label"
                                                                                id="demo-simple-select"
                                                                                value={rangeMin}
                                                                                onChange={handleopinionRangeMin}

                                                                            >
                                                                                <MenuItem value={0}>0</MenuItem>
                                                                                <MenuItem value={1}>1</MenuItem>

                                                                            </Select>
                                                                        </FormControl>
                                                                    </Box>
                                                                    <Typography sx={{ alignSelf: "center" }}>to</Typography>
                                                                    <Box sx={{ minWidth: "70px" }}>
                                                                        <FormControl fullWidth size='small'>
                                                                            <Select
                                                                                labelId="demo-simple-select-label"
                                                                                id="demo-simple-select"
                                                                                value={rangeMax}
                                                                                onChange={handleopinionRangeMax}

                                                                            >
                                                                                <MenuItem value={5}>5</MenuItem>
                                                                                <MenuItem value={6}>6</MenuItem>
                                                                                <MenuItem value={7}>7</MenuItem>
                                                                                <MenuItem value={8}>8</MenuItem>
                                                                                <MenuItem value={9}>9</MenuItem>
                                                                                <MenuItem value={10}>10</MenuItem>

                                                                            </Select>
                                                                        </FormControl>
                                                                    </Box>
                                                                </Box> : setting === "points" ? <Box className="row">
                                                                    <Box>
                                                                        <TextField variant="outlined"
                                                                            type="number"
                                                                            value={points}
                                                                            sx={{
                                                                                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                                                                    color: '#1A1A1A',
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
                                                                            onChange={changePoints} inputProps={{
                                                                                style: {
                                                                                    height: "4px",
                                                                                },
                                                                            }} />
                                                                    </Box>
                                                                </Box> : setting === "correct answer" ? <Box className="row">
                                                                    <Box width={198}>
                                                                        <FormControl fullWidth size='small'>
                                                                            <Select
                                                                                id="correctAnswer"
                                                                                className='correctAnswer'
                                                                                value={correctAnswer}
                                                                                onChange={changeCorrectAnswer}
                                                                            >
                                                                                {field.choices.map((item: any) => <MenuItem key={item.id} value={item.value}>{item.character.toUpperCase()}</MenuItem>
                                                                                )}

                                                                            </Select>
                                                                        </FormControl>
                                                                    </Box>
                                                                </Box> : null}
                                    </Box>
                                </Grid>)
                            );
                        })}

                        <Grid size={12} className="section-grid">
                            {field.fieldType === "date" &&
                                <>
                                    <Box className="row">
                                        <Typography sx={{ fontSize: "13px" }}>
                                            {"Date Types"}
                                        </Typography>
                                        <Box>
                                            <FormControl sx={{ width: 220 }}>
                                                {/* <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel> */}
                                                <Select
                                                    labelId="demo-multiple-checkbox-label"
                                                    id="demo-multiple-checkbox"
                                                    value={dateType}
                                                    onChange={handleDateTypes}
                                                    input={<OutlinedInput label="" />}
                                                    renderValue={(selected) => selected.join(', ')}
                                                    MenuProps={MenuProps}
                                                    size="small"
                                                >
                                                    {dateTypes.map((value: any) => (
                                                        <MenuItem key={value} value={value}>

                                                            <ListItemText sx={{ textTransform: "capitalize", fontSize: "13px" }} >
                                                                {value}
                                                            </ListItemText>
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </Box>
                                    <Box className="row" sx={{ pb: 1 }}>
                                        <Typography className="row-label">
                                            {field.dateConditions.name}
                                        </Typography>
                                        {/* <Checkbox
                                            {...label}
                                            checked={isEnableValidation}
                                            onChange={handleShowDateVaildation}
                                            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                        /> */}

                                        <BpCheckboxContainer>
                                            <Checkbox
                                                className="bp-checkbox"
                                                disableRipple
                                                {...label}
                                                checked={isEnableValidation}
                                                onChange={handleShowDateVaildation}
                                                checkedIcon={
                                                    <BpCheckedIcon
                                                        className="bp-icon"
                                                        style={{
                                                            borderColor: 'var(--c-primary-color)',
                                                        }}
                                                    />
                                                }
                                                icon={
                                                    <BpIcon
                                                        className="bp-icon"
                                                        sx={{
                                                            border: "1px solid var(--c-secondary-color)",
                                                            borderRadius: "1px",
                                                        }}
                                                    />
                                                }
                                            />
                                        </BpCheckboxContainer>

                                    </Box>
                                    {isEnableValidation && <>
                                        <Box className="row">
                                            <Typography sx={{ fontSize: "13px" }}>
                                                {field.dateConditions.dependencyObjs[0].name}
                                            </Typography>
                                            <Box>
                                                <FormControl sx={{ width: 220 }}>
                                                    {/* <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel> */}
                                                    <Select
                                                        labelId="demo-multiple-checkbox-label"
                                                        id="demo-multiple-checkbox"

                                                        value={conditionValue}
                                                        onChange={handleConditionVal}
                                                        input={<OutlinedInput label="" />}
                                                        renderValue={(selected) => selected.join(', ')}
                                                        MenuProps={MenuProps}
                                                        size="small"
                                                    >
                                                        {field.dateConditions?.dependencyObjs[0]?.Possiblevalue.map((value: any) => (
                                                            <MenuItem key={value.name} value={value.name}>

                                                                <ListItemText sx={{ textTransform: "capitalize", fontSize: "13px" }} >
                                                                    {value.name}
                                                                </ListItemText>
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </Box>
                                        <Box className="row">
                                            <Typography sx={{ fontSize: "13px" }}>
                                                {field.dateConditions.dependencyObjs[1].name}
                                            </Typography>
                                            <Box>
                                                <FormControl sx={{ width: 220 }}>
                                                    {/* <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel> */}
                                                    <Select
                                                        labelId="demo-multiple-checkbox-label"
                                                        id="demo-multiple-checkbox"

                                                        value={dateValidationValue}
                                                        onChange={handleDateValidation}
                                                        input={<OutlinedInput label="" />}
                                                        renderValue={(selected) => selected.join(', ')}
                                                        MenuProps={MenuProps}
                                                        size="small"
                                                    >
                                                        {dateValidations.map((dateValue, index) => (
                                                            <MenuItem key={index} value={dateValue}>

                                                                <ListItemText primary={dateValue} sx={{ textTransform: "capitalize", fontSize: "13px" }} />
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </Box>
                                    </>}

                                </>
                            }
                        </Grid>

                        <Grid size={12} className="section-grid">
                            {/* {fieldValue === "date" &&
                                <Box className="row" sx={{ pb: 1 }}>
                                    <Typography className="row-label">
                                        Prefill
                                    </Typography>

                                    {isPrefillClick ? (<Box sx={{ width: 220 }}>
                                        <FormControl fullWidth size='small'>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={prefillDropDown}
                                                onChange={handleChangePrefillDropDown}
                                            >
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>) : (
                                        <Button sx={{ textTransform: "capitalize" }} onClick={handlePopupPrefill}>Add</Button>)
                                    }
                                </Box>
                            } */}
                        </Grid>

                        <Grid size={12} className="section-grid">
                            {/* {fieldValue === "setEnabelAuto" &&
                                <Box className="row" sx={{ pb: 1 }}>
                                    <Typography className="row-label">
                                        Prefill
                                    </Typography>

                                    {isPrefillClick ? (<Box sx={{ width: 220 }}>
                                        <FormControl fullWidth size='small'>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={prefillDropDown}
                                                onChange={handleChangePrefillDropDown}
                                            >
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>) : (
                                        <Button sx={{ textTransform: "capitalize" }} onClick={handlePopupPrefill}>Add</Button>)
                                    }
                                </Box>
                            } */}
                        </Grid>

                        {isShowAdvanced && <>

                        </>}


                    </Grid>

                </Paper >

            </Popover >
        </Box >)
    );
}
export default ControlSettings