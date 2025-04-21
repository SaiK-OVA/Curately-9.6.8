import { memo } from "react";

import { Draggable } from "@hello-pangea/dnd";
import {Card} from "../../../../../../shared/modules/MaterialImports/Card";
import { StageInterface } from "../AddWorkflow";

import DragHandleIcon from '@mui/icons-material/DragHandle';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
// import GroupsIcon from '@mui/icons-material/Groups';

import LockIcon from '@mui/icons-material/Lock';

import './StageCard.scss';
import {Grid} from "../../../../../../shared/modules/MaterialImports/Grid";

import { getStageIcon } from "../../../../../../shared/modules/stageicon";

const StageCard = (
    { stage, index, openStage, deleteStage, selected }:
        { stage: StageInterface, index: number, openStage: any, deleteStage: any, selected: boolean }
) => {
    // console.count('StageCard');
    const checkStageToOpen = (e: any, stage: StageInterface) => {
        if (!e.target.classList.contains('deleteIconDiv') && !e.target.classList.contains('deleteIcon')) {
            openStage(stage);
        }
    }

    // const getStageIcon = (key: string) => {
    //     switch (key) {
    //         case "1":
    //             // Trigger
    //             return <ElectricBoltSharpIcon className="icon mr-2" />
    //         case "2":
    //             // Approved
    //             return <CheckCircleIcon className="icon mr-2" />
    //         case "3":
    //             // Data Collection
    //             return <StorageIcon className="icon mr-2" />
    //         case "4":
    //             // Client Submission
    //             return <SupervisorAccountIcon className="icon mr-2" />
    //         case "5":
    //             // Onboarding
    //             return <NextPlanIcon className="icon mr-2" />
    //         case "6":
    //             // Rejected
    //             return <CancelIcon className="icon mr-2" />
    //         case "7":
    //             // On Hold
    //             return <ErrorIcon className="icon mr-2" />
    //         case "8":
    //             // Webinar
    //             return <SmartDisplayOutlinedIcon className="icon mr-2" />
    //         case "9":
    //             // Scheduling
    //             return <VideocamSharpIcon className="icon mr-2" />
    //         case "10":
    //             // Video Recording
    //             return <VideocamSharpIcon className="icon mr-2" />
    //         case "11":
    //             // Filter
    //             return <FilterAltRoundedIcon className="icon mr-2" />
    //         case "12":
    //             // Assessment
    //             return <AssignmentTurnedInOutlinedIcon className="icon mr-2" />
    //         case "13":
    //             // Info
    //             return <InfoRoundedIcon className="icon mr-2" />

    //         default:
    //             break;
    //     }
    // }



    return (
        <div className={`StageCard ${selected ? 'stageSelected' : ''}`}>
            {
                (stage.number === "1") ?

                    <Card
                        className="cardStyle cursorPointer px-1"
                        onClick={(e) => checkStageToOpen(e, stage)}
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
                                <ElectricBoltIcon className="icon mr-2" />
                                <div>
                                    <div className="displayStageName" title={(stage.title) ? stage.title : stage.name}>{(stage.title) ? stage.title : stage.name}</div>
                                    <div className="pt-1 d-flexAlignStart">
                                        <span className="originalStageName pr-2">
                                            {stage.name}
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
                                <div className="mr-3">
                                    <LockIcon className="lockIcon" />
                                </div>
                            </Grid>
                        </Grid>
                    </Card>
                    :
                    <Draggable
                        draggableId={`stage${stage.stageId}`}
                        index={index}
                        isDragDisabled={false}
                        disableInteractiveElementBlocking={false}
                    >
                        {provided => (
                            <Card
                                className="cardStyle cursorPointer px-1"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                onClick={(e) => checkStageToOpen(e, stage)}
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
                                        {getStageIcon(stage.name)}
                                        {/* <ElectricBoltIcon className="icon mr-2" /> */}
                                        <div>
                                            <div className="displayStageName">{(stage.title) ? stage.title : stage.name}</div>
                                            <div className="pt-1 d-flexAlignStart">
                                                <span className="originalStageName pr-2">
                                                    {stage.name}
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
                                            (stage.number !== "1") ?
                                                <div>
                                                    <div className="handleBar" {...provided.dragHandleProps}>
                                                        <DragHandleIcon />
                                                    </div>
                                                    <div className="deleteIconDiv">
                                                        <DisabledByDefaultIcon className="deleteIcon"
                                                            onClick={() => {
                                                                deleteStage(stage.stageId)
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                : null
                                        }
                                    </Grid>
                                </Grid>
                            </Card>
                        )}
                    </Draggable>
            }
        </div >
    );
}

export default memo(StageCard);



// <Card className='cardStyle' >

//     <div className='handleBar' >
//         <DragHandleIcon />
//     </div>
// </Card>