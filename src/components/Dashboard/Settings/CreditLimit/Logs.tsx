import { useEffect, useState } from "../../../../shared/modules/React";
import { trackPromise } from "react-promise-tracker";
import { userLocalData } from "../../../../shared/services/userData";
import { showToaster } from "../../../shared/SnackBar/SnackBar";
import ApiService from "../../../../shared/api/api";
import { TablePagination, Box, List, ListItem, Typography, ListItemText, Stack, Button, Divider } from "@mui/material";
import { DateTime } from '../../../../shared/modules/Luxon';
import { DatePicker, LocalizationProvider, AdapterLuxon } from '../../../../shared/modules/MaterialImports/DatePicker';

import './logs.scss'
import { Grid } from "../../../../shared/modules/MaterialImports/Grid";

export default function Logs() {
    const [logs, setLogs] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(200);
    const [totalRecords, setTotalRecords] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isMore, setIsMore] = useState(false);
    const [startDate, setStartDate] = useState<DateTime>(DateTime.now());
    const [endDate, setEndDate] = useState<DateTime>(DateTime.now());

    const getLogsDetails = async (page: number, size: number) => {
        const saveData = {
            clientId: userLocalData.getvalue("clientId"),
            //recrId: 61,
            recrId: userLocalData.getvalue("recrId"),
            next: page * size,
            pageSize: size,
            "startDate": (isMore) ? startDate.toFormat('yyyy-MM-dd') : null, //DateTime.now().minus({ days: 7 }).toFormat('yyyy-MM-dd'),
            "endDate": (isMore) ? endDate.toFormat('yyyy-MM-dd') : null,
        };
        setIsLoading(true);
        if (startDate.startOf("day") > endDate.startOf("day")) {
            showToaster('Start Date should be less than End Date.', 'error');
            return false;
        }
        trackPromise(
            ApiService.postWithData("admin", "recruiter/creditStats/activity-log", saveData).then(
                (response: any) => {
                    if (response.data.Success) {
                        const logs = response?.data?.recruiterLogList || []
                        if (currentPage >= 1) {
                            setLogs((prevLogs) => [...prevLogs, ...logs]);
                        } else {
                            setLogs([...logs]);
                        }
                        setTotalRecords(response.data.total || 0);
                    } else {
                        showToaster(
                            response.data.Message || "An error occurred while fetching logs",
                            "error"
                        );
                    }
                    setIsLoading(false);
                }
            ).catch(() => {
                setIsLoading(false);
            })
        );
    };

    const handleClear = () => {
        setIsMore(false);
        setStartDate(DateTime.now());
        setEndDate(DateTime.now());
    }

    useEffect(() => {
        getLogsDetails(currentPage, pageSize);
    }, [currentPage, isMore]);

    return (
        <div id="logs-list">
            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} mb={1}>
                <Typography variant="h6" sx={{ fontSize: "14px" }}>Show Logs</Typography>
                {(!isMore && totalRecords > 9) ? <Button color="secondary" variant="outlined" size="small" onClick={() => setIsMore(true)}>Show more</Button> : null}
            </Stack>
            <Divider sx={{ mb: 1 }} />
            {isMore ? <Stack spacing={0.75} mt={1.5} mb={0.75}>
                <LocalizationProvider dateAdapter={AdapterLuxon}>
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                    >
                        <DatePicker
                            // label="Start Date"
                            label='Start Date'
                            value={startDate}
                            onChange={(newValue) => {
                                if (newValue) {
                                    setStartDate(newValue);
                                } else {
                                    setStartDate(DateTime.now());
                                }
                            }}
                            sx={{ width: '133px' }}
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
                            // renderInput={(params) => <TextField size='small' {...params} />}
                            maxDate={endDate}
                        />


                        <DatePicker
                            // label="End Date"
                            label='End Date'
                            value={endDate}
                            onChange={(newValue) => {
                                if (newValue) {
                                    setEndDate(newValue);
                                } else {
                                    setEndDate(DateTime.now());
                                }
                            }}
                            sx={{ width: '133px', marginLeft: '4px' }}
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
                            // renderInput={(params) => <TextField size='small' {...params} />}
                            maxDate={DateTime.now()}
                        />

                    </Grid>
                </LocalizationProvider>
                <Stack direction={"row"} justifyContent={"flex-end"} alignItems={"center"} spacing={2}>
                    <Button variant="outlined" color="secondary" sx={{ textTransform: "none", height: "24px" }} onClick={handleClear}>Clear</Button>
                    <Button variant="contained" color="primary" fullWidth onClick={() => { getLogsDetails(currentPage, pageSize); }}   >
                        Get Data
                    </Button>
                </Stack>
            </Stack> : null}
            <List disablePadding sx={{ height: `calc(100vh - ${isMore ? "318px" : "242px"})` }}>
                {!!logs?.length ? logs.map((log, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={log.descr} 
                        secondary={DateTime.fromFormat(log.actionDate.substring(0, 19), 'yyyy-MM-dd hh:mm:ss').toFormat('MM/dd/yyyy hh:mm a')} />
                    </ListItem>
                )) :
                    <Typography textAlign={"center"} my={6}>{"No logs available"}</Typography>}
            </List>

            {/* <Box display="flex" justifyContent="center" mt={2}>
                <TablePagination
                    component="div"
                    count={totalRecords}
                    page={currentPage}
                    onPageChange={(_, newPage) => setCurrentPage(newPage)}
                    rowsPerPage={pageSize}
                    onRowsPerPageChange={(e) => {
                        setPageSize(parseInt(e.target.value, 10));
                        setCurrentPage(0);
                    }}
                    labelRowsPerPage=""
                    showFirstButton
                    showLastButton
                />
            </Box> */}
        </div >
    );
}
