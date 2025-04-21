import { useState, useEffect } from "../../../../shared/modules/React";
import { Dialog, DialogTitle, DialogContent } from '../../../../shared/modules/MaterialImports/Dialog';
import { Grid, InputLabel, TextField, Button } from '../../../../shared/modules/commonImports';
import Editor from '../../Letters/Sequence/EmailBody/EmailBody';
import { useFormik } from '../../../../shared/modules/Formik';
import ApiService from '../../../../shared/api/api';
import { showToaster } from '../../../shared/SnackBar/SnackBar';
import { userLocalData } from '../../../../shared/services/userData';

import { trackPromise } from '../../../../shared/modules/PromiseTrackter';

interface Template {
    templateId: string;
    templateName: string;
    subject: string;
    description: string;
    Type: string;
}
interface FormValues {
    templateName: string;
    description: string;
    subject: string;
    Type: string;
}


const AddTemplates = () => {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    // const [emailTemplateList, setEmailTemplateList] = useState<Template[]>([]);
    const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
    const [selectedTemplateId, setSelectedTemplateId] = useState<any | null>(null);
    // const [templateEmailHtmlOpen, setTemplateEmailHtmlOpen] = useState(false);
    // const [templateEmailOpen, setTemplateEmailOpen] = useState(false);
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
    const loadEmailTemplates = () => {
        let clientId = userLocalData.getvalue('clientId');
        let recrId = userLocalData.getvalue('recrId');
        trackPromise(
            ApiService.getCall('admin', `getEmailTemplatesList/${recrId}/${clientId}`)
                .then((response) => {
                    //  console.log(response.data.List);
                    // setEmailTemplateList(response.data.List);
                    setSelectedTemplateId(response.data.List.templateId);
                })
        );
    };



    const handleEditorChange = (content: string) => {
        templateFormik.setFieldValue('description', content);
    };
    const handleCloseEditDialog = () => {
        templateFormik.resetForm();
        setIsEditDialogOpen(false);
        setEditingTemplate(null);
        // setTemplateEmailHtmlOpen(false);
        // setTemplateEmailOpen(false);

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
            ApiService.postWithData(214, 'saveEmailTemplates', data).then((response) => {
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
    useEffect(() => {
        loadEmailTemplates();
    }, []);
    return (
        <Dialog open={isEditDialogOpen} maxWidth={'sm'} fullWidth={true} onClose={handleCloseEditDialog}>
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
    )
}

export default AddTemplates;