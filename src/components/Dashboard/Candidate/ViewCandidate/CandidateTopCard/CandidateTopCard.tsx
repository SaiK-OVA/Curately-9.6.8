import { useState, useEffect } from '../../../../../shared/modules/React';
import { Typography } from '../../../../../shared/modules/MaterialImports/Typography';
import { Box } from '../../../../../shared/modules/MaterialImports/Box';
import { Stack } from '../../../../../shared/modules/MaterialImports/Stack';
import { Button, IconButton, Grid } from '../../../../../shared/modules/commonImports';
import { Menu, MenuItem } from '../../../../../shared/modules/MaterialImports/Menu';
// import TextField from '@mui/material/TextField';
import { Divider } from '../../../../../shared/modules/MaterialImports/Divider';
// import Autocomplete from '@mui/material/Autocomplete';
// import Paper from '@mui/material/Paper';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { Tooltip } from '../../../../../shared/modules/MaterialImports/ToolTip';

//import Chip from '@mui/material/Chip';
// import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
// import TabPanel from '@mui/lab/TabPanel';
import CloudIcon from '@mui/icons-material/Cloud';
import BorderColorIcon from '@mui/icons-material/BorderColor';
// import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
// import ApartmentIcon from '@mui/icons-material/Apartment';
//import AddIcon from '@mui/icons-material/Add';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import ApiRequests from "../../../../../shared/api/api";
import { useParams } from 'react-router-dom';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import CloseIcon from '@mui/icons-material/Close';
// import { styled } from '@mui/material/styles';
import { userLocalData } from '../../../../../shared/services/userData';
import { showToaster } from '../../../../shared/SnackBar/SnackBar';
// import { LocationOnOutlined } from '@mui/icons-material';
import EmailDialogBox from '../../../../shared/EmailDialogBox/EmailDialogBox';
import EditCandidate from '../../EditCandidate/EditCandidate';
import AddDocumentModal from './Popups/AddDocumentModal/AddDocumentModal';
import AddResumeModal from './Popups/AddResumeModal/AddResumeModal';
import PhoneDialog from '../../../../shared/PhoneDialog/PhoneDialog';
import CardTravelOutlinedIcon from '@mui/icons-material/CardTravelOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
//import { DateTime } from 'luxon';


import './CandidateTopCard.scss';
//import { Grid } from '@mui/material';
//import { getDocumentIcon } from '../../../../../shared/modules/documentIcons';
import { trackPromise } from '../../../../../shared/modules/PromiseTrackter';
import { MUIAutoComplete } from '../../../../shared/MUIAutoComplete/MUIAutoComplete';
import { confirmDialog } from '../../../../shared/ConfirmDialog/ConfirmDialog';


const CandidateTopCard = (
    { candidateData, updateSelectedResume }: { candidateData: any, updateSelectedResume: any }
) => {


    const { candidateId, jobId } = useParams();
    const [openAddCandidateModal, setOpenAddCandidateModal] = useState(false);
    const [dialogPhoneStatus, setDialogPhoneStatus] = useState(false);
    const [phoneOnClicked, setPhoneOnClicked] = useState('');
    // const options = ['Option 1', 'Option 2'];
    // , jobId, sourceId

    // const [value, setSelectedTagValue] = useState(0);

    // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    //     setSelectedTagValue(newValue);
    // };

    // const [candidateData, setCandidateData] = useState<any>([]);
    // const [NameEditanchorEl, setNameEditAnchorEl] = useState<null | HTMLElement>(null);
    // const [addSequenceanchorEl, setAddSequenceAnchorEl] = useState<null | HTMLElement>(null);
    const [crmanchorEl, setCRMAnchorEl] = useState<null | HTMLElement>(null);
    // const [MoreanchorEl, setMoreAnchorEl] = useState<null | HTMLElement>(null);
    const [addtoPoollistanchorEl, setAddToPoolListAnchorEl] = useState<null | HTMLElement>(null);
    const [addtolistanchorEl, setAddToListAnchorEl] = useState<null | HTMLElement>(null);
    const [addtoSeqlistanchorEl, setAddToSeqListAnchorEl] = useState<null | HTMLElement>(null);
    const [resumesList, setResumesList] = useState<any[]>([]);
    //const [resumeMenuOpen, setResumeMenuOpen] = useState<HTMLElement | null>(null);
    // const openNameEdit = Boolean(NameEditanchorEl);
    // const openAddSequenceBtn = Boolean(addSequenceanchorEl);
    const openCRMBtn = Boolean(crmanchorEl);
    // const openMoreBtn = Boolean(MoreanchorEl);
    const openAddToListenBtn = Boolean(addtolistanchorEl);
    const openAddToSequenceListenBtn = Boolean(addtoSeqlistanchorEl);
    const openAddToPoolListenBtn = Boolean(addtoPoollistanchorEl);
    const [tagsListData, setTagsListData] = useState<any>([]);
    const [sequenceListData, setSequenceListData] = useState<any>([]);
    const [poolDistributionData, setPoolDistributionData] = useState<any>([]);

    const [selectedTalentPool, setSelectedTalentPool] = useState({
        id: "",
        name: ""
    });
    const [selectedTag, setSelectedTag] = useState({
        id: "",
        name: ""
    });

    const [selectedSequence, setSelectedSequence] = useState({
        id: "",
        name: ""
    });
    const [dialogStatus, setDialogStatus] = useState(false);
    const [emailOnClicked, setEmailOnClicked] = useState('');
    // const [canOverviewData, setCanOverviewData] = useState<any>([]);
    const [addDocumentModal, setAddDocumentModal] = useState(false);
    const [addResumeModal, setAddResumeModal] = useState(false);


    const handleProfileMenuClose = () => {
        // setAddSequenceAnchorEl(null);
        setCRMAnchorEl(null);
        // setMoreAnchorEl(null);
        setAddToListAnchorEl(null);
        setAddToPoolListAnchorEl(null);
        // setNameEditAnchorEl(null)
        setAddToSeqListAnchorEl(null);
    };

    const handleClickAddToSequenceListen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAddToSeqListAnchorEl(event.currentTarget);
    };
    const handleClickAddToListen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAddToListAnchorEl(event.currentTarget);
    };
    const handleClickAddToPoolListen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAddToPoolListAnchorEl(event.currentTarget);
    };

    const deleteTalentPoolId = (id: string) => {
        trackPromise(
            // deleteTalentPoolCommunity/10024627/17
            // candidateId + "/" + id
            // http://52.88.252.214:90/DemoCurately/deleteTalentPoolCommunity/pool_cand_id
            // ApiRequests.deleteById(214, 'deleteTalentPoolCommunity', id + "/" + userLocalData.getvalue('clientId'))
            // https://www4.accuick.com/Accuick_API/Curately/talent_pool_delete_index.jsp?clientId=2&pool_cand_id=2
            ApiRequests.postWithData("admin", 'talentPoolDelete', { clientId: userLocalData.getvalue('clientId'), poolCandId: id })
                .then(
                    (response: any) => {
                        // console.log(response)
                        if (response.data.Success === true) {
                            showToaster("Talent Pool deleted Successfully", 'success');
                            loadCanidateData();
                        } else {
                            showToaster(response.data.Message ? response.data.Message : "An error occured while deleting", 'error');
                        }
                    }
                )
                .catch(
                    (response: any) => {
                        showToaster(response.response?.data?.Message ? response.response?.data?.Message : "An error occured while deleting", 'error');
                    }

                )
        )
    }

    const deleteTagId = (id: string) => {
        trackPromise(
            ApiRequests.deleteById(214, 'deleteTagsCommunity', candidateId + "/" + id + "/" + userLocalData.getvalue('clientId'))
                .then(
                    (response: any) => {
                        // console.log(response)
                        if (response.data.Success) {
                            showToaster("Tag has been deleted Successfully", 'success');
                            loadCanidateData();
                        } else {
                            showToaster("An error occured while deleting", 'error');
                        }
                    }
                ))
    }

    const deleteSequenceId = (id: string) => {
        trackPromise(
            ApiRequests.postWithData('admin', 'sequenceDeleteUser', {
                sequenceId: id,
                userIds: candidateId,
                recrId: userLocalData.getvalue('recrId'),
                clientId: userLocalData.getvalue('clientId')
            })
                .then(
                    (response: any) => {
                        // console.log(response)
                        if (response.data.Message === "Success") {
                            showToaster("Sequence has been deleted Successfully", 'success');
                            loadCanidateData();
                        } else {
                            showToaster("An error occured while deleting", 'error');
                        }
                    }
                ))
    }

    useEffect(() => {
        //  loadDistributionList();
        //  loadTagDistributionList();
        loadCanidateData();
    }, []);

    useEffect(() => {
        trackPromise(
            ApiRequests.getByParams(193, '/Candidate/candidate_resumes_list.jsp', { candId: candidateId })
                .then((response) => {
                    // console.log(response.data);

                    setResumesList(response?.data)
                    // console.log("documentid" + response?.data[0]?.documentId)
                    if (response?.data[0]?.documentId && response?.data[0]?.fileExt) {
                        updateSelectedResume({
                            documentId: response?.data[0]?.documentId,
                            fileExt: response?.data[0]?.fileExt
                        })
                    }

                }));
    }, [candidateId])


    // user --> recru
    // candidate ---> user
    const loadCanidateData = () => {
        let clientId = userLocalData.getvalue('clientId');
        trackPromise(
            ApiRequests.getCall(214, `getcandidatedetails/${candidateId}/${clientId}`)
                .then(
                    (response: any) => {
                        //  console.log(response.data.talentpool);
                        setTagsListData(response.data.tags);
                        setPoolDistributionData(response.data.talentpool);
                        let sequenceList = [];
                        if (response.data.sequence && response.data.sequence.length) {
                            sequenceList = response.data.sequence.filter((ele: { sequenceID: number }, i: number) => response.data.sequence.findIndex((obj: { sequenceID: number }) => obj.sequenceID === ele.sequenceID) === i)
                            sequenceList = sequenceList.filter((ele: { isdelete: boolean }) => !ele.isdelete);
                            setSequenceListData(sequenceList);
                        }
                    }
                ))
    }

    const addToTagList = (id: string, name: string) => {
        if (name && name.trim()) {
            handleProfileMenuClose();
            const saveData = {
                tagId: id,
                tagName: name,
                userId: candidateId,
                createdBy: userLocalData.getvalue('recrId'),
                clientId: userLocalData.getvalue('clientId')
            }

            trackPromise(
                // :  http://35.155.202.216:8080/DemoCurately/saveorupdatetags
                ApiRequests.postWithData('admin', 'saveorupdatetags', saveData)
                    .then(
                        (response: any) => {
                            // console.log(response)
                            setSelectedTag({ id: "", name: "" });
                            if (response.data.Success) {
                                showToaster(response.data.Message, 'success');
                                loadCanidateData();
                            } else {
                                showToaster(response.data.Message ? response.data.Message : "An error occured while adding Tag", 'error')
                            }

                        }
                    )
            )
        }
    }

    const addToSequenceList = (id: string, name: string) => {
        if (name && name.trim()) {
            handleProfileMenuClose();
            const saveData = {
                clientId: userLocalData.getvalue('clientId'),
                sequenceId: id,
                recrId: userLocalData.getvalue('recrId'),
                userIds: candidateId,
            }


            //https://www4.accuick.com/Accuick_API/Curately/Sequence/sequence_assign_users.jsp?clientId=2&userIds=39&sequenceId=9&recrId=61
            ApiRequests.getByParams(193, 'Curately/Sequence/sequence_assign_users.jsp', saveData)
                .then(
                    (response: any) => {
                        // console.log(response);
                        showToaster((response.data.message) ? response.data.message : "sequence saved successfully", 'success');
                        loadCanidateData();
                        setSelectedSequence({ id: "", name: "" });

                        // if (response.data.Message === "Success") {
                        //     showToaster("Sequence has been assigned", 'success');
                        //     loadCanidateData();
                        //     setSelectedSequence({ id: "", name: "" });
                        // } else {
                        //     showToaster(response.data.Message ? response.data.Message : "An error occured while assigning ", 'error');
                        // }
                    }
                )
                .catch((error) => {
                    console.error("API Error:", error);
                });

        }
    }

    const addToTalentPool = (id: string, name: string) => {
        if (name && name.trim()) {
            handleProfileMenuClose();
            // const saveData = {
            //     poolId: id,
            //     poolName: name,
            //     candId: candidateId,
            //     createdBy: userLocalData.getvalue('recrId'),
            //     clientId: userLocalData.getvalue('clientId')
            // }
            const saveData = {
                clientId: userLocalData.getvalue('clientId'),
                poolId: id,
                recrId: userLocalData.getvalue('recrId'),
                userIds: candidateId,
            }

            // ApiRequests.postWithData(214, 'savetalentpool', saveData)
            trackPromise(
                // https://www4.accuick.com/Accuick_API/Curately/talent_pool_insert_index.jsp?clientId=2&poolId=23&recrId=61&userIds=22362
                ApiRequests.postWithData("admin", 'talentPoolInsertIndex', saveData)
                    .then(
                        (response: any) => {
                            // console.log(response);
                            setSelectedTalentPool({ id: "", name: "" });
                            if (response.data.Message === "Success") {
                                showToaster("Pool has been assigned successfully", 'success');
                                loadCanidateData();
                            } else {
                                showToaster(response.data.Message ? response.data.Message : "An error occured while assigning ", 'error');
                            }
                        }
                    )
            )
        }
    }

    // const addToTalentNet = () => {
    //     const dataToPass = {
    //         clientId: userLocalData.getvalue('clientId'),
    //         userId: candidateId,
    //     }

    //     trackPromise(
    //         // https://www4.accuick.com/Accuick_API/Curately/Candidate/assigntoTalentnet.jsp
    //         ApiRequests.getByParams(193, 'Curately/Candidate/assigntoTalentnet.jsp', dataToPass)
    //             .then(
    //                 (response: any) => {
    //                     // console.log(response);
    //                     if (response.data.Message === "Success") {
    //                         showToaster("Candidate has been added to Talent Net", 'success');
    //                     } else {
    //                         showToaster(response.data.Message ? response.data.Message : "An error occured adding ", 'error');
    //                     }
    //                 }
    //             )
    //     )
    // }



    return (

        <Box className='card customCard' p={0}>
            <div className='card-body'>
                <Stack className='card-row'>
                    <Stack className='card-column' sx={{ position: 'relative', paddingBottom: '60px' }}>
                        <Box className='p-4'>
                            <Box className='name-box showEditonHover'>
                                <Grid container direction="row" justifyContent="start" alignItems="center">
                                    {
                                        candidateData.userStatus === "10" ?
                                            <FiberManualRecordIcon className='c-red mr-1' />
                                            :
                                            null
                                    }
                                    <Typography className='name-text' variant="h6">{candidateData.firstName} {candidateData.lastName}</Typography>

                                    {
                                        (candidateData.firstName || candidateData.lastName) ?
                                            <BorderColorIcon className='editModalIcon' onClick={() => setOpenAddCandidateModal(true)} />
                                            :
                                            null
                                    }
                                </Grid>
                                {/* <Box className="name-edit ">
                                    <Button
                                        id="name-edit-btn"
                                        aria-controls={openNameEdit ? 'name-edit-btn-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={openNameEdit ? 'true' : undefined}
                                        onClick={handleClickNameEdit}
                                        disableRipple
                                        startIcon={<BorderColorIcon sx={{ fontSize: '14px' }} />}
                                        className='name-edit'
                                        sx={{
                                            backgroundColor: openNameEdit === true ? "#F7F7F7" : '#FFFFFF',
                                            color: openNameEdit === true ? 'var(--c-primary-color)' : 'var(--c-secondary-color)',
                                        }}
                                    >
                                        Edit
                                    </Button>
                                    <Menu
                                        id="name-edit-btn-menu"
                                        anchorEl={NameEditanchorEl}
                                        open={openNameEdit}
                                        onClose={handleProfileMenuClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'name-edit-btn',
                                        }}
                                        anchorOrigin={{
                                            vertical: "bottom",
                                            horizontal: "center"
                                        }}
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "center"
                                        }}
                                        PaperProps={{
                                            style: { overflow: "visible" }
                                        }}
                                        sx={{
                                            width: '300px',
                                            // height: '140px',
                                            '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                                padding: '4px 5px'
                                            },
                                            '& .MuiList-root.MuiMenu-list': {
                                                p: 0
                                            }
                                        }}
                                    >

                                        <Box sx={{ border: '1px solid var(--c-secondary-color)', borderRadius: '3px' }}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', p: 1 }}>
                                                <TextField
                                                    sx={{
                                                        mb: '5px',
                                                        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: 'var(--c-primary-color)',
                                                        },
                                                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: 'var(--c-secondary-color)',
                                                            borderWidth: '1px',
                                                        },
                                                    }}
                                                />
                                                <TextField
                                                    sx={{
                                                        mb: '5px',
                                                        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: 'var(--c-primary-color)',
                                                        },
                                                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: 'var(--c-secondary-color)',
                                                            borderWidth: '1px',
                                                        },
                                                    }}
                                                />
                                            </Box>
                                            <Box sx={{ borderTop: '1px solid #E6E6E6' }}></Box>
                                            <Stack direction='row' sx={{ p: 1, backgroundColor: '#F7F7F7' }} >
                                                <Button variant="outlined"
                                                    disableRipple
                                                    onClick={handleProfileMenuClose}
                                                    sx={{
                                                        width: '138px',
                                                        height: '31px',
                                                        m: '1px',
                                                        textTransform: 'capitalize',
                                                        fontSize: '14px',
                                                        fontWeight: 600,
                                                        fontFamily: 'Segoe UI',
                                                        color: '#1A1A1A',
                                                        borderColor: 'var(--c-secondary-color)',
                                                        backgroundColor: '#FBFBFD',
                                                        boxShadow: '0px',
                                                        '&:hover': {
                                                            borderColor: 'var(--c-primary-color)',
                                                            color: 'var(--c-primary-color)',
                                                            backgroundColor: '#ffffff',
                                                        }
                                                    }}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button variant="contained"
                                                    disableRipple
                                                    sx={{
                                                        width: '134px',
                                                        height: '31px',
                                                        m: '1px',
                                                        textTransform: 'capitalize',
                                                        fontSize: '14px',
                                                        fontWeight: 600,
                                                        fontFamily: 'Segoe UI',
                                                        color: '#ffffff',
                                                        backgroundColor: 'var(--c-primary-color)',
                                                        boxShadow: '0px',
                                                        '&:hover': {
                                                            backgroundColor: '#0852C2',
                                                            color: '#ffffff'
                                                        }
                                                    }}
                                                >
                                                    Save
                                                </Button>
                                            </Stack>
                                        </Box>
                                    </Menu>
                                </Box> */}
                            </Box>


                            <Typography component='p' className='name-sub-head'>

                                {candidateData.contactaddress && (
                                    <> at <Box component='span'>{candidateData.street}</Box>,</>
                                )}
                                {candidateData.city && (
                                    <> <Box component='span'>{candidateData.city}</Box></>
                                )}
                                {candidateData.state && (
                                    <> <Box component='span'>{candidateData.state}</Box></>
                                )}

                            </Typography>

                        </Box>
                        <Divider className='custom-divider' />
                        {/* <Button variant="contained"
                            id='addseqbtn'
                            aria-controls={openAddSequenceBtn ? 'addseqbtnmenu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openAddSequenceBtn ? 'true' : undefined}
                            onClick={handleClickAddSequenceBtn}
                            disableRipple
                            className='sequence-btn'
                            sx={{
                                textTransform: 'capitalize', backgroundColor: openAddSequenceBtn === true ? '#0852C2' : 'var(--c-primary-color)'
                            }}
                            startIcon={<SendOutlinedIcon />}
                            endIcon={<ArrowDropDownIcon />}
                        >
                            Add to Sequence
                        </Button> */}
                        {/* <Menu
                        id="addseqbtnmenu"
                        anchorEl={addSequenceanchorEl}
                        open={openAddSequenceBtn}
                        onClose={handleProfileMenuClose}
                        MenuListProps={{
                            'aria-labelledby': 'addseqbtn',
                        }}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center"
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "center"
                        }}
                        PaperProps={{
                            style: { overflow: "visible" }
                        }}
                        className='menu-block'
                        > */}
                        {/* <MenuItem disableRipple onClick={handleProfileMenuClose} sx={{
                            display: 'flex', alignItems: 'center', gap: '9px', '&:hover': {
                                borderRadius: '5px 5px 0px 0px'
                            }
                        }}>
                            <Box component='span' >
                                <CloudIcon sx={{ height: '11px', width: '16px' }} />
                            </Box>
                            Add contact to an apollo sequence
                        </MenuItem> */}
                        {/* <MenuItem disableRipple onClick={handleProfileMenuClose} sx={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                            <Box component='span' >
                                <CloudIcon sx={{ height: '11px', width: '16px' }} />
                            </Box>
                            Mark all sequence as finished
                        </MenuItem> */}
                        {/* <MenuItem disableRipple onClick={handleProfileMenuClose} sx={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                            <Box component='span' >
                                <CloudIcon sx={{ height: '11px', width: '16px' }} />
                            </Box>
                            Remove From Sequence
                        </MenuItem> */}
                        {/* <MenuItem disableRipple onClick={handleProfileMenuClose} sx={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                            <Box component='span' >
                                <CloudIcon sx={{ height: '11px', width: '16px' }} />
                            </Box>
                            Connect Salesloft
                        </MenuItem> */}
                        {/* <MenuItem disableRipple onClick={handleProfileMenuClose} sx={{
                            display: 'flex', alignItems: 'center', gap: '9px', '&:hover': {
                                borderRadius: '0px 0px 5px 5px'
                            }
                        }}>
                            <Box component='span' >
                                <CloudIcon sx={{ height: '11px', width: '16px' }} />
                            </Box>
                            Connect Outreach
                        </MenuItem> */}
                        {/* </Menu> */}
                        <Stack direction='row' spacing={1} className='p-4 more-wrapper'>
                            <Tooltip title="Upload Resume" placement="top">
                                <IconButton
                                    aria-label="upload"
                                    onClick={() => setAddResumeModal(true)}
                                >
                                    <FileUploadOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Download Resume" placement="top">
                                <IconButton aria-label="download">
                                    <FileDownloadOutlinedIcon />
                                </IconButton></Tooltip>
                            <Tooltip title="Add Document" placement="top">
                                <IconButton
                                    aria-label="download"
                                    onClick={() => setAddDocumentModal(true)}
                                >
                                    <PostAddOutlinedIcon />
                                </IconButton>
                            </Tooltip>


                            {/* <Button
                                color='primary'
                                variant='outlined'
                                size='small'
                                className='ml-5'
                                disabled={!candidateData.firstName || !candidateData.lastName || !candidateData.email || !candidateData.city || !candidateData.state}
                                onClick={addToTalentNet}
                            >
                                Add to TalentNet
                            </Button> */}

                            <Menu
                                id="crmbtnmenu"
                                anchorEl={crmanchorEl}
                                open={openCRMBtn}
                                onClose={handleProfileMenuClose}
                                MenuListProps={{
                                    'aria-labelledby': 'crmbtn',
                                }}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "center"
                                }}
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "center"
                                }}
                                PaperProps={{
                                    style: { overflow: "visible" }
                                }}
                                sx={{
                                    width: "327px",
                                    height: '175px',
                                    borderRadius: '3px',
                                    marginTop: '2px',
                                    padding: '15px',
                                    '& .MuiList-root': {
                                        paddingTop: '0px',
                                        paddingBottom: '0px',

                                    },
                                    '& .MuiMenuItem-root': {
                                        lineHeight: '17px',
                                        color: '#474747',
                                        fontSize: '14px',
                                        // paddingTop: '0px',
                                        // paddingBottom: '0px',
                                        padding: '8px',
                                        minHeight: '20px',
                                        fontFamily: 'Segoe UI',
                                        fontWeight: '600',
                                        // paddingLeft: '4px',
                                        // paddingRight: '15px',
                                        '&:hover': {
                                            backgroundColor: 'var(--c-primary-color)',
                                            color: '#ffffff',
                                        },
                                    },

                                }}
                            >
                                <MenuItem disableRipple onClick={handleProfileMenuClose} sx={{
                                    display: 'flex', alignItems: 'center', gap: '9px', '&:hover': {
                                        borderRadius: '5px 5px 0px 0px'
                                    }
                                }}>
                                    <Box component='span' >
                                        <CloudIcon sx={{ height: '11px', width: '16px' }} />
                                    </Box>
                                    Connect Salesforce
                                </MenuItem>
                                <MenuItem disableRipple onClick={handleProfileMenuClose} sx={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                                    <Box component='span' >
                                        <CloudIcon sx={{ height: '11px', width: '16px' }} />
                                    </Box>
                                    Connect HubSpot
                                </MenuItem>
                                <MenuItem disableRipple onClick={handleProfileMenuClose} sx={{
                                    display: 'flex', alignItems: 'center', gap: '9px', '&:hover': {
                                        borderRadius: '0px 0px 5px 5px'
                                    }
                                }}>
                                    <Box component='span' >
                                        <CloudIcon sx={{ height: '11px', width: '16px' }} />
                                    </Box>
                                    Connect Greenhouse
                                </MenuItem>
                            </Menu>

                            <Tooltip title="Add Match" placement="top">
                                <IconButton
                                    aria-label="Match to"
                                    onClick={() => setAddDocumentModal(true)}
                                >
                                    <CardTravelOutlinedIcon />
                                </IconButton>
                            </Tooltip>

                            {/* <Button
                                disableRipple
                                id='morebtn'
                                aria-controls={openMoreBtn ? 'morebtnmenu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={openMoreBtn ? 'true' : undefined}
                                onClick={handleClickMoreBtn}
                                endIcon={<ArrowDropDownIcon />}
                                sx={{
                                    color: '#737373',
                                    textTransform: 'capitalize',
                                    fontSize: '14px',
                                    backgroundColor: openMoreBtn === true ? '#F0F0F0' : '#ffffff',
                                    '&:hover': {
                                        backgroundColor: '#F0F0F0'
                                    }
                                }}
                            >
                                More
                            </Button>
                            <Menu
                                id="morebtnmenu"
                                anchorEl={MoreanchorEl}
                                open={openMoreBtn}
                                onClose={handleProfileMenuClose}
                                MenuListProps={{
                                    'aria-labelledby': 'morebtn',
                                }}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "center"
                                }}
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "center"
                                }}
                                PaperProps={{
                                    style: { overflow: "visible" }
                                }}
                                sx={{
                                    width: "327px",
                                    height: '175px',
                                    borderRadius: '3px',
                                    marginTop: '2px',
                                    padding: '15px',
                                    '& .MuiList-root': {
                                        paddingTop: '0px',
                                        paddingBottom: '0px',

                                    },
                                    '& .MuiMenuItem-root': {
                                        lineHeight: '17px',
                                        color: '#474747',
                                        fontSize: '14px',
                                        // paddingTop: '0px',
                                        // paddingBottom: '0px',
                                        padding: '8px',
                                        minHeight: '20px',
                                        fontFamily: 'Segoe UI',
                                        fontWeight: '600',
                                        // paddingLeft: '4px',
                                        // paddingRight: '15px',
                                        '&:hover': {
                                            backgroundColor: 'var(--c-primary-color)',
                                            color: '#ffffff',
                                        },
                                    },

                                }}
                            >
                                <MenuItem disableRipple
                                    onClick={
                                        () => {
                                            setOpenAddCandidateModal(true);
                                            handleProfileMenuClose();
                                        }
                                    } sx={{
                                        display: 'flex', alignItems: 'center', gap: '9px', '&:hover': {
                                            borderRadius: '5px 5px 0px 0px'
                                        }
                                    }}>
                                    Edit Candidate
                                </MenuItem>
                            </Menu> */}


                            {/* <div>
                                <Chip
                                    className='body-text'
                                    icon={<AddIcon className='square-icon' />}
                                    label={`Resumes${(Array.isArray(resumesList) ? `(${resumesList.length})` : "")}`}
                                    variant="outlined"
                                    sx={{ border: 'none' }}
                                    onClick={handleMenuOpen}
                                />
                                <Menu
                                    anchorEl={resumeMenuOpen}
                                    open={Boolean(resumeMenuOpen)}
                                    onClose={handleResumeMenuClose}
                                >
                                  
                                    {
                                        Array.isArray(resumesList) ? (
                                            resumesList.map((item) => (
                                                <MenuItem
                                                    key={item.documentId}
                                                    // value={item.documentId}
                                                    onClick={() => {
                                                        updateSelectedResume({
                                                            documentId: item.documentId,
                                                            fileExt: item.fileExt
                                                        });
                                                        handleResumeMenuClose()
                                                    }
                                                    }
                                                >
                                                    <Grid
                                                        container
                                                        direction="row"
                                                        justifyContent="space-between"
                                                        alignItems="center"
                                                        sx={{
                                                            width: 150
                                                        }}
                                                    >
                                                      
                                                        <span>{DateTime.fromFormat(item.date.substring(0, 10), 'yyyy-MM-dd').toFormat('MM/dd/yyyy')}</span>
                                                        <span>{getDocumentIcon(item.fileExt)}</span>
                                                    </Grid>
                                                </MenuItem>
                                            ))
                                        ) :
                                            <MenuItem>No data available</MenuItem>
                                    }
                                </Menu>
                            </div> */}


                        </Stack>

                    </Stack>
                    <Stack className='card-column p-4 conDetails-stack'>
                        {dialogStatus && <EmailDialogBox
                            dialogOpen={dialogStatus}
                            onClose={() => setDialogStatus(false)}
                            name={candidateData.firstName}
                            emailId={emailOnClicked}
                            candidateId={candidateId}
                            jobId={jobId}
                        />}
                        <Box className="mail-box">
                            <Box className="emailicon-wrap">
                                <MailOutlineOutlinedIcon className='mail-icon' />
                            </Box>


                            <Box className="box-inner">
                                <Box>
                                    <Typography
                                        className='email-text'
                                        onClick={() => {
                                            setDialogStatus(true);
                                            setEmailOnClicked(candidateData.email)
                                        }}
                                        sx={{ cursor: 'pointer' }}
                                    >{candidateData.email ? candidateData.email : ""}</Typography>

                                    <Typography className='email-subtext'>Primary</Typography>
                                </Box>
                                <Box className="hover-box">
                                    {candidateData.email !== "" && <Button
                                        disableRipple
                                        className='button-hover'>
                                        <ContentCopyOutlinedIcon sx={{
                                            fontSize: '15px',
                                            color: 'var(--c-secondary-color)'
                                        }} />
                                    </Button>
                                    }
                                    <Button
                                        disableRipple
                                        className='button-hover'
                                    >
                                        <BorderColorIcon sx={{ fontSize: '15px', color: 'var(--c-secondary-color)' }} />
                                    </Button>
                                    {candidateData.email !== "" && <Button
                                        disableRipple
                                        className='button-hover'
                                    >
                                        <DeleteOutlinedIcon sx={{ fontSize: '15px', color: 'var(--c-secondary-color)' }} />
                                    </Button>
                                    }
                                </Box>
                            </Box>
                        </Box>

                        <Box className="mail-box">
                            <Box className="emailicon-wrap">
                                <MailOutlineOutlinedIcon className='mail-icon' />
                            </Box>


                            <Box className="box-inner">
                                <Box>
                                    <Typography className='email-text'
                                    >{candidateData.email2 ? candidateData.email2 : ""}</Typography>

                                    <Typography className='email-subtext'>Secondary</Typography>
                                </Box>
                                <Box className="hover-box">
                                    {candidateData.email2 !== "" && <Button
                                        disableRipple
                                        className='button-hover'>
                                        <ContentCopyOutlinedIcon sx={{
                                            fontSize: '15px',
                                            color: 'var(--c-secondary-color)'
                                        }} />
                                    </Button>
                                    }
                                    <Button
                                        disableRipple
                                        className='button-hover'
                                    >
                                        <BorderColorIcon sx={{ fontSize: '15px', color: 'var(--c-secondary-color)' }} />
                                    </Button>
                                    {candidateData.email2 !== "" && <Button
                                        disableRipple
                                        className='button-hover'
                                    >
                                        <DeleteOutlinedIcon sx={{ fontSize: '15px', color: 'var(--c-secondary-color)' }} />
                                    </Button>
                                    }
                                </Box>
                            </Box>
                        </Box>

                        <Box className="mail-box">
                            <Box className="emailicon-wrap">
                                <CallOutlinedIcon className='mail-icon' />
                            </Box>


                            <Box className="box-inner">
                                <Box>
                                    <Typography className='email-text'
                                        onClick={() => {
                                            setPhoneOnClicked(candidateData.cellPhone);
                                            if (!userLocalData.isChromeExtensionEnabled()) {
                                                setDialogPhoneStatus(true);
                                            }
                                        }}
                                    >{candidateData.cellPhone ? candidateData.cellPhone : ""}</Typography>

                                    <Typography className='email-subtext'>Primary</Typography>
                                </Box>
                                <Box className="hover-box">
                                    {candidateData.cellPhone !== "" && <Button
                                        disableRipple
                                        className='button-hover'>
                                        <ContentCopyOutlinedIcon sx={{
                                            fontSize: '15px',
                                            color: 'var(--c-secondary-color)'
                                        }} />
                                    </Button>
                                    }
                                    <Button
                                        disableRipple
                                        className='button-hover'
                                    >
                                        <BorderColorIcon sx={{ fontSize: '15px', color: 'var(--c-secondary-color)' }} />
                                    </Button>
                                    {candidateData.cellPhone !== "" && <Button
                                        disableRipple
                                        className='button-hover'
                                    >
                                        <DeleteOutlinedIcon sx={{ fontSize: '15px', color: 'var(--c-secondary-color)' }} />
                                    </Button>
                                    }
                                </Box>
                            </Box>
                        </Box>

                        <Box className="mail-box">
                            <Box className="emailicon-wrap">
                                <CallOutlinedIcon className='mail-icon' />
                            </Box>

                            <Box className="box-inner">
                                <Box>
                                    <Typography className='email-text'
                                        onClick={() => {
                                            setPhoneOnClicked(candidateData.cellPhone2);
                                            if (!userLocalData.isChromeExtensionEnabled()) {
                                                setDialogPhoneStatus(true);
                                            }
                                        }}
                                    >{candidateData.cellPhone2 ? candidateData.cellPhone2 : ""}</Typography>

                                    <Typography className='email-subtext'>Secondary</Typography>
                                </Box>
                                <Box className="hover-box">
                                    {candidateData.cellPhone2 !== "" && <Button
                                        disableRipple
                                        className='button-hover'>
                                        <ContentCopyOutlinedIcon sx={{
                                            fontSize: '15px',
                                            color: 'var(--c-secondary-color)'
                                        }} />
                                    </Button>
                                    }
                                    <Button
                                        disableRipple
                                        className='button-hover'
                                    >
                                        <BorderColorIcon sx={{ fontSize: '15px', color: 'var(--c-secondary-color)' }} />
                                    </Button>
                                    {candidateData.cellPhone2 !== "" && <Button
                                        disableRipple
                                        className='button-hover'
                                    >
                                        <DeleteOutlinedIcon sx={{ fontSize: '15px', color: 'var(--c-secondary-color)' }} />
                                    </Button>
                                    }
                                </Box>

                            </Box>
                        </Box>
                        {candidateData.homePhone &&
                            <Box className="mail-box">
                                <Box className="emailicon-wrap">

                                    <HomeOutlinedIcon className='mail-icon' />
                                </Box>

                                <Box className="box-inner">
                                    <Box>
                                        <Typography className='email-text'
                                            onClick={() => {
                                                setPhoneOnClicked(candidateData.homePhone);
                                                if (!userLocalData.isChromeExtensionEnabled()) {
                                                    setDialogPhoneStatus(true);
                                                }
                                            }}
                                        >
                                            {candidateData.homePhone ? candidateData.homePhone : ""}
                                        </Typography>


                                        {candidateData.homePhone &&
                                            <Typography className='email-subtext'>Landline</Typography>
                                        }
                                    </Box>
                                    <Box className="hover-box">
                                        {candidateData.homePhone &&
                                            <Button
                                                disableRipple
                                                className='button-hover'
                                            >
                                                <ContentCopyOutlinedIcon sx={{
                                                    fontSize: '15px',
                                                    color: 'var(--c-secondary-color)'
                                                }} />
                                            </Button>
                                        }
                                        <Button
                                            disableRipple
                                            className='button-hover'
                                        >
                                            <BorderColorIcon sx={{ fontSize: '15px', color: 'var(--c-secondary-color)' }} />
                                        </Button>
                                        {candidateData.homePhone &&
                                            <Button
                                                disableRipple
                                                className='button-hover'
                                            >
                                                <DeleteOutlinedIcon sx={{ fontSize: '15px', color: 'var(--c-secondary-color)' }} />
                                            </Button>
                                        }
                                    </Box>
                                </Box>
                            </Box>
                        }
                        {/* <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
                        <div>{`inputValue: '${poolValue}'`}</div>
                        <br />
                        */}



                        {/* 
                        <Box className="mail-box">
                            <Box className="emailicon-wrap">
                                <ApartmentIcon className='mail-icon' />
                            </Box>

                            <Box className="box-inner">
                                <Box>
                                    <Typography className='email-text' >
                                        {candidateData.city}</Typography>

                                    <Box component='span' className='email-subtext'>City</Box>
                                </Box>
                                <Box className="hover-box">
                                    {candidateData.city !== "" && <Button
                                        disableRipple
                                        className='button-hover'
                                    >
                                        <ContentCopyOutlinedIcon sx={{
                                            fontSize: '15px',
                                            color: 'var(--c-secondary-color)'
                                        }} />
                                    </Button>
                                    }

                                    <Button
                                        disableRipple
                                        className='button-hover'
                                    >
                                        <BorderColorIcon sx={{ fontSize: '15px', color: 'var(--c-secondary-color)' }} />
                                    </Button>
                                    {candidateData.city !== "" && <Button
                                        disableRipple
                                        className='button-hover'
                                    >
                                        <DeleteOutlinedIcon sx={{ fontSize: '15px', color: 'var(--c-secondary-color)' }} />
                                    </Button>
                                    }
                                </Box>
                            </Box>
                        </Box>

                        <Box className="mail-box">
                            <Box className="emailicon-wrap">
                                <LocationOnOutlined className='mail-icon' />
                            </Box>

                            <Box className="box-inner">
                                <Box>
                                    <Typography className='email-text' >
                                        {candidateData.state}</Typography>

                                    <Box component='span' className='email-subtext'>State</Box>
                                </Box>
                                <Box className="hover-box">
                                    {candidateData.state !== "" && <Button
                                        disableRipple
                                        className='button-hover'
                                    >
                                        <ContentCopyOutlinedIcon sx={{
                                            fontSize: '15px',
                                            color: 'var(--c-secondary-color)'
                                        }} />
                                    </Button>
                                    }

                                    <Button
                                        disableRipple
                                        className='button-hover'
                                    >
                                        <BorderColorIcon sx={{ fontSize: '15px', color: 'var(--c-secondary-color)' }} />
                                    </Button>

                                    {candidateData.state !== "" && <Button
                                        disableRipple
                                        className='button-hover'
                                    >
                                        <DeleteOutlinedIcon sx={{ fontSize: '15px', color: 'var(--c-secondary-color)' }} />
                                    </Button>
                                    }
                                </Box>
                            </Box>
                        </Box> */}


                    </Stack>

                </Stack>
                <Stack className='list-wrapper'>
                    <Box component='h6' className='list-head'>
                        Talent Pool:
                        {poolDistributionData.map((item: any, i: number) => (
                            <Box component='span' sx={{ ml: 1, mb: 1, display: 'inline-block' }} key={i}>

                                <Button
                                    disableRipple
                                    endIcon={< ClearOutlinedIcon sx={{ color: '#737373', height: '10px', width: '10px' }} />}
                                    className='label-btn'
                                    // onClick={() => handleDialogClickOpen(item.poolid)}
                                    onClick={() => {
                                        handleProfileMenuClose();
                                        confirmDialog(`Are you sure you want to remove - ${item.poolName}?`, () => {
                                            deleteTalentPoolId(item.pool_cand_id);
                                        }, "warning"
                                        );
                                    }}
                                >
                                    {item.poolName}
                                </Button>
                            </Box>
                        ))}
                    </Box>
                    <Box component='h6' sx={{ pr: 3, m: 0 }}>
                        <Button
                            id="add-poollist-btn"
                            aria-controls={openAddToPoolListenBtn ? "addpoollistmenu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={openAddToPoolListenBtn ? 'true' : undefined}
                            onClick={handleClickAddToPoolListen}
                            startIcon={<PlaylistAddOutlinedIcon />}
                            disableRipple
                            className='addlist-btn'
                            sx={{ width: 120 }}
                        >
                            Add to Pool
                        </Button>
                        <Menu
                            id="addpoollistmenu"
                            anchorEl={addtoPoollistanchorEl}
                            open={openAddToPoolListenBtn}
                            onClose={handleProfileMenuClose}
                            MenuListProps={{
                                'aria-labelledby': 'add-poollist-btn',
                            }}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "center"
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "center"
                            }}
                            PaperProps={{
                                style: { overflow: "visible" }
                            }}

                            sx={{
                                boxShadow: '0px',
                                '& .MuiList-root.MuiMenu-list': {
                                    pt: '8px',
                                    pb: '15px',
                                    pr: '10px',
                                    pl: '10px'
                                }
                            }}
                        >

                            <MUIAutoComplete
                                id='talentPoolId'
                                handleChange={(id: any, name: string) => {
                                    setSelectedTalentPool({ id, name });
                                    addToTalentPool(id, name);
                                }}
                                valuePassed={
                                    (selectedTalentPool.id) ? { label: selectedTalentPool.name, id: selectedTalentPool.id } :
                                        {}
                                }
                                isMultiple={false}
                                textToShow="Talent Pool"
                                width="250px"
                                type='talentPool'
                                placeholder="Select Pool"
                            />

                        </Menu>
                    </Box>
                </Stack>
                <Stack className='list-wrapper'>
                    <Box component='h6' className='list-head'>
                        Tag:
                        {tagsListData.map((item: any, i: number) => (
                            <Box component='span' sx={{ ml: 1, mb: 1, display: 'inline-block' }} key={i}>
                                <Button
                                    disableRipple
                                    endIcon={< ClearOutlinedIcon sx={{ color: '#737373', height: '10px', width: '10px' }} />}
                                    className='label-btn'
                                    // onClick={() => handleDialogClickOpen(item.tagId)}
                                    onClick={() => {
                                        handleProfileMenuClose();
                                        confirmDialog(`Are you sure you want to remove - ${item.tagName}?`, () => {
                                            deleteTagId(item.tagId);
                                        }, "warning"
                                        );
                                    }}
                                >
                                    {item.tagName}
                                </Button>
                            </Box>
                        ))}
                    </Box>
                    <Box component='h6' sx={{ paddingRight: "49px", m: 0 }}>
                        <Button
                            id="add-list-btn"
                            aria-controls={openAddToListenBtn ? "addlistmenu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={openAddToListenBtn ? 'true' : undefined}
                            onClick={handleClickAddToListen}
                            startIcon={<PlaylistAddOutlinedIcon />}
                            disableRipple
                            className='addlist-btn'
                            sx={{ width: 92 }}
                        >
                            Add Tag
                        </Button>
                        <Menu
                            id="addlistmenu"
                            anchorEl={addtolistanchorEl}
                            open={openAddToListenBtn}
                            onClose={handleProfileMenuClose}
                            MenuListProps={{
                                'aria-labelledby': 'add-list-btn',
                            }}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "center"
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "center"
                            }}
                            PaperProps={{
                                style: { overflow: "visible" }
                            }}

                            sx={{
                                boxShadow: '0px',
                                '& .MuiList-root.MuiMenu-list': {
                                    pt: '8px',
                                    pb: '15px',
                                    pr: '10px',
                                    pl: '10px'
                                }
                            }}
                        >
                            <MUIAutoComplete
                                id='tagId'
                                handleChange={(id: any, name: string) => {
                                    setSelectedTag({ id, name });
                                    addToTagList(id, name);
                                }}
                                valuePassed={
                                    (selectedTag.id) ? { label: selectedTag.name, id: selectedTag.id } :
                                        {}
                                }
                                isMultiple={false}
                                textToShow="Select Tags"
                                width="250px"
                                type='tag'
                                placeholder="Select / Type to create Tags"
                            />
                        </Menu>
                    </Box>
                </Stack>

                <Stack className='list-wrapper'>
                    <Box component='h6' className='list-head'>
                        Sequence:
                        {sequenceListData.map((item: any, i: number) => (
                            <Box component='span' sx={{ ml: 1, mb: 1, display: 'inline-block' }} key={i}>
                                <Button
                                    disableRipple
                                    endIcon={< ClearOutlinedIcon sx={{ color: '#737373', height: '10px', width: '10px' }} />}
                                    className='label-btn'
                                    onClick={() => {
                                        handleProfileMenuClose();
                                        confirmDialog(`Are you sure you want to remove - ${item.sequenceName}?`, () => {
                                            deleteSequenceId(item.sequenceID);
                                        }, "warning"
                                        );
                                    }}
                                >
                                    {item.sequenceName}
                                </Button>
                            </Box>
                        ))}
                    </Box>
                    <Box component='h6' sx={{ paddingRight: "10px", m: 0 }}>
                        <Button
                            id="add-seqlist-btn"
                            aria-controls={openAddToSequenceListenBtn ? "addseqlistmenu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={openAddToSequenceListenBtn ? 'true' : undefined}
                            onClick={handleClickAddToSequenceListen}
                            startIcon={<PlaylistAddOutlinedIcon />}
                            disableRipple
                            className='addlist-btn'
                            sx={{ width: 125 }}
                        >
                            Add Sequence
                        </Button>
                        <Menu
                            id="addseqlistmenu"
                            anchorEl={addtoSeqlistanchorEl}
                            open={openAddToSequenceListenBtn}
                            onClose={handleProfileMenuClose}
                            MenuListProps={{
                                'aria-labelledby': 'add-seqlist-btn',
                            }}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "center"
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "center"
                            }}
                            PaperProps={{
                                style: { overflow: "visible" }
                            }}

                            sx={{
                                boxShadow: '0px',
                                '& .MuiList-root.MuiMenu-list': {
                                    pt: '8px',
                                    pb: '15px',
                                    pr: '10px',
                                    pl: '10px'
                                }
                            }}
                        >
                            <MUIAutoComplete
                                id='sequenceId'
                                handleChange={(id: any, name: string) => {
                                    setSelectedSequence({ id, name });
                                    addToSequenceList(id, name);
                                }}
                                valuePassed={
                                    (selectedSequence.id) ? { label: selectedSequence.name, id: selectedSequence.id } :
                                        {}
                                }
                                isMultiple={false}
                                textToShow="Select Sequence"
                                width="250px"
                                type='sequence'
                                placeholder="Select Sequence"
                            />
                        </Menu>
                    </Box>
                </Stack>
            </div>

            {
                (openAddCandidateModal) ?
                    <EditCandidate
                        open={openAddCandidateModal}
                        closePopup={() => setOpenAddCandidateModal(false)}
                        candidateData={candidateData}
                    />
                    :
                    null
            }

            {
                addDocumentModal ?
                    <AddDocumentModal
                        dialogOpen={addDocumentModal}
                        closePopup={() => setAddDocumentModal(false)}
                    />
                    :
                    null
            }

            {
                addResumeModal ?
                    <AddResumeModal
                        dialogOpen={addResumeModal}
                        handleClose={() => setAddResumeModal(false)}
                    />
                    :
                    null
            }
            {
                dialogPhoneStatus ?
                    <PhoneDialog
                        dialogOpen={dialogPhoneStatus}
                        onClose={() => setDialogPhoneStatus(false)}
                        name={candidateData.firstName}
                        toPhone={phoneOnClicked}
                        candidateId={(candidateId) ? candidateId : ""}
                        jobId={jobId}
                    />
                    :
                    null
            }
        </Box>
    )
}

export default CandidateTopCard;