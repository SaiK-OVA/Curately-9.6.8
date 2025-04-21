import { Dialog, DialogContent, DialogTitle } from '../../../../../../shared/modules/MaterialImports/Dialog';
import { Divider } from '../../../../../../shared/modules/MaterialImports/Divider';
import { Grid, Button } from '../../../../../../shared/modules/commonImports';


import CloseFullscreenRoundedIcon from '@mui/icons-material/CloseFullscreenRounded';


const ResumePopup = ({ open, closePopup, htmlData }: {
    open: boolean;
    closePopup: () => void;
    htmlData: string;
}) => {
    const dataToShow = (htmlData && htmlData.trim()) ? htmlData.trim().replaceAll('\n', '<br>') : "";


    return (
        <div>
            <Dialog
                maxWidth={'lg'}
                open={open} fullWidth={true} className='AddUserModal customInputs'>
                <DialogTitle className='py-2'>
                    <Grid
                        container
                        direction="row"
                        justifyContent="end"
                        alignItems="center"
                    >
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

export default ResumePopup