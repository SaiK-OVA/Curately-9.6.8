import { Dialog, DialogTitle, DialogContent } from '../../../../../../../../shared/modules/MaterialImports/Dialog';
import { Button, IconButton, Grid } from '../../../../../../../../shared/modules/commonImports';
import CloseIcon from '@mui/icons-material/Close';
import { Divider } from '../../../../../../../../shared/modules/MaterialImports/Divider';

import './EditInterview.scss';


const EditInterview = ({ dialogOpen, handleDialogClose, handleEditDetails }: { dialogOpen: boolean, handleDialogClose: any, handleEditDetails: any }) => {

    return (
        <Dialog
            maxWidth={'md'}
            fullWidth={true} open={dialogOpen} className='AddJobModal'
            id='interviewsDialogBox'
        >
            <DialogTitle className="header">
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                >
                    <span>Edit Interview Details</span>
                    <IconButton
                        aria-label="close"
                        onClick={handleDialogClose}
                        className="closeBtn"
                    >
                        <CloseIcon />
                    </IconButton>
                </Grid>
            </DialogTitle>
            <Divider/>
            <DialogContent>
                <Grid
                    container
                >
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="flex-start"
                    >
                        <Button variant="contained" color="secondary" size="small" onClick={handleEditDetails}>Edit</Button>
                    </Grid>
                </Grid>
                <Grid
                    container
                    className='customCard'
                    spacing={2}
                >
                    <Grid container spacing={2}>
                        <Grid size={6}>
                            <label className='inputLabel'>Candidate Name</label>
                        </Grid>
                        <Grid size={6}>
                            <label className='inputLabel'>Test QA001</label>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid size={6}>
                            <label className='inputLabel'>JobID / Job title</label>
                        </Grid>
                        <Grid size={6}>
                            <label className='inputLabel'>QA-4</label>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid size={6}>
                        <label className='inputLabel'>Hiring Manager / Interviewer</label>
                        </Grid>
                        <Grid size={6}>
                        <label className='inputLabel'>Sunil Yekulla</label>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid size={6}>
                        <label className='inputLabel'>Additional Interviewer</label>
                        </Grid>
                        <Grid size={6}>
                        <label className='inputLabel'>Aditya Togaru</label>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid size={6}>
                        <label className='inputLabel'>No. of Rounds</label>
                        </Grid>
                        <Grid size={6}>
                        <label className='inputLabel'>1st Round</label>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid size={6}>
                        <label className='inputLabel'>Interview Type</label>
                        </Grid>
                        <Grid size={6}>
                        <label className='inputLabel'>Phone</label>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid size={6}>
                        <label className='inputLabel'>Phone Number</label>
                        </Grid>
                        <Grid size={6}>
                        <label className='inputLabel'>7418529630</label>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid size={6}>
                        <label className='inputLabel'>Who will call where?</label>
                        </Grid>
                        <Grid size={6}>
                        <label className='inputLabel'>Conference Bridge</label>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid size={6}>
                        <label className='inputLabel'>Interview Date:</label>
                        </Grid>
                        <Grid size={6}>
                        <label className='inputLabel'>2020-10-27</label>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid size={6}>
                        <label className='inputLabel'>Interview Start Time:</label>
                        </Grid>
                        <Grid size={6}>
                        <label className='inputLabel'>12:21 PM</label>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid size={6}>
                        <label className='inputLabel'>Interview End Time:</label>
                        </Grid>
                        <Grid size={6}>
                        <label className='inputLabel'>12:21 PM</label>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid size={6}>
                        <label className='inputLabel'>Timezone</label>
                        </Grid>
                        <Grid size={6}>
                        <label className='inputLabel'>EST</label>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid size={6}>
                        <label className='inputLabel'>Interview Status</label>
                        </Grid>
                        <Grid size={6}>
                        <label className='inputLabel'>Completed</label>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid size={6}>
                        <label className='inputLabel'>Comments</label>
                        </Grid>
                        <Grid size={6}>
                        <label className='inputLabel'></label>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    )
}

export default EditInterview;