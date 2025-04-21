import { useContext } from 'react';
import { React, useEffect, useRef } from '../../../../../../shared/modules/React';
import { Box } from '../../../../../../shared/modules/MaterialImports/Box';
import { Button, TextField } from '../../../../../../shared/modules/commonImports';
import { Typography } from '../../../../../../shared/modules/MaterialImports/Typography';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ListIcon from '@mui/icons-material/List';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import StarIcon from '@mui/icons-material/Star';
// import Textarea from '@mui/joy/Textarea';
import ContentEditable from 'react-contenteditable';
import ControlSettings from '../settings/ControlSettings';
import DateComponent from './DateComponent';
import { options } from "../shared/formSettings"
import PopperComponent from '../shared/modal/PopperComponent';
import RatingComponent from './RatingComponent';
import RankingComponent from './RankingComponent';
import TextEditorComponent from './TextEditorComponent';
import AddressComponent from './AddressComponent';
import FileUploadComponent from './FileUploadComponent';
import DropdownComponent from './DropDownComponent';
import MultiChoiceComponent from './MultiChoiceComponent';
import CheckboxComponent from './CheckboxComponent';
import EmbedEditorImg from './EmbedEditorImg';
import EmbedEditorVideo from './EmbedEditorVideo';
import EmbedEditorAudio from './EmbedEditorAudio';
import EmbedEditorAny from './EmbedEditorAny';
import { FormStore } from "../../../../../../App";
import ConditionalLogic from './ConditionalLogic';
import { Popover } from '../../../../../../shared/modules/MaterialImports/Popover';
import { Dialog, DialogActions, DialogContent } from '../../../../../../shared/modules/MaterialImports/Dialog';
import DialogContentText from '@mui/material/DialogContentText';
import './form.scss';
import { trackPromise } from '../../../../../../shared/modules/PromiseTrackter';
import ApiService from '../../../../../../shared/api/api';
import { userLocalData } from "../../../../../../shared/services/userData";
// import DialogTitle from '@mui/material/DialogTitle';
import { Select } from '../../../../../../shared/modules/MaterialImports/FormElements';
import { MenuItem } from '../../../../../../shared/modules/MaterialImports/Menu';
import { confirmDialog } from '../../../../../shared/ConfirmDialog/ConfirmDialog';
// import { shallow } from 'zustand/shallow';
import LockIcon from '@mui/icons-material/Lock';
// import useFormBuilderStore, { FORMBUILDER_STATE } from '../../../../../../shared/store/FormBuilderStore';


// const formBuilderSelector = (state: FORMBUILDER_STATE) => ({
//     formData: state.formData,
//     setFormData: state.setFormData
// });

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "#000000",
        color: "#ffffff",
        fontSize: "13px",
        fontFamily: "Segoe UI",
        fontWeight: "600",
    },
}));

interface TextProps {
    inputType: string;
    currentIndexValue: any;
    formIndex: number;
    deleteElement: (index: number) => void,
    field: any,
    copyElement: (type: any, index: number) => void,
    addingPosition: any,
    canDelete?: boolean,
    isSecure?: boolean,
    generateDataKey: boolean,
    focusId?: string | null;
    setFocusId: (id: string | null) => void;
    isCustomFieldDeleteSettingEnabled?: boolean

}
interface Ranking {
    id: number;
    value: string;
    rank: number;
    chosen: boolean;
    selected: boolean;
}
interface Rankings {
    [formId: string]: Ranking[];
}

const TextComponent: React.FC<TextProps> = ({ inputType, currentIndexValue, formIndex, deleteElement, field, copyElement, addingPosition, generateDataKey, focusId, setFocusId, isCustomFieldDeleteSettingEnabled = true }) => {

    const isSecureAddSettingEnabled = (userLocalData.checkSettings(130009) === 1)


    const [anchorPopperControlEl, setAnchorOppperControlEl] = React.useState<any | null>(null);
    const [anchorPopperEl, setAnchorOppperEl] = React.useState<any | null>(null);
    const [isShowRequired, setShowRequired] = React.useState(false)
    // const [propsData] = useContext(Store) 
    const [formData, setFormData] = useContext(FormStore);
    // const { formData, setFormData } = useFormBuilderStore(formBuilderSelector, shallow);
    const [btnValue, setBtnValue] = React.useState(field.btnValue ? field.btnValue : "Continue")
    const [pageValue, setPageValue] = React.useState("Page Break")
    const [valueType, setValueType] = React.useState("");
    const [labelName, setLabelName] = React.useState("")
    const [description, setDescription] = React.useState("");
    const [reload, setReload] = React.useState(false)
    const [selectedField, setSelected] = React.useState<any>(null)
    // const editableRefs = useRef<(HTMLDivElement | null)[]>([])
    const [phoneNumberFormat, setPhoneNumberFormat] = React.useState('')
    const [dataKeyValue, setDataKeyValue] = React.useState<any>(field.datakey)
    const [formLabel, setFormLabel] = React.useState("")
    const [addressData, setAddressData] = React.useState({});
    const [rankings, setRankings] = React.useState<Rankings>({});
    const [optionData, setOptionData] = React.useState<any[] | never[]>([]);
    const [selectedOption, setSelectedOption] = React.useState('');
    let clientId = userLocalData.getvalue('clientId');
    const titleRef = useRef<HTMLDivElement | null>(null);


    useEffect(() => {
        if (field.id === focusId && titleRef.current) {
            titleRef.current.focus();
            // setFocusId(null);
        }
    }, [focusId, field.id, setFocusId]);




    // const labelRef = useRef('');

    // console.log("hello")
    useEffect(() => {
        if (field.labelValue) {
            setFormLabel(field.labelValue)
        }
        else {
            setFormLabel("")
        }
        console.log('inside hook on change stringify formData');
    }, [JSON.stringify(formData)]);

    const trimExtraSymbols = (string: any) => {
        return string
            .replace(/<[^>]+>/g, '') // remove html tags
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/&gt;/g, '>')
            .replace(/&lt;/g, '<');
    }

    const handlePhoneNumberChange = (event: any) => {
        const inputEl = event.target.value;
        const phoneNum = inputEl.replace(/[^\d]/g, '')
        const phoneLength = phoneNum.length

        let phoneNumValue
        if (!inputEl) {
            phoneNumValue = inputEl
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
        setPhoneNumberFormat(phoneNumValue)
    };

    const handleControlPopperOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
        setSelected(field)
        setReload(!reload)
        setAnchorOppperControlEl(e.target)

    }
    const handleMenuClose = (value: any) => {

        setAnchorOppperControlEl(value)

    }

    const handleBtnTextChange = (value: any) => {
        setBtnValue(value)
        if (field.fieldType === "pagebreak") {
            formData.forEach((obj: any, idx: number, fdArr: any[]) => {
                if (obj.id === field.id) {
                    fdArr[idx] = { ...obj, btnValue: value };
                }
                return obj;
            });
        }
    }

    const handlePageTextChange = (value: any) => {
        setPageValue(value)
        formData.forEach((obj: any, idx: number, fdArr: any[]) => {
            if (obj.id === field.id) {
                fdArr[idx] = { ...obj, textValue: value };
            }
        });
    }


    const handleChange = (event: any) => {
        setSelectedOption(event.target.value);
        setOpenOptionPopup(false);
        const selectedDropDownType = event.target.value;
        if (selectedDropDownType) {
            const selectedOptionData = optionData.find(option => option.optionbankname === selectedDropDownType);
            if (selectedOptionData) {
                const clonedData = [...formData];
                const updatedData = clonedData.map((option: any) => {
                    // if (option.fieldType === 'dropdown') { //commented due to issue
                    if (option.id === field.id) {
                        const listArray = selectedOptionData.list.split("\n");
                        return { ...option, options: listArray };
                    }
                    return option;
                });

                setFormData(updatedData);
            }
        }
    };

    const handlePoperClose = (value: any) => {
        setAnchorOppperEl(value)
        updateFormData();
    }

    const handlePopperOpen = (e: any, type: any) => {
        setValueType(type)
        setAnchorOppperEl(e.target)

        // if (type === "button") {
        //     setBtnValue(btnValue)
        // }
        // else setPageValue(pageValue)
    }

    const handleTitle = (event: any) => {
        let newLabel = trimExtraSymbols(event?.target?.value ? event?.target?.value.trim() : "")
        setLabelName(newLabel);
    }

    const updateTitleOnBlur = (event: any) => {
        setFormData((prevFormData: any) => {
            const newFormData = [...prevFormData];
            newFormData[formIndex].labelName = event.target.innerText;
            if (generateDataKey) {
                const modifiedLabel = labelName.replace(/\s+/g, '_').replace(/[^\w\s]/gi, '').toLowerCase();
                newFormData[formIndex].datakey = modifiedLabel;
            }
            return newFormData;
        });
    }

    const handleOptional = (event: any) => {
        const newContent = trimExtraSymbols(event.target.value);
        setDescription(newContent);
    }

    const handleOptionalSaveOnBlur = (event: any) => {
        setFormData((prevFormData: any) => {
            const newFormData = [...prevFormData];
            newFormData[formIndex].description = event.target.innerText;
            return newFormData;
        });
    }

    const handleLabelText = (event: any) => {
        let value = trimExtraSymbols(event?.target?.value || "");
        setFormLabel(value);
    }

    const handleLabelTextOnBlur = (event: any) => {
        setFormData([...formData]);
        setFormData((prevFormData: any) => {
            const newFormData = [...prevFormData];
            const modifiedFormLabel = event?.target?.innerText;
            newFormData[formIndex].labelValue = modifiedFormLabel;
            return newFormData;
        });
    }

    // const handleSaveTitle = () => {
    //     // const newState = formData.map((obj: any) => {
    //     //     if (obj.id === field.id) {
    //     //         return { ...obj, labelName: e.target.innerText };
    //     //     }
    //     //     else {
    //     //         return { ...obj }
    //     //     }

    //     // });
    //     // formData[formIndex].labelName = e.target.innerText
    //     // // console.log(newState, 'new')
    //     // setFormData([...formData]);
    //     if (generateDataKey) {
    //         const trimmedLabel = labelName.trim();
    //         formData[formIndex].datakey = trimmedLabel;
    //         setFormData([...formData]);
    //     }
    // }

    const editorLabel = (newContent: any) => {
        // console.log(newContent);
        setLabelName(newContent)
        field.labelName = newContent;
        // console.log(newContent);
    }

    const hanldeRequired = () => {
        setShowRequired((prevState) => !prevState)
        let index = formData.findIndex((form: any) => form.id === field.id)
        formData[index].isRequired = !formData[index].isRequired;
        setFormData(formData)

    }

    const handleSecure = () => {
        const updatedFormData = formData.map((form: any) => {
            if (form.id === field.id) {
                return { ...form, isSecure: !form.isSecure };
            }
            return form;
        });
        setFormData(updatedFormData);
    };


    // React.useEffect(() => {
    //     setTimeout(() => {
    //         if (editableRefs.current) {
    //             editableRefs.current[focusIndex?.val]?.focus()
    //         }
    //     }, 500)

    // }, [focusIndex])


    const handleCopy = (e: any) => {
        // deleteElement(field.id);
        e.stopPropagation()
        copyElement(field, formIndex + 1)

    }

    const handleDelete = () => {
        // e.stopPropagation()
        const updatedData = formData.filter((item: any, i: any) => item.id !== field.id);

        // setCreatedFields([...updatedData]);
        setFormData([...updatedData]);
        // handleCloseDeletePopup()
    }

    const getLabel = () => {
        let label = ""
        switch (inputType) {
            case "textbox":
                label = "Your Question here"
                break;

            case "textarea":
                label = "Your Question here"
                break;
            case "date":
                label = "Your Question here"
                break;
            case "email":
                label = "@mail"
                break;

            case "ssn":
                label = "SSN"
                break;

            case "phone":
                label = "Your Question here"
                break;
            case "rating":
                label = "Your Question here"
                break;
            case "ranking":
                label = "Your Question here"
                break;
            case "opinionscale":
                label = "Your Question here"
                break;
            case "netprometer":
                label = "Your Question here"
                break;
            case "address":
                label = "Your Question here"
                break;
            case "yes/no":
                label = "Your Question here"
                break;
            case "fileupload":
                label = "Your Question here"
                break;
            case "multiplechoice":
                label = "Your Question here"
                break;
            case "weightedmultiplechoice":
                label = "Your Question here"
                break;
            case "checkbox":
                label = "Your Question here"
                break;

            case "dropdown":
                label = "Your Question here"
                break;

            default:
            // console.log('')
        }

        return label
    }

    const showSettings = (type: string) => {
        const temp = options[type as keyof typeof options]
        if ((temp.indexOf(inputType) !== -1)) {
            return true
        }
        else return false
    }
    const showTitle = () => {
        let types = ["pagebreak", "displaytext", "divider", "label", "embedimage", "embedvideo", "embedaudio", "embedanything", "conditionallogic"]
        if (types.indexOf(inputType) === -1) {
            return true
        }

    }
    const showOptionBank = (type: string) => {
        const temp = options[type as keyof typeof options]
        if (temp.indexOf(inputType) !== -1) {
            return true
        }
        else return false
    }
    React.useEffect(() => {
        setLabelName(field.labelName);
        setDescription(field.description);
        if (field.labelValue) {
            setFormLabel(field.labelValue)
        }
    }, [field.id, field.labelName, field.description])



    const opinionscaleArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


    const [dataKeyAnchorEl, setDataKeyAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClickDataKey = (event: React.MouseEvent<HTMLButtonElement>) => {
        setDataKeyAnchorEl(event.currentTarget);
        // setDataKeyValue(field.datakey)
    };

    const handleCloseDataKey = () => {
        setDataKeyAnchorEl(null);
    };

    const openDataKeyPopup = Boolean(dataKeyAnchorEl);
    const id = openDataKeyPopup ? 'datakey' : undefined;

    const getFile = (value: any) => {
        // console.log("")
    }

    const handleReload = (data: any) => {
        setReload(data)
    }

    const getDateValue = (date: any) => {
        // console.log()
    }
    // const [showDataKeyErr, setDataKeyErr] = React.useState("");
    let copiedData = [...formData]

    const handleDataKey = (e: any) => {
        const value = e?.target?.value;

        setDataKeyValue(value);

        let dataKeyArr: any[] = [];

        copiedData.forEach((obj: any) => {
            if (obj.id === field.id) {
                obj.datakey = value;
            }
        });

        if (dataKeyValue) {
            dataKeyArr = copiedData.filter((form: any) => form.datakey?.toLowerCase() === value.toLowerCase());
        }

        if (dataKeyArr.length > 1) {
            let finalErrorIndex = dataKeyArr.length - 1;
            let index = copiedData.findIndex((data: any) => data.id === dataKeyArr[finalErrorIndex].id);
            let errorIndex = copiedData.findIndex((data: any) => data.id === copiedData[index].id);
            copiedData[errorIndex].errorText = "This data key already exists in other controls";
            copiedData.forEach((obj: any) => {
                if (obj.id !== copiedData[index].id) {
                    obj.errorText = "";
                }
            });
        } else {
            copiedData.forEach((obj: any) => {
                obj.errorText = "";
            });
        }
    }

    const updateFormData = () => {
        setFormData([...formData]);
    }


    React.useEffect(() => {
        copiedData.forEach((data) => {
            if (data.errorText) {
                data.datakey = "";
                data.errorText = ""
            }
        })
        setDataKeyValue(field.datakey)
        // setFormData([...copiedData])
    }, [dataKeyAnchorEl])


    const handleKeyDown = (evt: any) => {
        if (evt.keyCode === 32) {
            evt.preventDefault();
            return false
        }
    }

    // const getAddressValue = (opt: any, id: any) => {

    // }
    const getAddressValue = (address: any, formId: any) => {
        // console.log("Received address: ", address);
        // console.log("Form ID: ", formId);
        setAddressData(prevState => ({
            ...prevState,
            [formId]: address
        }));
    };

    const getRankValues = (newRankings: Ranking[], formId: string) => {
        // console.log(newRankings)
        const updatedRankings: Rankings = { ...rankings, [formId]: newRankings };
        setRankings(updatedRankings);

    };




    const [openDeletePopup, setOpenDeletePopup] = React.useState(false);

    const handleClickOpenDeletePopup = () => {
        setOpenDeletePopup(true);
        // console.log('aaaaaaaaaaaa', field.labelName)
    };

    const handleCloseDeletePopup = () => {
        setOpenDeletePopup(false);
    };

    const [openOptionPopup, setOpenOptionPopup] = React.useState(false);
    const [optionBankAnchorEl, setoptionBankAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClickOpenOptionePopup = () => {
        setOpenOptionPopup(false)
    };

    const loadOptionList = (event: React.MouseEvent<HTMLButtonElement>) => {
        setOpenOptionPopup(true)
        setoptionBankAnchorEl(event.currentTarget);
        trackPromise(
            ApiService.getCall(214, `getOptionBankList/${clientId}`)
                .then((response: any) => {
                    setOptionData(response.data.list);
                }
                )
        )
    }



    return (
        (<Box sx={{ ml: 2, width: "100%" }} >
            {showTitle() && <>
                <Box className="text-sub" sx={{ display: "flex", width: "100%" }}>
                    <Box sx={{ display: "flex" }}>
                        {/* <Typography variant='h6' contentEditable="true" className='content-edit title-text' onInput={handleTitle} placeholder={getLabel()} sx={{ wordBreak: "break-all" }}>
                            {labelName}


                        </Typography> */}
                        <Box>
                            <ContentEditable
                                className='content-edit title-text'
                                style={{ fontWeight: "600" }}
                                html={labelName}
                                spellCheck={false}
                                onChange={handleTitle}
                                placeholder={getLabel()}
                                innerRef={titleRef}
                                onBlur={updateTitleOnBlur}
                            // innerRef={(ref: HTMLDivElement) => editableRefs.current[formIndex] = ref}
                            />
                        </Box>
                        {/* {field.helptext &&
                            <BootstrapTooltip title={field.helptext}>
                                <HelpIcon sx={{ fontSize: "20px", color: "rgb(119, 118, 114,0.8);" }} />
                            </BootstrapTooltip>
                        } */}


                    </Box>

                    {<Box sx={{ color: "red", fontSize: "20px", visibility: field.isRequired ? "shown" : "hidden" }}>*</Box>}
                </Box>
                <Box className="text-sub" sx={{ width: "100%" }}>

                    {/* <Typography className="desc_text content-edit" contentEditable="true" onInput={handleOptional} placeholder={" Description (Optional)"} sx={{ wordBreak: "break-all" }}>
                    </Typography> */}

                    <ContentEditable
                        className='content-edit discription-text'
                        style={{ fontWeight: "bold" }}
                        spellCheck={false}
                        html={description}
                        onChange={handleOptional}
                        onBlur={handleOptionalSaveOnBlur}
                        placeholder={" Description (Optional)"}
                    />
                </Box>
            </>}
            <Box className="text-sub">
                {inputType === "textbox" ? <TextField variant="outlined" sx={{
                    width: "100%", background: "#fff", borderRadius: "4px",
                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                        color: '#1A1A1A',
                        fontSize: '14px',
                        fontWeight: 600,
                        fontFamily: 'Segoe UI',
                    },
                    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgb(187, 186, 184)',
                    },
                    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'var(--c-primary-color)',
                    },
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'var(--c-primary-color)',
                        borderWidth: '2px',
                    },
                }} inputProps={{
                    style: {
                        height: "4px",
                        borderColor: "#fff"
                    },
                }}
                    placeholder={field.placeholder}
                /> : inputType === "date" ? <DateComponent value="" label="" width="97.8%" isFromPreview={false} dateItem="" getDateValue={getDateValue} id="" name="" isReadonly={false} /> : inputType === "ssn" ? <TextField variant="outlined" sx={{
                    width: "100%", background: "#fff", borderRadius: "4px", '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgb(187, 186, 184)',
                    },
                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                        color: '#1A1A1A',
                        fontSize: '14px',
                        fontWeight: 600,
                        fontFamily: 'Segoe UI',
                    }, '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'var(--c-primary-color)',
                    },
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'var(--c-primary-color)',
                        borderWidth: '2px',
                    },
                }} inputProps={{
                    style: {
                        height: "4px",
                        borderColor: "#fff"
                    },
                }} /> : inputType === "pagebreak" ? (<Box sx={{ width: "100%" }} className="page-break">
                    <Button variant="contained" sx={{ backgroundColor: "var(--c-primary-color)" }} className='btn-break' onClick={(e) => handlePopperOpen(e, "button")}>
                        {btnValue}
                    </Button>

                    <Box sx={{ display: "flex", position: "relative", mt: 5, justifyContent: "space-between" }}>
                        <Box className="line-one"></Box>
                        <Typography className='page-text' onClick={(e) => handlePopperOpen(e, "page")}>{pageValue}</Typography>
                        <Box className="line-two"></Box>
                    </Box>
                </Box>) : inputType === "phone" ? <Box>
                    <TextField variant="outlined" placeholder='123-456-7891' sx={{
                        width: "100%", background: "#fff", borderRadius: "4px",
                        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgb(187, 186, 184)',
                        }, '& .MuiInputBase-input.MuiOutlinedInput-input': {
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
                        value={phoneNumberFormat}
                        onChange={handlePhoneNumberChange}
                        inputProps={{
                            inputMode: 'tel',
                            style: {
                                height: "4px",
                                borderColor: "#fff"
                            },
                        }} />
                </Box> : inputType === "email" ? <Box>
                    <TextField variant="outlined" type='email'
                        sx={{
                            width: "100%", background: "#fff", borderRadius: "4px", '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgb(187, 186, 184)',
                            }, '& .MuiInputBase-input.MuiOutlinedInput-input': {
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
                        }} inputProps={{
                            style: {
                                height: "4px",
                                borderColor: "#fff"
                            },
                        }}
                        placeholder={field.placeholder}
                    />
                </Box> : inputType === "address" ? <AddressComponent field={field} id="" name="" value={""} getAddressValue={getAddressValue} errorObj={""} isFromPreview={false} /> : inputType === "rating" ? <RatingComponent /> : inputType === "ranking" ? <RankingComponent isFromPreview={false} field={field} getRankValues={getRankValues} optionsList={''}
                /> :
                    inputType === "displaytext" ? <Box><TextEditorComponent editorLabel={editorLabel} labelName={labelName} field={field} /> </Box> : inputType === "opinionscale" ?

                        <Box sx={{ display: 'flex', justifyContent: "space-between", mt: 1, width: "100%" }}>
                            {field.choices.map((opinion: any, index: number) => {
                                return (
                                    <Box className="opinion-cls" key={opinion + index}>
                                        <Typography className="opinion-text">{opinion}</Typography>
                                    </Box>
                                )
                            })}
                        </Box> : inputType === "textarea" ?
                            <><TextField
                                placeholder={field.placeholder}
                                multiline
                                minRows={2}
                                maxRows={4}
                                sx={{
                                    width: "100%", background: "#fff", borderRadius: "4px", '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'rgb(187, 186, 184)',
                                    }, '& .MuiInputBase-input.MuiOutlinedInput-input': {
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
                                }} inputProps={{
                                    style: {
                                        // height: "4px",
                                        borderColor: "#fff"
                                    },
                                }}
                            /></> : inputType === "netprometer" ? <Box sx={{ display: 'flex', flexDirection: "column", mt: 1 }}>
                                <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                    {opinionscaleArr.map((opinion, index) => {
                                        return (
                                            <Box className="opinion-cls" key={opinion + index}>
                                                <Typography className="opinion-text">{opinion}</Typography>

                                            </Box>

                                        )
                                    })}
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    {opinionscaleArr.map((opinion, index) => {
                                        return (
                                            <Box key={index}>
                                                {index === 0 && <Box><Typography className='not-like-text'>Not Likely</Typography></Box>}
                                                {index === opinionscaleArr.length - 1 && <Typography className='like-text'>Extremely Likely</Typography>}
                                            </Box>
                                        )
                                    })}
                                </Box>


                            </Box> : inputType === "yes/no" ? <Box className="yes-container">
                                <Box className="yes-box">
                                    <Box className="yes-box-child">Y</Box>
                                    <Typography className="yes-box-text">Yes</Typography>
                                </Box>
                                <Box className="yes-box">
                                    <Box className="yes-box-child">N</Box>
                                    <Typography className="yes-box-text">No</Typography>
                                </Box>
                            </Box> : inputType === "fileupload" ? <FileUploadComponent isPreview={false} getFile={getFile} changeHandler={""} name={""} width={"100%"} field={null} indexVal={null} fileData={""} /> : inputType === "divider" ?
                                <Box >
                                    <Box className="divder-container">
                                        <Box className="divider-cls">Divider</Box>
                                        <Box sx={{ width: "100%", height: "3px", background: "#1565c0", marginTop: "11%" }}></Box>
                                    </Box>
                                </Box> : inputType === "label" ? <Box className="label-container" >
                                    {/* <Box  contentEditable="true" placeholder="Enter label" > */}
                                    <ContentEditable
                                        className="label-text"
                                        html={formLabel}
                                        spellCheck={false}
                                        onChange={handleLabelText}
                                        placeholder="Enter label"
                                        onBlur={handleLabelTextOnBlur}
                                    // innerRef={(ref: HTMLDivElement) => editableRefs.current[formIndex] = ref}
                                    />

                                    {/* <TextField id="outlined-basic" variant="outlined" sx={{ width: "97.8%", background: "#fff", borderRadius: "4px" }} inputProps={{
                                        style: {
                                            height: "4px",
                                            borderColor: "#fff"
                                        },
                                    }} /> */}
                                </Box> : inputType === "dropdown" ? <DropdownComponent field={field} /> : (inputType === "multiplechoice" || inputType === "weightedmultiplechoice") ? <MultiChoiceComponent isFromPreview={false} field={field} formIndex={formIndex} /> :
                                    inputType === "checkbox" ? <CheckboxComponent isFromPreview={false} field={field} />
                                        :




                                        inputType === 'embedimage' ?
                                            <Box>
                                                <Box>
                                                    {field.value ? (<><EmbedEditorImg imgSrc={field.value} /></>) : (<></>)}
                                                </Box>
                                            </Box>
                                            : inputType === 'embedvideo' ?
                                                // <Box>
                                                //     {propsData.embededVideos.map((videoUrl: any) => {
                                                //         return (<Box>
                                                //             <EmbedEditorVideo videoSrc={videoUrl} />
                                                //         </Box>)
                                                //     })}



                                                // </Box>
                                                <Box>
                                                    <Box>
                                                        {field.value ? (<><EmbedEditorVideo videoSrc={field.value} /></>) : (<></>)}
                                                    </Box>
                                                </Box>
                                                : inputType === 'embedaudio' ?
                                                    // <Box>
                                                    //     {propsData.embededAudios.map((audioUrl: any) => {
                                                    //         return (<Box>
                                                    //             <EmbedEditorAudio audioSrc={audioUrl} />
                                                    //         </Box>)
                                                    //     })}



                                                    // </Box>

                                                    <Box>
                                                        <Box>
                                                            {field.value ? (<><EmbedEditorAudio audioSrc={field.value} /></>) : (<></>)}
                                                        </Box>
                                                    </Box>
                                                    : inputType === 'embedanything' ?
                                                        // <Box>
                                                        //     {propsData.embededFiles.map((fileUrl: any) => {
                                                        //         return (
                                                        //             <Box>
                                                        //                 <EmbedEditorAny fileSrc={fileUrl} />
                                                        //             </Box>)
                                                        //     })}



                                                        // </Box>


                                                        <Box>
                                                            <Box>
                                                                {field.value ? (<><EmbedEditorAny fileSrc={field.value} /></>) : (<></>)}
                                                            </Box>
                                                        </Box>
                                                        : inputType === "conditionallogic" ? <ConditionalLogic field={field} /> : null}

            </Box>
            <Box className="options_text" sx={{ visibility: currentIndexValue === formIndex ? "shown" : "hidden" }}>
                {showOptionBank('optionBank') && <BootstrapTooltip title="optionsBank">
                    <Button
                        disableRipple
                        onClick={loadOptionList} sx={{
                            padding: "0px", margin: "0px", color: "#000000", minWidth: "40px", '&:hover': {
                                backgroundColor: 'transparent'
                            }
                        }}>
                        <ListIcon sx={{ fontSize: "20px" }} className="icon_cls" />
                    </Button>
                </BootstrapTooltip>}
                <Popover
                    id={id}
                    open={openOptionPopup}
                    onClose={handleClickOpenOptionePopup}
                    anchorEl={optionBankAnchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    sx={{
                        width: 'auto',
                        // maxWidth: '12000px',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <Box sx={{ p: 2 }}>
                        <Typography sx={{ marginBottom: 1 }}>Select Option Bank</Typography>
                        <Select
                            value={selectedOption}
                            onChange={handleChange}
                            fullWidth
                            size='small'
                            sx={{ fontSize: 'small', width: '220px' }}
                        >
                            {optionData.map((option, index) => (
                                <MenuItem key={index} value={option.optionbankname} sx={{ fontSize: 'small' }}>
                                    {option.optionbankname}
                                </MenuItem>
                            ))}
                        </Select>

                    </Box>
                </Popover>
                {showSettings("datakey") && <Box>
                    <BootstrapTooltip title="Data Key">
                        <Button
                            disableRipple
                            onClick={handleClickDataKey}
                            sx={{
                                padding: "0px", margin: "0px", color: field.datakey ? "#08adff" : "#000000", minWidth: "40px",
                                '&:hover': {
                                    backgroundColor: 'transparent'
                                }
                            }}>
                            <VpnKeyIcon sx={{ fontSize: "20px" }} className="icon_cls" />
                        </Button>
                    </BootstrapTooltip>

                    <Popover
                        id={id}
                        open={openDataKeyPopup}
                        anchorEl={dataKeyAnchorEl}
                        onClose={handleCloseDataKey}
                        sx={{
                            '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                p: '5px'
                            }
                        }}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <Box component='div' sx={{ p: 1 }}>
                            <Typography className='btn-break'>Data Key</Typography>
                            <TextField spellCheck='false' sx={{
                                '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgb(187, 186, 184)',
                                },
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
                                value={dataKeyValue}
                                onChange={handleDataKey}
                                onKeyDown={handleKeyDown}
                                onBlur={updateFormData}
                            />
                            <Box sx={{ mt: 1, color: "red", fontSize: "13px" }}>
                                {field.errorText}
                            </Box>
                        </Box>

                    </Popover>
                </Box>}
                {
                    isSecureAddSettingEnabled ? (
                        showSettings("dataLock") &&
                        (<BootstrapTooltip title="Secure">
                            <Button onClick={handleSecure}
                                disableRipple
                                sx={{
                                    padding: "0px", margin: "0px", color: "#000000", minWidth: "40px", '&:hover': {
                                        backgroundColor: 'transparent'
                                    }
                                }}>
                                <LockIcon sx={{ fontSize: "20px", color: field.isSecure ? "red" : "#000000" }} className="icon_cls" />
                            </Button>
                        </BootstrapTooltip>
                        )
                    ) : null
                }
                {showSettings("settings") && <BootstrapTooltip title="Settings">
                    <Button
                        disableRipple
                        onClick={handleControlPopperOpen} sx={{
                            padding: "0px", margin: "0px", color: "#000000", minWidth: "40px", '&:hover': {
                                backgroundColor: 'transparent'
                            }
                        }}>
                        <SettingsSharpIcon sx={{ fontSize: "20px" }} className="icon_cls" />
                    </Button>
                </BootstrapTooltip>}
                {showSettings("required") && <BootstrapTooltip title="Required">
                    <Button
                        disableRipple
                        sx={{
                            padding: "0px", margin: "0px", color: "#000000", minWidth: "40px", '&:hover': {
                                backgroundColor: 'transparent'
                            }
                        }} onClick={hanldeRequired}>
                        <StarIcon sx={{ fontSize: "20px", color: field.isRequired ? "red" : "#000000" }} className="icon_cls" />
                    </Button>
                </BootstrapTooltip>}
                {showSettings("clone") && <BootstrapTooltip title="Copy">
                    <Button onClick={handleCopy}
                        disableRipple
                        sx={{
                            padding: "0px", margin: "0px", color: "#000000", minWidth: "40px", '&:hover': {
                                backgroundColor: 'transparent'
                            }
                        }}>
                        <ContentCopyIcon sx={{ fontSize: "20px" }} className="icon_cls" />
                    </Button>
                </BootstrapTooltip>}
                {/* {showSettings("delete") && <BootstrapTooltip title="Delete">
                    {canDelete ?
                        <Button
                            // onClick={handleDelete}
                            onClick={handleClickOpenDeletePopup}
                            disableRipple
                            sx={{
                                padding: "0px", margin: "0px", color: "#000000", minWidth: "40px", '&:hover': {
                                    backgroundColor: 'transparent'
                                }
                            }}>
                            <DeleteIcon sx={{ fontSize: "20px" }} className="icon_cls" />
                        </Button>
                        : null}
                </BootstrapTooltip>} */}
                {isCustomFieldDeleteSettingEnabled && showSettings("delete") && (field.canDelete !== false) && <BootstrapTooltip title="Delete">
                    <Button
                        onClick={() => {
                            confirmDialog(`Are you sure you want to delete ${field.fieldType !== "conditionallogic" ? field.labelName : "Conditional logic"} ?`, () => {
                                handleDelete();
                            }, "warning");
                        }}
                        // handleClickOpenDeletePopup
                        disableRipple
                        sx={{
                            padding: "0px", margin: "0px", color: "#000000", minWidth: "40px", '&:hover': {
                                backgroundColor: 'transparent'
                            }
                        }}>
                        <DeleteIcon sx={{ fontSize: "20px" }} className="icon_cls" />
                    </Button>
                </BootstrapTooltip>}


            </Box>
            <ControlSettings anchorElement={anchorPopperControlEl} handleMenuClose={handleMenuClose} fieldValue={inputType} field={field} indexVal={formIndex} reload={reload} handleReload={handleReload} selectedField={selectedField} />
            <PopperComponent anchorEl={anchorPopperEl} handleClose={handlePoperClose} inputValue={btnValue} handleBtnTextChange={handleBtnTextChange} handlePageTextChange={handlePageTextChange} pageValue={pageValue} valueType={valueType} />
            <Dialog
                className='formBuilder'
                open={openDeletePopup}
                onClose={handleCloseDeletePopup}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"

            >
                <Box className='delete-popup-card'>

                    <DialogContent>
                        <DialogContentText
                            id="alert-dialog-description"
                        >
                            <Typography className='delete-popup-text'>
                                Are you sure you want to delete {field.fieldType !== "conditionallogic" ? field.labelName : "Conditional logic"} ?
                            </Typography>
                            {/* <Typography className='delete-popup-text'></Typography> */}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions className='delete-popup-btn-align'>
                        <Button
                            onClick={handleDelete}
                            variant='contained'
                            className='delete-popup-btn-yes delete-popup-btn'
                        >
                            Yes
                        </Button>
                        <Button onClick={handleCloseDeletePopup}
                            variant='contained'
                            className='delete-popup-btn-no delete-popup-btn'
                        >
                            No
                        </Button>
                    </DialogActions>

                </Box>
            </Dialog>
        </Box>)
    );
}

export default TextComponent