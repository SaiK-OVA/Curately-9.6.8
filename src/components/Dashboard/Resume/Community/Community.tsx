import { useState, useEffect, useRef, SyntheticEvent } from '../../../../shared/modules/React';

import { MouseEvent, useMemo } from 'react';

import { Menu, MenuItem } from '../../../../shared/modules/MaterialImports/Menu';
import { List, ListItem, ListItemText } from '../../../../shared/modules/MaterialImports/List';
import { Grid } from '../../../../shared/modules/MaterialImports/Grid';
import { Box } from '../../../../shared/modules/MaterialImports/Box';
import { Tooltip } from '../../../../shared/modules/MaterialImports/ToolTip';
import { Button, IconButton } from '../../../../shared/modules/MaterialImports/Button';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';


import { Typography } from '../../../../shared/modules/MaterialImports/Typography';
import { showToaster } from "../../../shared/SnackBar/SnackBar";
import CommunityFilters, { CandidateStatus } from "./CommunityFilters";
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import MASTER_JSON_COMMUNITY from "../../../../shared/data/Community/BuildJson";


import ApiService from "../../../../shared/api/api";
import { trackPromise } from "../../../../shared/modules/PromiseTrackter";

import { Stack } from "../../../../shared/modules/MaterialImports/Stack";


import { DateTime } from '../../../../shared/modules/Luxon';
import { MRT_ColumnDef, MRT_SortingState } from '../../../../shared/modules/MaterialReactTable';
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";

import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";

import QuestionMarkRoundedIcon from "@mui/icons-material/QuestionMarkRounded";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import PhoneDialog from "../../../shared/PhoneDialog/PhoneDialog";

import EmailDialogBox from "../../../shared/EmailDialogBox/EmailDialogBox";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { ButtonGroup } from "../../../../shared/modules/MaterialImports/ButtonGroup";
import USPhoneFormat from "../../../../shared/utils/USPhoneFormat";

import { userLocalData } from "../../../../shared/services/userData";
import { CircularProgress } from "../../../../shared/modules/MaterialImports/CircularProgress";
import TelegramIcon from "@mui/icons-material/Telegram";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { MUIAutoComplete } from '../../../shared/MUIAutoComplete/MUIAutoComplete';

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import FiberManualRecordOutlinedIcon from '@mui/icons-material/FiberManualRecordOutlined';


import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';

import AddCandidateDialog from "./AddCandidateDialog";
import InviteCandidatesDialog from "./InviteCandidateDialog";


import IsValidUrl from "../../../../shared/utils/IsValidUrl";


import Copy from '../../../../shared/utils/Copy';
import { v4 as uuidv4 } from 'uuid';

import { confirmDialog } from '../../../shared/ConfirmDialog/ConfirmDialog';
import Parsable from '../../../../shared/utils/Parsable';

import { Tab, Tabs } from '../../../../shared/modules/MaterialImports/Tabs';
import TuneIcon from '@mui/icons-material/Tune';
import LoopIcon from "@mui/icons-material/Loop";


// import RenderCount from '../../../../shared/components/RenderCounter/RenderCounter';
import CommunityData from './CommunityData/CommunityData';


import "./Community.scss";
import ActionItems from './ActionItems/ActionItems';
import Mask from '../../../../shared/utils/Mask';
import UpgradeButton from '../../../shared/UpgradeButton/UpgradeButton';
import CandidateCommonAPIs from '../../../../shared/utils/SaveCandidate/SaveCandidate';
import { ID_ATS_AVIONTEAPI, ID_ATS_BULLHORN, ID_ATS_JOBDIVA, ID_ATS_VOICEAI, ID_SETTINGS_HIRING_WORKFLOW, ID_SETTINGS_QUICK_ACTION, ID_SETTINGS_TALENTPOOL } from '../../../../shared/services/Permissions/IDs';

import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { OpenErrorModal } from '../../../shared/ErrorModal/ErrorModal';
import JobDivaLink from '../../../../shared/services/JobDivaLink';
import NewLayoutMenu from '../../Candidate/Applicants/NewLayoutMenu';


export interface SourceInterface {
    createdDate: string;
    isActive: boolean;
    sourceId: number;
    sourceName: string;
    sourceType: string;
}

export interface CommunitySessionStorage {
    currentSelectedTabCount: number;
    rowCount: number;
    selectedRowCount: number;
    applicantsData: any[];
    tabValue: string;
    currentSelectedTabValue: string;
    tabList: { label: string; count: number }[];
    pagination: { pageIndex: number; pageSize: number; };
    selectedCommunity: { id: string; name: string };
    isFiltersApplied: boolean;
    firstLoad: boolean;
    isTabChanged: boolean;
    talentPoolName: string;
    initialCountLoaded: boolean;
    // firstAPICall: boolean;
    mainJsonDataRef: CommunityMainJsonInterface;
    sortType: string;
    sortColumn: string;
    rowSelection: object;
    currentSelectCount: number;
    isAIMatchSelected: boolean;
    isSelectAllChecked: boolean;
    AIMatchUserIds: { candids: string; joined_candids: string; notinvited_candids: string; pending_candids: string; pool_candids: string; scores: string; };
    sorting: { desc: boolean; id: string; }[];
    selectedJob: { title: string; id: string; };
    jsonToPassRef: any;
    initialJsonToPass: any;
    sourceList: SourceInterface[];
    candidateOpened: boolean;
    searchName: string;
    searchNameRef: {
        firstName: string;
        lastName: string;
        email: string;
    }
}

interface CommunityMainJsonInterface {
    keywords: string;
    jobTitleSwitch: boolean;
    jobTitles: { title: string; required: boolean; }[];
    locationSwitch: boolean;
    location: { city: string; state: string | string[]; zipCode: string; radius: string };
    workAuthorizationSwitch: boolean;
    workAuthorization: { auth_in_US: string; Req_visa_sponsorship: string; required?: boolean; };
    skillsSwitch: boolean;
    skills: { recentUse: boolean; experLevel: string; skillName: string; }[];
    allSkills: string;
    employerSwitch: boolean;
    employer: { employerName: string; }[];
    educationSwitch: boolean;
    degTypes: string[];
    IsTopStudent: boolean;
    IsRecentGraduate: boolean;
    IsCurrentStudent: boolean;
    schools: { schoolName: string; }[];
    degrees: { degreeName: string; }[];
    daysBackSwitch: boolean;
    daysBack: 3650; //talentPoolId ? "3650" : "90";
    experienceSwitch: boolean;
    minExp: string;
    maxExp: string;
    minManExp: string;
    maxManExp: string;
    certificationSwitch: boolean;
    certifications: { certificationName: string; }[];
    industriesSwitch: boolean;
    industries: { indcate: string; subCat: string; }[];
    languageSpokenSwitch: boolean;
    languageSpoken: string | string[];
    jobDescription: string;
    selectedJobTitle: string;
    selectedJobId: string;
    parsedDocument: string;
    tagId: string;
    tagName: string;
    talentPoolId: string;
    talentPoolName: string;
    preference: { CurrentEmpStatus: string; EmpAvailabilityStatus: string; EmpJobPref: string; EmpLocPref: string; EmpWorkHoursPref: string };
    communityMemberActivity: { jobApplication: string; profileUpdate: string; avaliablityStatusUpdate: string; shiftPrefernceUpdate: string; preferenceUpdate: string; profileCompletion: string; mobileVerified: string; };
    email: { emailClicked: string; emailReplied: string; emailBounced: string; emailSpamBlocked: string; emailUnsubscribed: string; };
    sms: { smsSent: string; smsReplied: string; smsUnsubscribed: string; };
    candidateActivities: { resume: string; contact: string; email: string; candidateLastActivityDate: string; candidateActivityType: string; placementEndDate: string; hiringStatusInValues: string; candidateStatusInValues: string; candidateProfileSource: string; };
    curationActivity: { submissionActivity: string; interviewActivity: string; rating: string; notes: string; };
    CategoryWeights?: {
        Category: string;
        Weight: number;
    }[]
    weightage?: number[];
}

interface menuData {
    rowId: string;
    email: string;
    first: string;
    candId: string;
    jobId: string;
    phone: string;
    poolCount: number;
    poolIds: any[],
    poolNames: any[],
    sequenceIds: any[],
    sequenceNames: any[],
    sequenceCount: number;
    linkedIn: string;
    isPackageEmailValidity: "VIEW BUTTON" | "VIEW" | "EMPTY" | "UPGRADE" | "UPGRADE BUTTON";
    isPackagePhoneValidity: "VIEW BUTTON" | "VIEW" | "EMPTY" | "UPGRADE" | "UPGRADE BUTTON";
    isShowEmail: boolean;
    isShowPhone: boolean;
}

export interface DataToPassForCommunity {
    jobid: string;
    json: string;
    client_subs: string;
    csninja: string;
    page: string;
    next: number;
    pageSize: number;
    type: string;
    clientId: string;
    poolId: string;
    submissionActivity: number;
    interviewActivity: number;
    rating: number;
    notes: number | null;
    jobApplication: number;
    profileUpdate: number;
    avaliablityStatusUpdate: number;
    shiftPrefernceUpdate: number;
    preferenceUpdate: string;
    profileCompletion: string;
    mobileVerified: null | number;
    smsSent: number | null;
    smsReplied: number | null;
    smsUnsubscribed: number | null;
    userIds: string;
    scores: string;
    json_pending: string;
    json_notinvited: string;
    json_joined: string;
    json_pool: string;
    resume: string;
    contact: string;
    email: string;
    candidateLastActivityDate: string;
    candidateActivityType: string;
    placementEndDate: string;
    hiringStatusInValues: string;
    candidateStatusInValues: string;
    candidateProfileSource: string;
    firstName: string;
    lastName: string;
    userEmail: string;
    recrIds: string;
    recrId: string;
    emailClicked: number | null;
    emailReplied: number | null;
    emailBounced: number | null;
    emailSpamBlocked: number | null;
    emailUnsubscribed: number | null;
    keywords: string;
    jobTitles: string;
    skills: string;
    city: string;
    state: string;
    zipCode: string;
    radius: string;
    talentPool: string;
    tags: string;
    employer: string;
    degreeType: string;
    degrees: string;
    daysBack: number;
    isExtension: boolean;
}

const defaultDataToPass: DataToPassForCommunity = {
    jobid: "",
    json: "",
    client_subs: "",
    csninja: "",
    page: "",
    next: 0,
    pageSize: 0,
    type: "",
    clientId: "",
    poolId: "",
    submissionActivity: 0,
    interviewActivity: 0,
    rating: 0,
    notes: null,
    jobApplication: 0,
    profileUpdate: 0,
    avaliablityStatusUpdate: 0,
    shiftPrefernceUpdate: 0,
    preferenceUpdate: "",
    profileCompletion: "",
    mobileVerified: null,
    emailClicked: null,
    emailReplied: null,
    emailBounced: null,
    emailSpamBlocked: null,
    emailUnsubscribed: null,
    smsSent: null,
    smsReplied: null,
    smsUnsubscribed: null,
    userIds: "",
    scores: "",
    json_pending: "",
    json_notinvited: "",
    json_joined: "",
    json_pool: "",
    resume: "",
    contact: "",
    email: "",
    candidateLastActivityDate: "",
    candidateActivityType: "",
    placementEndDate: "",
    hiringStatusInValues: "",
    candidateStatusInValues: "",
    candidateProfileSource: "",
    firstName: "",
    lastName: "",
    userEmail: "",
    recrIds: "",
    recrId: "",
    keywords: "",
    jobTitles: "",
    skills: "",
    city: "",
    state: "",
    zipCode: "",
    radius: "",
    talentPool: "",
    tags: "",
    employer: "",
    degreeType: "",
    degrees: "",
    daysBack: 3650,
    isExtension: true // userLocalData.isChromeExtensionEnabled()
}

const defaultMainJSON: CommunityMainJsonInterface = {
    keywords: "",
    jobTitleSwitch: false,
    jobTitles: [
        {
            title: "",
            required: false
        }
    ],
    locationSwitch: false,
    location: {
        city: "",
        state: "",
        zipCode: "",
        radius: ""
    },
    workAuthorizationSwitch: false,
    workAuthorization: {
        auth_in_US: "",
        Req_visa_sponsorship: "",
    },
    skillsSwitch: false,
    skills: [
        {
            recentUse: false,
            experLevel: "",
            skillName: ""
        }
    ],
    allSkills: "",
    employerSwitch: false,
    employer: [
        {
            employerName: "",
        }
    ],
    educationSwitch: false,
    degTypes: [],
    IsTopStudent: false,
    IsRecentGraduate: false,
    IsCurrentStudent: false,
    schools: [
        {
            schoolName: "",
        }
    ],
    degrees: [
        {
            degreeName: "",
        }
    ],
    daysBackSwitch: false,
    daysBack: 3650, //talentPoolId ? "3650" : "90",
    experienceSwitch: false,
    minExp: "",
    maxExp: "",
    minManExp: "",
    maxManExp: "",
    certificationSwitch: false,
    certifications: [
        {
            certificationName: "",
        }
    ],
    industriesSwitch: false,
    industries: [
        {
            indcate: "",
            subCat: "",
        }
    ],
    languageSpokenSwitch: false,
    languageSpoken: "",
    jobDescription: "",
    selectedJobTitle: "",
    selectedJobId: "",
    parsedDocument: "",
    tagId: "",
    tagName: "",
    talentPoolId: "",
    talentPoolName: "",
    preference:
    {
        CurrentEmpStatus: "",
        EmpAvailabilityStatus: "",
        EmpJobPref: "",
        EmpLocPref: "",
        EmpWorkHoursPref: ""
    },
    communityMemberActivity: {
        jobApplication: "",
        profileUpdate: "",
        avaliablityStatusUpdate: "",
        shiftPrefernceUpdate: "",
        preferenceUpdate: "",
        profileCompletion: "",
        mobileVerified: "",
    },
    email: {
        emailClicked: "",
        emailReplied: "",
        emailBounced: "",
        emailSpamBlocked: "",
        emailUnsubscribed: "",
    },
    sms: {
        smsSent: "",
        smsReplied: "",
        smsUnsubscribed: "",
    },
    candidateActivities: {
        resume: "",
        contact: "",
        email: "",
        candidateLastActivityDate: "",
        candidateActivityType: "",
        placementEndDate: "",
        hiringStatusInValues: "",
        candidateStatusInValues: "",
        candidateProfileSource: "",
    },
    curationActivity: {
        submissionActivity: "",
        interviewActivity: "",
        rating: "",
        notes: "",
    },
}


let renderCount = 0;

const Community = ({ jobIdFromJobPage, jobTitleFromJobPage, isInJob }: { jobIdFromJobPage: string, jobTitleFromJobPage: string, isInJob: boolean }) => {

    const { talentPoolId } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const filtersSearchId = useRef(searchParams.get('id') ? searchParams.get('id') as string : "")
    const isFirstTimeLoad = useRef(false);

    const isChromeExtensionEnabled = userLocalData.isChromeExtensionEnabled();


    const searchDataInSession = useRef<CommunitySessionStorage>(sessionStorage.getItem(`community_${filtersSearchId.current}`) && JSON.parse(sessionStorage.getItem(`community_${filtersSearchId.current}`) as string)?.currentSelectedTabCount ?
        JSON.parse(sessionStorage.getItem(`community_${filtersSearchId.current}`) as string) : {
            currentSelectedTabCount: 0,
            rowCount: 0,
            selectedRowCount: 0,
            applicantsData: [],
            tabValue: "",
            currentSelectedTabValue: "",
            tabList: [{ label: "All", count: isInJob ? 0 : 22755 }, { label: "Joined", count: isInJob ? 0 : 12346 }, { label: "Pending", count: isInJob ? 0 : 4852 },
            { label: "Not Invited", count: isInJob ? 0 : 5020 }, { label: "Talent Pool", count: isInJob ? 0 : 1998 },],
            pagination: { pageIndex: 0, pageSize: 50, },
            selectedCommunity: { id: "", name: "" },
            isFiltersApplied: false,
            firstLoad: false,
            isTabChanged: false,
            talentPoolName: "",
            initialCountLoaded: false,
            // firstAPICall: false,
            mainJsonDataRef: defaultMainJSON,
            sortType: "desc",
            sortColumn: "State",
            rowSelection: {},
            currentSelectCount: 0,
            isAIMatchSelected: false,
            isSelectAllChecked: false,
            AIMatchUserIds: { candids: "", joined_candids: "", notinvited_candids: "", pending_candids: "", pool_candids: "", scores: "" },
            sorting: [],
            selectedJob: { title: "", id: "", },
            jsonToPassRef: "",
            initialJsonToPass: "",
            sourceList: [],
            candidateOpened: false,
            searchName: "",
            searchNameRef: {
                email: "",
                firstName: "",
                lastName: ""
            }
        });

    const [searchName, setSearchName] = useState(searchDataInSession.current.searchName ? searchDataInSession.current.searchName : "");
    const searchNameRef = useRef((searchDataInSession.current.searchNameRef?.firstName || searchDataInSession.current.searchNameRef?.lastName || searchDataInSession.current.searchNameRef?.email) ? searchDataInSession.current.searchNameRef : {
        firstName: "",
        lastName: "",
        email: ""
    });

    const mainJsonDataRef = useRef<CommunityMainJsonInterface>(searchDataInSession.current.mainJsonDataRef ? searchDataInSession.current.mainJsonDataRef : defaultMainJSON);
    const mainDataToPassForAPI = useRef<DataToPassForCommunity>(defaultDataToPass);

    useEffect(() => {
        loadLayoutData();
        if (!isInJob) {
            if (!searchParams.get("id")) {
                let v4Id = uuidv4();
                setSearchParams({ id: v4Id });
                filtersSearchId.current = v4Id;
                // firstAPICall.current = true;
                // } else {
                //     filtersSearchId.current = searchParams.get("id") as string;
                //     let sessionData = sessionStorage.getItem(`community_${filtersSearchId.current}`);
                //     let parsedSessionData = JSON.parse(sessionData as string);
                //     if (sessionData && parsedSessionData) {
                //         searchDataInSession.current = parsedSessionData;
                //         isFirstTimeLoad.current = true;
                //     }
            }
        } else {
            // setIsLayoutFetched(true)
        }
    }, [searchParams]);

    const [layoutData, setLayoutData] = useState<any[]>([]);
    // const [checkedColumnsList, setCheckedColumnsList] = useState<{ name: string, isactive: boolean, key: string, checked: boolean, type: string }[]>([]);
    const [orderedColumnsList, setOrderedColumnsList] = useState<{ name: string, isactive: boolean, key: string, checked: boolean, type: string }[]>([]);
    const [menuLayoutColumns, setMenuLayoutColumns] = useState<{ name: string, isactive: boolean, key: string, checked: boolean, type: string }[]>([]);
    const [isLayoutFetched, setIsLayoutFetched] = useState(false);
    const [headingsColumnsVisible, setHeadingsColumnsVisible] = useState<{ [key: string]: boolean }>({})
    const pinnedColumn = useMemo(() => {
        if (!!menuLayoutColumns?.length) return { "name": "Candidate Name", "key": "firstName,lastName" };
        else return { key: "name", name: "Name" };
    }, [menuLayoutColumns])
    const layoutRef = useRef(null);

    const loadLayoutData = () => {
        let data = localStorage.getItem("community_layout");
        if (data && Parsable.isJSON(data)) {

            let { allLayoutData, orderedLayoutData } = JSON.parse(data);
            setLayoutData([...allLayoutData]);
            setOrderedColumnsList([...orderedLayoutData]);
            setMenuLayoutColumns([...orderedLayoutData]);
            setIsLayoutFetched(true);

        } else getAllLayoutData();
    }


    const getAllLayoutData = () => {
        trackPromise(
            ApiService.postWithData("admin", "getCommunityLayout", {
                clientId: userLocalData.getvalue('clientId'),
                userId: userLocalData.getvalue('recrId')
            }).then(
                (response: any) => {
                    if (response.data.Success === true) {
                        let layoutJson = response.data?.layoutJson || [];
                        let layoutDetails = response.data?.layoutDetails || [];
                        setLayoutData(layoutDetails || []);

                        if (!!layoutJson?.length && !!layoutDetails?.length) {
                            let checkedLayoutData = layoutJson.map((each: any) => {
                                let column = layoutDetails.find((item: any) => item?.name === each?.name) || undefined;
                                return {
                                    name: column?.name ? column.name : each.name,
                                    key: column?.key ? column.key : each.key,
                                    isactive: column?.isactive ? column?.isactive : false,
                                    checked: column?.isactive ? column.isactive : ((each?.name && each?.key) ? true : false),
                                    type: column?.type ? column?.type : "STRING"
                                }
                            });

                            let uncheckedLayoutData = layoutDetails.filter((each: any) => {
                                return checkedLayoutData.every((data: any) => each.name !== data.name)
                            }).map((each: any) => ({ ...each, checked: false }));

                            let finalColumnsList = checkedLayoutData.concat(uncheckedLayoutData);
                            const fixedColumnIndex = finalColumnsList.findIndex((each: any) => each.name === pinnedColumn.name);
                            const fixedColumnData = finalColumnsList.splice(fixedColumnIndex, 1);

                            finalColumnsList.unshift({ ...fixedColumnData[0] });
                            setOrderedColumnsList([...finalColumnsList]);
                            setMenuLayoutColumns([...finalColumnsList]);
                            localStorage.setItem("community_layout", JSON.stringify({
                                allLayoutData: layoutDetails, orderedLayoutData: finalColumnsList
                            }))

                        } else {
                            const finalColumnsList = layoutDetails.map((each: any) => ({
                                ...each,
                                checked: each.isactive
                            }));
                            setOrderedColumnsList([...finalColumnsList]);
                            setMenuLayoutColumns([...finalColumnsList]);
                            localStorage.setItem("community_layout", JSON.stringify({
                                allLayoutData: layoutDetails, orderedLayoutData: finalColumnsList
                            }))
                        }

                        setIsLayoutFetched(true);
                    } else {
                        showToaster((response.data.Message) ? response.data.Message : "An error occured while Fetching Layout.", 'error')
                        setIsLayoutFetched(true);
                    }
                }
            ))
    }

    const [openCandidateId, setOpenCandidateId] = useState<string | number | null>(null);
    const [openCandidateModal, setOpenCandidateModal] = useState(false);
    const isInJobRef = useRef(false);




    const isCandidateAddSettingEnabled = userLocalData.checkIntegration(400005);
    const isCommunitySearchSettingEnabled = userLocalData.checkIntegration(400008);
    const isHighVolumeHiringSettingEnabled = !userLocalData.adminSettings(30002);
    // const isSovrenEnabled = userLocalData.adminSettings(20048);
    const isCRMEnabled = userLocalData.adminSettings(30003);

    const isEmailSMSSettingEnabled = userLocalData.checkIntegration(40005);

    // const isBulkSMSSettingEnabled = userLocalData.checkIntegration(40005) && userLocalData.checkIntegration(400021);
    // const isSendEmailSettingEnabled = userLocalData.checkIntegration(40005) && userLocalData.checkIntegration(400022);
    // const isSendSMSSettingEnabled = userLocalData.checkIntegration(40005) && userLocalData.checkIntegration(400023);


    const [sortType, setSortType] = useState(searchDataInSession.current.sortType ? searchDataInSession.current.sortType : "desc");
    const [sortColumn, setSortColumn] = useState(searchDataInSession.current.sortColumn ? searchDataInSession.current.sortColumn : "State");


    const initialCountLoaded = useRef(searchDataInSession.current.initialCountLoaded ? searchDataInSession.current.initialCountLoaded : false);
    // const firstAPICall = useRef(searchDataInSession.current.firstAPICall ? searchDataInSession.current.firstAPICall : false);
    const isFiltersApplied = useRef(searchDataInSession.current?.isFiltersApplied ? searchDataInSession.current.isFiltersApplied : false);

    const talentPoolName: string = talentPoolId ?
        localStorage.getItem('talentPoolName_' + talentPoolId) ? localStorage.getItem('talentPoolName_' + talentPoolId) as string :
            searchDataInSession.current.talentPoolName ? searchDataInSession.current.talentPoolName : "" : "";

    let navigate = useNavigate();
    // 
    const [filtersExpand, setFiltersExpand] = useState(isCommunitySearchSettingEnabled ? (isInJob ? true : false) : (!talentPoolId) ? false : true);


    const jsonToPassRef = useRef<any>(searchDataInSession.current?.jsonToPassRef ? searchDataInSession.current.jsonToPassRef : {});
    const initialJsonToPass = useRef<any>(searchDataInSession.current?.initialJsonToPass ? searchDataInSession.current.initialJsonToPass : "");
    // const { candidateId, jobId } = useParams();
    const [applicantsData, setApplicantsData] = useState<any>(searchDataInSession.current.applicantsData ? searchDataInSession.current.applicantsData : []);
    const [rowSelection, setRowSelection] = useState<any>(searchDataInSession.current.rowSelection ? searchDataInSession.current.rowSelection : {});
    // const [dataLoading, setDataLoading] = useState(false);
    const [countLoading, setCountLoading] = useState(false);
    const [rowCount, setRowCount] = useState(searchDataInSession.current.rowCount ? searchDataInSession.current.rowCount : 0);
    const [selectedRowCount, setSelectedRowCount] = useState(searchDataInSession.current.selectedRowCount ? searchDataInSession.current.selectedRowCount : 0);
    // const [rowSelectCount, setRowSelectCount] = useState(0);
    // const [rowPageIndex, setRowPageIndex] = useState(0);
    // const [candidateData, setCandidateData] = useState<any>([]);
    const [selectedEmail, setSelectedEmail] = useState('');

    const [selectedSMS, setSelectedSMS] = useState('');
    const [selectedName, setSelectedName] = useState('');
    const [isBulkEmail, setIsBulkEmail] = useState(false);
    const [isBulkSMS, setIsBulkSMS] = useState(false);

    const [addSMS, setAddSMS] = useState(false);
    const [dialogPhoneStatus, setDialogPhoneStatus] = useState(false);
    const [phoneOnClicked, setPhoneOnClicked] = useState("");
    const [dialogStatus, setDialogStatus] = useState(false);
    const [addEmail, setAddEmail] = useState(false);
    const [emailOnClicked, setEmailOnClicked] = useState("");
    const [tabValue, setTabValue] = useState(searchDataInSession.current?.tabValue ? searchDataInSession.current?.tabValue : "All");
    // talentPoolId ? "Talent Pool" : "All"
    const currentSelectedTabValue = useRef(searchDataInSession.current?.currentSelectedTabValue ? searchDataInSession.current?.currentSelectedTabValue : "All");

    // talentPoolId ? "Talent Pool" : "All"

    const candidateOpened = useRef(searchDataInSession.current?.candidateOpened ? searchDataInSession.current?.candidateOpened : false);
    const currentSelectedTabCount = useRef(searchDataInSession.current?.currentSelectedTabCount ? searchDataInSession.current?.currentSelectedTabCount : 0);
    const currentSelectCount = useRef(searchDataInSession.current?.currentSelectCount ? searchDataInSession.current?.currentSelectCount : 0);
    const isAIMatchSelected = useRef(searchDataInSession.current?.isAIMatchSelected ? searchDataInSession.current?.isAIMatchSelected : false);
    const firstLoad = useRef(searchDataInSession.current?.firstLoad ? searchDataInSession.current?.firstLoad : false);
    const isTabChanged = useRef(searchDataInSession.current?.isTabChanged ? searchDataInSession.current?.isTabChanged : false);
    const [openNewLayoutModal, setOpenNewLayoutModal] = useState(false);
    const handleTabChange = async (_: SyntheticEvent, newValue: string) => {
        currentSelectedTabValue.current = newValue;
        await setTabValue(newValue);
        setIsSelectAllChecked(false);
        // setRowSelectCount((rowCount > 1000) ? 1000 : rowCount);
        // setRowPageIndex(0);
        setRowSelection({});
        // setSelectAllElement(null);
        let tempObj = tabList.find((i: any) => newValue === i.label);
        currentSelectedTabCount.current = (tempObj?.count) ? tempObj?.count : 0;
        // setSearchName('');
        // searchNameRef.current = {
        //     firstName: "",
        //     lastName: "",
        //     email: ""
        // }

        if ((pagination.pageIndex as number) === 0) {
            // if (firstAPICall.current) {
            await buildJson(0, 50, false, false, false);
            // }
        } else {
            isTabChanged.current = true;
            setPagination({
                pageIndex: 0,
                pageSize: 50
            });
        }
        // setTimeout(() => {
        //     firstAPICall.current = true;
        // }, 200);
    };

    const [sourceList, setSourceList] = useState<SourceInterface[]>(searchDataInSession.current.sourceList ? searchDataInSession.current.sourceList : []);
    const loadSources = () => {
        trackPromise(
            ApiService.getCall('admin', `getSourceList/${userLocalData.getvalue('clientId')}`)
                .then((response: any) => {
                    // localStorage.setItem('sourcesList_' + userLocalData.getvalue('clientId'), response.data.list || []);
                    setSourceList(response.data.list || []);
                })
        )
    }

    const candidateStatusList = useRef<CandidateStatus[]>([]);
    useEffect(() => {
        // let tempPlacholders = localStorage.getItem('sourcesList_' + userLocalData.getvalue('clientId'));
        // if (tempPlacholders && tempPlacholders) {
        //     setSourceList(tempPlacholders);
        // } else {
        if (!sourceList.length) {
            loadSources();
        }
        // }

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
                            candidateStatusList.current = response.data.candidateStatusList;

                        }
                    })
                    .catch((error) => {
                        console.error("Error fetching candidate status list", error);
                    })
            )
        };
        const localCandidateStatusList = localStorage.getItem('candidateStatusList');
        if (localCandidateStatusList) {
            candidateStatusList.current = JSON.parse(localCandidateStatusList);
        } else {
            fetchCandidateStatusList();
        }

    }, []);




    // const [dialogListStatus, setDialogListStatus] = useState(false);
    // const [listOnClicked, setListOnClicked] = useState('');
    // const [dialogSequenceStatus, setDialogSequenceStatus] = useState(false);
    // const [sequenceOnClicked, setSequenceOnClicked] = useState('');

    // const [openSnack, setOpenSnack] = useState<{ [key: string]: boolean }>({});
    const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
    const [TableMailOpen, setTableOpenMail] = useState<null | HTMLElement>(null);
    const [callAnchorElement, setCallAnchorElement] = useState<null | HTMLElement>(null);
    const [TableListOpen, setTableOpenList] = useState<null | HTMLElement>(null);
    const [TableSequenceOpen, setTableOpenSequence] =
        useState<null | HTMLElement>(null);
    // const [openCallSnack, setOpenCallSnack] = useState<{ [key: string]: boolean }>({});
    const [TableTelegramOpen, setTableOpenTelegram] =
        useState<null | HTMLElement>(null);
    const openTableTelegram = Boolean(TableTelegramOpen);

    const openTableMail = Boolean(TableMailOpen);
    const openCallMenu = Boolean(callAnchorElement);
    const openTableList = Boolean(TableListOpen);
    const openTableSequence = Boolean(TableSequenceOpen);
    // const [isAddCandidatePopupOpen, setIsAddCandidatePopupOpen] = useState(false);

    // const [tableMenuSendMail, setTableMenuSendMail] = useState<{ [key: string]: boolean }>({});
    // const [openTableMail, setOpenTableMail] = useState(false);
    // const [openCallMenu, setopenCallMenu] = useState(false);
    // const [openAddCandidateModal, setOpenAddCandidateModal] = useState(false);
    const [menuData, setMenuData] = useState<menuData>({
        rowId: "",
        email: "",
        first: "",
        candId: "",
        jobId: "",
        phone: "",
        poolCount: 0,
        poolIds: [],
        poolNames: [],
        sequenceIds: [],
        sequenceNames: [],
        sequenceCount: 0,
        linkedIn: "",
        isPackageEmailValidity: "EMPTY",
        isPackagePhoneValidity: "EMPTY",
        isShowEmail: false,
        isShowPhone: false,
    });

    // const [sort, setSort] = useState({
    //     ...applicantsData
    // })

    // const [selectSequenceList, setSelectSequenceList] = useState<any>([]);
    const [selectCandidList, setSelectCandidList] = useState<any>([]);


    const [isSelectAllChecked, setIsSelectAllChecked] = useState(searchDataInSession.current?.isSelectAllChecked ? searchDataInSession.current?.isSelectAllChecked : false);

    // const [openSequenceModal, setOpenSequenceModal] = useState(false);

    const [addtolistanchorEl, setAddToListAnchorEl] =
        useState<null | HTMLElement>(null);
    const openAddToListenBtn = Boolean(addtolistanchorEl);



    // const [distributionList, setDistributionList] = useState<any>([]);

    const handleClickAddTeligram = (
        event: MouseEvent<HTMLButtonElement>
    ) => {
        setTableOpenTelegram(event.currentTarget);
    };

    // const [showColumns, setShowColumns] = useState([
    //     'mrt-row-select',
    //     "name",
    //     "jobTitle",
    //     "compName",
    //     "Actions",
    //     "score",
    //     "city",
    //     "date"
    // ]);
    const [selectedCommunity, setSelectedCommunity] = useState(searchDataInSession.current?.selectedCommunity ? searchDataInSession.current?.selectedCommunity : { id: "", name: "" });
    const [selectedSequence, setSelectedSequence] = useState({
        id: "",
        name: ""
    });
    const [selectedTalentPool, setSelectedTalentPool] = useState({
        id: "",
        name: "",
    });
    const [createOpen, setCreateOpen] = useState(false);
    const [inviteOpen, setInviteOpen] = useState(false);

    const handleCreateOpen = () => setCreateOpen(true);
    const handleCreateClose = (type?: "ADD") => {
        type === "ADD" && buildJson(pagination.pageIndex, pagination.pageSize, false);
        setCreateOpen(false);
    }
    const handleInviteOpen = () => setInviteOpen(true);
    const handleInviteClose = () => setInviteOpen(false);



    const AIMatchUserIds = useRef(searchDataInSession.current?.AIMatchUserIds ? searchDataInSession.current?.AIMatchUserIds : {
        candids: "",
        joined_candids: "",
        notinvited_candids: "",
        pending_candids: "",
        pool_candids: "",
        scores: ""
    });

    const checkJobId = useRef("");
    const scoresToCheck = useRef<{ [s: string]: string }>({});

    const [showExpandColumn, setShowExpandColumn] = useState(false);

    // const [columnVisibility, setColumnVisibility] = useState({
    //     'mrt-row-expand': showExpandColumn,
    //     name: true,
    //     score: true,
    //     jobTitle: true,
    //     compName: true,
    //     Actions: userLocalData.adminSettings(ID_SETTINGS_QUICK_ACTION),
    //     // Actions: true,
    //     city: true,
    //     date: true,
    //     VoiceAI: userLocalData.adminSettings(ID_ATS_VOICEAI),
    //     Jobdiva: userLocalData.adminSettings(ID_ATS_JOBDIVA),
    //     Avionte: userLocalData.adminSettings(ID_ATS_AVIONTEAPI),
    //     Bullhorn: userLocalData.adminSettings(ID_ATS_BULLHORN),
    // });

    // console.log(Object.keys(rowSelection));
    // const isValidUrl = (str: string) => {
    //     // let url;
    //     // try {
    //     //     url = new URL(text);
    //     // } catch (_) {
    //     //     return false;
    //     // }
    //     // return url.protocol === "http:" || url.protocol === "https:";

    //     var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    //         '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    //         '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    //         '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    //         '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    //         '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    //     return !!pattern.test(str);
    // }

    // const saveDataToSession = (data: any[]) => {
    //     if (!isInJob) {
    //         let dataToSave = {
    //             total: currentSelectedTabCount.current,
    //             filter: mainJsonDataRef.current,
    //             data: data,
    //             tabValue: currentSelectedTabValue.current,
    //             tabList: searchDataInSession.current.tabList,
    //             pagination: pagination,
    //             selectedCommunity: selectedCommunity,
    //             isFiltersApplied: isFiltersApplied.current,
    //             firstLoad: firstLoad.current,
    //             talentPoolName: talentPoolName
    //         };
    //         sessionStorage.setItem(`community_${filtersSearchId.current}`, JSON.stringify(dataToSave));
    //     }
    // }

    const formatPoolData = (id: string, name: string, candidateId: string) => {
        let tempData: any = applicantsData;

        for (let index = 0; index < applicantsData.length; index++) {
            if (tempData[index].candId === candidateId) {

                tempData[index].poolCount = tempData[index].poolCount + 1;
                const arrPoolIds = tempData[index].poolIds;
                tempData[index].poolIds = [...arrPoolIds, id];

                const arrPoolNames = tempData[index].poolNames;
                tempData[index].poolNames = [...arrPoolNames, name];
            }
        }

        setApplicantsData([...tempData]);
        // saveDataToSession(tempData);
    }

    const addToTalentPool = (id: string, name: string, candidateId: string) => {
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
                            handleProfileMenuClose();
                            if (response.data.Message === "Success") {
                                showToaster("Pool has been assigned successfully", 'success');
                                //    console.log("after : "+ tempData);
                                //    loadCanidateData();
                                let candidateIds = candidateId.split(",");
                                !!candidateIds?.length && candidateIds.map((candId: string) => { formatPoolData(id, name, candId) })
                            } else {
                                showToaster(response.data.Message ? response.data.Message : "An error occured while assigning ", 'error');
                            }
                            setSelectedTalentPool({ id: "", name: "" });
                        }
                    )
            )
        }
    }

    const handleTableMenuSendMailOpen = (sendMailId: any) => {
        if (sendMailId) {
            setDialogStatus(true);
            setEmailOnClicked(sendMailId);
            setTableOpenMail(null);
        }
        // console.log(sendMailId);
    };

    const handleTableCall = (
        event: MouseEvent<HTMLButtonElement>,
        callId: any
    ) => {
        // const filterCallId = filterLocalData.filter((item: any) => item.person_id === callId)
        console.log("filterCallId", callId);
        if (callId) {
            setTableOpenMail(null);
            setCallAnchorElement(event.currentTarget);
            setSelectedRowId(callId);
        }
    };

    const handleTableClose = () => {
        setTableOpenMail(null);
        setCallAnchorElement(null);
        setTableOpenList(null);
        setTableOpenSequence(null);
        setTableOpenTelegram(null);
    };
    const handleTableMail = (
        event: MouseEvent<HTMLButtonElement>,
        mailId: any
    ) => {
        //  const filterMailId = filterLocalData.filter((item: any) => item.person_id === mailId)
        if (mailId) {
            setTableOpenMail(event.currentTarget);
            setSelectedRowId(mailId);
            setCallAnchorElement(null);
            // console.log(
            // "aa",
            //     event.currentTarget,
            //     "---" + mailId,
            //     " === " + openTableMail
            // );
        }
    };


    const [pagination, setPagination] = useState(searchDataInSession.current?.pagination?.pageSize ? searchDataInSession.current?.pagination : { pageIndex: 0, pageSize: 50 });
    const [sorting, setSorting] = useState<MRT_SortingState>(searchDataInSession.current?.sorting ? searchDataInSession.current?.sorting : []);

    const applyFilters = async (filterData: any, applied: boolean, isAIMatch: boolean = false) => {
        // console.log(filterData)
        // setMainJsonData(filterData);
        if (searchName) {
            setSearchName("");
            searchNameRef.current = {
                firstName: "",
                lastName: "",
                email: ""
            }
        }
        setSelectedRowCount(0);
        setRowSelection({});
        setIsSelectAllChecked(false);
        mainJsonDataRef.current = filterData;
        isFiltersApplied.current = applied;
        isAIMatchSelected.current = isAIMatch;
        // if (isAIMatch) {
        currentSelectedTabValue.current = 'All';
        await setTabValue('All');
        // }
        if (pagination.pageIndex === 0) {
            buildJson(0, 50, true);
        } else {
            setPagination({
                pageIndex: 0,
                pageSize: 50
            })
        }
        if (isInJob) isInJobRef.current = true;
    };

    const updateJobDetails = (id: string, name: string) => {
        selectedJob.current = {
            title: name,
            id: id,
        };
    };

    const handleClickAddToListen = (
        event: MouseEvent<HTMLButtonElement>, callId: any
    ) => {
        setAddToListAnchorEl(event.currentTarget);
        // loadDistributionList();
        setSelectedRowId(callId);
    };
    const openSequnceToolTip = (
        event: MouseEvent<HTMLButtonElement>, callId: any
    ) => {
        setTableOpenList(event.currentTarget);
        // loadDistributionList();
        setSelectedRowId(callId);
    };


    // const handleTableSequence = (
    //     event: MouseEvent<HTMLButtonElement>, candId: any
    // ) => {
    //     setTableOpenList(null);
    //     setOpenSequenceModal(true);
    //     // loadDistributionList();
    //     let candList = (candId != "") ? candId : Object.keys(rowSelection)
    //     setSelectSequenceList(candList);
    // };


    // const handleSequancePopup = (value: any | null) => {
    //     // Handle the value returned from the popup
    //     setOpenSequenceModal(false);
    //     setSequenceCountList(value);
    //     //console.log("close : "+value);
    //     let tempData: any = applicantsData;
    //     for (let index = 0; index < applicantsData.length; index++) {
    //         if (tempData[index].candId === value.userIds) {
    //             tempData[index].sequenceCount = tempData[index].sequenceCount + 1;
    //             const arrPoolIds = tempData[index].sequenceIds;
    //             tempData[index].sequenceIds = [...arrPoolIds, selectedTalentPool.id];
    //         }
    //     }
    //     //  console.log("after : "+ tempData);
    //     setApplicantsData(tempData);

    // };

    const openWebSite = (link: string) => {
        window.open(link, '_blank');
    }

    const formatSequenceData = (id: string, name: string, candidateId: string) => {
        let tempData: any = applicantsData;

        for (let index = 0; index < applicantsData.length; index++) {
            if (tempData[index].candId === candidateId) {
                tempData[index].sequenceCount = tempData[index].sequenceCount + 1;

                const arrSeqIds = tempData[index].sequenceIds;
                tempData[index].sequenceIds = [...arrSeqIds, id];

                const arrSeqNames = tempData[index].sequenceNames;
                tempData[index].sequenceNames = [...arrSeqNames, name];
            }
        }

        setApplicantsData([...tempData]);
        // saveDataToSession(tempData);
    }

    const addToSequenceList = (id: string, name: string, candidateId: string) => {
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
                        //     showToaster((response.data.message) ? response.data.message : "campaign saved successfully", 'success');
                        //    loadCanidateData(); 

                        if ((response.data.message === "Success") || (response.data.Message === "Success")) {
                            showToaster("Campaign has been assigned successfully", 'success');
                            //  loadCanidateData();     
                            let candidateIds = candidateId.split(",");
                            !!candidateIds?.length && candidateIds.map((candId: string) => { formatSequenceData(id, name, candId) })
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

    // const [selectAllElement, setSelectAllElement] = useState<null | HTMLElement>(null);
    const [addtopoollistanchorEl, setAddToPoolListAnchorEl] = useState<null | HTMLElement>(null);
    const [addtosequencelistanchorEl, setAddToSequenceListAnchorEl] = useState<null | HTMLElement>(null);

    const handleProfileMenuClose = () => {
        setAddToListAnchorEl(null);
        setAddToPoolListAnchorEl(null);
        setTableOpenList(null);
        setAddToSequenceListAnchorEl(null);
    };

    // const Userid = userLocalData.getvalue('recrId');
    // const Username = userLocalData.getvalue('userName');
    // const CompId = '12938';
    // const Compname = 'vali company 002';
    // const searchid = '0';
    // const companiesToCheck = 'vali company 002';

    const selectedJob = useRef({
        title: "",
        id: "",
    });

    const openCandidateView = (id: string, candidateFullName: String) => {
        // if (selectedJob.current.id || jobIdFromJobPage) {
        //     let tempJobId = selectedJob.current.id || jobIdFromJobPage;
        //     window.open(globalData.getWindowLocation() + "candidate/view/" + id.trim() + '/' + tempJobId);
        // } else {
        //     window.open(globalData.getWindowLocation() + "candidate/view/" + id.trim());
        // }


        if (location.pathname.includes(`${userLocalData.getvalue("clientName")}/job/view`)) {
            setOpenCandidateModal(true);
            setOpenCandidateId(id);
        } else {
            const isTalentPoolRoute = location.pathname.includes(`${userLocalData.getvalue("clientName")}/talentPool/view`)
            let breadCrumbsData = [
                {
                    text: "Search",
                    link: `../../${isTalentPoolRoute ? `talentPool/view/${talentPoolId}` : "resume/community"}`
                },
                {
                    text: isTalentPoolRoute ? "Talent Pool" : "Community",
                    link: `../../${isTalentPoolRoute ? `talentPool/view/${talentPoolId}` : "resume/community"}?id=${filtersSearchId.current}`,
                },
                {
                    text: candidateFullName, link: ""
                },
            ];

            searchDataInSession.current = {
                ...searchDataInSession.current,
                candidateOpened: true
            };
            if (filtersSearchId.current) {
                sessionStorage.setItem(`community_${filtersSearchId.current}`, JSON.stringify(searchDataInSession.current));
            }
            if (selectedJob.current.id || jobIdFromJobPage) {
                let tempJobId = selectedJob.current.id || jobIdFromJobPage;
                candidateOpened.current = true;
                navigate(`../../candidate/view/${id.trim()}/${tempJobId}`, { state: { data: breadCrumbsData } });
            } else {
                candidateOpened.current = true;
                navigate(`../../candidate/view/${id.trim()}`, { state: { data: breadCrumbsData } })
            }
        }
    };

    // const openCandidateEdit = (candidateId: string) => {
    //     trackPromise(
    //         ApiService.getByParams(193, "/Candidate/candidate_details.jsp", {
    //             candId: candidateId,
    //         }).then((response: any) => {
    //             const result = response.data;
    //             // console.log(result);
    //             setCandidateData({
    //                 firstName: String(result.firstName ? result.firstName : ""),
    //                 lastName: String(result.lastName ? result.lastName : ""),
    //                 linkedIn: String(result.linkedIn ? result.linkedIn : ""),
    //                 email: String(result.email ? result.email : ""),
    //                 email2: String(result.email2 ? result.email2 : ""),
    //                 cellPhone2: String(result.cellPhone2 ? result.cellPhone2 : ""),
    //                 workPhone: String(result.workPhone ? result.workPhone : ""),
    //                 street: String(result.street ? result.street : ""),
    //                 cellPhone: String(result.cellPhone ? result.cellPhone : ""),
    //                 zip: Number(result.zip ? result.zip : ""),
    //                 city: String(result.city ? result.city : ""),
    //                 state: String(result.state ? result.state : ""),
    //                 homePhone: String(result.homePhone ? result.homePhone : ""),
    //                 homePhone2: String(result.homePhone2 ? result.homePhone2 : ""),
    //             });
    //             updateDocumentTitle.set(
    //                 result.firstName + result.lastName + " | Candidate"
    //             );
    //             setOpenAddCandidateModal(true);
    //         })
    //     );
    //     // trackPromise(
    //     //     ApiService.getByParams(193, 'Candidate/candidate_overview.jsp', { candId: candidateId })
    //     //         .then((response: any) => {
    //     //             // console.log(response.data);
    //     //             setCanOverviewData(response.data);
    //     //         })
    //     // );
    // };

    // const loadDistributionList = () => {
    //     ApiService.getByParams(193, "distributionlist.jsp", {
    //         userId: userLocalData.getvalue("recrId"),
    //         type: "Candidate",
    //     }).then((response: any) => {
    //         setDistributionList(response.data);
    //     });
    // };
    const [criteriaColumns, setCriteriaColumns] = useState<MRT_ColumnDef<any>[]>([]);

    const columns: MRT_ColumnDef<any>[] = useMemo(
        () => {
            const defaultColumns: MRT_ColumnDef<any>[] = [
                {
                    accessorKey: "name", //simple recommended way to define a column
                    // enableColumnPinning: true,
                    header: "Name",
                    accessorFn: row => `${row.first} ${row.last} ${row.linkedIn}`,
                    Cell: ({ row }) => {
                        // let first = row.original.first ? row.original.first.toLowerCase() : "";
                        // let last = row.original.last ? row.original.last.toLowerCase() : "";
                        // let fullName = (first || last) ? first + " " + last : "N/A";

                        // let jobTitle = (row.original.jobTitle) ? row.original.jobTitle.toLowerCase() : "";
                        let displayTitle = row.original.fullName.length > 30 ? row.original.fullName.slice(0, 30) + "..." : row.original.fullName;
                        return (
                            <span className="hightLightTd candidateNameCommunity">
                                <span className="candidateStatusCommunity">
                                    {
                                        (row.original.status && (row.original.status === "10")) ?
                                            <Tooltip title="Do Not Hire">
                                                <FiberManualRecordIcon className='c-red mr-1' />
                                            </Tooltip>
                                            :
                                            (row.original.availability) ?
                                                (row.original.availability === "10011001") ?
                                                    <Tooltip title="Available Now">
                                                        <FiberManualRecordIcon className='c-green mr-1' />
                                                    </Tooltip> :
                                                    (row.original.availability === "10011002") ?
                                                        <Tooltip title="Available Soon">
                                                            <FiberManualRecordOutlinedIcon className='c-green mr-1' />
                                                        </Tooltip> :
                                                        (row.original.availability === "10011003") ?
                                                            <Tooltip title="Passively Looking">
                                                                <FiberManualRecordIcon className='c-lightOrange mr-1' />
                                                            </Tooltip> :
                                                            (row.original.availability === "10011004") ?
                                                                <Tooltip title="Not Looking">
                                                                    <FiberManualRecordIcon className='c-grey mr-1' />
                                                                </Tooltip>
                                                                :
                                                                null :
                                                null
                                    }
                                </span>
                                <Tooltip title={row.original.fullName} classes={{ tooltip: 'tt-capital' }}>
                                    <span className="pr-2" onClick={() => openCandidateView(row.original.candId, row.original.fullName)}>{displayTitle}</span>
                                </Tooltip>
                                <span>
                                    {
                                        row.original.linkedIn ?
                                            <Tooltip title={row.original.linkedIn} className="linkedinIcon mt-1">
                                                <LinkedInIcon className='c-cursor' onClick={() => openWebSite(row.original.linkedIn)} />
                                            </Tooltip>
                                            : " "
                                    }
                                </span>
                            </span>
                        );
                    },
                    size: 80,
                },
                {
                    accessorKey: "score",
                    header: "",
                    // muiTableHeadCellProps: ({ column }) => ({
                    //     sx: {
                    //         display: Boolean(mainJsonData.parsedDocument) ? '' : 'none !important'
                    //     },
                    // }),
                    // muiTableBodyCellProps: ({ column }) => ({
                    //     sx: {
                    //         display: Boolean(mainJsonData.parsedDocument) ? '' : 'none !important'
                    //     },
                    // }),
                    Cell: ({ row }) =>
                        row.original.hasOwnProperty("score") ? (
                            <Box sx={{ position: "relative", display: "inline-flex" }}>
                                <CircularProgress
                                    variant="determinate"
                                    value={Math.round(row.original.score)}
                                />
                                <Box
                                    sx={{
                                        top: 0,
                                        left: 0,
                                        bottom: 0,
                                        right: 0,
                                        position: "absolute",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Typography
                                        variant="caption"
                                        component="div"
                                        color="text.secondary"
                                    >{`${Math.round(row.original.score)}%`}</Typography>
                                </Box>
                            </Box>
                        ) : null,
                    size: 80,
                },
                {
                    accessorKey: "jobTitle",
                    header: "Job",
                    Cell: ({ row }) => {
                        let jobTitle = row.original.jobTitle
                            ? row.original.jobTitle.toLowerCase()
                            : "";
                        let displayTitle =
                            jobTitle.length > 30 ? jobTitle.slice(0, 30) + "..." : jobTitle;
                        return (
                            jobTitle.length > 30 ?
                                <Tooltip
                                    title={row.original.jobTitle}
                                    classes={{ tooltip: "tt-capital" }}
                                >
                                    <span>{displayTitle}</span>
                                </Tooltip>
                                :
                                <span>{displayTitle}</span>
                        );
                    },
                },
                {
                    accessorKey: "compName",
                    header: "Company",
                    Cell: ({ row }) => {
                        let compName = row.original.compName
                            ? row.original.compName.toLowerCase()
                            : "";
                        let displayTitle =
                            compName.length > 30 ? compName.slice(0, 30) + "..." : compName;
                        return (
                            compName.length > 30 ?
                                <Tooltip
                                    title={row.original.compName}
                                    classes={{ tooltip: "tt-capital" }}
                                >
                                    <span>{displayTitle}</span>
                                </Tooltip>
                                :
                                <span>{displayTitle}</span>
                        );
                    },
                },
                // {
                //     accessorKey: "compName",
                //     header: "Company"
                // },
                {
                    accessorKey: "Actions",
                    header: "Quick Actions",
                    enableSorting: false,
                    Cell: ({ row }) => (
                        <Stack key={row.original.candId}>
                            <ButtonGroup
                                variant="outlined"
                                id={row.original.candId}
                                // sx={{    // width: "33px",    height: "31px",    mr: 1,}}
                                sx={{
                                    // width: "33px",
                                    height: "31px",
                                    "& .MuiButtonGroup-grouped": {
                                        marginRight: "1px",
                                        border: "1px solid var(--c-neutral-40)"
                                    },
                                }}
                            >
                                <Tooltip title={(((row.original.isPackageEmailValidity === "UPGRADE") || !row.original.isShowEmail) && row.original.email) ? Mask.email(row.original.email) : row.original.email} placement="top">
                                    <Button
                                        id={`mailbutton-${row.id}`}
                                        onClick={e => {
                                            if (row.original.email) {
                                                if (((row.original.isPackageEmailValidity === "UPGRADE") || !row.original.isShowEmail)) {
                                                    handleTableMail(e, `${row.id}`);
                                                } else if ((menuData.isPackageEmailValidity === "EMPTY") && isEmailSMSSettingEnabled) {
                                                    handleTableMenuSendMailOpen(row.original.email);
                                                } else {
                                                    handleTableMail(e, `${row.id}`);
                                                }
                                                setMenuData({
                                                    rowId: row.id,
                                                    email: row.original.email,
                                                    first: row.original.first,
                                                    candId: row.original.candId,
                                                    jobId: row.original.jobId,
                                                    phone: "",
                                                    poolCount: row.original.poolCount,
                                                    poolIds: row.original.poolIds,
                                                    poolNames: row.original.poolNames,
                                                    sequenceIds: row.original.sequenceIds,
                                                    sequenceNames: row.original.sequenceNames,
                                                    sequenceCount: row.original.sequenceCount,
                                                    linkedIn: row.original.linkedIn,
                                                    isPackageEmailValidity: row.original.isPackageEmailValidity,
                                                    isPackagePhoneValidity: row.original.isPackagePhoneValidity,
                                                    isShowEmail: row.original.isShowEmail,
                                                    isShowPhone: row.original.isShowPhone,
                                                });
                                            }
                                        }}
                                        aria-controls={openTableMail && selectedRowId === `${row.id}` ? `mail-${row.id}` : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={openTableMail && selectedRowId === `${row.id}` ? "true" : undefined}
                                        sx={{
                                            // pointerEvents: row.original.email ? "auto" : "none",
                                            borderColor: openTableMail && selectedRowId === `${row.id}` ? "1px solid var(--c-neutral-40)" : "var(--c-secondary-color)",
                                            backgroundColor: "#ffffff",
                                            color: openTableMail && selectedRowId === `${row.id}` ? "1px solid var(--c-neutral-40)" : "#919191",
                                            borderRightColor: openTableMail && selectedRowId === `${row.id}` ? "1px solid var(--c-neutral-40)" : "var(--c-secondary-color)",
                                            mr: "0px",
                                            "&:hover": { border: "1px solid var(--c-neutral-40)", color: "#919191", backgroundColor: "#ffffff", },
                                            width: "33px",
                                        }}
                                        // sx={{ borderColor: "var(--c-secondary-color)", backgroundColor: "#ffffff", color: "#919191", borderRightColor: "var(--c-secondary-color)", width: "33px", }}
                                        className={`customButtonForHover ${row.original.email ? "" : "disabled"} `}
                                    >
                                        {/* {row.original.isShowEmail ? "1" : "0"} */}
                                        <Box sx={{ position: "relative", display: "inline-block", alignItems: "center", mt: 1, }} >
                                            <MailOutlineOutlinedIcon sx={{ fontSize: "16px", }} />

                                            <Box sx={{ backgroundColor: "#1DB268", height: "10px", width: "10px", borderRadius: "50%", fontSize: "10px", display: row.original.email ? "flex" : "none", justifyContent: "center", alignItems: "center", color: "red", position: "absolute", top: -2, right: -2, }}                                    >
                                                <DoneRoundedIcon sx={{ fontSize: "8px", color: "#ffffff", }} />
                                            </Box>

                                            <Box sx={{ backgroundColor: "#919191", height: "10px", width: "10px", borderRadius: "50%", fontSize: "10px", display: row.original.email ? "none" : "flex", justifyContent: "center", alignItems: "center", color: "red", position: "absolute", top: -2, right: -2, }}                                    >
                                                <CloseRoundedIcon sx={{ fontSize: "8px", color: "#ffffff", }} />
                                            </Box>

                                            <Box sx={{ backgroundColor: "#EB7A2F", display: "none", height: "10px", width: "10px", borderRadius: "50%", fontSize: "10px", justifyContent: "center", alignItems: "center", color: "red", position: "absolute", top: -2, right: -2, }} >
                                                <QuestionMarkRoundedIcon sx={{ color: "#ffffff", fontSize: "8px", }} />
                                            </Box>
                                        </Box>
                                        {/* <ArrowDropDownIcon sx={{ fontSize: "16px", }} /> */}
                                    </Button>
                                </Tooltip>


                                <Tooltip title={(((row.original.isPackagePhoneValidity === "UPGRADE") || !row.original.isShowPhone) && row.original.phone) ? Mask.phone(`${USPhoneFormat.get(row.original.phone)}`) : `${USPhoneFormat.get(row.original.phone)}`} placement="top">
                                    <Button
                                        id={`phonebutton-${row.id}`}
                                        disableRipple
                                        onClick={e => {
                                            if (row.original.phone) {
                                                setMenuData({
                                                    rowId: row.id,
                                                    email: "",
                                                    first: row.original.first,
                                                    candId: row.original.candId,
                                                    jobId: row.original.jobId,
                                                    phone: row.original.phone,
                                                    poolCount: row.original.poolCount,
                                                    poolIds: row.original.poolIds,
                                                    poolNames: row.original.poolNames,
                                                    sequenceIds: row.original.sequenceIds,
                                                    sequenceNames: row.original.sequenceNames,
                                                    sequenceCount: row.original.sequenceCount,
                                                    linkedIn: row.original.linkedIn,
                                                    isPackageEmailValidity: row.original.isPackageEmailValidity,
                                                    isPackagePhoneValidity: row.original.isPackagePhoneValidity,
                                                    isShowEmail: row.original.isShowEmail,
                                                    isShowPhone: row.original.isShowPhone,
                                                });
                                                if (((row.original.isPackagePhoneValidity === "UPGRADE") || !row.original.isShowPhone)) {
                                                    handleTableCall(e, `${row.id}`);
                                                } else if ((menuData.isPackagePhoneValidity === "EMPTY") && isEmailSMSSettingEnabled) {
                                                    setPhoneOnClicked(row.original.phone);
                                                    setDialogPhoneStatus(true);
                                                } else {
                                                    handleTableCall(e, `${row.id}`);
                                                }
                                            }
                                        }}
                                        aria-controls={openCallMenu && selectedRowId === `${row.id}` ? `phone-${row.id}` : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={openCallMenu && selectedRowId === `${row.id}` ? "true" : undefined}
                                        className={`customButtonForHover ${row.original.phone ? "" : "disabled"} `}
                                        sx={{
                                            borderColor: openCallMenu && selectedRowId === `${row.id}` ? "1px solid var(--c-neutral-40)" : "var(--c-secondary-color)",
                                            backgroundColor: "#ffffff",
                                            color: openCallMenu && selectedRowId === `${row.id}` ? "#919191" : "#919191",
                                            "& .MuiButtonGroup-root .MuiButtonGroup-grouped:not(:last-of-type)": {
                                                borderRightColor: openCallMenu && selectedRowId === `${row.id}` ? "1px solid var(--c-neutral-40)" : "",
                                            },
                                            "&:hover": { border: "1px solid var(--c-neutral-40)", color: "#919191", backgroundColor: "#ffffff", },
                                            width: "33px",
                                        }}
                                    >
                                        {/* {row.original.isShowPhone ? "1" : "0"} */}
                                        <CallOutlinedIcon sx={{ fontSize: "16px", }} />
                                        {/* <ArrowDropDownIcon sx={{ fontSize: "16px", }} /> */}
                                    </Button>
                                </Tooltip>


                                <Tooltip title={`${Number(row.original.poolCount) ? `In ${row.original.poolCount} Pool${Number(row.original.poolCount) > 1 ? "s" : ""}` : `Add to Pool`}`} placement="top">
                                    <Button
                                        id={`poollistbutton-${row.id}`}
                                        disableRipple

                                        aria-controls={
                                            openAddToListenBtn && selectedRowId === `${row.id}`
                                                ? `addlistmenu-${row.id}`
                                                : undefined
                                        }
                                        aria-haspopup="true"
                                        aria-expanded={
                                            openAddToListenBtn && selectedRowId === `${row.id}`
                                                ? "true"
                                                : undefined
                                        }

                                        // onClick={handleClickAddToListen}
                                        // onClick={(e) => {
                                        //     if (row.original.candId) {
                                        //         setMenuData({
                                        //             rowId: row.id,
                                        //             email: '',
                                        //             first: row.original.first,
                                        //             candId: row.original.candId,
                                        //             jobId: row.original.jobId,
                                        //             phone: row.original.phone
                                        //         })
                                        //         handleTableList(e, `${row.id}`)
                                        //     }
                                        // }
                                        // }
                                        // aria-controls={
                                        //     openCallMenu && selectedRowId === `${row.id}`
                                        //         ? `list-${row.id}` : undefined
                                        // }
                                        // aria-haspopup="true"
                                        // aria-expanded={
                                        //     openCallMenu && selectedRowId === `${row.id}` ? "true" : undefined
                                        // }
                                        onClick={e => {
                                            if (row.original.candId) {
                                                setMenuData({
                                                    rowId: row.id,
                                                    email: "",
                                                    first: row.original.first,
                                                    candId: row.original.candId,
                                                    jobId: row.original.jobId,
                                                    phone: row.original.phone,
                                                    poolCount: row.original.poolCount,
                                                    poolIds: row.original.poolIds,
                                                    poolNames: row.original.poolNames,
                                                    sequenceIds: row.original.sequenceIds,
                                                    sequenceNames: row.original.sequenceNames,
                                                    sequenceCount: row.original.sequenceCount,
                                                    linkedIn: row.original.linkedIn,
                                                    isPackageEmailValidity: row.original.isPackageEmailValidity,
                                                    isPackagePhoneValidity: row.original.isPackagePhoneValidity,
                                                    isShowEmail: row.original.isShowEmail,
                                                    isShowPhone: row.original.isShowPhone,
                                                });

                                            }
                                            handleClickAddToListen(e, row.id);
                                        }}

                                        className="customButtonForHover"
                                        sx={{
                                            borderColor:
                                                openCallMenu && selectedRowId === `${row.id}`
                                                    ? "1px solid var(--c-neutral-40)"
                                                    : "var(--c-secondary-color)",
                                            backgroundColor: "#ffffff",
                                            color:
                                                openCallMenu && selectedRowId === `${row.id}`
                                                    ? "#919191"
                                                    : "#919191",
                                            "& .MuiButtonGroup-root .MuiButtonGroup-grouped:not(:last-of-type)":
                                            {
                                                borderRightColor:
                                                    openCallMenu && selectedRowId === `${row.id}`
                                                        ? "1px solid var(--c-neutral-40)"
                                                        : "",
                                            },
                                            "&:hover": {
                                                border: "1px solid var(--c-neutral-40)",
                                                color: "#919191",
                                                backgroundColor: "#ffffff",
                                            },
                                            width: "33px",
                                        }}
                                    >
                                        <PlaylistAddOutlinedIcon
                                            sx={{
                                                fontSize: "16px",
                                            }}
                                        />
                                        {
                                            Number(row.original.poolCount) ?
                                                <span>{row.original.poolCount}</span>
                                                :
                                                null
                                        }
                                        {/* <ArrowDropDownIcon
                                        sx={{
                                            fontSize: "16px",
                                        }}
                                    /> */}
                                    </Button>
                                </Tooltip>
                                <Tooltip title={`${Number(row.original.sequenceCount) ? `In ${row.original.sequenceCount} Campaign${Number(row.original.sequenceCount) > 1 ? "s" : ""}` : `Add to Campaign`}`} placement="top">
                                    <Button
                                        id={`sequencebutton-${row.id}`}
                                        disableRipple
                                        onClick={e => {
                                            if (row.original.candId) {
                                                setMenuData({
                                                    rowId: row.id,
                                                    email: "",
                                                    first: row.original.first,
                                                    candId: row.original.candId,
                                                    jobId: row.original.jobId,
                                                    phone: row.original.phone,
                                                    poolCount: row.original.poolCount,
                                                    poolIds: row.original.poolIds,
                                                    poolNames: row.original.poolNames,
                                                    sequenceIds: row.original.sequenceIds,
                                                    sequenceNames: row.original.sequenceNames,
                                                    sequenceCount: row.original.sequenceCount,
                                                    linkedIn: row.original.linkedIn,
                                                    isPackageEmailValidity: row.original.isPackageEmailValidity,
                                                    isPackagePhoneValidity: row.original.isPackagePhoneValidity,
                                                    isShowEmail: row.original.isShowEmail,
                                                    isShowPhone: row.original.isShowPhone,
                                                });
                                                // handleTableSequence(e, row.original.candId)
                                                openSequnceToolTip(e, row.original.candId);
                                            }
                                        }}
                                        aria-controls={openTableSequence && selectedRowId === `${row.id}` ? `sequence-${row.id}` : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={openTableSequence && selectedRowId === `${row.id}` ? "true" : undefined}
                                        className="customButtonForHover"
                                        sx={{
                                            borderColor: openTableSequence && selectedRowId === `${row.id}` ? "1px solid var(--c-neutral-40)" : "var(--c-secondary-color)",
                                            backgroundColor: "#ffffff",
                                            color: openTableSequence && selectedRowId === `${row.id}` ? "#919191" : "#919191",
                                            "& .MuiButtonGroup-root .MuiButtonGroup-grouped:not(:last-of-type)": {
                                                borderRightColor: openTableSequence && selectedRowId === `${row.id}` ? "1px solid var(--c-neutral-40)" : "",
                                            },
                                            "&:hover": { border: "1px solid var(--c-neutral-40)", color: "#919191", backgroundColor: "#ffffff", },
                                            width: "33px",
                                        }}
                                    >
                                        <SendOutlinedIcon sx={{ fontSize: "16px", }} />
                                        {Number(row.original.sequenceCount) ? <span>{row.original.sequenceCount}</span> : null}
                                        {/* <ArrowDropDownIcon sx={{ fontSize: "16px", }} /> */}
                                    </Button>
                                </Tooltip>

                                {row.original.notInvited ? (
                                    <Tooltip title="Invite" placement="top">
                                        <Button
                                            className="customButtonForHover"
                                            disableRipple
                                            sx={{ border: "1px solid var(--c-neutral-40)", backgroundColor: "#ffffff", color: "#919191", width: "33px", }}
                                            id="add-telegram-btn"
                                            aria-controls={
                                                openTableTelegram ? "addtelegrammenu" : undefined
                                            }
                                            aria-haspopup="true"
                                            aria-expanded={openTableTelegram ? "true" : undefined}
                                            onClick={handleClickAddTeligram}
                                        >
                                            <TelegramIcon
                                                sx={{
                                                    // height: "20px",
                                                    // width: "15px",
                                                    fontSize: "16px",
                                                }}
                                            />
                                        </Button>
                                    </Tooltip>
                                ) : null}
                                {/* <Tooltip title="Edit" placement="top">
                                <Button
                                    className="customButtonForHover"
                                    sx={{
                                        borderColor: "var(--c-secondary-color)",
                                        backgroundColor: "#ffffff",
                                        color: "#919191",
                                        width: "33px",
                                    }}
                                    onClick={() => openCandidateEdit(row.original.candId)}
                                >
                                    <EditIcon
                                        sx={{
                                            // height: "20px",
                                            // width: "15px",
                                            fontSize: "16px",
                                        }}
                                    />
                                </Button>
                            </Tooltip> */}
                            </ButtonGroup>
                        </Stack>
                    ),
                    size: 100,
                },


                // {
                //     accessorKey: "phone",
                //     header: "Phone"
                // },
                // {
                //     accessorKey: "city",
                //     header: "City"
                // },
                // {
                //     accessorKey: "state",
                //     header: "State",
                //     size: 50
                // },
                // {
                //     accessorKey: "zipCode",
                //     header: "Zip Code",
                //     size: 50
                // },
                {
                    accessorKey: "City",
                    header: "Location",
                    Cell: ({ row }) => {
                        let location = [row.original.city.trim(), row.original.state.trim(), row.original.zipCode.trim()]
                            .filter((each) => ![null, undefined, ""].includes(each)).join(", ").trim();
                        if (location.length > 25)
                            return (
                                <Tooltip title={location}>
                                    <span>{location.slice(0, 20)}...</span>
                                </Tooltip>
                            )
                        else return (<span>{location}</span>)
                    },
                },
                {
                    accessorKey: "date",
                    header: "Date",
                    Cell: ({ row }) => (
                        <span>
                            {DateTime.fromFormat(
                                row.original.date.substring(0, 19),
                                "yyyy-MM-dd hh:mm:ss"
                            ).toFormat("MM/dd/yyyy ")}
                        </span>
                    ),
                    size: 80,
                },
                {
                    accessorKey: "VoiceAI",
                    header: "Voice AI",
                    Cell: ({ row }: any) => {
                        return <span className="ml-4">
                            {row?.original.VoiceAIValue?.trim() ?
                                <CheckOutlinedIcon color='success' />
                                :
                                row.original.VoiceAIReason?.trim() ?
                                    <Tooltip title="Click here to View Error Message">
                                        <span className="ml-0 errorMsg" style={{ cursor: 'pointer' }} onClick={() => {
                                            OpenErrorModal({ errorMessage: row?.original?.VoiceAIReason, title: "VoiceAI - Error Message" })
                                        }} > <ErrorOutlineOutlinedIcon color="error" />  </span>
                                    </Tooltip>
                                    : null
                            }
                        </span>
                    },
                    size: 80,
                },
                {
                    accessorKey: "Jobdiva",
                    header: "JobDiva",
                    Cell: ({ row }: any) => {
                        return <span className="ml-4">
                            {(row?.original.JobDivaValue?.trim()) ?
                                <span className="ml-0" onClick={() => { JobDivaLink.jobDivaLinkUrl("candidate", row?.original.JobDivaValue?.trim()) }} title="JobDiva" style={{ cursor: 'pointer' }}  > <CheckOutlinedIcon color='success' className='cursor-pointer' /></span>
                                //   <CheckOutlinedIcon color='success' className='cursor-pointer' onClick={() => { window.open(`https://www2.jobdiva.com/employers/myreports/viewcandidate2_real.jsp?candidateid=${row.original.JobDivaValue.trim()}`)}} />
                                :
                                row.original.JobDivaReason?.trim() ?
                                    <Tooltip title="Click here to View Error Message">
                                        <span className="ml-0 errorMsg" style={{ cursor: 'pointer' }} onClick={() => {
                                            OpenErrorModal({ errorMessage: row?.original?.JobDivaReason, title: "JobDiva - Error Message" })
                                        }} >
                                            <ErrorOutlineOutlinedIcon color="error" className='cursor-pointer' />
                                        </span>
                                    </Tooltip>
                                    : null
                            }
                        </span>
                    },
                    size: 80,
                },
                {
                    accessorKey: "Avionte",
                    header: "Avionte",
                    Cell: ({ row }: any) => {
                        return <span className="ml-4">
                            {(row?.original.AvionteValue?.trim()) ?
                                <CheckOutlinedIcon color='success' />
                                :
                                row.original.AvionteReason?.trim() ?
                                    <Tooltip title="Click here to View Error Message">
                                        <span className="ml-0 errorMsg" style={{ cursor: 'pointer' }} onClick={() => {
                                            OpenErrorModal({ errorMessage: row?.original?.AvionteReason, title: "Avionte - Error Message" })
                                        }} > <ErrorOutlineOutlinedIcon color="error" />  </span>
                                    </Tooltip>
                                    : null

                            }
                        </span>
                    },
                    size: 80,
                },
                {
                    accessorKey: "Bullhorn",
                    header: "Bullhorn",
                    Cell: ({ row }: any) => {
                        return <span className="ml-4">
                            {(row?.original.BullhornValue?.trim()) ?
                                <CheckOutlinedIcon color='success' />
                                :
                                row.original.BullhornReason?.trim() ?
                                    <Tooltip title="Click here to View Error Message">
                                        <span className="ml-0 errorMsg" title="" style={{ cursor: 'pointer' }} onClick={() => {
                                            OpenErrorModal({ errorMessage: row?.original?.BullhornReason, title: "Bullhorn - Error Message" })
                                        }} > <ErrorOutlineOutlinedIcon color="error" />  </span>
                                    </Tooltip>
                                    : null
                            }
                        </span>
                    },
                    size: 80,
                },
            ];
            const hidedNames = ["Talent Pool", "Sequence", "Email", "Phone", "City", "State", "Zipcode"]
            let finalColumnsList = orderedColumnsList.map((each) => {
                switch (each.name) {
                    case "Candidate Name": return {
                        accessorKey: each.key, //simple recommended way to define a column
                        header: each.name,
                        enableColumnPinning: false,
                        enableSorting: false,
                        accessorFn: (row: any) => `${row.first} ${row.last} ${row.linkedIn}`,
                        Cell: ({ row }: any) => {
                            // let first = row.original.first ? row.original.first.toLowerCase() : "";
                            // let last = row.original.last ? row.original.last.toLowerCase() : "";
                            // let fullName = (first || last) ? first + " " + last : "N/A";

                            // let jobTitle = (row.original.jobTitle) ? row.original.jobTitle.toLowerCase() : "";
                            let displayTitle = row.original.fullName.length > 30 ? row.original.fullName.slice(0, 30) + "..." : row.original.fullName;
                            return (
                                <span className="hightLightTd candidateNameCommunity">
                                    <span className="candidateStatusCommunity">
                                        {
                                            (row.original.status && (row.original.status === "10")) ?
                                                <Tooltip title="Do Not Hire">
                                                    <FiberManualRecordIcon className='c-red mr-1' />
                                                </Tooltip>
                                                :
                                                (row.original.availability) ?
                                                    (row.original.availability === "10011001") ?
                                                        <Tooltip title="Available Now">
                                                            <FiberManualRecordIcon className='c-green mr-1' />
                                                        </Tooltip> :
                                                        (row.original.availability === "10011002") ?
                                                            <Tooltip title="Available Soon">
                                                                <FiberManualRecordOutlinedIcon className='c-green mr-1' />
                                                            </Tooltip> :
                                                            (row.original.availability === "10011003") ?
                                                                <Tooltip title="Passively Looking">
                                                                    <FiberManualRecordIcon className='c-lightOrange mr-1' />
                                                                </Tooltip> :
                                                                (row.original.availability === "10011004") ?
                                                                    <Tooltip title="Not Looking">
                                                                        <FiberManualRecordIcon className='c-grey mr-1' />
                                                                    </Tooltip>
                                                                    :
                                                                    null :
                                                    null
                                        }
                                    </span>
                                    <Tooltip title={row.original.fullName} classes={{ tooltip: 'tt-capital' }}>
                                        <span className="pr-2" onClick={() => openCandidateView(row.original.candId, row.original.fullName)}>{displayTitle}</span>
                                    </Tooltip>
                                    {
                                        row.original.userStatusName ?
                                            <span className='label-btn'>{row.original.userStatusName}</span>
                                            :
                                            null
                                    }
                                    <span>
                                        {
                                            row.original.linkedIn ?
                                                <Tooltip title={row.original.linkedIn} className="linkedinIcon mt-1">
                                                    <LinkedInIcon className='c-cursor' onClick={() => openWebSite(row.original.linkedIn)} />
                                                </Tooltip>
                                                : " "
                                        }
                                    </span>
                                </span>
                            );
                        },
                        size: 80,
                    };
                    case "Job Title": return {
                        accessorKey: each.key,
                        header: each.name,
                        Cell: ({ row }: any) => {
                            let jobTitle = row.original.jobTitle
                                ? row.original.jobTitle.toLowerCase()
                                : "";
                            let displayTitle =
                                jobTitle.length > 30 ? jobTitle.slice(0, 30) + "..." : jobTitle;
                            return (
                                jobTitle.length > 30 ?
                                    <Tooltip
                                        title={row.original.jobTitle}
                                        classes={{ tooltip: "tt-capital" }}
                                    >
                                        <span>{displayTitle}</span>
                                    </Tooltip>
                                    :
                                    <span>{displayTitle}</span>
                            );
                        },
                        enableColumnPinning: false,
                        enableSorting: false
                    };
                    case "Company": return {
                        accessorKey: each.key,
                        header: each.name,
                        Cell: ({ row }: any) => {
                            let compName = row.original.compName
                                ? row.original.compName.toLowerCase()
                                : "";
                            let displayTitle =
                                compName.length > 30 ? compName.slice(0, 30) + "..." : compName;
                            return (
                                compName.length > 30 ?
                                    <Tooltip
                                        title={row.original.compName}
                                        classes={{ tooltip: "tt-capital" }}
                                    >
                                        <span>{displayTitle}</span>
                                    </Tooltip>
                                    :
                                    <span>{displayTitle}</span>
                            );
                        },
                        enableColumnPinning: false,
                        enableSorting: false
                    };

                    case "Quick Action":
                    case "Quick action":
                    case "Quick Actions":
                        return {
                            accessorKey: each.key,
                            header: "Quick Actions",
                            enableSorting: false,
                            enableColumnPinning: false,
                            Cell: ({ row }: any) => (
                                <Stack key={row.original.candId}>
                                    <ButtonGroup
                                        variant="outlined"
                                        id={row.original.candId}
                                        // sx={{    // width: "33px",    height: "31px",    mr: 1,}}
                                        sx={{
                                            // width: "33px",
                                            height: "31px",
                                            "& .MuiButtonGroup-grouped": {
                                                marginRight: "1px",
                                                border: "1px solid var(--c-neutral-40)"
                                            },
                                        }}
                                    >
                                        <Tooltip title={((!row.original.isShowEmail) && row.original.email) ? Mask.email(row.original.email) : row.original.email} placement="top">
                                            <Button
                                                id={`mailbutton-${row.id}`}
                                                onClick={e => {
                                                    if (row.original.email) {
                                                        if (((row.original.isPackageEmailValidity === "UPGRADE") || !row.original.isShowEmail)) {
                                                            handleTableMail(e, `${row.id}`);
                                                        } else if ((menuData.isPackageEmailValidity === "EMPTY") && isEmailSMSSettingEnabled) {
                                                            handleTableMenuSendMailOpen(row.original.email);
                                                        } else {
                                                            handleTableMail(e, `${row.id}`);
                                                        }
                                                        setMenuData({
                                                            rowId: row.id,
                                                            email: row.original.email,
                                                            first: row.original.first,
                                                            candId: row.original.candId,
                                                            jobId: row.original.jobId,
                                                            phone: "",
                                                            poolCount: row.original.poolCount,
                                                            poolIds: row.original.poolIds,
                                                            poolNames: row.original.poolNames,
                                                            sequenceIds: row.original.sequenceIds,
                                                            sequenceNames: row.original.sequenceNames,
                                                            sequenceCount: row.original.sequenceCount,
                                                            linkedIn: row.original.linkedIn,
                                                            isPackageEmailValidity: row.original.isPackageEmailValidity,
                                                            isPackagePhoneValidity: row.original.isPackagePhoneValidity,
                                                            isShowEmail: row.original.isShowEmail,
                                                            isShowPhone: row.original.isShowPhone,
                                                        });
                                                    }
                                                }}
                                                aria-controls={openTableMail && selectedRowId === `${row.id}` ? `mail-${row.id}` : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={openTableMail && selectedRowId === `${row.id}` ? "true" : undefined}
                                                sx={{
                                                    // pointerEvents: row.original.email ? "auto" : "none",
                                                    borderColor: openTableMail && selectedRowId === `${row.id}` ? "1px solid var(--c-neutral-40)" : "var(--c-secondary-color)",
                                                    backgroundColor: "#ffffff",
                                                    color: openTableMail && selectedRowId === `${row.id}` ? "1px solid var(--c-neutral-40)" : "#919191",
                                                    borderRightColor: openTableMail && selectedRowId === `${row.id}` ? "1px solid var(--c-neutral-40)" : "var(--c-secondary-color)",
                                                    mr: "0px",
                                                    "&:hover": { border: "1px solid var(--c-neutral-40)", color: "#919191", backgroundColor: "#ffffff", },
                                                    width: "33px",
                                                }}
                                                // sx={{ borderColor: "var(--c-secondary-color)", backgroundColor: "#ffffff", color: "#919191", borderRightColor: "var(--c-secondary-color)", width: "33px", }}
                                                className={`customButtonForHover ${row.original.email ? "" : "disabled"} `}
                                            >
                                                {/* {row.original.isShowEmail ? "1" : "0"} */}
                                                <Box sx={{ position: "relative", display: "inline-block", alignItems: "center", mt: 1, }} >
                                                    <MailOutlineOutlinedIcon sx={{ fontSize: "16px", }} />

                                                    <Box sx={{ backgroundColor: "#1DB268", height: "10px", width: "10px", borderRadius: "50%", fontSize: "10px", display: row.original.email ? "flex" : "none", justifyContent: "center", alignItems: "center", color: "red", position: "absolute", top: -2, right: -2, }}                                    >
                                                        <DoneRoundedIcon sx={{ fontSize: "8px", color: "#ffffff", }} />
                                                    </Box>

                                                    <Box sx={{ backgroundColor: "#919191", height: "10px", width: "10px", borderRadius: "50%", fontSize: "10px", display: row.original.email ? "none" : "flex", justifyContent: "center", alignItems: "center", color: "red", position: "absolute", top: -2, right: -2, }}                                    >
                                                        <CloseRoundedIcon sx={{ fontSize: "8px", color: "#ffffff", }} />
                                                    </Box>

                                                    <Box sx={{ backgroundColor: "#EB7A2F", display: "none", height: "10px", width: "10px", borderRadius: "50%", fontSize: "10px", justifyContent: "center", alignItems: "center", color: "red", position: "absolute", top: -2, right: -2, }} >
                                                        <QuestionMarkRoundedIcon sx={{ color: "#ffffff", fontSize: "8px", }} />
                                                    </Box>
                                                </Box>
                                                {/* <ArrowDropDownIcon sx={{ fontSize: "16px", }} /> */}
                                            </Button>
                                        </Tooltip>

                                        {
                                            userLocalData.isPaid() ?
                                                <Tooltip title={((!row.original.isShowPhone) && row.original.phone) ? Mask.phone(`${USPhoneFormat.get(row.original.phone)}`) : `${USPhoneFormat.get(row.original.phone)}`} placement="top">
                                                    <Button
                                                        id={`phonebutton-${row.id}`}
                                                        disableRipple
                                                        onClick={e => {
                                                            if (row.original.phone) {
                                                                setMenuData({
                                                                    rowId: row.id,
                                                                    email: "",
                                                                    first: row.original.first,
                                                                    candId: row.original.candId,
                                                                    jobId: row.original.jobId,
                                                                    phone: row.original.phone,
                                                                    poolCount: row.original.poolCount,
                                                                    poolIds: row.original.poolIds,
                                                                    poolNames: row.original.poolNames,
                                                                    sequenceIds: row.original.sequenceIds,
                                                                    sequenceNames: row.original.sequenceNames,
                                                                    sequenceCount: row.original.sequenceCount,
                                                                    linkedIn: row.original.linkedIn,
                                                                    isPackageEmailValidity: row.original.isPackageEmailValidity,
                                                                    isPackagePhoneValidity: row.original.isPackagePhoneValidity,
                                                                    isShowEmail: row.original.isShowEmail,
                                                                    isShowPhone: row.original.isShowPhone,
                                                                });
                                                                if (((row.original.isPackagePhoneValidity === "UPGRADE") || !row.original.isShowPhone)) {
                                                                    handleTableCall(e, `${row.id}`);
                                                                } else if ((menuData.isPackagePhoneValidity === "EMPTY") && isEmailSMSSettingEnabled) {
                                                                    setPhoneOnClicked(row.original.phone);
                                                                    setDialogPhoneStatus(true);
                                                                } else {
                                                                    handleTableCall(e, `${row.id}`);
                                                                }
                                                            }
                                                        }}
                                                        aria-controls={openCallMenu && selectedRowId === `${row.id}` ? `phone-${row.id}` : undefined}
                                                        aria-haspopup="true"
                                                        aria-expanded={openCallMenu && selectedRowId === `${row.id}` ? "true" : undefined}
                                                        className={`customButtonForHover ${row.original.phone ? "" : "disabled"} `}
                                                        sx={{
                                                            borderColor: openCallMenu && selectedRowId === `${row.id}` ? "1px solid var(--c-neutral-40)" : "var(--c-secondary-color)",
                                                            backgroundColor: "#ffffff",
                                                            color: openCallMenu && selectedRowId === `${row.id}` ? "#919191" : "#919191",
                                                            "& .MuiButtonGroup-root .MuiButtonGroup-grouped:not(:last-of-type)": {
                                                                borderRightColor: openCallMenu && selectedRowId === `${row.id}` ? "1px solid var(--c-neutral-40)" : "",
                                                            },
                                                            "&:hover": { border: "1px solid var(--c-neutral-40)", color: "#919191", backgroundColor: "#ffffff", },
                                                            width: "33px",
                                                        }}
                                                    >
                                                        {/* {row.original.isShowPhone ? "1" : "0"} */}
                                                        <Box sx={{ position: "relative", display: "inline-block", alignItems: "center", mt: 1, }} >
                                                            <CallOutlinedIcon sx={{ fontSize: "16px", }} />
                                                            <Box>
                                                                <CheckCircleRoundedIcon htmlColor='#1DB268' sx={{ fontSize: '12px', display: row.original.phone ? "flex" : "none", position: "absolute", top: -2, right: -4 }} />
                                                            </Box>
                                                            <Box>
                                                                <CloseRoundedIcon sx={{ backgroundColor: "#919191", borderRadius: "50%", color: "#ffffff", fontSize: "10px", display: row.original.phone ? "none" : "flex", position: "absolute", top: -2, right: -4 }} />
                                                            </Box>
                                                        </Box>
                                                        {/* <ArrowDropDownIcon sx={{ fontSize: "16px", }} /> */}
                                                    </Button>
                                                </Tooltip>
                                                :
                                                null
                                        }


                                        <Tooltip title={`${Number(row.original.poolCount) ? `In ${row.original.poolCount} Pool${Number(row.original.poolCount) > 1 ? "s" : ""}` : `Add to Pool`}`} placement="top">
                                            <Button
                                                id={`poollistbutton-${row.id}`}
                                                disableRipple

                                                aria-controls={
                                                    openAddToListenBtn && selectedRowId === `${row.id}`
                                                        ? `addlistmenu-${row.id}`
                                                        : undefined
                                                }
                                                aria-haspopup="true"
                                                aria-expanded={
                                                    openAddToListenBtn && selectedRowId === `${row.id}`
                                                        ? "true"
                                                        : undefined
                                                }

                                                // onClick={handleClickAddToListen}
                                                // onClick={(e) => {
                                                //     if (row.original.candId) {
                                                //         setMenuData({
                                                //             rowId: row.id,
                                                //             email: '',
                                                //             first: row.original.first,
                                                //             candId: row.original.candId,
                                                //             jobId: row.original.jobId,
                                                //             phone: row.original.phone
                                                //         })
                                                //         handleTableList(e, `${row.id}`)
                                                //     }
                                                // }
                                                // }
                                                // aria-controls={
                                                //     openCallMenu && selectedRowId === `${row.id}`
                                                //         ? `list-${row.id}` : undefined
                                                // }
                                                // aria-haspopup="true"
                                                // aria-expanded={
                                                //     openCallMenu && selectedRowId === `${row.id}` ? "true" : undefined
                                                // }
                                                onClick={e => {
                                                    if (row.original.candId) {
                                                        setMenuData({
                                                            rowId: row.id,
                                                            email: "",
                                                            first: row.original.first,
                                                            candId: row.original.candId,
                                                            jobId: row.original.jobId,
                                                            phone: row.original.phone,
                                                            poolCount: row.original.poolCount,
                                                            poolIds: row.original.poolIds,
                                                            poolNames: row.original.poolNames,
                                                            sequenceIds: row.original.sequenceIds,
                                                            sequenceNames: row.original.sequenceNames,
                                                            sequenceCount: row.original.sequenceCount,
                                                            linkedIn: row.original.linkedIn,
                                                            isPackageEmailValidity: row.original.isPackageEmailValidity,
                                                            isPackagePhoneValidity: row.original.isPackagePhoneValidity,
                                                            isShowEmail: row.original.isShowEmail,
                                                            isShowPhone: row.original.isShowPhone,
                                                        });

                                                    }
                                                    handleClickAddToListen(e, row.id);
                                                }}

                                                className="customButtonForHover"
                                                sx={{
                                                    borderColor:
                                                        openCallMenu && selectedRowId === `${row.id}`
                                                            ? "1px solid var(--c-neutral-40)"
                                                            : "var(--c-secondary-color)",
                                                    backgroundColor: "#ffffff",
                                                    color:
                                                        openCallMenu && selectedRowId === `${row.id}`
                                                            ? "#919191"
                                                            : "#919191",
                                                    "& .MuiButtonGroup-root .MuiButtonGroup-grouped:not(:last-of-type)":
                                                    {
                                                        borderRightColor:
                                                            openCallMenu && selectedRowId === `${row.id}`
                                                                ? "1px solid var(--c-neutral-40)"
                                                                : "",
                                                    },
                                                    "&:hover": {
                                                        border: "1px solid var(--c-neutral-40)",
                                                        color: "#919191",
                                                        backgroundColor: "#ffffff",
                                                    },
                                                    width: "33px",
                                                }}
                                            >
                                                <PlaylistAddOutlinedIcon
                                                    sx={{
                                                        fontSize: "16px",
                                                    }}
                                                />
                                                {
                                                    Number(row.original.poolCount) ?
                                                        <span>{row.original.poolCount}</span>
                                                        :
                                                        null
                                                }
                                                {/* <ArrowDropDownIcon
                                            sx={{
                                                fontSize: "16px",
                                            }}
                                        /> */}
                                            </Button>
                                        </Tooltip>
                                        <Tooltip title={`${Number(row.original.sequenceCount) ? `In ${row.original.sequenceCount} Campaign${Number(row.original.sequenceCount) > 1 ? "s" : ""}` : `Add to Campaign`}`} placement="top">
                                            <Button
                                                id={`sequencebutton-${row.id}`}
                                                disableRipple
                                                onClick={e => {
                                                    if (row.original.candId) {
                                                        setMenuData({
                                                            rowId: row.id,
                                                            email: "",
                                                            first: row.original.first,
                                                            candId: row.original.candId,
                                                            jobId: row.original.jobId,
                                                            phone: row.original.phone,
                                                            poolCount: row.original.poolCount,
                                                            poolIds: row.original.poolIds,
                                                            poolNames: row.original.poolNames,
                                                            sequenceIds: row.original.sequenceIds,
                                                            sequenceNames: row.original.sequenceNames,
                                                            sequenceCount: row.original.sequenceCount,
                                                            linkedIn: row.original.linkedIn,
                                                            isPackageEmailValidity: row.original.isPackageEmailValidity,
                                                            isPackagePhoneValidity: row.original.isPackagePhoneValidity,
                                                            isShowEmail: row.original.isShowEmail,
                                                            isShowPhone: row.original.isShowPhone,
                                                        });
                                                        // handleTableSequence(e, row.original.candId)
                                                        openSequnceToolTip(e, row.original.candId);
                                                    }
                                                }}
                                                aria-controls={openTableSequence && selectedRowId === `${row.id}` ? `sequence-${row.id}` : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={openTableSequence && selectedRowId === `${row.id}` ? "true" : undefined}
                                                className="customButtonForHover"
                                                sx={{
                                                    borderColor: openTableSequence && selectedRowId === `${row.id}` ? "1px solid var(--c-neutral-40)" : "var(--c-secondary-color)",
                                                    backgroundColor: "#ffffff",
                                                    color: openTableSequence && selectedRowId === `${row.id}` ? "#919191" : "#919191",
                                                    "& .MuiButtonGroup-root .MuiButtonGroup-grouped:not(:last-of-type)": {
                                                        borderRightColor: openTableSequence && selectedRowId === `${row.id}` ? "1px solid var(--c-neutral-40)" : "",
                                                    },
                                                    "&:hover": { border: "1px solid var(--c-neutral-40)", color: "#919191", backgroundColor: "#ffffff", },
                                                    width: "33px",
                                                }}
                                            >
                                                <SendOutlinedIcon sx={{ fontSize: "16px", }} />
                                                {Number(row.original.sequenceCount) ? <span>{row.original.sequenceCount}</span> : null}
                                                {/* <ArrowDropDownIcon sx={{ fontSize: "16px", }} /> */}
                                            </Button>
                                        </Tooltip>

                                        {row.original.notInvited ? (
                                            <Tooltip title="Invite" placement="top">
                                                <Button
                                                    className="customButtonForHover"
                                                    disableRipple
                                                    sx={{ border: "1px solid var(--c-neutral-40)", backgroundColor: "#ffffff", color: "#919191", width: "33px", }}
                                                    id="add-telegram-btn"
                                                    aria-controls={
                                                        openTableTelegram ? "addtelegrammenu" : undefined
                                                    }
                                                    aria-haspopup="true"
                                                    aria-expanded={openTableTelegram ? "true" : undefined}
                                                    onClick={handleClickAddTeligram}
                                                >
                                                    <TelegramIcon
                                                        sx={{
                                                            // height: "20px",
                                                            // width: "15px",
                                                            fontSize: "16px",
                                                        }}
                                                    />
                                                </Button>
                                            </Tooltip>
                                        ) : null}
                                        {/* <Tooltip title="Edit" placement="top">
                                    <Button
                                        className="customButtonForHover"
                                        sx={{
                                            borderColor: "var(--c-secondary-color)",
                                            backgroundColor: "#ffffff",
                                            color: "#919191",
                                            width: "33px",
                                        }}
                                        onClick={() => openCandidateEdit(row.original.candId)}
                                    >
                                        <EditIcon
                                            sx={{
                                                // height: "20px",
                                                // width: "15px",
                                                fontSize: "16px",
                                            }}
                                        />
                                    </Button>
                                </Tooltip> */}
                                    </ButtonGroup>

                                </Stack>
                            ),
                            size: 100,
                        }
                    // case "City": return {
                    //     accessorKey: "city",
                    //     header: each.name,
                    //     Header: () => <div>Location</div>,
                    //     Cell: ({row}: any) => (
                    //         <span className="location">
                    //             {row.original.city?.trim()}
                    //             {row.original.city?.trim() && row.original.state?.trim() ? ", " : ""}
                    //             {row.original.state?.trim()}
                    //             {row.original.state?.trim() && row.original.zipCode ? ", " : ""}
                    //             {row.original.zipCode}
                    //         </span>
                    //     ),
                    //     enableColumnPinning: false,
                    //     enableSorting: false
                    // };
                    case "Date": return {
                        accessorKey: each.key,
                        header: each.name,
                        Cell: ({ row }: any) => (
                            <span>
                                {DateTime.fromFormat(
                                    row.original.date.substring(0, 19),
                                    "yyyy-MM-dd hh:mm:ss"
                                ).toFormat("MM/dd/yyyy ")}
                            </span>
                        ),
                        size: 80,
                        enableColumnPinning: false,
                        enableSorting: false
                    };
                    case "Score": return {
                        accessorKey: each.key,
                        header: each.name,
                        Cell: ({ row }: any) =>
                            row.original.hasOwnProperty("score") ? (
                                <Box sx={{ position: "relative", display: "inline-flex" }}>
                                    <CircularProgress
                                        variant="determinate"
                                        value={Math.round(row.original.score)}
                                    />
                                    <Box
                                        sx={{
                                            top: 0,
                                            left: 0,
                                            bottom: 0,
                                            right: 0,
                                            position: "absolute",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Typography
                                            variant="caption"
                                            component="div"
                                            color="text.secondary"
                                        >{`${Math.round(row.original.score)}%`}</Typography>
                                    </Box>
                                </Box>
                            ) : null,
                        size: 80,
                        enableColumnPinning: false,
                        enableSorting: false
                    };
                    case "Location": return {
                        accessorKey: each.key,
                        header: each.name,
                        enableSorting: false,
                        enableColumnPinning: false,
                        Cell: ({ row }: any) => {
                            let location = [row.original.city.trim(), row.original.state.trim(), row.original.zipCode.trim()]
                                .filter((each) => ![null, undefined, ""].includes(each)).join(", ").trim();
                            if (location.length > 25)
                                return (
                                    <Tooltip title={location}>
                                        <span>{location.slice(0, 20)}...</span>
                                    </Tooltip>
                                )
                            else return (<span>{location}</span>)
                        },
                    }

                    case "Voice AI":
                    case "VoiceAi":
                        return {
                            accessorKey: each.key,
                            header: "Voice AI",
                            Cell: ({ row }: any) => {
                                return <span className="ml-4">
                                    {row?.original.VoiceAIValue?.trim() ?
                                        <CheckOutlinedIcon color='success' />
                                        :
                                        row.original.VoiceAIReason?.trim() ?
                                            <Tooltip title="Click here to View Error Message">
                                                <span className="ml-0 errorMsg" style={{ cursor: 'pointer' }} onClick={() => {
                                                    OpenErrorModal({ errorMessage: row?.original?.VoiceAIReason, title: "VoiceAI - Error Message" })
                                                }} > <ErrorOutlineOutlinedIcon color="error" />  </span>
                                            </Tooltip>
                                            : null
                                    }
                                </span>
                            },
                            size: 80,
                            enableSorting: false,
                            enableColumnPinning: false,
                        }
                    case "Jobdiva":
                    case "JobDiva":
                        return {
                            accessorKey: each.key,
                            header: "JobDiva",
                            Cell: ({ row }: any) => {
                                return <span className="ml-4">
                                    {(row?.original.JobDivaValue?.trim()) ?
                                        <span className="ml-0" onClick={() => { JobDivaLink.jobDivaLinkUrl("candidate", row?.original.JobDivaValue?.trim()) }} title="JobDiva" style={{ cursor: 'pointer' }}  > <CheckOutlinedIcon color='success' className='cursor-pointer' /></span>
                                        //   <CheckOutlinedIcon color='success' className='cursor-pointer' onClick={() => { window.open(`https://www2.jobdiva.com/employers/myreports/viewcandidate2_real.jsp?candidateid=${row.original.JobDivaValue.trim()}`)}} />
                                        :
                                        row.original.JobDivaReason?.trim() ?
                                            <Tooltip title="Click here to View Error Message">
                                                <span className="ml-0 errorMsg" title="" style={{ cursor: 'pointer' }} onClick={() => {
                                                    OpenErrorModal({ errorMessage: row?.original?.JobDivaReason, title: "JobDiva - Error Message" })
                                                }} >
                                                    <ErrorOutlineOutlinedIcon color="error" className='cursor-pointer' />
                                                </span>
                                            </Tooltip>
                                            : null
                                    }
                                </span>
                            },
                            size: 80,
                            enableSorting: false,
                            enableColumnPinning: false,
                        };
                    case "Avionte":
                    case "Aviont":
                        return {
                            accessorKey: each.key,
                            header: "Avionte",
                            Cell: ({ row }: any) => {
                                return <span className="ml-4">
                                    {(row?.original.AvionteValue?.trim()) ?
                                        <CheckOutlinedIcon color='success' />
                                        :
                                        row.original.AvionteReason?.trim() ?
                                            <Tooltip title="Click here to View Error Message">
                                                <span className="ml-0 errorMsg" title="" style={{ cursor: 'pointer' }} onClick={() => {
                                                    OpenErrorModal({ errorMessage: row?.original?.AvionteReason, title: "Avionte - Error Message" })
                                                }} > <ErrorOutlineOutlinedIcon color="error" />  </span>
                                            </Tooltip>
                                            : null

                                    }
                                </span>
                            },
                            Header: () => <span>Avionte</span>,
                            size: 80,
                            enableSorting: false,
                            enableColumnPinning: false,
                        };
                    case "Bullhorn":
                    case "Bulhorn":
                        return {
                            accessorKey: each.key,
                            header: "Bullhorn",
                            Cell: ({ row }: any) => {
                                return <span className="ml-4">
                                    {(row?.original.BullhornValue?.trim()) ?
                                        <CheckOutlinedIcon color='success' />
                                        :
                                        row.original.BullhornReason?.trim() ?
                                            <Tooltip title="Click here to View Error Message">
                                                <span className="ml-0 errorMsg" title="" style={{ cursor: 'pointer' }} onClick={() => {
                                                    OpenErrorModal({ errorMessage: row?.original?.BullhornReason, title: "Bullhorn - Error Message" })
                                                }} > <ErrorOutlineOutlinedIcon color="error" />  </span>
                                            </Tooltip>
                                            : null
                                    }
                                </span>
                            },
                            Header: () => <span>Bullhorn</span>,
                            size: 80,
                            enableSorting: false,
                            enableColumnPinning: false,
                        };
                    default: switch (each.type) {
                        case "DATE": return {
                            accessorKey: each.key,
                            header: each.name,
                            size: each.name.length > 12 ? 180 : 75,
                            enableSorting: false,
                            enableColumnPinning: false,
                            Cell: ({ row }: any) => (
                                row.original[each.key] &&
                                (row.original[each.key].trim().length > 10 ? <span>
                                    {DateTime.fromFormat(row.original[each.key].trim().substring(0, 19), "yyyy-MM-dd hh:mm:ss")?.toFormat("MM/dd/yyyy")}
                                </span> :
                                    <span>
                                        {DateTime.fromFormat(row.original[each.key].trim(), "yyyy-MM-dd")?.toFormat("MM/dd/yyyy")}
                                    </span>)
                            )
                        };
                        default:
                            return {
                                accessorKey: each.key,
                                header: each.name,
                                size: each.name.length > 12 ? 180 : 75,
                                enableSorting: false,
                                enableColumnPinning: false,
                                Cell: ({ row }: any) => {
                                    const data = row?.original[each?.key] ? (row?.original[each.key]?.toString() || "") : ""
                                    const displayTitle = data?.length > 20 ? data.slice(0, 20) : data;
                                    if (data?.length > 20) {
                                        return (
                                            <Tooltip title={data}>
                                                <span>{displayTitle}...</span>
                                            </Tooltip>
                                        )
                                    } else return <span>{displayTitle}</span>
                                }
                            }
                    }
                }
            });
            finalColumnsList = finalColumnsList.map((each, index) => ({
                ...each, enableColumnPinning: index === 0 ? true : false
            }))


            // if (isInJob || selectedJob.current.id) return [...defaultColumns, ...criteriaColumns]
            // else if (!!orderedColumnsList?.length && !!layoutData?.length) return [...finalColumnsList, ...criteriaColumns].filter((each) => !hidedNames.includes(each.header));
            if (!!orderedColumnsList?.length && !!layoutData?.length) {
                let layoutColumnsList = [...finalColumnsList, ...criteriaColumns].filter((each) => !hidedNames.includes(each.header));
                return [...layoutColumnsList, { ...defaultColumns.find((each: any) => each.accessorKey === "score"), size: 20 }] as MRT_ColumnDef<any>[];
            }
            else return [...defaultColumns, ...criteriaColumns];
        }, [orderedColumnsList, criteriaColumns]);


    // const [columns, setColumns] = useState<MRT_ColumnDef<any>[]>(defaultColumns);

    const [customHeadingsList, setCustomHeadingsList] = useState<any>([]);
    // setColumns(() => defaultColumns, [...[].map((each: any) => ({"accessorKey": each.key, "header": each.name }))]);

    const toggleFilers = () => {
        setFiltersExpand(!filtersExpand);
    };

    const buildJson = async (
        pageNumber = 0,
        pageSize = 50,
        // passedJsonDataFromFilters: any,
        count: boolean,
        _?: boolean, // passSearchName?: boolean,
        isLoadCount = true
    ) => {
        // if (!passSearchName) {
        //     setSearchName('');
        //     searchNameRef.current = {
        //         firstName: "",
        //         lastName: "",
        //         email: ""
        //     }
        // }
        let talentPoolIds: string[] = [];
        let tagIds: string[] = [];
        let passedJsonData = { ...mainJsonDataRef.current };
        let jsonToPass: any;
        if (passedJsonData.jobTitles) {
            if (talentPoolId) {
                passedJsonData.talentPoolId = talentPoolId;
            }
            // console.log(passedJsonData, "passedJsonData");
            if (passedJsonData.location.zipCode) {
                if (passedJsonData.location.radius === "") {
                    showToaster("Radius is Mandatory", "error");
                    return false;
                }
            }

            jsonToPass = JSON.parse(JSON.stringify(MASTER_JSON_COMMUNITY));

            // $('#badges').empty();
            // $(".hideIf").hide();

            jsonToPass.PaginationSettings.Skip = pageNumber * pageSize;
            jsonToPass.PaginationSettings.Take = pageSize;

            let jobtitlesTemp: any = [];
            let skillsTemp: any = [];
            for (let i = 0; i < passedJsonData.jobTitles.length; i++) {
                if (passedJsonData.jobTitles[i].title !== "") {
                    jsonToPass.FilterCriteria.JobTitles.push({
                        Title: passedJsonData.jobTitles[i].title,
                        IsCurrent: passedJsonData.jobTitles[i].required,
                    });
                    jobtitlesTemp.push(passedJsonData.jobTitles[i].title);
                    // let badNum = passedJsonData.jobTitles.eq(i).find('input[type="text"]').attr('id').replace(/^\D+/g, '');

                    // $('#badges').append(`<button type="button" class="btn btn-outline-light text-dark border mr-2 mb-1 badgeadded" id="jobtitleBadge` + badNum + `" onclick='removeBadge("jobtitle","` + badNum + `")'> Job Titles : ` + passedJsonData.jobTitles[i].title + `<span class="badge ml-2 rounded-0"><i class="fas fa-times"></i></span> </button>`);
                }
            }
            let d = new Date();
            d.setDate(d.getDate() - Number(passedJsonData.daysBack));
            let tempFullYear = d.getFullYear();
            let tempMonth: string | number = d.getMonth() + 1;
            let tempDate: string | number = d.getDate();
            if (tempMonth < 10) {
                tempMonth = "0" + tempMonth;
            }
            if (tempDate < 10) {
                tempDate = "0" + tempDate;
            }
            let d1 = new Date();
            let tempFullYear1 = d1.getFullYear();
            let tempMonth1: string | number = d1.getMonth() + 1;
            let tempDate1: string | number = d1.getDate();
            if (tempMonth1 < 10) {
                tempMonth1 = "0" + tempMonth1;
            }
            if (tempDate1 < 10) {
                tempDate1 = "0" + tempDate1;
            }
            // "2020-06-23"
            jsonToPass.FilterCriteria.RevisionDateRange.Minimum =
                tempFullYear + "-" + tempMonth + "-" + tempDate;
            jsonToPass.FilterCriteria.RevisionDateRange.Maximum =
                tempFullYear1 + "-" + tempMonth1 + "-" + tempDate1;

            jsonToPass.FilterCriteria.MonthsExperience.Minimum =
                parseInt(passedJsonData.minExp) * 12;
            jsonToPass.FilterCriteria.MonthsExperience.Maximum =
                parseInt(passedJsonData.maxExp) * 12;
            // if (passedJsonData.minExp != '' && passedJsonData.maxExp != '') {
            //     $('#badges').append(`<button type="button" class="btn btn-outline-light text-dark border mr-2 mb-1 badgeadded" id="expBadge1" onclick='removeExpBadge("month","1")'> Exp : ` + passedJsonData.minExp + ` - ` + passedJsonData.maxExp + `<span class="badge ml-2 rounded-0"><i class="fas fa-times"></i></span> </button>`);
            // } else if (passedJsonData.minExp != '') {
            //     $('#badges').append(`<button type="button" class="btn btn-outline-light text-dark border mr-2 mb-1 badgeadded" id="expBadge1" onclick='removeExpBadge("month","1")'> Exp : ` + passedJsonData.minExp + `<span class="badge ml-2 rounded-0"><i class="fas fa-times"></i></span> </button>`);
            // } else if (passedJsonData.maxExp != '') {
            //     $('#badges').append(`<button type="button" class="btn btn-outline-light text-dark border mr-2 mb-1 badgeadded" id="expBadge1" onclick='removeExpBadge("month","1")'> Exp : ` + passedJsonData.maxExp + `<span class="badge ml-2 rounded-0"><i class="fas fa-times"></i></span> </button>`);
            // }

            jsonToPass.FilterCriteria.MonthsManagementExperience.Minimum =
                Number(passedJsonData.minManExp) * 12;
            jsonToPass.FilterCriteria.MonthsManagementExperience.Maximum =
                Number(passedJsonData.maxManExp) * 12;
            // if (Number(passedJsonData.minManExp) && Number(passedJsonData.maxManExp)) {
            //     $('#badges').append(`<button type="button" class="btn btn-outline-light text-dark border mr-2 mb-1 badgeadded" id="expBadge2" onclick='removeExpBadge("manage","2")'>Management Exp : ` + Number(passedJsonData.minManExp) + ` - ` + Number(passedJsonData.maxManExp) + `<span class="badge ml-2 rounded-0"><i class="fas fa-times"></i></span> </button>`);
            // } else if (Number(passedJsonData.minManExp)) {
            //     $('#badges').append(`<button type="button" class="btn btn-outline-light text-dark border mr-2 mb-1 badgeadded" id="expBadge2" onclick='removeExpBadge("manage","2")'>Management Exp : ` + Number(passedJsonData.minManExp) + `<span class="badge ml-2 rounded-0"><i class="fas fa-times"></i></span> </button>`);
            // } else if (Number(passedJsonData.maxManExp)) {
            //     $('#badges').append(`<button type="button" class="btn btn-outline-light text-dark border mr-2 mb-1 badgeadded" id="expBadge2" onclick='removeExpBadge("manage","2")'>Management Exp : ` + Number(passedJsonData.maxManExp) + `<span class="badge ml-2 rounded-0"><i class="fas fa-times"></i></span> </button>`);
            // }

            for (let i = 0; i < passedJsonData.skills.length; i++) {
                if (passedJsonData.skills[i].skillName !== "") {
                    jsonToPass.FilterCriteria.Skills.push({
                        SkillName: passedJsonData.skills[i].skillName,
                        ExperienceLevel: passedJsonData.skills[i].experLevel
                            ? passedJsonData.skills[i].experLevel
                            : "",
                        IsCurrent: passedJsonData.skills[i].recentUse ? true : false,
                    });
                    skillsTemp.push(passedJsonData.skills[i].skillName);
                    // let badNum = passedJsonData.skills.eq(i).find('input[type="text"]').attr('id').replace(/^\D+/g, '');

                    // $('#badges').append(`<button type="button" class="btn btn-outline-light text-dark border mr-2 mb-1 badgeadded" id="skillBadge` + badNum + `" onclick='removeBadge("skillName","` + badNum + `")'> Skills : ` + passedJsonData.skills[i].skillName + `<span class="badge ml-2 rounded-0"><i class="fas fa-times"></i></span> </button>`);
                }
            }
            jsonToPass.FilterCriteria.SkillsMustAllExist =
                passedJsonData.allSkills === "must" ? true : false;
            jsonToPass.FilterCriteria.SearchExpression = passedJsonData.keywords
                ? passedJsonData.keywords.replace(/["]/g, '"')
                : "";

            if (!Array.isArray(passedJsonData.languageSpoken)) {
                passedJsonData.languageSpoken = passedJsonData.languageSpoken
                    ? passedJsonData.languageSpoken.split(",")
                    : [];
            }
            let spokenLang = [];
            for (let i = 0; i < passedJsonData.languageSpoken.length; i++) {
                if (passedJsonData.languageSpoken[i]) {
                    spokenLang.push(passedJsonData.languageSpoken[i]);
                    // // let badNum = passedJsonData.languageSpoken[i].attr('id').replace(/^\D+/g, '');

                    // let spknTypeList = [];
                    // $('#languageSpoken').data('tokenize2').toArray().forEach(element => {
                    //     spknTypeList.push(LANGUAGES.find(function (e) { return e.id === element; }).name);
                    // })
                    // $('#badges').append(`<button type="button" class="btn btn-outline-light text-dark border mr-2 mb-1 badgeadded" id="degreeTypeBadge" onclick='removeLangBadge()'> Languages : ` + spknTypeList.join(', ') + `<span class="badge ml-2 rounded-0"><i class="fas fa-times"></i></span> </button>`);
                }
            }
            jsonToPass.FilterCriteria.LanguagesKnown = passedJsonData.languageSpoken;

            // if ($('#workauth').val().length) {
            //     $('#badges').append(`<button type="button" class="btn btn-outline-light text-dark border mr-2 mb-1 badgeadded" id="workAuthBadge" onclick='removeworkAuthBadge()'> Work Authorization : ` + $('#workauth').val().join(', ') + `<span class="badge ml-2 rounded-0"><i class="fas fa-times"></i></span> </button>`);
            // }
            // if (passedJsonData.workAuthorization.title) {
            //     jsonToPass.FilterCriteria.CustomValueIds.push(
            //         passedJsonData.workAuthorization.title
            //     );
            // }


            // if ($('#searchClient').is(":checked")) {
            //     jsonToPass.FilterCriteria.CustomValueIds.push('CSB');
            // }
            // if ($('#csNinja').is(":checked")) {
            //     jsonToPass.FilterCriteria.CustomValueIds.push('CSNINJA');
            // }
            jsonToPass.FilterCriteria.CustomValueIdsMustAllExist =
                passedJsonData.workAuthorization.required;

            let certiTemp = [];
            for (let i = 0; i < passedJsonData.certifications.length; i++) {
                if (passedJsonData.certifications[i].certificationName) {
                    certiTemp.push(passedJsonData.certifications[i].certificationName);
                    // let badNum = passedJsonData.certifications.eq(i).find('input[type="text"]').attr('id').replace(/^\D+/g, '');

                    // $('#badges').append(`<button type="button" class="btn btn-outline-light text-dark border mr-2 mb-1 badgeadded" id="certificateBadge` + badNum + `" onclick='removeBadge("certificate","` + badNum + `")'> Certifications : ` + passedJsonData.certifications[i].certificationName + `<span class="badge ml-2 rounded-0"><i class="fas fa-times"></i></span> </button>`);
                }
            }
            jsonToPass.FilterCriteria.Certifications = certiTemp.filter(
                (value, index, array) => array.indexOf(value) === index
            );
            let getZip: any = {};
            if (passedJsonData.location.zipCode) {
                getZip = await getZipcode(passedJsonData.location.zipCode);
                // if (getZip.trim() !== { }) {
                //     getZip = JSON.parse(getZip.trim());
                // }
                let lat = (getZip.data && getZip.data.Latitude) ? getZip.data.Latitude : 0;
                let long = (getZip.data && getZip.data.Longitude) ? getZip.data.Longitude : 0;
                // // {"Latitude":"33.774347","Longitude":"-84.291903"}

                jsonToPass.FilterCriteria.LocationCriteria = {
                    Locations: [
                        {
                            CountryCode: "",
                            Region: "",
                            Municipality: "",
                            PostalCode: passedJsonData.location.zipCode,
                            GeoPoint: {
                                Latitude: lat,
                                Longitude: long,
                            },
                        },
                    ],
                    Distance: passedJsonData.location.radius
                        ? passedJsonData.location.radius
                        : 0,
                    DistanceUnit: "Miles",
                    GeocodeProvider: "Google",
                    GeocodeProviderKey: import.meta.env.VITE_GEOCODEPROVIDERKEY,
                };
            } else {
                if (!Array.isArray(passedJsonData.location.state)) {
                    passedJsonData.location.state = passedJsonData.location.state
                        ? passedJsonData.location.state.split(",")
                        : [];
                }
                jsonToPass.FilterCriteria.LocationCriteria = {
                    Locations: [
                        {
                            CountryCode: "",
                            Region: passedJsonData.location.state.length
                                ? passedJsonData.location.state[0]
                                : "",
                            Municipality: passedJsonData?.location?.city ? passedJsonData?.location?.city : "",
                            PostalCode: "",
                            GeoPoint: {
                                Latitude: 0,
                                Longitude: 0,
                            },
                        },
                    ],
                    Distance: 0,
                    DistanceUnit: "Miles",
                    GeocodeProvider: "Google",
                    GeocodeProviderKey: import.meta.env.VITE_GEOCODEPROVIDERKEY,
                };
                for (
                    let locai = 0;
                    locai < passedJsonData.location.state.length;
                    locai++
                ) {
                    if (locai) {
                        jsonToPass.FilterCriteria.LocationCriteria.Locations.push({
                            CountryCode: "",
                            Region: passedJsonData.location.state[locai],
                            Municipality: passedJsonData.location.city,
                            PostalCode: "",
                            GeoPoint: {
                                Latitude: 0,
                                Longitude: 0,
                            },
                        });
                    }
                }
            }
            // if (passedJsonData.location.state.length || passedJsonData.location.zipCode !== '' || passedJsonData.location.radius !== '') {

            // $('#badges').append(`<button type="button" class="btn btn-outline-light text-dark border mr-2 mb-1 badgeadded" id="locationBadge" onclick='removeLocaBadge()'> Location : ` + passedJsonData.location.state.join() + ` ` + passedJsonData.location.zipCode + ` ` + passedJsonData.location.radius + `<span class="badge ml-2 rounded-0"><i class="fas fa-times"></i></span> </button>`);
            // }

            // DegreeTypes

            // "IsTopStudent": false,
            // "IsCurrentStudent": false,
            // "IsRecentGraduate": false,

            // jsonToPass.FilterCriteria.IsTopStudent = $('#IsTopStudent').is(':checked');
            // jsonToPass.FilterCriteria.IsCurrentStudent = $('#IsCurrentStudent').is(':checked');
            // jsonToPass.FilterCriteria.IsRecentGraduate = $('#IsRecentGraduate').is(':checked');
            let degreeTypesTemp = [];
            for (let i = 0; i < passedJsonData.degrees.length; i++) {
                if (passedJsonData.degrees[i].degreeName) {
                    degreeTypesTemp.push(passedJsonData.degrees[i].degreeName);
                    // // let badNum = passedJsonData.degrees[i].degreeName.attr('id').replace(/^\D+/g, '');

                    // let degreeTypesLst = [];
                    // $('#degTypes').data('tokenize2').toArray().forEach(element => {
                    //     degreeTypesLst.push(DEGREE_TYPES.find(function (e) { return e.value === element; }).text);
                    // })
                    // $('#badges').append(`<button type="button" class="btn btn-outline-light text-dark border mr-2 mb-1 badgeadded" id="degreeTypeBadge" onclick='removeDegTypeBadge()'> Degree Type : ` + degreeTypesLst.join(', ') + `<span class="badge ml-2 rounded-0"><i class="fas fa-times"></i></span> </button>`);
                }
            }
            jsonToPass.FilterCriteria.DegreeTypes = passedJsonData.degTypes;
            jsonToPass.FilterCriteria.IsTopStudent = passedJsonData.IsTopStudent;
            jsonToPass.FilterCriteria.IsCurrentStudent =
                passedJsonData.IsCurrentStudent;
            jsonToPass.FilterCriteria.IsRecentGraduate =
                passedJsonData.IsRecentGraduate;

            let schoolNamesTemp = [];
            for (let i = 0; i < passedJsonData.schools.length; i++) {
                if (passedJsonData.schools[i].schoolName) {
                    schoolNamesTemp.push(passedJsonData.schools[i].schoolName);
                    // let badNum = passedJsonData.schools.eq(i).find('input[type="text"]').attr('id').replace(/^\D+/g, '');

                    // $('#badges').append(`<button type="button" class="btn btn-outline-light text-dark border mr-2 mb-1 badgeadded" id="schoolBadge` + badNum + `" onclick='removeBadge("school","` + badNum + `")'> School : ` + passedJsonData.schools[i].schoolName + `<span class="badge ml-2 rounded-0"><i class="fas fa-times"></i></span> </button>`);
                }
            }
            jsonToPass.FilterCriteria.SchoolNames = schoolNamesTemp.filter(
                (value, index, array) => array.indexOf(value) === index
            );

            let degreeNamesTemp = [];
            for (let i = 0; i < passedJsonData.degrees.length; i++) {
                if (passedJsonData.degrees[i].degreeName) {
                    degreeNamesTemp.push(passedJsonData.degrees[i].degreeName);
                    // let badNum = passedJsonData.degrees.eq(i).find('input[type="text"]').attr('id').replace(/^\D+/g, '');

                    // $('#badges').append(`<button type="button" class="btn btn-outline-light text-dark border mr-2 mb-1 badgeadded" id="degreeBadge` + badNum + `" onclick='removeBadge("degree","` + badNum + `")'> Degree : ` + passedJsonData.degrees[i].degreeName + `<span class="badge ml-2 rounded-0"><i class="fas fa-times"></i></span> </button>`);
                }
            }
            jsonToPass.FilterCriteria.DegreeNames = degreeNamesTemp.filter(
                (value, index, array) => array.indexOf(value) === index
            );

            let empNamesTemp: string[] = [];
            for (let i = 0; i < passedJsonData.employer.length; i++) {
                if (passedJsonData.employer[i].employerName) {
                    empNamesTemp.push(passedJsonData.employer[i].employerName);
                    // let badNum = passedJsonData.employer.eq(i).find('input[type="text"]').attr('id').replace(/^\D+/g, '');

                    // $('#badges').append(`<button type="button" class="btn btn-outline-light text-dark border mr-2 mb-1 badgeadded" id="employerBadge` + badNum + `" onclick='removeBadge("employer","` + badNum + `")'> Employer : ` + passedJsonData.employer[i].employerName + `<span class="badge ml-2 rounded-0"><i class="fas fa-times"></i></span> </button>`);
                }
            }
            jsonToPass.FilterCriteria.Employers = empNamesTemp.filter(
                (value, index, array) => array.indexOf(value) === index
            );

            let taxoTemp = [];
            for (let i = 0; i < passedJsonData.industries.length; i++) {
                if (passedJsonData.industries[i].indcate) {
                    if (passedJsonData.industries[i].subCat !== "")
                        taxoTemp.push(passedJsonData.industries[i].subCat);
                    else taxoTemp.push(passedJsonData.industries[i].indcate);

                    // let badNum = passedJsonData.industries.eq(i).find('select[type="text"]').attr('id').replace(/^\D+/g, '');

                    // $('#badges').append(`<button type="button" class="btn btn-outline-light text-dark border mr-2 mb-1 badgeadded" id="industryBadge` + badNum + `" onclick='removeIndustryBadge("` + badNum + `")'> Industry : ` + passedJsonData.industries.eq(i).find('select[type="text"].industry option:selected').text() + ` - ` + passedJsonData.industries.eq(i).find('select[type="text"].subIndustry option:selected').text() + ` <span class="badge ml-2 rounded-0"><i class="fas fa-times"></i></span> </button>`);
                }
            }
            // if ($('#searchClient').is(":checked")) {
            //     if (!docsLoaded) {
            //         docIdsTemp = JSON.parse(await getDocids());
            //         docsLoaded = true;
            //     }
            //     jsonToPass.FilterCriteria.DocumentIds = docIdsTemp;

            // }

            jsonToPass.FilterCriteria.Taxonomies = taxoTemp.filter(
                (value, index, array) => array.indexOf(value) === index
            );
            // console.log(jsonToPass);
            // let postData = {
            //     json: jsonToPass
            // }
            // let jsonToPassForIds = jsonToPass;
            // if ($('#csNinja').is(":checked") && ($('#CLIK').val() || $('#CCAT').val() || $('#EPP').val() || $('#Excel').val() || $('#TT').val() || $('#tenKey').val() || $('#Word').val())) {
            //     $.post('csninja_mongo_results.jsp', {
            //         // jobid: JobId,
            //         // json: JSON.stringify(jsonToPass),
            //         // client_subs: ($('#searchClient').is(":checked")) ? '1' : '0',
            //         csninja: ($('#csNinja').is(":checked")) ? '1' : '0',
            //         CLIK: $('#CLIK').val(),
            //         CCAT: $('#CCAT').val(),
            //         EPP: $('#EPP').val(),
            //         Excel: $('#Excel').val(),
            //         TT: $('#TT').val(),
            //         tenKey: $('#tenKey').val(),
            //         Word: $('#Word').val(),
            //         next: jsonToPass.PaginationSettings.Skip
            //     }, function (data) {
            //         var allData = JSON.parse(data);
            //         if (allData && allData.data) {
            //             excelDataToDownload = allData.data;
            //         } else {
            //             excelDataToDownload = [];
            //         }
            //         addCand(allData, num, $('#keywords').val().replace(/["]/g, "\""), jobtitlesTemp.join(), empNamesTemp.join(), skillsTemp.join());
            //     });
            // } else {

            // https://resume.accuick.com/Sovren/sovren_results_curately.jsp


            if (passedJsonData.parsedDocument) {
                passedJsonData.CategoryWeights = [
                    {
                        Category: "JOB_TITLES",
                        Weight: (passedJsonData?.weightage?.length && (passedJsonData?.weightage[0] || passedJsonData?.weightage[0] === 0)) ? (passedJsonData.weightage[0] / 100) : 0.45,
                    },
                    {
                        Category: "SKILLS",
                        Weight: (passedJsonData?.weightage?.length && (passedJsonData?.weightage?.length > 1) && (passedJsonData?.weightage[1] || passedJsonData?.weightage[1] === 0)) ? (passedJsonData.weightage[1] / 100) : 0.45,
                    },
                    {
                        Category: "EDUCATION",
                        Weight: (passedJsonData?.weightage?.length && (passedJsonData?.weightage?.length > 2) && (passedJsonData?.weightage[2] || passedJsonData?.weightage[2] === 0)) ? (passedJsonData.weightage[2] / 100) : 0.1,
                    },
                ];
                jsonToPass.CategoryWeights = [
                    {
                        Category: "JOB_TITLES",
                        Weight: (passedJsonData?.weightage?.length && (passedJsonData?.weightage[0] || passedJsonData?.weightage[0] === 0)) ? (passedJsonData.weightage[0] / 100) : 0.45,
                    },
                    {
                        Category: "SKILLS",
                        Weight: (passedJsonData?.weightage?.length && (passedJsonData?.weightage?.length > 1) && (passedJsonData?.weightage[1] || passedJsonData?.weightage[1] === 0)) ? (passedJsonData.weightage[1] / 100) : 0.45,
                    },
                    {
                        Category: "EDUCATION",
                        Weight: (passedJsonData?.weightage?.length && (passedJsonData?.weightage?.length > 2) && (passedJsonData?.weightage[2] || passedJsonData?.weightage[2] === 0)) ? (passedJsonData.weightage[2] / 100) : 0.1,
                    },
                ];
            } else {
                passedJsonData.CategoryWeights = [];
                jsonToPass.CategoryWeights = [];
            }

            jsonToPass.ParsedDocument = passedJsonData.parsedDocument
                ? passedJsonData.parsedDocument
                : "";
            // let bodyFormData = new FormData();
            // return
            jsonToPass.IndexIdsToSearchInto = [(import.meta.env.VITE_ENV === "dev" ? "dev_" : import.meta.env.VITE_ENV === "qa" ? "qa_" : "") + "curately_" + userLocalData.getvalue('clientId')];
            if (currentSelectedTabValue.current !== "All") {
                // 'All'
                // 'Joined'
                // 'Pending'
                // 'Not Invited'
                // 'Talent Pool'
                jsonToPass.FilterCriteria.CustomValueIdsMustAllExist = true;
                if (jsonToPass.FilterCriteria.CustomValueIds.length) {
                    jsonToPass.FilterCriteria.CustomValueIds.push((currentSelectedTabValue.current.replace(/\s+/g, "") === "TalentPool") ? "talentpool" : currentSelectedTabValue.current.replace(/\s+/g, ""));
                } else {
                    jsonToPass.FilterCriteria.CustomValueIds = [(currentSelectedTabValue.current.replace(/\s+/g, "") === "TalentPool") ? "talentpool" : currentSelectedTabValue.current.replace(/\s+/g, "")];
                }


            } else {
                jsonToPass.IndexIdsToSearchInto = [(import.meta.env.VITE_ENV === "dev" ? "dev_" : import.meta.env.VITE_ENV === "qa" ? "qa_" : "") + "curately_" + userLocalData.getvalue('clientId')];
            }
            // if (passedJsonData.workAuthorization.title) {
            //     jsonToPass.FilterCriteria.CustomValueIds.push(
            //         passedJsonData.workAuthorization.title
            //     );
            // }
            // if (currentSelectedTabValue.current === "Talent Pool") {
            //     // jsonToPass.IndexIdsToSearchInto = ["talentpool_" + userLocalData.getvalue('clientId')];
            //     // jsonToPass.FilterCriteria.CustomValueIds.push("talentpool");
            //     jsonToPass.FilterCriteria.CustomValueIds = ["talentpool"];
            //     // if (jsonToPass.FilterCriteria.CustomValueIds.length) {
            //     //     jsonToPass.FilterCriteria.CustomValueIds = jsonToPass.FilterCriteria.CustomValueIds.filter((e: string) => e !== 'TalentPool');
            //     // }
            //     // jsonToPass.FilterCriteria.CustomValueIds.push("talentpool");
            //     // jsonToPass.FilterCriteria.CustomValueIds = [];
            //     // jsonToPass.FilterCriteria.CustomValueIdsMustAllExist = false;
            //     jsonToPass.FilterCriteria.CustomValueIdsMustAllExist = true;
            // }
            if (passedJsonData.talentPoolId) {
                // jsonToPass.IndexIdsToSearchInto = ["talentpool_" + userLocalData.getvalue('clientId')];
                jsonToPass.FilterCriteria.CustomValueIds.push(
                    "poolid" + passedJsonData.talentPoolId
                );
                talentPoolIds.push(passedJsonData.talentPoolId);
                // if (jsonToPass.FilterCriteria.CustomValueIds.length) {
                // } else {
                //     jsonToPass.FilterCriteria.CustomValueIds = [
                //         "poolid_" + passedJsonData.talentPoolId,
                //     ];
                // }
            }


            if (passedJsonData.tagId) {
                let tagIdTemp = [];
                tagIdTemp = passedJsonData.tagId.split(',');
                for (let i = 0; i < tagIdTemp.length; i++) {
                    if (tagIdTemp[i]) {
                        jsonToPass.FilterCriteria.CustomValueIds.push(
                            "tagid" + tagIdTemp[i]
                        );
                        tagIds.push(tagIdTemp[i])
                    }
                }
            }

            if (passedJsonData.preference.CurrentEmpStatus) {
                let CurrentEmpStatusTemp = [];
                CurrentEmpStatusTemp = passedJsonData.preference.CurrentEmpStatus.split(',');
                for (let i = 0; i < CurrentEmpStatusTemp.length; i++) {
                    if (CurrentEmpStatusTemp[i]) {
                        jsonToPass.FilterCriteria.CustomValueIds.push(
                            CurrentEmpStatusTemp[i]
                        );
                    }
                }
            }

            if (passedJsonData.preference.EmpAvailabilityStatus) {
                let EmpAvailabilityStatusTemp = [];
                EmpAvailabilityStatusTemp = passedJsonData.preference.EmpAvailabilityStatus.split(',');
                for (let i = 0; i < EmpAvailabilityStatusTemp.length; i++) {
                    if (EmpAvailabilityStatusTemp[i]) {
                        jsonToPass.FilterCriteria.CustomValueIds.push(
                            EmpAvailabilityStatusTemp[i]
                        );
                    }
                }
            }

            if (passedJsonData.preference.EmpJobPref) {
                let EmpJobPrefTemp = [];
                EmpJobPrefTemp = passedJsonData.preference.EmpJobPref.split(',');
                for (let i = 0; i < EmpJobPrefTemp.length; i++) {
                    if (EmpJobPrefTemp[i]) {
                        jsonToPass.FilterCriteria.CustomValueIds.push(
                            EmpJobPrefTemp[i]
                        );
                    }
                }
            }


            if (passedJsonData.preference.EmpLocPref) {
                let EmpLocPrefTemp = [];
                EmpLocPrefTemp = passedJsonData.preference.EmpLocPref.split(',');
                for (let i = 0; i < EmpLocPrefTemp.length; i++) {
                    if (EmpLocPrefTemp[i]) {
                        jsonToPass.FilterCriteria.CustomValueIds.push(
                            EmpLocPrefTemp[i]
                        );
                    }
                }
            }

            if (passedJsonData.preference.EmpWorkHoursPref) {
                let EmpWorkHoursPrefTemp = [];
                EmpWorkHoursPrefTemp = passedJsonData.preference.EmpWorkHoursPref.split(',');
                for (let i = 0; i < EmpWorkHoursPrefTemp.length; i++) {
                    if (EmpWorkHoursPrefTemp[i]) {
                        if (jsonToPass.FilterCriteria.CustomValueIds.length) {
                            jsonToPass.FilterCriteria.CustomValueIds.push(
                                EmpWorkHoursPrefTemp[i]
                            );
                        } else {
                            jsonToPass.FilterCriteria.CustomValueIds = [
                                EmpWorkHoursPrefTemp[i],
                            ];
                        }
                    }
                }
            }


            //    LegalYes
            if (passedJsonData.workAuthorization.auth_in_US) {
                let Legalemp = "";
                Legalemp = passedJsonData.workAuthorization.auth_in_US;

                if (Legalemp) {
                    jsonToPass.FilterCriteria.CustomValueIds.push(
                        "legal" + Legalemp
                    );
                }
            }

            //    VisaYes
            if (passedJsonData.workAuthorization.Req_visa_sponsorship) {
                let Visaemp = "";
                Visaemp = passedJsonData.workAuthorization.Req_visa_sponsorship;

                if (Visaemp) {
                    if (jsonToPass.FilterCriteria.CustomValueIds.length) {
                        jsonToPass.FilterCriteria.CustomValueIds.push(
                            "visa" + Visaemp
                        );
                    } else {
                        jsonToPass.FilterCriteria.CustomValueIds = [
                            "visa" + Visaemp,
                        ];
                    }
                }
            }

            jsonToPass.FilterCriteria.CustomValueIds =
                jsonToPass.FilterCriteria.CustomValueIds.filter(
                    (val: string, i: number, array: String[]) => array.indexOf(val) === i
                );


            jsonToPass.FilterCriteria.CustomValueIdsMustAllExist = true;
            // jsonToPass.FilterCriteria.CustomValueIds.length ? true : false;

            // console.log("tempCount outside");

            jsonToPassRef.current = jsonToPass;
            if (!initialJsonToPass.current) {
                initialJsonToPass.current = JSON.parse(JSON.stringify(jsonToPass));
            }

            // console.log(jsonToPass);

            // const params = new URLSearchParams();

            const dataToPass: DataToPassForCommunity = JSON.parse(JSON.stringify(defaultDataToPass));
            let tempJobId = isInJob ? jobIdFromJobPage : selectedJob.current.id;
            if (checkJobId.current != tempJobId) {
                AIMatchUserIds.current = {
                    candids: "",
                    joined_candids: "",
                    notinvited_candids: "",
                    pending_candids: "",
                    pool_candids: "",
                    scores: ""
                }
                checkJobId.current = tempJobId;
            }

            let keywordsToParse = passedJsonData.keywords ? passedJsonData.keywords.replace(/["]/g, '"').replace(/,/g, " OR ").replace(/ +(?= )/g, '') : "";

            let andKeywords = keywordsToParse.split(/ AND | ANd | And | and | anD | aND /);

            let andSplitParts = andKeywords.map(andPart => {
                // if ([" AND ", " ANd ", " And ", " and ", " anD ", " aND "].some(word => andPart.includes(word)))
                // if (andPart && andPart.toLocaleLowerCase().includes(" and ")) { }


                if ([" or ", " OR ", " Or ", " oR "].some(word => andPart.includes(word))) {
                    let orKeywords = andPart.split(/ or | OR | Or | oR /);

                    andPart = orKeywords.map(orPart => {
                        orPart = orPart.trim();
                        return orPart.includes(' ') ? `"${orPart}"` : orPart;
                    }).join(' OR ');
                } else {
                    andPart = andPart.trim();
                    andPart = andPart.includes(' ') ? `"${andPart}"` : andPart;
                }
                andPart = andPart.trim();
                return andPart;
            }).join(' AND ');

            dataToPass.keywords = andSplitParts;
            // params.append("keywords", andSplitParts);


            // params.append("jobid", isInJob ? jobIdFromJobPage : selectedJob.current.id);
            dataToPass.jobid = isInJob ? jobIdFromJobPage : selectedJob.current.id;
            // params.append("json", JSON.stringify(jsonToPass));
            dataToPass.json = JSON.stringify(jsonToPass);
            // params.append("client_subs", "0");
            dataToPass.client_subs = "0";
            // params.append("csninja", "0");
            dataToPass.csninja = "0";
            // params.append("page", "" + pageNumber);
            dataToPass.page = "" + pageNumber;
            // params.append("next", "" + (pageNumber * pageSize));
            dataToPass.next = pageNumber * pageSize;
            // params.append("pageSize", "" + pageSize);
            dataToPass.pageSize = pageSize;
            // params.append("type", "" + currentSelectedTabValue.current);
            dataToPass.type = "" + currentSelectedTabValue.current;
            // params.append("clientId", "" + userLocalData.getvalue('clientId'));
            dataToPass.clientId = userLocalData.getvalue('clientId');
            if (passedJsonData.talentPoolId) {
                // params.append("poolId", passedJsonData.talentPoolId);
                dataToPass.poolId = passedJsonData.talentPoolId;
                dataToPass.talentPool = passedJsonData.talentPoolId;
            }

            if (mainJsonDataRef.current.curationActivity.submissionActivity !== '') {
                // params.append("submissionActivity", "" + mainJsonDataRef.current.curationActivity.submissionActivity);
                dataToPass.submissionActivity = (mainJsonDataRef.current.curationActivity.submissionActivity) ? Number(mainJsonDataRef.current.curationActivity.submissionActivity) : 0;
            }
            if (mainJsonDataRef.current.curationActivity.interviewActivity !== '') {
                // params.append("interviewActivity", "" + mainJsonDataRef.current.curationActivity.interviewActivity);
                dataToPass.interviewActivity = (mainJsonDataRef.current.curationActivity.interviewActivity) ? Number(mainJsonDataRef.current.curationActivity.submissionActivity) : 0;
            }
            if (mainJsonDataRef.current.curationActivity.rating !== '') {
                // params.append("rating", "" + mainJsonDataRef.current.curationActivity.rating);
                dataToPass.rating = (mainJsonDataRef.current.curationActivity.rating) ? Number(mainJsonDataRef.current.curationActivity.submissionActivity) : 0;
            }
            if (mainJsonDataRef.current.curationActivity.notes !== '') {
                // params.append("notes", "" + mainJsonDataRef.current.curationActivity.notes);
                dataToPass.notes = mainJsonDataRef.current.curationActivity.notes ? Number(mainJsonDataRef.current.curationActivity.notes) : null;
            }


            if (mainJsonDataRef.current.communityMemberActivity.jobApplication !== '') {
                // params.append("jobApplication", "" + mainJsonDataRef.current.communityMemberActivity.jobApplication);
                dataToPass.jobApplication = (mainJsonDataRef.current.communityMemberActivity.jobApplication) ? Number(mainJsonDataRef.current.curationActivity.submissionActivity) : 0;
            }
            if (mainJsonDataRef.current.communityMemberActivity.profileUpdate !== '') {
                // params.append("profileUpdate", "" + mainJsonDataRef.current.communityMemberActivity.profileUpdate);
                dataToPass.profileUpdate = (mainJsonDataRef.current.communityMemberActivity.profileUpdate) ? Number(mainJsonDataRef.current.curationActivity.submissionActivity) : 0;
            }
            if (mainJsonDataRef.current.communityMemberActivity.avaliablityStatusUpdate !== '') {
                // params.append("avaliablityStatusUpdate", "" + mainJsonDataRef.current.communityMemberActivity.avaliablityStatusUpdate);
                dataToPass.avaliablityStatusUpdate = (mainJsonDataRef.current.communityMemberActivity.avaliablityStatusUpdate) ? Number(mainJsonDataRef.current.curationActivity.submissionActivity) : 0;
            }
            if (mainJsonDataRef.current.communityMemberActivity.shiftPrefernceUpdate !== '') {
                // params.append("shiftPrefernceUpdate", "" + mainJsonDataRef.current.communityMemberActivity.shiftPrefernceUpdate);
                dataToPass.shiftPrefernceUpdate = (mainJsonDataRef.current.communityMemberActivity.shiftPrefernceUpdate) ? Number(mainJsonDataRef.current.curationActivity.submissionActivity) : 0;
            }
            if (mainJsonDataRef.current.communityMemberActivity.preferenceUpdate !== '') {
                // params.append("preferenceUpdate", "" + mainJsonDataRef.current.communityMemberActivity.preferenceUpdate);
                dataToPass.preferenceUpdate = "" + mainJsonDataRef.current.communityMemberActivity.preferenceUpdate;
            }
            if (mainJsonDataRef.current.communityMemberActivity.profileCompletion !== '') {
                // params.append("profileCompletion", "" + mainJsonDataRef.current.communityMemberActivity.profileCompletion);
                dataToPass.profileCompletion = "" + mainJsonDataRef.current.communityMemberActivity.profileCompletion;
            }
            if (mainJsonDataRef.current.communityMemberActivity.mobileVerified !== '') {
                // params.append("mobileVerified", "" + mainJsonDataRef.current.communityMemberActivity.mobileVerified);
                dataToPass.mobileVerified = mainJsonDataRef.current.communityMemberActivity.mobileVerified ? Number(mainJsonDataRef.current.communityMemberActivity.mobileVerified) : null;
            }

            if (mainJsonDataRef.current.email.emailClicked !== '') {
                // params.append("emailClicked", "" + mainJsonDataRef.current.email.emailClicked);
                dataToPass.emailClicked = mainJsonDataRef.current.email.emailClicked ? Number(mainJsonDataRef.current.email.emailClicked) : null;
            }
            if (mainJsonDataRef.current.email.emailReplied !== '') {
                // params.append("emailReplied", "" + mainJsonDataRef.current.email.emailReplied);
                dataToPass.emailReplied = mainJsonDataRef.current.email.emailReplied ? Number(mainJsonDataRef.current.email.emailReplied) : null;
            }
            if (mainJsonDataRef.current.email.emailBounced !== '') {
                // params.append("emailBounced", "" + mainJsonDataRef.current.email.emailBounced);
                dataToPass.emailBounced = mainJsonDataRef.current.email.emailBounced ? Number(mainJsonDataRef.current.email.emailBounced) : null;
            }
            if (mainJsonDataRef.current.email.emailSpamBlocked !== '') {
                // params.append("emailSpamBlocked", "" + mainJsonDataRef.current.email.emailSpamBlocked);
                dataToPass.emailSpamBlocked = mainJsonDataRef.current.email.emailSpamBlocked ? Number(mainJsonDataRef.current.email.emailSpamBlocked) : null;
            }
            if (mainJsonDataRef.current.email.emailUnsubscribed !== '') {
                // params.append("emailUnsubscribed", "" + mainJsonDataRef.current.email.emailUnsubscribed);
                dataToPass.emailUnsubscribed = mainJsonDataRef.current.email.emailUnsubscribed ? Number(mainJsonDataRef.current.email.emailUnsubscribed) : null;
            }

            if (mainJsonDataRef.current.sms.smsSent !== '') {
                // params.append("smsSent", "" + mainJsonDataRef.current.sms.smsSent);
                dataToPass.smsSent = mainJsonDataRef.current.sms.smsSent ? Number(mainJsonDataRef.current.sms.smsSent) : null;
            }
            if (mainJsonDataRef.current.sms.smsReplied !== '') {
                // params.append("smsReplied", "" + mainJsonDataRef.current.sms.smsReplied);
                dataToPass.smsReplied = mainJsonDataRef.current.sms.smsReplied ? Number(mainJsonDataRef.current.sms.smsReplied) : null;
            }
            if (mainJsonDataRef.current.sms.smsUnsubscribed !== '') {
                // params.append("smsUnsubscribed", "" + mainJsonDataRef.current.sms.smsUnsubscribed);
                dataToPass.smsUnsubscribed = mainJsonDataRef.current.sms.smsUnsubscribed ? Number(mainJsonDataRef.current.sms.smsUnsubscribed) : null;
            }


            if (mainJsonDataRef.current.candidateActivities.resume !== '') {
                dataToPass.resume = mainJsonDataRef.current.candidateActivities.resume ? mainJsonDataRef.current.candidateActivities.resume : "";
            }
            if (mainJsonDataRef.current.candidateActivities.contact !== '') {
                dataToPass.contact = mainJsonDataRef.current.candidateActivities.contact ? mainJsonDataRef.current.candidateActivities.contact : "";
            }
            if (mainJsonDataRef.current.candidateActivities.email !== '') {
                dataToPass.email = mainJsonDataRef.current.candidateActivities.email ? mainJsonDataRef.current.candidateActivities.email : "";
            }
            if (mainJsonDataRef.current.candidateActivities.candidateLastActivityDate !== '') {
                dataToPass.candidateLastActivityDate = mainJsonDataRef.current.candidateActivities.candidateLastActivityDate ? mainJsonDataRef.current.candidateActivities.candidateLastActivityDate : "";
            }
            if (mainJsonDataRef.current.candidateActivities.candidateActivityType !== '') {
                dataToPass.candidateActivityType = mainJsonDataRef.current.candidateActivities.candidateActivityType ? mainJsonDataRef.current.candidateActivities.candidateActivityType : "";
            }
            if (mainJsonDataRef.current.candidateActivities.placementEndDate !== '') {
                dataToPass.placementEndDate = mainJsonDataRef.current.candidateActivities.placementEndDate ? mainJsonDataRef.current.candidateActivities.placementEndDate : "";
            }
            if (mainJsonDataRef.current.candidateActivities.hiringStatusInValues !== '') {
                dataToPass.hiringStatusInValues = mainJsonDataRef.current.candidateActivities.hiringStatusInValues ? mainJsonDataRef.current.candidateActivities.hiringStatusInValues : "";
            }
            if (mainJsonDataRef.current.candidateActivities.candidateStatusInValues !== '') {
                dataToPass.candidateStatusInValues = mainJsonDataRef.current.candidateActivities.candidateStatusInValues ? mainJsonDataRef.current.candidateActivities.candidateStatusInValues : "";
            }
            if (mainJsonDataRef.current.candidateActivities.candidateProfileSource !== '') {
                dataToPass.candidateProfileSource = mainJsonDataRef.current.candidateActivities.candidateProfileSource ? mainJsonDataRef.current.candidateActivities.candidateProfileSource : "";
            }

            if (userLocalData.isChromeExtensionEnabled()) {
                dataToPass.jobTitles = jsonToPass.FilterCriteria.JobTitles.length ? jsonToPass.FilterCriteria.JobTitles.map((item: { Title: string }) => (item.Title) ? item.Title : "").join() : "";
                dataToPass.skills = jsonToPass.FilterCriteria.Skills.length ? jsonToPass.FilterCriteria.Skills.map((item: { SkillName: string }) => (item.SkillName) ? item.SkillName.trim().includes(' ') ? `"${item.SkillName}"` : item.SkillName : "").join(" OR ") : "";
                if (jsonToPass.FilterCriteria?.LocationCriteria?.Locations.length) {
                    if (jsonToPass.FilterCriteria?.LocationCriteria?.Locations[0].Municipality) {
                        dataToPass.city = jsonToPass.FilterCriteria?.LocationCriteria?.Locations[0].Municipality;
                    }
                    if (jsonToPass.FilterCriteria?.LocationCriteria?.Locations[0].Region) {
                        dataToPass.state = jsonToPass.FilterCriteria?.LocationCriteria?.Locations[0].Region;
                    }
                    if (jsonToPass.FilterCriteria?.LocationCriteria?.Locations[0].PostalCode) {
                        dataToPass.zipCode = jsonToPass.FilterCriteria?.LocationCriteria?.Locations[0].PostalCode;
                    }
                }
                if (jsonToPass.FilterCriteria?.LocationCriteria?.Distance) {
                    dataToPass.radius = jsonToPass.FilterCriteria?.LocationCriteria?.Distance;
                }
                dataToPass.talentPool = talentPoolIds.join();
                dataToPass.tags = tagIds.join();
                dataToPass.employer = jsonToPass.FilterCriteria?.Employers.length ? jsonToPass.FilterCriteria?.Employers.join() : "";
                dataToPass.degreeType = jsonToPass.FilterCriteria?.DegreeTypes.length ? jsonToPass.FilterCriteria?.DegreeTypes.join() : "";
                dataToPass.degrees = jsonToPass.FilterCriteria?.DegreeNames.length ? jsonToPass.FilterCriteria?.DegreeNames.join() : "";
                dataToPass.daysBack = passedJsonData.daysBack;
            }



            // if (passSearchName) {
            // // params.append("userIds", passSearchName);
            // dataToPass.userIds = passSearchName;
            if (searchNameRef.current.firstName) {
                // params.append("firstName", searchNameRef.current.firstName.replace(/[^a-z0-9\s]/gi, ''));
                dataToPass.firstName = searchNameRef.current.firstName.replace(/[^a-z0-9\s]/gi, '');
            }
            if (searchNameRef.current.lastName) {
                // params.append("lastName", searchNameRef.current.lastName.replace(/[^a-z0-9\s]/gi, ''));
                dataToPass.lastName = searchNameRef.current.lastName.replace(/[^a-z0-9\s]/gi, '');
            }
            if (searchNameRef.current.email) {
                // params.append("userEmail", searchNameRef.current.email);
                dataToPass.userEmail = searchNameRef.current.email;
            }
            // params.append("recrIds", userLocalData.getvalue('invitedAndReferredRecrIds'));
            dataToPass.recrIds = userLocalData.getvalue('invitedAndReferredRecrIds');
            // params.append("recrId", userLocalData.getvalue('recrId'));
            dataToPass.recrId = userLocalData.getvalue('recrId');


            // }

            dataToPass.isExtension = true; // userLocalData.isChromeExtensionEnabled();


            mainDataToPassForAPI.current = dataToPass;
            // && !passSearchName

            if (dataToPass.firstName || dataToPass.lastName || dataToPass.userEmail || isChromeExtensionEnabled || (talentPoolId && !isFiltersApplied.current)) {
            } else if (jsonToPass.ParsedDocument && jsonToPass.ParsedDocument.trim()) {
                jsonToPass.FilterCriteria.JobTitles = [];
                jsonToPass.FilterCriteria.Skills = [];
            }

            // console.log(jsonToPass.FilterCriteria.JobTitles);
            // console.log(jsonToPass.FilterCriteria.Skills);

            if ((pageNumber === 0 && (count || !initialCountLoaded.current)) || isLoadCount) {
                let tempCount = await loadCount(jsonToPass, !talentPoolId ? passedJsonData.talentPoolId : talentPoolId, false);
                console.log(tempCount);
                // console.log("tempCount inside");
            } else {
                // if (currentSelectedTabCount.current > rowCount) {
                setRowCount(currentSelectedTabCount.current);
                if (!isSelectAllChecked) {
                    setSelectedRowCount((currentSelectedTabCount.current > 1000) ? 1000 : currentSelectedTabCount.current);
                }
                // }
            }
            if (jsonToPass.ParsedDocument && jsonToPass.ParsedDocument.trim() && !(searchNameRef.current.firstName || searchNameRef.current.lastName || searchNameRef.current.email)) {
                let userIds = "";

                // const [tabList, setTabList] = useState([
                //     {label: "All", count: isInJob ? 0 : 22755 },
                //     {label: "Joined", count: isInJob ? 0 : 12346 },
                //     {label: "Pending", count: isInJob ? 0 : 4852 },
                //     {label: "Not Invited", count: isInJob ? 0 : 5020 },
                //     {label: "Talent Pool", count: isInJob ? 0 : 1998 },
                // ]);
                // let tempObj = tabList.find((i) => currentSelectedTabValue.current === i.label);
                // currentSelectedTabCount.current = (tempObj?.count) ? tempObj?.count : 0;
                console.log(currentSelectedTabCount.current);
                if (currentSelectedTabCount.current === 0 && !isAIMatchSelected.current) {
                    await setApplicantsData([]);
                    return;
                }
                if (isAIMatchSelected.current) {
                    isAIMatchSelected.current = false;
                }
                if (currentSelectedTabValue.current === "All") {
                    userIds = AIMatchUserIds.current.candids;
                    // saveAuditLog(3932);
                } else if (currentSelectedTabValue.current === "Joined") {
                    userIds = AIMatchUserIds.current.joined_candids;
                } else if (currentSelectedTabValue.current === "Pending") {
                    userIds = AIMatchUserIds.current.pending_candids;
                } else if (currentSelectedTabValue.current === "Not Invited") {
                    userIds = AIMatchUserIds.current.notinvited_candids;
                } else if (currentSelectedTabValue.current === "Talent Pool") {
                    userIds = AIMatchUserIds.current.pool_candids;
                }
                if (!AIMatchUserIds.current.candids) {
                    setApplicantsData([]);
                    setShowExpandColumn(false);
                    return
                }
                if (userIds) {
                    // params.append("userIds", userIds);
                    // params.append("scores", AIMatchUserIds.current.scores);
                    dataToPass.userIds = userIds;
                    dataToPass.scores = AIMatchUserIds.current.scores;

                    // // if (params.has("json")) {
                    // } else {
                    // //     params.append("json", "");
                    // }

                    // params.set("json", "");
                    // params.set("json_joined", "");
                    // params.set("json_notinvited", "");
                    // params.set("json_pending", "");
                    // params.set("json_pool", "");

                    dataToPass.json = "";
                    dataToPass.json_joined = "";
                    dataToPass.json_notinvited = "";
                    dataToPass.json_pending = "";
                    dataToPass.json_pool = "";
                }
            }
            else if ((!firstLoad.current || !isFiltersApplied.current) && !talentPoolId) {
                // params.set("json", "");
                dataToPass.json = "";
                // params.set("json_pending", "");
                dataToPass.json_pending = "";
                // params.set("json_notinvited", "");
                dataToPass.json_notinvited = "";
                // params.set("json_joined", "");
                dataToPass.json_joined = "";
                // params.set("json_pool", "");
                dataToPass.json_pool = "";
            }

            // let APIToCall = (dataToPass.userIds || dataToPass.firstName || dataToPass.lastName || dataToPass.userEmail || isChromeExtensionEnabled || talentPoolId) ? "communityData" :
            // jsonToPass.ParsedDocument && jsonToPass.ParsedDocument.trim()
            //     ? "sovrenCommunityAIMmatch"
            //     : ((!firstLoad.current || !isFiltersApplied.current) && !talentPoolId) ?
            //         "communityData" : "sovrenCommunity";

            let APIToCall = (dataToPass.userIds || dataToPass.firstName || dataToPass.lastName || dataToPass.userEmail || isChromeExtensionEnabled || (talentPoolId && !isFiltersApplied.current)) ? "communityData" :
                jsonToPass.ParsedDocument && jsonToPass.ParsedDocument.trim()
                    ? "sovrenCommunityAIMmatch"
                    : ((!firstLoad.current || !isFiltersApplied.current)) ?
                        "communityData" : "sovrenCommunity";

            setApplicantsData([]);
            setShowExpandColumn(false);
            //setDataLoading(true);

            const paramsToPass = new URLSearchParams(JSON.parse(JSON.stringify(removeEmptyValues(dataToPass))));

            // const newAPIParams = {
            //     clientId: dataToPass.clientId,
            //     userIds: dataToPass.userIds,
            //     pageSize: dataToPass.pageSize,
            //     next: dataToPass.next,
            //     jobid: dataToPass.jobid,
            //     type: dataToPass.type,
            // }

            const newAPIData = ((APIToCall === "communityData") || (APIToCall === "sovrenCommunityAIMmatch")) ? true : false;
            // && userLocalData.getvalue('clientId') === 3

            trackPromise(
                // sovren_results_curately.jsp
                // https://resume.accuick.com/Pipl/sovren_results_curately_aimatch.jsp
                // https://www4.accuick.com/Accuick_API/Curately/Community/community_data.jsp?clientId=2
                // https://app.curately.ai/Accuick_API/Curately/Sovren/sovren_results_community_aimatch_count.jsp
                ApiService.postWithData(
                    // 'admin', 'communityData', dataToPass
                    // 171,
                    // jsonToPass.ParsedDocument && jsonToPass.ParsedDocument.trim()
                    //     ? "sovren_results_curately_aimatch.jsp" :
                    //     "sovren_results_curately.jsp",
                    // (jsonToPass.ParsedDocument && jsonToPass.ParsedDocument.trim()) ? 193 : (!firstLoad.current || !isFiltersApplied.current) ? 193 : 193,

                    newAPIData ? 193 :
                        (dataToPass.userIds || dataToPass.firstName || dataToPass.lastName || dataToPass.userEmail || isChromeExtensionEnabled) ? 193 :
                            jsonToPass.ParsedDocument && jsonToPass.ParsedDocument.trim()
                                ? 193
                                : ((!firstLoad.current || !isFiltersApplied.current) && !talentPoolId) ?
                                    193 : 193,
                    newAPIData ? 'Curately/Community/community_data_new.jsp' :
                        (dataToPass.userIds || dataToPass.firstName || dataToPass.lastName || dataToPass.userEmail || isChromeExtensionEnabled) ? "Curately/Community/community_data.jsp" :
                            jsonToPass.ParsedDocument && jsonToPass.ParsedDocument.trim()
                                ? "Curately/Sovren/sovren_results_community_aimatch.jsp"
                                : ((!firstLoad.current || !isFiltersApplied.current) && !talentPoolId) ?
                                    "Curately/Community/community_data.jsp" : "Curately/Sovren/sovren_results_community.jsp",
                    newAPIData ? paramsToPass :
                        (dataToPass.userIds || dataToPass.firstName || dataToPass.lastName || dataToPass.userEmail || isChromeExtensionEnabled) ? paramsToPass :
                            jsonToPass.ParsedDocument && jsonToPass.ParsedDocument.trim()
                                ? paramsToPass
                                : ((!firstLoad.current || !isFiltersApplied.current) && !talentPoolId) ?
                                    paramsToPass : paramsToPass
                    // dataToPass.userIds ? params :
                    //     jsonToPass.ParsedDocument && jsonToPass.ParsedDocument.trim()
                    //         ? params
                    //         : ((!firstLoad.current || !isFiltersApplied.current) && !talentPoolId) ?
                    //             (import.meta.env.VITE_APP_NAME === "CURATELY_QA_Demo") ? dataToPass : params :
                    //             params

                ).then((result: any) => {
                    // setDataLoading(false);

                    const updatedResponse = result.data?.details?.length ? true : false;
                    let tempData = updatedResponse ? result.data?.details?.length ? result.data?.details : [] : result.data.data;


                    if (updatedResponse) {
                        result.data.data = tempData;
                        result.data.total = "50";
                        const atsData = result.data.ats?.length ? result.data.ats : [];
                        const evalutionData = result.data.evalution?.length ? result.data.evalution : [];
                        const sequenceData = result.data.sequence?.length ? result.data.sequence : [];
                        const tagData = result.data.tag?.length ? result.data.tag : [];
                        const talentPoolData = result.data.talentPool?.length ? result.data.talentPool : [];

                        for (let ad = 0; ad < tempData.length; ad++) {

                            if (atsData.length) {
                                let atsFilteredData = atsData.filter((i: any) => tempData[ad].userid === i.userid);
                                if (atsFilteredData?.length) {
                                    for (let afd = 0; afd < atsFilteredData.length; afd++) {
                                        if (atsFilteredData[afd].atsname === "JobDiva") {
                                            tempData[ad].JobDivaReason = atsFilteredData[afd].reason;
                                            tempData[ad].JobDivaIsSuccess = atsFilteredData[afd].issuccess;
                                            tempData[ad].JobDivaValue = atsFilteredData[afd].atsvalue;
                                        } else if (atsFilteredData[afd].atsname === "VoiceAI") {
                                            tempData[ad].VoiceAIReason = atsFilteredData[afd].reason;
                                            tempData[ad].VoiceAIIsSuccess = atsFilteredData[afd].issuccess;
                                            tempData[ad].VoiceAIValue = atsFilteredData[afd].atsvalue;
                                        } else if (atsFilteredData[afd].atsname === "Bullhorn") {
                                            tempData[ad].BullhornReason = atsFilteredData[afd].reason;
                                            tempData[ad].BullhornIsSuccess = atsFilteredData[afd].issuccess;
                                            tempData[ad].BullhornValue = atsFilteredData[afd].atsvalue;
                                        } else if (atsFilteredData[afd].atsname === "Avionte") {
                                            tempData[ad].AvionteReason = atsFilteredData[afd].reason;
                                            tempData[ad].AvionteIsSuccess = atsFilteredData[afd].issuccess;
                                            tempData[ad].AvionteValue = atsFilteredData[afd].atsvalue;
                                        }

                                    }

                                }
                            }

                            if (evalutionData.length) {
                                let tempObj = evalutionData.find((i: any) => tempData[ad].userid === i.userid);
                                if (tempObj?.userid) {
                                    tempData[ad].evalutionScore = tempObj.score;
                                    tempData[ad].evalutionUsercriteria = tempObj.usercriteria;
                                    tempData[ad].evalutionHeading = tempObj.heading;
                                    tempData[ad].evalutionUserid = tempObj.userid;
                                    tempData[ad].evalutionRerun = tempObj.rerun;
                                }
                            }
                            if (sequenceData.length) {
                                let tempObj = sequenceData.find((i: any) => tempData[ad].userid === i.userid);
                                if (tempObj?.userid) {
                                    tempData[ad].sequenceNames = tempObj.sequencename;
                                    tempData[ad].sequenceIds = tempObj.sequenceid;
                                    tempData[ad].sequenceCount = tempObj.sequencecount;
                                }
                            }
                            if (tagData.length) {
                                let tempObj = tagData.find((i: any) => tempData[ad].userid === i.userid);
                                if (tempObj?.userid) {
                                    tempData[ad].tagName = tempObj.tagname;
                                    tempData[ad].tagId = tempObj.tagid;
                                    tempData[ad].tagCount = tempObj.tagcount;
                                }
                            }
                            if (talentPoolData.length) {
                                let tempObj = talentPoolData.find((i: any) => tempData[ad].userid === i.userid);
                                if (tempObj?.userid) {
                                    tempData[ad].poolNames = tempObj.poolname;
                                    tempData[ad].poolIds = tempObj.poolid;
                                    tempData[ad].poolCount = tempObj.poolcount;
                                }
                            }

                            tempData[ad].first = (tempData[ad].firstname && (tempData[ad].firstname !== "Null") && (tempData[ad].firstname !== "null")) ? tempData[ad].firstname.trim() : "";
                            tempData[ad].last = (tempData[ad].lastname && (tempData[ad].lastname !== "Null") && (tempData[ad].lastname !== "null")) ? tempData[ad].lastname.trim() : "";
                            tempData[ad].fullName = (tempData[ad].firstname || tempData[ad].lastname) ? tempData[ad].firstname + " " + tempData[ad].lastname : "N/A";

                            tempData[ad].candId = tempData[ad].userid ? tempData[ad].userid : "";
                            tempData[ad].date = tempData[ad].saveddate ? tempData[ad].saveddate : "";
                            tempData[ad].state = tempData[ad].statename ? tempData[ad].statename : "";
                            tempData[ad].phone = tempData[ad].phoneno ? tempData[ad].phoneno : "";
                            tempData[ad].city = tempData[ad].cityname ? tempData[ad].cityname : "";
                            tempData[ad].compName = tempData[ad].companyname ? tempData[ad].companyname : "";
                            tempData[ad].jobTitle = tempData[ad].jobtitle ? tempData[ad].jobtitle : "";
                            tempData[ad].zipCode = tempData[ad].zipcode ? tempData[ad].zipcode : "";
                            tempData[ad].status = tempData[ad].userstatus ? tempData[ad].userstatus : "";

                            tempData[ad].isShowEmail = Number(tempData[ad].isemailvisible) ? true : false;
                            tempData[ad].isShowPhone = Number(tempData[ad].isphonenumbervisible) ? true : false;


                            tempData[ad].userStatusName = ["3", "4", "5"].includes(tempData[ad].userstatus) ? candidateStatusList.current.find((i) => i.candidateStatusId === tempData[ad].userstatus)?.candidateStatusName || "" : "";
                            tempData[ad].userStatusId = tempData[ad].userstatus ? tempData[ad].userstatus : "";
                            tempData[ad].hideUserCheckBox = ["3", "4"].includes(tempData[ad].userstatus) ? true : false;

                        }

                    }
                    // if (jsonToPass.ParsedDocument && jsonToPass.ParsedDocument.trim()) {

                    // } else if ((!firstLoad.current || !isFiltersApplied.current) && !talentPoolId) {

                    const creditsData = localStorage.getItem(`credits_${userLocalData.getvalue('recrId')}`) ? JSON.parse(localStorage.getItem(`credits_${userLocalData.getvalue('recrId')}`) as string) : {};
                    // console.log(creditsData);
                    for (let td = 0; td < tempData.length; td++) {
                        if (!tempData[td].availability) {
                            tempData[td].availability = "";
                        }
                        if (!tempData[td].linkedIn) {
                            tempData[td].linkedIn = "";
                        }

                        tempData[td].availability = tempData[td].availability ? "" + tempData[td].availability : "";
                        tempData[td].candId = tempData[td].candId ? "" + tempData[td].candId : "";
                        tempData[td].poolCount = tempData[td].poolCount ? "" + tempData[td].poolCount : "";
                        tempData[td].sequenceCount = tempData[td].sequenceCount ? "" + tempData[td].sequenceCount : "";
                        tempData[td].status = tempData[td].status ? "" + tempData[td].status : "";
                        if (userLocalData.isChromeExtensionEnabled() || userLocalData.adminSettings(ID_SETTINGS_HIRING_WORKFLOW)) {
                            tempData[td].isShowEmail = Number(tempData[td].isShowEmail) ? true : false;
                            tempData[td].isShowPhone = Number(tempData[td].isShowPhone) ? true : false;
                            tempData[td].isPackageEmailValidity = !creditsData.isPackageEmailValidity ? "UPGRADE" : (tempData[td].isShowEmail && tempData[td].email) ? "EMPTY" : "VIEW";
                            // ((userLocalData.getvalue('paymentType') === 3) && (userLocalData.getvalue('paymentType') === 4)) ? "VIEW" : 
                            tempData[td].isPackagePhoneValidity = !creditsData.isPackagePhoneValidity ? "UPGRADE" : (tempData[td].isShowPhone && tempData[td].phone) ? "EMPTY" : "VIEW";
                        } else {
                            tempData[td].isPackageEmailValidity = "EMPTY";
                            tempData[td].isPackagePhoneValidity = "EMPTY";
                            tempData[td].isShowEmail = true;
                            tempData[td].isShowPhone = true;
                        }

                    }
                    // console.log(tempData);
                    // console.log(JSON.stringify(tempData));
                    if (!result.data.total) {
                        result.data.total = "50";
                    }
                    // }
                    // console.log(tempData);
                    if (
                        result.data &&
                        result.data.data &&
                        result.data.total &&
                        Number(result.data.total)
                    ) {
                        if (pageNumber === 0 && (count || !initialCountLoaded.current) && isLoadCount) {
                        } else {
                            if (currentSelectedTabCount.current > Number(result.data.total)) {
                                if ((!firstLoad.current || !isFiltersApplied.current) && !talentPoolId) {
                                    setRowCount(currentSelectedTabCount.current);
                                }
                                if (!isSelectAllChecked) {
                                    setSelectedRowCount((currentSelectedTabCount.current > 1000) ? 1000 : currentSelectedTabCount.current);
                                }
                            } else {
                                if ((!firstLoad.current || !isFiltersApplied.current) && !talentPoolId) {
                                    if (APIToCall === "sovrenCommunityAIMmatch" || dataToPass.userIds) {
                                        setRowCount(
                                            (Number(result.data.total) > tempData.length) ?
                                                tempData.length :
                                                Number(result.data.total ? result.data.total : 0)
                                        );
                                        // } else {
                                        //     setRowCount(Number(result.data.total ? result.data.total : 0));
                                    }
                                }
                                if (!isSelectAllChecked) {
                                    setSelectedRowCount((Number(result.data.total ? result.data.total : 0) > 1000) ?
                                        1000 :
                                        (Number(result.data.total) > tempData.length) ? tempData.length : Number(result.data.total ? result.data.total : 0)
                                    );
                                }
                            }
                        }
                        let headingsList = [];
                        let headingKeysList = [];
                        if (result.data.evalution_heading?.length) {
                            // Parsable.isJSON(result.data.evalution_heading)
                            const headersFromData = (result.data.evalution_heading?.length && result.data.evalution_heading[0]?.heading && Parsable.isJSON(result.data.evalution_heading[0]?.heading)) ? JSON.parse(result.data.evalution_heading[0].heading) : [];
                            console.log(headersFromData);
                            for (let hl = 0; hl < headersFromData.length; hl++) {
                                if (headersFromData[hl].match_criteria) {
                                    headingsList.push(headersFromData[hl].match_criteria);
                                    headingKeysList.push(headersFromData[hl].match_criteria.replace(/[^a-z]/gi, ''));
                                }

                            }
                        }
                        const headingsObjForVisibility = headingKeysList.reduce((acc, curr) => (acc[curr] = true, acc), {});
                        setHeadingsColumnsVisible({ ...headingsObjForVisibility });
                        for (let al = 0; al < tempData.length; al++) {

                            tempData[al].first = (tempData[al].first && (tempData[al].first !== "Null") && (tempData[al].first !== "null")) ? tempData[al].first.trim() : "";
                            tempData[al].last = (tempData[al].last && (tempData[al].last !== "Null") && (tempData[al].last !== "null")) ? tempData[al].last.trim() : "";
                            tempData[al].fullName = (tempData[al].first || tempData[al].last) ? tempData[al].first + " " + tempData[al].last : "N/A";

                            if (!tempData[al].linkedIn) {
                                tempData[al].linkedIn = tempData[al].socialurl ? tempData[al].socialurl : "";
                            }

                            tempData[al].linkedIn = tempData[al].linkedIn ? tempData[al].linkedIn.replaceAll('\\/', '/') : ""
                            tempData[al].linkedIn = (tempData[al].linkedIn && (tempData[al].linkedIn.indexOf('://') === -1)) ? 'https://' + tempData[al].linkedIn : tempData[al].linkedIn;
                            tempData[al].linkedIn = IsValidUrl.check(tempData[al].linkedIn) ? tempData[al].linkedIn : "";
                            tempData[al].notInvited =
                                currentSelectedTabValue.current === "Not Invited" ? true : false;
                            if (tempData[al].jobTitle) {
                                tempData[al].jobTitle = tempData[al].jobTitle.replace("\\/", "/");
                            }
                            if (tempData[al].compName) {
                                tempData[al].compName = tempData[al].compName.replace("\\/", "/");;
                            }

                            let poolIds = (tempData[al].poolIds) ? tempData[al].poolIds.split(',') : [];
                            let poolNames = (tempData[al].poolNames) ? tempData[al].poolNames.split(',') : [];

                            let sequenceIds = (tempData[al].sequenceIds && tempData[al].sequenceIds !== "0") ? tempData[al].sequenceIds.split(',') : [];
                            let sequenceNames = (tempData[al].sequenceNames) ? tempData[al].sequenceNames.split(',') : [];

                            tempData[al].poolCount = 0;
                            tempData[al].poolIds = [];
                            tempData[al].poolNames = [];
                            tempData[al].sequenceIds = [];
                            tempData[al].sequenceCount = 0;
                            tempData[al].sequenceNames = [];

                            let count = 0;
                            let start = false;

                            for (let j = 0; j < poolIds.length; j++) {
                                for (let k = 0; k < tempData[al].poolIds.length; k++) {
                                    if (poolIds[j] === tempData[al].poolIds[k]) {
                                        start = true;
                                    }
                                }
                                count++;
                                if (count === 1 && start === false) {
                                    tempData[al].poolIds.push(poolIds[j]);
                                    tempData[al].poolNames.push(poolNames[j]);
                                }
                                start = false;
                                count = 0;
                            }

                            count = 0;
                            start = false;

                            for (let j = 0; j < sequenceIds.length; j++) {
                                for (let k = 0; k < tempData[al].sequenceIds.length; k++) {
                                    if (sequenceIds[j] === tempData[al].sequenceIds[k]) {
                                        start = true;
                                    }
                                }
                                count++;
                                if (count === 1 && start === false) {
                                    tempData[al].sequenceIds.push(sequenceIds[j]);
                                    tempData[al].sequenceNames.push(sequenceNames[j]);
                                }
                                start = false;
                                count = 0;
                            }

                            tempData[al].poolCount = tempData[al].poolIds.length;
                            tempData[al].sequenceCount = tempData[al].sequenceIds.length;
                            if (jsonToPass.ParsedDocument && jsonToPass.ParsedDocument.trim() && dataToPass.userIds) {
                                if (!tempData[al].score && tempData[al].candId.trim() && scoresToCheck.current[tempData[al].candId.trim()]) {
                                    tempData[al].score = scoresToCheck.current[tempData[al].candId.trim()];
                                }
                            }

                            if (tempData[al]?.evalutionUsercriteria && Parsable.isJSON(tempData[al].evalutionUsercriteria.replace(/\\"/g, "")) && JSON.parse(tempData[al].evalutionUsercriteria.replace(/\\"/g, ""))) {
                                const candidateCriteria = JSON.parse(tempData[al].evalutionUsercriteria.replace(/\\"/g, "")) ? JSON.parse(tempData[al].evalutionUsercriteria.replace(/\\"/g, "")) : JSON.parse(tempData[al].evalutionUsercriteria.replace(/\\"/g, ""));

                                if (headingsList.length && headingKeysList.length && candidateCriteria.length) {
                                    let criteriaScore = 0;
                                    for (let hl = 0; hl < headingsList.length; hl++) {
                                        if (headingsList[hl] && headingKeysList[hl]) {
                                            let tempObjForCriteria = candidateCriteria.find((obj: { criterion: string; status: string; evidence: string; score: number; }) => obj.criterion?.toLowerCase() === headingsList[hl]?.toLowerCase());
                                            tempData[al][headingKeysList[hl]] = tempObjForCriteria?.evidence ? tempObjForCriteria?.evidence : "";
                                            tempData[al][headingKeysList[hl] + "status"] = tempObjForCriteria?.status ? tempObjForCriteria?.status : "";
                                            tempData[al][headingKeysList[hl] + "headname"] = tempObjForCriteria?.criterion ? tempObjForCriteria?.criterion : "";
                                            tempData[al][headingKeysList[hl] + "score"] = (tempObjForCriteria?.score && parseFloat(tempObjForCriteria?.score)) ? parseFloat(tempObjForCriteria?.score) : 0;
                                            criteriaScore = criteriaScore + parseFloat(tempObjForCriteria?.score);
                                        }
                                    }
                                    tempData[al].scorePercentage = (tempData[al].criteriaScore && Number(tempData[al].criteriaScore)) ? tempData[al].criteriaScore : (criteriaScore * 100) / headingsList.length;
                                    tempData[al].scorePercentage = tempData[al].scorePercentage ? Math.round(Number(tempData[al].scorePercentage)) : "";
                                    tempData[al].candidateCriteria = candidateCriteria;
                                }

                            }
                            tempData[al].jobDivaExists = tempData[al].Jobdiva ? Number(tempData[al].Jobdiva) : "";
                            tempData[al].VoiceAIExists = tempData[al].VoiceAI ? Number(tempData[al].VoiceAI) : "";

                        }
                        if (tempData && tempData.length && tempData[0].score) {
                            tempData = tempData.sort((a: { score: string }, b: { score: string }) => parseFloat(b.score) - parseFloat(a.score));

                        }
                        // console.log(tempData);
                        let tempColumns = [];
                        if (headingKeysList.length) {
                            tempColumns.push({
                                accessorKey: "scorePercentage",
                                header: "Match",
                                Cell: ({ row }: any) => {
                                    return <span>{`${row.original.scorePercentage ? row.original.scorePercentage + '%' : ''}`}</span>
                                },
                                size: 60
                            })
                        }
                        for (let tc = 0; tc < headingKeysList.length; tc++) {
                            tempColumns.push({
                                accessorKey: headingKeysList[tc],
                                header: headingsList[tc],
                                Header: () => <Tooltip title={headingsList[tc]}><Typography className='trimTwoLines' >{headingsList[tc]}</Typography></Tooltip>,
                                Cell: ({ row }: any) => {
                                    return (
                                        (row.original[headingKeysList[tc] + 'status']) ?
                                            <Tooltip title={row.original[headingKeysList[tc] + 'status']} classes={{ tooltip: "tt-capital" }}>
                                                <span className={`${(row.original[headingKeysList[tc] + 'status'] === "Match") ? 'Match' : (row.original[headingKeysList[tc] + 'status'] === "Potential Match") ? 'PotentialMatch' : (row.original[headingKeysList[tc] + 'status'] === "Not a Match") ? 'NotaMatch' : ''}`}>
                                                    {
                                                        row.original[headingKeysList[tc] + 'status'] === "Match" ?
                                                            <ThumbUpOutlinedIcon />
                                                            :
                                                            row.original[headingKeysList[tc] + 'status'] === "Potential Match" ?
                                                                <ThumbUpOutlinedIcon />
                                                                :
                                                                row.original[headingKeysList[tc] + 'status'] === "Not a Match" ?
                                                                    <ThumbDownAltOutlinedIcon />
                                                                    :
                                                                    null
                                                    }
                                                </span>
                                            </Tooltip>
                                            :
                                            ""
                                    );
                                },
                                // ThumbUpOutlinedIcon
                                // ThumbDownAltOutlinedIcon
                            })
                        }
                        setCustomHeadingsList(headingsList);
                        // setColumns([...defaultColumns, ...tempColumns])
                        setCriteriaColumns([...tempColumns]);
                        setShowExpandColumn(headingKeysList.length ? true : false)

                        // setColumnVisibility({
                        //     ...columnVisibility,
                        //     'mrt-row-expand': headingKeysList.length ? true : false,
                        //     name: true,
                        //     score: Boolean(tempData && tempData.length && tempData[0].score),
                        //     jobTitle: true,
                        //     compName: true,
                        //     Actions: userLocalData.adminSettings(ID_SETTINGS_QUICK_ACTION),
                        //     // Actions: true,
                        //     city: true,
                        //     date: true,
                        //     ...headingsObjForVisibility
                        // });
                        // const uniqueData = tempData.filter(
                        //     (obj: { candId: string }, index: number) =>
                        //         tempData.findIndex(
                        //             (item: { candId: string }) => item.candId === obj.candId
                        //         ) === index
                        // )
                        setApplicantsData(tempData);
                        // getAllDetailsData();
                        // saveDataToSession(tempData);
                        // let unique = [{
                        //     candId: ""
                        // }];
                        // let uniqueCandIds = [''];
                        // let allCandIds = [''];
                        // unique = [];
                        // uniqueCandIds = [];
                        // allCandIds = [];
                        // for (const item of tempData) {
                        //     const duplicate = unique.find(
                        //         (obj) => obj.candId === item.candId
                        //     );
                        //     if (!duplicate) {
                        //         unique.push(item);
                        //         uniqueCandIds.push(item.candId);
                        //     }
                        //     allCandIds.push(item.candId);
                        // }

                        // console.log(unique);
                        // console.log(uniqueCandIds);
                        // console.log(allCandIds);




                        if (!isSelectAllChecked) {
                            setRowSelection({});
                        }


                    } else {
                        //setRowCount(0);
                        setApplicantsData([]);
                        //setDataLoading(false);
                    }
                })
            );
        }
    };


    function removeEmptyValues(obj: any) {
        const newObj: any = {};

        for (const key in obj) {
            const value = obj[key];
            // if (value !== null && value !== undefined && value !== "") {
            //     newObj[key] = value;
            // }
            if ((value === "" || value === false || value) && value !== null) {
                newObj[key] = value;
            }
        }
        return newObj;
    }

    const loadCount = async (jsonToPassByParent: any, poolId: string, refresh: boolean) => {
        let jsonPassed = refresh ? initialJsonToPass.current : jsonToPassByParent;
        new Promise((resolve, _) => {
            setTimeout(() => {
                resolve(true);
            }, 1000);
        }).then(() => {
            if (!firstLoad.current) {
                firstLoad.current = true;
            }
        });


        let talentPoolIds: string[] = [];
        let tagIds: string[] = [];
        if (firstLoad.current || talentPoolId || !initialCountLoaded.current) {
            initialCountLoaded.current = true;
            const params = new URLSearchParams();

            const dataToPass: DataToPassForCommunity = JSON.parse(JSON.stringify(defaultDataToPass));

            let keywordsToParse = mainJsonDataRef.current.keywords ? mainJsonDataRef.current.keywords.replace(/["]/g, '"').replace(/,/g, " OR ").replace(/ +(?= )/g, '') : "";

            let andKeywords = keywordsToParse.split(/ AND | ANd | And | and | anD | aND /);

            let andSplitParts = andKeywords.map(andPart => {
                // if ([" AND ", " ANd ", " And ", " and ", " anD ", " aND "].some(word => andPart.includes(word)))
                // if (andPart && andPart.toLocaleLowerCase().includes(" and ")) { }


                if ([" or ", " OR ", " Or ", " oR "].some(word => andPart.includes(word))) {
                    let orKeywords = andPart.split(/ or | OR | Or | oR /);

                    andPart = orKeywords.map(orPart => {
                        orPart = orPart.trim();
                        return orPart.includes(' ') ? `"${orPart}"` : orPart;
                    }).join(' OR ');
                } else {
                    andPart = andPart.trim();
                    andPart = andPart.includes(' ') ? `"${andPart}"` : andPart;
                }
                andPart = andPart.trim();
                return andPart;
            }).join(' AND ');

            dataToPass.jobid = isInJob ? jobIdFromJobPage : selectedJob.current.id;

            dataToPass.keywords = andSplitParts;
            params.append("keywords", andSplitParts);

            jsonPassed.FilterCriteria.CustomValueIds = [];
            if (poolId) {
                // jsonToPass.IndexIdsToSearchInto = ["talentpool_" + userLocalData.getvalue('clientId')];
                talentPoolIds.push(poolId);
                if (jsonPassed.FilterCriteria.CustomValueIds.length) {
                    jsonPassed.FilterCriteria.CustomValueIds.push("poolid" + poolId);
                } else {
                    jsonPassed.FilterCriteria.CustomValueIds = ["poolid" + poolId];
                }
                // jsonPassed.FilterCriteria.CustomValueIds.push("talentpool");
            }
            //  else {
            //     jsonPassed.FilterCriteria.CustomValueIds = [];
            // }


            jsonPassed.FilterCriteria.CustomValueIdsMustAllExist = true;
            // jsonPassed.FilterCriteria.CustomValueIds.length ? true : false;

            params.append("json", JSON.stringify(jsonPassed));
            dataToPass.json = JSON.stringify(jsonPassed);

            let jsonToPass2 = JSON.parse(JSON.stringify(jsonPassed));
            jsonToPass2.FilterCriteria.CustomValueIdsMustAllExist = true;


            jsonPassed.FilterCriteria.CustomValueIds =
                jsonPassed.FilterCriteria.CustomValueIds.filter(
                    (val: string) => !["Pending", "NotInvited", "Joined", "TalentPool"].includes(val)
                );

            jsonPassed.FilterCriteria.CustomValueIds =
                jsonPassed.FilterCriteria.CustomValueIds.filter(
                    (val: string, i: number, array: String[]) => array.indexOf(val) === i
                );

            let pendingJsonToPass = JSON.parse(JSON.stringify(jsonToPass2));
            let notInvitedJsonToPass = JSON.parse(JSON.stringify(jsonToPass2));
            let joinedJsonToPass = JSON.parse(JSON.stringify(jsonToPass2));
            let talentPoolJsonToPass = JSON.parse(JSON.stringify(jsonToPass2));

            if (jsonPassed.ParsedDocument && jsonPassed.ParsedDocument.trim()) { }
            else {

                pendingJsonToPass.FilterCriteria.CustomValueIds.push("Pending");
                params.append("json_pending", JSON.stringify(pendingJsonToPass));
                dataToPass.json_pending = JSON.stringify(pendingJsonToPass);

                notInvitedJsonToPass.FilterCriteria.CustomValueIds.push("NotInvited");
                params.append("json_notinvited", JSON.stringify(notInvitedJsonToPass));
                dataToPass.json_notinvited = JSON.stringify(notInvitedJsonToPass);

                joinedJsonToPass.FilterCriteria.CustomValueIds.push("Joined");
                params.append("json_joined", JSON.stringify(joinedJsonToPass));
                dataToPass.json_joined = JSON.stringify(joinedJsonToPass);
            }

            // talentPoolJsonToPass.IndexIdsToSearchInto = ["talentpool_" + userLocalData.getvalue('clientId')];
            // talentPoolJsonToPass.FilterCriteria.CustomValueIds = [];
            if (poolId) {
                talentPoolIds.push(poolId);
                talentPoolJsonToPass.FilterCriteria.CustomValueIds.push(
                    "poolid" + poolId
                );
                // if (talentPoolJsonToPass.FilterCriteria.CustomValueIds.length) {
                // } else {
                //     talentPoolJsonToPass.FilterCriteria.CustomValueIds = [
                //         "poolid" + poolId,
                //     ];
                // }
                params.append("poolId", poolId);
                dataToPass.poolId = poolId;
                dataToPass.talentPool = poolId;

            }
            talentPoolJsonToPass.FilterCriteria.CustomValueIds.push("talentpool");
            talentPoolJsonToPass.FilterCriteria.CustomValueIds =
                talentPoolJsonToPass.FilterCriteria.CustomValueIds.filter(
                    (val: string, i: number, array: String[]) => array.indexOf(val) === i
                );
            params.append("json_pool", JSON.stringify(talentPoolJsonToPass));
            dataToPass.json_pool = JSON.stringify(talentPoolJsonToPass);
            params.append("clientId", userLocalData.getvalue('clientId'));
            dataToPass.clientId = userLocalData.getvalue('clientId');
            if (mainJsonDataRef.current.curationActivity.submissionActivity !== '') {
                params.append("submissionActivity", "" + mainJsonDataRef.current.curationActivity.submissionActivity);
                dataToPass.submissionActivity = mainJsonDataRef.current.curationActivity.submissionActivity ? Number(mainJsonDataRef.current.curationActivity.submissionActivity) : 0;
            }
            if (mainJsonDataRef.current.curationActivity.interviewActivity !== '') {
                params.append("interviewActivity", "" + mainJsonDataRef.current.curationActivity.interviewActivity);
                dataToPass.interviewActivity = mainJsonDataRef.current.curationActivity.interviewActivity ? Number(mainJsonDataRef.current.curationActivity.interviewActivity) : 0;
            }
            if (mainJsonDataRef.current.curationActivity.rating !== '') {
                params.append("rating", "" + mainJsonDataRef.current.curationActivity.rating);
                dataToPass.rating = mainJsonDataRef.current.curationActivity.rating ? Number(mainJsonDataRef.current.curationActivity.rating) : 0;
            }
            if (mainJsonDataRef.current.curationActivity.notes !== '') {
                params.append("notes", "" + mainJsonDataRef.current.curationActivity.notes);
                dataToPass.notes = mainJsonDataRef.current.curationActivity.notes ? Number(mainJsonDataRef.current.curationActivity.notes) : null;
            }
            if (mainJsonDataRef.current.communityMemberActivity.jobApplication !== '') {
                params.append("jobApplication", "" + mainJsonDataRef.current.communityMemberActivity.jobApplication);
                dataToPass.jobApplication = mainJsonDataRef.current.communityMemberActivity.jobApplication ? Number(mainJsonDataRef.current.communityMemberActivity.jobApplication) : 0;
            }
            if (mainJsonDataRef.current.communityMemberActivity.profileUpdate !== '') {
                params.append("profileUpdate", "" + mainJsonDataRef.current.communityMemberActivity.profileUpdate);
                dataToPass.profileUpdate = mainJsonDataRef.current.communityMemberActivity.profileUpdate ? Number(mainJsonDataRef.current.communityMemberActivity.profileUpdate) : 0;
            }
            if (mainJsonDataRef.current.communityMemberActivity.avaliablityStatusUpdate !== '') {
                params.append("avaliablityStatusUpdate", "" + mainJsonDataRef.current.communityMemberActivity.avaliablityStatusUpdate);
                dataToPass.avaliablityStatusUpdate = mainJsonDataRef.current.communityMemberActivity.avaliablityStatusUpdate ? Number(mainJsonDataRef.current.communityMemberActivity.avaliablityStatusUpdate) : 0;
            }
            if (mainJsonDataRef.current.communityMemberActivity.shiftPrefernceUpdate !== '') {
                params.append("shiftPrefernceUpdate", "" + mainJsonDataRef.current.communityMemberActivity.shiftPrefernceUpdate);
                dataToPass.shiftPrefernceUpdate = mainJsonDataRef.current.communityMemberActivity.shiftPrefernceUpdate ? Number(mainJsonDataRef.current.communityMemberActivity.shiftPrefernceUpdate) : 0;
            }
            if (mainJsonDataRef.current.communityMemberActivity.preferenceUpdate !== '') {
                params.append("preferenceUpdate", "" + mainJsonDataRef.current.communityMemberActivity.preferenceUpdate);
                dataToPass.preferenceUpdate = "" + mainJsonDataRef.current.communityMemberActivity.preferenceUpdate;
            }
            if (mainJsonDataRef.current.communityMemberActivity.profileCompletion !== '') {
                params.append("profileCompletion", "" + mainJsonDataRef.current.communityMemberActivity.profileCompletion);
                dataToPass.profileCompletion = "" + mainJsonDataRef.current.communityMemberActivity.profileCompletion;
            }
            if (mainJsonDataRef.current.communityMemberActivity.mobileVerified !== '') {
                params.append("mobileVerified", "" + mainJsonDataRef.current.communityMemberActivity.mobileVerified);
                dataToPass.mobileVerified = mainJsonDataRef.current.communityMemberActivity.mobileVerified ? Number(mainJsonDataRef.current.communityMemberActivity.mobileVerified) : null;
            }

            if (mainJsonDataRef.current.email.emailClicked !== '') {
                params.append("emailClicked", "" + mainJsonDataRef.current.email.emailClicked);
                dataToPass.emailClicked = mainJsonDataRef.current.email.emailClicked ? Number(mainJsonDataRef.current.email.emailClicked) : null;
            }
            if (mainJsonDataRef.current.email.emailReplied !== '') {
                params.append("emailReplied", "" + mainJsonDataRef.current.email.emailReplied);
                dataToPass.emailReplied = mainJsonDataRef.current.email.emailReplied ? Number(mainJsonDataRef.current.email.emailReplied) : null;
            }
            if (mainJsonDataRef.current.email.emailBounced !== '') {
                params.append("emailBounced", "" + mainJsonDataRef.current.email.emailBounced);
                dataToPass.emailBounced = mainJsonDataRef.current.email.emailBounced ? Number(mainJsonDataRef.current.email.emailBounced) : null;
            }
            if (mainJsonDataRef.current.email.emailSpamBlocked !== '') {
                params.append("emailSpamBlocked", "" + mainJsonDataRef.current.email.emailSpamBlocked);
                dataToPass.emailSpamBlocked = mainJsonDataRef.current.email.emailSpamBlocked ? Number(mainJsonDataRef.current.email.emailSpamBlocked) : null;
            }
            if (mainJsonDataRef.current.email.emailUnsubscribed !== '') {
                params.append("emailUnsubscribed", "" + mainJsonDataRef.current.email.emailUnsubscribed);
                dataToPass.emailUnsubscribed = mainJsonDataRef.current.email.emailUnsubscribed ? Number(mainJsonDataRef.current.email.emailUnsubscribed) : null;
            }

            if (mainJsonDataRef.current.sms.smsSent !== '') {
                params.append("smsSent", "" + mainJsonDataRef.current.sms.smsSent);
                dataToPass.smsSent = mainJsonDataRef.current.sms.smsSent ? Number(mainJsonDataRef.current.sms.smsSent) : null;
            }
            if (mainJsonDataRef.current.sms.smsReplied !== '') {
                params.append("smsReplied", "" + mainJsonDataRef.current.sms.smsReplied);
                dataToPass.smsReplied = mainJsonDataRef.current.sms.smsReplied ? Number(mainJsonDataRef.current.sms.smsReplied) : null;
            }
            if (mainJsonDataRef.current.sms.smsUnsubscribed !== '') {
                params.append("smsUnsubscribed", "" + mainJsonDataRef.current.sms.smsUnsubscribed);
                dataToPass.smsUnsubscribed = mainJsonDataRef.current.sms.smsUnsubscribed ? Number(mainJsonDataRef.current.sms.smsUnsubscribed) : null;
            }

            if (mainJsonDataRef.current.candidateActivities.resume !== '') {
                dataToPass.resume = mainJsonDataRef.current.candidateActivities.resume ? mainJsonDataRef.current.candidateActivities.resume : "";
            }
            if (mainJsonDataRef.current.candidateActivities.contact !== '') {
                dataToPass.contact = mainJsonDataRef.current.candidateActivities.contact ? mainJsonDataRef.current.candidateActivities.contact : "";
            }
            if (mainJsonDataRef.current.candidateActivities.email !== '') {
                dataToPass.email = mainJsonDataRef.current.candidateActivities.email ? mainJsonDataRef.current.candidateActivities.email : "";
            }
            if (mainJsonDataRef.current.candidateActivities.candidateLastActivityDate !== '') {
                dataToPass.candidateLastActivityDate = mainJsonDataRef.current.candidateActivities.candidateLastActivityDate ? mainJsonDataRef.current.candidateActivities.candidateLastActivityDate : "";
            }
            if (mainJsonDataRef.current.candidateActivities.candidateActivityType !== '') {
                dataToPass.candidateActivityType = mainJsonDataRef.current.candidateActivities.candidateActivityType ? mainJsonDataRef.current.candidateActivities.candidateActivityType : "";
            }
            if (mainJsonDataRef.current.candidateActivities.placementEndDate !== '') {
                dataToPass.placementEndDate = mainJsonDataRef.current.candidateActivities.placementEndDate ? mainJsonDataRef.current.candidateActivities.placementEndDate : "";
            }
            if (mainJsonDataRef.current.candidateActivities.hiringStatusInValues !== '') {
                dataToPass.hiringStatusInValues = mainJsonDataRef.current.candidateActivities.hiringStatusInValues ? mainJsonDataRef.current.candidateActivities.hiringStatusInValues : "";
            }
            if (mainJsonDataRef.current.candidateActivities.candidateStatusInValues !== '') {
                dataToPass.candidateStatusInValues = mainJsonDataRef.current.candidateActivities.candidateStatusInValues ? mainJsonDataRef.current.candidateActivities.candidateStatusInValues : "";
            }
            if (mainJsonDataRef.current.candidateActivities.candidateProfileSource !== '') {
                dataToPass.candidateProfileSource = mainJsonDataRef.current.candidateActivities.candidateProfileSource ? mainJsonDataRef.current.candidateActivities.candidateProfileSource : "";
            }

            if (userLocalData.isChromeExtensionEnabled()) {
                dataToPass.jobTitles = jsonPassed.FilterCriteria.JobTitles.length ? jsonPassed.FilterCriteria.JobTitles.map((item: { Title: string }) => (item.Title) ? item.Title : "").join() : "";
                dataToPass.skills = jsonPassed.FilterCriteria.Skills.length ? jsonPassed.FilterCriteria.Skills.map((item: { SkillName: string }) => (item.SkillName) ? item.SkillName.trim().includes(' ') ? `"${item.SkillName}"` : item.SkillName : "").join() : "";
                if (jsonPassed.FilterCriteria?.LocationCriteria?.Locations.length) {
                    if (jsonPassed.FilterCriteria?.LocationCriteria?.Locations[0].Municipality) {
                        dataToPass.city = jsonPassed.FilterCriteria?.LocationCriteria?.Locations[0].Municipality;
                    }
                    if (jsonPassed.FilterCriteria?.LocationCriteria?.Locations[0].Region) {
                        dataToPass.state = jsonPassed.FilterCriteria?.LocationCriteria?.Locations[0].Region;
                    }
                    if (jsonPassed.FilterCriteria?.LocationCriteria?.Locations[0].PostalCode) {
                        dataToPass.zipCode = jsonPassed.FilterCriteria?.LocationCriteria?.Locations[0].PostalCode;
                    }
                }
                if (jsonPassed.FilterCriteria?.LocationCriteria?.Distance) {
                    dataToPass.radius = jsonPassed.FilterCriteria?.LocationCriteria?.Distance;
                }



                if (mainJsonDataRef.current.tagId) {
                    let tagIdTemp = [];
                    tagIdTemp = mainJsonDataRef.current.tagId.split(',');
                    for (let i = 0; i < tagIdTemp.length; i++) {
                        if (tagIdTemp[i]) {
                            tagIds.push(tagIdTemp[i])
                        }
                    }
                }
                dataToPass.talentPool = talentPoolIds.join();
                dataToPass.tags = tagIds.join();
                dataToPass.employer = jsonPassed.FilterCriteria?.Employers.length ? jsonPassed.FilterCriteria?.Employers.join() : "";
                dataToPass.degreeType = jsonPassed.FilterCriteria?.DegreeTypes.length ? jsonPassed.FilterCriteria?.DegreeTypes.join() : "";
                dataToPass.degrees = jsonPassed.FilterCriteria?.DegreeNames.length ? jsonPassed.FilterCriteria?.DegreeNames.join() : "";
                dataToPass.daysBack = mainJsonDataRef.current.daysBack;
            }

            if (searchNameRef.current.firstName || searchNameRef.current.lastName || searchNameRef.current.email) {
                if (searchNameRef.current.firstName) {
                    params.append("firstName", searchNameRef.current.firstName);
                    dataToPass.firstName = searchNameRef.current.firstName;
                }
                if (searchNameRef.current.lastName) {
                    params.append("lastName", searchNameRef.current.lastName);
                    dataToPass.lastName = searchNameRef.current.lastName;
                }
                if (searchNameRef.current.email) {
                    params.append("userEmail", searchNameRef.current.email);
                    dataToPass.userEmail = searchNameRef.current.email;
                }
            }
            params.append("recrIds", userLocalData.getvalue('invitedAndReferredRecrIds'));
            dataToPass.recrIds = userLocalData.getvalue('invitedAndReferredRecrIds');
            params.append("recrId", userLocalData.getvalue('recrId'));
            dataToPass.recrId = userLocalData.getvalue('recrId');


            if (jsonPassed.ParsedDocument && jsonPassed.ParsedDocument.trim()) { }
            else if ((!firstLoad.current || !isFiltersApplied.current) && !talentPoolId) {
                params.set("json", "");
                dataToPass.json = "";
                params.set("json_pending", "");
                dataToPass.json_pending = "";
                params.set("json_notinvited", "");
                dataToPass.json_notinvited = "";
                params.set("json_joined", "");
                dataToPass.json_joined = "";
                params.set("json_pool", "");
                dataToPass.json_pool = "";
            }

            if (jsonPassed.ParsedDocument && jsonPassed.ParsedDocument.trim()) {

            } else {
                AIMatchUserIds.current = {
                    candids: "",
                    joined_candids: "",
                    notinvited_candids: "",
                    pending_candids: "",
                    pool_candids: "",
                    scores: ""
                }
            }
            setCountLoading(true);
            // https://www4.accuick.com/Accuick_API/Curately/Community/community_count.jsp?clientId=2

            const paramsToPass = new URLSearchParams(JSON.parse(JSON.stringify(removeEmptyValues(dataToPass))));
            // const paramsToPass = new URLSearchParams(JSON.parse(JSON.stringify(removeEmptyValues(mainDataToPassForAPI.current))));

            //         (dataToPass.firstName || dataToPass.lastName || dataToPass.userEmail || isChromeExtensionEnabled || talentPoolId) ? 193 :
            //         jsonPassed.ParsedDocument && jsonPassed.ParsedDocument.trim()
            //             ? 193
            //             : ((!firstLoad.current || !isFiltersApplied.current) && !talentPoolId) ?
            //                 (import.meta.env.VITE_APP_NAME === "CURATELY_QA_Demo") ? "admin" :
            //                     193
            //                 :
            //                 193,
            //     // (jsonToPass.ParsedDocument && jsonToPass.ParsedDocument.trim()) ? 171 : (!firstLoad.current || !isFiltersApplied.current) ? 193 : 171,
            //     // (jsonToPass.ParsedDocument && jsonToPass.ParsedDocument.trim())
            //     // ? 171 : 193,
            //     (dataToPass.firstName || dataToPass.lastName || dataToPass.userEmail || isChromeExtensionEnabled || talentPoolId) ? "Curately/Community/community_count.jsp" :
            //         jsonPassed.ParsedDocument && jsonPassed.ParsedDocument.trim()
            //             ? "Curately/Sovren/sovren_results_community_aimatch_count.jsp"
            //             : ((!firstLoad.current || !isFiltersApplied.current) && !talentPoolId) ?
            //                 (import.meta.env.VITE_APP_NAME === "CURATELY_QA_Demo") ? "communityCount" :
            //                     "Curately/Community/community_count.jsp"
            //                 :
            //                 "Curately/Sovren/sovren_results_curately_count.jsp",
            //     (dataToPass.firstName || dataToPass.lastName || dataToPass.userEmail || isChromeExtensionEnabled || talentPoolId) ? paramsToPass :
            //         jsonPassed.ParsedDocument && jsonPassed.ParsedDocument.trim()
            //             ? paramsToPass
            //             : ((!firstLoad.current || !isFiltersApplied.current) && !talentPoolId) ?
            //                 (import.meta.env.VITE_APP_NAME === "CURATELY_QA_Demo") ? dataToPass :
            //                     paramsToPass
            //                 :
            //                 paramsToPass
            // )


            await trackPromise(
                ApiService.postWithData(
                    // 'admin', 'communityCount', dataToPass
                    (dataToPass.firstName || dataToPass.lastName || dataToPass.userEmail || isChromeExtensionEnabled || (talentPoolId && !isFiltersApplied.current)) ? 193 :
                        jsonPassed.ParsedDocument && jsonPassed.ParsedDocument.trim()
                            ? 193
                            : ((!firstLoad.current || !isFiltersApplied.current)) ?
                                (import.meta.env.VITE_APP_NAME === "CURATELY_QA_Demo") ? "admin" :
                                    193
                                :
                                193,
                    // (jsonToPass.ParsedDocument && jsonToPass.ParsedDocument.trim()) ? 171 : (!firstLoad.current || !isFiltersApplied.current) ? 193 : 171,
                    // (jsonToPass.ParsedDocument && jsonToPass.ParsedDocument.trim())
                    // ? 171 : 193,
                    (dataToPass.firstName || dataToPass.lastName || dataToPass.userEmail || isChromeExtensionEnabled || (talentPoolId && !isFiltersApplied.current)) ? "Curately/Community/community_count.jsp" :
                        jsonPassed.ParsedDocument && jsonPassed.ParsedDocument.trim()
                            ? "Curately/Sovren/sovren_results_community_aimatch_count.jsp"
                            : ((!firstLoad.current || !isFiltersApplied.current)) ?
                                (import.meta.env.VITE_APP_NAME === "CURATELY_QA_Demo") ? "communityCount" :
                                    "Curately/Community/community_count.jsp"
                                :
                                "Curately/Sovren/sovren_results_curately_count.jsp",
                    (dataToPass.firstName || dataToPass.lastName || dataToPass.userEmail || isChromeExtensionEnabled || (talentPoolId && !isFiltersApplied.current)) ? paramsToPass :
                        jsonPassed.ParsedDocument && jsonPassed.ParsedDocument.trim()
                            ? paramsToPass
                            : ((!firstLoad.current || !isFiltersApplied.current)) ?
                                (import.meta.env.VITE_APP_NAME === "CURATELY_QA_Demo") ? dataToPass :
                                    paramsToPass
                                :
                                paramsToPass

                ).then((result: any) => {
                    setCountLoading(false);
                    // console.log(result.data);
                    // currentSelectedTabValue.current

                    // let tempObj = tabList.find((i) => currentSelectedTabValue.current === i.label);

                    if ((jsonPassed.ParsedDocument && jsonPassed.ParsedDocument.trim()) && (result.data)) {
                        AIMatchUserIds.current = {
                            candids: result.data.candids,
                            joined_candids: result.data.joined_candids,
                            notinvited_candids: result.data.notinvited_candids,
                            pending_candids: result.data.pending_candids,
                            pool_candids: result.data.pool_candids,
                            scores: result.data.scores
                        }
                        let scoresTo = result.data.scores ? result.data.scores.split(',') : [];
                        for (let st = 0; st < scoresTo.length; st++) {
                            const element = scoresTo[st].split(':');
                            if ((element.length > 1) && element[0].trim() && element[1].trim()) {
                                scoresToCheck.current[element[0].trim()] = element[1].trim();
                            }
                        }
                    }
                    currentSelectedTabCount.current = (currentSelectedTabValue.current === "All") ? Number(result.data.total) : (currentSelectedTabValue.current === "Joined") ? Number(result.data.totalJoined) : (currentSelectedTabValue.current === "Pending") ? Number(result.data.totalPending) : (currentSelectedTabValue.current === "Not Invited") ? Number(result.data.totalNotInvited) : (currentSelectedTabValue.current === "Talent Pool") ? Number(result.data.totalPool) : 0;

                    if (currentSelectedTabCount.current > rowCount) {
                        setRowCount(currentSelectedTabCount.current);
                        if (!isSelectAllChecked) {
                            setSelectedRowCount((currentSelectedTabCount.current > 1000) ? 1000 : currentSelectedTabCount.current);
                        }

                    }

                    if (currentSelectedTabValue.current === "Joined") {
                        setRowCount(Number(result.data.totalJoined));
                        if (!isSelectAllChecked) {
                            setSelectedRowCount((Number(result.data.totalJoined) > 1000) ? 1000 : Number(result.data.totalJoined));
                        }
                    } else if (currentSelectedTabValue.current === "Pending") {
                        setRowCount(Number(result.data.totalPending));
                        if (!isSelectAllChecked) {
                            setSelectedRowCount((Number(result.data.totalPending) > 1000) ? 1000 : Number(result.data.totalPending));
                        }
                    } else if (currentSelectedTabValue.current === "Not Invited") {
                        setRowCount(Number(result.data.totalNotInvited));
                        if (!isSelectAllChecked) {
                            setSelectedRowCount((Number(result.data.totalNotInvited) > 1000) ? 1000 : Number(result.data.totalNotInvited));
                        }
                    } else if (currentSelectedTabValue.current === "Talent Pool") {
                        setRowCount(Number(result.data.totalPool));
                        if (!isSelectAllChecked) {
                            setSelectedRowCount((Number(result.data.totalPool) > 1000) ? 1000 : Number(result.data.totalPool));
                        }
                    } else {
                        setRowCount(Number(result.data.total));
                        if (!isSelectAllChecked) {
                            setSelectedRowCount((Number(result.data.total) > 1000) ? 1000 : Number(result.data.total));
                        }
                    }
                    let tempTabList = [
                        { label: "All", count: Number(result.data.total) },
                        { label: "Joined", count: Number(result.data.totalJoined) },
                        { label: "Pending", count: Number(result.data.totalPending) },
                        {
                            label: "Not Invited",
                            count: Number(result.data.totalNotInvited),
                        },
                        { label: "Talent Pool", count: Number(result.data.totalPool) },
                    ]
                    setTabList([...tempTabList]);
                    // searchDataInSession.current = {
                    //     ...searchDataInSession.current,
                    //     initialCountLoaded: initialCountLoaded.current,
                    //     tabList: tempTabList
                    // }

                    if (currentSelectedTabCount.current === 0) {
                        setApplicantsData([]);
                    }
                    if ((jsonPassed.ParsedDocument && jsonPassed.ParsedDocument.trim()) && (result.data) && refresh) {
                        buildJson(pagination.pageIndex, pagination.pageSize, false, false, false);
                    }
                    return true;
                }).catch(() => {
                    return false;
                })
            );
        } else {
            return true
        }

    };

    const getZipcode = (zipCode: string) => {
        // http://34.208.108.171:41088/Sovren/get_Longitude_Latitude.jsp?zipcode=30036
        return new Promise((resolve) => {
            // , reject
            // let y = 0;
            ApiService.getByParams(193, "Curately/Sovren/get_Longitude_Latitude.jsp", {
                zipcode: zipCode,
            }).then((response: any) => {
                resolve(response);
            });
        });
    };

    // useEffect(() => {
    //     buildJson();
    // }, [mainJsonData]);

    // useEffect(() => {
    //     if (isInJob) {
    //         setCountLoading(true);
    //     }
    // }, []);
    // console.log( "ID_SETTINGS_QUICK_ACTION" , userLocalData.adminSettings(ID_SETTINGS_QUICK_ACTION));
    useEffect(() => {
        if (!isInJob) {
            if (isFirstTimeLoad.current) {
                isFirstTimeLoad.current = false;
                // mainJsonDataRef.current = searchDataInSession.current.filter ? searchDataInSession.current.filter : mainJsonDataRef.current;
                // let sessionDateStored = searchDataInSession.current.applicantsData as { score: "" }[];
                // setApplicantsData(sessionDateStored);
                // setColumnVisibility({
                //     'mrt-row-expand': showExpandColumn,
                //     name: true,
                //     score: Boolean(sessionDateStored && sessionDateStored.length && sessionDateStored[0].score),
                //     jobTitle: true,
                //     compName: true,
                //     Actions: userLocalData.adminSettings(ID_SETTINGS_QUICK_ACTION),
                //     // Actions: true,
                //     city: true,
                //     date: true,
                //     VoiceAI: userLocalData.adminSettings(ID_ATS_VOICEAI),
                //     Jobdiva: userLocalData.adminSettings(ID_ATS_JOBDIVA),
                //     Avionte: userLocalData.adminSettings(ID_ATS_AVIONTEAPI),
                //     Bullhorn: userLocalData.adminSettings(ID_ATS_BULLHORN),
                // });
                // firstAPICall.current = true;
            } else {
                // if (firstAPICall.current) {
                if (candidateOpened.current) {
                    candidateOpened.current = false;
                    searchDataInSession.current = {
                        ...searchDataInSession.current,
                        candidateOpened: false
                    };
                    if (filtersSearchId.current) {
                        sessionStorage.setItem(`community_${filtersSearchId.current}`, JSON.stringify(searchDataInSession.current));
                    }
                } else {
                    buildJson(pagination.pageIndex, pagination.pageSize, false, false, ((pagination.pageIndex === 0) && !isTabChanged.current) ? true : false);
                }
                // } else {
                //     firstAPICall.current = true;
                // }
            }
        } else {
            if (isInJobRef.current) {
                buildJson(pagination.pageIndex, pagination.pageSize, false);
            }
        }
    }, [pagination.pageIndex, pagination.pageSize]);

    useEffect(() => {
        searchDataInSession.current = {
            currentSelectedTabCount: currentSelectedTabCount.current,
            rowCount: rowCount,
            selectedRowCount: selectedRowCount,
            applicantsData: applicantsData,
            tabValue: tabValue,
            currentSelectedTabValue: currentSelectedTabValue.current,
            tabList: tabList,
            pagination: pagination,
            selectedCommunity: selectedCommunity,
            isFiltersApplied: isFiltersApplied.current,
            firstLoad: firstLoad.current,
            isTabChanged: isTabChanged.current,
            talentPoolName: talentPoolName,
            initialCountLoaded: initialCountLoaded.current,
            // firstAPICall: firstAPICall.current,
            mainJsonDataRef: mainJsonDataRef.current,
            sortType: sortType,
            sortColumn: sortColumn,
            rowSelection: rowSelection,
            currentSelectCount: currentSelectCount.current,
            isAIMatchSelected: isAIMatchSelected.current,
            isSelectAllChecked: isSelectAllChecked,
            AIMatchUserIds: AIMatchUserIds.current,
            sorting: sorting,
            selectedJob: selectedJob.current,
            jsonToPassRef: jsonToPassRef.current,
            initialJsonToPass: initialJsonToPass.current,
            sourceList: sourceList,
            candidateOpened: candidateOpened.current,
            searchName: searchName,
            searchNameRef: searchNameRef.current
        }
        if (filtersSearchId.current) {
            sessionStorage.setItem(`community_${filtersSearchId.current}`, JSON.stringify(searchDataInSession.current));
        }
    }, [applicantsData, candidateOpened.current]);



    const [tabList, setTabList] = useState(searchDataInSession.current?.tabList ?
        searchDataInSession.current?.tabList : [
            { label: "All", count: isInJob ? 0 : 22755 },
            { label: "Joined", count: isInJob ? 0 : 12346 },
            { label: "Pending", count: isInJob ? 0 : 4852 },
            { label: "Not Invited", count: isInJob ? 0 : 5020 },
            { label: "Talent Pool", count: isInJob ? 0 : 1998 },
        ]);


    const backToPoolList = () => {
        navigate('/' + userLocalData.getvalue('clientName') + '/talentPool/find');
    }

    // useEffect(() => {
    //     let sortBy = 'name';
    //     let orderBy = 'desc';
    //     if (sorting.length > 0) {
    //         switch (sorting[0].id) {
    //             case "name":
    //                 sortBy = 'Name';
    //                 break;
    //             case "state":
    //                 sortBy = 'State';
    //                 break;
    //             case "company":
    //                 sortBy = 'Company';
    //                 break;
    //             case "title":
    //                 sortBy = 'JobTitle';
    //                 break;
    //         }

    //         sorting[0].desc === true ? orderBy = 'desc' : orderBy = 'asc'
    //     }
    //     const params = {
    //         sortBy: sortBy,
    //         orderBy: orderBy,
    //     }
    //     // console.log(params);
    //     // applyFilters(params)
    // }, [sorting])

    const updateApplicantsDataOnDelete = (poolId: string, candidateId: string) => {
        let tempData: any = applicantsData;

        for (let index = 0; index < tempData.length; index++) {
            if (tempData[index].candId === candidateId) {
                tempData[index].poolCount = Math.max(tempData[index].poolCount - 1, 0);
                tempData[index].poolIds = tempData[index].poolIds.filter((id: string) => id !== poolId);
                tempData[index].poolNames = tempData[index].poolNames.filter((_: string, idx: number) => tempData[index].poolIds[idx] !== poolId);
            }
        }

        setApplicantsData([...tempData]);
    };



    const deleteTalentPoolId = (poolId: string, candId: string) => {
        trackPromise(
            // deleteTalentPoolCommunity/10024627/17
            ApiService.deleteById('admin', 'deleteTalentPoolCommunity', candId + "/" + poolId + '/' + userLocalData.getvalue('clientId'))
                .then(
                    (response: any) => {
                        // console.log(response)
                        if (response.data.Success) {
                            showToaster("Talent Pool deleted Successfully", 'success');
                            updateApplicantsDataOnDelete(poolId, candId);

                        } else {
                            showToaster(response.data.Message ? response.data.Message : "An error occured while deleting", 'error');
                        }
                    }
                ).catch(
                    (response: any) => {
                        showToaster(response.response?.data?.Message ? response.response?.data?.Message : "An error occured while deleting", 'error');
                    }

                )
        )
    }

    // const openTalentPoolView = (id: string, name: string) => {
    //     localStorage.setItem("talentPoolName_" + id, name);
    //     navigate('/' + userLocalData.getvalue('clientName') + '/talentPool/view/' + id);
    //     // window.open(globalData.getWindowLocation() + "talentPool/view/" + id);

    // };

    // const openSequnceView = (id: string) => {
    //     navigate('/' + userLocalData.getvalue('clientName') + '/letter/sequence/edit/' + id);
    //     // window.open(globalData.getWindowLocation() + "talentPool/view/" + id);

    // };

    // useEffect(() => {
    //     saveAuditLog(3898);
    // }, [])


    const onSearchChange = (val: string, refValue: { email: string; firstName: string; lastName: string; }) => {
        setSearchName(val);
        searchNameRef.current = refValue;
        buildJson(0, 50, true, true);
    }


    const saveAuditLog = (id: number) => {
        ApiService.saveAuditLog(id);
    }

    const clearData = () => {

        setTabList([
            { label: "All", count: 0 },
            { label: "Joined", count: 0 },
            { label: "Pending", count: 0 },
            { label: "Not Invited", count: 0 },
            { label: "Talent Pool", count: 0 },
        ]);

        setApplicantsData([]);
        setRowCount(0);
        setSelectedRowCount(0);
        setRowSelection({});
    }

    const refreshData = async () => {
        currentSelectedTabValue.current = 'All';
        setSelectedCommunity({ id: "", name: "" });
        await setTabValue('All');
        loadCount('', talentPoolId ? talentPoolId : '', true);
    }

    const nonCRMTabs = ["Joined", "Pending", "Not Invited"];


    const getCount = (count: string) => {
        if (count.length > 6 && count.length < 9) {
            const startDigits = count.length - 6;
            const decimalNum = count.slice(startDigits, startDigits + 1);
            return (
                count.slice(0, startDigits) +
                (decimalNum !== "0" ? "." + decimalNum : "") +
                "M"
            );
        } else if (count.length > 3 && count.length < 6) {
            const startDigits = count.length - 3;
            const decimalNum = count.slice(startDigits, startDigits + 1);
            return (
                count.slice(0, startDigits) +
                (decimalNum !== "0" ? "." + decimalNum : "") +
                "K"
            );
        } else {
            return count;
        }
    };



    const viewAPICandidate = (emailOrPhone: 'email' | 'phone', type: number, candidateId: string,) => {

        let candidateDataObj = applicantsData.find((i: any) => candidateId === i.candId);

        let linkedinUrlToPass = (candidateDataObj?.linkedIn) ? candidateDataObj?.linkedIn : "";
        if (linkedinUrlToPass) {
            if (linkedinUrlToPass.endsWith('/')) {
                linkedinUrlToPass = linkedinUrlToPass.substring(0, linkedinUrlToPass.length - 1);
            }
        }
        handleTableClose();
        CandidateCommonAPIs.save(
            linkedinUrlToPass,
            type,
            emailOrPhone,
            candidateId,
            () => {
                buildJson(pagination.pageIndex, pagination.pageSize, false, false, false);
            },
            (message: string) => {
                showToaster(message, 'error')
            },
            candidateDataObj.first,
            candidateDataObj.last
        );
    }

    renderCount++;

    const columnVisibility = useMemo(() => {
        let visibleColumns: { [key: string]: boolean } = {};
        const getIsCoulumnChecked = (data: any) => data?.checked ? data.checked : false;
        if (!!menuLayoutColumns?.length) {
            menuLayoutColumns.forEach((each) => {
                switch (each.name) {
                    case "Quick action": visibleColumns[each.key] = userLocalData.adminSettings(ID_SETTINGS_QUICK_ACTION) ? getIsCoulumnChecked(each) : false; break;
                    case "Bulhorn": visibleColumns[each.key] = userLocalData.adminSettings(ID_ATS_BULLHORN) ? getIsCoulumnChecked(each) : false; break;
                    case "VoiceAi": visibleColumns[each.key] = userLocalData.adminSettings(ID_ATS_VOICEAI) ? getIsCoulumnChecked(each) : false; break;
                    case "Aviont": visibleColumns[each.key] = userLocalData.adminSettings(ID_ATS_AVIONTEAPI) ? getIsCoulumnChecked(each) : false; break;
                    case "JobDiva": visibleColumns[each.key] = userLocalData.adminSettings(ID_ATS_JOBDIVA) ? getIsCoulumnChecked(each) : false; break;
                    default: visibleColumns[each.key] = getIsCoulumnChecked(each); break;
                }
            })
            visibleColumns['mrt-row-expand'] = showExpandColumn;
            visibleColumns["score"] = true;
        } else {
            visibleColumns = {
                'mrt-row-expand': showExpandColumn,
                name: true,
                score: Boolean(applicantsData && applicantsData.length && applicantsData[0].score),
                jobTitle: true,
                compName: true,
                Actions: userLocalData.adminSettings(ID_SETTINGS_QUICK_ACTION),
                city: true,
                date: true,
                VoiceAI: userLocalData.adminSettings(ID_ATS_VOICEAI),
                Jobdiva: userLocalData.adminSettings(ID_ATS_JOBDIVA),
                Avionte: userLocalData.adminSettings(ID_ATS_AVIONTEAPI),
                Bullhorn: userLocalData.adminSettings(ID_ATS_BULLHORN),
            }
        }
        return { ...visibleColumns, ...headingsColumnsVisible };
    }, [columns, menuLayoutColumns, showExpandColumn, applicantsData, headingsColumnsVisible])

    const columnOrder = useMemo(() => {
        let columnKeys: string[] = [];
        if (!!menuLayoutColumns?.length) {
            columnKeys = menuLayoutColumns.map((each) => each.key);
        } else {
            columnKeys = columns.map((each: any) => each.accessorKey);
        }
        columnKeys.unshift("mrt-row-select");
        if (!!criteriaColumns?.length) {
            criteriaColumns.forEach((each: any) => {
                columnKeys.push(each.accessorKey)
            })
        }
        columnKeys.splice(1, 0, "score")
        if (showExpandColumn) columnKeys.push("mrt-row-expand")
        return columnKeys;
    }, [menuLayoutColumns, columns, criteriaColumns]);

    return (
        <div id="communityCandidates" className="pt-3">
            {/* <RenderCount renderCount={renderCount} /> */}
            <Stack
                direction="row"
                className={`customCard px-4 py-2 ${(isInJob) ? 'd-none' : ''}`}
                justifyContent="space-between"
                alignItems="center"
                sx={{ minHeight: "auto !important" }}
            >
                <Typography variant="h6" className="header">
                    {
                        !talentPoolId ? "Community" :
                            <span> Talent Pool {
                                talentPoolId ?
                                    <span className='c-blue pl-5'>
                                        {talentPoolName ? talentPoolName : ""}
                                    </span>
                                    :
                                    null
                            } </span>}
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                {
                    talentPoolId ?
                        <Button variant="outlined"
                            type='button'
                            color="secondary"
                            className='mr-2'
                            onClick={backToPoolList}
                        >Back to List</Button>
                        :
                        (isCandidateAddSettingEnabled && !isChromeExtensionEnabled) ?
                            <>
                                <Button variant="contained" color="primary" className="mr-2" onClick={() => { saveAuditLog(3925); handleCreateOpen() }}>Create</Button>
                                {isHighVolumeHiringSettingEnabled && !isCRMEnabled ?
                                    <Button variant="outlined" color="secondary" onClick={() => { saveAuditLog(3928); handleInviteOpen() }}>Invite</Button>
                                    :
                                    null
                                }

                            </>
                            :
                            null
                }
            </Stack>
            <Grid
                container
                spacing={0}
                className="customCard p-0 filterExpand-grid mb-0"
            >
                <Grid className={`${isCommunitySearchSettingEnabled ? '' : 'd-none'} ${filtersExpand ? 'communityFiltersOpened' : 'communityFiltersClosed'}`}>
                    <div id="CommunityFilters">
                        {
                            filtersSearchId.current || isInJob ?
                                <CommunityFilters
                                    onApply={applyFilters}
                                    updateJobDetails={updateJobDetails}
                                    jobIdFromJobPage={jobIdFromJobPage}
                                    jobTitleFromJobPage={jobTitleFromJobPage}
                                    isInJob={isInJob}
                                    talentPoolId={talentPoolId ? talentPoolId : ""}
                                    clearData={clearData}
                                    passedData={mainJsonDataRef.current}
                                    sourcesList={sourceList}
                                    filtersSearchId={filtersSearchId.current}
                                />
                                :
                                null
                        }
                    </div>
                </Grid>

                <Grid
                    sx={{ width: (filtersExpand || !isCommunitySearchSettingEnabled) ? "calc(100%)" : "calc(100% - 310px)" }}
                >
                    <div className={`MRTableCustom ${filtersExpand ? "pl-0" : ""}`}>
                        {/* {!talentPoolId ? ( */}
                        <Stack direction="row" alignItems="center">
                            {
                                isCommunitySearchSettingEnabled ?
                                    <Tooltip title={filtersExpand ? "Show Filters" : "Hide Filters"}>
                                        <IconButton
                                            disableRipple
                                            className="filtersHideButton"
                                            color="primary"
                                            aria-label={filtersExpand ? "Expand" : "Collapse"}
                                            onClick={() => { toggleFilers(); saveAuditLog(3931); }}
                                        >
                                            <TuneIcon className="c-grey" />
                                        </IconButton>
                                    </Tooltip>
                                    :
                                    null
                            }
                            {
                                isHighVolumeHiringSettingEnabled ?

                                    <Tabs
                                        value={tabValue}
                                        onChange={(event: SyntheticEvent, newValue: string) => handleTabChange(event, newValue)}
                                        className="tableTabs"
                                    >
                                        {tabList.map((tab: any, i: number) => (
                                            <Tab
                                                key={i}
                                                value={tab.label}
                                                label={
                                                    <span className="tabWithCount">
                                                        <span>{tab.label}</span>
                                                        {countLoading ? (
                                                            <LoopIcon className="countLoader" />
                                                        ) : (
                                                            <span className="count">
                                                                ({getCount(String(tab.count))})
                                                            </span>
                                                        )}
                                                    </span>
                                                }
                                                className={`
                                                    ${(isChromeExtensionEnabled && nonCRMTabs.includes(tab.label)) ?
                                                        "d-none" :
                                                        (tab.label === "Talent Pool") ?
                                                            (talentPoolId ? "d-none" : (userLocalData.adminSettings(ID_SETTINGS_TALENTPOOL) ? "d-block" : "d-none"))
                                                            :
                                                            Boolean(isCRMEnabled) ?
                                                                (nonCRMTabs.includes(tab.label) ?
                                                                    "d-none" :
                                                                    "d-block") :
                                                                "d-block"}
                                                         `}
                                            />
                                        ))}
                                    </Tabs>
                                    :
                                    null
                            }

                        </Stack>
                        {/* ) : <Stack direction="row" alignItems="center" sx={{ height: '40px' }}></Stack>} */}
                        <ActionItems
                            // searchDataInSession={searchDataInSession.current}
                            // selectAllElement={selectAllElement}
                            // setSelectAllElement={setSelectAllElement}
                            rowSelection={rowSelection}
                            applicantsData={applicantsData}
                            onSearchChange={onSearchChange}
                            addToTalentPool={addToTalentPool}
                            addtopoollistanchorEl={addtopoollistanchorEl}
                            setAddToPoolListAnchorEl={setAddToPoolListAnchorEl}
                            addtosequencelistanchorEl={addtosequencelistanchorEl}
                            setAddToSequenceListAnchorEl={setAddToSequenceListAnchorEl}
                            refreshData={refreshData}
                            isInJob={isInJob}
                            searchName={searchName}
                            searchNameRef={searchNameRef.current}
                            applyFilters={applyFilters}
                            mainJsonDataRef={mainJsonDataRef.current}
                            mainDataToPassForAPI={mainDataToPassForAPI.current}
                            isFiltersApplied={isFiltersApplied.current}
                            isAIMatchSelected={isAIMatchSelected.current}
                            customHeadingsList={customHeadingsList}
                            jobIdFromJobPage={jobIdFromJobPage}
                            selectedJob={selectedJob.current}
                            isSelectAllChecked={isSelectAllChecked}
                            setSelectedTalentPool={setSelectedTalentPool}
                            handleProfileMenuClose={handleProfileMenuClose}
                            buildJson={buildJson}
                            pagination={pagination}
                            selectedRowCount={selectedRowCount}
                            rowCount={rowCount}
                            setSelectedSequence={setSelectedSequence}
                            selectedSequence={selectedSequence}
                            menuData={menuData}
                            selectedTalentPool={selectedTalentPool}
                            tabValue={tabValue}
                            setSorting={setSorting}
                            currentSelectedTabCount={currentSelectedTabCount.current}
                            setRowSelection={setRowSelection}
                            currentSelectCount={currentSelectCount.current}
                            setIsSelectAllChecked={setIsSelectAllChecked}
                            currentSelectedTabValue={currentSelectedTabValue.current}
                            jsonToPassRef={jsonToPassRef.current}
                            firstLoad={firstLoad.current}
                            talentPoolId={talentPoolId}
                            setSelectedRowCount={setSelectedRowCount}
                            addToSequenceList={addToSequenceList}
                            setSelectedSMS={setSelectedSMS}
                            setSelectedName={setSelectedName}
                            setIsBulkSMS={setIsBulkSMS}
                            setAddSMS={setAddSMS}
                            setSelectCandidList={setSelectCandidList}
                            setSelectedEmail={setSelectedEmail}
                            setIsBulkEmail={setIsBulkEmail}
                            setAddEmail={setAddEmail}
                            sortType={sortType}
                            sortColumn={sortColumn}
                            setSortColumn={setSortColumn}
                            setSortType={setSortType}
                            setOpenNewLayoutModal={setOpenNewLayoutModal}
                            tableLayoutRef={layoutRef}
                        />
                        <CommunityData
                            isLayoutFetched={isLayoutFetched}
                            columns={columns}
                            applicantsData={applicantsData}
                            rowSelection={rowSelection}
                            pagination={pagination}
                            sorting={sorting}
                            columnVisibility={columnVisibility}
                            customHeadingsList={customHeadingsList}
                            jobIdFromJobPage={jobIdFromJobPage}
                            isSelectAllChecked={isSelectAllChecked}
                            selectedRowCount={selectedRowCount}
                            rowCount={rowCount}
                            setSorting={setSorting}
                            setRowSelection={setRowSelection}
                            setSelectedRowCount={setSelectedRowCount}
                            setPagination={setPagination}
                            openCandidateModal={openCandidateModal}
                            openCandidateId={openCandidateId}
                            setOpenCandidateModal={setOpenCandidateModal}
                            setOpenCandidateId={setOpenCandidateId}
                            pinnedColumn={pinnedColumn}
                            columnOrder={columnOrder}
                        />
                    </div>
                </Grid>
            </Grid>

            <Menu
                id={`mail-${menuData.rowId}`}
                anchorEl={TableMailOpen}
                open={openTableMail && selectedRowId === `${menuData.rowId}`}
                onClose={handleTableClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center", }}
                transformOrigin={{ vertical: "top", horizontal: "center", }}
                MenuListProps={{ "aria-labelledby": `mailbutton-${menuData.rowId}`, }}
                sx={{
                    "& .MuiPaper-root.MuiMenu-paper.MuiPopover-paper": {
                        minWidth: "250px",
                    },
                }}
            >
                {
                    (menuData.isPackageEmailValidity !== "EMPTY") ?
                        <Stack justifyContent={'center'} direction={'row'}>
                            <UpgradeButton validationCheck={menuData.isPackageEmailValidity} callViewAPI={() => viewAPICandidate('email', 0, menuData.candId)} />
                        </Stack>
                        :
                        <Stack sx={{ p: 1.5 }}>
                            <Stack sx={{ display: "flex", flexDirection: "row", mb: 0.5, }} >
                                <Typography sx={{ fontSize: "16px", fontFamily: "Segoe UI", fontWeight: 600, color: "#1A1A1A", }} >
                                    {(!menuData.isShowEmail) ? Mask.email(menuData.email) : menuData.email}
                                </Typography>
                                {(!menuData.isShowEmail) ? <ContentCopyRoundedIcon onClick={() => { Copy.text(`${menuData.email}`, 'Email'); setTableOpenMail(null); }} sx={{ color: "#737373", fontSize: "20px", pl: 0.5 }} /> : null
                                }

                            </Stack>

                            <>
                                {/* <Typography  sx={{  fontSize: "14px",  fontFamily: "Segoe UI",  fontWeight: 600,  color: "#1DB268",  mb: 0.5,  }}  >  Email is Verified  </Typography> */}

                                <Stack sx={{ display: "flex", flexDirection: "row", alignItems: "center", mb: 0.5, }} direction="row" spacing={1} >
                                    {/* <Typography sx={{ fontSize: "14px", fontFamily: "Segoe UI", fontWeight: 400, color: "#1A1A1A", }} > Business </Typography> */}
                                    {/* <Box sx={{ height: "6px", width: "6px", backgroundColor: "#cacccc", borderRadius: "50%", }} ></Box> */}
                                    <Typography sx={{ fontSize: "14px", fontFamily: "Segoe UI", fontWeight: 400, color: "#1A1A1A", }} > Primary </Typography>
                                </Stack>

                                <Stack sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", }} >
                                    {
                                        isEmailSMSSettingEnabled ?
                                            <Button color="primary" variant="contained" id={menuData.email} disableRipple onClick={() => { handleTableMenuSendMailOpen(menuData.email); }} > Send Email </Button>
                                            :
                                            null
                                    }
                                </Stack>
                            </>
                        </Stack>

                }
            </Menu>

            {
                dialogStatus && (
                    <EmailDialogBox
                        dialogOpen={dialogStatus}
                        onClose={() => setDialogStatus(false)}
                        name={menuData.first.toLowerCase()}
                        emailId={emailOnClicked}
                        candidateId={menuData.candId}
                        jobId={menuData?.jobId || selectedJob?.current?.id}
                    />
                )
            }

            {`${USPhoneFormat.get(menuData.phone)}` ?
                <Menu
                    id={`phone-${menuData.rowId}`}
                    anchorEl={callAnchorElement}
                    open={openCallMenu && selectedRowId === `${menuData.rowId}`}
                    onClose={handleTableClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center", }}
                    transformOrigin={{ vertical: "top", horizontal: "center", }}
                    MenuListProps={{ "aria-labelledby": `phonebutton-${menuData.rowId}`, }}
                    sx={{
                        "& .MuiPaper-root.MuiMenu-paper.MuiPopover-paper": {
                            minWidth: "250px",
                        },
                    }}
                >
                    {
                        (menuData.isPackagePhoneValidity !== "EMPTY") ?
                            <Stack justifyContent={'center'} direction={'row'}>
                                <UpgradeButton validationCheck={menuData.isPackagePhoneValidity} callViewAPI={() => viewAPICandidate('phone', 0, menuData.candId)} />
                            </Stack>
                            :
                            <Stack sx={{ mb: 1, p: 1 }}>
                                <Typography sx={{ fontSize: "12px", fontFamily: "Segoe UI", fontWeight: 400, color: "#1A1A1A", }} > Mobile Number </Typography>
                                <Box component="div" sx={{ display: "flex", flexDirection: "row", alignItems: "center", mb: 1.5, }} >
                                    <Typography sx={{ fontSize: "14px", fontFamily: "Segoe UI", fontWeight: 600, color: "#1A1A1A", }} >
                                        {menuData.phone ? (!menuData?.isShowPhone ? Mask.phone(`${menuData.phone}`) : `${menuData.phone}`) : ""}
                                    </Typography>
                                    {!menuData.isShowPhone ? <ContentCopyRoundedIcon sx={{ color: "#737373", fontSize: "20px", pl: 0.5, }} onClick={() => { Copy.text(`${menuData.phone}`, 'Phone Number'); setCallAnchorElement(null); }} /> : null
                                    }

                                </Box>
                                {
                                    isEmailSMSSettingEnabled && !userLocalData.isChromeExtensionEnabled() ?
                                        <Button variant="contained" disableRipple
                                            onClick={() => {
                                                setPhoneOnClicked(menuData.phone);
                                                setDialogPhoneStatus(true);
                                                setCallAnchorElement(null);
                                            }}
                                            sx={{
                                                textTransform: "capitalize", backgroundColor: "var(--c-primary-color)", fontWeight: 700, fontSize: "14px", fontFamily: "Segoe UI", color: "#ffffff", height: "32px", width: "45%", whiteSpace: "nowrap", boxShadow: "0",
                                                "&:hover": { backgroundColor: "#0852C2", color: "#ffffff", boxShadow: "0", },
                                            }}
                                            startIcon={<CallOutlinedIcon />}
                                        >
                                            SMS
                                        </Button> : null
                                }
                            </Stack>
                    }
                </Menu>
                :
                null
            }

            {
                dialogPhoneStatus ? (
                    <PhoneDialog
                        dialogOpen={dialogPhoneStatus}
                        onClose={() => setDialogPhoneStatus(false)}
                        name={menuData.first.toLowerCase()}
                        toPhone={phoneOnClicked}
                        candidateId={menuData.candId}
                        jobId={menuData.jobId}
                    />
                ) : null
            }
            {
                addSMS && (
                    <PhoneDialog
                        dialogOpen={addSMS}
                        onClose={() => setAddSMS(false)}
                        name={selectedName}
                        toPhone={selectedSMS}
                        candidateId={selectCandidList.toString()}
                        isBulkSMS={isBulkSMS}
                    //jobId={menuData.jobId}
                    />

                )
            }

            {/* {
                openSequenceModal ? (
                    <Sequence
                        open={openSequenceModal}
                        closePopup={() => setOpenSequenceModal(false)}
                        selectedCandidateIds={selectSequenceList}
                    />
                ) : null
            } */}

            {
                addEmail && (
                    <EmailDialogBox
                        dialogOpen={addEmail}
                        onClose={() => setAddEmail(false)}
                        name={selectedName}
                        emailId={selectedEmail}
                        isBulkEmail={isBulkEmail}
                        candidateId={selectCandidList.toString()}
                        jobId={isInJob ? jobIdFromJobPage : selectedJob.current.id}
                    />
                )
            }

            <Menu
                id={`addlistmenu-${menuData.rowId}`}
                anchorEl={addtolistanchorEl}
                open={openAddToListenBtn && selectedRowId === `${menuData.rowId}`}
                onClose={handleProfileMenuClose}
                MenuListProps={{
                    "aria-labelledby": `poollistbutton-${menuData.rowId}`,
                }}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                PaperProps={{
                    style: { overflow: "visible" },
                }}
                sx={{
                    boxShadow: "0px",
                    "& .MuiList-root.MuiMenu-list": {
                        pt: "8px",
                        pb: "15px",
                        pr: "10px",
                        pl: "10px",
                    },
                }}
            >
                {
                    (menuData.poolIds.length && (menuData.poolIds.length === menuData.poolNames.length)) ?
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {
                                menuData.poolIds.map((value, index) => (
                                    <ListItem
                                        sx={{
                                            ':hover': {
                                                backgroundColor: "var(--c-neutral-30)",
                                                borderRadius: "3px"
                                            }
                                        }}
                                        key={"" + value + index}
                                        disableGutters
                                        secondaryAction={
                                            <IconButton aria-label="Remove" onClick={() => {
                                                handleProfileMenuClose();
                                                confirmDialog(`Are you sure you want to remove - ${menuData.poolNames[index]}?`, () => {
                                                    deleteTalentPoolId(value, menuData.candId);
                                                }, "warning"
                                                );
                                            }}>
                                                <ClearOutlinedIcon sx={{ color: '#737373', height: '13px', width: '13px' }} />
                                            </IconButton>
                                        }
                                        className="pt-1 pb-1 pl-1"
                                    >
                                        <ListItemText
                                            primary={`${menuData.poolNames[index]}`}
                                            // onClick={() => openTalentPoolView(value, menuData.poolNames[index])}
                                            className="fw-6 c-skyblue" />
                                    </ListItem>
                                ))
                            }
                        </List>
                        :
                        null
                }

                <MUIAutoComplete
                    id='talentPoolId'
                    handleChange={(id: any, name: string) => {
                        setSelectedTalentPool({ id, name });
                        addToTalentPool(id, name, menuData.candId);
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

            <Menu
                key={menuData.sequenceIds.join('-')}
                id={`list-${menuData.rowId}`}
                anchorEl={TableListOpen}
                open={openTableList && selectedRowId === `${menuData.rowId}`}
                onClose={handleProfileMenuClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                MenuListProps={{
                    "aria-labelledby": `listbutton-${menuData.rowId}`,
                }}
                sx={{
                    boxShadow: "0px",
                    "& .MuiList-root.MuiMenu-list": {
                        pt: "8px",
                        pb: "15px",
                        pr: "10px",
                        pl: "10px",
                    },
                }}
            >
                {
                    (userLocalData.getvalue('paymentType') !== 1) ?
                        <div>
                            {
                                (menuData.sequenceIds.length && (menuData.sequenceIds.length === menuData.sequenceNames.length)) ?
                                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                        {
                                            menuData.sequenceIds.map((value, index) => (
                                                <ListItem
                                                    sx={{
                                                        ':hover': {
                                                            backgroundColor: "var(--c-neutral-30)",
                                                            borderRadius: "3px"
                                                        }
                                                    }}
                                                    key={value}
                                                    disableGutters
                                                    // secondaryAction={
                                                    //     <IconButton aria-label="Remove" onClick={() => {
                                                    //         handleProfileMenuClose();
                                                    //         confirmDialog(`Are you sure you want to remove - ${menuData.sequenceNames[index]}?`, () => {
                                                    //             deleteTalentPoolId(value, menuData.candId);
                                                    //         }, "warning"
                                                    //         );
                                                    //     }}>
                                                    //         <ClearOutlinedIcon sx={{ color: '#737373', height: '13px', width: '13px' }} />
                                                    //     </IconButton>
                                                    // }
                                                    className="pt-1 pb-1 pl-1"
                                                >
                                                    <ListItemText
                                                        // onClick={() => openSequnceView(value)}
                                                        className="fw-6 c-skyblue"
                                                        primary={`${menuData.sequenceNames[index]}`}
                                                    />
                                                </ListItem>
                                            ))
                                        }
                                    </List>
                                    :
                                    null
                            }

                            <MUIAutoComplete
                                id='sequenceId'
                                handleChange={(id: any, name: string) => {
                                    setSelectedSequence({ id, name });
                                    addToSequenceList(id, name, menuData.candId);
                                }}
                                existingSequenceIds={menuData?.sequenceIds}
                                valuePassed={
                                    (selectedSequence.id) ? { label: selectedSequence.name, id: selectedSequence.id } :
                                        {}
                                }
                                isMultiple={false}
                                textToShow="Select Campaign"
                                width="250px"
                                type='sequence'
                                placeholder="Select Campaign"
                            />
                        </div>
                        :
                        <UpgradeButton validationCheck='UPGRADE' callViewAPI={() => { }} />
                }
            </Menu>

            <Menu
                id={`sequence-${menuData.rowId}`}
                anchorEl={TableSequenceOpen}
                open={openTableSequence && selectedRowId === `${menuData.rowId}`}
                onClose={handleTableClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                MenuListProps={{
                    "aria-labelledby": `sequencebutton-${menuData.rowId}`,
                }}
                sx={{
                    "& .MuiPaper-root.MuiMenu-paper.MuiPopover-paper": {
                        minWidth: "250px",
                        maxWidth: "350px",
                    },
                }}
            >
                <Stack sx={{ mb: 1, p: 1 }}>
                    <Typography
                        sx={{
                            fontSize: "12px",
                            fontFamily: "Segoe UI",
                            fontWeight: 400,
                            color: "#1A1A1A",
                        }}
                    >
                        Add contact to a Campaign
                    </Typography>
                    <Box
                        component="div"
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            mb: 1.5,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "14px",
                                fontFamily: "Segoe UI",
                                fontWeight: 600,
                                color: "#1A1A1A",
                            }}
                        >
                            You are one click away from an automated email workflow to get
                            more open rates and meetings
                        </Typography>
                    </Box>

                    <Button
                        variant="contained"
                        disableRipple
                        onClick={() => {
                            // setSequenceOnClicked(menuData.phone);
                            // setDialogSequenceStatus(true);
                            // setTableOpenSequence(null);
                            // setOpenSequenceModal(true);
                        }}
                        sx={{
                            textTransform: "capitalize",
                            backgroundColor: "var(--c-primary-color)",
                            fontWeight: 700,
                            fontSize: "14px",
                            fontFamily: "Segoe UI",
                            color: "#ffffff",
                            height: "32px",

                            whiteSpace: "nowrap",
                            boxShadow: "0",
                            "&:hover": {
                                backgroundColor: "#0852C2",
                                color: "#ffffff",
                                boxShadow: "0",
                            },
                        }}
                        startIcon={<SendOutlinedIcon />}
                    >
                        Create New Campaign
                    </Button>
                </Stack>
            </Menu>

            <Menu
                id="addtelegrammenu"
                anchorEl={TableTelegramOpen}
                open={openTableTelegram}
                onClose={handleTableClose}
                MenuListProps={{
                    "aria-labelledby": "add-telegram-btn",
                }}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                PaperProps={{
                    style: { overflow: "visible" },
                }}
                sx={{
                    boxShadow: "0px",
                    "& .MuiList-root.MuiMenu-list": {
                        pt: "4px",
                        pb: "10px",
                        pr: "5px",
                        pl: "5px",
                    },
                }}
            >
                <MenuItem onClick={handleTableClose}>Invite to Community</MenuItem>
                <MenuItem onClick={handleTableClose}>Invite to Job</MenuItem>
            </Menu>
            {createOpen && <AddCandidateDialog open={createOpen} onClose={handleCreateClose} />}
            <InviteCandidatesDialog open={inviteOpen} onClose={handleInviteClose} />
            {openNewLayoutModal && <NewLayoutMenu
                ref={layoutRef}
                open={openNewLayoutModal}
                handleClosemenu={() => setOpenNewLayoutModal(false)}
                columnsData={menuLayoutColumns}
                layoutType="community"
                pinnedColumn={pinnedColumn.name}
                handleColumnAction={setMenuLayoutColumns}
                resetLayout={getAllLayoutData}
            />}

        </div >
    );
};
export default Community;
