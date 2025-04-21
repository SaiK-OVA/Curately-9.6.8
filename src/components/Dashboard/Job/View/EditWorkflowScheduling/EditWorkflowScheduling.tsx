import { useFormik, Yup } from "../../../../../shared/modules/Formik";
import { Grid } from "../../../../../shared/modules/MaterialImports/Grid2";
// import Grid from '@mui/material/Grid';
import { Dialog, DialogContent, DialogTitle } from "../../../../../shared/modules/MaterialImports/Dialog";
import { Card } from "../../../../../shared/modules/MaterialImports/Card";
import { Button } from "../../../../../shared/modules/MaterialImports/Button";
import { Divider } from "../../../../../shared/modules/MaterialImports/Divider";
import { Typography } from "../../../../../shared/modules/MaterialImports/Typography";


// import ErrorMessage from "../../../../shared/Error/ErrorMessage";

import { showToaster } from "../../../../shared/SnackBar/SnackBar";
import ApiService from "../../../../../shared/api/api";


import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DateTime } from '../../../../../shared/modules/Luxon';
import { AdapterLuxon, LocalizationProvider } from "../../../../../shared/modules/MaterialImports/DatePicker";

import './EditWorkflowScheduling.scss';


const EditWorkflowScheduling = ({ schedulingData, open, closePopup ,getEditWorkflow}: {
    schedulingData: {
        startDate: DateTime;
        endDate: DateTime;
        eventId: string;
        summary: string;
    }[];
    open: boolean;
    closePopup: () => void;
    getEditWorkflow: (id: string) => void;
}) => {

    // const initialValues: {
    //     schedulingsList: {
    //         startDate: DateTime;
    //         endDate: DateTime;
    //     }[]
    // } = {
    //     schedulingsList: []
    // }
    const workflowSchema = Yup.object().shape({
        schedulingsList: Yup.array().of(
            Yup.object().shape({
                startDate: Yup.date().required('Start Date is required'),
                endDate: Yup.date().required('End Date is required'),
                eventId: Yup.string(),
                summary: Yup.string(),
            })
        )
    })
    const workflowFormik = useFormik({
        initialValues: { schedulingsList: schedulingData },
        validationSchema: workflowSchema,
        onSubmit: () => {
            // console.log(workflowFormik.values);
        },
        // validateOnMount: true
    });

    const updateScheduling = (i: number) => {
        console.log(i);
        if (workflowFormik.values.schedulingsList[i].startDate) {
            if (workflowFormik.values.schedulingsList[i].endDate) {
                ApiService.getByParams(193, 'Curately/Workflow/workflow_cronofy_event_update.jsp', {
                    eventIds: workflowFormik.values.schedulingsList[i].eventId,
                    startDate: workflowFormik.values.schedulingsList[i].startDate.toFormat('MM/dd/yyyy HH:mm'),
                    endDate: workflowFormik.values.schedulingsList[i].endDate.toFormat('MM/dd/yyyy HH:mm')
                })
                    .then((response) => {
                        // console.log(response.data);
                        if (response.data.message === "Success") {
                            getEditWorkflow( `${i}`)
                            closePopup()
                            showToaster(`Schedular Dates are updated.`, 'success');
                        } else {
                            showToaster(response.data.message ? response.data.message : 'An error occured while updating.', 'error');
                        }
                    })
            } else {
                showToaster('Please enter valid End Date.', 'error');
            }
        } else {
            showToaster('Please enter valid Start Date.', 'error');
        }
    }



    return <div id="EditWorkflowScheduling">
        <Dialog
            maxWidth={'md'}
            // sx={{ maxWidth: '650px !important' }}
            fullWidth={false} open={open} className=''>
            <DialogTitle
                className='py-2'
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    // sx={{ width: '475px' }}
                    alignItems="center"
                >
                    <span className='addHeader'>Edit Scheduling</span>
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
                                onClick={closePopup}
                            >Cancel</Button>
                        </Grid>
                    </div>
                </Grid>
            </DialogTitle>
            <Divider />
            <DialogContent className='px-5'>
                {
                    workflowFormik.values.schedulingsList.map((schedule: any, index) => (
                        <Card className='customCard' key={`schedule${index}`}>

                            <Grid container
                                direction="row"
                                justifyContent="center"
                                alignItems="center" spacing={2}
                            >
                                <Typography className='' gutterBottom>
                                    {schedule.title}
                                </Typography>
                                < Divider />
                                <Grid size={12} className={'pb-2'}>
                                    {/* {schedule.title} */}
                                    <Typography fontWeight={"600"}>Recruiter Name: <Typography variant="caption" fontSize={"14px"}>{schedule?.eventId?.split('-')[0]}</Typography></Typography>
                                </Grid>
                                <Grid size={6}>
                                    <LocalizationProvider dateAdapter={AdapterLuxon}>
                                        <DemoContainer components={['DateTimePicker']}>
                                            <DateTimePicker
                                                label="Start Date"
                                                value={
                                                    (schedule.startDate) ?
                                                        schedule.startDate
                                                        :
                                                        null
                                                }
                                                onChange={
                                                    (newValue) => {
                                                        workflowFormik.setFieldValue(`schedulingsList.${index}.startDate`, newValue)
                                                    }
                                                }
                                                // disableMaskedInput={true}
                                                // renderInput={(params) => <TextField size='small' {...params} required fullWidth />}
                                                minDate={DateTime.now()}
                                                maxDate={(schedule.endDate) ? schedule.endDate : DateTime.now().plus({ years: 10 })}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                    {/* <ErrorMessage formikObj={workflowFormik} name={`schedulingsList`} array={[index + "", 'startDate']} isFormSubmitted={isFormSubmitted} /> */}

                                </Grid>
                                <Grid size={6}>
                                    <LocalizationProvider dateAdapter={AdapterLuxon}>
                                        <DemoContainer components={['DateTimePicker']}>
                                            <DateTimePicker
                                                label="End Date"
                                                value={
                                                    (schedule.endDate) ?
                                                        schedule.endDate
                                                        :
                                                        null
                                                }
                                                onChange={
                                                    (newValue) => {
                                                        workflowFormik.setFieldValue(`schedulingsList.${index}.endDate`, newValue)
                                                    }
                                                }
                                                // disableMaskedInput={true}
                                                // renderInput={(params) => <TextField size='small' {...params} required fullWidth />}
                                                // maxDate={(eventRuleFormik.values.endDate) ? eventRuleFormik.values.endDate : DateTime.now().plus({ years: 10 })}
                                                minDate={(schedule.startDate) ? schedule.startDate : DateTime.now()}

                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                    {/* <ErrorMessage formikObj={workflowFormik} name={`schedulingsList`} array={[index + "", 'endDate']} isFormSubmitted={isFormSubmitted} /> */}
                                </Grid>
                                <Grid
                                    size={12}
                                >
                                    <Button
                                        variant="contained"
                                        // startIcon={<SaveIcon />}
                                        onClick={() => { updateScheduling(index) }}
                                        size={'small'}
                                        className={'mt-2'}
                                    >
                                        Update
                                    </Button>
                                </Grid>
                            </Grid>
                        </Card>
                    ))
                }
            </DialogContent>
        </Dialog>
    </div>
}

export default EditWorkflowScheduling;