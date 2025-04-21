// import React, { useState } from 'react';
import { useState } from '../../../../../shared/modules/React';
import {Box} from "../../../../../shared/modules/MaterialImports/Box";
import {Grid, Button} from "../../../../../shared/modules/commonImports";
import {TextField, FormControlLabel} from '../../../../../shared/modules/MaterialImports/FormInputs';
import {Checkbox} from "../../../../../shared/modules/MaterialImports/FormElements";
import {Card, CardContent} from '../../../../../shared/modules/MaterialImports/Card';
import {ToggleButton, ToggleButtonGroup} from '../../../../../shared/modules/MaterialImports/ToggleButton';
import { useFormik, Yup } from '../../../../../shared/modules/Formik';
import ErrorMessage from '../../../../shared/Error/ErrorMessage';
import './AddCandidate.scss'

const AddCandidate = () => {
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const initialAddCandidateDetails = {
        "firstName": "",
        "lastName": "",
        "email": "",
        "phone": "",
        "source": "",
        "title": "",
        "skills": "",
        "address": "",
        "apt": "",
        "city": "",
        "state": "",
        "country": "",
        "ZipCode": "",
        "availableNow": "",
        "availableSoon": "",
        "passivelyLooking": "",
        "notLooking": "",
        "partTimeContract": "",
        "fullTimeContract": "",
        "fullTimeEmployment": "",
        "freelancer": "",
        "remote": "",
        "atOffice": "",
        "hybrid": "",
        "notSure": "",
        "authorized": "",
        "notAuthorized": "",
        "visa": "",
        "noVisa": "",
        "perHour": "",
        "compensation": "",
    }
    const addCandidateSchema = Yup.object().shape({
        "firstName": Yup.string(),
        "lastName": Yup.string(),
        "email": Yup.string().email('Invalid email format'),
        "phone": Yup.string(),
        "source": Yup.string(),
        "title": Yup.string(),
        "skills": Yup.string(),
        "address": Yup.string(),
        "apt": Yup.string(),
        "city": Yup.string(),
        "state": Yup.string(),
        "country": Yup.string(),
        "ZipCode": Yup.string(),
        "availableNow": Yup.boolean(),
        "availableSoon": Yup.boolean(),
        "passivelyLooking": Yup.boolean(),
        "notLooking": Yup.boolean(),
        "partTimeContract": Yup.boolean(),
        "fullTimeContract": Yup.boolean(),
        "fullTimeEmployment": Yup.boolean(),
        "freelancer": Yup.boolean(),
        "remote": Yup.boolean(),
        "atOffice": Yup.boolean(),
        "hybrid": Yup.boolean(),
        "notSure": Yup.boolean(),
        "authorized": Yup.boolean(),
        "notAuthorized": Yup.boolean(),
        "visa": Yup.boolean(),
        "noVisa": Yup.boolean(),
        "perHour": Yup.string(),
        "compensation": Yup.boolean(),
    });
    const addCandidateFormik = useFormik({
        initialValues: initialAddCandidateDetails,
        validationSchema: addCandidateSchema,
        onSubmit: () => {
            candidate();
        },
    });
    const candidate = () => {
        setIsFormSubmitted(true);
        console.log(addCandidateFormik.values);
    }
    return (
        <div>
            <div id="addApplicants">
                <form>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <h3 style={{ marginRight: '570px' }}>Add a Candidate</h3>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="start"
                    >
                        <Card className='customCard' sx={{ width: '700px !important' }}>
                            <CardContent>
                                <Grid container spacing={2} className='mb-2'>
                                    <Grid size={6} className='mb-1'>
                                        <label className='inputLabel'>First Name</label>
                                        <TextField fullWidth className='mt-1'
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            id="firstName"
                                            name="firstName"
                                            value={addCandidateFormik.values.firstName}
                                            onChange={addCandidateFormik.handleChange}
                                        />
                                    </Grid>
                                    <Grid size={6}>
                                        <label className='inputLabel'>Last Name</label>
                                        <TextField fullWidth className='mt-1'
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            id="lastName"
                                            name="lastName"
                                            value={addCandidateFormik.values.lastName}
                                            onChange={addCandidateFormik.handleChange}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} className='mb-2'>
                                    <Grid size={6} className='mb-1'>
                                        <label className='inputLabel'>Email</label>
                                        <TextField fullWidth className='mt-1'
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            id="email"
                                            name="email"
                                            value={addCandidateFormik.values.email}
                                            onChange={addCandidateFormik.handleChange}
                                            error={(addCandidateFormik.errors.email && isFormSubmitted) ? true : false}
                                        />
                                        <ErrorMessage formikObj={addCandidateFormik} name={'email'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                    </Grid>
                                    <Grid size={6}>
                                        <label className='inputLabel'>Phone</label>
                                        <TextField fullWidth className='mt-1'
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            id="phone"
                                            name="phone"
                                            value={addCandidateFormik.values.phone}
                                            onChange={addCandidateFormik.handleChange}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} className='mb-2'>
                                    <Grid size={6} className='mb-1'>
                                        <label className='inputLabel'>Source</label>
                                        <TextField fullWidth className='mt-1'
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            id="source"
                                            name="source"
                                            value={addCandidateFormik.values.source}
                                            onChange={addCandidateFormik.handleChange}
                                        />
                                    </Grid>
                                    <Grid size={6}>
                                        <label className='inputLabel'>Title</label>
                                        <TextField fullWidth className='mt-1'
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            id="title"
                                            name="title"
                                            value={addCandidateFormik.values.title}
                                            onChange={addCandidateFormik.handleChange}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} className='mb-2'>
                                    <Grid size={12} className='mb-1'>
                                        <label className='inputLabel'>Skills</label>
                                        <TextField fullWidth className='mt-1'
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            id="skills"
                                            name="skills"
                                            value={addCandidateFormik.values.skills}
                                            onChange={addCandidateFormik.handleChange}
                                        />
                                    </Grid>
                                </Grid>
                                <h4>Location</h4>
                                <Grid container spacing={2} className='mb-2'>
                                    <Grid size={6} className='mb-1'>
                                        <label className='inputLabel'>Address Line 1</label>
                                        <TextField fullWidth className='mt-1'
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            id="address"
                                            name="address"
                                            value={addCandidateFormik.values.address}
                                            onChange={addCandidateFormik.handleChange}
                                        />
                                    </Grid>
                                    <Grid size={6}>
                                        <label className='inputLabel'>APT/STE </label><span>#</span>
                                        <TextField fullWidth className='mt-1'
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            id="apt"
                                            name="apt"
                                            value={addCandidateFormik.values.apt}
                                            onChange={addCandidateFormik.handleChange}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} className='mb-2'>
                                    <Grid size={3} className='mb-1'>
                                        <label className='inputLabel'>City</label>
                                        <TextField fullWidth className='mt-1'
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            id="city"
                                            name="city"
                                            value={addCandidateFormik.values.city}
                                            onChange={addCandidateFormik.handleChange}
                                        />
                                    </Grid>
                                    <Grid size={3} className='mb-1'>
                                        <label className='inputLabel'>State</label>
                                        <TextField fullWidth className='mt-1'
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            id="state"
                                            name="state"
                                            value={addCandidateFormik.values.state}
                                            onChange={addCandidateFormik.handleChange}
                                        />
                                    </Grid>
                                    <Grid size={3} className='mb-1'>
                                        <label className='inputLabel'>Country</label>
                                        <TextField fullWidth className='mt-1'
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            id="country"
                                            name="country"
                                            value={addCandidateFormik.values.country}
                                            onChange={addCandidateFormik.handleChange}
                                        />
                                    </Grid>
                                    <Grid size={3} className='mb-1'>
                                        <label className='inputLabel'>Zipcode</label>
                                        <TextField fullWidth className='mt-1'
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            id="ZipCode"
                                            name="ZipCode"
                                            value={addCandidateFormik.values.ZipCode}
                                            onChange={addCandidateFormik.handleChange}
                                        />
                                    </Grid>
                                </Grid>
                                <h4>Work Preferences</h4>
                                <Grid container spacing={2} direction="row"
                                    justifyContent="center"
                                    alignItems="flex-start">
                                    <Grid size={12}>
                                        Current Employment Status
                                    </Grid>
                                    <Grid size={12}>
                                        <Box sx={{ marginBottom: 2 }}>

                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="start"
                                                alignItems="start"
                                                spacing={2}
                                            >
                                                <Grid size={12}>
                                                    <ToggleButtonGroup>
                                                        <ToggleButton value="Available Now" style={{ textTransform: 'capitalize' }}>
                                                            <FormControlLabel
                                                                control={<Checkbox />}
                                                                label="Available Now"
                                                                labelPlacement="end"
                                                                id="availableNow"
                                                                name="availableNow"
                                                                value={addCandidateFormik.values.availableNow}
                                                                onChange={addCandidateFormik.handleChange}
                                                            />
                                                        </ToggleButton>
                                                        <ToggleButton style={{ textTransform: 'capitalize' }} value="Available Soon">
                                                            <FormControlLabel
                                                                control={<Checkbox />}
                                                                label="Available Soon"
                                                                labelPlacement="end"
                                                                id="availableSoon"
                                                                name="availableSoon"
                                                                value={addCandidateFormik.values.availableSoon}
                                                                onChange={addCandidateFormik.handleChange}
                                                            />

                                                        </ToggleButton>
                                                        <ToggleButton style={{ textTransform: 'capitalize' }} value="Passively Looking">
                                                            <FormControlLabel
                                                                control={<Checkbox />}
                                                                label="Passively Looking"
                                                                labelPlacement="end"
                                                                id="passivelyLooking"
                                                                name="passivelyLooking"
                                                                value={addCandidateFormik.values.passivelyLooking}
                                                                onChange={addCandidateFormik.handleChange}
                                                            />

                                                        </ToggleButton>
                                                        <ToggleButton style={{ textTransform: 'capitalize' }} value="Not Looking">
                                                            <FormControlLabel
                                                                control={<Checkbox />}
                                                                label="Not Looking"
                                                                labelPlacement="end"
                                                                id="notLooking"
                                                                name="notLooking"
                                                                value={addCandidateFormik.values.notLooking}
                                                                onChange={addCandidateFormik.handleChange}
                                                            />

                                                        </ToggleButton>

                                                    </ToggleButtonGroup>

                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} direction="row"
                                    justifyContent="center"
                                    alignItems="flex-start">
                                    <Grid size={12}>
                                        Employment Preference
                                    </Grid>
                                    <Grid size={12}>
                                        <Box sx={{ marginBottom: 2 }}>

                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="start"
                                                alignItems="start"
                                                spacing={2}
                                            >
                                                <Grid size={12}>
                                                    <ToggleButtonGroup>
                                                        <ToggleButton value="Part Time Contract" style={{ textTransform: 'capitalize' }}>
                                                            <FormControlLabel
                                                                control={<Checkbox />}
                                                                label="Part Time Contract"
                                                                labelPlacement="end"
                                                                id="partTimeContract"
                                                                name="partTimeContract"
                                                                value={addCandidateFormik.values.partTimeContract}
                                                                onChange={addCandidateFormik.handleChange}
                                                            />
                                                        </ToggleButton>
                                                        <ToggleButton style={{ textTransform: 'capitalize' }} value="Full Time Contract">
                                                            <FormControlLabel
                                                                control={<Checkbox />}
                                                                label="Full Time Contract"
                                                                labelPlacement="end"
                                                                id="fullTimeContract"
                                                                name="fullTimeContract"
                                                                value={addCandidateFormik.values.fullTimeContract}
                                                                onChange={addCandidateFormik.handleChange}
                                                            />

                                                        </ToggleButton>
                                                        <ToggleButton style={{ textTransform: 'capitalize' }} value="Full Time Employment">
                                                            <FormControlLabel
                                                                control={<Checkbox />}
                                                                label="Full Time Employment"
                                                                labelPlacement="end"
                                                                id="fullTimeEmployment"
                                                                name="fullTimeEmployment"
                                                                value={addCandidateFormik.values.fullTimeEmployment}
                                                                onChange={addCandidateFormik.handleChange}
                                                            />

                                                        </ToggleButton>
                                                        <ToggleButton style={{ textTransform: 'capitalize' }} value="Freelancer">
                                                            <FormControlLabel
                                                                control={<Checkbox />}
                                                                label="Freelancer"
                                                                labelPlacement="end"
                                                                id="freelancer"
                                                                name="freelancer"
                                                                value={addCandidateFormik.values.freelancer}
                                                                onChange={addCandidateFormik.handleChange}
                                                            />

                                                        </ToggleButton>

                                                    </ToggleButtonGroup>

                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} direction="row"
                                    justifyContent="center"
                                    alignItems="flex-start">
                                    <Grid size={12}>
                                        Flexibility Preference
                                    </Grid>
                                    <Grid size={12}>
                                        <Box sx={{ marginBottom: 2 }}>

                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="start"
                                                alignItems="start"
                                                spacing={2}
                                            >
                                                <Grid size={12}>
                                                    <ToggleButtonGroup>
                                                        <ToggleButton value="Remote" style={{ textTransform: 'capitalize' }}>
                                                            <FormControlLabel
                                                                control={<Checkbox />}
                                                                label="Remote"
                                                                labelPlacement="end"
                                                                id="remote"
                                                                name="remote"
                                                                value={addCandidateFormik.values.remote}
                                                                onChange={addCandidateFormik.handleChange}
                                                            />
                                                        </ToggleButton>
                                                        <ToggleButton style={{ textTransform: 'capitalize' }} value="At Office">
                                                            <FormControlLabel
                                                                control={<Checkbox />}
                                                                label="At Office"
                                                                labelPlacement="end"
                                                                id="atOffice"
                                                                name="atOffice"
                                                                value={addCandidateFormik.values.atOffice}
                                                                onChange={addCandidateFormik.handleChange}
                                                            />

                                                        </ToggleButton>
                                                        <ToggleButton style={{ textTransform: 'capitalize' }} value="Hybrid">
                                                            <FormControlLabel
                                                                control={<Checkbox />}
                                                                label="Hybrid"
                                                                labelPlacement="end"
                                                                id="hybrid"
                                                                name="hybrid"
                                                                value={addCandidateFormik.values.hybrid}
                                                                onChange={addCandidateFormik.handleChange}
                                                            />

                                                        </ToggleButton>
                                                        <ToggleButton style={{ textTransform: 'capitalize' }} value="Not Sure">
                                                            <FormControlLabel
                                                                control={<Checkbox />}
                                                                label="Not Sure"
                                                                labelPlacement="end"
                                                                id="notSure"
                                                                name="notSure"
                                                                value={addCandidateFormik.values.notSure}
                                                                onChange={addCandidateFormik.handleChange}
                                                            />

                                                        </ToggleButton>

                                                    </ToggleButtonGroup>

                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} direction="row"
                                    justifyContent="center"
                                    alignItems="flex-start">
                                    <Grid size={12}>
                                        Are you legally authorized to work in United State?
                                    </Grid>
                                    <Grid size={12}>
                                        <Box sx={{ marginBottom: 2 }}>

                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="start"
                                                alignItems="start"
                                                spacing={2}
                                            >
                                                <Grid size={12}>
                                                    <ToggleButtonGroup>
                                                        <ToggleButton value="Yes" style={{ textTransform: 'capitalize' }}>
                                                            <FormControlLabel
                                                                control={<Checkbox />}
                                                                label="Yes"
                                                                labelPlacement="end"
                                                                id="authorized"
                                                                name="authorized"
                                                                value={addCandidateFormik.values.authorized}
                                                                onChange={addCandidateFormik.handleChange}
                                                            />
                                                        </ToggleButton>
                                                        <ToggleButton style={{ textTransform: 'capitalize' }} value="No">
                                                            <FormControlLabel
                                                                control={<Checkbox />}
                                                                label="No"
                                                                labelPlacement="end"
                                                                id="notAuthorized"
                                                                name="notAuthorized"
                                                                value={addCandidateFormik.values.notAuthorized}
                                                                onChange={addCandidateFormik.handleChange}
                                                            />

                                                        </ToggleButton>
                                                    </ToggleButtonGroup>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} direction="row"
                                    justifyContent="center"
                                    alignItems="flex-start">
                                    <Grid size={12}>
                                        Do you require a Visa sponsorship?
                                    </Grid>
                                    <Grid size={12}>
                                        <Box sx={{ marginBottom: 2 }}>

                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="start"
                                                alignItems="start"
                                                spacing={2}
                                            >
                                                <Grid size={12}>
                                                    <ToggleButtonGroup>
                                                        <ToggleButton value="Yes" style={{ textTransform: 'capitalize' }}>
                                                            <FormControlLabel
                                                                control={<Checkbox />}
                                                                label="Yes"
                                                                labelPlacement="end"
                                                                id="visa"
                                                                name="visa"
                                                                value={addCandidateFormik.values.visa}
                                                                onChange={addCandidateFormik.handleChange}
                                                            />
                                                        </ToggleButton>
                                                        <ToggleButton style={{ textTransform: 'capitalize' }} value="No">
                                                            <FormControlLabel
                                                                control={<Checkbox />}
                                                                label="No"
                                                                labelPlacement="end"
                                                                id="noVisa"
                                                                name="noVisa"
                                                                value={addCandidateFormik.values.noVisa}
                                                                onChange={addCandidateFormik.handleChange}
                                                            />

                                                        </ToggleButton>
                                                    </ToggleButtonGroup>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <h4>Compensation Preference</h4>
                                <Grid container spacing={2} className="mb-2">
                                    <Grid size={12}>
                                        <div>Fill out this section to tell hiring managers what you are looking to make in your next role, To receive the best matches, please share the minimum threshold at which you'd start considering roles. You will only be presented with opportunities that meet or exceed your requirements </div>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} direction="row"
                                    justifyContent="center"
                                    alignItems="flex-start">
                                    <Grid size={12}>
                                        <div className="enter">You may enter either or both</div>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} className='mb-2 mt-1'>
                                    <Grid size={6} className='mb-1'>
                                        <label className='inputLabel'>Per Hour</label>
                                        <TextField fullWidth className='mt-2'
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            id="perHour"
                                            name="perHour"
                                            value={addCandidateFormik.values.perHour}
                                            onChange={addCandidateFormik.handleChange}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} className='mb-2 mt-1'>
                                    <Grid size={12} className='mb-1'>
                                        <FormControlLabel
                                            control={<Checkbox />}
                                            label="Present jobs with compensation below the minimum threshold I provided above."
                                            labelPlacement="end"
                                            id="compensation"
                                            name="compensation"
                                            value={addCandidateFormik.values.compensation}
                                            onChange={addCandidateFormik.handleChange}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="end"
                                    alignItems="center"
                                >
                                    <Button variant="contained"
                                        type='button'
                                        color="primary"
                                        className='mr-2'
                                    >Add Candidate</Button>
                                    <Button variant="outlined"
                                        type='button'
                                        color="secondary"
                                        className='mr-2'
                                    >Cancel</Button>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </form>
            </div>
        </div>
    )
}

export default AddCandidate