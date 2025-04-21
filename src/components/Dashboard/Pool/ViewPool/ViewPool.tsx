import { useState, useEffect, useMemo, useRef } from "../../../../shared/modules/React";
import {Grid, Button, IconButton} from "../../../../shared/modules/commonImports";
import { showToaster } from "../../../shared/SnackBar/SnackBar";

import CommunityFilters from "../../Resume/Community/CommunityFilters";
// import TalentFilters from "./TalentFilters";

// import SouthRoundedIcon from '@mui/icons-material/SouthRounded';
// import Popover from '@mui/material/Popover';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import MenuIcon from '@mui/icons-material/Menu';
import TuneIcon from '@mui/icons-material/Tune';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';

// import { FieldArray, Form, Formik, useFormik } from 'formik';
// import * as Yup from 'yup';
import MASTER_JSON_COMMUNITY from "../../../../shared/data/Community/BuildJson";

import "./ViewPool.scss";
// import { DEGREE_TYPES } from '../../../../shared/data/Community/Community';
// import { userLocalData } from '../../../../shared/services/userData';

import ApiService from "../../../../shared/api/api";
import { trackPromise } from "../../../../shared/modules/PromiseTrackter";

// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
import {Stack} from "../../../../shared/modules/MaterialImports/Stack";
import {
    MaterialReactTable,
    type MRT_ColumnDef,
    type MRT_SortingState,
} from "../../../../shared/modules/MaterialReactTable";
import { DateTime } from "../../../../shared/modules/Luxon";
// import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
// import Box from "@mui/material/Box";
// import Checkbox from "@mui/material/Checkbox";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SwitchLeftIcon from "@mui/icons-material/SwitchLeft";
// import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
// import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import ApiRequests from "../../../../shared/api/api";
// import EggAltRoundedIcon from "@mui/icons-material/EggAltRounded";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
// import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
// import MenuItem from "@mui/material/MenuItem";
import {Menu, MenuItem} from "../../../../shared/modules/MaterialImports/Menu";
// import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
// import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
// import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
// import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
// import CloudIcon from "@mui/icons-material/Cloud";
// import updateDocumentTitle from "../../../../shared/services/title";
import QuestionMarkRoundedIcon from "@mui/icons-material/QuestionMarkRounded";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import {Tooltip} from "../../../../shared/modules/MaterialImports/ToolTip";
import PhoneDialog from "../../../shared/PhoneDialog/PhoneDialog";

import EmailDialogBox from "../../../shared/EmailDialogBox/EmailDialogBox";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
//import IconButton from "../../../../shared/modules/MaterialImports/IconButton";
// import { useParams } from 'react-router-dom';
import {Box} from "../../../../shared/modules/MaterialImports/Box";
import {ButtonGroup} from "../../../../shared/modules/MaterialImports/ButtonGroup";
import {Typography} from "../../../../shared/modules/MaterialImports/Typography";
import {Checkbox} from "../../../../shared/modules/MaterialImports/FormElements";
import USPhoneFormat from "../../../../shared/utils/USPhoneFormat";
// import {
//     Edit as EditIcon,
//     // Delete as DeleteIcon,
//     // Email as EmailIcon,
// } from "@mui/icons-material";
// import { styled } from "@mui/material/styles";
import { globalData } from "../../../../shared/services/globalData";
//import styles from "./../../shared/config/variables.module.scss";
// import EditCandidate from "../../Candidate/EditCandidate/EditCandidate";

//import Tabs from "@mui/material/Tabs";
//import Tab from "@mui/material/Tab";
import Sequence from "../../Job/View/Sourced/PopUps/Sequence/Sequence";
// import Autocomplete from "@mui/material/Autocomplete";
// import Paper from "@mui/material/Paper";
// import TextField from "@mui/material/TextField";
import { userLocalData } from "../../../../shared/services/userData";
//import LoopIcon from "@mui/icons-material/Loop";
import {CircularProgress} from "../../../../shared/modules/MaterialImports/CircularProgress";
import TelegramIcon from "@mui/icons-material/Telegram";

import { useNavigate, useParams } from "react-router-dom";
import { MUIAutoComplete } from '../../../shared/MUIAutoComplete/MUIAutoComplete';
import {List, ListItem, ListItemText}  from "../../../../shared/modules/MaterialImports/List";
// import { CommonImages } from "../../../../shared/images/CommonImages";
// import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
// import { confirmDialog } from "../../../shared/ConfirmDialog/ConfirmDialog";


// import MenuItem from '@mui/material/MenuItem';

import IsValidUrl from "../../../../shared/utils/IsValidUrl";

const ViewPool = ({ jobIdFromJobPage, jobTitleFromJobPage, isInJob }: { jobIdFromJobPage: string, jobTitleFromJobPage: string, isInJob: boolean }) => {

    const isEmailSMSSettingEnabled = userLocalData.checkIntegration(40005);

    const isBulkEmailSettingEnabled = userLocalData.checkIntegration(400020);


    const { talentPoolId } = useParams();
    const talentPoolName = talentPoolId ? localStorage.getItem('talentPoolName_' + talentPoolId) : "";


    const isPoolSearchSettingEnabled = userLocalData.checkIntegration(400008);


    const initialCountLoaded = useRef(false);
    const firstAPICall = useRef(false);
    const isFiltersApplied = useRef(false);

    let navigate = useNavigate();
    const [filtersExpand, setFiltersExpand] = useState(isPoolSearchSettingEnabled ? false : true);
    //   !talentPoolId ? false : true
    const mainJsonDataRef = useRef<any>({});
    const jsonToPassRef = useRef<any>({});
    // const { candidateId, jobId } = useParams();
    const [applicantsData, setApplicantsData] = useState<any>([]);
    const [rowSelection, setRowSelection] = useState({});
    // const [dataLoading, setDataLoading] = useState(false);
    // const [countLoading, setCountLoading] = useState(false);
    const [rowCount, setRowCount] = useState(0);
    const [selectedRowCount, setSelectedRowCount] = useState(0);
    const [candidateData, setCandidateData] = useState<any>([]);

    const [dialogPhoneStatus, setDialogPhoneStatus] = useState(false);
    const [phoneOnClicked, setPhoneOnClicked] = useState("");
    const [dialogStatus, setDialogStatus] = useState(false);
    const [addEmail, setAddEmail] = useState(false);
    const [emailOnClicked, setEmailOnClicked] = useState("");
    const [tabValue, setTabValue] = useState(
        talentPoolId ? "Talent Pool" : "All"
    );
    const currentSelectedTabCount = useRef(0);
    const currentSelectCount = useRef(0);
    const [rowPageIndex, setRowPageIndex] = useState(0);

    const firstLoad = useRef(false);

    // const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    //     setTabValue(newValue);
    // };

    // const [dialogListStatus, setDialogListStatus] = useState(false);
    // const [listOnClicked, setListOnClicked] = useState('');
    // const [dialogSequenceStatus, setDialogSequenceStatus] = useState(false);
    // const [sequenceOnClicked, setSequenceOnClicked] = useState('');

    // const [openSnack, setOpenSnack] = useState<{ [key: string]: boolean }>({});
    const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
    const [TableMailOpen, setTableOpenMail] = useState<null | HTMLElement>(null);
    const [callAnchorElement, setCallAnchorElement] = useState<null | HTMLElement>(null);
    const [TableListOpen, setTableOpenList] = useState<null | HTMLElement>(null);
    const [TableSequenceOpen, setTableOpenSequence] =
        useState<null | HTMLElement>(null);
    // const [openCallSnack, setOpenCallSnack] = useState<{ [key: string]: boolean }>({});
    const [TableTelegramOpen, setTableOpenTelegram] =
        useState<null | HTMLElement>(null);
    const openTableTelegram = Boolean(TableTelegramOpen);

    const openTableMail = Boolean(TableMailOpen);
    const openCallMenu = Boolean(callAnchorElement);
    const openTableList = Boolean(TableListOpen);
    const openTableSequence = Boolean(TableSequenceOpen);
    // const [tableMenuSendMail, setTableMenuSendMail] = useState<{ [key: string]: boolean }>({});
    // const [openTableMail, setOpenTableMail] = useState(false);
    // const [openCallMenu, setOpenTableCall] = useState(false);
    // const [openAddCandidateModal, setOpenAddCandidateModal] = useState(false);
    const [menuData, setMenuData] = useState({
        rowId: "",
        email: "",
        first: "",
        candId: "",
        jobId: "",
        phone: "",
        poolCount: 0,
        poolIds: [],
        poolNames: [],
        sequenceIds: [],
        sequenceNames: [],
        sequenceCount: 0,
        linkedIn: ""
    });

    const [selectSequenceList, setSelectSequenceList] = useState<any>([]);

    const [selectAllElement, setSelectAllElement] = useState<null | HTMLElement>(
        null
    );
    const openSelectAllMenu = Boolean(selectAllElement);
    const openSelectAll = (event: React.MouseEvent<HTMLButtonElement>) => {
        setSelectAllElement(event.currentTarget);
    };
    const checkedCount = Object.keys(rowSelection).length;
    const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);
    const someAreChecked = !isSelectAllChecked && checkedCount ? true : false;
    const [openSequenceModal, setOpenSequenceModal] = useState(false);
    const [addtolistanchorEl, setAddToListAnchorEl] =
        useState<null | HTMLElement>(null);
    const openAddToListenBtn = Boolean(addtolistanchorEl);
    const [addtopoollistanchorEl, setAddToPoolListAnchorEl] =
        useState<null | HTMLElement>(null);
    const openAddToPoolListenBtn = Boolean(addtopoollistanchorEl);
    // const [distributionList, setDistributionList] = useState<any>([]);

    const handleClickAddTeligram = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        setTableOpenTelegram(event.currentTarget);
    };

    // const [showColumns, setShowColumns] = useState([
    //     'mrt-row-select',
    //     "name",
    //     "jobTitle",
    //     "compName",
    //     "Actions",
    //     "score",
    //     "city",
    //     "date"
    // ]);

    const [selectedTalentPool, setSelectedTalentPool] = useState({
        id: "",
        name: "",
    });

    // console.log(Object.keys(rowSelection));


    const addToTopTalentPool = (id: string, name: string) => {

        console.log(Object.keys(rowSelection));
        if (Object.keys(rowSelection).length > 0) {
            if (name && name.trim()) {
                setSelectedTalentPool({ id: id, name: name });
                handleProfileMenuClose();
                addToTalentPool(id, name, Object.keys(rowSelection).join(','));
            }
        } else {
            showToaster('Select atleast one Candidate', 'error');
        }
    }
    const addToTalentPool = (id: string, name: string, candidateId: string) => {
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
                            setSelectedTalentPool({ id: "", name: "" });
                            handleProfileMenuClose();
                            if (response.data.Message === "Success") {
                                showToaster("Pool has been assigned successfully", 'success');
                                let tempData: any = applicantsData;
                                for (let index = 0; index < applicantsData.length; index++) {
                                    //  rowData[tempData[index].ResumeId] = true;
                                    if (tempData[index].candId === candidateId) {

                                        tempData[index].poolCount = tempData[index].poolCount + 1;
                                        const arrPoolIds = tempData[index].poolIds;
                                        tempData[index].poolIds = [...arrPoolIds, selectedTalentPool.id];

                                        const arrPoolNames = tempData[index].poolNames;
                                        tempData[index].poolIds = [...arrPoolNames, selectedTalentPool.name];
                                    }
                                }
                                //    console.log("after : "+ tempData);
                                setApplicantsData(tempData);
                                //    loadCanidateData();
                            } else {
                                showToaster(response.data.Message ? response.data.Message : "An error occured while assigning ", 'error');
                            }
                            setSelectedTalentPool({ id: "", name: "" });
                        }
                    )
            )
        }
    }

    const handleTableMenuSendMailOpen = (sendMailId: any) => {
        if (sendMailId) {
            setDialogStatus(true);
            setEmailOnClicked(sendMailId);
            setTableOpenMail(null);
        }
        // console.log(sendMailId);
    };

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
        setTableOpenList(null);
        setTableOpenSequence(null);
        setTableOpenTelegram(null);
    };

    const handleShowCallSnack = (callId: any) => {
        setCallAnchorElement(null);
    };

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

    const handleShowSnack = (snackId: any) => {
        setTableOpenMail(null);
    };

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 50, //customize the default page size
    });
    const [sorting, setSorting] = useState<MRT_SortingState>([]);

    const applyFilters = (filterData: any, applied: boolean) => {
        // setMainJsonData(filterData);
        setSelectedRowCount(0);
        setRowSelection({});
        setIsSelectAllChecked(false);
        mainJsonDataRef.current = filterData;
        isFiltersApplied.current = applied;
        if (pagination.pageIndex === 0) {
            buildJson(0, 50, true);
        } else {
            setPagination({
                pageIndex: 0,
                pageSize: 50
            })
        }
    };

    const updateJobDetails = (id: string, name: string) => {
        selectedJob.current = {
            title: name,
            id: id,
        };
    };

    const handleClickAddToListen = (
        event: React.MouseEvent<HTMLButtonElement>, callId: any
    ) => {
        setAddToListAnchorEl(event.currentTarget);
        // loadDistributionList();
        setSelectedRowId(callId);
    };
    const openSequnceToolTip = (
        event: React.MouseEvent<HTMLButtonElement>, callId: any
    ) => {
        setTableOpenList(event.currentTarget);
        // loadDistributionList();
        setSelectedRowId(callId);
    };


    const handleTableSequence = (
        event: React.MouseEvent<HTMLButtonElement>, candId: any
    ) => {
        setTableOpenList(null);
        setOpenSequenceModal(true);
        // loadDistributionList();
        let candList = (candId != "") ? candId : Object.keys(rowSelection)
        setSelectSequenceList(candList);
    };



    const handleClickAddToPoolListen = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        setAddToPoolListAnchorEl(event.currentTarget);
        // loadDistributionList();
        // setSelectedRowId(callId);
    };


    const handleProfileMenuClose = () => {
        setAddToListAnchorEl(null);
        setAddToPoolListAnchorEl(null);
    };

    // const Userid = userLocalData.getvalue('recrId');
    // const Username = userLocalData.getvalue('userName');
    // const CompId = '12938';
    // const Compname = 'vali company 002';
    // const searchid = '0';
    // const companiesToCheck = 'vali company 002';

    const selectedJob = useRef({
        title: "",
        id: "",
    });

    const selectAllMenuItemClicked = (menuType: any) => {
        if (menuType === "page") {
            const startIndex = pagination.pageIndex * pagination.pageSize;
            const endIndex = Math.min(
                (pagination.pageIndex + 1) * pagination.pageSize,
                applicantsData.length
            );
            // console.log(endIndex)
            let checkedCheckboxesData: any = {};
            for (let index = 0; index < endIndex; index++) {
                checkedCheckboxesData[applicantsData[index].candId] = true;
            }
            // console.log(checkedCheckboxesData);
            // setRowPageIndex(0);
            setRowSelection(checkedCheckboxesData);
            currentSelectCount.current = Object.keys(rowSelection).length;
            setIsSelectAllChecked(false);
        } else if (menuType === "all") {
            currentSelectCount.current = (rowCount > 10000) ? 10000 : rowCount;

            // let pIndex = Math.ceil((currentSelectCount.current) / pagination.pageSize);
            // setRowPageIndex(pIndex);

            trackPromise(
                ApiService.getByParams(193, 'Curately/Community/community_data_all.jsp', {
                    jobid: isInJob ? jobIdFromJobPage : selectedJob.current.id,
                    json: JSON.stringify(jsonToPassRef.current),
                    client_subs: "0",
                    csninja: "0",
                    type: "" + tabValue,
                    clientId: "" + userLocalData.getvalue('clientId'),
                }).then(
                    (result: any) => {
                        console.log(result.data);
                        let rowData: any = {};

                        let tempData: any = (result.data?.data) ? result.data.data : [];
                        for (let index = 0; index < tempData.length; index++) {
                            if (tempData[index]?.trim()) {
                                rowData[tempData[index].trim()] = true;
                            }
                        }
                        setRowSelection(rowData);
                    }
                )
            )
            setIsSelectAllChecked(true);
        } else if (menuType === "clear") {
            setIsSelectAllChecked(false);
            setRowSelection({});
            // setRowPageIndex(0);
            currentSelectCount.current = 0;
        }
        setSelectAllElement(null);
    };

    const openCandidateView = (id: string) => {
        if (selectedJob.current.id || jobIdFromJobPage) {
            let tempJobId = selectedJob.current.id || jobIdFromJobPage;
            window.open(globalData.getWindowLocation() + "candidate/view/" + id.trim() + '/' + tempJobId);
        } else {
            window.open(globalData.getWindowLocation() + "candidate/view/" + id.trim());
        }
    };

    // const openCandidateEdit = (candidateId: string) => {
    //     trackPromise(
    //         ApiRequests.getByParams(193, "/Candidate/candidate_details.jsp", {
    //             candId: candidateId,
    //         }).then((response: any) => {
    //             const result = response.data;
    //             // console.log(result);
    //             setCandidateData({
    //                 firstName: String(result.firstName ? result.firstName : ""),
    //                 lastName: String(result.lastName ? result.lastName : ""),
    //                 linkedIn: String(result.linkedIn ? result.linkedIn : ""),
    //                 email: String(result.email ? result.email : ""),
    //                 email2: String(result.email2 ? result.email2 : ""),
    //                 cellPhone2: String(result.cellPhone2 ? result.cellPhone2 : ""),
    //                 workPhone: String(result.workPhone ? result.workPhone : ""),
    //                 street: String(result.street ? result.street : ""),
    //                 cellPhone: String(result.cellPhone ? result.cellPhone : ""),
    //                 zip: Number(result.zip ? result.zip : ""),
    //                 city: String(result.city ? result.city : ""),
    //                 state: String(result.state ? result.state : ""),
    //                 homePhone: String(result.homePhone ? result.homePhone : ""),
    //                 homePhone2: String(result.homePhone2 ? result.homePhone2 : ""),
    //             });
    //             updateDocumentTitle.set(
    //                 result.firstName + result.lastName + " | Candidate"
    //             );
    //             setOpenAddCandidateModal(true);
    //         })
    //     );
    //     // trackPromise(
    //     //     ApiRequests.getByParams(193, 'Candidate/candidate_overview.jsp', { candId: candidateId })
    //     //         .then((response: any) => {
    //     //             // console.log(response.data);
    //     //             setCanOverviewData(response.data);
    //     //         })
    //     // );
    // };

    // const loadDistributionList = () => {
    //     ApiRequests.getByParams(193, "distributionlist.jsp", {
    //         userId: userLocalData.getvalue("recrId"),
    //         type: "Candidate",
    //     }).then((response: any) => {
    //         setDistributionList(response.data);
    //     });
    // };

    const columns: MRT_ColumnDef<any>[] = useMemo(
        () => [
            {
                accessorKey: "name", //simple recommended way to define a column
                header: "Name",
                enableColumnPinning: true,
                accessorFn: row => `${row.first} ${row.last}`,
                Cell: ({ row }) => {
                    let first = row.original.first
                        ? row.original.first.toLowerCase()
                        : "";
                    let last = row.original.last ? row.original.last.toLowerCase() : "";
                    return (
                        <span
                            className="hightLightTd"
                            onClick={() => openCandidateView(row.original.candId)}
                        >
                            {first + " " + last}
                        </span>
                    );
                },
                size: 100,
            },
            {
                accessorKey: "score",
                header: "Score",
                // muiTableHeadCellProps: ({ column }) => ({
                //     sx: {
                //         display: Boolean(mainJsonData.parsedDocument) ? '' : 'none !important'
                //     },
                // }),
                // muiTableBodyCellProps: ({ column }) => ({
                //     sx: {
                //         display: Boolean(mainJsonData.parsedDocument) ? '' : 'none !important'
                //     },
                // }),
                Cell: ({ row }) =>
                    row.original.hasOwnProperty("score") ? (
                        <Box sx={{ position: "relative", display: "inline-flex" }}>
                            <CircularProgress
                                variant="determinate"
                                value={Math.round(row.original.score)}
                            />
                            <Box
                                sx={{
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    right: 0,
                                    position: "absolute",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Typography
                                    variant="caption"
                                    component="div"
                                    color="text.secondary"
                                >{`${Math.round(row.original.score)}%`}</Typography>
                            </Box>
                        </Box>
                    ) : null,
                size: 80,
            },
            {
                accessorKey: "jobTitle",
                header: "Job",
                Cell: ({ row }) => {
                    let jobTitle = row.original.jobTitle
                        ? row.original.jobTitle.toLowerCase()
                        : "";
                    let displayTitle =
                        jobTitle.length > 30 ? jobTitle.slice(0, 30) + "..." : jobTitle;
                    return (
                        jobTitle.length > 30 ?
                            <Tooltip
                                title={row.original.jobTitle}
                                classes={{ tooltip: "tt-capital" }}
                            >
                                <span>{displayTitle}</span>
                            </Tooltip>
                            :
                            <span>{displayTitle}</span>
                    );
                },
            },
            {
                accessorKey: "compName",
                header: "Company",
                Cell: ({ row }) => {
                    let compName = row.original.compName
                        ? row.original.compName.toLowerCase()
                        : "";
                    let displayTitle =
                        compName.length > 30 ? compName.slice(0, 30) + "..." : compName;
                    return (
                        compName.length > 30 ?
                            <Tooltip
                                title={row.original.compName}
                                classes={{ tooltip: "tt-capital" }}
                            >
                                <span>{displayTitle}</span>
                            </Tooltip>
                            :
                            <span>{displayTitle}</span>
                    );
                },
            },
            // {
            //     accessorKey: "compName",
            //     header: "Company"
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
                                // width: "33px",
                                height: "31px",
                                "& .MuiButtonGroup-grouped": {
                                    marginRight: "1px",
                                },
                            }}
                        >
                            <Tooltip title={row.original.email} placement="top">
                                <Button
                                    id={`mailbutton-${row.id}`}
                                    onClick={e => {
                                        if (row.original.email) {
                                            setMenuData({
                                                rowId: row.id,
                                                email: row.original.email,
                                                first: row.original.first,
                                                candId: row.original.candId,
                                                jobId: row.original.jobId,
                                                phone: "",
                                                poolCount: row.original.poolCount,
                                                poolIds: row.original.poolIds,
                                                poolNames: row.original.poolNames,
                                                sequenceIds: row.original.sequenceIds,
                                                sequenceNames: row.original.sequenceNames,
                                                sequenceCount: row.original.sequenceCount,
                                                linkedIn: row.original.linkedIn
                                            });
                                            handleTableMail(e, `${row.id}`);
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
                                    }
                                    sx={{
                                        pointerEvents: row.original.email ? "auto" : "none",
                                        borderColor:
                                            openTableMail && selectedRowId === `${row.id}`
                                                ? "1px solid var(--c-neutral-40)"
                                                : "var(--c-secondary-color)",
                                        backgroundColor: "#ffffff",
                                        color:
                                            openTableMail && selectedRowId === `${row.id}`
                                                ? "1px solid var(--c-neutral-40)"
                                                : "#919191",
                                        borderRightColor:
                                            openTableMail && selectedRowId === `${row.id}`
                                                ? "1px solid var(--c-neutral-40)"
                                                : "var(--c-secondary-color)",
                                        mr: "0px",
                                        "&:hover": {
                                            border: "1px solid var(--c-neutral-40)",
                                            color: "#919191",
                                            backgroundColor: "#ffffff",
                                        },
                                        width: "33px",
                                    }}
                                    className="customButtonForHover"

                                // sx={{
                                //     borderColor: "var(--c-secondary-color)",
                                //     backgroundColor: "#ffffff",
                                //     color: "#919191",
                                //     borderRightColor: "var(--c-secondary-color)",
                                //     width: "33px",
                                // }}
                                >
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
                                    {/* <ArrowDropDownIcon
                                        sx={{
                                            fontSize: "16px",
                                        }}
                                    /> */}
                                </Button>
                            </Tooltip>

                            <Tooltip title={`${USPhoneFormat.get(row.original.phone)}`} placement="top">
                                <Button
                                    id={`phonebutton-${row.id}`}
                                    disableRipple
                                    onClick={e => {
                                        if (row.original.phone) {
                                            setMenuData({
                                                rowId: row.id,
                                                email: "",
                                                first: row.original.first,
                                                candId: row.original.candId,
                                                jobId: row.original.jobId,
                                                phone: row.original.phone,
                                                poolCount: row.original.poolCount,
                                                poolIds: row.original.poolIds,
                                                poolNames: row.original.poolNames,
                                                sequenceIds: row.original.sequenceIds,
                                                sequenceNames: row.original.sequenceNames,
                                                sequenceCount: row.original.sequenceCount,
                                                linkedIn: row.original.linkedIn
                                            });
                                            handleTableCall(e, `${row.id}`);
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
                                    className={`customButtonForHover ${row.original.phone === "" ? "disabled" : ""
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

                            <Tooltip title={`${Number(row.original.poolCount) ? `In ${row.original.poolCount} Pool${Number(row.original.poolCount) > 1 ? "s" : ""}` : `Add to Pool`}`} placement="top">
                                <Button
                                    id={`poollistbutton-${row.id}`}
                                    disableRipple

                                    aria-controls={
                                        openAddToListenBtn && selectedRowId === `${row.id}`
                                            ? `addlistmenu-${row.id}`
                                            : undefined
                                    }
                                    aria-haspopup="true"
                                    aria-expanded={
                                        openAddToListenBtn && selectedRowId === `${row.id}`
                                            ? "true"
                                            : undefined
                                    }

                                    // onClick={handleClickAddToListen}
                                    // onClick={(e) => {
                                    //     if (row.original.candId) {
                                    //         setMenuData({
                                    //             rowId: row.id,
                                    //             email: '',
                                    //             first: row.original.first,
                                    //             candId: row.original.candId,
                                    //             jobId: row.original.jobId,
                                    //             phone: row.original.phone
                                    //         })
                                    //         handleTableList(e, `${row.id}`)
                                    //     }
                                    // }
                                    // }
                                    // aria-controls={
                                    //     openCallMenu && selectedRowId === `${row.id}`
                                    //         ? `list-${row.id}` : undefined
                                    // }
                                    // aria-haspopup="true"
                                    // aria-expanded={
                                    //     openCallMenu && selectedRowId === `${row.id}` ? "true" : undefined
                                    // }
                                    onClick={e => {
                                        if (row.original.candId) {
                                            setMenuData({
                                                rowId: row.id,
                                                email: "",
                                                first: row.original.first,
                                                candId: row.original.candId,
                                                jobId: row.original.jobId,
                                                phone: row.original.phone,
                                                poolCount: row.original.poolCount,
                                                poolIds: row.original.poolIds,
                                                poolNames: row.original.poolNames,
                                                sequenceIds: row.original.sequenceIds,
                                                sequenceNames: row.original.sequenceNames,
                                                sequenceCount: row.original.sequenceCount,
                                                linkedIn: row.original.linkedIn
                                            });

                                        }
                                        handleClickAddToListen(e, row.id);
                                    }}

                                    className="customButtonForHover"
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
                                    <PlaylistAddOutlinedIcon
                                        sx={{
                                            fontSize: "16px",
                                        }}
                                    />
                                    {
                                        Number(row.original.poolCount) ?
                                            <span>{row.original.poolCount}</span>
                                            :
                                            null
                                    }
                                    {/* <ArrowDropDownIcon
                                        sx={{
                                            fontSize: "16px",
                                        }}
                                    /> */}
                                </Button>
                            </Tooltip>
                            <Tooltip
                                title={`${Number(row.original.sequenceCount) ? `In ${row.original.sequenceCount} Campaign${Number(row.original.sequenceCount) > 1 ? "s" : ""}` : `Add to Campaign`}`}
                                // title={`${Number(row.original.sequenceIds) ? `In ${row.original.sequenceIds} Sequence${Number(row.original.sequenceIds) > 1 ? "s" : ""}` : `Add to Sequence`}`}
                                placement="top"
                            >
                                <Button
                                    id={`sequencebutton-${row.id}`}
                                    disableRipple
                                    onClick={e => {
                                        if (row.original.candId) {
                                            setMenuData({
                                                rowId: row.id,
                                                email: "",
                                                first: row.original.first,
                                                candId: row.original.candId,
                                                jobId: row.original.jobId,
                                                phone: row.original.phone,
                                                poolCount: row.original.poolCount,
                                                poolIds: row.original.poolIds,
                                                poolNames: row.original.poolNames,
                                                sequenceIds: row.original.sequenceIds,
                                                sequenceNames: row.original.sequenceNames,
                                                sequenceCount: row.original.sequenceCount,
                                                linkedIn: row.original.linkedIn
                                            });
                                            // handleTableSequence(e, row.original.candId)
                                            openSequnceToolTip(e, row.original.candId);
                                        }
                                    }}
                                    aria-controls={
                                        openTableSequence && selectedRowId === `${row.id}`
                                            ? `sequence-${row.id}`
                                            : undefined
                                    }
                                    aria-haspopup="true"
                                    aria-expanded={
                                        openTableSequence && selectedRowId === `${row.id}`
                                            ? "true"
                                            : undefined
                                    }
                                    className="customButtonForHover"
                                    sx={{
                                        borderColor:
                                            openTableSequence && selectedRowId === `${row.id}`
                                                ? "1px solid var(--c-neutral-40)"
                                                : "var(--c-secondary-color)",
                                        backgroundColor: "#ffffff",
                                        color:
                                            openTableSequence && selectedRowId === `${row.id}`
                                                ? "#919191"
                                                : "#919191",
                                        "& .MuiButtonGroup-root .MuiButtonGroup-grouped:not(:last-of-type)":
                                        {
                                            borderRightColor:
                                                openTableSequence && selectedRowId === `${row.id}`
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
                                    <SendOutlinedIcon
                                        sx={{
                                            fontSize: "16px",
                                        }}
                                    />
                                    {
                                        Number(row.original.sequenceCount) ?
                                            <span>{row.original.sequenceCount}</span>
                                            :
                                            null
                                    }
                                    {/* <ArrowDropDownIcon
                                        sx={{
                                            fontSize: "16px",
                                        }}
                                    /> */}
                                </Button>
                            </Tooltip>

                            {row.original.notInvited ? (
                                <Tooltip title="Invite" placement="top">
                                    <Button
                                        className="customButtonForHover"
                                        disableRipple
                                        sx={{
                                            border: "1px solid var(--c-neutral-40)",
                                            backgroundColor: "#ffffff",
                                            color: "#919191",
                                            width: "33px",
                                        }}
                                        id="add-telegram-btn"
                                        aria-controls={
                                            openTableTelegram ? "addtelegrammenu" : undefined
                                        }
                                        aria-haspopup="true"
                                        aria-expanded={openTableTelegram ? "true" : undefined}
                                        onClick={handleClickAddTeligram}
                                    >
                                        <TelegramIcon
                                            sx={{
                                                // height: "20px",
                                                // width: "15px",
                                                fontSize: "16px",
                                            }}
                                        />
                                    </Button>
                                </Tooltip>
                            ) : null}
                            {/* <Tooltip title="Edit" placement="top">
                                <Button
                                    className="customButtonForHover"
                                    sx={{
                                        borderColor: "var(--c-secondary-color)",
                                        backgroundColor: "#ffffff",
                                        color: "#919191",
                                        width: "33px",
                                    }}
                                    onClick={() => openCandidateEdit(row.original.candId)}
                                >
                                    <EditIcon
                                        sx={{
                                            // height: "20px",
                                            // width: "15px",
                                            fontSize: "16px",
                                        }}
                                    />
                                </Button>
                            </Tooltip> */}
                        </ButtonGroup>
                    </Stack>
                ),
                size: 100,
            },


            // {
            //     accessorKey: "phone",
            //     header: "Phone"
            // },
            // {
            //     accessorKey: "city",
            //     header: "City"
            // },
            // {
            //     accessorKey: "state",
            //     header: "State",
            //     size: 50
            // },
            // {
            //     accessorKey: "zipCode",
            //     header: "Zip Code",
            //     size: 50
            // },
            {
                accessorKey: "city",
                header: "Location",
                Cell: ({ row }) => (
                    <span className="location">
                        {row.original.city}
                        {row.original.city && row.original.state ? ", " : ""}
                        {row.original.state}
                        {row.original.state && row.original.zipCode ? ", " : ""}
                        {row.original.zipCode}
                    </span>
                ),
            },
            {
                accessorKey: "date",
                header: "Date",
                Cell: ({ row }) => (
                    <span>
                        {DateTime.fromFormat(
                            row.original.date.substring(0, 19),
                            "yyyy-MM-dd hh:mm:ss"
                        ).toFormat("MM/dd/yyyy ")}
                    </span>
                ),
                size: 80,
            },
        ],

        []
    );

    const toggleFilers = () => {
        setFiltersExpand(!filtersExpand);
    };

    const buildJson = async (
        pageNumber = 0,
        pageSize = 50,
        // passedJsonDataFromFilters: any,
        count: boolean,
        userId?: string
    ) => {
        let passedJsonData = { ...mainJsonDataRef.current };
        let jsonToPass: any;
        if (passedJsonData.jobTitles) {
            if (talentPoolId) {
                passedJsonData.talentPoolId = talentPoolId;
            }
            // console.log(passedJsonData);
            if (passedJsonData.location.zipCode) {
                if (passedJsonData.location.radius === "") {
                    showToaster("Distance is Mandatory", "error");
                    return false;
                }
            }

            jsonToPass = JSON.parse(JSON.stringify(MASTER_JSON_COMMUNITY));

            // $('#badges').empty();
            // $(".hideIf").hide();

            jsonToPass.PaginationSettings.Skip = pageNumber * pageSize;
            jsonToPass.PaginationSettings.Take = pageSize;

            let jobtitlesTemp: any = [];
            let skillsTemp: any = [];
            for (let i = 0; i < passedJsonData.jobTitles.length; i++) {
                if (passedJsonData.jobTitles[i].title !== "") {
                    jsonToPass.FilterCriteria.JobTitles.push({
                        Title: passedJsonData.jobTitles[i].title,
                        IsCurrent: passedJsonData.jobTitles[i].required,
                    });
                    jobtitlesTemp.push(passedJsonData.jobTitles[i].title);
                    // let badNum = passedJsonData.jobTitles.eq(i).find('input[type="text"]').attr('id').replace(/^\D+/g, '');

                    // $('#badges').append(`<button type="button" class="btn btn-outline-light text-dark border mr-2 mb-1 badgeadded" id="jobtitleBadge` + badNum + `" onclick='removeBadge("jobtitle","` + badNum + `")'> Job Titles : ` + passedJsonData.jobTitles[i].title + `<span class="badge ml-2 rounded-0"><i class="fas fa-times"></i></span> </button>`);
                }
            }
            let d = new Date();
            d.setDate(d.getDate() - Number(passedJsonData.daysBack));
            let tempFullYear = d.getFullYear();
            let tempMonth: string | number = d.getMonth() + 1;
            let tempDate: string | number = d.getDate();
            if (tempMonth < 10) {
                tempMonth = "0" + tempMonth;
            }
            if (tempDate < 10) {
                tempDate = "0" + tempDate;
            }
            let d1 = new Date();
            let tempFullYear1 = d1.getFullYear();
            let tempMonth1: string | number = d1.getMonth() + 1;
            let tempDate1: string | number = d1.getDate();
            if (tempMonth1 < 10) {
                tempMonth1 = "0" + tempMonth1;
            }
            if (tempDate1 < 10) {
                tempDate1 = "0" + tempDate1;
            }
            // "2020-06-23"
            jsonToPass.FilterCriteria.RevisionDateRange.Minimum =
                tempFullYear + "-" + tempMonth + "-" + tempDate;
            jsonToPass.FilterCriteria.RevisionDateRange.Maximum =
                tempFullYear1 + "-" + tempMonth1 + "-" + tempDate1;

            jsonToPass.FilterCriteria.MonthsExperience.Minimum =
                parseInt(passedJsonData.minExp) * 12;
            jsonToPass.FilterCriteria.MonthsExperience.Maximum =
                parseInt(passedJsonData.maxExp) * 12;
            // if (passedJsonData.minExp != '' && passedJsonData.maxExp != '') {
            //     $('#badges').append(`<button type="button" class="btn btn-outline-light text-dark border mr-2 mb-1 badgeadded" id="expBadge1" onclick='removeExpBadge("month","1")'> Exp : ` + passedJsonData.minExp + ` - ` + passedJsonData.maxExp + `<span class="badge ml-2 rounded-0"><i class="fas fa-times"></i></span> </button>`);
            // } else if (passedJsonData.minExp != '') {
            //     $('#badges').append(`<button type="button" class="btn btn-outline-light text-dark border mr-2 mb-1 badgeadded" id="expBadge1" onclick='removeExpBadge("month","1")'> Exp : ` + passedJsonData.minExp + `<span class="badge ml-2 rounded-0"><i class="fas fa-times"></i></span> </button>`);
            // } else if (passedJsonData.maxExp != '') {
            //     $('#badges').append(`<button type="button" class="btn btn-outline-light text-dark border mr-2 mb-1 badgeadded" id="expBadge1" onclick='removeExpBadge("month","1")'> Exp : ` + passedJsonData.maxExp + `<span class="badge ml-2 rounded-0"><i class="fas fa-times"></i></span> </button>`);
            // }

            jsonToPass.FilterCriteria.MonthsManagementExperience.Minimum =
                Number(passedJsonData.minManExp) * 12;
            jsonToPass.FilterCriteria.MonthsManagementExperience.Maximum =
                Number(passedJsonData.maxManExp) * 12;
            // if (Number(passedJsonData.minManExp) && Number(passedJsonData.maxManExp)) {
            //     $('#badges').append(`<button type="button" class="btn btn-outline-light text-dark border mr-2 mb-1 badgeadded" id="expBadge2" onclick='removeExpBadge("manage","2")'>Management Exp : ` + Number(passedJsonData.minManExp) + ` - ` + Number(passedJsonData.maxManExp) + `<span class="badge ml-2 rounded-0"><i class="fas fa-times"></i></span> </button>`);
            // } else if (Number(passedJsonData.minManExp)) {
            //     $('#badges').append(`<button type="button" class="btn btn-outline-light text-dark border mr-2 mb-1 badgeadded" id="expBadge2" onclick='removeExpBadge("manage","2")'>Management Exp : ` + Number(passedJsonData.minManExp) + `<span class="badge ml-2 rounded-0"><i class="fas fa-times"></i></span> </button>`);
            // } else if (Number(passedJsonData.maxManExp)) {
            //     $('#badges').append(`<button type="button" class="btn btn-outline-light text-dark border mr-2 mb-1 badgeadded" id="expBadge2" onclick='removeExpBadge("manage","2")'>Management Exp : ` + Number(passedJsonData.maxManExp) + `<span class="badge ml-2 rounded-0"><i class="fas fa-times"></i></span> </button>`);
            // }

            for (let i = 0; i < passedJsonData.skills.length; i++) {
                if (passedJsonData.skills[i].skillName !== "") {
                    jsonToPass.FilterCriteria.Skills.push({
                        SkillName: passedJsonData.skills[i].skillName,
                        ExperienceLevel: passedJsonData.skills[i].experLevel
                            ? passedJsonData.skills[i].experLevel
                            : "",
                        IsCurrent: passedJsonData.skills[i].recentUse ? true : false,
                    });
                    skillsTemp.push(passedJsonData.skills[i].skillName);
                    // let badNum = passedJsonData.skills.eq(i).find('input[type="text"]').attr('id').replace(/^\D+/g, '');

                    // $('#badges').append(`<button type="button" class="btn btn-outline-light text-dark border mr-2 mb-1 badgeadded" id="skillBadge` + badNum + `" onclick='removeBadge("skillName","` + badNum + `")'> Skills : ` + passedJsonData.skills[i].skillName + `<span class="badge ml-2 rounded-0"><i class="fas fa-times"></i></span> </button>`);
                }
            }
            jsonToPass.FilterCriteria.SkillsMustAllExist =
                passedJsonData.allSkills === "must" ? true : false;
            jsonToPass.FilterCriteria.SearchExpression = passedJsonData.keywords
                ? passedJsonData.keywords.replace(/["]/g, '"')
                : "";

            if (!Array.isArray(passedJsonData.languageSpoken)) {
                passedJsonData.languageSpoken = passedJsonData.languageSpoken
                    ? passedJsonData.languageSpoken.split(",")
                    : [];
            }
            let spokenLang = [];
            for (let i = 0; i < passedJsonData.languageSpoken.length; i++) {
                if (passedJsonData.languageSpoken[i]) {
                    spokenLang.push(passedJsonData.languageSpoken[i]);
                    // // let badNum = passedJsonData.languageSpoken[i].attr('id').replace(/^\D+/g, '');

                    // let spknTypeList = [];
                    // $('#languageSpoken').data('tokenize2').toArray().forEach(element => {
                    //     spknTypeList.push(LANGUAGES.find(function (e) { return e.id === element; }).name);
                    // })
                    // $('#badges').append(`<button type="button" class="btn btn-outline-light text-dark border mr-2 mb-1 badgeadded" id="degreeTypeBadge" onclick='removeLangBadge()'> Languages : ` + spknTypeList.join(', ') + `<span class="badge ml-2 rounded-0"><i class="fas fa-times"></i></span> </button>`);
                }
            }
            jsonToPass.FilterCriteria.LanguagesKnown = passedJsonData.languageSpoken;

            // if ($('#workauth').val().length) {
            //     $('#badges').append(`<button type="button" class="btn btn-outline-light text-dark border mr-2 mb-1 badgeadded" id="workAuthBadge" onclick='removeworkAuthBadge()'> Work Authorization : ` + $('#workauth').val().join(', ') + `<span class="badge ml-2 rounded-0"><i class="fas fa-times"></i></span> </button>`);
            // }
            if (passedJsonData.workAuthorization.title) {
                jsonToPass.FilterCriteria.CustomValueIds.push(
                    passedJsonData.workAuthorization.title
                );
            }


            // if ($('#searchClient').is(":checked")) {
            //     jsonToPass.FilterCriteria.CustomValueIds.push('CSB');
            // }
            // if ($('#csNinja').is(":checked")) {
            //     jsonToPass.FilterCriteria.CustomValueIds.push('CSNINJA');
            // }
            jsonToPass.FilterCriteria.CustomValueIdsMustAllExist =
                passedJsonData.workAuthorization.required;

            let certiTemp = [];
            for (let i = 0; i < passedJsonData.certifications.length; i++) {
                if (passedJsonData.certifications[i].certificationName) {
                    certiTemp.push(passedJsonData.certifications[i].certificationName);
                    // let badNum = passedJsonData.certifications.eq(i).find('input[type="text"]').attr('id').replace(/^\D+/g, '');

                    // $('#badges').append(`<button type="button" class="btn btn-outline-light text-dark border mr-2 mb-1 badgeadded" id="certificateBadge` + badNum + `" onclick='removeBadge("certificate","` + badNum + `")'> Certifications : ` + passedJsonData.certifications[i].certificationName + `<span class="badge ml-2 rounded-0"><i class="fas fa-times"></i></span> </button>`);
                }
            }
            jsonToPass.FilterCriteria.Certifications = certiTemp.filter(
                (value, index, array) => array.indexOf(value) === index
            );
            let getZip: any = {};
            if (passedJsonData.location.zipCode) {
                getZip = await getZipcode(passedJsonData.location.zipCode);
                // if (getZip.trim() !== {}) {
                //     getZip = JSON.parse(getZip.trim());
                // }
                let lat = (getZip.data && getZip.data.Latitude) ? getZip.data.Latitude : 0;
                let long = (getZip.data && getZip.data.Longitude) ? getZip.data.Longitude : 0;
                // // {"Latitude":"33.774347","Longitude":"-84.291903"}

                jsonToPass.FilterCriteria.LocationCriteria = {
                    Locations: [
                        {
                            CountryCode: "",
                            Region: "",
                            Municipality: "",
                            PostalCode: passedJsonData.location.zipCode,
                            GeoPoint: {
                                Latitude: lat,
                                Longitude: long,
                            },
                        },
                    ],
                    Distance: passedJsonData.location.radius
                        ? passedJsonData.location.radius
                        : 0,
                    DistanceUnit: "Miles",
                    GeocodeProvider: "Google",
                    GeocodeProviderKey: import.meta.env.VITE_GEOCODEPROVIDERKEY,
                };
            } else {
                if (!Array.isArray(passedJsonData.location.state)) {
                    passedJsonData.location.state = passedJsonData.location.state
                        ? passedJsonData.location.state.split(",")
                        : [];
                }
                jsonToPass.FilterCriteria.LocationCriteria = {
                    Locations: [
                        {
                            CountryCode: "",
                            Region: passedJsonData.location.state.length
                                ? passedJsonData.location.state[0]
                                : "",
                            Municipality: "",
                            PostalCode: "",
                            GeoPoint: {
                                Latitude: 0,
                                Longitude: 0,
                            },
                        },
                    ],
                    Distance: 0,
                    DistanceUnit: "Miles",
                    GeocodeProvider: "Google",
                    GeocodeProviderKey: import.meta.env.VITE_GEOCODEPROVIDERKEY,
                };
                for (
                    let locai = 0;
                    locai < passedJsonData.location.state.length;
                    locai++
                ) {
                    if (locai) {
                        jsonToPass.FilterCriteria.LocationCriteria.Locations.push({
                            CountryCode: "",
                            Region: passedJsonData.location.state[locai],
                            Municipality: "",
                            PostalCode: "",
                            GeoPoint: {
                                Latitude: 0,
                                Longitude: 0,
                            },
                        });
                    }
                }
            }
            // if (passedJsonData.location.state.length || passedJsonData.location.zipCode !== '' || passedJsonData.location.radius !== '') {

            // $('#badges').append(`<button type="button" class="btn btn-outline-light text-dark border mr-2 mb-1 badgeadded" id="locationBadge" onclick='removeLocaBadge()'> Location : ` + passedJsonData.location.state.join() + ` ` + passedJsonData.location.zipCode + ` ` + passedJsonData.location.radius + `<span class="badge ml-2 rounded-0"><i class="fas fa-times"></i></span> </button>`);
            // }

            // DegreeTypes

            // "IsTopStudent": false,
            // "IsCurrentStudent": false,
            // "IsRecentGraduate": false,

            // jsonToPass.FilterCriteria.IsTopStudent = $('#IsTopStudent').is(':checked');
            // jsonToPass.FilterCriteria.IsCurrentStudent = $('#IsCurrentStudent').is(':checked');
            // jsonToPass.FilterCriteria.IsRecentGraduate = $('#IsRecentGraduate').is(':checked');
            let degreeTypesTemp = [];
            for (let i = 0; i < passedJsonData.degrees.length; i++) {
                if (passedJsonData.degrees[i].degreeName) {
                    degreeTypesTemp.push(passedJsonData.degrees[i].degreeName.val());
                    // // let badNum = passedJsonData.degrees[i].degreeName.attr('id').replace(/^\D+/g, '');

                    // let degreeTypesLst = [];
                    // $('#degTypes').data('tokenize2').toArray().forEach(element => {
                    //     degreeTypesLst.push(DEGREE_TYPES.find(function (e) { return e.value === element; }).text);
                    // })
                    // $('#badges').append(`<button type="button" class="btn btn-outline-light text-dark border mr-2 mb-1 badgeadded" id="degreeTypeBadge" onclick='removeDegTypeBadge()'> Degree Type : ` + degreeTypesLst.join(', ') + `<span class="badge ml-2 rounded-0"><i class="fas fa-times"></i></span> </button>`);
                }
            }
            jsonToPass.FilterCriteria.DegreeTypes = passedJsonData.degTypes;
            jsonToPass.FilterCriteria.IsTopStudent = passedJsonData.IsTopStudent;
            jsonToPass.FilterCriteria.IsCurrentStudent =
                passedJsonData.IsCurrentStudent;
            jsonToPass.FilterCriteria.IsRecentGraduate =
                passedJsonData.IsRecentGraduate;

            let schoolNamesTemp = [];
            for (let i = 0; i < passedJsonData.schools.length; i++) {
                if (passedJsonData.schools[i].schoolName) {
                    schoolNamesTemp.push(passedJsonData.schools[i].schoolName);
                    // let badNum = passedJsonData.schools.eq(i).find('input[type="text"]').attr('id').replace(/^\D+/g, '');

                    // $('#badges').append(`<button type="button" class="btn btn-outline-light text-dark border mr-2 mb-1 badgeadded" id="schoolBadge` + badNum + `" onclick='removeBadge("school","` + badNum + `")'> School : ` + passedJsonData.schools[i].schoolName + `<span class="badge ml-2 rounded-0"><i class="fas fa-times"></i></span> </button>`);
                }
            }
            jsonToPass.FilterCriteria.SchoolNames = schoolNamesTemp.filter(
                (value, index, array) => array.indexOf(value) === index
            );

            let degreeNamesTemp = [];
            for (let i = 0; i < passedJsonData.degrees.length; i++) {
                if (passedJsonData.degrees[i].degreeName) {
                    degreeNamesTemp.push(passedJsonData.degrees[i].degreeName);
                    // let badNum = passedJsonData.degrees.eq(i).find('input[type="text"]').attr('id').replace(/^\D+/g, '');

                    // $('#badges').append(`<button type="button" class="btn btn-outline-light text-dark border mr-2 mb-1 badgeadded" id="degreeBadge` + badNum + `" onclick='removeBadge("degree","` + badNum + `")'> Degree : ` + passedJsonData.degrees[i].degreeName + `<span class="badge ml-2 rounded-0"><i class="fas fa-times"></i></span> </button>`);
                }
            }
            jsonToPass.FilterCriteria.DegreeNames = degreeNamesTemp.filter(
                (value, index, array) => array.indexOf(value) === index
            );

            let empNamesTemp: string[] = [];
            for (let i = 0; i < passedJsonData.employer.length; i++) {
                if (passedJsonData.employer[i].employerName) {
                    empNamesTemp.push(passedJsonData.employer[i].employerName);
                    // let badNum = passedJsonData.employer.eq(i).find('input[type="text"]').attr('id').replace(/^\D+/g, '');

                    // $('#badges').append(`<button type="button" class="btn btn-outline-light text-dark border mr-2 mb-1 badgeadded" id="employerBadge` + badNum + `" onclick='removeBadge("employer","` + badNum + `")'> Employer : ` + passedJsonData.employer[i].employerName + `<span class="badge ml-2 rounded-0"><i class="fas fa-times"></i></span> </button>`);
                }
            }
            jsonToPass.FilterCriteria.Employers = empNamesTemp.filter(
                (value, index, array) => array.indexOf(value) === index
            );

            let taxoTemp = [];
            for (let i = 0; i < passedJsonData.industries.length; i++) {
                if (passedJsonData.industries[i].indcate) {
                    if (passedJsonData.industries[i].subCat !== "")
                        taxoTemp.push(passedJsonData.industries[i].subCat);
                    else taxoTemp.push(passedJsonData.industries[i].indcate);

                    // let badNum = passedJsonData.industries.eq(i).find('select[type="text"]').attr('id').replace(/^\D+/g, '');

                    // $('#badges').append(`<button type="button" class="btn btn-outline-light text-dark border mr-2 mb-1 badgeadded" id="industryBadge` + badNum + `" onclick='removeIndustryBadge("` + badNum + `")'> Industry : ` + passedJsonData.industries.eq(i).find('select[type="text"].industry option:selected').text() + ` - ` + passedJsonData.industries.eq(i).find('select[type="text"].subIndustry option:selected').text() + ` <span class="badge ml-2 rounded-0"><i class="fas fa-times"></i></span> </button>`);
                }
            }
            // if ($('#searchClient').is(":checked")) {
            //     if (!docsLoaded) {
            //         docIdsTemp = JSON.parse(await getDocids());
            //         docsLoaded = true;
            //     }
            //     jsonToPass.FilterCriteria.DocumentIds = docIdsTemp;

            // }

            jsonToPass.FilterCriteria.Taxonomies = taxoTemp.filter(
                (value, index, array) => array.indexOf(value) === index
            );
            // console.log(jsonToPass);
            // let postData = {
            //     json: jsonToPass
            // }
            // let jsonToPassForIds = jsonToPass;
            // if ($('#csNinja').is(":checked") && ($('#CLIK').val() || $('#CCAT').val() || $('#EPP').val() || $('#Excel').val() || $('#TT').val() || $('#tenKey').val() || $('#Word').val())) {
            //     $.post('csninja_mongo_results.jsp', {
            //         // jobid: JobId,
            //         // json: JSON.stringify(jsonToPass),
            //         // client_subs: ($('#searchClient').is(":checked")) ? '1' : '0',
            //         csninja: ($('#csNinja').is(":checked")) ? '1' : '0',
            //         CLIK: $('#CLIK').val(),
            //         CCAT: $('#CCAT').val(),
            //         EPP: $('#EPP').val(),
            //         Excel: $('#Excel').val(),
            //         TT: $('#TT').val(),
            //         tenKey: $('#tenKey').val(),
            //         Word: $('#Word').val(),
            //         next: jsonToPass.PaginationSettings.Skip
            //     }, function (data) {
            //         var allData = JSON.parse(data);
            //         if (allData && allData.data) {
            //             excelDataToDownload = allData.data;
            //         } else {
            //             excelDataToDownload = [];
            //         }
            //         addCand(allData, num, $('#keywords').val().replace(/["]/g, "\""), jobtitlesTemp.join(), empNamesTemp.join(), skillsTemp.join());
            //     });
            // } else {

            // https://resume.accuick.com/Sovren/sovren_results_curately.jsp


            if (passedJsonData.parsedDocument) {
                passedJsonData.CategoryWeights = [
                    {
                        Category: "JOB_TITLES",
                        Weight: (passedJsonData?.weightage?.length && (passedJsonData?.weightage[0] || passedJsonData?.weightage[0] === 0)) ? (passedJsonData.weightage[0] / 100) : 0.45,
                    },
                    {
                        Category: "SKILLS",
                        Weight: (passedJsonData?.weightage?.length && (passedJsonData?.weightage?.length > 1) && (passedJsonData?.weightage[1] || passedJsonData?.weightage[1] === 0)) ? (passedJsonData.weightage[1] / 100) : 0.45,
                    },
                    {
                        Category: "EDUCATION",
                        Weight: (passedJsonData?.weightage?.length && (passedJsonData?.weightage?.length > 2) && (passedJsonData?.weightage[2] || passedJsonData?.weightage[2] === 0)) ? (passedJsonData.weightage[2] / 100) : 0.1,
                    },
                ];
                jsonToPass.CategoryWeights = [
                    {
                        Category: "JOB_TITLES",
                        Weight: (passedJsonData?.weightage?.length && (passedJsonData?.weightage[0] || passedJsonData?.weightage[0] === 0)) ? (passedJsonData.weightage[0] / 100) : 0.45,
                    },
                    {
                        Category: "SKILLS",
                        Weight: (passedJsonData?.weightage?.length && (passedJsonData?.weightage?.length > 1) && (passedJsonData?.weightage[1] || passedJsonData?.weightage[1] === 0)) ? (passedJsonData.weightage[1] / 100) : 0.45,
                    },
                    {
                        Category: "EDUCATION",
                        Weight: (passedJsonData?.weightage?.length && (passedJsonData?.weightage?.length > 2) && (passedJsonData?.weightage[2] || passedJsonData?.weightage[2] === 0)) ? (passedJsonData.weightage[2] / 100) : 0.1,
                    },
                ];
            } else {
                passedJsonData.CategoryWeights = [];
                jsonToPass.CategoryWeights = [];
            }

            jsonToPass.ParsedDocument = passedJsonData.parsedDocument
                ? passedJsonData.parsedDocument
                : "";
            // let bodyFormData = new FormData();
            // return
            if (tabValue !== "All") {
                // 'All'
                // 'Joined'
                // 'Pending'
                // 'Not Invited'
                // 'Talent Pool'
                jsonToPass.FilterCriteria.CustomValueIdsMustAllExist = true;
                // if (jsonToPass.FilterCriteria.CustomValueIds.length) {
                //     jsonToPass.FilterCriteria.CustomValueIds.push(tabValue.replace(/\s+/g, ""));
                // } else {
                jsonToPass.FilterCriteria.CustomValueIds.push(tabValue.replace(/\s+/g, ""));

                if (passedJsonData.workAuthorization.title) {
                    jsonToPass.FilterCriteria.CustomValueIds.push(
                        passedJsonData.workAuthorization.title
                    );
                }
                // }
            } else {
                jsonToPass.IndexIdsToSearchInto = ["curately_" + userLocalData.getvalue('clientId')];
            }
            if (tabValue === "Talent Pool") {
                // jsonToPass.IndexIdsToSearchInto = ["talentpool_" + userLocalData.getvalue('clientId')];
                // jsonToPass.FilterCriteria.CustomValueIds.push("talentpool");
                if (jsonToPass.FilterCriteria.CustomValueIds.length) {
                    jsonToPass.FilterCriteria.CustomValueIds = jsonToPass.FilterCriteria.CustomValueIds.filter((e: string) => e !== 'TalentPool');
                }
                // jsonToPass.FilterCriteria.CustomValueIds.push("talentpool");
                // jsonToPass.FilterCriteria.CustomValueIds = [];
                jsonToPass.FilterCriteria.CustomValueIdsMustAllExist = false;
            }
            if (passedJsonData.talentPoolId) {
                // jsonToPass.IndexIdsToSearchInto = ["talentpool_" + userLocalData.getvalue('clientId')];
                jsonToPass.FilterCriteria.CustomValueIds.push(
                    "poolid" + passedJsonData.talentPoolId
                );
                // if (jsonToPass.FilterCriteria.CustomValueIds.length) {
                // } else {
                //     jsonToPass.FilterCriteria.CustomValueIds = [
                //         "poolid_" + passedJsonData.talentPoolId,
                //     ];
                // }
            }


            if (passedJsonData.tagId) {
                let tagIdTemp = [];
                tagIdTemp = passedJsonData.tagId.split(',');
                for (let i = 0; i < tagIdTemp.length; i++) {
                    if (tagIdTemp[i]) {
                        jsonToPass.FilterCriteria.CustomValueIds.push(
                            "tagid_" + tagIdTemp[i]
                        );
                    }
                }
            }

            if (passedJsonData.preference.CurrentEmpStatus) {
                let CurrentEmpStatusTemp = [];
                CurrentEmpStatusTemp = passedJsonData.preference.CurrentEmpStatus.split(',');
                for (let i = 0; i < CurrentEmpStatusTemp.length; i++) {
                    if (CurrentEmpStatusTemp[i]) {
                        jsonToPass.FilterCriteria.CustomValueIds.push(
                            CurrentEmpStatusTemp[i]
                        );
                    }
                }
            }

            if (passedJsonData.preference.EmpAvailabilityStatus) {
                let EmpAvailabilityStatusTemp = [];
                EmpAvailabilityStatusTemp = passedJsonData.preference.EmpAvailabilityStatus.split(',');
                for (let i = 0; i < EmpAvailabilityStatusTemp.length; i++) {
                    if (EmpAvailabilityStatusTemp[i]) {
                        jsonToPass.FilterCriteria.CustomValueIds.push(
                            EmpAvailabilityStatusTemp[i]
                        );
                    }
                }
            }

            if (passedJsonData.preference.EmpJobPref) {
                let EmpJobPrefTemp = [];
                EmpJobPrefTemp = passedJsonData.preference.EmpJobPref.split(',');
                for (let i = 0; i < EmpJobPrefTemp.length; i++) {
                    if (EmpJobPrefTemp[i]) {
                        jsonToPass.FilterCriteria.CustomValueIds.push(
                            EmpJobPrefTemp[i]
                        );
                    }
                }
            }


            if (passedJsonData.preference.EmpLocPref) {
                let EmpLocPrefTemp = [];
                EmpLocPrefTemp = passedJsonData.preference.EmpLocPref.split(',');
                for (let i = 0; i < EmpLocPrefTemp.length; i++) {
                    if (EmpLocPrefTemp[i]) {
                        jsonToPass.FilterCriteria.CustomValueIds.push(
                            EmpLocPrefTemp[i]
                        );
                    }
                }
            }

            if (passedJsonData.preference.EmpWorkHoursPref) {
                let EmpWorkHoursPrefTemp = [];
                EmpWorkHoursPrefTemp = passedJsonData.preference.EmpWorkHoursPref.split(',');
                for (let i = 0; i < EmpWorkHoursPrefTemp.length; i++) {
                    if (EmpWorkHoursPrefTemp[i]) {
                        if (jsonToPass.FilterCriteria.CustomValueIds.length) {
                            jsonToPass.FilterCriteria.CustomValueIds.push(
                                EmpWorkHoursPrefTemp[i]
                            );
                        } else {
                            jsonToPass.FilterCriteria.CustomValueIds = [
                                EmpWorkHoursPrefTemp[i],
                            ];
                        }
                    }
                }
            }


            //    LegalYes
            if (passedJsonData.preference.auth_in_US) {
                let Legalemp = "";
                Legalemp = passedJsonData.preference.auth_in_US;

                if (Legalemp) {
                    jsonToPass.FilterCriteria.CustomValueIds.push(
                        "legal_" + Legalemp
                    );
                }
            }

            //    VisaYes
            if (passedJsonData.preference.Req_visa_sponsorship) {
                let Visaemp = "";
                Visaemp = passedJsonData.preference.Req_visa_sponsorship;

                if (Visaemp) {
                    if (jsonToPass.FilterCriteria.CustomValueIds.length) {
                        jsonToPass.FilterCriteria.CustomValueIds.push(
                            "visa_" + Visaemp
                        );
                    } else {
                        jsonToPass.FilterCriteria.CustomValueIds = [
                            "visa_" + Visaemp,
                        ];
                    }
                }
            }

            jsonToPass.FilterCriteria.CustomValueIds =
                jsonToPass.FilterCriteria.CustomValueIds.filter(
                    (val: string, i: number, array: String[]) => array.indexOf(val) === i
                );


            if (pageNumber === 0 && (count || !initialCountLoaded.current)) {
                loadCount(jsonToPass, !talentPoolId ? passedJsonData.talentPoolId : talentPoolId);
            }

            jsonToPassRef.current = jsonToPass;

            // console.log(jsonToPass);

            const params = new URLSearchParams();

            params.append("jobid", isInJob ? jobIdFromJobPage : selectedJob.current.id);
            params.append("json", JSON.stringify(jsonToPass));
            params.append("client_subs", "0");
            params.append("csninja", "0");
            params.append("page", "" + pageNumber);
            params.append("next", "" + (pageNumber * pageSize));
            params.append("pageSize", "" + pageSize);
            params.append("type", "" + tabValue);
            params.append("clientId", "" + userLocalData.getvalue('clientId'));

            if (mainJsonDataRef.current.curationActivity.submissionActivity !== '') {
                params.append("submissionActivity", "" + mainJsonDataRef.current.curationActivity.submissionActivity);
            }
            if (mainJsonDataRef.current.curationActivity.interviewActivity !== '') {
                params.append("interviewActivity", "" + mainJsonDataRef.current.curationActivity.interviewActivity);
            }
            if (mainJsonDataRef.current.curationActivity.rating !== '') {
                params.append("rating", "" + mainJsonDataRef.current.curationActivity.rating);
            }
            if (mainJsonDataRef.current.curationActivity.notes !== '') {
                params.append("notes", "" + mainJsonDataRef.current.curationActivity.notes);
            }


            if (mainJsonDataRef.current.communityMemberActivity.jobApplication !== '') {
                params.append("jobApplication", "" + mainJsonDataRef.current.communityMemberActivity.jobApplication);
            }
            if (mainJsonDataRef.current.communityMemberActivity.profileUpdate !== '') {
                params.append("profileUpdate", "" + mainJsonDataRef.current.communityMemberActivity.profileUpdate);
            }
            if (mainJsonDataRef.current.communityMemberActivity.avaliablityStatusUpdate !== '') {
                params.append("avaliablityStatusUpdate", "" + mainJsonDataRef.current.communityMemberActivity.avaliablityStatusUpdate);
            }
            if (mainJsonDataRef.current.communityMemberActivity.shiftPrefernceUpdate !== '') {
                params.append("shiftPrefernceUpdate", "" + mainJsonDataRef.current.communityMemberActivity.shiftPrefernceUpdate);
            }
            if (mainJsonDataRef.current.communityMemberActivity.preferenceUpdate !== '') {
                params.append("preferenceUpdate", "" + mainJsonDataRef.current.communityMemberActivity.preferenceUpdate);
            }
            if (mainJsonDataRef.current.communityMemberActivity.profileCompletion !== '') {
                params.append("profileCompletion", "" + mainJsonDataRef.current.communityMemberActivity.profileCompletion);
            }
            if (mainJsonDataRef.current.communityMemberActivity.mobileverified !== '') {
                params.append("mobileverified", "" + mainJsonDataRef.current.communityMemberActivity.mobileverified);
            }

            if (mainJsonDataRef.current.email.emailClicked !== '') {
                params.append("emailClicked", "" + mainJsonDataRef.current.email.emailClicked);
            }
            if (mainJsonDataRef.current.email.emailReplied !== '') {
                params.append("emailReplied", "" + mainJsonDataRef.current.email.emailReplied);
            }
            if (mainJsonDataRef.current.email.emailBounced !== '') {
                params.append("emailBounced", "" + mainJsonDataRef.current.email.emailBounced);
            }
            if (mainJsonDataRef.current.email.emailSpamBlocked !== '') {
                params.append("emailSpamBlocked", "" + mainJsonDataRef.current.email.emailSpamBlocked);
            }
            if (mainJsonDataRef.current.email.emailUnsubscribed !== '') {
                params.append("emailUnsubscribed", "" + mainJsonDataRef.current.email.emailUnsubscribed);
            }

            if (mainJsonDataRef.current.sms.smsSent !== '') {
                params.append("sMSSent", "" + mainJsonDataRef.current.sMS.sMSSent);
            }
            if (mainJsonDataRef.current.sms.smsReplied !== '') {
                params.append("sMSReplied", "" + mainJsonDataRef.current.sMS.sMSReplied);
            }
            if (mainJsonDataRef.current.sms.smsUnsubscribed !== '') {
                params.append("sMSUnsubscribed", "" + mainJsonDataRef.current.sMS.sMSUnsubscribed);
            }

            if (userId) {
                params.append("userIds", userId);
            }

            setApplicantsData([]);
            // setDataLoading(true);
            trackPromise(
                // sovren_results_curately.jsp
                // https://resume.accuick.com/Pipl/sovren_results_curately_aimatch.jsp
                ApiService.postWithData(
                    193,
                    jsonToPass.ParsedDocument && jsonToPass.ParsedDocument.trim()
                        ? "Curately/Sovren/sovren_results_community_aimatch.jsp"
                        : "Curately/Sovren/sovren_results_community.jsp",
                    params
                ).then((result: any) => {
                    // setDataLoading(false);
                    let tempData = result.data.data;
                    // console.log(tempData);
                    if (
                        result.data &&
                        result.data.data &&
                        result.data.total &&
                        Number(result.data.total)
                    ) {
                        if (currentSelectedTabCount.current > Number(result.data.total)) {
                            setRowCount(currentSelectedTabCount.current);
                            if (!isSelectAllChecked) {
                                setSelectedRowCount((currentSelectedTabCount.current > 10000) ? 10000 : currentSelectedTabCount.current);
                            }
                        } else {
                            setRowCount(Number(result.data.total ? result.data.total : 0));
                            if (!isSelectAllChecked) {
                                setSelectedRowCount((Number(result.data.total ? result.data.total : 0) > 10000) ? 10000 : Number(result.data.total ? result.data.total : 0));
                            }
                        }
                        for (let al = 0; al < tempData.length; al++) {

                            tempData[al].linkedIn = tempData[al].linkedIn ? tempData[al].linkedIn.replaceAll('\\/', '/') : ""
                            tempData[al].linkedIn = (tempData[al].linkedIn && (tempData[al].linkedIn.indexOf('://') === -1)) ? 'https://' + tempData[al].linkedIn : tempData[al].linkedIn;
                            tempData[al].linkedIn = IsValidUrl.check(tempData[al].linkedIn) ? tempData[al].linkedIn : "";
                            tempData[al].notInvited =
                                tabValue === "Not Invited" ? true : false;
                            if (tempData[al].jobTitle) {
                                tempData[al].jobTitle = tempData[al].jobTitle.replace("\\/", "/");
                            }
                            if (tempData[al].compName) {
                                tempData[al].compName = tempData[al].compName.replace("\\/", "/");;
                            }
                            tempData[al].notInvited =
                                tabValue === "Not Invited" ? true : false;

                            let poolIds = (tempData[al].poolIds) ? tempData[al].poolIds.split(',') : [];
                            let poolNames = (tempData[al].poolNames) ? tempData[al].poolNames.split(',') : [];

                            let sequenceIds = (tempData[al].sequenceIds && tempData[al].sequenceIds !== "0") ? tempData[al].sequenceIds.split(',') : [];
                            let sequenceNames = (tempData[al].sequenceNames) ? tempData[al].sequenceNames.split(',') : [];

                            tempData[al].poolCount = 0;
                            tempData[al].poolIds = [];
                            tempData[al].poolNames = [];
                            tempData[al].sequenceIds = [];
                            tempData[al].sequenceCount = 0;
                            tempData[al].sequenceNames = [];

                            let count = 0;
                            let start = false;

                            for (let j = 0; j < poolIds.length; j++) {
                                for (let k = 0; k < tempData[al].poolIds.length; k++) {
                                    if (poolIds[j] === tempData[al].poolIds[k]) {
                                        start = true;
                                    }
                                }
                                count++;
                                if (count === 1 && start === false) {
                                    tempData[al].poolIds.push(poolIds[j]);
                                    tempData[al].poolNames.push(poolNames[j]);
                                }
                                start = false;
                                count = 0;
                            }

                            count = 0;
                            start = false;

                            for (let j = 0; j < sequenceIds.length; j++) {
                                for (let k = 0; k < tempData[al].sequenceIds.length; k++) {
                                    if (sequenceIds[j] === tempData[al].sequenceIds[k]) {
                                        start = true;
                                    }
                                }
                                count++;
                                if (count === 1 && start === false) {
                                    tempData[al].sequenceIds.push(sequenceIds[j]);
                                    tempData[al].sequenceNames.push(sequenceNames[j]);
                                }
                                start = false;
                                count = 0;
                            }

                            tempData[al].poolCount = tempData[al].poolIds.length;
                            tempData[al].sequenceCount = tempData[al].sequenceIds.length;
                        }
                        if (tempData && tempData.length && tempData[0].score) {
                            tempData = tempData.sort((a: { score: string }, b: { score: string }) => parseFloat(b.score) - parseFloat(a.score));
                        }
                        const uniqueData = tempData.filter(
                            (obj: { candId: string }, index: number) =>
                                tempData.findIndex(
                                    (item: { candId: string }) => item.candId === obj.candId
                                ) === index
                        )
                        setApplicantsData(uniqueData);
                        // let unique = [{
                        //     candId: ""
                        // }];
                        // let uniqueCandIds = [''];
                        // let allCandIds = [''];
                        // unique = [];
                        // uniqueCandIds = [];
                        // allCandIds = [];
                        // for (const item of tempData) {
                        //     const duplicate = unique.find(
                        //         (obj) => obj.candId === item.candId
                        //     );
                        //     if (!duplicate) {
                        //         unique.push(item);
                        //         uniqueCandIds.push(item.candId);
                        //     }
                        //     allCandIds.push(item.candId);
                        // }

                        // console.log(unique);
                        // console.log(uniqueCandIds);
                        // console.log(allCandIds);




                        if (!isSelectAllChecked) {
                            setRowSelection({});
                        }



                        // //  (someAreChecked)? selectAllMenuItemClicked("page") : "";
                        // if ((rowPageIndex > 0) && (rowPageIndex > pageNumber)) {
                        //     // let rowData={...rowSelection};
                        //     let rowDatanext: any = {};
                        //     for (let index = 0; index < tempData.length; index++) {
                        //         rowDatanext[tempData[index].candId] = true;
                        //     }
                        //     setRowSelection({ ...rowSelection, ...rowDatanext });
                        //     setIsSelectAllChecked(true);
                        // } else {
                        //     setIsSelectAllChecked(false);
                        // }
                    } else {
                        //setRowCount(0);
                        setApplicantsData([]);
                        //setDataLoading(false);
                    }
                    // var allData = JSON.parse(data);
                    // if (allData && allData.data) {
                    //     excelDataToDownload = allData.data;
                    // } else {
                    //     excelDataToDownload = [];
                    // }
                    // addCand(allData, num, $('#keywords').val().replace(/["]/g, "\""), jobtitlesTemp.join(), empNamesTemp.join(), skillsTemp.join());
                    // if ($('#keywords').val()) {
                    //     $.ajax({
                    //         type: "POST",
                    //         url: "Accuick_Search_Save.jsp",
                    //         data: {
                    //             userid: Userid,
                    //             jobid: JobId,
                    //             keywords: $('#keywords').val().replace(/["]/g, "\""),
                    //             url: JSON.stringify(jsonToPass)
                    //         }
                    //     }).done(function (resp) {
                    //         console.log('Search Saved' + resp)
                    //     });
                    // }
                })
            );
            // }
            // if ($('.badgeadded').length) {
            //     $('#badges').append(`<button type="button" id="clear_badge" class="btn btn-outline-light text-dark border mr-2 mb-1 badgeadded clear_badge" onclick='clear_badge()'> Clear All </button>`);
            // } else {
            // }
            // if ($('#keywords').val() || $('.badgeadded').length) {
            //     $(".hideIf").show();
            // } else {
            //     $(".hideIf").hide();
            // }
        }
    };

    const loadCount = (jsonToPass: any, poolId: string) => {
        if (firstLoad.current || talentPoolId) {
            const params = new URLSearchParams();

            if (poolId) {
                // jsonToPass.IndexIdsToSearchInto = ["talentpool_" + userLocalData.getvalue('clientId')];
                if (jsonToPass.FilterCriteria.CustomValueIds.length) {
                    jsonToPass.FilterCriteria.CustomValueIds.push("poolid" + poolId);
                } else {
                    jsonToPass.FilterCriteria.CustomValueIds = ["poolid" + poolId];
                }
                // jsonToPass.FilterCriteria.CustomValueIds.push("talentpool");
            }
            //  else {
            //     jsonToPass.FilterCriteria.CustomValueIds = [];
            // }

            jsonToPass.FilterCriteria.CustomValueIdsMustAllExist = jsonToPass
                .FilterCriteria.CustomValueIds.length
                ? true
                : false;

            params.append("json", JSON.stringify(jsonToPass));

            let jsonToPass2 = JSON.parse(JSON.stringify(jsonToPass));
            jsonToPass2.FilterCriteria.CustomValueIdsMustAllExist = true;

            jsonToPass.FilterCriteria.CustomValueIds =
                jsonToPass.FilterCriteria.CustomValueIds.filter(
                    (val: string) => !["Pending", "NotInvited", "Joined"].includes(val)
                );

            jsonToPass.FilterCriteria.CustomValueIds =
                jsonToPass.FilterCriteria.CustomValueIds.filter(
                    (val: string, i: number, array: String[]) => array.indexOf(val) === i
                );

            let pendingJsonToPass = JSON.parse(JSON.stringify(jsonToPass2));
            let notInvitedJsonToPass = JSON.parse(JSON.stringify(jsonToPass2));
            let joinedJsonToPass = JSON.parse(JSON.stringify(jsonToPass2));
            let talentPoolJsonToPass = JSON.parse(JSON.stringify(jsonToPass2));

            pendingJsonToPass.FilterCriteria.CustomValueIds.push("Pending");
            params.append("json_pending", JSON.stringify(pendingJsonToPass));

            notInvitedJsonToPass.FilterCriteria.CustomValueIds.push("NotInvited");
            params.append("json_notinvited", JSON.stringify(notInvitedJsonToPass));

            joinedJsonToPass.FilterCriteria.CustomValueIds.push("Joined");
            params.append("json_joined", JSON.stringify(joinedJsonToPass));

            // talentPoolJsonToPass.IndexIdsToSearchInto = ["talentpool_" + userLocalData.getvalue('clientId')];
            talentPoolJsonToPass.FilterCriteria.CustomValueIds = [];
            if (poolId) {
                talentPoolJsonToPass.FilterCriteria.CustomValueIds.push(
                    "poolid" + poolId
                );
                // if (talentPoolJsonToPass.FilterCriteria.CustomValueIds.length) {
                // } else {
                //     talentPoolJsonToPass.FilterCriteria.CustomValueIds = [
                //         "poolid" + poolId,
                //     ];
                // }
            }
            talentPoolJsonToPass.FilterCriteria.CustomValueIds.push("talentpool");
            talentPoolJsonToPass.FilterCriteria.CustomValueIds =
                talentPoolJsonToPass.FilterCriteria.CustomValueIds.filter(
                    (val: string, i: number, array: String[]) => array.indexOf(val) === i
                );
            params.append("json_pool", JSON.stringify(talentPoolJsonToPass));
            params.append("clientId", userLocalData.getvalue('clientId'));
            if (mainJsonDataRef.current.curationActivity.submissionActivity !== '') {
                params.append("submissionActivity", "" + mainJsonDataRef.current.curationActivity.submissionActivity);
            }
            if (mainJsonDataRef.current.curationActivity.interviewActivity !== '') {
                params.append("interviewActivity", "" + mainJsonDataRef.current.curationActivity.interviewActivity);
            }
            if (mainJsonDataRef.current.curationActivity.rating !== '') {
                params.append("rating", "" + mainJsonDataRef.current.curationActivity.rating);
            }
            if (mainJsonDataRef.current.curationActivity.notes !== '') {
                params.append("notes", "" + mainJsonDataRef.current.curationActivity.notes);
            }
            if (mainJsonDataRef.current.communityMemberActivity.jobApplication !== '') {
                params.append("jobApplication", "" + mainJsonDataRef.current.communityMemberActivity.jobApplication);
            }
            if (mainJsonDataRef.current.communityMemberActivity.profileUpdate !== '') {
                params.append("profileUpdate", "" + mainJsonDataRef.current.communityMemberActivity.profileUpdate);
            }
            if (mainJsonDataRef.current.communityMemberActivity.avaliablityStatusUpdate !== '') {
                params.append("avaliablityStatusUpdate", "" + mainJsonDataRef.current.communityMemberActivity.avaliablityStatusUpdate);
            }
            if (mainJsonDataRef.current.communityMemberActivity.shiftPrefernceUpdate !== '') {
                params.append("shiftPrefernceUpdate", "" + mainJsonDataRef.current.communityMemberActivity.shiftPrefernceUpdate);
            }
            if (mainJsonDataRef.current.communityMemberActivity.preferenceUpdate !== '') {
                params.append("preferenceUpdate", "" + mainJsonDataRef.current.communityMemberActivity.preferenceUpdate);
            }
            if (mainJsonDataRef.current.communityMemberActivity.profileCompletion !== '') {
                params.append("profileCompletion", "" + mainJsonDataRef.current.communityMemberActivity.profileCompletion);
            }
            if (mainJsonDataRef.current.communityMemberActivity.mobileverified !== '') {
                params.append("mobileverified", "" + mainJsonDataRef.current.communityMemberActivity.mobileverified);
            }

            if (mainJsonDataRef.current.email.emailClicked !== '') {
                params.append("emailClicked", "" + mainJsonDataRef.current.email.emailClicked);
            }
            if (mainJsonDataRef.current.email.emailReplied !== '') {
                params.append("emailReplied", "" + mainJsonDataRef.current.email.emailReplied);
            }
            if (mainJsonDataRef.current.email.emailBounced !== '') {
                params.append("emailBounced", "" + mainJsonDataRef.current.email.emailBounced);
            }
            if (mainJsonDataRef.current.email.emailSpamBlocked !== '') {
                params.append("emailSpamBlocked", "" + mainJsonDataRef.current.email.emailSpamBlocked);
            }
            if (mainJsonDataRef.current.email.emailUnsubscribed !== '') {
                params.append("emailUnsubscribed", "" + mainJsonDataRef.current.email.emailUnsubscribed);
            }

            if (mainJsonDataRef.current.sms.smsSent !== '') {
                params.append("sMSSent", "" + mainJsonDataRef.current.sMS.sMSSent);
            }
            if (mainJsonDataRef.current.sms.smsReplied !== '') {
                params.append("sMSReplied", "" + mainJsonDataRef.current.sMS.sMSReplied);
            }
            if (mainJsonDataRef.current.sms.smsUnsubscribed !== '') {
                params.append("sMSUnsubscribed", "" + mainJsonDataRef.current.sMS.sMSUnsubscribed);
            }
            // setCountLoading(true);
            trackPromise(
                ApiService.postWithData(
                    193,
                    jsonToPass.ParsedDocument && jsonToPass.ParsedDocument.trim()
                        ? "Curately/Sovren/sovren_results_community_aimatch_count.jsp"
                        : "Curately/Sovren/sovren_results_curately_count.jsp",
                    params
                ).then((result: any) => {
                    //  setCountLoading(false);
                    // console.log(result.data);
                    // setTabList([
                    //     { label: "All", count: Number(result.data.total) },
                    //     { label: "Joined", count: Number(result.data.totalJoined) },
                    //     { label: "Pending", count: Number(result.data.totalPending) },
                    //     {
                    //         label: "Not Invited",
                    //         count: Number(result.data.totalNotInvited),
                    //     },
                    //     { label: "Talent Pool", count: Number(result.data.totalPool) },
                    // ]);
                })
            );
        }
        setTimeout(() => {
            if (!firstLoad.current) {
                firstLoad.current = true;
            }
        }, 1000);
    };

    const getZipcode = (zipCode: string) => {
        // http://34.208.108.171:41088/Sovren/get_Longitude_Latitude.jsp?zipcode=30036
        return new Promise((resolve, reject) => {
            // let y = 0;
            ApiService.getByParams(193, "Curately/Sovren/get_Longitude_Latitude.jsp", {
                zipcode: zipCode,
            }).then((response: any) => {
                resolve(response);
            });
        });
    };

    // useEffect(() => {
    //     buildJson();
    // }, [mainJsonData]);

    useEffect(() => {
        buildJson(pagination.pageIndex, pagination.pageSize, true);
    }, [pagination.pageIndex, pagination.pageSize]);

    useEffect(() => {
        if (pagination.pageIndex === 0) {
            if (firstAPICall.current) {
                buildJson(0, 50, false);
            }
        } else {
            setPagination({
                pageIndex: 0,
                pageSize: 50
            });
        }
        firstAPICall.current = true;
    }, [tabValue]);

    // const [tabList, setTabList] = useState([
    //     { label: "All", count: 18724 },
    //     { label: "Joined", count: 10474 },
    //     { label: "Pending", count: 4331 },
    //     { label: "Not Invited", count: 3919 },
    //     { label: "Talent Pool", count: 1957 },
    // ]);

    // const getCount = (count: string) => {
    //     if (count.length > 6 && count.length < 9) {
    //         const startDigits = count.length - 6;
    //         const decimalNum = count.slice(startDigits, startDigits + 1);
    //         return (
    //             count.slice(0, startDigits) +
    //             (decimalNum !== "0" ? "." + decimalNum : "") +
    //             "M"
    //         );
    //     } else if (count.length > 3 && count.length < 6) {
    //         const startDigits = count.length - 3;
    //         const decimalNum = count.slice(startDigits, startDigits + 1);
    //         return (
    //             count.slice(0, startDigits) +
    //             (decimalNum !== "0" ? "." + decimalNum : "") +
    //             "K"
    //         );
    //     } else {
    //         return count;
    //     }
    // };

    const backToPoolList = () => {
        navigate('/' + userLocalData.getvalue('clientName') + '/talentPool/find');
    }


    const deleteTalentPoolId = (poolId: string, candId: string) => {
        trackPromise(
            // deleteTalentPoolCommunity/10024627/17
            ApiRequests.deleteById("admin", 'deleteTalentPoolCommunity', candId + "/" + poolId + '/' + userLocalData.getvalue('clientId'))
                .then(
                    (response: any) => {
                        // console.log(response)
                        if (response.data.Success) {
                            showToaster("Talent Pool deleted Successfully", 'success');
                        } else {
                            showToaster(response.data.Message ? response.data.Message : "An error occured while deleting", 'error');
                        }
                    }
                ).catch(
                    (response: any) => {
                        showToaster(response.response?.data?.Message ? response.response?.data?.Message : "An error occured while deleting", 'error');
                    }

                )
        )
    }

    const openTalentPoolView = (id: string, name: string) => {
        if (talentPoolId !== id) {
            localStorage.setItem("talentPoolName_" + id, name);
            navigate('/' + userLocalData.getvalue('clientName') + '/talentPool/view/' + id);
        }
    };

    return (
        <div id="talentViewPoolCandidates" className="findCandidate pt-3">
            <Stack
                direction="row"
                className="customCard px-4 py-2"
                justifyContent="space-between"
                alignItems="center"
                sx={{ minHeight: "auto !important" }}
            >
                <Typography variant="h6" className="header">
                    {
                        !talentPoolId ? "ViewPool" :
                            <span> Talent Pool {
                                talentPoolId ?
                                    <span className='c-blue pl-5'>
                                        {talentPoolName ? talentPoolName : ""}
                                    </span>
                                    :
                                    null
                            } </span>}
                </Typography>
                <Button variant="outlined"
                    type='button'
                    color="secondary"
                    className='mr-2'
                    onClick={backToPoolList}
                >Back to List</Button>
            </Stack>
            <Grid
                container
                spacing={0}
                className="customCard p-0 filterExpand-grid mb-0"
            >
                {/* {
                    isPoolSearchSettingEnabled ? */}
                <Grid
                    sx={{
                        width: filtersExpand ? 0 : 310,
                        overflow: "hidden",
                        opacity: filtersExpand ? 0 : 1,
                        display: (isPoolSearchSettingEnabled) ? 'block' : 'none !important'
                    }}
                >
                    <div id="CommunityFilters">
                        <CommunityFilters
                            onApply={applyFilters}
                            updateJobDetails={updateJobDetails}
                            jobIdFromJobPage={jobIdFromJobPage}
                            jobTitleFromJobPage={jobTitleFromJobPage}
                            isInJob={isInJob}
                            talentPoolId={talentPoolId ? talentPoolId : ""}
                        />
                        {/* <TalentFilters onApply={applyFilters} updateJobDetails={updateJobDetails} /> */}
                    </div>
                </Grid>
                {/* :
                        null
                } */}
                <Grid
                    sx={{ width: filtersExpand ? "calc(100%)" : "calc(100% - 310px)" }}
                >
                    <div className={`MRTableCustom ${filtersExpand ? "pl-0" : ""}`}>
                        {
                            talentPoolId && isPoolSearchSettingEnabled ? (
                                <Stack direction="row" alignItems="center">
                                    <Tooltip title={filtersExpand ? "Show Filters" : "Hide Filters"}>
                                        <IconButton
                                            disableRipple
                                            className="filtersHideButton"
                                            color="primary"
                                            aria-label={filtersExpand ? "Expand" : "Collapse"}
                                            onClick={toggleFilers}
                                        >
                                            {/* {<img src={CommonImages.GetFilterIcon()} className="filterIcon" />} */}
                                            <TuneIcon className="c-grey" />
                                            {/* {filtersExpand ? (
                                        <KeyboardDoubleArrowRightIcon />
                                    ) : (
                                        <KeyboardDoubleArrowLeftIcon />
                                    )} */}
                                        </IconButton>
                                    </Tooltip>
                                    {/* <Tabs
                                    value={tabValue}
                                    onChange={handleTabChange}
                                    className="tableTabs"
                                >
                                    {tabList.map((tab: any, i: number) => (
                                        <Tab
                                            key={i}
                                            value={tab.label}
                                            label={
                                                <span className="tabWithCount">
                                                    <span>{tab.label}</span>
                                                    {countLoading ? (
                                                        <LoopIcon className="countLoader" />
                                                    ) : (
                                                        <span className="count">
                                                            {" "}
                                                            ({getCount(String(tab.count))})
                                                        </span>
                                                    )}
                                                </span>
                                            }
                                        />
                                    ))}
                                </Tabs> */}
                                </Stack>
                            ) : <Stack direction="row" alignItems="center" sx={{ height: '40px' }}></Stack>}


                        <MaterialReactTable
                            columns={columns}
                            enableRowSelection
                            data={applicantsData}
                            //  onSelectionChange = {onselectionchange}
                            onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
                            state={{
                                rowSelection,
                                pagination,
                                sorting,
                                // isLoading: dataLoading,
                            }} //pass our managed row selection state to the table to use
                            enablePinning
                            initialState={{
                                columnPinning: { left: ["mrt-row-select", 'name'] },
                                density: "compact",
                                showGlobalFilter: false,
                                // columnVisibility: { score: !Boolean(mainJsonData.parsedDocument) }
                                // columnOrder: showColumns
                            }}
                            enableDensityToggle={false}
                            enableFullScreenToggle={false}
                            manualPagination
                            manualSorting
                            onSortingChange={setSorting}
                            enableGlobalFilterModes
                            columnResizeMode="onChange"
                            onPaginationChange={setPagination}
                            getRowId={row => row.candId}
                            icons={{
                                ArrowDownwardIcon: (props: any) => (
                                    <SwitchLeftIcon {...props} />
                                ),
                            }}
                            rowCount={rowCount}
                            enableStickyHeader

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
                                        setRowSelection({ ...rowSelection, [prop.row.id]: e.target.checked });
                                        console.log(e.target.checked);
                                        if (isSelectAllChecked) {
                                            if (e.target.checked) {
                                                setSelectedRowCount(selectedRowCount + 1);
                                            } else {
                                                setSelectedRowCount(selectedRowCount - 1);
                                            }
                                        }
                                    }
                                }
                            })}
                            renderTopToolbar={
                                <span>
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="flex-start"
                                        alignItems="center"
                                        className="actionItems"
                                        sx={{ width: "90% !important" }}
                                    >
                                        <Button
                                            disableRipple
                                            id="select-all-button"
                                            className="select-all-button mr-2"
                                            aria-controls={
                                                openSelectAllMenu ? "select-all-menu" : undefined
                                            }
                                            aria-haspopup="true"
                                            aria-expanded={openSelectAllMenu ? "true" : undefined}
                                            onClick={openSelectAll}
                                        >
                                            <div>
                                                <Checkbox
                                                    className="select-all-checkbox"
                                                    disableRipple
                                                    color="default"
                                                    checked={isSelectAllChecked}
                                                    // onClick={handleSelectAllClick}
                                                    indeterminate={someAreChecked}
                                                />
                                            </div>
                                            <span
                                                className={`selectedCountText ${checkedCount === 0 ? "d-none" : "d-block"
                                                    }`}
                                            >
                                                {/* Object.keys(rowSelection).length */}
                                                {(isSelectAllChecked) ? ((selectedRowCount > 10000) ? 10000 : selectedRowCount) : checkedCount} Selected

                                            </span>

                                            <ArrowDropDownIcon className="arrowDownIcon" />
                                        </Button>
                                        <Menu
                                            id="select-all-menu"
                                            className="select-all-menu"
                                            anchorEl={selectAllElement}
                                            open={openSelectAllMenu}
                                            onClose={() => setSelectAllElement(null)}
                                            MenuListProps={{
                                                "aria-labelledby": "select-all-checkbox",
                                            }}
                                            anchorOrigin={{
                                                vertical: "bottom",
                                                horizontal: "left",
                                            }}
                                            transformOrigin={{
                                                vertical: "top",
                                                horizontal: "left",
                                            }}
                                            PaperProps={{
                                                style: { overflow: "visible" },
                                            }}
                                        >
                                            <MenuItem
                                                disableRipple
                                                onClick={() => selectAllMenuItemClicked("page")}
                                                className="menuItem"
                                            >
                                                Select this page(<Box component="span">{applicantsData.length}</Box>)
                                            </MenuItem>
                                            <MenuItem
                                                disableRipple
                                                onClick={() => selectAllMenuItemClicked("all")}
                                            >
                                                Select all people (<Box component="span">{(rowCount > 10000) ? 10000 : rowCount}</Box>)
                                            </MenuItem>
                                            <MenuItem
                                                disableRipple
                                                onClick={() => selectAllMenuItemClicked("clear")}
                                            >
                                                Clear Selection
                                            </MenuItem>
                                        </Menu>
                                        {
                                            isBulkEmailSettingEnabled ?
                                                <Button
                                                    variant="outlined"
                                                    color="secondary"
                                                    className="mr-2"
                                                    disabled={Object.keys(rowSelection).length > 0 ? false : true}
                                                    onClick={() => setAddEmail(true)}
                                                    startIcon={<MailOutlineOutlinedIcon />}
                                                >
                                                    Email
                                                </Button>
                                                :
                                                null
                                        }
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            className="mr-2"
                                            onClick={(e) => handleTableSequence(e, '')}
                                            disabled={Object.keys(rowSelection).length > 0 ? false : true}
                                            startIcon={<SendOutlinedIcon />}
                                        >
                                            Campaign
                                        </Button>
                                        <Button
                                            id="add-poollist-btn"
                                            aria-controls={openAddToPoolListenBtn ? "addpoollistmenu" : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={openAddToPoolListenBtn ? "true" : undefined}
                                            onClick={handleClickAddToPoolListen}
                                            startIcon={<PlaylistAddOutlinedIcon />}
                                            disableRipple
                                            variant="outlined"
                                            color="secondary"
                                            className="mr-2"
                                            disabled={Object.keys(rowSelection).length > 0 ? false : true}
                                            endIcon={<ArrowDropDownIcon />}
                                        >
                                            Pool
                                        </Button>
                                        <Menu
                                            id='addpoollistmenu'
                                            anchorEl={addtopoollistanchorEl}
                                            open={openAddToPoolListenBtn}
                                            onClose={handleProfileMenuClose}
                                            MenuListProps={{
                                                "aria-labelledby": 'add-poollist-btn',
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
                                                style: { overflow: "visible" },
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
                                                id='talentPoolId1'
                                                handleChange={(id: any, name: string) => {
                                                    setSelectedTalentPool({ id, name });
                                                    addToTopTalentPool(id, name);
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
                                    </Grid>
                                    {/* <Stack className="customSorting">
                                        <Button
                                            variant="outlined"
                                            startIcon={
                                                <>
                                                    <SouthRoundedIcon className={sortType === "asc" ? 'flip' : ''} />
                                                    <MenuIcon />
                                                </>
                                            }
                                            endIcon={<ArrowDropDownIcon />}
                                            onClick={handleSortClick}
                                            sx={{ width: '155px', mr: 2, ml: 'auto' }}
                                            className="d-none"
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
                                                        <MenuItem value={'State'}>State</MenuItem>
                                                        <MenuItem value={'Company'}>Company</MenuItem>
                                                        <MenuItem value={'JobTitle'}>JobTitle</MenuItem>
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
                                                        <MenuItem value={'asc'}>Ascending</MenuItem>
                                                        <MenuItem value={'des'}>Descending</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <Button
                                                    color="primary"
                                                    sx={{ width: '100% !important', height: '32px !important' }}
                                                    onClick={() => {
                                                        setSorting([{

                                                            desc: sortType === "des" ? true : false,
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
                                    </Stack> */}
                                </span>
                            }

                        />
                        {/* {openAddCandidateModal ? (
                            <EditCandidate
                                open={openAddCandidateModal}
                                closePopup={() => setOpenAddCandidateModal(false)}
                                candidateData={candidateData}
                            />
                        ) : null} */}
                    </div>
                </Grid>
            </Grid>

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
                            onClick={() => handleShowSnack(`${menuData.rowId}`)}
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

            {dialogStatus && (
                <EmailDialogBox
                    dialogOpen={dialogStatus}
                    onClose={() => setDialogStatus(false)}
                    name={menuData.first.toLowerCase()}
                    emailId={emailOnClicked}
                    candidateId={menuData.candId}
                    jobId={menuData.jobId}
                />
            )}

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
                        HQ Number
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
                                cursor: "pointer",
                            }}
                            onClick={() => handleShowCallSnack(`${menuData.rowId}`)}
                        />
                    </Box>
                    {
                        isEmailSMSSettingEnabled && !userLocalData.isChromeExtensionEnabled() ?
                            <Button
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
                            </Button>
                            :
                            null
                    }
                </Stack>
            </Menu>

            {dialogPhoneStatus ? (
                <PhoneDialog
                    dialogOpen={dialogPhoneStatus}
                    onClose={() => setDialogPhoneStatus(false)}
                    name={menuData.first.toLowerCase()}
                    toPhone={phoneOnClicked}
                    candidateId={menuData.candId}
                    jobId={menuData.jobId}
                />
            ) : null}

            {openSequenceModal ? (
                <Sequence
                    open={openSequenceModal}
                    closePopup={() => setOpenSequenceModal(false)}
                    selectedCandidateIds={selectSequenceList}
                />
            ) : null}

            {addEmail && (
                <EmailDialogBox
                    dialogOpen={addEmail}
                    onClose={() => setAddEmail(false)}
                    name={""}
                    emailId={""}
                />
            )}

            <Menu
                id={`addlistmenu-${menuData.rowId}`}
                anchorEl={addtolistanchorEl}
                open={openAddToListenBtn && selectedRowId === `${menuData.rowId}`}
                onClose={handleProfileMenuClose}
                MenuListProps={{
                    "aria-labelledby": `poollistbutton-${menuData.rowId}`,
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
                    style: { overflow: "visible" },
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
                {
                    (menuData.poolIds.length && (menuData.poolIds.length === menuData.poolNames.length)) ?
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {
                                menuData.poolIds.map((value, index) => (
                                    <ListItem
                                        sx={{
                                            ':hover': {
                                                backgroundColor: "var(--c-neutral-30)",
                                                borderRadius: "3px"
                                            }
                                        }}
                                        key={value}
                                        disableGutters
                                        // secondaryAction={
                                        //     <IconButton aria-label="Remove" onClick={() => {
                                        //         handleProfileMenuClose();
                                        //         confirmDialog(`Are you sure you want to remove - ${menuData.poolNames[index]}?`, () => {
                                        //             deleteTalentPoolId(value, menuData.candId);
                                        //         }, "warning"
                                        //         );
                                        //     }}>
                                        //         <ClearOutlinedIcon sx={{ color: '#737373', height: '13px', width: '13px' }} />
                                        //     </IconButton>
                                        // }
                                        className="pt-1 pb-1 pl-1"
                                    >
                                        <ListItemText
                                            primary={`${menuData.poolNames[index]}`}
                                            // onClick={() => openTalentPoolView(value, menuData.poolNames[index])}
                                            className="fw-6 c-skyblue" />
                                    </ListItem>
                                ))
                            }
                        </List>
                        :
                        null
                }

                <MUIAutoComplete
                    id='talentPoolId'
                    handleChange={(id: any, name: string) => {
                        setSelectedTalentPool({ id, name });
                        addToTalentPool(id, name, menuData.candId);
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

            <Menu
                id={`list-${menuData.rowId}`}
                anchorEl={TableListOpen}
                open={openTableList && selectedRowId === `${menuData.rowId}`}
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
                    "aria-labelledby": `listbutton-${menuData.rowId}`,
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
                {
                    (menuData.sequenceIds.length && (menuData.sequenceIds.length === menuData.sequenceNames.length)) ?
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {
                                menuData.sequenceIds.map((value, index) => (
                                    <ListItem
                                        sx={{
                                            ':hover': {
                                                backgroundColor: "var(--c-neutral-30)",
                                                borderRadius: "3px"
                                            }
                                        }}
                                        key={value}
                                        disableGutters
                                        // secondaryAction={
                                        //     <IconButton aria-label="Remove" onClick={() => {
                                        //         handleProfileMenuClose();
                                        //         confirmDialog(`Are you sure you want to remove - ${menuData.sequenceNames[index]}?`, () => {
                                        //             deleteTalentPoolId(value, menuData.candId);
                                        //         }, "warning"
                                        //         );
                                        //     }}>
                                        //         <ClearOutlinedIcon sx={{ color: '#737373', height: '13px', width: '13px' }} />
                                        //     </IconButton>
                                        // }
                                        className="pt-1 pb-1 pl-1"
                                    >
                                        <ListItemText
                                            // onClick={() => openSequnceView(value)}
                                            className="fw-6 c-skyblue"
                                            primary={`${menuData.sequenceNames[index]}`}
                                        />
                                    </ListItem>
                                ))
                            }
                        </List>
                        :
                        null
                }

                <Button
                    variant="contained"
                    disableRipple
                    color="primary"
                    onClick={(e) => {
                        // setListOnClicked(menuData.phone);
                        // setDialogListStatus(true);
                        // setTableOpenList(null);
                        handleTableSequence(e, menuData.rowId)
                    }}
                    startIcon={<PlaylistAddOutlinedIcon />}
                >
                    Add to Campaign
                </Button>
            </Menu>

            <Menu
                id={`sequence-${menuData.rowId}`}
                anchorEl={TableSequenceOpen}
                open={openTableSequence && selectedRowId === `${menuData.rowId}`}
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
                    "aria-labelledby": `sequencebutton-${menuData.rowId}`,
                }}
                sx={{
                    "& .MuiPaper-root.MuiMenu-paper.MuiPopover-paper": {
                        minWidth: "250px",
                        maxWidth: "350px",
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
                        Add contact to a campaign
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
                            You are one click away from an automated email workflow to get
                            more open rates and meetings
                        </Typography>
                    </Box>

                    <Button
                        variant="contained"
                        disableRipple
                        onClick={() => {
                            // setSequenceOnClicked(menuData.phone);
                            // setDialogSequenceStatus(true);
                            // setTableOpenSequence(null);
                            setOpenSequenceModal(true);
                        }}
                        sx={{
                            textTransform: "capitalize",
                            backgroundColor: "var(--c-primary-color)",
                            fontWeight: 700,
                            fontSize: "14px",
                            fontFamily: "Segoe UI",
                            color: "#ffffff",
                            height: "32px",

                            whiteSpace: "nowrap",
                            boxShadow: "0",
                            "&:hover": {
                                backgroundColor: "#0852C2",
                                color: "#ffffff",
                                boxShadow: "0",
                            },
                        }}
                        startIcon={<SendOutlinedIcon />}
                    >
                        Create New Campaign
                    </Button>
                </Stack>
            </Menu>

            <Menu
                id="addtelegrammenu"
                anchorEl={TableTelegramOpen}
                open={openTableTelegram}
                onClose={handleTableClose}
                MenuListProps={{
                    "aria-labelledby": "add-telegram-btn",
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
                    style: { overflow: "visible" },
                }}
                sx={{
                    boxShadow: "0px",
                    "& .MuiList-root.MuiMenu-list": {
                        pt: "4px",
                        pb: "10px",
                        pr: "5px",
                        pl: "5px",
                    },
                }}
            >
                <MenuItem onClick={handleTableClose}>Invite to Community</MenuItem>
                <MenuItem onClick={handleTableClose}>Invite to Job</MenuItem>
            </Menu>
        </div>
    );
};
export default ViewPool;
