import { React, useState, useEffect, Fragment, lazy, Suspense } from '../../../../shared/modules/React';
import { CircularProgress } from '../../../../shared/modules/MaterialImports/CircularProgress';
// import { DateTime } from '../../../../shared/modules/Luxon';
import { useParams } from 'react-router-dom';
// import { create } from 'zustand';


import { Tab, Tabs } from '../../../../shared/modules/MaterialImports/Tabs';
import { Grid } from '../../../../shared/modules/MaterialImports/Grid2';
import {
    List,
    // ListItem,
    // ListItemText,
    // ListItem, ListItemButton, ListItemText 
} from '../../../../shared/modules/MaterialImports/List';
import { Typography } from '../../../../shared/modules/MaterialImports/Typography';
import { Divider } from '../../../../shared/modules/MaterialImports/Divider'
import { Box } from '../../../../shared/modules/MaterialImports/Box'
import { Button } from '../../../../shared/modules/MaterialImports/Button';
import { Tooltip } from '../../../../shared/modules/MaterialImports/ToolTip';
import { Stack } from '../../../../shared/modules/MaterialImports/Stack';
import { TextField } from '../../../../shared/modules/MaterialImports/FormInputs';



import EditIcon from '@mui/icons-material/Edit';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';



const Sourced = lazy(() => import('./Sourced/Sourced'));;
const Submissions = lazy(() => import('./Submissions/Submissions'));;
const Interviews = lazy(() => import('./Interviews/Interviews'));;
const Edit = lazy(() => import('./Edit/Edit'));;
const Community = lazy(() => import('../../Resume/Community/Community'));;
const Workflow = lazy(() => import('../Workflow/Workflow'));;
const ModuleFormAnswer = lazy(() => import('../../Settings/CustomForms/ModuleFormAnswer/ModuleFormAnswer'));;
const ApplicantsCount = lazy(() => import('./Applicants/ApplicantsCount'));;
const ActivityLog = lazy(() => import('./ActivityLogs/ActivityLogs'));;

import { userLocalData } from '../../../../shared/services/userData';


import { globalData } from '../../../../shared/services/globalData';
import ApiService from '../../../../shared/api/api';
import { showToaster } from '../../../shared/SnackBar/SnackBar';
import { confirmDialog } from '../../../shared/ConfirmDialog/ConfirmDialog';


import './ViewJobDetails.scss';
import { Dialog, DialogTitle, DialogContent } from '../../../../shared/modules/MaterialImports/Dialog';
import LuxonDateParser from '../../../../shared/services/LuxonDateParser';
import CriteriaModal from '../View/Overview/CriteriaModal/CriteriaModal';
import { trackPromise } from '../../../../shared/modules/PromiseTrackter';
import { convert } from 'html-to-text';
// import MuiGrid from "@mui/material/Grid";
import Parsable from '../../../../shared/utils/Parsable';
import { useActivatedTabsStore } from '../../../../shared/services/JobStore/JobStore';
import { ID_SETTINGS_WORKFLOW } from '../../../../shared/services/Permissions/IDs';






// import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
// import Applicants from './Applicants/Applicants';
// import CustomFields from './CustomFields/CustomFields';
// import Workflow from './Workflow/Workflow';
// import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import { Autocomplete, Chip, FormControlLabel, IconButton, InputAdornment, Menu, MenuItem, Switch } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import DeleteIcon from '@mui/icons-material/Delete';
// import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
// import { showToaster } from '../../../../shared/modules/commonImports';




interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    onEditCustom?: boolean
}
// type SynonymsSkill = {
//     synonyms_skillid: string,
//     synonyms_skillname: string
// };



// type SkillData = {
//     catg?: string;
//     order: string;
//     skillid: string;
//     skillname: string;
//     synonyms?: boolean;
//     synonyms_skills?: SynonymsSkill[];
//     type: string;

// };

// type SearchData = {

//     explination?: string;
//     jobTitle?: string;
//     searchString?: string;
// }

type DescriptionOverViewData = {
    skill: {
        mainCategory: string;
        skill: string;
        subCategory: string;
    }[];
    searchstring: string[];
    jobtitle: string[];
    publicJobDescr: string;
}



// type OverViewData = {
//     skills: string[];
//     searchStrings: string[];
//     jobTitles: string[];
//     jobDescription: string;
// }

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    let { activatedTabs } = useActivatedTabsStore();

    return (

        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            className='mainDetailsVerticalTabPanel'
        >
            {activatedTabs.includes(index) && (
                <Box py={3} display={value === index ? "block" : "none"}>
                    {children}
                </Box>
            )}
        </div >
    );
}

function tabProperties(index:
    number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
export default function VerticalTabs({ jobCount, masterJobData, value, handleTabsChange, refreshJobData, handleJobRefreshed, loadJobDatabase }: { jobCount: any, masterJobData: any, value: number, handleTabsChange: (newValue: number) => void, refreshJobData?: boolean, handleJobRefreshed?: any, loadJobDatabase?: any }) {
    // const [value, setValue] = useState(0);
    const { activatedTabs, handleActiveTabChange } = useActivatedTabsStore();
    const [notesDescription, setNotesDescription] = useState('')
    const [selectedNotes, setSelectedNotes] = useState<{
        note: string;
        noteId: number | null;
        modifiedBy: number | null;
        fullName: string;
        modifiedDate: string;
    }>({
        note: "",
        noteId: null,
        modifiedBy: null,
        fullName: "",
        modifiedDate: ""
    });

    const [jobNotes, setJobNotes] = useState([])
    const [showAddNote, setShowAddNote] = useState(false);
    const [showAddCriteria, setShowAddCriteria] = useState(false);
    const [jobCriteriaData, setJobCriteriaData] = useState<any>(null)
    // const [selectedWord, setSelectedWord] = useState<string>('');
    // const [jobtitleInputValue, setJobtitleInputValue] = useState("");
    // const [searchStringInputValue, setStringInputValue] = useState("");
    // const [explainationInputValue, setExplainationInputValue] = useState("");

    // const [overView, setOverView] = useState<OverViewData>({
    //     jobDescription: "",
    //     jobTitles: [],
    //     searchStrings: [],
    //     skills: []
    // });

    const [descriptionOverView, setDescriptionOverView] = useState<DescriptionOverViewData>({
        publicJobDescr: "",
        jobtitle: [],
        searchstring: [],
        skill: []
    });

    // const [menuPosition, setMenuPosition] = useState<{ top: number, left: number } | null>(null);


    // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);


    // const [currentSkill, setCurrentSkill] = useState<SkillData | null>(null);

    // const [subSkillInput, setSubSkillInput] = useState('');
    // const [skillInput, setSkillInput] = useState<string>("");
    // const [searchString, setSearchString] = useState<string[]>([]);
    // const [explainationString, setExplainationString] = useState<string[]>([]);



    // const [skillset, setSkillSet] = useState([]);


    // const [searchData, setSearchData] = useState<SearchData[]>([]);


    // const [highlightToggle, setHighlightToggle] = useState(false);

    // const [displayedJobDescription, setDisplayedJobDescription] = useState<string>('');
    // const [originalJobDescription, setOriginalJobDescription] = useState<string>('');

    // const [jobtitle, setJobTitle] = useState<string[]>([]);

    const { jobId } = useParams();

    // useEffect(() => {
    //     //console.log(masterJobData);
    //     // if (masterJobData?.publicJobDescr) {
    //     //     //console.log(masterJobData.publicJobDescr);
    //     //     setOriginalJobDescription(masterJobData?.publicJobDescr);
    //     //     setDisplayedJobDescription(masterJobData?.publicJobDescr);
    //     // }

    // const saveData = {
    //     clientId: userLocalData.getvalue('clientId'),
    //     jobId: jobId,
    // }

    // ApiService.getByParams(193, 'Curately/Jobs/job_overview.jsp', saveData)

    //     .then((response) => {
    //         // console.log(response.data)
    //         setOverView({
    //             jobDescription: (response.data.jobDescription) ? response.data.jobDescription : "",
    //             jobTitles: (response.data.jobTitles && Array.isArray(response.data.jobTitles)) ? response.data.jobTitles : [],
    //             searchStrings: (response.data.searchStrings && Array.isArray(response.data.searchStrings)) ? response.data.searchStrings : [],
    //             skills: (response.data.skills && Array.isArray(response.data.skills)) ? response.data.skills : []
    //         });

    //     setSkillSet(response.data.skills)
    //     setSearchData(response.data)

    //     //setJobTitle(response.data.jobTitle);

    //     //setExplainationInputValue(response.data.explination);

    //     setStringInputValue(response.data.searchStrings);

    //     const jobTitles = response.data.jobTitle.split(" OR ").filter((jobtitle: string) => jobtitle.trim() !== "");
    //     setJobTitle(jobTitles);
    //         });

    // }, []);
    const handleAddNoteClick = () => {
        setShowAddNote(!showAddNote);
    };
    const handleAddCriteria = (criteriaData?: any) => {

        let payLoad: any = {
            jobId: jobId,
            clientId: userLocalData.getvalue("clientId"),
            recrId: userLocalData.getvalue('recrId'),
            jobDescription: convert(descriptionOverView.publicJobDescr),
        }
        if (criteriaData) {
            delete payLoad.jobDescription;
            payLoad = Object.assign({}, payLoad, { ...payLoad, criteria: JSON.stringify(criteriaData) })
        }
        trackPromise(
            ApiService.postWithData('admin', 'saveOrUpdateCriteriaEvaluationJob', payLoad)
                .then(
                    (response: any) => {
                        if (response.data.Success) {
                            showToaster('Criteria has been saved successfully.', 'success');
                            setShowAddCriteria(!showAddCriteria);
                            if (!criteriaData) {
                                loadJobDatabase();
                            }
                            loadCriteriaData();
                        } else {
                            showToaster((response.data.Message) ? response.data.Message : 'An error occured', 'error')
                        }
                    })
        )
    };

    useEffect(() => {
        // https://adminapi.curately.ai/curatelyAdmin/getJobOverview/2129/3
        loadJobOverview();
    }, [jobId]);

    const loadJobOverview = () => {
        ApiService.getCall("admin", 'getJobOverview/' + jobId + '/' + userLocalData.getvalue('clientId'))

            .then((response) => {
                if (response.data?.List?.length) {
                    // console.log(response.data.List);
                    setDescriptionOverView({
                        publicJobDescr: (response.data.List[0]?.publicJobDescr) ? response.data.List[0].publicJobDescr.replace(/\n/g, '<br/>').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&') : "",
                        jobtitle: (response.data.List[0]?.jobtitle && Array.isArray(response.data.List[0].jobtitle)) ? response.data.List[0].jobtitle
                            : [],
                        searchstring: (response.data.List[0]?.searchstring && Array.isArray(response.data.List[0].searchstring)) ? response.data.List[0].searchstring
                            : [],
                        skill: (response.data.List[0]?.skill && Array.isArray(response.data.List[0].skill)) ? response.data.List[0].skill
                            : []
                    });
                }
            });
    }

    useEffect(() => {
        loadJobNotes();
        loadCriteriaData();

        // return () => {
        //     handleActiveTabChange([0]);
        // }

    }, [jobId]);

    useEffect(() => {
        if (refreshJobData) {
            loadJobOverview();
            loadJobNotes();
            loadCriteriaData();
            handleJobRefreshed();
        }
    }, [refreshJobData])

    const loadCriteriaData = () => {
        ApiService.postWithData("admin", 'getCriteriaEvaluationJob', {
            jobId: jobId,
            clientId: userLocalData.getvalue("clientId"),
        }).then(
            (response: any) => {
                if (response?.data?.Success) {
                    const fetchedCriteria = response?.data?.jobCriteriaEvaluation;
                    if (fetchedCriteria?.criteria && Parsable.isJSON(fetchedCriteria.criteria)) {
                        setJobCriteriaData({ ...fetchedCriteria, criteria: JSON.parse(fetchedCriteria.criteria) });
                        // handleActiveTabChange([0]);
                    }
                } else {
                    showToaster(response?.data?.Message, 'error');
                }
            }
        )
    }

    const loadRerunCriteria = (userIds?: any[]) => {
        return trackPromise(
            ApiService.postWithData("admin", 'reRunCriteriaEvaluationUsers', {
                "jobId": jobId,
                "clientId": userLocalData.getvalue("clientId"),
                "recrId": userLocalData.getvalue("recrId"),
                "userIds": userIds ? userIds : null
            }).then(
                (response: any) => {
                    if (response?.data?.Success) {
                        showToaster("Job re runned for criteria successfully", "success");
                        loadCriteriaData();
                        return true;
                    } else {
                        showToaster(response?.data?.Message, 'error');
                        return false;
                    }
                }
            )
        )

    }



    // const toggleHighlight = () => {
    //     const doneSVG = `<svg class="done-icon" width="24" height="24" viewBox="0 0 24 24" fill="green" xmlns="http://www.w3.org/2000/svg"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>`;
    //     const addSVG = `<svg class="add-icon" width="24" height="24" viewBox="0 0 24 24" fill="orange" xmlns="http://www.w3.org/2000/svg"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>`;

    //     const deleteSVG = `<svg class="delete-icon hidden-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    //         <path d="M3 6H5H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    //         <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19ZM10 11V17M14 11V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    //     </svg>`
    //     //const deleteIconComponent = <DeleteIcon onClick={() => deleteSkill(skillId, skill)} />;

    //     if (!highlightToggle) {
    //         let updatedDescription = originalJobDescription;

    //         if (Array.isArray(skill)) {
    //             skill.forEach((currentSkill) => {
    //                 const skillRegex = new RegExp(currentSkill.skillname, 'gi');
    //                 const skillIcon = (currentSkill.type === "2")
    //                     ? addSVG
    //                     : doneSVG

    //                 updatedDescription = updatedDescription.replace(skillRegex,
    //                     match =>
    //                         `<span class="highlight">${skillIcon}${match}
    //                         <span onClick={deleteSkill(${currentSkill.skillid}, ${'currentSkill.skillname'}}>${deleteSVG}</span></span>`
    //                 );

    //                 if (Array.isArray(currentSkill.synonyms_skills)) {
    //                     currentSkill.synonyms_skills?.forEach(synonym => {
    //                         const subSkillRegex = new RegExp(synonym.synonyms_skillid, 'gi');
    //                         updatedDescription = updatedDescription.replace(subSkillRegex,
    //                             match =>
    //                                 `<span class="highlight">${match}</span>
    //                                 `
    //                         );
    //                     });
    //                 }
    //             });
    //         }

    //         setDisplayedJobDescription(updatedDescription);
    //     } else {
    //         setDisplayedJobDescription(originalJobDescription);
    //     }
    //     setHighlightToggle(!highlightToggle);
    // }
    // const handleInputChange = (event: React.ChangeEvent<{}>, value: string) => {
    //     setSkillInput(value);
    // }
    // const skillsList = ["testing", "tester", "Test cases", "Test plans", "Test scripts", "TestNG"];
    // const fetchFromAPI = (additionalPayload: any) => {

    //     const fullPayload = {
    //         jobid: jobId,
    //         ...additionalPayload
    //     };
    //     return ApiService.getByParams(193, 'Jobs/JobView/jobs_skill_jobtitle_searchstring.jsp', fullPayload);
    // }


    // const handleSearchString = (searchString: string) => {
    //     console.log(searchString);
    //     fetchFromAPI({ searchstring: searchString }).then((response: any) => {
    //         console.log(response)
    //         if (response?.data?.message === "Search String Saved Successfully.") {

    //             setSearchString(prevSearchString => [...prevSearchString, searchString]);


    //             // console.log(searchString)
    //         } else {
    //             // console.log("error");
    //         }
    //     });
    // }
    // const handleExplainationString = () => {
    //     console.log(explainationInputValue);
    //     fetchFromAPI({ explanation: explainationInputValue }).then((response: any) => {
    //         console.log(response)
    //         if (response?.data?.message === "Search String Saved Successfully.") {

    //             setExplainationString(prev => [prev + explainationInputValue])
    //             setExplainationInputValue(explainationInputValue)

    //         }
    //         else {
    //             // console.log("error")
    //         }
    //     });
    // }
    // const processNewJobTitle = (titles: string[]) => {
    //     const combinedTitle = titles.join(" OR ");

    //     fetchFromAPI({ jobtitle: combinedTitle }).then((response: any) => {
    //         if (response) {
    //             setJobTitle(titles);
    //             setJobtitleInputValue('');
    //         } else {
    //             // console.log("error");
    //         }
    //     }).catch(err => {
    //         console.error("API call error:", err);
    //     });
    // }

    // const handleDeleteSkill = (titleToDelete: string) => {
    //     const updatedTitles = jobtitle.filter(title => title !== titleToDelete);
    //     processNewJobTitle(updatedTitles);
    // }

    // const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    //     if (event.key === 'Enter' && jobtitleInputValue.trim() !== "") {
    //         processNewJobTitle([...jobtitle, jobtitleInputValue]);
    //     }
    // }










    // const addSkillText = (type: string, selectedWord?: string) => {

    //     const skillToAdd = selectedWord || skillInput;

    //     if (skillToAdd && typeof skillToAdd === 'string') {
    //         const newSkill = {
    //             jobid: jobId,

    //             order: (skill.length + 1).toString(),

    //             skill: skillToAdd,

    //             type: type
    //         };

    //         ApiService.getByParams(193, 'Jobs/JobView/jobs_sovren_skill_save.jsp', newSkill).then((response: any) => {
    //             // console.log(response)

    //             if (response && response?.data?.skillid) {
    //                 const skillId = response?.data?.skillid;
    //                 // console.log("Skill ID:", skillId);

    //                 setSkill(prevSkills => [...prevSkills, {
    //                     skillid: skillId,

    //                     order: (skill.length + 1).toString(),
    //                     skillname: skillToAdd,
    //                     type: type,

    //                 }]);




    //             }
    //             else {

    //                 // console.log("error")
    //             }

    //         });
    //     }
    //     setSkillInput('')


    // }


    // const handleOpen = (event: React.MouseEvent<HTMLElement>, skill: SkillData) => {
    //     setAnchorEl(event.currentTarget);
    //     setCurrentSkill(skill);
    // };
    // const toggleSkillType = (skillid: string) => {
    //     const skillToToggle = skill.find(s => s.skillid === skillid);
    //     if (skillToToggle) {

    //         const newType = skillToToggle.type === '1' ? '2' : '1';

    //         const newSkill = {
    //             jobid: jobId,
    //             skillid: skillid,
    //             type: newType
    //         };


    //         ///Jobs/JobView/jobs_sovren_skill_type_update.jsp?jobid=208065&skillid=1331&type=2
    //         ApiService.getByParams(193, 'Jobs/JobView/jobs_sovren_skill_type_update.jsp', newSkill).then((response: any) => {
    //             // console.log(response);


    //             if (response) {

    //                 setSkill(prevSkills =>
    //                     prevSkills.map(s =>
    //                         s.skillid === skillid ? { ...s, type: newType } : s
    //                     )
    //                 );
    //             } else {
    //                 console.error("API request failed.");
    //             }
    //         }).catch(error => {
    //             console.error("Error making API call:", error);
    //         });
    //     }


    // }

    // const handleClose = () => {
    //     setAnchorEl(null);
    // };



    // const addSubSkill = (skillId: string) => {
    //     console.log("add subskill");
    //     const requestData = {
    //         jobid: jobId,
    //         skillid: skillId,
    //         skill: subSkillInput,
    //     };

    //     ApiService.getByParams(193, 'Jobs/JobView/jobs_sovren_synonyms_save.jsp', requestData)
    //         .then((response: any) => {
    //             // console.log(response);

    //             if (currentSkill && subSkillInput) {

    //                 const existingSynonyms = currentSkill.synonyms_skills || [];

    //                 const updatedSkill = {
    //                     ...currentSkill,
    //                     synonyms: true,
    //                     synonyms_skills: [
    //                         ...existingSynonyms,
    //                         {
    //                             synonyms_skillid: (existingSynonyms.length + 1).toString(),
    //                             synonyms_skillname: subSkillInput
    //                         }
    //                     ]
    //                 };

    //                 setCurrentSkill(updatedSkill);


    //                 const newSynonymsSkill: SynonymsSkill = {
    //                     synonyms_skillid: response.skillId,
    //                     synonyms_skillname: subSkillInput
    //                 };
    //                 setSkill(skill.map(skillData => {
    //                     if (skillData.skillid === skillId) {
    //                         return {
    //                             ...skillData,
    //                             synonyms: true,
    //                             synonyms_skills: [
    //                                 ...(skillData.synonyms_skills || []),
    //                                 newSynonymsSkill
    //                             ]
    //                         };
    //                     }
    //                     return skillData;
    //                 }));


    //                 setSubSkillInput('');
    //             }
    //         });
    // };


    // const deleteSkill = (skillId: string, skillName: string) => {
    //     const requestBody = {

    //         jobid: jobId,
    //         skillid: skillId,
    //         skill: skillName,

    //     }
    //     ApiService.getByParams(193, 'Jobs/JobView/jobs_sovren_skill_delete.jsp', requestBody).then((response: any) => {
    //         console.log(response)

    //         if (response) {

    //             setSkill(prevSkills => prevSkills.filter(skill => skill.skillid !== skillId));

    //         } else {

    //             // console.log("error")
    //         }

    //     });

    // };




    const handleTabsChangeInternal = (_event: React.SyntheticEvent, newValue: number) => {
        handleTabsChange(newValue);
        // console.log(newValue)
        let tempActivatedTabs = activatedTabs;
        if (!tempActivatedTabs.includes(newValue)) {
            tempActivatedTabs.push(newValue);
        }
        handleActiveTabChange(tempActivatedTabs);
    };
    // const handleContextMenu = (e: React.MouseEvent) => {
    //     e.preventDefault();

    //     const selection = window.getSelection();
    //     if (selection) {
    //         const selectedText = selection.toString();
    //         if (selectedText) {
    //             setSelectedWord(selectedText);
    //             setMenuPosition({
    //                 top: e.clientY,
    //                 left: e.clientX
    //             });
    //         }
    //     }
    // };


    // const relatedJobs = [
    //     "Product Manager",
    //     "Senior Manager",
    //     "E-Commerce Manager",
    //     "Digital Experience Manager",
    //     "Technical Product Manager",
    //     "Micro Service Manager"
    // ]




    const loadJobNotes = () => {
        // http://35.155.202.216:8095/curatelyAdmin/getJobNotes       
        ApiService.postWithData("admin", 'getJobNotes', {
            jobId: jobId,
            clientId: userLocalData.getvalue("clientId"),
        }).then(
            (response: any) => {
                if ((response?.data?.Status) && response?.data?.jobNotes && response?.data?.jobNotes?.length) {
                    setJobNotes(response?.data?.jobNotes);
                } else {
                    setJobNotes([]);
                }
            }
        )
    }
    const deleteNoteById = (id: number) => {
        console.log(id + "deleted")
        ApiService.postWithData("admin", 'deleteJobNotes', {
            noteId: id,
            clientId: userLocalData.getvalue("clientId"),
            "recrId": userLocalData.getvalue('recrId')
        }).then(
            (response: any) => {
                if (response?.data?.Success) {
                    loadJobNotes();
                    showToaster(response?.data?.Message, 'success');
                } else {
                    showToaster(response?.data?.Message, 'error');
                }
            }
        )
    }
    const saveJobNotes = () => {
        if (!notesDescription.trim()) {
            showToaster('Note description cannot be empty', 'error');
            return;
        }

        const tempDataToPass = {
            modifiedBy: userLocalData.getvalue('recrId'),
            jobId: jobId,
            clientId: userLocalData.getvalue("clientId"),
            note: notesDescription,
            createdBy: userLocalData.getvalue('recrId'),
            ...(selectedNotes.noteId && { noteId: selectedNotes.noteId })
        };

        ApiService.postWithData("admin", 'saveJobNotes', tempDataToPass)
            .then((response) => {
                if (response?.data?.Success) {
                    setNotesDescription('');
                    setSelectedNotes({
                        note: "",
                        noteId: null,
                        modifiedBy: null,
                        fullName: "",
                        modifiedDate: ""
                    });
                    setShowAddNote(false);
                    loadJobNotes();
                    showToaster('Note has been saved successfully.', 'success');
                } else {
                    showToaster(response?.data?.message, 'error');
                }
            })
            .catch((error) => {
                console.error('Error saving job note:', error);
                showToaster('An unexpected error occurred. Please try again.', 'error');
            });
    };
    const isCareerPortalEnabled = userLocalData.adminSettings(20005);
    const isHiringWorkFlowEnabled = userLocalData.adminSettings(20027);
    const isSovrenEnabled = userLocalData.adminSettings(20048);
    const isWorkFlowEnabled = userLocalData.adminSettings(ID_SETTINGS_WORKFLOW)
    // const isCareerPortalEnabled = false;
    // const isHiringWorkFlowEnabled = true;


    return (
        <Box sx={{ width: '100%' }} id="viewJobDetails">

            <Box
                className='customCard py-0 customCenteredTabs '
                sx={{ borderBottom: 1, borderColor: 'divider', minHeight: 'auto !important', marginBottom: '0 !important' }}

            >

                <Tabs value={value} onChange={handleTabsChangeInternal} aria-label="View Job Tabs" centered id="jobsTab" >

                    <Tab
                        className="tabButton"
                        label={
                            <Grid container direction="row">
                                <span className='tabLabelName'>Overview</span>
                            </Grid>
                        }
                        {...tabProperties(0)}
                    />
                    <Tab className={`tabButton ${isSovrenEnabled ? "" : 'd-none'}`}
                        label={
                            <Grid container direction="row">
                                <span className='tabLabelName'>AI Match</span>
                            </Grid>
                        }
                        {...tabProperties(1)}
                    />
                    <Tab className="tabButton"
                        label={
                            <Grid container direction="row">
                                <span className='tabLabelName'>Applicants</span>
                                {
                                    (jobCount.appCount) ?
                                        <span className='tabCountName'>{jobCount.appCount}</span>
                                        :
                                        null
                                }
                            </Grid>
                        }
                        {...tabProperties(2)}
                    />
                    <Tab className="tabButton"
                        label={
                            <Grid container direction="row">
                                <span className='tabLabelName'>Sourced</span>
                                {
                                    (jobCount.sourcedCount) ?
                                        <span className='tabCountName'>{jobCount.sourcedCount}</span>
                                        :
                                        null
                                }
                            </Grid>
                        }
                        {...tabProperties(3)}
                    />

                    <Tab className={`tabButton ${isHiringWorkFlowEnabled ? "" : 'd-none'}`}
                        label={
                            <Grid container direction="row">
                                <span className='tabLabelName'>Submissions</span>
                                {
                                    (jobCount.subsCount) ?
                                        <span className='tabCountName'>{jobCount.subsCount}</span>
                                        :
                                        null
                                }
                            </Grid>
                        }
                        {...tabProperties(4)}
                    />

                    <Tab className={`tabButton ${isHiringWorkFlowEnabled ? "" : 'd-none'}`}
                        label={
                            <Grid container direction="row">
                                <span className='tabLabelName'>Interviews</span>
                                {
                                    (jobCount.interviewCount) ?
                                        <span className='tabCountName'>{jobCount.interviewCount}</span>
                                        :
                                        null
                                }
                            </Grid>
                        }
                        {...tabProperties(5)}
                    />
                    <Tab className={`tabButton ${isCareerPortalEnabled ? "" : 'd-none'}`}
                        label={
                            <Grid container direction="row">
                                <span className='tabLabelName'>Custom Fields</span>
                            </Grid>
                        }
                        {...tabProperties(6)}
                    />
                    {/* {
                        (masterJobData?.workflowDetails?.workflowid && !masterJobData?.workflowDetails?.ispause && !masterJobData?.workflowDetails?.isdelete) ? */}
                    <Tab className={`tabButton ${((isWorkFlowEnabled) && (masterJobData?.workflowDetails?.workflowid && !masterJobData?.workflowDetails?.ispause && !masterJobData?.workflowDetails?.isdelete)) ? '' : 'd-none'}`}
                        label={
                            <Grid container direction="row">
                                <span className='tabLabelName'>Workflow</span>
                                {
                                    (jobCount.workflowCount) ?
                                        <span className='tabCountName'>{jobCount.workflowCount}</span>
                                        :
                                        null
                                }
                                <Tooltip title='Open Workflow in New Tab'>
                                    {/* <IconButton aria-label="Open Workflow in New Tab"> */}
                                    <OpenInNewOutlinedIcon className='c-grey ml-3 p-0' onClick={
                                        (e) => {
                                            e.stopPropagation();
                                            window.open(globalData.getWindowLocation() + "job/workflows/" + jobId);
                                        }
                                    } />
                                    {/* </IconButton> */}
                                </Tooltip>
                            </Grid>
                        }
                        {...tabProperties(7)}
                    />
                    {/* :
                            null
                    } */}

                    <Tab className={`tabButton ${isHiringWorkFlowEnabled ? "" : 'd-none'}`}
                        label={
                            <Grid container direction="row">
                                <span className='tabLabelName'>History</span>
                            </Grid>
                        }
                        {...tabProperties(8)}
                    />

                </Tabs>
            </Box>
            {/* <div className='customCard' style={{ marginTop: '20px' }}> */}

            <div>
                <TabPanel value={value} index={0}>
                    <div>
                        <div>
                            <Grid container>
                                <Grid sx={{ width: 775, marginLeft: "0", marginTop: "25px" }}>
                                    <div className='customCard pr-0 pt-1 pl-0'>
                                        <Typography variant="h5" className='mb-2 pl-2' >Job Description</Typography>
                                        {/* <Card className='mainCard'></Card> */}
                                        <Divider className='mb-1' />
                                        {/* <Grid container alignItems="center" style={{ height: '20px', marginTop: '1rem', paddingLeft: 0 }}>
                                            <Grid size={12} style={{ textAlign: 'right' }}>
                                                <FormControlLabel
                                                    control={<Switch
                                                        checked={highlightToggle}
                                                        onClick={toggleHighlight}


                                                        color="primary" />}
                                                    label="Highlight Keywords"
                                                />
                                            </Grid>
                                        </Grid> */}

                                        <div className='pt-3'>



                                            {/* <div className='jobDescription pl-4'
                                                // onContextMenu={handleContextMenu} 
                                                dangerouslySetInnerHTML={{ __html: overView.jobDescription }}></div>


                                        </div> */}
                                            <div className='jobDescription pl-4 ql-editor'
                                                // onContextMenu={handleContextMenu} 
                                                dangerouslySetInnerHTML={{ __html: descriptionOverView.publicJobDescr }}></div>


                                        </div>
                                    </div>
                                </Grid>


                                {/* <div className='mb-3'>
                                            <label className='inputLabelJobDesc'>Job Titles</label>
                                            <Autocomplete
                                                multiple
                                                size='small'
                                                freeSolo
                                                options={[]}
                                                value={jobtitle}
                                                onChange={(event: any, newValue: string[]) => {
                                                    processNewJobTitle(newValue);
                                                }}
                                                onInputChange={(event, newInputValue) => {
                                                    setJobtitleInputValue(newInputValue);
                                                }}
                                                renderTags={(value, getTagProps) =>
                                                    value.map((option, index) => (
                                                        <Chip
                                                            variant="outlined"
                                                            label={option}
                                                            {...getTagProps({ index })}
                                                            onDelete={() => handleDeleteSkill(option)}
                                                        />
                                                    ))
                                                }

                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        variant="outlined"

                                                        placeholder="Type and add"
                                                        onKeyDown={handleKeyDown}
                                                    />
                                                )}
                                            />


                                            {/* <TextField
                                                // label="Job Title"
                                                variant="outlined"
                                                fullWidth
                                                size="small"
                                                value={jobtitle}

                                                onChange={(e) => setJobTitle(e.target.value)}
                                            /> */}
                                {/* </div>  */}
                                {/* <div className='mb-3'>
                                            <label className='inputLabelJobDesc'>Skills:</label>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <TextField
                                                    size='small'
                                                    fullWidth
                                                    id="addSkillInput"
                                                    value={skillInput}
                                                    onChange={(e: any) => setSkillInput(e.target.value ? e.target.value : "")}
                                                    //   onInputChange={handleInputChange}

                                                    style={{ width: 262.328, marginRight: 8 }}
                                                />
                                                <Button onClick={() => addSkillText('1')} variant="contained">
                                                    Add Skill
                                                </Button>
                                            </div>
                                        </div> */}
                                {/* <div style={{
                                            maxHeight: '200px',
                                            overflow: 'overlay',
                                            width: '100%'
                                        }}>
                                            {skill && skill.map((skillItem, index) => (
                                                <div key={skillItem?.skillid || String(index)}>


                                                    <Chip
                                                        variant='outlined'

                                                        key={skillItem?.skillid}
                                                        label={
                                                            <div style={{
                                                                display: 'flex',
                                                                fontSize: '12px',
                                                                justifyContent: 'space-between',
                                                                alignItems: 'center',

                                                            }}>
                                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', }}>
                                                                    {/* DragIndicatorIcon here */}
                                {/* <DragIndicatorIcon /> */}

                                {/* <Chip
                                                                        key={skillItem?.skillid}
                                                                        label={skillItem?.type === "1" ? "must" : "pref"}
                                                                        sx={{
                                                                            color: "white",

                                                                            height: "20px",
                                                                            backgroundColor: skillItem?.type === "2" ? "orange" : "green"
                                                                        }}
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            toggleSkillType(skillItem?.skillid);
                                                                        }}
                                                                    /> */}

                                {/* <span style={{ padding: '8px' }} data-id={skillItem?.skillid}>
                                                                        {skillItem?.skillname}

                                                                        {skillItem?.synonyms && <span>({skillItem?.synonyms_skills?.length})</span>}
                                                                    </span>
                                                                </div>

                                                                <div style={{
                                                                    display: 'flex', alignItems: 'center',

                                                                }}>
                                                                    <IconButton
                                                                        onClick={(event) => handleOpen(event, skillItem)}
                                                                        size="small">
                                                                        <StarBorderOutlinedIcon />
                                                                    </IconButton>

                                                                    <DeleteIcon onClick={() => deleteSkill(skillItem?.skillid, skillItem?.skillname)} />
                                                                </div>
                                                            </div> */}
                                {/* } */}
                                {/* sx={{
                                                            width: "330px", height: "100%", margin: "7px", borderColor: 'skyblue', padding: "1px",
                                                            justifyContent: 'space-between'
                                                        }}
                                                    /> */}
                                {/* </div>

                                            ))}


                                        </div> */}
                                {/* <div className='mb-3' >
                                            <div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2px' }}>
                                                    <label className='inputLabelJobDesc'>Search string</label>

                                                    <IconButton onClick={() => handleSearchString(searchStringInputValue)}>
                                                        <SaveOutlinedIcon />
                                                    </IconButton>
                                                </div>
                                                <TextField
                                                    variant="outlined"
                                                    size="small"
                                                    fullWidth
                                                    rows={4}
                                                    multiline
                                                    value={searchStringInputValue}
                                                    onChange={(e) => setStringInputValue(e.target.value)}


                                                />
                                            </div>


                                        </div> */}
                                {/* <div className='mb-3'>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2px' }}>
                                                <label className='inputLabelJobDesc'>Explanation</label>

                                                <IconButton onClick={() => handleExplainationString()}>
                                                    <SaveOutlinedIcon />
                                                </IconButton>
                                            </div>
                                            <TextField
                                                variant="outlined"
                                                size="small"
                                                fullWidth
                                                rows={4}
                                                value={explainationInputValue}
                                                onChange={(e) => setExplainationInputValue(e.target.value)}
                                                multiline
                                            />
                                        </div> */}


                                <Grid
                                    sx={{ width: 475, marginLeft: "15px", marginTop: "25px" }}>
                                    <div className='customCard' style={{ overflow: "auto", minHeight: "220px", paddingTop: '7px', paddingBottom: '20px', paddingLeft: 0, paddingRight: 0 }}>
                                        <Stack direction="row" alignItems="center" justifyContent="space-between" pl={1} pr={1} >
                                            <label className='inputLabelJobDesc'>Notes</label>
                                            <Button
                                                disableRipple
                                                size='small'
                                                onClick={handleAddNoteClick}
                                                variant="contained"
                                                color="primary"
                                            >
                                                Add Notes
                                            </Button>


                                        </Stack>

                                        <Divider sx={{ pt: 1 }} />

                                        <div style={{ height: "290px", overflow: "auto" }}>
                                            <List className='p-3'>
                                                <Stack sx={{ width: '100%' }}>
                                                    <Stack className={`pt-3 noteBox ${jobNotes.length ? '' : 'd-none'}`}>
                                                        {
                                                            jobNotes.map((note: {
                                                                note: string;
                                                                modifiedDate: string;
                                                                noteId: number;
                                                                fullName: string;

                                                                modifiedBy: number
                                                            }, i: number) => (
                                                                <Stack key={i} className="noteItem">

                                                                    <Box>
                                                                        <Box sx={{ width: '100%' }}>

                                                                            <Grid
                                                                                container
                                                                                direction="row"
                                                                                justifyContent="flex-start"
                                                                                alignItems="center"
                                                                                className="notesDiv"
                                                                            >

                                                                                <Grid sx={{ width: 'calc(100% - 50px)' }}>

                                                                                    <Typography component='p' className="boxText-text">
                                                                                        {
                                                                                            note.fullName && note.note ?
                                                                                                <span>
                                                                                                    <span className='noteRecrLabel'>{note.fullName}</span> added <span dangerouslySetInnerHTML={{ __html: note.note }}></span>
                                                                                                </span>
                                                                                                :
                                                                                                <span dangerouslySetInnerHTML={{ __html: note.fullName || note.note }}></span>
                                                                                        }
                                                                                    </Typography>
                                                                                </Grid>
                                                                                {
                                                                                    note.modifiedBy == userLocalData.getvalue('recrId') ?
                                                                                        <Grid className="notesAction">
                                                                                            <Tooltip title="Edit">
                                                                                                <EditIcon
                                                                                                    className="fs-16 cursor-pointer mr-2"
                                                                                                    onClick={
                                                                                                        () => {

                                                                                                            setNotesDescription(note.note);
                                                                                                            setSelectedNotes(note);
                                                                                                            setShowAddNote(true);
                                                                                                        }
                                                                                                    }
                                                                                                />
                                                                                            </Tooltip>
                                                                                            <Tooltip title="Delete">
                                                                                                <span>
                                                                                                    <DeleteOutlineOutlinedIcon
                                                                                                        className={`fs-16 ${note.noteId === selectedNotes.noteId ? "deleteDisable" : "cursor-pointer"} `}
                                                                                                        onClick={() => {
                                                                                                            if (note.noteId !== selectedNotes.noteId) {
                                                                                                                confirmDialog('Are you sure you want to Delete?', () => {
                                                                                                                    deleteNoteById(note.noteId);
                                                                                                                }, "warning");
                                                                                                            }
                                                                                                        }}

                                                                                                    />
                                                                                                </span>
                                                                                            </Tooltip>
                                                                                        </Grid>
                                                                                        :
                                                                                        null
                                                                                }
                                                                            </Grid>
                                                                        </Box>
                                                                        <Box className="dateBox">
                                                                            <Typography component='p' className="dateText">

                                                                                {note?.modifiedDate ? LuxonDateParser.ServerEDTToSystem(note.modifiedDate.substring(0, 19), "yyyy-MM-dd hh:mm:ss", "MM/dd/yyyy hh:mm a") : null}

                                                                            </Typography>
                                                                        </Box>


                                                                    </Box>
                                                                </Stack>
                                                            ))
                                                        }
                                                    </Stack>

                                                </Stack>
                                            </List>
                                        </div>
                                    </div>

                                    {
                                        userLocalData.adminSettings(20046) ?
                                            <div className='customCard pl-0 pr-0' style={{ overflow: "auto", minHeight: "300px" }}>
                                                <Stack direction="row" alignItems="center" justifyContent="space-between" pl={1} pr={1} >
                                                    <label className='inputLabelJobDesc'>Evaluation Criteria</label>
                                                    <Button
                                                        disableRipple
                                                        size='small'
                                                        onClick={() => {
                                                            if (!!jobCriteriaData?.criteria?.length) {
                                                                setShowAddCriteria(true)
                                                            } else handleAddCriteria()
                                                        }}
                                                        variant="contained"
                                                        color="primary"
                                                    >
                                                        {!!jobCriteriaData?.criteria?.length ? "Edit Criteria" : "Add Criteria"}
                                                    </Button>
                                                </Stack>
                                                <Divider sx={{ pt: 1 }} />
                                                {/* {!!jobCriteriaData?.criteria?.length && 
                                        
                                        <List className='p-3'>
                                            {jobCriteriaData.criteria.map((each: any, i: number) => (
                                                <ListItem
                                                    key={i} disablePadding>
                                                    <ListItemText
                                                        primaryTypographyProps={{ fontSize: '12px', textTransform: 'capitalize' }} className='textBackground p-2' primary={each.match_criteria} />
                                                </ListItem>
                                            ))}
                                        </List>} */}
                                                {!!jobCriteriaData?.criteria?.length &&
                                                    <Grid container px={1.5} my={2} spacing={1}>
                                                        <Grid size={8}>Match Criteria</Grid>
                                                        <Grid size={2}>Must Have</Grid>
                                                        <Grid size={2}>Score</Grid>
                                                        {jobCriteriaData.criteria.map((each: any, index: number) => (
                                                            <Fragment key={index}>
                                                                <Grid size={8} className='textBackground my-1'>{each.match_criteria}</Grid>
                                                                <Grid size={2} className='textBackground my-1'>{(each.must_have.toString().toLowerCase() === "true" ? "Yes" : "No")}</Grid>
                                                                <Grid size={2} className='textBackground my-1'>{each.score ? each.score : Number(100 / jobCriteriaData?.criteria?.length)}  </Grid>
                                                            </Fragment>
                                                        ))}
                                                    </Grid>
                                                }
                                            </div>
                                            :
                                            null
                                    }


                                    {/* <div className='customCard pl-0 pr-0' style={{ overflow: "auto", minHeight: "220px" }}>
                                            <label className='inputLabelJobDesc ml-3'>Related Jobs</label>
                                            <Divider />
                                            <div style={{ height: "190px", overflow: "auto" }}>
                                                <List className='p-3'>
                                                    {descriptionOverView.jobtitle.map((jobs, i) => (
                                                        <ListItem
                                                            key={jobs + i} disablePadding>
                                                            <ListItemText
                                                                primaryTypographyProps={{ fontSize: '12px', textTransform: 'capitalize' }} className='textBackground p-2' primary={jobs} />
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            </div>
                                        </div>
                                        <div className='customCard pl-0 pr-0'>
                                            <label className='inputLabelJobDesc ml-3'>Skills</label>
                                            <Divider />
                                            <div style={{ height: "190px", overflow: "auto" }}>
                                                <List >
                                                    {descriptionOverView.skill.map((item, index) => (
                                                        <div key={item.skill + index}>
                                                            <ListItem disablePadding>
                                                                <ListItemButton className='p-1 ml-2'>
                                                                    <ListItemText
                                                                        primaryTypographyProps={{ fontSize: '12px', textTransform: 'capitalize' }}
                                                                        className='ml-0' primary={item.skill} />
                                                                </ListItemButton>
                                                            </ListItem><Divider />
                                                        </div>
                                                    ))}
                                                </List>
                                            </div>
                                        </div> */}

                                    {/* <div className='customCard pl-0 pr-0 pb-0'>
                                        <label className='inputLabelJobDesc ml-3'>Boolean String</label>
                                        <Divider />
                                       
                                        <div className='pb-3' style={{ height: "450px", overflow: "auto" }}>
                                            <List className='p-1'>
                                                {descriptionOverView.searchstring.map((string, index) => (
                                                    <ListItem disablePadding key={string + index}>
                                                        <ListItemText
                                                            primaryTypographyProps={{ fontSize: '12px', textTransform: 'capitalize' }} className='booleanBg p-2'
                                                            primary={<div><h4>Type {index + 1}</h4><p>{string}</p></div>} />
                                                        
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </div>
                                    </div> */}
                                </Grid>
                            </Grid>
                        </div>
                        {

                            masterJobData?.Details ?
                                <Suspense fallback={<CircularProgress className="centered" />} >
                                    <Edit masterJobData={masterJobData} />
                                </Suspense>
                                : null

                        }
                        {showAddNote &&
                            <Dialog open={showAddNote} onClose={() => setShowAddNote(false)} maxWidth="sm" fullWidth>
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
                                            {selectedNotes.noteId ? 'Edit' : 'Add'} Note
                                        </span>
                                        <div>
                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="end"
                                                alignItems="center"
                                            >
                                                {/* <CloseIcon /> onClick={() => closePopup()}  */}
                                                <Button
                                                    variant="outlined"
                                                    color="secondary"
                                                    onClick={() => {
                                                        setSelectedNotes({
                                                            note: "",
                                                            noteId: null,
                                                            modifiedBy: null,
                                                            fullName: "",
                                                            modifiedDate: "",
                                                        });
                                                        setNotesDescription('');
                                                        setShowAddNote(false);
                                                    }}
                                                    className="mr-2"
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    disableRipple
                                                    variant="contained"
                                                    color="primary"
                                                    size='small'
                                                    onClick={saveJobNotes}
                                                // disabled={!notesDescription.trim()}
                                                >
                                                    {selectedNotes.noteId ? 'Update' : 'Log Note'}
                                                </Button>

                                            </Grid>
                                        </div>
                                    </Grid>
                                </DialogTitle>
                                <Divider />
                                <DialogContent sx={{ p: 3 }}>
                                    <TextField
                                        className="typeNote"
                                        multiline
                                        fullWidth
                                        rows={3}
                                        placeholder="Type a note..."
                                        value={notesDescription}
                                        onChange={(e) => setNotesDescription(e.target.value)}
                                    />
                                </DialogContent>
                            </Dialog>
                        }




                        {
                            (showAddCriteria) ?
                                <CriteriaModal
                                    showAddCriteria={showAddCriteria}
                                    closePopup={() => {
                                        setShowAddCriteria(false);
                                    }}
                                    jobDescription={descriptionOverView.publicJobDescr}
                                    criteriaData={jobCriteriaData?.criteria || []}
                                    saveOrUpdateCriteria={handleAddCriteria}
                                />
                                :
                                null
                        }
                    </div>


                </TabPanel>
                <TabPanel value={value} index={1}>
                    <div className='customCard p-0'>
                        <div className='p-2' style={{ backgroundColor: 'var(--c-neutral-10)' }}>
                            <Suspense fallback={<CircularProgress className="centered" />} >
                                <Community jobIdFromJobPage={(jobId) ? jobId : ""} jobTitleFromJobPage={masterJobData?.jobTitle} isInJob={true} />
                            </Suspense>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Suspense fallback={<CircularProgress className="centered" />} >
                        <ApplicantsCount jobId={(jobId) ? jobId : ""} masterJobData={masterJobData} jobCriteriaData={jobCriteriaData}
                            addCriteria={() => handleAddCriteria()} loadRerunCriteria={loadRerunCriteria} jobCount={jobCount} />
                    </Suspense>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <Suspense fallback={<CircularProgress className="centered" />} >
                        <Sourced masterJobData={masterJobData} jobCriteriaData={jobCriteriaData} addCriteria={() => handleAddCriteria()}
                            loadRerunCriteria={loadRerunCriteria} jobCount={jobCount} />
                    </Suspense>
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <Suspense fallback={<CircularProgress className="centered" />} >
                        <Submissions />
                    </Suspense>
                </TabPanel>
                <TabPanel value={value} index={5}>
                    <Suspense fallback={<CircularProgress className="centered" />} >
                        <Interviews />
                    </Suspense>
                </TabPanel>
                <TabPanel value={value} index={6}>
                    <Suspense fallback={<CircularProgress className="centered" />} >
                        <ModuleFormAnswer moduleById={Number(jobId)} moduleId={20001} moduleName='Job Form' />
                    </Suspense>
                    {/* {
                        <CustomFields masterJobData={masterJobData} />
                    } */}
                </TabPanel>
                <TabPanel value={value} index={7}>
                    {
                        (masterJobData?.workflowDetails?.workflowid && !masterJobData?.workflowDetails?.ispause && !masterJobData?.workflowDetails?.isdelete) ?
                            <Suspense fallback={<CircularProgress className="centered" />} >
                                <Workflow />
                            </Suspense>
                            :
                            null
                    }
                </TabPanel>
                <TabPanel value={value} index={8}>
                    <Suspense fallback={<CircularProgress className="centered" />} >
                        < ActivityLog />
                    </Suspense>
                </TabPanel>
            </div>
            {/* <Menu
                //anchorEl={anchorElskills}
                anchorPosition={menuPosition ? { top: menuPosition.top, left: menuPosition.left } : undefined}
                anchorReference="anchorPosition"
                keepMounted
                open={Boolean(menuPosition)}
                onClose={() => {
                    setMenuPosition(null);
                    setSelectedWord('');
                    //setAnchorElskills(null)
                }}
            >
                <MenuItem onClick={() => {
                    addSkillText("1", selectedWord)
                    setMenuPosition(null);
                }}>Mandatory Skill</MenuItem>
                <MenuItem onClick={() => {
                    addSkillText("2", selectedWord)
                    setMenuPosition(null);
                }
                }>Preferred Skill</MenuItem>
            </Menu>
            <Menu
                anchorEl={anchorEl}

                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <div style={{ margin: '3px', padding: '3px', display: "flex", justifyContent: "space-between" }}>

                    <Typography variant="h6" className="modal-title">

                        {currentSkill?.skillname}</Typography>
                    <button type="button" className="btn btn-sm btn-primary py-0" onClick={handleClose}>Done</button>
                </div>

                {currentSkill?.synonyms_skills?.map((subSkill) => (
                    <MenuItem key={subSkill.synonyms_skillid}>
                        {subSkill.synonyms_skillname}
                    </MenuItem>
                ))}

                <ListItem>
                    <TextField
                        fullWidth
                        value={subSkillInput}

                        onChange={(e) => setSubSkillInput(e.target.value)}

                        placeholder="Add Sub-Skill"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => {
                                        if (currentSkill && currentSkill.skillid) {
                                            addSubSkill(currentSkill.skillid)
                                        }

                                        setAnchorEl(null)
                                    }}>

                                        <AddIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </ListItem>
            </Menu> */}

            {/* </div > */}

        </Box >

    );

}