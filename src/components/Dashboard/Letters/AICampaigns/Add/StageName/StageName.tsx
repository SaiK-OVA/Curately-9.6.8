import {React, useState } from '../../../../../../shared/modules/React';
import { Button, Grid} from '../../../../../../shared/modules/commonImports';
import { confirmDialog } from '../../../../../shared/ConfirmDialog/ConfirmDialog';
import { StageInterface } from '../AddAICampaigns';
// import { SortableList } from '../../../Workflow/Add/Virtual/DndKit/SortableList';
import '../AddAICampaigns.scss';
import './StageName.scss';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import IconButton from '@mui/material/IconButton';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import Fade from '@mui/material/Fade';
import {Card} from '../../../../../../shared/modules/MaterialImports/Card';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import AddStageModal from '../AddStageModal/AddStageModal';
import { ButtonGroup } from '../../../../../../shared/modules/MaterialImports/ButtonGroup';
import { DeleteOutline } from '@mui/icons-material';




export type SortableRenderFunction<T> = (info: {
    item: T;
    isActive: boolean;
    isDragged: boolean;
    ref: (node: HTMLElement | null) => void;
    props?: React.HTMLAttributes<HTMLElement>;
    handleProps?: React.HTMLAttributes<HTMLElement>;
}) => JSX.Element;



const StageName = (
    { sequenceFormik, activeStage, openStage, SequenceId, deleteStage, addStage }
        :
        {
            sequenceFormik: any;
            activeStage: number;
            openStage: (i: number) => void;
            SequenceId: number;
            deleteStage: (i: number, SequenceId: number) => void;
            addStage: () => void;
        }
) => {


    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [taskMenuId, setTaskMenuId] = useState<number | null>(null);
    const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
    const [newTitle, setNewTitle] = useState<string>('');

    const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

    const [tasks, setTasks] = useState([
        { id: 1, title: "Homepage" },
        { id: 2, title: "Fix styling " },
        { id: 3, title: "Learn how to" },
        { id: 4, title: "Reactjs js" }
    ])

    const [selectedStage, setSelectedStage] = useState<StageInterface>({
        mergeField: '',
        template: '',
        followUp: '',
        stageID: '',
        stageName: '',
        scheduledType: '',
        scheduledTime: '',
        scheduledDate: '',
        timeZone: '',
        businessDays: '',
        totalBusinessDays: '',
        fromEmail: { name: '', code: '' },
        ccEmail: [''],
        subject: '',
        mailBody: '',
        bccEmail: [''],
        daysAfterFirstMessage: '',
        customDays: [''],
    });


    const [openAddStageTemplate, setOpenAddStageTemplate] = useState(false);
    const [selectedStageTemplate, setSelectedStageTemplate] = useState<StageInterface>({
        mergeField: '',
        template: '',
        followUp: '',
        stageID: '',
        stageName: '',
        scheduledType: '',
        scheduledTime: '',
        scheduledDate: '',
        timeZone: '',
        businessDays: '',
        totalBusinessDays: '',
        fromEmail: { name: '', code: '' },
        ccEmail: [''],
        subject: '',
        mailBody: '',
        bccEmail: [''],
        daysAfterFirstMessage: '',
        customDays: [''],
    });


    const openAddStage = () => {
        // setOpenAddStageModal(true);
        setOpenAddStageTemplate(true);
    }


    const closeSelectedStageModal = (stage: StageInterface) => {

        setOpenAddStageTemplate(false);
        setSelectedStageTemplate(stage);
        console.log(stage, "sta..")

    }


    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>, taskId: number) => {
        setAnchorEl(event.currentTarget);
        setTaskMenuId(taskId);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setTaskMenuId(null);
    };

    const handleRename = () => {
        if (taskMenuId !== null) {
            const updatedTasks = tasks.map(task =>
                task.id === taskMenuId ? { ...task, title: newTitle } : task
            );
            setTasks(updatedTasks);
            setEditingTaskId(null);
            setNewTitle('');
            handleClose();
        }
    };


    const handleSelectTask = (taskId: number) => {
        setSelectedTaskId(taskId);
    };

    // const handleDelete = (task:any) => {
    //     const confirmDelete = window.confirm('Are you sure you want to delete?');
    //     if (confirmDelete) {
    //         console.log('del..', task.title); // Or task.id
    //         deleteStage(task.id, SequenceId); // Call the delete function
    //     }
    // };

    return <div className="StageName">

        <div className="StageList">
            <Card
                className=" cursorPointer px-1"
                style={{ height: '62px', borderRadius: 'inherit' }}
            >

                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    marginTop="20px"
                >
                    <Grid
                        sx={{ display: 'flex' }}
                    >
                        {/* {getStageIcon(cards[0].name)} */}
                        <div>
                            <div className="displayStageName">Stage</div>

                        </div>
                    </Grid>
                    <Grid>
                        <div className="mr-3 add-btn" onClick={addStage}>
                            + Add
                        </div>
                    </Grid>
                </Grid>
                <AddStageModal
                    open={openAddStageTemplate}
                    selectedStageFromTemplate={selectedStageTemplate}
                    onClose={closeSelectedStageModal}
                    closePopup={() => setOpenAddStageTemplate(false)}
                />

            </Card>

            {/* <SortableList
                items={tasks}
                getItemId={(task) => task.id}
                isDisabled={() => false}
                renderItem={({
                    item,
                    isActive,
                    isDragged,
                    ref,
                    props,
                    handleProps

                }) => {
                    let className = "TaskCard";
                    if (isActive) className += " isActive";
                    if (isDragged) className += " isDragged";

                    return (

                        <Card
                            ref={ref}
                            key={item.id}
                            className={className}
                            {...props}
                            style={{ borderRadius: 'inherit' }}
                        >

                            <div
                                className={`task-container ${selectedTaskId === item.id ? 'selected' : ''}`}
                                key={item.id}
                                onClick={() => handleSelectTask(item.id)}
                            >
                                {editingTaskId === item.id ? (
                                    <div className='task-edit'>
                                        <input
                                            type='text'
                                            value={newTitle}
                                            onChange={(e) => setNewTitle(e.target.value)}
                                            onBlur={() => handleRename()}
                                            autoFocus
                                        />
                                        <Button color="primary" variant="contained" onClick={handleRename}>Save</Button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="task-title-container">
                                            <div className="task-title">
                                                <div className="handle handleBar" {...handleProps}>
                                                    <DragIndicatorIcon className='drag-btn' />
                                                    <span>{item.title}</span>
                                                </div>
                                            </div>
                                            <IconButton
                                                aria-label="more"
                                                id={`task-menu-${item.id}`}
                                                aria-controls={open ? `task-menu-${item.id}` : undefined}
                                                aria-expanded={open ? 'true' : undefined}
                                                aria-haspopup="true"
                                                onClick={(e) => handleClick(e, item.id)}
                                            >
                                                <MoreVertIcon />
                                            </IconButton>
                                        </div>
                                        <Menu
                                            id={`task-menu-${item.id}`}
                                            MenuListProps={{
                                                'aria-labelledby': `task-menu-${item.id}`,
                                            }}
                                            anchorEl={anchorEl}
                                            open={taskMenuId === item.id && open}
                                            onClose={handleClose}
                                            TransitionComponent={Fade}
                                        >
                                            <MenuItem onClick={() => {
                                                setEditingTaskId(item.id);
                                                setNewTitle(item.title);
                                            }}>Rename</MenuItem>
                                            <MenuItem onClick={() => {
                                                confirmDialog(
                                                    'Are you sure you want to delete?',
                                                    () => deleteStage(item.id, SequenceId)
                                                );
                                                // handleDelete(task)
                                                handleClose();
                                            }}>Delete</MenuItem>
                                        </Menu>
                                    </>
                                )}
                                {
                                    //{index < tasks.length - 1 && <Divider />}
                                }
                            </div>
                        </Card>
                    );

                }}
                onSort={(oldIndex, newIndex) => {
                    const newItems = tasks.slice();
                    newItems.splice(newIndex, 0, newItems.splice(oldIndex, 1)[0]);
                    setTasks(newItems);
                    // cardsRef.current = [...newItems];
                }}

            /> */}
            <ButtonGroup size="medium" aria-label="button group" orientation="vertical" className='buttonGroup'>
                {sequenceFormik.values.stages.map((stage: any, i: number) => (
                    <Button variant='outlined' onClick={() => openStage(i)}
                        className={`${i === activeStage ? "active " : ""}`}
                        key={i} startIcon={<DragIndicatorIcon className='drag-btn' />}>
                        {/* {`Stage ${i + 1}`} */}
                        <span className='textBtn'>Stage {i + 1}</span>
                        {
                            (i !== 0) ? <span className='deleteIcon' onClick={() => {
                                confirmDialog(
                                    (SequenceId) ? 'This Stage is already assigned. Are you sure you want to delete?' : 'Are you sure you want to delete?',
                                    () =>
                                        deleteStage(i, (SequenceId) ? Number(stage.stageID) : 0)
                                );
                            }}><DeleteOutline /></span> : null
                        }
                    </Button>
                ))}
            </ButtonGroup>
















            {/* /////////////////////////////////////////////////// */}
            {/* <ButtonGroup size="medium" aria-label="button group" orientation="vertical" className='buttonGroup'>
                {
                    sequenceFormik.values.stages.map(
                        (stage: StageInterface, i: number) => (
                            <Button
                                variant="outlined"
                                // className='custBtn'
                                className={`${i === activeStage ? "active " : ""}`}
                                startIcon={
                                    <span className='iconSpan'>
                                        <MailOutlineIcon className='mailIcon' />
                                    </span>
                                }
                                onClick={() => openStage(i)}
                                key={`button${i}`}
                            >
                                <span className={`sideLine ${(i === 0) ? 'd-none' : ''}`}></span>
                                <span className='textBtn'>Stage {i + 1}</span>
                                {
                                    (i !== 0) ? <span className='deleteIcon' onClick={() => {
                                        confirmDialog(
                                            (SequenceId) ? 'This Stage is already assigned. Are you sure you want to delete?' : 'Are you sure you want to delete?',
                                            () =>
                                                deleteStage(i, (SequenceId) ? Number(stage.stageID) : 0)
                                        );
                                    }}><DeleteOutlineIcon /></span> : null
                                }
                            </Button>
                        )
                    )
                }
                <Button
                    variant="outlined"
                    startIcon={
                        <AddIcon className='addIcon ml-2' />
                    }
                    onClick={() => addStage()}
                >
                    Add Stage
                </Button>
            </ButtonGroup> */}
        </div>



    </div>
}

export default StageName;