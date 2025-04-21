import { useState, useMemo, useEffect, useRef, useCallback } from "../../../../shared/modules/React"
import { Typography } from '../../../../shared/modules/MaterialImports/Typography';
// import Box from '@mui/material/Box';
import { Grid, Button, IconButton } from '../../../../shared/modules/commonImports';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { DateTime } from '../../../../shared/modules/Luxon';
// import { Dialog, DialogContent, DialogActions } from '../../../../shared/modules/MaterialImports/Dialog'
// import DialogContentText from '@mui/material/DialogContentText';  //Need to add in shared modules
import { Stack } from "../../../../shared/modules/MaterialImports/Stack";
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
import { MaterialReactTable, type MRT_ColumnDef } from "../../../../shared/modules/MaterialReactTable";
import { Tooltip } from "../../../../shared/modules/MaterialImports/ToolTip";
import "./Roles.scss";
import { confirmDialog } from "../../../shared/ConfirmDialog/ConfirmDialog";
import AddRoles from "./AddRoles";

import { SvgIconProps } from '@mui/material/SvgIcon';
import ApiService from "../../../../shared/api/api";
import { AxiosResponse } from "axios";
import { showToaster } from "../../../shared/SnackBar/SnackBar";
import { userLocalData } from "../../../../shared/services/userData";
import { trackPromise } from "../../../../shared/modules/PromiseTrackter";
import Parsable from "../../../../shared/utils/Parsable";
import CustomPagination from '../../../shared/CustomPagination/CustomPagination';
import { debounce } from "lodash";

export interface RoleDataInterface {
    createdDate?: string;
    roleName: string;
    roleId: string;
    settings:
    {
        settingId: number;
        name: string;
        isEnabled: boolean;
        subSettings: {
            autoId: number;
            settingId: number;
            subSettingId: number;
            name: string;
            type: string;
            value: number;
        }[]
    }[];
    integrations: {
        settingId: number;
        name: string;
        isEnabled: boolean;
        subSettings: {
            autoId: number;
            integrationId: number;
            subIntegrationId: number;
            name: string;
            isChecked: boolean;
        }[]
    }[]
}
export const RoleData: RoleDataInterface = {
    roleName: "",
    roleId: "",
    settings: [
        {
            settingId: 0,
            name: "",
            isEnabled: false,
            subSettings: [
                {
                    autoId: 0,
                    settingId: 0,
                    subSettingId: 0,
                    name: "",
                    type: "",
                    value: 0
                }
            ]
        }
    ],
    integrations: [
        {
            settingId: 0,
            name: "",
            isEnabled: false,
            subSettings: [
                {
                    autoId: 0,
                    integrationId: 0,
                    subIntegrationId: 0,
                    name: "",
                    isChecked: false
                }
            ]
        }
    ]
}

const Roles = () => {
    const [filtersExpand,] = useState(false);
    const [editingRole, setEditingRole] = useState<RoleDataInterface>({ ...RoleData });
    const [roleData, setRoleData] = useState<RoleDataInterface[]>([]);
    const roleDataRef = useRef<RoleDataInterface[]>([]);
    const [rowSelection, setRowSelection] = useState({});
    const [addRoleDialogOpen, setAddRoleDialogOpen] = useState(false);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [rowCount, setRowCount] = useState(0);
    const [globalFilter, setGlobalFilter] = useState('');
    const [filteredData, setFilteredData] = useState<RoleDataInterface[]>([]);

    const isRoleAddSettingEnabled = (userLocalData.checkSettings(100002) === 5) || (userLocalData.checkSettings(100002) === 6);
    const isRoleDeleteSettingEnabled = (userLocalData.checkSettings(100002) === 6);


    useEffect(() => {
        const filtered = roleData.filter(row => {
            const filter = globalFilter || ''; // Ensure globalFilter is a string
            return (
                row.roleName?.toLowerCase().includes(filter.toLowerCase()));
        });
        setFilteredData(filtered);
        setPagination(prev => ({
            ...prev,
            pageIndex: 0
        }));
    }, [globalFilter, roleData]);
    const handleOpenAddRoleDialog = () => {
        setEditingRole({ ...RoleData });
        setAddRoleDialogOpen(true);
    };

    const handleAddOrEditRole = () => {
        // let updatedListData;

        // if (editingRole) {
        //     updatedListData = roleData.map(role =>
        //         role.roleId === editingRole.roleId ? { ...role, ...RoleData } : role
        //     );
        // } else {
        //     const newRoleId = `temp-id-${Math.random().toString(36).substr(2, 9)}`;
        //     const newRole = {
        //         ...RoleData,
        //         RoleId: newRoleId,
        //         Users: 0,
        //         CreatedOn: DateTime.now().toFormat("dd LLL yyyy, HH:mm"),
        //         Type: "Custom"
        //     };
        //     updatedListData = [...roleData, newRole];
        // }

        // setRoleData(updatedListData);
        setEditingRole({ ...RoleData });
        // handleCloseAddRoleDialog();
        setAddRoleDialogOpen(false);
        getRolesList();
    };

    const handleEditClick = useCallback(debounce((roleId: string) => {
        // console.log( )
        // const roleToEdit = roleData.find(role => role.roleId === roleId);
        // console.log(roleToEdit)
        // http://35.155.202.216:8080/QADemoCurately/getRoleById/3
        trackPromise(
            ApiService.getCall('admin', `getRoleById/${roleId}/${userLocalData.getvalue('clientId')}`).then(
                (response) => {
                    // console.log(response);
                    const respData = response.data;
                    if (respData.Success && respData.list?.length && respData.list[0].roleId) {
                        const tempJson = Parsable.isJSON(respData.list[0].json) ? JSON.parse(respData.list[0].json) : {};
                        const roleDataToEdit = {
                            roleId: (respData.list[0].roleId) ? respData.list[0].roleId : 0,
                            roleName: (respData.list[0].roleName) ? respData.list[0].roleName : "",
                            settings: tempJson.settings ? tempJson.settings : [],
                            integrations: tempJson.integrations ? tempJson.integrations : []
                        }
                        setEditingRole(roleDataToEdit);
                        setAddRoleDialogOpen(true);
                    } else {
                        showToaster('No Data found', 'error');
                    }
                })
        )
        // if (roleToEdit) {

        // }
    }, 600), [])


    const handleDeleteRole = (roleId: string, roleName: string) => {
        confirmDialog(`Are you sure you want to delete ${roleName}'s Role ?`, () => {
            console.log(roleId, "rolename is");
            saveAuditLog(4230);
            if (!roleName) {
                return ('undefined')
            }
            // console.log(roleId)
            // http://35.155.202.216:8080/QADemoCurately/deleteRole/3/2
            trackPromise(
                ApiService.deleteById('admin', `deleteRole`, `${roleId}/${userLocalData.getvalue('clientId')}`)
                    .then((response) => {
                        // console.log(response);
                        if (response.data.Success) {
                            const updatedRoles = roleDataRef.current.filter(role => role.roleId !== roleId);

                            setRoleData(updatedRoles);
                            roleDataRef.current = updatedRoles;
                            showToaster('Role has been Deleted.', 'success');
                            // getRolesList();
                        } else {
                            showToaster(response.data.Message ? response.data.Message : "Error occured while deleting", 'error');
                        }
                    })
            )
        });
    };

    const columns: MRT_ColumnDef<(typeof roleData)[0]>[] = useMemo(
        () => [
            {
                accessorKey: "roleName",
                header: "Role",
                enableColumnPinning: true,
            },
            // {
            //     accessorKey: "permissions",
            //     header: "Permissions",
            //     size: 250,
            // },
            // {
            //     accessorKey: "users",
            //     header: "Users",
            // },
            {
                accessorKey: "createdDate",
                header: "Created On",
                Cell: ({ row }) => (
                    <span>
                        {row.original.createdDate ? DateTime.fromFormat(row.original.createdDate.substring(0, 19), 'yyyy-MM-dd hh:mm:ss').toFormat('MM/dd/yyyy hh:mm a') : ""}
                    </span>
                ),
                size: 200,
            },
            // {
            //     accessorKey: "type",
            //     header: "Type",
            // },
            {
                accessorKey: "Actions",
                header: "Actions",
                enableSorting: false,
                Cell: ({ row }) => (
                    <Stack key={row.original.roleId}>
                        <Stack direction={"row"}>
                            {
                                (!([1, 2, 3].includes(Number(row.original.roleId))) || (userLocalData.getvalue('recrId') === 2)) && isRoleAddSettingEnabled ?
                                    <Tooltip title="Edit" placement="top" color="primary">
                                        <IconButton onClick={() => { handleEditClick(row.original.roleId || ''); saveAuditLog(4229) }}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    :
                                    null
                            }
                            {
                                (!([1, 2, 3].includes(Number(row.original.roleId))) || (userLocalData.getvalue('recrId') === 2)) && isRoleDeleteSettingEnabled ?
                                    <Tooltip title="Delete" placement="top" color="primary">
                                        <IconButton onClick={() => { handleDeleteRole(row.original.roleId, row.original.roleName || "") }}>
                                            <DeleteOutlineIcon />
                                        </IconButton>
                                    </Tooltip>
                                    :
                                    null
                            }
                        </Stack>
                    </Stack>
                ),
                size: 100
            },
        ],
        []
    );


    const getRolesList = useCallback(debounce(() => {
        // http://35.155.202.216:8080/QADemoCurately/getRoleList
        trackPromise(
            ApiService.getCall('admin', `getRoleList/${userLocalData.getvalue('clientId')}`)
                .then((response: AxiosResponse) => {
                    const respData = response.data;
                    if (respData.Success) {
                        setRoleData(Array.isArray(respData.list) ? respData.list : []);
                        roleDataRef.current = Array.isArray(respData.list) ? respData.list : [];
                        setRowCount(response.data.list.length)
                    }
                })
        )
    }, 600), [])
    useEffect(() => {
        getRolesList();
    }, [])

    const saveAuditLog = (id: number) => {
        ApiService.saveAuditLog(id);
    }

    useEffect(() => {
        saveAuditLog(4227)
    }, []);

    return (
        <div className="roles pt-3 px-5" id="rolesList">
            <Grid
                container
                direction="row"
                className="customCard px-4 py-2"
                justifyContent="space-between"
                alignItems="center"
                display="flex"
                sx={{ minHeight: 'auto !important' }}
            >
                <Typography variant="h6" className="headerName">
                    Roles
                </Typography>
                <Stack direction="row" className="btn-container">
                    {
                        isRoleAddSettingEnabled ?
                            <Button variant="contained" color="primary" size="small" onClick={() => { handleOpenAddRoleDialog(); saveAuditLog(4228) }} >New Role</Button>
                            :
                            null
                    }
                </Stack>
            </Grid>
            <Grid container className="customCard p-0 filterExpand-grid" >
                <Grid sx={{ width: filtersExpand ? 'calc(100%)' : 'calc(100% - 0px)' }}>
                    <div className={`MRTableCustom  pl-0 `}>
                        <div style={{ width: '100%' }}>
                            <div style={{ overflowX: 'auto', width: '100%' }}>
                                <MaterialReactTable
                                    columns={columns}
                                    data={filteredData}
                                    onRowSelectionChange={setRowSelection}
                                    state={{ rowSelection, pagination }}
                                    enablePinning
                                    enableStickyHeader
                                    initialState={{
                                        columnPinning: { left: ['mrt-row-select', 'roleName'] },
                                        density: 'compact',
                                        showGlobalFilter: true,
                                    }}
                                    enableDensityToggle={false}
                                    enableFullScreenToggle
                                    // enableColumnResizing
                                    enableFilters={false}
                                    enableGlobalFilterModes
                                    columnResizeMode="onChange"
                                    onPaginationChange={setPagination}
                                    // getRowId={(row) => row.roleId}

                                    icons={{
                                        ArrowDownwardIcon: (props: SvgIconProps) => <SwitchLeftIcon {...props} />
                                    }}
                                    rowCount={filteredData.length}
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
                                            rowsPerPage={10}
                                            rowCount={rowCount}
                                            onChangePage={(page: any) => setPagination({ ...pagination, pageIndex: page, pageSize: 10 })}
                                            showCount={false}
                                        />
                                    )}
                                    onGlobalFilterChange={setGlobalFilter}

                                />
                            </div>
                        </div>
                    </div>
                </Grid>
                {
                    addRoleDialogOpen ?
                        <AddRoles
                            open={addRoleDialogOpen}
                            handleClose={() => setAddRoleDialogOpen(false)}
                            handleAdd={handleAddOrEditRole}
                            roleData={editingRole}
                        />
                        :
                        null
                }
            </Grid>
        </div>
    )
}

export default Roles
