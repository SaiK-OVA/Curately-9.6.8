import { useState, useEffect } from '../../../../shared/modules/React';
import { useFormik, Yup } from '../../../../shared/modules/Formik';
import { Grid } from '../../../../shared/modules/MaterialImports/Grid';
import { Dialog, DialogContent, DialogTitle } from '../../../../shared/modules/MaterialImports/Dialog';
import { Divider } from '../../../../shared/modules/MaterialImports/Divider';
import { Button, IconButton } from '../../../../shared/modules/MaterialImports/Button';
import { TextField, FormLabel } from '../../../../shared/modules/MaterialImports/FormInputs';
import { MenuItem } from '../../../../shared/modules/MaterialImports/Menu';
import { Box } from '../../../../shared/modules/MaterialImports/Box';
import ErrorMessage from '../../../shared/Error/ErrorMessage';
import { Tooltip } from '../../../../shared/modules/MaterialImports/ToolTip';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Card } from '../../../../shared/modules/MaterialImports/Card';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import './AddGoal.scss'
import ApiService from '../../../../shared/api/api';
import { showToaster } from '../../../../shared/modules/commonImports';
import { trackPromise } from '../../../../shared/modules/PromiseTrackter';
import { userLocalData } from '../../../../shared/services/userData';
import { MUIAutoComplete } from '../../../shared/MUIAutoComplete/MUIAutoComplete';

interface AddGoalProps {
    open: boolean;
    handleClose: (addorUpdate: boolean) => void
    add: boolean;
    goalData: any;
    goalsMetricsList: { metricId: number; metric: string }[]

}

const AddGoal: React.FC<AddGoalProps> = ({ open, handleClose, add, goalData, goalsMetricsList }) => {


    // console.log(goalData)
    const handleAddAlert = () => {
        let tempJobFormik = [
            ...addAlertFormik.values.goalAlerts
        ]
        tempJobFormik.push({
            alertType: "",
            alertFrequency: "",
            alertNotificationReceipt: "",
            alertSpecificUsers: [],
            alertSpecificUsersName: []
        });
        addAlertFormik.setFieldValue('goalAlerts', tempJobFormik);
    };

    const handleDeleteAlert = (index: any) => {

        const tempAlertFormik = [...addAlertFormik.values.goalAlerts];
        const updatedAlerts = tempAlertFormik.filter((_, i) => i !== index);

        addAlertFormik.setFieldValue('goalAlerts', updatedAlerts);
        //    console.log(addAlertFormik.values.goalAlerts)
    };


    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    // const [metricList, setMetricList] = useState<{ metricId: number; metric: string }[]>([]);

    const getGoalAssignes = (type: "RECRID" | "RECRNAME") => {
        if (!!goalData?.goalAssignees?.length) {
            const data = goalData.goalAssignees.reduce((acc: any, cur: any, index: number) => {
                acc.recrId += `${index === 0 ? "" : ","}${cur.recrId}`;
                acc.recrName += `${index === 0 ? "" : ","}${cur.recrName}`;
                return acc;
            }, { recrId: "", recrName: "" })
            return type === "RECRID" ? data.recrId : data.recrName;
        } else {
            return "";
        }
    }
    const getAlertSpecificUsers = (type: "RECRID" | "RECRNAME", specificUsers: any[]) => {
        if (!!specificUsers?.length) {
            const data = specificUsers.reduce((acc: any, cur: any) => {
                acc.recrId.push(`${cur.recrId}`);
                acc.recrName.push(`${cur.recrName}`)
                return acc;
            }, { recrId: [], recrName: [] })
            return type === "RECRID" ? data.recrId : data.recrName;
        } else {
            return [];
        }
    }

    const initialAddAlertDetails: {
        goalId: string | number;
        goalName: string;
        assignTo: string;
        timeFrame: string;
        metric: string;
        metricId: string | number;
        targetType: string;
        targetValue: string;
        assignRecruiterName: string;
        clientId: string | number;
        recrId: string | number;
        goalAlerts: {
            alertType: string;
            alertFrequency: string;
            alertNotificationReceipt: string;
            alertSpecificUsers: (string | number)[]
            alertSpecificUsersName: string[]
        }[];
    } = goalData ? {
        goalId: goalData.goalId || '',
        goalName: goalData.goalName || '',
        assignTo: getGoalAssignes("RECRID"),
        timeFrame: goalData.timeFrame || '',
        metric: goalData.metric || '',
        metricId: goalData.metricId || '',
        targetType: goalData.targetType || '',
        targetValue: goalData.targetValue || '',
        assignRecruiterName: getGoalAssignes("RECRNAME"),
        clientId: userLocalData.getvalue('clientId'),
        recrId: userLocalData.getvalue("recrId"),
        goalAlerts: !!goalData?.goalAlerts?.length ? goalData.goalAlerts?.map((alert: any) => ({
            alertType: alert.alertType || '',
            alertFrequency: alert.alertFrequency || '',
            alertNotificationReceipt: alert.alertNotificationReceipt || '',
            alertSpecificUsers: getAlertSpecificUsers("RECRID", alert.specificUsers),
            alertSpecificUsersName: getAlertSpecificUsers("RECRNAME", alert.specificUsers),
        })) : [{
            alertType: '',
            alertFrequency: '',
            alertNotificationReceipt: '',
            alertSpecificUsers: [],
            alertSpecificUsersName: [],
        }]
    } : {
            goalId: '',
            goalName: '',
            assignTo: '',
            timeFrame: '',
            metric: '',
            metricId: '',
            targetType: '',
            targetValue: '',
            assignRecruiterName: '',
            goalAlerts: [{
                alertType: '',
                alertFrequency: '',
                alertNotificationReceipt: '',
                alertSpecificUsers: '',
                alertSpecificUsersName: []
            }],
            clientId: userLocalData.getvalue('clientId'),
            recrId: userLocalData.getvalue("recrId"),
        };

    const addalertSchema = Yup.object().shape({
        goalName: Yup.string(),
        assignTo: Yup.string(),
        timeFrame: Yup.string(),
        metric: Yup.string(),
        metricId: Yup.string(),
        targetType: Yup.string(),
        targetValue: Yup.string(),
        goalAlerts: Yup.array().of(
            Yup.object().shape({
                alertType: Yup.string(),
                alertFrequency: Yup.string(),
                alertNotificationReceipt: Yup.string(),
                alertSpecificUsers: Yup.array(),
                alertSpecificUsersName: Yup.array()
            })
        ),

    });

    const addAlertFormik = useFormik({
        initialValues: initialAddAlertDetails,
        validationSchema: addalertSchema,
        onSubmit: () => {
            onAlertSave();
        },
    });

    const onAlertSave = () => {
        if (goalData.goalId) {
            setIsFormSubmitted(true);
            saveGoal(goalData.goalId)
        } else {
            setIsFormSubmitted(true);
            saveGoal()
        }

    }
    const handleAlertChange = (index: any, field: any, value: any) => {
        let tempAlertFormik: any = [
            ...addAlertFormik.values.goalAlerts
        ]
        if (field && value) {
            tempAlertFormik[index][field] = value;
            addAlertFormik.setFieldValue('goalAlerts', tempAlertFormik)
        }
    };


    const saveGoal = (goalId?: any) => {
        setIsFormSubmitted(true);
        if (addAlertFormik.isValid) {
            let data: any = {
                "clientId": userLocalData.getvalue("clientId"),
                "recrId": userLocalData.getvalue("recrId"),
                "goalName": addAlertFormik.values.goalName,
                "assignTo": addAlertFormik.values.assignTo.split(','),
                "timeFrame": addAlertFormik.values.timeFrame,
                "metric": addAlertFormik.values.metric,
                "targetType": addAlertFormik.values.targetType,
                "targetValue": addAlertFormik.values.targetValue,
                "goalAlerts": addAlertFormik.values.goalAlerts.map(({ alertSpecificUsersName, ...rest }) => ({ ...rest })),
                "metricId": Number(addAlertFormik.values.metricId)
            }
            if (goalId) {
                data = { ...data, goalId }
            }
            trackPromise(
                ApiService.postWithData('admin', 'saveOrUpdateGoal', data).then(
                    (response: any) => {
                        if (response.data.Success) {
                            showToaster(`Goal has been ${goalId ? "updated" : "saved"} successfully.`, 'success');

                            addAlertFormik.resetForm();
                            handleClose(true);
                        } else {
                            showToaster((response.data.Message) ? response.data.Message : 'An error occured', 'error')
                        }
                    })
            )
        } else {
            showToaster('Please fill all fields.', 'error');
        }
    }




    return (
        <div>
            <Dialog maxWidth={'md'} fullWidth={true}
                open={open} className='AddUserModal' id="AddGoal">
                <DialogTitle className='py-2'>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <span className='addHeader'>
                            {add ? "Add" : "Edit"} Goal
                        </span>
                        <div>
                            <Grid
                                container
                                direction="row"
                                justifyContent="end"
                                alignItems="center"
                            >
                                <Button variant="outlined"
                                    type='button'
                                    color="secondary"
                                    className='mr-2'
                                    onClick={() => handleClose(false)}
                                >Cancel</Button>
                                <Button variant="contained"
                                    type='button'
                                    color="primary"
                                    onClick={onAlertSave}
                                >
                                    {add ? "Save" : "Update"}
                                </Button>
                            </Grid>
                        </div>

                    </Grid>
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <div>
                        <form onSubmit={addAlertFormik.handleSubmit}>
                            <Grid container className="mb-0">
                                <Grid size={12} className='mt-0'>
                                    <label className='inputLabel'>Goal Name</label>
                                    <TextField fullWidth className='mt-1'
                                        id="goalName"
                                        name="goalName"
                                        variant="outlined"
                                        type="text"
                                        size="small"
                                        value={addAlertFormik.values.goalName}
                                        onChange={addAlertFormik.handleChange}
                                    />
                                    <ErrorMessage formikObj={addAlertFormik} name={"goalName"} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                </Grid>
                            </Grid>
                            <Grid container className="mb-0" direction="row" justifyContent="start" alignItems="flex-start">
                                <Grid size={6} className='pr-2'>
                                    <label className='inputLabel'>Assign To</label>
                                    <MUIAutoComplete
                                        id='recruiter'
                                        handleChange={(id: any, name: string) => {
                                            //    console.log({ id, name }, "test..")
                                            addAlertFormik.setValues({
                                                ...addAlertFormik.values,
                                                assignRecruiterName: name,
                                                assignTo: id
                                            })
                                        }}
                                        valuePassed={(addAlertFormik.values.assignTo) ? { label: addAlertFormik.values.assignRecruiterName, id: addAlertFormik.values.assignTo } : {}}
                                        isMultiple={true}
                                        width="100%"
                                        type='id'
                                        placeholder=""
                                    />
                                    <ErrorMessage formikObj={addAlertFormik} name={`assignTo`} isFormSubmitted={isFormSubmitted} />

                                </Grid>
                                <Grid size={6} className='pr-2 mt-1'>
                                    <Box display="flex" alignItems="center">
                                        <label className='inputLabel'>Time Frame</label>

                                        {/* <Tooltip title="Select Frame" placement="right">
                                            <Box alignItems="center">
                                                <HelpOutlineIcon style={{ marginLeft: 4, width:"8px", paddingTop: '0', paddingLeft: 5 }} />
                                            </Box>
                                        </Tooltip> */}
                                    </Box>
                                    <TextField fullWidth
                                        id="timeFrame"
                                        name="timeFrame"
                                        variant="outlined"
                                        type="text"
                                        size="small"
                                        // label="Weekly"
                                        select
                                        value={addAlertFormik.values.timeFrame}
                                        onChange={addAlertFormik.handleChange}
                                    >
                                        <MenuItem value="0"></MenuItem>
                                        <MenuItem value="Weekly">Weekly</MenuItem>
                                        <MenuItem value="Monthly">Monthly</MenuItem>
                                        <MenuItem value="Quarterly">Quarterly</MenuItem>
                                    </TextField>
                                    <ErrorMessage formikObj={addAlertFormik} name={"timeFrame"} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                </Grid>
                            </Grid>
                            <Grid container className="mb-0">
                                <Grid size={12} className='mt-0'>
                                    <label className='inputLabel'>Metric</label>
                                    <TextField fullWidth className='mt-0'
                                        id="metric"
                                        name="metric"
                                        variant="outlined"
                                        type="text"
                                        size="small"
                                        select
                                        value={addAlertFormik.values.metric}
                                        // onChange={addAlertFormik.handleChange}
                                        onChange={(event) => {
                                            const selectedMetric = event.target.value;
                                            const selectedMetricObj = goalsMetricsList.find((m: any) => m.metric === selectedMetric);

                                            addAlertFormik.setFieldValue("metric", selectedMetric);
                                            addAlertFormik.setFieldValue("metricId", selectedMetricObj ? selectedMetricObj.metricId : ""); // Update metricId
                                        }}
                                    >

                                        {goalsMetricsList.map((status: any) => (
                                            <MenuItem key={status.metricId} value={status.metric}>
                                                {status.metric}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <ErrorMessage formikObj={addAlertFormik} name={"metric"} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                </Grid>
                            </Grid>
                            <Grid container className="mt-0 mb-0" direction="row" spacing={1} justifyContent="start" alignItems="flex-start">
                                <Grid size={3} className="mt-1">
                                    <Grid container direction="row" justifyContent="start" alignItems="center">
                                        <label className='inputLabel mt-3'>  &nbsp; Target Value &nbsp; </label>
                                    </Grid>
                                </Grid>
                                <Grid size={4} className="mt-1">
                                    <Grid container direction="row" justifyContent="start" alignItems="center">
                                        <TextField
                                            // label="Equal To"
                                            size="small"
                                            fullWidth
                                            id="targetType"
                                            name='targetType'
                                            select
                                            className='selectLabel'
                                            value={addAlertFormik.values.targetType}
                                            onChange={addAlertFormik.handleChange}
                                        // sx={{ maxWidth: "150px" }}
                                        >
                                            <MenuItem value="0"></MenuItem>
                                            <MenuItem value="Equal To">Equal To</MenuItem>
                                            <MenuItem value="Greater Than">Greater Than</MenuItem>
                                            <MenuItem value="Less Than">Less Than</MenuItem>
                                        </TextField>
                                        <ErrorMessage formikObj={addAlertFormik} name={"targetType"} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                    </Grid>
                                </Grid>
                                <Grid size={5} className="mt-1">
                                    <Grid container direction="row" justifyContent="start" alignItems="center">
                                        <TextField
                                            size="small"
                                            fullWidth
                                            id="targetValue"
                                            name='targetValue'
                                            sx={{ maxWidth: '250px' }}
                                            value={addAlertFormik.values.targetValue}
                                            onChange={addAlertFormik.handleChange}
                                        />
                                        <ErrorMessage formikObj={addAlertFormik} name={"targetValue"} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {addAlertFormik.values.goalAlerts.map((al: any, index: number) => (
                                <div className="mt-0" key={index}>
                                    <Grid size={12} className="mt-0">
                                        <Card className="customCard1 mt-2">
                                            <div>
                                                {/* <Grid container
                                                    direction="row"
                                                    justifyContent="end"
                                                    alignItems="center">
                                                 
                                                </Grid> */}

                                                <Grid container direction="row" className="mb-1">
                                                    <Grid size={6} className='mt-1'>
                                                        <label className='inputLabel'>Alert Type</label>
                                                        <TextField fullWidth className='mt-1'
                                                            key={`al.${index}.alertType`}
                                                            id={`alertType${index}`}
                                                            name={`alertType${index}`}
                                                            variant="outlined"
                                                            type="text"
                                                            size="small"
                                                            select
                                                            value={al.alertType}
                                                            onChange={(e) => handleAlertChange(index, 'alertType', e.target.value)}
                                                        >
                                                            <MenuItem value="Goal Progress">Goal Progress</MenuItem>
                                                            <MenuItem value="Goal Met">Goal Met</MenuItem>
                                                            <MenuItem value="Goal off Track">Goal off Track</MenuItem>
                                                        </TextField>
                                                        {/* <ErrorMessage formikObj={addAlertFormik} name={'alertType'} isFormSubmitted={isFormSubmitted}></ErrorMessage> */}
                                                    </Grid>

                                                    <Grid size={5} className='mt-1 ml-1'>
                                                        <label className='inputLabel'>Alert Frequency</label>
                                                        <TextField fullWidth className='mt-1'
                                                            key={`al.${index}.alertFrequency`}
                                                            id={`alertFrequency${index}`}
                                                            name={`alertFrequency${index}`}
                                                            variant="outlined"
                                                            type="text"
                                                            size="small"
                                                            select
                                                            sx={{ minWidth: '98px' }}
                                                            value={al.alertFrequency}
                                                            onChange={(e) => handleAlertChange(index, 'alertFrequency', e.target.value)}
                                                        >
                                                            <MenuItem value="Daily">Daily</MenuItem>
                                                            <MenuItem value="Weekly">Weekly</MenuItem>
                                                            <MenuItem value="Monthly">Monthly</MenuItem>
                                                        </TextField>
                                                        {/* <ErrorMessage formikObj={addAlertFormik} name={'alertFrequency'} isFormSubmitted={isFormSubmitted}></ErrorMessage> */}
                                                    </Grid>

                                                    <Grid  className='mt-1 ml-1'>
                                                    {
                                                        addAlertFormik.values.goalAlerts.length > 1 ?
                                                            <IconButton onClick={() => handleDeleteAlert(index)}  className='closeIcon'>
                                                                <CloseIcon />
                                                            </IconButton>
                                                            :
                                                            null
                                                    }
                                                        </Grid>
                                                </Grid>

                                                <Grid container direction="row">
                                                    <Grid size={6} className='mt-1'>
                                                        <label className='inputLabel'>Notification Receipt</label>
                                                        <TextField fullWidth className='mt-1'
                                                            key={`al.${index}.alertNotificationReceipt`}
                                                            id={`alertNotificationReceipt${index}`}
                                                            name={`alertNotificationReceipt${index}`}
                                                            variant="outlined"
                                                            type="text"
                                                            size="small"
                                                            select
                                                            sx={{ minWidth: '200px' }}
                                                            value={al.alertNotificationReceipt}
                                                            onChange={(e) => handleAlertChange(index, 'alertNotificationReceipt', e.target.value)}
                                                        >
                                                            <MenuItem value="Team Members assigned to the goals">Team Members assigned to the goals</MenuItem>
                                                            <MenuItem value="Everyone">Everyone</MenuItem>
                                                            <MenuItem value="Only Me">Only Me</MenuItem>
                                                            <MenuItem value="Specific Users">Specific Users</MenuItem>
                                                        </TextField>
                                                    </Grid>
                                                    {al.alertNotificationReceipt === "Specific Users" && (
                                                        <Grid size={5} className='mt-1 ml-1'>
                                                             <label className='inputLabel'>Specific Users</label>
                                                            <MUIAutoComplete
                                                                id={`goalAlerts[${index}].alertSpecificUsers`}
                                                                className="mt-1"
                                                                handleChange={(id: any, name: string) => {
                                                                    console.log({ id, name }, "test..")
                                                                    addAlertFormik.setFieldValue(`goalAlerts[${index}].alertSpecificUsers`, id.split(','));
                                                                    addAlertFormik.setFieldValue(`goalAlerts[${index}].alertSpecificUsersName`, name.split(','));
                                                                }}
                                                                valuePassed={
                                                                    Array.isArray((addAlertFormik.values.goalAlerts[index].alertSpecificUsers)) ?
                                                                        { label: addAlertFormik.values.goalAlerts[index].alertSpecificUsersName.join(), id: addAlertFormik.values.goalAlerts[index].alertSpecificUsers.join() }
                                                                        :
                                                                        (addAlertFormik.values.goalAlerts[index].alertSpecificUsers) ?
                                                                            { label: addAlertFormik.values.goalAlerts[index].alertSpecificUsersName, id: addAlertFormik.values.goalAlerts[index].alertSpecificUsers }
                                                                            :
                                                                            {}
                                                                }
                                                                isMultiple={true}
                                                                width="100%"
                                                                type="id"
                                                                placeholder="Select Specific Users"
                                                            />
                                                        </Grid>
                                                    )}

                                                    {/* <ErrorMessage formikObj={addAlertFormik} name={'alertNotificationReceipt'} isFormSubmitted={isFormSubmitted}></ErrorMessage> */}
                                                </Grid>
                                            </div>
                                        </Card>
                                    </Grid>
                                </div>
                            ))}
                            <Grid container className="mb-0" justifyContent={"flex-end"}>
                                <Button className='mr-5' color="primary" size="small" startIcon={<AddIcon />} onClick={handleAddAlert}>Add Alert</Button>
                            </Grid>
                        </form>
                    </div>
                </DialogContent >
            </Dialog >
        </div >
    )
}

export default AddGoal


