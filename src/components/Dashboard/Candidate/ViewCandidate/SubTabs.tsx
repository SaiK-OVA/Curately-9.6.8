import { React, useEffect, useState } from '../../../../shared/modules/React';
import { Tabs, Tab } from '../../../../shared/modules/MaterialImports/Tabs';
import { Box } from '../../../../shared/modules/MaterialImports/Box';
import Submissions from './ViewCandidateTabs/Submissions/Submissions';
import Interviews from './ViewCandidateTabs/Interviews/Interviews';
import Applications from './ViewCandidateTabs/Applications/Applications';
import Matches from './Matches/Matches';
import { trackPromise } from '../../../../shared/modules/PromiseTrackter';
import ApiService from "../../../../shared/api/api";
import { userLocalData } from '../../../../shared/services/userData';
import { JobsList } from './ViewCandidate';
import { Grid } from '../../../../shared/modules/MaterialImports/Grid';
import { showToaster } from '../../../shared/SnackBar/SnackBar';

import './SubTabs.scss';

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
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}
 
function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
 
const SubTabs = ({ candidateId , jobId}: { candidateId: String, jobId:string }) => {
    const [submissionsList, setSubmissionsList] = useState<any>([]);
    const [candidateInterviewsList, setCandidateInterviewsList] = useState<any>([]);
    const [ApplicationDetailsList, setApplicationDetailsList] = useState<any>([])
    const [ApplicationJobDetailsList, setApplicationJobDetailsList] = useState<JobsList>({ currentJob: { jobId: 0, jobTitle: "", statusName: "" }, jobsList: [] });
 
 
    const [value, setValue] = React.useState(0);
 
    //   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    //     setValue(newValue);
    //   };
    const updateTabValue = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        console.log(newValue)
        if (newValue === 0) {
            loadSubmissionsList();
        }
        if (newValue === 1) {
            loadCandidateInterviews();
        }
        if (newValue === 2) {
            loadApplicationDetails();
        }
        if (newValue === 3) {
            loadApplicationJobDetails();
        }
    };
    useEffect(() => {
        loadSubmissionsList();
    }, []);

    const loadApplicationDetails = () => {
        let clientId = userLocalData.getvalue('clientId');
        trackPromise(
            ApiService.getCall('admin', `getUserJobs/${candidateId}/${clientId}`).then(
                (response: any) => {
                    setApplicationDetailsList(response.data?.jobs || []);
                    // console.log(response.data.list);
                }
            ))
    }
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

    const loadSubmissionsList = () => {
        // https://www4.accuick.com/Accuick_API/Curately/Candidate/subs_int_data.jsp?clientId=2&userId=11547&status=100
        trackPromise(
            ApiService.postWithData('admin', 'getSubsData', { userId: candidateId, status: 100, clientId: userLocalData.getvalue('clientId') }).then(
                (response: any) => {
                    // console.log(response.data.list)
                    setSubmissionsList(response.data.list);
                })
        );
    }
    const loadCandidateInterviews = () => {
        //             ApiService.getByParams(193, 'Candidate/candidate_interviews.jsp', { candId: candidateId }).then(
 
        trackPromise(
            ApiService.postWithData("admin", 'getSubsData', { userId: candidateId, status: 300, clientId: userLocalData.getvalue('clientId') }).then(
                (response: any) => {
                    setCandidateInterviewsList(response.data.list);
                }
            ))
    }
    return (
        <Box sx={{ width: '100%' , boxShadow: "var(--shadow-1)", backgroundColor: "var(--curatelyWhite)"}} id="SubTabs">
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={updateTabValue} aria-label="basic tabs example" variant="scrollable" scrollButtons="auto">
                    <Tab
                        label={
                            <Grid container direction="row">
                                <span className='tabLabelName'>Submissions</span>
                            </Grid>
                        } {...a11yProps(0)} className='tabButton'
                    />
                    <Tab
                        label={
                            <Grid container direction="row">
                                <span className='tabLabelName'> Interviews</span>
                            </Grid>
                        } {...a11yProps(1)} className='tabButton'
                    />
                    <Tab
                        label={
                            <Grid container direction="row">
                                <span className='tabLabelName'> Applications</span>
                            </Grid>
                        } {...a11yProps(2)} className='tabButton'
                    />
                    <Tab
                        label={
                            <Grid container direction="row">
                                <span className='tabLabelName'> Matches</span>
                            </Grid>
                        } {...a11yProps(3)} className='tabButton'
                    />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <Submissions submissionsList={submissionsList} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <Interviews candidatesList={candidateInterviewsList} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <Applications ApplicationList={ApplicationDetailsList} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                <Matches ApplicationList={ApplicationJobDetailsList.jobsList} candidateId={candidateId} />
            </CustomTabPanel>
 
        </Box>
    );
}
export default SubTabs;
 
 