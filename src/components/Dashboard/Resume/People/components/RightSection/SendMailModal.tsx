import { useContext } from "react";
import { React, useState, useEffect } from "../../../../../../shared/modules/React";
// import { Button, Stack, Box, Typography, ButtonGroup, IconButton, Autocomplete, TextField, Menu, MenuItem, Checkbox, Modal, FormControl, RadioGroup, Radio, FormControlLabel } from "@mui/material";
import { Stack } from "../../../../../../shared/modules/MaterialImports/Stack";
import { Box } from "../../../../../../shared/modules/MaterialImports/Box";
import { Typography } from "../../../../../../shared/modules/MaterialImports/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import { MenuItem } from "../../../../../../shared/modules/MaterialImports/Menu";
import Modal from "@mui/material/Modal";
import { Radio } from "../../../../../../shared/modules/MaterialImports/FormElements";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
// import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import { styled } from "@mui/material/styles";
// import FormatSizeRoundedIcon from '@mui/icons-material/FormatSizeRounded';
// import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import apiService from "../../shared/api/apiService";
// import ReactQuill from 'react-quill';
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Dangerous from "@mui/icons-material/Dangerous"
// import 'react-quill-new/dist/quill.snow.css';
// import apiService from "../../shared/api/apiService";
import AutocompleteComponent from "./AutocompleteComponent";
// import QuillToolbar, { modules, formats } from "./QuillToolbar";
import { Grid, Button, TextField } from "../../../../../../shared/modules/commonImports";
import GridViewIcon from "@mui/icons-material/GridView";
import IntegrationInstructionsOutlinedIcon from "@mui/icons-material/IntegrationInstructionsOutlined";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
// import InputAdornment from '@mui/material/InputAdornment';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
// import InputLabel from '@mui/material/InputLabel';
import { Store } from "../DataLabs/DataLabs";
import { fetchCheckedUserIds } from "../../shared/utills/helper";


// const BpIcon = styled("span")((
//     // { theme }
// ) => ({
//     borderRadius: 1,
//     width: 16,
//     height: 16,
//     backgroundColor: "#ffffff",
// }));

// const BpCheckedIcon = styled(BpIcon)({
//     backgroundColor: '#146EF6',
//     "&:before": {
//         display: "block",
//         width: 16,
//         height: 16,
//         backgroundImage:
//             "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
//             " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
//             "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
//         content: '""',
//     },
// });

// const BpCheckboxContainer = styled("div")({
//     ".bp-icon": {
//         border: "1px #CACACC solid",
//     },
//     "& .bp-checkbox:hover .bp-icon": {
//         borderColor: '#146EF6',
//     },
// });

const RadioBpIcon = styled("span")(({ theme }) => ({
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
        theme.palette.mode === "dark" ? "red" : "inset 0 0 0 1px rgba(16,22,26,.2)",
}));

const RadioBpCheckedIcon = styled(RadioBpIcon)({
    backgroundColor: "#146EF6",
    boxShadow: "none",
    backgroundImage:
        "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
        display: "block",
        width: 16,
        height: 16,
        backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
        content: '""',
    },
});

// const fromOption = [
//     { label: 'Mastan Vali', year: 1994, id: 1, email: "mvali@askconsulting.com" },

// ]

const ccOption = [
    { label: 'The Shawshank Redemption', year: 1994, },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
]


const radioOptions = [
    { label: 'Immediately', time: 'Sun Jul 30 1:02 PM' },
    { label: 'In 1 hour', time: 'Sun Jul 30 1:02 PM' },
    { label: 'In 2 hours', time: 'Sun Jul 30 1:02 PM' },
    { label: 'In 24 hours', time: 'Sun Jul 30 1:02 PM' },
    { label: 'Next business day morning', time: 'Sun Jul 30 1:02 PM' },
    { label: 'Next business day afternoon', time: 'Sun Jul 30 1:02 PM' },
    { label: 'In 7 days', time: 'Sun Jul 30 1:02 PM' },
    { label: 'In 30 days', time: 'Sun Jul 30 1:02 PM' },
]

const timeOptions = [
    { time: '12:00 am' },
    { time: '12:30 am' },
    { time: '1:00 am' },
    { time: '1:30 am' },
    { time: '2:00 am' }
]

interface SendMailModalProps {
    handleTableMenuSendMaiClose: (PersonId: any) => void;
    PersonId: any;
    PersonMail: any;
    personObj: any
    showEmailSuccess: () => void;
    checkedRowValues: any;
    isBulk: boolean;
    PersonName: any;
    checkedRowIds: any;
}

const SendMailModal: React.FC<SendMailModalProps> = ({ handleTableMenuSendMaiClose, PersonId, PersonMail, personObj, showEmailSuccess, checkedRowValues, isBulk, PersonName, checkedRowIds }) => {
    const [state, setState] = React.useState<any>({ value: null });
    console.log('maillllllllllll', PersonMail)

    // const handleChange = (value: any) => {
    //     if (value === "<p><br></p>") {
    //         value = ""
    //     }
    //     // setValue(e)
    //     setEmailObj((prevState: any) => ({
    //         ...prevState, body: value
    //     }))

    //     setEmailBodyError(false)
    //     setState({ value });
    // };
    const [searchData, setSearchData, isFilterApplied, setFilterApply, isCompanySelected, setIsCompanySelected] = useContext(Store);


    // const [anchorEl, setAnchorEl] = useState<any>(null);
    // const editorRef = useRef<any>(null);

    // const handlePopoverOpen = (event: any): void => {
    //     setAnchorEl(event.currentTarget);
    // };

    // const handlePopoverClose = (): void => {
    //     setAnchorEl(null);
    // }

    // const open = Boolean(anchorEl);

    // const [placeholders, setPlaceHolders] = useState(null)

    // const placeholder = () => {
    //     let dataToPass = {
    //         clientId: localStorage.getItem('clientId'),
    //         userIds: "",
    //         jobId: "",
    //         recrId: "",
    //     }

    //     apiService.getPlaceHolder(dataToPass).then((response: any) => {
    //         if (response.status === 200) {
    //             setPlaceHolders(response.data)
    //         }
    //     });
    // }
    // useEffect(() => {
    //     placeholder()
    // }, [])


    // console.log(checkedRowValues, "vvvv", checkedIndexes)
    // const [fromAnchorEl, setFromAnchorEl] = useState<null | HTMLElement>(null);
    const [templateAnchorEl, setTemplateAnchorEl] = useState<null | HTMLElement>(null);
    const [radioHover, setRadioHover] = useState(false)
    const [templateList, setTemplateList] = useState<any>([])
    const [newTemplateList, setNewTemplateList] = useState<any>([])
    const [emailObj, setEmailObj] = useState({
        "subject": '',
        "fromName": '',
        "fromEmail": '',
        "body": '',
        "userIds": !isBulk ? personObj.userId : fetchCheckedUserIds(checkedRowValues, searchData.displayData),
    })
    // const [templateValue, setTemplateValue] = useState<any>("Select All Templates")
    const [tempPlaceHolder, setTempPlaceHolder] = useState<any>("Select All Templates")
    const [showError, setShowError] = React.useState(false);
    const [modalErrorMessage, setmodalErrorMessage] = React.useState("")
    const [showValidationError, setShowValidationErr] = useState(false)
    const [fromEmailError, setFromEmailError] = useState(false)
    const [subjectError, setSubjectError] = useState(false)
    const [emailBodyError, setEmailBodyError] = useState(false)
    const [templateType, setTemplateType] = useState("allTemplates")
    const closeErrorLayout = () => {
        setShowError(false)
    }


    const closeValidationErrorLayout = () => {
        setShowValidationErr(false)
    }


    const handleRadioHoverEnter = (label: any) => {
        setRadioHover(label)
    }

    const handleRadioHoverLeave = () => {
        setRadioHover(false)
    }


    // console.log('PersonId', PersonId)

    // const [selectedFromOption, setSelectedFromOption] = useState({ label: 'Mastan Vali', year: 1994, id: 1, email: "mvali@askconsulting.com" })
    // const [selectedTemplate, setSelectedTemplate] = useState("")

    // const openFrom = Boolean(fromAnchorEl);
    // const openTemplate = Boolean(templateAnchorEl);


    // const handlefromClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     setFromAnchorEl(event.currentTarget);
    // };


    // const handlefromClose = () => {
    //     setFromAnchorEl(null);
    // };

    // const handleMenuFromItemClick = (option: any) => {
    //     setEmailObj({ ...emailObj, fromName: option.label, fromEmail: option.email })
    //     setSelectedFromOption(option)
    //     handlefromClose()
    // }

    const getFromOption = (value: any) => {

        setFromEmailError(false)
        setEmailObj((prevState: any) => ({
            ...prevState, fromName: value.label, fromEmail: value.id
        }))
    }


    // const handleTemplateClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     setTemplateAnchorEl(event.currentTarget);
    //     // setShowTemplateError(false)
    // };

    const handleTemplateClose = () => {
        setTemplateAnchorEl(null)
    }
    const handleTemplateMenuClick = async (template: any) => {
        let tempArr = template.split("/")
        // setTemplateValue(template.templateName)
        // try {
        //     let templateResp = await apiService.getTemplateDetails(tempArr[1])
        //     // console.log(templateResp, 'templateResp')
        //     if (templateResp?.data) {
        //         setEmailObj((prevState: any) => ({
        //             ...prevState, subject: templateResp.data.subject, body: templateResp.data.body
        //         }))
        //         setSubjectError(false)
        //         setEmailBodyError(false)
        //         setState({ value: templateResp.data.body });
        //         // setValue(templateResp.data.body)
        //     }
        // }
        // catch (e) {

        // }
        setEmailObj({ ...emailObj, subject: tempArr[2], body: tempArr[3] })
        setState({ value: tempArr[3] })
        handleTemplateClose()
    }
    // const [value, setValue] = useState('');
    const [ccChecked, setCCChecked] = useState(false)
    const [openDelivery, setOpenDelivery] = React.useState(false);
    // const handleOpenDelivery = () => setOpenDelivery(true);
    const handleCloseDelivery = () => setOpenDelivery(false);
    // const handleCCChecked = () => {
    //     setCCChecked(!ccChecked)
    // }
    // const [showEditorFormat, setShowEditorFormat] = useState(false)

    // const toggleFormatButton = () => {
    //     setShowEditorFormat(!showEditorFormat)
    // }

    const [radioChecked, setRadioChecked] = useState('')

    const handleRadioChange = (event: any) => {
        setRadioChecked(event.target.value)
    }




    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ]

    const dayNames = [
        'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
    ]

    const currentTime = new Date()
    const currentDate = currentTime.getDate()
    const currentDay = dayNames[currentTime.getDay()]
    const currentMonth = monthNames[currentTime.getMonth()]
    const currentHours24 = currentTime.getHours()
    const currentHours12 = (currentHours24 % 12) || 12
    const currentMinutes = currentTime.getMinutes() < 10 ? `0${currentTime.getMinutes()}` : currentTime.getMinutes()
    const amOrPm = currentHours24 >= 12 ? 'PM' : 'Am'

    const add1Hour = new Date(currentTime)

    // const getTemplates = () => {
    //     let sendData: any = {};
    //     apiService.getTableData(sendData).then((response: any) => {

    //     });
    // }

    console.log('add1Hour', add1Hour.getHours())


    useEffect(() => {
        const getTemplates = async () => {
            try {
                let resp = await apiService.getTemplateList()
                console.log(resp, 'respresp')
                if (resp.data) {
                    setTemplateList(resp.data.List)
                    setNewTemplateList(resp.data.List)
                }

            }

            catch (e) {

            }
        }

        getTemplates()
    }, [])

    const handleTextChange = (e: any) => {
        setEmailObj({ ...emailObj, [e.target.name]: e.target.value })
        setSubjectError(false)
    }
    // const [isRefresh, setIsRefresh] = useState(false)
    useEffect(() => {
        if (subjectError || emailBodyError || fromEmailError) {
            setShowValidationErr(true)

        }
        else {
            setShowValidationErr(false)
        }
    }, [subjectError, emailBodyError, fromEmailError])

    const sendEmail = async () => {

        // setIsRefresh((prev: boolean) => !prev)
        // if (!templateValue) {
        //     setShowTemplateError(true)

        // }
        if (emailObj.subject === '') {
            setSubjectError(true)
        }

        if (emailObj.body === '') {
            setEmailBodyError(true)
        }

        if (emailObj.fromEmail === '') {
            setFromEmailError(true)
        }


        if (emailObj.subject && emailObj.body && emailObj.fromEmail) {
            try {

                let emailResp = await apiService.sendEmailTemplate(emailObj)
                handleTableMenuSendMaiClose(personObj.id)
                showEmailSuccess()
                // console.log(emailResp, 'email sent')

            }
            catch (e) {
                console.log(e, 'error')
                setmodalErrorMessage("Error in sending email")
                setShowError(true)
            }
        }

    }

    const handleTemplateType = (type: any) => {
        if (type === "allTemplates") {
            setTemplateList(newTemplateList)
            setTempPlaceHolder('Select All Templates')
        }
        else if (type === "emailBuilder") {
            let templList = newTemplateList.filter((temp: any) => temp.Type == "HTML")
            setTemplateList(templList)
            setTempPlaceHolder('Select EmailBuilder Template')
        }
        else {
            let templList = newTemplateList.filter((temp: any) => temp.Type == "Text")
            setTemplateList(templList)
            setTempPlaceHolder('Select Email Templates')
        }
    }


    const handleTemplateChange = (
        // event: any,
        newValue: any) => {
        let tempValue = `${newValue.templateName}/${newValue.templateId}/${newValue.subject}/${newValue.description}`;
        // setSelectedTemplated(tempValue);
        handleTemplateMenuClick(tempValue);
    };

    return (
        <Stack sx={{ height: '100%' }}>
            <Stack component='div'
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#ffffff',
                    position: 'sticky',
                    p: 3, height: '5%', borderTopRightRadius: '5px', borderTopLeftRadius: '5px'
                }}
            >
                <Typography
                    sx={{
                        color: '#1A1A1A',
                        fontSize: "14px",
                        fontWeight: "600",
                        fontFamily: "Segoe UI",
                    }}
                >
                    Drafted Email
                </Typography>

                <ClearOutlinedIcon
                    onClick={() => handleTableMenuSendMaiClose(PersonId)}
                    sx={{
                        height: "16px",
                        color: "#737373",
                        width: "16px",
                        fontSize: "16px",
                        cursor: "pointer",
                        "&:hover": {
                            backgroundColor: "#F0F0F0",
                        },
                        "&:hover ": {
                            color: "#146EF6",
                        },
                    }}
                />
            </Stack>

            <Stack sx={{ overflowY: 'scroll', height: '90%' }}>
                <Stack component='div' sx={{ p: '0px 24px 0px 24px' }}>

                    <Box component='div'
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            mt: 1,
                        }}
                    >

                        <Typography
                            sx={{
                                color: '#1A1A1A',
                                fontSize: "12px",
                                fontWeight: "600",
                                fontFamily: "Segoe UI",
                            }}
                        >
                            Template
                        </Typography>
                        {/* 
                        <Typography
                            sx={{
                                color: "#146EF6",
                                fontSize: "12px",
                                fontWeight: "600",
                                fontFamily: "Segoe UI",
                            }}
                        >
                            Save as new template
                        </Typography> */}

                    </Box>

                    {/* {templateError && <Box>
                        <Typography sx={{ fontSize: "12px", color: "red", pt: 1 }}>Template is required</Typography>
                    </Box>} */}

                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                    >
                        <Grid size={3}>
                            <TextField
                                size="small"
                                id={`template1`}
                                select
                                value={templateType}
                                onChange={e => {
                                    console.log(e, 'uuu')
                                    setTemplateType(e.target.value)
                                    handleTemplateType(e.target.value)
                                    // emailFormik.handleChange(e);
                                }}
                                sx={{
                                    '& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input.MuiSelect-select': {
                                        minHeight: '20px'
                                    },
                                    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#146EF6',
                                        color: '#146EF6',
                                    },

                                    '& .MuiOutlinedInput-root:hover ': {
                                        '& .MuiSvgIcon-root': {
                                            color: '#146EF6',
                                        },
                                        '& .MuiTypography-root': {
                                            color: '#146EF6',
                                        }
                                    },

                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#146EF6',
                                        borderWidth: '1px',
                                    },
                                    '& .MuiOutlinedInput-root.Mui-focused': {
                                        '& .MuiSvgIcon-root': {
                                            color: '#146EF6',
                                        },
                                        '& .MuiTypography-root': {
                                            color: '#146EF6',
                                        }
                                    }
                                }}
                                // name={`stages[${i}].template`}
                                fullWidth
                                className="mailInputs"
                                defaultValue="0"
                            // InputProps={{
                            //     startAdornment: (
                            //         <InputAdornment position="start">
                            //             Template
                            //         </InputAdornment>
                            //     ),
                            // }}
                            >
                                <MenuItem value="allTemplates" >
                                    <GridViewIcon
                                        fontSize="small"
                                        style={{ marginRight: 8, position: "relative", top: "3px", fontSize: "14px" }}
                                    />
                                    <Typography component="span"
                                        sx={{
                                            color: '#1A1A1A',
                                            fontSize: "12px",
                                            fontWeight: "400",
                                            fontFamily: "Segoe UI",
                                            width: '40%'

                                        }}
                                    >
                                        All Templates
                                    </Typography>

                                </MenuItem>
                                <MenuItem value="emailBuilder">
                                    <IntegrationInstructionsOutlinedIcon
                                        fontSize="small"
                                        style={{ marginRight: 8, position: "relative", top: "3px", fontSize: "14px" }}
                                    />

                                    <Typography component="span"
                                        sx={{
                                            color: '#1A1A1A',
                                            fontSize: "12px",
                                            fontWeight: "400",
                                            fontFamily: "Segoe UI",
                                            width: '40%'
                                        }}
                                    >
                                        Email Builder
                                    </Typography>

                                </MenuItem>
                                <MenuItem value="emailTemplates">
                                    <TextSnippetOutlinedIcon
                                        fontSize="small"
                                        style={{ marginRight: 8, position: "relative", top: "3px", fontSize: "14px" }}
                                    />
                                    <Typography component="span"
                                        sx={{
                                            color: '#1A1A1A',
                                            fontSize: "12px",
                                            fontWeight: "400",
                                            fontFamily: "Segoe UI",
                                            width: '40%'
                                        }}
                                    >
                                        Email Templates
                                    </Typography>

                                </MenuItem>
                            </TextField>
                        </Grid>
                        <Grid size={9} className="mui-textfield">

                            {/* <TextField
                                size="small"
                                id={`template`}
                                select
                                // label="Select All Templates"
                                // InputLabelProps={{ className: "test-label" }}
                                value={templateValue}
                                placeholder={tempPlaceHolder}
                                onChange={e => {
                                    let item = e.target.value
                                    console.log(item, 'itemitem')
                                    setTemplateValue(item)
                                    handleTemplateMenuClick(item)
                                    // setTemplateType(e.target.value)
                                    // emailFormik.handleChange(e);
                                }}

                                // name={`stages[${i}].template`}
                                fullWidth
                                className="mailInputs"
                                defaultValue="0"

                            // InputProps={{
                            //     startAdornment: (
                            //         <InputAdornment position="start">
                            //             Template
                            //         </InputAdornment>
                            //     ),
                            // }}

                            >
                                <MenuItem

                                    value="Select All Templates"

                                    sx={{
                                        display: 'none',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        // '&:hover': {
                                        //     backgroundColor: "#146ef6"
                                        // }
                                    }}>
                                    <Typography sx={{
                                        color: '#1A1A1A',
                                        fontSize: "12px",
                                        fontWeight: "400",
                                        fontFamily: "Segoe UI",
                                        // width: '40%'
                                    }}>
                                        {tempPlaceHolder}
                                    </Typography>
                                </MenuItem>
                                {templateList?.map((item: any, index: any) => (
                                    <MenuItem
                                        key={item.templateId}
                                        value={item.templateName + "/" + item.templateId + "/" + item.subject + "/" + item.description}
                                        // id={item.id}
                                        disableRipple
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            // '&:hover': {
                                            //     backgroundColor: "#146ef6"
                                            // }
                                        }}
                                    >


                                        <Typography
                                            sx={{
                                                color: '#1A1A1A',
                                                fontSize: "12px",
                                                fontWeight: "400",
                                                fontFamily: "Segoe UI",
                                                width: '40%'
                                            }}
                                        >
                                            {item.templateName}
                                        </Typography>



                                    </MenuItem>
                                ))}
                            </TextField> */}

                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                size="small"
                                options={templateList}
                                getOptionLabel={(option: any) => option.templateName}
                                fullWidth
                                onChange={handleTemplateChange}

                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        size="small"
                                        placeholder={tempPlaceHolder}
                                        fullWidth
                                        className="mailInputs"
                                        variant="outlined"
                                        sx={{
                                            '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#146EF6',
                                            },
                                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#146EF6',
                                                borderWidth: '1px',
                                            },
                                            '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                                color: '#1A1A1A',
                                                fontSize: '14px',
                                                fontWeight: 600,
                                                fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                            },
                                            '& .MuiInputBase-input::placeholder': {
                                                color: '#919191',
                                                fontSize: '14px',
                                                fontWeight: 600,
                                                fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                                opacity: 1,
                                            },
                                        }} />
                                )}
                                renderOption={(props, option: any) => (
                                    <MenuItem {...props} key={option.templateId}
                                        sx={{
                                            color: '#1A1A1A',
                                            fontSize: "12px",
                                            fontWeight: "400",
                                            fontFamily: "Segoe UI",
                                        }}
                                    >
                                        {option.templateName}

                                    </MenuItem>
                                )}
                            />

                        </Grid>
                    </Grid>



                    <Box component='div' sx={{ mt: 2.1 }}>
                        <Typography
                            sx={{
                                color: '#1A1A1A',
                                fontSize: "12px",
                                fontWeight: "600",
                                fontFamily: "Segoe UI",
                            }}
                        >
                            From
                        </Typography>
                    </Box>

                    <AutocompleteComponent getFromOption={getFromOption} />

                    {fromEmailError && <Box>
                        <Typography sx={{ fontSize: "12px", color: "red", pt: 1 }}>From Email is required</Typography>
                    </Box>}

                    {(checkedRowIds.length === 1) && (
                        <>
                            <Box component='div'
                                sx={{
                                    mt: 2.1,
                                }}
                            >

                                <Typography
                                    sx={{
                                        color: '#1A1A1A',
                                        fontSize: "12px",
                                        fontWeight: "600",
                                        fontFamily: "Segoe UI",
                                    }}
                                >
                                    To
                                </Typography>

                            </Box>

                            <Button variant="outlined"
                                disableRipple
                                // endIcon={<Box sx={{ backgroundColor: '#F7F7F7', display: PersonMail || PersonName ? 'block' : 'none', pl: '5px', pr: '5px', borderRadius: '3px' }}>Business email</Box>}
                                sx={{

                                    borderColor: "#CACACC",
                                    cursor: 'default',
                                    display: 'flex',
                                    height: "30px",
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    boxShadow: 0,
                                    '& .MuiButton-endIcon>*:nth-of-type(1)': {
                                        fontSize: '10px',
                                    },
                                    "&:hover": {
                                        borderColor: "#146EF6",
                                        backgroundColor: '#ffffff',
                                        boxShadow: 0,
                                    },
                                }}
                            >
                                <Typography sx={{
                                    color: '#1A1A1A',
                                    fontSize: "14px",
                                    cursor: 'default',
                                    fontWeight: "600",
                                    fontFamily: "Segoe UI",
                                    textTransform: 'capitalize',
                                }}>
                                    {PersonName ? PersonName : ''}  {PersonMail && (<span>  &lt;{PersonMail}&gt;</span>)}
                                </Typography>
                            </Button>
                        </>)
                    }

                    {/* <Stack
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            cursor: 'pointer',
                            '& .MuiButtonBase-root.MuiCheckbox-root': {
                                pl: 0
                            }
                        }}
                        onClick={handleCCChecked}
                    >

                        <BpCheckboxContainer>
                            <Checkbox
                                checked={ccChecked}
                                disableRipple
                                icon={<BpIcon className="bp-icon" />}
                                checkedIcon={<BpCheckedIcon
                                    className="bp-icon"
                                    style={{
                                        borderColor: "#146EF6",
                                    }}
                                />
                                }
                                className="bp-checkbox"
                            />
                        </BpCheckboxContainer>

                        <Box>
                            <Typography
                                sx={{
                                    color: '#1A1A1A',
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    fontFamily: "Segoe UI",
                                }}
                            >
                                CC & BCC
                            </Typography>
                        </Box>
                    </Stack> */}

                    <Stack sx={{ mb: 2, display: ccChecked ? 'display' : 'none' }} >
                        <Box >
                            <Typography
                                sx={{
                                    color: '#1A1A1A',
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    fontFamily: "Segoe UI",
                                }}
                            >
                                CC
                            </Typography>
                            <Autocomplete
                                noOptionsText={null}
                                className="auto-comp"
                                multiple
                                size="small"
                                id="tags-outlined"
                                options={ccOption}
                                getOptionLabel={(ccOption: any) => ccOption.label}

                                renderInput={(params) => (
                                    <TextField
                                        sx={{
                                            "& MuiAutocomplete-root.MuiOutlinedInput-root.MuiInputBase-sizeSmall.MuiAutocomplete-input":
                                            {
                                                padding: 0.5,
                                            },
                                            '& .auto-comp .MuiChip-label ': {
                                                fontSize: '10px'
                                            },
                                            "& .MuiInputBase-input.MuiOutlinedInput-input": {
                                                color: "#1A1A1A",
                                                fontSize: "14px",
                                                fontWeight: 600,
                                                fontFamily: "Segoe UI",
                                            },
                                            "& .MuiInputBase-input::placeholder": {
                                                color: "#919191",
                                                fontSize: "14px",
                                                fontWeight: 600,
                                                fontFamily: "Segoe UI",
                                                opacity: 1,
                                            },
                                            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                                            {
                                                borderColor: "#146EF6",
                                            },
                                            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                            {
                                                borderColor: "#146EF6",
                                                borderWidth: "1px",
                                            },
                                            '& .MuiAutocomplete-clearIndicator': {
                                                visibility: 'visible',
                                                '&:hover': {
                                                    backgroundColor: '#ffffff'
                                                },
                                            },
                                            '& .MuiAutocomplete-clearIndicator svg': {
                                                fontSize: '16px'
                                            }
                                        }}
                                        {...params}
                                    />
                                )}

                                renderOption={(
                                    props: object,
                                    option: any,
                                    // state: object
                                ) => (
                                    <Stack
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "flex-start",
                                            width: "100%",
                                        }}
                                        {...props}
                                    // onClick={() => setSelectTitle(option.name)}
                                    >
                                        <Typography
                                            sx={{
                                                color: '#1a1a1a',
                                                fontSize: "14px",
                                                fontWeight: "600",
                                                fontFamily: "Segoe UI",
                                                width: "100%",

                                                alignItems: "left",
                                            }}
                                        >
                                            {option.label}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                color: '#1a1a1a',
                                                fontSize: "12px",
                                                fontWeight: "400",
                                                fontFamily: "Segoe UI",
                                                alignItems: "left",
                                                width: "100%",
                                            }}
                                        >
                                            {option.year}
                                        </Typography>
                                    </Stack>
                                )}
                            />
                        </Box>

                        <Box>
                            <Typography
                                sx={{
                                    color: '#1A1A1A',
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    fontFamily: "Segoe UI",
                                }}
                            >
                                BC
                            </Typography>
                            <Autocomplete
                                noOptionsText={null}
                                className="auto-comp"
                                multiple
                                size="small"
                                id="tags-outlined"
                                options={ccOption}
                                getOptionLabel={(ccOption: any) => ccOption.label}

                                renderInput={(params) => (
                                    <TextField
                                        sx={{
                                            "& MuiAutocomplete-root.MuiOutlinedInput-root.MuiInputBase-sizeSmall.MuiAutocomplete-input":
                                            {
                                                padding: 0.5,
                                            },
                                            '& .auto-comp .MuiChip-label ': {
                                                fontSize: '10px'
                                            },
                                            "& .MuiInputBase-input.MuiOutlinedInput-input": {
                                                color: "#1A1A1A",
                                                fontSize: "14px",
                                                fontWeight: 600,
                                                fontFamily: "Segoe UI",
                                            },
                                            "& .MuiInputBase-input::placeholder": {
                                                color: "#919191",
                                                fontSize: "14px",
                                                fontWeight: 600,
                                                fontFamily: "Segoe UI",
                                                opacity: 1,
                                            },
                                            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                                            {
                                                borderColor: "#146EF6",
                                            },
                                            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                            {
                                                borderColor: "#146EF6",
                                                borderWidth: "1px",
                                            },
                                            '& .MuiAutocomplete-clearIndicator': {
                                                visibility: 'visible',
                                                '&:hover': {
                                                    backgroundColor: '#ffffff'
                                                },
                                            },
                                            '& .MuiAutocomplete-clearIndicator svg': {
                                                fontSize: '16px'
                                            }
                                        }}
                                        {...params}
                                    />
                                )}

                                renderOption={(
                                    props: object,
                                    option: any,
                                    // state: object
                                ) => (
                                    <Stack
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "flex-start",
                                            width: "100%",
                                        }}
                                        {...props}
                                    // onClick={() => setSelectTitle(option.name)}
                                    >
                                        <Typography
                                            sx={{
                                                color: '#1a1a1a',
                                                fontSize: "14px",
                                                fontWeight: "600",
                                                fontFamily: "Segoe UI",
                                                width: "100%",

                                                alignItems: "left",
                                            }}
                                        >
                                            {option.label}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                color: '#1a1a1a',
                                                fontSize: "12px",
                                                fontWeight: "400",
                                                fontFamily: "Segoe UI",
                                                alignItems: "left",
                                                width: "100%",
                                            }}
                                        >
                                            {option.year}
                                        </Typography>
                                    </Stack>
                                )}
                            />
                        </Box>
                    </Stack>


                </Stack>

                <Stack sx={{ p: 3 }}>

                    <Box component='div' sx={{ mb: 1 }}>
                        <Typography
                            sx={{
                                color: '#1A1A1A',
                                fontSize: "14px",
                                fontWeight: "600",
                                fontFamily: "Segoe UI",
                            }}
                        >
                            Subject
                        </Typography>
                        <TextField
                            spellCheck='false'
                            value={emailObj.subject}
                            name="subject"
                            onChange={handleTextChange}
                            sx={{
                                width: '100%',
                                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                    color: '#1A1A1A',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                    p: '5px 25px 5px 10px'
                                },
                                '& .MuiInputBase-input::placeholder': {
                                    color: '#919191',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                    opacity: 1,
                                },
                                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#146EF6',
                                },
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#146EF6',
                                    borderWidth: '1px',
                                },
                            }}
                            placeholder="Type a subject for your email"

                        />
                        {subjectError && <Box>
                            <Typography sx={{ fontSize: "12px", color: "red", pt: 1 }}>Subject is required</Typography>
                        </Box>}

                    </Box>

                    <Box component='div' sx={{ mt: 2.1 }}>
                        <Typography
                            sx={{
                                color: '#1A1A1A',
                                fontSize: "14px",
                                fontWeight: "600",
                                fontFamily: "Segoe UI",
                            }}
                        >
                            Body
                        </Typography>

                        {/* <ReactQuill
                            theme="snow"
                            modules={modules}
                            value={value}
                            onChange={(e: any) => {
                                console.log(e, 'ee')
                                if (e === "<p><br></p>") {
                                    e = ""
                                }
                                setValue(e)
                                setEmailObj((prevState: any) => ({
                                    ...prevState, body: e
                                }))

                                setEmailBodyError(false)
                            }}
                            style={{
                                height: '300px'
                            }}
                        /> */}


                        {/* <ReactQuill
                            ref={editorRef}
                            theme="snow"
                            value={state.value}
                            onChange={handleChange}
                            placeholder={"Email Body"}
                            modules={modules}
                            formats={formats}
                            style={{
                                height: '300px'
                            }}
                        />
                        <QuillToolbar handlePopoverOpen={handlePopoverOpen} handlePopoverClose={handlePopoverClose} open={open} anchorEl={anchorEl} placeholders={placeholders} editorHtml={editorRef} />
 */}


                    </Box>


                    <Stack component='div' direction='row' sx={{ position: "relative", top: "0px" }}>
                        {emailBodyError && <Box>
                            <Typography sx={{ fontSize: "12px", color: "red", pt: 1 }}>Email body is required</Typography>
                        </Box>}
                    </Stack>
                    <Stack component='div' direction='row' spacing={2} mt='25px'>
                        {/* <Button
                            variant="outlined"
                            onClick={handleOpenDelivery}
                            disableRipple
                            startIcon={<AccessTimeRoundedIcon />}
                            sx={{
                                borderColor: "#CACACC",
                                backgroundColor: "#ffffff",
                                color: '#1A1A1A',
                                fontSize: "14px",
                                fontWeight: "600",
                                fontFamily: "Segoe UI",
                                textTransform: 'capitalize',
                                height: "30px",
                                boxShadow: 0,
                                '&:hover': {
                                    borderColor: '#146EF6',
                                    color: '#146EF6',
                                    backgroundColor: "#ffffff",
                                    boxShadow: 0,
                                }
                            }}
                        >
                            Delivery Schedule
                        </Button> */}

                        <Modal
                            open={openDelivery}
                            onClose={handleCloseDelivery}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={{
                                position: 'absolute' as 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 600,
                                height: 500,
                                bgcolor: 'background.paper',
                                boxShadow: 24,
                                borderRadius: '5px',
                                pb: (radioChecked && radioHover) ? 5 : 2.5
                            }}>

                                <Stack component='div'
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        backgroundColor: '#ffffff',
                                        position: 'sticky',
                                        p: '12px 8px 8px 15px',
                                        height: '5%', borderTopRightRadius: '5px', borderTopLeftRadius: '5px'
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: '#1A1A1A',
                                            fontSize: "14px",
                                            fontWeight: "600",
                                            fontFamily: "Segoe UI",
                                        }}
                                    >
                                        Schedule Email
                                    </Typography>

                                    <ClearOutlinedIcon
                                        onClick={handleCloseDelivery}
                                        sx={{
                                            height: "16px",
                                            color: "#737373",
                                            width: "16px",
                                            fontSize: "16px",
                                            cursor: "pointer",
                                            "&:hover": {
                                                backgroundColor: "#F0F0F0",
                                            },
                                            "&:hover ": {
                                                color: "#146EF6",
                                            },
                                        }}
                                    />
                                </Stack>

                                <Stack component='div' sx={{ p: '10px 8px 10px 10px' }}>
                                    <Typography sx={{
                                        color: '#1A1A1A',
                                        fontSize: "12px",
                                        fontWeight: "400",
                                        fontFamily: "Segoe UI",
                                        p: '8px 8px 8px 8px'
                                    }}>
                                        When would you like this email to be delivered?
                                    </Typography>


                                    <Stack sx={{ borderBottom: '1px solid #F0F0F0', p: '0px 8px 8px 20px', cursor: 'pointer' }}
                                        onChange={handleRadioChange}
                                    >
                                        {radioOptions.map((item: any) => (
                                            <Stack
                                                onMouseEnter={() => handleRadioHoverEnter(item.label)}
                                                onMouseLeave={handleRadioHoverLeave}
                                                // onChange={handleRadioChange}
                                                key={item.label}
                                                sx={{
                                                    '&:hover': {
                                                        backgroundColor: '#F0F0F0', borderRadius: '3px'
                                                    }
                                                }}
                                            // sx={{ backgroundColor: 'red', height: '40px' }}
                                            >

                                                <Stack sx={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    '& .MuiButtonBase-root.MuiRadio-root': {
                                                        p: '9px 9px 3px 5px'
                                                    }

                                                }}

                                                >
                                                    <Radio
                                                        id={item.label}
                                                        checked={radioChecked === item.label}
                                                        value={item.label}
                                                        disableRipple
                                                        onChange={handleRadioChange}
                                                        color="default"
                                                        checkedIcon={<RadioBpCheckedIcon
                                                        />}
                                                        icon={<RadioBpIcon />}
                                                    />
                                                    <Stack component='label' htmlFor={item.label}>
                                                        <Typography
                                                            sx={{
                                                                fontSize: "14px",
                                                                fontFamily: "Segoe UI",
                                                                fontWeight: "600",
                                                                pt: '5px', cursor: 'pointer'
                                                            }}
                                                        >
                                                            {item.label}
                                                        </Typography>


                                                    </Stack>
                                                </Stack>

                                                {(radioHover === item.label || radioChecked === item.label) &&
                                                    <Typography
                                                        sx={{
                                                            fontSize: "12px",
                                                            fontFamily: "Segoe UI",
                                                            fontWeight: "400",
                                                            ml: '29px'
                                                        }}
                                                    >
                                                        {`${currentDay} ${currentMonth} ${currentDate} ${currentHours12}:${currentMinutes} ${amOrPm}`}
                                                    </Typography>
                                                }
                                            </Stack>
                                        ))}

                                    </Stack>

                                </Stack >

                                <Stack sx={{ p: '0px 8px 8px 16px' }}>

                                    <Typography
                                        sx={{
                                            color: '#1A1A1A',
                                            fontSize: "12px",
                                            fontWeight: "600",
                                            fontFamily: "Segoe UI",
                                        }}
                                    >
                                        Custom
                                    </Typography>

                                    <Stack
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            ml: 1,
                                            '& .MuiButtonBase-root.MuiRadio-root': {
                                                p: '9px 9px 3px 10px'
                                            }
                                        }}
                                    >
                                        <Radio
                                            id='custom'
                                            checked={radioChecked === 'custom'}
                                            value='custom'
                                            disableRipple
                                            onChange={handleRadioChange}
                                            color="default"
                                            checkedIcon={<RadioBpCheckedIcon
                                            />}
                                            icon={<RadioBpIcon />}
                                        />

                                        <Box component='label' htmlFor="custom">
                                            <Typography
                                                sx={{
                                                    color: '#1A1A1A',
                                                    fontSize: "14px",
                                                    fontWeight: "600",
                                                    fontFamily: "Segoe UI",
                                                }}
                                            >
                                                Set Date & time
                                            </Typography>
                                        </Box>

                                    </Stack>

                                    {/* {radioChecked === 'custom' && */}
                                    <Stack

                                        sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', p: '8px 20px 8px 20px' }}>
                                        <TextField
                                            disabled={radioChecked === 'custom' ? false : true}
                                            type="date"
                                            sx={{
                                                width: '45%',
                                                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                                    p: 0.7
                                                }
                                            }}
                                        />

                                        <Autocomplete
                                            disablePortal
                                            disabled={radioChecked === 'custom' ? false : true}
                                            disableClearable
                                            id="selecttaskdate"
                                            options={timeOptions}
                                            sx={{
                                                width: '50%',

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
                                                    pl: 0,
                                                    pb: 0,
                                                    pt: 0,
                                                    pr: 0
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
                                            getOptionLabel={(timeOptions) => timeOptions.time}

                                            renderOption={(props, timeOptions) => (
                                                <li {...props}
                                                    style={{
                                                        color: '#1A1A1A',
                                                        fontSize: '14px',
                                                        fontWeight: 600,
                                                        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                                    }}
                                                    onMouseEnter={(e: any) => {
                                                        e.target.style.backgroundColor = '#146EF6';
                                                        e.target.style.color = '#ffffff';
                                                    }}
                                                    onMouseLeave={(e: any) => {
                                                        e.target.style.backgroundColor = 'unset';
                                                        e.target.style.color = 'unset';
                                                    }}
                                                >{timeOptions.time}</li>
                                            )}
                                            renderInput={(params) => <TextField {...params}
                                                placeholder="Select Date"
                                                disabled={radioChecked === 'custom' ? false : true}
                                                sx={{
                                                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                                        color: '#1A1A1A',
                                                        fontSize: '14px',
                                                        fontWeight: 600,
                                                        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                                    },
                                                    '& .MuiInputBase-input::placeholder': {
                                                        color: '#737373',
                                                        fontSize: '14px',
                                                        fontWeight: 600,
                                                        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                                        opacity: 1,
                                                    },
                                                    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: radioChecked === 'custom' ? '#146EF6' : '',
                                                    },
                                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#146EF6',
                                                        borderWidth: '1px'
                                                    },
                                                }} />}
                                        />
                                    </Stack>
                                    {/* } */}
                                </Stack>

                                <Stack sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                    borderTop: '1px solid #F0F0F0',
                                    p: '20px 20px 0px 20px',

                                }}>
                                    <Button
                                        disableRipple
                                        variant="contained"
                                        sx={{
                                            backgroundColor: "#146EF6",
                                            color: '#ffffff',
                                            fontSize: "14px",
                                            fontWeight: "600",
                                            fontFamily: "Segoe UI",
                                            textTransform: 'capitalize',
                                            height: "30px",
                                            boxShadow: 0,
                                            '&:hover': {
                                                color: '#ffffff',
                                                backgroundColor: "#146EF6",
                                                boxShadow: 0,
                                            }
                                        }}
                                    >
                                        Schedule
                                    </Button>
                                </Stack>
                            </Box>
                        </Modal>

                    </Stack >

                </Stack>



            </Stack >

            <Stack component='div'
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    backgroundColor: '#ffffff',
                    position: 'sticky',
                    borderTop: '1px solid #F0F0F0',
                    p: 2.1, height: '5%', borderBottomRightRadius: '5px', borderBottomLeftRadius: '5px',
                }}
            >
                <Button
                    disableRipple
                    variant="contained"
                    type="button"
                    onClick={sendEmail}
                    sx={{
                        backgroundColor: "#146EF6",
                        color: '#ffffff',
                        fontSize: "14px",
                        fontWeight: "600",
                        fontFamily: "Segoe UI",
                        textTransform: 'capitalize',
                        height: "30px",

                        boxShadow: 0,
                        '&:hover': {
                            color: '#ffffff',
                            backgroundColor: "#146EF6",
                            boxShadow: 0,
                        }
                    }}
                >
                    Send Now
                </Button>
            </Stack>

            <Snackbar
                id="closeTableLayout"
                onClose={closeErrorLayout}
                open={showError}
                autoHideDuration={3000}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    icon={
                        <Dangerous
                            sx={{
                                color: "#ffffff",
                                fontSize: "20px",
                            }}
                        />
                    }
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#d32f2f",
                        width: "250px",
                        // '& .MuiButtonBase-root.MuiIconButton-root': {
                        //   '&:hover': {
                        //     backgroundColor: '#ffffff'
                        //   }
                        // },

                        "& .MuiAlert-message": {
                            fontSize: "14px",
                            fontFamily: "Segoe UI",
                            fontWeight: 600,
                            color: "#ffffff",
                        },
                    }}
                >
                    {modalErrorMessage}
                </MuiAlert>
            </Snackbar>

            <Snackbar
                id="closeErrorLayout"
                onClose={closeValidationErrorLayout}
                open={showValidationError}
                autoHideDuration={5000}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    icon={
                        <Dangerous
                            sx={{
                                color: "#ffffff",
                                fontSize: "20px",
                            }}
                        />
                    }
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#d32f2f",
                        width: "250px",
                        // '& .MuiButtonBase-root.MuiIconButton-root': {
                        //   '&:hover': {
                        //     backgroundColor: '#ffffff'
                        //   }
                        // },

                        "& .MuiAlert-message": {
                            fontSize: "14px",
                            fontFamily: "Segoe UI",
                            fontWeight: 600,
                            color: "#ffffff",
                        },
                    }}
                >
                    {"Please enter all mandatory Fields"}
                </MuiAlert>
            </Snackbar>
        </Stack>
    )
}

export default SendMailModal