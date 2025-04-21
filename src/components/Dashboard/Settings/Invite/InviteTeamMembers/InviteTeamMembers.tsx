
import { useEffect, useState } from 'react';
import { Divider } from '../../../../../shared/modules/MaterialImports/Divider';
import { Button } from '../../../../../shared/modules/MaterialImports/Button';
import { Typography } from '../../../../../shared/modules/MaterialImports/Typography';
// import { Box } from '../../shared/modules/MaterialImports/Box';
// import { Stack } from './../../shared/modules/MaterialImports/Stack';

// import { Avatar } from './../../shared/modules/MaterialImports/Avatar';

import { Accordion, AccordionDetails, AccordionSummary, ExpandMoreIcon } from '../../../../../shared/modules/MaterialImports/Accordion';
// import { List, ListItem, ListItemIcon, ListItemText } from "./../../shared/modules/MaterialImports/List";
import { Checkbox } from "../../../../../shared/modules/MaterialImports/FormElements";
import { FormControlLabel, TextField } from "../../../../../shared/modules/MaterialImports/FormInputs";
import { Chip } from "../../../../../shared/modules/MaterialImports/Chip";
import { FormGroup } from "../../../../../shared/modules/MaterialImports/FormGroup";
import { Grid } from '../../../../../shared/modules/MaterialImports/Grid2';


import Autocomplete from '@mui/material/Autocomplete';
import { showToaster } from '../../../../shared/SnackBar/SnackBar';
import { userLocalData } from '../../../../../shared/services/userData';
import { trackPromise } from 'react-promise-tracker';
import ApiService from '../../../../../shared/api/api';
import CircularProgress from '@mui/material/CircularProgress';
import { default as apiRequest } from '../../../../../shared/api/noTokenApi';


import './InviteTeamMembers.scss';
import { RoleDataInterface } from '../../Roles/Roles';
import { MenuItem } from '../../../../../shared/modules/MaterialImports/Menu';
import { userEmailValidation } from '../../../../../shared/data/FreeEmailDomains/FreeEmailDomains';
import { Yup } from '../../../../../shared/modules/Formik';
//import ErrorMessage from '../../../../shared/Error/ErrorMessage';

interface Teammate {
    id: number;
    name: string;
    email: string;
    selected: boolean;
}

const InviteTeamMembers = ({ closeInvitePopup }: { closeInvitePopup: (refresh: boolean) => void }) => {

    const [teamMembersList, setTeamMembersList] = useState<Teammate[]>([]);
    const [roleData, setRoleData] = useState<RoleDataInterface[]>([]);
    const [emails, setEmails] = useState<string[]>([]);
    const [roleSelect, setRoleSelect] = useState<string>('2');

    const [emailInputValue, setEmailInputValue] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const getRolesList = () => {
        // http://35.155.202.216:8080/QADemoCurately/getRoleList
        trackPromise(
            ApiService.postWithData('admin', `getRoleList`, {
                "recrId": userLocalData.getvalue('recrId'),
                "clientId": userLocalData.getvalue('clientId'),
            })
                .then((response: any) => {
                    const respData = response.data;
                    if (respData.Success) {
                        setRoleData(respData.list);
                    }
                })
        )
    }

    useEffect(() => {
        getRolesList();
    }, [])

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);

    };
    const handleAddEmail = async (newEmail: string) => {
        try {
            await userEmailValidation.validate(newEmail);
            setEmailInputValue('');
            setError('');
            checkEmailExistsInInvite(newEmail);
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                setError(err.message || 'Invalid email format');
            }
        }
    };
    const handleDeleteEmail = (emailToDelete: string) => {
        setEmails(emails.filter((email) => email !== emailToDelete));

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



    const inviteByEmails = () => {
        // https://qaadminapi.curately.ai/curatelyAdmin/sendInviteEmail
        if (emails.length) {

            let inviteEmails = emails.filter((item, index) => emails.indexOf(item) === index);

            trackPromise(
                ApiService.postWithData('admin', 'sendInviteEmail', {
                    "recrId": userLocalData.getvalue('recrId'),
                    "clientId": userLocalData.getvalue('clientId'),
                    "roleId": roleSelect,
                    "emailIds": inviteEmails
                }).then((response) => {
                    console.log(response.data);
                    if (response.data.Success) {
                        // getDomainRecruitersList(response.data.invitedRecruiterDetails || []);
                        showToaster('Invitation sent successfully.', 'success');
                        closeInvitePopup(true);
                    } else {
                        showToaster(response.data.Message ? response.data.Message : 'An error occured while inviting.', 'error');
                    }
                })
            )
        } else {
            showToaster('Please enter emails to Invite', 'error');
        }
    }



    const checkEmailExistsInInvite = (email: string) => {
        setIsLoading(true)
        // https://qaadminapi.curately.ai/curatelyAdmin/inviteRecrAvailability
        ApiService.postWithData('admin', 'inviteRecrAvailability', {
            "recrId": userLocalData.getvalue('recrId'),
            "clientId": userLocalData.getvalue('clientId'),
            "email": email,
        }).then((response) => {
            console.log(response.data);
            if (response.data.Success) {
                // getDomainRecruitersList(response.data.invitedRecruiterDetails || []);
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


    const [selectAllTeamMembers, setSelectAllTeamMembers] = useState(false);
    // const [invitedList, setInvitedList] = useState<Teammate[]>([]);
    const [secondaryName, setSecondaryName] = useState("");

    const handleEmailTeammate = (e: any, teamMate: any) => {
        const { checked, value, name } = e.target;
        (checked) ? setEmails([...emails, value])
            : setEmails(emails.filter((email) => email !== value));

        const updatedTeammates = teamMembersList.map((teammate) =>
            teammate.email === teamMate.email
                ? { ...teammate, selected: checked } : teammate
        );
        setTeamMembersList(updatedTeammates);

        const allSelected = updatedTeammates.every((teammate) => teammate.selected);
        setSelectAllTeamMembers(allSelected);
    };


    // const handleSelectTeammate = (e, id: string) => {
    //     const updatedTeammates = teamMembersList.map((teammate) =>
    //         teammate.email === id
    //             ? { ...teammate, selected: !teammate.selected }
    //             : teammate
    //     );
    //     setTeamMembersList(updatedTeammates);

    //     const allSelected = updatedTeammates.every((teammate) => teammate.selected);
    //     setSelectAllTeamMembers(allSelected);
    //     handleEmailTeammate(updatedTeammates);

    // };
    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { checked, value, name } = event.target;
        // const newSelectAll = !selectAllTeamMembers;
        setSelectAllTeamMembers(checked);

        let tempEmails = emails;

        teamMembersList.forEach((teammate: any) => {
            if (checked) {
                if (!tempEmails.includes(teammate.email)) {
                    tempEmails.push(teammate.email);
                }
            } else {
                tempEmails = tempEmails.filter((each) => each !== teammate.email);
            }
        });
        setEmails([...tempEmails]);

        const updatedTeammates = teamMembersList.map((teammate) =>
            ({ ...teammate, selected: checked }));

        setTeamMembersList(updatedTeammates);
    };

    // const selectedTeamCount = teamMembersList.filter((i) => i.selected).length;

    // const handleInvite = () => {

    //     const selectedTeammates = [
    //         // ...invitedList,
    //         ...teamMembersList.filter((teammate) => teammate.selected)
    //     ];

    //     if (selectedTeammates.length) {
    //         trackPromise(
    //             // ApiService.postWithData('admin', 'saveOrUpdateInviteRecruiterGroup', {
    //             //     clientId: userLocalData.getvalue('clientId'),
    //             //     recrId: userLocalData.getvalue('recrId'),
    //             //     inviteRecrIds: selectedTeammates.map((o) => o.id).join()
    //             ApiService.postWithData('admin', 'sendInviteEmail', {
    //                 clientId: userLocalData.getvalue('clientId'),
    //                 recrId: userLocalData.getvalue('recrId'),
    //                 roleId: roleSelect,
    //                 emailIds: selectedTeammates.map((o) => o.email)
    //             }).then((response) => {
    //                 if (response.data.Success) {
    //                     showToaster('Teammates are invited successfully.', 'success');
    //                     // setInvitedList(() => [...selectedTeammates]);
    //                     // setTeamMembersList(teamMembersList.filter((teammate) => !teammate.selected));
    //                     // setSelectAllTeamMembers(false);
    //                     closeInvitePopup(true);
    //                 }
    //             })
    //         )
    //     } else {
    //         showToaster('Please select atleast one Teammate', 'error');
    //     }
    // };

    useEffect(() => {
        // const userEmail = userLocalData.getvalue('email');
        // if (userEmail.split('@')[1]) {
        //   getDomainRecruitersList();
        // } else {
        getCredits();
        // }
    }, []);

    const getDomainRecruitersList = (invitedRecruiterDetails: any) => {
        trackPromise(
            ApiService.postWithData('admin', 'getDomainsRecruiterDetails', { domain: userLocalData.getvalue('email').split('@')[1], recrId: userLocalData.getvalue('recrId'), clientId: userLocalData.getvalue('clientId') }).then((response) => {
                if (response.data.Success) {
                    const objFind = response.data.domainRecruiterDetails.find((obj: { domain: string }) => { return obj.domain === userLocalData.getvalue('email').split('@')[1] });
                    if (objFind?.domain) {
                        let invitedRecruiterList: Teammate[] = [];
                        for (let ir = 0; ir < invitedRecruiterDetails.length; ir++) {
                            invitedRecruiterList.push({
                                email: invitedRecruiterDetails[ir].email,
                                id: invitedRecruiterDetails[ir].recrId,
                                name: invitedRecruiterDetails[ir].recruiterName,
                                selected: false
                            })

                        }
                        // if (invitedRecruiterList.length) {
                        //     setInvitedList(invitedRecruiterList);
                        // }
                        let recruiterDeatils: Teammate[] = [];
                        for (let rd = 0; rd < objFind.recruiterDetails.length; rd++) {
                            if (objFind.recruiterDetails[rd].recruiterName && objFind.recruiterDetails[rd].recrId) {
                                const idExists = invitedRecruiterList.some(e => e.id === objFind.recruiterDetails[rd].recrId);
                                if (!idExists && !objFind.recruiterDetails[rd].invited) {
                                    recruiterDeatils.push({
                                        name: objFind.recruiterDetails[rd].recruiterName,
                                        email: objFind.recruiterDetails[rd].email,
                                        id: objFind.recruiterDetails[rd].recrId,
                                        selected: false
                                    })
                                }
                            }
                        }

                        setTeamMembersList(recruiterDeatils);
                        if (recruiterDeatils.length) {
                            // M.Vali and +23 others are
                            if (recruiterDeatils.length === 1) {
                                setSecondaryName(`${recruiterDeatils[0].name} person from ${userLocalData.getvalue('email').split('@')[1]} already using Curately`);
                                // setSecondaryName(`${recruiterDeatils[0].name} person is already member of this orgnization`);
                                // setSecondaryName(`M.Vali and +23 others are already member of this orgnization`);
                            } else {
                                // setSecondaryName(`${recruiterDeatils[0].name} and +${recruiterDeatils.length - 1} others are already member of this orgnization`);
                                setSecondaryName(`${recruiterDeatils.length} people from ${userLocalData.getvalue('email').split('@')[1]} already using Curately`);
                            }

                        }
                    }
                }
            })
        )
    }


    const getCredits = () => {
        // https://qaadminapi.curately.ai/curatelyAdmin/getCredits/7/3291
        trackPromise(
            ApiService.getById('admin', `getCredits/${userLocalData.getvalue('clientId')}`, userLocalData.getvalue('recrId')).then((response) => {
                console.log(response.data);
                if (response.data.Success) {
                    getDomainRecruitersList(response.data.invitedRecruiterDetails || []);
                }
            })
        )
    }

    const [expanded, setExpanded] = useState<boolean>(false);
    const handleChange = (panel: boolean) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };


    return (
        (<div id='InviteTeamMembers'>
            <Grid container direction={'row'}>
                <Grid size={7} className="input-wrapper">
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
                </Grid>
                <Grid size={3}>
                    <TextField fullWidth className='mt-1 ml-1'
                        variant="outlined"
                        type="text"
                        size="small"
                        id="roleId"
                        name="roleId"
                        defaultValue={2}
                        value={roleSelect}
                        onChange={(e) => setRoleSelect(e.target.value)}
                        select
                    >
                        {
                            roleData.map((val) => {
                                return <MenuItem key={val.roleId} value={val.roleId} >{val.roleName}</MenuItem>
                            })
                        }
                    </TextField>

                </Grid>
                <Grid sx={{ width: 70 }}>
                    <Button color='primary' variant='contained' onClick={inviteByEmails} disabled={Boolean(!emails.length)} className='ml-2 my-3'>Invite</Button>
                </Grid>
            </Grid>
            <Divider className='my-4' />
            {
                teamMembersList.length ?
                    <>
                        <span className='fs-14 fw-6'>Recommended people for you</span>
                        <Accordion expanded={expanded} onChange={handleChange(true)} className='mt-2'>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="teamListAccordion-content"
                                id="teamListAccordion-header"
                            >
                                <Checkbox checked={selectAllTeamMembers} onChange={handleSelectAll} className='pt-0' color='secondary' />
                                <Typography> {secondaryName}</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ overflow: 'auto', maxHeight: 200 }} className='pt-0'>
                                <FormGroup className='pl-3'>
                                    {/* <List className="teammate_list">  onChange={handleSelectAll} */}
                                    {teamMembersList.map((teammate) => (
                                        // <ListItem key={teammate.id} className='py-0'>
                                        //     <ListItemIcon>
                                        (<FormControlLabel key={teammate.id} control={<Checkbox checked={teammate.selected} value={teammate.email} onChange={(e) => handleEmailTeammate(e, teammate)} />} label={<><span className='fs-14 fw-6 pr-2'>{teammate.name}</span><span className='fs-13'>{teammate.email}</span></>} />)

                                        // </ListItemIcon> {/* <Avatar sx={{ bgcolor: "#8787cc", marginRight: 1 }}>{getShortName(teammate.name)}</Avatar> */ }
                                        //     <ListItemText primary={<><span className='fs-14 fw-6 pr-2'>{teammate.name}</span><span className='fs-13'>{teammate.email}</span></>} />
                                        // </ListItem>
                                    ))}
                                </FormGroup>
                                {/* </List> */}
                            </AccordionDetails>
                        </Accordion>
                        {/* <Button color='primary' variant='contained' onClick={handleInvite} fullWidth disabled={Boolean(!selectedTeamCount)} id="invitePeople" className='my-3'>{`Invite ${selectedTeamCount ? selectedTeamCount : ""} ${selectedTeamCount === 1 ? "Person" : "People"}`}</Button> */}
                    </>
                    :
                    null
            }
            {/* <Button className='laterBtn mt-3' variant='text' color='primary' onClick={handleNext} >I'll do it later.</Button> */}
        </div>)
    );
}

export default InviteTeamMembers;
