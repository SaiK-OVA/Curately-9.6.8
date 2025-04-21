import {Dialog, DialogTitle, DialogContent, DialogActions} from '../../../../../../shared/modules/MaterialImports/Dialog';
import {Divider} from '../../../../../../shared/modules/MaterialImports/Divider';
import {Grid, Button, IconButton, FormControl,  TextField} from '../../../../../../shared/modules/commonImports';
import CloseIcon from '@mui/icons-material/Close';
import Autocomplete from '@mui/material/Autocomplete';
import './CancelModal.scss';



const CancelModal = ({ dialogOpen, handleDialogClose }: { dialogOpen: boolean, handleDialogClose: any }) => {
    const list = ['None', 'Candidate off market', 'Candidate no show', 'Client cancelled'];

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
                        <span>Cancel</span>
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
                    <label className="input-label">Reason:</label>
                    {/* <div>    
                    <Button style={{ textTransform: 'capitalize',fontSize:'.875rem' }}><Link underline="hover">Select an outcome</Link><ArrowDropDownIcon style={{marginTop:'3px'}}/> 
                    </Button> 
                    <MenuList>
                  {list.map((opt, index) => (
                    <MenuItem
                      key={opt}
                    >
                      {opt}
                    </MenuItem>
                  ))}
                </MenuList>                              
                    </div> */}

                    <Autocomplete
                        options={list}
                        renderInput={(params) => <TextField {...params} label="Select an outcome" variant="standard"></TextField>}
                    />

                    <FormControl fullWidth>
                        <label className="input-label mt-2">Comment:</label>
                        <textarea rows={6} className='textarea'></textarea>
                    </FormControl>
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

export default CancelModal;