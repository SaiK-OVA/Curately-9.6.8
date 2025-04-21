import { useRef, SyntheticEvent, useState, useEffect } from '../../../../shared/modules/React';
import { MenuItem } from '../../../../shared/modules/MaterialImports/Menu';
import { ListItemText } from '../../../../shared/modules/MaterialImports/List';
import { Grid } from '../../../../shared/modules/MaterialImports/Grid';
import { Box } from '../../../../shared/modules/MaterialImports/Box';
import { Tooltip } from '../../../../shared/modules/MaterialImports/ToolTip';
import { Button, IconButton } from '../../../../shared/modules/MaterialImports/Button';
import { Chip } from '../../../../shared/modules/MaterialImports/Chip';
import { Card, CardContent } from '../../../../shared/modules/MaterialImports/Card';
import { FormControl, InputAdornment, InputLabel, TextField, FormControlLabel } from '../../../../shared/modules/MaterialImports/FormInputs';

import { Checkbox, Radio, RadioGroup, Select } from '../../../../shared/modules/MaterialImports/FormElements';

import { Form, Formik, useFormik, Yup } from '../../../../shared/modules/Formik';

import { Accordion, AccordionDetails, AccordionSummary } from '../../../../shared/modules/MaterialImports/Accordion';
import { Typography } from '../../../../shared/modules/MaterialImports/Typography';
import { Dialog, DialogActions, DialogContent, DialogTitle, CloseIcon } from '../../../../shared/modules/MaterialImports/Dialog';

import { Stack } from '../../../../shared/modules/MaterialImports/Stack';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
//import PermIdentityIcon from '@mui/icons-material/PermIdentity';
// import Autocomplete from '@mui/material/Autocomplete';
// import { showToaster } from '../../../shared/SnackBar/SnackBar';
import AddIcon from '@mui/icons-material/Add';
import { DEGREE_TYPES, LANGUAGES, TAXONOMIES } from '../../../../shared/data/Community/Community';
//import { PreferencesData } from "../../../../shared/data/Community/Preferences";
import masterStatesList from '../../../../shared/data/States';

//import OutlinedInput from '@mui/material/OutlinedInput';
// import { useTheme } from '@mui/material/styles';
//import useMediaQuery from '@mui/material/useMediaQuery';
// import Paper from '@mui/material/Paper';
// import Menu from '@mui/material/Menu';
// import { styled } from '@mui/material/styles';
//import Tab from '@mui/material/Tab';
// import TabContext from '@mui/lab/TabContext';
//import TabList from '@mui/lab/TabList';
// import TabPanel from '@mui/lab/TabPanel';
import AssignmentReturnOutlinedIcon from '@mui/icons-material/AssignmentReturnOutlined';


import ApiService from '../../../../shared/api/api';

// import Editor from '../../../shared/EmailDialogBox/EmailBody';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// import { trackPromise } from 'react-promise-tracker';
import { useDebounce } from '../../../../shared/services/useDebounce';

import { MUIAutoComplete } from '../../../shared/MUIAutoComplete/MUIAutoComplete';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { trackPromise } from '../../../../shared/modules/PromiseTrackter';
import { useSearchParams } from 'react-router-dom';
import Slider from '@mui/material/Slider';
import { CurrentEmpStatus_10010, EmpAvailabilityStatus_10011, EmpJobPref_10012, EmpLocPref_10013, Preferredworkinghours_10019 } from '../../../../shared/data/Community/Preference';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import FormGroup from '@mui/material/FormGroup';
//import './CommunityMoreFilters.scss'
// import { userLocalData } from '../../../../shared/services/userData';
// import { showToaster } from '../../../shared/SnackBar/SnackBar';
import { userLocalData } from '../../../../shared/services/userData';
import MoreFilters from './SubComponents/MoreFilters';
import ShowMoreFilters from './SubComponents/ShowMoreFilters';

import { SourceInterface } from './Community';

import { RadioButtonChecked, RadioButtonUnchecked } from '@mui/icons-material';
import { Collapse } from '@mui/material';
import { showToaster } from '../../../shared/SnackBar/SnackBar';
import TotalCount from './SubComponents/TotalCount/TotalCount';


import './CommunityFilters.scss';
import { ID_PLATFORM_HIGH_VOLUME_HIRING, ID_PLATFORM_TALENT_SOURCE, ID_SETTINGS_SOVREN, ID_SETTINGS_TALENTPOOL } from '../../../../shared/services/Permissions/IDs';


const stringArray: string[] = [];
interface Skill {
    recentUse: boolean;
    experLevel: string;
    skillName: string;
}
export interface HiringStatus {
    candStatusId: string;
    label: string;
}
export interface activityDetails {
    id: number;
    activityName: string;
}
export interface lookUpSourceList {
    value: string;
    name: string;
}
export interface CandidateStatus {
    candidateStatusId: string;
    candidateStatusName: string;
}



const CommunityFilters = ({ onApply, updateJobDetails, jobIdFromJobPage, jobTitleFromJobPage, isInJob, talentPoolId, clearData, passedData, sourcesList, filtersSearchId }: { onApply: any, updateJobDetails: any, jobIdFromJobPage: string, jobTitleFromJobPage: string, isInJob: boolean, talentPoolId: string; clearData: () => void, passedData?: any; sourcesList: SourceInterface[], filtersSearchId: string }) => {



    const filtersSearchData = useRef<{
        expanded: string | false;
        weightage: number[];
        weightageRef: number[];
        isLocationTypeRegion: undefined | boolean;
        candidateActivityType: activityDetails[];
        candidateProfileSource: lookUpSourceList[];
        candidateStatusList: CandidateStatus[];
        hiringStatusList: HiringStatus[];
        indexToReplace: { job: number, skill: number };
        open: boolean;

    }>((sessionStorage.getItem(`communityFilters_${filtersSearchId}`) && JSON.parse(sessionStorage.getItem(`communityFilters_${filtersSearchId}`) as string)) ?
        JSON.parse(sessionStorage.getItem(`communityFilters_${filtersSearchId}`) as string) : {
            expanded: false,
            weightage: [45, 45, 10,],
            weightageRef: [45, 45, 10,],
            isLocationTypeRegion: undefined,
            candidateActivityType: [],
            candidateProfileSource: [],
            candidateStatusList: [],
            hiringStatusList: [],
            indexToReplace: {
                job: -1,
                skill: -1
            },
            open: false,
            openAccordion: null,
        });

    const saveDataToSession = () => {
        filtersSearchData.current = {
            expanded: expanded,
            weightage: weightage,
            weightageRef: weightageRef.current,
            isLocationTypeRegion: isLocationTypeRegion,
            candidateActivityType: candidateActivityType,
            candidateProfileSource: candidateProfileSource,
            candidateStatusList: candidateStatusList,
            hiringStatusList: hiringStatusList,
            indexToReplace: indexToReplace.current,
            open: open
        }
        if (filtersSearchId) {
            sessionStorage.setItem(`communityFilters_${filtersSearchId}`, JSON.stringify(filtersSearchData.current));
        }
    }

    // const CurrentEmpStatusOption = PreferencesData.find(item => item.categoryID === 10010)?.lookupsList;
    // const EmpAvailabilityStatusOption = PreferencesData.find(item => item.categoryID === 10011)?.lookupsList;
    // const EmpJobPrefOption = PreferencesData.find(item => item.categoryID === 10012)?.lookupsList;
    // const EmpLocPrefOption = PreferencesData.find(item => item.categoryID === 10013)?.lookupsList;
    // const EmpWorkingHoursOption = [{"lookupId":"Office hours","lookupValue":"Office hours"},{"lookupId":"Mornings","lookupValue":"Mornings"},
    // {"lookupId":"Afternoons","lookupValue":"Afternoons"},{"lookupId":"Evening/Nights","lookupValue":"Evening/Nights"}];

    const [searchParams] = useSearchParams();
    // const isSovrenEnabled = userLocalData.adminSettings(20048);
    const isCRMEnabled = userLocalData.adminSettings(ID_PLATFORM_TALENT_SOURCE);
    const isHighVolumeHiringSettingEnabled = !userLocalData.adminSettings(ID_PLATFORM_HIGH_VOLUME_HIRING);
    const [hiringStatusList, setHiringStatusList] = useState<HiringStatus[]>(filtersSearchData.current?.hiringStatusList?.length ? filtersSearchData.current.hiringStatusList : []);

    const [candidateActivityType, setCandidateActivityType] = useState<activityDetails[]>(filtersSearchData.current?.candidateActivityType?.length ? filtersSearchData.current.candidateActivityType : []);
    const [candidateProfileSource, setCandidateProfileSource] = useState<lookUpSourceList[]>(filtersSearchData.current?.candidateProfileSource?.length ? filtersSearchData.current.candidateProfileSource : []);
    const [candidateStatusList, setcandidateStatusList] = useState<CandidateStatus[]>(filtersSearchData.current?.candidateStatusList?.length ? filtersSearchData.current.candidateStatusList : []);



    const validationSchema = Yup.object({
        keywords: Yup.string(),
        jobTitles: Yup.array().of(
            Yup.object().shape({
                title: Yup.string(),
                required: Yup.boolean()
            })
        ),
        location: Yup.object().shape({
            city: Yup.string(),
            state: Yup.string(),
            zipCode: Yup.string(),
            radius: Yup.string(),
        }),
        workAuthorization: Yup.object().shape({
            auth_in_US: Yup.string(),
            Req_visa_sponsorship: Yup.string(),
        }),
        skills: Yup.array().of(
            Yup.object().shape({
                recentUse: Yup.boolean(),
                experLevel: Yup.string(),
                skillName: Yup.string(),
            })
        ),
        allSkills: Yup.string(),
        employer: Yup.array().of(
            Yup.object().shape({
                employerName: Yup.string(),
            })
        ),
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
        daysBack: Yup.string(),
        minExp: Yup.string(),
        maxExp: Yup.string(),
        minManExp: Yup.string(),
        maxManExp: Yup.string(),
        certifications: Yup.array().of(
            Yup.object().shape({
                certificationName: Yup.string(),
            })
        ),
        industries: Yup.array().of(
            Yup.object().shape({
                indcate: Yup.string(),
                subCat: Yup.string(),
            })
        ),
        languageSpoken: Yup.string(),
        jobDescription: Yup.string(),
        selectedJobTitle: Yup.string(),
        selectedJobId: Yup.string(),
        parsedDocument: Yup.string(),
        tagId: Yup.string(),
        tagName: Yup.string(),
        talentPoolId: Yup.string(),
        talentPoolName: Yup.string(),
        preference: Yup.object().shape({
            CurrentEmpStatus: Yup.string(),
            EmpAvailabilityStatus: Yup.string(),
            EmpJobPref: Yup.string(),
            EmpLocPref: Yup.string(),
            EmpWorkHoursPref: Yup.string()
        }),
        communityMemberActivity: Yup.object().shape({
            jobApplication: Yup.string(),
            profileUpdate: Yup.string(),
            avaliablityStatusUpdate: Yup.string(),
            shiftPrefernceUpdate: Yup.string(),
            preferenceUpdate: Yup.string(),
            profileCompletion: Yup.string(),
            mobileVerified: Yup.string()
        }),
        email: Yup.object().shape({
            emailClicked: Yup.number(),
            emailReplied: Yup.string(),
            emailBounced: Yup.string(),
            emailSpamBlocked: Yup.string(),
            emailUnsubscribed: Yup.string()
        }),
        sms: Yup.object().shape({
            smsSent: Yup.string(),
            smsReplied: Yup.string(),
            smsUnsubscribed: Yup.string()
        }),
        candidateActivities: Yup.object().shape({
            resume: Yup.string(),
            contact: Yup.string(),
            email: Yup.string(),
            candidateLastActivityDate: Yup.string(),
            candidateActivityType: Yup.string(),
            placementEndDate: Yup.string(),
            hiringStatusInValues: Yup.string(),
            candidateStatusInValues: Yup.string(),
            candidateProfileSource: Yup.string()
        }),
        curationActivity: Yup.object().shape({
            submissionActivity: Yup.string(),
            interviewActivity: Yup.string(),
            rating: Yup.string(),
            notes: Yup.string()
        }),

    });
    const communityFormik = useFormik({
        initialValues: passedData ? passedData : {
            keywords: "",
            jobTitles: [
                {
                    title: "",
                    required: false
                }
            ],
            location: {
                city: "",
                state: "",
                zipCode: "",
                radius: ""
            },
            workAuthorization: {
                auth_in_US: "",
                Req_visa_sponsorship: "",
            },
            skills: [
                {
                    recentUse: false,
                    experLevel: "",
                    skillName: ""
                }
            ],
            allSkills: "",
            employer: [
                {
                    employerName: "",
                }
            ],
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
            daysBack: "3650", //talentPoolId ? "3650" : "90",
            minExp: "",
            maxExp: "",
            minManExp: "",
            maxManExp: "",
            certifications: [
                {
                    certificationName: "",
                }
            ],
            industries: [
                {
                    indcate: "",
                    subCat: "",
                }
            ],
            languageSpoken: "",
            jobDescription: "",
            selectedJobTitle: "",
            selectedJobId: "",
            parsedDocument: "",
            tagId: "",
            tagName: "",
            talentPoolId: "",
            talentPoolName: "",
            preference:
            {
                CurrentEmpStatus: "",
                EmpAvailabilityStatus: "",
                EmpJobPref: "",
                EmpLocPref: "",
                EmpWorkHoursPref: ""
            },
            communityMemberActivity: {
                jobApplication: "",
                profileUpdate: "",
                avaliablityStatusUpdate: "",
                shiftPrefernceUpdate: "",
                preferenceUpdate: "",
                profileCompletion: "",
                mobileVerified: "",
            },
            email: {
                emailClicked: "",
                emailReplied: "",
                emailBounced: "",
                emailSpamBlocked: "",
                emailUnsubscribed: "",
            },
            sms: {
                smsSent: "",
                smsReplied: "",
                smsUnsubscribed: "",
            },
            candidateActivities: {
                resume: "",
                contact: "",
                email: "",
                candidateLastActivityDate: "",
                candidateActivityType: "",
                placementEndDate: "",
                hiringStatusInValues: "",
                candidateStatusInValues: "",
                candidateProfileSource: "",
            },
            curationActivity: {
                submissionActivity: "",
                interviewActivity: "",
                rating: "",
                notes: "",
            },
        },
        validationSchema: validationSchema,
        onSubmit: () => {
            // console.log('Form values:', values);
        },
        enableReinitialize: true,
    });
    // 208057


    const [expanded, setExpanded] = useState<string | false>(filtersSearchData.current?.expanded ? filtersSearchData.current.expanded : false);
    const [jobTitleSuggestions, setJobTitleSuggestions] = useState([]);
    // const [selectedJobTitle, setSelectedJobTitle] = useState({
    //     title: "",
    //     id: ""
    // });

    const [weightage, setWeightage] = useState(filtersSearchData.current?.weightage ? filtersSearchData.current.weightage : [45, 45, 10,]);
    const weightageRef = useRef(filtersSearchData.current?.weightageRef ? filtersSearchData.current.weightageRef : [45, 45, 10,]);
    const [isLocationTypeRegion, setIsLocationTypeRegion] = useState<undefined | boolean>(filtersSearchData.current?.isLocationTypeRegion ? filtersSearchData.current.isLocationTypeRegion : undefined)
    useEffect(() => {
        const fetchHiringStatusList = () => {
            const requestData = {
                clientId: userLocalData.getvalue("clientId"),
                recrId: userLocalData.getvalue("recrId"),
            };
            trackPromise(
                ApiService.postWithData("admin", "getHiringStatusList", requestData)
                    .then((response) => {

                        if (response.data && response.data.hiringStatusList) {
                            setHiringStatusList(response.data.hiringStatusList);
                        }
                    })
                    .catch((error) => {
                        console.error("Error fetching hiring status list", error);
                    })
            )
        };
        if (!hiringStatusList.length) {
            fetchHiringStatusList();
        }

        const fetchCandidateActivityType = () => {
            const requestData = {
                clientId: userLocalData.getvalue("clientId"),
                //recrId: userLocalData.getvalue("recrId"),
            };
            trackPromise(
                ApiService.postWithData("admin", "getActivityList", requestData)
                    .then((response) => {

                        if (response.data && response.data.activityDetails) {
                            setCandidateActivityType(response.data.activityDetails);
                        }
                        //console.log(response.data.activityDetails)

                    })
                    .catch((error) => {
                        console.error("Error fetching Candidate Activity Type", error);
                    })
            )
        };
        if (!candidateActivityType.length) {
            fetchCandidateActivityType();
        }

        const fetchCandidateProfileSource = () => {
            // const requestData = {
            //     clientId: userLocalData.getvalue("clientId"),
            //     //recrId: userLocalData.getvalue("recrId"),
            // };
            let clientId = userLocalData.getvalue("clientId")
            trackPromise(
                ApiService.getCall("admin", `getLookupSourceList/${clientId}`)
                    .then((response) => {

                        if (response.data && response.data.lookUpSourceList) {
                            setCandidateProfileSource(response.data.lookUpSourceList);
                        }
                        //console.log(response.data.lookUpSourceList)

                    })
                    .catch((error) => {
                        console.error("Error fetching Candidate Profile Source", error);
                    })
            )
        };
        if (!candidateProfileSource.length) {
            fetchCandidateProfileSource();
        }

        const fetchCandidateStatusList = () => {
            const requestData = {
                clientId: userLocalData.getvalue("clientId"),
                recrId: userLocalData.getvalue("recrId"),
            };
            trackPromise(
                ApiService.postWithData("admin", "getCandidateStatusList", requestData)
                    .then((response) => {

                        if (response.data && response.data.candidateStatusList) {
                            setcandidateStatusList(response.data.candidateStatusList);
                        }
                    })
                    .catch((error) => {
                        console.error("Error fetching candidate status list", error);
                    })
            )
        };
        if (!candidateStatusList.length) {
            fetchCandidateStatusList();
        }
    }, []);

    useEffect(() => {
        // console.log(searchParams);
        let jobTitleFromSearchParams = searchParams.get('jobTitle') || jobTitleFromJobPage;
        let jobIdFromSearchParams = searchParams.get('jobId') || jobIdFromJobPage;
        if (jobTitleFromSearchParams && jobIdFromSearchParams) {
            // setSelectedJobTitle({
            //     title: jobTitleFromSearchParams ? jobTitleFromSearchParams : "",
            //     id: jobIdFromSearchParams ? jobIdFromSearchParams : ""
            // });
            updateJobDetails(searchParams.get('jobId'), searchParams.get('jobTitle'));
            searchSkillsFromDescription((jobIdFromSearchParams) ? jobIdFromSearchParams : "", '');
        }
    }, [searchParams]);


    // useEffect(() => {
    //     // let jobId = searchParams.get('jobId');
    //     if ((searchParams.get('jobTitle') || jobTitleFromJobPage) && (searchParams.get('jobId') || jobIdFromJobPage)) {
    //         // updateJobDetails(searchParams.get('jobId'), searchParams.get('jobTitle'));
    //         // searchSkillsFromDescription((jobId) ? jobId : "", '');
    //     } else {
    //         // onApply(communityFormik.values, false);
    //         //Commented for purpose
    //     }
    // }, []);
    useEffect(() => {
        const condArr = [null, undefined, ""];
        if ((!condArr.includes(passedData?.location?.city)) || (!!passedData?.location?.state?.length)) {
            communityFormik.setFieldValue("location.zipCode", "");
            communityFormik.setFieldValue("location.radius", "");
            setIsLocationTypeRegion(true);
        } else if ((!condArr.includes(passedData?.location?.zipCode)) || (!condArr.includes(passedData?.location?.radius))) {
            communityFormik.setFieldValue("location.city", "");
            communityFormik.setFieldValue("location.state", "");
            setIsLocationTypeRegion(false);
        } else setIsLocationTypeRegion(undefined);
    }, [passedData?.location]);

    const indexToReplace = useRef({
        job: -1,
        skill: -1
    });


    const searchSkillsFromDescription = (id = "", desc = "") => {
        if (id || desc) {
            let dataToPass: any = {
            }
            if (id) {
                dataToPass.jobid = id;
            }
            if (desc) {
                dataToPass.descr = desc.replace(/[^a-zA-Z0-9~`!@#$%^&*()_+-={}|:;<>,.?\/ \n[\]']/g, "").replace(/\s+/g, ' ').replace('\\r\\n', ' ').replace(/\\/g, ' ').replace(/\n/g, ' ');
            }
            trackPromise(
                ApiService.getByParams(193, 'Curately/Sovren/sovren_curately_comunity_sovren_skills.jsp', dataToPass)
                    .then(
                        (result: any) => {
                            // console.log(result);
                            if (result.data && result.data && ((result.data.skills && result.data.skills.length) || (result.data.jobTitle && result.data.jobTitle.trim()) || (result.data.ParsedDocument && result.data.ParsedDocument.trim()))) {
                                let tempData = { ...communityFormik.values };
                                let tempSkills: Skill[] = result.data.skills
                                    .filter((skillName: any, index: number, self: any) =>
                                        skillName && index === self.findIndex((t: any) => t === skillName)
                                    )
                                    .map((skillName: any) => ({
                                        recentUse: false,
                                        experLevel: "",
                                        skillName: skillName
                                    }));

                                tempData.skills = tempSkills;


                                let tempJobTitle = (result.data.jobTitle && result.data.jobTitle.trim()) ? result.data.jobTitle.trim() : "";
                                tempData.jobTitles = [{
                                    title: tempJobTitle,
                                    required: false
                                }];
                                let tempParsedDoc = (result.data.ParsedDocument && result.data.ParsedDocument.trim()) ? result.data.ParsedDocument.trim() : ""
                                tempData.parsedDocument = tempParsedDoc;
                                tempData.daysBack = "3650";

                                communityFormik.setValues({
                                    ...communityFormik.values,
                                    skills: tempSkills,
                                    jobTitles: [{
                                        title: tempJobTitle,
                                        required: false
                                    }],
                                    parsedDocument: tempParsedDoc,
                                    daysBack: "3650",
                                    selectedJobId: desc ? "" : communityFormik.values.selectedJobId,
                                    selectedJobTitle: desc ? "" : communityFormik.values.selectedJobTitle,
                                    jobDescription: id ? "" : communityFormik.values.jobDescription
                                });
                                setJobTitleSuggestions([]);
                                setSkillSuggestions([]);
                                onApply(tempData, true, true);
                                saveDataToSession();
                            } else {
                                communityFormik.setValues({
                                    ...communityFormik.values,
                                    selectedJobId: desc ? "" : communityFormik.values.selectedJobId,
                                    selectedJobTitle: desc ? "" : communityFormik.values.selectedJobTitle,
                                    jobDescription: id ? "" : communityFormik.values.jobDescription
                                })
                                clearData();
                            }
                        }
                    )
            )
        }
    }


    const searchJobTitles = (val: string, index: number) => {
        indexToReplace.current = {
            ...indexToReplace.current,
            job: index
        }
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

    const searchJobTitlesWithDebounce = useDebounce(searchJobTitles);

    const [skillSuggestions, setSkillSuggestions] = useState([]);

    const searchSkills = (val: string, index: number) => {
        indexToReplace.current = {
            ...indexToReplace.current,
            skill: index
        }

        ApiService.postWithData('admin', 'lighthouse', {
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
    const inputRef = useRef<HTMLInputElement>(null); //input ref 
    const handleAccordionChange = (panel: string) => (_event: SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);

        switch (panel) {
            case "locationPanel":
                let count = (communityFormik.values.location.city !== "" ? 1 : 0) +
                    (communityFormik.values.location.state.length ? 1 : 0) +
                    (communityFormik.values.location.zipCode !== "" ? 1 : 0) +
                    (communityFormik.values.location.radius !== "" ? 1 : 0);
                setIsLocationTypeRegion((prev) => count !== 0 ? prev : undefined);
                break;
            default: break;
        }
        // Focus the input if the panel is expanded
        if (isExpanded) {
            // Delay the focus slightly to ensure the panel is fully expanded
            setTimeout(() => {
                inputRef.current?.focus();
            }, 0);
        }
    };

    // const countSelectedFilters = () => {

    //     let count = 0;
    //     if (communityFormik.values.keywords !== "") count++;
    //     if (communityFormik.values.jobTitles.some((jobtitle: any) => jobtitle.title)) count++;
    //     if (communityFormik.values.skills.some((skill: any) => skill.skillName)) count++;
    //     if (communityFormik.values.location.city !== "") count++;
    //     if (communityFormik.values.location.state.length > 0) count++;
    //     if (communityFormik.values.location.zipCode !== "") count++;
    //     if (communityFormik.values.location.radius !== "") count++;
    //     // if (communityFormik.values.workAuthorization.title !== "") count++;
    //     if (communityFormik.values.workAuthorization.Req_visa_sponsorship !== "") count++;
    //     if (communityFormik.values.workAuthorization.auth_in_US !== "") count++;
    //     if (communityFormik.values.employer.some((employer: any) => employer.employerName)) count++;
    //     if (communityFormik.values.degTypes.length) count++;
    //     if (communityFormik.values.schools.some((school: any) => school.schoolName)) count++;
    //     if (communityFormik.values.tagName !== "") count++;
    //     if (communityFormik.values.talentPoolName !== "") count++;
    //     if (communityFormik.values.degrees.some((degree: any) => degree.degreeName)) count++;
    //     if (communityFormik.values.certifications.some((certification: any) => certification.certificationName)) count++;
    //     if (communityFormik.values.industries.some((industry: any) => industry.indcate || industry.subCat)) count++;
    //     if (communityFormik.values.languageSpoken !== "") count++;
    //     if (communityFormik.values.preference.EmpWorkHoursPref !== "") count++;
    //     if (communityFormik.values.preference.CurrentEmpStatus !== "") count++;
    //     if (communityFormik.values.preference.EmpAvailabilityStatus !== "") count++;
    //     if (communityFormik.values.preference.EmpJobPref !== "") count++;
    //     if (communityFormik.values.preference.EmpLocPref !== "") count++;

    //     if (communityFormik.values.minExp || communityFormik.values.maxExp) count++;
    //     if (communityFormik.values.minManExp || communityFormik.values.maxManExp) count++;

    //     return count;
    // }


    const handleClearAllFilters = () => {
        communityFormik.resetForm({
            values: {
                keywords: "",
                jobTitles: [
                    {
                        title: "",
                        required: false
                    }
                ],
                location: {
                    city: "",
                    state: "",
                    zipCode: "",
                    radius: ""
                },
                workAuthorization: {
                    auth_in_US: "",
                    Req_visa_sponsorship: "",
                },
                skills: [
                    {
                        recentUse: false,
                        experLevel: "",
                        skillName: ""
                    }
                ],
                allSkills: "",
                employer: [
                    {
                        employerName: "",
                    }
                ],
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
                daysBack: "3650", // talentPoolId ? "3650" : "90",
                minExp: "",
                maxExp: "",
                minManExp: "",
                maxManExp: "",
                certifications: [
                    {
                        certificationName: "",
                    }
                ],
                industries: [
                    {
                        indcate: "",
                        subCat: "",
                    }
                ],
                languageSpoken: "",
                jobDescription: "",
                selectedJobTitle: "",
                selectedJobId: "",
                parsedDocument: "",
                tagId: "",
                tagName: "",
                talentPoolId: "",
                talentPoolName: "",
                preference:
                {
                    CurrentEmpStatus: "",
                    EmpAvailabilityStatus: "",
                    EmpJobPref: "",
                    EmpLocPref: "",
                    EmpWorkHoursPref: ""
                },
                communityMemberActivity: {
                    jobApplication: "",
                    profileUpdate: "",
                    avaliablityStatusUpdate: "",
                    shiftPrefernceUpdate: "",
                    preferenceUpdate: "",
                    profileCompletion: "",
                    mobileVerified: "",
                },
                email: {
                    emailClicked: "",
                    emailReplied: "",
                    emailBounced: "",
                    emailSpamBlocked: "",
                    emailUnsubscribed: "",
                },
                sms: {
                    smsSent: "",
                    smsReplied: "",
                    smsUnsubscribed: "",
                },
                candidateActivities: {
                    resume: "",
                    contact: "",
                    email: "",
                    candidateLastActivityDate: "",
                    candidateActivityType: "",
                    placementEndDate: "",
                    hiringStatusInValues: "",
                    candidateStatusInValues: "",
                    candidateProfileSource: "",
                },
                curationActivity: {
                    submissionActivity: "",
                    interviewActivity: "",
                    rating: "",
                    notes: "",
                },
            }
        });
        setIsLocationTypeRegion(undefined);
    };
    const searchResumes = (e: any) => {
        e.preventDefault();
        // console.log(communityFormik.values.jobTitleSwitch)
    }

    const onApplyFilters = (applyMoreFilters = true) => {
        let tempObjToPass: any = { ...communityFormik.values };
        tempObjToPass.weightage = weightageRef.current;
        // if (!selectedJobTitle.id) {
        //     communityFormik.setFieldValue('parsedDocument', "");
        //     tempObjToPass.parsedDocument = "";
        // }
        console.log(communityFormik.values);
        if ((communityFormik.values.minExp === "0") || (communityFormik.values.minExp === 0)) {
            showToaster('Min Work Experience must be greater than zero', 'error');
            return false
        }
        if ((communityFormik.values.maxExp === "0") || (communityFormik.values.maxExp === 0)) {
            showToaster('Max Work Experience must be greater than zero', 'error');
            return false
        }
        if (communityFormik.values.minExp && communityFormik.values.maxExp) {
            if (parseFloat(communityFormik.values.minExp) >= parseFloat(communityFormik.values.maxExp)) {
                showToaster('Max Work Experience must be greater than Min Work Experience.', 'error');
                return false;
            }
        }
        if ((communityFormik.values.minManExp === "0") || (communityFormik.values.minManExp === 0)) {
            showToaster('Min Management Experience must be greater than zero', 'error');
            return false
        }
        if ((communityFormik.values.maxManExp === "0") || (communityFormik.values.maxManExp === 0)) {
            showToaster('Management Experience must be greater than zero', 'error');
            return false
        }
        if (communityFormik.values.minManExp && communityFormik.values.maxManExp) {
            if (parseFloat(communityFormik.values.minManExp) >= parseFloat(communityFormik.values.maxManExp)) {
                showToaster('Max Management Experience must be greater than Min Management Experience.', 'error');
                return false;
            }
        }

        onApply(tempObjToPass, applyMoreFilters);
        saveDataToSession();
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
    // const [anchorMenuEl, setAnchorMenuEl] = useState<null | HTMLElement>(null);
    // const menuOpen = Boolean(anchorMenuEl);


    // console.log(communityFormik.values)
    const updateCommunityFormik = (type: 'add' | 'delete' | 'update', val: any, objectName: 'jobTitles' | 'skills' | 'employer' | 'schools' | 'degrees' | 'certifications' | 'industries', index?: number, position?: string) => {
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
                } else if (objectName === 'employer') {
                    // @ts-ignore
                    objToModify[index].employerName = val;
                } else if (objectName === 'degrees') {
                    // @ts-ignore
                    objToModify[index].degreeName = val;
                } else if (objectName === 'certifications') {
                    // @ts-ignore
                    objToModify[index].certificationName = val;
                } else if (objectName === 'industries') {
                    // @ts-ignore
                    objToModify[index].subCat = val;
                    // @ts-ignore
                    objToModify[index].indcate = val;
                }
            }
            if (type === 'add') {
                if (objectName === 'jobTitles') {
                    if (indexToReplace.current.job !== -1) {
                        position === 'next' ? objToModify.push(val) : objToModify[indexToReplace.current.job] = val;

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
                        position === 'next' ? objToModify.push(val) : objToModify[indexToReplace.current.skill] = val;
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

    // const totalWeightage = weightage.reduce((a, b) => a + b, 0);
    // event: any, newValue: number | number[]
    const updateWeightage = (value: number, index: number) => {
        let remaining = 100 - parseInt(String(value), 10);
        let oneRemained = (remaining % 2 === 0) ? (remaining / 2) : ((remaining + 1) / 2);
        let secondRemained = (remaining % 2 === 0) ? (remaining / 2) : ((remaining - 1) / 2);
        switch (index) {
            case 0:
                setWeightage([parseInt(String(value), 10), oneRemained, secondRemained]);
                weightageRef.current = [parseInt(String(value), 10), oneRemained, secondRemained];
                break;
            case 1:
                setWeightage([oneRemained, parseInt(String(value), 10), secondRemained]);
                weightageRef.current = [oneRemained, parseInt(String(value), 10), secondRemained];
                break;
            case 2:
            default:
                setWeightage([oneRemained, secondRemained, parseInt(String(value), 10)]);
                weightageRef.current = [oneRemained, secondRemained, parseInt(String(value), 10)];
                break;
        }
        // setWeightage((vs) =>
        //     vs.map((v, i) => {
        //         if (i === index) return parseInt(String(value), 10)
        //         const oldRemaining = 100 - parseInt(String(vs[index]), 10)
        //         if (oldRemaining) return (remaining * v) / oldRemaining
        //         return remaining / (weightage.length - 1)
        //     }),
        // )
    };

    const weightageUpdated = useDebounce(onApplyFilters, 250);

    // useEffect(() => {
    //     communityFormik.setFieldValue('weightage', weightage);
    // }, [weightage])

    const getStateById = (id: string) => {
        let tempObj = masterStatesList.find((obj) => {
            return obj.id === id
        });
        return (tempObj && tempObj.label) ? tempObj.label : ""
    }



    const getLanguageById = (id: string) => {
        let tempObj = LANGUAGES.find((obj) => {
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
    // const [tabValue, setTabValue] = useState('1');

    // const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    //     setTabValue(newValue);
    // };


    const getPreferencesEmpStatusById = (id: string) => {
        let tempNames = [];
        if (id) {
            let tempIds = id.split(',');
            for (let ti = 0; ti < tempIds.length; ti++) {
                let tempObj = CurrentEmpStatus_10010.find((obj) => {
                    return obj.id === tempIds[ti]
                });
                tempNames.push((tempObj && tempObj.label) ? tempObj.label : "")
            }
        }
        return tempNames.join();

    }

    const getPreferencesAvailabilityStatusById = (id: string) => {
        let tempNames = [];
        if (id) {
            let tempIds = id.split(',');
            for (let ti = 0; ti < tempIds.length; ti++) {
                let tempObj = EmpAvailabilityStatus_10011.find((obj) => {
                    return obj.id === tempIds[ti]
                });
                tempNames.push((tempObj && tempObj.label) ? tempObj.label : "")
            }
        }
        return tempNames.join();

    }

    const getPreferencesEmpJobById = (id: string) => {
        let tempNames = [];
        if (id) {
            let tempIds = id.split(',');
            for (let ti = 0; ti < tempIds.length; ti++) {
                let tempObj = EmpJobPref_10012.find((obj) => {
                    return obj.id === tempIds[ti]
                });
                tempNames.push((tempObj && tempObj.label) ? tempObj.label : "")
            }
        }
        return tempNames.join();

    }

    const getPreferencesEmpLocById = (id: string) => {
        let tempNames = [];
        if (id) {
            let tempIds = id.split(',');
            for (let ti = 0; ti < tempIds.length; ti++) {
                let tempObj = EmpLocPref_10013.find((obj) => {
                    return obj.id === tempIds[ti]
                });
                tempNames.push((tempObj && tempObj.label) ? tempObj.label : "")
            }
        }
        return tempNames.join();

    }

    const getPreferencesworkinghoursById = (id: string) => {
        let tempNames = [];
        if (id) {
            let tempIds = id.split(',');
            for (let ti = 0; ti < tempIds.length; ti++) {
                let tempObj = Preferredworkinghours_10019.find((obj) => {
                    return obj.id === tempIds[ti]
                });
                tempNames.push((tempObj && tempObj.label) ? tempObj.label : "")
            }
        }
        return tempNames.join();

    }

    // const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    //     '& .MuiDialogContent-root': {
    //         padding: theme.spacing(2),
    //     },
    //     '& .MuiDialogActions-root': {
    //         padding: theme.spacing(1),
    //     },
    // }));

    const [open, setOpen] = useState(filtersSearchData.current?.open ? filtersSearchData.current.open : false);


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // const handleGridSelection = (event) => {
    //     setSelectedOption(event.target.value);
    // };

    // const handleAccordionMoreFiltersChanges = (accordion:any) => {
    //     setOpenAccordion(accordion === openAccordion ? null : accordion); // Toggle accordion open/close
    //   };

    const handleApplyFilters = () => {
        setOpen(false);
        onApplyFilters(false);
    };


    // const [age, setAge] = React.useState('');

    // const handleChange = (event: SelectChangeEvent) => {
    //     setAge(event.target.value);
    // };
    // const theme = useTheme();
    // const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const tagNameCounts = communityFormik.values.tagName ? communityFormik.values.tagName.split(',').length : 0;

    const saveAuditLog = (id: number) => {
        ApiService.saveAuditLog(id);
    }

    return (
        <div id="CommunityFilters ">
            <Box sx={{ width: '100%', }}>
                {/* <TabContext value={tabValue} > */}
                {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className={`${jobIdFromJobPage ? 'd-none' : ''}`}>
                        <TabList onChange={handleTabChange} aria-label="Filters tabs" className='tableTabs'  >
                            <Tab label="AI Search" value="1" icon={<AutoAwesomeIcon sx={{ height: "20px" }} />} iconPosition='start' />
                            <Tab label="Manual Search " value="2" icon={<PermIdentityIcon sx={{ height: "20px" }} />} iconPosition='start' />
                        </TabList>
                    </Box> */}
                {/* <TabPanel value="1" className='p-0'> */}
                <div className='accordian-wrap customFilterChips'>
                    <Accordion disableGutters square expanded={true}
                        // onChange={handleAccordionChange('weightages')} 
                        className={`${(communityFormik.values.parsedDocument) ? '' : 'd-none'}`}>

                        <AccordionDetails>
                            <Stack sx={{ width: '100%' }}>
                                <Stack className='acc-title' direction="row" justifyContent="space-between">
                                    <Stack direction="row" alignItems="center">
                                        <Typography className='mt-2 mb-3'>Weightage</Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                                <Typography sx={{ width: '60px', textAlign: "right" }} className='fs-13 fw-6'>Job Titles</Typography>
                                <Slider aria-label="Job Titles"
                                    value={weightage[0]}
                                    step={1}
                                    onChange={(_, newVal) => updateWeightage(newVal as number, 0)}
                                    onChangeCommitted={() => weightageUpdated()}
                                    // valueLabelDisplay="on"
                                    sx={{
                                        width: '130px'
                                    }}
                                    className='mx-4'
                                />
                                <Typography className='fs-13 fw-6' sx={{ textAlign: 'right', width: '40px' }}>{weightage[0]}%</Typography>
                            </Grid>
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                                <Typography sx={{ width: '60px', textAlign: "right" }} className='fs-13 fw-6'>Skills</Typography>
                                <Slider aria-label="Skills"
                                    value={weightage[1]}
                                    step={1}
                                    onChange={(_, newVal) => updateWeightage(newVal as number, 1)}
                                    onChangeCommitted={() => weightageUpdated()}
                                    // valueLabelDisplay="on"
                                    sx={{
                                        width: '130px'
                                    }}
                                    className='mx-4'
                                />
                                <Typography className='fs-13 fw-6' sx={{ textAlign: 'right', width: '40px' }}>{weightage[1]}%</Typography>
                            </Grid>
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                                <Typography sx={{ width: '60px', textAlign: "right" }} className='fs-13 fw-6'>Education</Typography>
                                <Slider aria-label="Education"
                                    value={weightage[2]}
                                    step={1}
                                    onChange={(_, newVal) => updateWeightage(newVal as number, 2)}
                                    onChangeCommitted={() => weightageUpdated()}
                                    // valueLabelDisplay="on"
                                    sx={{
                                        width: '130px'
                                    }}
                                    className='mx-4'
                                />
                                <Typography className='fs-13 fw-6' sx={{ textAlign: 'right', width: '40px' }}>{weightage[2]}%</Typography>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Stack direction="row" justifyContent="space-between" className='heading' alignItems="center">
                        <Stack direction="row" justifyContent="flex-start" className='heading' >
                            <Typography component="h5" className='mr-2'>Filters</Typography>
                            <TotalCount formikValues={communityFormik.values} handleClearAllFilters={handleClearAllFilters} />
                            {/* {countSelectedFilters() > 0 && (
                                
                            )} */}
                        </Stack>
                        {
                            (talentPoolId === "") && !userLocalData.isChromeExtensionEnabled() &&
                            <div className='moreFilters'>
                                <Grid
                                    container
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                >


                                    <Button variant="outlined" color="secondary" onClick={() => { saveAuditLog(3929); handleOpen() }} className='moreFilters'>More Filters
                                        <AssignmentReturnOutlinedIcon />
                                    </Button>


                                </Grid>
                                {/* <CommunityMoreFilters
                                                fullScreen={fullScreen}
                                                open={open}
                                                handleClose={handleClose}
                                                communityFormik={communityFormik}
                                            /> */}
                            </div>

                        }




                        {/* <div> */}
                        {/* <Button
                                        id="import-button"
                                        aria-controls={menuOpen ? 'import-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={menuOpen ? 'true' : undefined}
                                        onClick={(event) => setAnchorMenuEl(event.currentTarget)}
                                        sx={{ textTransform: 'none' }}
                                        className={`${(isInJob) ? 'd-none' : ''}`}
                                    >
                                        Import
                                        {menuOpen ? <KeyboardArrowDownIcon sx={{ transform: 'scaleY(-1)', height: '16px' }} /> : <KeyboardArrowDownIcon sx={{ height: '16px' }} />}
                                    </Button> */}
                        {/* <Menu
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
                                        </MenuItem> */}
                        {/* <MenuItem
                                            onClick={() => {
                                                setDescModalOpen(true);
                                                setAnchorMenuEl(null);
                                            }}
                                            className='fw-6'
                                        >
                                            Search by Job Description
                                        </MenuItem>
                                    </Menu> */}
                        {/* </div> */}
                    </Stack >
                    {/* <Grid className='pl-4 pr-2 pb-2 fs-12 fw-5' sx={{ cursor: 'pointer' }} onClick={() => {
                                setJobModalOpen(true);
                                setAnchorMenuEl(null);
                            }}> */}
                    {/* <span className='c-darkGrey fs-13'>{selectedJobTitle.title}</span> */}
                    {/* {
                                    (selectedJobTitle.title) ?

                                        <Chip label={`Job: ${selectedJobTitle.title}`} deleteIcon={<CloseIcon />} className={`selectedChips ${(isInJob) ? 'd-none' : ''}`} onDelete={(e) => {
                                            e.stopPropagation();
                                            communityFormik.setFieldValue('selectedJobId', "");
                                            communityFormik.setFieldValue('selectedJobTitle', "");
                                            communityFormik.setFieldValue('parsedDocument', "");
                                            setSelectedJobTitle({
                                                title: "",
                                                id: ""
                                            });
                                        }} />
                                        : ""
                                } */}

                    {/* </Grid> */}
                    <Formik
                        // onSubmit={() => communityFormik.handleChange}
                        // enableReinitialize
                        onSubmit={searchResumes}
                        initialValues={communityFormik.initialValues}
                    >
                        {
                            ({ values }) => (
                                <Form
                                // placeholder={""}
                                // onSubmit={communityFormik.handleSubmit}
                                >
                                    <div className={`filterListTab ${(communityFormik.values.parsedDocument) ? 'filterListTabWeight' : ''}`}>
                                        {userLocalData.adminSettings(ID_SETTINGS_SOVREN) && !isCRMEnabled && !talentPoolId ?
                                            <Accordion disableGutters square expanded={expanded === 'AImatchPanel'} onChange={handleAccordionChange('AImatchPanel')} className={`${isInJob ? 'd-none' : ''}`}>
                                                <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                                                    <Stack sx={{ width: '100%' }}>
                                                        <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                            <Stack direction="row" alignItems="center">
                                                                <Typography >AI Match</Typography>
                                                            </Stack>
                                                            {/* {(communityFormik.values.selectedJobTitle !== "") && <Stack
                                                                className='clearStack'
                                                                direction="row"
                                                                justifyContent="space-around"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    communityFormik.setValues({
                                                                        ...communityFormik.values,
                                                                        selectedJobTitle: "",
                                                                        selectedJobId: ""
                                                                    });
                                                                }}
                                                            >
                                                                <CloseIcon />
                                                                <Typography>
                                                                    {communityFormik.values.selectedJobTitle !== "" && 1}
                                                                </Typography>
                                                            </Stack>
                                                            } */}
                                                            {/* {(communityFormik.values.jobDescription !== "") && <Stack
                                                            className='clearStack'
                                                            direction="row"
                                                            justifyContent="space-around"
                                                            onClick={(e) => { e.stopPropagation(); communityFormik.setFieldValue("jobDescription", "") }}
                                                        >
                                                            <CloseIcon />
                                                            <Typography>
                                                                {communityFormik.values.jobDescription !== "" && 1}
                                                            </Typography>
                                                        </Stack>
                                                        } */}
                                                            <div>

                                                                {/* <Menu
                                                                        id="import-menu"
                                                                        anchorEl={anchorMenuEl}
                                                                        open={menuOpen}
                                                                        onClose={() => setAnchorMenuEl(null)}
                                                                        MenuListProps={{
                                                                            'aria-labelledby': 'import-button',
                                                                        }}
                                                                    > */}
                                                                {/* <MenuItem
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
                                                                        </MenuItem> */}
                                                                {/* </Menu> */}
                                                            </div>
                                                        </Stack>
                                                        {(communityFormik.values.selectedJobTitle !== "" && expanded !== 'AImatchPanel') &&
                                                            <Stack direction="row" mt={1} flexWrap="wrap">
                                                                <div className='filterLabelName'>Job:</div>
                                                                <Chip label={communityFormik.values.selectedJobTitle} deleteIcon={<CloseIcon />} className='selectedChips' onDelete={(e) => {
                                                                    e.stopPropagation();
                                                                    communityFormik.setValues({
                                                                        ...communityFormik.values,
                                                                        selectedJobTitle: "",
                                                                        selectedJobId: ""
                                                                    });
                                                                }} />
                                                            </Stack>
                                                        }
                                                        {(communityFormik.values.jobDescription !== "" && expanded !== 'AImatchPanel') &&
                                                            <Stack direction="row" mt={1} flexWrap="wrap">
                                                                <div className='filterLabelName'>Description:</div>
                                                                <Chip label={communityFormik.values.jobDescription} deleteIcon={<CloseIcon />} className='selectedChips' onDelete={(e) => { e.stopPropagation(); communityFormik.setFieldValue("jobDescription", "") }} />
                                                            </Stack>
                                                        }

                                                    </Stack>
                                                </AccordionSummary>

                                                <AccordionDetails>

                                                    <Box sx={{
                                                        minWidth: '260px',
                                                        // p: 5
                                                    }} className={`${Boolean(isCRMEnabled) ? "d-none" : "d-block"}`}>
                                                        <MUIAutoComplete
                                                            id='jobTitle'
                                                            handleChange={(id: any, name: string) => {
                                                                communityFormik.setFieldValue('selectedJobId', id);
                                                                communityFormik.setFieldValue('selectedJobTitle', name);
                                                                // setTimeout(() => {
                                                                //     updateJobDetails(id, name);
                                                                // }, 120);
                                                                // setJobModalOpen(false);
                                                                // saveDataForm("", id);
                                                            }}
                                                            valuePassed={(communityFormik.values.selectedJobId) ? { label: communityFormik.values.selectedJobTitle, id: communityFormik.values.selectedJobId } : {}}
                                                            isMultiple={false}
                                                            textToShow="Select Job"
                                                            width="100%"
                                                            type='jobTitle'
                                                            placeholder=""
                                                            // placeholder="Enter Job Title"
                                                            refToPass={expanded === 'AImatchPanel' ? inputRef : null}
                                                        />
                                                    </Box>
                                                    <Grid
                                                        container
                                                        direction="row"
                                                        justifyContent="flex-end"
                                                        alignItems="center"
                                                        className={`${Boolean(isCRMEnabled) ? "d-none" : "d-flex"} mt-2`}
                                                    >
                                                        <Button color="primary"
                                                            variant='outlined'
                                                            startIcon={
                                                                <AutoAwesomeIcon className='' />
                                                            }
                                                            sx={{ height: '26px !important' }}
                                                            disabled={!Boolean(communityFormik.values.selectedJobId)}
                                                            onClick={
                                                                () => {
                                                                    setJobModalOpen(false);
                                                                    // setSelectedJobTitle({
                                                                    //     title: communityFormik.values.selectedJobTitle,
                                                                    //     id: communityFormik.values.selectedJobId
                                                                    // });
                                                                    updateJobDetails(communityFormik.values.selectedJobId, communityFormik.values.selectedJobTitle);
                                                                    searchSkillsFromDescription(communityFormik.values.selectedJobId, '');
                                                                    // getJobDescription(communityFormik.values.selectedJobId);
                                                                }
                                                            }>AI Search</Button>
                                                    </Grid>
                                                    <Box
                                                        sx={{ minWidth: '260px' }}
                                                    >

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
                                                            // maxRows={7}
                                                            rows={5}
                                                        />
                                                    </Box>
                                                    <Grid
                                                        container
                                                        direction="row"
                                                        justifyContent="flex-end"
                                                        alignItems="center"
                                                        className='mt-2'
                                                    >
                                                        <Button
                                                            color="primary"
                                                            variant='outlined'
                                                            startIcon={
                                                                <AutoAwesomeIcon className='' />
                                                            }
                                                            sx={{ height: '26px !important' }}
                                                            disabled={!Boolean(communityFormik.values.jobDescription)}
                                                            onClick={
                                                                () => {
                                                                    setDescModalOpen(false);
                                                                    searchSkillsFromDescription('', communityFormik.values.jobDescription);

                                                                    // communityFormik.setFieldValue('selectedJobId', "");
                                                                    // communityFormik.setFieldValue('selectedJobTitle', "");
                                                                    // setSelectedJobTitle({
                                                                    //     title: "",
                                                                    //     id: ""
                                                                    // });
                                                                }
                                                            }
                                                        >
                                                            AI Search
                                                        </Button>
                                                    </Grid>
                                                </AccordionDetails>
                                            </Accordion>
                                            :
                                            null
                                        }

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
                                                            <Chip label={communityFormik.values.keywords} deleteIcon={<CloseIcon />} className='selectedChips' onDelete={(e) => { e.stopPropagation(); communityFormik.setFieldValue("keywords", "") }} />
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
                                                        inputRef={expanded === 'keywordsPanel' ? inputRef : null}
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
                                                            communityFormik.values.jobTitles.reduce((count: any, obj: any) => obj.title ? ++count : count, 0) ?

                                                                <Stack
                                                                    className='clearStack'
                                                                    direction="row"
                                                                    justifyContent="space-around"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        // communityFormik.values.jobTitles.map((item, i) => remove(i));
                                                                        // values.jobTitles.map((item, i) => remove(i));
                                                                        communityFormik.setFieldValue("jobTitles", [{
                                                                            "title": "",
                                                                            "required": false
                                                                        }]);
                                                                    }}
                                                                >
                                                                    <CloseIcon />
                                                                    <Typography>
                                                                        {communityFormik.values.jobTitles.reduce((count: any, obj: any) => obj.title ? ++count : count, 0)}
                                                                    </Typography>
                                                                </Stack>
                                                                :
                                                                null
                                                        }
                                                    </Stack>
                                                    {(communityFormik.values.jobTitles.length > 0 && expanded !== 'jobTitlePanel' && communityFormik.values.jobTitles.some((jobtitle: any) => jobtitle.title)) &&
                                                        <Stack direction="row" mt={1} flexWrap="wrap">
                                                            <div className='filterLabelName'>Job Title:</div>

                                                            {communityFormik.values.jobTitles.map((jobTitle: any, index: number, jobTitlesArray: any[]) => (
                                                                jobTitle.title && (
                                                                    <Stack sx={{ pb: 0.5 }} key={`jobTitle-Stack-${index}`}>
                                                                        <Chip
                                                                            key={`jobTitle-chip-${index}`}
                                                                            label={jobTitle.title}
                                                                            onDelete={() => {
                                                                                const newJobTitles = communityFormik.values.jobTitles.filter((_: any, i: number) => i !== index);
                                                                                communityFormik.setFieldValue("jobTitles", jobTitlesArray.length === 1 ? [{
                                                                                    "title": "",
                                                                                    "required": false
                                                                                }] : newJobTitles);
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
                                                            communityFormik.values.jobTitles.map((jobtitle: any, index: number, jobTitlesArray: any[]) => (
                                                                <div key={`jobTitle${index}`}>
                                                                    <Tooltip title={jobtitle.title}>
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
                                                                            inputRef={expanded === 'jobTitlePanel' ? inputRef : null}
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
                                                                                        {
                                                                                            !userLocalData.isChromeExtensionEnabled() ?
                                                                                                <FormControlLabel
                                                                                                    control={
                                                                                                        <Checkbox
                                                                                                            id={`jobTitles.${index}.required`}
                                                                                                            name={`jobTitles.${index}.required`}
                                                                                                            checked={jobtitle.required}
                                                                                                            size='small'
                                                                                                            onChange={communityFormik.handleChange}
                                                                                                        />
                                                                                                    }
                                                                                                    label="Is Current"
                                                                                                />
                                                                                                :
                                                                                                null}
                                                                                        {((jobTitlesArray.length > 1) || ((jobTitlesArray.length === 1) && jobtitle.title)) ? <IconButton
                                                                                            // onClick={() => remove(index)}
                                                                                            onClick={() => {
                                                                                                (jobTitlesArray.length > 1) ?
                                                                                                    updateCommunityFormik('delete', "", 'jobTitles', index)
                                                                                                    :
                                                                                                    updateCommunityFormik('update', "", 'jobTitles', index)
                                                                                            }}
                                                                                            edge="end"
                                                                                        >
                                                                                            <CloseIcon className='closeIcon' />
                                                                                        </IconButton> : <IconButton disabled disableRipple />}
                                                                                    </InputAdornment>
                                                                                </div>
                                                                            }}
                                                                        />
                                                                    </Tooltip>
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
                                                            className='mb-2'
                                                            color="secondary"
                                                            startIcon={<AddIcon className="addIcon" />}
                                                            onClick={
                                                                () => {
                                                                    updateCommunityFormik('add', { title: "", required: false }, 'jobTitles', undefined, 'next');
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
                                                                                <Tooltip title={item.name}>
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
                                                                                                    const emptyIndex = communityFormik.values.jobTitles.findIndex((jobTitle: any) => !jobTitle.title);
                                                                                                    if (emptyIndex !== -1) {
                                                                                                        updateCommunityFormik('update', item.name, 'jobTitles', emptyIndex);
                                                                                                    } else {
                                                                                                        updateCommunityFormik('add', { title: item.name, required: false }, 'jobTitles');
                                                                                                    }
                                                                                                }, 200);

                                                                                            }
                                                                                        }
                                                                                    />
                                                                                </Tooltip>
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
                                                            communityFormik.values.skills.reduce((count: any, obj: any) => obj.skillName ? ++count : count, 0) || communityFormik.values.allSkills !== "" ? <Stack
                                                                className='clearStack'
                                                                direction="row"
                                                                justifyContent="space-around"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    communityFormik.setFieldValue("skills", [{
                                                                        "recentUse": false,
                                                                        "experLevel": "",
                                                                        "skillName": ""
                                                                    }]);
                                                                    communityFormik.setFieldValue("allSkills", "");
                                                                }}
                                                            >
                                                                <CloseIcon />
                                                                <Typography>
                                                                    {/* {communityFormik.values.skills.length ? 1 : 0} */}
                                                                    {communityFormik.values.skills.reduce((count: any, obj: any) => obj.skillName ? ++count : count, 0) +
                                                                        (communityFormik.values.allSkills !== "" ? 1 : 0)}
                                                                </Typography>
                                                            </Stack>
                                                                :
                                                                null
                                                        }
                                                    </Stack>

                                                    {(communityFormik.values.skills.length > 0 && expanded !== 'skillsPanel' && communityFormik.values.skills.some((skill: any) => skill.skillName)) &&
                                                        <Stack>
                                                            <Stack direction="row" mt={1} flexWrap="wrap">
                                                                <div className='filterLabelName'>Skills:</div>
                                                                {communityFormik.values.skills.map((skill: any, index: number, skillsArray: any[]) => (
                                                                    skill.skillName && (
                                                                        <Stack sx={{ pb: 0.5 }}>
                                                                            <Chip
                                                                                key={`skill-chip-${index}`}
                                                                                label={skill.skillName}
                                                                                onDelete={() => {
                                                                                    const newSkills = communityFormik.values.skills.filter((_: any, i: number) => i !== index);
                                                                                    communityFormik.setFieldValue("skills", skillsArray.length === 1 ? [{
                                                                                        "recentUse": false,
                                                                                        "experLevel": "",
                                                                                        "skillName": ""
                                                                                    }] : newSkills);
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
                                                            communityFormik.values.skills.map((skill: any, index: number, skillsArray: any[]) => (
                                                                <div className='' key={`skills${index}`}>
                                                                    <Tooltip title={skill.skillName}>
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
                                                                            inputRef={expanded === 'skillsPanel' ? inputRef : null}
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
                                                                                        {
                                                                                            !userLocalData.isChromeExtensionEnabled() ?
                                                                                                <FormControlLabel
                                                                                                    control={
                                                                                                        <Checkbox
                                                                                                            id={`skills.${index}.recentUse`}
                                                                                                            name={`skills.${index}.recentUse`}
                                                                                                            checked={skill.recentUse}
                                                                                                            size='small'
                                                                                                            onChange={communityFormik.handleChange}
                                                                                                        />
                                                                                                    }
                                                                                                    label="Is Recent"
                                                                                                />
                                                                                                :
                                                                                                null
                                                                                        }
                                                                                        {((skillsArray.length > 1) || ((skillsArray.length === 1) && skill.skillName)) ? <IconButton
                                                                                            // onClick={() => remove(index)}
                                                                                            onClick={() => {
                                                                                                (skillsArray.length > 1) ?
                                                                                                    updateCommunityFormik('delete', "", 'skills', index)
                                                                                                    :
                                                                                                    updateCommunityFormik('update', "", 'skills', index)
                                                                                            }}
                                                                                            edge="end"
                                                                                        >
                                                                                            <CloseIcon className='closeIcon' />
                                                                                        </IconButton> : <IconButton disabled disableRipple />}
                                                                                    </InputAdornment>
                                                                                </div>
                                                                            }}
                                                                        />
                                                                    </Tooltip>
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
                                                                        }, 'skills', undefined, 'next');
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
                                                                                    <Tooltip title={item.name}>
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
                                                                                    </Tooltip>
                                                                                )
                                                                            })
                                                                        }
                                                                    </div>
                                                                    :
                                                                    null
                                                            }
                                                        </Grid>
                                                        {
                                                            !userLocalData.isChromeExtensionEnabled() ?
                                                                <FormControl>
                                                                    <RadioGroup defaultValue="onlyOne" name="allSkills" id="allSkills" onChange={communityFormik.handleChange} value={communityFormik.values.allSkills}>
                                                                        <FormControlLabel className='mb-2' value="must" control={<Radio />} label="All Skills are required" />
                                                                        <FormControlLabel value="onlyOne" control={<Radio />} label="Only one of the skills is required" />
                                                                    </RadioGroup>
                                                                </FormControl>
                                                                :
                                                                null
                                                        }
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
                                                        {(communityFormik.values.location.city !== "" || communityFormik.values.location.state.length > 0 || communityFormik.values.location.zipCode !== "" || communityFormik.values.location.radius !== "") && <Stack
                                                            className='clearStack'
                                                            direction="row"
                                                            justifyContent="space-around"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                communityFormik.setFieldValue("location.city", "");
                                                                communityFormik.setFieldValue("location.state", "");
                                                                communityFormik.setFieldValue("location.zipCode", "");
                                                                communityFormik.setFieldValue("location.radius", "");
                                                                setIsLocationTypeRegion(undefined);
                                                            }}
                                                        >
                                                            <CloseIcon />
                                                            <Typography>
                                                                {(communityFormik.values.location.city !== "" ? 1 : 0) +
                                                                    (communityFormik.values.location.state.length ? 1 : 0) +
                                                                    (communityFormik.values.location.zipCode !== "" ? 1 : 0) +
                                                                    (communityFormik.values.location.radius !== "" ? 1 : 0)}
                                                            </Typography>
                                                        </Stack>
                                                        }
                                                    </Stack>
                                                    {(expanded !== 'locationPanel') &&
                                                        <Stack mt={1} flexWrap="wrap">

                                                            {communityFormik.values.location.city !== "" && (
                                                                <div className='mb-1'>
                                                                    <Typography className='filterLabelName'>City:</Typography>
                                                                    <Chip
                                                                        label={communityFormik.values.location.city}
                                                                        deleteIcon={<CloseIcon />}
                                                                        className='selectedChips'
                                                                        onDelete={() => {
                                                                            communityFormik.setFieldValue("location.city", "");
                                                                        }}
                                                                    />
                                                                </div>
                                                            )}

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
                                                                                        let tempStates = Array.isArray((communityFormik.values.location.state)) ? communityFormik.values.location.state : communityFormik.values.location.state.split(',');
                                                                                        tempStates = tempStates.filter((i: any) => i !== state);
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
                                                                                        tempStates = tempStates.filter((i: any) => i !== state);
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
                                            {/* <AccordionDetails>
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
                                                            refToPass={expanded === 'locationPanel' ? inputRef : null}

                                                        />
                                                        <Autocomplete //need to comment
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
                                                        />
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
                                            </AccordionDetails> */}
                                            <AccordionDetails>
                                                <Stack spacing={1}>

                                                    <Stack className={`location-select-container ${isLocationTypeRegion === true ? "location-select-active" : ""}`}>
                                                        <FormControlLabel label="Select Region"
                                                            control={<Checkbox disableRipple
                                                                checked={isLocationTypeRegion === true}
                                                                icon={<RadioButtonUnchecked />}
                                                                checkedIcon={<RadioButtonChecked />}
                                                                size='small'
                                                            />}
                                                            onClick={() => {
                                                                communityFormik.setFieldValue("location.zipCode", "");
                                                                communityFormik.setFieldValue("location.radius", "");
                                                                setIsLocationTypeRegion(true)
                                                            }}
                                                        />
                                                        <Collapse in={isLocationTypeRegion === true}>
                                                            <Stack spacing={1.25} my={1.5}>
                                                                <TextField
                                                                    id={`location.city`}
                                                                    name={`location.city`}
                                                                    label="City"
                                                                    placeholder='Enter City'
                                                                    fullWidth
                                                                    variant="outlined"
                                                                    size="small"
                                                                    value={communityFormik.values.location.city}
                                                                    onChange={communityFormik.handleChange}
                                                                />
                                                                <FormControl fullWidth>
                                                                    <MUIAutoComplete
                                                                        id="location.state"
                                                                        handleChange={(id: any, _: string) => {
                                                                            communityFormik.setFieldValue('location.state', id);
                                                                            // console.log(id);
                                                                        }}
                                                                        valuePassed={
                                                                            Array.isArray((communityFormik.values.location.state)) ?
                                                                                { label: getStateById(communityFormik.values.location.state.join()), id: communityFormik.values.location.state.join() }
                                                                                :
                                                                                (communityFormik.values.location.state) ?
                                                                                    { label: getStateById(communityFormik.values.location.state), id: communityFormik.values.location.state }
                                                                                    :
                                                                                    {}
                                                                        }
                                                                        isMultiple={false}
                                                                        // width="200px"
                                                                        type='states'
                                                                        placeholder="Select the states"
                                                                        refToPass={expanded === 'locationPanel' ? inputRef : null}

                                                                    />
                                                                </FormControl>
                                                            </Stack>
                                                        </Collapse>

                                                    </Stack>


                                                    <Stack className={`location-select-container ${isLocationTypeRegion === false ? "location-select-active" : ""}`}>
                                                        <FormControlLabel label="Select ZIP code radius"
                                                            control={<Checkbox disableRipple
                                                                checked={isLocationTypeRegion === false}
                                                                icon={<RadioButtonUnchecked />}
                                                                checkedIcon={<RadioButtonChecked />}
                                                                size='small'
                                                            />}
                                                            onClick={() => {
                                                                communityFormik.setFieldValue("location.city", "");
                                                                communityFormik.setFieldValue("location.state", "");
                                                                setIsLocationTypeRegion(false)
                                                            }}
                                                        />

                                                        <Collapse in={isLocationTypeRegion === false}>
                                                            <Stack spacing={1.25} my={1.5}>
                                                                <TextField
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
                                                                    select
                                                                    fullWidth
                                                                    id={`location.radius`}
                                                                    variant="outlined"
                                                                    type="number"
                                                                    size="small"
                                                                    label='Radius'
                                                                    placeholder='In Miles'
                                                                    name={`location.radius`}
                                                                    value={communityFormik.values.location.radius}
                                                                    onChange={communityFormik.handleChange} >
                                                                    <MenuItem value="5">within 5 miles</MenuItem>
                                                                    <MenuItem value="10">within 10 miles</MenuItem>
                                                                    <MenuItem value="20">within 20 miles</MenuItem>
                                                                    <MenuItem value="30">within 30 miles</MenuItem>
                                                                    <MenuItem value="40">within 40 miles</MenuItem>
                                                                    <MenuItem value="50">within 50 miles</MenuItem>
                                                                    <MenuItem value="75">within 75 miles</MenuItem>
                                                                    <MenuItem value="100">within 100 miles</MenuItem>
                                                                </TextField>
                                                            </Stack>
                                                        </Collapse>

                                                    </Stack>

                                                </Stack>
                                            </AccordionDetails>
                                        </Accordion>

                                        {userLocalData.adminSettings(ID_SETTINGS_SOVREN) && !isCRMEnabled && !userLocalData.isChromeExtensionEnabled() ?
                                            <Accordion disableGutters square expanded={expanded === 'workAuthPanel'} onChange={handleAccordionChange('workAuthPanel')}>
                                                <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                                                    <Stack sx={{ width: '100%' }}>
                                                        <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                            <Stack direction="row" alignItems="center">

                                                                <Typography>Work Authorization</Typography>
                                                            </Stack>
                                                            {(communityFormik.values.workAuthorization.auth_in_US !== "" ||
                                                                communityFormik.values.workAuthorization.Req_visa_sponsorship !== "") ? <Stack
                                                                    className='clearStack'
                                                                    direction="row"
                                                                    justifyContent="space-around"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        // communityFormik.setFieldValue("workAuthorization.title", "");
                                                                        communityFormik.setFieldValue("workAuthorization.auth_in_US", "");
                                                                        communityFormik.setFieldValue("workAuthorization.Req_visa_sponsorship", "");
                                                                    }}
                                                                >
                                                                <CloseIcon />
                                                                <Typography>
                                                                    {(communityFormik.values.workAuthorization.auth_in_US !== "" ? 1 : 0) +
                                                                        (communityFormik.values.workAuthorization.Req_visa_sponsorship !== "" ? 1 : 0)}
                                                                </Typography>
                                                            </Stack>
                                                                :
                                                                null
                                                            }
                                                        </Stack>
                                                        {(expanded !== 'workAuthPanel') &&
                                                            <><Stack direction="row">
                                                                {communityFormik.values.workAuthorization.auth_in_US !== "" && (
                                                                    <div className='mb-1'>
                                                                        <Typography className='filterLabelName'>Legally Authorized:</Typography>
                                                                        <Chip
                                                                            label={(communityFormik.values.workAuthorization.auth_in_US === "1") ? "Yes" : (communityFormik.values.workAuthorization.auth_in_US === "2") ? "No" : ""}
                                                                            deleteIcon={<CloseIcon />}
                                                                            className='selectedChips'
                                                                            onDelete={() => {
                                                                                communityFormik.setFieldValue("workAuthorization.auth_in_US", "");
                                                                            }} />
                                                                    </div>
                                                                )}
                                                            </Stack><Stack direction="row">
                                                                    {communityFormik.values.workAuthorization.Req_visa_sponsorship !== "" && (
                                                                        <div className='mb-1'>
                                                                            <Typography className='filterLabelName'>Require a visa sponsorship:</Typography>
                                                                            <Chip
                                                                                label={(communityFormik.values.workAuthorization.Req_visa_sponsorship === "1") ? "Yes" : (communityFormik.values.workAuthorization.Req_visa_sponsorship === "2") ? "No" : ""}
                                                                                deleteIcon={<CloseIcon />}
                                                                                className='selectedChips'
                                                                                onDelete={() => {
                                                                                    communityFormik.setFieldValue("workAuthorization.Req_visa_sponsorship", "");
                                                                                }} />
                                                                        </div>
                                                                    )}
                                                                </Stack></>
                                                        }
                                                    </Stack>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <div>
                                                        <FormControl fullWidth className='mt-3'>
                                                            {/* <label className='inputLabel mt-2'>Are you legally authorized to work in U.S</label> */}
                                                            <TextField fullWidth
                                                                select
                                                                size="small"
                                                                defaultValue={2}
                                                                id="auth_in_US"
                                                                name='auth_in_US'
                                                                className='mt-1'
                                                                value={communityFormik.values.workAuthorization.auth_in_US}
                                                                onChange={(e) => {
                                                                    communityFormik.setFieldValue("workAuthorization.auth_in_US", e.target.value);
                                                                }}
                                                                label="Legally authorized to work in US"
                                                            >
                                                                <MenuItem value="1"> Yes </MenuItem>
                                                                <MenuItem value="2"> No </MenuItem>
                                                            </TextField>

                                                        </FormControl>
                                                        <FormControl fullWidth className='mt-3'>
                                                            <TextField fullWidth
                                                                select
                                                                size="small"
                                                                defaultValue={2}
                                                                id="Req_visa_sponsorship"
                                                                name='Req_visa_sponsorship'
                                                                className='mt-1'
                                                                value={communityFormik.values.workAuthorization.Req_visa_sponsorship}
                                                                onChange={(e) => {
                                                                    communityFormik.setFieldValue("workAuthorization.Req_visa_sponsorship", e.target.value);
                                                                }}
                                                                label='Require a visa sponsorship'
                                                            >
                                                                <MenuItem value="1"> Yes </MenuItem>
                                                                <MenuItem value="2"> No </MenuItem>
                                                            </TextField>

                                                        </FormControl>
                                                    </div>
                                                </AccordionDetails>
                                            </Accordion>
                                            :
                                            null
                                        }

                                        {
                                            talentPoolId === "" &&
                                                isHighVolumeHiringSettingEnabled && userLocalData.adminSettings(ID_SETTINGS_TALENTPOOL) ?
                                                <Accordion disableGutters square expanded={expanded === 'talentPoolPanel'} onChange={handleAccordionChange('talentPoolPanel')}>
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
                                                                {(communityFormik.values.talentPoolId !== "") && <Stack
                                                                    className='clearStack'
                                                                    direction="row"
                                                                    justifyContent="space-around"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        communityFormik.setFieldValue("talentPoolId", "");
                                                                        communityFormik.setFieldValue("talentPoolName", "")
                                                                    }}
                                                                >
                                                                    <CloseIcon />
                                                                    <Typography>
                                                                        {communityFormik.values.talentPoolId !== "" ? 1 : 0}
                                                                    </Typography>
                                                                </Stack>
                                                                }
                                                            </Stack>
                                                            {(expanded !== 'talentPoolPanel') &&
                                                                <Stack mt={1} flexWrap="wrap">
                                                                    {communityFormik.values.talentPoolId && <div className='mb-1'>
                                                                        <Typography className='filterLabelName'>Talent Pool:</Typography>
                                                                        <Chip label={communityFormik.values.talentPoolName} deleteIcon={<CloseIcon />} className='selectedChips' onDelete={
                                                                            (event) => {
                                                                                event.stopPropagation();
                                                                                communityFormik.setFieldValue("talentPoolId", "");
                                                                                communityFormik.setFieldValue("talentPoolName", "")
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
                                                                refToPass={expanded === 'talentPoolPanel' ? inputRef : null}
                                                            />
                                                        </FormControl>
                                                    </AccordionDetails>
                                                </Accordion>
                                                : null
                                        }

                                        <Accordion disableGutters square expanded={expanded === 'tagPanel'} onChange={handleAccordionChange('tagPanel')}>
                                            <AccordionSummary
                                                expandIcon={<ArrowDropDownIcon />}
                                                aria-controls="tagPanel-content"
                                                id="tagPanel-header"
                                            >
                                                <Stack sx={{ width: '100%' }}>
                                                    <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                        <Stack direction="row" alignItems="center">

                                                            <Typography>Tag</Typography>
                                                        </Stack>
                                                        {(communityFormik.values.tagId.length > 0) && <Stack
                                                            className='clearStack'
                                                            direction="row"
                                                            justifyContent="space-around"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                communityFormik.setFieldValue("tagId", "");
                                                                communityFormik.setFieldValue("tagName", "");
                                                            }}
                                                        >
                                                            <CloseIcon />
                                                            <Typography>
                                                                {communityFormik.values.tagId.length ? tagNameCounts : 0}
                                                            </Typography>
                                                        </Stack>
                                                        }
                                                    </Stack>
                                                    {(expanded !== 'tagPanel') &&
                                                        <Stack direction="row" mt={1} flexWrap="wrap">
                                                            {communityFormik.values.tagId.length > 0 &&
                                                                <>
                                                                    <div className='filterLabelName'>Tags:</div>
                                                                    {
                                                                        communityFormik.values.tagId.split(',').map((tag: any, index: number) => (
                                                                            tag && (
                                                                                <Stack sx={{ pb: 0.5 }}>
                                                                                    <Chip
                                                                                        key={`tag-chip-${tag}`}
                                                                                        label={communityFormik.values.tagName.split(',')[index]}
                                                                                        onDelete={() => {
                                                                                            const tagIds = communityFormik.values.tagId.split(',').filter((_: any, i: number) => i !== index).join(',');
                                                                                            const tagNames = communityFormik.values.tagName.split(',').filter((_: any, i: number) => i !== index).join(',');
                                                                                            communityFormik.setFieldValue("tagId", tagIds);
                                                                                            communityFormik.setFieldValue("tagName", tagNames);
                                                                                        }}
                                                                                        deleteIcon={<CloseIcon />}
                                                                                        className='selectedChips'
                                                                                    />
                                                                                </Stack>
                                                                            )
                                                                        ))}
                                                                </>
                                                            }
                                                        </Stack>
                                                    }
                                                </Stack>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <FormControl fullWidth>
                                                    <MUIAutoComplete
                                                        id='tagId'
                                                        handleChange={(id: any, name: string) => {
                                                            communityFormik.setFieldValue('tagId', id);
                                                            communityFormik.setFieldValue('tagName', name);
                                                        }}
                                                        valuePassed={(communityFormik.values.tagId) ? { label: communityFormik.values.tagName, id: communityFormik.values.tagId } : {}}
                                                        isMultiple={true}
                                                        textToShow="Select Tag"
                                                        width="100%"
                                                        type='tag'
                                                        placeholder="Search Tag"
                                                        refToPass={expanded === 'tagPanel' ? inputRef : null}
                                                    />
                                                </FormControl>
                                            </AccordionDetails>
                                        </Accordion>


                                        <Accordion disableGutters square expanded={expanded === 'employerPanel'} onChange={handleAccordionChange('employerPanel')}>
                                            <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                                                <Stack sx={{ width: '100%' }}>
                                                    <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                        <Stack direction="row" alignItems="center">

                                                            <Typography>Employer</Typography>
                                                        </Stack>
                                                        {/* (((communityFormik.values.employer.length === 1) && (communityFormik.values.employer[0].employerName)) || (communityFormik.values.employer.length > 1)) &&  */}
                                                        {
                                                            communityFormik.values.employer.reduce((count: any, obj: any) => obj.employerName ? ++count : count, 0) ?
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
                                                                        {communityFormik.values.employer.reduce((count: any, obj: any) => obj.employerName ? ++count : count, 0)}
                                                                    </Typography>
                                                                </Stack>
                                                                :
                                                                null
                                                        }
                                                    </Stack>
                                                    {expanded !== 'employerPanel' && communityFormik.values.employer.length > 0 &&
                                                        communityFormik.values.employer.some((certification: any) => certification.employerName) &&
                                                        <Stack direction="row" mt={1} flexWrap="wrap">
                                                            <div className='filterLabelName'>Employer:</div>
                                                            {communityFormik.values.employer.map((employer: any, index: number) => (
                                                                employer.employerName && (

                                                                    <Stack sx={{ pb: 0.5 }}>

                                                                        <Chip
                                                                            key={`employer-chip-${index}`}
                                                                            label={employer.employerName}
                                                                            onDelete={() => {
                                                                                const newEmployers = communityFormik.values.employer.filter((_: any, i: number) => i !== index);
                                                                                communityFormik.setFieldValue("employer", newEmployers.length ? newEmployers : [{ employerName: "" }]);
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
                                                            communityFormik.values.employer.map((employer: any, index: number) => (
                                                                <div key={`employer${index}`}>
                                                                    <TextField
                                                                        className={`mt-2`}
                                                                        key={`employer${index}`}
                                                                        fullWidth
                                                                        id={`employer.${index}.employerName`}
                                                                        variant="outlined"
                                                                        type="text"
                                                                        size="small"
                                                                        placeholder='Employer/Company Name'
                                                                        name={`employer.${index}.employerName`}
                                                                        value={employer.employerName}
                                                                        onChange={communityFormik.handleChange}
                                                                        inputRef={expanded === 'employerPanel' ? inputRef : null}
                                                                        InputProps={{
                                                                            endAdornment: (
                                                                                <InputAdornment position="end">
                                                                                    {((communityFormik.values.employer.length > 1) || ((communityFormik.values.employer.length === 1) && employer.employerName)) ? <IconButton
                                                                                        onClick={() => {
                                                                                            (communityFormik.values.employer.length > 1) ?
                                                                                                updateCommunityFormik('delete', "", 'employer', index)
                                                                                                :
                                                                                                updateCommunityFormik('update', "", 'employer', index)
                                                                                        }}
                                                                                        edge="end"
                                                                                    >
                                                                                        <CloseIcon className='closeIcon' />
                                                                                    </IconButton> : <IconButton disabled disableRipple />}
                                                                                </InputAdornment>
                                                                            )
                                                                        }}
                                                                    />
                                                                </div>
                                                            ))
                                                        ) : null}
                                                        <Grid container direction="row" justifyContent="flex-end" alignItems="center" className='mt-2'>
                                                            <Button variant="outlined" color="secondary" startIcon={<AddIcon className="addIcon" />}
                                                                onClick={() => { updateCommunityFormik('add', { employerName: "" }, 'employer') }}
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
                                                                communityFormik.values.schools.reduce((count: any, obj: any) => obj.schoolName ? ++count : count, 0) ||
                                                                communityFormik.values.degrees.reduce((count: any, obj: any) => obj.degreeName ? ++count : count, 0)) ?
                                                                <Stack
                                                                    className='clearStack'
                                                                    direction="row"
                                                                    justifyContent="space-around"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        communityFormik.values.degTypes.length > 0 && communityFormik.setFieldValue("degTypes", []);
                                                                        communityFormik.values.IsTopStudent === true && communityFormik.setFieldValue("IsTopStudent", false);
                                                                        communityFormik.values.IsRecentGraduate === true && communityFormik.setFieldValue("IsRecentGraduate", false);
                                                                        communityFormik.values.IsCurrentStudent === true && communityFormik.setFieldValue("IsCurrentStudent", false);
                                                                        communityFormik.values.schools.length > 0 && communityFormik.setFieldValue("schools", []);
                                                                        communityFormik.values.degrees.length > 0 && communityFormik.setFieldValue("degrees", [{ degreeName: "" }])

                                                                            ;
                                                                    }}
                                                                >
                                                                    <CloseIcon />
                                                                    <Typography>
                                                                        {(communityFormik.values.degTypes.length > 0 ? 1 : 0) +
                                                                            (communityFormik.values.IsTopStudent === true ||
                                                                                communityFormik.values.IsRecentGraduate === true ||
                                                                                communityFormik.values.IsCurrentStudent === true ? 1 : 0) +
                                                                            communityFormik.values.schools.reduce((count: any, obj: any) => obj.schoolName ? ++count : count, 0) +
                                                                            communityFormik.values.degrees.reduce((count: any, obj: any) => obj.degreeName ? ++count : count, 0)}
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
                                                                {communityFormik.values.degTypes.map((degType: any, index: number) => (
                                                                    <Grid >
                                                                        <Chip
                                                                            key={`degType-chip-${index}`}
                                                                            label={degType}

                                                                            onDelete={() => {
                                                                                const newDegTypes = communityFormik.values.degTypes.filter((_: any, i: number) => i !== index);
                                                                                communityFormik.setFieldValue("degTypes", newDegTypes);
                                                                            }}
                                                                            deleteIcon={<CloseIcon />}
                                                                            className='selectedChips'
                                                                            style={{ margin: '4px' }}
                                                                        />
                                                                    </Grid>
                                                                ))}
                                                            </Grid>}
                                                            { /*<Grid container spacing={0} className={`${(communityFormik.values.IsTopStudent || communityFormik.values.IsRecentGraduate || communityFormik.values.IsCurrentStudent) ? 'mt-3' : ''}`}>
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
                                                            </Grid> */}
                                                            <Grid container spacing={0} className={`${(communityFormik.values.schools.reduce((count: any, obj: any) => obj.schoolName ? ++count : count, 0)) ? 'mt-3' : ''}`}>
                                                                {communityFormik.values.schools.some((school: any) => school.schoolName) && <>
                                                                    <Grid className='filterLabelName m-1'>School:</Grid>
                                                                    {communityFormik.values.schools.map((school: any, index: number) => (
                                                                        school.schoolName && (
                                                                            <Grid >
                                                                                <Chip
                                                                                    key={`school-chip-${index}`}
                                                                                    label={school.schoolName}
                                                                                    onDelete={() => {
                                                                                        const newSchools = communityFormik.values.schools.filter((_: any, i: number) => i !== index);
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
                                                            <Grid container spacing={0} className={`${(communityFormik.values.degrees.reduce((count: any, obj: any) => obj.degreeName ? ++count : count, 0)) ? 'mt-3' : ''}`}>

                                                                {communityFormik.values.degrees.some((degree: any) => degree.degreeName) && <>
                                                                    <Grid className='filterLabelName m-1'>Degrees:</Grid>
                                                                    {communityFormik.values.degrees.map((degree: any, index: number) => (
                                                                        degree.degreeName && (
                                                                            <Grid >
                                                                                <Chip
                                                                                    key={`degree-chip-${index}`}
                                                                                    label={degree.degreeName}
                                                                                    onDelete={() => {
                                                                                        const newDegrees = communityFormik.values.degrees.filter((_: any, i: number) => i !== index);
                                                                                        communityFormik.setFieldValue("degrees", newDegrees.length ? newDegrees : [{ degreeName: "" }]);
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
                                                    <Typography variant="body2" className='fw-6'>Degree Type:</Typography>
                                                    <FormControl fullWidth sx={{ mt: 1 }}>
                                                        {/* {
                                                                    communityFormik.values.degTypes.length ?
                                                                        null
                                                                        :
                                                                        
                                                                } */}
                                                        {/* <InputLabel shrink>Degree Type</InputLabel> */}
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
                                                        // label='Degree Type'



                                                        >

                                                            {DEGREE_TYPES.map((deg) => (
                                                                <MenuItem key={deg.value} value={deg.text}>
                                                                    <Checkbox checked={communityFormik.values.degTypes.indexOf(deg.text) > -1} />
                                                                    <ListItemText primary={deg.text} />
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>

                                                    <Box sx={{ mt: 2, display: 'none' }} >

                                                        <FormControlLabel control={<Checkbox name="IsTopStudent" onChange={communityFormik.handleChange} value={communityFormik.values.IsTopStudent} />} label="Show Only Top Students" />
                                                        <FormControlLabel control={<Checkbox name="IsRecentGraduate" onChange={communityFormik.handleChange} value={communityFormik.values.IsRecentGraduate} />} label="Show Only Students That Graduated Within The Last Year" />
                                                        <FormControlLabel control={<Checkbox name="IsCurrentStudent" onChange={communityFormik.handleChange} value={communityFormik.values.IsCurrentStudent} />} label="Show Only Current Students" />
                                                    </Box>

                                                    <Typography sx={{ display: 'none' }} variant="body2" gutterBottom mt={3}>Schools:</Typography>
                                                    {/* <FieldArray
                                                name="schools"
                                                render={
                                                    ({ insert, remove, push }) => ()}
                                            /> */}
                                                    <div style={{ display: 'none' }}>
                                                        {communityFormik.values.schools && communityFormik.values.schools.map((school: any, index: number) => (
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


                                                    <Typography variant="body2" className='fw-6' mt={3}>Degrees:</Typography>
                                                    {/* <FieldArray
                                                name="degrees"
                                                render={
                                                    ({ insert, remove, push }) => ()}
                                            /> */}
                                                    <div>
                                                        {
                                                            communityFormik.values.degrees && communityFormik.values.degrees.map((degree: any, index: number) => (
                                                                <TextField
                                                                    key={`degrees${index}`}
                                                                    fullWidth
                                                                    className="mt-2"
                                                                    id={`degrees.${index}.degreeName`}
                                                                    variant="outlined"
                                                                    type="text"
                                                                    size="small"
                                                                    // placeholder='Degree Name'
                                                                    name={`degrees.${index}.degreeName`}
                                                                    value={degree.degreeName}
                                                                    onChange={communityFormik.handleChange}
                                                                    InputProps={{
                                                                        endAdornment: (
                                                                            <InputAdornment position="end">
                                                                                {/* <IconButton onClick={() => updateCommunityFormik('delete', '', 'degrees', index)} edge="end">
                                                                                    <CloseIcon className='closeIcon' />
                                                                                </IconButton> */}
                                                                                {((communityFormik.values.degrees.length > 1) || ((communityFormik.values.degrees.length === 1) && degree.degreeName)) ? <IconButton
                                                                                    onClick={() => {
                                                                                        (communityFormik.values.degrees.length > 1) ?
                                                                                            updateCommunityFormik('delete', "", 'degrees', index)
                                                                                            :
                                                                                            updateCommunityFormik('update', "", 'degrees', index)
                                                                                    }}
                                                                                    edge="end"
                                                                                >
                                                                                    <CloseIcon className='closeIcon' />
                                                                                </IconButton> : <IconButton disabled disableRipple />}
                                                                            </InputAdornment>
                                                                        )
                                                                    }}
                                                                />
                                                            ))
                                                        }
                                                        <Grid container direction="row" justifyContent="flex-end" alignItems="center" className='mt-2'>
                                                            <Button variant="outlined" color="secondary" startIcon={<AddIcon className="addIcon" />}
                                                                onClick={() => updateCommunityFormik('add', { degreeName: "" }, 'degrees')}
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
                                                                //defaultValue=""
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
                                        <Accordion disableGutters square expanded={expanded === 'experiencePanel'} onChange={handleAccordionChange('experiencePanel')} className={`${userLocalData.isChromeExtensionEnabled() ? 'd-none' : ''}`}>
                                            <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                                                <Stack sx={{ width: '100%' }}>
                                                    <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                        <Stack direction="row" alignItems="center">
                                                            <Typography>Experience</Typography>
                                                        </Stack>
                                                        {(communityFormik.values.minExp || communityFormik.values.maxExp || communityFormik.values.minManExp || communityFormik.values.maxManExp) && <Stack
                                                            className='clearStack'
                                                            direction="row"
                                                            justifyContent="space-around"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                communityFormik.setFieldValue("minExp", "");
                                                                communityFormik.setFieldValue("maxExp", "");
                                                                communityFormik.setFieldValue("minManExp", "");
                                                                communityFormik.setFieldValue("maxManExp", "");
                                                            }}
                                                        >
                                                            <CloseIcon />
                                                            <Typography>
                                                                {
                                                                    ((communityFormik.values.minExp || communityFormik.values.maxExp) ? 1 : 0) +
                                                                    ((communityFormik.values.minManExp || communityFormik.values.maxManExp) ? 1 : 0)
                                                                }
                                                            </Typography>
                                                        </Stack>
                                                        }
                                                    </Stack>
                                                    {(expanded !== 'experiencePanel') &&
                                                        <Stack mt={1} flexWrap="wrap">
                                                            {(communityFormik.values.minExp || communityFormik.values.maxExp) && <div className='mb-1'>
                                                                <Typography className='filterLabelName'>Total Work Experience:</Typography>
                                                                <Chip label={`${communityFormik.values.minExp && communityFormik.values.maxExp ? communityFormik.values.minExp + ' - ' + communityFormik.values.maxExp : communityFormik.values.minExp ? communityFormik.values.minExp : communityFormik.values.maxExp}`} deleteIcon={<CloseIcon />} className='selectedChips'
                                                                    onDelete={(e) => {
                                                                        e.stopPropagation();
                                                                        communityFormik.setFieldValue("minExp", "");
                                                                        communityFormik.setFieldValue("maxExp", "");
                                                                    }}
                                                                />
                                                            </div>}
                                                            {(communityFormik.values.minManExp || communityFormik.values.maxManExp) && <div className='mb-1'>
                                                                <Typography className='filterLabelName'>Management Experience:</Typography>
                                                                <Chip label={`${communityFormik.values.minManExp && communityFormik.values.maxManExp ? communityFormik.values.minManExp + ' - ' + communityFormik.values.maxManExp : communityFormik.values.minManExp ? communityFormik.values.minManExp : communityFormik.values.maxManExp}`} deleteIcon={<CloseIcon />} className='selectedChips'
                                                                    onDelete={(e) => {
                                                                        e.stopPropagation();
                                                                        communityFormik.setFieldValue("minManExp", "");
                                                                        communityFormik.setFieldValue("maxManExp", "");
                                                                    }}
                                                                />
                                                            </div>}
                                                        </Stack>
                                                    }
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
                                                                inputRef={expanded === 'experiencePanel' ? inputRef : null}
                                                                InputProps={{
                                                                    inputProps: {
                                                                        min: 0
                                                                    }
                                                                }}
                                                                onChange={communityFormik.handleChange}
                                                                onBlur={() => {
                                                                    const min = Number(communityFormik.values.minExp);
                                                                    const max = Number(communityFormik.values.maxExp);
                                                                    if (min && max && min > max) {
                                                                        // communityFormik.setFieldError('minExp', "Minimum PayRate should be less than Maximum");
                                                                        // showToaster('Max Exp must be greater than Min Exp.', 'error');
                                                                        showToaster('Max Work Experience must be greater than Min Work Experience.', 'error');
                                                                    }
                                                                }}
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
                                                                onBlur={() => {
                                                                    const min = Number(communityFormik.values.minExp);
                                                                    const max = Number(communityFormik.values.maxExp);
                                                                    if (max && min && max < min) {
                                                                        // communityFormik.setFieldError('maxExp', "Maximum maxExp should be greater than Minimum");
                                                                        // showToaster('Max Exp must be greater than Min Exp.', 'error');
                                                                        showToaster('Max Work Experience must be greater than Min Work Experience.', 'error');
                                                                    }
                                                                }}
                                                            />
                                                        </Stack>
                                                        <Grid container spacing={2} direction="row" justifyContent="start" alignItems="flex-start">
                                                            {
                                                                typeof communityFormik.errors.minExp === 'string' ?
                                                                    <Grid size={12}><Typography variant="caption" color="error">{communityFormik.errors.minExp}</Typography></Grid>
                                                                    :
                                                                    typeof communityFormik.errors.maxExp === 'string' ?
                                                                        <Grid size={12}> <Typography variant="caption" color="error">{communityFormik.errors.maxExp}</Typography></Grid>
                                                                        :
                                                                        null
                                                            }
                                                        </Grid>
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
                                                                onBlur={() => {
                                                                    const min = Number(communityFormik.values.minManExp);
                                                                    const max = Number(communityFormik.values.maxManExp);
                                                                    if (min && max && min > max) {
                                                                        // communityFormik.setFieldError('minManExp', "Minimum Management Experience should be less than Maximum");
                                                                        showToaster('Max Management Experience must be greater than Min Management Experience.', 'error');

                                                                    }
                                                                }}
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
                                                                onBlur={() => {
                                                                    const min = Number(communityFormik.values.minManExp);
                                                                    const max = Number(communityFormik.values.maxManExp);
                                                                    if (max && min && max < min) {
                                                                        // communityFormik.setFieldError('maxManExp', "Maximum Management Experience  should be greater than Minimum");
                                                                        showToaster('Max Management Experience must be greater than Min Management Experience.', 'error');
                                                                    }
                                                                }}
                                                            />
                                                        </Stack>
                                                        <Grid container spacing={2} direction="row" justifyContent="start" alignItems="flex-start">
                                                            {
                                                                typeof communityFormik.errors.minManExp === 'string' ?
                                                                    <Grid size={12}><Typography variant="caption" color="error">{communityFormik.errors.minManExp}</Typography></Grid>
                                                                    :
                                                                    typeof communityFormik.errors.maxManExp === 'string' ?
                                                                        <Grid size={12}> <Typography variant="caption" color="error">{communityFormik.errors.maxManExp}</Typography></Grid>
                                                                        :
                                                                        null
                                                            }
                                                        </Grid>
                                                    </CardContent>
                                                </Card>
                                            </AccordionDetails>
                                        </Accordion>
                                        {
                                            !userLocalData.isChromeExtensionEnabled() ?
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
                                                                    communityFormik.values.certifications.reduce((count: any, obj: any) => obj.certificationName ? ++count : count, 0) ?
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
                                                                                {communityFormik.values.certifications.reduce((count: any, obj: any) => obj.certificationName ? ++count : count, 0)}
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
                                                            {expanded !== 'certificationsPanel' && communityFormik.values.certifications.length > 0 && communityFormik.values.certifications.some((certification: any) => certification.certificationName) &&
                                                                <Stack mt={1} direction={"row"} flexWrap="wrap"  >
                                                                    <div className='filterLabelName'>Certification:</div>
                                                                    {communityFormik.values.certifications.map((certification: any, index: number) => (
                                                                        certification.certificationName && (
                                                                            <Stack pb={0.5} >
                                                                                <Chip
                                                                                    key={`certification-chip-${index}`}
                                                                                    label={certification.certificationName}
                                                                                    onDelete={() => {
                                                                                        const newCertifications = communityFormik.values.certifications.filter((_: any, i: number) => i !== index);
                                                                                        communityFormik.setFieldValue("certifications", newCertifications.length ? newCertifications : [{ certificationName: "" }]);
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
                                                            {communityFormik.values.certifications.map((certification: any, index: number) => (
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
                                                                    inputRef={expanded === 'certificationsPanel' ? inputRef : null}
                                                                    InputProps={{
                                                                        endAdornment: <div>
                                                                            <InputAdornment position="end">
                                                                                {((communityFormik.values.certifications.length > 1) || ((communityFormik.values.certifications.length === 1) && certification.certificationName)) ? <IconButton
                                                                                    onClick={() => {
                                                                                        (communityFormik.values.certifications.length > 1) ?
                                                                                            updateCommunityFormik('delete', "", 'certifications', index)
                                                                                            :
                                                                                            updateCommunityFormik('update', "", 'certifications', index)
                                                                                    }}
                                                                                    edge="end"
                                                                                >
                                                                                    <CloseIcon className='closeIcon' />
                                                                                </IconButton> : <IconButton disabled disableRipple />}
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
                                                :
                                                null
                                        }
                                        {
                                            isHighVolumeHiringSettingEnabled && !userLocalData.isChromeExtensionEnabled() ?
                                                <Accordion disableGutters square expanded={expanded === 'preferencePanel'} onChange={handleAccordionChange('preferencePanel')} className={`${(userLocalData.adminSettings(ID_SETTINGS_SOVREN) && Boolean(isCRMEnabled)) ? "d-none" : "d-block"}`}>
                                                    <AccordionSummary expandIcon={<ArrowDropDownIcon />}
                                                        aria-controls="preferencePanel-content"
                                                        id="preferencePanel-header">
                                                        <Stack sx={{ width: '100%' }}>
                                                            <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                                <Stack direction="row" alignItems="center">
                                                                    <Typography>Preference</Typography>
                                                                </Stack>
                                                                {(communityFormik.values.preference.EmpAvailabilityStatus !== "" ||
                                                                    communityFormik.values.preference.EmpJobPref !== "" ||
                                                                    communityFormik.values.preference.EmpLocPref !== "" ||
                                                                    communityFormik.values.preference.EmpWorkHoursPref !== "" ||
                                                                    // communityFormik.values.preference.auth_in_US !== "" ||
                                                                    // communityFormik.values.preference.Req_visa_sponsorship !== "" ||
                                                                    communityFormik.values.preference.CurrentEmpStatus !== "") ?
                                                                    <Stack
                                                                        className='clearStack'
                                                                        direction="row"
                                                                        justifyContent="space-around"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            communityFormik.setFieldValue("preference.EmpAvailabilityStatus", "");
                                                                            communityFormik.setFieldValue("preference.EmpJobPref", "");
                                                                            communityFormik.setFieldValue("preference.EmpLocPref", "");
                                                                            communityFormik.setFieldValue("preference.EmpWorkHoursPref", "");
                                                                            // communityFormik.setFieldValue("preference.auth_in_US", "");
                                                                            // communityFormik.setFieldValue("preference.Req_visa_sponsorship", "");
                                                                            communityFormik.setFieldValue("preference.CurrentEmpStatus", "");
                                                                        }}
                                                                    >
                                                                        <CloseIcon />
                                                                        <Typography>
                                                                            {(communityFormik.values.preference.EmpAvailabilityStatus !== "" ? 1 : 0) +
                                                                                (communityFormik.values.preference.EmpJobPref !== "" ? 1 : 0) +
                                                                                (communityFormik.values.preference.EmpLocPref !== "" ? 1 : 0) +
                                                                                (communityFormik.values.preference.EmpWorkHoursPref !== "" ? 1 : 0) +
                                                                                // (communityFormik.values.preference.auth_in_US !== "" ? 1 : 0) +
                                                                                // (communityFormik.values.preference.Req_visa_sponsorship !== "" ? 1 : 0) +
                                                                                (communityFormik.values.preference.CurrentEmpStatus !== "" ? 1 : 0)
                                                                            }
                                                                        </Typography>

                                                                    </Stack>
                                                                    :
                                                                    null
                                                                }
                                                            </Stack>
                                                            {(expanded !== 'preferencePanel') &&
                                                                <Stack mt={1} flexWrap="wrap">
                                                                    <Stack direction="row">
                                                                        {communityFormik.values.preference.CurrentEmpStatus !== "" && (
                                                                            <div className='mb-1'>
                                                                                <Typography className='filterLabelName'>CurrentEmpStatus:</Typography>
                                                                                <Chip
                                                                                    label={getPreferencesEmpStatusById(communityFormik.values.preference.CurrentEmpStatus)}
                                                                                    deleteIcon={<CloseIcon />}
                                                                                    className='selectedChips'
                                                                                    onDelete={() => {
                                                                                        communityFormik.setFieldValue("preference.CurrentEmpStatus", "");
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        )}
                                                                    </Stack>
                                                                    <Stack direction="row">
                                                                        {communityFormik.values.preference.EmpAvailabilityStatus !== "" && (
                                                                            <div className='mb-1'>
                                                                                <Typography className='filterLabelName'>EmpAvailabilityStatus:</Typography>
                                                                                <Chip
                                                                                    label={getPreferencesAvailabilityStatusById(communityFormik.values.preference.EmpAvailabilityStatus)}
                                                                                    deleteIcon={<CloseIcon />}
                                                                                    className='selectedChips'
                                                                                    onDelete={() => {
                                                                                        communityFormik.setFieldValue("preference.EmpAvailabilityStatus", "");
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        )}
                                                                    </Stack>
                                                                    <Stack direction="row">
                                                                        {communityFormik.values.preference.EmpJobPref !== "" && (
                                                                            <div className='mb-1'>
                                                                                <Typography className='filterLabelName'>EmpJobPref:</Typography>
                                                                                <Chip
                                                                                    label={getPreferencesEmpJobById(communityFormik.values.preference.EmpJobPref)}
                                                                                    deleteIcon={<CloseIcon />}
                                                                                    className='selectedChips'
                                                                                    onDelete={() => {
                                                                                        communityFormik.setFieldValue("preference.EmpJobPref", "");
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        )}
                                                                    </Stack>
                                                                    <Stack direction="row">
                                                                        {communityFormik.values.preference.EmpLocPref !== "" && (
                                                                            <div className='mb-1'>
                                                                                <Typography className='filterLabelName'>EmpLocPref:</Typography>
                                                                                <Chip
                                                                                    label={getPreferencesEmpLocById(communityFormik.values.preference.EmpLocPref)}
                                                                                    deleteIcon={<CloseIcon />}
                                                                                    className='selectedChips'
                                                                                    onDelete={() => {
                                                                                        communityFormik.setFieldValue("preference.EmpLocPref", "");
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        )}
                                                                    </Stack>

                                                                    <Stack direction="row">
                                                                        {communityFormik.values.preference.EmpWorkHoursPref !== "" && (
                                                                            <div className='mb-1'>
                                                                                <Typography className='filterLabelName'>EmpWorkHoursPref:</Typography>
                                                                                <Chip
                                                                                    label={getPreferencesworkinghoursById(communityFormik.values.preference.EmpWorkHoursPref)}
                                                                                    deleteIcon={<CloseIcon />}
                                                                                    className='selectedChips'
                                                                                    onDelete={() => {
                                                                                        communityFormik.setFieldValue("preference.EmpWorkHoursPref", "");
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        )}
                                                                    </Stack>
                                                                    {/* <Stack direction="row">
                                                                        {communityFormik.values.preference.auth_in_US !== "" && (
                                                                            <div className='mb-1'>
                                                                                <Typography className='filterLabelName'>Legally Authorized:</Typography>
                                                                                <Chip
                                                                                    label={(communityFormik.values.preference.auth_in_US === "1") ? "Yes" : (communityFormik.values.preference.auth_in_US === "2") ? "No" : ""}
                                                                                    deleteIcon={<CloseIcon />}
                                                                                    className='selectedChips'
                                                                                    onDelete={() => {
                                                                                        communityFormik.setFieldValue("preference.auth_in_US", "");
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        )}
                                                                    </Stack> */}
                                                                    {/* <Stack direction="row">
                                                                        {communityFormik.values.preference.Req_visa_sponsorship !== "" && (
                                                                            <div className='mb-1'>
                                                                                <Typography className='filterLabelName'>Req_visa_sponsorship:</Typography>
                                                                                <Chip
                                                                                    label={(communityFormik.values.preference.Req_visa_sponsorship === "1") ? "Yes" : (communityFormik.values.preference.Req_visa_sponsorship === "2") ? "No" : ""}
                                                                                    deleteIcon={<CloseIcon />}
                                                                                    className='selectedChips'
                                                                                    onDelete={() => {
                                                                                        communityFormik.setFieldValue("preference.Req_visa_sponsorship", "");
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        )}
                                                                    </Stack> */}
                                                                </Stack>
                                                            }

                                                        </Stack>
                                                    </AccordionSummary>

                                                    <AccordionDetails>
                                                        <div>
                                                            <FormControl fullWidth>
                                                                {/* <label className='inputLabel mt-2'>Current Employment Status</label> */}
                                                                <MUIAutoComplete
                                                                    id="CurrentEmpStatusOptionId"
                                                                    handleChange={(id: any, _: string) => {
                                                                        communityFormik.setFieldValue('preference.CurrentEmpStatus', id);
                                                                        // console.log(id);
                                                                    }}
                                                                    valuePassed={
                                                                        Array.isArray((communityFormik.values.preference.CurrentEmpStatus)) ?
                                                                            { label: communityFormik.values.preference.CurrentEmpStatus.join(), id: communityFormik.values.preference.CurrentEmpStatus.join() }
                                                                            :
                                                                            (communityFormik.values.preference.CurrentEmpStatus) ?
                                                                                { label: communityFormik.values.preference.CurrentEmpStatus, id: communityFormik.values.preference.CurrentEmpStatus }
                                                                                :
                                                                                {}
                                                                    }
                                                                    isMultiple={true}
                                                                    // width="200px"
                                                                    type='PreferencesEmpStatus'
                                                                    placeholder="Current Employment Status"
                                                                    refToPass={expanded === 'preferencePanel' ? inputRef : null}
                                                                />
                                                                {/* <Autocomplete
                                                    multiple
                                                    id="CurrentEmpStatusOptionId"
                                                    options={CurrentEmpStatusOption}
                                                    getOptionLabel={(option: any) => option.lookupValue}
                                                    renderInput={(params: any) => (
                                                        <TextField {...params} />
                                                    )}
                                                    fullWidth
                                                 //  value={communityFormik.values.preference.CurrentEmpStatus}
                                                    onChange={(_, newValue) => {
                                                        let obj = newValue.map((empstatus: any) => empstatus.lookupId);
                                                        obj && communityFormik.setFieldValue('preference.CurrentEmpStatus', obj)
                                                    }}
                                                    /> */}
                                                            </FormControl>
                                                            <FormControl fullWidth className='mt-3'>
                                                                {/* <label className='inputLabel mt-2'>Availability Status</label> */}
                                                                {/* <Autocomplete
                                                    multiple
                                                    id="EmpAvailabilityStatus"
                                                    options={EmpAvailabilityStatusOption}
                                                    getOptionLabel={(option: any) => option.lookupValue}
                                                    renderInput={(params: any) => (
                                                        <TextField {...params} />
                                                    )}
                                                    fullWidth
                                                 //  value={communityFormik.values.preference.EmpAvailabilityStatus}
                                                    onChange={(_, newValue) => {
                                                        let obj = newValue.map((empstatus: any) => empstatus.lookupId);
                                                        obj && communityFormik.setFieldValue('preference.EmpAvailabilityStatus', obj)
                                                    }}
                                                    /> */}
                                                                <MUIAutoComplete
                                                                    id="EmpAvailabilityStatusId"
                                                                    handleChange={(id: any, _: string) => {
                                                                        communityFormik.setFieldValue('preference.EmpAvailabilityStatus', id);
                                                                        // console.log(id);
                                                                    }}
                                                                    valuePassed={
                                                                        Array.isArray((communityFormik.values.preference.EmpAvailabilityStatus)) ?
                                                                            { label: communityFormik.values.preference.EmpAvailabilityStatus.join(), id: communityFormik.values.preference.EmpAvailabilityStatus.join() }
                                                                            :
                                                                            (communityFormik.values.preference.EmpAvailabilityStatus) ?
                                                                                { label: communityFormik.values.preference.EmpAvailabilityStatus, id: communityFormik.values.preference.EmpAvailabilityStatus }
                                                                                :
                                                                                {}
                                                                    }
                                                                    isMultiple={true}
                                                                    // width="200px"
                                                                    type='PreferencesAvailabilityStatus'
                                                                    placeholder="Availability Status"
                                                                />
                                                            </FormControl>
                                                            <FormControl fullWidth className='mt-3'>
                                                                {/* <label className='inputLabel mt-2'>Employment Preference</label> */}
                                                                <MUIAutoComplete
                                                                    id="EmpJobPrefId"
                                                                    handleChange={(id: any, _: string) => {
                                                                        communityFormik.setFieldValue('preference.EmpJobPref', id);
                                                                        // console.log(id);
                                                                    }}
                                                                    valuePassed={
                                                                        Array.isArray((communityFormik.values.preference.EmpJobPref)) ?
                                                                            { label: communityFormik.values.preference.EmpJobPref.join(), id: communityFormik.values.preference.EmpJobPref.join() }
                                                                            :
                                                                            (communityFormik.values.preference.EmpJobPref) ?
                                                                                { label: communityFormik.values.preference.EmpJobPref, id: communityFormik.values.preference.EmpJobPref }
                                                                                :
                                                                                {}
                                                                    }
                                                                    isMultiple={true}
                                                                    // width="200px"
                                                                    type='PreferencesEmpJob'
                                                                    placeholder="Employment Preference"
                                                                />
                                                                {/* <Autocomplete
                                                    multiple
                                                    id="EmpJobPref"
                                                    options={EmpJobPrefOption}
                                                    getOptionLabel={(option: any) => option.lookupValue}
                                                    renderInput={(params: any) => (
                                                        <TextField {...params} />
                                                    )}
                                                    fullWidth
                                                 //  value={communityFormik.values.preference.EmpAvailabilityStatus}
                                                    onChange={(_, newValue) => {
                                                        let obj = newValue.map((empstatus: any) => empstatus.lookupId);
                                                        obj && communityFormik.setFieldValue('preference.EmpJobPref', obj)
                                                    }}
                                                    /> */}
                                                            </FormControl>
                                                            <FormControl fullWidth className='mt-3'>
                                                                {/* <label className='inputLabel mt-2'>Flexibility Preference</label> */}
                                                                <MUIAutoComplete
                                                                    id="EmpLocPrefId"
                                                                    handleChange={(id: any, _: string) => {
                                                                        communityFormik.setFieldValue('preference.EmpLocPref', id);
                                                                        // console.log(id);
                                                                    }}
                                                                    valuePassed={
                                                                        Array.isArray((communityFormik.values.preference.EmpLocPref)) ?
                                                                            { label: communityFormik.values.preference.EmpLocPref.join(), id: communityFormik.values.preference.EmpLocPref.join() }
                                                                            :
                                                                            (communityFormik.values.preference.EmpLocPref) ?
                                                                                { label: communityFormik.values.preference.EmpLocPref, id: communityFormik.values.preference.EmpLocPref }
                                                                                :
                                                                                {}
                                                                    }
                                                                    isMultiple={true}
                                                                    // width="200px"
                                                                    type='PreferencesEmpLoc'
                                                                    placeholder="Flexibility Preference"
                                                                />
                                                                {/* <Autocomplete
                                                    multiple
                                                    id="EmpLocPref"
                                                    options={EmpLocPrefOption}
                                                    getOptionLabel={(option: any) => option.lookupValue}
                                                    renderInput={(params: any) => (
                                                        <TextField {...params} />
                                                    )}
                                                    fullWidth
                                                 //  value={communityFormik.values.preference.EmpAvailabilityStatus}
                                                    onChange={(_, newValue) => {
                                                        let obj = newValue.map((empstatus: any) => empstatus.lookupId);
                                                        obj && communityFormik.setFieldValue('preference.EmpLocPref', obj)
                                                    }}
                                                    /> */}
                                                            </FormControl>
                                                            <FormControl fullWidth className='mt-3'>
                                                                {/* <label className='inputLabel mt-2'>Preferred working hours</label> */}
                                                                <MUIAutoComplete
                                                                    id="EmpWorkHoursPrefId"
                                                                    handleChange={(id: any, _: string) => {
                                                                        communityFormik.setFieldValue('preference.EmpWorkHoursPref', id);
                                                                        // console.log(id);
                                                                    }}
                                                                    valuePassed={
                                                                        Array.isArray((communityFormik.values.preference.EmpWorkHoursPref)) ?
                                                                            { label: communityFormik.values.preference.EmpWorkHoursPref.join(), id: communityFormik.values.preference.EmpWorkHoursPref.join() }
                                                                            :
                                                                            (communityFormik.values.preference.EmpWorkHoursPref) ?
                                                                                { label: communityFormik.values.preference.EmpWorkHoursPref, id: communityFormik.values.preference.EmpWorkHoursPref }
                                                                                :
                                                                                {}
                                                                    }
                                                                    isMultiple={true}
                                                                    // width="200px"
                                                                    type='Preferencesworkinghours'
                                                                    placeholder="Preferred working hours"
                                                                />
                                                                {/* <Autocomplete
                                                    multiple
                                                    id="EmpWorkHoursPref"
                                                    options={EmpWorkingHoursOption}
                                                    getOptionLabel={(option: any) => option.lookupValue}
                                                    renderInput={(params: any) => (
                                                        <TextField {...params} />
                                                    )}
                                                    fullWidth
                                                 //  value={communityFormik.values.preference.EmpWorkHoursPref}
                                                    onChange={(_, newValue) => {
                                                        let obj = newValue.map((empstatus: any) => empstatus.lookupId);
                                                        obj && communityFormik.setFieldValue('preference.EmpWorkHoursPref', obj)
                                                    }}
                                                    /> */}
                                                            </FormControl>


                                                            {/* <FormControl fullWidth className='mt-3'> */}
                                                            {/* <label className='inputLabel mt-2'>Are you legally authorized to work in U.S</label> */}
                                                            {/* <TextField fullWidth
                                                                    select
                                                                    size="small"
                                                                    defaultValue={2}
                                                                    id="auth_in_US"
                                                                    name='auth_in_US'
                                                                    className='mt-1'
                                                                    value={communityFormik.values.preference.auth_in_US}
                                                                    onChange={(e) => {
                                                                        communityFormik.setFieldValue("preference.auth_in_US", e.target.value);
                                                                    }}
                                                                    label="Are you legally authorized to work in US"
                                                                >
                                                                    <MenuItem value="1"> Yes </MenuItem>
                                                                    <MenuItem value="2"> No </MenuItem>
                                                                </TextField> */}

                                                            {/* </FormControl> */}
                                                            {/* <FormControl fullWidth className='mt-3'> */}
                                                            {/* <TextField fullWidth
                                                                    select
                                                                    size="small"
                                                                    defaultValue={2}
                                                                    id="Req_visa_sponsorship"
                                                                    name='Req_visa_sponsorship'
                                                                    className='mt-1'
                                                                    value={communityFormik.values.preference.Req_visa_sponsorship}
                                                                    onChange={(e) => {
                                                                        communityFormik.setFieldValue("preference.Req_visa_sponsorship", e.target.value);
                                                                    }}
                                                                    label='Do you Require a visa sponsorship'
                                                                >
                                                                    <MenuItem value="1"> Yes </MenuItem>
                                                                    <MenuItem value="2"> No </MenuItem>
                                                                </TextField> */}

                                                            {/* </FormControl> */}
                                                        </div>
                                                    </AccordionDetails>

                                                </Accordion>
                                                : null
                                        }
                                        {
                                            !userLocalData.isChromeExtensionEnabled() ?
                                                <Accordion disableGutters square expanded={expanded === 'industriesPanel'} onChange={handleAccordionChange('industriesPanel')} className={`${userLocalData.isChromeExtensionEnabled() ? 'd-none' : ''}`}>
                                                    <AccordionSummary
                                                        expandIcon={<ArrowDropDownIcon />}
                                                        aria-controls="industriesPanel-content"
                                                        id="industriesPanel-header"
                                                    >
                                                        <Stack sx={{ width: '100%' }}>
                                                            <Stack className='acc-title' direction="row" justifyContent="space-between">
                                                                <Stack direction="row" alignItems="center">

                                                                    <Typography>Categories</Typography>
                                                                </Stack>
                                                                {/* (((communityFormik.values.industries.length === 1) && (communityFormik.values.industries[0].indcate)) || (communityFormik.values.industries.length > 1)) */}
                                                                {
                                                                    communityFormik.values.industries.reduce((count: any, obj: any) => obj.indcate ? ++count : count, 0) ? <Stack
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
                                                                            {communityFormik.values.industries.reduce((count: any, obj: any) => obj.indcate ? ++count : count, 0)}
                                                                        </Typography>
                                                                    </Stack>
                                                                        :
                                                                        null
                                                                }
                                                            </Stack>

                                                            {(expanded !== 'industriesPanel' && communityFormik.values.industries.length > 0 && communityFormik.values.industries.some((industry: any) => industry.indcate)) &&
                                                                <div>
                                                                    <Stack direction="row" mt={1} flexWrap="wrap">
                                                                        <div className='filterLabelName'>Category</div>
                                                                        {communityFormik.values.industries.map((industry: any, index: number) => (
                                                                            industry.indcate && (
                                                                                <Chip
                                                                                    key={`industry-chip-${index}`}
                                                                                    label={getCategoryLabel(industry.indcate)}
                                                                                    onDelete={() => {
                                                                                        const newIndustries = communityFormik.values.industries.filter((_: any, i: number) => i !== index);
                                                                                        communityFormik.setFieldValue("industries", newIndustries.length ? newIndustries : [{ indcate: "", subCat: "" }]);
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
                                                                communityFormik.values.industries.map((industry: any, index: number) => (
                                                                    <div key={`industries${index}`} className='addSeperator'>
                                                                        <Typography variant="body2">Category:</Typography>
                                                                        <FormControl fullWidth sx={{ mt: 1 }}>
                                                                            {/* {
                                                                                communityFormik.values.industries[index].indcate ?
                                                                                    null
                                                                                    :
                                                                                    
                                                                            } */}
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
                                                                                    <MenuItem sx={{ width: '200px' }} key={i} value={ind.id}>{ind.name}</MenuItem>
                                                                                ))}
                                                                            </Select>
                                                                        </FormControl>
                                                                        <Typography variant="body2">Subcategory:</Typography>
                                                                        <FormControl fullWidth sx={{ mt: 1 }}>

                                                                            {/* {
                                                                                communityFormik.values.industries[index].subCat ?
                                                                                    null
                                                                                    :
                                                                                    
                                                                            } */}
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
                                                                                        <MenuItem key={i} value={subCat.id}>{subCat.name}</MenuItem>
                                                                                    ))
                                                                                }
                                                                            </Select>
                                                                        </FormControl>
                                                                        <Box textAlign={'right'} sx={{ pr: '12px' }}>
                                                                            {((communityFormik.values.industries.length > 1) || ((communityFormik.values.industries.length === 1) && (industry.indcate || industry.subCat))) ? <IconButton
                                                                                onClick={() => {
                                                                                    (communityFormik.values.industries.length > 1) ?
                                                                                        updateCommunityFormik('delete', "", 'industries', index)
                                                                                        :
                                                                                        updateCommunityFormik('update', "", 'industries', index)
                                                                                }}
                                                                                edge="end"
                                                                            >
                                                                                <CloseIcon className='closeIcon' />
                                                                            </IconButton> : <IconButton disabled disableRipple />}
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
                                                :
                                                null
                                        }

                                        <Accordion disableGutters square expanded={expanded === 'languageSpokenPanel'} onChange={handleAccordionChange('languageSpokenPanel')} className={`${userLocalData.isChromeExtensionEnabled() ? 'd-none' : ''}`}>
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
                                                                    <Chip label={getLanguageById(lang)} key={i} deleteIcon={<CloseIcon />} className='selectedChips'
                                                                        onDelete={(e) => {
                                                                            e.stopPropagation();
                                                                            let tempLanguages = communityFormik.values.languageSpoken.split(',');
                                                                            // lang
                                                                            tempLanguages = tempLanguages.filter((i: any) => i !== lang);
                                                                            communityFormik.setFieldValue("languageSpoken", tempLanguages.join())
                                                                        }} />
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
                                                        handleChange={(id: any, _: string) => {
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
                                                        refToPass={expanded === 'languageSpokenPanel' ? inputRef : null}
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

                                        <ShowMoreFilters
                                            communityFormik={communityFormik}
                                            // selectedHiringStatusLabel={selectedHiringStatusLabel}
                                            // selectedCandidateActivityLabel={selectedCandidateActivityLabel}
                                            // selectedCandidateProfileLabel={selectedCandidateProfileLabel}
                                            // candidateProfileSource={candidateProfileSource}
                                            hiringStatusList={hiringStatusList}
                                            candidateActivityType={candidateActivityType}
                                            // selectedCandidateStatusLabel={selectedCandidateStatusLabel}
                                            candidateStatusList={candidateStatusList}
                                            sourcesList={sourcesList}
                                        />
                                        <br></br>
                                    </div>
                                </Form>
                            )
                        }
                    </Formik>

                    <div className="filterBtnWrap">
                        <Button variant="text" onClick={() => { saveAuditLog(3930); onApplyFilters(true) }}>Apply Filters</Button>
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
                            <Box
                                sx={{ minWidth: '660px' }}
                            >
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
                                    // maxRows={7}
                                    rows={7}
                                />
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button color="secondary" variant='outlined' onClick={() => setDescModalOpen(false)} >Close</Button>
                            <Button
                                color="primary"
                                variant='outlined'
                                startIcon={
                                    <AutoAwesomeIcon className='' />
                                }
                                sx={{ height: '26px !important' }}
                                disabled={!Boolean(communityFormik.values.jobDescription)}
                                onClick={
                                    () => {
                                        setDescModalOpen(false);
                                        searchSkillsFromDescription('', communityFormik.values.jobDescription);

                                        // communityFormik.setFieldValue('selectedJobId', "");
                                        // communityFormik.setFieldValue('selectedJobTitle', "");
                                        // setSelectedJobTitle({
                                        //     title: "",
                                        //     id: ""
                                        // });
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
                            <Box sx={{
                                minWidth: '660px',
                                p: 5
                            }}>
                                <MUIAutoComplete
                                    id='jobTitle'
                                    handleChange={(id: any, name: string) => {
                                        communityFormik.setFieldValue('selectedJobId', id);
                                        communityFormik.setFieldValue('selectedJobTitle', name);
                                        // setTimeout(() => {
                                        //     updateJobDetails(id, name);
                                        // }, 120);
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
                            <Button color="secondary" variant='outlined' onClick={() => setJobModalOpen(false)}>Close</Button>
                            <Button color="primary"
                                variant='outlined'
                                startIcon={
                                    <AutoAwesomeIcon className='' />
                                }
                                sx={{ height: '26px !important' }}
                                disabled={!Boolean(communityFormik.values.selectedJobId)}
                                onClick={
                                    () => {
                                        setJobModalOpen(false);
                                        // setSelectedJobTitle({
                                        //     title: communityFormik.values.selectedJobTitle,
                                        //     id: communityFormik.values.selectedJobId
                                        // });
                                        updateJobDetails(communityFormik.values.selectedJobId, communityFormik.values.selectedJobTitle);
                                        searchSkillsFromDescription(communityFormik.values.selectedJobId, '');
                                        // getJobDescription(communityFormik.values.selectedJobId);
                                    }
                                }>AI Search</Button>
                        </DialogActions>
                    </Dialog>
                </div >
                {/* </TabPanel>
                    <TabPanel value="2">

                    </TabPanel>
                </TabContext> */}
            </Box>

            <MoreFilters
                communityFormik={communityFormik}
                open={open}
                handleClose={handleClose}
                handleApplyFilters={handleApplyFilters}
                isCRMEnabled={isCRMEnabled}
                // selectedHiringStatusLabel={selectedHiringStatusLabel}
                // selectedCandidateActivityLabel={selectedCandidateActivityLabel}
                // selectedCandidateProfileLabel={selectedCandidateProfileLabel}
                // candidateProfileSource={candidateProfileSource}
                hiringStatusList={hiringStatusList}
                candidateActivityType={candidateActivityType}
                // selectedCandidateStatusLabel={selectedCandidateStatusLabel}
                candidateStatusList={candidateStatusList}
                sourcesList={sourcesList}
            />
        </div >
    );
}

export default CommunityFilters;