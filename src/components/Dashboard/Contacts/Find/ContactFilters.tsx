import { useState, SyntheticEvent, useRef, useEffect } from '../../../../shared/modules/React';
import {Accordion, AccordionSummary, AccordionDetails}  from '../../../../shared/modules/MaterialImports/Accordion';
import {Typography} from '../../../../shared/modules/MaterialImports/Typography';
import {Stack} from '../../../../shared/modules/MaterialImports/Stack';
import {TextField} from '../../../../shared/modules/MaterialImports/TextField';
import {Chip} from '../../../../shared/modules/MaterialImports/Chip';
// import MenuItem from '@mui/material/MenuItem';
import {Button} from '../../../../shared/modules/MaterialImports/Button';
// import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
// import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
// import BusinessIcon from '@mui/icons-material/Business';
// import SubtitlesOutlinedIcon from '@mui/icons-material/SubtitlesOutlined';
import CloseIcon from '@mui/icons-material/Close';
// import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
// import ApiService from "../../../../shared/api/api";
import './ContactFilters.scss';
import { useSearchParams } from 'react-router-dom';
import ApiService from "../../../../shared/api/api";

// import { useParams } from 'react-router-dom';
// import FormControl from '@mui/material/FormControl';

// export interface jobFilterProps {
//     onSearch: (e: searchData) => void;
// }

export interface searchData {
    fname: string,
    lname: string,
    //numericId: string,
    email: string,
    // phoneNo: string,
    // maxRecords: string
}


const ContactFilters = ({ onSearch }: { onSearch: (e: searchData) => void; }) => {
    // const { id } = useParams();
    const [expanded, setExpanded] = useState<string | false>(false);
    // const [searchData, setSearchData] = useState<searchData>({
    //     fname: "",
    //     lname: "",
    //     //numericId: "",
    //     email: "",
    //     // phoneNo: "",
    //     // maxRecords: ""
    // });

    const [searchParams, setSearchParams] = useSearchParams();

    const filtersSearchId = useRef(searchParams.get('id') ? searchParams.get('id') : "");


    const [searchData, setSearchData] = useState<searchData>({
        fname: "",
        lname: "",

        email: "",

    });
    useEffect(() => {
        const savedFilters = sessionStorage.getItem(`contacts_${filtersSearchId.current}`);

        if (savedFilters) {
            const { filters } = JSON.parse(savedFilters);
            setSearchData(filters);
        }
    }, [filtersSearchId.current]);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleClearAll = () => {
        setSearchData({
            fname: "",
            lname: "",
            //numericId: "",
            email: "",
            // phoneNo: "",
            // maxRecords: ""
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
            //numericId: searchData.numericId,
            email: searchData.email,
            fname: searchData.fname,
            lname: searchData.lname,
            // noOfRecords: "20",
            // phoneNo: searchData.phoneNo
        }
        onSearch(data);
    }

    const handleKey = (e: any) => {
        if (e.key === "Enter") {
            searchJobs();
        }
    }

    const saveAuditLog = (id: number) => {
        ApiService.saveAuditLog(id);
    }

    return (
        (<div id='ContactFilters'>
            <div className='accordian-wrap customFilterChips'>
                <Stack direction="row" justifyContent="space-between" className='heading'>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography component="h5">Filters</Typography>
                        {((// (searchData.numericId !== "") ||
                        ((searchData.fname !== "") ||
                            (searchData.lname !== "") || (searchData.email !== "")))
                            // (searchData.phoneNo !== "") ||
                            // (searchData.maxRecords !== "")
                        ) &&
                            <Stack
                                className='clearStack'
                                direction="row"
                                justifyContent="space-around"
                                onClick={handleClearAll}
                            >
                                <CloseIcon />
                                <Typography>
                                    {(searchData.fname !== "" ? 1 : 0) +
                                        (searchData.lname !== "" ? 1 : 0) +
                                        // (searchData.numericId !== "" ? 1 : 0) +
                                        (searchData.email !== "" ? 1 : 0)
                                        // (searchData.phoneNo !== "" ? 1 : 0) +
                                        // (searchData.maxRecords !== "" ? 1 : 0)
                                    }
                                </Typography>
                            </Stack>
                        }
                    </Stack>
                    {/* <Button variant="text" onClick={searchJobs}>Search</Button> */}
                </Stack>
                <div className='filterListTab'>
                    <div>
                        <Accordion disableGutters square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummary
                                expandIcon={<ArrowDropDownIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Stack sx={{ width: '100%' }}>
                                    <Stack className='acc-title' direction="row" justifyContent="space-between">
                                        <Stack direction="row" alignItems="center">
                                            <BadgeOutlinedIcon className='title-icon' />
                                            <Typography>First Name</Typography>
                                        </Stack>
                                        {(searchData.fname !== "") && <Stack
                                            className='clearStack'
                                            direction="row"
                                            justifyContent="space-around"
                                            onClick={(event) => handleClear("fname", event)}
                                        >
                                            <CloseIcon />
                                            <Typography>
                                                {searchData.fname !== "" && 1}
                                            </Typography>
                                        </Stack>
                                        }
                                    </Stack>
                                    {(searchData.fname !== "" && expanded !== 'panel1') &&
                                        <Stack direction="row" mt={1} flexWrap="wrap">
                                            <div className='filterLabelName'>Name:</div>
                                            <Chip label={searchData.fname} icon={<CloseIcon />} className='selectedFilterChips' onClick={(event) => handleClear("fname", event)} />
                                        </Stack>
                                    }
                                </Stack>
                            </AccordionSummary>
                            <AccordionDetails>
                                <TextField
                                    id='fname'
                                    placeholder='Enter first name...'
                                    variant='outlined'
                                    value={searchData.fname}
                                    fullWidth
                                    size='small'
                                    onClick={()=> saveAuditLog(4132)}
                                    onChange={(event) => handleFilterData(event.target.value, "fname")}
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
                                        {(searchData.lname !== "") && <Stack
                                            className='clearStack'
                                            direction="row"
                                            justifyContent="space-around"
                                            onClick={(event) => handleClear("lname", event)}
                                        >
                                            <CloseIcon />
                                            <Typography>
                                                {searchData.lname !== "" && 1}
                                            </Typography>
                                        </Stack>
                                        }
                                    </Stack>
                                    {(searchData.lname !== "" && expanded !== 'panel2') &&
                                        <Stack direction="row" mt={1} flexWrap="wrap">
                                            <Typography>Name:</Typography>
                                            <Chip label={searchData.lname} icon={<CloseIcon />} className='selectedFilterChips' onClick={(event) => handleClear("lname", event)} />
                                        </Stack>
                                    }
                                </Stack>
                            </AccordionSummary>
                            <AccordionDetails>
                                <TextField
                                    id='lname'
                                    placeholder='Enter last name...'
                                    variant='outlined'
                                    value={searchData.lname}
                                    fullWidth
                                    size='small'
                                    onClick={()=> saveAuditLog(4133)}
                                    onChange={(event) => handleFilterData(event.target.value, "lname")}
                                    onKeyUp={handleKey}
                                />
                            </AccordionDetails>
                        </Accordion>
                        {/* <Accordion disableGutters square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            aria-controls="panel3bh-content"
                            id="panel3bh-header"
                        >
                            <Stack sx={{ width: '100%' }}>
                                <Stack className='acc-title' direction="row" justifyContent="space-between">
                                    <Stack direction="row" alignItems="center">
                                        <SubtitlesOutlinedIcon className='title-icon' />
                                        <Typography>Numeric Id</Typography>
                                    </Stack>
                                    {(searchData.numericId !== "") && <Stack
                                        className='clearStack'
                                        direction="row"
                                        justifyContent="space-around"
                                        onClick={(event) => handleClear("numericId", event)}
                                    >
                                        <CloseIcon />
                                        <Typography>
                                            {searchData.numericId !== "" && 1}
                                        </Typography>
                                    </Stack>
                                    }
                                </Stack>
                                {(searchData.numericId !== "" && expanded !== 'panel3') &&
                                    <Stack direction="row" mt={1} flexWrap="wrap">
                                        <Typography>Id:</Typography>
                                        <Chip label={searchData.numericId} icon={<CloseIcon />} className='selectedFilterChips' onClick={(event) => handleClear("numericId", event)} />
                                    </Stack>
                                }
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextField
                                id='numericId'
                                placeholder='Enter numeric Id...'
                                variant='outlined'
                                value={searchData.numericId}
                                fullWidth
                                size='small'
                                onChange={(event) => handleFilterData(event.target.value, "numericId")}
                                onKeyUp={handleKey}
                            />
                        </AccordionDetails>
                    </Accordion> */}
                        <Accordion disableGutters square expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                            <AccordionSummary
                                expandIcon={<ArrowDropDownIcon />}
                                aria-controls="panel4bh-content"
                                id="panel4bh-header"
                            >
                                <Stack sx={{ width: '100%' }}>
                                    <Stack className='acc-title' direction="row" justifyContent="space-between">
                                        <Stack direction="row" alignItems="center">
                                            <EmailOutlinedIcon className='title-icon' />
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
                                            <Typography>Email:</Typography>
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
                                    onClick={()=> saveAuditLog(4134)}
                                    onChange={(event) => handleFilterData(event.target.value, "email")}
                                    onKeyUp={handleKey}
                                />
                            </AccordionDetails>
                        </Accordion>
                        {/* <Accordion disableGutters square expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                        <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            aria-controls="panel5bh-content"
                            id="panel5bh-header"
                        >
                            <Stack sx={{ width: '100%' }}>
                                <Stack className='acc-title' direction="row" justifyContent="space-between">
                                    <Stack direction="row" alignItems="center">
                                        <LocalPhoneOutlinedIcon className='title-icon' />
                                        <Typography>Contact Number</Typography>
                                    </Stack>
                                    {(searchData.phoneNo !== "") && <Stack
                                        className='clearStack'
                                        direction="row"
                                        justifyContent="space-around"
                                        onClick={(event) => handleClear("phoneNo", event)}
                                    >
                                        <CloseIcon />
                                        <Typography>
                                            {searchData.phoneNo !== "" && 1}
                                        </Typography>
                                    </Stack>
                                    }
                                </Stack>
                                {(searchData.phoneNo !== "" && expanded !== 'panel5') &&
                                    <Stack direction="row" mt={1} flexWrap="wrap">
                                        <Typography>Phone:</Typography>
                                        <Chip label={searchData.phoneNo} icon={<CloseIcon />} className='selectedFilterChips' onClick={(event) => handleClear("jobReference", event)} />
                                    </Stack>
                                }
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextField
                                id='jobReference'
                                placeholder='Enter contact number...'
                                variant='outlined'
                                value={searchData.phoneNo}
                                fullWidth
                                size='small'
                                type='number'
                                onChange={(event) => handleFilterData(event.target.value, "phoneNo")}
                            />
                        </AccordionDetails>
                    </Accordion> */}
                        {/* <Accordion className='d-none' disableGutters square expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
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
                                        <Typography>Maximum Records:</Typography>
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
                    </Accordion> */}
                    </div>
                    <div className="filterBtnWrap">
                        <Button variant="text" onClick={()=>{searchJobs(); saveAuditLog(4135);}}>Apply Filters</Button>
                    </div>

                </div>

            </div>
        </div>)
    );
}

export default ContactFilters;