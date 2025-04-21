import { useState, SyntheticEvent } from '../../../../shared/modules/React';
import { Accordion, AccordionDetails, AccordionSummary } from '../../../../shared/modules/MaterialImports/Accordion';
import { Typography } from '../../../../shared/modules/MaterialImports/Typography';
import { Stack } from '../../../../shared/modules/MaterialImports/Stack';
import { TextField } from '../../../../shared/modules/MaterialImports/TextField';
import { Chip } from '../../../../shared/modules/MaterialImports/Chip';
import { MenuItem } from '../../../../shared/modules/MaterialImports/Menu';
import { Button } from '../../../../shared/modules/MaterialImports/Button';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import BusinessIcon from '@mui/icons-material/Business';
import SubtitlesOutlinedIcon from '@mui/icons-material/SubtitlesOutlined';
import CloseIcon from '@mui/icons-material/Close';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
// import ApiService from "../../../../shared/api/api";
import './CandidateFilters.scss';

// import { useParams } from 'react-router-dom';

export interface jobFilterProps {
    onSearch: any;
}

export interface searchData {
    firstName: string,
    lastName: string,
    candidateID: string,
    email: string,
    phoneNumber: string,
    maxRecords: string
}


const CandidateFilters = ({ onSearch }: jobFilterProps) => {
    // const { id } = useParams();
    const [expanded, setExpanded] = useState<string | false>(false);
    const [searchData, setSearchData] = useState<searchData>({
        firstName: "",
        lastName: "",
        candidateID: "",
        email: "",
        phoneNumber: "",
        maxRecords: ""
    });

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleClearAll = () => {
        setSearchData({
            firstName: "",
            lastName: "",
            candidateID: "",
            email: "",
            phoneNumber: "",
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
            candidateId: searchData.candidateID,
            email: searchData.email,
            firstName: searchData.firstName,
            lastName: searchData.lastName,
            noOfRecords: "20",
            phoneNumber: searchData.phoneNumber
        }
        // console.log(data)
        onSearch(data);
    }

    const handleKey = (e: any) => {
        if (e.key === "Enter") {
            searchJobs();
        }
    }

    return (
        <div id='CandidateFilters'>
            <div className='accordian-wrap customFilterChips'>
                <Stack direction="row" justifyContent="space-between" className='heading'>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography component="h5">Filters</Typography>
                        {((searchData.firstName !== "") ||
                            (searchData.lastName !== "") ||
                            (searchData.candidateID !== "") ||
                            (searchData.email !== "") ||
                            (searchData.phoneNumber !== "") ||
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
                                    {(searchData.firstName !== "" ? 1 : 0) +
                                        (searchData.lastName !== "" ? 1 : 0) +
                                        (searchData.candidateID !== "" ? 1 : 0) +
                                        (searchData.email !== "" ? 1 : 0) +
                                        (searchData.phoneNumber !== "" ? 1 : 0) +
                                        (searchData.maxRecords !== "" ? 1 : 0)}
                                </Typography>
                            </Stack>
                        }
                    </Stack>
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
                                        <Typography>First Name</Typography>
                                    </Stack>
                                    {(searchData.firstName !== "") && <Stack
                                        className='clearStack'
                                        direction="row"
                                        justifyContent="space-around"
                                        onClick={(event) => handleClear("firstName", event)}
                                    >
                                        <CloseIcon />
                                        <Typography>
                                            {searchData.firstName !== "" && 1}
                                        </Typography>
                                    </Stack>
                                    }
                                </Stack>
                                {(searchData.firstName !== "" && expanded !== 'panel1') &&
                                    <Stack direction="row" mt={1} flexWrap="wrap">
                                        <div className='filterLabelName'>Name:</div>
                                        <Chip label={searchData.firstName} icon={<CloseIcon />} className='selectedFilterChips' onClick={(event) => handleClear("firstName", event)} />
                                    </Stack>
                                }
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextField
                                id='firstName'
                                placeholder='Enter first name...'
                                variant='outlined'
                                value={searchData.firstName}
                                fullWidth
                                size='small'
                                onChange={(event) => handleFilterData(event.target.value, "firstName")}
                                onKeyUp={handleKey}
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
                                        <Typography>Last Name</Typography>
                                    </Stack>
                                    {(searchData.lastName !== "") && <Stack
                                        className='clearStack'
                                        direction="row"
                                        justifyContent="space-around"
                                        onClick={(event) => handleClear("lastName", event)}
                                    >
                                        <CloseIcon />
                                        <Typography>
                                            {searchData.lastName !== "" && 1}
                                        </Typography>
                                    </Stack>
                                    }
                                </Stack>
                                {(searchData.lastName !== "" && expanded !== 'panel2') &&
                                    <Stack direction="row" mt={1} flexWrap="wrap">
                                        <div className='filterLabelName'>Name:</div>
                                        <Chip label={searchData.lastName} icon={<CloseIcon />} className='selectedFilterChips' onClick={(event) => handleClear("lastName", event)} />
                                    </Stack>
                                }
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextField
                                id='lastName'
                                placeholder='Enter last name...'
                                variant='outlined'
                                value={searchData.lastName}
                                fullWidth
                                size='small'
                                onChange={(event) => handleFilterData(event.target.value, "lastName")}
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
                                        <Typography>Candidate ID</Typography>
                                    </Stack>
                                    {(searchData.candidateID !== "") && <Stack
                                        className='clearStack'
                                        direction="row"
                                        justifyContent="space-around"
                                        onClick={(event) => handleClear("candidateID", event)}
                                    >
                                        <CloseIcon />
                                        <Typography>
                                            {searchData.candidateID !== "" && 1}
                                        </Typography>
                                    </Stack>
                                    }
                                </Stack>
                                {(searchData.candidateID !== "" && expanded !== 'panel3') &&
                                    <Stack direction="row" mt={1} flexWrap="wrap">
                                        <div className='filterLabelName'>Id:</div>
                                        <Chip label={searchData.candidateID} icon={<CloseIcon />} className='selectedFilterChips' onClick={(event) => handleClear("candidateID", event)} />
                                    </Stack>
                                }
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextField
                                id='candidateID'
                                placeholder='Enter Candidate ID...'
                                variant='outlined'
                                value={searchData.candidateID}
                                fullWidth
                                size='small'
                                onChange={(event) => handleFilterData(event.target.value, "candidateID")}
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
                                        <Typography>Email</Typography>
                                    </Stack>
                                    {(searchData.email !== "") && <Stack
                                        className='clearStack'
                                        direction="row"
                                        justifyContent="space-around"
                                        onClick={(event) => handleClear("email", event)}
                                    >
                                        <CloseIcon />
                                        <Typography>
                                            {searchData.email !== "" && 1}
                                        </Typography>
                                    </Stack>
                                    }
                                </Stack>
                                {(searchData.email !== "" && expanded !== 'panel4') &&
                                    <Stack direction="row" mt={1} flexWrap="wrap">
                                        <div className='filterLabelName'>Email:</div>
                                        <Chip label={searchData.email} icon={<CloseIcon />} className='selectedFilterChips' onClick={(event) => handleClear("email", event)} />
                                    </Stack>
                                }
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextField
                                id='email'
                                placeholder='Enter Email...'
                                variant='outlined'
                                value={searchData.email}
                                fullWidth
                                size='small'
                                type="email"
                                onChange={(event) => handleFilterData(event.target.value, "email")}
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
                                        <Typography>Contact number</Typography>
                                    </Stack>
                                    {(searchData.phoneNumber !== "") && <Stack
                                        className='clearStack'
                                        direction="row"
                                        justifyContent="space-around"
                                        onClick={(event) => handleClear("phoneNumber", event)}
                                    >
                                        <CloseIcon />
                                        <Typography>
                                            {searchData.phoneNumber !== "" && 1}
                                        </Typography>
                                    </Stack>
                                    }
                                </Stack>
                                {(searchData.phoneNumber !== "" && expanded !== 'panel5') &&
                                    <Stack direction="row" mt={1} flexWrap="wrap">
                                        <div className='filterLabelName'>Phone:</div>
                                        <Chip label={searchData.phoneNumber} icon={<CloseIcon />} className='selectedFilterChips' onClick={(event) => handleClear("jobReference", event)} />
                                    </Stack>
                                }
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextField
                                id='jobReference'
                                placeholder='Enter contact number...'
                                variant='outlined'
                                value={searchData.phoneNumber}
                                fullWidth
                                size='small'
                                type='number'
                                onChange={(event) => handleFilterData(event.target.value, "phoneNumber")}
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
                            <TextField
                                size='small'
                                select
                                label='Maximum Records:'
                                fullWidth
                                value={searchData.maxRecords}
                                onChange={(e) => handleFilterData(e.target.value, "maxRecords")}
                                onKeyUp={handleKey}
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
                <div className="filterBtnWrap">
                    <Button variant="text" onClick={searchJobs}>Apply Filters</Button>
                </div>
            </div>
        </div>
    )
}

export default CandidateFilters;