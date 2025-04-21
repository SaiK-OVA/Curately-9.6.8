import { SyntheticEvent, useState } from '../../../../../../shared/modules/React';
import { DateTime } from '../../../../../../shared/modules/Luxon';
import { Box } from '../../../../../../shared/modules/MaterialImports/Box';
import { Grid } from '../../../../../../shared/modules/MaterialImports/Grid';
import './Overview.scss';
// import Divider from '@mui/material/Divider';
import { Typography } from '../../../../../../shared/modules/MaterialImports/Typography';
import USPhoneFormat from '../../../../../../shared/utils/USPhoneFormat';

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

export interface overViewProps {
    canData: any
}

const Overview = ({ canData }: overViewProps) => {
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const overviewData = canData ? canData : {};
    // console.log(overviewData)

    const handleVerticalTabChange = (event: SyntheticEvent, newValue: number) => {
        setSelectedTabIndex(newValue);
    };

    return (
        (<div id='candidateOverview'>
            <Grid
                container
                className='customCard companyDetails p-0'
                sx={{ bgcolor: 'background.paper', height: 500 }}
            >
                {
                    overviewData ?
                        <div style={{ display: 'flex', width: '100%' }}>
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
                                    className="vertical-menu-item" label="Profile" {...verticalTabPanelProps(0)} />
                                <Tab
                                    className="vertical-menu-item"
                                    label="Personal Data"
                                    {...verticalTabPanelProps(1)} />
                                <Tab
                                    className="vertical-menu-item"
                                    label="Summary"
                                    {...verticalTabPanelProps(2)} />
                                <Tab
                                    className="vertical-menu-item"
                                    label="Education"
                                    {...verticalTabPanelProps(3)}
                                />
                                <Tab
                                    className="vertical-menu-item"
                                    label="Experience"
                                    {...verticalTabPanelProps(3)}
                                />

                            </Tabs>

                            <VerticalTabPanel value={selectedTabIndex} index={0}>
                                <div className='w-100'>
                                    <Grid container direction="row" justifyContent="start" alignItems="baseline" >
                                        <div className='labelDiv'>
                                            <div className='mainLabel'>Active</div>
                                            <div className='valueLabel'>
                                                { }
                                            </div>
                                        </div>
                                        <div className='labelDiv'>
                                            <div className='mainLabel'>Employee</div>
                                            <div className='valueLabel'>

                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid container direction="row" justifyContent="start" alignItems="baseline" >
                                        <div className='labelDiv'>
                                            <div className='mainLabel'>Referred By/ Source Notes</div>
                                            <div className='valueLabel'>

                                            </div>
                                        </div>
                                        <div className='labelDiv'>
                                            <div className='mainLabel'>Specific Job Title Sought</div>
                                            <div className='valueLabel'>

                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid container direction="row" justifyContent="start" alignItems="baseline" >
                                        <div className='labelDiv'>
                                            <div className='mainLabel'>Candidate Status</div>
                                            <div className='valueLabel'>

                                            </div>
                                        </div>
                                        <div className='labelDiv'>
                                            <div className='mainLabel'>Source</div>
                                            <div className='valueLabel'>

                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid container direction="row" justifyContent="start" alignItems="baseline" >
                                        <div className='labelDiv'>
                                            <div className='mainLabel'>Default/ Current Resume</div>
                                            <div className='valueLabel'>

                                            </div>
                                        </div>
                                        <div className='labelDiv'>
                                            <div className='mainLabel'>	Available To Start</div>
                                            <div className='valueLabel'>

                                            </div>
                                        </div>
                                    </Grid>
                                </div>
                            </VerticalTabPanel>
                            <VerticalTabPanel value={selectedTabIndex} index={1}>
                                <div className='w-100'>
                                    <Grid container direction="row" justifyContent="start" alignItems="baseline" >
                                        <div className='labelDiv'>
                                            <div className='mainLabel'>Primary Email</div>
                                            <div className='valueLabel'>
                                                {overviewData?.email ? overviewData?.email : ""}
                                            </div>
                                        </div>
                                        <div className='labelDiv'>
                                            <div className='mainLabel'>Secondary Email</div>
                                            <div className='valueLabel'>
                                                {overviewData?.email2 ? overviewData?.email2 : ""}
                                            </div>
                                        </div>
                                    </Grid>

                                    <Grid container direction="row" justifyContent="start" alignItems="baseline" width="auto" >
                                        <div className='labelDiv'>
                                            <div className='mainLabel'>Linked in Profile</div>
                                            <div className='valueLabel'>

                                            </div>
                                        </div>
                                        <div className='labelDiv'>
                                            <div className='mainLabel'>Landline</div>
                                            <div className='valueLabel'>
                                                {overviewData?.homePhone ? overviewData?.homePhone : ""}
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid container direction="row" justifyContent="start" alignItems="baseline" >
                                        <div className='labelDiv'>
                                            <div className='mainLabel'>Landline2</div>
                                            <div className='valueLabel'>
                                                {overviewData?.homePhone2 ? overviewData?.homePhone2 : ""}
                                            </div>
                                        </div>
                                        <div className='labelDiv'>
                                            <div className='mainLabel'>Cell Phone</div>
                                            <div className='valueLabel'>
                                                {overviewData?.cellPhone ? USPhoneFormat.get(overviewData?.cellPhone) : ""}
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid container direction="row" justifyContent="start" alignItems="baseline" >
                                        <div className='labelDiv'>
                                            <div className='mainLabel'>Cell Phone2</div>
                                            <div className='valueLabel'>
                                                {overviewData?.cellPhone2 ?USPhoneFormat.get (overviewData?.cellPhone2) : ""}
                                            </div>
                                        </div>
                                        <div className='labelDiv'>
                                            <div className='mainLabel'>Invalid Phone</div>
                                            <div className='valueLabel'>

                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid container direction="row" justifyContent="start" alignItems="baseline" >
                                        <div className='labelDiv'>
                                            <div className='mainLabel'>Invalid Phone2</div>
                                            <div className='valueLabel'>

                                            </div>
                                        </div>
                                        <div className='labelDiv'>
                                            <div className='mainLabel'>Invalid Phone3</div>
                                            <div className='valueLabel'>

                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid container direction="row" justifyContent="start" alignItems="baseline" >
                                        <div className='labelDiv'>
                                            <div className='mainLabel'>Email3</div>
                                            <div className='valueLabel'>

                                            </div>
                                        </div>
                                        <div className='labelDiv'>
                                            <div className='mainLabel'>Pager</div>
                                            <div className='valueLabel'>

                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid container direction="row" justifyContent="start" alignItems="baseline" >
                                        <div className='labelDiv'>
                                            <div className='mainLabel'>Home FAX</div>
                                            <div className='valueLabel'>

                                            </div>
                                        </div>
                                        <div className='labelDiv'>
                                            <div className='mainLabel'>Street Address</div>
                                            <div className='valueLabel'>
                                                {overviewData?.street ? overviewData?.street : ""}
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid container direction="row" justifyContent="start" alignItems="baseline" >
                                        <div className='labelDiv'>
                                            <div className='mainLabel'>City</div>
                                            <div className='valueLabel'>
                                                {overviewData?.city ? overviewData?.city : ""}
                                            </div>
                                        </div>
                                        <div className='labelDiv'>
                                            <div className='mainLabel'>State or Prov.</div>
                                            <div className='valueLabel'>
                                                {overviewData?.state ? overviewData?.state : ""}
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid container direction="row" justifyContent="start" alignItems="baseline" >
                                        <div className='labelDiv'>
                                            <div className='mainLabel'>Zip Code</div>
                                            <div className='valueLabel'>
                                                {overviewData?.zip ? overviewData?.zip : ""}
                                            </div>
                                        </div>
                                        <div className='labelDiv'>
                                            <div className='mainLabel'>Country/Locale</div>
                                            <div className='valueLabel'>

                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid container direction="row" justifyContent="start" alignItems="baseline" >
                                        <div className='labelDiv'>
                                            <div className='mainLabel'>Region</div>
                                            <div className='valueLabel'>

                                            </div>
                                        </div>
                                        <div className='labelDiv'>
                                            <div className='mainLabel'>SSN</div>
                                            <div className='valueLabel'>

                                            </div>
                                        </div>
                                    </Grid>
                                </div>
                            </VerticalTabPanel>

                            <VerticalTabPanel value={selectedTabIndex} index={2}>
                                <div className='w-100'>
                                    <Grid container direction="row" justifyContent="start" alignItems="baseline" >
                                        <div className='labelDiv w-100'>
                                            <div className='mainLabel'>Summary</div>
                                            <div className='valueLabel'>
                                                {overviewData?.summary ? overviewData?.summary : ""}
                                            </div>
                                        </div>
                                    </Grid>
                                </div>
                            </VerticalTabPanel>
                            <VerticalTabPanel value={selectedTabIndex} index={3}>
                                <div className='w-100'>
                                    {overviewData?.phd &&
                                        <div className='historyBlock'>
                                            <Typography variant='h5'>{overviewData?.phd ? overviewData?.phd : ""}</Typography>
                                            <Typography>{overviewData?.phddeg ? overviewData?.phddeg : ""}</Typography>
                                            <Typography>{overviewData?.phdmajor ? overviewData?.phdmajor : ""}</Typography>
                                            <Typography component='span'>{(overviewData?.phdyear && overviewData?.phdyear !== "0") ? "/ " + overviewData?.phdyear : ""}</Typography>
                                        </div>
                                    }

                                    {overviewData?.ms &&
                                        <div className='historyBlock'>
                                            <Typography variant='h5'>{overviewData?.ms ? overviewData?.ms : ""}</Typography>
                                            <Typography>{overviewData?.msdeg ? overviewData?.msdeg : ""}</Typography>
                                            <Typography>{overviewData?.msmajor ? overviewData?.msmajor : ""}</Typography>
                                            <Typography component='span'>{(overviewData?.msyear && overviewData?.msyear !== "0") ? "/ " + overviewData?.msyear : ""}</Typography>
                                        </div>
                                    }

                                    {overviewData?.bs &&
                                        <div className='historyBlock'>
                                            <Typography variant='h5'>{overviewData?.bs ? overviewData?.bs : ""}</Typography>
                                            <Typography>{overviewData?.bsdeg ? overviewData?.bsdeg : ""}</Typography>
                                            <Typography>{overviewData?.bsmajor ? overviewData?.bsmajor : ""}</Typography>
                                            <Typography component='span'>{(overviewData?.bsyear && overviewData?.bsyear !== "0") ? "/ " + overviewData?.bsyear : ""}</Typography>
                                        </div>
                                    }
                                </div>
                            </VerticalTabPanel>

                            <VerticalTabPanel value={selectedTabIndex} index={4}>
                                <div className='w-100'>
                                    {overviewData?.workHistory?.map((work: any, i: number) => (
                                        <div key={i}>
                                            <div className='historyBlock'>
                                                <Typography variant='h5'>{work.companyName ? work.companyName.replace(/\\|\//g, ' ') : ""}</Typography>
                                                <Typography>{work.jobTitle ? work.jobTitle.replace(/\\|\//g, ' ') : ""}</Typography>
                                                <Typography component='span'>
                                                    {work.startDate && DateTime.fromFormat(work.startDate.substring(0, 7), 'yyyy-MM').isValid ? DateTime.fromFormat(work.startDate.substring(0, 7), 'yyyy-MM').toFormat('MMM yyyy') : ""}
                                                    {work.startDate && DateTime.fromFormat(work.startDate.substring(0, 7), 'yyyy-MM').isValid && work.endDate && DateTime.fromFormat(work.endDate.substring(0, 7), 'yyyy-MM').isValid ? " to " : ""}
                                                    {work.endDate && DateTime.fromFormat(work.endDate.substring(0, 7), 'yyyy-MM').isValid ? DateTime.fromFormat(work.endDate.substring(0, 7), 'yyyy-MM').toFormat('MMM yyyy') : ""}
                                                </Typography>

                                                {/* <Typography component='span'>{work.startDate ? work.startDate : ""} to {work.endDate ? work.endDate : ""}</Typography> */}
                                            </div>
                                        </div>
                                    ))}


                                </div>
                            </VerticalTabPanel>
                        </div>
                        : null
                }
            </Grid>
        </div>)
    );
}

export default Overview;