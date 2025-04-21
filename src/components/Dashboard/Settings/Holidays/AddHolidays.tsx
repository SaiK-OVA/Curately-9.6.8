import { React, useState } from '../../../../shared/modules/React';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '../../../../shared/modules/MaterialImports/Dialog'
import { Button, IconButton } from '../../../../shared/modules/MaterialImports/Button'
import { TextField, InputLabel, FormControl } from '../../../../shared/modules/MaterialImports/FormInputs'
import { MenuItem } from '../../../../shared/modules/MaterialImports/Menu'
import { Select } from '../../../../shared/modules/MaterialImports/FormElements';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik, Yup } from "../../../../shared/modules/Formik";
import './AddHolidays.scss'
import { LocalizationProvider, DatePicker, AdapterLuxon } from '../../../../shared/modules/MaterialImports/DatePicker';
// import { TextFieldProps } from '@mui/material';
import { DateTime } from '../../../../shared/modules/Luxon';
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';

import { trackPromise } from '../../../../shared/modules/PromiseTrackter';
import { Stack } from '../../../../shared/modules/MaterialImports/Stack';
import ApiService from '../../../../shared/api/api';
import { showToaster } from '../../../shared/SnackBar/SnackBar';
import { userLocalData } from '../../../../shared/services/userData';
import ErrorMessage from '../../../shared/Error/ErrorMessage';


// interface HolidaysType {
//     holidayId?: string;
//     holidayName: string;
//     holidayDate: string;
//     holidayType?: string | null;
//     holidayStatus: boolean;
//     clientId?: string | null;
// }
interface AddHolidaysDialogProps {
    open: boolean;
    handleClose: (addorUpdate: boolean) => void;
    holidayData: any;
    add: boolean;
}

const AddHolidays: React.FC<AddHolidaysDialogProps> = ({ open, handleClose, add, holidayData }) => {

    let clientId = userLocalData.getvalue('clientId');

    const [isFormSubmitted, setIsFormSubmitted] = useState(false);


    const addHolidaysFormik = useFormik({
        initialValues: holidayData ? {
            holidayName: holidayData ? holidayData.holidayName : '',
            holidayDate: holidayData ? holidayData.holidayDate : '',
            holidayType: holidayData ? holidayData.holidayType.toString() : 'true',
            holidayId: holidayData ? holidayData.holidayId : '',
            clientId: holidayData ? holidayData.clientId : clientId,
        } : {
            holidayName: '',
            holidayDate: "",
            holidayType: 'false',
            holidayId: "",
            clientId: clientId,
        },
        validationSchema: Yup.object().shape({
            holidayId: Yup.string(),
            holidayName: Yup.string().matches(/^[a-zA-Z0-9-_@() ]+$/, 'holidayName can only contain letters, numbers, and spaces').required('Holiday name is required'),
            clientId: Yup.string(),
            holidayDate: Yup.date().required('Holiday Date is required'),
            holidayType: Yup.string().required('Holiday Type is required'),
            holidayStatus: Yup.boolean()

        }),
        enableReinitialize: true,
        onSubmit: () => {
            //   handleAdd(values);
            setIsFormSubmitted(true);
        },

    });


    const saveHoliday = () => {

        if (addHolidaysFormik.values.holidayName.trim() === "") {
            showToaster("Please Enter Holiday Name", "error");
            return false;
        } else if (addHolidaysFormik.values.holidayDate.trim() === "") {
            showToaster("Please enter Holiday Date", "error");
            return false;
        } else if ((addHolidaysFormik.values.holidayType === "")) {
            showToaster("Please select Holiday Type", "error");
            return false;
        }


        setIsFormSubmitted(true);
        //  console.log(addHolidaysFormik.values.holidayType);
        let data = {
            holidayDate: addHolidaysFormik.values.holidayDate,
            holidayName: addHolidaysFormik.values.holidayName,
            holidayType: (addHolidaysFormik.values.holidayType.toString() === "true") ? true : false,
            clientId: userLocalData.getvalue("clientId")
        }
        //console.log(data)
        if (addHolidaysFormik.isValid) {
            trackPromise(
                //  http://35.155.202.216:8080/QADemoCurately/saveHolidays
                //   ApiService.postWithData(216, 'QADemoCurately/saveHolidays', data).then(
                ApiService.postWithData('admin', 'saveHolidays', data).then(
                    (response: any) => {

                        if (response.data.Success) {
                            showToaster('Holiday has been saved successfully.', 'success');

                            addHolidaysFormik.resetForm();
                            handleClose(true);
                        } else {
                            showToaster((response.data.Message) ? response.data.Message : 'An error occured', 'error')
                        }
                    })
            )

        } else if (!addHolidaysFormik.errors.holidayName) {
            showToaster('Please fill all fields.', 'error');
        }
    }


    const updateHoliday = () => {


        if (addHolidaysFormik.values.holidayName.trim() === "") {
            showToaster("Please Enter Holiday Name", "error");
            return false;
        } else if (addHolidaysFormik.values.holidayDate.trim() === "") {
            showToaster("Please enter Holiday Date", "error");
            return false;
        } else if ((addHolidaysFormik.values.holidayType === "")) {
            showToaster("Please select Holiday Type", "error");
            return false;
        }

        setIsFormSubmitted(true);


        if (addHolidaysFormik.isValid) {
            trackPromise(
                //   ApiService.postWithData(214, 'saveSource', { ...addSourcesFormik.values }).then(
                //     ApiService.postWithData(216, 'QADemoCurately/updateHolidays', { ...addHolidaysFormik.values }).then(
                ApiService.postWithData('admin', 'updateHolidays', { ...addHolidaysFormik.values }).then(
                    (response: any) => {

                        if (response.data.Success) {
                            showToaster
                                ('Holiday has been updated successfully.', 'success');

                            addHolidaysFormik.resetForm();
                            handleClose(true);
                        } else {
                            showToaster((response.data.Message) ? response.data.Message : 'An error occured', 'error')
                        }
                    })
            )
        } else {
            showToaster('Please fill all fields.', 'error');
        }
    }


    const handleCloseAddHolidaysDialog = () => {
        handleClose(false);
        addHolidaysFormik.resetForm();
    };

    const saveAuditLog = (id: number) => {
        ApiService.saveAuditLog(id);
    }

    return (
        <Dialog open={open} onClose={handleClose} maxWidth={'sm'} fullWidth={true}>

            <DialogTitle>{add ? "Add New" : "Update "} Holiday</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleCloseAddHolidaysDialog}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent>
                <form key={holidayData?.holidayId} onSubmit={addHolidaysFormik.handleSubmit} >
                    <Stack spacing={2}>
                        <Stack>
                            <TextField
                                autoFocus
                                id="holidayName"
                                label="Holidays Name"
                                size='small'
                                type="text"
                                fullWidth
                                required
                                variant="outlined"
                                value={addHolidaysFormik.values.holidayName}
                                onChange={(event) => {
                                    addHolidaysFormik.setFieldValue("holidayName", event.target.value)
                                }}
                                error={addHolidaysFormik.touched.holidayName && Boolean(addHolidaysFormik.errors.holidayName)}
                            />
                            <ErrorMessage formikObj={addHolidaysFormik} name="holidayName" isFormSubmitted={isFormSubmitted} />
                        </Stack>
                        <LocalizationProvider dateAdapter={AdapterLuxon}>
                            <DatePicker
                                label="Date"
                                value={addHolidaysFormik.values.holidayDate ? DateTime.fromISO(addHolidaysFormik.values.holidayDate) : null}
                                onChange={(date) => {
                                    addHolidaysFormik.setFieldValue("holidayDate", date ? date.toISODate() : '');
                                }}
                                slotProps={{ textField: { size: 'small' } }}
                            // renderInput={(params:TextFieldProps) => (
                            //   <TextField
                            //     {...params}
                            //     size="small"
                            //     fullWidth
                            //     sx={{ mb: 2 }}
                            //     error={addHolidaysFormik.touched.holidayDate && Boolean(addHolidaysFormik.errors.holidayDate)}
                            //     helperText={addHolidaysFormik.touched.holidayDate && addHolidaysFormik.errors.holidayDate}
                            //   />
                            // )}
                            />
                        </LocalizationProvider>
                        <FormControl size="small" className='mt-5'>
                            <InputLabel id="type-label">Type</InputLabel>
                            <Select
                                labelId="type-label"
                                id="holidayType"
                                name="holidayType"
                                label="Type"
                                value={addHolidaysFormik.values.holidayType}
                                onChange={(event: SelectChangeEvent) => {
                                    addHolidaysFormik.setFieldValue("holidayType", event.target.value)
                                }}
                            >
                                <MenuItem value="true">Default</MenuItem>
                                <MenuItem value="false">Custom</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                </form>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined"
                    type='button'
                    size="small"
                    color="secondary"
                    className='mr-2'
                    onClick={handleCloseAddHolidaysDialog}
                >Cancel</Button>

                <Button color="primary" variant='contained' size="small" onClick={() => { (add ? saveHoliday : updateHoliday)(); saveAuditLog(4242); }}>{add ? "Save" : "Update"} Holiday</Button>

            </DialogActions>
        </Dialog>
    );
};

export default AddHolidays;
