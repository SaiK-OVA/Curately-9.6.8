import {Grid, Button} from '../../../../shared/modules/commonImports';
import {Stack} from '../../../../shared/modules/MaterialImports/Stack';
import {TextField, FormControlLabel, FormControl} from '../../../../shared/modules/MaterialImports/FormInputs';
import {MenuItem} from '../../../../shared/modules/MaterialImports/Menu';
import {Radio, RadioGroup} from '../../../../shared/modules/MaterialImports/FormElements';
import {Divider} from '../../../../shared/modules/MaterialImports/Divider';
import { useFormik,  Yup } from "../../../../shared/modules/Formik";

import './ListJob1.scss';



const ListJob = () => {
    const initialListJobDetails = {
        accuickJobID: "",
        searchString: "",
        clientJobID: "",
        jobTitle: "",
        firstName: "",
        lastName: "",
        jobStatus: "",
        recruiter: "",
        companyName: "",
        accountManager: "",
        jobCategory: "",
        from: "",
        to: "",
        city: "",
        select: "",
        zipcode: "",
        zip: "",
        maximumReturn: "",
    };

    const onSubmit = (values: any) => {
        if (values.accuickJobID === "" && values.searchString === "" && values.clientJobID === "" && values.email === "" && values.jobTitle === "" && values.firstName === "" && values.lastName === "" && values.jobStatus === "" && values.recruiter === "" && values.companyName === "" && values.accountManager === "" && values.jobCategory === "" && values.from === "" && values.to === "" && values.city === "" && values.select === "" && values.zipcode === "" && values.zip === "") {
            // console.log('You must enter some criteria to Search');
        }
        else {
            // console.log(values);
        }
    }

    const listjobSchema = Yup.object().shape({
        accuickJobID: Yup.string(),
        searchString: Yup.string(),
        clientJobID: Yup.string(),
        jobTitle: Yup.string(),
        firstName: Yup.string(),
        lastName: Yup.string(),
        jobStatus: Yup.string(),
        recruiter: Yup.string(),
        companyName: Yup.string(),
        accountManager: Yup.string(),
        jobCategory: Yup.string(),
        from: Yup.string(),
        to: Yup.string(),
        city: Yup.string(),
        select: Yup.string(),
        zipcode: Yup.string(),
        zip: Yup.string(),
        maximumReturn: Yup.string(),
    });



    const listjobFormik = useFormik({
        initialValues: initialListJobDetails,
        validationSchema: listjobSchema,
        onSubmit,
    });
    return (
        <>
            <div>
                <form
                    onSubmit={listjobFormik.handleSubmit}
                >
                    <Stack>
                        <Grid container spacing={2}
                            direction="row"
                            justifyContent="center"
                            alignItems="center">
                            <Grid>
                                <h1 className='header'>Jobs Search</h1>
                                <Divider />
                                <Grid size={12}>
                                    <label className='styles'>Local Job ID:</label>
                                    <TextField size="small" style={{ marginTop: '2px' }} variant="outlined" id="accuickJobID"
                                        name="accuickJobID"
                                        value={listjobFormik.values.accuickJobID}
                                        onChange={listjobFormik.handleChange}
                                    />
                                    <label className='styles'>Search String :</label>
                                    <textarea style={{ marginTop: '2px' }} id="searchString"
                                        name="searchString"
                                        value={listjobFormik.values.searchString}
                                        onChange={listjobFormik.handleChange}></textarea>
                                </Grid>
                                <Grid size={12}>
                                    <label className='styles'>Client Job ID:</label>
                                    <TextField size="small" variant="outlined" id="clientJobID"
                                        name="clientJobID"
                                        value={listjobFormik.values.clientJobID}
                                        onChange={listjobFormik.handleChange} />
                                    <label className='styles'>Job Title :</label>
                                    <TextField size="small" variant="outlined" id="jobTitle"
                                        name="jobTitle"
                                        value={listjobFormik.values.jobTitle}
                                        onChange={listjobFormik.handleChange} />
                                </Grid>
                                <Grid size={12}>
                                    <label className='styles'>Hiring Manager:</label>
                                    <TextField size="small" label="First Name" style={{ width: '100px', marginRight: '5px' }} variant="outlined" id="firstName"
                                        name="firstName"
                                        value={listjobFormik.values.firstName}
                                        onChange={listjobFormik.handleChange} />

                                    <TextField size="small" label="Last Name" style={{ width: '100px', marginRight: '10px' }} variant="outlined" id="lastName"
                                        name="lastName"
                                        value={listjobFormik.values.lastName}
                                        onChange={listjobFormik.handleChange} />
                                    <TextField style={{ marginLeft: '105px' }} className='styles'
                                        size="small" variant="outlined"
                                        select
                                        id="jobStatus"
                                        label="Job Status:"
                                        name="jobStatus"
                                        value={listjobFormik.values.jobStatus}
                                        onChange={listjobFormik.handleChange}>
                                        <MenuItem value="Open">Open</MenuItem>
                                        <MenuItem value="Halted">Halted</MenuItem>
                                        <MenuItem value="Closed">Closed</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid size={12}>
                                    <TextField className='styles' style={{ width: '150px', marginRight: '10px' }} size="small" variant="outlined"
                                        select
                                        id="recruiter"
                                        label="Recruiter:"
                                        name="recruiter"
                                        value={listjobFormik.values.recruiter}
                                        onChange={listjobFormik.handleChange}>
                                        <MenuItem value="none">none</MenuItem>
                                        <MenuItem value="Aakash Kumar">Aakash Kumar</MenuItem>
                                        <MenuItem value="Aarita Joseph">Aarita Joseph</MenuItem>
                                    </TextField>
                                    <label className='styles' style={{ marginLeft: '155px' }}>Company Name:</label>
                                    <TextField size="small" variant="outlined" id="companyName"
                                        name="companyName"
                                        value={listjobFormik.values.companyName}
                                        onChange={listjobFormik.handleChange} />
                                </Grid>
                                <Grid size={12}>
                                    <TextField className='styles' style={{ width: '150px', marginRight: '10px' }} size="small" variant="outlined"
                                        select
                                        id="accountManager"
                                        label="Account Manager:"
                                        name="accountManager"
                                        value={listjobFormik.values.accountManager}
                                        onChange={listjobFormik.handleChange}>
                                        <MenuItem value="none">none</MenuItem>
                                        <MenuItem value="Aakash Kumar">Aakash Kumar</MenuItem>
                                        <MenuItem value="Aarita Joseph">Aarita Joseph</MenuItem>
                                    </TextField>

                                    <TextField className='styles' style={{ marginLeft: '155px' }}
                                        size="small" variant="outlined"
                                        select
                                        id="jobCategory"
                                        label="Job Category:"
                                        name="jobCategory"
                                        value={listjobFormik.values.jobCategory}
                                        onChange={listjobFormik.handleChange}>
                                        <MenuItem value="Accounting Finance">Accounting Finance</MenuItem>
                                        <MenuItem value="Call Center">Call Center</MenuItem>
                                        <MenuItem value="Clinical">Clinical</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid size={12}>
                                    <label className='styles'>Job Created Date:</label>
                                    <TextField size="small" style={{ width: '90px', marginRight: '10px' }} label="From" variant="outlined" id="from"
                                        name="from"
                                        value={listjobFormik.values.from}
                                        onChange={listjobFormik.handleChange} />
                                    <TextField size="small" style={{ width: '90px', marginRight: '10px' }} label="To" variant="outlined" id="to"
                                        name="to"
                                        value={listjobFormik.values.to}
                                        onChange={listjobFormik.handleChange} />
                                </Grid>
                                <Grid size={12}>
                                    <label className='styles'>Location:</label>
                                    <TextField size="small" style={{ width: '90px', marginRight: '10px' }} label="City" variant="outlined" id="city"
                                        name="city"
                                        value={listjobFormik.values.city}
                                        onChange={listjobFormik.handleChange} />
                                    <FormControl>
                                        <TextField style={{ width: '90px', marginRight: '10px' }} size="small"
                                            select
                                            label="Select" id="select"
                                            name="select"
                                            value={listjobFormik.values.select}
                                            onChange={listjobFormik.handleChange}>
                                            <MenuItem value="Select State">Select State</MenuItem>
                                            <MenuItem value="Alabama">Alabama</MenuItem>
                                            <MenuItem value="Alaska">Alaska</MenuItem>
                                        </TextField>
                                    </FormControl>
                                    <TextField size="small" style={{ width: '90px', marginRight: '10px', marginLeft: '270px' }} variant="outlined" label="Zipcode" id="zipcode"
                                        name="zipcode"
                                        value={listjobFormik.values.zipcode}
                                        onChange={listjobFormik.handleChange} />
                                    <TextField
                                        select
                                        style={{ width: '90px', marginRight: '10px' }} size="small" id="zip"
                                        label="10"
                                        name="zip"
                                        value={listjobFormik.values.zip}
                                        onChange={listjobFormik.handleChange}>
                                        <MenuItem value="10">10</MenuItem>
                                        <MenuItem value="50">50</MenuItem>
                                        <MenuItem value="100">100</MenuItem>
                                        <MenuItem value="200">200</MenuItem>
                                        <MenuItem value="500">500</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid size={12}>
                                    <label className='styles'>Maximum Return:</label>
                                    <TextField style={{ width: '150px' }} size="small"
                                        select
                                        label="Select" id="maximumReturn"

                                        name="maximumReturn"
                                        value={listjobFormik.values.maximumReturn}
                                        onChange={listjobFormik.handleChange}>
                                        <MenuItem value="10">10</MenuItem>
                                        <MenuItem value="50">50</MenuItem>
                                        <MenuItem value="100">100</MenuItem>
                                        <MenuItem value="200">200</MenuItem>
                                        <MenuItem value="500">500</MenuItem>
                                    </TextField>
                                    <label style={{ marginLeft: '185px', fontWeight: 'bold' }}>Display From :</label>
                                    <FormControl>
                                        <RadioGroup row>
                                            <FormControlLabel value="JQuery" control={<Radio />} label="JQuery" />
                                            <FormControlLabel value="Telerik" control={<Radio />} label="Telerik" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="flex-end"
                                    alignItems="flex-start"
                                >
                                    <Button variant="contained" className='search' type='submit'>Search</Button>
                                    <Button variant="contained" className='reset' type='submit'>Reset</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Stack>
                </form>
            </div>
        </>
    );
}

export default ListJob;