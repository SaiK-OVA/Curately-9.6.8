import  {React, useEffect, useState } from '../../../../../../../shared/modules/React';
// import ReactDOM from 'react-dom'
import { Virtuoso } from 'react-virtuoso';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import {Card} from "../../../../../../../shared/modules/MaterialImports/Card";
import DragHandleIcon from '@mui/icons-material/DragHandle';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
// import GroupsIcon from '@mui/icons-material/Groups';

import ApiService from '../../../../../../../shared/api/api';
import LockIcon from '@mui/icons-material/Lock';

import './VirtualStageList.scss';
import {Grid} from "../../../../../../../shared/modules/MaterialImports/Grid";


import { StageInterface } from '../../AddWorkflow'
import { getStageIcon } from '../../../../../../../shared/modules/stageicon';
import { showToaster } from '../../../../../../shared/SnackBar/SnackBar';
import { userLocalData } from '../../../../../../../shared/services/userData';

// Virtuoso's resize observer can this error,
// which is caught by DnD and aborts dragging.
window.addEventListener('error', (e) => {
    if (e.message === 'ResizeObserver loop completed with undelivered notifications.' || e.message === 'ResizeObserver loop limit exceeded') {
        e.stopImmediatePropagation()
    }
})

// // Generate our initial big data set
// const initial = Array.from({ length: 1000 }, (_, k) => ({
//     id: `id:${k}`,
//     text: `item ${k}`,
// }))

function reorder(list: any, startIndex: number, endIndex: number) {
    const result = [...list]
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result || []
}

function Item({ provided, item, isDragging, index, selected, checkStageToOpen, deleteStage }: any) {
    return (
        <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            style={provided.draggableProps.style}
            className={`item ${isDragging ? 'is-dragging' : ''} StageCard ${selected ? 'stageSelected' : ''}`}
        >

            <Card
                className="cardStyle cursorPointer px-1"
                ref={provided.innerRef}
                {...provided.draggableProps}
                onClick={(e: any) => checkStageToOpen(e, item)}
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
                        {getStageIcon(item.name)}
                        {/* <ElectricBoltIcon className="icon mr-2" /> */}
                        <div>
                            <div className="displayStageName">{(item.title) ? item.title : item.name}</div>
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
                                    <div className="handleBar" {...provided.dragHandleProps}>
                                        <DragHandleIcon />
                                    </div>
                                    <div className="deleteIconDiv">
                                        <DisabledByDefaultIcon className="deleteIcon"
                                            onClick={() => {
                                                deleteStage(item.stageId)
                                            }}
                                        />
                                    </div>
                                </div>
                                : null
                        }
                    </Grid>
                </Grid>
            </Card>
        </div>
    )
}

const HeightPreservingItem = ({ children, ...props }: any) => {
    const [size, setSize] = useState(0)
    const knownSize = props['data-known-size']
    useEffect(() => {
        setSize((prevSize) => {
            return knownSize == 0 ? prevSize : knownSize
        })
    }, [knownSize])
    return (
        <div
            {...props}
            className="height-preserving-container"
            // check styling in the style tag below
            // @ts-ignore
            style={{ '--child-height': `${size}px`, }}
        >
            {children}
        </div>
    )
}

const VirtualStageList = (
    { stages, openStage,
        deleteStage,
        selectedStageId,
    }:
        {
            stages: any,
            openStage: any,
            deleteStage: any,
            selectedStageId: string,
        }
) => {
    const [items, setItems] = useState<any>(stages)

    const onDragEnd = React.useCallback(
        (result: any) => {
            if (!result.destination) {
                return
            }
            if (result.source.index === result.destination.index) {
                return
            }
            if (result.destination.index !== 0) {
                let tempState = reorder(
                    items,
                    result.source.index,
                    result.destination.index
                );

                // console.log(tempState);
                setItems([...tempState]);
                // cardsRef.current = [...tempState];
                let stageIds = [];
                let positions = [];
                for (let so = 0; so < tempState.length; so++) {
                    stageIds.push(tempState[so].stageId);
                    positions.push(so + 1);
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
            }

            // void setItems
            setItems((items: any) => reorder(items, result.source.index, result.destination.index))
        },
        [setItems]
    );

    const checkStageToOpen = (e: any, stage: StageInterface) => {
        if (!e.target.classList.contains('deleteIconDiv') && !e.target.classList.contains('deleteIcon')) {
            openStage(stage);
        }
    }

    return (
        <div>
            <style>
                {`
                    .height-preserving-container:empty {
                        min-height: calc(var(--child-height));
                        box-sizing: border-box;
                    }
                `}
            </style>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable
                    droppableId="droppable"
                    mode="virtual"
                    renderClone={(provided, snapshot, rubric) => (
                        <Item provided={provided} isDragging={snapshot.isDragging} item={items[rubric.source.index]} />
                    )}
                >
                    {(provided) => {
                        return (
                            <Virtuoso
                                components={{
                                    Item: HeightPreservingItem,
                                }}
                                // @ts-ignore
                                scrollerRef={provided.innerRef}
                                data={items}
                                style={{ width: 300, height: 500 }}
                                itemContent={(index, item) => {
                                    return (item.number === "1") ?
                                        <div
                                            className={`StageCard ${(item.stageId === selectedStageId) ? 'stageSelected' : ''}`}
                                        >
                                            <Card
                                                className="cardStyle cursorPointer px-1"
                                                onClick={(e) => checkStageToOpen(e, item)}
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
                                                        <div className="mr-3">
                                                            <LockIcon className="lockIcon" />
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </Card>
                                        </div>
                                        :
                                        <Draggable draggableId={`stage${item.stageId}`} index={index} key={item.number + index}>
                                            {(provided) => <Item
                                                provided={provided}
                                                item={item}
                                                isDragging={false}
                                                index={index}
                                                selected={(item.stageId === selectedStageId)}
                                                checkStageToOpen={checkStageToOpen}
                                                deleteStage={deleteStage}
                                            />}
                                        </Draggable>
                                }}
                            />
                        )
                    }}
                </Droppable>
            </DragDropContext>
        </div>
    )
}


export default VirtualStageList;