import  {React} from '../../../../../../shared/modules/React';
import {Button} from '../../../../../../shared/modules/MaterialImports/Button';
import {Dialog, DialogTitle, DialogContent} from '../../../../../../shared/modules/MaterialImports/Dialog';
import { Box} from '../../../../../../shared/modules/MaterialImports/Box';
import  {Typography } from '../../../../../../shared/modules/MaterialImports/Typography';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContentText from '@mui/material/DialogContentText';
import CloseIcon from '@mui/icons-material/Close';
import './RightSection.scss'

interface SmsModalProps {
    openSmsPopup: any;
    rowId: any;
    localData: any;
    mobile: any,
    handleCloseSmsPopup: () => void;
}

const SmsModal: React.FC<SmsModalProps> = ({ rowId, openSmsPopup, handleCloseSmsPopup, localData, mobile }) => {

    let selectedlocalobj = localData.filter((item: any) => (
        item.id === rowId
    ))

    // console.log('selectedlocalobj', selectedlocalobj)
    // console.log('UserIddd', selectedlocalobj[0].userId)
    // console.log('mobile', mobile)

    return (
        <Dialog
            id={rowId}
            open={openSmsPopup}
            className='sms-popup-con'
            PaperProps={{
                style: {
                    width: 'calc(100% - 64px)',
                    maxWidth: '1200px',
                },
            }}
            onClose={handleCloseSmsPopup}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" sx={{ p: 0 }}>
                <Box className='sequnce-modal-header-con'>
                    <Typography className='sequnce-modal-header'>
                        Send SMS
                    </Typography>
                    <Button className='sequnce-modal-close-btn' onClick={handleCloseSmsPopup}>
                        <CloseIcon className='sequnce-modal-close-btn-icon' />
                    </Button>
                </Box>
            </DialogTitle>
            <DialogContent sx={{ overflowX: 'hidden' }}>
                <iframe
                    style={{
                        height: 'calc(100vh - 68px)',
                        width: '100%',
                        border: 0
                    }}
                    title="send-sms"
                    src={`https://search.accuick.com/Twilio/chat_number.jsp?userid=61&phone=4159803877&toNumber=${mobile}&candid=${selectedlocalobj.userId}`}>
                </iframe>
            </DialogContent>
            {/* <DialogActions>
                <Button onClick={handleCloseSmsPopup}>Disagree</Button>
                <Button onClick={handleCloseSmsPopup} autoFocus>
                    Agree
                </Button>
            </DialogActions> */}
        </Dialog>
    )
}


export default SmsModal