import { useState } from '../../../../shared/modules/React';
import {Accordion, AccordionSummary, AccordionDetails} from '../../../../shared/modules/MaterialImports/Accordion';
import {Typography} from '../../../../shared/modules/MaterialImports/Typography';
import {Stack} from '../../../../shared/modules/MaterialImports/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import {TextField, FormControl, Button} from '../../../../shared/modules/commonImports';
import {Chip} from '../../../../shared/modules/MaterialImports/Chip';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {MenuItem} from '../../../../shared/modules/MaterialImports/Menu';
import Paper from '@mui/material/Paper';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import SubtitlesOutlinedIcon from '@mui/icons-material/SubtitlesOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import './ListJob.scss';



const ListJob = () => {
    const [expanded, setExpanded] = useState<string | false>(false);
    const [jobType, setJobType] = useState('');

    const handleJobTypeChange = (event: SelectChangeEvent) => {
        setJobType(event.target.value);
    };

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const CustomPaper = (props: any) => {
        return <Paper elevation={3} {...props} sx={{
            '& .MuiAutocomplete-option': {
                fontWeight: '600',
                color: 'var(--c-text-header)'
            }
        }} />;
    };

    const jobStatusList = [
        { title: 'All Jobs', value: 'All' },
        { title: 'Open Jobs', value: '1: Open Req' },
        { title: 'Halted Jobs', value: '0: Hold' },
        { title: 'Closed Jobs', value: '0: Inactive' },
        { title: 'Canceled Jobs', value: '0: Canceled' },
        { title: 'Pipeline', value: 'Pipeline' },
        { title: 'Heads Up', value: 'Heads Up' },
        { title: 'Re-Opened', value: 'Re-Opened' },
        { title: 'Automation', value: 'Automation' },
        { title: 'POC', value: 'POC' }
    ];

    const relationList = [
        { title: 'Portal', value: 'P' },
        { title: 'P2R', value: 'P2R' },
        { title: 'Relationship', value: 'R' }
    ];

    const hiringList = [
        { title: 'Test Testing', value: '1085091' },
        { title: 'Qa001 Accuick', value: '1085094' },
        { title: 'QA002 Aquick', value: '1085096' },
        { title: 'Ask Ask123', value: '1085097' },
        { title: 'TesterNew', value: '1085910' }
    ];

    const titleList = [
        { title: 'Angular', value: 'Angular' },
        { title: 'Java Depeloper', value: 'Java Depeloper' },
        { title: 'part time free job', value: 'part time free job' }
    ];

    const stateList = [
        { title: 'Alabama', value: 'AL' },
        { title: 'Alaska', value: 'AK' },
        { title: 'Arizona', value: 'AZ' },
        { title: 'Arkansas', value: 'AR' },
        { title: 'California', value: 'CA' },
        { title: 'Colorado', value: 'CO' },
        { title: 'Connecticut', value: 'CT' },
        { title: 'Delaware', value: 'DE' },
        { title: 'District Of Columbia', value: 'DC' },
        { title: 'Florida', value: 'FL' },
        { title: 'Georgia', value: 'GA' },
        { title: 'Hawaii', value: 'HI' },
        { title: 'Idaho', value: 'ID' },
        { title: 'Illinois', value: 'IL' },
        { title: 'Indiana', value: 'IN' },
        { title: 'Iowa', value: 'IA' }
    ];

    const billRateList = [
        { title: 'under $30', value: '1' },
        { title: '$30 to $50', value: '2' },
        { title: '$50 to $70', value: '3' },
        { title: 'Above $70', value: '4' }
    ];

    return (
        <div id='listJob'>
            <div className='accordian-wrap'>
                <Stack direction="row" justifyContent="space-between" className='heading'>
                    <Typography component="h5">Filters</Typography>
                    <Button variant="text">Search</Button>
                </Stack>
                <Accordion disableGutters square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Stack className='acc-title' direction="row">
                            <WorkOutlineIcon />
                            <Typography>Job Status</Typography>
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Autocomplete
                            multiple
                            id="tags-filled"
                            options={jobStatusList.map((option) => option.title)}
                            // defaultValue={[jobStatusList[0].title]}
                            freeSolo
                            renderTags={(value: readonly string[], getTagProps) =>
                                value.map((option: string, index: number) => (
                                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    placeholder="Select Job Status..."
                                />
                            )}
                            PaperComponent={CustomPaper}
                        />
                    </AccordionDetails>
                </Accordion>
                <Accordion disableGutters square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <Stack className='acc-title' direction="row">
                            <BusinessCenterOutlinedIcon />
                            <Typography>Job Type</Typography>
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormControl fullWidth>
                            <Select
                                value={jobType}
                                onChange={handleJobTypeChange}
                                displayEmpty
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={1}>Contract</MenuItem>
                                <MenuItem value={0}>Direct</MenuItem>
                            </Select>
                        </FormControl>
                    </AccordionDetails>
                </Accordion>
                <Accordion disableGutters square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                    >
                        <Stack className='acc-title' direction="row">
                            <HandshakeOutlinedIcon />
                            <Typography>Relationship Type</Typography>
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Autocomplete
                            multiple
                            id="tags-filled"
                            options={relationList.map((option) => option.title)}
                            freeSolo
                            renderTags={(value: readonly string[], getTagProps) =>
                                value.map((option: string, index: number) => (
                                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    placeholder="Select Relationship Type"
                                />
                            )}
                            PaperComponent={CustomPaper}
                        />
                    </AccordionDetails>
                </Accordion>
                <Accordion disableGutters square expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                    >
                        <Stack className='acc-title' direction="row">
                            <PermIdentityOutlinedIcon />
                            <Typography>Hiring Manager</Typography>
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Autocomplete
                            multiple
                            id="tags-filled"
                            options={hiringList.map((option) => option.title)}
                            freeSolo
                            renderTags={(value: readonly string[], getTagProps) =>
                                value.map((option: string, index: number) => (
                                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    placeholder="Select Hiring Manager"
                                />
                            )}
                            PaperComponent={CustomPaper}
                        />
                    </AccordionDetails>
                </Accordion>
                <Accordion disableGutters square expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel5bh-content"
                        id="panel5bh-header"
                    >
                        <Stack className='acc-title' direction="row">
                            <EventOutlinedIcon />
                            <Typography>Created Date</Typography>
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormControl fullWidth>
                            <Typography>From</Typography>
                            <TextField id="fromdate" type="date" variant="outlined" />
                        </FormControl>
                        <FormControl fullWidth>
                            <Typography>To</Typography>
                            <TextField id="todate" type="date" variant="outlined" />
                        </FormControl>
                    </AccordionDetails>
                </Accordion>
                <Accordion disableGutters square expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel6bh-content"
                        id="panel6bh-header"
                    >
                        <Stack className='acc-title' direction="row">
                            <SubtitlesOutlinedIcon />
                            <Typography>Job Titles</Typography>
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Autocomplete
                            multiple
                            id="tags-filled"
                            options={titleList.map((option) => option.title)}
                            // defaultValue={[jobStatusList[0].title]}
                            freeSolo
                            renderTags={(value: readonly string[], getTagProps) =>
                                value.map((option: string, index: number) => (
                                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    placeholder="Select Job Titles"
                                />
                            )}
                            PaperComponent={CustomPaper}
                        />
                    </AccordionDetails>
                </Accordion>
                <Accordion disableGutters square expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel7bh-content"
                        id="panel7bh-header"
                    >
                        <Stack className='acc-title' direction="row">
                            <PlaceOutlinedIcon />
                            <Typography>States</Typography>
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Autocomplete
                            multiple
                            id="tags-filled"
                            options={stateList.map((option) => option.title)}
                            freeSolo
                            renderTags={(value: readonly string[], getTagProps) =>
                                value.map((option: string, index: number) => (
                                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    placeholder="Select States"
                                />
                            )}
                            PaperComponent={CustomPaper}
                        />
                    </AccordionDetails>
                </Accordion>
                <Accordion disableGutters square expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel8bh-content"
                        id="panel8bh-header"
                    >
                        <Stack className='acc-title' direction="row">
                            <RequestQuoteOutlinedIcon />
                            <Typography>Bill Rate</Typography>
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Autocomplete
                            multiple
                            id="tags-filled"
                            options={billRateList.map((option) => option.title)}
                            freeSolo
                            renderTags={(value: readonly string[], getTagProps) =>
                                value.map((option: string, index: number) => (
                                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    placeholder="Select Bill Rate"
                                />
                            )}
                            PaperComponent={CustomPaper}
                        />
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    );
}

export default ListJob;