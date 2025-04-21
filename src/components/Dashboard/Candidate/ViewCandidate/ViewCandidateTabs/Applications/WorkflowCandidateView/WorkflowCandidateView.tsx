
import { Dialog } from 'primereact/dialog';
import ApiService from '../../../../../../../shared/api/api';
import { trackPromise } from '../../../../../../../shared/modules/PromiseTrackter';
import { useEffect, useState } from '../../../../../../../shared/modules/React';
import { userLocalData } from '../../../../../../../shared/services/userData';
import WorkflowPreviewData from '../../../../../../../shared/utils/WorkflowPreviewData';
import { StageInterface } from '../../../../../Job/Workflow/Workflow';
import { Loader } from '../../../../../../shared/Loader/Loader';

import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';


import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';


import { Grid } from '../../../../../../../shared/modules/MaterialImports/Grid';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

import { Card, CardHeader, CardContent } from './../../../../../../../shared/modules/MaterialImports/Card';
import { Typography } from './../../../../../../../shared/modules/MaterialImports/Typography';
import { Button } from './../../../../../../../shared/modules/MaterialImports/Button';
import { Tooltip } from './../../../../../../../shared/modules/MaterialImports/ToolTip';
import { List, ListItem, ListItemIcon, ListItemText } from './../../../../../../../shared/modules/MaterialImports/List';


import ShareIcon from '@mui/icons-material/Share';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';

import { showToaster } from '../../../../../../shared/SnackBar/SnackBar';
import WorkflowColumnsData from '../../../../../../../shared/utils/WorkflowColumnsData';
import IsValidUrl from '../../../../../../../shared/utils/IsValidUrl';
import VideoPreview from '../../../../../Job/Workflow/VideoPreview/VideoPreview';



import './WorkflowCandidateView.scss';
import './../../../../../Job/Workflow/Workflow.scss';





const WorkflowCandidateView = (
    { open, closePopup, applicantData }:
        {
            open: boolean;
            closePopup: () => void;
            applicantData: {
                workflowCandidateId: string;
                workflowJobId: string;
                stageId: string
            }
        }
) => {

    const [masterStagesList, setMasterStagesList] = useState<StageInterface[]>([]);

    const [candidatesData, setCandidatesData] = useState([]);
    const [noStagesFound, setNoStagesFound] = useState(false);

    const getStagesByJobId = () => {
        trackPromise(
            ApiService.getByParams(193, 'Curately/Workflow/workflow_job_stages_list.jsp', { jobId: applicantData.workflowJobId, clientId: userLocalData.getvalue('clientId') })
                .then((response) => {

                    let stagesList: StageInterface[] = response.data.stages;
                    stagesList = stagesList.sort((a: StageInterface, b: StageInterface) => parseFloat(a.position) - parseFloat(b.position));
                    stagesList = stagesList.filter((i) => {
                        return ((i.stageTypeId !== "1") && i.stageTypeId !== "11")
                    });
                    stagesList = [...stagesList].filter((i) => {
                        return ["3", "15", "10", "12", "13", "14", "8", "9"].includes(i.stageTypeId)
                        //  "13", "7", "2", "6",
                        // "3", "15", "10", "12", "8", "14", "9"
                    });
                    setMasterStagesList(stagesList);
                    getCandidateData(stagesList);
                })
                .catch(() => {
                    setNoStagesFound(true);
                })
        )
    }
    const getCandidateData = async (masterStagesList: StageInterface[]) => {
        const response = (applicantData.workflowCandidateId) ?
            await trackPromise(ApiService.getByParams(193, 'Curately/Workflow/workflow_applicants_view_single.jsp',
                {
                    workflow_job_cand_id: applicantData.workflowCandidateId,
                    clientId: userLocalData.getvalue('clientId')
                }
            ))
            :
            await trackPromise(ApiService.getByParams(193, 'Curately/Workflow/workflow_applicants_view.jsp',
                {
                    jobId: applicantData.workflowJobId,
                    stageId: applicantData.stageId, // 821, // applicantData.stageId,
                    pageSize: 50,
                    pageIndex: 0,
                    candIds: applicantData.workflowCandidateId,
                    clientId: userLocalData.getvalue('clientId')
                }
            ));


        let processedData = await WorkflowPreviewData.parseApplicantsData(response.data, masterStagesList);

        let candData = processedData.applicants;
        console.log(candData);
        setCandidatesData(candData);
    }

    useEffect(() => {
        getStagesByJobId();
    }, [])



    const copyValue = (value: string, type: string) => {
        navigator.clipboard.writeText(value);
        showToaster(type + ' Copied', 'success');
    };

    const [showVideoPreview, setShowVideoPreview] = useState(false);
    const [videoPreviewLink, setVideoPreviewLink] = useState('');

    const showVideo = (link: string) => {
        if (link && (IsValidUrl.check(link) || link.includes('cameratag.com'))) {
            setVideoPreviewLink(link);
            setShowVideoPreview(true);
        } else {
            showToaster('In Valid URL.', 'error');
        }
    }




    return <div>
        <Dialog dismissableMask={true} visible={open} position={'right'} style={{ width: '80vw', height: '100vh', maxHeight: '100vh', margin: 0 }} onHide={() => closePopup()} draggable={false} resizable={false} id="WorkflowCandidateView">
            <Loader />
            <div className='p-3 jobWorkflow'>
                {noStagesFound ? (
                    <Typography component={'div'} className="fs-14 fw-6 text-center">
                        No Data found
                    </Typography>
                ) :

                    candidatesData.length ? (
                        candidatesData.map((candidate: any) => {
                            return (
                                <div>
                                    <Grid container direction={'row'} justifyContent={'flex-start'} alignItems={'start'}>
                                        <Grid style={{ width: 300 }}>

                                            <Grid className='pt-3'>
                                                {/* {
                                                WorkflowColumnsData("").recruiter(candidate)
                                            } */}

                                            </Grid>
                                            <Card className='pt-3'>
                                                <CardHeader
                                                    className='tt-capital pb-2'
                                                    title={
                                                        <span>
                                                            {candidate.candname.toLowerCase()}
                                                            {
                                                                candidate.candtoken ?
                                                                    <Tooltip title='Copy Candidate Link'>
                                                                        <Button size='small'
                                                                            onClick={(event: any) => {
                                                                                event.stopPropagation();
                                                                                copyValue("https://app.curately.ai/workflow/#/stages/" + candidate.candtoken, 'Candidate Link');
                                                                            }}>
                                                                            <ShareIcon className='fs-16' />
                                                                        </Button>
                                                                    </Tooltip>
                                                                    :
                                                                    null
                                                            }
                                                            <div className='pt-2 fs-12'>{candidate.recruitername}</div>
                                                        </span>
                                                    }
                                                />
                                                <CardContent className='pt-0'>
                                                    {/* <span className="hightLightTd fs-13">{candidate.candname.toLowerCase()}</span> */}
                                                    {
                                                        candidate.email && candidate.email.trim() ?
                                                            <List className='py-0'>
                                                                <ListItem
                                                                    className='py-0 pl-0'
                                                                    secondaryAction={
                                                                        <ContentCopyOutlinedIcon
                                                                            className="cursor-pointer fs-16"
                                                                            onClick={(event: any) => {
                                                                                event.stopPropagation();
                                                                                copyValue(candidate.email, 'Email');
                                                                            }}
                                                                        />
                                                                    }>
                                                                    <ListItemIcon sx={{ minWidth: '26px !important' }}>
                                                                        <EmailOutlinedIcon className='fs-16' />
                                                                    </ListItemIcon>
                                                                    <ListItemText sx={{
                                                                        color: '#007bff'
                                                                    }}
                                                                        primary={<span className='fs-13'>{candidate.email} </span>}
                                                                    />
                                                                </ListItem>
                                                            </List>
                                                            :
                                                            null
                                                    }
                                                    {
                                                        candidate.phoneno && candidate.phoneno.trim() ?
                                                            <List className='py-0'>
                                                                <ListItem
                                                                    className='pt-0 pl-0'
                                                                    secondaryAction={
                                                                        <ContentCopyOutlinedIcon
                                                                            className="cursor-pointer fs-16"
                                                                            onClick={(event: any) => {
                                                                                event.stopPropagation();
                                                                                copyValue(candidate.phoneno, 'Phone Number');
                                                                            }}
                                                                        />
                                                                    }>
                                                                    <ListItemIcon sx={{ minWidth: '26px !important' }}>
                                                                        <LocalPhoneIcon className='fs-16' />
                                                                    </ListItemIcon>
                                                                    <ListItemText sx={{
                                                                        color: '#007bff'
                                                                    }}
                                                                        primary={<span className='fs-13'>{candidate.phoneno} </span>}
                                                                    />
                                                                </ListItem>
                                                            </List>
                                                            :
                                                            null
                                                    }
                                                    <Typography component={'div'} className='fs-14 fw-6 mt-5'>Stages List</Typography>
                                                    <div className='pt-3 pl-1'>
                                                        {WorkflowColumnsData("").stagesList(candidate)}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                        <Grid className='ml-5'>
                                            <Timeline sx={{
                                                [`& .${timelineItemClasses.root}:before`]: {
                                                    flex: 0,
                                                    padding: 0,
                                                },
                                            }}>
                                                {
                                                    masterStagesList.map((stage: any, i) => {
                                                        return (
                                                            <div>
                                                                {
                                                                    ["3", "15", "10", "12", "14", "8", "9"].includes(stage.stageTypeId) ?
                                                                        <TimelineItem >
                                                                            <TimelineSeparator>
                                                                                <TimelineDot />
                                                                                {
                                                                                    (masterStagesList.length - 1 !== i) ?
                                                                                        <TimelineConnector />
                                                                                        : null
                                                                                }
                                                                            </TimelineSeparator>
                                                                            <TimelineContent>
                                                                                <div>
                                                                                    <div className='fs-14 fw-6'>
                                                                                        {
                                                                                            (stage.title) ? stage.title : stage.name
                                                                                        }
                                                                                    </div>
                                                                                    <div className='p-3'>
                                                                                        {
                                                                                            (stage.stageTypeId === "3") ?
                                                                                                <Grid style={{ width: 300 }} >
                                                                                                    {WorkflowColumnsData(stage.stageId).dataCollection(candidate)}
                                                                                                </Grid>
                                                                                                :
                                                                                                (stage.stageTypeId === "15") ?
                                                                                                    <Grid style={{ width: 300 }}>
                                                                                                        {WorkflowColumnsData(stage.stageId).documentSigning(candidate)}
                                                                                                    </Grid>
                                                                                                    :
                                                                                                    (stage.stageTypeId === "10") ?
                                                                                                        <Grid className="videoRecordingDiv" style={{ width: 250 }} >
                                                                                                            {
                                                                                                                (candidate["videoRecordingsList_" + stage.stageId] && candidate["videoRecordingsList_" + stage.stageId].length) ?
                                                                                                                    candidate["videoRecordingsList_" + stage.stageId].map((i: { questionid: string, question: string, stageid: string, workflow_job_cand_id: string, videolink: string }) => <Grid >
                                                                                                                        <label className='fw-7 questionLabel' >{i.question}</label>
                                                                                                                        <div> <PlayCircleFilledWhiteOutlinedIcon onClick={() => showVideo(i.videolink)} className='cursor-pointer c-grey' /> </div>
                                                                                                                    </Grid>
                                                                                                                    )
                                                                                                                    :
                                                                                                                    null
                                                                                                            }
                                                                                                        </Grid>
                                                                                                        :
                                                                                                        (stage.stageTypeId === "9") ?
                                                                                                            <Grid style={{ width: 300 }}>
                                                                                                                {WorkflowColumnsData(stage.stageId).scheduler(candidate)}
                                                                                                            </Grid>
                                                                                                            :
                                                                                                            (stage.stageTypeId === "12") ?
                                                                                                                <Grid style={{ width: 180 }}>
                                                                                                                    {WorkflowColumnsData(stage.stageId).assessment(candidate)}
                                                                                                                </Grid>
                                                                                                                :
                                                                                                                (stage.stageTypeId === "8") ?
                                                                                                                    <Grid style={{ width: 300 }}>
                                                                                                                        {WorkflowColumnsData(stage.stageId).webinar(candidate)}
                                                                                                                    </Grid>
                                                                                                                    :
                                                                                                                    (stage.stageTypeId === "14") ?
                                                                                                                        <span>
                                                                                                                            {stage["systemChecker" + stage.stageId]}
                                                                                                                        </span>
                                                                                                                        :
                                                                                                                        (stage.stageTypeId === "1") ?
                                                                                                                            ""
                                                                                                                            :
                                                                                                                            null
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                            </TimelineContent>
                                                                        </TimelineItem>
                                                                        :
                                                                        null
                                                                }
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </Timeline>
                                        </Grid>
                                    </Grid>
                                </div>

                            )
                        })

                    ) : null

                }
            </div>
        </Dialog >

        {
            videoPreviewLink ?
                <VideoPreview url={videoPreviewLink} open={showVideoPreview}
                    closePopup={() => setShowVideoPreview(false)} />
                :
                null
        }
    </div >
}

export default WorkflowCandidateView;