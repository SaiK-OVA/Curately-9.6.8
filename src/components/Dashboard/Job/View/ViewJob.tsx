
import { useState, useEffect, useRef, lazy, Suspense } from '../../../../shared/modules/React';
import { CircularProgress } from '../../../../shared/modules/MaterialImports/CircularProgress';
import { trackPromise } from '../../../../shared/modules/PromiseTrackter';
import { DateTime, DateTimeMaybeValid } from '../../../../shared/modules/Luxon';

import { useParams } from 'react-router-dom';
import QRCode from 'react-qr-code';


import ApiService from "../../../../shared/api/api"
import updateDocumentTitle from '../../../../shared/services/title';
import { userLocalData } from '../../../../shared/services/userData';
import { globalData } from '../../../../shared/services/globalData';
import { showToaster } from '../../../shared/SnackBar/SnackBar';



import { Grid } from '../../../../shared/modules/MaterialImports/Grid';
import { Card, CardContent } from '../../../../shared/modules/MaterialImports/Card';
import { Stack } from '../../../../shared/modules/MaterialImports/Stack';
import { Button, IconButton } from '../../../../shared/modules/MaterialImports/Button';
import { Menu, MenuItem } from '../../../../shared/modules/MaterialImports/Menu';
// import { TextField, InputAdornment } from '../../../../shared/modules/MaterialImports/FormInputs';
import { Tooltip } from "../../../../shared/modules/MaterialImports/ToolTip";
// import { ButtonGroup } from '../../../../shared/modules/MaterialImports/ButtonGroup';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '../../../../shared/modules/MaterialImports/Dialog';


import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';


import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ShareIcon from '@mui/icons-material/Share';
// import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import FacebookIcon from '@mui/icons-material/Facebook';
//import TwitterIcon from '@mui/icons-material/Twitter';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PauseIcon from '@mui/icons-material/Pause';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';




const ViewJobDetails = lazy(() => import('./ViewJobDetails'));
const AssignWorkflow = lazy(() => import('./AssignWorkflow/AssignWorkflow'));
const AddJobPortal = lazy(() => import("../JobBoard/AddJobPortal"));
const AddJob = lazy(() => import('../Add/AddJob'));
const EditWorkflowScheduling = lazy(() => import('./EditWorkflowScheduling/EditWorkflowScheduling'));

const BasicBreadcrumbs = lazy(() => import('../../../../shared/components/BreadCrumbs/BreadCrumbs'));




import { AssignWorkflowInterface } from './AssignWorkflow/AssignWorkflowInterface';
import masterJobStatus from '../../../../shared/data/JobStatus';
import { useActivatedTabsStore } from '../../../../shared/services/JobStore/JobStore';

import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import EditRoundedIcon from '@mui/icons-material/EditRounded';


import CreateQuestionsModal from '../Find/VoiceAI/CreateQuestionsModal';
import { GetFormattedJobBoardData } from '../../Settings/JobBoards/JobBoards';
import DeleteJobPortal from '../JobBoard/DeleteJobPortal';
import { Typography } from '../../../../shared/modules/MaterialImports/Typography';
import Convert from '../../../../shared/utils/Convert';
import { ListItemIcon, ListItemText } from '../../../../shared/modules/MaterialImports/List';
import masterJobData from '../../../../shared/data/Job/Job';

import './ViewJob.scss';



// import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
// import './ViewJobDetails';
// import EmailIcon from '@mui/icons-material/Email';
// import QrCodeSample from '../../../../assets/images/qrcode_sample.png';
// import DownloadIcon from '@mui/icons-material/Download';
// import LinkIcon from '@mui/icons-material/Link';
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
// import { AlignHorizontalCenter } from '@mui/icons-material';
// import WhatsAppIcon from '@mui/icons-material/WhatsApp';
// import FormControl from '@mui/material/FormControl';

// import { width } from '@mui/system';
// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//     '& .MuiDialogContent-root': {
//         padding: theme.spacing(2),
//     },
//     '& .MuiDialogActions-root': {
//         padding: theme.spacing(1),
//     },

// }));

interface workflowdataInterface {
    assignBy: string;
    assignStates: {
        recrId: string;
        state: string;
    }[],
    stages: string[],
    SchedulingEvents: {
        stageNumber: string;
        title: string;
        events: {
            end_date: string;
            summary: string;
            eventId: string;
            start_date: string;
        }[],
        stageId: string;
    }[],
    schedulesList: {
        startDate: DateTime;
        endDate: DateTime;
        eventId: string;
        summary: string;
    }[]
    workflowId: string;
    assignRecrIds: string;
}




const ViewJob = () => {
    const isVoiceAISettingEnabled = userLocalData.adminSettings(20044);
    const isJobAddSettingEnabled = userLocalData.checkIntegration(400001);
    const isCareerPortalSettingEnabled = userLocalData.adminSettings(20005);
    const isIDIBUSettingEnabled = userLocalData.adminSettings(20016);
    const isWorkFlowEnabled = userLocalData.adminSettings(20025);


    const [assignWorkflowOpen, setAssignWorkflowOpen] = useState(false);
    const [workflowSchedulingOpen, setWorkflowSchedulingOpen] = useState(false);
    const [workflowData, setWorkflowData] = useState<workflowdataInterface>({
        assignBy: "",
        assignStates: [],
        stages: [],
        SchedulingEvents: [],
        workflowId: "",
        assignRecrIds: "",
        schedulesList: []
    });

    const { handleActiveTabChange, activatedTabs } = useActivatedTabsStore();
    const [activeTab, setActiveTab] = useState(0);

    const [isEditMode, setIsEditMode] = useState(false);

    const [openAddJobBoardModal, setOpenAddJobBoardModal] = useState(false);
    // const [activeValue, setActiveValue] = useState('');

    // const [, setEditPopoverValue] = useState('');
    // const [editValue, setEditValue] = useState('');

    // const [editingItemIndex, setEditingItemIndex] = useState(-1);
    // const [, setEditModalOpen] = useState(false);
    // const [copiedValue, setCopiedValue] = useState('');
    const [shareJobLink, setshareJobLink] = useState('');
    const [linkedInshareJobLink, setLinkedInShareJobLink] = useState('');

    // https://careers.curately.ai/demo/apply-jobs?jobid=114975040312615622

    const assignWorkflowRef = useRef<AssignWorkflowInterface>(null);


    // const [facebookLink, setFacebookLink] = useState('https://careers.curately.ai/YKTNNO');
    // const [twitterLink, setTwitterLink] = useState('https://careers.curately.ai/YKTNNO');
    // const [linkedinLink, setLinkedinLink] = useState('https://careers.curately.ai/YKTNNO');

    // const [anchorEl, setAnchorEl] = useState<null | (Element & EventTarget)>(null);

    const [shareLinkanchorEl, setShareLinkanchorEl] =
        useState<null | HTMLElement>(null);
    const openShareLinkMenu = Boolean(shareLinkanchorEl);

    // const [qrcodeanchorEl, setQRCodeanchorEl] = useState<null | HTMLElement>(null);
    // const openQrCodeMenu = Boolean(qrcodeanchorEl);

    const [localMasterJobData, setLocalMasterJobData] = useState<any>({});
    const [jobData, setJobData] = useState([
        { label: 'Job ID', value: '' },
        { label: 'Client Job ID', value: '' },
        { label: 'Status', value: 'Open' },
        { buttonLabel: userLocalData.adminSettings(20021) ? 'Search Job Boards' : '', onClick: () => { } },

        { label: 'Date Created', value: '' },
        // { label: 'HM Name', value: '' },
        { label: 'Type', value: '' },

        // {
        //     value: '1: Open Req', buttonLabel: 'Local Resume Search', onClick: () => { }

        // },


        // {
        //     value: '1: Open Req', buttonLabel: 'AI match', onClick: () => console.log('AI match clicked')
        // },
        { label: 'Positions', value: '', showIconsOnHover: true, showEditIcon: true },
        // { label: 'BillRate', value: '', showIconsOnHover: true, showEditIcon: true },
        // { label: 'Relationship Type', value: '', showIconsOnHover: true, showEditIcon: true },

        { label: 'Labor Category', value: 'Accounting Finance', showIconsOnHover: true, showEditIcon: true },

        { label: 'Location', value: '', showIconsOnHover: true, showEditIcon: true },
        { label: 'Zipcode', value: '', showIconsOnHover: true, showEditIcon: true },
        { label: 'PayRate', value: '', showIconsOnHover: true, showEditIcon: true },
        { label: 'Bill Rate', value: '', showIconsOnHover: true, showEditIcon: true },
        // { label: 'Discounted Bill Rate', value: '', showIconsOnHover: true, showEditIcon: true },


        // {
        //     value: '1: Open Req', buttonLabel: 'Assign to workflow'
        // },

        // { label: 'Duration', value: '' },
        // { label: 'Subs Allowed', value: '', showIconsOnHover: true, showEditIcon: true },
        { label: 'Work Type', value: '', showIconsOnHover: true, showEditIcon: true },

        { label: 'Job Hours', value: '', showIconsOnHover: true, showEditIcon: true },

        { label: 'Hiring Manager', value: '', showIconsOnHover: true, showEditIcon: true },

        // { value: 'Assign Workflow', buttonLabel: 'Assign Workflow', onClick: () => { console.log('Assign Workflow') } },
    ]);
    // const [, setJobsData] = useState<any>([]);
    const { jobId } = useParams();
    const jobIdRef = useRef("");

    const [jobTitle, setJobTitle] = useState("");
    const [jobsCount, setJobCount] = useState({
        countLoaded: false,
        appCount: 0,
        interviewCount: 0,
        sourcedCount: 0,
        subsCount: 0,
        newCount: 0,
        offerCount: 0,
        shortlistCount: 0,
        startsCount: 0,
        workflowCount: 0,
    });

    const [editJobData, setEditJobData] = useState({
        "companyName": userLocalData.getvalue('clientName'),
        "companyId": userLocalData.getvalue('clientId'),
        "jobTitle": "",
        "internalJobTitle": "",
        "primaryRecruiter": "",
        "collaborator": "",
        "collaboratorName": "",
        "jobCategory": "",
        "pipelineStatus": "",
        "priority": "",
        "jobType": "",
        "jobHours": "",
        "publicDescription": "",
        "originalDescription": "",
        "referenceNo": "",
        "openings": "",
        "startDate": new Date(),
        "endDate": new Date(),
        "businessUnit": "",
        "remoteJob": "",
        "remote_value": "",
        "streetAddress": "",
        "jobCity": "",
        "stateOrPro": "",
        "jobPostalCode": "",
        "workType": "",
        "specificLocation": "",
        "candidateLocation": "",
        "jobShift": [],
        "hoursWeek": "",
        "payHours": "",
        "payrateMin": "",
        "payrateMax": "",
        "payrateType": "1",
        "billRateMin": "",
        "billRateMax": "",
        "billRateType": "1",
        "dsBillMin": "",
        "dsBillMax": "",
        "dsBillType": "1",
        "firstName": "",
        "lastName": "",
        "email": "",
        "phone": "",
        "workflowId": "",
        "workflowName": "",
        "formId": "",
        "formName": "",
        "jobId": "",
        "json": "",
        "workflowDetails": {
            workflow_edit: false,
            isdelete: false,
            ispause: false,
            workflow_job_id: 0,
            workflowid: 0,
            workflowname: ""
        }
    });
    const [openAddJobModal, setOpenAddJobModal] = useState(false);
    const [openCreateQuestionModal, setOpenCreateQuestionModal] = useState(false);
    const [isRefreshJobData, setIsRefreshJobData] = useState(false);
    const [editJobPortalData, setEditJobPortalData] = useState<any>({});
    const [jobBoardsExistingData, setJobBoardsExistingData] = useState<any[]>([]);
    const [showIdibuSourceList, setShowIdibuSourceList] = useState(false);
    const idibuSourceRef = useRef<any>();

    const [showVoiceAIList, setShowVoiceAIList] = useState(false);
    const voiceAIeRef = useRef<any>();
    const [showWorkflowList, setShowWorkflowList] = useState(false);
    const workflowRef = useRef<any>();

    const fetchCount = () => {
        // ApiService.getByParams(193, 'Curately/Jobs/job_applicant_sourced_count.jsp', { jobId: jobId })
        ApiService.postWithData("admin", 'getJobApplicantSourcedCount', { jobId: jobId, clientId: userLocalData.getvalue('clientId') })
            // ApiService.postWithData(2168095, 'curatelyAdmin/getJobApplicantSourcedCount', { jobId: jobId,clientId: userLocalData.getvalue('clientId') })

            .then((result) => {
                // console.log(result)

                if (result.data) {
                    setJobCount({
                        countLoaded: true,
                        appCount: (result.data?.appCount) ? result.data?.appCount : 0,
                        interviewCount: (result.data?.interviewCount) ? result.data?.interviewCount : 0,
                        newCount: (result.data?.newCount) ? result.data?.newCount : 0,
                        offerCount: (result.data?.offerCount) ? result.data?.offerCount : 0,
                        shortlistCount: (result.data?.shortlistCount) ? result.data?.shortlistCount : 0,
                        sourcedCount: (result.data?.sourcedCount) ? result.data?.sourcedCount : 0,
                        startsCount: (result.data?.startsCount) ? result.data?.startsCount : 0,
                        subsCount: (result.data?.subsCount) ? result.data?.subsCount : 0,
                        workflowCount: (result.data?.workflowCount) ? result.data?.workflowCount : 0,
                    })
                }
            })

            .catch((error) => {
                console.error('Error fetching Sourced Count:', error);
            });
    }

    useEffect(() => {
        if (jobId && (jobId !== jobIdRef.current)) {
            jobIdRef.current = jobId ? jobId : "";
            getJobDetails();
            fetchCount()
            handleActiveTabChange([0]);
            setActiveTab(0);
        }
        return () => {
            updateDocumentTitle.set('');
        }
    }, [jobId]);


    const handleTabsChange = (newValue: number) => {
        setActiveTab(newValue);
    };

    const handleEditButtonClick = () => {
        if (activeTab === 6 || activatedTabs.includes(6)) {
            let customFieldIndex = activatedTabs.findIndex((each) => each === 6);
            let tempActivatedTabs = activatedTabs;
            tempActivatedTabs.splice(customFieldIndex, 1);
            handleActiveTabChange([...tempActivatedTabs]);
            activeTab === 6 && setActiveTab(0);
            setTimeout(() => {
                setOpenAddJobModal(true);
            }, 100);
        } else {
            setOpenAddJobModal(true);
        }
    };


    const getPayRateValue = (val: number) => {
        switch (val) {

            case 1:
                return 'Hour';
            case 2:
                return 'Day';
            case 3:
                return 'Week';
            case 4:
                return 'Month';
            case 5:
                return 'Year';
            case 6:
                return 'Milestone';
            case 7:
                return 'Project';
            default:
                return 'Hour'
        }
    }

    const sanitizeString = (str: string) => {
        return str.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    };

    const getJobDetails = () => {
        trackPromise(
            // http://35.155.202.216:8080/QADemoCurately/getJobAndFormDetails/{jobId}/{clientId}
            // https://api.cxninja.com/QADemoCurately/getjobdatabase/{jobId}/{clientId}
            ApiService.getCall('admin', `getjobdatabase/${jobId}/${userLocalData.getvalue('clientId')}`)
                .then((result) => {

                    // setJobsData(result);

                    let jobDetails = result.data?.Job[0] || {};
                    // console.log(result.data);
                    jobDetails.workflowDetails = {
                        workflow_edit: false,
                        isdelete: false,
                        ispause: false,
                        workflow_job_id: 0,
                        workflowid: 0,
                        workflowname: ""
                    }
                    if (jobDetails.workFlow && jobDetails.workFlow.length && jobDetails.workFlow[0].workflow_job_id) {
                        jobDetails.workflowDetails = jobDetails.workFlow[0];
                    }
                    if (jobDetails.estEndDate && new Date(jobDetails.estEndDate) < new Date("1990-01-01")) {
                        jobDetails.estEndDate = "";
                    }
                    let tempShifts: any = [];

                    if (jobDetails.jobShift && jobDetails.jobShift.length) {
                        for (let si = 0; si < jobDetails.jobShift.length; si++) {
                            const shift = jobDetails.jobShift[si];
                            let startTime: DateTimeMaybeValid = DateTime.local();
                            let endTime: DateTimeMaybeValid = DateTime.local();
                            if (shift.startTime) {
                                startTime = (shift.startTime) ? DateTime.fromFormat(shift.startTime.substring(0, 5), 'hh:mm') : DateTime.local();
                                // endTime = (shift.endTime) ? DateTime.fromISO(new Date(new Date().getFullYear() + " " + shift.endTime).toISOString()) : DateTime.local();
                                endTime = (shift.endTime) ? DateTime.fromFormat(shift.endTime.substring(0, 5), 'hh:mm') : DateTime.local();
                                // endTime = (shift.endTime) ? DateTime.fromISO(new Date(new Date().getFullYear() + " " + shift.endTime).toISOString()) : DateTime.local();
                            }
                            tempShifts.push({
                                days: (shift.days && shift.days.length) ? shift.days.split(',') : [],
                                startTime: startTime,
                                endTime: endTime,
                                timeZone: shift.timeZone,
                                shiftId: Number(shift.shiftid) ? Number(shift.shiftid) : 0
                            })
                        }
                    }

                    setLocalMasterJobData(jobDetails);
                    if ((jobDetails?.idibuJob && jobDetails?.idibuJobId)) {
                        loadJobBoardPublishData(jobDetails?.idibuJobId)
                    }
                    if (jobDetails?.shortForm) {
                        setshareJobLink("https://career.curately.ai/" + jobDetails?.shortForm);
                    }
                    // if (jobDetails?.googleJobId) {
                    //     setshareJobLink(`https://careers.curately.ai/${userLocalData.getvalue('clientName')}/apply-jobs/${jobDetails?.googleJobId}/${jobDetails?.jobTitle}`);
                    //     // https://careers.curately.ai/demo/apply-jobs/126977458625749702/Linux-Systems-Engineer
                    // }

                    updateDocumentTitle.set(jobDetails?.jobTitle + " | Job ");
                    setJobTitle(jobDetails.jobTitle);

                    let payRateMin = (jobDetails?.payrateMin) ? parseFloat(jobDetails?.payrateMin).toFixed(2) : "";
                    let payRateMax = (jobDetails?.payrateMax) ? parseFloat(jobDetails?.payrateMax).toFixed(2) : "";

                    // let displayPayRate = `${(payRateMin && payRateMax) ? `$${payRateMin}` : ''} ${(payRateMin && payRateMax) ? '-' : ''} ${(payRateMax) ? `$${payRateMax}` : ''} ${jobDetails?.payrateType && payRateMin > "0" || payRateMax > '0' ? '/ ' + getPayRateValue(jobDetails?.payrateType) : ""}`;
                    // let displayPayRate = `${payRateMin ? `$${payRateMin}` : ''}${payRateMin && payRateMax ? ' - ' : ''}${payRateMax ? `$${payRateMax}` : ''} ${jobDetails?.payrateType && (payRateMin > "0" || payRateMax > "0") ? '/ ' + getPayRateValue(jobDetails?.payrateType) : ''}`;
                    let displayPayRate = (payRateMin && payRateMax) ? `$${payRateMin} - $${payRateMax}` : payRateMin ? `Min $${payRateMin}` : payRateMax ? `Max $${payRateMax}` : '';
                    displayPayRate += jobDetails?.payrateType && (payRateMin > "0" || payRateMax > "0") ? '/ ' + getPayRateValue(jobDetails?.payrateType) : '';

                    let billRateMin = (jobDetails?.billRateMin) ? parseFloat(jobDetails?.billRateMin).toFixed(2) : "";
                    let billRateMax = (jobDetails?.billRateMax) ? parseFloat(jobDetails?.billRateMax).toFixed(2) : "";

                    // let displayBillRate = `${(billRateMin && billRateMax) ? `$${billRateMin}` : ''} ${(billRateMin && billRateMax) ? '-' : ''} ${(billRateMax) ? `$${billRateMax}` : ''} ${jobDetails?.billRateType && billRateMin > "0" || billRateMax > '0' ? '/ ' + getPayRateValue(jobDetails?.billRateType) : ""}`;
                    let displayBillRate = (billRateMin && billRateMax) ? `$${billRateMin} - $${billRateMax}` : billRateMin ? `Min $${billRateMin}` : billRateMax ? `Max $${billRateMax}` : '';
                    displayBillRate += jobDetails?.payrateType && (billRateMin > "0" || billRateMax > "0") ? '/ ' + getPayRateValue(jobDetails?.payrateType) : '';


                    // let dsBillRateMin = (jobDetails?.dsBillMin) ? parseFloat(jobDetails?.dsBillMin).toFixed(2) : "";
                    // let dsBillRateMax = (jobDetails?.dsBillMax) ? parseFloat(jobDetails?.dsBillMax).toFixed(2) : "";

                    // let displayDSBillRate = `${(dsBillRateMin && dsBillRateMax) ? `$${dsBillRateMin}` : ''} ${(billRateMin && dsBillRateMax) ? '-' : ''} ${(dsBillRateMax) ? `$${dsBillRateMax}` : ''} ${jobDetails?.dsBillType && dsBillRateMin > "0" || dsBillRateMax > '0' ? '/ ' + getPayRateValue(jobDetails?.dsBillType) : ""}`;
                    const city = jobDetails?.workCity ? Convert.capitalizeWords(jobDetails.workCity) : "";
                    const state = jobDetails?.workState ? Convert.capitalizeAllLetters(jobDetails.workState) : "";
                    const displayLocation = city && state ? `${city}, ${state}` : city + " " + state;
                    const displayLocationSmall = displayLocation.length > 25 ? displayLocation.slice(0, 25) + "..." : displayLocation;

                    //  jobDetails?.workStreet + " " +
                    if (jobDetails?.referenceNo) {
                        localStorage.setItem(`curately_${userLocalData.getvalue('clientId')}_jobId_${jobId}`, jobDetails?.referenceNo);
                    }

                    setJobData([
                        //1st row

                        { label: 'Job ID', value: (jobId) ? jobId : "" },
                        { label: 'Client Job ID', value: jobDetails?.referenceNo },
                        // { label: 'Client name:', value: result?.data?.Details?.txtJobRequistion },

                        //missing clien Id
                        { label: 'Status', value: masterJobStatus.getNameById(jobDetails?.status) }, //jobDetails?.status //  'Open'
                        // https://search1.accuick.com/ASKResumes/index.jsp?UserName=Adityak&UserId=1893&JobId=227796&JobTitle=Angular+Developer+8&CompId=12938
                        // { buttonLabel: 'Search Job Boards', onClick: () => { window.open('https://search1.accuick.com/ASKResumes/index.jsp?UserName=' + userLocalData.getvalue('userName') + '&UserId=' + userLocalData.getvalue('recrId') + '&JobId=' + jobId + '&JobTitle=' + encodeURIComponent(result?.data?.jobTitle) + '&CompId=' + result?.data?.Details?.txtCompid, 'SearchAllResumes', '') } },

                        { buttonLabel: userLocalData.adminSettings(20021) ? 'Search Job Boards' : '', onClick: () => { window.open(`${globalData.getWindowLocation()}resume/jobBoards?jobTitle=${jobDetails.jobTitle}&jobId=${jobId}`, 'CuratelyHome', ''); } },

                        //2nd row


                        {
                            label: 'Date Created',
                            value: jobDetails?.createDate ? formatDate(result.data.Job[0]?.createDate) : null
                        },
                        //missing job title

                        // { label: 'HM Name', value: jobDetails.contName },
                        { label: 'Type', value: masterJobData.typeById(jobDetails.jobType ? jobDetails.jobType + "" : "") },

                        // 
                        // {
                        //     value: '1: Open Req', buttonLabel: 'Local Resume Search', onClick: () => { window.open(`https://resume.accuick.com/Sovren/Accuick_Search.jsp;jsessionid=${userLocalData.getvalue('recrId')}?Userid=` + userLocalData.getvalue('encoded') + `==&JobId=` + jobId + `&JobTitle=` + encodeURIComponent(result?.data?.jobTitle) + `&CompId=` + result?.data?.Details?.txtCompid, 'ASKResumes', '') }
                        // },
                        // {
                        //     value: '1: Open Req', buttonLabel: 'AI match', onClick: () => {
                        //         window.open(`${globalData.getWindowLocation()}resume/community?jobTitle=${jobDetails.jobTitle}&jobId=${jobId}`, 'CuratelyHome', '');
                        //         // window.open('https://resume.accuick.com/Sovren/Accuick_Search_ai_match.jsp?UserId=' + userLocalData.getvalue('recrId') + '&Userid=' + userLocalData.getvalue('encoded') + '&JobId=' + jobId + '&JobTitle=' + encodeURIComponent(result?.data?.jobTitle) + '&CompId=' + result?.data?.Details.txtCompid, 'AIMATCH', '');
                        //     }
                        // },

                        { label: 'Positions', value: jobDetails?.openings, showIconsOnHover: true, showEditIcon: true },

                        // { label: 'BillRate', value: " $ " + parseFloat(result?.data?.Details?.txtBillrate || "0").toFixed(2), showIconsOnHover: true, showEditIcon: true },

                        // { label: 'Relationship Type', value: 'Portal', showIconsOnHover: true, showEditIcon: true },


                        {
                            label: 'Labor Category', value: masterJobData.jobCategoryById(jobDetails.category), showIconsOnHover: true, showEditIcon: true
                        },


                        //4th row
                        {
                            label: 'Location', value: displayLocation.length > 25 ?
                                <Tooltip
                                    title={displayLocation}
                                    classes={{ tooltip: "tt-capital" }}
                                >
                                    <span>{displayLocationSmall}</span>
                                </Tooltip>
                                :
                                <span>{displayLocation}</span>, showIconsOnHover: true, showEditIcon: true
                        },

                        { label: 'Zipcode', value: jobDetails?.workZipcode, showIconsOnHover: true, showEditIcon: true },
                        { label: 'PayRate', value: displayPayRate, showIconsOnHover: true, showEditIcon: true },
                        { label: 'Bill Rate', value: displayBillRate, showIconsOnHover: true, showEditIcon: true },
                        // { label: 'Discounted Bill Rate', value: displayDSBillRate, showIconsOnHover: true, showEditIcon: true },
                        // {
                        //     value: '1: Open Req', buttonLabel: 'Assign to workflow', onClick: handleClickOpen
                        // },

                        //5th row

                        // { label: 'Duration', value: jobDetails?.jobHours },



                        // { label: 'Subs Allowed', value: result?.data?.Details?.Num5, showIconsOnHover: true, showEditIcon: true },
                        {
                            label: 'Work Type', value: masterJobData.workTypeById((jobDetails?.workType) ? jobDetails?.workType + "" : ""),
                            showIconsOnHover: true, showEditIcon: true
                        },


                        { label: 'Job Hours', value: masterJobData.hourById(jobDetails.jobHours ? jobDetails.jobHours + "" : "") },
                        { label: 'Hiring Manager', value: jobDetails.contName ? jobDetails.contName : "" },

                        // { value: 'Assign Workflow', buttonLabel: 'Assign Workflow', onClick: () => { showAssignWorkflow() } },
                    ])
                    // console.log(result.data);
                    localStorage.setItem(`jobId_${jobId}_PrimaryName`, jobDetails?.fullName ? jobDetails?.fullName : "");
                    const sanitizedInternalJobDescr = sanitizeString(jobDetails.interJobDescr);
                    setEditJobData({
                        "companyName": userLocalData.getvalue('clientName'),
                        "companyId": userLocalData.getvalue('clientId'),
                        "jobTitle": jobDetails.jobTitle,
                        "internalJobTitle": jobDetails.intJobTitle,
                        "primaryRecruiter": (jobDetails.primaryRecruiter && jobDetails.fullName) ? jobDetails.primaryRecruiter : "",
                        "primaryName": (jobDetails.primaryRecruiter && jobDetails.fullName) ? jobDetails.fullName : "",
                        "collaborator": jobDetails.collaborator || "",
                        "collaboratorName": Array.isArray(jobDetails.collaboratorNames) ? jobDetails.collaboratorNames.join() : (jobDetails.collaboratorNames || ""),
                        "jobCategory": String(jobDetails.category),
                        "pipelineStatus": String(jobDetails.status),
                        "priority": String(jobDetails.priority),
                        "jobType": String(jobDetails.jobType),
                        "jobHours": String(jobDetails.jobHours),
                        "publicDescription": jobDetails.publicJobDescr,
                        "originalDescription": sanitizedInternalJobDescr,
                        "referenceNo": jobDetails.referenceNo,
                        "openings": jobDetails.openings,
                        // @ts-ignore
                        "startDate": (jobDetails.estStartDate) ? DateTime.fromFormat(jobDetails.estStartDate, 'yyyy-MM-dd').toFormat('MM/dd/yyyy') : null,
                        // @ts-ignore
                        "endDate": (jobDetails.estEndDate) ? DateTime.fromFormat(jobDetails.estEndDate, 'yyyy-MM-dd').toFormat('MM/dd/yyyy') : null,
                        "businessUnit": jobDetails.businessUnit,
                        "remoteJob": "",
                        "remote_value": "",
                        "streetAddress": Convert.capitalizeWords(jobDetails.workStreet),
                        "jobCity": city,
                        "stateOrPro": state,
                        "jobPostalCode": jobDetails.workZipcode,
                        "workType": String(jobDetails.workType),
                        "specificLocation": (jobDetails.specificLocation) ? "Yes" : "No",
                        "candidateLocation": jobDetails.candStreet,
                        "jobShift": tempShifts,
                        "hoursWeek": "",
                        "payrateMin": Number(jobDetails.payrateMin) ? "" + jobDetails.payrateMin : "",
                        "payrateMax": Number(jobDetails.payrateMax) ? "" + jobDetails.payrateMax : "",
                        "payrateType": jobDetails.payrateType || "1",
                        "billRateMin": Number(jobDetails.billRateMin) ? "" + jobDetails.billRateMin : "",
                        "billRateMax": Number(jobDetails.billRateMax) ? "" + jobDetails.billRateMax : "",
                        "billRateType": jobDetails.billRateType || "1",
                        "dsBillMin": Number(jobDetails.dsBillMin) ? "" + jobDetails.dsBillMin : "",
                        "dsBillMax": Number(jobDetails.dsBillMax) ? "" + jobDetails.dsBillMax : "",
                        "dsBillType": jobDetails.dsBillType || "1",
                        "firstName": "",
                        "lastName": "",
                        "email": "",
                        "phone": "",
                        "workflowId": (Number(jobDetails.workflowId) && jobDetails.workflowName) ? jobDetails.workflowId : "",
                        "workflowName": (Number(jobDetails.workflowId) && jobDetails.workflowName) ? jobDetails.workflowName : "",
                        "formId": (Number(jobDetails.formId) && jobDetails.formName) ? jobDetails.formId : 0,
                        "formName": (Number(jobDetails.formId) && jobDetails.formName) ? jobDetails.formName : "",
                        "jobId": jobDetails.jobId,
                        "json": jobDetails.json,
                        "workflowDetails": jobDetails.workflowDetails,
                        contId: jobDetails.contId,
                        contName: jobDetails.contName,
                    });
                    // https://careers.curately.ai/jobs/qademo/apply-jobs/2135/Java-Developer-52301-Atlanta-GA-30334
                    // https://applyjob.curately.ai
                    setLinkedInShareJobLink(`https://www.linkedin.com/sharing/share-offsite/?url=${`https://applyjob.curately.ai/jobs/${userLocalData.getvalue('clientName')}/apply-jobs/${jobId}/${jobTitle}-${jobDetails.workCity ? jobDetails.workCity : ""}-${jobDetails.workState ? jobDetails.workState : ""}-${jobDetails.workZipcode ? jobDetails.workZipcode : ""}`}`);

                    if (jobDetails?.workflowDetails?.workflow_job_id) {
                        getEditWorkflow(jobDetails?.workflowDetails?.workflow_job_id);
                    }
                })
        )
    }

    const showAssignWorkflow = () => {
        setAssignWorkflowOpen(true);
    }
    const hideAssignWorkflow = (isUpdated: boolean) => {
        if (isUpdated) {
            getJobDetails();
        }
        setAssignWorkflowOpen(false);
    }

    // useEffect(() => {
    //     console.log('workflow opened or closed', assignWorkflowOpen);
    // }, [assignWorkflowOpen])



    const formatDate = (inputStr: string): string => {
        const [datePart, timePart] = inputStr.split(' ');
        const [year, month, day] = datePart.split('-');
        let [hour, minute, second] = timePart.split(':').map(s => parseInt(s));

        const amOrPm = hour < 12 ? 'AM' : 'PM';
        if (hour > 12) hour -= 12;
        if (hour === 0) hour = 12;

        return `${month}/${day}/${year} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${amOrPm}`;
        // :${String(second).padStart(2, '0')}
    }

    const openBoardModal = () => {

        setIsEditMode(false);
        setOpenAddJobBoardModal(true); // Open the modal only after state is updated

    };


    const handleClickShareLinkMenu = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        setShareLinkanchorEl(event.currentTarget);
        if (!shareJobLink) {
            getShortlinkUrl();
            // event, 'link'
        }
    };

    // const handleClickQRCodeMenu = (
    //     event: React.MouseEvent<HTMLButtonElement>
    // ) => {
    //     setQRCodeanchorEl(event.currentTarget);
    //     if (!shareJobLink) {
    //         getShortlinkUrl();
    //         // event.currentTarget, 'qr'
    //     }
    // };

    // element: any, type: 'link' | 'qr'
    const getShortlinkUrl = () => {
        trackPromise(
            // http://35.155.202.216:8080/DemoCurately/createShortLink 
            ApiService.postWithData("admin", 'createShortLink', { jobId: jobId, clientId: userLocalData.getvalue('clientId') })
                .then((response) => {
                    if (response.data.Success && response.data.secureShortURL) {
                        setshareJobLink(response.data.secureShortURL);
                        // if (type === 'link') {
                        //     setShareLinkanchorEl(element);
                        // } else {
                        //     setQRCodeanchorEl(element);
                        // }
                    } else {
                        showToaster('Error Creating Short Link', 'error');
                        setShareLinkanchorEl(null);
                        // setQRCodeanchorEl(null);
                    }
                })
        )
    }

    // const handleValueMouseEnter = (value: string) => {
    //     setActiveValue(value);
    // };


    // const handleValueMouseLeave = () => {
    //     setActiveValue('');
    // };


    // const openEditPopover = (value: string, index: number) => {

    //     setEditingItemIndex(index);
    //     setEditPopoverValue(value);
    //     setEditModalOpen(true);
    // };



    // const closeEditPopover = () => {
    //     setEditValue('');
    //     setEditingItemIndex(-1);
    // };
    // const copyValue = (value: string) => {
    //     navigator.clipboard.writeText(value);
    //     setCopiedValue(value);
    //     setSnackbarOpen(true);
    //     console.log(copiedValue)
    // };

    const copyQrLinkValue = (value: string) => {
        navigator.clipboard.writeText(value);
        setshareJobLink(value);
        showToaster('Link Copied.', 'success');
    };

    const handleDownload = () => {
        // Replace 'image-url.jpg' with the actual URL of your image
        const svg = document.getElementById("QRCode");
        if (!svg) return;
        if (!svg) return;

        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const img = new Image();
        img.onload = () => {
            if (!ctx) return;

            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const pngFile = canvas.toDataURL("image/png");
            const downloadLink = document.createElement("a");
            downloadLink.download = "QRCode.png";
            downloadLink.href = `${pngFile}`;
            downloadLink.click();
        };

        img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    };



    // const handleMenuClose = () => {
    //     setAnchorEl(null);
    // };

    // const saveEdit = () => {

    //     const updatedJobData = [...jobData];
    //     updatedJobData[editingItemIndex].value = editValue;
    //     setJobData(updatedJobData);

    //     console.log(`Saving value: ${editValue}`);
    //     closeEditPopover();
    // };

    // const cancelEdit = () => {
    //     closeEditPopover();
    // };


    // D:\apache-tomcat-8.5.20\webapps\Accuick_API\Curately\Workflow\workflow_assignjob.jsp

    const pauseOrDeleteWorkflow = (val: number, type: 'delete' | 'pause') => {
        trackPromise(
            ApiService.postWithData("admin", 'pauseSave', {
                workflow_job_id: editJobData.workflowDetails.workflow_job_id,
                status: val,
                type,
                clientId: userLocalData.getvalue('clientId')
            })
                .then((response) => {
                    // console.log(response);
                    if (response.data.message === "Success") {
                        if (type === "pause") {
                            showToaster(`Workflow has been ${val ? "Paused" : "Enabled"}`, 'success');
                        } else {
                            showToaster(`Workflow has been deleted Successfully`, 'success');
                        }
                        getJobDetails();
                        setShowWorkflowList(false)
                    } else {
                        showToaster(response.data.message ? response.data.message : 'An error occured ', 'error');
                    }
                }
                )
        )
    }
    const getEditWorkflow = (id: string) => {
        trackPromise(
            ApiService.getByParams(193, 'Curately/Workflow/workflow_assignjob_edit.jsp', {
                workflow_job_id: id // editJobData.workflowDetails.workflow_job_id
            })
                .then((response) => {
                    let tempResp = response.data;
                    let tempScheduling: {
                        startDate: DateTime;
                        endDate: DateTime;
                        eventId: string;
                        summary: string;
                    }[] = [];
                    if (tempResp.workflowId) {
                        if (tempResp.SchedulingEvents?.length) {
                            for (let se = 0; se < tempResp.SchedulingEvents.length; se++) {
                                const eventsList = tempResp.SchedulingEvents[se].events;
                                for (let el = 0; el < eventsList.length; el++) {
                                    let startDate = DateTime.fromFormat(eventsList[el].start_date.replace('T', ' '), 'yyyy-MM-dd hh:mm:ss');
                                    let endDay = DateTime.fromFormat(eventsList[el].end_date.replace('T', ' '), 'yyyy-MM-dd hh:mm:ss');

                                    let nextDay: DateTimeMaybeValid = DateTime.now().plus({ day: 1 });

                                    let nextWeek: DateTimeMaybeValid = DateTime.now().plus({ week: 1 });

                                    nextDay = (startDate > nextDay) ? startDate : nextDay;
                                    nextWeek = (startDate > endDay) ? startDate : endDay;

                                    tempScheduling.push({
                                        endDate: nextWeek,
                                        startDate: nextDay,
                                        eventId: eventsList[el].eventId,
                                        summary: eventsList[el].summary,
                                    });
                                }
                            }
                        }
                        setWorkflowData({ ...tempResp, schedulesList: tempScheduling });
                    }

                }
                )
        )
    }

    const handleVoiceAIStatusClick = (statusType: "pause" | "running" | "complete") => {
        trackPromise(
            ApiService.postWithData("voiceai", "cases/setCaseProcessingStatus", {
                "clientId": userLocalData.getvalue("clientId"),
                "jobId": parseInt(`${jobId}`),
                "status": statusType
            }).then((res: any) => {
                getJobDetails();
                setShowVoiceAIList(false)
            }).catch((err: any) => {
                showToaster(err.message, "error")
            })
        )
    }

    const publishJobToVoiceAI = () => {
        let data = {
            "jobIds": [jobId as string],
            "clientId": userLocalData.getvalue('clientId'),
            "recrId": userLocalData.getvalue('recrId'),
            "questions": []
        }
        ApiService.postWithData('voiceai', `jobs/submitJob`, data).then((response) => {
            if (response.data?.length) {
                let calculatedData = response.data;

                console.log(calculatedData);
                let errorResponse = ""; let successResponse = "";
                for (let si = 0; si < calculatedData.length; si++) {

                    if (calculatedData[si]?.error) {
                        errorResponse += calculatedData[si].failureJobId + " - " + calculatedData[si].errorResponse + "\n";
                    } else {
                        successResponse += calculatedData[si]?.title + " - User Voice AI Created Successfully.\n";
                    }
                }

                (errorResponse) ? showToaster(errorResponse, 'error') : null;
                if (successResponse) {
                    getJobDetails();
                    showToaster(successResponse, 'success');
                }

            }
        }).catch(error => {
            showToaster(error.message ? error.message : "Unable to Publish Job to Voice AI", 'error');
        });
    }

    const loadJobBoardPublishData = (idibuJobId?: any) => {
        trackPromise(
            ApiService.postWithData("admin", "getJobDetailsByJobId", { jobId: idibuJobId ? idibuJobId : localMasterJobData?.idibuJobId }).then((res: any) => {
                if (res?.data?.Success) {
                    let data: any = res?.data?.idibu?.response?.job || {};
                    let tempJobPortalsData = res?.data?.idibu?.extrafields;
                    let tempJobData = {
                        jobTitle: data?.title || "",
                        jobId: parseInt(`${jobId}`),
                        idibuJobId: data?.id,
                        reference: data?.reference || "",
                        startDate: data?.start_date ? DateTime.fromFormat(data?.start_date, 'yyyy-MM-dd HH:mm:ss').toFormat('MM/dd/yyyy') : "",
                        jobHours: data?.working_hours?.toLowerCase() === "full time" ? "1" : data?.working_hours?.toLowerCase() === "part time" ? "2" : "",
                        payrateMin: typeof data?.salary.minimum === "number" ? data.salary.minimum : "",
                        payrateMax: typeof data?.salary.maximum === "number" ? data.salary.maximum : "",
                        jobType: `${data?.type?.id || ""}`,
                        salaryper: data?.salary?.per || "",
                        currency: data?.salary?.currency || "",
                        sender: data?.sender || { id: "" },
                        sub_location: data?.sub_location || { id: "" },
                        location: data?.location || { code: "" },
                        sector: data?.sector || { id: "" },
                        publicDescription: data?.description || "",
                        portals: {
                            portal: GetFormattedJobBoardData(data?.portals?.portal || [])
                        }
                    }

                    if (tempJobPortalsData) {
                        tempJobPortalsData = {
                            portal: GetFormattedJobBoardData(tempJobPortalsData?.portal || [])?.map((each: any) => ({
                                ...each,
                                values: {
                                    value: GetFormattedJobBoardData(each?.values?.value || [])
                                }
                            }))
                        }
                        setJobBoardsExistingData(tempJobPortalsData?.portal || []);
                    } else {
                        setJobBoardsExistingData([]);
                    }
                    setEditJobPortalData(tempJobData);
                } else showToaster(res.data.Message || "An error occurred!", "error")
            })
        )
    }

    return (
        <div id="viewJob" className='fullViewPage'>
            <Grid>
                <Suspense fallback={<CircularProgress className="centered" />} ><BasicBreadcrumbs /></Suspense>
            </Grid>
            <Grid
                className="jobName vj-header-container"
                // className='customCard jobName p-0 showEditonHover'
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                height={"100%"}
                sx={{
                    minHeight: '50px !important',
                    maxHeight: "100%"
                }}
            >

                <Grid size={5} sx={{ m: '5px', pl: '20px', maxHeight: "100%" }}
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                >
                    <Stack direction={"row"} alignItems={"center"} spacing={2}>
                        <Typography variant='h6'>{(jobTitle) ? jobTitle : ""}</Typography>
                        <Stack direction={"row"} alignItems={"center"}>
                            {
                                isJobAddSettingEnabled ?
                                    <IconButton color="primary"
                                        id="add-sharelink-btn1"
                                        onClick={handleEditButtonClick}
                                        disableRipple
                                    >
                                        <BorderColorIcon className='editModalIcon c-grey' />
                                    </IconButton>
                                    :
                                    null
                            }
                            {
                                isCareerPortalSettingEnabled ?
                                    <>
                                        <IconButton color="primary"
                                            id="add-sharelink-btn"
                                            aria-controls={openShareLinkMenu ? "shareLinkMenu" : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={openShareLinkMenu ? "true" : undefined}
                                            onClick={handleClickShareLinkMenu}
                                            disableRipple
                                        >
                                            <ShareIcon className=' c-grey' />
                                        </IconButton>
                                        <Menu
                                            id='shareLinkMenu'
                                            anchorEl={shareLinkanchorEl}
                                            open={openShareLinkMenu}
                                            onClose={() => setShareLinkanchorEl(null)}
                                            className='sharelink-menu'
                                            MenuListProps={{
                                                "aria-labelledby": 'add-sharelink-btn',
                                            }}
                                            anchorOrigin={{
                                                vertical: "bottom",
                                                horizontal: "left",
                                            }}
                                            transformOrigin={{
                                                vertical: "top",
                                                horizontal: "left",
                                            }}
                                            PaperProps={{
                                                style: { overflow: "visible" },
                                            }}
                                            sx={{
                                                boxShadow: "0px",
                                                "& .MuiList-root.MuiMenu-list": {
                                                    pt: "10px",
                                                    pb: "10px",
                                                    pr: "10px",
                                                    pl: "10px",
                                                },
                                            }}
                                        >
                                            {
                                                shareJobLink ?
                                                    <Grid>
                                                        <Grid size={12} spacing={4} my={1} alignContent="center"
                                                            sx={{
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                            }}>
                                                            <QRCode id='QRCode' value={shareJobLink} size={140} />

                                                        </Grid>
                                                        <Grid size={12} spacing={2} my={1} mx={1.5} alignContent="center">
                                                            <Button
                                                                fullWidth
                                                                variant="outlined"
                                                                color="primary"
                                                                className="mr-2"
                                                                onClick={handleDownload}
                                                            // onClick={() => copyValue(shareJobLink)}
                                                            >
                                                                Download Me
                                                            </Button>
                                                        </Grid>
                                                        <Grid size={12} spacing={2} my={1} mx={1.5} alignContent="center">
                                                            <Button
                                                                fullWidth
                                                                variant="outlined"
                                                                color="primary"
                                                                className="mr-2"
                                                                onClick={() => copyQrLinkValue(shareJobLink)}
                                                            >
                                                                Copy Link
                                                            </Button>
                                                        </Grid>

                                                        <Grid size={12} spacing={2} my={1} mx={1}>
                                                            {/* <IconButton color="primary" aria-label="Whatsup Link" onClick={() => {window.open(`https://wa.me/?text=${shareJobLink}`)}}>  <WhatsAppIcon style={{ color: "#25D366" }} /> </IconButton> */}

                                                            <IconButton aria-label="Facebook Link" onClick={() => {
                                                                window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareJobLink}`)
                                                            }}>  <FacebookIcon style={{ color: "#4267B2" }} /> </IconButton>
                                                            <IconButton aria-label="Twitter Link" onClick={() => {
                                                                window.open(`https://twitter.com/intent/tweet?text=${jobTitle}&url=${shareJobLink}`)
                                                            }}>  <XIcon style={{ color: "black" }} /> </IconButton>
                                                            <IconButton color="primary" aria-label="LinkedIn Link" onClick={() => {
                                                                // window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareJobLink}&title=${jobTitle}`)
                                                                // https://applyjob.curately.ai/jobs/qademo/apply-jobs/2148/TestAIjobs-Atlanta-GA-30005
                                                                console.log(linkedInshareJobLink);
                                                                window.open(linkedInshareJobLink);
                                                                // window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareJobLink}`);
                                                            }}>  <LinkedInIcon style={{ color: "#5B51D8" }} /> </IconButton>
                                                            {/* <IconButton color="primary" aria-label="Email Link" onClick={() => { window.open(`mailto:?subject=OVA - ${jobTitle}&body=${shareJobLink}`) }}>  <EmailIcon style={{ color: "#333333" }} /> </IconButton>    */}
                                                            <IconButton color="primary" aria-label="Content Copy Link" onClick={() => copyQrLinkValue(shareJobLink)} >  <ContentCopyIcon style={{ color: "#000000" }} /> </IconButton>
                                                        </Grid>
                                                    </Grid>
                                                    :
                                                    null
                                            }

                                        </Menu>

                                    </>
                                    :
                                    <></>
                            }

                        </Stack>
                    </Stack>

                </Grid>

                <Grid size={6.1} maxHeight={"100%"} justifyContent={"center"}>
                    <Grid container spacing={1} justifyContent={"flex-end"} alignContent="center" sx={{ marginRight: '-50px', height: "100%" }}>
                        <span  >
                            {jobData.map((item, index) => {
                                return item.buttonLabel ?
                                    <Grid size={12} key={index}>
                                        <Stack direction="row" spacing={1}>
                                            <Button className="search-button" onClick={item.onClick} size='small' color='primary' variant='contained'>
                                                {item.buttonLabel}
                                            </Button>
                                        </Stack>
                                    </Grid>
                                    :
                                    null
                            })}
                        </span>

                        <span>
                            {
                                isWorkFlowEnabled ?
                                    <>

                                        {(localMasterJobData?.workflowDetails && localMasterJobData?.workflowDetails?.workflowid) ?

                                            <>
                                                <Tooltip title={localMasterJobData?.workflowDetails?.ispause ? "Workflow has been Paused." : localMasterJobData?.workflowDetails?.workflowid ? "Workflow has been Enabled" : ""} placement="top" arrow>
                                                    <div id='assignWorkflowText' className={`activeButtonLink ${localMasterJobData?.workflowDetails?.ispause ? "activeButtonLink-pause" : ""}`} ref={workflowRef}
                                                        onClick={() => setShowWorkflowList(true)} ><FiberManualRecordIcon className='mt-1' sx={{ height: "14px", paddingBottom: "2px" }} /> <span> Assigned Workflow</span></div>
                                                </Tooltip>
                                                <Menu
                                                    anchorEl={workflowRef.current}
                                                    open={showWorkflowList}
                                                    onClose={() => setShowWorkflowList(false)}
                                                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                                                    transformOrigin={{ vertical: "top", horizontal: "left" }}
                                                    slotProps={{
                                                        paper: {
                                                            sx: {
                                                                overflow: "auto", maxHeight: '16rem',
                                                                "& .MuiList-root": { pt: 0 }
                                                            }
                                                        }
                                                    }}>


                                                    <Stack className='vj-workflow-menu'>
                                                        <Typography>
                                                            <span>
                                                                Assigned to <span className='tt-capital'>{localMasterJobData.workflowDetails.workflowname}</span>
                                                            </span>
                                                            <span>
                                                                {localMasterJobData?.workflowDetails?.ispause ?
                                                                    <span id='pauseWorkflowText' className='tt-capital fw-6 fs-12 pr-3 c-lightOrange'>Workflow has been Paused.</span>
                                                                    : null}
                                                            </span>
                                                        </Typography>

                                                        {localMasterJobData?.workflowDetails?.ispause ?
                                                            <Button type='button' id='enableWorkflowBtn' color="inherit" name='enableWorkflow' aria-label="outlined button group" onClick={() => { pauseOrDeleteWorkflow(0, 'pause') }} title='Enable Workflow' size='small' ><PlayArrowOutlinedIcon className='mr-2' /> Enable Workflow</Button>
                                                            : null}

                                                        {localMasterJobData?.workflowDetails?.workflowid && !localMasterJobData?.workflowDetails?.ispause ?
                                                            <Button type='button' id='pauseWorkflowBtn' color='inherit' name='pauseWorkflow' title='Pause Workflow' onClick={() => { pauseOrDeleteWorkflow(1, 'pause') }} size='small'><PauseIcon className='mr-2' /> Pause Workflow</Button>
                                                            : null}

                                                        {localMasterJobData?.workflowDetails?.workflowid && workflowData.SchedulingEvents?.length ?
                                                            <Button type='button' id='editWorkflowBtn' color='inherit' name='editWorkflow' onClick={() => setWorkflowSchedulingOpen(true)} size='small'><EditOutlinedIcon className='mr-2' />  Edit Scheduling</Button>
                                                            : null}

                                                        {(localMasterJobData?.workflowDetails?.workflowid && !localMasterJobData?.workflowDetails?.isdelete) ?
                                                            <Button type='button' id='deleteWorkflowBtn' color='inherit' name='deleteWorkflow' title='Delete Workflow' onClick={() => { pauseOrDeleteWorkflow(1, 'delete') }} size='small'><DeleteOutlineOutlinedIcon className='mr-2' /> Remove Workflow</Button>
                                                            : null}
                                                    </Stack>
                                                </Menu>

                                            </>
                                            :
                                            <Button className="search-button" onClick={showAssignWorkflow} size='small' color='primary' variant='outlined'>
                                                Assign Workflow
                                            </Button>
                                        }

                                    </>
                                    :
                                    <></>
                            }

                        </span>
                        <span>
                            {isVoiceAISettingEnabled ?
                                <>
                                    {localMasterJobData?.voiceai ?
                                        <>
                                            <Tooltip title={localMasterJobData?.voiceaiCaseStatus === "complete" ? "VoiceAI Completed" :
                                                ["running", "null", "not_started"].includes(localMasterJobData?.voiceaiCaseStatus) ? "Pushed to Voice AI" : "VoiceAI is Paused"} placement="top" arrow>
                                                <div id='assigVoiceAIText' className={`activeButtonLink ${localMasterJobData?.voiceaiCaseStatus === "pause" ? "activeButtonLink-pause" : ""}`} ref={voiceAIeRef}
                                                    onClick={() => setShowVoiceAIList(true)} ><FiberManualRecordIcon className='mt-1' sx={{ height: "14px", paddingBottom: "2px" }} /> <span> Voice AI</span></div>
                                            </Tooltip>
                                            <Menu
                                                anchorEl={voiceAIeRef.current}
                                                open={showVoiceAIList}
                                                onClose={() => setShowVoiceAIList(false)}
                                                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                                                transformOrigin={{ vertical: "top", horizontal: "left" }}
                                                slotProps={{
                                                    paper: {
                                                        sx: {
                                                            overflow: "auto", maxHeight: '16rem',
                                                            "& .MuiList-root": { pt: 0 }
                                                        }
                                                    }
                                                }}>
                                                <Stack className='vj-voiceAi-menu'>
                                                    <Typography>
                                                        VoiceAI
                                                        {localMasterJobData?.voiceaiCaseStatus === "complete" ? " Completed" :
                                                            ["running", "null", "not_started"].includes(localMasterJobData?.voiceaiCaseStatus) ? " Enabled" : " Paused"}
                                                    </Typography>
                                                    {localMasterJobData?.voiceaiCaseStatus === "pause" ?
                                                        <Button type='button' id='enablevoiceAIBtn' color="inherit" name='enableVoiceAI' aria-label="outlined button group" onClick={() => handleVoiceAIStatusClick("running")}
                                                            title='Enable VoiceAI' disabled={localMasterJobData?.voiceaiCaseStatus === "complete"} size='small' ><PlayArrowOutlinedIcon className='mr-2' /> Enable VoiceAI</Button>
                                                        : null}

                                                    {(localMasterJobData?.voiceaiCaseStatus !== "pause") ?
                                                        <Button type='button' id='pausevoiceAIBtn' color="inherit" name='pauseVoiceAI' aria-label="outlined button group" onClick={() => handleVoiceAIStatusClick("pause")}
                                                            title='Pause VoiceAI' disabled={localMasterJobData?.voiceaiCaseStatus === "complete"} size='small' ><PauseIcon className='mr-2' /> Pause VoiceAI</Button>
                                                        : null}

                                                    {<Button type='button' id='completevoiceAIBtn' color="inherit" name='completeVoiceAI' aria-label="outlined button group" onClick={() => handleVoiceAIStatusClick("complete")}
                                                        title='Complete VoiceAI' disabled={localMasterJobData?.voiceaiCaseStatus === "complete"} size='small' ><DoneOutlinedIcon className='mr-2' /> Mark VoiceAI as Complete</Button>}
                                                </Stack>
                                            </Menu>

                                        </> :

                                        <Button variant='contained' size='small' fullWidth className="search-button"
                                            // onClick={() => setOpenCreateQuestionModal(true)}
                                            onClick={publishJobToVoiceAI}
                                        >Push to VoiceAI</Button>
                                    }
                                </>
                                :
                                null}

                        </span>
                        <span>
                            {isIDIBUSettingEnabled ?
                                <>
                                    {(localMasterJobData?.idibuJob && localMasterJobData?.idibuJobId) ?

                                        <>
                                            <div id='assigIdibuText' className='activeButtonLink' ref={idibuSourceRef}
                                                onClick={() => setShowIdibuSourceList(true)} ><FiberManualRecordIcon className='mt-1' sx={{ height: "14px", paddingBottom: "2px" }} /> <span> Job Published</span></div>
                                            <Menu
                                                anchorEl={idibuSourceRef.current}
                                                open={showIdibuSourceList}
                                                onClose={() => setShowIdibuSourceList(false)}
                                                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                                                transformOrigin={{ vertical: "top", horizontal: "left" }}
                                                slotProps={{
                                                    paper: {
                                                        sx: {
                                                            overflow: "auto", maxHeight: '24rem',
                                                        }
                                                    }
                                                }} >
                                                <div className='vj-publish-job-menu'>
                                                    <MenuItem
                                                        onClick={() => {
                                                            setIsEditMode(true);
                                                            setOpenAddJobBoardModal(true);
                                                        }}>
                                                        <ListItemIcon sx={{ mr: -1.5 }}>
                                                            <EditRoundedIcon fontSize='small' htmlColor='#212121' />
                                                        </ListItemIcon>
                                                        <ListItemText primary={"Edit or Publish to Job Boards"} />
                                                    </MenuItem>
                                                    <DeleteJobPortal
                                                        refetch={(refresh?: boolean) => {
                                                            if (refresh) {
                                                                getJobDetails();
                                                            }
                                                            setShowIdibuSourceList(false);
                                                        }}
                                                        jobPortalsData={editJobPortalData}
                                                        masterJobData={localMasterJobData}
                                                    />
                                                </div>

                                            </Menu>

                                        </> :

                                        <Button className="search-button" size='small' color='primary' variant='contained'
                                            onClick={openBoardModal} >
                                            Publish
                                        </Button>
                                    }
                                </>
                                :
                                null
                            }
                        </span>

                    </Grid>

                </Grid>
            </Grid>
            <div className='jobdetailscard'>

                <Card className='customCard'>
                    <CardContent className='py-0'>
                        <Grid container >
                            <Grid size="auto" sx={{ width: 'calc(100% - 1px)' }}>
                                <Grid container spacing={1} alignContent="center">
                                    {
                                        jobData.map((item, index) => {
                                            return item.buttonLabel || item?.onClick ? null :
                                                <Grid size={4} key={index} className='pb-1'>
                                                    <Stack direction="row" spacing={1}>
                                                        <div className={`myLabel`}>{item.label}</div>
                                                        <div className="viewJobData">{item.value}</div>
                                                    </Stack>

                                                </Grid>
                                        })
                                    }
                                </Grid>
                            </Grid>

                        </Grid>
                    </CardContent>
                </Card>


            </div >
            {
                jobsCount ?
                    <Suspense fallback={<CircularProgress className="centered" />} >
                        <ViewJobDetails jobCount={jobsCount} masterJobData={localMasterJobData} value={activeTab}
                            handleTabsChange={handleTabsChange} refreshJobData={isRefreshJobData} handleJobRefreshed={() => setIsRefreshJobData(false)} loadJobDatabase={getJobDetails}
                        />
                    </Suspense>
                    :
                    null
            }

            {
                (openAddJobModal) ?
                    <Suspense fallback={<CircularProgress className="centered" />} >
                        <AddJob
                            open={openAddJobModal}
                            closePopup={(addOrCancel: string) => {
                                setOpenAddJobModal(false);
                                if (addOrCancel) {
                                    getJobDetails();
                                    fetchCount();
                                    setIsRefreshJobData(true);
                                }
                            }
                            }
                            add={false}
                            jobData={editJobData}


                        />
                    </Suspense>
                    :
                    null
            }
            {
                assignWorkflowOpen ?
                    <Dialog
                        // onClose={closePopFromChild}
                        // aria-labelledby="customized-dialog-title"
                        open={assignWorkflowOpen}
                        id="AssignWorkflow"
                        sx={{
                            "& .MuiDialog-container": {
                                "& .MuiPaper-root": {
                                    width: "100%",
                                    maxWidth: 675,  // Set your width here
                                    minHeight: 350
                                },
                            },
                        }}
                    >
                        <DialogTitle sx={{ m: 0, p: 2 }} >
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <span >Assign workflow</span>
                                <IconButton
                                    aria-label="close"
                                    onClick={() => hideAssignWorkflow(false)}
                                    className="closeBtn"
                                >
                                    <CloseIcon />
                                </IconButton>
                            </Grid>
                        </DialogTitle>
                        <DialogContent dividers>
                            <Suspense fallback={<CircularProgress className="centered" />} >
                                <AssignWorkflow ref={assignWorkflowRef} closePopup={(isUpdated) => hideAssignWorkflow(isUpdated)} />
                            </Suspense>
                        </DialogContent>
                        <DialogActions>
                            <Button color="primary" type='button' onClick={() => assignWorkflowRef.current?.assignWorkflow(jobId || "")} size="medium" variant="contained">
                                Assign
                            </Button>
                        </DialogActions>
                    </Dialog>
                    :
                    null
            }

            {
                workflowSchedulingOpen ?
                    <Suspense fallback={<CircularProgress className="centered" />} >
                        <EditWorkflowScheduling open={workflowSchedulingOpen} schedulingData={workflowData.schedulesList} closePopup={() => {
                            setWorkflowSchedulingOpen(false);
                            setShowWorkflowList(false);
                        }} getEditWorkflow={getEditWorkflow} />
                    </Suspense>
                    :
                    null
            }

            {
                (openAddJobBoardModal) ?
                    <Suspense fallback={<CircularProgress className="centered" />} >
                        <AddJobPortal
                            open={openAddJobBoardModal}
                            closePopup={(type: any) => {
                                if (type === "add") {
                                    getJobDetails();
                                }
                                setShowIdibuSourceList(false);
                                setOpenAddJobBoardModal(false);
                                setIsEditMode(false);
                            }}
                            add={!isEditMode}
                            jobData={(localMasterJobData?.idibuJob && localMasterJobData?.idibuJobId) ? { ...editJobPortalData, jobBoardsExistingData } : editJobData}
                            idibuSources={localMasterJobData?.idibuSource}
                        />
                    </Suspense>
                    :
                    null
            }

            {openCreateQuestionModal &&
                <CreateQuestionsModal
                    open={openCreateQuestionModal}
                    closePopup={() => { setOpenCreateQuestionModal(false) }}
                    jobIds={[jobId as string]}
                    loadJobs={() => {
                        setOpenCreateQuestionModal(false);
                        getJobDetails();
                    }}
                />}

        </div >
    );
}

export default ViewJob;
