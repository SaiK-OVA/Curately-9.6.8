import { useState, useEffect, useRef } from '../../../../shared/modules/React';
import {Grid, Button, InputAdornment, InputLabel, IconButton} from '../../../../shared/modules/commonImports';
import {Stack} from '../../../../shared/modules/MaterialImports/Stack';
import masterStatesList from '../../../../shared/data/States';

import {Card,CardContent} from '../../../../shared/modules/MaterialImports/Card';
import {Radio, RadioGroup, Checkbox, Select}  from '../../../../shared/modules/MaterialImports/FormElements';
import {TextField, FormControl, FormControlLabel} from '../../../../shared/modules/MaterialImports/FormInputs';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {Box} from '../../../../shared/modules/MaterialImports/Box';
// import Autocomplete from '@mui/material/Autocomplete';
// import { showToaster } from '../../../shared/SnackBar/SnackBar';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { DEGREE_TYPES, TAXONOMIES } from '../../../../shared/data/Community/Community';
// import masterStatesList from '../../../../shared/data/States';
// import OutlinedInput from '@mui/material/OutlinedInput';
import {ListItemText} from '../../../../shared/modules/MaterialImports/List';
// import Paper from '@mui/material/Paper';
import {Menu,MenuItem} from '../../../../shared/modules/MaterialImports/Menu';

import {
    // FieldArray,
    Form,
    Formik,
    useFormik,
    Yup
} from '../../../../shared/modules/Formik';


import ApiService from '../../../../shared/api/api';
import {Accordion, AccordionSummary, AccordionDetails}  from '../../../../shared/modules/MaterialImports/Accordion';
import {Typography} from '../../../../shared/modules/MaterialImports/Typography';
import {Chip} from '../../../../shared/modules/MaterialImports/Chip';
import {Dialog, DialogTitle, DialogContent, DialogActions} from '../../../../shared/modules/MaterialImports/Dialog';
// import DialogContentText from '@mui/material/DialogContentText';
// import Editor from '../../../shared/EmailDialogBox/EmailBody';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// import { trackPromise } from 'react-promise-tracker';
import { useDebounce } from '../../../../shared/services/useDebounce';

import './TalentFilters.scss';
import { MUIAutoComplete } from '../../../shared/MUIAutoComplete/MUIAutoComplete';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { trackPromise } from '../../../../shared/modules/PromiseTrackter';
import { useParams } from 'react-router-dom';
// import { userLocalData } from '../../../../shared/services/userData';
// import { showToaster } from '../../../shared/SnackBar/SnackBar';

const stringArray: string[] = [];


const TalentFilters = ({ onApply, updateJobDetails }: { onApply: any, updateJobDetails: any }) => {

    const { talentPoolId = "" } = useParams();
    const talentPoolName = talentPoolId ? localStorage.getItem('talentPoolName_' + talentPoolId) : "";


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
                recentUse: Yup.boolean(),
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
        languageSpoken: Yup.array(),
        jobDescription: Yup.string(),
        selectedJobTitle: Yup.string(),
        selectedJobId: Yup.string(),
        parsedDocument: Yup.string(),
        talentPoolId: Yup.string(),
        talentPoolName: Yup.string(),
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
                state: "",
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
                    recentUse: false,
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
            daysBack: "3650",
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
            languageSpoken: "",
            jobDescription: "",
            selectedJobTitle: "",
            selectedJobId: "",
            parsedDocument: "",
            talentPoolId: talentPoolId,
            talentPoolName: talentPoolName,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // console.log('Form values:', values);
        },
    });
    // 208057


    const [expanded, setExpanded] = useState<string | false>(false);
    const [jobTitleSuggestions, setJobTitleSuggestions] = useState([]);
    const [selectedJobTitle, setSelectedJobTitle] = useState({
        title: "",
        id: ""
    });


    const getStateById = (id: string) => {
        let tempObj = masterStatesList.find((obj) => {
            return obj.id === id
        });
        return (tempObj && tempObj.label) ? tempObj.label : ""
    }

    const getCategoryLabel = (id: string) => {
        let tempObj = TAXONOMIES.find((obj) => {
            return obj.id === id
        });
        return (tempObj && tempObj.name) ? tempObj.name : ""
    }
    const searchSkillsFromDescription = (id = "", desc = "") => {
        if (id || desc) {
            let dataToPass: any = {
            }
            if (id) {
                dataToPass.jobid = id;
            }
            if (desc) {
                dataToPass.descr = desc.replace(/[^a-zA-Z0-9~`!@#$%^&*()_+-={}|:;<>,.?\/ \n[\]']/g, "").replace(/\s+/g, ' ').replace('\\r\\n', ' ').replaceAll('\\', ' ').replaceAll('\n', ' ');
            }
            trackPromise(
                ApiService.getByParams(193, 'Curately/Sovren/sovren_curately_comunity_sovren_skills.jsp', dataToPass)
                    .then(
                        (result: any) => {
                            // console.log(result);
                            if (result.data && result.data && ((result.data.skills && result.data.skills.length) || (result.data.jobTitle && result.data.jobTitle.trim()) || (result.data.ParsedDocument && result.data.ParsedDocument.trim()))) {
                                let tempData = { ...communityFormik.values };
                                if (result.data.skills && result.data.skills.length) {

                                    let tempSkills = [{
                                        recentUse: true,
                                        experLevel: "",
                                        skillName: ""
                                    }];
                                    tempSkills = [];
                                    for (let ts = 0; ts < result.data.skills.length; ts++) {
                                        if (result.data.skills[ts]) {
                                            tempSkills.push({
                                                recentUse: true,
                                                experLevel: "",
                                                skillName: result.data.skills[ts]
                                            });
                                        }
                                    }
                                    if (tempSkills.length) {
                                        // let skillsTempArray = [
                                        //     ...communityFormik.values.skills
                                        // ];
                                        // for (let st = 0; st < tempSkills.length; st++) {
                                        //     skillsTempArray.push(tempSkills[st]);
                                        // }
                                        tempData.skills = tempSkills;
                                        communityFormik.setFieldValue('skills', tempSkills);
                                    } else {
                                        tempData.skills = [];
                                        communityFormik.setFieldValue('skills', []);
                                    }
                                }
                                if (result.data.jobTitle && result.data.jobTitle.trim()) {
                                    tempData.jobTitles = [{
                                        title: result.data.jobTitle,
                                        required: false
                                    }];
                                    communityFormik.setFieldValue('jobTitles', [{
                                        title: result.data.jobTitle,
                                        required: false
                                    }]);
                                }
                                else {
                                    tempData.jobTitles = [];
                                    communityFormik.setFieldValue('jobTitles', []);
                                }
                                if (result.data.ParsedDocument && result.data.ParsedDocument.trim()) {

                                    tempData.parsedDocument = result.data.ParsedDocument;
                                    communityFormik.setFieldValue('parsedDocument', result.data.ParsedDocument);
                                }
                                else {
                                    tempData.parsedDocument = "";
                                    communityFormik.setFieldValue('parsedDocument', "");
                                }
                                onApply(tempData);
                            }
                        }
                    )
            )
        }
    }
    const indexToReplace = useRef({
        job: -1,
        skill: -1
    });

    const searchJobTitles = (val: string, index: number) => {
        indexToReplace.current = {
            ...indexToReplace.current,
            job: index
        }
        ApiService.postWithData('CHAT', 'lighthouse', {
            inputType: "title",
            query: val,
            limit: "5"
        }
        ).then(
            (result: any) => {
                // console.log(result);
                if (result.data && result.data.data && result.data.data.length) {
                    setJobTitleSuggestions(result.data.data);
                }
            }
        )
    }
    const deleteJobTitleSuggestionById = (id: string) => {
        setJobTitleSuggestions(e => e.filter((data: { name: string, id: string }) => data.id !== id))
    }

    const searchJobTitlesWithDebounce = useDebounce(searchJobTitles);

    const [skillSuggestions, setSkillSuggestions] = useState([]);

    const searchSkills = (val: string, index: number) => {
        indexToReplace.current = {
            ...indexToReplace.current,
            skill: index
        }

        ApiService.postWithData('CHAT', 'lighthouse', {
            inputType: "skill",
            query: val,
            limit: "5"
        }
        ).then(
            (result: any) => {
                // console.log(result);
                if (result.data && result.data.data && result.data.data.length) {
                    setSkillSuggestions(result.data.data);
                }
            }
        )
    }
    const deleteSkillSuggestionById = (id: string) => {
        setSkillSuggestions(e => e.filter((data: { name: string, id: string }) => data.id !== id))
    }

    const searchSkillsWithDebounce = useDebounce(searchSkills);

    // function handleClearCertifications(event: any) {
    //     event.stopPropagation();
    //     communityFormik.setFieldValue('certifications', []);
    // }
    function handleClear(event: any, field: any, index = -1) {
        event.stopPropagation();

        // if (index > -1) {  
        //   let newValues = [...values];
        //   newValues.splice(index, 1);
        //   communityFormik.setFieldValue(field, newValues);
        // } else {  // This means the Clear icon was clicked
        //   communityFormik.setFieldValue(field, []);
        // }
    }

    // function handleClearIndustries(event: any) {
    //     event.stopPropagation();
    //     communityFormik.setFieldValue('industries', []);
    // }

    // const CustomPaper = (props: any) => {
    //     return <Paper elevation={3} {...props} sx={{
    //         '& .MuiAutocomplete-option': {
    //             fontWeight: '600',
    //             color: 'var(--c-text-header)'
    //         }
    //     }} />;
    // };


    // const handleRemoveCertification = (index: number) => {
    //     const newCertifications = [...communityFormik.values.certifications];
    //     newCertifications.splice(index, 1);
    //     communityFormik.setFieldValue("certifications", newCertifications);
    // };
    const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };


    const searchResumes = (e: any) => {
        e.preventDefault();
        // console.log(communityFormik.values.jobTitleSwitch)
    }

    const onApplyFilters = () => {
        console.log(communityFormik.values);
        onApply(communityFormik.values);
    }

    const getSubCatList = (val: string) => {
        if (val) {
            let tempSubTax = TAXONOMIES.find(o => o.id === val);
            return (tempSubTax?.subtaxonomies) ? tempSubTax?.subtaxonomies : [];
        } else {
            return [];
        }
    }

    const [descModalOpen, setDescModalOpen] = useState(false);
    const [jobModalOpen, setJobModalOpen] = useState(false);
    const [anchorMenuEl, setAnchorMenuEl] = useState<null | HTMLElement>(null);
    const menuOpen = Boolean(anchorMenuEl);

    useEffect(() => {
        onApply(communityFormik.values);
    }, []);

    console.log(communityFormik.values)
    const updateCommunityFormik = (type: 'add' | 'delete' | 'update', val: any, objectName: 'jobTitles' | 'skills' | 'employer' | 'schools' | 'degrees' | 'certifications' | 'industries', index?: number) => {
        setTimeout(() => {
            let objToModify = [
                ...communityFormik.values[objectName]
            ];
            if (type === 'delete') {
                objToModify.splice(index || 0, 1);
            }
            if (type === 'update') {
                if (objectName === 'jobTitles') {
                    // @ts-ignore
                    objToModify[index].title = val;
                } else if (objectName === 'skills') {
                    // @ts-ignore
                    objToModify[index].skillName = val;
                }
            }
            if (type === 'add') {
                if (objectName === 'jobTitles') {
                    if (indexToReplace.current.job !== -1) {
                        objToModify[indexToReplace.current.job] = val;
                    } else {
                        searchJobTitles(val.title, -1);
                        objToModify.push(val);
                    }
                    indexToReplace.current = {
                        ...indexToReplace.current,
                        job: -1
                    }
                }
                else if (objectName === 'skills') {
                    if (indexToReplace.current.skill !== -1) {
                        objToModify[indexToReplace.current.skill] = val;
                    } else {
                        searchSkills(val.skillName, -1);
                        objToModify.push(val);
                    }
                    indexToReplace.current = {
                        ...indexToReplace.current,
                        skill: -1
                    }
                } else {
                    objToModify.push(val);
                }
            }
            communityFormik.setFieldValue(objectName, objToModify);
        }, 150);
    }

    const countSelectedFilters = () => {

        let count = 0;
        if (communityFormik.values.keywords !== "") count++;
        if (communityFormik.values.jobTitles.some(jobtitle => jobtitle.title)) count++;
        if (communityFormik.values.skills.some(skill => skill.skillName)) count++;
        if (communityFormik.values.location.state.length > 0) count++;
        if (communityFormik.values.location.zipCode !== "") count++;
        if (communityFormik.values.location.radius !== "") count++;
        if (communityFormik.values.workAuthorization.title !== "") count++;
        if (communityFormik.values.employer.some(employer => employer.employerName)) count++;
        if (communityFormik.values.degTypes.length) count++;
        if (communityFormik.values.schools.some(school => school.schoolName)) count++;
        // if (communityFormik.values.talentPoolName !== "") count++;
        if (communityFormik.values.degrees.some(degree => degree.degreeName)) count++;
        if (communityFormik.values.certifications.some(certification => certification.certificationName)) count++;
        if (communityFormik.values.industries.some(industry => industry.indcate || industry.subCat)) count++;
        if (communityFormik.values.languageSpoken !== "") count++;
        return count;
    }

    const handleClearAllFilters = () => {
        communityFormik.resetForm();
    };
    // const getTextFromHTML = (html: string) => {
    //     let divContainer = document.createElement("textarea");
    //     divContainer.innerHTML = html;
    //     return divContainer.value || divContainer.innerText || "";
    // }

    // const getJobDescription = (id: string) => {
    //     trackPromise(
    //         ApiService.getByParams(193, '/Jobs/job_details.jsp', {
    //             jobId: id,
    //             userName: userLocalData.getvalue('userName'),
    //             userId: userLocalData.getvalue('recrId')
    //         })
    //             .then((result) => {

    //                 // setJobsData(result);
    //                 // console.log(result.data);
    //                 let jobDescriptionTemp = result?.data?.Details?.txtJobDescription || result?.data?.Details?.txtJobDescription1;
    //                 jobDescriptionTemp = getTextFromHTML(jobDescriptionTemp);
    //                 if (jobDescriptionTemp && jobDescriptionTemp.trim()) {
    //                     searchSkillsFromDescription(jobDescriptionTemp);
    //                 } else {
    //                     showToaster('No Job Description found.', 'warning');
    //                 }
    //             })
    //     )
    // }


    return (
        <div className='accordian-wrap customFilterChips'>
            <Stack direction="row" justifyContent="space-between" className='heading'>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography component="h5">Filters</Typography>
                    {countSelectedFilters() > 0 && (
                        <Stack
                            className='clearStack'
                            direction="row"
                            justifyContent="space-around"
                            onClick={handleClearAllFilters}
                        >
                            <CloseIcon />
                            <Typography>{(communityFormik.values.keywords !== "" ? 1 : 0) +
                                (communityFormik.values.jobTitles.reduce((count, obj) => obj.title ? ++count : count, 0)) +
                                (communityFormik.values.skills.reduce((count, obj) => obj.skillName ? ++count : count, 0)) +
                                (communityFormik.values.allSkills !== "" ? 1 : 0) +
                                (communityFormik.values.location.state.length ? 1 : 0) +
                                (communityFormik.values.location.zipCode !== "" ? 1 : 0) + (communityFormik.values.workAuthorization.title !== "" ? 1 : 0) +
                                (communityFormik.values.employer.reduce((count, obj) => obj.employerName ? ++count : count, 0)) + (communityFormik.values.degTypes.length > 0 ? 1 : 0) + communityFormik.values.industries.reduce((count, obj) => obj.indcate ? ++count : count, 0)
                                + (communityFormik.values.languageSpoken ? communityFormik.values.languageSpoken.split(',').length : 0) +
                                communityFormik.values.certifications.reduce((count, obj) => obj.certificationName ? ++count : count, 0) + communityFormik.values.schools.reduce((count, obj) => obj.schoolName ? ++count : count, 0) +
                                communityFormik.values.degrees.reduce((count, obj) => obj.degreeName ? ++count : count, 0) +
                                communityFormik.values.certifications.reduce((count, obj) => obj.certificationName ? ++count : count, 0)
                            }</Typography>
                        </Stack>
                    )}
                </Stack>
                <div>
                    <Button
                        id="import-button"
                        aria-controls={menuOpen ? 'import-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={menuOpen ? 'true' : undefined}
                        onClick={(event) => setAnchorMenuEl(event.currentTarget)}
                        sx={{ textTransform: 'none' }}
                    >
                        Import
                        {menuOpen ? <KeyboardArrowDownIcon sx={{ transform: 'scaleY(-1)', height: '16px' }} /> : <KeyboardArrowDownIcon sx={{ height: '16px' }} />}
                    </Button>
                    <Menu
                        id="import-menu"
                        anchorEl={anchorMenuEl}
                        open={menuOpen}
                        onClose={() => setAnchorMenuEl(null)}
                        MenuListProps={{
                            'aria-labelledby': 'import-button',
                        }}
                    >
                        <MenuItem
                            onClick={() => {
                                setJobModalOpen(true);
                                setAnchorMenuEl(null);
                            }}
                            className='fw-6'
                        >
                            Search by Job
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                setDescModalOpen(true);
                                setAnchorMenuEl(null);
                            }}
                            className='fw-6'
                        >
                            Search by Job Description
                        </MenuItem>
                    </Menu>
                </div>
            </Stack >
            <Grid className='py-2 pl-4 pr-2 fs-12 fw-5' sx={{ cursor: 'pointer' }} onClick={() => {
                setJobModalOpen(true);
                setAnchorMenuEl(null);
            }}>
                {(selectedJobTitle.title) ? "Job: " : ""}
                <span className='c-darkGrey fs-13'>{selectedJobTitle.title}</span>
            </Grid>
            <Formik
                // onSubmit={() => communityFormik.handleChange}
                // enableReinitialize
                onSubmit={searchResumes}
                initialValues={communityFormik.initialValues}
            >
                {
                    ({ errors, values, touched, setFieldValue, handleChange }) => (
                        <Form placeholder={""}
                        // onSubmit={communityFormik.handleSubmit}
                        >
                            <div className='filterListTab'>
                                <Accordion disableGutters square expanded={expanded === 'keywordsPanel'} onChange={handleAccordionChange('keywordsPanel')}>
                                    <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                                        <Stack sx={{ width: '100%' }}>
                                            <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                <Stack direction="row" alignItems="center">
                                                    <Typography>Keywords</Typography>
                                                </Stack>
                                                {(communityFormik.values.keywords !== "") && <Stack
                                                    className='clearStack'
                                                    direction="row"
                                                    justifyContent="space-around"
                                                    onClick={(e) => { e.stopPropagation(); communityFormik.setFieldValue("keywords", "") }}
                                                >
                                                    <CloseIcon />
                                                    <Typography>
                                                        {communityFormik.values.keywords !== "" && 1}
                                                    </Typography>
                                                </Stack>
                                                }
                                            </Stack>
                                            {(communityFormik.values.keywords !== "" && expanded !== 'keywordsPanel') &&
                                                <Stack direction="row" mt={1} flexWrap="wrap">
                                                    <div className='filterLabelName'>Keywords:</div>
                                                    <Chip label={communityFormik.values.keywords} icon={<CloseIcon />} className='selectedFilterChips' onClick={(e) => { e.stopPropagation(); communityFormik.setFieldValue("keywords", "") }} />
                                                </Stack>
                                            }
                                        </Stack>
                                    </AccordionSummary>

                                    <AccordionDetails>
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
                                    </AccordionDetails>
                                </Accordion>

                                {/* <FieldArray name="jobTitles"
                                    render={
                                        ({ insert, remove, push }) => {}
                                    }
                                /> */}

                                <Accordion disableGutters square expanded={expanded === 'jobTitlePanel'} onChange={handleAccordionChange('jobTitlePanel')}>
                                    <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                                        <Stack sx={{ width: '100%' }}>
                                            <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                <Stack direction="row" alignItems="center">
                                                    <Typography>Job Title</Typography>
                                                </Stack>
                                                {/* (((communityFormik.values.jobTitles.length === 1) && (communityFormik.values.jobTitles[0].title)) || (communityFormik.values.jobTitles.length > 1))  */}
                                                {
                                                    communityFormik.values.jobTitles.reduce((count, obj) => obj.title ? ++count : count, 0) ? <Stack
                                                        className='clearStack'
                                                        direction="row"
                                                        justifyContent="space-around"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            // communityFormik.values.jobTitles.map((item, i) => remove(i));
                                                            // values.jobTitles.map((item, i) => remove(i));
                                                            communityFormik.setFieldValue("jobTitles", []);
                                                        }}
                                                    >
                                                        <CloseIcon />
                                                        <Typography>
                                                            {communityFormik.values.jobTitles.reduce((count, obj) => obj.title ? ++count : count, 0)}
                                                        </Typography>
                                                    </Stack>
                                                        :
                                                        null
                                                }
                                            </Stack>
                                            {(communityFormik.values.jobTitles.length > 0 && expanded !== 'jobTitlePanel' && communityFormik.values.jobTitles.some(jobtitle => jobtitle.title)) &&
                                                <Stack direction="row" mt={1} flexWrap="wrap">
                                                    <div className='filterLabelName'>Job Title:</div>

                                                    {communityFormik.values.jobTitles.map((jobTitle, index) => (
                                                        jobTitle.title && (
                                                            <Stack sx={{ pb: 0.5 }}>
                                                                <Chip
                                                                    key={`jobTitle-chip-${index}`}
                                                                    label={jobTitle.title}
                                                                    onDelete={() => {
                                                                        const newJobTitles = communityFormik.values.jobTitles.filter((_, i) => i !== index);
                                                                        communityFormik.setFieldValue("jobTitles", newJobTitles);
                                                                    }}
                                                                    deleteIcon={<CloseIcon />}
                                                                    className='selectedChips'
                                                                />
                                                            </Stack>
                                                        )
                                                    ))}
                                                </Stack>
                                            }



                                        </Stack>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div>
                                            {
                                                communityFormik.values.jobTitles && communityFormik.values.jobTitles.length > 0
                                                    ?
                                                    communityFormik.values.jobTitles.map((jobtitle, index) => (
                                                        <div key={`jobTitle${index}`}>
                                                            <TextField
                                                                className={`mt-2`}
                                                                fullWidth
                                                                id={`jobTitles.${index}.title`}
                                                                variant="outlined"
                                                                type="text"
                                                                size="small"
                                                                placeholder='Add Job Title'
                                                                name={`jobTitles.${index}.title`}
                                                                value={jobtitle.title}
                                                                onChange={
                                                                    (e) => {
                                                                        communityFormik.handleChange(e);
                                                                        // updateCommunityFormik('update', e.target.value, 'jobTitles', index);
                                                                        searchJobTitlesWithDebounce(e.target.value, index);
                                                                    }
                                                                }
                                                                InputProps={{
                                                                    endAdornment: <div>
                                                                        <InputAdornment position="end">
                                                                            <FormControlLabel
                                                                                control={
                                                                                    <Checkbox
                                                                                        id={`jobTitles.${index}.required`}
                                                                                        name={`jobTitles.${index}.required`}
                                                                                        value={jobtitle.required}
                                                                                        size='small'
                                                                                        onChange={communityFormik.handleChange}
                                                                                    />
                                                                                }
                                                                                label="Is Current"
                                                                            />
                                                                            <IconButton
                                                                                // onClick={() => remove(index)}
                                                                                onClick={() => updateCommunityFormik('delete', "", 'jobTitles', index)}
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
                                                className='mt-2'
                                            >
                                                {/* <IconButton
                                                    onClick={() => {
                                                        updateCommunityFormik('add', { title: "", required: false }, 'jobTitles');
                                                        //     push({
                                                        //     title: "",
                                                        //     required: false
                                                        // })
                                                    }
                                                    }
                                                >
                                                    <AddIcon className='addIcon' />
                                                </IconButton> */}
                                                <Button
                                                    variant="outlined"
                                                    color="secondary"
                                                    className="mb-2"
                                                    startIcon={<AddIcon className="addIcon" />}
                                                    onClick={
                                                        () => {
                                                            updateCommunityFormik('add', { title: "", required: false }, 'jobTitles');
                                                        }
                                                    }
                                                >
                                                    Add
                                                </Button>
                                            </Grid>
                                            <Grid>
                                                {
                                                    (jobTitleSuggestions && jobTitleSuggestions.length) ?
                                                        <div>
                                                            <span className='pl-2 c-grey fs-13'>Suggested:</span>
                                                            {
                                                                jobTitleSuggestions.map((item: any) => {
                                                                    return (
                                                                        <Chip
                                                                            key={item.id}
                                                                            label={item.name}
                                                                            className='suggestionChip'
                                                                            onClick={
                                                                                () => {
                                                                                    // push({
                                                                                    //     title: item.name,
                                                                                    //     required: false
                                                                                    // });
                                                                                    // console.log(item);
                                                                                    setTimeout(() => {
                                                                                        deleteJobTitleSuggestionById(item.id);
                                                                                    }, 50);
                                                                                    setTimeout(() => {
                                                                                        //     console.log(communityFormik.values.jobTitles);
                                                                                        //     setFieldValue(`jobTitles.${values.jobTitles.length}.title`, item.name, true);
                                                                                        //     setFieldValue(`jobTitles.${values.jobTitles.length}.required`, item.required, true);
                                                                                        //     //     console.log(communityFormik.values.jobTitles);
                                                                                        //     //     setFieldValue(`jobTitles[${communityFormik.values.jobTitles.length}].title`, item.name, true);
                                                                                        //     //     // communityFormik.validateField();
                                                                                        updateCommunityFormik('add', { title: item.name, required: false }, 'jobTitles', values.jobTitles.length);
                                                                                    }, 200);
                                                                                }
                                                                            }
                                                                        />
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                        :
                                                        null
                                                }
                                            </Grid>
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion disableGutters square expanded={expanded === 'skillsPanel'} onChange={handleAccordionChange('skillsPanel')}>
                                    <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                                        <Stack sx={{ width: '100%' }}>
                                            <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                <Stack direction="row" alignItems="center">

                                                    <Typography>Skills</Typography>
                                                </Stack>
                                                {/* {communityFormik.values.skills && communityFormik.values.skills.map((skill, idx) => (
                                                    <Chip
                                                        key={`skill-chip-${idx}`}
                                                        label={skill.skillName}
                                                        className='selectedFilterChips'

                                                    />
                                                ))} */}
                                                {/* (((communityFormik.values.skills.length === 1) && (communityFormik.values.skills[0].skillName)) || (communityFormik.values.skills.length > 1)) && */}
                                                {
                                                    communityFormik.values.skills.reduce((count, obj) => obj.skillName ? ++count : count, 0) || communityFormik.values.allSkills !== "" ? <Stack
                                                        className='clearStack'
                                                        direction="row"
                                                        justifyContent="space-around"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            communityFormik.setFieldValue("skills", []);
                                                            communityFormik.setFieldValue("allSkills", "");
                                                        }}
                                                    >
                                                        <CloseIcon />
                                                        <Typography>
                                                            {/* {communityFormik.values.skills.length ? 1 : 0} */}
                                                            {communityFormik.values.skills.reduce((count, obj) => obj.skillName ? ++count : count, 0) +
                                                                (communityFormik.values.allSkills !== "" ? 1 : 0)}
                                                        </Typography>
                                                    </Stack>
                                                        :
                                                        null
                                                }
                                            </Stack>
                                            {(communityFormik.values.skills.length > 0 && expanded !== 'skillsPanel' && communityFormik.values.skills.some(skill => skill.skillName)) &&
                                                <Stack>
                                                    <Stack direction="row" mt={1} flexWrap="wrap">
                                                        <div className='filterLabelName'>Skills:</div>
                                                        {communityFormik.values.skills.map((skill, index) => (
                                                            skill.skillName && (
                                                                <Stack sx={{ pb: 0.5 }}>
                                                                    <Chip
                                                                        key={`skill-chip-${index}`}
                                                                        label={skill.skillName}
                                                                        onDelete={() => {
                                                                            const newSkills = communityFormik.values.skills.filter((_, i) => i !== index);
                                                                            communityFormik.setFieldValue("skills", newSkills);
                                                                        }}
                                                                        deleteIcon={<CloseIcon />}
                                                                        className='selectedChips'
                                                                    />
                                                                </Stack>
                                                            )
                                                        ))}

                                                    </Stack>
                                                    {
                                                        communityFormik.values.allSkills ?
                                                            <Stack direction="row">
                                                                <div className='filterLabelName'>Required:</div>
                                                                <Chip
                                                                    label={`Selected Option: ${communityFormik.values.allSkills}`}
                                                                    onDelete={() => communityFormik.setFieldValue("allSkills", "")}
                                                                    deleteIcon={<CloseIcon />}
                                                                    className='selectedChips'
                                                                />
                                                            </Stack>
                                                            :
                                                            null
                                                    }
                                                </Stack>

                                            }
                                        </Stack>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div>
                                            {/* <FieldArray
                                                name="skills"
                                                render={
                                                    ({ insert, remove, push }) => ()}
                                            /> */}
                                            <div>
                                                {communityFormik.values.skills && communityFormik.values.skills.length > 0 ? (
                                                    communityFormik.values.skills.map((skill, index) => (
                                                        <div className='' key={`skills${index}`}>
                                                            <TextField
                                                                className={`mt-2`}
                                                                fullWidth
                                                                id={`skills.${index}.skillName`}
                                                                variant="outlined"
                                                                type="text"
                                                                size="small"
                                                                placeholder='Add Skill'
                                                                name={`skills.${index}.skillName`}
                                                                value={skill.skillName}
                                                                onChange={
                                                                    (e) => {
                                                                        communityFormik.handleChange(e);
                                                                        // updateCommunityFormik('update', e.target.value, 'skills', index);
                                                                        searchSkillsWithDebounce(e.target.value, index);
                                                                    }
                                                                }
                                                                InputProps={{
                                                                    endAdornment: <div>
                                                                        <InputAdornment position="end">
                                                                            <FormControlLabel
                                                                                control={
                                                                                    <Checkbox
                                                                                        id={`skills.${index}.recentUse`}
                                                                                        name={`skills.${index}.recentUse`}
                                                                                        value={skill.recentUse}
                                                                                        size='small'
                                                                                        onChange={communityFormik.handleChange}
                                                                                    />
                                                                                }
                                                                                label="Is Recent"
                                                                            />
                                                                            <IconButton
                                                                                // onClick={() => remove(index)}
                                                                                onClick={() => updateCommunityFormik('delete', "", 'skills', index)}
                                                                                edge="end"
                                                                            >
                                                                                <CloseIcon className='closeIcon' />
                                                                            </IconButton>
                                                                        </InputAdornment>
                                                                    </div>
                                                                }}
                                                            />
                                                            {/* <FormControl>
                                                                <RadioGroup
                                                                    defaultValue="1"
                                                                    name={`skills.${index}.recentUse`}
                                                                    value={skill.recentUse}
                                                                    id={`skills.${index}.recentUse`}
                                                                    onChange={communityFormik.handleChange}
                                                                >
                                                                    <FormControlLabel className='mb-2' value="1" control={<Radio />} label="Skill must be in recent use by candidate" />
                                                                    <FormControlLabel value="0" control={<Radio />} label="Skill doesn't need to be in recent use by candidate" />
                                                                </RadioGroup>
                                                            </FormControl>
                                                            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1} className='mb-2 mt-2'>
                                                                <label>Experience Level:</label>
                                                                <Box>
                                                                    <FormControl style={{ width: '135px' }}>
                                                                        <TextField
                                                                            id={`skills.${index}.experLevel`}
                                                                            name={`skills.${index}.experLevel`}
                                                                            value={skill.experLevel}
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
                                                            <Stack className='mt-1 mb-1' direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
                                                                <label>Name :</label>
                                                                <FormControl style={{ width: '135px' }}>
                                                                    <TextField
                                                                        size='small'
                                                                        id={`skills.${index}.skillName`}
                                                                        name={`skills.${index}.skillName`}
                                                                        value={skill.skillName}
                                                                        onChange={
                                                                            (e) => {
                                                                                communityFormik.handleChange(e);
                                                                                searchSkillsWithDebounce(e.target.value);
                                                                            }
                                                                        }
                                                                    />
                                                                </FormControl>
                                                            </Stack>
                                                            <Box textAlign={'right'} sx={{ pr: '12px' }}>
                                                                <IconButton onClick={() => updateCommunityFormik('delete', "", 'skills', index)} edge="end">
                                                                    <CloseIcon className='closeIcon' />
                                                                </IconButton>
                                                            </Box> */}
                                                        </div>
                                                    ))
                                                ) : null}
                                                <Grid container direction="row" justifyContent="flex-end" alignItems="center" className='mt-2' >
                                                    <Button variant="outlined" color="secondary" className="mb-2" startIcon={<AddIcon className="addIcon" />}
                                                        onClick={
                                                            () => {
                                                                updateCommunityFormik('add', {
                                                                    recentUse: false,
                                                                    experLevel: "",
                                                                    skillName: ""
                                                                }, 'skills');
                                                            }
                                                        }
                                                    >
                                                        Add
                                                    </Button>
                                                </Grid>
                                                <Grid>
                                                    {
                                                        (skillSuggestions && skillSuggestions.length) ?
                                                            <div>
                                                                <span className='pl-2 c-grey fs-13'>Suggested:</span>
                                                                {
                                                                    skillSuggestions.map((item: any) => {
                                                                        return (
                                                                            <Chip
                                                                                key={item.id}
                                                                                label={item.name}
                                                                                className='suggestionChip'
                                                                                onClick={
                                                                                    () => {
                                                                                        // push({
                                                                                        //     recentUse: "1",
                                                                                        //     experLevel: "",
                                                                                        //     skillName: item.name
                                                                                        // });
                                                                                        // console.log(item);
                                                                                        setTimeout(() => {
                                                                                            deleteSkillSuggestionById(item.id);
                                                                                        }, 50);
                                                                                        setTimeout(() => {
                                                                                            updateCommunityFormik('add', {
                                                                                                recentUse: false,
                                                                                                experLevel: "",
                                                                                                skillName: item.name
                                                                                            }, 'skills', values.skills.length)
                                                                                            //     console.log(communityFormik.values.jobTitles);
                                                                                            //     setFieldValue(`jobTitles[${communityFormik.values.jobTitles.length}].title`, item.name, true);
                                                                                            //     // communityFormik.validateField();
                                                                                        }, 200);
                                                                                    }
                                                                                }
                                                                            />
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                            :
                                                            null
                                                    }
                                                </Grid>
                                                <FormControl>
                                                    <RadioGroup defaultValue="onlyOne" name="allSkills" id="allSkills" onChange={communityFormik.handleChange} value={communityFormik.values.allSkills}>
                                                        <FormControlLabel className='mb-2' value="must" control={<Radio />} label="All Skills are required" />
                                                        <FormControlLabel value="onlyOne" control={<Radio />} label="Only one of the skills is required" />
                                                    </RadioGroup>
                                                </FormControl>
                                            </div>

                                        </div>
                                    </AccordionDetails>
                                </Accordion>


                                <Accordion disableGutters square expanded={expanded === 'locationPanel'}
                                    onChange={handleAccordionChange('locationPanel')}>
                                    <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                                        <Stack sx={{ width: '100%' }}>
                                            <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                <Stack direction="row" alignItems="center">

                                                    <Typography>Location</Typography>
                                                </Stack>
                                                {(communityFormik.values.location.state.length > 0 || communityFormik.values.location.zipCode !== "") && <Stack
                                                    className='clearStack'
                                                    direction="row"
                                                    justifyContent="space-around"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        communityFormik.setFieldValue("location.state", "");
                                                        communityFormik.setFieldValue("location.zipCode", "");
                                                        communityFormik.setFieldValue("location.radius", "");
                                                    }}
                                                >
                                                    <CloseIcon />
                                                    <Typography>
                                                        {(communityFormik.values.location.state.length ? 1 : 0) +
                                                            (communityFormik.values.location.zipCode !== "" ? 1 : 0)}
                                                    </Typography>
                                                </Stack>
                                                }
                                            </Stack>
                                            {(expanded !== 'locationPanel') &&
                                                <Stack mt={1} flexWrap="wrap">


                                                    {communityFormik.values.location.state.length > 0 &&
                                                        <div className='mb-1'>
                                                            <Typography className='filterLabelName'>State:</Typography>
                                                            {communityFormik.values.location.state !== '' ? (
                                                                Array.isArray((communityFormik.values.location.state)) ?
                                                                    communityFormik.values.location.state.map((state: any, index: number) => (
                                                                        <Chip
                                                                            key={`state-chip-${index}`}
                                                                            label={getStateById(state)}
                                                                            deleteIcon={<CloseIcon />}
                                                                            className='selectedChips'
                                                                            onDelete={() => {
                                                                                let tempStates = communityFormik.values.location.state.split(',');
                                                                                tempStates = tempStates.filter(i => i !== state);
                                                                                communityFormik.setFieldValue('location.state', tempStates.join());
                                                                            }}
                                                                        />
                                                                    ))
                                                                    :
                                                                    communityFormik.values.location.state.split(',').map((state: any, index: number) => (
                                                                        <Chip
                                                                            key={`state-chip-${index}`}
                                                                            label={getStateById(state)}
                                                                            deleteIcon={<CloseIcon />}
                                                                            className='selectedChips'
                                                                            onDelete={() => {
                                                                                let tempStates = communityFormik.values.location.state.split(',');
                                                                                tempStates = tempStates.filter(i => i !== state);
                                                                                communityFormik.setFieldValue('location.state', tempStates.join());
                                                                            }}
                                                                        />
                                                                    ))
                                                            )
                                                                : null
                                                            }
                                                        </div>
                                                    }

                                                    {communityFormik.values.location.zipCode !== "" && (
                                                        <div className='mb-1'>
                                                            <Typography className='filterLabelName'>Zipcode:</Typography>
                                                            <Chip
                                                                label={communityFormik.values.location.zipCode}
                                                                deleteIcon={<CloseIcon />}
                                                                className='selectedChips'
                                                                onDelete={() => {
                                                                    communityFormik.setFieldValue("location.zipCode", "");
                                                                }}
                                                            />
                                                        </div>
                                                    )}

                                                    {communityFormik.values.location.radius !== "" && (
                                                        <div className='mb-1'>
                                                            <Typography className='filterLabelName'>Radius:</Typography>
                                                            <Chip
                                                                label={`${communityFormik.values.location.radius} miles`}
                                                                deleteIcon={<CloseIcon />}
                                                                className='selectedChips'
                                                                onDelete={() => {
                                                                    communityFormik.setFieldValue("location.radius", "");
                                                                }}
                                                            />
                                                        </div>
                                                    )}
                                                </Stack>
                                            }
                                        </Stack>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div>
                                            <FormControl fullWidth>
                                                <MUIAutoComplete
                                                    id="location.state"
                                                    handleChange={(id: any, name: string) => {
                                                        communityFormik.setFieldValue('location.state', id);
                                                        // console.log(id);
                                                    }}
                                                    valuePassed={
                                                        Array.isArray((communityFormik.values.location.state)) ?
                                                            { label: communityFormik.values.location.state.join(), id: communityFormik.values.location.state.join() }
                                                            :
                                                            (communityFormik.values.location.state) ?
                                                                { label: communityFormik.values.location.state, id: communityFormik.values.location.state }
                                                                :
                                                                {}
                                                    }
                                                    isMultiple={true}
                                                    // width="200px"
                                                    type='states'
                                                    placeholder="Select the states"
                                                />
                                                {/* <Autocomplete
                                                    multiple
                                                    id='location.state'
                                                    options={masterStatesList.map((option) => option.label)}
                                                    value={communityFormik.values.location.state}
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
                                                    onChange={(e, value) => communityFormik.setFieldValue("location.state", value)}
                                                    sx={{ mb: 1 }}
                                                /> */}
                                            </FormControl>
                                            <TextField
                                                className={`mt-2`}
                                                fullWidth
                                                id={`location.zipCode`}
                                                variant="outlined"
                                                type="number"
                                                size="small"
                                                label='Zipcode'
                                                name={`location.zipCode`}
                                                value={communityFormik.values.location.zipCode}
                                                onChange={communityFormik.handleChange}
                                            />
                                            <TextField
                                                className={`mt-2`}
                                                fullWidth
                                                id={`location.radius`}
                                                variant="outlined"
                                                type="number"
                                                size="small"
                                                label='Radius'
                                                placeholder='In Miles'
                                                name={`location.radius`}
                                                value={communityFormik.values.location.radius}
                                                onChange={communityFormik.handleChange}
                                            />
                                        </div>
                                    </AccordionDetails>
                                </Accordion>

                                <Accordion disableGutters square expanded={expanded === 'workAuthPanel'} onChange={handleAccordionChange('workAuthPanel')}>
                                    <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                                        <Stack sx={{ width: '100%' }}>
                                            <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                <Stack direction="row" alignItems="center">

                                                    <Typography>Work Authorization</Typography>
                                                </Stack>
                                                {(communityFormik.values.workAuthorization.title) && <Stack
                                                    className='clearStack'
                                                    direction="row"
                                                    justifyContent="space-around"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        communityFormik.setFieldValue("workAuthorization.title", "");
                                                    }}
                                                >
                                                    <CloseIcon />
                                                    <Typography>
                                                        {(communityFormik.values.workAuthorization.title !== "" ? 1 : 0)}
                                                    </Typography>
                                                </Stack>
                                                }
                                            </Stack>
                                            {communityFormik.values.workAuthorization.title && expanded !== 'workAuthPanel' &&
                                                <Stack direction="row" mt={1} flexWrap="wrap">
                                                    <div className='filterLabelName'>Work Authorization:</div>
                                                    <Chip
                                                        label={communityFormik.values.workAuthorization.title}
                                                        onDelete={() => {
                                                            communityFormik.setFieldValue("workAuthorization.title", "");
                                                        }}
                                                        deleteIcon={<CloseIcon />}
                                                        className='selectedChips'
                                                    />
                                                </Stack>
                                            }
                                        </Stack>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div>
                                            <TextField
                                                fullWidth
                                                id="workAuthorization.title"
                                                variant="outlined"
                                                type="text"
                                                size="small"
                                                label=' Work Authorization'
                                                name={`workAuthorization.title`}
                                                value={communityFormik.values.workAuthorization.title}
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
                                                                        value={communityFormik.values.workAuthorization.required}
                                                                        size='small'
                                                                        onChange={communityFormik.handleChange}
                                                                    />
                                                                }
                                                                label="Required"
                                                                sx={{ mr: '25px' }}
                                                            />
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
                                    </AccordionDetails>
                                </Accordion>

                                {/* <Accordion disableGutters square expanded={expanded === 'talentPoolPanel'} onChange={handleAccordionChange('talentPoolPanel')}>
                                    <AccordionSummary
                                        expandIcon={<ArrowDropDownIcon />}
                                        aria-controls="talentPoolPanel-content"
                                        id="talentPoolPanel-header"
                                    >
                                        <Stack sx={{ width: '100%' }}>
                                            <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                <Stack direction="row" alignItems="center">

                                                    <Typography>Talent Pool</Typography>
                                                </Stack>
                                                {(communityFormik.values.talentPoolId.length > 0) && <Stack
                                                    className='clearStack'
                                                    direction="row"
                                                    justifyContent="space-around"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        communityFormik.setFieldValue("talentPoolId", "");
                                                    }}
                                                >
                                                    <CloseIcon />
                                                    <Typography>
                                                        {communityFormik.values.talentPoolId.length ? 1 : 0}
                                                    </Typography>
                                                </Stack>
                                                }
                                            </Stack>
                                            {(expanded !== 'talentPoolPanel') &&
                                                <Stack mt={1} flexWrap="wrap">
                                                    {communityFormik.values.talentPoolId.length > 0 && <div className='mb-1'>
                                                        <Typography className='filterLabelName'>Talent Pool:</Typography>
                                                        <Chip label={communityFormik.values.talentPoolName} icon={<CloseIcon />} className='selectedChips' onClick={
                                                            (event) => {
                                                                event.stopPropagation();
                                                                communityFormik.setFieldValue("talentPoolId", "")
                                                            }
                                                        }
                                                        />
                                                    </div>}
                                                </Stack>
                                            }
                                        </Stack>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <FormControl fullWidth>
                                            <MUIAutoComplete
                                                id='talentPoolId'
                                                handleChange={(id: any, name: string) => {
                                                    communityFormik.setFieldValue('talentPoolId', id);
                                                    communityFormik.setFieldValue('talentPoolName', name);
                                                }}
                                                valuePassed={(communityFormik.values.talentPoolId) ? { label: communityFormik.values.talentPoolName, id: communityFormik.values.talentPoolId } : {}}
                                                isMultiple={false}
                                                textToShow="Select Talent Pool"
                                                width="100%"
                                                type='talentPool'
                                                placeholder="Search Talent Pool"
                                            />
                                        </FormControl>
                                    </AccordionDetails>
                                </Accordion> */}


                                <Accordion disableGutters square expanded={expanded === 'employerPanel'} onChange={handleAccordionChange('employerPanel')}>
                                    <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                                        <Stack sx={{ width: '100%' }}>
                                            <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                <Stack direction="row" alignItems="center">

                                                    <Typography>Employer</Typography>
                                                </Stack>
                                                {/* (((communityFormik.values.employer.length === 1) && (communityFormik.values.employer[0].employerName)) || (communityFormik.values.employer.length > 1)) &&  */}
                                                {
                                                    communityFormik.values.employer.reduce((count, obj) => obj.employerName ? ++count : count, 0) ?
                                                        <Stack
                                                            className='clearStack'
                                                            direction="row"
                                                            justifyContent="space-around"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                communityFormik.setFieldValue("employer", []);
                                                            }}
                                                        >
                                                            <CloseIcon />
                                                            <Typography>
                                                                {communityFormik.values.employer.reduce((count, obj) => obj.employerName ? ++count : count, 0)}
                                                            </Typography>
                                                        </Stack>
                                                        :
                                                        null
                                                }
                                            </Stack>
                                            {expanded !== 'employerPanel' && communityFormik.values.employer.length > 0 &&
                                                communityFormik.values.employer.some(certification => certification.employerName) &&
                                                <Stack direction="row" mt={1} flexWrap="wrap">
                                                    <div className='filterLabelName'>Employer:</div>
                                                    {communityFormik.values.employer.map((employer, index) => (
                                                        employer.employerName && (

                                                            <Stack sx={{ pb: 0.5 }}>

                                                                <Chip
                                                                    key={`employer-chip-${index}`}
                                                                    label={employer.employerName}
                                                                    onDelete={() => {
                                                                        const newEmployers = communityFormik.values.employer.filter((_, i) => i !== index);
                                                                        communityFormik.setFieldValue("employer", newEmployers);
                                                                    }}
                                                                    deleteIcon={<CloseIcon />}
                                                                    className='selectedChips'
                                                                />
                                                            </Stack>
                                                        )

                                                    ))}
                                                </Stack>
                                            }
                                        </Stack>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div>
                                            {/* <FieldArray
                                                name="employer"
                                                render={
                                                    ( { insert, remove, push }) => ()
                                                }
                                            /> */}
                                            <div>
                                                {communityFormik.values.employer && communityFormik.values.employer.length > 0 ? (
                                                    communityFormik.values.employer.map((employer, index) => (
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
                                                                value={employer.employerName}
                                                                onChange={communityFormik.handleChange}
                                                                InputProps={{
                                                                    endAdornment: (
                                                                        <InputAdornment position="end">
                                                                            <IconButton onClick={
                                                                                () => {
                                                                                    updateCommunityFormik('delete', "", 'employer', index)
                                                                                }
                                                                            } edge="end">
                                                                                <CloseIcon className='closeIcon' />
                                                                            </IconButton>
                                                                        </InputAdornment>
                                                                    )
                                                                }}
                                                            />
                                                        </div>
                                                    ))
                                                ) : null}
                                                <Grid container direction="row" justifyContent="flex-end" alignItems="center" className='mt-2'>
                                                    <Button variant="outlined" color="secondary" startIcon={<AddIcon className="addIcon" />}
                                                        onClick={() => { updateCommunityFormik('add', { title: "", required: false }, 'employer') }}
                                                    >Add</Button>
                                                </Grid>
                                            </div>

                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion disableGutters square expanded={expanded === 'educationPanel'} onChange={handleAccordionChange('educationPanel')}

                                >
                                    <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                                        <Stack sx={{ width: '100%' }}>
                                            <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                <Stack direction="row" alignItems="center">
                                                    <Typography>Education</Typography>
                                                </Stack>
                                                {
                                                    (communityFormik.values.degTypes.length > 0 ||
                                                        communityFormik.values.IsTopStudent === true ||
                                                        communityFormik.values.IsRecentGraduate === true ||
                                                        communityFormik.values.IsCurrentStudent === true ||
                                                        communityFormik.values.schools.reduce((count, obj) => obj.schoolName ? ++count : count, 0) ||
                                                        communityFormik.values.degrees.reduce((count, obj) => obj.degreeName ? ++count : count, 0)) ?
                                                        <Stack
                                                            className='clearStack'
                                                            direction="row"
                                                            justifyContent="space-around"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                (communityFormik.values.degTypes.length > 0 && communityFormik.setFieldValue("degTypes", []));
                                                                (communityFormik.values.IsTopStudent === true && communityFormik.setFieldValue("IsTopStudent", false));
                                                                (communityFormik.values.IsRecentGraduate === true && communityFormik.setFieldValue("IsRecentGraduate", false));
                                                                (communityFormik.values.IsCurrentStudent === true && communityFormik.setFieldValue("IsCurrentStudent", []));
                                                                (communityFormik.values.schools.length > 0 && communityFormik.setFieldValue("schools", []));
                                                                (communityFormik.values.degrees.length > 0 && communityFormik.setFieldValue("degrees", []));
                                                            }}
                                                        >
                                                            <CloseIcon />
                                                            <Typography>
                                                                {(communityFormik.values.degTypes.length > 0 ? 1 : 0) +
                                                                    (communityFormik.values.IsTopStudent === true ||
                                                                        communityFormik.values.IsRecentGraduate === true ||
                                                                        communityFormik.values.IsCurrentStudent === true ? 1 : 0) +
                                                                    communityFormik.values.schools.reduce((count, obj) => obj.schoolName ? ++count : count, 0) +
                                                                    communityFormik.values.degrees.reduce((count, obj) => obj.degreeName ? ++count : count, 0)}
                                                            </Typography>
                                                        </Stack>
                                                        :
                                                        null
                                                }
                                            </Stack>
                                            {(expanded !== 'educationPanel') &&
                                                <Stack mt={1} flexWrap="wrap">

                                                    {communityFormik.values.degTypes.length > 0 && <Grid container spacing={0}>
                                                        <Grid className='filterLabelName m-1'>Degree Type:</Grid>
                                                        {communityFormik.values.degTypes.map((degType, index) => (
                                                            <Grid >
                                                                <Chip
                                                                    key={`degType-chip-${index}`}
                                                                    label={degType}

                                                                    onDelete={() => {
                                                                        const newDegTypes = communityFormik.values.degTypes.filter((_, i) => i !== index);
                                                                        communityFormik.setFieldValue("degTypes", newDegTypes);
                                                                    }}
                                                                    deleteIcon={<CloseIcon />}
                                                                    className='selectedChips'
                                                                    style={{ margin: '4px' }}
                                                                />
                                                            </Grid>
                                                        ))}
                                                    </Grid>}
                                                    <Grid container spacing={0} className={`${(communityFormik.values.IsTopStudent || communityFormik.values.IsRecentGraduate || communityFormik.values.IsCurrentStudent) ? 'mt-3' : ''}`}>
                                                        {communityFormik.values.IsTopStudent &&
                                                            <Grid >
                                                                <Chip
                                                                    label="Top Student"
                                                                    onDelete={() => communityFormik.setFieldValue("IsTopStudent", false)}
                                                                    deleteIcon={<CloseIcon />}
                                                                    className='selectedChips'
                                                                />
                                                            </Grid>
                                                        }

                                                        {communityFormik.values.IsRecentGraduate &&
                                                            <Grid >
                                                                <Chip
                                                                    label="Recent Graduate"
                                                                    onDelete={() => communityFormik.setFieldValue("IsRecentGraduate", false)}
                                                                    deleteIcon={<CloseIcon />}
                                                                    className='selectedChips'
                                                                />
                                                            </Grid>
                                                        }


                                                        {communityFormik.values.IsCurrentStudent &&
                                                            <Grid >
                                                                <Chip
                                                                    label="Current Student"
                                                                    onDelete={() => communityFormik.setFieldValue("IsCurrentStudent", false)}
                                                                    deleteIcon={<CloseIcon />}
                                                                    className='selectedChips'
                                                                />
                                                            </Grid>
                                                        }
                                                    </Grid>
                                                    <Grid container spacing={0} className={`${(communityFormik.values.schools.reduce((count, obj) => obj.schoolName ? ++count : count, 0)) ? 'mt-3' : ''}`}>
                                                        {communityFormik.values.schools.some(school => school.schoolName) && <>
                                                            <Grid className='filterLabelName m-1'>School:</Grid>
                                                            {communityFormik.values.schools.map((school, index) => (
                                                                school.schoolName && (
                                                                    <Grid >
                                                                        <Chip
                                                                            key={`school-chip-${index}`}
                                                                            label={school.schoolName}
                                                                            onDelete={() => {
                                                                                const newSchools = communityFormik.values.schools.filter((_, i) => i !== index);
                                                                                communityFormik.setFieldValue("schools", newSchools);
                                                                            }}
                                                                            deleteIcon={<CloseIcon />}
                                                                            className='selectedChips'
                                                                        />
                                                                    </Grid>
                                                                )
                                                            ))}


                                                        </>}
                                                    </Grid>
                                                    <Grid container spacing={0} className={`${(communityFormik.values.degrees.reduce((count, obj) => obj.schoolName ? ++count : count, 0)) ? 'mt-3' : ''}`}>

                                                        {communityFormik.values.degrees.some(degree => degree.degreeName) && <>
                                                            <Grid className='filterLabelName m-1'>Degrees:</Grid>
                                                            {communityFormik.values.degrees.map((degree, index) => (
                                                                degree.degreeName && (
                                                                    <Grid >
                                                                        <Chip
                                                                            key={`degree-chip-${index}`}
                                                                            label={degree.degreeName}
                                                                            onDelete={() => {
                                                                                const newDegrees = communityFormik.values.degrees.filter((_, i) => i !== index);
                                                                                communityFormik.setFieldValue("degrees", newDegrees);
                                                                            }}
                                                                            deleteIcon={<CloseIcon />}
                                                                            className='selectedChips'
                                                                        />
                                                                    </Grid>

                                                                )
                                                            ))}
                                                        </>}
                                                    </Grid>
                                                </Stack>
                                            }
                                        </Stack>
                                    </AccordionSummary>

                                    <AccordionDetails>
                                        <Box width="100%">
                                            <Typography variant="body2" gutterBottom>Degree Types:</Typography>
                                            <FormControl fullWidth sx={{ mt: 1 }}>
                                                <InputLabel>Degree Type</InputLabel>
                                                <Select
                                                    id="degTypes"
                                                    name='degTypes'
                                                    value={communityFormik.values.degTypes}
                                                    multiple
                                                    onChange={communityFormik.handleChange}
                                                    // input={<OutlinedInput />}
                                                    renderValue={(selected) => selected.join(', ')}
                                                    fullWidth
                                                    size='small'
                                                    label="Degree Type"
                                                >
                                                    {DEGREE_TYPES.map((deg) => (
                                                        <MenuItem key={deg.value} value={deg.text}>
                                                            <Checkbox checked={communityFormik.values.degTypes.indexOf(deg.text) > -1} />
                                                            <ListItemText primary={deg.text} />
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>

                                            <Box sx={{ mt: 2 }}>
                                                <FormControlLabel control={<Checkbox value={communityFormik.values.IsTopStudent} />} label="Show Only Top Students" />
                                                <FormControlLabel control={<Checkbox value={communityFormik.values.IsRecentGraduate} />} label="Show Only Students That Graduated Within The Last Year" />
                                                <FormControlLabel control={<Checkbox value={communityFormik.values.IsCurrentStudent} />} label="Show Only Current Students" />
                                            </Box>

                                            <Typography variant="body2" gutterBottom mt={3}>Schools:</Typography>
                                            {/* <FieldArray
                                                name="schools"
                                                render={
                                                    ({ insert, remove, push }) => ()}
                                            /> */}
                                            <div>
                                                {communityFormik.values.schools && communityFormik.values.schools.map((school, index) => (
                                                    <TextField
                                                        key={`schools${index}`}
                                                        fullWidth
                                                        className="mt-2"
                                                        id={`schools.${index}.schoolName`}
                                                        variant="outlined"
                                                        type="text"
                                                        size="small"
                                                        placeholder='School Name'
                                                        name={`schools.${index}.schoolName`}
                                                        value={school.schoolName}
                                                        onChange={communityFormik.handleChange}
                                                        InputProps={{
                                                            endAdornment: (
                                                                <InputAdornment position="end">
                                                                    <IconButton onClick={() => updateCommunityFormik('delete', '', 'schools', index)} edge="end">
                                                                        <CloseIcon className='closeIcon' />
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            )
                                                        }}
                                                    />
                                                ))}

                                                <Grid container direction="row" justifyContent="flex-end" alignItems="center" className='mt-2'>
                                                    <Button variant="outlined" color="secondary" startIcon={<AddIcon className="addIcon" />}
                                                        onClick={() => { updateCommunityFormik('add', { title: "", required: false }, 'schools') }}
                                                    > Add</Button>
                                                </Grid>
                                            </div>


                                            <Typography variant="body2" gutterBottom mt={3}>Degrees:</Typography>
                                            {/* <FieldArray
                                                name="degrees"
                                                render={
                                                    ({ insert, remove, push }) => ()}
                                            /> */}
                                            <div>
                                                {
                                                    communityFormik.values.degrees && communityFormik.values.degrees.map((degree, index) => (
                                                        <TextField
                                                            key={`degrees${index}`}
                                                            fullWidth
                                                            className="mt-2"
                                                            id={`degrees.${index}.degreeName`}
                                                            variant="outlined"
                                                            type="text"
                                                            size="small"
                                                            placeholder='Degree Name'
                                                            name={`degrees.${index}.degreeName`}
                                                            value={degree.degreeName}
                                                            onChange={communityFormik.handleChange}
                                                            InputProps={{
                                                                endAdornment: (
                                                                    <InputAdornment position="end">
                                                                        <IconButton onClick={() => updateCommunityFormik('delete', '', 'degrees', index)} edge="end">
                                                                            <CloseIcon className='closeIcon' />
                                                                        </IconButton>
                                                                    </InputAdornment>
                                                                )
                                                            }}
                                                        />
                                                    ))
                                                }
                                                <Grid container direction="row" justifyContent="flex-end" alignItems="center" className='mt-2'>
                                                    <Button variant="outlined" color="secondary" startIcon={<AddIcon className="addIcon" />}
                                                        onClick={() => updateCommunityFormik('add', { title: "", required: false }, 'degrees')}
                                                    > Add</Button>
                                                </Grid>
                                            </div>

                                        </Box>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion disableGutters square expanded={expanded === 'daysBakcPanel'} onChange={handleAccordionChange('daysBakcPanel')}>
                                    <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                                        <Stack sx={{ width: '100%' }}>
                                            <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                <Stack direction="row" alignItems="center">
                                                    <Typography>Days Back</Typography>
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                    </AccordionSummary>

                                    <AccordionDetails>
                                        <Card className={`customCard p-0`}>
                                            <CardContent>
                                                <FormControl>
                                                    <RadioGroup
                                                        name="daysBack"
                                                        id="daysBack"
                                                        onChange={communityFormik.handleChange}
                                                        defaultValue="3650"
                                                        value={communityFormik.values.daysBack}
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
                                            </CardContent>
                                        </Card>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion disableGutters square expanded={expanded === 'experiencePanel'} onChange={handleAccordionChange('experiencePanel')}>
                                    <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                                        <Stack sx={{ width: '100%' }}>
                                            <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                <Stack direction="row" alignItems="center">
                                                    <Typography>Experience</Typography>
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                    </AccordionSummary>

                                    <AccordionDetails>
                                        <Card className="customCard p-0">
                                            <CardContent>
                                                <label>Total Work Experience (Years)</label>
                                                <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
                                                    <TextField
                                                        className={`mt-2`}
                                                        placeholder='Min'
                                                        size='small'
                                                        id="minExp"
                                                        name='minExp'
                                                        value={communityFormik.values.minExp}
                                                        type='number'
                                                        InputProps={{
                                                            inputProps: {
                                                                min: 0
                                                            }
                                                        }}
                                                        onChange={communityFormik.handleChange}
                                                    />
                                                    <span className='mx-3'>-</span>
                                                    <TextField
                                                        className={`mt-2`}
                                                        placeholder='Max'
                                                        size='small'
                                                        id="maxExp"
                                                        name='maxExp'
                                                        value={communityFormik.values.maxExp}
                                                        type='number'
                                                        InputProps={{
                                                            inputProps: {
                                                                min: 0
                                                            }
                                                        }}
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
                                                        value={communityFormik.values.minManExp}
                                                        type='number'
                                                        InputProps={{
                                                            inputProps: {
                                                                min: 0
                                                            }
                                                        }}
                                                        onChange={communityFormik.handleChange}
                                                    />
                                                    <span className='mx-3'>-</span>
                                                    <TextField
                                                        className={`mt-2`}
                                                        placeholder='Max'
                                                        size='small'
                                                        id="maxManExp"
                                                        name='maxManExp'
                                                        value={communityFormik.values.maxManExp}
                                                        type='number'
                                                        InputProps={{
                                                            inputProps: {
                                                                min: 0
                                                            }
                                                        }}
                                                        onChange={communityFormik.handleChange}
                                                    />
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion disableGutters square expanded={expanded === 'certificationsPanel'} onChange={handleAccordionChange('certificationsPanel')}>
                                    <AccordionSummary
                                        expandIcon={<ArrowDropDownIcon />}
                                        aria-controls="certificationsPanel-content"
                                        id="certificationsPanel-header"
                                    >
                                        <Stack sx={{ width: '100%' }}>
                                            <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                <Stack direction="row" alignItems="center">


                                                    <Typography>Certifications</Typography>
                                                </Stack>
                                                {/* (((communityFormik.values.certifications.length === 1) && (communityFormik.values.certifications[0].certificationName)) || (communityFormik.values.certifications.length > 1)) &&  */}
                                                {
                                                    communityFormik.values.certifications.reduce((count, obj) => obj.certificationName ? ++count : count, 0) ?
                                                        <Stack
                                                            className='clearStack'
                                                            direction="row"
                                                            justifyContent="space-around"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                communityFormik.setFieldValue("certifications", []);
                                                            }}
                                                        >
                                                            <CloseIcon />
                                                            <Typography>
                                                                {communityFormik.values.certifications.reduce((count, obj) => obj.certificationName ? ++count : count, 0)}
                                                            </Typography>
                                                        </Stack>
                                                        :
                                                        null
                                                }
                                            </Stack>
                                            {/* {communityFormik.values.certifications && communityFormik.values.certifications.length > 0 && expanded !== 'certificationsPanel' &&
                                                <Stack direction="row" mt={1} flexWrap="wrap">
                                                    {communityFormik.values.certifications.map((certification, index) => (
                                                        <Chip
                                                            key={index}
                                                            label={certification.certificationName}
                                                            icon={<CloseIcon />}
                                                            className='selectedFilterChips'
                                                            onClick={() => handleRemoveCertification(index)}
                                                        />
                                                    ))}
                                                </Stack>
                                            } */}
                                            {expanded !== 'certificationsPanel' && communityFormik.values.certifications.length > 0 && communityFormik.values.certifications.some(certification => certification.certificationName) &&
                                                <Stack mt={1} direction={"row"} flexWrap="wrap"  >
                                                    <div className='filterLabelName'>Certification:</div>
                                                    {communityFormik.values.certifications.map((certification, index) => (
                                                        certification.certificationName && (
                                                            <Stack pb={0.5} >
                                                                <Chip
                                                                    key={`certification-chip-${index}`}
                                                                    label={certification.certificationName}
                                                                    onDelete={() => {
                                                                        const newCertifications = communityFormik.values.certifications.filter((_, i) => i !== index);
                                                                        communityFormik.setFieldValue("certifications", newCertifications);
                                                                    }}
                                                                    deleteIcon={<CloseIcon />}
                                                                    className='selectedChips'
                                                                />
                                                            </Stack>
                                                        )
                                                    ))}
                                                </Stack>
                                            }
                                        </Stack>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {/* <FieldArray
                                            name="certifications"
                                            render={
                                                ({ insert, remove, push }) => ()}
                                        /> */}
                                        <div>
                                            {communityFormik.values.certifications.map((certification, index) => (
                                                <TextField
                                                    key={index}
                                                    className={`mt-2`}
                                                    fullWidth
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    placeholder='Certification'
                                                    name={`certifications.${index}.certificationName`}
                                                    value={certification.certificationName}
                                                    onChange={communityFormik.handleChange}
                                                    InputProps={{
                                                        endAdornment: <div>
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    onClick={() => updateCommunityFormik('delete', '', 'certifications', index)}
                                                                    edge="end"
                                                                >
                                                                    <CloseIcon className='closeIcon' />
                                                                </IconButton>
                                                            </InputAdornment>
                                                        </div>
                                                    }}
                                                />
                                            ))}

                                            <Grid container direction="row" justifyContent="flex-end" alignItems="center" className='mt-2'>
                                                <Button variant="outlined" color="secondary" startIcon={<AddIcon className="addIcon" />}
                                                    onClick={() => updateCommunityFormik('add', { certificationName: "" }, 'certifications')}
                                                >Add</Button>
                                            </Grid>
                                        </div>

                                    </AccordionDetails>
                                </Accordion>



                                <Accordion disableGutters square expanded={expanded === 'industriesPanel'} onChange={handleAccordionChange('industriesPanel')}>
                                    <AccordionSummary
                                        expandIcon={<ArrowDropDownIcon />}
                                        aria-controls="industriesPanel-content"
                                        id="industriesPanel-header"
                                    >
                                        <Stack sx={{ width: '100%' }}>
                                            <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                <Stack direction="row" alignItems="center">

                                                    <Typography>Industries</Typography>
                                                </Stack>
                                                {/* (((communityFormik.values.industries.length === 1) && (communityFormik.values.industries[0].indcate)) || (communityFormik.values.industries.length > 1)) */}
                                                {
                                                    communityFormik.values.industries.reduce((count, obj) => obj.indcate ? ++count : count, 0) ? <Stack
                                                        className='clearStack'
                                                        direction="row"
                                                        justifyContent="space-around"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            communityFormik.setFieldValue("industries", []);
                                                        }}
                                                    >
                                                        <CloseIcon />
                                                        <Typography>
                                                            {communityFormik.values.industries.reduce((count, obj) => obj.indcate ? ++count : count, 0)}
                                                        </Typography>
                                                    </Stack>
                                                        :
                                                        null
                                                }
                                            </Stack>
                                            {(expanded !== 'industriesPanel' && communityFormik.values.industries.length > 0 && communityFormik.values.industries.some(industry => industry.indcate)) &&
                                                <div>
                                                    <Stack direction="row" mt={1} flexWrap="wrap">
                                                        <div className='filterLabelName'>Category</div>
                                                        {communityFormik.values.industries.map((industry, index) => (
                                                            industry.indcate && (
                                                                <Chip
                                                                    key={`industry-chip-${index}`}
                                                                    label={getCategoryLabel(industry.indcate)}
                                                                    onDelete={() => {
                                                                        const newIndustries = communityFormik.values.industries.filter((_, i) => i !== index);
                                                                        communityFormik.setFieldValue("industries", newIndustries);
                                                                    }}
                                                                    deleteIcon={<CloseIcon />}
                                                                    className='selectedChips'
                                                                />
                                                            )
                                                        ))}
                                                    </Stack>
                                                </div>
                                            }
                                        </Stack>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {/* <FieldArray
                                            name="industries"
                                            render={
                                                ({ insert, remove, push }) => ()}
                                        /> */}
                                        <div>
                                            {
                                                communityFormik.values.industries && communityFormik.values.industries.length > 0 &&
                                                communityFormik.values.industries.map((industry, index) => (
                                                    <div key={`industries${index}`} className='addSeperator'>
                                                        <label>Category:</label>
                                                        <FormControl fullWidth sx={{ mt: 1 }}>
                                                            <InputLabel>Category</InputLabel>
                                                            <Select
                                                                id={`industries.${index}.indcate`}
                                                                name={`industries.${index}.indcate`}
                                                                value={industry.indcate}
                                                                onChange={communityFormik.handleChange}
                                                                sx={{ mb: 1, mt: 1 }}
                                                                size='small'
                                                                label="Category"
                                                            >
                                                                {TAXONOMIES.map((ind, i) => (
                                                                    <MenuItem sx={{ width: "200px" }} key={i} value={ind.id}>{ind.name}</MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                        <label>Subcategory:</label>
                                                        <FormControl fullWidth sx={{ mt: 1 }}>
                                                            <InputLabel>Subcategory</InputLabel>
                                                            <Select
                                                                id={`industries.${index}.subCat`}
                                                                name={`industries.${index}.subCat`}
                                                                value={industry.subCat}
                                                                onChange={communityFormik.handleChange}
                                                                size='small'
                                                                sx={{ mt: 1 }}
                                                                label="Subcategory"
                                                            >
                                                                {
                                                                    getSubCatList(industry.indcate)?.map((subCat, i) => (
                                                                        <MenuItem sx={{ width: "200px" }} key={i} value={subCat.id}>{subCat.name}</MenuItem>
                                                                    ))
                                                                }
                                                            </Select>
                                                        </FormControl>
                                                        <Box textAlign={'right'} sx={{ pr: '12px' }}>
                                                            <IconButton
                                                                onClick={() => updateCommunityFormik('delete', '', 'industries', index)}
                                                                edge="end"
                                                            >
                                                                <CloseIcon className='closeIcon' />
                                                            </IconButton>
                                                        </Box>
                                                    </div>
                                                ))
                                            }
                                            <Grid container direction="row" justifyContent="flex-end" alignItems="center" className='mt-2'>
                                                <Button variant="outlined" color="secondary" startIcon={<AddIcon className="addIcon" />}
                                                    onClick={() => updateCommunityFormik('add', {
                                                        indcate: "",
                                                        subCat: "",
                                                    }, 'industries')}
                                                > Add</Button>
                                            </Grid>
                                        </div>

                                    </AccordionDetails>
                                </Accordion>

                                <Accordion disableGutters square expanded={expanded === 'languageSpokenPanel'} onChange={handleAccordionChange('languageSpokenPanel')}>
                                    <AccordionSummary
                                        expandIcon={<ArrowDropDownIcon />}
                                        aria-controls="languageSpokenPanel-content"
                                        id="languageSpokenPanel-header"
                                    >
                                        <Stack sx={{ width: '100%' }}>
                                            <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                <Stack direction="row" alignItems="center">

                                                    <Typography>Spoken Language</Typography>
                                                </Stack>
                                                {(communityFormik.values.languageSpoken.length > 0) && <Stack
                                                    className='clearStack'
                                                    direction="row"
                                                    justifyContent="space-around"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        communityFormik.setFieldValue("languageSpoken", "");
                                                    }}
                                                >
                                                    <CloseIcon />
                                                    <Typography>
                                                        {communityFormik.values.languageSpoken.split(',').length}
                                                    </Typography>
                                                </Stack>
                                                }
                                            </Stack>
                                            {(expanded !== 'languageSpokenPanel') &&
                                                <Stack mt={1} flexWrap="wrap">
                                                    {communityFormik.values.languageSpoken.length > 0 && <div className='mb-1'>
                                                        <Typography className='filterLabelName'>Languages:</Typography>
                                                        {communityFormik.values.languageSpoken.split(',').map((lang: any, i: number) => (
                                                            <Chip label={lang} key={i} icon={<CloseIcon />} className='selectedChips' onClick={(event) => handleClear("languageSpoken", event, i)} />
                                                        ))}
                                                    </div>}
                                                </Stack>
                                            }
                                        </Stack>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <FormControl fullWidth>
                                            <MUIAutoComplete
                                                id="languageSpoken"
                                                handleChange={(id: any, name: string) => {
                                                    communityFormik.setFieldValue('languageSpoken', id);
                                                    // console.log(id);
                                                }}
                                                valuePassed={
                                                    Array.isArray((communityFormik.values.languageSpoken)) ?
                                                        { label: communityFormik.values.languageSpoken.join(), id: communityFormik.values.languageSpoken.join() }
                                                        :
                                                        (communityFormik.values.languageSpoken) ?
                                                            { label: communityFormik.values.languageSpoken, id: communityFormik.values.languageSpoken }
                                                            :
                                                            {}
                                                }
                                                isMultiple={true}
                                                // width="200px"
                                                type='language'
                                                placeholder="Spoken Language"
                                            />
                                            {/* <Autocomplete
                                                multiple
                                                id="languageSpoken"
                                                options={LANGUAGES.map((option) => option.label)}
                                                value={communityFormik.values.languageSpoken}
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
                                                        placeholder="Select languages"
                                                    />
                                                )}
                                                PaperComponent={CustomPaper}
                                                onChange={(e, value) => communityFormik.setFieldValue("languageSpoken", value)}
                                                sx={{ mb: 1 }}
                                            /> */}
                                            {/* <MUIAutoComplete
                                                id='emails'
                                                handleChange={(id: any, name: string) => {
                                                    communityFormik.setFieldValue('emails', id);
                                                    // saveDataForm("", id);
                                                }}
                                                valuePassed={(communityFormik.values.emails) ? { label: communityFormik.values.emails, id: communityFormik.values.emails } : {}}
                                                isMultiple={true}
                                                textToShow="Select Job"
                                                width="100%"
                                                type='email'
                                                placeholder="Send Email to"
                                            /> */}
                                        </FormControl>
                                    </AccordionDetails>
                                </Accordion>

                            </div>
                        </Form>
                    )
                }
            </Formik>

            <div className="filterBtnWrap">
                <Button variant="text" onClick={onApplyFilters}>Apply Filters</Button>
            </div>

            <Dialog
                open={descModalOpen}
                onClose={() => setDescModalOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className='communityModal'
            >
                <DialogTitle id="alert-dialog-title">
                    {"Job Description"}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ minWidth: '660px' }}>
                        {/* <Editor
                                toolbarId='jobDescriptionTool'
                                placeholder='Copy and paste here'
                                id='jobDescription'
                                mentions={false}
                                saveTemplate={false}
                                editorHtml={communityFormik.values.jobDescription}
                                handleChange={(ebody: any) => communityFormik.setFieldValue("jobDescription", ebody)} /> */}
                        <TextField
                            className={`mt-2`}
                            fullWidth
                            id="jobDescription"
                            variant="outlined"
                            size="small"
                            placeholder='Enter or Paste Job Description'
                            name={`jobDescription`}
                            value={communityFormik.values.jobDescription}
                            onChange={communityFormik.handleChange}
                            multiline
                            rows={7}
                            maxRows={7}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={() => setDescModalOpen(false)}>Close</Button>
                    <Button color="primary"
                        startIcon={
                            <AutoAwesomeIcon className='' />
                        }
                        onClick={
                            () => {
                                setDescModalOpen(false);
                                searchSkillsFromDescription('', communityFormik.values.jobDescription);

                                communityFormik.setFieldValue('selectedJobId', "");
                                communityFormik.setFieldValue('selectedJobTitle', "");
                                setSelectedJobTitle({
                                    title: "",
                                    id: ""
                                });
                            }
                        }
                    >
                        AI Search
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={jobModalOpen}
                onClose={() => setJobModalOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className='communityModal'
            >
                <DialogTitle id="alert-dialog-title">
                    {"Select Job"}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ minWidth: '660px', p: 5 }}>
                        <MUIAutoComplete
                            id='jobTitle'
                            handleChange={(id: any, name: string) => {
                                communityFormik.setFieldValue('selectedJobId', id);
                                communityFormik.setFieldValue('selectedJobTitle', name);
                                // updateJobDetails(id, name);
                                // setJobModalOpen(false);
                                // saveDataForm("", id);
                            }}
                            valuePassed={(communityFormik.values.selectedJobId) ? { label: communityFormik.values.selectedJobTitle, id: communityFormik.values.selectedJobId } : {}}
                            isMultiple={false}
                            textToShow="Select Job"
                            width="100%"
                            type='jobTitle'
                            placeholder="Enter Job Title"
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={() => setJobModalOpen(false)}>Close</Button>
                    <Button color="primary"
                        startIcon={
                            <AutoAwesomeIcon className='' />
                        }
                        onClick={
                            () => {
                                setJobModalOpen(false);
                                setSelectedJobTitle({
                                    title: communityFormik.values.selectedJobTitle,
                                    id: communityFormik.values.selectedJobId
                                });
                                updateJobDetails(communityFormik.values.selectedJobId, communityFormik.values.selectedJobTitle);
                                searchSkillsFromDescription(communityFormik.values.selectedJobId, '');
                                // getJobDescription(communityFormik.values.selectedJobId);
                            }
                        }>AI Search</Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}

export default TalentFilters;