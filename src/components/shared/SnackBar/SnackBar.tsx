import { forwardRef } from 'react';
import { SyntheticEvent } from '../../../shared/modules/React';
import { Stack } from '../../../shared/modules/MaterialImports/Stack';
// import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import { create } from 'zustand';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type ShowSnackStore = {
    message: string;
    alertType: AlertColor;
    open: boolean;
    // onSubmit?: () => void;
    close: () => void;
};

const useShowSnackStore = create<ShowSnackStore>((set: any) => ({
    message: 'This is a success message!',
    alertType: 'success',
    open: false,
    // onSubmit: undefined,
    close: () => set({ open: false }),
}));

export const showToaster = (message: string, alertType: AlertColor) => {
    useShowSnackStore.setState({
        message,
        alertType,
        open: true
    });
};
export const ToasterSnackbar = () => {

    const { message, alertType, open, close } = useShowSnackStore();

    // const [open, setOpen] = React.useState(false);
    // const [message, setMessage] = React.useState('This is a success message!');
    // const [alertType, setAlertType] = React.useState<AlertColor>('success');

    // const handleClick = () => {
    //     setOpen(true);
    // };

    // const openSnackBar = (message: string, alertType: AlertColor) => {
    //     setOpen(true);
    //     setMessage(message);
    //     setAlertType(alertType);
    // };

    const handleClose = (_event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        close();
    };

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            {/* <Button variant="outlined" onClick={handleClick}>
                Open success snackbar
            </Button> 
            <Alert severity="error">This is an error message!</Alert>
            <Alert severity="warning">This is a warning message!</Alert>
            <Alert severity="info">This is an information message!</Alert>
            <Alert severity="success">This is a success message!</Alert> */}
            <Snackbar
                open={open}
                autoHideDuration={3500}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Stack>
    );
}
