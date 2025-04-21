import { React, useState } from '../../../../../shared/modules/React';
import { Tab, Tabs } from '../../../../../shared/modules/MaterialImports/Tabs';
// import Typography from '@mui/material/Typography';
import { Box } from '../../../../../shared/modules/MaterialImports/Box';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Grid } from '../../../../../shared/modules/MaterialImports/Grid';
import { MenuItem } from '../../../../../shared/modules/MaterialImports/Menu';
//import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Button } from '../../../../../shared/modules/MaterialImports/Button';
import { Stack } from '../../../../../shared/modules/MaterialImports/Stack';
//import FormGroup from '@mui/material/FormGroup';
import { FormControl, TextField, FormLabel, FormControlLabel } from '../../../../../shared/modules/MaterialImports/FormInputs'
import { Checkbox, Radio, RadioGroup } from '../../../../../shared/modules/MaterialImports/FormElements';

import { useFormik, Yup } from '../../../../../shared/modules/Formik';

import { FormGroup } from '../../../../../shared/modules/MaterialImports/FormGroup';


import { Divider } from '../../../../../shared/modules/MaterialImports/Divider';
import { showToaster } from '../../../../shared/SnackBar/SnackBar';
import ErrorMessage from '../../../../shared/Error/ErrorMessage';
import ApiService from '../../../../../shared/api/api';
import './MainDetails.scss';
import { trackPromise } from '../../../../../shared/modules/PromiseTrackter';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`addJobTabsPanel-${index}`}
      aria-labelledby={`addJobTabsPanel-${index}`}
      {...other}
      className='addJobTabsPanel customTabsPanel'
    >
      {value === index && (
        <div>{children}</div>
      )}
    </div>
  );
}

const MainDetails = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const initialAddCompanyDetails = {
    "companyName": '',
    "ownerName": '',
    "mainPhone": '',
    "alternativePhone1": '',
    "alternativePhone2": '',
    "fax": '',
    "mainCompnay": '',
    "jobsWebsite": '',
    "streetAddress": '',
    "streetAddress1": '',
    "city": '',
    "state": '',
    "postalCode": '',
    "country": '',
    "region": '',
    "active": '',
    "bulk": '',
    "userAgency": '',
    "pipelineStatus": '',
    "industry": '',
    "sic": '',
    "started": '',
    "employees": '',
    "revenue": '',
    "exchange": '',
    "symbol": '',
    "Sent": '',
    "received": '',
    "fee": '',
    "flatFree": '',
    "guaranteeInformation": '',
    "terms": '',
    "dateEstablishement": '',
    "expireDate": '',
    "primarycontact": '',
    "mspProgram": '',
    "create1": '',
    "create2": '',
    "allUsers": '',
    "customUsers": '',
  }

  const addCompanySchema = Yup.object().shape({
    "companyName": Yup.string().required('Company name is Required'),
    "ownerName": Yup.string().required('Owner is Required'),
    "mainPhone": Yup.string(),
    "alternativePhone1": Yup.string(),
    "alternativePhone2": Yup.string(),
    "fax": Yup.string(),
    "mainCompnay": Yup.string().required('Company Website is Required'),
    "jobsWebsite": Yup.string(),
    "streetAddress": Yup.string(),
    "streetAddress1": Yup.string(),
    "city": Yup.string(),
    "state": Yup.string(),
    "postalCode": Yup.string(),
    "country": Yup.string(),
    "region": Yup.string(),
    "active": Yup.boolean(),
    "bulk": Yup.boolean(),
    "userAgency": Yup.boolean(),
    "pipelineStatus": Yup.string(),
    "industry": Yup.string(),
    "sic": Yup.string(),
    "started": Yup.string(),
    "employees": Yup.string(),
    "revenue": Yup.string(),
    "exchange": Yup.string(),
    "symbol": Yup.string(),
    "Sent": Yup.boolean(),
    "received": Yup.boolean(),
    "fee": Yup.string(),
    "flatFree": Yup.string(),
    "guaranteeInformation": Yup.string(),
    "terms": Yup.string(),
    "dateEstablishement": Yup.string(),
    "expireDate": Yup.string(),
    "primarycontact": Yup.string(),
    "mspProgram": Yup.string(),
    "create1": Yup.boolean(),
    "create2": Yup.boolean(),
    "allUsers": Yup.boolean(),
    "customUsers": Yup.boolean(),
  });

  const saveForm = () => {
    setIsFormSubmitted(true);
    if (addCompanyFormik.isValid) {
      // console.log(addCompanyFormik.values);
      trackPromise(
        ApiService.getByParams(193, 'Company/company_save.jsp', { ...addCompanyFormik.values }).then((response: any) => {
          // console.log(response)
          if (response.data.Message === "Success") {
            showToaster
              ('Company has been saved successfully.', 'success');
            addCompanyFormik.resetForm();
          } else {
            showToaster((response.data.Message) ? response.data.Message : 'An error occured', 'error')
          }
        })
      )
    } else {
      showToaster('Please fill all fields.', 'error');
    }
  }
  const addCompanyFormik = useFormik({
    initialValues: initialAddCompanyDetails,
    validationSchema: addCompanySchema,
    onSubmit: () => {
      setIsFormSubmitted(true);
      console.log(addCompanyFormik.values);
    },
    validateOnMount: true
  });

  const [value, setValue] = React.useState(0);

  // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  //   setValue(newValue);
  // };

  const [tabState, settabState] = useState([false, false, false, false, false, false]);

  const checkValidations = (i: number) => {
    if (i === 1) {
      if (!addCompanyFormik.values.companyName || !addCompanyFormik.values.ownerName || !addCompanyFormik.values.mainCompnay) {
        return false
      }
    }
    return true;
  }
  const updateTabState = (event: any, newValue: any) => {
    if (checkValidations(newValue)) {
      setValue(newValue);
      if (newValue === 6) {
        saveForm();
      } else if (newValue > 0) {
        let tempTabState = tabState;
        tempTabState[newValue - 1] = true;
        settabState({
          ...tempTabState
        })
      }
      setIsFormSubmitted(false);
    } else {
      setIsFormSubmitted(true);
    }
  };


  return (
    <Grid className='customCard mt-2 px-0 pb-0' sx={{ width: "850px !important", margin: 'auto', bgcolor: '#ffffff' }}>
      <form onSubmit={addCompanyFormik.handleSubmit}>
        <span className='addHeader pl-3'>Add New Company</span>
        <Divider className='mt-3' />
        <Box
          className='customCard py-0 customCenteredTabs '
          sx={{ borderBottom: 1, borderColor: 'divider', minHeight: 'auto !important', marginBottom: '0 !important' }}
        >
          <Tabs value={value} onChange={updateTabState} aria-label="Add Company tabs" variant="fullWidth">
            <Tab className={`tabLabelName ${(tabState[0]) ? 'c-green' : ''}`} label="Company" />
            <Tab className={`tabLabelName ${(tabState[1]) ? 'c-green' : ''}`} label="Profiles" />
            <Tab className={`tabLabelName ${(tabState[2]) ? 'c-green' : ''}`} label="Direct hire free agreement" />
            <Tab className={`tabLabelName ${(tabState[3]) ? 'c-green' : ''}`} label="MSP program information" />
            <Tab className={`tabLabelName ${(tabState[4]) ? 'c-green' : ''}`} aria-label="person" label="Alerts" />
            <Tab className={`tabLabelName ${(tabState[5]) ? 'c-green' : ''}`} aria-label="person" label="Notes" />
          </Tabs>
          {/* <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
              <Tab icon={<AssuredWorkloadIcon className="icon" fontSize="large" />} label="COMPANY" />
              <Tab icon={<BadgeIcon className="icon" fontSize="large" />} label="PROFILES" />
              <Tab icon={<HandshakeIcon className="icon" fontSize="large" />} label="DIRECT HIRE FREE AGREEMENT" />
              <Tab label="MSP Program Information"/>
              <Tab icon={<NotificationsNoneIcon className="icon" fontSize="large" />} aria-label="person" label="ALERTS" />
              <Tab icon={<EventNoteIcon className="icon" fontSize="large" />} aria-label="person" label="NOTES" />
              </Tabs>*/}
        </Box>
        <Box>
          <CustomTabPanel value={value} index={0}>

            <div className='jobPanelDiv'>
              <Grid container spacing={2}>
                <Grid size={4}>
                  <TextField
                    label="Company Name *"
                    id="companyName"
                    name="companyName"
                    size="small"
                    margin="dense"
                    onChange={addCompanyFormik.handleChange}
                    value={addCompanyFormik.values.companyName}
                    fullWidth
                  />
                  <ErrorMessage formikObj={addCompanyFormik} name={'companyName'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                </Grid>

                <Grid size={4}>
                  <TextField
                    size='small'
                    id='ownerName'
                    name="ownerName"
                    select
                    className='mb-2'
                    label='Owner *'
                    margin="dense"
                    onChange={addCompanyFormik.handleChange}
                    value={addCompanyFormik.values.ownerName}
                    fullWidth
                  >
                    <MenuItem value="1"> Aditya kumar</MenuItem>
                    <MenuItem value="2"> Akash kumar</MenuItem>
                    <MenuItem value="3"> Mastan vali</MenuItem>
                    <MenuItem value="4"> Sunil yekulla</MenuItem>
                    <MenuItem value="5"> Adam jones</MenuItem>
                    <MenuItem value="6"> Adi kulakarni</MenuItem>
                    <MenuItem value="7"> Akash Mehra</MenuItem>

                  </TextField>
                  <ErrorMessage formikObj={addCompanyFormik} name={'ownerName'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                </Grid>

                <Grid size={4}>
                  <TextField
                    label="Main Phone"
                    id="mainPhone"
                    size="small"
                    margin="dense"
                    name="mainPhone"
                    onChange={addCompanyFormik.handleChange}
                    value={addCompanyFormik.values.mainPhone}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid size={4}>
                  <TextField
                    label="Alternative Phone1"
                    id="alternativePhone1"
                    size="small"
                    margin="dense"
                    name="alternativePhone1"
                    onChange={addCompanyFormik.handleChange}
                    value={addCompanyFormik.values.alternativePhone1}
                    fullWidth
                  />
                </Grid>
                <Grid size={4}>
                  <TextField
                    label="Alternative Phone2"
                    id="alternativePhone2"
                    size="small"
                    margin="dense"
                    name="alternativePhone2"
                    onChange={addCompanyFormik.handleChange}
                    value={addCompanyFormik.values.alternativePhone2}
                    fullWidth
                  />
                </Grid>
                <Grid size={4}>
                  <TextField
                    label="Fax"
                    id="fax"
                    size="small"
                    margin="dense"
                    name="fax"
                    onChange={addCompanyFormik.handleChange}
                    value={addCompanyFormik.values.fax}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid size={4}>
                  <TextField
                    label="Main Compnay Website *"
                    id="mainCompnay"
                    size="small"
                    margin="dense"
                    name="mainCompnay"
                    onChange={addCompanyFormik.handleChange}
                    value={addCompanyFormik.values.mainCompnay}
                    fullWidth
                  />
                  <ErrorMessage formikObj={addCompanyFormik} name={'mainCompnay'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                </Grid>
                <Grid size={4}>
                  <TextField
                    label="Jobs Website"
                    id="jobsWebsite"
                    size="small"
                    margin="dense"
                    name="jobsWebsite"
                    onChange={addCompanyFormik.handleChange}
                    value={addCompanyFormik.values.jobsWebsite}
                    fullWidth
                  />
                </Grid>
                <Grid size={4}>
                  <TextField
                    label="Street Address"
                    id="streetAddress"
                    size="small"
                    margin="dense"
                    name="streetAddress"
                    onChange={addCompanyFormik.handleChange}
                    value={addCompanyFormik.values.streetAddress}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid size={4}>
                  <TextField
                    label="Street Address1"
                    id="streetAddress1"
                    size="small"
                    margin="dense"
                    name="streetAddress1"
                    onChange={addCompanyFormik.handleChange}
                    value={addCompanyFormik.values.streetAddress1}
                    fullWidth
                  />
                </Grid>
                <Grid size={4}>
                  <TextField
                    label="City"
                    id="city"
                    size="small"
                    margin="dense"
                    name="city"
                    onChange={addCompanyFormik.handleChange}
                    value={addCompanyFormik.values.city}
                    fullWidth
                  />
                </Grid>
                <Grid size={4}>
                  <TextField
                    label="State or Prov"
                    id="state"
                    name="state"
                    size="small"
                    margin="dense"
                    onChange={addCompanyFormik.handleChange}
                    value={addCompanyFormik.values.state}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid size={4}>
                  <TextField
                    label="Postal Code"
                    id="postalCode"
                    name="postalCode"
                    size="small"
                    margin="dense"
                    onChange={addCompanyFormik.handleChange}
                    value={addCompanyFormik.values.postalCode}
                    fullWidth
                  />
                </Grid>
                <Grid size={4}>
                  <TextField
                    label="Country/Local"
                    id="country"
                    name="country"
                    size="small"
                    margin="dense"
                    onChange={addCompanyFormik.handleChange}
                    value={addCompanyFormik.values.country}
                    fullWidth
                  />
                </Grid>
                <Grid size={4}>
                  <TextField
                    size='small'
                    id='11'
                    select
                    name={`region`}
                    className='mb-2'
                    label='Region'
                    margin='dense'
                    onChange={addCompanyFormik.handleChange}
                    value={addCompanyFormik.values.region}
                    fullWidth
                  >
                    <MenuItem value="1"> -PST</MenuItem>
                    <MenuItem value="2"> -MST</MenuItem>
                    <MenuItem value="3"> -CST</MenuItem>
                    <MenuItem value="4"> -EST</MenuItem>
                    <MenuItem value="5"> -GMT</MenuItem>
                    <MenuItem value="6"> None</MenuItem>

                  </TextField>
                </Grid>
              </Grid>
            </div>
            <Grid className="customCard"
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              sx={{ minHeight: 'auto !important' }}
            >
              <Button type="button" color="primary" onClick={() => updateTabState("e", 1)} size="medium" variant="contained">Next</Button>
            </Grid>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <div className='jobPanelDiv'>
              <Grid container spacing={2}>
                <Grid size={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="active"
                        name='active'
                        size='small'
                        value={addCompanyFormik.values.active}
                        onChange={addCompanyFormik.handleChange} />
                    }
                    label="Active" />
                </Grid>
                <Grid size={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="bulk"
                        name='bulk'
                        size='small'
                        value={addCompanyFormik.values.bulk}
                        onChange={addCompanyFormik.handleChange}
                      />
                    } label="No Bulk" />
                </Grid>
                <Grid size={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="userAgency"
                        name='userAgency'
                        size='small'
                        value={addCompanyFormik.values.userAgency}
                        onChange={addCompanyFormik.handleChange}
                      />
                    } label="User Agency" />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid size={4}>
                  <TextField
                    size='small'
                    id='pipelineStatus'
                    select
                    name={`pipelineStatus`}
                    className='mb-2'
                    label='Pipeline Status'
                    fullWidth
                    onChange={addCompanyFormik.handleChange}
                    value={addCompanyFormik.values.pipelineStatus}
                  >
                    <MenuItem value="1"> 0: Human Resources</MenuItem>
                    <MenuItem value="2"> 0: Inactive</MenuItem>
                    <MenuItem value="3"> 0: Interviewer</MenuItem>
                    <MenuItem value="4"> 0: Non-Employer</MenuItem>
                    <MenuItem value="5"> 1: New Lead</MenuItem>
                    <MenuItem value="6"> 2: Target</MenuItem>

                  </TextField>
                </Grid>
                <Grid size={4}>
                  <TextField
                    size='small'
                    id='industry'
                    select
                    name={`industry`}
                    className='mb-2'
                    label='Industry'
                    onChange={addCompanyFormik.handleChange}
                    value={addCompanyFormik.values.industry}
                    fullWidth
                  >
                    <MenuItem value="1"> -Select-</MenuItem>
                    <MenuItem value="2"> Aerospace & Defence</MenuItem>
                    <MenuItem value="3"> Agriculture</MenuItem>
                    <MenuItem value="4"> Auto and Transportation</MenuItem>
                    <MenuItem value="5"> Banking</MenuItem>
                    <MenuItem value="6"> Business Services</MenuItem>

                  </TextField>
                </Grid>
                <Grid size={4}>
                  <TextField
                    label="SIC"
                    id="sic"
                    name="sic"
                    size="small"
                    margin="none"
                    onChange={addCompanyFormik.handleChange}
                    value={addCompanyFormik.values.sic}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid size={4}>
                  <TextField
                    label="Yr.Started"
                    id="yrs"
                    name="yrs"
                    size="small"
                    margin="dense"
                    onChange={addCompanyFormik.handleChange}
                    value={addCompanyFormik.values.started}
                    fullWidth
                  />
                </Grid>
                <Grid size={4}>
                  <TextField
                    label="Employees"
                    id="Emp"
                    name="Emp"
                    size="small"
                    margin="dense"
                    onChange={addCompanyFormik.handleChange}
                    value={addCompanyFormik.values.employees}
                    fullWidth
                  />
                </Grid>
                <Grid size={4}>
                  <TextField
                    label="Revenue"
                    id="revenue"
                    name="revenue"
                    size="small"
                    margin="dense"
                    onChange={addCompanyFormik.handleChange}
                    value={addCompanyFormik.values.revenue}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid size={4}>
                  <TextField
                    size='small'
                    id='exchange'
                    select
                    name={`exchange`}
                    className='mt-2'
                    label='Exchange'
                    fullWidth
                    onChange={addCompanyFormik.handleChange}
                    value={addCompanyFormik.values.exchange}
                  >
                    <MenuItem value="1"> </MenuItem>
                    <MenuItem value="2"> NASDAQ</MenuItem>
                    <MenuItem value="3"> NYSE</MenuItem>
                    <MenuItem value="4"> AMEX</MenuItem>
                    <MenuItem value="5"> TSX</MenuItem>

                  </TextField>
                </Grid>
                <Grid size={4}>
                  <TextField
                    label="Symbol"
                    id="symbol"
                    name="symbol"
                    size="small"
                    margin="dense"
                    onChange={addCompanyFormik.handleChange}
                    value={addCompanyFormik.values.symbol}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </div>
            <Stack
              direction="row"
              className="customCard px-4 py-2"
              justifyContent="space-between"
              alignItems="center"
              sx={{ minHeight: 'auto !important' }}
            >
              <Button type="button" onClick={() => setValue(0)} size="medium">Previous</Button>
              <Button type="button" onClick={() => updateTabState("e", 2)} size="medium" variant="contained" color="primary">Next</Button>
            </Stack>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <div className='jobPanelDiv'>
              <Grid container spacing={2}>
                <Grid size={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="Sent"
                        name='Sent'
                        size='small'
                        value={addCompanyFormik.values.Sent}
                        onChange={addCompanyFormik.handleChange}
                      />
                    } label="Sent" />
                </Grid>
                <Grid size={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="Received"
                        name='Received'
                        size='small'
                        value={addCompanyFormik.values.received}
                        onChange={addCompanyFormik.handleChange}
                      />} label="Received" />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid size={4}>
                  <TextField
                    size='small'
                    id='fee'
                    select
                    name={`fee`}
                    className='mb-2'
                    label='%Fee'
                    onChange={addCompanyFormik.handleChange}
                    value={addCompanyFormik.values.fee}
                    fullWidth
                  >
                    <MenuItem value="1"> 15</MenuItem>
                    <MenuItem value="2"> 16</MenuItem>
                    <MenuItem value="3"> 17</MenuItem>
                    <MenuItem value="4"> 18</MenuItem>
                    <MenuItem value="5"> 19</MenuItem>
                    <MenuItem value="6"> 20</MenuItem>
                    <MenuItem value="7"> 21</MenuItem>
                    <MenuItem value="8"> 22</MenuItem>
                    <MenuItem value="9"> 23</MenuItem>
                    <MenuItem value="10"> 24</MenuItem>
                    <MenuItem value="11"> 25</MenuItem>
                    <MenuItem value="12"> 26</MenuItem>

                  </TextField>
                </Grid>
                <Grid size={4}>
                  <TextField
                    label="Flat Free"
                    id="flatFree"
                    name="FlatFree"
                    size="small"
                    margin="none"
                    onChange={addCompanyFormik.handleChange}
                    value={addCompanyFormik.values.flatFree}
                    fullWidth
                  />
                </Grid>
                <Grid size={4}>
                  <TextField
                    label="Guarantee Information"
                    id="info"
                    name="Info"
                    size="small"
                    margin="none"
                    onChange={addCompanyFormik.handleChange}
                    value={addCompanyFormik.values.guaranteeInformation}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid size={4}>
                  <TextField
                    label="Terms"
                    id="terms"
                    name="Terms"
                    size="small"
                    margin="dense"
                    onChange={addCompanyFormik.handleChange}
                    value={addCompanyFormik.values.terms}
                    fullWidth
                  />
                </Grid>
                <Grid size={4}>
                  <TextField
                    label="Date Establishement"
                    id="de"
                    name="DE"
                    size="small"
                    margin="dense"
                    onChange={addCompanyFormik.handleChange}
                    value={addCompanyFormik.values.dateEstablishement}
                    fullWidth
                  />
                </Grid>
                <Grid size={4}>
                  <TextField
                    label="Expire Date"
                    id="exdate"
                    name="Exdate"
                    size="small"
                    margin="dense"
                    onChange={addCompanyFormik.handleChange}
                    value={addCompanyFormik.values.expireDate}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid size={4}>
                  <TextField
                    size='small'
                    id='contact'
                    select
                    name={`contact`}
                    className='mb-2'
                    label='Primary contact'
                    margin="dense"
                    onChange={addCompanyFormik.handleChange}
                    value={addCompanyFormik.values.primarycontact}
                    fullWidth
                  >
                    <MenuItem value="1"> Mastan vali</MenuItem>
                    <MenuItem value="2"> Vali shaik</MenuItem>
                    <MenuItem value="3"> Aditya kumar</MenuItem>
                    <MenuItem value="4"> sunil</MenuItem>

                  </TextField>
                </Grid>
              </Grid>
            </div>
            <Stack
              direction="row"
              className="customCard px-4 py-2"
              justifyContent="space-between"
              alignItems="center"
              sx={{ minHeight: 'auto !important' }}
            >
              <Button type="button" onClick={() => setValue(1)} size="medium">Previous</Button>
              <Button type="button" color="primary" onClick={() => updateTabState("e", 3)} size="medium" variant="contained">Next</Button>
            </Stack>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <div className='jobPanelDiv'>
              <Grid size={4}>
                <TextField
                  label="MSP"
                  id="msp"
                  name="msp"
                  size="small"
                  margin="dense"
                  onChange={addCompanyFormik.handleChange}
                  value={addCompanyFormik.values.mspProgram}
                  fullWidth
                />
              </Grid>
            </div>
            <Stack
              direction="row"
              className="customCard px-4 py-2"
              justifyContent="space-between"
              alignItems="center"
              sx={{ minHeight: 'auto !important' }}
            >
              <Button type="button" onClick={() => setValue(2)} size="medium">Previous</Button>
              <Button type="button" onClick={() => updateTabState("e", 4)} size="medium" variant="contained" color="primary">Next</Button>
            </Stack>

          </CustomTabPanel>
          <CustomTabPanel value={value} index={4}>
            <div className='jobPanelDiv'>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      id="create1"
                      name='create1'
                      size='small'
                      value={addCompanyFormik.values.create1}
                      onChange={addCompanyFormik.handleChange}
                    />} label="Create email notification when a new is created" />
                <FormControlLabel
                  control={
                    <Checkbox
                      id="create2"
                      name='create2'
                      size='small'
                      value={addCompanyFormik.values.create2}
                      onChange={addCompanyFormik.handleChange}
                    />} label="Create email notification when there is a status update on the job" />
              </FormGroup>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Send Email to</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel value="allUsers"
                    control={
                      <Radio
                        id="allUsers"
                        name='users'
                        size='small'
                        value={addCompanyFormik.values.allUsers}
                        onChange={addCompanyFormik.handleChange} />
                    } label="All Users" />
                  <FormControlLabel value="customUsers"
                    control={
                      <Radio
                        id="customUsers"
                        name='users'
                        size='small'
                        value={addCompanyFormik.values.customUsers}
                        onChange={addCompanyFormik.handleChange}
                      />
                    } label="Custom Users" />
                </RadioGroup>
              </FormControl>
            </div>

            <Stack
              direction="row"
              className="customCard px-4 py-2"
              justifyContent="space-between"
              alignItems="center"
              sx={{ minHeight: 'auto !important' }}
            >
              <Button type="button" onClick={() => setValue(3)} size="medium">Previous</Button>
              <Button type="button" onClick={() => updateTabState("e", 5)} size="medium" variant="contained" color="primary">Next</Button>
            </Stack>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={5}>
            <div className='jobPanelDiv'>
              <label htmlFor="title">Comments </label>
              <br />
              <TextareaAutosize
                aria-label="minimum height"
                minRows={8}
                // placeholder="Minimum 3 rows"
                style={{ width: '100%' }}
              />
            </div>
            <Stack
              direction="row"
              className="customCard px-4 py-2"
              justifyContent="space-between"
              alignItems="center"
              sx={{ minHeight: 'auto !important' }}
            >
              <Button type="button" onClick={() => setValue(4)} size="medium">Previous</Button>
              <Button type="submit" size="medium" variant="contained" color="primary" onClick={saveForm}>Save</Button>
            </Stack>
          </CustomTabPanel>
        </Box>
      </form>
    </Grid>
  );
}

export default MainDetails;

