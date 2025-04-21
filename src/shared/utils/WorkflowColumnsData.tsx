import { Grid } from "../modules/MaterialImports/Grid";

import { Avatar } from '../modules/MaterialImports/Avatar';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CheckIcon from '@mui/icons-material/Check';
import { Tooltip } from "../modules/MaterialImports/ToolTip";
import { Chip } from "../modules/MaterialImports/Chip";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

// import { Button, IconButton } from '../modules/MaterialImports/Button';
import { IconButton } from '../modules/MaterialImports/Button';

import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { OpenDataCollectionQAs } from "../../components/Dashboard/Job/Workflow/DataCollectionQAs";
import { OpenDocumentView } from "../components/DocumentView/DocumentView";
import { userLocalData } from "../services/userData";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Stack } from "../modules/MaterialImports/Stack";
// import Typography from "@mui/material/Typography";
// assessments
// datacollection
// scheduler
// stages
// videorecordings
// webinar

const isValidUrl = (str: string) => {

    const isViewEnabled = (userLocalData.getvalue('recrId') === 1893);
    // let url;
    // try {
    //     url = new URL(text);
    // } catch (_) {
    //     return false;
    // }
    // return url.protocol === "http:" || url.protocol === "https:";

    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

const WorkflowColumnsData = (stageId: string) => {
    return {
        recruiter: (dataPassed: any) => {
            // console.log(dataPassed);
            return (
                <Tooltip title={dataPassed.recruiterShortName}>
                    <Avatar sx={{ width: 30, height: 30, fontSize: 12, color: 'white', background: 'red', marginLeft: '20px' }}> {dataPassed.recruiterShortName} </Avatar>
                </Tooltip>
            )
        },
        stagesList: (dataPassed: any) => {
            return (
                <Grid size={12} key={dataPassed.candtoken + dataPassed.stageid} container direction="row" justifyContent="flex-start" alignItems="center" className="fs-13 text pl-1" >
                    {
                        dataPassed.masterStagesList.map((i: any, index: number) => {
                            return (
                                <Grid size={12} container direction="row" justifyContent="flex-start" alignItems="center" key={dataPassed.candtoken + i.stageId + "" + index}>
                                    {
                                        i.isHide ?
                                            <></>
                                            :
                                            <>
                                                {
                                                    i.isCompleted ?
                                                        <CheckCircleOutlineIcon className="CheckIcon" />
                                                        :
                                                        <RadioButtonCheckedIcon className="RadioIcon" />
                                                }
                                                <Tooltip title={(i.title) ? i.title : i.name} className="workflowStageName">
                                                    <span>{(i.title) ? i.title : i.name}</span>
                                                </Tooltip>
                                            </>
                                    }
                                </Grid>
                            )
                        })
                    }
                </Grid>
            )
        },
        dataCollection: (dataPassed: any) => {
            console.log(dataPassed)
            return (
                <div className="dataCollectionDiv"
                    onClick={() => {
                        if (dataPassed["dataCollectionList_" + stageId] && dataPassed["dataCollectionList_" + stageId].answer) {
                            OpenDataCollectionQAs(dataPassed["dataCollectionList_" + stageId].answer, '');
                        }
                    }}
                >
                    {
                        (dataPassed["dataCollectionList_" + stageId] && dataPassed["dataCollectionList_" + stageId].answer) ?
                            dataPassed["dataCollectionList_" + stageId].answer.map((i: { quesId: string, question: string, answer: string, workflow_job_cand_id: string, correctAns: string }, index: number) => {
                                const formatAnswer = (answer: string) => {
                                    try {
                                        const parsed = JSON.parse(answer);
                                        if (typeof parsed === 'object' && parsed !== null) {
                                            return Object.values(parsed).filter(value => value).join(', ');
                                        }
                                    } catch (e) {
                                    }
                                    return answer;
                                };

                                return (
                                    <Grid key={i.quesId + index} className="mb-2">
                                        <label className='fw-7 questionLabel'>
                                            {i.question}
                                        </label>
                                        {
                                            (i.answer && isValidUrl(i.answer)) ?
                                                <Tooltip title="Download" placement="top">
                                                    <IconButton aria-label="download" className='bg-lightGrey c-darkGrey mr-1 cursor-pointer' href={i.answer} target='_blank' id='resumeDownload' onClick={(e) => { e.stopPropagation(); }}>
                                                        <FileDownloadOutlinedIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                :
                                                <Stack alignItems="center" direction="row">
                                                    {i.correctAns && <>
                                                        {
                                                            i.correctAns === i.answer ? <CheckCircleIcon sx={{ color: '#3ab509', width: '16px' }} className="mr-1" /> :
                                                                <CancelIcon sx={{ color: '#c91818', width: '16px' }} className="mr-1" />
                                                        }
                                                    </>
                                                    }
                                                    {formatAnswer(i.answer)}
                                                </Stack>
                                        }
                                    </Grid>
                                );
                            })
                            :
                            null
                    }
                    {
                        (dataPassed["dataCollectionList_" + stageId] && dataPassed["dataCollectionList_" + stageId].totalWeightedQuestions) ?
                            <Grid className="mb-2">
                                <Stack alignItems="center" direction="row">Questions - {dataPassed["dataCollectionList_" + stageId].correctWeightedQuestions} / {dataPassed["dataCollectionList_" + stageId].totalWeightedQuestions}</Stack>
                                <Stack alignItems="center" direction="row">Points - {dataPassed["dataCollectionList_" + stageId].earnedPoints} / {dataPassed["dataCollectionList_" + stageId].totalPoints}</Stack>
                            </Grid>
                            :
                            null
                    }
                </div>
            )
        },
        documentSigning: (dataPassed: any) => {
            return (
                <div className="documentSigningaDiv">
                    {
                        (dataPassed["documentSigningList_" + stageId]?.templateid) ?
                            <Grid key={dataPassed["documentSigningList_" + stageId]?.templateid}>
                                {/* https://ovastorage.s3.us-west-2.amazonaws.com/Curately_3/Workflow/168_251.pdf */}
                                {
                                    (dataPassed["documentSigningList_" + stageId]?.downloadlink && dataPassed["documentSigningList_" + stageId]?.documentname) ?
                                        <span>

                                            <Tooltip title="View Document" placement="top">
                                                <IconButton aria-label="download" className='bg-lightGrey c-darkGrey mr-1 cursor-pointer' onClick={() => { OpenDocumentView(import.meta.env.VITE_URL_AWS + dataPassed["documentSigningList_" + stageId]?.downloadlink, dataPassed["documentSigningList_" + stageId]?.documentname); }} id='documentView' > <VisibilityOutlinedIcon /></IconButton>
                                            </Tooltip>
                                        </span>
                                        :
                                        dataPassed["documentSigningList_" + stageId]?.downloadlink ?
                                            <span>
                                                <Tooltip title="Download Document" placement="top">
                                                    <IconButton aria-label="download" className='bg-lightGrey c-darkGrey mr-1 cursor-pointer' href={import.meta.env.VITE_URL_AWS + dataPassed["documentSigningList_" + stageId]?.downloadlink} target='_blank' id='documentDownload' > <FileDownloadOutlinedIcon /></IconButton>
                                                </Tooltip>
                                                <IconButton aria-label="download" className='bg-lightGrey c-darkGrey mr-1 cursor-pointer' onClick={() => { OpenDocumentView(import.meta.env.VITE_URL_AWS + dataPassed["documentSigningList_" + stageId]?.downloadlink, ''); }} id='documentView' > <VisibilityOutlinedIcon /></IconButton>
                                            </span>
                                            :
                                            null

                                }
                            </Grid>
                            :
                            null
                    }
                </div>
            )
        },
        // assessment: (dataPassed: any) => {
        //     return (
        //         <div>
        //             {
        //                 (dataPassed["assessmentsList_" + stageId] && dataPassed["assessmentsList_" + stageId].length) ?
        //                     dataPassed["assessmentsList_" + stageId].map((i: any, index: number) =>
        //                         <Grid
        //                             container
        //                             direction="row"
        //                             justifyContent="space-between"
        //                             alignItems="center"
        //                             className='rectCard'
        //                             key={i.assessmentsid + index}
        //                         >
        //                             <span className={i.titleChange} >
        //                                 {i.titleChange}
        //                             </span>
        //                             <span>
        //                                 <span className="percentile" > {i.textToAppend} </span>
        //                                 <span className="fs-13 fw-6">
        //                                     {
        //                                         (i.titleChange === "Typing") ?
        //                                             <Tooltip title="Words per Minute"><span>{i.percentile} WPM</span></Tooltip>
        //                                             :
        //                                             i.percentile
        //                                     }
        //                                 </span >
        //                                 {
        //                                     i.addCheckIcon ?
        //                                         <CheckIcon className='check' />
        //                                         :
        //                                         <></>
        //                                 }
        //                             </span>
        //                         </Grid>
        //                     )
        //                     :
        //                     null
        //             }
        //             {/* <Grid>
        //                 <div className='rectCard' >
        //                     <span className='Personality' >
        //                         Personality
        //                     </span>
        //                     <span className="percentile" >% Match </span>
        //                     <span > <strong>64 </strong></span >
        //                     <span><CheckIcon className='check' />
        //                     </span>
        //                 </div>
        //             </Grid>
        //             <Grid >
        //                 <div className='rectCard' >
        //                     <span className='Computer' >
        //                         Computer
        //                     </span>
        //                     <span className="percentile" > <span><strong>Proficient </strong></span > </span>
        //                     <span > <CheckIcon className='check' />
        //                     </span>
        //                 </div>
        //             </Grid> */}
        //         </div>
        //     )
        // },
        assessment: (dataPassed: any) => {
            return (
                <Grid container spacing={2} className="assessmentsDiv" key={"assessmentsList_" + stageId}>
                    {
                        dataPassed["assessmentsList_" + stageId]?.map((assessment: any, index: any) => (
                            <>
                                {/* <Grid container justifyContent="space-between" alignItems="center">
                                    <Grid >
                                        <Typography variant="body2" className="ASD">{assessment.titleChange}</Typography>
                                    </Grid>
                                    <Grid >
                                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                                            <span className={`textCS ${assessment.textToAppend}`}>{assessment.textToAppend}</span>
                                            <span className={`percentile`}>{assessment.percentile}</span>
                                            {assessment.addCheckIcon && <CheckIcon sx={{ ml: 1 }} />}
                                        </Typography>
                                    </Grid>
                                </Grid> */}
                                <Grid size={12} key={index + assessment.assessmentcode} className={`rectCard ${assessment.assessmentcode.startsWith(" EMER") ? "emmersion" : ""}`}>
                                    <Grid container justifyContent="space-between" alignItems="center" className={`bgc d-flex justify-content-between ${(assessment.percentile && assessment.percentile != " null") ? `` : `incomplete`}`}>
                                        <div className={`textCS ${assessment.assessmentcode} ${assessment.assessmentcode.startsWith(" EMER") ? "emmersionAssessment" : ""}`}>{assessment.titleChange}</div>
                                        {
                                            (assessment.percentile && assessment.percentile != "null") ? <div className={`percentile`}>{assessment.textToAppend} <strong>{assessment.percentile}{(assessment.assessmentcode === "TT") ? " WPM" : ""}</strong>{assessment.addCheckIcon ? <CheckIcon sx={{ ml: 1 }} /> : ''}
                                            </div>
                                                :
                                                null
                                        }
                                    </Grid>
                                </Grid >
                            </>
                        ))
                    }
                </Grid >
            );
        },

        scheduler: (dataPassed: any) => {
            return dataPassed["schedulerList_" + stageId] ?
                <span className="schedulingDiv">
                    <div>
                        {(dataPassed["schedulerList_" + stageId].start_date) ? dataPassed["schedulerList_" + stageId].start_date : ""}
                    </div>
                    <div>
                        {(dataPassed["schedulerList_" + stageId].start_time) ? dataPassed["schedulerList_" + stageId].start_time + " to " : ""}
                        {(dataPassed["schedulerList_" + stageId].end_time) ? dataPassed["schedulerList_" + stageId].end_time : ""}
                    </div>
                </span>
                :
                null
        },
        videoRecordings: (dataPassed: any) => {
            // return <span>{renderedCellValue}</span>
            return (
                <div className="videoRecordingDiv">
                    {
                        (dataPassed["videoRecordingsList_" + stageId] && dataPassed["videoRecordingsList_" + stageId].answer) ?
                            dataPassed["videoRecordingsList_" + stageId].answer.map((i: { questionid: string, question: string, stageid: string, workflow_job_cand_id: string, videolink: string }, index: number) => <Grid >
                                <label className='fw-7' >{i.question}</label>
                                {/* <div> <PlayArrowIcon onClick={() => showVideo(i.videolink)} /> </div> */}
                            </Grid>
                            )
                            :
                            null
                    }
                </div>
            )
        },
        webinar: (dataPassed: any) => {
            return dataPassed["webinarList_" + stageId] ?
                <div className="webinarDiv">
                    <div>
                        {(dataPassed["webinarList_" + stageId].topic) ? dataPassed["webinarList_" + stageId].topic : ""}
                    </div>
                    <div>
                        {(dataPassed["webinarList_" + stageId].webinar_date) ? dataPassed["webinarList_" + stageId].webinar_date : ""}
                    </div>
                    <div>
                        {
                            (dataPassed["webinarList_" + stageId].iscomplete === "1") ?
                                (dataPassed["webinarList_" + stageId].isattend === "1") ?
                                    <Chip
                                        color="success"
                                        size="small"
                                        icon={<DoneIcon sx={{ fontSize: '14px' }} />}
                                        label='Attended'
                                        sx={{ fontSize: '10px', height: '19px !important' }}
                                    />
                                    :
                                    <Chip
                                        color="error"
                                        size="small"
                                        icon={<CloseIcon sx={{ fontSize: '14px' }} />}
                                        label='Not Attended'
                                        sx={{ fontSize: '10px', height: '19px !important' }}
                                    />
                                :
                                ""
                        }
                    </div>
                </div>
                :
                null
        },
        systemChecker: ({ renderedCellValue }: { renderedCellValue: any }) => {
            return <span>{renderedCellValue}</span>
        }
    }
};


export default WorkflowColumnsData;