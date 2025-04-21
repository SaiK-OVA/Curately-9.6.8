import { React, useState, useEffect, SyntheticEvent, lazy, useRef } from "./../../../shared/modules/React";
import { useFormik, Yup } from "./../../../shared/modules/Formik";
import { DateTime } from './../../../shared/modules/Luxon';
import { trackPromise } from "./../../../shared/modules/PromiseTrackter";
import { useNavigate, useParams } from "react-router-dom";



import { styled } from '@mui/material/styles';

import { Box } from "./../../../shared/modules/MaterialImports/Box";
import { Button } from "./../../../shared/modules/MaterialImports/Button";
import { Stack } from "./../../../shared/modules/MaterialImports/Stack";
import { Typography } from "./../../../shared/modules/MaterialImports/Typography";
import { Radio, RadioGroup, Checkbox, Select } from './../../../shared/modules/MaterialImports/FormElements';
import { FormControlLabel, FormControl, TextField } from './../../../shared/modules/MaterialImports/FormInputs';

import { MenuItem } from './../../../shared/modules/MaterialImports/Menu';
import { Divider } from './../../../shared/modules/MaterialImports/Divider';
import { Grid } from './../../../shared/modules/MaterialImports/Grid';
import { Tooltip } from './../../../shared/modules/MaterialImports/ToolTip';
import { Accordion, AccordionSummary, AccordionDetails } from './../../../shared/modules/MaterialImports/Accordion';

import { Chip } from './../../../shared/modules/MaterialImports/Chip';


import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CodeIcon from '@mui/icons-material/Code';
import NotesIcon from '@mui/icons-material/Notes';
import GridViewIcon from "@mui/icons-material/GridView";



import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import ApiService from "../../../shared/api/api";
import { userLocalData } from "../../../shared/services/userData";
import { MUIAutoComplete } from "../MUIAutoComplete/MUIAutoComplete";
import { showToaster } from "../SnackBar/SnackBar";
import { confirmDialog } from "../ConfirmDialog/ConfirmDialog";
import { PreferencesData } from "../../../shared/data/Community/Preferences";
import { globalData } from "../../../shared/services/globalData";
// import MessageRoundedIcon from '@mui/icons-material/MessageRounded';


const Editor = lazy(() => import("../EmailDialogBox/EmailBody"));
// const Tasks = lazy(() => import("../Tasks/Tasks"));
const EmailList = lazy(() => import("../../Dashboard/Candidate/ViewCandidate/EmailList"));




import masterTimeList from "../../../shared/data/Time";
import { InvitationInterface } from "../../../shared/model/Invitation";
import Parsable from "../../../shared/utils/Parsable";




import './Activities.scss';
import LuxonDateParser from "../../../shared/services/LuxonDateParser";
import { ID_ROLE_CONTACT_CAN_EDIT_TASKS_NOTES_ACTIVITY_LOGS_OF_ALL_USERS, ID_ROLE_CONTACT_CAN_VIEW_TASKS_NOTES_ACTIVITY_LOGS_OF_ALL_USERS } from "../../../shared/services/Permissions/IDs";
import Message from "../../Dashboard/SmsComponent/SmsDialogBox/Message";
import PlaceHolders from "../../Dashboard/Letters/Workflow/PopUps/PlaceHolders/PlaceHolders";
import SmsTemplates from "../../Dashboard/Letters/Workflow/PopUps/SmsTemplates/SmsTemplates";
import SaveSMSTemplate from "../../../shared/components/SaveSMSTemplate/SaveSMSTemplate";
import LinearProgress from "@mui/material/LinearProgress/LinearProgress";




// import { format } from 'date-fns';
// import Autocomplete from '@mui/material/Autocomplete';
// import CircularProgress from '@mui/material/CircularProgress';
// import Card from "@mui/material/Card";
// import AccordionActions from '@mui/material/AccordionActions';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import EmailDialogBox from "../EmailDialogBox/EmailDialogBox";
// import Timeline from '@mui/lab/Timeline';
// import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
// import TimelineSeparator from '@mui/lab/TimelineSeparator';
// import TimelineConnector from '@mui/lab/TimelineConnector';
// import TimelineContent from '@mui/lab/TimelineContent';  
// import TimelineDot from '@mui/lab/TimelineDot';

// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
// import IntegrationInstructionsOutlinedIcon from "@mui/icons-material/IntegrationInstructionsOutlined";
// import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";

interface Message {
    smsId: string;
    type: 'IN' | 'OUT';
    body: string;
    date: string;
    recrName: string;
    userId: number;
    userName: string;
}

type GroupedMessages = {
    [date: string]: Message[];
};

interface activity {
    
    month: string,
    days: number,
    yearAndMonth: number,
    activeDays: number;
}


const BpIcon = styled("span")(() => ({
    borderRadius: 1,
    width: 16,
    height: 16,
    backgroundColor: '#ffffff',
}));

const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: 'var(--c-primary-color)',
    "&:before": {
        display: "block",
        width: 16,
        height: 16,
        backgroundImage:
            "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
            " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
            "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
        content: '""'
    },
});

const RadioBpIcon = styled("span")(({ theme }) => ({
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
        theme.palette.mode === "dark" ? "red" : "inset 0 0 0 1px var(--c-secondary-color)"
}));

const RadioBpCheckedIcon = styled(RadioBpIcon)({
    backgroundColor: 'var(--c-primary-color)',
    boxShadow: 'none',
    backgroundImage:
        "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
        display: "block",
        width: 16,
        height: 16,
        backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
        content: '""'
    }
});

const BpCheckboxContainer = styled("div")({
    '.bp-icon': {
        border: "1px var(--c-secondary-color) solid",
    },
    "& .bp-checkbox:hover .bp-icon": {
        borderColor: 'var(--c-primary-color)',
    }
});


export interface activitiesProps {
    note?: boolean;
    call?: boolean;
    reqCall?: boolean;
    meeting?: boolean;
    action?: boolean;
    task?: boolean;
    email?: boolean;
    componentFrom?: string;
    activities?: boolean;
    candidateId?: string;
    contactId?: string;
    contactName?: string;
    companyId?: string;
    companyNotes?: any;
    candidateData?: any;
    isLoadCandiateActivesType?: "NOTES" | "EMAIL" | "SMS" | "";
    resetActivitiesType?: any;
    isShowEmail?: boolean;
    isShowPhone?: boolean;
    communityStatus?: string;
}

const Activities = ({ note, call, reqCall, meeting, communityStatus, action, task, email, componentFrom, activities = true, candidateId, contactId, contactName, companyId, companyNotes, candidateData, isLoadCandiateActivesType, resetActivitiesType, isShowEmail = true, isShowPhone = true }: activitiesProps) => {
    const { jobId } = useParams();
    const isSendEmailSettingEnabled = userLocalData.checkIntegration(40005) && userLocalData.checkIntegration(400022);

    const isActivitiesAddSettingEnabled = Boolean(userLocalData.checkIntegration(400015) || candidateId);

    const [activityType, setActivityType] = useState('Note');
    // const [noteText, setNoteText] = useState('');
    // const [isHideActivities, setIsHideActivities] = useState(true);
    const [refreshEmailList, setRefreshEmailList] = useState(true);

    const isCRMEnabled = !userLocalData.adminSettings(30003);

    const [showActivities] = useState(activities);
    const [contactNotesData, setContactsNotesData] = useState<any>([]);
    const [contactActivitiesData, setContactsActivitiesData] = useState<any>([]);
    const [candidateSmsData, setCandidateSmsData] = useState<any>([]);
    const [candidateNotesData, setCandidateNotesData] = useState<any>([]);
    const [aiMatchJobs, setAiMatchJobs] = useState<{
        jobId: "",
        jobTitle: ".",
        score: "",
        statusId: "",
        statusName: "",
    }[]>([]);
    // const [companyNotesData, setCompanyNotesData] = useState<any>([]);
    // const [emailTempList, setEmailTempList] = useState<any>([]);

    // const [template, setTemplate] = useState('');
    const [activeTab, setActiveTab] = useState('open');
    const [emailTemplateType, setEmailTemplateType] = useState<'emailBuilder' | 'emailTemplates'>("emailTemplates");

    // Function to handle tab click for Open Tasks
    const onclickContact = () => {
        setActiveTab('open');
    };
    const [smsTemplateList, setSmsTemplateList] = useState({
        id: "",
        name: ""
    });

    const candidatePoolView = window.location.href.includes('/talentPool/Candidate/view/');

    const [selectedNotes, setSelectedNotes] = useState({
        notes: "",
        modifyDate: "",
        notesId: "",
        recruiterName: "",
    });

    // Function to handle tab click for Completed Tasks
    const onclickAccount = () => {
        setActiveTab('completed');
    };
    // Function to handle edit icon click
    // const handleEditIconClick = (task) => {
    //   // Logic to handle edit
    // };

    // Determine if a tab is active
    const isContact = activeTab === 'open';
    const isAccount = activeTab === 'completed';

    const [smsBody, setSmsBody] = useState("");


    const maxCharacterCount = 140; // Set your desired maximum character count

    const ta1HandleChange = (event: { target: { value: any; }; }) => {
        const inputText = event.target.value;
        if (inputText.length <= maxCharacterCount) {
            setSmsBody(inputText);
        }
    };

    // console.log(companyNotes);
    // const handleHideActivities = () => {
    //     setIsHideActivities(!isHideActivities)
    // }
    // const handleCallChange = (event: any) => {
    //   setCallText(event.target.value);
    // };
    // const handleActionChange = (event: any) => {
    //   setActionText(event.target.value);
    // };
    // const handleTaskChange = (event: any) => {
    //   setTaskText(event.target.value);
    // };

    const handleActivity = (event: React.ChangeEvent<HTMLInputElement>) => {
        setActivityType((event.target as HTMLInputElement).value);
    };

    // const loadEmailTemplates = () => {
    //     ApiService.getCall(214, `getEmailTemplatesList/${userLocalData.getvalue('recrId')}/${userLocalData.getvalue('clientId')}`)
    //         .then((response) => {
    //             if (response.data && response.data.List) {
    //                 // console.log(response.data.List)
    //                 let tempTemplateList = [];
    //                 for (let sl = 0; sl < response.data.List.length; sl++) {
    //                     const element = response.data.List[sl];
    //                     (element.type !== 0) && tempTemplateList.push({
    //                         "id": element.templateId,
    //                         "label": element.templateName,
    //                         // "description": element.description,
    //                         // "subject": element.subject,
    //                         // "type": element.type,
    //                         // "isactive": element.isactive,
    //                         // "createdBy": element.createdBy,
    //                         // "createdDate": element.createdDate,
    //                         // "modifyBy": element.modifyBy,
    //                         // "modifyDate": element.modifyDate
    //                     })
    //                 }
    //                 // console.log(result);
    //                 setEmailTempList(tempTemplateList);
    //             }
    //         },
    //         )
    // }
    const [aiJobsLoaded, setAiJobsLoaded] = useState(false);

    const loadAIMatchJobs = (reload: boolean) => {
        // https://app.curately.ai/Accuick_API/Curately/userAIMatch.jsp?clientId=2&userId=9282
        if (!aiMatchJobs.length || reload) {
            setAiJobsLoaded(false);
            trackPromise(

                ApiService.postWithData('admin', 'getUserMatchDetails', { userId: candidateId, clientId: userLocalData.getvalue('clientId') }).then(

                    //      ApiService.getByParams(193, 'Curately/userAIMatch.jsp', { userId: candidateId }).then(
                    (response) => {
                        if (response.data.Success) {
                            let tempAIJobs = response.data.response.data;
                            /// console.log(tempAIJobs);
                            if (tempAIJobs && tempAIJobs.length) {
                                tempAIJobs = tempAIJobs.sort((a: { score: string }, b: { score: string }) => parseFloat(b.score) - parseFloat(a.score));
                                setAiMatchJobs(tempAIJobs.slice(0, 6));
                            }
                        }
                        setAiJobsLoaded(true);
                    },
                )
            )
        }
    }


    const loadInvitations = (reload: boolean) => {
        if (!invitationsData.length || reload) {
            trackPromise(
                ApiService.postWithData('admin', 'getInviteUserView', { userId: candidateId, clientId: userLocalData.getvalue('clientId') }).then(
                    (response) => {
                        if (response.data.invites?.length) {
                            let invitesData = response.data.invites;
                            if (invitesData && invitesData.length) {
                                invitesData = invitesData.sort((a: { invitedate: string }, b: { invitedate: string }) => Number(a.invitedate) - Number(b.invitedate));
                                for (let ind = 0; ind < invitesData.length; ind++) {
                                    if (response.data.Screening?.length && invitesData[ind].openid) {
                                        let tempscreeningData = response.data.Screening;
                                        // : InvitationInterface["Screening"]
                                        let screeningData = tempscreeningData.find((obj: { openid: string }) => {
                                            return obj.openid === invitesData[ind].openid
                                        });
                                        if (screeningData?.openid) {
                                            if (screeningData.answers) {
                                                screeningData.answers = Parsable.isJSON(screeningData.answers) ? JSON.parse(screeningData.answers) : [];
                                                screeningData.questions = Parsable.isJSON(screeningData.questions) ? JSON.parse(screeningData.questions).components : [];

                                                let tempQAs = [];
                                                screeningData.QAs = [];

                                                for (let q = 0; q < screeningData.answers.length; q++) {
                                                    let questionObj = screeningData.questions.find((i: { id: string }) => "" + i.id === "" + screeningData.answers[q].quesId);
                                                    if ((questionObj?.labelName || questionObj?.labelValue) || screeningData.answers[q]?.answer) {
                                                        tempQAs.push({
                                                            question: (questionObj?.labelName) ? questionObj?.labelName : (questionObj?.labelValue) ? questionObj?.labelValue : '',
                                                            answer: (screeningData.answers[q]?.answer) ? screeningData.answers[q].answer : '',
                                                            quesId: screeningData.answers[q].quesId
                                                        });
                                                    }
                                                }
                                                screeningData.QAs = tempQAs;
                                            }
                                            invitesData[ind].Screening = screeningData;
                                        }
                                    }
                                }
                                console.log(invitesData);
                                setInvitationsData(invitesData);
                                // setAiMatchJobs(invitesData.slice(0, 6));
                            }
                        }
                    },
                )
            )
        }
    }


    // const handleTemplateChange = (event: any) => {
    //     setTemplate(event.target.value as string);
    //     getEmailTemplate(event.target.value);
    // };

    // const getEmailTemplate = (templateId: string) => {
    //     ApiService.getByParams(171, 'getTemplateById.jsp', { tmplid: templateId }).then(
    //         (result) => {
    //             // console.log(result);
    //             setFormFieldValue(result.data.body, result.data.subject, templateId);
    //         },
    //     )
    // }


    const navigate = useNavigate();

    // const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const shortlistForm = (jobId: string, jobTitle: string) => {
        // setIsFormSubmitted(true);
        confirmDialog(`Are you sure you want to shortlist this Job - ${jobTitle}?`, () => {
            const recrId = userLocalData.getvalue('recrId');
            const clientId = userLocalData.getvalue('clientId');
            // let jobId = activitiesFormik.values.jobId;

            // https://app.curately.ai/Accuick_API/Curately/Candidate/assign_job.jsp?clientId=3&recrId=61&jobId=1&userId=3520

            trackPromise(
                ApiService.postWithData('admin', 'saveAssignJob', { recrId: recrId, clientId: clientId, userIds: [Number(candidateId)], jobId: Number(jobId) }).then(
                    (response: any) => {
                        if (response.data.Success === true) {
                            loadAIMatchJobs(true);
                            // showToaster("Job Assign Successfully", 'success');
                            showToaster((response.data.Message), "success")
                            // matchToFormik.resetForm();
                            navigate('/' + userLocalData.getvalue('clientName') + '/candidate/view/' + candidateId + '/' + jobId);
                            // closePopup();
                        } else {
                            showToaster((response.data.Message) ? response.data.Message : "An error occured while assigning the Candidate.", 'error')
                        }
                    }
                )
            )
        }, 'info'
        )
    }
    // const getEmailTemplate = (templateId: string) => {
    //     trackPromise(
    //         ApiService.getCall(214, `getEmailTemplatesListById/${templateId}/${userLocalData.getvalue('clientId')}`).then(
    //             (response) => {
    //                 if (response.data.Success && response.data.list.length > 0) {
    //                     const template = response.data.list[0];
    //                     // console.log(result);
    //                     setFormFieldValue(template.description || '', template.subject || '', templateId);
    //                 }
    //             },
    //         ))
    // }

    const getTemplate = (templateId: string, type: 'emailBuilder' | 'emailTemplates') => {
        let tempUrl = (type === "emailTemplates")
            ? `getEmailTemplatesListById/${templateId}/${userLocalData.getvalue('clientId')}`
            : `getEmailBuilderTemplatesListById/${templateId}/${userLocalData.getvalue('clientId')}`;

        trackPromise(
            ApiService.getCall(214, tempUrl).then((response: any) => {
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

    const setFormFieldValue = (emailBody: string, subject: string) => {
        if (activitiesFormik.values.emailBody !== emailBody) {
            if (subject) {
                activitiesFormik.setFieldValue('subject', subject);
            }
            if (emailBody) {
                activitiesFormik.setFieldValue('emailBody', emailBody);
            }
        }
    }

    useEffect(() => {
        if (contactId) {
            loadContactNotes();
            loadContactActivities();
        } else if (candidateId) {
            loadCandidateNotes();
        }
        // else if (companyId) {
        // loadCompanyNotes();
        // }
        // if (email === true) {
        //     loadEmailTemplates()
        // }

        // loadCandidateSms();
    }, []);


    useEffect(() => {
        if (activityType === "SMS") {
            resetActivitiesType();
            loadCandidateSms()
        }
    }, [isLoadCandiateActivesType, activityType])

    // const loadCompanyNotes = () => {
    //     // ApiService.getByParams(193, 'Curately/Contacts/contact_notes.jsp', { contId: contactId }).then(
    //     //     (response: any) => {
    //     //         console.log(response.data);
    //     //         setContactsNotesData(response.data);
    //     //     }
    //     // )
    // }

    const loadContactNotes = () => {

        ApiService.postWithData('admin', 'contactNotesAction', { contId: contactId, "action": "GET", clientId: userLocalData.getvalue('clientId') }).then(
            //       ApiService.getByParams(193, 'Curately/Contacts/contact_notes.jsp', { contId: contactId }).then(
            (response: any) => {
                //console.log('contactNotes', response.data); contactNotesAction
                setContactsNotesData(response.data.noteslog);
            }
        )
    }

    // "view": "Activity",
    // "actId" : 5,
    // "contId": 73,
    // "next": 0,
    // "clientId": 3

    // console.log('communityStatus:', communityStatus); 
    const loadContactActivities = () => {
        //    ApiService.getByParams(193, 'Curately/Contacts/contact_activity_view.jsp', { view: "Contact", contId: contactId, next: 0 }).then(
        ApiService.postWithData('admin', 'contactActivityView', { view: "Contact", contId: contactId, next: 0, clientId: userLocalData.getvalue('clientId') }).then(
            (response: any) => {
                //  console.log(response.data.contactsActivities);
                setContactsActivitiesData((response.data && Array.isArray(response.data?.contactsActivities)) ? response.data?.contactsActivities : []);
            }
        )
    }

    const loadCandidateSms = () => {
        const payLoad = {
            "recrId": `${userLocalData.getvalue("recrId")}`,
            "userId": Number(candidateId),
            "clientId": `${userLocalData.getvalue("clientId")}`
        }
        ApiService.postWithData("admin", "getsmsLog", payLoad).then((res: any) => {
            if (res.data?.Success) {
                setCandidateSmsData(res.data?.list || [])
                if (res.data.list) {
                    let data = res.data.list;
                    data = data.sort((a: { date: string }, b: { date: string }) => new Date(a.date).getTime() - new Date(b.date).getTime());
                    const groupedMessagesByDate = data.reduce((acc: any, message: any) => {
                        const date = DateTime.fromSQL(message.date).toFormat('EEEE MMMM d');
                        if (!acc[date]) {
                            acc[date] = [];
                        }
                        acc[date].push(message);
                        return acc;
                    }, {});
                    console.log(groupedMessagesByDate)
                    setGroupedMessagesByDate(groupedMessagesByDate);
                }
            } else setCandidateSmsData([]);
        })
    }

    const loadCandidateNotes = () => {
        // http://35.155.202.216:8080/Curately/getUserNotesList\
        // Accuick_API\Curately\Candidate\notes.jsp
        ApiService.postWithData("admin", 'notes', {
            recrId: userLocalData.getvalue('recrId'),
            userId: Number(candidateId),
            action: "GET",
            clientId: userLocalData.getvalue("clientId"),
            // notesId: "",
            // notes: ""
        }).then(
            (response: any) => {
                if ((response.data.Message === "Success") && response.data.noteslog && response.data.noteslog.length) {
                    setCandidateNotesData(response.data.noteslog);
                } else {
                    setCandidateNotesData([]);
                }
            }
        )
    }
    const deleteNoteById = (id: string) => {
        ApiService.postWithData("admin", 'notes', {
            recrId: userLocalData.getvalue('recrId'),
            userId: Number(candidateId),
            action: "DELETE",
            notesid: id,
            clientId: userLocalData.getvalue("clientId"),
            // notes: ""
        }).then(
            (response: any) => {
                if (response.data.Message === "Success") {
                    loadCandidateNotes();
                } else {
                    showToaster(response.data.message, 'error');
                }
            }
        )
    }

    const saveCandidateNotes = () => {
        if (activitiesFormik.values.desc) {
            // console.log(activitiesFormik.values.desc);
            // http://35.155.202.216:8080/Curately/saveUserNotes

            let tempDataToPass: any = {
                recrId: userLocalData.getvalue('recrId'),
                userId: Number(candidateId),
                clientId: userLocalData.getvalue("clientId"),
                // notesId: "",
                notes: activitiesFormik.values.desc
            }
            if (selectedNotes.notesId) {
                tempDataToPass.notesid = selectedNotes.notesId;
                tempDataToPass.action = "UPDATE";
            } else {
                tempDataToPass.action = "SAVE";
            }
            ApiService.postWithData("admin", 'notes', tempDataToPass).then(
                (response: any) => {
                    // if (response.data.Success) {
                    if (response.data.Message === "Success") {
                        setSelectedNotes({
                            modifyDate: "",
                            notes: "",
                            notesId: "",
                            recruiterName: ""
                        });
                        activitiesFormik.setFieldValue('desc', '');
                        loadCandidateNotes();
                        showToaster('Note has been saved successfully.', 'success');
                    } else {
                        showToaster(response.data.message, 'error');
                    }
                }
            )
        } else {
            showToaster('Please enter Notes to add', 'info');
        }
    }

    const saveCandidateSms = () => {
        if (smsBody) {

            const payLoad = {
                "clientId": userLocalData.getvalue("clientId"),
                "userId": candidateId ? candidateId : "",
                "recrId": userLocalData.getvalue("recrId"),
                "jobId": jobId ? jobId : "",
                "contId": contactId ? contactId : "",
                // "workflowJobCandId": workflowJobCandidateId,
                "body": smsBody
            }

            ApiService.postWithData("admin", "smsSent", payLoad).then((response: any) => {
                if (response.data.Message === "Success") {
                    activitiesFormik.setFieldValue('desc', '');
                    setSmsBody('');
                    loadCandidateSms();
                    showToaster('SMS has been sent successfully.', 'success');
                } else {
                    showToaster(response.data.Message, 'error');
                }
            })
        } else {
            showToaster('Please enter SMS to sent', 'info');
        }
    }
    const saveContactNotes = () => {
        if (activitiesFormik.values.desc) {

            let tempDataToPass: any = {
                recrId: userLocalData.getvalue('recrId'),
                clientId: userLocalData.getvalue("clientId"),
                contId: contactId,
                notes: activitiesFormik.values.desc,
            }
            if (selectedNotes.notesId) {
                tempDataToPass.notesid = selectedNotes.notesId;
                tempDataToPass.action = "UPDATE";
            } else {
                tempDataToPass.action = "SAVE";
            }

            // console.log(activitiesFormik.values.desc);
            //      ApiService.getByParams(193, 'Curately/Contacts/contact_notes_save.jsp', {
            ApiService.postWithData('admin', 'contactNotesAction', tempDataToPass).then(
                (response: any) => {
                    if (response.data.Success) {
                        setSelectedNotes({
                            modifyDate: "",
                            notes: "",
                            notesId: "",
                            recruiterName: ""
                        });
                        activitiesFormik.setFieldValue('desc', '');
                        loadContactNotes();
                        showToaster('Note has been saved successfully.', 'success');
                    } else {
                        showToaster(response.data.message, 'error');
                    }
                }
            )
        } else {
            showToaster('Please enter Notes to add', 'info');
        }
    }

    const deleteContactNoteById = (id: string) => {
        ApiService.postWithData("admin", 'contactNotesAction', {
            recrId: userLocalData.getvalue('recrId'),
            userId: Number(contactId),
            action: "DELETE",
            notesid: id,
            contId: contactId,
            clientId: userLocalData.getvalue("clientId"),
        }).then(
            (response: any) => {
                if (response.data.Message === "Success") {
                    loadContactNotes();
                } else {
                    showToaster(response.data.message, 'error');
                }
            }
        )
    }


    const initialValues = {
        activityType: "",
        outcome: "",
        date: DateTime.now(),
        time: "",
        desc: "",
        emails: "",
        hiringManager: contactName,
        hiringManagerId: contactId,
        callType: "",
        associatedJob: "",
        associatedJobTitle: "",
        logAMeet: false,
        emailBody: "",
        subject: "",
        fromEmail: userLocalData.getvalue('email'),
        fromName: userLocalData.getvalue('recrFullName'),
        toEmail: "",
        templateName: "",
        templateId: "",
        templateType: '',
        activities: [{
            template: !userLocalData.isChromeExtensionEnabled() ? "emailBuilder" : "emailTemplates",
            templateType: 'all',
        }]

    };
    // const handleTabClick = (tabName) => {
    //     setActiveTab(tabName);
    // };

    const validationSchema = Yup.object({
        activityType: Yup.string(),
        outcome: Yup.string(),
        date: Yup.string(),
        time: Yup.string(),
        desc: Yup.string(),
        emails: Yup.string(),
        hiringManager: Yup.string(),
        hiringManagerId: Yup.string(),
        callType: Yup.string(),
        associatedJob: Yup.string(),
        associatedJobTitle: Yup.string(),
        logAMeet: Yup.boolean(),
        emailBody: Yup.string(),
        subject: Yup.string(),
        fromEmail: Yup.string(),
        fromName: Yup.string(),
        toEmail: Yup.string(),
        templateName: Yup.string(),
        templateId: Yup.string(),
        template: Yup.string(),
        activities: Yup.array().of(
            Yup.object().shape({

                template: Yup.string()
            })
        ),
        templateType: Yup.string(),
    });

    const logActivity = () => {
        let tempActivityFormikValues: any = { ...activitiesFormik.values }
        let tempData = {
            contId: contactId,
            contName: activitiesFormik.values.hiringManager,
            outcome: (activityType === "ReqCall") ? activitiesFormik.values.associatedJob : activitiesFormik.values.outcome,
            activityType: (activityType === "Call") ? 1 : (activityType === "Meeting") ? 3 : (activityType === "ReqCall" && activitiesFormik.values.callType === "One on One") ? 3 : (activitiesFormik.values.callType === "Multiple Vendors") ? 5 : "",
            date: (tempActivityFormikValues.date && tempActivityFormikValues.date?.c) ? DateTime.fromFormat(tempActivityFormikValues.date.c.year + '/' + tempActivityFormikValues.date.c.month + '/' + tempActivityFormikValues.date.c.day, 'yyyy/M/d').toFormat('MM/dd/yyyy') : "",
            time: activitiesFormik.values.time,
            descr: activitiesFormik.values.desc,
            recrId: userLocalData.getvalue('recrId'),
            crUserId: userLocalData.getvalue('recrId'),
            clientId: userLocalData.getvalue('clientId')
        }
        if (!activitiesFormik.values.hiringManager) {
            showToaster(`${(activityType === "ReqCall") ? 'Hiring Manager' : 'Contact'} is Mandatory`, 'error');
            return
        } else if ((activityType === "ReqCall") && !activitiesFormik.values.associatedJob) {
            showToaster('Please select Associated Job', 'error');
            return
        } else if ((activityType === "Call") && !activitiesFormik.values.outcome) {
            showToaster('Please select Outcome', 'error');
            return
        }
        else if ((activityType === "ReqCall") && (!activitiesFormik.values.callType)) {
            showToaster('callType is Mandatory', 'error');
            return
        }
        else if (!activitiesFormik.values.date) {
            showToaster('Date is Mandatory', 'error');
            return
        } else if (!activitiesFormik.values.time) {
            showToaster('Time is Mandatory', 'error');
            return
        } else if (!activitiesFormik.values.desc) {
            showToaster('Enter Notes', 'error');
            return
        }
        //    ApiService.getByParams(193, 'Curately/Contacts/contact_activity_save.jsp', tempData).then(
        ApiService.postWithData('admin', 'saveContactActivity', tempData).then(
            (response: any) => {
                if (response.data.Success) {
                    activitiesFormik.resetForm();
                    activitiesFormik.setFieldValue('hiringManager', contactName);
                    activitiesFormik.setFieldValue('hiringManagerId', contactId);
                    showToaster('Log has been saved Sucessfully', 'success');
                    loadContactActivities();
                } else {
                    if (response.data.message) {
                        showToaster(response.data.message, 'error');
                    } else {
                        showToaster('Error saving Activity.', 'error');
                    }
                }
            }
        )
        // outcome: $('#associatedJob').val().join(),
        // req call
        // activityType === "Call"   1
        // activityType === "Meeting" 3
        // activityType === "Action" 
        // activityType === "ReqCall"   One on One 3     Multiple 5
        // activityType === "Note"
        // email 2
        // 
        // activity 6
    }
    const activitiesFormik = useFormik({
        initialValues,
        onSubmit: logActivity,
        validationSchema,
    });


    const handleSendEmail = () => {
        const emailBodyForCheck = activitiesFormik.values.emailBody ? activitiesFormik.values.emailBody.replace(/<p><br><\/p>/g, '').replace(/ /g, '').replace(/<p><\/p>/g, '') : "";
        if (!activitiesFormik.values.fromEmail || !activitiesFormik.values.fromName) {
            showToaster('From Email is mandatory.', 'error');
            return
        } else if (!activitiesFormik.values.subject) {
            showToaster('Subject is Mandatory', 'error');
            return
        } else if ((emailBodyForCheck.replace(/ /g, '').trim() === "") || (emailBodyForCheck.replace(/ /g, '').trim() === "<p></p>") || (emailBodyForCheck.replace(/ /g, '').trim() === "<p><br></p>")) {
            showToaster("Please enter Email Body", "error");
            return
        }
        // const data = {
        //     clientId: userLocalData.getvalue('clientId'),
        //     userIds: candidateId, // candidateId ? 39 : ""
        //     contId: contactId, // contactId ? 3 : ""
        //     subject: activitiesFormik.values.subject,
        //     body: activitiesFormik.values.emailBody,
        //     recrId: userLocalData.getvalue('recrId'),
        //     senderName: activitiesFormik.values.fromName,
        //     senderEmail: activitiesFormik.values.fromEmail,
        //     sendFrom: "browser",
        // }
        // https://www4.accuick.com/Accuick_API/Curately/Email/email_sent.jsp?clientId=2&userIds=39&subject=test&body=test&recrId=61&senderName=Mastanvali&senderEmail=mvali@askconsulting.com&sendFrom=browser
        // trackPromise(
        //     ApiService.getByParams(193, 'Curately/Email/email_sent.jsp', data).then(
        //         (result) => {
        //             // console.log(result);
        //             if (result.data.Message === "Success") {
        //                 activitiesFormik.resetForm();
        //                 // setTemplate("");
        //                 showToaster("Email sent Successfully", 'success');
        //             } else {
        //                 showToaster(result.data.Message ? result.data.Message : "Email not sent", 'error');
        //             }
        //         },
        //     )
        // )


        // const params = new URLSearchParams();
        // params.append("clientId", userLocalData.getvalue('clientId'));
        // params.append("userIds", candidateId ? candidateId : "");
        // params.append("contId", contactId ? contactId : "");
        // params.append("subject", activitiesFormik.values.subject);
        // params.append("body", activitiesFormik.values.emailBody);
        // params.append("recrId", userLocalData.getvalue('recrId'));
        // params.append("accountId", `${userLocalData.getvalue('clientId')}_${userLocalData.getvalue('recrId')}`);
        // params.append("senderName", activitiesFormik.values.fromName);
        // params.append("senderEmail", activitiesFormik.values.fromEmail);
        // params.append("sendFrom", "Email Engine");
        // params.append("jobId", jobId ? jobId : "");


        const sendEmailData = {
            clientId: userLocalData.getvalue('clientId'),
            userIds: candidateId ? candidateId : "",
            contIds: contactId ? contactId : "",
            subject: activitiesFormik.values.subject,
            body: activitiesFormik.values.emailBody,
            recrId: userLocalData.getvalue('recrId'),
            accountId: `${userLocalData.getvalue('clientId')}_${userLocalData.getvalue('recrId')}`,
            senderName: activitiesFormik.values.fromName,
            senderEmail: activitiesFormik.values.fromEmail,
            sendFrom: "Email Engine",
            jobId: jobId ? jobId : "",
            // toEmail: emailId ? emailId : "",
        };


        const templateData = {
            clientId: userLocalData.getvalue('clientId'),
            subject: activitiesFormik.values.subject,
            recrId: userLocalData.getvalue('recrId'),
            jobId: jobId ? jobId : "",
            userIds: candidateId ? candidateId : "",
            contId: contactId ? contactId : "",
            body: activitiesFormik.values.emailBody,

            accountId: `${userLocalData.getvalue('clientId')}_${userLocalData.getvalue('recrId')}`,
            senderName: activitiesFormik.values.fromName,
            senderEmail: activitiesFormik.values.fromEmail,
            sendFrom: "Email Engine",
        };


        // if ((Number(candidateId) == 41507) || (userLocalData.getvalue('email') === 'mvali@curately.ai') || (userLocalData.getvalue('email') === 'maheshhruser@gmail.com')) {
        // if (userLocalData.isChromeExtensionEnabled() || (!userLocalData.isChromeExtensionEnabled() && Boolean(Number(localStorage.getItem('emailEngineAccountActive'))))) {
        //     if (Boolean(Number(localStorage.getItem('emailEngineAccountActive')))) {
        trackPromise(
            ApiService.postWithData('admin', "sendEmail", sendEmailData).then(
                (result) => {
                    if (result.data.Success) {
                        setRefreshEmailList(!refreshEmailList);
                        showToaster("Email sent Successfully", 'success');
                        activitiesFormik.resetForm();
                        setSelectedTemplate({ id: '', name: '' })
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
        //         ApiService.postWithData("admin", "sendEmailWithTemplate", templateData).then(
        //             (result) => {
        //                 if (result.data.Success === true) {
        //                     showToaster("Email sent Successfully", 'success');
        //                     setRefreshEmailList(!refreshEmailList);
        //                     activitiesFormik.resetForm();
        //                     setSelectedTemplate({ id: '', name: '' })
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


    // console.log(companyNotes);

    const getPreferenceValue = (val: string) => {

        const categoryID = parseInt(val.toString().substring(0, 5));

        const category = PreferencesData.find(item => item.categoryID === categoryID);
        if (!category) {
            return "";
        }
        let sendvalue = "";
        if ((val.toString().length > 8)) {
            let preVal = val.split(",");
            for (let i = 0; i < preVal.length; i++) {
                if (preVal[i].trim() !== "") {
                    const preference = category.lookupsList.find(item => item.lookupId === parseInt(preVal[i]));
                    if (preference) {
                        sendvalue = sendvalue + ", " + preference.lookupValue;
                    }
                }
            }
            sendvalue = sendvalue.startsWith(',') ? sendvalue.slice(1) : sendvalue;

        } else {
            const preference = category.lookupsList.find(item => item.lookupId === parseInt(val.toString()));
            if (!preference) {
                return "";
            }
            sendvalue = preference.lookupValue;
        }

        return sendvalue;
    };


    const openJobView = (id: string) => {
        if (id) {
            window.open(globalData.getWindowLocation() + "job/view/" + id);
        }
    }

    const [invitationsData, setInvitationsData] = useState<InvitationInterface[]>([
        // {
        //     title: "Video Assessment",
        //     subTitle: "Initial video screening",
        //     status: "Completed",
        //     list: [
        //         {
        //             title: "Video Interview",
        //             date: "2023-04-10",
        //             recruiterName: "John Doe",
        //             time: "14:30",
        //         },
        //         {
        //             title: "Coding Challenge",
        //             date: "2023-04-12",
        //             recruiterName: "Jane Smith",
        //             time: "14:10",
        //         },
        //     ],
        // },
        // {
        //     title: "Technical Assessment",
        //     subTitle: "Coding challenge",
        //     status: "Pending",
        //     list: [
        //         {
        //             title: "Coding Challenge",
        //             date: "2023-04-12",
        //             recruiterName: "Jane Smith",
        //             time: "14:20",
        //         },
        //         {
        //             title: "Video Interview",
        //             date: "2023-04-10",
        //             recruiterName: "John Doe",
        //             time: "14:20",
        //         },
        //     ],
        // },
        // {
        //     title: "HR Interview",
        //     subTitle: "Final round with HR",
        //     status: "Scheduled",
        //     list: [
        //         {
        //             title: "HR Interview",
        //             date: "2023-04-15",
        //             recruiterName: "Emily Johnson",
        //             time: "14:20",
        //         },
        //     ],
        // },
    ]);

    const getStatusColor = (status: any) => {
        switch (status) {
            case 'Pending':
                return 'orange';
            case 'Completed':
                return 'lightgreen';
            default:
                return 'black';
        }
    };
    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 12,
        width: 25,
        borderRadius: 2,
        '& .MuiLinearProgress-bar': {
            backgroundColor: '#43CD89',
        },
        transform: 'rotate(-90deg)', 
    }));
   
    
   
    const [activityData, setActivityData] = useState<any>({});
    const userActivityDeatiles = () => {
            const userId = candidateId
            trackPromise(
                ApiService.getCall("admin", `getCandidateActivity/${userId}/${userLocalData.getvalue("clientId")}`).then(
                    (result) => {
                        const userData = result.data
                        setActivityData(userData)
                        console.log(userData)
                    }
                )
            )
        }
        useEffect(() => {
            userActivityDeatiles();
        },[])



    // const formatDateTime = (date: any, time: any) => {
    //     const formattedDate = format(new Date(date), 'MM/dd/yyyy');
    //     return `${formattedDate} ${time}`;
    // };

    const [selectedTemplate, setSelectedTemplate] = useState({
        id: '',
        name: ''
    });

    const [groupedMessagesByDate, setGroupedMessagesByDate] = useState<GroupedMessages>({});
    const bottomRef = useRef<null | HTMLDivElement>(null);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);


    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        // bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    }, [groupedMessagesByDate]);

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
            activitiesFormik.setFieldValue('msgDesc', field);
            setSmsBody(field);
        }
        smsBodyRef.current.focus();
    };

    const [loadTemplates, setLoadTemplates] = useState(false);


    return (
        <div className="Activities">

            {componentFrom === "candidate" && isCRMEnabled && !userLocalData.isChromeExtensionEnabled() ?
                (<Stack className="mainStack">

                    <Stack sx={{ width: '100%' }}>
                        <Box className="engagePref customCard p-0" sx={{ minHeight: '40px !important' }}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                    className="m-0"
                                    sx={{ minHeight: '39px !important' }}
                                >
                                    <h4 className="my-0">Engagement & Preferences</h4>
                                </AccordionSummary>
                                <Divider />
                                <AccordionDetails>
                                    <Grid container className="mb-3">
                                        <Grid size={6}>
                                            <Typography className="preferenceLabel">
                                                Engagement
                                            </Typography>
                                        </Grid>
                                        <Grid size={6}>
                                            <Typography className='preferenceLabel'>
                                            {activityData.inboundCount} Inbound - {activityData.outboundCount} Outbound
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container className="mb-3">
                                        <Grid size={6}>
                                            <Typography className='preferenceLabel'>
                                                Last 12 Months
                                            </Typography>
                                        </Grid>
                                        <Grid size={6}>
                                            <Stack sx={{ width: '70%' }} direction='row' spacing={1}>
                                                {/* <Box sx={{ width: '6px', height: '25px', backgroundColor: '#E6E6E6' }}></Box>
                                                <Box sx={{ width: '6px', height: '25px', backgroundColor: '#E6E6E6' }}></Box>
                                                <Box sx={{ width: '6px', height: '25px', backgroundColor: '#E6E6E6' }}></Box>
                                                <Box sx={{ width: '6px', height: '25px', backgroundColor: '#E6E6E6' }}></Box>
                                                <Box sx={{ width: '6px', height: '25px', backgroundColor: '#E6E6E6' }}></Box>
                                                <Box sx={{ width: '6px', height: '25px', backgroundColor: '#E6E6E6' }}></Box>
                                                <Box sx={{ width: '6px', height: '25px', backgroundColor: '#E6E6E6' }}></Box>
                                                <Box sx={{ width: '6px', height: '25px', backgroundColor: '#E6E6E6' }}></Box>
                                                <Box sx={{ width: '6px', height: '25px', backgroundImage: 'linear-gradient(#E6E6E6 70%,#43CD89 30%)' }}></Box>
                                                <Box sx={{ width: '6px', height: '25px', backgroundImage: 'linear-gradient(#E6E6E6 80%,#43CD89 20%)' }}></Box>
                                                <Box sx={{ width: '6px', height: '25px', backgroundColor: '#E6E6E6' }}></Box>
                                                <Box sx={{ width: '6px', height: '25px', backgroundColor: '#E6E6E6' }}></Box> */}
                                                {activityData?.candidateActivityData?.map((data:any,index:number) => (
                                                <Tooltip
                                                    key={index}
                                                    title={
                                                    <Typography sx={{ p: 1 }}>
                                                        <strong>Month:</strong> {data.month} <br />
                                                        <strong>Active Days:</strong> {data.activeDays}
                                                    </Typography>
                                                }
                                                arrow
                                                placement="top"
                                                >
                                                    <BorderLinearProgress
                                                        variant="determinate"
                                                        value={(data.activeDays / data.days) * 100}
                                                        sx={{ width: '27px', height: '6px', backgroundColor: '#E6E6E6' }}
                                                    />
                                                </Tooltip>
                                                ))}
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                    {
                                        communityStatus === "2" ? (
                                            <><Grid container className="mb-3">
                                                <Grid size={6}>
                                                    <Typography className='preferenceLabel'>
                                                        Availability Status
                                                    </Typography>
                                                </Grid>
                                                <Grid size={6}>
                                                    <Typography className='preferenceLabel'>
                                                        {getPreferenceValue(candidateData?.preferences && candidateData?.preferences?.length ? candidateData?.preferences[0]?.empAvailLookupID : "0")}
                                                    </Typography>
                                                </Grid>
                                            </Grid><Grid container className="mb-3">
                                                    <Grid size={6}>
                                                        <Typography className='preferenceLabel'>
                                                            Current Employment Status
                                                        </Typography>
                                                    </Grid>
                                                    <Grid size={6}>
                                                        <Typography className='preferenceLabel'>
                                                            {getPreferenceValue(candidateData?.preferences && candidateData?.preferences?.length && candidateData?.preferences[0]?.empStatusLookupID?.length ? candidateData?.preferences[0]?.empStatusLookupID : "")}
                                                        </Typography>
                                                    </Grid>
                                                </Grid><Grid container className="mb-3">
                                                    <Grid size={6}>
                                                        <Typography className='preferenceLabel'>
                                                            Employment Preference
                                                        </Typography>
                                                    </Grid>
                                                    <Grid size={6}>
                                                        <Typography className='preferenceLabel'>
                                                            {getPreferenceValue(candidateData?.preferences && candidateData?.preferences?.length && candidateData?.preferences[0]?.empPrefLookupID?.length ? candidateData?.preferences[0]?.empPrefLookupID : "")}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid container className="mb-3">
                                                    <Grid size={6}>
                                                        <Typography className='preferenceLabel'>
                                                            Work Location Preference
                                                        </Typography>
                                                    </Grid>
                                                    <Grid size={6}>
                                                        <Typography className='preferenceLabel'>
                                                            {getPreferenceValue(candidateData?.preferences && candidateData?.preferences?.length && candidateData?.preferences[0]?.empFlexLookupID?.length ? candidateData?.preferences[0]?.empFlexLookupID : "")}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid container className="mb-3">
                                                    <Grid size={6}>
                                                        <Typography className='preferenceLabel'>
                                                            Working Hours Preference
                                                        </Typography>
                                                    </Grid>
                                                    <Grid size={6}>
                                                        <Typography className='preferenceLabel'>
                                                            {getPreferenceValue(candidateData?.preferences && candidateData?.preferences?.length && candidateData?.preferences[0]?.prefferdworkinghours?.length ? candidateData?.preferences[0]?.prefferdworkinghours : "")}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid container className="mb-3">
                                                    <Grid size={6}>
                                                        <Typography className='preferenceLabel'>
                                                            Compensation Preference
                                                        </Typography>
                                                    </Grid>
                                                    <Grid size={6}>
                                                        <Typography className='preferenceLabel'>
                                                            {(candidateData?.preferences && candidateData?.preferences?.length) ? Number(candidateData?.preferences[0].empYearCompensation) ? `$${candidateData?.preferences[0].empYearCompensation} Per Year ` : '' : ''}
                                                            {(candidateData?.preferences && candidateData?.preferences?.length) ? Number(candidateData?.preferences[0].empHourCompensation) ? `- $${candidateData?.preferences[0].empHourCompensation} Per Hour` : '' : ''}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid container className="mb-3">
                                                    <Grid size={6}>
                                                        <Typography className='preferenceLabel'>
                                                            Legally authorized
                                                        </Typography>
                                                    </Grid>
                                                    <Grid size={6}>
                                                        <Typography className='preferenceLabel'>
                                                            {(candidateData?.preferences && candidateData?.preferences?.length) ? candidateData?.preferences[0].legalStatus === 1 ? 'Yes' : 'No' : ''}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid container className="mb-3">
                                                    <Grid size={6}>
                                                        <Typography className='preferenceLabel'>
                                                            Visa sponsorship
                                                        </Typography>
                                                    </Grid>
                                                    <Grid size={6}>
                                                        <Typography className='preferenceLabel'>
                                                            {(candidateData?.preferences && candidateData?.preferences?.length) ? candidateData?.preferences[0].visaSponsorStatus === 1 ? "Yes" : "No" : ""}
                                                        </Typography>
                                                    </Grid>
                                                </Grid></>
                                        ) : (
                                            <center><Typography className='preferenceLabelMember'><b>Not a Community Member</b></Typography></center>
                                        )}
                                </AccordionDetails>
                            </Accordion>

                        </Box>
                    </Stack>
                </Stack>
                ) : null}

            {componentFrom === "candidate" && isCRMEnabled && !userLocalData.isChromeExtensionEnabled() ?
                <>
                    <Stack className={`mainStack ${candidatePoolView ? 'd-none' : ''}`}>

                        <Stack sx={{ width: '100%' }}>
                            <Box className="engagePref customCard p-0" sx={{ minHeight: '40px !important' }}>
                                <Accordion onChange={(e: SyntheticEvent, expanded: boolean) => {
                                    if (expanded) {
                                        loadAIMatchJobs(false);
                                    }
                                }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                        className="m-0"
                                        sx={{ minHeight: '39px !important' }}
                                    >
                                        <h4 className="my-0">
                                            Matching Jobs
                                            {/* {
                                        aiMatchJobs.length ?
                                            <Chip label={aiMatchJobs.length > 6 ? 6 : aiMatchJobs.length} size="small" color="primary" className="ml-3" />
                                            :
                                            null
                                    } */}
                                        </h4>
                                    </AccordionSummary>
                                    <Divider />
                                    <AccordionDetails>
                                        {
                                            aiJobsLoaded ?
                                                <>
                                                    {
                                                        aiMatchJobs.map((i) => {
                                                            return <Grid
                                                                container
                                                                direction="row"
                                                                justifyContent="space-between"
                                                                alignItems="center"
                                                                className="mb-2 matchJob"
                                                            >
                                                                <Grid size={8} >
                                                                    {/* sx={{ width: 'calc(100% - 90px)' }}> */}
                                                                    <Tooltip title={i.jobTitle}>
                                                                        <p className={`aiMatchLabel fw-6 ${(i.jobId) ? 'hightLightTd' : ''}`}
                                                                            onClick={() => { if (i.jobId) { openJobView(i.jobId) } }}
                                                                        >
                                                                            {i.jobTitle.length > 30 ? i.jobTitle.trim().substring(0, 30) + "..." : i.jobTitle.trim()}

                                                                            {/* {i.jobTitle} */}
                                                                        </p>
                                                                    </Tooltip>
                                                                    {
                                                                        i.score ?
                                                                            <Typography className="c-grey fs-11 fw-6">{i.score}% matched</Typography>
                                                                            :
                                                                            null
                                                                    }
                                                                </Grid>
                                                                <Grid size={3} >
                                                                    {
                                                                        i.statusId ?
                                                                            <Chip label={i.statusName} variant="outlined" color="success" size="small" />
                                                                            :
                                                                            <Button
                                                                                type="button"
                                                                                startIcon={<PlaylistAddCheckOutlinedIcon />}
                                                                                disableRipple
                                                                                className='fs-11 fw-6 tt-capital '
                                                                                sx={{ width: 85 }}
                                                                                onClick={() => shortlistForm(i.jobId, i.jobTitle)}
                                                                            >Match</Button>

                                                                    }
                                                                </Grid>
                                                                {/* <Box sx={{ position: "relative", display: "inline-flex" }}>
                                                    <CircularProgress
                                                        variant="determinate"
                                                        value={Math.round(Number(i.score))}
                                                    />
                                                    <Box
                                                        sx={{
                                                            top: 0,
                                                            left: 0,
                                                            bottom: 0,
                                                            right: 0,
                                                            position: "absolute",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="caption"
                                                            component="div"
                                                            color="text.secondary"
                                                        >{`${Math.round(Number(i.score))}%`}</Typography>
                                                    </Box>
                                                </Box> */}
                                                            </Grid>
                                                        })
                                                    }
                                                    {
                                                        aiMatchJobs.length ?
                                                            <></>
                                                            :
                                                            <center><Typography className='preferenceLabelMember'><b>No Matching Jobs</b></Typography></center>
                                                    }
                                                </>
                                                :
                                                null
                                        }


                                    </AccordionDetails>
                                </Accordion>

                            </Box>
                        </Stack>
                    </Stack>

                    <Stack className={`mainStack ${candidatePoolView ? 'd-none' : ''}`}>

                        <Stack sx={{ width: '100%' }}>
                            <Box className="engagePref customCard p-0" sx={{ minHeight: '40px !important' }}>
                                <Accordion onChange={(e: SyntheticEvent, expanded: boolean) => {
                                    if (expanded) {
                                        loadInvitations(false);
                                    }
                                }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                        className="m-0"
                                        sx={{ minHeight: '39px !important' }}
                                    >
                                        <h4 className="my-0">
                                            Invitations
                                            {
                                                invitationsData?.length > 0 ?
                                                    <Chip label={invitationsData?.length} size="small" color="primary" className="ml-3" />
                                                    :
                                                    null
                                            }
                                        </h4>
                                    </AccordionSummary>

                                    <AccordionDetails>


                                        {
                                            invitationsData?.map((invite) => {
                                                return <Grid
                                                    container
                                                    direction="row"
                                                    justifyContent="space-between"
                                                    alignItems="center"
                                                    className="mb-2 matchJob"
                                                    key={invite.invitetype + invite.jobtitle + invite.invite_statusname}
                                                >
                                                    <Grid size={6} justifyContent="center">
                                                        <Typography className={`aiMatchLabel fw-6 ${(invite.invitetype) ? 'hightLightTd' : ''}`} >
                                                            {invite.invitetype}
                                                        </Typography>

                                                        {
                                                            invite.jobtitle ?
                                                                <Typography className="c-grey fs-11 fw-6">{invite.jobtitle}  -
                                                                    {
                                                                        invite.invitedate ?
                                                                            DateTime.fromFormat(invite.invitedate.substring(0, 19), 'yyyy-MM-dd hh:mm:ss').toFormat('MM/dd/yyyy')
                                                                            :
                                                                            ""
                                                                    }
                                                                </Typography>
                                                                :
                                                                null
                                                        }


                                                    </Grid>

                                                    <Typography
                                                        className='tt-capital'
                                                        sx={{
                                                            width: 85,
                                                            color: getStatusColor(invite.invite_statusname),
                                                            fontSize: '0.8rem',
                                                            fontWeight: 'bold'
                                                        }}
                                                    >{invite.invite_statusname}</Typography>

                                                    <Grid size={12}>
                                                        <Divider sx={{ my: 1 }} />
                                                    </Grid>
                                                    <div>
                                                        {
                                                            invite.Screening?.QAs && invite.Screening.QAs.map((item) => (
                                                                <div className="timeline_item" key={item.quesId}>
                                                                    {/* <TimelineSeparator> */}
                                                                    {/* <TimelineDot /> */}
                                                                    {/* {index < invite.Screening.QAs.length - 1 && <TimelineConnector />} */}
                                                                    {/* </TimelineSeparator> */}
                                                                    <div className="timeline_count">
                                                                        <Typography className={`aiMatchLabel fw-6 ${(item.question) ? 'hightLightTd' : ''}`}>{item?.question}</Typography>
                                                                        <Typography className="c-grey fs-11 fw-6"> {item.answer}</Typography>
                                                                        {/* <Typography className="c-grey fs-11 fw-6"> {formatDateTime(item?.date, item?.time)}</Typography> */}
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </Grid>
                                            })
                                        }

                                    </AccordionDetails>
                                </Accordion>

                            </Box>
                        </Stack>
                    </Stack>
                </>
                : null}

            <Stack className={`mainStack ${candidatePoolView ? 'd-none' : ''}`} >

                <Stack sx={{ width: '100%' }} >
                    <Box className="customCard" sx={{ padding: '0 !important' }}>
                        {/* <Box className="mainHeadBox">
                            {((componentFrom === "company") || (componentFrom === "candidate")) ? <Typography
                                className="Activities-Style"
                            >
                                {(activityType === "Note") && "Notes"}
                                {(activityType === "SMS") && "Call"}
                                {(activityType === "Task") && "Tasks"}
                                {(activityType === "Email") && "Emails"}
                            </Typography>
                                : <Typography
                                    className="Activities-Style"
                                >
                                    Activities
                                </Typography>
                            }

                            <Button
                                disableRipple
                                className="hide-Activities-Style d-none"
                                onClick={handleHideActivities}
                            >
                                Hide {(componentFrom === "company") ? " Notes" : " Activities"}
                            </Button>
                        </Box> */}

                        <Stack >
                            <Box sx={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <FormControl sx={{ width: '100%' }}>
                                    <RadioGroup
                                        row
                                        value={activityType}
                                        onChange={handleActivity}
                                        className="radiogroup"
                                    >

                                        {
                                            (note && componentFrom !== "company") && <FormControlLabel
                                                value='Note'
                                                control={
                                                    <Radio
                                                        disableRipple
                                                        color="default"
                                                        checkedIcon={<RadioBpCheckedIcon />}
                                                        icon={<RadioBpIcon />}
                                                    />
                                                }
                                                label="Note"
                                            />
                                        }
                                        {/* && <Tooltip title={isShowEmail ? "" : "Email not found"}> */}
                                        {email &&
                                            < FormControlLabel
                                                value='Email'
                                                control={
                                                    <Radio
                                                        disableRipple
                                                        color="default"
                                                        checkedIcon={<RadioBpCheckedIcon />}
                                                        icon={<RadioBpIcon />}
                                                        disabled={!isShowEmail}
                                                    />
                                                }
                                                label="Email"
                                            />
                                        }
                                        {/* </Tooltip> */}

                                        {call && !userLocalData.isChromeExtensionEnabled() && <Tooltip
                                            title={isShowPhone ? "" : "Phone number not found"}>
                                            <FormControlLabel
                                                value='SMS'
                                                control={
                                                    <Radio
                                                        disableRipple
                                                        color="default"
                                                        checkedIcon={<RadioBpCheckedIcon />}
                                                        icon={<RadioBpIcon />}
                                                        disabled={!isShowPhone}
                                                    />
                                                }
                                                label="SMS"
                                            // sx={{ pl: '0%' }}
                                            />
                                        </Tooltip>

                                        }

                                        {/* {task && <FormControlLabel
                                            value='Task'
                                            control={
                                                <Radio
                                                    disableRipple
                                                    color="default"
                                                    checkedIcon={<RadioBpCheckedIcon />}
                                                    icon={<RadioBpIcon />}
                                                />
                                            }
                                            label="Task"
                                        />
                                        } */}



                                        {reqCall && <FormControlLabel
                                            value='ReqCall'
                                            control={
                                                <Radio
                                                    disableRipple
                                                    color="default"
                                                    checkedIcon={<RadioBpCheckedIcon />}
                                                    icon={<RadioBpIcon />}
                                                />
                                            }
                                            label="Req Call"
                                            className="d-none"
                                        />
                                        }

                                        {meeting && <FormControlLabel
                                            value='Meeting'
                                            control={
                                                <Radio
                                                    disableRipple
                                                    color="default"
                                                    checkedIcon={<RadioBpCheckedIcon />}
                                                    icon={<RadioBpIcon />}
                                                />
                                            }
                                            label="Meeting"
                                            className="d-none"
                                        />
                                        }

                                        {action && <FormControlLabel
                                            value='Action'
                                            control={
                                                <Radio
                                                    disableRipple
                                                    color="default"
                                                    checkedIcon={<RadioBpCheckedIcon />}
                                                    icon={<RadioBpIcon />}
                                                />
                                            }
                                            label="Action"
                                        />
                                        }



                                    </RadioGroup>
                                </FormControl>
                            </Box>
                            {
                                isActivitiesAddSettingEnabled ?
                                    <Box className="form-wrap">
                                        <Box className="radio-Box">
                                            {((activityType === "Call") || (activityType === "Meeting") || (activityType === "ReqCall") || (activityType === "Action")) && <MUIAutoComplete
                                                id='hiringManager'
                                                handleChange={(id: any, name: string) => {
                                                    activitiesFormik.setFieldValue('hiringManagerId', id, true);
                                                    activitiesFormik.setFieldValue('hiringManager', name, true);
                                                }}
                                                valuePassed={(activitiesFormik.values.hiringManagerId) ? { label: activitiesFormik.values.hiringManager, id: activitiesFormik.values.hiringManagerId } : {}}
                                                isMultiple={false}
                                                width="100%"
                                                type='contactName'
                                                placeholder={
                                                    <span>
                                                        {(activityType === "ReqCall") ? 'Hiring Manager' : 'Contact'}
                                                    </span>
                                                }
                                                className="mb-2"

                                            />
                                                // <TextField
                                                //     color="error"
                                                //     className="typeNote"
                                                //     placeholder="Contact Name"
                                                //     value={activitiesFormik.values.contName}
                                                //     onChange={activitiesFormik.handleChange}
                                                //     sx={{ marginBottom: '12px' }}
                                                //     size="small"
                                                //     name="contName"
                                                // />
                                            }

                                            {/* {(activityType === "ReqCall") && 
                                                <TextField
                                                    color="error"
                                                    className="typeNote"
                                                    placeholder="Hiring Manager"
                                                    value={activitiesFormik.values.hiringManager}
                                                    onChange={activitiesFormik.handleChange}
                                                    sx={{ marginBottom: '12px' }}
                                                    size="small"
                                                    name="hiringManager"
                                                />
                                            } */}

                                            {(activityType === "ReqCall") && <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={activitiesFormik.values.callType}
                                                displayEmpty
                                                onChange={
                                                    (e) => {
                                                        activitiesFormik.handleChange(e);
                                                        if (e.target.value === "One on One") {
                                                            activitiesFormik.setFieldValue('logAMeet', true);
                                                        } else if (e.target.value === "Multiple Vendors") {
                                                            activitiesFormik.setFieldValue('logAMeet', false);
                                                        }
                                                    }
                                                }
                                                sx={{ mb: '12px' }}
                                                size="small"
                                                className="typeNote"
                                                name="callType"
                                            >
                                                <MenuItem value="">Select Call Type</MenuItem>
                                                <MenuItem value="One on One">One on One</MenuItem>
                                                <MenuItem value="Multiple Vendors">Multiple Vendors</MenuItem>
                                            </Select>
                                            }

                                            {(activityType === "Call") &&
                                                <Select
                                                    labelId="Call Outcome"
                                                    id="Call-Outcome-Select"
                                                    value={activitiesFormik.values.outcome}
                                                    displayEmpty
                                                    onChange={activitiesFormik.handleChange}
                                                    sx={{ marginBottom: '12px' }}
                                                    size="small"
                                                    className="typeNote"
                                                    // placeholder="Call Outcome"
                                                    name="outcome"
                                                >
                                                    <MenuItem value="None">None</MenuItem>
                                                    <MenuItem value="No Answer">No Answer</MenuItem>
                                                    <MenuItem value="Busy">Busy</MenuItem>
                                                    <MenuItem value="Wrong Number">Wrong Number</MenuItem>
                                                    <MenuItem value="Left live message">Left live message</MenuItem>
                                                    <MenuItem value="Left voicemail">Left voicemail</MenuItem>
                                                    <MenuItem value="Connected">Connected</MenuItem>
                                                </Select>
                                            }
                                            {/* 
                                            */}

                                            {((activityType === "Call") || (activityType === "ReqCall") || (activityType === "Meeting") || (activityType === "Action")) &&
                                                <Stack
                                                    className="dateTime-stack"
                                                    direction='row'
                                                    spacing={1}
                                                >

                                                    <LocalizationProvider dateAdapter={AdapterLuxon}>
                                                        <DatePicker
                                                            label="Select Date"
                                                            slotProps={{ textField: { size: 'small' } }}
                                                            value={
                                                                (activitiesFormik.values.date) ?
                                                                    activitiesFormik.values.date
                                                                    :
                                                                    null
                                                            }
                                                            onChange={
                                                                (newValue) => {
                                                                    activitiesFormik.setFieldValue('date', newValue);
                                                                }
                                                            }
                                                            sx={{
                                                                width: '300px'
                                                            }}
                                                        />
                                                    </LocalizationProvider>

                                                    <Select
                                                        labelId="time"
                                                        id="time"
                                                        value={activitiesFormik.values.time}
                                                        displayEmpty
                                                        onChange={activitiesFormik.handleChange}
                                                        sx={{ marginBottom: '12px' }}
                                                        size="small"
                                                        className="typeNote"
                                                        name="time"
                                                    >
                                                        <MenuItem value="">None</MenuItem>
                                                        {
                                                            masterTimeList.map((item: any) => {
                                                                return <MenuItem value={item.id} key={item.id}>{item.label}</MenuItem>
                                                            })
                                                        }

                                                        {/* <MenuItem value="12:30 AM">12:30 AM</MenuItem> */}
                                                    </Select>
                                                </Stack>
                                            }

                                            {(activityType === "ReqCall") &&
                                                // <MUIAutoComplete
                                                //     id='associatedJob'
                                                //     handleChange={(id: any, name: string) => {
                                                //         activitiesFormik.setFieldValue('associatedJob', id);
                                                //         // saveDataForm("", id);
                                                //     }}
                                                //     valuePassed={(activitiesFormik.values.associatedJob) ? { label: activitiesFormik.values.associatedJob, id: activitiesFormik.values.associatedJob } : {}}
                                                //     isMultiple={false}
                                                //     textToShow="Select Job"
                                                //     width="100%"
                                                //     type='associatedJob'
                                                //     companyId={companyId}
                                                //     placeholder="Associated Job"
                                                // />
                                                <MUIAutoComplete
                                                    id='associatedJob'
                                                    handleChange={(id: any, name: string) => {
                                                        activitiesFormik.setFieldValue('associatedJob', id);
                                                        activitiesFormik.setFieldValue('associatedJobTitle', name);
                                                    }}
                                                    valuePassed={(activitiesFormik.values.associatedJob) ? { label: activitiesFormik.values.associatedJobTitle, id: activitiesFormik.values.associatedJob } : {}}
                                                    isMultiple={false}
                                                    textToShow="Select Email"
                                                    width="100%"
                                                    type='assignJobToCandidate'
                                                    placeholder="Enter Job Title"

                                                />
                                            }

                                            {(activityType === "Meeting" || activityType === "Note" || activityType === "ReqCall") && <TextField
                                                color="error"
                                                className="typeNote mt-3"
                                                multiline
                                                rows={4}
                                                placeholder={(activityType === "Meeting") ? "Describe the meeting" : (activityType === "Note") ? "Type a note..." : ""}
                                                value={activitiesFormik.values.desc}
                                                onChange={activitiesFormik.handleChange}
                                                sx={{ marginBottom: '12px' }}
                                                name="desc" />

                                            }
                                            {(activityType === "SMS") && <>
                                                <Box className="smsList" ref={messagesEndRef}>
                                                    {/* <Typography className="text-center">
                                                    <IconButton>
                                                        <MessageRoundedIcon />
                                                    </IconButton>
                                                    This is the beginning of your conversation
                                                </Typography> */}
                                                    <div>

                                                        {Object.entries(groupedMessagesByDate).map(([date, messages]) => (
                                                            <div key={date}>
                                                                <div className="time">{date}</div>
                                                                {messages.map((sms: any) => (
                                                                    (sms.type === 'IN' || sms.type === 'OUT') &&
                                                                    <Message key={sms.smsID} type={sms.type} body={sms.body} time={sms.date} name={sms.type === 'IN' ? sms.userName : ''} />
                                                                ))}
                                                                <div ref={bottomRef} />

                                                            </div>
                                                        ))}
                                                    </div>

                                                </Box>
                                                {/* <SmsTemplates insertSMSTemp={insertSMSField2} loadTemplates={loadTemplates}  setSmsBody={setSmsBody} /> */}
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
                                                    // color="error"
                                                    className="typeNote"
                                                    multiline
                                                    rows={3}
                                                    placeholder="Type Message"
                                                    // value={activitiesFormik.values.desc}
                                                    // onChange={activitiesFormik.handleChange}
                                                    sx={{ marginBottom: '12px', py: 2 }}
                                                    value={smsBody}
                                                    onChange={ta1HandleChange}
                                                    inputRef={smsBodyRef}
                                                    name="desc" />
                                                <div style={{ width: "100%", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                                                    {/* <SmsTemplates insertSMSTemp={insertSMSField2} loadTemplates={loadTemplates} /> */}
                                                    <PlaceHolders onInsertField={insertSMSField} />
                                                    <SaveSMSTemplate message={smsBody} templateAdded={() => setLoadTemplates((prev) => !prev)} />
                                                    <span className="ml-2 fs-13">{0 + smsBody.length} of {maxCharacterCount} characters</span>
                                                    <Button
                                                        // disableRipple
                                                        color="primary"
                                                        variant="contained"
                                                        onClick={() => {
                                                            saveCandidateSms();
                                                        }}
                                                    >
                                                        Send SMS
                                                    </Button>

                                                </div>
                                            </>
                                            }



                                            {/* {(activityType === "Task") && <Tasks
                                                contName={contactName || ''} contactId={contactId} />} */}

                                            <div className="mt-4"></div>
                                            {((activityType === "Call") || (activityType === "ReqCall") || (activityType === "Meeting") || (activityType === "Action")) &&
                                                <MUIAutoComplete
                                                    id='emails'
                                                    handleChange={(id: any, _name: string) => {
                                                        activitiesFormik.setFieldValue('emails', id);
                                                        // saveDataForm("", id);
                                                    }}
                                                    valuePassed={(activitiesFormik.values.emails) ? { label: activitiesFormik.values.emails, id: activitiesFormik.values.emails } : {}}
                                                    isMultiple={true}
                                                    textToShow="Select Email"
                                                    width="100%"
                                                    type='email'
                                                    placeholder="Send Email to"
                                                />
                                            }

                                            <div className="mt-3"></div>
                                            {(activityType === "ReqCall") &&
                                                <div style={{ width: '100%' }}>
                                                    <FormControlLabel
                                                        control={
                                                            <BpCheckboxContainer>
                                                                <Checkbox
                                                                    className="bp-checkbox"
                                                                    disableRipple
                                                                    onChange={activitiesFormik.handleChange}
                                                                    checked={activitiesFormik.values.logAMeet}
                                                                    name="logAMeet"
                                                                    checkedIcon={<BpCheckedIcon className="bp-icon" style={{ borderColor: activitiesFormik.values.logAMeet ? 'var(--c-primary-color)' : '' }} />}
                                                                    icon={<BpIcon className="bp-icon" />}
                                                                    disabled={(activitiesFormik.values.callType === "Multiple Vendors") ? true : false}
                                                                    size="small"
                                                                />
                                                            </BpCheckboxContainer>
                                                        }
                                                        label="Log a Meeting"
                                                        sx={{ ml: 0 }}
                                                    />
                                                </div>
                                            }

                                            {(activityType === "Email") && <Box className="w-100">




                                                {/* <FormControl fullWidth className='form-wrap  mb-3'>
                                                    <Select
                                                        id="template"
                                                        name="template"
                                                        value={emailTemplateType}
                                                        onChange={handleTemplateChange}
                                                        variant="outlined"
                                                        size='small'
                                                        displayEmpty
                                                    >
                                                        <MenuItem value="">Select a template...</MenuItem>
                                                        {emailTempList.map(
                                                            (template: any, i: number) => {
                                                                return <MenuItem value={template.id} key={template.id}>{template.label}</MenuItem>
                                                            }
                                                        )}
                                                    </Select>
                                                </FormControl> */}
                                                {
                                                    !userLocalData.isChromeExtensionEnabled() &&
                                                    <FormControl fullWidth className='form-wrap mb-3'>
                                                        <div>
                                                            {activitiesFormik.values.activities.map((temp, i) => (
                                                                <Grid
                                                                    container
                                                                    direction="row"
                                                                    justifyContent="flex-start"
                                                                    alignItems="center"
                                                                    key={i}
                                                                >
                                                                    <>
                                                                        <Grid size={6}>
                                                                            <TextField
                                                                                size="small"
                                                                                id={`templateType${i}`}
                                                                                select
                                                                                value={temp.templateType}
                                                                                onChange={e =>activitiesFormik.handleChange(e)}
                                                                                name={`activities[${i}].templateType`}
                                                                                fullWidth
                                                                                className="mailInputs mb-2"
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
                                                                        <Grid size={6}>
                                                                            <TextField
                                                                                size="small"
                                                                                id={`template${i}`}
                                                                                select
                                                                                value={temp.template}
                                                                                onChange={e =>activitiesFormik.handleChange(e)}
                                                                                name={`activities[${i}].template`}
                                                                                fullWidth
                                                                                className="mailInputs mb-2"
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
                                                                    </>

                                                                    {/* {activitiesFormik.values.templateType === "allTemplates" &&
                                                                 <MUIAutoComplete
                                                                     id='AllEmailTemplates'
                                                                     handleChange={(id: string, name: string, type: string) => {
                                                                         if (id) {
                                                                             getTemplate(id, (type === "EmailBuilderTemplate") ? 'emailBuilder' : 'emailTemplates');
                                                                             activitiesFormik.setFieldValue('templateName', name);
                                                                             activitiesFormik.setFieldValue('templateType', 'emailBuilder');
                                                                         } else {
                                                                             activitiesFormik.setFieldValue('subject', "");
                                                                             activitiesFormik.setFieldValue('emailBody', "");
                                                                         }
                                                                     }}
                                                                     valuePassed={''}
                                                                     isMultiple={false}
                                                                     textToShow="Search All Email Templates"
                                                                     placeholder=""
                                                                     width="100%"
                                                                     type='AllEmailTemplates'
                                                                 />
                                                             } */}
                                                                
                                                                        <Grid size={ 12}>
                                                                            {temp.template === "emailBuilder" &&
                                                                                <MUIAutoComplete
                                                                                    id='EmailBuilderTemplates'
                                                                                    handleChange={(id: string, name: string) => {
                                                                                        if (id) {
                                                                                            getTemplate(id, 'emailBuilder');
                                                                                            activitiesFormik.setFieldValue('templateName', name);
                                                                                            activitiesFormik.setFieldValue('templateType', 'emailBuilder');
                                                                                        } else {
                                                                                            activitiesFormik.setFieldValue('subject', "");
                                                                                            activitiesFormik.setFieldValue('emailBody', "");
                                                                                        }
                                                                                    }}
                                                                                    valuePassed={''}
                                                                                    isMultiple={false}
                                                                                    textToShow="Search HTML Template"
                                                                                    placeholder=""
                                                                                    width="100%"
                                                                                    type='EmailBuilderTemplate'
                                                                                />
                                                                            }
                                                                            {temp.template === "emailTemplates" &&
                                                                                <MUIAutoComplete
                                                                                    id='EmailTemplates'
                                                                                    handleChange={(id: string, name: string) => {
                                                                                        if (id) {
                                                                                            getTemplate(id, 'emailTemplates');
                                                                                            activitiesFormik.setFieldValue('templateName', name);
                                                                                            activitiesFormik.setFieldValue('templateType', 'emailTemplates');
                                                                                            setSelectedTemplate({
                                                                                                id: id,
                                                                                                name: name
                                                                                            })
                                                                                        } else {
                                                                                            activitiesFormik.setFieldValue('subject', "");
                                                                                            activitiesFormik.setFieldValue('emailBody', "");
                                                                                        }
                                                                                    }}
                                                                                    valuePassed={''}
                                                                                    // valuePassed={selectedTemplate.id
                                                                                    //     ? {
                                                                                    //         label: selectedTemplate.name,
                                                                                    //         id: selectedTemplate.id,
                                                                                    //     }
                                                                                    //     : {}
                                                                                    // }
                                                                                    
                                                                                    isMultiple={false}
                                                                                    textToShow="Search Text Template"
                                                                                    placeholder=""
                                                                                    width="100%"
                                                                                    type='EmailTemplate'
                                                                                    onlyRecruiter={temp.templateType === 'my' ? true : false}
                                                                                />
                                                                            }
                                                                        </Grid>
                                                            
                                                                </Grid>

                                                            ))}
                                                        </div>
                                                    </FormControl>
                                                }

                                                <FormControl fullWidth className='form-wrap mb-3'>
                                                    {/* {activitiesFormik.values.templateType === "allTemplates" &&
                                                        <MUIAutoComplete
                                                            id='AllEmailTemplates'
                                                            handleChange={(id: string, name: string, type: string) => {
                                                                if (id) {
                                                                    getTemplate(id, (type === "EmailBuilderTemplate") ? 'emailBuilder' : 'emailTemplates');
                                                                    activitiesFormik.setFieldValue('templateName', name);
                                                                    activitiesFormik.setFieldValue('templateType', 'emailBuilder');
                                                                } else {
                                                                    activitiesFormik.setFieldValue('subject', "");
                                                                    activitiesFormik.setFieldValue('emailBody', "");
                                                                }
                                                            }}
                                                            valuePassed={''}
                                                            isMultiple={false}
                                                            textToShow="Search All Email Templates"
                                                            placeholder=""
                                                            width="100%"
                                                            type='AllEmailTemplates'
                                                        />
                                                    } */}
                                                    {/* { === "emailBuilder" &&
                                                        <MUIAutoComplete
                                                            id='EmailBuilderTemplates'
                                                            handleChange={(id: string, name: string) => {
                                                                if (id) {
                                                                    getTemplate(id, 'emailBuilder');
                                                                    activitiesFormik.setFieldValue('templateName', name);
                                                                    activitiesFormik.setFieldValue('templateType', 'emailBuilder');
                                                                } else {
                                                                    activitiesFormik.setFieldValue('subject', "");
                                                                    activitiesFormik.setFieldValue('emailBody', "");
                                                                }
                                                            }}
                                                            valuePassed={''}
                                                            isMultiple={false}
                                                            textToShow="Search HTML Template"
                                                            placeholder=""
                                                            width="100%"
                                                            type='EmailBuilderTemplate'
                                                        />
                                                    }
                                                    {template. === "emailTemplates" &&
                                                        <MUIAutoComplete
                                                            id='EmailTemplates'
                                                            handleChange={(id: string, name: string) => {
                                                                if (id) {
                                                                    getTemplate(id, 'emailTemplates');
                                                                    activitiesFormik.setFieldValue('templateName', name);
                                                                    activitiesFormik.setFieldValue('templateType', 'emailTemplates');
                                                                    setSelectedTemplate({
                                                                        id: id,
                                                                        name: name
                                                                    })
                                                                } else {
                                                                    activitiesFormik.setFieldValue('subject', "");
                                                                    activitiesFormik.setFieldValue('emailBody', "");
                                                                }
                                                            }}
                                                            valuePassed={selectedTemplate.id
                                                                ? {
                                                                    label: selectedTemplate.name,
                                                                    id: selectedTemplate.id,
                                                                }
                                                                : {}
                                                            }
                                                            isMultiple={false}
                                                            textToShow="Search Text Template"
                                                            placeholder=""
                                                            width="100%"
                                                            type='EmailTemplate'
                                                            onlyRecruiter={temp.templateType === 'my' ? true : false}
                                                        />
                                                    } */}
                                                </FormControl>
                                                <div className={`form-wrap fromEmail w-100 ${isSendEmailSettingEnabled ? "" : "d-none"}`}>
                                                    <FormControl fullWidth className='form-wrap mb-3 fromEmail'>
                                                        <MUIAutoComplete
                                                            id='fromEmail'
                                                            handleChange={(id: any, name: string) => {
                                                                activitiesFormik.setFieldValue('fromEmail', id);
                                                                activitiesFormik.setFieldValue('fromName', name);
                                                                // saveDataForm("", id);
                                                            }}

                                                            valuePassed={(activitiesFormik.values.fromEmail) ? { label: activitiesFormik.values.fromName, id: activitiesFormik.values.fromEmail } : {}}
                                                            isMultiple={false}
                                                            textToShow="From"
                                                            width="100%"
                                                            type='email'
                                                            placeholder="From"
                                                        />
                                                    </FormControl>
                                                </div>

                                                {/* <FormControl fullWidth className='form-wrap mb-3'>
                                            <TextField
                                                id="toEmail"
                                                name="toEmail"
                                                value={activitiesFormik.values.toEmail}
                                                placeholder="To Email"
                                                variant="outlined"
                                                size='small'
                                            />
                                        </FormControl> */}

                                                <FormControl fullWidth className='form-wrap mb-3'>
                                                    <TextField
                                                        id="subject"
                                                        name="subject"
                                                        placeholder="Type a subject for your email"
                                                        variant="outlined"
                                                        size='small'
                                                        value={activitiesFormik.values.subject}
                                                        onChange={activitiesFormik.handleChange}
                                                    />
                                                </FormControl>

                                                <FormControl fullWidth className='form-wrap mb-5 pb-3'>
                                                    {
                                                        emailTemplateType === "emailBuilder" ?
                                                            <Box className="emailBuilder-body" component={"div"} dangerouslySetInnerHTML={{ __html: activitiesFormik.values.emailBody }} />
                                                            :
                                                            <Editor
                                                                toolbarId='emailBody-activity'
                                                                id='emailBody-activity'
                                                                handleChange={(eBody: any) => {
                                                                    activitiesFormik.setFieldValue("emailBody", eBody);
                                                                }}
                                                                editorHtml={activitiesFormik.values.emailBody}
                                                                mentions={true}
                                                                saveTemplate={true}

                                                                subject={activitiesFormik.values.subject}
                                                                placeholder={""}
                                                                enableSave={false}
                                                                openDialog={undefined} />
                                                    }
                                                </FormControl>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => handleSendEmail()}
                                                >
                                                    Send
                                                </Button>
                                            </Box>}

                                        </Box>

                                        <Stack direction='row' spacing={2} pl='20px' pr='20px' sx={{ marginBottom: '23px' }} mt={1}>
                                            {
                                                (activityType === "Note") ?

                                                    <Grid
                                                        container
                                                        direction="row"
                                                        justifyContent="flex-start"
                                                        alignItems="center"
                                                    >

                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={() => {
                                                                if (contactId) {
                                                                    saveContactNotes();
                                                                } else if (candidateId) {
                                                                    saveCandidateNotes();
                                                                }
                                                            }}
                                                        >
                                                            {selectedNotes.notesId ? "Update" : "Log"} Note
                                                        </Button>
                                                        {
                                                            selectedNotes.notesId ?
                                                                <Button
                                                                    variant="outlined"
                                                                    color="secondary"
                                                                    onClick={() => {
                                                                        setSelectedNotes({
                                                                            modifyDate: "",
                                                                            notes: "",
                                                                            notesId: "",
                                                                            recruiterName: ""
                                                                        });
                                                                        activitiesFormik.setFieldValue('desc', '');
                                                                    }}
                                                                    className="ml-2"
                                                                >
                                                                    Cancel
                                                                </Button>
                                                                :
                                                                null
                                                        }
                                                    </Grid>
                                                    :
                                                    null
                                            }


                                            {(activityType === "Call" ||
                                                activityType === "ReqCall" ||
                                                activityType === "Meeting") && <Button
                                                    // disableRipple
                                                    color="primary"
                                                    variant="contained"

                                                    onClick={() => {
                                                        // if (candidateId) {
                                                        //     saveCandidateNotes();
                                                        // } else if ((activityType === "Call") || (activityType === "ReqCall") || (activityType === "Meeting")) {
                                                        logActivity();
                                                        // }
                                                    }}
                                                >
                                                    Log
                                                    {(activityType === "Call") && " Call"}
                                                    {(activityType === "ReqCall") && " ReqCall"}
                                                    {(activityType === "Meeting") && " Meeting"}
                                                    {/* {(activityType === "Action") && " Action"} */}
                                                </Button>
                                            }

                                            {/* {activityType === "Note" && <FormControlLabel
                                        control={
                                        <BpCheckboxContainer>
                                            <Checkbox
                                            className="bp-checkbox"
                                            disableRipple
                                            onChange={handleChangePinNoteChecked}
                                            checked={pinNoteChecked}
                                            checkedIcon={<BpCheckedIcon className="bp-icon" style={{ borderColor: pinNoteChecked ? 'var(--c-primary-color)' : '' }} />}
                                            icon={<BpIcon className="bp-icon" />} />
                                        </BpCheckboxContainer>}
                                        label={
                                        <Typography component='label'
                                            className="pin-Note"
                                        >
                                            Pin note to top
                                        </Typography>
                                        }
                                    />
                                    } */}
                                        </Stack>

                                    </Box>
                                    :
                                    null
                            }

                        </Stack>
                    </Box>

                    {(activityType === "Note" || (activityType === "Call") || (activityType === "Task") || (activityType === "ReqCall") || (activityType === "Meeting") || (activityType === "Action") || (activityType === "Email")) && <Box className="customCard" sx={{ padding: '0 !important' }}>

                        <Stack id={activityType}>
                            {activityType === "Note" &&
                                <Stack sx={{ width: '100%' }}>

                                    <Stack >
                                        <Stack sx={{
                                            '&:hover': {
                                                backgroundColor: '#F7F7F7'
                                            }
                                        }}
                                        >
                                            <Box className="Activities-Style-2">
                                                <Typography>
                                                    Notes
                                                </Typography>
                                                {/* <Button
                                                        disableRipple
                                                        endIcon={<ArrowDropDownIcon />}
                                                        className="typeText"
                                                        >
                                                        Showing 1 Activity Type
                                                        </Button> */}

                                            </Box>
                                        </Stack>
                                        <Stack className={`pt-3 noteBox ${candidateNotesData.length ? '' : 'd-none'}`}>
                                            {
                                                candidateNotesData.map((note: {
                                                    notes: string;
                                                    modifyDate: string;
                                                    notesId: string;
                                                    recruiterName: string;
                                                    recruiterId: string;
                                                }, i: number) => (
                                                    <Stack key={i} className="note-block">
                                                        {/* {
                                                        "notes":"Testing",
                                                        "modifyDate":"2023-12-30 04:48:37.0",
                                                        "notesId":"1",
                                                        "recruiterName":"Aditya Kumar"
                                                    } */}
                                                        <Box className="boxText">
                                                            <Box sx={{ width: '100%' }}>

                                                                <Grid
                                                                    container
                                                                    direction="row"
                                                                    justifyContent="flex-start"
                                                                    alignItems="center"
                                                                    className="notesDiv"
                                                                >

                                                                    <Grid sx={{ width: 'calc(100% - 50px)' }}>

                                                                        <Typography component='p' className="boxText-text">
                                                                            {
                                                                                note.recruiterName && note.notes ?
                                                                                    <span>
                                                                                        <span className='noteRecrLabel'>{note.recruiterName}</span> added {note.notes}

                                                                                    </span>
                                                                                    :
                                                                                    note.recruiterName || note.notes
                                                                            }
                                                                        </Typography>
                                                                    </Grid>
                                                                    {
                                                                        (note.recruiterId === userLocalData.getvalue('recrId').toString()) ?
                                                                            <Grid className="notesAction">
                                                                                <Tooltip title="Edit">
                                                                                    <EditIcon
                                                                                        className="fs-16 cursor-pointer mr-2"
                                                                                        onClick={
                                                                                            () => {
                                                                                                if (activityType !== "Note") {
                                                                                                    setActivityType("Note");
                                                                                                }
                                                                                                activitiesFormik.setFieldValue('desc', note.notes);
                                                                                                setSelectedNotes(note);
                                                                                            }
                                                                                        }
                                                                                    />
                                                                                </Tooltip>
                                                                                <Tooltip title="Delete">
                                                                                    <span>
                                                                                        <DeleteOutlineOutlinedIcon
                                                                                            className={`fs-16 ${note.notesId === selectedNotes.notesId ? "deleteDisable" : "cursor-pointer"} `}
                                                                                            onClick={() => {
                                                                                                if (note.notesId !== selectedNotes.notesId) {
                                                                                                    confirmDialog('Are you sure you want to Delete?', () => {
                                                                                                        deleteNoteById(note.notesId);
                                                                                                    }, "warning");
                                                                                                }
                                                                                            }}
                                                                                        // disabled={note.notesId === selectedNotes.notesId}
                                                                                        />
                                                                                    </span>
                                                                                </Tooltip>
                                                                            </Grid>
                                                                            :
                                                                            null
                                                                    }
                                                                </Grid>
                                                            </Box>
                                                            <Box className="dateBox">
                                                                <Typography component='p' className="dateText">
                                                                    {note.modifyDate ? LuxonDateParser.ServerEDTToSystem(note.modifyDate.substring(0, 19), "yyyy-MM-dd hh:mm:ss", "MM/dd/yyyy hh:mm a") : null}
                                                                    {/* {note.date ? note.date.split(" ")[0] + " " + note.date.split(" ")[1] : null} */}
                                                                </Typography>
                                                            </Box>


                                                        </Box>
                                                    </Stack>
                                                ))
                                            }
                                        </Stack>
                                        <Stack className="pt-3">
                                            {companyNotes && companyNotes.map((note: any, i: number) => (
                                                <Stack key={i} className="note-block">
                                                    <Box className="boxText">
                                                        <Box sx={{ width: '100%' }}>
                                                            <Typography component='p' className="boxText-text">
                                                                {(note.notes) ? note.notes : ""}
                                                            </Typography>
                                                        </Box>
                                                        {/* <Box className="dateBox">
                                                            <Typography component='p' className="dateText">
                                                                {note.date ? note.date : null}
                                                            </Typography>
                                                        </Box> */}


                                                    </Box>
                                                </Stack>
                                            ))}
                                        </Stack>

                                        {userLocalData.checkIntegration(ID_ROLE_CONTACT_CAN_VIEW_TASKS_NOTES_ACTIVITY_LOGS_OF_ALL_USERS) ? <Stack className="pt-3">
                                            {contactNotesData.map((cnote: any, i: number) => (
                                                <Stack key={i} className="note-block">
                                                    <Box className="boxText">
                                                        <Box sx={{ width: '100%' }}>

                                                            <Grid
                                                                container
                                                                direction="row"
                                                                justifyContent="flex-start"
                                                                alignItems="center"
                                                                className="notesDiv"
                                                            >

                                                                <Grid sx={{ width: 'calc(100% - 50px)' }}>
                                                                    <Typography component='p' className="boxText-text">
                                                                        {
                                                                            cnote.recruiterName && cnote.notes ?
                                                                                <span>
                                                                                    <span className='noteRecrLabel'>{cnote.recruiterName}</span> added {cnote.notes}
                                                                                </span>
                                                                                :
                                                                                cnote.recruiterName || cnote.notes
                                                                        }
                                                                    </Typography>
                                                                </Grid>
                                                                {
                                                                    userLocalData.checkIntegration(ID_ROLE_CONTACT_CAN_EDIT_TASKS_NOTES_ACTIVITY_LOGS_OF_ALL_USERS) && cnote.recruiterId === userLocalData.getvalue('recrId').toString() ?
                                                                        <Grid className="notesAction">
                                                                            <Tooltip title="Edit">
                                                                                <EditIcon
                                                                                    className="fs-16 cursor-pointer mr-2"
                                                                                    onClick={
                                                                                        () => {
                                                                                            if (activityType !== "Note") {
                                                                                                setActivityType("Note");
                                                                                            }
                                                                                            activitiesFormik.setFieldValue('desc', cnote.notes);
                                                                                            setSelectedNotes(cnote);
                                                                                        }
                                                                                    }
                                                                                />
                                                                            </Tooltip>
                                                                            <Tooltip title="Delete">
                                                                                <span>
                                                                                    <DeleteOutlineOutlinedIcon
                                                                                        className={`fs-16 ${cnote.notesId === selectedNotes.notesId ? "deleteDisable" : "cursor-pointer"} `}
                                                                                        onClick={() => {
                                                                                            if (cnote.notesId !== selectedNotes.notesId) {
                                                                                                confirmDialog('Are you sure you want to Delete?', () => {
                                                                                                    deleteContactNoteById(cnote.notesId);
                                                                                                }, "warning");
                                                                                            }
                                                                                        }}
                                                                                    // disabled={note.notesId === selectedNotes.notesId}
                                                                                    />
                                                                                </span>
                                                                            </Tooltip>
                                                                        </Grid>
                                                                        :
                                                                        null
                                                                }
                                                            </Grid>
                                                        </Box>
                                                        <Box className="dateBox">
                                                            <Typography component='p' className="dateText">
                                                                {cnote.modifyDate ? LuxonDateParser.ServerEDTToSystem(cnote.modifyDate.substring(0, 19), "yyyy-MM-dd hh:mm:ss", "MM/dd/yyyy hh:mm a") : null}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Stack>
                                            ))}

                                        </Stack>
                                            :
                                            null
                                        }
                                        {/* <Box sx={{ textAlign: 'center', p: 1 }}>
                                                <Button
                                                    disableRipple
                                                    className="bottom-Window"
                                                >
                                                    Show in Window View
                                                </Button>
                                                </Box> */}
                                    </Stack>

                                </Stack>
                            }
                            {/* {activityType === "SMS" &&
                                <Stack sx={{ width: '100%' }}>

                                    <Stack >
                                        <Stack sx={{
                                            '&:hover': {
                                                backgroundColor: '#F7F7F7'
                                            }
                                        }}
                                        >
                                            <Box className="Activities-Style-2">
                                                <Typography>
                                                    SMS
                                                </Typography>
                                            </Box>
                                        </Stack>
                                        <Stack className="pt-3 noteBox">
                                            {
                                                candidateSmsData.map((smsLog: {
                                                    body: string;
                                                    date: string;
                                                    smsId: string;
                                                    recrName: string;
                                                    recruiterId: string;
                                                }, i: number) => (
                                                    <Stack key={i} className="note-block">
                                                        <Box className="boxText">
                                                            <Box sx={{ width: '100%' }}>

                                                                <Grid
                                                                    container
                                                                    direction="row"
                                                                    justifyContent="flex-start"
                                                                    alignItems="center"
                                                                    className="notesDiv"
                                                                >

                                                                    <Grid sx={{ width: 'calc(100% - 50px)' }}>

                                                                        <Typography component='p' className="boxText-text" style={{ whiteSpace: 'pre-line' }}>
                                                                            {
                                                                                smsLog.recrName && smsLog.body ?
                                                                                    <span>
                                                                                        <span className='noteRecrLabel'>{smsLog.recrName}</span> sent {smsLog.body.replace(/<br\s*\/?>/gi, '\n').replace(/<\/?p>/gi, ' ')}
                                                                                    </span>
                                                                                    :
                                                                                    smsLog.recrName || smsLog.body
                                                                            }
                                                                        </Typography>
                                                                    </Grid>

                                                                </Grid>
                                                            </Box>
                                                            <Box className="dateBox">
                                                                <Typography component='p' className="dateText">
                                                                    {smsLog.date ? LuxonDateParser.ServerEDTToSystem(smsLog.date.substring(0, 19), "yyyy-MM-dd hh:mm:ss", "MM/dd/yyyy hh:mm a") : null}
                                                                </Typography>
                                                            </Box>


                                                        </Box>
                                                    </Stack>
                                                ))
                                            }
                                        </Stack>



                                    </Stack>

                                </Stack>
                            } */}
                            {activityType === "Email" &&
                                <Stack sx={{ width: '100%' }}>


                                    {/* <Stack sx={{
                                            '&:hover': {
                                                backgroundColor: '#F7F7F7'
                                            }
                                        }}
                                        >
                                            <Box className="Activities-Style-2">
                                                <Typography>
                                                    Email
                                                </Typography>
                                                

                                            </Box>
                                        </Stack> */}
                                    <Stack className="pt-3 pl-4 noteBox">
                                        <EmailList candidateId={candidateId} contactId={contactId} refreshList={refreshEmailList} />
                                    </Stack>
                                </Stack>

                            }

                            {((activityType === "Call") || (activityType === "ReqCall") || (activityType === "Meeting")) && showActivities && (
                                <Stack sx={{ width: '100%' }}>
                                    <Stack>
                                        <Box className="Activities-Style-2">
                                            <Typography>Activities</Typography>
                                        </Box>
                                        <div className="pt-3 contactActivitiesDiv">
                                            {contactActivitiesData.map((note: any, i: number) => {

                                                return (
                                                    <Stack key={i} className="note-block hideActivities d-flex">
                                                        <Box className="boxText">
                                                            <Box sx={{ width: '100%' }} mb={0.5}>
                                                                <Typography component='p' className="boxText-text">
                                                                    <span className='noteRecrLabel'>{note.fullName}</span> logged
                                                                    {note.actType === 1 ? " a call" :
                                                                        note.actType === 2 ? " an email" :
                                                                            note.actType === 3 ? " a meeting" :
                                                                                note.actType === 6 ? " an activity" :
                                                                                    " a Req Call"}
                                                                </Typography>
                                                                <Typography component='p' className="boxText-text descriptionText">
                                                                    {note.descr || "No description available."}
                                                                </Typography>
                                                            </Box>
                                                            <Box className="dateBox">
                                                                <Typography component='p' className="dateText">
                                                                    {note.modiyDate ? LuxonDateParser.ServerEDTToSystem(note.modiyDate.substring(0, 19), "yyyy-MM-dd hh:mm:ss", "MM/dd/yyyy hh:mm a") : null}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    </Stack>
                                                );
                                            })}
                                        </div>
                                    </Stack>
                                </Stack>
                            )}


                            {/* {(activityType === "ReqCall") && showActivities &&
                                        <Stack sx={{ width: '100%' }}>

                                        <Stack>
                                            <Box className="Activities-Style-2">
                                            <Typography>
                                                Activities
                                            </Typography>

                                            </Box>

                                            <Stack className="note-block">
                                            <Box className="after-Act-Box">
                                                <Box className="mainDiv">
                                                <Box>
                                                    <Typography component='p' className="boxText-text">
                                                    Justin Kidd to <Box component='span' sx={{ color: 'var(--c-primary-color)', }}> Jose Ortiz </Box>
                                                    </Typography>
                                                </Box>
                                                <Box component='div' sx={{ borderRight: '1px solid #919191' }}></Box>
                                                <Box>
                                                    <Typography component='p' className="boxText-text1">
                                                    Step 4 of <Box component='span' sx={{ color: 'var(--c-primary-color)', }}>Justin CRNinja Drip</Box>
                                                    </Typography>
                                                </Box>
                                                </Box>
                                                <Typography component='p'
                                                className="boxText-text2"
                                                >
                                                Achieve 50% Less Attrition. At Ninja-Like Speed.
                                                </Typography>

                                                <Box>
                                                <Typography component='p'
                                                    className="boxText-text3"
                                                >
                                                    Hi Jose, Get the Right Agents, With the Right Skills,
                                                    Right Away, It's been about two weeks since we....
                                                </Typography>
                                                <Box className="boxText-box2">
                                                    <Typography component='p' className="boxText-text4">
                                                    Not Sent - Sendgrid Drop
                                                    </Typography>
                                                </Box>
                                                </Box>
                                            </Box>
                                            <Box className="dateBox">
                                                <Box>
                                                <Typography component='p' className="dateText">
                                                    Mar 30
                                                </Typography>
                                                </Box>

                                                <MoreHorizIcon sx={{
                                                color: '#474747',
                                                fontSize: '20px',
                                                }} />

                                            </Box>
                                            </Stack>

                                            <Stack className="note-block">
                                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
                                                <Box className="mainDiv">
                                                <Box>
                                                    <Typography component='p' className="boxText-text">
                                                    Justin Kidd to <Box component='span' sx={{ color: 'var(--c-primary-color)', }}> Jose Ortiz </Box>
                                                    </Typography>
                                                </Box>
                                                <Box component='div' sx={{ borderRight: '1px solid #919191' }}></Box>
                                                <Box>
                                                    <Typography component='p' className="boxText-text1">
                                                    Step 3 of <Box component='span' sx={{ color: 'var(--c-primary-color)', }}>Justin CRNinja Drip</Box>
                                                    </Typography>
                                                </Box>
                                                </Box>
                                                <Typography component='p'
                                                className="boxText-text2"
                                                >
                                                90 Days to Fill Your Contact Center Class? Try 14.
                                                </Typography>

                                                <Box>
                                                <Typography component='p'
                                                    className="boxText-text3"
                                                >
                                                    Hi Jose, Too Good to be True? Nope,Ninjas are Real.
                                                    Change Your hiring timelines forever with the...
                                                </Typography>
                                                <Stack
                                                    direction='row' alignItems='center' mt={1} mb={1}
                                                >
                                                    <Box className="mailBox-bg1">
                                                    <MailOutlineOutlinedIcon className="mail-Icon" />
                                                    </Box>
                                                    <Box className="mail-Border1"></Box>
                                                    <Box className="mailBox-bg1">
                                                    <MailOutlineOutlinedIcon className="mail-Icon" />
                                                    </Box>
                                                    <Box className="mail-Border1"></Box>
                                                    <Box className="mailBox-bg2">
                                                    <MailOutlineOutlinedIcon className="mail-Icon" />
                                                    </Box>
                                                    <Box className="mail-Border2"></Box>
                                                    <Box className="mailBox-bg2">
                                                    <MailOutlineOutlinedIcon className="mail-Icon" />
                                                    </Box>
                                                </Stack>
                                                </Box>
                                            </Box>
                                            <Box className="dateBox">
                                                <Box>
                                                <Typography component='p' className="dateText">
                                                    Mar 30
                                                </Typography>
                                                </Box>

                                                <MoreHorizIcon sx={{
                                                color: '#474747',
                                                fontSize: '20px',
                                                }} />

                                            </Box>
                                            </Stack>
                                            <Box sx={{ textAlign: 'center', p: 1 }}>
                                            <Button
                                                disableRipple
                                                className="bottom-Window"
                                            >
                                                Show in Window View
                                            </Button>
                                            </Box>
                                        </Stack>

                                        </Stack>
                                    }

                                    {(activityType === "Meeting") && showActivities &&
                                        <Stack sx={{ width: '100%' }}>

                                        <Stack>
                                            <Box className="Activities-Style-2">
                                            <Typography>
                                                Activities
                                            </Typography>

                                            </Box>

                                            <Stack className="note-block">
                                            <Box className="after-Act-Box">
                                                <Box className="mainDiv">
                                                <Box>
                                                    <Typography component='p' className="boxText-text">
                                                    Justin Kidd to <Box component='span' sx={{ color: 'var(--c-primary-color)', }}> Jose Ortiz </Box>
                                                    </Typography>
                                                </Box>
                                                <Box component='div' sx={{ borderRight: '1px solid #919191' }}></Box>
                                                <Box>
                                                    <Typography component='p' className="boxText-text1">
                                                    Step 4 of <Box component='span' sx={{ color: 'var(--c-primary-color)', }}>Justin CRNinja Drip</Box>
                                                    </Typography>
                                                </Box>
                                                </Box>
                                                <Typography component='p'
                                                className="boxText-text2"
                                                >
                                                Achieve 50% Less Attrition. At Ninja-Like Speed.
                                                </Typography>

                                                <Box>
                                                <Typography component='p'
                                                    className="boxText-text3"
                                                >
                                                    Hi Jose, Get the Right Agents, With the Right Skills,
                                                    Right Away, It's been about two weeks since we....
                                                </Typography>
                                                <Box className="boxText-box2">
                                                    <Typography component='p' className="boxText-text4">
                                                    Not Sent - Sendgrid Drop
                                                    </Typography>
                                                </Box>
                                                </Box>
                                            </Box>
                                            <Box className="dateBox">
                                                <Box>
                                                <Typography component='p' className="dateText">
                                                    Mar 30
                                                </Typography>
                                                </Box>

                                                <MoreHorizIcon sx={{
                                                color: '#474747',
                                                fontSize: '20px',
                                                }} />

                                            </Box>
                                            </Stack>

                                            <Stack className="note-block">
                                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
                                                <Box className="mainDiv">
                                                <Box>
                                                    <Typography component='p' className="boxText-text">
                                                    Justin Kidd to <Box component='span' sx={{ color: 'var(--c-primary-color)', }}> Jose Ortiz </Box>
                                                    </Typography>
                                                </Box>
                                                <Box component='div' sx={{ borderRight: '1px solid #919191' }}></Box>
                                                <Box>
                                                    <Typography component='p' className="boxText-text1">
                                                    Step 3 of <Box component='span' sx={{ color: 'var(--c-primary-color)', }}>Justin CRNinja Drip</Box>
                                                    </Typography>
                                                </Box>
                                                </Box>
                                                <Typography component='p'
                                                className="boxText-text2"
                                                >
                                                90 Days to Fill Your Contact Center Class? Try 14.
                                                </Typography>

                                                <Box>
                                                <Typography component='p'
                                                    className="boxText-text3"
                                                >
                                                    Hi Jose, Too Good to be True? Nope,Ninjas are Real.
                                                    Change Your hiring timelines forever with the...
                                                </Typography>
                                                <Stack
                                                    direction='row' alignItems='center' mt={1} mb={1}
                                                >
                                                    <Box className="mailBox-bg1">
                                                    <MailOutlineOutlinedIcon className="mail-Icon" />
                                                    </Box>
                                                    <Box className="mail-Border1"></Box>
                                                    <Box className="mailBox-bg1">
                                                    <MailOutlineOutlinedIcon className="mail-Icon" />
                                                    </Box>
                                                    <Box className="mail-Border1"></Box>
                                                    <Box className="mailBox-bg2">
                                                    <MailOutlineOutlinedIcon className="mail-Icon" />
                                                    </Box>
                                                    <Box className="mail-Border2"></Box>
                                                    <Box className="mailBox-bg2">
                                                    <MailOutlineOutlinedIcon className="mail-Icon" />
                                                    </Box>
                                                </Stack>
                                                </Box>
                                            </Box>
                                            <Box className="dateBox">
                                                <Box>
                                                <Typography component='p' className="dateText">
                                                    Mar 30
                                                </Typography>
                                                </Box>

                                                <MoreHorizIcon sx={{
                                                color: '#474747',
                                                fontSize: '20px',
                                                }} />

                                            </Box>
                                            </Stack>
                                            <Box sx={{ textAlign: 'center', p: 1 }}>
                                            <Button
                                                disableRipple
                                                className="bottom-Window"
                                            >
                                                Show in Window View
                                            </Button>
                                            </Box>
                                        </Stack>

                                        </Stack>
                                    } */}

                            {(activityType === "Action") && showActivities &&
                                <Stack sx={{ width: '100%' }}>

                                    <Stack>
                                        <Box className="Activities-Style-2">
                                            <Typography>
                                                Activities
                                            </Typography>
                                        </Box>

                                        <Stack className="note-block">
                                            <Box className="after-Act-Box">
                                                <Box className="mainDiv">
                                                    <Box>
                                                        <Typography component='p' className="boxText-text">
                                                            Justin Kidd to <Box component='span' sx={{ color: 'var(--c-primary-color)', }}> Jose Ortiz </Box>
                                                        </Typography>
                                                    </Box>
                                                    <Box component='div' sx={{ borderRight: '1px solid #919191' }}></Box>
                                                    <Box>
                                                        <Typography component='p' className="boxText-text1">
                                                            Step 4 of <Box component='span' sx={{ color: 'var(--c-primary-color)', }}>Justin CRNinja Drip</Box>
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                <Typography component='p'
                                                    className="boxText-text2"
                                                >
                                                    Achieve 50% Less Attrition. At Ninja-Like Speed.
                                                </Typography>

                                                <Box>
                                                    <Typography component='p'
                                                        className="boxText-text3"
                                                    >
                                                        Hi Jose, Get the Right Agents, With the Right Skills,
                                                        Right Away, It's been about two weeks since we....
                                                    </Typography>
                                                    <Box className="boxText-box2">
                                                        <Typography component='p' className="boxText-text4">
                                                            Not Sent - Sendgrid Drop
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Box>
                                            <Box className="dateBox">
                                                <Box>
                                                    <Typography component='p' className="dateText">
                                                        Mar 30
                                                    </Typography>
                                                </Box>

                                                <MoreHorizIcon sx={{
                                                    color: '#474747',
                                                    fontSize: '20px',
                                                }} />

                                            </Box>
                                        </Stack>

                                        <Stack className="note-block">
                                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
                                                <Box className="mainDiv">
                                                    <Box>
                                                        <Typography component='p' className="boxText-text">
                                                            Justin Kidd to <Box component='span' sx={{ color: 'var(--c-primary-color)', }}> Jose Ortiz </Box>
                                                        </Typography>
                                                    </Box>
                                                    <Box component='div' sx={{ borderRight: '1px solid #919191' }}></Box>
                                                    <Box>
                                                        <Typography component='p' className="boxText-text1">
                                                            Step 3 of <Box component='span' sx={{ color: 'var(--c-primary-color)', }}>Justin CRNinja Drip</Box>
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                <Typography component='p'
                                                    className="boxText-text2"
                                                >
                                                    90 Days to Fill Your Contact Center Class? Try 14.
                                                </Typography>

                                                <Box>
                                                    <Typography component='p'
                                                        className="boxText-text3"
                                                    >
                                                        Hi Jose, Too Good to be True? Nope,Ninjas are Real.
                                                        Change Your hiring timelines forever with the...
                                                    </Typography>
                                                    <Stack
                                                        direction='row' alignItems='center' mt={1} mb={1}
                                                    >
                                                        <Stack direction='row' spacing={2} pl='20px' pr='20px' sx={{ marginBottom: '23px' }} mt={1}>
                                                            <Box className="mailBox-bg1">
                                                                <MailOutlineOutlinedIcon className="mail-Icon" />
                                                            </Box>
                                                            <Box className="mail-Border1"></Box>
                                                            <Box className="mailBox-bg1">
                                                                <MailOutlineOutlinedIcon className="mail-Icon" />
                                                            </Box>
                                                            <Box className="mail-Border1"></Box>
                                                            <Box className="mailBox-bg2">
                                                                <MailOutlineOutlinedIcon className="mail-Icon" />
                                                            </Box>
                                                            <Box className="mail-Border2"></Box>
                                                            <Box className="mailBox-bg2">
                                                                <MailOutlineOutlinedIcon className="mail-Icon" />
                                                            </Box>
                                                        </Stack>
                                                    </Stack>
                                                </Box>
                                            </Box>
                                            <Box className="dateBox">
                                                <Box>
                                                    <Typography component='p' className="dateText">
                                                        Mar 30
                                                    </Typography>
                                                </Box>

                                                <MoreHorizIcon sx={{
                                                    color: '#474747',
                                                    fontSize: '20px',
                                                }} />

                                            </Box>
                                        </Stack>
                                        <Box sx={{ textAlign: 'center', p: 1 }}>
                                            <Button
                                                disableRipple
                                                className="bottom-Window"
                                            >
                                                Show in Window View
                                            </Button>
                                        </Box>
                                    </Stack>

                                </Stack>
                            }

                            {(activityType === "Task") && showActivities &&
                                <Stack sx={{ width: '100%' }}>

                                    <Stack>
                                        <Box className="Activities-Style-2">
                                            <Typography>
                                                Tasks
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <div>
                                                <Box className="hide-Act-Box1">
                                                    <Box className="con-Acc-Box"
                                                        sx={{
                                                            borderBottom: isContact ? '1px solid var(--c-primary-color)' : '1px solid #E6E6E6',
                                                        }}
                                                        onClick={onclickContact}
                                                    >
                                                        <Typography component='p' className="con-Acc-Text"
                                                            sx={{
                                                                color: isContact ? 'var(--c-primary-color)' : '#474747',
                                                            }}>
                                                            Open Tasks
                                                        </Typography>
                                                    </Box>
                                                    <Box className="con-Acc-Box"
                                                        sx={{
                                                            borderBottom: isAccount ? '1px solid var(--c-primary-color)' : '1px solid #E6E6E6',
                                                        }}
                                                        onClick={onclickAccount}
                                                    >
                                                        <Typography component='p' className="con-Acc-Text"
                                                            sx={{
                                                                color: isAccount ? 'var(--c-primary-color)' : '#474747',
                                                            }}>
                                                            Completed Tasks
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                <div>
                                                    {isContact && (
                                                        <div className="tasksDiv">
                                                            {/* ... the map and rendering of open tasks as  above */}
                                                        </div>
                                                    )}
                                                    {isAccount && (
                                                        <div className="tasksDiv2">
                                                            {/* ... the map and rendering of completed tasks as above */}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </Box>

                                    </Stack>

                                </Stack>
                            }


                        </Stack>


                    </Box>
                    }
                </Stack >

            </Stack >

        </div >

    );
}
export default Activities;
