import { useEffect, useRef, useState } from '../../../../../shared/modules/React';
import { trackPromise } from '../../../../../shared/modules/PromiseTrackter';
import ApiService from "../../../../../shared/api/api";
import { DateTime } from '../../../../../shared/modules/Luxon';
import { userLocalData } from '../../../../../shared/services/userData';
import Parsable from '../../../../../shared/utils/Parsable';
import { OpenDataCollectionQAs } from '../../../Job/Workflow/DataCollectionQAs';
import masterNodesList from '../../../Settings/AutomationFlow/Stages';
import { ShortlistInterface } from '../ViewCandidate';
import { ShortlistDataType, Stage } from '../ViewCandidateTabs/Shortlist/ShortData';
import { Box } from '../../../../../shared/modules/MaterialImports/Box';
import { Button } from '../../../../../shared/modules/MaterialImports/Button';
import { Grid } from '../../../../../shared/modules/MaterialImports/Grid';
import { Stack } from '../../../../../shared/modules/MaterialImports/Stack';
import { Tooltip } from '../../../../../shared/modules/MaterialImports/ToolTip';
import { Typography } from '../../../../../shared/modules/MaterialImports/Typography';

interface IMatchesShortlistBarProps {
    candidateId: any;
    jobId: any;
}

const MatchesShortlistBar = ({ candidateId, jobId }: IMatchesShortlistBarProps) => {

    const SHORT_LIST_BAR_DATA_KEY = `shortListBar_nodes_${userLocalData.getvalue("clientId")}`;
    const [shortlistData, setShortlistData] = useState<ShortlistInterface>({
        statusLog: [],
        shortlistCurrentStatus: "",
        shortlistPrevStatus: "",
        shortlistLog: {
            candid: "",
            currstatus: "",
            jobid: "",
            nextaction: [
                { name: "", id: "" }
            ],
            prevstatus: "",
            recrid: "",
            statuslog: [{}],
            userid: ""
        },
        openId: "",
        currentStatusName: ""
    });
    const [shortlistBarDataReactFlow, setShortlistBarDataReactFlow] = useState<{ allStagesList: Stage[], currentStatus: string, nextStagesList: Stage[], completedStages: Stage[], defaultStages: Stage[] }>({ allStagesList: [], currentStatus: "", nextStagesList: [], completedStages: [], defaultStages: [] });
    const [selectedCustomStage, setSelectedCustomStage] = useState<any>({});
    const [customStageName, setCustomStageName] = useState<any>({});
    const nodesList = useRef<ShortlistDataType[]>([]);
    const interviewRequestNextStagesList = useRef<Stage[]>([]);
    const offerRequestNextStagesList = useRef<Stage[]>([]);
    const statusBarRef = useRef<HTMLDivElement>(null);

    const [customFormView, setCustomFormView] = useState<{
        json: any,
        stageName: string;
        customStageName: string;
        modelOpen: boolean;
    }>({
        json: [],
        stageName: "",
        customStageName: "",
        modelOpen: false
    });

    useEffect(() => {
        loadShortlistBar(candidateId, jobId);
    }, []);
    useEffect(() => {
        if (shortlistData.openId) {
            getNodesList();
        }
    }, [shortlistData.statusLog]);

    const sorting = () => {
        const currentStatus = (shortlistData.shortlistCurrentStatus) ? shortlistData.shortlistCurrentStatus : "0";
        let tempStagesData = nodesList.current;
        //  [...MasterShortlistData];
        let tempData: any = [];

        let nextStageData: any = [];
        for (let msd = 0; msd < tempStagesData.length; msd++) {
            let tempIconCheck = masterNodesList.find(i => Number(i.id) === Number(tempStagesData[msd].id));
            if (tempIconCheck?.icon) {
                // @ts-ignore
                tempStagesData[msd].data.icon = tempIconCheck.icon;
            }
            tempData.push(tempStagesData[msd].data);
        }
        let currentStage = tempData.find((i: { autoId: string }) => "" + i.autoId === "" + currentStatus);
        if (currentStage?.duplicateId) {
            let tempDupEle = tempData.find((i: { id: string }) => "" + i.id === "" + currentStage.duplicateId);
            if (tempDupEle.id) {
                currentStage = tempDupEle;
            }
        }
        if (currentStage?.id) {
            for (let nsl = 0; nsl < currentStage?.nextStagesList.length; nsl++) {
                let nextStage = tempData.find((i: { id: string }) => i.id === currentStage?.nextStagesList[nsl]);
                if (nextStage?.duplicateId) {
                    let tempDupEle = tempData.find((i: { id: string }) => "" + i.id === "" + nextStage.duplicateId);
                    if (tempDupEle.id) {
                        nextStage = tempDupEle;
                    }
                }
                if (nextStage?.id) {
                    nextStageData.push(nextStage);
                }
            }
        }
        let statusLog = shortlistData.statusLog;
        // console.log(statusLog);
        for (let st = 0; st < statusLog.length; st++) {
            if (statusLog[st].json?.length || statusLog[st]?.json?.isCustomForm || statusLog[st]?.json?.isCustom) {
                let tempFormData = tempData.find((i: { autoId: string }) => "" + i.autoId === "" + statusLog[st].stageId);
                if (tempFormData.isFormEnabled && tempFormData?.formJsonData && Array.isArray(tempFormData.formJsonData)) {
                    let tempAnswers = statusLog[st].json;
                    let tempQuestions = [];

                    for (let q = 0; q < tempAnswers.length; q++) {
                        let questionObj = tempFormData.formJsonData.find((i: { id: string }) => "" + i.id === "" + tempAnswers[q].quesId);
                        if ((questionObj?.labelName || questionObj?.labelValue) || tempAnswers[q]?.answer) {
                            tempQuestions.push({
                                question: (questionObj?.labelName) ? questionObj?.labelName : (questionObj?.labelValue) ? questionObj?.labelValue : '',
                                answer: (tempAnswers[q]?.answer) ? tempAnswers[q].answer : ''
                            });
                        }
                    }
                    statusLog[st].qas = tempQuestions;
                } else if (statusLog[st]?.json?.isCustomForm) {
                    statusLog[st].customJson = statusLog[st]?.json?.jsonData;
                    statusLog[st].customStageName = statusLog[st]?.json?.customStageName;
                    statusLog[st].isCustomForm = statusLog[st]?.json?.isCustomForm;
                } else if (statusLog[st]?.json?.isCustom) {
                    statusLog[st].customJson = statusLog[st]?.json?.json;
                    statusLog[st].customStageName = statusLog[st]?.json?.customForm;
                    statusLog[st].isCustomForm = statusLog[st]?.json?.isCustom;
                }
            }
        }


        let checkCustomStage = statusLog.find((i: { stageId: string }) => "" + i.stageId === "" + currentStatus);
        if (checkCustomStage?.json?.isCustom) {
            let tempCustomStage = { ...checkCustomStage };
            if (tempCustomStage.json?.json) {
                tempCustomStage.json.json = Parsable.isJSON(tempCustomStage.json.json) ? JSON.parse(tempCustomStage.json.json) : tempCustomStage.json.json;
                setCustomStageName((checkCustomStage.json.customForm === "beelineInterview") ? "BMS_Interview" : (checkCustomStage.json.customForm === "beelineOffer") ? "BMS_Assignment" : "");
            }
            setSelectedCustomStage({ ...checkCustomStage, isCustomForm: true, customFormId: (checkCustomStage.json.customForm === "beelineInterview") ? "BMS_Interview" : (checkCustomStage.json.customForm === "beelineOffer") ? "BMS_Assignment" : "" });
            // beelineAssignment
        }
        // const completedStages = tempData.filter(i => i.stageCompleted).sort((a, b) => a.stageOrder - b.stageOrder);
        const defaultStages = tempData.filter((i: { stageTypeButton: boolean; stageOrder: number; }) => i.stageTypeButton).sort((a: { stageTypeButton: boolean; stageOrder: number; }, b: { stageTypeButton: boolean; stageOrder: number; }) => a.stageOrder - b.stageOrder);
        // console.log({ allStagesList: tempData, currentStatus, nextStagesList: nextStageData, completedStages: shortlistData.statusLog, defaultStages: defaultStages });
        setShortlistBarDataReactFlow({ allStagesList: tempData, currentStatus, nextStagesList: nextStageData, completedStages: shortlistData.statusLog, defaultStages: defaultStages });


        let shortListBarData: any = localStorage.getItem(SHORT_LIST_BAR_DATA_KEY);
        // console.log(JSON.parse(JSON.parse(shortListBarData).reactflowJSON));
        if (JSON.parse(JSON.parse(shortListBarData).reactflowJSON)?.nodes) {
            let interviewRequestNextStages: any = [];
            let nodes = JSON.parse(JSON.parse(shortListBarData).reactflowJSON).nodes;
            let interviewRequest = nodes.find((item: any) => item.data.stageLabel === "Interview Request");
            // console.log(interviewRequest);
            let interNextStageIds = interviewRequest?.data?.nextStagesList ? interviewRequest?.data?.nextStagesList : [];
            for (let ir = 0; ir < interNextStageIds.length; ir++) {
                // const element = interviewRequest[ir];
                let nextStage = tempData.find((i: { id: string }) => i.id === interNextStageIds[ir]);
                if (nextStage?.duplicateId) {
                    let tempDupEle = tempData.find((i: { id: string }) => "" + i.id === "" + nextStage.duplicateId);
                    if (tempDupEle.id) {
                        nextStage = tempDupEle;
                    }
                }
                if (nextStage?.id) {
                    interviewRequestNextStages.push(nextStage);
                }
            }
            interviewRequestNextStagesList.current = interviewRequestNextStages;
            // console.log(interviewRequestNextStages);

            let offerRequestNextStages: any = [];
            let offerRequest = nodes.find((item: any) => item.data.stageLabel === "Offer Request");
            // console.log(offerRequest);
            let offerNextStageIds = offerRequest?.data?.nextStagesList ? offerRequest?.data?.nextStagesList : [];
            for (let ir = 0; ir < offerNextStageIds.length; ir++) {
                // const element = interviewRequest[ir];
                let nextStage = tempData.find((i: { id: string }) => i.id === offerNextStageIds[ir]);
                if (nextStage?.duplicateId) {
                    let tempDupEle = tempData.find((i: { id: string }) => "" + i.id === "" + nextStage.duplicateId);
                    if (tempDupEle.id) {
                        nextStage = tempDupEle;
                    }
                }
                if (nextStage?.id) {
                    offerRequestNextStages.push(nextStage);
                }
            }
            offerRequestNextStagesList.current = offerRequestNextStages;
            // console.log(offerRequestNextStages);
        }
        // if (!["", null, undefined].includes(shortListBarData)) {
        //     let data = JSON.parse(shortListBarData);
        //     nodesList.current = JSON.parse(data.reactflowJSON)?.nodes;
        //     sorting();
        // }

        setTimeout(() => {
            if (statusBarRef.current) {
                statusBarRef.current.scrollLeft = statusBarRef.current.scrollWidth;
            }
        }, 1000);
    }

    const getNodesList = () => {
        if (nodesList.current.length) {
            sorting();
        } else {
            let shortListBarData: any = localStorage.getItem(SHORT_LIST_BAR_DATA_KEY);
            if (!["", null, undefined].includes(shortListBarData)) {
                let data = JSON.parse(shortListBarData);
                nodesList.current = JSON.parse(data.reactflowJSON)?.nodes;
                sorting();
            } else {
                trackPromise(
                    ApiService.getById("admin", 'getshortListBar', userLocalData.getvalue('clientId')).then((resp) => {
                        if (resp.data.List?.length) {
                            if (resp.data.List[0]?.reactflowJSON && resp.data.List[0]?.reactflowJSON && JSON.parse(resp.data.List[0]?.reactflowJSON)?.nodes) {
                                nodesList.current = JSON.parse(resp.data.List[0]?.reactflowJSON)?.nodes;
                                localStorage.setItem(SHORT_LIST_BAR_DATA_KEY, JSON.stringify({ ...resp.data.List[0] }))
                                sorting();
                            }
                        }
                    })
                )
            }
        }
    }


    const loadShortlistBar = (cId: any, jId: any) => {
        const c = cId ? cId : candidateId;
        const j = jId ? jId : jobId;
        if (c && j) {
            trackPromise(
                ApiService.postWithData('admin', 'getShortlistLog', { jobId: jobId, userId: candidateId, recrId: userLocalData.getvalue('recrId'), clientId: userLocalData.getvalue('clientId') }).then(
                    (response: any) => {
                        const data = response.data;
                        let tempStatusForDates = data.statusLog;
                        if (tempStatusForDates && tempStatusForDates.length) {
                            for (let td = 0; td < data.statusLog.length; td++) {
                                tempStatusForDates[td].sortDate = new Date(tempStatusForDates[td].statusDate);
                                if (DateTime.fromFormat(tempStatusForDates[td].statusDate.substring(0, 19), 'yyyy-MM-dd hh:mm:ss').isValid) {
                                    tempStatusForDates[td].statusDate = DateTime.fromFormat(tempStatusForDates[td].statusDate.substring(0, 19), 'yyyy-MM-dd hh:mm:ss').toFormat('MM/dd/yyyy HH:mm');
                                }
                                if (tempStatusForDates[td].json) {
                                    tempStatusForDates[td].json = Parsable.isJSON(tempStatusForDates[td].json) ? JSON.parse(tempStatusForDates[td].json) : {};
                                }
                            }
                            tempStatusForDates = tempStatusForDates.sort(
                                (d1: any, d2: any) => Number(d1.sortDate) - Number(d2.sortDate),
                            );
                            data.statusLog = tempStatusForDates;
                        }
                        let currentStatusName = "";
                        if (data.currStatus && data.statusLog?.length) {
                            let tempObj = data.statusLog.find((item: { stageId: string }) => { return Number(item.stageId) === Number(data.currStatus) });
                            if (tempObj?.stageLabel) {
                                currentStatusName = tempObj.stageLabel
                            }
                        }
                        setShortlistData({
                            statusLog: (data.statusLog) ? data.statusLog : [],
                            shortlistCurrentStatus: (data.currStatus) ? data.currStatus : "",
                            shortlistPrevStatus: (data.prevStatus) ? data.prevStatus : "",
                            shortlistLog: data,
                            openId: (data.openId) ? data.openId : "",
                            currentStatusName
                        });
                    }
                ))
        }
    }

    const setSource = (img: any) => {
        try {
            let src = new URL(`../../../../../assets/icons/${img}.svg`, import.meta.url).href;
            if (!src.endsWith('/undefined')) {
                return src
            }
            return new URL(`../../../../../assets/icons/img.svg`, import.meta.url).href;
        }
        catch (err) {
            let src1 = new URL(`../../../../../assets/icons/img.svg`, import.meta.url).href;
            return src1
        }
    }

    const openCustomViewForm = (item: any) => {
        setCustomFormView({ json: item.customJson, stageName: item.stageLabel, customStageName: item.customStageName, modelOpen: true })
    }

    return (
        <Box id="matchesShortlistBar">
            {
                shortlistBarDataReactFlow.completedStages?.length ?
                    <div className={`card`}>
                        <div className='card-inner'>
                            <Box className="statusbar h-10" sx={{ height: "100px !important" }} ref={statusBarRef}>
                                <ul className='status-ul'>
                                    {
                                        shortlistBarDataReactFlow.completedStages && shortlistBarDataReactFlow.completedStages.map((item: any, i: number) => (

                                            <li key={i} className='completed'>
                                                {/* {Number(item.stageId) > 0 ? <DoneIcon className="doneOrClose" /> : <CloseIcon className="doneOrClose" />} */}
                                                {setSource(item.stageLabel) &&
                                                    <Tooltip title={<>
                                                        <Typography className='fs-11 user'>{item.recruiterName}</Typography>
                                                        <Typography className='fs-11 date-text'>on {item.statusDate}</Typography>
                                                    </>}>
                                                        <img
                                                            src={setSource(item.stageLabel)}
                                                            alt={item.stageLabel}
                                                            className={`doneOrClose `}

                                                        />
                                                    </Tooltip>
                                                }
                                                <Stack direction="row" className='imtext-stack'>

                                                    <Box className="status-text">
                                                        {
                                                            (item.isCustomForm) ?
                                                                <Typography className='status cursor-pointer link' onClick={() => {
                                                                    openCustomViewForm(item);
                                                                }}>{item.stageLabel}</Typography>
                                                                :
                                                                (item && item.qas) ?
                                                                    <Typography className='status cursor-pointer link' onClick={() => {
                                                                        OpenDataCollectionQAs(item.qas, item.stageLabel);
                                                                    }}>{item.stageLabel}</Typography>
                                                                    :
                                                                    item.stageLabel?.length > 24 ?
                                                                        <Tooltip title={item.stageLabel}>
                                                                            <Typography className='status'>{item.stageLabel}</Typography>
                                                                        </Tooltip>
                                                                        :
                                                                        <Typography className='status'>{item.stageLabel}</Typography>

                                                        }

                                                    </Box>
                                                </Stack>
                                            </li>
                                        ))

                                    }

                                    {shortlistBarDataReactFlow ? (shortlistBarDataReactFlow?.nextStagesList?.length > 0) && !selectedCustomStage?.stageId &&
                                        <li className='active cusDropdown'>
                                            <Box
                                                id="lock-button"
                                                aria-haspopup="listbox"
                                                aria-controls="lock-menu"
                                            >
                                                <img src={new URL('../../../../../assets/icons/right arrow.svg', import.meta.url).href} alt="" />
                                            </Box>
                                        </li>
                                        : ""
                                    }

                                    {shortlistBarDataReactFlow ? (shortlistBarDataReactFlow?.nextStagesList?.length > 0) && selectedCustomStage?.stageId &&
                                        <li className='active cusDropdown'>
                                            <Box
                                                id="lock-button"
                                                aria-haspopup="listbox"
                                                aria-controls="lock-menu"
                                            >
                                                <img src={new URL('../../../../../assets/icons/right arrow.svg', import.meta.url).href} alt="" />
                                            </Box>
                                        </li>
                                        : ""
                                    }
                                </ul>
                            </Box>
                        </div>


                    </div>
                    :
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                    >
                        {
                            shortlistBarDataReactFlow.defaultStages?.length ?
                                shortlistBarDataReactFlow.defaultStages.map((stage) => {
                                    return <Button key={stage.stageId} color="primary" variant="contained" className="mt-3 ml-4 mb-5 mr-3">{stage.stageLabel}</Button>
                                })
                                :
                                null
                        }
                    </Grid>
            }
        </Box>
    )
}

export default MatchesShortlistBar
