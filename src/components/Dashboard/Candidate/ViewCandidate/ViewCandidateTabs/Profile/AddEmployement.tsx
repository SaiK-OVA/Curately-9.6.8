import { useState } from '../../../../../../shared/modules/React';
import { Dialog, DialogContent, DialogTitle } from '../../../../../../shared/modules/MaterialImports/Dialog';
import { Grid, Button } from '../../../../../../shared/modules/commonImports';
import { Stack } from '../../../../../../shared/modules/MaterialImports/Stack';
import Editor from '../../../../../shared/EmailDialogBox/EmailBody';
import { TextField, FormControlLabel } from '../../../../../../shared/modules/MaterialImports/FormInputs';
import { Checkbox } from '../../../../../../shared/modules/MaterialImports/FormElements';
import { DateTime } from '../../../../../../shared/modules/Luxon';
// import Typography from '@mui/material/Typography';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFormik, Yup } from '../../../../../../shared/modules/Formik';




const AddEmp = (
    { open, closePopup, add, employeeData }: {
        open: boolean;
        closePopup: () => void;
        add: boolean;
        employeeData: any;
    }
) => {

    const initialAddEmployeeDetails = employeeData.poolid ? employeeData : {
        userEmploymentID: "",
        userID: "",
        companyName: "",
        workAddress: "",
        jobTitle: "",
        startDate: "",
        endDate: "",
        empResponsibilities: "",
        currentCompany: ""

    }
    const addEmployeeSchema = Yup.object().shape({
        "userEmploymentID": Yup.string(),
        "userID": Yup.string(),
        "companyName": Yup.string(),
        "workAddress": Yup.string(),
        "jobTitle": Yup.string().required('jobTitle is required.'),
        "startDate": Yup.string(),
        "endDate": Yup.string(),
        "empResponsibilities": Yup.string(),
        "currentCompany": Yup.string(),
    });

    const addEmployeeFormik = useFormik({
        initialValues: initialAddEmployeeDetails,
        validationSchema: addEmployeeSchema,
        onSubmit: () => {
            //setIsFormSubmitted(true);
            //  console.log(addEmployeeFormik.values);
        },
        validateOnMount: true
    });
    const [startDate, setStartDate] = useState(new Date("2014/02/08"));
    const [endDate, setEndDate] = useState(new Date("2014/02/10"));
    const dateFormatHandler = (date: string) => {
        return DateTime.fromISO(date).toFormat('MM/dd/yyyy, t');
    }
    return (


        <Dialog
            maxWidth={'md'}
            // sx={{ width: 900, maxWidth: 900, minWidth: 900 }}
            fullWidth={false} open={open} className='AddPoolModal customInputs' id='addPool'>
            <DialogTitle
                className='py-2'
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <span className='addHeader'>
                        {add ? "Create New" : "Edit"} Employer
                    </span>
                    <div>
                        <Grid
                            container
                            direction="row"
                            justifyContent="end"
                            alignItems="center"
                        >
                            <Button variant="text"
                                type='button'
                                color="secondary"
                                className='mr-2'
                                onClick={closePopup}
                            >Cancel</Button>
                            <Button variant="text"
                                type='button'
                                color="primary"
                            //  onClick={saveForm}
                            >{add ? "Save" : "Update"}</Button>
                        </Grid>
                    </div>
                </Grid>
            </DialogTitle>
            <DialogContent>
                <form onSubmit={addEmployeeFormik.handleSubmit}
                >
                    <Stack
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                        spacing={2}

                    >
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Is this a current employer?"
                            labelPlacement="end"
                            id="active"
                            name="isManual" />
                    </Stack>

                    <div style={{ padding: "10px" }}>
                        <Grid container spacing={2}>

                            <Grid size={6}>
                                <TextField fullWidth
                                    size="small"
                                    id="Job Title"
                                    name='jobTitle'
                                    variant="outlined"
                                    label="Job Title"
                                    value={add ? "" : employeeData.jobTitle}
                                    // value={addPoolFormik.values.poolName}
                                    onChange={addEmployeeFormik.handleChange}
                                />
                            </Grid>
                            <Grid size={6}>
                                <TextField fullWidth
                                    size="small"
                                    id="Employer"
                                    name='Employer'
                                    variant="outlined"
                                    label="Employer"
                                    onChange={addEmployeeFormik.handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} className="mt-2">
                            <Grid size={3}>
                                <TextField fullWidth
                                    size="small"
                                    id="City"
                                    name='workAddress'
                                    variant="outlined"
                                    label="Star Date"
                                    value={add ? "" : employeeData.startDate && DateTime.fromFormat(employeeData.startDate.substring(0, 7), 'yyyy-MM').isValid ? DateTime.fromFormat(employeeData.startDate.substring(0, 7), 'yyyy-MM').toFormat('MM/ yyyy') : ""}
                                    onChange={addEmployeeFormik.handleChange}
                                />
                            </Grid>
                            <Grid size={3}>
                                <TextField fullWidth
                                    size="small"
                                    id="City"
                                    name='workAddress'
                                    variant="outlined"
                                    label="End Date"
                                    value={add ? "" : employeeData.endDate && DateTime.fromFormat(employeeData.endDate.substring(0, 7), 'yyyy-MM').isValid ? DateTime.fromFormat(employeeData.endDate.substring(0, 7), 'yyyy-MM').toFormat('MM/ yyyy') : ""}
                                    onChange={addEmployeeFormik.handleChange}

                                />
                                {/* <Typography sx={{
                                    width: "90px",
                                    border: "1px solid grey",
                                    padding: "3px",
                                    margin: "1px",
                                    borderRadius:"2px"
                                }}>
                                    {employeeData.startDate && DateTime.fromFormat(employeeData.startDate.substring(0, 7), 'yyyy-MM').isValid ? DateTime.fromFormat(employeeData.startDate.substring(0, 7), 'yyyy-MM').toFormat('MM/ yyyy') : ""}
                                    {employeeData.startDate && DateTime.fromFormat(employeeData.startDate.substring(0, 7), 'yyyy-MM').isValid && employeeData.endDate && DateTime.fromFormat(employeeData.endDate.substring(0, 7), 'yyyy-MM').isValid ? "  " : ""}
                                </Typography> */}
                            </Grid>
                            {/* <Grid size={3}>
                                <Typography sx={{
                                    width: "90px",
                                    border: "1px solid grey",
                                    padding: "3px",
                                    margin: "1px",
                                    borderRadius:"2px"
                                }}>
                                    {employeeData.endDate && DateTime.fromFormat(employeeData.endDate.substring(0, 7), 'yyyy-MM').isValid ? DateTime.fromFormat(employeeData.endDate.substring(0, 7), 'yyyy-MM').toFormat('MM/ yyyy') : ""}
                                </Typography>
                            </Grid> */}
                            <Grid size={6}>
                                <TextField fullWidth
                                    size="small"
                                    id="City"
                                    name='workAddress'
                                    variant="outlined"
                                    label="City"
                                    value={add ? "" : employeeData.workAddress}
                                    onChange={addEmployeeFormik.handleChange}

                                />
                            </Grid>
                        </Grid>



                        {/* <DatePicker
                                className="datepicker"
                                name="startDate"
                                selected={startDate}
                                showIcon
                                onChange={(date: any) => setStartDate(date)}
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                                value={add ? "" : employeeData.startDate} />
                            <DatePicker
                                className="datepicker"
                                name="endDate"
                                selected={endDate}
                                showIcon
                                onChange={(date: any) => setEndDate(date)}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                                value={add ? "" : employeeData.endDate} /> */}


                        <Grid container spacing={2} className="mt-2">
                            <Grid size={12}>
                                <Editor
                                    toolbarId='originalDescription'
                                    placeholder='Original Description'
                                    id='originalDescription'
                                    // handleChange={(e: any) => {
                                    //     setPublicDescription(e);
                                    // }}
                                    //editorHtml={originalDescription}
                                    mentions={false}
                                    saveTemplate={false}
                                    handleChange={undefined}
                                    editorHtml={''} />
                            </Grid>
                        </Grid>
                    </div>

                </form>
            </DialogContent >

        </Dialog >


    )
}
export default AddEmp;

