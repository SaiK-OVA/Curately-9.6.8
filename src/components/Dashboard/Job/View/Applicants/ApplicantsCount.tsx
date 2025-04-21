import { useState, useEffect } from '../../../../../shared/modules/React';
import { Tabs, Tab } from '../../../../../shared/modules/MaterialImports/Tabs';
import ApiRequests from "../../../../../shared/api/api";
import { trackPromise } from '../../../../../shared/modules/PromiseTrackter';
// import { useParams } from 'react-router-dom';
import { Grid } from '../../../../../shared/modules/MaterialImports/Grid';
import { userLocalData } from '../../../../../shared/services/userData';
import ApplicantsClient from './Applicants';
import './ApplicantsCount.scss';
import './../Sourced/Sourced.scss';
import { Button } from '../../../../../shared/modules/commonImports';
import { Stack } from '../../../../../shared/modules/MaterialImports/Stack';
import { ButtonGroup } from '../../../../../shared/modules/MaterialImports/ButtonGroup';
import { Tooltip } from '../../../../../shared/modules/MaterialImports/ToolTip';
import BackupTableOutlinedIcon from '@mui/icons-material/BackupTableOutlined';
import GridOnOutlinedIcon from '@mui/icons-material/GridOnOutlined';


const ApplicantsCount = ({ jobId, masterJobData, jobCriteriaData, addCriteria, loadRerunCriteria, jobCount, }: { jobId: string, masterJobData: any, jobCriteriaData: any, addCriteria: { (): void }, loadRerunCriteria: { (userIds?: any[]): void }, jobCount: any }) => {
    const isHiringWorkFlowEnabled = userLocalData.adminSettings(20027);
    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    const [sourcedResult, setSourcedResult] = useState<any>([]);
    const [statusId, setStatusId] = useState('');
    const [totalCount, setTotalCount] = useState(0);
    const [isTabView, setIsTabView] = useState(false);
    // const { jobId } = useParams();
    function tabProperties(index: number) {
        return {
            id: `sourceTabs-${index}`,
            'aria-controls': `sourceTabsPanel-${index}`,
        };
    }
    useEffect(() => {
        setStatusId("");
        let clientId = userLocalData.getvalue('clientId');
        if (isHiringWorkFlowEnabled && isTabView) {
            setCurrentTabIndex(0);
            trackPromise(
                ///Accuick_API/Curately/Jobs/applicant_bysource_count.jsp?clientId=2&jobId=1472
                //http://52.41.18.83:41088/Accuick_API/Curately/Jobs/applicant_bysource_count.jsp?jobId=2059&clientId=3
                // ApiRequests.postWithData('admin', 'getApplicantBySourceCount', {
                //     clientId: clientId, jobId: Number(jobId),
                // })
                ApiRequests.postWithData("admin", 'getApplicantBySourceCount', {
                    clientId: clientId, jobId: Number(jobId),
                })
                    .then((result) => {
                        // setSourcedResult(result.data);
                        // if (result.data.length) {
                        //     getSourcedData(result.data[0].statusId, result.data[0].count);
                        // }
                        if (result?.data?.Success) {
                            let tempResponse = result?.data?.response?.data ? JSON.parse(result.data.response.data) : [];
                            // let tempResponse = result.data?.response?.data ? JSON.parse(result.data.response.data) : [];
                            let tempSourcedList = []
                            for (let t = 0; t < tempResponse.length; t++) {
                                if (Number(tempResponse[t].count)) {
                                    tempSourcedList.push(tempResponse[t]);
                                }

                            }
                            setSourcedResult(tempSourcedList);
                            if (tempSourcedList.length) {
                                getSourcedData(tempSourcedList[0].statusId, tempSourcedList[0].count);
                            }
                        }
                    })
                    .catch((error) => {
                        console.error('Error fetching Sourced Count:', error);
                    })
            )
        }
    }, [isTabView, jobId]);
    const handleTabChange = (e: any, tabIndex: number) => {
        // console.log(tabIndex);
        setCurrentTabIndex(tabIndex);
    };
    const getSourcedData = (status: string, totalCount: string) => {
        // console.log(status)
        setStatusId(status);
        setTotalCount(Number(totalCount));

    }
    return (
        <>
            <div id="sourcedTabs">
                <div className='customCard p-0'>
                    {Number(jobCount.appCount) ? <div>
                        {isHiringWorkFlowEnabled && <Stack direction={"row"} spacing={2} alignItems={"center"} width={"100%"} py={!isTabView ? 1.5 : 0} justifyContent={!isTabView ? "flex-end" : "space-between"}>
                            {(isTabView ? <Tabs value={currentTabIndex} onChange={handleTabChange} aria-label="View Sourced Tabs" scrollButtons="auto" variant="scrollable" id=" viewSourcedTab">
                                {sourcedResult.map((item: any) => (
                                    <Tab
                                        key={item.statusId}
                                        label={
                                            <Grid container direction="column" alignContent='center'>
                                                <Grid size={12}>
                                                    <div className={`${item.count > 0 ? 'fw-7' : ''} statusCount `}>{item.count}</div>
                                                    <div className={`${item.count > 0 ? 'fw-7' : ''} statusLabel`}>{item.status}</div>

                                                </Grid>
                                            </Grid>
                                        }
                                        {...tabProperties(0)}
                                        className='sourceTab'
                                        onClick={() =>
                                            getSourcedData(item.statusId, item.count)
                                        }
                                    />
                                ))}

                            </Tabs> : null)}
                            <ButtonGroup variant="outlined" className='quickActionButtonGroup mr-3'>
                                <Tooltip title="Tab view">
                                    <Button color={isTabView ? "primary" : "secondary"}
                                        variant={isTabView ? "contained" : "outlined"} onClick={() => setIsTabView(true)}><BackupTableOutlinedIcon fontSize='small' /></Button>
                                </Tooltip>
                                <Tooltip title="Table view">
                                    <Button color={!isTabView ? "primary" : "secondary"}
                                        variant={!isTabView ? "contained" : "outlined"} onClick={() => setIsTabView(false)}><GridOnOutlinedIcon fontSize='small' /></Button>
                                </Tooltip>
                            </ButtonGroup>
                        </Stack>}
                        {(isHiringWorkFlowEnabled && isTabView) ? <div className="candidatesList MRTableCustom pl-0 paper-padding">
                            {
                                sourcedResult.map(
                                    (item: any) => (
                                        <div key={item.statusId}>
                                            {
                                                (item.statusId === statusId) ?
                                                    <ApplicantsClient statusId={statusId} totalCount={totalCount} jobId={jobId} masterJobData={masterJobData} jobCriteriaData={jobCriteriaData} addCriteria={addCriteria} loadRerunCriteria={loadRerunCriteria} />
                                                    : null
                                            }
                                        </div>
                                    )
                                )
                            }
                        </div> :
                            <div className="candidatesList MRTableCustom pl-0 paper-padding">
                                <ApplicantsClient statusId={null} totalCount={jobCount.appCount} jobId={jobId} masterJobData={masterJobData} jobCriteriaData={jobCriteriaData} addCriteria={addCriteria} loadRerunCriteria={loadRerunCriteria} />
                            </div>
                        }
                    </div> : null}
                </div>
            </div>
        </>
    )
}

export default ApplicantsCount