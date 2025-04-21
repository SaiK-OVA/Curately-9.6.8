import { useEffect, useMemo, useState } from '../../../../shared/modules/React';
import { trackPromise } from 'react-promise-tracker';
import ApiService from '../../../../shared/api/api';

import { userLocalData } from '../../../../shared/services/userData';
// import { showToaster } from '../../../shared/SnackBar/SnackBar';
import { Grid } from '../../../../shared/modules/MaterialImports/Grid2';
import { Typography } from '../../../../shared/modules/MaterialImports/Typography';
import { Stack } from '../../../../shared/modules/MaterialImports/Stack';
import { Button } from '../../../../shared/modules/MaterialImports/Button';
// import { Dialog, DialogContent, DialogTitle, CloseIcon } from '../../../../shared/modules/MaterialImports/Dialog';
import { MaterialReactTable, type MRT_ColumnDef } from "../../../../shared/modules/MaterialReactTable";


import ReferMembers from './ReferMembers/ReferMembers';
import LuxonDateParser from '../../../../shared/services/LuxonDateParser';


import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';


import { showToaster } from '../../../shared/SnackBar/SnackBar';

import './Refer.scss';

interface ReferDetailsInterface {
    email: string;
    referredDate: string;
    name: string;
    recrId: number;
    status: string;
}

const Refer = () => {


    const [referredRecruiterList, setReferredRecruiterList] = useState<ReferDetailsInterface[]>([]);
    // const [openReferMemberPopup, setOpenReferMemberPopup] = useState(false);


    const getRefferedDetails = () => {
        trackPromise(
            ApiService.postWithData('admin', 'getReferredRecruiterDetails', {
                recrId: userLocalData.getvalue('recrId'),
                clientId: userLocalData.getvalue('clientId')
            }).then((response) => {
                if (response.data.referredRecruiterDetails) {
                    setReferredRecruiterList(response.data.referredRecruiterDetails || []);
                }
            })
        )
    }
    useEffect(() => {
        getRefferedDetails();
    }, []);

    const columns: MRT_ColumnDef<(typeof referredRecruiterList)[0]>[] = useMemo(
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
                Cell: ({ row }) => (
                    <span className='tt-lower'>{row.original.email}</span>
                ),
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
                accessorKey: "referredDate",
                header: "Reffered Date",
                Cell: ({ row }) => (
                    <span>
                        {
                            row.original.referredDate && LuxonDateParser.ServerEDTToSystem(row.original.referredDate.substring(0, 19), "yyyy-MM-dd hh:mm:ss", "MM/dd/yyyy hh:mm a")
                        }
                    </span>
                ),
                size: 100,
            },
            {
                accessorKey: "invitedDate",
                header: "",
                Cell: ({ row }) => (
                    <span>
                        {
                            (row.original.status === "Pending") ?
                                <Button variant='outlined' color='primary' size='small' onClick={() => referByEmail(row.original.email)} >Re-invite</Button>
                                :
                                <></>
                        }
                    </span>
                ),
                size: 100,
            }
        ],
        []
    );

    const referByEmail = (email: string) => {
        if (email) {
            trackPromise(
                ApiService.postWithData('admin', 'sendRefferalEmail', {
                    "recrId": userLocalData.getvalue('recrId'),
                    "clientId": userLocalData.getvalue('clientId'),
                    "emailIds": [email]
                }).then((response) => {
                    console.log(response.data);
                    if (response.data.Success) {
                        showToaster('Referral sent successfully.', 'success');
                    } else {
                        showToaster(response.data.Message ? response.data.Message : 'An error occured while Referring.', 'error');
                    }
                })
            )
        } else {
            showToaster('no email found to Invite', 'error');
        }
    }

    return <div id="ReferMember">
        <Grid container direction="row" className="customCard px-4 py-2 mt-4" justifyContent="space-between" alignItems="center" display="flex" sx={{ minHeight: 'auto !important' }} >
            <Typography variant="h6" className="headerName">
                Refer
            </Typography>
            <Stack direction="row" className="btn-container">
                {/* <Button variant="contained" className="btnPrimary mr-3" size="small" onClick={() => { setOpenReferMemberPopup(true) }}>Refer Member</Button> */}
            </Stack>
        </Grid>
        <Grid container direction="row" className="py-2 mt-4" justifyContent="flex-start" alignItems="center" display="flex" sx={{ minHeight: 'auto !important', width: 730 }} >
            <ReferMembers closeInvitePopup={(refresh) => {
                if (refresh) {
                    getRefferedDetails();
                }
                // setOpenReferMemberPopup(false);
            }} />
        </Grid>

        <div className={`MRTableCustom  pl-0 pl-4`}>
            <MaterialReactTable
                columns={columns}
                enableRowSelection={false}
                data={referredRecruiterList}
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
        {/* {
            openReferMemberPopup ?
                <Dialog open={openReferMemberPopup} onClose={() => setOpenReferMemberPopup(false)} >
                    <DialogTitle>
                        <Grid container direction="row" justifyContent="space-between" alignItems="center" >
                            <span className='addHeader'>
                                Refer & Get $5
                            </span>
                            <CloseIcon onClick={() => setOpenReferMemberPopup(false)} />

                        </Grid>
                    </DialogTitle>
                    <DialogContent sx={{ minWidth: 500 }} className='pt-4'>

                    </DialogContent>

                </Dialog>
                :
                null
        } */}

    </div>

}

export default Refer;