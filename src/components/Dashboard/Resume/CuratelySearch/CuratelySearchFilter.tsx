import {React, useEffect, SyntheticEvent, useState, useRef } from '../../../../shared/modules/React';
import {TextField,FormControlLabel,FormControl} from '../../../../shared/modules/MaterialImports/FormInputs';
import {Stack} from '../../../../shared/modules/MaterialImports/Stack';
import {Grid} from '../../../../shared/modules/MaterialImports/Grid';
import AccordionActions from '@mui/material/AccordionActions';

// import InputAdornment from '@mui/material/InputAdornment';
import AddIcon from '@mui/icons-material/Add';
import {Radio, RadioGroup, Checkbox} from '../../../../shared/modules/MaterialImports/FormElements';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {MenuItem} from '../../../../shared/modules/MaterialImports/Menu';
import Autocomplete from '@mui/material/Autocomplete';
// import { showToaster } from '../../../shared/SnackBar/SnackBar';
import CloseIcon from '@mui/icons-material/Close';
// import AddIcon from '@mui/icons-material/Add';
//import { DEGREE_TYPES, TAXONOMIES, LANGUAGES } from '../../../../shared/data/Community/Community';
// import masterStatesList from '../../../../shared/data/States';
import {Button} from '../../../../shared/modules/MaterialImports/Button';
// import InputLabel from '@mui/material/InputLabel';
// import Paper from '@mui/material/Paper';
// import { Theme, useTheme } from '@mui/material/styles';


import {
    // FieldArray,
    Form,
    Formik,
    useFormik,
    Yup
} from '../../../../shared/modules/Formik';


import ApiService from '../../../../shared/api/api';
import {Accordion, AccordionSummary, AccordionDetails, } from '../../../../shared/modules/MaterialImports/Accordion';
import {Typography} from '../../../../shared/modules/MaterialImports/Typography';
import {Chip} from '../../../../shared/modules/MaterialImports/Chip';
// import IconButton from '@mui/material/IconButton';
import {Dialog, DialogTitle, DialogContent, DialogActions} from '../../../../shared/modules/MaterialImports/Dialog';
import './CuratelySearchFilter.scss';
import {FormGroup} from '../../../../shared/modules/MaterialImports/FormGroup';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
// import OutlinedInput from '@mui/material/OutlinedInput';
import {Box} from '../../../../shared/modules/MaterialImports/Box';
// import ListItemText from '@mui/material/ListItemText';
import { MUIAutoComplete } from '../../../shared/MUIAutoComplete/MUIAutoComplete';
// import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { trackPromise } from '../../../../shared/modules/PromiseTrackter';
import { showToaster } from '../../../shared/SnackBar/SnackBar';
import { userLocalData } from '../../../../shared/services/userData';
import { useSearchParams } from 'react-router-dom';
// import { Margin } from '@mui/icons-material';





// const sites: User[] = [
//     { name: "Monster", isChecked: true, nameToPass: "Monster" },
//     { name: "Career Builder", isChecked: true, nameToPass: "Careerbuilder" },
//     { name: "Local Database", isChecked: true, nameToPass: "Mastercand" }
// ];


// interface User {
//     name: string;
//     isChecked?: boolean;
//     nameToPass: string;
// }
type SkillSet = {
    id: number;
    skills: string[];
};
type workAuth1 = {
    title: string[];
}

const CuratelySearchFilter = ({ onApply, updateJobDetails, passedData }: { onApply: any, updateJobDetails: any, passedData: any }) => {

    const [searchParams] = useSearchParams();
    const [expanded, setExpanded] = useState<string | false>('searchPanel');
    const [jobTitleSuggestions, setJobTitleSuggestions] = useState([]);
    const [allSkills, setAllSkills] = useState<SkillSet[]>([{ id: 0, skills: [] }]);
    const [workAuth, setWorkAuth] = useState<workAuth1[]>([{ title: [] }]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
    // const [users, setUsers] = useState<User[]>(sites);
    // const [skillSuggestions, setSkillSuggestions] = useState([]);
    const [jobModalOpen, setJobModalOpen] = useState(false);
    // const [anchorMenuEl, setAnchorMenuEl] = useState<null | HTMLElement>(null);
    const [selectedJobTitle, setSelectedJobTitle] = useState({
        title: "",
        id: ""
    });
    useEffect(() => {
        let jobTitle = searchParams.get('jobTitle');
        let jobId = searchParams.get('jobId');
        if (jobTitle && jobId) {
            setSelectedJobTitle({
                title: jobTitle ? jobTitle : "",
                id: jobId ? jobId : ""
            });
            CuratelySearchFilter.setFieldValue('selectedJobId', jobId);
            CuratelySearchFilter.setFieldValue('selectedJobTitle', jobTitle);
        } else if (passedData?.selectedJobId && passedData?.selectedJobTitle) {
            setSelectedJobTitle({
                title: passedData.selectedJobTitle,
                id: passedData.selectedJobId
            })
        }
        else {
            // setJobModalOpen(true);
        }
    }, [searchParams]);

    // const searchSkillsFromDescription = (id = "", desc = "") => {
    //     if (id || desc) {
    //         let dataToPass: any = {
    //         }
    //         if (id) {
    //             dataToPass.jobid = id;
    //         }
    //         if (desc) {
    //             dataToPass.descr = desc.replace(/[^a-zA-Z0-9~`!@#$%^&*()_+-={}|:;<>,.?\/ \n[\]']/g, "").replace(/\s+/g, ' ').replace('\\r\\n', ' ').replaceAll('\\', ' ').replaceAll('\n', ' ');
    //         }
    //         trackPromise(
    //             ApiService.getByParams(193, 'Curately/Sovren/sovren_curately_comunity_sovren_skills.jsp', dataToPass)

    //                 .then(
    //                     (result: any) => {
    //                         // console.log(result);
    //                         if (result.data && result.data && ((result.data.skills && result.data.skills.length) || (result.data.jobTitle && result.data.jobTitle.trim()) || (result.data.ParsedDocument && result.data.ParsedDocument.trim()))) {
    //                             let tempData = { ...CuratelySearchFilter.values };
    //                             if (result.data.skills && result.data.skills.length) {

    //                                 let tempSkills = [{
    //                                     recentUse: true,
    //                                     experLevel: "",
    //                                     skillName: ""
    //                                 }];
    //                                 tempSkills = [];
    //                                 for (let ts = 0; ts < result.data.skills.length; ts++) {
    //                                     if (result.data.skills[ts]) {
    //                                         tempSkills.push({
    //                                             recentUse: true,
    //                                             experLevel: "",
    //                                             skillName: result.data.skills[ts]
    //                                         });
    //                                     }
    //                                 }
    //                                 if (tempSkills.length) {
    //                                     // let skillsTempArray = [
    //                                     //     ...CuratelySearchFilter.values.skills
    //                                     // ];
    //                                     // for (let st = 0; st < tempSkills.length; st++) {
    //                                     //     skillsTempArray.push(tempSkills[st]);
    //                                     // }
    //                                     tempData.skills = tempSkills;
    //                                     CuratelySearchFilter.setFieldValue('skills', tempSkills);
    //                                 } else {
    //                                     tempData.skills = [];
    //                                     CuratelySearchFilter.setFieldValue('skills', []);
    //                                 }
    //                             }
    //                             if (result.data.jobTitle && result.data.jobTitle.trim()) {
    //                                 tempData.jobTitle = [{
    //                                     title: result.data.jobTitle,
    //                                     recentJobTitle: false
    //                                 }];
    //                                 CuratelySearchFilter.setFieldValue('jobTitles', [{
    //                                     title: result.data.jobTitle,
    //                                     required: false
    //                                 }]);
    //                             }
    //                             else {
    //                                 tempData.jobTitle = [];
    //                                 CuratelySearchFilter.setFieldValue('jobTitles', []);
    //                             }
    //                             if (result.data.ParsedDocument && result.data.ParsedDocument.trim()) {

    //                                 tempData.parsedDocument = result.data.ParsedDocument;
    //                                 CuratelySearchFilter.setFieldValue('parsedDocument', result.data.ParsedDocument);
    //                             }
    //                             else {
    //                                 tempData.parsedDocument = "";
    //                                 CuratelySearchFilter.setFieldValue('parsedDocument', "");
    //                             }
    //                             // onApply(tempData);
    //                         }
    //                     }
    //                 )
    //         )
    //     }
    // }

    //https://curately.ai/Accuick_API/Jobboards/search.jsp?sites=Mastercand,Monster,Careerbuilder&keyWords=vb&daysBack=30

    //  const getTextFromHTML = (html: string) => {
    //     let divContainer = document.createElement("textarea");
    //     divContainer.innerHTML = html;
    //     return divContainer.value || divContainer.innerText || "";
    // }
    // const getSearchDetails = (passedData: any) => {

    // }


    const id = open ? 'simple-popover' : undefined;
    const skillOptions: readonly any[] = [
        //     "Angular",
        //     "React",
        //     "Vue",
        //     "JavaScript",
        //     "TypeScript",
        //     "Node.js",
        //     "Express.js",
        //     "HTML5",
        //     "CSS3",
        //     "Sass",
        //     "Less",
        //     "Webpack",
        //     "Babel",
        //     "Redux",
        //     "MobX",
        //     "GraphQL",
        //     "REST API",
        //     "Django",
        //     "Flask",
        //     "Ruby on Rails",
        //     "Java",
        //     "Spring Boot",
        //     "C#",
        //     ".NET Core",
        //     "Python",
        //     "Go",
        //     "Rust",
        //     "SQL",
        //     "MongoDB",
        //     "PostgreSQL",
        //     "Docker",
        //     "Kubernetes",
        //     "AWS",
        //     "Azure",
        //     "GCP",
        //     "Firebase",
        //     "Git",
        //     "Jenkins",
        //     "Travis CI",
        //     "JUnit",
        //     "Selenium",
        //     "Jest",
        //     "Mocha",
        //     "Chai",
        //     "Agile",
        //     "Scrum",
        //     "Kanban"
    ];

    const validationSchema = Yup.object({
        selectedJobTitle: Yup.string(),
        selectedJobId: Yup.string(),
        parsedDocument: Yup.string(),

        skills: Yup.array().of(
            Yup.object().shape({
                recentUse: Yup.boolean(),
                experLevel: Yup.string(),
                skillName: Yup.string(),
            })
        ),
        keyWords: Yup.string(),
        location: Yup.object().shape({
            state: Yup.string(),
            zipcode: Yup.string(),
            radius: Yup.string(),
            willingtoRelocate: Yup.boolean()
        }),
        employer: Yup.array().of(
            Yup.object().shape({
                employerName: Yup.string(),
                recentEmployer: Yup.boolean(),
            })
        ),
        jobTitle:
            Yup.object().shape({
                title: Yup.string(),
                recentJobTitle: Yup.boolean()
            }),
        daysBack: Yup.string(),

        school: Yup.string(),
        workAuth: Yup.array(),

        govtclear: Yup.string(),
        date: Yup.string(),
        mrjd: Yup.string(),
        jsp: Yup.string(),
        limit: Yup.string(),
        smp: Yup.string(),
        fulltime: Yup.boolean(),
        parttime: Yup.boolean(),
        employee: Yup.boolean(),
        intern: Yup.boolean(),
        temporary: Yup.boolean(),
        seasonal: Yup.boolean(),


    });
    const CuratelySearchFilter = useFormik({
        initialValues: passedData ? passedData : {
            monster: true,
            careerBuilder: true,
            localDatabase: true,
            selectedJobTitle: "",
            selectedJobId: "",
            parsedDocument: "",
            skills: [
                {
                    recentUse: false,
                    experLevel: "",
                    skillName: ""
                }
            ],
            keyWords: "",
            location: {
                states: "",
                zipcode: "",
                radius: "",
                willingtoRelocate: false

            },
            employer: [
                {
                    employerName: "",
                    recentEmployer: false
                }
            ],
            jobTitle: [
                {
                    title: "",
                    recentJobTitle: false
                }
            ],
            daysBack: "30",


            school: "",
            workAuth: "",

            govtclear: "",
            date: "",
            mrjd: "",
            jsp: "",
            limit: "",
            smp: "",
            fulltime: "",
            parttime: "",
            perdiem: "",
            employee: "",
            intern: "",
            temporary: "",
            seasonal: "",


        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // console.log('Form values:', values);
        },
    });

    function handleAddSkillSet() {
        setAllSkills([...allSkills, { id: allSkills.length, skills: [] }]);
    }

    function handleAddSkillToSet(newValue: string[], index: number) {
        const newSkills = [...allSkills];
        newSkills[index].skills = newValue;
        setAllSkills(newSkills);
    }
    // function handleWorkAuth(newValue: string[], index: number) {
    //     const newSkills = [...workAuth];
    //     newSkills[index].title = newValue;
    //     setWorkAuth(newSkills);
    //     CuratelySearchFilter.setFieldValue('workAuth', newValue);
    // }

    function generatekeyWords() {
        const formattedSkills = allSkills.map(skillSet => {
            const formattedSet = skillSet.skills.map(skill => {
                return skill.includes(' ') ? `"${skill}"` : skill;
            });
            if (formattedSet.length > 1) {
                return "(" + formattedSet.join(" OR ") + ")";
            }
            return formattedSet[0] || "";
        });
        let resultString = formattedSkills.join(" AND ").trim();
        if (resultString.endsWith("AND")) {
            resultString = resultString.substring(0, resultString.lastIndexOf("AND")).trim();
        }
        CuratelySearchFilter.setFieldValue('keyWords', resultString);
        handleCloseAddSkillsDialog();
        // return resultString;
    }

    const handleOpenAddSkillsDialog = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseAddSkillsDialog = () => {
        setAnchorEl(null);
    };
    const searchJobTitles = (val: string) => {

        ApiService.postWithData('admin', 'lighthouse', {
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
    // const searchSkills = (val: string) => {

    //     ApiService.postWithData('CTS', 'lighthouse', {
    //         inputType: "skill",
    //         query: val,
    //         limit: "5"
    //     }
    //     ).then(
    //         (result: any) => {
    //             // console.log(result);
    //             if (result.data && result.data.data && result.data.data.length) {
    //                 setSkillSuggestions(result.data.data);
    //             }
    //         }
    //     )
    // }
    // const deleteSkillSuggestionById = (id: string) => {
    //     setSkillSuggestions(e => e.filter((data: { name: string, id: string }) => data.id !== id))
    // }

    // const CustomPaper = (props: any) => {
    //     return <Paper elevation={3} {...props} sx={{
    //         '& .MuiAutocomplete-option': {
    //             fontWeight: '600',
    //             color: 'var(--c-text-header)'
    //         }
    //     }} />;
    // };
    // const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    //     setExpanded(isExpanded ? panel : false);
    // };
    const inputRef = useRef<HTMLInputElement>(null);
    //input ref 

    const handleAccordionChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);

        // Focus the input if the panel is expanded
        if (isExpanded) {
            // Delay the focus slightly to ensure the panel is fully expanded
            setTimeout(() => {
                inputRef.current?.focus();
            }, 0);
        }
    };


    const searchResumes = (e: any) => {
        e.preventDefault();
        // console.log(CuratelySearchFilter.values.jobTitleSwitch)
    }

    const onApplyFilters = () => {
        console.log(CuratelySearchFilter.values);
        // onApply(CuratelySearchFilter.values);
        if (CuratelySearchFilter.values.monster || CuratelySearchFilter.values.careerBuilder || CuratelySearchFilter.values.localDatabase) {
            if (CuratelySearchFilter.values.selectedJobId) {
                if (CuratelySearchFilter.values.keyWords) {
                    let sites = [];
                    if (CuratelySearchFilter.values.monster) {
                        sites.push("Monster");
                    }
                    if (CuratelySearchFilter.values.careerBuilder) {
                        sites.push("Careerbuilder");
                    }
                    if (CuratelySearchFilter.values.localDatabase) {
                        sites.push("Mastercand");
                    }
                    let tempData: any = {
                        recrId: userLocalData.getvalue('recrId'),
                        sites: sites.join(','),
                        keyWords: (CuratelySearchFilter.values.keyWords) ? CuratelySearchFilter.values.keyWords : "",
                        jobTitle: (CuratelySearchFilter.values.jobTitle[0].title) ? CuratelySearchFilter.values.jobTitle[0].title : "",
                        recentJobTitle: (CuratelySearchFilter.values.jobTitle[0].recentJobTitle) ? CuratelySearchFilter.values.jobTitle[0].recentJobTitle : "",
                        daysBack: (CuratelySearchFilter.values.daysBack) ? CuratelySearchFilter.values.daysBack : "",
                        company: (CuratelySearchFilter.values.employer[0].employerName) ? CuratelySearchFilter.values.employer[0].employerName : "",
                        recentEmployer: (CuratelySearchFilter.values.employer[0].recentEmployer) ? CuratelySearchFilter.values.employer[0].recentEmployer : "",
                        school: (CuratelySearchFilter.values.school) ? CuratelySearchFilter.values.school : "",
                        workAuth: (CuratelySearchFilter.values.workAuth) ? CuratelySearchFilter.values.workAuth : "",
                        govtclear: (CuratelySearchFilter.values.govtclear) ? CuratelySearchFilter.values.govtclear : "",
                        states: (CuratelySearchFilter.values.location.states) ? CuratelySearchFilter.values.location.states : "",
                        zipcode: (CuratelySearchFilter.values.location.zipcode) ? CuratelySearchFilter.values.location.zipcode : "",
                        radius: (CuratelySearchFilter.values.location.radius) ? CuratelySearchFilter.values.location.radius : "",
                        willingtoRelocate: (CuratelySearchFilter.values.location.willingtoRelocate) ? CuratelySearchFilter.values.location.willingtoRelocate : "",
                        az: "",
                        wc: "",
                        rlimit: "",
                        selectedJobId: (CuratelySearchFilter.values.selectedJobId) ? CuratelySearchFilter.values.selectedJobId : ""
                    }
                    trackPromise(
                        ApiService.getByParams(193, 'Jobboards/search.jsp', tempData)
                            .then((result) => {
                                // setJobsData(result);
                                // console.log(result.data.searchId);
                                tempData.searchId = result.data.searchId;
                                onApply(tempData, CuratelySearchFilter.values);
                                saveAuditLog(4112);
                            })
                    )
                } else {
                    showToaster('Please enter Search String .', 'error');
                    // setExpanded('searchPanel');
                }
            } else {
                showToaster('Please select Job to search.', 'error');
              //  setJobModalOpen(true);
            }
        } else {
            setExpanded('jobboardpanel');
            showToaster('Select one Job Board At least.', 'error');
        }

    }

    const updateCuratelySearchFilter = (type: 'add' | 'delete' | 'update', val: any, objectName: 'jobTitle' | 'skills' | 'employer', index?: number) => {
        setTimeout(() => {
            let objToModify = [
                ...CuratelySearchFilter.values[objectName]
            ];
            if (type === 'delete') {
                objToModify.splice(index || 0, 1);
            }
            if (type === 'update') {
                if (objectName === 'jobTitle') {
                    // @ts-ignore
                    objToModify[index].title = val;
                } else if (objectName === 'skills') {
                    // @ts-ignore
                    objToModify[index].skillName = val;
                }
            }
            if (type === 'add') {
                objToModify.push(val);
                if (objectName === 'jobTitle') {
                    searchJobTitles(val.title);
                    // } else if (objectName === 'skills') {
                    //     searchSkills(val.skillName);
                }
            }
            CuratelySearchFilter.setFieldValue(objectName, objToModify);
        }, 150);
    }

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, checked } = e.target;
    //     const matchResult = name.match(/\[(\d+)\]/);
    //     const index = matchResult ? Number(matchResult[1]) : -1;
    //     //  const index = Number(name.match(/\[(\d+)\]/)[1]); // Extract the index from the name

    //     if (name === "allSelect") {
    //         let tempUsers = users.map((user) => {
    //             return { ...user, isChecked: checked };
    //         });
    //         setUsers(tempUsers);
    //     } else {
    //         let tempUsers = users.map((user, i) =>
    //             i === index ? { ...user, isChecked: checked } : user
    //         );
    //         setUsers(tempUsers);
    //     }
    // };

    const namesWA = [
        "Employment Auth Document",
        "Green Card",
        "H-1 Visa Holder",
        "Need H1",
        "TN Permit Holder",
        "U.S.Citizen"
    ];


    const handleClear = (key: string, e?: SyntheticEvent, i?: number) => {
        e?.stopPropagation();
        if (key === "All") {
            CuratelySearchFilter.setFieldValue("keyWords", "");
            setAllSkills([{ id: 0, skills: [] }]);
            CuratelySearchFilter.setFieldValue("location.states", "");
            CuratelySearchFilter.setFieldValue("location.zipcode", "");
            CuratelySearchFilter.setFieldValue("location.radius", "");
            CuratelySearchFilter.setFieldValue("location.willingtoRelocate", false);
            CuratelySearchFilter.setFieldValue("employer", [{
                employerName: "",
                recentEmployer: false
            }]);
            CuratelySearchFilter.setFieldValue("jobTitle", [{
                title: "",
                recentJobTitle: false
            }]);
            CuratelySearchFilter.setFieldValue("school", "");
            CuratelySearchFilter.setFieldValue("workAuth", "");
            CuratelySearchFilter.setFieldValue("govtclear", "");
            setWorkAuth([{
                title: []
            }]);

        } else if (key === "keyWords") {
            if (i === undefined) {
                CuratelySearchFilter.setFieldValue("keyWords", "");
                setAllSkills([{ id: 0, skills: [] }]);
            }
        } else if (key === "location.states") {
            if (i === undefined) {
                CuratelySearchFilter.setFieldValue("location.states", "");
            }
        } else if (key === "govtclear") {
            if (i === undefined) {
                CuratelySearchFilter.setFieldValue("govtclear", "");
            }
        } else if (key === "location.zipcode") {
            if (i === undefined) {
                CuratelySearchFilter.setFieldValue("location.zipcode", "");
            }
        } else if (key === "location.radius") {
            if (i === undefined) {
                CuratelySearchFilter.setFieldValue("location.radius", "");
            }

        } else if (key === "employer") {
            CuratelySearchFilter.setFieldValue("employer", [{
                employerName: "",
                recentEmployer: false
            }]);
        } else if (key === "jobTitle") {
            CuratelySearchFilter.setFieldValue("jobTitle", [{
                title: "",
                recentJobTitle: false
            }]);

        } else if (key === "school") {
            if (i === undefined) {
                CuratelySearchFilter.setFieldValue("school", "");
            }
        } else if (key === "workAuth") {
            if (i === undefined) {
                //CuratelySearchFilter.values.workAuth ? CuratelySearchFilter.values.workAuth.split(', ') : []
                CuratelySearchFilter.setFieldValue("workAuth", "");
                setWorkAuth([{
                    title: []
                }]);
            }
        }

    }
    const saveAuditLog = (id: number) => {
        ApiService.saveAuditLog(id);
    }

    return (
        <div className='accordian-wrap customFilterChips'>
            <Stack direction="row" justifyContent="space-between" className='heading'>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography component="h5">Filters</Typography>

                    {(CuratelySearchFilter.values.keyWords !== "" || CuratelySearchFilter.values.govtclear !== "" || CuratelySearchFilter.values.location.states.length > 0 ||
                        CuratelySearchFilter.values.location.zipcode !== "" || CuratelySearchFilter.values.location.radius !== "" ||
                        (((CuratelySearchFilter.values.employer.length === 1) && (CuratelySearchFilter.values.employer[0].employerName)) || (CuratelySearchFilter.values.employer.length > 1)) ||
                        (((CuratelySearchFilter.values.jobTitle.length === 1) && (CuratelySearchFilter.values.jobTitle[0].title)) || (CuratelySearchFilter.values.jobTitle.length > 1)) ||
                        (CuratelySearchFilter.values.workAuth.length > 0) || CuratelySearchFilter.values.school !== ""
                    ) && <Stack
                        className='clearStack'
                        direction="row"
                        justifyContent="space-around"
                        onClick={(event) => handleClear("All", event)}
                    // onClick={(e) => {
                    //     e.stopPropagation();
                    //     CuratelySearchFilter.setFieldValue("keyWords", "");
                    //     setAllSkills([{ id: 0, skills: [] }]);
                    // }}
                    >
                            <CloseIcon />
                            <Typography>
                                {(CuratelySearchFilter.values.keyWords !== "" ? 1 : 0) +
                                    (CuratelySearchFilter.values.govtclear !== "" ? 1 : 0) +
                                    (CuratelySearchFilter.values.location?.states?.length ? 1 : 0) +
                                    (CuratelySearchFilter.values.location?.zipcode !== "" ? 1 : 0) +
                                    (CuratelySearchFilter.values.location?.radius !== "" ? 1 : 0) +
                                    (((CuratelySearchFilter.values.employer.length === 1) && (CuratelySearchFilter.values.employer[0].employerName)) || (CuratelySearchFilter.values.employer.length > 1) ? 1 : 0) +
                                    ((((CuratelySearchFilter.values.jobTitle.length === 1) && (CuratelySearchFilter.values.jobTitle[0].title)) || (CuratelySearchFilter.values.jobTitle.length > 1)) ? 1 : 0) +
                                    (CuratelySearchFilter.values.school !== "" ? 1 : 0) +
                                    (CuratelySearchFilter.values.workAuth.length ? 1 : 0)
                                }
                            </Typography>
                        </Stack>
                    }


                </Stack>
                <div>
                    {/* <Button
                        onClick={() => {
                            setJobModalOpen(true);
                            // setAnchorMenuEl(null);
                        }}
                        className='fw-6'
                    >
                        Select Job
                    </Button> */}

                </div>
            </Stack >
            {/* <Grid className='py-2 pl-4 pr-2 fs-12 fw-5' sx={{ cursor: 'pointer' }} onClick={() => {
                setJobModalOpen(true);
                // setAnchorMenuEl(null);
            }}>
                {(selectedJobTitle.title) ? "Job: " : ""}
                <span className='c-darkGrey fs-13'>{selectedJobTitle.title}</span>
            </Grid> */}
            <div className="wrapper mt-2">

                <Formik
                    // onSubmit={() => CuratelySearchFilter.handleChange}
                    // enableReinitialize
                    onSubmit={searchResumes}
                    initialValues={CuratelySearchFilter.initialValues}
                >
                    {
                        ({ errors, values, touched, setFieldValue, handleChange }) => (
                            <Form
                                // onSubmit={CuratelySearchFilter.handleSubmit}
                                placeholder=""
                            >
                                <div className='filterListTab'>
                                    <Accordion
                                        disableGutters square
                                        expanded={true}
                                        className='filterListTab_searchPanel'
                                    // onChange={handleAccordionChange('searchPanel')}
                                    >
                                        <AccordionSummary
                                        // expandIcon={<ArrowDropDownIcon />}

                                        >
                                            <Stack sx={{ width: '100%' }}>
                                                <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                    <Stack direction="row" alignItems="center">
                                                        {/* <ManageSearchOutlinedIcon className='title-icon' /> */}
                                                        <Typography>Search String</Typography>
                                                    </Stack>
                                                    {CuratelySearchFilter.values.keyWords !== "" && <Stack
                                                        className='clearStack'
                                                        direction="row"
                                                        justifyContent="space-around"
                                                        // onClick={(event) => handleClear("keyWords", event)}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            CuratelySearchFilter.setFieldValue("keyWords", "");
                                                            setAllSkills([{ id: 0, skills: [] }]);
                                                            // saveAuditLog(4104);
                                                        }}
                                                    >
                                                        <CloseIcon />
                                                        <Typography>
                                                            {CuratelySearchFilter.values.keyWords !== "" ? 1 : 0}
                                                        </Typography>
                                                    </Stack>
                                                    }
                                                </Stack>
                                                {/* {(CuratelySearchFilter.values.keyWords !== "") &&
                                                    <Stack direction="row" mt={1} flexWrap="wrap">
                                                        <div className='filterLabelName'>Search string:</div>
                                                        <Chip label={CuratelySearchFilter.values.keyWords} icon={<CloseIcon />}
                                                            className='selectedChips' onClick={(event) => handleClear("keyWords", event)} />
                                                    </Stack>
                                                } */}
                                            </Stack>
                                        </AccordionSummary>
                                        {/* <Box sx={{ minWidth: '200px', p: 5 }}> */}
                                        <MUIAutoComplete
                                            className='select_job_name'
                                            id='jobTitle'
                                            handleChange={(id: any, name: string) => {
                                                CuratelySearchFilter.setFieldValue('selectedJobId', id);
                                                CuratelySearchFilter.setFieldValue('selectedJobTitle', name);
                                                setIsButtonDisabled(false);
                                            }}
                                            valuePassed={(CuratelySearchFilter.values.selectedJobId) ? { label: CuratelySearchFilter.values.selectedJobTitle, id: CuratelySearchFilter.values.selectedJobId } : {}}
                                            isMultiple={false}
                                            textToShow="Select Job"
                                            width="88%"
                                            type='assignJobToCandidate'
                                            placeholder="Select Job"

                                        />
                                        {/* </Box> */}
                                        <AccordionActions className='build_string_button_main'>
                                            <Button className='build_string_button' onClick={handleOpenAddSkillsDialog}>Build String</Button>
                                        </AccordionActions>
                                        <AccordionDetails>
                                            <FormControl fullWidth>
                                                <textarea
                                                    id="keyWords"
                                                    name="keyWords"
                                                    placeholder="Enter search string..."
                                                    // value={generatekeyWords()}
                                                    value={CuratelySearchFilter.values.keyWords}
                                                    onChange={CuratelySearchFilter.handleChange}
                                                    rows={3}
                                                />

                                            </FormControl>
                                        </AccordionDetails>
                                    </Accordion>

                                    <Accordion disableGutters square expanded={expanded === 'jobboardpanel'} onChange={handleAccordionChange('jobboardpanel')} className='borderBottom'>
                                        <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                                            <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                <Stack direction="row" alignItems="center">
                                                    <Typography>Job Board</Typography>
                                                </Stack>
                                            </Stack>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <FormGroup onClick={() => saveAuditLog(4105)}>

                                                {/* {users.map((user, index) => ())} */}
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox size="small"
                                                        />
                                                    }
                                                    name="monster"
                                                    checked={CuratelySearchFilter.values.monster}
                                                    onChange={CuratelySearchFilter.handleChange}
                                                    label={"Monster"}
                                                />

                                                <FormControlLabel
                                                    control={
                                                        <Checkbox size="small"
                                                        />
                                                    }
                                                    name="careerBuilder"
                                                    checked={CuratelySearchFilter.values.careerBuilder}
                                                    onChange={CuratelySearchFilter.handleChange}
                                                    label={"Career Builder"}
                                                />

                                                <FormControlLabel
                                                    control={
                                                        <Checkbox size="small"
                                                        />
                                                    }
                                                    name="localDatabase"
                                                    checked={CuratelySearchFilter.values.localDatabase}
                                                    onChange={CuratelySearchFilter.handleChange}
                                                    label={"Local Database"}
                                                />



                                            </FormGroup>

                                        </AccordionDetails>
                                    </Accordion>



                                    <Accordion disableGutters square expanded={expanded === 'locationPanel'}
                                        onChange={handleAccordionChange('locationPanel')} onClick={()=> saveAuditLog(4106)}>
                                        <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                                            <Stack sx={{ width: '100%' }}>
                                                <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                    <Stack direction="row" alignItems="center">

                                                        <Typography>Location</Typography>
                                                    </Stack>
                                                    {(CuratelySearchFilter.values.location.states.length > 0 || CuratelySearchFilter.values.location.zipcode !== "" || CuratelySearchFilter.values.location.radius !== "") && <Stack
                                                        className='clearStack'
                                                        direction="row"
                                                        justifyContent="space-around"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            CuratelySearchFilter.setFieldValue("location.states", "");
                                                            CuratelySearchFilter.setFieldValue("location.zipcode", "");
                                                            CuratelySearchFilter.setFieldValue("location.radius", "");
                                                            CuratelySearchFilter.setFieldValue("location.willingtoRelocate", false);
                                                        }}
                                                    >
                                                        <CloseIcon />
                                                        <Typography>
                                                            {/* {(CuratelySearchFilter.values.location.states && CuratelySearchFilter.values.location.states.split(',') ? CuratelySearchFilter.values.location.states.split(',').length : 0) +
                                                                (CuratelySearchFilter.values.location.zipcode !== "" ? 1 : 0)} */}


                                                            {(CuratelySearchFilter.values.location.states.length ? 1 : 0) + (CuratelySearchFilter.values.location.zipcode !== "" ? 1 : 0) + (CuratelySearchFilter.values.location.radius !== "" ? 1 : 0)}
                                                        </Typography>
                                                    </Stack>
                                                    }
                                                </Stack>
                                                {((CuratelySearchFilter.values.location.states.length > 0) && expanded !== 'locationPanel') &&
                                                    <Stack direction="row" mt={1} flexWrap="wrap">
                                                        {CuratelySearchFilter.values.location.states.length > 0 && <div className='mb-1'>
                                                            <Typography className='filterLabelName'>States:</Typography>
                                                            {CuratelySearchFilter.values.location.states.split(',').map((item: any, i: number) => (
                                                                <Chip label={item} key={i} icon={<CloseIcon />} className='selectedChips'
                                                                    onClick={(event) => handleClear("location.states", event)} />
                                                            ))}
                                                        </div>}

                                                    </Stack>

                                                }
                                                {((CuratelySearchFilter.values.location.zipcode !== "") && expanded !== 'locationPanel') &&
                                                    <Stack direction="row" mt={1} flexWrap="wrap">
                                                        <div className='filterLabelName'>Zipcode:</div>
                                                        <Chip label={CuratelySearchFilter.values.location.zipcode} icon={<CloseIcon />}
                                                            className='selectedChips' onClick={(event) => handleClear("location.zipcode", event)} />
                                                    </Stack>
                                                }
                                                {((CuratelySearchFilter.values.location.radius !== "") && expanded !== 'locationPanel') &&
                                                    <Stack direction="row" mt={1} flexWrap="wrap">
                                                        <div className='filterLabelName'>Radius:</div>
                                                        <Chip label={CuratelySearchFilter.values.location.radius} icon={<CloseIcon />}
                                                            className='selectedChips' onClick={(event) => handleClear("location.radius", event)} />
                                                    </Stack>
                                                }
                                            </Stack>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <div>
                                                <FormControl fullWidth>
                                                    <MUIAutoComplete
                                                        id="location.states"
                                                        handleChange={(id: any, name: string) => {
                                                            CuratelySearchFilter.setFieldValue('location.states', id);
                                                            // console.log(id);
                                                        }}
                                                        valuePassed={
                                                            Array.isArray((CuratelySearchFilter.values.location.states)) ?
                                                                { label: CuratelySearchFilter.values.location.states.join(), id: CuratelySearchFilter.values.location.states.join() }
                                                                :
                                                                (CuratelySearchFilter.values.location.states) ?
                                                                    { label: CuratelySearchFilter.values.location.states, id: CuratelySearchFilter.values.location.states }
                                                                    :
                                                                    {}
                                                        }
                                                        isMultiple={true}
                                                        // width="200px"
                                                        type='states'
                                                        placeholder="Location"
                                                        refToPass={expanded === 'locationPanel' ? inputRef : null}
                                                    />
                                                    {/* // <Autocomplete
                                                    //     multiple
                                                    //     id='location.states'
                                                    //     options={masterStatesList.map((option) => option.label)}
                                                    //     value={CuratelySearchFilter.values.location.states ? CuratelySearchFilter.values.location.states.split(', ') : []}
                                                    //     freeSolo
                                                    //     renderTags={(value: readonly string[], getTagProps) =>
                                                    //         value.map((option: string, index: number) => (
                                                    //             <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                                    //         ))
                                                    //     }
                                                    //     renderInput={(params) => (
                                                    //         <TextField
                                                    //             {...params}
                                                    //             variant="outlined"
                                                    //             placeholder="Select states"
                                                    //         />
                                                    //     )}
                                                    //     PaperComponent={CustomPaper}
                                                    //     onChange={(e, value) => CuratelySearchFilter.setFieldValue("location.states", value.join(', '))}
                                                    //     sx={{ mb: 1 }}
                                                    // /> */}
                                                </FormControl>
                                                <FormControlLabel
                                                    control={<Checkbox />}
                                                    label="Check here to include candidates willing to work in state/country."
                                                    id="Include"
                                                    name="Include"
                                                    onChange={CuratelySearchFilter.handleChange}
                                                    onBlur={CuratelySearchFilter.handleBlur}
                                                    value={CuratelySearchFilter.values.location.willingtoRelocate}
                                                />
                                                <TextField
                                                    className={`mt-2`}
                                                    fullWidth
                                                    id={`location.zipcode`}
                                                    variant="outlined"
                                                    type="number"
                                                    size="small"
                                                    label="Zipcode"
                                                    //placeholder="zipcode"
                                                    name={`location.zipcode`}
                                                    value={CuratelySearchFilter.values.location.zipcode}
                                                    onChange={CuratelySearchFilter.handleChange}

                                                />

                                                <TextField
                                                    fullWidth
                                                    id={`location.radius`}
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    label="Radius"
                                                    name={`location.radius`}
                                                    value={CuratelySearchFilter.values.location.radius}
                                                    onChange={CuratelySearchFilter.handleChange}
                                                    className={`mt-2`}
                                                    select

                                                >
                                                    <MenuItem value="5 miles">5 miles</MenuItem>
                                                    <MenuItem value="10 miles">10 miles</MenuItem>
                                                    <MenuItem value="20 miles">20 miles</MenuItem>
                                                    <MenuItem value="30 miles">30 miles</MenuItem>
                                                    <MenuItem value="40 miles">40 miles</MenuItem>
                                                    <MenuItem value="50 miles">50 miles</MenuItem>
                                                    <MenuItem value="75 miles">75 miles</MenuItem>
                                                    <MenuItem value="100 miles">100 miles</MenuItem>
                                                </TextField>

                                            </div>
                                        </AccordionDetails>
                                    </Accordion>

                                    <Accordion disableGutters square expanded={expanded === 'employerPanel'} onChange={handleAccordionChange('employerPanel')}>
                                        <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                                            <Stack sx={{ width: '100%' }}>
                                                <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                    <Stack direction="row" alignItems="center">

                                                        <Typography>Employer</Typography>
                                                    </Stack>
                                                    {(((CuratelySearchFilter.values.employer.length === 1) && (CuratelySearchFilter.values.employer[0].employerName)) || (CuratelySearchFilter.values.employer.length > 1)) && <Stack
                                                        className='clearStack'
                                                        direction="row"
                                                        justifyContent="space-around"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            CuratelySearchFilter.setFieldValue("employer", [{
                                                                employerName: "",
                                                                recentEmployer: false
                                                            }]);
                                                        }}
                                                    >
                                                        <CloseIcon />
                                                        <Typography>
                                                            {CuratelySearchFilter.values.employer.length ? 1 : 0}
                                                        </Typography>
                                                    </Stack>
                                                    }
                                                </Stack>
                                                {((((CuratelySearchFilter.values.employer.length === 1) && (CuratelySearchFilter.values.employer[0].employerName)) || (CuratelySearchFilter.values.employer.length > 1)) && expanded !== 'employerPanel') &&
                                                    <Stack direction="row" mt={1} flexWrap="wrap">

                                                        {CuratelySearchFilter.values.employer.length > 0 && <div className='mb-1'>
                                                            <Typography className='filterLabelName'>Employer:</Typography>
                                                            {CuratelySearchFilter.values.employer.map((item: any, i: number) => (
                                                                <Chip label={item.employerName} key={i} icon={<CloseIcon />} className='selectedChips'
                                                                    onClick={(event) => handleClear("employer", event, i)} />
                                                            ))}
                                                        </div>}

                                                    </Stack>
                                                }

                                            </Stack>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <div>
                                                <div>
                                                    {CuratelySearchFilter.values.employer && CuratelySearchFilter.values.employer.length > 0 ? (
                                                        CuratelySearchFilter.values.employer.map((employer: any, index: number) => (
                                                            <div key={`employer${index}`}>
                                                                <div>
                                                                    <TextField
                                                                        className={`mt-2`}
                                                                        fullWidth
                                                                        id={`employer.${index}.employerName`}
                                                                        variant="outlined"
                                                                        type="text"
                                                                        size="small"
                                                                        placeholder='Employer'
                                                                        name={`employer.${index}.employerName`}
                                                                        value={employer.employerName}
                                                                        onClick={()=>saveAuditLog(4107)}
                                                                        inputRef={expanded === 'employerPanel' ? inputRef : null}
                                                                        onChange={CuratelySearchFilter.handleChange} />
                                                                </div>
                                                                <FormControlLabel
                                                                    control={<Checkbox />}
                                                                    label="Only Search most recent Employer"
                                                                    id="Recent-Employer"
                                                                    name="Recent-Employer"
                                                                    onChange={CuratelySearchFilter.handleChange}
                                                                    onBlur={CuratelySearchFilter.handleBlur}
                                                                    value={employer.recentEmployer} />
                                                            </div>
                                                        ))
                                                    ) : null}
                                                </div>

                                            </div>
                                        </AccordionDetails>
                                    </Accordion>

                                    <Accordion disableGutters square expanded={expanded === 'jobTitlePanel'} onChange={handleAccordionChange('jobTitlePanel')}>
                                        <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                                            <Stack sx={{ width: '100%' }}>
                                                <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                    <Stack direction="row" alignItems="center">
                                                        <Typography>Job Title</Typography>
                                                    </Stack>
                                                    {(((CuratelySearchFilter.values.jobTitle.length === 1) && (CuratelySearchFilter.values.jobTitle[0].title)) || (CuratelySearchFilter.values.jobTitle.length > 1)) && <Stack
                                                        className='clearStack'
                                                        direction="row"
                                                        justifyContent="space-around"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            CuratelySearchFilter.setFieldValue("jobTitle", [{
                                                                title: "",
                                                                recentJobTitle: false
                                                            }]);
                                                        }}
                                                    >
                                                        <CloseIcon />
                                                        <Typography>
                                                            {CuratelySearchFilter.values.jobTitle.length ? 1 : 0}
                                                        </Typography>
                                                    </Stack>
                                                    }
                                                </Stack>
                                                {((((CuratelySearchFilter.values.jobTitle.length === 1) && (CuratelySearchFilter.values.jobTitle[0].title)) || (CuratelySearchFilter.values.jobTitle.length > 1)) && expanded !== 'jobTitlePanel') &&
                                                    <Stack direction="row" mt={1} flexWrap="wrap">

                                                        {CuratelySearchFilter.values.jobTitle.length > 0 && <div className='mb-1'>
                                                            <Typography className='filterLabelName'>Job Title:</Typography>
                                                            {CuratelySearchFilter.values.jobTitle.map((item: any, i: number) => (
                                                                <Chip label={item.title} key={i} icon={<CloseIcon />} className='selectedChips'
                                                                    onClick={(event) => handleClear("jobTitle", event, i)} />
                                                            ))}
                                                        </div>}

                                                    </Stack>
                                                }
                                            </Stack>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <div>
                                                {
                                                    CuratelySearchFilter.values.jobTitle && CuratelySearchFilter.values.jobTitle.length > 0
                                                        ?
                                                        CuratelySearchFilter.values.jobTitle.map((jobtitle: any, index: number) => (
                                                            <div key={`jobTitle${index}`}>
                                                                <div>
                                                                    <TextField
                                                                        className={`mt-2`}
                                                                        fullWidth
                                                                        id={`jobTitle.${index}.title`}
                                                                        variant="outlined"
                                                                        type="text"
                                                                        size="small"
                                                                        placeholder='Add Job Title'
                                                                        name={`jobTitle.${index}.title`}
                                                                        value={jobtitle.title}
                                                                        inputRef={expanded === 'jobTitlePanel' ? inputRef : null}
                                                                        onClick={()=> saveAuditLog(4108)}
                                                                        onChange={(e) => {
                                                                            CuratelySearchFilter.handleChange(e);
                                                                            // updateCuratelySearchFilter('update', e.target.value, 'jobTitles', index);
                                                                            // searchJobTitlesWithDebounce(e.target.value);
                                                                        }} />
                                                                </div>
                                                                <div>
                                                                    <FormControlLabel
                                                                        control={<Checkbox />}
                                                                        label="Only Search most recent Job Title"
                                                                        id="recent Job Title"
                                                                        name="recent Job Title"
                                                                        onChange={CuratelySearchFilter.handleChange}
                                                                        onBlur={CuratelySearchFilter.handleBlur}
                                                                        value={jobtitle.recentJobTitle} />
                                                                </div>
                                                            </div>

                                                        ))
                                                        :
                                                        null
                                                }
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
                                                                                        setTimeout(() => {
                                                                                            deleteJobTitleSuggestionById(item.id);
                                                                                        }, 50);
                                                                                        setTimeout(() => {
                                                                                            updateCuratelySearchFilter('add', { title: item.name, required: false }, 'jobTitle', values.jobTitle.length);
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
                                            <FormControl>
                                                <RadioGroup
                                                    name="daysBack"
                                                    id="daysBack"
                                                    onChange={(e)=>{CuratelySearchFilter.handleChange(e);saveAuditLog(4109);}}
                                                    defaultValue="30"
                                                    value={CuratelySearchFilter.values.daysBack}
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

                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion disableGutters square expanded={expanded === 'schoolPanel'} onChange={handleAccordionChange('schoolPanel')}>
                                        <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                                            <Stack sx={{ width: '100%' }}>
                                                <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                    <Stack direction="row" alignItems="center">
                                                        <Typography>Schools Attended</Typography>
                                                    </Stack>
                                                    {(CuratelySearchFilter.values.school !== "") && <Stack
                                                        className='clearStack'
                                                        direction="row"
                                                        justifyContent="space-around"
                                                        onClick={(e) => { e.stopPropagation(); CuratelySearchFilter.setFieldValue("school", "") }}
                                                    >
                                                        <CloseIcon />
                                                        <Typography>
                                                            {CuratelySearchFilter.values.school !== "" ? 1 : 0}
                                                        </Typography>
                                                    </Stack>
                                                    }
                                                </Stack>
                                                {(CuratelySearchFilter.values.school !== "" && expanded !== 'schoolPanel') &&
                                                    <Stack direction="row" mt={1} flexWrap="wrap">
                                                        <div className='filterLabelName'>School:</div>
                                                        <Chip label={CuratelySearchFilter.values.school} icon={<CloseIcon />}
                                                            className='selectedChips' onClick={(event) => handleClear("school", event)} />
                                                    </Stack>
                                                }
                                            </Stack>
                                        </AccordionSummary>

                                        <AccordionDetails>
                                            <FormControl fullWidth>
                                                <TextField
                                                    className={`mt-2`}
                                                    fullWidth
                                                    id="school"
                                                    variant="outlined"
                                                    size="small"
                                                    placeholder='Schools Attended'
                                                    name={`school`}
                                                    value={CuratelySearchFilter.values.school}
                                                    onClick={()=>saveAuditLog(4110)}
                                                    onChange={CuratelySearchFilter.handleChange}
                                                    inputRef={expanded === 'schoolPanel' ? inputRef : null}
                                                />
                                            </FormControl>
                                        </AccordionDetails>
                                    </Accordion>

                                    <Accordion disableGutters square expanded={expanded === 'workAuthPanel'} onChange={handleAccordionChange('workAuthPanel')}>
                                        <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                                            <Stack sx={{ width: '100%' }}>
                                                <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                    <Stack direction="row" alignItems="center">

                                                        <Typography>Work Authorization</Typography>
                                                    </Stack>
                                                    {(CuratelySearchFilter.values.workAuth.length > 0) && <Stack
                                                        className='clearStack'
                                                        direction="row"
                                                        justifyContent="space-around"
                                                        onClick={(e) => { e.stopPropagation(); CuratelySearchFilter.setFieldValue("workAuth", ""); setWorkAuth([{ title: [] }]); saveAuditLog(4109) } }
                                                    >
                                                        <CloseIcon />
                                                        <Typography>
                                                            {CuratelySearchFilter.values.workAuth.length > 0 ? 1 : 0}
                                                        </Typography>
                                                    </Stack>
                                                    }
                                                </Stack>
                                                {((CuratelySearchFilter.values.workAuth.length > 0) && expanded !== 'workAuthPanel') &&
                                                    <Stack direction="row" mt={1} flexWrap="wrap">
                                                        {CuratelySearchFilter.values.workAuth.length > 0 && <div className='mb-1'>
                                                            <Typography className='filterLabelName'>Work Auth:</Typography>
                                                            <Chip label={CuratelySearchFilter.values.workAuth} icon={<CloseIcon />}
                                                                className='selectedChips' onClick={(event) => handleClear("workAuth", event)} />
                                                            {/* {CuratelySearchFilter.values.workAuth.split(',').map((item: any, i: number) => (
                                                                <Chip label={item} key={i} icon={<CloseIcon />} className='selectedChips' />
                                                            ))} */}
                                                        </div>}

                                                    </Stack>

                                                }
                                            </Stack>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <div>
                                                <Stack direction="column" spacing={2}>
                                                    {workAuth.map((work, index) => (
                                                        <div key={index}>
                                                            {/* <Autocomplete
                                                            multiple
                                                            freeSolo
                                                            options={namesWA}
                                                            fullWidth
                                                            onKeyDown={(event) => {
                                                                if (event.key === "'") {
                                                                    event.preventDefault();
                                                                }
                                                            }}
                                                            
                                                            // sx={{
                                                            //     width: '400px',
                                                            //     maxWidth: '400px',
                                                            //     padding: '10px'
                                                            // }}
                                                            onChange={(event, newValue) => handleWorkAuth(newValue, index)}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    size='small'
                                                                    fullWidth
                                                                    variant="outlined"
                                                                // label={`Select Skills for Set ${index + 1}`}
                                                                />
                                                            )}
                                                        /> */}
                                                            <Autocomplete
                                                                multiple
                                                                id='workAuth'
                                                                options={namesWA.map((option) => option)}
                                                                value={CuratelySearchFilter.values.workAuth ? CuratelySearchFilter.values.workAuth.split(', ') : []}
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
                                                                        placeholder="Work Authorization"
                                                                        inputRef={expanded === 'workAuthPanel' ? inputRef : null}
                                                                    />
                                                                )}
                                                                // PaperComponent={CustomPaper}
                                                                onChange={(e, value) => CuratelySearchFilter.setFieldValue("workAuth", value.join(', '))}
                                                                sx={{ mb: 1 }}
                                                            />
                                                        </div>
                                                    ))}
                                                </Stack>


                                            </div>
                                        </AccordionDetails>
                                    </Accordion>



                                    <Accordion disableGutters square expanded={expanded === 'govtclearPanel'} onChange={handleAccordionChange('govtclearPanel')}>
                                        <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                                            <Stack sx={{ width: '100%' }}>
                                                <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                    <Stack direction="row" alignItems="center">
                                                        <Typography>Should the Candidate have a government Security Clearance</Typography>
                                                    </Stack>
                                                    {CuratelySearchFilter.values.govtclear !== "" && <Stack
                                                        className='clearStack'
                                                        direction="row"
                                                        justifyContent="space-around"
                                                        // onClick={(event) => handleClear("govtclear", event)}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            CuratelySearchFilter.setFieldValue("govtclear", "");
                                                            setAllSkills([{ id: 0, skills: [] }]);
                                                        }}
                                                    >
                                                        <CloseIcon />
                                                        <Typography>
                                                            {CuratelySearchFilter.values.govtclear !== "" ? 1 : 0}
                                                        </Typography>
                                                    </Stack>
                                                    }
                                                </Stack>
                                                {(CuratelySearchFilter.values.govtclear !== "") &&
                                                    <Stack direction="row" mt={1} flexWrap="wrap">
                                                        <div className='filterLabelName'>Security Clearance:</div>
                                                        <Chip label={CuratelySearchFilter.values.govtclear} icon={<CloseIcon />}
                                                            className='selectedChips tt-capital' onClick={(event) => handleClear("govtclear", event)} />
                                                    </Stack>
                                                }
                                            </Stack>
                                        </AccordionSummary>

                                        <AccordionDetails>

                                            <FormControl>
                                                <RadioGroup
                                                    name="govtclear"
                                                    id="govtclear"
                                                    onChange={(e)=>{CuratelySearchFilter.handleChange(e); saveAuditLog(4111)}}
                                                    // defaultValue="30"
                                                    value={CuratelySearchFilter.values.govtclear}
                                                >
                                                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                                    <FormControlLabel value="no" control={<Radio />} label="No" />
                                                    <FormControlLabel value="either" control={<Radio />} label="Either" />

                                                </RadioGroup>
                                            </FormControl>

                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>

            <div className="filterBtnWrap" >
                <Button variant="text" onClick={onApplyFilters}>Search</Button>
            </div>

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
                                CuratelySearchFilter.setFieldValue('selectedJobId', id);
                                CuratelySearchFilter.setFieldValue('selectedJobTitle', name);
                                setIsButtonDisabled(false);
                            }}
                            valuePassed={(CuratelySearchFilter.values.selectedJobId) ? { label: CuratelySearchFilter.values.selectedJobTitle, id: CuratelySearchFilter.values.selectedJobId } : {}}
                            isMultiple={false}
                            textToShow="Select Job"
                            width="100%"
                            type='assignJobToCandidate'
                            placeholder="Enter Job Title"

                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" variant='outlined' onClick={() => setJobModalOpen(false)}>Close</Button>
                    <Button color="primary"
                        // startIcon={
                        //     <AutoAwesomeIcon className='' />
                        // }
                        variant='outlined'
                        disabled={isButtonDisabled}
                        sx={{ height: '26px !important' }}
                        onClick={
                            () => {
                                setJobModalOpen(false);
                                setSelectedJobTitle({
                                    title: CuratelySearchFilter.values.selectedJobTitle,
                                    id: CuratelySearchFilter.values.selectedJobId
                                });
                                updateJobDetails(CuratelySearchFilter.values.selectedJobId, CuratelySearchFilter.values.selectedJobTitle);
                                // searchSkillsFromDescription(CuratelySearchFilter.values.selectedJobId, '');
                                // getJobDescription(communityFormik.values.selectedJobId);
                            }
                        }>Select</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                id={id}
                open={open}
                onClose={handleCloseAddSkillsDialog}
            >
                <DialogContent sx={{
                    width: '600px', overflowY: 'auto', minHeight: "120px",
                    maxHeight: "400px"
                }}>
                    <Stack direction="column" spacing={2}>
                        {allSkills.map((skillSet, index) => (
                            <div key={index}>
                                <Autocomplete
                                    value={skillSet.skills}
                                    multiple
                                    freeSolo
                                    options={skillOptions}
                                    fullWidth
                                    onKeyDown={(event) => {
                                        if (event.key === "'") {
                                            event.preventDefault();
                                        }
                                    }}
                                    sx={{
                                        width: '400px',
                                        maxWidth: '400px',
                                        padding: '10px'
                                    }}
                                    onChange={(event, newValue) => handleAddSkillToSet(newValue, index)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            size='small'
                                            variant="outlined"
                                            label={`Select Skills for Set ${index + 1}`}
                                        />
                                    )}
                                    size='small'
                                />
                            </div>
                        ))}
                    </Stack>

                    <Grid container direction="row" justifyContent="flex-end" alignItems="center" className='mt-2'>
                        <Button variant="outlined" color="secondary" startIcon={<AddIcon className="addIcon" />}
                            onClick={handleAddSkillSet}
                        >Add</Button>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ width: '100px' }} variant="contained" size="small" onClick={generatekeyWords}>Build String</Button>
                    <Button onClick={handleCloseAddSkillsDialog}>Close</Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}

export default CuratelySearchFilter;



