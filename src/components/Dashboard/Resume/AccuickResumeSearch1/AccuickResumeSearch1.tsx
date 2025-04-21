// import { useState, SyntheticEvent } from 'react';
import { useState } from '../../../../shared/modules/React';
import {Accordion, AccordionDetails,AccordionSummary}  from '../../../../shared/modules/MaterialImports/Accordion';
import {TextField, FormControl, FormControlLabel} from '../../../../shared/modules/MaterialImports/FormInputs';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {Stack} from '../../../../shared/modules/MaterialImports/Stack';
import {Typography} from '../../../../shared/modules/MaterialImports/Typography';
import  {InputAdornment, Grid} from '../../../../shared/modules/commonImports';
import {Card,CardContent} from '../../../../shared/modules/MaterialImports/Card';
import SearchIcon from '@mui/icons-material/Search';
import {Radio, RadioGroup, Checkbox} from '../../../../shared/modules/MaterialImports/FormElements';
import {FormGroup} from '../../../../shared/modules/MaterialImports/FormGroup';
import {Box} from '../../../../shared/modules/MaterialImports/Box';
import {MenuItem} from '../../../../shared/modules/MaterialImports/Menu';

import './AccuickResumeSearch1.scss';




const AccuickResumeSearch1 = () => {

    const [expanded, setExpanded] = useState<string | false>(false);
    const [filtersExpand, setFiltersExpand] = useState(false);
    const toggleFilers = () => {
        setFiltersExpand(!filtersExpand);
    }

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Grid container spacing={0} className="customCard p-0 filterExpand-grid">
            <Grid sx={{ width: filtersExpand ? 0 : 310, overflow: 'hidden', opacity: filtersExpand ? 0 : 1 }}>
                <div id='AccuickResumeSearchFilters'>
                    <div className='accordian-wrap customFilterChips'>
                        <div className='filterListTab'>
                            <Accordion>
                                <Card >
                                    <CardContent className='4px 15px p-0 m-1'>
                                        <Typography>
                                            vali company 002 - 208057 - Angular Developer
                                        </Typography>
                                        <Stack className='mt-1 mb-1'
                                            direction="row"
                                            justifyContent="space-around"
                                            alignItems="flex-start"
                                            spacing={1}
                                        >
                                            <FormControl>
                                                <TextField size='small' placeholder='Change Job' sx={{ width: '80%' }} />
                                            </FormControl>
                                            <FormControl>
                                                <TextField size='small' sx={{ width: '80%' }}
                                                    placeholder="Search"
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="start">
                                                                <SearchIcon />
                                                            </InputAdornment>
                                                        )
                                                    }} />
                                            </FormControl>
                                        </Stack>
                                        <FormControl>
                                            <TextField size='small' sx={{ width: '145%', marginTop: '2px' }} placeholder='Keywords' />
                                        </FormControl>
                                        <FormControl>
                                            <FormGroup>
                                                <FormControlLabel className='p-0 m-0'
                                                    value="start"
                                                    label="Search client submission only"
                                                    control={<Checkbox />}
                                                    labelPlacement="start"
                                                />
                                            </FormGroup>
                                        </FormControl>
                                        <FormControl>
                                            <FormGroup>
                                                <FormControlLabel className='p-0 m-0'
                                                    value="start"
                                                    control={<Checkbox />}
                                                    label="CS Ninja"
                                                    labelPlacement="start"
                                                />
                                            </FormGroup>
                                        </FormControl>
                                    </CardContent>
                                </Card>
                            </Accordion>
                            <Accordion disableGutters square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                                <AccordionSummary expandIcon={<ArrowDropDownIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header">
                                    <Stack sx={{ width: '100%' }}>
                                        <Stack className='acc-title' direction="row" justifyContent="space-between">
                                            <Stack direction="row" alignItems="center">
                                                <Typography>Job Titles</Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <FormControl style={{ width: '120px' }}>
                                        <TextField size='small' placeholder='Jobtitle' />
                                    </FormControl>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion disableGutters square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                                <AccordionSummary expandIcon={<ArrowDropDownIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header">
                                    <Stack sx={{ width: '100%' }}>
                                        <Stack className='acc-title' direction="row" justifyContent="space-between">
                                            <Stack direction="row" alignItems="center">
                                                <Typography>Skills</Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <FormControl>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue="female"
                                            name="radio-buttons-group"
                                        >
                                            <FormControlLabel className='mb-2' value="Skill must be in recent use by candidate" control={<Radio />} label="Skill must be in recent use by candidate" />
                                            <FormControlLabel value="Skill doesn't need to be in recent use by candidate" control={<Radio />} label="Skill doesn't need to be in recent use by candidate" />
                                        </RadioGroup>
                                    </FormControl>
                                    <Stack direction="row" spacing={1} className='mb-1 mt-2' >
                                        <label>Experience Level :</label>
                                        <Box>
                                            <FormControl style={{ width: '130px', marginLeft: '30px' }}>
                                                <label id="demo-simple-select-label">None</label>
                                                <TextField
                                                    id="demo-simple-select"
                                                    size="small"
                                                    select
                                                >
                                                    <MenuItem value="">None</MenuItem>
                                                    <MenuItem value="Low">Low</MenuItem>
                                                    <MenuItem value="Mid">Mid</MenuItem>
                                                    <MenuItem value="High">High</MenuItem>
                                                </TextField>
                                            </FormControl>
                                        </Box>
                                    </Stack>
                                    <Stack className='mt-1 mb-1'
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="flex-start"
                                        spacing={1}
                                    >
                                        <label>Name :</label>
                                        <FormControl style={{ width: '130px' }} >
                                            <TextField size='small' />
                                        </FormControl>
                                    </Stack>
                                    <FormControl>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue="female"
                                            name="radio-buttons-group"
                                        >
                                            <FormControlLabel className='mb-2' value="All Skills are required" control={<Radio />} label="All Skills are required" />
                                            <FormControlLabel value="Only one of the skills is required" control={<Radio />} label="Only one of the skills is required" />
                                        </RadioGroup>
                                    </FormControl>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion disableGutters square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                                <AccordionSummary expandIcon={<ArrowDropDownIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header">
                                    <Stack sx={{ width: '100%' }}>
                                        <Stack className='acc-title' direction="row" justifyContent="space-between">
                                            <Stack direction="row" alignItems="center">
                                                <Typography>Location</Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <label>State : </label>
                                    <div>
                                        <TextField fullWidth className='mt-1 mb-2'
                                            variant="outlined"
                                            placeholder="Select State"
                                            size="small"
                                        />
                                    </div>
                                    <Stack direction="row" spacing={1} className='mt-1 mb-1'>
                                        <label>Zipcode :</label>
                                        <TextField
                                            size='small'
                                            sx={{ width: '50%' }}
                                        />
                                    </Stack>
                                    <Stack direction="row" spacing={1} className='mt-1 mb-1'>
                                        <label>Distance :</label>
                                        <TextField
                                            placeholder='in Miles'
                                            size='small'
                                            sx={{ width: '50%' }}
                                        />
                                    </Stack>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion disableGutters square expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                                <AccordionSummary expandIcon={<ArrowDropDownIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header">
                                    <Stack sx={{ width: '100%' }}>
                                        <Stack className='acc-title' direction="row" justifyContent="space-between">
                                            <Stack direction="row" alignItems="center">
                                                <Typography>Work Authorization</Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TextField fullWidth className='mt-1 mb-2'
                                        variant="outlined"
                                        placeholder="Select Work Authorization"
                                        size="small"
                                    />
                                </AccordionDetails>
                            </Accordion>
                            <Accordion disableGutters square expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                                <AccordionSummary expandIcon={<ArrowDropDownIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header">
                                    <Stack sx={{ width: '100%' }}>
                                        <Stack className='acc-title' direction="row" justifyContent="space-between">
                                            <Stack direction="row" alignItems="center">
                                                <Typography>Employers</Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TextField fullWidth className='mt-1 mb-2'
                                        variant="outlined"
                                        placeholder="Employer/Company Name"
                                        size="small"
                                    />
                                </AccordionDetails>
                            </Accordion>
                            <Accordion disableGutters square expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                                <AccordionSummary expandIcon={<ArrowDropDownIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header">
                                    <Stack sx={{ width: '100%' }}>
                                        <Stack className='acc-title' direction="row" justifyContent="space-between">
                                            <Stack direction="row" alignItems="center">
                                                <Typography>Education</Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Stack direction="row" spacing={1} className='mb-1 mt-2' >
                                        <label>Degree Types :</label>
                                        <TextField
                                            placeholder='Select Degrees'
                                            size='small'
                                            sx={{ width: '50%' }}
                                        />
                                    </Stack>
                                    <FormControl>
                                        <FormGroup>
                                            <FormControlLabel control={<Checkbox />} label="Show Only Top Students" />
                                            <FormControlLabel control={<Checkbox />} label="Show Only Students That Graduated Within The Last Year" />
                                            <FormControlLabel control={<Checkbox />} label="Show Only Current Students" />
                                        </FormGroup>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue="female"
                                            name="radio-buttons-group"
                                        >
                                            <FormControlLabel className='mb-2' value="Show Only Top Students" control={<Radio />} label="Show Only Top Students" />
                                            <FormControlLabel value="Show Only Students That Graduated Within The Last Year" control={<Radio />} label="Show Only Students That Graduated Within The Last Year" />
                                            <FormControlLabel value="Show Only Current Students" control={<Radio />} label="Show Only Current Students" />
                                        </RadioGroup>
                                    </FormControl>
                                    <label>Schools :</label>
                                    <div>
                                        <TextField fullWidth className='mt-1 mb-2'
                                            variant="outlined"
                                            placeholder="School Name"
                                            size="small"
                                        />
                                    </div>
                                    <label>Degrees :</label>
                                    <div>
                                        <TextField fullWidth className='mt-1 mb-2'
                                            variant="outlined"
                                            placeholder="Degree Name"
                                            size="small"
                                        />
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion disableGutters square expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
                                <AccordionSummary expandIcon={<ArrowDropDownIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header">
                                    <Stack sx={{ width: '100%' }}>
                                        <Stack className='acc-title' direction="row" justifyContent="space-between">
                                            <Stack direction="row" alignItems="center">
                                                <Typography>Days Back</Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <FormControl>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue="female"
                                            name="radio-buttons-group"
                                        >
                                            <FormControlLabel value="Within 1 day" control={<Radio />} label="Within 1 day" />
                                            <FormControlLabel value="Within 1 week" control={<Radio />} label="Within 1 week" />
                                            <FormControlLabel value="Within 1 month" control={<Radio />} label="Within 1 month" />
                                            <FormControlLabel value="Within 2 months" control={<Radio />} label="Within 2 months" />
                                            <FormControlLabel value="Within 3 months" control={<Radio />} label="Within 3 months" />
                                            <FormControlLabel value="Within 6 months" control={<Radio />} label="Within 6 months" />
                                            <FormControlLabel value="Within 9 months" control={<Radio />} label="Within 9 months" />
                                            <FormControlLabel value="Within 1 year" control={<Radio />} label="Within 1 year" />
                                            <FormControlLabel value="Within 2 year" control={<Radio />} label="Within 2 year" />
                                            <FormControlLabel value="All" control={<Radio />} label="All" />
                                        </RadioGroup>
                                    </FormControl>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion disableGutters square expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
                                <AccordionSummary expandIcon={<ArrowDropDownIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header">
                                    <Stack sx={{ width: '100%' }}>
                                        <Stack className='acc-title' direction="row" justifyContent="space-between">
                                            <Stack direction="row" alignItems="center">
                                                <Typography>Experience</Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <h3 style={{ fontWeight: 500 }}>Total Work Experience (Years)</h3>
                                    <Stack className='mt-1 mb-1'
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="flex-start"
                                        spacing={1}
                                    >
                                        <FormControl style={{ width: '120px' }} >
                                            <TextField size='small' placeholder='Min' />
                                        </FormControl>
                                        <label>-</label>
                                        <FormControl style={{ width: '120px' }} >
                                            <TextField size='small' placeholder='Max' />
                                        </FormControl>
                                    </Stack>
                                    <h3 style={{ fontWeight: 500 }}>Management Experience (Years)</h3>
                                    <Stack className='mt-1 mb-1'
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="flex-start"
                                        spacing={1}
                                    >
                                        <FormControl style={{ width: '120px' }} >
                                            <TextField size='small' placeholder='Min' />
                                        </FormControl>
                                        <label>-</label>
                                        <FormControl style={{ width: '120px' }} >
                                            <TextField size='small' placeholder='Max' />
                                        </FormControl>
                                    </Stack>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion disableGutters square expanded={expanded === 'panel9'} onChange={handleChange('panel9')}>
                                <AccordionSummary expandIcon={<ArrowDropDownIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header">
                                    <Stack sx={{ width: '100%' }}>
                                        <Stack className='acc-title' direction="row" justifyContent="space-between">
                                            <Stack direction="row" alignItems="center">
                                                <Typography>Certifications</Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TextField fullWidth className='mt-1 mb-2'
                                        variant="outlined"
                                        placeholder="Certification"
                                        size="small"
                                    />
                                </AccordionDetails>
                            </Accordion>
                            <Accordion disableGutters square expanded={expanded === 'panel10'} onChange={handleChange('panel10')}>
                                <AccordionSummary expandIcon={<ArrowDropDownIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header">
                                    <Stack sx={{ width: '100%' }}>
                                        <Stack className='acc-title' direction="row" justifyContent="space-between">
                                            <Stack direction="row" alignItems="center">
                                                <Typography>Industries</Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <label>Category :</label>
                                    <Box>
                                        <FormControl style={{ width: '200px' }} className='mt-1 mb-2'>
                                            <label id="demo-simple-select-label">None</label>
                                            <TextField
                                                select
                                                id="demo-simple-select"
                                                label="Age"
                                                size="small"
                                            >
                                                <MenuItem value="None">None</MenuItem>
                                                <MenuItem value="0">Common End-user Software</MenuItem>
                                                <MenuItem value="1">Administrative or Clerical</MenuItem>
                                                <MenuItem value="4">CAD/CAM</MenuItem>
                                                <MenuItem value="5">Engineering</MenuItem>
                                                <MenuItem value="6">Environmental</MenuItem>
                                                <MenuItem value="7">Finance</MenuItem>
                                                <MenuItem value="9">Human Resources</MenuItem>
                                                <MenuItem value="10">Information Technology</MenuItem>
                                                <MenuItem value="11">General Non-Skilled Labor</MenuItem>
                                                <MenuItem value="12">Legal</MenuItem>
                                                <MenuItem value="13">Manufacturing</MenuItem>
                                                <MenuItem value="14">Marketing</MenuItem>
                                                <MenuItem value="15">Scientific</MenuItem>
                                                <MenuItem value="16">Telecommunications</MenuItem>
                                                <MenuItem value="19">Insurance</MenuItem>
                                                <MenuItem value="20">Sales</MenuItem>
                                                <MenuItem value="21">Aviation</MenuItem>
                                                <MenuItem value="22">Construction Non-Laborer</MenuItem>
                                                <MenuItem value="26">Power Engineering</MenuItem>
                                                <MenuItem value="27">Light Technical/Trades/Skilled Labor</MenuItem>
                                                <MenuItem value="28">Clinical</MenuItem>
                                                <MenuItem value="29">Hardware Engineering</MenuItem>
                                                <MenuItem value="31">Technical Writing</MenuItem>
                                                <MenuItem value="32">Degreed Accounting</MenuItem>
                                                <MenuItem value="33">Graphic Design</MenuItem>
                                                <MenuItem value="34">Business Operations and General Business</MenuItem>
                                                <MenuItem value="36">Travel</MenuItem>
                                                <MenuItem value="37">Recruiting</MenuItem>
                                                <MenuItem value="43">Distribution and Shipping</MenuItem>
                                                <MenuItem value="44">Petrochemical</MenuItem>
                                                <MenuItem value="45">Transmission &amp; Distribution</MenuItem>
                                                <MenuItem value="46">Call Center or Help Desk or Customer Service</MenuItem>
                                                <MenuItem value="64">Training</MenuItem>
                                                <MenuItem value="66">Facilities</MenuItem>
                                                <MenuItem value="67">Business Development</MenuItem>
                                                <MenuItem value="68">Entry Level</MenuItem>
                                                <MenuItem value="69">QA and QC</MenuItem>
                                                <MenuItem value="70">Research</MenuItem>
                                                <MenuItem value="71">Strategy and Planning</MenuItem>
                                                <MenuItem value="72">Installation, Maintenance, Repair</MenuItem>
                                                <MenuItem value="73">Grocery</MenuItem>
                                                <MenuItem value="74">Biotech/Life Sciences</MenuItem>
                                                <MenuItem value="75">Pharmaceutical</MenuItem>
                                                <MenuItem value="76">Broadcasting, Journalism</MenuItem>
                                                <MenuItem value="77">Education</MenuItem>
                                                <MenuItem value="78">Retail</MenuItem>
                                                <MenuItem value="80">General Management</MenuItem>
                                                <MenuItem value="81">Banking and Related</MenuItem><MenuItem value="82">Hotel and Hospitality</MenuItem>
                                                <MenuItem value="85">Architecture</MenuItem>
                                                <MenuItem value="86">Government</MenuItem>
                                                <MenuItem value="87">Warehouse</MenuItem>
                                                <MenuItem value="89">Bookkeeping, Office Management</MenuItem>
                                                <MenuItem value="90">Personal Attributes</MenuItem>
                                                <MenuItem value="91">Translations and Language Work</MenuItem>
                                                <MenuItem value="92">Knowledge and Learning Management</MenuItem>
                                                <MenuItem value="93">User Experience</MenuItem>
                                                <MenuItem value="94">Physician and NonNursing/NonAdmin</MenuItem>
                                                <MenuItem value="95">Healthcare Non-physician Non-nurse</MenuItem>
                                                <MenuItem value="96">Executive</MenuItem>
                                                <MenuItem value="97">Purchasing, Procurement, Inventory Control, Supply Chain</MenuItem>
                                                <MenuItem value="98">Security</MenuItem>
                                                <MenuItem value="99">Nursing</MenuItem>
                                            </TextField>
                                        </FormControl>
                                    </Box>
                                    <label>Subcategory :</label>
                                    <Box>
                                        <FormControl style={{ width: '200px' }} className='mt-1'>
                                            <label id="demo-simple-select-label">None</label>
                                            <TextField
                                                select
                                                id="demo-simple-select"
                                                label="Age"
                                                size="small"
                                            >
                                                <MenuItem value="None">None</MenuItem>
                                            </TextField>
                                        </FormControl>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion disableGutters square expanded={expanded === 'panel11'} onChange={handleChange('panel11')}>
                                <AccordionSummary expandIcon={<ArrowDropDownIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header">
                                    <Stack sx={{ width: '100%' }}>
                                        <Stack className='acc-title' direction="row" justifyContent="space-between">
                                            <Stack direction="row" alignItems="center">
                                                <Typography>Spoken Languages</Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <FormControl>
                                        <TextField size='small' placeholder='Select Languages' />
                                    </FormControl>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </Grid>
        </Grid>
    );
}
export default AccuickResumeSearch1;