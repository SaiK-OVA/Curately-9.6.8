import { Close } from '@mui/icons-material';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '../../../../../shared/modules/MaterialImports/Dialog';
import { Button, IconButton, TextField } from '../../../../../shared/modules/commonImports';
import { Box } from '../../../../../shared/modules/MaterialImports/Box';
import { useState } from '../../../../../shared/modules/React';
import { create } from 'zustand';
import "../../../Letters/Workflow/List/CloneWorkflow/CloneWorkflow.scss";
import { showToaster } from '../../../../shared/SnackBar/SnackBar';
import { trackPromise } from '../../../../../shared/modules/PromiseTrackter';
import ApiService from "../../../../../shared/api/api";
import { userLocalData } from '../../../../../shared/services/userData';

type CloneStore = {
    templateData: any;
    isOpened?: () => void;
    close?: () => void;
};

const useCloneStore = create<CloneStore>((set) => ({
    templateData: '',
    isOpened: undefined,
    close: () => set({ isOpened: undefined }),
}));


export const cloneDialog = (templateData: any, isOpened: () => void) => {

    useCloneStore.setState({
        templateData,
        isOpened
    });
};

const CloneTemplate = ({ templateType, reload }: { templateType: "Email" | "SMS" | "", reload: any }) => {
    const { templateData, isOpened, close } = useCloneStore();
    const [templateName, setTemplateName] = useState("");

    const handleSubmitClick = () => {
        if (templateName) {

            if (templateType === "Email") {
                const payLoad = {
                    "clientId": userLocalData.getvalue('clientId'),
                    "templatedesc": templateData.description,
                    "isactive": templateData?.isActive || false,
                    "subject": templateData.subject,
                    "templateid": 0,
                    "type": templateData.Type === "HTML" ? 1 : 2,
                    "templateName": templateName,
                    "htmlFile": templateData.htmlFile,
                    "jsonFile": templateData.jsonFile,
                    [templateData.Type === 'Text' ? 'createdby' : 'createdBy']: userLocalData.getvalue('recrId')
                };

                const api_url = templateData?.Type === "HTML" ? "saveEmailBuilderTemplates" : "saveEmailTemplate";
                trackPromise(
                    ApiService.postWithData('admin', api_url, { ...payLoad })
                        .then(
                            (response: any) => {
                                if (response.data.Success || response.data == 'Success') {
                                    reload();
                                    if (close) {
                                        close();
                                    }
                                    setTemplateName("");
                                    showToaster('Cloned Email Template Successfully', 'success');
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
                        .catch((error) => {
                            showToaster("An error occurred while saving the template", "error");
                        }
                        )
                )
            } else if (templateType === "SMS") {
                const payLoad = {
                    smsId: 0,
                    smsName: templateName,
                    fromPhone: templateData.fromPhone,
                    body: templateData.Body,
                    createdBy: userLocalData.getvalue('recrId'),
                    clientId: userLocalData.getvalue('clientId'),
                };

                trackPromise(
                    ApiService.postWithData('admin', `saveSms`, { ...payLoad })
                        .then((response) => {
                            if (response.data.Success === true) {
                                reload();
                                if (close) {
                                    close();
                                }
                                setTemplateName("");
                                showToaster('Cloned SMS Template Successfully', 'success');
                            } else {
                                showToaster(response.data.Message, "error");
                            }
                        })
                        .catch((error: any) => {
                            showToaster("An error occurred while saving the template", "error");
                        })
                );

            } else showToaster('Something went wrong', 'error');
        }
        else {
            showToaster(`Enter ${templateType} Template Name`, 'error');
        }
    }

    return (
        <Dialog open={Boolean(isOpened)} onClose={close} maxWidth="sm" fullWidth={false}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <DialogTitle>{`Clone ${templateType} Template`}</DialogTitle>
                <IconButton onClick={close}>
                    <Close />
                </IconButton>
            </Box>
            <DialogContent>
                <TextField
                    id='templateName'
                    type="text"
                    value={templateName}
                    onChange={
                        (e) => {
                            setTemplateName(e.target.value)
                        }
                    }
                    name='templateName'
                    fullWidth
                    size='small'
                    label={`${templateType} Template Name`}
                    className='mt-1 mb-2'
                    sx={{ width: 350 }}
                />
            </DialogContent>
            <DialogActions>
                <Button variant='contained' onClick={handleSubmitClick} size='small'>Clone</Button>
                <Button color="secondary" variant="outlined" onClick={() => {
                    if (close) {
                        close();
                    }
                    setTemplateName("");
                }} size='small'>
                    Cancel
                </Button>
            </DialogActions>

        </Dialog>
    )
}

export default CloneTemplate


