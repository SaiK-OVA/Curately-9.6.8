import { React, useEffect, useMemo, useRef, useState } from "../../../../shared/modules/React";
import { Button } from "../../../../shared/modules/MaterialImports/Button";
import { Grid } from "../../../../shared/modules/MaterialImports/Grid";
import { Stack } from "../../../../shared/modules/MaterialImports/Stack";
import { Typography } from "../../../../shared/modules/MaterialImports/Typography";
import { MaterialReactTable, MRT_ColumnDef } from "../../../../shared/modules/MaterialReactTable";
import CustomPagination from "../../../shared/CustomPagination/CustomPagination";
import SwitchLeftIcon from "@mui/icons-material/SwitchLeft";
import { TextField } from "../../../../shared/modules/MaterialImports/TextField";
import { Checkbox } from "../../../../shared/modules/MaterialImports/FormElements";
import { IconButton, InputAdornment } from '../../../../shared/modules/commonImports';
import { DateTime } from '../../../../shared/modules/Luxon';
import { DatePicker, LocalizationProvider, AdapterLuxon } from '../../../../shared/modules/MaterialImports/DatePicker';
import { Box } from "../../../../shared/modules/MaterialImports/Box";
import { trackPromise } from '../../../../shared/modules/PromiseTrackter';
import { showToaster } from '../../../../shared/modules/commonImports';
import { userLocalData } from '../../../../shared/services/userData';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { Tooltip } from '../../../../shared/modules/MaterialImports/ToolTip';
import {
    type MRT_ColumnFiltersState,
    //type MRT_Virtualizer,
} from 'material-react-table';
import { CloseRounded, ErrorOutlineOutlined, SearchOutlined } from '@mui/icons-material';
import ApiService from '../../../../shared/api/api';
import { FormatMillisecondsToCustomDate } from '../../../../shared/utils/FormatMillisecondsToCustomDate';
import "./DivaJobs.scss";
import MissingFields from "./MissingFields/MissingFields";
import { MenuItem } from "../../../../shared/modules/MaterialImports/Menu";
import { OpenErrorModal } from "../../../shared/ErrorModal/ErrorModal";
// import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
// import CloseOutlined from "@mui/icons-material/CloseOutlined";
import { Link, useSearchParams } from "react-router-dom";
import { useLayoutEffect } from "react";
import Parsable from "../../../../shared/utils/Parsable";
import { v4 as uuidv4 } from 'uuid';
// import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
// import CloseOutlined from "@mui/icons-material/CloseOutlined";
//import { MUIAutoComplete } from "../../../shared/MUIAutoComplete/MUIAutoComplete";

const DivaJobs = () => {

    const [searched, setSearched] = useState<boolean>(false);

    const [searchJobName, setSearchJobName] = useState<any>("");
    const [searchJobReferenceNo, setSearchJobReferenceNo] = useState<any>("");
    const [searchCompanyName, setSearchCompanyName] = useState<any>("");
    const [DivaJobsList, setDivaJobsList] = useState<any[] | never[]>([]);

    const [searchValue, setSearchValue] = useState("");
    const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);
    const [rowSelection, setRowSelection] = useState({});

    const [rowCount, setRowCount] = useState(0);
    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
        [],
    );

    const [globalFilter, setGlobalFilter] = useState<string>();

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 25,
    });
    const [openMissingFields, setOpenMissingFields] = useState(false);
    const [pushCuratelyJobData, setPushCuratelyJobData] = useState<any>({});
    const [searchOffSet, setSearchOffSet] = useState(25);

    const isInitialLoad = useRef(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const sessionSearchId = useRef(searchParams.get("id") ? searchParams.get("id") as string : "");
    const sessionSearchData = useRef({
        divaJobsList: [],
        rowCount: 0,
        searched: false,
        searchJobData: {
            searchJobName: "",
            searchJobReferenceNo: "",
            searchCompanyName: "",
            startDate: DateTime.now().minus({ days: 14 }),
            endDate: DateTime.now(),
        },
        pagination: {
            pageIndex: 0,
            pageSize: 25,
        },
        searchOffSet: 25,
        searchValue: ""
    });

    useLayoutEffect(() => {
        if (!searchParams.get("id")) {
            let v4Id = uuidv4();
            setSearchParams({ id: v4Id });
            sessionSearchId.current = v4Id;
        } else {
            sessionSearchId.current = searchParams.get("id") as string;
            const sessionStorageData: any = sessionStorage.getItem(`DivaJobs_${sessionSearchId.current}`);
            if (sessionStorageData && Parsable.isJSON(sessionStorageData) && !!JSON.parse(sessionStorageData as string)?.divaJobsList?.length) {
                sessionSearchData.current = JSON.parse(sessionStorageData as string);
            }
            else isInitialLoad.current = false;
        }
    }, [searchParams])


    useEffect(() => {
        if (isInitialLoad.current) {
            setDivaJobsList(sessionSearchData?.current?.divaJobsList || []);
            setPagination(sessionSearchData?.current?.pagination || { pageIndex: 0, pageSize: 25 });
            setSearchValue(sessionSearchData?.current?.searchValue || "");
            setSearchOffSet(sessionSearchData?.current?.searchOffSet || 25);
            setSearched(sessionSearchData?.current?.searched || false);
            setRowCount(sessionSearchData?.current?.rowCount || 0);
            setSearchJobName(sessionSearchData?.current?.searchJobData?.searchJobName || "");
            setSearchJobReferenceNo(sessionSearchData?.current?.searchJobData?.searchJobReferenceNo || "");
            setSearchCompanyName(sessionSearchData?.current?.searchJobData?.searchCompanyName || "");
            setStartDate(() =>
                sessionSearchData?.current?.searchJobData?.startDate ?
                    DateTime.fromISO(sessionSearchData?.current?.searchJobData?.startDate as any) :
                    DateTime.now().minus({ days: 14 }))
            setEndDate(() =>
                sessionSearchData?.current?.searchJobData?.endDate ?
                    DateTime.fromISO(sessionSearchData?.current?.searchJobData?.endDate as any) :
                    DateTime.now());
        } else {
            getDivaOpenJobsList();
        }
    }, [searchParams]);

    const saveDataToSession = (passedData: {
        jobsList: any[],
        totalCount?: number,
        paginationData?: any,
        isSearched: boolean,
        jobSearchValue: string,
        searchOffsetValue?: number,
        searchJobName?: any,
        searchJobReferenceNo?: any,
        searchCompanyName?: any,
        startDate?: any,
        endDate?: any
    }) => {
        const { jobsList, totalCount, paginationData, isSearched, jobSearchValue, searchOffsetValue } = passedData;
        const dataToSave = {
            divaJobsList: jobsList,
            rowCount: totalCount ? totalCount : rowCount ? rowCount : jobsList.length,
            searched: isSearched,
            searchJobData: {
                searchJobName: [null, undefined].includes(passedData?.searchJobName) ? searchJobName : passedData?.searchJobName,
                searchJobReferenceNo: [null, undefined].includes(passedData?.searchJobReferenceNo) ? searchJobReferenceNo : passedData?.searchJobReferenceNo,
                searchCompanyName: [null, undefined].includes(passedData?.searchCompanyName) ? searchCompanyName : passedData?.searchCompanyName,
                startDate: [null, undefined].includes(passedData?.startDate) ? startDate : passedData?.startDate,
                endDate: [null, undefined].includes(passedData?.endDate) ? endDate : passedData?.endDate,
            },
            pagination: paginationData ? paginationData : pagination,
            searchOffSet: searchOffsetValue ? searchOffsetValue : searchOffSet,
            searchValue: jobSearchValue,
        }
        sessionStorage.setItem(`DivaJobs_${sessionSearchId.current}`, JSON.stringify(dataToSave));
    }


    const [startDate, setStartDate] = useState<DateTime>(DateTime.now().minus({ days: 14 }));
    const [endDate, setEndDate] = useState<DateTime>(DateTime.now());

    const [companiesList, setCompaniesList] = useState<any[]>([]);

    useEffect(() => {
        getJobDivaCompaniesList();
    }, []);

    const getJobDivaCompaniesList = () => {
        trackPromise(
            ApiService.getCall("ats", `jobDiva/getCompanies/${userLocalData.getvalue("clientId")}`).then((res: any) => {
                setCompaniesList(res?.data?.data || [])
            })
        )
    }

    const getDivaOpenJobsList = () => {
        trackPromise(
            ApiService.getCall("ats", `jobDiva/issuedJobsList/${userLocalData.getvalue("clientId")}`).then((res: any) => {
                let jobList: any = res?.data?.data || []
                if (res?.data?.Success && !!jobList?.length) {
                    jobList = jobList.map((each: any) => ({
                        ...each,
                        title: each.TITLE || "",
                        id: each.JOBID || "",
                        company_name: each.COMPANYNAME || "",
                        dateLastModified: each.ISSUEDATE || ""
                    }));
                    jobList = jobList.sort((current: any, next: any) => {
                        let currentDate = new Date(current.ISSUEDATE);
                        let nextDate = new Date(next.ISSUEDATE);

                        return nextDate.getTime() - currentDate.getTime();
                    });
                    setDivaJobsList([...jobList]);
                    setRowCount(jobList?.length || 0);
                    setSearchValue("");
                    saveDataToSession({
                        jobsList: [...jobList],
                        isSearched: false,
                        jobSearchValue: "",
                        searchJobName: "",
                        searchJobReferenceNo: "",
                        searchCompanyName: "",
                        startDate: DateTime.now().minus({ days: 14 }),
                        endDate: DateTime.now(),
                        searchOffsetValue: 25
                    });
                } else {
                    showToaster((res.data.Message) ? res.data.Message : "An error occured while getting Job List.", 'error')
                }
            })
        )

    }

    const getSlicedCell = (data: string) => {
        const displayTitle = data?.length > 30 ? data.slice(0, 30) : data;
        if (data?.length > 30) {
            return (
                <Tooltip title={data}>
                    <span>{displayTitle}...</span>
                </Tooltip>
            )
        } else return <span>{displayTitle}</span>
    }

    const flatData = useMemo(
        () => {
            // if (!searched) {
            //     const records = DivaJobsList.filter((page) => {
            //         return page.title.toLowerCase().includes(searchValue.toLowerCase() || "");
            //     })
            //     setRowCount(records.length);
            //     return records.slice((pagination.pageIndex * pagination.pageSize), ((pagination.pageIndex + 1) * pagination.pageSize));
            // } else {
            //     const records = DivaJobsList?.filter((page) => {
            //         return page.title.toLowerCase().includes(searchValue.toLowerCase() || "");
            //     }) ?? [];
            //     setRowCount(records.length);
            //     return records;
            // }

            const records = DivaJobsList.filter((page) => {
                return page.title.toLowerCase().includes(searchValue.toLowerCase() || "");
            })
            setRowCount(records.length);
            // if (searched) {
            //     return records;
            // } else {
            //     return records.slice((pagination.pageIndex * pagination.pageSize), ((pagination.pageIndex + 1) * pagination.pageSize));
            // }
            return records;
        },
        [searchValue, DivaJobsList],
    );


    const columns: MRT_ColumnDef<any>[] = useMemo(() => [
        {
            accessorKey: "JOBDIVANO",
            header: "JobDiva No",
            Cell: ({ row }: any) => getSlicedCell(row.original.JOBDIVANO),
            size: 70,
        },
        // {
        //     accessorKey: "OPTIONALREFERENCENO",
        //     header: "Optional Ref#",
        //     Cell: ({ row }: any) => getSlicedCell(row.original.OPTIONALREFERENCENO),
        //     size: 70,
        // },
        {
            accessorKey: "title",
            header: "Job Title",
            Cell: ({ row }: any) => {
                let jobTitle = (row.original.title) ? row.original.title : "";
                let displayTitle = getSlicedCell(row.original.title);

                return (
                    row?.original?.curatelyId ?
                        <Link className="hightLightTd"
                            to={`/${userLocalData.getvalue("clientName")}/job/view/${row?.original?.curatelyId}`}
                            state={{
                                data: [
                                    { text: "Search", link: `/${userLocalData.getvalue("clientName")}/Jobdiva/job` },
                                    { text: "Jobdiva", link: `/${userLocalData.getvalue("clientName")}/Jobdiva/job?id=${sessionSearchId.current}` },
                                    { text: jobTitle, link: "" }
                                ]
                            }}
                        >{displayTitle}</Link> :
                        displayTitle
                )
            },
        },
        {
            accessorKey: "company_name",
            header: "Company Name",
            Cell: ({ row }: any) => getSlicedCell(row.original.company_name),
        },
        {
            accessorKey: "dateLastModified",
            header: "Issued Date",
            Cell: ({ row }: any) => (
                FormatMillisecondsToCustomDate.formatMillisecondsToCustomDate(row.original.dateLastModified)
            ),
        },
        {
            accessorKey: "curatelyId",
            header: "Curately",
            Cell: ({ row }: any) => (
                (row?.original?.curatelyId) ? <Tooltip title="Curately" >
                    <span className="ml-4">
                        {(row.original.curatelyId) ? <CheckOutlinedIcon color="success" /> : ""}
                    </span>
                </Tooltip> : ""
            ),
            size: 80,
        },
        {
            accessorKey: "voiceAiEnabled",
            header: "Voice AI",
            size: 80,
            Cell: ({ row }: any) => (
                (row.original.curatelyId) ?
                    (
                        <>
                            {row?.original?.voiceAiEnabled ?
                                <span className="ml-4" > <CheckOutlinedIcon color="success" /> </span>
                                :
                                <Tooltip title="Click here to View Error Message"><span className="ml-4 errorMsg" style={{ cursor: 'pointer' }} onClick={() => {
                                    OpenErrorModal({ errorMessage: row?.original?.voiceAiReason, title: "VoiceAI - Error Message" })
                                }} > <ErrorOutlineOutlined color="error" />  </span></Tooltip>
                            }
                        </>
                    ) : null
            )
        }
    ], [flatData]);


    // useEffect(() => {
    //     if (searched) {
    //         getDivaJobsList()
    //     }
    // }, [searchOffSet])

    const getSearchedDivaJobsList = () => {
        setSearchValue("");

        let sEndDate = DateTime.now().plus({ days: 1 })

        if (searchJobName || searchCompanyName || (startDate && endDate && (startDate.startOf("day") <= endDate.startOf("day")))) {


            let data = {
                "maxReturned": searchOffSet,
                "offset": 0,
                "issuedatefrom": startDate ? new Date(startDate?.toFormat('yyyy-MM-dd')).toISOString() : "",
                "issuedateto": endDate ? new Date(sEndDate?.toFormat('yyyy-MM-dd')).toISOString() : "",
                "title": searchJobName || "",
                jobdivaref: searchJobReferenceNo || "",
                "companyname": searchCompanyName || ""
            }

            trackPromise(
                ApiService.postWithData('ats', `jobDiva/searchJob/${userLocalData.getvalue("clientId")}`, data).then((response: any) => {
                    let jobList = response?.data?.data || []
                    if (response?.data?.Success && !!jobList?.length) {
                        setSearched(true);
                        jobList = jobList.map((each: any) => ({
                            ...each,
                            title: each["job title"] || "",
                            id: each.id || "",
                            company_name: each.company || "",
                            dateLastModified: each["issue date"] || "",
                            OPTIONALREFERENCENO: each["optional reference"] || "",
                            JOBDIVANO: each["reference #"] || "",
                        }))
                        setDivaJobsList([...jobList]);
                        setRowCount(jobList?.length || 0);
                        saveDataToSession({ jobsList: [...jobList], isSearched: true, jobSearchValue: "" });
                    } else {
                        saveDataToSession({ jobsList: [], isSearched: true, jobSearchValue: "", totalCount: 0 });
                        setDivaJobsList([]);
                        setRowCount(0);
                        setSearched(true);
                        // showToaster((response.data.Message) ? response.data.Message : "An error occured while getting this Job Name.", 'error')
                    }

                })
            );
        }
        else if (!startDate) {
            showToaster('Enter Valid Start Date.', 'error');
        } else if (!endDate) {
            showToaster('Enter Valid End Date.', 'error');
        } else if (startDate.startOf("day") > endDate.startOf("day")) {
            showToaster('Start Date should be less than End Date.', 'error');
        }

    }

    const JobPushToCurately = (missingFields?: any) => {

        const selectedIds = Object.keys(rowSelection);
        let data = {
            "atsName": "JobDiva",
            "clientId": userLocalData.getvalue('clientId'),
            "recruiterId": userLocalData.getvalue('recrId'),
            "moduleName": "Job",
            "atsValues": selectedIds,
        }

        if (missingFields) {
            data = Object.assign({}, data, { ...data, missingFields });
        }

        trackPromise(
            ApiService.postWithData('ats', 'ats/consume', data).then((response: any) => {
                if (response.data?.Success && response.data?.Status === 200) {
                    showToaster(response.data.Message, 'success')
                    setRowSelection({});
                    setOpenMissingFields(false);
                    setPushCuratelyJobData({});
                    setIsSelectAllChecked(false);
                    if (searched) {
                        getSearchedDivaJobsList()
                    } else {
                        getDivaOpenJobsList();
                    }
                } else if (response?.data?.Error && response?.data?.Status === 400 && response?.data?.data?.missingFields && !!Object.keys(response?.data?.data?.missingFields)?.length) {
                    setOpenMissingFields(true);
                    setPushCuratelyJobData(response.data.data)
                } else {
                    showToaster((response.data.Message) ? response.data.Message : "An error occured while getting this Push to Curately.", 'error')
                }
            })
        );
    }

    useEffect(() => {
        if (searchJobName) {
            getSearchedDivaJobsList();
        }
    }, [pagination.pageIndex, pagination.pageSize])

    const handleSelectAll = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsSelectAllChecked(event.target.checked);
        if (event.target.checked) {
            let rowData: any = {};
            let tempData: any = DivaJobsList;
            for (let index = 0; index < DivaJobsList.length; index++) {
                if (["", null, undefined, false].includes(tempData[index].voiceAiEnabled)) {
                    rowData[tempData[index].id] = true;
                }
            }
            setRowSelection(rowData);
        } else {
            setRowSelection({});
        }
    }

    const handleClearSearch = () => {
        setSearchCompanyName("");
        setSearchJobName("");
        setSearchJobReferenceNo("");
        setStartDate(DateTime.now().minus({ days: 14 }));
        setEndDate(DateTime.now());
        setPagination({ ...pagination, pageIndex: 0 });
        setSearchValue("");
        setRowSelection({});
        setSearched(false);
        getDivaOpenJobsList();
        setSearchOffSet(25);
    }


    return (
        <div className="" id="DivaJobs">
            <div className="">
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    className="customCard px-4 py-2 mb-2"
                    sx={{ minHeight: "auto !important" }}
                >
                    <Stack direction="row" spacing={3}>
                        <Typography variant="h6" className="header, pt-1">
                            JobDiva - Issued Jobs List
                        </Typography>
                    </Stack>
                </Grid>

                <Grid
                    className="my-3 customCard "
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                >
                    <Stack direction="row" spacing={3} style={{ paddingRight: '22px' }}>
                        <TextField
                            fullWidth
                            label="Job Title"
                            name="Job Title"
                            id="JobTitle"
                            size="small"
                            placeholder="Search by Job Title"
                            value={searchJobName}
                            onChange={(e) => setSearchJobName(e.target.value)}
                            sx={{
                                "& .MuiInputBase-root": { width: "13rem", py: "1px" }
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Reference No"
                            name="Reference No"
                            id="ReferenceNo"
                            size="small"
                            placeholder="Search by Reference No"
                            value={searchJobReferenceNo}
                            onChange={(e) => setSearchJobReferenceNo(e.target.value)}
                            sx={{
                                "& .MuiInputBase-root": { width: "13rem", py: "1px" }
                            }}
                        />
                        {/* <Autocomplete
                            id="Company Name"
                            freeSolo
                            disableClearable
                            size="small"
                            fullWidth
                            renderInput={(params) => (
                                <TextField
                                    label="Company Name"
                                    {...params}
                                    slotProps={{
                                        input: {
                                            ...params.InputProps,
                                            endAdornment:
                                                <IconButton disabled={["", null, undefined].includes(searchCompanyName)} size="small" onClick={() => setSearchCompanyName("")}>
                                                    <CloseOutlined fontSize="small" />
                                                </IconButton>
                                        }
                                    }}
                                    placeholder="Search by Company Name"
                                />
                            )}
                            selectOnFocus
                            value={searchCompanyName}
                            clearOnBlur
                            filterOptions={(options, params) => {
                                const filtered = createFilterOptions()(options, params);
                                const { inputValue } = params;
                                const isExisting = options.some(each => each?.toLowerCase()?.includes(inputValue?.toLowerCase()));
                                if (inputValue !== "" && !isExisting) {
                                    filtered.push(inputValue)
                                }
                                return filtered;
                            }}
                            onChange={(e: any, val: any) => {
                                setSearchCompanyName(val ? val : e.target.value);
                            }}
                            options={companiesList?.length ? companiesList.map((each) => each.name) : []}
                            sx={{
                                "& .MuiInputBase-root": { width: "15rem" }
                            }}
                        /> */}

                        {/* <TextField
                            fullWidth
                            label="Company Name"
                            name="Company Name"
                            id="Company Name"
                            size="small"
                            placeholder="Search by Company Name"
                            value={searchCompanyName}
                            onChange={(e) => setSearchCompanyName(e.target.value)}
                        /> */}

                        {/* <MUIAutoComplete
                        id='compTitle'
                        handleChange={(id: any, name: string) => {
                            setSearchCompanyName(e.target.value)
                        }}
                        valuePassed={(searchCompanyName) ? { label:searchCompanyName, id: searchCompanyName } : {}}
                        isMultiple={false}
                        textToShow="Select Company"
                        width="100%"
                        type='assignCompanyToCandidate'
                        placeholder="Enter Company Name"

                    /> */}

                    </Stack>

                    <Stack direction="row" spacing={3} >
                        <LocalizationProvider dateAdapter={AdapterLuxon}>
                            <Grid
                                container
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                            >
                                <DatePicker
                                    label='Start Date'
                                    value={startDate}
                                    onChange={(newValue) => {
                                        if (newValue) {
                                            setStartDate(newValue);
                                        } else {
                                            setStartDate(DateTime.now().minus({ days: 14 }));
                                        }
                                    }}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            fullWidth: false,
                                            InputProps: {
                                                style: {
                                                    textAlign: 'center',
                                                },
                                            },
                                        },
                                    }}
                                    maxDate={endDate}
                                    sx={{
                                        "& .MuiInputBase-root": { width: "11rem" }
                                    }}
                                />
                                <Box sx={{ mx: 2 }}> to </Box>
                                <DatePicker
                                    label='End Date'
                                    value={endDate}
                                    onChange={(newValue) => {
                                        if (newValue) {
                                            setEndDate(newValue);
                                        } else {
                                            setEndDate(DateTime.now());
                                        }
                                    }}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            fullWidth: false,
                                            InputProps: {
                                                style: {
                                                    textAlign: 'center',
                                                },
                                            },
                                        },
                                    }}
                                    maxDate={DateTime.now()}
                                    sx={{
                                        "& .MuiInputBase-root": { width: "11rem" }
                                    }}
                                />
                            </Grid>
                        </LocalizationProvider>
                    </Stack>
                    <Stack direction={"row"} alignItems={"center"} spacing={3}>
                        <TextField
                            fullWidth
                            select
                            label="Max Records"
                            className="ml-4"
                            size="small" color="info" value={searchOffSet} onChange={(e: any) => {
                                setSearchOffSet(e.target.value)
                            }}
                            sx={{
                                "& .MuiInputBase-root": { width: "6rem" }
                            }}
                        >
                            {[25, 50, 100, 200, 300, 400, 500].map((each, index) => (
                                <MenuItem key={index} value={each}>{each}</MenuItem>
                            ))}
                        </TextField>
                    </Stack>
                    <Stack direction={"row"} alignItems={"center"} spacing={3}>
                        <Button
                            variant="contained"
                            color="primary"
                            className="ml-4"
                            fullWidth
                            disabled={!(searchJobName || searchCompanyName || startDate || endDate)}
                            onClick={() => {
                                setPagination({
                                    pageIndex: 0,
                                    pageSize: 25,
                                })
                                setRowSelection({});
                                setRowCount(0);
                                setSearchValue("");
                                getSearchedDivaJobsList();
                                saveDataToSession({
                                    jobsList: DivaJobsList,
                                    jobSearchValue: "",
                                    paginationData: { ...pagination, pageIndex: 0 },
                                    isSearched: searched
                                });
                            }}
                        >
                            Search
                        </Button>
                        <Button
                            variant="contained"
                            color="inherit"
                            className="ml-4"
                            sx={{ textTransform: "capitalize", p: "3px 5px" }}
                            fullWidth
                            disabled={!searched}
                            onClick={handleClearSearch}
                        >
                            Clear
                        </Button>
                    </Stack>
                </Grid>

                <div className="p-4 customCard CardView">

                    <div className="MRTableCustom pl-0 ">

                        <Grid container className="actionItems" width={"auto"}>
                            <Checkbox
                                className="select-all-checkbox"
                                disableRipple
                                color="default"
                                checked={isSelectAllChecked}
                                onChange={handleSelectAll}
                            />
                            <Button
                                variant="outlined"
                                color="secondary"
                                className='mr-2 ml-2'
                                disabled={Object.keys(rowSelection).length === 1 ? false : true}
                                onClick={() => JobPushToCurately()}
                            >
                                Push to VoiceAI
                            </Button>
                        </Grid>
                        <MaterialReactTable
                            columns={columns}
                            enableRowSelection={(row: any) => ["", null, undefined, false].includes(row?.original?.voiceAiEnabled)}
                            data={flatData}
                            enablePinning
                            muiSearchTextFieldProps={{
                                placeholder: `Search`,
                                sx: { width: '205px', right: "50px", padding: "-10px", height: "20px", marginTop: "-10px", marginRight: "-40px" },
                                value: searchValue,
                                onChange: (e: any) => {
                                    setPagination({ ...pagination, pageIndex: 0 });
                                    saveDataToSession({
                                        jobsList: DivaJobsList,
                                        jobSearchValue: e.target.value,
                                        paginationData: { ...pagination, pageIndex: 0 },
                                        isSearched: searched
                                    });
                                    setSearchValue(e.target.value)
                                },
                                InputProps: {
                                    startAdornment: <InputAdornment position="start"><SearchOutlined fontSize='small' htmlColor='#757575' /></InputAdornment>,
                                    endAdornment: <InputAdornment position="end" disablePointerEvents={searchValue ? false : true}>
                                        <CloseRounded fontSize='small' htmlColor={searchValue ? "#757575" : "#ebebeb"} sx={{ cursor: "pointer" }} onClick={() => {
                                            saveDataToSession({ jobsList: DivaJobsList, jobSearchValue: "", isSearched: searched })
                                            setSearchValue("");
                                        }} />
                                    </InputAdornment>
                                }
                            }}
                            initialState={{
                                density: 'compact',
                                showGlobalFilter: true,
                            }}
                            onColumnFiltersChange={setColumnFilters}
                            onGlobalFilterChange={setGlobalFilter}
                            // onSortingChange={setSorting}
                            enableDensityToggle={false}
                            enableFullScreenToggle={false}
                            // manualPagination
                            // manualSorting
                            // enableGlobalFilterModes
                            columnResizeMode="onChange"
                            getRowId={(row) => row.id}
                            onPaginationChange={setPagination}
                            state={{
                                pagination,
                                columnFilters,
                                globalFilter,
                                //isLoading,
                                //   showAlertBanner: isError,
                                //   showProgressBars: isFetching,
                                //sorting,
                                rowSelection,
                            }}
                            rowCount={rowCount}
                            onRowSelectionChange={setRowSelection}
                            enableStickyHeader
                            enablePagination={true}
                            muiPaginationProps={{
                                showFirstButton: false,
                                showLastButton: false,
                                SelectProps: { style: { display: "none" } },
                            }}
                            muiSelectCheckboxProps={(prop) => ({
                                onChange: (e) => {
                                    if (prop.row.id) {
                                        let tempRowSelection: any = { ...rowSelection };
                                        if (e.target.checked) {
                                            tempRowSelection[prop.row.id] = e.target.checked;
                                        } else {
                                            if (tempRowSelection.hasOwnProperty(prop.row.id)) {
                                                delete tempRowSelection[prop.row.id];
                                            }
                                        }
                                        setRowSelection(tempRowSelection);
                                        //   setRowSelection({ ...rowSelection, [prop.row.id]: e.target.checked });
                                        //   console.log(e.target.checked);
                                    }
                                }
                            })}
                            renderBottomToolbarCustomActions={() => (
                                // searched ? <Stack direction={"row"} alignItems={"center"} spacing={2} className="searched-select-container">
                                //     <Typography>{`${rowCount ? "1" : "0"} - ${rowCount} of ${rowCount}`}</Typography>
                                // </Stack> : 
                                <CustomPagination
                                    page={pagination.pageIndex}
                                    rowsPerPage={25}
                                    rowCount={rowCount}
                                    onChangePage={(page: any) => {
                                        setRowSelection({});
                                        setIsSelectAllChecked(false);
                                        saveDataToSession({
                                            jobsList: DivaJobsList,
                                            jobSearchValue: searchValue,
                                            paginationData: {
                                                ...pagination,
                                                pageIndex: page,
                                            },
                                            isSearched: searched
                                        });
                                        setPagination({
                                            ...pagination,
                                            pageIndex: page,
                                        })
                                    }
                                    }
                                />
                            )}
                            icons={{
                                ArrowDownwardIcon: (props: any) => (
                                    <SwitchLeftIcon {...props} />
                                ),
                            }}
                        />
                    </div>

                </div>
            </div>
            {openMissingFields && <MissingFields
                open={openMissingFields}
                closePopup={() => {
                    setOpenMissingFields(false);
                    setPushCuratelyJobData({});
                }}
                passedData={pushCuratelyJobData?.missingFields}
                handleUpdateToJobDiva={JobPushToCurately}
            />}
        </div>
    );
};

export default DivaJobs;
