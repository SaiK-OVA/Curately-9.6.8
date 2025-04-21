import { Dialog, DialogTitle, DialogContent, DialogActions } from '../../../../../../../../shared/modules/MaterialImports/Dialog';
import { Button, IconButton, Grid, TextField, FormControl } from '../../../../../../../../shared/modules/commonImports';
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker, LocalizationProvider, AdapterLuxon } from '../../../../../../../../shared/modules/MaterialImports/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { MenuItem } from '../../../../../../../../shared/modules/MaterialImports/Menu';
import { Divider } from '../../../../../../../../shared/modules/MaterialImports/Divider';

import './EditInterviewDetails.scss';



const EditInterviewDetails = ({ dialogOpen, handleDialogClose }: { dialogOpen: boolean, handleDialogClose: any }) => {

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
                <span>Interview Details</span>
                <IconButton
                    onClick={handleDialogClose}
                    className="closeBtn"
                >
                    <CloseIcon/>
                </IconButton>
                </Grid>
            </DialogTitle>
            <Divider/>
            <DialogContent>
                <div className="callOutcome mt-4">
                    <Grid container spacing={2} className="mb-2" >
                        <Grid size={6}>
                            <label className='inputLabel mb-2'>Hiring Manager / Interviewer:</label>
                            <TextField fullWidth className='mt-1 mb-2'
                                variant="outlined"
                                type="text"
                                size="small"
                                label="Sunil Yekulla"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} className="mb-2">
                        <Grid size={4}>
                            <label className='inputLabel mb-2'>Interview Type:</label>
                            <TextField fullWidth className='mt-1'
                                variant="outlined"
                                type="text"
                                size="small"
                                select
                            >
                                <MenuItem value="Phone">Phone</MenuItem>
                                <MenuItem value="Video">Video</MenuItem>
                                <MenuItem value="Inperson">Inperson</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid size={4}>
                            <label className='inputLabel mb-2'>Phone Number:</label>
                            <TextField fullWidth className='mt-1'
                                variant="outlined"
                                type="text"
                                size="small"
                                label="7418529630"
                            />
                        </Grid>
                        <Grid size={4}>
                            <label className='inputLabel mb-2'>Who will call where?:</label>
                            <TextField fullWidth className='mt-1 mb-2'
                                variant="outlined"
                                type="text"
                                size="small"
                                select
                            >
                                <MenuItem value="Manager to call candidate">Manager to call candidate</MenuItem>
                                <MenuItem value="Conference bridge">Conference bridge</MenuItem>
                                <MenuItem value="Candidate will call manager">Candidate will call manager
                                </MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} className="mb-2">
                        <Grid size={3}>
                            <label className='inputLabel mb-2'>Date</label>
                            <FormControl fullWidth className='mt-1'>
                                <LocalizationProvider dateAdapter={AdapterLuxon}>
                                    <DatePicker
                                        slotProps={{ textField: { size: 'small' } }}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>
                        <Grid size={3}>
                            <label className='inputLabel mb-2'>Interview Start Time:</label>
                            <FormControl fullWidth className='mt-1'>
                                <LocalizationProvider dateAdapter={AdapterLuxon}>
                                    <TimePicker
                                        slotProps={{ textField: { size: 'small' } }}
                                        viewRenderers={{
                                            hours: renderTimeViewClock,
                                            minutes: renderTimeViewClock,
                                            seconds: renderTimeViewClock,
                                        }}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>
                        <Grid size={3}>
                            <label className='inputLabel mb-2'>Interview End Time:</label>
                            <FormControl fullWidth className='mt-1'>
                                <LocalizationProvider dateAdapter={AdapterLuxon}>
                                    <TimePicker
                                        slotProps={{ textField: { size: 'small' } }}
                                        viewRenderers={{
                                            hours: renderTimeViewClock,
                                            minutes: renderTimeViewClock,
                                            seconds: renderTimeViewClock,
                                        }}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>
                        <Grid size={3}>
                            <label className='inputLabel mb-2'>Timezone:</label>
                            <TextField fullWidth className='mt-1'
                                variant="outlined"
                                type="text"
                                size="small"
                                select
                            >
                                <MenuItem value="EST">EST</MenuItem>
                                <MenuItem value="CST">CST</MenuItem>
                                <MenuItem value="MST">MST</MenuItem>
                                <MenuItem value="PST">PST</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                </div>
            </DialogContent>
            <DialogActions>
                <Button
                      color="primary"
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default EditInterviewDetails;