import { Fragment, useState, useRef, useEffect } from "../../../../shared/modules/React";

import { Box } from "../../../../shared/modules/MaterialImports/Box";
import { Grid, Button, FormControl, IconButton, TextField } from "../../../../shared/modules/commonImports";
// import MenuItem from "@mui/material/MenuItem";
import { Typography } from "../../../../shared/modules/MaterialImports/Typography";
import { Dialog, DialogContent, DialogActions, DialogTitle } from "../../../../shared/modules/MaterialImports/Dialog";
import { Divider } from "../../../../shared/modules/MaterialImports/Divider";
import { Checkbox, Radio, RadioGroup } from "../../../../shared/modules/MaterialImports/FormElements";
import { FormControlLabel } from "../../../../shared/modules/MaterialImports/FormInputs";
// import TextareaAutosize from "@mui/material/TextareaAutosize";
import { Stack } from "../../../../shared/modules/MaterialImports/Stack";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
// import JsonData from "../SmsDialogBox/DummyData.json";
// import data from "../DummyList.json";
import { DateTime } from '../../../../shared/modules/Luxon';
import Message from '../SmsDialogBox/Message';

// import { Tooltip } from "../../../../shared/modules/MaterialImports/ToolTip";
// import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import { TimePicker, renderTimeViewClock } from '@mui/x-date-pickers';
import { DatePicker, LocalizationProvider, AdapterLuxon } from "../../../../shared/modules/MaterialImports/DatePicker";
//import DatePicker from "react-datepicker";
import { userLocalData } from "../../../../shared/services/userData";
// import ApiRequests from '../../../../shared/api/api'
import ApiService from '../../../../shared/api/api';
import { Loader } from '../../../shared/Loader/Loader';


//import "react-datepicker/dist/react-datepicker.css";

import './SubSms.scss';
import PlaceHolders from "../../Letters/Workflow/PopUps/PlaceHolders/PlaceHolders";
import { useFormik, Yup } from "../../../../shared/modules/Formik";
import { trackPromise } from "../../../../shared/modules/PromiseTrackter";
// import { Phone } from "@mui/icons-material";
import { showToaster } from "../../../shared/SnackBar/SnackBar";
// import api from "../../../../shared/api/api";
// import { InputMask } from 'primereact/inputmask';
import PhoneInput from "../../Candidate/ViewCandidate/PhoneInput";
import { ButtonGroup } from "../../../../shared/modules/MaterialImports/ButtonGroup";
import SmsTemplates from "../../Letters/Workflow/PopUps/SmsTemplates/SmsTemplates";
import { usePromiseTracker } from 'react-promise-tracker';
import SaveSMSTemplate from "../../../../shared/components/SaveSMSTemplate/SaveSMSTemplate";
import { MUIAutoComplete } from "../../../shared/MUIAutoComplete/MUIAutoComplete";




// export interface SmsData {
//     smsid: string;
//     type: 'IN' | 'OUT';
//     body: string;
//     candid: number;
//     isread: number;
//     savedt: string;
// }
export interface ListData {
    date: string;
    fname: string;
    lname: string;
    format_phone: string;
    phone: string;
    candid: string;
    body: string;
}
interface SmsData {
    isRead: boolean;
    date: string;
    fname: string;
    lname: string;
    format_phone: string;
    phone: string;
    recrName: string;
    body: string;
    userName: string;
    userId: string;
}

interface ApiResponse {
    total: number;
    data: SmsData[];
}
// Define the shape of a message
interface Message {
    smsid: string;
    type: 'IN' | 'OUT';
    body: string;
    savedt: string;
}

// Define the shape of grouped messages
type GroupedMessages = {
    [date: string]: Message[];
};

const SubSms = () => {
    const [checked, setChecked] = useState(false);
    const [open, setOpen] = useState(false);
    const [nestedOpen, setNestedOpen] = useState(false);
    const [numberOpen, setNumberOpen] = useState(false);
    const [filterPhoneNumber, setFilterPhoneNumber] = useState('');
    const [msgTemp, setMsgTemp] = useState('');
    const [sDate, setSDate] = useState<DateTime | null>(null);
    const [startTime, setStartTime] = useState<DateTime | null>(null);
    // const [userId, setUserId] = useState<string | null>(null);
    const [selectedCandidateId, setSelectedCandidateId] = useState<string>("");
    const [selectedCandidatePhoneNumber, setSelectedCandidatePhoneNumber] = useState<string>("");
    const [candidateSmsList, setCandidateSmsList] = useState<ApiResponse | null>(null);
    const [groupedMessagesByDate, setGroupedMessagesByDate] = useState<GroupedMessages>({});
    // function maskPhoneNumber(phoneNumber: any) {
    //     return `${phoneNumber.slice(0, 3)}*${phoneNumber.slice(3, 6)}*${phoneNumber.slice(6)}`;
    // }
    const { promiseInProgress } = usePromiseTracker();
    const [smsTemplateList, setSmsTemplateList] = useState({
        id: "",
        name: ""
    });
     const [smsBody, setSmsBody] = useState("");
    const sendCandNum = () => {
        if (activitiesFormik.values.numDesc) {

            const payLoad = {
                "clientId": userLocalData.getvalue("clientId"),
                // "userId": "8370",
                "userId": "",
                "recrId": userLocalData.getvalue("recrId"),
                "body": activitiesFormik.values.numDesc,
                // "phone": "6785516343",
                "phone": activitiesFormik.values.numValue
                // "phone": filterPhoneNumber

            }
            ApiService.postWithData("admin", "smsSent", payLoad).then((response: any) => {
                if (response.data.Message === "Success") {
                    // console.log(response.data.Message)
                    activitiesFormik.setFieldValue('numDesc', '');
                    // saveCandSms();
                    // setCandidateSmsList(response.data.Message);

                    closeCard();
                    showToaster('SMS has been sent successfully.', 'success');
                    // fetchData();
                } else {
                    showToaster(response.data.Message, 'error');
                }
            })
        } else {
            showToaster('Please enter SMS to sent', 'info');
        }
    }

    const clearCandSms = () => {
        activitiesFormik.setFieldValue('msgDesc', '');
    }

    const saveCandSms = () => {
        if (!checked) {
            if (smsBody) {

                const payLoad = {
                    "clientId": userLocalData.getvalue("clientId"),
                    // "userId": "8370",
                    "userId": selectedCandidateId,
                    "recrId": userLocalData.getvalue("recrId"),
                    "body": smsBody,
                    // "phone": "6785516343",
                    "phone": selectedCandidatePhoneNumber

                }
                ApiService.postWithData("admin", "smsSent", payLoad).then((response: any) => {
                    if (response.data.Message === "Success") {
                        // console.log(response.data.Message)
                        activitiesFormik.setFieldValue('msgDesc', '');
                        // saveCandSms();
                        // setCandidateSmsList(response.data);
                        handleDivClick(selectedCandidateId, selectedCandidatePhoneNumber);

                        showToaster('SMS has been sent successfully.', 'success');
                        activitiesFormik.resetForm();

                    } else {
                        showToaster(response.data.Message, 'error');
                    }
                })
            } else {
                showToaster('Please enter SMS to sent', 'info');
            }
        }
        else {
            // const senddt = checked && sDate && startTime ?
            //  sDate.set({hour :startTime.hour, minute: startTime.minute}): "";
            let senddt = '';
            if (sDate && startTime) {
                const dateTime = sDate.set({ hour: startTime.hour, minute: startTime.minute });
                senddt = dateTime.toFormat("MM/dd/yyyy HH:mm")
            };

            const payLoad = {
                "fromPhone": userLocalData.getvalue("phone"),
                // "toPhone": "6785516343",
                "toPhone": filterPhoneNumber,
                "body": smsBody,
                "recrId": userLocalData.getvalue("recrId"),
                // "userId": "8370",
                "userId": userLocalData.getvalue('recrId'),
                "clientId": userLocalData.getvalue("clientId"),
                "senddt": senddt,

            }
            ApiService.getByParams(193, "Curately/SMS/sms_schedule_save.jsp", payLoad).then((response: any) => {
                if (response.data.message === "Success") {
                    activitiesFormik.setFieldValue('msgDesc', '');
                    // saveCandSms();
                    if (selectedCandidateId) {
                        handleDivClick(selectedCandidateId, selectedCandidatePhoneNumber);
                        // setCandidateSmsList(response.data.message);
                    }
                    showToaster('Scheduled successfully.', 'success');
                } else {
                    showToaster(response.data.Message, 'error');
                }
            })
        }

    }
    const handleDivClick = (candid: string, phoneNumber: string) => {
        setSelectedCandidatePhoneNumber(phoneNumber ? phoneNumber.replace(/\D/g, '') : "");
        setSelectedCandidateId(candid);
        // const maskedPhone = maskPhoneNumber(userLocalData.getvalue('phone'));
        // const maskedPhone = maskPhoneNumber('7183447421');
        // const maskedPhone = phoneNumber;
        let tempCandidateSmsList = candidateSmsList;
        for (let pl = 0; pl < tempCandidateSmsList!.data.length; pl++) {
            if (phoneNumber === tempCandidateSmsList!.data[pl].phone) {
                tempCandidateSmsList!.data[pl].isRead = false;
            }
        }
        setCandidateSmsList(tempCandidateSmsList);
        const showData = async () => {
            trackPromise(
                ApiService.postWithData("admin", 'getSmsLogOpen', { clientId: userLocalData.getvalue('clientId'), phone: phoneNumber ? phoneNumber.replace(/\D/g, '') : "", recrId: userLocalData.getvalue('recrId') })
                    .then(
                        (response: any) => {
                            // console.log(response, 'response')
                            const data = response.data.smsLogDetails
                            const groupedMessagesByDate = data.reduce((acc: any, message: any) => {
                                const date = DateTime.fromSQL(message.sendDate).toFormat('EEEE MMMM d');
                                if (!acc[date]) {
                                    acc[date] = [];
                                }
                                acc[date].push(message);
                                console.log(message)
                                return acc;
                            }, {});
                            setGroupedMessagesByDate(groupedMessagesByDate);

                        }
                    ).catch(
                        (error) => {
                            console.error('Error fetching data:', error);
                        }

                    )
            )
        };

        showData();
    };




    const bottomRef = useRef<null | HTMLDivElement>(null);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);


    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        // bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    }, [groupedMessagesByDate]);


    const [startDate, setStartDate] = useState<DateTime>(DateTime.now().minus({ years: 1 }));
    const [endDate, setEndDate] = useState<DateTime>(DateTime.now());

    const closeCard = () => {
        setOpen(false);
        setNestedOpen(false);
        setNumberOpen(false);
    };

    // const [textArea1, setTextarea1] = useState("");
    // const [textArea2, setTextarea2] = useState("");


    const maxCharacterCount = 140; // Set your desired maximum character count

    const numHandleChange = (event: { target: { value: any; }; }) => {
        const inputText = event.target.value;
        if (event.target.value.length <= maxCharacterCount) {
            // setTextarea1(inputText);
            activitiesFormik.setFieldValue('numDesc', inputText);
        }
    };

    const msgHandleChange = (event: { target: { value: any; }; }) => {
        const inputText = event.target.value;
        if (event.target.value.length <= maxCharacterCount) {
            // setTextarea1(inputText);
            activitiesFormik.setFieldValue('msgDesc', inputText);
            setMsgTemp(inputText);
        }
    };
    const tempHandleChange = (event: { target: { value: any; }; }) => {
        const inputTextArea = event.target.value;
        if (event.target.value.length <= maxCharacterCount) {
            // setTextarea2(inputTextArea);
            activitiesFormik.setFieldValue('tempDesc', inputTextArea);
        }
    };

    const initialValues = {
        numDesc: "",
        msgDesc: "",
        tempDesc: "",
        numValue: ""
    }

    const validationSchema = Yup.object({

        numDesc: Yup.string().max(maxCharacterCount, `Cannot exceed ${maxCharacterCount} characters`),
        msgDesc: Yup.string().max(maxCharacterCount, `Cannot exceed ${maxCharacterCount} characters`),
        tempDesc: Yup.string().max(maxCharacterCount, `Cannot exceed ${maxCharacterCount} characters`),
        numValue: Yup.string()
    });
    const onSubmit = () => {
        // let tempActivityFormikValues: any = { ...activitiesFormik.values }


    }
    const activitiesFormik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
    });
    // type MessageGroup = {
    //     [date: string]: typeof JsonData;
    // };



    const smsBodyRefNum = useRef<any>();
    const insertSMSField1 = (field: string, ref: any) => {
        let cursorPosition = 0;
        let textBeforeCursorPosition = '';
        let textAfterCursorPosition = '';
        if (ref === 'smsBodyRefMsg') {
            cursorPosition = smsBodyRefMsg.current.selectionStart || 0;
            textBeforeCursorPosition = smsBodyRefMsg.current.value.substring(0, cursorPosition)
            textAfterCursorPosition = smsBodyRefMsg.current.value.substring(cursorPosition, smsBodyRefMsg.current.value.length)
        } else if (ref === 'smsBodyRefNum') {
            cursorPosition = smsBodyRefNum.current.selectionStart || 0;
            textBeforeCursorPosition = smsBodyRefNum.current.value.substring(0, cursorPosition)
            textAfterCursorPosition = smsBodyRefNum.current.value.substring(cursorPosition, smsBodyRefNum.current.value.length)
        }

        // activitiesFormik.setFieldValue('numDesc', textBeforeCursorPosition + ` {{${field}}} ` + textAfterCursorPosition);
        const newText = textBeforeCursorPosition + ` {{${field}}} ` + textAfterCursorPosition;

        if (newText.length > 140) {
            showToaster('SMS body cannot exceed 140 characters.', 'error');
        } else {
            if (ref === 'smsBodyRefMsg') {
                activitiesFormik.setFieldValue('msgDesc', newText);
            } else if (ref === 'smsBodyRefNum') {
                activitiesFormik.setFieldValue('numDesc', newText);
            }
        }

        if (ref === 'smsBodyRefMsg') {
            smsBodyRefMsg.current.focus();
        } else if (ref === 'smsBodyRefNum') {
            smsBodyRefNum.current.focus();
        }


    };
    const smsBodyRefMsg = useRef<any>();
    const insertSMSField2 = (field: string) => {

        // let cursorPosition = smsBodyRefMsg.current.selectionStart || 0;
        // let textBeforeCursorPosition = smsBodyRefMsg.current.value.substring(0, cursorPosition)
        // let textAfterCursorPosition = smsBodyRefMsg.current.value.substring(cursorPosition, smsBodyRefMsg.current.value.length)
        // activitiesFormik.setFieldValue('msgDesc', textBeforeCursorPosition + ` {{${field}}} ` + textAfterCursorPosition);
        const newText = `${field}`

        const textToCheckCount = newText.replace(/\n/g, " ");

        if (textToCheckCount.length > 140) {
            showToaster('SMS body cannot exceed 140 characters.', 'error');
        } else {
            activitiesFormik.setFieldValue('msgDesc', newText);
            setMsgTemp(newText);
        }
        smsBodyRefMsg.current.focus();

    };
    const smsBodyRefTemp = useRef<any>();
    const insertSMSField3 = (field: string) => {

        let cursorPosition = smsBodyRefTemp.current.selectionStart || 0;
        let textBeforeCursorPosition = smsBodyRefTemp.current.value.substring(0, cursorPosition)
        let textAfterCursorPosition = smsBodyRefTemp.current.value.substring(cursorPosition, smsBodyRefTemp.current.value.length)
        // activitiesFormik.setFieldValue('tempDesc', textBeforeCursorPosition + ` {{${field}}} ` + textAfterCursorPosition);
        const newText = textBeforeCursorPosition + ` {{${field}}} ` + textAfterCursorPosition;

        if (newText.length > 140) {
            showToaster('SMS body cannot exceed 140 characters.', 'error');
        } else {
            activitiesFormik.setFieldValue('tempDesc', newText);
        }
        smsBodyRefTemp.current.focus();

    };
    useEffect(() => {
        const fetchData = async () => {

            // ApiService.getByParams(193, 'Curately/SMS/getList_Open.jsp', {
            ApiService.postWithData("admin", 'getListOpen', {
                recrId: userLocalData.getvalue('recrId'),
                clientId: userLocalData.getvalue('clientId'),
                next: 0,
                fiter: "",
                fromDate: startDate.toFormat('M/d/yyyy'),
                toDate: endDate.toFormat('M/d/yyyy'),
                phone: filterPhoneNumber
            }).then((response: any) => {
                console.log(response);
                if (response.data) {
                    let phoneData = response.data.logDetails.data;
                    for (let pl = 0; pl < phoneData.length; pl++) {
                        phoneData[pl].phone = phoneData[pl].phone ? phoneData[pl].phone.replace(/\D/g, '') : "";
                        phoneData[pl].isRead = phoneData[pl].isRead === "1" ? false : true;

                    }
                    setCandidateSmsList({ data: phoneData, total: response.data.total });
                }
            })

            // try {
            //     const url = `https://app.curately.ai/Accuick_API/Curately/SMS/getList_Open.jsp?recrId=${userLocalData.getvalue('recrId')}&clientId=${userLocalData.getvalue('clientId')}&next=0&fiter=&fromDate=${startDate.toFormat('M/d/yyyy')}&toDate=${endDate.toFormat('M/d/yyyy')}${filterPhoneNumber ? `&phone=${filterPhoneNumber}` : ''
            //         }`;
            //     const response = await fetch(url);
            //     const data = await response.json();
            //     setCandidateSmsList(data);
            // } catch (error) {
            //     console.error('Error fetching data:', error);
            // }
        };

        fetchData();
    }, [filterPhoneNumber, startDate, endDate]);



    // useEffect(() => {        
    //     // const maskedPhone = maskPhoneNumber(userLocalData.getvalue('phone'));
    //     const maskedPhone = maskPhoneNumber('7183447421');
    //         const showData = async () => {
    //             trackPromise(
    //                 ApiService.getByParams(193, 'Curately/SMS/getMessage_Log_Open.jsp', { clientId: userLocalData.getvalue('clientId'), phone: maskedPhone, recrId: userLocalData.getvalue('recrId') })
    //                     .then(
    //                         (response: any) => {
    //                             console.log(response,'response')
    //                             // console.log(response.data[0].body)
    //                             // if(response.status === '200'){
    //                             //     console.log(response,'response')
    //                             //     // setSelectedCandidateId(candid);
    //                             // }

    //                         }
    //                     ).catch(
    //                         (error) => {
    //                             console.error('Error fetching data:', error);                           
    //                         }

    //                     )
    //             )
    //         };

    //         showData();
    // }, []);

    const [loadTemplates, setLoadTemplates] = useState(false);


    return (
        <div id="SubSms">
            <Grid container className="customCard p-0 " columns={12}>
                {/* <Grid className="item" size={2} >
                    <Box sx={{ padding: "20px" }}>
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() => setNumberOpen(true)}
                        >Add new Number</Button>
                    </Box>
                </Grid> */}
                <Grid className="item" size={5}>
                    <Box sx={{ padding: "10px" }}>
                        {/* <DatePicker
                            className="datepicker"
                            selected={startDate}
                            showIcon
                            onChange={(date: any) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                        /> */}
                        <div className="date_inputs">
                            <LocalizationProvider dateAdapter={AdapterLuxon} >
                                <DatePicker
                                    label="Start Date"
                                    slotProps={{ textField: { size: 'small' } }}
                                    sx={{ width: '150px', marginRight: "10px" }}
                                    onChange={(date: any) => setStartDate(date)}
                                    value={startDate}
                                />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterLuxon} >
                                <DatePicker
                                    label="End Date"
                                    slotProps={{ textField: { size: 'small' } }}
                                    sx={{ width: '150px' }}
                                    value={endDate}
                                    onChange={(date: any) => setEndDate(date)}
                                />
                            </LocalizationProvider>
                        </div>
                        {/* <DatePicker
                            className="datepicker"
                            selected={endDate}
                            showIcon
                            onChange={(date: any) => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                        /> */}
                        <TextField fullWidth className='mt-3'
                            id="lastName"
                            name="lastName"
                            variant="outlined"
                            type="text"
                            size="small"
                            label="Filter by Number"
                            value={filterPhoneNumber}
                            onChange={(e) => setFilterPhoneNumber(e.target.value)}
                        />
                        <Box sx={{ height: "70vh", overflow: "auto", marginTop: "20px" }}>
                            {candidateSmsList?.data
                                .filter((sms: any) =>
                                    filterPhoneNumber === '' || sms.formatPhone.includes(filterPhoneNumber)
                                )
                                .map((sms: any) => (
                                    <div
                                        className={`division1 ${sms.isRead ? 'yetToRead' : ''} ${selectedCandidatePhoneNumber === sms.phone ? 'active' : ''} `}
                                        key={sms.smsid}
                                        onClick={() => handleDivClick(sms.userId, sms.phone)}
                                    >
                                        <label className="hightLightTd">{sms.firstName}</label> - {sms.formatPhone}
                                        <br />
                                        <br />
                                        {/* Hi {sms.fname} {sms.lname},  */}
                                        {sms.body}
                                    </div>
                                ))}
                        </Box>
                    </Box>
                </Grid>
                <Grid className="item" size={7}>
                    <Grid container className="customCard p-0 ">
                        <Grid className="item2" >
                            <Typography className='p-3'>
                                Contact Number
                            </Typography>
                            <Divider />
                            <Box sx={{ height: "calc(100vh - 285px)", overflow: "auto" }} ref={messagesEndRef}>
                                {
                                    promiseInProgress ? <Loader /> :

                                        <><Typography p={4} ml={15}>
                                            <IconButton>
                                                <MessageRoundedIcon />
                                            </IconButton>
                                            This is the beginning of your conversation
                                        </Typography>
                                            <div>

                                                {Object.entries(groupedMessagesByDate).map(([sendDate, messages]) => (
                                                    <div key={sendDate}>
                                                        <div className="time">{sendDate}</div>
                                                        {messages.map((sms: any) => (
                                                            (sms.type === 'IN' || sms.type === 'OUT') &&
                                                            <Message key={sms.smsId} type={sms.type} body={sms.body} time={sms.sendDate} name={sms.userName ? sms.userName : ""} />
                                                        ))}
                                                        <div ref={bottomRef} />

                                                    </div>
                                                ))}
                                            </div></>
                                }
                            </Box>
                            <Box className="division p-5">
                                <MUIAutoComplete
                                    id='sms'
                                    handleChange={(id: any, name: string, Body: string) => {
                                        // setSmsTemplateList({ id, name });
                                        // setSmsBody(Body);
                                        if (id && name) {
                                            setSmsTemplateList({ id, name });
                                            setSmsBody(Body || "");
                                        } else {
                                            setSmsTemplateList({ id: "", name: "" });
                                            setSmsBody("");
                                        }
                                    }}
                                    valuePassed={
                                        (smsTemplateList.id) ? { label: smsTemplateList.name, id: smsTemplateList.id } :
                                            {}
                                    }
                                    isMultiple={false}
                                    placeholder={"Select SMS Template"}
                                    width="100%"
                                    type='sms'
                                />
                                <TextField
                                    color="error"
                                    className="typeCall mt-2"
                                    multiline
                                    rows={3}
                                    inputRef={smsBodyRefMsg}
                                    placeholder="Type SMS"
                                    value={smsBody}
                                    onChange={msgHandleChange}
                                    // onChange={activitiesFormik.handleChange}
                                    name="desc"
                                    // value={textArea1}
                                    margin="dense"
                                    id="desc"
                                    type="text"
                                    size="small"
                                    fullWidth
                                // disabled={selectedCandidateId ? false : true}
                                />
                                <Box className="sms-footer">
                                    <Box className='leftIcons' >
                                        {/* <Tooltip title="Templates">
                                            <IconButton onClick={() => setOpen(true)}>
                                                <TurnedInNotIcon />
                                            </IconButton>
                                        </Tooltip> */}
                                        <span className={`leftIcons ${selectedCandidatePhoneNumber ? '' : 'd-none'}`} >
                                            {/* <SmsTemplates insertSMSTemp={insertSMSField2} loadTemplates={loadTemplates} /> */}
                                            <PlaceHolders onInsertField={(field) => insertSMSField1(field, "smsBodyRefMsg")} />
                                            <SaveSMSTemplate message={activitiesFormik.values.msgDesc} templateAdded={() => setLoadTemplates((prev) => !prev)} />
                                        </span>
                                    </Box>


                                    <Box className="charcount">
                                        {smsBody.length} of {maxCharacterCount} characters
                                        <Button className="ml-2" color="primary" variant='contained' onClick={saveCandSms} disabled={selectedCandidatePhoneNumber ? false : true}>Send</Button>
                                        <Button className="ml-2" color="secondary" variant='outlined' onClick={clearCandSms} disabled={selectedCandidatePhoneNumber ? false : true}>Clear</Button>
                                    </Box>
                                </Box>
                                {/* <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        spacing={2}
                                    >
                                        
                                        <div className="float-right mr-6" style={{ marginLeft: "260px" }}>
                                            {/*<span id="count">0</span>
                                <span> of 420 characters</span>*/}
                                {/* {0 + textArea1.length} of
                                        {maxCharacterCount} characters */}
                                {/* </div>
                                    </Stack> */}
                            </Box>
                            <Stack direction="row" spacing={2} className="mt-1 mb-2 d-none">
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Delay sending message"
                                    labelPlacement="end"
                                    id="DelaySendingMessage"
                                    name="DelaySendingMessage"
                                    className="mt-2 ml-2"
                                    onChange={() => setChecked(!checked)} checked={checked}

                                />
                                {
                                    checked ? (
                                        <div>
                                            <Stack direction="row" spacing={2} mt={2}>

                                                {/* <LocalizationProvider dateAdapter={AdapterLuxon}>
                                                    <DatePicker
                                                        label={
                                                            <Fragment>
                                                                Date
                                                                <span style={{ color: 'red' }}>*</span>
                                                            </Fragment>
                                                        }
                                                        slotProps={{ textField: { size: 'small' } }}
                                                        onChange={(date: any) => console.log(date)}
                                                    />
                                                </LocalizationProvider> */}
                                                {/* <DatePicker
                                                    showIcon
                                                    placeholderText="Date"
                                                    selected={startDate}
                                                   
                                                /> */}
                                                <LocalizationProvider dateAdapter={AdapterLuxon} >
                                                    <DatePicker
                                                        label="Start Date"
                                                        slotProps={{ textField: { size: 'small' } }}
                                                        sx={{ width: '150px' }}
                                                        onChange={(date: any) => setSDate(date)}
                                                    />
                                                </LocalizationProvider>
                                                <LocalizationProvider dateAdapter={AdapterLuxon}>
                                                    <TimePicker
                                                        label={
                                                            <Fragment>
                                                                Time
                                                                <span style={{ color: 'red' }}>*</span>
                                                            </Fragment>
                                                        }
                                                        slotProps={{ textField: { size: 'small' } }}
                                                        viewRenderers={{
                                                            hours: renderTimeViewClock,
                                                            minutes: renderTimeViewClock,
                                                            seconds: renderTimeViewClock,
                                                        }}
                                                        onChange={(time: any) => setStartTime(time)}
                                                        sx={{ width: '120px' }}
                                                    />
                                                </LocalizationProvider>
                                            </Stack>
                                        </div>
                                    ) : (<div></div>)
                                }
                            </Stack>
                        </Grid>
                        {/* <Grid className="division item2">
                            <Box id="mockChat" className="mockchat">
                                <div className="device">
                                    <div className="screen">
                                        <div id='numberInScreen'>
                                        </div>
                                        <div className="app">
                                            <div className="reply" style={{ display: "none" }}></div>
                                        </div>
                                    </div>
                                </div>
                            </Box>
                        </Grid> */}
                    </Grid>

                    <div>
                        <Dialog open={open} sx={{ width: "520px", height: "500px", overflow: "auto" }}>
                            <DialogTitle className="header">
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <span className='addHeader'>
                                        Templates
                                    </span>
                                    <ButtonGroup>
                                        <Button variant='text'>
                                            <EditIcon aria-label="close"
                                                className="closeBtn"
                                                onClick={() => setNestedOpen(true)} />
                                        </Button>
                                        <Button variant='text'>
                                            <CloseIcon aria-label="close"
                                                onClick={closeCard}
                                                className="closeBtn" />
                                        </Button>
                                    </ButtonGroup>
                                </Grid>
                            </DialogTitle>
                            <Divider />
                            <DialogContent>
                                <Grid container spacing={2}>
                                    <Grid size={6}>
                                        <TextField
                                            id="title"
                                            name="title"
                                            type="text"
                                            size="small"
                                            placeholder='Search'
                                        />
                                    </Grid>
                                    <Grid size="grow">
                                        <Button variant='outlined'>Mine</Button>
                                    </Grid>
                                    <Grid size="grow">
                                        <Button variant='outlined'>All</Button>
                                    </Grid>
                                </Grid>
                                <Box sx={{ height: "40vh" }}>

                                </Box>
                            </DialogContent >
                        </Dialog>
                    </div>
                    <div>
                        <Dialog open={nestedOpen} sx={{ width: "520px", height: "500px", overflow: "auto" }}>
                            <DialogTitle className="header">
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <span className='addHeader'>
                                        Add SMS Template
                                    </span>
                                    <IconButton
                                        aria-label="close"
                                        onClick={closeCard}
                                        className="closeBtn"
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </Grid>
                            </DialogTitle>
                            <Divider />
                            <DialogContent>
                                {/* <Stack
                                    direction="row"
                                    justifyContent="flex-end"
                                    alignItems="center"
                                    spacing={2}
                                >
                                    <TextField className='inputLabel mt-1'
                                        id="merge"
                                        name="merge"
                                        size="small"
                                        select
                                        defaultValue={0}

                                    >
                                        <MenuItem value="0">Merge Fileds</MenuItem>
                                        <MenuItem value="First name">First name</MenuItem>
                                        <MenuItem value="Last name">Last name</MenuItem>
                                        <MenuItem value="First name and Last name">First name and Last name</MenuItem>
                                        <MenuItem value="Email">Email</MenuItem>
                                    </TextField>
                                </Stack> */}
                                <TextField fullWidth className='mt-1'
                                    id="Name"
                                    name="Name"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    label="Name"
                                />
                                {/* <TextareaAutosize
                                    value={textArea2}
                                    onChange={ta2HandleChange}
                                    placeholder='Type your Template here!'
                                    aria-label="minimum height"
                                    minRows={5}
                                    // placeholder="Minimum 3 rows"
                                    // maxlength="420"
                                    style={{ width: '100%', marginTop: "15px" }}
                                /> */}
                                <TextField
                                    color="error"
                                    className="typeCall mt-2"
                                    multiline
                                    rows={3}
                                    inputRef={smsBodyRefTemp}
                                    placeholder="Type SMS"
                                    value={activitiesFormik.values.tempDesc}
                                    onChange={tempHandleChange}
                                    // onChange={activitiesFormik.handleChange}
                                    name="desc1"
                                    // value={textArea1}
                                    margin="dense"
                                    id="desc1"
                                    type="text"
                                    size="small"
                                    fullWidth
                                />
                                <Box className="sms-footer">
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        spacing={2}
                                    >
                                        <PlaceHolders onInsertField={insertSMSField3} />
                                        {activitiesFormik.values.tempDesc.length} of {maxCharacterCount} characters
                                    </Stack>
                                </Box>
                                {/* <div className="float-right" style={{ marginRight: "5px" }}>
                                    {/*<span id="count">0</span>
                                <span> of 420 characters</span>*/}
                                {/* {0 + textArea2.length} of {maxCharacterCount} characters
                                </div> */}
                                <FormControl sx={{ marginTop: "15px" }}>
                                    <RadioGroup
                                        row
                                        name="ISassignedTo"
                                    >
                                        <FormControlLabel value="Mine" control={<Radio />} label="Mine" />
                                        <FormControlLabel value="Sharetoall" control={<Radio />} label="Share To All" />
                                    </RadioGroup>
                                </FormControl>
                            </DialogContent>
                            <Divider />
                            <DialogActions>
                                <Button variant='outlined'>Add</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                    <div>
                        <Dialog open={numberOpen} >
                            <DialogTitle className="header">
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <span className='addHeader'>
                                        Send Message
                                    </span>
                                    <IconButton
                                        aria-label="close"
                                        onClick={closeCard}
                                        className="closeBtn"
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </Grid>
                            </DialogTitle>
                            <Divider />
                            <DialogContent>
                                {/* <TextField fullWidth className='mt-1'
                                    id="lastName"
                                    name="lastName"
                                    variant="outlined"
                                    type="number"
                                    size="small"
                                    label="Number"
                                /> */}
                                <PhoneInput
                                    id="numValue"
                                    name="numValue"
                                    placeholder="(999) 999-9999"
                                    value={activitiesFormik.values.numValue}
                                    onChange={activitiesFormik.handleChange}
                                    className=' mt-1 w-100 fs-13'
                                />
                                {/* <InputMask
                                    id="numValue"
                                    name="numValue"
                                    mask="(999) 999-9999"
                                    placeholder="(999) 999-9999"
                                    // /^((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}$/
                                    value={activitiesFormik.values.numValue}
                                    onChange={activitiesFormik.handleChange}
                                    className='p-3 mt-1 w-100 fs-13'
                                /> */}
                                {/* <TextareaAutosize
                                    value={textArea2}
                                    onChange={ta2HandleChange}
                                    placeholder='Type your Template here!'
                                    aria-label="minimum height"
                                    minRows={3}
                                    // placeholder="Minimum 3 rows"
                                    // maxlength="420"
                                    style={{ width: '100%', marginTop: "15px" }}
                                /> */}
                                <TextField
                                    color="error"
                                    className="typeCall mt-2"
                                    multiline
                                    rows={3}
                                    inputRef={smsBodyRefNum}
                                    placeholder="Type SMS"
                                    value={activitiesFormik.values.numDesc}
                                    onChange={numHandleChange}
                                    // onChange={activitiesFormik.handleChange}
                                    name="numDesc"
                                    // value={textArea1}
                                    margin="dense"
                                    id="numDesc"
                                    type="text"
                                    size="small"
                                    fullWidth
                                />
                                {/* <div className="float-right" style={{ marginRight: "5px" }}>
                                    {/*<span id="count">0</span>
                                <span> of 420 characters</span>*/}
                                {/* {activitiesFormik.values.numDesc.length} of {maxCharacterCount} characters
                                </div> */}
                                <Box className="sms-footer">
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        spacing={2}
                                    >
                                        <PlaceHolders onInsertField={(field) => insertSMSField1(field, 'smsBodyRefNum')} />
                                        {activitiesFormik.values.numDesc.length} of {maxCharacterCount} characters
                                    </Stack>
                                </Box>
                            </DialogContent>
                            <Divider />
                            <DialogActions>
                                <Button variant='contained'
                                    onClick={sendCandNum}>Send</Button>
                            </DialogActions>
                        </Dialog>
                    </div>

                </Grid>
            </Grid>
        </div >
    )
}

export default SubSms;