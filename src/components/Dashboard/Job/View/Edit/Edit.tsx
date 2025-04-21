
import { React, useEffect, useState } from '../../../../../shared/modules/React';
// import Typography from '@mui/material/Typography';
// import ApiRequests from '../../../../../shared/api/api';
import {Grid} from '../../../../../shared/modules/MaterialImports/Grid';
import {Tabs, Tab} from '../../../../../shared/modules/MaterialImports/Tabs';
import {Box} from "../../../../../shared/modules/MaterialImports/Box";


import './Edit.scss'
// import Editor from '../../../../shared/EmailDialogBox/EmailBody';
import { useParams } from 'react-router';
// import { userLocalData } from '../../../../../shared/services/userData';
// import { date } from 'yup';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            className={`vertical-tabpanel`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
            style={{ flex: 1 }}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const Edit = (
    { masterJobData }: { masterJobData: any }
) => {

    const [value, setValue] = useState(0);
    const [data, setData] = useState<any>([])
    // const [publicDescription, setPublicDescription] = useState('');
    // const [originalDescription, setOriginalDescription] = useState('');
    const { jobId } = useParams();
    useEffect(() => {

        // ApiRequests.getByParams(193, '/Jobs/job_details.jsp', {
        //     jobId: jobId,
        //     userName: userLocalData.getvalue('userName'),
        //     userId: userLocalData.getvalue('recrId')
        // })
        //     .then((response) => {
        console.log(masterJobData)
        setData(masterJobData);
        const typeValue = masterJobData?.Details?.rdjobtype;
        const getCompensationValue = (typeValue: string) => {

            switch (typeValue) {

                case "0":

                    return 'Direct Hire';

                case "1":

                    return 'Contract';

                default:

                    return 'Freelancer';

            }

        }
        let typeLabel = getCompensationValue(typeValue);

        const typePriorityPath = masterJobData?.Details?.Priority;

        const getTypePriorityLabel = (typePriorityPath: string) => {
            switch (typePriorityPath) {
                case '0':
                    return 'none';
                case 'D':
                    return 'A+';
                case 'A':
                    return 'A';
                case 'B':
                    return 'B';
                case 'E':
                    return 'C';
                case 'C':
                    return 'Covered';
                case 'G':
                    return 'FYI';
                case 'H':
                    return 'Hot';
                case 'N':
                    return 'new';
                case 'F':
                    return 'Forecasted';
                case 'I':
                    return 'Interviewing';
                default:
                    return 'not available';
            }
        };


        let typePriority = getTypePriorityLabel(typePriorityPath);
        const getTypeJobCategory = (typeTypejobCategory: string) => {
            switch (typeTypejobCategory) {
                case "37":
                    return "call center";
                case "492":
                    return "Clinical";
                case "491":
                    return "Creative Marketing";
                case "39":
                    return "Engineering";
                case "494":
                    return "Health IT";
                case "493":
                    return "Healthcare";
                case "58":
                    return "Human Resources";
                case "102":
                    return "Industrial";
                case "59":
                    return "Information Technology";
                case "497":
                    return "Lab";
                case "63":
                    return "Legal";
                case "498":
                    return "Pharma";
                case "496":
                    return "Professional";
                case "72":
                    return "Sales";
                case "103":
                    return "Scientific";
                case "495":
                    return "Supply Chain";
                default:
                    return "not available";
            }
        };

        const typeTypejobCategory = masterJobData?.Details?.txtJobCategory;
        let typeJobCategory = getTypeJobCategory(typeTypejobCategory);




        console.log(typePriority);

        setData({


            //job details
            jobTitle: String(masterJobData?.Details?.txtJobTitle),
            primaryRecruiter: String(masterJobData?.Details?.primaryrec),
            recruiter: String(masterJobData?.Details?.txtJobRecruiter),
            AccountManager: String(masterJobData?.Details?.txtJobAcManager),
            JobCategory: String(typeJobCategory),
            NotWorking: String(masterJobData?.Details?.chkNotworking === "0" ? "No" : "Yes"),
            Reason: String(), // need to add
            SimilarJobs: String(masterJobData?.Details?.SimilarJobs),

            FilledBy: String(), //api values needed
            Closed: String(masterJobData?.Details?.chkClosed === "0" ? "No" : "Yes"),
            RelationshipType: String(), //not getting value from api

            PipelineStatus: String(), // need to add
            Priority: String(typePriority),

            //Requirement details

            RequisitionTitle: String(masterJobData?.Details?.txtReqTitle),
            Requisition: String(masterJobData?.Details?.txtJobRequistion
            ),
            CostCenterNumber: String(),
            BusinessUnit: String(),
            HiringManager: String(masterJobData?.Details?.txtContname),
            NoOfPositions: String(),
            PositionDuration: String(masterJobData?.Details?.txtJobTerm),
            MSPCoordinator: String(),
            PartTime: String(),
            StartDate: String(masterJobData?.Details?.txtDateenter),
            EstEndDate: String(masterJobData?.Details?.txtEndDate),
            SubmissionsAllowed: String(masterJobData?.Details?.Num5),
            //response.data.Details
            //job description

            //location
            RemoteJob: String(masterJobData?.othercolumns?.chkRemote === "0" ? 'No' : 'Yes'),
            StreetAddress: String(masterJobData?.Details?.txtJobStreetAddress),
            JobCity: String(masterJobData?.Details?.txtJobCity),
            OriginalJobDescription: String(),
            StateOrPro: String(),
            JobPostalCode: String(masterJobData?.Details?.txtJobPostal),
            AreaCode: String(),
            CountryLocale: String(),
            JobRegion: String(masterJobData?.Details?.txtJobCountry),
            Travel: String(),

            //compensation

            Freelancer: String(typeLabel),
            PayRange: String(),
            PayType: String(),
            DirectHire: String(typeLabel),
            Contract: String(typeLabel),
            BillRate: String(),
            PayRate: String(),




        });


        //         })
        //         .catch((error) => {
        //             console.error('Error fetching Sourced Count:', error);
        //         })
    }, [jobId]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <div>

            <Box
                sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
            >

                <Grid
                    container
                    className='customCard py-0 '
                    sx={{
                        border: '1px solid #eee',
                        paddingLeft: '0'
                    }}
                >
                    <div>
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            onChange={handleChange}
                            aria-label="View Company Tabs"

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
                                }
                            }}
                        >
                            <Tab className='vertical-menu-item' label="Job Details" {...a11yProps(0)} />
                            <Tab className='vertical-menu-item' label="Job Description" {...a11yProps(1)} />
                            <Tab className='vertical-menu-item' label="Requirement Details" {...a11yProps(2)} />
                            <Tab className='vertical-menu-item' label="Location" {...a11yProps(3)} />
                            <Tab className='vertical-menu-item' label="Compensation" {...a11yProps(4)} />
                        </Tabs>
                    </div>
                    <TabPanel value={value} index={0}>
                        <Grid container className='' sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}>


                            <Grid size={6}>


                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Company Name*</span>
                                    <span className='valueLabel'></span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Job Title*</span>
                                    <span className='valueLabel'>{data.jobTitle}</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Recruiter *</span>
                                    <span className='valueLabel'>long text</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Select Primary Recruiter *</span>
                                    <span className='valueLabel'>{data.primaryRecruiter}</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Account Manager</span>
                                    <span className='valueLabel'>{data.AccountManager}</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Job Category *</span>
                                    <span className='valueLabel'>{data.JobCategory}</span>
                                </div>
                            </Grid>
                            <Grid size={6}>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Not Working</span>
                                    <span className='valueLabel'>{data.NotWorking}</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Reason</span>
                                    <span className='valueLabel'></span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Similar Jobs</span>
                                    <span className='valueLabel'>{data.SimilarJobs}</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Filled By</span>
                                    <span className='valueLabel'></span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Closed</span>
                                    <span className='valueLabel'>{data.Closed}</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Relationship Type</span>
                                    <span className='valueLabel'></span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Pipeline Status</span>
                                    <span className='valueLabel'>Open</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Priority</span>
                                    <span className='valueLabel'>{data.Priority}</span>
                                </div>
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Grid container className='' sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}>
                            <Grid size={12}>
                                <Grid sx={{ width: '100%', maxWidth: '100%' }}>
                                    <div className=''>
                                        <span className='mainLabel w-100'>Public Job Description *</span>
                                        <div className='customCard jobDescriptiontab'>

                                            <div dangerouslySetInnerHTML={{ __html: masterJobData?.Job[0]?.publicJobDescr }}></div>

                                        </div>
                                        {/* <Editor
                                            toolbarId='publicDescription'
                                            placeholder='Public Description'
                                            id='publicDescription'
                                            handleChange={(e: any) => {
                                                setPublicDescription(e);
                                            }}
                                            editorHtml={publicDescription}
                                            mentions={false}
                                            saveTemplate={false}
                                        /> */}
                                    </div>
                                    <div className=''>
                                        <span className='mainLabel w-100'>Original Job Description *</span>
                                        <div className='customCard jobDescriptiontab'>

                                            <div dangerouslySetInnerHTML={{ __html: masterJobData?.Job[0]?.interJobDescr }}></div>

                                        </div>

                                        {/* <Editor
                                            toolbarId='originalDescription'
                                            placeholder='Original Description'
                                            id='originalDescription'
                                            handleChange={(e: any) => {
                                                setPublicDescription(e);
                                            }}
                                            editorHtml={originalDescription}
                                            mentions={false}
                                            saveTemplate={false}
                                        /> */}
                                    </div>
                                </Grid>
                            </Grid>
                            {/* <Grid size={6}>


                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Company Name*</span>
                                    <span className='valueLabel'>vali company 002</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Job Title*</span>
                                    <span className='valueLabel'>Angular Developer 16</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Recruiter *</span>
                                    <span className='valueLabel'>Abhishek Ajay</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Select Primary Recruiter *</span>
                                    <span className='valueLabel'>Abhishek Ajay</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Account Manager</span>
                                    <span className='valueLabel'>Mastan Vali</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Job Category *</span>
                                    <span className='valueLabel'>Information Technology</span>
                                </div>
                            </Grid>
                            <Grid size={6}>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Not Working</span>
                                    <span className='valueLabel'>Yes</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Reason</span>
                                    <span className='valueLabel'>reason</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Similar Jobs</span>
                                    <span className='valueLabel'>similarjobs</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Filled By</span>
                                    <span className='valueLabel'>aakash</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Closed</span>
                                    <span className='valueLabel'>Yes</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Relationship Type</span>
                                    <span className='valueLabel'>Clerk</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Pipeline Status</span>
                                    <span className='valueLabel'>Open</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Priority</span>
                                    <span className='valueLabel'>A</span>
                                </div>
                            </Grid> */}
                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <Grid
                            container
                            className=''
                            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
                        // spacing={2}
                        >

                            <Grid size={6}>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Requisition Title</span>
                                    <span className='valueLabel'> {data.RequisitionTitle}</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Requisition #</span>
                                    <span className='valueLabel'>{data.Requisition}</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Cost Center Number</span>
                                    <span className='valueLabel'>0900/8210</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Business Unit</span>
                                    <span className='valueLabel'>Cummins Power Generation (BSPGB_BU)</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Hiring Manager</span>
                                    <span className='valueLabel'>{data.HiringManager}</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'># of Positions</span>
                                    <span className='valueLabel'>3</span>
                                </div>
                            </Grid>
                            <Grid size={6}>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Position Duration *</span>
                                    <span className='valueLabel'>{data.PositionDuration}</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>MSP Coordinator</span>
                                    <span className='valueLabel'>{data.MSPCoordinator}</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>PartTime</span>
                                    <span className='valueLabel'>Yes</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Start Date
                                    </span>
                                    <span className='valueLabel'>{data.StartDate}</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Est.End Date</span>
                                    <span className='valueLabel'>{data.EstEndDate}</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Submissions Allowed</span>
                                    <span className='valueLabel'>{data.SubmissionsAllowed}</span>
                                </div>
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <Grid
                            container
                            className=''
                            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
                        // spacing={2}
                        >
                            <Grid size={6}>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Remote Job</span>
                                    <span className='valueLabel'>{data.RemoteJob}</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Street Address</span>
                                    <span className='valueLabel'>{data.StreetAddress}</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Job City *</span>
                                    <span className='valueLabel'>{data.JobCity}</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Original Job Description *</span>
                                    <span className='valueLabel'>Original Job Description *</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>State or Pro *</span>
                                    <span className='valueLabel'>{ }</span>
                                </div>
                            </Grid>
                            <Grid size={6}>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Job Postal Code *</span>
                                    <span className='valueLabel'>{data.JobPostalCode}</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Area Code</span>
                                    <span className='valueLabel'>10038.00</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Country/Locale</span>
                                    <span className='valueLabel'>United States</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Job Region</span>
                                    <span className='valueLabel'>{data.JobRegion}</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Travel %</span>
                                    <span className='valueLabel'>0.0</span>
                                </div>
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <Grid
                            container
                            className=''
                            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
                        // spacing={2}
                        >
                            <Grid size={6}>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Freelancer</span>
                                    <span className='valueLabel'>{data.Freelancer === "Freelancer" ? "Yes" : "No"}</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Pay Range *</span>
                                    <span className='valueLabel'>0 -10</span>

                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Pay Type*</span>
                                    <span className='valueLabel'>Hourly</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Pay Range *</span>
                                    <span className='valueLabel'>15-18</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Direct Hire</span>
                                    <span className='valueLabel'>{data.DirectHire === "Direct Hire" ? "Yes" : "No"}</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Pay Range *</span>
                                    <span className='valueLabel'>0 -10</span>

                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Pay Type*</span>
                                    <span className='valueLabel'>Hourly</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Pay Range *</span>
                                    <span className='valueLabel'>15-18</span>
                                </div>
                            </Grid>
                            <Grid size={6}>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Contract</span>
                                    <span className='valueLabel'>{data.Contract === "Contract" ? "Yes" : "No"}</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Pay Type*</span>
                                    <span className='valueLabel'>Hourly</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Bill Rate * $</span>
                                    <span className='valueLabel'>0-10</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Pay Rate * $</span>
                                    <span className='valueLabel'>0-10</span>
                                </div>
                            </Grid>
                        </Grid>
                    </TabPanel>
                </Grid>
            </Box>
        </div >
    )

}
export default Edit;