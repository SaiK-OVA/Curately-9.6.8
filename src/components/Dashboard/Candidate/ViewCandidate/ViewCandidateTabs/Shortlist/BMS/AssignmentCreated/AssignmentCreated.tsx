import { useState } from '../../../../../../../../shared/modules/React';
import { Form, Formik, Yup } from '../../../../../../../../shared/modules/Formik';
import { trackPromise } from '../../../../../../../../shared/modules/PromiseTrackter';

// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogTitle from '@mui/material/DialogTitle';
import { Button, Grid } from '../../../../../../../../shared/modules/commonImports';
import { Divider } from '../../../../../../../../shared/modules/MaterialImports/Divider';
// import InputAdornment from '@mui/material/InputAdornment';
// import MenuItem from '@mui/material/MenuItem';
// import Stack from '@mui/material/Stack';
// import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';


// import { DateTime } from 'luxon';
// import { LocalizationProvider, DatePicker, DateTimePicker } from '@mui/x-date-pickers';
// import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';

import ApiService from '../../../../../../../../shared/api/api';
import { DateTime } from '../../../../../../../../shared/modules/Luxon';
import { showToaster } from '../../../../../../../shared/SnackBar/SnackBar';

import './AssignmentCreated.scss';

interface AssignmentCreatedDialogProps {
  open: boolean;
  closePopup: () => void;
  saveData: (acceptOrReject: "Accept" | "Reject") => void;
  assignmentData: {
    "status": string;
    "pay-rate": {
      "unit": string;
      "currency": string;
      "amount": number;
    },
    "start-date": string;
    "end-date": string;
    "onboarding-instructions": string;
    "payment-model": string;
    "offer-id": string;
  }
}
// {
//   "isCustom": true,
//   "customForm": "bmsOffer",
//   "json": {
//     "status": "Pending",
//     "pay-rate": { "unit": "Hourly", "currency": "USD", "amount": 20 },
//     "start-date": "2024-09-11",
//     "end-date": "2025-07-10",
//     "onboarding-instructions": null,
//     "payment-model": "Payrollee",
//     "offer-id": "8d5e59ec-7d80-7846-7812-4c6ec8d370b3"
//   }
// }

const AssignmentCreated = ({ open, closePopup, saveData, assignmentData }: AssignmentCreatedDialogProps) => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const initialValues = {
    payRate: {
      unit: assignmentData['pay-rate']?.unit ? assignmentData['pay-rate'].unit : '',
      currency: assignmentData['pay-rate']?.currency ? assignmentData['pay-rate']?.currency : '',
      amount: assignmentData['pay-rate']?.amount ? assignmentData['pay-rate']?.amount : Number(),
    },
    billRate: {
      unit: '',
      currency: '',
      amount: Number(),
    },
    startDate: assignmentData['start-date'] ? DateTime.fromFormat(assignmentData['start-date'], 'yyyy-MM-dd').toFormat('MM/dd/yyyy') : '',
    endDate: assignmentData['start-date'] ? DateTime.fromFormat(assignmentData['start-date'], 'yyyy-MM-dd').toFormat('MM/dd/yyyy') : '',
    // startDate: DateTime.fromISO('2020-08-27T16:34:32.067Z').toFormat('yyyy-MM-dd HH:mm'),
    // endDate: DateTime.fromISO('2020-08-27T16:34:32.067Z').toFormat('yyyy-MM-dd HH:mm'),
    jobTitle: '',
    workAddress: {
      street1: '',
      street2: '',
      city: '',
      state: '',
      postalCode: '',
      countryCode: ''
    }

  };

  const handleSubmit = (values: any) => {
    setIsFormSubmitted(true);
    console.log('Form submitted', values);
  };

  const validationSchema = Yup.object().shape({
    payRate: Yup.object().shape({
      unit: Yup.string(),
      currency: Yup.string(),
      amount: Yup.number(),
    }),
    billRate: Yup.object().shape({
      unit: Yup.string(),
      currency: Yup.string(),
      amount: Yup.number(),
    }),
    startDate: Yup.string(),
    endDate: Yup.string(),
    jobTitle: Yup.string(),
    workAddress: Yup.object().shape({
      street1: Yup.string(),
      city: Yup.string(),
      state: Yup.string(),
      postalCode: Yup.string(),
      countryCode: Yup.string(),
    }),
  });


  const createAssignment = (acceptOrReject: "Accept" | "Reject") => {
    setIsFormSubmitted(true);
    console.log();

    let dataToPass = {
    }
    const offerId = assignmentData['offer-id'];
    const url = (acceptOrReject === "Accept") ? `offers/${offerId}/accept` : `offers/${offerId}/reject`
    if (offerId) {
      trackPromise(
        ApiService.postWithData('beeline', `${url}`, dataToPass).then((response) => {
          console.log(response.data);
          if (response.data.Success) {
            saveData(acceptOrReject);
          } else {
            showToaster((response.data.Message) ? response.data.Message : "An error occured while submitting data.", 'error');
          }
        })
      )
    } else {
      showToaster('No Offer to Submit', 'error');
    }
    // saveData(acceptOrReject);
  }

  return (
    <div id="assisgnmentCreated">

      <Grid container direction="column" justifyContent="center" alignItems="flex-start" className='p-4'>
        <div className='py-1'><span className='labelText'>Status: </span> <span className='valueText'>{assignmentData.status}</span></div>
        <div className='py-1'><span className='labelText'>Start Date: </span> <span className='valueText'>{assignmentData['start-date']}</span></div>
        <div className='py-1'><span className='labelText'>End Date: </span> <span className='valueText'>{assignmentData['end-date']}</span></div>
        <div className='py-1'>
          <span className='labelText'>Pay Rate: </span>
          <span className='valueText'>
            {
              assignmentData['pay-rate'].amount ?
                `${assignmentData['pay-rate'].currency ? assignmentData['pay-rate'].currency : ""} ${assignmentData['pay-rate'].amount} ${assignmentData['pay-rate'].unit ? " / " + assignmentData['pay-rate'].unit : ""}` : ''
            }
          </span>
        </div>
        <div className='py-1'><span className='labelText'>Payment Model: </span> <span className='valueText'>{assignmentData['payment-model']}</span></div>
      </Grid>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {/* values, handleChange, handleBlur, errors, setFieldValue, touched */}
        {({ }) => (
          <Form placeholder={undefined}>
            {/* <div>
              <Grid container spacing={2} className="pay_rate">
                <Grid size={6} className="mt-4 mb-1">
                  <label className="inputLabel sub_headers">PayRate<span style={{ color: 'red' }}>*</span></label>
                </Grid>
              </Grid>

              <Grid container spacing={2} className="payrate_grid">
                <Grid size={12} className="mt-2 mb-1">
                  <Grid container className='payrate_subgrid' direction="row" justifyContent="start" alignItems="center"><div className='assignment_width_tab'>
                    <div className='textfield_main'>
                      <TextField
                        label="Unit"
                        size="small"
                        fullWidth
                        id="unit"
                        name="payRate.unit"
                        value={values.payRate.unit}
                        onChange={handleChange}
                        select
                      // sx={{ maxWidth: "171px" }}
                      >
                        <MenuItem value="Hourly">Hourly</MenuItem>
                        <MenuItem value="Daily">Daily</MenuItem>
                        <MenuItem value="Monthly">Monthly</MenuItem>
                      </TextField>
                      <Typography variant="caption" color="error">
                        {touched.payRate?.unit && errors.payRate?.unit && `${errors.payRate.unit}`}

                      </Typography>
                    </div>
                    <label> &nbsp; - &nbsp; </label>

                    <div className='textfield_main'>
                      <TextField
                        label="Currency"
                        size="small"
                        fullWidth
                        id="currency"
                        name="payRate.currency"
                        value={values.payRate.currency}
                        onChange={handleChange}
                        select
                      // sx={{ maxWidth: "171px" }}
                      >
                        <MenuItem value="USD">USD</MenuItem>
                        <MenuItem value="EUR">EUR</MenuItem>
                        <MenuItem value="GBP">GBP</MenuItem>
                        <MenuItem value="SGD">SGD</MenuItem>
                        <MenuItem value="CAD">CAD</MenuItem>
                      </TextField>
                      <Typography variant="caption" color="error">
                        {touched.payRate?.currency && errors.payRate?.currency && `${errors.payRate.currency}`}
                      </Typography>
                    </div>

                    <label> &nbsp; - &nbsp; </label>
                    <div className='textfield_main_amount'>
                      <TextField
                        label="Amount"
                        className='sub_headers'
                        size="small"
                        fullWidth
                        id="amount"
                        name="payRate.amount"
                        value={values.payRate.amount}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="number"
                      //  sx={{ maxWidth: "160px" }}
                      >

                      </TextField>
                      <Typography variant="caption" color="error">
                        {touched.payRate?.amount && errors.payRate?.amount && `${errors.payRate.amount}`}
                      </Typography>
                    </div>
                  </div></Grid>
                </Grid>
              </Grid>

              <Grid container spacing={2} className="pay_rate">
                <Grid size={6} className="mt-2 mb-1">
                  <label className="inputLabel sub_headers">Bill Rate<span style={{ color: 'red' }}>*</span></label>
                </Grid>
              </Grid>

              <Grid container spacing={2} className="payrate_grid">
                <Grid size={12} className="mt-2 mb-1 ">
                  <Grid container direction="row" className='payrate_subgrid' justifyContent="start" alignItems="center"><div className='assignment_width_tab'>
                    <div className='textfield_main'>
                      <TextField
                        label="Unit"
                        size="small"
                        fullWidth
                        id="unit"
                        name="billRate.unit"
                        value={values.billRate.unit}
                        onChange={handleChange}
                        select
                      // sx={{ maxWidth: "171px" }}
                      >
                        <MenuItem value="Hourly">Hourly</MenuItem>
                        <MenuItem value="Daily">Daily</MenuItem>
                        <MenuItem value="Monthly">Monthly</MenuItem>
                      </TextField>
                      <Typography variant="caption" color="error">
                        {touched.billRate?.unit && errors.billRate?.unit && `${errors.billRate.unit}`}
                      </Typography>
                    </div>
                    <label> &nbsp; - &nbsp; </label>

                    <div className='textfield_main'>
                      <TextField
                        label="Currency"
                        className='sub_headers'
                        size="small"
                        fullWidth
                        id="currency"
                        name="billRate.currency"
                        value={values.billRate.currency}
                        onChange={handleChange}
                        select
                      // sx={{ maxWidth: "171px" }}
                      >
                        <MenuItem value="USD">USD</MenuItem>
                        <MenuItem value="EUR">EUR</MenuItem>
                        <MenuItem value="GBP">GBP</MenuItem>
                        <MenuItem value="SGD">SGD</MenuItem>
                        <MenuItem value="CAD">CAD</MenuItem>
                      </TextField>
                      <Typography variant="caption" color="error">
                        {touched.billRate?.currency && errors.billRate?.currency && `${errors.billRate.currency}`}
                      </Typography>
                    </div>

                    <label> &nbsp; - &nbsp; </label>
                    <div className='textfield_main_amount'>
                      <TextField
                        label="Amount"
                        className='sub_headers'
                        size="small"
                        fullWidth
                        id="amount"
                        name="billRate.amount"
                        value={values.billRate.amount}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="number"
                      //  sx={{ maxWidth: "160px" }}
                      >

                      </TextField>
                      <Typography variant="caption" color="error">
                        {touched.billRate?.amount && errors.billRate?.amount && `${errors.billRate.amount}`}
                      </Typography>
                    </div>
                  </div></Grid>
                </Grid>
              </Grid>
              <Grid container spacing={2} className="payrate_grid">
                <Grid size={12} className="mt-2 mb-1 date_grid" >

                  <LocalizationProvider dateAdapter={AdapterLuxon}>
                    <div className='text_field_main'>
                      <DateTimePicker
                        className='text_field'
                        label="Start Date"
                        // id="startDate"
                        name="startDate"
                        onChange={(newValue: any) => {
                          if (newValue) {
                            const isoDate = newValue.toISO(); // Convert DateTime to ISO string
                            setFieldValue('startDate', isoDate);
                          }
                        }}
                        slotProps={{
                          textField: {
                            InputLabelProps: {
                              sx: {
                                paddingLeft: '14px',
                                transform: 'translate(0, 8px) scale(1)',
                                '&.Mui-focused': {
                                  transform: 'translate(0, 8px) scale(0.75)',
                                },
                                '&.MuiInputLabel-shrink': {
                                  transform: 'translate(3px, -8px) scale(0.75)',
                                },
                              },
                            },
                          },
                        }}
                        // @ts-ignore
                        inputFormat="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'" // Luxon format    
                      />
                      <Typography variant="caption" color="error">
                        {touched.startDate && errors.startDate && `${errors.startDate}`}
                      </Typography>
                    </div>
                  </LocalizationProvider>


                  <LocalizationProvider dateAdapter={AdapterLuxon}>
                    <div className='text_field_main'>
                      <DateTimePicker
                        className='text_field'
                        label='End Date'
                        // id="startDate"
                        name="endDate"
                        onChange={(newValue: any) => {
                          if (newValue) {
                            const isoDate = newValue.toISO(); // Convert DateTime to ISO string
                            setFieldValue('endDate', isoDate);
                          }
                        }}
                        slotProps={{
                          textField: {
                            InputLabelProps: {
                              sx: {
                                paddingLeft: '14px',
                                transform: 'translate(0, 8px) scale(1)',
                                '&.Mui-focused': {
                                  transform: 'translate(0, 8px) scale(0.75)',
                                },
                                '&.MuiInputLabel-shrink': {
                                  transform: 'translate(3px, -8px) scale(0.75)',
                                },
                              },
                            },
                          },
                        }}
                        // @ts-ignore
                        inputFormat="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'" // Luxon format    
                      />
                      <Typography variant="caption" color="error">
                        {touched.endDate && errors.endDate && `${errors.endDate}`}
                      </Typography>
                    </div>
                  </LocalizationProvider>

                </Grid>
              </Grid>
              <Grid container spacing={2} className="pay_rate">
                <Grid size={6} className="mt-2 mb-2">
                  <label className="inputLabel sub_headers">Job<span style={{ color: 'red' }}>*</span></label>
                </Grid>
              </Grid>
              <Grid className='payrate_grid' >
                <div className='text_field_main'>
                  <TextField
                    label="Job Title"
                    className='sub_headers'
                    size="small"
                    fullWidth
                    id="jobtitle"
                    name="jobTitle"
                    value={values.jobTitle}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"

                    sx={{ maxWidth: "545px" }}
                  >

                  </TextField>
                  <Typography variant="caption" color="error">
                    {touched.jobTitle && errors.jobTitle && `${errors.jobTitle}`}
                  </Typography>
                </div>
              </Grid>

              <Grid container spacing={2} className="pay_rate">
                <Grid size={6} className="mt-2 mb-1">
                  <label className="inputLabel sub_headers">Work Address<span style={{ color: 'red' }}>*</span></label>
                </Grid>
              </Grid>
              <Grid container spacing={2} className="workaddress_grid">
                <Grid size={12} className="mt-2 mb-1">
                  <Grid container direction="row" className='workadd_grid' justifyContent="start" alignItems="center">
                    <div className='text_field_wrkad'>
                      <TextField
                        label="Street1"
                        size="small"
                        fullWidth
                        id="street1"
                        name="workAddress.street1"
                        value={values.workAddress.street1}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                      //  sx={{ maxWidth: "265px" }}
                      >

                      </TextField>
                      <Typography variant="caption" color="error">
                        {touched.workAddress?.street1 && errors.workAddress?.street1 && `${errors.workAddress.street1}`}
                      </Typography>
                    </div>
                    <TextField
                      label="Street2"
                      size="small"
                      fullWidth
                      id="street2"
                      name="workAddress.street2"
                      value={values.workAddress.street2}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      sx={{ maxWidth: "265px" }}
                    >

                    </TextField>
                    <div className='text_field_wrkad'>
                      <TextField
                        label="City"
                        size="small"
                        fullWidth
                        id="city"
                        name="workAddress.city"
                        value={values.workAddress.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                      //  sx={{ maxWidth: "265px" }}
                      >

                      </TextField>
                      <Typography variant="caption" color="error">
                        {touched.workAddress?.city && errors.workAddress?.city && `${errors.workAddress.city}`}
                      </Typography>
                    </div>
                    <div className='text_field_wrkad'>
                      <TextField
                        label="State"
                        size="small"
                        fullWidth
                        id="state"
                        name="workAddress.state"
                        value={values.workAddress.state}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                      //  sx={{ maxWidth: "265px" }}
                      >

                      </TextField>
                      <Typography variant="caption" color="error">
                        {touched.workAddress?.state && errors.workAddress?.state && `${errors.workAddress.state}`}
                      </Typography>
                    </div>
                    <div className='text_field_wrkad'>
                      <TextField
                        label="Postal Code"
                        size="small"
                        fullWidth
                        id="postalCode"
                        name="workAddress.postalCode"
                        value={values.workAddress.postalCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                      //  sx={{ maxWidth: "265px" }}
                      >

                      </TextField>
                      <Typography variant="caption" color="error">
                        {touched.workAddress?.postalCode && errors.workAddress?.postalCode && `${errors.workAddress.postalCode}`}
                      </Typography>
                    </div>
                    <div className='text_field_wrkad'>
                      <TextField
                        label="Country Code"
                        size="small"
                        fullWidth
                        id="countryCode"
                        name="workAddress.countryCode"
                        value={values.workAddress.countryCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                      //  sx={{ maxWidth: "265px" }}
                      >

                      </TextField>
                      <Typography variant="caption" color="error">
                        {touched.workAddress?.countryCode && errors.workAddress?.countryCode && `${errors.workAddress.countryCode}`}
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </div> */}
            <Divider />
            <Grid container direction="row" justifyContent="end" alignItems="center" className='p-4'>
              <Button variant="contained" type='button' color="primary" onClick={() => createAssignment("Accept")} className='mr-3' >Accept</Button>
              <Button variant="contained" type='button' color="primary" onClick={() => createAssignment("Reject")} >Reject</Button>
            </Grid>

          </Form>
        )}
      </Formik>


    </div>
  )

}

export default AssignmentCreated;