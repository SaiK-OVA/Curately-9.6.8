// import React from 'react'
import { Tabs, Tab } from '../../../../../shared/modules/MaterialImports/Tabs';
import { useState, useEffect } from '../../../../../shared/modules/React';
import ApiRequests from "../../../../../shared/api/api";
// import { styled } from '@mui/material/styles';
import { Grid } from '../../../../../shared/modules/MaterialImports/Grid';
// import Typography from '@mui/material/Typography';
// import  { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";

import './Sourced.scss'
import VirtualScrollSourced from './VirtualScrollSourced';
import { useParams } from 'react-router-dom';
import { trackPromise } from '../../../../../shared/modules/PromiseTrackter';
import { userLocalData } from '../../../../../shared/services/userData';
import { Stack } from '../../../../../shared/modules/MaterialImports/Stack';
import { Button } from '../../../../../shared/modules/commonImports';
import { ButtonGroup } from '../../../../../shared/modules/MaterialImports/ButtonGroup';
import { Tooltip } from '../../../../../shared/modules/MaterialImports/ToolTip';
import BackupTableOutlinedIcon from '@mui/icons-material/BackupTableOutlined';
import GridOnOutlinedIcon from '@mui/icons-material/GridOnOutlined';



// StyledTabs component with custom CSS
// const StyledTabs = styled(Tabs)({

//     '& .MuiTabs-flexContainer': {
//         justifyContent: 'center',
//     },
//     '& .MuiTab-root': {
//         textTransform: 'none',
//         minWidth: 100,
//         '&:hover': {
//             color: 'var(--c-primary-color)',
//             BorderBottom: '2 solid black'
//         },
//         '&.Mui-selected': {
//             '& .Mui-selected': {

//                 '--color': 'var(--c-primary-color)',
//                 padding: '14px 16px',
//                 width: '200px',
//                 textDecoration: 'none',
//                 fontsize: '14px',
//                 fontWeight: '500',
//                 lineHeight: '20px',


//             },
//         },
//     },
// });

function tabProperties(index: number) {
    return {
        id: `sourceTabs-${index}`,
        'aria-controls': `sourceTabsPanel-${index}`,
    };
}
const Sourced = ({ masterJobData, jobCriteriaData, addCriteria, loadRerunCriteria, jobCount }: { masterJobData: any, jobCriteriaData: any, addCriteria: { (): void }, loadRerunCriteria: { (userIds?: any[]): void }, jobCount: any }) => {
    const isHiringWorkFlowEnabled = userLocalData.adminSettings(20027);
    const [sourcedResult, setSourcedResult] = useState<any>([]);
    const [currentTabIndex, setCurrentTabIndex] = useState(0);

    const [statusId, setStatusId] = useState('');
    const [totalCount, setTotalCount] = useState(0);
    const [isTabView, setIsTabView] = useState(false);

    const handleTabChange = (e: any, tabIndex: number) => {
        console.log(tabIndex);
        setCurrentTabIndex(tabIndex);
    };
    const { jobId } = useParams();
    useEffect(() => {
        setStatusId("");
        if (isHiringWorkFlowEnabled && isTabView) {
            getSourcedCount();
        }
    }, [jobId, isTabView]);

    const getSourcedCount = () => {
        setCurrentTabIndex(0);
        trackPromise(
            // ApiRequests.getByParams(193, 'Curately/Jobs/sourced_count.jsp', { jobId: jobId })userLocalData.getvalue("")
            ApiRequests.postWithData("admin", 'getSourcedCount', {
                jobId: Number(jobId), clientId: userLocalData.getvalue("clientId"),
                userId: userLocalData.getvalue("recrId")
            })

                .then((result) => {
                    let tempResponse = result.data.list;
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
                })
                .catch((error) => {
                    console.error('Error fetching Sourced Count:', error);
                })
        )
    }

    const getSourcedData = (status: string, totalCount: string) => {
        setStatusId(status);
        setTotalCount(Number(totalCount));
        // ApiRequests.getByParams(
        //     193,
        //     'sourced_data.jsp',
        //     {
        //         jobId: 229194,
        //         status: status
        //     }
        // ).then((result: any) => {
        //     setCandidatesData(result.data.status);
        // }).catch((error: any) => {
        //     console.error('Error fetching Sourced Count:', error);
        // });
    }
    // const [candidatesData, setCandidatesData] = useState<any>([]);

    // candId: "4812584"
    // candName: "sonja burgess"
    // email: "swelsh0323@yahoo.com"
    // important: "0"
    // modifyDate: "07/19/2023  09:13"
    // phone1:  "(614) 314-3473"
    // phone2: ""
    // recrId: "3062"
    // recrName: "Sweta Singh"
    // searchId: "3953261"
    // status: "shortlist"
    // statusId: "2"


    return (
        <div id="sourcedTabs">
            <div className='customCard p-0'>
                {Number(jobCount.sourcedCount) ? <div>
                    {isHiringWorkFlowEnabled && <Stack direction={"row"} spacing={2} alignItems={"center"} width={"100%"} py={!isTabView ? 1.5 : 0} justifyContent={!isTabView ? "flex-end" : "space-between"}>
                        {(isTabView ? <Tabs value={currentTabIndex} onChange={handleTabChange} aria-label="View Sourced Tabs" scrollButtons="auto" variant="scrollable" id=" viewSourcedTab">
                            {sourcedResult.map((item: any) => (
                                <Tab
                                    key={item.statusId}
                                    label={
                                        <Grid container direction="column" alignContent='center'>
                                            <div className={`${item.count > 0 ? 'fw-7' : ''} statusCount `}>{item.count}</div>
                                            <div className={`${item.count > 0 ? 'fw-7' : ''} statusLabel`}>{item.status}</div>
                                        </Grid>
                                    }
                                    {...tabProperties(0)}
                                    className='sourceTab'
                                    onClick={() => getSourcedData(item.statusId, item.count)}
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

                    {(isHiringWorkFlowEnabled && isTabView) ? <div className="candidatesList MRTableCustom pl-0">
                        {
                            sourcedResult.map(
                                (item: any) => (
                                    <div key={item.statusId}>
                                        {
                                            (item.statusId === statusId) ?
                                                <VirtualScrollSourced statusId={statusId} status={item.status} totalCount={totalCount} masterJobData={masterJobData}
                                                    refreshSourcedData={getSourcedCount} jobCriteriaData={jobCriteriaData} addCriteria={addCriteria}
                                                    loadRerunCriteria={loadRerunCriteria} />
                                                : null
                                        }
                                    </div>
                                )
                            )
                        }
                    </div> :
                        <div className="candidatesList MRTableCustom pl-0">
                            <VirtualScrollSourced statusId={null} status={""} totalCount={jobCount.sourcedCount} masterJobData={masterJobData}
                                refreshSourcedData={getSourcedCount} jobCriteriaData={jobCriteriaData} addCriteria={addCriteria}
                                loadRerunCriteria={loadRerunCriteria} />
                        </div>}
                </div> : null}
            </div>

            {/* <StyledTabs variant="scrollable" value={currentTabIndex} onChange={handleTabChange} scrollButtons="auto" border-bottom="1">
                {sourcedResult.map((item: any) => (
                    <Tab key={item.statusId} label={
                        <>
                            <div className='count'>{item.count}</div>
                            <div className=''>{item.status}</div>
                        </>
                    }
                    />
                ))}
            </StyledTabs> */}
        </div>
    )
}

export default Sourced