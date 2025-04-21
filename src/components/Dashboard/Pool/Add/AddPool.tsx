import { React, useEffect, useState } from '../../../../shared/modules/React';
import { Grid, Button } from "../../../../shared/modules/commonImports";
import { Box } from "../../../../shared/modules/MaterialImports/Box";
import { TextField, FormControlLabel } from '../../../../shared/modules/MaterialImports/FormInputs';
import { MenuItem } from '../../../../shared/modules/MaterialImports/Menu';
import { Checkbox } from '../../../../shared/modules/MaterialImports/FormElements';
import { Switch } from '../../../../shared/modules/MaterialImports/Switch';
import { Chip } from '../../../../shared/modules/MaterialImports/Chip';
import Autocomplete from '@mui/material/Autocomplete';
//import FormControl from "@mui/material/FormControl";
import { Divider } from '../../../../shared/modules/MaterialImports/Divider';
import { useFormik, Yup } from "../../../../shared/modules/Formik";
import { showToaster } from '../../../shared/SnackBar/SnackBar';
import ApiService from '../../../../shared/api/api';
//import { MUIAutoComplete } from '../../../shared/MUIAutoComplete/MUIAutoComplete';
//import Editor from '../../../shared/EmailDialogBox/EmailBody';
//import ErrorMessage from '../../../shared/Error/ErrorMessage';
import { userLocalData } from '../../../../shared/services/userData';
import { Typography } from '../../../../shared/modules/MaterialImports/Typography';

import { Dialog, DialogContent, DialogTitle } from '../../../../shared/modules/MaterialImports/Dialog';
import './AddPool.scss';
import { trackPromise } from "../../../../shared/modules/PromiseTrackter";
//import { trackPromise } from "react-promise-tracker";
import Paper from "@mui/material/Paper";
import masterStatesList from "../../../../shared/data/States";
import { MUIAutoComplete } from "../../../shared/MUIAutoComplete/MUIAutoComplete";



const AddPool = (
    { open, closePopup, add, poolData }: {
        open: boolean;
        closePopup: (add: boolean) => void;
        add: boolean;
        poolData: any;
    }
) => {
    // console.log(poolData);
    const [checked, setChecked] = useState(false);
    const [condChecked, setCondChecked] = useState(false);
    const isCRMEnabled = userLocalData.adminSettings(30003)
    const isSovrenEnabled = userLocalData.adminSettings(20048);

    const CustomPaper = (props: any) => {
        return <Paper elevation={3} {...props} sx={{
            '& .MuiAutocomplete-option': {
                fontWeight: '600',
                color: 'var(--c-text-header)'
            }
        }} />;
    };
    const handleSkillChange = (event: any, values: any) => {
        const skillsString = values.join(',');
        addPoolFormik.setFieldValue('skills', skillsString);
    };
    const handleSharedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        const numericValue: number = event.target.checked ? 1 : 0;
        addPoolFormik.setFieldValue('criteria', numericValue);

        if (!event.target.checked) {
            addPoolFormik.setFieldValue('city', '')
            addPoolFormik.setFieldValue('zipcode', '')
            addPoolFormik.setFieldValue('jobType', '')
            addPoolFormik.setFieldValue('jobTitle', '')
            addPoolFormik.setFieldValue('state', '')
            addPoolFormik.setFieldValue('skills', '');
            addPoolFormik.setFieldValue('radius', 20)
            addPoolFormik.setFieldValue('jobId', '')
            addPoolFormik.setFieldValue('jobTitle', '');
            setCondChecked(false);
            addPoolFormik.setFieldValue('condition', 0);
            return;
        }

    }

    const fetchJobDetails = async (id: any) => {
        if (!id) {
            addPoolFormik.setFieldValue('city', '')
            addPoolFormik.setFieldValue('zipcode', '')
            addPoolFormik.setFieldValue('jobType', '')
            addPoolFormik.setFieldValue('jobTitle', '')
            addPoolFormik.setFieldValue('state', '')
            addPoolFormik.setFieldValue('skills', '');
            addPoolFormik.setFieldValue('radius', 20)
            return;
        }
        try {
            const response = await ApiService.getCall('admin', `getjobdatabase/${id}/${userLocalData.getvalue('clientId')}`);
            if (response.data.Success && response.data.Job && response.data.Job.length) {
                const jobDetails = response.data.Job[0];
                if (jobDetails.estEndDate && new Date(jobDetails.estEndDate) < new Date("1990-01-01")) {
                    jobDetails.estEndDate = "";
                }
                // console.log(jobDetails);
                addPoolFormik.setFieldValue('jobId', jobDetails.jobId)
                addPoolFormik.setFieldValue('jobTitle', jobDetails.jobTitle);
                addPoolFormik.setFieldValue('city', jobDetails.workCity);
                addPoolFormik.setFieldValue('state', jobDetails.workState || "");
                if (jobDetails.workZipcode !== 0) {
                    addPoolFormik.setFieldValue('zipcode', jobDetails.workZipcode);
                }
                addPoolFormik.setFieldValue('jobType', jobDetails.workType);

                // ApiService.getByParams(193, 'Curately/Jobs/job_overview.jsp', {
                //     clientId: userLocalData.getvalue('clientId'),
                //     jobId: id,
                // })
                ApiService.getCall('admin', `getJobOverview/${id}/${userLocalData.getvalue('clientId')}`)

                    .then((response) => {
                        // console.log(response.data)
                        // let tempSkills = (response.data.skills && Array.isArray(response.data.skills)) ? response.data.skills : []
                        // let skillsString = [...tempSkills, ...addPoolFormik.values.skills.split(',')].filter(n => n);
                        // let loadUniqueSkills = [...new Set(skillsString)]
                        // addPoolFormik.setFieldValue('skills', loadUniqueSkills.join(','));
                        addPoolFormik.setFieldValue('skills', '');
                        if (response.data) {
                            let tempSkills = response.data.List[0].skill.map((skillObj: { skill: any; }) => skillObj.skill);
                            let skillsString = [...tempSkills, ...addPoolFormik.values.skills.split(',')].filter(n => n);
                            let loadUniqueSkills = [...new Set(skillsString)];
                            addPoolFormik.setFieldValue('skills', loadUniqueSkills.join(','));
                        } else {
                            console.error('Job details not found');
                        }

                    })
            } else {
                console.error('Job details not found');
            }
        } catch (error) {
            console.error('Error fetching job details:', error);

        }
    };


    const handleNewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCondChecked(event.target.checked);
        const numericValue: number = event.target.checked ? 1 : 0;
        addPoolFormik.setFieldValue('condition', numericValue);
    }
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    // const [poolId, setPoolId] = useState("");

    const initialAddPoolDetails = poolData.poolId ? {

        "poolId": poolData.poolId,
        "poolName": poolData.poolName,
        "shared": poolData.shared ?? 1,
        "criteria": poolData.criteria,
        "notes": poolData.notes,
        "jobId": poolData.jobId,
        "jobTitle": poolData.jobTitle,
        "skills": poolData.skills,
        "street": poolData.street,
        "city": poolData.city,
        "state": poolData.state || "",
        "zipcode": poolData.zipcode,
        "radius": poolData.radius,
        "radiusType": poolData.radiusType,
        "jobType": poolData.jobType,
        "education": poolData.education,
        "condition": poolData.condition,
        "createdBy": userLocalData.getvalue('recrId'),

    } : {

        "poolId": 0,
        "poolName": "",
        "shared": 1,
        "notes": "",
        "jobId": "",
        "criteria": "",
        "jobTitle": "",
        "skills": "",
        "street": "",
        "city": "",
        "state": "",
        "zipcode": "",
        "radius": 20,
        "radiusType": "",
        "jobType": "",
        "education": "",
        "condition": false,
        "createdBy": userLocalData.getvalue('recrId'),

    }
    const addPoolSchema = Yup.object().shape({
        //    // "poolName": Yup.string().required('Pool Name is required.'),
        //     "poolName": Yup.string(),
        //     "poolId": Yup.string(),
        //    // "jobTitle": Yup.string().required('Job Title is required.'),
        //     "jobTitle": Yup.string(),
        //     "shared": Yup.string(),
        //     "notes": Yup.string(),
        //    // "jobId": Yup.string().required('Job Category * is required.'),
        //     "jobId": Yup.string(),
        //     "jobSkill": Yup.string(),
        //     "location": Yup.string(),
        //     "mileradius": Yup.string(),
        //     "jobType": Yup.string(),
        //     "mineducation": Yup.string(),
        //     "condition": Yup.string(),
        //     "entryDate": Yup.string(),
        "poolId": Yup.string(),
        "poolName": Yup.string().required('Pool Name is required.'),
        "shared": Yup.string(),
        "notes": Yup.string(),
        "jobId": Yup.string(),
        "jobTitle": Yup.string(),
        "skills": Yup.string(),
        "street": Yup.string(),
        "city": Yup.string(),
        "state": Yup.string(),
        "zipcode": Yup.string(),
        "radius": Yup.string(),
        "radiusType": Yup.string(),
        "jobType": Yup.string(),
        "education": Yup.string(),
        "condition": Yup.boolean(),
        "createdBy": Yup.string(),
    });
    const saveForm = () => {
        setIsFormSubmitted(true);
        console.log(addPoolFormik.values);
        if (condChecked && !addPoolFormik.values.jobId) {
            showToaster('Select any Job','error');
            return;
        }
        addPoolFormik.submitForm();
        if (addPoolFormik.isValid) {
            trackPromise(
                ApiService.postWithData("admin", 'saveorupdatetalentpool', { ...addPoolFormik.values, clientId: userLocalData.getvalue('clientId') }).then(
                    (response: any) => {
                        // console.log(response.data);
                        if (response.data.Success) {
                            // setPoolId(response.poolId);
                            // console.log(poolId);
                            // console.log(addPoolFormik.values);
                            const successMessage = addPoolFormik.values.poolId
                                ? 'Pool has been updated successfully.'
                                : 'Pool has been created successfully';
                            if (add && condChecked) {
                                showToaster('Pool has been created successfully. Candidates are being assigned in the background.', 'success');
                            } else {
                                showToaster(successMessage, 'success');
                            }
                            closePopup(true);
                            addPoolFormik.resetForm();
                            saveAuditLog(4099);
                        } else {
                            showToaster((response.data.Message) ? response.data.Message : 'An error occured', 'error')
                        }
                    })
            )
        } else {
            showToaster('Please fill all fields.', 'error');
        }
    }

    useEffect(() => {

        setIsChecked(poolData.shared ?? 1);
        setCondChecked(poolData.condition);
        // let confId = (poolData.criteria)? true : false;
        setChecked(poolData.criteria);
    }, []);

    const [isChecked, setIsChecked] = useState<boolean>(initialAddPoolDetails.shared === 1);

    const handleSharedCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // setIsChecked(event.target.checked);
        // const numericValue: number = event.target.checked ? 1 : 0;
        // addPoolFormik.setFieldValue('shared', numericValue);

        const checked = event.target.checked ? 1 : 0;
    setIsChecked(event.target.checked);
    addPoolFormik.setFieldValue('shared', checked);

    };

    const addPoolFormik = useFormik({
        initialValues: initialAddPoolDetails,
        validationSchema: addPoolSchema,
        onSubmit: () => {
            setIsFormSubmitted(true);
            //  console.log(addPoolFormik.values);
        },
        validateOnMount: true
    });

    const saveAuditLog = (id: number) => {
        ApiService.saveAuditLog(id);
    }

    return (
        <>
            <Dialog
                maxWidth={'md'}
                // sx={{ width: 900, maxWidth: 900, minWidth: 900 }}
                fullWidth={false} open={open} className='AddPoolModal customInputs' id='addPool'>

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
                            {add ? "Create New" : `${poolData.poolName} - Edit`} Pool
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
                                    onClick={() => closePopup(false)}
                                >Cancel</Button>
                                <Button variant="contained"
                                    type='button'
                                    color="primary"
                                    onClick={saveForm}
                                >{add ? "Create" : "Update"} Pool</Button>
                            </Grid>
                        </div>
                    </Grid>
                </DialogTitle>
                <Divider />
                <DialogContent className='px-0'>
                    <form
                        onSubmit={addPoolFormik.handleSubmit}
                    >
                        <div className='addPools-wrap'>
                            <div className='form-block'>
                                <Typography variant='h5' className='sub-heading'>Basic Information</Typography>
                                <div className='block-inner'>
                                    <Grid container spacing={1} >
                                        <Grid size={12} className='mt-1'>
                                            <label className='inputLabel'> Name</label><span style={{ color: 'red' }}>*</span>

                                            <TextField fullWidth
                                                id="poolName"
                                                name="poolName"
                                                variant="outlined"
                                                type="text"
                                                size="small"
                                                value={addPoolFormik.values.poolName}
                                                onChange={addPoolFormik.handleChange}
                                            />

                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={1} >
                                        <Grid size={6} className='mt-1'>
                                            <FormControlLabel
                                                control={<Checkbox checked={isChecked} onChange={handleSharedCheckboxChange} />}
                                                label="Shared "
                                                labelPlacement="end"
                                                id="shared"
                                                name="shared"
                                                value={addPoolFormik.values.shared}

                                                sx={{ ml: 0 }}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={1} >
                                        <Grid size={12} className='mt-1'>
                                            <label className='inputLabel'>Notes </label>
                                            <TextField fullWidth
                                                id="notes"
                                                name="notes"
                                                size="small"
                                                variant="outlined"
                                                type="text"
                                                multiline
                                                rows={2}
                                                value={addPoolFormik.values.notes}
                                                onChange={addPoolFormik.handleChange}
                                            />
                                        </Grid>

                                    </Grid>
                                </div>
                            </div>
                            <div className={`form-block ${(Boolean(isCRMEnabled) || !isSovrenEnabled) ? "d-none" : "d-block"} `}>

                                <Typography variant='h5' className='sub-heading' >Candidate Match Criteria

                                    <div className="floatright" >
                                        <FormControlLabel
                                            control={<Switch checked={checked} onChange={handleSharedChange} />}
                                            label=" "
                                            labelPlacement="end"
                                            id="criteria"
                                            name="criteria"
                                            value={addPoolFormik.values.criteria}
                                            onChange={addPoolFormik.handleChange}
                                        />

                                    </div>
                                </Typography>

                                <div className={`block-inner ${checked ? "d-block" : "d-none"}`}>

                                    <Grid container spacing={1} >
                                        <Grid size={6} className='mt-1 pr-2'>
                                            <Box>
                                                <Typography className="pb-1">Select a Job to prefill the match criteria</Typography>
                                                {/* <label className='inputLabel'>  Select Job</label> */}
                                                <MUIAutoComplete
                                                    id='jobTitle'
                                                    handleChange={(id: any, name: string) => {
                                                        addPoolFormik.setFieldValue('jobId', id);
                                                        addPoolFormik.setFieldValue('jobTitle', name);
                                                        fetchJobDetails(id);
                                                    }}
                                                   //  handleChange={fetchJobDetails}
                                                    valuePassed={(addPoolFormik.values.jobId) ? { label: addPoolFormik.values.jobTitle, id: addPoolFormik.values.jobId } : {}}
                                                    isMultiple={false}
                                                    textToShow=""
                                                    width="100%"
                                                    type='jobTitle'
                                                    placeholder="Select Job"
                                                />
                                                {/* <TextField
                                                    fullWidth
                                                    id="jobId"
                                                    name="jobId"
                                                    size="small"
                                                    variant="outlined"
                                                    select

                                                    value={addPoolFormik.values.jobId}
                                                    onChange={addPoolFormik.handleChange}

                                                >
                                                    <MenuItem value=""></MenuItem>
                                                    <MenuItem value="490">Accounting Finance</MenuItem>
                                                    <MenuItem value="463">Admin Clerical</MenuItem>
                                                    <MenuItem value="37">Call Center</MenuItem>
                                                    <MenuItem value="492">Clinical</MenuItem>
                                                    <MenuItem value="491">Creative Marketing</MenuItem>
                                                    <MenuItem value="39">Engineering</MenuItem>
                                                    <MenuItem value="494">Health IT</MenuItem>
                                                    <MenuItem value="493">Healthcare</MenuItem>
                                                    <MenuItem value="58">Human Resources</MenuItem>
                                                    <MenuItem value="102">Industrial</MenuItem>
                                                    <MenuItem value="59">Information Technology</MenuItem>
                                                    <MenuItem value="497">Lab</MenuItem>
                                                    <MenuItem value="63">Legal</MenuItem>
                                                    <MenuItem value="498">Pharma</MenuItem>
                                                    <MenuItem value="496">Professional</MenuItem>
                                                    <MenuItem value="72">Sales</MenuItem>
                                                    <MenuItem value="103">Scientific</MenuItem>
                                                    <MenuItem value="495">Supply Chain</MenuItem>

                                                </TextField> */}

                                            </Box>
                                        </Grid>
                                        <Grid size={12} className='pr-2'>
                                            <label className='inputLabel'> Job Title</label>

                                            <TextField fullWidth
                                                id="jobTitle"
                                                name="jobTitle"
                                                size="small"
                                                variant="outlined"
                                                type="text"
                                                value={addPoolFormik.values.jobTitle}
                                                onChange={addPoolFormik.handleChange}

                                            />

                                        </Grid>

                                        <Grid size={12} className='pr-2'>
                                            <label className='inputLabel'> Skills</label>
                                            {/* <TextField fullWidth
                                                id="skills"
                                                name="skills"
                                                variant="outlined"
                                                type="text"
                                                size="small"
                                                value={addPoolFormik.values.skills}
                                                onChange={addPoolFormik.handleChange}
                                            /> */}

                                            {/* <Autocomplete
                                              multiple
                                                id="skills"
                                                size="small"
                                                options={inputOptions}
                                                  sx={{ marginTop: "5px", marginBottom: "15px", }}
                                                 value={addPoolFormik.values.skills.split(',')}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        variant="outlined"
                                                        size="small"
                                                        />
                                                )}
                                                onChange={(e, value) => addPoolFormik.setFieldValue("skills", value.toString())}
                                               /> */}
                                            <Autocomplete
                                                multiple
                                                id="tags-filled"
                                                options={[]}
                                                freeSolo
                                                size="small"
                                                renderTags={(value, getTagProps) =>
                                                    value.map((option, index) => (
                                                        <Chip variant="outlined" label={option} size="small" {...getTagProps({ index })} />
                                                    ))
                                                }
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        variant="outlined"
                                                        // label="Skills"
                                                        placeholder="Enter Skills"
                                                    />
                                                )}
                                                onChange={handleSkillChange}
                                                value={addPoolFormik.values.skills ? addPoolFormik.values.skills.split(',') : []}
                                            />



                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={1} >
                                        <Grid size={6} className='mt-1 pr-2'>
                                            <label className='inputLabel'> City</label>

                                            <TextField fullWidth
                                                id="city"
                                                name="city"
                                                size="small"
                                                variant="outlined"
                                                type="text"
                                                value={addPoolFormik.values.city}
                                                onChange={addPoolFormik.handleChange}

                                            />


                                        </Grid>
                                        <Grid size={6} className='mt-1 pr-2'>
                                            <label className='inputLabel'> State</label>
                                            <Autocomplete

                                                id='state'
                                                options={masterStatesList.map((option) => option.label)}
                                                value={addPoolFormik.values.state}
                                                freeSolo
                                                renderTags={(value: readonly string[], getTagProps) =>
                                                    value.map((option: string, index: number) => (
                                                        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                                    ))
                                                }
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        variant="outlined"
                                                        placeholder="Select states"
                                                    />
                                                )}
                                                PaperComponent={CustomPaper}
                                                onChange={(e, value) => addPoolFormik.setFieldValue("state", value || "")}
                                                sx={{ mb: 1 }}
                                            />
                                            {/* <TextField fullWidth

                                                id="state"
                                                name='state'
                                                size="small"
                                                variant="outlined"
                                                select
                                                value={addPoolFormik.values.state}
                                                onChange={addPoolFormik.handleChange}
                                            >
                                                <MenuItem value="--Select State--">--Select State--</MenuItem>
                                                <MenuItem value="AL">Alabama</MenuItem>
                                                <MenuItem value="AK">Alaska</MenuItem>
                                                <MenuItem value="AZ">Arizona</MenuItem>
                                                <MenuItem value="AR">Arkansas</MenuItem>
                                                <MenuItem value="CA">California</MenuItem>
                                                <MenuItem value="CO">Colorado</MenuItem>
                                                <MenuItem value="CT">Connecticut</MenuItem>
                                                <MenuItem value="DC">District of Columbia</MenuItem>
                                                <MenuItem value="DE">Delaware</MenuItem>
                                                <MenuItem value="FL">Florida</MenuItem>
                                                <MenuItem value="GA">Georgia</MenuItem>
                                                <MenuItem value="HI">Hawaii</MenuItem>
                                                <MenuItem value="ID">Idaho</MenuItem>
                                                <MenuItem value="IL">Illinois</MenuItem>
                                                <MenuItem value="IN">Indiana</MenuItem>
                                                <MenuItem value="IA">Iowa</MenuItem>
                                                <MenuItem value="KS">Kansas</MenuItem>
                                                <MenuItem value="KY">Kentucky</MenuItem>
                                                <MenuItem value="LA">Louisiana</MenuItem>
                                                <MenuItem value="ME">Maine</MenuItem>
                                                <MenuItem value="MD">Maryland</MenuItem>
                                                <MenuItem value="MA">Massachusetts</MenuItem>
                                                <MenuItem value="MH">Marshall Islands</MenuItem>
                                                <MenuItem value="MI">Michigan</MenuItem>
                                                <MenuItem value="MN">Minnesota</MenuItem>
                                                <MenuItem value="MS">Mississippi</MenuItem>
                                                <MenuItem value="MO">Missouri</MenuItem>
                                                <MenuItem value="MT">Montana</MenuItem>
                                                <MenuItem value="NE">Nebraska</MenuItem>
                                                <MenuItem value="NV">Nevada</MenuItem>
                                                <MenuItem value="NH">New Hampshire</MenuItem>
                                                <MenuItem value="NJ">New Jersey</MenuItem>
                                                <MenuItem value="NM">New Mexico</MenuItem>
                                                <MenuItem value="NY">New York</MenuItem>
                                                <MenuItem value="NC">North Carolina</MenuItem>
                                                <MenuItem value="ND">North Dakota</MenuItem>
                                                <MenuItem value="OH">Ohio</MenuItem>
                                                <MenuItem value="OK">Oklahoma</MenuItem>
                                                <MenuItem value="OR">Oregon</MenuItem>
                                                <MenuItem value="PA">Pennsylvania</MenuItem>
                                                <MenuItem value="RI">Rhode Island</MenuItem>
                                                <MenuItem value="SC">South Carolina</MenuItem>
                                                <MenuItem value="SD">South Dakota</MenuItem>
                                                <MenuItem value="TN">Tennessee</MenuItem>
                                                <MenuItem value="TX">Texas</MenuItem>
                                                <MenuItem value="UT">Utah</MenuItem>
                                                <MenuItem value="VT">Vermont</MenuItem>
                                                <MenuItem value="VA">Virginia</MenuItem>
                                                <MenuItem value="WA">Washington</MenuItem>
                                                <MenuItem value="WV">West Virginia</MenuItem>
                                                <MenuItem value="WI">Wisconsin</MenuItem>
                                                <MenuItem value="WY">Wyoming</MenuItem>
                                            </TextField> */}
                                            {/* <ErrorMessage formikObj={addJobFormik} name={'stateOrPro'} isFormSubmitted={isFormSubmitted}></ErrorMessage> */}


                                        </Grid>

                                        <Grid size={6} className='mt-1 pr-2'>
                                            <label className='inputLabel'> Zipcode</label>

                                            <TextField fullWidth
                                                id="zipcode"
                                                name="zipcode"
                                                size="small"
                                                variant="outlined"
                                                type="text"
                                                value={addPoolFormik.values.zipcode}
                                                onChange={addPoolFormik.handleChange}

                                            />

                                        </Grid>
                                        <Grid size={6} className='mt-1 pr-2'>
                                            <label className='inputLabel'>Mile Radius</label>

                                            <TextField
                                                fullWidth
                                                id="radius"
                                                name="radius"
                                                size="small"
                                                select
                                                defaultValue={20}
                                                value={addPoolFormik.values.radius}
                                                onChange={addPoolFormik.handleChange}
                                            >
                                                <MenuItem value="">Select miles</MenuItem>
                                                <MenuItem value="5">5 miles</MenuItem>
                                                <MenuItem value="10">10 miles</MenuItem>
                                                <MenuItem value="20">20 miles</MenuItem>
                                                <MenuItem value="30">30 miles</MenuItem>
                                                <MenuItem value="40">40 miles</MenuItem>
                                                <MenuItem value="50">50 miles</MenuItem>
                                                <MenuItem value="75">75 miles</MenuItem>
                                                <MenuItem value="10">100 miles</MenuItem>
                                            </TextField>

                                        </Grid>
                                        <Grid size={6} className='pr-2'>
                                            <label className='inputLabel'> Job Type</label>

                                            <TextField
                                                fullWidth
                                                id="jobType"
                                                name="jobType"
                                                size="small"
                                                select
                                                value={addPoolFormik.values.jobType}
                                                onChange={addPoolFormik.handleChange}
                                            >

                                                <MenuItem value="0"></MenuItem>
                                                <MenuItem value="1">Permanent </MenuItem>
                                                <MenuItem value="2">Contract/Temp </MenuItem>
                                                <MenuItem value="3">Contract to Perm </MenuItem>
                                                <MenuItem value="4">Freelance</MenuItem>
                                            </TextField>
                                        </Grid>
                                        <Grid size={6} className='pr-2'>
                                            <label className='inputLabel'> Education</label>

                                            <TextField fullWidth
                                                id="education"
                                                name="education"
                                                size="small"
                                                variant="outlined"
                                                type="text"
                                                value={addPoolFormik.values.education}
                                                onChange={addPoolFormik.handleChange}

                                            />

                                        </Grid>
                                    </Grid>
                                    <Grid size={12} className='pr-2 mt-2'>
                                        <FormControlLabel
                                            control={<Checkbox checked={condChecked} onChange={handleNewChange} />}
                                            label="Auto Add community member with matching Score above 70 to the talent pool"
                                            labelPlacement="end"
                                            id="condition"
                                            name="condition"
                                            value={addPoolFormik.values.condition}
                                            sx={{ ml: 0 }}
                                        />
                                    </Grid>
                                </div>
                            </div>

                        </div>

                    </form >
                </DialogContent >

            </Dialog>
        </>
    )
}
export default AddPool

const JobSkillsData = [
    { title: 'Active listening' },
    { title: 'Adaptability' },
    { title: 'Administration' },
    { title: 'Advocacy' },
    { title: 'Analysis' },
    { title: 'Analytical' },
    { title: 'Assertiveness' },
    { title: 'Attention to detail' },
    { title: 'Business analysis' },
    { title: 'Business ethics' },
    { title: 'Business intelligence' },
    { title: 'Business management' },
    { title: 'Business writing' },
    { title: 'Coaching' },
    { title: 'Collaboration' },
    { title: 'Commercial awareness' },
    { title: 'Communication' },
    { title: 'Computer literacy' },
    { title: 'Consulting' },
    { title: 'Coordination' },
    { title: 'Cooperation' },
    { title: 'Creative thinking' },
    { title: 'Creativity' },
    { title: 'Critical thinking' },
    { title: 'Customer care' },
    { title: 'Customer service' },
    { title: 'Data analysis' },
    { title: 'Data entry' },
    { title: 'Data management' },
    { title: 'Debating' },
    { title: 'Decision making' },
    { title: 'Dedication' },
    { title: 'Diplomacy' },
    { title: 'Disability awareness' },
    { title: 'Dispute resolution' },
    { title: 'Driving licence' },
    { title: 'Emotional intelligence' },
    { title: 'Empathetic' },
    { title: 'Energetic' },
    { title: 'Entrepreneurial' },
    { title: 'Facilitator' },
    { title: 'Innovative' },
    { title: 'Inspirational' },
    { title: 'Intercultural' },
    { title: 'Interpersonal communication' },
    { title: 'Information Technology' },
    { title: 'Leadership' },
    { title: 'Leadership communication' },
    { title: 'Leadership development' },
    { title: 'Leading a team' },
    { title: 'Literacy' },
    { title: 'Logical thinking' },
    { title: 'Management' },
    { title: 'Management communication' },
    { title: 'Management development' },
    { title: 'Managing a team' },
    { title: 'Managing ambiguity' },
    { title: 'Managing difficult conversations' },
    { title: 'Managing remote teams' },
    { title: 'Meeting management' },
    { title: 'Mentoring' },
    { title: 'Motivational' },
    { title: 'Multitasking' },
    { title: 'Navigation' },
    { title: 'Negotiation' },
    { title: 'Networking' },
    { title: 'Nonverbal communication' },
    { title: 'Note taking' },
    { title: 'Office administration' },
    { title: 'People management' },
    { title: 'Perseverant' },
    { title: 'Persistent' },
    { title: 'Personal development' },
    { title: 'Planning' },
    { title: 'Presentation' },
    { title: 'Productivity' },
    { title: 'Project coordination' },
    { title: 'Project management' },
    { title: 'Proofreading' },
    { title: 'Public speaking' },
    { title: 'Reading body language' },
    { title: 'Reading comprehension' },
    { title: 'Reasoning' },
    { title: 'Relationship building' },
    { title: 'Relationship management' },
    { title: 'Report writing' },
    { title: 'Research' },
    { title: 'Risk management' },
    { title: 'Self awareness' },
    { title: 'Self management' },
    { title: 'Self motivated' },
    { title: 'Sense of humour' },
    { title: 'Stakeholder management' },
    { title: 'Strategic planning' },
    { title: 'Strategic thinking skills' },
    { title: 'Supervising' },
    { title: 'Team building' },
    { title: 'Team leadership' },
    { title: 'Team management' },
    { title: 'Team player' },
    { title: 'Teamwork' },
    { title: 'Time management' },
    { title: 'Timekeeping' },
    { title: 'Training' },
    { title: 'Troubleshooting' },
    { title: 'Tutoring' },
    { title: 'Typing' },
    { title: 'Work ethic' },
    { title: 'Writing English' },
    { title: 'Written communication' },
];