import {Grid, Button} from '../../../../../../../../shared/modules/commonImports';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog,  DialogContent, DialogTitle } from '../../../../../../../../shared/modules/MaterialImports/Dialog';
import './ListEvents.scss';
import { useEffect, useState } from '../../../../../../../../shared/modules/React';
import { DateTime } from 'luxon';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import {Divider} from '../../../../../../../../shared/modules/MaterialImports/Divider';
import {Tooltip} from '../../../../../../../../shared/modules/MaterialImports/ToolTip';
import { confirmDialog } from '../../../../../../../shared/ConfirmDialog/ConfirmDialog';
import { MaterialReactTable, type MRT_ColumnDef } from "../../../../../../../../shared/modules/MaterialReactTable";
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
export interface EventsListInterface {
    id?: number;
    actions?: string;
    summary: string;
    end_date: string;
    duration: string;
    eventId: string;
    join_url: string;
    providerid: string;
    description: string;
    location: string;
    cronofyId: string;
    start_date: string;
    accountId: string;
    calendarId: string;
}

const ListEvents = (
    { eventsList, openEdit, openView, open, closePopup, openAdd, deleteEvent, openAvailabilityRules }: {
        eventsList: any;
        open: boolean;
        openEdit: (id: any) => void;
        openView: (id: any) => void;
        closePopup: () => void;
        openAdd: () => void;
        deleteEvent: (id: string) => void;
        openAvailabilityRules: (id: string) => void;
    }
) => {

    const [listEvents, setListEvents] = useState<EventsListInterface[] | never[]>([]);
    // const recrID = userData.getId();
    const columns: MRT_ColumnDef<any>[] = [
        {
            accessorKey: 'id',
            header: 'ID',
            size: 80
        },
        {
            accessorKey: 'summary',
            header: 'Title',
            Cell: ({ renderedCellValue, row }) => (
                <Button
                    onClick={
                        () => {
                            openEdit(row.original.index)
                        }
                    }
                    sx={{
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        display: "inline-block"
                    }}
                    title={row.original.summary}
                >{row.original.summary}</Button>
            )
            // params.getValue(params.id, 'id') || ''
        },
        {
            accessorKey: 'description',
            header: 'description'
        },
        {
            accessorKey: 'created_date',
            header: 'Created Date',
            Cell: ({ renderedCellValue, row }) => (
                <span>
                    {/* {row.original.created_date.substring(0, 10)} */}
                    {DateTime.fromSQL(row.original.created_date.substring(0, 10)).toFormat('MM/dd/yyyy')}

                </span>
            )
        },
        {
            accessorKey: 'actions',
            header: 'Actions',
            Cell: ({ renderedCellValue, row }) => (
                <span className='actions'>
                    {
                        <span className="actionIcons">
                            <Tooltip title="Delete">
                                <DeleteOutlineOutlinedIcon onClick={() => {
                                    confirmDialog('Are you sure you want to delete?',
                                        () => {
                                            deleteEvent(row.original.cronofyId);
                                            closePopup();
                                        }
                                    );
                                }} />
                            </Tooltip>

                            <Tooltip title="Availability Rules">
                                <AssessmentOutlinedIcon
                                    onClick={
                                        () => {
                                            // console.log(params.row);
                                            openAvailabilityRules(row.original.eventId)
                                        }
                                    }
                                />
                            </Tooltip>
                        </span>
                        // :
                        // <span className="actionIcons">&nbsp;</span>
                    }
                </span>
            )
        }
    ];
    // const [myOrAll, setMyOrAll] = useState('myEvents');

    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setMyOrAll((event.target as HTMLInputElement).value);
    //     getEventList((event.target as HTMLInputElement).value);
    // };


    const getEventList = () => {
        // trackPromise(
        //     ApiService.getEventList(text).then((response: any) => {

        // if (response.data.Status && response.data.Status === 200) {
        //     let tempEventList = [...response.data.EventsList];
        let tempEventList = JSON.parse(JSON.stringify(eventsList));
        for (let sl = 0; sl < tempEventList.length; sl++) {
            tempEventList[sl].id = sl + 1;
            tempEventList[sl].index = sl;
            tempEventList[sl].actions = "";
        }
        setListEvents(tempEventList);
        // } else {
        // let tempEventList = [...response.data];
        // for (let sl = 0; sl < tempEventList.length; sl++) {
        //     tempEventList[sl].id = sl + 1;
        //     tempEventList[sl].actions = "";
        // }
        // setListEvents(tempEventList);
        // }
        //     })
        // );
    }

    useEffect(() => {
        getEventList();
    }, []);

    return (
        <Dialog
            maxWidth={'xl'}
            // sx={{ width: 900, maxWidth: 900, minWidth: 900 }}
            fullWidth={false}
            // onClose={handleClose}
            open={open}
            className='EventsList'>

            <DialogTitle
                className='py-2'
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <span>
                        Event List
                    </span>
                    <span onClick={() => closePopup()} className="closePopup">
                        <CloseIcon />
                    </span>
                </Grid>
            </DialogTitle>
            <Divider />
            <DialogContent
                sx={{
                    size: '740px',
                    minHeight: '320px',
                    maxHeight: '70vh'
                }}
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                >
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={openAdd}
                        className='mb-3'
                    >
                        Add Event
                    </Button>
                </Grid>
                <div style={{ height: 415, width: '100%' }} className='MRTableCustom'>
                    {/* <DataGrid
                        rows={listEvents}
                        columns={columns}
                        // pageSize={10}
                        // rowsPerPageOptions={[5, 10]}
                        // checkboxSelection
                        disableSelectionOnClick
                        // experimentalFeatures={{ newEditingApi: false }}
                        rowHeight={35}
                        getRowId={(row: any) => row.cronofyId}
                        hideFooterPagination={true}
                        // loading={dataLoading}
                        className='cronofyList'
                    /> */}
                    <MaterialReactTable
                        columns={columns}
                        enableRowSelection={false}
                        data={listEvents}
                        enablePinning
                        enableStickyHeader
                        initialState={{
                            columnPinning: { left: ['mrt-row-select', 'name'] },
                            density: 'compact',
                            showGlobalFilter: false,
                            pagination: {
                                pageSize: 25,
                                pageIndex: 0,
                            }
                        }}
                        enableDensityToggle={false}
                        enableFullScreenToggle={false}
                        enableColumnResizing
                        enableFilters={false}
                        enableGlobalFilterModes
                        columnResizeMode="onChange"
                        getRowId={(row) => row.WorkFlowId}
                        icons={{
                            ArrowDownwardIcon: (props: any) => <SwitchLeftIcon  {...props} />
                        }}
                        enablePagination
                        rowCount={eventsList.length}
                    />
                </div>
            </DialogContent>
            <Divider />
        </Dialog>
    );
}

export default ListEvents;