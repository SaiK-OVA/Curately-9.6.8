// import React, { Fragment } from 'react';
import { Fragment } from '../../../../../../../shared/modules/React';
import { Dialog, DialogTitle, DialogContent } from '../../../../../../../shared/modules/MaterialImports/Dialog';
import { Divider } from '../../../../../../../shared/modules/MaterialImports/Divider';
import { Button, Grid, TextField } from '../../../../../../../shared/modules/commonImports';
import { Box } from "../../../../../../../shared/modules/MaterialImports/Box";
import { MenuItem } from '../../../../../../../shared/modules/MaterialImports/Menu';
import { DatePicker, LocalizationProvider, AdapterLuxon } from '../../../../../../../shared/modules/MaterialImports/DatePicker';
import { Stack } from "../../../../../../../shared/modules/MaterialImports/Stack";
import { useFormik, Yup } from "../../../../../../../shared/modules/Formik";

const AddLicenseModal = ({ open, closePopup, add, licenseData }: {
    open: boolean;
    closePopup: () => void;
    add: boolean;
    licenseData: any;
}) => {
    const initialAddLicenseDetails = licenseData ? licenseData : {
        "licenseType": "",
        "issuer": "",
        "name": "",
        "certificateLink": "",
    }
    const addLicenseSchema = Yup.object().shape({
        "licenseType": Yup.string(),
        "issuer": Yup.string(),
        "name": Yup.string(),
        "certificateLink": Yup.string(),
    })
    const addLicenseFormik = useFormik({
        initialValues: initialAddLicenseDetails,
        validationSchema: addLicenseSchema,
        onSubmit: () => {
            // setIsFormSubmitted(true);
            //  console.log(addLicenseFormik.values);
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
                            {add ? "Create New" : "Edit"} License
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
                                >{add ? "Create " : "Update "}License</Button>
                            </Grid>
                        </div>
                    </Grid>
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <Grid container spacing={2} className="mb-2">
                        <Grid size={4} className='pr-2'>
                            <Box>
                                <TextField
                                    id="licenseType"
                                    name="licenseType"
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    select
                                    label={
                                        <Fragment>
                                            License Type
                                            <span>*</span>
                                        </Fragment>

                                    }
                                    onChange={addLicenseFormik.handleChange}
                                >
                                    <MenuItem value=" License"> License</MenuItem>
                                    <MenuItem value="Certificate">Certificate</MenuItem>
                                </TextField>
                            </Box>
                        </Grid>

                        <Grid size={4} className='pr-2'>
                            <TextField fullWidth
                                id="issuer"
                                name="issuer"
                                size="small"
                                variant="outlined"
                                type="text"
                                label={
                                    <Fragment>
                                        Issuer
                                        <span>*</span>
                                    </Fragment>
                                }
                                value={add ? "" : licenseData.authorityName}
                                onChange={addLicenseFormik.handleChange}
                            />
                        </Grid>
                        <Grid size={4} className='pr-2'>
                            <TextField fullWidth
                                id="name"
                                name="name"
                                size="small"
                                variant="outlined"
                                type="text"
                                label={
                                    <Fragment>
                                        Name
                                        <span>*</span>
                                    </Fragment>
                                }
                                value={add ? "" : licenseData.certName}
                                onChange={addLicenseFormik.handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} className="mb-2">
                        <Grid size={4} className='pr-2'>
                            <Stack direction="row" spacing={2}>
                                <LocalizationProvider dateAdapter={AdapterLuxon}>
                                    <DatePicker
                                        label={
                                            <Fragment>
                                                Year
                                                <span>*</span>
                                            </Fragment>
                                        }
                                        slotProps={{ textField: { size: 'small' } }}
                                        onChange={(date: any) => console.log(date)}
                                    />
                                </LocalizationProvider>
                            </Stack>
                        </Grid>
                        <Grid size={4} className='pr-2'>
                            <TextField fullWidth
                                id="certificateLink"
                                name="certificateLink"
                                size="small"
                                variant="outlined"
                                type="text"
                                label={
                                    <Fragment>
                                        Certificate Link or ID
                                    </Fragment>
                                }
                                value={add ? "" : licenseData.certTypeLookupID}
                                onChange={addLicenseFormik.handleChange}
                            />
                        </Grid>
                        <Grid size={4} className='pr-2'>
                            <Button variant="contained"
                            >
                                Upload License/Credential Document
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </div>
    )
}
export default AddLicenseModal