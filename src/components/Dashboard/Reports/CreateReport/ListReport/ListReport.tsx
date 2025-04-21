import { useState, useEffect, useRef, useCallback } from "../../../../../shared/modules/React";
import {Box} from "../../../../../shared/modules/MaterialImports/Box";
import {Grid, Button} from "../../../../../shared/modules/commonImports";
import {Typography} from "../../../../../shared/modules/MaterialImports/Typography";
import { MaterialReactTable, type MRT_ColumnDef } from "../../../../../shared/modules/MaterialReactTable";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
import { confirmDialog } from "../../../../shared/ConfirmDialog/ConfirmDialog";
import {Tooltip} from "../../../../../shared/modules/MaterialImports/ToolTip";
import { userLocalData } from "../../../../../shared/services/userData";
import { trackPromise } from '../../../../../shared/modules/PromiseTrackter';
import ApiService from '../../../../../shared/api/api';
import { useNavigate } from 'react-router-dom';
import './ListReport.scss';
import { debounce } from "lodash";
import CustomPagination from '../../../../shared/CustomPagination/CustomPagination'

interface ContactDetail {
    id: any;
}

const ListReport = () => {
    const [listWorkflow, setListWorkflow] = useState<any[] | never[]>([]);
    const [rowSelection, setRowSelection] = useState({});
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 25, // customize the default page size
    });
    const [rowCount, setRowCount] = useState(0);
    const [contactDetails, setContactDetails] = useState<ContactDetail[]>([]);
    const navigate = useNavigate();

    const initialRender = useRef(true);

    const fetchContactDetails = useCallback(
        debounce(async () => {
            try {
                const response = await ApiService.getById('admin', 'listCustomReport', userLocalData.getvalue('clientId'));
                const data = response.data;
                setContactDetails(data.list);
                setRowCount(data.length);
            } catch (error) {
                console.error("Error fetching contact details:", error);
            }
        }, 500),
        []
    );

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
        } else {
            fetchContactDetails();
        }

        return () => {
            fetchContactDetails.cancel();
        };
    }, [fetchContactDetails]);

    const deleteReport = (reportId: any) => {
        trackPromise(
            ApiService.deleteById('admin', 'deleteCustomReportById', reportId + "/" + userLocalData.getvalue('clientId'))
                .then(response => {
                    setContactDetails(prevDetails => prevDetails.filter(detail => detail.id !== reportId));
                    setRowCount(prevCount => prevCount - 1);
                })
                .catch(error => {
                    console.error("Error deleting report:", error);
                })
        );
    };

    const handleEditClick = (id: any) => {
        navigate(`/${userLocalData.getvalue('clientName')}/reports/custom/edit/${id}`);
    };


    const columns: MRT_ColumnDef<any>[] = [
        {
            accessorKey: 'id',
            header: 'ID',
        },
        {
            accessorKey: 'name',
            header: 'Name',
        },

        {
            accessorKey: 'isActive',
            header: 'Status',
            Cell: ({ cell }) => (
                <span>{cell.getValue() ? 'Active' : 'Inactive'}</span>
            ),
        },
        {
            accessorKey: 'actions',
            header: 'Actions',
            enableSorting: false,
            Cell: ({ row }) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Tooltip title="Edit">
                        <a href={`#${userLocalData.getvalue('clientName')}/reports/custom/edit/${row.original.id}`} onClick={() => handleEditClick(row.original.id)}>
                            <ModeEditOutlineOutlinedIcon
                                sx={{ color: '#7f7f7f', cursor: 'pointer' }}
                            />
                        </a>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <DeleteOutlineOutlinedIcon
                            sx={{ color: '#7f7f7f', cursor: 'pointer', marginLeft: '5px' }}
                            onClick={() => {
                                confirmDialog('Are you sure you want to delete this report?', () => {
                                    deleteReport(row.original.id);
                                }, "warning");
                            }}
                        />
                    </Tooltip>
                </div>
            ),
        }
    ];

    const handleClick = () => {
        window.location.href = `#/${userLocalData.getvalue('clientName')}/reports/custom/new`;
        window.location.reload();
        saveAuditLog(4207);
    };
    
    const saveAuditLog = (id: number) => {
        ApiService.saveAuditLog(id);
    }

    useEffect(() => {
        saveAuditLog(4206);
    }, []);

    return (
        <>
            <div className='p-5' id='CustomReportList'>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    className="customCard px-4 py-2 mb-2"
                    sx={{ minHeight: "auto !important" }}
                >
                    <Typography variant="h6" className="header"> Custom Report </Typography>
                    <div className='d-flex'>
                        {/* <Button variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />} href={`#/${userLocalData.getvalue('clientName')}/reports/custom/new`}>
                            Add New Custom Report
                        </Button> */}
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddCircleOutlineIcon />}
                            onClick={handleClick}
                        >
                            Add New Custom Report
                        </Button>
                    </div>
                </Grid>
                <div className="mt-3">
                    <Box sx={{ width: '100%' }} className='MRTableCustom p-0'>
                        <MaterialReactTable
                            columns={columns}
                            enableRowSelection={false}
                            data={contactDetails}
                            onRowSelectionChange={setRowSelection}
                            state={{ rowSelection, pagination }}
                            enablePinning
                            enableStickyHeader
                            initialState={{
                                columnPinning: { left: ['mrt-row-select', 'id', 'name'] },
                                density: 'compact',
                                showGlobalFilter: false,
                            }}
                            enableDensityToggle={false}
                            enableFullScreenToggle={false}
                            enableColumnResizing
                            enableFilters={false}
                            enableGlobalFilterModes
                            columnResizeMode="onChange"
                            onPaginationChange={setPagination}
                            getRowId={(row) => row.id}
                            icons={{
                                ArrowDownwardIcon: (props: any) => <SwitchLeftIcon {...props} />
                            }}
                            rowCount={rowCount}
                            muiPaginationProps={{
                                rowsPerPageOptions: [25],
                                showFirstButton: false,
                                showLastButton: false,
                                SelectProps: {
                                    style: { display: 'none' },
                                },
                            }}
                            renderBottomToolbarCustomActions={() => (
                                <CustomPagination
                                    page={pagination.pageIndex}
                                    rowsPerPage={10}
                                    rowCount={contactDetails?.length ? contactDetails?.length : 0}
                                    onChangePage={(page: any) => setPagination({ ...pagination, pageIndex: page, pageSize: 10 })}
                                    showCount={false}
                                />
                            )}
                        />
                    </Box>
                </div>
            </div>
        </>
    )
}
export default ListReport;
