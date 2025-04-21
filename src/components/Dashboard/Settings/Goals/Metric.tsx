import React, { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "../../../../shared/modules/MaterialImports/Dialog";
import { Button, } from "../../../../shared/modules/MaterialImports/Button";
import ApiService from "../../../../shared/api/api";
import { trackPromise } from "react-promise-tracker";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import CustomPagination from "../../../shared/CustomPagination/CustomPagination";
import SwitchLeftIcon from "@mui/icons-material/SwitchLeft";

import { InputAdornment } from "../../../../shared/modules/MaterialImports/InputAdornment";
import { CloseRounded, SearchOutlined } from "@mui/icons-material";
import { userLocalData } from "../../../../shared/services/userData";
import { MenuItem } from "../../../../shared/modules/MaterialImports/Menu";
import { TextField } from "../../../../shared/modules/MaterialImports/TextField";
import { Grid, showToaster } from "../../../../shared/modules/commonImports";
import { Stack } from "../../../../shared/modules/MaterialImports/Stack";
import { Typography } from "../../../../shared/modules/MaterialImports/Typography";

import './Metric.scss';

interface MetricDialogProps {
    // open: boolean;
    // handleClose: (addOrUpdate: boolean) => void;
    // goalsMetricsList: { metricId: number; metric: string }[]
}
const Metric: React.FC<MetricDialogProps> = ({
    // open,
    // handleClose,
    // goalsMetricsList
}) => {
    const [metricsGoalsList, setMetricsGoalsList] = useState<any[]>([])
    // const [metricData, setMetricData] = useState<any>([]);
    const [metricGoalData, setMetricGoalData] = useState<any>([]);
    const [goalShortList, SetGoalShortList] = useState<any[] | never[]>([])
    const [searchValue, setSearchValue] = useState("");
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 50,
    });
    const [globalFilter, setGlobalFilter] = useState('');
    const paginatedData = useMemo(() => {
        if (searchValue) {
            const filteredData = metricsGoalsList.filter((each: any) => {
                return each.metric.toLowerCase().includes(searchValue.toLowerCase())
            });
            return filteredData;
        } else return metricsGoalsList
    }, [metricsGoalsList, searchValue]);

    const rowCount = useMemo(() => paginatedData.length, [paginatedData])

    const getGoalShortList = () => {
        let clientId = userLocalData.getvalue('clientId');
        trackPromise(
            ApiService.getCall("admin", `getshortListBarStages/${clientId}`)
                .then((response) => {
                    console.log(response?.data?.shortlistBarStages)
                    if (response?.data?.shortlistBarStages) {
                        SetGoalShortList(response.data.shortlistBarStages);
                    } else {
                        SetGoalShortList([]);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching metric list", error);
                    SetGoalShortList([]);
                })
        );
    };

    const fetchGoalMerticList = () => {
        trackPromise(
            ApiService.getCall("admin", "getGoalMetrics/1")
                .then((response) => {
                    if (response?.data?.Success) {
                        let tempGoalMetrics = response?.data?.goalMetrics || [];

                        setMetricsGoalsList([...tempGoalMetrics]);
                        fetchGoalMetricStatusMapping(tempGoalMetrics)
                    }
                })
                .catch((error) => {
                    console.error("Error fetching candidate status list", error);
                })
        )
    };

    const fetchGoalMetricStatusMapping = (goalMetrics: any[]) => {
        trackPromise(
            ApiService.postWithData('admin', 'getGoalMetricStatusMapping', {
                clientId: userLocalData.getvalue('clientId')
            })
                .then((response) => {
                    if (response?.data?.Success) {
                        setMetricGoalData(response?.data?.goalMetricStatusMappings || []);
                        handleMetricAndMapData(goalMetrics, response?.data?.goalMetricStatusMappings || [])
                        // fetchGoalMerticList(response?.data?.goalMetricStatusMappings || [])
                        console.log(response?.data?.goalMetricStatusMappings);
                    } else {
                        // fetchGoalMerticList([])
                    }
                }).catch((error) => {
                    console.log("Error fetching metric status mapping list", error)
                    // fetchGoalMerticList('METRIC_MAPPING')
                })
        )
    };

    const handleMetricAndMapData = (goalMetrics: any[], mapMetricsData: any[]) => {
        if (mapMetricsData.length > 0) {
            let tempGoalMetrics: { metricId: number; metric: string, statusId?: string | number }[] = goalMetrics || [];
            tempGoalMetrics = tempGoalMetrics.map((goal: any) => ({
                ...goal, statusId: !!mapMetricsData?.length ? mapMetricsData.find((each: any) => each.metricId === goal.metricId)?.statusId || '' : ''
            }))
            let newRowSelection = tempGoalMetrics.reduce((
                acc: { [key: string]: boolean },
                cur: { metricId: number; metric: string, statusId?: string | number }
            ) => {
                if (cur?.statusId) acc[cur.metricId] = true;
                return acc;
            }, {});
            setRowSelection({ ...newRowSelection });
            setMetricsGoalsList([...tempGoalMetrics]);
        } else {
            setMetricsGoalsList((prev) => prev.map((each) => ({
                ...each, statusId: 0
            })))
        }

    }


    useEffect(() => {
        getGoalShortList();
        fetchGoalMerticList()
        // fetchGoalMetricStatusMapping();
    }, []);

    const handleGoalShortListChange = (e: any, metricId: number) => {
        const value = e.target.value;
        let tempGoalMetrics = metricsGoalsList || [];
        tempGoalMetrics = tempGoalMetrics.map((goal: any) => (
            (goal.metricId === metricId) ?
                { ...goal, statusId: value }
                : goal
        ));
        setMetricsGoalsList([...tempGoalMetrics]);
    };

    const handleSaveChanges = async () => {
        const selectedRecrIds = Object.entries(rowSelection).filter(([_key, value]) => value).map(([key]) => parseInt(key))
        // const goalMetricStatusMappings = metricData
        //     .filter((metric: any) => selectedRecrIds.includes(metric.metricId))
        //     .map((metric: any) => ({
        // metricId: metric.metricId,
        // statusId: metric.statusId ?? null,
        //     }));
        // const isAllMappingsValid = goalMetricStatusMappings.every((each: any) => !["", "0", null, undefined].includes(each.statusId))
        // if (!isAllMappingsValid) {
        //     showToaster("Please select metric status", "error");
        //     return;
        // }
        const goalMetricStatusMappings = metricsGoalsList.map((metric) => ({
            metricId: metric.metricId,
            statusId: metric?.statusId ? metric.statusId : null,
        }))
        const requestBody = {
            clientId: userLocalData.getvalue("clientId"),
            recrId: userLocalData.getvalue("recrId"),
            goalMetricStatusMappings,
        };
        try {
            trackPromise(
                ApiService.postWithData("admin", "saveGoalMetricStatusMapping", requestBody).then((response) => {
                    if (response.data.Success) {
                        showToaster("Goal metric status mapping saved successfully", "success");
                        setRowSelection({});
                        setSearchValue("");
                        fetchGoalMetricStatusMapping(metricsGoalsList);
                        // handleClose(true);
                    } else {
                        showToaster(response.data.Message || "Failed to update Goal metric status mapping", "error");
                    }
                })
            );
        } catch (error) {
            console.error("Error updating recruiter credits:", error);
            showToaster("Something went wrong. Please try again.", "error");
        }
    };

    const columns: MRT_ColumnDef<any>[] = useMemo(() => [
        {
            accessorKey: 'metric',
            header: 'Metric Name',
            Cell: ({ row }) => (
                <span>
                    {row.original.metric}
                </span>
            ),
        },
        {
            accessorKey: 'statusId',
            header: 'Metric Status',
            Cell: ({ row }) => {
                const isRowSelected = row.getIsSelected();
                return <TextField
                    sx={{ width: "220px" }}
                    fullWidth
                    className="selHeight"
                    name={`metric-${row.original.metricId}`}
                    id={`metric-${row.original.metricId}`}
                    size="small"
                    select
                    defaultValue={row.original.statusId ? row.original.statusId : "0"}
                    value={row.original.statusId ? row.original.statusId : "0"}
                    placeholder="Goal Status List"
                    // slotProps={{
                    //     input: { readOnly: !isRowSelected }
                    // }}
                    onChange={e => handleGoalShortListChange(e, row.original.metricId)}
                >
                    <MenuItem value="0" >None </MenuItem>
                    {goalShortList.length > 0 ? (
                        goalShortList.map((item, index) => (
                            <MenuItem key={`${item.statusId}-${index}-${row.original.metricId}`} value={item.statusId}>
                                {item.label}
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem disabled>No Options Available</MenuItem>
                    )}
                </TextField>
            }
        },
    ], [metricsGoalsList, goalShortList]);

    return (
        <div id="MetricList" className="pt-2 px-1 ">
            {/* <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="md" id="MetricList" >

                <DialogTitle> */}
            <Grid
                container
                direction="row"
                className="customCard  px-2 py-1"
                justifyContent="space-between"
                alignItems="center"
                display="flex"
                sx={{ minHeight: "auto !important" }}
            >
                <Typography variant="h6" className="headerFormContainer">
                    Metrics Mapping
                </Typography>
                <div>
                    <Grid
                        container
                        direction="row"
                        justifyContent="end"
                        alignItems="center"
                    >

                        {/* <Button variant="outlined"
                            type='button'
                            color="secondary"
                            className='mr-2'
                        // onClick={() => handleClose(false)}
                        >Cancel</Button> */}
                        <Button variant="contained"
                            type='button'
                            color="primary"
                            onClick={() => handleSaveChanges()}
                        >
                            save
                        </Button>
                    </Grid>
                </div>
            </Grid>
            {/* </DialogTitle> */}

            {/* <DialogContent> */}
            <div className="MRTableCustom pl-0 mt-0">
                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} spacing={2} className="headerFormContainer">
                    <Stack direction={"row"} alignItems={"center"} spacing={1} justifyContent={"flex-end"} >
                        <TextField
                            placeholder={`Search by metric name`}
                            size={"small"}
                            id="Search"
                            name={"Search"}
                            className={"matricSearchName"}
                            value={searchValue}
                            onChange={(e: any) => { setSearchValue(e.target.value) }}
                            slotProps={{
                                input: {
                                    startAdornment: <SearchOutlined fontSize='small' htmlColor='#757575' />,
                                    endAdornment: <InputAdornment position="end" disablePointerEvents={searchValue ? false : true}>
                                        <CloseRounded fontSize='small' htmlColor={searchValue ? "#757575" : "#ebebeb"} sx={{ cursor: "pointer" }} onClick={() => setSearchValue("")} />
                                    </InputAdornment>
                                }
                            }}
                        />
                    </Stack>
                </Stack>
                <MaterialReactTable
                    columns={columns}
                    data={paginatedData}
                    enableTopToolbar={false}
                    enableBottomToolbar={false}
                    enableStickyHeader
                    enableRowSelection={false}
                    initialState={{
                        columnPinning: { left: ['metric'] },
                        density: "compact",
                        showGlobalFilter: true
                    }}
                    enableDensityToggle={false}
                    enableFullScreenToggle={false}
                    enableGlobalFilterModes
                    columnResizeMode="onChange"
                    enablePagination={true}
                    state={{
                        pagination,
                        globalFilter,
                        // rowSelection,
                    }}
                    muiPaginationProps={{
                        showFirstButton: false,
                        showLastButton: false,
                        SelectProps: { style: { display: "none" } },
                    }}

                    icons={{
                        ArrowDownwardIcon: (props: any) => <SwitchLeftIcon {...props} />,
                    }}

                    // renderBottomToolbarCustomActions={() => (
                    //     <CustomPagination
                    //         page={pagination.pageIndex}
                    //         rowsPerPage={pagination.pageSize}
                    //         rowCount={rowCount}
                    //         onChangePage={(page: any) =>
                    //             setPagination({
                    //                 ...pagination,
                    //                 pageIndex: page,
                    //                 pageSize: pagination.pageSize,
                    //             })
                    //         }
                    //     />
                    // )}
                    enableSelectAll
                    getRowId={(row) => row.metricId}
                    onRowSelectionChange={setRowSelection}
                />

            </div>
            {/* </DialogContent>
            </Dialog> */}
        </div>
    );
};

export default Metric;
