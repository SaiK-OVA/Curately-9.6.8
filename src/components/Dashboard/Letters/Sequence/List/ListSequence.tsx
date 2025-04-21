import { useState, useEffect, useMemo, useRef } from '../../../../../shared/modules/React';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SwitchLeftIcon from "@mui/icons-material/SwitchLeft";
import { Typography } from '../../../../../shared/modules/MaterialImports/Typography';
import {
    MaterialReactTable,
    type MRT_ColumnDef,
    // type MRT_SortingState,
} from "../../../../../shared/modules/MaterialReactTable";
import ApiService from '../../../../../shared/api/api';
import { trackPromise } from '../../../../../shared/modules/PromiseTrackter';
import { Tooltip } from '../../../../../shared/modules/MaterialImports/ToolTip';
import { Tabs, Tab } from '../../../../../shared/modules/MaterialImports/Tabs';
// import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import { Grid, Button, IconButton, FormControl, showToaster } from '../../../../../shared/modules/commonImports';
import { DateTime } from '../../../../../shared/modules/Luxon';
import { TotalListDialog, totalListDialog } from './TotalList/TotalList';
import { userLocalData } from '../../../../../shared/services/userData';
import { confirmDialog } from '../../../../shared/ConfirmDialog/ConfirmDialog';
// import FormLabel from '@mui/material/FormLabel';
import { FormControlLabel, TextField } from '../../../../../shared/modules/MaterialImports/FormInputs';
import { Radio, RadioGroup } from '../../../../../shared/modules/MaterialImports/FormElements';
import { Stack } from '../../../../../shared/modules/MaterialImports/Stack';
import CustomPagination from '../../../../shared/CustomPagination/CustomPagination';
import { CloseRounded, SearchOutlined } from '@mui/icons-material';

import './ListSequence.scss';
import { ID_ROLE_CANDIDATE_MODULE, ID_ROLE_CONTACT_MODULE } from '../../../../../shared/services/Permissions/IDs';


const ListSequence = () => {

    const { sequenceType } = useParams<{ sequenceType?: 'candidate' | 'contact' }>();
    const navigate = useNavigate();

    useEffect(() => {
        if (sequenceType) {
            setSelectedSequenceType(sequenceType);
            setSearchValue("");
        }
    }, [sequenceType])




    const [listSequence, setListSequence] = useState<any[] | never[]>([]);
    // const [dataLoading, setDataLoading] = useState<boolean>(true);
    const recrId = userLocalData.getvalue('recrId');
    const clientId = userLocalData.getvalue('clientId')
    // const [maxWidthForSequence, setMaxWidthForSequence] = useState<number>(270);
    const [selectedSequenceType, setSelectedSequenceType] = useState<'candidate' | 'contact'>(sequenceType ? sequenceType : userLocalData.checkIntegration(ID_ROLE_CANDIDATE_MODULE) ? 'candidate' : userLocalData.checkIntegration(ID_ROLE_CONTACT_MODULE) ? 'contact' : 'candidate'); // Default is 'candidate'
    const [sequenceScope, setSequenceScope] = useState('mySequences'); // Default is 'mySequences'
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    // const [rowCount, setRowCount] = useState(0);
    const [globalFilter, setGlobalFilter] = useState('');
    const [campaignsData, setCampaignsData] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    const filteredData = useMemo(() => {
        if (!["", null, undefined].includes(searchValue)) {
            return campaignsData.filter((each: any) => {
                let trimmedSearchValue = searchValue?.toLowerCase()?.trim() || "";
                return ((each.sequenceName.toLowerCase().includes(trimmedSearchValue)) ||
                    ((selectedSequenceType === "candidate") ? each.sequenceType.toLowerCase().includes(trimmedSearchValue) : false))
            })
        } else return (campaignsData || []);
    }, [searchValue, campaignsData]);

    useEffect(() => { return () => setSearchValue("") }, [])

    const initialRender = useRef(true);
    // const [rowCount, setRowCount] = useState(0);

    useEffect(() => {

        if (initialRender.current) {
            initialRender.current = false;
        } else {
            getSequenceList()
        }
    }, [selectedSequenceType, sequenceScope]);

    const getSequenceList = () => {
        const clientId = userLocalData.getvalue('clientId');
        const recrId = userLocalData.getvalue('recrId');
        const payLoad = sequenceScope === 'mySequences' ?
            { recrId: recrId, clientId: clientId, all: false }
            : userLocalData.isChromeExtensionEnabled() ?
                { clientId: clientId, recrId: recrId, all: true, recrIds: userLocalData.getvalue('invitedAndReferredRecrIds') }
                : { clientId: clientId, all: true };

        const fullUrl = (selectedSequenceType === 'candidate') ? `getSequenceList` : `getContactSequenceList`;

        fetchData("admin", fullUrl, "postWithData", payLoad);
    };

    // const getSequenceList = () => {
    //     const clientId = userLocalData.getvalue('clientId');
    //     const recrId = userLocalData.getvalue('recrId');

    //     if (sequenceType === 'candidate') {
    //         const fullUrl = `getSequenceList`;
    //         const payLoad = sequenceScope === 'mySequences' ?
    //             { recrId: recrId, clientId: clientId, all: false }
    //             :
    //             userLocalData.isChromeExtensionEnabled() ?
    //                 { clientId: clientId, recrId: recrId, all: true, recrIds: userLocalData.getvalue('invitedAndReferredRecrIds') }
    //                 :
    //                 { clientId: clientId, all: true };
    //         fetchData("admin", fullUrl, "postWithData", payLoad);

    //     } else if (sequenceType === 'contact') {
    //         let endpoint = sequenceScope === 'mySequences' ?
    //             `getSequenceContactListById/${recrId}/${clientId}` :
    //             `getSequenceContactList/${clientId}`;
    //         fetchData('admin', endpoint, "getCall");
    //     }
    // };

    const fetchData = (serverId: any, endpoint: any, fetchType: "postWithData" | "getCall", payLoad?: any) => {

        trackPromise(
            // ApiService.getCall(serverId, endpoint)
            ApiService[fetchType](serverId, endpoint, payLoad || {}).then(response => {
                if (response.data.Success === true || response.data.Message === "Success") {
                    let sequences = response.data.Data || response.data.List || response.data.list;
                    // remove with AI Campaign
                    // sequences = sequences.filter((item: any) => !item.jobId);
                    sequences = !!sequences?.length ? sequences.map((item: any, index: any) => ({
                        ...item,
                        id: index + 1,
                        actions: "",
                        sequence_name: item.sequence_name || item.Sequence_Name,
                        sequenceType: ![null, undefined, ""].includes(item.jobId) ? "AI" : "Manual"
                    })) : [];

                    setListSequence(sequences || []);
                } else {
                    showToaster('Failed to fetch campaigns', 'error');
                }
            })
                .catch(error => {
                    console.error('Failed to fetch campaigns:', error);
                    showToaster('Failed to fetch campaigns', 'error');
                })
        );
    };
    useEffect(() => {
        const filter = globalFilter ? globalFilter.toLowerCase() : "";
        const filtered: any = listSequence.filter(row => {
            return (
                (row.recrName && row.recrName.toLowerCase().includes(filter)) ||
                (row.sequenceName && row.sequenceName.toLowerCase().includes(filter)) ||
                (row.recrId && `${row.recrId}`.includes(filter)) ||
                (row.sequenceId && `${row.sequenceId}`.includes(filter))
            );
        });
        setCampaignsData(filtered as any);
        setPagination(prev => ({
            ...prev,
            pageIndex: 0
        }));
    }, [globalFilter, listSequence]);

    // Calculate rowCount
    const rowCount = filteredData.length;
    const deleteSequence = (id: number) => {
        console.log(id)
        console.log(selectedSequenceType)
        if (selectedSequenceType === "candidate") {
            trackPromise(
                ApiService.deleteById('admin', 'deleteSequence', id + '/' + clientId).then((response: any) => {

                    if (response.data.Status === 200) {
                        showToaster('Campaign has been Deleted Successfully.', 'success');
                        getSequenceList()
                    } else {
                        showToaster('An error occurred while Deleting Campaign. Please try again.', 'error');
                    }
                })
            );
        }
        else if (selectedSequenceType === "contact") {
            trackPromise(
                ApiService.deleteById("admin", 'deleteContactSequence', id + '/' + clientId).then((response: any) => {

                    if (response.data.Status === 200) {
                        showToaster('Campaign has been Deleted Successfully.', 'success');
                        getSequenceList()

                    } else {
                        showToaster('An error occurred while Deleting Campaign. Please try again.', 'error');
                    }
                })
            );
        }
    }

    const getSequencePath = (rowData: any) => {
        return !["", null, undefined].includes(rowData.jobId) ?
            `aicampaigns/${selectedSequenceType}/edit/${rowData.sequenceId}` :
            `campaigns/${selectedSequenceType}/edit/${rowData.sequenceId}`
    }

    const columns: MRT_ColumnDef<any>[] = useMemo(
        () => [
            {
                // field: 'SequenceName',
                accessorKey: 'sequenceName',
                header: 'Campaign Name',
                size: 60,
                enableColumnPinning: true,
                Cell: ({ row }) =>
                    (sequenceScope === "mySequences") ?
                        <Link to={`/${userLocalData.getvalue('clientName')}/letter/${getSequencePath(row.original)}`} className="hightLightTd">
                            {row.original.sequenceName}
                        </Link>
                        :
                        (sequenceScope === "allSequences" && row.original.recrId === userLocalData.getvalue('recrId')) ?
                            <Link to={`/${userLocalData.getvalue('clientName')}/letter/${getSequencePath(row.original)}`} className="hightLightTd">
                                {row.original.sequenceName}
                            </Link>
                            :
                            <span>{row.original.sequenceName}</span>

            },
            {
                accessorKey: 'sequenceType',
                header: 'Type',
                size: 60,
                enableColumnPinning: true,
            },
            {
                accessorKey: 'createdDate',
                header: 'Created Date',
                muiTableHeadCellProps: {
                    align: 'center',
                    width: '100px'

                },
                muiTableBodyCellProps: {
                    align: 'center',
                    width: '100px'
                },
                Cell: ({ row }) => (
                    <span>
                        {/* {row.original.created_date.substring(0, 10)} */}
                        {DateTime.fromSQL(row.original.createdDate.substring(0, 10)).toFormat('MM/dd/yyyy')}

                    </span>
                ),
                size: 80,
                minSize: 80,
                maxSize: 80
            },

            {
                accessorKey: 'stages_count',
                header: 'No of Stages',
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
            },
            {
                accessorKey: 'users_total',
                header: 'Total',
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
                Cell: ({ row }) =>
                    (row.original.users_total && row.original.users_total !== "0") ?
                        <span className='editLink' onClick={() => {
                            totalListDialog(
                                row.original.sequenceId,
                                "",
                                selectedSequenceType,
                                () => {
                                    // console.log(row.original.sequenceId)
                                }
                            )
                        }} >
                            {row.original.users_total}
                        </span >
                        :
                        <span>
                            {row.original.users_total}
                        </span >

            },
            {
                accessorKey: 'finish_total',
                header: 'Finished',
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
                Cell: ({ row }) =>
                    (row.original.finish_total && row.original.finish_total !== "0") ?
                        <span className='editLink' onClick={() => {
                            totalListDialog(
                                row.original.sequenceId,
                                "finished",
                                selectedSequenceType,
                                () => {
                                    // console.log(row.original.sequenceId)
                                    // console.log(sequenceType)
                                }
                            )
                        }} >
                            {row.original.finish_total}
                        </span >
                        :
                        <span>
                            {row.original.finish_total}
                        </span >
            },
            {
                accessorKey: 'fail_count',
                header: 'Failed',
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
                Cell: ({ row }) =>
                    (row.original.fail_count && row.original.fail_count !== "0") ?
                        <span className='editLink' onClick={() => {
                            totalListDialog(
                                row.original.sequenceId,
                                "failed",
                                selectedSequenceType,
                                () => {
                                    // console.log(row.original.sequenceId)
                                }
                            )
                        }} >
                            {row.original.fail_count}
                        </span >
                        :
                        <span>
                            {row.original.fail_count}
                        </span >
            },
            {
                accessorKey: 'actions',
                header: 'Actions',
                enableSorting: false,
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
                Cell: ({ row }) => (
                    <span className='actions'>
                        {(row.original.recrId === recrId || sequenceScope === "mySequences") ?
                            <span className="actionIcons">
                                <Tooltip title="Delete">
                                    <DeleteOutlineOutlinedIcon onClick={() => {
                                        confirmDialog(`Are you sure you want to delete ${row.original.sequenceName} Campaign ?`, () =>
                                            deleteSequence(row.original.sequenceId)
                                            // console.log(row.original.sequence_id)
                                        );
                                    }} />
                                </Tooltip>
                            </span>
                            :
                            <span className="actionIcons">&nbsp;</span>
                        }


                        <span className="actionIcons">
                            <Tooltip title="View Statistics">
                                <Link to={`/${userLocalData.getvalue('clientName')}/letter/campaigns/${selectedSequenceType}/report/${row.original.sequenceId}`}>
                                    <AssessmentOutlinedIcon />
                                </Link>
                            </Tooltip>
                        </span>
                    </span>
                )
            },
        ], [selectedSequenceType, sequenceScope]
    );

    const saveAuditLog = (id: number) => {
        ApiService.saveAuditLog(id);
    }

    useEffect(() => {
        saveAuditLog(4192);
    }, [])

    return <>
        <div className='pt-3' id='sequenceList'>
            <div className="">
                <Grid container direction="row" justifyContent="space-between" alignItems="center" className="customCard px-4 py-2 mb-2" sx={{ minHeight: "auto !important" }} >
                    <Stack direction="row" spacing={3}>
                        <Typography variant="h6" className="header pt-1" > Campaign Lists</Typography>
                        {
                            //  !userLocalData.isChromeExtensionEnabled() && (userLocalData.checkIntegration(ID_ROLE_CANDIDATE_MODULE) || userLocalData.checkIntegration(ID_ROLE_CONTACT_MODULE)) ?
                            (userLocalData.checkIntegration(ID_ROLE_CANDIDATE_MODULE) && userLocalData.checkIntegration(ID_ROLE_CONTACT_MODULE)) ?
                                <FormControl component="fieldset">
                                    <RadioGroup row value={selectedSequenceType}
                                        onChange={(e) => {

                                            navigate(`/${userLocalData.getvalue('clientName')}/letter/campaigns/${e.target.value}/list/`)

                                        }} name="sequenceType"
                                    >
                                        <FormControlLabel value="candidate" control={<Radio />} label="Candidate" onClick={() => saveAuditLog(4193)} />
                                        <FormControlLabel value="contact" control={<Radio />} label="Contact" onClick={() => saveAuditLog(4194)} />

                                    </RadioGroup>
                                </FormControl>
                                :
                                <Typography variant="h6" className="header pt-1 ml-2" >  {userLocalData.checkIntegration(ID_ROLE_CANDIDATE_MODULE) ? " - Candidate" : userLocalData.checkIntegration(ID_ROLE_CONTACT_MODULE) ? " - Contact" : ""}</Typography>
                        }
                    </Stack>
                    <div className='d-flex'>
                        <Button variant="outlined" color="secondary" href={`#/${userLocalData.getvalue('clientName')}/letter/campaigns/${selectedSequenceType}/auditlog`} onClick={() => saveAuditLog(4195)} className='mr-3'>
                            Audit Log
                        </Button>
                        {(selectedSequenceType === "candidate") && !userLocalData.isChromeExtensionEnabled() && <Button variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />} href={`#/${userLocalData.getvalue('clientName')}/letter/aicampaigns/${selectedSequenceType}/add`} onClick={() => saveAuditLog(4197)} className='mr-3' >
                            Add New AI Campaign
                        </Button>}
                        {/* </Link>
                        <Link to="/Campaign/add" className="btn btn-primary ml-3 c-white underlineNone"> */}
                        <Button variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />} href={`#/${userLocalData.getvalue('clientName')}/letter/campaigns/${selectedSequenceType}/add`} onClick={() => saveAuditLog(4198)}>
                            Add New Campaign
                        </Button>
                    </div>
                </Grid>
                <Grid>
                    <Tabs
                        // value={myOrAll}
                        // onChange={handleChange}
                        value={sequenceScope}
                        onChange={(event, newValue) => {
                            setSequenceScope(newValue);
                            setSearchValue("");
                        }}
                        className="tableTabs"
                    >
                        <Tab value={"mySequences"} label={"My Campaigns"} onClick={() => saveAuditLog(4199)} />
                        <Tab value={"allSequences"} label={"All Campaigns"} onClick={() => saveAuditLog(4200)} />
                    </Tabs>
                </Grid>

                <Stack alignItems={"end"} justifyContent={"center"} bgcolor={'white'} p={1.75}>
                    <TextField
                        fullWidth={false}
                        placeholder='Search Campaigns here...'
                        size='small'
                        InputProps={{
                            startAdornment: <SearchOutlined fontSize='small' sx={{ mr: 0.75 }} color="inherit" />,
                            endAdornment: <IconButton size='small'
                                sx={{ ml: 0.75 }}
                                disabled={["", null, undefined].includes(searchValue)}
                                onClick={() => {
                                    setPagination({ ...pagination, pageIndex: 0 });
                                    setSearchValue("");
                                }}
                            ><CloseRounded fontSize='small' /></IconButton>
                        }}
                        value={searchValue}
                        onChange={(e) => {
                            setPagination({ ...pagination, pageIndex: 0 });
                            setSearchValue(e.target.value);
                        }}
                    />
                </Stack>
                <div className="MRTableCustom pl-0">

                    <MaterialReactTable
                        columns={columns}
                        // enableRowSelection
                        data={filteredData}
                        enableTopToolbar={false}
                        enablePinning
                        initialState={{
                            columnPinning: { left: ["mrt-row-select", 'id', 'sequenceName'] },
                            density: "compact",
                            showGlobalFilter: false
                        }}
                        enableDensityToggle={false}
                        enableFullScreenToggle={false}
                        // manualPagination
                        // manualSorting
                        enableGlobalFilterModes
                        columnResizeMode="onChange"
                        getRowId={row => row.sequenceId}
                        // onPaginationChange={setPagination}
                        enableStickyHeader
                        icons={{
                            ArrowDownwardIcon: (props: any) => (
                                <SwitchLeftIcon {...props} />
                            ),
                        }}
                        state={{

                            pagination,
                            globalFilter,
                            columnVisibility: {
                                "sequenceType": selectedSequenceType === "candidate"
                            }
                        }}
                        muiPaginationProps={{
                            rowsPerPageOptions: [10],
                            showFirstButton: false,
                            showLastButton: false,
                            SelectProps: {
                                style: { display: 'none' }, // Hide the rows per page dropdown
                            },
                        }}
                        enablePagination={true}
                        renderBottomToolbarCustomActions={() => (
                            <CustomPagination
                                page={pagination.pageIndex}
                                rowsPerPage={pagination.pageSize}
                                rowCount={rowCount}
                                onChangePage={(page: any) => setPagination({ ...pagination, pageIndex: page })}
                                showCount={false}
                            />
                        )}
                        onGlobalFilterChange={setGlobalFilter}

                    />
                </div>
            </div>
        </div>
        {/* <ConfirmDialog /> */}
        <TotalListDialog />
    </>;
}

export default ListSequence;