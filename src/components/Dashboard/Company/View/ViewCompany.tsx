
import { useEffect, useState } from '../../../../shared/modules/React';
import { trackPromise } from '../../../../shared/modules/PromiseTrackter';

import { Tabs, Tab } from '../../../../shared/modules/MaterialImports/Tabs';
// import Typography from '@mui/material/Typography';
import { Box } from '../../../../shared/modules/MaterialImports/Box';

// import Stack from '@mui/material/Stack';
import { Grid } from '../../../../shared/modules/MaterialImports/Grid';


import LinkIcon from '@mui/icons-material/Link';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import TwitterIcon from '@mui/icons-material/Twitter';

import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import PeopleIcon from '@mui/icons-material/People';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DescriptionIcon from '@mui/icons-material/Description';

// import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

import MainDetails from './MainDetails/MainDetails';
import Contacts from './Contacts/Contacts';

import { useParams } from 'react-router-dom';

import ApiService from "../../../../shared/api/api";

import './ViewCompany.scss';
import Jobs from './Jobs/Jobs';
import updateDocumentTitle from '../../../../shared/services/title';
import Placements from './Placements/Placements';
import Documents from './Documents/Documents';
import Interviews from './Interviews/Interviews';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AddCompany from '../Add/AddCompany';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`companyTabsPanel-${index}`}
            aria-labelledby={`companyTabsPanel-${index}`}
            {...other}
            className='companyTabsPanel customTabsPanel'
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function tabProperties(index: number) {
    return {
        id: `companyTabs-${index}`,
        'aria-controls': `companyTabsPanel-${index}`,
    };
}

const ViewCompany = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const [companyData, setCompanyData] = useState({
        contactsCount: 0,
        jobsCount: 0,
        intsCount: 0,
        docsCount: 0,
        placementsCount: 0,
        companyName: ""
    });

    const [companyDetailedData, setCompanyDetailedData] = useState({
        compName: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
        fax: "",
        web: "",
        description: "",
        fee_agree: "",
        fee_guarn: "",
        fee_terms: "",
        fee_contct: "",
        fee_write: "",
        yr_started: "",
        num_employ: "",
        revenue: "",
        echange: "",
        active: "",
        geo: "",
        tradeSymbol: "",
        phone2: "",
        phone3: "",
        Category_ID: "",
        Established: "",
        CompanyStatus_ID: "",
        WebJobs: "",
        ExpireDate: "",
        feeflat: "",
        Locale: "",
        VMSRequired: "",
        VMSWebsite: "",
        VMSUsername: "",
        VMSPassword: "",
        VMSComment: "",
        SIC: "",
        enterby: "",
        phone_area: "",
        phone2_area: "",
        phone3_area: "",
        chkNoBulk: "",
        chkAgency: "",
    })
    const { companyId } = useParams();

    const [openAddCompanyModal, setOpenAddCompanyModal] = useState(false);



    const [editCompanyData, setEditCompanyData] = useState({
        "companyName": '',
        "ownerName": '',
        "mainPhone": '',
        "alternativePhone1": '',
        "alternativePhone2": '',
        "fax": '',
        "mainCompnay": '',
        "jobsWebsite": '',
        "streetAddress": '',
        "streetAddress1": '',
        "city": '',
        "state": '',
        "postalCode": '',
        "country": '',
        "region": '',
        "active": '',
        "bulk": '',
        "userAgency": '',
        "pipelineStatus": '',
        "industry": '',
        "sic": '',
        "started": '',
        "employees": '',
        "revenue": '',
        "exchange": '',
        "symbol": '',
        "Sent": '',
        "received": '',
        "fee": '',
        "flatFree": '',
        "guaranteeInformation": '',
        "terms": '',
        "dateEstablishement": '',
        "expireDate": '',
        "primarycontact": '',
        "mspProgram": '',
        "create1": '',
        "create2": '',
        "allUsers": '',
        "customUsers": '',
        "companyId": "",
        "notes": ""
    });

    useEffect(() => {
        trackPromise(
            ApiService.getByParams(193, 'Company/company_count.jsp', { compId: companyId }).then(
                (response: any) => {
                    // console.log(response.data);
                    setCompanyData({
                        contactsCount: Number(response.data.contactsCount),
                        jobsCount: Number(response.data.jobsCount),
                        intsCount: Number(response.data.intsCount),
                        docsCount: Number(response.data.docsCount),
                        placementsCount: Number(response.data.placementsCount),
                        companyName: response.data.companyName
                    });
                    updateDocumentTitle.set(response.data.companyName + ' | Company');
                }
            ))
        trackPromise(
            ApiService.getByParams(193, 'Company/company_details.jsp', { compId: companyId }).then(
                (response: any) => {
                    // console.log(response.data);
                    response.data.web = getValidUrl(response.data.web)
                    setCompanyDetailedData(response.data);
                    setEditCompanyData({
                        "companyName": (response.data.compName) ? response.data.compName : "",
                        "ownerName": (response.data.enterby) ? response.data.enterby : "",
                        "mainPhone": (response.data.phone) ? response.data.phone : "",
                        "alternativePhone1": (response.data.phone2) ? response.data.phone2 : "",
                        "alternativePhone2": (response.data.phone3) ? response.data.phone3 : "",
                        "fax": (response.data.fax) ? response.data.fax : "",
                        "mainCompnay": (response.data.web) ? response.data.web : "",
                        "jobsWebsite": (response.data.WebJobs) ? response.data.WebJobs : "",
                        "streetAddress": (response.data.address1) ? response.data.address1 : "",
                        "streetAddress1": (response.data.address2) ? response.data.address2 : "",
                        "city": (response.data.city) ? response.data.city : "",
                        "state": (response.data.state) ? response.data.state : "",
                        "postalCode": (response.data.zip) ? response.data.zip : "",
                        "country": (response.data.Locale) ? response.data.Locale : "",
                        "region": (response.data.geo) ? response.data.geo : "",
                        "active": (response.data.active) ? response.data.active : "",
                        "bulk": (response.data.chkNoBulk) ? response.data.chkNoBulk : "",
                        "userAgency": (response.data.chkAgency) ? response.data.chkAgency : "",
                        "pipelineStatus": (response.data.CompanyStatus_ID) ? response.data.CompanyStatus_ID : "",
                        "industry": (response.data.Category_ID) ? response.data.Category_ID : "",
                        "sic": (response.data.SIC) ? response.data.SIC : "",
                        "started": (response.data.Established) ? response.data.Established : "",
                        "employees": (response.data.num_employ) ? response.data.num_employ : "",
                        "revenue": (response.data.revenue) ? response.data.revenue : "",
                        "exchange": (response.data.echange) ? response.data.echange : "",
                        "symbol": (response.data.tradeSymbol) ? response.data.tradeSymbol : "",
                        "Sent": (response.data.sadasd) ? response.data.sadasd : "",
                        "received": (response.data.sadasd) ? response.data.sadasd : "",
                        "fee": (response.data.sadasd) ? response.data.sadasd : "",
                        "flatFree": (response.data.feeflat) ? response.data.feeflat : "",
                        "guaranteeInformation": (response.data.sadasd) ? response.data.sadasd : "",
                        "terms": (response.data.sadasd) ? response.data.sadasd : "",
                        "dateEstablishement": (response.data.Established) ? response.data.Established : "",
                        "expireDate": (response.data.ExpireDate) ? response.data.ExpireDate : "",
                        "primarycontact": (response.data.fee_contct) ? response.data.fee_contct : "",
                        "mspProgram": (response.data.sadasd) ? response.data.sadasd : "",
                        "create1": (response.data.sadasd) ? response.data.sadasd : "",
                        "create2": (response.data.sadasd) ? response.data.sadasd : "",
                        "allUsers": (response.data.sadasd) ? response.data.sadasd : "",
                        "customUsers": (response.data.sadasd) ? response.data.sadasd : "",
                        "companyId": (companyId) ? companyId : "",
                        "notes": (response.data.description) ? response.data.description : "",
                    });
                }
            ))
    }, []);

    const getValidUrl = (url = "") => {
        let newUrl = window.decodeURIComponent(url);
        newUrl = newUrl.trim().replace(/\s/g, "");

        if (/^(:\/\/)/.test(newUrl)) {
            return `http${newUrl}`;
        }
        if (!/^(f|ht)tps?:\/\//i.test(newUrl)) {
            return `http://${newUrl}`;
        }

        return newUrl;
    };


    const isValidURL = (url: string) => {
        let res = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        return (res !== null)
    };
    const openWebSite = (w: string) => {
        window.open(w);
    }

    return (
        <div id="companyViewPage" className='fullViewPage'>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                className='customCard'
                sx={{
                    minHeight: '50px !important'
                }}
            >
                <Grid className='companyName p-0 showEditonHover'
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center">
                    {(companyData.companyName) ? companyData.companyName : ""}
                    {
                        (companyDetailedData.web && isValidURL(companyDetailedData.web)) ?
                            <Box
                                className='icon-wrap'
                                sx={{
                                    marginTop: '8px',
                                    marginLeft: '10px',
                                    cursor: 'pointer'
                                }}
                            >
                                <LinkIcon onClick={() => openWebSite(companyDetailedData.web)} sx={{ color: '#919191' }} />
                            </Box>
                            : ""
                    }
                    {
                        editCompanyData.companyId ?
                            <BorderColorIcon className='editModalIcon' onClick={() => setOpenAddCompanyModal(true)} />
                            :
                            null
                    }
                </Grid>
                {/* <Grid
                    container direction="row" justifyContent="center" alignItems="center"
                    className='iconGrid'
                    spacing={3}
                >
                    <Box className='icon-wrap'>
                        <LinkIcon sx={{ color: '#919191' }} />
                    </Box>
                    <Box className='icon-wrap'>
                        <LinkedInIcon sx={{ color: '#737373' }} />
                    </Box>
                    <Box className='icon-wrap'>
                        <FacebookIcon sx={{ color: '#919191' }} />
                    </Box>
                    <Box className='icon-wrap'>
                        <TwitterIcon sx={{ color: '#919191' }} />
                    </Box>
                    <Divider orientation="vertical" flexItem className='verticalDivider' />
                    <Button size="small" startIcon={<LocalPhoneIcon />}>(123)-456-1478</Button>
                </Grid> */}
            </Grid>
            <Box sx={{ width: '100%' }}>
                <Box
                    className='customCard py-0 customCenteredTabs '
                    sx={{ borderBottom: 1, borderColor: 'divider', minHeight: 'auto !important', marginBottom: '0 !important' }}

                >
                    <Tabs value={value} onChange={handleChange} aria-label="View Company Tabs" centered>
                        <Tab
                            label={
                                <Grid container direction="row">
                                    <span className='tabLabelName'>Overview</span>
                                </Grid>
                            }
                            icon={<MapsHomeWorkOutlinedIcon />} iconPosition="start" {...tabProperties(0)} className='tabButton'
                        />
                        <Tab
                            label={
                                <Grid container direction="row">
                                    <span className='tabLabelName'>Contacts</span>
                                    {
                                        (companyData.contactsCount) ?
                                            <span className='tabCountName'>{companyData.contactsCount}</span>
                                            :
                                            null
                                    }
                                </Grid>
                            }
                            icon={<PeopleIcon />} iconPosition="start" {...tabProperties(1)} className='tabButton'
                        />
                        <Tab
                            label={
                                <Grid container direction="row">
                                    <span className='tabLabelName'>Jobs</span>
                                    {
                                        (companyData.jobsCount) ?
                                            <span className='tabCountName'>{companyData.jobsCount}</span>
                                            :
                                            null
                                    }
                                </Grid>
                            }
                            icon={<WorkOutlineOutlinedIcon />} iconPosition="start" {...tabProperties(2)} className='tabButton'
                        />
                        <Tab
                            label={
                                <Grid container direction="row">
                                    <span className='tabLabelName'>Interviews</span>
                                    {
                                        (companyData.intsCount) ?
                                            <span className='tabCountName'>{companyData.intsCount}</span>
                                            :
                                            null
                                    }
                                </Grid>
                            }
                            icon={<ListAltOutlinedIcon />} iconPosition="start" {...tabProperties(3)} className='tabButton'
                        />
                        <Tab
                            label={
                                <Grid container direction="row">
                                    <span className='tabLabelName'>Placements</span>
                                    {
                                        (companyData.placementsCount) ?
                                            <span className='tabCountName'>{companyData.placementsCount}</span>
                                            :
                                            null
                                    }
                                </Grid>
                            }
                            icon={<TaskAltIcon />} iconPosition="start" {...tabProperties(4)} className='tabButton'
                        />
                        <Tab
                            label={
                                <Grid container direction="row">
                                    <span className='tabLabelName'>Documents</span>
                                    {
                                        (companyData.placementsCount) ?
                                            <span className='tabCountName'>{companyData.docsCount}</span>
                                            :
                                            null
                                    }
                                </Grid>
                            }
                            icon={<DescriptionIcon />} iconPosition="start" {...tabProperties(4)} className='tabButton'
                        />
                    </Tabs>

                </Box>
                <CustomTabPanel value={value} index={0}>
                    <MainDetails companyData={companyData} companyDetailedData={companyDetailedData} compId={(companyId) ? companyId : ""} />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <Contacts />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <Jobs />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                    <Interviews />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={4}>
                    <Placements />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={5}>
                    <Documents />
                </CustomTabPanel>
            </Box>

            {
                (openAddCompanyModal) ?
                    <AddCompany
                        open={openAddCompanyModal}
                        closePopup={() => setOpenAddCompanyModal(false)}
                        add={false}
                        companyData={editCompanyData}
                    />
                    :
                    null
            }
        </div>
    );
}

export default ViewCompany;