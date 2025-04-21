// import React, { Fragment } from 'react';
import { Fragment } from '../../../../../../../shared/modules/React';
import { Dialog, DialogContent, DialogTitle } from '../../../../../../../shared/modules/MaterialImports/Dialog';
import { Divider } from '../../../../../../../shared/modules/MaterialImports/Divider';
import { Button, Grid } from '../../../../../../../shared/modules/commonImports';
import { TextField,  FormControl, FormControlLabel } from '../../../../../../../shared/modules/MaterialImports/FormInputs';
import { Radio, RadioGroup } from '../../../../../../../shared/modules/MaterialImports/FormElements';
import { useFormik, Yup } from "../../../../../../../shared/modules/Formik";

const AddSkillModal = ({ open, closePopup, add, skillData }: {
  open: boolean;
  closePopup: () => void;
  add: boolean;
  skillData: any;
}) => {
  const initialAddSkillDetails = skillData.skillID ? skillData : {
    "skillName": "",
    "skillLevel": "",
  }
  const addSkillSchema = Yup.object().shape({
    "skillName": Yup.string(),
    "skillLevel": Yup.string(),
  })
  const addSkillFormik = useFormik({
    initialValues: initialAddSkillDetails,
    validationSchema: addSkillSchema,
    onSubmit: () => {
      // setIsFormSubmitted(true);
      //  console.log(addSkillFormik.values);
    },
    validateOnMount: true
  });
  return (
    <div>
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
                {add ? "Create New" : "Edit"} Skill
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
                  >{add ? "Create " : "Update "}Skill</Button>
                </Grid>
              </div>
            </Grid>
          </DialogTitle>
          <Divider />
          <DialogContent className='py-2'>
            <Grid container spacing={2} className="mb-2">
              <Grid size={4} className='pr-2'>
                <TextField fullWidth
                  id=""
                  name=""
                  size="small"
                  variant="outlined"
                  type="text"
                  label={
                    <Fragment>
                      Skill Name
                      <span>*</span>
                    </Fragment>
                  }
                  value={add ? "" : skillData.skillName}
                  onChange={addSkillFormik.handleChange}
                />
              </Grid>
              <Grid size={8} className='pr-2'>
                <FormControl>
                  <RadioGroup
                    row
                    name="skillLevel"
                    value={add ? "" : "Beginner"}
                    // value={addSkillFormik.values.skillLevel}
                    onChange={addSkillFormik.handleChange}
                  >
                    <FormControlLabel value="Beginner" control={<Radio style={{ color: 'black' }} />} label="Beginner"
                    />
                    <FormControlLabel value="Intermediate" control={<Radio style={{ color: 'black' }} />} label="Intermediate" />
                    <FormControlLabel value="Experienced" control={<Radio style={{ color: 'black' }} />} label="Experienced" />
                    <FormControlLabel value="Expert" control={<Radio style={{ color: 'black' }} />} label="Expert" />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default AddSkillModal