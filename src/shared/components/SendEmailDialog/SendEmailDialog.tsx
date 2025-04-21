import { useState } from '../../../shared/modules/React';
import { Close } from '@mui/icons-material';

import { Box } from '../../../shared/modules/MaterialImports/Box';
import { IconButton } from '../../../shared/modules/MaterialImports/Button';
import { TextField } from '../../../shared/modules/MaterialImports/TextField';
import { Grid } from '../../../shared/modules/MaterialImports/Grid';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '../../../shared/modules/MaterialImports/Dialog';
import { Button, showToaster } from '../../modules/commonImports';

import { create } from 'zustand';
// import Alert from '@mui/material/Alert';

import ApiService from '../../api/api'

import './SendEmailDialog.scss';
import { trackPromise } from 'react-promise-tracker';
import { userLocalData } from '../../services/userData';
// import { Chips } from 'primereact/chips';

type SendEmailDialogStore = {
    data: {
        subject: string;
        emailBody: string;
    };
    onSubmit?: () => void;
    close: () => void;
};

const useSendEmailDialogStore = create<SendEmailDialogStore>((set) => ({
    data: {
        subject: "",
        emailBody: ""
    },
    onSubmit: undefined,
    close: () => set({ onSubmit: undefined }),
}));

export const setSendEmailDialogData = (data: any, onSubmit: () => void) => {
    useSendEmailDialogStore.setState({
        data,
        onSubmit,
    });
};


export const SendEmailDialog = () => {

    const { data, onSubmit, close } = useSendEmailDialogStore();
    const [toName, setToName] = useState<string>('');
    const [toEmails, setToEmails] = useState<string>('');


    const validateEmail = (email: string) => {
        // return email.match(
        //     /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        // );
        // eslint-disable-next-line no-useless-escape
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email)) {
            showToaster('Enter Valid Email', 'warning');
            return false
        }
        // return re.test(email);
        return true;
    };

    const sendEmail = () => {
        if (!toName) {
            showToaster('Enter To Name', 'error');
        } else if (!validateEmail(toEmails)) {
            showToaster('Enter To Email', 'error');
        } else {
            let dataToPass = {
                "fromName": userLocalData.getvalue('recrFullName'),
                "fromAddress": userLocalData.getvalue('email'),
                "email": toEmails,
                "toName": toName,
                "subject": data.subject,
                "body": data.emailBody,
                "clientId": userLocalData.getvalue('clientId')
            };

            trackPromise(
                ApiService.postWithData('admin', 'previewmail', dataToPass).then((response: any) => {
                    if (response.data.Status === 200) {
                        showToaster('Preview Email has been Send.', 'success');
                        close();
                    } else {
                        showToaster('An error occurred while sending Preview Email', 'error');
                    }
                })
            );
        }
    }

    return (
        <Dialog open={Boolean(onSubmit)} onClose={close} maxWidth="sm" fullWidth>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <DialogTitle sx={{ fontSize: 14 }}>Send Email Preview</DialogTitle>
                <IconButton onClick={close}>
                    <Close />
                </IconButton>
            </Box>
            <DialogContent>

                {/* <Chips
                    value={toEmails}
                    onChange={(e) => setToEmails(e.value)}
                    // name={}
                    id='toEmails'
                    className='mailInputs ccInput'
                    allowDuplicate={false}
                    addOnBlur={true}
                    onAdd={(e) => validateEmail(e.value)}
                /> */}
                <div className='p-4 mb-4 previewEmail' dangerouslySetInnerHTML={{ __html: data.emailBody }}>
                </div>
                <Grid
                    container
                    spacing={2}
                >
                    <Grid size={12}>
                        <label>Send to Email</label>
                    </Grid>
                    <Grid size={6} className="pt-1">
                        <TextField
                            id='toName'
                            type="text"
                            value={toName}
                            onChange={(e) => setToName(e.target.value)}
                            name='toName'
                            fullWidth
                            size='small'
                            className='mt-1 mb-2'
                            placeholder='Name'
                        />
                    </Grid>
                    <Grid size={6} className="pt-2">
                        <TextField
                            id='toEmails'
                            // select
                            type="text"
                            value={toEmails}
                            onChange={(e) => setToEmails(e.target.value)}
                            name='toEmails'
                            fullWidth
                            size='small'
                            placeholder='Email'
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => {
                        sendEmail();
                    }}
                    size='small'
                >
                    Send
                </Button>
                <Button
                    color="error"
                    variant="outlined"
                    onClick={close}
                    size='small'
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog >
    );
};

