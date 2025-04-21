import { useEffect, useState } from '../../../../../shared/modules/React';
import { TextField, FormControlLabel, FormControl } from '../../../../../shared/modules/MaterialImports/FormInputs';
import { Stack } from '../../../../../shared/modules/MaterialImports/Stack';
import { Grid } from '../../../../../shared/modules/MaterialImports/Grid';
import { Card, CardContent } from '../../../../../shared/modules/MaterialImports/Card';
import { Radio, RadioGroup } from '../../../../../shared/modules/MaterialImports/FormElements';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { MenuItem } from '../../../../../shared/modules/MaterialImports/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '../../../../../shared/modules/MaterialImports/Button';
import { Accordion, AccordionDetails, AccordionSummary } from '../../../../../shared/modules/MaterialImports/Accordion';
import { Typography } from '../../../../../shared/modules/MaterialImports/Typography';
import { Chip } from '../../../../../shared/modules/MaterialImports/Chip';
import { Dialog, DialogTitle, DialogContent } from '../../../../../shared/modules/MaterialImports/Dialog';
import { DatePicker, LocalizationProvider, AdapterLuxon } from '../../../../../shared/modules/MaterialImports/DatePicker';

import { DateTime } from '../../../../../shared/modules/Luxon';

import { CandidateStatus, HiringStatus, activityDetails } from '../CommunityFilters';
import { SourceInterface } from '../Community';


import '../CommunityFilters.scss';


const MoreFilters = (
    { communityFormik, open, handleClose, handleApplyFilters, isCRMEnabled, hiringStatusList, candidateStatusList, candidateActivityType, sourcesList }
        :
        {
            communityFormik: any;
            open: any;
            handleClose: any;
            handleApplyFilters: any;
            isCRMEnabled: any;
            hiringStatusList: any;
            candidateActivityType: any;
            candidateStatusList: any;
            sourcesList: SourceInterface[];
        }
) => {

    const [openAccordion, setOpenAccordion] = useState(null);


    const handleAccordionMoreFiltersChanges = (panel: any) => (_: any, isExpanded: any) => {
        setOpenAccordion(isExpanded ? panel : null);
    };



    // const tagNameCounts = communityFormik.values.tagName ? communityFormik.values.tagName.split(',').length : 0
    const selectedHiringStatusLabel = hiringStatusList.find((status: HiringStatus) => status.candStatusId === communityFormik.values.candidateActivities?.hiringStatusInValues)?.label || "";
    const selectedCandidateActivityLabel = candidateActivityType.find((status: activityDetails) => status.id === communityFormik.values.candidateActivities?.candidateActivityType)?.activityName || "";
    const selectedCandidateProfileLabel = sourcesList.find((status: SourceInterface) => status.sourceId === communityFormik.values.candidateActivities?.candidateProfileSource)?.sourceName || "";
    const selectedCandidateStatusLabel = candidateStatusList.find((status: CandidateStatus) => status.candidateStatusId === communityFormik.values.candidateActivities.candidateStatusInValues)?.candidateStatusName || "";


    useEffect(() => {
        setOpenAccordion(null);
    }, [open]);





    return <Dialog
        maxWidth={'md'}
        // className='dialog'
        // fullScreen
        // maxWidth={'lg'}
        fullWidth={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        id='CommunityMoreFilters'


    >
        <DialogTitle className='py-2'>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ minHeight: "auto !important" }}
            >
                <span >
                    Filters
                </span>
                <Grid
                    container
                    direction="row"
                    justifyContent="end"
                    alignItems="end"
                >
                    <Button variant="contained" color="primary" className='mr-2' onClick={handleApplyFilters}>Apply Filters</Button>
                    <Button variant="outlined" type='button' color="secondary" className='mr-2' onClick={handleClose}>Close</Button>

                </Grid>

            </Stack>
        </DialogTitle>
        <DialogContent className='morefilter-height '>

            <div >
                <Grid container spacing={2} size={12} >
                    {!isCRMEnabled ?
                        <Grid size={4}>
                            <div className='customCard'>
                                <h3> Community Member Activity </h3>

                                <Accordion className='jobApplication ' disableGutters square expanded={openAccordion === 'panel1'} onChange={handleAccordionMoreFiltersChanges('panel1')}>

                                    <AccordionSummary
                                        expandIcon={<ArrowDropDownIcon />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        <Stack sx={{ width: '100%' }}>
                                            <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                <Stack direction="row" alignItems="center">
                                                    <Typography>Job Application</Typography>
                                                </Stack>
                                                {(communityFormik.values.communityMemberActivity.jobApplication !== "") &&
                                                    <Stack
                                                        className='clearStack'
                                                        direction="row"
                                                        justifyContent="space-around"
                                                        onClick={(e) => { e.stopPropagation(); communityFormik.setFieldValue("communityMemberActivity.jobApplication", "") }}
                                                    >
                                                        <CloseIcon />
                                                        <Typography>
                                                            {communityFormik.values.communityMemberActivity.jobApplication !== "" && 1}
                                                        </Typography>
                                                    </Stack>
                                                }
                                            </Stack>
                                            {(communityFormik.values.communityMemberActivity.jobApplication !== "" && openAccordion !== 'panel1') &&
                                                <Stack direction="row" mt={1} flexWrap="wrap">
                                                    <div className='filterLabelName'>Job Application:</div>
                                                    <Chip label={communityFormik.values.communityMemberActivity.jobApplication === "365" ? "1 Year" : communityFormik.values.communityMemberActivity.jobApplication + " Days "} deleteIcon={<CloseIcon />} className='selectedChips' onDelete={(e) => { e.stopPropagation(); communityFormik.setFieldValue("communityMemberActivity.jobApplication", "") }} />
                                                </Stack>
                                            }
                                        </Stack>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <TextField
                                            className={`mt-2`}
                                            fullWidth
                                            variant="outlined"
                                            size="small"
                                            select
                                            name={`Job Application`}
                                            value={communityFormik.values.communityMemberActivity.jobApplication}
                                            onChange={(e) => {
                                                communityFormik.setFieldValue("communityMemberActivity.jobApplication", e.target.value);
                                            }}
                                        >
                                            <MenuItem value={"30"}>30 Days</MenuItem>
                                            <MenuItem value={"60"}>60 Days</MenuItem>
                                            <MenuItem value={"120"}>120 Days</MenuItem>
                                            <MenuItem value={"365"}>1 Years</MenuItem>
                                        </TextField>

                                    </AccordionDetails>
                                </Accordion>

                                <Accordion className='jobApplication ' expanded={openAccordion === 'panel2'} onChange={handleAccordionMoreFiltersChanges('panel2')}>

                                    <AccordionSummary
                                        expandIcon={<ArrowDropDownIcon />}
                                        aria-controls="panel2-content"
                                        id="panel2-header"
                                    >
                                        <Stack sx={{ width: '100%' }}>
                                            <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                <Stack direction="row" alignItems="center">
                                                    <Typography>Profile Update</Typography>
                                                </Stack>
                                                {(communityFormik.values.communityMemberActivity.profileUpdate !== "") &&
                                                    <Stack
                                                        className='clearStack'
                                                        direction="row"
                                                        justifyContent="space-around"
                                                        onClick={(e) => { e.stopPropagation(); communityFormik.setFieldValue("communityMemberActivity.profileUpdate", "") }}
                                                    >
                                                        <CloseIcon />
                                                        <Typography>
                                                            {communityFormik.values.communityMemberActivity.profileUpdate !== "" && 1}
                                                        </Typography>
                                                    </Stack>
                                                }
                                            </Stack>
                                            {(communityFormik.values.communityMemberActivity.profileUpdate !== "" && openAccordion !== 'panel2') &&
                                                <Stack direction="row" mt={1} flexWrap="wrap">
                                                    <div className='filterLabelName'>Profile Update:</div>
                                                    <Chip label={communityFormik.values.communityMemberActivity.profileUpdate === "365" ? "1 Year" : communityFormik.values.communityMemberActivity.profileUpdate + " Days "} deleteIcon={<CloseIcon />} className='selectedChips' onDelete={(e) => { e.stopPropagation(); communityFormik.setFieldValue("communityMemberActivity.profileUpdate", "") }} />
                                                </Stack>
                                            }
                                        </Stack>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <TextField
                                            className={`mt-2`}
                                            fullWidth
                                            variant="outlined"
                                            size="small"
                                            select
                                            name={`Profile Update`}
                                            value={communityFormik.values.communityMemberActivity.profileUpdate}
                                            onChange={(e) => {
                                                communityFormik.setFieldValue("communityMemberActivity.profileUpdate", e.target.value);
                                            }}
                                        >
                                            <MenuItem value={"30"}>30 Days</MenuItem>
                                            <MenuItem value={"60"}>60 Days</MenuItem>
                                            <MenuItem value={"120"}>120 Days</MenuItem>
                                            <MenuItem value={"365"}>1 Years</MenuItem>
                                        </TextField>
                                    </AccordionDetails>
                                </Accordion>

                                <Accordion className='jobApplication ' expanded={openAccordion === 'panel3'} onChange={handleAccordionMoreFiltersChanges('panel3')}>

                                    <AccordionSummary
                                        expandIcon={<ArrowDropDownIcon />}
                                        aria-controls="panel3-content"
                                        id="panel3-header"
                                    >
                                        <Stack sx={{ width: '100%' }}>
                                            <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                <Stack direction="row" alignItems="center">
                                                    <Typography>Availability Status updated in last</Typography>
                                                </Stack>
                                                {(communityFormik.values.communityMemberActivity.avaliablityStatusUpdate !== "") &&
                                                    <Stack
                                                        className='clearStack'
                                                        direction="row"
                                                        justifyContent="space-around"
                                                        onClick={(e) => { e.stopPropagation(); communityFormik.setFieldValue("communityMemberActivity.avaliablityStatusUpdate", "") }}
                                                    >
                                                        <CloseIcon />
                                                        <Typography>
                                                            {communityFormik.values.communityMemberActivity.avaliablityStatusUpdate !== "" && 1}
                                                        </Typography>
                                                    </Stack>
                                                }
                                            </Stack>
                                            {(communityFormik.values.communityMemberActivity.avaliablityStatusUpdate !== "" && openAccordion !== 'panel3') &&
                                                <Stack direction="row" mt={1} flexWrap="wrap">
                                                    <div className='filterLabelName'>Availability Status updated in last:</div>
                                                    <Chip label={communityFormik.values.communityMemberActivity.avaliablityStatusUpdate === "365" ? "1 Year" : communityFormik.values.communityMemberActivity.avaliablityStatusUpdate + " Days "} deleteIcon={<CloseIcon />} className='selectedChips' onDelete={(e) => { e.stopPropagation(); communityFormik.setFieldValue("communityMemberActivity.avaliablityStatusUpdate", "") }} />
                                                </Stack>
                                            }
                                        </Stack>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <TextField
                                            className={`mt-2`}
                                            fullWidth
                                            variant="outlined"
                                            size="small"
                                            select
                                            name={`avaliablityStatusUpdate`}
                                            value={communityFormik.values.communityMemberActivity.avaliablityStatusUpdate}
                                            onChange={(e) => {
                                                communityFormik.setFieldValue("communityMemberActivity.avaliablityStatusUpdate", e.target.value);
                                            }}
                                        >
                                            <MenuItem value={"30"}>30 Days</MenuItem>
                                            <MenuItem value={"60"}>60 Days</MenuItem>
                                            <MenuItem value={"120"}>120 Days</MenuItem>
                                            <MenuItem value={"365"}>1 Years</MenuItem>
                                        </TextField>
                                    </AccordionDetails>
                                </Accordion>

                                <Accordion className='jobApplication ' expanded={openAccordion === 'panel4'} onChange={handleAccordionMoreFiltersChanges('panel4')}>

                                    <AccordionSummary
                                        expandIcon={<ArrowDropDownIcon />}
                                        aria-controls="panel4-content"
                                        id="panel4-header"
                                    >
                                        <Stack sx={{ width: '100%' }}>
                                            <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                <Stack direction="row" alignItems="center">
                                                    <Typography>Shift Preference updated in last</Typography>
                                                </Stack>
                                                {(communityFormik.values.communityMemberActivity.shiftPrefernceUpdate !== "") &&
                                                    <Stack
                                                        className='clearStack'
                                                        direction="row"
                                                        justifyContent="space-around"
                                                        onClick={(e) => { e.stopPropagation(); communityFormik.setFieldValue("communityMemberActivity.shiftPrefernceUpdate", "") }}
                                                    >
                                                        <CloseIcon />
                                                        <Typography>
                                                            {communityFormik.values.communityMemberActivity.shiftPrefernceUpdate !== "" && 1}
                                                        </Typography>
                                                    </Stack>
                                                }
                                            </Stack>
                                            {(communityFormik.values.communityMemberActivity.shiftPrefernceUpdate !== "" && openAccordion !== 'panel4') &&
                                                <Stack direction="row" mt={1} flexWrap="wrap">
                                                    <div className='filterLabelName'>Shift Preference updated in last:</div>
                                                    <Chip label={communityFormik.values.communityMemberActivity.shiftPrefernceUpdate === "365" ? "1 Year" : communityFormik.values.communityMemberActivity.shiftPrefernceUpdate + " Days "} deleteIcon={<CloseIcon />} className='selectedChips' onDelete={(e) => { e.stopPropagation(); communityFormik.setFieldValue("communityMemberActivity.shiftPrefernceUpdate", "") }} />
                                                </Stack>
                                            }
                                        </Stack>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <TextField
                                            className={`mt-2`}
                                            fullWidth
                                            variant="outlined"
                                            size="small"
                                            select
                                            name={`Shift Preference Update`}
                                            value={communityFormik.values.communityMemberActivity.shiftPrefernceUpdate}
                                            onChange={(e) => {
                                                communityFormik.setFieldValue("communityMemberActivity.shiftPrefernceUpdate", e.target.value);
                                            }}
                                        >
                                            <MenuItem value={"30"}>30 Days</MenuItem>
                                            <MenuItem value={"60"}>60 Days</MenuItem>
                                            <MenuItem value={"120"}>120 Days</MenuItem>
                                            <MenuItem value={"365"}>1 Years</MenuItem>
                                        </TextField>
                                    </AccordionDetails>
                                </Accordion>

                                <Accordion className='jobApplication ' expanded={openAccordion === 'panel5'} onChange={handleAccordionMoreFiltersChanges('panel5')}>

                                    <AccordionSummary
                                        expandIcon={<ArrowDropDownIcon />}
                                        aria-controls="panel5-content"
                                        id="panel5-header"
                                    >
                                        <Stack sx={{ width: '100%' }}>
                                            <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                <Stack direction="row" alignItems="center">
                                                    <Typography>Preference updated in last </Typography>
                                                </Stack>
                                                {(communityFormik.values.communityMemberActivity.preferenceUpdate !== "") &&
                                                    <Stack
                                                        className='clearStack'
                                                        direction="row"
                                                        justifyContent="space-around"
                                                        onClick={(e) => { e.stopPropagation(); communityFormik.setFieldValue("communityMemberActivity.preferenceUpdate", "") }}
                                                    >
                                                        <CloseIcon />
                                                        <Typography>
                                                            {communityFormik.values.communityMemberActivity.preferenceUpdate !== "" && 1}
                                                        </Typography>
                                                    </Stack>
                                                }
                                            </Stack>
                                            {(communityFormik.values.communityMemberActivity.preferenceUpdate !== "" && openAccordion !== 'panel5') &&
                                                <Stack direction="row" mt={1} flexWrap="wrap">
                                                    <div className='filterLabelName'>Preference updated in last:</div>
                                                    <Chip label={communityFormik.values.communityMemberActivity.preferenceUpdate === "365" ? "1 Year" : communityFormik.values.communityMemberActivity.preferenceUpdate + " Days "} deleteIcon={<CloseIcon />} className='selectedChips' onDelete={(e) => { e.stopPropagation(); communityFormik.setFieldValue("communityMemberActivity.preferenceUpdate", "") }} />
                                                </Stack>
                                            }
                                        </Stack>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <TextField
                                            className={`mt-2`}
                                            fullWidth
                                            variant="outlined"
                                            size="small"
                                            select
                                            name={`Preferences Update`}
                                            value={communityFormik.values.communityMemberActivity.preferenceUpdate}
                                            onChange={(e) => {
                                                communityFormik.setFieldValue("communityMemberActivity.preferenceUpdate", e.target.value);
                                            }}
                                        >
                                            <MenuItem value={"30"}>30 Days</MenuItem>
                                            <MenuItem value={"60"}>60 Days</MenuItem>
                                            <MenuItem value={"120"}>120 Days</MenuItem>
                                            <MenuItem value={"365"}>1 Years</MenuItem>
                                        </TextField>
                                    </AccordionDetails>
                                </Accordion>

                                <Accordion expanded={openAccordion === 'panel6'} onChange={handleAccordionMoreFiltersChanges('panel6')}>

                                    <AccordionSummary
                                        expandIcon={<ArrowDropDownIcon />}
                                        aria-controls="panel6-content"
                                        id="panel6-header"
                                    >
                                        <Stack sx={{ width: '100%' }}>
                                            <Stack className='acc-title jobApplication ' direction="row" justifyContent="space-between">
                                                <Stack direction="row" alignItems="center">
                                                    <Typography>Profile Completion %</Typography>
                                                </Stack>
                                                {(communityFormik.values.communityMemberActivity.profileCompletion !== "") &&
                                                    <Stack
                                                        className='clearStack'
                                                        direction="row"
                                                        justifyContent="space-around"
                                                        onClick={(e) => { e.stopPropagation(); communityFormik.setFieldValue("communityMemberActivity.profileCompletion", "") }}
                                                    >
                                                        <CloseIcon />
                                                        <Typography>
                                                            {communityFormik.values.communityMemberActivity.profileCompletion !== "" && 1}
                                                        </Typography>
                                                    </Stack>
                                                }
                                            </Stack>
                                            {(communityFormik.values.communityMemberActivity.profileCompletion !== "" && openAccordion !== 'panel5') &&
                                                <Stack direction="row" mt={1} flexWrap="wrap">
                                                    <div className='filterLabelName'>Profile Completion %:</div>
                                                    <Chip label={communityFormik.values.communityMemberActivity.profileCompletion} deleteIcon={<CloseIcon />} className='selectedChips' onDelete={(e) => { e.stopPropagation(); communityFormik.setFieldValue("communityMemberActivity.profileCompletion", "") }} />
                                                </Stack>
                                            }
                                        </Stack>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Card className={`customCard p-0`}>
                                            <CardContent>
                                                <FormControl>
                                                    <RadioGroup
                                                        name="daysBack"
                                                        id="daysBack"
                                                        value={communityFormik.values.communityMemberActivity.profileCompletion}
                                                        onChange={(e) => {
                                                            communityFormik.setFieldValue("communityMemberActivity.profileCompletion", e.target.value);
                                                        }}
                                                    >
                                                        <FormControlLabel value="100%" control={<Radio />} label="100%" />
                                                        <FormControlLabel value="90% to 99%" control={<Radio />} label="90% to 99%" />
                                                        <FormControlLabel value="80% to 89%" control={<Radio />} label="80% to 89%" />
                                                        <FormControlLabel value="70% to 79%" control={<Radio />} label="70% to 79%" />
                                                        <FormControlLabel value="60% to 69%" control={<Radio />} label="60% to 69%" />
                                                        <FormControlLabel value="50% to 59%" control={<Radio />} label="50% to 59%" />
                                                        <FormControlLabel value="50% to 0%" control={<Radio />} label="50% to 0%" />
                                                    </RadioGroup>
                                                </FormControl>
                                            </CardContent>
                                        </Card>
                                    </AccordionDetails>
                                </Accordion>

                                <Accordion className='jobApplication ' expanded={openAccordion === 'panel7'} onChange={handleAccordionMoreFiltersChanges('panel7')}>
                                    <AccordionSummary
                                        expandIcon={<ArrowDropDownIcon />}
                                        aria-controls="panel7-content"
                                        id="panel7-header"
                                    >
                                        <Stack sx={{ width: '100%' }}>
                                            <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                <Stack direction="row" alignItems="center">
                                                    <Typography>Mobile Verified</Typography>
                                                </Stack>
                                                {(communityFormik.values.communityMemberActivity.mobileVerified !== "") &&
                                                    <Stack
                                                        className='clearStack'
                                                        direction="row"
                                                        justifyContent="space-around"
                                                        onClick={(e) => { e.stopPropagation(); communityFormik.setFieldValue("communityMemberActivity.mobileVerified", "") }}
                                                    >
                                                        <CloseIcon />
                                                        <Typography>
                                                            {communityFormik.values.communityMemberActivity.mobileVerified !== "" && 1}
                                                        </Typography>
                                                    </Stack>
                                                }
                                            </Stack>
                                            {(communityFormik.values.communityMemberActivity.mobileVerified !== "" && openAccordion !== 'panel7') &&
                                                <Stack direction="row" mt={1} flexWrap="wrap">
                                                    <div className='filterLabelName'>Mobile Verified:</div>
                                                    <Chip label={communityFormik.values.communityMemberActivity.mobileVerified === "1" ? "Yes" : communityFormik.values.communityMemberActivity.mobileVerified === "0" ? "No" : ""} deleteIcon={<CloseIcon />} className='selectedChips' onDelete={(e) => { e.stopPropagation(); communityFormik.setFieldValue("communityMemberActivity.mobileVerified", "") }} />
                                                </Stack>
                                            }
                                        </Stack>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <TextField
                                            className={`mt-2`}
                                            fullWidth
                                            variant="outlined"
                                            size="small"
                                            select
                                            name={`Mobile Verified`}
                                            value={communityFormik.values.communityMemberActivity.mobileVerified}
                                            onChange={(e) => {
                                                communityFormik.setFieldValue("communityMemberActivity.mobileVerified", e.target.value);
                                            }}
                                        >
                                            <MenuItem value={"1"}>Yes</MenuItem>
                                            <MenuItem value={"0"}>No</MenuItem>

                                        </TextField>
                                    </AccordionDetails>
                                </Accordion>
                                <h3>SMS</h3>
                                <Accordion className='jobApplication ' expanded={openAccordion === 'panel13'} onChange={handleAccordionMoreFiltersChanges('panel13')}>
                                    <AccordionSummary
                                        expandIcon={<ArrowDropDownIcon />}
                                        aria-controls="panel13-content"
                                        id="panel13-header"
                                    >
                                        <Stack sx={{ width: '100%' }}>
                                            <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                <Stack direction="row" alignItems="center">
                                                    <Typography>SMS Sent</Typography>
                                                </Stack>
                                                {(communityFormik.values.sms.smsSent !== "") &&
                                                    <Stack
                                                        className='clearStack'
                                                        direction="row"
                                                        justifyContent="space-around"
                                                        onClick={(e) => { e.stopPropagation(); communityFormik.setFieldValue("sms.smsSent", "") }}
                                                    >
                                                        <CloseIcon />
                                                        <Typography>
                                                            {communityFormik.values.sms.smsSent !== "" && 1}
                                                        </Typography>
                                                    </Stack>
                                                }
                                            </Stack>
                                            {(communityFormik.values.sms.smsSent !== "" && openAccordion !== 'panel13') &&
                                                <Stack direction="row" mt={1} flexWrap="wrap">
                                                    <div className='filterLabelName'>SMS Sent:</div>
                                                    <Chip label={communityFormik.values.sms.smsSent === "1" ? "Yes" : communityFormik.values.sms.smsSent === "0" ? "No" : ""} deleteIcon={<CloseIcon />} className='selectedChips' onDelete={(e) => { e.stopPropagation(); communityFormik.setFieldValue("sms.smsSent", "") }} />
                                                </Stack>
                                            }
                                        </Stack>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <TextField
                                            className={`mt-2`}
                                            fullWidth
                                            variant="outlined"
                                            size="small"
                                            select
                                            name={`SMS Sent`}
                                            value={communityFormik.values.sms.smsSent}
                                            onChange={(e) => {
                                                communityFormik.setFieldValue("sms.smsSent", e.target.value);
                                            }}
                                        >
                                            <MenuItem value={"1"}>Yes</MenuItem>
                                            <MenuItem value={"0"}>No</MenuItem>
                                        </TextField>
                                    </AccordionDetails>
                                </Accordion>

                                <Accordion className='jobApplication ' expanded={openAccordion === 'panel14'} onChange={handleAccordionMoreFiltersChanges('panel14')}>
                                    <AccordionSummary
                                        expandIcon={<ArrowDropDownIcon />}
                                        aria-controls="panel14-content"
                                        id="panel14-header"
                                    >
                                        <Stack sx={{ width: '100%' }}>
                                            <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                <Stack direction="row" alignItems="center">
                                                    <Typography>SMS Replied in last</Typography>
                                                </Stack>
                                                {(communityFormik.values.sms.smsReplied !== "") &&
                                                    <Stack
                                                        className='clearStack'
                                                        direction="row"
                                                        justifyContent="space-around"
                                                        onClick={(e) => { e.stopPropagation(); communityFormik.setFieldValue("sms.smsReplied", "") }}
                                                    >
                                                        <CloseIcon />
                                                        <Typography>
                                                            {communityFormik.values.sms.smsReplied !== "" && 1}
                                                        </Typography>
                                                    </Stack>
                                                }
                                            </Stack>
                                            {(communityFormik.values.sms.smsReplied !== "" && openAccordion !== 'panel14') &&
                                                <Stack direction="row" mt={1} flexWrap="wrap">
                                                    <div className='filterLabelName'>SMS Replied in last:</div>
                                                    <Chip label={communityFormik.values.sms.smsReplied === "365" ? "1 Year" : communityFormik.values.sms.smsReplied + " Days "} deleteIcon={<CloseIcon />} className='selectedChips' onDelete={(e) => { e.stopPropagation(); communityFormik.setFieldValue("sms.smsReplied", "") }} />
                                                </Stack>
                                            }
                                        </Stack>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <TextField
                                            className={`mt-2`}
                                            fullWidth
                                            variant="outlined"
                                            size="small"
                                            select
                                            name={`SMS Replied`}
                                            value={communityFormik.values.sms.smsReplied}
                                            onChange={(e) => {
                                                communityFormik.setFieldValue("sms.smsReplied", e.target.value);
                                            }}
                                        >
                                            <MenuItem value={"30"}>30 Days</MenuItem>
                                            <MenuItem value={"60"}>60 Days</MenuItem>
                                            <MenuItem value={"120"}>120 Days</MenuItem>
                                            <MenuItem value={"365"}>1 Years</MenuItem>
                                        </TextField>
                                    </AccordionDetails>
                                </Accordion>

                                <Accordion className='jobApplication ' expanded={openAccordion === 'panel15'} onChange={handleAccordionMoreFiltersChanges('panel15')}>
                                    <AccordionSummary
                                        expandIcon={<ArrowDropDownIcon />}
                                        aria-controls="panel15-content"
                                        id="panel15-header"
                                    >
                                        <Stack sx={{ width: '100%' }}>
                                            <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                <Stack direction="row" alignItems="center">
                                                    <Typography>SMS Unsubscribed</Typography>
                                                </Stack>
                                                {(communityFormik.values.sms.smsUnsubscribed !== "") &&
                                                    <Stack
                                                        className='clearStack'
                                                        direction="row"
                                                        justifyContent="space-around"
                                                        onClick={(e) => { e.stopPropagation(); communityFormik.setFieldValue("sms.smsUnsubscribed", "") }}
                                                    >
                                                        <CloseIcon />
                                                        <Typography>
                                                            {communityFormik.values.sms.smsUnsubscribed !== "" && 1}
                                                        </Typography>
                                                    </Stack>
                                                }
                                            </Stack>
                                            {(communityFormik.values.sms.smsUnsubscribed !== "" && openAccordion !== 'panel15') &&
                                                <Stack direction="row" mt={1} flexWrap="wrap">
                                                    <div className='filterLabelName'>SMS Unsubscribed:</div>
                                                    <Chip label={communityFormik.values.sms.smsUnsubscribed === "1" ? "Yes" : communityFormik.values.sms.smsUnsubscribed === "0" ? "No" : ""} deleteIcon={<CloseIcon />} className='selectedChips' onDelete={(e) => { e.stopPropagation(); communityFormik.setFieldValue("sms.smsUnsubscribed", "") }} />
                                                </Stack>
                                            }
                                        </Stack>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <TextField
                                            className={`mt-2`}
                                            fullWidth
                                            variant="outlined"
                                            size="small"
                                            select
                                            name={`SMS Unsubscribed`}
                                            value={communityFormik.values.sms.smsUnsubscribed}
                                            onChange={(e) => {
                                                communityFormik.setFieldValue("sms.smsUnsubscribed", e.target.value);
                                            }}
                                        >
                                            <MenuItem value={"1"}>Yes</MenuItem>
                                            <MenuItem value={"0"}>No</MenuItem>
                                        </TextField>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        </Grid>

                        :
                        null
                    }
                    <Grid size={4}>
                        <div className='customCard'>
                            <h3> Email</h3>

                            <Accordion className='jobApplication ' expanded={openAccordion === 'panel8'} onChange={handleAccordionMoreFiltersChanges('panel8')}>
                                <AccordionSummary
                                    expandIcon={<ArrowDropDownIcon />}
                                    aria-controls="panel8-content"
                                    id="panel8-header"
                                >
                                    <Stack sx={{ width: '100%' }}>
                                        <Stack className='acc-title' direction="row" justifyContent="space-between">
                                            <Stack direction="row" alignItems="center">
                                                <Typography>Email Clicked</Typography>
                                            </Stack>
                                            {(communityFormik.values.email.emailClicked !== "") &&
                                                <Stack
                                                    className='clearStack'
                                                    direction="row"
                                                    justifyContent="space-around"
                                                    onClick={(e) => { e.stopPropagation(); communityFormik.setFieldValue("email.emailClicked", "") }}
                                                >
                                                    <CloseIcon />
                                                    <Typography>
                                                        {communityFormik.values.email.emailClicked !== "" && 1}
                                                    </Typography>
                                                </Stack>
                                            }
                                        </Stack>
                                        {(communityFormik.values.email.emailClicked !== "" && openAccordion !== 'panel8') &&
                                            <Stack direction="row" mt={1} flexWrap="wrap">
                                                <div className='filterLabelName'>Email Clicked:</div>
                                                <Chip label={communityFormik.values.email.emailClicked === "365" ? "1 Year" : communityFormik.values.email.emailClicked + " Days "} deleteIcon={<CloseIcon />} className='selectedChips' onDelete={(e) => { e.stopPropagation(); communityFormik.setFieldValue("email.emailClicked", "") }} />
                                            </Stack>
                                        }
                                    </Stack>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TextField
                                        className={`mt-2`}
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        select
                                        name={`Email Clicked`}
                                        value={communityFormik.values.email.emailClicked}
                                        onChange={(e) => {
                                            communityFormik.setFieldValue("email.emailClicked", e.target.value);
                                        }}
                                    >
                                        <MenuItem value={"30"}>30 Days</MenuItem>
                                        <MenuItem value={"60"}>60 Days</MenuItem>
                                        <MenuItem value={"120"}>120 Days</MenuItem>
                                        <MenuItem value={"365"}>1 Years</MenuItem>

                                    </TextField>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion className='jobApplication ' expanded={openAccordion === 'panel9'} onChange={handleAccordionMoreFiltersChanges('panel9')}>
                                <AccordionSummary
                                    expandIcon={<ArrowDropDownIcon />}
                                    aria-controls="panel9-content"
                                    id="panel9-header"
                                >
                                    <Stack sx={{ width: '100%' }}>
                                        <Stack className='acc-title' direction="row" justifyContent="space-between">
                                            <Stack direction="row" alignItems="center">
                                                <Typography>Email Replied</Typography>
                                            </Stack>
                                            {(communityFormik.values.email.emailReplied !== "") &&
                                                <Stack
                                                    className='clearStack'
                                                    direction="row"
                                                    justifyContent="space-around"
                                                    onClick={(e) => { e.stopPropagation(); communityFormik.setFieldValue("email.emailReplied", "") }}
                                                >
                                                    <CloseIcon />
                                                    <Typography>
                                                        {communityFormik.values.email.emailReplied !== "" && 1}
                                                    </Typography>
                                                </Stack>
                                            }
                                        </Stack>
                                        {(communityFormik.values.email.emailReplied !== "" && openAccordion !== 'panel9') &&
                                            <Stack direction="row" mt={1} flexWrap="wrap">
                                                <div className='filterLabelName'>Email Replied:</div>
                                                <Chip label={communityFormik.values.email.emailReplied === "365" ? "1 Year" : communityFormik.values.email.emailReplied + " Days "} deleteIcon={<CloseIcon />} className='selectedChips' onDelete={(e) => { e.stopPropagation(); communityFormik.setFieldValue("email.emailReplied ", "") }} />
                                            </Stack>
                                        }
                                    </Stack>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TextField
                                        className={`mt-2`}
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        select
                                        name={`Email Replied`}
                                        value={communityFormik.values.email.emailReplied}
                                        onChange={(e) => {
                                            communityFormik.setFieldValue("email.emailReplied", e.target.value);
                                        }}
                                    >
                                        <MenuItem value={"30"}>30 Days</MenuItem>
                                        <MenuItem value={"60"}>60 Days</MenuItem>
                                        <MenuItem value={"120"}>120 Days</MenuItem>
                                        <MenuItem value={"365"}>1 Years</MenuItem>
                                    </TextField>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion className='jobApplication ' expanded={openAccordion === 'panel10'} onChange={handleAccordionMoreFiltersChanges('panel10')}>
                                <AccordionSummary
                                    expandIcon={<ArrowDropDownIcon />}
                                    aria-controls="panel10-content"
                                    id="panel10-header"
                                >
                                    <Stack sx={{ width: '100%' }}>
                                        <Stack className='acc-title' direction="row" justifyContent="space-between">
                                            <Stack direction="row" alignItems="center">
                                                <Typography>Email Bounced</Typography>
                                            </Stack>
                                            {(communityFormik.values.email.emailBounced !== "") &&
                                                <Stack
                                                    className='clearStack'
                                                    direction="row"
                                                    justifyContent="space-around"
                                                    onClick={(e) => { e.stopPropagation(); communityFormik.setFieldValue("email.emailBounced", "") }}
                                                >
                                                    <CloseIcon />
                                                    <Typography>
                                                        {communityFormik.values.email.emailBounced !== "" && 1}
                                                    </Typography>
                                                </Stack>
                                            }
                                        </Stack>
                                        {(communityFormik.values.email.emailBounced !== "" && openAccordion !== 'panel10') &&
                                            <Stack direction="row" mt={1} flexWrap="wrap">
                                                <div className='filterLabelName'>Email Bounced:</div>
                                                <Chip label={communityFormik.values.email.emailBounced === "1" ? "Yes" : communityFormik.values.email.emailBounced === "0" ? "No" : ""} deleteIcon={<CloseIcon />} className='selectedChips' onDelete={(e) => { e.stopPropagation(); communityFormik.setFieldValue("email.emailBounced", "") }} />
                                            </Stack>
                                        }
                                    </Stack>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TextField
                                        className={`mt-2`}
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        select
                                        name={`Email Bounced`}
                                        value={communityFormik.values.email.emailBounced}
                                        onChange={(e) => {
                                            communityFormik.setFieldValue("email.emailBounced", e.target.value);
                                        }}
                                    >
                                        <MenuItem value={"1"}>Yes</MenuItem>
                                        <MenuItem value={"0"}>No</MenuItem>
                                    </TextField>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion className='jobApplication ' expanded={openAccordion === 'panel11'} onChange={handleAccordionMoreFiltersChanges('panel11')}>
                                <AccordionSummary
                                    expandIcon={<ArrowDropDownIcon />}
                                    aria-controls="panel11-content"
                                    id="panel11-header"
                                >
                                    <Stack sx={{ width: '100%' }}>
                                        <Stack className='acc-title' direction="row" justifyContent="space-between">
                                            <Stack direction="row" alignItems="center">
                                                <Typography>Email Spam Blocked</Typography>
                                            </Stack>
                                            {(communityFormik.values.email.emailSpamBlocked !== "") &&
                                                <Stack
                                                    className='clearStack'
                                                    direction="row"
                                                    justifyContent="space-around"
                                                    onClick={(e) => { e.stopPropagation(); communityFormik.setFieldValue("email.emailSpamBlocked", "") }}
                                                >
                                                    <CloseIcon />
                                                    <Typography>
                                                        {communityFormik.values.email.emailSpamBlocked !== "" && 1}
                                                    </Typography>
                                                </Stack>
                                            }
                                        </Stack>
                                        {(communityFormik.values.email.emailSpamBlocked !== "" && openAccordion !== 'panel11') &&
                                            <Stack direction="row" mt={1} flexWrap="wrap">
                                                <div className='filterLabelName'>Email Spam Blocked:</div>
                                                <Chip label={communityFormik.values.email.emailSpamBlocked === "1" ? "Yes" : communityFormik.values.email.emailSpamBlocked === "0" ? "No" : ""} deleteIcon={<CloseIcon />} className='selectedChips' onDelete={(e) => { e.stopPropagation(); communityFormik.setFieldValue("email.emailSpamBlocked", "") }} />
                                            </Stack>
                                        }
                                    </Stack>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TextField
                                        className={`mt-2`}
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        select
                                        name={`Email Spam Blocked`}
                                        value={communityFormik.values.email.emailSpamBlocked}
                                        onChange={(e) => {
                                            communityFormik.setFieldValue("email.emailSpamBlocked", e.target.value);
                                        }}
                                    >
                                        <MenuItem value={"1"}>Yes</MenuItem>
                                        <MenuItem value={"0"}>No</MenuItem>
                                    </TextField>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion className='jobApplication ' expanded={openAccordion === 'panel12'} onChange={handleAccordionMoreFiltersChanges('panel12')}>
                                <AccordionSummary
                                    expandIcon={<ArrowDropDownIcon />}
                                    aria-controls="panel11-content"
                                    id="panel11-header"
                                >
                                    <Stack sx={{ width: '100%' }}>
                                        <Stack className='acc-title' direction="row" justifyContent="space-between">
                                            <Stack direction="row" alignItems="center">
                                                <Typography>Email Unsubscribed</Typography>
                                            </Stack>
                                            {(communityFormik.values.email.emailUnsubscribed !== "") &&
                                                <Stack
                                                    className='clearStack'
                                                    direction="row"
                                                    justifyContent="space-around"
                                                    onClick={(e) => { e.stopPropagation(); communityFormik.setFieldValue("email.emailUnsubscribed", "") }}
                                                >
                                                    <CloseIcon />
                                                    <Typography>
                                                        {communityFormik.values.email.emailUnsubscribed !== "" && 1}
                                                    </Typography>
                                                </Stack>
                                            }
                                        </Stack>
                                        {(communityFormik.values.email.emailUnsubscribed !== "" && openAccordion !== 'panel12') &&
                                            <Stack direction="row" mt={1} flexWrap="wrap">
                                                <div className='filterLabelName'>Email Unsubscribed:</div>
                                                <Chip label={communityFormik.values.email.emailUnsubscribed === "1" ? "Yes" : communityFormik.values.email.emailUnsubscribed === "0" ? "No" : ""} deleteIcon={<CloseIcon />} className='selectedChips' onDelete={(e) => { e.stopPropagation(); communityFormik.setFieldValue("email.emailUnsubscribed", "") }} />
                                            </Stack>
                                        }
                                    </Stack>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TextField
                                        className={`mt-2`}
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        select
                                        name={`Email Unsubscribed`}
                                        value={communityFormik.values.email.emailUnsubscribed}
                                        onChange={(e) => {
                                            communityFormik.setFieldValue("email.emailUnsubscribed", e.target.value);
                                        }}
                                    >
                                        <MenuItem value={"1"}>Yes</MenuItem>
                                        <MenuItem value={"0"}>No</MenuItem>
                                    </TextField>
                                </AccordionDetails>
                            </Accordion>
                            <h3> Curation activity </h3>
                            {!isCRMEnabled ?
                                <Accordion className='jobApplication ' expanded={openAccordion === 'panel16'} onChange={handleAccordionMoreFiltersChanges('panel16')}>
                                    <AccordionSummary
                                        expandIcon={<ArrowDropDownIcon />}
                                        aria-controls="panel16-content"
                                        id="panel16-header"
                                    >
                                        <Stack sx={{ width: '100%' }}>
                                            <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                <Stack direction="row" alignItems="center">
                                                    <Typography>Submission Activity</Typography>
                                                </Stack>
                                                {(communityFormik.values.curationActivity.submissionActivity !== "") &&
                                                    <Stack
                                                        className='clearStack'
                                                        direction="row"
                                                        justifyContent="space-around"
                                                        onClick={(e) => { e.stopPropagation(); communityFormik.setFieldValue("curationActivity.submissionActivity", "") }}
                                                    >
                                                        <CloseIcon />
                                                        <Typography>
                                                            {communityFormik.values.curationActivity.submissionActivity !== "" && 1}
                                                        </Typography>
                                                    </Stack>
                                                }
                                            </Stack>
                                            {(communityFormik.values.curationActivity.submissionActivity !== "" && openAccordion !== 'panel16') &&
                                                <Stack direction="row" mt={1} flexWrap="wrap">
                                                    <div className='filterLabelName'>Submission Activity:</div>
                                                    <Chip label={communityFormik.values.curationActivity.submissionActivity === "365" ? "1 Year" : communityFormik.values.curationActivity.submissionActivity + " Days "} deleteIcon={<CloseIcon />} className='selectedChips' onDelete={(e) => { e.stopPropagation(); communityFormik.setFieldValue("curationActivity.submissionActivity", "") }} />
                                                </Stack>
                                            }
                                        </Stack>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <TextField
                                            className={`mt-2`}
                                            fullWidth
                                            variant="outlined"
                                            size="small"
                                            select
                                            name={`Submission Activity`}
                                            value={communityFormik.values.curationActivity.submissionActivity}
                                            onChange={(e) => {
                                                communityFormik.setFieldValue("curationActivity.submissionActivity", e.target.value);
                                            }}
                                        >
                                            <MenuItem value={"30"}>30 Days</MenuItem>
                                            <MenuItem value={"60"}>60 Days</MenuItem>
                                            <MenuItem value={"120"}>120 Days</MenuItem>
                                            <MenuItem value={"365"}>1 Years</MenuItem>
                                        </TextField>
                                    </AccordionDetails>
                                </Accordion>
                                :
                                null
                            }
                            {!isCRMEnabled ?
                                <Accordion className='jobApplication ' expanded={openAccordion === 'panel17'} onChange={handleAccordionMoreFiltersChanges('panel17')}>
                                    <AccordionSummary
                                        expandIcon={<ArrowDropDownIcon />}
                                        aria-controls="panel17-content"
                                        id="panel17-header"
                                    >
                                        <Stack sx={{ width: '100%' }}>
                                            <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                <Stack direction="row" alignItems="center">
                                                    <Typography>Interview Activity</Typography>
                                                </Stack>
                                                {(communityFormik.values.curationActivity.interviewActivity !== "") &&
                                                    <Stack
                                                        className='clearStack'
                                                        direction="row"
                                                        justifyContent="space-around"
                                                        onClick={(e) => { e.stopPropagation(); communityFormik.setFieldValue("curationActivity.interviewActivity", "") }}
                                                    >
                                                        <CloseIcon />
                                                        <Typography>
                                                            {communityFormik.values.curationActivity.interviewActivity !== "" && 1}
                                                        </Typography>
                                                    </Stack>
                                                }
                                            </Stack>
                                            {(communityFormik.values.curationActivity.interviewActivity !== "" && openAccordion !== 'panel17') &&
                                                <Stack direction="row" mt={1} flexWrap="wrap">
                                                    <div className='filterLabelName'>Interview Activity:</div>
                                                    <Chip label={communityFormik.values.curationActivity.interviewActivity === "365" ? "1 Year" : communityFormik.values.curationActivity.interviewActivity + " Days "} deleteIcon={<CloseIcon />} className='selectedChips' onDelete={(e) => { e.stopPropagation(); communityFormik.setFieldValue("curationActivity.interviewActivity", "") }} />
                                                </Stack>
                                            }
                                        </Stack>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <TextField
                                            className={`mt-2`}
                                            fullWidth
                                            variant="outlined"
                                            size="small"
                                            select
                                            name={`Interview Activity`}
                                            value={communityFormik.values.curationActivity.interviewActivity}
                                            onChange={(e) => {
                                                communityFormik.setFieldValue("curationActivity.interviewActivity", e.target.value);
                                            }}
                                        >
                                            <MenuItem value={"30"}>30 Days</MenuItem>
                                            <MenuItem value={"60"}>60 Days</MenuItem>
                                            <MenuItem value={"120"}>120 Days</MenuItem>
                                            <MenuItem value={"365"}>1 Years</MenuItem>
                                        </TextField>
                                    </AccordionDetails>
                                </Accordion>
                                :
                                null
                            }
                            <Accordion className='jobApplication ' expanded={openAccordion === 'panel18'} onChange={handleAccordionMoreFiltersChanges('panel18')}>
                                <AccordionSummary
                                    expandIcon={<ArrowDropDownIcon />}
                                    aria-controls="panel18-content"
                                    id="panel18-header"
                                >
                                    <Stack sx={{ width: '100%' }}>
                                        <Stack className='acc-title' direction="row" justifyContent="space-between">
                                            <Stack direction="row" alignItems="center">
                                                <Typography>Rating</Typography>
                                            </Stack>
                                            {(communityFormik.values.curationActivity.rating !== "") &&
                                                <Stack
                                                    className='clearStack'
                                                    direction="row"
                                                    justifyContent="space-around"
                                                    onClick={(e) => { e.stopPropagation(); communityFormik.setFieldValue("curationActivity.rating", "") }}
                                                >
                                                    <CloseIcon />
                                                    <Typography>
                                                        {communityFormik.values.curationActivity.rating !== "" && 1}
                                                    </Typography>
                                                </Stack>
                                            }
                                        </Stack>
                                        {(communityFormik.values.curationActivity.rating !== "" && openAccordion !== 'panel18') &&
                                            <Stack direction="row" mt={1} flexWrap="wrap">
                                                <div className='filterLabelName'>Rating:</div>
                                                <Chip label={communityFormik.values.curationActivity.rating} deleteIcon={<CloseIcon />} className='selectedChips' onDelete={(e) => { e.stopPropagation(); communityFormik.setFieldValue("curationActivity.rating", "") }} />
                                            </Stack>
                                        }
                                    </Stack>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TextField
                                        className={`mt-2`}
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        select
                                        name={`Rating`}
                                        value={communityFormik.values.curationActivity.rating}
                                        onChange={(e) => {
                                            communityFormik.setFieldValue("curationActivity.rating", e.target.value);
                                        }}
                                    >
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                    </TextField>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion className='jobApplication ' expanded={openAccordion === 'panel19'} onChange={handleAccordionMoreFiltersChanges('panel19')}>
                                <AccordionSummary
                                    expandIcon={<ArrowDropDownIcon />}
                                    aria-controls="panel19-content"
                                    id="panel19-header"
                                >
                                    <Stack sx={{ width: '100%' }}>
                                        <Stack className='acc-title' direction="row" justifyContent="space-between">
                                            <Stack direction="row" alignItems="center">
                                                <Typography>Notes</Typography>
                                            </Stack>
                                            {(communityFormik.values.curationActivity.notes !== "") &&
                                                <Stack
                                                    className='clearStack'
                                                    direction="row"
                                                    justifyContent="space-around"
                                                    onClick={(e) => { e.stopPropagation(); communityFormik.setFieldValue("curationActivity.notes", "") }}
                                                >
                                                    <CloseIcon />
                                                    <Typography>
                                                        {communityFormik.values.curationActivity.notes !== "" && 1}
                                                    </Typography>
                                                </Stack>
                                            }
                                        </Stack>
                                        {(communityFormik.values.curationActivity.notes !== "" && openAccordion !== 'panel19') &&
                                            <Stack direction="row" mt={1} flexWrap="wrap">
                                                <div className='filterLabelName'>Notes:</div>
                                                <Chip label={communityFormik.values.curationActivity.notes === "1" ? "Yes" : communityFormik.values.curationActivity.notes === "0" ? "No" : ""} deleteIcon={<CloseIcon />} className='selectedChips' onDelete={(e) => { e.stopPropagation(); communityFormik.setFieldValue("curationActivity.notes", "") }} />
                                            </Stack>
                                        }
                                    </Stack>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TextField
                                        className={`mt-2`}
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        select
                                        name={`Notes`}
                                        value={communityFormik.values.curationActivity.notes}
                                        onChange={(e) => {
                                            communityFormik.setFieldValue("curationActivity.notes", e.target.value);
                                        }}
                                    >
                                        <MenuItem value={"1"}>Yes</MenuItem>
                                        <MenuItem value={"0"}>No</MenuItem>
                                    </TextField>
                                </AccordionDetails>
                            </Accordion>

                        </div>
                    </Grid>

                    <Grid size={4}>

                        <div className='customCard'>
                            <h3> Candidate Activities </h3>
                            <Accordion className='jobApplication ' expanded={openAccordion === 'panel20'} onChange={handleAccordionMoreFiltersChanges('panel20')}>
                                <AccordionSummary
                                    expandIcon={<ArrowDropDownIcon />}
                                    aria-controls="panel20-content"
                                    id="panel20-header"
                                >
                                    <Stack sx={{ width: '100%' }}>
                                        <Stack className='acc-title' direction="row" justifyContent="space-between">
                                            <Stack direction="row" alignItems="center">
                                                <Typography>Resume</Typography>
                                            </Stack>
                                            {(communityFormik.values.candidateActivities.resume !== "") &&
                                                <Stack
                                                    className='clearStack'
                                                    direction="row"
                                                    justifyContent="space-around"
                                                    onClick={(e) => { e.stopPropagation(); communityFormik.setFieldValue("candidateActivities.resume", "") }}
                                                >
                                                    <CloseIcon />
                                                    <Typography>
                                                        {communityFormik.values.candidateActivities.resume !== "" && 1}
                                                    </Typography>
                                                </Stack>
                                            }
                                        </Stack>
                                        {(communityFormik.values.candidateActivities.resume !== "" && openAccordion !== 'panel20') &&
                                            <Stack direction="row" mt={1} flexWrap="wrap">
                                                <div className='filterLabelName'>Resume:</div>
                                                <Chip label={communityFormik.values.candidateActivities.resume === "1" ? "Yes" : communityFormik.values.candidateActivities.resume === "0" ? "No" : ""} deleteIcon={<CloseIcon />} className='selectedChips' onDelete={(e) => { e.stopPropagation(); communityFormik.setFieldValue("candidateActivities.resume", "") }} />
                                            </Stack>
                                        }
                                    </Stack>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TextField
                                        className={`mt-2`}
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        select
                                        name={`Resume`}
                                        value={communityFormik.values.candidateActivities.resume}
                                        onChange={(e) => {
                                            communityFormik.setFieldValue("candidateActivities.resume", e.target.value);
                                        }}
                                    >
                                        <MenuItem value={"1"}>Yes</MenuItem>
                                        <MenuItem value={"0"}>No</MenuItem>
                                    </TextField>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion className='jobApplication ' expanded={openAccordion === 'panel21'} onChange={handleAccordionMoreFiltersChanges('panel21')}>
                                <AccordionSummary
                                    expandIcon={<ArrowDropDownIcon />}
                                    aria-controls="panel21-content"
                                    id="panel21-header"
                                >
                                    <Stack sx={{ width: '100%' }}>
                                        <Stack className='acc-title' direction="row" justifyContent="space-between">
                                            <Stack direction="row" alignItems="center">
                                                <Typography>Contact</Typography>
                                            </Stack>
                                            {(communityFormik.values.candidateActivities.contact !== "") &&
                                                <Stack
                                                    className='clearStack'
                                                    direction="row"
                                                    justifyContent="space-around"
                                                    onClick={(e) => { e.stopPropagation(); communityFormik.setFieldValue("candidateActivities.contact", "") }}
                                                >
                                                    <CloseIcon />
                                                    <Typography>
                                                        {communityFormik.values.candidateActivities.contact !== "" && 1}
                                                    </Typography>
                                                </Stack>
                                            }
                                        </Stack>
                                        {(communityFormik.values.candidateActivities.contact !== "" && openAccordion !== 'panel21') &&
                                            <Stack direction="row" mt={1} flexWrap="wrap">
                                                <div className='filterLabelName'>Contact:</div>
                                                <Chip label={communityFormik.values.candidateActivities.contact === "1" ? "Yes" : communityFormik.values.candidateActivities.contact === "0" ? "No" : ""} deleteIcon={<CloseIcon />} className='selectedChips' onDelete={(e) => { e.stopPropagation(); communityFormik.setFieldValue("candidateActivities.contact", "") }} />
                                            </Stack>
                                        }
                                    </Stack>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TextField
                                        className={`mt-2`}
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        select
                                        name={`Contact`}
                                        value={communityFormik.values.candidateActivities.contact}
                                        onChange={(e) => {
                                            communityFormik.setFieldValue("candidateActivities.contact", e.target.value);
                                        }}
                                    >
                                        <MenuItem value={"1"}>Yes</MenuItem>
                                        <MenuItem value={"0"}>No</MenuItem>
                                    </TextField>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion className='jobApplication ' expanded={openAccordion === 'panel22'} onChange={handleAccordionMoreFiltersChanges('panel22')}>
                                <AccordionSummary
                                    expandIcon={<ArrowDropDownIcon />}
                                    aria-controls="panel22-content"
                                    id="panel22-header"
                                >
                                    <Stack sx={{ width: '100%' }}>
                                        <Stack className='acc-title' direction="row" justifyContent="space-between">
                                            <Stack direction="row" alignItems="center">
                                                <Typography>Email</Typography>
                                            </Stack>
                                            {(communityFormik.values.candidateActivities.email !== "") &&
                                                <Stack
                                                    className='clearStack'
                                                    direction="row"
                                                    justifyContent="space-around"
                                                    onClick={(e) => { e.stopPropagation(); communityFormik.setFieldValue("candidateActivities.email", "") }}
                                                >
                                                    <CloseIcon />
                                                    <Typography>
                                                        {communityFormik.values.candidateActivities.email !== "" && 1}
                                                    </Typography>
                                                </Stack>
                                            }
                                        </Stack>
                                        {(communityFormik.values.candidateActivities.email !== "" && openAccordion !== 'panel22') &&
                                            <Stack direction="row" mt={1} flexWrap="wrap">
                                                <div className='filterLabelName'>Email:</div>
                                                <Chip label={communityFormik.values.candidateActivities.email === "1" ? "Yes" : communityFormik.values.candidateActivities.email === "0" ? "No" : ""} deleteIcon={<CloseIcon />} className='selectedChips' onDelete={(e) => { e.stopPropagation(); communityFormik.setFieldValue("candidateActivities.email", "") }} />
                                            </Stack>
                                        }
                                    </Stack>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TextField
                                        className={`mt-2`}
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        select
                                        name={`Email`}
                                        value={communityFormik.values.candidateActivities.email}
                                        onChange={(e) => {
                                            communityFormik.setFieldValue("candidateActivities.email", e.target.value);
                                        }}
                                    >
                                        <MenuItem value={"1"}>Yes</MenuItem>
                                        <MenuItem value={"0"}>No</MenuItem>
                                    </TextField>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion className='jobApplication  ' expanded={openAccordion === 'panel23'} onChange={handleAccordionMoreFiltersChanges('panel23')}>
                                <AccordionSummary
                                    expandIcon={<ArrowDropDownIcon />}
                                    aria-controls="panel23-content"
                                    id="panel23-header"
                                >
                                    <Stack sx={{ width: '100%' }}>
                                        <Stack className='acc-title' direction="row" justifyContent="space-between">
                                            <Stack direction="row" alignItems="center">
                                                <Typography>Candidate last activity date</Typography>
                                            </Stack>
                                            {(communityFormik.values.candidateActivities.candidateLastActivityDate !== "") &&
                                                <Stack
                                                    className='clearStack'
                                                    direction="row"
                                                    justifyContent="space-around"
                                                    onClick={(e) => { e.stopPropagation(); communityFormik.setFieldValue("candidateActivities.candidateLastActivityDate", "") }}
                                                >
                                                    <CloseIcon />
                                                    <Typography>
                                                        {communityFormik.values.candidateActivities.candidateLastActivityDate !== "" && 1}
                                                    </Typography>
                                                </Stack>
                                            }
                                        </Stack>
                                        {(communityFormik.values.candidateActivities.candidateLastActivityDate !== "" && openAccordion !== 'panel23') &&
                                            <Stack direction="row" mt={1} flexWrap="wrap">
                                                <div className='filterLabelName'>Candidate last activity date:</div>
                                                <Chip label={communityFormik.values.candidateActivities.candidateLastActivityDate} deleteIcon={<CloseIcon />} className='selectedChips' onDelete={(e) => { e.stopPropagation(); communityFormik.setFieldValue("candidateActivities.candidateLastActivityDate", "") }} />
                                            </Stack>
                                        }
                                    </Stack>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <LocalizationProvider dateAdapter={AdapterLuxon} >
                                        <DatePicker
                                            label="Date"
                                            slotProps={{ textField: { size: 'small' } }}
                                            sx={{ width: '100%' }}
                                            onChange={(date: any) => communityFormik.setFieldValue("candidateActivities.candidateLastActivityDate", (date) ? date?.toFormat('MM/dd/yyyy') : null, true)}
                                            value={(communityFormik.values.candidateActivities.candidateLastActivityDate) ? DateTime.fromFormat(communityFormik.values.candidateActivities.candidateLastActivityDate, 'MM/dd/yyyy') : null}
                                        />
                                    </LocalizationProvider>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion className='jobApplication ' expanded={openAccordion === 'panel24'} onChange={handleAccordionMoreFiltersChanges('panel24')}>
                                <AccordionSummary
                                    expandIcon={<ArrowDropDownIcon />}
                                    aria-controls="panel24-content"
                                    id="panel24-header"
                                >
                                    <Stack sx={{ width: '100%' }}>
                                        <Stack className='acc-title' direction="row" justifyContent="space-between">
                                            <Stack direction="row" alignItems="center">
                                                <Typography>Candidate activity type</Typography>
                                            </Stack>
                                            {(communityFormik.values.candidateActivities.candidateActivityType !== "") &&
                                                <Stack
                                                    className='clearStack'
                                                    direction="row"
                                                    justifyContent="space-around"
                                                    onClick={(e) => { e.stopPropagation(); communityFormik.setFieldValue("candidateActivities.candidateActivityType", "") }}
                                                >
                                                    <CloseIcon />
                                                    <Typography>
                                                        {communityFormik.values.candidateActivities.candidateActivityType !== "" && 1}
                                                    </Typography>
                                                </Stack>
                                            }
                                        </Stack>
                                        {(communityFormik.values.candidateActivities.candidateActivityType !== "" && openAccordion !== 'panel24') &&
                                            <Stack direction="row" mt={1} flexWrap="wrap">
                                                <div className='filterLabelName'>Candidate activity type:</div>
                                                <Chip label={selectedCandidateActivityLabel} deleteIcon={<CloseIcon />} className='selectedChips' onDelete={(e) => { e.stopPropagation(); communityFormik.setFieldValue("candidateActivities.candidateActivityType", "") }} />
                                            </Stack>
                                        }
                                    </Stack>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TextField
                                        className={`mt-2`}
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        select
                                        name={`Candidate activity type`}
                                        value={communityFormik.values.candidateActivities.candidateActivityType}
                                        onChange={(e) => {
                                            communityFormik.setFieldValue("candidateActivities.candidateActivityType", e.target.value);
                                        }}
                                    >
                                        {candidateActivityType.map((status: activityDetails) => (
                                            <MenuItem key={status.id} value={status.id}>
                                                {status.activityName}
                                            </MenuItem>
                                        ))}

                                    </TextField>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion className='jobApplication ' expanded={openAccordion === 'panel25'} onChange={handleAccordionMoreFiltersChanges('panel25')}>
                                <AccordionSummary
                                    expandIcon={<ArrowDropDownIcon />}
                                    aria-controls="panel25-content"
                                    id="panel25-header"
                                >
                                    <Stack sx={{ width: '100%' }}>
                                        <Stack className='acc-title' direction="row" justifyContent="space-between">
                                            <Stack direction="row" alignItems="center">
                                                <Typography>Placement end date</Typography>
                                            </Stack>
                                            {(communityFormik.values.candidateActivities.placementEndDate !== "") &&
                                                <Stack
                                                    className='clearStack'
                                                    direction="row"
                                                    justifyContent="space-around"
                                                    onClick={(e) => { e.stopPropagation(); communityFormik.setFieldValue("candidateActivities.placementEndDate", "") }}
                                                >
                                                    <CloseIcon />
                                                    <Typography>
                                                        {communityFormik.values.candidateActivities.placementEndDate !== "" && 1}
                                                    </Typography>
                                                </Stack>
                                            }
                                        </Stack>
                                        {(communityFormik.values.candidateActivities.placementEndDate !== "" && openAccordion !== 'panel25') &&
                                            <Stack direction="row" mt={1} flexWrap="wrap">
                                                <div className='filterLabelName'>Placement end date:</div>
                                                <Chip label={communityFormik.values.candidateActivities.placementEndDate} deleteIcon={<CloseIcon />} className='selectedChips' onDelete={(e) => { e.stopPropagation(); communityFormik.setFieldValue("candidateActivities.placementEndDate", "") }} />
                                            </Stack>
                                        }
                                    </Stack>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <LocalizationProvider dateAdapter={AdapterLuxon} >
                                        <DatePicker
                                            label="Date"
                                            slotProps={{ textField: { size: 'small' } }}
                                            sx={{ width: '100%' }}
                                            onChange={(date: any) => communityFormik.setFieldValue("candidateActivities.placementEndDate", (date) ? date?.toFormat('MM/dd/yyyy') : null, true)}
                                            value={(communityFormik.values.candidateActivities.placementEndDate) ? DateTime.fromFormat(communityFormik.values.candidateActivities.placementEndDate, 'MM/dd/yyyy') : null}
                                        />
                                    </LocalizationProvider>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion className='jobApplication ' expanded={openAccordion === 'panel26'} onChange={handleAccordionMoreFiltersChanges('panel26')}>
                                <AccordionSummary
                                    expandIcon={<ArrowDropDownIcon />}
                                    aria-controls="panel26-content"
                                    id="panel26-header"
                                >
                                    <Stack sx={{ width: '100%' }}>
                                        <Stack className='acc-title' direction="row" justifyContent="space-between">
                                            <Stack direction="row" alignItems="center">
                                                <Typography>Hiring status in values</Typography>
                                            </Stack>
                                            {(communityFormik.values.candidateActivities.hiringStatusInValues !== "") &&
                                                <Stack
                                                    className='clearStack'
                                                    direction="row"
                                                    justifyContent="space-around"
                                                    onClick={(e) => { e.stopPropagation(); communityFormik.setFieldValue("candidateActivities.hiringStatusInValues", "") }}
                                                >
                                                    <CloseIcon />
                                                    <Typography>
                                                        {communityFormik.values.candidateActivities.hiringStatusInValues !== "" && 1}
                                                    </Typography>
                                                </Stack>
                                            }
                                        </Stack>
                                        {(communityFormik.values.candidateActivities.hiringStatusInValues !== "" && openAccordion !== 'panel26') &&
                                            <Stack direction="row" mt={1} flexWrap="wrap">
                                                <div className='filterLabelName'>Hiring status in values:</div>
                                                <Chip label={selectedHiringStatusLabel} deleteIcon={<CloseIcon />} className='selectedChips' onDelete={(e) => { e.stopPropagation(); communityFormik.setFieldValue("candidateActivities.hiringStatusInValues", "") }} />
                                            </Stack>
                                        }
                                    </Stack>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TextField
                                        className={`mt-2`}
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        select
                                        name={`Hiring status in values`}
                                        value={communityFormik.values.candidateActivities.hiringStatusInValues}
                                        onChange={(e) => {
                                            communityFormik.setFieldValue("candidateActivities.hiringStatusInValues", e.target.value);
                                        }}
                                    >
                                        {/* <MenuItem value={"1"}>On Boarding</MenuItem>
                                <MenuItem value={"0"}>Start</MenuItem> */}
                                        {hiringStatusList.map((status: HiringStatus) => (
                                            <MenuItem key={status.candStatusId} value={status.candStatusId}>
                                                {status.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion className='jobApplication ' expanded={openAccordion === 'panel27'} onChange={handleAccordionMoreFiltersChanges('panel27')}>
                                <AccordionSummary
                                    expandIcon={<ArrowDropDownIcon />}
                                    aria-controls="panel27-content"
                                    id="panel27-header"
                                >
                                    <Stack sx={{ width: '100%' }}>
                                        <Stack className='acc-title' direction="row" justifyContent="space-between">
                                            <Stack direction="row" alignItems="center">
                                                <Typography>Candidate status in values</Typography>
                                            </Stack>
                                            {(communityFormik.values.candidateActivities.candidateStatusInValues !== "") &&
                                                <Stack
                                                    className='clearStack'
                                                    direction="row"
                                                    justifyContent="space-around"
                                                    onClick={(e) => { e.stopPropagation(); communityFormik.setFieldValue("candidateActivities.candidateStatusInValues", "") }}
                                                >
                                                    <CloseIcon />
                                                    <Typography>
                                                        {communityFormik.values.candidateActivities.candidateStatusInValues !== "" && 1}
                                                    </Typography>
                                                </Stack>
                                            }
                                        </Stack>
                                        {(communityFormik.values.candidateActivities.candidateStatusInValues !== "" && openAccordion !== 'panel27') &&
                                            <Stack direction="row" mt={1} flexWrap="wrap">
                                                <div className='filterLabelName'>Candidate status in values:</div>
                                                <Chip label={selectedCandidateStatusLabel} deleteIcon={<CloseIcon />} className='selectedChips' onDelete={(e) => { e.stopPropagation(); communityFormik.setFieldValue("candidateActivities.candidateStatusInValues", "") }} />
                                            </Stack>
                                        }
                                    </Stack>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TextField
                                        className={`mt-2`}
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        select
                                        name={`Candidate status in values`}
                                        value={communityFormik.values.candidateActivities.candidateStatusInValues}
                                        onChange={(e) => {
                                            communityFormik.setFieldValue("candidateActivities.candidateStatusInValues", e.target.value);
                                        }}
                                    >
                                        {/* <MenuItem value={"1"}>Shortlist</MenuItem>
                                <MenuItem value={"0"}>Interview</MenuItem>
                                <MenuItem value={"2"}>Forward To HM</MenuItem> */}
                                        {candidateStatusList.map((status: CandidateStatus) => (
                                            <MenuItem key={status.candidateStatusId} value={status.candidateStatusId}>
                                                {status.candidateStatusName}
                                            </MenuItem>
                                        ))}


                                    </TextField>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion className='jobApplication ' expanded={openAccordion === 'panel28'} onChange={handleAccordionMoreFiltersChanges('panel28')}>
                                <AccordionSummary
                                    expandIcon={<ArrowDropDownIcon />}
                                    aria-controls="panel28-content"
                                    id="panel28-header"
                                >
                                    <Stack sx={{ width: '100%' }}>
                                        <Stack className='acc-title' direction="row" justifyContent="space-between">
                                            <Stack direction="row" alignItems="center">
                                                <Typography>Candidate Profile source</Typography>
                                            </Stack>
                                            {(communityFormik.values.candidateActivities.candidateProfileSource !== "") &&
                                                <Stack
                                                    className='clearStack'
                                                    direction="row"
                                                    justifyContent="space-around"
                                                    onClick={(e) => { e.stopPropagation(); communityFormik.setFieldValue("candidateActivities.candidateProfileSource", "") }}
                                                >
                                                    <CloseIcon />
                                                    <Typography>
                                                        {communityFormik.values.candidateActivities.candidateProfileSource !== "" && 1}
                                                    </Typography>
                                                </Stack>
                                            }
                                        </Stack>
                                        {(communityFormik.values.candidateActivities.candidateProfileSource !== "" && openAccordion !== 'panel28') &&
                                            <Stack direction="row" mt={1} flexWrap="wrap">
                                                <div className='filterLabelName'>Candidate Profile source:</div>
                                                <Chip label={selectedCandidateProfileLabel} deleteIcon={<CloseIcon />} className='selectedChips' onDelete={(e) => { e.stopPropagation(); communityFormik.setFieldValue("candidateActivities.candidateProfileSource", "") }} />
                                            </Stack>
                                        }
                                    </Stack>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TextField
                                        className={`mt-2`}
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        select
                                        name={`Candidate Profile source`}
                                        value={communityFormik.values.candidateActivities.candidateProfileSource}
                                        onChange={(e) => {
                                            communityFormik.setFieldValue("candidateActivities.candidateProfileSource", e.target.value);
                                        }}
                                    >
                                        {
                                            sourcesList.map((source) => {
                                                return <MenuItem value={source.sourceId}>{source.sourceName}</MenuItem>
                                            })
                                        }

                                    </TextField>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </Grid>
                </Grid>
            </div>

        </DialogContent>
    </Dialog>
}

export default MoreFilters;