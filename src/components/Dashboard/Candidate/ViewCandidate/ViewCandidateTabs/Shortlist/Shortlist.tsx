import { useEffect, useState, Fragment } from "../../../../../../shared/modules/React";
import { Typography } from "../../../../../../shared/modules/MaterialImports/Typography";
import { Box } from "../../../../../../shared/modules/MaterialImports/Box";
import { Stack } from "../../../../../../shared/modules/MaterialImports/Stack";
import { Menu, MenuItem } from "../../../../../../shared/modules/MaterialImports/Menu";
// import { trackPromise } from 'react-promise-tracker';
// import tick from '../../../../../../assets/icons/tick.svg';
// import cross from '../../../../../../assets/icons/cross.svg';

// import ApiService from "../../../../../../shared/api/api"
// import { userLocalData } from "../../../../../../shared/services/userData";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogTitle, DialogContent, DialogActions} from '../../../../../../shared/modules/MaterialImports/Dialog';
import { IconButton, Button, Grid } from '../../../../../../shared/modules/commonImports';
import { Radio, RadioGroup }  from '../../../../../../shared/modules/MaterialImports/FormElements';
import { Card, CardContent } from '../../../../../../shared/modules/MaterialImports/Card';
import { FormControlLabel, FormControl } from '../../../../../../shared/modules/MaterialImports/FormInputs';
// import TextField from '@mui/material/TextField';
import { MUIAutoComplete } from "../../../../../shared/MUIAutoComplete/MUIAutoComplete";
import { DatePicker, LocalizationProvider, AdapterLuxon } from '../../../../../../shared/modules/MaterialImports/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { Accordion, AccordionSummary, AccordionDetails } from '../../../../../../shared/modules/MaterialImports/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


import './Shortlist.scss';
import InitiateOnboard from "./Popups/InitiateOnboard/InitiateOnboard";
import InternalSubmission from "./Popups/InternalSubmission/InternalSubmission";
import CommonDialog from "./Popups/CommonDialog/CommonDialog";
import InterviewsDialog from "./Popups/InterviewsDialog/InterviewsDialog";
import EditInternalSubmission from "./Popups/EditInternalSubmission/EditInternalSubmission";
import EditInterview from "./Popups/EditInterview/EditInterview";
import EditInterviewDetails from "./Popups/EditInterviewDetails/EditInterviewDetails";
import { userLocalData } from "../../../../../../shared/services/userData";
import ApiService from "../../../../../../shared/api/api";
import { showToaster } from "../../../../../shared/SnackBar/SnackBar";

interface ShortlistLog {
    candid: string,
    currstatus: string,
    jobid: string,
    nextStatus: [
        { statusName: string, statusId: string }
    ],
    prevstatus: string,
    recrid: string,
    statuslog: [{}],
    userid: string
}


const Shortlist = (
    { candidateId, jobId, shortlistData, refreshShortlistBar }: { candidateId?: string, jobId?: string, shortlistData: any, refreshShortlistBar: any }
) => {

    // console.log("shortlist");
    // console.log(shortlistData);

    // const [shortlistData, setShortlistData] = useState<{
    //     statusLog: []
    //     shortlistCurrentStatus: string;
    //     shortlistPrevStatus: string;
    //     shortlistLog: ShortlistLog
    // }>({
    //     statusLog: [],
    //     shortlistCurrentStatus: "",
    //     shortlistPrevStatus: "",
    //     shortlistLog: {
    //         candid: "",
    //         currstatus: "",
    //         jobid: "",
    //         nextaction: [
    //             { name: "", id: "" }
    //         ],
    //         prevstatus: "",
    //         recrid: "",
    //         statuslog: [{}],
    //         userid: ""
    //     }
    // });
    // const loadShortListLog = () => {

    //     if (candidateId && jobId) {
    //         trackPromise(
    //             ApiService.getByParams(193, 'Candidate/getShortlistBar.jsp', { jobId: jobId, candId: candidateId, userId: userLocalData.getvalue('recrId') }).then(
    //                 (response: any) => {
    //                     // console.log(response.data);
    //                     const listResponse = JSON.stringify(response.data);
    //                     let res = listResponse.replace(/\\"/g, '"');
    //                     res = res.replace(/\"\[/g, '[');
    //                     res = res.replace(/]\"/g, ']');
    //                     const data = JSON.parse(res);
    //                     setShortlistData({
    //                         statusLog: data.statuslog,
    //                         shortlistCurrentStatus: data.currstatus,
    //                         shortlistPrevStatus: data.prevstatus,
    //                         shortlistLog: data
    //                     });
    //                 }
    //             ))
    //     }
    // }

    const [dialogOpen, setDialogOpen] = useState(false);
    const [ISDialogOpen, setISDialogOpen] = useState(false);
    const [nextAction, setNextAction] = useState("");
    const [assignedTo, setAssignedTo] = useState("");
    const [ISassignedTo, setISAssignedTo] = useState("");
    const [expandedAcc, setExpandedAcc] = useState<string | false>(false);
    const [expandedSubAcc, setExpandedSubAcc] = useState<string | false>(false);

    const handleAccChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpandedAcc(isExpanded ? panel : false);
        };

    const handleSubAccChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpandedSubAcc(isExpanded ? panel : false);
        };

    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLElement>,
        index: number,
        action: string
    ) => {
        setSelectedIndex(index);
        setAnchorEl(null);
        // if (action === "8") {
        //     setInternalSubmissionModal(true);
        // } else if (action === "20" || action === "21" || action === "24" || action === "25") {
        //     setInterviewsModal(true);
        // } else if (action === "27") {
        //     setInitiateOnboardModal(true);
        // } else {
        //     setCommonModal(true);
        //     setNextAction(action ? action : "");
        // }
        shortlistCandidate(action);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleISDialogClose = () => {
        setISDialogOpen(false)
    }

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedIndex, setSelectedIndex] = useState(1);
    const open = Boolean(anchorEl);
    const setSource = (img: any) => {
        try {
            let src = new URL(`../../../../../../assets/icons/${img}.svg`, import.meta.url).href;
            if (!src.endsWith('/undefined')) {
                return src
            }
            return new URL(`../../../../../../assets/icons/img.svg`, import.meta.url).href;
        }
        catch (err) {
            let src1 = new URL(`../../../../../../assets/icons/img.svg`, import.meta.url).href;
            return src1
        }
    }
    useEffect(() => {
        // loadShortListLog();
    }, [jobId]);

    const [internalSubmissionModal, setInternalSubmissionModal] = useState(false);
    const [initiateOnboardModal, setInitiateOnboardModal] = useState(false);
    const [commonModal, setCommonModal] = useState(false);
    const [interviewsModal, setInterviewsModal] = useState(false);
    const [editInterviewModal, setEditInterviewModal] = useState(false);
    const [editInterviewDetailsModal, setEditInterviewDetailsModal] = useState(false);
    const [editSubmissionModal, setEditSubmissionModal] = useState(false);

    const recruiter = {
        "id": shortlistData.shortlistLog.recrId,
        "name": shortlistData.shortlistLog.recrName
    }

    const checkAction = (status: string) => {
        if (status === '8') setEditSubmissionModal(true);
        if (status === '20' || status === '21' || status === '24' || status === '25') setEditInterviewModal(true);
    }



    const shortlistCandidate = (status: string) => {

        let apiData = {
            // 'JobId': jobId,
            // 'Username': userLocalData.getvalue("userName"),
            // 'doneBy': userLocalData.getvalue("recrId"),
            // 'Status': nextAction,
            // 'CandId': candidateId,
            // 'prevStatus': 1,
            // 'EmpId': userLocalData.getvalue("recrId"),
            // 'statusDate': "",
            // 'openId': shortlistData.openId
            // clientId: "",

            recrId: userLocalData.getvalue("recrId"),
            openId: shortlistData.openId,
            status: status
        }

        ApiService.getByParams(193, 'Curately/Candidate/shortlistSave.jsp', apiData).then(
            (response: any) => {
                // console.log(response)
                if (response.data.Message === "Success") {
                    showToaster("Candidate has been Shortlisted", 'success');
                    refreshShortlistBar();
                    handleDialogClose();
                } else {
                    showToaster(response.data.Message, 'error');
                }
            })
    }


    return (
        <Card className="customCard p-0 mb-3">
            <CardContent className="pb-0">
                {/*  ((shortlistData?.statusLog?.length === 0) || !(shortlistData.shortlistLog?.nextStatus?.length > 0)) */}
                {/* (shortlistData.shortlistCurrentStatus === "0") */}
                {
                    (shortlistData.shortlistLog?.currStatus === "0") ?
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                        >
                            {
                                shortlistData.shortlistLog?.nextStatus?.length ?
                                    shortlistData.shortlistLog?.nextStatus.map((stage: { statusId: string, statusName: string }) => {
                                        return <Button key={stage.statusId} color="primary" variant="contained" className="mt-3 ml-4 mb-5 mr-3" onClick={() => shortlistCandidate(stage.statusId)}>{stage.statusName}</Button>
                                    })
                                    :
                                    null
                            }
                        </Grid>
                        :
                        null
                }
                {/* ${shortlistData?.statusLog?.length ? '' : 'd-none'} */}
                <div className={`card ${(shortlistData.shortlistLog?.currStatus === "0") ? 'd-none' : ''}`}>
                    <div className='card-inner'>
                        <Box className="statusbar">
                            <ul className='status-ul'>
                                {
                                    shortlistData.statusLog && shortlistData.statusLog.map((item: any, i: number) => (
                                        <li key={i} className='completed'>
                                            {Number(item.status) > 0 ? <DoneIcon className="doneOrClose" /> : <CloseIcon className="doneOrClose" />}
                                            {/* <img src={Number(item.status) > 0 ? tick : cross} alt="" /> */}
                                            <Stack direction="row" className='imtext-stack'>
                                                <Box className="icon-wrap">
                                                    {setSource(item.statusName) &&
                                                        <img
                                                            src={setSource(item.statusName)}
                                                            alt={item.statusName}
                                                            className='can-svgimg'
                                                            onClick={() => checkAction(item.status)}
                                                        />
                                                    }
                                                </Box>
                                                <Box className="status-text">
                                                    <Typography className='status'>{item.statusName}</Typography>
                                                    <Typography className='date-text'>on {item.status_dt}</Typography>
                                                    <Typography className='user'>{item.recrName}</Typography>
                                                </Box>
                                            </Stack>
                                        </li>
                                    ))

                                }
                                {shortlistData.shortlistLog ? (shortlistData.shortlistLog?.nextStatus?.length > 0) &&
                                    <li className='active cusDropdown'>
                                        <Box
                                            id="lock-button"
                                            aria-haspopup="listbox"
                                            aria-controls="lock-menu"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={handleClickListItem}
                                        >
                                            <img src={new URL('../../../../../../assets/icons/right arrow.svg', import.meta.url).href} alt="" />
                                        </Box>
                                        <Menu
                                            id="lock-menu"
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            MenuListProps={{
                                                'aria-labelledby': 'lock-button',
                                                role: 'listbox',
                                            }}
                                        >
                                            {shortlistData.shortlistLog.nextStatus.map((option: any, index: number) => (
                                                <MenuItem
                                                    key={index + option.statusName}
                                                    onClick={(event) => handleMenuItemClick(event, index, option.statusId)}
                                                >
                                                    <Stack direction="row" alignItems="center">
                                                        <Box sx={{ width: 20 }} mr={1}>

                                                            {setSource(option.statusName) &&
                                                                <img src={setSource(option.statusName)} alt={option.statusName} className='can-svgimg' />
                                                            }
                                                        </Box>
                                                        <Typography>{option.statusName}</Typography>
                                                    </Stack>
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </li>
                                    : ""
                                }
                            </ul>
                        </Box>
                    </div>

                    {/* <Button type="button" onClick={() => { setEditSubmissionModal(true) }} className="btnPrimary mr-5">Edit Internal Submission</Button>
                    <Button type="button" onClick={() => { setEditInterviewModal(true) }} className="btnPrimary">Edit Interview</Button>
                    <Button type="button" onClick={() => { setEditInterviewDetailsModal(true) }} className="btnPrimary">Edit Interview Details</Button> */}

                    <Dialog
                        maxWidth={'md'}
                        fullWidth={true} open={ISDialogOpen} className='AddJobModal'
                        id='internalSubDialogBox'
                    >
                        <DialogTitle className="header">
                            <span>Internal Submission</span>

                            <IconButton
                                aria-label="close"
                                onClick={handleISDialogClose}
                                className="closeBtn"
                            >
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent>
                            <form id="internalSubForm" name="internalSubForm">
                                <div className="actionCard">
                                    <FormControl>
                                        <label className="input-label">Taking action on behalf of <span style={{ color: 'red' }}>*</span></label>
                                        <RadioGroup
                                            row
                                            name="ISassignedTo"
                                            value={ISassignedTo}
                                            onChange={(e) => setISAssignedTo((e.target as HTMLInputElement).value)}
                                        >
                                            <FormControlLabel value="you" control={<Radio />} label="You" />
                                            {/* <FormControlLabel value="mastan vali" control={<Radio />} label="Mastan Vali" /> */}
                                            <FormControlLabel value="other" control={<Radio />} label="Other User" />
                                        </RadioGroup>
                                    </FormControl>

                                    {assignedTo === "other" && <div className="userInput">
                                        <MUIAutoComplete
                                            id='ISuser'
                                            handleChange={(id: any, name: string) => {
                                                // console.log(id, name)
                                            }}
                                            valuePassed={{}}
                                            isMultiple={false}
                                            width="100%"
                                            type='id'
                                            placeholder={
                                                <Fragment>
                                                    user
                                                    <span style={{ color: 'red' }}>*</span>
                                                </Fragment>
                                            }
                                        />
                                    </div>}
                                    <Stack direction="row" spacing={2} mt={2}>
                                        <LocalizationProvider dateAdapter={AdapterLuxon}>
                                            <DatePicker
                                                label={
                                                    <Fragment>
                                                        Date
                                                        <span style={{ color: 'red' }}>*</span>
                                                    </Fragment>
                                                }
                                                slotProps={{ textField: { size: 'small' } }}
                                                onChange={(date: any) => console.log(date)}
                                            />
                                        </LocalizationProvider>
                                        <LocalizationProvider dateAdapter={AdapterLuxon}>
                                            <TimePicker
                                                label={
                                                    <Fragment>
                                                        Time
                                                        <span style={{ color: 'red' }}>*</span>
                                                    </Fragment>
                                                }
                                                slotProps={{ textField: { size: 'small' } }}
                                                viewRenderers={{
                                                    hours: renderTimeViewClock,
                                                    minutes: renderTimeViewClock,
                                                    seconds: renderTimeViewClock,
                                                }}
                                                onChange={(time: any) => console.log(time)}
                                            />
                                        </LocalizationProvider>
                                    </Stack>
                                </div>

                                <div className="accordianWrap">
                                    <Accordion expanded={expandedAcc === 'is1'} onChange={handleAccChange('is1')}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="is1-content"
                                            id="is1-header"
                                        >
                                            <Typography className="acc-title">
                                                Personal Information <small>- Filled 4 of 34</small>
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails className="p-0">
                                            <div className="subAccordians">
                                                <Accordion expanded={expandedSubAcc === 'personalInfoIS1'} onChange={handleSubAccChange('personalInfoIS1')}>
                                                    <AccordionSummary
                                                        expandIcon={
                                                            <Fragment>
                                                                {expandedSubAcc !== 'personalInfoIS1' ? <AddIcon /> : <RemoveIcon />}
                                                            </Fragment>
                                                        }
                                                        aria-controls="personalInfoIS1-content"
                                                        id="personalInfoIS1-header"
                                                    >
                                                        <Typography className="acc-title-sub">
                                                            Contact Details <small>- Filled 2 of 9</small>
                                                        </Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails className="p-0">
                                                        <div className="subAccordians">

                                                        </div>
                                                    </AccordionDetails>
                                                </Accordion>
                                                <Accordion expanded={expandedSubAcc === 'personalInfoIS2'} onChange={handleSubAccChange('personalInfoIS2')}>
                                                    <AccordionSummary
                                                        expandIcon={
                                                            <Fragment>
                                                                {expandedSubAcc !== 'personalInfoIS2' ? <AddIcon /> : <RemoveIcon />}
                                                            </Fragment>
                                                        }
                                                        aria-controls="personalInfoIS2-content"
                                                        id="personalInfoIS2-header"
                                                    >
                                                        <Typography className="acc-title-sub">
                                                            Education <small>- Filled 2 of 9</small>
                                                        </Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails className="p-0">
                                                        <div className="subAccordians">

                                                        </div>
                                                    </AccordionDetails>
                                                </Accordion>
                                            </div>
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={handleISDialogClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                            >
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog>
                    {
                        commonModal ?
                            <CommonDialog
                                dialogOpen={commonModal}
                                handleDialogClose={() => { setCommonModal(false) }}
                                nextAction={nextAction}
                                recruiter={recruiter}
                                candidateId={candidateId ? candidateId : ''}
                                jobId={jobId ? jobId : ''}
                                currStatus={shortlistData.shortlistCurrentStatus}
                                refreshShortlistBar={refreshShortlistBar}
                                openId={shortlistData.openId}
                            />
                            : null
                    }
                    {
                        initiateOnboardModal ?
                            <InitiateOnboard
                                dialogOpen={initiateOnboardModal}
                                handleDialogClose={() => { setInitiateOnboardModal(false) }}
                                recruiter={recruiter}
                            />
                            :
                            null
                    }
                    {
                        internalSubmissionModal ?
                            <InternalSubmission
                                dialogOpen={internalSubmissionModal}
                                handleDialogClose={() => { setInternalSubmissionModal(false) }}
                                recruiter={recruiter}
                                nextAction={nextAction}
                                candidateId={candidateId ? candidateId : ''}
                                jobId={jobId ? jobId : ''}
                                currStatus={shortlistData.shortlistCurrentStatus}
                                refreshShortlistBar={refreshShortlistBar}
                            />
                            :
                            null
                    }
                    {
                        interviewsModal ?
                            <InterviewsDialog
                                dialogOpen={interviewsModal}
                                handleDialogClose={() => { setInterviewsModal(false) }}
                                recruiter={recruiter}
                                nextAction={nextAction}
                                candidateId={candidateId ? candidateId : ''}
                                jobId={jobId ? jobId : ''}
                                currStatus={shortlistData.shortlistCurrentStatus}
                            />
                            :
                            null
                    }
                    {
                        editInterviewModal ?
                            <EditInterview
                                dialogOpen={editInterviewModal}
                                handleDialogClose={() => { setEditInterviewModal(false) }}
                                handleEditDetails={() => { setEditInterviewDetailsModal(true); setEditInterviewModal(false) }}
                            />
                            :
                            null
                    }
                    {
                        editInterviewDetailsModal ?
                            <EditInterviewDetails
                                dialogOpen={editInterviewDetailsModal}
                                handleDialogClose={() => { setEditInterviewDetailsModal(false) }} />
                            :
                            null
                    }
                    {
                        editSubmissionModal ?
                            <EditInternalSubmission
                                dialogOpen={editSubmissionModal}
                                handleDialogClose={() => { setEditSubmissionModal(false) }} />
                            :
                            null
                    }
                </div>
            </CardContent>
        </Card>
    )
}

export default Shortlist;