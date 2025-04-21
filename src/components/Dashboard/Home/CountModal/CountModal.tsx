import { Dialog, DialogTitle, DialogContent, DialogActions, CloseIcon } from '../../../../shared/modules/MaterialImports/Dialog';
import { IconButton } from '../../../../shared/modules/MaterialImports/Button'
import { Divider } from '../../../../shared/modules/MaterialImports/Divider';
// import FunctionsOutlinedIcon from '@mui/icons-material/FunctionsOutlined';
import { DashboardCardInterface } from '../dashboardCardModel';

import './CountModal.scss';
import { userLocalData } from '../../../../shared/services/userData';
import ApiService from '../../../../shared/api/api';
import { useEffect, useMemo, useState } from '../../../../shared/modules/React';

import { MaterialReactTable, MRT_ColumnDef } from '../../../../shared/modules/MaterialReactTable';
import { Grid } from '../../../../shared/modules/MaterialImports/Grid2';
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { globalData } from '../../../../shared/services/globalData';
import { DateTime } from '../../../../shared/modules/Luxon';
import { trackPromise } from '../../../../shared/modules/PromiseTrackter';
import masterJobStatus from '../../../../shared/data/JobStatus';
import { Loader } from '../../../shared/Loader/Loader';
import { InputAdornment } from '../../../../shared/modules/commonImports';
import { CloseRounded, SearchOutlined } from '@mui/icons-material';
import CustomPagination from '../../../shared/CustomPagination/CustomPagination';


export interface CountDetailsProps {
    dialogOpen: boolean,
    handleDialogClose: any,
    cardData: DashboardCardInterface
}


const CountDetails = (
    {
        dialogOpen,
        handleDialogClose,
        cardData
    }
        :
        CountDetailsProps
) => {


    const [searchValue, setSearchValue] = useState("");
    const [rowSelection, setRowSelection] = useState({});
    const [dataToDisplay, setDataToDisplay] = useState<any>([]);

    const flatData = useMemo(() => {
        return dataToDisplay?.filter((page: any) => {
            return page.jobTitle?.toLowerCase().includes(searchValue.toLowerCase()) ||
                page.userName?.toLowerCase().includes(searchValue.toLowerCase()) ||
                page.recrName?.toLowerCase().includes(searchValue.toLowerCase()) ||
                page.statusName?.toLowerCase().includes(searchValue.toLowerCase());
        }) ?? [];
    }, [searchValue, dataToDisplay]);
    console.log(flatData)

    const dynamicColumns: MRT_ColumnDef<any>[] = useMemo(
        () => [], []
    );
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const rowCount = useMemo(() => flatData.length, [flatData])

    const openCandidateView = (id: string, jobId: string) => {
        window.open(globalData.getWindowLocation() + "candidate/view/" + id.trim() + "/" + jobId);
    }

    const openJobView = (id: string) => {
        window.open(globalData.getWindowLocation() + "job/view/" + id.trim());
    }

    const getTableData = () => {

        let dataToPass = {
            clientId: userLocalData.getvalue('clientId'),
            startDate: cardData.defaultValues.fromDate,
            endDate: cardData.defaultValues.toDate,
            stageId: "",
            recrId: userLocalData.getvalue('recrId')
        }
        let ipToPass: 193 | 'admin' = 193;
        let urlToPass = '';

        dynamicColumns.length = 0;

        switch (cardData.id) {
            case 'jobsReceived':
                ipToPass = 'admin';
                urlToPass = 'dashBoardJobsData';
                break;
            case 'starts':
                ipToPass = 'admin';
                urlToPass = 'dashBoardStartsData';
                dataToPass.stageId = '200';
                break;
            case 'interviews':
                ipToPass = 'admin';
                urlToPass = 'dashBoardStageData';
                dataToPass.stageId = '300';
                break;
            case 'offersReceived':
                ipToPass = 'admin';
                urlToPass = 'dashBoardStageData';
                dataToPass.stageId = '400';
                break;
            case 'submissions':
                ipToPass = 'admin';
                urlToPass = 'dashBoardStageData';
                dataToPass.stageId = '100';
                break;
            case 'jobsWithoutSubs':
                ipToPass = 'admin';
                urlToPass = 'dashJobsWithoutSubsData';
                break;
            case 'recruitersWOSubs':
                ipToPass = 'admin';
                urlToPass = 'recruitersWithoutSubsData'
                break;
            case 'recruitersWOShortlists':
                ipToPass = 'admin';
                urlToPass = 'recruitersWithoutShortlistsData'
                break;
            case 'recruitersWOInterviews':
                ipToPass = 'admin';
                urlToPass = 'recruitersWithoutInterviewsData'
                break;
            case 'swsc24h':
                ipToPass = 'admin';
                urlToPass = 'submissionsWithoutStatusChangeData'
                // submissions without status change in 24 hours
                break;
            case 'aojwc':
                ipToPass = 'admin';
                urlToPass = 'assignedJobWithoutCoverageData'
                // Assigned/Owned job without coverage
                break;
            case 'scwsci3d':
                ipToPass = 'admin';
                urlToPass = "shortlistedCandidatesWithoutStatusChangeData"
                // Shortlisted candidates without status change in 3 days
                break;
            case 'iwsci5d':
                ipToPass = 'admin';
                urlToPass = 'interviewsWithoutStatusChangeData'
                // Interviews without Status change in 5 days
                break;
            // case 'eeoc':
            //     break;
            // case 'eeocVeteran':
            //     // openGraph(unId);
            //     break;
            default:
                break;
        }
        if ((cardData.id === "jobsReceived") || (cardData.id === "jobsWithoutSubs")) {

            // dynamicColumns.push({
            //     accessorKey: "date",
            //     header: "Created Date",
            //     Cell: ({ row }) => (
            //         <span>
            //             {DateTime.fromFormat(row.original.date.substring(0, 10), 'yyyy-MM-dd').toFormat('MM/dd/yyyy')}
            //         </span>
            //     )
            // });
            dynamicColumns.push({
                accessorKey: "jobTitle",
                header: "Job",
                Cell: ({ row }) => (
                    (<span className="hightLightTd" onClick={() => openJobView(row.original.jobId)}>{row.original.jobTitle?.toLowerCase()}</span>)//
                )
            });
            dynamicColumns.push({
                accessorKey: "referenceNo",
                header: "Client Job Id",
            });
            dynamicColumns.push({
                // accessorKey: "city",
                header: "Location",
                accessorFn: (row) => `${row.city}${row.city && row.state ? ", " : ""}${row.state}${row.state && row.zipcode ? ", " : ""}${row.zipcode}`
                ,
            });
            dynamicColumns.push({
                accessorKey: "statusName",
                header: "Status",
                // Cell: ({ row }) => (<span >{(row.original.status) ? masterJobStatus.getNameById(row.original.status) : ''}</span>)
            });
        }
        if ((cardData.id === "interviews") || (cardData.id === "offersReceived") || (cardData.id === "submissions") || (cardData.id === "starts") || (cardData.id === "swsc24h") || (cardData.id === "scwsci3d") || (cardData.id === "iwsci5d") || (cardData.id === "aojwc")) {
            dynamicColumns.push({
                accessorKey: "jobId",
                header: "Job",
                Cell: ({ row }) => (
                    (<span className="hightLightTd" onClick={() => openJobView(row.original.jobId)}>{row.original.jobTitle?.toLowerCase()}</span>)//
                )
            });
            dynamicColumns.push({
                accessorKey: "userId",
                header: "Candidate",
                Cell: ({ row }) => (
                    (<span className="hightLightTd" onClick={() => openCandidateView(row.original.userId, row.original.jobId)}>{row.original.userName?.toLowerCase()}</span>)//
                )
            });
            if ((cardData.id !== "starts")) {
                dynamicColumns.push({
                    accessorKey: "status",
                    header: "Status",
                });
            }
            if (cardData.id !== "interviews" && cardData.id !== "submissions" && cardData.id !== "offersReceived" && cardData.id !== "starts") {

                dynamicColumns.push({
                    accessorKey: "date",
                    header: "Date",
                    Cell: ({ row }) => (
                        <span>
                            {DateTime.fromFormat(row.original.date.substring(0, 10), 'yyyy-MM-dd').toFormat('MM/dd/yyyy')}
                        </span>
                    )
                });
            }
        }
        if ((cardData.id === "recruitersWOSubs") || (cardData.id === "recruitersWOShortlists") || (cardData.id === "recruitersWOInterviews")) {
            dynamicColumns.push({
                accessorKey: "recrId",
                header: "Recr Id",
                // Cell: ({ row }) => (
                //     (<span className="hightLightTd" >{row.original.recrId}</span>)//
                // )
            });
            dynamicColumns.push({
                accessorKey: "recrName",
                header: "recrName",
                // Cell: ({ row }) => (
                //     (<span className="hightLightTd" onClick={() => openJobView(row.original.recrName)}>{row.original.recrName?.toLowerCase()}</span>)//
                // )
            });
        }
        if (urlToPass) {
            trackPromise(
                ApiService.postWithData(ipToPass, urlToPass, dataToPass).then(
                    (response: any) => {
                        if (response.data.Message === 'Success' && response.data.data?.length) {
                            let respData = response.data.data;
                            if (ipToPass === 'admin' && cardData.id === "jobsReceived") {
                                respData = respData.map((item: any) => ({
                                    ...item,
                                    statusName: item.status ? masterJobStatus.getNameById(item.status) : ''
                                }));
                            }
                            setDataToDisplay(respData);
                        }
                    }
                )
            );
        }
    }

    useEffect(() => {
        getTableData();
    }, []);

    return (
        <Dialog
            maxWidth={'lg'}
            fullWidth={true} open={dialogOpen} className='AddJobModal'
            id='dashCountDetails'
        >
            <DialogTitle>
                <span>{cardData.defaultValues.modifiedTitle}</span>
                <IconButton
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                    }}
                    aria-label="close"
                    onClick={handleDialogClose}
                >

                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Divider />
            <DialogContent sx={{ minHeight: 300, overflow: 'auto' }}>
                <Grid container className="MRTableCustom customCard p-0 filterExpand-grid" >
                    <Grid className='w-100'>
                        <Loader />
                        {
                            dynamicColumns.length ?
                                <MaterialReactTable
                                    columns={dynamicColumns.length ? dynamicColumns : []}
                                    enableRowSelection={false}
                                    data={flatData}
                                    onRowSelectionChange={setRowSelection}
                                    state={{
                                        rowSelection,
                                        pagination
                                    }}
                                    initialState={{
                                        density: 'compact',
                                        showGlobalFilter: true
                                    }}
                                    enableGlobalFilterModes
                                    getRowId={row => row.recrId}
                                    enableStickyHeader
                                    icons={{
                                        ArrowDownwardIcon: (props: SvgIconProps) => <SwitchLeftIcon {...props} />
                                    }}
                                    muiPaginationProps={{
                                        showFirstButton: false,
                                        showLastButton: false,
                                        SelectProps: { style: { display: "none" } }
                                    }}
                                    enablePagination={true}
                                    renderBottomToolbarCustomActions={() => (
                                        <CustomPagination
                                            page={pagination.pageIndex}
                                            rowsPerPage={pagination.pageSize}
                                            rowCount={rowCount}
                                            onChangePage={(page: any) =>
                                                setPagination({
                                                    ...pagination,
                                                    pageIndex: page,
                                                    pageSize: pagination.pageSize,
                                                })
                                            }
                                        />
                                    )}
                                    muiSearchTextFieldProps={{
                                        placeholder: `Search`,
                                        sx: { width: '205px', right: "50px", padding: "-10px", height: "20px", marginTop: "-10px", marginRight: "-40px" },
                                        value: searchValue,
                                        onChange: (e: any) => { setSearchValue(e.target.value); },
                                        InputProps: {
                                            startAdornment: <InputAdornment position="start"><SearchOutlined fontSize='small' htmlColor='#757575' /></InputAdornment>,
                                            endAdornment: <InputAdornment position="end" disablePointerEvents={searchValue ? false : true}>
                                                <CloseRounded fontSize='small' htmlColor={searchValue ? "#757575" : "#ebebeb"} sx={{ cursor: "pointer" }} onClick={() => setSearchValue("")} />
                                            </InputAdornment>
                                        }
                                    }}
                                />
                                :
                                null
                        }
                    </Grid>
                </Grid>

            </DialogContent>
            <DialogActions>
            </DialogActions>
        </Dialog>
    );
}
export default CountDetails;