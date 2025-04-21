import { useState, useEffect } from "../../../../shared/modules/React";
import { Typography } from '../../../../shared/modules/MaterialImports/Typography';
import { Grid, Button, InputLabel, TextField } from '../../../../shared/modules/commonImports';
import { Box } from '../../../../shared/modules/MaterialImports/Box';
import { Tabs, Tab } from '../../../../shared/modules/MaterialImports/Tabs';
import { Card, CardContent } from '../../../../shared/modules/MaterialImports/Card';
import Pagination from '@mui/material/Pagination';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem } from "../../../../shared/modules/MaterialImports/Menu";
import { trackPromise } from '../../../../shared/modules/PromiseTrackter';
import { userLocalData } from '../../../../shared/services/userData';
import ApiService from '../../../../shared/api/api';
import { showToaster } from "../../../shared/SnackBar/SnackBar";
import { useFormik } from '../../../../shared/modules/Formik';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent, DialogTitle, DialogActions } from '../../../../shared/modules/MaterialImports/Dialog';
import Editor from '../../Letters/Sequence/EmailBody/EmailBody';
import { confirmDialog } from "../../../shared/ConfirmDialog/ConfirmDialog";
import EmailBuilderData from "../../Letters/EmailBuilder/Add/EmailBuilderData";
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import { ExpandMoreIcon } from "../../../../shared/modules/MaterialImports/Accordion";


interface Template {
    templateId: string;
    templateName: string;
    subject: string;
    description: string;
    Type: string;
}

interface SmsTemplate {
    SmsId: string;
    SMSName: string;
    fromPhone: string;
    Body: string;

}

interface FormValues {
    templateName: string;
    description: string;
    subject: string;
    Type: string;
}

export default function Templates() {

    const isMessageTemplatesAddSettingEnabled = (userLocalData.checkSettings(130001) === 5) || (userLocalData.checkSettings(130001) === 6);
    const isMessageTemplatesDeleteSettingEnabled = (userLocalData.checkSettings(130001) === 6);


    const [templateEmailHtmlOpen, setTemplateEmailHtmlOpen] = useState(false);
    const [templateEmailOpen, setTemplateEmailOpen] = useState(false);
    const [tabValue, setTabValue] = useState('Email Templates');
    const [page, setPage] = useState(1);
    const itemsPerPage = 3;
    const [emailTemplateList, setEmailTemplateList] = useState<Template[]>([]);
    const [smsTemplateList, setSmsTemplateList] = useState<SmsTemplate[]>([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    // const [openDeletePopup, setOpenDeletePopup] = useState(false);
    const [selectedTemplateId, setSelectedTemplateId] = useState<any | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
    const [currentEditingTemplate, setCurrentEditingTemplate] = useState<SmsTemplate | null>(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);

    const loadEmailTemplates = () => {
        let clientId = userLocalData.getvalue('clientId');
        let recrId = userLocalData.getvalue('recrId');
        trackPromise(
            ApiService.getCall(214, `getEmailTemplatesList/${recrId}/${clientId}`)
                .then((response) => {
                    //  console.log(response.data.List);
                    setEmailTemplateList(response.data.List);
                    setSelectedTemplateId(response.data.List.templateId);
                })
        );
    };
    const loadSmsTemplates = () => {
        let clientId = userLocalData.getvalue('clientId');
        let recrId = userLocalData.getvalue('recrId');
        trackPromise(
            ApiService.getCall('admin', `getSmsList/${recrId}/${clientId}`)
                .then((response) => {
                    setSmsTemplateList(response.data.list);
                })
        );
    };


    const [templateType, SetTemplateType] = useState('');

    // const handleEmailTemplateChange =  (event: SelectChangeEvent)  => {
    //     let tempType = event.target.value;
    //     SetTemplateType(event.target.value  as string);

    //     (tempType === "text")? setIsEditDialogOpen(true) : setIsEditDialogOpen(false);
    //     console.log(tempType);
    //  //   setIsEditDialogOpen(true);

    // };

    useEffect(() => {
        if (tabValue === 'Email Templates') {
            loadEmailTemplates();
        } else {
            loadSmsTemplates();
        }
    }, [tabValue]);

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


    const handleEditTemplate = (templateId: any) => {
        const templateToEdit = emailTemplateList.find(template => template.templateId === templateId);
        //  console.log(templateToEdit);
        if (templateToEdit) {
            templateFormik.setValues({
                templateName: templateToEdit.templateName,
                description: templateToEdit.description,
                subject: templateToEdit.subject,
                Type: templateToEdit.Type,
            });
            setSelectedTemplateId(templateId);
            (templateToEdit.Type === "Text") ? setIsEditDialogOpen(true) : setTemplateEmailHtmlOpen(true);

        }
    };

    const handleEditorChange = (content: string) => {
        templateFormik.setFieldValue('description', content);
    };
    const handleEditSmsTemplate = (templateId: any) => {
        const templateToEdit = smsTemplateList.find(sms => sms.SmsId === templateId);
        if (templateToEdit) {
            setCurrentEditingTemplate(templateToEdit);
            setEditDialogOpen(true);

            smsFormik.setValues({
                smsName: templateToEdit.SMSName,
                smsBody: templateToEdit.Body,
                fromPhone: templateToEdit.fromPhone
            });
            setSelectedTemplateId(templateId);
        } else {

            smsFormik.resetForm();
            setSelectedTemplateId(0);
        }
    };

    const handleSaveEmailTemplate = (id: number, { templateName, description, subject }: FormValues) => {

        if (templateName.trim() === "") {
            showToaster("Please Enter Email Template Name", "warning");
            return false;
        } else if (subject.trim() === "") {
            showToaster("Please enter Email Template Subject", "warning");
            return false;
        } else if ((description.trim() === "") || (description.trim() === "<p></p>") || (description.trim() === "<p><br></p>")) {
            showToaster("Please enter Email Template Description", "warning");
            return false;
        }

        const data = {
            "templateId": id,
            "templateName": templateName,
            "description": description,
            "subject": subject,
            "type": 2,
            "isActive": false,
            "createdBy": userLocalData.getvalue('recrId'),
            "clientId": userLocalData.getvalue('clientId'),
        };
        trackPromise(
            ApiService.postWithData('admin', 'saveEmailTemplates', data).then((response) => {
                //  console.log(response.data);
                if (response.data.Success === true) {
                    showToaster("Email Template Updated Successfully", "success");
                    templateFormik.resetForm();
                    loadEmailTemplates();
                    setIsEditDialogOpen(false);
                    setEditingTemplate(null);
                } else {
                    showToaster(response.data.Message, "error");
                }
            })
        );
    };
    const handleSaveSmsTemplate = (values: any, SmsId: any) => {

        const smsIdInt = SmsId ? parseInt(SmsId, 10) : 0;

        if (values.smsName.trim() === "") {
            showToaster("Please Enter SMS Name", "warning");
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
            ApiService.postWithData(214, `saveSms`, data)
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
    const deleteEmailTemplate = async (id: string) => {
        let clientId = userLocalData.getvalue('clientId')
        console.log(id)
        try {
            ApiService.deleteById('admin', `deleteEmailTemplates/${id}`, clientId)
                .then((response: any) => {
                    // setOpenDeletePopup(false);
                    if (response.data.Success === true) {
                        showToaster(response.data.Message, "success");
                        loadEmailTemplates()

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

    const deleteSmsTemplate = async (id: string) => {
        let clientId = userLocalData.getvalue('clientId')
        console.log(id)
        try {
            ApiService.deleteById(214, `deleteSMS/${id}`, clientId)
                .then((response: any) => {
                    // setOpenDeletePopup(false);
                    if (response.data.Success === true) {
                        showToaster(response.data.Message, "success");
                        loadSmsTemplates()
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

    const handleClick = (event: any, templateId: any) => {
        setAnchorEl(event.currentTarget);
        setSelectedTemplateId(templateId);
    };

    const handleCloseEditDialog = () => {
        templateFormik.resetForm();
        setIsEditDialogOpen(false);
        setEditingTemplate(null);
        setTemplateEmailHtmlOpen(false);
        setTemplateEmailOpen(false);

    };

    const handleClose = () => {
        setAnchorEl(null);
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

    // useEffect(() => {
    //     if (open && smsTemplates) {
    //         smsFormik.setValues({
    //             smsName: smsTemplates.smsName || '',
    //             smsBody: smsTemplates.smsBody || '',
    //             fromPhone: smsTemplates.fromPhone || '',
    //         });
    //     }
    // }, [open, smsTemplates, smsFormik.setValues]);

    // useEffect(() => {
    //     if (isEditDialogOpen && editingTemplate) {
    //         templateFormik.setValues({
    //             templateName: editingTemplate.templateName || '',
    //             description: editingTemplate.description || '',
    //             subject: editingTemplate.subject || '',

    //         });
    //     }
    // }, [isEditDialogOpen, editingTemplate, templateFormik.setValues]);

    const renderAddButton = () => (
        <Button
            variant="contained"
            color="primary"
            onClick={tabValue === 'Email Templates' ? handleAddEmailTemplate : handleAddSmsTemplate}
            sx={{ height: '40px', alignSelf: 'center' }}
        >
            {tabValue === 'Email Templates' ? 'Add Email Template' : 'Add SMS Template'}
        </Button>
    );
    const handleAddEmailTemplate = () => {
        templateFormik.resetForm();
        setSelectedTemplateId(0);
        setTemplateEmailOpen(true);
    };


    const handleTabChange = (event: any, newValue: any) => {
        setTabValue(newValue);
        setPage(1);
    };

    const currentList = tabValue === 'Email Templates' ? emailTemplateList : smsTemplateList;

    return (
        <div className="emailTemplateList pt-3 px-5">
            {/* <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 2 }}
            >
                <Typography variant="h6">Templates</Typography>
            </Grid> */}
            <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="h6">Templates</Typography>
                {renderAddButton()}
            </Grid>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="template tabs">
                <Tab value="Email Templates" label="Email Templates" />
                <Tab value="SMS Templates" label="SMS Templates" />
            </Tabs>
            {tabValue === 'Email Templates' ?
                <Grid>
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        {currentList.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((template: any) => (
                            <Grid size={12} sm={6} md={4} key={template.templateId}>
                                <Card className="mt-1" sx={{ p: 2, border: '1px solid #c8c9c9', margin: "12px", width: "250px", height: "300px", borderRadius: "0px" }}>
                                    <Button
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}

                                        sx={{ float: "right", color: "black" }}
                                        onClick={(event) => handleClick(event, template.templateId)}

                                    >
                                        <MoreVertIcon />
                                    </Button>

                                    <CardContent>

                                        <Typography variant="h5" component="div">
                                            {template.templateName}
                                        </Typography>
                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                            {template.subject}
                                        </Typography>
                                        <Typography sx={{ mb: 1.5 }} color="text.secondary" dangerouslySetInnerHTML={{ __html: template.description }}>

                                        </Typography>

                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={() => {
                            handleClose(); // Close the menu
                            handleEditTemplate(selectedTemplateId);
                        }}>Edit</MenuItem>
                        <MenuItem onClick={() => {
                            handleClose();
                            confirmDialog('Are you sure you want to delete this Email Template?', () => {
                                deleteEmailTemplate(selectedTemplateId);
                            }, "warning");
                        }}
                        >Delete</MenuItem>
                    </Menu>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Pagination
                            count={Math.ceil(currentList.length / itemsPerPage)}
                            page={page}
                            onChange={(event, value) => setPage(value)}
                            color="primary"
                        />
                    </Box>
                </Grid>
                :
                <Grid>

                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        {currentList.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((template: any, index: any) => (
                            <Grid size={12} sm={6} md={4} key={index}>
                                <Card className="mt-1" sx={{ p: 2, border: '1px solid #c8c9c9', margin: "12px", width: "250px", height: "300px", borderRadius: "0px" }}>
                                    <Button
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}

                                        sx={{ float: "right", color: "black" }}
                                        onClick={(event) => handleClick(event, template.SmsId)}
                                    >
                                        <MoreVertIcon />
                                    </Button>
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            {template.SMSName}
                                        </Typography>
                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                            {template.fromPhone}
                                        </Typography>
                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                            {template.Body}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
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
                            isMessageTemplatesAddSettingEnabled ?
                                <MenuItem onClick={() => {
                                    handleClose();
                                    handleEditSmsTemplate(selectedTemplateId)
                                }}>Edit</MenuItem>
                                :
                                null
                        }
                        {isMessageTemplatesDeleteSettingEnabled ?
                            <MenuItem
                                onClick={() => {
                                    handleClose()
                                    confirmDialog('Are you sure you want to delete this SMS Template?', () => {
                                        deleteSmsTemplate(selectedTemplateId);

                                    }, "warning");
                                }}
                            >Delete</MenuItem>
                            :
                            null
                        }
                    </Menu>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Pagination
                            count={Math.ceil(currentList.length / itemsPerPage)}
                            page={page}
                            onChange={(event, value) => setPage(value)}
                            color="primary"
                        />
                    </Box>
                </Grid>
            }


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
                                EMail Template
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

            <Dialog open={editDialogOpen} onClose={handleClose}>
                <form onSubmit={smsFormik.handleSubmit}>
                    {/* <DialogTitle>Edit SMS Template</DialogTitle> */}
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="smsName"
                            name="smsName"
                            label="SMS Name"
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
                            type="text"
                            size="small"
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                            value={smsFormik.values.smsBody}
                            onChange={smsFormik.handleChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" color='primary' size="small" onClick={handleCloseSmsDialog}>Cancel</Button>
                        <Button variant="contained" color='primary' size="small" type="submit">
                            {selectedTemplateId === 0 ? 'Add' : 'Update'}
                        </Button>
                    </DialogActions>

                </form>
            </Dialog>


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
                <DialogContent >
                    <>
                        <EmailBuilderData templateId={selectedTemplateId} />
                    </>
                </DialogContent>

            </Dialog>


            <Dialog
                open={templateEmailOpen}
                onClose={() => setTemplateEmailOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className='communityModal'
            >
                <DialogTitle id="alert-dialog-title">
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <span style={{ fontWeight: 'bold' }}>Email Template </span>
                        <span onClick={() => setTemplateEmailOpen(false)}>
                            <CloseIcon />
                        </span>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{
                        minWidth: '500px',
                        p: 5
                    }}>

                        <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Button variant="outlined" color="secondary" size="small" onClick={(e) => {
                                templateFormik.setFieldValue("Type", 'Text');
                                setIsEditDialogOpen(true);
                                setTemplateEmailOpen(false)
                            }}  >Add Text Template</Button>

                            <Button variant="outlined" color="secondary" size="small" onClick={(e) => {
                                templateFormik.setFieldValue("Type", 'HTML');
                                setTemplateEmailHtmlOpen(true);
                                setTemplateEmailOpen(false)
                            }}  >Add Html Template</Button>
                        </Grid>

                    </Box>
                </DialogContent>

            </Dialog>

        </div >
    );
}
