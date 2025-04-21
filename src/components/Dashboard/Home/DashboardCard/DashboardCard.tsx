import { useState, useMemo, useEffect, SyntheticEvent, useRef, useCallback, lazy, Suspense } from "../../../../shared/modules/React";
import { Box } from '../../../../shared/modules/MaterialImports/Box';
import { MaterialReactTable, type MRT_ColumnDef } from "../../../../shared/modules/MaterialReactTable";
import ApiService from "../../../../shared/api/api";
import { DateTime } from '../../../../shared/modules/Luxon';
// import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
// import { styled } from '@mui/material/styles';
import { globalData } from "../../../../shared/services/globalData";
import './DashboardCard.scss';
import { Grid, Button } from "../../../../shared/modules/commonImports";
import { Stack } from "../../../../shared/modules/MaterialImports/Stack";
import { Tooltip } from '../../../../shared/modules/MaterialImports/ToolTip';
import { ToggleButton, ToggleButtonGroup } from "../../../../shared/modules/MaterialImports/ToggleButton";
import { Typography } from "../../../../shared/modules/MaterialImports/Typography";


// import TimelineIcon from '@mui/icons-material/Timeline';
import DonutLargeOutlinedIcon from '@mui/icons-material/DonutLargeOutlined';
import PinOutlinedIcon from '@mui/icons-material/PinOutlined';
// import SettingsIcon from '@mui/icons-material/Settings';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';

import { Tab } from '../../../../shared/modules/MaterialImports/Tabs';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { CircularProgress } from '../../../../shared/modules/MaterialImports/CircularProgress';
import { userLocalData } from "../../../../shared/services/userData";
import { debounce } from "lodash";

// import TuneIcon from '@mui/icons-material/Tune';
// import { campaigndata, linkedindata, linkedinemaildata, linkedincandidatedata, linkedinrepliesdata } from './campaigndata';
// import ApiRequests from "../../../../shared/api/api";
// import { showToaster } from '../../../shared/SnackBar/SnackBar';

// const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
//     height: 6,
//     borderRadius: 5,
//     [`&.${linearProgressClasses.colorPrimary}`]: {
//         backgroundColor: '#cfcfcf',
//         width: 'calc(100% - 30px)',
//         marginLeft: '10px'
//     },
//     [`& .${linearProgressClasses.bar}`]: {
//         borderRadius: 5,
//         backgroundColor: 'rgb(224,195,45)',
//         background: 'linear-gradient(90deg, rgba(224,195,45,1) 0%, rgba(224,195,45,1) 36%, rgba(58,114,21,1) 100%)'
//     },
// }));

import {
    Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend, CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title
} from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
const ApplicantsListView = lazy(() => import("../../Job/Find/ApplicantsListView/ApplicantsListView"));
const Home = lazy(() => import("../Home"));
import { ContinuousLoader } from "../../../shared/ContinuousLoader/ContinuousLoader";
import { Link } from "react-router-dom";
import { trackPromise } from "../../../../shared/modules/PromiseTrackter";
const ApplicantsStatus = lazy(() => import("../../Job/Find/ApplicantsStatus/applicantsStatus"));
// import { List, ListItem, ListItemText, Popover } from "@mui/material";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";

ChartJS.register(ArcElement, ChartTooltip, Legend, CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Legend);
// ChartJS.defaults.set(Legend);


interface Candidate {
    jobId: number;
    firstName?: string;
    lastName?: string;
    [key: string]: any;
}

interface JobData {
    jobId: number;
    jobTitle?: string;
    [key: string]: any;
}

const bgColorArray = [
    'rgb(0, 115, 176, 1)',
    'rgb(178, 229, 34, 1)',
    'rgb(215, 0, 96, 1)',
    'rgb(175, 32, 165, 1)',
    'rgb(241, 141, 5, 1)',
    'rgb(21, 105, 199, 1)',
    'rgb(50, 116, 44, 1)',
    'rgb(194, 73, 7, 1)',
    'rgb(22, 141, 175, 1)',
    'rgb(128, 0, 0, 1)',
];

const borderColorArray = [
    'rgb(0, 115, 176, 1)',
    'rgb(178, 229, 34, 1)',
    'rgb(215, 0, 96, 1)',
    'rgb(175, 32, 165, 1)',
    'rgb(241, 141, 5, 1)',
    'rgb(21, 105, 199, 1)',
    'rgb(50, 116, 44, 1)',
    'rgb(194, 73, 7, 1)',
    'rgb(22, 141, 175, 1)',
    'rgb(128, 0, 0, 1)',
]

const DashboardCard = () => {

    const isCRMEnabled = !userLocalData.adminSettings(30003);
    const [applicantsData, setApplicantsData] = useState<any>([]);
    const [jobData, setJobData] = useState<any>([]);
    // const [rowSelection, setRowSelection] = useState({});
    const [jobsLoading, setJobsLoading] = useState(false);
    const [doughLoading, setDoughLoading] = useState(false);
    const [showDough, setShowDough] = useState(false);
    const [doughList, setDoughList] = useState([]);
    const [lineLoading, setLineLoading] = useState(false);
    // const [lineList, setLineList] = useState([]);
    const [applicantsLoading, setApplicantsLoading] = useState(false);
    const jobApplicantDetails = useRef({ jobId: "", appCount: 0 });
    const [isApplicantsJobSelected, setIsApplicantsJobSelected] = useState(false)
    // const [pagination, setPagination] = useState({
    //     pageIndex: 0,
    //     pageSize: 10, //customize the default page size
    // });

    const [lineParams, setLineParams] = useState({
        type: "tm",
        startDate: "",
        endDate: ""
    })
    const [applicantsStatusList, setApplicantsStatusList] = useState([]);
    const [openApplicantsStatus, setOpenApplicantsStatus] = useState(false);
    const [statusData, setStatusData] = useState<{ type: string, jobId: string | number, jobTitle: string }>({ type: "", jobId: "", jobTitle: "" });


    const openJobView = (id: string) => {
        window.open(globalData.getWindowLocation() + "job/view/" + id);
    }

    const openCandidateView = (id: string, jobId: string) => {
        window.open(globalData.getWindowLocation() + "candidate/view/" + id.trim() + "/" + jobId);
    }

    const handleStatusClick = (type: string, count: number, jobId: string | number, jobTitle: string) => {
        if (![0, "0", null, undefined, ""].includes(count)) {
            const statusObj: { [key: string]: number } = { Submissions: 100, Shortlists: 200, Interviews: 300, Offers: 400, Starts: 500 };
            setStatusData({ type, jobId, jobTitle });
            trackPromise(
                ApiService.getCall("admin", `/getJobSubmissionShortlist/${jobId}/${userLocalData.getvalue("clientId")}/${statusObj[type]}`).then((res: any) => {
                    if (res?.data?.Success) {
                        setApplicantsStatusList(res?.data?.List || []);
                        setOpenApplicantsStatus(true);
                    }
                })
            )
        }
    }

    const jobColumns: MRT_ColumnDef<any>[] = useMemo(
        () => [
            {
                accessorKey: "jobTitle",
                header: "Job",
                size: 100,
                Cell: ({ row }) => {
                    let jobTitle = (row.original.jobTitle) ? row.original.jobTitle.toLowerCase() : "";
                    let displayTitle = jobTitle.length > 30 ? jobTitle.slice(0, 30) + "..." : jobTitle;
                    return (
                        <Tooltip title={jobTitle} classes={{ tooltip: 'tt-capital' }}>
                            <Link
                                className="hightLightTd ellipsisText"
                                to={`../job/view/${row.original.jobId}`} state={{
                                    data: [{
                                        text: "Home",
                                        link: `../../home`
                                    },
                                    {
                                        text: "Jobs",
                                        // link: `../../home`
                                        link: ""
                                    },
                                    {
                                        text: jobTitle,
                                        link: ``
                                    }]
                                }}

                            >
                                {displayTitle}
                            </Link>
                        </Tooltip>
                    );
                },
            },
            // {
            //     accessorKey: "jobTitle", //simple recommended way to define a column
            //     header: "Job",
            //     size: 100,
            //     Cell: ({ row }) => (
            //         <span className="hightLightTd" onClick={() => openJobView(row.original.jobId)}>{row.original.jobTitle.toLowerCase()}</span>
            //     ),
            // },
            {
                accessorKey: "appCount",
                accessorFn: (row) => `${row.appCount} ${row.newCount}`,
                header: "Applicants",
                Cell: ({ row }) => (
                    <span><span
                        className="hightLightTd"
                        onClick={() => {
                            jobApplicantDetails.current = { jobId: row.original.jobId, appCount: row.original.appCount };
                            setIsApplicantsJobSelected(true);
                        }}
                    >
                        {row.original.appCount}
                    </span> ({row.original.newCount} New)</span>
                ),
            },
            {
                accessorKey: "subsCount",
                header: "Status",
                accessorFn: (row) => `${row.subsCount} ${row.shortlistCount} ${row.interviewCount} ${row.offerCount} ${row.startsCount}`,
                Cell: ({ row }) => (
                    <Stack direction="row" alignItems="center" className="statusRow">
                        <Tooltip title="Submissions">
                            <span className={`${![0, "0", null, undefined, ""].includes(row.original.subsCount) ? "cursor-pointer" : ""}`}
                                onClick={() => handleStatusClick("Submissions", row.original.subsCount, row.original.jobId, row.original.jobTitle)}>
                                {row.original.subsCount === "" ? 0 : <span className="highlightCount">{row.original.subsCount}</span>}
                            </span>
                        </Tooltip>
                        <Tooltip title="Shortlists">
                            <span className={`${![0, "0", null, undefined, ""].includes(row.original.shortlistCount) ? "cursor-pointer" : ""}`}
                                onClick={() => handleStatusClick("Shortlists", row.original.shortlistCount, row.original.jobId, row.original.jobTitle)}>
                                {row.original.shortlistCount === "" ? 0 : <span className="highlightCount">{row.original.shortlistCount}</span>}
                            </span>
                        </Tooltip>
                        <Tooltip title="Interviews">
                            <span className={`${![0, "0", null, undefined, ""].includes(row.original.interviewCount) ? "cursor-pointer" : ""}`}
                                onClick={() => handleStatusClick("Interviews", row.original.interviewCount, row.original.jobId, row.original.jobTitle)}>
                                {row.original.interviewCount === "" ? 0 : <span className="highlightCount">{row.original.interviewCount}</span>}
                            </span>
                        </Tooltip>
                        <Tooltip title="Offers">
                            <span className={`${![0, "0", null, undefined, ""].includes(row.original.offerCount) ? "cursor-pointer" : ""}`}
                                onClick={() => handleStatusClick("Offers", row.original.offerCount, row.original.jobId, row.original.jobTitle)}>
                                {row.original.offerCount === "" ? 0 : <span className="highlightCount">{row.original.offerCount}</span>}
                            </span>
                        </Tooltip>
                        <Tooltip title="Starts">
                            <span className={`${![0, "0", null, undefined, ""].includes(row.original.startsCount) ? "cursor-pointer" : ""}`}
                                onClick={() => handleStatusClick("Starts", row.original.startsCount, row.original.jobId, row.original.jobTitle)}>
                                {row.original.startsCount === "" ? 0 : <span className="highlightCount">{row.original.startsCount}</span>}
                            </span>
                        </Tooltip>
                    </Stack>
                ),
                size: 80,
            },
            {
                accessorKey: "daysBack",
                header: "Days Opened",
                Cell: ({ row }) => (
                    <span>
                        {(!row.original.daysBack) || (Number(row.original.daysBack) === 0) ? 'Today' : ""}
                        {Number(row.original.daysBack) === 1 && 'Yesterday'}
                        {Number(row.original.daysBack) > 1 && row.original.daysBack + ' Days'}
                    </span>
                ),
                size: 80
            },
        ],

        []
    );

    const apllicantsColumns: MRT_ColumnDef<any>[] = useMemo(
        () => [
            {
                accessorKey: "name", //simple recommended way to define a column
                header: "Candidate",
                enableColumnPinning: true,
                accessorFn: (row) => `${row.firstName} ${row.lastName}`,
                Cell: ({ row }) => (
                    <Link to={`../candidate/view/${row.original.candId}/${row.original.jobId}`} className="hightLightTd" state={{
                        data: [{
                            text: "Home",
                            link: `../../home`
                        }, {
                            text: "Applicants",
                            link: ``
                            // link: `../../home`
                        },
                        {
                            text: `${row.original.firstName.toLowerCase() + " " + row.original.lastName.toLowerCase()}`,
                            link: ``
                        }]
                    }} >
                        {row.original.firstName.toLowerCase() + " " + row.original.lastName.toLowerCase()}
                    </Link>
                ),
                size: 100
            },

            {
                accessorKey: "jobTitle",
                header: "Job",
                Cell: ({ row }) => {
                    let jobTitle = (row.original.jobTitle) ? row.original.jobTitle.toLowerCase() : "";
                    let displayTitle = jobTitle.length > 30 ? jobTitle.slice(0, 30) + "..." : jobTitle;

                    return (
                        <Tooltip title={jobTitle} classes={{ tooltip: 'tt-capital' }}>
                            <Link
                                className="hightLightTd"
                                to={`../job/view/${row.original.jobId}`} state={{
                                    data: [{
                                        text: "Home",
                                        link: `../../home`
                                    },
                                    {
                                        text: "Jobs",
                                        // link: `../../home`
                                        link: ""
                                    },
                                    {
                                        text: jobTitle,
                                        link: ``
                                    }]
                                }}
                            >
                                {displayTitle}
                            </Link>
                        </Tooltip>

                    );
                },
            },
            // {
            //     accessorKey: "jobTitle",
            //     header: "Job",
            //     Cell: ({ row }) => (
            //         <span className="hightLightTd" onClick={() => openJobView(row.original.jobId)}>{row.original.jobTitle.toLowerCase()}</span>
            //     ),
            // },
            {
                accessorKey: "score",
                header: "Match Score",
                Cell: ({ row }) => (
                    // <Stack direction="row" alignItems="center">
                    //     <span style={{ fontSize: 13 }}>{Number(row.original.matchStatus)}%</span>
                    //     <BorderLinearProgress variant="determinate" value={Number(row.original.matchStatus)} />
                    // </Stack>
                    (row.original.hasOwnProperty('score') ? <Box sx={{ position: 'relative', display: 'inline-flex' }} className='ml-4'>
                        <CircularProgress
                            variant="determinate"
                            value={Math.round(row.original.score)}
                            sx={{
                                width: '35px !important',
                                height: '35px !important'
                            }}
                        />
                        <Box
                            sx={{
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                position: 'absolute',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography
                                variant="caption"
                                component="div"
                                color="text.secondary"
                            >{`${Math.round(row.original.score)}%`}</Typography>
                        </Box>
                    </Box> : null)
                ),
                size: 80,
            },
            {
                accessorKey: "statusName",
                header: "Status",
                size: 80,
            },
            {
                accessorKey: "date",
                header: "Date",
                Cell: ({ row }) => (
                    <span>
                        {DateTime.fromFormat(row.original.date, 'yyyy-MM-dd').toFormat('MM/dd/yyyy')}
                    </span>
                ),
                size: 80
            },
        ],

        []
    );

    function transformNamesToLowerCase(dataArray: Candidate[]): Candidate[] {
        return dataArray.map(item => ({
            ...item,
            firstName: item.firstName ? item.firstName.toLowerCase() : "",
            lastName: item.lastName ? item.lastName.toLowerCase() : ""
        }));
    }

    const getApplicantsCandidate = useCallback(debounce(() => {
        setApplicantsLoading(true);
        // saveAuditLog(3841);
        ApiService.postWithData('admin', 'curatelyApplicantsList', { next: 0, pageSize: 5, sortBy: 'score', orderBy: 'desc', status: "", recrId: (selectedJobTabRef.current === "my") ? userLocalData.getvalue('recrId') : "", clientId: userLocalData.getvalue('clientId') }).then(
            (result: any) => {
                if (result.data.Message === "Success") {
                    const updatedData = transformNamesToLowerCase(result.data.data);
                    setApplicantsData(updatedData);
                    setApplicantsLoading(false);

                }

            }
        )
    }, 600),
        []
    );
    // https://qaadminapi.curately.ai/curatelyAdmin/getJobsApplicantsDashboard

    function transformJobToLowerCase(dataArray: JobData[]): JobData[] {
        return dataArray.map(item => ({
            ...item,
            jobTitle: item.jobTitle ? item.jobTitle.toLowerCase() : "" // Prevents errors if undefined
        }));
    }

    const getApplicantJobs = useCallback(debounce(() => {
        setJobsLoading(true);
        ApiService.postWithData('admin', 'getJobsApplicantsDashboard', {
            clientId: userLocalData.getvalue('clientId'), next: 0, pageSize: 5, status: "",
        }).then(
            (result: any) => {
                let jobDetails = transformJobToLowerCase(result.data.Applicants)
                setJobData(jobDetails);
                setJobsLoading(false);
            }
        )
    }, 600),
        []
    );

    const getPieData = useCallback(debounce(() => {
        setDoughLoading(false);
        // https://app.curately.ai/Accuick_API/Curately/Dashboard/applicants_piechart.jsp?clientId=2

        // http://35.155.202.216:8095/curatelyAdmin/applicantsPieChart
        ApiService.postWithData('admin', 'applicantsPieChart', { clientId: userLocalData.getvalue('clientId') }).then(
            (response: any) => {
                // console.log(response.data.data);
                if (response.data.Message === "Success") {
                    for (let si = 0; si < response.data.data.length; si++) {
                        response.data.data[si].count = Number(response.data.data[si].count);
                    }
                    const totalSourceCount = response.data.data.reduce((acc: number, curr: { count: number, source: string }) => acc + curr.count, 0);
                    let calculatedData = response.data.data.map((item: { count: number, source: string, percentage: number }, i: number) => {
                        let tempI = i;
                        if (i > 9) {
                            tempI = i % 10;
                        }
                        return { ...item, percentage: ((item.count / totalSourceCount) * 100).toFixed(2), bgColor: bgColorArray[tempI], borderColor: borderColorArray[tempI] };
                    });
                    setDoughList(calculatedData);

                    setDoughData({
                        labels: calculatedData.map((item: { count: number, source: string, percentage: number }) => {
                            return item.source;
                        }),
                        datasets: [
                            {
                                label: '',
                                data: calculatedData.map((item: { count: number, source: string, percentage: number, bgColor: string, borderColor: string }) => {
                                    return item.count;
                                }),
                                backgroundColor: calculatedData.map((item: { count: number, source: string, percentage: number, bgColor: string, borderColor: string }) => {
                                    return item.bgColor;
                                }),
                                borderColor: calculatedData.map((item: { count: number, source: string, percentage: number, bgColor: string, borderColor: string }) => {
                                    return item.borderColor;
                                }),
                                borderWidth: 1,
                            }
                        ]
                    })
                }
                setDoughLoading(true);
            }
        )
    }, 600),
        []
    );

    useEffect(() => {
        getApplicantsCandidate();
        getApplicantJobs();
        getPieData();

        getLineData(lineParams.type);

        // https://app.curately.ai/Accuick_API/Curately/Dashboard/applicants_linechart.jsp?clientId=2

        // http://35.155.202.216:8095/curatelyAdmin/applicantsLineChart

    }, []);
    useEffect(() => {
        saveAuditLog(3836);
    }, [])

    const saveAuditLog = (id: number) => {
        ApiService.saveAuditLog(id);
    }
    // const saveAuditLog = (id: number) => {
    //     ApiService.saveAuditLog(3836).then((response) => {
    //         console.log(response.data);
    //     });
    // }


    const getLineData = useCallback(debounce((type: string) => {
        setLineLoading(false);
        let dataToPass = getDates(type);
        ApiService.postWithData('admin', 'applicantsLineChart', dataToPass).then(
            (response: any) => {
                if (response.data.Message === "Success") {
                    let calculatedData = response.data.data;
                    for (let si = 0; si < calculatedData.length; si++) {
                        calculatedData[si].count = Number(calculatedData[si].count);
                        if (calculatedData[si].month && calculatedData[si].year) {
                            calculatedData[si].date = DateTime.fromFormat(calculatedData[si].month + " " + calculatedData[si].year, 'M yyyy').toFormat('LLL yyyy')
                        }
                    }
                    // setLineList(calculatedData);

                    setLineData({
                        labels: calculatedData.map((item: { count: number, date: string }) => {
                            return item.date
                        }),
                        datasets: [
                            {
                                label: '',
                                data: calculatedData.map((item: { count: number, date: string }) => {
                                    return item.count;
                                }),
                                backgroundColor: 'rgb(255, 99, 132)',
                                borderColor: 'rgba(255, 99, 132, 0.5)',
                                // borderWidth: 1,
                            }
                        ]
                    })
                }
                setLineLoading(true);
            }
        )
    }, 600),
        []
    );

    const getDates = (key: string) => {
        // console.log(key);
        let dates = {
            date1: '',
            date2: DateTime.now().toFormat('yyyy-MM-dd'),
            type: 'date',
            clientId: userLocalData.getvalue('clientId'),
        };
        switch (key) {
            // case 'today':
            //     dates.date1 = DateTime.now().toFormat('MM-dd-yyyy');
            //     break;
            // case 'yesterday':
            //     dates.date1 = DateTime.now().plus({ day: -1 }).toFormat('MM-dd-yyyy');
            //     dates.date2 = DateTime.now().plus({ day: -1 }).toFormat('MM-dd-yyyy');
            //     break;
            case 'tw':
                dates.date1 = DateTime.now().startOf('week').toFormat('yyyy-MM-dd');
                break;
            // case 'nextWeek':
            //     dates.date1 = DateTime.now().plus({ weeks: 1 }).startOf('week').toFormat('yyyy-MM-dd');
            //     dates.date2 = DateTime.now().plus({ weeks: 1 }).endOf('week').plus({ days: -2 }).toFormat('yyyy-MM-dd');
            //     break;
            case 'lw':
                dates.date1 = DateTime.now().plus({ weeks: -1 }).startOf('week').toFormat('yyyy-MM-dd');
                dates.date2 = DateTime.now().plus({ weeks: -1 }).endOf('week').plus({ days: -2 }).toFormat('yyyy-MM-dd');
                break;
            case 'tm':
                dates.date1 = DateTime.fromObject({ year: DateTime.now().toObject().year, month: DateTime.now().toObject().month, day: 1 }).toFormat('yyyy-MM-dd');
                // dates.type = 'month';
                break;
            case '90':
                dates.date1 = DateTime.now().plus({ months: -3 }).startOf('week').toFormat('yyyy-MM-dd');
                dates.type = 'month';
                break;
            case '180':
                dates.date1 = DateTime.now().plus({ months: -6 }).startOf('week').toFormat('yyyy-MM-dd');
                dates.type = 'month';
                break;
            case '270':
                dates.date1 = DateTime.now().plus({ months: -9 }).startOf('week').toFormat('yyyy-MM-dd');
                dates.type = 'month';
                break;
            case '365':
                dates.date1 = DateTime.now().plus({ months: -12 }).startOf('week').toFormat('yyyy-MM-dd');
                dates.type = 'month';
                break;
            // case 'quarter':
            //     dates.date1 = DateTime.fromFormat('' + Math.floor((new Date().getMonth() + 3) / 3), 'q').toFormat('yyyy-MM-dd');
            //     dates.type = 'month'
            //     break;
            // case 'year':
            //     dates.date1 = DateTime.fromObject({ year: DateTime.now().toObject().year, month: 1, day: 1 }).toFormat('yyyy-MM-dd');
            //     dates.type = 'month';
            //     break;
            // case 'customRange':
            //     dates.date1 = lineParams.startDate;
            //     dates.date2 = lineParams.endDate;
            //     break;
            default:
                break;
        }
        // console.log(dates);
        return dates;
    }
    // var colors = [];
    // for (let rn = 0; rn < recruiterNamesList.length; rn++) {
    //     let tempRn = rn;
    //     if (rn > 21) {
    //         tempRn = rn % 22;
    //     }
    //     if (!recruiterNamesColor[recruiterNamesList[rn]]) {
    //         recruiterNamesColor[recruiterNamesList[rn]] = colorArray[tempRn];
    //     }
    // }
    // var colorArray = [ '#ef5b5b', '#5838ff', '#26be77', '#fda341', '#7f7f7f', '#3e566d', '#f48665', '#2f80ed', '#FF6633', '#FF33FF', '#E6B333', '#3366E6', '#999966', '#99FF99', '#E6331A', '#00B3E6', '#B34D4D', '#80B300', '#6680B3', '#FF1A66', '#B33300', '#1AFF33' ];

    // const colorArray = ['--curatelyRed', '--curatelyDarkBlue', '--curatelyGreen', '--curatelyOrange', '--curatelyDarkGrey']


    const [doughData, setDoughData] = useState<any>({
        labels: [], // 'Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'
        datasets: [
            {
                label: '', // # of Votes
                data: [12], // 12, 19, 3, 5, 2, 3
                backgroundColor: [''], // 'rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 206, 86)'
                borderColor: [''], // 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'
                borderWidth: 0.5
            },
        ],
    });

    const [lineData, setLineData] = useState<any>({
        labels: [''], // 'January', 'February', 'March', 'April', 'May', 'June', 'July'
        datasets: [
            {
                label: '',
                data: [], // 460, 200, 300, 180, 400, 500, 230
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    });


    const graphMonths = [
        {
            value: "tw",
            text: "TW",
            toolTip: "This Week",
            months: 0
        },
        {
            value: "lw",
            text: "LW",
            toolTip: "Last Week",
            months: 3
        },
        {
            value: "tm",
            text: "TM",
            toolTip: "This Month",
            months: 1
        },
        {
            value: "90",
            text: "3 mo",
            toolTip: "3 Months",
            months: 3
        },
        {
            value: "180",
            text: "6 mo",
            toolTip: "6 Months",
            months: 6
        },
        {
            value: "270",
            text: "9 mo",
            toolTip: "9 Months",
            months: 9
        },
        {
            value: "365",
            text: "12 mo",
            toolTip: "12 Months",
            months: 12
        }
    ];
    const [selectedTab, setSelectedTab] = useState('Focused');
    const [selectedJobTab, setSelectedJobTab] = useState('all');
    const selectedJobTabRef = useRef('all');

    const tabOnChange = (_: SyntheticEvent, newValue: string) => {
        setSelectedTab(newValue);
    };

    const applicantsTabChange = (_: SyntheticEvent, newValue: string) => {
        setSelectedJobTab(newValue);
        selectedJobTabRef.current = newValue;
        getApplicantsCandidate();
    };

    const recrId = (selectedJobTabRef.current === "my") ? userLocalData.getvalue('recrId') : "";
    // if (recrId) {
    //     console.log("Recruiter ID:", recrId);
    // }






    return (
        <div id="dashboardCard">
            <div className="d-none">
                <iframe src={`https://resume.accuick.com/Accuick3_3/Candidate/sessionLog.jsp?Username=${userLocalData.getvalue('userName')}&userid=${userLocalData.getvalue('recrId')}`} style={{ display: "none !important" }} id="iframe171" title='iframe171'></iframe>
            </div>
            {isCRMEnabled ?
                <TabContext value={selectedTab}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={tabOnChange} aria-label="lab API tabs example">
                            <Tab label="Focused" value="Focused" />
                            {
                                !userLocalData.isChromeExtensionEnabled() &&
                                <Tab label="Overview" value="Overview" />
                            }
                            {/* <Tab label="Overview" value="Overview" /> */}
                        </TabList>
                    </Box>
                    <TabPanel className="px-0" value="Focused">

                        <>

                            <Grid
                                container direction="row" justifyContent="start" alignItems="start"
                            >
                                <Grid className="pl-5 mr-4">

                                    <Box className="customCard mt-4 cardW850" >
                                        <MaterialReactTable
                                            columns={jobColumns}
                                            data={jobData}//connect internal row selection state to your own
                                            state={{ isLoading: jobsLoading }} //pass our managed row selection state to the table to use
                                            initialState={{ columnPinning: { left: ['mrt-row-select', 'name'] }, density: 'compact' }}
                                            enableDensityToggle={false}
                                            enableFullScreenToggle={false}
                                            columnResizeMode="onChange"
                                            enableGlobalFilterModes={false}
                                            enableGlobalFilter={false}
                                            enableColumnActions={false}
                                            enableColumnFilters={false}
                                            enableTopToolbar={true}
                                            enableBottomToolbar={false}
                                            renderTopToolbar={
                                                <Grid container direction="row" justifyContent="end" alignItems="center" >
                                                    <CachedOutlinedIcon className="cursor-pointer " onClick={() => { saveAuditLog(3837); getApplicantJobs() }} />
                                                </Grid>
                                            }
                                        />
                                        <div className="text-right">
                                            <Button
                                                href={`#/${userLocalData.getvalue('clientName')}/job/find`}
                                                color="primary"
                                                sx={{ ml: 'auto', mt: 2, maxWidth: '100px !important' }}
                                            >
                                                Show More
                                            </Button>
                                        </div>
                                    </Box>
                                </Grid>
                                <Grid sx={{ maxWidth: '240px' }} className="mr-4" >
                                    <Box className="customCard mt-4 " sx={{ width: '500px !important', height: '350px', position: 'relative' }}>
                                        <Grid container direction="row" justifyContent="space-between" alignItems="start" >
                                            <Typography variant="h5" className="mb-2">Sources</Typography>
                                            <Grid>
                                                <CachedOutlinedIcon className="cursor-pointer mr-2" onClick={() => { saveAuditLog(3838); getPieData() }} />
                                                {
                                                    showDough ?
                                                        <PinOutlinedIcon className="cursor-pointer" onClick={() => { setShowDough(false) }} />
                                                        :
                                                        <DonutLargeOutlinedIcon className="cursor-pointer" onClick={() => { saveAuditLog(3839); setShowDough(true) }} />
                                                }
                                                {/* <SettingsIcon className="ml-2 cursor-pointer" /> */}
                                            </Grid>
                                        </Grid>
                                        {
                                            doughLoading ?
                                                <div>
                                                    {
                                                        showDough ?
                                                            <Grid container direction="row" justifyContent="center" alignItems="center" >
                                                                <div style={{ maxWidth: '260px' }}>
                                                                    <Doughnut data={doughData} options={{
                                                                        plugins: {
                                                                            legend: {
                                                                                display: !1
                                                                            },
                                                                            title: {
                                                                                display: !1
                                                                            }
                                                                        },
                                                                        // cutout: "70%",
                                                                        maintainAspectRatio: !0
                                                                    }}
                                                                    />
                                                                </div>
                                                            </Grid>
                                                            :

                                                            <div className="ml-3" style={{ height: "285px", overflow: "auto" }}>
                                                                <div style={{ width: '250px' }}>
                                                                    {
                                                                        doughList.map((item: { count: number, source: string, percentage: number, bgColor: string, borderColor: string }) => (
                                                                            <Grid container direction="row" justifyContent="space-between" alignItems="center" className="doughList" key={item.source} >
                                                                                <div>
                                                                                    <span className="doughDot" style={{ border: `4px solid ${item.borderColor}` }}></span>
                                                                                    <span className="doughLabel fw-6">{item.source}</span>
                                                                                </div>
                                                                                <span className="fw-6">{item.percentage} % </span>
                                                                            </Grid>
                                                                        ))
                                                                    }
                                                                </div>
                                                            </div>
                                                    }


                                                </div>
                                                :
                                                <ContinuousLoader />
                                        }
                                    </Box>
                                </Grid>

                            </Grid>
                            <Grid container direction="row" justifyContent="start" alignItems="start" >
                                <Grid className="pl-5 mr-4">

                                    <Box className="customCard mt-4 applicants cardW850 applicantsJobsCard pt-1">
                                        <TabContext value={selectedJobTab}>
                                            <Grid container direction="row" justifyContent="space-between" alignItems="center" className="pb-2">
                                                <TabList onChange={applicantsTabChange} aria-label="lab API tabs example">
                                                    <Tab label="All Jobs" value="all" />
                                                    {/* <Tab label="Overview" value="Overview" /> */}
                                                    <Tab label="My Jobs" value="my" />
                                                </TabList>
                                                <CachedOutlinedIcon className="cursor-pointer "
                                                    // onClick={getApplicantsCandidate}
                                                    onClick={() => {
                                                        if (selectedJobTabRef.current === 'all') {
                                                            saveAuditLog(3840);
                                                        } else if (selectedJobTabRef.current === 'my') {
                                                            saveAuditLog(3841);
                                                        }
                                                        getApplicantsCandidate();
                                                    }} />
                                            </Grid>
                                            <MaterialReactTable
                                                columns={apllicantsColumns}
                                                data={applicantsData}
                                                enableDensityToggle={false}
                                                enableFullScreenToggle={false}
                                                columnResizeMode="onChange"
                                                enableGlobalFilterModes={false}
                                                enableGlobalFilter={false}
                                                enableColumnActions={false}
                                                enableColumnFilters={false}
                                                enableTopToolbar={false}
                                                enableBottomToolbar={false}
                                                initialState={{ density: 'compact' }}
                                                state={{ isLoading: applicantsLoading }}
                                            // renderTopToolbar={ }
                                            />
                                            <div className="text-right">
                                                <Button
                                                    // href={`#/${userLocalData.getvalue('clientName')}/resume/applicants${recrId ? `?recrId=${recrId}` : ''}`}
                                                    href={`#/${userLocalData.getvalue('clientName')}/resume/applicants/${recrId ? `${recrId}` : ''}`}
                                                    color="primary"
                                                    sx={{ ml: 'auto', mt: 2, maxWidth: '100px !important' }}
                                                >
                                                    Show More
                                                </Button>
                                            </div>
                                        </TabContext>
                                    </Box>


                                </Grid>

                                <Box className="customCard mt-4 " sx={{ maxWidth: '500px', height: '380px', position: 'relative' }}>
                                    <Grid container direction="row" justifyContent="space-between" alignItems="center" >
                                        <Typography variant="h5" className="mb-2">Applicants</Typography>
                                        <CachedOutlinedIcon className="cursor-pointer " onClick={() => { saveAuditLog(3843); getLineData(lineParams.type) }} />
                                    </Grid>
                                    <Grid container direction="row" justifyContent="start" alignItems="start" className="pb-3" >
                                        <Grid size={12} className='pr-2 text-right'>
                                            <ToggleButtonGroup size="small" color="primary" className='toggleButtons' value={lineParams.type}>
                                                {
                                                    graphMonths.map((el) =>
                                                        <Tooltip key={el.value} title={el.toolTip}><ToggleButton className={(lineParams.type === el.value) ? 'graphButtonActive' : ''} value={el.value} onClick={(_, val) => {
                                                            setLineParams({
                                                                ...lineParams,
                                                                type: val
                                                            })
                                                            getLineData(val);
                                                        }}>{el.text}</ToggleButton></Tooltip>)
                                                }
                                            </ToggleButtonGroup>
                                            {/* <TextField fullWidth
                                        // label={'State or Prov :'}
                                        id="type"
                                        name='type'
                                        size="small"
                                        variant="outlined"
                                        select
                                        value={lineParams.type}
                                        onChange={(e) => {
                                            setLineParams({
                                                ...lineParams,
                                                type: e.target.value
                                            })
                                            getLineData(e.target.value);
                                        }}
                                    >
                                        <MenuItem value="thisWeek">This week</MenuItem>
                                        <MenuItem value="lastWeek">Last Week</MenuItem>
                                        <MenuItem value="month">This Month</MenuItem>
                                        <MenuItem value="quarter">This Quarter</MenuItem>
                                        <MenuItem value="year">This Year</MenuItem>
                                        <MenuItem value="customRange">Date Range</MenuItem>
                                    </TextField>
                                </Grid>
                                {
                                    lineParams.type === "customRange" ?
                                        <>
                                            <Grid size={4} className='pr-2'>

                                                <LocalizationProvider dateAdapter={AdapterLuxon} >
                                                    <DatePicker
                                                        label="Start Date"
                                                        slotProps={{ textField: { size: 'small' } }}
                                                        sx={{ width: '100%' }}
                                                        onChange={(date: any) => setLineParams({
                                                            ...lineParams,
                                                            startDate: (date) ? date?.toFormat('MM/dd/yyyy') : null
                                                        })}
                                                        value={(lineParams.startDate) ? DateTime.fromFormat(lineParams.startDate, 'MM/dd/yyyy') : null}
                                                    />
                                                </LocalizationProvider>
                                            </Grid>

                                            <Grid size={4} className='pr-2'>
                                                <LocalizationProvider dateAdapter={AdapterLuxon} >
                                                    <DatePicker
                                                        label="End Date"
                                                        slotProps={{ textField: { size: 'small' } }}
                                                        sx={{ width: '100%' }}
                                                        onChange={(date: any) => setLineParams({
                                                            ...lineParams,
                                                            endDate: (date) ? date?.toFormat('MM/dd/yyyy') : null
                                                        })}
                                                        value={(lineParams.endDate) ? DateTime.fromFormat(lineParams.endDate, 'MM/dd/yyyy') : null}
                                                    />
                                                </LocalizationProvider>
                                            </Grid>
                                        </>
                                        : null
                                } */}
                                        </Grid>
                                    </Grid>
                                    {
                                        lineLoading ?
                                            <div>
                                                <Line data={lineData} options={{
                                                    plugins: {
                                                        legend: {
                                                            display: !1
                                                        },
                                                        title: {
                                                            display: !1
                                                        }
                                                    }, scales: {
                                                        y: {
                                                            beginAtZero: !0,
                                                            min: 0,
                                                            // max: o < 10 ? 10 : o
                                                        }
                                                    }
                                                }} />
                                            </div>
                                            :
                                            <ContinuousLoader />
                                    }
                                    {
                                        isApplicantsJobSelected ?
                                            <Suspense fallback={<CircularProgress className="centered" />}>
                                                <ApplicantsListView
                                                    open={isApplicantsJobSelected}
                                                    closePopup={() => {
                                                        jobApplicantDetails.current = { jobId: "", appCount: 0 }
                                                        setIsApplicantsJobSelected(false);
                                                    }}
                                                    jobId={jobApplicantDetails.current.jobId}
                                                    appCount={jobApplicantDetails.current.appCount}
                                                />
                                            </Suspense>
                                            :
                                            null
                                    }
                                </Box>
                            </Grid>
                        </>
                        {openApplicantsStatus ?
                            <Suspense fallback={<CircularProgress className="centered" />}>
                                <ApplicantsStatus
                                    open={openApplicantsStatus}
                                    closePopup={() => {
                                        setApplicantsStatusList([]);
                                        setStatusData({ type: "", jobId: "", jobTitle: "" });
                                        setOpenApplicantsStatus(false);
                                    }}
                                    applicantsStatusList={applicantsStatusList}
                                    statusData={statusData} />
                            </Suspense>
                            : null}
                    </TabPanel>

                    {
                        !userLocalData.isChromeExtensionEnabled() && <>
                            {
                                userLocalData.getvalue('clientId') === 2 ?
                                    <TabPanel className="px-0" value="Overview">
                                        <iframe src={`https://app.curately.ai/Accuick/Home_new_cards_for_react.html?userId=${userLocalData.getvalue('recrId')}`} id="reactCards" title='React Cards'></iframe>
                                    </TabPanel>
                                    :
                                    <TabPanel className="px-0 table_panel" value="Overview">
                                        <Suspense fallback={<CircularProgress className="centered" />}>
                                            <Home />
                                        </Suspense>
                                    </TabPanel>
                            }
                        </>
                    }
                </TabContext >
                :
                null
            }

        </div >
    )
}

export default DashboardCard;