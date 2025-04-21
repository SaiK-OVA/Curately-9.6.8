import { Menu, MenuItem } from '../../../../shared/modules/MaterialImports/Menu';
import { React, useState, useEffect, useMemo, useRef, useCallback } from "../../../../shared/modules/React"
import { MaterialReactTable, type MRT_ColumnDef } from "../../../../shared/modules/MaterialReactTable";
import { Typography } from '../../../../shared/modules/MaterialImports/Typography';
import { Tabs, Tab } from '../../../../shared/modules/MaterialImports/Tabs';
import { Tooltip } from "../../../../shared/modules/MaterialImports/ToolTip";
import { Grid, Button, IconButton, TextField, FormControl, InputLabel, InputAdornment } from '../../../../shared/modules/commonImports';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import NotesIcon from '@mui/icons-material/Notes';
import CodeIcon from '@mui/icons-material/Code';
import { Stack } from "../../../../shared/modules/MaterialImports/Stack";
import { trackPromise } from '../../../../shared/modules/PromiseTrackter';
import { userLocalData } from '../../../../shared/services/userData';
import { confirmDialog } from "../../../shared/ConfirmDialog/ConfirmDialog";
import { showToaster } from "../../../shared/SnackBar/SnackBar";
import ApiService from '../../../../shared/api/api';
import { useFormik, Yup } from '../../../../shared/modules/Formik';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent, DialogTitle, DialogActions } from '../../../../shared/modules/MaterialImports/Dialog';
import Editor from '../../../shared/EmailDialogBox/EmailBody';
import EmailBuilderData from "../../Letters/EmailBuilder/Add/EmailBuilderData";
import { Radio, RadioGroup } from '../../../../shared/modules/MaterialImports/FormElements';
import { FormControlLabel } from '../../../../shared/modules/MaterialImports/FormInputs';
import ContentCopy from '@mui/icons-material/ContentCopy';
import CloneTemplate, { cloneDialog } from './CloneTemplate/CloneTemplate';
import ErrorMessage from '../../../shared/Error/ErrorMessage';

import PlaceHolders from '../../Letters/Workflow/PopUps/PlaceHolders/PlaceHolders';
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
import './Templates.scss'
import CustomPagination from '../../../shared/CustomPagination/CustomPagination';
import { debounce } from 'lodash';
import { useParams } from 'react-router-dom';
import { ID_ROLE_EMAIL_AND_SMS_CAN_EDIT_DELETE_MESSAGE_TEMPLATES, ID_ROLE_EMAIL_AND_SMS_CAN_EDIT_VIEW_MESSAGE_TEMPLATES } from '../../../../shared/services/Permissions/IDs';
import SearchOutlined from '@mui/icons-material/SearchOutlined';

interface Template {
    templateId: string;
    templateName: string;
    subject: string;
    description: string;
    Type: string;
    modifyBy: string;
    htmlFile: string;
    templateType: number;
}

interface SmsTemplate {
    SmsId: string;
    SMSName: string;
    fromPhone: string;
    Body: string;
    // ModifyBY: string;
    createdBy: string

}


interface FormValues {
    templateName: string;
    description: string;
    subject: string;
    Type: string;
}


const Templates = () => {

    const [templateType, setTemplateType] = useState('Email');
    const [tabValue, setTabValue] = useState('myTemplates');
    const tabValueRef = useRef('myTemplates');
    // const isMessageTemplatesAddSettingEnabled = (userLocalData.checkSettings(ID_ROLE_APP_SETTINGS_MESSAGE_TEMPLATES) === 5) || (userLocalData.checkSettings(ID_ROLE_APP_SETTINGS_MESSAGE_TEMPLATES) === 6);
    // const isMessageTemplatesDeleteSettingEnabled = (userLocalData.checkSettings(ID_ROLE_APP_SETTINGS_MESSAGE_TEMPLATES) === 6);
    const [templateEmailHtmlOpen, setTemplateEmailHtmlOpen] = useState(false);
    const [selectedTemplateId, setSelectedTemplateId] = useState<any | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
    const [currentEditingTemplate, setCurrentEditingTemplate] = useState<SmsTemplate | null>(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [emailTemplateList, setEmailTemplateList] = useState<Template[]>([]);
    const [smsTemplateList, setSmsTemplateList] = useState<SmsTemplate[]>([]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [cloneTemplateType, setCloneTemplateType] = useState<"Email" | "SMS" | "">("");
    const currentUserId = userLocalData.getvalue('recrId');
    const [previewOpen, setPreviewOpen] = useState(false);
    const [selectedPreviewTemplate, setSelectedPreviewTemplate] = useState<Template | null>(null);
    const [smsPreviewOpen, setSmsPreviewOpen] = useState(false);
    const [selectedSmsPreviewTemplate, setSelectedSmsPreviewTemplate] = useState<SmsTemplate | null>(null);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [rowCount, setRowCount] = useState(0);
    const [globalFilter, setGlobalFilter] = useState('');

    const { candidateId, jobId } = useParams();

    const maxCharacterCount = 140; // Set your desired maximum character count

    const ta1HandleChange = (event: { target: { value: any; }; }) => {
        const inputText = event.target.value;
        if (event.target.value.length <= maxCharacterCount) {
            // setTextarea1(inputText);
            smsFormik.setFieldValue('smsBody', inputText);
        }

    };
    const canEditOrDelete = (templateRecrId: any) => {
        if (!templateRecrId) return false;
        return ((templateRecrId === currentUserId) || (userLocalData.getvalue('recrId') === 2));
    };

    const loadSmsTemplates = () => {
        const clientId = userLocalData.getvalue('clientId');
        const recrId = userLocalData.getvalue('recrId');
        const endpoint = (tabValueRef.current === 'myTemplates') ? `getSmsList/${recrId}/${clientId}` : `getSmsList/0/${clientId}`;
        trackPromise(
            ApiService.getCall('admin', endpoint)
                .then((response) => {
                    setSmsTemplateList(response.data.list);
                    setRowCount(response.data.list.length)
                })
        );
    };

    const handleEditTemplate = useCallback(debounce((templateId: string, type: string) => {
        //loadEmailTemplates();
        //   console.log(templateId);
        let clientId = userLocalData.getvalue('clientId');
        // let recrId = userLocalData.getvalue('recrId');

        let tempEditData: any = [];
        trackPromise(
            ApiService.getCall('admin', `${type === "Text" ? 'getEmailTemplatesListById' : 'getEmailBuilderTemplatesListById'}/${templateId}/${clientId}`)
                .then((response) => {
                    tempEditData = response.data.list;
                    // setRowCount(tempEditData.length)
                    const templateToEdit = tempEditData.find((template: any) => parseInt(template.templateId) === parseInt(templateId));

                    if (templateToEdit) {
                        templateFormik.setValues({
                            templateName: templateToEdit.templateName,
                            description: templateToEdit.description,
                            subject: templateToEdit.subject,
                            Type: type,
                        });
                        setSelectedTemplateId(templateId);
                        (type === "Text") ? setIsEditDialogOpen(true) : setTemplateEmailHtmlOpen(true);
                    } else {

                        templateFormik.resetForm();
                        setSelectedTemplateId(0);
                    }
                })
        );

    }, 400), [])

    const handleDeleteEmailTemplate = (templateId: string, templateName: string, templateType: string) => {
        confirmDialog(`Are you sure you want to delete ${templateName} Email Template ?`, () => {
            deleteEmailTemplate(templateId, templateType);
        });
    };

    const deleteEmailTemplate = async (id: string, templateType: string) => {
        let clientId = userLocalData.getvalue('clientId')
        //   console.log(id)
        let tempUrl = (templateType === "Text") ? `deleteEmailTemplates/${id}` : `deleteEmailBuilderTemplates/${id}`;
        try {
            ApiService.deleteById('admin', tempUrl, clientId)
                .then((response: any) => {
                    if (response.data.Success === true) {
                        showToaster(response.data.Message, "success");
                        loadEmailTemplates();

                    } else if (response.data.Error === true) {
                        showToaster(response.data.Message, "error");
                    } else {
                        showToaster("Something went wrong", "error");
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
        catch (e) {
            // console.log(e)
            // setOpenDeletePopup(false);
        }
    }

    useEffect(() => {
        setPagination(prev => ({
            ...prev,
            pageIndex: 0
        }));
    }, [globalFilter]);

    const handleSaveEmailTemplate = (id: number, { templateName, description, subject }: FormValues) => {

        if (templateName.trim() === "") {
            showToaster("Please Enter Email Template Name", "error");
            return false;
        } else if (subject.trim() === "") {
            showToaster("Please enter Email Template Subject", "error");
            return false;
        } else if ((description.trim() === "") || (description.trim() === "<p></p>") || (description.trim() === "<p><br></p>")) {
            showToaster("Please enter Email Template Description", "error");
            return false;
        }

        setIsFormSubmitted(true);

        const data = {
            "templateid": id,
            "templateName": templateName,
            "templatedesc": description,
            "subject": subject,
            "type": 2,
            "isactive": false,
            "createdby": userLocalData.getvalue('recrId'),
            "clientId": userLocalData.getvalue('clientId'),
        };
        trackPromise(
            ApiService.postWithData('admin', 'saveEmailTemplate', data).then((response) => {
                //  console.log(response.data);
                if (response.data.Success === true) {
                    showToaster("Email Template Updated Successfully", "success");
                    templateFormik.resetForm();
                    loadEmailTemplates();
                    setIsEditDialogOpen(false);
                    setEditingTemplate(null);
                }
                else {
                    const message = response.data.message || response.data.Message;
                    if (message) {
                        showToaster(message, "error");
                    } else {
                        console.error("No message found in response");
                    }
                }
            })
        );
    };

    const columns: MRT_ColumnDef<Template>[] = useMemo(
        () => [
            {
                accessorKey: "templateName",
                header: "Template Name",
                Cell: ({ row }) => (
                    <>
                        <span className="hightLightTd" onClick={() => handleOpenPreview(row.original)}>
                            {row.original.templateName}
                        </span>
                    </>
                ),
            },

            {
                accessorKey: "subject",
                header: "Subject",
                Cell: ({ row }) => (
                    <span>
                        {row.original.subject}
                    </span>
                ),
            },
            {
                accessorKey: "Type",
                header: "Type",
                Cell: ({ row }) => (
                    <span>
                        {row.original.Type}
                    </span>
                ),
            },
            {
                accessorKey: "templateType",
                header: "Template Type",
                Cell: ({ row }) => (
                    <span>
                        {
                            row.original.templateType ?
                                (Number(row.original.templateType) === 1) ? "System generated" :
                                    (Number(row.original.templateType) === 2) ? "User created"
                                        : ""
                                : ""
                        }
                    </span>
                ),
            },
            {
                accessorKey: "Actions",
                header: "Action",
                Cell: ({ row }) => (
                    <>
                        {
                            ((Number(row.original.templateType) !== 1) || (userLocalData.getvalue('recrId') === 2)) ?
                                <Stack direction="row">
                                    <Tooltip title="Clone" placement="top" color="primary">
                                        <IconButton onClick={() => {
                                            setCloneTemplateType("Email");
                                            cloneDialog(row.original, () => { });
                                        }}>
                                            <ContentCopy />
                                        </IconButton>
                                    </Tooltip>
                                    {canEditOrDelete(row.original.modifyBy) && (
                                        <>
                                            {userLocalData.checkIntegration(ID_ROLE_EMAIL_AND_SMS_CAN_EDIT_VIEW_MESSAGE_TEMPLATES) ? <Tooltip title="Edit" placement="top" color="primary">
                                                <IconButton onClick={() => handleEditTemplate(row.original.templateId, row.original.Type)} >
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>
                                                : null
                                            }
                                            {userLocalData.checkIntegration(ID_ROLE_EMAIL_AND_SMS_CAN_EDIT_DELETE_MESSAGE_TEMPLATES) ?
                                                <Tooltip title="Delete" placement="top" color="primary">
                                                    <IconButton onClick={() => handleDeleteEmailTemplate(row.original.templateId, row.original.templateName, row.original.Type)}>
                                                        <DeleteOutlineIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                : null
                                            }
                                        </>
                                    )}
                                </Stack>
                                : null
                        }
                    </>

                ),
            },

        ],
        []
    );
    const handleOpenPreview = (template: Template) => {
        setSelectedPreviewTemplate(template);
        setPreviewOpen(true);
    };

    const handleClosePreview = () => {
        setPreviewOpen(false);
        setSelectedPreviewTemplate(null);
    };

    const columnssms: MRT_ColumnDef<SmsTemplate>[] = useMemo(
        () => [
            // {
            //     accessorKey: "SMSName",
            //     header: "SMS Name",
            //     Cell: ({ row }) => (
            //         <span>
            //             {row.original.SMSName}
            //         </span>
            //     ),
            // },
            {
                accessorKey: "SMSName",
                header: "Name",
                Cell: ({ row }) => (
                    <span className="hightLightTd" onClick={() => handleOpenSmsPreview(row.original)}>
                        {row.original.SMSName}
                    </span>
                ),
            },


            // {
            //     accessorKey: "fromPhone",
            //     header: "from Phone",
            //     Cell: ({ row }) => (
            //         <span>
            //             {row.original.fromPhone}
            //         </span>
            //     ),
            // },

            {
                accessorKey: "Body",
                header: "Body",
                Cell: ({ row }) => (
                    <span>
                        {row.original.Body}
                    </span>
                ),
            },
            {
                accessorKey: "Actions",
                header: "Action",
                Cell: ({ row }) => (

                    <Stack direction="row">
                        <Tooltip title="Clone" placement="top" color="primary">
                            <IconButton onClick={() => {
                                setCloneTemplateType("SMS");
                                cloneDialog(row.original, () => { });
                            }}>
                                <ContentCopy />
                            </IconButton>
                        </Tooltip>
                        {canEditOrDelete(row.original.createdBy) && (
                            <>
                                <Tooltip title="Edit" placement="top" color="primary">
                                    <IconButton onClick={() => handleEditSmsTemplate(row.original.SmsId)}  >
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete" placement="top" color="primary">
                                    <IconButton onClick=
                                        {() => {

                                            confirmDialog(`Are you sure you want to delete this SMS Template - ${row.original.SMSName}?`, () => {
                                                deleteSmsTemplate(row.original.SmsId);

                                            }, "warning");
                                        }}
                                    >
                                        <DeleteOutlineIcon />
                                    </IconButton>
                                </Tooltip>
                            </>
                        )}
                    </Stack>
                ),
            },
        ],
        []
    );
    const handleOpenSmsPreview = (template: SmsTemplate) => {
        console.log(template)
        setSelectedSmsPreviewTemplate(template);
        setSmsPreviewOpen(true);
    };

    const handleCloseSmsPreview = () => {
        setSmsPreviewOpen(false);
        setSelectedTemplateId(null);
    };

    const handleTabChange = (event: any, newValue: any) => {
        console.log(newValue)
        setTabValue(newValue);
        tabValueRef.current = newValue;
        setPagination(prev => ({
            ...prev,
            pageIndex: 0
        }));
    };

    const handleCloseEditDialog = () => {
        templateFormik.resetForm();
        setIsEditDialogOpen(false);
        setEditingTemplate(null);
        setTemplateEmailHtmlOpen(false);
        setEditDialogOpen(false);

    };

    const templateSchema = Yup.object().shape({
        templateName: Yup.string()
            .matches(/^[a-zA-Z0-9-_@() ]+$/, 'Template name can only contain letters, numbers, and spaces')
            .required('Template name is required'),
        description: Yup.string(),
        subject: Yup.string(),
        Type: Yup.string(),
    });

    const loadEmailTemplates = () => {
        // useCallback(
        // debounce(() => {
        const clientId = userLocalData.getvalue('clientId');
        const recrId = userLocalData.getvalue('recrId');
        console.log(recrId);
        console.log(tabValue);

        const endpoint = (tabValueRef.current === 'myTemplates')
            ? `getEmailTemplatesList/${recrId}/${clientId}`
            : `getEmailTemplatesList/0/${clientId}`;

        trackPromise(
            ApiService.getCall('admin', endpoint)
                .then((response) => {
                    setEmailTemplateList(response.data.List);
                    setRowCount(response.data.List.length);
                })
        );
        // }, 400),
        // []
        // );
    }

    // useEffect(() => {
    //     loadEmailTemplates();
    // }, [])


    console.log(tabValue);

    useEffect(() => {
        console.log(tabValue);
        if (templateType === 'Email') {
            loadEmailTemplates();
        } else {
            loadSmsTemplates();
        }
    }, [templateType, tabValue]);




    const templateFormik = useFormik<FormValues>({
        initialValues: {
            templateName: editingTemplate?.templateName || '',
            description: editingTemplate?.description || '',
            subject: editingTemplate?.subject || '',
            Type: editingTemplate?.Type || '',
        },
        onSubmit: (values: FormValues) => {
            // if (selectedTemplateId) {
            handleSaveEmailTemplate(selectedTemplateId, values);
            // }
        },
        validationSchema: templateSchema,
    });

    const smsFormik = useFormik({
        initialValues: {
            smsName: currentEditingTemplate ? currentEditingTemplate.SMSName : '',
            smsBody: currentEditingTemplate ? currentEditingTemplate.Body : '',
            fromPhone: currentEditingTemplate ? currentEditingTemplate.fromPhone : ''
        },
        onSubmit: (values) => {
            handleSaveSmsTemplate(values, selectedTemplateId);
        },

    });




    const handleEditSmsTemplate = (templateId: any) => {
        console.log(templateId);

        let clientId = userLocalData.getvalue('clientId');
        let recrId = userLocalData.getvalue('recrId');
        let tempSMSData: any = [];
        trackPromise(
            ApiService.getCall('admin', `getSmsList/${recrId}/${clientId}`)
                .then((response) => {
                    tempSMSData = response.data.list;
                    // setRowCount(tempSMSData.length)

                    const templateToEdit = tempSMSData.find((sms: any) => parseInt(sms.SmsId) === parseInt(templateId));
                    if (templateToEdit) {
                        setCurrentEditingTemplate(templateToEdit);

                        smsFormik.setValues({
                            smsName: templateToEdit.SMSName,
                            smsBody: templateToEdit.Body,
                            fromPhone: templateToEdit.fromPhone
                        });

                        setSelectedTemplateId(templateId);
                        setEditDialogOpen(true);

                    } else {
                        smsFormik.resetForm();
                        setSelectedTemplateId(0);
                    }

                })
        );


    };
    const handleAddSmsTemplate = () => {
        smsFormik.resetForm();
        setSelectedTemplateId(0);
        setEditDialogOpen(true);
    };
    const handleCloseSmsDialog = () => {
        smsFormik.resetForm();
        setEditDialogOpen(false);
    };

    const handleEditorChange = (content: string) => {
        templateFormik.setFieldValue('description', content);
    };


    const handleSaveSmsTemplate = (values: any, SmsId: any) => {

        const smsIdInt = SmsId ? parseInt(SmsId, 10) : 0;

        if (values.smsName.trim() === "") {
            showToaster("Please Enter SMS Template Name", "warning");
            return false;
        } else if (values.smsBody.trim() === "") {
            showToaster("Please enter Body Message", "warning");
            return false;
        }

        // if(values.fromPhone.trim()===""){
        //     showToaster("Please enter Phone", "warning");
        //     return false;
        // }

        const data = {
            smsId: smsIdInt,
            smsName: values.smsName,
            fromPhone: values.fromPhone,
            body: values.smsBody,
            createdBy: userLocalData.getvalue('recrId'),
            clientId: userLocalData.getvalue('clientId'),
        };

        trackPromise(
            ApiService.postWithData('admin', `saveSms`, data)
                .then((response) => {
                    if (response.data.Success === true) {
                        showToaster("SMS Template saved successfully", "success");
                        smsFormik.resetForm()
                        loadSmsTemplates();
                        setEditDialogOpen(false);
                    } else {
                        showToaster(response.data.Message, "error");
                    }
                })
                .catch((error: any) => {
                    // console.log(error)
                    showToaster("An error occurred while saving the template", "error");
                })
        );
    };


    const deleteSmsTemplate = async (id: string) => {
        let clientId = userLocalData.getvalue('clientId')
        //    console.log(id)
        try {
            ApiService.deleteById('admin', `deleteSMS/${id}`, clientId)
                .then((response: any) => {
                    // setOpenDeletePopup(false);
                    if (response.data.Success === true) {
                        showToaster(response.data.Message, "success");
                        loadSmsTemplates();
                        setSelectedTemplateId(0);
                    } else if (response.data.Error === true) {
                        showToaster(response.data.Message, "error");
                    } else {
                        showToaster("Something went wrong", "error");
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
        catch (e) {
            // console.log(e)
            // setOpenDeletePopup(false);
        }
    }

    const smsBodyRef = useRef<any>();
    const insertSMSField = (field: string) => {

        let cursorPosition = smsBodyRef.current.selectionStart || 0;
        let textBeforeCursorPosition = smsBodyRef.current.value.substring(0, cursorPosition)
        let textAfterCursorPosition = smsBodyRef.current.value.substring(cursorPosition, smsBodyRef.current.value.length)
        // smsFormik.setFieldValue('smsBody', textBeforeCursorPosition + ` {{${field}}} ` + textAfterCursorPosition);
        const newText = textBeforeCursorPosition + ` {{${field}}} ` + textAfterCursorPosition;

        if (newText.length > 140) {
            showToaster('SMS body cannot exceed 140 characters.', 'error');
        } else {
            smsFormik.setFieldValue('smsBody', newText);
        }
        smsBodyRef.current.focus();

    };


    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        saveAuditLog(4257);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleReload = () => {
        setCloneTemplateType("");
        if (cloneTemplateType === "SMS") loadSmsTemplates();
        else loadEmailTemplates();
    }

    const placeHodlerListAPI = useCallback(debounce(() => {
        trackPromise(
            ApiService.postWithData('admin', 'placeHolders', {
                clientId: userLocalData.getvalue('clientId'),
                userIds: candidateId ? candidateId : "",
                jobId: jobId ? jobId : "",
                recrId: userLocalData.getvalue('recrId')
            }).then(
                (result: any) => {
                    if ((result.data.Success === "true" || result.data.Success) && result.data.PlaceHolders) {
                        localStorage.setItem('PlaceHolders', JSON.stringify(result.data.PlaceHolders))
                    } else {
                        console.log(result)
                    }


                }

            )
        )

    }, 300), [])

    useEffect(() => {
        // const Placeholders = localStorage.getItem('PlaceHolders');
        // if (!Placeholders) {
        // }
        placeHodlerListAPI();
    }, [])
    const saveAuditLog = (id: number) => {
        ApiService.saveAuditLog(id);
    }

    useEffect(() => {
        saveAuditLog(4252)
    }, []);

    const [emailSearchValue, setSearchValue] = useState("");
    const [smsSearchValue, setSmsSearchValue] = useState("");

    const EmailPaginatedData = useMemo(() => {
        const finalSearchValue = emailSearchValue.toLowerCase().trim();
        const records = emailTemplateList.filter((each) => {
            return each.templateName?.toLowerCase()?.includes(finalSearchValue) || each?.subject?.toLowerCase()?.includes(finalSearchValue)
        });
        setRowCount(records.length)
        return records;
    }, [emailTemplateList, emailSearchValue]);

    const smsPaginatedData = useMemo(() => {
        const finalSearchValue = smsSearchValue.toLowerCase().trim();
        const records = smsTemplateList.filter((each) => {
            return each.SMSName?.toLowerCase()?.includes(finalSearchValue) || each?.Body?.toLowerCase()?.includes(finalSearchValue)
        });
        setRowCount(records.length)
        return records;
    }, [smsTemplateList, smsSearchValue]);

    return (
        <div className="emailTemplateList pt-3 px-5">
            <Grid container direction="row" className="customCard px-4 py-2" justifyContent="space-between" alignItems="center" display="flex"
                sx={{ minHeight: 'auto !important' }}>
                <Stack direction="row" spacing={3}>
                    <Typography variant="h6" className="header, pt-1">Templates</Typography>
                    {
                        !userLocalData.isChromeExtensionEnabled() ?
                            <FormControl component="fieldset">
                                <RadioGroup row value={templateType} onChange={(e) => setTemplateType(e.target.value)} name="templateType">
                                    <FormControlLabel value="Email" control={<Radio />} label="Email Templates" onClick={() => saveAuditLog(4253)} />
                                    <FormControlLabel value="SMS" control={<Radio />} label="SMS Templates" onClick={() => saveAuditLog(4254)} />
                                </RadioGroup>
                            </FormControl>
                            :
                            null
                    }
                </Stack>

                <Stack direction="row" className="btn-container">
                    {templateType === 'Email' ?

                        <Button variant="contained" color="primary" size="small"
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            endIcon={<KeyboardArrowDownIcon />}
                        >
                            Create Email Template
                        </Button>
                        :
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddSmsTemplate}
                            sx={{ height: '40px', alignSelf: 'center' }}
                        >
                            {'Add SMS Template'}
                        </Button>
                    }

                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {
                            !userLocalData.isChromeExtensionEnabled() &&
                            <MenuItem onClick={() => {
                                templateFormik.setFieldValue("Type", 'HTML');
                                setSelectedTemplateId(0);
                                setTemplateEmailHtmlOpen(true);
                                handleClose();
                                saveAuditLog(4258);
                            }}>
                                <CodeIcon className='mr-3' /> HTML Template </MenuItem>
                        }
                        <MenuItem onClick={(e) => {
                            templateFormik.setFieldValue("Type", 'Text');
                            setSelectedTemplateId(0);
                            setIsEditDialogOpen(true);
                            handleClose();
                            saveAuditLog(4259);
                        }}> <NotesIcon className='mr-3' /> Text Template</MenuItem>
                    </Menu>
                </Stack>


            </Grid>
            <Grid>
                <Tabs
                    // className="customCard px-4 py-2" 
                    // sx={{ minHeight: 'auto !important' }}
                    value={tabValue} onChange={handleTabChange} className="tableTabs" aria-label="template tabs">
                    <Tab value="myTemplates" label="My Templates" onClick={() => saveAuditLog(4255)} />
                    <Tab value="allTemplates" label="All Templates" onClick={() => saveAuditLog(4256)} />
                </Tabs>
            </Grid>


            <div className="MRTableCustom pl-0">
                {templateType === 'Email' && (
                    <MaterialReactTable
                        columns={columns}
                        data={EmailPaginatedData}
                        initialState={{
                            density: 'compact',
                            showGlobalFilter: true,
                            columnPinning: { left: ['mrt-row-select', 'templateName'] },
                        }}
                        // enableFilters={false}
                        enableGlobalFilterModes
                        state={{
                            pagination,
                            globalFilter,
                        }}
                        muiPaginationProps={{
                            rowsPerPageOptions: [10],
                            showFirstButton: false,
                            showLastButton: false,
                            SelectProps: {
                                style: { display: 'none' }, // Hide the rows per page dropdown
                            },
                        }}
                        enablePagination={true}
                        icons={{
                            ArrowDownwardIcon: (props: any) => <SwitchLeftIcon {...props} />
                        }}
                        renderBottomToolbarCustomActions={() => (
                            <CustomPagination
                                page={pagination.pageIndex}
                                rowsPerPage={10}
                                rowCount={rowCount}
                                onChangePage={(page: any) => setPagination({ ...pagination, pageIndex: page, pageSize: 10 })}
                                showCount={false}
                            />
                        )}
                        onGlobalFilterChange={setGlobalFilter}
                        muiSearchTextFieldProps={{
                            value: emailSearchValue,
                            onChange: (e: any) => {
                                setPagination({ ...pagination, pageIndex: 0 });
                                setSearchValue(e.target.value);
                            },
                            slotProps: {
                                input: {
                                    startAdornment: <InputAdornment position="start"><SearchOutlined fontSize='small' htmlColor='#757575' /></InputAdornment>,
                                    endAdornment: <IconButton
                                        size='small'
                                        disabled={["", null, undefined].includes(emailSearchValue)}
                                        onClick={() => {
                                            setPagination({ ...pagination, pageIndex: 0 });
                                            setSearchValue("");
                                        }}
                                    ><CloseIcon fontSize='small' /></IconButton>
                                }
                            }
                        }}
                    />
                )}
                {templateType === 'SMS' && (
                    <MaterialReactTable
                        columns={columnssms}
                        data={smsPaginatedData}
                        initialState={{
                            density: 'compact',
                            showGlobalFilter: true,
                            columnPinning: { left: ['mrt-row-select', 'SMSName'] },
                        }}
                        // enableFilters={false}
                        enableGlobalFilterModes
                        state={{

                            pagination,
                            globalFilter,
                        }}
                        muiPaginationProps={{
                            rowsPerPageOptions: [10],
                            showFirstButton: false,
                            showLastButton: false,
                            SelectProps: {
                                style: { display: 'none' }, // Hide the rows per page dropdown
                            },
                        }}
                        enablePagination={true}
                        icons={{
                            ArrowDownwardIcon: (props: any) => <SwitchLeftIcon {...props} />
                        }}
                        renderBottomToolbarCustomActions={() => (
                            <CustomPagination
                                page={pagination.pageIndex}
                                rowsPerPage={10}
                                rowCount={rowCount}
                                onChangePage={(page: any) => setPagination({ ...pagination, pageIndex: page, pageSize: 10 })}
                                showCount={false}
                            />
                        )}
                        onGlobalFilterChange={setGlobalFilter}
                        muiSearchTextFieldProps={{
                            value: smsSearchValue,
                            onChange: (e: any) => {
                                setPagination({ ...pagination, pageIndex: 0 });
                                setSmsSearchValue(e.target.value);
                            },
                            slotProps: {
                                input: {
                                    startAdornment: <InputAdornment position="start"><SearchOutlined fontSize='small' htmlColor='#757575' /></InputAdornment>,
                                    endAdornment: <IconButton
                                        size='small'
                                        disabled={["", null, undefined].includes(smsSearchValue)}
                                        onClick={() => {
                                            setPagination({ ...pagination, pageIndex: 0 });
                                            setSearchValue("");
                                        }}
                                    ><CloseIcon fontSize='small' /></IconButton>
                                }
                            }
                        }}
                    />
                )}
            </div>


            {isEditDialogOpen ?
                <Dialog open={isEditDialogOpen} onClose={handleCloseEditDialog} fullWidth >
                    <form onSubmit={templateFormik.handleSubmit}>
                        <DialogTitle id="alert-dialog-title">
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <span className='addHeader'>
                                    Email Template
                                </span>
                                <div>
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="end"
                                        alignItems="center"
                                    >

                                        <Button variant="outlined"
                                            type='button'
                                            color="secondary"
                                            className='mr-2'
                                            onClick={handleCloseEditDialog}
                                        >Cancel</Button>
                                        <Button variant="contained"
                                            color="primary"
                                            type="submit" size='small'>
                                            {selectedTemplateId === 0 ? 'Add' : 'Update'}
                                        </Button>
                                    </Grid>
                                </div>
                            </Grid>
                        </DialogTitle>
                        <DialogContent >
                            <>

                                <TextField
                                    id="templateName"
                                    name="templateName"
                                    label="Template Name"
                                    fullWidth
                                    size="small"
                                    variant="standard"
                                    onChange={templateFormik.handleChange}
                                    value={templateFormik.values.templateName}
                                    margin="dense"
                                />
                                <ErrorMessage formikObj={templateFormik} name="templateName" isFormSubmitted={isFormSubmitted} />
                                <TextField
                                    id="subject"
                                    name="subject"
                                    label="Subject"
                                    size="small"
                                    fullWidth
                                    variant="standard"
                                    onChange={templateFormik.handleChange}
                                    value={templateFormik.values.subject}
                                    margin="dense"
                                />

                                <InputLabel>Description</InputLabel>
                                <Editor
                                    toolbarId='emailBody'
                                    id='emailBody'
                                    // handleChange={(content) => setEditingTemplate({ ...editingTemplate, description: content })}
                                    handleChange={handleEditorChange}

                                    editorHtml={templateFormik.values.description}
                                    mentions={true}
                                // saveTemplate={() => handleSaveEmailTemplate(3)
                                // }
                                />
                                {/* <DialogActions>
                                <Button color='primary' variant="outlined" size="small" onClick={handleCloseEditDialog}>Cancel</Button>
                                <Button color='primary' variant='contained' type="submit" size='small'>
                                    {selectedTemplateId === 0 ? 'Add' : 'Update'}
                                </Button>
                            </DialogActions> */}

                            </>
                        </DialogContent>
                    </form>
                </Dialog>
                :
                null
            }
            {editDialogOpen ?
                <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
                    <form onSubmit={smsFormik.handleSubmit}>
                        {/* <DialogTitle>Edit SMS Template</DialogTitle> */}
                        <DialogContent>
                            <TextField
                                margin="dense"
                                className='template_textfield'
                                id="smsName"
                                name="smsName"
                                label="Template Name"
                                type="text"
                                fullWidth
                                size="small"
                                variant="outlined"
                                value={smsFormik.values.smsName}
                                onChange={smsFormik.handleChange}
                            />
                            <TextField
                                margin="dense"
                                id="smsBody"
                                name="smsBody"
                                label="SMS Body"
                                inputRef={smsBodyRef}
                                type="text"
                                size="small"
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                                value={smsFormik.values.smsBody}
                                // onChange={smsFormik.handleChange}
                                // value={smsFormik.values.desc}
                                onChange={ta1HandleChange}
                            />
                            <div style={{ marginLeft: "419px" }}>

                                {smsFormik.values.smsBody.length} of {maxCharacterCount} characters
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <PlaceHolders onInsertField={insertSMSField} />

                            <Button variant="outlined" color='primary' size="small" onClick={handleCloseSmsDialog}>Cancel</Button>
                            <Button variant="contained" color='primary' size="small" type="submit">
                                {selectedTemplateId === 0 ? 'Save' : 'Update'}
                            </Button>

                        </DialogActions>

                    </form>
                </Dialog>
                :
                null
            }
            {templateEmailHtmlOpen ?
                <Dialog maxWidth={'xl'} open={templateEmailHtmlOpen} onClose={handleCloseEditDialog} fullWidth >
                    <DialogTitle id="alert-dialog-title">
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <span style={{ fontWeight: 'bold' }}>Email Template </span>
                            <span onClick={handleCloseEditDialog}>
                                <CloseIcon />
                            </span>
                        </Grid>

                    </DialogTitle>
                    <DialogContent style={{ minHeight: 'calc(100vh - 200px)' }}>
                        <>
                            <EmailBuilderData templateId={selectedTemplateId} closePopup={() => { handleCloseEditDialog(); loadEmailTemplates(); }} />
                        </>
                    </DialogContent>

                </Dialog>
                :
                null
            }
            <CloneTemplate templateType={cloneTemplateType} reload={handleReload} />
            {
                previewOpen &&
                <Dialog open={previewOpen} onClose={handleClosePreview} fullWidth id="templates" >
                    <DialogTitle className='ml-5'><Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <span className='addHeader'>
                            Preview - {selectedPreviewTemplate?.templateName}
                        </span>
                        <div>
                            <Grid
                                container
                                direction="row"
                                justifyContent="end"
                                alignItems="center"
                            >

                                <Button variant="outlined"
                                    type='button'
                                    color="secondary"
                                    className='mr-2'
                                    onClick={handleClosePreview}
                                >Close</Button>

                            </Grid>
                        </div>
                    </Grid></DialogTitle>
                    <DialogContent >
                        <DialogContent pt-0>
                            {selectedPreviewTemplate && (
                                <Grid container spacing={2} >
                                    {/* <Grid size={12}>
                                    <span className="previewHeader">
                                        Template Name :
                                    </span>
                                    <span className='previewText'>{selectedPreviewTemplate.templateName}</span>
                                </Grid> */}
                                    <Grid size={12}>
                                        <span className="previewHeader">
                                            Subject :
                                        </span>
                                        <span className='previewText'>{selectedPreviewTemplate.subject}</span>
                                    </Grid>
                                    <Grid size={12}>
                                        <span className="previewHeader">
                                            Description :
                                        </span>
                                        <span className='previewText emailBody mt-2' dangerouslySetInnerHTML={{ __html: (selectedPreviewTemplate.Type === "HTML") ? selectedPreviewTemplate.htmlFile : selectedPreviewTemplate.description }} />

                                    </Grid>
                                </Grid>
                            )}
                        </DialogContent>
                    </DialogContent>

                </Dialog>
            }
            <Dialog id='templates' open={smsPreviewOpen} onClose={handleCloseSmsPreview} fullWidth >
                <DialogTitle>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <span className='addHeader'>
                            SMS Template Preview

                        </span>
                        <div>
                            <Grid
                                container
                                direction="row"
                                justifyContent="end"
                                alignItems="center"
                            >

                                <Button variant="outlined"
                                    type='button'
                                    color="secondary"
                                    className='mr-2'
                                    onClick={handleCloseSmsPreview}
                                >Cancel</Button>

                            </Grid>
                        </div>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    {selectedSmsPreviewTemplate && (
                        <Grid container spacing={2}>
                            <Grid size={12}>
                                <span className="previewHeader">
                                    SMS Template Name :
                                </span>
                                <span className='previewText'> {selectedSmsPreviewTemplate.SMSName}</span>
                            </Grid>
                            <Grid size={12}>
                                <span className="previewHeader">
                                    Body     :
                                </span>
                                <span className='previewText'>
                                    {selectedSmsPreviewTemplate.Body}
                                </span>
                            </Grid>

                        </Grid>
                    )}
                </DialogContent>

            </Dialog>
        </div>

    )
}

export default Templates;