// import React, { Fragment } from 'react';
import { Fragment } from '../../../../../../../shared/modules/React';
import { Dialog, DialogContent, DialogTitle } from '../../../../../../../shared/modules/MaterialImports/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
import { Divider } from '../../../../../../../shared/modules/MaterialImports/Divider';
// import Divider from '@mui/material/Divider';
// import CloseIcon from '@mui/icons-material/Close';
import { Button, TextField, Grid } from '../../../../../../../shared/modules/commonImports';
// import IconButton from '@mui/material/IconButton';
import { Box } from "../../../../../../../shared/modules/MaterialImports/Box";
import { MenuItem } from '../../../../../../../shared/modules/MaterialImports/Menu';
import { useFormik, Yup } from "../../../../../../../shared/modules/Formik";

const AddLanguageModal = ({ open, closePopup, add, languageData }: {
    open: boolean;
    closePopup: () => void;
    add: boolean;
    languageData: any;
}) => {
    const initialAddLanguageDetails = languageData ? languageData : {
        "languageName": "",
        "proficiencyLevel": "",
    }
    const addLanguageSchema = Yup.object().shape({
        "languageName": Yup.string(),
        "proficiencyLevel": Yup.string(),
    })
    const addLanguageFormik = useFormik({
        initialValues: initialAddLanguageDetails,
        validationSchema: addLanguageSchema,
        onSubmit: () => {
            // setIsFormSubmitted(true);
            //  console.log(addLanguageFormik.values);
        },
        validateOnMount: true
    });
    return (
        <div>
            <Dialog
                maxWidth={'md'}
                // sx={{ width: 900, maxWidth: 900, minWidth: 900 }}
                fullWidth={true} open={open} className='AddPoolModal customInputs' id='addPool'>

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
                            {add ? "Create New" : "Edit"} Language
                        </span>
                        <div>
                            <Grid
                                container
                                direction="row"
                                justifyContent="end"
                                alignItems="center"
                            >
                                {/* <CloseIcon /> onClick={() => closePopup()}  */}
                                <Button variant="outlined"
                                    type='button'
                                    color="secondary"
                                    className='mr-2'
                                    onClick={closePopup}
                                >Cancel</Button>
                                <Button variant="contained"
                                    type='button'
                                    color="primary"
                                >{add ? "Create " : "Update "}Language</Button>
                            </Grid>
                        </div>
                    </Grid>
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <Grid container spacing={2} className="mb-2">
                        <Grid size={6} className='pr-2'>
                            <TextField fullWidth
                                id="languageName"
                                name="languageName"
                                size="small"
                                variant="outlined"
                                type="text"
                                label={
                                    <Fragment>
                                        Language Name
                                        <span>*</span>
                                    </Fragment>
                                }
                                value={add ? "" : languageData.langCode}
                                onChange={addLanguageFormik.handleChange}
                            />
                        </Grid>
                        <Grid size={6} className=' pr-2'>
                            <Box>
                                <TextField
                                    fullWidth
                                    id=" proficiencyLevel"
                                    name=" proficiencyLevel"
                                    size="small"
                                    variant="outlined"
                                    select
                                    label={
                                        <Fragment>
                                            Proficiency Level
                                            <span>*</span>
                                        </Fragment>
                                    }
                                    value={add ? "" : languageData.langCode}
                                    onChange={addLanguageFormik.handleChange}
                                >
                                    <MenuItem value=""></MenuItem>
                                    <MenuItem value="Basic - Familiar">Basic - Familiar</MenuItem>
                                    <MenuItem value="Conversational - Limited ">Conversational - Limited </MenuItem>
                                    <MenuItem value="Conversational - Advanced">Conversational - Advanced</MenuItem>
                                    <MenuItem value="Fluent">Fluent</MenuItem>
                                </TextField>
                            </Box>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddLanguageModal