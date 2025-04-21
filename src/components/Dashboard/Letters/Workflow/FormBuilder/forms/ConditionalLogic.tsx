import { useContext } from 'react';
import { React, useState, useEffect, useMemo } from '../../../../../../shared/modules/React';
import { Typography } from '../../../../../../shared/modules/MaterialImports/Typography';
import { Stack } from '../../../../../../shared/modules/MaterialImports/Stack';
import { IconButton, TextField, InputAdornment } from '../../../../../../shared/modules/commonImports';
import { Box } from '../../../../../../shared/modules/MaterialImports/Box';
import RouteOutlinedIcon from '@mui/icons-material/RouteOutlined';
import Autocomplete from '@mui/material/Autocomplete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Popover } from '../../../../../../shared/modules/MaterialImports/Popover';
import { MenuItem } from '../../../../../../shared/modules/MaterialImports/Menu';
import MenuList from '@mui/material/MenuList';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import DragHandleRoundedIcon from '@mui/icons-material/DragHandleRounded';
import PercentRoundedIcon from '@mui/icons-material/PercentRounded';

import { ConditionalList } from "../shared/utills/Constants";
import './form.scss'
import { FormStore } from '../../../../../../App';
import { Chip } from '../../../../../../shared/modules/MaterialImports/Chip';
import { Tooltip } from '../../../../../../shared/modules/MaterialImports/ToolTip';

// import { shallow } from 'zustand/shallow';
// import useFormBuilderStore, { FORMBUILDER_STATE } from '../../../../../../shared/store/FormBuilderStore';


// const formBuilderSelector = (state: FORMBUILDER_STATE) => ({
//     formData: state.formData,
//     setFormData: state.setFormData
// });

// const options = [
//     { label: 'email' },
//     { label: 'phone' },
//     { label: 'SSN' }
// ]

// const isMenuOptions = [
//     { label: 'Is' },
//     { label: 'Is not' },
//     { label: 'Contains' },
//     { label: 'Does not contain' },
//     { label: 'Starts with' },
//     { label: 'Ends with' },
//     { label: 'Is empty' },
//     { label: 'Is not empty' },
// ]

// const conditionOption = [
//     { label: 'And' },
//     { label: 'Or' }
// ]

const thenOptions = [

    { label: 'Show blocks' },
    { label: 'Hide blocks' },
]

// const jumpToPageOptions = [
//     { label: 'Page 1' },
//     { label: `Default ${'Thank you'} page` },
// ]

// const requireOptions = [
//     { label: 'require 1' },
//     { label: 'require 2' },
// ]

// const showOptions = [
//     { label: 'show 1' },
//     { label: 'show 2' },
//     { label: 'show 3' },
//     { label: 'show 4' },
// ]

// const hideOptions = [
//     { label: 'hide 1' },
//     { label: 'hide 2' },
//     { label: 'hide 3' },
//     { label: 'hide 4' },
// ]

const calculateOptions = [
    { label: 'Number' },
    { label: 'Text' },
]

const initialOptions = [
    { label: 'initial 1' },
    { label: 'initial 2' },
]

interface ConditionalProps {
    field: any
}

const ConditionalLogic: React.FC<ConditionalProps> = ({ field }) => {

    const [whenAnchorEl, setWhenAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [condAnchorEl, setCondAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [thenAnchorEl, setThenAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    // const [thenAnchorEl2, setThenAnchorEl2] = React.useState<HTMLButtonElement | null>(null);
    const [calculatedAnchorEl, setCalculatedAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    // const [condition, setCondition] = useState<any>(null);
    const [calculateBtnClick, setCalculateBtnClick] = useState<any>([])
    const [calculateTypeselect, setCalculateTypeselect] = useState<any>([])
    const [component, setNewComponent] = useState<any>([0]);
    // const [selectedValues, setSelectedValues] = useState<any>([])
    // const [selectedShowOptions, setSelectedShowOptions] = useState<any>([]);
    // const [selectedHideOptions, setSelectedHideOptions] = useState<any>([]);
    const [formData, setFormData] = useContext(FormStore);
    // const { formData, setFormData } = useFormBuilderStore(formBuilderSelector, shallow);

    const formatLetter = (str: any) => {
        if (str) {
            let arr = str.split(" ");
            for (let char = 0; char < arr.length; char++) {
                arr[char] = arr[char].charAt(0).toUpperCase() + arr[char].substring(1)
            }
            return arr.join(" ")
        }

    }

    const whenOptions = useMemo(() => {
        let copiedData = JSON.stringify(formData)
        let newFormData = JSON.parse(copiedData)
        let hideComponents = ["conditionallogic", "fileupload", "pagebreak"]
        let data = newFormData.filter((form: any) => hideComponents.indexOf(form.fieldType) === -1)
        data.forEach((value: any) => {
            if (!value.labelName) {
                value.labelName = `Untitled ${formatLetter(value.fieldType)} field`
            }
        })
        return data

    },
        [JSON.stringify(formData), whenAnchorEl])

    const thenComponents = useMemo(() => {
        let copiedData = JSON.stringify(formData)
        let newFormData = JSON.parse(copiedData)
        let hideComponents = ["conditionallogic", "pagebreak"]
        let data = newFormData.filter((form: any) => hideComponents.indexOf(form.fieldType) === -1)
        data.forEach((value: any) => {
            if (!value.labelName) {
                value.labelName = `Untitled ${formatLetter(value.fieldType)} field`
            }
        })
        // console.log(data, 'datadata')
        return data
    },
        [JSON.stringify(formData), thenAnchorEl])

    const [mainData, setMainData] = useState<any>(
        field.settings.when ?
            field.settings
            :
            {
                "when": {
                    mainList: {
                        defaultList: whenOptions,
                        selectedList: []
                    },
                    conditionalList: {
                        defaultList: [],
                        selectedList: []
                    },
                    values: {
                        defaultList: [],
                        selectedList: []
                    },
                },
                "conditions":
                    [

                    ],
                "then": [
                    {
                        mainList: {
                            defaultList: [],
                            selectedList: []
                        },
                        components: {
                            defaultList: [],
                            listed: [],
                            removed: []
                        },
                    }]
            })

    useEffect(() => {
        let copyData = mainData["when"];
        copyData.mainList.defaultList = whenOptions
        let copyConditionsData = mainData["conditions"];
        let thenData = mainData["then"]
        thenData.forEach((data: any) => {
            data.mainList.defaultList = thenOptions
            data.components.defaultList = thenComponents
        })
        // console.log(copyData, 'copyData')
        // console.log(copyConditionsData, 'copyConditionsData')
        setMainData({ ...mainData, when: copyData, conditions: copyConditionsData, then: thenData })
    }, [whenOptions, thenComponents])


    const getDefaultList = (value: any) => {
        let conditionsArr = ConditionalList[value.inputType as keyof typeof ConditionalList]
        return conditionsArr?.length ? conditionsArr : [];
    }

    const getValuesArr = (value: any) => {
        let items = [];
        if (value.fieldType === "multiplechoice") {
            items = value.choices.map((item: any) => item.value)
        }
        if (value.fieldType === "checkbox") {
            items = value.choices
        }
        if (value.fieldType === "opinionscale") {
            items = value.choices
        }
        if (value.fieldType === "netprometer") {
            items = value.choices
        }
        if (value.fieldType === "yes/no") {
            items = ["Yes", "No"]
        }
        if (value.inputType === "dropdown") {
            items = value.options
        }
        // console.log(items, 'yyy')
        return items
    }
    const handleWhenChange = (e: any, value: any, type: string) => {
        sessionStorage.removeItem("isPreview")
        switch (type) {
            case "mainList":
                let copyData = mainData["when"];
                copyData.mainList = { ...copyData?.mainList, selectedList: [{ label: value.labelName, id: value.id, type: value.inputType }] }
                copyData.conditionalList = { ...copyData.conditionalList, defaultList: getDefaultList(value) }
                copyData.values = { ...copyData.values, defaultList: getValuesArr(value) }
                // console.log(copyData, 'copyData')
                setMainData({ ...mainData, when: copyData })
                break;

            case "conditionalList":
                let conditionData = mainData["when"];
                conditionData.conditionalList = { ...conditionData.conditionalList, selectedList: [value.value] }
                conditionData.values = { ...conditionData.values, defaultList: [...conditionData.values.defaultList] }
                setMainData({ ...mainData, when: conditionData })
                break;

            case "values":
                let valueData = mainData["when"];
                valueData.conditionalList = { ...valueData.conditionalList }
                valueData.values = { ...valueData.values, selectedList: [value] }
                setMainData({ ...mainData, when: valueData })
                break;

        }
    }


    // const [thenComponent, setThenNewComponent] = useState<any>([0])

    const handleConditionChange = (event: any, newValue: any, type: string, index: number) => {
        // setCondition(newValue)
        sessionStorage.removeItem("isPreview")
        let conditionsData = mainData["conditions"]
        // console.log(conditionsData, 'conditionsData', index)

        switch (type) {
            case "mainList":
                conditionsData[index].mainList = { ...conditionsData[index].mainList, selectedList: [newValue] }
                conditionsData[index].subList = { ...conditionsData[index].subList, defaultList: [...whenOptions] }
                setMainData({ ...mainData, conditions: conditionsData })
                break;
            case "subList":
                conditionsData[index].subList = { ...conditionsData[index].subList, selectedList: [{ label: newValue.labelName, id: newValue.id, type: newValue.inputType }] }
                conditionsData[index].conditionalList = { ...conditionsData[index].conditionalList, defaultList: getDefaultList(newValue) }
                conditionsData[index].values = { ...conditionsData[index].values, defaultList: getValuesArr(newValue) }
                setMainData({ ...mainData, conditions: conditionsData })
                break;
            case "conditionalList":

                conditionsData[index].conditionalList = { ...conditionsData[index].conditionalList, selectedList: [newValue.value] }
                conditionsData[index].values = { ...conditionsData[index].values, defaultList: [...conditionsData[index].values.defaultList] }
                setMainData({ ...mainData, conditions: conditionsData })
                break;
            case "values":

                conditionsData[index].conditionalList = { ...conditionsData[index].conditionalList }
                conditionsData[index].values = { ...conditionsData[index]?.values, selectedList: [newValue] }
                setMainData({ ...mainData, conditions: conditionsData })
                break;
        }
        event.stopPropagation()
    }

    const handleWhenDuplicate = () => {
        sessionStorage.removeItem("isPreview")
        let copyConditionData = mainData["conditions"]
        let whenData = mainData['when']
        let intialData = {
            "mainList": {
                defaultList: [{ label: 'And' },
                { label: 'Or' }],
                selectedList: []
            },
            "subList": { ...whenData.mainList },
            "conditionalList": { ...whenData.conditionalList },
            "values": { ...whenData.values }

        }
        // console.log(intialData, "ooo", whenData)
        copyConditionData.push(intialData)
        // console.log(copyConditionData, 'copyConditionData')
        setMainData({ ...mainData, conditions: copyConditionData })
        setWhenAnchorEl(null)
    }



    const handleAddConditionDup = (index: number) => {
        sessionStorage.removeItem("isPreview")
        let conditionData = mainData["conditions"]
        let copiedData = { ...conditionData[selectedIndex] }
        conditionData.push(copiedData)
        setMainData({ ...mainData, conditions: conditionData })
        setCondAnchorEl(null)

    }

    const handleThenDuplicate = (index: number) => {
        sessionStorage.removeItem("isPreview")
        // console.log(selectedIndex, 'indexxxx')
        let copiedThenData = mainData["then"]
        let copiedData = { ...copiedThenData[selectedIndex] }
        copiedThenData.push(copiedData)
        setMainData({ ...mainData, then: copiedThenData })
        setThenAnchorEl(null)
    }

    const handleThenChange = (e: any, value: any, index: number) => {
        sessionStorage.removeItem("isPreview")
        let thenData = mainData["then"]
        thenData[index].mainList = { ...thenData[index].mainList, selectedList: [value.label] }
        thenData[index].components = { ...thenData[index].components, defaultList: thenComponents }
        setMainData({ ...mainData, then: thenData })
    }
    const handleClick = (event: any, index: number) => {
        // console.log(index, 'index')
        setCondAnchorEl(event.currentTarget);
        setSelectedIndex(index)
    };

    const handleClickWhen = (event: any, index: number) => {
        // console.log(index, 'index')
        setWhenAnchorEl(event.currentTarget);
    };



    const handleClose = () => {
        setWhenAnchorEl(null);
    };
    const handleConditionClose = () => {
        setCondAnchorEl(null);
    };


    const [selectedIndex, setSelectedIndex] = useState<any>(null)

    const handleThenClick = (event: any, index: any) => {
        setThenAnchorEl(event.currentTarget);
        setSelectedIndex(index)
    };

    const handleThenClose = () => {
        setThenAnchorEl(null);
    };

    // const handleThenClick2 = (event: any, index: any) => {
    //     setThenAnchorEl2(event.currentTarget);
    //     setSelectedIndex(index)
    // };

    // const handleThenClose2 = () => {
    //     setThenAnchorEl2(null);
    // };


    const handleCalculatedAnchorElOpen = (event: any) => {
        setCalculatedAnchorEl(event.currentTarget);
    };

    const handleCalculatedAnchorElClose = () => {
        setCalculatedAnchorEl(null);
    };

    const openWhenPopover = Boolean(whenAnchorEl);
    const whenPopoverid = openWhenPopover ? 'simple-popover' : undefined;
    const openCondPopover = Boolean(condAnchorEl);
    const condPopoverid = openCondPopover ? 'simple-popover-cond' : undefined;

    const openThenPopover = Boolean(thenAnchorEl);
    const thenPopoverid = openThenPopover ? 'simple-popover' : undefined;

    // const openThenPopover2 = Boolean(thenAnchorEl2);
    // const thenPopoverid2 = openThenPopover ? 'simple-popover' : undefined;

    const openCalculatedPopover = Boolean(calculatedAnchorEl);
    const calculatedid = openCalculatedPopover ? 'simple-popover' : undefined;


    const handleAddWhenComponent = () => {
        sessionStorage.removeItem("isPreview")
        // setNewComponent([...component, component.length]);
        let copyConditionData = mainData["conditions"]
        let intialData = {
            "mainList": {
                defaultList: [{ label: 'And' },
                { label: 'Or' }],
                selectedList: []
            },
            "subList": {
                defaultList: whenOptions,
                selectedList: []
            },
            "conditionalList": {
                defaultList: [],
                selectedList: []
            },
            "values": {
                defaultList: [],
                selectedList: []
            },
        }
        // console.log("is here")
        copyConditionData.push(intialData)
        // console.log(copyConditionData, 'copyConditionData')
        setMainData({ ...mainData, conditions: copyConditionData })
        setCondAnchorEl(null)
        setWhenAnchorEl(null)
    };

    // useEffect(() => {
    //     console.log(component, 'setNewComponent')
    // }, [component])

    const handleAddThenComponent = () => {
        sessionStorage.removeItem("isPreview")
        let thenData = mainData["then"];
        let intialValues = {
            mainList: {
                defaultList: thenOptions,
                selectedList: []
            },
            components: {
                defaultList: [],
                listed: [],
                removed: []
            },
        }
        thenData.push(intialValues)

        setMainData({ ...mainData, then: thenData })
        setThenAnchorEl(null)
    };

    const handleShowBlocks = (e: any, value: any[], index: number) => {
        sessionStorage.removeItem("isPreview")
        let thenData = mainData["then"];

        const uniqueValues = value.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.id === value.id
            ))
        )


        thenData[index].components = { ...thenData[index].components, listed: [...uniqueValues] }
        setMainData({ ...mainData, then: thenData })
    }

    const handleHideBlocks = (e: any, value: any[], index: number) => {
        sessionStorage.removeItem("isPreview")
        let thenData = mainData["then"];

        const uniqueValues = value.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.id === value.id
            ))
        )

        thenData[index].components = { ...thenData[index].components, removed: [...uniqueValues] }


        setMainData({ ...mainData, then: thenData })
    }


    const handleRemoveAutoComplete = (e: any, indexVal: number) => {
        e.stopPropagation()
        sessionStorage.removeItem("isPreview")
        let conditionsData = mainData["conditions"]
        let filterData = conditionsData.filter((data: any, index: any) => index !== indexVal)
        setMainData({ ...mainData, conditions: filterData })
        setCondAnchorEl(null)
    }

    // const handleTextWhenChange = (e: any) => {
    //     let whenData = mainData["when"];
    //     whenData.values = { ...whenData.values, selectedList: [e.target.value] }
    //     setMainData({ ...mainData, when: whenData })
    // }

    // const handleTextConditionChange = (e: any, index: number) => {
    //     let conditionsData = mainData["conditions"];
    //     conditionsData[index].values = { ...conditionsData[index].values, selectedList: [e.target.value] }
    //     setMainData({ ...mainData, conditions: conditionsData })
    // }

    const handleThenComponentDelete = (e: any, index: number) => {
        sessionStorage.removeItem("isPreview")
        e.stopPropagation()
        let thenData = mainData["then"]
        if (thenData.length > 1) {
            const updatedData = thenData.filter((val: any, i: any) => i !== index);
            setMainData({ ...mainData, then: updatedData })
        }
        setThenAnchorEl(null)

    }

    const handleCalculate = () => {
        setCalculateBtnClick([...calculateBtnClick, calculateBtnClick.length]);
        setCalculateTypeselect([...calculateTypeselect, null]);
        handleCalculatedAnchorElClose()
    }

    const handleCalculateTypeselect = (event: any, value: any, index: any) => {
        const updatedTypes = [...calculateTypeselect];
        updatedTypes[index] = value;
        setCalculateTypeselect(updatedTypes);
    }





    // const handleDuplicate = () => {
    //     const newComponent = [...thenComponent];
    //     const lastElement = thenComponent[thenComponent.length - 1];
    //     const duplicatedElement = { ...lastElement };
    //     newComponent.push(duplicatedElement);
    //     setThenNewComponent(newComponent);
    // };

    // const handleWhenRemoveAutoComplete = (e: any) => {
    //     e.stopPropagation()
    //     sessionStorage.removeItem("isPreview")
    //     let conditionsData = mainData["conditions"]
    //     if (conditionsData.length) {
    //         conditionsData.splice(conditionsData.length - 1, 1)
    //         setMainData({ ...mainData, conditions: conditionsData })
    //     }
    //     else {
    //         let newData = formData.filter((form: any) => form.id !== field.id)
    //         setFormData(newData)
    //     }
    // }


    useEffect(() => {
        // if (!sessionStorage.getItem("isPreview")) {
        let newData = formData.map((form: any) => {
            if ((form.id === field.id) && mainData.when.mainList) {
                form.settings = mainData
            }
            return form
        })
        setFormData(newData);
        // console.log("when", mainData.when.mainList.selectedList[0]);
        // console.log("then", mainData.then[0].mainList.selectedList[0]);
        // }

    }, [mainData])

    const [isLoaded, setIsLoaded] = useState(true)

    // useEffect(() => {
    //     if (Object.keys(field.settings).length) {
    //         setMainData(field.settings)
    //     }
    //     console.log(field.settings, 'ff');
    //     setIsLoaded(true)
    // }, []);


    return (<>
        {isLoaded && <Stack sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>

            {calculateBtnClick.map((index: any) => (
                <Stack key={index} mb={1} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Stack sx={{
                        display: 'flex', flexDirection: 'row', alignItems: 'center',
                    }}
                        direction='row' spacing={1}>

                        <TextField
                            placeholder='Field name e.g., score, price'
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end" sx={{
                                        '& .MuiButtonBase-root.MuiIconButton-root': {
                                            p: 0
                                        }
                                    }}>
                                        {calculateTypeselect[index] ? (
                                            <IconButton disableRipple>
                                                <PercentRoundedIcon sx={{ fontSize: '15px' }} />
                                            </IconButton>
                                        ) : null}
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .css-o9k5xi.MuiInputBase-root.MuiOutlinedInput-root': {
                                    pr: 0
                                },
                                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                    p: '5px'
                                }
                            }}
                        />


                        <Autocomplete
                            disablePortal
                            disableClearable
                            id="two"
                            options={calculateOptions}
                            value={calculateTypeselect[index]}
                            onChange={(e, newValue) => handleCalculateTypeselect(e, newValue, index)}
                            sx={{
                                "& .MuiAutocomplete-popupIndicator": {
                                    transform: "unset",
                                    color: "#737373",
                                    '& .MuiTouchRipple-root': {
                                        display: 'none',
                                    },
                                    '&:hover': {
                                        backgroundColor: '#ffffff'
                                    }
                                },
                                '& .MuiOutlinedInput-root': {
                                    p: 0
                                },
                                '& .MuiAutocomplete-clearIndicator': {
                                    color: '#919191',
                                    height: '8px',
                                    width: '8px',
                                    mr: 1,
                                    '&:hover': {
                                        backgroundColor: '#ffffff'
                                    }
                                }
                            }}
                            getOptionLabel={(option) => option.label}

                            renderOption={(props, option) => (
                                (<li {...props}
                                    style={{
                                        color: '#1A1A1A',
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        fontFamily: 'Segoe UI',
                                    }}
                                    onMouseEnter={(e: any) => {
                                        e.target.style.backgroundColor = 'var(--c-primary-color)';
                                        e.target.style.color = '#ffffff';
                                    }}
                                    onMouseLeave={(e: any) => {
                                        e.target.style.backgroundColor = 'unset';
                                        e.target.style.color = 'unset';
                                    }}
                                >{option.label}</li>) // Customize the font color here
                            )}
                            renderInput={(params) => <TextField {...params}
                                sx={{
                                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                        color: '#1A1A1A',
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        fontFamily: 'Segoe UI',
                                        minWidth: '60px'
                                    },
                                    '& .MuiInputBase-input::placeholder': {
                                        color: '#737373',
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        fontFamily: 'Segoe UI',
                                        opacity: 1,
                                    },
                                    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'var(--c-primary-color)',
                                    },
                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'var(--c-primary-color)',
                                        borderWidth: '1px'
                                    },
                                }} />}
                        />

                        {calculateTypeselect[index] ? <DragHandleRoundedIcon sx={{ fontSize: '15px' }} /> : null}

                        {calculateTypeselect[index] ? (
                            <Autocomplete
                                disablePortal
                                disableClearable
                                id="third"
                                options={initialOptions}
                                sx={{
                                    "& .MuiAutocomplete-popupIndicator": {
                                        transform: "unset",
                                        color: "#737373",
                                        '& .MuiTouchRipple-root': {
                                            display: 'none',
                                        },
                                        '&:hover': {
                                            backgroundColor: '#ffffff'
                                        }
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        p: 0
                                    },
                                    '& .MuiAutocomplete-clearIndicator': {
                                        color: '#919191',
                                        height: '8px',
                                        width: '8px',
                                        mr: 1,
                                        '&:hover': {
                                            backgroundColor: '#ffffff'
                                        }
                                    }
                                }}
                                getOptionLabel={(option) => option.label}

                                renderOption={(props, option) => (
                                    (<li {...props}
                                        style={{
                                            color: '#1A1A1A',
                                            fontSize: '14px',
                                            fontWeight: 600,
                                            fontFamily: 'Segoe UI',
                                        }}
                                        onMouseEnter={(e: any) => {
                                            e.target.style.backgroundColor = 'var(--c-primary-color)';
                                            e.target.style.color = '#ffffff';
                                        }}
                                        onMouseLeave={(e: any) => {
                                            e.target.style.backgroundColor = 'unset';
                                            e.target.style.color = 'unset';
                                        }}
                                    >{option.label}</li>) // Customize the font color here
                                )}
                                renderInput={(params) => <TextField {...params}
                                    placeholder='initial value'
                                    sx={{
                                        '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                            color: '#1A1A1A',
                                            fontSize: '14px',
                                            fontWeight: 600,
                                            fontFamily: 'Segoe UI',
                                            minWidth: '60px'
                                        },
                                        '& .MuiInputBase-input::placeholder': {
                                            color: '#737373',
                                            fontSize: '14px',
                                            fontWeight: 600,
                                            fontFamily: 'Segoe UI',
                                            opacity: 1,
                                        },
                                        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'var(--c-primary-color)',
                                        },
                                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'var(--c-primary-color)',
                                            borderWidth: '1px'
                                        },
                                    }} />}
                            />) : null}
                    </Stack>

                    <Box sx={{ ml: 'auto' }} onClick={handleCalculatedAnchorElOpen}>
                        <MoreVertIcon />
                    </Box>
                </Stack>
            ))}

            {
                Object.keys(mainData).map((obj, index) => {
                    switch (obj) {
                        case "when":
                            return (
                                (<Stack key={index} className='when-main-container'
                                // sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                                >
                                    <Box className='when-main-container-1'>
                                        <Box
                                            // sx={{
                                            //     display: 'flex', flexDirection: 'row', alignSelf: 'center', gap: 0.5,
                                            //     width: '15%', mb: 1, mr: '4px'
                                            // }}
                                            className='when-container-1'
                                        >
                                            <RouteOutlinedIcon sx={{ fontSize: '20px', color: 'rgb(55, 53, 47)' }} />
                                            <Typography
                                                sx={{ fontSize: '16px', color: 'rgb(55, 53, 47)', fontFamily: 'Segoe UI', }}
                                            >
                                                When
                                            </Typography>
                                        </Box>

                                        <Stack
                                            className='when-container-2'
                                        // sx={{
                                        //     display: 'flex', flexDirection: 'row', alignItems: 'center',
                                        //     width: '85%'
                                        // }}
                                        //     direction='row' spacing={1} mb={1}
                                        >
                                            {/* {mainData[obj]?.mainList?.selectedList}-- */}
                                            <Autocomplete
                                                disablePortal
                                                disableClearable
                                                id="first"
                                                options={mainData[obj]?.mainList?.defaultList}
                                                defaultValue={() => {
                                                    let data = mainData[obj]?.mainList?.defaultList.filter((item: any) => item?.id === mainData[obj]?.mainList?.selectedList[0]?.id)
                                                    // console.log(data, 'data here')
                                                    return data[0]
                                                }}
                                                onChange={(e, value) => handleWhenChange(e, value, "mainList")}
                                                sx={{
                                                    "& .MuiAutocomplete-popupIndicator": {
                                                        transform: "unset",
                                                        color: "#737373",
                                                        '& .MuiTouchRipple-root': {
                                                            display: 'none',
                                                        },
                                                        '&:hover': {
                                                            backgroundColor: '#ffffff'
                                                        }
                                                    },
                                                    '& .MuiOutlinedInput-root': {
                                                        p: 0
                                                    },
                                                    '& .MuiAutocomplete-clearIndicator': {
                                                        color: '#919191',
                                                        height: '8px',
                                                        width: '8px',
                                                        mr: 1,
                                                        '&:hover': {
                                                            backgroundColor: '#ffffff'
                                                        }
                                                    },

                                                }}
                                                className='when-auto-complete-1'
                                                getOptionLabel={(option: any) => {
                                                    // console.log(option, 'insideee')
                                                    return option.labelName
                                                }
                                                }

                                                renderOption={(props, option: any) => (
                                                    (<li {...props}
                                                        style={{
                                                            color: '#1A1A1A',
                                                            fontSize: '14px',
                                                            fontWeight: 600,
                                                            fontFamily: 'Segoe UI',
                                                        }}
                                                        onMouseEnter={(e: any) => {
                                                            e.target.style.backgroundColor = 'var(--c-primary-color)';
                                                            e.target.style.color = '#ffffff';
                                                        }}
                                                        onMouseLeave={(e: any) => {
                                                            e.target.style.backgroundColor = 'unset';
                                                            e.target.style.color = 'unset';
                                                        }}
                                                    >
                                                        {option.labelName}</li>) // Customize the font color here
                                                )}
                                                renderInput={(params) => <TextField {...params}
                                                    sx={{
                                                        '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                                            color: '#1A1A1A',
                                                            fontSize: '14px',
                                                            fontWeight: 600,
                                                            fontFamily: 'Segoe UI',
                                                        },
                                                        '& .MuiInputBase-input::placeholder': {
                                                            color: '#737373',
                                                            fontSize: '14px',
                                                            fontWeight: 600,
                                                            fontFamily: 'Segoe UI',
                                                            opacity: 1,
                                                        },
                                                        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: 'var(--c-primary-color)',
                                                        },
                                                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: 'var(--c-primary-color)',
                                                            borderWidth: '1px'
                                                        },
                                                    }} />}
                                            />

                                            <Autocomplete
                                                disablePortal
                                                disableClearable
                                                id="third"
                                                options={mainData[obj]?.conditionalList?.defaultList ? mainData[obj]?.conditionalList?.defaultList : []}
                                                defaultValue={() => {
                                                    let data = mainData[obj]?.conditionalList?.defaultList.filter((item: any) => item?.value === mainData[obj]?.conditionalList?.selectedList[0])
                                                    return data[0]
                                                }}
                                                onChange={(e, value) => handleWhenChange(e, value, "conditionalList")}
                                                sx={{
                                                    "& .MuiAutocomplete-popupIndicator": {
                                                        transform: "unset",
                                                        color: "#737373",
                                                        '& .MuiTouchRipple-root': {
                                                            display: 'none',
                                                        },
                                                        '&:hover': {
                                                            backgroundColor: '#ffffff'
                                                        }
                                                    },

                                                    '& .MuiOutlinedInput-root': {
                                                        p: 0
                                                    },
                                                    '& .MuiAutocomplete-clearIndicator': {
                                                        color: '#919191',
                                                        height: '8px',
                                                        width: '8px',
                                                        mr: 1,
                                                        '&:hover': {
                                                            backgroundColor: '#ffffff'
                                                        }
                                                    },

                                                }}
                                                className='when-auto-complete-2'
                                                getOptionLabel={(option: any) => option.name}

                                                renderOption={(props, option) => (
                                                    (<li {...props}
                                                        style={{
                                                            color: '#1A1A1A',
                                                            fontSize: '14px',
                                                            fontWeight: 600,
                                                            fontFamily: 'Segoe UI',
                                                        }}
                                                        onMouseEnter={(e: any) => {
                                                            e.target.style.backgroundColor = 'var(--c-primary-color)';
                                                            e.target.style.color = '#ffffff';
                                                        }}
                                                        onMouseLeave={(e: any) => {
                                                            e.target.style.backgroundColor = 'unset';
                                                            e.target.style.color = 'unset';
                                                        }}
                                                    >{option.name}</li>) // Customize the font color here
                                                )}
                                                renderInput={(params) => <TextField {...params}
                                                    sx={{
                                                        '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                                            color: '#1A1A1A',
                                                            fontSize: '14px',
                                                            fontWeight: 600,
                                                            fontFamily: 'Segoe UI',
                                                            minWidth: '60px'
                                                        },
                                                        '& .MuiInputBase-input::placeholder': {
                                                            color: '#737373',
                                                            fontSize: '14px',
                                                            fontWeight: 600,
                                                            fontFamily: 'Segoe UI',
                                                            opacity: 1,
                                                        },
                                                        '& .MuiAutocomplete-hasPopupIcon.MuiAutocomplete-root.MuiOutlinedInput-root': {
                                                            p: '0px '
                                                        },
                                                        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: 'var(--c-primary-color)',
                                                        },
                                                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: 'var(--c-primary-color)',
                                                            borderWidth: '1px'
                                                        },
                                                    }} />}
                                            />

                                            {mainData[obj]?.values?.defaultList?.length > 0 && ["is", "isnot"].indexOf(mainData[obj].conditionalList?.selectedList[0]) !== -1 ?
                                                <Autocomplete
                                                    disablePortal
                                                    disableClearable
                                                    id="third"
                                                    options={mainData[obj]?.values?.defaultList}
                                                    onChange={(e, value) => handleWhenChange(e, value, "values")}
                                                    defaultValue={() => {
                                                        let data = mainData[obj]?.values?.defaultList.filter((item: any) => item === mainData[obj]?.values?.selectedList[0])
                                                        return data[0]
                                                    }}
                                                    sx={{
                                                        "& .MuiAutocomplete-popupIndicator": {
                                                            transform: "unset",
                                                            color: "#737373",
                                                            '& .MuiTouchRipple-root': {
                                                                display: 'none',
                                                            },
                                                            '&:hover': {
                                                                backgroundColor: '#ffffff'
                                                            }
                                                        },
                                                        '& .MuiOutlinedInput-root': {
                                                            p: 0
                                                        },
                                                        '& .MuiAutocomplete-clearIndicator': {
                                                            color: '#919191',
                                                            height: '8px',
                                                            width: '8px',
                                                            mr: 1,
                                                            '&:hover': {
                                                                backgroundColor: '#ffffff'
                                                            }
                                                        },
                                                        // width: "40%"
                                                    }}
                                                    className='when-auto-complete-3'
                                                    getOptionLabel={(option: any) => option}

                                                    renderOption={(props, option: any) => (
                                                        (<li {...props}
                                                            style={{
                                                                color: '#1A1A1A',
                                                                fontSize: '14px',
                                                                fontWeight: 600,
                                                                fontFamily: 'Segoe UI',
                                                            }}
                                                            onMouseEnter={(e: any) => {
                                                                e.target.style.backgroundColor = 'var(--c-primary-color)';
                                                                e.target.style.color = '#ffffff';
                                                            }}
                                                            onMouseLeave={(e: any) => {
                                                                e.target.style.backgroundColor = 'unset';
                                                                e.target.style.color = 'unset';
                                                            }}
                                                        >{option}</li>) // Customize the font color here
                                                    )}
                                                    renderInput={(params) => <TextField {...params} placeholder='Value'
                                                        sx={{
                                                            '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                                                color: '#1A1A1A',
                                                                fontSize: '14px',
                                                                fontWeight: 600,
                                                                fontFamily: 'Segoe UI',
                                                            },
                                                            '& .MuiInputBase-input::placeholder': {
                                                                color: '#737373',
                                                                fontSize: '14px',
                                                                fontWeight: 600,
                                                                fontFamily: 'Segoe UI',
                                                                opacity: 1,
                                                            },
                                                            '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: 'var(--c-primary-color)',
                                                            },
                                                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: 'var(--c-primary-color)',
                                                                borderWidth: '1px'
                                                            },
                                                        }} />}
                                                /> : null}

                                        </Stack>
                                    </Box>
                                    <Box sx={{ mt: 1, cursor: 'pointer' }} onClick={(e) => handleClickWhen(e, 0)}>
                                        <MoreVertIcon />
                                    </Box>
                                    <Popover
                                        id={whenPopoverid}
                                        open={openWhenPopover}
                                        anchorEl={whenAnchorEl}
                                        onClose={handleClose}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                    >
                                        <MenuList>
                                            <MenuItem onClick={handleAddWhenComponent}>
                                                <AddRoundedIcon sx={{ fontSize: '18px', mr: '2px' }} />
                                                <Typography sx={{
                                                    fontSize: "14px",
                                                    fontWeight: "400",
                                                    fontFamily: "Segoe UI",
                                                }}
                                                >
                                                    Add Condition
                                                </Typography>
                                            </MenuItem>
                                            {/* <MenuItem onClick={(e) => handleWhenRemoveAutoComplete(e)}>
                                                <DeleteOutlineRoundedIcon sx={{ fontSize: '18px', mr: '2px' }} />
                                                <Typography sx={{
                                                    fontSize: "14px",
                                                    fontWeight: "400",
                                                    fontFamily: "Segoe UI",
                                                }}
                                                >
                                                    Remove
                                                </Typography>
                                            </MenuItem> */}

                                            <MenuItem onClick={handleWhenDuplicate}>
                                                <ContentCopyOutlinedIcon sx={{ fontSize: '15px', mr: '2px' }} />
                                                <Typography sx={{
                                                    fontSize: "14px",
                                                    fontWeight: "400",
                                                    fontFamily: "Segoe UI",
                                                }}
                                                >
                                                    Duplicate
                                                </Typography>
                                            </MenuItem>

                                        </MenuList>
                                    </Popover>
                                </Stack>)
                            );

                        case "conditions":
                            return (mainData[obj].map((conditionItem: any, indexVal: number) => {
                                return (<>
                                    <Stack
                                        // sx={{ display: 'flex', flexDirection: 'row', width: '100%', }}
                                        className='when-main-container'
                                    >
                                        <Box className='when-main-container-1'>
                                            {indexVal === 0 ?
                                                <Autocomplete
                                                    disablePortal
                                                    disableClearable
                                                    id="third"
                                                    // value={conditionItem}
                                                    className='when-auto-complete-4'
                                                    onChange={(e, value) => handleConditionChange(e, value, "mainList", indexVal)}
                                                    options={conditionItem?.mainList?.defaultList}
                                                    defaultValue={() => {
                                                        let data = conditionItem?.mainList?.defaultList.filter((item: any) => item?.label === conditionItem?.mainList?.selectedList[0]?.label)
                                                        return data[0]
                                                    }}
                                                    sx={{
                                                        "& .MuiAutocomplete-popupIndicator": {
                                                            transform: "unset",
                                                            color: "#737373",
                                                            '& .MuiTouchRipple-root': {
                                                                display: 'none',
                                                            },
                                                            '&:hover': {
                                                                backgroundColor: '#ffffff'
                                                            }
                                                        },
                                                        '& .MuiOutlinedInput-root': {
                                                            p: 0
                                                        },
                                                        '& .MuiAutocomplete-clearIndicator': {
                                                            color: '#919191',
                                                            height: '8px',
                                                            width: '8px',
                                                            mr: 1,
                                                            '&:hover': {
                                                                backgroundColor: '#ffffff'
                                                            }
                                                        },

                                                    }}

                                                    getOptionLabel={(option: any) => option.label}

                                                    renderOption={(props, option: any) => (
                                                        (<li {...props}
                                                            style={{
                                                                color: '#1A1A1A',
                                                                fontSize: '14px',
                                                                fontWeight: 600,
                                                                fontFamily: 'Segoe UI',
                                                            }}
                                                            onMouseEnter={(e: any) => {
                                                                e.target.style.backgroundColor = 'var(--c-primary-color)';
                                                                e.target.style.color = '#ffffff';
                                                            }}
                                                            onMouseLeave={(e: any) => {
                                                                e.target.style.backgroundColor = 'unset';
                                                                e.target.style.color = 'unset';
                                                            }}
                                                        >{option.label}</li>) // Customize the font color here
                                                    )}
                                                    renderInput={(params) => <TextField {...params}
                                                        sx={{
                                                            '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                                                color: '#1A1A1A',
                                                                fontSize: '14px',
                                                                fontWeight: 600,
                                                                fontFamily: 'Segoe UI',
                                                            },
                                                            '& .MuiInputBase-input::placeholder': {
                                                                color: '#737373',
                                                                fontSize: '14px',
                                                                fontWeight: 600,
                                                                fontFamily: 'Segoe UI',
                                                                opacity: 1,
                                                            },
                                                            '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: 'var(--c-primary-color)',
                                                            },
                                                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: 'var(--c-primary-color)',
                                                                borderWidth: '1px'
                                                            },
                                                            // width: "100%"
                                                        }} />}
                                                /> : <Box sx={{ minWidth: '65px', mr: 2, display: index === 0 ? 'none' : 'flex' }} >
                                                    <Typography sx={{ fontSize: '16px', color: 'rgb(55, 53, 47)', fontFamily: "Segoe UI", }}
                                                        className='when-condition-text'
                                                    >
                                                        {mainData[obj][0].mainList?.selectedList.length > 0 ? mainData[obj][0].mainList?.selectedList[0].label : ''}
                                                    </Typography>
                                                </Box>}


                                            <Stack
                                                // sx={{
                                                //     display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%'
                                                // }}
                                                // direction='row' spacing={1} mb={1}
                                                className='when-container-2'
                                            >

                                                <Autocomplete
                                                    disablePortal
                                                    disableClearable
                                                    className='when-auto-complete-1'
                                                    id="first"
                                                    options={conditionItem?.subList?.defaultList}
                                                    defaultValue={() => {
                                                        let data = conditionItem?.subList?.defaultList?.filter((item: any) => item?.id === conditionItem.subList.selectedList[0]?.id)
                                                        return data[0]
                                                    }}
                                                    onChange={(e, value) => handleConditionChange(e, value, "subList", indexVal)}
                                                    sx={{
                                                        "& .MuiAutocomplete-popupIndicator": {
                                                            transform: "unset",
                                                            color: "#737373",
                                                            '& .MuiTouchRipple-root': {
                                                                display: 'none',
                                                            },
                                                            '&:hover': {
                                                                backgroundColor: '#ffffff'
                                                            }
                                                        },
                                                        '& .MuiOutlinedInput-root': {
                                                            p: 0
                                                        },
                                                        '& .MuiAutocomplete-clearIndicator': {
                                                            color: '#919191',
                                                            height: '8px',
                                                            width: '8px',
                                                            mr: 1,
                                                            '&:hover': {
                                                                backgroundColor: '#ffffff'
                                                            }
                                                        },
                                                        // width: "35%"

                                                    }}

                                                    getOptionLabel={(option: any) => {
                                                        // console.log(option, 'insideee')
                                                        return option.labelName
                                                    }
                                                    }

                                                    renderOption={(props, option: any) => (
                                                        (<li {...props}
                                                            style={{
                                                                color: '#1A1A1A',
                                                                fontSize: '14px',
                                                                fontWeight: 600,
                                                                fontFamily: 'Segoe UI',
                                                            }}
                                                            onMouseEnter={(e: any) => {
                                                                e.target.style.backgroundColor = 'var(--c-primary-color)';
                                                                e.target.style.color = '#ffffff';
                                                            }}
                                                            onMouseLeave={(e: any) => {
                                                                e.target.style.backgroundColor = 'unset';
                                                                e.target.style.color = 'unset';
                                                            }}
                                                        >
                                                            {option.labelName}</li>) // Customize the font color here
                                                    )}
                                                    renderInput={(params) => <TextField {...params}
                                                        sx={{
                                                            '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                                                color: '#1A1A1A',
                                                                fontSize: '14px',
                                                                fontWeight: 600,
                                                                fontFamily: 'Segoe UI',
                                                            },
                                                            '& .MuiInputBase-input::placeholder': {
                                                                color: '#737373',
                                                                fontSize: '14px',
                                                                fontWeight: 600,
                                                                fontFamily: 'Segoe UI',
                                                                opacity: 1,
                                                            },
                                                            '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: 'var(--c-primary-color)',
                                                            },
                                                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: 'var(--c-primary-color)',
                                                                borderWidth: '1px'
                                                            },
                                                        }} />}
                                                />

                                                <Autocomplete
                                                    disablePortal
                                                    disableClearable
                                                    className='when-auto-complete-2'
                                                    id="third"
                                                    options={conditionItem.conditionalList.defaultList}
                                                    defaultValue={() => {
                                                        let data = conditionItem.conditionalList.defaultList.filter((item: any) => item?.value === conditionItem.conditionalList.selectedList[0])
                                                        return data[0]
                                                    }}
                                                    onChange={(e, value) => handleConditionChange(e, value, "conditionalList", indexVal)}
                                                    sx={{
                                                        "& .MuiAutocomplete-popupIndicator": {
                                                            transform: "unset",
                                                            color: "#737373",
                                                            '& .MuiTouchRipple-root': {
                                                                display: 'none',
                                                            },
                                                            '&:hover': {
                                                                backgroundColor: '#ffffff'
                                                            }
                                                        },
                                                        '& .MuiOutlinedInput-root': {
                                                            p: 0
                                                        },
                                                        '& .MuiAutocomplete-clearIndicator': {
                                                            color: '#919191',
                                                            height: '8px',
                                                            width: '8px',
                                                            mr: 1,
                                                            '&:hover': {
                                                                backgroundColor: '#ffffff'
                                                            }
                                                        },
                                                        // width: "30%"

                                                    }}
                                                    getOptionLabel={(option: any) => option.name}

                                                    renderOption={(props, option) => (
                                                        (<li {...props}
                                                            style={{
                                                                color: '#1A1A1A',
                                                                fontSize: '14px',
                                                                fontWeight: 600,
                                                                fontFamily: 'Segoe UI',
                                                            }}
                                                            onMouseEnter={(e: any) => {
                                                                e.target.style.backgroundColor = 'var(--c-primary-color)';
                                                                e.target.style.color = '#ffffff';
                                                            }}
                                                            onMouseLeave={(e: any) => {
                                                                e.target.style.backgroundColor = 'unset';
                                                                e.target.style.color = 'unset';
                                                            }}
                                                        >{option.name}</li>) // Customize the font color here
                                                    )}
                                                    renderInput={(params) => <TextField {...params}
                                                        sx={{
                                                            '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                                                color: '#1A1A1A',
                                                                fontSize: '14px',
                                                                fontWeight: 600,
                                                                fontFamily: 'Segoe UI',
                                                            },
                                                            '& .MuiAutocomplete-hasPopupIcon.MuiAutocomplete-root.MuiOutlinedInput-root': {
                                                                p: '0px '
                                                            },
                                                            '& .MuiInputBase-input::placeholder': {
                                                                color: '#737373',
                                                                fontSize: '14px',
                                                                fontWeight: 600,
                                                                fontFamily: 'Segoe UI',
                                                                opacity: 1,
                                                            },
                                                            '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: 'var(--c-primary-color)',
                                                            },
                                                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: 'var(--c-primary-color)',
                                                                borderWidth: '1px'
                                                            },
                                                        }} />}
                                                />
                                                {conditionItem?.values?.defaultList?.length > 0 && ["is", "isnot"].indexOf(conditionItem.conditionalList?.selectedList[0]) !== -1 ?
                                                    <Autocomplete
                                                        disablePortal
                                                        disableClearable
                                                        className='when-auto-complete-3'
                                                        id="third"
                                                        options={conditionItem.values.defaultList}
                                                        defaultValue={() => {
                                                            let data = conditionItem.values?.defaultList?.filter((item: any) => item === conditionItem?.values?.selectedList[0])
                                                            return data[0]
                                                        }}
                                                        onChange={(e, value) => handleConditionChange(e, value, "values", indexVal)}
                                                        sx={{
                                                            "& .MuiAutocomplete-popupIndicator": {
                                                                transform: "unset",
                                                                color: "#737373",
                                                                '& .MuiTouchRipple-root': {
                                                                    display: 'none',
                                                                },
                                                                '&:hover': {
                                                                    backgroundColor: '#ffffff'
                                                                }
                                                            },
                                                            '& .MuiOutlinedInput-root': {
                                                                p: 0
                                                            },
                                                            '& .MuiAutocomplete-clearIndicator': {
                                                                color: '#919191',
                                                                height: '8px',
                                                                width: '8px',
                                                                mr: 1,
                                                                '&:hover': {
                                                                    backgroundColor: '#ffffff'
                                                                }
                                                            },
                                                            // width: "40%"

                                                        }}
                                                        getOptionLabel={(option: any) => option}

                                                        renderOption={(props, option: any) => {
                                                            // console.log(option, 'optionoption')
                                                            return (
                                                                // Customize the font color here
                                                                (<li {...props}
                                                                    style={{
                                                                        color: '#1A1A1A',
                                                                        fontSize: '14px',
                                                                        fontWeight: 600,
                                                                        fontFamily: 'Segoe UI',
                                                                    }}
                                                                    onMouseEnter={(e: any) => {
                                                                        e.target.style.backgroundColor = 'var(--c-primary-color)';
                                                                        e.target.style.color = '#ffffff';
                                                                    }}
                                                                    onMouseLeave={(e: any) => {
                                                                        e.target.style.backgroundColor = 'unset';
                                                                        e.target.style.color = 'unset';
                                                                    }}
                                                                >{option}</li>)
                                                            );
                                                        }}
                                                        renderInput={(params) => <TextField {...params} placeholder='Value'
                                                            sx={{
                                                                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                                                    color: '#1A1A1A',
                                                                    fontSize: '14px',
                                                                    fontWeight: 600,
                                                                    fontFamily: 'Segoe UI',
                                                                },
                                                                '& .MuiInputBase-input::placeholder': {
                                                                    color: '#737373',
                                                                    fontSize: '14px',
                                                                    fontWeight: 600,
                                                                    fontFamily: 'Segoe UI',
                                                                    opacity: 1,
                                                                },
                                                                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                                                    borderColor: 'var(--c-primary-color)',
                                                                },
                                                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                                    borderColor: 'var(--c-primary-color)',
                                                                    borderWidth: '1px'
                                                                },
                                                            }} />}
                                                    /> : null}



                                            </Stack>
                                        </Box>

                                        <Box sx={{ mt: 1, cursor: 'pointer' }} onClick={(e) => handleClick(e, indexVal)}>
                                            <MoreVertIcon />
                                        </Box>
                                    </Stack>
                                    <Popover
                                        id={condPopoverid}
                                        open={openCondPopover}
                                        anchorEl={condAnchorEl}
                                        onClose={handleConditionClose}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                    >
                                        <MenuList>
                                            <MenuItem onClick={handleAddWhenComponent}>
                                                <AddRoundedIcon sx={{ fontSize: '18px', mr: '2px' }} />
                                                <Typography sx={{
                                                    fontSize: "14px",
                                                    fontWeight: "400",
                                                    fontFamily: "Segoe UI",
                                                }}
                                                >
                                                    Add Condition
                                                </Typography>
                                            </MenuItem>
                                            <MenuItem onClick={(e) => handleRemoveAutoComplete(e, indexVal)}>
                                                <DeleteOutlineRoundedIcon sx={{ fontSize: '18px', mr: '2px' }} />
                                                <Typography sx={{
                                                    fontSize: "14px",
                                                    fontWeight: "400",
                                                    fontFamily: "Segoe UI",
                                                }}
                                                >
                                                    Remove
                                                </Typography>
                                            </MenuItem>

                                            <MenuItem onClick={() => handleAddConditionDup(indexVal)}>
                                                <ContentCopyOutlinedIcon sx={{ fontSize: '15px', mr: '2px' }} />
                                                <Typography sx={{
                                                    fontSize: "14px",
                                                    fontWeight: "400",
                                                    fontFamily: "Segoe UI",
                                                }}
                                                >
                                                    Duplicate
                                                </Typography>
                                            </MenuItem>


                                        </MenuList>
                                    </Popover>
                                </>);
                            }));

                        case "then":
                            return (mainData[obj].map((thenItem: any, indexNum: number) => {
                                return (
                                    (<Stack key={indexNum}
                                        sx={{
                                            display: component.length ? 'flex' : 'none',
                                            // flexDirection: 'row', alignItems: 'center',
                                            // mt: 1,
                                            // width: '100%'
                                        }}
                                        className='then-main-container'>
                                        <Box className='then-main-container-1'>
                                            {indexNum === 0 ? (<Box
                                                // sx={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', gap: 0.5, mr: '4px', width: '15%' }}
                                                className='then-text-container'
                                            >
                                                <BoltOutlinedIcon sx={{ fontSize: '25px', color: 'rgb(55, 53, 47)', }} />
                                                <Typography sx={{ fontSize: '16px', color: 'rgb(55, 53, 47)', fontFamily: 'Segoe UI', }}>Then</Typography>

                                            </Box>) : (<Box
                                                //  sx={{ mr: 1, ml: 4.5, width: '5%' }}
                                                className='then-text-container-1'
                                            >
                                                <Typography sx={{ fontSize: '16px', color: 'rgb(55, 53, 47)', fontFamily: 'Segoe UI', }}>And</Typography>
                                            </Box>)}

                                            <Box
                                                //  sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: "85%" }}
                                                className='then-autocomplete-container'
                                            >

                                                {/*  PARENT AUTOCOMPLETE  */}
                                                <Autocomplete

                                                    disablePortal
                                                    disableClearable
                                                    options={thenItem.mainList.defaultList}
                                                    onChange={(e, value) => handleThenChange(e, value, indexNum)}
                                                    defaultValue={() => {
                                                        let data = thenItem.mainList?.defaultList?.filter((item: any) => item.label === thenItem.mainList?.selectedList[0])
                                                        return data[0]
                                                    }}
                                                    sx={{
                                                        "& .MuiAutocomplete-popupIndicator": {
                                                            transform: "unset",
                                                            color: "#737373",
                                                            '& .MuiTouchRipple-root': {
                                                                display: 'none',
                                                            },
                                                            '&:hover': {
                                                                backgroundColor: '#ffffff'
                                                            }
                                                        },
                                                        '& .MuiOutlinedInput-root': {
                                                            p: 0
                                                        },
                                                        '& .MuiAutocomplete-clearIndicator': {
                                                            color: '#919191',
                                                            height: '8px',
                                                            width: '8px',
                                                            mr: 1,
                                                            '&:hover': {
                                                                backgroundColor: '#ffffff'
                                                            }
                                                        },
                                                        // width: "35%"
                                                    }}
                                                    className='then-autocomplete-1'
                                                    getOptionLabel={(option: any) => option.label}
                                                    // onChange={(e, newValue) => {
                                                    //     handleAutoCompleteSelect(e, newValue, indexNum);
                                                    // }}
                                                    renderOption={(props, option: any) => (
                                                        <li {...props}
                                                            style={{
                                                                color: '#1A1A1A',
                                                                fontSize: '14px',
                                                                fontWeight: 600,
                                                                fontFamily: 'Segoe UI',
                                                            }}
                                                            onMouseEnter={(e: any) => {
                                                                e.target.style.backgroundColor = 'var(--c-primary-color)';
                                                                e.target.style.color = '#ffffff';
                                                            }}
                                                            onMouseLeave={(e: any) => {
                                                                e.target.style.backgroundColor = 'unset';
                                                                e.target.style.color = 'unset';
                                                            }}
                                                        >{option.label}</li>
                                                    )}
                                                    renderInput={(params) => <TextField {...params} placeholder='Select action'
                                                        sx={{
                                                            '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                                                color: '#1A1A1A',
                                                                fontSize: '14px',
                                                                fontWeight: 600,
                                                                fontFamily: 'Segoe UI',
                                                                minWidth: '100px'
                                                            },
                                                            '& .MuiInputBase-input::placeholder': {
                                                                color: '#737373',
                                                                fontSize: '14px',
                                                                fontWeight: 600,
                                                                fontFamily: 'Segoe UI',
                                                                opacity: 1,
                                                            },
                                                            '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: 'var(--c-primary-color)',
                                                            },
                                                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: 'var(--c-primary-color)',
                                                                borderWidth: '1px'
                                                            },
                                                        }} />}
                                                />

                                                {/*  CHILD AUTOCOMPLETES  */}

                                                {thenItem.mainList.selectedList[0] === 'Show blocks' && (

                                                    <Autocomplete
                                                        multiple
                                                        disablePortal
                                                        disableClearable
                                                        options={thenItem.components?.defaultList}

                                                        sx={{
                                                            "& .MuiAutocomplete-popupIndicator": {
                                                                transform: "unset",
                                                                color: "#737373",
                                                                '& .MuiTouchRipple-root': {
                                                                    display: 'none',
                                                                },
                                                                '&:hover': {
                                                                    backgroundColor: '#ffffff'
                                                                }
                                                            },
                                                            '& .MuiOutlinedInput-root': {
                                                                p: 0
                                                            },
                                                            '& .MuiAutocomplete-clearIndicator': {
                                                                color: '#919191',
                                                                height: '8px',
                                                                width: '8px',
                                                                mr: 1,
                                                                '&:hover': {
                                                                    backgroundColor: '#ffffff'
                                                                }
                                                            },
                                                            // width: "60%"
                                                        }}
                                                        className='then-show-hide-autocomplete'
                                                        getOptionLabel={(option: any) => option.labelName}
                                                        value={thenItem.components.listed}
                                                        onChange={(e, newValue) => handleShowBlocks(e, newValue, indexNum)}
                                                        renderOption={(props, option) => (
                                                            (<li {...props}
                                                                style={{
                                                                    color: '#1A1A1A',
                                                                    fontSize: '14px',
                                                                    fontWeight: 600,
                                                                    fontFamily: 'Segoe UI',
                                                                }}
                                                                onMouseEnter={(e: any) => {
                                                                    e.target.style.backgroundColor = 'var(--c-primary-color)';
                                                                    e.target.style.color = '#ffffff';
                                                                }}
                                                                onMouseLeave={(e: any) => {
                                                                    e.target.style.backgroundColor = 'unset';
                                                                    e.target.style.color = 'unset';
                                                                }}
                                                            >{option.labelName}</li>) // Customize the font color here
                                                        )}
                                                        renderInput={(params) => <TextField {...params}
                                                            placeholder={thenItem.components.listed.length ? '' : 'Select blocks'}
                                                            sx={{
                                                                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                                                    color: '#1A1A1A',
                                                                    fontSize: '14px',
                                                                    fontWeight: 600,
                                                                    fontFamily: 'Segoe UI',
                                                                },
                                                                '& .MuiInputBase-input::placeholder': {
                                                                    color: '#737373',
                                                                    fontSize: '14px',
                                                                    fontWeight: 600,
                                                                    fontFamily: 'Segoe UI',
                                                                    opacity: 1,
                                                                },
                                                                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                                                    borderColor: 'var(--c-primary-color)',
                                                                },
                                                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                                    borderColor: 'var(--c-primary-color)',
                                                                    borderWidth: '1px'
                                                                },
                                                            }} />}

                                                        renderTags={(value, getTagProps) => {
                                                            // console.log(value, 'valuevalue')
                                                            return value.map((option, index) => (
                                                                (<Tooltip title={option.labelName} key={index}>
                                                                    <Chip
                                                                        label={option.labelName}
                                                                        {...getTagProps({ index })}
                                                                        style={{
                                                                            color: '#1A1A1A',
                                                                            fontSize: '14px',
                                                                            fontWeight: 600,
                                                                            fontFamily: 'Segoe UI',
                                                                            backgroundColor: '#e0e0e0',
                                                                        }}
                                                                    />
                                                                </Tooltip>)

                                                                // <span
                                                                //     style={{
                                                                //         color: '#1A1A1A',
                                                                //         fontSize: '14px',
                                                                //         fontWeight: 600,
                                                                //         fontFamily: 'Segoe UI',
                                                                //     }}
                                                                //     {...getTagProps({ index })}
                                                                // >
                                                                //     {option.labelName}
                                                                //     {index < value.length - 1 ? ', ' : ''}
                                                                // </span>
                                                            ));
                                                        }
                                                        }
                                                    />
                                                )}

                                                {thenItem.mainList.selectedList[0] === 'Hide blocks' && (
                                                    <Autocomplete
                                                        multiple
                                                        disablePortal
                                                        disableClearable

                                                        options={thenItem.components?.defaultList}
                                                        sx={{
                                                            "& .MuiAutocomplete-popupIndicator": {
                                                                transform: "unset",
                                                                color: "#737373",
                                                                '& .MuiTouchRipple-root': {
                                                                    display: 'none',
                                                                },
                                                                '&:hover': {
                                                                    backgroundColor: '#ffffff'
                                                                }
                                                            },
                                                            '& .MuiOutlinedInput-root': {
                                                                p: 0
                                                            },
                                                            '& .MuiAutocomplete-clearIndicator': {
                                                                color: '#919191',
                                                                height: '8px',
                                                                width: '8px',
                                                                mr: 1,
                                                                '&:hover': {
                                                                    backgroundColor: '#ffffff'
                                                                }
                                                            },
                                                            // width: "60%"
                                                        }}
                                                        className='then-show-hide-autocomplete'
                                                        getOptionLabel={(option: any) => option.labelName}
                                                        value={thenItem.components.removed}
                                                        onChange={(e, newValue) => handleHideBlocks(e, newValue, indexNum)}

                                                        renderOption={(props, option) => (
                                                            <li {...props}
                                                                style={{
                                                                    color: '#1A1A1A',
                                                                    fontSize: '14px',
                                                                    fontWeight: 600,
                                                                    fontFamily: 'Segoe UI',
                                                                }}
                                                                onMouseEnter={(e: any) => {
                                                                    e.target.style.backgroundColor = 'var(--c-primary-color)';
                                                                    e.target.style.color = '#ffffff';
                                                                }}
                                                                onMouseLeave={(e: any) => {
                                                                    e.target.style.backgroundColor = 'unset';
                                                                    e.target.style.color = 'unset';
                                                                }}
                                                            >{option.labelName}</li>
                                                        )}
                                                        renderInput={(params) => <TextField {...params}
                                                            placeholder={thenItem.components.removed.length ? '' : 'Select blocks'}
                                                            sx={{
                                                                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                                                    color: '#1A1A1A',
                                                                    fontSize: '14px',
                                                                    fontWeight: 600,
                                                                    fontFamily: 'Segoe UI',
                                                                },
                                                                '& .MuiInputBase-input::placeholder': {
                                                                    color: '#737373',
                                                                    fontSize: '14px',
                                                                    fontWeight: 600,
                                                                    fontFamily: 'Segoe UI',
                                                                    opacity: 1,
                                                                },
                                                                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                                                    borderColor: 'var(--c-primary-color)',
                                                                },
                                                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                                    borderColor: 'var(--c-primary-color)',
                                                                    borderWidth: '1px'
                                                                },
                                                            }} />}

                                                        renderTags={(value, getTagProps) =>
                                                            value.map((option, index) => (
                                                                // <span
                                                                //     style={{
                                                                //         color: '#1A1A1A',
                                                                //         fontSize: '14px',
                                                                //         fontWeight: 600,
                                                                //         fontFamily: 'Segoe UI',
                                                                //     }}
                                                                //     {...getTagProps({ index })}
                                                                // >
                                                                //     {option.labelName}
                                                                //     {index < value.length - 1 ? ', ' : ''}
                                                                // </span>
                                                                (<Tooltip title={option.labelName} key={index}>
                                                                    <Chip
                                                                        label={option.labelName}
                                                                        {...getTagProps({ index })}
                                                                        style={{
                                                                            color: '#1A1A1A',
                                                                            fontSize: '14px',
                                                                            fontWeight: 600,
                                                                            fontFamily: 'Segoe UI',
                                                                            backgroundColor: '#e0e0e0',
                                                                        }}
                                                                    />
                                                                </Tooltip>)

                                                            ))
                                                        }
                                                    />
                                                )}

                                            </Box>

                                        </Box>
                                        <Box sx={{ mt: 1, ml: 'auto', cursor: 'pointer' }}
                                            onClick={(e) => handleThenClick(e, indexNum)}>
                                            <MoreVertIcon />
                                        </Box>
                                        <Popover
                                            id={thenPopoverid}
                                            open={openThenPopover}
                                            anchorEl={thenAnchorEl}
                                            onClose={handleThenClose}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right',
                                            }}
                                        >
                                            <MenuList>
                                                <MenuItem onClick={handleAddThenComponent}>
                                                    <AddRoundedIcon sx={{ fontSize: '18px', mr: '2px' }} />
                                                    <Typography sx={{
                                                        fontSize: "14px",
                                                        fontWeight: "400",
                                                        fontFamily: "Segoe UI",
                                                    }}
                                                    >
                                                        Add Condition
                                                    </Typography>
                                                </MenuItem>
                                                {selectedIndex !== 0 && <MenuItem
                                                    onClick={(e) => handleThenComponentDelete(e, indexNum)}
                                                >
                                                    <DeleteOutlineRoundedIcon sx={{ fontSize: '18px', mr: '2px' }} />
                                                    <Typography sx={{
                                                        fontSize: "14px",
                                                        fontWeight: "400",
                                                        fontFamily: "Segoe UI",
                                                    }}
                                                    >
                                                        Remove
                                                    </Typography>
                                                </MenuItem>}


                                                <MenuItem
                                                    onClick={() => handleThenDuplicate(indexNum)}
                                                >
                                                    <ContentCopyOutlinedIcon sx={{ fontSize: '15px', mr: '2px' }} />
                                                    <Typography sx={{
                                                        fontSize: "14px",
                                                        fontWeight: "400",
                                                        fontFamily: "Segoe UI",
                                                    }}
                                                    >
                                                        Duplicate
                                                    </Typography>
                                                </MenuItem>

                                            </MenuList>
                                        </Popover>
                                    </Stack>)
                                );
                            }));
                    }

                })
            }


            {/* {thenComponent.map((index: any) => {
return (
   
    
    )
})} */}
        </Stack>
        }
        {/* <Popover
            id={thenPopoverid2}
            open={openThenPopover2}
            anchorEl={thenAnchorEl2}
            onClose={handleThenClose2}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
        >
            <MenuList>
                <MenuItem onClick={handleAddThenComponent}>
                    <AddRoundedIcon sx={{ fontSize: '18px', mr: '2px' }} />
                    <Typography sx={{
                        fontSize: "14px",
                        fontWeight: "400",
                        fontFamily: "Segoe UI",
                    }}
                    >
                        Add Condition
                    </Typography>
                </MenuItem>
                <MenuItem
                    onClick={handleThenComponentDelete}
                >
                    <DeleteOutlineRoundedIcon sx={{ fontSize: '18px', mr: '2px' }} />
                    <Typography sx={{
                        fontSize: "14px",
                        fontWeight: "400",
                        fontFamily: "Segoe UI",
                    }}
                    >
                        Remove
                    </Typography>
                </MenuItem>

                <MenuItem
                //  onClick={handleDuplicate}
                >
                    <ContentCopyOutlinedIcon sx={{ fontSize: '15px', mr: '2px' }} />
                    <Typography sx={{
                        fontSize: "14px",
                        fontWeight: "400",
                        fontFamily: "Segoe UI",
                    }}
                    >
                        Duplicate
                    </Typography>
                </MenuItem>


            </MenuList>
        </Popover> */}
        <Popover
            id={calculatedid}
            open={openCalculatedPopover}
            anchorEl={calculatedAnchorEl}
            onClose={handleCalculatedAnchorElClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
        >
            <MenuList>
                <MenuItem onClick={handleCalculate}>
                    <AddRoundedIcon sx={{ fontSize: '18px', mr: '2px' }} />
                    <Typography sx={{
                        fontSize: "14px",
                        fontWeight: "400",
                        fontFamily: "Segoe UI",
                    }}
                    >
                        Add calculated field
                    </Typography>
                </MenuItem>

                <MenuItem >
                    <DeleteOutlineRoundedIcon sx={{ fontSize: '18px', mr: '2px' }} />
                    <Typography sx={{
                        fontSize: "14px",
                        fontWeight: "400",
                        fontFamily: "Segoe UI",
                    }}
                    >
                        Remove
                    </Typography>
                </MenuItem>


            </MenuList>
        </Popover>
    </>);
}

export default ConditionalLogic