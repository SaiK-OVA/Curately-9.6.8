import { useEffect, useState } from "react";
import './AddToListsDialog.scss';
import { CloseIcon, Dialog, DialogActions, DialogContent, DialogTitle } from "../../../shared/modules/MaterialImports/Dialog";
import { Button, IconButton } from "../../../shared/modules/MaterialImports/Button";
import { Grid } from "../../../shared/modules/MaterialImports/Grid";
import { Accordion, AccordionDetails, AccordionSummary } from "../../../shared/modules/MaterialImports/Accordion";
import { Stack } from "../../../shared/modules/MaterialImports/Stack";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import { Divider } from "../../../shared/modules/MaterialImports/Divider";
import { MUIAutoComplete } from "../MUIAutoComplete/MUIAutoComplete";
import { FormControl, showToaster, TextField } from "../../../shared/modules/commonImports";
import { userLocalData } from "../../../shared/services/userData";
import ApiService from '../../../shared/api/api';
import { FormControlLabel } from "../../../shared/modules/MaterialImports/FormInputs";
import { Checkbox } from "../../../shared/modules/MaterialImports/FormElements";
import { MenuItem } from "../../../shared/modules/MaterialImports/Menu";
import { trackPromise } from "../../../shared/modules/PromiseTrackter";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ID_ATS_AVIONTEAPI, ID_ATS_BULLHORN, ID_ATS_JOBDIVA, ID_ATS_VOICEAI, ID_SETTINGS_CAMPAIGNS, ID_SETTINGS_TALENTPOOL } from "../../../shared/services/Permissions/IDs";

interface DialogProps {
    open: boolean;
    onClose: () => void;
    selectedRowIds: any[];
    moduleType?: "candidate" | "contact";
    jobId?: string;
}

const AddToListsDialog = ({ open, onClose, selectedRowIds, moduleType = "candidate", jobId }: DialogProps) => {
    const [expanded, setExpanded] = useState<string | false>(false);
    const [compId, setCompId] = useState<any>();
    const [optionFlags, setOptionFlags] = useState({
        List: false,
        Campaign: false,
        Mobile: false,
        TalentPool: false,
        VoiceAI: false,
        BullHorm: false,
        Avionteapi: false,
        JobDiva: false,
    })

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const [selectedSequence, setSelectedSequence] = useState({
        id: "",
        name: "",
    });

    const [selectedList, setSelectedList] = useState({
        id: "",
        name: ""
    });

    const [selectedTalentPool, setSelectedTalentPool] = useState({
        id: "",
        name: "",
    });

    const [selectedCompName, setSelectedCompName] = useState([{
        label: "",
        id: ""
    }]);

    const saveAuditLog = (id: number) => {
        ApiService.saveAuditLog(id);
    }

    const addToList = (id: string, name: string) => {
        if (selectedRowIds.length) {
            if (name && name.trim() && id) {
                const saveData = {
                    listId: id,
                    listName: name,
                    contIds: selectedRowIds.join(),
                    recrId: userLocalData.getvalue('recrId'),
                    clientId: userLocalData.getvalue('clientId')
                }

                trackPromise(
                    // http://35.155.202.216:8080/QADemoCurately/saveListContacts
                    ApiService.postWithData('admin', 'saveListContacts', saveData)
                        .then(
                            (response: any) => {
                                // console.log(response)
                                setSelectedList({ id: "", name: "" });
                                if (response.data.Success) {
                                    showToaster("List Added Successfully", 'success');
                                    saveAuditLog(4143);
                                } else if (response.data.Message.includes("already assigned")) {
                                    showToaster("This List is already assigned to this Contact.", 'error')
                                } else {
                                    showToaster(response.data.Message ? response.data.Message : "An error occured while adding Tag", 'error')
                                }

                            }
                        )
                )
            }
        } else {
            showToaster('Please select Canidate to add to List', 'error');
        }
    }

    const addToSequenceList = (id: string, name: string) => {
        if (name && name.trim()) {
            const saveData = {
                clientId: userLocalData.getvalue('clientId'),
                sequenceId: id,
                recrId: userLocalData.getvalue('recrId'),
                contIds: moduleType === 'contact' ? selectedRowIds.toString() : '',
                userIds: moduleType === 'candidate' ? selectedRowIds.toString() : '',
            }


            //https://www4.accuick.com/Accuick_API/Curately/Sequence/sequence_assign_users.jsp?clientId=2&userIds=39&sequenceId=9&recrId=61
            ApiService.postWithData('admin', moduleType === 'candidate' ? 'sequenceAssignUsers' : 'sequenceAssignContacts', saveData)
                .then(
                    (response: any) => {
                        // console.log(response);
                        //  showToaster((response.data.message) ? response.data.message : "campaign saved successfully", 'success');
                        //    loadCanidateData();
                        if ((response.data.message === "Success") || (response.data.Message === "Success")) {
                            showToaster("Campaign has been assigned successfully", 'success');
                            saveAuditLog(4142);
                        } else {
                            showToaster(response.data.Message ? response.data.Message : "An error occured while assigning ", 'error');
                        }
                    }
                )
                .catch((error) => {
                    console.error("API Error:", error);
                });

        }
    }

    const publishToBullhorn = () => {

        let bodyRequest = {
            "atsName": "Bullhorn",
            "clientId": userLocalData.getvalue('clientId'),
            "recruiterId": userLocalData.getvalue('recrId'),
            "moduleName": moduleType ? moduleType : "candidate",
            "curatelyIds": selectedRowIds,
        }

        // const keysWithTrueValue = Object.keys(applicantsRowSelection).filter(id => Boolean(applicantsRowSelection[id]));
        // if (keysWithTrueValue.length === 1) {
        // https://adminapi.cxninja.com/bullhorn-service-dev/job/%7BclientId%7D/%7BjobId%7D
        ApiService.postWithData('ats', `ats/post`, bodyRequest).then((response) => {
            if (response.data.Success) {
                showToaster(`Applicant is Publshed successfully`, 'success');
            } else {
                showToaster((response.data.Message) ? response.data.Message : "Unable to Publish Applicant to BullHorn", 'error');
            }
        }).catch(error => {
            showToaster(error.message ? error.message : "Unable to Publish Applicant to BullHorn", 'error');
        });
    }

    const handleVoiceAIClick = () => {
        const appIds = selectedRowIds;
        if (!!selectedRowIds?.length) {
            let data = {
                "jobId": jobId,
                "type": moduleType ? moduleType : "candidate",
                "recrId": userLocalData.getvalue('recrId'),
                "candidates": appIds,
                "clientId": userLocalData.getvalue('clientId')
            }

            //  https://adminapi.cxninja.com/voice-ai-prod/candidates/submitCandidates
            trackPromise(
                ApiService.postWithData('voiceai', 'candidates/submitCandidates', data).then((response: any) => {
                    let errorResponse = ""; let successResponse = "";

                    if (response.data.Success) {
                        showToaster((response.data.Message) ? response.data.Message : 'User Voice AI Created Successfully', 'success');
                    }
                    else {

                        if (response.data?.candidatesResponse?.length > 1) {
                            let calculatedData = response.data.candidatesResponse;
                            for (let si = 0; si < calculatedData.length; si++) {

                                if (calculatedData[si]?.error) {
                                    errorResponse += calculatedData[si].failureUserId + " - " + calculatedData[si].errorResponse + "\n";

                                    // setRowSelection({});
                                } else {
                                    successResponse += calculatedData[si]?.first_name + " " + calculatedData[si]?.last_name + " - User Voice AI Created Successfully.\n";
                                    //     showToaster(calculatedData[si]?.first_name + " " + calculatedData[si]?.last_name + " - User Voice AI Created Successfully.", 'success');
                                }
                            }

                            (errorResponse) ? showToaster(errorResponse, 'error') : null;
                            (successResponse) ? showToaster(successResponse, 'success') : null;

                        } else {
                            let calculatedData = response.data.candidatesResponse;
                            if (calculatedData.error) {
                                errorResponse += calculatedData.failureUserId + " - " + calculatedData.errorResponse + "\n";

                                // setRowSelection({});
                            } else {
                                successResponse += calculatedData?.first_name + " " + calculatedData?.last_name + " - User Voice AI Created Successfully.\n";
                                //     showToaster(calculatedData[si]?.first_name + " " + calculatedData[si]?.last_name + " - User Voice AI Created Successfully.", 'success');
                            }
                        }

                        showToaster((response.data.Message) ? response.data.Message : errorResponse ? errorResponse : "Error fetching Voice AI", 'error');
                    }

                })
                    .catch((error) => {
                        console.error('Error fetching Voice AI:', error);
                    })
            )
        }
    }

    const publishApplicantToAvionte = () => {
        let bodyRequest = {
            "atsName": "Avionte",
            "clientId": userLocalData.getvalue('clientId'),
            "recruiterId": userLocalData.getvalue('recrId'),
            "moduleName": moduleType ? moduleType : "candidate",
            "curatelyIds": selectedRowIds,
        }

        // const keysWithTrueValue = Object.keys(rowSelection).filter(id => Boolean(rowSelection[id]));
        //if (keysWithTrueValue.length === 1) {
        // https://adminapi.cxninja.com/bullhorn-service-dev/job/%7BclientId%7D/%7BjobId%7D
        ApiService.postWithData('ats', `ats/post`, bodyRequest).then((response) => {
            if (response.data.Success) {
                showToaster(`Applicant is Publshed successfully`, 'success');
            } else {
                showToaster((response.data.Message) ? response.data.Message : "Unable to Publish Applicant to Avionte", 'error');
            }
        }).catch(error => {
            showToaster(error.message ? error.message : "Unable to Publish Applicant to Avionte", 'error');
        });
        // }        
    }

    const publishCandidateToJobdiva = () => {
        let bodyRequest = {
            "atsName": "JobDiva",
            "clientId": userLocalData.getvalue('clientId'),
            "recruiterId": userLocalData.getvalue('recrId'),
            "moduleName": moduleType ? moduleType : "candidate",
            "curatelyIds": selectedRowIds,
        }

        ApiService.postWithData('ats', `ats/post`, bodyRequest).then((response) => {
            if (response.data.Success) {
                showToaster(`Jobdiva - Candidate is Publshed successfully`, 'success');
            } else {
                showToaster((response.data.Message) ? response.data.Message : "Unable to Publish Candidate to Jobdiva", 'error');
            }
        }).catch(error => {
            showToaster(error.message ? error.message : "Unable to Publish Candidate to Jobdiva", 'error');
        });
    }

    const addToTalentPool = (id: string, name: string) => {
        if (name && name.trim()) {
            const saveData = {
                clientId: userLocalData.getvalue('clientId'),
                poolId: id,
                recrId: userLocalData.getvalue('recrId'),
                userIds: selectedRowIds.toString(),
            }

            trackPromise(
                // https://www4.accuick.com/Accuick_API/Curately/talent_pool_insert_index.jsp?clientId=2&poolId=23&recrId=61&userIds=22362
                ApiService.postWithData("admin", 'talentPoolInsertIndex', saveData)
                    .then(
                        (response: any) => {
                            if (response.data.Message === "Success") {
                                showToaster("Pool has been assigned successfully", 'success');
                            } else {
                                showToaster(response.data.Message ? response.data.Message : "An error occured while assigning ", 'error');
                            }
                            setSelectedTalentPool({ id: "", name: "" });
                        }
                    )
            )
        }
    }

    const onSave = () => {
        if (optionFlags.List) {
            addToList(selectedList.id, selectedList.name);
        }
        if (optionFlags.Campaign) {
            addToSequenceList(selectedSequence.id, selectedSequence.name)
        }
        if (optionFlags.Mobile) {

        }
        if (optionFlags.TalentPool) {
            addToTalentPool(selectedTalentPool.id, selectedTalentPool.name)
        }
        if (optionFlags.VoiceAI) {
            handleVoiceAIClick()
        }
        if (optionFlags.BullHorm) {
            publishToBullhorn()
        }
        if (optionFlags.Avionteapi) {
            publishApplicantToAvionte()
        }
        if (optionFlags.JobDiva) {
            publishCandidateToJobdiva()
        }
    }

    const getCompanyList = () => {
        // http://35.155.202.216:8080/QADemoCurately/getRoleList
        trackPromise(
            ApiService.getCall('ats', `jobDiva/getCompanies/${userLocalData.getvalue('clientId')}`)
                .then((response: any) => {
                    const respData = response.data;
                    console.log(respData);
                    if (respData.Success) {
                        let tempData = response.data.data.map((i: { name: string, id: string }) => ({ id: i.id, label: i.name }))
                        setSelectedCompName(tempData);
                    }
                })
        )
    }
    useEffect(() => {
        getCompanyList();
    }, []);

    return (
        <Dialog onClose={onClose} open={open} maxWidth="md" id="AddToListsDialog">
            <DialogTitle>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <span className='addHeader'>
                        Add to Lists
                    </span>
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        className="closeBtn"
                    >
                        <CloseIcon />
                    </IconButton>
                </Grid>
            </DialogTitle>
            <DialogContent className="p-0">
                <Grid size={12} className='pr-2 ml-5 mr-5 mb-2' display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <label className='inputLabel'> Take note: Adding new {moduleType === "candidate" ? "Candidate" : "Contact"} to a list requires  <b>1 email credit</b> per verified email. <br />However, re-adding previously saved {moduleType === "candidate" ? "Candidates" : "Contacts"} won’t consume any credits. </label>
                </Grid>
                <Grid size={12} className='pr-2 ml-5 mr-5 mb-2' display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Grid size={1} >
                        <FormControlLabel control={
                            <Checkbox
                                onChange={(e) => e.target.checked ? setOptionFlags(prev => ({
                                    ...prev,
                                    Mobile: true,
                                }))
                                    : null
                                }
                            />}
                            sx={{ width: '100%' }}
                            label=""
                        />
                    </Grid><Grid size={10} >

                        <label className='inputLabel'> Each mobile number that is successfully enriched, you'll be <b>charged 1 credit</b>, <br /> while saved contacts don't use any.</label>
                    </Grid>
                </Grid>


                {moduleType === "contact" ?
                    <>
                        <Accordion disableGutters square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummary
                                expandIcon={expanded === 'panel1' ? <RemoveIcon /> : <AddIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Stack className='title' direction="row" justifyContent="space-between">
                                    <div>
                                        <FormatListBulletedIcon />
                                        <label>List</label>
                                    </div>

                                    {expanded !== 'panel1' && optionFlags.List ? <CheckCircleIcon className="checkIcon" /> : null}
                                </Stack>
                            </AccordionSummary>
                            <AccordionDetails>
                                <MUIAutoComplete
                                    id='contactList'
                                    handleChange={(id: any, name: string) => {
                                        setSelectedList({ id, name });
                                        setOptionFlags(prev => ({
                                            ...prev,
                                            List: true,
                                        }));
                                    }}
                                    valuePassed={
                                        (selectedList.id) ? { label: selectedList.name, id: selectedList.id } :
                                            {}
                                    }
                                    isMultiple={false}
                                    textToShow="Select List"
                                    width="250px"
                                    type='contactList'
                                    placeholder="Select / Type to create List"
                                />
                            </AccordionDetails>
                        </Accordion>
                    </>
                    : null
                }
                {userLocalData.adminSettings(ID_SETTINGS_CAMPAIGNS) ?
                    <Accordion disableGutters square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary
                            expandIcon={expanded === 'panel2' ? <RemoveIcon /> : <AddIcon />}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                        >
                            <Stack className='title' direction="row" justifyContent="space-between">
                                <div>
                                    <SendOutlinedIcon />
                                    <label>Campaign</label>
                                </div>

                                {expanded !== 'panel2' && optionFlags.Campaign ? <CheckCircleIcon className="checkIcon" /> : null}
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <MUIAutoComplete
                                id="sequenceId1"
                                handleChange={(id: any, name: string) => {
                                    setSelectedSequence({ id, name });
                                    // addToTopSequenceList(id, name);
                                    setOptionFlags(prev => ({
                                        ...prev,
                                        Campaign: true,
                                    }));
                                }}
                                valuePassed={
                                    selectedSequence.id
                                        ? {
                                            label: selectedSequence.name,
                                            id: selectedSequence.id,
                                        }
                                        : {}
                                }
                                // existingSequenceIds={menuData?.sequenceIds}
                                existingSequenceIds={[]}
                                isMultiple={false}
                                textToShow="Select Campaign"
                                width="250px"
                                type={moduleType === "candidate" ? "sequence" : "contactSequence"}
                                placeholder="Select Campaign"
                            />
                        </AccordionDetails>
                    </Accordion>
                    : null
                }
                {/* <Accordion disableGutters square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary
                        expandIcon={expanded === 'panel3' ? <RemoveIcon/> : <AddIcon/>}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                    >
                        <Stack className='title' direction="row" justifyContent="space-between">
                            <div>
                                <CallOutlinedIcon />
                                <label>Mobile Numbers</label>
                            </div>

                            {expanded !== 'panel3' && optionFlags.Mobile ? <CheckCircleIcon className="checkIcon" /> : null}
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormControlLabel control={
                            <Checkbox
                                onChange={(e) => e.target.checked ?  setOptionFlags(prev => ({
                                    ...prev,
                                    Mobile: true,
                                }))
                                : null
                            }
                            />} 
                        label="Try to find Mobile numbers for newly prospected people" 
                        />
                    </AccordionDetails>
                </Accordion> */}

                {moduleType === "candidate" && userLocalData.adminSettings(ID_SETTINGS_TALENTPOOL) ?
                    <>
                        <Accordion disableGutters square expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                            <AccordionSummary
                                expandIcon={expanded === 'panel4' ? <RemoveIcon /> : <AddIcon />}
                                aria-controls="panel4bh-content"
                                id="panel4bh-header"
                            >
                                <Stack className='title' direction="row" justifyContent="space-between">
                                    <div>
                                        <PlaylistAddOutlinedIcon />
                                        <label>Talent Pool</label>
                                    </div>

                                    {expanded !== 'panel4' && optionFlags.TalentPool ? <CheckCircleIcon className="checkIcon" /> : null}
                                </Stack>
                            </AccordionSummary>
                            <AccordionDetails>
                                <MUIAutoComplete
                                    id="talentPoolId1"
                                    handleChange={(id: any, name: string) => {
                                        setSelectedTalentPool({ id, name });
                                        // addToTopTalentPool(id, name);
                                        setOptionFlags(prev => ({
                                            ...prev,
                                            TalentPool: true,
                                        }));
                                    }}
                                    valuePassed={
                                        selectedTalentPool.id
                                            ? {
                                                label: selectedTalentPool.name,
                                                id: selectedTalentPool.id,
                                            }
                                            : {}
                                    }
                                    isMultiple={false}
                                    textToShow="Talent Pool"
                                    width="250px"
                                    type="talentPool"
                                    placeholder="Select Pool"
                                />
                            </AccordionDetails>
                        </Accordion>
                    </>
                    : null
                }
                {userLocalData.adminSettings(ID_ATS_VOICEAI) ?
                    <Accordion disableGutters square expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                        <AccordionSummary
                            expandIcon={expanded === 'panel5' ? <RemoveIcon /> : <AddIcon />}
                            aria-controls="panel5bh-content"
                            id="panel5bh-header"
                        >
                            <Stack className='title' direction="row" justifyContent="space-between">
                                <div>
                                    <span className="customIcon">VI</span>
                                    <label>Voice AI</label>
                                </div>

                                {expanded !== 'panel5' && optionFlags.VoiceAI ? <CheckCircleIcon className="checkIcon" /> : null}
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormControlLabel control={
                                <Checkbox
                                    onChange={(e) => e.target.checked ? setOptionFlags(prev => ({
                                        ...prev,
                                        VoiceAI: true,
                                    }))
                                        : null}
                                />}
                                label="Add to Voice AI"
                            />
                        </AccordionDetails>
                    </Accordion>
                    : null
                }
                {userLocalData.adminSettings(ID_ATS_BULLHORN) ?
                    <Accordion disableGutters square expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                        <AccordionSummary
                            expandIcon={expanded === 'panel6' ? <RemoveIcon /> : <AddIcon />}
                            aria-controls="panel6bh-content"
                            id="panel6bh-header"
                        >
                            <Stack className='title' direction="row" justifyContent="space-between">
                                <div>
                                    <span className="customIcon">BH</span>
                                    <label>BullHorn</label>
                                </div>

                                {expanded !== 'panel6' && optionFlags.BullHorm ? <CheckCircleIcon className="checkIcon" /> : null}
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormControlLabel control={
                                <Checkbox
                                    onChange={(e) => e.target.checked ? setOptionFlags(prev => ({
                                        ...prev,
                                        BullHorm: true,
                                    }))
                                        : null}
                                />}
                                label="Add to BullHorn"
                            />
                        </AccordionDetails>
                    </Accordion>
                    : null
                }
                {userLocalData.adminSettings(ID_ATS_AVIONTEAPI) ?
                    <Accordion disableGutters square expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
                        <AccordionSummary
                            expandIcon={expanded === 'panel7' ? <RemoveIcon /> : <AddIcon />}
                            aria-controls="panel7bh-content"
                            id="panel7bh-header"
                        >
                            <Stack className='title' direction="row" justifyContent="space-between">
                                <div>
                                    <span className="customIcon">AV</span>
                                    <label>Avionteapi</label>
                                </div>

                                {expanded !== 'panel7' && optionFlags.Avionteapi ? <CheckCircleIcon className="checkIcon" /> : null}
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormControlLabel control={
                                <Checkbox
                                    onChange={(e) => e.target.checked ? setOptionFlags(prev => ({
                                        ...prev,
                                        Avionteapi: true,
                                    }))
                                        : null}
                                />}
                                label="Add to Avionteapi"
                            />
                        </AccordionDetails>
                    </Accordion>
                    : null
                }
                {userLocalData.adminSettings(ID_ATS_JOBDIVA) ?
                    <Accordion disableGutters square expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
                        <AccordionSummary
                            expandIcon={expanded === 'panel8' ? <RemoveIcon /> : <AddIcon />}
                            aria-controls="panel8bh-content"
                            id="panel8bh-header"
                        >
                            <Stack className='title' direction="row" justifyContent="space-between">
                                <div>
                                    <span className="customIcon">JD</span>
                                    <label>Add to JobDiva</label>
                                </div>

                                {expanded !== 'panel8' && optionFlags.JobDiva ? <CheckCircleIcon className="checkIcon" /> : null}
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormControlLabel control={
                                <Checkbox
                                    onChange={(e) => e.target.checked ? setOptionFlags(prev => ({
                                        ...prev,
                                        JobDiva: true,
                                    }))
                                        : null}
                                />}
                                label="JobDiva"
                            />

                            <p>Select Company Name</p>

                            <FormControl fullWidth>

                                <TextField fullWidth
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    id='compTitle'
                                    name="compTitle"
                                    placeholder="Select Company Name"
                                    title="Select Company Name"
                                    // label="Select Company Name"  
                                    value={compId}
                                    onChange={(e) => {
                                        setCompId(e.target.value);
                                    }}
                                    select
                                >
                                    {/* <MenuItem  value="" >Select Company Name</MenuItem> */}
                                    {
                                        selectedCompName.map((val: any) => {
                                            return <MenuItem key={val.id} value={val.label} >{val.label}</MenuItem>
                                        })
                                    }
                                </TextField>
                            </FormControl>
                        </AccordionDetails>
                    </Accordion>
                    : null
                }
            </DialogContent>
            <Divider />
            <DialogActions>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={onSave}
                >
                    Save
                </Button>
                <Button
                    variant='outlined'
                    color='secondary'
                    onClick={onClose}
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddToListsDialog;