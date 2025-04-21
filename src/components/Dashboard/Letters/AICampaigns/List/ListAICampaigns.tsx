import { useState, useEffect, useMemo } from '../../../../../shared/modules/React';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SwitchLeftIcon from "@mui/icons-material/SwitchLeft";
import {Typography} from '../../../../../shared/modules/MaterialImports/Typography';
import {
    MaterialReactTable,
    type MRT_ColumnDef,
    // type MRT_SortingState,
} from "../../../../../shared/modules/MaterialReactTable";
// import ApiService from '../../../../../shared/api/api';
import { IconButton,Button,Grid,TextField } from '../../../../../shared/modules/commonImports'
import './ListAICampaigns.scss';
// import { trackPromise } from 'react-promise-tracker';
import {Tooltip} from '../../../../../shared/modules/MaterialImports/ToolTip';
import {Tabs, Tab} from '../../../../../shared/modules/MaterialImports/Tabs';
import EditIcon from '@mui/icons-material/Edit';
// import { InputLabel, showToaster } from '../../../../../shared/modules/commonImports';
import { DateTime } from '../../../../../shared/modules/Luxon';
import { userLocalData } from '../../../../../shared/services/userData';
import { confirmDialog } from '../../../../shared/ConfirmDialog/ConfirmDialog';
import {Stack} from '../../../../../shared/modules/MaterialImports/Stack';
import CustomPagination from '../../../../shared/CustomPagination/CustomPagination';
import {Dialog, DialogTitle, DialogContent, DialogActions} from '../../../../../shared/modules/MaterialImports/Dialog';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik, Yup } from '../../../../../shared/modules/Formik';
import { MUIAutoComplete } from '../../../../shared/MUIAutoComplete/MUIAutoComplete';
import { Divider } from '../../../../../shared/modules/MaterialImports/Divider';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const ListAICampaigns = () => {
    const recrId = userLocalData.getvalue('recrId');
    const clientId = userLocalData.getvalue('clientId')
    const [campaignScope, setCampaignScope] = useState('all'); // Default is 'all'
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [open, setOpen] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const [filteredData, setFilteredData] = useState<any>([]);
    const [listCampaign, setCampaignSequence] = useState([
        { campaignId: 1, campaignName: 'UI/UX Designer Campaign', description: 'Lorem ipsum dolor sit amet...', createdDate: '2024-04-12' },
        { campaignId: 2, campaignName: 'Front-end Dev Campaign', description: 'Lorem ipsum dolor sit amet...', createdDate: '2024-04-13' },
        { campaignId: 3, campaignName: 'AWS Arch Campaign', description: 'Lorem ipsum dolor sit amet...', createdDate: '2024-04-23' },
    ]);
    const validationSchema = Yup.object({
        campaignName: Yup.string().required('Campaign Name is required'),
        jobTitle: Yup.string().required('Job Title is required'),
    });
    const handleClose = () => {
        setOpen(false);
        aiCampaignformik.resetForm();
    };

    const aiCampaignformik = useFormik({
        initialValues: {
            campaignName: '',
            jobTitle: '',
            jobId: '',
            description: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {

            console.log('New Campaign Created:', values);
            handleClose();
        }
    });
    useEffect(() => {
        const filter = globalFilter.toLowerCase();
        const filtered = listCampaign.filter(row => {
            const matchesFilter = row.campaignName.toLowerCase().includes(filter);
            if (campaignScope === 'all') {
                return matchesFilter;
            } else if (campaignScope === 'aicomposed') {
                return false;
            } else if (campaignScope === 'manual') {
                return false;
            }
            return false;
        });

        setFilteredData(filtered);
        setPagination(prev => ({
            ...prev,
            pageIndex: 0
        }));
    }, [globalFilter, listCampaign, campaignScope]);


    // Calculate rowCount
    const rowCount = filteredData.length;
    const deleteSequence = (id: number) => {
        console.log(id)
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const columns: MRT_ColumnDef<any>[] = useMemo(
        () => [
            {

                accessorKey: 'campaignName',
                header: 'Name',
                enableColumnPinning: true,
                Cell: ({ row }) =>
                    <span>{row.original.campaignName}</span>
            },
            {
                accessorKey: 'description',
                header: 'Description',
            },
            {
                accessorKey: 'createdDate',
                header: 'Created On',
                Cell: ({ row }) => (
                    <span>
                        {/* {row.original.created_date.substring(0, 10)} */}
                        {DateTime.fromSQL(row.original.createdDate.substring(0, 10)).toFormat('MM/dd/yyyy')}
                    </span>
                ),
            },
            {
                accessorKey: 'actions',
                header: 'Actions',
                enableSorting: false,

                Cell: ({ row }) => (
                    <span>
                        <span>
                            <Tooltip title="Edit" placement="bottom">
                                <span className="icon-action edit">
                                    <EditIcon onClick={() => console.log('Edit action for:', row.original.campaignId)} />
                                </span>
                            </Tooltip>
                        </span>
                        <span>&nbsp;</span>
                        <span>
                            <Tooltip title="Delete">
                                <span className="icon-action delete">
                                    <DeleteIcon
                                        onClick={() => {
                                            confirmDialog(`Are you sure you want to delete ${row.original.campaignName} Campaign?`, () =>
                                                deleteSequence(row.original.campaignId)
                                            );
                                        }}
                                    />
                                </span>
                            </Tooltip>
                        </span>
                        <span>&nbsp;</span>
                        <span>
                            <Tooltip title="View Details">
                                <span className="icon-action arrow">
                                    <ArrowForwardIcon
                                        onClick={() => { }}
                                    />
                                </span>
                            </Tooltip>
                        </span>
                    </span>
                )
            },
        ], [campaignScope]
    );

    return <>
        <div className='pt-3' id='ListAICampaigns'>
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
                        <Typography variant="h6" className="header, pt-1" > Campaigns</Typography>
                    </Stack>
                    <div className='d-flex'>
                        <Button variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />} onClick={handleClickOpen} >
                            Create New Campaign
                        </Button>
                    </div>
                </Grid>
                <Grid>
                    <Tabs
                        value={campaignScope}
                        onChange={(event, newValue) => setCampaignScope(newValue)}
                        className="tableTabs"
                    >
                        <Tab value={"all"} label={"All"} />
                        <Tab value={"aicomposed"} label={"AI Composed"} />
                        <Tab value={"manual"} label={"Manual"} />
                    </Tabs>
                </Grid>

                <div className="MRTableCustom pl-0">

                    <MaterialReactTable
                        columns={columns}
                        // enableRowSelection
                        data={filteredData}
                        enablePinning
                        initialState={{
                            columnPinning: { left: ["mrt-row-select", 'id', 'campaignName'] },
                            density: "compact",
                            showGlobalFilter: false
                        }}
                        enableRowSelection
                        enableDensityToggle={false}
                        enableFullScreenToggle={false}
                        manualPagination={true}
                        // manualSorting
                        enableGlobalFilterModes
                        columnResizeMode="onChange"
                        getRowId={row => row.campaignId}
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
                        }}
                        enablePagination={false}
                        renderBottomToolbarCustomActions={() => (
                            <CustomPagination
                                page={pagination.pageIndex}
                                rowsPerPage={pagination.pageSize}
                                rowCount={rowCount}
                                onChangePage={(page: any) => setPagination({ ...pagination, pageIndex: page, pageSize: 10 })}
                            />
                        )}
                        onGlobalFilterChange={setGlobalFilter}

                    />
                </div>
            </div>
            <div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle sx={{ px: 2, py: 1 }}>Create New Campaign</DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 6,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Divider />
                    <form onSubmit={aiCampaignformik.handleSubmit}>
                        <DialogContent sx={{ minHeight: 280, minWidth: 500 }}>

                            <TextField
                                fullWidth

                                margin="dense"
                                id="campaignName"
                                name="campaignName"
                                label="New Campaign Name"

                                size="small"
                                value={aiCampaignformik.values.campaignName}
                                onChange={aiCampaignformik.handleChange}
                                onBlur={aiCampaignformik.handleBlur}
                                error={aiCampaignformik.touched.campaignName && Boolean(aiCampaignformik.errors.campaignName)}

                            />
                            <span>&nbsp;</span>
                            <MUIAutoComplete
                                id='jobTitle'
                                handleChange={(id: any, name: string) => {
                                    aiCampaignformik.setFieldValue('jobId', id);
                                    aiCampaignformik.setFieldValue('jobTitle', name);
                                    // setTimeout(() => {
                                    //     updateJobDetails(id, name);
                                    // }, 120);
                                    // setJobModalOpen(false);
                                    // saveDataForm("", id);
                                }}
                                valuePassed={(aiCampaignformik.values.jobId) ? { label: aiCampaignformik.values.jobTitle, id: aiCampaignformik.values.jobId } : {}}
                                isMultiple={false}
                                textToShow="Select Job"
                                width="100%"
                                type='assignJobToCandidate'
                                placeholder="Enter Job Title"
                                error={aiCampaignformik.touched.jobTitle && Boolean(aiCampaignformik.errors.jobTitle)}
                            />
                            <span>&nbsp;</span>
                            <TextField
                                fullWidth
                                margin="dense"
                                multiline
                                id="description"
                                name="description"
                                label="Enter Description"
                                value={aiCampaignformik.values.description}
                                onChange={aiCampaignformik.handleChange}
                                onBlur={aiCampaignformik.handleBlur}
                                minRows={3}
                                maxRows={5}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary" variant='outlined' size='small'>
                                Cancel
                            </Button>
                            <Button type="submit" color="primary" variant='contained' size='small'>
                                Create
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        </div >
    </>;
}

export default ListAICampaigns;