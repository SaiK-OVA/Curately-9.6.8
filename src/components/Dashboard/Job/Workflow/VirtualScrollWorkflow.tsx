import { UIEvent } from 'react';
import { React, useCallback, useEffect, useMemo, useRef, useState } from '../../../../shared/modules/React';
import { type MRT_ColumnFiltersState, type MRT_SortingState, type MRT_RowVirtualizer, } from 'material-react-table';
import { MaterialReactTable, type MRT_ColumnDef } from '../../../../shared/modules/MaterialReactTable';
import { Typography } from '../../../../shared/modules/MaterialImports/Typography';
import {
    QueryClient,
    QueryClientProvider,
    useInfiniteQuery,
} from '@tanstack/react-query';
// import { DateTime } from 'luxon';
import { useParams } from 'react-router-dom';
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
import { Checkbox } from "../../../../shared/modules/MaterialImports/FormElements";
import { Grid, Button } from '../../../../shared/modules/commonImports';
import { Stack } from '../../../../shared/modules/MaterialImports/Stack';
// import CloneToOtherJob from './PopUps/CloneToOtherJob/CloneToOtherJob';
// import Sequence from './PopUps/Sequence/Sequence';
import { Tooltip } from '../../../../shared/modules/MaterialImports/ToolTip';
// import Avatar from '@mui/material/Avatar';


import { ListItem, ListItemText, ListItemIcon } from "../../../../shared/modules/MaterialImports/List";
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

import { ButtonGroup } from '../../../../shared/modules/MaterialImports/ButtonGroup';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
import ShareIcon from '@mui/icons-material/Share';
import CloseIcon from '@mui/icons-material/Close';
import SkipNextIcon from '@mui/icons-material/SkipNext';
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import ApiService from "../../../../shared/api/api";
import { StageInterface } from './Workflow';
import { showToaster } from '../../../shared/SnackBar/SnackBar';
import { confirmDialog } from '../../../shared/ConfirmDialog/ConfirmDialog';
import { userLocalData } from '../../../../shared/services/userData';
import { trackPromise } from '../../../../shared/modules/PromiseTrackter';
import WorkflowColumnsData from '../../../../shared/utils/WorkflowColumnsData';
import EmailDialogBox from '../../../shared/EmailDialogBox/EmailDialogBox';

// import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import FilterStage from './FilterStage/FilterStage';
// import { globalData } from '../../../../shared/services/globalData';
import VideoPreview from './VideoPreview/VideoPreview';
import { MUIAutoComplete } from '../../../shared/MUIAutoComplete/MUIAutoComplete';
import MoreMenuButton from './MoreMenuButton';
import ViewCandidateModal from '../../Candidate/ViewCandidate/ViewCandidateModal';
import WorkflowPreviewData from '../../../../shared/utils/WorkflowPreviewData';
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import { ArrowDropDownOutlined } from '@mui/icons-material';
import { Menu, MenuItem } from '@mui/material';

// type UserApiResponse = {
//     data: Array<User>;
//     // meta: {
//     //     totalRowCount: number;
//     // };
// };

// type User = {
//     candId: string;
//     candName: string;
//     email: string;
//     important: string;
//     modifyDate: string;
//     phone1: string;
//     phone2: string;
//     recrId: string;
//     recrName: string;
//     searchId: string;
//     status: string;
//     statusId: string;
// };

const fetchSize = 50;

const VirtualData = (
    { masterStagesList, selectedStage, stageIds, totalCount, workflowData, refetchData }
        :
        {
            masterStagesList: StageInterface[], selectedStage: any, stageIds: {
                rejected: string;
                approved: string;
                onHold: string;
            }, totalCount: any,
            workflowData: any
            refetchData: () => void
        }
) => {
    const { jobId } = useParams();
    const [selectedCandidateIds, setSelectedCandidateIds] = useState<string[]>([]);
    const [addEmail, setAddEmail] = useState(false);
    const [selectedEmail, setSelectedEmail] = useState('');
    const [selectedName, setSelectedName] = useState('');
    const [isBulkEmail, setIsBulkEmail] = useState(false);

    const [viewCandidate, setViewCandidate] = useState(false);
    const viewCandidateId = useRef("");

    const [workflowCandidate, setWorkflowCandidate] = useState({
        id: "",
        name: ""
    });
    const selectedWorkflowCandidateId = useRef("");
    //const isEmailSMSSettingEnabled = userLocalData.checkIntegration(40005);

    const isBulkEmailSettingEnabled = userLocalData.checkIntegration(40005) && userLocalData.checkIntegration(400020);
    const [nextStagesList, setNextStagesList] = useState<any[]>([]);
    const moveToRef = useRef<any>(null);
    const [openMoveToMenu, setOpenMoveToMenu] = useState(false);

    // const getShortName = (name: string) => {
    //     let tempNameArray = name.split(' ');
    //     if (tempNameArray.length > 1) {
    //         return {
    //             children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    //         };
    //     } else if (tempNameArray.length === 1) {
    //         return {
    //             children: `${name.split(' ')[0][0]}${name.split(' ')[0][1]}`,
    //         };

    //     } else {
    //         return {
    //             children: ``,
    //         };
    //     }
    // }

    // const openCandidateView = (id: string, sourceId: string) => {
    //     let tempSourceId = (sourceId) ? "/" + sourceId : "";
    //     window.open(globalData.getWindowLocation() + "candidate/view/" + id + "/" + jobId + tempSourceId);
    // }


    const openCandidateModalView = (id: string) => {
        viewCandidateId.current = id;
        setViewCandidate(true);
        // window.open(`https://www4.accuick.com/Accuick3/Candidate/Candidate.jsp?Cid=${id}&jobid=${jobId}`);
        // window.open(globalData.getWindowLocation() + "candidate/view/" + id.trim() + "/" + jobId);
    }

    const copyValue = (value: string, type: string) => {
        navigator.clipboard.writeText(value);
        showToaster(type + ' Copied', 'success');
    };
    const handleBlastEmail = () => {
        const selectedIds = Object.keys(rowSelection).filter(key => rowSelection[key]);
        if (selectedIds.length === 1) {
            const selectedRowKey = selectedIds[0];
            const selectedRow = flatData.find((candidate: any) => candidate.candid
                === selectedRowKey);
            if (selectedRow) {
                setSelectedEmail(selectedRow.email);
                setSelectedName(selectedRow.candname
                );
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


    const staticColumns: MRT_ColumnDef<any>[] = useMemo(
        () => [], []
    );

    const dynamicColumns: MRT_ColumnDef<any>[] = useMemo(
        () => [], []
    );
    const tableContainerRef = useRef<HTMLDivElement>(null); //we can get access to the underlying TableContainer element and react to its scroll events
    const rowVirtualizerInstanceRef =
        useRef<MRT_RowVirtualizer<HTMLDivElement, HTMLTableRowElement>>(null); //we can get access to the underlying Virtualizer instance and call its scrollToIndex method

    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
        [],
    );

    const [globalFilter, setGlobalFilter] = useState<string>();
    const [sorting, setSorting] = useState<MRT_SortingState>([]);
    const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);
    const [rowSelection, setRowSelection] = useState({});

    // const [openAddCloneModal, setOpenAddCloneModal] = useState(false);
    // const [openSequenceModal, setOpenSequenceModal] = useState(false);




    const { data, fetchNextPage, isError, isFetching, isLoading, refetch } =
        useInfiniteQuery<any>({
            queryKey: ['table-data', columnFilters, globalFilter, sorting],
            queryFn: async ({ pageParam = 0 }) => {
                // const url = new URL(
                //     'workflow_applicants_view.jsp',
                //     process.env.NODE_ENV === 'production'
                //         ? "https://resume.accuick.com/Pipl/" : "http://34.208.108.171:41088/Pipl/",
                // );
                // url.searchParams.set('jobId', (jobId) ? jobId : "");
                // url.searchParams.set('status', statusId);

                // url.searchParams.set('start', `${pageParam * fetchSize}`);

                // const response = await fetch(url.href);
                // const json = (await response.json()) as UserApiResponse;
                // console.log(json);
                // return json;
                const response = (selectedWorkflowCandidateId.current) ?
                    await ApiService.getByParams(193, 'Curately/Workflow/workflow_applicants_view_single.jsp',
                        {
                            workflow_job_cand_id: selectedWorkflowCandidateId.current,
                            clientId: userLocalData.getvalue('clientId')
                        }
                    )
                    :
                    await ApiService.getByParams(193, 'Curately/Workflow/workflow_applicants_view.jsp',
                        {
                            jobId: jobId,
                            stageId: selectedStage.stageId,
                            pageSize: fetchSize,
                            pageIndex: pageParam * 50,
                            candIds: candIds.current.join(),
                            clientId: userLocalData.getvalue('clientId')
                        }
                    );

                // selectedWorkflowCandidateId.current = "";
                //         .then((response) => {
                // console.log(response.data);

                let processedData = await WorkflowPreviewData.parseApplicantsData(response.data, masterStagesList);

                let candidatesData = processedData.applicants;
                if (!!candidatesData?.length) {
                    setNextStagesList(candidatesData[0].nextStageList);
                }

                // console.log(candidatesData);
                if (pageParam === 0) {
                    dynamicColumns.length = 0;

                    await generateColumns();
                }

                return {
                    data: candidatesData
                };


            },
            getNextPageParam: (_lastGroup, groups) => groups.length,
            keepPreviousData: true,
            refetchOnWindowFocus: false,

        });

    const generateColumns = async () => {
        if (!dynamicColumns.length) {
            dynamicColumns.push({
                accessorKey: "name", //simple recommended way to define a column
                header: "Name",

                // minSize: 250,
                size: 250,
                // maxSize: 300,

                Cell: ({ row }) => (
                    row.original.candname ?
                        <Grid>
                            <span className="hightLightTd fs-13" onClick={() => openCandidateModalView(row.original.candid)}>{row.original.candname.toLowerCase()}</span>
                            {
                                row.original.email && row.original.email.trim() ?
                                    <ListItem
                                        className='py-0 pl-0'
                                        secondaryAction={
                                            <ContentCopyOutlinedIcon
                                                className="cursor-pointer fs-16"
                                                onClick={(event: any) => {
                                                    event.stopPropagation();
                                                    copyValue(row.original.email, 'Email');
                                                }}
                                            />
                                        }>
                                        <ListItemIcon sx={{ minWidth: '20px !important' }}>
                                            <EmailOutlinedIcon className='fs-16' />
                                        </ListItemIcon>
                                        <ListItemText className='m-0' sx={{
                                            color: '#007bff'
                                        }}
                                            primary={<span className='fs-13'>{row.original.email} </span>}
                                        />
                                    </ListItem>
                                    :
                                    null
                            }
                            {
                                row.original.phoneno && row.original.phoneno.trim() ?
                                    <ListItem
                                        className='py-0 pl-0'
                                        secondaryAction={
                                            <ContentCopyOutlinedIcon
                                                className="cursor-pointer fs-16"
                                                onClick={(event: any) => {
                                                    event.stopPropagation();
                                                    copyValue(row.original.phoneno, 'Phone Number');
                                                }}
                                            />
                                        }>
                                        <ListItemIcon sx={{ minWidth: '20px !important' }}>
                                            <SmsOutlinedIcon className='fs-16 mt-1' />
                                        </ListItemIcon>
                                        <ListItemText className='m-0' sx={{
                                            color: '#007bff'
                                        }}
                                            primary={<span className='fs-13'>{row.original.phoneno} </span>}
                                        />
                                    </ListItem>
                                    :
                                    null
                            }
                            <ButtonGroup className='mt-1' variant="outlined" aria-label="outlined button group" size='small'>
                                {
                                    row.original.candtoken ?
                                        <Tooltip title='Copy Candidate Link'>
                                            <Button size='small'
                                                onClick={(event: any) => {
                                                    event.stopPropagation();
                                                    copyValue("https://app.curately.ai/workflow/#/stages/" + row.original.candtoken, 'Candidate Link');
                                                }}>
                                                <ShareIcon className='fs-16' />
                                            </Button>
                                        </Tooltip>
                                        :
                                        null
                                }
                                {
                                    stageIds.rejected && row.original.stageid && (stageIds.rejected !== row.original.stageid) ?
                                        <Tooltip title='Reject'>
                                            <Button size='small'
                                                onClick={() => {
                                                    confirmDialog(`Are you sure you want to move the candidate to Rejected Stage?`, () => {
                                                        selectedCandidateData.current = row.original;
                                                        moveToStage(stageIds.rejected);
                                                    }, "warning"
                                                    );
                                                    handleProfileMenuClose();
                                                }}>
                                                <CloseIcon className='fs-16' />
                                            </Button>
                                        </Tooltip>
                                        :
                                        null
                                }
                                {
                                    row.original.nextStageId && stageIds.approved && (stageIds.approved !== row.original.stageid) ?
                                        <Tooltip title='Move to Next Stage'>
                                            <Button size='small'
                                                onClick={() => {
                                                    confirmDialog(`Are you sure you want to move the candidate to Next Stage?`, () => {
                                                        // console.log(selectedCandidateData);
                                                        selectedCandidateData.current = row.original;
                                                        moveToStage(row.original.nextStageId);
                                                    }, "warning"
                                                    );
                                                    handleProfileMenuClose();
                                                }}>
                                                <SkipNextIcon className='fs-16' />
                                            </Button>
                                        </Tooltip>
                                        :
                                        null
                                }
                                {
                                    row.original.nextStageList && row.original.nextStageList.length ?
                                        <MoreMenuButton moreMenuData={row.original} moveToStage={
                                            (nextStageId: string) => {
                                                selectedCandidateData.current = row.original;
                                                moveToStage(nextStageId);
                                            }
                                        } />
                                        :
                                        null
                                }

                            </ButtonGroup>
                        </Grid>
                        :
                        null
                ),
            });
            dynamicColumns.push({
                accessorKey: "recruiter",
                header: "Recruiter",
                Cell: ({ ...params }) => (
                    WorkflowColumnsData("").recruiter(params.row.original)
                )
                // size: 100
            });
            dynamicColumns.push({
                accessorKey: "stages",
                header: "Stages",
                // Cell: WorkflowColumnsData("").stagesList,
                Cell: ({ ...params }) => (
                    WorkflowColumnsData("").stagesList(params.row.original)
                )

            });
            for (let sl = 0; sl < masterStagesList.length; sl++) {
                if (masterStagesList[sl].stageTypeId === "3") {
                    dynamicColumns.push({
                        accessorKey: "dataCollection" + masterStagesList[sl].stageId,
                        header: (masterStagesList[sl].title) ? masterStagesList[sl].title : masterStagesList[sl].name,
                        // Cell: WorkflowColumnsData(masterStagesList[sl].stageId).dataCollection,
                        Cell: ({ ...params }) => (
                            WorkflowColumnsData(masterStagesList[sl].stageId).dataCollection(params.row.original)
                        ),
                        // size: 300
                        minSize: 250,
                    });
                } else if (masterStagesList[sl].stageTypeId === "15") {
                    dynamicColumns.push({
                        accessorKey: "documentSigning" + masterStagesList[sl].stageId,
                        header: (masterStagesList[sl].title) ? masterStagesList[sl].title : masterStagesList[sl].name,
                        // Cell: WorkflowColumnsData(masterStagesList[sl].stageId).documentSigning
                        Cell: ({ ...params }) => (
                            WorkflowColumnsData(masterStagesList[sl].stageId).documentSigning(params.row.original)
                        )
                    });
                } else if (masterStagesList[sl].stageTypeId === "10") {
                    dynamicColumns.push({
                        accessorKey: "videoRecordings" + masterStagesList[sl].stageId,
                        header: (masterStagesList[sl].title) ? masterStagesList[sl].title : masterStagesList[sl].name,
                        minSize: 250,
                        // size: 250,
                        // maxSize: 250,
                        Cell: ({ row }) => {
                            return (
                                <div className="videoRecordingDiv">
                                    {
                                        (row.original["videoRecordingsList_" + masterStagesList[sl].stageId] && row.original["videoRecordingsList_" + masterStagesList[sl].stageId].length) ?
                                            row.original["videoRecordingsList_" + masterStagesList[sl].stageId].map((i: { questionid: string, question: string, stageid: string, workflow_job_cand_id: string, videolink: string }) => <Grid >
                                                <label className='fw-7 questionLabel' >{i.question}</label>
                                                <div> <PlayCircleFilledWhiteOutlinedIcon onClick={() => showVideo(i.videolink)} className='cursor-pointer c-grey' /> </div>
                                            </Grid>
                                            )
                                            :
                                            null
                                    }
                                </div>
                            )
                        }
                    });
                } else if (masterStagesList[sl].stageTypeId === "9") {
                    dynamicColumns.push({
                        accessorKey: "scheduler" + masterStagesList[sl].stageId,
                        header: (masterStagesList[sl].title) ? masterStagesList[sl].title : masterStagesList[sl].name,
                        // size: 180,
                        // Cell: WorkflowColumnsData(masterStagesList[sl].stageId).scheduler
                        Cell: ({ ...params }) => (
                            WorkflowColumnsData(masterStagesList[sl].stageId).scheduler(params.row.original)
                        )
                    });
                } else if (masterStagesList[sl].stageTypeId === "12") {
                    dynamicColumns.push({
                        accessorKey: "assessmnets" + masterStagesList[sl].stageId,
                        header: (masterStagesList[sl].title) ? masterStagesList[sl].title : masterStagesList[sl].name,
                        // minSize: 200,
                        // size: 200,
                        // maxSize: 200,
                        // Cell: WorkflowColumnsData(masterStagesList[sl].stageId).assessment
                        Cell: ({ ...params }) => (
                            WorkflowColumnsData(masterStagesList[sl].stageId).assessment(params.row.original)
                        )
                    });
                } else if (masterStagesList[sl].stageTypeId === "8") {
                    dynamicColumns.push({
                        accessorKey: "webinar" + masterStagesList[sl].stageId,
                        header: (masterStagesList[sl].title) ? masterStagesList[sl].title : masterStagesList[sl].name,
                        // Cell: WorkflowColumnsData(masterStagesList[sl].stageId).webinar
                        Cell: ({ ...params }) => (
                            WorkflowColumnsData(masterStagesList[sl].stageId).webinar(params.row.original)
                        )
                    });

                } else if (masterStagesList[sl].stageTypeId === "14") {
                    dynamicColumns.push({
                        accessorKey: "systemChecker" + masterStagesList[sl].stageId,
                        header: (masterStagesList[sl].title) ? masterStagesList[sl].title : masterStagesList[sl].name,
                        // Cell: WorkflowColumnsData(masterStagesList[sl].stageId).systemChecker
                        Cell: ({ ...params }) => (
                            WorkflowColumnsData(masterStagesList[sl].stageId).systemChecker(params.row.original)
                        )
                    });
                } else if (masterStagesList[sl].stageTypeId === "1") {
                }
            }
        }
    }


    const flatData = useMemo(
        () => data?.pages.flatMap((page) => page.data) ?? [],
        [data],
    );

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            let rowData: any = {};
            let processedData: any = flatData;
            for (let index = 0; index < flatData.length; index++) {
                rowData[processedData[index].candid] = true;
            }
            setRowSelection(rowData);
        } else {
            setRowSelection({});
        }
        setIsSelectAllChecked(event.target.checked);

    }

    const candIds = useRef<string[]>([]);

    const totalDBRowCount = selectedWorkflowCandidateId.current ? 1 : candIds.current.length ? candIds.current.length : totalCount ?? 0;
    const totalFetched = flatData.length;

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
    useEffect(() => {
        if (flatData.length) {
            rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
        }
        setSelectedCandidateIds(Object.keys(rowSelection));

    }, [rowSelection]);

    //scroll to top of table when sorting or filters change
    useEffect(() => {
        //scroll to the top of the table when the sorting changes
        try {
            rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
        } catch (error) {
            console.error(error);
        }
    }, [sorting, columnFilters, globalFilter]);

    //a check on mount to see if the table is already scrolled to the bottom and immediately needs to fetch more data
    // useEffect(() => {
    //     fetchMoreOnBottomReached(tableContainerRef.current);
    // }, [fetchMoreOnBottomReached]);

    // console.log(Object.keys(rowSelection).length);


    const selectedCandidateData = useRef<any>({});

    const [showVideoPreview, setShowVideoPreview] = useState(false);
    const [videoPreviewLink, setVideoPreviewLink] = useState('');

    const [addtolistanchorEl, setAddToListAnchorEl] = useState<null | HTMLElement>(null);
    const openAddToListenBtn = Boolean(addtolistanchorEl);

    useEffect(() => {
        console.log(openAddToListenBtn);
    }, [openAddToListenBtn]);




    const handleProfileMenuClose = () => {
        setAddToListAnchorEl(null);
    };

    const showVideo = (link: string) => {
        if (link && (isValidUrl(link) || link.includes('cameratag.com'))) {
            setVideoPreviewLink(link);
            setShowVideoPreview(true);
        } else {
            showToaster('In Valid URL.', 'error');
        }
    }
    const isValidUrl = (str: string) => {
        // let url;
        // try {
        //     url = new URL(text);
        // } catch (_) {
        //     return false;
        // }
        // return url.protocol === "http:" || url.protocol === "https:";

        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    }

    const moveToStage = (toStageId: string) => {
        let logData = {
            workflow_job_cand_id: selectedCandidateData.current.workflow_job_cand_id,
            candid: selectedCandidateData.current.candid,
            fromstage: selectedCandidateData.current.stageid,
            tostage: toStageId,
            recrid: userLocalData.getvalue('recrId'),
            clientId: userLocalData.getvalue('clientId')
        }
        trackPromise(
            ApiService.getByParams(193, 'Curately/Workflow/workflow_candidate_next_stage.jsp',
                {
                    workflow_job_cand_id: selectedCandidateData.current.workflow_job_cand_id,
                    stageId: selectedCandidateData.current.stageid,
                    stageNumber: selectedCandidateData.current.position,
                    stageId1: toStageId,
                    clientId: userLocalData.getvalue('clientId')
                }
            ).then(
                (response) => {
                    if (response.data.message === "Success") {
                        ApiService.postWithData('admin',
                            'applicantsStagesMoveLogs',
                            logData
                        ).then(
                            (response) => {
                                if (response.data.Success) {
                                    refetch();
                                    refetchData();
                                } else {
                                    showToaster(response.data.message, 'error');
                                }
                            }
                        )
                    } else {
                        showToaster(response.data.message, 'error');
                    }
                }
            )
        )
    }

    const loadDataWithCandidateIds = (candIdsFromFilter: string[]) => {
        candIds.current = candIdsFromFilter;
        refetch();
        // getCandidatesData(selectedStage, candIds);
    }

    const handleMoveTo = (stageId: any) => {
        let idsList = Object.entries(rowSelection).filter(([key, value]) => value).map(([key]) => key);
        setOpenMoveToMenu(false);
        if (!!idsList?.length) {
            let rowData = flatData.find((each) => each.candid.toString() === idsList[0].toString());
            selectedCandidateData.current = rowData;
            moveToStage(stageId)
        }
    }

    return (
        <>
            {
                dynamicColumns.length ?
                    <MaterialReactTable
                        enableStickyHeader
                        columns={dynamicColumns.length ? dynamicColumns : staticColumns}
                        data={flatData}
                        enablePagination={false}
                        // enableRowNumbers
                        enableRowSelection
                        enableRowVirtualization //optional, but recommended if it is likely going to be more than 100 rows
                        manualFiltering
                        manualSorting
                        renderTopToolbar={
                            <div>
                                <Grid
                                    container
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
                                    <Grid >
                                        <Stack direction="row">
                                            <Checkbox className="select-all-checkbox ml-3 p-1" disableRipple color="default" checked={isSelectAllChecked} onChange={handleSelectAll} />
                                            {
                                                isBulkEmailSettingEnabled ?
                                                    <Button
                                                        variant="outlined"
                                                        color="secondary"
                                                        className="mr-2"
                                                        disabled={Object.keys(rowSelection).length > 0 ? false : true}
                                                        onClick={handleBlastEmail}
                                                        startIcon={<MailOutlineOutlinedIcon />}
                                                    >
                                                        Blast Email
                                                    </Button>
                                                    :
                                                    null
                                            }
                                            {

                                                <Button
                                                    variant="outlined"
                                                    color="secondary"
                                                    className="mr-2"
                                                    disabled={Object.keys(rowSelection).length === 1 ? false : true}
                                                    onClick={() => {
                                                        setOpenMoveToMenu(true);
                                                    }}
                                                    endIcon={<ArrowDropDownOutlined />}
                                                    ref={moveToRef}
                                                >
                                                    Move To
                                                </Button>

                                            }
                                            {!!nextStagesList?.length && <Menu
                                                open={openMoveToMenu}
                                                onClose={() => {
                                                    setOpenMoveToMenu(false);
                                                }} anchorEl={moveToRef.current}>
                                                {nextStagesList.map((stage: any, index: number) => (
                                                    <MenuItem key={index} onClick={() => handleMoveTo(stage.stageId)}>{(stage.title) ? stage.title : stage.name}</MenuItem>
                                                ))}
                                            </Menu>}
                                        </Stack>
                                    </Grid>
                                    <Grid >
                                        <Stack direction="row" alignItems='center'>
                                            <div className='mr-5'>
                                                {
                                                    selectedStage.stageId ?
                                                        <FilterStage currentStageId={selectedStage.stageId} passedStageData={{}} stagesList={masterStagesList} workflowData={workflowData} sendCandIds={loadDataWithCandidateIds} />
                                                        :
                                                        null
                                                }
                                            </div>
                                            <MUIAutoComplete
                                                id='workflowCandidate'
                                                handleChange={(id: any, name: string) => {
                                                    setWorkflowCandidate({ id, name });
                                                    selectedWorkflowCandidateId.current = id || "";
                                                    refetch();
                                                    setRowSelection({});
                                                    // if (id) {
                                                    // } else{
                                                    // }
                                                }}
                                                valuePassed={
                                                    (workflowCandidate.id) ? { label: workflowCandidate.name, id: workflowCandidate.id } :
                                                        {}
                                                }
                                                isMultiple={false}
                                                textToShow="Search Candidate"
                                                width="250px"
                                                type='workflowCandidate'
                                                placeholder="Select Candidate"
                                                jobId={jobId}
                                                className='mb-1 pr-2 pt-1'
                                            />
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </div>
                        }
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

                        initialState={{
                            // columnPinning: { left: ['mrt-row-select'] },
                            density: 'compact',
                            showGlobalFilter: false
                        }}
                        onColumnFiltersChange={setColumnFilters}
                        onGlobalFilterChange={setGlobalFilter}
                        onSortingChange={setSorting}
                        enableGlobalFilterModes={false}
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
                        }}
                        onRowSelectionChange={setRowSelection}
                        rowVirtualizerInstanceRef={rowVirtualizerInstanceRef} //get access to the virtualizer instance
                        rowVirtualizerOptions={{ overscan: 4 }}

                        getRowId={(row) => row.candid}
                        icons={{
                            ArrowDownwardIcon: (props: any) => <SwitchLeftIcon  {...props} />
                        }}
                        layoutMode='semantic'
                    />
                    :
                    null
            }
            {
                videoPreviewLink ?
                    <VideoPreview url={videoPreviewLink} open={showVideoPreview}
                        closePopup={() => setShowVideoPreview(false)} />
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
                    jobId={jobId}
                />
            }
            {/* {
                (openAddCloneModal) ?
                    <CloneToOtherJob
                        open={openAddCloneModal}
                        closePopup={() => setOpenAddCloneModal(false)}

                    />
                    :
                    null
            }
            {
                (openSequenceModal) ?
                    <Sequence
                        open={openSequenceModal}
                        closePopup={() => setOpenSequenceModal(false)}
                        selectedCandidateIds={selectedCandidateIds}
                    />
                    :
                    null
            } */}
            {
                viewCandidate ?
                    <ViewCandidateModal candidateId={viewCandidateId.current} closePopup={() => setViewCandidate(false)} jobId={jobId ? jobId : ""} open={viewCandidate} />
                    :
                    null
            }
        </>
    );
};



const queryClient = new QueryClient();

const VirtualScrollWorkflow = (
    { masterStagesList, selectedStage, stageIds, totalCount, workflowData, refetchData }
        :
        {
            masterStagesList: StageInterface[], selectedStage: any, stageIds: {
                rejected: string;
                approved: string;
                onHold: string;
            }, totalCount: any,
            workflowData: any,
            refetchData: any
        }
) => (
    <QueryClientProvider client={queryClient}>
        <VirtualData masterStagesList={masterStagesList} selectedStage={selectedStage} stageIds={stageIds} totalCount={totalCount} workflowData={workflowData} refetchData={refetchData} />
    </QueryClientProvider>
);

export default VirtualScrollWorkflow;