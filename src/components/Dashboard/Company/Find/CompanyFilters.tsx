import { useState, SyntheticEvent } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import BusinessIcon from '@mui/icons-material/Business';
import SubtitlesOutlinedIcon from '@mui/icons-material/SubtitlesOutlined';
import CloseIcon from '@mui/icons-material/Close';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
// import ApiService from "../../../../shared/api/api";
import './CompanyFilters.scss';
import { MUIAutoComplete } from '../../../shared/MUIAutoComplete/MUIAutoComplete';
import { globalData } from '../../../../shared/services/globalData';


export interface jobFilterProps {
    onSearch: any;
}

export interface searchData {
    companyName: string,
    companyId: string,
    contactFName: string,
    contactLName: string,
    jobReference: string,
    maxRecords: string
}


const CompanyFilters = ({ onSearch }: jobFilterProps) => {
    const [expanded, setExpanded] = useState<string | false>(false);
    const [searchData, setSearchData] = useState<searchData>({
        companyName: "",
        companyId: "",
        contactFName: "",
        contactLName: "",
        jobReference: "",
        maxRecords: ""
    });

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleClearAll = () => {
        setSearchData({
            companyName: "",
            companyId: "",
            contactFName: "",
            contactLName: "",
            jobReference: "",
            maxRecords: ""
        })
    }

    const handleClear = (key: string, e: SyntheticEvent, i?: number) => {
        e.stopPropagation();

        setSearchData({
            ...searchData,
            [key as keyof typeof searchData]: ""
        })
    }

    const handleFilterData = (value: string, key: any) => {
        setSearchData({
            ...searchData,
            [key]: value
        })
    }

    const searchJobs = () => {
        const data = {
            companyId: searchData.companyId,
            companyName: searchData.companyName,
            firstName: searchData.contactFName,
            lastName: searchData.contactLName,
            noOfRecords: "20",
            reference: searchData.jobReference,
        }
        onSearch(data);
    }

    const openCompanyView = (id: string) => {
        if (id) {
            window.open(globalData.getWindowLocation() + "company/view/" + id);
        }
    }

    const handleKey = (e: any) => {
        if (e.key === "Enter") {
            searchJobs();
        }
    }

    return (
        <div id='CompanyFilters'>
            <div className='accordian-wrap customFilterChips'>
                <Stack direction="row" justifyContent="space-between" className='heading'>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography component="h5">Filters</Typography>
                        {((searchData.companyName !== "") ||
                            (searchData.companyId !== "") ||
                            (searchData.contactFName !== "") ||
                            (searchData.contactLName !== "") ||
                            (searchData.jobReference !== "") ||
                            (searchData.maxRecords !== "")
                        ) &&
                            <Stack
                                className='clearStack'
                                direction="row"
                                justifyContent="space-around"
                                onClick={handleClearAll}
                            >
                                <CloseIcon />
                                <Typography>
                                    {(searchData.companyName !== "" ? 1 : 0) +
                                        (searchData.companyId !== "" ? 1 : 0) +
                                        (searchData.contactFName !== "" ? 1 : 0) +
                                        (searchData.contactLName !== "" ? 1 : 0) +
                                        (searchData.jobReference !== "" ? 1 : 0) +
                                        (searchData.maxRecords !== "" ? 1 : 0)}
                                </Typography>
                            </Stack>
                        }
                    </Stack>
                    <Button variant="text" onClick={searchJobs}>Search</Button>
                </Stack>
                <div className='filterListTab'>
                    <Accordion disableGutters square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Stack sx={{ width: '100%' }}>
                                <Stack className='acc-title' direction="row" justifyContent="space-between">
                                    <Stack direction="row" alignItems="center">
                                        <BusinessIcon className='title-icon' />
                                        <Typography>Company Name</Typography>
                                    </Stack>
                                    {(searchData.companyId !== "") && <Stack
                                        className='clearStack'
                                        direction="row"
                                        justifyContent="space-around"
                                        onClick={
                                            (event) => {
                                                handleClear("companyName", event)
                                                handleClear("companyId", event)
                                            }
                                        }
                                    >
                                        <CloseIcon />
                                        <Typography>
                                            {searchData.companyId !== "" && 1}
                                        </Typography>
                                    </Stack>
                                    }
                                </Stack>
                                {(searchData.companyName !== "" && expanded !== 'panel1') &&
                                    <Stack direction="row" mt={1} flexWrap="wrap">
                                        <div className='filterLabelName'>Name:</div>
                                        <Chip label={searchData.companyName} icon={<CloseIcon />} className='selectedFilterChips' onClick={
                                            (event) => {
                                                handleClear("companyName", event)
                                                handleClear("companyId", event)
                                            }
                                        }
                                        />
                                    </Stack>
                                }
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <MUIAutoComplete
                                id='companyName'
                                handleChange={(id: any, name: string) => {
                                    handleFilterData(name, "companyName");
                                    handleFilterData(id, "companyId");
                                    openCompanyView(id);
                                }}
                                valuePassed={{}}
                                isMultiple={false}
                                width="100%"
                                type='companyName'
                                placeholder="Enter company Name..."
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
                                        <BadgeOutlinedIcon className='title-icon' />
                                        <Typography>Company Id</Typography>
                                    </Stack>
                                    {(searchData.companyId !== "") && <Stack
                                        className='clearStack'
                                        direction="row"
                                        justifyContent="space-around"
                                        onClick={(event) => handleClear("companyId", event)}
                                    >
                                        <CloseIcon />
                                        <Typography>
                                            {searchData.companyId !== "" && 1}
                                        </Typography>
                                    </Stack>
                                    }
                                </Stack>
                                {(searchData.companyId !== "" && expanded !== 'panel2') &&
                                    <Stack direction="row" mt={1} flexWrap="wrap">
                                        <div className='filterLabelName'>Id:</div>
                                        <Chip label={searchData.companyId} icon={<CloseIcon />} className='selectedFilterChips' onClick={(event) => handleClear("companyId", event)} />
                                    </Stack>
                                }
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextField
                                id='companyId'
                                placeholder='Enter company Id...'
                                variant='outlined'
                                value={searchData.companyId}
                                fullWidth
                                size='small'
                                onChange={(event) => handleFilterData(event.target.value, "companyId")}
                                onKeyUp={handleKey}
                            />
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
                                        <SubtitlesOutlinedIcon className='title-icon' />
                                        <Typography>Contact First Name</Typography>
                                    </Stack>
                                    {(searchData.contactFName !== "") && <Stack
                                        className='clearStack'
                                        direction="row"
                                        justifyContent="space-around"
                                        onClick={(event) => handleClear("contactFName", event)}
                                    >
                                        <CloseIcon />
                                        <Typography>
                                            {searchData.contactFName !== "" && 1}
                                        </Typography>
                                    </Stack>
                                    }
                                </Stack>
                                {(searchData.contactFName !== "" && expanded !== 'panel3') &&
                                    <Stack direction="row" mt={1} flexWrap="wrap">
                                        <div className='filterLabelName'>First Name:</div>
                                        <Chip label={searchData.contactFName} icon={<CloseIcon />} className='selectedFilterChips' onClick={(event) => handleClear("contactFName", event)} />
                                    </Stack>
                                }
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextField
                                id='contactFName'
                                placeholder='Enter contact first name...'
                                variant='outlined'
                                value={searchData.contactFName}
                                fullWidth
                                size='small'
                                onChange={(event) => handleFilterData(event.target.value, "contactFName")}
                                onKeyUp={handleKey}
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
                                        <SubtitlesOutlinedIcon className='title-icon' />
                                        <Typography>Contact Last Name</Typography>
                                    </Stack>
                                    {(searchData.contactLName !== "") && <Stack
                                        className='clearStack'
                                        direction="row"
                                        justifyContent="space-around"
                                        onClick={(event) => handleClear("contactLName", event)}
                                    >
                                        <CloseIcon />
                                        <Typography>
                                            {searchData.contactLName !== "" && 1}
                                        </Typography>
                                    </Stack>
                                    }
                                </Stack>
                                {(searchData.contactLName !== "" && expanded !== 'panel4') &&
                                    <Stack direction="row" mt={1} flexWrap="wrap">
                                        <div className='filterLabelName'>Last Name:</div>
                                        <Chip label={searchData.contactLName} icon={<CloseIcon />} className='selectedFilterChips' onClick={(event) => handleClear("contactLName", event)} />
                                    </Stack>
                                }
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextField
                                id='contactLName'
                                placeholder='Enter contact last name...'
                                variant='outlined'
                                value={searchData.contactLName}
                                fullWidth
                                size='small'
                                onChange={(event) => handleFilterData(event.target.value, "contactLName")}
                                onKeyUp={handleKey}
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
                                        <WorkOutlineIcon className='title-icon' />
                                        <Typography>Job reference</Typography>
                                    </Stack>
                                    {(searchData.jobReference !== "") && <Stack
                                        className='clearStack'
                                        direction="row"
                                        justifyContent="space-around"
                                        onClick={(event) => handleClear("jobReference", event)}
                                    >
                                        <CloseIcon />
                                        <Typography>
                                            {searchData.jobReference !== "" && 1}
                                        </Typography>
                                    </Stack>
                                    }
                                </Stack>
                                {(searchData.jobReference !== "" && expanded !== 'panel5') &&
                                    <Stack direction="row" mt={1} flexWrap="wrap">
                                        <div className='filterLabelName'>Reference:</div>
                                        <Chip label={searchData.jobReference} icon={<CloseIcon />} className='selectedFilterChips' onClick={(event) => handleClear("jobReference", event)} />
                                    </Stack>
                                }
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextField
                                id='jobReference'
                                placeholder='Enter job reference...'
                                variant='outlined'
                                value={searchData.jobReference}
                                fullWidth
                                size='small'
                                onChange={(event) => handleFilterData(event.target.value, "jobReference")}
                                onKeyUp={handleKey}
                            />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className='d-none' disableGutters square expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                        <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            aria-controls="panel6bh-content"
                            id="panel6bh-header"
                        >
                            <Stack sx={{ width: '100%' }}>
                                <Stack className='acc-title' direction="row" justifyContent="space-between">
                                    <Stack direction="row" alignItems="center">
                                        <ReplyOutlinedIcon className='title-icon' />
                                        <Typography>Maximum Records To Return</Typography>
                                    </Stack>
                                    {(searchData.maxRecords !== "") && <Stack
                                        className='clearStack'
                                        direction="row"
                                        justifyContent="space-around"
                                        onClick={(event) => handleClear("maxRecords", event)}
                                    >
                                        <CloseIcon />
                                        <Typography>
                                            {searchData.maxRecords !== "" && 1}
                                        </Typography>
                                    </Stack>
                                    }
                                </Stack>
                                {(searchData.maxRecords !== "" && expanded !== 'panel6') &&
                                    <Stack direction="row" mt={1} flexWrap="wrap">
                                        <div className='filterLabelName'>Maximum Records:</div>
                                        <Chip label={searchData.maxRecords} icon={<CloseIcon />} className='selectedFilterChips' onClick={(event) => handleClear("maxRecords", event)} />
                                    </Stack>
                                }
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextField fullWidth
                                value={searchData.maxRecords}
                                size='small'
                                select
                                onChange={(e) => handleFilterData(e.target.value, "maxRecords")}
                            >
                                <MenuItem value="">Select</MenuItem>
                                <MenuItem value="20">10</MenuItem>
                                <MenuItem value="50">50</MenuItem>
                                <MenuItem value="100">100</MenuItem>
                                <MenuItem value="200">200</MenuItem>
                                <MenuItem value="500">500</MenuItem>
                                <MenuItem value="1000">1000</MenuItem>
                            </TextField>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
        </div>
    )
}

export default CompanyFilters;