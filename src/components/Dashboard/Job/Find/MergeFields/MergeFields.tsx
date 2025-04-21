import {Dialog, DialogTitle, DialogContent, DialogActions} from '../../../../../shared/modules/MaterialImports/Dialog';
import CloseIcon from '@mui/icons-material/Close';
// import TextField from "@mui/material/TextField/TextField";
import {FormControl, FormControlLabel} from "../../../../../shared/modules/MaterialImports/FormInputs";
import {RadioGroup, Radio} from "../../../../../shared/modules/MaterialImports/FormElements";
import { MUIAutoComplete } from "../../../../shared/MUIAutoComplete/MUIAutoComplete";
import { Button, IconButton } from '../../../../../shared/modules/MaterialImports/Button';
import { Yup, useFormik } from '../../../../../shared/modules/Formik';
import { Grid } from '../../../../../shared/modules/MaterialImports/Grid2';
import ApiService from '../../../../../shared/api/api';
import { userLocalData } from '../../../../../shared/services/userData';
import { showToaster } from '../../../../shared/SnackBar/SnackBar';
import { Loader } from '../../../../shared/Loader/Loader';



const MergeFields = (
    { open, closePopup, jobsData }: {
        open: boolean;
        closePopup: (refresh: boolean) => void;
        jobsData: {
            jobIdA: string;
            jobTitleA: string;
            jobIdB: string;
            jobTitleB: string;
        };
    }
) => {

    const mergeJob = () => {
        if (!mergeFormik.values.jobIdA) {
            showToaster('Please select Job A', 'error');
        } else if (!mergeFormik.values.jobIdB) {
            showToaster('Please select Job B', 'error');
        } else if (!mergeFormik.values.action) {
            showToaster('Please select action', 'error');
        } else {
            // https://app.curately.ai/Accuick_API/Curately/Jobs/job_merge.jsp
            ApiService.postWithData('admin', 'jobMerge',{
                recrid: userLocalData.getvalue('recrId'),
                clientId: userLocalData.getvalue('clientId'),
                mergefrom: mergeFormik.values.jobIdA,
                mergeto: mergeFormik.values.jobIdB,
                action: mergeFormik.values.action,
            }).then((response: any) => {
                if (response.data.Message === "Success") {
                    showToaster('Jobs are merged Successfully', 'success');
                    closePopup(true);
                    saveAuditLog(4176);
                } else {
                    showToaster(response.data.Message ? response.data.Message : "An error occured while merging", 'error');
                }
            })
        }
    }

    const mergeData = {
        jobIdA: (jobsData.jobIdA) ? jobsData.jobIdA : "",
        jobTitleA: (jobsData.jobTitleA) ? jobsData.jobTitleA : "",
        jobIdB: (jobsData.jobIdB) ? jobsData.jobIdB : "",
        jobTitleB: (jobsData.jobTitleB) ? jobsData.jobTitleB : "",
        action: "",
    }

    const mergeSchema = Yup.object().shape({
        jobIdA: Yup.string().required('Job is required'),
        jobTitleA: Yup.string(),
        jobIdB: Yup.string().required('Job is required'),
        jobTitleB: Yup.string(),
        action: Yup.string().required('Action is required'),
    });

    const mergeFormik = useFormik({
        initialValues: mergeData,
        validationSchema: mergeSchema,
        onSubmit: () => { }
    })

    const saveAuditLog = (id: number) => {
        ApiService.saveAuditLog(id);
    }

    return <Dialog
        // onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className='customInputs'
    >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Merge Duplicate Job
        </DialogTitle>
        <IconButton
            aria-label="close"
            onClick={() => { closePopup(false) }}
            sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
            }}
        >
            <CloseIcon />
        </IconButton>
        <DialogContent dividers>
            <Loader />
            <Grid>
                <label className='inputLabel'>Job A : Merge this Job</label>
                <MUIAutoComplete
                    id='jobTitleA'
                    handleChange={(id: any, name: string) => {
                        mergeFormik.setValues({
                            ...mergeFormik.values,
                            jobIdA: id,
                            jobTitleA: name
                        })
                    }}

                    valuePassed={{
                        id: mergeFormik.values.jobIdA,
                        label: mergeFormik.values.jobTitleA,
                    }}
                    isMultiple={false}
                    // textToShow="Select EmailTemplates"
                    placeholder={""}
                    //placeholder="Select jobTitle"
                    width="100%"
                    type='jobTitleAndId'
                />
            </Grid>
            <Grid className='mt-3'>
                <label className='inputLabel'>Job B : into this Job</label>
                <MUIAutoComplete
                    id='jobTitleB'
                    handleChange={(id: any, name: string) => {
                        mergeFormik.setValues({
                            ...mergeFormik.values,
                            jobIdB: id,
                            jobTitleB: name
                        })
                    }}

                    valuePassed={{
                        id: mergeFormik.values.jobIdB,
                        label: mergeFormik.values.jobTitleB,
                    }}
                    isMultiple={false}
                    // textToShow="Select EmailTemplates"
                    placeholder={""}
                    //placeholder="Select jobTitle"
                    width="100%"
                    type='jobTitleAndId'
                />
            </Grid>
            <FormControl className='mt-5 pt-5'>
                <RadioGroup
                    row
                    name="action"
                    onChange={(e) => {
                        mergeFormik.setValues({
                            ...mergeFormik.values,
                            action: e.target.value
                        })
                    }
                    }
                >
                    <FormControlLabel value="ignoreDuplicates" control={<Radio />} label="Ignore Duplicate candidates in Job A" />
                    <FormControlLabel value="overrideCands" control={<Radio />} label="Override candidates from Job A if Duplicate found in Job B" />
                </RadioGroup>
            </FormControl>

        </DialogContent>
        <DialogActions>
            <Button variant="contained" autoFocus onClick={mergeJob}
            >
                Merge
            </Button>
        </DialogActions>
    </Dialog>
}

export default MergeFields;