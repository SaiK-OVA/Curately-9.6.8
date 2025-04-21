import { useEffect, useMemo, useState, useCallback } from "../../../../shared/modules/React";
// import { userLocalData } from "../../../../shared/services/userData";
import { Grid } from '../../../../shared/modules/MaterialImports/Grid2';
import { MaterialReactTable, type MRT_ColumnDef } from "../../../../shared/modules/MaterialReactTable";
import { trackPromise } from '../../../../shared/modules/PromiseTrackter';
import SwitchLeftIcon from "@mui/icons-material/SwitchLeft";
import ApiService from "../../../../shared/api/api";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import CloseIcon from '@mui/icons-material/Close';
import { Divider } from '../../../../shared/modules/MaterialImports/Divider';
import { Loader } from "../../../shared/Loader/Loader";
import { Dialog, DialogTitle, DialogContent } from '../../../../shared/modules/MaterialImports/Dialog';
import { debounce } from "lodash";
import { GetFormattedJobBoardData } from "./JobBoards";
import CustomPagination from "../../../shared/CustomPagination/CustomPagination";
import { InputAdornment } from "../../../../shared/modules/MaterialImports/InputAdornment";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import CloseRounded from "@mui/icons-material/CloseRounded";



const JobBoardsApplicationDetails = (
    { open, closePopup }: {
        open: boolean;
        closePopup: () => void;
    }
) => {
    const [listApplicationDetails, setListApplicantDetails] = useState<any[]>([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [rowCount, setRowCount] = useState(0);
    const [searchValue, setSearchValue] = useState("");
    // const recrID = userLocalData.getvalue('recrId');

    const ApplicantDetailsData = useCallback(debounce(() => {
        // http://35.155.202.216:8095/idibu/listAllSubscribedJobBoards
        trackPromise(
            ApiService.getCall('admin', 'listAllApplicants').then((response) => {
                //  console.log(response.data.idibu.response.applicants.applicant);
                setListApplicantDetails(() => GetFormattedJobBoardData(response.data.idibu.response.applicants.applicant));
                setRowCount(response?.data?.idibu?.response?.total || 0)
            })
        )
    }, 600), [])

    useEffect(() => {
        ApplicantDetailsData();
        return () => {
            ApplicantDetailsData.cancel();
        };
    }, [ApplicantDetailsData])


    const columns: MRT_ColumnDef<any>[] = useMemo(
        () => [
            {
                accessorKey: 'job.id',
                header: 'Job ID',
                size: 60,
            },
            {

                accessorKey: 'name',
                header: 'Name',
            },
            {
                accessorKey: 'portal-name',
                header: 'Portal Name',
                muiTableHeadCellProps: {
                    align: 'left',

                },
                muiTableBodyCellProps: {
                    align: 'left',
                },
            },
            {
                accessorKey: 'job.reference',
                header: 'Job Reference',
                muiTableHeadCellProps: {
                    align: 'left',
                },
                muiTableBodyCellProps: {
                    align: 'left',
                },
            },
            {
                accessorKey: 'email',
                header: 'E-Mail',
                muiTableHeadCellProps: {
                    align: 'left',
                },
                muiTableBodyCellProps: {
                    align: 'left',
                },
                Cell: ({ row }) => (
                    row?.original?.email && <span className="tt-lower">{row?.original?.email?.toLowerCase()} </span>
                )
            },
            {
                accessorKey: 'link',
                header: 'Files',
                muiTableHeadCellProps: {
                    align: 'left',
                },
                muiTableBodyCellProps: {
                    align: 'left',
                },
                Cell: ({ row }) => (
                    <a href={row?.original?.files?.file?.link}><span className="tt-lower"><FileCopyIcon /> </span></a>
                )
            },
            {
                accessorKey: 'status',
                header: 'Status',
                muiTableHeadCellProps: {
                    align: 'left',
                },
                muiTableBodyCellProps: {
                    align: 'left',
                },
            },
        ], []


    );

    const filteredData = useMemo(() => {
        const records = listApplicationDetails.filter((each: any) => {
            let search = searchValue?.toLowerCase()?.trim() || "";
            return each.name?.toLowerCase().includes(search) || each["portal-name"]?.toLowerCase().includes(search)
        });
        setRowCount(records.length || 0)
        return records;
    }, [listApplicationDetails, searchValue]);

    return (
        <Dialog
            maxWidth={'xl'}
            fullWidth={true} open={open} id='AddApplicantJobBoardModal'
        >      <Loader />
            <DialogTitle
                className='py-2'
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <span className='addHeader'>
                        Job Board - Applicant Details
                    </span>
                    <div>
                        <Grid
                            container
                            direction="row"
                            justifyContent="end"
                            alignItems="center"
                        >

                            <CloseIcon onClick={() => closePopup()} />
                        </Grid>
                    </div>
                </Grid>
            </DialogTitle>
            <Divider />
            <DialogContent className='py-0 pt-0'>
                <div className="MRTableCustom pl-0">

                    <MaterialReactTable
                        columns={columns}

                        data={filteredData}
                        enablePinning
                        initialState={{
                            columnPinning: { left: ["mrt-row-select"] },
                            density: "compact",
                            showGlobalFilter: true
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
                        state={{ pagination }}
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

            </DialogContent>
        </Dialog >
    )
}

export default JobBoardsApplicationDetails;