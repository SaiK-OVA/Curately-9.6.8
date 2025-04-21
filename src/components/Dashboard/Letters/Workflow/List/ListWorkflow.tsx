import { useEffect, useRef, useState } from '../../../../../shared/modules/React';
// import { Box, Button, Grid } from '@mui/material';
import { Box } from '../../../../../shared/modules/MaterialImports/Box';
import { Link } from 'react-router-dom';
// import { DataGrid, GridColDef } from '@mui/x-data-grid';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import CustomPagination from '../../../../shared/CustomPagination/CustomPagination';
import { Typography } from '../../../../../shared/modules/MaterialImports/Typography';
import { Tabs, Tab } from '../../../../../shared/modules/MaterialImports/Tabs';

// import FormLabel from '@mui/material/FormLabel';

import ApiService from '../../../../../shared/api/api';


import { trackPromise } from '../../../../../shared/modules/PromiseTrackter';

// import EditOutlinedIcon from '@mui/icons-material/EditOutlined';


import { DateTime } from '../../../../../shared/modules/Luxon';
import { Switch } from '../../../../../shared/modules/MaterialImports/Switch';

import { Tooltip } from '../../../../../shared/modules/MaterialImports/ToolTip';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { CloneWorkflow, cloneDialog } from './CloneWorkflow/CloneWorkflow';
import { MaterialReactTable, type MRT_ColumnDef } from "../../../../../shared/modules/MaterialReactTable";
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
import { userLocalData } from '../../../../../shared/services/userData';
import { ConfirmDialog } from '../../../../shared/ConfirmDialog/ConfirmDialog';


import { Stack } from "../../../../../shared/modules/MaterialImports/Stack";
import { Button, InputAdornment, TextField, Grid } from '../../../../../shared/modules/commonImports';
import SearchIcon from '@mui/icons-material/Search';

import './ListWorkflow.scss';
import { showToaster } from '../../../../shared/SnackBar/SnackBar';


const ListWorkflow = () => {
    const [searchWorkflowName, setSearchWorkflowName] = useState<string>("");

    const [listWorkflow, setListWorkflow] = useState<any[] | never[]>([]);
    const recrID = userLocalData.getvalue('recrId');

    const [rowSelection, setRowSelection] = useState({});
    const [globalFilter, setGlobalFilter] = useState('');
    const [filteredWorkflow, setFilteredWorkflow] = useState<any[] | never[]>([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 25, //customize the default page size
    });
    const [rowCount, setRowCount] = useState(0);
    const initialRender = useRef(true);

    // const workflowRef = useRef({
    //     total: 0,
    //     name: "",
    // })

    const tokensObj = useRef({
        accessToken: "",
        accountId: "",
        // calendarId: "",
        calendarData: [],
        selectedCronofyIndex: -1,
        selectedCronofyId: "",
        selectedEventId: "",
        selectedRecrId: "",
    });

    useEffect(() => {
        const filter = globalFilter?.toLowerCase();
        if (!filter) {
            setFilteredWorkflow(listWorkflow);
            // setRowCount(listWorkflow.length);
        } else {
            const filtered = listWorkflow.filter(row => {
                return (
                    (row.WorkFlowName && row.WorkFlowName.toLowerCase().includes(filter)) ||
                    (row.recrName && row.recrName.toLowerCase().includes(filter)) ||
                    (row.recrId && `${row.recrId}`.includes(filter)) ||
                    (row.sequenceId && `${row.sequenceId}`.includes(filter))
                );
            });
            setFilteredWorkflow(filtered);
            // setRowCount(filtered.length);
        }



        // setPagination(prev => ({ ...prev, pageIndex: 0 }));
    }, [globalFilter]);

    const columns: MRT_ColumnDef<any>[] = [
        // {
        //     accessorKey: 'id',
        //     header: 'ID',
        //     enablePinning: true,
        //     size: 80,
        //     // filterable: false,
        //     // sortable: false,
        // },
        {
            accessorKey: 'WorkFlowName',
            header: 'Workflow Name',
            enablePinning: true,
            Cell: ({ renderedCellValue, row }) => (
                (row.original.CreatedBy === Number(recrID)) ?
                    <Link to={`/${userLocalData.getvalue('clientName')}/letter/workflows/edit/${row.original.WorkFlowId}`}>
                        {row.original.WorkFlowName}
                    </Link>
                    :
                    <span>{row.original.WorkFlowName}</span>
            ),
            minSize: 300
            // params.getValue(params.id, 'id') || ''
        },
        {
            accessorKey: 'CreatedDate',
            header: 'Created Date',
            Cell: ({ renderedCellValue, row }) => (
                <span>
                    {/* {row.original.CreatedDate.substring(0, 10)} */}
                    {DateTime.fromSQL(row.original.CreatedDate.substring(0, 10)).toFormat('MM/dd/yyyy')}

                </span>
            )
        },
        {
            accessorKey: 'isactive',
            header: 'Active',
            Cell: ({ renderedCellValue, row }) => (
                <span>
                    {/* {(row.original.isactive) ? 'Yes' : 'No'} */}
                    {
                        (row.original.CreatedBy === Number(recrID)) ?
                            <Switch name={`emailEnable${row.original.WorkFlowId}`}
                                onChange={
                                    (e) => {
                                        // console.log(row.original.WorkFlowName + " " + e.target.checked);
                                        row.original.isactive = e.target.checked;
                                        changeIsActive(row.original.WorkFlowId, e.target.checked);
                                    }
                                }
                                size='small'
                                checked={row.original.isactive}
                            // disabled={(row.original.CreatedBy !== Number(recrID))}
                            />
                            : null
                    }
                    {/* <FormControlLabel
                    control={
                    }
                    label="Email Message"
                    labelPlacement='start'
                    className='ml-0'
                /> */}

                </span>
            ),
            muiTableBodyCellProps: {
                sx: {
                    paddingTop: 0,
                    paddingBottom: 0
                }
            }
        },
        {
            accessorKey: 'actions',
            header: '',
            Cell: ({ renderedCellValue, row }) => (
                <span className='actions'>
                    <span className="actionIcons">
                        <Tooltip title="Clone">
                            <ContentCopyIcon
                                className='copy'
                                onClick={() => {
                                    cloneDialog(
                                        row.original.WorkFlowId,
                                        () => {
                                            // console.log(row.original.WorkFlowId)
                                        }
                                    )
                                }} />
                        </Tooltip>
                        <Tooltip className='ml-3' title="Preview">
                            <VisibilityOutlinedIcon
                                className='copy'
                                onClick={() => {
                                    getScheduleData(row.original.WorkFlowId)
                                }} />
                        </Tooltip>

                    </span>
                </span>
            )
        }
    ];
    const [myOrAll, setMyOrAll] = useState('myWorkflows');
    const [schedulingsList, setSchedulingsList] = useState<{
        title: string,
        description: string,
        startDate: DateTime,
        endDate: DateTime,
        locationDescription: string,
        conferencing: string,
        zoomLink: string,
        duration: string,
        stageId: string,
        stageNumber: string
    }[]>([]);
    const myOrAllRef = useRef('myWorkflows');


    const changeIsActive = (wId: string, value: boolean) => {

        let val = (value) ? 1 : 0;
        trackPromise(
            ApiService.getById('admin', 'activeWorkFlow/' + wId, val + '/' + userLocalData.getvalue('clientId')).then((response: any) => {
                // console.log(response);
                if (response.data.message === "Success") {
                    let tempResponse = [...filteredWorkflow];
                    tempResponse = tempResponse.filter((item) => {
                        return Number(item.WorkFlowId) !== Number(wId);
                    });
                    // setRowCount(tempResponse.length);
                    setListWorkflow(tempResponse);
                    setFilteredWorkflow(tempResponse)
                } else {
                    showToaster('An error occurred while updating status.', 'error');
                }
            })
        )
    }
    const openPreview = (wId: string) => {

        trackPromise(
            ApiService.postWithData("admin", 'workflowPreview', { workflowId: wId, clientId: userLocalData.getvalue('clientId') }).then((response: any) => {
                // console.log(response);
                if (response.data.Success && response.data.token.trim()) {
                    // window.open(`${window.location.origin}/workflow/#/preview/${response.data.token.trim()}`);
                    if (window.location.protocol === "http:") {
                        window.open(`http://localhost:3000/#/preview/${response.data.token.trim()}`);
                    } else {
                        window.open(`${window.location.origin}/workflow/#/preview/${response.data.token.trim()}`);
                    }
                    // window.open(`${(window.location.protocol === 'https:') ? "https://resume.accuick.com" : "http://localhost:3000"}/workflow/#/preview/${response.data.trim()}`);
                }
            })
        )
    }


    const getScheduleData = (wId: string) => {
        if (wId) {
            // http://35.155.228.233:41088/DemoAutomation/schedulerList/20/3
            trackPromise(
                ApiService.getCall('admin', `schedulerList/${wId}/${userLocalData.getvalue('clientId')}`)
                    .then((result) => {
                        // console.log(result);
                        if (result.data.schedulerList && result.data.schedulerList.length) {
                            let tempScheduleList = [];
                            for (let sl = 0; sl < result.data.schedulerList.length; sl++) {
                                const element = result.data.schedulerList[sl];
                                tempScheduleList.push({
                                    title: element.title,
                                    description: "",
                                    startDate: DateTime.now().set({ hour: 9, minute: 30 }).plus({ day: 1 }),
                                    endDate: DateTime.now().plus({ days: 8 }).set({ hour: 17, minute: 30 }),
                                    locationDescription: "",
                                    conferencing: "-",
                                    zoomLink: "",
                                    duration: "60",
                                    stageId: element.stageId,
                                    stageNumber: element.number
                                })
                            }
                            setSchedulingsList(tempScheduleList);
                            loadEventIds(wId, tempScheduleList);
                        } else {
                            openPreview(wId);
                        }
                    })
                    .catch((error) => {
                        console.error('Error Assigning Job to Workflow: ', error);
                    })
            );
        } else {
            setSchedulingsList([]);
            callWorkflowAssignAPI([], wId);

        }
    }

    const loadEventIds = (wId: string, scheduleList: any) => {
        let eventIdsToPass: string[] = [];
        let recrIds = [userLocalData.getvalue('recrId')];
        for (let ri = 0; ri < recrIds.length; ri++) {
            // const element = recrIds[ri];

            let tempData = {
                action: "list",
                recrId: recrIds[ri],
                clientId: userLocalData.getvalue('clientId')
            }

            let recrData = {
                recrId: recrIds[ri],
                clientId: userLocalData.getvalue('clientId')
            }
            trackPromise(
                ApiService.postWithParams(193, 'Curately/Workflow/workflow_cronofy_users.jsp', recrData).then((response1: any) => {
                    // tokensObj.current.accountId = response1.data.subId;
                    let refreshData = {
                        json: JSON.stringify(
                            {
                                "client_id": import.meta.env.VITE_CRONOFY_CLIENT_ID,
                                "client_secret": import.meta.env.VITE_CRONOFY_CLIENT_SECRET,
                                // "client_id": response1.data.client_id,
                                // "client_secret": response1.data.client_secret,
                                "grant_type": "refresh_token",
                                "refresh_token": response1.data.refreshToken
                            }
                        )
                    }
                    trackPromise(
                        ApiService.postWithParams(193, 'Curately/Workflow/workflow_cronofy_refresh_token.jsp', refreshData).then((response2: any) => {
                            // tokensObj.current.accessToken = "uiibPBv0CKjpQ-vP6ElCuqMKwcfnlxoJ";
                            tokensObj.current.accessToken = response2.data.access_token;
                            let cronofyParams = {
                                url: "https://api.cronofy.com/v1/userinfo",
                                token: response2.data.access_token
                            }
                            trackPromise(
                                ApiService.postWithParams(193, 'Curately/Workflow/workflow_cronofy_postman_get.jsp', cronofyParams).then((response3: any) => {
                                    // console.log(response3);
                                    tokensObj.current.accountId = response3.data.sub;
                                    tokensObj.current.calendarData = response3.data["cronofy.data"].profiles[0].profile_calendars;

                                    let tempCalendarId = (response3.data["cronofy.data"] && response3.data["cronofy.data"].profiles.length && response3.data["cronofy.data"].profiles[0].profile_calendars.length && response3.data["cronofy.data"].profiles[0].profile_calendars[0].calendar_id) ? response3.data["cronofy.data"].profiles[0].profile_calendars[0].calendar_id : ""; response3.data["cronofy.data"].profiles[0].profile_calendars[0].calendar_id;
                                    // let ScheduleStageIds = [];
                                    let tempStageIdsList = scheduleList;
                                    for (let ssl = 0; ssl < tempStageIdsList.length; ssl++) {
                                        if (tokensObj.current.accountId && tempCalendarId) {
                                            let tempData = {
                                                summary: tempStageIdsList[ssl].title,
                                                description: tempStageIdsList[ssl].description,
                                                location: tempStageIdsList[ssl].locationDescription,
                                                start_date: tempStageIdsList[ssl].startDate?.toISO()?.substring(19, 0),
                                                end_date: tempStageIdsList[ssl].endDate?.toISO()?.substring(19, 0),
                                                duration: tempStageIdsList[ssl].duration,
                                                providerid: tempStageIdsList[ssl].conferencing,
                                                join_url: (tempStageIdsList[ssl].conferencing === "zoom") ? tempStageIdsList[ssl].zoomLink : "",
                                                calendarId: tempCalendarId,
                                                action: "add",
                                                username: userLocalData.getvalue('userName'),
                                                recrId: userLocalData.getvalue('recrId'),
                                                cronofyId: "",
                                                clientId: userLocalData.getvalue('clientId')
                                            };
                                            ApiService.postWithParams(193, 'Curately/Workflow/workflow_cronofy_action.jsp', tempData).then((addEventResponse: any) => {
                                                // console.log(addEventResponse.data);
                                                if (addEventResponse.data.message === "Success" && addEventResponse.data.eventId) {
                                                    eventIdsToPass.push(addEventResponse.data.eventId + '::' + recrIds[ri] + '::' + tempStageIdsList[ssl].stageId);

                                                    if (addEventResponse.data.eventId) {
                                                        tempData.cronofyId = addEventResponse.data.eventId;
                                                        let data: any = {
                                                            url: "https://api.cronofy.com/v1/availability_rules",
                                                            json: JSON.stringify({
                                                                "availability_rule_id": addEventResponse.data.eventId,
                                                                // "tzid": "America/Chicago",
                                                                tzid: Intl.DateTimeFormat().resolvedOptions().timeZone,
                                                                "calendar_ids": [
                                                                    tempCalendarId
                                                                ],
                                                                "weekly_periods": [
                                                                    {
                                                                        "day": "monday",
                                                                        "start_time": "09:00",
                                                                        "end_time": "17:30"
                                                                    },
                                                                    {
                                                                        "day": "tuesday",
                                                                        "start_time": "09:00",
                                                                        "end_time": "17:30"
                                                                    },
                                                                    {
                                                                        "day": "wednesday",
                                                                        "start_time": "09:00",
                                                                        "end_time": "17:30"
                                                                    },
                                                                    {
                                                                        "day": "thursday",
                                                                        "start_time": "09:00",
                                                                        "end_time": "17:30"
                                                                    },
                                                                    {
                                                                        "day": "friday",
                                                                        "start_time": "09:00",
                                                                        "end_time": "17:30"
                                                                    }
                                                                ]
                                                            }),
                                                            token: tokensObj.current.accessToken
                                                        }
                                                        trackPromise(
                                                            ApiService.postWithParams(193, 'Curately/Workflow/workflow_cronofy_postman_post.jsp', data).then((finalResponse: any) => {
                                                                // console.log(finalResponse.data);
                                                                if ((ri == recrIds.length - 1) && (ssl == tempStageIdsList.length - 1)) {
                                                                    callWorkflowAssignAPI(eventIdsToPass, wId);
                                                                }
                                                            })
                                                        );
                                                    }
                                                } else {
                                                    showToaster(addEventResponse.data.message, 'error');

                                                }
                                            });
                                        } else {
                                            if (!tempCalendarId) {
                                                showToaster('No Calendar ID found', 'error');
                                            }
                                            if (!tokensObj.current.accountId) {
                                                showToaster('No Account ID found', 'error');
                                            }

                                        }
                                    }
                                })
                            )
                        })
                    )
                })
            );

        }
    }

    const callWorkflowAssignAPI = (eventIds: string[], wId: string) => {
        // jobid  - 206418
        // candid - 5321688
        // candname - Accuick3 Test3
        // recrId  - 61

        let tempData = {
            workflowId: wId,
            jobId: "206418",
            recrId: userLocalData.getvalue('recrId'),
            assignRecrIds: userLocalData.getvalue('recrId'),
            assignStates: "",
            assignType: "",
            eventIds: eventIds.join()
        }
        trackPromise(
            ApiService.getByParams(193, 'Curately/Workflow/workflow_assignjob_preview.jsp', tempData)
                .then((result) => {
                    if (result.data.message === "Success") {
                        openPreview(wId);
                    } else if (result.data.message && result.data.message.includes("already")) {
                        openPreview(wId);
                    } else {
                        // showToaster((result.data.message) ? result.data.message : "An error occured.", 'error');
                    }
                })

                .catch((error) => {
                    console.error('Error Assigning Job to Workflow: ', error);
                })
        )
    }
    const getWorkflowList = () => {
        // setDataLoading(true);
        const url = (myOrAllRef.current === "myWorkflows") ? 'listWorkFlowById' : 'listWorkFlow';
        const dataToPass = (myOrAllRef.current === "myWorkflows") ?
            {
                "clientId": userLocalData.getvalue('clientId'),
                "next": pagination.pageSize * pagination.pageIndex,
                "pageSize": pagination.pageSize,
                "search": searchWorkflowName,
                createdBy: userLocalData.getvalue('recrId')
            }
            :
            {
                "clientId": userLocalData.getvalue('clientId'),
                "next": pagination.pageSize * pagination.pageIndex,
                "pageSize": pagination.pageSize,
                "search": searchWorkflowName
            }
        trackPromise(
            ApiService.postWithData('admin', url, dataToPass).then((response: any) => {
                // workflowRef.current.name = response.data.WorkFlowList[0].WorkFlowName
                // console.log(workflowRef.current.name)
                // console.log(response.data);
                // console.log(response.data.TotalCount);

                if (response.data.Status && response.data.Status === 200) {
                    // workflowRef.current.total = response.data.TotalCount;
                    // const workList=workflowRef.current.total;
                    if (pagination.pageIndex === 0) {
                        setRowCount(response.data.TotalCount);
                    }
                    // CreatedBy: 1893
                    // CreatedDate: "2022-12-27 10:08:30.707"
                    // ModifyBy: 1893
                    // ModifyDate: "2022-12-27 10:08:30.707"
                    // WorkFlowId: 17
                    // WorkFlowName: "Test Prod Workflow 1"
                    // isactive: true
                    let tempWorkflowList = [...response.data.WorkFlowList].filter((item: { actions: string, isactive: false }) => item.isactive);
                    for (let sl = 0; sl < tempWorkflowList.length; sl++) {
                        tempWorkflowList[sl].id = sl + 1;
                        tempWorkflowList[sl].actions = "";
                    }
                    // setRowCount(tempWorkflowList.length);
                    setListWorkflow(tempWorkflowList);
                    setFilteredWorkflow(tempWorkflowList)
                } else {
                    let tempWorkflowList = [...response.data];
                    for (let sl = 0; sl < tempWorkflowList.length; sl++) {
                        tempWorkflowList[sl].id = sl + 1;
                        tempWorkflowList[sl].actions = "";
                    }
                    setRowCount(response.data.TotalCount);
                    setListWorkflow(tempWorkflowList);
                    setFilteredWorkflow(tempWorkflowList);
                }
                // setDataLoading(false);
            })
        );
    }
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        myOrAllRef.current = newValue;
        setMyOrAll(newValue);
        setSearchWorkflowName("");
    };
    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
        } else {
            getWorkflowList();
        }

    }, [pagination.pageIndex]);
    useEffect(() => {
        onWorkflowSearch();
    }, [myOrAll]);

    const saveAuditLog = (id: number) => {
        ApiService.saveAuditLog(id);
    }

    useEffect(() => {
        saveAuditLog(4201);
    }, [])


    const onWorkflowChange = (e: any) => {
        setSearchWorkflowName(e.target.value);
        // console.log(e.target.value);
    }

    const onWorkflowSearch = () => {
        if (pagination.pageIndex === 0) {
            getWorkflowList();
        } else {
            setPagination({
                ...pagination,
                pageIndex: 0
            })
        }
    }


    return <>
        <div className='pt-3' id='workflowList'>
            <div className="">
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    className="customCard px-4 py-2 mb-2"
                    sx={{ minHeight: "auto !important" }}
                >
                    <Typography variant="h6" className="header"> Workflow List </Typography>
                    <div className='d-flex'>
                        <Button variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />} href={`#/${userLocalData.getvalue('clientName')}/letter/workflows/add`} onClick={() => saveAuditLog(4202)}>
                            Add New Workflow
                        </Button>
                    </div>
                </Grid>
                <Grid>
                    <Tabs
                        value={myOrAll}
                        onChange={handleChange}
                        className="tableTabs"
                    >
                        <Tab value={"myWorkflows"} label={"My Workflows"} onClick={() => saveAuditLog(4204)} />

                        <Tab value={"allWorkflows"} label={"All Workflows"} onClick={() => saveAuditLog(4205)} />
                    </Tabs>
                </Grid>

                <div className="mt-3">
                    <Box sx={{ width: '100%' }} className='MRTableCustom'>
                        <MaterialReactTable
                            columns={columns}
                            enableRowSelection={false}
                            data={filteredWorkflow}
                            onRowSelectionChange={setRowSelection}
                            state={{ rowSelection, pagination }}
                            enablePinning
                            enableStickyHeader
                            initialState={{
                                columnPinning: { left: ['mrt-row-select', 'id', 'WorkFlowName'] },
                                density: 'compact',
                                showGlobalFilter: true,
                            }}
                            enableDensityToggle={false}
                            enableGlobalFilterModes
                            onGlobalFilterChange={(value) => setGlobalFilter(value || '')}
                            enableFullScreenToggle={false}
                            enableColumnResizing
                            enableFilters={false}
                            columnResizeMode="onChange"
                            // onPaginationChange={setPagination}
                            getRowId={(row) => row.WorkFlowId}
                            icons={{
                                ArrowDownwardIcon: (props: any) => <SwitchLeftIcon  {...props} />
                            }}
                            muiPaginationProps={{
                                rowsPerPageOptions: [25],
                                showFirstButton: false,
                                showLastButton: false,
                                SelectProps: {
                                    style: { display: 'none' },
                                },
                            }}
                            enablePagination={true}
                            renderBottomToolbarCustomActions={() => (
                                <CustomPagination
                                    page={pagination.pageIndex}
                                    rowsPerPage={25}
                                    rowCount={rowCount}
                                    onChangePage={(page: any) =>
                                        setPagination({
                                            ...pagination,
                                            pageIndex: page,
                                            pageSize: 25,
                                        })
                                    }
                                    showCount={false}
                                />
                            )}
                            rowCount={rowCount}
                            renderTopToolbar={
                                <Grid
                                    className="p-2"
                                    container
                                    direction="row"
                                    sx={{
                                        justifyContent: "flex-end",
                                        alignItems: "center",
                                    }}
                                >
                                    <Grid >
                                        <Stack direction="row" spacing={2}>
                                            <TextField fullWidth size="small"
                                                placeholder="Search Name"
                                                value={searchWorkflowName}
                                                onKeyUp={(e) => {
                                                    if (e.key === "Enter") {
                                                        onWorkflowSearch();
                                                    }
                                                }}
                                                onChange={onWorkflowChange}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <SearchIcon className='searchIcon'
                                                                onClick={onWorkflowSearch}
                                                            />
                                                        </InputAdornment>
                                                    ),

                                                }}
                                            />
                                        </Stack>
                                    </Grid>
                                </Grid>
                            }
                            manualPagination={true}
                        // muiTableBodyCellProps={{
                        //     sx:{
                        //         paddingTop: 0,
                        //         paddingBottom: 0
                        //     }
                        // }}
                        //  manualPagination
                        // paginateExpandedRows={true}
                        // enableRowVirtualization
                        // onColumnSizingChange={(e) => columnChanged(e)}
                        // onColumnSizingInfoChange={(e) => columnInfo(e)}

                        />
                        {/* <DataGrid
                        sx={{
                            "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                                outline: "none !important",
                            },
                        }}
                        rows={listWorkflow}
                        columns={columns}
                        pageSize={10}
                        // rowsPerPageOptions={[25, 10]}
                        // checkboxSelection
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: false }}
                        rowHeight={35}
                        getRowId={(row: any) => row.WorkFlowId}
                    // loading={dataLoading}
                    /> */}
                    </Box>
                </div>
            </div>
            <CloneWorkflow reload={() => getWorkflowList()} />
        </div>
        <ConfirmDialog />
    </>;
}

export default ListWorkflow;