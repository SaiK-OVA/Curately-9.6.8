import { useState } from "../../../shared/modules/React";
import './EmailDialogBox.scss';
// import { styled } from '@mui/material/styles';

import { Dialog, DialogTitle, DialogContent, DialogActions, CloseIcon } from '../../../shared/modules/MaterialImports/Dialog';
import { Divider } from '../../../shared/modules/MaterialImports/Divider';
import { Button, IconButton } from '../../../shared/modules/MaterialImports/Button';


// import { SelectChangeEvent } from '@mui/material/Select';

import FormControlLabel from '@mui/material/FormControlLabel';
import Editor from "./EmailBody";
import ApiService from "../../../shared/api/api";
import ErrorMessage from '../../shared/Error/ErrorMessage';
import Checkbox from '@mui/material/Checkbox';

import { useFormik, Yup } from '../../../shared/modules/Formik';

import { showToaster } from "../SnackBar/SnackBar";
import { MUIAutoComplete } from "../MUIAutoComplete/MUIAutoComplete";
import { userLocalData } from "../../../shared/services/userData";


import { trackPromise } from '../../../shared/modules/PromiseTrackter';
import { FormHelperText, TextField, FormControl } from '../../../shared/modules/commonImports';
import GridViewIcon from "@mui/icons-material/GridView";
//import IntegrationInstructionsOutlinedIcon from "@mui/icons-material/IntegrationInstructionsOutlined";
//import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import { Loader } from "../../shared/Loader/Loader";
// import { Dialog as ReactDialog } from 'primereact/dialog';

// import { Tabs, Tab, CircularProgress, Box } from '@mui/material';
// import SettingsIcon from '@mui/icons-material/Settings';
// import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

import CodeIcon from '@mui/icons-material/Code';
import NotesIcon from '@mui/icons-material/Notes';

// import { v4 as uuidv4 } from 'uuid';
// import { Select } from '../../../shared/modules/MaterialImports/FormElements';
import { Grid } from '../../../shared/modules/MaterialImports/Grid';
// import { FormControlLabel } from '../../../shared/modules/MaterialImports/FormInputs';
// import { Typography } from '../../../shared/modules/MaterialImports/Typography';
import { Box } from '../../../shared/modules/MaterialImports/Box';
import { MenuItem } from '../../../shared/modules/MaterialImports/Menu';
//import { Accordion, AccordionSummary, AccordionDetails, ExpandMoreIcon } from '../../../shared/modules/MaterialImports/Accordion';
// import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// import ThumbDownIcon from '@mui/icons-material/ThumbDown';
// import WarningIcon from '@mui/icons-material/Warning';
// import CancelIcon from '@mui/icons-material/Cancel';
// import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
// import {
//     DialogContentText,
// } from '@mui/material';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';


// import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
// import { confirmDialog } from "../ConfirmDialog/ConfirmDialog";
// import { Chip } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import InfoIcon from '@mui/icons-material/Info';
import AIDialog from './AIDialogue';
import { Stack } from "../../../shared/modules/MaterialImports/Stack";

import apiService from "../../Dashboard/Resume/People/shared/api/apiService"
//import { useParams } from 'react-router-dom';



export interface DialogProps {
    dialogOpen: boolean;
    onClose: () => void;
    name: string;
    emailId: string;
    contactId?: string;
    candidateId?: any;
    jobId?: string;
    isBulkEmail?: boolean;
    fromEmail?: string;
    fromName?: string;
    emailAccountId?: string;
    isFromPeople?: boolean
}
// interface Stage {
//     template: string;
// }

const EmailDialogBox = ({ dialogOpen, onClose, name, emailId, candidateId, contactId,
    jobId, isBulkEmail, fromEmail = "", fromName = "",
    // workflowJobCandidateId = "",     curatelyMail = false, 
    emailAccountId = "", isFromPeople = false }: DialogProps) => {
    const [isMobileChecked, setMobileChecked] = useState<any>(false)
    const onMobileCheckBoxChange = (e: any) => {
        setMobileChecked(e.target.checked)
    }
    const isContact = () => window.location.hash.includes('/contact/people');
    console.log(candidateId, 'candidateIdcandidateId')
    // console.log(" --- " + candidateId + " --- " + emailId + " --- " + jobId + "=== " + name)
    const initialValues = {
        fromEmail: fromEmail ? fromEmail : userLocalData.getvalue('email'),
        templateName: '',
        fromName: fromName ? fromName : userLocalData.getvalue('recrFullName'),
        toEmail: emailId,
        templateType: '',
        subject: "",
        emailBody: "",
        templateId: "",
        stages: [
            {
                template: !userLocalData.isChromeExtensionEnabled() ? "emailBuilder" : "emailTemplates",
                templateType: "all",
            }
        ]
    };
    // const [template, setTemplate] = useState('');
    // const [fEmail, setFEmail] = useState('');
    const [showAiDialog, setShowAiDialog] = useState(false);
    // const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    // const [templateName, setTemplateName] = useState("");
    // const [emailTempList, setEmailTempList] = useState<any>([]);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    // const [selectedTab, setSelectedTab] = useState(0);
    // const [recommendedSelected, setRecommendedSelected] = useState(false);
    // const [isGenerated, setIsGenerated] = useState(false);
    // const [personalizedEmail, setPersonalizedEmail] = useState(false);
    // const [showReplaceEmailDialog, setShowReplaceEmailDialog] = useState(false);
    // const [showFullDescription, setShowFullDescription] = useState<boolean[]>([]);
    // const [selectedValue, setSelectedValue] = useState('');
    // const [selectedBody, setSelectedBody] = useState('');
    // const [expanded, setExpanded] = useState(true);
    const [emailTemplateType, setEmailTemplateType] = useState<string>("");
    // const [checkedIndex, setCheckedIndex] = useState(null);
    // // const [expandedd, setExpandedd] = useState(false);
    // const [expandedd, setExpandedd] = useState({});
    // const [optionalCheckboxes, setOptionalCheckboxes] = useState({
    //     jobId: false,
    //     jobName: false,
    //     accordions: Array(6).fill(false)
    // });
    // const formattedText2 = `
    //          <p>Hi {{Candidate Name}},</p>
    //         <br/>
    //          <p>My name is {{Recruiter Name}}, and I am a {{Recruiter Title}} at {{Recruiter Company Name}}. I am reaching out because {{Client Name}} is looking to fill a {{Job Title}} position, and I believe your background and skills would be a great fit for this opportunity.</p>

    //         <br/>`;
    // const [bodyContent, setBodyContent] = useState<string>(formattedText2);



    // const handleTabChange = (event, newValue) => {
    //     setSelectedTab(newValue);
    // };

    const isSendEmailSettingEnabled = userLocalData.checkIntegration(40005) && userLocalData.checkIntegration(400022);

    //  const { candidateId, contactId, jobId } = useParams();

    // const handlePopoverClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     setAnchorEl(event.currentTarget);
    // };

    // const handlePopoverClose = () => {
    //     setAnchorEl(null);
    // };

    // const openPopover = Boolean(anchorEl);

    // const getTemplate = (i: number, templateId: string, type: 'emailBuilder' | 'emailTemplates') => {

    //     // let ed = quillRefs?.current[i]?.getEditor();
    //     // ed?.insertText(ed?.getSelection()?.index || 0, " <<" + text + ">> ");

    //     // https://codepen.io/alexkrolick/pen/gmroPj?editors=0010
    //     // insert star
    //     // http://52.40.49.193/Accuick/Email/getTemplateById.jsp?tmplid=148
    //     let tempUrl = (type === "emailTemplates") ? `getEmailTemplatesListById/${templateId}/${userLocalData.getvalue('clientId')}` : `getEmailBuilderTemplatesListById/${templateId}/${userLocalData.getvalue('clientId')}`;
    //     trackPromise(
    //         ApiService.getCall(214, tempUrl).then((response: any) => {
    //             if (response.data.Success && response.data.list.length > 0) {
    //                 const template = response.data.list[0];
    //                 // setTeamLeads(response.data);
    //                 // console.log(response);
    //                 setFormFieldValue(i, template.description || '', template.subject || '', "");
    //                 setTimeout(() => {
    //                     setFormFieldValue(i, '', template.subject || '', "");
    //                 }, 300);
    //             }
    //             // let newStage = [
    //             //     ...sequenceFormik.values.stages
    //             // ];
    //             // newStage[i].mailBody = response.data.body;
    //             // newStage[i].subject = response.data.subject;
    //             // // if (i === 0) {
    //             // // loadSubject(response.data.subject);
    //             // // setSubject(response.data.subject);
    //             // // for (let ss = 1; ss < newStage.length; ss++) {
    //             // //     newStage[ss].subject = response.body.subject;
    //             // // }
    //             // // }
    //             // sequenceFormik.setFieldValue("stages", newStage);
    //         })
    //     );

    // }
    const getTemplate = (templateId: string, type: 'emailBuilder' | 'emailTemplates') => {
        let tempUrl = (type === "emailTemplates")
            ? `getEmailTemplatesListById/${templateId}/${userLocalData.getvalue('clientId')}`
            : `getEmailBuilderTemplatesListById/${templateId}/${userLocalData.getvalue('clientId')}`;

        trackPromise(
            ApiService.getCall('admin', tempUrl).then((response: any) => {
                if (response.data.Success && response.data.list.length > 0) {
                    const template = response.data.list[0];
                    setEmailTemplateType(type);
                    setFormFieldValue((type === "emailTemplates") ? template.description || '' : template.htmlFile || "", template.subject || '');
                } else {
                    showToaster("Failed to load template", 'error');
                }
            }).catch(error => {
                showToaster(error.message, 'error');
            })
        );
    };




    // const handleTemplateChange = (event: SelectChangeEvent) => {
    //     setTemplate(event.target.value as string);
    //     getEmailTemplate(event.target.value);
    // };
    // const handleTemplateChange = (event: SelectChangeEvent) => {
    //     const selectedTemplateId = event.target.value as string;
    //     setTemplate(selectedTemplateId);
    //     getEmailTemplate(selectedTemplateId);
    // }
    // const handleTemplateChange = (event: SelectChangeEvent) => {
    //     const selectedTemplateId = event.target.value as string;
    //     const selectedTemplateType = template;
    //     setTemplate(selectedTemplateId);
    //     emailFormik.setFieldValue('templateId', selectedTemplateId);
    //     emailFormik.setFieldValue('templateType', selectedTemplateType);
    //     getEmailTemplate(selectedTemplateId);
    // };

    // const handlefEmailChange = (id: any, email: any) => {
    //     // setFEmail(event.target.value as string);
    //     // emailFormik.values.fromEmail = event.target.value;
    // };

    // const handletEmailChange = (event: SelectChangeEvent) => {
    //     setTEmail(event.target.value as string);
    //     emailFormik.values.toEmail = event.target.value;
    // };

    const validationSchema = Yup.object().shape({
        fromEmail: Yup.string().required('From Email is required'),
        fromName: Yup.string().required('From Email is required'),
        toEmail: Yup.string(),
        subject: Yup.string(),
        emailBody: Yup.string().required('Email body is required'),
        // templateId: Yup.string(),
        template: Yup.string(),
        stages: Yup.array().of(
            Yup.object().shape({

                template: Yup.string()
            })
        )
    });
    const emailFormik = useFormik({
        initialValues,
        onSubmit: () => {
            handleSendEmail();
        },
        validationSchema,
        validateOnMount: true
    });

    // const handleSendEmail = () => {
    //     setIsFormSubmitted(true);
    //     if (emailFormik.dirty && emailFormik.isValid && emailFormik.values.subject) {
    //         const data = {
    //             // subject: emailFormik.values.subject,
    //             // body: emailFormik.values.emailBody,
    //             // fromName: emailFormik.values.fromName,
    //             // fromEmail: emailFormik.values.fromEmail,
    //             // toEmail: emailFormik.values.toEmail,
    //             // candId: candidateId,
    //             // contId: contactId,
    //             // jobId: jobId,
    //             // workflow_job_cand_id: workflowJobCandidateId,
    //             // "templateId": 0, 

    //             // "templateName": "Santorio", 

    //             // "description": "QWERTY", 

    //             // "subject": "MailCheck", 

    //             //  "type": 2, 

    //             // "createdBy": 65, 

    //             // "clientId": 2 
    //             templateId: 0,
    //             templateName: emailFormik.values.templateName,
    //             clientId: userLocalData.getvalue('clientId'),
    //             // userIds: candidateId ? 39 : "", // candidateId
    //             // contId: contactId ? 3 : "", // contactId
    //             type:2,
    //             subject: emailFormik.values.subject,
    //             description: emailFormik.values.emailBody,
    //             createdBy: userLocalData.getvalue('recrId'),
    //             // senderName: emailFormik.values.fromName,
    //             // senderEmail: emailFormik.values.fromEmail,
    //             // sendFrom: "browser",
    //         }
    //         // https://www4.accuick.com/Accuick_API/Curately/Email/email_sent.jsp?clientId=2&userIds=39&subject=test&body=test&recrId=61&senderName=Mastanvali&senderEmail=mvali@askconsulting.com&sendFrom=browser
    //         //http://35.155.202.216:8080/QADemoCurately/saveEmailTemplates 
    //         trackPromise(
    //             ApiService.postWithData(216, 'QADemoCurately/saveEmailTemplates', data).then(
    //                 (result) => {
    //                     // console.log(result);
    //                     if (result.data.Success === true) {
    //                         showToaster("Email sent Successfully", 'success');
    //                         onClose();
    //                     } else {
    //                         showToaster(result.data.Message ? result.data.Message : "Email not sent", 'error');
    //                     }
    //                 },
    //             ))
    //     } else {
    //         showToaster('Please enter all mandatory Fields', 'error');
    //     }
    // }
    const handleSendEmail = async () => {
        setIsFormSubmitted(true);
        saveAuditLog(4140);
        //  console.log(emailFormik.values);
        //&& emailFormik.isValid 
        let emailBodyForCheck = emailFormik.values.emailBody ? emailFormik.values.emailBody.replace(/<p><br><\/p>/g, '').replace(/ /g, '').replace(/<p><\/p>/g, '') : "";
        if ((emailBodyForCheck.replace(/ /g, '').trim() === "") || (emailBodyForCheck.replace(/ /g, '').trim() === "<p></p>") || (emailBodyForCheck.replace(/ /g, '').trim() === "<p><br></p>")) {
            showToaster("Please enter Email Body", "error");
        } else if (emailFormik.dirty && emailFormik.isValid && emailFormik.values.subject) {

            // const params = new URLSearchParams();
            // params.append("clientId", userLocalData.getvalue('clientId'));
            // params.append("subject", emailFormik.values.subject);
            // params.append("recrId", userLocalData.getvalue('recrId'));
            // params.append("jobId", jobId ? jobId : "");
            // params.append("userIds", candidateId ? candidateId : "");
            // params.append("contId", contactId ? contactId : "");
            // params.append("body", emailFormik.values.emailBody);
            // params.append("accountId", emailAccountId ? emailAccountId : `${userLocalData.getvalue('clientId')}_${userLocalData.getvalue('recrId')}`);
            // params.append("senderName", emailFormik.values.fromName);
            // params.append("senderEmail", emailFormik.values.fromEmail);
            // params.append("sendFrom", "Email Engine");
            // if (emailId) {
            //     params.append('toEmail', emailId);
            // }

            const sendEmailData = {
                clientId: userLocalData.getvalue('clientId'),
                userIds: candidateId ? candidateId : "",
                contIds: contactId ? contactId : "",
                subject: emailFormik.values.subject,
                body: emailFormik.values.emailBody,
                recrId: userLocalData.getvalue('recrId'),
                accountId: emailAccountId ? emailAccountId : `${userLocalData.getvalue('clientId')}_${userLocalData.getvalue('recrId')}`,
                senderName: emailFormik.values.fromName,
                senderEmail: emailFormik.values.fromEmail,
                sendFrom: "Email Engine",
                jobId: jobId ? jobId : 0,
                toEmail: emailId ? emailId : "",
                isSaveWithPhoneNumber: isMobileChecked,
            };
            // const data = {
            //     "clientId": userLocalData.getvalue('clientId'),
            //     "subject": emailFormik.values.subject,
            //     "recrId": userLocalData.getvalue('recrId'),
            //     "jobId": jobId ? jobId : "",
            //     "userIds": candidateId ? candidateId : "",
            //     "contId": contactId ? contactId : "",
            //     "body": emailFormik.values.emailBody,
            //     "accountId": emailAccountId
            // };

            // curatelyMail
            // https://app.curately.ai/Accuick_API/Curately/EmailEngine/sendEmail.jsp

            const templateData = {
                clientId: userLocalData.getvalue('clientId'),
                subject: emailFormik.values.subject,
                recrId: userLocalData.getvalue('recrId'),
                jobId: jobId ? jobId : "",
                userIds: candidateId ? candidateId : "",
                contId: contactId ? contactId : "",
                body: emailFormik.values.emailBody,

                accountId: emailAccountId ? emailAccountId : `${userLocalData.getvalue('clientId')}_${userLocalData.getvalue('recrId')}`,
                senderName: userLocalData.getvalue('recrFullName'),
                senderEmail: userLocalData.getvalue('email'),
                sendFrom: "Email Engine",
                toEmail: emailId ? emailId : "",
                isSaveWithPhoneNumber: isMobileChecked,
            }
            //   {
            //     clientId: 
            //     subject: 
            //     recrId: 
            //     jobId: 
            //     userIds: 
            //     contId: 
            //     body: 
            //     accountId: 
            //     toEmail: emailId ? emailId : ""
            // };


            // if ((Number(candidateId) == 41507) || (userLocalData.getvalue('email') === 'mvali@curately.ai') || (userLocalData.getvalue('email') === 'maheshhruser@gmail.com') || (userLocalData.getvalue('clientId') === 5)) {
            if (!isFromPeople) {
                // if (userLocalData.isChromeExtensionEnabled() || (!userLocalData.isChromeExtensionEnabled() && Boolean(Number(localStorage.getItem('emailEngineAccountActive'))))) {
                //     if (Boolean(Number(localStorage.getItem('emailEngineAccountActive')))) {
                trackPromise(
                    ApiService.postWithData("admin", "sendEmail", sendEmailData).then(
                        //  ApiService.postWithData(216, "curatelyAdmin/sendEmailWithTemplate", data).then(
                        (result) => {
                            if (result.data.Success === true) {
                                showToaster("Email sent Successfully", 'success');
                                onClose();
                            } else {
                                showToaster(result.data.Message ? result.data.Message : "Email not sent", 'error');
                            }
                        }
                    ).catch(error => {
                        showToaster(error.message, 'error');
                    })
                );
                //     } else {
                //         showToaster('Please Connect your Email to send.', 'error');
                //     }
                // } else {
                //     trackPromise(
                //         //https://adminapi.curately.ai/curatelyAdmin/sendEmailWithTemplate

                //         ApiService.postWithData("admin", "sendEmailWithTemplate", templateData).then(
                //             //  ApiService.postWithData(216, "curatelyAdmin/sendEmailWithTemplate", data).then(
                //             (result) => {
                //                 if (result.data.Success === true) {
                //                     showToaster("Email sent Successfully", 'success');
                //                     onClose();
                //                 } else {
                //                     showToaster(result.data.Message ? result.data.Message : "Email not sent", 'error');
                //                 }
                //             }
                //         ).catch(error => {
                //             showToaster(error.message, 'error');
                //         })
                //     );
                // }
            }
            else {

                onClose();
                showToaster("Candidates are being saved in the queue", 'warning');
                if (!isContact()) {
                    let postData = {
                        "requestInfo": [
                            {
                                "personIds": isBulkEmail ? candidateId?.personIds.join() : "",
                                "userIds": isBulkEmail ? candidateId?.userIdsData?.join() : candidateId,
                                "isSaveWithEmail": true,
                                "isSaveWithPhoneNumber": isMobileChecked

                            }
                        ],
                        "clientId": userLocalData.getvalue('clientId'),
                        "recrId": userLocalData.getvalue('recrId'),
                        "fromName": emailFormik.values.fromName,
                        "fromEmailId": emailFormik.values.fromEmail,
                        "body": emailFormik.values.emailBody,
                        "subject": emailFormik.values.subject,
                    }
                    try {
                        const response: any = await apiService.SendEmail(postData)
                        console.log(response.data, 'responseresponse')
                        if (response.data.Success) {
                            showToaster("Email sent Successfully", 'success');

                        } else {
                            showToaster(response.data.Message ? response.data.Message : "Email not sent", 'error');
                        }
                    }
                    catch (error: any) {
                        showToaster(error.message, 'error');
                    }
                }
                else {
                    let postData = {
                        "requestInfo": [
                            {
                                "personIds": isBulkEmail ? candidateId?.personIds.join() : "",
                                "contIds": isBulkEmail ? candidateId?.userIdsData?.join() : candidateId,
                                "isSaveWithEmail": true,
                                "isSaveWithPhoneNumber": isMobileChecked

                            }
                        ],
                        "clientId": userLocalData.getvalue('clientId'),
                        "recrId": userLocalData.getvalue('recrId'),
                        "fromName": emailFormik.values.fromName,
                        "fromEmailId": emailFormik.values.fromEmail,
                        "body": emailFormik.values.emailBody,
                        "subject": emailFormik.values.subject,
                    }
                    try {
                        const response: any = await apiService.SendEmailContact(postData)
                        console.log(response.data, 'responseresponse')
                        if (response.data.Success) {
                            showToaster("Email sent Successfully", 'success');
                            onClose();
                        } else {
                            showToaster(response.data.Message ? response.data.Message : "Email not sent", 'error');
                        }
                    }
                    catch (error: any) {
                        showToaster(error.message, 'error');
                    }
                }

            }

        } else {
            showToaster('Please enter all mandatory Fields', 'error');
        }
    };


    const setFormFieldValue = (emailBody: string, subject: string) => {
        if (emailFormik.values.emailBody !== emailBody || emailFormik.values.subject !== subject) {
            if (subject) {
                emailFormik.setFieldTouched('subject');
                emailFormik.setFieldValue('subject', subject);
            }
            if (emailBody) {
                emailFormik.setFieldTouched('emailBody');
                emailFormik.setFieldValue('emailBody', emailBody);
            }
        }
    }

    // const handleGenerateClick = (checkedIndex: number) => {
    //     if (checkedIndex === 0) {
    //         const formattedText1 = `
    //         <p>Dear {{Candidate Name}},</p>
    //         <br/>
    //         <p>My name is {{Recruiter Name}}, and I am a {{Recruiter Title}} at {{Recruiter Company Name}}. I am reaching out to share an exciting opportunity for a {{Job Title}} position with our esteemed client, {{Client Name}}.</p>
    //         <br/>`;
    //         emailFormik.setFieldValue('emailBody', formattedText1);
    //     } else if (checkedIndex === 1) {
    //         setIsGenerated(true);
    //         setPersonalizedEmail(true);
    //     }
    // };

    // const handleReplaceEmailCancel = () => {
    //     setShowReplaceEmailDialog(false);
    // };

    // const handlePersonalizedSettingsClick = () => {
    //     setIsGenerated(false);
    //     setPersonalizedEmail(false);
    // };
    // const formatBody = `Hi {{First Name}}  {{Last Name}}, <br/><br/>My name is {{Recruiter Full Name}} , and I am a  {{Job Title}} at  {{Client Name}}. I am reaching out because {{Client Name}} is looking to fill a  {{Job Titile}} position, and I believe your background and skills would be a great fit for this opportunity.`
    const formatBody = '';
    const openAiDialog = () => {
        //  emailFormik.setFieldValue('emailBody', formatBody);
        setShowAiDialog(true);
    };

    // const closeAiDialog = () => {
    //     setShowAiDialog(false);
    // };

    const handleReplaceEmailContinue = (bodyContent: any, rndSubject: any) => {
        //   setShowReplaceEmailDialog(false);
        let bodyTest = formatBody + "" + bodyContent;
        emailFormik.setFieldValue('emailBody', bodyTest);
        emailFormik.setFieldValue('subject', rndSubject);
        // setPersonalizedEmail(false)

    };


    // const applyEmailBody = (bodyValue: string) => {
    //     if (bodyValue === sampleText1) {
    //         const formattedText1 = `
    //         <p>Hi Tarun,</p>
    //         <br/>
    //         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam varius pretium lectus, vitae placerat nunc malesuada vel. Morbi et ultricies velit.</p>
    //         <p>Sed fringilla, libero at vehicula fermentum, odio lacus pharetra velit, et volutpat elit est eget enim. Donec sollicitudin nibh et massa dapibus, at congue lorem vehicula. Duis aliquet vestibulum fermentum.</p>
    //         <br/>
    //         <p>Thanks & Regards</p>`;
    //         emailFormik.setFieldValue('emailBody', formattedText1);
    //     } else if (bodyValue === sampleText2) {
    //         const formattedText2 = `
    //         <p>Hello Tarun,</p>
    //         <br/>
    //         <p>Phasellus vestibulum lorem sed risus ultricies tristique. Maecenas auctor sit amet justo sed tincidunt. Proin a nunc vel lorem sodales varius.</p>
    //         <p>Curabitur vitae lorem at enim faucibus tristique. Fusce gravida quam id ex commodo, ac hendrerit elit venenatis. Cras ut lectus eget ipsum fermentum dictum.</p>
    //         <br/>
    //         <p>Sincerely,</p>`;
    //         emailFormik.setFieldValue('emailBody', formattedText2);
    //     }
    // };

    // const countChecked = (sectionIndex: any) => {
    //     return checkboxStates[sectionIndex].filter(checked => checked).length;
    // };

    // const getAppliedFilters = () => {
    //     return accordionData.map((section, sectionIndex) => ({
    //         title: section.title,
    //         appliedFilters: section.options.filter((option, optionIndex) => checkboxStates[sectionIndex][optionIndex]),
    //         remainingFilters: section.options.filter((option, optionIndex) => !checkboxStates[sectionIndex][optionIndex]),
    //     }));
    // };

    // const getAppliedFilters = () => {
    //     return accordionData.map((section, sectionIndex) => ({
    //         title: section.title,
    //         appliedFilters: section.options
    //             .map((option, optionIndex) => ({ ...option, optionIndex }))
    //             .filter(option => checkboxStates[sectionIndex][option.optionIndex]),
    //         remainingFilters: section.options
    //             .map((option, optionIndex) => ({ ...option, optionIndex }))
    //             .filter(option => !checkboxStates[sectionIndex][option.optionIndex]),
    //     }));
    // };


    // const [appliedFiltersData, setAppliedFiltersData] = useState(() => getAppliedFilters());

    // useEffect(() => {
    //     setAppliedFiltersData(getAppliedFilters());
    // }, [checkboxStates]);


    // const applyDraft =() =>{
    //     setIsGenerated(true);
    //     setPersonalizedEmail(true)
    // }

    const saveAuditLog = (id: number) => {
        ApiService.saveAuditLog(id);
    }

    return (
        <Dialog
            maxWidth={showAiDialog ? "lg" : 'md'}
            fullWidth={true}
            open={dialogOpen}
            className='AddJobModal'
            id='EmailDialogBox'
        >
            {!showAiDialog && <DialogTitle className="header">
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <span className='addHeader'>
                        {isBulkEmail ? 'Bulk Email' : 'Drafted Email'}
                    </span>
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        className="closeBtn"
                    >
                        <CloseIcon />
                    </IconButton>
                    {
                        isFromPeople ?
                            <>
                                <Box sx={{ fontWeight: "400", fontSize: "13px" }}>
                                    Take note: Adding new contacts to a list requires <span style={{ fontWeight: 600 }}>1 email credit</span> per verified email. However, re-adding previously saved contacts won’t consume any credits.
                                </Box>
                                <Box sx={{ mt: 1, mb: 2, fontWeight: "400" }}>
                                    <FormControlLabel sx={{ width: "20px", height: "20px" }} control={<Checkbox value={isMobileChecked} onChange={onMobileCheckBoxChange} />} label="" />
                                    <span style={{ fontSize: "13px" }}>Each mobile number that is successfully enriched, you'll be <span style={{ fontWeight: "600" }}>charged 1 credit</span>, while saved contacts don't use any.</span>
                                </Box>
                            </>
                            :
                            null
                    }
                </Grid>
            </DialogTitle>}
            <DialogContent sx={{ px: showAiDialog ? 2 : 0 }}>
                <Loader />

                <Grid container size={12} columnSpacing={1}>
                    {showAiDialog ? <Grid size={4}>
                        <Box width={"100%"} border={"1px solid #cccccc"} borderRadius={"4px"}>
                            <AIDialog
                                showAiDialog={showAiDialog}
                                setShowAiDialog={setShowAiDialog}
                                jobId={jobId}
                                candidateId={candidateId}
                                contactId={contactId}
                                handleReplaceEmailContinue={handleReplaceEmailContinue}
                            />
                        </Box>
                    </Grid> : null}

                    <Grid size={showAiDialog ? 8 : 12}>
                        <Box className={`${showAiDialog ? "ai-dialog-container" : ""}`} position={"relative"}>
                            {showAiDialog &&
                                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} py={0.75} px={1} borderBottom={"1px solid #ccc"}>
                                    <span className='addHeader'>
                                        {isBulkEmail ? 'Bulk Email' : 'Drafted Email'}
                                    </span>
                                    <IconButton
                                        aria-label="close"
                                        onClick={onClose}
                                        className="closeBtn" size="small"
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </Stack>}
                            <Box className={showAiDialog ? "scrollable-container" : ""}>
                                <FormControl fullWidth className='form-wrap'>
                                    <label className='input-label'>Template</label>
                                    <div>
                                        {
                                            emailFormik.values.stages.map((stage, i) => (
                                                <Grid
                                                    container
                                                    direction="row"
                                                    justifyContent="flex-start"
                                                    alignItems="center"
                                                    key={i}
                                                >
                                                    <>
                                                        <Grid size={3}>
                                                            <TextField
                                                                size="small"
                                                                id={`templateType${i}`}
                                                                select
                                                                value={stage.templateType}
                                                                onChange={e => emailFormik.handleChange(e)}
                                                                name={`stages[${i}].templateType`}
                                                                fullWidth
                                                                className="mailInputs"
                                                                defaultValue="0"
                                                            >
                                                                <MenuItem value="all">
                                                                    <GridViewIcon fontSize="small" style={{ marginRight: 8 }} />
                                                                    All Templates
                                                                </MenuItem>
                                                                <MenuItem value="my">
                                                                    <CodeIcon fontSize="small" style={{ marginRight: 8 }} />
                                                                    My Template
                                                                </MenuItem>
                                                            </TextField>
                                                        </Grid>
                                                        {
                                                            !userLocalData.isChromeExtensionEnabled() &&
                                                            <Grid size={3}>
                                                                <TextField
                                                                    size="small"
                                                                    id={`template${i}`}
                                                                    select
                                                                    value={stage.template}
                                                                    onChange={e => emailFormik.handleChange(e)}
                                                                    name={`stages[${i}].template`}
                                                                    fullWidth
                                                                    className="mailInputs"
                                                                    defaultValue="0"
                                                                >
                                                                    <MenuItem value="emailBuilder">
                                                                        <CodeIcon fontSize="small" style={{ marginRight: 8 }} />
                                                                        HTML Template
                                                                    </MenuItem>
                                                                    <MenuItem value="emailTemplates">
                                                                        <NotesIcon fontSize="small" style={{ marginRight: 8 }} />
                                                                        Text Template
                                                                    </MenuItem>
                                                                </TextField>
                                                            </Grid>
                                                        }
                                                    </>

                                                    {/* <Grid size={!userLocalData.isChromeExtensionEnabled() ? 8 : 10}>
                                                        {stage.templateType === "all" &&
                                                            <MUIAutoComplete 
                                                                id='AllEmailTemplates'
                                                                handleChange={(id: string, name: string, type: string) => {
                                                                    if (id) {
                                                                        getTemplate(id, (type === "EmailBuilderTemplate") ? 'emailBuilder' : 'emailTemplates');
                                                                        emailFormik.setFieldValue('templateName', name);
                                                                        emailFormik.setFieldValue('templateType', 'emailBuilder');
                                                                    } else {
                                                                        emailFormik.setFieldValue('subject', "");
                                                                        emailFormik.setFieldValue('emailBody', "");
                                                                    }
                                                                }}
                                                                valuePassed={''}
                                                                isMultiple={false}
                                                                textToShow="Search All Email Templates"
                                                                placeholder=""
                                                                width="100%"
                                                                type='AllEmailTemplates'
                                                                onlyRecruiter=
                                                            />
                                                        }

                                                    </Grid> */}
                                                    <Grid size={!userLocalData.isChromeExtensionEnabled() ? 6 : 9}>
                                                        {stage.template === "emailBuilder" &&
                                                            <MUIAutoComplete
                                                                id='EmailBuilderTemplates'
                                                                handleChange={(id: string, name: string) => {
                                                                    if (id) {
                                                                        getTemplate(id, 'emailBuilder');
                                                                        emailFormik.setFieldValue('templateName', name);
                                                                        emailFormik.setFieldValue('templateType', 'emailBuilder');
                                                                    } else {
                                                                        emailFormik.setFieldValue('subject', "");
                                                                        emailFormik.setFieldValue('emailBody', "");
                                                                    }
                                                                }}
                                                                valuePassed={''}
                                                                isMultiple={false}
                                                                textToShow="Search HTML Template"
                                                                placeholder=""
                                                                width="100%"
                                                                type='EmailBuilderTemplate'
                                                                onlyRecruiter={stage.templateType === 'my' ? true : false}
                                                            />
                                                        }
                                                        {stage.template === "emailTemplates" &&
                                                            <MUIAutoComplete
                                                                id='EmailTemplates'
                                                                handleChange={(id: string, name: string) => {
                                                                    if (id) {
                                                                        getTemplate(id, 'emailTemplates');
                                                                        emailFormik.setFieldValue('templateName', name);
                                                                        emailFormik.setFieldValue('templateType', 'emailTemplates');
                                                                    } else {
                                                                        emailFormik.setFieldValue('subject', "");
                                                                        emailFormik.setFieldValue('emailBody', "");
                                                                    }
                                                                }}
                                                                valuePassed={''}
                                                                isMultiple={false}
                                                                textToShow="Search Text Template"
                                                                placeholder=""
                                                                width="100%"
                                                                type='EmailTemplate'
                                                                onlyRecruiter={stage.templateType === 'my' ? true : false}
                                                            />
                                                        }
                                                    </Grid>
                                                </Grid>
                                            ))
                                        }
                                    </div>
                                </FormControl>

                                <div className={`form-wrap fromEmail w-100 ${isSendEmailSettingEnabled ? "" : "d-none"}`}>
                                    <label className='input-label'>From</label>
                                    <MUIAutoComplete
                                        id='fromEmail'
                                        handleChange={(id: string, name: string) => {
                                            emailFormik.setFieldTouched('fromEmail');
                                            emailFormik.setFieldTouched('fromName');
                                            emailFormik.setFieldValue('fromEmail', id);
                                            emailFormik.setFieldValue('fromName', name);
                                        }}
                                        valuePassed={(emailFormik.values.fromEmail) ? { label: emailFormik.values.fromName, id: emailFormik.values.fromEmail } : {}}
                                        isMultiple={false}
                                        textToShow="Enter from email"
                                        width="100%"
                                        type='email'
                                        placeholder=""
                                    />
                                    <ErrorMessage formikObj={emailFormik} name={'fromEmail'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                </div>

                                {!isBulkEmail && (
                                    <FormControl fullWidth className='form-wrap fromEmail'>
                                        <label className='input-label'>To</label>
                                        {name === "" && emailId === "" ?
                                            (<TextField
                                                id="toEmail"
                                                name="toEmail"
                                                value={emailFormik.values.toEmail}
                                                onChange={emailFormik.handleChange}
                                                variant="outlined"
                                                size='small'
                                                // error={(emailFormik.errors.toEmail && isFormSubmitted) ? true : false}
                                                disabled={(name !== "" && emailId !== "") ? true : false}
                                            >
                                                {/* {(name !== "" && emailId !== "") ? <MenuItem
                                    className="emailMenuItem"
                                    value={emailId}><b>{name}</b> <span>&lt;</span>{emailId}<span>&gt;</span></MenuItem>
                                    : <MenuItem className="emailMenuItem" value="">Select a template...</MenuItem>
                                } */}
                                            </TextField>) : (
                                                <TextField
                                                    id="toEmail"
                                                    name="toEmail"
                                                    // value={emailFormik.values.toEmail}
                                                    value={`${name} <${emailId}>`}
                                                    // {
                                                    //     (name !== "" && emailId !== "") ? <MenuItem
                                                    //         className="emailMenuItem"
                                                    //         value={emailId}><b>{name}</b> <span>&lt;</span>{emailId}<span>&gt;</span></MenuItem>
                                                    //         : <></>
                                                    // }
                                                    onChange={emailFormik.handleChange}
                                                    variant="outlined"
                                                    size='small'
                                                    disabled={(name !== "" && emailId !== "") ? true : false}
                                                    error={(emailFormik.errors.toEmail && isFormSubmitted) ? true : false}
                                                />
                                            )}

                                        <ErrorMessage formikObj={emailFormik} name={'toEmail'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                    </FormControl>
                                )}
                                {jobId && emailId && !userLocalData.isChromeExtensionEnabled() && <div className="button-group">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<AutoFixHighOutlinedIcon />}
                                        onClick={openAiDialog}
                                    >
                                        Write with AI
                                    </Button>
                                </div>}

                                <FormControl fullWidth className='form-wrap'>
                                    <label className='input-label'>Subject</label>
                                    <TextField
                                        id="subject"
                                        name="subject"
                                        placeholder="Type a subject for your email"
                                        variant="outlined"
                                        size='small'
                                        value={emailFormik.values.subject}
                                        onChange={emailFormik.handleChange}
                                        error={(!emailFormik.values.subject && isFormSubmitted) ? true : false}
                                    />
                                    {
                                        isFormSubmitted && !emailFormik.values.subject ?
                                            <FormHelperText error className='ml-1 mt-0'>
                                                Subject is Required
                                            </FormHelperText>
                                            :
                                            null
                                    }
                                </FormControl>

                                <FormControl fullWidth className='form-wrap'>
                                    <label className='input-label'>Body</label>
                                    {emailTemplateType === "emailBuilder" ?
                                        <Box className="emailBuilder-body" component={"div"} dangerouslySetInnerHTML={{ __html: emailFormik.values.emailBody }} />
                                        : <Editor
                                            toolbarId='emailBody-dialog'
                                            id='emailBody-dialog'
                                            handleChange={(eBody: any) => emailFormik.setFieldValue('emailBody', eBody)}
                                            editorHtml={emailFormik.values.emailBody}
                                            mentions={true}
                                            saveTemplate={true}
                                            // enableSave={((emailFormik.values.subject.trim() === "") || ((emailFormik.values.emailBody.trim() === "") || (emailFormik.values.emailBody.trim() === "<p></p>") || (emailFormik.values.emailBody.trim() === "<p><br></p>"))) ? false : true}
                                            subject={emailFormik.values.subject}

                                        />}
                                    <ErrorMessage formikObj={emailFormik} name={'emailBody'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                </FormControl>
                            </Box>
                            {showAiDialog && <Stack direction={"row"} justifyContent={"flex-end"} py={1.5} px={1} borderTop={"1px solid #ccc"}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSendEmail}
                                >
                                    Send
                                </Button>
                            </Stack>}
                        </Box>
                    </Grid>
                </Grid>




                {/* <div>
                    {showAiDialog && <AIDialog
                        showAiDialog={showAiDialog}
                        setShowAiDialog={setShowAiDialog}
                        jobId={jobId}
                        candidateId={candidateId}
                        contactId={contactId}
                        handleReplaceEmailContinue={handleReplaceEmailContinue}
                    />
                    }
                </div> */}
            </DialogContent>
            <Divider />
            {!showAiDialog && <DialogActions>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSendEmail}
                >
                    Send
                </Button>
            </DialogActions>}
        </Dialog>


    );

}

export default EmailDialogBox;