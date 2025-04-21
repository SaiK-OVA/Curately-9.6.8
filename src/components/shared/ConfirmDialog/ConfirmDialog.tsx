
import { Dialog, DialogContent, DialogActions } from '../../../shared/modules/MaterialImports/Dialog';
import { Box } from '../../../shared/modules/MaterialImports/Box';
import { Button, IconButton } from '../../../shared/modules/MaterialImports/Button';
import CloseIcon from '@mui/icons-material/Close';

import { create } from 'zustand';
import Alert, { AlertColor } from '@mui/material/Alert';

// import './ConfirmDialog.scss';

type ConfirmDialogStore = {
    message: string;
    alertType?: AlertColor;
    onSubmit?: () => void;
    close: () => void;
};

const useConfirmDialogStore = create<ConfirmDialogStore>((set) => ({
    message: '',
    alertType: 'error',
    onSubmit: undefined,
    close: () => set({ onSubmit: undefined }),
}));

export const confirmDialog = (message: string, onSubmit: () => void, alertType: AlertColor = "error") => {
    useConfirmDialogStore.setState({
        message,
        onSubmit,
        alertType
    });
};

// const useStyles = makeStyles((theme: any) => {
//   return {
//     actions: {
//       padding: theme.spacing(2),
//     },
//   };
// });

export const ConfirmDialog = () => {
    //   const c = useStyles();
    const { message, onSubmit, close, alertType } = useConfirmDialogStore();
    return (
        <Dialog open={Boolean(onSubmit)} onClose={close} maxWidth="sm" fullWidth>
            {/* <DialogTitle>Confirm the action</DialogTitle> */}
            <Box display="flex" justifyContent="flex-end" alignItems="center">
                <IconButton onClick={close}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <DialogContent>
                <Alert severity={alertType}>{message}</Alert>
            </DialogContent>
            <DialogActions>
                <Button color="secondary" variant="outlined" onClick={close} size='small'>
                    Cancel
                </Button>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => {
                        if (onSubmit) {
                            onSubmit();
                        }
                        close();
                    }}
                    size='small'

                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};
