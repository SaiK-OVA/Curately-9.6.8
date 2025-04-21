import { useCallback } from '../../../../shared/modules/React';
import { v4 as uuidv4 } from 'uuid';
import { useState, useMemo, useEffect, useRef } from '../../../../shared/modules/React';
import { Grid, Button, FormControl, IconButton, } from '../../../../shared/modules/commonImports';

import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import ApiService from "../../../../shared/api/api";
import { trackPromise } from "../../../../shared/modules/PromiseTrackter";


import { DateTime } from '../../../../shared/modules/Luxon';
import { userLocalData } from '../../../../shared/services/userData';
import { MUIAutoComplete } from '../../../shared/MUIAutoComplete/MUIAutoComplete';
import { showToaster } from '../../../shared/SnackBar/SnackBar';

import { Stack } from "../../../../shared/modules/MaterialImports/Stack";
import { Select, Checkbox } from '../../../../shared/modules/MaterialImports/FormElements';
import { Tab, Tabs } from '../../../../shared/modules/MaterialImports/Tabs';
import { Menu, MenuItem } from "../../../../shared/modules/MaterialImports/Menu";
import { Box } from '../../../../shared/modules/MaterialImports/Box';
import { ButtonGroup } from '../../../../shared/modules/MaterialImports/ButtonGroup';
import { Typography } from '../../../../shared/modules/MaterialImports/Typography';
import { Popover } from '../../../../shared/modules/MaterialImports/Popover';
import { Tooltip } from "../../../../shared/modules/MaterialImports/ToolTip";
import { List, ListItem, ListItemText } from "../../../../shared/modules/MaterialImports/List";

import { MaterialReactTable, type MRT_ColumnDef, type MRT_SortingState } from "../../../../shared/modules/MaterialReactTable";
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
// import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
// import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import MenuIcon from '@mui/icons-material/Menu';
import SouthRoundedIcon from '@mui/icons-material/SouthRounded';
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';

import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';

import PhoneDialog from '../../../shared/PhoneDialog/PhoneDialog';
import EmailDialogBox from '../../../shared/EmailDialogBox/EmailDialogBox';
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Avatar } from '../../../../shared/modules/MaterialImports/Avatar';

import LoopIcon from "@mui/icons-material/Loop";
import Copy from "../../../../shared/utils/Copy";

// import {
//     Edit as EditIcon,
// } from '@mui/icons-material';
// import { styled } from "@mui/material/styles";
import Sequence from '../../Job/View/Sourced/PopUps/Sequence/Sequence';
// import { showToaster } from "../../../shared/SnackBar/SnackBar";


import CuratelySearchFilter from './CuratelySearchFilter';

import TuneIcon from '@mui/icons-material/Tune';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { confirmDialog } from "../../../shared/ConfirmDialog/ConfirmDialog";
import './CuratelySearch.scss';
// import { CommonImages } from '../../../../shared/images/CommonImages';

import { mkConfig, generateCsv, download } from 'export-to-csv';
import CustomPagination from '../../../shared/CustomPagination/CustomPagination'
import { debounce } from "lodash";


const CuratelySearch = (
    // { candidateId }: { candidateId: string }
) => {
    const isCuratelySearchSettingEnabled = userLocalData.checkIntegration(400009);

    const isEmailSMSSettingEnabled = userLocalData.checkIntegration(40005);

    const isBulkEmailSettingEnabled = userLocalData.checkIntegration(40005) && userLocalData.checkIntegration(400020);



    const { talentPoolId } = useParams();
    // const talentPoolName = talentPoolId ? localStorage.getItem('talentPoolName_' + talentPoolId) : "";

    const navigate = useNavigate();
    const [filtersExpand, setFiltersExpand] = useState(isCuratelySearchSettingEnabled ? false : (!talentPoolId) ? false : true
    );

    //const [filtersExpand, setFiltersExpand] = useState(false);
    const [rowSelection, setRowSelection] = useState<any>({});
    //const [rowCount] = useState(0);
    const [dialogPhoneStatus, setDialogPhoneStatus] = useState(false);
    const [phoneOnClicked, setPhoneOnClicked] = useState('');
    const [dialogStatus, setDialogStatus] = useState(false);
    const [addEmail, setAddEmail] = useState(false);
    const [emailOnClicked, setEmailOnClicked] = useState('');
    // const [, setDialogListStatus] = useState(false);
    // const [, setListOnClicked] = useState('');
    const [candidatesData, setCandidatesData] = useState<any>([]);
    const [countLoading, setCountLoading] = useState(false);
    const [rowPageIndex, setRowPageIndex] = useState(0);
    const [selectedEmail, setSelectedEmail] = useState('');
    const [selectedName, setSelectedName] = useState('');
    const [isBulkEmail, setIsBulkEmail] = useState(false);
    const [selectedRowId, setSelectedRowId] = useState<string | null>(null)
    const [TableMailOpen, setTableOpenMail] = useState<null | HTMLElement>(null);
    const [TableCallOpen, setTableOpenCall] = useState<null | HTMLElement>(null);
    const [TableListOpen, setTableOpenList] = useState<null | HTMLElement>(null);
    const [TableSequenceOpen, setTableOpenSequence] = useState<null | HTMLElement>(null);
    // const [, setOpenCallSnack] = useState<{ [key: string]: boolean }>({});
    const openTableMail = Boolean(TableMailOpen);
    const openTableCall = Boolean(TableCallOpen);
    const openTableList = useMemo(() => Boolean(TableListOpen), [TableListOpen]);
    const openTableSequence = Boolean(TableSequenceOpen);
    const [selectedJob, setSelectedJob] = useState({
        title: "",
        id: "",
    });

    const [selectedSequence, setSelectedSequence] = useState({
        id: "",
        name: ""
    });
    const [selectSequenceList, setSelectSequenceList] = useState<any>([]);
    const [menuData, setMenuData] = useState({
        rowId: '',
        email: '',
        first: '',
        userId: '',
        jobId: '',
        phone: '',
        poolCount: 0,
        poolIds: [],
        poolNames: [],
        sequenceIds: [],
        sequenceNames: [],
        sequenceCount: 0
    });
    const [selectAllElement, setSelectAllElement] = useState<null | HTMLElement>(null);
    const openSelectAllMenu = Boolean(selectAllElement);
    const openSelectAll = (event: React.MouseEvent<HTMLButtonElement>) => {
        setSelectAllElement(event.currentTarget);
    };
    const checkedCount = Object.keys(rowSelection).filter((id) => Boolean(rowSelection[id])).length;
    const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);
    const someAreChecked = (!isSelectAllChecked && checkedCount) ? true : false;
    const [openSequenceModal, setOpenSequenceModal] = useState(false);
    // const [addtolistanchorEl, setAddToListAnchorEl] = useState<null | HTMLElement>(null);
    // const openAddToListenBtn = Boolean(addtolistanchorEl);

    const [sortAnchorEl, setSortAnchorEl] = useState<HTMLButtonElement | null>(null);
    const sortOpen = Boolean(sortAnchorEl);
    const sortId = sortOpen ? 'simple-popover' : undefined;
    // const [mainJsonData, setMainJsonData] = useState<any>({
    //     sites: "Monster,Careerbuilder,Mastercand"
    // });
    const mainJsonDataRef = useRef<any>({
        sites: "Monster,Careerbuilder,Mastercand"
    });
    const [dataLoading, setDataLoading] = useState(false);
    const currentSelectCount = useRef(0);
    const countCalled = useRef(0);
    const [isTableLoading, SetIsTableLoading] = useState(false)

    // const [sequenceCountList, setSequenceCountList] = useState<any>(null);
    const [selectedRowCount, setSelectedRowCount] = useState(0);

    const [searchParams, setSearchParams] = useSearchParams();
    const filtersSearchId = useRef(searchParams.get('id') ? searchParams.get('id') as string : "");
    const isFirstTimeLoad = useRef(false);

    const [sortType, setSortType] = useState(sessionStorage.getItem(`curately_search_${filtersSearchId.current}`) ?
        JSON.parse(sessionStorage.getItem(`curately_search_${filtersSearchId.current}`) as string)?.sortType || "des" : "des");

    const [sortColumn, setSortColumn] = useState(sessionStorage.getItem(`curately_search_${filtersSearchId.current}`) ?
        JSON.parse(sessionStorage.getItem(`curately_search_${filtersSearchId.current}`) as string)?.sortColumn || "Posting Date" : "Posting Date");

    const [tabValue, setTabValue] = useState(sessionStorage.getItem(`curately_search_${filtersSearchId.current}`) ?
        JSON.parse(sessionStorage.getItem(`curately_search_${filtersSearchId.current}`) as string)?.tabValue || "All" : 'All');

    const [rowCount, setRowCount] = useState(sessionStorage.getItem(`curately_search_${filtersSearchId.current}`) ?
        JSON.parse(sessionStorage.getItem(`curately_search_${filtersSearchId.current}`) as string)?.total || 0 : 0);

    const filtersSearchData = useRef({
        total: 0,
        filter: {},
        filterFormik: {},
        data: [],
        tabValue: "",
        sortColumn: "Posting Date",
        sortType: "des",
        sorting: [{ desc: sortType === "des" ? true : false, id: sortColumn.toLowerCase() }],
        tabList: [
            { label: 'All', count: 0, isLoaded: false, toCheckName: "All" },
            { label: 'Monster', count: 0, isLoaded: false, toCheckName: "Monster" },
            { label: 'Career Builder', count: 0, isLoaded: false, toCheckName: "Careerbuilder" },
            { label: 'Local Database', count: 0, isLoaded: false, toCheckName: "Mastercand" },
        ],
        pagination: { pageIndex: 0, pageSize: 50, }
    })

    const filtersDataFromSession = sessionStorage.getItem(`curately_search_${filtersSearchId.current}`) ?
        JSON.parse(sessionStorage.getItem(`curately_search_${filtersSearchId.current}`) as string)?.filter :
        { sites: "Monster,Careerbuilder,Mastercand" }

    const filtersFormikDataFromSession = sessionStorage.getItem(`curately_search_${filtersSearchId.current}`) ?
        JSON.parse(sessionStorage.getItem(`curately_search_${filtersSearchId.current}`) as string)?.filterFormik : null;

    const filterFormikData = useRef(filtersFormikDataFromSession ? { ...filtersFormikDataFromSession } : {
        monster: true,
        careerBuilder: true,
        localDatabase: true,
        selectedJobTitle: "",
        selectedJobId: "",
        parsedDocument: "",
        skills: [
            { recentUse: false, experLevel: "", skillName: "" }
        ],
        keyWords: "",
        location: {
            states: "", zipcode: "", radius: "",
            willingtoRelocate: false
        },
        employer: [
            { employerName: "", recentEmployer: false }
        ],
        jobTitle: [
            { title: "", recentJobTitle: false }
        ],
        daysBack: "30",
        school: "",
        workAuth: "",
        govtclear: "",
        date: "",
        mrjd: "",
        jsp: "",
        limit: "",
        smp: "",
        fulltime: "",
        parttime: "",
        perdiem: "",
        employee: "",
        intern: "",
        temporary: "",
        seasonal: "",
    })

    useEffect(() => {
        if (!searchParams.get('id')) {
            let v4Id = uuidv4();
            setSearchParams({ id: v4Id });
            filtersSearchId.current = v4Id;
            isFirstTimeLoad.current = true;
        } else {
            filtersSearchId.current = searchParams.get('id') as string;
            let sessionData = sessionStorage.getItem(`curately_search_${filtersSearchId.current}`);
            let parsedSessionData = JSON.parse(sessionData as string);
            if (sessionData && parsedSessionData) {
                filtersSearchData.current = JSON.parse(sessionData as string);
                // trackPromise(
                //     new Promise((resolve, reject) => {
                //         setTimeout(() => {
                //             resolve(true)
                //         }, 1);
                //     }).then(() => {
                //         mainJsonDataRef.current = {
                //             ...filtersDataFromSession,
                //             sites: filtersDataFromSession?.sites ? filtersDataFromSession?.sites : "Monster,Careerbuilder,Mastercand"
                //         }
                //         isFirstTimeLoad.current = true;
                //         setCandidatesData(filtersSearchData.current?.data || []);
                //     }).catch(() => {
                //         loadSortAndBuild(false);
                //     })
                // )
                setTimeout(() => {
                    isFirstTimeLoad.current = true;
                    setCandidatesData(filtersSearchData.current?.data || []);
                    mainJsonDataRef.current = {
                        ...filtersDataFromSession,
                        sites: filtersDataFromSession?.sites ? filtersDataFromSession?.sites : "Monster,Careerbuilder,Mastercand"
                    }
                }, 1);
            }
        }
    }, [searchParams]);


    const updateJobDetails = (id: string, name: string) => {
        setSelectedJob({
            title: name,
            id: id,
        });
    };

    const handleTableMenuSendMailOpen = (sendMailId: any) => {
        if (sendMailId) {
            setDialogStatus(true);
            setEmailOnClicked(sendMailId);
            setTableOpenMail(null);
        }
        // console.log(sendMailId);
    };
    const handleTableCall = (event: React.MouseEvent<HTMLButtonElement>, callId: any) => {

        // console.log('filterCallId', callId);
        if (callId) {
            setTableOpenMail(null);
            setTableOpenCall(event.currentTarget);
            setSelectedRowId(callId)
        }

    };

    const handleTableClose = () => {
        setTableOpenMail(null);
        setTableOpenCall(null);
        setTableOpenList(null);
        setTableOpenSequence(null);
    };


    // const handleSequancePopup = (value: any | null) => {
    //     // Handle the value returned from the popup
    //     setOpenSequenceModal(false);
    //     setSequenceCountList(value);
    //     //console.log("close : "+value);
    //     let tempData: any = candidatesData;
    //     for (let index = 0; index < candidatesData.length; index++) {
    //         if (tempData[index].userId === value.userIds) {
    //             tempData[index].sequenceCount = tempData[index].sequenceCount + 1;
    //             const arrPoolIds = tempData[index].sequenceIds;
    //             tempData[index].sequenceIds = [...arrPoolIds, value.sequenceIds];
    //         }
    //     }
    //     //  console.log("after : "+ tempData);
    //     setCandidatesData(tempData);

    // };

    // const handleShowCallSnack = (callId: any) => {
    //     setOpenCallSnack((prev: any) => ({
    //         ...prev,
    //         [callId]: true
    //     }));
    //     setTableOpenCall(null);
    // };

    const handleTableMail = (event: React.MouseEvent<HTMLButtonElement>, mailId: any) => {

        if (mailId) {
            setTableOpenMail(event.currentTarget);
            setSelectedRowId(mailId);
            setTableOpenCall(null);
            // console.log('aa', event.currentTarget, "---" + mailId, " === " + openTableMail);
        }
    };


    // const handleShowSnack = (snackId: any) => {
    //     setOpenSnack((prev: any) => ({
    //         ...prev,
    //         [snackId]: true
    //     }));
    //     setTableOpenMail(null);
    // };

    const [pagination, setPagination] = useState(sessionStorage.getItem(`curately_search_${filtersSearchId.current}`) ?
        JSON.parse(sessionStorage.getItem(`curately_search_${filtersSearchId.current}`) as string)?.pagination || {
            pageIndex: 0,
            pageSize: 50,
        } : {
            pageIndex: 0,
            pageSize: 50,
        });
    const [sorting, setSorting] = useState<MRT_SortingState>(
        sessionStorage.getItem(`curately_search_${filtersSearchId.current}`) ?
            (JSON.parse(sessionStorage.getItem(`curately_search_${filtersSearchId.current}`) as string)?.sorting || [{
                desc: sortType === "des" ? true : false,
                id: sortColumn.toLowerCase()
            }]) :
            [{
                desc: sortType === "des" ? true : false,
                id: sortColumn.toLowerCase()
            }]);



    const getCount = (count: string) => {
        if (count.length > 6 && count.length < 9) {
            const startDigits = count.length - 6;
            const decimalNum = count.slice(startDigits, startDigits + 1);
            return (
                count.slice(0, startDigits) +
                (decimalNum !== "0" ? "." + decimalNum : "") +
                "M"
            );
        } else if (count.length > 3 && count.length < 6) {
            const startDigits = count.length - 3;
            const decimalNum = count.slice(startDigits, startDigits + 1);
            return (
                count.slice(0, startDigits) +
                (decimalNum !== "0" ? "." + decimalNum : "") +
                "K"
            );
        } else {
            return count;
        }
    };

    // const handleClickAddToListen = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     setAddToListAnchorEl(event.currentTarget);
    // };

    const handleSortClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setSortAnchorEl(event.currentTarget);
    };

    const handleSortClose = () => {
        setSortAnchorEl(null);
    };
    const [tabList, setTabList] = useState(
        sessionStorage.getItem(`curately_search_${filtersSearchId.current}`) ?
            (JSON.parse(sessionStorage.getItem(`curately_search_${filtersSearchId.current}`) as string)?.tabList || [
                { label: 'All', count: 0, isLoaded: false, toCheckName: "All" },
                { label: 'Monster', count: 0, isLoaded: false, toCheckName: "Monster" },
                { label: 'Career Builder', count: 0, isLoaded: false, toCheckName: "Careerbuilder" },
                { label: 'Local Database', count: 0, isLoaded: false, toCheckName: "Mastercand" },
            ]) : [
                { label: 'All', count: 0, isLoaded: false, toCheckName: "All" },
                { label: 'Monster', count: 0, isLoaded: false, toCheckName: "Monster" },
                { label: 'Career Builder', count: 0, isLoaded: false, toCheckName: "Careerbuilder" },
                { label: 'Local Database', count: 0, isLoaded: false, toCheckName: "Mastercand" },
            ]
    );
    const openSequnceToolTip = (
        event: React.MouseEvent<HTMLButtonElement>, callId: any
    ) => {
        setTableOpenList(event.currentTarget);
        // loadDistributionList();
        setSelectedRowId(callId);
    };
    const setDataToSession = (data: any[]) => {
        let dataToSave = {
            total: filtersSearchData.current.total,
            filter: mainJsonDataRef.current,
            filterFormik: filterFormikData.current,
            data: data,
            tabValue: tabValue,
            sorting: sorting,
            sortColumn: sortColumn,
            sortType: sortType,
            pagination: pagination,
            tabList: filtersSearchData.current.tabList
        }
        sessionStorage.setItem(`curately_search_${filtersSearchId.current}`, JSON.stringify(dataToSave));
    }

    const loadResumesData = async (
        filtersJson: any,
        json: any,
        initialLoad: boolean
    ) => {
        if (filtersJson.searchId) {
            SetIsTableLoading(true)
            setDataLoading(initialLoad ? true : false);
            trackPromise(
                ApiService.getByParams(
                    193,
                    "Jobboards/getResults.jsp",
                    {
                        searchId: filtersJson.searchId,
                        site: (tabValue === "Local Database") ? "Mastercand" : (tabValue === "Career Builder") ? "Careerbuilder" : (tabValue === "Monster") ? "Monster" : "ALL",
                        // filtersJson.sites
                        next: (pagination.pageSize * pagination.pageIndex) ? pagination.pageSize * pagination.pageIndex : 0,
                        sortBy: json.sortBy,
                        sort: json.orderBy,
                        pageSize: pagination.pageSize
                    }
                ).then((result: any) => {
                    countCalled.current = 0;
                    setDataLoading(false);
                    // console.log(result.data);
                    let tempData = result.data.data;
                    if (result.data && result.data.data) {
                        for (let al = 0; al < tempData.length; al++) {

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
                        // console.log("rowPageIndex - " + rowPageIndex + "===" + checkedCount + " - " + tempData.length + "-- pageindex - " + pagination.pageIndex)
                        // if ((rowPageIndex > 0) && (rowPageIndex > pagination.pageIndex)) {
                        //     // let rowData={...rowSelection};
                        //     let rowDatanext: any = {};
                        //     for (let index = 0; index < tempData.length; index++) {
                        //         rowDatanext[tempData[index].ResumeId] = true;
                        //     }
                        //     setRowSelection({ ...rowSelection, ...rowDatanext });
                        //     setIsSelectAllChecked(true);
                        // } else {
                        //     setIsSelectAllChecked(false);
                        // }
                        if (!isSelectAllChecked) {
                            setSelectedRowCount(tempData.length);
                        }

                        let countData = result.data.count;
                        if (countData && countData.length) {
                            if (countData.every((item: {
                                count: string,
                                isComplete: boolean,
                                site: string
                            }) => item.isComplete)) {
                                let allCount = 0;
                                let monsterCount = 0;
                                let careerBuilderCount = 0;
                                let accuickCount = 0;
                                for (let cd = 0; cd < countData.length; cd++) {
                                    allCount += Number(countData[cd].count);
                                    if (countData[cd].isComplete) {
                                        if (countData[cd].site === "Monster") {
                                            monsterCount = Number(countData[cd].count);
                                        } else if (countData[cd].site === "Careerbuilder") {
                                            careerBuilderCount = Number(countData[cd].count);
                                        } else if (countData[cd].site === "Mastercand") {
                                            accuickCount = Number(countData[cd].count);
                                        }
                                    }

                                }
                                if (countData.every((item: {
                                    count: string,
                                    isComplete: boolean,
                                    site: string
                                }) => item.isComplete) && countData.length > 2) {
                                    let tempTabList = [
                                        { label: 'All', count: allCount, isLoaded: true, toCheckName: "All" },
                                        { label: 'Monster', count: monsterCount, isLoaded: true, toCheckName: "Monster" },
                                        { label: 'Career Builder', count: careerBuilderCount, isLoaded: true, toCheckName: "Careerbuilder" },
                                        { label: 'Local Database', count: accuickCount, isLoaded: true, toCheckName: "Mastercand" },
                                    ]
                                    setTabList([...tempTabList]);
                                    filtersSearchData.current = {
                                        ...filtersSearchData.current,
                                        tabList: tempTabList,
                                    }
                                }
                                let tempRowCount = tabValue === "Local Database" ?
                                    accuickCount : tabValue === "Career Builder" ?
                                        careerBuilderCount : tabValue === "Monster" ?
                                            monsterCount : allCount
                                setRowCount(tempRowCount);
                                filtersSearchData.current = {
                                    ...filtersSearchData.current,
                                    total: tempRowCount
                                }
                            }
                        }
                        if (initialLoad) {
                            setCandidatesData(tempData);
                            setDataToSession(tempData);
                        } else {
                            getUserInfo(tempData);
                        }
                    } else {
                        setRowCount(0);
                        setCandidatesData([]);
                        SetIsTableLoading(false)
                    }
                    if (initialLoad) {
                        loadResumesCount(filtersJson, json, initialLoad);
                    }
                })
            );
        }
    }

    const loadResumesCount = useCallback(debounce(async (
        filtersJson: any,
        json: any,
        isCount: boolean
    ) => {
        countCalled.current = countCalled.current + 1;
        if (filtersJson.searchId) {
            setCountLoading(true);
            ApiService.getByParams(
                193,
                "Jobboards/getCount.jsp",
                {
                    searchId: filtersJson.searchId,
                    // site: (tabValue === "Local Database") ? "Mastercand" : (tabValue === "Career Builder") ? "Careerbuilder" : (tabValue === "Monster") ? "Monster" : "ALL",
                    // filtersJson.sites
                    site: "ALL",
                    next: 0,
                    sortBy: json.sortBy,
                    sort: json.orderBy,
                }
            ).then((result: any) => {
                // console.log(result.data);
                if (countCalled.current < 10) {
                    let countData = result.data.count;
                    if (countData && countData.length) {
                        if (countData.every((item: {
                            count: string,
                            isComplete: boolean,
                            site: string
                        }) => item.isComplete)) {
                            setCountLoading(false);
                            // console.log(result.data);
                            let allCount = 0;
                            let monsterCount = 0;
                            let careerBuilderCount = 0;
                            let accuickCount = 0;
                            for (let cd = 0; cd < countData.length; cd++) {
                                allCount += Number(countData[cd].count);
                                if (countData[cd].isComplete) {
                                    if (countData[cd].site === "Monster") {
                                        monsterCount = Number(countData[cd].count);
                                    } else if (countData[cd].site === "Careerbuilder") {
                                        careerBuilderCount = Number(countData[cd].count);
                                    } else if (countData[cd].site === "Mastercand") {
                                        accuickCount = Number(countData[cd].count);
                                    }
                                }

                            }
                            let tempTabList = [
                                { label: 'All', count: allCount, isLoaded: true, toCheckName: "All" },
                                { label: 'Monster', count: monsterCount, isLoaded: true, toCheckName: "Monster" },
                                { label: 'Career Builder', count: careerBuilderCount, isLoaded: true, toCheckName: "Careerbuilder" },
                                { label: 'Local Database', count: accuickCount, isLoaded: true, toCheckName: "Mastercand" },
                            ]
                            setTabList(tempTabList);
                            filtersSearchData.current = {
                                ...filtersSearchData.current,
                                tabList: tempTabList,
                            }

                            let tempRowCount = tabValue === "Local Database" ?
                                accuickCount : tabValue === "Career Builder" ?
                                    careerBuilderCount : tabValue === "Monster" ?
                                        monsterCount : allCount
                            setRowCount(tempRowCount);
                            filtersSearchData.current = {
                                ...filtersSearchData.current,
                                total: tempRowCount
                            }
                            if (isCount) {
                                setTimeout(() => {
                                    loadResumesData(filtersJson, json, false);
                                }, 2000);
                            }
                        } else {
                            setTimeout(() => {
                                loadResumesCount(filtersJson, json, true);
                            }, 2000);
                        }
                    }
                } else {
                    setCountLoading(false);
                    showToaster('An error occured while fetching resumes. Please try later', 'error');
                }
            });
        }
    }, 400), [])


    const getUserInfo = (tempCandidatesData: any) => {
        let links = tempCandidatesData.map((c: any) => c.ResumeId).filter((item: any) => item);
        // console.log(links);
        ApiService.getByParams(
            193,
            "Jobboards/users_info.jsp",
            { links: links.join() }
        ).then((result) => {
            let linksData = result.data;
            const tempItems = [...tempCandidatesData];
            if (linksData && linksData.length) {
                for (let ld = 0; ld < linksData.length; ld++) {
                    let tiIndex = tempItems.findIndex(item => item.ResumeId === linksData[ld].link);
                    if (tiIndex !== -1) {
                        tempItems[tiIndex].email = linksData[ld].email;
                        tempItems[tiIndex].link = linksData[ld].link;
                        tempItems[tiIndex].phone = linksData[ld].phone;
                        tempItems[tiIndex].status = linksData[ld].status;
                        tempItems[tiIndex].userId = linksData[ld].userId;

                        let poolIds = Array.isArray(linksData[ld].poolIds)
                            ? linksData[ld].poolIds
                            : linksData[ld].poolIds
                                ? linksData[ld].poolIds.split(',')
                                : [];


                        poolIds = [...new Set(poolIds)];

                        let poolNames = Array.isArray(linksData[ld].poolNames)
                            ? linksData[ld].poolNames
                            : linksData[ld].poolNames
                                ? linksData[ld].poolNames.split(',')
                                : [];


                        poolNames = [...new Set(poolNames)];

                        let sequenceIds = Array.isArray(tempItems[tiIndex].sequenceIds) ? tempItems[tiIndex].sequenceIds : (tempItems[tiIndex].sequenceIds && tempItems[tiIndex].sequenceIds !== "0") ? tempItems[tiIndex].sequenceIds.split(',') : [];

                        let sequenceNames = Array.isArray(tempItems[tiIndex].sequenceNames) ? tempItems[tiIndex].sequenceNames : tempItems[tiIndex].sequenceNames ? tempItems[tiIndex].sequenceNames.split(',') : [];
                        tempItems[tiIndex].poolIds = tempItems[tiIndex].poolIds || [];
                        tempItems[tiIndex].poolNames = tempItems[tiIndex].poolNames || [];
                        tempItems[tiIndex].sequenceIds = tempItems[tiIndex].sequenceIds || [];
                        tempItems[tiIndex].sequenceNames = tempItems[tiIndex].sequenceNames || [];
                        poolIds.forEach((id: any, index: any) => {
                            if (!tempItems[tiIndex].poolIds.includes(id)) {
                                tempItems[tiIndex].poolIds.push(id);
                                tempItems[tiIndex].poolNames.push(poolNames[index]);
                            }
                        });

                        let count = 0;
                        let start = false;

                        for (let j = 0; j < sequenceIds.length; j++) {
                            for (let k = 0; k < tempItems[tiIndex].sequenceIds.length; k++) {
                                if (sequenceIds[j] === tempItems[tiIndex].sequenceIds[k]) {
                                    start = true;
                                }
                            }
                            count++;
                            if (count === 1 && start === false) {
                                tempItems[tiIndex].sequenceIds.push(sequenceIds[j]);
                                tempItems[tiIndex].sequenceNames.push(sequenceNames[j]);
                            }
                            start = false;
                            count = 0;
                        }

                        tempItems[tiIndex].poolCount = tempItems[tiIndex].poolIds.length;
                        tempItems[tiIndex].sequenceCount = tempItems[tiIndex].sequenceIds.length;
                    }
                }
            }


            setCandidatesData([...tempItems]);
            setDataToSession([...tempItems]);
            SetIsTableLoading(false)
        })
    }


    // const handleTableSequence = (
    //     event: React.MouseEvent<HTMLButtonElement>, userId: any
    // ) => {
    //     setOpenSequenceModal(true);
    //     setTableOpenSequence(null);
    //     // loadDistributionList();
    //     let usrList = (userId !== "") ? userId : Object.keys(rowSelection)
    //     setSelectSequenceList(usrList);
    // };

    const addToSequenceList = (id: string, name: string, candidateId: string) => {
        if (name && name.trim()) {
            handleProfileMenuClose();
            const saveData = {
                clientId: userLocalData.getvalue('clientId'),
                sequenceId: id,
                recrId: userLocalData.getvalue('recrId'),
                userIds: candidateId,
            };

            ApiService.postWithData('admin', 'sequenceAssignUsers', saveData)
                .then((response: any) => {
                    if ((response.data.message === "Success") || (response.data.Message === "Success")) {
                        showToaster("Campaign has been assigned successfully", 'success');

                        const updatedCandidatesData = candidatesData.map((candidate: any) => {
                            if (candidate.userId === candidateId) {

                                const updatedSequenceIds = Array.from(new Set([...candidate.sequenceIds, id]));
                                const updatedSequenceNames = Array.from(new Set([...candidate.sequenceNames, name]));

                                return {
                                    ...candidate,
                                    sequenceCount: updatedSequenceIds.length,
                                    sequenceIds: updatedSequenceIds,
                                    sequenceNames: updatedSequenceNames,
                                };
                            }
                            return candidate;
                        });
                        setCandidatesData(updatedCandidatesData);
                        setSelectedSequence({ id: "", name: "" });
                        setDataToSession(updatedCandidatesData);
                    } else {
                        showToaster(response.data.Message || "An error occurred while assigning", 'error');
                    }
                })
                .catch((error) => {
                    console.error("API Error:", error);
                });
        }
    };



    const [selectedTalentPool, setSelectedTalentPool] = useState({
        id: "",
        name: "",
    });

    const addToTalentPool = (id: string, name: string, candidateId: string) => {
        if (name && name.trim()) {
            handleProfileMenuClose();

            const saveData = {
                clientId: userLocalData.getvalue('clientId'),
                poolId: id,
                recrId: userLocalData.getvalue('recrId'),
                userIds: candidateId,
            };

            trackPromise(
                ApiService.postWithData("admin", 'talentPoolInsertIndex', saveData)
                    .then((response: any) => {
                        if (response.data.Message === "Success") {
                            showToaster("Pool has been assigned successfully", 'success');

                            let updatedCandidatesData = candidatesData.map((candidate: any) => {
                                if (candidate.userId === candidateId) {

                                    const updatedPoolIds = Array.from(new Set([...candidate.poolIds, id]));
                                    const updatedPoolNames = Array.from(new Set([...candidate.poolNames, name]));

                                    return {
                                        ...candidate,
                                        poolCount: updatedPoolIds.length,
                                        poolIds: updatedPoolIds,
                                        poolNames: updatedPoolNames,
                                    };
                                }
                                return candidate;
                            });
                            setCandidatesData(updatedCandidatesData);
                            setDataToSession(updatedCandidatesData);

                        } else {
                            showToaster(response.data.Message || "An error occurred while assigning", 'error');
                        }
                        setSelectedTalentPool({ id: "", name: "" });
                    })
            );
        }
    };


    const selectAllMenuItemClicked = (menuType: any) => {
        if (menuType === "page") {

            // const startIndex = pagination.pageIndex * pagination.pageSize;
            const endIndex = Math.min((pagination.pageIndex + 1) * pagination.pageSize, candidatesData.length);
            let checkedCheckboxesData: any = {};
            for (let index = 0; index < endIndex; index++) {
                checkedCheckboxesData[candidatesData[index].ResumeId] = true;
            }
            setRowPageIndex(0);
            setRowSelection(checkedCheckboxesData);
            setIsSelectAllChecked(false);
            currentSelectCount.current = Object.keys(rowSelection).length;
            // console.log(currentSelectCount.current + " ===---" + endIndex);
        } else if (menuType === "all") {

            // let rowData: any = {};
            // let tempData: any = candidatesData;
            // for (let index = 0; index < candidatesData.length; index++) {
            //     rowData[tempData[index].userId] = true;
            // }
            // currentSelectCount.current = (rowCount > 10000) ? 10000 : rowCount;

            // let pIndex = Math.ceil((currentSelectCount.current) / pagination.pageSize);
            // setRowPageIndex(pIndex);
            // // console.log(rowData);
            // setRowSelection(rowData);
            // setIsSelectAllChecked(true);

            trackPromise(
                ApiService.getByParams(
                    193,
                    "Jobboards/getResults.jsp", //
                    {
                        searchId: mainJsonDataRef.current.searchId,
                        site: (tabValue === "Local Database") ? "Mastercand" : (tabValue === "Career Builder") ? "Careerbuilder" : (tabValue === "Monster") ? "Monster" : "ALL",
                        // filtersJson.sites
                        next: 0,
                        sortBy: 'postingDate',
                        sort: 'desc',
                        pageSize: 300
                    }
                ).then((result: any) => {
                    countCalled.current = 0;
                    setDataLoading(false);
                    // console.log(result.data);
                    let tempData = result.data.data;
                    if (result.data && result.data.data) {
                        for (let al = 0; al < tempData.length; al++) {

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
                        getUserInfo(tempData);
                        // console.log("rowPageIndex - " + rowPageIndex + "===" + checkedCount + " - " + tempData.length + "-- pageindex - " + pagination.pageIndex)
                        if ((rowPageIndex > 0) && (rowPageIndex > pagination.pageIndex)) {
                            // let rowData={...rowSelection};
                            let rowDatanext: any = {};
                            for (let index = 0; index < tempData.length; index++) {
                                rowDatanext[tempData[index].ResumeId] = true;
                            }
                            setRowSelection({ ...rowSelection, ...rowDatanext });
                            setIsSelectAllChecked(true);
                        } else {
                            setIsSelectAllChecked(false);
                        }

                        let countData = result.data.count;
                        if (countData && countData.length) {
                            if (countData.every((item: {
                                count: string,
                                isComplete: boolean,
                                site: string
                            }) => item.isComplete)) {
                                let allCount = 0;
                                let monsterCount = 0;
                                let careerBuilderCount = 0;
                                let accuickCount = 0;
                                for (let cd = 0; cd < countData.length; cd++) {
                                    allCount += Number(countData[cd].count);
                                    if (countData[cd].isComplete) {
                                        if (countData[cd].site === "Monster") {
                                            monsterCount = Number(countData[cd].count);
                                        } else if (countData[cd].site === "Careerbuilder") {
                                            careerBuilderCount = Number(countData[cd].count);
                                        } else if (countData[cd].site === "Mastercand") {
                                            accuickCount = Number(countData[cd].count);
                                        }
                                    }

                                }
                                if (countData.every((item: {
                                    count: string,
                                    isComplete: boolean,
                                    site: string
                                }) => item.isComplete) && countData.length > 2) {
                                    setTabList([
                                        { label: 'All', count: allCount, isLoaded: true, toCheckName: "All" },
                                        { label: 'Monster', count: monsterCount, isLoaded: true, toCheckName: "Monster" },
                                        { label: 'Career Builder', count: careerBuilderCount, isLoaded: true, toCheckName: "Careerbuilder" },
                                        { label: 'Local Database', count: accuickCount, isLoaded: true, toCheckName: "Mastercand" },
                                    ]);
                                }
                                if (tabValue === "Local Database") {
                                    setRowCount(accuickCount);
                                } else if (tabValue === "Career Builder") {
                                    setRowCount(careerBuilderCount);
                                } else if (tabValue === "Monster") {
                                    setRowCount(monsterCount);
                                } else {
                                    setRowCount(allCount);
                                }
                            }
                        }
                    } else {
                        setRowCount(0);
                        setCandidatesData([]);
                    }
                    let rowData: any = {};

                    for (let index = 0; index < tempData.length; index++) {
                        rowData[tempData[index].userId] = true;
                    }
                    setIsSelectAllChecked(true);
                    setRowSelection(rowData);
                    setSelectedRowCount(tempData.length)
                })
            );

        } else if (menuType === "clear") {
            setIsSelectAllChecked(false);
            setRowSelection({});
            setRowPageIndex(0);
            currentSelectCount.current = 0;
        }
        setSelectAllElement(null);
    };

    const openCandidateView = (userId: string, candidateName: string) => {
        // window.open(globalData.getWindowLocation() + "candidate/view/" + userId + "/" + mainJsonDataRef.current.selectedJobId);
        navigate("../../candidate/view/" + userId + "/" + mainJsonDataRef.current.selectedJobId, {
            state: {
                data: [
                    {
                        text: "Search",
                        link: "../../resume/jobBoards"
                    },
                    {
                        text: "Resumes",
                        link: `../../resume/jobBoards?id=${filtersSearchId.current}`,
                    },
                    {
                        text: candidateName, link: ""
                    },
                ]
            }
        })
    }

    const getUserIdByResumeId = (id: string, site: string, postingDate: string, candidateName: string) => {
        // console.log(id, site);
        // console.log(mainJsonData.selectedJobId);
        // http://52.40.49.193/Accuick_API/Jobboards/openresume.jsp?jobId=232970&clientId=2&resumeLink=52hbuikkywcdyvcu&site=Monster&date=2023-12-16&searchId=133&recrId=1893
        trackPromise(
            ApiService.getByParams(
                193,
                "Jobboards/openresume.jsp",
                {
                    jobId: mainJsonDataRef.current.selectedJobId,
                    clientId: userLocalData.getvalue('clientId'),
                    resumeLink: id,
                    site: site,
                    date: postingDate,
                    searchId: mainJsonDataRef.current.searchId,
                    recrId: userLocalData.getvalue('recrId'),
                }
            ).then((response: any) => {
                // console.log(response.data);
                if (response.data.userId) {
                    openCandidateView(response?.data?.userId, candidateName);
                    // window.open(globalData.getWindowLocation() + "candidate/view/" + response.data.userId + "/" + mainJsonDataRef.current.selectedJobId);
                    if (response.data.status) {
                        indexCandidate(response.data.status, response?.data?.userId);
                    }
                }
            })
        )
    }
    const deleteSequenceId = (id: string, candidateId: string, name: string) => {
        trackPromise(
            ApiService.postWithData('admin', 'sequenceDeleteUser', {
                sequenceId: id,
                userIds: candidateId,
                recrId: userLocalData.getvalue('recrId'),
                clientId: userLocalData.getvalue('clientId')
            })
                .then(
                    (response: any) => {
                        // console.log(response)
                        if (response.data.Message === "Success") {
                            showToaster("Campaign has been deleted Successfully", 'success');
                            const updatedCandidatesData = candidatesData.map((candidate: any) => {
                                if (candidate.userId === candidateId) {
                                    const updatedSequenceIds = candidate.sequenceIds.filter((seqId: string) => seqId !== id);
                                    const updatedSequenceNames = name ? candidate.sequenceNames.filter((seqName: string) => seqName !== name) : candidate.sequenceNames;

                                    return {
                                        ...candidate,
                                        sequenceCount: updatedSequenceIds.length,
                                        sequenceIds: updatedSequenceIds,
                                        sequenceNames: updatedSequenceNames,
                                    };
                                }
                                return candidate;
                            });
                            setCandidatesData(updatedCandidatesData);
                            setDataToSession(updatedCandidatesData)
                        } else {
                            showToaster("An error occured while deleting", 'error');
                        }
                    }
                )
        );
    }

    const handleSequenceClick = (id: string, name: string) => {
        deleteSequenceId(id, menuData.userId, name);
    };

    const csvConfig = mkConfig({
        fieldSeparator: ',',
        quoteStrings: true,
        quoteCharacter: '"',
        decimalSeparator: '.',
        showColumnHeaders: true,
        useBom: true,
        filename: "Curately_Search_Candidate_Data",
        columnHeaders: ['site', 'User ID', 'User Name', 'Email', 'Phone', 'Recent Employer', 'city', 'state', 'zipcode', 'country', 'Recent Job Title', 'Posting Date', 'Pool', 'Sequence']
    });

    const preprocessData = (data: any) => {
        return data.map((item: any) => {
            const poolNames = Array.isArray(item.poolNames) ? item.poolNames.join(', ') : '';
            const sequenceNames = Array.isArray(item.sequenceNames) ? item.sequenceNames.join(', ') : '';

            return {
                site: item.Site || '',
                'User ID': item.userId || '',
                'User Name': item.Name || '',
                Email: item.email || '',
                Phone: item.phone || '',
                'Recent Employer': item.RecentEmployer || '',
                city: item.city || '',
                state: item.state || '',
                zipcode: item.zipcode || '',
                country: item.Location,
                'Recent Job Title': item.RecentJobTitle || '',
                'Posting Date': item.PostingDate || '',
                Pool: poolNames,
                Sequence: sequenceNames
            };
        });
    };

    const handleExportData = () => {
        const selectedRows = Object.keys(rowSelection);
        const selectedData = candidatesData.filter((candidate: any) => selectedRows.includes(candidate.ResumeId || candidate.userId));
        const processedData = preprocessData(selectedData);

        const csv = generateCsv(csvConfig)(processedData);
        download(csvConfig)(csv);
    };
    // https://resume.accuick.com/Pipl/sovren_index_curately_community.jsp?clientId=2&userId=69&status=1
    // D:\apache-tomcat-8.5.20\webapps\Accuick_API\Curately/Sovren/sovren_index_curately_community.jsp

    const indexCandidate = (status: string, userId: string) => {
        ApiService.getByParams(
            193,
            "Curately/Sovren/sovren_index_curately_community.jsp",
            {
                clientId: userLocalData.getvalue('clientId'),
                userId: userId,
                status: status
            }
        ).then((_response: any) => {
            // console.log(response.data);
        })
    }


    const deleteTalentPoolId = (poolId: string, candId: string) => {
        trackPromise(
            // deleteTalentPoolCommunity/10024627/17
            ApiService.deleteById('admin', 'deleteTalentPoolCommunity', candId + "/" + poolId + '/' + userLocalData.getvalue('clientId'))
                .then(
                    (response: any) => {
                        // console.log(response)
                        if (response.data.Success) {
                            showToaster("Talent Pool deleted Successfully", 'success');
                            let updatedCandidatesData = candidatesData.map((candidate: any) => {
                                if (candidate.userId === candId) {
                                    const updatedPoolIds = candidate.poolIds.filter((id: string) => id !== poolId);
                                    const updatedPoolNames = candidate.poolNames.filter((name: string, index: number) => candidate.poolIds[index] !== poolId);

                                    return {
                                        ...candidate,
                                        poolCount: updatedPoolIds.length,
                                        poolIds: updatedPoolIds,
                                        poolNames: updatedPoolNames,
                                    };
                                }
                                return candidate;
                            });


                            setCandidatesData(updatedCandidatesData);
                            setDataToSession(updatedCandidatesData);


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


    // let navigate = useNavigate();
    // const openTalentPoolView = (id: string, name: string) => {
    //     localStorage.setItem("talentPoolName_" + id, name);
    //     navigate('/' + userLocalData.getvalue('clientName') + '/talentPool/view/' + id);
    //     // window.open(globalData.getWindowLocation() + "talentPool/view/" + id);
    // };

    const columns: MRT_ColumnDef<any>[] = useMemo(
        () => [
            {
                accessorKey: "Site",
                header: "Site",
                accessorFn: (row) => row.Site,
                size: 65,
                Cell: ({ renderedCellValue, row }) => {
                    let displayTitle = "";
                    let toolTipTitle = renderedCellValue;
                    if (renderedCellValue === "Monster") {
                        displayTitle = "MN";
                    } else if (renderedCellValue === "Careerbuilder") {
                        toolTipTitle = "Career Builder";
                        displayTitle = "CB";
                    } else if (renderedCellValue === "Mastercand") {
                        toolTipTitle = "Local Database";
                        displayTitle = "LD";
                    } else {
                        displayTitle = row.original.Site ? row.original.Site.substring(0, 2).toUpperCase() : "";
                    }

                    return (
                        <Tooltip title={toolTipTitle}>
                            <Avatar sx={{ width: 30, height: 30, fontSize: 12 }}>
                                {displayTitle}
                            </Avatar>
                        </Tooltip>
                    );
                }
            },

            {
                accessorKey: "Name",
                header: "Name",
                // enableColumnPinning: true,
                accessorFn: (row) => row.Name,
                Cell: ({ row }) => {
                    let postingDate = "";
                    if (row.original.PostingDate) {
                        let tempDate = new Date(row.original.PostingDate);
                        // fromISO
                        if (row.original.Site === "Careerbuilder") {
                            postingDate = DateTime.fromISO(tempDate.toISOString()).toFormat('MM/dd/yyyy');
                        }
                        if (row.original.Site === "Monster") {
                            postingDate = DateTime.fromISO(tempDate.toISOString()).toFormat('MM/dd/yyyy')
                        }
                        if (row.original.Site === "Mastercand") {
                            postingDate = row.original.PostingDate;
                        }
                    }
                    let tempName = (row.original.Name) ? row.original.Name.toLowerCase() : "";
                    let displayName = tempName.length > 30 ? tempName.slice(0, 30) + "..." : tempName;
                    // return (
                    //     <Tooltip title={tempName} classes={{ tooltip: 'tt-capital' }}>
                    //         <span>{displayName}</span>
                    //     </Tooltip>
                    // );
                    return (tempName.length > 30) ?
                        <Tooltip title={tempName} classes={{ tooltip: 'tt-capital' }}>
                            <span className="hightLightTd" onClick={() => {
                                if ((row.original.Site === "Mastercand") && row.original.userId) {
                                    getUserIdByResumeId(row.original.userId, row.original.Site, postingDate, tempName);
                                }
                                if (row.original.userId) {
                                    openCandidateView(row.original.userId, tempName);
                                } else {
                                    getUserIdByResumeId(row.original.ResumeId, row.original.Site, postingDate, tempName);
                                }
                            }
                            }>{displayName.toLowerCase()}</span>
                        </Tooltip>
                        :
                        <span className="hightLightTd" onClick={() => {
                            if ((row.original.Site === "Mastercand") && row.original.userId) {
                                getUserIdByResumeId(row.original.userId, row.original.Site, postingDate, tempName);
                            }
                            if (row.original.userId) {
                                openCandidateView(row.original.userId, tempName);
                            } else {
                                getUserIdByResumeId(row.original.ResumeId, row.original.Site, postingDate, tempName);
                            }
                        }
                        }>{row.original.Name.toLowerCase()}</span>
                },
            },

            {
                accessorKey: "Location",
                header: "Location",
                accessorFn: (row) => row.Location

            },
            {
                accessorKey: "RecentJobTitle",
                header: "Job Title",
                accessorFn: (row) => `${row.RecentJobTitle}`,
                Cell: ({ row }) => {
                    let jobTitle = (row.original.RecentJobTitle) ? row.original.RecentJobTitle.toLowerCase() : "";
                    let displayTitle = jobTitle.length > 30 ? jobTitle.slice(0, 30) + "..." : jobTitle;
                    return (
                        <Tooltip title={jobTitle} classes={{ tooltip: 'tt-capital' }}>
                            <span>{displayTitle}</span>
                        </Tooltip>
                    );
                }
            },
            {
                accessorKey: "RecentEmployer",
                header: "Company",
                accessorFn: (row) => `${row.RecentEmployer}`,
                Cell: ({ row }) => {
                    let jobTitle = (row.original.RecentEmployer) ? row.original.RecentEmployer.toLowerCase() : "";
                    let displayTitle = jobTitle.length > 30 ? jobTitle.slice(0, 30) + "..." : jobTitle;
                    return (
                        <Tooltip title={jobTitle} classes={{ tooltip: 'tt-capital' }}>
                            <span>{displayTitle}</span>
                        </Tooltip>
                    );
                }
            },
            {
                accessorKey: "PostingDate",
                header: "Last Updated",
                accessorFn: (row) => row.PostingDate,
                Cell: ({ row }) => {
                    let postingDate = "";
                    if (row.original.PostingDate) {
                        let tempDate = new Date(row.original.PostingDate);
                        // fromISO
                        if (row.original.Site === "Careerbuilder") {
                            postingDate = DateTime.fromISO(tempDate.toISOString()).toFormat('MM/dd/yyyy');
                        }
                        if (row.original.Site === "Monster") {
                            postingDate = DateTime.fromISO(tempDate.toISOString()).toFormat('MM/dd/yyyy');
                        }
                        if (row.original.Site === "Mastercand") {
                            postingDate = DateTime.fromISO(tempDate.toISOString()).toFormat('MM/dd/yyyy'); //row.original.PostingDate;
                        }
                    }
                    return <span>
                        {
                            postingDate ? postingDate : null
                        }
                        {/* {row.original.PostingDate ?
                            (row.original.Site === "Careerbuilder") ?
                                DateTime.fromFormat(row.original.PostingDate, 'yyyy/MM/dd').toFormat('MM/dd/yyyy')
                                :
                                (row.original.Site === "Monster" || row.original.Site === "Mastercand") ?
                                    row.original.PostingDate
                                    // , 'MM/dd/yyyy').toFormat('MM/dd/yyyy')
                                    :
                                    null
                            :
                            null
                        } */}
                    </span>
                }
                ,
            },
            // {
            //     accessorKey: "Actions",
            //     header: "Quick Actions",
            //     Cell: ({ row }) => (
            //         <Stack
            //             key={row.original.ResumeId}
            //         >
            //             {!row.original.email ? (
            //                 <Button
            //                     disableRipple
            //                     //onClick={submitToAccuick}
            //                     sx={{
            //                         backgroundColor: "var(--c-primary-color)",
            //                         "&:hover": {
            //                             backgroundColor: "var(--c-primary-color)",
            //                         },
            //                         height: "25px",
            //                         border: "1px solid",
            //                         cursor: checkedCount > 0 ? 'pointer' : 'not-allowed',

            //                         borderColor: "var(--c-primary-color)"
            //                     }}
            //                 >
            //                     <Typography
            //                         sx={{
            //                             fontFamily: "Segoe UI",
            //                             fontSize: "12px",
            //                             fontWeight: "400",
            //                             cursor: checkedCount > 0 ? 'pointer' : 'not-allowed',

            //                             color: "#ffffff",
            //                             textTransform: "capitalize"
            //                         }}
            //                     >Access Email</Typography>
            //                 </Button>

            //             ) : (

            //                 <ButtonGroup
            //                     variant="outlined"
            //                     id={
            //                         row.original.ResumeId
            //                     }

            //                     sx={{
            //                         height: "31px",
            //                         "& .MuiButtonGroup-grouped": {
            //                             marginRight: "1px",
            //                         },
            //                     }}
            //                 >
            //                     <Tooltip
            //                         title={row.original.email}
            //                         placement="top"
            //                     >
            //                         <Button
            //                             id={`mailbutton-${row.id}`}

            //                             onClick={(e) => {
            //                                 if (row.original.email) {
            //                                     setMenuData({
            //                                         rowId: row.id,
            //                                         email: row.original.email,
            //                                         first: row.original.Name,
            //                                         userId: row.original.userId,
            //                                         jobId: row.original.jobId,
            //                                         phone: '',
            //                                         poolCount: row.original.poolCount,
            //                                         poolIds: row.original.poolIds,
            //                                         poolNames: row.original.poolNames,
            //                                         sequenceIds: row.original.sequenceIds,
            //                                         sequenceNames: row.original.sequenceNames,
            //                                         sequenceCount: row.original.sequenceCount
            //                                     })
            //                                     handleTableMail(e, `${row.id}`);
            //                                 }
            //                             }}
            //                             aria-controls={
            //                                 openTableMail && selectedRowId === `${row.id}` ? `mail-${row.id}` : undefined
            //                             }
            //                             aria-haspopup="true"
            //                             aria-expanded={
            //                                 openTableMail && selectedRowId === `${row.id}` ? "true" : undefined
            //                             }
            //                             sx={{
            //                                 pointerEvents: row.original.email ? 'auto' : 'none',
            //                                 borderColor: openTableMail && selectedRowId === `${row.id}`
            //                                     ? "var(--c-primary-color) !important"
            //                                     : "var(--c-secondary-color)",
            //                                 backgroundColor: "#ffffff",
            //                                 color: openTableMail && selectedRowId === `${row.id}`
            //                                     ? "var(--c-primary-color) !important"
            //                                     : "#919191",
            //                                 borderRightColor: openTableMail && selectedRowId === `${row.id}`
            //                                     ? "var(--c-primary-color) !important"
            //                                     : "var(--c-secondary-color)",
            //                                 mr: "0px",
            //                                 "&:hover": {
            //                                     borderColor: "var(--c-secondary-color)",
            //                                     color: "#919191",
            //                                     backgroundColor: "#ffffff",
            //                                 },
            //                                 width: "33px",
            //                             }}
            //                             className="customButtonForHover"


            //                         >
            //                             <Box sx={{ position: 'relative', display: 'inline-block', alignItems: 'center', mt: 1 }}>
            //                                 <MailOutlineOutlinedIcon
            //                                     sx={{
            //                                         fontSize: "16px",
            //                                     }}
            //                                 />

            //                                 <Box
            //                                     sx={{
            //                                         backgroundColor: '#1DB268',
            //                                         height: '10px',
            //                                         width: '10px',
            //                                         borderRadius: '50%',
            //                                         fontSize: '10px',
            //                                         display: row.original.email ? 'flex' : 'none',
            //                                         justifyContent: 'center',
            //                                         alignItems: 'center',
            //                                         color: 'red',
            //                                         position: 'absolute',
            //                                         top: -2,
            //                                         right: -2
            //                                     }}>
            //                                     <DoneRoundedIcon
            //                                         sx={{
            //                                             fontSize: '8px',
            //                                             color: '#ffffff',
            //                                         }} />
            //                                 </Box>


            //                                 <Box
            //                                     sx={{
            //                                         backgroundColor: '#919191',
            //                                         height: '10px',
            //                                         width: '10px',
            //                                         borderRadius: '50%',
            //                                         fontSize: '10px',
            //                                         display: row.original.email ? 'none' : 'flex',
            //                                         justifyContent: 'center',
            //                                         alignItems: 'center',
            //                                         color: 'red',
            //                                         position: 'absolute',
            //                                         top: -2,
            //                                         right: -2
            //                                     }}>
            //                                     <CloseRoundedIcon
            //                                         sx={{
            //                                             fontSize: '8px',
            //                                             color: '#ffffff',
            //                                         }}
            //                                     />
            //                                 </Box>

            //                                 <Box
            //                                     sx={{
            //                                         backgroundColor: '#EB7A2F',
            //                                         display: 'none',
            //                                         height: '10px',
            //                                         width: '10px',
            //                                         borderRadius: '50%',
            //                                         fontSize: '10px',
            //                                         justifyContent: 'center',
            //                                         alignItems: 'center',
            //                                         color: 'red',
            //                                         position: 'absolute',
            //                                         top: -2,
            //                                         right: -2
            //                                     }}>

            //                                     <QuestionMarkRoundedIcon
            //                                         sx={{
            //                                             color: '#ffffff',
            //                                             fontSize: '8px'
            //                                         }}
            //                                     />
            //                                 </Box>
            //                             </Box>

            //                         </Button>
            //                     </Tooltip>


            //                     <Tooltip
            //                         title={`${row.original.phone}`}
            //                         placement="top"
            //                     >
            //                         <Button
            //                             id={`phonebutton-${row.id}`}
            //                             disableRipple
            //                             onClick={(e) => {
            //                                 if (row.original.phone) {
            //                                     setMenuData({
            //                                         rowId: row.id,
            //                                         email: '',
            //                                         first: row.original.Name,
            //                                         userId: row.original.userId,
            //                                         jobId: row.original.jobId,
            //                                         phone: row.original.phone,
            //                                         poolCount: row.original.poolCount,
            //                                         poolIds: row.original.poolIds,
            //                                         poolNames: row.original.poolNames,
            //                                         sequenceIds: row.original.sequenceIds,
            //                                         sequenceNames: row.original.sequenceNames,
            //                                         sequenceCount: row.original.sequenceCount
            //                                     })
            //                                     handleTableCall(e, `${row.id}`)
            //                                 }
            //                             }
            //                             }
            //                             aria-controls={
            //                                 openTableCall && selectedRowId === `${row.id}`
            //                                     ? `phone-${row.id}` : undefined
            //                             }
            //                             aria-haspopup="true"
            //                             aria-expanded={
            //                                 openTableCall && selectedRowId === `${row.id}` ? "true" : undefined
            //                             }
            //                             className="customButtonForHover"
            //                             sx={{
            //                                 borderColor: openTableCall && selectedRowId === `${row.id}`
            //                                     ? "var(--c-primary-color) !important"
            //                                     : "var(--c-secondary-color)",
            //                                 backgroundColor: "#ffffff",
            //                                 color: openTableCall && selectedRowId === `${row.id}`
            //                                     ? "#919191"
            //                                     : "#919191",
            //                                 "& .MuiButtonGroup-root .MuiButtonGroup-grouped:not(:last-of-type)":
            //                                 {
            //                                     borderRightColor: openTableCall && selectedRowId === `${row.id}`
            //                                         ? "#919191"
            //                                         : "",
            //                                 },
            //                                 "&:hover": {
            //                                     borderColor: "var(--c-secondary-color)",
            //                                     color: "#919191",
            //                                     backgroundColor: "#ffffff",
            //                                 },
            //                                 width: "33px",
            //                             }}
            //                         >

            //                             <CallOutlinedIcon
            //                                 sx={{
            //                                     fontSize: "16px",
            //                                 }}
            //                             />
            //                         </Button>
            //                     </Tooltip>

            //                     <Tooltip title={`${Number(row.original.poolCount) ? `In ${row.original.poolCount} Pool${Number(row.original.poolCount) > 1 ? "s" : ""}` : `Add to Pool`}`} placement="top">
            //                         <Button
            //                             id={`poollistbutton-${row.id}`}
            //                             disableRipple

            //                             aria-controls={
            //                                 openAddToListenBtn && selectedRowId === `${row.id}`
            //                                     ? `addlistmenu-${row.id}`
            //                                     : undefined
            //                             }
            //                             aria-haspopup="true"
            //                             aria-expanded={
            //                                 openAddToListenBtn && selectedRowId === `${row.id}`
            //                                     ? "true"
            //                                     : undefined
            //                             }
            //                             onClick={e => {
            //                                 if (row.original.userId) {
            //                                     setMenuData({
            //                                         rowId: row.id || row.original.userId,
            //                                         email: "",
            //                                         first: row.original.Name,
            //                                         userId: row.original.userId,
            //                                         jobId: row.original.jobId,
            //                                         phone: row.original.phone,
            //                                         poolCount: row.original.poolCount,
            //                                         poolIds: row.original.poolIds,
            //                                         poolNames: row.original.poolNames,
            //                                         sequenceIds: row.original.sequenceIds,
            //                                         sequenceNames: row.original.sequenceNames,
            //                                         sequenceCount: row.original.sequenceCount
            //                                     });

            //                                 }
            //                                 handleClickAddToListen(e, row.id);
            //                             }}

            //                             className="customButtonForHover"
            //                             sx={{
            //                                 borderColor:
            //                                     openTableCall && selectedRowId === `${row.id}`
            //                                         ? "var(--c-primary-color) !important"
            //                                         : "var(--c-secondary-color)",
            //                                 backgroundColor: "#ffffff",
            //                                 color:
            //                                     openTableCall && selectedRowId === `${row.id}`
            //                                         ? "#919191"
            //                                         : "#919191",
            //                                 "& .MuiButtonGroup-root .MuiButtonGroup-grouped:not(:last-of-type)":
            //                                 {
            //                                     borderRightColor:
            //                                         openTableCall && selectedRowId === `${row.id}`
            //                                             ? "#919191"
            //                                             : "",
            //                                 },
            //                                 "&:hover": {
            //                                     borderColor: "var(--c-secondary-color)",
            //                                     color: "#919191",
            //                                     backgroundColor: "#ffffff",
            //                                 },
            //                                 width: "33px",
            //                             }}
            //                         >
            //                             <PlaylistAddOutlinedIcon
            //                                 sx={{
            //                                     fontSize: "16px",
            //                                 }}
            //                             />
            //                             {
            //                                 Number(row.original.poolCount) ?
            //                                     <span>{row.original.poolCount}</span>
            //                                     :
            //                                     null
            //                             }
            //                             {/* <ArrowDropDownIcon
            //                             sx={{
            //                                 fontSize: "16px",
            //                             }}
            //                         /> */}
            //                         </Button>
            //                     </Tooltip>
            //                     <Tooltip
            //                         title={`${Number(row.original.sequenceCount) ? `In ${row.original.sequenceCount} Campaign${Number(row.original.sequenceCount) > 1 ? "s" : ""}` : `Add to Campaign`}`}
            //                         // title={`${Number(row.original.sequenceIds) ? `In ${row.original.sequenceIds} Sequence${Number(row.original.sequenceIds) > 1 ? "s" : ""}` : `Add to Sequence`}`}
            //                         placement="top"
            //                     >
            //                         <Button
            //                             id={`sequencebutton-${row.id}`}
            //                             disableRipple
            //                             onClick={e => {
            //                                 if (row.original.userId) {
            //                                     setMenuData({
            //                                         rowId: row.id,
            //                                         email: "",
            //                                         first: row.original.first,
            //                                         userId: row.original.userId,
            //                                         jobId: row.original.jobId,
            //                                         phone: row.original.phone,
            //                                         poolCount: row.original.poolCount,
            //                                         poolIds: row.original.poolIds,
            //                                         poolNames: row.original.poolNames,
            //                                         sequenceIds: row.original.sequenceIds,
            //                                         sequenceNames: row.original.sequenceNames,
            //                                         sequenceCount: row.original.sequenceCount
            //                                     });
            //                                     // handleTableSequence(e, row.original.candId)
            //                                     openSequnceToolTip(e, row.original.userId);
            //                                 }
            //                             }}
            //                             aria-controls={
            //                                 openTableSequence && selectedRowId === `${row.id}`
            //                                     ? `sequence-${row.id}`
            //                                     : undefined
            //                             }
            //                             aria-haspopup="true"
            //                             aria-expanded={
            //                                 openTableSequence && selectedRowId === `${row.id}`
            //                                     ? "true"
            //                                     : undefined
            //                             }
            //                             className="customButtonForHover"
            //                             sx={{
            //                                 borderColor:
            //                                     openTableSequence && selectedRowId === `${row.id}`
            //                                         ? "var(--c-primary-color) !important"
            //                                         : "var(--c-secondary-color)",
            //                                 backgroundColor: "#ffffff",
            //                                 color:
            //                                     openTableSequence && selectedRowId === `${row.id}`
            //                                         ? "#919191"
            //                                         : "#919191",
            //                                 "& .MuiButtonGroup-root .MuiButtonGroup-grouped:not(:last-of-type)":
            //                                 {
            //                                     borderRightColor:
            //                                         openTableSequence && selectedRowId === `${row.id}`
            //                                             ? "#919191"
            //                                             : "",
            //                                 },
            //                                 "&:hover": {
            //                                     borderColor: "var(--c-secondary-color)",
            //                                     color: "#919191",
            //                                     backgroundColor: "#ffffff",
            //                                 },
            //                                 width: "33px",
            //                             }}
            //                         >
            //                             <SendOutlinedIcon
            //                                 sx={{
            //                                     fontSize: "16px",
            //                                 }}
            //                             />
            //                             {
            //                                 Number(row.original.sequenceCount) ?
            //                                     <span>{row.original.sequenceCount}</span>
            //                                     :
            //                                     null
            //                             }
            //                             {/* <ArrowDropDownIcon
            //                             sx={{
            //                                 fontSize: "16px",
            //                             }}
            //                         /> */}
            //                         </Button>
            //                     </Tooltip>


            //                     {/* <Tooltip
            //                         title="Edit"
            //                         placement="top"
            //                     >
            //                         <Button
            //                             className="customButtonForHover"
            //                             // onClick={() => openCandidateEdit(row.original.ResumeId)}
            //                             sx={{
            //                                 borderColor: "var(--c-secondary-color)",
            //                                 backgroundColor: "#ffffff",
            //                                 color: "#919191",
            //                                 width: "33px",
            //                             }}
            //                         >
            //                             <EditIcon
            //                                 sx={{
            //                                     fontSize:
            //                                         "16px",
            //                                 }}
            //                             />
            //                         </Button>
            //                     </Tooltip> */}
            //                 </ButtonGroup>
            //             )}
            //         </Stack>

            //     ),
            //     size: 100
            // },
            {
                accessorKey: "Relocate",
                header: "Willing to relocate",
                accessorFn: (row) => row.Relocate
            },



        ],

        []
    );
    const [addtolistanchorEl, setAddToListAnchorEl] =
        useState<null | HTMLElement>(null);
    const openAddToListenBtn = Boolean(addtolistanchorEl);
    const [addtopoollistanchorEl, setAddToPoolListAnchorEl] =
        useState<null | HTMLElement>(null);
    // const openAddToPoolListenBtn = Boolean(addtopoollistanchorEl);

    const handleClickAddToListen = (
        event: React.MouseEvent<HTMLButtonElement>, callId: any
    ) => {
        setAddToListAnchorEl(event.currentTarget);
        // loadDistributionList();
        setSelectedRowId(callId);
    };
    // const handleClickAddToPoolListen = (
    //     event: React.MouseEvent<HTMLButtonElement>
    // ) => {
    //     setAddToPoolListAnchorEl(event.currentTarget);
    //     // loadDistributionList();
    //     // setSelectedRowId(callId);
    // };


    const handleProfileMenuClose = () => {
        setAddToListAnchorEl(null);
        setAddToPoolListAnchorEl(null);
        setTableOpenList(null)
    };


    const toggleFilers = () => {
        setFiltersExpand(!filtersExpand);
        saveAuditLog(4113);
    }


    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
        setIsSelectAllChecked(false);
        setRowPageIndex(0);
        setRowSelection({});
        setSelectAllElement(null);
        currentSelectCount.current = 0;

        switch (newValue) {
            case 'All':
                saveAuditLog(4114);
                break;
            case 'Monster':
                saveAuditLog(4115);
                break;
            case 'Career Builder':
                saveAuditLog(4116);
                break;
            case 'Local Database':
                saveAuditLog(4117);
                break;
            default:
                console.warn(`Unrecognized tab value: ${newValue}`);
                break;
        }
    };

    useEffect(() => {
        if (isFirstTimeLoad.current) {
            loadSortAndBuild(false);
        }
        selectAllMenuItemClicked("clear");
    }, [pagination.pageIndex, pagination.pageSize, sorting]);

    // useEffect(() => {
    //     loadSortAndBuild(true);
    // }, [mainJsonData]);

    useEffect(() => {
        if (isFirstTimeLoad.current) {
            if (pagination.pageIndex === 0) {
                loadSortAndBuild(false);
            } else {
                setPagination({
                    pageIndex: 0,
                    pageSize: 50
                })
            }
        }
    }, [tabValue]);

    // useEffect(() => {
    //     if (!sorting.length || !sortColumn) return;
    //     const id = sorting[0].id.toLowerCase(); 
    //     switch (id) {
    //         case "name":
    //             sortType === "des" ? saveAuditLog(4120) : saveAuditLog(4119);
    //             break;
    //         case "location":
    //             sortType === "des" ? saveAuditLog(4122) : saveAuditLog(4121);
    //             break;
    //         case "job title":
    //             sortType === "des" ? saveAuditLog(4124) : saveAuditLog(4123);
    //             break;
    //         case "company":
    //             sortType === "des" ? saveAuditLog(4126) : saveAuditLog(4125);
    //             break;
    //         case "posting date":
    //         default:
    //             sortType === "des" ? saveAuditLog(4128) : saveAuditLog(4127);
    //             break;
    //     }
    // }, [sorting]);

    // const handleSortingChange = (sorting: MRT_SortingState, sortColumn: string, sortType: string) => {
    //     if (!sorting.length || !sortColumn) return;

    //     const id = sorting[0].id.toLowerCase(); // Normalize the id for matching

    //     switch (id) {
    //         case "name":
    //             sortType === "des" ? saveAuditLog(4120) : saveAuditLog(4119);
    //             break;
    //         case "location":
    //             sortType === "des" ? saveAuditLog(4122) : saveAuditLog(4121);
    //             break;
    //         case "job title":
    //             sortType === "des" ? saveAuditLog(4124) : saveAuditLog(4123);
    //             break;
    //         case "company":
    //             sortType === "des" ? saveAuditLog(4126) : saveAuditLog(4125);
    //             break;
    //         case "posting date":
    //         default:
    //             sortType === "des" ? saveAuditLog(4128) : saveAuditLog(4127);
    //             break;
    //     }
    // };


    const loadSortAndBuild = (initialLoad: boolean) => {
        let sortBy = 'postingDate';
        let orderBy = 'desc';

        if (sorting.length > 0) {
            sortBy = sorting[0].id;
            switch (sorting[0].id) {
                case 'Name':
                case 'name':
                    sortBy = "candName";
                    break;
                case 'Location':
                case 'location':
                    sortBy = "location";
                    break;
                case 'Job Title':
                case 'job title':
                    sortBy = "jobTitle";
                    break;
                case 'Company':
                case 'company':
                    sortBy = "company";
                    break;
                case 'Posting Date':
                case 'posting date':
                default:
                    sortBy = "postingDate";
                    break;
            }
            sorting[0].desc === true ? orderBy = 'desc' : orderBy = 'asc';
        }

        const sortOrder = {
            sortBy: sortBy,
            orderBy: orderBy
        }
        loadResumesData(mainJsonDataRef.current, sortOrder, initialLoad);
    }


    const applyFilters = (filterData: any, formikValues: any) => {
        // console.log(filterData);
        setTabValue("All");
        setRowCount(() => tabList.find((item: any) => item.label === "All").count)
        mainJsonDataRef.current = filterData;
        filterFormikData.current = formikValues;
        isFirstTimeLoad.current = true;
        // setMainJsonData(filterData);

        if (pagination.pageIndex === 0) {
            loadSortAndBuild(true);
        } else {
            setPagination({
                pageIndex: 0,
                pageSize: 50
            })
        }
    };


    // const handleBlastEmail = () => {
    //     const selectedIds = Object.keys(rowSelection);
    //     console.log("Selected Row IDs:", selectedIds);
    //     setAddEmail(true)
    // };
    const handleBlastEmail = () => {
        const selectedIds = Object.keys(rowSelection).filter(key => rowSelection[key]);
        if (selectedIds.length === 1) {
            const selectedRowKey = selectedIds[0];
            // console.log(candidatesData[0].Name)
            const selectedRow = candidatesData.find((candidate: any) => candidate.ResumeId === selectedRowKey || candidate.userId === selectedRowKey);


            if (selectedRow) {
                setSelectedEmail(selectedRow.email);
                setSelectedName(selectedRow.Name);
                setIsBulkEmail(false);
                setAddEmail(true);
            }
        } else if (selectedIds.length > 1) {
            setSelectedEmail('');
            setSelectedName('');
            setIsBulkEmail(true);
            setAddEmail(true);
        }
    };


    const saveAuditLog = (id: number) => {
        ApiService.saveAuditLog(id);
    }

    useEffect(() => {
        saveAuditLog(4103);
    }, [])


    return (
        <div id="curatelySearch" className="findCandidate pt-3">
            <Stack
                direction="row"
                className="customCard px-4 py-2"
                justifyContent="space-between"
                alignItems="center"
                sx={{ minHeight: 'auto !important' }}
            >
                <Typography variant="h6" className="header">
                    Curately Search
                </Typography>

            </Stack>
            <Grid container spacing={0} className="customCard p-0 filterExpand-grid mb-0">
                <Grid sx={{ width: filtersExpand ? 0 : 310, overflow: 'hidden', opacity: filtersExpand ? 0 : 1 }}>
                    <div id='CuratelySearchFilter'>
                        <CuratelySearchFilter onApply={applyFilters}
                            updateJobDetails={updateJobDetails} passedData={filterFormikData.current} />
                    </div>
                </Grid>
                <Grid sx={{ width: filtersExpand ? 'calc(100%)' : 'calc(100% - 310px)' }}>
                    <div className={`MRTableCustom ${filtersExpand || !isCuratelySearchSettingEnabled ? 'pl-0' : ''}`}>
                        <Stack direction="row" alignItems="center">
                            {
                                isCuratelySearchSettingEnabled ?
                                    <Tooltip title={filtersExpand ? "Show Filters" : "Hide Filters"}>
                                        <IconButton disableRipple className="filtersHideButton" color="primary" aria-label={filtersExpand ? "Expand" : "Collapse"} onClick={toggleFilers}>
                                            {/* {<img src={CommonImages.GetFilterIcon()} className="filterIcon" />} */}
                                            <TuneIcon className="c-grey" />
                                            {/* {
                                    filtersExpand ?
                                        <KeyboardDoubleArrowRightIcon />
                                        :
                                        <KeyboardDoubleArrowLeftIcon />
                                } */}
                                        </IconButton>
                                    </Tooltip>
                                    :
                                    null
                            }
                            <Tabs
                                value={tabValue}
                                onChange={handleTabChange}
                                className='tableTabs'
                            >
                                {
                                    tabList.map((tab: any, i: number) => {
                                        return ((tab.toCheckName === "All") || (mainJsonDataRef.current.sites.includes(tab.toCheckName))) ? <Tab key={i} value={tab.label} label={
                                            <span className="tabWithCount">
                                                <span>{tab.label}</span>
                                                {
                                                    countLoading ?
                                                        <LoopIcon className="countLoader" />
                                                        :
                                                        <span className="count">
                                                            {
                                                                tab.isLoaded ?
                                                                    <span>({getCount(String(tab.count))})</span> :
                                                                    null
                                                            }
                                                        </span>
                                                }
                                            </span>
                                        } />
                                            :
                                            null
                                    })
                                }
                            </Tabs>

                        </Stack>


                        <Grid
                            container
                            className="actionItems"
                            sx={{
                                width: '97% !important'
                            }}
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Grid>
                                <Grid
                                    container
                                    direction='row'
                                    justifyContent='flex-start'
                                    alignItems='center'
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
                                                indeterminate={someAreChecked}
                                            />
                                        </div>
                                        <span
                                            className={`selectedCountText ${checkedCount === 0 ? "d-none" : "d-block"
                                                }`}
                                        >
                                            {/* {(rowPageIndex > 0) ? ((rowCount > 10000) ? 10000 : rowCount) : checkedCount}  */}
                                            {(isSelectAllChecked) ? ((selectedRowCount > 10000) ? 10000 : selectedRowCount) : checkedCount} Selected

                                        </span>

                                        <ArrowDropDownIcon
                                            className="arrowDownIcon"
                                        />
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
                                            Select this Page(
                                            <Box component="span">{candidatesData.length}</Box>)

                                        </MenuItem>
                                        {tabValue === "Local Database" && <MenuItem
                                            disableRipple
                                            onClick={() => selectAllMenuItemClicked("all")}
                                        >
                                            Select all people (<Box component="span">{(rowCount > 10000) ? 10000 : rowCount}</Box>)
                                        </MenuItem>
                                        }

                                        <MenuItem
                                            disableRipple
                                            onClick={() => selectAllMenuItemClicked("clear")}
                                        >
                                            Clear Selection
                                        </MenuItem>
                                    </Menu>
                                    {
                                        isBulkEmailSettingEnabled && (
                                            tabValue === "Local Database" ? (

                                                <Button
                                                    variant='outlined'
                                                    color="secondary"
                                                    className='mr-2'
                                                    disabled={Object.keys(rowSelection).length > 0 ? false : true}
                                                    onClick={handleBlastEmail}
                                                    startIcon={<MailOutlineOutlinedIcon />}
                                                >
                                                    Blast Email
                                                </Button>
                                            ) :
                                                null
                                        )}
                                    {/* <Button
                                id="add-list-btn"
                                aria-controls={openAddToListenBtn ? "addlistmenu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={openAddToListenBtn ? 'true' : undefined}
                                onClick={handleClickAddToListen}
                                startIcon={<PlaylistAddOutlinedIcon />}
                                disableRipple
                                className='btnSecondary mr-2'
                                disabled={Object.keys(rowSelection).length > 0 ? false : true}
                                endIcon={<ArrowDropDownIcon />}
                                >
                                    Save to searchbot
                                </Button> */}
                                    {tabValue === "Local Database" ?
                                        <Button
                                            variant='outlined'
                                            color="secondary"
                                            className='mr-2'

                                            onClick={() => setOpenSequenceModal(true)}
                                            disabled={Object.keys(rowSelection).length > 0 ? false : true}
                                            startIcon={<SendOutlinedIcon />}
                                        >
                                            Campaign
                                        </Button>
                                        : null}
                                    {tabValue === "Local Database" ?
                                        <Button
                                            variant='outlined'
                                            color="secondary"
                                            className='mr-2'
                                            onClick={handleExportData}

                                            disabled={Object.keys(rowSelection).length > 0 ? false : true}
                                            startIcon={<FileDownloadOutlinedIcon />}
                                        >
                                            Export
                                        </Button>
                                        : null}
                                    <Stack direction="row" spacing={1} alignItems="left" sx={{ marginLeft: 'auto' }}></Stack>
                                </Grid>
                            </Grid>

                            <span className='customSorting'>
                                <Button
                                    color="primary"
                                    variant='outlined'
                                    // className='mr-2'
                                    startIcon={
                                        <>
                                            <SouthRoundedIcon className={sortType === "asc" ? 'flip' : ''} />
                                            <MenuIcon />
                                        </>
                                    }
                                    endIcon={<ArrowDropDownIcon />}
                                    onClick={handleSortClick}
                                    sx={{ width: 'Auto', ml: 'auto' }}
                                    size='small'
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
                                                <MenuItem value={'Location'}>Location</MenuItem>
                                                <MenuItem value={'Job Title'}>Job Title</MenuItem>
                                                <MenuItem value={'Company'}>Company</MenuItem>
                                                <MenuItem value={'Posting Date'}>Posting Date</MenuItem>
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
                                            sx={{
                                                width: '100% !important', height: '32px !important', textTransform: "capitalize", backgroundColor: "var(--c-primary-color)", fontWeight: 700, fontSize: "14px", fontFamily: "Segoe UI",
                                                color: "#ffffff", whiteSpace: "nowrap", boxShadow: "0", "&:hover": {
                                                    backgroundColor: "#0852C2",
                                                    color: "#ffffff", boxShadow: "0",
                                                },
                                            }}
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
                            </span>


                        </Grid>
                        <MaterialReactTable
                            columns={columns}
                            enableRowSelection
                            data={candidatesData}
                            onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
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
                            state={{
                                rowSelection,
                                pagination,
                                sorting,
                                isLoading: isTableLoading
                            }} //pass our managed row selection state to the table to use
                            enablePinning
                            initialState={{
                                columnPinning: { left: ['mrt-row-select'] }, density: 'compact', showGlobalFilter: false,
                                expanded: true
                            }}
                            enablePagination={false}
                            renderBottomToolbarCustomActions={() => (
                                <CustomPagination
                                    page={pagination.pageIndex}
                                    rowsPerPage={50}
                                    rowCount={rowCount}
                                    onChangePage={(page: any) => {
                                        setPagination({
                                            ...pagination,
                                            pageIndex: page,
                                            pageSize: 50,
                                        });
                                        setRowSelection({});
                                        setIsSelectAllChecked(false);
                                        currentSelectCount.current = 0;
                                    }}
                                />
                            )}
                            enableDensityToggle={false}
                            enableFullScreenToggle={false}
                            manualPagination
                            manualSorting
                            onSortingChange={setSorting}
                            //enableGlobalFilterModes
                            columnResizeMode="onChange"
                            onPaginationChange={setPagination}
                            getRowId={(row) => row.ResumeId || row.userId}
                            icons={{
                                ArrowDownwardIcon: (props: any) => <SwitchLeftIcon  {...props} />
                            }}
                            rowCount={rowCount}
                            enableStickyHeader
                            enableRowActions={userLocalData.adminSettings(20053) ? true : false}
                            positionActionsColumn="last"
                            renderRowActions={({ row }) => (
                                <Stack
                                    key={row.original.ResumeId}
                                >
                                    {!row.original.email ? (

                                        <Button
                                            disableRipple
                                            onClick={() => {
                                                if (rowSelection[row.original.ResumeId]) {

                                                    if (row.original.userId) {
                                                        openCandidateView(row.original.userId, row.original.Name);
                                                    } else {
                                                        let postingDate = "";
                                                        if (row.original.PostingDate) {
                                                            let tempDate = new Date(row.original.PostingDate);
                                                            if (row.original.Site === "Careerbuilder" || row.original.Site === "Monster") {
                                                                postingDate = DateTime.fromISO(tempDate.toISOString()).toFormat('MM/dd/yyyy');
                                                            }
                                                            if (row.original.Site === "Mastercand") {
                                                                postingDate = row.original.PostingDate;
                                                            }
                                                        }
                                                        getUserIdByResumeId(row.original.ResumeId, row.original.Site, postingDate, row.original.Name);
                                                    }
                                                }
                                            }}
                                            sx={{
                                                backgroundColor: rowSelection[row.original.ResumeId]
                                                    ? "var(--c-primary-color)"
                                                    : "#ccc",
                                                "&:hover": {
                                                    backgroundColor: rowSelection[row.original.ResumeId]
                                                        ? "var(--c-primary-color)"
                                                        : "#ccc",
                                                },
                                                height: "25px",
                                                border: "1px solid",
                                                borderColor: rowSelection[row.original.ResumeId] ? "var(--c-primary-color)" : "#ccc",
                                                cursor: rowSelection[row.original.ResumeId] ? 'pointer' : 'not-allowed',
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontFamily: "Segoe UI",
                                                    fontSize: "12px",
                                                    fontWeight: "400",
                                                    color: "#ffffff",
                                                    textTransform: "capitalize",
                                                    cursor: rowSelection[row.original.ResumeId] ? 'pointer' : 'not-allowed',
                                                }}
                                            >
                                                Access Email
                                            </Typography>
                                        </Button>


                                    ) : (

                                        <ButtonGroup
                                            variant="outlined"
                                            id={
                                                row.original.ResumeId
                                            }

                                            sx={{
                                                height: "31px",
                                                "& .MuiButtonGroup-grouped": {
                                                    marginRight: "1px",
                                                },
                                            }}
                                        >
                                            <Tooltip
                                                title={row.original.email}
                                                placement="top"
                                            >
                                                <Button
                                                    id={`mailbutton-${row.id}`}

                                                    onClick={(e) => {
                                                        if (row.original.email) {
                                                            setMenuData({
                                                                rowId: row.id,
                                                                email: row.original.email,
                                                                first: row.original.Name,
                                                                userId: row.original.userId,
                                                                jobId: row.original.jobId,
                                                                phone: '',
                                                                poolCount: row.original.poolCount,
                                                                poolIds: row.original.poolIds,
                                                                poolNames: row.original.poolNames,
                                                                sequenceIds: row.original.sequenceIds,
                                                                sequenceNames: row.original.sequenceNames,
                                                                sequenceCount: row.original.sequenceCount
                                                            });
                                                            handleTableMenuSendMailOpen(row.original.email);
                                                        }
                                                    }}
                                                    aria-controls={
                                                        openTableMail && selectedRowId === `${row.id}` ? `mail-${row.id}` : undefined
                                                    }
                                                    aria-haspopup="true"
                                                    aria-expanded={
                                                        openTableMail && selectedRowId === `${row.id}` ? "true" : undefined
                                                    }
                                                    sx={{
                                                        pointerEvents: row.original.email ? 'auto' : 'none',
                                                        borderColor: openTableMail && selectedRowId === `${row.id}`
                                                            ? "var(--c-primary-color) !important"
                                                            : "var(--c-secondary-color)",
                                                        backgroundColor: "#ffffff",
                                                        color: openTableMail && selectedRowId === `${row.id}`
                                                            ? "var(--c-primary-color) !important"
                                                            : "#919191",
                                                        borderRightColor: openTableMail && selectedRowId === `${row.id}`
                                                            ? "var(--c-primary-color) !important"
                                                            : "var(--c-secondary-color)",
                                                        mr: "0px",
                                                        "&:hover": {
                                                            borderColor: "var(--c-secondary-color)",
                                                            color: "#919191",
                                                            backgroundColor: "#ffffff",
                                                        },
                                                        width: "33px",
                                                    }}
                                                    className={`customButtonForHover ${row.original.email ? "" : "disabled"} `}


                                                >
                                                    <Box sx={{ position: 'relative', display: 'inline-block', alignItems: 'center', mt: 1 }}>
                                                        <MailOutlineOutlinedIcon
                                                            sx={{
                                                                fontSize: "16px",
                                                            }}
                                                        />

                                                        <Box
                                                            sx={{
                                                                backgroundColor: '#1DB268',
                                                                height: '10px',
                                                                width: '10px',
                                                                borderRadius: '50%',
                                                                fontSize: '10px',
                                                                display: row.original.email ? 'flex' : 'none',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                color: 'red',
                                                                position: 'absolute',
                                                                top: -2,
                                                                right: -2
                                                            }}>
                                                            <DoneRoundedIcon
                                                                sx={{
                                                                    fontSize: '8px',
                                                                    color: '#ffffff',
                                                                }} />
                                                        </Box>


                                                        <Box
                                                            sx={{
                                                                backgroundColor: '#919191',
                                                                height: '10px',
                                                                width: '10px',
                                                                borderRadius: '50%',
                                                                fontSize: '10px',
                                                                display: row.original.email ? 'none' : 'flex',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                color: 'red',
                                                                position: 'absolute',
                                                                top: -2,
                                                                right: -2
                                                            }}>
                                                            <CloseRoundedIcon
                                                                sx={{
                                                                    fontSize: '8px',
                                                                    color: '#ffffff',
                                                                }}
                                                            />
                                                        </Box>

                                                        <Box
                                                            sx={{
                                                                backgroundColor: '#EB7A2F',
                                                                display: 'none',
                                                                height: '10px',
                                                                width: '10px',
                                                                borderRadius: '50%',
                                                                fontSize: '10px',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                color: 'red',
                                                                position: 'absolute',
                                                                top: -2,
                                                                right: -2
                                                            }}>

                                                            <QuestionMarkRoundedIcon
                                                                sx={{
                                                                    color: '#ffffff',
                                                                    fontSize: '8px'
                                                                }}
                                                            />
                                                        </Box>
                                                    </Box>

                                                </Button>
                                            </Tooltip>


                                            <Tooltip
                                                title={`${row.original.phone}`}
                                                placement="top"
                                            >
                                                <Button
                                                    id={`phonebutton-${row.id}`}
                                                    disableRipple
                                                    onClick={(e) => {
                                                        if (row.original.phone) {
                                                            setMenuData({
                                                                rowId: row.id,
                                                                email: '',
                                                                first: row.original.Name,
                                                                userId: row.original.userId,
                                                                jobId: row.original.jobId,
                                                                phone: row.original.phone,
                                                                poolCount: row.original.poolCount,
                                                                poolIds: row.original.poolIds,
                                                                poolNames: row.original.poolNames,
                                                                sequenceIds: row.original.sequenceIds,
                                                                sequenceNames: row.original.sequenceNames,
                                                                sequenceCount: row.original.sequenceCount
                                                            })
                                                            setPhoneOnClicked(row.original.phone);
                                                            setDialogPhoneStatus(true);
                                                        }
                                                    }
                                                    }
                                                    aria-controls={
                                                        openTableCall && selectedRowId === `${row.id}`
                                                            ? `phone-${row.id}` : undefined
                                                    }
                                                    aria-haspopup="true"
                                                    aria-expanded={
                                                        openTableCall && selectedRowId === `${row.id}` ? "true" : undefined
                                                    }
                                                    className={`customButtonForHover ${row.original.phone ? "" : "disabled"} `}
                                                    sx={{
                                                        borderColor: openTableCall && selectedRowId === `${row.id}`
                                                            ? "var(--c-primary-color) !important"
                                                            : "var(--c-secondary-color)",
                                                        backgroundColor: "#ffffff",
                                                        color: openTableCall && selectedRowId === `${row.id}`
                                                            ? "#919191"
                                                            : "#919191",
                                                        "& .MuiButtonGroup-root .MuiButtonGroup-grouped:not(:last-of-type)":
                                                        {
                                                            borderRightColor: openTableCall && selectedRowId === `${row.id}`
                                                                ? "#919191"
                                                                : "",
                                                        },
                                                        "&:hover": {
                                                            borderColor: "var(--c-secondary-color)",
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
                                                    onClick={e => {
                                                        if (row.original.userId) {
                                                            setMenuData({
                                                                rowId: row.id || row.original.userId,
                                                                email: "",
                                                                first: row.original.Name,
                                                                userId: row.original.userId,
                                                                jobId: row.original.jobId,
                                                                phone: row.original.phone,
                                                                poolCount: row.original.poolCount,
                                                                poolIds: row.original.poolIds,
                                                                poolNames: row.original.poolNames,
                                                                sequenceIds: row.original.sequenceIds,
                                                                sequenceNames: row.original.sequenceNames,
                                                                sequenceCount: row.original.sequenceCount
                                                            });

                                                        }
                                                        handleClickAddToListen(e, row.id);
                                                    }}

                                                    className="customButtonForHover"
                                                    sx={{
                                                        borderColor:
                                                            openTableCall && selectedRowId === `${row.id}`
                                                                ? "var(--c-primary-color) !important"
                                                                : "var(--c-secondary-color)",
                                                        backgroundColor: "#ffffff",
                                                        color:
                                                            openTableCall && selectedRowId === `${row.id}`
                                                                ? "#919191"
                                                                : "#919191",
                                                        "& .MuiButtonGroup-root .MuiButtonGroup-grouped:not(:last-of-type)":
                                                        {
                                                            borderRightColor:
                                                                openTableCall && selectedRowId === `${row.id}`
                                                                    ? "#919191"
                                                                    : "",
                                                        },
                                                        "&:hover": {
                                                            borderColor: "var(--c-secondary-color)",
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
                                                        if (row.original.userId) {
                                                            setMenuData({
                                                                rowId: row.id,
                                                                email: "",
                                                                first: row.original.first,
                                                                userId: row.original.userId,
                                                                jobId: row.original.jobId,
                                                                phone: row.original.phone,
                                                                poolCount: row.original.poolCount,
                                                                poolIds: row.original.poolIds,
                                                                poolNames: row.original.poolNames,
                                                                sequenceIds: row.original.sequenceIds,
                                                                sequenceNames: row.original.sequenceNames,
                                                                sequenceCount: row.original.sequenceCount
                                                            });
                                                            // handleTableSequence(e, row.original.candId)
                                                            openSequnceToolTip(e, row.original.userId);
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
                                                                ? "var(--c-primary-color) !important"
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
                                                                    ? "#919191"
                                                                    : "",
                                                        },
                                                        "&:hover": {
                                                            borderColor: "var(--c-secondary-color)",
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


                                            {/* <Tooltip
                                    title="Edit"
                                    placement="top"
                                >
                                    <Button
                                        className="customButtonForHover"
                                        // onClick={() => openCandidateEdit(row.original.ResumeId)}
                                        sx={{
                                            borderColor: "var(--c-secondary-color)",
                                            backgroundColor: "#ffffff",
                                            color: "#919191",
                                            width: "33px",
                                        }}
                                    >
                                        <EditIcon
                                            sx={{
                                                fontSize:
                                                    "16px",
                                            }}
                                        />
                                    </Button>
                                </Tooltip> */}
                                        </ButtonGroup>
                                    )}
                                </Stack>
                            )}
                        />

                    </div>
                </Grid >

            </Grid >

            <Menu
                id={`mail-${menuData.rowId}`}
                anchorEl={TableMailOpen}
                open={openTableMail && (selectedRowId === `${menuData.rowId}`)}
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
                    "& .MuiPaper-root.MuiMenu-paper.MuiPopover-paper":
                    {
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
                                    onClick={() => { handleTableMenuSendMailOpen(menuData.email); }}
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
                dialogStatus && <EmailDialogBox
                    dialogOpen={dialogStatus}
                    onClose={() => setDialogStatus(false)}
                    name={menuData.first.toLowerCase()}
                    emailId={emailOnClicked}
                    candidateId={menuData.userId}
                    jobId={menuData.jobId}
                />

            }

            <Menu
                id={`phone-${menuData.rowId}`}
                anchorEl={TableCallOpen}
                open={openTableCall && selectedRowId === `${menuData.rowId}`}
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
                    "& .MuiPaper-root.MuiMenu-paper.MuiPopover-paper":
                    {
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
                            {menuData.phone ? `${menuData.phone}` : ''}
                        </Typography>
                        <ContentCopyRoundedIcon
                            sx={{
                                color: "#737373",
                                fontSize: "20px",
                                pl: 0.5,
                                cursor: "pointer",
                            }}
                            onClick={() => { Copy.text(`${menuData.phone}`, 'Phone Number'); setTableOpenCall(null) }}
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
                                    setTableOpenCall(null);
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

            {
                dialogPhoneStatus ?
                    <PhoneDialog
                        dialogOpen={dialogPhoneStatus}
                        onClose={() => setDialogPhoneStatus(false)}
                        //name={menuData.first.toLowerCase()}
                        name={""}
                        toPhone={phoneOnClicked}
                        candidateId={menuData.userId}
                        jobId={menuData.jobId}
                    />
                    :
                    null
            }

            {
                (openSequenceModal) ?
                    <Sequence
                        open={openSequenceModal}
                        closePopup={() => setOpenSequenceModal(false)}
                        selectedCandidateIds={selectSequenceList}
                    />
                    :
                    null
            }

            {
                addEmail && <EmailDialogBox
                    dialogOpen={addEmail}
                    onClose={() => setAddEmail(false)}
                    name={selectedName}
                    emailId={selectedEmail}
                    isBulkEmail={isBulkEmail}
                    jobId={selectedJob.id}
                />
            }

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
                    (menuData.poolIds.length && (menuData.poolIds.length == menuData.poolNames.length)) ?
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
                                        secondaryAction={
                                            <IconButton aria-label="Remove" onClick={() => {
                                                handleProfileMenuClose();
                                                confirmDialog(`Are you sure you want to remove - ${menuData.poolNames[index]}?`, () => {
                                                    deleteTalentPoolId(value, menuData.userId);
                                                }, "warning"
                                                );
                                            }}>
                                                <ClearOutlinedIcon sx={{ color: '#737373', height: '13px', width: '13px' }} />
                                            </IconButton>
                                        }
                                        className="pt-1 pb-1 pl-1"
                                    >
                                        <ListItemText
                                            // onClick={() => openTalentPoolView(value, menuData.poolNames[index])} 
                                            className="fw-6 c-skyblue"
                                            primary={`${(menuData?.poolNames?.[index]) || ''}`}
                                        />
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
                        addToTalentPool(id, name, menuData.userId);
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
                                        secondaryAction={
                                            <IconButton aria-label="Remove" onClick={() => {
                                                handleProfileMenuClose();
                                                confirmDialog(`Are you sure you want to remove - ${menuData.sequenceNames[index]}?`, () => {
                                                    const candId = menuData.userId;
                                                    const name = menuData.sequenceNames[index];
                                                    deleteSequenceId(value, candId, name);
                                                }, "warning"
                                                );
                                            }}>
                                                <ClearOutlinedIcon sx={{ color: '#737373', height: '13px', width: '13px' }} />
                                            </IconButton>
                                        }
                                        className="pt-1 pb-1 pl-1"
                                    >
                                        <ListItemText
                                            onClick={() => handleSequenceClick(value, menuData.sequenceNames[index])}
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

                <MUIAutoComplete
                    id='sequenceId'
                    handleChange={(id: any, name: string) => {
                        setSelectedSequence({ id, name });
                        addToSequenceList(id, name, menuData.userId);
                    }}
                    valuePassed={
                        (selectedSequence.id) ? { label: selectedSequence.name, id: selectedSequence.id } :
                            {}
                    }
                    isMultiple={false}
                    textToShow="Select Campaign"
                    width="250px"
                    type='sequence'
                    placeholder="Select Campaign"
                />

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
                    "& .MuiPaper-root.MuiMenu-paper.MuiPopover-paper":
                    {
                        minWidth: "250px",
                        maxWidth: "350px",
                    },
                }}
            >
                <Stack sx={{ mb: 1, p: 1 }}>


                    <Button
                        variant="contained"
                        disableRipple
                        onClick={() => {
                            setOpenSequenceModal(true)
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
        </div >
    );
}
export default CuratelySearch;