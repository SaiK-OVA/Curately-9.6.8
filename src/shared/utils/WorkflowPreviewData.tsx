import { DateTime } from "luxon";
import { StageInterface } from "../../components/Dashboard/Job/Workflow/Workflow";


const WorkflowPreviewData = {
    async parseApplicantsData(data: any, masterStagesList: StageInterface[]) {
        let processedData = data;
        let candidatesData = processedData.applicants;

        if (processedData) {

            let assessmentsList = processedData.assessments || [];
            for (let al = 0; al < assessmentsList?.length; al++) {
                let selectedAssessmentIndex = candidatesData.findIndex((o: any) => o.workflow_job_cand_id === assessmentsList[al].workflow_job_cand_id);
                assessmentsList[al].assessmentsjson = (assessmentsList[al].assessmentsjson && assessmentsList[al].assessmentsjson.trim()) ? JSON.parse(assessmentsList[al].assessmentsjson) : {};
                if (selectedAssessmentIndex !== -1) {
                    assessmentsList[al].percentile = this.getPercentile(assessmentsList[al].assessmentcode, assessmentsList[al].count, assessmentsList[al].assessmentsjson)
                    if (assessmentsList[al].assessmentcode === "CCAT") {
                        assessmentsList[al].assessmentcode = "GAME";
                        assessmentsList[al].percentile = this.getPercentile(assessmentsList[al].assessmentcode, assessmentsList[al].count, assessmentsList[al].assessmentsjson)
                        assessmentsList[al].titleChange = "Aptitude";
                        assessmentsList[al].textToAppend = "Percentile";
                        if (assessmentsList[al].percentile && assessmentsList[al].percentile !== "null") {
                            assessmentsList[al].aptitudeCompleted = true;
                        }
                        if (parseInt(assessmentsList[al].percentile) > 41) {
                            assessmentsList[al].addCheckIcon = true;
                        }
                    } else if (assessmentsList[al].assessmentcode === "Word 16") {
                        assessmentsList[al].titleChange = "Word";
                    } else if (assessmentsList[al].assessmentcode === "CLIK") {
                        assessmentsList[al].titleChange = "Computer";
                        assessmentsList[al].computerAttempted = true;
                        if (assessmentsList[al].percentile && assessmentsList[al].percentile !== "null") {
                            assessmentsList[al].computerCompleted = true;
                        }
                        if (assessmentsList[al].percentile === "Proficient" || assessmentsList[al].percentile === "Highly Proficient") {
                            assessmentsList[al].addCheckIcon = true;
                        }
                    } else if (assessmentsList[al].assessmentcode === "Excel 16") {
                        assessmentsList[al].titleChange = "Excel";
                    } else if (assessmentsList[al].assessmentcode === "TT") {
                        assessmentsList[al].titleChange = "Typing";
                    } else if (assessmentsList[al].assessmentcode === "TKT") {
                        assessmentsList[al].titleChange = "Ten Key";
                    } else if (assessmentsList[al].assessmentcode.startsWith("EMER")) {
                        if (assessmentsList[al].name) {
                            assessmentsList[al].titleChange = assessmentsList[al].name
                        }
                    }
                    assessmentsList[al].emmersionAssessment = (assessmentsList[al].assessmentcode.startsWith("EMER")) ? false : true;

                    assessmentsList[al].inComplete = (assessmentsList[al].percentile && assessmentsList[al].percentile !== "null") ? false : true;

                    if (candidatesData[selectedAssessmentIndex]['assessmentsList_' + assessmentsList[al].stageid] && candidatesData[selectedAssessmentIndex]['assessmentsList_' + assessmentsList[al].stageid].length) {
                        candidatesData[selectedAssessmentIndex]['assessmentsList_' + assessmentsList[al].stageid].push(assessmentsList[al]);
                    } else {
                        candidatesData[selectedAssessmentIndex]['assessmentsList_' + assessmentsList[al].stageid] = [assessmentsList[al]];
                    }
                    if (assessmentsList[al].assessmentcode === "GAME") {
                        let tempAssess = { ...assessmentsList[al] };
                        tempAssess.assessmentcode = "EPP";
                        tempAssess.percentile = this.getPercentile(tempAssess.assessmentcode, tempAssess.count, tempAssess.assessmentsjson)
                        tempAssess.titleChange = "Personality";
                        tempAssess.textToAppend = "% Match";
                        if (tempAssess.percentile && tempAssess.percentile !== "null") {
                            tempAssess.personalityCompleted = true;
                        }
                        if (parseInt(tempAssess.percentile) > 59) {
                            tempAssess.addCheckIcon = true;
                        }

                        if (candidatesData[selectedAssessmentIndex]['assessmentsList_' + tempAssess.stageid] && candidatesData[selectedAssessmentIndex]['assessmentsList_' + tempAssess.stageid].length) {
                            candidatesData[selectedAssessmentIndex]['assessmentsList_' + tempAssess.stageid].push(tempAssess);
                        } else {
                            candidatesData[selectedAssessmentIndex]['assessmentsList_' + tempAssess.stageid] = [tempAssess];
                        }
                    }
                }
            }

            let dataCollectionList = processedData.datacollection || [];
            for (let dc = 0; dc < dataCollectionList.length; dc++) {
                let selectedDataCollectionIndex = candidatesData.findIndex((o: any) => o.workflow_job_cand_id === dataCollectionList[dc].workflow_job_cand_id);
                dataCollectionList[dc].answer = dataCollectionList[dc].answer ? JSON.parse(dataCollectionList[dc].answer) : [];
                dataCollectionList[dc].question = dataCollectionList[dc].question ? JSON.parse(dataCollectionList[dc].question) : {};
                // console.log(dataCollectionList[dc].answer);
                // console.log(dataCollectionList[dc].question);
                if (selectedDataCollectionIndex !== -1) {
                    dataCollectionList[dc].totalWeightedQuestions = 0;
                    dataCollectionList[dc].correctWeightedQuestions = 0;
                    if (dataCollectionList[dc].question && dataCollectionList[dc].question.components) {
                        let totalPoints: number = 0;
                        let earnedPoints: number = 0;
                        for (let cda = 0; cda < dataCollectionList[dc].answer.length; cda++) {
                            let questionObj = dataCollectionList[dc].question.components.find((q: { id: string }) => { return q.id + "" === dataCollectionList[dc].answer[cda].quesId + "" });
                            dataCollectionList[dc].answer[cda].question = (questionObj && questionObj.labelName) ? questionObj.labelName : "";
                            if (questionObj?.fieldType === "weightedmultiplechoice") {
                                totalPoints = totalPoints + Number(questionObj.weightedPoints);
                                dataCollectionList[dc].answer[cda].correctAns = questionObj.weightedCorrectAnswer;
                                dataCollectionList[dc].totalWeightedQuestions = dataCollectionList[dc].totalWeightedQuestions + 1;
                                if (dataCollectionList[dc].answer[cda].answer === dataCollectionList[dc].answer[cda].correctAns) {
                                    dataCollectionList[dc].correctWeightedQuestions = dataCollectionList[dc].correctWeightedQuestions + 1;
                                    earnedPoints = earnedPoints + Number(questionObj.weightedPoints);
                                }
                                dataCollectionList[dc].totalPoints = totalPoints;
                                dataCollectionList[dc].earnedPoints = earnedPoints;
                            }
                        }

                    }

                    candidatesData[selectedDataCollectionIndex]['dataCollectionList_' + dataCollectionList[dc].stageid] = dataCollectionList[dc];
                    // if (candidatesData[selectedDataCollectionIndex].dataCollectionList && candidatesData[selectedDataCollectionIndex].dataCollectionList.length) {
                    //     candidatesData[selectedDataCollectionIndex].dataCollectionList.push(dataCollectionList[dc]);
                    // } else {
                    //     candidatesData[selectedDataCollectionIndex].dataCollectionList = [dataCollectionList[dc]];
                    // }
                }
            }


            let documentSigningList = processedData.documentsigning || [];
            for (let ds = 0; ds < documentSigningList.length; ds++) {
                let selectedDocumentSignIndex = candidatesData.findIndex((o: any) => o.workflow_job_cand_id === documentSigningList[ds].workflow_job_cand_id);

                if (selectedDocumentSignIndex !== -1) {
                    if (documentSigningList[ds].downloadlink && documentSigningList[ds].templateid) {
                        candidatesData[selectedDocumentSignIndex]['documentSigningList_' + documentSigningList[ds].stageid] = documentSigningList[ds];
                    }
                }
            }

            let schedulerList = processedData.scheduler || [];
            for (let sc = 0; sc < schedulerList.length; sc++) {
                let selectedSchedulerIndex = candidatesData.findIndex((o: any) => o.workflow_job_cand_id === schedulerList[sc].workflow_job_cand_id);
                if (selectedSchedulerIndex !== -1) {
                    schedulerList[sc].start_date = (schedulerList[sc].start_time && schedulerList[sc].start_time.trim()) ? DateTime.fromISO(schedulerList[sc].start_time, { zone: 'utc' }).minus({ hours: 4 }).toFormat('MM/dd/yyyy') : "";
                    schedulerList[sc].start_time = (schedulerList[sc].start_time && schedulerList[sc].start_time.trim()) ? DateTime.fromISO(schedulerList[sc].start_time, { zone: 'utc' }).minus({ hours: 4 }).toFormat('h:mm') + ' EST' : "";

                    schedulerList[sc].end_time = (schedulerList[sc].end_time && schedulerList[sc].end_time.trim()) ? DateTime.fromISO(schedulerList[sc].end_time, { zone: 'utc' }).minus({ hours: 4 }).toFormat('h:mm a') + ' EST' : "";


                    candidatesData[selectedSchedulerIndex]['schedulerList_' + schedulerList[sc].stageid] = schedulerList[sc];
                }
            }


            let stagesList = processedData.stages || [];
            for (let sl = 0; sl < stagesList.length; sl++) {
                let selectedStagesIndex = candidatesData.findIndex((o: any) => o.workflow_job_cand_id === stagesList[sl].workflow_job_cand_id);
                if (selectedStagesIndex !== -1) {
                    if (candidatesData[selectedStagesIndex].stagesList && candidatesData[selectedStagesIndex].stagesList.length) {
                        candidatesData[selectedStagesIndex].stagesList.push(stagesList[sl]);
                    } else {
                        candidatesData[selectedStagesIndex].stagesList = [stagesList[sl]];
                    }
                }
            }


            let videoRecordingsList = processedData.videorecordings || [];
            for (let sl = 0; sl < videoRecordingsList.length; sl++) {
                let selectedvideoRecordingsIndex = candidatesData.findIndex((o: any) => o.workflow_job_cand_id === videoRecordingsList[sl].workflow_job_cand_id);
                if (selectedvideoRecordingsIndex !== -1) {
                    // candidatesData[selectedvideoRecordingsIndex]['videoRecordingsList_' + videoRecordingsList[sl].stageid] = videoRecordingsList[sl];
                    if (candidatesData[selectedvideoRecordingsIndex]['videoRecordingsList_' + videoRecordingsList[sl].stageid] && candidatesData[selectedvideoRecordingsIndex]['videoRecordingsList_' + videoRecordingsList[sl].stageid].length) {
                        candidatesData[selectedvideoRecordingsIndex]['videoRecordingsList_' + videoRecordingsList[sl].stageid].push(videoRecordingsList[sl]);
                    } else {
                        candidatesData[selectedvideoRecordingsIndex]['videoRecordingsList_' + videoRecordingsList[sl].stageid] = [videoRecordingsList[sl]];
                    }
                }
            }


            let webinarList = processedData.webinar || [];
            for (let sl = 0; sl < webinarList.length; sl++) {
                let selectedWebinarIndex = candidatesData.findIndex((o: any) => o.workflow_job_cand_id === webinarList[sl].workflow_job_cand_id);
                if (selectedWebinarIndex !== -1) {

                    webinarList[sl].webinar_date = (webinarList[sl].webinar_date && webinarList[sl].webinar_date.trim()) ? DateTime.fromFormat(webinarList[sl].webinar_date.substring(0, 19), 'yyyy-MM-dd HH:mm:ss').toFormat('MMMM dd, yyyy hh:mm a') : "";


                    candidatesData[selectedWebinarIndex]['webinarList_' + webinarList[sl].stageid] = webinarList[sl];
                    // if (candidatesData[selectedWebinarIndex].webinarList && candidatesData[selectedWebinarIndex].webinarList.length) {
                    //     candidatesData[selectedWebinarIndex].webinarList.push(webinarList[sl]);
                    // } else {
                    //     candidatesData[selectedWebinarIndex].webinarList = [webinarList[sl]];
                    // }
                }
            }
            // ["13","3","12","7","2","6"]

            for (let cd = 0; cd < candidatesData.length; cd++) {
                candidatesData[cd].recruiterShortName = this.getShortName(candidatesData[cd].recruitername);
                candidatesData[cd].nextStageList = [];
                candidatesData[cd].masterStagesList = [...masterStagesList].filter((i) => {
                    return ["2", "3", "6", "7", "8", "9", "10", "12", "13", "15"].includes(i.stageTypeId)
                });

                if (!candidatesData[cd].stageid && stagesList && stagesList.length) {
                    let toGetStageId = stagesList.find((obj: any) => {
                        return ((obj.workflow_job_cand_id === candidatesData[cd].workflow_job_cand_id) && (obj.statusid === "2"))
                    })
                    if (toGetStageId && toGetStageId.stageid) {
                        candidatesData[cd].stageid = toGetStageId.stageid;
                    }
                }


                let tempMasterStagesList = [...candidatesData[cd].masterStagesList];
                let currentStageIndex = tempMasterStagesList.findIndex(obj => obj.stageId === candidatesData[cd].stageid);
                if ((currentStageIndex > -1) && tempMasterStagesList.length) {
                    candidatesData[cd].position = tempMasterStagesList[currentStageIndex].position;
                    candidatesData[cd].nextStageList = tempMasterStagesList.slice(currentStageIndex + 1);
                }
                if (candidatesData[cd].nextStageList.length) {
                    candidatesData[cd].nextStageId = candidatesData[cd].nextStageList[0].stageId;
                }

                let noShow = false;
                for (let ms = 0; ms < candidatesData[cd].masterStagesList.length; ms++) {
                    let selectedStageObj = candidatesData[cd]?.stagesList?.find((o: any) => o.stageid === candidatesData[cd].masterStagesList[ms].stageId);
                    if (selectedStageObj && selectedStageObj.statusid) {
                        candidatesData[cd].masterStagesList[ms].statusId = selectedStageObj.statusid;
                        candidatesData[cd].masterStagesList[ms].isCompleted = (selectedStageObj.statusid === "3") && !noShow ? true : false;
                        candidatesData[cd].masterStagesList[ms].isHide = (selectedStageObj.statusid === "1") ? true : noShow;
                        if (selectedStageObj.statusid === "2") {
                            noShow = true;
                        }

                    } else {
                        candidatesData[cd].masterStagesList[ms].isCompleted = false;
                        candidatesData[cd].masterStagesList[ms].isHide = true;
                    }
                }
            }

        }
        return {
            ...processedData,
            applicants: candidatesData
        };
    },
    getPercentile(code: string, count: string, json: any) {

        let tempPercentile = "";
        // let tempJson = (json && json.trim()) ? JSON.parse(json) : {};

        if (count && json) {
            if ((json[count + " score"] && json[count + " score"]["scores"]) || code.startsWith("EMER")) {
                if (code === "Excel 16") {
                    tempPercentile = json[count + " score"]["scores"]["Excel16Percentile"];
                }
                else if (code === "Word 16") {
                    tempPercentile = json[count + " score"]["scores"]["Word16Percentile"];
                }
                //else if(code === "TKT"){
                //  tempPercentile = json[count + " score"]["scores"]["Word16Percentile"];
                // }
                else if (code === "CLIK") {
                    tempPercentile = json[count + " score"]["scores"]["CLIKRanking"];
                }
                else if (code === "TT") {
                    // tempPercentile = "<span title='Words per Minute'>" + json[count + " score"]["scores"]["TTWordsPerMinute"] + " WPM</span>";
                    tempPercentile = json[count + " score"]["scores"]["TTWordsPerMinute"];
                    // TTPercentile
                }
                else if (code === "TKT") {
                    tempPercentile = json[count + " score"]["scores"]["TenKeyAccuracy"];
                }
                else if (code === "CCAT") {
                    tempPercentile = json[count + " score"]["scores"]["GAMEPercentile"] + "," + json[count + " score"]["scores"]["EPPPercentMatch"];
                }
                else if (code === "GAME") {
                    tempPercentile = json[count + " score"]["scores"]["GAMEPercentile"];
                }
                else if (code === "EPP") {
                    tempPercentile = json[count + " score"]["scores"]["EPPPercentMatch"];
                } else if (code.startsWith("EMER")) {
                    // console.log(json);
                    tempPercentile = json.score;
                    // if (assessmentList.name) {
                    //     titleChange = assessmentList.name
                    // }
                }
            }
        }
        return tempPercentile;
    },
    getShortName(name: string) {
        if (name && name.split(' ')[0][0] && name.split(' ')[1][0]) {
            return name ? `${name.split(' ')[0][0]}${name.split(' ')[1][0]}` : "";
        }
        return '';
    }

}

export default WorkflowPreviewData;