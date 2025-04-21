import React, {
    UIEvent,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import {
    MaterialReactTable,
    type MRT_ColumnDef,
    type MRT_ColumnFiltersState,
    type MRT_SortingState,
    type MRT_RowVirtualizer,
} from 'material-react-table';
import { Typography } from '../../../../../shared/modules/MaterialImports/Typography';
import {
    QueryClient,
    QueryClientProvider,
    useInfiniteQuery,
} from '@tanstack/react-query';
import { DateTime } from 'luxon';
// import { useParams } from 'react-router-dom';
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
import { Checkbox, Select } from "../../../../../shared/modules/MaterialImports/FormElements";

import { Grid, Button, InputAdornment, FormControl, IconButton, showToaster, TextField } from '../../../../../shared/modules/commonImports';
import { userLocalData } from '../../../../../shared/services/userData';
import EmailDialogBox from '../../../../shared/EmailDialogBox/EmailDialogBox';
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Popover } from '../../../../../shared/modules/MaterialImports/Popover';
import USPhoneFormat from '../../../../../shared/utils/USPhoneFormat';
// import CircularProgress from '@mui/material/CircularProgress';
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from "../../../../../shared/modules/MaterialImports/Box";
import { Stack } from "../../../../../shared/modules/MaterialImports/Stack";
import SouthRoundedIcon from '@mui/icons-material/SouthRounded';
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import { CircularProgress } from '../../../../../shared/modules/MaterialImports/CircularProgress';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ApiService from '../../../../../shared/api/api';
import { trackPromise } from '../../../../../shared/modules/PromiseTrackter';
import PhoneDialog from "../../../../shared/PhoneDialog/PhoneDialog";
import QuestionMarkRoundedIcon from "@mui/icons-material/QuestionMarkRounded";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import { Tooltip } from "../../../../../shared/modules/MaterialImports/ToolTip";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { ButtonGroup } from "../../../../../shared/modules/MaterialImports/ButtonGroup";
import { Menu, MenuItem } from "../../../../../shared/modules/MaterialImports/Menu";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import ViewCandidateModal from '../../../Candidate/ViewCandidate/ViewCandidateModal';
// import AutorenewIcon from '@mui/icons-material/Autorenew';
import Copy from '../../../../../shared/utils/Copy';
import RefreshIcon from '@mui/icons-material/Refresh';
import Parsable from '../../../../../shared/utils/Parsable';

import ExpandDetails from '../../../../Dashboard/Resume/Community/ExpandDetails/ExpandDetails';
import CloseRounded from '@mui/icons-material/CloseRounded';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';


import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';

import './Applicants.scss';
import { CheckOutlined, ErrorOutlineOutlined } from '@mui/icons-material';
import { OpenErrorModal } from '../../../../shared/ErrorModal/ErrorModal';
import JobDivaLink from '../../../../../shared/services/JobDivaLink';
import EvaluateApplicantsDrawer from '../EvaluateApplicantsDrawer/EvaluateApplicantsDrawer';
import ViewVoiceAICandidateModal from '../../../Candidate/ViewCandidate/ViewVoiceAICandidateModal';
import { Avatar } from '../../../../../shared/modules/MaterialImports/Avatar';
import AudioPlayer from '../../../../shared/Audio/AudioPlayer';
import TableHeaderFilter from '../../../../shared/TableHeaderFilter/TableHeaderFilter';

type UserApiResponse = {
    data: Array<User>;
};

type User = {
    candName: any;
    score: number;
    status: string;
    phone: string;
    email: string;
    date: string;
    candId: string;
    searchId: any;
    jobId: string;
};
const fetchSize = 40;
const Applicants = (
    { statusId, totalCount, jobId, masterJobData, jobCriteriaData, addCriteria, loadRerunCriteria, isInDrawer }
        :
        { statusId: any, totalCount: number, jobId: string, masterJobData?: any, jobCriteriaData?: any, addCriteria?: any, loadRerunCriteria?: any, isInDrawer?: boolean }
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

    const isVoiceAIAndNotHiringWorkflowEnabled = isVoiceAISettingEnabled && !isHiringWorkFlowEnabled;

    const jobPrimaryRecruiterName = localStorage.getItem(`jobId_${jobId}_PrimaryName`) || "";

    // const { jobId } = useParams();
    // const [selectedCandidateIds, setSelectedCandidateIds] = useState<string[]>([]);
    const [sortAnchorEl, setSortAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [sortColumn, setSortColumn] = useState("Date");
    const [sortType, setSortType] = useState("desc");
    const [addEmail, setAddEmail] = useState(false);
    const [selectedEmail, setSelectedEmail] = useState('');
    const [selectedName, setSelectedName] = useState('');
    const [isBulkEmail, setIsBulkEmail] = useState(false);
    const sortOpen = Boolean(sortAnchorEl);
    const sortId = sortOpen ? 'simple-popover' : undefined;

    const [searchValue, setSearchValue] = useState("");
    const [selectedSMS, setSelectedSMS] = useState('');
    const [isBulkSMS, setIsBulkSMS] = useState(false);

    const [addSMS, setAddSMS] = useState(false);
    const [phoneOnClicked, setPhoneOnClicked] = useState("");
    const [dialogPhoneStatus, setDialogPhoneStatus] = useState(false);
    const [selectCandidList, setSelectCandidList] = useState<any>([]);
    const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
    const [TableMailOpen, setTableOpenMail] = useState<null | HTMLElement>(null);
    const [dialogStatus, setDialogStatus] = useState(false);
    const [callAnchorElement, setCallAnchorElement] = useState<null | HTMLElement>(null);
    const [emailOnClicked, setEmailOnClicked] = useState("");
    const openTableMail = Boolean(TableMailOpen);
    const openCallMenu = Boolean(callAnchorElement);
    const [allApplcantsIds, setAllApplicantsIds] = useState<any[]>([])

    const [selectVoiceAICandidateStatus, setSelectVoiceAICandidateStatus] = useState("");
    const [selectJobDivaCandidateStatus, setSelectJobDivaCandidateStatus] = useState("");

    const [menuData, setMenuData] = useState({
        rowId: "",
        email: "",
        candId: "",
        jobId: "",
        phone: "",
        first: "",
    });
    const [viewEvaluationDrawer, setViewEvaluationDrawer] = useState(false)
    const handleTableMenuSendMailOpen = (sendMailId: any) => {
        if (sendMailId) {
            setDialogStatus(true);
            setEmailOnClicked(sendMailId);
            setTableOpenMail(null);
        }
        // console.log(sendMailId);
    };

    const [viewVoiceAIStatus, setViewVoiceAIStatus] = useState(false);
    const [viewVoiceAIHTML, setViewVoiceAIHTML] = useState<any>("");

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
    const selectedJobIdForBlastEmail = useRef("");

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

    const [viewCandidate, setViewCandidate] = useState(false);
    const viewCandidateId = useRef("");
    const openCandidateView = async (id: string, sourceId: string) => {
        // let tempSourceId = (sourceId) ? "/" + sourceId : "";
        // window.open(globalData.getWindowLocation() + "candidate/view/" + id.trim() + "/" + jobId + tempSourceId);
        let allApplicantsData = await getAllJobApplicants();
        if (Array.isArray(allApplicantsData) && !!allApplicantsData?.length) {
            let tempData = allApplicantsData.map((each: any) => each.toString().trim());
            setAllApplicantsIds([...tempData]);
        } else {
            setAllApplicantsIds([...candidateIdsList])
        }

        viewCandidateId.current = id;
        setViewCandidate(true);
    }


    // const [customHeadingsList, setCustomHeadingsList] = useState<any>([]);

    const tableContainerRef = useRef<HTMLDivElement>(null);
    const rowVirtualizerInstanceRef =
        useRef<MRT_RowVirtualizer<HTMLDivElement, HTMLTableRowElement>>(null);

    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
        [],
    );
    const [globalFilter, setGlobalFilter] = useState<string>();
    const [sorting, setSorting] = useState<MRT_SortingState>([]);
    const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);
    const [rowSelection, setRowSelection] = useState<any>({});
    const checkedCountmerge = Object.keys(rowSelection).filter((id) => Boolean(rowSelection[id])).length;
    const [voiceAICandidateStatusList, setVoiceAICandidateStatusList] = useState<any[]>([]);
    const [jobDivaCandidateStatusList, setJobDivaCandidateStatusList] = useState<any[]>([]);


    const [voiceAIStatusList] = useState<any[]>([
        { "id": 1, "value": "VoiceAiAvailable", "label": "Pushed" },
        { "id": 2, "value": "VoiceAiUnavailable", "label": "Unpushed" },
        { "id": 3, "value": "VoiceAiError", "label": "Error" }
    ]);

    const [jobDivaStatusList] = useState<any[]>([
        { "id": 1, "value": "JobdivaAvailable", "label": "Pushed" },
        { "id": 2, "value": "JobdivaUnavailable", "label": "Unpushed" },
        { "id": 3, "value": "JobdivaError", "label": "Error" }
    ]);

    const [currentPlayingId, setCurrentPlayingId] = useState("");


    const [selectVoiceAIStatus, setSelectVoiceAIStatus] = useState("");
    const [selectJobDivaStatus, setSelectJobDivaStatus] = useState("");

    const { data, fetchNextPage, isError, isFetching, refetch } =
        useInfiniteQuery<UserApiResponse, Error>({
            queryKey: ['table-data', columnFilters, globalFilter, sorting, selectVoiceAICandidateStatus, selectJobDivaCandidateStatus, selectVoiceAIStatus, selectJobDivaStatus],
            queryFn: async ({ pageParam }) => {
                const url = new URL("getJobApplicants", import.meta.env.VITE_URL_ADMIN);
                let tempSortColumn = "date";
                if (sortColumn === 'Name') {
                    tempSortColumn = "name";
                } else if (sortColumn === 'Match Score') {
                    tempSortColumn = "score";
                } else if (sortColumn === 'Status') {
                    tempSortColumn = "status";
                } else if (sortColumn === 'Date') {
                    tempSortColumn = "date";
                }

                let payLoad = {
                    "jobId": (jobId) ? jobId : "",
                    "status": isHiringWorkFlowEnabled ? (statusId === null ? null : Number(statusId)) : null,
                    "clientId": userLocalData.getvalue('clientId'),
                    "sortBy": tempSortColumn,
                    "orderBy": sortType,
                    "next": `${(pageParam as number) * fetchSize}`,
                    "pageSize": `${fetchSize}`,
                    "criteria": isInDrawer ? "false" : "" + Boolean(masterJobData?.criteriaEvaluation),
                };

                if (isVoiceAISettingEnabled) {
                    payLoad = Object.assign({}, payLoad, {
                        ...payLoad,
                        voiceAiCandidateStatus: selectVoiceAICandidateStatus ? selectVoiceAICandidateStatus : "",
                        voiceAiStatusFilter: selectVoiceAIStatus ? selectVoiceAIStatus : "",
                    })
                }

                if (isJobDivaAPISettingEnabled) {
                    payLoad = Object.assign({}, payLoad, {
                        ...payLoad,
                        jobdivaCandidateStatus: selectJobDivaCandidateStatus ? selectJobDivaCandidateStatus : "",
                        jobdivaStatusFilter: selectJobDivaStatus ? selectJobDivaStatus : "",
                    })
                }

                const response = await fetch(url.href, {
                    method: "POST",
                    body: JSON.stringify(payLoad),
                    headers: { 'Content-Type': 'application/json' }
                })
                if (!response.ok) {
                    showToaster("Something went wrong", "error");
                    return { data: [] };
                }

                const json = await response.json();


                if ((Number(json?.total) > 0) || (Number(json?.total) === 0)) {
                    if (Number(json?.total) !== totalCountFromAPI) {
                        setTotalCountFromAPI(Number(json?.total));
                    }
                }
                if (json?.Success) {
                    json.list = json.list.filter((obj: any, index: number) => {
                        return index === json.list.findIndex((o: any) => obj.candId === o.candId);
                    });
                    for (let jl = 0; jl < json.list.length; jl++) {
                        json.list[jl].candId = (json.list[jl]?.candId) ? json.list[jl]?.candId.trim() : "" + jl;
                    }
                    return { data: json?.list || [] };
                } else {
                    showToaster("Something went wrong", "error");
                    return { data: [] };
                }
            },
            initialPageParam: 0,

            getNextPageParam: (_lastGroup, groups) => groups.length,
            //  keepPreviousData: true,
            refetchOnWindowFocus: false,

        });

    const criteriaHeadings = useMemo(() => {
        if (!!jobCriteriaData?.criteria?.length) {
            return jobCriteriaData.criteria.map((each: any) => each.match_criteria?.trim());
        } else return [];
    }, [jobCriteriaData])

    const parsedSourcedData = useMemo(() => {
        return data?.pages.flatMap((page) => page.data).map((each: any) => {
            if (each?.criteria && Parsable.isJSON(each.criteria.replace(/\\"/g, "")) && JSON.parse(each.criteria.replace(/\\"/g, ""))) {
                const criteriaData = JSON.parse(each.criteria.replace(/\\"/g, ""))?.evaluation ? JSON.parse(each.criteria.replace(/\\"/g, ""))?.evaluation : JSON.parse(each.criteria.replace(/\\"/g, ""));;
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
            candidateName: each.candName,
            applicantId: each.candId
        }));
    }, [data]);

    // const flatData = useMemo(
    //     () => data?.pages.flatMap((page) => page.data) ?? [],
    //     [data],
    // );
    const flatData = useMemo(
        () => {
            return parsedSourcedData?.filter((page) => {
                return page?.candName?.toLowerCase().includes(searchValue.toLowerCase() || "");
            }) ?? [];
        },
        [parsedSourcedData, searchValue],
    );

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


    const openVoiceAIView = async (id: string, voiceId: string) => {

        let dataBody = {
            voiceAiId: voiceId,
            jobId: jobId ? Number(jobId) : "",
            type: "applicants",
            clientId: userLocalData.getvalue('clientId')
        }
        // let dataBody = {
        //     "clientId": 3,
        //     "jobId": "2419",
        //     "type": "applicants",
        //     "voiceAiId": "7343d50f-0a33-4d67-b6fe-9bb879cbbfea"
        // }

        try {
            trackPromise(
                ApiService.postWithData("voiceai", "candidates/getCandidateActivityLog", dataBody).then((response: any) => {
                    if (response.data.Success) {
                        console.log("response.data.Data", response.data.activityLogHtmlBody);
                        //   setViewVoiceAIHTML(response.data.activityLogHtmlBody || "");
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


    const columns: MRT_ColumnDef<User>[] = useMemo(
        () => {
            let defaultColumns: MRT_ColumnDef<User>[] = [
                {
                    accessorKey: 'candName',
                    header: 'Name',
                    Cell: ({ row }) => (
                        <span className="hightLightTd" onClick={() => openCandidateView(row.original.candId, row.original.searchId)}>{getSlicedCell(row.original.candName)}</span>
                    ),
                },
                {
                    accessorKey: 'recrName',
                    header: 'Recruiter',
                    size: 75,
                    Cell: ({ row }) => (
                        <span className=''>
                            <Tooltip title={jobPrimaryRecruiterName}>
                                <Avatar sx={{ width: 30, height: 30, fontSize: 12 }} {...getShortName(jobPrimaryRecruiterName)}></Avatar>
                            </Tooltip>
                        </span>
                    ),
                },
                {
                    accessorKey: "score",
                    header: "Match Score",
                    Cell: ({ row }) => (
                        <Stack direction="row" alignItems="center">
                            {/* <span style={{ fontSize: 13 }}>{Number(row.original.score)}%</span>
                                <BorderLinearProgress variant="determinate" value={Number(row.original.score)} sx={{ maxWidth: '150px' }} /> */}
                            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                                <CircularProgress variant="determinate" value={Math.round(row.original.score)} />
                                <Box
                                    sx={{
                                        top: 0,
                                        left: 0,
                                        bottom: 0,
                                        right: 0,
                                        position: 'absolute',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Typography
                                        variant="caption"
                                        component="div"
                                        color="text.secondary"
                                    >{`${Math.round(row.original.score)}%`}</Typography>
                                </Box>
                            </Box>
                        </Stack>
                    ),
                    size: 100,
                    enableHiding: true,
                },
                // {
                //     accessorKey: "status",
                //     header: "Status",
                //     size: 180,
                // },
                {
                    accessorKey: "Actions",
                    header: "Quick Actions",
                    enableSorting: false,
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
                                    height: "31px",
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
                                                // "1px solid var(--c-neutral-40)" ? "1px solid var(--c-neutral-40)"
                                                // : "var(--c-secondary-color)",
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
                                                            candId: row.original.candId,
                                                            phone: "",
                                                            jobId: row.original.jobId,
                                                            first: row.original.candName,
                                                        });
                                                        console.log(setMenuData);
                                                        //   handleTableMail(e, `${row.id}`);
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
                                        <Tooltip title={`${USPhoneFormat.get(row.original.phone)}`} placement="top">
                                            <Button
                                                id={`phonebutton-${row.id}`}
                                                disableRipple
                                                onClick={e => {
                                                    if (row.original.phone) {
                                                        setMenuData({
                                                            rowId: row.id,
                                                            email: "",
                                                            candId: row.original.candId,
                                                            phone: row.original.phone,
                                                            jobId: row.original.jobId,
                                                            first: row.original.candName
                                                        });
                                                        //handleTableCall(e, `${row.id}`);
                                                        setPhoneOnClicked(row.original.phone);
                                                        setDialogPhoneStatus(true);
                                                        setCallAnchorElement(null);
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
                                                className={`customButtonForHover ${row.original.phone === "" ? "disabled" : `${row.original.phone}`
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
                    size: 100,
                },
                {
                    accessorKey: 'date',
                    header: 'Date',
                    Cell: ({ row }) => (
                        <span>
                            {DateTime.fromFormat(row.original.date.substring(0, 19), 'yyyy-MM-dd hh:mm:ss').toFormat('MM/dd/yyyy ')}
                            {/* hh:mm:ss */}
                        </span>
                    ),
                    size: 100,
                },
                {
                    accessorKey: 'source',
                    header: 'Source',
                    size: 150,
                },
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
                                            onClick={() => openVoiceAIView(row.original.userId, row.original.voiceAiId)}>
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
                                    </Tooltip>
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
                                     onClick={() => OpenErrorModal({ errorMessage: row?.original?.jobdivaReason, title: row.original.candName + ' - ' + row?.original?.jobdivaCandidateStatus })}>
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

            if (isEvaluteSettingEnabled && !!jobCriteriaData?.criteria?.length && !isInDrawer) {
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
                                                    <ThumbUpOutlinedIcon />
                                                    :
                                                    row.original[accessKey] === "Potential Match" ?
                                                        <ThumbUpOutlinedIcon />
                                                        :
                                                        row.original[accessKey] === "Not a Match" ?
                                                            <ThumbDownOutlinedIcon />
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

    const candidateIdsList = useMemo(() => flatData.map((data: any) => data.candId?.toString()), [flatData])
    const handleBlastEmail = () => {
        selectedJobIdForBlastEmail.current = "";
        const selectedIds = Object.keys(rowSelection).filter(key => rowSelection[key]);
        if (selectedIds.length === 1) {
            const selectedRowKey = selectedIds[0];
            const selectedRow = flatData.find((candidate: any) => candidate.candId === selectedRowKey);
            if (selectedRow) {
                selectedJobIdForBlastEmail.current = selectedRow.jobId;
                setSelectedEmail(selectedRow.email);
                setSelectedName(selectedRow.candName);
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


    const handleBlastSMS = () => {
        const selectedIds = Object.keys(rowSelection);
        if (selectedIds.length === 1) {
            const selectedRowKey = selectedIds[0];
            const selectedRow = flatData.find((candidate: any) => candidate.candId === selectedRowKey);
            // console.log(selectedRow);
            if (selectedRow) {
                setSelectedSMS(selectedRow.phone);
                setSelectedName(selectedRow.candName);
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


    const assignCriteria = (userIds: number[]) => {
        // let tempCandId = "";
        // Object.entries(rowSelection).forEach(([key, value]) => {
        //     if (!tempCandId && value) {
        //         tempCandId = key;
        //     }
        // });
        if (userIds) {
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

    const getAllJobApplicants = () => {
        let tempSortColumn = "date";
        if (sortColumn === 'Name') {
            tempSortColumn = "name";
        } else if (sortColumn === 'Match Score') {
            tempSortColumn = "score";
        } else if (sortColumn === 'Status') {
            tempSortColumn = "status";
        } else if (sortColumn === 'Date') {
            tempSortColumn = "date";
        }
        return trackPromise(
            // ApiService.getByParams(193, 'Curately/Jobs/job_applicants_all.jsp', {
            ApiService.postWithData("admin", 'jobApplicantsAll', {
                jobId: (jobId) ? jobId : "",
                status: isHiringWorkFlowEnabled ? (statusId === null ? null : Number(statusId)) : null,
                clientId: userLocalData.getvalue('clientId'),
                sortBy: tempSortColumn,
                orderBy: sortType,
                // next: `${pageParam * fetchSize}`,
                pageSize: `${fetchSize}`,
            }).then(
                (result: any) => {
                    if (result?.data?.Success) {
                        return !!result?.data?.userIds?.length ? [...new Set(result.data.userIds)] : [];
                    } else {
                        showToaster(result.data?.Message ? result.data.Message : "Something went wrong", "error")
                        return [];
                    }
                }
            )
        )

    }

    const handleSelectAll = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsSelectAllChecked(event.target.checked);
        if (event.target.checked) {
            let allApplicants = await getAllJobApplicants();
            let rowData: any = {};
            let tempData: any = (allApplicants) ? allApplicants : [];
            if (!!tempData?.length) {
                tempData = [...new Set(tempData)]
                for (let index = 0; index < tempData.length; index++) {
                    if (tempData[index]?.toString()?.trim()) {
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
    const fetchMoreOnBottomReached = useCallback(
        (containerRefElement?: HTMLDivElement | null) => {
            if (containerRefElement) {
                const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
                if (
                    scrollHeight - scrollTop - clientHeight < 400 &&
                    !isFetching &&
                    (totalFetched < totalDBRowCount)
                    // && (((data?.pages.length || 1) * 40) < totalDBRowCount)
                ) {
                    fetchNextPage();
                }
            }
        },
        [fetchNextPage, isFetching, totalFetched, totalDBRowCount],
    );
    // useEffect(() => {
    //     rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
    //     // setSelectedCandidateIds(Object.keys(rowSelection));

    // }, [rowSelection]);
    useEffect(() => {
        try {
            rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
        } catch (error) {
            console.error(error);
        }
    }, [sorting, columnFilters, globalFilter, selectVoiceAICandidateStatus]);
    // console.log(Object.keys(rowSelection).length);


    useEffect(() => {
        console.log(flatData);
        getVoiceAiCandidateStatusList();

        getJobDivaCandidateStatusList();
        //    console.log(data);
        return () => {
            if (data?.pages.length) {
                data.pages.length = 0;
            }
        }
    }, []);

    const getApplicantsId = () => {
        let userIds = Object.keys(rowSelection);
        let appIds: any[] = [];
        if (!!userIds?.length) {
            userIds.forEach((userId) => {
                appIds.push({
                    applicantId: flatData.find((each) => userId.toString() === each.candId.toString())?.appId || 0,
                    userId,
                })
            });
            return appIds;
        } else return [];
    }

    const handleVoiceAIClick = () => {
        const appIds = getApplicantsId();
        let userIds = Object.entries(rowSelection)
            .filter(([key, value]) => value === true)
            .map(([key, value]) => parseInt(key));
        if (!!userIds?.length) {
            let data = {
                "jobId": jobId,
                "type": "applicants",
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


    const publishApplicantToAvionte = () => {

        let bodyRequest = {
            "atsName": "Avionte",
            "clientId": userLocalData.getvalue('clientId'),
            "recruiterId": userLocalData.getvalue('recrId'),
            "moduleName": "Applicant",
            "curatelyIds": Object.entries(rowSelection).filter(([key, value]) => value).map(([key]) => key),
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
    //publishApplicantToJobDiva

    const publishApplicantToJobDiva = () => {

        let bodyRequest = {
            "atsName": "Jobdiva",
            "clientId": userLocalData.getvalue('clientId'),
            "recruiterId": userLocalData.getvalue('recrId'),
            "moduleName": "Applicant",
            "curatelyIds": Object.entries(rowSelection).filter(([key, value]) => value).map(([key]) => key),
        }

        ApiService.postWithData('ats', `ats/post`, bodyRequest).then((response) => {

            if (response.data.Success) {
                showToaster(`Applicant is Publshed successfully`, 'success');
                setRowSelection({});
            } else {
                showToaster((response.data.Message) ? response.data.Message : "Unable to Publish Applicant to Jobdiva", 'error');
            }
        }).catch(error => {
            showToaster(error.message ? error.message : "Unable to Publish Applicant to Jobdiva", 'error');
        });

    }

    const publishApplicantToBullhorn = () => {

        let bodyRequest = {
            "atsName": "Bullhorn",
            "clientId": userLocalData.getvalue('clientId'),
            "recruiterId": userLocalData.getvalue('recrId'),
            "moduleName": "Applicant",
            "curatelyIds": Object.entries(rowSelection).filter(([key, value]) => value).map(([key]) => key),
        }

        // const keysWithTrueValue = Object.keys(applicantsRowSelection).filter(id => Boolean(applicantsRowSelection[id]));
        // if (keysWithTrueValue.length === 1) {
        // https://adminapi.cxninja.com/bullhorn-service-dev/job/%7BclientId%7D/%7BjobId%7D
        ApiService.postWithData('ats', `ats/post`, bodyRequest).then((response) => {

            if (response.data.Success) {
                showToaster(`Applicant is Publshed successfully`, 'success');
                setRowSelection({});
            } else {
                showToaster((response.data.Message) ? response.data.Message : "Unable to Publish Applicant to BullHorn", 'error');
            }
        }).catch(error => {
            showToaster(error.message ? error.message : "Unable to Publish Applicant to BullHorn", 'error');
        });

    }

    const handleEvaluationCriteriaClick = () => {
        if (!!jobCriteriaData?.criteria?.length) {
            const validatedRowSelection = Object.entries(rowSelection).filter(([key, value]) => value === true);
            if (!!validatedRowSelection?.length) {
                let userIds = validatedRowSelection.map(([key, value]) => parseInt(key));
                assignCriteria(userIds);
            } else showToaster("Please selet the applicants to assign evaluation criteria", "error");
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
            { accessorKey: "jobdivaId", header: "Job Diva", isEnabled: isJobDivaAPISettingEnabled ? true : false },
            { accessorKey: "jobdivaCandidateStatus", header: "JobDiva Status", isEnabled: isJobDivaAPISettingEnabled ? true : false },
            { accessorKey: "score", header: "Match Score", isEnabled: isHiringWorkFlowEnabled ? true : false },
            { accessorKey: "Actions", header: "Quick Actions", isEnabled: isQuickActionsEnabled ? true : false },
            { accessorKey: "status", header: "Status", isEnabled: (statusId !== null) || isVoiceAIAndNotHiringWorkflowEnabled ? false : true },
            { accessorKey: "date", header: "Date", isEnabled: isVoiceAIAndNotHiringWorkflowEnabled ? false : true },
            { accessorKey: "recrName", header: "Recruiter", isEnabled: isVoiceAIAndNotHiringWorkflowEnabled ? true : false },


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
                <Stack direction={"row"} alignItems={"center"} gap={1} className='rerun-container'  >
                    <Typography>Your search evaluation criteria may have changed since running this job.</Typography>
                    <Button disableElevation disableRipple onClick={handleReRunClick}>Re-run to see new results</Button>
                </Stack>}
            <MaterialReactTable
                columns={columns as MRT_ColumnDef<any, any>[]}
                data={flatData}
                enablePagination={false}
                enableRowSelection
                enableRowVirtualization={false} // Enable virtualization for better performance
                manualSorting
                onColumnFiltersChange={setColumnFilters}
                onGlobalFilterChange={setGlobalFilter}
                onSortingChange={setSorting}
                enableHiding
                enableStickyHeader
                // onRowSelectionChange={setRowSelection}
                //     (e) => {
                //     console.log(e);
                //     setRowSelection(e)
                // }}
                renderTopToolbar={
                    <div>
                        <Grid
                            container
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Grid >
                                <Stack direction="row" alignItems={"center"} spacing={1}>
                                    <Checkbox
                                        className="select-all-checkbox ml-2 p-1"
                                        disableRipple
                                        color="default"
                                        checked={isSelectAllChecked}
                                        onChange={handleSelectAll}
                                    />
                                    <ButtonGroup
                                        variant="outlined"
                                        className='quickActionButtonGroup'
                                    >
                                        {
                                            isBulkEmailSettingEnabled ?
                                                <Tooltip title="Blast Email">
                                                    <Button
                                                        variant="outlined"
                                                        color="secondary"
                                                        disabled={(checkedCountmerge > 0) ? false : true}
                                                        // disabled={Object.keys(rowSelection).length > 0 ? false : true}
                                                        onClick={handleBlastEmail}
                                                        startIcon={<MailOutlineOutlinedIcon />}
                                                    />
                                                </Tooltip>
                                                :
                                                null
                                        }
                                        {
                                            isEmailSMSSettingEnabled && !userLocalData.isChromeExtensionEnabled() ?
                                                <Tooltip title="SMS">
                                                    <Button
                                                        variant="outlined"
                                                        color="secondary"
                                                        disabled={(checkedCountmerge > 0) ? false : true}
                                                        // disabled={Object.keys(rowSelection).length > 0 ? false : true}
                                                        onClick={handleBlastSMS}
                                                        startIcon={<CallOutlinedIcon />}
                                                    />
                                                </Tooltip>
                                                :
                                                null
                                        }
                                        {/* // masterJobData?.criteriaEvaluation && */}
                                        {(isEvaluteSettingEnabled && !isInDrawer) ? <Tooltip title="Evaluate">
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                // className="mr-2"
                                                // disabled={(checkedCountmerge === 1) ? false : true}
                                                onClick={handleEvaluationCriteriaClick}
                                                startIcon={<FactCheckOutlinedIcon />}
                                            />
                                        </Tooltip>
                                            :
                                            null
                                        }

                                        {!isInDrawer ?
                                            ((isVoiceAISettingEnabled && masterJobData?.voiceai) || isBullHornSettingEnabled || isAvionteAPISettingEnabled) ? <Tooltip title="More">
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
                                            </Tooltip>
                                                :
                                                null : null}

                                    </ButtonGroup>
                                    {(isEvaluteSettingEnabled && !isInDrawer && !!jobCriteriaData?.criteria?.length) ?
                                        <Button variant='outlined' color='secondary' onClick={() => setViewEvaluationDrawer(true)}>View Criteria</Button>
                                        : null}
                                    <Menu
                                        id="moreOptions-menu"
                                        anchorEl={moreAchorEl}
                                        open={moreButtonOpen}
                                        onClose={closeMoreMenu}
                                        MenuListProps={{
                                            'aria-labelledby': 'moreOptions-button',
                                        }}
                                    >
                                        {(isVoiceAISettingEnabled && masterJobData?.voiceai) && <MenuItem onClick={() => { closeMoreMenu(); handleVoiceAIClick(); }} disabled={
                                            ((Object.keys(rowSelection).length > 0) ? false : true) || (["pause", "complete"].includes(masterJobData?.voiceaiCaseStatus) ? true : false)
                                        }> Voice AI</MenuItem>}
                                        {isBullHornSettingEnabled && <MenuItem onClick={() => { closeMoreMenu(); publishApplicantToBullhorn(); }}>Bullhorn</MenuItem>}
                                        {/* {isJobDivaAPISettingEnabled && <MenuItem onClick={() => { closeMoreMenu(); publishApplicantToJobDiva(); }}>Job Diva</MenuItem>} */}
                                        {isAvionteAPISettingEnabled && <MenuItem onClick={() => { closeMoreMenu(); publishApplicantToAvionte(); }}>Avionte</MenuItem>}
                                        {/* <MenuItem onClick={() => { closeMoreMenu(); setAddMatchToModal(true) }}>Match to other Job</MenuItem> */}
                                    </Menu>

                                    {/* {isVoiceAISettingEnabled ?
                                        <Stack direction={"row"} alignItems={"center"} spacing={1}>
                                            <TextField
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
                                            </TextField>
                                        </Stack>
                                        : null
                                    } */}

                                    {/* {
                                        masterJobData?.voiceai &&
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            className="mr-2"
                                            disabled={(checkedCountmerge > 0) ? false : true}
                                            onClick={handleVoiceAIClick}
                                        >
                                            Voice AI
                                        </Button>
                                    } */}

                                </Stack>
                            </Grid>
                            <Grid >
                                <Stack direction="row">
                                    <Button
                                        variant="outlined"
                                        startIcon={
                                            <>
                                                <SouthRoundedIcon fontSize="small" sx={{ width: "1rem", height: "1rem", transform: sortType === "asc" ? "scaleY(-1)" : "none" }} />
                                                <MenuIcon fontSize="small" sx={{ width: "1rem", height: "1rem" }} />
                                            </>
                                        }
                                        endIcon={<ArrowDropDownIcon />}
                                        onClick={handleSortClick}

                                        sx={{ width: '160px', mr: 2, ml: 'auto', padding: "2px", height: "30px", marginRight: "5px", marginTop: "3px", textTransform: "capitalize" }}
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
                                                    {isHiringWorkFlowEnabled && <MenuItem value={'Match Score'}>Match Score</MenuItem>}
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
                                                        id: sortColumn.toLowerCase()
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
                                        <IconButton className='ml-4' color="primary" onClick={
                                            async () => {
                                                setRowSelection({});
                                                refetch();
                                            }
                                        }><RefreshIcon /></IconButton>
                                    </Tooltip>
                                </Stack>
                            </Grid>
                        </Grid>
                    </div>
                }
                muiSelectCheckboxProps={(prop) => ({
                    onChange: (e) => {
                        if (prop.row.original.candId) {
                            let tempRowSelection: any = { ...rowSelection };
                            if (e.target.checked) {
                                tempRowSelection[prop.row.original.candId] = e.target.checked;
                            } else {
                                if (tempRowSelection.hasOwnProperty(prop.row.original.candId)) {
                                    delete tempRowSelection[prop.row.original.candId];
                                }
                            }
                            setRowSelection({ ...rowSelection, [prop.row.original.candId]: e.target.checked });
                            console.log(e.target.checked);
                        }
                    }
                })}
                state={{
                    rowSelection,
                    sorting,
                    // isLoading can be inferred from the isFetching status from useInfiniteQuery
                    showAlertBanner: isError, // Assume isError is derived from useInfiniteQuery
                    showProgressBars: isFetching, // Assume isFetching is derived from useInfiniteQuery
                    columnVisibility,
                    columnPinning: { left: ["mrt-row-select", "candName"] }

                }}
                muiTableContainerProps={{
                    // Attach the ref for the table container to manage scroll position
                    ref: tableContainerRef,
                    sx: { maxHeight: '600px' },
                    onScroll: (
                        event: UIEvent<HTMLDivElement> // Listen for scroll events to fetch more data
                    ) => fetchMoreOnBottomReached(event.target as HTMLDivElement),
                }}
                muiSearchTextFieldProps={{
                    placeholder: `Search`,
                    sx: { width: '155px', right: "225px", padding: "-10px", height: "20px", marginTop: "-8px", marginRight: "-40px" },
                    value: searchValue,
                    onChange: (e: any) => { setSearchValue(e.target.value) },
                    InputProps: {
                        startAdornment: <InputAdornment position="start"><SearchOutlinedIcon fontSize='small' htmlColor='#757575' /></InputAdornment>,
                        endAdornment: <InputAdornment position="end" disablePointerEvents={searchValue ? false : true}>
                            <CloseRounded fontSize='small' htmlColor={searchValue ? "#757575" : "#ebebeb"} sx={{ cursor: "pointer" }} onClick={() => setSearchValue("")} />
                        </InputAdornment>
                    }
                }}
                initialState={{
                    density: 'compact',
                    showGlobalFilter: true, // Adjust based on whether you want global filtering
                    //  columnOrder: ['mrt-row-select'], // Keep the selection column at the beginning
                }}

                // enableColumnResizing
                enableGlobalFilterModes
                rowVirtualizerInstanceRef={rowVirtualizerInstanceRef} //get access to the virtualizer instance
                rowVirtualizerOptions={{ overscan: 4 }}
                getRowId={(row) => row.candId}
                icons={{
                    ArrowDownwardIcon: (props: any) => <SwitchLeftIcon  {...props} />
                }}

                renderBottomToolbarCustomActions={() => (
                    <Typography>
                        {totalFetched} of {totalDBRowCount}
                        {/* Fetched {totalFetched} of {totalDBRowCount} total rows. */}
                    </Typography>
                )}
                // positionExpandColumn={"last"}
                positionExpandColumn={(isEvaluteSettingEnabled && masterJobData?.criteriaEvaluation && !isInDrawer) ? "last" : undefined}
                renderDetailPanel={(isEvaluteSettingEnabled && masterJobData?.criteriaEvaluation && !isInDrawer) ? ({ row }) => {
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
                viewCandidate ?
                    <ViewCandidateModal candidateId={viewCandidateId.current} closePopup={() => {
                        setViewCandidate(false);
                        setAllApplicantsIds([]);
                    }} jobId={jobId ? jobId : ""} open={viewCandidate} candidateIdsList={allApplcantsIds} />
                    :
                    null
            }

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
                            setDialogStatus(false)
                        }}
                        name={menuData.first.toLowerCase()}
                        emailId={emailOnClicked}
                        candidateId={menuData.candId}
                        jobId={menuData.jobId}
                    />
                )
            }
            {
                `${USPhoneFormat.get(menuData.phone)}` ?
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
                                    {menuData.phone ? `${menuData.phone}` : ""}
                                </Typography>
                                <ContentCopyRoundedIcon
                                    sx={{
                                        color: "#737373",
                                        fontSize: "20px",
                                        pl: 0.5,
                                        cursor: "",
                                    }}
                                    onClick={() => { Copy.text(`${menuData.phone}`, 'Phone Number'); setCallAnchorElement(null); }}
                                />
                            </Box>
                            {!userLocalData.isChromeExtensionEnabled() ? <Button
                                variant="contained"
                                disableRipple
                                onClick={() => {
                                    setPhoneOnClicked(menuData.phone);
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
                        name={menuData.first.toLowerCase()}
                        toPhone={phoneOnClicked}
                        candidateId={menuData.candId}
                    />
                ) : null
            }
            {
                addEmail && <EmailDialogBox
                    dialogOpen={addEmail}
                    onClose={() => {
                        setRowSelection({});
                        setAddEmail(false)
                    }}
                    name={selectedName}
                    emailId={selectedEmail}
                    isBulkEmail={isBulkEmail}
                    candidateId={selectCandidList.toString()}
                    jobId={selectedJobIdForBlastEmail.current}
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
                        jobId={menuData.jobId}
                    />

                )
            }

            {
                viewEvaluationDrawer ?
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
                    /> : null
            }

            {
                viewVoiceAIStatus ?
                    <ViewVoiceAICandidateModal candidateId={viewCandidateId.current} closePopup={() => {
                        setViewVoiceAIStatus(false);
                        setViewVoiceAIHTML("");
                    }}
                        open={viewVoiceAIStatus} candidateViewScreening={viewVoiceAIHTML} />
                    :
                    null
            }

        </>
    );
};



const queryClient = new QueryClient();

const ApplicantsClient = (
    { statusId, totalCount, jobId, masterJobData, jobCriteriaData, addCriteria, loadRerunCriteria, isInDrawer }
        :
        { statusId: any, totalCount: number, jobId: string, masterJobData?: any, jobCriteriaData?: any, addCriteria?: { (): void }, loadRerunCriteria?: { (userIds?: any[]): void }, isInDrawer?: boolean }
) => (
    <QueryClientProvider client={queryClient}>
        <Applicants statusId={statusId} totalCount={totalCount} jobId={jobId} masterJobData={masterJobData} jobCriteriaData={jobCriteriaData} addCriteria={addCriteria} loadRerunCriteria={loadRerunCriteria} isInDrawer={isInDrawer} />
    </QueryClientProvider>
);

export default ApplicantsClient;
