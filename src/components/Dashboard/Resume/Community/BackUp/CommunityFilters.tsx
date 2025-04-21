// import { useState, SyntheticEvent } from 'react';
import { useState } from '../../../../../shared/modules/React';
import {Stack} from '../../../../../shared/modules/MaterialImports/Stack';
import {Grid, Button, IconButton, InputLabel, OutlinedInput, InputAdornment}     from '../../../../../shared/modules/commonImports';
import {Card, CardContent} from '../../../../../shared/modules/MaterialImports/Card';
import {Checkbox , Radio , RadioGroup, Select} from '../../../../../shared/modules/MaterialImports/FormElements';
import {TextField, FormControlLabel, FormControl} from '../../../../../shared/modules/MaterialImports/FormInputs';
import {FormGroup} from '../../../../../shared/modules/MaterialImports/FormGroup';
import {Box} from '../../../../../shared/modules/MaterialImports/Box';
import {MenuItem} from '../../../../../shared/modules/MaterialImports/Menu';
import {Switch} from '../../../../../shared/modules/MaterialImports/Switch';
import { showToaster } from '../../../../shared/SnackBar/SnackBar';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { DEGREE_TYPES, TAXONOMIES, LANGUAGES } from '../../../../../shared/data/Community/Community';
import masterStatesList from '../../../../../shared/data/States';
import {ListItemText} from '../../../../../shared/modules/MaterialImports/List';

import { FieldArray, Form, Formik, useFormik, Yup } from '../../../../../shared/modules/Formik';


import './CommunityFilters.scss';

const stringArray: string[] = [];


const CommunityFilters = ({ onApply }: { onApply: any }) => {


    const validationSchema = Yup.object({
        keywords: Yup.string(),
        jobTitleSwitch: Yup.boolean(),
        jobTitles: Yup.array().of(
            Yup.object().shape({
                title: Yup.string(),
                required: Yup.boolean()
            })
        ),
        locationSwitch: Yup.boolean(),
        location: Yup.object().shape({
            state: Yup.string(),
            zipCode: Yup.string(),
            radius: Yup.string(),
        }),
        workAuthorizationSwitch: Yup.boolean(),
        workAuthorization: Yup.object().shape({
            title: Yup.string(),
            required: Yup.string(),
        }),
        skillsSwitch: Yup.boolean(),
        skills: Yup.array().of(
            Yup.object().shape({
                recentUse: Yup.string(),
                experLevel: Yup.string(),
                skillName: Yup.string(),
            })
        ),
        allSkills: Yup.string(),
        employerSwitch: Yup.boolean(),
        employer: Yup.array().of(
            Yup.object().shape({
                employerName: Yup.string(),
            })
        ),
        educationSwitch: Yup.boolean(),
        degTypes: Yup.array(),
        IsTopStudent: Yup.boolean(),
        IsRecentGraduate: Yup.boolean(),
        IsCurrentStudent: Yup.boolean(),
        schools: Yup.array().of(
            Yup.object().shape({
                schoolName: Yup.string(),
            })
        ),
        degrees: Yup.array().of(
            Yup.object().shape({
                degreeName: Yup.string(),
            })
        ),
        daysBackSwitch: Yup.boolean(),
        daysBack: Yup.string(),
        experienceSwitch: Yup.boolean(),
        minExp: Yup.string(),
        maxExp: Yup.string(),
        minManExp: Yup.string(),
        maxManExp: Yup.string(),
        certificationSwitch: Yup.boolean(),
        certifications: Yup.array().of(
            Yup.object().shape({
                certificationName: Yup.string(),
            })
        ),
        industriesSwitch: Yup.boolean(),
        industries: Yup.array().of(
            Yup.object().shape({
                indcate: Yup.string(),
                subCat: Yup.string(),
            })
        ),
        languageSpokenSwitch: Yup.boolean(),
        languageSpoken: Yup.array()
    });
    const communityFormik = useFormik({
        initialValues: {
            keywords: "",
            jobTitleSwitch: false,
            jobTitles: [
                {
                    title: "",
                    required: false
                }
            ],
            locationSwitch: false,
            location: {
                state: stringArray,
                zipCode: "",
                radius: ""
            },
            workAuthorizationSwitch: false,
            workAuthorization: {
                title: "",
                required: false
            },
            skillsSwitch: false,
            skills: [
                {
                    recentUse: "",
                    experLevel: "",
                    skillName: ""
                }
            ],
            allSkills: "",
            employerSwitch: false,
            employer: [
                {
                    employerName: "",
                }
            ],
            educationSwitch: false,
            degTypes: stringArray,
            IsTopStudent: false,
            IsRecentGraduate: false,
            IsCurrentStudent: false,
            schools: [
                {
                    schoolName: "",
                }
            ],
            degrees: [
                {
                    degreeName: "",
                }
            ],
            daysBackSwitch: false,
            daysBack: "30",
            experienceSwitch: false,
            minExp: "",
            maxExp: "",
            minManExp: "",
            maxManExp: "",
            certificationSwitch: false,
            certifications: [
                {
                    certificationName: "",
                }
            ],
            industriesSwitch: false,
            industries: [
                {
                    indcate: "",
                    subCat: "",
                }
            ],
            languageSpokenSwitch: false,
            languageSpoken: stringArray,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // console.log('Form values:', values);
        },
    });

    const [expanded, setExpanded] = useState<string | false>(false);
    const [filtersExpand, setFiltersExpand] = useState(false);
    const toggleFilers = () => {
        setFiltersExpand(!filtersExpand);
    }

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };
    const searchResumes = (e: any) => {
        e.preventDefault();
        console.log(communityFormik.values.jobTitleSwitch)
        if (communityFormik.values.jobTitleSwitch) {
            showToaster("jobTitleSwitch is required", "error");
            return;
        }
    }

    const onApplyFilters = () => {
        onApply(communityFormik.values)
    }

    const getSubCatList = (i: any) => {
        const id = communityFormik.values.industries[i].indcate;
        if (id !== "") {
            return TAXONOMIES[Number(id)].subtaxonomies;
        }
    }

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 48 * 4.5 + 8,
                width: 250,
            },
        },
    };

    return (
        <div className='accordian-wrap customFilterChips'>
            <Formik
                // onSubmit={() => sequenceFormik.handleChange}
                onSubmit={searchResumes}
                initialValues={communityFormik.initialValues}
            // enableReinitialize={true}
            >
                {
                    ({ errors, values, touched, setFieldValue, handleChange }) => (
                        <Form
                        // onSubmit={sequenceFormik.handleSubmit}
                        >
                            <div className='py-3 px-2'>
                                <Card className={`customCard p-0`}>
                                    <CardContent>
                                        <FormControl fullWidth>
                                            <TextField
                                                className={`mt-2`}
                                                fullWidth
                                                id="keywords"
                                                variant="outlined"
                                                size="small"
                                                placeholder='Keywords'
                                                name={`keywords`}
                                                value={communityFormik.values.keywords}
                                                onChange={communityFormik.handleChange}
                                            />
                                        </FormControl>
                                    </CardContent>
                                </Card>
                                <Card className={`customCard p-0 ${communityFormik.values.jobTitleSwitch ? 'active' : ''}`}>
                                    <CardContent>
                                        <FormGroup>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        name='jobTitleSwitch'
                                                        checked={communityFormik.values.jobTitleSwitch}
                                                        onChange={communityFormik.handleChange}
                                                        color="primary"
                                                        size='small'
                                                    />
                                                }
                                                label="Job Title"
                                            />
                                        </FormGroup>
                                        <div
                                            className={`mt-1 ${communityFormik.values.jobTitleSwitch ? '' : 'd-none'}`}
                                        >
                                            <FieldArray
                                                name="jobTitles"
                                                render={arrayHelpers => {
                                                    return (
                                                        <div>
                                                            {
                                                                values.jobTitles && values.jobTitles.length > 0
                                                                    ?
                                                                    values.jobTitles.map((title, index) => (
                                                                        <div key={`jobTitle${index}`}>

                                                                            <TextField
                                                                                className={`mt-2`}
                                                                                fullWidth
                                                                                id={`jobTitles.${index}.title`}
                                                                                variant="outlined"
                                                                                type="text"
                                                                                size="small"
                                                                                placeholder='Add a Job Title'
                                                                                // value={communityFormik.values.jobTitles[index].title}
                                                                                name={`jobTitles.${index}.title`}
                                                                                onChange={communityFormik.handleChange}
                                                                                InputProps={{
                                                                                    endAdornment: <div>
                                                                                        <InputAdornment position="end">
                                                                                            <FormControlLabel
                                                                                                control={
                                                                                                    <Checkbox
                                                                                                        id={`jobTitles.${index}.required`}
                                                                                                        name={`jobTitles.${index}.required`}
                                                                                                        size='small'
                                                                                                        // value={communityFormik.values.active}
                                                                                                        onChange={communityFormik.handleChange}
                                                                                                    />
                                                                                                }
                                                                                                label="Required" />
                                                                                            <IconButton
                                                                                                onClick={() => arrayHelpers.remove(index)}
                                                                                                edge="end"
                                                                                            >
                                                                                                <CloseIcon className='closeIcon' />
                                                                                            </IconButton>
                                                                                        </InputAdornment>
                                                                                    </div>
                                                                                }}
                                                                            />

                                                                            {/* <ErrorMessage name={`jobTitles.${index}.title`} /> */}

                                                                            {/* <button type="button" onClick={() => arrayHelpers.remove(index)} // remove a friend from the list > - </button> */}
                                                                        </div>
                                                                    ))
                                                                    :
                                                                    null
                                                            }
                                                            <Grid
                                                                container
                                                                direction="row"
                                                                justifyContent="flex-end"
                                                                alignItems="center"
                                                                className='mt-1 pr-3'
                                                            >
                                                                <IconButton
                                                                    onClick={() => arrayHelpers.push({
                                                                        title: "",
                                                                        required: false
                                                                    })}
                                                                    edge="end"
                                                                >
                                                                    <AddIcon className='addIcon' />
                                                                </IconButton>
                                                            </Grid>
                                                        </div>
                                                    );
                                                }}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className={`customCard p-0 ${communityFormik.values.locationSwitch ? 'active' : ''}`}>
                                    <CardContent>
                                        <FormGroup>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        name='locationSwitch'
                                                        checked={communityFormik.values.locationSwitch}
                                                        onChange={communityFormik.handleChange}
                                                        color="primary"
                                                        size='small'
                                                    />
                                                }
                                                label="Location"
                                            />
                                        </FormGroup>
                                        <div
                                            className={`mt-1 ${communityFormik.values.locationSwitch ? '' : 'd-none'}`}
                                        >
                                            <FormControl fullWidth>
                                                <InputLabel size='small' id="Statelabel">State</InputLabel>
                                                <Select
                                                    labelId="Statelabel"
                                                    id="state"
                                                    name='location.state'
                                                    value={communityFormik.values.location.state}
                                                    multiple
                                                    onChange={communityFormik.handleChange}
                                                    input={<OutlinedInput label="State" />}
                                                    renderValue={(selected: any) => selected.join(', ')}
                                                    MenuProps={MenuProps}
                                                    fullWidth
                                                    size='small'
                                                >
                                                    {masterStatesList.map((name) => (
                                                        <MenuItem key={name.id} value={name.label}>
                                                            <Checkbox checked={communityFormik.values.location.state.indexOf(name.label) > -1} />
                                                            <ListItemText primary={name.label} />
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            <TextField
                                                className={`mt-2`}
                                                fullWidth
                                                id="zipcode"
                                                variant="outlined"
                                                type="number"
                                                size="small"
                                                placeholder='Zipcode'
                                                // value={communityFormik.values.jobTitles[index].title}
                                                name={`location.zipcode`}
                                                onChange={communityFormik.handleChange}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className={`customCard p-0 ${communityFormik.values.workAuthorizationSwitch ? 'active' : ''}`}>
                                    <CardContent>
                                        <FormGroup>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        name='workAuthorizationSwitch'
                                                        checked={communityFormik.values.workAuthorizationSwitch}
                                                        onChange={communityFormik.handleChange}
                                                        color="primary"
                                                        size='small'
                                                    />
                                                }
                                                label="Work Authorization"
                                            />
                                        </FormGroup>
                                        <div
                                            className={`mt-1 ${communityFormik.values.workAuthorizationSwitch ? '' : 'd-none'}`}
                                        >
                                            <TextField
                                                className={`mt-2`}
                                                fullWidth
                                                id="workAuthorization.title"
                                                variant="outlined"
                                                type="text"
                                                size="small"
                                                placeholder='Select Work Authorization'
                                                // value={communityFormik.values.jobTitles[index].title}
                                                name={`workAuthorization.title`}
                                                onChange={communityFormik.handleChange}
                                                select
                                                InputProps={{
                                                    endAdornment: <div>
                                                        <InputAdornment position="end">
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        id={`workAuthorization.required`}
                                                                        name={`workAuthorization.required`}
                                                                        size='small'
                                                                        // value={communityFormik.values.active}
                                                                        onChange={communityFormik.handleChange}
                                                                    />
                                                                }
                                                                label="Required" />
                                                        </InputAdornment>
                                                    </div>
                                                }}
                                            >
                                                <MenuItem value="">Select</MenuItem>
                                                <MenuItem value="EAD">Employment Auth Document</MenuItem>
                                                <MenuItem value="GCH">Green Card</MenuItem>
                                                <MenuItem value="H1">H-1 Visa Holder</MenuItem>
                                                <MenuItem value="H1R">Need H1</MenuItem>
                                                <MenuItem value="TPH"> TN Permit Holder</MenuItem>
                                                <MenuItem value="USC">U.S. Citizen</MenuItem>
                                            </TextField>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className={`customCard p-0 ${communityFormik.values.skillsSwitch ? 'active' : ''}`}>
                                    <CardContent>
                                        <FormGroup>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        name='skillsSwitch'
                                                        checked={communityFormik.values.skillsSwitch}
                                                        onChange={communityFormik.handleChange}
                                                        color="primary"
                                                        size='small'
                                                    />
                                                }
                                                label="Skills"
                                            />
                                        </FormGroup>
                                        <div
                                            className={`mt-1 ${communityFormik.values.skillsSwitch ? '' : 'd-none'}`}
                                        >
                                            <FieldArray
                                                name="skills"
                                                render={arrayHelpers => {
                                                    return (
                                                        <div>
                                                            {
                                                                values.skills && values.skills.length > 0
                                                                    ?
                                                                    values.skills.map((title, index) => (
                                                                        <div className='addSeperator' key={`skills${index}`}>


                                                                            <FormControl>
                                                                                <RadioGroup
                                                                                    defaultValue="true"
                                                                                    name={`skills.${index}.recentUse`}
                                                                                    id={`skills.${index}.recentUse`}
                                                                                    onChange={communityFormik.handleChange}
                                                                                >
                                                                                    <FormControlLabel className='mb-2' value="true" control={<Radio />} label="Skill must be in recent use by candidate" />
                                                                                    <FormControlLabel value="false" control={<Radio />} label="Skill doesn't need to be in recent use by candidate" />
                                                                                </RadioGroup>
                                                                            </FormControl>
                                                                            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1} className='mb-1 mt-2' >
                                                                                <label>Experience Level:</label>
                                                                                <Box>
                                                                                    <FormControl style={{ width: '100px', marginLeft: '30px' }}>
                                                                                        <TextField
                                                                                            id={`skills.${index}.experLevel`}
                                                                                            name={`skills.${index}.experLevel`}
                                                                                            size="small"
                                                                                            select
                                                                                            onChange={communityFormik.handleChange}
                                                                                        >
                                                                                            <MenuItem value="">None</MenuItem>
                                                                                            <MenuItem value="Low">Low</MenuItem>
                                                                                            <MenuItem value="Mid">Mid</MenuItem>
                                                                                            <MenuItem value="High">High</MenuItem>
                                                                                        </TextField>
                                                                                    </FormControl>
                                                                                </Box>
                                                                            </Stack>
                                                                            <Stack className='mt-1 mb-1'
                                                                                direction="row"
                                                                                justifyContent="space-between"
                                                                                alignItems="center"
                                                                                spacing={1}
                                                                            >
                                                                                <label>Name :</label>
                                                                                <FormControl style={{ width: '100px' }} >
                                                                                    <TextField
                                                                                        size='small'
                                                                                        id={`skills.${index}.skillName`}
                                                                                        name={`skills.${index}.skillName`}
                                                                                        onChange={communityFormik.handleChange}
                                                                                    />
                                                                                </FormControl>
                                                                            </Stack>
                                                                            <Box textAlign={'right'} sx={{ pr: '12px' }}>

                                                                                <IconButton
                                                                                    onClick={() => arrayHelpers.remove(index)}
                                                                                    edge="end"
                                                                                >
                                                                                    <CloseIcon className='closeIcon' />
                                                                                </IconButton>
                                                                            </Box>
                                                                        </div>
                                                                    ))
                                                                    :
                                                                    null
                                                            }
                                                            <Grid
                                                                container
                                                                direction="row"
                                                                justifyContent="flex-end"
                                                                alignItems="center"
                                                                className='mt-1 pr-3'
                                                            >
                                                                <IconButton
                                                                    onClick={() => arrayHelpers.push({
                                                                        title: "",
                                                                        required: false
                                                                    })}
                                                                    edge="end"
                                                                >
                                                                    <AddIcon className='addIcon' />
                                                                </IconButton>
                                                            </Grid>

                                                            <FormControl>
                                                                <RadioGroup
                                                                    defaultValue="onlyOne"
                                                                    name="allSkills"
                                                                    id="allSkills"
                                                                    onChange={communityFormik.handleChange}
                                                                >
                                                                    <FormControlLabel className='mb-2' value="must" control={<Radio />} label="All Skills are required" />
                                                                    <FormControlLabel value="onlyOne" control={<Radio />} label="Only one of the skills is required" />
                                                                </RadioGroup>
                                                            </FormControl>
                                                        </div>
                                                    );
                                                }}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className={`customCard p-0 ${communityFormik.values.employerSwitch ? 'active' : ''}`}>
                                    <CardContent>
                                        <FormGroup>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        name='employerSwitch'
                                                        checked={communityFormik.values.employerSwitch}
                                                        onChange={communityFormik.handleChange}
                                                        color="primary"
                                                        size='small'
                                                    />
                                                }
                                                label="Employer"
                                            />
                                        </FormGroup>
                                        <div
                                            className={`mt-1 ${communityFormik.values.employerSwitch ? '' : 'd-none'}`}
                                        >
                                            <FieldArray
                                                name="employer"
                                                render={arrayHelpers => {
                                                    return (
                                                        <div>
                                                            {
                                                                values.employer && values.employer.length > 0
                                                                    ?
                                                                    values.employer.map((title, index) => (
                                                                        <div key={`employer${index}`}>

                                                                            <TextField
                                                                                className={`mt-2`}
                                                                                fullWidth
                                                                                id={`employer.${index}.employerName`}
                                                                                variant="outlined"
                                                                                type="text"
                                                                                size="small"
                                                                                placeholder='Employer/Company Name'
                                                                                name={`employer.${index}.employerName`}
                                                                                onChange={communityFormik.handleChange}
                                                                                InputProps={{
                                                                                    endAdornment: <div>
                                                                                        <InputAdornment position="end">
                                                                                            <IconButton
                                                                                                onClick={() => arrayHelpers.remove(index)}
                                                                                                edge="end"
                                                                                            >
                                                                                                <CloseIcon className='closeIcon' />
                                                                                            </IconButton>
                                                                                        </InputAdornment>
                                                                                    </div>
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    ))
                                                                    :
                                                                    null
                                                            }
                                                            <Grid
                                                                container
                                                                direction="row"
                                                                justifyContent="flex-end"
                                                                alignItems="center"
                                                                className='mt-1 pr-3'
                                                            >
                                                                <IconButton
                                                                    onClick={() => arrayHelpers.push({
                                                                        title: "",
                                                                        required: false
                                                                    })}
                                                                    edge="end"
                                                                >
                                                                    <AddIcon className='addIcon' />
                                                                </IconButton>
                                                            </Grid>
                                                        </div>
                                                    );
                                                }}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className={`customCard p-0 ${communityFormik.values.educationSwitch ? 'active' : ''}`}>
                                    <CardContent>
                                        <FormGroup>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        name='educationSwitch'
                                                        checked={communityFormik.values.educationSwitch}
                                                        onChange={communityFormik.handleChange}
                                                        color="primary"
                                                        size='small'
                                                    />
                                                }
                                                label="Education"
                                            />
                                        </FormGroup>
                                        <div
                                            className={`mt-1 ${communityFormik.values.educationSwitch ? '' : 'd-none'}`}
                                        >
                                            <label>Degree Types:</label>
                                            <Box sx={{ mt: 1 }}>
                                                <FormControl fullWidth>
                                                    <Select
                                                        id="degTypes"
                                                        name='degTypes'
                                                        value={communityFormik.values.degTypes}
                                                        multiple
                                                        onChange={communityFormik.handleChange}
                                                        input={<OutlinedInput />}
                                                        renderValue={(selected: any) => selected.join(', ')}
                                                        MenuProps={MenuProps}
                                                        fullWidth
                                                        size='small'
                                                    >
                                                        {DEGREE_TYPES.map((deg) => (
                                                            <MenuItem key={deg.value} value={deg.text}>
                                                                <Checkbox checked={communityFormik.values.degTypes.indexOf(deg.text) > -1} />
                                                                <ListItemText primary={deg.text} />
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Box>

                                            <FormGroup>
                                                <FormControlLabel control={<Checkbox value={communityFormik.values.IsTopStudent} />} label="Show Only Top Students" />
                                                <FormControlLabel required control={<Checkbox value={communityFormik.values.IsRecentGraduate} />} label="Show Only Students That Graduated Within The Last Year" />
                                                <FormControlLabel control={<Checkbox value={communityFormik.values.IsCurrentStudent} />} label="Show Only Current Students" />
                                            </FormGroup>

                                            <label>Schools:</label>
                                            <FieldArray
                                                name="schools"
                                                render={arrayHelpers => {
                                                    return (
                                                        <div>
                                                            {
                                                                values.schools && values.schools.length > 0
                                                                    ?
                                                                    values.schools.map((title, index) => (
                                                                        <div key={`schools${index}`}>

                                                                            <TextField
                                                                                className={`mt-2`}
                                                                                fullWidth
                                                                                id={`schools.${index}.schoolName`}
                                                                                variant="outlined"
                                                                                type="text"
                                                                                size="small"
                                                                                placeholder='School Name'
                                                                                name={`schools.${index}.schoolName`}
                                                                                onChange={communityFormik.handleChange}
                                                                                InputProps={{
                                                                                    endAdornment: <div>
                                                                                        <InputAdornment position="end">
                                                                                            <IconButton
                                                                                                onClick={() => arrayHelpers.remove(index)}
                                                                                                edge="end"
                                                                                            >
                                                                                                <CloseIcon className='closeIcon' />
                                                                                            </IconButton>
                                                                                        </InputAdornment>
                                                                                    </div>
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    ))
                                                                    :
                                                                    null
                                                            }
                                                            <Grid
                                                                container
                                                                direction="row"
                                                                justifyContent="flex-end"
                                                                alignItems="center"
                                                                className='mt-1 pr-3'
                                                            >
                                                                <IconButton
                                                                    onClick={() => arrayHelpers.push({
                                                                        title: "",
                                                                        required: false
                                                                    })}
                                                                    edge="end"
                                                                >
                                                                    <AddIcon className='addIcon' />
                                                                </IconButton>
                                                            </Grid>
                                                        </div>
                                                    );
                                                }}
                                            />

                                            <label>Degrees:</label>
                                            <FieldArray
                                                name="degrees"
                                                render={arrayHelpers => {
                                                    return (
                                                        <div>
                                                            {
                                                                values.degrees && values.degrees.length > 0
                                                                    ?
                                                                    values.degrees.map((title, index) => (
                                                                        <div key={`degrees${index}`}>

                                                                            <TextField
                                                                                className={`mt-2`}
                                                                                fullWidth
                                                                                id={`degrees.${index}.degreeName`}
                                                                                variant="outlined"
                                                                                type="text"
                                                                                size="small"
                                                                                placeholder='Degree Name'
                                                                                name={`degrees.${index}.degreeName`}
                                                                                onChange={communityFormik.handleChange}
                                                                                InputProps={{
                                                                                    endAdornment: <div>
                                                                                        <InputAdornment position="end">
                                                                                            <IconButton
                                                                                                onClick={() => arrayHelpers.remove(index)}
                                                                                                edge="end"
                                                                                            >
                                                                                                <CloseIcon className='closeIcon' />
                                                                                            </IconButton>
                                                                                        </InputAdornment>
                                                                                    </div>
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    ))
                                                                    :
                                                                    null
                                                            }
                                                            <Grid
                                                                container
                                                                direction="row"
                                                                justifyContent="flex-end"
                                                                alignItems="center"
                                                                className='mt-1 pr-3'
                                                            >
                                                                <IconButton
                                                                    onClick={() => arrayHelpers.push({
                                                                        title: "",
                                                                        required: false
                                                                    })}
                                                                    edge="end"
                                                                >
                                                                    <AddIcon className='addIcon' />
                                                                </IconButton>
                                                            </Grid>
                                                        </div>
                                                    );
                                                }}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className={`customCard p-0 ${communityFormik.values.daysBackSwitch ? 'active' : ''}`}>
                                    <CardContent>
                                        <FormGroup>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        name='daysBackSwitch'
                                                        checked={communityFormik.values.daysBackSwitch}
                                                        onChange={communityFormik.handleChange}
                                                        color="primary"
                                                        size='small'
                                                    />
                                                }
                                                label="Days Back"
                                            />
                                        </FormGroup>
                                        <div
                                            className={`mt-1 ${communityFormik.values.daysBackSwitch ? '' : 'd-none'}`}
                                        >
                                            <FormControl>
                                                <RadioGroup
                                                    name="daysBack"
                                                    id="daysBack"
                                                    onChange={communityFormik.handleChange}
                                                    defaultValue="30"
                                                >
                                                    <FormControlLabel value="1" control={<Radio />} label="Within 1 day" />
                                                    <FormControlLabel value="7" control={<Radio />} label="Within 1 week" />
                                                    <FormControlLabel value="30" control={<Radio />} label="Within 1 month" />
                                                    <FormControlLabel value="60" control={<Radio />} label="Within 2 months" />
                                                    <FormControlLabel value="90" control={<Radio />} label="Within 3 months" />
                                                    <FormControlLabel value="180" control={<Radio />} label="Within 6 months" />
                                                    <FormControlLabel value="270" control={<Radio />} label="Within 9 months" />
                                                    <FormControlLabel value="365" control={<Radio />} label="Within 1 year" />
                                                    <FormControlLabel value="730" control={<Radio />} label="Within 2 year" />
                                                    <FormControlLabel value="3650" control={<Radio />} label="All" />
                                                </RadioGroup>
                                            </FormControl>

                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className={`customCard p-0 ${communityFormik.values.experienceSwitch ? 'active' : ''}`}>
                                    <CardContent>
                                        <FormGroup>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        name='experienceSwitch'
                                                        checked={communityFormik.values.experienceSwitch}
                                                        onChange={communityFormik.handleChange}
                                                        color="primary"
                                                        size='small'
                                                    />
                                                }
                                                label="Experience"
                                            />
                                        </FormGroup>
                                        <div
                                            className={`mt-1 ${communityFormik.values.experienceSwitch ? '' : 'd-none'}`}
                                        >
                                            <label>Total Work Experience (Years)</label>
                                            <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
                                                <TextField
                                                    className={`mt-2`}
                                                    placeholder='Min'
                                                    size='small'
                                                    id="minExp"
                                                    name='minExp'
                                                    type='number'
                                                    InputProps={{
                                                        inputProps: {
                                                            min: 0
                                                        }
                                                    }}
                                                    value={communityFormik.values.minExp}
                                                    onChange={communityFormik.handleChange}
                                                />
                                                <span className='mx-3'>-</span>
                                                <TextField
                                                    className={`mt-2`}
                                                    placeholder='Max'
                                                    size='small'
                                                    id="maxExp"
                                                    name='maxExp'
                                                    type='number'
                                                    InputProps={{
                                                        inputProps: {
                                                            min: 0
                                                        }
                                                    }}
                                                    value={communityFormik.values.maxExp}
                                                    onChange={communityFormik.handleChange}
                                                />
                                            </Stack>

                                            <label>Management Experience (Years)</label>
                                            <Stack direction="row" alignItems="center">
                                                <TextField
                                                    className={`mt-2`}
                                                    placeholder='Min'
                                                    size='small'
                                                    id="minManExp"
                                                    name='minManExp'
                                                    type='number'
                                                    InputProps={{
                                                        inputProps: {
                                                            min: 0
                                                        }
                                                    }}
                                                    value={communityFormik.values.minManExp}
                                                    onChange={communityFormik.handleChange}
                                                />
                                                <span className='mx-3'>-</span>
                                                <TextField
                                                    className={`mt-2`}
                                                    placeholder='Max'
                                                    size='small'
                                                    id="maxManExp"
                                                    name='maxManExp'
                                                    type='number'
                                                    InputProps={{
                                                        inputProps: {
                                                            min: 0
                                                        }
                                                    }}
                                                    value={communityFormik.values.maxManExp}
                                                    onChange={communityFormik.handleChange}
                                                />
                                            </Stack>

                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className={`customCard p-0 ${communityFormik.values.certificationSwitch ? 'active' : ''}`}>
                                    <CardContent>
                                        <FormGroup>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        name='certificationSwitch'
                                                        checked={communityFormik.values.certificationSwitch}
                                                        onChange={communityFormik.handleChange}
                                                        color="primary"
                                                        size='small'
                                                    />
                                                }
                                                label="Certifications"
                                            />
                                        </FormGroup>
                                        <div
                                            className={`mt-1 ${communityFormik.values.certificationSwitch ? '' : 'd-none'}`}
                                        >
                                            <FieldArray
                                                name="certifications"
                                                render={arrayHelpers => {
                                                    return (
                                                        <div>
                                                            {
                                                                values.certifications && values.certifications.length > 0
                                                                    ?
                                                                    values.certifications.map((title, index) => (
                                                                        <div key={`certification${index}`}>

                                                                            <TextField
                                                                                className={`mt-2`}
                                                                                fullWidth
                                                                                id={`certifications.${index}.certificationName`}
                                                                                variant="outlined"
                                                                                type="text"
                                                                                size="small"
                                                                                placeholder='Certification'
                                                                                name={`certifications.${index}.certificationName`}
                                                                                onChange={communityFormik.handleChange}
                                                                                InputProps={{
                                                                                    endAdornment: <div>
                                                                                        <InputAdornment position="end">
                                                                                            <IconButton
                                                                                                onClick={() => arrayHelpers.remove(index)}
                                                                                                edge="end"
                                                                                            >
                                                                                                <CloseIcon className='closeIcon' />
                                                                                            </IconButton>
                                                                                        </InputAdornment>
                                                                                    </div>
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    ))
                                                                    :
                                                                    null
                                                            }
                                                            <Grid
                                                                container
                                                                direction="row"
                                                                justifyContent="flex-end"
                                                                alignItems="center"
                                                                className='mt-1 pr-3'
                                                            >
                                                                <IconButton
                                                                    onClick={() => arrayHelpers.push({
                                                                        title: "",
                                                                        required: false
                                                                    })}
                                                                    edge="end"
                                                                >
                                                                    <AddIcon className='addIcon' />
                                                                </IconButton>
                                                            </Grid>
                                                        </div>
                                                    );
                                                }}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className={`customCard p-0 ${communityFormik.values.industriesSwitch ? 'active' : ''}`}>
                                    <CardContent>
                                        <FormGroup>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        name='industriesSwitch'
                                                        checked={communityFormik.values.industriesSwitch}
                                                        onChange={communityFormik.handleChange}
                                                        color="primary"
                                                        size='small'
                                                    />
                                                }
                                                label="Industries"
                                            />
                                        </FormGroup>
                                        <div
                                            className={`mt-1 ${communityFormik.values.industriesSwitch ? '' : 'd-none'}`}
                                        >
                                            <FieldArray
                                                name="industries"
                                                render={arrayHelpers => {
                                                    return (
                                                        <div>
                                                            {
                                                                values.industries && values.industries.length > 0
                                                                    ?
                                                                    values.industries.map((title, index) => (
                                                                        <div key={`industries${index}`} className='addSeperator'>
                                                                            <label>Category:</label>
                                                                            <FormControl fullWidth>
                                                                                <Select
                                                                                    id={`industries.${index}.indcate`}
                                                                                    name={`industries.${index}.indcate`}
                                                                                    onChange={communityFormik.handleChange}
                                                                                    sx={{ mb: 1, mt: 1 }}
                                                                                    size='small'
                                                                                >
                                                                                    {TAXONOMIES.map((ind, i) => (
                                                                                        <MenuItem key={i} value={ind.id}>{ind.name}</MenuItem>
                                                                                    ))}
                                                                                </Select>
                                                                            </FormControl>

                                                                            <label>Subcategory:</label>
                                                                            <FormControl fullWidth>
                                                                                <Select
                                                                                    id={`industries.${index}.subCat`}
                                                                                    name={`industries.${index}.subCat`}
                                                                                    onChange={communityFormik.handleChange}
                                                                                    size='small'
                                                                                    sx={{ mt: 1 }}
                                                                                >
                                                                                    {getSubCatList(index)?.map((subCat, i) => (
                                                                                        <MenuItem key={i} value={subCat.id}>{subCat.name}</MenuItem>
                                                                                    ))}
                                                                                </Select>
                                                                            </FormControl>
                                                                            <Box textAlign={'right'} sx={{ pr: '12px' }}>

                                                                                <IconButton
                                                                                    onClick={() => arrayHelpers.remove(index)}
                                                                                    edge="end"
                                                                                >
                                                                                    <CloseIcon className='closeIcon' />
                                                                                </IconButton>
                                                                            </Box>
                                                                        </div>
                                                                    ))
                                                                    :
                                                                    null
                                                            }
                                                            <Grid
                                                                container
                                                                direction="row"
                                                                justifyContent="flex-end"
                                                                alignItems="center"
                                                                className='mt-1 pr-3'
                                                            >
                                                                <IconButton
                                                                    onClick={() => arrayHelpers.push({
                                                                        title: "",
                                                                        required: false
                                                                    })}
                                                                    edge="end"
                                                                >
                                                                    <AddIcon className='addIcon' />
                                                                </IconButton>
                                                            </Grid>
                                                        </div>
                                                    );
                                                }}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className={`customCard p-0 ${communityFormik.values.languageSpokenSwitch ? 'active' : ''}`}>
                                    <CardContent>
                                        <FormGroup>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        name='languageSpokenSwitch'
                                                        checked={communityFormik.values.languageSpokenSwitch}
                                                        onChange={communityFormik.handleChange}
                                                        color="primary"
                                                        size='small'
                                                    />
                                                }
                                                label="Spoken Language"
                                            />
                                        </FormGroup>
                                        <div
                                            className={`mt-1 ${communityFormik.values.languageSpokenSwitch ? '' : 'd-none'}`}
                                        >
                                            <FormControl fullWidth>
                                                <InputLabel size='small' id="languageSpokenlabel">Select</InputLabel>
                                                <Select
                                                    labelId='languageSpoken'
                                                    id="languageSpoken"
                                                    name='languageSpoken'
                                                    value={communityFormik.values.languageSpoken}
                                                    multiple
                                                    onChange={communityFormik.handleChange}
                                                    input={<OutlinedInput label="Select" />}
                                                    renderValue={(selected: any) => selected.join(', ')}
                                                    MenuProps={MenuProps}
                                                    fullWidth
                                                    size='small'
                                                >
                                                    {LANGUAGES.map((lang) => (
                                                        <MenuItem key={lang.id} value={lang.label}>
                                                            <Checkbox checked={communityFormik.values.languageSpoken.indexOf(lang.label) > -1} />
                                                            <ListItemText primary={lang.label} />
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </Form>
                    )
                }
            </Formik>
            {/* <div className='filterListTab'>
                <Accordion>
                    <Card >
                        <CardContent className='4px 15px p-0 m-1'>
                            <Typography>
                                vali company 002 - 208057 - Angular Developer
                            </Typography>
                            <Stack className='mt-1 mb-1'
                                direction="row"
                                justifyContent="space-around"
                                alignItems="flex-start"
                                spacing={1}
                            >
                                <FormControl>
                                    <TextField size='small' placeholder='Change Job' sx={{ width: '80%' }} />
                                </FormControl>
                                <FormControl>
                                    <TextField size='small' sx={{ width: '80%' }}
                                        placeholder="Search"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon />
                                                </InputAdornment>
                                            )
                                        }} />
                                </FormControl>
                            </Stack>
                            <FormControl>
                                <TextField size='small' sx={{ width: '145%', marginTop: '2px' }} placeholder='Keywords' />
                            </FormControl>
                            <FormControl>
                                <FormGroup>
                                    <FormControlLabel className='p-0 m-0'
                                        value="start"
                                        label="Search client submission only"
                                        control={<Checkbox />}
                                        labelPlacement="start"
                                    />
                                </FormGroup>
                            </FormControl>
                            <FormControl>
                                <FormGroup>
                                    <FormControlLabel className='p-0 m-0'
                                        value="start"
                                        control={<Checkbox />}
                                        label="CS Ninja"
                                        labelPlacement="start"
                                    />
                                </FormGroup>
                            </FormControl>
                        </CardContent>
                    </Card>
                </Accordion>
                <Accordion disableGutters square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header">
                        <Stack sx={{ width: '100%' }}>
                            <Stack className='acc-title' direction="row" justifyContent="space-between">
                                <Stack direction="row" alignItems="center">
                                    <Typography>Job Titles</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormControl style={{ width: '120px' }}>
                            <TextField size='small' placeholder='JobtitleSwitch' />
                        </FormControl>
                    </AccordionDetails>
                </Accordion>
                <Accordion disableGutters square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header">
                        <Stack sx={{ width: '100%' }}>
                            <Stack className='acc-title' direction="row" justifyContent="space-between">
                                <Stack direction="row" alignItems="center">
                                    <Typography>Skills</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails>

                    </AccordionDetails>
                </Accordion>
                <Accordion disableGutters square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header">
                        <Stack sx={{ width: '100%' }}>
                            <Stack className='acc-title' direction="row" justifyContent="space-between">
                                <Stack direction="row" alignItems="center">
                                    <Typography>Location</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                        <label>State : </label>
                        <div>
                            <TextField fullWidth className='mt-1 mb-2'
                                variant="outlined"
                                placeholder="Select State"
                                size="small"
                            />
                        </div>
                        <Stack direction="row" spacing={1} className='mt-1 mb-1'>
                            <label>Zipcode :</label>
                            <TextField
                                size='small'
                                sx={{ width: '50%' }}
                            />
                        </Stack>
                        <Stack direction="row" spacing={1} className='mt-1 mb-1'>
                            <label>Distance :</label>
                            <TextField
                                placeholder='in Miles'
                                size='small'
                                sx={{ width: '50%' }}
                            />
                        </Stack>
                    </AccordionDetails>
                </Accordion>
                <Accordion disableGutters square expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                    <AccordionSummary expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header">
                        <Stack sx={{ width: '100%' }}>
                            <Stack className='acc-title' direction="row" justifyContent="space-between">
                                <Stack direction="row" alignItems="center">
                                    <Typography>Work Authorization</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TextField fullWidth className='mt-1 mb-2'
                            variant="outlined"
                            placeholder="Select Work Authorization"
                            size="small"
                        />
                    </AccordionDetails>
                </Accordion>
                <Accordion disableGutters square expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                    <AccordionSummary expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header">
                        <Stack sx={{ width: '100%' }}>
                            <Stack className='acc-title' direction="row" justifyContent="space-between">
                                <Stack direction="row" alignItems="center">
                                    <Typography>Employers</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TextField fullWidth className='mt-1 mb-2'
                            variant="outlined"
                            placeholder="Employer/Company Name"
                            size="small"
                        />
                    </AccordionDetails>
                </Accordion>
                <Accordion disableGutters square expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                    <AccordionSummary expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header">
                        <Stack sx={{ width: '100%' }}>
                            <Stack className='acc-title' direction="row" justifyContent="space-between">
                                <Stack direction="row" alignItems="center">
                                    <Typography>Education</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails> 
                        <Stack direction="row" spacing={1} className='mb-1 mt-2' >
                            <label>Degree Types :</label>
                            <TextField
                                placeholder='Select Degrees'
                                size='small'
                                sx={{ width: '50%' }}
                            />
                        </Stack>
                        <FormControl>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox />} label="Show Only Top Students" />
                                <FormControlLabel control={<Checkbox />} label="Show Only Students That Graduated Within The Last Year" />
                                <FormControlLabel control={<Checkbox />} label="Show Only Current Students" />
                            </FormGroup>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                            >
                                <FormControlLabel className='mb-2' value="Show Only Top Students" control={<Radio />} label="Show Only Top Students" />
                                <FormControlLabel value="Show Only Students That Graduated Within The Last Year" control={<Radio />} label="Show Only Students That Graduated Within The Last Year" />
                                <FormControlLabel value="Show Only Current Students" control={<Radio />} label="Show Only Current Students" />
                            </RadioGroup>
                        </FormControl>
                        <label>Schools :</label>
                        <div>
                            <TextField fullWidth className='mt-1 mb-2'
                                variant="outlined"
                                placeholder="School Name"
                                size="small"
                            />
                        </div>
                        <label>Degrees :</label>
                        <div>
                            <TextField fullWidth className='mt-1 mb-2'
                                variant="outlined"
                                placeholder="Degree Name"
                                size="small"
                            />
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion disableGutters square expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
                    <AccordionSummary expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header">
                        <Stack sx={{ width: '100%' }}>
                            <Stack className='acc-title' direction="row" justifyContent="space-between">
                                <Stack direction="row" alignItems="center">
                                    <Typography>Days Back</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="Within 1 day" control={<Radio />} label="Within 1 day" />
                                <FormControlLabel value="Within 1 week" control={<Radio />} label="Within 1 week" />
                                <FormControlLabel value="Within 1 month" control={<Radio />} label="Within 1 month" />
                                <FormControlLabel value="Within 2 months" control={<Radio />} label="Within 2 months" />
                                <FormControlLabel value="Within 3 months" control={<Radio />} label="Within 3 months" />
                                <FormControlLabel value="Within 6 months" control={<Radio />} label="Within 6 months" />
                                <FormControlLabel value="Within 9 months" control={<Radio />} label="Within 9 months" />
                                <FormControlLabel value="Within 1 year" control={<Radio />} label="Within 1 year" />
                                <FormControlLabel value="Within 2 year" control={<Radio />} label="Within 2 year" />
                                <FormControlLabel value="All" control={<Radio />} label="All" />
                            </RadioGroup>
                        </FormControl>
                    </AccordionDetails>
                </Accordion>
                <Accordion disableGutters square expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
                    <AccordionSummary expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header">
                        <Stack sx={{ width: '100%' }}>
                            <Stack className='acc-title' direction="row" justifyContent="space-between">
                                <Stack direction="row" alignItems="center">
                                    <Typography>Experience</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                        <h3 style={{ fontWeight: 500 }}>Total Work Experience (Years)</h3>
                        <Stack className='mt-1 mb-1'
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-start"
                            spacing={1}
                        >
                            <FormControl style={{ width: '120px' }} >
                                <TextField size='small' placeholder='Min' />
                            </FormControl>
                            <label>-</label>
                            <FormControl style={{ width: '120px' }} >
                                <TextField size='small' placeholder='Max' />
                            </FormControl>
                        </Stack>
                        <h3 style={{ fontWeight: 500 }}>Management Experience (Years)</h3>
                        <Stack className='mt-1 mb-1'
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-start"
                            spacing={1}
                        >
                            <FormControl style={{ width: '120px' }} >
                                <TextField size='small' placeholder='Min' />
                            </FormControl>
                            <label>-</label>
                            <FormControl style={{ width: '120px' }} >
                                <TextField size='small' placeholder='Max' />
                            </FormControl>
                        </Stack>
                    </AccordionDetails>
                </Accordion>
                <Accordion disableGutters square expanded={expanded === 'panel9'} onChange={handleChange('panel9')}>
                    <AccordionSummary expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header">
                        <Stack sx={{ width: '100%' }}>
                            <Stack className='acc-title' direction="row" justifyContent="space-between">
                                <Stack direction="row" alignItems="center">
                                    <Typography>Certifications</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TextField fullWidth className='mt-1 mb-2'
                            variant="outlined"
                            placeholder="Certification"
                            size="small"
                        />
                    </AccordionDetails>
                </Accordion>
                <Accordion disableGutters square expanded={expanded === 'panel10'} onChange={handleChange('panel10')}>
                    <AccordionSummary expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header">
                        <Stack sx={{ width: '100%' }}>
                            <Stack className='acc-title' direction="row" justifyContent="space-between">
                                <Stack direction="row" alignItems="center">
                                    <Typography>Industries</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                        <label>Category :</label>
                        <Box>
                            <FormControl style={{ width: '200px' }} className='mt-1 mb-2'>
                                <label id="demo-simple-select-label">None</label>
                                <TextField
                                    select
                                    id="demo-simple-select"
                                    label="Age"
                                    size="small"
                                >
                                    <MenuItem value="None">None</MenuItem>
                                    <MenuItem value="0">Common End-user Software</MenuItem>
                                    <MenuItem value="1">Administrative or Clerical</MenuItem>
                                    <MenuItem value="4">CAD/CAM</MenuItem>
                                    <MenuItem value="5">Engineering</MenuItem>
                                    <MenuItem value="6">Environmental</MenuItem>
                                    <MenuItem value="7">Finance</MenuItem>
                                    <MenuItem value="9">Human Resources</MenuItem>
                                    <MenuItem value="10">Information Technology</MenuItem>
                                    <MenuItem value="11">General Non-Skilled Labor</MenuItem>
                                    <MenuItem value="12">Legal</MenuItem>
                                    <MenuItem value="13">Manufacturing</MenuItem>
                                    <MenuItem value="14">Marketing</MenuItem>
                                    <MenuItem value="15">Scientific</MenuItem>
                                    <MenuItem value="16">Telecommunications</MenuItem>
                                    <MenuItem value="19">Insurance</MenuItem>
                                    <MenuItem value="20">Sales</MenuItem>
                                    <MenuItem value="21">Aviation</MenuItem>
                                    <MenuItem value="22">Construction Non-Laborer</MenuItem>
                                    <MenuItem value="26">Power Engineering</MenuItem>
                                    <MenuItem value="27">Light Technical/Trades/Skilled Labor</MenuItem>
                                    <MenuItem value="28">Clinical</MenuItem>
                                    <MenuItem value="29">Hardware Engineering</MenuItem>
                                    <MenuItem value="31">Technical Writing</MenuItem>
                                    <MenuItem value="32">Degreed Accounting</MenuItem>
                                    <MenuItem value="33">Graphic Design</MenuItem>
                                    <MenuItem value="34">Business Operations and General Business</MenuItem>
                                    <MenuItem value="36">Travel</MenuItem>
                                    <MenuItem value="37">Recruiting</MenuItem>
                                    <MenuItem value="43">Distribution and Shipping</MenuItem>
                                    <MenuItem value="44">Petrochemical</MenuItem>
                                    <MenuItem value="45">Transmission &amp; Distribution</MenuItem>
                                    <MenuItem value="46">Call Center or Help Desk or Customer Service</MenuItem>
                                    <MenuItem value="64">Training</MenuItem>
                                    <MenuItem value="66">Facilities</MenuItem>
                                    <MenuItem value="67">Business Development</MenuItem>
                                    <MenuItem value="68">Entry Level</MenuItem>
                                    <MenuItem value="69">QA and QC</MenuItem>
                                    <MenuItem value="70">Research</MenuItem>
                                    <MenuItem value="71">Strategy and Planning</MenuItem>
                                    <MenuItem value="72">Installation, Maintenance, Repair</MenuItem>
                                    <MenuItem value="73">Grocery</MenuItem>
                                    <MenuItem value="74">Biotech/Life Sciences</MenuItem>
                                    <MenuItem value="75">Pharmaceutical</MenuItem>
                                    <MenuItem value="76">Broadcasting, Journalism</MenuItem>
                                    <MenuItem value="77">Education</MenuItem>
                                    <MenuItem value="78">Retail</MenuItem>
                                    <MenuItem value="80">General Management</MenuItem>
                                    <MenuItem value="81">Banking and Related</MenuItem><MenuItem value="82">Hotel and Hospitality</MenuItem>
                                    <MenuItem value="85">Architecture</MenuItem>
                                    <MenuItem value="86">Government</MenuItem>
                                    <MenuItem value="87">Warehouse</MenuItem>
                                    <MenuItem value="89">Bookkeeping, Office Management</MenuItem>
                                    <MenuItem value="90">Personal Attributes</MenuItem>
                                    <MenuItem value="91">Translations and Language Work</MenuItem>
                                    <MenuItem value="92">Knowledge and Learning Management</MenuItem>
                                    <MenuItem value="93">User Experience</MenuItem>
                                    <MenuItem value="94">Physician and NonNursing/NonAdmin</MenuItem>
                                    <MenuItem value="95">Healthcare Non-physician Non-nurse</MenuItem>
                                    <MenuItem value="96">Executive</MenuItem>
                                    <MenuItem value="97">Purchasing, Procurement, Inventory Control, Supply Chain</MenuItem>
                                    <MenuItem value="98">Security</MenuItem>
                                    <MenuItem value="99">Nursing</MenuItem>
                                </TextField>
                            </FormControl>
                        </Box>
                        <label>Subcategory :</label>
                        <Box>
                            <FormControl style={{ width: '200px' }} className='mt-1'>
                                <label id="demo-simple-select-label">None</label>
                                <TextField
                                    select
                                    id="demo-simple-select"
                                    label="Age"
                                    size="small"
                                >
                                    <MenuItem value="None">None</MenuItem>
                                </TextField>
                            </FormControl>
                        </Box>
                    </AccordionDetails>
                </Accordion>
                <Accordion disableGutters square expanded={expanded === 'panel11'} onChange={handleChange('panel11')}>
                    <AccordionSummary expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header">
                        <Stack sx={{ width: '100%' }}>
                            <Stack className='acc-title' direction="row" justifyContent="space-between">
                                <Stack direction="row" alignItems="center">
                                    <Typography>Spoken Languages</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormControl>
                            <TextField size='small' placeholder='Select Languages' />
                        </FormControl>
                    </AccordionDetails>
                </Accordion>
            </div> */}
            <div className="filterBtnWrap">
                <Button variant="text" onClick={onApplyFilters}>Apply Filters</Button>
            </div>
        </div>
    );
}
export default CommunityFilters;