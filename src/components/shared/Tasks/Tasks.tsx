import { Stack } from "../../../shared/modules/MaterialImports/Stack";
import { Card } from "../../../shared/modules/MaterialImports/Card";
import { useState, useEffect, useCallback } from '../../../shared/modules/React';
import { FormControl, FormControlLabel } from '../../../shared/modules/MaterialImports/FormInputs';
import './Tasks.scss';
import { Typography } from "../../../shared/modules/MaterialImports/Typography";
import { Box } from "../../../shared/modules/MaterialImports/Box";
import ApiService from "../../../shared/api/api"
import { DateTime } from '../../../shared/modules/Luxon';
import { trackPromise } from '../../../shared/modules/PromiseTrackter';
import { userLocalData } from "../../../shared/services/userData";

import { Tabs, Tab } from "../../../shared/modules/MaterialImports/Tabs";
import { Grid } from "../../../shared/modules/MaterialImports/Grid";
import { FormGroup } from "../../../shared/modules/MaterialImports/FormGroup";
import { Checkbox, Radio, RadioGroup } from "../../../shared/modules/MaterialImports/FormElements";
import { Tooltip } from "../../../shared/modules/MaterialImports/ToolTip";
import ModeTwoToneIcon from '@mui/icons-material/ModeTwoTone';
import AddTask from "./AddTask";
import { debounce } from "lodash";


const Tasks = ({ contName, contactId }: { contName: string, contactId: any }) => {
    const [taskData, setTaskData] = useState<any[]>([]);
    const [isContact, setIsContact] = useState(true);
    const [completedTasks, setCompletedTasks] = useState<any>([]);
    const [currentTab, setCurrentTab] = useState(0);
    const [taskView, setTaskView] = useState('open');
    const [editTaskId, setEditTaskId] = useState(0);

    const initialTaskData = {
        task: '',
        type: '',
        contName: contName,
        priority: '',
        recruiter: '',
        assignedTo: userLocalData.getvalue('recrId') ? userLocalData.getvalue('recrId') : "",
        assigned_names: userLocalData.getvalue('recrFullName') ? userLocalData.getvalue('recrFullName') : "",
        selTime: '8:00 AM',
        dueDate: DateTime.now().toFormat('MM-dd-yyyy'),
        customDueDate: DateTime.now().toFormat('MM-dd-yyyy'),
        time: '',
        repeat: false,
        repeatType: '',
        notes: '',
    }

    const [editTaskData, setEditTaskData] = useState({
        task: '',
        type: '',
        contName: contName,
        priority: '',
        recruiter: '',
        assignedTo: userLocalData.getvalue('recrId') ? userLocalData.getvalue('recrId') : "",
        assigned_names: userLocalData.getvalue('recrFullName') ? userLocalData.getvalue('recrFullName') : "",
        selTime: '8:00 AM',
        dueDate: DateTime.now().toFormat('MM/dd/yyyy'),
        customDueDate: DateTime.now().toFormat('MM/dd/yyyy'),
        time: '',
        repeat: false,
        repeatType: '',
        notes: '',
        repeatId: '',

    });

    const handleTabChange = (event: any, newValue: number) => {
        setEditTaskId(0);
        setCurrentTab(newValue);
        // if (newValue === 1) {
        //     taskFormik.setFieldValue('assignedTo', userLocalData.getvalue('recrId'));
        //     taskFormik.setFieldValue('assigned_names', userLocalData.getvalue('recrFullName'));
        // }
    };
    const handleTaskViewChange = (event: any) => {
        setTaskView(event.target.value);
    };



    const fetchOpenTasks = () => {
        trackPromise(
            ApiService.postWithData('admin', 'contactTaskList', { contId: contactId, clientId: userLocalData.getvalue('clientId') })
                .then((response) => {
                    let tempResponse = response.data.contactTask;
                    for (let tr = 0; tr < tempResponse.length; tr++) {
                        tempResponse[tr].time = tempResponse[tr].hours + ":" + tempResponse[tr].mins + " " + tempResponse[tr].format;
                    }
                    //console.log(tempResponse);
                    setTaskData(tempResponse);
                })
                .catch((error) => {
                    console.error("Failed to fetch task data", error);

                })
        );
    };
    const fetchCompletedTasks = useCallback(debounce(() => {
        trackPromise(
            ApiService.postWithData('admin', 'getContactTaskList', { contId: contactId, clientId: userLocalData.getvalue('clientId') })
                .then((response) => {
                    let result = response.data.contactTaskList;
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
            isclose: isClose,
            recrId: userLocalData.getvalue('recrId'),
            clientId: userLocalData.getvalue('clientId')
        };
        trackPromise(
            ApiService.postWithData('admin', 'updateContactTaskClose', formData)
                .then((response) => {
                    console.log("Task status updated:", response);
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


    const getContactTaskListById = (taskId: number) => {
        trackPromise(
            ApiService.postWithData('admin', 'getContactTaskListById', { contId: contactId, clientId: userLocalData.getvalue('clientId'), id: taskId })
                .then((result) => {

                    const optionDetails = result.data.response[0];
                    console.log(optionDetails, "test..")
                })
                .catch((error) => {
                    console.error("Failed to fetch task data", error);

                })
        );
    };


    const openEditTask = (task: any) => {
        setEditTaskId(task.id);
        console.log(task)
        setEditTaskData({
            task: task.task,
            type: task.catg,
            contName: contName,
            priority: task.priority,
            recruiter: '',
            assignedTo: task.assigned,
            assigned_names: task.assigned_names,
            selTime: task.hours + ':' + task.mins + ' ' + task.format,
            //DateTime.fromISO(dueDateForAPI ? dueDateForAPI : new Date().toISOString()).toFormat('MM-dd-yyyy')
            dueDate: task.selDate,
            customDueDate: task.selDate,
            time: task.hours + ':' + task.mins + ' ' + task.format,
            repeat: Number(task.repeat) ? true : false,
            repeatType: task.repeatType,
            repeatId: task.repeatId,
            notes: task.notes,
        });
        // setCustomDate(DateTime.fromFormat(task.seldate, 'MM-dd-yyyy'));

        setCurrentTab(1);
        getContactTaskListById(task.id)

    }


    return (
        <div className="tasks-container" id="tasks">
            <Stack sx={{ width: '92%', marginLeft: '30px' }}>
                <Card sx={{ boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)' }} className="tasks_addtasks">
                    {isContact && (

                        <>
                            <Tabs value={currentTab} onChange={handleTabChange} className="tasks_addtasks_heading
                            ">
                                <Tab label={<Typography className="con-Acc-Text"
                                    sx={{
                                        color: isContact ? '#146EF6' : '#474747',

                                    }}>
                                    Tasks List
                                </Typography>} />
                                {/* <Tab label={<Typography className="con-Acc-Text"
                                            sx={{
                                                color: isContact ? '#146EF6' : '#474747',

                                            }}>
                                            Completed Tasks
                                        </Typography>}

                                        /> */}
                                {
                                    userLocalData.checkIntegration(400015) ?
                                        <Tab label={<Typography className="con-Acc-Text"
                                            sx={{
                                                color: isContact ? '#146EF6' : '#474747',

                                            }}>
                                            Add Tasks
                                        </Typography>} />
                                        :
                                        null
                                }
                            </Tabs>

                            <Box hidden={currentTab !== 0} >
                                <>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 2, paddingLeft: '3px' }}>
                                        <FormControl component="fieldset">
                                            <RadioGroup row defaultValue="open" onChange={handleTaskViewChange} name="taskView">
                                                <FormControlLabel value="open" sx={{ paddingRight: '10px' }} control={<Radio />} label="Open Tasks" />
                                                <FormControlLabel value="completed" sx={{ paddingLeft: '10px' }} control={<Radio />} label="Completed Tasks" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Box>
                                    <Box className="tasksDiv_main">
                                        {taskView === 'open' ? (
                                            <div className="tasksDiv">
                                                {taskData.map((task: any) => (
                                                    <div className="task" key={task.id}>
                                                        {
                                                            (task.catg) ?
                                                                <div>
                                                                    <Grid container style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
                                                                        {
                                                                            userLocalData.checkIntegration(400015) ?
                                                                                <Box>
                                                                                    <FormControl>
                                                                                        <Checkbox size="small"
                                                                                            onChange={() => updateTaskStatus(task.id, 1)}
                                                                                        />
                                                                                    </FormControl>
                                                                                </Box>
                                                                                :
                                                                                null
                                                                        }
                                                                        <Box >
                                                                            <div className="taskDate">
                                                                                {/* 12-01-2022 */}
                                                                                {(task.selDate) ? DateTime.fromFormat(task.selDate, 'MM-dd-yy').toFormat('MM/dd/yyyy') : ""} {task.hours}{(task.hours && task.mins) ? ':' : ""}{task.mins}{task.format}</div>
                                                                            <div className="taskCategory">
                                                                                <span className={`categorySpan ${task.catg}`}>{task.catg}</span>
                                                                                <span className='pl-2 taskNotes'>{task.task}</span>
                                                                            </div>
                                                                            <Tooltip title={task.notes}>
                                                                                <div className="taskNotes">{task.notes}</div>
                                                                            </Tooltip>
                                                                            <div className="editIcon">
                                                                                {
                                                                                    userLocalData.checkIntegration(400015) ?
                                                                                        <ModeTwoToneIcon onClick={() => openEditTask(task)} />
                                                                                        :
                                                                                        null
                                                                                }
                                                                            </div>
                                                                            {/* showMoreNotes[1] */}
                                                                        </Box>
                                                                    </Grid>
                                                                </div>
                                                                :
                                                                null
                                                        }
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="tasksDiv2">
                                                <div>
                                                    <Grid container>
                                                        <FormGroup>
                                                            {
                                                                completedTasks.map((task: any) => {
                                                                    return <div className="task" key={task.taskId}>
                                                                        {
                                                                            (userLocalData.checkIntegration(400015)) ?
                                                                                <FormControlLabel
                                                                                    control={<Checkbox defaultChecked value={task.taskId} onChange={() => updateTaskStatus(task.taskId, 0)} />}
                                                                                    label={
                                                                                        <span className="checkBoxLabel"><del>{task.catg}:{task.taskName}</del> <span className="text1 px-2"> {task.recruiterName} {task.date ? DateTime.fromFormat(task.date.substring(0, 19), 'yyyy-MM-dd hh:mm:ss').toFormat('MM/dd/yyyy hh:mm a') : ""}
                                                                                        </span></span>
                                                                                    }
                                                                                /> :
                                                                                <span className="checkBoxLabel"><del>{task.catg}:{task.taskName}</del> <span className="text1 px-2"> {task.recruiterName} {task.date ? DateTime.fromFormat(task.date.substring(0, 19), 'yyyy-MM-dd hh:mm:ss').toFormat('MM/dd/yyyy hh:mm a') : ""} </span></span>
                                                                        }
                                                                    </div>
                                                                })
                                                            }
                                                        </FormGroup>
                                                    </Grid>
                                                </div>
                                            </div>
                                        )}
                                    </Box>



                                </>
                            </Box>
                            <Box hidden={currentTab !== 1} >
                                {
                                    (currentTab === 1) ?
                                        <AddTask contName={contName} taskData={editTaskId ? editTaskData : initialTaskData}
                                            contactId={contactId || ""} taskUpdated={(updated) => {
                                                setCurrentTab(0);
                                                if (updated) {
                                                    fetchOpenTasks();
                                                }
                                            }}
                                            taskId={editTaskId}
                                        />
                                        :
                                        null
                                }
                            </Box>

                        </>



                    )}

                </Card >
            </Stack >

        </div >
    )
}
export default Tasks;
