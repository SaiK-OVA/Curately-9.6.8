import {Accordion, AccordionSummary, AccordionDetails} from '../../../../../shared/modules/MaterialImports/Accordion';
import {Typography} from '../../../../../shared/modules/MaterialImports/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Grid} from '../../../../../shared/modules/MaterialImports/Grid';
import {TextField, FormControlLabel, FormControl} from '../../../../../shared/modules/MaterialImports/FormInputs';
import {MenuItem} from '../../../../../shared/modules/MaterialImports/Menu';
import {Checkbox, Radio, RadioGroup} from '../../../../../shared/modules/MaterialImports/FormElements';
import {Stack} from '../../../../../shared/modules/MaterialImports/Stack';

import {Box} from "../../../../../shared/modules/MaterialImports/Box";

import './Overview.scss'
const Overview = () => {
    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Job Description</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2} className="mb-2">
                        <Grid size={6} className='pr-2'>
                            <label>Public Job Description *</label>
                            <TextField id="publicJobDescription" name='publicJobDescription' size="small" variant="outlined" fullWidth />
                        </Grid>
                        <Grid size={6} className='pr-2'>
                            <label>Original Job Description *</label>
                            <TextField id="originalJobDescription" name='originalJobDescription' size="small" variant="outlined" fullWidth />
                        </Grid>
                    </Grid>
                </AccordionDetails>
                <Accordion>
                    <AccordionSummary
                        // expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Stack
                            direction="row">
                            <Grid sx={{ width: 1000, margin: 'auto', bgcolor: '#ffffff', padding: '7px 25px', borderRadius: 4, marginTop: "10px !important" }}>

                                <Grid container direction="row" justifyContent="start" alignItems={'left'}>
                                    {/* <Grid container direction="column">
                                    <Tabs style={{ margin: 0 }}>
                                        <Tab label="Edit" />
                                    </Tabs>
                                </Grid> */}
                                    <Grid container spacing={2} className="mb-2">
                                        <Grid size={3} className='pr-2'>
                                            <label>Company Name*</label>
                                            <TextField style={{ width: '170px' }}
                                                id="companyName"
                                                name="companyName"
                                                size="small"
                                                variant="outlined"
                                                type="text"
                                            />
                                        </Grid>
                                        <Grid size={3} className='pr-2'>
                                            <label>Job Title*</label>
                                            <TextField style={{ width: '170px' }}
                                                id="jobTitle"
                                                name="jobTitle"
                                                size="small"
                                                variant="outlined"
                                                type="text"
                                            />
                                            <div>
                                                (This information will be published on job boards)
                                            </div>
                                        </Grid>
                                        <Grid size={3} className='pr-2'>
                                            <Box sx={{ width: "50%" }}>
                                                <TextField id="recruiter" style={{ width: '170px' }} label="Recruiter *"
                                                    name="recruiter"
                                                    size="small"
                                                    variant="outlined"
                                                    select
                                                >
                                                    <MenuItem value=""></MenuItem>
                                                    <MenuItem value="Part-time">Part-time</MenuItem>
                                                    <MenuItem value="Full-time">Full-time</MenuItem>
                                                </TextField>
                                            </Box>
                                        </Grid>
                                        <Grid size={3} className='pr-2'>
                                            <Box sx={{ width: "50%" }}>
                                                <TextField style={{ width: '170px' }} label="Select Primary Recruiter *"
                                                    id="selectPrimaryRecruiter"
                                                    name="selectPrimaryRecruiter"
                                                    size="small"
                                                    variant="outlined"
                                                    select
                                                >
                                                    <MenuItem value=""></MenuItem>
                                                    <MenuItem value="Part-time">Part-time</MenuItem>
                                                    <MenuItem value="Full-time">Full-time</MenuItem>
                                                </TextField>

                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} className="mb-2">
                                        <Grid size={3} className='pr-2'>
                                            <label>Account Manager</label>
                                            <TextField style={{ width: '170px' }}
                                                id="accountManager"
                                                name="accountManager"
                                                size="small"
                                                variant="outlined"
                                                type="text"
                                            />
                                        </Grid>
                                        <Grid size={3} className='pr-2'>
                                            <label>Job Category *</label>
                                            <TextField style={{ width: '170px' }}
                                                id="jobCategory"
                                                name="jobCategory"
                                                size="small"
                                                variant="outlined"
                                                type="select"
                                            />
                                            <MenuItem value=""></MenuItem>
                                            (This information will be published on job boards)
                                        </Grid>
                                        <Grid size={3} className='pr-2'>
                                            <Box sx={{ width: "50%" }}>
                                                <TextField style={{ width: '170px' }} label="Pipeline Status"
                                                    id="pipelineStatus"
                                                    name="pipelineStatus"
                                                    size="small"
                                                    variant="outlined"
                                                    select
                                                >
                                                    <MenuItem value=""></MenuItem>
                                                    <MenuItem value="Open">Open</MenuItem>
                                                    <MenuItem value="Halted">Halted</MenuItem>
                                                    <MenuItem value="Closed">Closed</MenuItem>
                                                </TextField>
                                            </Box>
                                        </Grid>
                                        <Grid size={3} className='pr-2'>
                                            <Box sx={{ width: "50%" }}>
                                                <TextField id="priority" style={{ width: '170px' }} label="Priority"
                                                    name="priority"
                                                    size="small"
                                                    variant="outlined"
                                                    select
                                                >
                                                    <MenuItem value="none">none</MenuItem>
                                                    <MenuItem value="A">A</MenuItem>
                                                    <MenuItem value="B">B</MenuItem>
                                                </TextField>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} className="mb-2">
                                        <Grid size={3} className='pr-2'>
                                            <FormControlLabel style={{ margin: 2 }}
                                                control={<Checkbox />}
                                                label="Not Working"
                                                labelPlacement="end"
                                                id="notWorking"
                                                name="notWorking"
                                            />
                                        </Grid>
                                        <Grid size={3} className='pr-2'>
                                            <Box sx={{ width: "50%" }}>
                                                <TextField style={{ width: '170px' }} label="Reason"
                                                    id="reason"
                                                    name="reason"
                                                    size="small"
                                                    variant="outlined"
                                                    select
                                                >
                                                    <MenuItem value=""></MenuItem>
                                                    <MenuItem value="Part-time">Part-time</MenuItem>
                                                    <MenuItem value="Full-time">Full-time</MenuItem>
                                                </TextField>
                                            </Box>
                                        </Grid>
                                        <Grid size={3} className='pr-2'>
                                            <Box sx={{ width: "50%" }}>
                                                <TextField style={{ width: '170px' }} label="Similar Jobs"
                                                    id="similarJobs"
                                                    name="similarJobs"
                                                    size="small"
                                                    variant="outlined"
                                                    select
                                                >
                                                    <MenuItem value=""></MenuItem>
                                                    <MenuItem value="Part-time">Part-time</MenuItem>
                                                    <MenuItem value="Full-time">Full-time</MenuItem>
                                                </TextField>
                                            </Box>
                                        </Grid>
                                        <Grid size={3} className='pr-2'>

                                            <Box sx={{ width: "50%" }}>
                                                <TextField style={{ width: '170px' }} label="Filled By"
                                                    id="filledBy"
                                                    name="filledBy"
                                                    size="small"
                                                    variant="outlined"
                                                    type="select"
                                                >
                                                    <MenuItem value=""></MenuItem>
                                                    <MenuItem value="Part-time">Part-time</MenuItem>
                                                    <MenuItem value="Full-time">Full-time</MenuItem>
                                                </TextField>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} className="mb-2">
                                        <Grid size={3} className='pr-2'>
                                            <FormControlLabel style={{ margin: 2 }}
                                                control={<Checkbox />}
                                                label="Closed"
                                                labelPlacement="end"
                                                id="closed"
                                                name="closed"
                                            />
                                        </Grid>
                                        <Grid size={3} className='pr-2'>
                                            <label></label>
                                            <Box sx={{ width: "50%" }}>
                                                <TextField style={{ width: '170px' }} label="Relationship Type"
                                                    id="relationshipType"
                                                    name="relationshipType"
                                                    size="small"
                                                    variant="outlined"
                                                    type="select"
                                                >
                                                    <MenuItem value=""></MenuItem>
                                                    <MenuItem value="Relationship Job(Heads Up)">Relationship Job(Heads Up)</MenuItem>
                                                    <MenuItem value="P2R Job">P2R Job</MenuItem>
                                                </TextField>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Stack>
                    </AccordionSummary>
                </Accordion>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Requirement Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid className="mb-2">
                        <Grid container spacing={2} className="mb-2">
                            <Grid size={3} className='pr-2'>
                                <label>Requisition Title</label>
                                <TextField id="requisitionTitle" name='requisitionTitle' size="small" variant="outlined" fullWidth />
                            </Grid>
                            <Grid size={3} className='pr-2'>
                                <label>Requisition #</label>
                                <TextField id="requisition" name='requisition' size="small" variant="outlined" fullWidth />
                            </Grid>
                            <Grid size={3} className='pr-2'>
                                <label>Cost Center Number</label>
                                <TextField id="costCenterNumber" name='costCenterNumber' size="small" variant="outlined" fullWidth />
                            </Grid>
                            <Grid size={3} className='pr-2'>
                                <label>Business Unit</label>
                                <TextField id="businessUnit" name='businessUnit' size="small" variant="outlined" fullWidth />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} className="mb-2">
                            <Grid size={3} className='pr-2'>
                                <label>Hiring Manager</label>
                                <TextField id="hiringManager" name='hiringManager' size="small" variant="outlined" fullWidth />
                            </Grid>
                            <Grid size={3} className='pr-2'>
                                <label># of Positions</label>
                                <TextField
                                    select
                                    size="small"
                                    fullWidth
                                    id="ofPosition"
                                    name="ofPosition"
                                >
                                    <MenuItem value=""></MenuItem>
                                </TextField>
                            </Grid>
                            <Grid size={3} className='pr-2'>
                                <label>Position Duration *</label>
                                <TextField
                                    select
                                    size="small"
                                    fullWidth
                                    id="positionDuration"
                                    name='positionDuration'
                                >
                                    <MenuItem value=""></MenuItem>
                                </TextField>
                            </Grid>
                            <Grid size={3} className='pr-2'>
                                <label>MSP Coordinator</label>
                                <TextField id="mspCoordinator" name='mspCoordinator' size="small" variant="outlined" fullWidth />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} className="mb-2">
                            <Grid size={3} className='pr-2'>
                                <FormControlLabel style={{ margin: 2 }}
                                    control={<Checkbox />}
                                    label="PartTime"
                                    labelPlacement="end"
                                    id="partTime"
                                    name="partTime"
                                />
                            </Grid>
                            <Grid size={3} className='pr-2'>
                                <label>Start Date</label>
                                <TextField
                                    select
                                    size="small"
                                    fullWidth
                                    id="startDate"
                                    name='startDate'
                                >
                                    <MenuItem value="MM/DD/YYYY">MM/DD/YYYY</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid size={3} className='pr-2'>
                                <label>Est.End Date</label>
                                <TextField
                                    select
                                    size="small"
                                    fullWidth
                                    id="endDate"
                                    name='endDate'
                                >
                                    <MenuItem value="MM/DD/YYYY">MM/DD/YYYY</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid size={3} className='pr-2'>
                                <label>Submissions Allowed</label>
                                <TextField id="submissionsAllowed" name='submissionsAllowed' size="small" variant="outlined" fullWidth />
                            </Grid>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Location</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2} className="mb-2">
                        <Grid size={3} className='pr-2'>
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Remote Job"
                                labelPlacement="end"
                                id="remoteJob"
                                name="remoteJob"
                            />
                        </Grid>
                        <Grid size={3} className='pr-2'>
                            <label>Street Address</label>
                            <TextField id="streetAddress" name='streetAddress' size="small" variant="outlined"
                                fullWidth />
                        </Grid>
                        <Grid size={3} className='pr-2'>
                            <label>Job City *</label>
                            <TextField id="jobCity" name='jobCity' size="small" variant="outlined" fullWidth />
                        </Grid>
                        <Grid size={3} className='pr-2'>
                            <label>Original Job Description *</label>
                            <TextField id="originalJobDescriptionInLoc" name='originalJobDescriptionInLoc' size="small" variant="outlined" fullWidth />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} className="mb-2" style={{ justifyContent: "end" }}>
                        <Grid size={3} className='pr-2'>
                            <label>State or Pro *</label>
                            <TextField id="stateOrPro" name='stateOrPro' size="small" variant="outlined" fullWidth />
                        </Grid>
                        <Grid size={3} className='pr-2'>
                            <label>Job Postal Code *</label>
                            <TextField
                                select
                                size="small"
                                fullWidth
                                id="jobPostalCode"
                                name='jobPostalCode'
                            >
                                <MenuItem value=""></MenuItem>
                            </TextField>
                        </Grid>
                        <Grid size={3} className='pr-2'>
                            <label>Area Code</label>
                            <TextField id="areaCode" name='areaCode' size="small" variant="outlined" fullWidth />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} className="mb-2" style={{ justifyContent: "end" }}>
                        <Grid size={3} className='pr-2'>
                            <label>Country/Locale</label>
                            <TextField id="countryOrLocale" name='countryOrLocale' size="small" variant="outlined" fullWidth />
                        </Grid>
                        <Grid size={3} className='pr-2'>
                            <label>Job Region</label>
                            <TextField
                                select
                                size="small"
                                fullWidth
                                id="jobRegion"
                                name='jobRegion'
                            >
                                <MenuItem value=""></MenuItem>
                            </TextField>
                        </Grid>
                        <Grid size={3} className='pr-2'>
                            <label>Travel %</label>
                            <TextField id="travel" name='travel' size="small" variant="outlined" fullWidth />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Compensation</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid >
                        <div >
                            <div >
                                <FormControl>
                                    <RadioGroup row
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue=""
                                        name="radio-buttons-group"
                                    >
                                        <FormControlLabel value="freelancer" control={<Radio />} label="Freelancer" />
                                        <FormControlLabel value="directHire" control={<Radio />} label="Direct Hire" style={{ marginLeft: '80px' }} />
                                        <FormControlLabel value="contract" control={<Radio />} label="Contract" style={{ marginLeft: '80px' }} />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            <label style={{ margin: 20 }}>Pay Range *</label>
                            <TextField style={{ margin: 2 }} id="payRange" name="payRange" size="small" label="Min" variant="outlined" />
                            <label style={{ margin: 15 }}>to</label>
                            <TextField style={{ margin: 1 }} id="to" name="to" size="small" label="Max" variant="outlined" />
                            <div>
                                <label style={{ margin: 28 }}>Pay Type*</label>
                                <TextField style={{ width: '197px' }}
                                    select
                                    size="small"
                                    id="payType"
                                    name='payType'
                                >
                                    <MenuItem value=""></MenuItem>
                                </TextField>
                            </div>
                        </div>
                        <div>
                            <label style={{ margin: 20 }}>Pay Range *</label>
                            <TextField style={{ margin: 2 }} id="directHirePayRange" name="directHirePayRange" size="small" label="Min" variant="outlined" />
                            <label style={{ margin: 15 }}>to</label>
                            <TextField style={{ margin: 2 }} id="directHireTo" name="directHireTo" size="small" label="Max" variant="outlined" />
                            <div>
                                <label style={{ margin: 27 }}>Pay Type*</label>
                                <TextField style={{ width: '197px' }}
                                    select
                                    size="small"
                                    id="directHirePayType"
                                    name='directHirePayType'
                                >
                                    <MenuItem value=""></MenuItem>
                                </TextField>
                            </div>
                        </div>
                        <div >
                            <div>
                                <label style={{ margin: 20 }}>Bill Rate * $</label>
                                <TextField style={{ margin: 2 }} id="billRateMin" name="billRateMin" size="small" label="Min" variant="outlined" />
                                <label style={{ margin: 15 }}>-Max. $</label>
                                <TextField style={{ margin: 2 }} id="billRateMax" name="billRateMax" size="small" label="Max" variant="outlined" />
                            </div>
                            <div>
                                <label style={{ margin: 18 }}>Pay Rate * $</label>
                                <TextField style={{ margin: 2 }} id="payRateMin" name="payRateMin" size="small" label="Min" variant="outlined"
                                />
                                <label style={{ margin: 15 }}>-Max. $</label>
                                <TextField style={{ margin: 2 }} id="payRateMax" name="payRateMax" size="small" label="Max" variant="outlined" />
                            </div>
                            <div>
                                <label style={{ margin: 27 }}>Pay Type*</label>
                                <TextField style={{ width: '197px' }}
                                    select
                                    size="small"
                                    id="contractPayType"
                                    name='contractPayType'
                                >
                                    <MenuItem value=""></MenuItem>
                                </TextField>
                            </div>
                        </div>
                    </Grid>
                </AccordionDetails>
            </Accordion>


        </div >
    )

}
export default Overview;