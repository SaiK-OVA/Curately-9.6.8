import CloseFullscreenRoundedIcon from '@mui/icons-material/CloseFullscreenRounded';
import { Dialog, DialogTitle, Button, Divider, DialogContent } from '@mui/material';
import { Grid } from "../../../../shared/modules/MaterialImports/Grid";

const EmailPopup = ({ open, closePopup, htmlData, title }: {
    open: boolean;
    closePopup: () => void;
    htmlData: string;
    title:string;
}) => {
    const dataToShow = (htmlData && htmlData.trim()) ? htmlData.trim().replaceAll('\n', '<br>') : "";

    return (
        <div>
            <Dialog
                maxWidth={'sm'}
                open={open} fullWidth={true} className='AddUserModal customInputs'>
                <DialogTitle className='py-2'>
                
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <div>
                           {title}
                        </div>
                        <Button onClick={closePopup}><CloseFullscreenRoundedIcon /></Button>
                    </Grid>
                </DialogTitle>
                <Divider />
                <DialogContent className=''>

                    <div dangerouslySetInnerHTML={{ __html: dataToShow }}>

                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default EmailPopup