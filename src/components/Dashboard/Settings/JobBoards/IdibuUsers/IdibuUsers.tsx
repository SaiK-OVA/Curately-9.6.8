import CloseRounded from '@mui/icons-material/CloseRounded';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import SwitchLeftIcon from "@mui/icons-material/SwitchLeft";
import { Button, debounce, TextField } from '@mui/material';
import ApiService from '../../../../../shared/api/api';
import { IconButton } from '../../../../../shared/modules/MaterialImports/Button';
import { Dialog, DialogContent, DialogTitle } from '../../../../../shared/modules/MaterialImports/Dialog';
import { Divider } from '../../../../../shared/modules/MaterialImports/Divider';
import { InputAdornment } from '../../../../../shared/modules/MaterialImports/InputAdornment';
import { Stack } from '../../../../../shared/modules/MaterialImports/Stack';
import { Typography } from '../../../../../shared/modules/MaterialImports/Typography';
import { MaterialReactTable, MRT_ColumnDef } from '../../../../../shared/modules/MaterialReactTable';
import { trackPromise } from '../../../../../shared/modules/PromiseTrackter';
import { React, useCallback, useEffect, useMemo, useState } from '../../../../../shared/modules/React';
import { userLocalData } from '../../../../../shared/services/userData';
import CustomPagination from '../../../../shared/CustomPagination/CustomPagination';
import "./IdibuUsers.scss";
import AddIdibuUser from './AddIdibuUser';
import { DeleteRounded, EditRounded } from '@mui/icons-material';
import { showToaster } from '../../../../shared/SnackBar/SnackBar';

interface IIdibuUsersProps {
    openDialog: boolean;
    closeDialog: () => void
}

const IdibuUsers: React.FC<IIdibuUsersProps> = ({ openDialog, closeDialog }) => {
    const [usersList, setUsersList] = useState<any>([])
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [rowCount, setRowCount] = useState(0);
    const [globalFilter, setGlobalFilter] = useState('');
    const [searchValue, setSearchValue] = useState("");
    const [openAddUser, setOpenAddUser] = useState(false);
    const [editUserData, setEditUserData] = useState<any>(null);

    useEffect(() => {
        loadIdibuUsersList();
    }, []);

    const loadIdibuUsersList = useCallback(
        debounce(() => {
            const userInfo = JSON.parse(localStorage.getItem("demoUserInfo") || "" as string)
            trackPromise(
                ApiService.postWithData('admin', `getIdibuSenderList`, { clientId: userLocalData.getvalue('clientId'), idibuTeamId: userInfo?.idibuTeams[0] }).then((res) => {
                    if (res?.data?.Success) {
                        setUsersList(res?.data?.idibuSenderList || []);
                    }
                })
            );
        }, 400),
        []
    );

    const handleActionsClick = (type: "Edit" | "Delete", rowData: any) => {
        switch (type) {
            case "Edit":
                // ApiService.saveAuditLog();
                trackPromise(
                    ApiService.postWithData("admin", "getUserDetails", { idibuId: rowData.idibuId }).then((res: any) => {
                        const profileDetails = res?.data?.idibu?.response?.profile;
                        if (res?.data?.Success && profileDetails) {
                            setEditUserData({
                                ...profileDetails,
                                recrId: rowData.recrId
                            });
                            setOpenAddUser(true);
                        } else {
                            setEditUserData(null);
                            showToaster(res?.data?.Message, "error");
                        }
                    })
                );
                break;
            case "Delete":
                // ApiService.saveAuditLog();
                trackPromise(
                    ApiService.postWithData("admin", "deleteRecruiter", {
                        "recrId": rowData.recrId,
                        "idibuId": rowData.idibuId,
                        "clientId": userLocalData.getvalue("clientId")
                    }).then((res: any) => {
                        if (res?.data?.Success) {
                            loadIdibuUsersList();
                            showToaster(res?.data?.Message, "success");
                        } else showToaster(res?.data?.Message, "error");
                    })
                );
                break;
            default: break;
        }
    }

    const columns: MRT_ColumnDef<any>[] = useMemo(() => [
        {
            accessorKey: "firstName",
            header: "User Name",
            Cell: ({ row }) => (
                <span>{`${row.original.firstName} ${row.original.lastName}`}</span>
            )
        },
        { accessorKey: "email", header: "Email" },
        {
            accessorKey: "action",
            header: "Actions",
            Cell: ({ row }) => (
                <Stack direction={"row"} spacing={0.4} alignItems={"center"}>
                    <IconButton size='small' color='primary' onClick={() => { handleActionsClick("Edit", row.original) }}><EditRounded /></IconButton>
                    <IconButton size='small' color='error' onClick={() => { handleActionsClick("Delete", row.original) }}><DeleteRounded /></IconButton>
                </Stack>
            )
        },
    ], [usersList]);

    const filteredData = useMemo(() => {
        const records = usersList.filter((each: any) => {
            let search = searchValue?.toLowerCase()?.trim() || "";
            return each.firstName?.toLowerCase().includes(search) || each.lastName?.toLowerCase().includes(search) || each.email?.toLowerCase().includes(search)
        });
        setRowCount(records.length || 0)
        return records;
    }, [usersList, searchValue]);

    return (
        <Dialog maxWidth="xl" fullWidth open={openDialog} onClose={closeDialog} id="IdibuUsersList">
            <DialogTitle>
                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                    <Typography variant='h6'>Idibu Users List</Typography>
                    <IconButton size='small' onClick={() => closeDialog()}><CloseRounded htmlColor='#919191' /></IconButton>
                </Stack>
            </DialogTitle>
            <Divider />
            <DialogContent className='pt-2'>
                <Stack position={"relative"}>
                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} className='idibu-list-header'>
                        <TextField
                            value={searchValue}
                            onChange={(e: any) => {
                                setPagination((prev) => ({
                                    ...prev, pageIndex: 0
                                }))
                                setSearchValue(e.target.value);
                            }}
                            name="Search"
                            id={"Search"}
                            placeholder='Search Idibu Users'
                            slotProps={{
                                input: {
                                    startAdornment: <InputAdornment position="start"><SearchOutlined fontSize='small' htmlColor='#757575' /></InputAdornment>,
                                    endAdornment: <InputAdornment position="end" disablePointerEvents={searchValue ? false : true}>
                                        <CloseRounded fontSize='small' htmlColor={searchValue ? "#757575" : "#ebebeb"} sx={{ cursor: "pointer" }} onClick={() => {
                                            setPagination((prev) => ({
                                                ...prev, pageIndex: 0
                                            }));
                                            setSearchValue("");
                                        }} />
                                    </InputAdornment>
                                }
                            }}
                            size='small'
                        />
                        <Button variant='contained' color='primary' onClick={() => {
                            // ApiService.saveAuditLog();
                            setOpenAddUser(true);
                            setEditUserData(null);
                        }}>Add User</Button>
                    </Stack>
                    <div className="MRTableCustom pl-0">
                        <MaterialReactTable
                            columns={columns}
                            data={filteredData}
                            initialState={{
                                density: "compact",
                                showGlobalFilter: false
                            }}
                            state={{
                                pagination,
                                globalFilter,

                            }}
                            muiPaginationProps={{
                                rowsPerPageOptions: [10],
                                showFirstButton: false,
                                showLastButton: false,
                                SelectProps: {
                                    style: { display: 'none' }, // Hide the rows per page dropdown
                                },
                            }}
                            enablePagination
                            renderBottomToolbarCustomActions={() => (
                                <CustomPagination
                                    page={pagination.pageIndex}
                                    rowsPerPage={pagination.pageSize}
                                    rowCount={rowCount}
                                    onChangePage={(page: any) => setPagination({ ...pagination, pageIndex: page })}
                                />
                            )}
                            onGlobalFilterChange={setGlobalFilter}
                            enableDensityToggle={false}
                            enableFullScreenToggle={false}
                            enableGlobalFilterModes={false}
                            enableGlobalFilter={false}
                            columnResizeMode="onChange"
                            getRowId={row => row.idibuId}
                            enableStickyHeader
                            icons={{
                                ArrowDownwardIcon: (props: any) => (
                                    <SwitchLeftIcon {...props} />
                                ),
                            }}
                        />
                    </div>
                </Stack>
                {openAddUser ?
                    <AddIdibuUser
                        openDialog={openAddUser}
                        closeDialog={(reload: any) => {
                            if (reload) loadIdibuUsersList();
                            setEditUserData(null);
                            setOpenAddUser(false);
                        }}
                        editUserData={editUserData}
                        isEdit={editUserData ? true : false}
                    /> : null}
            </DialogContent>
        </Dialog >
    )
}

export default IdibuUsers