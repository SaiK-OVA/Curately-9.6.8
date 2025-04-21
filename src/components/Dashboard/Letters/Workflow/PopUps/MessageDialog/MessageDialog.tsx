import { useEffect, useState, useRef } from '../../../../../../shared/modules/React';
// import Card from '@mui/material/Card';
import { Typography } from '../../../../../../shared/modules/MaterialImports/Typography';
import { TextField, FormControlLabel } from '../../../../../../shared/modules/MaterialImports/FormInputs';
import { MenuItem } from '../../../../../../shared/modules/MaterialImports/Menu';
import { useFormik, Yup } from '../../../../../../shared/modules/Formik';
import CloseIcon from '@mui/icons-material/Close';
import './MessageDialog.scss';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '../../../../../../shared/modules/MaterialImports/Dialog';
import { Divider } from '../../../../../../shared/modules/MaterialImports/Divider';
import SaveIcon from '@mui/icons-material/Save';
import { Popover } from '../../../../../../shared/modules/MaterialImports/Popover';
import { Checkbox } from '../../../../../../shared/modules/MaterialImports/FormElements';
import { Box } from '../../../../../../shared/modules/MaterialImports/Box';
import ApiService from '../../../../../../shared/api/api';
import { trackPromise } from '../../../../../../shared/modules/PromiseTrackter';
import { InputAdornment, showToaster, Grid, IconButton, Button } from '../../../../../../shared/modules/commonImports';
//import ControlPointIcon from '@mui/icons-material/ControlPoint';
// import { MUIAutoComplete } from '../../../../shared/components/MUIAutoComplete/MUIAutoComplete';
import { FocusError } from 'focus-formik-error';
import { userLocalData } from '../../../../../../shared/services/userData';
//import Editor from '../../../Sequence/EmailBody/EmailBody';
import Editor from '../../../../../shared/EmailDialogBox/EmailBody';
import PlaceHolders from '../PlaceHolders/PlaceHolders';
import CodeIcon from '@mui/icons-material/Code';
import GridViewIcon from "@mui/icons-material/GridView";
import NotesIcon from '@mui/icons-material/Notes';
import { MUIAutoComplete } from '../../../../../shared/MUIAutoComplete/MUIAutoComplete';
//import DataObjectIcon from '@mui/icons-material/DataObject';
export interface MessageProps {
    open: boolean;
    stageId: string;
    onClose: () => void;
    closePopup: () => void;
    messageData: any;
    messageType: number;
}

export interface SmsTemplateInterface {
    templateId: string;
    templateName: string;
    body: string;
}
const MessageDialog = (
    {
        open,
        stageId,
        onClose,
        closePopup,
        messageData,
        messageType
    }:
        MessageProps
) => {
    const smsBodyRef = useRef<any>();
    const messageValidationSchema = Yup.object().shape({
        stageId: Yup.string(),
        formId: Yup.string(),
        messageId: Yup.string(),
        isEnable: Yup.string(),
        messageName: Yup.string(),
        messageType: Yup.string(),
        triggerType: Yup.string(),
        emailEnable: Yup.bool(),
        fromEmail: Yup.string(),
        // .when('emailEnable', {
        //     is: true,
        //     then: (f:any) => f.required('Email is required.')
        // }),
        bcc: Yup.string(),
        subject: Yup.string(),
        // .when('emailEnable', {
        //     is: true,
        //     then: (f:any) => f.required('Subject is required.')
        // }),
        emailBody: Yup.string(),
        // .when('emailEnable', {
        //     is: true,
        //     then: (f:any) => f.required('Body is required.')
        // }),
        smsEnable: Yup.bool(),
        fromName: Yup.string(),
        fromPhone: Yup.string(),
        // .when('smsEnable', {
        //     is: true,
        //     then: (f:any) => f.required('Phone is required.')
        // }),
        smsBody: Yup.string(),
        // .when('smsEnable', {
        //     is: true,
        //     then: (f:any) => f.required('SMS Body is required.')
        // }),
        smsMergeFields: Yup.string(),
        recrId: Yup.string(),
        templateEmailName: Yup.string(),
        templateEmailType: Yup.string(),
        templateEmailId: Yup.string(),
        templateSmsName: Yup.string(),
        templateSmsId: Yup.string(),
        templateMessage: Yup.array().of(
            Yup.object().shape({
                template: Yup.string()
            })
        ),

    });
    const messageFormik = useFormik({
        initialValues: {
            ...messageData,
            templateEmailName: "",
            templateType: '',
            templateMessage: [{
                template: !userLocalData.isChromeExtensionEnabled() ? "emailBuilder" : "emailTemplates",
                templateType: 'all',
            }],
            templateEmailId: "",
            templateSmsName: "",
            templateSmsId: "",
            smsMergeFields: "0"
        },
        // enableReinitialize: true,
        validationSchema: messageValidationSchema,
        // validate: (values) => {
        // },
        onSubmit: () => {
            // if (values.userName === "admin" && values.password === "12345678") {
            // } else {
            //     alert('Enter Valid Credentials.');
            // }
            // console.log(values);
            saveMessage();
        },
    });

    const [emailTemplateList, setEmailTemplateList] = useState([]);
    const [smsTemplateList, setSmsTemplateList] = useState<SmsTemplateInterface[]>([]);


    // const [anchorPlaceEl, setAnchorPlaceEl] = useState<HTMLButtonElement | null>(null);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [smsTemplateName, setSmsTemplateName] = useState("");
    // const [charCount, setCharCount] = useState(0);
    // const [open1, setOpen1] = useState(false);
    const initialRender = useRef(true);


    const handleSaveClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleSaveClose = () => {
        setAnchorEl(null);
    };
    const maxCharacterCount = 140; // Set your desired maximum character count

    const ta1HandleChange = (event: { target: { value: any; }; }) => {
        const inputText = event.target.value;
        if (event.target.value.length <= maxCharacterCount) {
            // setTextarea1(inputText);
            messageFormik.setFieldValue('smsBody', inputText);
        }

    };
    // const handlePopoverOpen = (event:any) => {
    //     setAnchorPlaceEl(event.currentTarget);
    //     setOpen1(true);
    // };

    // const handlePopoverClose = () => {
    //     setAnchorEl(null);
    //     setOpen1(false);
    // };
    // const [isPlaceHoldersOpen, setIsPlaceHoldersOpen] = useState(false);

    // const handlePopoverOpen = (event:any) => {
    //     setAnchorPlaceEl(event.currentTarget);
    //     setIsPlaceHoldersOpen(true);
    // };

    // const handleClosePlaceHolders = () => {
    //     setIsPlaceHoldersOpen(false);
    //     setAnchorPlaceEl(null);
    // };
    const openSave = Boolean(anchorEl);
    //const openPlaceHolder = Boolean(anchorPlaceEl);

    const handleSmsTemlateName = (e: any) => {
        setSmsTemplateName(e.target.value);
    }

    // const insertField = (field: string) => {
    //     const editor = editorHtml.current.getEditor();
    //     let selection = editor.getSelection();
    //     if (!selection) {
    //         editor.focus();
    //         selection = editor.getSelection();
    //     }

    //     if (selection) {
    //         const cursorPosition = selection.index;
    //         editor.insertText(cursorPosition, ` {{${field}}} `);
    //         editor.setSelection(cursorPosition + field.length + 6);
    //         handlePopoverClose();
    //     }
    // };

    const insertSMSField = (field: string) => {
        const cursorPosition = smsBodyRef.current.selectionStart || 0;
        const textBeforeCursorPosition = smsBodyRef.current.value.substring(0, cursorPosition);
        const textAfterCursorPosition = smsBodyRef.current.value.substring(cursorPosition, smsBodyRef.current.value.length);
        const newCursorPosition = cursorPosition + ` {{${field}}} `.length;
        // const updatedValue = textBeforeCursorPosition + ` {{${field}}} ` + textAfterCursorPosition;
        // messageFormik.setFieldValue('smsBody', updatedValue);
        const newText = textBeforeCursorPosition + ` {{${field}}} ` + textAfterCursorPosition;

        if (newText.length > 140) {
            showToaster('SMS body cannot exceed 140 characters.', 'error');
        } else {
            messageFormik.setFieldValue('smsBody', newText);
        } setTimeout(() => {
            smsBodyRef.current.focus();
            smsBodyRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
        }, 0);
    };


    // const triggerOptions = [
    //     { id: 1, label: 'Applicant' },
    //     { id: 8, label: 'Facebook Lead' },
    //     { id: 9, label: 'Linkedin Lead' },
    //     { id: 10, label: 'Webhook' },
    //     { id: 11, label: 'Text to apply' }
    // ];

    // const messageTypeOptions = [
    //     { label: 'Stage Landing', id: 1 },
    //     { label: 'Follow up', id: 2 },
    //     { label: 'Final', id: 3 },
    // ];

    // const sendFormOptions = [
    //     { label: 'Option 1', id: 1 },
    //     { label: 'Option 2', id: 2 },
    // ];

    // const TemplateOptions = [
    //     { label: 'Option 1', id: 1 },
    //     { label: 'Option 2', id: 2 },
    // ];

    const saveMessage = () => {
        if (!messageFormik.values.messageName) {
            showToaster("Message Name is required", "error");
            messageFormik.values.messageName.focus()
            return
        } else if (!messageFormik.values.messageType) {
            showToaster("Message Type is required", "error");
            return
        } else if (messageFormik.values.emailEnable && !messageFormik.values.subject) {
            showToaster("Subject is required", "error");
            return
        } else if (messageFormik.values.emailEnable && !messageFormik.values.emailBody) {
            showToaster("Email Body is required", "error");
            return
        } else if (messageFormik.values.smsEnable && !messageFormik.values.smsBody) {
            showToaster("SMS Body is required", "error");
            return
        }
        const isFormValid = messageFormik.isValid && Object.keys(messageFormik.touched).length > 0;
        if (isFormValid) {
            // console.log(messageFormik.values);
            let tempValuesToPass = messageFormik.values;
            tempValuesToPass.isEnable = tempValuesToPass.emailEnable || tempValuesToPass.smsEnable;
            tempValuesToPass.clientId = userLocalData.getvalue('clientId');
            tempValuesToPass.recrId = userLocalData.getvalue('recrId');
            trackPromise(
                ApiService.postWithData('admin', 'saveMessage', tempValuesToPass).then((response: any) => {
                    if (response.data.message === "Success") {
                        onClose();
                    } else {
                        showToaster(response.data.Error, 'error');
                        // console.log(response.data);
                    }
                })
            )
        }
    }

    // const getEmailTemplate = (templateId: string) => {

    //     // let ed = quillRefs?.current[i]?.getEditor();
    //     // ed?.insertText(ed?.getSelection()?.index || 0, " <<" + text + ">> ");

    //     // https://codepen.io/alexkrolick/pen/gmroPj?editors=0010
    //     // insert star
    //     // http://52.40.49.193/Accuick/Email/getEmailTemplateById.jsp?tmplid=148

    //     trackPromise(
    //         ApiService.getByParams(193, 'Curately/Workflow/getTemplateById.jsp', {
    //             tmplid: templateId,
    //             clientId: userLocalData.getvalue('clientId')
    //         }).then((response: any) => {
    //             // setTeamLeads(response.data);
    //             // console.log(response);
    //             setFormFieldValue(response.data.body, response.data.subject, templateId);
    //             setTimeout(() => {
    //                 setFormFieldValue('', response.data.subject, templateId);
    //             }, 300);
    //         })
    //     );

    // }

    const getSmsTemplate = (smsId: string, smsName: string) => {
        if (smsId) {
            let clientId = userLocalData.getvalue('clientId')
            // let tempObj = smsTemplateList.find((obj: any) => {
            //     return obj.smsId === smsId
            // });
            // if (tempObj && tempObj?.body) {
            //     messageFormik.setFieldValue('body', decodeURIComponent(tempObj?.body));
            // }
            trackPromise(
                ApiService.getCall(214, `getSmsListById//${smsId}/${clientId}`).then((response: any) => {
                    // setTeamLeads(response.data);
                    // console.log(response.data.list);
                    if (response.data.Success && response.data.list.length > 0) {
                        const template = response.data.list[0];
                        messageFormik.setFieldValue('smsBody', template.Body || '');
                        messageFormik.setFieldValue('templateSmsName', smsName || '');
                        messageFormik.setFieldValue('templateSmsId', smsId || '');


                    }

                }).catch(error => console.error('Fetching  Sms template error:', error))
            );
        } else {
            messageFormik.setFieldValue('smsBody', '');
            messageFormik.setFieldValue('templateSmsId', "");
            messageFormik.setFieldValue('templateSmsName', '');
        }
    }
    const getEmailTemplate = (templateId: string, type: 'emailBuilder' | 'emailTemplates', templateName = "") => {
        if (templateId) {

            let tempUrl = (type === "emailTemplates")
                ? `getEmailTemplatesListById/${templateId}/${userLocalData.getvalue('clientId')}`
                : `getEmailBuilderTemplatesListById/${templateId}/${userLocalData.getvalue('clientId')}`;
            console.log(templateId);
            trackPromise(
                ApiService.getCall('admin', tempUrl).then((response: any) => {
                    if (response.data.Success && response.data.list.length > 0) {
                        const template = response.data.list[0];
                        // Update the form values
                        messageFormik.setFieldValue('emailBody', (type === "emailTemplates") ? template.description || '' : template.htmlFile || "", template.subject || '');
                        messageFormik.setFieldValue('subject', template.subject || '');
                        messageFormik.setFieldValue('templateEmailId', templateId);
                        messageFormik.setFieldValue('templateEmailName', templateName);
                    }
                }).catch(error => console.error('Fetching template error:', error))
            );
        } else {
            messageFormik.setFieldValue('emailBody', '');
            messageFormik.setFieldValue('subject', '');
            messageFormik.setFieldValue('templateEmailId', "");
        }
    };


    // const setFormFieldValue = (emailBody: string, subject: string, templateId: string) => {
    //     if (messageFormik.values.emailBody !== emailBody) {
    //         if (subject) {
    //             messageFormik.setFieldValue('subject', subject);
    //         }
    //         if (emailBody) {
    //             messageFormik.setFieldValue('emailBody', emailBody);
    //         }
    //         if (templateId) {
    //             messageFormik.setFieldValue('templateEmailId', templateId);
    //         }
    //     }
    // }

    // const handleSaveEmailTemplate = (name: string) => {

    //     const data = {
    //         "templateId": 0,
    //         "templateName": name,
    //         "description": messageFormik.values.emailBody,
    //         "subject": messageFormik.values.subject,
    //         // "body": messageFormik.values.emailBody,
    //         "jsonFile": "",
    //         "htmlFile": "",
    //         "type": 2,
    //         "isActive": false,
    //         "createdBy": userLocalData.getvalue('recrId'),
    //         "clientId": userLocalData.getvalue('clientId'),
    //     }
    //     trackPromise(
    //         ApiService.postWithData(214, 'saveEmailTemplates', data).then((response: any) => {
    //             // console.log(response);
    //             if (response.data.Success === true) {
    //                 showToaster("Email Template saved Successfully", "success");
    //                 loadEmailTemplates();
    //             } else {
    //                 showToaster(response.data.Message, "error");
    //             }
    //         })
    //     )
    // }

    const handleSaveSmsTemplate = () => {
        const data = {
            // "templateName": smsTemplateName,
            // "body": messageFormik.values.smsBody,
            // "userId": userLocalData.getvalue('recrId')
            "smsId": 0,
            "smsName": smsTemplateName,
            "body": messageFormik.values.smsBody,
            "fromPhone": "",
            "isactive": true,
            "createdBy": userLocalData.getvalue('recrId'),
            clientId: userLocalData.getvalue('clientId'),
        }
        setAnchorEl(null);
        trackPromise(
            ApiService.postWithData(214, 'saveSms', data).then((response: any) => {
                // console.log(response);
                if (response.data.Success === true) {
                    showToaster("SMS Template has been saved Successfully", "success");
                    loadSmsTemplate();
                } else if (response.data.Error === true) {
                    showToaster(response.data.Message, "error");
                } else {
                    showToaster("Something went wrong", "error");
                }
            })
        )
    }

    // const loadEmailTemplates = () => {
    //     trackPromise(
    //         ApiService.getByParams(193, 'Curately/Workflow/getTemplatesList.jsp', {
    //             recrId: userLocalData.getvalue('recrId'),
    //             clientId: userLocalData.getvalue('clientId')
    //         }).then((response: any) => {
    //             setEmailTemplateList(response.data);
    //         })
    //     );
    // }
    const loadEmailTemplates = () => {
        let clientId = userLocalData.getvalue('clientId');
        let recrId = userLocalData.getvalue('recrId')
        trackPromise(
            ApiService.getCall(214, `/getEmailTemplatesList/${recrId}/${clientId}`,
            ).then((response: any) => {
                // console.log(response.data.List)

                setEmailTemplateList(response.data.List);


            })
        );
    }
    // const loadSmsTemplates = () => {
    //     trackPromise(
    //         ApiService.getByParams(193, 'Curately/Workflow/', {
    //             recrId: userLocalData.getvalue('recrId'),
    //             clientId: userLocalData.getvalue('clientId')
    //         }).then((response: any) => {
    //             setSmsTemplateList(response.data);
    //         })
    //     );
    // }
    const loadSmsTemplate = () => {
        let clientId = userLocalData.getvalue('clientId');
        let recrId = userLocalData.getvalue('recrId')
        trackPromise(
            ApiService.getCall('admin', `getSmsList/${recrId}/${clientId}`
            ).then((response: any) => {
                // console.log(response.data.list);
                setSmsTemplateList(response.data.list);
                //     if (response.data.Success && response.data.list.length > 0) {
                //                         const template = response.data.list[0];
                //                         messageFormik.setFieldValue('smsBody', template.Body || '');
                //                         messageFormik.setFieldValue('smsBody', template.Body || '');

                //                     }
            })
        );
    }
    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
        } else {
            loadEmailTemplates();
            loadSmsTemplate();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Dialog open={open} className='MessageDialog' maxWidth={'lg'}>
            <form
                onSubmit={messageFormik.handleSubmit}
            >
                <FocusError formik={messageFormik} />
                <DialogTitle className='py-2'>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <span>
                            <span className='pr-1'>{(messageType === 1) ? 'Stage Landing' : (messageType === 2) ? 'Follow up' : 'Final'}</span>
                            <span className='pr-2'>Message - </span>
                            <span>{(messageData?.messageId) ? 'Edit' : 'Add'}</span>
                        </span>
                        <span onClick={() => closePopup()} className="closePopup">
                            <CloseIcon />
                        </span>
                    </Grid>
                </DialogTitle>
                <Divider />
                <DialogContent className='dialogContent'>

                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="stretch"
                        className='dialogGrid'
                    >


                        <Typography variant='subtitle2' className='label'>Message Name</Typography>
                        <TextField
                            id="messageName"
                            size='small'
                            placeholder="Give a title/name"
                            fullWidth
                            name='messageName'
                            value={messageFormik.values.messageName}
                            onChange={messageFormik.handleChange}
                            sx={{ mb: 2 }}
                        />
                        {/* <ErrorMessage formikObj={messageFormik} name={'messageName'}></ErrorMessage> */}

                    </Grid>

                    <div className='grid-container'>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="stretch"
                            sx={{ width: '100%', maxWidth: '900px' }}
                        >
                            <Grid size={8} className="item-right">
                                <FormControlLabel control={
                                    <Checkbox
                                        onChange={messageFormik.handleChange}
                                        checked={messageFormik.values.emailEnable}
                                        name='emailEnable'
                                    />
                                } label="Email" />
                                <Box className={'grid-item ' + (messageFormik.values.emailEnable ? '' : 'disabled')} sx={{ borderTop: '0 !important' }}>
                                    <Box className={'grid-item ' + (messageFormik.values.emailEnable ? '' : 'disabled')} sx={{ borderTop: '0 !important' }}>
                                        {messageFormik.values.templateMessage.map((messageTemp: any, i: any) => (
                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="flex-start"
                                                alignItems="center"
                                                key={i}
                                            >
                                                <Grid size={6}>
                                                    <TextField
                                                        size="small"
                                                        id={`templateType${i}`}
                                                        select
                                                        value={messageTemp.templateType}
                                                        onChange={e => {
                                                            // console.log(e)
                                                            messageFormik.handleChange(e);
                                                        }}
                                                        name={`templateMessage[${i}]templateType`}
                                                        fullWidth
                                                        className="mailInputs"
                                                        defaultValue="0"
                                                    >
                                                        {
                                                            !userLocalData.isChromeExtensionEnabled() &&
                                                            <MenuItem value="all">
                                                                <GridViewIcon
                                                                    fontSize="small"
                                                                    style={{ marginRight: 8 }}
                                                                />
                                                                All Templates
                                                            </MenuItem>
                                                        }
                                                        {
                                                            !userLocalData.isChromeExtensionEnabled() &&
                                                            <MenuItem value="my">
                                                                <CodeIcon
                                                                    fontSize="small"
                                                                    style={{ marginRight: 8 }}
                                                                />
                                                                My Template
                                                            </MenuItem>
                                                        }
                                                    </TextField>
                                                </Grid>
                                                <Grid size={6}>
                                                    <TextField
                                                        size="small"
                                                        id={`template${i}`}
                                                        select
                                                        value={messageTemp.template}
                                                        onChange={e => messageFormik.handleChange(e)}
                                                        name={`templateMessage[${i}].template`}
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
                                                <Grid size={12} className='all_email_templates'>
                                                    {/* {messageFormik.values.templateEmailType === "allTemplates" &&
                                                        <MUIAutoComplete
                                                            id='AllEmailTemplates'
                                                            handleChange={(id: any, name: string, type: "EmailBuilderTemplate" | "EmailTemplates") => {
                                                                // console.log(id, name)
                                                                if (id) {
                                                                    getEmailTemplate(id, (type === "EmailBuilderTemplate") ? 'emailBuilder' : 'emailTemplates', name);
                                                                } else {
                                                                    getEmailTemplate('', (type === "EmailBuilderTemplate") ? 'emailBuilder' : 'emailTemplates', '');
                                                                }

                                                            }}
                                                            valuePassed={messageFormik.values.templateEmailId ? { id: messageFormik.values.templateEmailId, label: messageFormik.values.templateEmailName } : ''}
                                                            isMultiple={false}
                                                            textToShow="Search All Email Templates"
                                                            placeholder=""
                                                            width="100%"
                                                            type='AllEmailTemplates'
                                                        />
                                                    } */}
                                                    {messageTemp.template=== "emailBuilder" &&
                                                        <MUIAutoComplete
                                                            id='EmailBuilderTemplates'
                                                            handleChange={(id: any, name: string) => {
                                                                if (id) {
                                                                    getEmailTemplate(id, 'emailBuilder', name);
                                                                } else {
                                                                    getEmailTemplate('', 'emailBuilder', '');
                                                                }
                                                            }}
                                                            // valuePassed={messageFormik.values.templateEmailId ? { id: messageFormik.values.templateEmailId, label: messageFormik.values.templateEmailName } : ''}
                                                            valuePassed={''}
                                                            isMultiple={false}
                                                            textToShow="Search HTML Template"
                                                            placeholder=""
                                                            width="100%"
                                                            type='EmailBuilderTemplate'
                                                            onlyRecruiter={messageTemp.templateType === 'my' ? true : false}
                                                        />
                                                    }
                                                    {messageTemp.template === "emailTemplates" &&
                                                    <MUIAutoComplete
                                                        id='EmailTemplates'
                                                        handleChange={(id: any, name: string) => {
                                                            if (id) {
                                                                getEmailTemplate(id, 'emailTemplates', name);
                                                            } else {
                                                                getEmailTemplate('', 'emailTemplates', '');
                                                            }
                                                        }}
                                                        // valuePassed={messageFormik.values.templateEmailId ? { id: messageFormik.values.templateEmailId, label: messageFormik.values.templateEmailName } : ''}
                                                        valuePassed={''}
                                                        isMultiple={false}
                                                        textToShow="Search Text Template"
                                                        placeholder=""
                                                        width="100%"
                                                        type='EmailTemplate'
                                                        onlyRecruiter={messageTemp.templateType === 'my' ? true : false}
                                                    />
                                                    }
                                                </Grid>
                                            </Grid>
                                        ))}
                                    </Box>
                                    <TextField
                                        id="subject"
                                        size='small'
                                        variant="standard"
                                        name='subject'
                                        fullWidth
                                        value={messageFormik.values.subject}
                                        onChange={messageFormik.handleChange}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">Subject:</InputAdornment>
                                        }}
                                    />
                                    {/* <ErrorMessage formikObj={messageFormik} name={'subject'}></ErrorMessage> */}

                                    <Editor
                                        toolbarId='emailBody'
                                        id='emailBody'
                                        // handleChange={(e: any) => {
                                        //     setFormFieldValue(e, '', '');
                                        //     // console.log(e);
                                        // }}
                                        handleChange={(content: any) => {
                                            messageFormik.setFieldValue('emailBody', content);
                                        }}
                                        editorHtml={messageFormik.values.emailBody}
                                        mentions={true}
                                        saveTemplate={true}
                                        // enableSave={messageFormik.values.emailBody !== "" && messageFormik.values.subject !== ""}
                                        // handleSaveTemplate={handleSaveEmailTemplate}
                                        subject={messageFormik.values.subject}
                                    />
                                    {/* <ErrorMessage formikObj={messageFormik} name={'emailBody'}></ErrorMessage> */}
                                </Box>
                            </Grid>
                            <Grid size={4} className="item-left">
                                <FormControlLabel control={
                                    <Checkbox
                                        name='smsEnable'
                                        onChange={messageFormik.handleChange}
                                        checked={messageFormik.values.smsEnable}
                                    />
                                } label="SMS" />
                                <Box className={'grid-item ' + (messageFormik.values.smsEnable ? '' : 'disabled')} sx={{ borderTop: '0 !important' }}>
                                    <MUIAutoComplete className='mt-2 mailInputs'
                                        id='sms'
                                        handleChange={(id: any, name: string, Body: string) => {
                                            if (id && name) {
                                                getSmsTemplate(id, name);
                                            } else {
                                                getSmsTemplate("", "");
                                            }
                                        }}
                                        valuePassed={messageFormik.values.templateSmsId ? { id: messageFormik.values.templateSmsId, label: messageFormik.values.templateSmsName } : ''}
                                        isMultiple={false}
                                        placeholder={"Select SMS Template"}
                                        width="100%"
                                        type='sms'
                                    />
                                    {/* <TextField
                                        size='small'
                                        id=''
                                        select
                                        value={messageFormik.values.SmsId}
                                        onChange={
                                            (e) => {
                                                // console.log(e.target.value)
                                                getSmsTemplate(e.target.value);

                                            }
                                        }
                                        name={`smsId`}
                                        fullWidth
                                        className='mailInputs'
                                        defaultValue="0"
                                        variant='standard'
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">Template</InputAdornment>
                                        }}
                                    >
                                        <MenuItem value="0"></MenuItem>
                                        {
                                            smsTemplateList.map(
                                                (template: any) => {
                                                    return <MenuItem value={template.SmsId} key={template.SmsId}>{template.SMSName}</MenuItem>
                                                }
                                            )
                                        }
                                    </TextField> */}

                                    <TextField
                                        id="smsBody"
                                        size='small'
                                        multiline
                                        rows={10}
                                        name='smsBody'
                                        // value={messageFormik.values.smsBody}
                                        // onChange={messageFormik.handleChange}
                                        // onKeyUp={(e: any) => setCharCount(e.target.value.length)}
                                        // ref={}
                                        inputRef={smsBodyRef}
                                        fullWidth
                                        variant='standard'
                                        placeholder='SMS Body'
                                        sx={{ paddingTop: '10px' }}
                                        value={messageFormik.values.smsBody}
                                        onChange={ta1HandleChange}
                                    // InputProps={{
                                    //     maxLength: 420
                                    // }}
                                    // type='text'
                                    />
                                    {/* <ErrorMessage formikObj={messageFormik} name={'smsBody'}></ErrorMessage> */}

                                    <Box className="sms-footer">
                                        <Box className='fieldName' >

                                            {/* <TextField
                                                // className='d-none'
                                                id="smsMergeFields"
                                                size='small'
                                                multiline
                                                rows={4}
                                                name='smsMergeFields'
                                                value={messageFormik.values.smsMergeFields}
                                                InputProps={{
                                                    startAdornment: <ControlPointIcon />
                                                }}
                                                onChange={
                                                    (e) => {
                                                        // console.log(e.target.value);
                                                        // console.log(smsBodyRef);
                                                        let cursorPosition = smsBodyRef.current.selectionStart || 0;
                                                        let textBeforeCursorPosition = smsBodyRef.current.value.substring(0, cursorPosition)
                                                        let textAfterCursorPosition = smsBodyRef.current.value.substring(cursorPosition, smsBodyRef.current.value.length)
                                                        messageFormik.setFieldValue('smsBody', textBeforeCursorPosition + ' <<' + e.target.value + '>> ' + textAfterCursorPosition);
                                                    }
                                                }
                                                select
                                                defaultValue={'0'}
                                                className='merge-input'
                                                sx={{ width: '120px' }}
                                            >
                                                <MenuItem value="0" >Merge Fields</MenuItem>
                                                <MenuItem value="First name">First name</MenuItem>
                                                <MenuItem value="Last name">Last name</MenuItem>
                                                <MenuItem value="First name and Last name">First name and Last name</MenuItem>
                                                <MenuItem value="Email">Email</MenuItem>
                                                <MenuItem value="Signature">Signature</MenuItem>
                                                <MenuItem value="Recruiter Name">Recruiter Name</MenuItem>
                                                <MenuItem value="Candid">Candid</MenuItem>
                                                <MenuItem value="CandidateLink">CandidateLink</MenuItem>
                                            </TextField> */}


                                            <PlaceHolders onInsertField={insertSMSField} />

                                            <IconButton
                                                sx={{ p: 0 }}

                                                onClick={handleSaveClick}
                                                disabled={!messageFormik.values.smsBody}
                                                title="Save as Template"
                                            >
                                                <SaveIcon sx={{ color: '#444', width: '18px' }} />
                                            </IconButton>
                                            <Popover
                                                id="save-popover"
                                                open={openSave}
                                                anchorEl={anchorEl}
                                                onClose={handleSaveClose}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                            >
                                                <Typography sx={{ m: 1 }}>Template name:</Typography>
                                                <TextField
                                                    id="template-name"
                                                    size='small'
                                                    name='template-name'
                                                    sx={{ width: 'calc(100% - 32px)', margin: '0 1rem' }}
                                                    onChange={handleSmsTemlateName}
                                                />
                                                <Button
                                                    color="primary"
                                                    variant="contained"
                                                    className='mr-2'
                                                    size="small"
                                                    sx={{ m: 2 }}
                                                    disabled={smsTemplateName.length > 2 ? false : true}
                                                    onClick={handleSaveSmsTemplate}
                                                >
                                                    Save
                                                </Button>
                                            </Popover>
                                        </Box>


                                        <Box className="charcount">
                                            {messageFormik.values.smsBody.length} of {maxCharacterCount} characters                                        </Box>
                                    </Box>


                                </Box>
                            </Grid>
                        </Grid>
                    </div>
                </DialogContent>
                <Divider />
                <DialogActions>
                    <Button color="primary" variant="contained" type="submit" className='mr-2' size="small">
                        {(messageData?.messageId) ? 'Update' : 'Save'}
                    </Button>
                </DialogActions>
            </form >
        </Dialog >
    )
}

export default MessageDialog;