import { useCallback, useRef, useEffect, useState, useMemo } from '../../../../shared/modules/React'
import { Button, IconButton } from "../../../../shared/modules/MaterialImports/Button";
import { Typography } from "../../../../shared/modules/MaterialImports/Typography";
import InviteUser from '../Users/InviteUser/InviteUser';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Tooltip } from '../../../../shared/modules/MaterialImports/ToolTip';
import { MaterialReactTable, MRT_ColumnDef } from "../../../../shared/modules/MaterialReactTable";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Grid } from '../../../../shared/modules/MaterialImports/Grid2';
import AddUser from './AddUser/AddUser';
import { confirmDialog } from '../../../shared/ConfirmDialog/ConfirmDialog';
import CircleIcon from '@mui/icons-material/Circle';
import { showToaster } from '../../../shared/SnackBar/SnackBar';
import { trackPromise } from '../../../../shared/modules/PromiseTrackter';
import ApiService from "../../../../shared/api/api";
import { userLocalData } from '../../../../shared/services/userData';
import { DateTime } from '../../../../shared/modules/Luxon';

import './Users.scss';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '../../../../shared/modules/MaterialImports/Dialog';
import { AxiosResponse } from 'axios';
import { FormControl, InputAdornment, InputLabel } from '../../../../shared/modules/MaterialImports/FormInputs';
import { Select } from '../../../../shared/modules/MaterialImports/FormElements';
import { MenuItem } from '../../../../shared/modules/MaterialImports/Menu';
import { MRT_RowSelectionState } from 'material-react-table';
import formatStringToUsPhoneNumber from '../../../../shared/services/UsPhoneFormat';
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
// import { SvgIconProps } from '@mui/material/SvgIcon';
import { Loader } from '../../../shared/Loader/Loader';
import CustomPagination from '../../../shared/CustomPagination/CustomPagination';
import { debounce } from "lodash";
import InsertChartOutlinedSharpIcon from '@mui/icons-material/InsertChartOutlinedSharp';
import { Divider } from './../../../../shared/modules/MaterialImports/Divider';
import CloseIcon from '@mui/icons-material/Close';

import AuditLog from './AuditLog';
import './AuditLog.scss';
import InviteTeamMembers from '../Invite/InviteTeamMembers/InviteTeamMembers';
import SearchOutlined from '@mui/icons-material/SearchOutlined';

interface Role {
    roleId: string;
    roleName: string;
}

interface Status {
    statusId: string;
    statusName: string;
}
interface UserData {
    recrIndex: number;

    roleId: number;
    roleName: string;
    statusId: number;
    statusName: string;

    recrId: number;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    phone: string;
    timeZone: string;
    passWord: string;
    createdDate: string;
    invitedId?: number;

}

const Users = () => {
    const [userData, setUserData] = useState<UserData[]>([]);
    // const [filtersExpand,] = useState(false);
    const [openInviteUserModal, setOpenInviteUserModal] = useState(false);
    const [openAddUserModal, setOpenAddUserModal] = useState(false);
    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
    // const currentSelectCount = useRef(0);
    const [roleData, setRoleData] = useState<Role[]>([]);
    const [statusData, setStatusData] = useState<Status[]>([]);
    const [selectedRoleId, setSelectedRoleId] = useState('');
    const [selectedStatusId, setSelectedStatusId] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);
    const [openRoleChangeDialog, setOpenRoleChangeDialog] = useState(false);
    const [openStatusChangeDialog, setOpenStatusChangeDialog] = useState(false);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    // const [rowCount, setRowCount] = useState(0);
    const [globalFilter, setGlobalFilter] = useState('');
    const [filteredData, setFilteredData] = useState<UserData[]>([]);

    const [editUserData, setEditUserData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        timeZone: "",
        password: "",
        confirmPassword: "",
        recrId: "",
        statusId: "",
        roleId: ""
    });

    const isUserAddSettingEnabled = (userLocalData.checkSettings(100001) === 5) || (userLocalData.checkSettings(100001) === 6);
    const isUserDeleteSettingEnabled = (userLocalData.checkSettings(100001) === 6);
    const [searchValue, setSearchValue] = useState("");
    const [rowCount, setRowCount] = useState(0);

    const getUsersList = useCallback(debounce(() => {
        // https://app.curately.ai/Accuick_API/Curately/Admin/recruiters_list.jsp?clientId=3

        let clientId = userLocalData.getvalue('clientId');
        let recrId = userLocalData.getvalue('recrId');


        trackPromise(
            // ApiService.getCall(216, 'DemoCurately/listadminusers')
            // ApiService.getByParams('admin', 'getRecruitersList', { clientId: userLocalData.getvalue('clientId'),recrId : userLocalData.getvalue('recrId') })
            ApiService.getCall('admin', `getRecruitersList/${clientId}/${recrId}`)
                .then(
                    (response) => {
                        // console.log(response.data)
                        if (response.data.Success === true) {
                            for (let ul = 0; ul < response.data.list.length; ul++) {
                                response.data.list[ul].recrIndex = ul;

                            }
                            setUserData(response.data.list);
                            // setRowCount(response.data.list.length)
                        } else {
                            showToaster(`${response.data.Message ? response.data.Message : 'An error occured while retrieving Users list'}`, 'error')
                        }
                        // console.log(response.data.List);
                        // const result = response.data;
                        // console.log(result);
                    }
                )
        )
    }, 400), [])
    const getRolesList = useCallback(debounce(() => {
        // http://35.155.202.216:8080/QADemoCurately/getRoleList
        trackPromise(
            ApiService.getCall('admin', `getRoleList/${userLocalData.getvalue('clientId')}`)
                .then((response: AxiosResponse) => {
                    const respData = response.data;
                    if (respData.Success) {
                        setRoleData(respData.list);
                    }
                })
        )
    }, 400), [])
    const getStatusList = useCallback(debounce(() => {

        let clientId = userLocalData.getvalue('clientId');
        let recrId = userLocalData.getvalue('recrId');
        // https://app.curately.ai/Accuick_API/Curately/Admin/recruiters_status_list.jsp?clientId=3
        trackPromise(
            ApiService.getCall("admin", `getRecruitersStatusList/${clientId}/${recrId}`)
                .then((response: AxiosResponse) => {
                    const respData = response.data;
                    // console.log(respData)
                    if (respData.Success === true) {
                        setStatusData(respData.list);
                    }
                    // if (respData.Success) {
                    //     setStatusData(respData.list);
                    // }
                })
        )
    }, 400), [])
    // const debouncedGetUsersList = debounce(getUsersList, 300);
    // const debouncedGetStatusList = debounce(getStatusList, 300);
    // const debouncedGetRolesList = debounce(getRolesList, 300);
    // console.log(statusData);
    const handleUpdateRole = () => {
        const selectedUserIds = Object.keys(rowSelection).filter(key => userData[Number(key)].recrId).map((i) => Number(userData[Number(i)].recrId));
        // console.log(selectedUserIds);
        const requestData = {
            roleId: selectedRoleId,
            recrId: selectedUserIds.join(','),
            clientId: userLocalData.getvalue('clientId')
        };

        if (selectedUserIds.length > 0) {
            trackPromise(
                ApiService.postWithData('admin', 'getRecruiterRolesUpdate', requestData)

                    // ApiService.getByParams(193, 'Curately/Admin/recruiter_roles_update.jsp', requestData)
                    .then((response) => {
                        //  console.log(response.data);
                        if (response.data.Success) {
                            showToaster("Role updated successfully", "success");
                            setOpenRoleChangeDialog(false);
                            getUsersList();
                        } else {
                            showToaster("Failed to update role: " + response.data.Message, "error");
                        }
                    })
                    .catch((error) => {
                        console.error("Failed to update role:", error);
                        showToaster("An error occurred while updating the role", "error");
                    })
            );
        } else {
            showToaster("Please select at least one user.", "error");
        }
    };
    const handleUpdateStatus = () => {
        const selectedUserIds = Object.keys(rowSelection).filter(key => userData[Number(key)].recrId).map((i) => Number(userData[Number(i)].recrId));
        //     console.log(selectedUserIds);
        const requestData = {
            status: selectedStatusId,
            recrId: selectedUserIds.join(','),
            clientId: userLocalData.getvalue('clientId')
        };

        if (selectedUserIds.length > 0) {
            trackPromise(
                ApiService.postWithData('admin', 'getRecruiterStatusUpdate', requestData)
                    .then((response) => {
                        //  console.log(response.data);
                        if (response.data.Message, "Success") {
                            showToaster("Status updated successfully", "success");
                            setOpenStatusChangeDialog(false);
                            getUsersList();
                        } else {
                            showToaster("Failed to update role: " + response.data.Message, "error");
                        }
                    })
                    .catch((error) => {
                        console.error("Failed to update role:", error);
                        showToaster("An error occurred while updating the role", "error");
                    })
            );
        } else {
            showToaster("Please select at least one user.", "error");
        }
    };

    const handleOpenRoleChangeDialog = () => {
        // getRolesList();
        setOpenRoleChangeDialog(true);
        saveAuditLog(4216);
    };
    const handleOpenStatusChangeDialog = () => {
        // getStatusList();
        setOpenStatusChangeDialog(true);
        saveAuditLog(4217);
    };
    // const handleOpenInviteUser = () => {
    //     getRolesList();
    //     setOpenInviteUserModal(true);
    //     saveAuditLog(4219);

    // }

    const handleResendInviteUser = () => {

        // const selectedUserIds = Object.keys(rowSelection).filter(key => userData[Number(key)].recrIuserData[Number(rowSelection[i])].recrId);
        // console.log(selectedUserIds);
        // let errStatus = "";

        // const tempUsers = userData.filter((key: any, i: number) => selectedUserIds.includes(i.toString()));

        const inviteIds: any = Object.keys(rowSelection).filter(key => userData[Number(key)].invitedId).map(key => userData[Number(key)].invitedId);

        // tempUsers.map(obj => inviteIds.push(obj.invitedId))

        const payload = {
            recrId: userLocalData.getvalue('recrId'),
            invitedIds: inviteIds,
            clientId: userLocalData.getvalue('clientId')
        };

        trackPromise(
            ApiService.postWithData("admin", 'sendInviteEmail', payload)
                .then((response) => {
                    console.log(response);
                    if (response.data.Success) {
                        showToaster(`Invitation sent successfully`, "success");
                        setRowSelection({});
                    } else {
                        showToaster(`Failed to send the invitation:` + response.data.Message, "error");
                    }
                })
                .catch((error) => {
                    showToaster("An error occurred while sending the invite", "error");
                    console.log(`An error occurred while sending the invite:` + error);
                })
        );

        // if (selectedUserIds.length > 0) {
        //     selectedUserIds && selectedUserIds?.map((item: any, _idx: number) => {
        //         const tempUserIds = userData.filter((key: any) => Number(key.recrId) === Number(item));

        //         const requestData = {
        //             roleId: tempUserIds[0]?.roleId,
        //             recrId: item,
        //             clientId: userLocalData.getvalue('clientId'),
        //             senderEmail: userLocalData.getvalue('email'),
        //             senderName: userLocalData.getvalue('userName')

        //         };
        //         trackPromise(
        //             ApiService.postWithData("admin", 'recruiterInvite', requestData)
        //                 .then((response) => {
        //                     // console.log(response.data);
        //                     if (response.data.Message === "Success") {
        //                         showToaster(`Invitation sent successfully`, "success");
        //                         setRowSelection({});
        //                     } else {
        //                         showToaster(`Failed to send the invitation:` + response.data.Message, "error");
        //                     }
        //                 })
        //                 .catch((error) => {
        //                     showToaster("An error occurred while sending the invite", "error");
        //                     console.log(`An error occurred while sending the invite:` + error);
        //                 })
        //         );

        //     }) /// loop

        // } else {
        //     showToaster("Please select at least one user.", "error");
        // }
        saveAuditLog(4218);
    }
    // http://35.155.202.216:8080/DemoCurately/listadminusers 

    // http://35.155.202.216:8080/DemoCurately/getAdminuserDetails/19 

    const fetchUserDetails = (id: string) => {
        return new Promise((resolve, reject) => {
            // https://app.curately.ai/Accuick_API/Curately/Admin/recruiter_action.jsp?clientId=3&recrId=61&action=get
            trackPromise(
                // ApiService.getCall(216, `DemoCurately/getAdminuserDetails/${recrid}`)
                // ApiService.getByParams(193, `Curately/Admin/recruiter_action.jsp`, { clientId: userLocalData.getvalue('clientId'), action: 'get', recrId })
                ApiService.postWithData('admin', 'getRecruiterAction', { clientId: userLocalData.getvalue('clientId'), action: 'get', recrId: id })
                    .then((result) => {
                        //  console.log(result.data);
                        if (result.data.Success && result.data.List?.length) {
                            const userDetails = result.data.List[0];
                            setEditUserData({
                                email: userDetails.email,
                                // email: userDetails.email.split("@")[0],
                                firstName: userDetails.firstName,
                                lastName: userDetails.lastName,
                                phone: userDetails.phone ? formatStringToUsPhoneNumber(userDetails.phone) : "",
                                timeZone: userDetails.timeZone,
                                password: userDetails.password,
                                confirmPassword: userDetails.password,
                                recrId: id,
                                statusId: userDetails.statusId,
                                roleId: userDetails.roleId,
                            })
                        }
                        setIsEditMode(true);
                        resolve(result);
                    })
                    .catch((error) => {
                        console.error('Error fetching User details:', error);
                        reject(error);
                    }))
        })
    }

    const deleteUser = (id: string, invitedId: string | null) => {
        ApiService.postWithData('admin', `getRecruiterAction`, { clientId: userLocalData.getvalue('clientId'), action: 'delete', recrId: id, invitedId: invitedId }).then((response) => {
            //  console.log(response);
            if (response.data.Message, "Success") {
                showToaster("User has been deleted Successfully", 'success');
                getUsersList();
            } else {
                showToaster(response.data.Message ? response.data.Message : "An error occured while deleting", 'error');
            }
        })
    }

    const openEditModal = (recrId: any) => {
        fetchUserDetails(recrId)
            .then(() => {
                setOpenAddUserModal(true); // Open the modal only after state is updated
                saveAuditLog(4224);
            })
            .catch(error => {
                showToaster("Unable to fetch User Data", error)
            });
    };
    // const fetchInitialData = useCallback(() => {
    //     getUsersList();
    //     getStatusList();
    // }, []);

    useEffect(() => {
        getUsersList();
        getStatusList();
        getRolesList();

    }, []);


    // useEffect(() => {
    //     debouncedGetUsersList();
    //     debouncedGetStatusList();
    //     debouncedGetRolesList();
    // }, []);




    const openAddModal = () => {
        setEditUserData({
            email: "",
            firstName: "",
            lastName: "",
            phone: "",
            timeZone: "",
            password: "",
            confirmPassword: "",
            recrId: "",
            statusId: "",
            roleId: ""
        })
        setOpenAddUserModal(true);
        setIsEditMode(false);
        saveAuditLog(4221);
    };
    const columns: MRT_ColumnDef<any>[] = useMemo(
        () => [
            {
                accessorKey: 'fullName',
                header: 'Fullname',
                enableColumnPinning: true,
                // accessorFn: (row) => `${row.firstName} ${row.lastName}`,
            },
            {
                accessorKey: 'roleName',
                header: 'Role'
            },
            {
                accessorKey: 'email',
                header: 'Email',
                Cell: ({ row }) => (
                    <span className='tt-lower'> {row.original.email} </span>
                )
            },
            {
                accessorKey: 'statusName',
                header: 'Status',
                // accessorFn: (row) => `${row.statusName}`,
                Cell: ({ row }) => (
                    <div>
                        <span>
                            {
                                row.original.statusId === 1 ? <span className="c-green"><CircleIcon className='userStatus' />Active</span> :
                                    row.original.statusId === 2 ? <span className='c-grey'><CircleIcon className='userStatus' />Pending</span> :
                                        row.original.statusId === 3 ? <span className='c-orange'><CircleIcon className='userStatus' />InActive</span>
                                            : ""
                            }
                        </span>
                    </div>
                )
            },

            {
                accessorKey: 'createdDate',
                header: 'Created on',
                Cell: ({ row }) => (
                    <span>

                        {row?.original?.createdDate ? DateTime.fromFormat(
                            row?.original?.createdDate?.substring(0, 19),
                            "yyyy-MM-dd hh:mm:ss"
                        ).toFormat("MM/dd/yyyy ") : ""}

                    </span>
                )
            },
            {
                accessorKey: 'action',
                header: 'Action',
                enableSorting: false,
                Cell: ({ row }) => (
                    <div>
                        {/* <Tooltip title="Mail">
                                <span><MailOutlineIcon
                                    sx={{ color: 'primary' }}
                                    className="cursor-pointer"
                                /></span>
                            </Tooltip> */}
                        {
                            (isUserAddSettingEnabled && row.original.recrId) ?
                                <Tooltip title="Edit">
                                    <span><ModeEditOutlineOutlinedIcon
                                        className="fs-18 cursor-pointer c-lightOrange mr-2"
                                        onClick={() => openEditModal(row.original.recrId)}
                                    /></span>
                                </Tooltip>
                                :
                                null
                        }
                        {
                            isUserDeleteSettingEnabled ?

                                <Tooltip title="Delete">
                                    <span><DeleteOutlineOutlinedIcon
                                        className="fs-18 cursor-pointer c-red mr-2"
                                        onClick={() => {
                                            confirmDialog(`Are you sure you want to delete ${row.original.fullName ? row.original.fullName : row.original.email} record ?`,
                                                () => {
                                                    deleteUser(row.original.recrId, row.original.invitedId ? row.original.invitedId : null);
                                                    saveAuditLog(4225)
                                                }, 'warning'
                                            );
                                        }} />
                                    </span>
                                </Tooltip>
                                :
                                null
                        }
                        {
                            row.original.recrId ?
                                <Tooltip title="Audit Log">
                                    <span><InsertChartOutlinedSharpIcon
                                        className="fs-18 cursor-pointer c-blue"
                                        onClick={() => openAuditLog(row.original.recrId, row.original.fullName)}
                                    />
                                    </span>
                                </Tooltip>
                                :
                                null
                        }
                    </div>
                )
            },
        ], []
    );
    // useEffect(() => {
    //     getUsersList();
    // }, []);
    // const isDisabled = Object.keys(rowSelection).length === 0;
    const [pendingRecords, setPendingRecords] = useState<number[]>([]);





    const isRoleDisabled = () => {
        const pendingIds = Object.keys(rowSelection).filter(key => Number(rowSelection[key])).map((i) => Number(i));
        let selectedRowsArray = Object.keys(rowSelection).filter(key => userData[Number(key)].recrId).map((i) => Number(userData[Number(i)].recrId));
        if ((selectedRowsArray.length === 0) || ((pendingIds.some(element => pendingRecords.includes(element))))) return true;
        return !(selectedRowsArray.length);
    }


    // const isStatusDisabled = () => {
    //     const pendingIds = Object.keys(rowSelection).filter(key => Number(rowSelection[key])).map((i) => Number(i));
    //     let selectedRowsArray = Object.keys(rowSelection).filter(key => userData[Number(key)].recrId).map((i) => Number(userData[Number(i)].recrId));
    //     if ((selectedRowsArray.length === 0) || ((pendingIds.some(element => pendingRecords.includes(element))))) return true;
    //     return !(selectedRowsArray.length);
    // }

    const isResendDisabled = () => {
        const selectedRowsArray = Object.keys(rowSelection).filter(key => Number(rowSelection[key])).map((i) => Number(i));
        if (selectedRowsArray.length === 0) return true;
        return !(selectedRowsArray.every(element => pendingRecords.includes(element)));
        // return pendingRecords.toString() !== Object.keys(rowSelection).filter(key => rowSelection[key]).toString();
    }

    // useEffect(() => {
    //     const filtered = userData.filter(row => {
    //         return (
    //             row.fullName.toLowerCase().includes(globalFilter.toLowerCase()) ||
    //             row.email.toLowerCase().includes(globalFilter.toLowerCase())
    //         );
    //     });
    //     setFilteredData(filtered);
    //     setPagination(prev => ({
    //         ...prev,
    //         pageIndex: 0
    //     }));
    // }, [globalFilter, userData]);


    // const rowCount = filteredData.length;

    useEffect(() => {
        const filtered = userData.filter(row => {
            const filter = globalFilter || ''; // Ensure globalFilter is a string
            return (
                row.fullName?.toLowerCase().includes(filter.toLowerCase()) ||
                row.email?.toLowerCase().includes(filter.toLowerCase())
            );
        });
        setFilteredData(filtered);
        setPagination(prev => ({
            ...prev,
            pageIndex: 0
        }));

        const pendingRec: any = [];
        userData.map((obj) => {
            if (obj.statusName === 'Pending') {
                pendingRec.push(obj.recrIndex);
            }
        });

        setPendingRecords(pendingRec);

    }, [globalFilter, userData]);

    // Calculate rowCount
    // const rowCount = filteredData.length;
    const paginatedData = useMemo(() => {
        // setRowSelection({})
        // const start = pagination.pageIndex * pagination.pageSize;
        // const end = start + pagination.pageSize;
        // return filteredData.slice(start, end);
        const finalSearchValue = searchValue.toLowerCase().trim();
        const records = filteredData.filter((each) => {
            return each.fullName?.toLowerCase()?.includes(finalSearchValue) || each?.email?.toLowerCase()?.includes(finalSearchValue)
        });
        setRowCount(records.length)
        return records;
    }, [filteredData, searchValue]);

    const [auditTableOpen, setAuditTableOpen] = useState(false);
    const selectedUser = useRef({
        id: "",
        name: ""
    });

    const openAuditLog = (recrId: string, name: string) => {
        selectedUser.current = {
            id: recrId,
            name: name
        };
        setAuditTableOpen(true);
        saveAuditLog(4226);
    };

    const closeAuditLog = () => {
        setAuditTableOpen(false);
    };
    const saveAuditLog = (id: number) => {
        ApiService.saveAuditLog(id);
    }

    useEffect(() => {
        saveAuditLog(4215);
    }, []);

    const [openInviteMembersPopup, setOpenInviteMembersPopup] = useState(false);


    return (
        <div>
            <div className="pt-3 px-3 " id="Users">
                <Grid
                    direction="row"
                    className="customCard px-4 py-2"
                    justifyContent="space-between"
                    alignItems="center"
                    display="flex"
                    sx={{ minHeight: 'auto !important' }}
                >
                    <Typography variant="h6" className="header">
                        Users
                    </Typography>
                    {
                        isUserAddSettingEnabled ?
                            <Grid direction="row" spacing={1} container>
                                <Button variant="outlined" color="secondary" size="small"
                                    className={`user ${isRoleDisabled() ? 'user-disabled' : ''}`}
                                    disabled={isRoleDisabled()}
                                    onClick={handleOpenRoleChangeDialog}

                                >
                                    Change Role
                                </Button>
                                <Button
                                    className={`user ${isRoleDisabled() ? 'user-disabled' : ''}`}
                                    disabled={isRoleDisabled()}
                                    variant="outlined" color="secondary"
                                    size="small"
                                    onClick={handleOpenStatusChangeDialog}

                                >
                                    Change Status
                                </Button>

                                <Button className={`user ${isResendDisabled() ? 'user-disabled' : ''}`}
                                    disabled={isResendDisabled()}
                                    variant="outlined" color="secondary" size="small"
                                    onClick={handleResendInviteUser}
                                >
                                    <MailOutlineIcon />
                                    Resend Invitation
                                </Button>
                                {
                                    (!userLocalData.getvalue('invitedBy') && (userLocalData.getvalue('paymentType') !== 1)) ?
                                        <Button className='inviteUser' variant="outlined" color="secondary" size="small"
                                            onClick={() => {
                                                // handleOpenInviteUser();
                                                setOpenInviteMembersPopup(true);
                                            }}
                                        >
                                            <AddCircleOutlineIcon />
                                            Invite User
                                        </Button>
                                        :
                                        null
                                }
                                {/* {
                                    userLocalData.isClient7() ?
                                        <></>
                                        :
                                        <Button className='user' variant="outlined" color="secondary" size="small" onClick={openAddModal}>
                                            <AddCircleOutlineIcon />
                                            Add User
                                        </Button>

                                } */}
                                {
                                    (openInviteUserModal && roleData) ?
                                        <InviteUser
                                            open={openInviteUserModal}
                                            closePopup={() => setOpenInviteUserModal(false)}
                                            roleData={roleData}
                                        />
                                        :
                                        null
                                }
                                {
                                    (openAddUserModal) ?
                                        <AddUser
                                            open={openAddUserModal}
                                            closePopup={(e: 'add' | '') => {
                                                if (e) {
                                                    getUsersList();
                                                }
                                                setOpenAddUserModal(false)
                                            }}
                                            userData={editUserData}
                                            add={!isEditMode}
                                        />
                                        :
                                        null
                                }

                            </Grid>
                            :
                            null
                    }
                </Grid>
                <Grid container className="MRTableCustom customCard p-0 filterExpand-grid" >
                    <Grid className='w-100'>
                        <MaterialReactTable
                            columns={columns}
                            enableRowSelection
                            data={paginatedData}
                            onRowSelectionChange={setRowSelection}
                            state={{
                                rowSelection,
                                pagination,
                                globalFilter,
                            }}
                            initialState={{
                                density: 'compact',
                                showGlobalFilter: true,
                                columnPinning: { left: ['mrt-row-select', 'fullName'] },
                            }}
                            enableGlobalFilterModes
                            getRowId={row => row.recrIndex}
                            enableStickyHeader
                            enablePagination={true}
                            icons={{
                                ArrowDownwardIcon: (props: any) => <SwitchLeftIcon {...props} />
                            }}
                            renderBottomToolbarCustomActions={() => (
                                <CustomPagination
                                    page={pagination.pageIndex}
                                    rowsPerPage={10}
                                    rowCount={rowCount}
                                    onChangePage={(page: any) => {
                                        setRowSelection({});
                                        setPagination({ ...pagination, pageIndex: page, pageSize: 10 });
                                    }}
                                />
                            )}
                            onGlobalFilterChange={setGlobalFilter}
                            muiSearchTextFieldProps={{
                                value: searchValue,
                                onChange: (e: any) => {
                                    setPagination({ ...pagination, pageIndex: 0 });
                                    setSearchValue(e.target.value);
                                },
                                slotProps: {
                                    input: {
                                        startAdornment: <InputAdornment position="start"><SearchOutlined fontSize='small' htmlColor='#757575' /></InputAdornment>,
                                        endAdornment: <IconButton
                                            size='small'
                                            disabled={["", null, undefined].includes(searchValue)}
                                            onClick={() => {
                                                setPagination({ ...pagination, pageIndex: 0 });
                                                setSearchValue("");
                                            }}
                                        ><CloseIcon fontSize='small' /></IconButton>
                                    }
                                }
                            }}
                            muiPaginationProps={{
                                showFirstButton: false,
                                showLastButton: false,
                                SelectProps: { style: { display: "none" } },
                            }}
                        />
                    </Grid>
                </Grid>
            </div>


            <Dialog PaperProps={{
                style: { width: '400px', height: 'auto', maxHeight: '90vh' },
            }} open={openRoleChangeDialog} onClose={() => setOpenRoleChangeDialog(false)}>
                <DialogTitle>Change Role</DialogTitle>
                <DialogContent style={{ paddingTop: '8px' }}>
                    <Loader />
                    <FormControl fullWidth size="small">
                        <InputLabel id="role-select-label" >Role</InputLabel>
                        <Select
                            labelId="role-select-label"
                            id="role-select"
                            size="small"
                            value={selectedRoleId}
                            onChange={(event) => setSelectedRoleId(event.target.value)}
                            label="Role"
                        >
                            {roleData.map((role) => (
                                <MenuItem key={role.roleId} value={role.roleId}>{role.roleName}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Include other inputs or content as needed */}
                </DialogContent>
                <DialogActions>
                    <Button color='primary' variant='outlined' size="small" onClick={() => setOpenRoleChangeDialog(false)}>Cancel</Button>
                    <Button color='primary' variant='contained' size="small" onClick={handleUpdateRole}>Confirm</Button>
                </DialogActions>
            </Dialog>
            <Dialog PaperProps={{
                style: { width: '400px', height: 'auto', maxHeight: '90vh' },
            }} open={openStatusChangeDialog} onClose={() => setOpenStatusChangeDialog(false)}>
                <DialogTitle>Change Status</DialogTitle>
                <DialogContent style={{ paddingTop: '8px' }}>
                    <Loader />
                    <FormControl fullWidth size="small">
                        <InputLabel id="status-select-label" >Status</InputLabel>
                        <Select
                            labelId="status-select-label"
                            id="status-select"
                            size="small"
                            value={selectedStatusId}
                            onChange={(event) => setSelectedStatusId(event.target.value)}
                            label="Status"
                        >
                            {statusData.map((val) => (
                                <MenuItem key={val.statusId} value={val.statusId} >{val.statusName}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Include other inputs or content as needed */}
                </DialogContent>
                <DialogActions>
                    <Button color='primary' variant='outlined' size="small" onClick={() => setOpenStatusChangeDialog(false)}>Cancel</Button>
                    <Button color='primary' variant='contained' size="small" onClick={handleUpdateStatus}>Confirm</Button>
                </DialogActions>
            </Dialog>
            <div>
                {auditTableOpen ? <Dialog
                    maxWidth={'xl'}
                    // sx={{ maxWidth: '650px !important' }}
                    fullWidth={false} open={auditTableOpen} className='AuditLogDialog'>
                    <DialogTitle
                        className='py-2'
                    >
                        <Grid container direction="row" justifyContent="space-between" alignItems="center" >
                            <span className='addHeader'>Audit Log - {selectedUser.current.name}</span>
                            <CloseIcon onClick={closeAuditLog} />
                        </Grid>
                    </DialogTitle>
                    <Divider />
                    <DialogContent className='px-5' sx={{ width: 750 }}>
                        <AuditLog userId={selectedUser.current.id} />
                    </DialogContent>
                </Dialog>
                    : null}
            </div>

            {
                openInviteMembersPopup ?
                    <Dialog open={openInviteMembersPopup} onClose={() => setOpenInviteMembersPopup(false)} >
                        <DialogTitle>
                            <Grid container direction="row" justifyContent="space-between" alignItems="center" >
                                <span className='addHeader'>
                                    Invite Team Members
                                </span>
                                <CloseIcon onClick={() => setOpenInviteMembersPopup(false)} />

                            </Grid>
                        </DialogTitle>
                        <DialogContent sx={{ minWidth: 500 }} className='pt-4'>
                            <InviteTeamMembers closeInvitePopup={(refresh) => {
                                if (refresh) {
                                    getUsersList();
                                }
                                setOpenInviteMembersPopup(false);
                            }} />
                        </DialogContent>

                    </Dialog>
                    :
                    null
            }


        </div>
    )
}

export default Users
