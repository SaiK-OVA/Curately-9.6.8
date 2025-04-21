import { Dialog, DialogTitle, DialogContent, DialogActions, CloseIcon } from '../../../../shared/modules/MaterialImports/Dialog';
// import { FormControl, FormControlLabel } from "../../../../shared/modules/MaterialImports/FormInputs";
// import { Radio, RadioGroup } from "../../../../shared/modules/MaterialImports/FormElements";
import { MUIAutoComplete } from "../../../shared/MUIAutoComplete/MUIAutoComplete";
import { Yup, useFormik } from '../../../../shared/modules/Formik';
import { Button, IconButton } from '../../../../shared/modules/MaterialImports/Button';
import { Grid } from '../../../../shared/modules/MaterialImports/Grid2';
import ApiService from '../../../../shared/api/api';
import { userLocalData } from '../../../../shared/services/userData';
import { showToaster } from '../../../shared/SnackBar/SnackBar';
import { Loader } from '../../../shared/Loader/Loader';

const MergeContacts = ({ open, closePopup, contactsData }: { open: boolean; closePopup: (add: boolean) => void, contactsData: any }) => {
    const mergeContact = () => {
        if (!mergeFormik.values.contactIdA) {
            showToaster('Please select Contact A', 'error');
        } else if (!mergeFormik.values.contactIdB) {
            showToaster('Please select Contact B', 'error');
            // } else if (!mergeFormik.values.action) {
            //     showToaster('Please select action', 'error');
        } else {
            // API endpoint for merging contacts
            // https://app.curately.ai/Accuick_API/Curately/Contacts/contact_merge.jsp
            ApiService.getByParams(193, 'Curately/Contacts/contact_merge.jsp', {
                userId: userLocalData.getvalue('recrId'),
                clientId: userLocalData.getvalue('clientId'),
                mergeFrom: mergeFormik.values.contactIdA,
                mergeTo: mergeFormik.values.contactIdB,
                // action: mergeFormik.values.action,
                fromName: mergeFormik.values.contactNameA,
                toName: mergeFormik.values.contactNameB
            }).then((response) => {
                if (response.data.success) {
                    showToaster('Contacts are merged Successfully', 'success');
                    closePopup(true);
                } else {
                    showToaster(response.data.Message ? response.data.Message :response.data.message ? response.data.message : "An error occurred while merging", 'error');
                }
            })
        }
    }

    const mergeData = {
        contactIdA: contactsData.contactIdA || "",
        contactNameA: contactsData.contactNameA || "",
        contactIdB: contactsData.contactIdB || "",
        contactNameB: contactsData.contactNameB || "",
        action: "",
    }

    const mergeSchema = Yup.object().shape({
        contactIdA: Yup.string().required('Contact A is required'),
        contactNameA: Yup.string(),
        contactIdB: Yup.string().required('Contact B is required'),
        contactNameB: Yup.string(),
        action: Yup.string().required('Action is required'),
    });

    const mergeFormik = useFormik({
        initialValues: mergeData,
        validationSchema: mergeSchema,
        onSubmit: () => { }
    });

    return (
        <Dialog open={open} aria-labelledby="merge-contacts-title" className='customInputs'>
            <DialogTitle sx={{ m: 0, p: 2 }} id="merge-contacts-title">
                Merge Duplicate Contacts
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
            <DialogContent dividers sx={{width: '400px'}}>
                <Loader />
                <Grid>
                    <label className='inputLabel'>Contact A : Merge this Contact</label>
                    <MUIAutoComplete
                        id='contactNameA'
                        handleChange={(id: any, name: any) => {
                            mergeFormik.setValues({
                                ...mergeFormik.values,
                                contactIdA: id,
                                contactNameA: name
                            })
                        }}
                        valuePassed={{
                            id: mergeFormik.values.contactIdA,
                            label: mergeFormik.values.contactNameA,
                        }}
                        isMultiple={false}
                        placeholder={""}
                        width="100%"
                        type='contactName'
                    />
                </Grid>
                <Grid className='mt-3'>
                    <label className='inputLabel'>Contact B : into this Contact</label>
                    <MUIAutoComplete
                        id='contactNameB'
                        handleChange={(id: any, name: any) => {
                            mergeFormik.setValues({
                                ...mergeFormik.values,
                                contactIdB: id,
                                contactNameB: name
                            })
                        }}
                        valuePassed={{
                            id: mergeFormik.values.contactIdB,
                            label: mergeFormik.values.contactNameB,
                        }}
                        isMultiple={false}
                        placeholder={""}
                        width="100%"
                        type='contactName'
                    />
                </Grid>
                {/* <FormControl className='mt-5 pt-5'>
                    <RadioGroup
                        row
                        name="action"
                        onChange={(e) => {
                            mergeFormik.setValues({
                                ...mergeFormik.values,
                                action: e.target.value
                            })
                        }}
                    >
                        <FormControlLabel value="ignoreDuplicates" control={<Radio />} label="Ignore Duplicate contacts in Contact A" />
                        <FormControlLabel value="overrideContacts" control={<Radio />} label="Override contacts from Contact A if Duplicate found in Contact B" />
                    </RadioGroup>
                </FormControl> */}
            </DialogContent>
            <DialogActions>
                <Button variant="contained" autoFocus onClick={mergeContact}>
                    Merge
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default MergeContacts;
