import './PhoneDialog.scss';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '../../../shared/modules/MaterialImports/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import { Grid, Button, FormControl, IconButton, TextField } from "../../../shared/modules/commonImports";
import { useRef, useState } from '../../../shared/modules/React';
import { userLocalData } from '../../../shared/services/userData';
import { Box } from '../../../shared/modules/MaterialImports/Box';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Stack } from '../../../shared/modules/MaterialImports/Stack';
import { FormControlLabel } from '../../../shared/modules/MaterialImports/FormInputs';
//import Checkbox from '@mui/material/Checkbox';
import { Divider } from '../../../shared/modules/MaterialImports/Divider';
import { MenuItem } from '../../../shared/modules/MaterialImports/Menu';
import { Radio, RadioGroup } from '../../../shared/modules/MaterialImports/FormElements';
import EditIcon from '@mui/icons-material/Edit';
import ApiService from "../../../shared/api/api";
import { showToaster } from '../SnackBar/SnackBar';
import { useFormik, Yup } from '../../../shared/modules/Formik';
import PlaceHolders from '../../Dashboard/Letters/Workflow/PopUps/PlaceHolders/PlaceHolders';
import { useParams } from 'react-router-dom';
import SmsTemplates from '../../Dashboard/Letters/Workflow/PopUps/SmsTemplates/SmsTemplates';
import SaveSMSTemplate from '../../../shared/components/SaveSMSTemplate/SaveSMSTemplate';
import { MUIAutoComplete } from '../MUIAutoComplete/MUIAutoComplete';







export interface DialogProps {
    dialogOpen: boolean;
    onClose: () => void;
    name: string;
    toPhone: string;
    contactId?: string;
    candidateId: string;
    jobId?: string;
    paramJobId?: string;
    workflowJobCandidateId?: string;
    contactName?: string;
    call?: boolean;
    isBulkSMS?: boolean

}





const PhoneDialog = ({ dialogOpen, onClose, name, toPhone, candidateId = "", contactId = "", workflowJobCandidateId = "", contactName, call, isBulkSMS, jobId }: DialogProps) => {

    // const [src, setSrc] = useState('https://search.accuick.com/Twilio/chat_number.jsp?userid=' + userLocalData.getvalue('recrId') + '&phone=' + userLocalData.getvalue('phone') + '&toNumber=' + toPhone + '&candid=' + candidateId);


    // const [textArea1, setTextarea1] = useState("");
    const [textArea2, setTextarea2] = useState("");
    // const [checked, setChecked] = useState(false);
    const [open, setOpen] = useState(false);
    const [nestedOpen, setNestedOpen] = useState(false);

    const { jobId: paramJobId } = useParams<{ jobId: string }>();
    const effectiveJobId = jobId || paramJobId;

    const closeCard = () => {
        setOpen(false);
        setNestedOpen(false);
    };


const [smsTemplateList, setSmsTemplateList] = useState({
        id: "",
        name: ""
    });
    const maxCharacterCount = 140; // Set your desired maximum character count
 const [smsBody, setSmsBody] = useState("");
    const ta1HandleChange = (event: { target: { value: any; }; }) => {
        const inputText = event.target.value;
        if (event.target.value.length <= maxCharacterCount) {
            setSmsBody(inputText);
            // activitiesFormik.setFieldValue('desc', inputText);
        }

    };
    const ta2HandleChange = (event: { target: { value: any; }; }) => {
        const inputTextArea = event.target.value;
        if (inputTextArea.length <= maxCharacterCount) {
            setTextarea2(inputTextArea);
        }
    };
    // const [candidateSmsData, setCandidateSmsData] = useState<any>([]);

    // const loadCandidateSms = () => {
    //     // http://35.155.202.216:8080/Curately/getUserNotesList\
    //     // Accuick_API\Curately\Candidate\notes.jsp
    //     ApiService.getByParams(193, 'Curately/SMS/sms_log.jsp', {
    //         recrId: userLocalData.getvalue('recrId'),
    //         userId: candidateId,
    //     }).then(
    //         (response: any) => {
    //             if ((response.data.Message === "Success") && response.data.smsLog && response.data.smsLog.length) {
    //                 setCandidateSmsData(response.data.smsLog);
    //             } else {
    //                 setCandidateSmsData([]);
    //             }
    //         }
    //     )
    // }


    const initialValues = {
        // activityType: "",
        // contId: "",
        // contName: contactName,
        // outcome: "",
        // date: DateTime.now(),
        // time: "",
        desc: "",
        // emails: "",
        // hiringManager: "",
        // callType: "",
        // associatedJob: "",
        // logAMeet: false,
        // emailBody: "",
        // subject: "",
        // fromEmail: "",
        // fromName: "",
        // toEmail: ""
    };


    const validationSchema = Yup.object({
        // activityType: Yup.string(),
        // contId: Yup.string(),
        // contName: Yup.string(),
        // outcome: Yup.string(),
        // date: Yup.string(),
        // time: Yup.string(),
        desc: Yup.string().max(maxCharacterCount, `Cannot exceed ${maxCharacterCount} characters`),
        // emails: Yup.string(),
        // hiringManager: Yup.string(),
        // callType: Yup.string(),
        // associatedJob: Yup.string(),
        // logAMeet: Yup.boolean(),
        // emailBody: Yup.string(),
        // subject: Yup.string(),
        // fromEmail: Yup.string(),
        // fromName: Yup.string(),
        // toEmail: Yup.string(),
    });

    const onSubmit = () => {
        // let tempActivityFormikValues: any = { ...activitiesFormik.values }


    }
    const activitiesFormik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
    });
    const saveCandidateSms = () => {
        if (smsBody) {
            const payLoad = {
                "clientId": userLocalData.getvalue("clientId"),
                "userIds": candidateId,
                "recrId": userLocalData.getvalue("recrId"),
                "jobId": effectiveJobId,
                "contId": contactId,
                "workflowJobCandId": workflowJobCandidateId,
                "body": smsBody
            }
            ApiService.postWithData("admin", "smsSent", payLoad).then((response: any) => {
                if (response.data.Message === "Success") {
                    activitiesFormik.setFieldValue('desc', '');
                    // console.log(activitiesFormik.values.desc, "mess..")
                    //  loadCandidateSms();
                    showToaster('SMS has been sent successfully.', 'success');
                    saveAuditLog(4141);
                    onClose();
                } else {
                    showToaster(response.data.Message, 'error');
                }
            })
        } else {
            showToaster('Please enter SMS to sent', 'warning');
        }
    }
    const smsBodyRef = useRef<any>();
    const insertSMSField = (field: string) => {

        let cursorPosition = smsBodyRef.current.selectionStart || 0;
        let textBeforeCursorPosition = smsBodyRef.current.value.substring(0, cursorPosition)
        let textAfterCursorPosition = smsBodyRef.current.value.substring(cursorPosition, smsBodyRef.current.value.length)
        // activitiesFormik.setFieldValue('desc', textBeforeCursorPosition + ` {{${field}}} ` + textAfterCursorPosition);
        const newText = textBeforeCursorPosition + ` {{${field}}} ` + textAfterCursorPosition;

        if (newText.length > 140) {
            showToaster('SMS body cannot exceed 140 characters.', 'error');
        } else {
            setSmsBody(newText);
        }
        smsBodyRef.current.focus();

    };
    const insertSMSField2 = (field: string) => {

        const textToCheckCount = field.replace(/\n/g, " ");

        if (textToCheckCount.length > 140) {
            showToaster('SMS body cannot exceed 140 characters.', 'error');
        } else {
            activitiesFormik.setFieldValue('desc', field);
        }
        smsBodyRef.current.focus();
    };

    const [loadTemplates, setLoadTemplates] = useState(false);

    const saveAuditLog = (id: number) => {
        ApiService.saveAuditLog(id);
    }

    return (
        <Dialog
            maxWidth={'sm'}
            // sx={{ width: 900, maxWidth: 900, minWidth: 900 }}
            fullWidth={true} open={dialogOpen} className='AddJobModal'
            id='PhoneDialog'
        >
            <DialogTitle className="header">
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <span className='addHeader'>
                        {isBulkSMS ? 'Bulk SMS' : 'SMS'}
                    </span>

                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        className="closeBtn"
                    >
                        <CloseIcon />
                    </IconButton>
                </Grid>
            </DialogTitle>
            <DialogContent sx={{ px: 0 }}>
                {/* <iframe src={src} title='Workflow' className='iframeInApp'></iframe> */}

                <Box className="p-5 ">
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
                        rows={4}
                        inputRef={smsBodyRef}
                        placeholder="Type SMS"
                        value={smsBody}
                        onChange={ta1HandleChange}
                        // onChange={activitiesFormik.handleChange}
                        name="desc"
                        // value={textArea1}
                        margin="dense"
                        id="desc"
                        type="text"
                        size="small"
                        fullWidth
                    />


                    <Stack
                        direction="row"
                        justifyContent="space-around"
                        alignItems="flex-end"
                        spacing={1}
                    >
                        {/* <Tooltip title="Templates">

                            <IconButton onClick={() => setOpen(true)}>

                                <TurnedInNotIcon />

                            </IconButton>

                        </Tooltip> */}
                        <div style={{ marginLeft: "428px" }}>
                            {/*<span id="count">0</span>
                                <span> of 420 characters</span>*/}
                            {smsBody.length} of {maxCharacterCount} characters
                        </div>
                    </Stack>
                </Box>

            </DialogContent>

            <Divider />
            <DialogActions>
                {/* <SmsTemplates insertSMSTemp={insertSMSField2} loadTemplates={loadTemplates} /> */}
                <PlaceHolders onInsertField={insertSMSField} />
                <SaveSMSTemplate message={activitiesFormik.values.desc} templateAdded={() => setLoadTemplates((prev) => !prev)} />

                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        saveCandidateSms();
                        //  onClose();
                    }}

                >
                    Send SMS
                </Button>
            </DialogActions>
        </Dialog >
    )
}

export default PhoneDialog;