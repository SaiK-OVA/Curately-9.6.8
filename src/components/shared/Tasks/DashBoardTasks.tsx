import { Stack } from "../../../shared/modules/MaterialImports/Stack";
import { Card } from "../../../shared/modules/MaterialImports/Card";
import { useState, useEffect, useCallback } from '../../../shared/modules/React';
import { FormControl } from '../../../shared/modules/MaterialImports/FormInputs';
import './Tasks.scss';
import { Typography } from "../../../shared/modules/MaterialImports/Typography";
import { Box } from "../../../shared/modules/MaterialImports/Box";
import ApiService from "../../../shared/api/api"
import { Checkbox } from '../../../shared/modules/MaterialImports/FormElements';
import { DateTime } from '../../../shared/modules/Luxon';
import { useParams } from "react-router-dom";
import { trackPromise } from '../../../shared/modules/PromiseTrackter';
import { userLocalData } from "../../../shared/services/userData";

import { confirmDialog } from "../../shared/ConfirmDialog/ConfirmDialog";

import { Tabs, Tab } from "../../../shared/modules/MaterialImports/Tabs";
import { Grid } from "../../../shared/modules/MaterialImports/Grid";
import { Tooltip } from "../../../shared/modules/MaterialImports/ToolTip";
import ModeTwoToneIcon from '@mui/icons-material/ModeTwoTone';
import AddTask from "./AddTask";
import { Accordion, AccordionSummary, AccordionDetails } from '../../../shared/modules/MaterialImports/Accordion';
import { Badge } from '../../../shared/modules/MaterialImports/Badge';
import { Divider } from '../../../shared/modules/MaterialImports/Divider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { globalData } from "../../../shared/services/globalData";
// import {
//     Button, Dialog,
//     DialogActions, DialogContent, DialogContentText, DialogTitle
// } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

//new dashboard icon
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import { debounce } from 'lodash';


const DashBoardTasks = ({ show, notShow }: { show: boolean, notShow: any }) => {
    const { contactId } = useParams();
    const [expanded, setExpanded] = useState<string | false>('overdue');
    const [openDialog, setOpenDialog] = useState(false);
    const [cardToDelete, setCardToDelete] = useState(null);
    const [taskData, setTaskData] = useState<any[]>([
        {
            "hours": "8",
            "repeat_date": "",
            "notes": "Email PIPL team",
            "reminder": "",
            "assigned_names": "Aditya KUMAR",
            "repeat_type": "",
            "format": "AM",
            "priority": "3",
            "seldate": "04/04/2024",
            "associate": "",
            "repeat_id": "",
            "mins": "00",
            "task": "Accuick PIPL issue",
            "due": "setdatetime",
            "repeat": "0",
            "assigned": "1893",
            "id": "78",
            "associate_names": "",
            "queue": "",
            "catg": "Email",
            "time": "8:00 AM",
            "contId": "64"
        },
        {
            "hours": "10",
            "repeat_date": "2024-04-11 00:00:00.0",
            "notes": "Assign Tasks\nto all",
            "reminder": "",
            "assigned_names": "Aditya KUMAR",
            "repeat_type": "weekly",
            "format": "AM",
            "priority": "2",
            "seldate": "04/04/2024",
            "associate": "",
            "repeat_id": "14",
            "mins": "00",
            "task": "Daily Status Call",
            "due": "setdatetime",
            "repeat": "1",
            "assigned": "1893",
            "id": "79",
            "associate_names": "",
            "queue": "",
            "catg": "Call",
            "time": "10:00 AM",
            "contId": "64"
        },
        {
            "hours": "12",
            "repeat_date": "",
            "notes": "Sig all docs ",
            "reminder": "",
            "assigned_names": "Aditya KUMAR",
            "repeat_type": "",
            "format": "PM",
            "priority": "2",
            "seldate": "04/06/2024",
            "associate": "",
            "repeat_id": "",
            "mins": "00",
            "task": "Docs Sign",
            "due": "setdatetime",
            "repeat": "0",
            "assigned": "1893",
            "id": "77",
            "associate_names": "",
            "queue": "",
            "catg": "To-Do",
            "time": "12:00 PM",
            "contId": "64"
        },
        {
            "hours": "8",
            "repeat_date": "2024-05-08 00:00:00.0",
            "notes": "test",
            "reminder": "",
            "assigned_names": "Aditya KUMAR",
            "repeat_type": "monthly",
            "format": "AM",
            "priority": "0",
            "seldate": "04/08/2024",
            "associate": "",
            "repeat_id": "21",
            "mins": "00",
            "task": "Testing Taask",
            "due": "setdatetime",
            "repeat": "1",
            "assigned": "1893",
            "id": "84",
            "associate_names": "",
            "queue": "",
            "catg": "To-Do",
            "time": "8:00 AM",
            "contId": "64"
        },
        {
            "hours": "8",
            "repeat_date": "2024-04-15 00:00:00.0",
            "notes": "",
            "reminder": "",
            "assigned_names": "Aditya KUMAR",
            "repeat_type": "weekly",
            "format": "AM",
            "priority": "1",
            "seldate": "04/08/2024",
            "associate": "",
            "repeat_id": "22",
            "mins": "00",
            "task": "Testing Taask",
            "due": "setdatetime",
            "repeat": "0",
            "assigned": "1893",
            "id": "85",
            "associate_names": "",
            "queue": "",
            "catg": "Email",
            "time": "8:00 AM",
            "contId": "64"
        },
        {
            "hours": "8",
            "repeat_date": "2024-04-16 00:00:00.0",
            "notes": "",
            "reminder": "",
            "assigned_names": "Aditya KUMAR",
            "repeat_type": "weekly",
            "format": "AM",
            "priority": "0",
            "seldate": "04/09/2024",
            "associate": "",
            "repeat_id": "28",
            "mins": "00",
            "task": "Testing Task New3",
            "due": "setdatetime",
            "repeat": "1",
            "assigned": "1893",
            "id": "88",
            "associate_names": "",
            "queue": "",
            "catg": "Call",
            "time": "8:00 AM",
            "contId": "64"
        },
        {
            "hours": "8",
            "repeat_date": "2024-04-16 00:00:00.0",
            "notes": "",
            "reminder": "",
            "assigned_names": "Aditya KUMAR",
            "repeat_type": "weekly",
            "format": "AM",
            "priority": "2",
            "seldate": "04/10/2024",
            "associate": "",
            "repeat_id": "23",
            "mins": "00",
            "task": "New Task",
            "due": "setdatetime",
            "repeat": "1",
            "assigned": "1893",
            "id": "86",
            "associate_names": "",
            "queue": "",
            "catg": "Call",
            "time": "8:00 AM",
            "contId": "64"
        },
        {
            "hours": "7",
            "repeat_date": "2024-04-17 00:00:00.0",
            "notes": "",
            "reminder": "",
            "assigned_names": "Aditya KUMAR",
            "repeat_type": "weekly",
            "format": "AM",
            "priority": "0",
            "seldate": "04/11/2024",
            "associate": "",
            "repeat_id": "25",
            "mins": "15",
            "task": "Testing Task New2 ",
            "due": "setdatetime",
            "repeat": "1",
            "assigned": "1893",
            "id": "87",
            "associate_names": "",
            "queue": "",
            "catg": "Email",
            "time": "7:15 AM",
            "contId": "64"
        }
    ]
    );
    // const [isContact, setIsContact] = useState(true);
    const [completedTasks, setCompletedTasks] = useState<any>([]);
    const [currentTab, setCurrentTab] = useState(0);
    const [taskView, setTaskView] = useState('');
    const [editTaskId, setEditTaskId] = useState(0);

    // const [editTaskData, setEditTaskData] = useState({
    //     task: '',
    //     type: '',
    //     priority: '',
    //     recruiter: '',
    //     assignedTo: userLocalData.getvalue('recrId') ? userLocalData.getvalue('recrId') : "",
    //     assigned_names: userLocalData.getvalue('recrFullName') ? userLocalData.getvalue('recrFullName') : "",
    //     selTime: '8:00 AM',
    //     dueDate: DateTime.now().toFormat('MM-dd-yyyy'),
    //     customDueDate: DateTime.now().toFormat('MM-dd-yyyy'),
    //     time: '',
    //     repeat: false,
    //     repeatType: '',
    //     notes: '',
    // });

    const handleTabChange = (event: any, newValue: number) => {
        setEditTaskId(0);
        setCurrentTab(newValue);
    };



    const fetchOpenTasks = () => {
        trackPromise(
            ApiService.getByParams(193, 'Curately/Contacts/contact_task_list.jsp', { contId: contactId, clientId: userLocalData.getvalue('clientId') })
                .then((response) => {
                    let tempResponse = response.data;
                    for (let tr = 0; tr < tempResponse.length; tr++) {
                        tempResponse[tr].time = tempResponse[tr].hours + ":" + tempResponse[tr].mins + " " + tempResponse[tr].format;
                    }
                })
                .catch((error) => {
                    console.error("Failed to fetch task data", error);

                })
        );
    };
    const fetchCompletedTasks = useCallback(debounce(() => {
        trackPromise(
            ApiService.getByParams(193, 'Curately/Contacts/contact_task_list_completed.jsp', { contId: contactId })
                .then((response) => {
                    let result = response.data;
                    if (result) {
                        setCompletedTasks(result);
                    }
                })
                .catch((error) => {
                    console.error("Failed to fetch completed tasks", error);

                })
        );
    }, 600),
        []
    );

    useEffect(() => {
        if (taskView === "open") {
            fetchOpenTasks();
        } else {
            fetchCompletedTasks();
        }
    }, [contactId, taskView]);


    const updateTaskStatus = (taskId: any, isClose: number) => {
        const formData = {
            taskId: taskId,
            contId: contactId,
            notes: '',
            isclose: isClose,
            recrId: userLocalData.getvalue('recrId'),
            clientId: userLocalData.getvalue('clientId')
        };
        trackPromise(
            ApiService.getByParams(193, 'Curately/Contacts/contact_task_close.jsp', formData)
                .then((response) => {
                    if (isClose === 1) {
                        fetchOpenTasks();
                    } else {
                        fetchCompletedTasks();
                    }
                })
                .catch((error) => {
                    console.error("Failed to update task status:", error);
                })
        )
    };


    const currentDate = DateTime.now();
    const overdueTasks = taskData.filter(task => DateTime.fromFormat(task.seldate, 'MM/dd/yy') < currentDate);
    const upcomingTasks = taskData.filter(task => DateTime.fromFormat(task.seldate, 'MM/dd/yy') >= currentDate);

    const openContactView = (id: string) => {
        window.open(globalData.getWindowLocation() + "contact/view/" + id);
    };



    const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    // const handleOpenDialog = (card) => {
    //     setCardToDelete(card);
    //     setOpenDialog(true);
    // };

    // const handleCloseDialog = () => {
    //     setOpenDialog(false);
    //     setCardToDelete(null);
    // };

    // const handleDeleteCard = () => {
    //     setOpenDialog(false);
    //     setCardToDelete(null);
    //     notShow(false)
    // };

    const saveAuditLog = (id: number) => {
        ApiService.saveAuditLog(id);
    }



    return (
        <>
            {show ? (
                <div className="main-container">
                    <div className="left-side"></div>
                    <div className="right-side">
                        <div className="tasks-container task_container" id="tasks">
                            <Stack className="stack_main" sx={{ width: '100%' }}>
                                <Card className="tasks_Card" sx={{ height: '100vh', backgroundColor: 'white', position: 'relative' }} >
                                    <CloseIcon
                                        style={{ position: 'absolute', right: '10px', top: '10px', cursor: 'pointer', zIndex: 10 }}
                                        onClick={() =>
                                            //  handleOpenDialog('tasks')
                                            confirmDialog(`Are you sure you want to delete Task List ?`, () => {
                                                // deleteJobById(row.original.jobId); // Replace 1 with the actual jobId you want to delete
                                                saveAuditLog(3892);
                                                setOpenDialog(false);
                                                setCardToDelete(null);
                                                notShow(false)
                                            }, "warning")
                                        }
                                    />
                                    {currentTab === 0 && (
                                        <>
                                            <Tabs value={currentTab} onChange={handleTabChange} className="tasks_list">
                                                <Tab label={<Typography className="con-Acc-Text tasks_list_sub" sx={{ color: '#146EF6' }}>Tasks List</Typography>} />
                                            </Tabs>
                                            <Box hidden={currentTab !== 0} className="taskslist_dropdowns">
                                                <Accordion className="accordion-heading_overdue" expanded={expanded === 'overdue'} onChange={handleAccordionChange('overdue')}>
                                                    <AccordionSummary expandIcon={<ExpandMoreIcon />} className={expanded === 'overdue' ? 'accordion-heading-expanded' : ''}>
                                                        <Badge badgeContent={overdueTasks.length} color="error" className="overdue_tasklength" >
                                                            <Box className="accordion-heading" onClick={() => saveAuditLog(3890)}>
                                                                <Typography>Overdue</Typography>
                                                            </Box>
                                                        </Badge>

                                                    </AccordionSummary>
                                                    <AccordionDetails className="accordion_details">
                                                        <Box>
                                                            {overdueTasks.length > 0 ? (
                                                                <div className="tasksDiv">
                                                                    <div className="task_subdiv">
                                                                        {overdueTasks.map((task, index) => (
                                                                            <Box key={task.id} className="task_box_main">
                                                                                <Grid container style={{ justifyContent: 'flex-start', alignItems: 'base-line' }}>
                                                                                    <Box>
                                                                                        <FormControl>
                                                                                            <Checkbox size="small" onChange={() => { }} />
                                                                                        </FormControl>
                                                                                    </Box>
                                                                                    <Box className="task_box_sub">
                                                                                        {/* Changed for new dashboard design */}
                                                                                        <div>
                                                                                            {/* {task.seldate ? task.seldate : ""} {task.hours}{task.hours && task.mins ? ':' : ""}{task.mins}{task.format} */}
                                                                                            <span className="taskTask">{task.task}</span>
                                                                                        </div>
                                                                                        <Tooltip title={task.notes}>
                                                                                            <div className="taskNotes">{task.notes}</div>
                                                                                        </Tooltip>
                                                                                        <div className="taskCategory">
                                                                                            <span className={`categorySpan ${task.catg}`}>{task.catg}</span>
                                                                                            <span className="taskDate"><CalendarMonthRoundedIcon className="calendar_icon" />{task.seldate ? task.seldate : ""} {task.hours}{task.hours && task.mins ? ':' : ""}{task.mins}{task.format} </span>
                                                                                            {/* <span className='pl-2 taskNotes'>{task.task}</span> */}
                                                                                        </div>

                                                                                        <div className="editIcon">
                                                                                            <ModeTwoToneIcon onClick={() => { }} />
                                                                                        </div>
                                                                                    </Box>
                                                                                </Grid>
                                                                                {index < overdueTasks.length - 1 && <Divider />}
                                                                            </Box>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <Typography>No overdue tasks</Typography>
                                                            )}
                                                        </Box>
                                                    </AccordionDetails>
                                                </Accordion>

                                                <Accordion expanded={expanded === 'upcoming'} onChange={handleAccordionChange('upcoming')}>
                                                    <AccordionSummary expandIcon={<ExpandMoreIcon />} className={expanded === 'upcoming' ? 'accordion-heading-expanded' : ''}>
                                                        <Badge badgeContent={upcomingTasks.length} color="primary" className="overdue_tasklength">
                                                            <Box className="accordion-heading" onClick={() => saveAuditLog(3891)}>
                                                                <Typography>Upcoming</Typography>
                                                            </Box>
                                                        </Badge>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <Box>
                                                            {upcomingTasks.length > 0 ? (
                                                                <div className="tasksDiv">
                                                                    {upcomingTasks.map((task, index) => (
                                                                        <Box key={task.id}>
                                                                            <Grid container style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
                                                                                <Box>
                                                                                    <FormControl>
                                                                                        <Checkbox size="small" onChange={() => { }} />
                                                                                    </FormControl>
                                                                                </Box>
                                                                                <Box>
                                                                                    <div className="taskDate">
                                                                                        {task.seldate ? task.seldate : ""} {task.hours}{task.hours && task.mins ? ':' : ""}{task.mins}{task.format}
                                                                                    </div>
                                                                                    <div className="taskCategory">
                                                                                        <span className={`categorySpan ${task.catg}`}>{task.catg}</span>
                                                                                        <span className='pl-2 taskNotes'>{task.task}</span>
                                                                                    </div>
                                                                                    <Tooltip title={task.notes}>
                                                                                        <div className="taskNotes">{task.notes}</div>
                                                                                    </Tooltip>
                                                                                    <div className="editIcon">
                                                                                        <ModeTwoToneIcon onClick={() => { }} />
                                                                                    </div>
                                                                                </Box>
                                                                            </Grid>
                                                                            {index < upcomingTasks.length - 1 && <Divider />}
                                                                        </Box>
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                <Typography sx={{ color: 'lightgrey' }}>No upcoming tasks</Typography>
                                                            )}
                                                        </Box>
                                                    </AccordionDetails>
                                                </Accordion>
                                            </Box>
                                        </>
                                    )}
                                    <Box hidden={currentTab !== 1}>
                                        {currentTab === 1 && <AddTask contName="" taskData={[]} contactId="" taskUpdated={() => { }} taskId={0} />}
                                    </Box>
                                </Card>
                            </Stack>
                        </div>
                    </div>
                </div>
            ) : null}

            {/* <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete Card"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this card?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteCard} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog> */}
        </>
    );
};



export default DashBoardTasks;
