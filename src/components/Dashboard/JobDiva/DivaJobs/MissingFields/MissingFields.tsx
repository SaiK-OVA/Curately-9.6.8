import { useFormik } from 'formik'
import * as Yup from "yup"
import masterJobData from '../../../../../shared/data/Job/Job'
import masterStatesList from '../../../../../shared/data/States'
import { Button, FormControl, Grid, showToaster, TextField } from '../../../../../shared/modules/commonImports'
import { DateTime } from '../../../../../shared/modules/Luxon'
import { Box } from '../../../../../shared/modules/MaterialImports/Box'
import { AdapterLuxon, DatePicker, LocalizationProvider } from '../../../../../shared/modules/MaterialImports/DatePicker'
import { Dialog, DialogContent, DialogTitle } from '../../../../../shared/modules/MaterialImports/Dialog'
import { Divider } from '../../../../../shared/modules/MaterialImports/Divider'
import { Radio, RadioGroup } from '../../../../../shared/modules/MaterialImports/FormElements'
import { FormControlLabel } from '../../../../../shared/modules/MaterialImports/FormInputs'
import { MenuItem } from '../../../../../shared/modules/MaterialImports/Menu'
import { Stack } from '../../../../../shared/modules/MaterialImports/Stack'
import { Typography } from '../../../../../shared/modules/MaterialImports/Typography'
import { Fragment, React, useState } from '../../../../../shared/modules/React'
import Editor from '../../../../shared/EmailDialogBox/EmailBody'
import ErrorMessage from '../../../../shared/Error/ErrorMessage'


interface IMissingFieldsProps {
    open: boolean;
    closePopup: () => void;
    passedData: any;
    handleUpdateToJobDiva: (missingFields: any) => void;
}

const MissingFields: React.FC<IMissingFieldsProps> = ({ open, closePopup, passedData, handleUpdateToJobDiva }) => {

    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const missingFieldsSchema = Yup.object().shape({
        "jobTitle": Yup.string().trim().required('Position Title is required.'),
        "address1": Yup.string().trim().required("Street Address is required"),
        "city": Yup.string().trim().required('Job City is required.'),
        "state": Yup.string().trim().required('State or Pro is required.'),
        "zipCode": Yup.string().trim().required('Job Postal Code is required.').matches(/(^\d{5}$)|(^\d{5}-\d{4}$)/, "Please enter a valid Postal Code."),
        "startDate": Yup.mixed().nullable().transform((_, val) => val ? val : null).required("Start Date is required"),
        "jobDescription": Yup.string().trim().required('Job Description is required.'),
    })

    const missingFieldsFormik = useFormik({
        initialValues: {
            "jobTitle": passedData?.jobTitle ? passedData?.jobTitle : "",
            "address1": passedData?.address1 ? passedData?.address1 : "",
            "city": passedData?.city ? passedData?.city : "",
            "state": passedData?.state ? passedData?.state : "",
            "zipCode": passedData?.zipCode ? passedData?.zipCode : "",
            "startDate": passedData?.startDate ? passedData?.startDate : "",
            "jobDescription": passedData?.jobDescription ? passedData?.jobDescription : "",
        },
        onSubmit: () => { setIsFormSubmitted(true) },
        validationSchema: missingFieldsSchema,
        validateOnMount: true,
    })

    const GetAllFieldsValidation = () => {
        if (!!Object.keys(missingFieldsFormik.errors)?.length) {
            const errors: any = missingFieldsFormik.errors;
            let isErrorShown = false;
            const fields = ["jobTitle", "address1", "city", "state", "zipCode", "startDate", "jobDescription"];
            fields.forEach((each: any) => {
                if (errors[each] && !isErrorShown) {
                    showToaster(errors[each], "error");
                    isErrorShown = true;
                }
            })
            return false;
        } else return true;
    }

    const saveForm = () => {
        setIsFormSubmitted(true);
        const isAllFieldsValid = GetAllFieldsValidation();
        if (isAllFieldsValid) {
            handleUpdateToJobDiva(missingFieldsFormik.values)
        }
    }

    return (
        <Dialog open={open} maxWidth={"md"} fullWidth id='MissingFieldsContainer' onClose={closePopup}>
            <DialogTitle>
                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                    <Typography variant='h6'>Update Job Details</Typography>
                    <Stack direction={"row"} alignItems={"center"} spacing={2}>
                        <Button variant='contained' color="inherit" sx={{ p: "2.5px", textTransform: "capitalize" }} onClick={closePopup}>Cancel</Button>
                        <Button variant='contained' onClick={saveForm}>Save</Button>
                    </Stack>
                </Stack>
            </DialogTitle>
            <Divider />
            <DialogContent>
                <form onSubmit={missingFieldsFormik.handleSubmit} >
                    <Grid container columnSpacing={3} rowSpacing={1}>

                        <Grid size={4}>
                            <TextField fullWidth
                                id="jobTitle"
                                name="jobTitle"
                                size="small"
                                variant="outlined"
                                type="text"
                                value={missingFieldsFormik.values.jobTitle}
                                onChange={missingFieldsFormik.handleChange}
                                label={
                                    <Fragment>
                                        Position Title
                                        <Typography variant='caption' fontSize={"14px"} color='red' >*</Typography>
                                    </Fragment>
                                }
                            />
                            <ErrorMessage formikObj={missingFieldsFormik} name={'jobTitle'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                        </Grid>

                        {/* <Grid size={4}>
                            <TextField
                                fullWidth
                                id="jobCategory"
                                name="jobCategory"
                                size="small"
                                variant="outlined"
                                select
                                value={missingFieldsFormik.values.jobCategory}
                                onChange={missingFieldsFormik.handleChange}
                                label={
                                    <Fragment>
                                        Labor Category
                                        <Typography variant='caption' fontSize={"14px"} color='red' >*</Typography>
                                    </Fragment>
                                }
                            >
                                {masterJobData.jobCategory.map((item, index: number) => {
                                    return <MenuItem value={item.id} key={index}> {item.label}</MenuItem>
                                })}
                            </TextField>
                            <ErrorMessage formikObj={missingFieldsFormik} name={'jobCategory'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                        </Grid>

                        <Grid size={4}>
                            <TextField
                                fullWidth
                                label={
                                    <Fragment>
                                        Job Type
                                        <Typography variant='caption' fontSize={"14px"} color='red' >*</Typography>
                                    </Fragment>
                                }
                                size="small"
                                id="positionType"
                                name='positionType'
                                variant="outlined"
                                select
                                value={missingFieldsFormik.values.positionType}
                                onChange={missingFieldsFormik.handleChange}
                            >
                                {
                                    masterJobData.type.map((item, index: number) => {
                                        return <MenuItem value={item.id} key={index}>{item.label}</MenuItem>
                                    })
                                }
                            </TextField>
                            <ErrorMessage formikObj={missingFieldsFormik} name={'positionType'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                        </Grid> */}


                        <Grid size={4}>
                            <TextField
                                label={
                                    <Fragment>
                                        Street Address :
                                        <Typography variant='caption' fontSize={"14px"} color='red' >*</Typography>
                                    </Fragment>
                                }
                                id="address1"
                                name='address1'
                                size="small"
                                variant="outlined"
                                fullWidth
                                value={missingFieldsFormik.values.address1}
                                onChange={missingFieldsFormik.handleChange}
                            />
                            <ErrorMessage formikObj={missingFieldsFormik} name={'address1'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                        </Grid>

                        <Grid size={4}>
                            <TextField
                                label={
                                    <Fragment>
                                        Job City
                                        <Typography variant='caption' fontSize={"14px"} color='red' >*</Typography>
                                    </Fragment>
                                }
                                id="city"
                                name='city'
                                size="small"
                                fullWidth
                                value={missingFieldsFormik.values.city}
                                onChange={missingFieldsFormik.handleChange}
                            />
                            <ErrorMessage formikObj={missingFieldsFormik} name={'city'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                        </Grid>

                        <Grid size={4}>
                            <TextField fullWidth
                                label={
                                    <Fragment>
                                        State or Prov :
                                        <Typography variant='caption' fontSize={"14px"} color='red' >*</Typography>
                                    </Fragment>
                                }
                                id="state"
                                name='state'
                                size="small"
                                variant="outlined"
                                select
                                value={missingFieldsFormik.values.state}
                                onChange={missingFieldsFormik.handleChange}
                            >
                                <MenuItem value="">--Select State--</MenuItem>
                                {
                                    [...masterStatesList].map((state, index: number) => {
                                        return <MenuItem value={state.id} key={index}>{state.label}</MenuItem>
                                    })
                                }
                            </TextField>
                            <ErrorMessage formikObj={missingFieldsFormik} name={'state'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                        </Grid>
                        <Grid size={4}>
                            <TextField
                                label={
                                    <Fragment>
                                        Job Postal Code
                                        <Typography variant='caption' fontSize={"14px"} color='red' >*</Typography>
                                    </Fragment>
                                }
                                size="small"
                                fullWidth
                                id="zipCode"
                                name='zipCode'
                                value={missingFieldsFormik.values.zipCode}
                                onChange={missingFieldsFormik.handleChange}
                            />
                            <ErrorMessage formikObj={missingFieldsFormik} name={'zipCode'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                        </Grid>

                        <Grid size={4}>
                            <LocalizationProvider dateAdapter={AdapterLuxon} >
                                <DatePicker
                                    label={
                                        <Fragment>
                                            Start Date <Typography variant='caption' fontSize={"14px"} color='red' >*</Typography>
                                        </Fragment>
                                    }
                                    slotProps={{ textField: { size: 'small' } }}
                                    sx={{ width: '100%' }}
                                    onChange={(date: any) => missingFieldsFormik.setFieldValue("startDate", (date) ? date?.toFormat('MM/dd/yyyy') : null, true)}
                                    value={(missingFieldsFormik.values.startDate) ? DateTime.fromFormat(DateTime.fromISO(missingFieldsFormik.values?.startDate).toFormat('MM/dd/yyyy'), 'MM/dd/yyyy') : null}
                                // minDate={DateTime.now()}
                                />
                            </LocalizationProvider>
                            <ErrorMessage formikObj={missingFieldsFormik} name={'startDate'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                        </Grid>

                        {/* <Grid size={8}>
                            <Stack sx={{ mt: -1 }}>
                                <Typography component={"label"}>Work Location Type<Typography variant='caption' fontSize={"14px"} color='red' >*</Typography></Typography>

                                <FormControl sx={{ mt: -1 }}>
                                    <RadioGroup
                                        row
                                        aria-labelledby="worklocation-radio-buttons-group-label"
                                        name="onsiteFlexibility"
                                        value={missingFieldsFormik.values.onsiteFlexibility}
                                        onChange={missingFieldsFormik.handleChange}
                                    >
                                        {
                                            masterJobData.workType.map((item, index: number) => {
                                                return <FormControlLabel value={item.id} key={index} control={<Radio />} label={item.label} />
                                            })
                                        }
                                    </RadioGroup>
                                    <ErrorMessage formikObj={missingFieldsFormik} name={'onsiteFlexibility'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                </FormControl>
                            </Stack>
                        </Grid> */}

                        <Grid size={12} >
                            <Stack direction={"row"} spacing={2} alignItems={"center"}>
                                <Typography component={"label"}>Job Description <Typography variant='caption' fontSize={"14px"} color='red' >*</Typography></Typography>
                                <Typography className='subTextForInput' variant='caption'> (This information will be published on job boards)</Typography>
                            </Stack>
                            <Box mt={1}>
                                <Editor
                                    toolbarId='jobDescription'
                                    placeholder='Job Description'
                                    id='jobDescription'
                                    handleChange={(e: any) => {
                                        missingFieldsFormik.setFieldValue('jobDescription', e);
                                    }}
                                    editorHtml={missingFieldsFormik.values.jobDescription}
                                    mentions={false}
                                    saveTemplate={false}
                                />
                            </Box>
                            <Box pt={2.5}>
                                <ErrorMessage formikObj={missingFieldsFormik} name={'jobDescription'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                            </Box>
                        </Grid>

                    </Grid>
                </form>

            </DialogContent>
        </Dialog>
    )
}

export default MissingFields
