import { useEffect, useMemo, useState } from '../../../../shared/modules/React';
import { trackPromise } from 'react-promise-tracker';
import ApiService from '../../../../shared/api/api';

import { userLocalData } from '../../../../shared/services/userData';
// import { showToaster } from '../../../shared/SnackBar/SnackBar';
import { Grid } from '../../../../shared/modules/MaterialImports/Grid2';
import { Typography } from '../../../../shared/modules/MaterialImports/Typography';
import { Stack } from '../../../../shared/modules/MaterialImports/Stack';
import { Button } from '../../../../shared/modules/MaterialImports/Button';
import { Dialog, DialogContent, DialogTitle, CloseIcon } from '../../../../shared/modules/MaterialImports/Dialog';
import { MaterialReactTable, type MRT_ColumnDef } from "../../../../shared/modules/MaterialReactTable";


import InviteTeamMembers from '../Invite/InviteTeamMembers/InviteTeamMembers';
import LuxonDateParser from '../../../../shared/services/LuxonDateParser';


import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';


import { showToaster } from '../../../shared/SnackBar/SnackBar';

import './TeamMembers.scss';
import { confirmDialog } from '../../../shared/ConfirmDialog/ConfirmDialog';
//import { RoleDataInterface } from '../Roles/Roles';
import { TextField } from '../../../../shared/modules/MaterialImports/TextField';
import { MenuItem } from '../../../../shared/modules/MaterialImports/Menu';

interface TeammateInterface {
    roleName: string;
    email: string;
    invitedDate: string;
    name: string;
    recrId: number;
    status: string;
    roleId: number;
    invitedId: number;
}

const TeamMembers = () => {

    const [teamMembersList, setTeamMembersList] = useState<TeammateInterface[]>([]);
    const [openInviteMembersPopup, setOpenInviteMembersPopup] = useState(false);

    const [roleData, setRoleData] = useState<any>([]);


    useEffect(() => {
        getRolesList();
        getInvitedRecruiterList();
    }, []);

    const getRolesList = () => {
        // http://35.155.202.216:8080/QADemoCurately/getRoleList
        trackPromise(
            ApiService.postWithData('admin', `getRoleList`, {
                "recrId": userLocalData.getvalue('recrId'),
                "clientId": userLocalData.getvalue('clientId'),
            })
                .then((response: any) => {
                    const respData = response.data;
                    if (respData.Success) {
                        setRoleData([...respData.list]);
                    }
                })
        )
    }


    const handleRoleUpdate = (
        e: any,
        id: any,
        recrId: any
    ) => {
        trackPromise(
            ApiService.postWithData('admin', 'updateInviteRecruiterRole', {
                recrId: recrId,
                clientId: userLocalData.getvalue('clientId'),
                roleId: e.target.value,
                invitedId: id,
            }).then((response) => {
                if (response.data.Success) {
                    showToaster('Recuriter Role updated successfully.', 'success');
                    getInvitedRecruiterList();
                } else {
                    showToaster(response.data.Message ? response.data.Message : 'Error retriving Roles data', 'error');
                }
            })
        )
    };


    const getInvitedRecruiterList = () => {
        trackPromise(
            ApiService.postWithData('admin', 'getInvitedRecruiterDetails', {
                recrId: userLocalData.getvalue('recrId'),
                clientId: userLocalData.getvalue('clientId')
            }).then((response) => {
                if (response.data.Success) {
                    setTeamMembersList(response.data.invitedRecruiterDetails || []);
                }
            })
        )
    }


    const columns: MRT_ColumnDef<(typeof teamMembersList)[0]>[] = useMemo(
        () => [
            {
                accessorKey: "name",
                header: "Name",
                enableColumnPinning: true,
                size: 100,
            },
            {
                accessorKey: "email",
                header: "Email",
                Cell: ({ row }) => <span className='tt-lower'>{row.original.email}</span>,
                size: 100,
            },
            {
                accessorKey: "status",
                header: "Status",
                Cell: ({ row }) => (
                    <span className={`${row.original.status}`}>
                        {
                            row.original.status === "Pending" ?
                                <PendingActionsOutlinedIcon />
                                :
                                row.original.status === "Accepted" ?
                                    <DoneOutlinedIcon />
                                    :
                                    null
                        }
                        <span className='px-2'>{row.original.status}</span>
                    </span>
                )
            },
            {
                accessorKey: "invitedDate",
                header: "Invited Date",
                Cell: ({ row }) => (
                    <span>
                        {
                            row.original.invitedDate && LuxonDateParser.ServerEDTToSystem(row.original.invitedDate.substring(0, 19), "yyyy-MM-dd hh:mm:ss", "MM/dd/yyyy hh:mm a")
                        }
                    </span>
                ),
                size: 100,
            },
            {
                accessorKey: "roleId",
                header: "Role",
                Cell: ({ row }) => (

                    <span>
                        {row.original.status === "Accepted" ?
                            <TextField fullWidth className='mt-1'
                                size="small"
                                variant="outlined"
                                select
                                id={`role-${row.original.invitedId}`}
                                //   name={`role-${row.original.recrId}`}
                                value={row.original?.roleId}
                                onChange={(e) =>
                                    handleRoleUpdate(e, row.original.invitedId, row.original.recrId)
                                }
                            >
                                {
                                    roleData.map((option: any) => (
                                        <MenuItem value={option.roleId} key={option.roleId}>{option.roleName}</MenuItem>
                                    ))
                                }
                            </TextField> :
                            row.original?.roleName
                        }
                    </span>

                ),
                size: 80,
            },
            {
                accessorKey: "recrId",
                header: "",
                Cell: ({ row }) => {
                    let newRecrId = (row.original.status === "Accepted") ? row.original.recrId ? row.original.recrId : 0 : 0;

                    return (<span>
                        {
                            (row.original.status === "Pending") ?
                                <Button variant='outlined' color='primary' size='small' onClick={() => inviteByEmail(row.original.email)} >Re-invite</Button>
                                : null
                        }
                        {
                            <Button variant='outlined' color='error' size='small' className='ml-2' onClick={() => {
                                confirmDialog(`Are you sure you want to delete ${row.original.name ? row.original.name : row.original.email}?`, () => {
                                    removeMember(row.original.invitedId, newRecrId);
                                }, "warning");
                            }}>Remove</Button>
                        }
                    </span>)
                },

                size: 100,
            }

        ],
        [roleData]
    );


    const removeMember = (id: number, newRecrid: number) => {
        // https://qaadminapi.curately.ai/curatelyAdmin/deleteRecruiterFromInvite -> New post api
        trackPromise(
            ApiService.postWithData('admin', 'deleteRecruiterFromInvite', {
                "recrId": userLocalData.getvalue('recrId'),
                "clientId": userLocalData.getvalue('clientId'),
                "invitedRecrId": newRecrid,
                "invitedId": id
            }).then((response) => {
                console.log(response.data);
                if (response.data.Success) {
                    showToaster('Team Member has been removed successfully.', 'success');
                    getInvitedRecruiterList();
                } else {
                    showToaster(response.data.Message ? response.data.Message : 'An error occured while removing.', 'error');
                }
            })
        )
    }


    const inviteByEmail = (email: string) => {
        if (email) {
            trackPromise(
                ApiService.postWithData('admin', 'sendInviteEmail', {
                    "recrId": userLocalData.getvalue('recrId'),
                    "clientId": userLocalData.getvalue('clientId'),
                    "emailIds": [email]
                }).then((response) => {
                    console.log(response.data);
                    if (response.data.Success) {
                        showToaster('Invitation sent successfully.', 'success');
                    } else {
                        showToaster(response.data.Message ? response.data.Message : 'An error occured while inviting.', 'error');
                    }
                })
            )
        } else {
            showToaster('no email found to Invite', 'error');
        }
    }


    return <div id="TeamMembers">
        <Grid container direction="row" className="customCard px-4 py-2 mt-4" justifyContent="space-between" alignItems="center" display="flex" sx={{ minHeight: 'auto !important' }} >
            <Typography variant="h6" className="headerName">
                Team Members
            </Typography>
            <Stack direction="row" className="btn-container">
                {
                    (!userLocalData.getvalue('invitedBy') && (userLocalData.getvalue('paymentType') !== 1)) ?
                        <Button variant="contained" className="btnPrimary mr-3" size="small" onClick={() => { setOpenInviteMembersPopup(true) }}>Invite Members</Button>
                        :
                        null
                }
            </Stack>
        </Grid>

        <div className={`MRTableCustom  pl-0 `}>
            <MaterialReactTable
                columns={columns}
                enableRowSelection={false}
                data={teamMembersList}
                enablePinning
                enableStickyHeader
                initialState={{
                    columnPinning: { left: ['name'] },
                    density: 'comfortable',
                    showGlobalFilter: false,
                }}
                enableDensityToggle={false}
                enableFullScreenToggle
                // enableColumnResizing
                // enableFilters={false}
                enableGlobalFilter={false}
                // enableGlobalFilterModes={false}
                enablePagination={false}
                enableBottomToolbar={false}
                enableTopToolbar={false}
                columnResizeMode="onChange"
                getRowId={(row) => row.email}
                icons={{
                    ArrowDownwardIcon: (props: any) => <SwitchLeftIcon  {...props} />
                }}

            />
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
                                getInvitedRecruiterList();
                            }
                            setOpenInviteMembersPopup(false);
                        }} />
                    </DialogContent>

                </Dialog>
                :
                null
        }

    </div>

}

export default TeamMembers;