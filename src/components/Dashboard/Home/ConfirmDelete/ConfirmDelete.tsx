import { React } from "../../../../shared/modules/React";
import { Dialog, DialogContent, DialogActions } from "../../../../shared/modules/MaterialImports/Dialog";
import { Button } from "../../../../shared/modules/MaterialImports/Button";


export interface ConfirmationDialogRawProps {
    value: string;
    open: boolean;
    onConfirmClose: any;
}

function ConfirmationDialogRaw(props: ConfirmationDialogRawProps) {
    const { onConfirmClose, value: valueProp, open, ...other } = props;
    const [value, setValue] = React.useState(valueProp);

    React.useEffect(() => {
        if (!open) {
            setValue(valueProp);
        }
    }, [valueProp, open]);


    const handleCancel = () => {
        onConfirmClose('');
    };

    const handleOk = (val: string) => {
        onConfirmClose(val);
    };
    // console.log(value);


    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
            maxWidth="xs"
            open={open}
            {...other}
        >
            {/* <DialogTitle></DialogTitle> */}
            <DialogContent dividers>
                Are you sure you want to delete?
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCancel}>
                    Cancel
                </Button>
                <Button onClick={() => handleOk(value)}>Ok</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmationDialogRaw;