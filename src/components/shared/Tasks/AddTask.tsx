import { useEffect, useState } from "../../../shared/modules/React";

import { Box } from "../../../shared/modules/MaterialImports/Box";
import { LocalizationProvider, AdapterLuxon, DatePicker } from '../../../shared/modules/MaterialImports/DatePicker';
import { Button } from "../../../shared/modules/MaterialImports/Button";
import { TextField, InputLabel, FormControl, FormControlLabel } from "../../../shared/modules/MaterialImports/FormInputs";
import { MenuItem } from "../../../shared/modules/MaterialImports/Menu";
import { Checkbox, Select } from '../../../shared/modules/MaterialImports/FormElements';
import { MUIAutoComplete } from "../MUIAutoComplete/MUIAutoComplete";
import masterTimeList from "../../../shared/data/Time";
import { styled } from '@mui/material/styles';
import { useFormik, Yup } from '../../../shared/modules/Formik';
import { showToaster } from "../SnackBar/SnackBar";
import { DateTime } from "../../../shared/modules/Luxon";
import { userLocalData } from "../../../shared/services/userData";
import { Stack } from "../../../shared/modules/MaterialImports/Stack";
import './Tasks.scss';
// import Typography from "@mui/material/Typography";
import ApiService from "../../../shared/api/api"
import { trackPromise } from '../../../shared/modules/PromiseTrackter';
import ErrorMessage from "../Error/ErrorMessage";



type RepeatOption = {
    value: string;
    label: string;
};

const AddTask = ({ contName, taskData, taskId, contactId, taskUpdated }: { contName: string; taskId: number; taskData: any; contactId: string; taskUpdated: (updated: boolean) => void; }) => {

    // console.log(taskData);
    const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

    const [repeatOnOptions, setRepeatOnOptions] = useState<RepeatOption[]>([]);

    const [isFormSubmitted, setIsFormSubmitted] = useState(false);


    const taskValidationSchema = Yup.object({
        task: Yup.string().required('Title is required'),
        type: Yup.string().required('Type is required'),
        priority: Yup.string().required('Priority is required'),
        assignedTo: Yup.string().required('Recruiter is required'),
        assigned_names: Yup.string(),
        dueDate: Yup.string().nullable().test(
            'dueDateOrCustom',
            'Either Due Date or Custom Due Date must be provided',
            function (value) {
                const { customDueDate } = this.parent;
                return value || customDueDate;
            }
        ),
        customDueDate: Yup.date().nullable().test(
            'customOrDueDate',
            'Either Custom Due Date or Due Date must be provided',
            function (value) {
                const { dueDate } = this.parent;
                return dueDate === 'customDate' ? !!value : true;
            }
        ),
        repeat: Yup.boolean(),
        repeatType: Yup.string(),
        // .when('repeat', {
        //     is: true,
        //     then: (f:any) => f.required('Repeat type is required'),
        //     otherwise: Yup.string().nullable(),
        // }),
        seltime: Yup.string(),
        notes: Yup.string(),
    });

    const dateOptions = [
        { value: DateTime.now().toFormat('MM-dd-yyyy'), label: 'Today' },
        { value: DateTime.now().plus({ days: 1 }).toFormat('MM-dd-yyyy'), label: 'Tomorrow' },
        { value: DateTime.now().plus({ days: 2 }).toFormat('MM-dd-yyyy'), label: `In 2 days (${DateTime.now().plus({ days: 2 }).toFormat('cccc')})` },
        { value: DateTime.now().plus({ days: 3 }).toFormat('MM-dd-yyyy'), label: `In 3 days (${DateTime.now().plus({ days: 3 }).toFormat('cccc')})` },
        { value: DateTime.now().plus({ weeks: 1 }).toFormat('MM-dd-yyyy'), label: `In 1 week (${DateTime.now().plus({ weeks: 1 }).toFormat('LLLL d')})` },
        { value: DateTime.now().plus({ weeks: 2 }).toFormat('MM-dd-yyyy'), label: `In 2 weeks (${DateTime.now().plus({ weeks: 2 }).toFormat('LLLL d')})` },
        { value: DateTime.now().plus({ months: 1 }).toFormat('MM-dd-yyyy'), label: `In 1 month (${DateTime.now().plus({ months: 1 }).toFormat('LLLL d')})` },
        { value: DateTime.now().plus({ months: 3 }).toFormat('MM-dd-yyyy'), label: `In 3 months (${DateTime.now().plus({ months: 3 }).toFormat('LLLL d')})` },
        { value: DateTime.now().plus({ months: 6 }).toFormat('MM-dd-yyyy'), label: `In 6 months (${DateTime.now().plus({ months: 6 }).toFormat('LLLL d')})` },
        { value: 'customDate', label: 'Custom Date' }
    ];

    const taskFormik = useFormik({
        initialValues: {
            ...taskData,
            dueDate: dateOptions.some(el => el.value === taskData.dueDate) ? taskData.customDueDate : 'customDate',
            customDueDate: taskData.customDueDate
        },
        validationSchema: taskValidationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (values) => {
            handleCreateClick();
        },
    });

    const getWeekOfMonth = (date: any) => {
        // console.log(date)
        const firstDayOfMonth = date.startOf('month');
        const weekNumber = Math.floor(date.day / 7);
        const dayOfWeek = date.weekday;
        const isFirstWeek = date < firstDayOfMonth.plus({ days: 7 });
        return isFirstWeek ? 1 : weekNumber + (dayOfWeek < firstDayOfMonth.weekday ? 1 : 0);
    };

    const generateRepeatOptions = (dueDate: any) => {
        console.log(dueDate)
        const weekOfMonth = getWeekOfMonth(dueDate);
        const weekOfMonthText = ['First', 'Second', 'Third', 'Fourth', 'Fifth'][weekOfMonth - 1] || 'Last';
        return [
            { value: 'daily', label: 'Daily' },
            { value: 'weekly', label: `Weekly on ${dueDate.toFormat('cccc')}` },
            { value: 'biweekly', label: `Bi-Weekly on ${dueDate.plus({ weeks: 2 }).toFormat('cccc')}` },
            { value: 'monthly', label: `Monthly on the ${weekOfMonthText} ${dueDate.toFormat('cccc')}` },
            { value: 'annually', label: `Annually on ${dueDate.plus({ years: 1 }).toFormat('MMM dd')}` },
            { value: 'weekday', label: 'Every weekday (Monday to Friday)' },
        ];
    };

    // useEffect(() => {
    //     if (selectedDateOption) {
    //         // console.log(selectedDateOption)
    //         let dueDateTime = DateTime.fromISO(selectedDateOption);
    //         if (dueDateTime?.invalid) {
    //             dueDateTime = DateTime.fromFormat(selectedDateOption, 'MM-dd-yyyy')
    //         }
    //         const newRepeatOnOptions = generateRepeatOptions(dueDateTime);
    //         setRepeatOnOptions(newRepeatOnOptions);
    //     }
    //     if (customDate) {
    //         const newRepeatOnOptions = generateRepeatOptions(customDate);
    //         setRepeatOnOptions(newRepeatOnOptions);
    //     }


    // }, [taskFormik.values.dueDate, customDate]);

    // const handleDateOptionChange = (event: any) => {
    //     const value = event.target.value;
    //     setSelectedDateOption(value);
    //     // console.log(value)
    //     if (value === 'customDate') {

    //         setShowCustomDatePicker(true);

    //         if (!customDate) {
    //             const today = DateTime.now();
    //             setCustomDate(today);
    //             taskFormik.setFieldValue('dueDate', today);
    //         }
    //     }
    //     else {
    //         const selectedOption = dateOptions.find(option => option.value === value);
    //         if (selectedOption) {
    //             const dueDateTime = DateTime.fromFormat(selectedOption.value, 'MM-dd-yyyy');
    //             taskFormik.setFieldValue('dueDate', dueDateTime);

    //             setDueDateForAPI(dueDateTime.toISO());

    //             const newRepeatOnOptions = generateRepeatOptions(dueDateTime);
    //             setRepeatOnOptions(newRepeatOnOptions);
    //         }
    //         setShowCustomDatePicker(false);
    //         setCustomDate(null);
    //     }
    // };

    // const handleCustomDateChange = (newValue: DateTime | null) => {
    //     if (newValue) {
    //         setCustomDate(newValue);
    //         taskFormik.setFieldValue('dueDate', newValue);
    //         const newRepeatOnOptions = generateRepeatOptions(customDate);
    //         setRepeatOnOptions(newRepeatOnOptions);
    //     }
    // };


    const BpIcon = styled("span")(() => ({
        borderRadius: 1,
        width: 16,
        height: 16,
        backgroundColor: '#ffffff',
    }));
    const BpCheckedIcon = styled(BpIcon)({
        backgroundColor: 'var(--c-primary-color)',
        "&:before": {
            display: "block",
            width: 16,
            height: 16,
            backgroundImage:
                "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
                " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
                "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
            content: '""'
        },
    });
    const BpCheckboxContainer = styled("div")({
        '.bp-icon': {
            border: "1px var(--c-secondary-color) solid",
        },
        "& .bp-checkbox:hover .bp-icon": {
            borderColor: 'var(--c-primary-color)',
        }
    });


    const calculateRepeatDate = (dueDate: any, repeatType: any) => {
        let parsedDueDate = DateTime.fromFormat(dueDate, 'MM-dd-yyyy');
        // DateTime.fromISO(dueDate);

        switch (repeatType) {
            case 'daily':
                return parsedDueDate.plus({ days: 1 }).toISODate();
            case 'weekly':
                return parsedDueDate.plus({ weeks: 1 }).toISODate();
            case 'monthly':
                return parsedDueDate.plus({ months: 1 }).toISODate();
            case 'annually':
                return parsedDueDate.plus({ years: 1 }).toISODate();
            case 'weekday':
                let nextDay = parsedDueDate.plus({ days: 1 });
                while (nextDay.weekday === 6 || nextDay.weekday === 7) {
                    nextDay = nextDay.plus({ days: 1 });
                }
                return nextDay.toISODate();
            default:
                return dueDate;
        }
    };
    function parseFormikTime(formikTime: any) {
        const [time, period] = formikTime.split(' ');
        let [hours, minutes] = time.split(':');
        if (period === 'PM' && hours !== '12') {
            hours = (parseInt(hours, 10) + 12).toString();
        } else if (period === 'AM' && hours === '12') {
            hours = '00';
        }
        hours = hours.padStart(2, '0');

        return {
            due_hours: hours,
            due_mins: minutes,
            due_format: period,
        };
    }
    // const formattedDueDate = taskFormik.values.dueDate
    //     ? (taskFormik.values.dueDate as DateTime).toFormat('MM-dd-yyyy')
    //     : null;

    const handleCreateClick = () => {
        setIsFormSubmitted(true);
        const { due_hours, due_mins, due_format } = parseFormikTime(taskFormik.values.selTime);
        const repeatDate = taskFormik.values.repeatType ? calculateRepeatDate((taskFormik.values.dueDate === "customDate") ? taskFormik.values.customDueDate : taskFormik.values.dueDate, taskFormik.values.repeatType) : "";

        if (taskFormik.values.repeat) {
            if (taskFormik.values.repeatType.trim() === "") {
                showToaster('Please select repeat type.', 'error');
                // console.log("Please select repeat type");
                return false;
            }
        } else {
            taskFormik.setFieldValue("repeatType", "");
        }

        let formData = {
            id: "",
            taskName: taskFormik.values.task,
            selDate: (taskFormik.values.dueDate === "customDate") ? taskFormik.values.customDueDate : taskFormik.values.dueDate,
            dueHours: due_hours,
            dueMins: due_mins,
            dueFormat: due_format,
            due: "setdatetime",
            catg: taskFormik.values.type,
            userId: "",
            contId: contactId,
            compId: "",
            recrId: userLocalData.getvalue('recrId'),
            clientId: userLocalData.getvalue('clientId'),
            priority: taskFormik.values.priority,
            associate: "",
            assignedTo: taskFormik.values.assignedTo,
            assignedNames: taskFormik.values.assigned_names,
            queue: "",
            repeat: (taskFormik.values.repeat) ? 1 : 0,
            reminder: "",
            associateNames: "",
            notes: taskFormik.values.notes,
            repeatType: taskFormik.values.repeatType,
            repeatId: taskFormik.values?.repeatId,
            repeatDate: taskFormik.values.repeatType ? repeatDate : "",

        }
        if (taskId) {
            formData.id = taskId + "";
        }
        // console.log(formData)
        trackPromise(
            ApiService.postWithData('admin', taskId ? 'updateContactTask' : 'saveContactTask', formData)
                .then((response) => {
                    if (response.data.Message === "Success") {
                        showToaster('Task has been added successfully.', 'success');
                        taskUpdated(true);

                    } else {
                        showToaster((response.data.message) ? response.data.message : "An error occured while saving the Task.", 'error')
                    }
                    // console.log(response);

                })
                .catch((error) => {
                    console.error(error);
                }));
        setIsFormVisible(false);
    }
    // const handleUpdateClick = () => {
    //     setIsFormSubmitted(true);
    //     // const taskIndex = taskData.findIndex((task: any) => task.id === taskId);
    //     // if (taskIndex !== -1) {

    //     const { due_hours, due_mins, due_format } = parseFormikTime(taskFormik.values.selTime);
    //     const repeatDate = calculateRepeatDate(dueDateForAPI, taskFormik.values.repeatType);

    //     const formData = {
    //         id: taskId,
    //         task: taskFormik.values.task,
    //         seldate: DateTime.fromISO(dueDateForAPI ? dueDateForAPI : new Date().toISOString()).toFormat('MM-dd-yyyy'),
    //         due_hours: due_hours,
    //         due_mins: due_mins,
    //         due_format: due_format,
    //         due: "setdatetime",
    //         catg: taskFormik.values.type,
    //         userId: "",
    //         contId: contactId,
    //         compId: "",
    //         recrId: userLocalData.getvalue('recrId'),
    //         clientId: userLocalData.getvalue('clientId'),
    //         priority: taskFormik.values.priority,
    //         associate: "",
    //         assigned: taskFormik.values.assignedTo,
    //         assigned_names: taskFormik.values.assigned_names,
    //         queue: "",
    //         repeat: (taskFormik.values.repeat) ? 1 : 0,
    //         reminder: "",
    //         associate_names: "",
    //         notes: taskFormik.values.notes,
    //         repeat_type: taskFormik.values.repeatType,
    //         repeat_date: taskFormik.values.repeatType ? repeatDate : ""
    //     };
    //     // console.log(formData);        
    //     trackPromise(
    //         ApiService.getByParams(193, 'Curately/Contacts/task_update.jsp', formData)
    //             .then((response) => {
    //                 // console.log(response.data);

    //                 if (response.data.message === "Success") {
    //                     showToaster('Task has been updated successfully.', 'success');

    //                     taskUpdated(true);
    //                 } else {
    //                     showToaster((response.data.message) ? response.data.message : "An error occured while saving the Candidate.", 'error')
    //                 }
    //             })
    //             .catch((error) => {

    //                 console.error(error);
    //             })
    //     );
    //     // } else {

    //     //     console.error('Task not found for update.');
    //     // }
    // };
    const handleCancelClick = () => {
        taskFormik.resetForm();
        taskUpdated(false);
    };

    useEffect(() => {
        const newRepeatOnOptions = generateRepeatOptions(DateTime.fromFormat(taskData.dueDate, 'MM-dd-yyyy'));
        setRepeatOnOptions(newRepeatOnOptions);
    }, []);
    const timeExistsInList = masterTimeList.some(time => time.id === taskFormik.values.selTime);

    return <form onSubmit={taskFormik.handleSubmit}>
        <Box>
            <Box>
                {!isFormVisible && (<Box>
                    {/* <Box sx={{ display: 'flex', flexDirection: 'column' }} > */}
                    <Box className="radio-Box">

                        <TextField
                            className="typeNote"
                            placeholder="Enter task title..."
                            sx={{ marginBottom: '12px', paddingTop: '10px' }}
                            size="small"
                            value={taskFormik.values.task}
                            onChange={taskFormik.handleChange}
                            name="task"
                        // onBlur={taskFormik.handleBlur}
                        // error={taskFormik.touched.task && Boolean(taskFormik.errors.task)}
                        // helperText={taskFormik.touched.task && taskFormik.errors.task}
                        />
                        <ErrorMessage formikObj={taskFormik} name={'task'} isFormSubmitted={isFormSubmitted}></ErrorMessage>


                        <Stack direction="row" spacing={1} sx={{ width: '100%', marginBottom: '12px' }}>
                            <FormControl sx={{ width: '50%' }}>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    displayEmpty
                                    name="type"
                                    value={taskFormik.values.type}
                                    onChange={taskFormik.handleChange}
                                    onBlur={taskFormik.handleBlur}
                                    size="small"
                                    className="typeNote"
                                >
                                    <MenuItem value="" disabled>Type</MenuItem>
                                    <MenuItem value="To-Do">To-Do</MenuItem>
                                    <MenuItem value="Call">Call</MenuItem>
                                    <MenuItem value="Email">Email</MenuItem>
                                </Select>
                                <ErrorMessage formikObj={taskFormik} name={'type'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                            </FormControl>

                            <FormControl sx={{ width: '50%' }}>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    displayEmpty
                                    value={taskFormik.values.priority}
                                    onChange={taskFormik.handleChange}
                                    onBlur={taskFormik.handleBlur}
                                    size="small"
                                    className="typeNote"
                                    name='priority'
                                >
                                    <MenuItem value="" disabled>Priority</MenuItem>
                                    <MenuItem value="0">None</MenuItem>
                                    <MenuItem value="1">Low</MenuItem>
                                    <MenuItem value="2">Medium</MenuItem>
                                    <MenuItem value="3">High</MenuItem>
                                </Select>
                                <ErrorMessage formikObj={taskFormik} name={'priority'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                {/* {taskFormik.touched.priority && taskFormik.errors.priority && (
                                        <Typography color="error" variant="caption">{taskFormik.errors.priority}</Typography>
                                    )} */}
                            </FormControl>
                        </Stack>
                        <MUIAutoComplete
                            id='recruiter'
                            valuePassed={{
                                id: taskFormik.values.assignedTo,
                                label: taskFormik.values.assigned_names || 'Unknown',
                            }}
                            handleChange={(id: any, name: any) => {
                                taskFormik.setFieldValue('assignedTo', id);
                                taskFormik.setFieldValue('assigned_names', name || '');
                            }}
                            isMultiple={false}
                            width="100%"
                            type='userName'
                            placeholder="Select recruiter"
                        />
                        <ErrorMessage formikObj={taskFormik} name={'assignedTo'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                        <Stack
                            className="dateTime-stack mt-5"
                            direction='row'
                            spacing={1}

                        >
                            <Stack spacing={3}>
                                {/* {!showCustomDatePicker && !isDatePickerOpen ? ( */}
                                <LocalizationProvider dateAdapter={AdapterLuxon}>
                                    {taskFormik.values.dueDate === 'customDate' ? (
                                        <DatePicker
                                            label="Select Date"
                                            slotProps={{ textField: { size: 'small' } }}
                                            onChange={(date: any) => {
                                                taskFormik.setFieldValue("customDueDate", date ? date.toFormat('MM-dd-yyyy') : null, true);
                                                taskFormik.setFieldValue("dueDate", "customDate", true);
                                                if (date) {
                                                    const newRepeatOnOptions = generateRepeatOptions(date);
                                                    setRepeatOnOptions(newRepeatOnOptions);
                                                }
                                            }}
                                            value={taskFormik.values.customDueDate ? DateTime.fromFormat(taskFormik.values.customDueDate, 'MM-dd-yyyy') : null}
                                            sx={{ width: '170px' }}
                                        />
                                    ) : (
                                        <FormControl size="small">
                                            <InputLabel id="date-select-label">Due Date</InputLabel>
                                            <Select
                                                labelId="date-select-label"
                                                id="dueDate"
                                                name="dueDate"
                                                value={taskFormik.values.dueDate}
                                                label="Due Date"
                                                onChange={(e) => {
                                                    taskFormik.handleChange(e);
                                                    if (e.target.value) {
                                                        const newRepeatOnOptions = generateRepeatOptions(DateTime.fromFormat(e.target.value, 'MM/dd/yyyy'));
                                                        setRepeatOnOptions(newRepeatOnOptions);
                                                    }
                                                    if (e.target.value === 'customDate') {
                                                        taskFormik.setFieldValue("customDueDate", null);
                                                    }
                                                }}
                                                size="small"
                                                sx={{ width: '163px !important', mr: 1 }}
                                            >
                                                {dateOptions.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            <ErrorMessage formikObj={taskFormik} name={'dueDate'} isFormSubmitted={isFormSubmitted} />
                                        </FormControl>
                                    )}
                                </LocalizationProvider>

                                {/* {taskFormik.touched.dueDate && taskFormik.errors.dueDate && (
                                        <Typography color="error" variant="caption" sx={{ mt: '0 !important' }}>
                                            {taskFormik.errors.dueDate}
                                        </Typography>
                                    )} */}
                            </Stack>
                            <FormControl>
                                <TextField
                                    select
                                    id="demo-simple-select"
                                    size="small"
                                    name="selTime"
                                    value={taskFormik.values.selTime}
                                    onChange={taskFormik.handleChange}
                                    sx={{ width: "135px" }}
                                >
                                    {!timeExistsInList && (
                                        <MenuItem value={taskFormik.values.selTime}>
                                            {taskFormik.values.selTime}
                                        </MenuItem>
                                    )}
                                    {masterTimeList.map((timeLabel) => (
                                        <MenuItem key={timeLabel.id} value={timeLabel.id}>
                                            {timeLabel.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <ErrorMessage formikObj={taskFormik} name={'selTime'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                            </FormControl>
                        </Stack>
                        <div style={{ width: '100%' }}>
                            <FormControlLabel
                                control={
                                    <BpCheckboxContainer>
                                        <Checkbox
                                            className="bp-checkbox"
                                            disableRipple
                                            name="repeat"
                                            checked={Boolean(taskFormik.values.repeat)}
                                            // onChange={() => taskFormik.setFieldValue('repeat', !taskFormik.values.repeat)}
                                            onChange={() => {
                                                const newValue = !taskFormik.values.repeat;
                                                taskFormik.setFieldValue('repeat', newValue);
                                                // Reset repeatType if unchecked
                                                if (!newValue) {
                                                    taskFormik.setFieldValue('repeatType', '');
                                                }
                                            }}
                                            checkedIcon={<BpCheckedIcon className="bp-icon" style={{ borderColor: 'var(--c-primary-color)' }} />}
                                            icon={<BpIcon className="bp-icon" />}
                                        />
                                    </BpCheckboxContainer>
                                }
                                label="Repeat"
                                sx={{ ml: 0 }}
                            />
                        </div>

                        {
                            taskFormik.values.repeat ?
                                <>
                                    <Select
                                        name="repeatType"
                                        value={taskFormik.values.repeatType}
                                        onChange={taskFormik.handleChange}
                                        size="small"
                                        className="typeNote"
                                    >
                                        {repeatOnOptions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <ErrorMessage formikObj={taskFormik} name={'repeatType'} isFormSubmitted={isFormSubmitted}></ErrorMessage></> :
                                null
                        }


                        <TextField
                            multiline
                            rows={3}
                            className=""
                            placeholder="Enter Notes"
                            sx={{ marginBottom: '12px', paddingTop: '10px' }}
                            size="small"
                            value={taskFormik.values.notes}
                            onChange={taskFormik.handleChange}
                            name="notes"
                            onBlur={taskFormik.handleBlur}
                            fullWidth
                        />

                    </Box>
                    {/* </Box> */}

                    <Stack direction='row' spacing={2} pl='20px' pr='20px' sx={{ display: 'flex', justifyContent: 'space-between', width: 'auto' }} mb={2} mt={1}>

                        <Button
                            disableRipple
                            color="primary"
                            variant="contained"
                            type="submit"

                        >
                            {taskId ? "Update" : "Create"}
                        </Button>
                        <Button
                            disableRipple
                            color="secondary"
                            variant="outlined"
                            onClick={handleCancelClick}
                        >
                            Cancel
                        </Button>
                    </Stack>
                </Box>


                )}


            </Box>
        </Box>
    </form>
}

export default AddTask;