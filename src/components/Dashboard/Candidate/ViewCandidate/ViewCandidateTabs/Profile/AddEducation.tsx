import { Dialog, DialogContent, DialogTitle } from '../../../../../../shared/modules/MaterialImports/Dialog';
import { Grid, Button, TextField } from '../../../../../../shared/modules/commonImports';
import { MenuItem } from '../../../../../../shared/modules/MaterialImports/Menu';
import { DateTime } from '../../../../../../shared/modules/Luxon';
import { useFormik, Yup } from '../../../../../../shared/modules/Formik';


const AddEducation = (
    { open, closePopup, add, educationData }: {
        open: boolean;
        closePopup: () => void;
        add: boolean;
        educationData: any;
    }
) => {

    const initialAddEducationDetails = educationData.poolid ? educationData : {
        userEducationID: "",
        userID: "",
        schoolName: "",
        degreeType: "",
        degreeName: "",
        degreeCompletionDate: "",
        isManual: "",
        modifiedDateTime: ""

    }
    const addEducationSchema = Yup.object().shape({
        "userEducationID": Yup.string(),
        "userID": Yup.string(),
        "schoolName": Yup.string(),
        "degreeType": Yup.string(),
        "degreeName": Yup.string(),
        "degreeCompletionDate": Yup.string(),
        "isManual": Yup.string(),
        "modifiedDateTime": Yup.string()
    });
    const addEducationFormik = useFormik({
        initialValues: initialAddEducationDetails,
        validationSchema: addEducationSchema,
        onSubmit: () => {
            //setIsFormSubmitted(true);
            // console.log(addEducationFormik.values);
        },
        validateOnMount: true
    });


    return (
        <>
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
                            {add ? "Create New" : "Edit"}
                        </span>
                        <div>
                            <Grid
                                container
                                direction="row"
                                justifyContent="end"
                                alignItems="center"
                            >
                                {/* <CloseIcon /> onClick={() => closePopup()}  */}
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
                    <form onSubmit={addEducationFormik.handleSubmit}>
                        <div style={{ padding: "10px" }}>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid size={3}>
                                    <TextField fullWidth
                                        size="small"
                                        id="degree type"
                                        name='degreeType'
                                        variant="outlined"
                                        label="Degree Type"
                                        value={add ? "" : 0}
                                        // value={addPoolFormik.values.degreeType}
                                        // onChange={addEducationFormik.handleChange}
                                        select

                                    >
                                        <MenuItem value="0">Bachelors</MenuItem>
                                        <MenuItem value="1">Masters</MenuItem>

                                    </TextField>
                                </Grid>
                                <Grid size={3}>
                                    <TextField fullWidth
                                        size="small"
                                        id="Institution"
                                        name='Institution'
                                        variant="outlined"
                                        label="Institution" />
                                </Grid>
                                <Grid size={3}>
                                    <TextField fullWidth
                                        size="small"
                                        id="Concentration"
                                        name='Concentration'
                                        variant="outlined"
                                        label="Concentration" />
                                </Grid>
                                <Grid size={3}>
                                    <TextField fullWidth
                                        size="small"
                                        id="Year"
                                        name='Year'
                                        variant="outlined"
                                        label="Year"
                                        value={add ? " " : educationData.degreeCompletionDate && DateTime.fromFormat(educationData.degreeCompletionDate.substring(0, 7), 'yyyy-MM').isValid ? DateTime.fromFormat(educationData.degreeCompletionDate.substring(0, 7), 'yyyy-MM').toFormat('yyyy') : ""}
                                        onChange={addEducationFormik.handleChange}
                                    />
                                    {/* <DatePicker
                          selected={new Date()}
                          renderYearContent={renderYearContent}
                          showYearPicker
                          dateFormat="yyyy"
                         /> */}
                                </Grid>
                            </Grid>


                        </div>

                    </form>
                </DialogContent >

            </Dialog>
        </>
    )
}
export default AddEducation;

