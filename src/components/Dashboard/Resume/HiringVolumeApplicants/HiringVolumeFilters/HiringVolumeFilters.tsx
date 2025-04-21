import { useCallback, useState, SyntheticEvent, useEffect } from '../../../../../shared/modules/React';
import {Accordion,AccordionDetails, AccordionSummary} from '../../../../../shared/modules/MaterialImports/Accordion';
import {Typography} from '../../../../../shared/modules/MaterialImports/Typography';
import {Stack} from '../../../../../shared/modules/MaterialImports/Stack';
import {TextField} from '../../../../../shared/modules/MaterialImports/TextField';
import {Chip} from '../../../../../shared/modules/MaterialImports/Chip';
import {Button} from '../../../../../shared/modules/MaterialImports/Button';
import Autocomplete from '@mui/material/Autocomplete';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
// import SubtitlesOutlinedIcon from '@mui/icons-material/SubtitlesOutlined';
import CloseIcon from '@mui/icons-material/Close';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import ClearIcon from "@mui/icons-material/Clear";
// import masterStatesList from '../../../../shared/data/States';
import Paper from '@mui/material/Paper';
import ApiService from "../../../../../shared/api/api";
import './HiringVolumeFilters.scss';
import { MUIAutoComplete } from '../../../../shared/MUIAutoComplete/MUIAutoComplete';
import {Tooltip} from '../../../../../shared/modules/MaterialImports/ToolTip';
import { userLocalData } from '../../../../../shared/services/userData';
import { debounce } from "lodash";

export interface jobFilterProps {
    onSearch: any;
    onFiltersChange: any;
}

export interface searchData {
    workflow: string,
    job: string,
}

// const statesList = masterStatesList;

// const statusList: any = [
//     // { value: "1", label: "Lead" },
//     // { value: "2", label: "Not reviewed" },
//     // { value: "3", label: "Contacted" },
//     // { value: "4", label: "Presented" },
//     // { value: "5", label: "Interviewing" },
//     // { value: "6", label: "Offer Made" },
//     // { value: "7", label: "Onboarding" },
//     // { value: "8", label: "On Assignment" },
//     // { value: "9", label: "Past Contractor" },
//     // { value: "10", label: "Do Not Hire" },

//     { value: "-1", "label": "New" },
//     { value: "0", "label": "View" },
//     { value: "50", "label": "Not Qualified" },
//     { value: "100", "label": "Submitted" },
//     { value: "200", "label": "Shortlist" },
//     { value: "300", "label": "Interview" },
//     { value: "350", "label": "Client Reject" },
//     { value: "400", "label": "Offer" },
//     { value: "500", "label": "Start" },
//     { value: "550", "label": "Bad Delivery" }



//     // { value: "0", label: "New" },
//     // { value: "1", label: "View" },
//     // { value: "2", label: "Shortlist" },
//     // { value: "3", label: "Contacted" },
//     // { value: "4", label: "Pipeline" },
//     // { value: "5", label: "Not Interested" },
//     // { value: "6", label: "Not Available" },
//     // { value: "7", label: "Submitted by Competition" },
//     // { value: "8", label: "Internal Submission" },
//     // { value: "9", label: "Call First" },
//     // { value: "10", label: "Not Qualified" },
//     // { value: "11", label: "Client Submission" },
//     // { value: "12", label: "Interview Requested" },
//     // { value: "13", label: "Offer Made" },
//     // { value: "14", label: "Forward to HM" },
//     // { value: "15", label: "Placement" },
//     // { value: "16", label: "Bad Delivery" },
//     // { value: "17", label: "Off Market" },
//     // { value: "18", label: "Internal Reject" },
//     // { value: "19", label: "Client Reject" },
//     // { value: "20", label: "1st Round Interview" },
//     // { value: "21", label: "2nd Round Interview" },
//     // { value: "22", label: "Interview No Show" },
//     // { value: "23", label: "Start" },
//     // { value: "24", label: "3rd Round Interview" },
//     // { value: "25", label: "Final Round Interview" },
//     // { value: "26", label: "Direct Offer" },
//     // { value: "27", label: "Initiate Onboard" },
//     // { value: "28", label: "Withdrawn" },
//     // { value: "29", label: "Offer Rescinded" },
//     // { value: "30", label: "Clone" },
//     // { value: "31", label: "AM/RM Approved" },
//     // { value: "32", label: "AM/RM Left MSG" },
// ];

const HiringVolumeFilters = ({ onSearch, onFiltersChange }: jobFilterProps) => {
    // const { id } = useParams();
    const [expanded, setExpanded] = useState<string | false>(false);
    const [searchData, setSearchData] = useState<searchData>({
        job: "",
        workflow: "",
    });
    const [jobTitleList, setJobTitleList] = useState([]);
    const [nameList, setNameList] = useState([]);
    const [statusNameList, setStatusNameList] = useState([]);

    const CustomPaper = (props: any) => {
        return <Paper elevation={3} {...props} sx={{
            '& .MuiAutocomplete-option': {
                fontWeight: '600',
                color: 'var(--c-text-header)'
            }
        }} />;
    };

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleClearAll = () => {
        setSearchData({
            workflow: "",
            job: "",
        })
        onSearch({
            workflow: "",
            job: "",
        })
    }

    const handleClear = (key: string, e?: SyntheticEvent, i?: number) => {
        e?.stopPropagation();

        setSearchData({
            ...searchData,
            [key as keyof typeof searchData]: ""
        })
        onSearch({
            ...searchData,
            [key as keyof typeof searchData]: ""
        })

    }

    const handleJobTitleChange = (value: string) => {
        setSearchData({
            ...searchData,
            job: value
        })
    }

    const handleWorkflowChange = (value: string) => {
        setSearchData({
            ...searchData,
            workflow: value
        })
    }

    const searchJobs = () => {
        const data = {
            workflow: searchData.workflow,
            job: searchData.job,
        }
        onSearch(data);
    }

    const loadList = useCallback(debounce((filterName: string, keyValue: string) => {
        // ApiService.getByParams(193, 'Applicants/applicants_automation.jsp', { filterName: filterName, filterValue: keyValue }).then(
        const data = {
            filterName: filterName,
            filterValue: keyValue,
            clientId: userLocalData.getvalue('clientId'),
            recrId:
                //  (selectedJobTab === "all") ? "" :
                userLocalData.getvalue('recrId')
        };

        ApiService.postWithData("admin", 'applicantsAutomation', data).then(
            (result: any) => {
                if (filterName === 'title') {
                    setJobTitleList(result.data.jobTitles);
                } else if (filterName === 'name') {
                    setNameList(result.data.jobTitles)
                } else {
                    // console.log(result.data)
                }
            }
        )
    }, 400), [])

    useEffect(() => {
        setSearchData({
            workflow: onFiltersChange.workflow,
            job: onFiltersChange.job,
        })
    }, [onFiltersChange.workflow,
    onFiltersChange.job,
    ])


    return (
        <div id='HiringVolumeFilters'>
            <div className='accordian-wrap customFilterChips'>
                <Stack direction="row" justifyContent="space-between" className='heading'>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography component="h5">Filters</Typography>
                        {((searchData.workflow !== "") ||
                            (searchData.job !== "")
                        ) &&
                            <Stack
                                className='clearStack'
                                direction="row"
                                justifyContent="space-around"
                                onClick={handleClearAll}
                            >
                                <CloseIcon />
                                <Typography>
                                    {(searchData.workflow !== "" ? 1 : 0) +
                                        (searchData.job !== "" ? 1 : 0)
                                    }
                                </Typography>
                            </Stack>
                        }
                    </Stack>
                </Stack>
                <div className='filterListTab'>
                    <Accordion disableGutters square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                        >
                            <Stack sx={{ width: '100%' }}>
                                <Stack className='acc-title' direction="row" justifyContent="space-between">
                                    <Stack direction="row" alignItems="center">
                                        <WorkOutlineOutlinedIcon className='title-icon' />
                                        <Typography>Job</Typography>
                                    </Stack>
                                    {(searchData.job !== "") && <Stack
                                        className='clearStack'
                                        direction="row"
                                        justifyContent="space-around"
                                        onClick={(event) => handleClear("job", event)}
                                    >
                                        <CloseIcon />
                                        <Typography>
                                            {searchData.job !== "" ? 1 : 0}
                                        </Typography>
                                    </Stack>
                                    }
                                </Stack>
                                {(searchData.job !== "" && expanded !== 'panel2') &&
                                    <Stack direction="row" mt={1} flexWrap="wrap">
                                        <div className='filterLabelName'>Title:</div>
                                        <Tooltip title={`${searchData.job}`} placement='bottom'>
                                            <Chip label={searchData.job} icon={<CloseIcon />} className='selectedChips' onClick={(event) => handleClear("job", event)} />
                                        </Tooltip>
                                    </Stack>
                                }
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Autocomplete
                                id="job"
                                options={jobTitleList.map((option: any) => option)}
                                value={searchData.job}
                                freeSolo
                                renderTags={(value: readonly string[], getTagProps) =>
                                    value.map((option: any, index: number) => (
                                        <Chip variant="outlined" label={option.label} {...getTagProps({ index })} />
                                    ))
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        placeholder="Enter job title..."
                                    />
                                )}
                                PaperComponent={CustomPaper}
                                onChange={(event, value) => (value ? handleJobTitleChange(value) : "")}
                                onKeyUp={(e: any) => loadList('title', e.target.value)}
                                clearIcon={
                                    <ClearIcon fontSize="small" onClick={(event) => handleClear("job", event)} />}
                            />
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
                                        <AccountBoxOutlinedIcon className='title-icon' />
                                        <Typography>WorkFlow</Typography>
                                    </Stack>
                                    {(searchData.workflow !== "") && <Stack
                                        className='clearStack'
                                        direction="row"
                                        justifyContent="space-around"
                                        onClick={(event) => handleClear("workflow", event)}
                                    >
                                        <CloseIcon />
                                        <Typography>
                                            {searchData.workflow !== "" && 1}
                                        </Typography>
                                    </Stack>
                                    }
                                </Stack>
                                {(searchData.workflow !== "" && expanded !== 'panel1') &&
                                    <Stack direction="row" mt={1} flexWrap="wrap">
                                        <div className='filterLabelName'>Workflowe:</div>
                                        <Chip label={searchData.workflow} icon={<CloseIcon />} onClick={(event) => handleClear("workflow", event)} />
                                    </Stack>
                                }
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <MUIAutoComplete
                                id='workflowId'
                                handleChange={(id: any, name: string) => {
                                    handleWorkflowChange(id);
                                }}
                                valuePassed={searchData.workflow}
                                isMultiple={false}
                                textToShow="Select Workflow"
                                width="100%"
                                type='workflow'
                                placeholder="Select Workflow"
                            />
                            {/* <Autocomplete
                                id="workflow"
                                options={nameList.map((option: any) => option)}
                                value={searchData.workflow}
                                freeSolo
                                renderTags={(value: readonly string[], getTagProps) =>
                                    value.map((option: any, index: number) => (
                                        <Chip variant="outlined" label={option.label} {...getTagProps({ index })} />
                                    ))
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        placeholder="Enter workflow..."
                                    />
                                )}
                                PaperComponent={CustomPaper}
                                onChange={(event, value) => (value ? handleNameChange(value) : "")}
                                onKeyUp={(e: any) => loadList('workflow', e.target.value)}
                                clearIcon={<ClearIcon fontSize="small" onClick={(event) => handleClear("workflow", event)} />}
                            /> */}
                        </AccordionDetails>
                    </Accordion>


                </div>
            </div>
            <div className="filterBtnWrap">
                <Button variant="text" onClick={searchJobs}>Apply Filters</Button>
            </div>
        </div>
    )
}

export default HiringVolumeFilters;