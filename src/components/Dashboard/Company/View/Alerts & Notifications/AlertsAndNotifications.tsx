import { React } from '../../../../../shared/modules/React';
import { TextField, FormControlLabel, FormControl } from '../../../../../shared/modules/MaterialImports/FormInputs';
import { Radio, RadioGroup, Checkbox } from '../../../../../shared/modules/MaterialImports/FormElements';
import { Card, CardContent } from '../../../../../shared/modules/MaterialImports/Card';
import './AlertsAndNotifications.scss';
import { Grid } from '../../../../../shared/modules/MaterialImports/Grid';
import { useFormik, Yup  } from "../../../../../shared/modules/Formik";


const AlertsAndNotifications = () => {
    const [userinfo, setUserinfo] = React.useState();
    const initialAlertsDetails = {
        "jobCreated": "",
        "jobStatusUpdate": "",
        "jobCategory": "",
        "sendEmailTo": "",
        "forJobsWithJobCategory": "",
        "jobStates": "",
        "emy": "",
        "sendEmail": "",
        "forJobs": "",
        "jobState": "",
        "null": "",
        "senMail": "",
        "jobsWith": "",
        "jobStat": "",
        "em": "",

    }
    const alertsSchema = Yup.object().shape({
        "jobCreated": Yup.string(),
        "jobStatusUpdate": Yup.string(),
        "jobCategory": Yup.string(),
        "sendEmailTo": Yup.string(),
        "forJobsWithJobCategory": Yup.string(),
        "jobStates": Yup.string(),
        "emy": Yup.string(),
        "sendEmail": Yup.string(),
        "forJobs": Yup.string(),
        "jobState": Yup.string(),
        "null": Yup.string(),
        "senMail": Yup.string(),
        "jobsWith": Yup.string(),
        "jobStat": Yup.string(),
        "em": Yup.string(),
    });
    const alertsFormik = useFormik({
        initialValues: initialAlertsDetails,
        validationSchema: alertsSchema,
        onSubmit: (values: any) => {
            setUserinfo(values);
            // console.log(values);
        }
    });
    return (
        <>
            <div>
                <form
                    onSubmit={alertsFormik.handleSubmit}
                >
                    <Card style={{ padding: '0px' }}>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid size={12}>
                                    <FormControlLabel
                                        control={<Checkbox size="small" />}
                                        label="Create email notification when a new job is created"
                                        labelPlacement="end"
                                        id="jobCreated"
                                        name="jobCreated"
                                        value={alertsFormik.values.jobCreated}
                                        onChange={alertsFormik.handleChange}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid size={12}>
                                    <FormControlLabel
                                        control={<Checkbox size="small" />}
                                        label="Create email notification when there is a status update on the job"
                                        labelPlacement="end"
                                        id="jobStatusUpdate"
                                        name="jobStatusUpdate"
                                        value={alertsFormik.values.jobStatusUpdate}
                                        onChange={alertsFormik.handleChange}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid size={6}>
                                    <div>
                                        <h3 style={{ marginTop: '2px' }}>Email Notification rules</h3>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid size={2}>
                                    <FormControl>
                                        <RadioGroup row
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue=""
                                            name="radio-buttons-group"
                                        >
                                            <FormControlLabel value="basic" control={<Radio />} label="Basic" />
                                            <FormControlLabel value="advanced" control={<Radio />} label="Advanced" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid size={12}>
                                    <FormControl style={{ marginTop: '1px' }}>
                                        <RadioGroup row
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue=""
                                            name="radio-buttons-group"
                                        >
                                            <FormControlLabel value="send email to all users for all jobs" control={<Radio />} label="Send email to all users for all jobs" />
                                            <Grid size={12}>
                                                <FormControlLabel value="send email to all users for jobs with job category" control={<Radio />} label="Send email to all users for jobs with job category" />
                                                <TextField
                                                    id="jobCategory"
                                                    name="jobCategory"
                                                    size="small"
                                                    margin="dense"
                                                    value={alertsFormik.values.jobCategory}
                                                    onChange={alertsFormik.handleChange}
                                                />
                                            </Grid>
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1}>
                                <Grid size={3}>
                                    <FormControlLabel
                                        control={<Checkbox size="small" />}
                                        label="Send email to"
                                        labelPlacement="end"
                                        id="sendEmailTo"
                                        name="sendEmailTo"
                                        value={alertsFormik.values.sendEmailTo}
                                        onChange={alertsFormik.handleChange}
                                    />
                                </Grid>
                                <Grid size={1}>
                                    <div>
                                        <TextField
                                            id="forJobsWithJobCategory"
                                            name="forJobsWithJobCategory"
                                            size="small"
                                            margin="dense"
                                            value={alertsFormik.values.forJobsWithJobCategory}
                                            onChange={alertsFormik.handleChange}
                                        />
                                    </div>
                                </Grid>
                                <Grid size={4}>
                                    <label>for jobs with Job category</label>
                                </Grid>
                                <Grid size={1}>
                                    <div>
                                        <TextField
                                            id="jobStates"
                                            name="jobStates"
                                            size="small"
                                            margin="dense"
                                            value={alertsFormik.values.jobStates}
                                            onChange={alertsFormik.handleChange}
                                        />

                                    </div>

                                </Grid>
                                <Grid size={2}>
                                    <label>job states</label>
                                </Grid>
                                <Grid size={1}>
                                    <div>
                                        <TextField
                                            id="emy"
                                            name="emy"
                                            size="small"
                                            margin="dense"
                                            value={alertsFormik.values.emy}
                                            onChange={alertsFormik.handleChange}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1}>
                                <Grid size={3}>
                                    <FormControlLabel
                                        control={<Checkbox size="small" />}
                                        label="Send email to"
                                        labelPlacement="end"
                                        id="sendEmailTo"
                                        name="sendEmailTo"
                                        value={alertsFormik.values.sendEmailTo}
                                        onChange={alertsFormik.handleChange}
                                    />
                                </Grid>
                                <Grid size={1}>
                                    <div>
                                        <TextField
                                            id="forJobsWithJobCategory"
                                            name="forJobsWithJobCategory"
                                            size="small"
                                            margin="dense"
                                            value={alertsFormik.values.forJobsWithJobCategory}
                                            onChange={alertsFormik.handleChange}
                                        />
                                    </div>
                                </Grid>
                                <Grid size={4}>
                                    <label>for jobs with Job category</label>
                                </Grid>
                                <Grid size={1}>
                                    <div>
                                        <TextField
                                            id="jobStates"
                                            name="jobStates"
                                            size="small"
                                            margin="dense"
                                            value={alertsFormik.values.jobStates}
                                            onChange={alertsFormik.handleChange}
                                        />

                                    </div>

                                </Grid>
                                <Grid size={2}>
                                    <label>job states</label>
                                </Grid>
                                <Grid size={1}>
                                    <div>
                                        <TextField
                                            id="emy"
                                            name="emy"
                                            size="small"
                                            margin="dense"
                                            value={alertsFormik.values.emy}
                                            onChange={alertsFormik.handleChange}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1}>
                                <Grid size={3}>
                                    <FormControlLabel
                                        control={<Checkbox size="small" />}
                                        label="Send email to"
                                        labelPlacement="end"
                                        id="sendEmailTo"
                                        name="sendEmailTo"
                                        value={alertsFormik.values.sendEmailTo}
                                        onChange={alertsFormik.handleChange}
                                    />
                                </Grid>
                                <Grid size={1}>
                                    <div>
                                        <TextField
                                            id="forJobsWithJobCategory"
                                            name="forJobsWithJobCategory"
                                            size="small"
                                            margin="dense"
                                            value={alertsFormik.values.forJobsWithJobCategory}
                                            onChange={alertsFormik.handleChange}
                                        />
                                    </div>
                                </Grid>
                                <Grid size={4}>
                                    <label>for jobs with Job category</label>
                                </Grid>
                                <Grid size={1}>
                                    <div>
                                        <TextField
                                            id="jobStates"
                                            name="jobStates"
                                            size="small"
                                            margin="dense"
                                            value={alertsFormik.values.jobStates}
                                            onChange={alertsFormik.handleChange}
                                        />

                                    </div>

                                </Grid>
                                <Grid size={2}>
                                    <label>job states</label>
                                </Grid>
                                <Grid size={1}>
                                    <div>
                                        <TextField
                                            id="emy"
                                            name="emy"
                                            size="small"
                                            margin="dense"
                                            value={alertsFormik.values.emy}
                                            onChange={alertsFormik.handleChange}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </>
    )
}
export default AlertsAndNotifications;