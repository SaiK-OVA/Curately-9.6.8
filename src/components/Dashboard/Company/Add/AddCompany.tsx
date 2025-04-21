import Box from "@mui/material/Box";
import React, { useState, Fragment } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import TextareaAutosize from '@mui/base/TextareaAutosize';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useFormik } from 'formik';
import * as Yup from "yup";
import Radio from '@mui/material/Radio';
import FormGroup from '@mui/material/FormGroup';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Divider from '@mui/material/Divider';
import { showToaster } from '../../../shared/SnackBar/SnackBar';
import ErrorMessage from '../../../shared/Error/ErrorMessage';
import ApiService from '../../../../shared/api/api';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { trackPromise } from 'react-promise-tracker';
import { Autocomplete, DialogActions, Stack, Typography } from "@mui/material";
import { MUIAutoComplete } from "../../../shared/MUIAutoComplete/MUIAutoComplete";
import './AddCompany.scss';
import { Height } from "@mui/icons-material";

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
      className='addJobTabsPanel customTabsPanel mx-0'
    >
      {value === index && (
        <div>{children}</div>
      )}
    </div>
  );
}


const AddCompany = (
  { open, closePopup, add, companyData }: {
    open: boolean;
    closePopup: () => void;
    add: boolean,
    companyData: any;
  }
) => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const jobCategoryList = [
    { title: 'Accounting/Auditing', value: '17' },
    { title: 'Administrative', value: '18' },
    { title: 'Aerospace', value: '22' },
    { title: 'Agriculture', value: '24' },
    { title: 'Architectural', value: '25' },
    { title: 'Automotive', value: '27' },
    { title: 'Banking', value: '28' },
    { title: 'Biotechnology', value: '29' },
    { title: 'Business Development', value: '77' },
    { title: 'Call Center', value: '37' },
    { title: 'Computers, Hardware', value: '31' },
    { title: 'Computers, Other', value: '76' },
    { title: 'Computers, Software', value: '32' },
    { title: 'Construction', value: '33' },
    { title: 'Consulting', value: '34' },
    { title: 'Consumer Goods', value: '46' },
    { title: 'Customer Service', value: '36' },
    { title: 'Defense', value: '23' },
    { title: 'Engineering', value: '39' },
    { title: 'Engineering - Aerospace', value: '78' },
    { title: 'Engineering - Biomedical', value: '79' },
    { title: 'Engineering - Chemical', value: '80' },
    { title: 'Engineering - Civil', value: '81' },
    { title: 'Engineering - Computer', value: '82' },
    { title: 'Engineering - Electrical', value: '83' },
    { title: 'Engineering - Industrial', value: '84' },
    { title: 'Engineering - Mechanical', value: '85' },
    { title: 'Engineering - Mineral', value: '86' },
    { title: 'Entertainment', value: '26' },
    { title: 'Environmental', value: '87' },
    { title: 'Executive Management', value: '40' },
    { title: 'Finance/Economics', value: '41' },
    { title: 'Financial Services', value: '42' },
    { title: 'General Office', value: '88' },
    { title: 'Government and Policy', value: '43' },
    { title: 'Healthcare - Dental', value: '49' },
    { title: 'Healthcare - IT Informatics', value: '47' },
    { title: 'Healthcare - Laboratory Services', value: '45' },
    { title: 'Healthcare - LPNs', value: '44' },
    { title: 'Healthcare - Medical', value: '48' },
    { title: 'Healthcare - Other', value: '50' },
    { title: 'Healthcare - Pharmacy', value: '51' },
    { title: 'Healthcare - Radiology/Imaging', value: '52' },
    { title: 'Healthcare - RNs', value: '53' },
    { title: 'Healthcare - Social Services', value: '54' },
    { title: 'Healthcare - Support Services', value: '55' },
    { title: 'Healthcare - Therapy/Rehab', value: '56' },
    { title: 'Hospitality/Tourism', value: '57' },
    { title: 'Hotel/Resort', value: '89' },
    { title: 'Human Resources', value: '58' },
    { title: 'Import/Export', value: '90' },
    { title: 'Information Technology', value: '59' },
    { title: 'Insurance', value: '60' },
    { title: 'Internet/E-Commerce', value: '61' },
    { title: 'Law Enforcement & Security', value: '62' },
    { title: 'Legal', value: '63' },
    { title: 'Manufacturing', value: '64' },
    { title: 'Marketing', value: '20' },
    { title: 'Merchandising', value: '91' },
    { title: 'Military', value: '65' },
    { title: 'Nonprofit', value: '66' },
    { title: 'Oil/Gas/Utilities', value: '67' },
    { title: 'Pharmaceutical', value: '30' },
    { title: 'Professional Services', value: '101' },
    { title: 'Project Management', value: '92' },
    { title: 'Property Management', value: '93' },
    { title: 'Public Relations', value: '21' },
    { title: 'Publishing/Printing', value: '68' },
    { title: 'Quality Control', value: '94' },
    { title: 'Real Estate', value: '95' },
    { title: 'Real Estate', value: '69' },
    { title: 'Research', value: '96' },
    { title: 'Restaurant & Food Service', value: '70' },
    { title: 'Retail/Wholesale', value: '71' },
    { title: 'Sales', value: '72' },
    { title: 'Skilled Trades', value: '97' },
    { title: 'Sports and Recreation', value: '73' },
    { title: 'Technical Writing', value: '98' },
    { title: 'Technician/Technologist', value: '99' },
    { title: 'Telecommunications', value: '74' },
    { title: 'Telecom / Network Technician', value: '104' },
    { title: 'Training', value: '38' },
    { title: 'Transportation', value: '75' },
    { title: 'Writing/Reporting', value: '100' },
    { title: 'Industrial', value: '102' },
    { title: 'Scientific', value: '103' },
  ];


  const initialAddCompanyDetails = companyData.companyId ? companyData : {
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
    "chkNotf1": '',
    "chkNotf2": '',
    "chkNotf3": '',
    "rdNotf1": '',
    "rdNotf2": '',
    "NotfCat1": '',
    "NotfCat2": '',
    "NotfState1": '',
    "NotfRecr1": ''

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
    "chkNotf1": Yup.boolean(),
    "chkNotf2": Yup.boolean(),
    "chkNotf3": Yup.boolean(),
    "rdNotf1": Yup.boolean(),
    "rdNotf2": Yup.boolean(),
    "NotfCat1": Yup.string(),
    "NotfCat2": Yup.string(),
    "NotfState1": Yup.string(),
    "NotfRecr1": Yup.string()


  });

  // "companyName"
  // "ownerName"
  // "mainPhone"
  // "alternativePhone1"
  // "alternativePhone2"
  // "fax"
  // "mainCompnay"
  // "jobsWebsite"
  // "streetAddress"
  // "streetAddress1"
  // "city"
  // "state"
  // "postalCode"
  // "country"
  // "region"
  // "active"
  // "pipelineStatus"
  // "industry"
  // "sic"
  // "started"
  // "bulk"
  // "employees"
  // "revenue"
  // "exchange"
  // "symbol"
  // "Sent"
  // "received"
  // "fee"
  // "flatFree"
  // "guaranteeInformation"
  // "terms"
  // "dateEstablishement"
  // "expireDate"
  // "primarycontact"
  // "txtRqrd"
  // "txtVMSWeb"
  // "txtUsername"
  // "txtPassword"
  // "txtComments"
  // "description"
  // "chkNotf1"
  // "chkNotf2"
  // "rdNotf1"
  // "rdNotf2"
  // "NotfCat1"
  // "chkNotf3"
  // "NotfRecr1"
  // "NotfCat2"
  // "chkNotf4"
  // "NotfRecr2"
  // "NotfCat3"
  // "chkNotf5"
  // "NotfRecr3"
  // "NotfCat4"
  // "userAgency"

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
        }))

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

  const [tabState, settabState] = useState([false, false, false, false, false, false]);
  const [selectedRadio, setSelectedRadio] = useState('');

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRadio(event.target.value);
    addCompanyFormik.handleChange(event);
  };
  const checkValidations = (i: number) => {
    if (i === 1 || tabState[0] !== true) {
      if (!addCompanyFormik.values.companyName || !addCompanyFormik.values.ownerName || !addCompanyFormik.values.mainCompnay) {
        return false
      }
    }
    return true
  }
  const updateTabState = (event: any, newValue: any) => {
    if (checkValidations(newValue)) {
      const diff = newValue - value;
      if (diff !== 1) {
        for (let i = value; i <= diff; i++) {
          let tempTabState = tabState;
          tempTabState[i] = true;
          settabState({
            ...tempTabState
          })
        }
      } else if (newValue > 0) {
        let tempTabState = tabState;
        tempTabState[newValue - 1] = true;
        settabState({
          ...tempTabState
        })
      }
      setValue(newValue);
      setIsFormSubmitted(false);
    } else {
      setIsFormSubmitted(true);
    }
  };
  return (
    (<Dialog
      maxWidth={'lg'}
      // sx={{ width: 900, maxWidth: 900, minWidth: 900 }}
      fullWidth={true} open={open} className='AddCompanyModal'
      id='addCompany'
    >
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
            {add ? "Add" : "Edit"} Company
          </span>
          <div>
            <Grid
              container
              direction="row"
              justifyContent="end"
              alignItems="center"
            >
              {/* <CloseIcon /> onClick={() => closePopup()}  */}
              <Button variant="text"
                type='button'
                color="secondary"
                className='mr-2'
                onClick={closePopup}
              >Cancel</Button>
              <Button variant="text"
                type='button'
                color="primary"
                onClick={saveForm}
                disabled={(value !== 5)}
              >{add ? "Save" : "Update"} Company</Button>
            </Grid>
          </div>
        </Grid>
      </DialogTitle>
      <Divider />
      <DialogContent className=''>
        <form onSubmit={addCompanyFormik.handleSubmit}>
          {/* <span className='addHeader pl-3'>Add New Company</span>
          <Divider className='mt-3' /> */}
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
          </Box>
          <Box className='pt-5 pb-3'>
            <CustomTabPanel value={value} index={0}>

              <div className='jobPanelDiv'>
                <Grid container spacing={2}>
                  <Grid size={4}>
                    <TextField
                      label={
                        <Fragment>
                          CompanyName<span style={{ color: 'red' }}>*</span>
                        </Fragment>
                      }
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

                  <Grid className="mt-2" size={4}>
                    <MUIAutoComplete
                      id='ownerName'
                      handleChange={(id: any, name: string) => {
                        addCompanyFormik.setFieldValue('ownerName', id);
                      }}
                      valuePassed={{}}
                      isMultiple={false}
                      width="100%"
                      type='userName'
                      placeholder={
                        <Fragment>
                          Select Owner Name
                          <span style={{ color: 'red' }}>*</span>
                        </Fragment>
                      }
                    />

                    {/* <TextField
                      size='small'
                      id='ownerName'
                      name="ownerName"
                      select
                      className='mb-2'
                      label='Owner'
                      margin="dense"
                      onChange={addCompanyFormik.handleChange}
                      value={addCompanyFormik.values.ownerName}
                      fullWidth
                    >
                      <MenuItem value="1893"> Aditya kumar</MenuItem>
                    </TextField> */}
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
                      label={
                        <Fragment>
                          Main Compnay Website<span style={{ color: 'red' }}>*</span>
                        </Fragment>
                      }
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
              {/* <Grid className="customCard"
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                sx={{ minHeight: 'auto !important' }}
              >
                <Button type="button" className='btnPrimary' onClick={() => updateTabState("e", 1)} size="medium" variant="contained">Next</Button>
              </Grid> */}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <div className='jobPanelDiv'>
                <Grid container spacing={4}>
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
                <Grid container spacing={4}>
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
                <Grid container spacing={4}>
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
                <Grid container spacing={4}>
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
              {/* <Stack
                direction="row"
                className="customCard px-4 py-2"
                justifyContent="space-between"
                alignItems="center"
                sx={{ minHeight: 'auto !important' }}
              >
                <Button type="button" onClick={() => setValue(0)} size="medium">Previous</Button>
                <Button type="button" onClick={() => updateTabState("e", 2)} size="medium" variant="contained" className='btnPrimary'>Next</Button>
              </Stack> */}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <div className='jobPanelDiv'>
                <Grid container spacing={4}>
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
                <Grid container spacing={4}>
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
                <Grid container spacing={4}>
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
                <Grid container spacing={4}>
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
              {/* <Stack
                direction="row"
                className="customCard px-4 py-2"
                justifyContent="space-between"
                alignItems="center"
                sx={{ minHeight: 'auto !important' }}
              >
                <Button type="button" onClick={() => setValue(1)} size="medium">Previous</Button>
                <Button type="button" className='btnPrimary' onClick={() => updateTabState("e", 3)} size="medium" variant="contained">Next</Button>
              </Stack> */}
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
              {/* <Stack
                direction="row"
                className="customCard px-4 py-2"
                justifyContent="space-between"
                alignItems="center"
                sx={{ minHeight: 'auto !important' }}
              >
                <Button type="button" onClick={() => setValue(2)} size="medium">Previous</Button>
                <Button type="button" onClick={() => updateTabState("e", 4)} size="medium" variant="contained" className='btnPrimary'>Next</Button>
              </Stack> */}

            </CustomTabPanel>
            <CustomTabPanel value={value} index={4}>
              <div className='jobPanelDiv'>
                <Typography variant="h6">Alerts and notification</Typography>
                <FormGroup>

                  <FormControlLabel
                    control={
                      <Checkbox
                        id="chkNotf1"
                        name='chkNotf1'
                        size='small'
                        value={addCompanyFormik.values.chkNotf1}
                        onChange={addCompanyFormik.handleChange}

                      />
                    }
                    label="Create email notification when a new Job is created"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="chkNotf2"
                        name='chkNotf2'
                        size='small'
                        value={addCompanyFormik.values.chkNotf2}
                        onChange={addCompanyFormik.handleChange}

                      />
                    }
                    label="Create email notification when there is a status update on the job"
                  />
                </FormGroup>
                <Typography variant="h6">Email Notification rules</Typography>
                <FormControl>
                  <RadioGroup
                    aria-label="users"
                    name="users"
                    onChange={handleRadioChange}

                  >

                    <FormControl >

                      <FormControlLabel
                        value="Basic"
                        control={<Radio size='small'
                          id="rdNotf1"
                          name="rdNotf1"

                          value={addCompanyFormik.values.rdNotf1}
                          onChange={addCompanyFormik.handleChange}
                        />}
                        label="Basic"
                      />
                      <FormControl >
                        <Stack sx={{ marginLeft: '50px' }}>
                          <RadioGroup
                            aria-label="-users"
                            name="basic-users-group"



                          >
                            <FormControlLabel
                              value="allUsers"
                              control={<Radio
                                size='small'
                                id="rdNotf2"
                                name="rdNotf2"

                                value={addCompanyFormik.values.rdNotf2}
                                onChange={addCompanyFormik.handleChange}
                                disabled={selectedRadio === 'Advanced'} />}
                              label="Send email to all users for all jobs"


                            />
                            <Stack direction="row" spacing='2'>
                              <Stack >
                                <FormControlLabel
                                  value="cutomUsers"

                                  control={<Radio
                                    size='small'
                                    id="rdNotf3"
                                    name="rdNotf3"

                                    value={addCompanyFormik.values.rdNotf3}
                                    onChange={addCompanyFormik.handleChange}
                                    disabled={selectedRadio === 'Advanced'}
                                  />}
                                  label="Send email to all users for jobs with job category"


                                />
                              </Stack>
                              <Stack>
                                <TextField

                                  value={addCompanyFormik.values.NotfCat1}
                                  select
                                  size="small"
                                  sx={{ width: '180px' }}
                                // onChange={(e) => handleFilterData(e.target.value, "jobCategory")}
                                //onKeyUp={handleKey}
                                >
                                  <MenuItem value="" disabled>select job category...</MenuItem>
                                  {jobCategoryList.map((option: any, i: number) => (
                                    <MenuItem key={i} value={option.value}>{option.title}</MenuItem>
                                  ))}
                                </TextField>
                              </Stack>

                            </Stack>

                          </RadioGroup>

                        </Stack>
                      </FormControl>




                    </FormControl>

                    <FormControl >

                      <FormControlLabel
                        value="Advanced"

                        control={<Radio size='small'
                          id="rdNotfAdv"
                          name="rdNotfAdv"

                          value={addCompanyFormik.values.rdNotfAdv}
                          onChange={addCompanyFormik.handleChange} />}
                        label="Advanced"
                      />
                      <FormControl>
                        <Stack direction="row" sx={{ marginLeft: '50px' }}>
                          <Stack direction="row">
                            <FormControlLabel

                              control={<Checkbox
                                id="chkNotf3"
                                name='chkNotf3'
                                size='small'
                                value={addCompanyFormik.values.chkNotf3}
                                onChange={addCompanyFormik.handleChange}
                                disabled={selectedRadio === 'Basic'}
                              />}
                              label="Send email to"
                            />


                            <MUIAutoComplete
                              id='NotfRecr1'

                              handleChange={(id: any, name: string) => {
                                addCompanyFormik.setFieldValue('NotfRecr1', id);
                              }}
                              valuePassed={{}}
                              isMultiple={false}

                              width="200px"
                              type='email'
                              placeholder=""

                            />
                          </Stack>

                          <Stack direction="row">
                            <FormControlLabel
                              value="test"
                              label="for jobs with Job category"
                              labelPlacement="start"

                              control={<div style={{ marginLeft: '10px', marginRight: '10px' }}>

                                <TextField

                                  // value={searchData.jobCategory}
                                  select
                                  size="small"
                                  sx={{ width: '180px' }}
                                // onChange={(e) => handleFilterData(e.target.value, "jobCategory")}
                                //onKeyUp={handleKey}
                                >
                                  <MenuItem value="" disabled>select job category...</MenuItem>
                                  {jobCategoryList.map((option: any, i: number) => (
                                    <MenuItem key={i} value={option.value}>{option.title}</MenuItem>
                                  ))}
                                </TextField>

                              </div>}

                            />
                          </Stack>
                          <Stack>
                            <FormControlLabel
                              value="test"
                              label="Job states"
                              labelPlacement="start"

                              control={<div style={{ marginLeft: '10px' }}><MUIAutoComplete
                                id="NotfState1"
                                handleChange={(id: any, name: string) => {
                                  addCompanyFormik.setFieldValue("NotfState1", id);
                                }}
                                valuePassed={{}}
                                isMultiple={false}
                                width="200px"
                                type='states'
                                placeholder=""
                              />
                              </div>}


                            />
                          </Stack>








                        </Stack>
                      </FormControl>


                    </FormControl>





                    {/* <RadioGroup
                      aria-label="advanced-users"
                      name="advanced-users"
                      value={addCompanyFormik.values.advancedUsers}
                      onChange={addCompanyFormik.handleChange}
                    >
                      <FormControlLabel
                        value="test"
                        control={<Radio size='small' />}
                        label="All Users"
                      />
                      <FormControlLabel
                        value="test2"
                        control={<Radio size='small' />}
                        label="Custom Users"
                      />
                    </RadioGroup> */}

                  </RadioGroup>

                </FormControl>
              </div>


              {/* <Stack
                direction="row"
                className="customCard px-4 py-2"
                justifyContent="space-between"
                alignItems="center"
                sx={{ minHeight: 'auto !important' }}
              >
                <Button type="button" onClick={() => setValue(3)} size="medium">Previous</Button>
                <Button type="button" onClick={() => updateTabState("e", 5)} size="medium" variant="contained" className='btnPrimary'>Next</Button>
              </Stack> */}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={5}>
              <div className='jobPanelDiv'>
                <label htmlFor="title">Comments </label>
                <br />
                <TextField
                  multiline
                  aria-label="minimum height"
                  minRows={8}
                  // placeholder="Minimum 3 rows"
                  style={{ width: '100%' }}
                />
              </div>
              {/* <Stack
                direction="row"
                className="customCard px-4 py-2"
                justifyContent="space-between"
                alignItems="center"
                sx={{ minHeight: 'auto !important' }}
              >
                <Button type="button" onClick={() => setValue(4)} size="medium">Previous</Button>
                <Button type="submit" size="medium" variant="contained" className='btnPrimary' onClick={saveForm}>Save</Button>
              </Stack> */}
            </CustomTabPanel>
          </Box>
        </form>
      </DialogContent >
      <Divider />
      <DialogActions>
        <Grid
          container
          direction="row"
          justifyContent={`${(value === 0) ? 'flex-end' : (value === 5) ? 'flex-start' : 'space-between'}`}
          // sx={{ minHeight: 'auto !important' }}
          alignItems="center"
          className="px-4"
        >
          <Button type="button" color="secondary" className={`${value !== 0 ? '' : 'v-hidden'}`} onClick={() => setValue(value - 1)} size="medium">Previous</Button>

          <Button type="button" color="primary" className={`${value !== 5 ? '' : 'v-hidden'}`} onClick={() => updateTabState("e", value + 1)} size="medium" variant="contained">Next</Button>
        </Grid>
      </DialogActions>
    </Dialog>)
  );
}

export default AddCompany;
