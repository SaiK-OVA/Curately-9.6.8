import { useMemo, useState } from '../../../../../shared/modules/React';
import {Box} from '../../../../../shared/modules/MaterialImports/Box';
// import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
// import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { MaterialReactTable, type MRT_ColumnDef } from "../../../../../shared/modules/MaterialReactTable";
import SwitchLeftIcon from "@mui/icons-material/SwitchLeft";

import {Typography} from '../../../../../shared/modules/MaterialImports/Typography';

import {Stack} from '../../../../../shared/modules/MaterialImports/Stack';
import ApiService from '../../../../../shared/api/api';

// import AppData from '../../../shared/data/version';
import './AuditLog.scss';
import { trackPromise } from '../../../../../shared/modules/PromiseTrackter';

import { showToaster, Button, Grid } from '../../../../../shared/modules/commonImports';

import { DateTime } from '../../../../../shared/modules/Luxon';

import { DatePicker, LocalizationProvider, AdapterLuxon } from '../../../../../shared/modules/MaterialImports/DatePicker';
//import Stack from '@mui/material/Stack';
import { userLocalData } from '../../../../../shared/services/userData';
import { useParams } from 'react-router-dom';
import CustomPagination from '../../../../shared/CustomPagination/CustomPagination';



const AuditLog = () => {
    const { sequenceType } = useParams();

    const [auditLogList, setAuditLogList] = useState<any[] | never[]>([]);
    // const [pageSize, setPageSize] = useState<number>(10);
    const [startDate, setStartDate] = useState<DateTime>(DateTime.now());
    const [endDate, setEndDate] = useState<DateTime>(DateTime.now());
    const [searched, setSearched] = useState<boolean>(false);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 25,
    });

    const paginatedData = useMemo(() => {
        const start = pagination.pageIndex * pagination.pageSize;
        const end = start + pagination.pageSize;
        return auditLogList.slice(start, end);
    }, [auditLogList, pagination.pageIndex, pagination.pageSize]);

    // const [dataLoading, setDataLoading] = useState<boolean>(true);
    // const [maxWidthForSequence, setMaxWidthForSequence] = useState<number>(270);

    // const navigate = useNavigate();

    // const loadData = (id: string) => {

    //     navigate('/sequence/edit/' + id);

    // }

    // const getEditLink = (params: any) => {
    //     return `<Link to='/sequence/edit/${row.original.AuditlogID}'>
    //         <Button size="small" >${row.original.SequenceName}</Button>
    //     </Link>`;
    // }


    const columns: MRT_ColumnDef<any>[] = [
        {
            accessorKey: 'AuditlogID',
            header: 'ID',
            size: 80,
            // filterable: false,
            // sortable: false,
        },
        {
            // field: 'SequenceName',
            accessorKey: 'fullName',
            header: 'Candidate Name',
            // minWidth: 250,
            // flex: 0.5,
            // width: 270,
            // flex: 1,
            // width: maxWidthForSequence,
            // editable: false,
            // valueGetter: getEditLink,
            // renderCell: (params) => (
            //     <span className='editLink' onClick={() => loadData(row.original.AuditlogID)}>
            //         {row.original.SequenceName}
            //     </span>
            // )
            Cell: ({ renderedCellValue, row }) => (
                <span>{row.original.fullName}</span>
            )
            // params.getValue(params.id, 'id') || ''
        },
        {
            accessorKey: 'CreatedDate',
            header: 'Created Date',
            // width: 120,
            // flex: 1,
            // align: 'center',
            // headerAlign: 'center',
            Cell: ({ renderedCellValue, row }) => (
                <span>
                    {DateTime.fromSQL(row.original.CreatedDate.substring(0, 10)).toFormat('MM/dd/yyyy')}
                </span>
            ),
            // editable: false,
        },
        {
            accessorKey: 'Description',
            header: 'Description',
            // width: 110,
            // flex: 1,
            // // align: 'center',
            // // headerAlign: 'center',
            // editable: false,
        },
        {
            accessorKey: 'SequenceName',
            header: 'Campaign Name',
            // width: 60,
            // flex: 1,
            // // align: 'center',
            // // headerAlign: 'center',
            // editable: false
        },
        {
            accessorKey: 'StageNumber',
            header: 'Stage Number',
            // width: 60,
            // flex: 1,
            // // align: 'center',
            // // headerAlign: 'center',
            // editable: false
        }

    ];


    const getAuditLog = () => {
        // setDataLoading(true);
        if (startDate && endDate && (startDate.startOf("day") <= endDate.startOf("day"))) {
            let data = {
                "startDate": startDate.toFormat('yyyy-MM-dd'),
                "endDate": endDate.toFormat('yyyy-MM-dd'),
                "clientId": userLocalData.getvalue('clientId')
            }
            if (sequenceType === 'candidate') {
                trackPromise(
                    ApiService.postWithData('admin', 'getAuditLog', data).then((response: any) => {

                        setSearched(true);
                        // console.log(response);
                        if (response.data.Status && response.data.Status === 200) {
                            let tempSequenceList = [...response.data.AuditLogList];
                            for (let sl = 0; sl < tempSequenceList.length; sl++) {
                                tempSequenceList[sl].id = sl + 1;
                                tempSequenceList[sl].actions = "";
                            }
                            setAuditLogList(tempSequenceList.reverse());
                        }
                    })
                );
            }
            else if (sequenceType === 'contact') {
                //http://35.155.202.216:8080/QADemoCurately/getSequenceContactAuditLog
                trackPromise(
                    ApiService.postWithData('admin', 'getSequenceContactAuditLog', data).then((response: any) => {

                        setSearched(true);
                        // console.log(response);
                        if (response.data.Status && response.data.Status === 200) {
                            let tempSequenceList = [...response.data.AuditLogList];
                            for (let sl = 0; sl < tempSequenceList.length; sl++) {
                                tempSequenceList[sl].id = sl + 1;
                                tempSequenceList[sl].actions = "";
                            }
                            setAuditLogList(tempSequenceList.reverse());
                        }
                    })
                );
            }
        } else if (!startDate) {
            showToaster('Enter Valid Start Date.', 'error');
        } else if (!endDate) {
            showToaster('Enter Valid End Date.', 'error');
        } else if (startDate.startOf("day") > endDate.startOf("day")) {
            showToaster('Start Date should be less than End Date.', 'error');
        }
        // console.log(startDate.toFormat('yyyy-MM-dd'));
        // console.log(endDate.toFormat('yyyy-MM-dd'));
        // if (startDate.startOf("day") <= endDate.startOf("day")) {
        //     console.log('valid');
        // }
    }

    const saveAuditLog = (id: number) => {
        ApiService.saveAuditLog(id);
    }

    return <>
        <div className='' id='auditLog'>
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
                        <Typography variant="h6" className="header, pt-1" > Audit Log </Typography>

                    </Stack>
                    <div className='d-flex'>

                        <Link to={`/${userLocalData.getvalue('clientName')}/letter/campaigns/${sequenceType}/list`} className="btn btn-primary ml-2 c-white underlineNone">
                            <Button variant="outlined" color="secondary" size='small'>
                                Back to List
                            </Button>
                        </Link>
                    </div>
                </Grid>




                <Grid
                    className='my-3 customCard '
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                >
                    <Stack direction="row" spacing={3} >
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
                                <Box sx={{ mx: 2 }}> to </Box>
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

                    </Stack>
                    <Button variant="contained" color="primary" className='ml-4' fullWidth onClick={() => { getAuditLog(); saveAuditLog(4196) }}   >
                        Get Data
                    </Button>
                </Grid>
                <div className="p-4 customCard CardView">

                    <div className="MRTableCustom pl-0 ">

                        {
                            (searched) ?
                                <MaterialReactTable
                                    columns={columns}
                                    // enableRowSelection
                                    data={paginatedData}
                                    enablePinning
                                    initialState={{
                                        columnPinning: { left: ["mrt-row-select"] },
                                        density: "compact",
                                        showGlobalFilter: false
                                    }}
                                    enableDensityToggle={false}
                                    enableFullScreenToggle={false}
                                    // manualPagination
                                    // manualSorting
                                    enableGlobalFilterModes
                                    columnResizeMode="onChange"
                                    getRowId={row => row.sequence_id}
                                    // onPaginationChange={setPagination}
                                    enableStickyHeader
                                    enablePagination={false}
                                    renderBottomToolbarCustomActions={() => (
                                        <CustomPagination
                                            page={pagination.pageIndex}
                                            rowsPerPage={25}
                                            rowCount={auditLogList.length}
                                            onChangePage={(page: any) =>
                                                setPagination({
                                                    ...pagination,
                                                    pageIndex: page,
                                                    pageSize: 25,
                                                })
                                            }
                                        />
                                    )}
                                    icons={{
                                        ArrowDownwardIcon: (props: any) => (
                                            <SwitchLeftIcon {...props} />
                                        ),
                                    }}

                                />
                                : null
                        }
                        {/* <Dx */}
                    </div>

                </div>
            </div>
        </div >
    </>;
}

export default AuditLog;