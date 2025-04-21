import  {  useContext } from 'react';
import {React, useState, useEffect,useRef } from '../../../../../../shared/modules/React';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography } from '../../../../../../shared/modules/MaterialImports/Typography';
// import Stack from "@mui/material/Stack";
// import Box from "@mui/material/Box";
// import FormControl from '@mui/material/FormControl';
import { MUIAutoComplete } from "../../../../../shared/MUIAutoComplete/MUIAutoComplete";
import { Accordion, AccordionSummary, AccordionDetails,  } from '../../../../../../shared/modules/MaterialImports/Accordion';
// import AutorenewIcon from '@mui/icons-material/Autorenew';
// import ModeEditIcon from '@mui/icons-material/ModeEdit';
import {Tooltip} from '../../../../../../shared/modules/MaterialImports/ToolTip';
import {Chip} from '../../../../../../shared/modules/MaterialImports/Chip';
import { Grid, IconButton, InputAdornment,  Button } from '../../../../../../shared/modules/commonImports';
import './GenerateMagicWand.scss';
import { userLocalData } from '../../../../../../shared/services/userData';
import {Divider} from '../../../../../../shared/modules/MaterialImports/Divider';
// import MenuItem from "@mui/material/MenuItem";
import { trackPromise } from "../../../../../../shared/modules/PromiseTrackter";
import ApiService from '../../../../../../shared/api/api';
import { Radio, RadioGroup, Checkbox } from '../../../../../../shared/modules/MaterialImports/FormElements';
// import FormLabel from '@mui/material/FormLabel';
import { TextField, FormControlLabel} from '../../../../../../shared/modules/MaterialImports/FormInputs';
import { showToaster } from '../../../../../shared/SnackBar/SnackBar';
import CloseIcon from '@mui/icons-material/Close';
import {ButtonGroup} from '../../../../../../shared/modules/MaterialImports/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDebounce } from '../../../../../../shared/services/useDebounce';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';

import {
    // FieldArray,
    // Form,
    // Formik,
    useFormik,
    Yup
} from '../../../../../../shared/modules/Formik';

import { FormStore } from '../../../../../../App';
import { inputBlockList } from '../shared/utills/controlesList';

interface SelectedJob {
    id: string;
    name?: string;
}
interface Skill {
    recentUse: boolean;
    experLevel: string;
    skillName: string;
}
const GenerateMagicWand = ({ handleReplaceQuestions, hideAI }: { handleReplaceQuestions: (bodyContent: any) => void; hideAI: boolean }) => {
    // const [expanded, setExpanded] = useState(false);
    // const [selected, setSelected] = useState({});
    const [questionExpanded, setQuestionExpanded] = useState(false);
    const [addGenerateView, setAddGenerateView] = useState(true);
    const [displayShort, setDisplayShort] = useState('');
    const [listQuestions, setListQuestions] = useState([]);
    const [listModuleQuestions, setListModuleQuestions] = useState([]);
    const [listSkills, setListSkills] = useState<any>([]);
    const [dataQuizList, setDataQuizList] = useState<any>([]);
    const [selectedJob, setSelectedJob] = useState<SelectedJob>({
        id: "",
        name: ""
    });
    const [difficultyLevel, setDifficultyLevel] = useState('Easy');
    const [generateType, setGenerateType] = useState('job');
    const [numberOfQuestions, setNumberOfQuestions] = useState(5);
    const [condChecked, setCondChecked] = useState(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [isLoaded, setIsLoaded] = useState(true);
    const [formData, setFormData] = useContext(FormStore);
    const clientId = userLocalData.getvalue('clientId');

    const initialAddQuizDetails = {
        selectedJobId: "",
        selectedJobName: "",
        generateType: "job",
        skills: [
            {
                recentUse: false,
                experLevel: "",
                skillName: ""
            }
        ],
        numberOfQuestions: "5",
        difficultyLevel: "Easy",
        condChecked: false,
        clientId: userLocalData.getvalue('clientId'),
    }

    const addQuizSchema = Yup.object().shape({
        numberOfQuestions: Yup.number().required('No. of Queations is required'),
        generateType: Yup.string().required('Generate Type is required'),
        selectedJobId: Yup.string(),
        selectedJobName: Yup.string(),
        skills: Yup.array().of(
            Yup.object().shape({
                recentUse: Yup.boolean(),
                experLevel: Yup.string(),
                skillName: Yup.string(),
            })
        ),
        difficultyLevel: Yup.string(),
        condChecked: Yup.boolean(),
        clientId: Yup.string(),
    });


    const addQuizBankFormik = useFormik({
        initialValues: initialAddQuizDetails,
        validationSchema: addQuizSchema,
        onSubmit: () => {
            setIsFormSubmitted(true);
            //   console.log(addQuizBankFormik.values)
            setDataQuizList([addQuizBankFormik.values]);
            handleClickOpen();
        },
        validateOnMount: true
    });

    const [skillSuggestions, setSkillSuggestions] = useState([]);
    const indexToReplace = useRef({
        job: -1,
        skill: -1
    });

    //let iTitle = "";
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

    const handleDisplayShortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCondChecked(event.target.checked);
        const numericValue: number = event.target.checked ? 1 : 0;
        setDisplayShort(numericValue.toString());
        //  addQuizBankFormik.setFieldValue("condChecked", event.target.checked);
    }

    const handleDifficultyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDifficultyLevel((event.target as HTMLInputElement).value);
        // addQuizBankFormik.setFieldValue("difficultyLevel", (event.target as HTMLInputElement).value)
    };

    const handleGenerateTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let genType = (event.target as HTMLInputElement).value;
        setGenerateType((event.target as HTMLInputElement).value);

        if (genType !== "job") {
            setSelectedJob({
                id: "",
                name: ""
            });
            addQuizBankFormik.setFieldValue("skills", [
                {
                    recentUse: false,
                    experLevel: "",
                    skillName: ""
                }
            ]);
        } else {
            if (addQuizBankFormik.values.skills.length === 0) {
                addQuizBankFormik.setFieldValue("skills", [
                    {
                        recentUse: false,
                        experLevel: "",
                        skillName: ""
                    }
                ]);
            }
        }
    }

    // const handleNumberOfQuestionsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setNumberOfQuestions(parseInt(event.target.value));
    //     //  addQuizBankFormik.setFieldValue("numberOfQuestions", event.target.value);
    // };

    const handleViewClickOpen = () => {
        setAddGenerateView(false);
    }
    const handleEditClickOpen = () => {
        setAddGenerateView(true);
        // setListQuestions([]);
        // setListModuleQuestions([]);
        // setFormData([]);

        let tempSkills: Skill[] = listSkills
            .filter((skillName: any, index: number, self: any) =>
                skillName && index === self.findIndex((t: any) => t === skillName)
            )
            .map((skillName: any) => ({
                recentUse: true,
                experLevel: "",
                skillName: skillName
            }));

        addQuizBankFormik.setFieldValue('skills', tempSkills);
    };


    // const handleChapterAccordionChange = (panel: any) => (event, isExpanded) => {
    //     setExpanded(isExpanded ? panel : false);
    // };

    const handleQuestionAccordionChange = (panel: any) => (event: any, isExpanded: boolean) => {
        setQuestionExpanded(isExpanded ? panel : false);
    };
    const updateQuizBankFormik = (type: 'add' | 'delete' | 'update', val: any, objectName: 'skills', index?: number, position?: string) => {
        setTimeout(() => {
            let objToModify = [
                ...addQuizBankFormik.values[objectName]
            ];
            if (type === 'delete') {
                objToModify.splice(index || 0, 1);
            }
            if (type === 'update') {
                if (objectName === 'skills') {
                    // @ts-ignore
                    objToModify[index].skillName = val;
                }
            }
            if (type === 'add') {
                if (objectName === 'skills') {
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
            addQuizBankFormik.setFieldValue(objectName, objToModify);
        }, 150);
    }

    const handleClickOpen = () => {

        setListQuestions([]);
        setListModuleQuestions([]);
        setFormData([]);
        saveAuditLog(4183);


        if (generateType === "job" && selectedJob.id.trim() === "") {
            showToaster("Please select job title", 'warning');
            return false;
        }
        if (generateType !== "job" && addQuizBankFormik.values.skills.length === 0) {
            showToaster("Please Enter the Skill", 'warning');
            return false;
        }

        //   console.log("addQuizBankFormik.values");
        //  console.log(addQuizBankFormik.values);
        const tempChoicesAry: any = [];

        const choiceKeys = addQuizBankFormik.values.skills;
        for (let choice = 0; choice < choiceKeys.length; choice++) {
            tempChoicesAry.push(choiceKeys[choice].skillName);
        }
        setListSkills(tempChoicesAry);
        console.log(tempChoicesAry);

        const data = (generateType === "job") ? { jobId: selectedJob.id, clientId: userLocalData.getvalue('clientId'), difficulty: difficultyLevel, numberOfQuestionsPerSkill: numberOfQuestions, displayShort: condChecked }
            : { skills: tempChoicesAry, clientId: userLocalData.getvalue('clientId'), difficulty: difficultyLevel, numberOfQuestionsPerSkill: numberOfQuestions, displayShort: condChecked }

        trackPromise(
            ApiService.postWithData('admin', 'getScreenQuiz', data).then(
                (response: any) => {

                    if (response.data.Success) {
                        // console.log(response.data.response?.screen_quiz?.screening_questions?.length);
                        const tempModuleData: any = [];
                        // let tempTypeModule = response.data.adminModules.map((item: any) => {return item.type});
                        // if (response.data.response?.screen_quiz?.screening_questions && response.data.response?.screen_quiz?.screening_questions.length) {
                        //     for (let ts = 0; ts < response.data.response?.screen_quiz?.screening_questions?.length; ts++) {
                        //         console.log(response.data.response?.screen_quiz?.screening_questions[ts]);
                        //         if (response.data.response?.screen_quiz?.screening_questions[ts].length) {
                        //             tempTypeModule.push(response.data.response?.screen_quiz?.screening_questions[ts]);
                        //         }
                        //     }
                        // }
                        const isObjEmpty = (obj: any) => {
                            return Object.keys(obj).length === 0
                        }

                        //  console.log("----"+response.data.response?.screen_quiz?.length);
                        if (isObjEmpty(response.data.response?.screen_quiz)) {
                            showToaster("An error occured while fetching questions, please try again! ", 'error');
                            return false;
                        }
                        if (isObjEmpty(response.data.response?.screen_quiz?.screening_questions)) {
                            showToaster("An error occured while fetching questions, please try again! ", 'error');
                            return false;
                        }
                        const multipleChoice = inputBlockList.find((item: any) => {
                            if (item.fieldType === "weightedmultiplechoice") {
                                return item
                            }
                        });

                        let tempFormData: any = [];
                        let questionsList = response.data.response?.screen_quiz?.screening_questions;
                        const questionKeys = Object.keys(questionsList);
                        let characters = [];
                        for (let i = 97; i <= 122; i++) {
                            characters.push(String.fromCharCode(i));
                        }
                        for (let i = 0; i < questionKeys.length; i++) {
                            let module = {};
                            // let tempFormData: any = [];
                            let questionAry = questionsList[questionKeys[i] as keyof typeof questionsList];
                            for (let j = 0; j < questionAry.length; j++) {
                                let field = { ...multipleChoice };
                                let question = questionAry[j];
                                const choiceKeys = Object.keys(question.choices);
                                const tempChoicesAry: any = [];
                                for (let choice = 0; choice < choiceKeys.length; choice++) {
                                    tempChoicesAry.push({
                                        id: choice,
                                        value: question.choices[choiceKeys[choice] as keyof typeof question.choices],
                                        character: characters[choice]
                                    })
                                } /// choice array
                                field = {
                                    ...field,
                                    id: j + 1,
                                    moduleName: questionKeys[i],
                                    labelName: question[`question_${j + 1}` as keyof typeof question],
                                    choices: [...tempChoicesAry],
                                    weightedCorrectAnswer: question.choices[question.correct_choice as keyof typeof question.choices],
                                    weightedPoints: "1",
                                    description: "",
                                    isRequired: true,
                                    checkStatus: false,
                                    helpText: question[`reason` as keyof typeof question],
                                }
                                tempFormData.push(field);

                            }///question array
                            module = {
                                ...module,
                                id: i + 1,
                                moduleName: questionKeys[i],
                                fields: tempFormData
                            }

                            tempModuleData.push(module);
                        } /// object key
                        console.log(tempModuleData);
                        setListQuestions(tempFormData);
                        setListModuleQuestions(tempModuleData);
                        // const initialSelected = {};
                        // Object.entries(tempModuleData).forEach((questions :any) => {
                        //     questions.fields.forEach((question:any, qIndex :number) => {
                        //         initialSelected[`${question.id}_${qIndex}`] = true; 
                        //     });
                        // });
                        // setSelected(initialSelected); 

                        setAddGenerateView(false);
                        showToaster("Questions  has been fetched successfully", 'success');
                        setIsLoaded(true);
                        // addQuizBankFormik.resetForm();
                    } else {
                        showToaster("An error occured while fetching questions, please try again! ", 'error');
                        setIsLoaded(true);
                    }

                }
            )
        )
    };

    useEffect(() => {
        if (!hideAI) {
            setSelectedJob({
                id: "",
                name: ""
            });
            setDifficultyLevel('Easy');
            setGenerateType('job');
            setNumberOfQuestions(5);
            setCondChecked(false);
            addQuizBankFormik.resetForm();
            setAddGenerateView(true);
            setListQuestions([]);
        }
    }, [hideAI]);



    const handleCheckboxChange = (key: any, qIndex: number) => (event: any) => {
        const checked = event.target.checked;
        //  const tempQuizData = [...listModuleQuestions];
        const tempQuizData = [...listQuestions];

        const tempIdx = tempQuizData.findIndex((item: { id: any }) => item.id === key);
        if (tempIdx !== -1) {
            tempQuizData[qIndex].checkStatus = checked;
        }
        //// remove object 
        if (!checked) {
            const removeIndex = formData.findIndex((item: any) => item.id === key);
            // remove object
            formData.splice(removeIndex, 1);
        }
        /// filter object with status true 
        const arrayQuestions = tempQuizData.filter((quiz: any) => quiz.checkStatus === true);

        /// add object with exist form data
        const mergedArray = formData.concat(arrayQuestions.filter(
            (item2: any) => !formData.some((item1: any) => item1.id === item2.id)));

        handleReplaceQuestions(mergedArray);
        setFormData([...mergedArray]);
    };

    const saveAuditLog = (id: number) => {
        ApiService.saveAuditLog(id);
    }

    return (
        <div className='GenerateMagicWand'>

            <Grid
                container
                direction="row" justifyContent="left" className="mb-1 customCard_outer">

                <Grid size={12}
                    container
                    direction="row" justifyContent="left" className={`${addGenerateView ? 'block' : 'd-none'} m-2`}>

                    <Grid container direction="row" size={12} className='mt-1'>
                        <Grid size={11} className='mt-1'>
                            <span className='headermagicwand'>Please provide a few details to generate quiz</span>
                        </Grid>
                        <Grid size={1}>
                            <IconButton className='iconStyle' onClick={handleViewClickOpen}><KeyboardArrowUpOutlinedIcon color='secondary' fontSize="small" /></IconButton>

                        </Grid>
                    </Grid>
                    <form key={clientId} >
                        <Grid container direction="row" size={12} className='mt-1'>
                            <Grid size={3} className='mt-3'>
                                <label className='  mr-1'>Generate by : </label>
                            </Grid>
                            <Grid size={8} className='mt-1 ml-2'>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-type-buttons-group-label"
                                    name="row-type-buttons-group"
                                    value={generateType}
                                    onChange={handleGenerateTypeChange}

                                >
                                    <FormControlLabel sx={{ fontSize: "9px" }} value="job" control={<Radio className='butWidth' size="small" />} label={<Typography className='titlesize' >Job Title</Typography>} />
                                    <FormControlLabel value="skill" control={<Radio className='butWidth' size="small" />} label={<Typography className='titlesize' >Skill</Typography>} />

                                </RadioGroup>
                            </Grid>

                        </Grid>
                        <Grid container direction="row" size={12} className={`mt-0 ${generateType === "job" ? 'block' : 'd-none'}`}>
                            <Grid size={3} className='mt-3' >
                                <label className='titlesize'>Job Title : </label>
                            </Grid>
                            <Grid size={8}  >
                                <MUIAutoComplete className='mt-1'
                                    id='jobTitle'
                                    handleChange={(id: any, name: string) => {
                                        setSelectedJob({ id, name });
                                        //   addQuizBankFormik.setFieldValue("selectedJobId", id);
                                        //  addQuizBankFormik.setFieldValue("selectedJobName", name);
                                    }}
                                    valuePassed={
                                        (selectedJob.id) ? { label: selectedJob.name, id: selectedJob.id } : {}
                                    }
                                    isMultiple={false}
                                    width="100%"
                                    type='assignJobToCandidate'
                                    placeholder={''}
                                />
                            </Grid>
                        </Grid>
                        <Grid container direction="row" size={12} className={`mt-0 ${generateType !== "job" ? 'block' : 'd-none'}`}>
                            <Grid size={3} className=' mt-3' >
                                <label className='titlesize'>Skill : </label>
                            </Grid>
                            <Grid size={8}  >

                                <div>
                                    {addQuizBankFormik.values.skills && addQuizBankFormik.values.skills.length > 0 ? (
                                        addQuizBankFormik.values.skills.map((skill, index) => (
                                            <div className='' key={`skills${index}`}>
                                                <Tooltip title={skill.skillName}>
                                                    <TextField
                                                        className={`mt-1`}
                                                        fullWidth
                                                        id={`skills.${index}.skillName`}
                                                        variant="outlined"
                                                        type="text"
                                                        size="small"
                                                        placeholder='Add Skill'
                                                        name={`skills.${index}.skillName`}
                                                        value={skill.skillName}
                                                        // inputRef={expanded === 'skillsPanel' ? inputRef : null}
                                                        onChange={
                                                            (e) => {
                                                                addQuizBankFormik.handleChange(e);
                                                                // updateQuizBankFormik('update', e.target.value, 'skills', index);
                                                                searchSkillsWithDebounce(e.target.value, index);
                                                            }
                                                        }
                                                        InputProps={{
                                                            endAdornment: <div>
                                                                <InputAdornment position="end">

                                                                    <IconButton
                                                                        // onClick={() => remove(index)}
                                                                        onClick={() => updateQuizBankFormik('delete', "", 'skills', index)}
                                                                        edge="end"
                                                                    >
                                                                        <CloseIcon className='closeIcon' />
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            </div>
                                                        }}
                                                    />
                                                </Tooltip>

                                            </div>
                                        ))
                                    ) : null}
                                    <Grid container direction="row" justifyContent="flex-end" alignItems="center" className='mt-2' >
                                        <Button variant="outlined" color="secondary" className="mb-2" startIcon={<AddIcon className="addIcon" />}
                                            onClick={
                                                () => {
                                                    updateQuizBankFormik('add', {
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
                                                                        size='small'
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
                                                                                    updateQuizBankFormik('add', {
                                                                                        recentUse: false,
                                                                                        experLevel: "",
                                                                                        skillName: item.name
                                                                                    }, 'skills', addQuizBankFormik.values.skills.length)
                                                                                    //     console.log(addQuizBankFormik.values.jobTitles);
                                                                                    //     setFieldValue(`jobTitles[${addQuizBankFormik.values.jobTitles.length}].title`, item.name, true);
                                                                                    //     // addQuizBankFormik.validateField();
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
                            </Grid>
                        </Grid>
                        <Grid container direction="row" size={12} className='mt-0'>
                            <Grid size={3} className=' mt-4' >
                                <label className='mt-1 mr-1'>Difficulty Level: </label>
                            </Grid>
                            <Grid size={8} className=' mt-1 ml-3' >
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="difficultyLevel"
                                    value={difficultyLevel}
                                    onChange={handleDifficultyChange}
                                >
                                    <FormControlLabel value="Advanced" control={<Radio className='butWidth' size="small" />} label={<Typography className='titlesize' >Advanced</Typography>} />
                                    <FormControlLabel value="Medium" control={<Radio className='butWidth' size="small" />} label={<Typography className='titlesize' >Medium</Typography>} />
                                    <FormControlLabel value="Easy" control={<Radio className='butWidth' size="small" />} label={<Typography className='titlesize' >Easy</Typography>} />

                                </RadioGroup>
                            </Grid>

                        </Grid>

                        <Grid container direction="row" size={12} className='mt-1'>
                            <Grid size={5} className=' mt-2' >
                                <label className='titlesize'>Number Of Questions :</label>
                            </Grid>
                            <Grid size={3} className='mt-1' >
                                <ButtonGroup>
                                    <Button
                                        aria-label="reduce"
                                        onClick={() => {
                                            setNumberOfQuestions(Math.max(numberOfQuestions - 5, 0));
                                            //   addQuizBankFormik.setFieldValue("numberOfQuestions", numberOfQuestions);
                                        }}
                                        size='small'
                                    //    sx={{ height: "36px", marginTop: "0px" }}
                                    >
                                        <RemoveIcon fontSize="small" />
                                    </Button>
                                    <Button
                                        aria-label="reduce"
                                        onClick={() => {
                                            setNumberOfQuestions(Math.max(numberOfQuestions - 5, 0));
                                            //   addQuizBankFormik.setFieldValue("numberOfQuestions", numberOfQuestions);
                                        }}
                                        size='small'
                                    //  sx={{ height: "30px", marginTop: "0px" }}
                                    >
                                        {numberOfQuestions}
                                    </Button>
                                    {/* <TextField
                                        id="numberOfQuestions"
                                        size="small"
                                        value={numberOfQuestions}
                                        onChange={handleNumberOfQuestionsChange}
                                        required

                                        sx={{ height: "28px !important", width: "52px" }}
                                    /> */}
                                    <Button
                                        aria-label="increase"
                                        onClick={() => {
                                            setNumberOfQuestions(numberOfQuestions + 5);
                                            ///  addQuizBankFormik.setFieldValue("numberOfQuestions", numberOfQuestions);
                                        }}
                                        size='small'
                                    // sx={{ height: "28px", marginTop: "3px" }}
                                    >
                                        <AddIcon fontSize="small" />
                                    </Button>
                                </ButtonGroup>
                            </Grid>
                            <Grid size={12} className='mt-2' >
                                <FormControlLabel className='titlesize'
                                    control={<Checkbox checked={condChecked} onChange={handleDisplayShortChange} />}
                                    label="Display shorter choice options"
                                    labelPlacement="end"
                                    id="condChecked"
                                    name="condChecked"
                                    value={condChecked}
                                    sx={{ ml: 0 }}
                                />

                            </Grid>
                            <Grid size={12} className='mt-3' >
                                <Button className='mr-3' color="primary" variant="contained" size="small" onClick={handleClickOpen}>
                                    Generate
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>

                <Grid
                    container
                    direction="row" justifyContent="flex-start" className={`${addGenerateView ? 'd-none' : 'block'} m-1 `}>

                    <Grid container alignItems="center" style={{ position: 'relative', justifyContent: 'center', }}>

                        <Grid size={11} style={{ flexGrow: 1, textAlign: 'left' }}>
                            <span className={`mt-3 mb-2 ${generateType === "job" ? 'block' : 'd-none'}`} >
                                <b>Job : {selectedJob.name}</b> <br />
                            </span>

                            <span className={`mt-3  mb-2 ${generateType !== "job" ? 'block' : 'd-none'}`} >
                                <b>Skill : {listSkills.toString()}</b> <br />
                            </span>

                            <span className={`mt-3 `} >
                                <b>{difficultyLevel}</b> | <b>{numberOfQuestions} Questions</b>  <br />
                                <b>{displayShort === "1" ? 'Display shorter choice options' : ""} </b>
                            </span>
                        </Grid>
                        <Grid size={1}>
                            <IconButton className='iconStyle' onClick={handleEditClickOpen}><KeyboardArrowDownOutlinedIcon color='secondary' fontSize="small" /></IconButton>
                            {/* <IconButton title='Re-Generate Questions' className='iconStyle' onClick={handleClickOpen}> <AutorenewIcon color='primary' fontSize="small" /></IconButton> */}

                        </Grid>
                    </Grid>

                </Grid>

            </Grid>
            <Grid
                container
                direction="row" justifyContent="left" className="mb-1 customCard_outer1">
                <Grid container direction="row" size={12} className='mt-1'>
                    <Divider />
                    {isLoaded ?

                        <Grid container spacing={0} sx={{ width: '100%' }}>
                            {listModuleQuestions && listModuleQuestions.length > 0 && listModuleQuestions.map((section: any, sIndex: number) => (
                                <div >
                                    <div className='groupHeader'>  <center>  <b>{section.moduleName.toUpperCase()}</b> </center></div>
                                    <div >
                                        {
                                            listQuestions && listQuestions?.length > 0 && listQuestions?.map((question: any, qIndex: number) => (
                                                <div >
                                                    {(section.moduleName == question.moduleName) ?
                                                        <Accordion expanded={questionExpanded === question.labelName} onChange={handleQuestionAccordionChange(question.labelName)}>
                                                            <AccordionSummary
                                                                expandIcon={<ExpandMoreIcon />}
                                                                aria-controls={`panel${qIndex}-content`}
                                                                id={`panel${qIndex}-header`}
                                                            >
                                                                <div style={{ display: 'flex', alignItems: 'center', flexGrow: 0 }}>
                                                                    <FormControlLabel
                                                                        label=""
                                                                        control={
                                                                            <Checkbox
                                                                                checked={question.checkStatus}
                                                                                onChange={handleCheckboxChange(question.id, qIndex)}
                                                                            />
                                                                        }
                                                                    // style={{ marginRight: '0px', marginLeft: '2px' }}
                                                                    />
                                                                    <Typography
                                                                        variant="body1"
                                                                        style={{ fontWeight: '200px', fontSize: '14px', flexGrow: 1 }}
                                                                    >
                                                                        {qIndex + 1 + ') ' + question.labelName}
                                                                    </Typography>

                                                                </div>
                                                            </AccordionSummary>
                                                            <AccordionDetails>
                                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0px', paddingLeft: '10px' }}>

                                                                    {question?.choices && question?.choices?.map((choice: any, cIndex: number) => (
                                                                        <Typography key={cIndex} style={{ fontSize: '14px' }} className={`${(choice.value == question.weightedCorrectAnswer) ? 'ansColor' : ''}`} >
                                                                            {choice.character + ') ' + choice.value}
                                                                        </Typography>
                                                                    ))}
                                                                </div>
                                                            </AccordionDetails>
                                                        </Accordion>
                                                        :
                                                        ""}
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            ))}
                        </Grid>
                        :
                        null
                    }
                </Grid>
            </Grid>
        </div>
    );
};

export default GenerateMagicWand;