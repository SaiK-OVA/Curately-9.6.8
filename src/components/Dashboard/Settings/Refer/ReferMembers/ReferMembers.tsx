
import { Button } from '../../../../../shared/modules/MaterialImports/Button';
// import BoltIcon from '@mui/icons-material/Bolt';

import { useState } from 'react';

import { TextField } from "../../../../../shared/modules/MaterialImports/FormInputs";
import { Chip } from "../../../../../shared/modules/MaterialImports/Chip";
import { Grid } from '../../../../../shared/modules/commonImports';
import Copy from '../../../../../shared/utils/Copy';

import InsertLinkIcon from '@mui/icons-material/InsertLink';


import Autocomplete from '@mui/material/Autocomplete';
import { showToaster } from '../../../../shared/SnackBar/SnackBar';
import { userLocalData } from '../../../../../shared/services/userData';
import { trackPromise } from 'react-promise-tracker';
import ApiService from '../../../../../shared/api/api';
import CircularProgress from '@mui/material/CircularProgress';
import { default as apiRequest } from '../../../../../shared/api/noTokenApi';


import './ReferMembers.scss';
import { DialogTitle } from '@mui/material';
import { userEmailValidation } from '../../../../../shared/data/FreeEmailDomains/FreeEmailDomains';
import { Yup } from '../../../../../shared/modules/Formik';


const ReferMembers = ({ closeInvitePopup }: { closeInvitePopup: (refresh: boolean) => void }) => {


    const [emails, setEmails] = useState<string[]>([]);
    const [emailInputValue, setEmailInputValue] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);

    };
    const handleAddEmail = async (newEmail: string) => {
        try {
            await userEmailValidation.validate(newEmail);
            setEmailInputValue('');
            setError('');
            checkEmailExistsInRefer(newEmail);
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                setError(err.message || 'Invalid email format');
            }
        }
    };
    const handleDeleteEmail = (emailToDelete: string) => {
        setEmails(emails.filter((email) => email !== emailToDelete));

    };


    const checkEmailExistsInRefer = (email: string) => {
        setIsLoading(true);
        // https://qaadminapi.curately.ai/curatelyAdmin/referralRecrAvailability
        ApiService.postWithData('admin', 'referralRecrAvailability', {
            "recrId": userLocalData.getvalue('recrId'),
            "clientId": userLocalData.getvalue('clientId'),
            "email": email,
        }).then((response) => {
            console.log(response.data);
            if (response.data.Success) {
                validateEmailDomain(email)
                // setEmails([...emails, email]);
            } else {
                showToaster(response.data.Message ? response.data.Message : 'An error occured while validating the email.', 'error');
            }
        })
    }

    const validateEmailDomain = async (email: any) => {
        try {
            let response = await apiRequest.validateWorkEmail(email)
            response.data.debounce.free_email === "false" ? setEmails([...emails, email]) : showToaster('Please Enter Work Email.', 'error');
        } catch (error) {
            console.error('Error validating email:', error);
            return false; // Fallback if API request fails
        }
        setIsLoading(false)
    };

    const emailInputChange = (_: React.ChangeEvent<{}>, newInputValue: string) => {
        setEmailInputValue(newInputValue);
        if (validateEmail(newInputValue)) {
            setEmailListOptions([newInputValue]);
            // setError(null);
        }
        else {
            setEmailListOptions([]);
        }
    };
    const [emailListOptions, setEmailListOptions] = useState<string[]>([]);



    const referByEmails = () => {
        // https://qaadminapi.curately.ai/curatelyAdmin/sendRefferalEmail
        if (emails.length) {
            trackPromise(
                ApiService.postWithData('admin', 'sendRefferalEmail', {
                    "recrId": userLocalData.getvalue('recrId'),
                    "clientId": userLocalData.getvalue('clientId'),
                    "emailIds": emails
                }).then((response) => {
                    console.log(response.data);
                    if (response.data.Success) {
                        setEmails([]);
                        showToaster('Referral sent successfully.', 'success');
                        closeInvitePopup(true);
                    } else {
                        showToaster(response.data.Message ? response.data.Message : 'An error occured while Referring.', 'error');
                    }
                })
            )
        } else {
            showToaster('Please enter emails to Refer', 'error');
        }
    }

    return (
        <div id='ReferMembers'>
            <DialogTitle>
                <Grid container direction="row" justifyContent="space-between" alignItems="center" >
                    <span className='addHeader'>
                        Refer & Get 10 Credits
                    </span>
                </Grid>
            </DialogTitle>
            <div className='refer-wrapper'>
                <p className='refer-info'>Redeem your credits by subscribing to paid plan with advanced features & instant discount.</p>

                <div className='input-wrapper'>
                    <Autocomplete multiple freeSolo value={emails}
                        onChange={(_, newValue) => {
                            if (newValue.length > emails.length) {
                                const newEmail = newValue[newValue.length - 1];
                                handleAddEmail(newEmail);
                            } else {
                                setEmails(newValue);
                            }
                        }}
                        options={emailListOptions}
                        inputValue={emailInputValue}
                        // onInputChange={(_, newInputValue) => { setEmailInputValue(newInputValue); }}
                        onInputChange={emailInputChange}
                        renderInput={(params) => (
                            <TextField {...params} label="Add people using their emails" variant="outlined"
                                error={Boolean(error)}
                                helperText={error}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter' && emailInputValue) {
                                        event.preventDefault();
                                        handleAddEmail(emailInputValue);
                                    }
                                }}
                            />
                        )}
                        renderTags={(value: readonly string[], getTagProps) => value.map((option: string, index: number) => (
                            <Chip variant="outlined" label={option} {...getTagProps({ index })} onDelete={() => handleDeleteEmail(option)} />
                        ))}
                    />
                    {isLoading && <CircularProgress className='loaderIcon' size={20} />}
                </div>

                <Button color='primary' variant='contained' onClick={referByEmails} disabled={Boolean(!emails.length)} className='ml-3 my-3'>Refer people</Button>
            </div>
            {/* <p className='refer-footer'><BoltIcon className='icon' /> Anyone who signs up using your referral link will get <span>&nbsp;10% OFF&nbsp;</span> on all plans.</p> */}

            <Grid className='my-4 px-5 mx-4 pb-4' container size={12}>
                <Grid size="auto" sx={{ width: 'calc(100% - 115px)' }}>
                    <TextField
                        variant="outlined"
                        disabled={true}
                        fullWidth
                        size='small'
                        value={`${window.location.origin}${window.location.pathname}#/signin?referral=${userLocalData.getvalue('referralCode')}`}
                    />
                </Grid>
                <Grid size="auto" sx={{ width: '75px' }}>
                    <Button variant="outlined" size='small' startIcon={<InsertLinkIcon />} className="cursor-pointer fs-16 ml-2"
                        onClick={(event: any) => {
                            event.stopPropagation();
                            Copy.text(`${window.location.origin}${window.location.pathname}#/signin?referral=${userLocalData.getvalue('referralCode')}`, 'Referral Link');
                        }}>
                        Copy
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default ReferMembers;