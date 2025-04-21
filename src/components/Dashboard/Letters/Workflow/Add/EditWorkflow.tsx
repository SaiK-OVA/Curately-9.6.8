import { React, useState, useEffect, useRef } from '../../../../../shared/modules/React';
import { Box } from '../../../../../shared/modules/MaterialImports/Box';
// import CssBaseline from '@mui/material/CssBaseline';
// import shortid from 'shortid';
// import { DragDropContext, Droppable } from "@hello-pangea/dnd";

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// import StageCard from './StageCard/StageCard';

import { IconButton, Grid, Button } from '../../../../../shared/modules/commonImports';
// import masterStagesList from '../../../shared/data/Stages';
import AddStageModal from './AddStageModal/AddStageModal';
import AddStageTemplate from './AddStageTemplate/AddStageTemplate';
import { Divider } from '../../../../../shared/modules/MaterialImports/Divider';
import { Link, useNavigate, useParams } from 'react-router-dom';

import ApiService from '../../../../../shared/api/api';
import { trackPromise } from '../../../../../shared/modules/PromiseTrackter';
import Trigger from '../Stages/Trigger/Trigger';
// import AddMessageBox from '../PopUps/AddMessageBox/AddMessageBox';=
import { StageInterface } from './AddWorkflow';

// import VirtualStageList from './Virtual/VirtualStageList/VirtualStageList';
import LockIcon from '@mui/icons-material/Lock';

import AddMessageBox from '../PopUps/AddMessageBox/AddMessageBox';
import AutomaticMoveRule from '../PopUps/AutomaticMoveRule/AutomaticMoveRule';
import StageTitle from '../PopUps/StageTitle/StageTitle';

// import DndKit from './Virtual/DndKit/DndKit';
import { SortableList } from './Virtual/DndKit/SortableList';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';


// import { ReactComponent as DragIcon } from "./Virtual/DndKit/drag_indicator.svg";

import DragHandleIcon from '@mui/icons-material/DragHandle';
import { Card } from '../../../../../shared/modules/MaterialImports/Card';


// import './AddWorkflow.scss';
import './EditWorkflow.scss';

import './Virtual/DndKit/DndKit.scss';
import { getStageIcon } from '../../../../../shared/modules/stageicon';
import { ConfirmDialog, confirmDialog } from '../../../../shared/ConfirmDialog/ConfirmDialog';
import { showToaster } from '../../../../shared/SnackBar/SnackBar';
import { userLocalData } from '../../../../../shared/services/userData';
import { ContinuousLoader } from '../../../../shared/ContinuousLoader/ContinuousLoader';


// const SystemChecker = React.lazy(() => import('../Stages/SystemChecker/SystemChecker'));
// const FilterStage = React.lazy(() => import('../Stages/FilterStage/FilterStage'));
// const Assessment = React.lazy(() => import('../Stages/Assessment/Assessment'));
// const Approved = React.lazy(() => import('../Stages/Approved/Approved'));
// const ClientSubmission = React.lazy(() => import('../Stages/ClientSubmission/ClientSub'));
// const DataCollection = React.lazy(() => import('../Stages/DataCollection/DataCollection'));
// const OnHold = React.lazy(() => import('../Stages/OnHold/OnHold'));
// const Rejected = React.lazy(() => import('../Stages/Rejected/Rejected'));
// const Scheduling = React.lazy(() => import('../Stages/Scheduling/Scheduling'));
// const Webinar = React.lazy(() => import('../Stages/Webinar/Webinar'));
// const OnBoarding = React.lazy(() => import('../Stages/OnBoarding/OnBoarding'));
// const VideoRecording = React.lazy(() => import('../Stages/VideoRecording/VideoRecording'));
// const Info = React.lazy(() => import('../Stages/Info/Info'));
// const DocumentSigning = React.lazy(() => import('../Stages/DocumentSigning/DocumentSigning'));



import SystemChecker from '../Stages/SystemChecker/SystemChecker';
import FilterStage from '../Stages/FilterStage/FilterStage';
import Assessment from '../Stages/Assessment/Assessment';
import Approved from '../Stages/Approved/Approved';
import ClientSubmission from '../Stages/ClientSubmission/ClientSub';
import DataCollection from '../Stages/DataCollection/DataCollection';
import OnHold from '../Stages/OnHold/OnHold';
import Rejected from '../Stages/Rejected/Rejected';
import Scheduling from '../Stages/Scheduling/Scheduling';
import Webinar from '../Stages/Webinar/Webinar';
import OnBoarding from '../Stages/OnBoarding/OnBoarding';
import VideoRecording from '../Stages/VideoRecording/VideoRecording';
import Info from '../Stages/Info/Info';
import DocumentSigning from '../Stages/DocumentSigning/DocumentSigning';

// const NewHireSheet = React.lazy(() => import('../Stages/NewHireSheet/NewHireSheet'));



const drawerWidth = 360;

const EditWorkflow = () => {
    // console.count('EditWorkflow');
    const { WorkflowId } = useParams();
    const navigate = useNavigate();
    const initialRender = useRef(true);

    const loadWorkflowData = () => {

        if (WorkflowId) {
            trackPromise(
                ApiService.postWithParams(193, 'Curately/Workflow/workflow_stages_list.jsp', {
                    workflowId: WorkflowId,
                    clientId: userLocalData.getvalue('clientId')
                }).then((response: any) => {
                    // WorkflowId

                    // setWorkflowName(response.data.WorkFlowName);
                    // setCards(response.data.StagesList);
                    if (response.data.workflowName && response.data.stages && response.data.stages.length) {
                        setWorkflowName(response.data.workflowName);
                        setCards(response.data.stages);
                        cardsRef.current = response.data.stages;
                        // let tempState = [...response.data.stages]
                        // let tempStageNumbers: string[] = [];
                        // for (let so = 0; so < tempState.length; so++) {
                        //     if (["2", "6", "7"].includes(tempState[so].number)) {
                        //         tempStageNumbers.push(tempState[so].number);
                        //     }
                        // }
                        // setIdsToHide(tempStageNumbers);
                        setSelectedStage({
                            number: "",
                            name: '',
                            title: '',
                            stageId: "",
                            stageTypeId: ""
                        });
                        getStageData(response.data.stages[0]);
                        setInitialLoad(true);
                    } else {
                        showToaster('No Data found on this Workflow', 'error');
                        navigate('workflows/list');
                    }
                    // console.log(response);
                })
            );
        }
    }
    const [initialLoad, setInitialLoad] = useState(false);

    const [workflowName, setWorkflowName] = useState('');
    const [selectedStage, setSelectedStage] = useState<StageInterface>({
        number: "",
        name: '',
        title: '',
        stageId: "",
        stageTypeId: ""
    });
    const [cards, setCards] = useState<StageInterface[]>(
        [
            {
                number: "",
                name: '',
                title: '',
                stageId: "",
                stageTypeId: ""
            }
        ]
    );
    const cardsRef = useRef<StageInterface[]>(
        [
            {
                number: "",
                name: '',
                title: '',
                stageId: "",
                stageTypeId: ""
            }
        ]
    );
    const selectedStageIndex = useRef(0)
    // const reorder = (list: StageInterface[], startIndex: number, endIndex: number) => {
    //     const result = Array.from(list);
    //     const [removed] = result.splice(startIndex, 1);
    //     result.splice(endIndex, 0, removed);

    //     return result;
    // };

    // const onDragStart = () => {
    //     // Add a little vibration if the browser supports it.
    //     // Add's a nice little physical feedback
    //     if (window.navigator.vibrate) {
    //         window.navigator.vibrate(100);
    //     }
    // }
    // const onDragEnd = React.useCallback(
    //     (result: any) => {
    //         // { destination: { index: any; }; source: { index: any; }; }
    //         if (!result.destination) {
    //             return;
    //         }

    //         if (result.destination.index === result.source.index) {
    //             return;
    //         }
    //         if (result.destination.index !== 0) {
    //             let tempState = reorder(
    //                 cardsRef.current,
    //                 result.source.index,
    //                 result.destination.index
    //             );

    //             // console.log(tempState);
    //             setCards([...tempState]);
    //             cardsRef.current = [...tempState];
    //             let stageIds = [];
    //             let positions = [];
    //             for (let so = 0; so < tempState.length; so++) {
    //                 stageIds.push(tempState[so].stageId);
    //                 positions.push(so + 1);
    //             }

    //             ApiService.saveStagesOrder(stageIds.join(), positions.join()).then((response: any) => {
    //                 // console.log(response.data);
    //                 if (response.data.message === "Success") {

    //                 } else {
    //                     showToaster(response.data.Error, 'error');
    //                 }
    //             })
    //         }
    //     },
    //     [setCards]
    // );



    // const checkStageToOpen = (e: any, stage: StageInterface) => {
    //     if (!e.target.classList.contains('deleteIconDiv') && !e.target.classList.contains('deleteIcon')) {
    //         // openStage(stage);
    //         setIsStageDataLoaded(false);
    //         getStageData(e);
    //     }
    // }


    const addStage = (stage: StageInterface) => {
        setSelectedStage({
            number: "",
            name: '',
            title: '',
            stageId: "",
            stageTypeId: ""
        });
        const tempStages = [...cards];
        const tempAddStages = [
            ...tempStages.slice(0, selectedStageIndex.current + 1),
            stage,
            ...tempStages.slice(selectedStageIndex.current + 1)
        ]
        setCards(tempAddStages);
        cardsRef.current = tempAddStages;
        let stageIds = [];
        let positions = [];
        for (let so = 0; so < tempAddStages.length; so++) {
            stageIds.push(tempAddStages[so].stageId);
            positions.push(so + 1);
        }
        getStageData(tempAddStages[selectedStageIndex.current + 1]);

        ApiService.postWithData('admin', 'saveStagesOrder', {
            stageIds: stageIds.join(),
            positions: positions.join(),
            clientId: userLocalData.getvalue('clientId')
        }).then((response: any) => {
            // console.log(response.data);
            if (response.data.Success) {
                showToaster('Stage Saved Succesfully', 'success');
            } else {
                showToaster(response.data.Error, 'error');
            }
        });
    }
    const removeStage = (stageId: string) => {
        selectedStageIndex.current = cardsRef.current.findIndex(x => x.stageId === stageId) - 1;

        ApiService.deleteById('admin', 'deleteStage', stageId + '/' + userLocalData.getvalue('clientId')).then((response: any) => {
            // console.log(response.data);
            if (response.data.message === "Success") {

                let tempStageCards = [...cards];
                tempStageCards = tempStageCards.filter(stage => {
                    return stage.stageId !== stageId;
                });
                setCards([...tempStageCards]);
                cardsRef.current = [...tempStageCards];
                // console.log(selectedStage);
                setSelectedStage({
                    number: "",
                    name: '',
                    title: '',
                    stageId: "",
                    stageTypeId: ""
                });
                // console.log(selectedStage);
                getStageData(tempStageCards[selectedStageIndex.current]);
                showToaster('Stage has been deleted', 'success');
            } else if (response.data.StageIds && response.data.StageIds.length) {
                let tempStageCards = [...cards];
                let assignedStage = tempStageCards.find(stage => {
                    // return stage.stageId === response.data.StageIds[0] + "";
                    return response.data.StageIds.includes(parseInt(stage.stageId))
                });
                let title = (assignedStage?.title) ? assignedStage?.title : assignedStage?.name;
                showToaster('This stage is assigned to ' + title, 'error');
            } else if (response.data.automaticruleStageIds && response.data.automaticruleStageIds.length) {
                let tempStageCards = [...cards];
                let assignedStage = tempStageCards.find(stage => {
                    // return stage.stageId === response.data.automaticruleStageIds[0] + "";
                    return response.data.automaticruleStageIds.includes(parseInt(stage.stageId))
                });
                let title = (assignedStage?.title) ? assignedStage?.title : assignedStage?.name;
                showToaster('This stage is assigned to ' + title, 'error');
            } else {
                // showToaster(response.data.Error, 'error');
                showToaster(response.data.message, 'error');
            }
        });
    }


    // const StagesList = React.memo(({ stages }: any) => {
    //     // console.count('StagesList');
    //     return stages.map((stage: StageInterface, index: number) => (
    //         <StageCard
    //             stage={stage}
    //             index={index}
    //             key={stage.number + index}
    //             openStage={
    //                 (e: StageInterface) => {
    //                     setIsStageDataLoaded(false);
    //                     getStageData(e);
    //                 }
    //             }
    //             deleteStage={
    //                 (e: string) => {
    //                     confirmDialog('Are you sure you want to delete?', () =>
    //                         removeStage(e)
    //                     );
    //                 }
    //             }
    //             selected={(stage.stageId === selectedStage.stageId)}
    //         />
    //     ));
    // });

    const [openAddStageModal, setOpenAddStageModal] = useState(false);
    const [openAddStageTemplate, setOpenAddStageTemplate] = useState(false);
    const [selectedStageTemplate, setSelectedStageTemplate] = useState<StageInterface>({
        number: "",
        name: '',
        title: '',
        stageId: "",
        stageTypeId: ""
    });
    const [stageData, setStageData] = useState<any>();
    const [isStageDataLoaded, setIsStageDataLoaded] = useState<boolean>(false);

    const titleUpdated = (title: string) => {
        if (title) {
            // selectedStage
            // setSelectedStage({
            //     ...selectedStage,
            //     title: title
            // })

            let tempStageCards = [...cards];

            let index = tempStageCards.findIndex(x => x.stageId === selectedStage.stageId);
            if (index === -1) {

            } else {
                tempStageCards[index].title = title;
                setCards(
                    [...tempStageCards]
                )
                cardsRef.current = [...tempStageCards];
            }
        }
    }
    const reloadStage = (title: string) => {
        setSelectedStage({
            number: "",
            name: '',
            title: '',
            stageId: "",
            stageTypeId: ""
        });
        getStageData(selectedStage);

    }

    const getStageData = (e: StageInterface) => {
        setIsStageDataLoaded(false);
        selectedStageIndex.current = cardsRef.current.findIndex(x => x.stageId === e.stageId);
        console.log(selectedStageIndex.current);
        ApiService.getByParams(193, 'Curately/Workflow/workflow_stages_get.jsp', {
            stageId: e.stageId,
            clientId: userLocalData.getvalue('clientId')
        }).then((response: any) => {
            if (response.data.stage_info && response.data.stage_info.video) {
                response.data.stage_info.video.sort((a: any, b: any) => a.videoType - b.videoType)
            }
            setStageData(response.data);
            setSelectedStage(e);
            setIsStageDataLoaded(true);
        });
    }

    const openAddStage = () => {
        setOpenAddStageModal(true);
    }
    const closeAddStageModal = (stage: StageInterface) => {
        setOpenAddStageModal(false);
        if (stage.number) {
            setSelectedStageTemplate(stage);
            setOpenAddStageTemplate(true);
        }
    }
    const closeSelectedStageModal = (stage: StageInterface) => {
        setOpenAddStageTemplate(false);
        if (stage.number) {
            addStage(stage);
        }
    }

    const StageComponent = () => {
        if (selectedStage?.name === "Trigger") {
            return <Trigger stageId={selectedStage.stageId} passedStageData={stageData} />
        }
        else if (selectedStage?.name === "Approved") {
            return <Approved />
        }
        else if (selectedStage?.name === "Data Collection") {
            return <DataCollection updated={reloadStage} stageId={selectedStage?.stageId} passedStageData={stageData.stage_dataCollection} />
        }
        else if (selectedStage?.name === "Client Submission") {
            return <ClientSubmission />
        }
        else if (selectedStage?.name === "Onboarding") {
            return <OnBoarding stageId={selectedStage?.stageId} passedStageData={stageData.new_hire_data} updated={reloadStage} />
        }
        else if (selectedStage?.name === "Rejected") {
            return <Rejected />
        }
        else if (selectedStage?.name === "On Hold") {
            return <OnHold />
        }
        else if (selectedStage?.name === "Webinar") {
            return <Webinar updated={reloadStage} stageId={selectedStage?.stageId} passedStageData={stageData.stage_webinar}
                stagesList={cards} />
        }
        else if (selectedStage?.name === "Scheduling") {
            return <Scheduling stageId={selectedStage?.stageId} passedStageData={stageData.stage_schedular} />
        }
        else if (selectedStage?.name === "Video Recording") {
            return <VideoRecording stageId={selectedStage?.stageId} passedStageData={stageData.stage_videoRecording} />
        }
        else if (selectedStage?.name === "Filter") {
            return <FilterStage stagesList={cards} stageId={selectedStage?.stageId} passedStageData={stageData.stage_filter} />
        }
        else if (selectedStage?.name === "Assessment") {
            return <Assessment stageId={selectedStage?.stageId} passedStageData={stageData.stage_assessments} />
        }
        else if (selectedStage?.name === "Info") {
            return <Info updated={reloadStage} stagesList={cards} stageId={selectedStage?.stageId} passedStageData={stageData.stage_info} />
        }
        else if (selectedStage?.name === "System Checker") {
            return <SystemChecker workflowName={workflowName} stageId={selectedStage?.stageId} passedStageData={stageData.stage_systemchecker} />
        }
        else if (selectedStage?.name === "Document Signing") {
            return <DocumentSigning stageId={selectedStage?.stageId} inviteProps={null} />
        }
    }
    const StageTitleComponent = () => {
        return <StageTitle
            position={selectedStage.title}
            workflowId={WorkflowId || ''}
            updated={titleUpdated}
            stageData={stageData}
        />

    }
    const checkStageToOpen = (e: any, stage: StageInterface) => {
        if (!e.target.classList.contains('deleteIconDiv') && !e.target.classList.contains('deleteIcon')) {
            setIsStageDataLoaded(false);
            getStageData(stage);
        }
    }

    useEffect(() => {
        if (WorkflowId) {
            loadWorkflowData(); 
        }
    }, [WorkflowId]);


    return (
        <div className='Workflow'>
            {
                initialLoad ?
                    <div>
                        <Box>

                            <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <h2 className='pl-3 my-1'>{workflowName}</h2>

                                <Link to={`/${userLocalData.getvalue('clientName')}/letter/workflows/list`} className="btn btn-primary ml-2 pr-3 c-white underlineNone">
                                    <Button variant="outlined" type="button" className='' size="small">
                                        Back to list
                                    </Button>
                                </Link>
                            </Grid>
                            <Divider />
                            <Box sx={{ display: 'flex' }}>
                                {/* <CssBaseline /> */}
                                <Box
                                    className='workflowHeight'
                                    // component="nav"
                                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                                    aria-label="Stages List"

                                >
                                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                                    <Grid
                                        sx={{
                                            width: drawerWidth
                                        }}
                                        className='pr-4'
                                    >
                                        <div>
                                            <div className='text-right'>
                                                <IconButton
                                                    id="addStageButton"
                                                    onClick={openAddStage}
                                                >
                                                    <AddCircleOutlineIcon />
                                                </IconButton>

                                            </div>
                                            <div className="StageList">
                                                <div
                                                    className={`StageCard ${(cards[0].stageId === selectedStage.stageId) ? 'stageSelected' : ''}`}
                                                    onClick={(e) => checkStageToOpen(e, cards[0])}
                                                    style={{ padding: '5px 0 0 10px' }}
                                                >
                                                    <Card
                                                        className="cardStyle cursorPointer px-1"
                                                        style={{ height: '62px' }}
                                                    >

                                                        <Grid
                                                            container
                                                            direction="row"
                                                            justifyContent="space-between"
                                                            alignItems="flex-start"
                                                        >
                                                            <Grid
                                                                sx={{ display: 'flex' }}
                                                            >
                                                                {getStageIcon(cards[0].name)}
                                                                <div>
                                                                    <div className="displayStageName">{(cards[0].title) ? cards[0].title : cards[0].name}</div>
                                                                    <div className="pt-1 d-flexAlignStart">
                                                                        <span className="originalStageName pr-2">
                                                                            {cards[0].name}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </Grid>
                                                            <Grid>
                                                                <div className="mr-3">
                                                                    <LockIcon className="lockIcon" />
                                                                </div>
                                                            </Grid>
                                                        </Grid>

                                                    </Card>
                                                </div>
                                            </div>
                                            <div className="DndKit">
                                                <ul className="StageList" style={{ overflow: "auto" }}>
                                                    <SortableList
                                                        items={cards}
                                                        getItemId={(stage: any) => stage.stageId}
                                                        isDisabled={(stage: any) => stage.number === "1"}
                                                        renderItem={({
                                                            item,
                                                            isActive,
                                                            isDragged,
                                                            ref,
                                                            props,
                                                            handleProps
                                                        }) => {
                                                            let className = "StageCard";
                                                            if (isActive) className += " isActive";
                                                            if (isDragged) className += " isDragged";
                                                            if (item.stageId === selectedStage.stageId) className += " stageSelected";
                                                            if (item.number === "1") className += " d-none";


                                                            return (
                                                                <li
                                                                    ref={ref}
                                                                    key={item.stageId}
                                                                    className={className}
                                                                    {...props}
                                                                    onClick={(e) => checkStageToOpen(e, item)}
                                                                >
                                                                    <Card
                                                                        className="cardStyle cursorPointer px-1"
                                                                    >

                                                                        <Grid
                                                                            container
                                                                            direction="row"
                                                                            justifyContent="space-between"
                                                                            alignItems="flex-start"
                                                                        >
                                                                            <Grid
                                                                                sx={{ display: 'flex', maxWidth: 'calc(100% - 35px)' }}
                                                                            >
                                                                                {getStageIcon(item.name)}
                                                                                {/* <ElectricBoltIcon className="icon mr-2" /> */}
                                                                                <div>
                                                                                    <div className="displayStageName" title={(item.title) ? item.title : item.name}>{(item.title) ? item.title : item.name}</div>
                                                                                    <div className="pt-1 d-flexAlignStart">
                                                                                        <span className="originalStageName pr-2">
                                                                                            {item.name}
                                                                                        </span>
                                                                                        {/* <span className="pr-2">
                                                                                        <GroupsIcon className="groupIcon" />
                                                                                    </span>
                                                                                    <span className="totalCount">
                                                                                        51
                                                                                    </span> */}
                                                                                    </div>
                                                                                </div>
                                                                            </Grid>
                                                                            <Grid>
                                                                                {
                                                                                    (item.number !== "1") ?
                                                                                        <div>
                                                                                            <div className="handle handleBar" {...handleProps}>
                                                                                                <DragHandleIcon />
                                                                                                {/* <DragIcon /> */}
                                                                                            </div>
                                                                                            {
                                                                                                (item.stageTypeId !== "2" && item.stageTypeId !== "6" && item.stageTypeId !== "7") ?
                                                                                                    <div className="deleteIconDiv">
                                                                                                        <DisabledByDefaultIcon className="deleteIcon"
                                                                                                            onClick={() => {
                                                                                                                confirmDialog('Are you sure you want to delete?', () =>
                                                                                                                    removeStage(item.stageId)
                                                                                                                );
                                                                                                            }}
                                                                                                        />
                                                                                                    </div>
                                                                                                    : null
                                                                                            }
                                                                                        </div>
                                                                                        : null
                                                                                }
                                                                            </Grid>
                                                                        </Grid>

                                                                    </Card>
                                                                </li>
                                                            );
                                                        }}
                                                        onSort={(oldIndex, newIndex) => {
                                                            const newItems = cards.slice();
                                                            newItems.splice(newIndex, 0, newItems.splice(oldIndex, 1)[0]);
                                                            setCards(newItems);
                                                            cardsRef.current = [...newItems];
                                                            let stageIds = [];
                                                            let positions = [];
                                                            for (let so = 0; so < newItems.length; so++) {
                                                                stageIds.push(newItems[so].stageId);
                                                                positions.push(so + 1);
                                                            }

                                                            if (oldIndex === selectedStageIndex.current) {
                                                                selectedStageIndex.current = newIndex;
                                                            }

                                                            ApiService.postWithData('admin', 'saveStagesOrder', {
                                                                stageIds: stageIds.join(),
                                                                positions: positions.join(),
                                                                clientId: userLocalData.getvalue('clientId')
                                                            }).then((response: any) => {
                                                                // console.log(response.data);
                                                                if (response.data.Success) {
                                                                    showToaster('Stage Saved Succesfully', 'success');
                                                                } else {
                                                                    showToaster(response.data.Error, 'error');
                                                                }
                                                            })

                                                        }}
                                                    />
                                                </ul>
                                            </div>
                                            {/* <DndKit
                                                stages={cards}
                                            /> */}
                                            {/* 
                                                <VirtualStageList
                                                    stages={cards} openStage={
                                                        (e: StageInterface) => {
                                                            setIsStageDataLoaded(false);
                                                            getStageData(e);
                                                        }
                                                    }
                                                    deleteStage={
                                                        (e: string) => {
                                                            confirmDialog('Are you sure you want to delete?', () =>
                                                                removeStage(e)
                                                            );
                                                        }
                                                    }
                                                    selectedStageId={selectedStage.stageId}
                                                />
                                            */}
                                            {/* <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
                                                <Droppable droppableId="list">
                                                    {provided => (
                                                        <div className="pl-1 pr-4" ref={provided.innerRef} {...provided.droppableProps}>
                                                            <StagesList stages={cards} />
                                                            {provided.placeholder}
                                                        </div>
                                                    )}
                                                </Droppable>
                                            </DragDropContext> */}
                                        </div>
                                    </Grid>
                                </Box>
                                <Box
                                    className='workflowHeight pt-0'
                                    // component="main"
                                    sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                                >
                                    {
                                        (isStageDataLoaded) ?
                                            <div>
                                                {/* <NewHireSheet /> */}
                                                {/* {
                                                    (selectedStage.number && selectedStage.number !== "1") ?
                                                        <StageTitle
                                                            // positionId={selectedStage.number}
                                                            // WorkflowId={WorkflowId || ''}
                                                            updated={titleUpdated}
                                                            stageData={stageData}
                                                        />
                                                        : null
                                                } */}
                                                {
                                                    (selectedStage.number && selectedStage.number !== "1") ?
                                                        StageTitleComponent()
                                                        :
                                                        null
                                                }
                                                {
                                                    StageComponent()
                                                }

                                                {
                                                    (stageData.showAutomaticRule) ?
                                                        <AutomaticMoveRule
                                                            stageId={selectedStage?.stageId}
                                                            automaticRuleData={stageData?.automaticRule ? stageData?.automaticRule : {}}
                                                            stagesList={cards}
                                                            updated={reloadStage}
                                                        />
                                                        : null
                                                }

                                                {
                                                    (stageData.showStartMessage) ?
                                                        <AddMessageBox
                                                            stageId={selectedStage?.stageId}
                                                            stageData={stageData}
                                                            messageData={stageData.stageMessage}
                                                            messageType={1}
                                                            updated={reloadStage}
                                                        />
                                                        : null
                                                }

                                                {
                                                    (stageData.showFollowMessage) ?
                                                        <AddMessageBox
                                                            stageId={selectedStage?.stageId}
                                                            stageData={stageData}
                                                            messageData={stageData.followupMessage}
                                                            messageType={2}
                                                            updated={reloadStage}
                                                        />
                                                        : null
                                                }
                                            </div>
                                            :
                                            <ContinuousLoader />
                                    }
                                    {/* {selectedStage?.name} */}
                                </Box>
                                {
                                    (openAddStageModal) ?
                                        <AddStageModal
                                            open={openAddStageModal}
                                            onClose={closeAddStageModal}
                                            closePopup={() => setOpenAddStageModal(false)}
                                            selectedCards={cards}
                                        />
                                        :
                                        null
                                }
                                {
                                    openAddStageTemplate ?
                                        <AddStageTemplate
                                            open={openAddStageTemplate}
                                            selectedStageFromTemplate={selectedStageTemplate}
                                            onClose={closeSelectedStageModal}
                                            closePopup={() => setOpenAddStageTemplate(false)}
                                            workflowId={(WorkflowId) ? WorkflowId : ""}
                                            position={cards.length}
                                        />
                                        :
                                        null

                                }
                            </Box>
                        </Box>
                    </div> : null
            }
            <ConfirmDialog />
        </div>
    );
}



export default EditWorkflow;