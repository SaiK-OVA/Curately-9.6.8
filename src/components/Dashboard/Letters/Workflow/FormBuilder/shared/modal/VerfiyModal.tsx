import  {React, useState } from '../../../../../../../shared/modules/React'
import { Typography } from '../../../../../../../shared/modules/MaterialImports/Typography';
import {Stack} from '../../../../../../../shared/modules/MaterialImports/Stack';
import {TextField, Button, InputAdornment} from '../../../../../../../shared/modules/commonImports';
import {Box} from '../../../../../../../shared/modules/MaterialImports/Box';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import ApiService from '../../../../../../../shared/api/api';

import './VerifyModal.scss'

interface VerifyPhoneNumber {
    handleCloseVerifyModal(): any
    handleOpenCodeVerifyModal: (value: any, phone: any, formId: any) => void
    formValue: any;
    formId: any
}
const openWebSite = (link: string) => {
    window.open(link, '_blank');
};
const VerifyModal: React.FC<VerifyPhoneNumber> = ({ handleCloseVerifyModal, handleOpenCodeVerifyModal, formValue, formId }) => {
    const [phoneVal, setPhoneVal] = useState(formValue)
    const [isDisabled, setDisabled] = useState(true)
    const [sendOtpVal, setSendOtp] = useState<any>(null)

    const formatPhoneNumber = (value: any) => {

        const phoneNum = value.replace(/[^\d]/g, '')
        const phoneLength = phoneNum.length

        let phoneNumValue
        if (!value) {
            phoneNumValue = value
        }
        else if (phoneLength < 4) {
            phoneNumValue = phoneNum
        }
        else if (phoneLength < 7) {
            phoneNumValue = `${phoneNum.slice(0, 3)}-${phoneNum.slice(3)}`
        }
        else {
            phoneNumValue = `${phoneNum.slice(0, 3)}-${phoneNum.slice(3, 6)}-${phoneNum.slice(6, 10)}`
        }
        return phoneNumValue
    };

    const handlePhoneNumber = (e: any) => {
        const formattedValue = formatPhoneNumber(e.target.value);
        setPhoneVal(formattedValue)
    }

    const handleClose = async () => {
        let randomVal = Math.floor(1000 + Math.random() * 9000);
        let data = { "phone": phoneVal, "otp": randomVal }
        handleOpenCodeVerifyModal(randomVal, phoneVal, formId)
        try {
            const header: any = new Headers();
            header.append('Access-Control-Allow-Origin', '*');
            header.append("Content-Type", "multipart/form-data");
            ApiService.postWithHeaders(214, 'validatephonewithotp', data, header);

            setSendOtp(randomVal)
        }
        catch (e) {

        }
    }


    return (
        <Stack className='verify-modal-conatiner'>

            <Box className='verify-header-conatiner'>
                <Typography className='verify-modal-h2'>Verify your mobile number to receive notifications via SMS</Typography>
                <CloseRoundedIcon sx={{ fontSize: '24px', cursor: 'pointer', pt: 1 }} onClick={handleCloseVerifyModal} />
            </Box>

            <Typography className='verify-modal-para'>
                You agree to receive notifications via SMS on your mobile number {phoneVal}.
                These notifications include new job alerts, Timecard notifications.
                Number of notifications will vary based on your activity on the platform.
                Within your profile you can Turn On or Turn Off notification.
            </Typography>

            <Typography className='verify-modal-para'>
                Message and Data rates may apply, Text STOP to stop and HELP for help.
            </Typography>

            <Box className='verify-btn-conatiner'>

                <TextField
                    // className="input-controle"
                    size="small"
                    placeholder="123-456-7891"
                    fullWidth
                    type="tel"
                    label="Phone"
                    value={phoneVal}
                    onChange={handlePhoneNumber}
                    sx={{
                        width: '40%',
                        mr: '8px',
                        '& .MuiInputLabel-root': {
                            textAlign: 'center',  // Center the label text
                            fontSize: '13px',    // Change font size
                            fontWeight: 600,
                            fontFamily: 'Segoe UI',


                        },
                        '& .MuiInputBase-input.MuiOutlinedInput-input': {
                            color: '#1A1A1A',
                            fontSize: '13px',
                            fontWeight: 600,
                            fontFamily: 'Segoe UI',

                        },
                        '& .MuiInputBase-root.MuiOutlinedInput-root': {
                            pr: '5px'
                        },
                        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'var(--c-primary-color)',
                        },
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'var(--c-primary-color)',
                            borderWidth: '2px',
                        },
                    }}
                    // placeholder="123-456-7891"

                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Button
                                    disableRipple
                                    variant="contained"
                                    className="change-btn"
                                    onClick={() => setDisabled((prev) => !prev)}
                                    sx={{
                                        boxShadow: 0,
                                        '&:hover': {
                                            boxShadow: 0,
                                        }
                                    }}
                                >
                                    Change
                                </Button>
                            </InputAdornment>),
                        disabled: isDisabled
                    }}

                />

                <Button
                    disableRipple
                    onClick={handleClose}
                    variant='contained'
                    className='send-verify-btn'
                    disabled={phoneVal?.length < 12}
                >
                    Send Verification Code
                </Button>

            </Box>

            <Box className='verify-btn-conatiner'>
                <Typography className='verify-modal-para privacy-text' onClick={() => openWebSite('https://www.curately.ai/privacy')}>Privacy Policy</Typography>
                <Typography className='verify-modal-para privacy-text' onClick={() => openWebSite('https://www.curately.ai/terms')}>Terms & Conditions</Typography>
            </Box>

        </Stack>
    )
}

export default VerifyModal