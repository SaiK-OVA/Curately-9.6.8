import { CloseOutlined } from '@mui/icons-material';
import AppBar from '@mui/material/AppBar/AppBar';
import Drawer from '@mui/material/Drawer';
import { IconButton } from '../../../shared/modules/MaterialImports/Button';
import { Stack } from '../../../shared/modules/MaterialImports/Stack';
import { Typography } from '../../../shared/modules/MaterialImports/Typography';
import './SmsComponent.scss';
import SubSms from "./SubSms/SubSms";

const SmsComponent = (
    { dialogOpen, onClose }:
        { dialogOpen: boolean, onClose: () => void; }
) => {
    return (
        <Drawer open={dialogOpen} onClose={onClose} anchor="right" id="SmsComponent">
            <AppBar variant="outlined" position="sticky" color="inherit" className='drawer-header'>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} >
                    <Typography variant='h6'>SMS</Typography>
                    <IconButton onClick={onClose} size='small'><CloseOutlined fontSize='small' /></IconButton>
                </Stack>
            </AppBar>
            <SubSms />
        </Drawer>
    )
}

export default SmsComponent;