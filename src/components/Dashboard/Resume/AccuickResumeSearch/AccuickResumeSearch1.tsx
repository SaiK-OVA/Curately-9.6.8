import {forwardRef} from 'react';
import  {React, useState, useEffect } from '../../../../shared/modules/React';
import {Typography} from '../../../../shared/modules/MaterialImports/Typography';
import Container from '@mui/material/Container';
import {TextField, FormControlLabel, FormControl} from '../../../../shared/modules/MaterialImports/FormInputs';
import {Button, IconButton, InputLabel} from '../../../../shared/modules/commonImports';
import {Stack} from '../../../../shared/modules/MaterialImports/Stack';
import {Checkbox} from '../../../../shared/modules/MaterialImports/FormElements';
import {MenuItem} from '../../../../shared/modules/MaterialImports/Menu';
import {Chip} from '../../../../shared/modules/MaterialImports/Chip';
import {Dialog, DialogContent} from '../../../../shared/modules/MaterialImports/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Slide from '@mui/material/Slide';
import {Box} from '../../../../shared/modules/MaterialImports/Box';
import Autocomplete from '@mui/material/Autocomplete';

import { TransitionProps } from '@mui/material/transitions';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CloseIcon from '@mui/icons-material/Close';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ApiRequests from '../../../../shared/api/api';
import WorkIcon from '@mui/icons-material/Work';
// import { trackPromise } from 'react-promise-tracker';
import {CircularProgress} from '../../../../shared/modules/MaterialImports/CircularProgress';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import './AccuickResumeSearch.scss';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="left" ref={ref} {...props} />;
});

export interface keywordInterface {
    title: string
}

const AccuickResumeSearch = () => {
    const [jobList, setJobList] = useState([]);
    const [totalJobs, setTotalJobs] = useState(0);
    const [isDataLoading, setisDataLoading] = useState(false);
    const [jobListLoaded, setjobListLoaded] = useState(false);
    const [dialogJob, setDialogJob] = useState<{ [key: string]: any }>({});
    const [keywords, setKeywords] = useState<keywordInterface[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [windowHeight, setWindowHeight] = useState(0);
    const [loadingMoreJobs, setLoadingMoreJobs] = useState(false);
    const [token, setToken] = useState('');
    const [dataToSend, setDataToSend] = useState<{ [key: string]: any }>({});
    const [checkScroll, setCheckScroll] = useState(true);

    const [filters, setFilters] = useState({
        query: '',
        address: '',
        searchMode: 'JOB_SEARCH',
        disableKeywordMatch: false,
        keywordMatchMode: 'KEYWORD_MATCH_TITLE_ONLY',
        enableBroadening: false,
        commuteMethod: '',
        allowImpreciseAddresses: false,
        departureTime: '',
        departureTimeCount: '',
        roadTraffic: '',
        travelDuration: '',
        latitude: '',
        longitude: ''
    });

    const handleQueryChange = (value: string[]) => {
        let queryText = value.join(', ');
        setFilters({
            ...filters,
            query: queryText
        })
    }

    const handleLocationChange = (event: any) => {
        setFilters({
            ...filters,
            address: event.target.value as string
        })
    }

    const handleKeywordChange = (e: any) => {
        setFilters({
            ...filters,
            disableKeywordMatch: e.target.checked
        })
    }

    const handleImpreciseChange = (e: any) => {
        setFilters({
            ...filters,
            allowImpreciseAddresses: e.target.checked
        })
    }

    const handleBrodaningChange = (e: any) => {
        setFilters({
            ...filters,
            enableBroadening: e.target.checked
        })
    }

    const handleChange = (event: SelectChangeEvent) => {
        setFilters({
            ...filters,
            searchMode: event.target.value as string
        })
    };

    const handleKeywordModeChange = (event: SelectChangeEvent) => {
        setFilters({
            ...filters,
            keywordMatchMode: event.target.value as string
        })
    };

    const handleMethodChange = (event: SelectChangeEvent) => {
        setFilters({
            ...filters,
            commuteMethod: event.target.value as string
        })
    };

    const handleTimeChange = (event: SelectChangeEvent) => {
        setFilters({
            ...filters,
            departureTime: event.target.value as string
        })
    };

    const handleTrafficChange = (event: SelectChangeEvent) => {
        setFilters({
            ...filters,
            roadTraffic: event.target.value as string
        })
    };

    const handleTravelChange = (e: any) => {
        setFilters({
            ...filters,
            travelDuration: e.target.value as string
        })
    }

    const handleLatitudeChange = (e: any) => {
        setFilters({
            ...filters,
            latitude: e.target.value as string
        })
    }

    const handleLongitudeChange = (e: any) => {
        setFilters({
            ...filters,
            longitude: e.target.value as string
        })
    }

    const handleTimeContChange = (e: any) => {
        setFilters({
            ...filters,
            departureTimeCount: e.target.value as string
        })
    }

    const loadJobList = () => {

        let jobQuery: { [key: string]: any } = {
            "query": filters.query,
            "locationFilters": [
                {
                    "address": filters.address,
                    "distanceInMiles": 0
                }
            ]
        }

        if (filters.commuteMethod || filters.allowImpreciseAddresses || filters.departureTime || filters.roadTraffic || filters.travelDuration) {

            if (filters.commuteMethod) {
                jobQuery.commuteFilter.push({ "commuteFilter": filters.commuteMethod })
            }

            jobQuery.commuteFilter.push({ "allowImpreciseAddresses": filters.allowImpreciseAddresses });

            if (filters.departureTime) {
                if (filters.departureTimeCount) {
                    jobQuery.commuteFilter.push({
                        "departureTime": {
                            "hours": (filters.departureTime === "hours") ? Number(filters.departureTimeCount) : 0,
                            "minutes": (filters.departureTime === "minutes") ? Number(filters.departureTimeCount) : 0,
                            "nanos": 0,
                            "seconds": (filters.departureTime === "seconds") ? Number(filters.departureTimeCount) : 0
                        }
                    })
                }
            }

            if (filters.roadTraffic) {
                jobQuery.commuteFilter.push({ "roadTraffic": filters.roadTraffic });
            }

            if (filters.travelDuration) {
                jobQuery.commuteFilter.push({ "travelDuration": filters.travelDuration + "s" });
            }

            if (filters.latitude && filters.longitude) {
                jobQuery.commuteFilter.push({ "startCoordinates": { "latitude": filters.latitude, "longitude": filters.longitude } });

            }

        }

        let tempData = {
            "projectId": "onboarding-places",
            "tenantId": "4ed66df4-ca00-0000-0000-00532fb66b72",
            "jobquery": [
                jobQuery
            ],
            "searchMode": filters.searchMode,
            "disableKeywordMatch": filters.disableKeywordMatch,
            "enableBroadening": filters.enableBroadening,
            "keywordMatchMode": filters.keywordMatchMode,
            "offset": 0
        };

        setDataToSend(tempData);
        requestingJobList(tempData);

        // trackPromise(
        //     ApiRequests.getJobList(tempData).then((response: any) => {
        //         if (response.status === 200) {
        //             setJobList(response.data.jobList);
        //             setTotalJobs(response.data.totalSize);
        //             setDialogJob(response.data.jobList);
        //             setjobListLoaded(true);
        //             setisDataLoading(false);
        //         }
        //     })
        // )

        // const response = ApiRequests.getJobList();
        // setJobList(response.jobList);
        // setDialogJob(response.jobList[0]);
        // setTotalJobs(response.totalSize ? response.totalSize : 0);
    }

    const requestingJobList = (data: any) => {
        if (token) {
            data.pageToken = token;
            data.offset = jobList.length;
        }

        // trackPromise(
        ApiRequests.postWithData('CTS', 'searchjobslist', data).then((response: any) => {
            // console.log(response)
            if (response.data.success) {
                if (token) {
                    setJobList((prevList) => prevList.concat(response.data.jobList))
                    setCheckScroll(true);
                    setLoadingMoreJobs(false);
                } else {
                    setJobList(response.data.jobList);
                    setisDataLoading(false);
                }
                setTotalJobs(response.data.totalSize);
                setjobListLoaded(true);
                setToken(response.data.pageToken);
            }
        })
        // )
    }

    const handleTitleClick = (i: number) => {
        setDialogJob(jobList[i]);
        setOpenDialog(true);
    }

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleSearch = () => {
        loadJobList();
        setisDataLoading(true);
    }

    const getAddress = (job: any) => {
        return (job.job_ && job.job_.addresses_ && job.job_.addresses_.length) ? job.job_.addresses_[0] : ""
    }

    const getDetails = (job: any, title: string) => {
        if (title === "payRate") {
            return (job.job_ && job.job_.customAttributes_ && job.job_.customAttributes_.mapData && job.job_.customAttributes_.mapData.payrange && job.job_.customAttributes_.mapData.payrange.stringValues_ && job.job_.customAttributes_.mapData.payrange.stringValues_.length) ? job.job_.customAttributes_.mapData.payrange.stringValues_[0] : "";
        }

        if (title === "jobType") {
            return (job.job_ && job.job_.customAttributes_ && job.job_.customAttributes_.mapData && job.job_.customAttributes_.mapData.jobType && job.job_.customAttributes_.mapData.jobType.stringValues_ && job.job_.customAttributes_.mapData.jobType.stringValues_.length) ? job.job_.customAttributes_.mapData.jobType.stringValues_[0] : "";
        }

        if (title === "isRemote") {
            let isremote = (job.job_ && job.job_.customAttributes_ && job.job_.customAttributes_.mapData && job.job_.customAttributes_.mapData.isRemote && job.job_.customAttributes_.mapData.isRemote.stringValues_ && job.job_.customAttributes_.mapData.isRemote.stringValues_.length) ? job.job_.customAttributes_.mapData.isRemote.stringValues_[0] : "";
            return isremote = (isremote === true) ? "Yes" : (isremote === true) ? "No" : "";
        }

        if (title === "payType") {
            return (job.job_ && job.job_.customAttributes_ && job.job_.customAttributes_.mapData && job.job_.customAttributes_.mapData.payType && job.job_.customAttributes_.mapData.payType.stringValues_ && job.job_.customAttributes_.mapData.payType.stringValues_.length) ? job.job_.customAttributes_.mapData.payType.stringValues_[0] : "";
        }

        if (title === "status") {
            return (job.job_ && job.job_.customAttributes_ && job.job_.customAttributes_.mapData && job.job_.customAttributes_.mapData.status && job.job_.customAttributes_.mapData.status.stringValues_ && job.job_.customAttributes_.mapData.status.stringValues_.length) ? job.job_.customAttributes_.mapData.status.stringValues_[0] : "";
        }
    }

    const debounceFun = (cb: any, delay = 500) => {
        let timeout: any;

        return (...args: any) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                cb(...args);
            }, delay)
        }
    }

    const getFilteredKeywords = (Event: React.SyntheticEvent, inputValue: string, reason: string) => {
        let str = inputValue;
        let currentValue: string[] = [];
        let currentIndex: number[] = [];
        let seperators: string[] = [',', 'and', 'or'];

        if (str) {
            for (let i = 0; i < seperators.length; i++) {
                if (str.includes(seperators[i])) {
                    currentIndex.push(str.indexOf(seperators[i]))
                } else currentIndex.push(0)
            }

            let lasrSeperator = seperators[currentIndex.indexOf(currentIndex.reduce((a, b) => Math.max(a, b)))];

            currentValue = str.split(lasrSeperator);
            let queryValue = currentValue[currentValue.length - 1].trim() !== "" ? currentValue[currentValue.length - 1].trim() : str.trim();
            // console.log(queryValue);
            let data = {
                query: queryValue
            }
            // trackPromise(
            ApiRequests.postWithData('CTS', 'autocomplete', data).then((response: any) => {
                if (response.data.Success) {
                    setKeywords(response.data.list);
                }
            })
            // )
        } else {
            setKeywords([])
        }
    }

    const handleScroll = () => {
        const scrollPosition = document.getElementById('resume-search-container')?.scrollTop;
        const consition = (scrollPosition && windowHeight !== 0 && checkScroll && jobList.length < totalJobs) ? (scrollPosition > windowHeight ? true : false) : false;

        if (consition) {
            setLoadingMoreJobs(true);
            setCheckScroll(false);
            requestingJobList(dataToSend);
        }
    };
    const removeJunkText = (val: string) => {
        // eslint-disable-next-line no-useless-escape
        return val ? val.replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '') : "";
    }

    const keywordTooltip = 'Controls whether to disable exact keyword match on <span class="text-info">Job.title, Job.description, Job.company_display_name, Job.addresses, Job.qualifications</span>. When disable keyword match is turned off, a keyword match returns jobs that do not match given category filters when there are matching keywords. For example, for the query "program manager," a result is returned even if the job posting has the title "software developer," which doesn&#39;t fall into "program manager" ontology, but does have "program manager" appearing in its description. For queries like "cloud" that don&#39;t contain title or location specific ontology, jobs with "cloud" keyword matches are returned regardless of this flag&#39;s value.<br /> Defaults to false.';

    const broadeningTooltip = 'Controls whether to broaden the search when it produces sparse results. Broadened queries append results to the end of the matching results list.<br /> Defaults to false.';

    const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))({
        [`& .${tooltipClasses.tooltip}`]: {
            maxWidth: 500,
            width: 500
        },
    });


    useEffect(() => {
        const height = document.getElementById('resume-search-container')?.scrollHeight;
        const clientHeight = document.getElementById('resume-search-container')?.clientHeight
        setWindowHeight(height && clientHeight ? height - clientHeight - 150 : 0);
    }, [jobList]);

    return (
        (<div className='resume-search-container' id="resume-search-container" onScroll={handleScroll}>
            <div className="AccuickResumeSearch">
                <Container maxWidth="lg">
                    <Typography variant="h4" className='heading'>Find Jobs</Typography>

                    <Stack className='searchbar-conatiner' direction="row" spacing={3}>
                        {/* <TextField id="bykeyword" label="Search by keyword, job title" variant="standard" sx={{ width: 'calc(50% - 54px)' }} /> */}
                        <Autocomplete
                            id="bykeyword"
                            freeSolo
                            options={keywords.map((option) => option.title)}
                            renderInput={(params) => <TextField {...params} label="Search by keyword, job title" variant="standard" />}
                            sx={{ width: 'calc(50% - 54px)' }}
                            onInputChange={debounceFun(getFilteredKeywords)}
                            onChange={(event, value) => (value ? handleQueryChange(value) : "")}
                            multiple={true}
                        />
                        <TextField id="bylocation" label="Search by location" variant="standard" sx={{ width: 'calc(50% - 54px)' }} onChange={handleLocationChange} />
                        <Button
                            variant="contained"
                            endIcon={<SearchIcon />}
                            sx={{ borderRadius: '8px', '&:hover': { boxShadow: 'none' } }}
                            onClick={handleSearch}
                        >
                            Search
                        </Button>
                    </Stack>

                    <Stack direction="row" spacing={3} className='filters' alignItems="flex-start">
                        <div className='filter-label'>
                            <FilterListIcon sx={{ marginRight: '5px' }} />
                            Filter
                        </div>

                        <Stack flexWrap="wrap" direction="row" spacing={3} useFlexGap>

                            {/* <FormControl sx={{ width: 140 }}>
                                <InputLabel id="searchmode-label" size='small'>Search Mode</InputLabel>
                                <Select
                                    labelId="searchmode-label"
                                    id="searchmode"
                                    value={filters.searchMode}
                                    label="Search Mode"
                                    onChange={handleChange}
                                    size="small"
                                >
                                    <MenuItem value="JOB_SEARCH">JobSearch</MenuItem>
                                    <MenuItem value="FEATURED_JOB_SEARCH">Featured JobSearch</MenuItem>
                                </Select>
                            </FormControl> */}

                            <FormControl sx={{ width: 140 }}>
                                <InputLabel id="searchin-label" size='small'>Search in</InputLabel>
                                <Select
                                    labelId="searchin-label"
                                    id="searchin"
                                    value={filters.keywordMatchMode}
                                    label="Search In"
                                    onChange={handleKeywordModeChange}
                                    size="small"
                                >
                                    <MenuItem value="KEYWORD_MATCH_TITLE_ONLY">Job Title</MenuItem>
                                    <MenuItem value="KEYWORD_MATCH_ALL">All</MenuItem>
                                </Select>
                            </FormControl>

                            <Box>
                                <FormControlLabel control={
                                    <Checkbox id='keyword' name="keyword" onChange={handleKeywordChange} />
                                } label="Disable Keyword Match" sx={{ marginRight: '5px' }} />
                                <CustomWidthTooltip
                                    title={<div dangerouslySetInnerHTML={{ __html: keywordTooltip }} />}
                                    arrow
                                    componentsProps={{
                                        tooltip: {
                                            sx: {
                                                bgcolor: '#111',
                                                fontSize: '12px',
                                                lineHeight: '18px',
                                                textAlign: 'center',
                                                width: '500px',
                                                '& .MuiTooltip-arrow': {
                                                    color: '#111',
                                                }
                                            },
                                        },
                                    }}
                                >
                                    <span className='popover-text'>i</span>
                                </CustomWidthTooltip>

                            </Box>
                            <Box>
                                <FormControlLabel control={
                                    <Checkbox id='broadening' name="broadening" onChange={handleBrodaningChange} />
                                } label="Enable Broadening" sx={{ marginRight: '5px' }} />
                                <CustomWidthTooltip
                                    title={<div dangerouslySetInnerHTML={{ __html: broadeningTooltip }} />}
                                    arrow
                                    componentsProps={{
                                        tooltip: {
                                            sx: {
                                                bgcolor: '#111',
                                                fontSize: '12px',
                                                lineHeight: '18px',
                                                textAlign: 'center',
                                                width: '500px',
                                                '& .MuiTooltip-arrow': {
                                                    color: '#111',
                                                }
                                            },
                                        },
                                    }}
                                >
                                    <span className='popover-text'>i</span>
                                </CustomWidthTooltip>
                            </Box>

                        </Stack>
                    </Stack>

                    <Stack direction="row" spacing={3} className='filters' alignItems="flex-start">
                        <FormControl sx={{ width: 170 }}>
                            <InputLabel id="commutemethod-label" size='small'>Commute Method</InputLabel>
                            <Select
                                labelId="commutemethod-label"
                                id="commutemethod"
                                value={filters.commuteMethod}
                                label="Commute Method"
                                onChange={handleMethodChange}
                                size="small"
                            >
                                <MenuItem value="DRIVING">DRIVING</MenuItem>
                                <MenuItem value="TRANSIT">TRANSIT</MenuItem>
                                <MenuItem value="WALKING">WALKING</MenuItem>
                                <MenuItem value="CYCLING">CYCLING</MenuItem>
                                <MenuItem value="TRANSIT_ACCESSIBLE">TRANSIT_ACCESSIBLE</MenuItem>
                            </Select>
                        </FormControl>

                        <Box sx={{ display: 'flex' }}>
                            <FormControl sx={{ width: 140 }}>
                                <InputLabel id="departureTime-label" size='small'>Departure Time</InputLabel>
                                <Select
                                    id="departureTime"
                                    value={filters.departureTime}
                                    label="Departure Time"
                                    onChange={handleTimeChange}
                                    size="small"
                                >
                                    <MenuItem value="Seconds">Seconds</MenuItem>
                                    <MenuItem value="Minutes">Minutes</MenuItem>
                                    <MenuItem value="Hours">Hours</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField id="time" variant="outlined" size='small' sx={{ width: 60 }} onChange={handleTimeContChange} />
                        </Box>

                        <FormControl sx={{ width: 130 }}>
                            <InputLabel id="roadTraffic-label" size='small'>Road Traffic</InputLabel>
                            <Select
                                labelId="roadTraffic-label"
                                id="roadTraffic"
                                value={filters.roadTraffic}
                                label="Road Traffic"
                                onChange={handleTrafficChange}
                                size="small"
                            >
                                <MenuItem value={10}>TRAFFIC_FREE</MenuItem>
                                <MenuItem value={20}>BUSY_HOUR</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl sx={{ width: 140 }}>
                            <TextField id="travel-deuration" variant="outlined" size='small' label='Travel Duration' onChange={handleTravelChange} />
                        </FormControl>

                        <FormControlLabel control={
                            <Checkbox id='addresses' name="addresses" onChange={handleImpreciseChange} />
                        } label="Allow Imprecise Addresses" />

                        <Box sx={{ display: 'flex' }}>
                            <TextField id="latitude" variant="outlined" size='small' label='Latitude' sx={{ width: 90 }} onChange={handleLatitudeChange} />
                            <TextField id="longitude" variant="outlined" size='small' label='Longitude' sx={{ width: 90 }} onChange={handleLongitudeChange} />
                        </Box>
                    </Stack>

                </Container>


            </div>
            {/* <JobsList data={jobList} totalJobs={totalJobs}></JobsList> */}
            {isDataLoading && <div className="loader">
                <CircularProgress color="primary" />
            </div>}
            {(jobListLoaded && !isDataLoading) && <div className='jobList-container'>
                <Container maxWidth="lg">
                    {totalJobs && <Typography align="right" mb={2}>Total Jobs: {totalJobs}</Typography>}
                    {jobList.map((job: any, i: number) => (
                        <div className='job-card' key={i}>
                            <Stack direction="row" justifyContent="space-between" sx={{ marginBottom: '15px' }}>
                                <Typography variant="h5" className='job-title' sx={{ cursor: 'pointer' }} onClick={() => handleTitleClick(i)}>{job.job_.title_}</Typography>
                                {getAddress(job) ? <Chip icon={<LocationOnIcon color="primary" />} label={getAddress(job)} variant="outlined" sx={{ border: 'none' }} /> : ""}

                            </Stack>
                            <Stack direction="row" className='desc-stack' spacing={2}>
                                <Typography className='head'>Job Title Snippet</Typography>
                                <Typography className='desc' dangerouslySetInnerHTML={{ __html: (job.jobTitleSnippet_) ? job.jobTitleSnippet_.replaceAll(/(<([^>]+)>)/ig, '') : "" }}></Typography>
                            </Stack>
                            <Stack direction="row" className='desc-stack' spacing={2}>
                                <Typography className='head'>Summary</Typography>
                                <Typography className='desc trim' dangerouslySetInnerHTML={{ __html: (job.jobSummary_) ? job.jobSummary_.replaceAll(/(<([^>]+)>)/ig, '') : "" }}></Typography>
                            </Stack>
                            <Stack direction="row" className='desc-stack' spacing={2}>
                                <Typography className='head'>Search Text Snippet</Typography>
                                <Typography className='desc trim' dangerouslySetInnerHTML={{ __html: (job.searchTextSnippet_) ? job.searchTextSnippet_.replaceAll(/(<([^>]+)>)/ig, '') : "" }}></Typography>
                            </Stack>
                        </div>
                    ))}

                </Container>
            </div>}
            {loadingMoreJobs && <div className="loader2">
                <CircularProgress color="primary" />
            </div>}
            <Dialog
                fullScreen
                open={openDialog}
                onClose={handleClose}
                TransitionComponent={Transition}
                sx={{ left: '150px' }}
            >
                <AppBar sx={{ position: 'relative' }} color='default'>
                    <Toolbar>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div" dangerouslySetInnerHTML={{ __html: (dialogJob.jobTitleSnippet_) ? dialogJob.jobTitleSnippet_.replace('\\r\\n', '').replaceAll('\\', '') : "" }}>
                            {/* {dialogJob.jobTitleSnippet_} */}
                        </Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <DialogContent sx={{ padding: "30px 38px" }}>
                    <Stack direction="row" className='dialog-stack'>
                        <Chip icon={<LocationOnIcon color="primary" />} label={getAddress(dialogJob)} variant="outlined" sx={{ border: 'none' }} />
                        <Chip icon={<AttachMoneyIcon color="primary" />} label={getDetails(dialogJob, "payRate")} variant="outlined" sx={{ border: 'none' }} />
                        <Chip icon={<WorkIcon color="primary" />} label={getDetails(dialogJob, "jobType")} variant="outlined" sx={{ border: 'none' }} />
                    </Stack>
                    <Stack direction="row" className='dialog-stack'>
                        <Typography><span>Remote </span>{getDetails(dialogJob, "isRemote")}</Typography>
                        <Typography><span>Pay Type </span>{getDetails(dialogJob, "payType")}</Typography>
                        <Typography><span>Status </span>{getDetails(dialogJob, "status")}</Typography>
                    </Stack>

                    <Stack direction="row" className='desc-stack' spacing={2}>
                        <Typography className='head'>Job Title Snippet</Typography>
                        <Typography className='desc' dangerouslySetInnerHTML={{
                            __html:
                                ((dialogJob.jobTitleSnippet_ && dialogJob.jobTitleSnippet_.trim()) ? removeJunkText(dialogJob.jobTitleSnippet_) : "")
                        }}></Typography>
                    </Stack>

                    <Stack direction="row" className='desc-stack' spacing={2}>
                        <Typography className='head'>Search Text Snippet</Typography>
                        <Typography className='desc' dangerouslySetInnerHTML={{
                            __html:
                                ((dialogJob.searchTextSnippet_ && dialogJob.searchTextSnippet_.trim()) ? removeJunkText(dialogJob.searchTextSnippet_) : "")
                        }}></Typography>
                    </Stack>

                    <Stack direction="row" className='desc-stack' spacing={2}>
                        <Typography className='head'>Summary</Typography>
                        <Typography className='desc' dangerouslySetInnerHTML={{
                            __html:
                                ((dialogJob.jobSummary_ && dialogJob.jobSummary_.trim()) ? removeJunkText(dialogJob.jobSummary_) : "")
                        }}></Typography>
                    </Stack>

                    <Stack direction="row" className='desc-stack' spacing={2} alignItems="baseline">
                        <Typography className='head'>Description</Typography>
                        <Typography className='desc' dangerouslySetInnerHTML={{
                            __html:
                                ((dialogJob.job_ && dialogJob.job_.description_ && dialogJob.job_.description_.trim()) ? removeJunkText(dialogJob.job_.description_) : "")
                        }}></Typography>
                    </Stack>
                </DialogContent>

            </Dialog>
        </div>)
    );
}
export default AccuickResumeSearch;





