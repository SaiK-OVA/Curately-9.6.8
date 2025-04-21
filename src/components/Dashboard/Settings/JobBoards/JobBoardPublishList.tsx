import CloseRounded from "@mui/icons-material/CloseRounded";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import SwitchLeftIcon from "@mui/icons-material/SwitchLeft";
import TableViewIcon from '@mui/icons-material/TableView';
import { debounce } from "lodash";
import ApiService from "../../../../shared/api/api";
import { DateTime } from "../../../../shared/modules/Luxon";
import { IconButton } from '../../../../shared/modules/MaterialImports/Button';
import { InputAdornment } from "../../../../shared/modules/MaterialImports/InputAdornment";
import { Stack } from "../../../../shared/modules/MaterialImports/Stack";
import { Tooltip } from '../../../../shared/modules/MaterialImports/ToolTip';
import { MaterialReactTable, type MRT_ColumnDef } from "../../../../shared/modules/MaterialReactTable";
import { trackPromise } from '../../../../shared/modules/PromiseTrackter';
import { useCallback, useEffect, useMemo, useState } from "../../../../shared/modules/React";
import { userLocalData } from "../../../../shared/services/userData";
import { confirmDialog } from "../../../shared/ConfirmDialog/ConfirmDialog";
import CustomPagination from "../../../shared/CustomPagination/CustomPagination";
import { showToaster } from '../../../shared/SnackBar/SnackBar';
import AddJobPortal from "../../Job/JobBoard/AddJobPortal";
import JobBoardList from './JobBoardList';
import { GetFormattedJobBoardData } from "./JobBoards";


const JobBoardsPublishList = () => {
    const [listPublishDetails, setListPublishDetails] = useState<any[]>([]);
    const [openJobBoardModal, SetOpenJobBoardModal] = useState(false);

    const [jobBoardId, setJobBoardId] = useState({ "jobId": "", "jobreference": "" });
    const [jobData, setJobData] = useState<any>({});
    const [jobBoardsExistingData, setJobBoardsExistingData] = useState([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [rowCount, setRowCount] = useState(0);
    const [searchValue, setSearchValue] = useState("");
    // const recrID = userLocalData.getvalue('recrId');

    const viewJobBoardModal = (jobId: any, jobReference: any) => {
        setJobBoardId({ "jobId": jobId, "jobreference": jobReference });
        SetOpenJobBoardModal(true);
    }


    const closeJobBoardModal = () => {
        SetOpenJobBoardModal(false);
    }

    const [openAddJobBoardModal, setOpenAddJobBoardModal] = useState(false);
    const openBoardModal = (JobId: any) => {
        trackPromise(
            ApiService.postWithData("admin", "getJobDetailsByJobId", { jobId: JobId }).then((res: any) => {
                if (res?.data?.Success) {
                    let data: any = res?.data?.idibu?.response?.job || {};
                    let tempJobPortalsData = res?.data?.idibu?.extrafields;
                    let tempJobData = {
                        jobTitle: data?.title || "",
                        jobId: data?.id,
                        reference: data?.reference || "",
                        startDate: data?.start_date ? DateTime.fromFormat(data?.start_date, 'yyyy-MM-dd HH:mm:ss').toFormat('MM/dd/yyyy') : "",
                        jobHours: data?.working_hours?.toLowerCase() === "full time" ? "1" : data?.working_hours?.toLowerCase() === "part time" ? "2" : "",
                        payrateMin: typeof data?.salary.minimum === "number" ? data.salary.minimum : "",
                        payrateMax: typeof data?.salary.maximum === "number" ? data.salary.maximum : "",
                        jobType: `${data?.type?.id || ""}`,
                        salaryper: data?.salary?.per || "",
                        currency: data?.salary?.currency || "",
                        sender: data?.sender || { id: "" },
                        sub_location: data?.sub_location || { id: "" },
                        location: data?.location || { code: "" },
                        sector: data?.sector || { id: "" },
                        publicDescription: data?.description || "",
                        portals: {
                            portal: GetFormattedJobBoardData(data?.portals?.portal || [])
                        }
                    }

                    if (tempJobPortalsData) {
                        tempJobPortalsData = {
                            portal: GetFormattedJobBoardData(tempJobPortalsData?.portal || [])?.map((each: any) => ({
                                ...each,
                                values: {
                                    value: GetFormattedJobBoardData(each?.values?.value || [])
                                }
                            }))
                        }
                        setJobBoardsExistingData(tempJobPortalsData?.portal || []);
                    } else {
                        setJobBoardsExistingData([]);
                    }
                    setJobData(tempJobData);
                    setOpenAddJobBoardModal(true); // Open the modal only after state is updated
                } else showToaster(res.data.Message || "An error occurred!", "error")
            })
        )

        // const jobBoardId = jobData.find((i: { jobId: string }) => { return i.jobId === Object.keys(rowSelection)[0] });
        // let jobId = jobBoardId && jobBoardId.jobId;

        // fetchJobDetails(jobId)
        //     .then(() => {
        //         setIsEditMode(false);
        //     })
        //     .catch(error => {
        //         showToaster("Unable to fetch Job Data", error)
        //     });
    };


    const PublishDetailsData = useCallback(debounce(() => {
        // http://35.155.202.216:8095/idibu/listAllPublishedJobs
        trackPromise(
            ApiService.getCall('admin', 'listAllPublishedJobs').then((response) => {
                //    console.log(response.data.idibu?.response?.jobs?.job);
                setListPublishDetails(() => GetFormattedJobBoardData(response.data.idibu?.response?.jobs?.job || []));
                setRowCount(response?.data?.idibu?.response?.total || 0)
            })
        )
    }, 400), [])



    const deletePublishJobId = (PublishJobId: string) => {

        const tempIdx = listPublishDetails.findIndex((item: { id: any }) => parseInt(item.id) == parseInt(PublishJobId));
        let tempBoardIds: any = [];

        listPublishDetails && listPublishDetails[tempIdx]?.portals?.portal?.map((item: any, idx: number) => (
            tempBoardIds.push(
                { boardid: item.id }
            )
        ));

        let delBoards = {
            "jobId": PublishJobId, // Udibu ID  
            "boardDetails": tempBoardIds,
            "recrId": userLocalData.getvalue('recrId'),
        }

        trackPromise(
            // http://35.155.202.216:8080/QADemoCurately/deletePublishJob
            // ApiService.deleteById(216, `QADemoCurately/deletePublishJobs/${PublishJobId}`, clientId)
            ApiService.postWithData('admin', `deletePostedJob`, delBoards)
                .then(
                    (response: any) => {

                        if (response.data.Success) {
                            showToaster('Publish Job has been deleted successfully.', 'success');
                            PublishDetailsData();
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
    const handleDeletePublishJob = (PublishJobId: string, PublishName: string) => {
        confirmDialog(`Are you sure you want to delete this Publish Job - ${PublishName}?`, () => {
            deletePublishJobId(PublishJobId);
            // loadPublishJobList();
        });
    };

    useEffect(() => {
        PublishDetailsData();
    }, [])


    const columns: MRT_ColumnDef<any>[] = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'Job ID',
                size: 60,
            },
            {

                accessorKey: 'title',
                header: 'Title',
            },
            {

                accessorKey: 'sector.content',
                header: 'Category',
            },
            {
                accessorKey: 'sender.email',
                header: 'Sender Email',
                muiTableHeadCellProps: {
                    align: 'left',

                },
                muiTableBodyCellProps: {
                    align: 'left',
                },
                Cell: ({ row }) => (
                    <span className="tt-lower">{row.original.sender?.email?.toLowerCase()} </span>
                )
            },
            {
                accessorKey: 'reference',
                header: 'Job Reference',
                muiTableHeadCellProps: {
                    align: 'left',
                },
                muiTableBodyCellProps: {
                    align: 'left',
                },
            },
            {
                accessorKey: 'sub_location.content',
                header: 'Sub Location',
                muiTableHeadCellProps: {
                    align: 'left',
                },
                muiTableBodyCellProps: {
                    align: 'left',
                },
                Cell: ({ row }) => (
                    row.original.sub_location?.content && <span className="tt-lower">{row.original.sub_location.content} </span>
                )
            },
            {
                accessorKey: 'working_hours',
                header: 'Working Hours',
                muiTableHeadCellProps: {
                    align: 'left',
                },
                muiTableBodyCellProps: {
                    align: 'left',
                },

            },
            {
                accessorKey: "Actions",
                header: "Actions",
                Cell: ({ row }) => (
                    <Stack key={row.original.id}>
                        <Stack direction={"row"}>

                            <Tooltip title="Job Board List" placement="top" color="primary">
                                <IconButton onClick={() => viewJobBoardModal(row.original.id, row.original.reference)}>
                                    <TableViewIcon />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Edit" placement="top" color="primary">
                                <IconButton onClick={() => openBoardModal(row.original.id)}>
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Delete" placement="top" color="primary">
                                <IconButton onClick={() => handleDeletePublishJob(row.original.id, row.original.title)}>
                                    <DeleteOutlineIcon />
                                </IconButton>
                            </Tooltip>
                        </Stack>

                    </Stack>
                )
            },
        ], []


    );

    const filteredData = useMemo(() => {
        const records = listPublishDetails.filter((each: any) => {
            let search = searchValue?.toLowerCase()?.trim() || "";
            return each.title?.toLowerCase().includes(search);
        });
        setRowCount(records.length || 0)
        return records;
    }, [listPublishDetails, searchValue]);

    return (
        <div>
            <div className="MRTableCustom pl-0">

                <MaterialReactTable
                    columns={columns}

                    data={filteredData}
                    enablePinning
                    initialState={{
                        columnPinning: { left: ["mrt-row-select", "title"] },
                        density: "compact",
                        showGlobalFilter: true
                    }}
                    state={{
                        columnPinning: { left: ["mrt-row-select", "title"] },
                        pagination
                    }}
                    enableDensityToggle={false}
                    enableFullScreenToggle={false}

                    enableGlobalFilterModes
                    columnResizeMode="onChange"
                    getRowId={row => row.id}

                    enableStickyHeader
                    icons={{
                        ArrowDownwardIcon: (props: any) => (
                            <SwitchLeftIcon {...props} />
                        ),
                    }}
                    muiPaginationProps={{
                        rowsPerPageOptions: [10],
                        showFirstButton: false,
                        showLastButton: false,
                        SelectProps: {
                            style: { display: 'none' }, // Hide the rows per page dropdown
                        },
                    }}
                    enablePagination
                    renderBottomToolbarCustomActions={() => (
                        <CustomPagination
                            page={pagination.pageIndex}
                            rowsPerPage={pagination.pageSize}
                            rowCount={rowCount}
                            onChangePage={(page: any) => setPagination({ ...pagination, pageIndex: page })}
                        />
                    )}
                    muiSearchTextFieldProps={{
                        placeholder: `Search`,
                        value: searchValue,
                        onChange: (e: any) => {
                            setSearchValue(e.target.value);
                            setPagination({ ...pagination, pageIndex: 0 })
                        },
                        InputProps: {
                            startAdornment: <InputAdornment position="start"><SearchOutlined fontSize='small' htmlColor='#757575' /></InputAdornment>,
                            endAdornment: <InputAdornment position="end" disablePointerEvents={searchValue ? false : true}>
                                <CloseRounded fontSize='small' htmlColor={searchValue ? "#757575" : "#ebebeb"} sx={{ cursor: "pointer" }} onClick={() => {
                                    setSearchValue("");
                                    setPagination({ ...pagination, pageIndex: 0 })
                                }} />
                            </InputAdornment>
                        }
                    }}
                />
            </div>


            {openJobBoardModal ? (
                <JobBoardList
                    open={openJobBoardModal}
                    closePopup={closeJobBoardModal}
                    boardData={jobBoardId}
                />
            ) : null}


            {(openAddJobBoardModal) ?
                <AddJobPortal
                    open={openAddJobBoardModal}
                    closePopup={() => {
                        setOpenAddJobBoardModal(false);
                        setJobData({});
                        setJobBoardsExistingData([]);
                    }}
                    add={false}
                    jobData={{ ...jobData, jobBoardsExistingData }}
                />
                :
                null
            }
        </div>
    )
}

export default JobBoardsPublishList;