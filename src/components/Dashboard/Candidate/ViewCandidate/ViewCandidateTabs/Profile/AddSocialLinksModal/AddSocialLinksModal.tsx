// import React, { Fragment } from 'react';
import { Fragment } from '../../../../../../../shared/modules/React';
import { Dialog, DialogTitle, DialogContent } from '../../../../../../../shared/modules/MaterialImports/Dialog';
import { Divider } from '../../../../../../../shared/modules/MaterialImports/Divider';
import { Button, Grid, TextField } from '../../../../../../../shared/modules/commonImports';
import { Box } from "../../../../../../../shared/modules/MaterialImports/Box";
import { MenuItem } from '../../../../../../../shared/modules/MaterialImports/Menu';
import { useFormik, Yup } from "../../../../../../../shared/modules/Formik";

const AddSocialLinksModal = ({ open, closePopup, add, socialLinksData }: {
    open: boolean;
    closePopup: () => void;
    add: boolean;
    socialLinksData: any;
}) => {
    const initialAddSocialLinksDetails = socialLinksData ? socialLinksData : {
        "addSocialLinks": "",
        "enterURL": "",
    }
    const addSocialLinksSchema = Yup.object().shape({
        "addSocialLinks": Yup.string(),
        "enterURL": Yup.string(),
    })
    const addSocialLinksFormik = useFormik({
        initialValues: initialAddSocialLinksDetails,
        validationSchema: addSocialLinksSchema,
        onSubmit: () => {
            // setIsFormSubmitted(true);
            //  console.log(addSocialLinksFormik.values);
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
                            {add ? "Create New" : "Edit"} Link
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
                                >{add ? "Create " : "Update "}Link</Button>
                            </Grid>
                        </div>
                    </Grid>
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <Grid container spacing={2} className="mb-2">
                        <Grid size={6} className='pr-2'>
                            <Box>
                                <TextField
                                    name=""
                                    id=""
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    select
                                    label={
                                        <Fragment>
                                            Add Social Links
                                            <span>*</span>
                                        </Fragment>
                                    }
                                    onChange={addSocialLinksFormik.handleChange}
                                >
                                    <MenuItem value=""></MenuItem>
                                    <MenuItem value="LinkedIn ">LinkedIn </MenuItem>
                                    <MenuItem value="Facebook">Facebook</MenuItem>
                                    <MenuItem value="GitHub">GitHub</MenuItem>
                                </TextField>
                            </Box>
                        </Grid>

                        <Grid size={6} className='pr-2'>
                            <TextField fullWidth
                                name=""
                                id=""
                                size="small"
                                variant="outlined"
                                type="text"
                                label={
                                    <Fragment>
                                        Enter URL
                                        <span>*</span>
                                    </Fragment>
                                }
                                value={add ? "" : socialLinksData.socialURL}
                                onChange={addSocialLinksFormik.handleChange}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddSocialLinksModal