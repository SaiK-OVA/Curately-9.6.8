import {Dialog, DialogTitle, DialogContent, DialogActions} from '../../../../../../shared/modules/MaterialImports/Dialog';
import {Grid, Button, IconButton} from '../../../../../../shared/modules/commonImports';
import CloseIcon from '@mui/icons-material/Close';
import {Divider} from '../../../../../../shared/modules/MaterialImports/Divider';

import './NotesModal.scss'
const NotesModal = ({ dialogOpen, handleDialogClose }: { dialogOpen: boolean, handleDialogClose: any }) => {
    return (
        <div><Dialog
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
                    <span>Notes</span>
                    <IconButton
                        aria-label="close"
                        onClick={handleDialogClose}
                        className="closeBtn"
                    >
                        <CloseIcon />
                    </IconButton>
                </Grid>
            </DialogTitle>
            <Divider />
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <label className='inputLabel mb-2'>Interviewers Full Name, If there were multiple interviewers please enter each name separated by comma</label>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <textarea className='textarea' />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <label className='inputLabel mb-2'>How long did the interview last</label>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <textarea className='textarea' />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <label className='inputLabel mb-2'>What additional questions were you asked?</label>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <textarea className='textarea' />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <label className='inputLabel mb-2'>How did you do in the interview?</label>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <textarea className='textarea' />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <label className='inputLabel mb-2'>How useful was the information ASK Account manager OR Recruiter provided you to prep for this interview?</label>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <textarea className='textarea' />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <label className='inputLabel mb-2'>Based on the additional details you received about the job during the interview, Does it still fit with your interest and career aspirations?</label>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <textarea className='textarea' />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <label className='inputLabel mb-2'>If offered the job would you accept and start in this role?</label>
                    </Grid>
                </Grid>
            </DialogContent>
            <Divider />
            <DialogActions>
                <Button variant="outlined">
                    Save
                </Button>
                <Button variant="outlined"
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog></div>
    )
}

export default NotesModal