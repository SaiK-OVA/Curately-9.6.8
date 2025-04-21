import { SyntheticEvent, useState } from '../../../../../shared/modules/React';

import './MainDetails.scss';
//import Activities from '../../../../shared/Activities/Activities';
import { Tabs, Tab } from '../../../../../shared/modules/MaterialImports/Tabs';
import {Box} from '../../../../../shared/modules/MaterialImports/Box';
import {Grid} from '../../../../../shared/modules/MaterialImports/Grid';
import Activities from '../../../../shared/Activities/Activities';
import {Typography} from '../../../../../shared/modules/MaterialImports/Typography';


// import Typography from '@mui/material/Typography';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';

// import LinkIcon from '@mui/icons-material/Link';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
// import logoImage from '../../../../../assets/images/curatelyLogo.png';

// import Overview from '../Overview/Overview';
// import MSPProgramInformation from '../MSP Program Information/MSPProgramInformation';
// import Notes from '../Notes/Notes';
// import Profile from '../Profile/Profile';
// import DirectHireFreeAgreement from '../Direct Hire Free Agreement/DirectHireFreeAgreement';
// import AlertsAndNotifications from '../Alerts & Notifications/AlertsAndNotifications';
// import CompanyActivites from './CompanyActivities';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
function VerticalTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
            className='mainDetailsVerticalTabPanel'
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function verticalTabPanelProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const MainDetails = ({ companyData, companyDetailedData, compId }: { companyData: any, companyDetailedData: any, compId: string }) => {

    const [selectedTabIndex, setSelectedTabIndex] = useState(0);

    const handleVerticalTabChange = (event: SyntheticEvent, newValue: number) => {
        setSelectedTabIndex(newValue);
    };

    const industryValue = (id: string) => {
        switch (id) {
            case "70":
                return "Aerospace &amp; Defense";
            case "71":
                return "Agriculture";
            case "72":
                return "Auto &amp; Transportation";
            case "73":
                return "Banking";
            case "74":
                return "Business Services";
            case "75":
                return "Chemicals";
            case "76":
                return "Computer Hardware";
            case "77":
                return "Computer Services";
            case "78":
                return "Computer Software";
            case "79":
                return "Construction";
            case "81":
                return "Consumer Products Mfg";
            case "82":
                return "Consumer Services";
            case "83":
                return "Education";
            case "84":
                return "Electronics";
            case "85":
                return "Energy &amp; Utilities";
            case "86":
                return "Environmental Services";
            case "87":
                return "Financial Services";
            case "88":
                return "Food &amp; Beverage";
            case "89":
                return "Healthcare";
            case "102":
                return "Information Technology";
            case "90":
                return "Industrial Manufacturing";
            case "91":
                return "Insurance";
            case "92":
                return "Media";
            case "93":
                return "Metals &amp; Mining";
            case "94":
                return "Pharmaceuticals";
            case "95":
                return "Real Estate";
            case "96":
                return "Security Products/Service";
            case "100":
                return "Telecommun. Equipment";
            case "99":
                return "Telecommun. Services ";
            case "101":
                return "Transportation Services";

            default:
                return "";
        }
    }

    const getPipelineValue = (id: string) => {
        switch (id) {
            case "32":
                return "0: Human Resources"
            case "1":
                return "0: Inactive"
            case "33":
                return "0: Interviewer"
            case "30":
                return "0: Non-Employer"
            case "9":
                return "1: New Lead"
            case "2":
                return "2: Target"
            case "34":
                return "3: Client"
            case "4":
                return "3: Sendouts"
            case "6":
                return "4: Interviewing"
            case "7":
                return "5: $ Key Account $"
            case "31":
                return "5: Account"
            case "37":
                return "Atlanta Retail"
            case "36":
                return "Boston Retail"
            case "40":
                return "Government Account"
            case "41":
                return "MSP"
            case "42":
                return "National"
            case "35":
                return "Retail Account"
            case "43":
                return "Strategic"
            case "38":
                return "VMS IT"
            case "39":
                return "VMS NON-IT"
            default:
                break;
        }
    }

    const getExchangeValue = (id: string) => {
        switch (id) {
            case "1":
                return "NASDAQ";
            case "2":
                return "NYSE";
            case "3":
                return "AMEX";
            case "4":
                return "TSX";
            default:
                break;
        }
    }



    return (
        <div id="mainDetails">
            <Grid
                container
                direction="row"
                justifyContent="start"
                alignItems="start"
            >
                <Grid sx={{ width: 'calc(100% - 385px)' }}>

                    <Grid
                        container
                        className='customCard'
                        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', paddingBottom: '31px' }}
                    // spacing={2}
                    >

                        <Grid size={6}>
                            <div className='detailsDiv'>
                                <span className='mainLabel'>Active</span>
                                {/* linkLabel */}
                                <span className='valueLabel'>{companyDetailedData.active ? (companyDetailedData.active === "1") ? 'Yes' : "No" : ""}</span>
                            </div>
                            <div className='detailsDiv'>
                                <span className='mainLabel'>Industry</span>
                                <span className='valueLabel'>{companyDetailedData.Category_ID ? industryValue(companyDetailedData.Category_ID) : ""}</span>
                            </div>
                            <div className='detailsDiv'>
                                <span className='mainLabel'>Founding Year </span>
                                <span className='valueLabel'>{companyDetailedData.Established ? companyDetailedData.Established : ""}</span>
                            </div>
                            <div className='detailsDiv'>
                                <span className='mainLabel'>Revenue</span>
                                <span className='valueLabel'>{companyDetailedData.revenue ? companyDetailedData.revenue : ""}</span>
                            </div>
                            <div className='detailsDiv'>
                                <span className='mainLabel'>Pipeline Status</span>
                                <span className='valueLabel'>{companyDetailedData.CompanyStatus_ID ? getPipelineValue(companyDetailedData.CompanyStatus_ID) : ""}</span>
                            </div>
                            <div className='detailsDiv'>
                                <span className='mainLabel'>SIC</span>
                                <span className='valueLabel'>{companyDetailedData.SIC ? companyDetailedData.SIC : ""}</span>
                            </div>
                        </Grid>
                        <Grid size={6}>
                            {/* <div className='detailsDiv'>
                                <span className='mainLabel'>Account Stage</span>
                                <span className='badge'>Cold</span>
                            </div> */}
                            <div className='detailsDiv'>
                                <span className='mainLabel'>Bulk</span>
                                <span className='valueLabel'>{companyDetailedData.chkNoBulk ? (companyDetailedData.chkNoBulk === "1") ? 'Yes' : "No" : ""}</span>
                            </div>
                            <div className='detailsDiv'>
                                <span className='mainLabel'>Employees</span>
                                <span className='valueLabel'>{companyDetailedData.num_employ ? companyDetailedData.num_employ : ""}</span>
                            </div>
                            <div className='detailsDiv'>
                                <span className='mainLabel'>Exchange</span>
                                <span className='valueLabel'>{companyDetailedData.echange ? getExchangeValue(companyDetailedData.echange) : ""}</span>
                            </div>
                            <div className='detailsDiv'>
                                <span className='mainLabel'>Symbol</span>
                                <span className='valueLabel'>{companyDetailedData.tradeSymbol ? companyDetailedData.tradeSymbol : ""}</span>
                            </div>
                            <div className='detailsDiv'>
                                <span className='mainLabel'>User Agency</span>
                                <span className='valueLabel'>{companyDetailedData.chkAgency ? (companyDetailedData.chkAgency === "1") ? 'Yes' : "No" : ""}</span>
                            </div>
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        className='customCard companyDetails'
                        sx={{
                            flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 500,
                            border: '1px solid #eee',
                            paddingLeft: '0'
                        }}
                    >
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"

                            scrollButtons={false}
                            value={selectedTabIndex}
                            onChange={handleVerticalTabChange}
                            aria-label="Vertical tabs example"


                            TabIndicatorProps={{ style: { display: 'none' } }}
                            sx={{

                                borderRight: 1, borderColor: 'divider',
                                '& .Mui-selected': {
                                    borderLeft: '2px solid var(--c-primary-color)',
                                    borderTop: '1px solid #e3e3e5',
                                    borderBottom: '1px solid #e3e3e5',
                                    '--color': 'var(--c-primary-color)',
                                    padding: '14px 16px',
                                    width: '200px',
                                    textDecoration: 'none',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    lineHeight: '20px',


                                },
                            }}
                        >
                            <Tab
                                className="vertical-menu-item" label="Overview" {...verticalTabPanelProps(0)} />
                            <Tab
                                className="vertical-menu-item"
                                label="Direct Hire free Agreement"
                                {...verticalTabPanelProps(1)} />
                            <Tab
                                className="vertical-menu-item"
                                label=" MSP Program Information"
                                {...verticalTabPanelProps(2)} />

                            {/* <Tab
                                className="vertical-menu-item"
                                label={
                                    <div> */}
                            {/* <NewspaperIcon
                                            style={{ verticalAlign: 'middle', fontSize: '18px' }}
                                        /> */}

                            {/* </div>
                                }
                            /> */}

                            <Tab
                                className="vertical-menu-item"
                                label="Alerts and Notifications"
                                {...verticalTabPanelProps(3)}
                            />
                            {/* <Tab
                                className="vertical-menu-item"
                                label="Notes"
                                {...verticalTabPanelProps(4)}
                            /> */}

                        </Tabs>

                        <VerticalTabPanel value={selectedTabIndex} index={0}>
                            <div className='w-100'>
                                <Grid container direction="row" justifyContent="start" alignItems="center" >
                                    <div className='labelDiv'>
                                        <div className='mainLabel'>Owner</div>
                                        <div className='valueLabel'>
                                            {(companyDetailedData.enterby) ? companyDetailedData.enterby : ""}
                                        </div>
                                    </div>
                                    <div className='labelDiv'>
                                        <div className='mainLabel'>Main Phone</div>
                                        <div className='valueLabel'>
                                            {Number(companyDetailedData.phone) ? Number(companyDetailedData.phone) : ""}
                                        </div>
                                    </div>
                                </Grid>
                                <Grid container direction="row" justifyContent="start" alignItems="center" >
                                    <div className='labelDiv'>
                                        <div className='mainLabel'>Alternative Phone 1</div>
                                        <div className='valueLabel'>
                                            {Number(companyDetailedData.phone2) ? Number(companyDetailedData.phone2) : ""}
                                        </div>
                                    </div>
                                    <div className='labelDiv'>
                                        <div className='mainLabel'>Alternative Phone 2</div>
                                        <div className='valueLabel'>
                                            {Number(companyDetailedData.phone2_area) ? Number(companyDetailedData.phone2_area) : ""}
                                        </div>
                                    </div>
                                </Grid>
                                <Grid container direction="row" justifyContent="start" alignItems="center" >
                                    <div className='labelDiv'>
                                        <div className='mainLabel'>Fax</div>
                                        <div className='valueLabel'>
                                            {(companyDetailedData.fax) ? companyDetailedData.fax : ""}
                                        </div>
                                    </div>
                                    <div className='labelDiv'>
                                        <div className='mainLabel'>State or Prov</div>
                                        <div className='valueLabel'>
                                            {(companyDetailedData.city) ? companyDetailedData.city + ", " : ""}
                                            {(companyDetailedData.state) ? companyDetailedData.state : ""}
                                        </div>
                                    </div>
                                </Grid>
                                <Grid container direction="row" justifyContent="start" alignItems="center" >
                                    <div className='labelDiv'>
                                        <div className='mainLabel'>Postal Code</div>
                                        <div className='valueLabel'>
                                            {(companyDetailedData.zip) ? companyDetailedData.zip : ""}
                                        </div>
                                    </div>
                                    <div className='labelDiv'>
                                        <div className='mainLabel'>Country/Locale</div>
                                        <div className='valueLabel'>
                                            {(companyDetailedData.Locale) ? companyDetailedData.Locale : ""}
                                        </div>
                                    </div>
                                </Grid>
                                <Grid container direction="row" justifyContent="start" alignItems="center" >
                                    <div className='labelDiv'>
                                        <div className='mainLabel'>Web</div>
                                        <div className='valueLabel'>
                                            {(companyDetailedData.web) ? companyDetailedData.web : ""}
                                        </div>
                                    </div>
                                </Grid>
                            </div>
                        </VerticalTabPanel>
                        {/* <VerticalTabPanel value={selectedTabIndex} index={1}>
                            <div className='w-100'>
                                <Grid container direction="row" justifyContent="start" alignItems="center" >
                                    <div className='labelDiv'>
                                        <div className='mainLabel'>Active</div>
                                        <div className='valueLabel'>
                                            {companyDetailedData.active ? (companyDetailedData.active === "1") ? 'Yes' : "No" : ""}
                                        </div>
                                    </div>
                                    <div className='labelDiv'>
                                        <div className='mainLabel'>Pipeline status</div>
                                        <div className='valueLabel'>
                                            {companyDetailedData.CompanyStatus_ID ? getPipelineValue(companyDetailedData.CompanyStatus_ID) : ""}
                                        </div>
                                    </div>
                                </Grid>
                                <Grid container direction="row" justifyContent="start" alignItems="center" >
                                    <div className='labelDiv'>
                                        <div className='mainLabel'>Industry</div>
                                        <div className='valueLabel'>
                                            {companyDetailedData.Category_ID ? industryValue(companyDetailedData.Category_ID) : ""}
                                        </div>
                                    </div>
                                    <div className='labelDiv'>
                                        <div className='mainLabel'>SIC</div>
                                        <div className='valueLabel'>
                                            {companyDetailedData.SIC ? companyDetailedData.SIC : ""}
                                        </div>
                                    </div>
                                </Grid>
                                <Grid container direction="row" justifyContent="start" alignItems="center" >
                                    <div className='labelDiv'>
                                        <div className='mainLabel'>Yr Started</div>
                                        <div className='valueLabel'>
                                            {companyDetailedData.Established ? companyDetailedData.Established : ""}
                                        </div>
                                    </div>
                                    <div className='labelDiv'>
                                        <div className='mainLabel'>ChkNobulk</div>
                                        <div className='valueLabel'>
                                            {companyDetailedData.chkNoBulk ? (companyDetailedData.chkNoBulk === "1") ? 'Yes' : "No" : ""}
                                        </div>
                                    </div>
                                </Grid>
                                <Grid container direction="row" justifyContent="start" alignItems="center" >
                                    <div className='labelDiv'>
                                        <div className='mainLabel'>Employees</div>
                                        <div className='valueLabel'>
                                            {companyDetailedData.num_employ ? companyDetailedData.num_employ : ""}
                                        </div>
                                    </div>
                                    <div className='labelDiv'>
                                        <div className='mainLabel'>Revenue</div>
                                        <div className='valueLabel'>
                                            {companyDetailedData.revenue ? companyDetailedData.revenue : ""}
                                        </div>
                                    </div>
                                </Grid>
                                <Grid container direction="row" justifyContent="start" alignItems="center" >
                                    <div className='labelDiv'>
                                        <div className='mainLabel'>Exchange</div>
                                        <div className='valueLabel'>
                                            {companyDetailedData.echange ? getExchangeValue(companyDetailedData.echange) : ""}
                                        </div>
                                    </div>
                                    <div className='labelDiv'>
                                        <div className='mainLabel'>Symbol</div>
                                        <div className='valueLabel'>
                                            {companyDetailedData.tradeSymbol ? companyDetailedData.tradeSymbol : ""}
                                        </div>
                                    </div>
                                </Grid>
                                <Grid container direction="row" justifyContent="start" alignItems="center" >
                                    <div className='labelDiv'>
                                        <div className='mainLabel'>User Agency</div>
                                        <div className='valueLabel'>
                                            {companyDetailedData.chkAgency ? (companyDetailedData.chkAgency === "1") ? 'Yes' : "No" : ""}
                                        </div>
                                    </div>
                                </Grid>
                            </div>

                        </VerticalTabPanel> */}
                        <VerticalTabPanel value={selectedTabIndex} index={1}>
                            <div className='w-100'>
                                <Grid container direction="row" justifyContent="start" alignItems="center" >
                                    <div className='labelDiv'>
                                        <div className='mainLabel'>Sent</div>
                                        <div className='valueLabel'>

                                        </div>
                                    </div>
                                    <div className='labelDiv'>
                                        <div className='mainLabel'>Recieved</div>
                                        <div className='valueLabel'>
                                            {/* {(companyData.companyName) ? companyData.companyName : ""} */}
                                        </div>
                                    </div>
                                </Grid>
                                <Grid container direction="row" justifyContent="start" alignItems="center" >
                                    <div className='labelDiv'>
                                        <div className='mainLabel'>% Fee</div>
                                        <div className='valueLabel'>
                                            {/* {(companyDetailedData.enterby) ? companyDetailedData.enterby : ""} */}
                                        </div>
                                    </div>
                                    <div className='labelDiv'>
                                        <div className='mainLabel'>Flat free</div>
                                        <div className='valueLabel'>
                                            {String(companyDetailedData.feeflat) ? String(companyDetailedData.feeflat) : ""}
                                        </div>
                                    </div>
                                </Grid>
                                <Grid container direction="row" justifyContent="start" alignItems="center" width="auto" >
                                    <div className='labelDiv'>
                                        <div className='mainLabel'>Guarantee information</div>
                                        <div className='valueLabel'>
                                            {String(companyDetailedData.fee_guarn) ? String(companyDetailedData.fee_guarn) : ""}
                                        </div>
                                    </div>
                                    <div className='labelDiv'>
                                        <div className='mainLabel'>Terms</div>
                                        <div className='valueLabel'>
                                            {String(companyDetailedData.fee_terms) ? String(companyDetailedData.fee_terms) : ""}
                                        </div>
                                    </div>
                                </Grid>
                                <Grid container direction="row" justifyContent="start" alignItems="center" >
                                    <div className='labelDiv'>
                                        <div className='mainLabel'>Date Establishment</div>
                                        <div className='valueLabel'>
                                            {(companyDetailedData.Established) ? companyDetailedData.Established : ""}
                                        </div>
                                    </div>
                                    <div className='labelDiv'>
                                        <div className='mainLabel'>Expiry Date</div>
                                        <div className='valueLabel'>
                                            {(companyDetailedData.ExpireDate) ? companyDetailedData.ExpireDate : ""}

                                        </div>
                                    </div>
                                </Grid>
                                <Grid container direction="row" justifyContent="start" alignItems="center" >
                                    <div className='labelDiv'>
                                        <div className='mainLabel'>Primary Contact</div>
                                        <div className='valueLabel'>
                                            {/* {(companyDetailedData.zip) ? companyDetailedData.zip : ""} */}
                                        </div>
                                    </div>
                                    {/* <div className='labelDiv'>
                                        <div className='mainLabel'>Country/Locale</div>
                                        <div className='valueLabel'>
                                            {(companyDetailedData.Locale) ? companyDetailedData.Locale : ""}
                                        </div>
                                    </div> */}
                                </Grid>
                                {/* <Grid container direction="row" justifyContent="start" alignItems="center" >
                                    <div className='labelDiv'>
                                        <div className='mainLabel'>Web</div>
                                        <div className='valueLabel'>
                                            {(companyDetailedData.web) ? companyDetailedData.web : ""}
                                        </div>
                                    </div>
                                </Grid> */}
                            </div>
                        </VerticalTabPanel>

                        <VerticalTabPanel value={selectedTabIndex} index={2}>
                            {/* <MSPProgramInformation /> */}
                            <div className='w-100'>
                                <Grid container direction="row" justifyContent="start" alignItems="center" >
                                    <div className='labelDiv'>
                                        <div className='mainLabel'>MSP</div>
                                        <div className='valueLabel'>

                                        </div>
                                    </div>
                                    <div className='labelDiv'>
                                        <div className='mainLabel'>Program Sponsor</div>
                                        <div className='valueLabel'>
                                            {/* {(companyData.companyName) ? companyData.companyName : ""} */}
                                        </div>
                                    </div>
                                </Grid>
                                <Grid container direction="row" justifyContent="start" alignItems="center" >
                                    <div className='labelDiv'>
                                        <div className='mainLabel'>Diversity Contact</div>
                                        <div className='valueLabel'>
                                            {/* {(companyDetailedData.enterby) ? companyDetailedData.enterby : ""} */}
                                        </div>
                                    </div>
                                </Grid>
                                <Typography >Program Team</Typography>
                                <Grid container direction="row" justifyContent="start" alignItems="center" width="auto" >
                                    <div className='labelDiv'>
                                        <div className='mainLabel'>Name:</div>
                                        <div className='valueLabel'>
                                            {/* {String(companyDetailedData.fee_guarn) ? String(companyDetailedData.fee_guarn) : ""} */}
                                        </div>
                                    </div>
                                    <div className='labelDiv'>
                                        <div className='mainLabel'>Role:</div>
                                        <div className='valueLabel'>
                                            {/* {String(companyDetailedData.fee_terms) ? String(companyDetailedData.fee_terms) : ""} */}
                                        </div>
                                    </div>
                                </Grid>
                            </div>
                        </VerticalTabPanel>
                        <VerticalTabPanel value={selectedTabIndex} index={3}>
                            {/* <AlertsAndNotifications /> */}
                            <div className='w-100'>
                                <Grid container direction="row" justifyContent="start" alignItems="center" >
                                    <div className='labelDiv'>
                                        <div className='mainLabel'>Create email notification when a new job is created</div>
                                        <div className='valueLabel'>

                                        </div>
                                    </div>
                                    <div className='labelDiv'>
                                        <div className='mainLabel'>Create email notification when there is a status update on the job</div>
                                        <div className='valueLabel'>
                                            {/* {(companyData.companyName) ? companyData.companyName : ""} */}
                                        </div>
                                    </div>
                                </Grid>
                                <Typography>Send Email To</Typography>
                                <Grid container direction="row" justifyContent="start" alignItems="center" >

                                    <div className='labelDiv'>
                                        <div className='mainLabel'>All Users</div>
                                        <div className='valueLabel'>
                                            {/* {String(companyDetailedData.feeflat) ? String(companyDetailedData.feeflat) : ""}*/}
                                        </div>
                                    </div>
                                    <div className='labelDiv'>
                                        <div className='mainLabel'>Custom Users</div>
                                        <div className='valueLabel'>
                                            {/*  {String(companyDetailedData.fee_guarn) ? String(companyDetailedData.fee_guarn) : ""}*/}
                                        </div>
                                    </div>
                                </Grid>
                            </div>
                        </VerticalTabPanel>

                        {/* <VerticalTabPanel value={selectedTabIndex} index={4}>
                            <Notes />
                        </VerticalTabPanel> */}

                    </Grid>



                </Grid>
                <Grid
                    sx={{ width: 385 }}>
                    {/* <CompanyActivites /> */}
                    {
                        (companyData.companyName) ?
                            <Activities note={true} componentFrom='company' activities={false} companyNotes={[{ notes: companyDetailedData.description }]} />
                            :
                            null
                    }
                </Grid>
            </Grid>
        </div>
    );
}

export default MainDetails;