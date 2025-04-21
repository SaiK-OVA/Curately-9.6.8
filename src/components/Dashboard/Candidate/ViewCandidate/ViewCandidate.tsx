import { React, useState, useEffect, useCallback } from '../../../../shared/modules/React';
// import { InputMask } from 'primereact/inputmask';
import { debounce } from 'lodash';

import { trackPromise } from "../../../../shared/modules/PromiseTrackter";

import { useFormik } from '../../../../shared/modules/Formik';
import { DateTime } from '../../../../shared/modules/Luxon';


import { Box } from '../../../../shared/modules/MaterialImports/Box';
import { Tabs, Tab } from '../../../../shared/modules/MaterialImports/Tabs';
import { Grid } from '../../../../shared/modules/MaterialImports/Grid';
import { Typography } from '../../../../shared/modules/MaterialImports/Typography';
import { TextField, FormControlLabel } from '../../../../shared/modules/MaterialImports/FormInputs';
import { Select } from '../../../../shared/modules/MaterialImports/FormElements';
import { Tooltip } from '../../../../shared/modules/MaterialImports/ToolTip';
import { Button, IconButton } from '../../../../shared/modules/MaterialImports/Button';
import { Menu, MenuItem } from '../../../../shared/modules/MaterialImports/Menu';
import { Switch } from '../../../../shared/modules/MaterialImports/Switch';
import { Popover } from '../../../../shared/modules/MaterialImports/Popover';
import { Stack } from '../../../../shared/modules/MaterialImports/Stack';
import { Rating } from '../../../../shared/modules/MaterialImports/Rating';
import { FormGroup } from '../../../../shared/modules/MaterialImports/FormGroup';


import CloudIcon from '@mui/icons-material/Cloud';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AddIcon from '@mui/icons-material/Add';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import CardTravelOutlinedIcon from '@mui/icons-material/CardTravelOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import OpenInFullRoundedIcon from '@mui/icons-material/OpenInFullRounded';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HelpIcon from '@mui/icons-material/Help';
import ErrorIcon from '@mui/icons-material/Error';
//import RefreshIcon from '@mui/icons-material/Refresh';
// import AutorenewIcon from '@mui/icons-material/Autorenew';
// import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import EditIcon from '@mui/icons-material/Edit';
// import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
// import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
// import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
// import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';




import updateDocumentTitle from '../../../../shared/services/title';
import ApiService from "../../../../shared/api/api";
import { userLocalData } from "../../../../shared/services/userData";
import { PreferencesData } from '../../../../shared/data/Community/Preferences';
import { showToaster } from '../../../shared/SnackBar/SnackBar';
import { confirmDialog } from '../../../shared/ConfirmDialog/ConfirmDialog';
import USPhoneFormat from '../../../../shared/utils/USPhoneFormat';
import masterStatesList from '../../../../shared/data/States';
import IsValidUrl from '../../../../shared/utils/IsValidUrl';
import Parsable from '../../../../shared/utils/Parsable';

// import { candidateData } from '../../../../shared/data/Community/CandidateData';
// import { AccordionDetails, AccordionSummary, ExpandMoreIcon } from '../../../../shared/modules/MaterialImports/Accordion';



import { MUIAutoComplete } from '../../../shared/MUIAutoComplete/MUIAutoComplete';

import ShortlistBar from './ViewCandidateTabs/Shortlist/ShortlistBar';

import PhoneDialog from '../../../shared/PhoneDialog/PhoneDialog';
import EmailDialogBox from '../../../shared/EmailDialogBox/EmailDialogBox';
import BasicBreadcrumbs from '../../../../shared/components/BreadCrumbs/BreadCrumbs';
// import Applications from './ViewCandidateTabs/Applications/Applications';
import Resume from './ViewCandidateTabs/Resume/Resume';
// import Interviews from './ViewCandidateTabs/Interviews/Interviews';
import Documents from './ViewCandidateTabs/Documents/Documents';
import Profile from './ViewCandidateTabs/Profile/Profile';
import EditCandidate from '../EditCandidate/EditCandidate';
// import Submissions from './ViewCandidateTabs/Submissions/Submissions';

import AddResumeModal from './CandidateTopCard/Popups/AddResumeModal/AddResumeModal';
import AddMatchToModal from './CandidateTopCard/Popups/AddMatchToModal/AddMatchToModal';
import AddDocumentModal from './CandidateTopCard/Popups/AddDocumentModal/AddDocumentModal';
import ResumePopup from './ViewCandidateTabs/ResumePopup/ResumePopup';
import ModuleFormAnswer from '../../Settings/CustomForms/ModuleFormAnswer/ModuleFormAnswer';
import Activities from '../../../shared/Activities/Activities';
// import Matches from './Matches/Matches';
import UserActivity from './ViewCandidateTabs/History/UserActivity';
import UpgradeOutlinedIcon from '@mui/icons-material/UpgradeOutlined';

// import { triggerBase64Download } from 'react-base64-downloader';

// const PhoneDialog = lazy(() => import('../../../shared/PhoneDialog/PhoneDialog'));
// const EmailDialogBox = lazy(() => import('../../../shared/EmailDialogBox/EmailDialogBox'));
// const BasicBreadcrumbs = lazy(() => import('../../../../shared/components/BreadCrumbs/BreadCrumbs'));
// const Applications = lazy(() => import('./ViewCandidateTabs/Applications/Applications'));
// const Resume = lazy(() => import('./ViewCandidateTabs/Resume/Resume'));
// const Interviews = lazy(() => import('./ViewCandidateTabs/Interviews/Interviews'));
// const Documents = lazy(() => import('./ViewCandidateTabs/Documents/Documents'));
// const Profile = lazy(() => import('./ViewCandidateTabs/Profile/Profile'));
// const EditCandidate = lazy(() => import('../EditCandidate/EditCandidate'));
// const Submissions = lazy(() => import('./ViewCandidateTabs/Submissions/Submissions'));

// const AddResumeModal = lazy(() => import('./CandidateTopCard/Popups/AddResumeModal/AddResumeModal'));
// const AddMatchToModal = lazy(() => import('./CandidateTopCard/Popups/AddMatchToModal/AddMatchToModal'));
// const AddDocumentModal = lazy(() => import('./CandidateTopCard/Popups/AddDocumentModal/AddDocumentModal'));
// const ResumePopup = lazy(() => import('./ViewCandidateTabs/ResumePopup/ResumePopup'));
// const ModuleFormAnswer = lazy(() => import('../../Settings/CustomForms/ModuleFormAnswer/ModuleFormAnswer'));
// const Activities = lazy(() => import('../../../shared/Activities/Activities'));

// import EmailList from '../ViewCandidate/EmailList';
// import { useParams } from 'react-router-dom';
// import Overview from './ViewCandidateTabs/Overview/Overview';
// import CandidateTopCard from './CandidateTopCard/CandidateTopCard';
// import Shortlist from './ViewCandidateTabs/Shortlist/Shortlist';
// import Card from '@mui/material/Card';
// import Tooltip from '@mui/material/Tooltip';
// import { FormControlLabel } from '@mui/material';
// import Divider from '@mui/material/Divider';
// import Accordion from '@mui/material/Accordion';
// import { Divider } from '@mui/material';

import './ViewCandidate.scss';
import SubTabs from './SubTabs';
// import PDLBreadCrumbs from '../../Resume/People/components/Profile/PDLBreadCrumbs';
import UpgradeButton from '../../../shared/UpgradeButton/UpgradeButton';
import Mask from '../../../../shared/utils/Mask';
import CandidateCommonAPIs from '../../../../shared/utils/SaveCandidate/SaveCandidate';
import { useNavigate } from 'react-router-dom';

import PhoneInput from './PhoneInput';
import { ID_SETTINGS_HIRING_WORKFLOW, ID_SETTINGS_SOVREN } from '../../../../shared/services/Permissions/IDs';
import Convert from '../../../../shared/utils/Convert';

function tabProperties(index: number) {
    return {
        id: `candidateTabs-${index}`,
        'aria-controls': `candidateTabsPanel-${index}`,
        value: index,
    };
}
export interface ShortlistInterface {
    statusLog: any;
    // {
    //     json: any;
    //     recrId: string;
    //     recruiterName: string;
    //     sortDate: any,
    //     stageId: string;
    //     stageLabel: string;
    //     statusDate: string;
    //     qas?: {
    //         question: string;
    //         answer: string
    //     }[];
    //     customJson?: any;
    //     customStageName?: string;
    //     isCustomForm?: boolean;
    // }[]
    shortlistCurrentStatus: string;
    shortlistPrevStatus: string;
    shortlistLog: ShortlistLog;
    openId: string;
    currentStatusName: string;
    jobTitle?: string
}
export interface JobsList {
    currentJob: JobDetail
    jobsList: JobDetail[]
}
interface JobDetail { jobId: number; jobTitle: string; statusName: string; }
export interface CandidateStatus {
    candidateStatusId: string;
    candidateStatusName: string;
}

interface ShortlistLog {
    candid: string,
    currstatus: string,
    jobid: string,
    nextaction: [
        { name: string, id: string }
    ],
    prevstatus: string,
    recrid: string,
    statuslog: [{}],
    userid: string
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}


interface usersContactValues {
    userContId: string;
    userId: string;
    contType: string;
    contValue: string;
    contCatg: string;
    contVerified: number;
    contPrimary: boolean;
    clientId: string;
}

interface CandidateInterface {
    summary: string;
    communityStatus: string;
    workHistory: {
        endDate: string;
        companyName: string;
        jobTitle: string;
        startDate: string;
    }[];
    EducationList: {
        userEducationID: number;
        userID: number;
        schoolName: string;
        degreeType: string;
        degreeName: string;
        degreeCompletionDate: string;
        isManual: number;
        modifiedDateTime: string;
    }[];
    skillsList: {
        userSkillID: number;
        userId: number;
        skillID: number;
        skillLevelID: number;
        isManual: boolean;
        skillName: string;
    }[];
    LanguageDetailsList: {
        isManual: boolean;
        langCode: string;
        langExpertLookupID: boolean;
        modifiedDateTime: string;
        userID: boolean;
        userLangID: boolean;
    }[];
    SocialDetailsList: {
        isManual: boolean;
        socialTypeLookupID: number;
        socialURL: string;
        userId: number;
        userSocialID: number;
    }[];
    TrainingList: {
        completedYear: string;
        fileID: number;
        fileName: string;
        institutionName: string;
        isManual: boolean;
        modifiedDateTime: string;
        trainingName: string;
        trainingTypeLookupID: number;
        userId: number;
        userTrainingID: number;
    }[];
    CertList: {
        authorityName: string;
        certName: string;
        certTypeLookupID: number;
        completedYear: string;
        credentialID: string;
        isManual: boolean;
        modifiedDateTime: string;
        userCertID: number;
        userID: number;
    }[];
    firstName: string;
    lastName: string;
    userStatus: string;
    empPrefLookupID: string;
    rating: number | string;
    resumeName: string;
    contactaddress: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    contPrimary: string;
    talentpool: any[];
    tags: any[];
    sequence: any[];
    email: string;
    cellPhone: string;
    userContactInfoList: any[];
    msdeg: string;
    msmajor: string;
    msyear: number;
    phd: string;
    bs: string;
    bsdeg: string;
    bsmajor: string;
    bsyear: string;
    preferences: any;
    resumeId: string;
    cellPhone2: string;
    verifiedPhone: boolean;
}


function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`candidateTabsPanel-${index}`}
            aria-labelledby={`candidateTabsPanel-${index}`}
            {...other}
            className='candidateTabsPanel customTabsPanel'
        >
            {value === index && (
                <Box sx={{ p: 3 }} className={`${value === index ? "" : "d-none"}`}>
                    {children}
                </Box>
            )}
        </div>
    );
}

export interface RestrictMaskInterface {
    isShowEmail: boolean;
    isShowPhone: boolean;
    isPackageEmailValidity: "VIEW BUTTON" | "VIEW" | "EMPTY" | "UPGRADE" | "UPGRADE BUTTON";
    isPackagePhoneValidity: "VIEW BUTTON" | "VIEW" | "EMPTY" | "UPGRADE" | "UPGRADE BUTTON";
    emailType: number;
    phoneType: number;
}



// Import JSON data
const ViewCandidate = ({ candidateId, jobId: jobIdFromQuery, isInModal = false }: { candidateId: string, jobId: string; isInModal?: boolean; }) => {
    // , sourceId       , sourceId?: string


    const [restrictMaskValidationState, setRestrictMaskValidationState] = useState<RestrictMaskInterface>({
        isShowEmail: true,
        isShowPhone: true,
        isPackageEmailValidity: "EMPTY",
        isPackagePhoneValidity: "EMPTY",
        emailType: 0,
        phoneType: 0
    });

    const [jobId, setJobId] = useState("")
    const isCRMDisabled = !userLocalData.adminSettings(30003);
    const [contactInfoPopoverAnchorEl, setContactInfoPopoverAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    // const [documentData, setDocumentData] = useState<any>(null);
    // const [isEditMode, setIsEditMode] = useState(false);
    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setContactInfoPopoverAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setContactInfoPopoverAnchorEl(null);
        contactInfoFormik.resetForm();
        setSelectedContUserId(0);
    };

    // const [checkedPrimary, setCheckedPrimary] = useState(false);
    const contactInfoPopoverOpen = Boolean(contactInfoPopoverAnchorEl);
    // const id = open ? 'simple-popover' : undefined;

    // const [addNewPhoneOrEmail, setAddNewPhoneOrEmail] = useState({
    //     type: "1",
    //     phoneNumber: '',
    //     email: '',
    //     mobileType: "",
    //     mobileStatus: "",
    //     isPhonePrimary: false,
    //     isEmailPrimary: false
    // });

    const [selectedContUserId, setSelectedContUserId] = useState<any | null>(null);
    const [openResumePopup, setOpenResumePopup] = useState(false);
    const [emailOnClicked, setEmailOnClicked] = useState('');
    const [dialogPhoneStatus, setDialogPhoneStatus] = useState(false);
    const [phoneOnClicked, setPhoneOnClicked] = useState('');
    const [crmanchorEl, setCRMAnchorEl] = useState<null | HTMLElement>(null);

    const [dialogStatus, setDialogStatus] = useState(false);
    const openCRMBtn = Boolean(crmanchorEl);
    const [openAddCandidateModal, setOpenAddCandidateModal] = useState(false);
    const [addDocumentModal, setAddDocumentModal] = useState(false);

    const [addMatchToModal, setAddMatchToModal] = useState(false);
    const [addResumeModal, setAddResumeModal] = useState(false);
    const [addtolistanchorEl, setAddToListAnchorEl] = useState<null | HTMLElement>(null);
    const [isLoadCandiateActivesType, setIsLoadCandiateActivesType] = useState<any>("")

    const [addtoPoollistanchorEl, setAddToPoolListAnchorEl] = useState<null | HTMLElement>(null);
    const [addtoSeqlistanchorEl, setAddToSeqListAnchorEl] = useState<null | HTMLElement>(null);
    const [isLoadDocumentData, setIsLoadDocumentData] = useState<any>("")
    const openAddToSequenceListenBtn = Boolean(addtoSeqlistanchorEl);
    // const [updatePool, setUpdatePool] = useState("add");
    const [tagsListData, setTagsListData] = useState<any>([]);
    const openAddToListenBtn = Boolean(addtolistanchorEl);
    const [poolDistributionData, setPoolDistributionData] = useState<any>([]);
    const [sequenceListData, setSequenceListData] = useState<any>([]);
    const [userContactInfo, setUserContactInfo] = useState<any>([]);

    const [selectedTalentPool, setSelectedTalentPool] = useState({
        id: "",
        name: ""
    });
    const [selectedTag, setSelectedTag] = useState({
        id: "",
        name: ""
    });

    const [selectedSequence, setSelectedSequence] = useState({
        id: "",
        name: ""
    });
    const openAddToPoolListenBtn = Boolean(addtoPoollistanchorEl);
    const [value, setValue] = useState(0);
    // const [selectedResume, setSelectedResume] = useState({
    //     documentId: "", extension: ""
    // });
    const [downloadResume, setDownloadResume] = useState({ name: "", link: '' });
    const [txtResume, setTtxtResume] = useState('');

    const isHighVolumeHiringSettingEnabled = !userLocalData.adminSettings(30002);

    const updateTabValue = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        console.log(newValue)
        // if (newValue === 1) {
        //     loadSubmissionsList();
        // }
        // if (newValue === 2) {
        //     loadCandidateInterviews();
        // }
        // if (newValue === 3) {
        //     loadDocumentsList();
        // }
        if (newValue === 4) {
            //loadApplicationDetails();
            loadHistoryDetails();

        }
    };

    const [source, setSource] = useState({
        id: "",
        name: ""
    })

    const [candidateData, setCandidateData] = useState<CandidateInterface>({
        "summary": "",
        "communityStatus": "",
        "workHistory": [],
        "EducationList": [],
        "skillsList": [],
        "LanguageDetailsList": [],
        "SocialDetailsList": [],
        "TrainingList": [],
        "CertList": [],
        "firstName": "",
        "lastName": "",
        "userStatus": "",
        "empPrefLookupID": "",
        "rating": 0,
        "resumeName": "",
        "contactaddress": "",
        "street": "",
        "city": "",
        "state": "",
        "zipCode": "",
        "contPrimary": "",
        "talentpool": [],
        "tags": [],
        "sequence": [],
        "email": "",
        "cellPhone": "",
        "userContactInfoList": [],
        "msdeg": "",
        "msmajor": "",
        "msyear": 0,
        "phd": "",
        "bs": "",
        "bsdeg": "",
        "bsmajor": "",
        "bsyear": "",
        "preferences": [],
        "resumeId": "",
        "cellPhone2": "",
        "verifiedPhone": false
    });
    //const [canOverviewData, setCanOverviewData] = useState<any>([]);
    // const [htmlData, setHtmlData] = useState('');
    // const [isNameHover, setIsNameHover] = useState(false)
    // const [isMailHover, setIsMailHover] = useState(false)
    // const [isCallHover, setIsCallHover] = useState(false)
    // const [isCompanyHover, setIsCompanyHover] = useState(false)
    const [isStatusHover, setStatusHover] = useState(false);
    const [isStatusEdit, setStatusEdit] = useState(false);
    const [candidateStatus, setCandidateStatus] = useState("");

    const [isSourceEdit, setIsSourceEdit] = useState(false);
    const [candidateSource, setCandidateSource] = useState("");

    const [shortlistData, setShortlistData] = useState<ShortlistInterface>({
        statusLog: [],
        shortlistCurrentStatus: "",
        shortlistPrevStatus: "",
        shortlistLog: {
            candid: "",
            currstatus: "",
            jobid: "",
            nextaction: [
                { name: "", id: "" }
            ],
            prevstatus: "",
            recrid: "",
            statuslog: [{}],
            userid: ""
        },
        openId: "",
        currentStatusName: "",
        jobTitle: ""
    });
    //const [submissionsList, setSubmissionsList] = useState<any>([]);
    //const [candidateInterviewsList, setCandidateInterviewsList] = useState<any>([]);
    // const [ApplicationDetailsList, setApplicationDetailsList] = useState<any>([])

    const [ApplicationJobDetailsList, setApplicationJobDetailsList] = useState<JobsList>({ currentJob: { jobId: 0, jobTitle: "", statusName: "" }, jobsList: [] });
    const [HistoryDetailsList, setHistoryDetailsList] = useState<any>([])
    // const [docList, setDocList] = useState([]);

    const [candidateStatusList, setCandidateStatusList] = useState<CandidateStatus[]>([]);
    const [isCandidateLoaded, setIsCandidateLoaded] = useState(false);

    useEffect(() => {
        const fetchCandidateStatusList = () => {
            const requestData = {
                clientId: userLocalData.getvalue("clientId"),
                recrId: userLocalData.getvalue("recrId"),
            };
            trackPromise(
                ApiService.postWithData("admin", "getCandidateStatusList", requestData)
                    .then((response) => {

                        if (response.data && response.data.candidateStatusList) {
                            localStorage.setItem('candidateStatusList', JSON.stringify(response.data.candidateStatusList));
                            setCandidateStatusList(response.data.candidateStatusList);

                        }
                    })
                    .catch((error) => {
                        console.error("Error fetching candidate status list", error);
                    })
            )
        };
        const localCandidateStatusList = localStorage.getItem('candidateStatusList');
        if (localCandidateStatusList) {
            setCandidateStatusList(JSON.parse(localCandidateStatusList))
        } else {
            fetchCandidateStatusList();
        }

    }, []);

    const openWebSite = (link: string) => {
        window.open(link, '_blank');
    }

    let clientId = userLocalData.getvalue('clientId');
    // let recrId = userLocalData.getvalue('recrId');

    const contactInfoFormik = useFormik<usersContactValues>({
        initialValues: {
            userContId: '',
            userId: candidateId ? candidateId : '',
            contType: '',
            contValue: '',
            contCatg: '',
            contVerified: 0,
            contPrimary: false,
            clientId: clientId ? clientId : '',
        },
        onSubmit: (
            // values: usersContactValues
        ) => {
            // if (selectedTemplateId) {
            // console.log(contactInfoFormik.values)
            handleSaveContactInfo(contactInfoFormik.values);
            // }
        },
    });

    console.log(contactInfoFormik.values.contValue)
    const handleSaveContactInfo = (contactData: any) => {
        if (contactData.contType === "") {
            showToaster("Please Select Contact Type", "warning");
            return false;
        } else if (contactData.contValue === "") {
            showToaster(`Please enter Valid ${(Number(contactData.contType) === 2) ? 'Email' : 'Phone'}`, "warning");
            return false;
        }
        if ((Number(contactInfoFormik.values.contType) === 2) || (Number(contactData.contType) === 2)) {
            let emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
            if (!emailRegex.test(contactData.contValue)) {
                showToaster("Please enter Valid Email", "warning");
                return false;
            }
        } else if ((Number(contactInfoFormik.values.contType) === 1) || (Number(contactData.contType) === 1)) {
            const regex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
            if (!contactData.contValue || regex.test(contactData.contValue) === false) {
                showToaster("Please enter Valid Phone", "warning");
                return false;
            }
        }

        const data = {
            "userContId": contactData?.userContId ? contactData?.userContId : "",
            "userId": contactData?.userId ? contactData?.userId : "",
            "contType": contactData?.contType ? contactData?.contType : "",
            "contCatg": contactData?.contCatg ? contactData?.contCatg : "",
            "contValue": contactData?.contValue ? contactData?.contValue : "",
            "createdBy": userLocalData.getvalue('recrId'),
            "modifyBy": userLocalData.getvalue('recrId'),
            "clientId": userLocalData.getvalue('clientId'),
            "primary": contactData?.contPrimary ? true : false,
            "phoneVerified": contactData?.contVerified ? contactData?.contVerified : 0,
        };

        trackPromise(
            ApiService.postWithData('admin', 'usersContactInfo', data).then((response) => {
                //  console.log(response.data);
                if (response.data.Success === true) {
                    showToaster("Contact Info Added Successfully", "success");
                    contactInfoFormik.resetForm();
                    loadCanidateData();
                    handleClose();
                } else {
                    showToaster(response.data.Message, "error");
                }
            })
        );
    };

    const handlePrimaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // setCheckedPrimary(event.target.checked);
        /// const numericValue: number = event.target.checked ? 1 : 0;
        contactInfoFormik.setFieldValue('contPrimary', event.target.checked);
    }

    // https://www4.accuick.com/Accuick_API/Curately/Candidate/rating.jsp?clientId=2&userId=11338&rating=3
    const loadCanidateData = useCallback(debounce(() => {
        const dataToPass = {
            "userId": candidateId ? Number(candidateId) : '',
            "clientId": clientId ? clientId : '',
            recrId: userLocalData.getvalue('recrId'),
            isExtension: true // (userLocalData.isChromeExtensionEnabled() || userLocalData.adminSettings(ID_SETTINGS_HIRING_WORKFLOW)) ? true : false
        }
        trackPromise(
            ApiService.postWithData('admin', 'getEmployeeBasicDetails', dataToPass)
                .then(
                    (response: any) => {
                        // console.log(response.data.response.communityStatus)
                        // console.log(response.data.response.userContactInfoList);
                        let tempCandidateContactList: { contType: number; contCatg: string; contValue: string; userContId: string; contVerified: string; contPrimary: boolean; isEditable: boolean; }[] = [];
                        if (response.data.response.userContactInfoList?.length) {
                            for (let uci = 0; uci < response.data.response.userContactInfoList.length; uci++) {
                                // modifyBy: 1893
                                // modifyDate: "2024-07-30 06:08:09.0"
                                // userId: 40526
                                const uciElement = response.data.response.userContactInfoList[uci];
                                if (uciElement.contValue?.trim()) {
                                    let tempData = {
                                        contType: uciElement.contType,
                                        contCatg: uciElement.contCatg,
                                        contValue: uciElement.contValue,
                                        userContId: uciElement.userContId,
                                        contVerified: uciElement.IsPhoneverified,
                                        contPrimary: uciElement.IsPrimary ? true : false,
                                        isManual: uciElement.isManual ? true : false,
                                        isEditable: true
                                    }
                                    tempCandidateContactList.push(tempData);
                                }
                            }
                        }
                        if (response.data.response.email?.trim()) {
                            let contPrimary = false;
                            let tempObjToCheck = tempCandidateContactList.find(obj => (obj.contPrimary && (obj.contType === 2)));
                            if (tempObjToCheck) {

                            } else {
                                contPrimary = true;
                            }
                            let tempData = {
                                contType: 2,
                                contCatg: "",
                                contValue: response.data.response.email,
                                userContId: "",
                                contVerified: "",
                                contPrimary: contPrimary,
                                isEditable: false
                            }
                            tempCandidateContactList.push(tempData);
                        }
                        if (response.data.response.cellPhone?.trim()) {
                            let contPrimary = false;
                            let tempObjToCheck = tempCandidateContactList.find(obj => (obj.contPrimary && (obj.contType === 1)));
                            if (tempObjToCheck) {

                            } else {
                                contPrimary = true;
                            }
                            let tempData = {
                                contType: 1,
                                contCatg: "",
                                contValue: response.data.response.cellPhone,
                                userContId: "",
                                contVerified: "",
                                contPrimary: contPrimary,
                                isEditable: false
                            }
                            tempCandidateContactList.push(tempData);
                        }
                        if (response.data.response.cellPhone2?.trim()) {
                            let contPrimary = false;
                            let tempObjToCheck = tempCandidateContactList.find(obj => (obj.contPrimary && (obj.contType === 1)));
                            if (tempObjToCheck) {

                            } else {
                                contPrimary = true;
                            }
                            let tempData = {
                                contType: 1,
                                contCatg: "",
                                contValue: response.data.response.cellPhone2,
                                userContId: "",
                                contVerified: "",
                                contPrimary: contPrimary,
                                isEditable: false
                            }
                            tempCandidateContactList.push(tempData);
                        }
                        if (response.data.response.contPrimary?.trim()) {
                            let contPrimary = false;
                            let tempObjToCheck = tempCandidateContactList.find(obj => (obj.contPrimary && (obj.contType === 1)));
                            if (tempObjToCheck) {

                            } else {
                                contPrimary = true;
                            }
                            let tempData = {
                                contType: 1,
                                contCatg: "",
                                contValue: response.data.response.contPrimary,
                                userContId: "",
                                contVerified: "",
                                contPrimary: contPrimary,
                                isEditable: false
                            }
                            tempCandidateContactList.push(tempData);
                        }
                        // let tempCandidateContactList = [];
                        // if (response.data.response.userContactInfoList?.length) {
                        //     for (let uciElement of response.data.response.userContactInfoList) {
                        //         const tempData = {
                        //             contType: uciElement.contType,
                        //             contCatg: uciElement.contCatg,
                        //             contValue: uciElement.contValue,
                        //             userContId: uciElement.userContId,
                        //             contVerified: uciElement.IsPhoneverified,
                        //             contPrimary: uciElement.IsPrimary,
                        //             isEditable: true
                        //         };
                        //         tempCandidateContactList.push(tempData);
                        //     }
                        // } else {
                        //     // If no userContactInfoList, use the contPrimary value
                        //     if (response.data.response.contPrimary) {
                        //         tempCandidateContactList.push({
                        //             contType: 1, // Assuming type 1 for phone
                        //             contCatg: "",
                        //             contValue: response.data.response.contPrimary,
                        //             userContId: "",
                        //             contVerified: "",
                        //             contPrimary: true,
                        //             isEditable: false
                        //         });
                        //     }
                        // }

                        // // Handle email and cell phone
                        // if (response.data.response.email) {
                        //     const emailData = {
                        //         contType: 2,
                        //         contCatg: "",
                        //         contValue: response.data.response.email,
                        //         userContId: "",
                        //         contVerified: "",
                        //         contPrimary: !tempCandidateContactList.some(obj => obj.contPrimary && obj.contType === 2),
                        //         isEditable: false
                        //     };
                        //     if (!tempCandidateContactList.some(obj => obj.contValue === emailData.contValue && obj.contPrimary)) {
                        //         tempCandidateContactList.push(emailData);
                        //     }
                        // }

                        // if (response.data.response.cellPhone) {
                        //     const phoneData = {
                        //         contType: 1,
                        //         contCatg: "",
                        //         contValue: response.data.response.cellPhone,
                        //         userContId: "",
                        //         contVerified: "",
                        //         contPrimary: !tempCandidateContactList.some(obj => obj.contPrimary && obj.contType === 1),
                        //         isEditable: false
                        //     };
                        //     if (!tempCandidateContactList.some(obj => obj.contValue === phoneData.contValue && obj.contPrimary)) {
                        //         tempCandidateContactList.push(phoneData);
                        //     }
                        // }
                        // if (!userLocalData.isPaid()) {
                        //     tempCandidateContactList = tempCandidateContactList.filter(item => item.contType === 2)
                        // }
                        tempCandidateContactList = tempCandidateContactList.filter((obj, index) => {
                            return index === tempCandidateContactList.findIndex(o => obj.contValue === o.contValue);
                        });
                        tempCandidateContactList.sort((a, b) => Number(b.contPrimary) - Number(a.contPrimary) || b.contType - a.contType);
                        setTagsListData(response.data.response.tags);
                        setPoolDistributionData(response.data.response.talentpool);
                        setUserContactInfo(tempCandidateContactList);
                        loadSources(response.data?.response.source || '');
                        // if (response.data?.response?.source) {
                        // }
                        let sequenceList = [];
                        if (response.data.response.sequence && response.data.response.sequence.length) {
                            sequenceList = response.data.response.sequence.filter((ele: { sequenceID: number }, i: number) => response.data.response.sequence.findIndex((obj: { sequenceID: number }) => obj.sequenceID === ele.sequenceID) === i);
                            sequenceList = sequenceList.filter((ele: { isdelete: boolean }) => !ele.isdelete);
                            setSequenceListData(sequenceList);
                        }
                        if (userLocalData.isChromeExtensionEnabled() || userLocalData.adminSettings(ID_SETTINGS_HIRING_WORKFLOW)) {
                            setRestrictMaskValidationState({
                                isShowEmail: Boolean(response.data.response.isShowEmail),
                                isShowPhone: Boolean(response.data.response.isShowPhone),
                                isPackageEmailValidity: response.data.response.isPackageEmailValidity ? response.data.response.isPackageEmailValidity : "EMPTY",
                                isPackagePhoneValidity: response.data.response.isPackagePhoneValidity ? response.data.response.isPackagePhoneValidity : "EMPTY",
                                emailType: response.data.response.emailType ? response.data.response.emailType : 0,
                                phoneType: response.data.response.phoneType ? response.data.response.phoneType : 0,
                            });
                        }
                        (Boolean(response.data.response.isShowEmail) && Boolean(response.data.response.isShowPhone) ?
                            setValue(0) : setValue(1));
                        setIsCandidateLoaded(true);
                    }
                )).catch((err) => {
                    setIsCandidateLoaded(true);
                })
    }, 400), [candidateId, clientId])

    const addToSequenceList = (id: string, name: string) => {
        if (name && name.trim()) {
            handleProfileMenuClose();
            const saveData = {
                clientId: userLocalData.getvalue('clientId'),
                sequenceId: id,
                recrId: userLocalData.getvalue('recrId'),
                userIds: candidateId,
            }


            //https://www4.accuick.com/Accuick_API/Curately/Sequence/sequence_assign_users.jsp?clientId=2&userIds=39&sequenceId=9&recrId=61
            ApiService.postWithData('admin', 'sequenceAssignUsers', saveData)
                .then(
                    (response: any) => {
                        // console.log(response);
                        // showToaster((response.data.message) ? response.data.message : "campaign saved successfully", 'success');
                        // loadCanidateData();
                        // setSelectedSequence({ id: "", name: "" });

                        if ((response.data.message === "Success") || (response.data.Message === "Success")) {
                            showToaster("Campaign has been assigned successfully", 'success');
                            //   showToaster("Sequence has been assigned", 'success');
                            loadCanidateData();
                            setSelectedSequence({ id: "", name: "" });
                        } else {
                            showToaster(response.data.Message ? response.data.Message : "An error occured while assigning ", 'error');
                        }
                    }
                )
                .catch((error) => {
                    console.error("API Error:", error);
                });

        }
    }
    const deleteTalentPoolId = (id: string) => {
        trackPromise(
            // deleteTalentPoolCommunity/10024627/17
            // candidateId + "/" + id
            // http://52.88.252.214:90/DemoCurately/deleteTalentPoolCommunity/pool_cand_id
            // ApiService.deleteById(214, 'deleteTalentPoolCommunity', id + "/" + userLocalData.getvalue('clientId'))
            // https://www4.accuick.com/Accuick_API/Curately/talent_pool_delete_index.jsp?clientId=2&pool_cand_id=2
            ApiService.postWithData("admin", 'talentPoolDelete', { clientId: userLocalData.getvalue('clientId'), poolCandId: id })
                .then(
                    (response: any) => {
                        // console.log(response)
                        if (response.data.Success === true) {
                            showToaster("Talent Pool deleted Successfully", 'success');
                            loadCanidateData();
                        } else {
                            showToaster(response.data.Message ? response.data.Message : "An error occured while deleting", 'error');
                        }
                    }
                )
                .catch(
                    (response: any) => {
                        showToaster(response.response?.data?.Message ? response.response?.data?.Message : "An error occured while deleting", 'error');
                    }

                )
        )
    }
    const deleteTagId = (id: string) => {
        trackPromise(
            ApiService.deleteById('admin', 'deleteTagsCommunity', candidateId + "/" + id + "/" + userLocalData.getvalue('clientId'))
                .then(
                    (response: any) => {
                        // console.log(response)
                        if (response.data.Success) {
                            showToaster("Tag has been deleted Successfully", 'success');
                            loadCanidateData();
                        } else {
                            showToaster("An error occured while deleting", 'error');
                        }
                    }
                ))
    }
    const deleteSequenceId = (id: string) => {
        trackPromise(
            ApiService.postWithData('admin', 'sequenceDeleteUser', {
                sequenceId: id,
                userIds: candidateId,
                recrId: userLocalData.getvalue('recrId'),
                clientId: userLocalData.getvalue('clientId')
            })
                .then(
                    (response: any) => {
                        // console.log(response)
                        if (response.data.Message === "Success") {
                            showToaster("Campaign has been deleted Successfully", 'success');
                            loadCanidateData();
                        } else {
                            showToaster("An error occured while deleting", 'error');
                        }
                    }
                ))
    }

    const handleEditUserContactInfo = (event: React.MouseEvent<HTMLButtonElement>, contId: string) => {

        const templateToEdit = userContactInfo.find((template: any) => parseInt(template.userContId) === parseInt(contId));

        if (templateToEdit) {
            setSelectedContUserId(templateToEdit.contType);
            contactInfoFormik.setFieldValue('contType', templateToEdit.contType);
            contactInfoFormik.setFieldValue('contCatg', templateToEdit.contCatg);
            contactInfoFormik.setFieldValue('contVerified', templateToEdit.contVerified);
            contactInfoFormik.setFieldValue('contValue', templateToEdit.contValue);
            contactInfoFormik.setFieldValue('userContId', templateToEdit.userContId);
            contactInfoFormik.setFieldValue('contPrimary', templateToEdit.contPrimary ? true : false);


            setContactInfoPopoverAnchorEl(event.currentTarget);

            //   console.log("templateToEdit.contType"); 
            //   console.log(templateToEdit.contType);
        } else {
            contactInfoFormik.resetForm();
            setSelectedContUserId(0);
            handleClose();
        }

    }

    const handleContactTypeChange = (event: any) => {
        setSelectedContUserId(event.target.value);
        contactInfoFormik.setFieldValue('contType', event.target.value);
        console.log(selectedContUserId);
        console.log(event.target.value);
    };

    const handleDeleteUserContactInfo = (contId: string, contName: string) => {
        confirmDialog(`Are you sure you want to delete this Contact Info - ${contName}?`, () => {
            deleteUserContactInfoId(contId);
            setUserContactInfo((prevContacts: any) => prevContacts.filter((item: any) => item.userContId !== contId));
        });
    };

    const deleteUserContactInfoId = (id: string) => {
        let clientId = userLocalData.getvalue('clientId')
        console.log(id)
        //http://35.155.202.216:8080/QADemoCurately/deleteUserContactInfo/1/3
        try {
            ApiService.deleteById('admin', `deleteUserContactInfo/${id}`, clientId)
                .then((response: any) => {
                    if (response.data.Success === true) {
                        showToaster(response.data.Message, "success");
                        loadCanidateData();

                    } else if (response.data.Error === true) {
                        showToaster(response.data.Message, "error");
                    } else {
                        showToaster("Something went wrong", "error");
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
        catch (e) {
            // console.log(e)
            // setOpenDeletePopup(false);
        }
    }



    // https://app.curately.ai/Accuick_API/Curately/Sequence/sequence_user_delete.jsp
    const addToTagList = (id: string, name: string) => {
        if (name && name.trim()) {
            handleProfileMenuClose();
            const saveData = {
                tagId: id,
                tagName: name,
                userId: candidateId,
                createdBy: userLocalData.getvalue('recrId'),
                clientId: userLocalData.getvalue('clientId')
            }

            trackPromise(
                // :  http://35.155.202.216:8080/DemoCurately/saveorupdatetags
                ApiService.postWithData('admin', 'saveorupdatetags', saveData)
                    .then(
                        (response: any) => {
                            // console.log(response)
                            setSelectedTag({ id: "", name: "" });
                            if (response.data.Success) {
                                showToaster(response.data.Message, 'success');
                                loadCanidateData();
                            } else {
                                showToaster(response.data.Message ? response.data.Message : "An error occured while adding Tag", 'error')
                            }

                        }
                    )
            )
        }
    }

    useEffect(() => {
        //  loadDistributionList();
        //  loadTagDistributionList();
        loadCanidateData();
        // loadApplicationDetails();
    }, []);

    useEffect(() => {
        setJobId(jobIdFromQuery)
    }, [jobIdFromQuery])

    // useEffect(() => {
    //      handleRefreshShortlistBar();
    // }, [jobId]);



    const updateRating = (rating: string) => {
        // UpdateUserDetails API: (POST)
        // http://52.88.252.214:90/DemoCurately/updateuserdetails
        // {
        //     "userId": 2359,
        //     "rating": 1.5,
        //     "status": 1,
        //     "userStatus": 1, 
        //     "clientId": 2
        // }
        // Output:
        // {
        //     "Success": true,
        //     "Status": 200,
        //     "Message": "Status Updated"
        // }

        trackPromise(
            ApiService.postWithData('admin', 'updateuserdetails', { userId: candidateId, rating: rating, clientId: userLocalData.getvalue('clientId') }).then(
                (response: any) => {
                    // console.log(response.data);
                    if (response.data.Success) {
                        showToaster("Rating has been updated successfully", 'success');
                        setCandidateData({
                            ...candidateData,
                            rating: rating
                        })

                    } else {
                        showToaster(response.data.Message ? response.data.Message : "An error occurred while updating the rating", 'error');
                    }
                })
        );
    }


    const updateCandidateSource = () => {
        let tempSourceById = sourceData.find((item: { sourceName: string; sourceId: string }) => { return item.sourceId === candidateSource });
        trackPromise(
            ApiService.postWithData('admin', 'updateUserSource', { userId: candidateId, source: tempSourceById?.sourceName, clientId: userLocalData.getvalue('clientId') }).then(
                (response: any) => {
                    // console.log(response.data);
                    if (response.data.Success) {
                        setIsSourceEdit(false);
                        showToaster("Source has been updated successfully", 'success');
                        if (tempSourceById?.sourceId) {
                            setSource({
                                name: tempSourceById?.sourceName,
                                id: tempSourceById?.sourceId
                            });
                        }

                    } else {
                        showToaster(response.data.Message ? response.data.Message : "An error occurred while updating the source", 'error');
                    }
                })
        );
    }
    const [sourceData, setSourceData] = useState<{ sourceId: string, sourceName: string }[]>([]);

    const loadSources = (source: string) => {
        trackPromise(
            ApiService.getCall('admin', `getSourceList/${clientId}`)
                .then((response: any) => {
                    if (source) {
                        let tempSourceList = response.data.list || [];
                        let tempSourceById = tempSourceList.find((item: { sourceId: string }) => { return Number(item.sourceId) === Number(source) });
                        let tempSourceByName = tempSourceList.find((item: { sourceName: string }) => { return item.sourceName === source });


                        setSource({
                            id: tempSourceById?.sourceId ? tempSourceById?.sourceId : tempSourceByName?.sourceId ? tempSourceByName?.sourceId : source,
                            name: tempSourceById?.sourceId ? tempSourceById?.sourceName : tempSourceByName?.sourceName ? tempSourceByName?.sourceName : source
                        });
                        setCandidateSource(tempSourceById?.sourceId ? tempSourceById?.sourceId : tempSourceByName?.sourceName ? tempSourceByName?.sourceName : source);

                        if (!tempSourceById?.sourceId && !tempSourceByName?.sourceName) {
                            tempSourceList.push({ sourceId: source, sourceName: source })
                        }

                        // if (tempSourceById?.sourceId) {
                        //     setCandidateData({
                        //         ...candidateData,
                        //         sourceId: tempSourceById?.sourceId,
                        //         sourceName: tempSourceById?.sourceName
                        //     });
                        //     setCandidateSource(tempSourceById?.sourceId);
                        // } else if (tempSourceByName?.sourceName) {
                        //     setCandidateData({
                        //         ...candidateData,
                        //         sourceId: tempSourceByName?.sourceId,
                        //         sourceName: tempSourceByName?.sourceName
                        //     });
                        //     setCandidateSource(tempSourceByName?.sourceId);
                        // } else {

                        //     setCandidateSource(source);
                        //     tempSourceList.push({ sourceId: source, sourceName: source })
                        // }
                        setSourceData(tempSourceList);
                    } else {
                        setSourceData(response.data.list);
                    }
                })
        )
    }


    const updateCandidateStatus = () => {
        trackPromise(
            ApiService.postWithData('admin', 'updateuserdetails', { userId: candidateId, userStatus: candidateStatus, recrId: userLocalData.getvalue('recrId'), clientId: userLocalData.getvalue('clientId') }).then(
                (response: any) => {
                    // console.log(response.data);
                    if (response.data.Success) {
                        showToaster("Status has been updated successfully", 'success');
                        setCandidateData({
                            ...candidateData,
                            userStatus: candidateStatus
                        })
                        // setCandidateStatus(status);
                        setStatusEdit(false);

                    } else {
                        showToaster(response.data.Message ? response.data.Message : "An error occurred while updating the Candidate Rating", 'error');
                    }
                })
        );
    }

    const getCandidateStatus = (key: string) => {
        let statusName = "Lead";
        {
            candidateStatusList.map((status: CandidateStatus) => {
                if (status.candidateStatusId === key) {
                    statusName = status.candidateStatusName;
                }
            })
        }


        //   console.log(candidatedata);
        // switch (key) {
        //     case '-1':
        //         return "New";
        //     case '0':
        //         return "View";
        //     case '50':
        //         return "Not Qualified";
        //     case '100':
        //         return "Submitted";
        //     case '200':
        //         return "Shortlist";
        //     case '300':
        //         return "Interview";
        //     case '350':
        //         return "Client Reject";
        //     case '400':
        //         return "Offer";
        //     case '500':
        //         return "Start";
        //     case '550':
        //         return "Bad Deliver";
        //     default:
        //         return "Lead";
        // }
        return statusName;
    }


    const fetchData = useCallback(debounce(() => {
        const saveData = {
            userId: candidateId ? Number(candidateId) : '',
            clientId: clientId ? clientId : '',
            recrId: userLocalData.getvalue('recrId'),
            isExtension: true // (userLocalData.isChromeExtensionEnabled() || userLocalData.adminSettings(ID_SETTINGS_HIRING_WORKFLOW)) ? true : false
        };

        trackPromise(
            ApiService.postWithData('admin', 'getEmployeeBasicDetails', saveData)
                .then((response) => {
                    if (response.data.Success) {
                        const responseData = response.data.response;
                        if (responseData.state && responseData.state.length > 2) {
                            let tempState = masterStatesList.find(
                                (i) => i.label.toLowerCase() === responseData.state.toLowerCase()
                            );
                            responseData.state = tempState ? tempState.id : Convert.capitalizeAllLetters(responseData.state);
                        }
                        if (
                            responseData.state &&
                            responseData.state.toLowerCase() !== 'null' &&
                            responseData.state.toLowerCase() !== 'undefined'

                        ) {

                            responseData.state = Convert.capitalizeAllLetters(responseData.state);
                        } else {
                            responseData.state = "";
                        }

                        if (
                            responseData.city &&
                            responseData.city.toLowerCase() !== "null" &&
                            responseData.city.toLowerCase() !== "undefined"
                        ) {
                            responseData.city = Convert.capitalizeWords(responseData.city);
                        } else {
                            responseData.city = "";
                        }
                        if (
                            responseData.street &&
                            responseData.street.toLowerCase() !== "null" &&
                            responseData.street.toLowerCase() !== "undefined"
                        ) {
                            responseData.street = Convert.capitalizeWords(responseData.street);
                        } else {
                            responseData.street = "";
                        }
                        if (
                            responseData.firstName &&
                            responseData.firstName.toLowerCase() !== "null" &&
                            responseData.firstName.toLowerCase() !== "undefined"
                        ) {
                            responseData.firstName = Convert.capitalizeWords(responseData.firstName);
                        } else {
                            responseData.firstName = "";
                        }
                        if (
                            responseData.lastName &&
                            responseData.lastName.toLowerCase() !== "null" &&
                            responseData.lastName.toLowerCase() !== "undefined"
                        ) {
                            responseData.lastName = Convert.capitalizeWords(responseData.lastName);
                        } else {
                            responseData.lastName = "";
                        }

                        if (responseData.email?.trim()) {
                            responseData.email = responseData.email.trim();
                            if (responseData.email === "null") {
                                responseData.email = "";
                            }
                        }

                        if (responseData.SocialDetailsList[0]?.socialURL?.trim()) {
                            let socialURL = responseData.SocialDetailsList[0].socialURL.trim();
                            socialURL = socialURL.replaceAll('\\/', '/');
                            socialURL = socialURL.indexOf('://') === -1 ? 'https://' + socialURL : socialURL;
                            socialURL = IsValidUrl.check(socialURL) ? socialURL : "";
                            responseData.SocialDetailsList[0].socialURL = socialURL;
                        }
                        setCandidateData((prevState: any) => {
                            const newState = {
                                ...prevState,
                                ...responseData,
                            };
                            return newState;
                        });

                        updateDocumentTitle.set(`${responseData.firstName} ${responseData.lastName} | Candidate`);
                        setCandidateStatus(responseData.userStatus ? responseData.userStatus : "1");

                        if (responseData.resumeId) {
                            setDownloadResume({
                                name: responseData.resumeName,
                                link: `${import.meta.env.VITE_URL_AWS}curately/Sevron/${responseData.resumeId}`
                            });
                        }
                    }
                })
        );
        trackPromise(
            ApiService.postWithData('admin', 'getResumePathDetails', saveData)
                .then((response) => {
                    setTtxtResume(response.data.response.txtResume);
                })
        );

        trackPromise(
            ApiService.postWithData('admin', 'getEmployeeDetails', saveData)
                .then((response) => {

                    setCandidateData((prevState: any) => {
                        const newState = {
                            ...prevState,
                            ...response.data.response
                        };
                        return newState;
                    });

                })
        );
    }, 400), [candidateId, clientId]);

    useEffect(() => {
        if (candidateId && clientId) {
            fetchData();
        }

        return () => {
            updateDocumentTitle.set('');
        };
    }, [candidateId, clientId, fetchData]);



    // useEffect(() => {
    //     const saveData = {
    //         "userId": candidateId ? Number(candidateId) : '',
    //         "clientId": clientId ? clientId : '',
    //     }
    //     trackPromise(
    //         // ApiService.getByParams(193, '/Candidate/candidate_details.jsp', { candId: candidateId })
    //         ApiService.postWithData('admin', 'getEmployeeBasicDetails', saveData)
    //             .then(
    //                 (response: any) => {
    //                     // const result = response.data.response;
    //                     // console.log(result);
    //                     if (response.data.Success) {
    //                         if (response.data.response.state && response.data.response.state.length > 2) {
    //                             let tempState = masterStatesList.find((i) => i.label.toLowerCase() === response.data.response.state.toLowerCase());
    //                             response.data.response.state = (tempState && tempState?.label) ? tempState.id : response.data.response.state;
    //                         }
    //                         if (response.data.response.email?.trim()) {
    //                             response.data.response.email = response.data.response.email ? response.data.response.email.trim() : "";
    //                             if (response.data.response.email.trim() === "null") {
    //                                 response.data.response.email = "";
    //                             }

    //                         }
    //                         if (response.data.response.SocialDetailsList[0]?.socialURL?.trim()) {
    //                             response.data.response.SocialDetailsList[0].socialURL = response.data.response.SocialDetailsList[0].socialURL ? response.data.response.SocialDetailsList[0].socialURL.trim() : "";
    //                             response.data.response.SocialDetailsList[0].socialURL = response.data.response.SocialDetailsList[0].socialURL ? response.data.response.SocialDetailsList[0].socialURL.replaceAll('\\/', '/') : ""
    //                             response.data.response.SocialDetailsList[0].socialURL = (response.data.response.SocialDetailsList[0].socialURL && (response.data.response.SocialDetailsList[0].socialURL.indexOf('://') === -1)) ? 'https://' + response.data.response.SocialDetailsList[0].socialURL : response.data.response.SocialDetailsList.socialURL;
    //                             response.data.response.SocialDetailsList[0].socialURL = IsValidUrl.check(response.data.response.SocialDetailsList[0].socialURL) ? response.data.response.SocialDetailsList[0].socialURL : "";
    //                         }
    //                         setCandidateData(response.data.response);
    //                         // console.log(response.data.response.SocialDetailsList[0].socialURL)
    //                         updateDocumentTitle.set(response.data.response.firstName + response.data.response.lastName + ' | Candidate');
    //                         setCandidateStatus((response.data.response.userStatus && Number(response.data.response.userStatus)) ? response.data.response.userStatus : "1");
    //                         if (response.data.response.resumeId) {
    //                             setDownloadResume({
    //                                 name: response.data.response.resumeName,
    //                                 link: 'https://ovastorage.s3.us-west-2.amazonaws.com/curately/Sevron/' + response.data.response.resumeId
    //                             });
    //                         }
    //                     }
    //                     // setCandidateData({
    //                     //     firstName: String(result.firstName ? result.firstName : ""),
    //                     //     lastName: String(result.lastName ? result.lastName : ""),
    //                     //     linkedIn: String(result.linkedIn ? result.linkedIn : ""),
    //                     //     email: String(result.email ? result.email : ""),
    //                     //     email2: String(result.email2 ? result.email2 : ""),
    //                     //     cellPhone2: String(result.cellPhone2 ? result.cellPhone2 : ""),
    //                     //     workPhone: String(result.workPhone ? result.workPhone : ""),
    //                     //     street: String(result.street ? result.street : ""),
    //                     //     cellPhone: String(result.cellPhone ? result.cellPhone : ""),
    //                     //     zip: Number(result.zip ? result.zip : ""),
    //                     //     city: String(result.city ? result.city : ""),
    //                     //     state: String(result.state ? result.state : ""),
    //                     //     homePhone: String(result.homePhone ? result.homePhone : ""),
    //                     //     homePhone2: String(result.homePhone2 ? result.homePhone2 : "")


    //                     // });
    //                 }
    //             ))
    //     // trackPromise(
    //     //     ApiService.getByParams(193, 'Candidate/candidate_overview.jsp', { candId: candidateId })
    //     //         .then((response: any) => {
    //     //             // console.log(response.data.response);
    //     //             setCanOverviewData(response.data.response);
    //     //         })
    //     // );
    //     trackPromise(
    //         ApiService.postWithData('admin', 'getResumePathDetails', saveData)
    //             .then(
    //                 (response: any) => {
    //                     console.log('txtResume', response)
    //                     setTtxtResume(response.data.response.txtResume)
    //                 }

    //                 ))
    //     trackPromise(
    //         ApiService.postWithData('admin', 'getEmployeeDetails', saveData)
    //             .then(
    //                 (response: any) => {
    //                     console.log('getEmployeeDetails', response);
    //                     setCandidateData((prevState :any) => {
    //                         return {
    //                             ...prevState,      // Spread the previous state to preserve existing data
    //                             ...response.data.response      // Spread the new data to update state
    //                         };
    //                     });
    //                 }

    //             ))
    //     return () => {
    //         updateDocumentTitle.set('');
    //     }

    // }, [candidateId]);
    //const canOverviewData: UserData = jsonData;

    // const loadSubmissionsList = () => {
    //     // https://www4.accuick.com/Accuick_API/Curately/Candidate/subs_int_data.jsp?clientId=2&userId=11547&status=100
    //     trackPromise(
    //         ApiService.postWithData('admin', 'getSubsData', { userId: candidateId, status: 100, clientId: userLocalData.getvalue('clientId') }).then(
    //             (response: any) => {
    //                 // console.log(response.data.list)
    //                 setSubmissionsList(response.data.list);
    //             })
    //     );
    // }
    // const formatTitle = (title: string) => {
    //     return title.length > 22 ? title.substring(0, 22) + '...' : title;
    // }
    const handleContactStageHoverEnter = () => {
        setStatusHover(true)
        // setIsNameHover(false)
        // setIsMailHover(false)
        // setIsCallHover(false)
        // setIsCompanyHover(false)
    }
    const handleHoverLeave = () => {
        // setIsNameHover(false)
        // setIsMailHover(false)
        // setIsCallHover(false)
        // setIsCompanyHover(false)
        setStatusHover(false)
    }

    // const loadCandidateInterviews = () => {
    //     //             ApiService.getByParams(193, 'Candidate/candidate_interviews.jsp', { candId: candidateId }).then(

    //     trackPromise(
    //         ApiService.postWithData("admin", 'getSubsData', { userId: candidateId, status: 300, clientId: userLocalData.getvalue('clientId') }).then(
    //             (response: any) => {
    //                 setCandidateInterviewsList(response.data.list);
    //             }
    //         ))
    // }
    // const loadApplicationDetails = () => {
    //     let clientId = userLocalData.getvalue('clientId');
    //     trackPromise(
    //         ApiService.getCall('admin', `getUserJobs/${candidateId}/${clientId}`).then(
    //             (response: any) => {
    //                 setApplicationDetailsList(response.data?.jobs || []);
    //                 // console.log(response.data.list);
    //             }
    //         ))
    // }
    const loadApplicationJobDetails = () => {
        let clientId = userLocalData.getvalue('clientId');
        trackPromise(
            ApiService.postWithData('admin', `getCandidateJobsDetails`, {
                "clientId": clientId,
                "userId": candidateId,
                "jobId": jobId ? jobId : ""
            }
            ).then(
                (response: any) => {
                    if (response.data?.Success) {
                        let jobsList = response.data?.candidateJobsDetails || [];
                        let currentJob = {
                            jobId: 0,
                            jobTitle: "",
                            statusName: ""
                        }
                        if (response.data.currentJobDetails?.jobId) {
                            currentJob = { ...response.data.currentJobDetails, statusName: "" }
                        }
                        if (jobsList.length) {
                            if (response.data?.currentJobDetails?.jobId) {
                                let tempJobObj = jobsList.find((item: { jobId: number; jobTitle: string; statusName: string; }) => Number(jobId) === Number(item.jobId));
                                if (tempJobObj?.jobId) {
                                    currentJob = tempJobObj;
                                    jobsList = jobsList.filter((item: { jobId: number; jobTitle: string; statusName: string; }) => { return Number(item.jobId) !== Number(tempJobObj.jobId) });
                                }
                            }
                        }
                        setApplicationJobDetailsList({
                            currentJob: currentJob,
                            jobsList: jobsList || []
                        });
                        //  console.log(response.data.candidateJobsDetails);
                    } else {
                        showToaster(response.data?.Message ? response.data?.Message : "Error occured while saving ", 'error');
                    }
                }
            ))
    }


    const loadHistoryDetails = () => {
        trackPromise(
            ApiService.postWithData("admin", `getUserActivitySummary`, { userId: candidateId, next: 0, pageSize: 30, clientId: userLocalData.getvalue('clientId') }).then(
                (response: any) => {
                    let tempHistoryDetailsList = response.data.userActivitySummary;
                    // for (let hd = 0; hd < tempHistoryDetailsList.length; hd++) {
                    //     if (tempHistoryDetailsList[hd].saveDate?.trim() && DateTime.fromFormat(tempHistoryDetailsList[hd].saveDate.substring(0, 19), 'yyyy-MM-dd hh:mm:ss').isValid) {
                    //         tempHistoryDetailsList[hd].saveDate = DateTime.fromFormat(tempHistoryDetailsList[hd].saveDate.substring(0, 19), 'yyyy-MM-dd hh:mm:ss').toFormat('MM/dd/yyyy HH:mm');
                    //     }
                    // }
                    setHistoryDetailsList(tempHistoryDetailsList?.length ? tempHistoryDetailsList : []);
                    //console.log(response.data.userActivitySummary)
                }
            ))
    }

    // const loadDocumentsList = () => {
    //     trackPromise(
    //         ApiService.postWithData("admin", 'getRecruiterProfile', { clientId: userLocalData.getvalue('clientId'), userId: candidateId, jobId: jobId }).then(
    //             (response: any) => {
    //                 // console.log(response.data)
    //                 if (response.data.Message === "Success") {
    //                     if (response.data?.docs && response.data.docs.length) {
    //                         setDocList(response.data.docs);
    //                     }
    //                 }
    //             }
    //         ))
    // }

    // useEffect(() => {
    //     trackPromise(
    //         ApiService.getByParams(193, '/Candidate/getText.jsp',
    //             {
    //                 docName: `${(selectedResume.documentId) ? selectedResume.documentId : ""}.${(selectedResume.extension) ? selectedResume.extension : ""}`,
    //                 searchId: sourceId
    //             }
    //         ).then((secondApiResponse) => {

    //             if (secondApiResponse?.data?.source) {
    //                 setHtmlData(secondApiResponse?.data?.source);
    //             }
    //         }).catch((error) => {
    //             console.error('Error:', error);
    //         }));
    // }, [selectedResume, sourceId]);

    useEffect(() => {
        loadShortlistBar(candidateId, jobId);
    }, [candidateId, jobId]);

    const addToTalentPool = (id: string, name: string) => {
        if (name && name.trim()) {
            handleProfileMenuClose();
            // const saveData = {
            //     poolId: id,
            //     poolName: name,
            //     candId: candidateId,
            //     createdBy: userLocalData.getvalue('recrId'),
            //     clientId: userLocalData.getvalue('clientId')
            // }
            const saveData = {
                clientId: userLocalData.getvalue('clientId'),
                poolId: id,
                recrId: userLocalData.getvalue('recrId'),
                userIds: candidateId,
            }

            // ApiService.postWithData(214, 'savetalentpool', saveData)
            trackPromise(
                // https://www4.accuick.com/Accuick_API/Curately/talent_pool_insert_index.jsp?clientId=2&poolId=23&recrId=61&userIds=22362
                ApiService.postWithData("admin", 'talentPoolInsertIndex', saveData)
                    .then(
                        (response: any) => {
                            // console.log(response);
                            setSelectedTalentPool({ id: "", name: "" });
                            if (response.data.Message === "Success") {
                                showToaster("Pool has been assigned successfully", 'success');
                                loadCanidateData();
                            } else {
                                showToaster(response.data.Message ? response.data.Message : "An error occured while assigning ", 'error');
                            }
                        }
                    )
            )
        }
    }




    const loadShortlistBar = (cId: any, jId: any) => {
        const c = cId ? cId : candidateId;
        const j = jId ? jId : jobId;
        if (c && j) {
            // https://www4.accuick.com/Accuick_API/Curately/Candidate/getShortlistLog.jsp
            // userId
            // recrId
            // jobId
            // clientId
            trackPromise(
                //  ApiService.getByParams(193, 'Curately/Candidate/getShortlistbarLog.jsp', { jobId: jobId, userId: candidateId, recrId: userLocalData.getvalue('recrId') }).then(
                ApiService.postWithData('admin', 'getShortlistLog', { jobId: jobId, userId: candidateId, recrId: userLocalData.getvalue('recrId'), clientId: userLocalData.getvalue('clientId') }).then(
                    (response: any) => {
                        // console.log(response.data);
                        // const listResponse = JSON.stringify(response.data);
                        // let res = listResponse.replace(/\\"/g, '"');
                        // res = res.replace(/\"\[/g, '[');
                        // res = res.replace(/]\"/g, ']');
                        // const data = JSON.parse(res);
                        const data = response.data;
                        // console.log(data.statusLog);
                        let tempStatusForDates = data.statusLog;
                        if (tempStatusForDates && tempStatusForDates.length) {
                            for (let td = 0; td < data.statusLog.length; td++) {
                                tempStatusForDates[td].sortDate = new Date(tempStatusForDates[td].statusDate);
                                if (DateTime.fromFormat(tempStatusForDates[td].statusDate.substring(0, 19), 'yyyy-MM-dd hh:mm:ss').isValid) {
                                    tempStatusForDates[td].statusDate = DateTime.fromFormat(tempStatusForDates[td].statusDate.substring(0, 19), 'yyyy-MM-dd hh:mm:ss').toFormat('MM/dd/yyyy HH:mm');
                                }
                                if (tempStatusForDates[td].json) {
                                    tempStatusForDates[td].json = Parsable.isJSON(tempStatusForDates[td].json) ? JSON.parse(tempStatusForDates[td].json) : {};
                                }
                            }
                            tempStatusForDates = tempStatusForDates.sort(
                                (d1: any, d2: any) => Number(d1.sortDate) - Number(d2.sortDate),
                            );
                            data.statusLog = tempStatusForDates;
                        }
                        let currentStatusName = "";
                        if (data.currStatus && data.statusLog?.length) {
                            let tempObj = data.statusLog.find((item: { stageId: string }) => { return Number(item.stageId) === Number(data.currStatus) });
                            if (tempObj?.stageLabel) {
                                currentStatusName = tempObj.stageLabel
                            }
                        }
                        // new Date(data.statusLog[0].statusDate)
                        setShortlistData({
                            statusLog: (data.statusLog) ? data.statusLog : [],
                            shortlistCurrentStatus: (data.currStatus) ? data.currStatus : "",
                            shortlistPrevStatus: (data.prevStatus) ? data.prevStatus : "",
                            shortlistLog: data,
                            openId: (data.openId) ? data.openId : "",
                            currentStatusName,
                            jobTitle: (data.jobTitle) ? data.jobTitle : ""
                        });
                        // {"jobid":"233608","currstatus":"","nextaction":"[]","candid":"7537469","statuslog":[],"prevstatus":"","recrid":"","userid":"1893"}
                    }
                ))
        }
    }

    // const getPreferenceValue = (val: number, categoryID: number) => {

    //     let preferenceArray = PreferencesData.find((i) => i.categoryID === categoryID)
    //     //console.log(preferenceArray)
    //     if (preferenceArray?.lookupsList) {
    //         let preferenceObj = preferenceArray?.lookupsList.find((i) => i.lookupId === val)
    //         return preferenceObj?.lookupValue ? preferenceObj?.lookupValue : ""
    //     }
    //     return ""
    // }
    const getPreferenceValue = (val: number): string => {
        if (!Number.isFinite(val) || val.toString().length < 5) {
            return "";
        }
        const categoryID = parseInt(val.toString().substring(0, 5));
        const category = PreferencesData.find(item => item.categoryID === categoryID);
        if (!category) {
            return "";
        }
        const preference = category.lookupsList.find(item => item.lookupId === val);
        if (!preference) {
            return "";
        }
        return preference.lookupValue;
    };



    const handleProfileMenuClose = () => {
        // setAddSequenceAnchorEl(null);
        setCRMAnchorEl(null);
        // setMoreAnchorEl(null);
        setAddToListAnchorEl(null);
        setAddToPoolListAnchorEl(null);
        // setNameEditAnchorEl(null)
        setAddToSeqListAnchorEl(null);
    };
    const handleClickAddToSequenceListen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAddToSeqListAnchorEl(event.currentTarget);
    };
    const handleClickAddToListen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAddToListAnchorEl(event.currentTarget);
    };
    const handleClickAddToPoolListen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAddToPoolListAnchorEl(event.currentTarget);
    };

    const handleRefreshShortlistBar = (...args: any) => {
        loadShortlistBar(args[0], args[1]);
        loadApplicationJobDetails();
        // loadApplicationDetails();
    }

    const convertToBase64AndDownload = async (link: string) => {
        await fetch(`${link}`)
            .then(response => response.blob())
            .then(blob => {
                const reader = new FileReader();
                // reader.readAsArrayBuffer(blob);
                reader.readAsDataURL(blob);
                reader.onload = async function (e) {
                    // triggerBase64Download(reader.result, candidateData.firstName + " " + candidateData.lastName + '.' + link.split('.').pop())

                    const downloadLink = document.createElement('a');

                    downloadLink.href = reader.result as string;
                    downloadLink.download = candidateData.firstName + " " + candidateData.lastName + '.' + link.split('.').pop();
                    downloadLink.click();

                }
            });
    }


    const viewAPICandidate = (emailOrPhone: 'email' | 'phone', type: number) => {
        let linkedinUrlToPass = candidateData.SocialDetailsList.find((detail: any) => detail.socialURL?.includes("linkedin.com"))?.socialURL ?? "";
        if (linkedinUrlToPass.endsWith('/')) {
            linkedinUrlToPass = linkedinUrlToPass.substring(0, linkedinUrlToPass.length - 1);
        }
        CandidateCommonAPIs.save(
            linkedinUrlToPass,
            type,
            emailOrPhone,
            candidateId,
            () => {
                loadCanidateData();
            },
            (message: string) => {
                showToaster(message, 'error')
            },
            candidateData.firstName,
            candidateData.lastName
        );
    }


    // let isPdlProfile = localStorage.getItem("pdlcandName");

    const goToUpgrade = () => {
        navigate("/" + userLocalData.getvalue('clientName') + "/upgrade");
    }

    return (
        <div className='fullViewPage'>

            <Grid>
                {
                    !isInModal ?
                        <BasicBreadcrumbs />
                        :
                        null
                }
            </Grid>
            {/* {isPdlProfile && <PDLBreadCrumbs />} */}
            <Grid
                container
                direction="row"
                justifyContent="start"
                alignItems="start"
            >
                <Grid sx={{ width: 'calc(100% - 385px)' }}>

                    <div className='candidate-wrapper'>
                        <div className='candidate-container'>
                            <div className='column left'>
                                <Box className='card customCard pb-0'>
                                    <div className='card-body'>
                                        <div className='' >
                                            <Box className='pr-4 pb-2 mb-2'>

                                                <Grid
                                                    container
                                                    direction="row"
                                                    justifyContent="space-between"
                                                    alignItems="center"
                                                    className='name-box '
                                                >
                                                    <Grid sx={{ width: 'calc(100% - 275px)' }}>
                                                        <Grid
                                                            container
                                                            direction="row"
                                                            justifyContent="start"
                                                            alignItems="center"
                                                        >
                                                            {
                                                                candidateData.userStatus === "10" ?
                                                                    <FiberManualRecordIcon className='c-red mr-1' />
                                                                    :
                                                                    null
                                                            }
                                                            <Typography className='name-text showEditonHover tt-capital' variant="h6">
                                                                <Tooltip title={candidateData.firstName + " " + candidateData.lastName}>
                                                                    <>{candidateData.firstName + " " + candidateData.lastName}</>
                                                                </Tooltip>
                                                            </Typography>
                                                            <span>
                                                                {

                                                                    candidateData?.SocialDetailsList?.some((detail: any) => detail.socialURL?.includes("linkedin.com")) &&
                                                                    <Tooltip
                                                                        title={candidateData.SocialDetailsList.find((detail: any) => detail.socialURL?.includes("linkedin.com"))?.socialURL}
                                                                        className="linkedinIcon mt-1"
                                                                    >
                                                                        <LinkedInIcon
                                                                            className='c-cursor'
                                                                            onClick={() => openWebSite(candidateData.SocialDetailsList.find((detail: any) => detail.socialURL?.includes("linkedin.com"))?.socialURL ?? "")}
                                                                        />
                                                                    </Tooltip>
                                                                }
                                                            </span>


                                                            {
                                                                isStatusEdit ?
                                                                    <>
                                                                        <Grid className='ml-3' sx={{ marginRight: "10px" }}>
                                                                            <Select
                                                                                id="candidateStatus"
                                                                                size="small"
                                                                                onChange={(e) => {
                                                                                    setCandidateStatus(e.target.value);
                                                                                }
                                                                                }
                                                                                //className="sortingPopoverSelect mr-5"
                                                                                // defaultValue={"Contacted"}
                                                                                value={candidateStatus}
                                                                                sx={{ fontSize: 12, width: 150 }}
                                                                            >
                                                                                {candidateStatusList.map((status: CandidateStatus) => (
                                                                                    <MenuItem key={status.candidateStatusId} value={status.candidateStatusId}>
                                                                                        {status.candidateStatusName}
                                                                                    </MenuItem>
                                                                                ))}
                                                                                {/* {/* <MenuItem value={'1'}>Lead</MenuItem>
                                                                            <MenuItem value={'2'}>Not reviewed</MenuItem>
                                                                            <MenuItem value={'3'}>Contacted</MenuItem>
                                                                            <MenuItem value={'4'}>Presented</MenuItem>
                                                                            <MenuItem value={'5'}>Interviewing</MenuItem>
                                                                            <MenuItem value={'6'}>Offer Made</MenuItem>
                                                                            <MenuItem value={'7'}>Onboarding</MenuItem>
                                                                            <MenuItem value={'8'}>On Assignment</MenuItem>
                                                                            <MenuItem value={'9'}>Past Contractor</MenuItem>
                                                                            <MenuItem value={'10'}>Do Not Hire</MenuItem> * /}
                                                                            <MenuItem value={'-1'}>New</MenuItem>
                                                                            <MenuItem value={'0'}>View</MenuItem>
                                                                            <MenuItem value={'50'}>Not Qualified</MenuItem>
                                                                            <MenuItem value={'100'}>Submitted</MenuItem>
                                                                            <MenuItem value={'200'}>Shortlist</MenuItem>
                                                                            <MenuItem value={'300'}>Interview</MenuItem>
                                                                            <MenuItem value={'350'}>Client Reject</MenuItem>
                                                                            <MenuItem value={'400'}>Offer</MenuItem>
                                                                            <MenuItem value={'500'}>Start</MenuItem>
                                                                            <MenuItem value={'550'}>Bad Deliver</MenuItem> */}
                                                                            </Select>
                                                                        </Grid>
                                                                        <Grid >
                                                                            <Button
                                                                                variant="contained"
                                                                                color="primary"
                                                                                className='mt-2'
                                                                                size='small'
                                                                                onClick={() => { updateCandidateStatus(); }}
                                                                            >
                                                                                Save
                                                                            </Button>

                                                                        </Grid>
                                                                    </>
                                                                    :
                                                                    <Box
                                                                        onMouseEnter={handleContactStageHoverEnter}
                                                                        onMouseLeave={handleHoverLeave}
                                                                        className='ml-3'
                                                                    >
                                                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>


                                                                            <Grid size={3}>
                                                                                {/* <Typography component='p' sx={{
                                                                                fontFamily: 'Segoe UI',
                                                                                fontWeight: 600,
                                                                                fontSize: '14px',
                                                                                color: '#1A1A1A',
                                                                                // width: '70%'
                                                                            }}>
                                                                                {candidateStatus}
                                                                            </Typography> */}
                                                                                <Button
                                                                                    disableRipple
                                                                                    sx={{
                                                                                        backgroundColor: '#F0F0F0', color: '#474747', fontSize: '12px', fontWeight: '600', fontFamily: 'Segoe UI',
                                                                                        textTransform: 'capitalize', minWidth: '85px', maxWidth: '155px', width: 'max-content', height: '22px',
                                                                                        '&:hover': {
                                                                                            backgroundColor: '#CACACA'
                                                                                        }
                                                                                    }}
                                                                                    className='mr-4 py-0 fs-12'
                                                                                >
                                                                                    {getCandidateStatus(candidateStatus)}
                                                                                </Button>
                                                                            </Grid>
                                                                            {isStatusHover &&
                                                                                <Box>
                                                                                    <Button
                                                                                        disableRipple
                                                                                        startIcon={<BorderColorIcon sx={{ fontSize: '15px' }} />}
                                                                                        sx={{
                                                                                            height: '25px',
                                                                                            width: '65px',
                                                                                            color: 'var(--c-secondary-color)',
                                                                                            backgroundColor: '#FFFFFF',
                                                                                            boxShadow: '0px 2px 9px rgba(0, 0, 0, 0.1)',
                                                                                            textTransform: 'capitalize',
                                                                                            fontFamily: 'Segoe UI',
                                                                                            fontWeight: 600,
                                                                                            fontSize: '14px',
                                                                                            '& .MuiButton-startIcon>*:nth-of-type(1)': {
                                                                                                fontSize: '12px'
                                                                                            },
                                                                                            '&:hover': {
                                                                                                backgroundColor: '#F7F7F7',
                                                                                                color: 'var(--c-primary-color)',
                                                                                            }
                                                                                        }}
                                                                                        onClick={() => { setStatusEdit(true) }}
                                                                                    >
                                                                                        Edit
                                                                                    </Button>
                                                                                </Box>
                                                                            }
                                                                        </Box>
                                                                    </Box>
                                                            }
                                                            <Grid size={2}>
                                                                <Typography component='p' sx={{
                                                                    fontFamily: 'Segoe UI',
                                                                    fontWeight: 600,
                                                                    fontSize: '14px',
                                                                    color: '#1A1A1A',
                                                                    // width: '70%'
                                                                }}>
                                                                    {getPreferenceValue(candidateData?.preferences?.empAvailLookupID)}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    {

                                                        <Grid sx={{ maxWidth: '275px' }}>

                                                            <Grid
                                                                container
                                                                direction="row"
                                                                justifyContent="start"
                                                                alignItems="center"
                                                            >
                                                                {
                                                                    !userLocalData.isChromeExtensionEnabled() ?
                                                                        <span style={{ maxWidth: '132px !important' }} className='mr-4'>
                                                                            <Rating name="half-rating" defaultValue={0} precision={0.5} size="large"
                                                                                value={(Number(candidateData.rating)) ? Number(candidateData.rating) : 0} onChange={(e: any) => {
                                                                                    // console.log(e)
                                                                                    updateRating(e.target.value)
                                                                                }} />
                                                                        </span>
                                                                        :
                                                                        null
                                                                }

                                                                {/* {
                                                            (candidateData.firstName || candidateData.lastName) ?
                                                                <Tooltip title="Edit Candidadte" placement="top">
                                                                    <IconButton
                                                                        aria-label="Edit"
                                                                        onClick={() => setOpenAddCandidateModal(true)}
                                                                        className='bg-lightGrey c-darkGrey mr-1'
                                                                    >
                                                                        <EditIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                                :
                                                                null
                                                        } */}
                                                                {/* <Tooltip title="Upload Resume" placement="top">
                                                            <IconButton
                                                                aria-label="upload"
                                                                onClick={() => setAddResumeModal(true)}
                                                                className='bg-lightGrey c-darkGrey mr-1'
                                                            >
                                                                <FileUploadOutlinedIcon />
                                                            </IconButton>
                                                        </Tooltip> */}
                                                                {
                                                                    !userLocalData.isChromeExtensionEnabled() && downloadResume.link ?
                                                                        <Tooltip title="Download Resume" placement="top">
                                                                            <IconButton aria-label="download" className='bg-lightGrey c-darkGrey mr-1' onClick={() => convertToBase64AndDownload(downloadResume.link)} id='resumeDownload' ><FileDownloadOutlinedIcon /></IconButton>
                                                                            {/* <IconButton aria-label="download" className='bg-lightGrey c-darkGrey mr-1' href={downloadResume.link} target='_blank' id='resumeDownload' ><FileDownloadOutlinedIcon /></IconButton> */}
                                                                        </Tooltip>
                                                                        :
                                                                        null
                                                                }
                                                                {!userLocalData.isChromeExtensionEnabled() && isCRMDisabled ?
                                                                    <Tooltip title="Add Document" placement="top">
                                                                        <IconButton
                                                                            aria-label="download"
                                                                            onClick={() => setAddDocumentModal(true)}
                                                                            className='bg-lightGrey c-darkGrey  mr-1'
                                                                        >
                                                                            <PostAddOutlinedIcon />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                    :
                                                                    null
                                                                }
                                                                <Menu
                                                                    id="crmbtnmenu"
                                                                    anchorEl={crmanchorEl}
                                                                    open={openCRMBtn}
                                                                    onClose={handleProfileMenuClose}
                                                                    MenuListProps={{
                                                                        'aria-labelledby': 'crmbtn',
                                                                    }}
                                                                    anchorOrigin={{
                                                                        vertical: "bottom",
                                                                        horizontal: "center"
                                                                    }}
                                                                    transformOrigin={{
                                                                        vertical: "top",
                                                                        horizontal: "center"
                                                                    }}
                                                                    PaperProps={{
                                                                        style: { overflow: "visible" }
                                                                    }}
                                                                    sx={{
                                                                        width: "327px",
                                                                        height: '175px',
                                                                        borderRadius: '3px',
                                                                        marginTop: '2px',
                                                                        padding: '15px',
                                                                        '& .MuiList-root': {
                                                                            paddingTop: '0px',
                                                                            paddingBottom: '0px',

                                                                        },
                                                                        '& .MuiMenuItem-root': {
                                                                            lineHeight: '17px',
                                                                            color: '#474747',
                                                                            fontSize: '14px',
                                                                            // paddingTop: '0px',
                                                                            // paddingBottom: '0px',
                                                                            padding: '8px',
                                                                            minHeight: '20px',
                                                                            fontFamily: 'Segoe UI',
                                                                            fontWeight: '600',
                                                                            // paddingLeft: '4px',
                                                                            // paddingRight: '15px',
                                                                            '&:hover': {
                                                                                backgroundColor: 'var(--c-primary-color)',
                                                                                color: '#ffffff',
                                                                            },
                                                                        },

                                                                    }}
                                                                >
                                                                    <MenuItem disableRipple onClick={handleProfileMenuClose} sx={{
                                                                        display: 'flex', alignItems: 'center', gap: '9px', '&:hover': {
                                                                            borderRadius: '5px 5px 0px 0px'
                                                                        }
                                                                    }}>
                                                                        <Box component='span' >
                                                                            <CloudIcon sx={{ height: '11px', width: '16px' }} />
                                                                        </Box>
                                                                        Connect Salesforce
                                                                    </MenuItem>
                                                                    <MenuItem disableRipple onClick={handleProfileMenuClose} sx={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                                                                        <Box component='span' >
                                                                            <CloudIcon sx={{ height: '11px', width: '16px' }} />
                                                                        </Box>
                                                                        Connect HubSpot
                                                                    </MenuItem>
                                                                    <MenuItem disableRipple onClick={handleProfileMenuClose} sx={{
                                                                        display: 'flex', alignItems: 'center', gap: '9px', '&:hover': {
                                                                            borderRadius: '0px 0px 5px 5px'
                                                                        }
                                                                    }}>
                                                                        <Box component='span' >
                                                                            <CloudIcon sx={{ height: '11px', width: '16px' }} />
                                                                        </Box>
                                                                        Connect Greenhouse
                                                                    </MenuItem>
                                                                </Menu>
                                                                {(userLocalData.adminSettings(20001) && userLocalData.adminSettings(20002)) ?
                                                                    <Tooltip title="Add Match" placement="top">
                                                                        <IconButton
                                                                            aria-label="Match to"
                                                                            onClick={() => setAddMatchToModal(true)}
                                                                            className='bg-lightGrey c-darkGrey'
                                                                        >
                                                                            <CardTravelOutlinedIcon />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                    :
                                                                    null
                                                                }
                                                            </Grid>
                                                        </Grid>
                                                    }
                                                </Grid>

                                                <Typography component='p' className='name-sub-head'>
                                                    {
                                                        (candidateData.street?.trim() || candidateData.city?.trim() || candidateData.state?.trim()) ?
                                                            <>at </>
                                                            : null
                                                    }
                                                    {candidateData.street?.trim() && (
                                                        <span className='tt-capital'>{candidateData.street}</span>
                                                    )}
                                                    {candidateData.street?.trim() && candidateData.city?.trim() ? ", " : " "}
                                                    {candidateData.city && (
                                                        <span className='tt-capital'>{candidateData.city}</span>
                                                    )}
                                                    {candidateData.city?.trim() && candidateData.state?.trim() ? ", " : " "}
                                                    {candidateData.state?.trim() && (
                                                        <span className='tt-upper'>{candidateData.state}</span>
                                                    )}

                                                </Typography>
                                            </Box>
                                        </div>



                                        <Grid container spacing={2} className='mt-2' >
                                            <Grid size={5} className='pb-2'>
                                                <Grid size={12} className='candidateContactDetails'>
                                                    {dialogStatus && <EmailDialogBox
                                                        dialogOpen={dialogStatus}
                                                        onClose={() => setDialogStatus(false)}
                                                        name={candidateData.firstName}
                                                        emailId={emailOnClicked}
                                                        candidateId={candidateId}
                                                        jobId={jobId}
                                                    />}
                                                    {/* <Box className="mail-box">
                                                    <Box className="emailicon-wrap">
                                                        <MailOutlineOutlinedIcon className='mail-icon' />
                                                    </Box>


                                                    <Box className="box-inner">
                                                        <Box>
                                                            <Tooltip title={candidateData.email ? candidateData.email : ""} placement='bottom'>
                                                                <Typography
                                                                    className='email-text'
                                                                    onClick={() => {
                                                                        setDialogStatus(true);
                                                                        setEmailOnClicked(candidateData.email)
                                                                    }}
                                                                    sx={{ cursor: 'pointer' }}
                                                                >{candidateData.email ? candidateData.email : ""}</Typography>
                                                            </Tooltip>

                                                            <Typography className='email-subtext'>Primary</Typography>
                                                        </Box>
                                                        <Box className="hover-box">
                                                            {candidateData.email !== "" && <Button
                                                                disableRipple
                                                                className='button-hover'>
                                                                <ContentCopyOutlinedIcon sx={{
                                                                    fontSize: '15px',
                                                                    color: 'var(--c-secondary-color)'
                                                                }} />
                                                            </Button>
                                                            }
                                                            <Button
                                                                disableRipple
                                                                className='button-hover'
                                                            >
                                                                <BorderColorIcon sx={{ fontSize: '15px', color: 'var(--c-secondary-color)' }} />
                                                            </Button>
                                                            {candidateData.email !== "" && <Button
                                                                disableRipple
                                                                className='button-hover'
                                                            >
                                                                <DeleteOutlinedIcon sx={{ fontSize: '15px', color: 'var(--c-secondary-color)' }} />
                                                            </Button>
                                                            }
                                                        </Box>
                                                    </Box>
                                                </Box>



                                                <Box className="mail-box">
                                                    <Box className="emailicon-wrap">
                                                        <CallOutlinedIcon className='mail-icon' />
                                                        {candidateData.verifiedPhone ? <CheckCircleIcon className='verifiedPhoneIcon' /> : " "}
                                                    </Box>

                                                    <Box className="box-inner">
                                                        <Box>
                                                            <Typography className='email-text'
                                                                onClick={() => {
                                                                    setPhoneOnClicked(candidateData.cellPhone);
                                                                    setDialogPhoneStatus(true);
                                                                }}
                                                            >{candidateData.cellPhone ? USPhoneFormat.get(candidateData.cellPhone) : ""}</Typography>


                                                            <Typography className='email-subtext'>Primary</Typography>
                                                        </Box>
                                                        <Box className="hover-box">
                                                            {candidateData.cellPhone !== "" && <Button
                                                                disableRipple
                                                                className='button-hover'>
                                                                <ContentCopyOutlinedIcon sx={{
                                                                    fontSize: '15px',
                                                                    color: 'var(--c-secondary-color)'
                                                                }} />
                                                            </Button>
                                                            }
                                                            <Button
                                                                disableRipple
                                                                className='button-hover'
                                                            >
                                                                <BorderColorIcon sx={{ fontSize: '15px', color: 'var(--c-secondary-color)' }} />
                                                            </Button>
                                                            {candidateData.cellPhone !== "" && <Button
                                                                disableRipple
                                                                className='button-hover'
                                                            >
                                                                <DeleteOutlinedIcon sx={{ fontSize: '15px', color: 'var(--c-secondary-color)' }} />
                                                            </Button>
                                                            }
                                                        </Box>
                                                    </Box>
                                                </Box>
                                                {candidateData.email2 ?
                                                    <Box className="mail-box">
                                                        <Box className="emailicon-wrap">
                                                            <MailOutlineOutlinedIcon className='mail-icon' />
                                                        </Box>
                                                        <Box className="box-inner">
                                                            <Box>
                                                                <Typography className='email-text'
                                                                    onClick={() => {
                                                                        setEmailOnClicked(candidateData.email)
                                                                        setDialogStatus(false);
                                                                    }}>{candidateData.email2 ?
                                                                        candidateData.email2 : ""}
                                                                </Typography>
                                                            </Box>
                                                            <Box className="hover-box">
                                                                {candidateData.email2 !== "" && <Button
                                                                    disableRipple
                                                                    className='button-hover'>
                                                                    <ContentCopyOutlinedIcon sx={{
                                                                        fontSize: '15px',
                                                                        color: 'var(--c-secondary-color)'
                                                                    }} />
                                                                </Button>
                                                                }
                                                                <Button
                                                                    disableRipple
                                                                    className='button-hover'
                                                                >
                                                                    <BorderColorIcon sx={{ fontSize: '15px', color: 'var(--c-secondary-color)' }} />
                                                                </Button>
                                                                {candidateData.email2 !== "" && <Button
                                                                    disableRipple
                                                                    className='button-hover'
                                                                >
                                                                    <DeleteOutlinedIcon sx={{ fontSize: '15px', color: 'var(--c-secondary-color)' }} />
                                                                </Button>
                                                                }
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                    : ""
                                                }
                                                {
                                                    candidateData.cellPhone2 ?
                                                        <Box className="mail-box">
                                                            <Box className="emailicon-wrap">
                                                                <CallOutlinedIcon className='mail-icon' />
                                                            </Box>

                                                            <Box className="box-inner">
                                                                <Box>
                                                                    <Typography className='email-text'
                                                                        onClick={() => {
                                                                            setPhoneOnClicked(candidateData.cellPhone2);
                                                                            setDialogPhoneStatus(false);
                                                                        }}
                                                                    >

                                                                        {
                                                                            candidateData.cellPhone2 ?
                                                                                USPhoneFormat.get(candidateData.cellPhone2)
                                                                                :
                                                                                ""
                                                                        }
                                                                    </Typography>
                                                                </Box>
                                                                <Box className="hover-box">
                                                                    {candidateData.cellPhone2 !== "" && <Button
                                                                        disableRipple
                                                                        className='button-hover'>
                                                                        <ContentCopyOutlinedIcon sx={{
                                                                            fontSize: '15px',
                                                                            color: 'var(--c-secondary-color)'
                                                                        }} />
                                                                    </Button>
                                                                    }
                                                                    <Button
                                                                        disableRipple
                                                                        className='button-hover'
                                                                    >
                                                                        <BorderColorIcon sx={{ fontSize: '15px', color: 'var(--c-secondary-color)' }} />
                                                                    </Button>
                                                                    {candidateData.cellPhone2 !== "" && <Button
                                                                        disableRipple
                                                                        className='button-hover'
                                                                    >
                                                                        <DeleteOutlinedIcon sx={{ fontSize: '15px', color: 'var(--c-secondary-color)' }} />
                                                                    </Button>
                                                                    }
                                                                </Box>

                                                            </Box>
                                                        </Box>
                                                        : ""
                                                } */}
                                                    {/* {candidateData.homePhone &&
                                                    <Box className="mail-box">
                                                        <Box className="emailicon-wrap">

                                                            <HomeOutlinedIcon className='mail-icon' />
                                                        </Box>

                                                        <Box className="box-inner">
                                                            <Box>
                                                                <Typography className='email-text'
                                                                    onClick={() => {
                                                                        setPhoneOnClicked(candidateData.homePhone);
                                                                        setDialogPhoneStatus(true);
                                                                    }}
                                                                >
                                                                    {candidateData.homePhone ? candidateData.homePhone : ""}
                                                                </Typography>


                                                                {candidateData.homePhone &&
                                                                    <Typography className='email-subtext'>Landline</Typography>
                                                                }
                                                            </Box>
                                                            <Box className="hover-box">
                                                                {candidateData.homePhone &&
                                                                    <Button
                                                                        disableRipple
                                                                        className='button-hover'
                                                                    >
                                                                        <ContentCopyOutlinedIcon sx={{
                                                                            fontSize: '15px',
                                                                            color: 'var(--c-secondary-color)'
                                                                        }} />
                                                                    </Button>
                                                                }
                                                                <Button
                                                                    disableRipple
                                                                    className='button-hover'
                                                                >
                                                                    <BorderColorIcon sx={{ fontSize: '15px', color: 'var(--c-secondary-color)' }} />
                                                                </Button>
                                                                {candidateData.homePhone &&
                                                                    <Button
                                                                        disableRipple
                                                                        className='button-hover'
                                                                    >
                                                                        <DeleteOutlinedIcon sx={{ fontSize: '15px', color: 'var(--c-secondary-color)' }} />
                                                                    </Button>
                                                                }
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                } */}

                                                    {userContactInfo.map((item: any) => (
                                                        <Box className="mail-box" key={item.userContId || item.contValue}>
                                                            {item.contValue && (
                                                                <>
                                                                    <Box className="emailicon-wrap">
                                                                        {item.contType === 1 ? (
                                                                            <CallOutlinedIcon className='mail-icon' />
                                                                        ) : (
                                                                            <MailOutlineOutlinedIcon className='mail-icon' />
                                                                        )}
                                                                    </Box>

                                                                    <Box className="box-inner">
                                                                        <Box className="box-internal">
                                                                            {item.contType === 2 ? (
                                                                                <Tooltip title={(!restrictMaskValidationState.isShowEmail && !item.isManual) ? "" : item.contValue}>
                                                                                    <Typography
                                                                                        className='email-text'
                                                                                        onClick={() => {
                                                                                            if (restrictMaskValidationState.isShowEmail) {
                                                                                                setDialogStatus(true);
                                                                                                setEmailOnClicked(item.contValue);
                                                                                            }
                                                                                        }}
                                                                                    >{(!restrictMaskValidationState.isShowEmail && !item.isManual) ? Mask.email(item.contValue) : item.contValue}</Typography>
                                                                                </Tooltip>
                                                                            ) : (
                                                                                <Tooltip title={!restrictMaskValidationState.isShowPhone && !item.isManual ? "" : USPhoneFormat.get(item.contValue)}>
                                                                                    <Typography
                                                                                        className='email-text'
                                                                                        onClick={() => {
                                                                                            if (restrictMaskValidationState.isShowPhone) {
                                                                                                setPhoneOnClicked(item.contValue);
                                                                                                if (!userLocalData.isChromeExtensionEnabled()) {
                                                                                                    setDialogPhoneStatus(true);
                                                                                                }
                                                                                            }
                                                                                        }}
                                                                                    >
                                                                                        {!restrictMaskValidationState.isShowPhone && !item.isManual ? Mask.phone(item.contValue) : USPhoneFormat.get(item.contValue)}
                                                                                    </Typography>
                                                                                </Tooltip>
                                                                            )}

                                                                            <Typography className='email-subtext'>{item.contPrimary ? "Primary" : "Secondary"}</Typography>
                                                                        </Box>


                                                                        {
                                                                            ((item.contType === 2) && !restrictMaskValidationState.isShowEmail && !item.isManual) ?
                                                                                <UpgradeButton validationCheck={restrictMaskValidationState.isPackageEmailValidity} callViewAPI={() => viewAPICandidate('email', restrictMaskValidationState.emailType)} />
                                                                                :
                                                                                ((item.contType === 1) && !restrictMaskValidationState.isShowPhone && !item.isManual) ?
                                                                                    <UpgradeButton validationCheck={restrictMaskValidationState.isPackagePhoneValidity} callViewAPI={() => viewAPICandidate('phone', restrictMaskValidationState.phoneType)} />
                                                                                    :
                                                                                    item.isEditable && (
                                                                                        <Box className="box-internal-icons" display="flex">
                                                                                            <Button
                                                                                                disableRipple
                                                                                                className='button-hover'
                                                                                                onClick={(e: any) => {
                                                                                                    if (item.userContId) {
                                                                                                        handleEditUserContactInfo(e, item.userContId);
                                                                                                    }
                                                                                                }}
                                                                                            >
                                                                                                <BorderColorIcon sx={{ fontSize: '15px', color: 'var(--c-secondary-color)' }} />
                                                                                            </Button>
                                                                                            {item.contValue && (<Button
                                                                                                disableRipple
                                                                                                className='button-hover'
                                                                                                onClick={() => handleDeleteUserContactInfo(item.userContId, item.contValue)}
                                                                                            >
                                                                                                <DeleteOutlinedIcon sx={{ fontSize: '15px', color: 'var(--c-secondary-color)' }} />
                                                                                            </Button>
                                                                                            )}
                                                                                        </Box>
                                                                                    )}
                                                                    </Box>
                                                                </>
                                                            )}
                                                        </Box>
                                                    ))}
                                                </Grid>


                                                <Box className="box-inner" sx={{ paddingBottom: '10px' }}>
                                                    <div>
                                                        <Button className="phone" onClick={handleClick}>
                                                            <AddIcon sx={{
                                                                fontSize: '15px',
                                                                color: 'var(--c-primary-color)', marginRight: '6px'
                                                            }} />
                                                            Add Contact Details
                                                        </Button>
                                                        <Box>
                                                            <Popover
                                                                id={"contactInfoPopover"}
                                                                open={contactInfoPopoverOpen}
                                                                anchorEl={contactInfoPopoverAnchorEl}
                                                                onClose={handleClose}
                                                                anchorOrigin={{
                                                                    vertical: 'bottom',
                                                                    horizontal: 'center',
                                                                }}
                                                                transformOrigin={{
                                                                    vertical: 'top',
                                                                    horizontal: 'center',
                                                                }}
                                                            >
                                                                <form onSubmit={contactInfoFormik.handleSubmit}>
                                                                    <Box sx={{ width: '300px', paddingTop: '8px', paddingRight: '12px', paddingLeft: ' 12px', paddingBottom: '8px' }}>
                                                                        <Grid container spacing={2} className={`mb-2 ${contactInfoFormik.values.userContId === "" ? "" : "d-none"}`} >
                                                                            <Grid size={12} className='pr-2'>
                                                                                <TextField
                                                                                    label="Add Contact Type"
                                                                                    size="small"
                                                                                    fullWidth
                                                                                    name="contType"
                                                                                    id="contType"
                                                                                    value={contactInfoFormik.values.contType}
                                                                                    onChange={handleContactTypeChange}
                                                                                    //  onChange={contactInfoFormik.handleChange}
                                                                                    select
                                                                                >
                                                                                    {
                                                                                        userLocalData.isPaid() ?
                                                                                            <MenuItem value="1">Phone Number</MenuItem>
                                                                                            :
                                                                                            null
                                                                                    }
                                                                                    <MenuItem value="2">Email</MenuItem>
                                                                                </TextField>
                                                                            </Grid>
                                                                        </Grid>

                                                                        <Grid container spacing={2} className={`mb-2 ${parseInt(contactInfoFormik.values.contType) === 1 ? "" : "d-none"}`} >
                                                                            <Grid size={6} className='pr-0'>
                                                                                <TextField
                                                                                    label="Mobile"
                                                                                    id='contCatg'
                                                                                    name='contCatg'
                                                                                    size="small"
                                                                                    value={contactInfoFormik.values.contCatg}
                                                                                    fullWidth
                                                                                    onChange={contactInfoFormik.handleChange}
                                                                                    select
                                                                                    className='fs-12'
                                                                                >
                                                                                    <MenuItem value="1">Mobile</MenuItem>
                                                                                    <MenuItem value="2">Work - Direct</MenuItem>
                                                                                    <MenuItem value="3">Corporate Phone</MenuItem>
                                                                                    <MenuItem value="4">Home</MenuItem>
                                                                                    <MenuItem value="5">Other</MenuItem>
                                                                                </TextField>
                                                                            </Grid>
                                                                            <Grid size={6} className='pl-2 pr-2'>
                                                                                <TextField
                                                                                    label="Verified"
                                                                                    size="small"
                                                                                    name='contVerified'
                                                                                    id='contVerified'
                                                                                    fullWidth
                                                                                    value={contactInfoFormik.values.contVerified}
                                                                                    select
                                                                                    className='fs-12'
                                                                                    onChange={contactInfoFormik.handleChange}
                                                                                >
                                                                                    <MenuItem value={0}><HelpIcon style={{ height: '15px' }} className='c-grey mr-1' />No Status</MenuItem>
                                                                                    <MenuItem value={1}><CheckCircleIcon style={{ height: '15px' }} className='c-green mr-1' />Verified</MenuItem>
                                                                                    <MenuItem value={2}><HelpIcon style={{ height: '15px' }} className='c-lightOrange mr-1' />Questionable</MenuItem>
                                                                                    <MenuItem value={3}><ErrorIcon style={{ height: '15px' }} className='c-red mr-1' />Invalid</MenuItem>
                                                                                </TextField>
                                                                            </Grid>
                                                                        </Grid>


                                                                        <Grid container spacing={2} className={`mb-2 ${(parseInt(contactInfoFormik.values.contType) === 1 || parseInt(contactInfoFormik.values.contType) === 2) ? "" : "d-none"}`} >
                                                                            <Grid size={12} className='pr-2'>
                                                                                {(parseInt(contactInfoFormik.values.contType) === 1) ?
                                                                                    // <InputMask
                                                                                    //     id="contValue"
                                                                                    //     name="contValue"
                                                                                    //     mask="(999) 999-9999"
                                                                                    //     placeholder="(999) 999-9999"
                                                                                    //     // /^((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}$/
                                                                                    //     value={contactInfoFormik.values.contValue}
                                                                                    //     onChange={contactInfoFormik.handleChange}
                                                                                    //     className='d-block p-3 mt-1 w-100 fs-13'
                                                                                    // /> 
                                                                                    <PhoneInput
                                                                                        id="contValue"
                                                                                        name="contValue"
                                                                                        placeholder="Enter phone number"
                                                                                        defaultCountry="US"
                                                                                        // country={'us'}
                                                                                        value={contactInfoFormik.values.contValue}
                                                                                        onChange={contactInfoFormik.handleChange}
                                                                                    />
                                                                                    : <TextField
                                                                                        id="contValue"
                                                                                        name="contValue"
                                                                                        label={"Enter Email"}
                                                                                        size="small"
                                                                                        fullWidth

                                                                                        value={contactInfoFormik.values.contValue}
                                                                                        onChange={contactInfoFormik.handleChange}
                                                                                    ></TextField>
                                                                                }
                                                                            </Grid>
                                                                        </Grid>

                                                                        {/* ${parseInt(contactInfoFormik.values.contType) === 1 ? "" : "d-none"} */}
                                                                        <Grid container spacing={2} className={`mb-2 ${(parseInt(contactInfoFormik.values.contType) === 1 || parseInt(contactInfoFormik.values.contType) === 2) ? "" : "d-none"}`}>
                                                                            <Grid size={12} className='pr-3'>
                                                                                <FormGroup>
                                                                                    <FormControlLabel
                                                                                        control={<Switch checked={contactInfoFormik.values.contPrimary} onChange={handlePrimaryChange} />}
                                                                                        label={(parseInt(contactInfoFormik.values.contType) === 1) ? "Set as primary phone" : "Set as primary Email"}
                                                                                        // labelPlacement="end"
                                                                                        id="contPrimary"
                                                                                        name="contPrimary"
                                                                                        value={contactInfoFormik.values.contPrimary}
                                                                                        onChange={contactInfoFormik.handleChange}
                                                                                    />

                                                                                </FormGroup>
                                                                            </Grid>
                                                                        </Grid>

                                                                        <Box className={`cancel-btn  ${(parseInt(contactInfoFormik.values.contType) === 1 || parseInt(contactInfoFormik.values.contType) === 2) ? "" : "d-none"}`}>
                                                                            <Grid container className="mb-2" direction="row" alignItems="center"
                                                                                justifyContent='flex-start' pl='4%'>
                                                                                <Grid size={6}>
                                                                                    <Button sx={{ width: '85%' }} variant="outlined"
                                                                                        color="secondary"
                                                                                        onClick={handleClose}
                                                                                    >Cancel</Button>
                                                                                </Grid>
                                                                                <Grid size={6}>
                                                                                    <Button className="save-btn" variant="contained" type="submit" size='small'
                                                                                        color="primary" sx={{ minWidth: '85%' }}
                                                                                    >Save</Button>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Box>

                                                                    </Box>
                                                                </form>
                                                            </Popover>
                                                        </Box>
                                                    </div>
                                                </Box>
                                                {/* {userContactInfo.length > 0 && (
                                                <Accordion disableGutters sx={{ boxShadow: 'none' }}>

                                                    <AccordionSummary
                                                        expandIcon={<ArrowDropDownIcon />}
                                                        aria-controls="panel1a-content"
                                                        id="panel1a-header"
                                                        sx={{
                                                            justifyContent: 'center',
                                                            position: 'relative',
                                                            '& .MuiAccordionSummary-expandIconWrapper': {
                                                                position: 'absolute',
                                                                right: '90px',
                                                            },
                                                            '& .MuiAccordionSummary-content': {
                                                                m: 0,
                                                                flexGrow: 0,
                                                                transform: 'translateX(-8px)'
                                                            },
                                                            '&::before': {
                                                                display: 'none'
                                                            }
                                                        }}
                                                    >
                                                        <Typography sx={{ color: 'var(--c-neutral-60)', display: 'inline-flex', alignItems: 'center' }}>
                                                            More
                                                        </Typography>
                                                    </AccordionSummary>
                                                    <Divider />
                                                    <AccordionDetails sx={{ padding: '8px 25px 16px 0' }}>
                                                        {userContactInfo.map((item: any) => (
                                                            <Box className="mail-box" key={item.userContId}>
                                                                <Box className="emailicon-wrap">
                                                                    {item.contType === 1 ?
                                                                        <CallOutlinedIcon className='mail-icon' />
                                                                        : <MailOutlineOutlinedIcon className='mail-icon' />}
                                                                </Box>
                                                                <Box className="box-inner" >
                                                                    <Box className="box-internal">
                                                                        <Tooltip title={item.contValue} placement='bottom'>
                                                                            {item.contType === 2 ?
                                                                                <Typography
                                                                                    className='email-text'
                                                                                    onClick={() => {
                                                                                        setDialogStatus(true);
                                                                                        setEmailOnClicked(item.contValue);
                                                                                    }}
                                                                                    sx={{ cursor: 'pointer' }}
                                                                                >
                                                                                    {item.contValue ? item.contValue : ""}
                                                                                </Typography>
                                                                                :
                                                                                <Typography
                                                                                    className='email-text'
                                                                                    onClick={() => {
                                                                                        setPhoneOnClicked(item.contValue);
                                                                                        setDialogPhoneStatus(true);
                                                                                    }}
                                                                                >
                                                                                    {item.contValue ? USPhoneFormat.get(item.contValue) : ""}
                                                                                </Typography>
                                                                            }
                                                                        </Tooltip>
                                                                        <Typography className='email-subtext'>
                                                                            {item.contPrimary ? "Primary" : "Secondary"}
                                                                        </Typography>
                                                                    </Box>
                                                                    <Box className="box-internal-icons" display="flex">
                                                                        <Button
                                                                            disableRipple
                                                                            className='button-hover'
                                                                            onClick={(e) => {
                                                                                if (item.userContId) {
                                                                                    handleEditUserContactInfo(e, item.userContId);
                                                                                }
                                                                            }}
                                                                        >
                                                                            <BorderColorIcon sx={{ fontSize: '15px', color: 'var(--c-secondary-color)' }} />
                                                                        </Button>
                                                                        {item.contValue !== "" && (
                                                                            <Button
                                                                                disableRipple
                                                                                className='button-hover'
                                                                                onClick={() => handleDeleteUserContactInfo(item.userContId, item.contValue)}
                                                                            >
                                                                                <DeleteOutlinedIcon sx={{ fontSize: '15px', color: 'var(--c-secondary-color)' }} />
                                                                            </Button>
                                                                        )}
                                                                    </Box>
                                                                </Box>
                                                            </Box>
                                                        ))}
                                                    </AccordionDetails>
                                                </Accordion>
                                            )} */}

                                            </Grid>


                                            <Grid size={7} sx={{ borderLeft: '1px solid var(--c-border-light)' }} className='pb-2'>
                                                {
                                                    (userLocalData.adminSettings(20020) && isHighVolumeHiringSettingEnabled) ?
                                                        <Stack className='list-wrapper'>
                                                            <Box component='h6' className='list-head'>
                                                                Talent Pool:
                                                                <div>
                                                                    {poolDistributionData.map((item: any, i: number) => (
                                                                        <Box component='span' sx={{ mr: 1, mt: 1, display: 'inline-block' }} key={i}>

                                                                            <Button
                                                                                disableRipple
                                                                                endIcon={< ClearOutlinedIcon sx={{ color: '#737373', height: '10px', width: '10px' }} />}
                                                                                className='label-btn'
                                                                                // onClick={() => handleDialogClickOpen(item.poolid)}
                                                                                onClick={() => {
                                                                                    handleProfileMenuClose();
                                                                                    confirmDialog(`Are you sure you want to remove - ${item.poolName}?`, () => {
                                                                                        deleteTalentPoolId(item.pool_cand_id);
                                                                                    }, "warning"
                                                                                    );
                                                                                }}
                                                                            >
                                                                                {item.poolName}
                                                                            </Button>
                                                                        </Box>
                                                                    ))}
                                                                </div>
                                                            </Box>
                                                            <Box component='h6' sx={{ pr: 0, m: 0 }}>
                                                                <Button
                                                                    id="add-poollist-btn"
                                                                    aria-controls={openAddToPoolListenBtn ? "addpoollistmenu" : undefined}
                                                                    aria-haspopup="true"
                                                                    aria-expanded={openAddToPoolListenBtn ? 'true' : undefined}
                                                                    onClick={handleClickAddToPoolListen}
                                                                    // startIcon={<PlaylistAddOutlinedIcon />}
                                                                    disableRipple
                                                                    className='addlist-btn'
                                                                // sx={{ width: 120 }}
                                                                >
                                                                    Add
                                                                    {/* to Pool */}
                                                                </Button>
                                                                <Menu
                                                                    id="addpoollistmenu"
                                                                    anchorEl={addtoPoollistanchorEl}
                                                                    open={openAddToPoolListenBtn}
                                                                    onClose={handleProfileMenuClose}
                                                                    MenuListProps={{
                                                                        'aria-labelledby': 'add-poollist-btn',
                                                                    }}
                                                                    anchorOrigin={{
                                                                        vertical: "bottom",
                                                                        horizontal: "center"
                                                                    }}
                                                                    transformOrigin={{
                                                                        vertical: "top",
                                                                        horizontal: "center"
                                                                    }}
                                                                    PaperProps={{
                                                                        style: { overflow: "visible" }
                                                                    }}

                                                                    sx={{
                                                                        boxShadow: '0px',
                                                                        '& .MuiList-root.MuiMenu-list': {
                                                                            pt: '8px',
                                                                            pb: '15px',
                                                                            pr: '10px',
                                                                            pl: '10px'
                                                                        }
                                                                    }}
                                                                >

                                                                    <MUIAutoComplete
                                                                        id='talentPoolId'
                                                                        handleChange={(id: any, name: string) => {
                                                                            setSelectedTalentPool({ id, name });
                                                                            addToTalentPool(id, name);
                                                                        }}
                                                                        valuePassed={
                                                                            (selectedTalentPool.id) ? { label: selectedTalentPool.name, id: selectedTalentPool.id } :
                                                                                {}
                                                                        }
                                                                        isMultiple={false}
                                                                        textToShow="Talent Pool"
                                                                        width="250px"
                                                                        type='talentPool'
                                                                        placeholder="Select Pool"
                                                                    />

                                                                </Menu>
                                                            </Box>
                                                        </Stack>
                                                        :
                                                        null
                                                }
                                                {
                                                    isHighVolumeHiringSettingEnabled ?
                                                        <Stack className='list-wrapper'>
                                                            <Box component='h6' className='list-head'>
                                                                Tag:
                                                                <div>
                                                                    {tagsListData.map((item: any, i: number) => (
                                                                        <Box component='span' sx={{ mr: 1, mt: 1, display: 'inline-block' }} key={i}>
                                                                            <Button
                                                                                disableRipple
                                                                                endIcon={< ClearOutlinedIcon sx={{ color: '#737373', height: '10px', width: '10px' }} />}
                                                                                className='label-btn'
                                                                                // onClick={() => handleDialogClickOpen(item.tagId)}
                                                                                onClick={() => {
                                                                                    handleProfileMenuClose();
                                                                                    confirmDialog(`Are you sure you want to remove - ${item.tagName}?`, () => {
                                                                                        deleteTagId(item.tagId);
                                                                                    }, "warning"
                                                                                    );
                                                                                }}
                                                                            >
                                                                                {item.tagName}
                                                                            </Button>
                                                                        </Box>
                                                                    ))}
                                                                </div>
                                                            </Box>
                                                            <Box component='h6' sx={{ paddingRight: 0, m: 0 }}>
                                                                <Button
                                                                    id="add-list-btn"
                                                                    aria-controls={openAddToListenBtn ? "addlistmenu" : undefined}
                                                                    aria-haspopup="true"
                                                                    aria-expanded={openAddToListenBtn ? 'true' : undefined}
                                                                    onClick={handleClickAddToListen}
                                                                    // startIcon={<PlaylistAddOutlinedIcon />}
                                                                    disableRipple
                                                                    className='addlist-btn'
                                                                // sx={{ width: 92 }}
                                                                >
                                                                    Add
                                                                    {/* Tag */}
                                                                </Button>
                                                                <Menu
                                                                    id="addlistmenu"
                                                                    anchorEl={addtolistanchorEl}
                                                                    open={openAddToListenBtn}
                                                                    onClose={handleProfileMenuClose}
                                                                    MenuListProps={{
                                                                        'aria-labelledby': 'add-list-btn',
                                                                    }}
                                                                    anchorOrigin={{
                                                                        vertical: "bottom",
                                                                        horizontal: "center"
                                                                    }}
                                                                    transformOrigin={{
                                                                        vertical: "top",
                                                                        horizontal: "center"
                                                                    }}
                                                                    PaperProps={{
                                                                        style: { overflow: "visible" }
                                                                    }}

                                                                    sx={{
                                                                        boxShadow: '0px',
                                                                        '& .MuiList-root.MuiMenu-list': {
                                                                            pt: '8px',
                                                                            pb: '15px',
                                                                            pr: '10px',
                                                                            pl: '10px'
                                                                        }
                                                                    }}
                                                                >
                                                                    <MUIAutoComplete
                                                                        id='tagId'
                                                                        handleChange={(id: any, name: string) => {
                                                                            setSelectedTag({ id, name });
                                                                            addToTagList(id, name);
                                                                        }}
                                                                        valuePassed={
                                                                            (selectedTag.id) ? { label: selectedTag.name, id: selectedTag.id } :
                                                                                {}
                                                                        }
                                                                        isMultiple={false}
                                                                        textToShow="Select Tags"
                                                                        width="250px"
                                                                        type='tag'
                                                                        placeholder="Select / Type to create Tags"
                                                                    />
                                                                </Menu>
                                                            </Box>
                                                        </Stack>
                                                        :
                                                        null
                                                }
                                                {
                                                    userLocalData.adminSettings(20024) && isHighVolumeHiringSettingEnabled ?
                                                        <Stack className='list-wrapper'>
                                                            <Box component='h6' className='list-head'>
                                                                Campaign:
                                                                <div>
                                                                    {sequenceListData.map((item: any, i: number) => (
                                                                        <Box component='span' sx={{ mr: 1, mt: 1, display: 'inline-block' }} key={i}>
                                                                            <Button
                                                                                disableRipple
                                                                                endIcon={< ClearOutlinedIcon sx={{ color: '#737373', height: '10px', width: '10px' }} />}
                                                                                className='label-btn'
                                                                                onClick={() => {
                                                                                    handleProfileMenuClose();
                                                                                    confirmDialog(`Are you sure you want to remove - ${item.sequenceName}?`, () => {
                                                                                        deleteSequenceId(item.sequenceID);
                                                                                    }, "warning"
                                                                                    );
                                                                                }}
                                                                            >
                                                                                {item.sequenceName}
                                                                            </Button>
                                                                        </Box>
                                                                    ))}
                                                                </div>
                                                            </Box>
                                                            <Box component='h6' sx={{ paddingRight: 0, m: 0 }}>
                                                                {
                                                                    userLocalData.isChromeExtensionEnabled() && (userLocalData.getvalue('paymentType') === 1) ?
                                                                        <Button variant='contained' color='primary' size='small' className='mr-3' onClick={() => {
                                                                            goToUpgrade();
                                                                        }}
                                                                            startIcon={<UpgradeOutlinedIcon fontSize="small" />}
                                                                        >Upgrade</Button>
                                                                        :
                                                                        <Button
                                                                            id="add-seqlist-btn"
                                                                            aria-controls={openAddToSequenceListenBtn ? "addseqlistmenu" : undefined}
                                                                            aria-haspopup="true"
                                                                            aria-expanded={openAddToSequenceListenBtn ? 'true' : undefined}
                                                                            onClick={handleClickAddToSequenceListen}
                                                                            // startIcon={<PlaylistAddOutlinedIcon />}
                                                                            disableRipple
                                                                            className='addlist-btn'
                                                                        // sx={{ width: 125 }}
                                                                        >
                                                                            Add
                                                                            {/* Sequence */}
                                                                        </Button>
                                                                }

                                                                <Menu
                                                                    id="addseqlistmenu"
                                                                    anchorEl={addtoSeqlistanchorEl}
                                                                    open={openAddToSequenceListenBtn}
                                                                    onClose={handleProfileMenuClose}
                                                                    MenuListProps={{
                                                                        'aria-labelledby': 'add-seqlist-btn',
                                                                    }}
                                                                    anchorOrigin={{
                                                                        vertical: "bottom",
                                                                        horizontal: "center"
                                                                    }}
                                                                    transformOrigin={{
                                                                        vertical: "top",
                                                                        horizontal: "center"
                                                                    }}
                                                                    PaperProps={{
                                                                        style: { overflow: "visible" }
                                                                    }}

                                                                    sx={{
                                                                        boxShadow: '0px',
                                                                        '& .MuiList-root.MuiMenu-list': {
                                                                            pt: '8px',
                                                                            pb: '15px',
                                                                            pr: '10px',
                                                                            pl: '10px'
                                                                        }
                                                                    }}
                                                                >
                                                                    <MUIAutoComplete
                                                                        id='sequenceId'
                                                                        handleChange={(id: any, name: string) => {
                                                                            setSelectedSequence({ id, name });
                                                                            addToSequenceList(id, name);
                                                                        }}
                                                                        valuePassed={
                                                                            (selectedSequence.id) ? { label: selectedSequence.name, id: selectedSequence.id } :
                                                                                {}
                                                                        }
                                                                        existingSequenceIds={sequenceListData.map((item: any) => item.sequenceID)}
                                                                        isMultiple={false}
                                                                        textToShow="Select Campaign"
                                                                        width="250px"
                                                                        type='sequence'
                                                                        placeholder="Select Campaign"
                                                                    />
                                                                </Menu>
                                                            </Box>
                                                        </Stack>
                                                        :
                                                        null
                                                }
                                                <Stack className='list-wrapper'>
                                                    <Grid container direction={'row'} className='list-head' sx={{ justifyContent: "flex-start", alignItems: "center", }}>
                                                        <span className='pr-2'>Source:</span>
                                                        {
                                                            isSourceEdit ?
                                                                <>
                                                                    <TextField
                                                                        id="candidateSource"
                                                                        size="small"
                                                                        onChange={(e) => {
                                                                            setCandidateSource(e.target.value);
                                                                        }}
                                                                        value={candidateSource}
                                                                        sx={{ fontSize: 12, width: 150 }}
                                                                        select
                                                                        className='ml-3 mr-2'
                                                                    >
                                                                        {
                                                                            sourceData.map((item) => { return <MenuItem value={item.sourceId} key={item.sourceId}>{item.sourceName}</MenuItem> })
                                                                        }
                                                                    </TextField>
                                                                    <Button variant="contained" color="primary" className='ml-2' size='small' onClick={() => { updateCandidateSource(); }}>
                                                                        Save
                                                                    </Button>
                                                                    <Button variant="outlined" color="secondary" className='ml-2' size='small' onClick={() => { setIsSourceEdit(false); }}>
                                                                        Cancel
                                                                    </Button>
                                                                </>
                                                                :
                                                                <>
                                                                    {
                                                                        source.name
                                                                            ?
                                                                            <span className='label-btn'>{source.name}</span>
                                                                            :
                                                                            null
                                                                    }
                                                                    <Button disableRipple className='sourceEditIcon'
                                                                        onClick={(e: any) => { setIsSourceEdit(true); }} >
                                                                        <BorderColorIcon sx={{ fontSize: '15px', color: 'var(--c-secondary-color)' }} />
                                                                    </Button>
                                                                </>
                                                        }

                                                    </Grid>
                                                </Stack>
                                            </Grid>
                                        </Grid>


                                    </div>
                                    {
                                        (openAddCandidateModal) ?
                                            <EditCandidate
                                                open={openAddCandidateModal}
                                                closePopup={() => setOpenAddCandidateModal(false)}
                                                candidateData={candidateData}
                                            />
                                            :
                                            null
                                    }

                                    {
                                        addDocumentModal ?
                                            <AddDocumentModal
                                                dialogOpen={addDocumentModal}
                                                closePopup={() => {
                                                    setAddDocumentModal(false);
                                                    setIsLoadDocumentData(true)
                                                }}
                                                add={true}
                                                documentData={{}}
                                                candidateId={candidateId ? candidateId : ""}
                                                jobId={jobId ? jobId : ""}
                                            />
                                            :
                                            null
                                    }

                                    {
                                        addMatchToModal ?
                                            <AddMatchToModal
                                                dialogOpen={addMatchToModal}
                                                closePopup={() => setAddMatchToModal(false)}
                                                candidateId={[Number(candidateId)]}
                                                moveToVoiceAI={false}
                                            />
                                            :
                                            null
                                    }
                                    {
                                        addResumeModal ?
                                            <AddResumeModal
                                                dialogOpen={addResumeModal}
                                                handleClose={() => setAddResumeModal(false)}
                                            />
                                            :
                                            null
                                    }
                                    {
                                        dialogPhoneStatus ?
                                            <PhoneDialog
                                                dialogOpen={dialogPhoneStatus}
                                                onClose={() => {
                                                    setDialogPhoneStatus(false);
                                                    setIsLoadCandiateActivesType('SMS')
                                                }}
                                                name={candidateData.firstName}
                                                toPhone={phoneOnClicked}
                                                candidateId={(candidateId) ? candidateId : ""}
                                                jobId={jobId}
                                            />
                                            :
                                            null
                                    }

                                </Box>







                                {/* <CandidateTopCard
                                candidateData={candidateData}
                                updateSelectedResume={
                                    (e: { documentId: string, fileExt: string }) => setSelectedResume({
                                        documentId: e.documentId,
                                        extension: e.fileExt
                                    })
                                }
                            /> */}
                                {/* <Card className='customCard2'
                                sx={{ height: 'auto', py: 0, pl: 0, mb: '20px', borderRadius: 0 }}
                            > */}
                                {/* <Stack sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Stack sx={{ width: '50%' }}>
                                        <Box >
                                            <Typography sx={{
                                                pt: 1, pb: 1, pl: 3,
                                                borderBottom: '1px #E6E6E6 solid',
                                                fontFamily: 'Segoe UI', fontSize: '16px', fontWeight: 600,
                                                color: '#1A1A1A'
                                            }}>
                                                Work History
                                            </Typography>
                                            <div style={{ maxHeight: '215px', overflowY: 'auto' }}>
                                                {canOverviewData?.workHistory ? (
                                                    canOverviewData.workHistory.map((emp: any) => (
                                                        <Box sx={{ px: 2, pt: 2, pb: 1 }} key={`${emp.companyName ? emp.companyName.replace(/\\|\//g, ' ') : ""}${(emp.title && emp.title.trim()) ? emp.title.replace(/\\|\//g, ' ') : ""}`}>
                                                            <Typography component='h6' sx={{ fontFamily: 'Segoe UI', fontSize: '14px', fontWeight: 600, color: '#1A1A1A' }}>{emp.companyName ? emp.companyName.replace(/\\|\//g, ' ') : ""}</Typography>
                                                            <Typography component='p' sx={{ fontFamily: 'Segoe UI', fontSize: '14px', fontWeight: 400, color: '#474747' }}>
                                                                {emp.title ? (
                                                                    <Tooltip title={emp.title.replace(/\\|\//g, ' ')}>
                                                                        <span>{emp.title.replace(/\\|\//g, ' ')}</span>
                                                                    </Tooltip>
                                                                ) : ""}
                                                            </Typography>
                                                            <Typography component='p' sx={{ fontFamily: 'Segoe UI', fontSize: '12px', fontWeight: 400, color: '#474747' }}> {emp.startDate && DateTime.fromFormat(emp.startDate.substring(0, 7), 'yyyy-MM').isValid ? DateTime.fromFormat(emp.startDate.substring(0, 7), 'yyyy-MM').toFormat('MMM yyyy') : ""}
                                                                {emp.startDate && DateTime.fromFormat(emp.startDate.substring(0, 7), 'yyyy-MM').isValid && emp.endDate && DateTime.fromFormat(emp.endDate.substring(0, 7), 'yyyy-MM').isValid ? " to " : ""}
                                                                {emp.endDate && DateTime.fromFormat(emp.endDate.substring(0, 7), 'yyyy-MM').isValid ? DateTime.fromFormat(emp.endDate.substring(0, 7), 'yyyy-MM').toFormat('MMM yyyy') : ""}
                                                            </Typography>
                                                        </Box>
                                                    ))
                                                ) : null}
                                            </div>
                                        </Box>
                                    </Stack> */}

                                {/* <Stack sx={{ borderLeft: '1px #E6E6E6 solid', display: 'flex', flexDirection: 'column', justifyContent: 'flext-start', pl: '25px', pt: 1, pb: 2, maxHeight: '250px', overflowY: 'auto' }} direction="column" spacing={1.5} >
                                    <Grid container>
                                        <Grid size={3}>
                                            <Typography component='p' sx={{
                                                fontFamily: 'Segoe UI',
                                                fontWeight: 600,
                                                fontSize: '14px',
                                                color: '#1A1A1A',
                                                // width: '70%'
                                            }}>
                                                Candidate Status
                                            </Typography>
                                        </Grid>
                                        {
                                            isStatusEdit ?
                                                <>
                                                    <Grid size={3} sx={{ marginRight: "10px" }}>
                                                        <Select
                                                            id="sortType"
                                                            size="small"
                                                            // value={sortType}
                                                            onChange={(e) => {
                                                                setCandidateStatus(e.target.value);
                                                            }
                                                            }
                                                            //className="sortingPopoverSelect mr-5"
                                                            // defaultValue={"Contacted"}
                                                            value={candidateStatus}
                                                            fullWidth
                                                        >
                                                            <MenuItem value={'1'}>Lead</MenuItem>
                                                            <MenuItem value={'2'}>Not reviewed</MenuItem>
                                                            <MenuItem value={'3'}>Contacted</MenuItem>
                                                            <MenuItem value={'4'}>Presented</MenuItem>
                                                            <MenuItem value={'5'}>Interviewing</MenuItem>
                                                            <MenuItem value={'6'}>Offer Made</MenuItem>
                                                            <MenuItem value={'7'}>Onboarding</MenuItem>
                                                            <MenuItem value={'8'}>On Assignment</MenuItem>
                                                            <MenuItem value={'9'}>Past Contractor</MenuItem>
                                                            <MenuItem value={'10'}>Do Not Hire</MenuItem>
                                                        </Select>
                                                    </Grid>
                                                    <Grid size={1}>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            className='mt-2'
                                                            size='small'
                                                            onClick={() => { updateCandidateStatus(); }}
                                                        >
                                                            Save
                                                        </Button>

                                                    </Grid>
                                                </>
                                                :
                                                <Box
                                                    onMouseEnter={handleContactStageHoverEnter}
                                                    onMouseLeave={handleHoverLeave}
                                                >
                                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>


                                                        <Grid size={3}>
                                                            
                                                            <Button
                                                                disableRipple
                                                                sx={{
                                                                    backgroundColor: '#F0F0F0', color: '#474747', fontSize: '12px', fontWeight: '600', fontFamily: 'Segoe UI',
                                                                    textTransform: 'capitalize', minWidth: '85px', maxWidth: '155px', width: 'max-content', height: '30px',
                                                                    '&:hover': {
                                                                        backgroundColor: '#CACACA'
                                                                    }
                                                                }}
                                                                className='mr-4'
                                                            >
                                                                {getCandidateStatus(candidateStatus)}
                                                            </Button>
                                                        </Grid>
                                                        {isStatusHover &&
                                                            <Box>
                                                                <Button
                                                                    disableRipple
                                                                    startIcon={<BorderColorIcon sx={{ fontSize: '15px' }} />}
                                                                    sx={{
                                                                        height: '25px',
                                                                        width: '65px',
                                                                        color: 'var(--c-secondary-color)',
                                                                        backgroundColor: '#FFFFFF',
                                                                        boxShadow: '0px 2px 9px rgba(0, 0, 0, 0.1)',
                                                                        textTransform: 'capitalize',
                                                                        fontFamily: 'Segoe UI',
                                                                        fontWeight: 600,
                                                                        fontSize: '14px',
                                                                        '& .MuiButton-startIcon>*:nth-of-type(1)': {
                                                                            fontSize: '12px'
                                                                        },
                                                                        '&:hover': {
                                                                            backgroundColor: '#F7F7F7',
                                                                            color: 'var(--c-primary-color)',
                                                                        }
                                                                    }}
                                                                    onClick={() => { setStatusEdit(true) }}
                                                                >
                                                                    Edit
                                                                </Button>
                                                            </Box>
                                                        }
                                                    </Box>
                                                </Box>
                                        }
                                        <Grid size={2}>
                                            <Typography component='p' sx={{
                                                fontFamily: 'Segoe UI',
                                                fontWeight: 600,
                                                fontSize: '14px',
                                                color: '#1A1A1A',
                                                // width: '70%'
                                            }}>
                                                {getPreferenceValue(candidateData?.preferences?.empAvailLookupID)}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container >
                                        <Grid size={3}>
                                            <Typography component='p' sx={{
                                                fontFamily: 'Segoe UI',
                                                fontWeight: 600,
                                                fontSize: '14px',
                                                color: '#1A1A1A',
                                                width: '70%'
                                            }}>
                                                Engagement
                                            </Typography>
                                        </Grid>
                                        <Grid size={4}>
                                            <Typography component='p' sx={{
                                                fontFamily: 'Segoe UI',
                                                fontWeight: 600,
                                                fontSize: '14px',
                                                color: '#1A1A1A',
                                                // width: '70%'
                                            }}>
                                                0 Inbound . 3 Outbound
                                            </Typography>
                                        </Grid>
                                        <Grid size={3}>
                                            <Typography component='p' sx={{
                                                fontFamily: 'Segoe UI',
                                                fontWeight: 600,
                                                fontSize: '14px',
                                                color: '#1A1A1A',
                                                //  width: '70%'
                                            }}>
                                                Employment Preference
                                            </Typography>
                                        </Grid>
                                        <Grid size={2}>
                                            <Typography component='p' sx={{
                                                fontFamily: 'Segoe UI',
                                                fontWeight: 600,
                                                fontSize: '14px',
                                                color: '#1A1A1A',
                                                // width: '70%'
                                            }}>
                                                {getPreferenceValue(candidateData?.preferences?.empPrefLookupID)}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container >
                                        <Grid size={3}>
                                            <Typography component='p' sx={{
                                                fontFamily: 'Segoe UI',
                                                fontWeight: 600,
                                                fontSize: '14px',
                                                color: '#1A1A1A',
                                                // width: '70%'
                                            }}>
                                                Last 12 Months
                                            </Typography>
                                        </Grid>
                                        <Grid size={4}>
                                            <Stack sx={{ width: '70%' }} direction='row' spacing={1}>
                                                <Box sx={{ width: '6px', height: '25px', backgroundColor: '#E6E6E6' }}></Box>
                                                <Box sx={{ width: '6px', height: '25px', backgroundColor: '#E6E6E6' }}></Box>
                                                <Box sx={{ width: '6px', height: '25px', backgroundColor: '#E6E6E6' }}></Box>
                                                <Box sx={{ width: '6px', height: '25px', backgroundColor: '#E6E6E6' }}></Box>
                                                <Box sx={{ width: '6px', height: '25px', backgroundColor: '#E6E6E6' }}></Box>
                                                <Box sx={{ width: '6px', height: '25px', backgroundColor: '#E6E6E6' }}></Box>
                                                <Box sx={{ width: '6px', height: '25px', backgroundColor: '#E6E6E6' }}></Box>
                                                <Box sx={{ width: '6px', height: '25px', backgroundColor: '#E6E6E6' }}></Box>
                                                <Box sx={{ width: '6px', height: '25px', backgroundImage: 'linear-gradient(#E6E6E6 70%,#43CD89 30%)' }}></Box>
                                                <Box sx={{ width: '6px', height: '25px', backgroundImage: 'linear-gradient(#E6E6E6 80%,#43CD89 20%)' }}></Box>
                                                <Box sx={{ width: '6px', height: '25px', backgroundColor: '#E6E6E6' }}></Box>
                                                <Box sx={{ width: '6px', height: '25px', backgroundColor: '#E6E6E6' }}></Box>
                                            </Stack>
                                        </Grid>
                                        <Grid size={3}>
                                            <Typography component='p' sx={{
                                                fontFamily: 'Segoe UI',
                                                fontWeight: 600,
                                                fontSize: '14px',
                                                color: '#1A1A1A',
                                                // width: '70%'
                                            }}>
                                                Work Location Preference
                                            </Typography>
                                        </Grid>
                                        <Grid size={2}>
                                            <Typography component='p' sx={{
                                                fontFamily: 'Segoe UI',
                                                fontWeight: 600,
                                                fontSize: '14px',
                                                color: '#1A1A1A',
                                                // width: '70%'
                                            }}>
                                                {getPreferenceValue(candidateData?.preferences?.empFlexLookupID)}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container >
                                        <Grid size={3}>
                                            <Typography component='p' sx={{
                                                fontFamily: 'Segoe UI',
                                                fontWeight: 600,
                                                fontSize: '14px',
                                                color: '#1A1A1A',
                                                // width: '70%'
                                            }}>
                                                Ratings
                                            </Typography>
                                        </Grid>
                                        <Grid size={4}>

                                            <Stack spacing={1} sx={{ maxWidth: '132px !important' }} >
                                                <Rating name="half-rating" defaultValue={0} precision={0.5} size="large"
                                                    value={(Number(candidateData.rating)) ? Number(candidateData.rating) : 0} onChange={(e: any) => {
                                                        // console.log(e)
                                                        updateRating(e.target.value)
                                                    }} />
                                            </Stack>

                                        </Grid>
                                        <Grid size={3}>
                                            <Typography component='p' sx={{
                                                fontFamily: 'Segoe UI',
                                                fontWeight: 600,
                                                fontSize: '14px',
                                                color: '#1A1A1A',
                                                //  width: '20%'
                                            }}>
                                                Compensation Preference
                                            </Typography>
                                        </Grid>
                                        <Grid size={2}>
                                            <Typography component='p' sx={{
                                                fontFamily: 'Segoe UI',
                                                fontWeight: 600,
                                                fontSize: '14px',
                                                color: '#1A1A1A',
                                                //width: '40%'
                                            }}>

                                                $ {candidateData?.preferences?.empYearCompensation} Per Year
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container >
                                        <Grid size={3}>
                                            <Typography component='p' sx={{
                                                fontFamily: 'Segoe UI',
                                                fontWeight: 600,
                                                fontSize: '14px',
                                                color: '#1A1A1A',
                                                // width: '70%'
                                            }}>
                                                Current Employment Status
                                            </Typography>
                                        </Grid>
                                        <Grid size={4}>
                                            <Typography component='p' sx={{
                                                fontFamily: 'Segoe UI',
                                                fontWeight: 600,
                                                fontSize: '14px',
                                                color: '#1A1A1A',
                                                //width: '70%'
                                            }}>
                                                {getPreferenceValue(candidateData?.preferences?.empStatusLookupID)}
                                            </Typography>
                                        </Grid>
                                        <Grid size={3}>
                                            <Typography component='p' sx={{
                                                fontFamily: 'Segoe UI',
                                                fontWeight: 600,
                                                fontSize: '14px',
                                                color: '#1A1A1A',
                                                // width: '80%'
                                            }}>
                                                Legally authorized
                                            </Typography>
                                        </Grid>
                                        <Grid size={2}>
                                            <Typography component='p' sx={{
                                                fontFamily: 'Segoe UI',
                                                fontWeight: 600,
                                                fontSize: '14px',
                                                color: '#1A1A1A',
                                                // width: '40%'
                                            }}>

                                                {candidateData?.preferences?.legalStatus === 1 ? 'Yes' : 'No'}
                                            </Typography>
                                        </Grid>

                                    </Grid>
                                    <Grid container >
                                        <Grid size={3}>
                                        </Grid>
                                        <Grid size={4}>
                                        </Grid>
                                        <Grid size={3}>
                                            <Typography component='p' sx={{
                                                fontFamily: 'Segoe UI',
                                                fontWeight: 600,
                                                fontSize: '14px',
                                                color: '#1A1A1A',
                                                // width: '80%'
                                            }}>
                                                Visa sponsorship
                                            </Typography>
                                        </Grid>
                                        <Grid size={2}>
                                            <Typography component='p' sx={{
                                                fontFamily: 'Segoe UI',
                                                fontWeight: 600,
                                                fontSize: '14px',
                                                color: '#1A1A1A',
                                                //width: '40%'
                                            }}>

                                                {candidateData?.preferences?.visaSponsorStatus === 1 ? "Yes" : "No"}
                                            </Typography>
                                        </Grid>
                                    </Grid>


                                </Stack> */}
                                {/* </Stack> */}
                                {/* </Card> */}

                                {
                                    jobId && userLocalData.adminSettings(20027) ?
                                        <ShortlistBar
                                            candidateId={(candidateId) ? candidateId : ""}
                                            jobId={(jobId) ? jobId : ""}
                                            shortlistData={shortlistData}
                                            refreshShortlistBar={handleRefreshShortlistBar}
                                            candidateData={candidateData}
                                            isInModal={isInModal}
                                            appliedJobs={ApplicationJobDetailsList}
                                            handleJobIdChangeThroughModal={(jobId: any) => setJobId(jobId)}
                                        />
                                        :
                                        null
                                }

                                {/* {
                                jobId ?
                                    <Shortlist
                                        candidateId={(candidateId) ? candidateId : ""}
                                        jobId={(jobId) ? jobId : ""}
                                        shortlistData={shortlistData}
                                        refreshShortlistBar={loadShortlistBar}
                                    />
                                    :
                                    null
                            } */}

                                {isCandidateLoaded ? <Box sx={{ width: '100%', mt: 3 }}>
                                    <Box
                                        className='customCard py-0 customCenteredTabs '
                                        sx={{ borderBottom: 1, borderColor: 'divider', minHeight: 'auto !important', marginBottom: '0 !important' }}

                                    >
                                        <Tabs value={value} onChange={updateTabValue} aria-label="View Company Tabs" variant="scrollable" scrollButtons={userLocalData.isChromeExtensionEnabled() ? false : "auto"}>
                                            {(restrictMaskValidationState.isShowEmail && restrictMaskValidationState.isShowPhone) ?
                                                <Tab
                                                    label={
                                                        <Grid container direction="row">
                                                            <span className='tabLabelName'> Resume</span>
                                                        </Grid>
                                                    } {...tabProperties(0)} className='tabButton'
                                                />
                                                : null
                                            }
                                            {/* <Tab
                                                label={
                                                    <Grid container direction="row">
                                                        <span className='tabLabelName'>Submissions</span>
                                                    </Grid>
                                                } {...tabProperties(1)}
                                                className={`tabButton ${(!userLocalData.isChromeExtensionEnabled() || userLocalData.adminSettings(ID_SETTINGS_HIRING_WORKFLOW)) ? '' : 'd-none'}`}
                                            /> */}
                                            {/* <Tab
                                                label={
                                                    <Grid container direction="row">
                                                        <span className='tabLabelName'>Interviews</span>
                                                    </Grid>
                                                } {...tabProperties(2)}
                                                className={`tabButton ${(!userLocalData.isChromeExtensionEnabled() || userLocalData.adminSettings(ID_SETTINGS_HIRING_WORKFLOW)) ? '' : 'd-none'}`}
                                            /> */}
                                            <Tab
                                                label={
                                                    <Grid container direction="row">
                                                        <span className='tabLabelName'>Documents</span>
                                                    </Grid>
                                                } {...tabProperties(1)}
                                                className={`tabButton ${(!userLocalData.isChromeExtensionEnabled() || userLocalData.adminSettings(ID_SETTINGS_HIRING_WORKFLOW)) ? '' : 'd-none'}`}
                                            />
                                            {/* <Tab
                                                label={
                                                    <Grid container direction="row">
                                                        <span className='tabLabelName'>Overview</span>
                                                    </Grid>
                                                } {...tabProperties(4)} className='tabButton'
                                            /> */}
                                            <Tab
                                                label={
                                                    <Grid container direction="row">
                                                        <span className='tabLabelName'>Profile</span>
                                                    </Grid>
                                                } {...tabProperties(2)}
                                                className={`tabButton ${(!userLocalData.isChromeExtensionEnabled() || userLocalData.adminSettings(ID_SETTINGS_HIRING_WORKFLOW)) ? '' : 'd-none'}`}
                                            />
                                            <Tab
                                                label={
                                                    <Grid container direction="row">
                                                        <span className='tabLabelName'>Custom Fields</span>
                                                    </Grid>
                                                } {...tabProperties(3)}
                                                className={`tabButton ${(!userLocalData.isChromeExtensionEnabled() || userLocalData.adminSettings(ID_SETTINGS_HIRING_WORKFLOW)) ? '' : 'd-none'}`}
                                            />
                                            <Tab
                                                label={
                                                    <Grid container direction="row">
                                                        <span className='tabLabelName'>History</span>
                                                    </Grid>
                                                } {...tabProperties(4)}
                                                className={`tabButton ${(!userLocalData.isChromeExtensionEnabled() || userLocalData.adminSettings(ID_SETTINGS_HIRING_WORKFLOW)) ? '' : 'd-none'}`}
                                            />
                                            <Tab
                                                label={
                                                    <Grid container direction="row">
                                                        <span className='tabLabelName'>Activities</span>
                                                    </Grid>
                                                } {...tabProperties(5)}
                                                className={`tabButton ${(!userLocalData.isChromeExtensionEnabled() || userLocalData.adminSettings(ID_SETTINGS_HIRING_WORKFLOW)) ? '' : 'd-none'}`}
                                            />
                                            {/* <Tab
                                                label={
                                                    <Grid container direction="row">
                                                        <span className='tabLabelName'>Application</span>
                                                    </Grid>
                                                } {...tabProperties(8)}
                                                className={`tabButton ${(!userLocalData.isChromeExtensionEnabled() || userLocalData.adminSettings(ID_SETTINGS_HIRING_WORKFLOW)) ? '' : 'd-none'}`}
                                            /> */}
                                            {/* <Tab
                                                label={
                                                    <Grid container direction="row">
                                                        <span className='tabLabelName'>Matches</span>
                                                    </Grid>
                                                } {...tabProperties(8)}
                                                className={`tabButton ${(!userLocalData.isChromeExtensionEnabled() || userLocalData.adminSettings(ID_SETTINGS_HIRING_WORKFLOW)) ? '' : 'd-none'}`}
                                            /> */}
                                        </Tabs>

                                        {/* <Box className='card customCard' p={0}>
                                        <div className='card-inner'>
                                            <Box sx={{ width: '100%' }}>
                                            <TabContext value={tabValue}>
                                                <Box className="custom-tabs" sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                            <TabList onChange={handleTabChange} aria-label="lab API tabs example"> */}

                                    </Box>
                                    <CustomTabPanel value={value} index={0}>
                                        {
                                            ((userLocalData.isChromeExtensionEnabled() || userLocalData.adminSettings(ID_SETTINGS_HIRING_WORKFLOW)) && userLocalData.adminSettings(ID_SETTINGS_SOVREN))
                                                ?
                                                <div className="customCard" style={{ minHeight: '250px', overflow: "auto" }}>
                                                    {/* {
                                                        selectedResume.documentId ?
                                                            <Resume
                                                                // candidateId={(candidateId) ? candidateId : ""}
                                                                // jobId={(jobId) ? jobId : ""}
                                                                // sourceId={(sourceId) ? sourceId : ""}
                                                                // documentId={(selectedResume.documentId) ? selectedResume.documentId : ""}
                                                                // extension={(selectedResume.extension) ? selectedResume.extension : ""}
                                                                htmlData={htmlData}
                                                            />
                                                            :
                                                            null
                                                    } */}
                                                    {
                                                        txtResume ?
                                                            <div>
                                                                <Grid
                                                                    container
                                                                    direction="row"
                                                                    justifyContent="flex-end"
                                                                    alignItems="flex-start"
                                                                >
                                                                    <Button style={{ color: "grey" }} onClick={() => setOpenResumePopup(true)}>
                                                                        <OpenInFullRoundedIcon />
                                                                    </Button>
                                                                </Grid>
                                                                <Resume htmlData={txtResume} />
                                                                {
                                                                    (openResumePopup) ?
                                                                        <ResumePopup
                                                                            open={openResumePopup}
                                                                            closePopup={() => setOpenResumePopup(false)}
                                                                            htmlData={txtResume}
                                                                        />
                                                                        :
                                                                        null
                                                                }

                                                            </div>
                                                            :
                                                            null
                                                    }
                                                </div>
                                                :
                                                <Profile add={true} candidateData={candidateData} />
                                        }

                                    </CustomTabPanel>
                                    {/* <CustomTabPanel value={value} index={1}>
                                        <Submissions submissionsList={submissionsList} />
                                    </CustomTabPanel> */}

                                    {/* <CustomTabPanel value={value} index={2}>
                                        <Interviews candidatesList={candidateInterviewsList} />
                                    </CustomTabPanel> */}

                                    <CustomTabPanel value={value} index={1}>
                                        <Documents isLoadDocumentData={isLoadDocumentData} reseDoumentData={() => setIsLoadDocumentData('')} candidateId={candidateId ? candidateId : ""} jobId={jobId ? jobId : ""} />
                                    </CustomTabPanel>
                                    {/* <CustomTabPanel value={value} index={4}>
                                    <Overview canData={candidateData} />
                                </CustomTabPanel> */}
                                    <CustomTabPanel value={value} index={2}>
                                        <Profile add={true} candidateData={candidateData} />
                                        {/* updatePool === "add" ? true : false */}
                                    </CustomTabPanel>
                                    <CustomTabPanel value={value} index={3}>
                                        <ModuleFormAnswer moduleById={Number(candidateId)} moduleId={20002} moduleName='Candidate Form' />
                                    </CustomTabPanel>
                                    <CustomTabPanel value={value} index={4}>
                                        {/* <Applications ApplicationList={ApplicationDetailsList} /> */}
                                        <UserActivity historyList={HistoryDetailsList} />
                                    </CustomTabPanel>
                                    <CustomTabPanel value={value} index={5}>
                                        <SubTabs candidateId={candidateId ? candidateId : ""} jobId={jobId ? jobId : ""} />
                                    </CustomTabPanel>
                                    {/* <CustomTabPanel value={value} index={7}>
                                        <Applications ApplicationList={ApplicationDetailsList} />
                                        <UserActivity HistoryList={HistoryDetailsList} />
                                    </CustomTabPanel> */}
                                    {/* <CustomTabPanel value={value} index={8}>
                                        <Matches ApplicationList={ApplicationJobDetailsList.jobsList} candidateId={candidateId} />
                                    </CustomTabPanel> */}
                                </Box> : null}
                            </div>
                        </div>
                    </div >

                </Grid >
                <Grid
                    sx={{ width: 385 }}>

                    <Activities
                        note={true}
                        call={true}
                        task={true}
                        email={true}
                        communityStatus={candidateData.communityStatus}
                        componentFrom="candidate"
                        candidateId={candidateId}
                        candidateData={candidateData}
                        isLoadCandiateActivesType={isLoadCandiateActivesType}
                        resetActivitiesType={() => setIsLoadCandiateActivesType('')}
                        isShowEmail={restrictMaskValidationState.isShowEmail && userContactInfo?.length && userContactInfo?.some((obj: any) => obj.contType === 2)}
                        isShowPhone={restrictMaskValidationState.isShowPhone && userContactInfo?.length && userContactInfo?.some((obj: any) => obj.contType === 1)}
                    />

                </Grid>
            </Grid >
        </div>

    );
};

export default ViewCandidate;

