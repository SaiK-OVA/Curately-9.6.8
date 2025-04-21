// import React, { Fragment } from 'react';
import { Fragment } from '../../../../../../../shared/modules/React';
import { Dialog, DialogTitle, DialogContent} from '../../../../../../../shared/modules/MaterialImports/Dialog';
import { Divider } from '../../../../../../../shared/modules/MaterialImports/Divider';
import { Button, Grid, TextField } from '../../../../../../../shared/modules/commonImports';
import { Box } from "../../../../../../../shared/modules/MaterialImports/Box";
import { MenuItem } from '../../../../../../../shared/modules/MaterialImports/Menu';
import { DatePicker, LocalizationProvider, AdapterLuxon } from '../../../../../../../shared/modules/MaterialImports/DatePicker';
import { Stack } from "../../../../../../../shared/modules/MaterialImports/Stack";
import { useFormik, Yup } from "../../../../../../../shared/modules/Formik";
const AddTrainingModal = ({ open, closePopup, add, trainingData }: {
  open: boolean;
  closePopup: () => void;
  add: boolean;
  trainingData: any;
}) => {
  const initialAddTrainingDetails = trainingData ? trainingData : {
    "trainingType": "",
    "institutionName": "",
    "trainingName": "",
  }
  const addTrainingSchema = Yup.object().shape({
    "trainingType": Yup.string(),
    "institutionName": Yup.string(),
    "trainingName": Yup.string(),
  })
  const addTrainingFormik = useFormik({
    initialValues: initialAddTrainingDetails,
    validationSchema: addTrainingSchema,
    onSubmit: () => {
      // setIsFormSubmitted(true);
      //  console.log(addTrainingFormik.values);
    },
    validateOnMount: true
  });
  return (
    <div><Dialog
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
            {add ? "Create New" : "Edit"} Training
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
              >{add ? "Create " : "Update "}Training</Button>
            </Grid>
          </div>
        </Grid>
      </DialogTitle>

      <Divider />
      <DialogContent>
        <Grid container spacing={2} className="mb-2">
          <Grid size={3} className='pr-2'>
            <Box>
              <TextField
                id="trainingType"
                name="trainingType"
                fullWidth
                size="small"
                variant="outlined"
                select
                label={
                  <Fragment>
                    Training Type
                    <span>*</span>
                  </Fragment>

                }
              >
                <MenuItem value="Professional">Professional</MenuItem>
                <MenuItem value="Technical">Technical</MenuItem>
              </TextField>
            </Box>
          </Grid>

          <Grid size={3} className='pr-2'>
            <TextField fullWidth
              id="institutionName"
              name="institutionName"
              size="small"
              variant="outlined"
              type="text"
              label={
                <Fragment>
                  Institution
                  <span>*</span>
                </Fragment>
              }
              value={add ? "" : trainingData.institutionName}
            />
          </Grid>
          <Grid size={3} className='pr-2'>
            <TextField fullWidth
              id="trainingName"
              name="trainingName"
              size="small"
              variant="outlined"
              type="text"
              label={
                <Fragment>
                  Name
                  <span>*</span>
                </Fragment>
              }
              value={add ? "" : trainingData.trainingName}
            />
          </Grid>
          <Grid size={3} className='pr-2'>
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
        </Grid>
      </DialogContent>
    </Dialog>
    </div>
  )
}

export default AddTrainingModal