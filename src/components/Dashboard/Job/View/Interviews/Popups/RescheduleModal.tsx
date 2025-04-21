import { Dialog, DialogTitle, DialogContent, DialogActions } from '../../../../../../shared/modules/MaterialImports/Dialog';
import {Grid, Button, IconButton, FormControl, TextField } from '../../../../../../shared/modules/commonImports';
import CloseIcon from '@mui/icons-material/Close';
import {Divider} from '../../../../../../shared/modules/MaterialImports/Divider';
import { DatePicker, LocalizationProvider, AdapterLuxon } from '../../../../../../shared/modules/MaterialImports/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import {MenuItem} from '../../../../../../shared/modules/MaterialImports/Menu';


const RescheduleModal = ({ dialogOpen, handleDialogClose }: { dialogOpen: boolean, handleDialogClose: any }) => {
    return (
        <div>
            <Dialog
                maxWidth={'sm'}
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
                        <span>Reschedule</span>
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
                    <Grid container spacing={2} className="mb-2">
                        <Grid size={4}>
                            <label className='inputLabel mb-2'>Date</label>
                            <FormControl fullWidth className='mt-1'>
                                <LocalizationProvider dateAdapter={AdapterLuxon}>
                                    <DatePicker
                                        slotProps={{ textField: { size: 'small' } }}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>
                        <Grid size={4}>
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
                        <Grid size={4}>
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
                    </Grid>
                    <Grid container spacing={2} className="mb-2">
                        <Grid size={6}>
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
                </DialogContent>
                <Divider />
                <DialogActions>
                    <Button variant="outlined">
                        Confirm
                    </Button>
                    <Button variant="outlined"
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default RescheduleModal;