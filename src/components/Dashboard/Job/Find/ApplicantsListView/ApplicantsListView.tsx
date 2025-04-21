// import { Dialog } from 'primereact/dialog';
import './ApplicantsListView.scss';
import Drawer from '@mui/material/Drawer';
import { Stack } from '../../../../../shared/modules/MaterialImports/Stack';
import { IconButton } from '../../../../../shared/modules/MaterialImports/Button';
import CloseRounded from '@mui/icons-material/CloseRounded';
import { Typography } from '../../../../../shared/modules/MaterialImports/Typography';
import ApplicantsClient from "../../View/Applicants/Applicants";

const ApplicantsListView = (
    { open, closePopup, jobId, appCount }:
        { open: boolean, closePopup: () => void, jobId: string, appCount: number }
) => {

    //Commented Prime react dialog for z-index issue
    // return <Dialog dismissableMask={true} header="Applicants List" visible={open} position={'right'} style={{ width: '80vw', height: '100vh', maxHeight: '100vh', margin: 0 }} onHide={() => closePopup()} draggable={false} resizable={false} id="ApplicantsListView">
    //     <ApplicantsCount jobId={jobId} />
    // </Dialog>
    return (
        <Drawer open={open} sx={{ zIndex: 999, height: "100vh", }} onClose={closePopup} anchor='right' id="ApplicantsListView">
            <Stack width={"80vw"} minHeight={"100vh"} position={"relative"}>
                <Stack width={"100%"} direction={"row"} justifyContent={"space-between"} alignItems={"center"} className='applicantsListViewHeader'>
                    <Typography variant='h6'>Applicants List</Typography>
                    <IconButton size='small' onClick={closePopup}><CloseRounded /></IconButton>
                </Stack>
                <div style={{ padding: "0px 1rem", marginTop: "4rem" }} className="MRTableCustom pl-0">
                    <ApplicantsClient statusId={null} totalCount={appCount || 0} jobId={jobId} isInDrawer={true} />
                </div>
            </Stack>
        </Drawer >
    )
}

export default ApplicantsListView;