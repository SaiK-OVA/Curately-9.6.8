import { useContext } from 'react';
import  {React, useState, } from '../../../../../../../shared/modules/React'

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import {Typography} from '../../../../../../../shared/modules/MaterialImports/Typography';
import {Stack} from '../../../../../../../shared/modules/MaterialImports/Stack';
import {TextField} from '../../../../../../../shared/modules/MaterialImports/TextField';
import {Box} from '../../../../../../../shared/modules/MaterialImports/Box';
import {Button} from '../../../../../../../shared/modules/MaterialImports/Button';
import { FormStore } from "../../../../../../../App";
import ApiService from '../../../../../../../shared/api/api';

// import useFormBuilderStore, { FORMBUILDER_STATE } from '../../../../../../../shared/store/FormBuilderStore';

// import { shallow } from 'zustand/shallow';


// const formBuilderSelector = (state: FORMBUILDER_STATE) => ({
//     formData: state.formData, 
//     setFormData: state.setFormData
// });

import './VerifyModal.scss';

interface CodeVerification {
    handleCloseVerifyCodeModal: (val: any) => void;
    otpToVerify: any
    phoneValue: any;
    formId: any
    isRefreshPage: any
}

const VerifyCode: React.FC<CodeVerification> = ({ handleCloseVerifyCodeModal, otpToVerify, phoneValue, formId, isRefreshPage }) => {

    const [otpValue, setOtpValue] = useState<any>(null)
    const [showError, setShowError] = useState(false)
    const [formData, setFormData] = useContext(FormStore);
    // const { formData, setFormData } = useFormBuilderStore(formBuilderSelector, shallow);
    const [resendOtpVal, setResendOtp] = useState<any>(null)

    const verifyOtp = (e: any) => {
        setOtpValue(e.target.value)
    }

    const handleSave = () => {
        if (!resendOtpVal) {
            if (otpToVerify === Number(otpValue)) {
                const newState = formData.map((obj: any) => {
                    if (obj.id === formId) {
                        return { ...obj, isPhoneVerified: true };
                    }
                    return obj;
                });
                setFormData(newState);
                setShowError(false)
                handleCloseVerifyCodeModal(!isRefreshPage)
            }
            else setShowError(true)
        }

        else {
            if (resendOtpVal === Number(otpValue)) {
                const newState = formData.map((obj: any) => {
                    if (obj.id === formId) {
                        return { ...obj, isPhoneVerified: true };
                    }
                    return obj;
                });
                setFormData(newState);
                setShowError(false)
                handleCloseVerifyCodeModal(!isRefreshPage)
            }
            else setShowError(true)
        }


    }

    const resendCode = async () => {
        let randomVal = Math.floor(1000 + Math.random() * 9000);
        let data = { "phone": phoneValue, "otp": randomVal }

        try {

            const header: any = new Headers();
            header.append('Access-Control-Allow-Origin', '*');
            header.append("Content-Type", "multipart/form-data");
            ApiService.postWithHeaders(214, 'validatephonewithotp', data, header);

            setResendOtp(randomVal)

        }
        catch (e) {

        }
    }


    return (
        <Stack>
            <Box className='verify-header-conatiner'>
                <Typography className='verify-modal-h2'>Verify Mobile Number</Typography>
                <CloseRoundedIcon sx={{ fontSize: '14px', cursor: 'pointer' }} onClick={() => {
                    handleCloseVerifyCodeModal(!isRefreshPage)
                    setResendOtp(null)
                }} />
            </Box>

            <Typography className='verify-modal-para' >Please enter the verification code your received on your mobile number
                <span className='verify-modal-para-num '>{phoneValue}</span>
            </Typography>

            <Box sx={{ pt: '5px', pb: '5px' }}>
                <TextField
                    // className="input-controle"
                    error={showError}
                    size="small"
                    fullWidth
                    value={otpValue}
                    onChange={verifyOtp}
                    type="tel"
                    variant="outlined"
                    label="Verification Code *"
                    sx={{
                        '& .MuiInputLabel-root': {
                            pb: 20,
                            fontSize: '14px',
                            fontWeight: 600,
                            fontFamily: 'Segoe UI',


                        },
                        '& .MuiInputBase-input.MuiOutlinedInput-input': {
                            color: '#1A1A1A',
                            fontSize: '14px',
                            fontWeight: 600,
                            fontFamily: 'Segoe UI',


                        },
                        '& .MuiInputBase-root.MuiOutlinedInput-root': {
                            pr: '5px'
                        },
                        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: showError ? "red" : 'var(--c-primary-color)',
                        },
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: showError ? "red" : 'var(--c-primary-color)',
                            borderWidth: '2px',
                        },


                    }}
                />
                <Box>
                    {showError && <Typography className="error-txt">Please enter match verification code</Typography>}
                </Box>
            </Box>

            <Box className='verify-code-btn-conatiner'>
                <Button variant='text' className='verify-code-link' onClick={resendCode}>Resend Verification code</Button>
                <Button
                    variant='contained'
                    className='verify-code-save-btn'
                    onClick={handleSave}
                    disableRipple
                >
                    SAVE
                </Button>
            </Box>
        </Stack>
    )
}

export default VerifyCode