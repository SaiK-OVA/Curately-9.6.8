import { useState, useEffect } from '../../../../shared/modules/React';
import Resume from './ViewCandidateTabs/Resume/Resume';
import Interviews from './ViewCandidateTabs/Interviews/Interviews';
import Documents from './ViewCandidateTabs/Documents/Documents';

// import EmailList from '../ViewCandidate/EmailList';
import { Box } from '../../../../shared/modules/MaterialImports/Box';
import { Grid } from '../../../../shared/modules/MaterialImports/Grid';
// import Stack from '@mui/material/Stack';
import { Button } from '../../../../shared/modules/MaterialImports/Button';

//import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import './ViewCandidate.scss';
import Activities from '../../../shared/Activities/Activities';
import { Tabs, Tab } from '../../../../shared/modules/MaterialImports/Tabs';
import ApiRequests from "../../../../shared/api/api";
import { useParams } from 'react-router-dom';
import Submissions from './ViewCandidateTabs/Submissions/Submissions';

// import updateDocumentTitle from '../../../../shared/services/title';

// import Overview from './ViewCandidateTabs/Overview/Overview';
// import CandidateTopCard from './CandidateTopCard/CandidateTopCard';
import Shortlist from './ViewCandidateTabs/Shortlist/Shortlist';
import { trackPromise } from '../../../../shared/modules/PromiseTrackter';
import ApiService from "../../../../shared/api/api";
// import { userLocalData } from "../../../../shared/services/userData";
// import Card from '@mui/material/Card';
import { Typography } from '../../../../shared/modules/MaterialImports/Typography';
// import Tooltip from '@mui/material/Tooltip';
// import { FormControlLabel } from '@mui/material';
// import { candidateData } from '../../../../shared/data/Community/CandidateData';
import { PreferencesData } from '../../../../shared/data/Community/Preferences';
import { showToaster } from '../../../shared/SnackBar/SnackBar';
import { DateTime } from '../../../../shared/modules/Luxon';
import Profile from './ViewCandidateTabs/Profile/Profile';
import { Menu, MenuItem } from '../../../../shared/modules/MaterialImports/Menu';
import CloudIcon from '@mui/icons-material/Cloud';
// import Divider from '@mui/material/Divider';

// import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
// import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
// import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
// import EmailDialogBox from '../../../shared/EmailDialogBox/EmailDialogBox';
// import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
// import CallOutlinedIcon from '@mui/icons-material/CallOutlined';

import EditCandidate from '../EditCandidate/EditCandidate';
import AddResumeModal from './CandidateTopCard/Popups/AddResumeModal/AddResumeModal';
import AddDocumentModal from './CandidateTopCard/Popups/AddDocumentModal/AddDocumentModal';
// import { MUIAutoComplete } from '../../../shared/MUIAutoComplete/MUIAutoComplete';
// import { confirmDialog } from '../../../shared/ConfirmDialog/ConfirmDialog';
// import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
// import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import OpenInFullRoundedIcon from '@mui/icons-material/OpenInFullRounded';
import PhoneDialog from '../../../shared/PhoneDialog/PhoneDialog';
import ResumePopup from './ViewCandidateTabs/ResumePopup/ResumePopup';
import { userLocalData } from '../../../../shared/services/userData';
// import USPhoneFormat from '../../../../shared/utils/USPhoneFormat';

function tabProperties(index: number) {
    return {
        id: `candidateTabs-${index}`,
        'aria-controls': `candidateTabsPanel-${index}`,
    };
}

interface ShortlistLog {
    candid: string,
    currstatus: string,
    jobid: string,
    nextaction: [
        { name: string, id: string }
    ],
    prevstatus: string,
    recrid: string,
    statuslog: [{}],
    userid: string
}





// Import JSON data
const ViewCandidateTalentPool = () => {

    const [openResumePopup, setOpenResumePopup] = useState(false);
    const [emailOnClicked, setEmailOnClicked] = useState('');
    const [dialogPhoneStatus, setDialogPhoneStatus] = useState(false);
    const [phoneOnClicked, setPhoneOnClicked] = useState('');
    const [crmanchorEl, setCRMAnchorEl] = useState<null | HTMLElement>(null);

    const [dialogStatus, setDialogStatus] = useState(false);
    const openCRMBtn = Boolean(crmanchorEl);
    const [openAddCandidateModal, setOpenAddCandidateModal] = useState(false);
    const [addDocumentModal, setAddDocumentModal] = useState(false);
    const [addResumeModal, setAddResumeModal] = useState(false);
    const [addtolistanchorEl, setAddToListAnchorEl] = useState<null | HTMLElement>(null);

    const [addtoPoollistanchorEl, setAddToPoolListAnchorEl] = useState<null | HTMLElement>(null);
    const [addtoSeqlistanchorEl, setAddToSeqListAnchorEl] = useState<null | HTMLElement>(null);

    const openAddToSequenceListenBtn = Boolean(addtoSeqlistanchorEl);
    const [updatePool, setUpdatePool] = useState("add");
    const [tagsListData, setTagsListData] = useState<any>([]);
    const openAddToListenBtn = Boolean(addtolistanchorEl);
    const [poolDistributionData, setPoolDistributionData] = useState<any>([]);
    const [sequenceListData, setSequenceListData] = useState<any>([]);

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
    const openAddToPoolListenBtn = Boolean(addtoPoollistanchorEl);
    const [value, setValue] = useState(0);
    // const [selectedResume, setSelectedResume] = useState({
    //     documentId: "", extension: ""
    // });
    const [downloadResume, setDownloadResume] = useState({ name: "", link: '' });


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        if (newValue === 1) {
            loadSubmissionsList();
        }
        if (newValue === 2) {
            loadCandidateInterviews();
        }
        if (newValue === 3) {
            loadDocumentsList();
        }
    };

    const [candidateData, setCandidateData] = useState<any>([]);
    //const [canOverviewData, setCanOverviewData] = useState<any>([]);
    // const [htmlData, setHtmlData] = useState('');
    // const [isNameHover, setIsNameHover] = useState(false)
    // const [isMailHover, setIsMailHover] = useState(false)
    // const [isCallHover, setIsCallHover] = useState(false)
    // const [isCompanyHover, setIsCompanyHover] = useState(false)
    const [isStatusHover, setStatusHover] = useState(false);
    const [isStatusEdit, setStatusEdit] = useState(false);
    const [candidateStatus, setCandidateStatus] = useState("");


    const [shortlistData, setShortlistData] = useState<{
        statusLog: []
        shortlistCurrentStatus: string;
        shortlistPrevStatus: string;
        shortlistLog: ShortlistLog;
        openId: string;
    }>({
        statusLog: [],
        shortlistCurrentStatus: "",
        shortlistPrevStatus: "",
        shortlistLog: {
            candid: "",
            currstatus: "",
            jobid: "",
            nextaction: [
                { name: "", id: "" }
            ],
            prevstatus: "",
            recrid: "",
            statuslog: [{}],
            userid: ""
        },
        openId: ""
    });
    const [submissionsList, setSubmissionsList] = useState<any>([]);
    const [candidateInterviewsList, setCandidateInterviewsList] = useState<any>([]);
    const [docList, setDocList] = useState([]);

    const { candidateId, jobId, sourceId } = useParams();

    // https://www4.accuick.com/Accuick_API/Curately/Candidate/rating.jsp?clientId=2&userId=11338&rating=3
    const loadCanidateData = () => {
        let clientId = "2";
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
                            setSequenceListData(sequenceList);
                        }
                    }
                ))
    }

    const addToSequenceList = (id: string, name: string) => {
        if (name && name.trim()) {
            handleProfileMenuClose();
            const saveData = {
                clientId: "2",
                sequenceId: id,
                recrId: "61",
                userIds: candidateId,
            }


            //https://www4.accuick.com/Accuick_API/Curately/Sequence/sequence_assign_users.jsp?clientId=2&userIds=39&sequenceId=9&recrId=61
            ApiRequests.postWithData('admin', 'sequenceAssignUsers', saveData)
                .then(
                    (response: any) => {
                        // console.log(response);
                        // showToaster((response.data.message) ? response.data.message : "sequence saved successfully", 'success');
                        // loadCanidateData();
                        // setSelectedSequence({ id: "", name: "" });

                        if ((response.data.message === "Success") || (response.data.Message === "Success")) {
                            showToaster("Campaign has been assigned successfully", 'success');
                            //   showToaster("Sequence has been assigned", 'success');
                            loadCanidateData();
                            setSelectedSequence({ id: "", name: "" });
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
    const deleteTalentPoolId = (id: string) => {
        trackPromise(
            // deleteTalentPoolCommunity/10024627/17
            // candidateId + "/" + id
            // http://52.88.252.214:90/DemoCurately/deleteTalentPoolCommunity/pool_cand_id
            // ApiRequests.deleteById(214, 'deleteTalentPoolCommunity', id + "/" + "2")
            // https://www4.accuick.com/Accuick_API/Curately/talent_pool_delete_index.jsp?clientId=2&pool_cand_id=2
            ApiRequests.postWithData("admin", 'talentPoolDelete', { clientId: "2", poolCandId: id })
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

    const addToTagList = (id: string, name: string) => {
        if (name && name.trim()) {
            handleProfileMenuClose();
            const saveData = {
                tagId: id,
                tagName: name,
                userId: candidateId,
                createdBy: "61",
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

    useEffect(() => {
        //  loadDistributionList();
        //  loadTagDistributionList();
        loadCanidateData();
    }, []);



    const updateRating = (rating: string) => {
        // UpdateUserDetails API: (POST)
        // http://52.88.252.214:90/DemoCurately/updateuserdetails
        // {
        //     "userId": 2359,
        //     "rating": 1.5,
        //     "status": 1,
        //     "userStatus": 1,
        //     "clientId": 2
        // }
        // Output:
        // {
        //     "Success": true,
        //     "Status": 200,
        //     "Message": "Status Updated"
        // }

        trackPromise(
            ApiService.postWithData(214, 'updateuserdetails', { userId: candidateId, rating: rating, clientId: "2" }).then(
                (response: any) => {
                    // console.log(response.data);
                    if (response.data.Success) {
                        showToaster("Rating has been updated successfully", 'success');
                        setCandidateData({
                            ...candidateData,
                            rating: rating
                        })

                    } else {
                        showToaster(response.data.Message ? response.data.Message : "An error occurred while updating the rating", 'error');
                    }
                })
        );
    }


    const updateCandidateStatus = () => {
        trackPromise(
            ApiService.postWithData(214, 'updateuserdetails', { userId: candidateId, userStatus: candidateStatus, clientId: "2" }).then(
                (response: any) => {
                    // console.log(response.data);
                    if (response.data.Success) {
                        showToaster("Status has been updated successfully", 'success');
                        setCandidateData({
                            ...candidateData,
                            userStatus: candidateStatus
                        })
                        // setCandidateStatus(status);
                        setStatusEdit(false);

                    } else {
                        showToaster(response.data.Message ? response.data.Message : "An error occurred while updating the Candidate Rating", 'error');
                    }
                })
        );
    }

    const getCandidateStatus = (key: string) => {
        switch (key) {
            case '2':
                return "Not reviewed";
            case '3':
                return "Contacted";
            case '4':
                return "Presented";
            case '5':
                return "Interviewing";
            case '6':
                return "Offer Made";
            case '7':
                return "Onboarding";
            case '8':
                return "On Assignment";
            case '9':
                return "Past Contractor";
            case '10':
                return "Do Not Hire";
            case '':
            case '1':
            default:
                return "Lead";
        }
    }




    useEffect(() => {
        trackPromise(
            // ApiRequests.getByParams(193, '/Candidate/candidate_details.jsp', { candId: candidateId })
            ApiRequests.getById(214, 'getcandidatedetails', candidateId + "/" + "2")
                .then(
                    (response: any) => {
                        // const result = response.data;
                        // console.log(result);
                        if (response.data.Success) {
                            setCandidateData(response.data);
                            setCandidateStatus((response.data.userStatus && Number(response.data.userStatus)) ? response.data.userStatus : "1");
                            if (response.data.resumeId) {
                                setDownloadResume({
                                    name: response.data.resumeName,
                                    link: 'https://ovastorage.s3.us-west-2.amazonaws.com/curately/Sevron/' + response.data.resumeId
                                });
                            }
                        }
                        // setCandidateData({
                        //     firstName: String(result.firstName ? result.firstName : ""),
                        //     lastName: String(result.lastName ? result.lastName : ""),
                        //     linkedIn: String(result.linkedIn ? result.linkedIn : ""),
                        //     email: String(result.email ? result.email : ""),
                        //     email2: String(result.email2 ? result.email2 : ""),
                        //     cellPhone2: String(result.cellPhone2 ? result.cellPhone2 : ""),
                        //     workPhone: String(result.workPhone ? result.workPhone : ""),
                        //     street: String(result.street ? result.street : ""),
                        //     cellPhone: String(result.cellPhone ? result.cellPhone : ""),
                        //     zip: Number(result.zip ? result.zip : ""),
                        //     city: String(result.city ? result.city : ""),
                        //     state: String(result.state ? result.state : ""),
                        //     homePhone: String(result.homePhone ? result.homePhone : ""),
                        //     homePhone2: String(result.homePhone2 ? result.homePhone2 : "")


                        // });
                        // updateDocumentTitle.set(result.firstName + result.lastName + ' | Candidate');
                    }
                ))
        // trackPromise(
        //     ApiRequests.getByParams(193, 'Candidate/candidate_overview.jsp', { candId: candidateId })
        //         .then((response: any) => {
        //             // console.log(response.data);
        //             setCanOverviewData(response.data);
        //         })
        // );

    }, [candidateId]);
    //const canOverviewData: UserData = jsonData;

    const loadSubmissionsList = () => {
        // https://www4.accuick.com/Accuick_API/Curately/Candidate/subs_int_data.jsp?clientId=2&userId=11547&status=100
        trackPromise(
            ApiService.postWithData('admin', 'getSubsData', { userId: candidateId, status: 100, clientId: userLocalData.getvalue('clientId') }).then(
                (response: any) => {
                    setSubmissionsList(response.data.list);
                })
        );
    }
    // const formatTitle = (title: string) => {
    //     return title.length > 22 ? title.substring(0, 22) + '...' : title;
    // }
    const handleContactStageHoverEnter = () => {
        setStatusHover(true)
        // setIsNameHover(false)
        // setIsMailHover(false)
        // setIsCallHover(false)
        // setIsCompanyHover(false)
    }
    const handleHoverLeave = () => {
        // setIsNameHover(false)
        // setIsMailHover(false)
        // setIsCallHover(false)
        // setIsCompanyHover(false)
        setStatusHover(false)
    }

    const loadCandidateInterviews = () => {
        //             ApiService.getByParams(193, 'Candidate/candidate_interviews.jsp', { candId: candidateId }).then(

        trackPromise(
            ApiService.postWithData('admin', 'getSubsData', { userId: candidateId, status: 300, clientId: userLocalData.getvalue('clientId') }).then(
                (response: any) => {
                    setCandidateInterviewsList(response.data.list);
                }
            ))
    }

    const loadDocumentsList = () => {
        trackPromise(
            //  ApiService.postWithData("admin", 'getRecruiterProfile', { clientId: "2", userId: candidateId, jobId: jobId }).then(
            ApiService.postWithData("admin", 'getRecruiterProfile', { clientId: userLocalData.getvalue('clientId'), userId: candidateId, jobId: jobId }).then(
                (response: any) => {
                    // console.log(response.data)
                    if (response.data.Message === "Success") {
                        if (response.data?.docs && response.data.docs.length) {
                            setDocList(response.data.docs);
                        }
                    }
                }
            ))
    }

    // useEffect(() => {
    //     trackPromise(
    //         ApiService.getByParams(193, '/Candidate/getText.jsp',
    //             {
    //                 docName: `${(selectedResume.documentId) ? selectedResume.documentId : ""}.${(selectedResume.extension) ? selectedResume.extension : ""}`,
    //                 searchId: sourceId
    //             }
    //         ).then((secondApiResponse) => {

    //             if (secondApiResponse?.data?.source) {
    //                 setHtmlData(secondApiResponse?.data?.source);
    //             }
    //         }).catch((error) => {
    //             console.error('Error:', error);
    //         }));
    // }, [selectedResume, sourceId]);

    useEffect(() => {
        loadShortlistBar(candidateId, jobId);
    }, [candidateId, jobId]);

    const addToTalentPool = (id: string, name: string) => {
        if (name && name.trim()) {
            handleProfileMenuClose();
            // const saveData = {
            //     poolId: id,
            //     poolName: name,
            //     candId: candidateId,
            //     createdBy: "61",
            //     clientId: "2"
            // }
            const saveData = {
                clientId: "2",
                poolId: id,
                recrId: "61",
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




    const loadShortlistBar = (cId: any, jId: any) => {
        const c = cId ? cId : candidateId;
        const j = jId ? jId : jobId;
        if (c && j) {
            trackPromise(
                ApiService.getByParams(193, 'Curately/Candidate/getShortlistbarLog.jsp', { jobId: jobId, userId: candidateId, recrId: "61" }).then(
                    (response: any) => {
                        // console.log("view");
                        // console.log(response.data);
                        const listResponse = JSON.stringify(response.data);
                        let res = listResponse.replace(/\\"/g, '"');
                        res = res.replace(/\"\[/g, '[');
                        res = res.replace(/]\"/g, ']');
                        const data = JSON.parse(res);
                        // console.log(data.statusLog);
                        let tempStatusForDates = data.statusLog;
                        if (tempStatusForDates && tempStatusForDates.length) {
                            for (let td = 0; td < data.statusLog.length; td++) {
                                tempStatusForDates[td].sortDate = new Date(tempStatusForDates[td].status_dt);
                                if (DateTime.fromFormat(tempStatusForDates[td].status_dt.substring(0, 19), 'yyyy-MM-dd hh:mm:ss').isValid) {
                                    tempStatusForDates[td].status_dt = DateTime.fromFormat(tempStatusForDates[td].status_dt.substring(0, 19), 'yyyy-MM-dd hh:mm:ss').toFormat('MM/dd/yyyy HH:mm');
                                }
                            }
                            tempStatusForDates = tempStatusForDates.sort(
                                (d1: any, d2: any) => Number(d1.sortDate) - Number(d2.sortDate),
                            );
                            data.statusLog = tempStatusForDates;
                        }
                        // new Date(data.statusLog[0].status_dt)
                        setShortlistData({
                            statusLog: (data.statusLog) ? data.statusLog : [],
                            shortlistCurrentStatus: (data.currStatus) ? data.currStatus : "",
                            shortlistPrevStatus: (data.prevStatus) ? data.prevStatus : "",
                            shortlistLog: data,
                            openId: (data.openId) ? data.openId : ""
                        });
                        // {"jobid":"233608","currstatus":"","nextaction":"[]","candid":"7537469","statuslog":[],"prevstatus":"","recrid":"","userid":"1893"}
                    }
                ))
        }
    }
    interface TabPanelProps {
        children?: React.ReactNode;
        index: number;
        value: number;
    }

    function CustomTabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`candidateTabsPanel-${index}`}
                aria-labelledby={`candidateTabsPanel-${index}`}
                {...other}
                className='candidateTabsPanel customTabsPanel'
            >
                {value === index && (
                    <Box sx={{ p: 3 }} className={`${value === index ? "" : "d-none"}`}>
                        {children}
                    </Box>
                )}
            </div>
        );
    }

    // const getPreferenceValue = (val: number, categoryID: number) => {

    //     let preferenceArray = PreferencesData.find((i) => i.categoryID === categoryID)
    //     //console.log(preferenceArray)
    //     if (preferenceArray?.lookupsList) {
    //         let preferenceObj = preferenceArray?.lookupsList.find((i) => i.lookupId === val)
    //         return preferenceObj?.lookupValue ? preferenceObj?.lookupValue : ""
    //     }
    //     return ""
    // }
    const getPreferenceValue = (val: number): string => {
        if (!Number.isFinite(val) || val.toString().length < 5) {
            return "";
        }
        const categoryID = parseInt(val.toString().substring(0, 5));
        const category = PreferencesData.find(item => item.categoryID === categoryID);
        if (!category) {
            return "";
        }
        const preference = category.lookupsList.find(item => item.lookupId === val);
        if (!preference) {
            return "";
        }
        return preference.lookupValue;
    };



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

    return (
        <Grid
            container
            direction="row"
            justifyContent="start"
            alignItems="start"
            className='fullViewPage'
        >
            <Grid sx={{ width: 'calc(100% - 385px)' }}>

                <div className='candidate-wrapper'>
                    <div className='candidate-container'>
                        <div className='column left'>
                            <Box className='card customCard pb-0 pt-2' sx={{ minHeight: '50px !important' }}>
                                <div className='card-body'>
                                    <div className='' >
                                        <Box className='pr-4 pb-2 mb-2'>

                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                className='name-box '
                                            >
                                                <Grid>
                                                    <Grid
                                                        container
                                                        direction="row"
                                                        justifyContent="start"
                                                        alignItems="center"
                                                    >
                                                        {
                                                            candidateData.userStatus === "10" ?
                                                                <FiberManualRecordIcon className='c-red mr-1' />
                                                                :
                                                                null
                                                        }
                                                        <Typography className='name-text showEditonHover tt-capital' variant="h6">
                                                            {candidateData.firstName} {candidateData.lastName}
                                                        </Typography>

                                                        {
                                                            isStatusEdit ?
                                                                <>

                                                                </>
                                                                :
                                                                <Box
                                                                    onMouseEnter={handleContactStageHoverEnter}
                                                                    onMouseLeave={handleHoverLeave}
                                                                    className='ml-3'
                                                                >
                                                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>


                                                                        <Grid size={3}>
                                                                            {/* <Typography component='p' sx={{
                                                                                fontFamily: 'Segoe UI',
                                                                                fontWeight: 600,
                                                                                fontSize: '14px',
                                                                                color: '#1A1A1A',
                                                                                // width: '70%'
                                                                            }}>
                                                                                {candidateStatus}
                                                                            </Typography> */}
                                                                            <Button
                                                                                disableRipple
                                                                                sx={{
                                                                                    backgroundColor: '#F0F0F0', color: '#474747', fontSize: '12px', fontWeight: '600', fontFamily: 'Segoe UI',
                                                                                    textTransform: 'capitalize', minWidth: '85px', maxWidth: '155px', width: 'max-content', height: '22px',
                                                                                    '&:hover': {
                                                                                        backgroundColor: '#CACACA'
                                                                                    }
                                                                                }}
                                                                                className='mr-4 py-0 fs-12'
                                                                            >
                                                                                {getCandidateStatus(candidateStatus)}
                                                                            </Button>
                                                                        </Grid>
                                                                    </Box>
                                                                </Box>
                                                        }
                                                        <Grid size={2}>
                                                            <Typography component='p' sx={{
                                                                fontFamily: 'Segoe UI',
                                                                fontWeight: 600,
                                                                fontSize: '14px',
                                                                color: '#1A1A1A',
                                                                // width: '70%'
                                                            }}>
                                                                {getPreferenceValue(candidateData?.preferences?.empAvailLookupID)}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>

                                                <Grid >

                                                    <Grid
                                                        container
                                                        direction="row"
                                                        justifyContent="start"
                                                        alignItems="center"
                                                    >
                                                        <Button type='button' variant='contained' size='small' color='primary'>Express Interest</Button>
                                                        {/* <span style={{ maxWidth: '132px !important' }} className='mr-4'>
                                                            <Rating name="half-rating" defaultValue={0} precision={0.5} size="large"
                                                                value={(Number(candidateData.rating)) ? Number(candidateData.rating) : 0} onChange={(e: any) => {
                                                                    // console.log(e)
                                                                    updateRating(e.target.value)
                                                                }} />
                                                        </span> */}

                                                        {/* {
                                                            (candidateData.firstName || candidateData.lastName) ?
                                                                <Tooltip title="Edit Candidadte" placement="top">
                                                                    <IconButton
                                                                        aria-label="Edit"
                                                                        onClick={() => setOpenAddCandidateModal(true)}
                                                                        className='bg-lightGrey c-darkGrey mr-1'
                                                                    >
                                                                        <EditIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                                :
                                                                null
                                                        } */}
                                                        {/* <Tooltip title="Upload Resume" placement="top">
                                                            <IconButton
                                                                aria-label="upload"
                                                                onClick={() => setAddResumeModal(true)}
                                                                className='bg-lightGrey c-darkGrey mr-1'
                                                            >
                                                                <FileUploadOutlinedIcon />
                                                            </IconButton>
                                                        </Tooltip> */}
                                                        {/* {
                                                            downloadResume.link ?
                                                                <Tooltip title="Download Resume" placement="top">
                                                                    <IconButton aria-label="download" className='bg-lightGrey c-darkGrey mr-1' href={downloadResume.link} target='_blank' id='resumeDownload' ><FileDownloadOutlinedIcon /></IconButton>
                                                                </Tooltip>
                                                                :
                                                                null
                                                        } */}
                                                        {/* <Tooltip title="Add Document" placement="top">
                                                            <IconButton
                                                                aria-label="download"
                                                                onClick={() => setAddDocumentModal(true)}
                                                                className='bg-lightGrey c-darkGrey'
                                                            >
                                                                <PostAddOutlinedIcon />
                                                            </IconButton>
                                                        </Tooltip> */}
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

                                                    </Grid>
                                                </Grid>
                                            </Grid>

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
                                    </div>


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







                            {/* <CandidateTopCard
                                candidateData={candidateData}
                                updateSelectedResume={
                                    (e: { documentId: string, fileExt: string }) => setSelectedResume({
                                        documentId: e.documentId,
                                        extension: e.fileExt
                                    })
                                }
                            /> */}
                            {/* <Card className='customCard2'
                                sx={{ height: 'auto', py: 0, pl: 0, mb: '20px', borderRadius: 0 }}
                            > */}
                            {/* <Stack sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Stack sx={{ width: '50%' }}>
                                        <Box >
                                            <Typography sx={{
                                                pt: 1, pb: 1, pl: 3,
                                                borderBottom: '1px #E6E6E6 solid',
                                                fontFamily: 'Segoe UI', fontSize: '16px', fontWeight: 600,
                                                color: '#1A1A1A'
                                            }}>
                                                Work History
                                            </Typography>
                                            <div style={{ maxHeight: '215px', overflowY: 'auto' }}>
                                                {canOverviewData?.workHistory ? (
                                                    canOverviewData.workHistory.map((emp: any) => (
                                                        <Box sx={{ px: 2, pt: 2, pb: 1 }} key={`${emp.companyName ? emp.companyName.replace(/\\|\//g, ' ') : ""}${(emp.title && emp.title.trim()) ? emp.title.replace(/\\|\//g, ' ') : ""}`}>
                                                            <Typography component='h6' sx={{ fontFamily: 'Segoe UI', fontSize: '14px', fontWeight: 600, color: '#1A1A1A' }}>{emp.companyName ? emp.companyName.replace(/\\|\//g, ' ') : ""}</Typography>
                                                            <Typography component='p' sx={{ fontFamily: 'Segoe UI', fontSize: '14px', fontWeight: 400, color: '#474747' }}>
                                                                {emp.title ? (
                                                                    <Tooltip title={emp.title.replace(/\\|\//g, ' ')}>
                                                                        <span>{emp.title.replace(/\\|\//g, ' ')}</span>
                                                                    </Tooltip>
                                                                ) : ""}
                                                            </Typography>
                                                            <Typography component='p' sx={{ fontFamily: 'Segoe UI', fontSize: '12px', fontWeight: 400, color: '#474747' }}> {emp.startDate && DateTime.fromFormat(emp.startDate.substring(0, 7), 'yyyy-MM').isValid ? DateTime.fromFormat(emp.startDate.substring(0, 7), 'yyyy-MM').toFormat('MMM yyyy') : ""}
                                                                {emp.startDate && DateTime.fromFormat(emp.startDate.substring(0, 7), 'yyyy-MM').isValid && emp.endDate && DateTime.fromFormat(emp.endDate.substring(0, 7), 'yyyy-MM').isValid ? " to " : ""}
                                                                {emp.endDate && DateTime.fromFormat(emp.endDate.substring(0, 7), 'yyyy-MM').isValid ? DateTime.fromFormat(emp.endDate.substring(0, 7), 'yyyy-MM').toFormat('MMM yyyy') : ""}
                                                            </Typography>
                                                        </Box>
                                                    ))
                                                ) : null}
                                            </div>
                                        </Box>
                                    </Stack> */}

                            {/* <Stack sx={{ borderLeft: '1px #E6E6E6 solid', display: 'flex', flexDirection: 'column', justifyContent: 'flext-start', pl: '25px', pt: 1, pb: 2, maxHeight: '250px', overflowY: 'auto' }} direction="column" spacing={1.5} >
                                    <Grid container>
                                        <Grid size={3}>
                                            <Typography component='p' sx={{
                                                fontFamily: 'Segoe UI',
                                                fontWeight: 600,
                                                fontSize: '14px',
                                                color: '#1A1A1A',
                                                // width: '70%'
                                            }}>
                                                Candidate Status
                                            </Typography>
                                        </Grid>
                                        {
                                            isStatusEdit ?
                                                <>
                                                    <Grid size={3} sx={{ marginRight: "10px" }}>
                                                        <Select
                                                            id="sortType"
                                                            size="small"
                                                            // value={sortType}
                                                            onChange={(e) => {
                                                                setCandidateStatus(e.target.value);
                                                            }
                                                            }
                                                            //className="sortingPopoverSelect mr-5"
                                                            // defaultValue={"Contacted"}
                                                            value={candidateStatus}
                                                            fullWidth
                                                        >
                                                            <MenuItem value={'1'}>Lead</MenuItem>
                                                            <MenuItem value={'2'}>Not reviewed</MenuItem>
                                                            <MenuItem value={'3'}>Contacted</MenuItem>
                                                            <MenuItem value={'4'}>Presented</MenuItem>
                                                            <MenuItem value={'5'}>Interviewing</MenuItem>
                                                            <MenuItem value={'6'}>Offer Made</MenuItem>
                                                            <MenuItem value={'7'}>Onboarding</MenuItem>
                                                            <MenuItem value={'8'}>On Assignment</MenuItem>
                                                            <MenuItem value={'9'}>Past Contractor</MenuItem>
                                                            <MenuItem value={'10'}>Do Not Hire</MenuItem>
                                                        </Select>
                                                    </Grid>
                                                    <Grid size={1}>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            className='mt-2'
                                                            size='small'
                                                            onClick={() => { updateCandidateStatus(); }}
                                                        >
                                                            Save
                                                        </Button>

                                                    </Grid>
                                                </>
                                                :
                                                <Box
                                                    onMouseEnter={handleContactStageHoverEnter}
                                                    onMouseLeave={handleHoverLeave}
                                                >
                                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>


                                                        <Grid size={3}>
                                                            
                                                            <Button
                                                                disableRipple
                                                                sx={{
                                                                    backgroundColor: '#F0F0F0', color: '#474747', fontSize: '12px', fontWeight: '600', fontFamily: 'Segoe UI',
                                                                    textTransform: 'capitalize', minWidth: '85px', maxWidth: '155px', width: 'max-content', height: '30px',
                                                                    '&:hover': {
                                                                        backgroundColor: '#CACACA'
                                                                    }
                                                                }}
                                                                className='mr-4'
                                                            >
                                                                {getCandidateStatus(candidateStatus)}
                                                            </Button>
                                                        </Grid>
                                                        {isStatusHover &&
                                                            <Box>
                                                                <Button
                                                                    disableRipple
                                                                    startIcon={<BorderColorIcon sx={{ fontSize: '15px' }} />}
                                                                    sx={{
                                                                        height: '25px',
                                                                        width: '65px',
                                                                        color: 'var(--c-secondary-color)',
                                                                        backgroundColor: '#FFFFFF',
                                                                        boxShadow: '0px 2px 9px rgba(0, 0, 0, 0.1)',
                                                                        textTransform: 'capitalize',
                                                                        fontFamily: 'Segoe UI',
                                                                        fontWeight: 600,
                                                                        fontSize: '14px',
                                                                        '& .MuiButton-startIcon>*:nth-of-type(1)': {
                                                                            fontSize: '12px'
                                                                        },
                                                                        '&:hover': {
                                                                            backgroundColor: '#F7F7F7',
                                                                            color: 'var(--c-primary-color)',
                                                                        }
                                                                    }}
                                                                    onClick={() => { setStatusEdit(true) }}
                                                                >
                                                                    Edit
                                                                </Button>
                                                            </Box>
                                                        }
                                                    </Box>
                                                </Box>
                                        }
                                        <Grid size={2}>
                                            <Typography component='p' sx={{
                                                fontFamily: 'Segoe UI',
                                                fontWeight: 600,
                                                fontSize: '14px',
                                                color: '#1A1A1A',
                                                // width: '70%'
                                            }}>
                                                {getPreferenceValue(candidateData?.preferences?.empAvailLookupID)}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container >
                                        <Grid size={3}>
                                            <Typography component='p' sx={{
                                                fontFamily: 'Segoe UI',
                                                fontWeight: 600,
                                                fontSize: '14px',
                                                color: '#1A1A1A',
                                                width: '70%'
                                            }}>
                                                Engagement
                                            </Typography>
                                        </Grid>
                                        <Grid size={4}>
                                            <Typography component='p' sx={{
                                                fontFamily: 'Segoe UI',
                                                fontWeight: 600,
                                                fontSize: '14px',
                                                color: '#1A1A1A',
                                                // width: '70%'
                                            }}>
                                                0 Inbound . 3 Outbound
                                            </Typography>
                                        </Grid>
                                        <Grid size={3}>
                                            <Typography component='p' sx={{
                                                fontFamily: 'Segoe UI',
                                                fontWeight: 600,
                                                fontSize: '14px',
                                                color: '#1A1A1A',
                                                //  width: '70%'
                                            }}>
                                                Employment Preference
                                            </Typography>
                                        </Grid>
                                        <Grid size={2}>
                                            <Typography component='p' sx={{
                                                fontFamily: 'Segoe UI',
                                                fontWeight: 600,
                                                fontSize: '14px',
                                                color: '#1A1A1A',
                                                // width: '70%'
                                            }}>
                                                {getPreferenceValue(candidateData?.preferences?.empPrefLookupID)}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container >
                                        <Grid size={3}>
                                            <Typography component='p' sx={{
                                                fontFamily: 'Segoe UI',
                                                fontWeight: 600,
                                                fontSize: '14px',
                                                color: '#1A1A1A',
                                                // width: '70%'
                                            }}>
                                                Last 12 Months
                                            </Typography>
                                        </Grid>
                                        <Grid size={4}>
                                            <Stack sx={{ width: '70%' }} direction='row' spacing={1}>
                                                <Box sx={{ width: '6px', height: '25px', backgroundColor: '#E6E6E6' }}></Box>
                                                <Box sx={{ width: '6px', height: '25px', backgroundColor: '#E6E6E6' }}></Box>
                                                <Box sx={{ width: '6px', height: '25px', backgroundColor: '#E6E6E6' }}></Box>
                                                <Box sx={{ width: '6px', height: '25px', backgroundColor: '#E6E6E6' }}></Box>
                                                <Box sx={{ width: '6px', height: '25px', backgroundColor: '#E6E6E6' }}></Box>
                                                <Box sx={{ width: '6px', height: '25px', backgroundColor: '#E6E6E6' }}></Box>
                                                <Box sx={{ width: '6px', height: '25px', backgroundColor: '#E6E6E6' }}></Box>
                                                <Box sx={{ width: '6px', height: '25px', backgroundColor: '#E6E6E6' }}></Box>
                                                <Box sx={{ width: '6px', height: '25px', backgroundImage: 'linear-gradient(#E6E6E6 70%,#43CD89 30%)' }}></Box>
                                                <Box sx={{ width: '6px', height: '25px', backgroundImage: 'linear-gradient(#E6E6E6 80%,#43CD89 20%)' }}></Box>
                                                <Box sx={{ width: '6px', height: '25px', backgroundColor: '#E6E6E6' }}></Box>
                                                <Box sx={{ width: '6px', height: '25px', backgroundColor: '#E6E6E6' }}></Box>
                                            </Stack>
                                        </Grid>
                                        <Grid size={3}>
                                            <Typography component='p' sx={{
                                                fontFamily: 'Segoe UI',
                                                fontWeight: 600,
                                                fontSize: '14px',
                                                color: '#1A1A1A',
                                                // width: '70%'
                                            }}>
                                                Work Location Preference
                                            </Typography>
                                        </Grid>
                                        <Grid size={2}>
                                            <Typography component='p' sx={{
                                                fontFamily: 'Segoe UI',
                                                fontWeight: 600,
                                                fontSize: '14px',
                                                color: '#1A1A1A',
                                                // width: '70%'
                                            }}>
                                                {getPreferenceValue(candidateData?.preferences?.empFlexLookupID)}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container >
                                        <Grid size={3}>
                                            <Typography component='p' sx={{
                                                fontFamily: 'Segoe UI',
                                                fontWeight: 600,
                                                fontSize: '14px',
                                                color: '#1A1A1A',
                                                // width: '70%'
                                            }}>
                                                Ratings
                                            </Typography>
                                        </Grid>
                                        <Grid size={4}>

                                            <Stack spacing={1} sx={{ maxWidth: '132px !important' }} >
                                                <Rating name="half-rating" defaultValue={0} precision={0.5} size="large"
                                                    value={(Number(candidateData.rating)) ? Number(candidateData.rating) : 0} onChange={(e: any) => {
                                                        // console.log(e)
                                                        updateRating(e.target.value)
                                                    }} />
                                            </Stack>

                                        </Grid>
                                        <Grid size={3}>
                                            <Typography component='p' sx={{
                                                fontFamily: 'Segoe UI',
                                                fontWeight: 600,
                                                fontSize: '14px',
                                                color: '#1A1A1A',
                                                //  width: '20%'
                                            }}>
                                                Compensation Preference
                                            </Typography>
                                        </Grid>
                                        <Grid size={2}>
                                            <Typography component='p' sx={{
                                                fontFamily: 'Segoe UI',
                                                fontWeight: 600,
                                                fontSize: '14px',
                                                color: '#1A1A1A',
                                                //width: '40%'
                                            }}>

                                                $ {candidateData?.preferences?.empYearCompensation} Per Year
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container >
                                        <Grid size={3}>
                                            <Typography component='p' sx={{
                                                fontFamily: 'Segoe UI',
                                                fontWeight: 600,
                                                fontSize: '14px',
                                                color: '#1A1A1A',
                                                // width: '70%'
                                            }}>
                                                Current Employment Status
                                            </Typography>
                                        </Grid>
                                        <Grid size={4}>
                                            <Typography component='p' sx={{
                                                fontFamily: 'Segoe UI',
                                                fontWeight: 600,
                                                fontSize: '14px',
                                                color: '#1A1A1A',
                                                //width: '70%'
                                            }}>
                                                {getPreferenceValue(candidateData?.preferences?.empStatusLookupID)}
                                            </Typography>
                                        </Grid>
                                        <Grid size={3}>
                                            <Typography component='p' sx={{
                                                fontFamily: 'Segoe UI',
                                                fontWeight: 600,
                                                fontSize: '14px',
                                                color: '#1A1A1A',
                                                // width: '80%'
                                            }}>
                                                Legally authorized
                                            </Typography>
                                        </Grid>
                                        <Grid size={2}>
                                            <Typography component='p' sx={{
                                                fontFamily: 'Segoe UI',
                                                fontWeight: 600,
                                                fontSize: '14px',
                                                color: '#1A1A1A',
                                                // width: '40%'
                                            }}>

                                                {candidateData?.preferences?.legalStatus === 1 ? 'Yes' : 'No'}
                                            </Typography>
                                        </Grid>

                                    </Grid>
                                    <Grid container >
                                        <Grid size={3}>
                                        </Grid>
                                        <Grid size={4}>
                                        </Grid>
                                        <Grid size={3}>
                                            <Typography component='p' sx={{
                                                fontFamily: 'Segoe UI',
                                                fontWeight: 600,
                                                fontSize: '14px',
                                                color: '#1A1A1A',
                                                // width: '80%'
                                            }}>
                                                Visa sponsorship
                                            </Typography>
                                        </Grid>
                                        <Grid size={2}>
                                            <Typography component='p' sx={{
                                                fontFamily: 'Segoe UI',
                                                fontWeight: 600,
                                                fontSize: '14px',
                                                color: '#1A1A1A',
                                                //width: '40%'
                                            }}>

                                                {candidateData?.preferences?.visaSponsorStatus === 1 ? "Yes" : "No"}
                                            </Typography>
                                        </Grid>
                                    </Grid>


                                </Stack> */}
                            {/* </Stack> */}
                            {/* </Card> */}

                            {
                                jobId ?
                                    <Shortlist
                                        candidateId={(candidateId) ? candidateId : ""}
                                        jobId={(jobId) ? jobId : ""}
                                        shortlistData={shortlistData}
                                        refreshShortlistBar={loadShortlistBar}
                                    />
                                    :
                                    null
                            }

                            <Box sx={{ width: '100%' }}>
                                <Box
                                    className='customCard py-0 customCenteredTabs '
                                    sx={{ borderBottom: 1, borderColor: 'divider', minHeight: 'auto !important', marginBottom: '0 !important' }}

                                >
                                    <Tabs value={value} onChange={handleChange} aria-label="View Company Tabs" centered>
                                        <Tab
                                            label={
                                                <Grid container direction="row">
                                                    <span className='tabLabelName'> Resume</span>
                                                </Grid>
                                            } {...tabProperties(0)} className='tabButton'
                                        />
                                        <Tab
                                            label={
                                                <Grid container direction="row">
                                                    <span className='tabLabelName'>Submissions</span>
                                                </Grid>
                                            } {...tabProperties(1)} className='tabButton'
                                        />
                                        <Tab
                                            label={
                                                <Grid container direction="row">
                                                    <span className='tabLabelName'>Interviews</span>
                                                </Grid>
                                            } {...tabProperties(2)} className='tabButton'
                                        />
                                        <Tab
                                            label={
                                                <Grid container direction="row">
                                                    <span className='tabLabelName'>Documents</span>
                                                </Grid>
                                            } {...tabProperties(3)} className='tabButton'
                                        />
                                        {/* <Tab
                                            label={
                                                <Grid container direction="row">
                                                    <span className='tabLabelName'>Overview</span>
                                                </Grid>
                                            } {...tabProperties(4)} className='tabButton'
                                        /> */}
                                        <Tab
                                            label={
                                                <Grid container direction="row">
                                                    <span className='tabLabelName'>Profile</span>
                                                </Grid>
                                            } {...tabProperties(4)} className='tabButton'
                                        />
                                    </Tabs>
                                    {/* <Box className='card customCard' p={0}>
                                        <div className='card-inner'>
                                            <Box sx={{ width: '100%' }}>
                                            <TabContext value={tabValue}>
                                                <Box className="custom-tabs" sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                            <TabList onChange={handleTabChange} aria-label="lab API tabs example"> */}

                                </Box>
                                <CustomTabPanel value={value} index={0}>

                                    <div className="customCard" style={{ minHeight: '250px', overflow: "auto" }}>
                                        {/* {
                                            selectedResume.documentId ?
                                                <Resume
                                                    // candidateId={(candidateId) ? candidateId : ""}
                                                    // jobId={(jobId) ? jobId : ""}
                                                    // sourceId={(sourceId) ? sourceId : ""}
                                                    // documentId={(selectedResume.documentId) ? selectedResume.documentId : ""}
                                                    // extension={(selectedResume.extension) ? selectedResume.extension : ""}
                                                    htmlData={htmlData}
                                                />
                                                :
                                                null
                                        } */}

                                        {
                                            candidateData.txtResume ?
                                                <div>
                                                    <Grid
                                                        container
                                                        direction="row"
                                                        justifyContent="flex-end"
                                                        alignItems="flex-start"
                                                    >
                                                        <Button style={{ color: "grey" }} onClick={() => setOpenResumePopup(true)}>
                                                            <OpenInFullRoundedIcon />
                                                        </Button>
                                                    </Grid>
                                                    <Resume htmlData={candidateData.txtResume} />
                                                    {
                                                        (openResumePopup) ?
                                                            <ResumePopup
                                                                open={openResumePopup}
                                                                closePopup={() => setOpenResumePopup(false)}
                                                                htmlData={candidateData.txtResume}
                                                            />
                                                            :
                                                            null
                                                    }

                                                </div>
                                                :
                                                null
                                        }
                                    </div>
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={1}>
                                    <Submissions submissionsList={submissionsList} />
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={2}>
                                    <Interviews candidatesList={candidateInterviewsList} />
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={3}>
                                    <Documents //docList={docList} 
                                    />
                                </CustomTabPanel>
                                {/* <CustomTabPanel value={value} index={4}>
                                    <Overview canData={candidateData} />
                                </CustomTabPanel> */}
                                <CustomTabPanel value={value} index={4}>
                                    <Profile add={updatePool === "add" ? true : false} candidateData={candidateData} />
                                </CustomTabPanel>
                            </Box>
                        </div>
                    </div>
                </div>

            </Grid >
            <Grid
                sx={{ width: 385 }}>

                <Activities
                    note={true}
                    call={true}
                    task={true}
                    email={true}
                    componentFrom="candidate"
                    candidateId={candidateId}
                    candidateData={candidateData}
                />

            </Grid>
        </Grid >
    );
};

export default ViewCandidateTalentPool;
