import { React, useEffect, useMemo, useState } from "../../../../shared/modules/React";
import { Button } from "../../../../shared/modules/MaterialImports/Button";
import { Grid } from "../../../../shared/modules/MaterialImports/Grid";
import { Stack } from "../../../../shared/modules/MaterialImports/Stack";
import { Typography } from "../../../../shared/modules/MaterialImports/Typography";
import { MaterialReactTable, MRT_ColumnDef } from "../../../../shared/modules/MaterialReactTable";
import CustomPagination from "../../../shared/CustomPagination/CustomPagination";
import SwitchLeftIcon from "@mui/icons-material/SwitchLeft";
import { TextField } from "../../../../shared/modules/MaterialImports/TextField";
import { Checkbox } from "../../../../shared/modules/MaterialImports/FormElements";
import { InputAdornment, showToaster } from '../../../../shared/modules/commonImports';
import { DateTime } from '../../../../shared/modules/Luxon';
import { DatePicker, LocalizationProvider, AdapterLuxon } from '../../../../shared/modules/MaterialImports/DatePicker';
import { Box } from "../../../../shared/modules/MaterialImports/Box";
import { trackPromise } from '../../../../shared/modules/PromiseTrackter';
// import { showToaster } from '../../../../shared/modules/commonImports';
import { userLocalData } from '../../../../shared/services/userData';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { Tooltip } from '../../../../shared/modules/MaterialImports/ToolTip';
import {
    type MRT_ColumnFiltersState,
    //type MRT_Virtualizer,
} from 'material-react-table';
import { CloseRounded, ErrorOutlineOutlined, SearchOutlined } from '@mui/icons-material';
import ApiService from '../../../../shared/api/api';
import { FormatMillisecondsToCustomDate } from '../../../../shared/utils/FormatMillisecondsToCustomDate';
//import ExpandTearSheet from './ExpandTearSheet';
import ExpandHotSheet from './ExpandHotSheet';
import "./HotSheet.scss";
import MissingFields from "../DivaJobs/MissingFields/MissingFields";
import { OpenErrorModal } from "../../../shared/ErrorModal/ErrorModal";

const HotSheet = () => {
    const [startDate, setStartDate] = useState<any>();
    const [endDate, setEndDate] = useState<any>();
    const [searched, setSearched] = useState<boolean>(false);

    const [searchHotSheetName, setSearcheHotSheetName] = useState<any>('');
    const [JobDivaHotSheetList, setJobDivaHotSheetList] = useState<any[] | never[]>([]);

    const [searchValue, setSearchValue] = useState("");
    const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);
    const [rowSelection, setRowSelection] = useState({});

    const [rowCount, setRowCount] = useState(0);
    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
        [],
    );
    const [globalFilter, setGlobalFilter] = useState<string>();

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 25,
    });

    const [openMissingFields, setOpenMissingFields] = useState(false);
    const [pushCuratelyHotListData, setPushCuratelyHotListData] = useState<any>({});

    useEffect(() => {
        getOpenHotSheetList()
    }, []);

    const getOpenHotSheetList = () => {
        trackPromise(
            ApiService.getCall("ats", `jobDiva/getHotLists/${userLocalData.getvalue("clientId")}`).then((res: any) => {
                let hotSheetList: any = res?.data?.data || []
                if (res?.data?.Success && !!hotSheetList?.length) {
                    hotSheetList = hotSheetList.sort((current: any, next: any) => {
                        let currentDate = new Date(current.DATECREATED);
                        let nextDate = new Date(next.DATECREATED);

                        return nextDate.getTime() - currentDate.getTime();
                    });
                    setJobDivaHotSheetList([...hotSheetList]);
                    setRowCount(hotSheetList?.length || 0);
                } else {
                    showToaster((res.data.Message) ? res.data.Message : "An error occured while getting Hot sheet List.", 'error')
                }
            })
        )
    }

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

    const columns: MRT_ColumnDef<any>[] = [
        {
            accessorKey: "HOTLIST_NAME",
            header: "Talent Pool Name",
            Cell: ({ row }: any) => getSlicedCell(row.original.HOTLIST_NAME),
        },
        {
            accessorKey: "DESCRIPTION",
            header: "Description",
            Cell: ({ row }: any) => getSlicedCell(row.original.DESCRIPTION),
        },
        {
            accessorKey: "JOBID",
            header: "Link to Job",
            Cell: ({ row }: any) => getSlicedCell(row.original.JOBID + ' - ' + row.original.LINK_TO_JOB),
        },
        {
            accessorKey: "CREATEDBY",
            header: "Created By",
            size: 80,
        },
        {
            accessorKey: "DATECREATED",
            header: "Created Date",
            Cell: ({ row }: any) => (
                FormatMillisecondsToCustomDate.formatMillisecondsToCustomDate(row.original.DATECREATED)
            ),
            size: 80,
        },
        {
            accessorKey: "curatelyId",
            header: "Curately",
            Cell: ({ row }: any) => (
                (row.original.curatelyId) ? <Tooltip title="Curately" >
                    <span className="ml-4">
                        {(row.original.curatelyId) ? <CheckOutlinedIcon fontSize="small" color="success" /> : ""}
                    </span>
                </Tooltip> : ""
            ),
            size: 80,
        },
        {
            accessorKey: "voiceAiEnabled",
            header: "Voice AI",
            size: 80,
            Cell: ({ row }: any) => (
                (row.original.curatelyId) ?
                    <>
                        {row?.original?.voiceAiEnabled ?
                            <span className="ml-4" > <CheckOutlinedIcon color="success" /> </span>
                            :
                            <Tooltip title="Click here to View Error Message"><span className="ml-4 errorMsg" style={{ cursor: 'pointer' }} onClick={() => {
                                OpenErrorModal({ errorMessage: row?.original?.voiceAiReason, title: "VoiceAI - Error Message" })
                            }} > <ErrorOutlineOutlined color="error" />  </span></Tooltip>
                        }
                    </>
                    : null
            )
        }
    ];




    const flatData = useMemo(
        () => {
            // return JobDivaHotSheetList?.filter((page) => {
            //     return page.HOTLIST_NAME.toLowerCase().includes(searchValue.toLowerCase() || "");
            // }) ?? [];

            const records = JobDivaHotSheetList?.filter((page) => {
                return page.HOTLIST_NAME.toLowerCase().includes(searchValue.toLowerCase() || "");
            })
            setRowCount(records.length);
            return records.slice((pagination.pageIndex * pagination.pageSize), ((pagination.pageIndex + 1) * pagination.pageSize));
        },
        [searchValue, JobDivaHotSheetList, pagination]);


    // const getHotSheetList = () => {
    //     if (searchHotSheetName || (startDate && endDate && (startDate.startOf("day") <= endDate.startOf("day")))) {

    //         let data = {
    //             "entityName": "HotSheet",
    //             "clientId": userLocalData.getvalue('clientId'),
    //             "HotSheet":
    //             {
    //                 "name": searchHotSheetName,
    //                 "dateAdded": startDate ? startDate.toFormat('yyyyMMdd') : '',
    //                 "dateLastModified": endDate ? endDate.toFormat('yyyyMMdd') : '',
    //             },
    //             "count": pagination.pageSize,
    //             "sort": "-dateLastModified",
    //             "start": pagination.pageIndex * pagination.pageSize,
    //             "fields": "id,name,candidates,jobOrders,dateLastModified"
    //         }

    //         trackPromise(
    //             ApiService.postWithData('ats', 'bullhorn/search', data).then((response: any) => {

    //                 setSearched(true);
    //                 // console.log(response.data.Status);
    //                 if (response.data?.Success && response.data?.Status === 200) {

    //                     setRowCount(Number(response.data?.data?.total ? response.data?.data?.total : 0));
    //                     setJobDivaHotSheetList(response.data.data.data);
    //                     //console.log(response.data.data)
    //                 } else {
    //                     showToaster((response.data.Message) ? response.data.Message : "An error occured while getting this Talent Pool Name.", 'error')
    //                 }
    //             })
    //         );

    //     } else if (!searchHotSheetName) {
    //         showToaster('Enter Valid Talent Name.', 'error');
    //     }
    //     else if (!startDate) {
    //         showToaster('Enter Valid Start Date.', 'error');
    //     } else if (!endDate) {
    //         showToaster('Enter Valid End Date.', 'error');
    //     } else if (startDate.startOf("day") > endDate.startOf("day")) {
    //         showToaster('Start Date should be less than End Date.', 'error');
    //     }
    // }

    const hotSheetPushToCurately = (missingFields?: any) => {

        const selectedIds = Object.keys(rowSelection);
        let payLoad = {
            "atsName": "JobDiva",
            "clientId": userLocalData.getvalue("clientId"),
            "recruiterId": userLocalData.getvalue("recrId"),
            "moduleName": "Pool",
            "atsValues": selectedIds,
            "data": JobDivaHotSheetList.filter((each) => {
                return selectedIds.includes(each.HOTLIST_ID.toString());
            })
        }

        if (missingFields) {
            payLoad = Object.assign({}, payLoad, { ...payLoad, missingFields });
        }

        trackPromise(
            ApiService.postWithData('ats', 'ats/consume', payLoad).then((response: any) => {
                if (response.data?.Success && response.data?.Status === 200) {
                    showToaster(response.data.Message, 'success');
                    setOpenMissingFields(false);
                    setPushCuratelyHotListData({});
                    setRowSelection({});
                    setIsSelectAllChecked(false);
                    getOpenHotSheetList();
                } else if (response?.data?.Error && response?.data?.Status === 400 && response?.data?.data?.missingFields && !!Object.keys(response?.data?.data?.missingFields)?.length) {
                    setOpenMissingFields(true);
                    setPushCuratelyHotListData(response.data.data)
                } else {
                    showToaster((response.data.Message) ? response.data.Message : "An error occured while getting this Push to Curately.", 'error')
                }
            })
        );
    }


    // useEffect(() => {
    //     if (searchHotSheetName || (startDate && endDate && (startDate.startOf("day") <= endDate.startOf("day")))) {
    //         getHotSheetList();
    //     }
    // }, [pagination.pageIndex, pagination.pageSize])

    const handleSelectAll = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsSelectAllChecked(event.target.checked);
        if (event.target.checked) {
            let rowData: any = {};
            let tempData: any = JobDivaHotSheetList;
            for (let index = 0; index < tempData.length; index++) {
                if (["", null, undefined].includes(tempData[index]?.curatelyId)) {
                    rowData[tempData[index].HOTLIST_ID] = true;
                }
            }
            setRowSelection(rowData);
        } else {
            setRowSelection({});
        }
    }

    return (
        <div className="" id="HotSheet">
            <div className="">
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    className="customCard px-4 py-2 mb-2"
                    sx={{ minHeight: "auto !important" }}
                >
                    <Stack direction="row" spacing={3}>
                        <Typography variant="h6" className="header, pt-1">
                            JobDiva - Hot List
                        </Typography>
                    </Stack>
                </Grid>

                {/* <Grid
                    className="my-3 customCard "
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                >
                    <Stack direction="row" spacing={3} style={{ paddingRight: '22px' }}>
                        <TextField
                            fullWidth
                            label="Talent Pool Name"
                            size="small"
                            placeholder="Search by Talent Pool Name"
                            value={searchHotSheetName}
                            onChange={(e) => setSearcheHotSheetName(e.target.value)}
                        />
                    </Stack>

                    <Stack direction="row" spacing={3} >
                        <LocalizationProvider dateAdapter={AdapterLuxon}>
                            <Grid
                                container
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                            >
                                <DatePicker
                                    label='Start Date'
                                    value={startDate}
                                    onChange={(newValue) => {
                                        if (newValue) {
                                            setStartDate(newValue);
                                        } else {
                                            setStartDate('');
                                        }
                                    }}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            fullWidth: false,
                                            InputProps: {
                                                style: {
                                                    textAlign: 'center',
                                                },
                                            },

                                        },
                                    }}
                                    maxDate={endDate}
                                />
                                <Box sx={{ mx: 2 }}> to </Box>
                                <DatePicker
                                    label='End Date'
                                    value={endDate}
                                    onChange={(newValue) => {
                                        if (newValue) {
                                            setEndDate(newValue);
                                        } else {
                                            setEndDate('');
                                        }
                                    }}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            fullWidth: false,
                                            InputProps: {
                                                style: {
                                                    textAlign: 'center',
                                                },
                                            },

                                        },
                                    }}
                                    maxDate={DateTime.now()}
                                />
                            </Grid>
                        </LocalizationProvider>

                    </Stack>
                    <Button
                        variant="contained"
                        color="primary"
                        className="ml-4"
                        fullWidth
                        onClick={() => {
                            setPagination({
                                pageIndex: 0,
                                pageSize: 10,
                            })
                            //getHotSheetList();
                        }}

                    >
                        Search
                    </Button>
                </Grid> */}

                <div className="p-4 customCard CardView">

                    <div className="MRTableCustom pl-0 ">

                        <Grid container className="actionItems" width={"auto"}>
                            <Checkbox
                                className="select-all-checkbox"
                                disableRipple
                                color="default"
                                checked={isSelectAllChecked}
                                onChange={handleSelectAll}
                            />

                            <Button
                                variant="outlined"
                                color="secondary"
                                className='mr-2 ml-2'
                                disabled={Object.keys(rowSelection).length === 1 ? false : true}
                                onClick={() => hotSheetPushToCurately()}
                            >
                                Push to VoiceAI
                            </Button>

                        </Grid>
                        <MaterialReactTable
                            columns={columns as MRT_ColumnDef<any, any>[]}
                            enableRowSelection={(row: any) => ["", null, undefined].includes(row?.original?.curatelyId)}
                            data={flatData}
                            enablePinning
                            muiSearchTextFieldProps={{
                                placeholder: `Search`,
                                sx: { width: '205px', right: "50px", padding: "-10px", height: "20px", marginTop: "-10px", marginRight: "-40px" },
                                value: searchValue,
                                onChange: (e: any) => {
                                    setPagination({ ...pagination, pageIndex: 0 });
                                    setSearchValue(e.target.value)
                                },
                                InputProps: {
                                    startAdornment: <InputAdornment position="start"><SearchOutlined fontSize='small' htmlColor='#757575' /></InputAdornment>,
                                    endAdornment: <InputAdornment position="end" disablePointerEvents={searchValue ? false : true}>
                                        <CloseRounded fontSize='small' htmlColor={searchValue ? "#757575" : "#ebebeb"} sx={{ cursor: "pointer" }} onClick={() => setSearchValue("")} />
                                    </InputAdornment>
                                }
                            }}
                            initialState={{
                                density: 'compact',
                                showGlobalFilter: true,
                            }}
                            onColumnFiltersChange={setColumnFilters}
                            onGlobalFilterChange={setGlobalFilter}
                            // onSortingChange={setSorting}
                            enableDensityToggle={false}
                            enableFullScreenToggle={false}
                            // manualPagination
                            // manualSorting
                            // enableGlobalFilterModes
                            columnResizeMode="onChange"
                            getRowId={(row) => row.HOTLIST_ID}
                            onPaginationChange={setPagination}
                            state={{
                                pagination,
                                columnFilters,
                                globalFilter,
                                //isLoading,
                                //   showAlertBanner: isError,
                                //   showProgressBars: isFetching,
                                //sorting,
                                rowSelection,
                            }}

                            onRowSelectionChange={setRowSelection}
                            enableStickyHeader
                            enablePagination={false}
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
                                        //   setRowSelection({ ...rowSelection, [prop.row.id]: e.target.checked });
                                        //   console.log(e.target.checked);
                                    }
                                }
                            })}
                            renderBottomToolbarCustomActions={() => (
                                <CustomPagination
                                    page={pagination.pageIndex}
                                    rowsPerPage={pagination.pageSize}
                                    rowCount={rowCount}
                                    onChangePage={(page: any) => {
                                        setRowSelection({});
                                        setIsSelectAllChecked(false);
                                        setPagination({
                                            ...pagination,
                                            pageIndex: page
                                        })
                                    }
                                    }
                                />
                            )}
                            icons={{
                                ArrowDownwardIcon: (props: any) => (
                                    <SwitchLeftIcon {...props} />
                                ),
                            }}
                        />
                    </div>

                </div>
            </div>
            {openMissingFields && <MissingFields
                open={openMissingFields}
                closePopup={() => {
                    setOpenMissingFields(false);
                    setPushCuratelyHotListData({});
                }}
                passedData={pushCuratelyHotListData?.missingFields}
                handleUpdateToJobDiva={hotSheetPushToCurately}
            />}
        </div>
    );
};

export default HotSheet;
