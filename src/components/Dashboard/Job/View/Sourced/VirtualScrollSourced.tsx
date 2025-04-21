import {
    React,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    lazy,
    Suspense
} from '../../../../../shared/modules/React';

import { CircularProgress } from '../../../../../shared/modules/MaterialImports/CircularProgress'
import { MouseEvent, UIEvent } from 'react';
import {
    MaterialReactTable,
    type MRT_ColumnDef,
    type MRT_SortingState,
} from '../../../../../shared/modules/MaterialReactTable';
import {
    type MRT_ColumnFiltersState,
    type MRT_RowVirtualizer,
} from 'material-react-table';
import { Typography } from '../../../../../shared/modules/MaterialImports/Typography';
import {
    QueryClient,
    QueryClientProvider,
    useInfiniteQuery,
} from '@tanstack/react-query';

import ApiService from "../../../../../shared/api/api";
import { trackPromise } from '../../../../../shared/modules/PromiseTrackter';
import { DateTime } from '../../../../../shared/modules/Luxon';
import { useParams } from 'react-router-dom';

import { Checkbox, Select } from "../../../../../shared/modules/MaterialImports/FormElements";
import { Grid, Button, InputAdornment, FormControl, IconButton, TextField } from '../../../../../shared/modules/commonImports';
import { Tooltip } from '../../../../../shared/modules/MaterialImports/ToolTip';
import { Popover } from '../../../../../shared/modules/MaterialImports/Popover';
import { Box } from "../../../../../shared/modules/MaterialImports/Box";
import { Stack } from "../../../../../shared/modules/MaterialImports/Stack";
import { ButtonGroup } from "../../../../../shared/modules/MaterialImports/ButtonGroup";
import { Menu, MenuItem } from "../../../../../shared/modules/MaterialImports/Menu";

// import CloneToOtherJob from './PopUps/CloneToOtherJob/CloneToOtherJob';
// import Sequence from './PopUps/Sequence/Sequence';

import { Avatar } from '../../../../../shared/modules/MaterialImports/Avatar';
import { userLocalData } from '../../../../../shared/services/userData';
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import USPhoneFormat from '../../../../../shared/utils/USPhoneFormat';
// import CircularProgress from '@mui/material/CircularProgress';
import MenuIcon from '@mui/icons-material/Menu';

import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';

import SouthRoundedIcon from '@mui/icons-material/SouthRounded';
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';

import PhoneDialog from "../../../../shared/PhoneDialog/PhoneDialog";

import EmailDialogBox from '../../../../shared/EmailDialogBox/EmailDialogBox';


const EvaluateApplicantsDrawer = lazy(() => import('../EvaluateApplicantsDrawer/EvaluateApplicantsDrawer'));
const ViewVoiceAICandidateModal = lazy(() => import('../../../Candidate/ViewCandidate/ViewVoiceAICandidateModal'));

const Invite = lazy(() => import('./Invite/Invite'));
const AddMatchToModal = lazy(() => import('../../../Candidate/ViewCandidate/CandidateTopCard/Popups/AddMatchToModal/AddMatchToModal'));

{/* Don't remove this Code */ }
const ClientSubmission = lazy(() => import('./PopUps/ClientSubmission/ClientSubmission'));
const ViewCandidateModal = lazy(() => import('../../../Candidate/ViewCandidate/ViewCandidateModal'));
{/* Don't remove this Code */ }


import QuestionMarkRoundedIcon from "@mui/icons-material/QuestionMarkRounded";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";


import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import { CloseRounded, SearchOutlined, ThumbUpOutlined, ThumbDownOutlined, CheckOutlined, ErrorOutlineOutlined } from '@mui/icons-material';
import Copy from '../../../../../shared/utils/Copy';
import RefreshIcon from '@mui/icons-material/Refresh';
import { MUIAutoComplete } from '../../../../shared/MUIAutoComplete/MUIAutoComplete';
import { showToaster } from "../../../../shared/SnackBar/SnackBar";
import ExpandDetails from '../../../Resume/Community/ExpandDetails/ExpandDetails';
import Parsable from '../../../../../shared/utils/Parsable';
import { ID_SETTINGS_WORKFLOW } from '../../../../../shared/services/Permissions/IDs';
import { OpenErrorModal } from '../../../../shared/ErrorModal/ErrorModal';
import JobDivaLink from '../../../../../shared/services/JobDivaLink';
import TableHeaderFilter from '../../../../shared/TableHeaderFilter/TableHeaderFilter';
import AudioPlayer from '../../../../shared/Audio/AudioPlayer';


type UserApiResponse = {
    List: Array<User>;
    total: number;
    // meta: {
    //     totalRowCount: number;
    // };
};

type User = {
    userId: string;
    userName: string;
    email: string;
    important: string;
    modifyDate: string;
    phoneno: string;
    phone2: string;
    recrId: string;
    recrName: string;
    searchId: string;
    status: string;
    statusId: string;
    candId: string;
    jobId: string;
    openId: string;
    sequenceIds: string[];
};

const fetchSize = 40;

const VirtualData = (
    { status, statusId, totalCount, masterJobData,
        refreshSourcedData, jobCriteriaData, addCriteria, loadRerunCriteria
    }
        :
        {
            status: string; statusId: any, totalCount: number, masterJobData: any,
            refreshSourcedData: () => void; jobCriteriaData: any; addCriteria: { (): void },
            loadRerunCriteria: { (userIds?: any[]): any },
        }
) => {


    const isEmailSMSSettingEnabled = userLocalData.checkIntegration(40005);

    const isBulkEmailSettingEnabled = userLocalData.checkIntegration(40005) && userLocalData.checkIntegration(400020);
    const isBullHornSettingEnabled = userLocalData.adminSettings(20043);
    const isVoiceAISettingEnabled = userLocalData.adminSettings(20044);
    const isEvaluteSettingEnabled = userLocalData.adminSettings(20046);
    const isAvionteAPISettingEnabled = userLocalData.adminSettings(20045);
    const isJobDivaAPISettingEnabled = userLocalData.adminSettings(20047);
    const isHiringWorkFlowEnabled = userLocalData.adminSettings(20027);
    const isQuickActionsEnabled = userLocalData.adminSettings(20053);
    const isCampaignsEnabled = userLocalData.adminSettings(20024);

    const isVoiceAIAndNotHiringWorkflowEnabled = isVoiceAISettingEnabled && !isHiringWorkFlowEnabled;

    const [currentPlayingId, setCurrentPlayingId] = useState("");

    const [selectCandidList, setSelectCandidList] = useState<any>([]);
    const { jobId } = useParams();


    const jobPrimaryRecruiterName = localStorage.getItem(`jobId_${jobId}_PrimaryName`) || "";


    // const [selectedCandidateIds, setSelectedCandidateIds] = useState<string[]>([]);
    const [sortAnchorEl, setSortAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [sortColumn, setSortColumn] = useState("Date");
    const [sortType, setSortType] = useState("desc");
    const [addEmail, setAddEmail] = useState(false);
    const [selectedEmail, setSelectedEmail] = useState('');
    const [selectedName, setSelectedName] = useState('');
    const [isBulkEmail, setIsBulkEmail] = useState(false);
    const [addSMS, setAddSMS] = useState(false);
    const [isBulkSMS, setIsBulkSMS] = useState(false);
    const [selectedSMS, setSelectedSMS] = useState('');
    const sortOpen = Boolean(sortAnchorEl);
    const sortId = sortOpen ? 'simple-popover' : undefined;

    const [phoneOnClicked, setPhoneOnClicked] = useState("");
    const [dialogPhoneStatus, setDialogPhoneStatus] = useState(false);
    const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
    const [TableMailOpen, setTableOpenMail] = useState<null | HTMLElement>(null);
    const [dialogStatus, setDialogStatus] = useState(false);
    const [callAnchorElement, setCallAnchorElement] = useState<null | HTMLElement>(null);
    const [emailOnClicked, setEmailOnClicked] = useState("");
    const openTableMail = Boolean(TableMailOpen);
    const openCallMenu = Boolean(callAnchorElement);
    const [searchValue, setSearchValue] = useState("");
    const [viewCandidate, setViewCandidate] = useState(false);
    const [viewVoiceAIStatus, setViewVoiceAIStatus] = useState(false);
    const [selectVoiceAICandidateStatus, setSelectVoiceAICandidateStatus] = useState("");

    const [selectJobDivaCandidateStatus, setSelectJobDivaCandidateStatus] = useState("");
    const [selectVoiceAIStatus, setSelectVoiceAIStatus] = useState("");
    const [selectJobDivaStatus, setSelectJobDivaStatus] = useState("");
    const [viewVoiceAIHTML, setViewVoiceAIHTML] = useState<any>("");

    const [addtosequencelistanchorEl, setAddToSequenceListAnchorEl] =
        useState<null | HTMLElement>(null);
    const openAddToSequenceListenBtn = Boolean(addtosequencelistanchorEl);
    const [selectedSequence, setSelectedSequence] = useState({
        id: "",
        name: ""
    });
    const viewCandidateId = useRef("");
    const [allSourcedIds, setAllSourcedIds] = useState<any[]>([])
    const [menuData, setMenuData] = useState<{
        rowId: string;
        email: string;
        candId: string;
        jobId: string;
        phoneno: string;
        first: string;
        sequenceIds: string[],
    }>({
        rowId: "",
        email: "",
        candId: "",
        jobId: "",
        phoneno: "",
        first: "",
        sequenceIds: [],
    });
    const [viewEvaluationDrawer, setViewEvaluationDrawer] = useState(false);
    const [voiceAICandidateStatusList, setVoiceAICandidateStatusList] = useState<any[]>([]);
    const [jobDivaCandidateStatusList, setJobDivaCandidateStatusList] = useState<any[]>([]);

    const [voiceAIStatusList] = useState<any[]>([
        { "id": 1, "value": "VoiceAiAvailable", "label": "Pushed" },
        { "id": 2, "value": "VoiceAiUnavailable", "label": "Un-Pushed" },
        { "id": 3, "value": "VoiceAiError", "label": "Error" }
    ]);

    const [jobDivaStatusList] = useState<any[]>([
        { "id": 1, "value": "JobdivaAvailable", "label": "Pushed" },
        { "id": 2, "value": "JobdivaUnavailable", "label": "Un-Pushed" },
        { "id": 3, "value": "JobdivaError", "label": "Error" }
    ]);

    const handleTableMenuSendMailOpen = (sendMailId: any) => {

        if (sendMailId) {
            setDialogStatus(true);
            setEmailOnClicked(sendMailId);
            setTableOpenMail(null);
        }
        // console.log(sendMailId);
    };

    const getVoiceAiCandidateStatusList = () => {
        const lsKey = `${userLocalData.getvalue("clientName")}_VOICEAI_CANDIDATE_STATUS_${userLocalData.getvalue("clientId")}`
        const lsData = localStorage.getItem(lsKey);
        if (lsData && Parsable.isJSON(lsData) && !!JSON.parse(lsData)?.length) {
            setVoiceAICandidateStatusList(JSON.parse(lsData) || []);
        } else {
            ApiService.getCall("admin", 'voiceAICandidateStatusList')
                .then((result) => {
                    let tempData = result.data?.candidateStatusList || [];
                    if (Array.isArray(tempData) && !!tempData?.length) {
                        tempData = tempData.sort((a: any, b: any) => {
                            return a.label.localeCompare(b.label);
                        })
                    }
                    if (result.data.Success) {
                        setVoiceAICandidateStatusList(tempData);
                    } else {
                        setVoiceAICandidateStatusList([]);
                        showToaster("error", result.data.Message || "Error fetching candidate status list.");
                    }
                    localStorage.setItem(lsKey, JSON.stringify(tempData))
                })
                .catch((error) => {
                    console.error('Error fetching Sourced Count:', error);
                });
        }
    }

    const getJobDivaCandidateStatusList = () => {
        const lsKey = `${userLocalData.getvalue("clientName")}_JOBDIVA_CANDIDATE_STATUS_${userLocalData.getvalue("clientId")}`
        const lsData = localStorage.getItem(lsKey);
        if (lsData && Parsable.isJSON(lsData) && !!JSON.parse(lsData)?.length) {
            setJobDivaCandidateStatusList(JSON.parse(lsData) || []);
        } else {
            ApiService.getCall("admin", 'jobDivaCandidateStatusList')
                .then((result) => {
                    let tempData = result.data?.candidateStatusList || [];
                    if (Array.isArray(tempData) && !!tempData?.length) {
                        tempData = tempData.sort((a: any, b: any) => {
                            return a.label.localeCompare(b.label);
                        })
                    }
                    if (result.data.Success) {
                        setJobDivaCandidateStatusList(tempData);
                    } else {
                        setJobDivaCandidateStatusList([]);
                        showToaster("error", result.data.Message || "Error fetching candidate status list.");
                    }
                    localStorage.setItem(lsKey, JSON.stringify(tempData))
                })
                .catch((error) => {
                    console.error('Error fetching Sourced Count:', error);
                });
        }
    }

    useEffect(() => {
        getVoiceAiCandidateStatusList();
        getJobDivaCandidateStatusList();
    }, [])

    const handleTableCall = (
        event: React.MouseEvent<HTMLButtonElement>,
        callId: any
    ) => {
        // const filterCallId = filterLocalData.filter((item: any) => item.person_id === callId)
        console.log("filterCallId", callId);
        if (callId) {
            setTableOpenMail(null);
            setCallAnchorElement(event.currentTarget);
            setSelectedRowId(callId);
        }
    };

    const handleTableClose = () => {
        setTableOpenMail(null);
        setCallAnchorElement(null);
    };


    const handleProfileMenuClose = () => {
        setAddToSequenceListAnchorEl(null);
        setOpenSequenceModal(false);
        setSelectedSequence({
            id: '',
            name: ''
        });
    };


    // const handleShowCallSnack = (callId: any) => {
    //     setCallAnchorElement(null);
    // };

    const handleTableMail = (
        event: React.MouseEvent<HTMLButtonElement>,
        mailId: any
    ) => {
        //  const filterMailId = filterLocalData.filter((item: any) => item.person_id === mailId)
        if (mailId) {
            setTableOpenMail(event.currentTarget);
            setSelectedRowId(mailId);
            setCallAnchorElement(null);
            // console.log(
            // "aa",
            //     event.currentTarget,
            //     "---" + mailId,
            //     " === " + openTableMail
            // );
        }
    };

    // const handleShowSnack = (snackId: any) => {
    //     setTableOpenMail(null);
    // };


    const handleSortClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setSortAnchorEl(event.currentTarget);
    };

    const handleSortClose = () => {
        setSortAnchorEl(null);
        setIsSelectAllChecked(false);
        setRowSelection({});
    };


    const handleBlastSMS = () => {
        const selectedIds = Object.keys(rowSelection);
        if (selectedIds.length === 1) {
            const selectedRowKey = selectedIds[0];
            const selectedRow = flatData.find((candidate: any) => Number(candidate.userId) === Number(selectedRowKey));
            // console.log(selectedRow);
            if (selectedRow) {
                setSelectedSMS(selectedRow.phoneno);
                setSelectedName(selectedRow.userName);
                setIsBulkSMS(false);
                setAddSMS(true);
                setSelectCandidList(selectedIds);
            }
        } else if (selectedIds.length > 1) {
            setSelectedSMS('');
            setSelectedName('');
            setIsBulkSMS(true);
            setAddSMS(true);
            setSelectCandidList(selectedIds);
        }
    }

    const addToTopSequenceList = (id: string, name: string) => {

        //  console.log(Object.keys(rowSelection));
        if (Object.keys(rowSelection).length > 0) {
            if (name && name.trim()) {
                setSelectedSequence({ id: id, name: name });
                handleProfileMenuClose();
                addToSequenceList(id, name, Object.keys(rowSelection).join(','));
            }
        } else {
            showToaster('Select atleast one Candidate', 'error');
        }
    }

    const addToSequenceList = (id: string, name: string, candidateId: string) => {
        if (name && name.trim()) {
            handleProfileMenuClose();
            const saveData = {
                clientId: userLocalData.getvalue('clientId'),
                sequenceId: id,
                recrId: userLocalData.getvalue('recrId'),
                userIds: candidateId,
            }
            ApiService.postWithData('admin', 'sequenceAssignUsers', saveData)
                .then(
                    (response: any) => {
                        if ((response.data.message === "Success") || (response.data.Message === "Success")) {
                            showToaster("Campaign has been assigned successfully", 'success');
                            // let candidateIds = candidateId.split(",");
                            // !!candidateIds?.length && candidateIds.map((candId: string) => { formatSequenceData(id, name, candId) })
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


    //   const formatSequenceData = (
    //     id: string,
    //     name: string,
    //     candidateId: string
    //   ) => {
    //     let tempData: any = data;

    //     for (let index = 0; index < data.length; index++) {
    //       if (tempData[index].candId === candidateId) {
    //         tempData[index].sequenceCount = tempData[index].sequenceCount + 1;

    //         const arrSeqIds = tempData[index].sequenceIds;
    //         tempData[index].sequenceIds = [...arrSeqIds, id];

    //         const arrSeqNames = tempData[index].sequenceNames;
    //         tempData[index].sequenceNames = [...arrSeqNames, name];
    //       }
    //     }

    //     setApplicantsData([...tempData]);
    //   };


    const handleBlastEmail = () => {
        const selectedIds = Object.keys(rowSelection);
        if (selectedIds.length === 1) {
            const selectedRowKey = selectedIds[0];
            const selectedRow = flatData.find((candidate: any) => Number(candidate.userId) === Number(selectedRowKey));
            if (selectedRow) {
                setSelectedEmail(selectedRow.email);
                setSelectedName(selectedRow.userName);
                setIsBulkEmail(false);
                setAddEmail(true);
                setSelectCandidList(selectedIds);
            }
        } else if (selectedIds.length > 1) {
            setSelectedEmail('');
            setSelectedName('');
            setIsBulkEmail(true);
            setAddEmail(true);
            setSelectCandidList(selectedIds);
        }
    };

    const getShortName = (name: string) => {
        let tempNameArray = name.split(' ');
        if (tempNameArray.length > 1) {
            return {
                children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
            };
        } else if (tempNameArray.length === 1) {
            return {
                children: `${name.split(' ')[0][0]}${name.split(' ')[0][1]}`,
            };

        } else {
            return {
                children: ``,
            };
        }
    }

    // const getCandidateStatus = (key: string) => {
    //     switch (key) {
    //         case '2':
    //             return "Not reviewed";
    //         case '3':
    //             return "Contacted";
    //         case '4':
    //             return "Presented";
    //         case '5':
    //             return "Interviewing";
    //         case '6':
    //             return "Offer Made";
    //         case '7':
    //             return "Onboarding";
    //         case '8':
    //             return "On Assignment";
    //         case '9':
    //             return "Past Contractor";
    //         case '10':
    //             return "Do Not Hire";
    //         case '':
    //         case '1':
    //         default:
    //             return "Lead";
    //     }
    // }

    const openCandidateView = async (id: string, sourceId: string) => {
        // let tempSourceId = (sourceId) ? "/" + sourceId : "";
        // window.open(globalData.getWindowLocation() + "candidate/view/" + id + "/" + jobId + tempSourceId);
        let allSourced = await getAllSourcedData();
        if (Array.isArray(allSourced) && !!allSourced?.length) {
            let tempData = allSourced.map((each) => each.toString().trim());
            setAllSourcedIds(tempData);
        } else {
            setAllSourcedIds([...candidateIdsList])
        }
        viewCandidateId.current = id;
        setViewCandidate(true);
    }

    const openVoiceAIView = async (id: string, voiceId: string, openId: string) => {

        let dataBody = {
            voiceAiId: voiceId,
            jobId: jobId ? Number(jobId) : "",
            type: "shortList",
            clientId: userLocalData.getvalue('clientId')
        }
        // let dataBody = {
        //     "clientId": 3,
        //     "jobId": "2419",
        //     "type": "shortList",
        //     "voiceAiId": "7343d50f-0a33-4d67-b6fe-9bb879cbbfea"
        // }

        try {
            trackPromise(
                ApiService.postWithData("voiceai", "candidates/getCandidateActivityLog", dataBody).then((response: any) => {
                    if (response.data.Success) {
                        console.log("response.data.Data", response.data);
                        setViewVoiceAIHTML(response.data);
                        //  showToaster("Candidate voiceAI successfully!", "success");
                        setViewVoiceAIStatus(true);
                        // closePopup();

                    } else {
                        showToaster(response.data.Message || "Failed to Candidate voiceAI Screening", "error");
                    }
                })
            )
        } catch (error) {
            console.error("Error Candidate voiceAI Screening:", error);
            showToaster("Something went wrong. Please try again.", "error");
        }
        viewCandidateId.current = id;
    }

    // const tempReferenceNo = localStorage.getItem(`curately_${userLocalData.getvalue('clientId')}_jobId_${jobId}`);

    const getSlicedCell = (data: string) => {
        const displayTitle = data?.length > 30 ? data.slice(0, 30) : data;
        if (data?.length > 30) {
            return (
                <Tooltip title={data}>
                    <span>{displayTitle}...</span>
                </Tooltip>
            )
        } else return <span>{displayTitle}</span>
    }

    const columns: MRT_ColumnDef<User>[] = useMemo(
        () => {
            const defaultColumns: MRT_ColumnDef<User>[] = [
                {
                    accessorKey: 'userName',
                    header: 'Name',
                    Cell: ({ row }) => (
                        (<span className="hightLightTd" onClick={() => openCandidateView(row.original.userId, row.original.searchId)}>{getSlicedCell(row.original.userName)}</span>)//
                    ),
                },
                // {
                //     accessorKey: 'email',
                //     header: 'Email',
                //     Cell: ({ row }) => (
                //         <span className="no-capitalization">{row.original.email}</span>
                //     ),
                // },
                {
                    accessorKey: "Actions",
                    header: "Quick Actions",
                    enableSorting: false,
                    size: 80,
                    Cell: ({ row }) => (
                        <Stack key={row.original.candId}>
                            <ButtonGroup
                                variant="outlined"
                                id={row.original.candId}
                                // sx={{
                                //     // width: "33px",
                                //     height: "31px",
                                //     mr: 1,
                                // }}
                                sx={{
                                    width: "33px",
                                    // height: "31px",
                                    "& .MuiButtonGroup-grouped": {
                                        marginRight: "1px",
                                        border: "1px solid var(--c-neutral-40)"
                                    },
                                }}
                            >
                                {
                                    isEmailSMSSettingEnabled ?
                                        <Tooltip title={row.original.email} placement="top">
                                            <Button sx={{
                                                borderColor: "1px solid var(--c-neutral-40)",
                                                backgroundColor: "#ffffff",
                                                color: "1px solid var(--c-neutral-40)",
                                                // "1px solid var(--c-neutral-40)" ? "1px solid var(--c-neutral-40)" : "#919191",
                                                borderRightColor: "1px solid var(--c-neutral-40)",
                                                //  "1px solid var(--c-neutral-40)" ? "1px solid var(--c-neutral-40)"
                                                //     : "var(--c-secondary-color)",
                                                mr: "0px",
                                                "&:hover": {
                                                    border: "1px solid var(--c-neutral-40)",
                                                    color: "#919191",
                                                    backgroundColor: "#ffffff",
                                                },
                                                width: "33px",
                                            }}
                                                id={`mailbutton-${row.id}`}
                                                onClick={e => {
                                                    if (row.original.email) {
                                                        setMenuData({
                                                            rowId: row.id,
                                                            email: row.original.email,
                                                            candId: row.original.userId,
                                                            phoneno: "",
                                                            jobId: row.original.jobId,
                                                            first: row.original.userName,
                                                            sequenceIds: row.original.sequenceIds
                                                        });
                                                        console.log(setMenuData);
                                                        //  handleTableMail(e, `${row.id}`);
                                                        handleTableMenuSendMailOpen(row.original.email);
                                                    }
                                                }}
                                                aria-controls={
                                                    openTableMail && selectedRowId === `${row.id}`
                                                        ? `mail-${row.id}`
                                                        : undefined
                                                }
                                                aria-haspopup="true"
                                                aria-expanded={
                                                    openTableMail && selectedRowId === `${row.id}`
                                                        ? "true"
                                                        : undefined
                                                }>
                                                <Box
                                                    sx={{
                                                        position: "relative",
                                                        display: "inline-block",
                                                        alignItems: "center",
                                                        mt: 1,
                                                    }}
                                                >
                                                    <MailOutlineOutlinedIcon
                                                        sx={{
                                                            fontSize: "16px",
                                                        }}
                                                    />

                                                    <Box
                                                        sx={{
                                                            backgroundColor: "#1DB268",
                                                            // display: 'none',
                                                            height: "10px",
                                                            width: "10px",
                                                            borderRadius: "50%",
                                                            fontSize: "10px",
                                                            display: row.original.email ? "flex" : "none",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            color: "red",
                                                            position: "absolute",
                                                            top: -2,
                                                            right: -2,
                                                        }}
                                                    >
                                                        <DoneRoundedIcon
                                                            sx={{
                                                                fontSize: "8px",
                                                                color: "#ffffff",
                                                            }}
                                                        />
                                                    </Box>

                                                    <Box
                                                        sx={{
                                                            backgroundColor: "#919191",
                                                            // display: 'none',
                                                            height: "10px",
                                                            width: "10px",
                                                            borderRadius: "50%",
                                                            fontSize: "10px",
                                                            display: row.original.email ? "none" : "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            color: "red",
                                                            position: "absolute",
                                                            top: -2,
                                                            right: -2,
                                                        }}
                                                    >
                                                        <CloseRoundedIcon
                                                            sx={{
                                                                fontSize: "8px",
                                                                color: "#ffffff",
                                                            }}
                                                        />
                                                    </Box>

                                                    <Box
                                                        sx={{
                                                            backgroundColor: "#EB7A2F",
                                                            display: "none",
                                                            height: "10px",
                                                            width: "10px",
                                                            borderRadius: "50%",
                                                            fontSize: "10px",
                                                            // display: 'flex',
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            color: "red",
                                                            position: "absolute",
                                                            top: -2,
                                                            right: -2,
                                                        }}
                                                    >
                                                        <QuestionMarkRoundedIcon
                                                            sx={{
                                                                color: "#ffffff",
                                                                fontSize: "8px",
                                                            }}
                                                        />
                                                    </Box>
                                                </Box>
                                            </Button>
                                        </Tooltip>
                                        : null
                                }
                                {
                                    isEmailSMSSettingEnabled && !userLocalData.isChromeExtensionEnabled() ?
                                        <Tooltip title={`${USPhoneFormat.get(row.original.phoneno)}`} placement="top">
                                            <Button
                                                id={`phonebutton-${row.id}`}
                                                disableRipple
                                                onClick={e => {
                                                    if (row.original.phoneno) {
                                                        setMenuData({
                                                            rowId: row.id,
                                                            email: "",
                                                            candId: row.original.userId,
                                                            phoneno: row.original.phoneno,
                                                            jobId: row.original.jobId,
                                                            first: row.original.userName,
                                                            sequenceIds: row.original.sequenceIds
                                                        });
                                                        setPhoneOnClicked(row.original.phoneno);
                                                        setDialogPhoneStatus(true);
                                                        setCallAnchorElement(null);

                                                        //  handleTableCall(e, `${row.id}`);
                                                    }
                                                }}
                                                aria-controls={
                                                    openCallMenu && selectedRowId === `${row.id}`
                                                        ? `phone-${row.id}`
                                                        : undefined
                                                }
                                                aria-haspopup="true"
                                                aria-expanded={
                                                    openCallMenu && selectedRowId === `${row.id}`
                                                        ? "true"
                                                        : undefined
                                                }
                                                className={`customButtonForHover ${row.original.phoneno === "" ? "disabled" : `${row.original.phoneno}`
                                                    } `}
                                                sx={{
                                                    borderColor:
                                                        openCallMenu && selectedRowId === `${row.id}`
                                                            ? "1px solid var(--c-neutral-40)"
                                                            : "var(--c-secondary-color)",
                                                    backgroundColor: "#ffffff",
                                                    color:
                                                        openCallMenu && selectedRowId === `${row.id}`
                                                            ? "#919191"
                                                            : "#919191",
                                                    "& .MuiButtonGroup-root .MuiButtonGroup-grouped:not(:last-of-type)":
                                                    {
                                                        borderRightColor:
                                                            openCallMenu && selectedRowId === `${row.id}`
                                                                ? "1px solid var(--c-neutral-40)"
                                                                : "",
                                                    },
                                                    "&:hover": {
                                                        border: "1px solid var(--c-neutral-40)",
                                                        color: "#919191",
                                                        backgroundColor: "#ffffff",
                                                    },
                                                    width: "33px",
                                                }}
                                            >
                                                <CallOutlinedIcon
                                                    sx={{
                                                        fontSize: "16px",
                                                    }}
                                                />
                                                {/* <ArrowDropDownIcon
                                        sx={{
                                            fontSize: "16px",
                                        }}
                                    /> */}
                                            </Button>
                                        </Tooltip>
                                        : null
                                }
                            </ButtonGroup>
                        </Stack>
                    ),
                    enableHiding: true
                },

                // {
                //     accessorKey: 'phoneno',
                //     header: 'Phone 1',
                //     Cell: ({ row }) => (
                //         <span>{USPhoneFormat.get(row.original.phoneno)}</span>
                //     ),
                //     size: 120
                // },
                // {
                //     accessorKey: 'phone2',
                //     header: 'Phone 2',
                //     Cell: ({ row }) => (
                //         <span>{USPhoneFormat.get(row.original.phone2)}</span>
                //     ),
                //     size: 120
                // },
                // {
                //     accessorKey: 'status',
                //     header: 'Status',
                //     size: 120,
                //     // accessorFn: (row) => `${row.status}`,
                //     Cell: ({ row }) => (
                //         <span>
                //             {status}
                //             {/* {row.original.status} */}
                //             {/* <Tooltip title={row.original.statusId}>
                //     {row.original.statusId}

                //         </Tooltip> */}

                //         </span>
                //     ),
                // },
                {
                    accessorKey: 'recrName',
                    header: isVoiceAIAndNotHiringWorkflowEnabled ? 'Recruiter' : 'Username',
                    size: 75,
                    accessorFn: (row) => `${row.recrName}`,
                    Cell: ({ row }) => (
                        <span className=''>
                            <Tooltip title={isVoiceAIAndNotHiringWorkflowEnabled ? jobPrimaryRecruiterName : row.original.recrName}>
                                <Avatar sx={{ width: 30, height: 30, fontSize: 12 }} {...getShortName(isVoiceAIAndNotHiringWorkflowEnabled ? jobPrimaryRecruiterName : row.original.recrName)}></Avatar>
                            </Tooltip>
                        </span>
                    ),
                },
                {
                    accessorKey: "modifyDate",
                    header: " Last Action",
                    size: 75,
                    Cell: ({ row }) => (
                        <span>
                            {/* {params.row.CreatedDate.substring(0, 10)} */}
                            {DateTime.fromFormat(row.original.modifyDate.substring(0, 10), 'yyyy-MM-dd').toFormat('MM/dd/yyyy')}

                        </span>
                    ),
                },
                // {
                //     accessorKey: 'userId',
                //     header: '',
                //     size: 120,
                //     // accessorFn: (row) => `${row.recrName}`,
                //     Cell: ({ row }) => (
                //         <span className={`${statusId} ${(tempReferenceNo && (Number(statusId) < 1009)) ? '' : 'd-none'}`}>
                //             <Button variant="outlined" color="secondary" className={`mr-2 `}
                //                 onClick={() => {
                //                     selectedUserId.current = row.original.userId;
                //                     selectedUserOpenId.current = row.original.openId;
                //                     setOpenClientSubmissionModal(true);
                //                 }}
                //             >
                //                 Client Submission
                //             </Button>
                //         </span>
                //     ),
                // },
                {
                    accessorKey: "status",
                    header: "Status",
                    size: 80,
                    enableHiding: true
                },
                {
                    accessorKey: "bulhornId",
                    header: "Bullhorn",
                    Cell: ({ row }: any) => (
                        <>
                            {row?.original?.bulhornId ?
                                <span className="ml-4" > <CheckOutlined color="success" /> </span>
                                : (["true", true, false, "false"].includes(row?.original?.bulhornIsSuccess) ?
                                    <Tooltip title="Click here to View Error Message">
                                        <span className="ml-4 errorMsg" style={{ cursor: 'pointer' }} onClick={() => {
                                            OpenErrorModal({ errorMessage: row?.original?.bulhornReason, title: "Bullhorn - Error Message" })
                                        }} > <ErrorOutlineOutlined color="error" />  </span>
                                    </Tooltip>
                                    : null)
                            }
                        </>

                    ),
                    size: 80,
                    enableHiding: true,
                },
                {
                    accessorKey: "voiceAiId",
                    header: "Voice AI",
                    Cell: ({ row }: any) => (
                        <>
                            {row?.original?.voiceAiId ?
                                <span className="ml-4" > <CheckOutlined color="success" /> </span>
                                : (["true", true, false, "false"].includes(row?.original?.voiceAiCandidateSuccess) ?
                                    <Tooltip title="Click here to View Error Message">
                                        <span className="ml-4 errorMsg" style={{ cursor: 'pointer' }} onClick={() => {
                                            OpenErrorModal({ errorMessage: row?.original?.voiceAiReason, title: "VoiceAI - Error Message" })
                                        }} > <ErrorOutlineOutlined color="error" />  </span>
                                    </Tooltip>
                                    : null)

                            }
                        </>

                        // (row?.original?.voiceAiId) ?
                        //     (["true", true, false, "false"].includes(row?.original?.voiceAiCandidateSuccess) ? (<Tooltip title={row?.original?.voiceAiReason} >
                        //         <span className="ml-4">
                        //             {["true", true].includes(row?.original?.voiceAiCandidateSuccess) ? <CheckOutlined color="success" /> : <ErrorOutlineOutlined color="error" />}
                        //         </span>
                        //     </Tooltip>) : "") : null
                    ),
                    Header: () => <TableHeaderFilter
                        title={"Voice AI"}
                        options={voiceAIStatusList}
                        columnFilter={selectVoiceAIStatus}
                        setColumnFilter={(filterValue: string) => {
                            setSelectVoiceAICandidateStatus("");
                            setSelectJobDivaStatus("");
                            setSelectJobDivaCandidateStatus("");
                            setSelectVoiceAIStatus(filterValue);
                        }}
                        optionKeys={{ id: "value", label: "label" }}
                    />,
                    enableSorting: false,
                    size: 80,
                    enableHiding: true,
                },
                {
                    accessorKey: "voiceAiCandidateStatus",
                    header: "VoiceAI Status",
                    Cell: ({ row }: any) => (
                        <>
                            <Stack direction="row" spacing={1} alignItems="center" justifyContent="left">
                                {
                                    ["true", true].includes(row?.original?.voiceAiCandidateSuccess) &&
                                        ["screening_completed"].includes(row?.original?.voiceAiCandidateStatus) ? <span className="hightLightTd"
                                            onClick={() => openVoiceAIView(row.original.userId, row.original.voiceAiId, row.original.openId)}>
                                        <span>{row?.original?.voiceAiCandidateStatus.replaceAll("_", " ")}</span>

                                    </span> :
                                        <span>{row?.original?.voiceAiCandidateStatus.replaceAll("_", " ")}</span>
                                }
                                {
                                    ["true", true].includes(row?.original?.voiceAiCandidateSuccess) &&
                                        ["screening_completed"].includes(row?.original?.voiceAiCandidateStatus) &&
                                        (row?.original?.voiceAIUrl) ?
                                        <>
                                            <AudioPlayer
                                                src={row?.original?.voiceAIUrl}
                                                isPlaying={currentPlayingId === row.original.userId ? true : false}
                                                togglePlay={(isPlaying: boolean) => {
                                                    setCurrentPlayingId(isPlaying ? "" : row.original.userId)
                                                }} />
                                            {/* <AudioPlayer src="https://d3l90zwax4sqbj.cloudfront.net/885924580404/06b8a3f6-e422-4d86-b393-b4d3bdd4509f/audio_recordings/recording_combined.ogg" /> */}
                                        </>
                                        : null

                                    // <span>{row?.original?.voiceAiCandidateStatus.replaceAll("_", " ")}</span>
                                }
                            </Stack>
                        </>
                    ),
                    Header: () => <TableHeaderFilter
                        title={"VoiceAI Status"}
                        options={voiceAICandidateStatusList}
                        columnFilter={selectVoiceAICandidateStatus}
                        setColumnFilter={(filterValue: string) => {
                            setSelectJobDivaStatus("");
                            setSelectJobDivaCandidateStatus("");
                            setSelectVoiceAIStatus("");
                            setSelectVoiceAICandidateStatus(filterValue);
                        }}
                        optionKeys={{ id: "value", label: "label" }}
                    />,
                    enableSorting: false,
                    size: 80,
                    enableHiding: true,
                },

                {
                    accessorKey: "aviontId",
                    header: "Aviont",
                    Cell: ({ row }: any) => (
                        <>
                            {row?.original?.aviontId ?
                                <span className="ml-4" > <CheckOutlined color="success" /> </span>
                                : (["true", true, false, "false"].includes(row?.original?.avionIsSuccess) ?
                                    <Tooltip title="Click here to View Error Message">
                                        <span className="ml-4 errorMsg" style={{ cursor: 'pointer' }} onClick={() => {
                                            OpenErrorModal({ errorMessage: row?.original?.avionReason, title: "Avionte - Error Message" })
                                        }} > <ErrorOutlineOutlined color="error" />  </span>
                                    </Tooltip>
                                    : null)
                            }
                        </>
                    ),
                    size: 80,
                    enableHiding: true,
                },
                {
                    accessorKey: "jobdivaId",
                    header: "Job Diva",
                    Cell: ({ row }: any) => (
                        <>
                            {row?.original?.jobdivaId ?
                                <span className="ml-4" onClick={() => { JobDivaLink.jobDivaLinkUrl("candidate", row?.original.jobdivaId) }} title="JobDiva" style={{ cursor: 'pointer' }}  > <CheckOutlined color='success' className='cursor-pointer' /></span>

                                : (["true", true, false, "false"].includes(row?.original?.jobdivaIsSuccess) ?
                                    <Tooltip title="Click here to View Error Message">
                                        <span className="ml-4 errorMsg" style={{ cursor: 'pointer' }} onClick={() => {
                                            OpenErrorModal({ errorMessage: row?.original?.jobdivaReason, title: "JobDiva - Error Message" })
                                        }} > <ErrorOutlineOutlined color="error" />  </span>
                                    </Tooltip >
                                    : null)
                            }
                        </>
                    ),
                    Header: () => <TableHeaderFilter
                        title={"JobDiva"}
                        options={jobDivaStatusList}
                        columnFilter={selectJobDivaStatus}
                        setColumnFilter={(filterValue: string) => {
                            setSelectJobDivaCandidateStatus("");
                            setSelectVoiceAIStatus("");
                            setSelectVoiceAICandidateStatus("");
                            setSelectJobDivaStatus(filterValue);
                        }}
                        optionKeys={{ id: "value", label: "label" }}
                    />,
                    enableSorting: false,
                    size: 80,
                    enableHiding: true,
                },
                {
                    accessorKey: "jobdivaCandidateStatus",
                    header: "JobDiva Status",
                    Cell: ({ row }: any) => (

                        ["true", true, false, "false"].includes(row?.original?.jobdivaIsSuccess) && row?.original?.jobdivaReason ?
                            <span className="hightLightTd"
                                onClick={() => OpenErrorModal({ errorMessage: row?.original?.jobdivaReason, title: row.original.userName + ' - ' + row?.original?.jobdivaCandidateStatus })}>
                                <span>{row?.original?.jobdivaCandidateStatus.replaceAll("_", " ")}</span>
                            </span> :
                            <span>{row?.original?.jobdivaCandidateStatus.replaceAll("_", " ")}</span>

                        //  return <span>{row?.original?.jobdivaCandidateStatus ? row.original?.jobdivaCandidateStatus : ""}</span>
                    ),
                    Header: () => <TableHeaderFilter
                        title={"JobDiva Status"}
                        options={jobDivaCandidateStatusList}
                        columnFilter={selectJobDivaCandidateStatus}
                        setColumnFilter={(filterValue: string) => {
                            setSelectVoiceAIStatus("");
                            setSelectVoiceAICandidateStatus("");
                            setSelectJobDivaStatus("");
                            setSelectJobDivaCandidateStatus(filterValue);
                        }}
                        optionKeys={{ id: "value", label: "label" }}
                    />,
                    enableSorting: false,
                    size: 80,
                    enableHiding: true,
                },
            ];
            if (isEvaluteSettingEnabled && !!jobCriteriaData?.criteria?.length) {
                let criteriaColumns: MRT_ColumnDef<User>[] = jobCriteriaData.criteria.map((each: any) => {
                    return {
                        accessorKey: each.match_criteria.replace(/\s/g, '') + "status",
                        header: each.match_criteria,
                        enableColumnActions: true,
                        Cell: ({ row }: any) => {

                            const accessKey = each.match_criteria.replace(/\s/g, '') + 'status';
                            return (
                                (row.original[accessKey]) ?
                                    <Tooltip title={row.original.jobTitle} classes={{ tooltip: "tt-capital" }}>
                                        <span className={`${(row.original[accessKey].trim() === "Match") ? 'Match' : (row.original[accessKey].trim() === "Potential Match") ? 'PotentialMatch' : (row.original[accessKey].trim() === "Not a Match") ? 'NotaMatch' : ''}`}
                                        >
                                            {
                                                row.original[accessKey] === "Match" ?
                                                    <ThumbUpOutlined />
                                                    :
                                                    row.original[accessKey] === "Potential Match" ?
                                                        <ThumbUpOutlined />
                                                        :
                                                        row.original[accessKey] === "Not a Match" ?
                                                            <ThumbDownOutlined />
                                                            :
                                                            null
                                            }
                                        </span>
                                    </Tooltip>
                                    :
                                    ""
                            );
                        },
                        Header: () => <Tooltip title={each.match_criteria}><Typography sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            WebkitLineClamp: 1,
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            pointerEvents: "auto !important"
                        }}>{each.match_criteria}</Typography></Tooltip>,
                        size: 75
                    };
                })
                return defaultColumns.concat([{
                    accessorKey: "criteriaScore",
                    header: "Evaluate Score",
                    Cell: ({ row }: any) => {
                        return <span>{`${row.original.criteria ? (row.original.scorePercentage ? row.original.scorePercentage : 0) + '%' : ''}`}</span>
                    },
                    size: 60
                }, ...criteriaColumns]);
            } else return defaultColumns;
        }, [jobCriteriaData, voiceAICandidateStatusList, jobDivaCandidateStatusList, selectVoiceAIStatus, selectVoiceAICandidateStatus, selectJobDivaStatus, , selectJobDivaCandidateStatus, currentPlayingId]);

    const tableContainerRef = useRef<HTMLDivElement>(null); //we can get access to the underlying TableContainer element and react to its scroll events
    const rowVirtualizerInstanceRef =
        useRef<MRT_RowVirtualizer<HTMLDivElement, HTMLTableRowElement>>(null); //we can get access to the underlying Virtualizer instance and call its scrollToIndex method

    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
        [],
    );

    const [globalFilter, setGlobalFilter] = useState<string>();
    const [sorting, setSorting] = useState<MRT_SortingState>([{
        id: 'date',
        desc: true
    }]);
    const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);
    const [rowSelection, setRowSelection] = useState({});

    const [addMatchToModal, setAddMatchToModal] = useState(false);
    const [openSequenceModal, setOpenSequenceModal] = useState(false);

    {/* Don't remove this Code */ }
    const [openClientSubmissionModal, setOpenClientSubmissionModal] = useState(false);

    const selectedUserId = useRef('');
    const selectedUserOpenId = useRef('');
    {/* Don't remove this Code */ }


    const { data, fetchNextPage, isError, isFetching, isLoading, refetch } =
        useInfiniteQuery<UserApiResponse>({
            queryKey: ['table-data', columnFilters, globalFilter, sorting, selectVoiceAICandidateStatus, selectJobDivaCandidateStatus, selectVoiceAIStatus, selectJobDivaStatus],
            queryFn: async ({ pageParam }) => {
                // console.log(pageParam);
                const url = new URL(
                    'getSourcedData',
                    import.meta.env.VITE_URL_ADMIN
                    // process.env.NODE_ENV === 'production'
                    //     ? 'https://app.curately.ai'
                    //     : 'http://52.41.18.83:41088',
                );
                // url.searchParams.set('jobId', (jobId) ? jobId : "");
                // url.searchParams.set('status', statusId);
                // url.searchParams.set('clientId', userLocalData.getvalue('clientId'));

                // // url.searchParams.set('start', `${pageParam * fetchSize}`);
                // url.searchParams.set('pageSize', `${fetchSize}`);
                // url.searchParams.set('sortBy', sorting[0].desc ? 'desc' : 'asc');
                // url.searchParams.set('sort', sorting[0].id);
                // // url.searchParams.set('filters', JSON.stringify(columnFilters ?? []));
                // // url.searchParams.set('globalFilter', globalFilter ?? '');
                // // url.searchParams.set('sorting', JSON.stringify(sorting ?? []));

                // // url.searchParams.set('totalCount', '200');
                let payload = {
                    jobId: Number(jobId ? jobId : ""),
                    status: isHiringWorkFlowEnabled ? (statusId === null ? null : Number(statusId)) : null,
                    clientId: userLocalData.getvalue('clientId'),
                    size: fetchSize,
                    sortby: sorting[0].desc ? 'desc' : 'asc',
                    sort: sorting[0].id,
                    next: (pageParam as number) * fetchSize,
                    "criteriaEvaluation": masterJobData?.criteriaEvaluation ? masterJobData?.criteriaEvaluation : false,
                };

                if (isVoiceAISettingEnabled) {
                    payload = Object.assign({}, payload, {
                        ...payload,
                        voiceAiCandidateStatus: selectVoiceAICandidateStatus ? selectVoiceAICandidateStatus : "",
                        voiceAiStatusFilter: selectVoiceAIStatus ? selectVoiceAIStatus : "",
                    })
                }

                if (isJobDivaAPISettingEnabled) {
                    payload = Object.assign({}, payload, {
                        ...payload,
                        jobdivaCandidateStatus: selectJobDivaCandidateStatus ? selectJobDivaCandidateStatus : "",
                        jobdivaStatusFilter: selectJobDivaStatus ? selectJobDivaStatus : "",
                    })
                }

                const response = await fetch(url.href, {
                    method: 'POST',
                    body: JSON.stringify(payload),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const json: any = (await response.json()) as UserApiResponse;
                // let tempData = [];
                // if(json.Message === "Success"){
                //     tempData = 
                // }

                if ((Number(json?.total) > 0) || (Number(json?.total) === 0)) {
                    if (Number(json?.total) !== totalCountFromAPI) {
                        setTotalCountFromAPI(Number(json?.total));
                    }
                }
                if (json?.Success) {
                    return json;
                } else {
                    showToaster("Something went wrong", "error");
                    return { List: [] };
                }
            },
            initialPageParam: 0,
            getNextPageParam: (_lastGroup, groups) => groups.length,
            // keepPreviousData: true,
            refetchOnWindowFocus: false,
        });

    const criteriaHeadings = useMemo(() => {
        if (!!jobCriteriaData?.criteria?.length) {
            return jobCriteriaData.criteria.map((each: any) => each.match_criteria?.trim());
        } else return [];
    }, [jobCriteriaData])

    const parsedSourcedData = useMemo(() => {
        return data?.pages.flatMap((page) => page.List).map((each: any) => {
            if (each?.criteria && Parsable.isJSON(each.criteria.replace(/\\"/g, "")) && JSON.parse(each.criteria.replace(/\\"/g, ""))) {
                const criteriaData = JSON.parse(each.criteria.replace(/\\"/g, ""))?.evaluation ? JSON.parse(each.criteria.replace(/\\"/g, ""))?.evaluation : JSON.parse(each.criteria.replace(/\\"/g, ""));
                let candidateData = { ...each, candidateCriteria: criteriaData };
                let criteriaScore = 0;
                criteriaData.map((item: any) => {
                    candidateData[item.criterion.replace(/\s/g, '')] = item?.evidence ? item.evidence : "";
                    candidateData[item.criterion.replace(/\s/g, '') + "status"] = item?.status ? item.status : "";
                    candidateData[item.criterion.replace(/\s/g, '') + "headname"] = item?.criterion ? item.criterion : "";
                    // candidateData[item.criterion.replace(/\s/g, '') + "score"] = item?.score ? item.score : "";
                    candidateData[item.criterion.replace(/\s/g, '') + "score"] = (item?.score && parseFloat(item?.score)) ? parseFloat(item?.score) : 0;
                    criteriaScore = criteriaScore + parseFloat(item?.score);
                })
                candidateData.scorePercentage = (candidateData.criteriaScore && Number(candidateData.criteriaScore)) ? candidateData.criteriaScore : (criteriaScore * 100) / criteriaData.length;
                candidateData.scorePercentage = candidateData.scorePercentage ? Math.round(Number(candidateData.scorePercentage)) : "";
                return candidateData;
            } else return { ...each }
        }).map((each) => ({
            ...each,
            candidateName: each.userName,
            applicantId: each.userId
        }));
    }, [data, selectVoiceAICandidateStatus, selectJobDivaCandidateStatus, selectVoiceAIStatus, selectJobDivaStatus, jobCriteriaData]);

    const flatData = useMemo(
        () => {
            return parsedSourcedData?.filter((page) => {
                return page.userName?.toLowerCase()?.includes(searchValue?.toLowerCase() || "");
            }) ?? [];
        },
        [parsedSourcedData, searchValue],
    );

    const candidateIdsList = useMemo(() => flatData.map((each) => each.userId), [flatData])

    const getAllSourcedData = () => {

        const pageParam = 0;
        return trackPromise(
            ApiService.postWithData("admin", 'getSourcedDataAll', {
                jobId: (jobId) ? Number(jobId) : "",
                status: isHiringWorkFlowEnabled ? (statusId === null ? null : Number(statusId)) : null,
                clientId: userLocalData.getvalue('clientId'),
                // sortBy: tempSortColumn,
                // orderBy: sortType,
                sortby: sorting[0].desc ? 'desc' : 'asc',
                sort: sorting[0].id,
                start: Number(`${pageParam * fetchSize}`),
                size: Number(`${fetchSize}`),
                // userId:userLocalData.getvalue('recrId')
            }).then(
                (result: any) => {
                    if (!!result?.data?.data?.length) {
                        return result.data.data ? result.data.data : [];
                    } else {
                        showToaster("Something went wrong", "error")
                        return [];
                    }
                }
            )
        )
    }

    const handleSelectAll = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsSelectAllChecked(event.target.checked);
        if (event.target.checked) {
            // let rowData: any = {};
            // let tempData: any = flatData;
            // for (let index = 0; index < flatData.length; index++) {
            //     rowData[tempData[index].userId] = true;
            // }
            let allSourced = await getAllSourcedData();
            let rowData: any = {};
            let tempData: any = (allSourced) ? allSourced : [];
            if (!!tempData?.length) {
                tempData = [...new Set(tempData)]
                for (let index = 0; index < tempData.length; index++) {
                    if (tempData[index]?.toString().trim()) {
                        rowData[tempData[index].toString().trim()] = true;
                    }
                }
                setRowSelection(rowData);
            } else setRowSelection({});
        } else {
            setRowSelection({});
        }

    }

    const [totalCountFromAPI, setTotalCountFromAPI] = useState(totalCount);

    const totalDBRowCount = useMemo(() => totalCountFromAPI ?? 0, [totalCountFromAPI]);
    const totalFetched = useMemo(() => flatData.length, [flatData]);

    //called on scroll and possibly on mount to fetch more data as the user scrolls and reaches bottom of table
    const fetchMoreOnBottomReached = useCallback(
        (containerRefElement?: HTMLDivElement | null) => {
            if (containerRefElement) {
                const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
                //once the user has scrolled within 400px of the bottom of the table, fetch more data if we can
                if (
                    scrollHeight - scrollTop - clientHeight < 400 &&
                    !isFetching &&
                    totalFetched < totalDBRowCount
                ) {
                    fetchNextPage();
                }
            }
        },
        [fetchNextPage, isFetching, totalFetched, totalDBRowCount],
    );
    // useEffect(() => {
    //     if (flatData.length) {
    //         rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
    //     }
    //     setSelectedCandidateIds(Object.keys(rowSelection));

    // }, [rowSelection]);

    //scroll to top of table when sorting or filters change
    useEffect(() => {
        //scroll to the top of the table when the sorting changes
        try {
            rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
        } catch (error) {
            console.error(error);
        }
    }, [sorting, columnFilters, globalFilter, selectVoiceAICandidateStatus, selectJobDivaCandidateStatus, selectVoiceAIStatus, selectJobDivaStatus]);

    //a check on mount to see if the table is already scrolled to the bottom and immediately needs to fetch more data
    // useEffect(() => {
    //     fetchMoreOnBottomReached(tableContainerRef.current);
    // }, [fetchMoreOnBottomReached]);

    // console.log(Object.keys(rowSelection).length);

    const assignWorkflow = () => {
        // console.log(userId);
        console.log(flatData);
        console.log(rowSelection);
        let tempCandId = "";
        Object.entries(rowSelection).forEach(([key, value]) => {
            if (!tempCandId && value) {
                tempCandId = key;
            }
        });
        if (tempCandId) {
            let tempCandidate = flatData.find(i => { return Number(i.userId) === Number(tempCandId) });
            let tempCandidateName = (tempCandidate && tempCandidate.userName) ? tempCandidate.userName : "";
            let data = {
                "workflowId": masterJobData?.workflowDetails?.workflowid,
                "jobId": jobId,
                "recrId": userLocalData.getvalue('recrId'),
                "candId": tempCandId,
                "candName": tempCandidateName,
                "clientId": userLocalData.getvalue('clientId')
            }

            // Curately\Workflow\workflow_assigncandidates.jsp
            // '233seq', 'DemoAutomation/assignCandidates'

            trackPromise(
                ApiService.getByParams(193, 'Curately/Workflow/workflow_assigncandidates.jsp', data).then((response: any) => {
                    // ApiService.postWithData('233seq', 'DemoAutomation/workFlowAssignCandidateClient', data).then((response: any) => {
                    // console.log(response.data);
                    if (response.data.Success && response.data.token) {
                        if (window.location.protocol === "http:") {
                            window.open(`http://localhost:3000/#/stages/${response.data.token.trim()}`);
                        } else {
                            window.open(`${window.location.origin}/workflow/#/stages/${response.data.token.trim()}`);
                        }
                    } else {
                        // showToaster((response.data.Error) ? response.data.Error : "", 'error');
                    }
                })
                    .catch((error) => {
                        console.error('Error fetching Sourced Count:', error);
                    })
            )
        }
    }

    const assignCriteria = (userIds: number[]) => {
        //  let tempCandId = [];
        // Object.entries(rowSelection).forEach(([key, value]) => {
        //     if (!tempCandId && value) {
        //         tempCandId = key;
        //     }
        // });

        //  tempCandId = Object.keys(rowSelection);
        if (userIds.length) {
            let data = {
                "jobId": jobId,
                "recrId": userLocalData.getvalue('recrId'),
                "userIds": userIds,
                "clientId": userLocalData.getvalue('clientId')
            }

            // https://qaadminapi.curately.ai/curatelyAdmin/saveOrUpdateCriteriaEvaluationUser
            trackPromise(
                ApiService.postWithData('admin', 'saveOrUpdateCriteriaEvaluationUser', data).then((response: any) => {
                    if (response.data.Success) {
                        showToaster('User Criteria Created Successfully', 'success');
                        refetch();
                        setRowSelection({});
                    } else {
                        showToaster((response.data.Message) ? response.data.Message : "Error creating User Criteria.", 'error');
                    }
                })
                    .catch((error) => {
                        console.error('Error fetching Sourced Count:', error);
                    })
            )
        }
    }
    ///publishSourcedToJobdiva


    const publishApplicantToAvionte = () => {

        let bodyRequest = {
            "atsName": "Avionte",
            "clientId": userLocalData.getvalue('clientId'),
            "recruiterId": userLocalData.getvalue('recrId'),
            "moduleName": "Sourced",
            "curatelyIds": selectedOpenIds.map((each) => each.openId),
        }

        // const keysWithTrueValue = Object.keys(applicantsRowSelection).filter(id => Boolean(applicantsRowSelection[id]));
        // if (keysWithTrueValue.length === 1) {
        // https://adminapi.cxninja.com/bullhorn-service-dev/job/%7BclientId%7D/%7BjobId%7D
        ApiService.postWithData('ats', `ats/post`, bodyRequest).then((response) => {

            if (response.data.Success) {
                showToaster(`Applicant is Publshed successfully`, 'success');
                setRowSelection({});
            } else {
                showToaster((response.data.Message) ? response.data.Message : "Unable to Publish Applicant to Avionte", 'error');
            }
        }).catch(error => {
            showToaster(error.message ? error.message : "Unable to Publish Applicant to Avionte", 'error');
        });

    }

    const publishSourcedToJobdiva = () => {
        // const openIds = getUserOpenId()

        let bodyRequest = {
            "atsName": "Jobdiva",
            "clientId": userLocalData.getvalue('clientId'),
            "recruiterId": userLocalData.getvalue('recrId'),
            "moduleName": "Sourced",
            "curatelyIds": selectedOpenIds.map((each) => each.openId),
        }

        ApiService.postWithData('ats', `ats/post`, bodyRequest).then((response) => {

            if (response.data.Success) {
                showToaster(`Job is Publshed successfully`, 'success');
                setRowSelection({});
            } else {
                showToaster((response.data.Message) ? response.data.Message : "Unable to Publish Job to Jobdiva", 'error');
            }
        }).catch(error => {
            showToaster(error.message ? error.message : "Unable to Publish Job to Jobdiva", 'error');
        });

    }


    const publishSourcedToBullhorn = () => {
        // const openIds = getUserOpenId()

        let bodyRequest = {
            "atsName": "Bullhorn",
            "clientId": userLocalData.getvalue('clientId'),
            "recruiterId": userLocalData.getvalue('recrId'),
            "moduleName": "Sourced",
            "curatelyIds": selectedOpenIds.map((each) => each.openId),
        }


        ApiService.postWithData('ats', `ats/post`, bodyRequest).then((response) => {

            if (response.data.Success) {
                showToaster(`Job is Publshed successfully`, 'success');
                setRowSelection({});
            } else {
                showToaster((response.data.Message) ? response.data.Message : "Unable to Publish Job to BullHorn", 'error');
            }
        }).catch(error => {
            showToaster(error.message ? error.message : "Unable to Publish Job to BullHorn", 'error');
        });

    }



    const handleVoiceAIClick = () => {
        // const userOpenIds = getUserOpenId()

        let userIds = Object.entries(rowSelection)
            .filter(([key, value]) => value === true)
            .map(([key, value]) => parseInt(key));
        if (!!userIds?.length) {
            let data = {
                "jobId": jobId,
                "type": "shortList",
                "recrId": userLocalData.getvalue('recrId'),
                "candidates": selectedOpenIds,
                "clientId": userLocalData.getvalue('clientId')
            }

            //  https://adminapi.cxninja.com/voice-ai-prod/candidates/submitCandidates
            trackPromise(
                ApiService.postWithData('voiceai', 'candidates/submitCandidates', data).then((response: any) => {
                    let errorResponse = ""; let successResponse = "";
                    if (response.data.Success) {
                        showToaster((response.data.Message) ? response.data.Message : 'User Voice AI Created Successfully', 'success');
                        setRowSelection({});
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
                                    setRowSelection({});
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
                                setRowSelection({});
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


    const [selectedOpenIds, setSelectedOpenIds] = useState<{ openId: string | number, userId: string | number }[]>([]);

    useEffect(() => {
        let userIds = Object.keys(rowSelection);
        let openIds: any[] = [];
        if (!!userIds?.length) {
            userIds.forEach((userId) => {
                openIds.push({
                    openId: flatData.find((each) => userId.toString() === each.userId.toString())?.openId || 0,
                    userId,
                })
            });
            setSelectedOpenIds(openIds);
        } else setSelectedOpenIds([]);
    }, [rowSelection])



    // const getUserOpenId = () => {
    //     let userIds = Object.keys(rowSelection);
    //     let openIds: any[] = [];
    //     if (!!userIds?.length) {
    //         userIds.forEach((userId) => {
    //             openIds.push({
    //                 openId: flatData.find((each) => userId.toString() === each.userId.toString())?.openId || 0,
    //                 userId,
    //             })
    //         });
    //         return openIds;
    //     } else return [];
    // }

    const handleClickAddToSequenceListen = (
        event: MouseEvent<HTMLButtonElement>
    ) => {

        setAddToSequenceListAnchorEl(event.currentTarget);
        setOpenSequenceModal(true)
    };

    const handleEvaluationCriteriaClick = () => {
        if (!!jobCriteriaData?.criteria?.length) {
            const validatedRowSelection = Object.entries(rowSelection).filter(([key, value]) => value === true);
            if (!!validatedRowSelection?.length) {
                let userIds = validatedRowSelection.map(([key, value]) => parseInt(key));
                assignCriteria(userIds);
            } else showToaster("Please selet the sourced candidates to assign evaluation criteria", "error");
        } else {
            addCriteria();
        }
    }

    const handleReRunClick = async () => {
        if (!!Object.keys(rowSelection)?.length) {
            let userIds = Object.entries(rowSelection)
                .filter(([key, value]) => value === true)
                .map(([key, value]) => parseInt(key));
            let data = await loadRerunCriteria(userIds);
            data && refetch();
        } else {
            let data = await loadRerunCriteria();
            data && refetch();
        }
    }
    const [moreAchorEl, setMoreAchorEl] = React.useState<null | HTMLElement>(null);
    const moreButtonOpen = Boolean(moreAchorEl);
    const openMoreMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setMoreAchorEl(event.currentTarget);
    };
    const closeMoreMenu = () => {
        setMoreAchorEl(null);
    };


    const columnVisibility = useMemo(() => {
        const validatedColumns = [
            { accessorKey: "bulhornId", header: "Bullhorn", isEnabled: isBullHornSettingEnabled ? true : false },
            { accessorKey: "voiceAiId", header: "Voice AI", isEnabled: isVoiceAISettingEnabled ? true : false },
            { accessorKey: "voiceAiCandidateStatus", header: "VoiceAI Status", isEnabled: isVoiceAISettingEnabled ? true : false },
            { accessorKey: "aviontId", header: "Aviont", isEnabled: isAvionteAPISettingEnabled ? true : false },
            { accessorKey: "jobdivaId", header: "JobDiva", isEnabled: isJobDivaAPISettingEnabled ? true : false },
            { accessorKey: "jobdivaCandidateStatus", header: "JobDiva Status", isEnabled: isJobDivaAPISettingEnabled ? true : false },
            { accessorKey: "Actions", header: "Quick Actions", isEnabled: isQuickActionsEnabled ? true : false },
            { accessorKey: "status", header: "Status Name", isEnabled: (statusId !== null) || isVoiceAIAndNotHiringWorkflowEnabled ? false : true },
            { accessorKey: "modifyDate", header: "Last Action", isEnabled: isVoiceAIAndNotHiringWorkflowEnabled ? false : true },


        ]
        let visibleColumns: any = {};

        columns.forEach((column) => {
            let validatedColumn = validatedColumns.find((each) => each.accessorKey === column.accessorKey) || null;
            if (validatedColumn) {
                visibleColumns[column.accessorKey as string] = validatedColumn?.isEnabled;
            } else {
                visibleColumns[column.accessorKey as string] = true;
            }
        })
        return visibleColumns;
    }, [columns]);

    return (
        <>
            {jobCriteriaData?.rerun &&
                <Stack className='rerun-container' bgcolor={"white"} direction={"row"} alignItems={"center"} gap={1} pb={3}>
                    <Typography>Your search evaluation criteria may have changed since running this job.</Typography>
                    <Button disableElevation disableRipple onClick={() => handleReRunClick()}>Re-run to see new results</Button>
                </Stack >}

            <Grid container mt={jobCriteriaData?.rerun ? 3.5 : 0} alignItems={"center"} className="actionItems" width={"auto"} columnSpacing={1}>
                <Checkbox
                    className="select-all-checkbox"
                    disableRipple
                    color="default"
                    checked={isSelectAllChecked}
                    onChange={handleSelectAll}
                />
                <ButtonGroup variant="outlined" className='quickActionButtonGroup' >
                    {
                        isBulkEmailSettingEnabled ?
                            <Tooltip title="Blast Email">
                                <Button variant="outlined" color="secondary" disabled={Object.keys(rowSelection).length > 0 ? false : true} onClick={handleBlastEmail} startIcon={<MailOutlineOutlinedIcon />} />
                            </Tooltip>
                            :
                            null
                    }
                    {
                        isEmailSMSSettingEnabled && !userLocalData.isChromeExtensionEnabled() ?
                            <Tooltip title="SMS">
                                <Button variant="outlined" color="secondary" disabled={Object.keys(rowSelection).length > 0 ? false : true} onClick={handleBlastSMS} startIcon={<CallOutlinedIcon />} />
                            </Tooltip>
                            :
                            null
                    }

                    {isCampaignsEnabled ? <Tooltip title="Campaign">
                        <Button variant="outlined" color="secondary"
                            disabled={Object.keys(rowSelection).length > 0 ? false : true}
                            onClick={handleClickAddToSequenceListen}
                            startIcon={<SendOutlinedIcon />}
                            // id='addsequencelistmenu'
                            aria-controls={openAddToSequenceListenBtn ? "addsequencelistmenu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={openAddToSequenceListenBtn ? "true" : undefined}
                        // endIcon={<ArrowDropDownIcon />}
                        />
                    </Tooltip> : null}
                    {
                        isEvaluteSettingEnabled ? <Tooltip title="Evaluate">
                            {/* masterJobData?.criteriaEvaluation && */}
                            <Button
                                variant="outlined"
                                color="secondary"
                                // disabled={Object.keys(rowSelection).length === 1 ? false : true}
                                onClick={handleEvaluationCriteriaClick}
                                startIcon={<FactCheckOutlinedIcon />}
                            />
                        </Tooltip>
                            : null
                    }
                    {(isHiringWorkFlowEnabled || (isVoiceAISettingEnabled && masterJobData?.voiceai) || isBullHornSettingEnabled) ? <Tooltip title="More">
                        <Button
                            id="moreOptions-button"
                            aria-controls={moreButtonOpen ? 'moreOptions-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={moreButtonOpen ? 'true' : undefined}
                            onClick={openMoreMenu}
                            variant="outlined" color="secondary"
                            disabled={Object.keys(rowSelection).length > 0 ? false : true}
                            startIcon={<MoreHorizIcon />}
                        />
                    </Tooltip> : null
                    }
                </ButtonGroup>

                <Menu
                    id="moreOptions-menu"
                    anchorEl={moreAchorEl}
                    open={moreButtonOpen}
                    onClose={closeMoreMenu}
                    MenuListProps={{
                        'aria-labelledby': 'moreOptions-button',
                    }}
                >
                    {isVoiceAISettingEnabled && masterJobData?.voiceai && <MenuItem onClick={() => { closeMoreMenu(); handleVoiceAIClick(); }} disabled={
                        ((Object.keys(rowSelection).length > 0) ? false : true) || (["pause", "complete"].includes(masterJobData?.voiceaiCaseStatus) ? true : false)
                    }> Voice AI</MenuItem>}
                    {isBullHornSettingEnabled && <MenuItem onClick={() => { closeMoreMenu(); publishSourcedToBullhorn(); }}>Bullhorn</MenuItem>}
                    {/* {isJobDivaAPISettingEnabled && <MenuItem onClick={() => { closeMoreMenu(); publishSourcedToJobdiva(); }}>Job Diva</MenuItem>} */}
                    {/* {isAvionteAPISettingEnabled && <MenuItem onClick={() => { closeMoreMenu(); publishApplicantToAvionte(); }}>Avionte</MenuItem>} */}
                    {isHiringWorkFlowEnabled && <MenuItem onClick={() => { closeMoreMenu(); setAddMatchToModal(true) }}>Match to other Job</MenuItem>}

                </Menu>

                {
                    userLocalData.adminSettings(ID_SETTINGS_WORKFLOW) && masterJobData?.workflowDetails?.workflowid ?
                        <Button
                            variant="outlined"
                            color="secondary"
                            disabled={Object.keys(rowSelection).length === 1 ? false : true}
                            onClick={assignWorkflow}
                        >
                            Assign to  Workflow
                        </Button>
                        :
                        null
                }
                {isHiringWorkFlowEnabled ? <Suspense fallback={<CircularProgress className="centered" />} ><Invite selectedRows={rowSelection} openIds={selectedOpenIds} /></Suspense> : null}
                {isVoiceAISettingEnabled ?
                    <Stack direction={"row"} alignItems={"center"} spacing={1}>
                        {/* <TextField
                            fullWidth
                            select
                            label="VoiceAI Candidate Status"
                            // className="ml-4"
                            size="small"
                            color="info"
                            value={selectVoiceAICandidateStatus}
                            onChange={(e: any) => {
                                setSelectVoiceAICandidateStatus(e.target.value)
                            }}
                            slotProps={{
                                inputLabel: {
                                    shrink: ["", null, undefined].includes(selectVoiceAICandidateStatus) ? false : true
                                }
                            }}
                            sx={{
                                '& .MuiInputBase-root': {
                                    maxWidth: "15rem",
                                    minWidth: "10rem",
                                    height: "30px",
                                    marginTop: "2.5px",
                                    marginRight: "3px",
                                },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    height: "35px",
                                    top: "-6.5px",
                                },
                                "& label": {
                                    fontWeight: "500",
                                    fontSize: "0.875rem",
                                    color: "var(--variant-outlinedColor)"
                                }
                            }}
                            placeholder="Voice AI Candidate Status"
                        >
                            <MenuItem value="">All</MenuItem>
                            {voiceAICandidateStatusList && voiceAICandidateStatusList.map((each: any, index: number) => (
                                <MenuItem key={index} value={each.value}>{each.label}</MenuItem>
                            ))}
                        </TextField> */}
                    </Stack>
                    : null
                }

                {/* {
                    masterJobData?.voiceai &&
                    <Button
                        variant="outlined"
                        color="secondary"
                        className="mr-2"
                        disabled={(Object.keys(rowSelection).length > 0) ? false : true}
                      //  onClick={handleVoiceAIClick}
                    >
                        Voice AI
                    </Button>
                } */}
                {(isEvaluteSettingEnabled && !!jobCriteriaData?.criteria?.length) ?
                    <Button variant='outlined' color='secondary' onClick={() => setViewEvaluationDrawer(true)}>View Criteria</Button>
                    : null}
            </Grid>
            <Grid className="actionRightItems" >
                <Stack className="customSorting" direction="row">
                    <Button
                        variant="outlined"
                        startIcon={
                            <>
                                {/* <SouthRoundedIcon className={sortType === "asc" ? 'flip' : ''} /> */}
                                <SouthRoundedIcon fontSize="small" sx={{ width: "1rem", height: "1rem" }} className={sorting.length > 0 && !sorting[0].desc ? 'flip' : ''} />
                                <MenuIcon fontSize="small" sx={{ width: "1rem", height: "1rem" }} />
                            </>
                        }
                        endIcon={<ArrowDropDownIcon />}
                        onClick={handleSortClick}
                        sx={{ width: '120px', mr: 2, ml: 'auto', padding: "3px", height: "30px", marginRight: "5px", marginTop: "15px", textTransform: "capitalize" }}
                    >
                        {sortColumn === "" ? 'Sort By' : sortColumn}
                    </Button>
                    <Popover
                        id={sortId}
                        open={sortOpen}
                        anchorEl={sortAnchorEl}
                        onClose={handleSortClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <Box sx={{ p: 2, width: '200px' }}>
                            <FormControl fullWidth className="mb-2">
                                <label>Sort by...</label>
                                <Select
                                    id="sortColumn"
                                    size="small"
                                    value={sortColumn}
                                    onChange={(e) => setSortColumn(e.target.value)}
                                    className="sortingPopoverSelect"
                                >
                                    <MenuItem value={'Name'}>Name</MenuItem>
                                    <MenuItem value={'Date'}>Date</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth className="mb-2">
                                <Select
                                    id="sortType"
                                    size="small"
                                    value={sortType}
                                    onChange={(e) => setSortType(e.target.value)}
                                    className="sortingPopoverSelect"
                                >
                                    {/* <MenuItem value={'name'}>Ascending</MenuItem> */}
                                    <MenuItem value={'asc'}>Ascending</MenuItem>
                                    <MenuItem value={'desc'}>Descending</MenuItem>
                                </Select>
                            </FormControl>
                            <Button
                                color="primary"
                                sx={{
                                    width: '100% !important', height: '32px !important', textTransform: "capitalize", backgroundColor: "var(--c-primary-color)", fontWeight: 700, fontSize: "14px", fontFamily: "Segoe UI",
                                    color: "#ffffff", whiteSpace: "nowrap", boxShadow: "0", "&:hover": {
                                        backgroundColor: "#0852C2",
                                        color: "#ffffff", boxShadow: "0",
                                    },
                                }}
                                onClick={() => {
                                    setSorting([{
                                        desc: sortType === "desc" ? true : false,
                                        id: sortColumn?.toLowerCase() || "Date"
                                    }]);
                                    handleSortClose();
                                }
                                }
                            >
                                Apply
                            </Button>
                        </Box>
                    </Popover>

                    <Tooltip title='Refresh'>
                        <IconButton
                            sx={{ mt: 1.25 }}
                            // className='ml-4'
                            color="primary" onClick={
                                async () => {
                                    setRowSelection({});
                                    refetch();
                                }
                            }><RefreshIcon /></IconButton>
                    </Tooltip>
                </Stack>
            </Grid>
            <MaterialReactTable
                columns={columns as MRT_ColumnDef<any, any>[]}
                data={flatData}
                enablePagination={false}
                // enableRowNumbers
                enableRowSelection
                // enableRowVirtualization //optional, but recommended if it is likely going to be more than 100 rows
                manualFiltering
                manualSorting
                enableStickyHeader
                muiTableContainerProps={{
                    ref: tableContainerRef, //get access to the table container element
                    sx: { maxHeight: '600px' }, //give the table a max height
                    onScroll: (
                        event: UIEvent<HTMLDivElement>, //add an event listener to the table container element
                    ) => fetchMoreOnBottomReached(event.target as HTMLDivElement),
                }}
                muiToolbarAlertBannerProps={
                    isError
                        ? {
                            color: 'error',
                            children: 'Error loading data',
                        }
                        : undefined
                }
                muiSearchTextFieldProps={{
                    placeholder: `Search`,
                    size: "small",
                    // sx: { width: '100px', right: "225px", marginTop: "-8px", marginRight: "-40px" },
                    value: searchValue,
                    onChange: (e: any) => { setSearchValue(e.target.value) },
                    InputProps: {
                        startAdornment: <InputAdornment position="start"><SearchOutlined fontSize='small' htmlColor='#757575' /></InputAdornment>,
                        endAdornment: <InputAdornment position="end" disablePointerEvents={searchValue ? false : true}>
                            <CloseRounded fontSize='small' htmlColor={searchValue ? "#757575" : "#ebebeb"} sx={{ cursor: "pointer" }} onClick={() => setSearchValue("")} />
                        </InputAdornment>
                    },
                    className: "sourceSearchName"
                }}
                initialState={{
                    density: 'compact',
                    showGlobalFilter: true,
                    // columnOrder: [
                    //     'mrt-row-select', // move the built-in selection column 
                    // ],

                }}
                onColumnFiltersChange={setColumnFilters}
                onGlobalFilterChange={setGlobalFilter}
                onSortingChange={setSorting}
                renderBottomToolbarCustomActions={() => (
                    <Typography>
                        {totalFetched} of {totalDBRowCount}
                        {/* Fetched {totalFetched} of {totalDBRowCount} total rows. */}
                    </Typography>
                )}
                state={{
                    columnFilters,
                    globalFilter,
                    isLoading,
                    showAlertBanner: isError,
                    showProgressBars: isFetching,
                    sorting,
                    rowSelection,
                    columnVisibility,
                    columnPinning: { left: ["mrt-row-select", "userName"] }
                }}
                onRowSelectionChange={setRowSelection}
                rowVirtualizerInstanceRef={rowVirtualizerInstanceRef} //get access to the virtualizer instance
                rowVirtualizerOptions={{ overscan: 4 }}
                getRowId={(row) => row.userId}
                icons={{
                    ArrowDownwardIcon: (props: any) => <SwitchLeftIcon  {...props} />
                }}
                muiSelectCheckboxProps={(prop) => ({
                    onChange: (e) => {
                        if (prop.row.id) {
                            let tempRowSelection: any = { ...rowSelection };
                            if (e.target.checked) {
                                tempRowSelection[prop.row.id] = e.target.checked;
                            } else {
                                if (tempRowSelection.hasOwnProperty(prop.row.id)) {
                                    delete tempRowSelection[prop.row.id];
                                }
                            }
                            setRowSelection(tempRowSelection);
                            //  setRowSelection({ ...rowSelection, [prop.row.id]: e.target.checked });
                            console.log(e.target.checked);
                        }
                    }
                })}
                positionExpandColumn={(isEvaluteSettingEnabled && masterJobData?.criteriaEvaluation) ? "last" : undefined}
                renderDetailPanel={(isEvaluteSettingEnabled && masterJobData?.criteriaEvaluation) ? ({ row }) => {
                    const isExpanded = row.getIsExpanded()
                    if (!!jobCriteriaData?.criteria?.length && !!row?.original?.candidateCriteria?.length) {
                        return isExpanded ? <ExpandDetails headingList={criteriaHeadings} candidateData={row.original} /> : <></>
                    }
                    else return undefined;
                } : undefined}
                muiDetailPanelProps={{ colSpan: columns.length + 2 }}
                muiExpandButtonProps={({ row, table }) => ({
                    onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }), //set only this row to be expanded
                })}
                muiExpandAllButtonProps={() => ({ className: "d-none" })}
            />



            {
                addMatchToModal ?
                    <Suspense fallback={<CircularProgress className="centered" />} >
                        <AddMatchToModal
                            dialogOpen={addMatchToModal}
                            closePopup={() => setAddMatchToModal(false)}
                            candidateId={Object.keys(rowSelection).map(n => Number(n))}
                            moveToVoiceAI={false}
                        />
                    </Suspense>
                    :
                    null
            }

            {/* {
                (addMatchToModal) ?
                    <CloneToOtherJob
                        open={addMatchToModal}
                        closePopup={() => setAddMatchToModal(false)}
                        jobId={jobId}
                        userIds={Object.keys(rowSelection)}

                    />
                    :
                    null
            } */}
            {/* {
                (openSequenceModal) ?//
                    <Sequence
                        open={openSequenceModal}
                        closePopup={() => setOpenSequenceModal(false)}
                        selectedCandidateIds={selectedCandidateIds}
                    />
                    :
                    null
            } */}

            <Menu
                id='addsequencelistmenu'
                anchorEl={addtosequencelistanchorEl}
                open={openSequenceModal}
                onClose={handleProfileMenuClose}
                MenuListProps={{
                    "aria-labelledby": 'add-sequencelist-btn',
                }}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                PaperProps={{
                    style: {
                        overflow: "visible",
                        maxHeight: '80vh',
                        resize: 'vertical'
                    },
                }}
                sx={{
                    boxShadow: "0px",
                    "& .MuiList-root.MuiMenu-list": {
                        pt: "8px",
                        pb: "15px",
                        pr: "10px",
                        pl: "10px",
                    },
                }}
            >

                <MUIAutoComplete
                    id='sequenceId1'
                    handleChange={(id: any, name: string) => {
                        setSelectedSequence({ id, name });
                        addToTopSequenceList(id, name);
                    }}
                    valuePassed={
                        (selectedSequence.id) ? { label: selectedSequence.name, id: selectedSequence.id } :
                            {}
                    }
                    existingSequenceIds={menuData?.sequenceIds}
                    isMultiple={false}
                    textToShow="Select Campaign"
                    width="250px"
                    type='sequence'
                    placeholder="Select Campaign"
                />

            </Menu>
            {
                (openClientSubmissionModal) ?
                    <Suspense fallback={<CircularProgress className="centered" />} >
                        <ClientSubmission
                            open={openClientSubmissionModal}
                            closePopup={() => setOpenClientSubmissionModal(false)}
                            userId={selectedUserId.current}
                            openId={selectedUserOpenId.current}
                            jobId={(jobId) ? jobId : ""}
                            refreshSourcedData={refreshSourcedData}
                        />
                    </Suspense>
                    :
                    null
            }
            {/* Don't remove this Code */}
            <Menu
                id={`mail-${menuData.rowId}`}
                anchorEl={TableMailOpen}
                open={openTableMail && selectedRowId === `${menuData.rowId}`}
                onClose={handleTableClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                MenuListProps={{
                    "aria-labelledby": `mailbutton-${menuData.rowId}`,
                }}
                sx={{
                    "& .MuiPaper-root.MuiMenu-paper.MuiPopover-paper": {
                        minWidth: "250px",
                    },
                }}
            >
                <Stack sx={{ p: 1.5 }}>
                    <Stack
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            mb: 0.5,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "16px",
                                fontFamily: "Segoe UI",
                                fontWeight: 600,
                                color: "#1A1A1A",
                            }}
                        >
                            {menuData.email}
                        </Typography>
                        <ContentCopyRoundedIcon
                            onClick={() => { Copy.text(`${menuData.email}`, 'Email'); setTableOpenMail(null); }}
                            sx={{
                                color: "#737373",
                                fontSize: "20px",
                                pl: 0.5,
                                cursor: "pointer",
                            }}
                        />
                    </Stack>

                    <Typography
                        sx={{
                            fontSize: "14px",
                            fontFamily: "Segoe UI",
                            fontWeight: 600,
                            color: "#1DB268",
                            mb: 0.5,
                        }}
                    >
                        Email is Verified
                    </Typography>

                    <Stack
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            mb: 0.5,
                        }}
                        direction="row"
                        spacing={1}
                    >
                        <Typography
                            sx={{
                                fontSize: "14px",
                                fontFamily: "Segoe UI",
                                fontWeight: 400,
                                color: "#1A1A1A",
                            }}
                        >
                            Business
                        </Typography>

                        <Box
                            sx={{
                                height: "6px",
                                width: "6px",
                                backgroundColor: "#cacccc",
                                borderRadius: "50%",
                            }}
                        ></Box>

                        <Typography
                            sx={{
                                fontSize: "14px",
                                fontFamily: "Segoe UI",
                                fontWeight: 400,
                                color: "#1A1A1A",
                            }}
                        >
                            Primary
                        </Typography>
                    </Stack>

                    <Stack
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        {
                            isEmailSMSSettingEnabled ?
                                <Button
                                    color="primary"
                                    variant="contained"
                                    id={menuData.email}
                                    disableRipple
                                    onClick={() => {
                                        handleTableMenuSendMailOpen(menuData.email);
                                    }}
                                >
                                    Send Email
                                </Button>
                                :
                                null
                        }
                    </Stack>
                </Stack>
            </Menu>
            {
                dialogStatus && (
                    <EmailDialogBox
                        dialogOpen={dialogStatus}
                        onClose={() => {
                            setRowSelection({});
                            setDialogStatus(false);
                        }}
                        name={menuData.first?.toLowerCase() || ""}
                        emailId={emailOnClicked}
                        candidateId={menuData.candId}
                        jobId={jobId}
                    />
                )
            }
            {`${USPhoneFormat.get(menuData.phoneno)}` ?
                <Menu
                    id={`phone-${menuData.rowId}`}
                    anchorEl={callAnchorElement}
                    open={openCallMenu && selectedRowId === `${menuData.rowId}`}
                    onClose={handleTableClose}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                    }}
                    MenuListProps={{
                        "aria-labelledby": `phonebutton-${menuData.rowId}`,
                    }}
                    sx={{
                        "& .MuiPaper-root.MuiMenu-paper.MuiPopover-paper": {
                            minWidth: "250px",
                        },
                    }}
                >
                    <Stack sx={{ mb: 1, p: 1 }}>
                        <Typography
                            sx={{
                                fontSize: "12px",
                                fontFamily: "Segoe UI",
                                fontWeight: 400,
                                color: "#1A1A1A",
                            }}
                        >
                            Mobile Number
                        </Typography>
                        <Box
                            component="div"
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                mb: 1.5,
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    fontFamily: "Segoe UI",
                                    fontWeight: 600,
                                    color: "#1A1A1A",
                                }}
                            >
                                {menuData.phoneno ? `${menuData.phoneno}` : ""}
                            </Typography>
                            <ContentCopyRoundedIcon
                                sx={{
                                    color: "#737373",
                                    fontSize: "20px",
                                    pl: 0.5,
                                    cursor: "",
                                }}
                                onClick={() => { Copy.text(`${menuData.phoneno}`, 'Phone Number'); setCallAnchorElement(null); }}
                            />
                        </Box>
                        {!userLocalData.isChromeExtensionEnabled() ? <Button
                            variant="contained"
                            disableRipple
                            onClick={() => {
                                setPhoneOnClicked(menuData.phoneno);
                                setDialogPhoneStatus(true);
                                setCallAnchorElement(null);
                            }}
                            sx={{
                                textTransform: "capitalize",
                                backgroundColor: "var(--c-primary-color)",
                                fontWeight: 700,
                                fontSize: "14px",
                                fontFamily: "Segoe UI",
                                color: "#ffffff",
                                height: "32px",
                                width: "45%",
                                whiteSpace: "nowrap",
                                boxShadow: "0",
                                "&:hover": {
                                    backgroundColor: "#0852C2",
                                    color: "#ffffff",
                                    boxShadow: "0",
                                },
                            }}
                            startIcon={<CallOutlinedIcon />}
                        >
                            SMS
                        </Button> : null
                        }


                    </Stack>
                </Menu>
                :
                null
            }

            {
                dialogPhoneStatus ? (
                    <PhoneDialog
                        dialogOpen={dialogPhoneStatus}
                        onClose={() => {
                            setRowSelection({});
                            setDialogPhoneStatus(false);
                        }}
                        name={menuData.first?.toLowerCase() || ""}
                        toPhone={phoneOnClicked}
                        candidateId={menuData.candId}
                        jobId={jobId}
                    />
                ) : null
            }

            {
                addEmail && <EmailDialogBox
                    dialogOpen={addEmail}
                    onClose={() => {
                        setRowSelection({});
                        setAddEmail(false);
                    }}
                    name={selectedName}
                    emailId={selectedEmail}
                    isBulkEmail={isBulkEmail}
                    candidateId={selectCandidList.toString()}
                    jobId={jobId}
                />
            }

            {
                addSMS && (
                    <PhoneDialog
                        dialogOpen={addSMS}
                        onClose={() => {
                            setRowSelection({});
                            setAddSMS(false);
                        }}
                        name={selectedName}
                        toPhone={selectedSMS}
                        candidateId={selectCandidList.toString()}
                        isBulkSMS={isBulkSMS}
                        jobId={jobId}
                    //jobId={menuData.jobId}
                    />

                )
            }
            {
                viewCandidate ?
                    <Suspense fallback={<CircularProgress className="centered" />} >
                        <ViewCandidateModal candidateId={viewCandidateId.current} closePopup={() => {
                            setViewCandidate(false);
                            setAllSourcedIds([]);
                        }} jobId={jobId ? jobId : ""} open={viewCandidate} candidateIdsList={allSourcedIds} />
                    </Suspense>
                    :
                    null
            }
            {
                viewVoiceAIStatus ?
                    <Suspense fallback={<CircularProgress className="centered" />} >
                        <ViewVoiceAICandidateModal candidateId={viewCandidateId.current} closePopup={() => {
                            setViewVoiceAIStatus(false);
                            setViewVoiceAIHTML("");
                        }}
                            open={viewVoiceAIStatus} candidateViewScreening={viewVoiceAIHTML} />
                    </Suspense>
                    :
                    null
            }

            {
                viewEvaluationDrawer ?
                    <Suspense fallback={<CircularProgress className="centered" />} >
                        <EvaluateApplicantsDrawer
                            open={viewEvaluationDrawer}
                            closeDrawer={() => setViewEvaluationDrawer(false)}
                            applicantsData={flatData}
                            refetch={refetch}
                            openCandidateView={openCandidateView}
                            isEvaluteSettingEnabled={isEvaluteSettingEnabled}
                            jobCriteriaData={jobCriteriaData}
                            criteriaHeadings={criteriaHeadings}
                            masterJobData={masterJobData}
                            totalDBRowCount={totalDBRowCount}
                            fetchMoreOnBottomReached={fetchMoreOnBottomReached}
                            assignCriteria={assignCriteria}
                            isLoading={isFetching}
                        />
                    </Suspense>
                    : null
            }


        </>
    );
};



const queryClient = new QueryClient();

const VirtualScrollSourced = (
    { status, statusId, totalCount, masterJobData, refreshSourcedData, jobCriteriaData, addCriteria, loadRerunCriteria }

        :
        { status: string; statusId: any, totalCount: number, masterJobData: any; refreshSourcedData: () => void; jobCriteriaData: any, addCriteria: { (): void }, loadRerunCriteria: { (userIds?: any[]): void } }
) => (
    <QueryClientProvider client={queryClient}>
        <VirtualData status={status} statusId={statusId} totalCount={totalCount} masterJobData={masterJobData} refreshSourcedData={refreshSourcedData} jobCriteriaData={jobCriteriaData} addCriteria={addCriteria} loadRerunCriteria={loadRerunCriteria} />
    </QueryClientProvider>
);

export default VirtualScrollSourced;

