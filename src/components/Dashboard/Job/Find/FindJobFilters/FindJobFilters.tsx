import { useState, useEffect, SyntheticEvent, useRef } from '../../../../../shared/modules/React';
import {Accordion, AccordionDetails, AccordionSummary} from '../../../../../shared/modules/MaterialImports/Accordion';
import {Typography} from '../../../../../shared/modules/MaterialImports/Typography';
import {Stack} from '../../../../../shared/modules/MaterialImports/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import {TextField, FormControl, Button} from '../../../../../shared/modules/commonImports';
import {Chip} from '../../../../../shared/modules/MaterialImports/Chip';
import {MenuItem} from '../../../../../shared/modules/MaterialImports/Menu';
import Paper from '@mui/material/Paper';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import SubtitlesOutlinedIcon from '@mui/icons-material/SubtitlesOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import CloseIcon from '@mui/icons-material/Close';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined';
import masterStatesList from '../../../../../shared/data/States';
import './FindJobFilters.scss';
import { MUIAutoComplete } from '../../../../shared/MUIAutoComplete/MUIAutoComplete';
import { Grid } from '../../../../../shared/modules/MaterialImports/Grid2';
import masterJobStatus from '../../../../../shared/data/JobStatus';
import masterJobCategoriesList from '../../../../../shared/data/JobCategories';
import { showToaster } from '../../../../shared/SnackBar/SnackBar';
import { DateTime } from '../../../../../shared/modules/Luxon';
import { AdapterLuxon, DatePicker, LocalizationProvider } from '../../../../../shared/modules/MaterialImports/DatePicker';
export interface jobFilterProps {
    onSearch: any;
    onFiltersChange: any
}
import ApiService from "../../../../../shared/api/api";

export interface searchData {
    jobId: string;
    contactId: string;
    contactName: string;
    recruiterId: string;
    recruiterName: string;
    fromDate: string;
    toDate: string;
    city: string;
    state: string[];
    jobStatus: string;
    jobTitle: string;
    zipcode: string;
    jobCategory: string;
    jobClientId: string;
    searchString: string;
    companyName: string;
    companyId: string;
}

const statesList = masterStatesList;

const FindJobFilters = ({ onSearch, onFiltersChange }: jobFilterProps) => {
    const [expanded, setExpanded] = useState<string | false>(false);
    const [searchData, setSearchData] = useState<searchData>({
        jobId: "",
        jobClientId: "",
        contactId: "",
        contactName: "",
        recruiterId: "",
        recruiterName: "",
        fromDate: "",
        toDate: "",
        city: "",
        state: [],
        searchString: "",
        jobStatus: "",
        jobTitle: "",
        companyName: "",
        companyId: "",
        jobCategory: "",
        zipcode: "",
    });
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
        if (isExpanded) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 0);
        }
    };

    const CustomPaper = (props: any) => {
        return <Paper elevation={3} {...props} sx={{
            '& .MuiAutocomplete-option': {
                fontWeight: '600',
                color: 'var(--c-text-header)'
            }
        }} />;
    };

    const jobStatusList = [...masterJobStatus.list];

    const jobCategoryList = [...masterJobCategoriesList.list];

    const handleStatesChange = (value: string[]) => {
        setSearchData({
            ...searchData,
            state: value
        })
    }

    const getValueData = (obj: any, val: string[] | string) => {
        let newValues: string[] = [];
        if (obj === statesList) {
            for (let i = 0; i < val.length; i++) {
                newValues.push(obj[obj.findIndex((x: any) => x.label === val[i])].id);
            }
            return newValues.toString();
        }

        if (obj === jobStatusList || obj === jobCategoryList) {
            if (val === "") {
                return "";
            }
            return obj[obj.findIndex((x: any) => x.label === val)].id
        }


    }

    const handleClearAll = () => {
        setSearchData({
            jobId: "",
            contactId: "",
            contactName: "",
            recruiterId: "",
            recruiterName: "",
            fromDate: "",
            toDate: "",
            city: "",
            state: [],
            zipcode: "",
            jobStatus: "",
            jobTitle: "",
            jobCategory: "",
            companyName: "",
            companyId: "",
            searchString: "",
            jobClientId: "",
        })
    }

    const handleClear = (key: string, e: SyntheticEvent, i?: number) => {
        e.stopPropagation();
        if (key === "contactId") {
            setSearchData({
                ...searchData,
                contactId: "",
                contactName: ""
            })
        }
        if (key === "date") {
            setSearchData({
                ...searchData,
                fromDate: "",
                toDate: ""
            })
        }

        if (key === "location") {
            setSearchData({
                ...searchData,
                city: "",
                state: [],
                zipcode: "",
            })
        }

        let arr = searchData[key as keyof typeof searchData];
        if (typeof arr !== "string") {
            i ? arr.splice(i, 1) : arr.splice(0, arr.length)
            setSearchData({
                ...searchData,
                [key]: arr
            })
        } else {
            setSearchData({
                ...searchData,
                [key as keyof typeof searchData]: ""
            })
        }
    }

    const searchJobs = () => {
        if (searchData.fromDate && searchData.toDate) {
            if (searchData.fromDate > searchData.toDate) {
                showToaster('To Date must be greater than From Date.', 'error');
                return false;
            }
        }
        const tempData = {
            jobId: (searchData.jobId) ? searchData.jobId : "",
            contactId: (searchData.contactId) ? searchData.contactId : "",
            recruiterId: (searchData.recruiterId) ? searchData.recruiterId : "",
            fromDate: (searchData.fromDate) ? searchData.fromDate : "",
            toDate: (searchData.toDate) ? searchData.toDate : "",
            city: (searchData.city) ? searchData.city : "",
            state: (searchData.state) ? searchData.state : [],
            zipcode: (searchData.zipcode) ? searchData.zipcode : "",
            jobStatus: (searchData.jobStatus) ? searchData.jobStatus : "",
            jobTitle: (searchData.jobTitle) ? searchData.jobTitle : "",
            jobCategory: (searchData.jobCategory) ? searchData.jobCategory : "",
            jobClientId: (searchData.jobClientId) ? searchData.jobClientId : "",
            searchString: (searchData.searchString) ? searchData.searchString : "",
            contactName: (searchData.contactName) ? searchData.contactName : "",
            recruiterName: (searchData.recruiterName) ? searchData.recruiterName : "",
            companyName: (searchData.companyName) ? searchData.companyName : "",
            companyId: (searchData.companyId) ? searchData.companyId : "",
        }
        onSearch(tempData);
        saveAuditLog(4170);
    }

    const loadCompanyNameList = () => {
    }

    const handleFilterData = (value: string, key: any) => {
        setSearchData({
            ...searchData,
            [key]: value
        })
    }

    const handleKey = (e: any) => {
        if (e.key === "Enter") {
            searchJobs();
        }
    }

    useEffect(() => {
        loadCompanyNameList();
    }, []);

    useEffect(() => {
        if (onFiltersChange) {
            setSearchData({ ...onFiltersChange });
        }
    }, [onFiltersChange])    
    let auditLogMappings: {
        jobId: number;
        jobClientId: number;
        jobTitle: number;
        jobCategory: number;
        HiringManager : number,
        Recruiter: number,
        JobCreated:number,
        Location:number,
        SearchString : number,
        JobStatus : number
    } = {
        jobId: 4160,
        jobClientId: 4161,
        jobTitle: 4168,
        jobCategory:4169,
        HiringManager:4162,
        Recruiter:4163,
        JobCreated:4164,
        Location: 4165,
        SearchString:4166,
        JobStatus:4167
    };

    function handleAuditLog(cardId: 'jobId' | 'jobClientId' | 'jobTitle'| 'jobCategory'| 'HiringManager'|'Recruiter'| 'JobCreated'|'Location'|'SearchString'|'JobStatus') {
        saveAuditLog(auditLogMappings[cardId]);
    } 
    const saveAuditLog = (id: number) => {
        ApiService.saveAuditLog(id);
    }

    return (
        (<div id='FindJobFilters'>
            <div className='accordian-wrap customFilterChips'>
                <Stack direction="row" justifyContent="space-between" className='heading'>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography component="h5">Filters</Typography>
                        {(((searchData.contactId !== "") ||
                            (searchData.recruiterId !== "") ||
                            (searchData.fromDate !== "") ||
                            (searchData.toDate !== "") ||
                            (searchData.city !== "") ||
                            (searchData.state?.length > 0) ||
                            (searchData.searchString !== "") ||
                            (searchData.jobStatus !== "") ||
                            (searchData.jobTitle ? searchData.jobTitle.split(',').length : 0) ||
                            (searchData.companyName?.length > 0) ||
                            (searchData.jobCategory !== "") || (searchData.zipcode !== ""))
                        ) &&
                            <Stack
                                className='clearStack'
                                direction="row"
                                justifyContent="space-around"
                                onClick={handleClearAll}
                            >
                                <CloseIcon />
                                <Typography>
                                    {
                                        (searchData.contactId !== "" ? 1 : 0) +
                                        (searchData.jobId !== "" ? 1 : 0) +
                                        (searchData.jobClientId !== "" ? 1 : 0) +
                                        (searchData.recruiterId !== "" ? 1 : 0) +
                                        (searchData.fromDate !== "" ? 1 : 0) +
                                        (searchData.toDate !== "" ? 1 : 0) +
                                        (searchData.city !== "" ? 1 : 0) +
                                        (searchData.state.length) +
                                        (searchData.searchString !== "" ? 1 : 0) +
                                        (searchData.jobStatus !== "" ? 1 : 0) +
                                        (searchData.jobTitle ? searchData.jobTitle.split(',').length : 0) +
                                        (searchData.companyId !== "" ? 1 : 0) +
                                        (searchData.jobCategory !== "" ? 1 : 0) +
                                        (searchData.zipcode !== "" ? 1 : 0)
                                    }
                                </Typography>
                            </Stack>
                        }
                    </Stack>
                </Stack>
                <div className='filterListTab'>
                    <Accordion disableGutters square expanded={expanded === 'panel12'} onChange={handleChange('panel12')}>
                        <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            aria-controls="panel12bh-content"
                            id="panel12bh-header"
                        >
                            <Stack sx={{ width: '100%' }}>
                                <Stack className='acc-title' direction="row" justifyContent="space-between">
                                    <Stack direction="row" alignItems="center">
                                        <PermIdentityOutlinedIcon className='title-icon' />
                                        <Typography>Job Id</Typography>
                                    </Stack>
                                    {(searchData.jobId !== "") && <Stack
                                        className='clearStack'
                                        direction="row"
                                        justifyContent="space-around"
                                        onClick={(event) => handleClear("jobId", event)}
                                    >
                                        <CloseIcon />
                                        <Typography>
                                            {searchData.jobId !== "" && 1}
                                        </Typography>
                                    </Stack>
                                    }
                                </Stack>
                                {(searchData.jobId !== "" && expanded !== 'panel12') &&
                                    <Stack direction="row" mt={1} flexWrap="wrap">
                                        <div className='filterLabelName'>Job Id:</div>
                                        <Chip label={searchData.jobId} icon={<CloseIcon />} className='selectedChips' onClick={(event) => handleClear("jobId", event)} />
                                    </Stack>
                                }
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextField
                                id='jobId'
                                placeholder='Enter Job Id'
                                variant='outlined'
                                value={searchData.jobId}
                                fullWidth
                                size='small'
                                type='number'
                                onClick={() => handleAuditLog('jobId')} 
                                onChange={(event) => handleFilterData(event.target.value, "jobId")}
                                onKeyUp={handleKey}
                            />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion disableGutters square expanded={expanded === 'panel13'} onChange={handleChange('panel13')}>
                        <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            aria-controls="panel13bh-content"
                            id="panel13bh-header"
                        >
                            <Stack sx={{ width: '100%' }}>
                                <Stack className='acc-title' direction="row" justifyContent="space-between">
                                    <Stack direction="row" alignItems="center">
                                        <PermIdentityOutlinedIcon className='title-icon' />
                                        <Typography>Client Job Id</Typography>
                                    </Stack>
                                    {(searchData.jobClientId !== "") && <Stack
                                        className='clearStack'
                                        direction="row"
                                        justifyContent="space-around"
                                        onClick={(event) => handleClear("jobClientId", event)}
                                    >
                                        <CloseIcon />
                                        <Typography>
                                            {searchData.jobClientId !== "" && 1}
                                        </Typography>
                                    </Stack>
                                    }
                                </Stack>
                                {(searchData.jobClientId !== "" && expanded !== 'panel13') &&
                                    <Stack direction="row" mt={1} flexWrap="wrap">
                                        <div className='filterLabelName'>Job Id:</div>
                                        <Chip label={searchData.jobClientId} icon={<CloseIcon />} className='selectedChips' onClick={(event) => handleClear("jobClientId", event)} />
                                    </Stack>
                                }
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextField
                                id='jobClientId'
                                placeholder='Enter Client Job Id'
                                variant='outlined'
                                value={searchData.jobClientId}
                                fullWidth
                                size='small'
                                onClick={() => handleAuditLog('jobClientId')} 
                                onChange={(event) => handleFilterData(event.target.value, "jobClientId")}
                                onKeyUp={handleKey}
                            />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion disableGutters square expanded={expanded === 'panel9'} onChange={handleChange('panel9')}>
                        <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            aria-controls="panel9bh-content"
                            id="panel9bh-header"
                        >
                            <Stack sx={{ width: '100%' }}>
                                <Stack className='acc-title' direction="row" justifyContent="space-between">
                                    <Stack direction="row" alignItems="center">
                                        <SubtitlesOutlinedIcon className='title-icon' />
                                        <Typography>Job Titles</Typography>
                                    </Stack>
                                    {(searchData.jobTitle.length > 0) && <Stack
                                        className='clearStack'
                                        direction="row"
                                        justifyContent="space-around"
                                        onClick={(event) => handleClear("jobTitle", event)}
                                    >
                                        <CloseIcon />
                                        <Typography>
                                            {searchData.jobTitle.split(',').length}
                                        </Typography>
                                    </Stack>
                                    }
                                </Stack>
                                {(searchData.jobTitle.length > 0 && expanded !== 'panel9') &&
                                    <Stack direction="row" mt={1} flexWrap="wrap">
                                        <div className='filterLabelName'>Title:</div>
                                        {searchData.jobTitle.split(',').map((title, index) => (
                                            <Chip
                                            key={index}
                                            label={title}
                                            icon={<CloseIcon />}
                                            className='selectedChips'
                                            onDelete={(e) => {
                                              e.stopPropagation();
                                              const tempJobTitleArray = searchData.jobTitle.split(',');
                                              const updatedJobTitle = tempJobTitleArray.filter((i) => i !== title).join(',');
                                              setSearchData({
                                                ...searchData,
                                                jobTitle: updatedJobTitle
                                              });
                                            }}
                                          />
                                          
                                        ))}
                                    </Stack>
                                }
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <MUIAutoComplete
                                id='jobTitle'
                                handleChange={(selectedValues:any , JobTitles:any ) => handleFilterData(JobTitles, "jobTitle")}
                                valuePassed={
                                    Array.isArray((searchData.jobTitle)) ?
                                        { label: searchData.jobTitle.join(), id: searchData.jobTitle.join() }
                                        :
                                        (searchData.jobTitle) ?
                                            { label: searchData.jobTitle, id: searchData.jobTitle }
                                            :
                                            {}
                                }
                                isMultiple={true}
                                textToShow=""
                                width="100%"
                                type='jobTitle'
                                placeholder="Enter job titles..."
                            />                          
                        </AccordionDetails>
                    </Accordion>
                    <Accordion disableGutters square expanded={expanded === 'panel11'} onChange={handleChange('panel11')}>
                        <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            aria-controls="panel11bh-content"
                            id="panel11bh-header"
                        >
                            <Stack sx={{ width: '100%' }}>
                                <Stack className='acc-title' direction="row" justifyContent="space-between">
                                    <Stack direction="row" alignItems="center">
                                        <BusinessCenterOutlinedIcon className='title-icon' />
                                        <Typography>Job Category</Typography>
                                    </Stack>
                                    {searchData.jobCategory !== "" && <Stack
                                        className='clearStack'
                                        direction="row"
                                        justifyContent="space-around"
                                        onClick={(event) => handleClear("jobCategory", event)}
                                    >
                                        <CloseIcon />
                                        <Typography>
                                            {searchData.jobCategory !== "" ? 1 : 0}
                                        </Typography>
                                    </Stack>
                                    }
                                </Stack>
                                {(searchData.jobCategory !== "" && expanded !== 'panel11') &&
                                    <Stack direction="row" mt={1} flexWrap="wrap">
                                        <div className='filterLabelName'>Job Category:</div>
                                        <Chip label={jobCategoryList.find((i) => i.id === searchData.jobCategory)?.label ? jobCategoryList.find((i) => i.id === searchData.jobCategory)?.label : ""} icon={<CloseIcon />} className='selectedChips' onClick={(event) => handleClear("jobCategory", event)} />
                                    </Stack>
                                }
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextField fullWidth
                                value={searchData.jobCategory}
                                select
                                size="small"
                                onClick={() => handleAuditLog('jobCategory')} 
                                onChange={(e) => handleFilterData(e.target.value, "jobCategory")}
                                onKeyUp={handleKey}
                                label='Select Job Category'
                            >
                                <MenuItem value="" disabled></MenuItem>
                                {jobCategoryList.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>{option.label}</MenuItem>
                                ))}
                            </TextField>
                        </AccordionDetails>
                    </Accordion>


                    <Accordion disableGutters square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Stack sx={{ width: '100%' }}>
                                <Stack className='acc-title' direction="row" justifyContent="space-between">
                                    <Stack direction="row" alignItems="center">
                                        <PermIdentityOutlinedIcon className='title-icon' />
                                        <Typography>Hiring Manager</Typography>
                                    </Stack>
                                    {(searchData.contactId !== "") && <Stack
                                        className='clearStack'
                                        direction="row"
                                        justifyContent="space-around"
                                        onClick={(event) => handleClear("contactId", event)}
                                    >
                                        <CloseIcon />
                                        <Typography>
                                            {(searchData.contactId !== "" ? 1 : 0)}
                                        </Typography>
                                    </Stack>
                                    }
                                </Stack>
                                {((searchData.contactId !== "") && expanded !== 'panel1') &&
                                    <Stack direction="row" mt={1} flexWrap="wrap">
                                        <div className='filterLabelName'>Hiring Manager:</div>
                                        {searchData.contactId !== "" && <Chip label={searchData.contactName} icon={<CloseIcon />} className='selectedChips' onClick={(event) => handleClear("contactId", event)} />
                                        }
                                    </Stack>
                                }
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid sx={{ mb: 1 }}>
                                <div onClick={() => handleAuditLog('HiringManager')} >
                                    <MUIAutoComplete
                                        id='recruiterId'
                                        handleChange={(id: any, name: string) => {
                                            setSearchData({
                                                ...searchData,
                                                "contactId": id,
                                                "contactName": name
                                            });

                                        }}
                                        valuePassed={{
                                            id: searchData.contactId,
                                            label: searchData.contactName
                                        }}
                                        isMultiple={false}
                                        width="100%"
                                        type='contactName'
                                        placeholder="Select Hiring Manager"
                                        refToPass={expanded === 'panel1' ? inputRef : null}
                                    />
                                </div>
                            </Grid>
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
                                        <PersonSearchOutlinedIcon className='title-icon' />
                                        <Typography>Recruiter</Typography>
                                    </Stack>
                                    {(searchData.recruiterName !== "") && <Stack
                                        className='clearStack'
                                        direction="row"
                                        justifyContent="space-around"
                                        onClick={
                                            (event) => {
                                                setSearchData({
                                                    ...searchData,
                                                    "recruiterId": "",
                                                    "recruiterName": ""
                                                });
                                            }
                                        }
                                    >
                                        <CloseIcon />
                                        <Typography>
                                            {searchData.recruiterName !== "" && 1}
                                        </Typography>
                                    </Stack>
                                    }
                                </Stack>
                                {(searchData.recruiterName !== "" && expanded !== 'panel2') &&
                                    <Stack direction="row" mt={1} flexWrap="wrap">
                                        <div className='filterLabelName'>Recruiter:</div>
                                        <Chip label={searchData.recruiterName} icon={<CloseIcon />} className='selectedChips' onClick={
                                            (event) => {
                                                setSearchData({
                                                    ...searchData,
                                                    "recruiterId": "",
                                                    "recruiterName": ""
                                                });
                                            }
                                        } />
                                    </Stack>
                                }
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div onClick={() => handleAuditLog('Recruiter')}>
                                <MUIAutoComplete
                                    id='recruiterId'
                                    handleChange={(id: any, name: string) => {
                                        setSearchData({
                                            ...searchData,
                                            "recruiterId": id,
                                            "recruiterName": name
                                        });

                                    }}
                                    valuePassed={{
                                        id: searchData.recruiterId,
                                        label: searchData.recruiterName

                                    }}
                                    isMultiple={false}
                                    width="100%"
                                    type='userName'
                                    placeholder="Select Recruiter"
                                    refToPass={expanded === 'panel2' ? inputRef : null}
                                />
                            </div>
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
                                        <EventOutlinedIcon className='title-icon' />
                                        <Typography>Job Created</Typography>
                                    </Stack>
                                    {(searchData.fromDate || searchData.toDate) && <Stack
                                        className='clearStack'
                                        direction="row"
                                        justifyContent="space-around"
                                        onClick={(event) => handleClear("date", event)}
                                    >
                                        <CloseIcon />
                                        <Typography>
                                            {(searchData.fromDate !== "" ? 1 : 0) + (searchData.toDate !== "" ? 1 : 0)}
                                        </Typography>
                                    </Stack>
                                    }
                                </Stack>
                                {((searchData.fromDate !== "" || searchData.toDate !== "") && expanded !== 'panel4') &&
                                    <Stack direction="row" mt={1} flexWrap="wrap">
                                        <div className='filterLabelName'>From Date:</div>
                                        {searchData.fromDate !== "" &&
                                            <Chip label={new Date(searchData.fromDate).toLocaleDateString('en-US')} icon={<CloseIcon />} className='selectedChips' onClick={(event) => handleClear("fromDate", event)} />
                                        }
                                        <div className='filterLabelName'>To Date:</div>
                                        {searchData.fromDate !== "" &&
                                            <Chip label={new Date(searchData.toDate).toLocaleDateString('en-US')}  icon={<CloseIcon />} className='selectedChips' onClick={(event) => handleClear("toDate", event)} />
                                        }
                                    </Stack>
                                }
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Stack direction='row' spacing={1} >
                                <FormControl sx={{ width: "195px" }}>
                                    {/* <Typography sx={{ display: "flex", justifyContent: "flex-start" }}>From</Typography> */}
                                    <LocalizationProvider dateAdapter={AdapterLuxon}>
                                        <DatePicker
                                            className='datePickerCustom'
                                            label="From"
                                            value={searchData.fromDate ? DateTime.fromFormat(searchData.fromDate, 'yyyy-MM-dd') : null}
                                            onChange={(newValue: any) => {
                                             const formattedDate = newValue ? newValue.toFormat('yyyy-MM-dd') : '';
                                             handleFilterData(formattedDate, "fromDate");
                                             handleAuditLog('JobCreated')
                                            }}
                                            slotProps={{
                                                textField: {
                                                    size: 'small', fullWidth: true, placeholder: 'MM/DD/YYYY'
                                                }
                                            }}
                                            minDate={DateTime.now().minus({years: 20})}
                                            maxDate={DateTime.now()}
                                        />
                                    </LocalizationProvider>
                                    {/* <TextField id="fromdate" type="date" variant="outlined" value={searchData.fromDate} onChange={(e) => handleFilterData(e.target.value, "fromDate")} onKeyUp={handleKey} inputProps={{ className: 'fs-13' }} onClick={()=>handleAuditLog('JobCreated')}/> */}
                                </FormControl>
                                <FormControl sx={{ width: "195px" }}>
                                    {/* <Typography sx={{ display: "flex", justifyContent: "flex-start" }}>To</Typography> */}

                                    <LocalizationProvider dateAdapter={AdapterLuxon}>
                                        <DatePicker
                                            className='datePickerCustom'
                                            label="To"
                                            value={searchData.toDate ? DateTime.fromFormat(searchData.toDate, 'yyyy-MM-dd') : null}
                                            onChange={(newValue) => {
                                                const formattedDate = newValue ? newValue.toFormat('yyyy-MM-dd') : '';
                                                handleFilterData(formattedDate, "toDate");
                                                handleAuditLog('JobCreated')
                                            }}
                                            minDate={searchData.fromDate ? DateTime.fromFormat(searchData.fromDate, 'yyyy-MM-dd') : DateTime.now().minus({years: 20})}
                                            maxDate={DateTime.now()}
                                            slotProps={{
                                                textField: {
                                                    size: 'small', fullWidth: true, placeholder: 'MM/DD/YYYY'
                                                }
                                            }}
                                        />
                                    </LocalizationProvider>
                                    {/* <TextField id="todate" type="date" variant="outlined" value={searchData.toDate} onChange={(e) => handleFilterData(e.target.value, "toDate")} onKeyUp={handleKey} inputProps={{ className: 'fs-13' }} onClick={()=>handleAuditLog('JobCreated')} /> */}
                                </FormControl>
                            </Stack>
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
                                        <PlaceOutlinedIcon className='title-icon' />
                                        <Typography>Location</Typography>
                                    </Stack>
                                    {((searchData.state.length > 0 || searchData.city !== "" || searchData.zipcode !== "")                                        
                                    ) && <Stack
                                        className='clearStack'
                                        direction="row"
                                        justifyContent="space-around"
                                        onClick={(event) => handleClear("location", event)}
                                    >
                                            <CloseIcon />
                                            <Typography>
                                                {searchData.state.length +
                                                    (searchData.city !== "" ? 1 : 0) +
                                                    (searchData.zipcode !== "" ? 1 : 0)}
                                                {/* +
                                                 (searchData.radius !== "" ? 1 : 0) */}

                                            </Typography>
                                        </Stack>
                                    }
                                </Stack>
                                {(expanded !== 'panel5') &&
                                    <Stack mt={1} flexWrap="wrap">
                                        {searchData.city !== "" && <div className='mb-1'><Typography className='filterLabelName'>City:</Typography>
                                            <Chip label={searchData.city} icon={<CloseIcon />} className='selectedChips' onClick={(event) => handleClear("city", event)} />
                                        </div>
                                        }

                                        {searchData.state.length > 0 && <div className='mb-1'>
                                            <Typography className='filterLabelName'>States:</Typography>
                                            {searchData.state.map((item: any, i: number) => (
                                                <Chip label={item} key={i} icon={<CloseIcon />} className='selectedChips' onClick={(event) => handleClear("state", event, i)} />
                                            ))}
                                        </div>}

                                        {searchData.zipcode !== "" && <div className='mb-1'>
                                            <div className='filterLabelName'>Zipcode:</div>
                                            <Chip label={searchData.zipcode} icon={<CloseIcon />} className='selectedChips' onClick={(event) => handleClear("zipcode", event)} />
                                        </div>
                                        }

                                        {/* {searchData.radius !== "" && <div className='mb-1'>
                                            <div className='filterLabelName'>Radius:</div>
                                            <Chip label={searchData.radius} icon={<CloseIcon />} className='selectedChips' onClick={(event) => handleClear("radius", event)} />
                                        </div>
                                        } */}
                                    </Stack>
                                }
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormControl fullWidth sx={{ mb: 1 }}>
                                <TextField size='small' id='city' name='city' placeholder='Enter city...' value={searchData.city} onChange={(e) => handleFilterData(e.target.value, "city")} onKeyUp={handleKey}  onClick={()=>handleAuditLog('Location')}/>
                            </FormControl>
                            <Autocomplete
                                multiple
                                id="tags-filled"
                                options={statesList.map((option) => option.label)}
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
                                        placeholder="Enter state..."
                                        onClick={()=>handleAuditLog('Location')}
                                    />
                                )}
                                PaperComponent={CustomPaper}
                                onChange={(event, value) => (value ? handleStatesChange(value) : "")}
                                sx={{ mb: 1 }}
                            />
                            <Stack direction="row" spacing={1}>
                                <TextField fullWidth
                                    id='zipcode'
                                    name='zipcode'
                                    placeholder='Enter zipcode...'
                                    value={searchData.zipcode}
                                    size='small'
                                    onClick={()=>handleAuditLog('Location')}
                                    onChange={(e) => handleFilterData(e.target.value, "zipcode")}
                                    onKeyUp={handleKey}
                                />
                                {/* <Select
                                    value={searchData.radius}
                                    displayEmpty

                                    onChange={(e) => handleFilterData(e.target.value, "radius")}
                                    sx={{ width: '50%' }}
                                    onKeyUp={handleKey}
                                >
                                    <MenuItem value=""> radius...</MenuItem>
                                    <MenuItem value="10">10</MenuItem>
                                    <MenuItem value="50">50</MenuItem>
                                    <MenuItem value="100">100</MenuItem>
                                    <MenuItem value="200">200</MenuItem>
                                </Select> */}
                            </Stack>
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
                                        <ManageSearchOutlinedIcon className='title-icon' />
                                        <Typography>Search String</Typography>
                                    </Stack>
                                    {searchData.searchString !== "" && <Stack
                                        className='clearStack'
                                        direction="row"
                                        justifyContent="space-around"
                                        onClick={(event) => handleClear("searchString", event)}
                                    >
                                        <CloseIcon />
                                        <Typography>
                                            {searchData.searchString !== "" ? 1 : 0}
                                        </Typography>
                                    </Stack>
                                    }
                                </Stack>
                                {(searchData.searchString !== "" && expanded !== 'panel7') &&
                                    <Stack direction="row" mt={1} flexWrap="wrap">
                                        <div className='filterLabelName'>Search string:</div>
                                        <Chip label={searchData.searchString} icon={<CloseIcon />} className='selectedChips' onClick={(event) => handleClear("searchString", event)} />
                                    </Stack>
                                }
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormControl fullWidth>
                                <textarea
                                    id="keywords"
                                    name="keywords"
                                    placeholder="Enter search string..."
                                    value={searchData.searchString}
                                    onChange={(e) => handleFilterData(e.target.value, "searchString")}
                                    rows={3}
                                    onKeyUp={handleKey}
                                    onClick={()=>handleAuditLog('SearchString')}
                                />
                            </FormControl>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion disableGutters square
                        expanded={expanded === 'panel8'}
                        onChange={handleChange('panel8')}
                    >
                        <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            aria-controls="panel8bh-content"
                            id="panel8bh-header"
                        >
                            <Stack sx={{ width: '100%' }}>
                                <Stack className='acc-title' direction="row" justifyContent="space-between">
                                    <Stack direction="row" alignItems="center">
                                        <WorkOutlineIcon className='title-icon' />
                                        <Typography>Job Status</Typography>
                                    </Stack>
                                    {(searchData.jobStatus !== "") && <Stack
                                        className='clearStack'
                                        direction="row"
                                        justifyContent="space-around"
                                        onClick={(event) => handleClear("jobStatus", event)}
                                    >
                                        <CloseIcon />
                                        <Typography>
                                            {searchData.jobStatus !== "" ? 1 : 0}
                                        </Typography>
                                    </Stack>
                                    }
                                </Stack>
                                {(searchData.jobStatus !== "" && expanded !== 'panel8') &&
                                    <Stack direction="row" mt={1} flexWrap="wrap">
                                        <div className='filterLabelName'>Status:</div>
                                        <Chip label={masterJobStatus.getNameById(searchData.jobStatus)} icon={<CloseIcon />} className='selectedChips' onClick={(event) => handleClear("jobStatus", event)} />
                                    </Stack>
                                }
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextField fullWidth
                                select
                                size="small"
                                value={searchData.jobStatus}
                                onClick={()=>handleAuditLog('JobStatus')}
                                onChange={(e) => handleFilterData(e.target.value, "jobStatus")}
                                onKeyUp={handleKey}
                                label='Select Job Status'
                            >
                                <MenuItem value="" disabled></MenuItem>
                                {jobStatusList.map((item) => (
                                    <MenuItem value={item.id} key={item.id}>{item.label}</MenuItem>
                                ))}
                            </TextField>
                        </AccordionDetails>
                    </Accordion>
                    {/* <Accordion disableGutters square expanded={expanded === 'panel10'} onChange={handleChange('panel10')}>
                        <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            aria-controls="panel10bh-content"
                            id="panel10bh-header"
                        >
                            <Stack sx={{ width: '100%' }}>
                                <Stack className='acc-title' direction="row" justifyContent="space-between">
                                    <Stack direction="row" alignItems="center">
                                        <BadgeOutlinedIcon className='title-icon' />
                                        <Typography>Company Name</Typography>
                                    </Stack>
                                    {(searchData.companyName !== "") && <Stack
                                        className='clearStack'
                                        direction="row"
                                        justifyContent="space-around"
                                        onClick={
                                            (event) => {
                                                setSearchData({
                                                    ...searchData,
                                                    "companyId": "",
                                                    "companyName": ""
                                                });
                                            }
                                        }
                                    >
                                        <CloseIcon />
                                        <Typography>
                                            {searchData.companyName !== "" && 1}
                                        </Typography>
                                    </Stack>
                                    }
                                </Stack>

                                {(searchData.companyName !== "" && expanded !== 'panel2') &&
                                    <Stack direction="row" mt={1} flexWrap="wrap">
                                        <div className='filterLabelName'>Recruiter:</div>
                                        <Chip label={searchData.companyName} icon={<CloseIcon />} className='selectedChips' onClick={
                                            (event) => {
                                                setSearchData({
                                                    ...searchData,
                                                    "companyId": "",
                                                    "companyName": ""
                                                });
                                            }
                                        } />
                                    </Stack>
                                }
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>

                            <MUIAutoComplete
                                id='companyName'
                                handleChange={(id: any, name: string) => {
                                    setSearchData({
                                        ...searchData,
                                        "companyId": id,
                                        "companyName": name
                                    });
                                }}
                                valuePassed={{}}
                                isMultiple={false}
                                width="100%"
                                type='companyName'
                                placeholder="Enter company Name..."
                            /> */}
                    {/* <Autocomplete
                                multiple
                                id="tags-filled"
                                options={companyNameList.map((option: any) => option.text)}
                                value={searchData.companyName}
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
                                        placeholder="Enter company name..."
                                    />
                                )}
                                PaperComponent={CustomPaper}
                                onChange={(event, value) => (value ? handleCompanyNameChange(value) : "")}
                            /> */}
                    {/* </AccordionDetails>
                    </Accordion> */}
                </div>
            </div>
            <div className="filterBtnWrap">
                <Button variant="text" onClick={searchJobs}>Apply Filters</Button>
            </div>
        </div>)
    );
}

export default FindJobFilters;