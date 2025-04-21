import { useContext } from "react";
import { useEffect, useRef, useState } from '../../../../../../shared/modules/React';
import { trackPromise } from "../../../../../../shared/modules/PromiseTrackter";

import { userLocalData } from "../../../../../../shared/services/userData";
import ApiService from "../../../../../../shared/api/api";
import { showToaster } from "../../../../../shared/SnackBar/SnackBar";

import { Stack } from "../../../../../../shared/modules/MaterialImports/Stack";
// import { trackPromise } from 'react-promise-tracker';
// import tick from '../../../../../../assets/icons/tick.svg';
// import cross from '../../../../../../assets/icons/cross.svg';

// import ApiService from "../../../../../../shared/api/api"
// import { userLocalData } from "../../../../../../shared/services/userData";
// import DoneIcon from '@mui/icons-material/Done';

import { Dialog, DialogContent, DialogTitle, CloseIcon } from '../../../../../../shared/modules/MaterialImports/Dialog';
import { Divider } from '../../../../../../shared/modules/MaterialImports/Divider';
// import { Card, CardContent } from '../../../../../../shared/modules/MaterialImports/Card';
import { Menu, MenuItem } from '../../../../../../shared/modules/MaterialImports/Menu';
import { Typography } from '../../../../../../shared/modules/MaterialImports/Typography';
import { Box } from '../../../../../../shared/modules/MaterialImports/Box';
import { Tooltip } from '../../../../../../shared/modules/MaterialImports/ToolTip';
import { Grid, Button } from "../../../../../../shared/modules/commonImports";
// import { MasterShortlistData } from "./ShortlistBarData";

import { ShortlistDataType, Stage } from "./ShortData";
import { FormStore } from "../../../../../../App";
import PreviewComponent from "../../../../Letters/Workflow/FormBuilder/Preview/PreviewNew";
// import Parsable from "../../../../../../shared/utils/Parsable";
import { DataCollectionQAsDialog, OpenDataCollectionQAs } from "../../../../Job/Workflow/DataCollectionQAs";
// import { shallow } from 'zustand/shallow';


import './Shortlist.scss';
// import useFormBuilderStore, { FORMBUILDER_STATE } from "../../../../../../shared/store/FormBuilderStore";
import masterNodesList from "../../../../Settings/AutomationFlow/Stages";
import Interview from "./BMS/Interview/Interview";
import ApplyDrawer from "./BMS/Apply/ApplyDrawer";
import AssignmentCreated from "./BMS/AssignmentCreated/AssignmentCreated";
import UserProfile from "./BMS/UserProfile";
import Parsable from "../../../../../../shared/utils/Parsable";
import ViewShortlistCustomForm from "./BMS/ViewShortlistCustomForm/ViewShortlistCustomForm";
// import ArrowDropDownRounded from "@mui/icons-material/ArrowDropDownRounded";
import { useLocation, useNavigate } from "react-router-dom";
import { JobsList, ShortlistInterface } from "../../ViewCandidate";
import { Accordion, AccordionSummary, AccordionDetails } from '../../../../../../shared/modules/MaterialImports/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AgileoneInternalSubmission from "./AgileoneInternalSubmission/AgileoneInternalSubmission";


// interface ShortlistLog {
//     candid: string,
//     currstatus: string,
//     jobid: string,
//     nextStatus: [
//         { statusName: string, statusId: string }
//     ],
//     prevstatus: string,
//     recrid: string,
//     statuslog: [{}],
//     userid: string
// }
// const formBuilderSelector = (state: FORMBUILDER_STATE) => ({
//     formData: state.formData,
//     setFormData: state.setFormData,
//     addField: state.addField,
//     removeField: state.removeField,
//     addMultipleFields: state.addMultipleFields,
//     updateFieldData: state.updateFieldData
// });


const ShortlistBar = (
    { candidateId, jobId, shortlistData, refreshShortlistBar, candidateData, appliedJobs, isInModal = false, handleJobIdChangeThroughModal }:
        {
            candidateId: string, jobId?: string, shortlistData: ShortlistInterface, refreshShortlistBar: any, candidateData: any, isInModal?: boolean, appliedJobs: JobsList, handleJobIdChangeThroughModal: { (jobId: any): void }
        }
) => {
    const SHORT_LIST_BAR_DATA_KEY = `shortListBar_nodes_${userLocalData.getvalue("clientId")}`;
    const navigate = useNavigate();
    const location = useLocation();
    // const { formData, setFormData } = useFormBuilderStore(formBuilderSelector, shallow);

    const [formData, setFormData] = useContext(FormStore);
    const [openFormBuilder, setOpenFormBuilder] = useState(false);
    const [selectedStage, setSelectedStage] = useState<any>({});
    const [selectedCustomStage, setSelectedCustomStage] = useState<any>({});
    const [customStageName, setCustomStageName] = useState<any>({});
    // const [formAnswers, setFormAnswers] = useState({});
    const nodesList = useRef<ShortlistDataType[]>([]);
    const interviewRequestNextStagesList = useRef<Stage[]>([]);
    const offerRequestNextStagesList = useRef<Stage[]>([]);
    const [isJobMenuOpen, setIsJobMenuOpen] = useState(false);
    const jobMenuRef = useRef<any>(null);
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
    })

    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const nextStageMenuItemClicked = (
        // event: React.MouseEvent<HTMLElement>,
        // index: number,
        passedStage: any
    ) => {
        console.log(passedStage);
        // return;

        setAnchorEl(null);
        setSelectedStage(passedStage);
        // console.log(passedStage);
        if (passedStage.isCustomForm) {
            setCustomStageName(passedStage.customFormId);
            setOpenFormBuilder(true);
        } else if (passedStage.isFormEnabled) {
            setCustomStageName("");
            setFormData(passedStage.formJsonData);
            setOpenFormBuilder(true);
        } else {
            setFormData([]);
            shortlistCandidate(passedStage.stageId, passedStage.autoId);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    // const [selectedIndex, setSelectedIndex] = useState(1);
    const open = Boolean(anchorEl);
    const setSource = (img: any) => {
        try {
            let src = new URL(`../../../../../../assets/icons/${img}.svg`, import.meta.url).href;
            if (!src.endsWith('/undefined')) {
                return src
            }
            return new URL(`../../../../../../assets/icons/img.svg`, import.meta.url).href;
        }
        catch (err) {
            let src1 = new URL(`../../../../../../assets/icons/img.svg`, import.meta.url).href;
            return src1
        }
    }

    const [shortlistBarDataReactFlow, setShortlistBarDataReactFlow] = useState<{ allStagesList: Stage[], currentStatus: string, nextStagesList: Stage[], completedStages: Stage[], defaultStages: Stage[] }>({ allStagesList: [], currentStatus: "", nextStagesList: [], completedStages: [], defaultStages: [] });


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
                                // console.log(JSON.parse(resp.data.List[0]?.reactflowJSON)?.nodes);
                                // console.log(JSON.parse(resp.data.List[0]?.userJSON)?.nodes);
                                // console.log(JSON.parse(resp.data.List[0]?.reactflowJSON)?.edges);
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


    useEffect(() => {
        if (shortlistData.openId) {
            getNodesList();
        }
    }, [shortlistData.statusLog]);


    const shortlistCandidate = (stageId: string, autoId: string, json?: any, isCloseFormBuilderPopup?: boolean) => {
        isCloseFormBuilderPopup = isCloseFormBuilderPopup === false ? false : true;

        let apiData = {
            recrId: userLocalData.getvalue("recrId"),
            openId: shortlistData.openId,
            status: autoId,

            clientId: userLocalData.getvalue('clientId'),
            stageId: stageId,
            json: json ? JSON.stringify(json) : ""
        }
        const params = new URLSearchParams();
        params.append("recrId", userLocalData.getvalue("recrId"))
        params.append("openId", shortlistData.openId)
        params.append("status", autoId)

        params.append("clientId", userLocalData.getvalue('clientId'))
        params.append("stageId", stageId)
        params.append("json", json ? JSON.stringify(json) : "")
        console.log(apiData);

        ApiService.postWithData(193, 'Curately/Candidate/shortlistSave.jsp', params).then(
            // ApiService.postWithData('admin', 'shortListSave', apiData).then(
            (response: any) => {
                // console.log(response)
                if (response.data.Message === "Success") {
                    showToaster("Candidate status has been Updated  ", 'success');
                    if (isCloseFormBuilderPopup) {
                        closeFormBuilderPopup();
                    }
                    refreshShortlistBar();
                    // handleDialogClose();
                } else {
                    showToaster(response.data.Message, 'error');
                }
            })
    }

    const saveFormBuilderData = (data: any, completeJson: any) => {
        // console.log(data);
        // console.log(completeJson);
        // return;

        shortlistCandidate(selectedStage?.stageId, selectedStage?.autoId, completeJson);
    }

    const closeFormBuilderPopup = () => {
        setOpenFormBuilder(false);
    };

    const getCustomStage = () => {
        if (customStageName === "BMS_InternalSubmission") {
            return <UserProfile
                candidateData={candidateData}
                closePopup={() => { setCustomStageName(""); setOpenFormBuilder(false) }}
                open={openFormBuilder}
                saveData={
                    (json) => {
                        setCustomStageName("");
                        setOpenFormBuilder(false);
                        shortlistCandidate(selectedStage.stageId, selectedStage.autoId, { jsonData: { ...json }, isCustomForm: true, customStageName: customStageName });
                    }}
                candidateId={candidateId}
                clientSubmission={false}
                completedStages={[]}
            />
        } else if (customStageName === "BMS_ClientSubmission") {

            return <ApplyDrawer
                openApply={openFormBuilder}
                handleDrawerClose={() => { setCustomStageName(""); setOpenFormBuilder(false) }}
                candidateData={candidateData}
                saveData={(json, stageId, isCloseFormBuilderPopup = true) => {
                    if (isCloseFormBuilderPopup !== false) {
                        setCustomStageName("");
                        setOpenFormBuilder(false);
                    }
                    shortlistCandidate(stageId ? stageId : selectedStage.stageId, selectedStage.autoId, {
                        jsonData: { ...json }, isCustomForm: true,
                        customStageName: isCloseFormBuilderPopup ? customStageName : "BMS_InternalSubmission"
                    }, isCloseFormBuilderPopup);
                }}
                candidateId={candidateId}
                completedStages={shortlistData.statusLog}
            />
        } else if (customStageName === "BMS_Interview") {
            return <Interview
                closePopup={() => { setCustomStageName(""); setOpenFormBuilder(false) }}
                open={openFormBuilder}
                candidateId={candidateId}
                saveData={
                    (acceptOrReject: "Accept" | "Reject") => {
                        setCustomStageName("");
                        setSelectedCustomStage({});
                        setOpenFormBuilder(false);
                        // shortlistCandidate(selectedStage.stageId, selectedStage.autoId);
                        // setTimeout(() => {
                        let stageToCall: any;
                        if (acceptOrReject === "Accept") {
                            if (interviewRequestNextStagesList.current.find((item) => item.stageName === "Interview")?.stageId) {
                                stageToCall = interviewRequestNextStagesList.current.find((item) => item.stageName === "Interview");
                                shortlistCandidate(stageToCall.stageId, stageToCall.autoId);
                            }
                        } else if (acceptOrReject === "Reject") {
                            if (interviewRequestNextStagesList.current.find((item) => item.stageName === "Reject")?.stageId) {
                                stageToCall = interviewRequestNextStagesList.current.find((item) => item.stageName === "Reject");
                                shortlistCandidate(stageToCall.stageId, stageToCall.autoId);
                            }

                        }
                        // }, 1500);
                    }
                }
                interviewData={selectedCustomStage.json.json}
            />
        } else if (customStageName === "BMS_Assignment") {
            return <AssignmentCreated
                closePopup={() => { setCustomStageName(""); setOpenFormBuilder(false) }}
                open={openFormBuilder}
                saveData={
                    (acceptOrReject: "Accept" | "Reject") => {
                        setCustomStageName("");
                        setOpenFormBuilder(false);
                        setSelectedCustomStage({});
                        // shortlistCandidate(selectedStage.stageId, selectedStage.autoId);
                        let stageToCall: any;
                        if (acceptOrReject === "Accept") {
                            if (offerRequestNextStagesList.current.find((item) => item.stageName === "Offer")?.stageId) {
                                stageToCall = offerRequestNextStagesList.current.find((item) => item.stageName === "Offer");
                                shortlistCandidate(stageToCall.stageId, stageToCall.autoId);
                            }
                        } else if (acceptOrReject === "Reject") {
                            if (offerRequestNextStagesList.current.find((item) => item.stageName === "Client Reject")?.stageId) {
                                stageToCall = offerRequestNextStagesList.current.find((item) => item.stageName === "Client Reject");
                                shortlistCandidate(stageToCall.stageId, stageToCall.autoId);
                            }
                        }

                    }
                }
                assignmentData={selectedCustomStage.json.json}

            />
        } else if (customStageName === "AGILEONE_InternalSubmission") {
            return <AgileoneInternalSubmission
                candidateData={candidateData}
                closePopup={() => { setCustomStageName(""); setOpenFormBuilder(false) }}
                open={openFormBuilder}
                saveData={
                    (json) => {
                        setCustomStageName("");
                        setOpenFormBuilder(false);
                        shortlistCandidate(selectedStage.stageId, selectedStage.autoId, { jsonData: { ...json }, isCustomForm: true, customStageName: customStageName });
                    }}
                candidateId={candidateId}
                openId={shortlistData.openId}
                jobId={jobId || ""}
            />
            // <UserProfile
            //     candidateData={candidateData}
            //     closePopup={() => { setCustomStageName(""); setOpenFormBuilder(false) }}
            //     open={openFormBuilder}
            //     saveData={
            //         (json) => {
            //             setCustomStageName("");
            //             setOpenFormBuilder(false);
            //             shortlistCandidate(selectedStage.stageId, selectedStage.autoId, { jsonData: { ...json }, isCustomForm: true, customStageName: customStageName });
            //         }}
            //     candidateId={candidateId}
            //     clientSubmission={false}
            //     completedStages={[]}
            // />
        }
        return <></>
    }
    const openCustomViewForm = (item: any) => {
        setCustomFormView({ json: item.customJson, stageName: item.stageLabel, customStageName: item.customStageName, modelOpen: true })
    }


    const handleJobMenuClick = (data: { jobTitle: string, jobId: number }) => {
        if (isInModal) {
            handleJobIdChangeThroughModal(data.jobId);
        } else {
            if (Number(data.jobId) !== Number(jobId)) {
                navigate(`/${userLocalData.getvalue("clientName")}/candidate/view/${candidateId}/${data.jobId}`,
                    {
                        state: {
                            data: location?.state?.data || []
                        }
                    });
            }
        }
        setIsJobMenuOpen(false);
    }



    return (
        <Box className="shortListBarAccordion customCard p-0" sx={{ minHeight: '48px !important' }}>
            <Accordion defaultExpanded>
                {/* <Card className="customCard p-0 mb-3" > */}
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    className="m-0"
                    sx={{ minHeight: '48px !important' }}
                >

                    {(shortlistData?.jobTitle || appliedJobs?.currentJob?.jobTitle) &&
                        <Stack direction={"row"} alignItems={"flex-start"} className="shortlistBar-jobIds-container">
                            <h4 className="my-0">Application Processing for
                                {<Button ref={jobMenuRef} disableRipple className='mt-0. ml-1'>
                                    {`${jobId} - ${shortlistData?.jobTitle || appliedJobs?.currentJob?.jobTitle} ${appliedJobs.currentJob.statusName ? `(${appliedJobs.currentJob.statusName})` : shortlistData.currentStatusName ? `(${shortlistData.currentStatusName})` : ''}`}
                                </Button>}
                                {/* {
                                isInModal ?
                                    <Button ref={jobMenuRef} disableRipple className='mt-0'>
                                        {`${jobId} - ${appliedJobs.currentJob.jobTitle} ${appliedJobs.currentJob.statusName ? `(${appliedJobs.currentJob.statusName})` : shortlistData.currentStatusName ? `(${shortlistData.currentStatusName})` : ''}`}
                                    </Button>
                                    :
                                    appliedJobs.jobsList.length ?
                                        <>
                                            <Button ref={jobMenuRef} onClick={() => setIsJobMenuOpen(true)} disableRipple
                                                endIcon={<ArrowDropDownRounded fontSize="large" />}>
                                                {`${jobId} - ${appliedJobs.currentJob.jobTitle} ${appliedJobs.currentJob.statusName ? `(${appliedJobs.currentJob.statusName})` : shortlistData.currentStatusName ? `(${shortlistData.currentStatusName})` : ''}`}
                                            </Button>
                                            <Menu open={isJobMenuOpen} anchorEl={jobMenuRef.current} onClose={() => { setIsJobMenuOpen(false) }} className="jobData-container"
                                                sx={{ height: (!!appliedJobs.jobsList.length && appliedJobs.jobsList.length > 6) ? "15rem" : "auto" }}>
                                                {appliedJobs.jobsList.map((item, index: number) => (
                                                    <MenuItem key={index} onClick={() => handleJobMenuClick(item)}>
                                                        {item.jobId} - {item.jobTitle} {item.statusName ? `(${item.statusName})` : ''}
                                                    </MenuItem>
                                                ))}
                                            </Menu>
                                        </>
                                        :
                                        <Button ref={jobMenuRef} disableRipple className='mt-0'>
                                            {`${jobId} - ${appliedJobs.currentJob.jobTitle} ${appliedJobs.currentJob.statusName ? `(${appliedJobs.currentJob.statusName})` : shortlistData.currentStatusName ? `(${shortlistData.currentStatusName})` : ''}`}
                                        </Button>


                            } */}
                            </h4>
                        </Stack>}
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                    {
                        // (shortlistBarDataReactFlow.currentStatus === "0") ?
                        shortlistBarDataReactFlow.completedStages?.length ?
                            <div className={`card`}>
                                <div className='card-inner'>
                                    <Box className="statusbar h-80" ref={statusBarRef}>
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
                                                                    // onClick={() => checkAction(item.stageId)}
                                                                    // ${item?.qas?.length ? 'cursor-pointer' : ''}
                                                                    className={`doneOrClose `}

                                                                />
                                                            </Tooltip>
                                                        }
                                                        <Stack direction="row" className='imtext-stack'>
                                                            {/* <Box className="icon-wrap">
                                                                
                                                            </Box> */}
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
                                                        aria-expanded={open ? 'true' : undefined}
                                                        onClick={handleClickListItem}
                                                    >
                                                        <img src={new URL('../../../../../../assets/icons/right arrow.svg', import.meta.url).href} alt="" />
                                                    </Box>
                                                    <Menu
                                                        id="lock-menu"
                                                        anchorEl={anchorEl}
                                                        open={open}
                                                        onClose={handleClose}
                                                        MenuListProps={{
                                                            'aria-labelledby': 'lock-button',
                                                            role: 'listbox',
                                                        }}
                                                    >
                                                        {shortlistBarDataReactFlow.nextStagesList.map((option, index: number) => (
                                                            <MenuItem
                                                                key={index + option.stageLabel}
                                                                onClick={() => nextStageMenuItemClicked(option)}
                                                            >
                                                                <Stack direction="row" alignItems="center">
                                                                    <Box sx={{ width: 20 }} mr={1}>

                                                                        {setSource(option.stageLabel) &&
                                                                            <img src={setSource(option.stageLabel)} alt={option.stageLabel} className='can-svgimg' />
                                                                        }
                                                                    </Box>
                                                                    <Typography>{option.stageLabel}</Typography>
                                                                </Stack>
                                                            </MenuItem>
                                                        ))}
                                                    </Menu>
                                                </li>
                                                : ""
                                            }
                                            {shortlistBarDataReactFlow ? (shortlistBarDataReactFlow?.nextStagesList?.length > 0) && selectedCustomStage?.stageId &&
                                                <li className='active cusDropdown'>
                                                    <Box
                                                        id="lock-button"
                                                        aria-haspopup="listbox"
                                                        aria-controls="lock-menu"
                                                        aria-expanded={open ? 'true' : undefined}
                                                        onClick={() => nextStageMenuItemClicked(selectedCustomStage)}
                                                    >
                                                        <img src={new URL('../../../../../../assets/icons/right arrow.svg', import.meta.url).href} alt="" />
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
                                            return <Button key={stage.stageId} color="primary" variant="contained" className="mt-3 ml-4 mb-5 mr-3" onClick={() => nextStageMenuItemClicked(stage)}>{stage.stageLabel}</Button>
                                        })
                                        :
                                        null
                                }
                            </Grid>
                    }
                </AccordionDetails>
                {/* </CardContent> */}
            </Accordion>
            {/* </Card> */}
            <DataCollectionQAsDialog />

            <Dialog open={openFormBuilder} onClose={closeFormBuilderPopup} className='formBuilder Instructions' fullWidth maxWidth={customStageName ? 'md' : 'xl'}>
                <DialogTitle
                    className='py-2'
                >
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <span>
                            {selectedStage?.stageName ? selectedStage?.stageName : selectedStage?.stageLabel}
                        </span>
                        <span onClick={closeFormBuilderPopup} className="closePopup">
                            <CloseIcon />
                        </span>
                    </Grid>
                </DialogTitle>
                <Divider />
                <DialogContent sx={{ p: 0, backgroundColor: customStageName ? 'var(--c-neutral-20)' : 'none' }}>
                    {
                        customStageName ?
                            getCustomStage()
                            :
                            openFormBuilder ?
                                <PreviewComponent formId={""} formNamePassed={""} isPreview={false} saveCandidateData={saveFormBuilderData} isShowOneByOne={false} formAnswers={{}} />
                                :
                                null
                    }
                </DialogContent>
            </Dialog>

            <Dialog open={customFormView.modelOpen} onClose={() => setCustomFormView({ json: [], stageName: "", customStageName: "", modelOpen: false })} className='formBuilder Instructions' fullWidth maxWidth={customStageName ? 'md' : 'xl'}>
                <DialogTitle
                    className='py-2'
                >
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <span>
                            {customFormView?.stageName ? customFormView?.stageName : ""}
                        </span>
                        <span onClick={() => setCustomFormView({ json: [], stageName: "", customStageName: "", modelOpen: false })} className="closePopup">
                            <CloseIcon />
                        </span>
                    </Grid>
                </DialogTitle>
                <Divider />
                <DialogContent sx={{ p: 0 }}>
                    <ViewShortlistCustomForm customStageName={customFormView.customStageName} json={customFormView.json} />
                </DialogContent>
            </Dialog>
        </Box>
    )
}

export default ShortlistBar;