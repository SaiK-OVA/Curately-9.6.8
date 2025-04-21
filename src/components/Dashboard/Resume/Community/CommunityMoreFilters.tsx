import {React} from '../../../../shared/modules/React';
import {Dialog, DialogContent, DialogTitle } from '../../../../shared/modules/MaterialImports/Dialog';
import {Typography} from '../../../../shared/modules/MaterialImports/Typography';
import {TextField, FormControlLabel} from '../../../../shared/modules/MaterialImports/FormInputs';
import { FormGroup } from '../../../../shared/modules/MaterialImports/FormGroup';
import {MenuItem} from '../../../../shared/modules/MaterialImports/Menu';
import {Accordion, AccordionSummary, AccordionDetails} from '../../../../shared/modules/MaterialImports/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Grid, Button, } from '../../../../shared/modules/commonImports';
import {Checkbox} from '../../../../shared/modules/MaterialImports/FormElements';
import './CommunityMoreFilters.scss'
import {Stack} from "../../../../shared/modules/MaterialImports/Stack";



interface CommunityFormik {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}




const CommunityMoreFilters: React.FC<{ fullScreen: boolean, open: boolean, handleClose: () => void, communityFormik: CommunityFormik }> = ({ open, handleClose }) => {

    return (
        <Dialog
            maxWidth={'md'}
            // className='dialog'
            // fullScreen
            // maxWidth={'lg'}
            fullWidth={true}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
            id='CommunityMoreFilters'
            className='morefilter-height '

        >
            <DialogTitle className='py-2'>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ minHeight: "auto !important" }}
                >
                    <span >
                        Filters
                    </span>
                    <Grid
                        container
                        direction="row"
                        justifyContent="end"
                        alignItems="end"
                    >
                        <Button variant="contained" color="primary" className='mr-2' >Apply Filters</Button>
                        <Button variant="outlined" type='button' color="secondary" className='mr-2' onClick={handleClose}>Close</Button>

                    </Grid>

                </Stack>
            </DialogTitle>
            <DialogContent>

                <div>
                    <Grid container spacing={2} size={12}>

                        <Grid size={4} className='customCard'>
                            <h3> Community Member Activity </h3>
                            <Accordion className='jobApplication '>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"

                                >
                                    <Typography>Job Application</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        <TextField

                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            select
                                        >
                                            <MenuItem value={30}>30 Days</MenuItem>
                                            <MenuItem value={60}>60 Days</MenuItem>
                                            <MenuItem value={120}>120 Days</MenuItem>
                                            <MenuItem value={365}>1 Years</MenuItem>

                                        </TextField>

                                    </Typography>
                                </AccordionDetails>

                            </Accordion>
                            <Accordion className='jobApplication'>

                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography>Profile Update</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        <TextField
                                            className={`mt-2`}
                                            variant="outlined"
                                            size="small"
                                            name={`keywords`}
                                            fullWidth
                                            select
                                        >
                                            <MenuItem value={30}>30 Days</MenuItem>
                                            <MenuItem value={60}>60 Days</MenuItem>
                                            <MenuItem value={120}>120 Days</MenuItem>
                                            <MenuItem value={365}>1 Years</MenuItem>
                                        </TextField>

                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion className='jobApplication'>

                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography>Availability Status Update</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        <TextField
                                            className={`mt-2`}
                                            variant="outlined"
                                            size="small"
                                            name={`keywords`}
                                            fullWidth
                                            select
                                        ><MenuItem value={30}>30 Days</MenuItem>
                                            <MenuItem value={60}>60 Days</MenuItem>
                                            <MenuItem value={120}>120 Days</MenuItem>
                                            <MenuItem value={365}>1 Years</MenuItem></TextField>

                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion className='jobApplication'>

                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography>Shift Preference Update</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        <TextField
                                            className={`mt-2`}
                                            variant="outlined"
                                            size="small"
                                            name={`keywords`}
                                            fullWidth
                                            select
                                        >
                                            <MenuItem value={30}>30 Days</MenuItem>
                                            <MenuItem value={60}>60 Days</MenuItem>
                                            <MenuItem value={120}>120 Days</MenuItem>
                                            <MenuItem value={365}>1 Years</MenuItem>
                                        </TextField>

                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion className='jobApplication'>

                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography>Preferences Update</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        <TextField
                                            className={`mt-2`}
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            select
                                        >
                                            <MenuItem value={30}>30 Days</MenuItem>
                                            <MenuItem value={60}>60 Days</MenuItem>
                                            <MenuItem value={120}>120 Days</MenuItem>
                                            <MenuItem value={365}>1 Years</MenuItem>
                                        </TextField>

                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion className='jobApplication'>

                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography>Profile Completion %</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>


                                        <FormGroup>
                                            <FormControlLabel control={<Checkbox />} label="100%" />
                                            <FormControlLabel control={<Checkbox />} label="90% to 99%" />
                                            <FormControlLabel control={<Checkbox />} label="80% to 89%" />
                                            <FormControlLabel control={<Checkbox />} label="70% to 79%" />
                                            <FormControlLabel control={<Checkbox />} label="60% to 69%" />
                                            <FormControlLabel control={<Checkbox />} label="50% to 59%" />
                                            <FormControlLabel control={<Checkbox />} label="Under 50% to 0%" />

                                        </FormGroup>

                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion className='jobApplication'>

                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography>Mobile verified</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        <TextField
                                            className={`mt-2`}
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            select
                                        >
                                            <MenuItem value={13}>Yes</MenuItem>
                                            <MenuItem value={12}>No</MenuItem>
                                        </TextField>

                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>



                        <Grid size={4} className='customCard'>
                            <h3> Email</h3>
                            <Accordion className='jobApplication'>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography>Email Clicked</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        <TextField
                                            className={`mt-0`}
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            select
                                        >
                                            <MenuItem value={30}>30 Days</MenuItem>
                                            <MenuItem value={60}>60 Days</MenuItem>
                                            <MenuItem value={120}>120 Days</MenuItem>
                                            <MenuItem value={365}>1 Years</MenuItem>

                                        </TextField>

                                    </Typography>
                                </AccordionDetails>

                            </Accordion>
                            <Accordion className='jobApplication'>

                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography>Email Replied</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        <TextField
                                            className={`mt-2`}
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            select

                                        >
                                            <MenuItem value={30}>30 Days</MenuItem>
                                            <MenuItem value={60}>60 Days</MenuItem>
                                            <MenuItem value={120}>120 Days</MenuItem>
                                            <MenuItem value={365}>1 Years</MenuItem>
                                        </TextField>


                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion className='jobApplication'>

                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography>Email Bounced</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        <TextField
                                            className={`mt-2`}
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            select
                                        >
                                            <MenuItem value={13}>Yes</MenuItem>
                                            <MenuItem value={12}>No</MenuItem>
                                        </TextField>

                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion className='jobApplication'>

                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography>Email Spamblocked</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        <TextField
                                            className={`mt-2`}
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            select

                                        ><MenuItem value={13}>Yes</MenuItem>
                                            <MenuItem value={12}>No</MenuItem>
                                        </TextField>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion className='jobApplication'>

                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography>Email Unsubscribed</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        <TextField
                                            className={`mt-2`}
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            select

                                        > <MenuItem value={13}>Yes</MenuItem>
                                            <MenuItem value={12}>No</MenuItem>
                                        </TextField>

                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                        </Grid>
                        <Grid size={4} className='customCard'>
                            <h3> SMS</h3>
                            <Accordion className='jobApplication'>

                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography>SMS Sent</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        <TextField
                                            className={`mt-2`}
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            select
                                        > <MenuItem value={13}>Yes</MenuItem>
                                            <MenuItem value={12}>No</MenuItem>
                                        </TextField>

                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion className='jobApplication'>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography>SMS Replied</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        <TextField
                                            className={`mt-0`}
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            select
                                        >
                                            <MenuItem value={30}>30 Days</MenuItem>
                                            <MenuItem value={60}>60 Days</MenuItem>
                                            <MenuItem value={120}>120 Days</MenuItem>
                                            <MenuItem value={365}>1 Years</MenuItem>

                                        </TextField>

                                    </Typography>
                                </AccordionDetails>

                            </Accordion>

                            <Accordion className='jobApplication'>

                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography>SMS Unsubscribed</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        <TextField
                                            className={`mt-2`}
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            select
                                        ><MenuItem value={13}>Yes</MenuItem>
                                            <MenuItem value={12}>No</MenuItem>
                                        </TextField>

                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <h3> Curation activity </h3>
                            <Accordion className='jobApplication'>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography>Submission Activity</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        <TextField
                                            className={`mt-0`}
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            select
                                        >
                                            <MenuItem value={30}>30 Days</MenuItem>
                                            <MenuItem value={60}>60 Days</MenuItem>
                                            <MenuItem value={120}>120 Days</MenuItem>
                                            <MenuItem value={365}>1 Years</MenuItem>


                                        </TextField>

                                    </Typography>
                                </AccordionDetails>

                            </Accordion>
                            <Accordion className='jobApplication'>

                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography>Interview Activity</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        <TextField
                                            className={`mt-2`}
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            select
                                        >
                                            <MenuItem value={30}>30 Days</MenuItem>
                                            <MenuItem value={60}>60 Days</MenuItem>
                                            <MenuItem value={120}>120 Days</MenuItem>
                                            <MenuItem value={365}>1 Years</MenuItem>
                                        </TextField>

                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion className='jobApplication'>

                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography>Rating</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        <TextField
                                            className={`mt-2`}
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            select
                                        >
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                            <MenuItem value={3}>3</MenuItem>
                                            <MenuItem value={4}>4</MenuItem>
                                            <MenuItem value={5}>5</MenuItem>
                                        </TextField>

                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion className='jobApplication'>

                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography>Notes</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        <TextField
                                            className={`mt-2`}
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            select
                                        ><MenuItem value={13}>Yes</MenuItem>
                                            <MenuItem value={12}>No</MenuItem>
                                        </TextField>

                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    </Grid>
                </div>
            </DialogContent>
        </Dialog>


    );
}

export default CommunityMoreFilters;
