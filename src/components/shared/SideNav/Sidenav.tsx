import { Fragment, useState } from "../../../shared/modules/React";
// import styles from "./sidenav.module.css"
import {
    // matchPath,
    NavLink,
    // useLocation,
    // useNavigate
} from "react-router-dom";
// import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
// import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

// import { Grid } from '../../../shared/modules/commonImports';
// import { HeaderList } from "../Header/HeaderList";
// import Tooltip from "@mui/material/Tooltip";

// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import Popover from "@mui/material/Popover";
// import { ListItemButton, ListItemText } from "@mui/material";
// import Button from '@mui/material/Button'
// import SettingsOutlinedIcon from '@mui/icons-material/Settings';
// import TuneIcon from '@mui/icons-material/Tune';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
// import EnergySavingsLeafOutlinedIcon from '@mui/icons-material/EnergySavingsLeafOutlined';
// import { Avatar } from '../../../shared/modules/MaterialImports/Avatar';

import HoverMenu from 'material-ui-popup-state/HoverMenu';
import {
    usePopupState,
    bindFocus,
    bindHover,
    bindMenu,
} from 'material-ui-popup-state/hooks';
// import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
// import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';
// import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
// import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';

import AutoModeOutlinedIcon from '@mui/icons-material/AutoModeOutlined';
// import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
// import { userLocalData } from '../../../shared/services/userData';
// import TuneIcon from '@mui/icons-material/Tune';

import { Tooltip } from "../../../shared/modules/MaterialImports/ToolTip";
import { Typography } from "../../../shared/modules/MaterialImports/Typography";
import { MenuItem } from "../../../shared/modules/MaterialImports/Menu";
import { Accordion, AccordionDetails, AccordionSummary } from "../../../shared/modules/MaterialImports/Accordion";


import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import BoltIcon from '@mui/icons-material/Bolt';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';

import { Button } from '../../../shared/modules/MaterialImports/Button';

import { Grid } from '../../../shared/modules/MaterialImports/Grid';
import { userLocalData } from '../../../shared/services/userData';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
// import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import UpgradeOutlinedIcon from '@mui/icons-material/UpgradeOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined';

// import { ROLE_SUBSCRIPTION_MANAGE_PLAN_BILLING, ROLE_SUBSCRIPTION_USAGE } from "../../../shared/services/Permissions/Check";
import { ID_ADDON_CAREER_PORTAL, ID_ADDON_IDIBU, ID_ADDON_PEOPLE_CANDIDATE, ID_ADDON_PEOPLE_CONTACT, ID_ATS_BULLHORN, ID_ATS_JOBDIVA, ID_ATS_VOICEAI, ID_PLATFORM_TALENT_SOURCE, ID_REPORTS_AI_DATA_ANALYST, ID_REPORTS_CREATE_DASHBOARD, ID_REPORTS_CUSTOM_REPORT, ID_REPORTS_EXECUTIVE_INSIGHTS, ID_REPORTS_HIRING_INSIGHTS, ID_REPORTS_LINKEDIN_VIEWED_PROFILES, ID_REPORTS_OUTREACH_ACTIVITY, ID_REPORTS_OUTREACH_KPI, ID_REPORTS_PIPELINE_INSIGHTS, ID_REPORTS_RECRUITER_ACTIVITY_INSIGHTS, ID_REPORTS_SOURCING_INSIGHTS, ID_REPORTS_TALENT_COMMUNITY_INSIGHTS, ID_ROLE_ADMIN_SETTINGS, ID_ROLE_ADMIN_SETTINGS_ROLE, ID_ROLE_ADMIN_SETTINGS_USER, ID_ROLE_ANALYTICS_CAN_ACCESS_CUSTOM_REPORTS, ID_ROLE_ANALYTICS_CAN_ACCESS_EXECUTIVE_INSIGHTS, ID_ROLE_ANALYTICS_CAN_ACCESS_HIRING_INSIGHTS, ID_ROLE_ANALYTICS_CAN_ACCESS_LINKEDIN_VIEWED_PROFILES, ID_ROLE_ANALYTICS_CAN_ACCESS_PIPELINE_INSIGHTS, ID_ROLE_ANALYTICS_CAN_ACCESS_RECRUITER_ACTIVITY_INSIGHTS, ID_ROLE_ANALYTICS_CAN_ACCESS_SOURCING_INSIGHTS, ID_ROLE_ANALYTICS_CAN_ACCESS_TALENT_COMMUNITY_INSIGHTS, ID_ROLE_APP_SETTINGS_CUSTOM_FIELDS, ID_ROLE_APP_SETTINGS_HOLIDAY_SETTING, ID_ROLE_APP_SETTINGS_REASONS, ID_ROLE_CANDIDATE_CAN_CREATE_TALENT_POOLS, ID_ROLE_CANDIDATE_CAN_SEARCH_EXTERNAL_JOB_BOARDS, ID_ROLE_CANDIDATE_CAN_VIEW_EDIT_TALENT_POOLS_INCLUDING_PRIVATE, ID_ROLE_CANDIDATE_MODULE, ID_ROLE_COMPANY_SETTINGS_BRAND, ID_ROLE_COMPANY_SETTINGS_COMMUNITY, ID_ROLE_COMPANY_SETTINGS_SEQUENCE_RULESET, ID_ROLE_COMPANY_SETTINGS_SOURCES, ID_ROLE_CONTACT_MODULE, ID_ROLE_EMAIL_AND_SMS_CAN_EDIT_VIEW_MESSAGE_TEMPLATES, ID_ROLE_JOB_MODULE, ID_ROLE_PEOPLE, ID_ROLE_SUBSCRIPTION_MANAGE_PLAN_BILLING, ID_ROLE_SUBSCRIPTION_USAGE, ID_SETTINGS_APPLICANTS, ID_SETTINGS_CAMPAIGNS, ID_SETTINGS_COMMUNITY, ID_SETTINGS_FORMS, ID_SETTINGS_HIRING_WORKFLOW, ID_SETTINGS_JOURNEYS, ID_SETTINGS_RESUMES, ID_SETTINGS_TALENTPOOL, ID_SETTINGS_WORKFLOW } from "../../../shared/services/Permissions/IDs";
import ApiService from '../../../shared/api/api';
import './Sidenav.scss';


interface MenuItem {
    label: string;
    route?: string;
    icon: JSX.Element;
    settingId?: number;
    isEnabled: any;
    externalRoute?: boolean;
    fixToBottom?: boolean;
    shortForm?: string;
    onClick?: () => void;

    children?: {
        id: string;
        label: string;
        route?: string;
        settingId?: number;
        isEnabled: any;
        externalRoute?: boolean;
        onClick?: () => void;
    }[];
}


const Sidenav = ({ open, isSettingsRoute, handleSettingsRoute }: { open: boolean, isSettingsRoute: boolean, handleSettingsRoute: { (value: boolean): void } }) => {
    // const [open, setopen] = useState(false);
    // const toggleOpen = () => {
    //     setopen(!open)
    // }

    // const [popElement, setPopElement] = useState<{ element: HTMLElement | null; selectedIndex: number | null; }>({
    //     element: null,
    //     selectedIndex: 0
    // });


    const handleMenuClick = (label: string) => {
        console.log("clicked on", label);
        if (label === "Billing") {
            // https://adminapi.cxninja.com/bullhorn-service-qa/stripe/createSession/%7BclientId%7D/%7BrecruiterId%7D?returnUrl=%7BreturnUrl
            ApiService.getByParams('ats', `stripe/createSession/${userLocalData.getvalue('clientId')}/${userLocalData.getvalue('recrId')}`, {
                returnUrl: window.location.origin + '/#/' + userLocalData.getvalue('clientName') + '/home'
            }).then((response) => {
                console.log(response.data);
                if (response.data.Success) {
                    // setSrc();
                    window.open(response.data.data);
                }
            });
        }

    };
    const isClient6 = () => userLocalData.getvalue("clientId") === 6;

    const clientName = '/' + userLocalData.getvalue('clientName');
    const HeaderList: MenuItem[] = [
        {
            label: 'Home',
            route: '/home',
            externalRoute: false,
            icon: <HomeIcon className="sideNavIcon" />,
            settingId: 0,
            isEnabled: true,
        },
        {
            label: 'Candidate',
            route: '/resume/community',
            icon: <PersonIcon className="sideNavIcon" />,
            settingId: 0,
            isEnabled: userLocalData.checkIntegration(ID_ROLE_CANDIDATE_MODULE) && (
                (userLocalData.adminSettings(ID_SETTINGS_APPLICANTS) && !userLocalData.adminSettings(ID_PLATFORM_TALENT_SOURCE)) ||
                (userLocalData.checkSettings(ID_ROLE_COMPANY_SETTINGS_COMMUNITY) && userLocalData.adminSettings(ID_SETTINGS_COMMUNITY)) ||
                ((userLocalData.checkIntegration(ID_ROLE_CANDIDATE_CAN_CREATE_TALENT_POOLS) || userLocalData.checkIntegration(ID_ROLE_CANDIDATE_CAN_VIEW_EDIT_TALENT_POOLS_INCLUDING_PRIVATE)) && userLocalData.adminSettings(ID_SETTINGS_TALENTPOOL)) ||
                (userLocalData.checkIntegration(ID_ROLE_CANDIDATE_CAN_SEARCH_EXTERNAL_JOB_BOARDS) && userLocalData.adminSettings(ID_SETTINGS_RESUMES) && !userLocalData.adminSettings(ID_PLATFORM_TALENT_SOURCE)) ||
                (userLocalData.checkIntegration(ID_ROLE_PEOPLE))
            ),
            children: [
                // {
                //     id: 'FindCandidate',
                //     label: 'Find Candidate',
                //     route: '/candidate/find',
                //     externalRoute: false,
                // },
                {
                    id: 'Applicants',
                    label: 'Applicants',
                    route: '/resume/applicants',
                    settingId: 0,
                    isEnabled: userLocalData.adminSettings(ID_SETTINGS_APPLICANTS) && !userLocalData.adminSettings(ID_PLATFORM_TALENT_SOURCE),
                    externalRoute: false,
                },
                {
                    id: 'Community',
                    label: 'Community',
                    route: '/resume/community',
                    settingId: 0,
                    isEnabled: userLocalData.checkSettings(ID_ROLE_COMPANY_SETTINGS_COMMUNITY) && userLocalData.adminSettings(ID_SETTINGS_COMMUNITY),
                    // route: `https://resume.accuick.com/Sovren/curately.jsp;jsessionid=` + userLocalData.getvalue('sessid') + `?Userid=` + userLocalData.getvalue('encoded') + `&CompId=12938&JobId=208057&JobTitle=Angular%20Developer`,
                    // route1: `https://resume.accuick.com/Sovren/Jobslist.jsp?Userid=` + userLocalData.getvalue('encoded') + `&Role=` + userLocalData.getvalue('role'),
                    externalRoute: false,
                },
                {
                    id: 'TalentPool',
                    label: 'Talent Pool',
                    route: '/talentPool/',
                    settingId: 0,
                    isEnabled: (userLocalData.checkIntegration(ID_ROLE_CANDIDATE_CAN_CREATE_TALENT_POOLS) || userLocalData.checkIntegration(ID_ROLE_CANDIDATE_CAN_VIEW_EDIT_TALENT_POOLS_INCLUDING_PRIVATE)) && userLocalData.adminSettings(ID_SETTINGS_TALENTPOOL),
                    externalRoute: false,
                },
                {
                    id: 'DynamicTalentPool',
                    label: 'Dynamic Talent Pool',
                    route: '/dynamictalentPool/',
                    settingId: 0,
                    isEnabled: (import.meta.env.VITE_ENV !== "prod") && (userLocalData.checkIntegration(ID_ROLE_CANDIDATE_CAN_CREATE_TALENT_POOLS) || userLocalData.checkIntegration(ID_ROLE_CANDIDATE_CAN_VIEW_EDIT_TALENT_POOLS_INCLUDING_PRIVATE)) && userLocalData.adminSettings(ID_SETTINGS_TALENTPOOL) && (userLocalData.getvalue('paymentType') !== 1) && !userLocalData.isChromeExtensionEnabled(),
                    externalRoute: false,
                },
                {
                    id: 'JobBoards',
                    label: 'Resumes',
                    route: '/resume/jobBoards',
                    settingId: 0,
                    isEnabled: userLocalData.checkIntegration(ID_ROLE_CANDIDATE_CAN_SEARCH_EXTERNAL_JOB_BOARDS) && userLocalData.adminSettings(ID_SETTINGS_RESUMES),
                    externalRoute: false
                },
                // {
                //     id: 'SearchAllResumes',
                //     label: 'Resumes',
                //     // https://search2.accuick.com/ASKResumes/Sites.jsp;jsessionid=6DDDC4163E32661A37848348301D235E?CompId=12938&JobId=208057&JobTitle=Angular%20Developer
                //     // https://search2.accuick.com/ASKResumes/Sites.jsp;jsessionid=E8B294ADE69BFAD37706B401777E03A0?CompId=12938&JobId=228895&JobTitle=Angular+Developer+16
                //     // https://search2.accuick.com/ASKResumes/Search.jsp;jsessionid=A589D5D8CA096B55CB5A4289F70C5176
                //     route: `https://search2.accuick.com/ASKResumes/Sites.jsp;jsessionid=` + userLocalData.getvalue('sessid') + `?CompId=12938&JobId=208057&JobTitle=Angular%20Developer`,
                //     // route: 'https://search2.accuick.com/ASKResumes/index.jsp?sessid=' + userLocalData.getvalue('sessid') + '&UserId=' + userLocalData.getvalue('recrId') + '&UserName=' + userLocalData.getvalue('userName'),
                //     externalRoute: true
                // },
                {
                    id: 'peopleData',
                    label: 'People',
                    // route: 'http://52.34.40.39:8900/peopledata/',
                    route: '/resume/people',
                    settingId: 0,
                    isEnabled: userLocalData.checkIntegration(ID_ROLE_PEOPLE) && userLocalData.adminSettings(ID_ADDON_PEOPLE_CANDIDATE) && (!userLocalData.isClient7() || (userLocalData.isClient7() && userLocalData.getvalue('paymentType') !== 1)),
                    externalRoute: false
                },
                // {
                //     id: 'SearchBot',
                //     label: 'Search Bot',
                //     route: 'https://www4.accuick.com/Searchbot/index.jsp?userid=' + userLocalData.getvalue('recrId'),
                //     // route: '/resume/searchBot',
                //     externalRoute: true
                // }
            ]
        },
        {
            label: 'Contact',
            route: '/contact/find',
            icon: <ContactPhoneOutlinedIcon className="sideNavIcon" />,
            externalRoute: false,
            isEnabled: userLocalData.checkIntegration(ID_ROLE_CONTACT_MODULE),
            children: [
                {
                    id: 'Contact',
                    label: 'Contact',
                    // route: 'http://52.34.40.39:8900/peopledata/',
                    route: '/contact/find',
                    settingId: 0,
                    isEnabled: userLocalData.checkIntegration(ID_ROLE_CONTACT_MODULE),
                    externalRoute: false
                },
                {
                    id: 'list',
                    label: 'List',
                    // route: 'http://52.34.40.39:8900/peopledata/',
                    route: '/contact/list',
                    settingId: 0,
                    isEnabled: userLocalData.checkIntegration(ID_ROLE_CONTACT_MODULE),
                    externalRoute: false
                },
                {
                    id: 'peopleData',
                    label: 'People',
                    // route: 'http://52.34.40.39:8900/peopledata/',
                    route: '/contact/people',
                    settingId: 0,
                    isEnabled: userLocalData.adminSettings(ID_ADDON_PEOPLE_CONTACT) && (!userLocalData.isClient7() || (userLocalData.isClient7() && userLocalData.getvalue('paymentType') !== 1)),
                    externalRoute: false
                }
            ]
        },
        // {
        //     label: 'Company',
        //     route: '/company/find',
        //     icon: <BusinessOutlinedIcon className="sideNavIcon" />,
        //     externalRoute: false
        // },
        {
            label: 'Job',
            route: '/job/find',
            icon: <WorkIcon className="sideNavIcon" />,
            settingId: 0,
            isEnabled: userLocalData.checkIntegration(ID_ROLE_JOB_MODULE),
            externalRoute: false,
        },
        {
            label: 'Automation',
            icon: <AutoModeOutlinedIcon className="sideNavIcon" />,
            settingId: 0,
            isEnabled: (
                (userLocalData.adminSettings(ID_SETTINGS_FORMS) && !userLocalData.adminSettings(ID_PLATFORM_TALENT_SOURCE)) ||
                (userLocalData.adminSettings(ID_SETTINGS_CAMPAIGNS) && userLocalData.checkSettings(ID_ROLE_COMPANY_SETTINGS_SEQUENCE_RULESET) && (userLocalData.getvalue('paymentType') !== 1)) ||
                (userLocalData.adminSettings(ID_SETTINGS_WORKFLOW) && !userLocalData.adminSettings(ID_PLATFORM_TALENT_SOURCE)) ||
                (userLocalData.adminSettings(ID_SETTINGS_JOURNEYS) && !userLocalData.adminSettings(ID_PLATFORM_TALENT_SOURCE))
            ),
            children: [
                // {
                //     id: 'Templates',
                //     label: 'Templates',
                //     route: '/letter/templates',
                //     externalRoute: false,
                // },
                {
                    id: 'Forms',
                    label: 'Forms',
                    route: '/letter/forms',
                    settingId: 0,
                    isEnabled: userLocalData.adminSettings(ID_SETTINGS_FORMS) && !userLocalData.adminSettings(ID_PLATFORM_TALENT_SOURCE),
                    externalRoute: false,
                },
                {
                    id: 'Campaigns',
                    label: 'Campaigns',
                    route: '/letter/campaigns',
                    settingId: 0,
                    isEnabled: userLocalData.adminSettings(ID_SETTINGS_CAMPAIGNS) && userLocalData.checkSettings(ID_ROLE_COMPANY_SETTINGS_SEQUENCE_RULESET) && (userLocalData.getvalue('paymentType') !== 1),
                    externalRoute: false,
                },
                {
                    id: 'Workflows',
                    label: 'Workflows',
                    route: '/letter/workflows',
                    settingId: 0,
                    isEnabled: userLocalData.adminSettings(ID_SETTINGS_WORKFLOW) && !userLocalData.adminSettings(ID_PLATFORM_TALENT_SOURCE),
                    externalRoute: false,
                },
                // {
                //     id: 'EmailBuilder',
                //     label: 'Email Builder',
                //     route: '/letter/EmailBuilder',
                //     settingId: 0,
                //     isEnabled: userLocalData.adminSettings(20026),
                //     externalRoute: false,
                // },
                {
                    id: 'Journeys',
                    label: 'Journeys',
                    route: '/letter/journeys',
                    settingId: 0,
                    isEnabled: userLocalData.adminSettings(ID_SETTINGS_JOURNEYS) && !userLocalData.adminSettings(ID_PLATFORM_TALENT_SOURCE),
                    externalRoute: false,
                },

            ],
        },
        {
            label: 'Bullhorn',
            icon: <span className="nameSideMenuAvatar">BH</span>, //<BusinessOutlinedIcon className="sideNavIcon" />,
            // icon: <CampaignIcon className="sideNavIcon" />,
            settingId: 0,
            isEnabled: userLocalData.adminSettings(ID_ATS_BULLHORN), // && userLocalData.checkIntegration(ID_ROLE_CANDIDATE_CAN_CREATE_TALENT_POOLS) && (userLocalData.adminSettings(20001) || userLocalData.adminSettings(20002) || userLocalData.adminSettings(ID_SETTINGS_TALENTPOOL)),
            shortForm: "BH",
            children: [
                {
                    id: 'Job',
                    label: 'Bullhorn Jobs',
                    route: '/bullhorn/job',
                    settingId: 0,
                    isEnabled: 1, //userLocalData.adminSettings(20001),
                    externalRoute: false,
                },
                {
                    id: 'Candidates',
                    label: 'Bullhorn Candidates',
                    route: '/bullhorn/candidates',
                    settingId: 0,
                    isEnabled: 1, // userLocalData.adminSettings(20002),
                    externalRoute: false,
                },
                {
                    id: 'Tearsheet',
                    label: 'Tear Sheet',
                    route: '/bullhorn/tearsheet',
                    settingId: 0,
                    isEnabled: 1, // userLocalData.adminSettings(ID_SETTINGS_TALENTPOOL),
                    externalRoute: false,
                },

            ],
        },
        {
            label: 'JobDiva',
            icon: <span className="nameSideMenuAvatar">JD</span>, //<EnergySavingsLeafOutlinedIcon className="sideNavIcon" />,
            // icon: <CampaignIcon className="sideNavIcon" />,
            settingId: 0,
            isEnabled: userLocalData.adminSettings(ID_ATS_JOBDIVA), //(userLocalData.adminSettings(20001) || userLocalData.adminSettings(ID_SETTINGS_TALENTPOOL)) &&
            shortForm: "JD",
            children: [
                {
                    id: 'JobDiva',
                    label: 'JobDiva Jobs',
                    route: '/Jobdiva/job',
                    settingId: 0,
                    isEnabled: 1, // userLocalData.adminSettings(20001),
                    externalRoute: false,
                },
                // {
                //     id: 'Candidates',
                //     label: 'Diva Candidates',
                //     route: '/Jobdiva/candidates',
                //     settingId: 0,
                //     isEnabled: userLocalData.adminSettings(ID_SETTINGS_APPLICANTS) && !userLocalData.adminSettings(ID_PLATFORM_TALENT_SOURCE),
                //     externalRoute: false,
                // },
                {
                    id: 'Hotlist',
                    label: 'JobDiva Hot List',
                    route: '/Jobdiva/hotlist',
                    settingId: 0,
                    isEnabled: userLocalData.checkIntegration(ID_ROLE_CANDIDATE_MODULE), //userLocalData.adminSettings(ID_SETTINGS_TALENTPOOL),
                    externalRoute: false,
                },

            ],
        },
        {
            label: 'Voice AI',
            settingId: 0,
            isEnabled: userLocalData.adminSettings(ID_ATS_VOICEAI) && (userLocalData.getvalue('clientId') !== 54),
            shortForm: "VA",
            icon: <HeadphonesOutlinedIcon className="sideNavIcon" />,
            externalRoute: true,
            route: 'https://mayadev.curately.ai/'
        },

        // {
        //     label: 'Resumes',
        //     icon: <DescriptionOutlinedIcon className="sideNavIcon" />,
        // children: [
        //     {
        //         id: 'AccuickResumeSearch',
        //         label: 'Accuick Resume Search',
        //         // route: '/resume/accuick',
        //         route: `https://resume.accuick.com/Sovren/Jobslist.jsp?Userid=` + userLocalData.getvalue('encoded') + `&Role=` + userLocalData.getvalue('role'),
        //         externalRoute: true,
        //     },
        //     {
        //         id: 'SearchAllResumes',
        //         label: 'Search All Resumes',
        //         route: 'https://search2.accuick.com/ASKResumes/index.jsp?sessid=' + userLocalData.getvalue('sessid') + '&UserId=' + userLocalData.getvalue('recrId') + '&UserName=' + userLocalData.getvalue('userName'),
        //         // route: '/resume/all',
        //         // '<%=portalurl%>?sessid=<%=sessid%>&UserId=<%=Userid%>&UserName=<%=Username%>'
        //         externalRoute: true
        //     },
        //     {
        //         id: 'SearchBot',
        //         label: 'Search Bot',
        //         route: 'https://www4.accuick.com/Searchbot/index.jsp?userid=' + userLocalData.getvalue('recrId'),
        //         // route: '/resume/searchBot',
        //         externalRoute: true
        //     }
        // ]
        // },
        {
            label: 'Reports',
            icon: <BarChartOutlinedIcon className="sideNavIcon" />,
            settingId: 0,
            isEnabled: userLocalData.checkIntegration(40007)
                && (
                    (userLocalData.checkIntegration(ID_ROLE_ANALYTICS_CAN_ACCESS_TALENT_COMMUNITY_INSIGHTS) && userLocalData.adminSettings(ID_REPORTS_TALENT_COMMUNITY_INSIGHTS) && !userLocalData.adminSettings(ID_PLATFORM_TALENT_SOURCE)) ||
                    (userLocalData.checkIntegration(ID_ROLE_ANALYTICS_CAN_ACCESS_EXECUTIVE_INSIGHTS) && userLocalData.adminSettings(ID_REPORTS_EXECUTIVE_INSIGHTS) && !userLocalData.adminSettings(ID_PLATFORM_TALENT_SOURCE)) ||
                    (userLocalData.checkIntegration(ID_ROLE_ANALYTICS_CAN_ACCESS_HIRING_INSIGHTS) && userLocalData.adminSettings(ID_REPORTS_HIRING_INSIGHTS)) ||
                    (userLocalData.checkIntegration(ID_ROLE_ANALYTICS_CAN_ACCESS_SOURCING_INSIGHTS) && userLocalData.adminSettings(ID_REPORTS_SOURCING_INSIGHTS)) ||
                    (userLocalData.checkIntegration(ID_ROLE_ANALYTICS_CAN_ACCESS_PIPELINE_INSIGHTS) && userLocalData.adminSettings(ID_REPORTS_PIPELINE_INSIGHTS)) ||
                    (userLocalData.checkIntegration(ID_ROLE_ANALYTICS_CAN_ACCESS_RECRUITER_ACTIVITY_INSIGHTS) && userLocalData.adminSettings(ID_REPORTS_RECRUITER_ACTIVITY_INSIGHTS)) ||
                    (userLocalData.adminSettings(ID_REPORTS_CREATE_DASHBOARD) && !userLocalData.adminSettings(ID_PLATFORM_TALENT_SOURCE)) ||
                    (userLocalData.adminSettings(ID_REPORTS_AI_DATA_ANALYST) && !userLocalData.adminSettings(ID_PLATFORM_TALENT_SOURCE)) ||
                    (userLocalData.checkIntegration(ID_ROLE_ANALYTICS_CAN_ACCESS_CUSTOM_REPORTS) && userLocalData.adminSettings(ID_REPORTS_CUSTOM_REPORT) && !userLocalData.adminSettings(ID_PLATFORM_TALENT_SOURCE)) ||
                    (userLocalData.isChromeExtensionEnabled())
                ),
            // route: '/reports',
            // externalRoute: false,
            children: [
                {
                    id: 'TalentCommunityInsights',
                    label: 'Talent Community Insights',
                    route: '/reports/TalentCommunityInsights',
                    settingId: 0,
                    isEnabled: userLocalData.checkIntegration(ID_ROLE_ANALYTICS_CAN_ACCESS_TALENT_COMMUNITY_INSIGHTS) && userLocalData.adminSettings(ID_REPORTS_TALENT_COMMUNITY_INSIGHTS) && !userLocalData.adminSettings(ID_PLATFORM_TALENT_SOURCE),
                    externalRoute: false,
                },
                {
                    id: 'ExecutiveInsights',
                    label: 'Executive Insights',
                    route: '/reports/ExecutiveInsights',
                    settingId: 0,
                    isEnabled: userLocalData.checkIntegration(ID_ROLE_ANALYTICS_CAN_ACCESS_EXECUTIVE_INSIGHTS) && userLocalData.adminSettings(ID_REPORTS_EXECUTIVE_INSIGHTS) && !userLocalData.adminSettings(ID_PLATFORM_TALENT_SOURCE),
                    externalRoute: false,
                },
                {
                    id: 'HiringInsights',
                    label: 'Hiring Insights',
                    route: '/reports/HiringInsights',
                    settingId: 0,
                    isEnabled: userLocalData.checkIntegration(ID_ROLE_ANALYTICS_CAN_ACCESS_HIRING_INSIGHTS) && userLocalData.adminSettings(ID_REPORTS_HIRING_INSIGHTS),
                    externalRoute: false,
                },
                {
                    id: 'SourcingInsights',
                    label: 'Sourcing Insights',
                    route: '/reports/SourcingInsights',
                    settingId: 0,
                    isEnabled: userLocalData.checkIntegration(ID_ROLE_ANALYTICS_CAN_ACCESS_SOURCING_INSIGHTS) && userLocalData.adminSettings(ID_REPORTS_SOURCING_INSIGHTS),
                    externalRoute: false,
                },
                {
                    id: 'PipelineInsights',
                    label: 'Pipeline Insights',
                    route: '/reports/PipelineInsights',
                    settingId: 0,
                    isEnabled: userLocalData.checkIntegration(ID_ROLE_ANALYTICS_CAN_ACCESS_PIPELINE_INSIGHTS) && userLocalData.adminSettings(ID_REPORTS_PIPELINE_INSIGHTS),
                    externalRoute: false,
                },
                {
                    id: 'RecruiterActivityInsights',
                    label: 'Recruiter Activity Insights',
                    route: '/reports/RecruiterActivityInsights',
                    settingId: 0,
                    isEnabled: userLocalData.checkIntegration(ID_ROLE_ANALYTICS_CAN_ACCESS_RECRUITER_ACTIVITY_INSIGHTS) && userLocalData.adminSettings(ID_REPORTS_RECRUITER_ACTIVITY_INSIGHTS),
                    externalRoute: false,
                },
                {
                    id: 'JobActivityInsights',
                    label: 'Job Activity Insights',
                    route: '/reports/JobActivityInsights',
                    isEnabled: userLocalData.getvalue('clientId') === 55,
                    externalRoute: false,
                },
                {
                    id: 'CreateDashboard',
                    label: 'Create Dashboard',
                    route: '/reports/CreateDashboard',
                    settingId: 0,
                    isEnabled: userLocalData.adminSettings(ID_REPORTS_CREATE_DASHBOARD) && !userLocalData.adminSettings(ID_PLATFORM_TALENT_SOURCE) && !isClient6(),
                    externalRoute: false,
                },
                // {
                //     id: 'QuickSight',
                //     label: 'Quick Sight',
                //     route: '/reports/QuickSight',
                //     externalRoute: false,
                // },
                {
                    id: 'AIDataAnalyst',
                    label: 'AI Data Analyst',
                    route: '/reports/AIDataAnalyst',
                    settingId: 0,
                    isEnabled: userLocalData.adminSettings(ID_REPORTS_AI_DATA_ANALYST) && !userLocalData.adminSettings(ID_PLATFORM_TALENT_SOURCE) && !isClient6(),
                    externalRoute: false,
                },
                {
                    id: 'CustomReport',
                    label: 'Custom Report',
                    route: '/reports/custom/list',
                    settingId: 0,
                    isEnabled: userLocalData.checkIntegration(ID_ROLE_ANALYTICS_CAN_ACCESS_CUSTOM_REPORTS) && userLocalData.adminSettings(ID_REPORTS_CUSTOM_REPORT) && !userLocalData.adminSettings(ID_PLATFORM_TALENT_SOURCE) && !isClient6(),
                    externalRoute: false,
                },
                {
                    id: 'OutreachActivity',
                    label: 'Outreach Activity',
                    route: '/reports/outreachactivity',
                    settingId: 0,
                    isEnabled: userLocalData.adminSettings(ID_REPORTS_OUTREACH_ACTIVITY) && !isClient6(),
                    externalRoute: false,
                },
                {
                    id: 'OutreachKPI',
                    label: 'Outreach KPI',
                    route: '/reports/outreachkpi',
                    settingId: 0,
                    isEnabled: userLocalData.adminSettings(ID_REPORTS_OUTREACH_KPI) && !isClient6(),
                    externalRoute: false,
                },
                {
                    id: 'LinkedInViewedProfiles',
                    label: 'LinkedIn Viewed Profiles',
                    route: '/reports/LinkedInViewedProfiles',
                    isEnabled: userLocalData.adminSettings(ID_REPORTS_LINKEDIN_VIEWED_PROFILES) && userLocalData.checkIntegration(ID_ROLE_ANALYTICS_CAN_ACCESS_LINKEDIN_VIEWED_PROFILES) && !isClient6(),
                    externalRoute: false,
                },
                {
                    id: 'ChartsReport',
                    label: 'Charts Report',
                    route: '/reports/charts',
                    settingId: 0,
                    isEnabled: (
                        (userLocalData.checkIntegration(ID_ROLE_ANALYTICS_CAN_ACCESS_TALENT_COMMUNITY_INSIGHTS) && userLocalData.adminSettings(ID_REPORTS_TALENT_COMMUNITY_INSIGHTS) && !userLocalData.adminSettings(ID_PLATFORM_TALENT_SOURCE)) &&
                        (userLocalData.checkIntegration(ID_ROLE_ANALYTICS_CAN_ACCESS_EXECUTIVE_INSIGHTS) && userLocalData.adminSettings(ID_REPORTS_EXECUTIVE_INSIGHTS) && !userLocalData.adminSettings(ID_PLATFORM_TALENT_SOURCE)) &&
                        (userLocalData.checkIntegration(ID_ROLE_ANALYTICS_CAN_ACCESS_HIRING_INSIGHTS) && userLocalData.adminSettings(ID_REPORTS_HIRING_INSIGHTS)) &&
                        (userLocalData.checkIntegration(ID_ROLE_ANALYTICS_CAN_ACCESS_SOURCING_INSIGHTS) && userLocalData.adminSettings(ID_REPORTS_SOURCING_INSIGHTS)) &&
                        (userLocalData.checkIntegration(ID_ROLE_ANALYTICS_CAN_ACCESS_PIPELINE_INSIGHTS) && userLocalData.adminSettings(ID_REPORTS_PIPELINE_INSIGHTS)) &&
                        (userLocalData.checkIntegration(ID_ROLE_ANALYTICS_CAN_ACCESS_RECRUITER_ACTIVITY_INSIGHTS) && userLocalData.adminSettings(ID_REPORTS_RECRUITER_ACTIVITY_INSIGHTS)) &&
                        (userLocalData.adminSettings(ID_REPORTS_CREATE_DASHBOARD) && !userLocalData.adminSettings(ID_PLATFORM_TALENT_SOURCE)) &&
                        (userLocalData.adminSettings(ID_REPORTS_AI_DATA_ANALYST) && !userLocalData.adminSettings(ID_PLATFORM_TALENT_SOURCE)) &&
                        (userLocalData.checkIntegration(ID_ROLE_ANALYTICS_CAN_ACCESS_CUSTOM_REPORTS) && userLocalData.adminSettings(ID_REPORTS_CUSTOM_REPORT) && !userLocalData.adminSettings(ID_PLATFORM_TALENT_SOURCE)) &&
                        !isClient6()
                    ),
                    externalRoute: false,
                },
                {
                    id: 'ExploCharts',
                    label: 'Explo Charts',
                    route: '/reports/ExploCharts',
                    isEnabled: (
                        (userLocalData.checkIntegration(ID_ROLE_ANALYTICS_CAN_ACCESS_TALENT_COMMUNITY_INSIGHTS) && userLocalData.adminSettings(ID_REPORTS_TALENT_COMMUNITY_INSIGHTS) && !userLocalData.adminSettings(ID_PLATFORM_TALENT_SOURCE)) &&
                        (userLocalData.checkIntegration(ID_ROLE_ANALYTICS_CAN_ACCESS_EXECUTIVE_INSIGHTS) && userLocalData.adminSettings(ID_REPORTS_EXECUTIVE_INSIGHTS) && !userLocalData.adminSettings(ID_PLATFORM_TALENT_SOURCE)) &&
                        (userLocalData.checkIntegration(ID_ROLE_ANALYTICS_CAN_ACCESS_HIRING_INSIGHTS) && userLocalData.adminSettings(ID_REPORTS_HIRING_INSIGHTS)) &&
                        (userLocalData.checkIntegration(ID_ROLE_ANALYTICS_CAN_ACCESS_SOURCING_INSIGHTS) && userLocalData.adminSettings(ID_REPORTS_SOURCING_INSIGHTS)) &&
                        (userLocalData.checkIntegration(ID_ROLE_ANALYTICS_CAN_ACCESS_PIPELINE_INSIGHTS) && userLocalData.adminSettings(ID_REPORTS_PIPELINE_INSIGHTS)) &&
                        (userLocalData.checkIntegration(ID_ROLE_ANALYTICS_CAN_ACCESS_RECRUITER_ACTIVITY_INSIGHTS) && userLocalData.adminSettings(ID_REPORTS_RECRUITER_ACTIVITY_INSIGHTS)) &&
                        (userLocalData.adminSettings(ID_REPORTS_CREATE_DASHBOARD) && !userLocalData.adminSettings(ID_PLATFORM_TALENT_SOURCE)) &&
                        (userLocalData.adminSettings(ID_REPORTS_AI_DATA_ANALYST) && !userLocalData.adminSettings(ID_PLATFORM_TALENT_SOURCE)) &&
                        (userLocalData.checkIntegration(ID_ROLE_ANALYTICS_CAN_ACCESS_CUSTOM_REPORTS) && userLocalData.adminSettings(ID_REPORTS_CUSTOM_REPORT) && !userLocalData.adminSettings(ID_PLATFORM_TALENT_SOURCE)) && !isClient6()
                    ),
                },


            ]
        },
        // {
        //     label: 'Settings',
        //     icon: <TuneIcon className="sideNavIcon" />,
        //     children: [
        //         {
        //             id: 'Users',
        //             label: 'Users',
        //             route: '/settings/users',
        //             externalRoute: false,
        //         },
        //         {
        //             id: 'User',
        //             label: 'User',
        //             route: '/settings/user',
        //             externalRoute: false,
        //         },
        //         {
        //             id: 'Registration',
        //             label: 'Registration',
        //             route: '/settings/registration',
        //             externalRoute: false,
        //         },
        //     ]}

        {
            label: 'Billing',
            icon: <PaidOutlinedIcon className="sideNavIcon" />,
            settingId: 0,
            isEnabled: (userLocalData.checkIntegration(ID_ROLE_SUBSCRIPTION_USAGE) || userLocalData.checkIntegration(ID_ROLE_SUBSCRIPTION_MANAGE_PLAN_BILLING)),
            // route: '/billing',
            fixToBottom: true,
            children: [
                {
                    id: 'billing',
                    label: 'Billing',
                    // route: '/billing',
                    onClick: () => handleMenuClick("Billing"),
                    settingId: 0,
                    isEnabled: userLocalData.checkIntegration(ID_ROLE_SUBSCRIPTION_MANAGE_PLAN_BILLING),
                    externalRoute: false,
                },
                {
                    id: 'Usage',
                    label: 'Usage',
                    route: '/reports/usage',
                    settingId: 0,
                    isEnabled: userLocalData.checkIntegration(ID_ROLE_SUBSCRIPTION_USAGE),
                    externalRoute: false,
                }
            ]
        },




        {
            label: 'Team',
            icon: <GroupsOutlinedIcon className="sideNavIcon" />,
            settingId: 0,
            isEnabled: (userLocalData.getvalue('paymentType') !== 1) && userLocalData.isClient7() && !userLocalData.getvalue('invitedBy'),
            route: '/team',
            fixToBottom: true,
        },


        {
            label: 'Upgrade',
            icon: <UpgradeOutlinedIcon className="sideNavIcon" />,
            settingId: 0,
            isEnabled: userLocalData.isClient7(),
            route: '/upgrade',
            fixToBottom: true,
        },


        {
            label: 'Refer',
            icon: <BoltIcon className="sideNavIcon" />,
            settingId: 0,
            isEnabled: userLocalData.isClient7(),
            route: '/refer',
            fixToBottom: true,
        },
        {
            label: 'Settings',
            icon: <SettingsOutlinedIcon className="sideNavIcon" />,
            settingId: 0,
            isEnabled: userLocalData.checkSettings(ID_ROLE_ADMIN_SETTINGS),
            // route: '/settings',
            fixToBottom: true,
            // children: 
        }
    ];
    const popupState = Array(HeaderList.length).fill(null).map((_, i) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        return usePopupState({
            variant: 'popover',
            popupId: 'sideNavMenu' + i,
        })
    });


    const SettingRoutes = [
        {
            id: 'Users',
            label: 'Users',
            route: '/settings/users',
            settingId: 0,
            isEnabled: userLocalData.checkSettings(ID_ROLE_ADMIN_SETTINGS_USER) && !userLocalData.isClient7(),
            externalRoute: false,
        },
        // {
        //     id: 'EmailBuilder',
        //     label: 'Email Builder',
        //     route: '/letter/EmailBuilder',
        //     externalRoute: false,
        // },
        {
            id: 'Roles',
            label: 'Roles',
            route: '/settings/roles',
            settingId: 0,
            isEnabled: ((userLocalData.getvalue('paymentType') !== 1) && userLocalData.checkSettings(ID_ROLE_ADMIN_SETTINGS_ROLE)),
            externalRoute: false,
        },
        {
            id: 'Branding',
            label: 'Branding',
            route: '/settings/Branding',
            settingId: 0,
            isEnabled: userLocalData.checkSettings(ID_ROLE_COMPANY_SETTINGS_BRAND) && !userLocalData.adminSettings(ID_PLATFORM_TALENT_SOURCE) && userLocalData.adminSettings(ID_ADDON_CAREER_PORTAL),
            externalRoute: false,
        },
        // {
        //     id: 'JobContent',
        //     label: 'JobContent',
        //     route: '/settings/JobContent',
        //     settingId: 0,
        //     isEnabled: userLocalData.checkSettings(ID_ROLE_COMPANY_SETTINGS_BRAND) && !userLocalData.adminSettings(ID_PLATFORM_TALENT_SOURCE) && userLocalData.adminSettings(ID_ADDON_CAREER_PORTAL),
        //     externalRoute: false,
        // },
        {
            id: 'Sources',
            label: 'Sources',
            route: '/settings/sources',
            settingId: 0,
            isEnabled: userLocalData.checkSettings(ID_ROLE_COMPANY_SETTINGS_SOURCES) && userLocalData.adminSettings(ID_ADDON_CAREER_PORTAL),
            externalRoute: false,
        },

        {
            id: 'Goals',
            label: 'Goals',
            route: '/settings/goals',
            isEnabled: (import.meta.env.VITE_ENV !== "prod") && !userLocalData.isChromeExtensionEnabled(),
            externalRoute: false,
        },
      
        
        {
            id: 'Holidays',
            label: 'Holidays',
            route: '/settings/holidays',
            settingId: 0,
            isEnabled: userLocalData.checkSettings(ID_ROLE_APP_SETTINGS_HOLIDAY_SETTING),
            externalRoute: false,
        },
        {
            id: 'JobBoards',
            label: 'JobBoards',
            route: '/settings/jobBoards',
            settingId: 0,
            isEnabled: !userLocalData.adminSettings(ID_PLATFORM_TALENT_SOURCE) && userLocalData.adminSettings(ID_ADDON_IDIBU),
            externalRoute: false,
        },
        {
            id: 'Templates',
            label: 'Templates',
            route: '/settings/templates',
            settingId: 0,
            isEnabled: userLocalData.checkIntegration(ID_ROLE_EMAIL_AND_SMS_CAN_EDIT_VIEW_MESSAGE_TEMPLATES),
            externalRoute: false,
        },
        // {
        //     id: 'Templates1',
        //     label: 'Templates1',
        //     route: '/settings/templates1',
        //     settingId: 0,
        //     isEnabled: true,
        //     externalRoute: false,
        // },
        {
            id: 'Reasons',
            label: 'Reasons',
            route: '/settings/reasons',
            settingId: 0,
            isEnabled: userLocalData.checkSettings(ID_ROLE_APP_SETTINGS_REASONS) && userLocalData.adminSettings(ID_SETTINGS_WORKFLOW),
            externalRoute: false,
        },
        {
            id: 'Option Bank',
            label: 'Option Bank',
            route: '/settings/optionBank',
            settingId: 0,
            isEnabled: userLocalData.checkSettings(130004) && !userLocalData.adminSettings(30002) && !userLocalData.adminSettings(ID_PLATFORM_TALENT_SOURCE) && userLocalData.adminSettings(ID_SETTINGS_FORMS),
            externalRoute: false,
        },
        {
            id: 'Duplicate Settings',
            label: 'Duplicate Settings',
            route: '/settings/duplicatesettings',
            settingId: 0,
            isEnabled: userLocalData.checkSettings(130005) && !userLocalData.adminSettings(ID_PLATFORM_TALENT_SOURCE) && userLocalData.adminSettings(ID_ADDON_CAREER_PORTAL),
            externalRoute: false,
        },
        {
            id: 'CustomFields',
            label: 'Custom Fields',
            route: '/settings/CustomFields',
            settingId: 0,
            isEnabled: userLocalData.checkSettings(ID_ROLE_APP_SETTINGS_CUSTOM_FIELDS) && userLocalData.adminSettings(ID_ADDON_CAREER_PORTAL),
            externalRoute: false,
        },
        // {
        //     id: 'Dnd',
        //     label: 'React-Dnd',
        //     route: '/reports/custom/dnd',
        //     settingId: 0,
        //     isEnabled: userLocalData.checkIntegration(ID_ROLE_ANALYTICS_CAN_ACCESS_CUSTOM_REPORTS),
        //     externalRoute: false,
        // },
        {
            id: 'Policies',
            label: 'Policies',
            route: '/settings/policies',
            settingId: 0,
            isEnabled: !userLocalData.adminSettings(ID_PLATFORM_TALENT_SOURCE) && userLocalData.adminSettings(ID_ADDON_CAREER_PORTAL),
            externalRoute: false,
        },
        {
            id: 'Integrations',
            label: 'Integrations',
            route: '/settings/Integrations',
            settingId: 0,
            isEnabled: (userLocalData.getvalue('clientId') === 2),
            externalRoute: false,
        },
        {
            id: 'Hiring Workflow',
            label: 'Hiring Workflow',
            route: '/settings/hiringWorkflow',
            settingId: 0,
            isEnabled: userLocalData.adminSettings(ID_SETTINGS_HIRING_WORKFLOW) && !userLocalData.adminSettings(ID_PLATFORM_TALENT_SOURCE),
            externalRoute: false,
        },
        {
            id: 'Videos',
            label: 'Videos',
            route: '/settings/videoslist',
            isEnabled: !userLocalData.adminSettings(ID_PLATFORM_TALENT_SOURCE) && userLocalData.adminSettings(ID_SETTINGS_WORKFLOW),
            externalRoute: false,
        },
        {
            id: 'Email',
            label: 'Email',
            route: '/settings/email',
            isEnabled: true,
            externalRoute: false,
        },
        {
            id: 'ReferFriend',
            label: 'Refer a Friend',
            route: '/settings/refer-a-friend',
            isEnabled: (import.meta.env.VITE_ENV === "qa") && !userLocalData.isChromeExtensionEnabled(),
            externalRoute: false,
        },
        {
            id: 'Persona',
            label: 'Persona',
            route: '/settings/persona',
            isEnabled: userLocalData.adminSettings(ID_ADDON_PEOPLE_CONTACT) || userLocalData.adminSettings(ID_ADDON_PEOPLE_CANDIDATE),
            externalRoute: false,
        },
        {
            id: 'Sending Limit',
            label: 'Sending Limit',
            route: '/settings/sendingLimit',
            isEnabled: userLocalData.adminSettings(ID_SETTINGS_CAMPAIGNS),
            externalRoute: false,
        },
        {
            id: 'Metrics',
            label: 'Metrics Mapping',
            route: '/settings/metrics',
            isEnabled: (import.meta.env.VITE_ENV !== "prod") && !userLocalData.isChromeExtensionEnabled() && userLocalData.adminSettings(ID_SETTINGS_HIRING_WORKFLOW) && !userLocalData.adminSettings(ID_PLATFORM_TALENT_SOURCE),
            externalRoute: false,
        },
        {
            id: 'Job Content',
            label: 'Job Content',
            route: '/settings/job-content',
            isEnabled: userLocalData.checkSettings(ID_ROLE_COMPANY_SETTINGS_BRAND) && !userLocalData.adminSettings(ID_PLATFORM_TALENT_SOURCE) && userLocalData.adminSettings(ID_ADDON_CAREER_PORTAL),
            //1,
            externalRoute: false,
        },
        {
            id: 'Credit Limit',
            label: 'Credit Limit',
            route: '/settings/credit-limit',
            isEnabled: true,
            externalRoute: false,
        },
        {
            id: 'ATS Settings',
            label: 'ATS Settings',
            route: '/settings/ats-settings',
            isEnabled: (import.meta.env.VITE_ENV !== "prod"),
            externalRoute: false,
        },
    ];

    // const navigate = useNavigate();

    const goBack = () => {
        handleSettingsRoute(false)
    }
    // usePopupState({
    //     variant: 'popover',
    //     popupId: 'demoMenu',
    // })


    // const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, i: number) => {
    //     // console.log(i);
    //     // let tempPopElement = popElement;
    //     // tempPopElement[i] = event.currentTarget;
    //     setPopElement({
    //         element: event.currentTarget,
    //         selectedIndex: i
    //     });
    // };

    // const handlePopoverClose = (i: number) => {
    //     // console.log(i);
    //     // let tempPopElement = popElement;
    //     // tempPopElement[i] = null;
    //     setPopElement({
    //         element: null,
    //         selectedIndex: null
    //     });
    // };

    // const popupOpened = (i: number) => Boolean(popElement[i]);
    // const [isExpanded, setIsExpanded] = useState(false);

    const [expanded, setExpanded] = useState(new Array(HeaderList.length).fill(true));

    const handleAccordionChange = (index: number) => {
        const newExpanded = [...expanded];
        newExpanded[index] = !newExpanded[index];
        setExpanded(newExpanded);
    };

    // const { pathname } = useLocation();
    // const isSettingsPath = matchPath(`${userLocalData.getvalue('clientName')}/settings/*`, pathname);

    const handleLabelClick = (label: string) => {
        if (label === "Settings") {
            handleSettingsRoute(true);
        }
    }

    return (
        <div className='sideNavBar'>
            {/* <button className={'menuBtn'} onClick={toggleOpen} >
                {open ? <KeyboardDoubleArrowLeftIcon /> : <KeyboardDoubleArrowRightIcon />}
            </button> */}
            {
                !isSettingsRoute ?
                    <div className={open ? 'sidenav' : 'sidenavClosed'}>
                        {
                            open ?
                                HeaderList.map((item, index) => {
                                    return (item.icon && item.isEnabled) ?
                                        (item.children?.length) ?
                                            <Accordion defaultExpanded key={item.label} className='panel' expanded={expanded[index]} onChange={() => handleAccordionChange(index)} >
                                                <AccordionSummary
                                                    expandIcon={item.children.length > 0 ? (expanded[index] ? <KeyboardArrowUpIcon /> : <KeyboardArrowRightIcon />) : null}
                                                    className="summary"
                                                >
                                                    <Typography className="accordionTitle">{item.icon} {item.label}</Typography>
                                                </AccordionSummary>
                                                {
                                                    item.children && item.children.length > 0 ? (
                                                        <AccordionDetails className="details">
                                                            {item.children.filter((child) => { return child.isEnabled }).map((child) => (
                                                                <>
                                                                    {
                                                                        child.isEnabled ?
                                                                            child?.externalRoute ?
                                                                                <a className='childLink' key={child.label} href={(child.route) ? child.route : ""} target={child?.externalRoute ? "_blank" : "_self"} rel="noopener noreferrer" >
                                                                                    {child.label}
                                                                                </a>
                                                                                :
                                                                                child?.onClick ?
                                                                                    <span className="childLink" onClick={child.onClick}>{child.label}</span>
                                                                                    :
                                                                                    <NavLink className={({ isActive, isPending }) => `childLink ${isPending ? "pending" : isActive ? "active" : ""}`} key={child.label} to={(child.route) ? clientName + child.route : ""} target={child?.externalRoute ? "_blank" : "_self"} rel="noopener noreferrer" >
                                                                                        {child.label}
                                                                                    </NavLink>
                                                                            :
                                                                            null
                                                                    }
                                                                </>

                                                            ))}
                                                        </AccordionDetails>
                                                    ) : null
                                                }
                                            </Accordion>
                                            :
                                            (item?.route ?
                                                <NavLink key={item.label} className={'sideItem'} to={(item.route) ? clientName + item.route : ""} target={item.externalRoute ? "_blank" : "_self"} >
                                                    <Tooltip title={item.label} placement="right" >
                                                        {item.icon}
                                                    </Tooltip>
                                                    < span className={'linkText'} > {item.label} </span>
                                                </NavLink> :
                                                <Tooltip title={item.label} placement="right" key={item.label}>
                                                    <Typography variant="caption" className={'sideItem'} onClick={() => handleLabelClick(item.label)}>
                                                        {item.icon}
                                                        <Typography variant="caption" className="linkText" sx={{ cursor: "pointer" }} >{item.label}</Typography>
                                                    </Typography>
                                                </Tooltip>
                                            )
                                        :
                                        null
                                })
                                :
                                HeaderList.map((item, index) => {
                                    return (item.icon && item.isEnabled) ?
                                        (item.children && item.children.length) ?
                                            <div key={item.label} className={`${item.label}Menu ${item.fixToBottom ? 'fixToBottom' : ''}`}>

                                                <Typography
                                                    className="sideItem"
                                                    {...bindHover(popupState[index])}
                                                    {...bindFocus(popupState[index])}

                                                // aria-owns={(popElement.selectedIndex === index) ? 'mouse-over-popover' : undefined}
                                                // aria-haspopup="true"
                                                // onMouseEnter={(e) => handlePopoverOpen(e, index)}
                                                // onMouseLeave={() => handlePopoverClose(index)}

                                                >
                                                    {
                                                        (item?.route) ?
                                                            <NavLink key={item.label} to={(item.route) ? clientName + item.route : ""} target={item.externalRoute ? "_blank" : "_self"} style={{ display: "flex", alignItems: "center", color: "#737373", textDecoration: "none" }}>
                                                                {item.icon}
                                                                {/* <Tooltip title={item.label} placement="right">
                                                </Tooltip> */}
                                                                < span className={'linkText'} > {item.label} </span>
                                                            </NavLink>
                                                            :
                                                            <span key={item.label} style={{ display: "flex", alignItems: "center" }} onClick={() => handleLabelClick(item.label)}>
                                                                {
                                                                    item.shortForm ?
                                                                        <Tooltip title={item.label}><span className="menuTextIcon">{item.icon}</span></Tooltip>
                                                                        :
                                                                        item.icon
                                                                }
                                                                <span className={'linkText'} >
                                                                    {item.label}
                                                                </span>
                                                            </span>
                                                    }
                                                </Typography>
                                                {/* <Button variant="contained" {...bindHover(popupState[index])}>
                                                    {item.label}
                                                </Button> */}
                                                <HoverMenu
                                                    {...bindMenu(popupState[index])}
                                                    anchorOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'right',
                                                    }}
                                                    transformOrigin={{
                                                        vertical: (index > 4) ? 'center' : 'top',
                                                        horizontal: 'left',
                                                    }}
                                                    className="hoverMenuItem"
                                                >
                                                    {
                                                        item.children.filter((child) => { return child.isEnabled }).map(child => {
                                                            return <MenuItem onClick={popupState[index].close} key={child.id} className="childMenuItem">
                                                                {
                                                                    child?.externalRoute ?
                                                                        <a className='childLink' key={child.label} href={(child.route) ? child.route : ""} target={child?.externalRoute ? "_blank" : "_self"} rel="noopener noreferrer" >
                                                                            {child.label}
                                                                        </a>
                                                                        :
                                                                        child?.onClick ?
                                                                            <span className="childLink" onClick={child.onClick}>{child.label}</span>
                                                                            :
                                                                            <NavLink className={({ isActive, isPending }) => `childLink ${isPending ? "pending" : isActive ? "active" : ""}`} key={child.label} to={(child.route) ? clientName + child.route : ""} target={child?.externalRoute ? "_blank" : "_self"} rel="noopener noreferrer">
                                                                                {child.label}
                                                                            </NavLink>

                                                                }
                                                            </MenuItem>
                                                        })
                                                    }
                                                </HoverMenu>
                                                {/* <Typography
                                        className="sideItem"
                                        aria-owns={(popElement.selectedIndex === index) ? 'mouse-over-popover' : undefined}
                                        aria-haspopup="true"
                                        onMouseEnter={(e) => handlePopoverOpen(e, index)}
                                        onMouseLeave={() => handlePopoverClose(index)}

                                    >
                                        {item.icon}
                                        <span className={'linkText'} >
                                            {item.label}
                                        </span>
                                        <Popover
                                            id="mouse-over-popover"
                                            sx={{
                                                pointerEvents: 'none',
                                            }}
                                            open={(popElement.selectedIndex === index)}
                                            anchorEl={popElement.element}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                            onClose={handlePopoverClose}
                                            disableRestoreFocus
                                        >

                                            <List aria-label={item.label} className="">
                                                {
                                                    item.children.map(child => {
                                                        return <ListItem key={child.id} disablePadding>
                                                            <ListItemButton>
                                                                <NavLink key={child.label} className={''} to={(child.route) ? child.route : ""} target={child?.externalRoute ? "_blank" : "_self"} rel="noopener noreferrer" >
                                                                    <ListItemText primary={child.label} />
                                                                </NavLink>
                                                            </ListItemButton>
                                                        </ListItem>
                                                    })
                                                }
                                            </List>
                                        </Popover>
                                    </Typography> */}
                                            </div>
                                            :
                                            (item?.externalRoute ?
                                                <a target='_blank'
                                                    rel='noopener noreferrer' href={item.route} key={item.label} style={{ display: "flex", alignItems: "center" }} className={`sideItem ${item.label}Menu ${item.fixToBottom ? 'fixToBottom' : ''}`}>
                                                    {
                                                        item.shortForm ?
                                                            <Tooltip title={item.label}><span className="menuTextIcon">{item.icon}</span></Tooltip>
                                                            :
                                                            item.icon
                                                    }
                                                    <span className={'linkText'} >
                                                        {item.label}
                                                    </span>
                                                </a>
                                                :
                                                item?.route ?
                                                    <NavLink key={item.label} className={`sideItem ${item.label}Menu ${item.fixToBottom ? 'fixToBottom' : ''}`} to={(item.route) ? clientName + item.route : ""} target={item.externalRoute ? "_blank" : "_self"} >
                                                        <Tooltip title={item.label} placement="right">
                                                            {item.icon}
                                                        </Tooltip>
                                                        < span className={'linkText'} > {item.label} </span>
                                                    </NavLink>
                                                    :
                                                    <span key={item.label} style={{ display: "flex", alignItems: "center" }} className={`sideItem ${item.label}Menu ${item.fixToBottom ? 'fixToBottom' : ''}`} onClick={() => handleLabelClick(item.label)}>
                                                        {item.icon}
                                                        <span className={'linkText'} >
                                                            {item.label}
                                                        </span>
                                                    </span>)
                                        :
                                        null
                                })
                        }
                    </div>
                    :
                    <Grid sx={{ width: '220px', backgroundColor: 'var(--curatelyWhite)' }}>
                        <Button variant="text" className='mt-1' startIcon={<ArrowBackIosOutlinedIcon className='fs-14' />} size='small' id="backToButton" onClick={goBack}>
                            Settings
                        </Button>
                        <div id="settingsSideNav" className="pl-4">
                            {SettingRoutes.map((child) => (
                                <Fragment key={child.label}>
                                    {
                                        child.isEnabled ?
                                            child?.externalRoute ?
                                                <a className='settingsChildLink' href={(child.route) ? child.route : ""} target={child?.externalRoute ? "_blank" : "_self"} rel="noopener noreferrer" >
                                                    {child.label}
                                                </a>
                                                :
                                                <NavLink
                                                    className={({ isActive, isPending }) => `settingsChildLink ${isPending ? "pending" : isActive ? "active" : ""}`}

                                                    to={(child.route) ? clientName + child.route : ""}
                                                    target={child?.externalRoute ? "_blank" : "_self"}
                                                    rel="noopener noreferrer"
                                                >
                                                    {child.label}
                                                </NavLink>
                                            :
                                            null

                                    }
                                </Fragment>

                            ))}
                        </div>
                    </Grid>
            }
        </div >
    )
}

export default Sidenav;
