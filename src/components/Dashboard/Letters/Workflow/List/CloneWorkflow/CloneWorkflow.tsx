import { useState } from '../../../../../../shared/modules/React';
import { Close } from '@mui/icons-material';
import {Dialog, DialogTitle, DialogContent, DialogActions} from '../../../../../../shared/modules/MaterialImports/Dialog';
import {Box} from '../../../../../../shared/modules/MaterialImports/Box';
import {Button, IconButton,  TextField} from '../../../../../../shared/modules/commonImports';
import { create } from 'zustand';

import './CloneWorkflow.scss';
// import { DateTime } from 'luxon';
import { trackPromise } from '../../../../../../shared/modules/PromiseTrackter';
import ApiService from '../../../../../../shared/api/api';
import { userLocalData } from '../../../../../../shared/services/userData';
import { showToaster } from '../../../../../shared/SnackBar/SnackBar';

type CloneStore = {
    id: string;
    isOpened?: () => void;
    close?: () => void;
};

const useCloneStore = create<CloneStore>((set) => ({
    id: '',
    isOpened: undefined,
    close: () => set({ isOpened: undefined }),
}));


export const cloneDialog = (id: string, isOpened: () => void) => {
    useCloneStore.setState({
        id,
        isOpened
    });
};

export const CloneWorkflow = ({ reload }: { reload: any }) => {
    const { id, isOpened, close } = useCloneStore();

    const [workflowName, setWorkflowName] = useState('');
    // console.log(id);


    const cloneWorkflow = () => {
        if (workflowName) {
            let data = {
                workflowId: id,
                workflowName: workflowName,
                recrId: userLocalData.getvalue('recrId')
            }
            trackPromise(

                ApiService.getByParams(193, 'Curately/Workflow/' + 'workflow_clone.jsp', data).then((response: any) => {
                    if (response.data.message === "success") {
                        reload();
                        if (close) {
                            close();
                        }
                        showToaster('Cloned Workflow Successfully', 'success');
                    } else {
                        showToaster(response.data.message, 'error');
                        // console.log(response.data);
                    }
                })
            );
        } else {
            showToaster('Enter Workflow Name', 'error');
        }
    }

    return (
        <Dialog open={Boolean(isOpened)} onClose={close} maxWidth="sm" fullWidth={false}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <DialogTitle>Clone Workflow</DialogTitle>
                <IconButton onClick={close}>
                    <Close />
                </IconButton>
            </Box>
            <DialogContent>
                <TextField
                    id='workflowName'
                    type="text"
                    value={workflowName}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            cloneWorkflow();
                        }
                    }}
                    onChange={
                        (e) => {
                            setWorkflowName(e.target.value)
                        }
                    }
                    name='workflowName'
                    fullWidth
                    size='small'
                    label='Workflow Name'
                    className='mt-1 mb-2'
                    sx={{ width: 350 }}
                />
            </DialogContent>
            <DialogActions>
                <Button variant='contained' onClick={cloneWorkflow} size='small'>Clone</Button>
                <Button color="secondary" variant="outlined" onClick={close} size='small'>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog >
    );
};

