
import { useState, useEffect, SyntheticEvent } from '../../../../shared/modules/React';
import { Accordion, AccordionDetails, AccordionSummary } from '../../../../shared/modules/MaterialImports/Accordion';
import { Typography } from '../../../../shared/modules/MaterialImports/Typography';
import { Stack } from '../../../../shared/modules/MaterialImports/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField, FormControl } from '../../../../shared/modules/MaterialImports/FormInputs';
import { Chip } from '../../../../shared/modules/MaterialImports/Chip';
import { SelectChangeEvent } from '@mui/material/Select';
import { Select } from '../../../../shared/modules/MaterialImports/FormElements';
import { MenuItem } from '../../../../shared/modules/MaterialImports/Menu';
import Paper from '@mui/material/Paper';
import { Button } from '../../../../shared/modules/MaterialImports/Button';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import SubtitlesOutlinedIcon from '@mui/icons-material/SubtitlesOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import CloseIcon from '@mui/icons-material/Close';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import ApiService from "../../../../shared/api/api";
import './Filters.scss';

import { useParams } from 'react-router-dom';
import { trackPromise } from '../../../../shared/modules/PromiseTrackter';

export interface jobFilterProps {
    onSearch: any;
}

export interface searchData {
    jobStatus: string[],
    jobType: string,
    Type: string[],
    hiringManager: string[],
    date1: string,
    date2: string,
    jobTitles: string[],
    state: string[],
    billRate: string[]
}

const JobFilters = ({ onSearch }: jobFilterProps) => {
    const { companyId } = useParams();
    const [expanded, setExpanded] = useState<string | false>(false);
    const [jobtype, setJobtype] = useState('');
    const [hmList, setHmList] = useState<any>([]);
    const [jobTitleList, setJobTitleList] = useState<any>([]);
    const [searchData, setSearchData] = useState<searchData>({
        jobStatus: [],
        jobType: "",
        Type: [],
        hiringManager: [],
        date1: "",
        date2: "",
        jobTitles: [],
        state: [],
        billRate: []
    });

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
        { title: 'All Jobs', value: '1: Open Req,0: Hold,0: Inactive,0: Canceled,Pipeline,Heads Up,Re-Opened,Automation,POC' },
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
        { title: 'Iowa', value: 'IA' },
        { title: 'Kansas', value: 'KS' },
        { title: 'Kentucky', value: 'KY' },
        { title: 'Louisiana', value: 'LA' },
        { title: 'Maine', value: 'ME' },
        { title: 'Maryland', value: 'MD' },
        { title: 'Massachusetts', value: 'MA' },
        { title: 'Marshall Islands', value: 'MH' },
        { title: 'Michigan', value: 'MI' },
        { title: 'Minnesota', value: 'MN' },
        { title: 'Mississippi', value: 'MS' },
        { title: 'Missouri', value: 'MO' },
        { title: 'Montana', value: 'MT' },
        { title: 'Nebraska', value: 'NE' },
        { title: 'Nevada', value: 'NV' },
        { title: 'New Hampshire', value: 'NH' },
        { title: 'New Jersey', value: 'NJ' },
        { title: 'New Mexico', value: 'NM' },
        { title: 'New York', value: 'NY' },
        { title: 'North Carolina', value: 'NC' },
        { title: 'North Dakota', value: 'ND' },
        { title: 'Ohio', value: 'OH' },
        { title: 'Oklahoma', value: 'OK' },
        { title: 'Oregon', value: 'OR' },
        { title: 'Pennsylvania', value: 'PA' },
        { title: 'Rhode Island', value: 'RI' },
        { title: 'South Carolina', value: 'SC' },
        { title: 'South Dakota', value: 'SD' },
        { title: 'Tennessee', value: 'TN' },
        { title: 'Texas', value: 'TX' },
        { title: 'Utah', value: 'UT' },
        { title: 'Vermont', value: 'VT' },
        { title: 'Virginia', value: 'VA' },
        { title: 'Washington', value: 'WA' },
        { title: 'West Virginia', value: 'WV' },
        { title: 'Wisconsin', value: 'WI' },
        { title: 'Wyoming', value: 'WY' }
    ];

    const billRateList = [
        { title: 'under $30', value: '1' },
        { title: '$30 to $50', value: '2' },
        { title: '$50 to $70', value: '3' },
        { title: 'Above $70', value: '4' }
    ];

    const handleJobStatusChange = (value: string[]) => {
        setSearchData({
            ...searchData,
            jobStatus: value
        })
    }

    const handleJobTypeChange = (event: SelectChangeEvent) => {
        setSearchData({
            ...searchData,
            jobType: (event.target.value === "1" ? "Contract" : (event.target.value === "0" ? "Direct" : ""))
        })

        setJobtype(event.target.value);
    };

    const handleRelationshipChange = (value: string[]) => {
        setSearchData({
            ...searchData,
            Type: value
        })
    }

    const handleHMChange = (value: string[]) => {
        setSearchData({
            ...searchData,
            hiringManager: value
        })
    }

    const handleDate1Change = (event: any) => {
        setSearchData({
            ...searchData,
            date1: event.target.value
        })
    };

    const handleDate2Change = (event: any) => {
        setSearchData({
            ...searchData,
            date2: event.target.value
        })
    };

    const handleJobTitleChange = (value: string[]) => {
        setSearchData({
            ...searchData,
            jobTitles: value
        })
    }

    const handleStatesChange = (value: string[]) => {
        setSearchData({
            ...searchData,
            state: value
        })
    }

    const handleBillRateChange = (value: string[]) => {
        setSearchData({
            ...searchData,
            billRate: value
        })
    }

    const getValueData = (obj: any, value: string[]) => {
        let newValues: string[] = [];
        for (let i = 0; i < value.length; i++) {
            if (obj === jobTitleList || obj === hmList) {
                newValues.push(obj[obj.findIndex((x: any) => x.text === value[i])].value);
            } else {
                newValues.push(obj[obj.findIndex((x: any) => x.title === value[i])].value);
            }
        }

        return newValues.toString();
    }

    const handleClearAll = (e: SyntheticEvent) => {
        for (const item in searchData) {
            handleClear(e, item);
        }
        setSearchData({
            ...searchData,
            jobType: '',
            date1: '',
            date2: ''
        })
        setJobtype('')
    }

    const handleClear = (e: SyntheticEvent, key: string, i?: number) => {
        e.stopPropagation();
        if (key === "date") {
            setSearchData({
                ...searchData,
                date1: "",
                date2: ""
            })
        } else if (key === "jobType") {
            setSearchData({
                ...searchData,
                [key]: ""
            })
            setJobtype('')
        } else {
            let arr = searchData[key as keyof typeof searchData];
            if (typeof arr !== "string") {
                i ? arr.splice(i, 1) : arr.splice(0, arr.length)
                setSearchData({
                    ...searchData,
                    [key]: arr
                })
            }
        }
    }

    const searchJobs = () => {
        const data = {
            compId: companyId,
            txtJobId: "",
            jobId: "",
            lastId: "20",
            Username: "",
            UserId: "",
            jobType: jobtype,
            jobStatus: getValueData(jobStatusList, searchData.jobStatus),
            state: getValueData(stateList, searchData.state),
            billRate: getValueData(billRateList, searchData.billRate),
            Type: getValueData(relationList, searchData.Type),
            jobTitles: getValueData(jobTitleList, searchData.jobTitles),
            hiringManager: getValueData(hmList, searchData.hiringManager),
            date1: searchData.date1,
            date2: searchData.date2
        }
        // console.log(data)
        onSearch(data);
    }

    const loadHmList = () => {
        trackPromise(
            ApiService.getByParams(193, 'autocompleteContacts.jsp', { search: '', compid: companyId }).then(
                (response: any) => {
                    setHmList(response.data);
                }
            )
        )
    }

    const loadJobTitles = () => {
        trackPromise(
            ApiService.getByParams(193, 'autocompleteJobtitles.jsp', { search: '', compid: companyId }).then(
                (response: any) => {
                    setJobTitleList(response.data);
                }
            )
        )
    }

    const handleKey = (e: any) => {
        console.log('e')
        if (e.key === "Enter") {
            searchJobs();
        }
    }

    useEffect(() => {
        loadHmList();
        loadJobTitles();
        searchJobs();
    }, []);

    return (
        <div id='JobFilters'>
            <div className='accordian-wrap customFilterChips'>
                <Stack direction="row" justifyContent="space-between" className='heading'>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography component="h5">Filters</Typography>
                        {((searchData.jobStatus.length > 0) ||
                            searchData.jobType ||
                            (searchData.Type.length > 0) ||
                            (searchData.hiringManager.length > 0) ||
                            (searchData.jobTitles.length > 0) ||
                            (searchData.billRate.length > 0) ||
                            (searchData.state.length > 0) ||
                            searchData.date1 ||
                            searchData.date2) &&
                            <Stack
                                className='clearStack'
                                direction="row"
                                justifyContent="space-around"
                                onClick={(e) => handleClearAll(e)}
                            >
                                <CloseIcon />
                                <Typography>
                                    {searchData.jobStatus.length +
                                        (searchData.jobType !== "" ? 1 : 0) +
                                        searchData.Type.length +
                                        searchData.hiringManager.length +
                                        searchData.jobTitles.length +
                                        searchData.billRate.length +
                                        searchData.state.length +
                                        (searchData.date1 !== "" ? 1 : 0) +
                                        (searchData.date2 !== "" ? 1 : 0)}
                                </Typography>
                            </Stack>
                        }
                    </Stack>
                    <Button variant="text" onClick={searchJobs}>Search</Button>
                </Stack>
                <div className='filterListTab'>
                    <Accordion disableGutters square
                        expanded={expanded === 'panel1'}
                        onChange={handleChange('panel1')}
                    >
                        <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Stack sx={{ width: '100%' }}>
                                <Stack className='acc-title' direction="row" justifyContent="space-between">
                                    <Stack direction="row" alignItems="center">
                                        <WorkOutlineIcon className='title-icon' />
                                        <Typography>Job Status</Typography>
                                    </Stack>
                                    {(searchData.jobStatus.length > 0) && <Stack
                                        className='clearStack'
                                        direction="row"
                                        justifyContent="space-around"
                                        onClick={(event) => handleClear(event, "jobStatus")}
                                    >
                                        <CloseIcon />
                                        <Typography>
                                            {searchData.jobStatus.length}
                                        </Typography>
                                    </Stack>
                                    }
                                </Stack>
                                {(searchData.jobStatus.length > 0 && expanded !== 'panel1') &&
                                    <Stack direction="row" mt={1} flexWrap="wrap">
                                        <Typography>Status:</Typography>
                                        {searchData.jobStatus.map((item: any, i: number) => (
                                            <Chip label={item} key={i} icon={<CloseIcon />} className='selectedFilterChips' onClick={(event) => handleClear(event, "jobStatus", i)} />
                                        ))}
                                    </Stack>
                                }
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Autocomplete
                                multiple
                                id="tags-filled"
                                options={jobStatusList.map((option) => option.title)}
                                defaultValue={[jobStatusList[1].title]}
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
                                onChange={(event, value) => (value ? handleJobStatusChange(value) : "")}
                            />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion disableGutters square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                        >
                            <Stack sx={{ width: '100%' }}>
                                <Stack className='acc-title' direction="row" justifyContent="space-between">
                                    <Stack direction="row" alignItems="center">
                                        <BusinessCenterOutlinedIcon className='title-icon' />
                                        <Typography>Job Type</Typography>
                                    </Stack>
                                    {searchData.jobType && <Stack
                                        className='clearStack'
                                        direction="row"
                                        justifyContent="space-around"
                                        onClick={(event) => handleClear(event, "jobType")}
                                    >
                                        <CloseIcon />
                                        <Typography>
                                            {searchData.jobType !== "" ? 1 : 0}
                                        </Typography>
                                    </Stack>
                                    }
                                </Stack>
                                {(searchData.jobType !== "" && expanded !== 'panel2') &&
                                    <Stack direction="row" mt={1} flexWrap="wrap">
                                        <div className='filterLabelName'>Type:</div>
                                        <Chip label={searchData.jobType} icon={<CloseIcon />} className='selectedFilterChips' onClick={(event) => handleClear(event, "jobType")} />
                                    </Stack>
                                }
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormControl fullWidth>
                                <Select
                                    value={jobtype}
                                    onChange={handleJobTypeChange}
                                    onKeyUp={handleKey}
                                    displayEmpty
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="1">Contract</MenuItem>
                                    <MenuItem value="0">Direct</MenuItem>
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
                            <Stack sx={{ width: '100%' }}>
                                <Stack className='acc-title' direction="row" justifyContent="space-between">
                                    <Stack direction="row" alignItems="center">
                                        <HandshakeOutlinedIcon className='title-icon' />
                                        <Typography>Relationship Type</Typography>
                                    </Stack>
                                    {(searchData.Type.length > 0) && <Stack
                                        className='clearStack'
                                        direction="row"
                                        justifyContent="space-around"
                                        onClick={(event) => handleClear(event, "Type")}
                                    >
                                        <CloseIcon />
                                        <Typography>
                                            {searchData.Type.length}
                                        </Typography>
                                    </Stack>
                                    }
                                </Stack>
                                {(searchData.Type.length > 0 && expanded !== 'panel3') &&
                                    <Stack direction="row" mt={1} flexWrap="wrap">
                                        <Typography>Type:</Typography>
                                        {searchData.Type.map((item: any, i: number) => (
                                            <Chip label={item} key={i} icon={<CloseIcon />} className='selectedFilterChips' onClick={(event) => handleClear(event, "Type", i)} />
                                        ))}
                                    </Stack>
                                }
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Autocomplete
                                multiple
                                id="tags-filled"
                                options={relationList.map((option) => option.title)}
                                value={searchData.Type}
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
                                onChange={(event, value) => (value ? handleRelationshipChange(value) : "")}
                            />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion disableGutters square expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                        <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            aria-controls="panel4bh-content"
                            id="panel4bh-header"
                        >
                            <Stack sx={{ width: '100%' }}>
                                <Stack className='acc-title' direction="row" justifyContent="space-between">
                                    <Stack direction="row" alignItems="center">
                                        <PermIdentityOutlinedIcon className='title-icon' />
                                        <Typography>Hiring Manager</Typography>
                                    </Stack>
                                    {(searchData.hiringManager.length > 0) && <Stack
                                        className='clearStack'
                                        direction="row"
                                        justifyContent="space-around"
                                        onClick={(event) => handleClear(event, "hiringManager")}
                                    >
                                        <CloseIcon />
                                        <Typography>
                                            {searchData.hiringManager.length}
                                        </Typography>
                                    </Stack>
                                    }
                                </Stack>
                                {(searchData.hiringManager.length > 0 && expanded !== 'panel4') &&
                                    <Stack direction="row" mt={1} flexWrap="wrap">
                                        <Typography>Manager:</Typography>
                                        {searchData.hiringManager.map((item: any, i: number) => (
                                            <Chip label={item} key={i} icon={<CloseIcon />} className='selectedFilterChips' onClick={(event) => handleClear(event, "hiringManager", i)} />
                                        ))}
                                    </Stack>
                                }
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Autocomplete
                                multiple
                                id="tags-filled"
                                options={hmList.map((option: any) => option.text)}
                                value={searchData.hiringManager}
                                freeSolo
                                renderTags={(value: readonly string[], getTagProps) =>
                                    value.map((option: any, index: number) => (
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
                                onChange={(event, value) => (value ? handleHMChange(value) : "")}
                            />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion disableGutters square expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                        <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            aria-controls="panel5bh-content"
                            id="panel5bh-header"
                        >
                            <Stack sx={{ width: '100%' }}>
                                <Stack className='acc-title' direction="row" justifyContent="space-between">
                                    <Stack direction="row" alignItems="center">
                                        <EventOutlinedIcon className='title-icon' />
                                        <Typography>Created Date</Typography>
                                    </Stack>
                                    {(searchData.date1 || searchData.date2) && <Stack
                                        className='clearStack'
                                        direction="row"
                                        justifyContent="space-around"
                                        onClick={(event) => handleClear(event, "date")}
                                    >
                                        <CloseIcon />
                                        <Typography>
                                            {(searchData.date1 !== "" ? 1 : 0) + (searchData.date2 !== "" ? 1 : 0)}
                                        </Typography>
                                    </Stack>
                                    }
                                </Stack>
                                {((searchData.date1 !== "" || searchData.date2 !== "") && expanded !== 'panel5') &&
                                    <Stack direction="row" mt={1} flexWrap="wrap">
                                        <div className='filterLabelName'>Date:</div>
                                        {searchData.date1 !== "" &&
                                            <Chip label={searchData.date1} icon={<CloseIcon />} className='selectedFilterChips' onClick={(event) => handleClear(event, "date1")} />
                                        }
                                        {searchData.date1 !== "" &&
                                            <Chip label={searchData.date2} icon={<CloseIcon />} className='selectedFilterChips' onClick={(event) => handleClear(event, "date2")} />
                                        }
                                    </Stack>
                                }
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormControl fullWidth>
                                <Typography>From</Typography>
                                <TextField id="fromdate" type="date" variant="outlined" value={searchData.date1} onChange={handleDate1Change}
                                    onKeyUp={handleKey} />
                            </FormControl>
                            <FormControl fullWidth>
                                <Typography>To</Typography>
                                <TextField id="todate" type="date" variant="outlined" value={searchData.date2} onChange={handleDate2Change}
                                    onKeyUp={handleKey} />
                            </FormControl>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion disableGutters square expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                        <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            aria-controls="panel6bh-content"
                            id="panel6bh-header"
                        >
                            <Stack sx={{ width: '100%' }}>
                                <Stack className='acc-title' direction="row" justifyContent="space-between">
                                    <Stack direction="row" alignItems="center">
                                        <SubtitlesOutlinedIcon className='title-icon' />
                                        <Typography>Job Titles</Typography>
                                    </Stack>
                                    {(searchData.jobTitles.length > 0) && <Stack
                                        className='clearStack'
                                        direction="row"
                                        justifyContent="space-around"
                                        onClick={(event) => handleClear(event, "jobTitles")}
                                    >
                                        <CloseIcon />
                                        <Typography>
                                            {searchData.jobTitles.length}
                                        </Typography>
                                    </Stack>
                                    }
                                </Stack>
                                {(searchData.jobTitles.length > 0 && expanded !== 'panel6') &&
                                    <Stack direction="row" mt={1} flexWrap="wrap">
                                        <Typography>Titles:</Typography>
                                        {searchData.jobTitles.map((item: any, i: number) => (
                                            <Chip label={item} key={i} icon={<CloseIcon />} className='selectedFilterChips' onClick={(event) => handleClear(event, "jobTitles", i)} />
                                        ))}
                                    </Stack>
                                }
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Autocomplete
                                multiple
                                id="tags-filled"
                                options={jobTitleList.map((option: any) => option.text)}
                                value={searchData.jobTitles}
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
                                onChange={(event, value) => (value ? handleJobTitleChange(value) : "")}
                            />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion disableGutters square expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
                        <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            aria-controls="panel7bh-content"
                            id="panel7bh-header"
                        >
                            <Stack sx={{ width: '100%' }}>
                                <Stack className='acc-title' direction="row" justifyContent="space-between">
                                    <Stack direction="row" alignItems="center">
                                        <PlaceOutlinedIcon className='title-icon' />
                                        <Typography>States</Typography>
                                    </Stack>
                                    {(searchData.state.length > 0) && <Stack
                                        className='clearStack'
                                        direction="row"
                                        justifyContent="space-around"
                                        onClick={(event) => handleClear(event, "state")}
                                    >
                                        <CloseIcon />
                                        <Typography>
                                            {searchData.state.length}
                                        </Typography>
                                    </Stack>
                                    }
                                </Stack>
                                {(searchData.state.length > 0 && expanded !== 'panel7') &&
                                    <Stack direction="row" mt={1} flexWrap="wrap">
                                        <Typography>States:</Typography>
                                        {searchData.state.map((item: any, i: number) => (
                                            <Chip label={item} key={i} icon={<CloseIcon />} className='selectedFilterChips' onClick={(event) => handleClear(event, "state", i)} />
                                        ))}
                                    </Stack>
                                }
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Autocomplete
                                multiple
                                id="tags-filled"
                                options={stateList.map((option) => option.title)}
                                value={searchData.state}
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
                                onChange={(event, value) => (value ? handleStatesChange(value) : "")}
                            />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion disableGutters square expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
                        <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            aria-controls="panel8bh-content"
                            id="panel8bh-header"
                        >
                            <Stack sx={{ width: '100%' }}>
                                <Stack className='acc-title' direction="row" justifyContent="space-between">
                                    <Stack direction="row" alignItems="center">
                                        <RequestQuoteOutlinedIcon className='title-icon' />
                                        <Typography>Bill Rate</Typography>
                                    </Stack>
                                    {(searchData.billRate.length > 0) && <Stack
                                        className='clearStack'
                                        direction="row"
                                        justifyContent="space-around"
                                        onClick={(event) => handleClear(event, "billRate")}
                                    >
                                        <CloseIcon />
                                        <Typography>
                                            {searchData.billRate.length}
                                        </Typography>
                                    </Stack>
                                    }
                                </Stack>
                                {(searchData.billRate.length > 0 && expanded !== 'panel8') &&
                                    <Stack direction="row" mt={1} flexWrap="wrap">
                                        <Typography>Bill Rate:</Typography>
                                        {searchData.billRate.map((item: any, i: number) => (
                                            <Chip label={item} key={i} icon={<CloseIcon />} className='selectedFilterChips' onClick={(event) => handleClear(event, "billRate", i)} />
                                        ))}
                                    </Stack>
                                }
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Autocomplete
                                multiple
                                id="tags-filled"
                                options={billRateList.map((option) => option.title)}
                                value={searchData.billRate}
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
                                onChange={(event, value) => (value ? handleBillRateChange(value) : "")}
                            />
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
        </div>
    );
}

export default JobFilters;