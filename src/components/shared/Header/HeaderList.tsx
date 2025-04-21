import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';

import AutoModeOutlinedIcon from '@mui/icons-material/AutoModeOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import { userLocalData } from '../../../shared/services/userData';

// import ListOutlinedIcon from '@mui/icons-material/ListOutlined';

// import DeviceHubOutlinedIcon from '@mui/icons-material/DeviceHubOutlined';

export const HeaderList = [
    {
        label: 'Home',
        route: '/home',
        externalRoute: false,
        icon: <HomeOutlinedIcon />
    },
    {
        label: 'Candidate',
        route: '/candidate/find',
        icon: <PersonOutlineOutlinedIcon />,
        // externalRoute: false,
        // children: [
        //     {
        //         id: 'CandidatesAdd',
        //         label: 'Add Candidate',
        //         route: '/candidate/add',
        //         externalRoute: false,
        //     },
        //     {
        //         id: 'CandidatesFind',
        //         label: 'Find Candidate',
        //         route: '/candidate/find',
        //         externalRoute: false,
        //     },
        //     // {
        //     //     id: 'CandidatesList',
        //     //     label: 'List Candidate',
        //     //     route: '/candidate/list',
        //     //     externalRoute: false,
        //     // },
        //     // {
        //     //     id: 'CandidatesView',
        //     //     label: 'View Candidate',
        //     //     route: '/candidate/view/12345',
        //     //     externalRoute: true,
        //     // },
        //     // // {
        //     // //     id: 'CandidatesTable',
        //     // //     label: 'Table',
        //     // //     route: '/candidate/Table'
        //     // // },
        //     // {
        //     //     id: 'CandidatesKendoTable',
        //     //     label: 'KendoTable',
        //     //     route: '/candidate/KendoTable',
        //     //     externalRoute: false,
        //     // }
        // ]
    },
    {
        label: 'Contact',
        route: '/contact/find',
        icon: <ContactPhoneOutlinedIcon />,
        externalRoute: false,
        // children: [
        //     {
        //         id: 'ContactsAdd',
        //         label: 'Add Contact',
        //         route: '/contact/add',
        //         externalRoute: false,
        //     },
        //     {
        //         id: 'ContactsFind',
        //         label: 'Find Contact',
        //         route: '/contact/find',
        //         externalRoute: false,
        //     },
        //     {
        //         id: 'DistributionList',
        //         label: 'Distribution List',
        //         route: '/contact/distributionlist',
        //         externalRoute: false,
        //     },
        //     {
        //         id: 'H1BList',
        //         label: 'H1B List',
        //         route: '/contact/h1b',
        //         externalRoute: false,
        //     },
        //     {
        //         id: 'FindLeads',
        //         label: 'Find Leads',
        //         route: '/contact/findLeads',
        //         externalRoute: false,
        //     },
        //     // {
        //     //     id: 'ContactsList',
        //     //     label: 'List Contact',
        //     //     route: '/contact/list',
        //     //     externalRoute: false,
        //     // },
        //     // {
        //     //     id: 'ContactsView',
        //     //     label: 'View Contact',
        //     //     route: '/contact/view/12345',
        //     //     externalRoute: true,
        //     // }
        // ]
    },
    {
        label: 'Company',
        route: '/company/find',
        icon: <BusinessOutlinedIcon />,
        externalRoute: false,
        // children: [
        //     {
        //         id: 'CompanyAdd',
        //         label: 'Add Company',
        //         route: '/company/add',
        //         externalRoute: false,
        //     },
        //     {
        //         id: 'CompanyFind',
        //         label: 'Find Company',
        //         route: '/company/find',
        //         externalRoute: false,
        //     },
        //     {
        //         id: 'CompanyAdvancedSearch',
        //         label: 'Advanced Search',
        //         route: '/company/advancedSearch',
        //         externalRoute: false,
        //     },
        //     {
        //         id: 'AssignedClients',
        //         label: 'Assigned Clients',
        //         route: '/company/assignedClients',
        //         externalRoute: false,
        //     },
        //     // {
        //     //     id: 'CompanyView',
        //     //     label: 'View Company',
        //     //     route: '/company/view/12938',
        //     //     externalRoute: true,
        //     // }
        // ]
    },
    {
        label: 'Job',
        route: '/job/find',
        icon: <WorkOutlineOutlinedIcon />,
        externalRoute: false,
        // children: [
        //     {
        //         id: 'JobsAdd',
        //         label: 'Create Job',
        //         route: '/job/add',
        //         externalRoute: false,
        //     },
        //     // {
        //     //     id: 'JobsEdit',
        //     //     label: 'Edit Job',
        //     //     route: '/job/edit',
        //     //     externalRoute: false,
        //     // },
        //     {
        //         id: 'JobsFind',
        //         label: 'Find Job',
        //         route: '/job/find',
        //         externalRoute: false,
        //     },
        //     // {
        //     //     id: 'JobsView',
        //     //     label: 'View Job',
        //     //     route: '/job/view/12345',
        //     //     externalRoute: true,
        //     // },
        //     // {
        //     //     id: 'JobsList',
        //     //     label: 'List Job',
        //     //     route: '/job/list',
        //     //     externalRoute: false,
        //     // },
        // ]
    },
    {
        label: 'Automation',
        icon: <AutoModeOutlinedIcon />,
        children: [
            {
                id: 'Templates',
                label: 'Templates',
                route: '/letter/templates',
                externalRoute: false,
            },
            {
                id: 'Formbuilder',
                label: 'Formbuilder',
                route: '/letter/Formbuilder',
                externalRoute: false,
            },
            {
                id: 'Sequence',
                label: 'Sequence',
                route: '/letter/Sequence',
                externalRoute: false,
            },
            {
                id: 'Workflow',
                label: 'Workflow',
                route: '/letter/Workflow',
                externalRoute: false,
            },
            {
                id: 'AddVideo',
                label: 'AddVideo',
                route: '/letter/AddVideo',
                externalRoute: false,
            },

        ],
    },
    // {
    //     label: 'Letters',
    //     icon: <ListOutlinedIcon />,
    //     children: [
    //         {
    //             id: 'LettersTemplates',
    //             label: 'Letters Templates',
    //             route: '/letter/templates',
    //             externalRoute: false,
    //         },
    //         {
    //             id: 'FormBuilder',
    //             label: 'Form Builder',
    //             route: '/letter/formbuilder',
    //             externalRoute: false,
    //         }
    //     ]
    // },
    {
        label: 'Resumes',
        icon: <DescriptionOutlinedIcon />,
        children: [
            {
                id: 'ResumeSearch',
                label: 'Resume Search',
                // route: '/resume/accuick',
                route: `https://resume.accuick.com/Sovren/Jobslist.jsp?Userid=` + userLocalData.getvalue('encoded') + `&Role=` + userLocalData.getvalue('role'),
                externalRoute: true,
            },
            // {
            //     id: 'AccuickResumeSearch1',
            //     label: 'Accuick Resume Search1',
            //     route: '/resume/ask',
            //     externalRoute: true
            // },
            {
                id: 'SearchAllResumes',
                label: 'Search All Resumes',
                route: 'https://search2.accuick.com/ASKResumes/index.jsp?sessid=' + userLocalData.getvalue('sessid') + '&UserId=' + userLocalData.getvalue('recrId') + '&UserName=' + userLocalData.getvalue('userName'),
                // route: '/resume/all',
                // '<%=portalurl%>?sessid=<%=sessid%>&UserId=<%=Userid%>&UserName=<%=Username%>'
                externalRoute: true
            },
            {
                id: 'SearchBot',
                label: 'Search Bot',
                route: 'https://www4.accuick.com/Searchbot/index.jsp?userid=' + userLocalData.getvalue('recrId'),
                // route: '/resume/searchBot',
                externalRoute: true
            }
        ]
    },
    // {
    //     label: 'ClientPortals',
    //     route: '/client/portals'
    // },
    {
        label: 'Reports',
        icon: <BarChartOutlinedIcon />,
        route: '/reports',
        externalRoute: false,
    },
    // {
    //     label: 'Intranet',
    //     icon: <DeviceHubOutlinedIcon />,
    //     route: '/intranet',
    //     externalRoute: false,
    // }
];
