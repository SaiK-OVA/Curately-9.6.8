import { useEffect, useRef, useState } from '../../../../../shared/modules/React';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Badge} from '../../../../../shared/modules/MaterialImports/Badge';
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { FieldArray, Form, Formik, useFormik, Yup } from '../../../../../shared/modules/Formik';
import { Dialog, DialogActions, DialogContent, DialogTitle, CloseIcon } from '../../../../../shared/modules/MaterialImports/Dialog';
import { Divider } from '../../../../../shared/modules/MaterialImports/Divider';
import { Typography } from '../../../../../shared/modules/MaterialImports/Typography';
import { TextField } from '../../../../../shared/modules/MaterialImports/FormInputs';
// import { Grid } from '../../../../../shared/modules/MaterialImports/Grid';
import { Button, IconButton, Grid} from '../../../../../shared/modules/commonImports';


import {MenuItem} from '../../../../../shared/modules/MaterialImports/Menu';

// import { useParams } from 'react-router-dom';
import { trackPromise } from '../../../../../shared/modules/PromiseTrackter';

import { StageInterface } from '../Workflow';
import ApiService from '../../../../../shared/api/api';
import { showToaster } from '../../../../shared/SnackBar/SnackBar';
import { userLocalData } from '../../../../../shared/services/userData';
import ErrorMessage from '../../../../shared/Error/ErrorMessage';
import masterStatesList from '../../../../../shared/data/States';
import TuneIcon from '@mui/icons-material/Tune';
import { MUIAutoComplete } from '../../../../shared/MUIAutoComplete/MUIAutoComplete';
import {ToggleButton, ToggleButtonGroup} from '../../../../../shared/modules/MaterialImports/ToggleButton';


import './FilterStage.scss';


export interface FilterStageInterface {
    stageId: string;
    name: string;
    title: string;
    stageTypeId: string;
}

const FilterStage = ({
    stagesList, currentStageId, passedStageData = {}, workflowData, sendCandIds
}: {
    stagesList: StageInterface[], currentStageId: string, passedStageData: any, workflowData: any, sendCandIds: any
}) => {


    const [initialLoad, setInitialLoad] = useState(false);

    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [filteredCandidateCount, setFilteredCandidateCount] = useState(0);
    const initialRender = useRef(true);
    const formDetails = useRef<any>([{
        name: '',
        id: '',
        json: [],
        assessments: [],
        states: [],
        questionSelectedId: "",
        questionType: "",
        questionValues: [],
        questionArray: []
    }]);
    const filterStagesList = useRef<FilterStageInterface[]>(
        [
            {
                stageTypeId: "",
                name: '',
                title: '',
                stageId: ""
            }
        ]
    );

    const triggerOptions = [
        {
            name: "State",
            id: "1"
        },
        {
            name: "Zipcode",
            id: "2"
        }
    ];

    const webinarOptions = [
        "Attended",
        "Not Attended",
        "Not Registered"
    ];
    const schedulingOptions = [
        "Selected",
        "Not Selected"
    ]

    const stageTypeIdsObj = useRef<any>({});
    // const dataCollectionObj = useRef<any>({});
    const isSaveOpened = useRef<boolean>(false);
    //  const saveSelectedIndex = useRef<number>(-1);
    const removeIndex = useRef<number>(-1);


    const filterSchema = Yup.object().shape({
        json: Yup.array().of(
            Yup.object().shape({
                stageId: Yup.string().required('Please select Stage'),
                fieldValue: Yup.string().required('Please enter Field Value'),
                compare: Yup.string().required('Please select a value.'),
                condition: Yup.string().required('Please enter Conditional Value'),
                compareValue: Yup.lazy(val => (Array.isArray(val) ? Yup.array().of(Yup.string()) : Yup.string())),
                isShown: Yup.boolean()
            })
        ),
        // thenMoveTo: Yup.string().required('Please select Stage to move'),
        // elseMoveTo: Yup.string().required('Please select Stage to move'),
        filterId: Yup.string(),
        recrIds: Yup.string(),
        recrNames: Yup.string()
    })

    // console.log(JSON.parse(passedStageData.json));

    // const thenElseObj = useRef({
    //     thenMoveTo: "",
    //     elseMoveTo: ""
    // });
    const [jsonToDisplayConditions, setJsonToDisplayConditions] = useState((passedStageData.filterId) ? JSON.parse(passedStageData.json).json : []);
    const filterFormik = useFormik({
        initialValues: (passedStageData.filterId) ?
            {
                json: JSON.parse(passedStageData.json).json,
                // thenMoveTo: (JSON.parse(passedStageData.json)).thenMoveTo,
                // elseMoveTo: (JSON.parse(passedStageData.json)).elseMoveTo,
                filterId: passedStageData.filterId,
                recrIds: passedStageData.recrIds,
                recrNames: passedStageData.recrNames
            }
            :
            {
                json: [
                    // {
                    //     stageId: "",
                    //     fieldValue: "",
                    //     compare: "",
                    //     condition: "&&",
                    //     compareValue: "",
                    //     fieldType: "",
                    //     isShown: true
                    // }
                ],
                // thenMoveTo: "",
                // elseMoveTo: "",
                filterId: "0",
                recrIds: "",
                recrNames: ""
            }
        ,
        validationSchema: filterSchema,
        onSubmit: () => {
            // if (values.userName === "admin" && values.password === "12345678") {
            // }
            setIsFormSubmitted(true);
            // console.log(values);
            // alert('SUCCESS!! :-)\n\n' + JSON.stringify(values, null, 4));
        },

    });
    const loadTypeAndValue = (val: string, i: number) => {
        if (val) {
            let tempStageCards = [...filterStagesList.current];
            let stageIdIndex = tempStageCards.findIndex(x => x.stageId === val);
            if (stageIdIndex !== -1) {
                let stageTypeId = stageTypeIdsObj.current[Number(val)];
                let tempConditions = [
                    ...filterFormik.values.json
                ];
                tempConditions[i].stageId = val;
                tempConditions[i].fieldValue = (stageTypeId === "8") ? "Webinar" : "Scheduling";
                tempConditions[i].fieldType = "radio";
                filterFormik.setFieldValue('json', tempConditions);
            }

            loadStageData(val, i, false);
        }
    }
    const loadStageData = (val: string, i: number, toGetQuestion: boolean) => {
        if (val) {

            let tempStageCards = [...filterStagesList.current];

            let stageIdIndex = tempStageCards.findIndex(x => x.stageId === val);
            if (stageIdIndex !== -1) {
                let stageTypeId = stageTypeIdsObj.current[Number(val)];
                if ((stageTypeId === "12") || (stageTypeId === "3")) {
                    trackPromise(
                        ApiService.getByParams(193, 'Curately/Workflow/workflow_filter_stages_data.jsp', { stageId: val, stageTypeId: stageTypeId }).then((response: any) => {
                            if (stageTypeId === "12") {
                                if (response.data.assessments && response.data.assessments.length) {
                                    let tempAssessments = response.data.assessments;
                                    for (let ta = 0; ta < tempAssessments.length; ta++) {
                                        if (tempAssessments[ta].assessmentsId === "JB-0WE9SVBRK") {
                                            tempAssessments[ta].assessmentType = "TTWordsPerMinute";
                                            tempAssessments[ta].assessmentsId = "JB-0WE9SVBRK&&TTWordsPerMinute";
                                        }
                                        else if (tempAssessments[ta].assessmentsId === "JB-AAJAZ4K91") {
                                            tempAssessments[ta].assessmentType = "Excel16Percentile";
                                            tempAssessments[ta].assessmentsId = "JB-AAJAZ4K91&&Excel16Percentile";
                                        }
                                        else if (tempAssessments[ta].assessmentsId === "JB-GHBP3ZY6N") {
                                            tempAssessments[ta].assessmentType = "Word16Percentile";
                                            tempAssessments[ta].assessmentsId = "JB-GHBP3ZY6N&&Word16Percentile";
                                        }
                                        else if (tempAssessments[ta].assessmentsId === "JB-HTELNQ8LF") {
                                            if (tempAssessments[ta].assessmentType !== "EPPPercentMatch") {
                                                tempAssessments[ta].assessmentsId = "JB-HTELNQ8LF&&GAMEPercentile";
                                                tempAssessments[ta].assessmentType = "GAMEPercentile";
                                                let tempObj = { ...tempAssessments[ta] };
                                                tempObj.assessmentType = "EPPPercentMatch";
                                                tempObj.assessmentsId = "JB-HTELNQ8LF&&EPPPercentMatch";
                                                tempAssessments.splice(ta + 1, 0, tempObj);
                                            }
                                        }
                                        else if (tempAssessments[ta].assessmentsId === "JB-TS406IM8D") {
                                            tempAssessments[ta].assessmentsId = "JB-TS406IM8D&&TenKeyAccuracy";
                                            tempAssessments[ta].assessmentType = "TenKeyAccuracy";
                                        }
                                        else if (tempAssessments[ta].assessmentsId === "JB-XDXQ65RS1") {
                                            tempAssessments[ta].assessmentsId = "JB-XDXQ65RS1&&CLIKRanking";
                                            tempAssessments[ta].assessmentType = "CLIKRanking";
                                        }
                                        // else {
                                        //     tempAssessments[ta].assessmentType = ""
                                        // }

                                    }
                                    formDetails.current[i] = {
                                        ...formDetails.current[i],
                                        assessments: tempAssessments,
                                        questionSelectedId: "",
                                        questionType: "",
                                        questionValues: [],
                                        questionArray: []
                                    }
                                } else {
                                    showToaster('No Assessments are assigned to this Stage.', 'error');
                                }
                            } else if (stageTypeId === "3") {
                                if (response.data.formName && response.data.formId) {
                                    // console.log(JSON.parse(response.data.json).components);
                                    let componentData = JSON.parse(response.data.json).components;
                                    if (JSON.parse(response.data.json).curately) {
                                        for (let cd = 0; cd < componentData.length; cd++) {
                                            // componentData[cd].name = "name_" + componentData[cd].id;
                                            componentData[cd].name = componentData[cd].id;
                                            componentData[cd].Type = componentData[cd].inputType;
                                            // (componentData[cd].Type === "email") = componentData[cd].inputType;
                                            // componentData[cd].choicesToDisplay = componentData[cd].inputType;
                                            // if()
                                            if (componentData[cd].choices) {
                                                for (let cho = 0; cho < componentData[cd].choices.length; cho++) {
                                                    if (typeof componentData[cd].choices[cho] === "string" || componentData[cd].choices[cho] instanceof String) {
                                                        componentData[cd].choices[cho] = {
                                                            name: componentData[cd].choices[cho],
                                                            value: componentData[cd].choices[cho]
                                                        }
                                                    } else if (componentData[cd].choices[cho] && componentData[cd].choices[cho].value) {
                                                        componentData[cd].choices[cho].name = componentData[cd].choices[cho].value;
                                                        componentData[cd].choices[cho].value = componentData[cd].choices[cho].id;
                                                    }
                                                }
                                            }
                                            if (componentData[cd].Type === "dropdown") {
                                                let tempChoices = [];
                                                if (componentData[cd].options) {
                                                    for (let cho = 0; cho < componentData[cd].options.length; cho++) {
                                                        if (typeof componentData[cd].options[cho] === "string" || componentData[cd].options[cho] instanceof String) {
                                                            tempChoices.push({
                                                                name: componentData[cd].options[cho],
                                                                value: componentData[cd].options[cho]
                                                            })
                                                        }
                                                    }
                                                }
                                                componentData[cd].choices = tempChoices;
                                            }
                                        }
                                    } else {
                                        for (let cd = 0; cd < componentData.length; cd++) {
                                            if (componentData[cd].Type === "radio") {
                                                componentData[cd].choices = (componentData[cd] && componentData[cd].Settings && componentData[cd].Settings[4] && componentData[cd].Settings[4].Possiblevalue) ? componentData[cd].Settings[4]?.Possiblevalue : [];
                                            } else if (componentData[cd].Type === "dropdown") {
                                                componentData[cd].choices = (componentData[cd] && componentData[cd].Settings && componentData[cd].Settings[3] && componentData[cd].Settings[3].Possiblevalue) ? componentData[cd].Settings[3]?.Possiblevalue : [];
                                            }
                                        }
                                    }

                                    formDetails.current[i] = {
                                        ...formDetails.current[i],
                                        name: response.data.formName,
                                        id: response.data.formId,
                                        json: componentData,
                                        questionSelectedId: "",
                                        questionType: "",
                                        questionValues: [],
                                        questionArray: []

                                    }
                                    // updateValue(i, response.data.formId);
                                    // console.log(formDetails.current[i].json);
                                }
                            }
                            if (passedStageData.json) {
                                let tempFilters2 = JSON.parse(passedStageData.json).json;
                                if (i === tempFilters2.length - 1) {
                                    setInitialLoad(true);
                                }
                            }
                            setTimeout(() => {
                                if (toGetQuestion) {
                                    getFormQuestionType(i, false, '');
                                }
                            }, 500);
                        })
                    )
                } else if (stageTypeId === "1") {
                    formDetails.current[i] = {
                        ...formDetails.current[i],
                        states: [...triggerOptions],
                        questionSelectedId: "",
                        questionType: "",
                        questionValues: [],
                        questionArray: []
                    }
                    if (passedStageData.json) {
                        let tempFilters2 = JSON.parse(passedStageData.json).json;
                        if (i === tempFilters2.length - 1) {
                            setInitialLoad(true);
                        }
                    }
                    setTimeout(() => {
                        if (toGetQuestion) {
                            getFormQuestionType(i, false, '');
                        }
                    }, 500);
                } else if ((stageTypeId === "8") || (stageTypeId === "9")) {
                    formDetails.current[i] = {
                        ...formDetails.current[i],
                        states: [],
                        questionSelectedId: "",
                        questionType: "",
                        questionValues: [],
                        questionArray: []
                    }
                    if (passedStageData.json) {
                        let tempFilters2 = JSON.parse(passedStageData.json).json;
                        if (i === tempFilters2.length - 1) {
                            setInitialLoad(true);
                        }
                    }
                    // setTimeout(() => {
                    //     let tempConditions = [
                    //         ...filterFormik.values.json
                    //     ];
                    //     tempConditions[i].fieldValue = (stageTypeId === "8") ? "Webinar" : "Scheduling";
                    //     filterFormik.setFieldValue('json', tempConditions);
                    // }, 100);
                    setTimeout(() => {
                        if (toGetQuestion) {
                            getFormQuestionType(i, false, '');
                        }
                    }, 500);
                }
            }
        } else {
            let tempFilters3 = JSON.parse(passedStageData.json).json;
            if (i === tempFilters3.length - 1) {
                setInitialLoad(true);
            }
        }
    }

    const loadStagesList = () => {
        if (workflowData.workflowId) {
            trackPromise(
                ApiService.getByParams(193, 'Curately/Workflow/workflow_filter_stages_candidates.jsp', { workflowId: workflowData.workflowId }).then((response: any) => {
                    if (response.data.stages && response.data.stages.length) {
                        filterStagesList.current = response.data.stages.filter((stage: StageInterface) => { return stage.stageTypeId !== "1" });
                        stageTypeIdsObj.current = response.data.stages.reduce(
                            (obj: any, item: FilterStageInterface) => Object.assign(obj, { [item.stageId]: item.stageTypeId }), {}
                        );

                        // console.log(stageTypeIdsObj.current);

                        // getStageData(response.data.stages[0]);
                        if (!passedStageData.filterId && passedStageData.filterId !== "0") {
                            setInitialLoad(true);
                        } else if (passedStageData.json) {
                            let tempFilters7 = JSON.parse(passedStageData.json).json;
                            for (let tf = 0; tf < tempFilters7.length; tf++) {
                                loadStageData(tempFilters7[tf].stageId, tf, true);
                            }
                            // }

                            if (!tempFilters7.length) {
                                setInitialLoad(true);
                            }
                        }
                    } else {
                        showToaster('No Stages found on this Workflow to create Filters', 'error');
                    }
                    // console.log(response);
                })
            );
        }
    }


    const addNewCondition = () => {
        let tempConditions = [
            ...filterFormik.values.json
        ];
        tempConditions.push({
            stageId: "",
            fieldValue: "",
            compare: "",
            condition: "&&",
            compareValue: "",
            fieldType: "",
            isShown: true
        });
        formDetails.current.push({
            name: '',
            id: '',
            json: [],
            assessments: [],
            states: [],
            questionSelectedId: "",
            questionType: "",
            questionValues: [],
            questionArray: []
        })
        filterFormik.setFieldValue('json', tempConditions)
    }

    const removeCondition = (i: number) => {
        // let tempFormDetails = [...formDetails.current];
        let tempConditions = [
            ...filterFormik.values.json
        ];
        tempConditions.splice(i, 1);
        // for (let tc = 0; tc < tempConditions.length; tc++) {
        //     tempConditions[tc].isShown = false;
        // }
        removeIndex.current = i;
        // isSaveOpened.current = false;

        // tempFormDetails.splice(removeIndex.current, 1);
        // formDetails.current = [...tempFormDetails];

        filterFormik.setFieldValue('json', tempConditions);

        // removeIndex.current = -1;
        // saveFilterForm();
    }
    const getNameOfSelect = (i: number, val: string, name: string) => {
        if (val) {
            if (name === "stageId") {
                let stage = filterStagesList.current.find(x => x.stageId === val);
                return (stage && stage.title) ? stage.title : (stage && stage.name) ? stage.name : "";
            }
            else if (name === "stages") {
                let stage = stagesList.find(x => x.stageId === val);
                return (stage && stage.title) ? stage.title : (stage && stage.name) ? stage.name : "";
            }
            else if (name === "fieldValue" && formDetails.current && formDetails.current[i] && filterFormik.values.json && filterFormik.values.json[i]) {
                if (stageTypeIdsObj.current[Number(filterFormik.values.json[i].stageId)] === "1") {
                    if (formDetails.current[i].states) {
                        let state: any = formDetails.current[i].states.find((x: any) => x.id === val);
                        return (state && state?.name) ? state?.name : "";
                    }
                    else {
                        return "";
                    }
                }
                if (stageTypeIdsObj.current[Number(filterFormik.values.json[i].stageId)] === "12") {
                    if (formDetails.current[i].assessments) {
                        let assessment: any = formDetails.current[i].assessments.find((x: any) => x.assessmentsId === val);
                        return (assessment && assessment?.name) ? assessment?.name : "";
                    }
                    else {
                        return "";
                    }
                }
                if (stageTypeIdsObj.current[Number(filterFormik.values.json[i].stageId)] === "3") {
                    if (formDetails.current[i].json) {
                        let question: any = formDetails.current[i].json.find((x: any) => x.name === val);
                        return (question && question?.labelName) ? question?.labelName : "";
                    }
                    else {
                        return "";
                    }
                }
            } else {
                return "";
            }
        } else {
            return "";
        }
    }

    const saveFilterForm = () => {
        setIsFormSubmitted(true);
        // console.log(filterFormik.values);
        if (filterFormik.isValid) {
            if (filterFormik.values.json.length) {
                // let tempJson = (json) ? json : { ...filterFormik.values };
                let tempJson = { ...filterFormik.values };
                let tempFormDetails = [...formDetails.current];
                if (removeIndex.current !== -1) {
                    tempFormDetails.splice(removeIndex.current, 1);
                    tempJson.json.splice(removeIndex.current, 1);
                    removeIndex.current = -1;
                }
                for (let tj = 0; tj < tempJson.json.length; tj++) {
                    if (tempJson.json[tj].stageId) {
                        tempJson.json[tj].stageTypeId = stageTypeIdsObj.current[Number(tempJson.json[tj].stageId)];
                    }
                    tempJson.json[tj].isShown = false;
                    if ((tempJson.json[tj].stageTypeId === "1") && tempJson.json[tj].compareValue && tempJson.json[tj].compareValue.length) {
                        tempJson.json[tj].compareValue = Array.isArray(tempJson.json[tj].compareValue) ? tempJson.json[tj].compareValue : tempJson.json[tj].compareValue.split(',');
                        tempJson.json[tj].compareValue = tempJson.json[tj].compareValue.filter(Boolean).join();
                    } else if (tempJson.json[tj].stageTypeId === "3") {
                        tempJson.json[tj].formId = tempFormDetails[tj].id;
                    }
                }
                filterFormik.setFieldValue('json', tempJson.json);

                let dataToPass = JSON.parse(JSON.stringify(tempJson.json));

                for (let tj = 0; tj < dataToPass.length; tj++) {
                    if (dataToPass[tj].stageTypeId === "12") {
                        if (dataToPass[tj].fieldValue && dataToPass[tj].fieldValue.startsWith("JB-") && dataToPass[tj].fieldValue.split('&&').length > 1) {
                            let tempFieldValue = dataToPass[tj].fieldValue.split('&&');
                            dataToPass[tj].fieldValue = tempFieldValue[0];
                            dataToPass[tj].assessmentType = tempFieldValue[1];
                        }
                    }
                }
                // console.log(tempJson);
                let tempData = {
                    filterId: (filterFormik.values.filterId) ? filterFormik.values.filterId : "0",
                    currentStageId: currentStageId,
                    json: dataToPass,
                    workflow_job_id: workflowData.workflow_job_id,
                    recrId: userLocalData.getvalue('recrId'),
                    recrIds: filterFormik.values.recrIds,
                    clientId: userLocalData.getvalue('clientId')
                }
                // console.log(tempData);
                // console.log(JSON.stringify(tempData));
                trackPromise(
                    ApiService.postWithData('233seq', 'DemoAutomation/workflowFilters', tempData).then((response: any) => {
                        // console.log(response.data);
                        updateShowValue(false);
                        if (response.data.Success) {
                            setJsonToDisplayConditions(tempJson.json);
                            // showToaster(`Filters have been saved.`, 'success');
                            if (response.data.resultList && response.data.resultList.length) {
                                setFilteredCandidateCount(response.data.resultList.length);
                                sendCandIds(response.data.resultList);
                            } else {
                                showToaster('No Candidates with this filter', 'error');
                            }
                        } else {
                            showToaster(response.data.message, 'error');
                        }
                    })
                );
            } else {
                showToaster('At least One Condition is required. ', 'error');
            }
        } else {
            if (removeIndex.current !== -1) {
                let tempFormDetails = [...formDetails.current];
                let tempJson = { ...filterFormik.values };
                tempJson.json.splice(removeIndex.current, 1);
                tempFormDetails.splice(removeIndex.current, 1);
                removeIndex.current = -1;
                for (let tj = 0; tj < tempJson.json.length; tj++) {
                    if (tempJson.json[tj].stageId) {
                        tempJson.json[tj].stageTypeId = stageTypeIdsObj.current[Number(tempJson.json[tj].stageId)];
                    }
                    tempJson.json[tj].isShown = false;
                }
                filterFormik.setFieldValue('json', tempJson.json);
                formDetails.current = [...tempFormDetails];
                saveFilterForm();
            } else {
                showToaster('Please enter all required Fields', 'error');
            }
        }
    }

    const getFormQuestionType = (i: number, bool: boolean, fieldValue: string) => {
        console.log(fieldValue);

        let tempConditions = [
            ...filterFormik.values.json
        ];
        if (fieldValue) {
            tempConditions[i].fieldValue = fieldValue;
        }
        let tempFieldValue = filterFormik.values.json[i].fieldValue;
        if (formDetails.current[i] && filterFormik.values.json[i].fieldValue) {
            formDetails.current[i].questionSelectedId = tempFieldValue;
            if (stageTypeIdsObj.current[Number(filterFormik.values.json[i].stageId)] === "3" && formDetails.current[i] && formDetails.current[i].id) {
                // console.log(formDetails.current[i].json);
                let result: any = formDetails.current[i].json.find((obj: any) => {
                    return obj.name === filterFormik.values.json[i].fieldValue
                })
                formDetails.current[i].questionType = result ? result?.Type : "";
                // choices
                if (formDetails.current[i].questionType === "radio") {
                    // formDetails.current[i].questionValues = (result && result.Settings && result.Settings[4] && result.Settings[4].Possiblevalue) ? result.Settings[4]?.Possiblevalue : [];
                    formDetails.current[i].questionValues = result && result.choices ? result.choices : [];
                } else if (formDetails.current[i].questionType === "dropdown") {
                    formDetails.current[i].questionValues = result && result.choices ? result.choices : [];
                    // formDetails.current[i].questionValues = (result && result.Settings && result.Settings[3] && result.Settings[3].Possiblevalue) ? result.Settings[3]?.Possiblevalue : [];
                } else {
                    formDetails.current[i].questionValues = [];
                }
                if (bool) {
                    tempConditions[i].fieldType = formDetails.current[i].questionType;
                }
            } else if (stageTypeIdsObj.current[Number(filterFormik.values.json[i].stageId)] === "1") {
                if (bool) {
                    if (fieldValue === "1") {
                        tempConditions[i].fieldType = "dropdown";
                    } else if (fieldValue === "1") {
                        tempConditions[i].fieldType = "number";
                    } else {
                        tempConditions[i].fieldType = "";
                    }
                }
            } else if ((stageTypeIdsObj.current[Number(filterFormik.values.json[i].stageId)] === "8") || (stageTypeIdsObj.current[Number(filterFormik.values.json[i].stageId)] === "9")) {
                if (bool) {
                    tempConditions[i].fieldType = "radio";
                }
            }
            else {
                if (formDetails.current[i]) {
                    formDetails.current[i].questionType = "";
                    if (bool) {
                        tempConditions[i].fieldType = formDetails.current[i].questionType;
                    }
                }
            }
        } else {
            if (formDetails.current[i]) {
                formDetails.current[i].questionType = "";
                if (bool) {
                    tempConditions[i].fieldType = formDetails.current[i].questionType;
                }
            }
        }
        if ((stageTypeIdsObj.current[Number(filterFormik.values.json[i].stageId)] === "8") || (stageTypeIdsObj.current[Number(filterFormik.values.json[i].stageId)] === "9")) {
            tempConditions[i].fieldType = "radio";
            tempConditions[i].fieldValue = (stageTypeIdsObj.current[Number(filterFormik.values.json[i].stageId)] === "8") ? "Webinar" : "Scheduling";
        }
        filterFormik.setFieldValue('json', tempConditions);
    }


    const checkFormQuestionType = (i: number) => {
        if (stageTypeIdsObj.current[Number(filterFormik.values.json[i].stageId)] === "8" || stageTypeIdsObj.current[Number(filterFormik.values.json[i].stageId)] === "9") {
            return "radio";
        } else if (filterFormik.values.json[i] && filterFormik.values.json[i].fieldValue) {
            let tempFieldValue = filterFormik.values.json[i].fieldValue;

            if (stageTypeIdsObj.current[Number(filterFormik.values.json[i].stageId)] === "1") {
                return (filterFormik.values.json[i].fieldValue === "1") ? "dropdown" : filterFormik.values.json[i].fieldValue === 2 ? "number" : "";
            } else if (stageTypeIdsObj.current[Number(filterFormik.values.json[i].stageId)] === "12") {
                if (filterFormik.values.json[i].fieldValue === "JB-XDXQ65RS1") {
                    return "dropdown"
                } else {
                    return "number"
                }
            } else if (formDetails.current[i] && filterFormik.values.json[i].fieldValue) {
                formDetails.current[i].questionSelectedId = tempFieldValue;
                if (stageTypeIdsObj.current[Number(filterFormik.values.json[i].stageId)] === "3" && formDetails.current[i] && formDetails.current[i].id) {
                    // console.log(formDetails.current[i].json);
                    let result: any = formDetails.current[i].json.find((obj: any) => {
                        return obj.name === filterFormik.values.json[i].fieldValue
                    })
                    return result ? result?.Type : "";
                } else {
                    if (formDetails.current[i]) {
                        return "";
                    }
                }
            } else {
                if (formDetails.current[i]) {
                    return "";
                }
            }
        } else {
            return "";
        }
    }
    const getCompareDropDownValues = (i: number) => {
        // console.log(i);
        // let temp = [
        //     { value: "=", name: "is equal to" },
        //     { value: ">=", name: "is equal or greater than" },
        //     { value: "!=", name: "is not equal to" },
        //     { value: "<=", name: "is equal and less than" },
        //     { value: "<", name: "is less than" },
        //     { value: ">", name: "is greater than" },
        //     { value: "**", name: "contains" }
        // ]
        switch (checkFormQuestionType(i)) {
            case "number":
                return [
                    { value: "=", name: "is equal to" },
                    { value: "!=", name: "is not equal to" },
                    { value: "<", name: "is lower than" },
                    { value: ">", name: "is greater than" },
                    { value: "<=", name: "is lower or equal to" },
                    { value: ">=", name: "is greater or equal than" },
                    // { value: "**", name: "contains" }
                ];
            case "date":
                return [
                    { value: "=", name: "is on" },
                    { value: "!=", name: "is not on" },
                    { value: "<", name: "is before" },
                    { value: ">", name: "is after" },
                    { value: "<=", name: "is before or on" },
                    { value: ">=", name: "is after or on" },
                    // { value: "**", name: "contains" },
                ];

            case "checkbox":
            case "radio":
            case "dropdown":
                return [
                    { value: "=", name: "is" },
                    { value: "!=", name: "is not" },
                    // { value: "<", name: "is lower than" },
                    // { value: ">", name: "is greater than" },
                    // { value: "<=", name: "is lower or equal to" },
                    // { value: ">=", name: "is greater or equal than" },
                    // { value: "**", name: "contains" },
                ];
            case "textarea":
            case "text":
            default:
                return [
                    { value: "=", name: "is equal to" },
                    { value: "!=", name: "is not equal to" },
                    // { value: "<", name: "begins with" },
                    // { value: ">", name: "ends with" },
                    { value: "**", name: "contains" },
                    { value: "!*", name: "does not contain" },
                    // { value: ">=", name: "is greater or equal than" },
                ];
        }
    }

    const getCompareDropDownText = (i: number, selectedValue: string) => {
        let tempArray = getCompareDropDownValues(i);
        let obj = tempArray.find(o => o.value === selectedValue);

        return obj ? obj.name ? obj.name : "" : "";
    }

    const updateShowValue = (val: boolean) => {
        if (!isSaveOpened.current || !val) {
            isSaveOpened.current = val;
            // saveSelectedIndex.current = i;
            let tempConditions = [
                ...filterFormik.values.json
            ];
            // tempConditions[i].isShown = val;
            filterFormik.setFieldValue('json', tempConditions)
        }
    }

    useEffect(() => {
        // thenElseObj.current = {
        //     thenMoveTo: (passedStageData.filterId && (JSON.parse(passedStageData.json))) ? (JSON.parse(passedStageData.json)).thenMoveTo : "",
        //     elseMoveTo: (passedStageData.filterId && (JSON.parse(passedStageData.json))) ? (JSON.parse(passedStageData.json)).elseMoveTo : ""
        // };
        if (initialRender.current) {
            initialRender.current = false;
        } else {
            loadStagesList();
        }  
        console.log('check load');
    }, []);


    return <div className='FilterStage'>
        {/* <Card className='FilterStage customCard p-0 my-3 mr-5' sx={{ minHeight: "50px !important" }}>
        <CardContent className='py-2'> */}

        {
            (initialLoad) ?
                <Grid>
                    <Button
                        variant="text"
                        color="primary"
                        size='small'
                        startIcon={<TuneIcon />}
                        className={`ml-5 tt-none`}
                        onClick={() => updateShowValue(true)}
                        title={`Add Condition`}
                    // sx={{ width: 350 }}
                    >
                        Filter Candidates
                    </Button>
                    {
                        filteredCandidateCount ?
                            <Badge badgeContent={filteredCandidateCount} color="error" className='mr-4 ml-2' />
                            :
                            null
                    }
                    {/* {
                            jsonToDisplayConditions?.length ? null :
                                
                        } */}

                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        className='d-none'
                    >

                        <Grid className={`editGridFilter p-2 `} onClick={() => updateShowValue(true)} sx={{ display: 'inline-flex' }}>
                            <span className='editFilter'>
                                {
                                    filterFormik.values.recrNames && jsonToDisplayConditions?.length ?
                                        <span>Recruiters: {filterFormik.values.recrNames}</span>
                                        :
                                        null
                                }
                                {
                                    jsonToDisplayConditions?.length ?
                                        jsonToDisplayConditions.map(
                                            (condition: any, i: number) => {

                                                return (
                                                    <div key={`displayCondition${i}`}>
                                                        <Grid container
                                                            direction="row"
                                                            justifyContent="flex-start"
                                                            alignItems="center"
                                                            className='my-3 '
                                                            sx={{ display: 'inline-block' }}
                                                        >
                                                            {
                                                                (i === 0) ?
                                                                    <Grid sx={{ width: '65px', display: 'inline-block' }} className='pt-5 pl-3 ifText'>
                                                                        {/* If */}
                                                                    </Grid>
                                                                    :
                                                                    <Typography variant='body1' sx={{ width: '65px', display: 'inline-block' }} className={`pl-3 ${(jsonToDisplayConditions[i - 1].condition) ? '' : 'd-none'}`}>
                                                                        {(jsonToDisplayConditions[i - 1].condition === "&&") ? "AND" : "OR"}
                                                                    </Typography>
                                                            }
                                                            <span className={`pr-3 fw-6 ${getNameOfSelect(i, jsonToDisplayConditions[i].stageId, "stageId") === "Assessment" ? 'mr-5 ' : ''} ${(jsonToDisplayConditions[i].stageId) ? '' : 'd-none'}`}>
                                                                {getNameOfSelect(i, jsonToDisplayConditions[i].stageId, "stageId")}
                                                            </span>
                                                            <span className={`pr-3 ${(jsonToDisplayConditions[i].fieldValue) ? '' : 'd-none'}`}>
                                                                <span className='pr-4 c-grey fw-6'> - </span>{getNameOfSelect(i, jsonToDisplayConditions[i].fieldValue, "fieldValue")}
                                                            </span>
                                                            <span className={`pr-3 c-grey ${(jsonToDisplayConditions[i].compare) ? '' : 'd-none'}`}>
                                                                {getCompareDropDownText(i, jsonToDisplayConditions[i].compare)}
                                                            </span>
                                                            <span className={`pl-3 ${(jsonToDisplayConditions[i].compareValue) ? '' : 'd-none'}`}>
                                                                {jsonToDisplayConditions[i].compareValue}
                                                            </span>
                                                        </Grid>


                                                    </div>
                                                )
                                            })
                                        :
                                        null
                                }
                            </span>

                            {
                                // filterFormik.values.json?.length 
                                jsonToDisplayConditions?.length ?
                                    <IconButton
                                        aria-label="Edit"
                                        className='editIcon pl-4 py-0'
                                        onClick={() => updateShowValue(true)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    :
                                    null
                            }
                        </Grid>
                        <Grid>
                            {
                                // filterFormik.values.json?.length 
                                jsonToDisplayConditions?.length ?
                                    <Button
                                        aria-label="Cancel"
                                        className='pl-4 py-0'
                                        onClick={() => {
                                            setJsonToDisplayConditions([]);
                                            sendCandIds([]);
                                        }}
                                        variant='outlined'
                                        color='secondary'
                                    >
                                        Clear
                                    </Button>
                                    :
                                    null
                            }
                        </Grid>
                    </Grid>
                    <Dialog open={isSaveOpened.current} className='filterDialog' maxWidth={'sm'}
                        sx={{
                            '.MuiDialog-container.MuiDialog-scrollPaper': {
                                justifyContent: 'end',
                                alignItems: 'start',
                                '& .MuiDialog-paper': {
                                    maxHeight: 'calc(100vh)'
                                },
                                '& .MuiPaper-root': {
                                    margin: 0
                                }
                            }
                        }}
                    >
                        <DialogTitle className='py-2'>
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <span className='pr-2'>Filter Candidates </span>
                                <span onClick={() => updateShowValue(false)} className="closePopup">
                                    <CloseIcon />
                                </span>
                            </Grid>
                        </DialogTitle>
                        <Divider />
                        <DialogContent className='dialogContent'>

                            <Formik
                                onSubmit={saveFilterForm}
                                initialValues={filterFormik.initialValues}
                                enableReinitialize
                            >
                                {
                                    ({ }) => (
                                        <Form
                                            placeholder={<></>}
                                        >
                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                            >

                                            </Grid>
                                            <div className='mb-3'>
                                                <div>
                                                    <MUIAutoComplete
                                                        id='recruiter'
                                                        handleChange={(id: any, name: string) => {
                                                            filterFormik.setFieldValue('recrNames', (name));
                                                            filterFormik.setFieldValue('recrIds', (id));
                                                            //setAutoCompleteValue(id);
                                                        }}
                                                        valuePassed={(filterFormik.values.recrIds) ? { label: filterFormik.values.recrNames, id: filterFormik.values.recrIds } : {}}
                                                        isMultiple={true}
                                                        width="100%"
                                                        type='id'
                                                        placeholder="Recruiter Name"
                                                    />
                                                    <FieldArray
                                                        name="json"
                                                    >
                                                        {
                                                            ({ }) => (
                                                                <div>
                                                                    {
                                                                        filterFormik.values.json.map(
                                                                            (condition: any, i: number) => {

                                                                                return (
                                                                                    <Grid container spacing={1} key={`condition${i}`} className={`mb-4 pt-2 ${(i === 0) ? 'mt-4' : ''}`} sx={{ backgroundColor: '#f1f5fa', boxShadow: 'none' }}>

                                                                                        {/* {
                                                                                            (i === 0) ?
                                                                                                <Grid sx={{ width: '100px' }} className='pt-5 ifText'>
                                                                                                    If
                                                                                                </Grid>
                                                                                                :
                                                                                                null

                                                                                        } */}

                                                                                        <Grid 
                                                                                            size="grow"
                                                                                            className={`mt-2 `}
                                                                                        // sx={{ maxWidth: 'calc(100% - 145px) !important' }}
                                                                                        >

                                                                                            <Grid
                                                                                                container
                                                                                                direction="column"
                                                                                                justifyContent="flex-start"
                                                                                                alignItems="start"
                                                                                                rowSpacing={1}
                                                                                            >
                                                                                                <Grid
                                                                                                    container
                                                                                                    direction="row"
                                                                                                    justifyContent="space-between"
                                                                                                    alignItems="start"
                                                                                                >

                                                                                                    <Grid sx={{ width: '100px' }} className={`${(i === filterFormik.values.json.length - 1) ? 'v-hidden' : ''}`}>
                                                                                                        <ToggleButtonGroup
                                                                                                            color="primary"
                                                                                                            value={condition.condition}
                                                                                                            exclusive
                                                                                                            onChange={(e, val) => { filterFormik.setFieldValue(`json[${i}].condition`, val) }}
                                                                                                            aria-label="condition"
                                                                                                            size='small'
                                                                                                        >
                                                                                                            <ToggleButton value="&&">AND</ToggleButton>
                                                                                                            <ToggleButton value="||" sx={{ width: 40 }}>OR</ToggleButton>
                                                                                                        </ToggleButtonGroup>
                                                                                                        {/* <TextField
                                                                                                            size='small'
                                                                                                            id={`condition${i}`}
                                                                                                            select
                                                                                                            value={condition.condition}
                                                                                                            onChange={filterFormik.handleChange}
                                                                                                            name={`json[${i}].condition`}
                                                                                                            fullWidth
                                                                                                            defaultValue={"&&"}
                                                                                                            className='conditionInput'
                                                                                                        >
                                                                                                            <MenuItem value="&&" selected>AND</MenuItem>
                                                                                                            <MenuItem value="||">OR</MenuItem>
                                                                                                        </TextField> */}
                                                                                                    </Grid>

                                                                                                    <Grid size="auto" sx={{ width: '45px' }}>
                                                                                                        <IconButton onClick={(e) => removeCondition(i)}
                                                                                                            className={`${(filterFormik.values.json.length === 1) ? 'd-none' : ''}`}>
                                                                                                            <RemoveCircleOutlineIcon className='c-red' />
                                                                                                        </IconButton>
                                                                                                    </Grid>
                                                                                                </Grid>
                                                                                                <Grid sx={{ width: 330 }}>
                                                                                                    <TextField
                                                                                                        size='small'
                                                                                                        id={`stageId${i}`}
                                                                                                        select
                                                                                                        value={condition.stageId}
                                                                                                        onChange={
                                                                                                            (e) => {
                                                                                                                loadTypeAndValue(e.target.value, i);
                                                                                                                // filterFormik.handleChange(e);
                                                                                                                // loadStageData(e.target.value, i, false);
                                                                                                            }
                                                                                                        }
                                                                                                        name={`json[${i}].stageId`}
                                                                                                        fullWidth
                                                                                                        label="Stage"
                                                                                                    >

                                                                                                        <MenuItem value=""></MenuItem>
                                                                                                        {
                                                                                                            filterStagesList.current.map(
                                                                                                                (stage: any, i: number) => {
                                                                                                                    return <MenuItem value={stage.stageId} key={stage.stageId}>{(stage.title) ? stage.title : stage.name}</MenuItem>
                                                                                                                }
                                                                                                            )
                                                                                                        }
                                                                                                    </TextField>
                                                                                                    <ErrorMessage formikObj={filterFormik} name={`json`} array={[i + "", 'stageId']} isFormSubmitted={isFormSubmitted} />
                                                                                                </Grid>
                                                                                                <Grid sx={{ width: 330 }}
                                                                                                    className={`${(filterFormik.values.json[i].stageId) ? '' : 'd-none'}`}
                                                                                                >

                                                                                                    <TextField
                                                                                                        size='small'
                                                                                                        id={`fieldValue${i}`}
                                                                                                        select
                                                                                                        value={condition.fieldValue}
                                                                                                        // (stageTypeIdsObj.current[Number(filterFormik.values.json[i].stageId)] === "8") ? "Webinar" : (stageTypeIdsObj.current[Number(filterFormik.values.json[i].stageId)] === "9") ? "Scheduling" : condition.fieldValue
                                                                                                        onChange={
                                                                                                            (e) => {
                                                                                                                getFormQuestionType(i, true, e.target.value);
                                                                                                            }
                                                                                                        }
                                                                                                        name={`json[${i}].fieldValue`}
                                                                                                        fullWidth
                                                                                                        label={`${(stageTypeIdsObj.current[Number(filterFormik.values.json[i].stageId)] === "1")
                                                                                                            ? "Trigger" :
                                                                                                            (stageTypeIdsObj.current[Number(filterFormik.values.json[i].stageId)] === "12")
                                                                                                                ? "Assessment" :
                                                                                                                (stageTypeIdsObj.current[Number(filterFormik.values.json[i].stageId)] === "3")
                                                                                                                    ? "Question" : (stageTypeIdsObj.current[Number(filterFormik.values.json[i].stageId)] === "8")
                                                                                                                        ? "Webinar" : (stageTypeIdsObj.current[Number(filterFormik.values.json[i].stageId)] === "9")
                                                                                                                            ? "Scheduling" : ""
                                                                                                            }`}
                                                                                                    // className={}
                                                                                                    >

                                                                                                        <MenuItem value=""></MenuItem>
                                                                                                        {
                                                                                                            (formDetails.current && formDetails.current[i])
                                                                                                                ?
                                                                                                                stageTypeIdsObj.current[Number(filterFormik.values.json[i].stageId)] === "12" ?
                                                                                                                    (formDetails.current[i].assessments) ? formDetails.current[i].assessments.map(
                                                                                                                        (assessment: any, i: number) => {
                                                                                                                            return <MenuItem value={assessment.assessmentsId} key={assessment.assessmentsId}>{assessment.name} {(assessment.assessmentType) ? `(${assessment.assessmentType})` : ""}</MenuItem>
                                                                                                                        }
                                                                                                                    )
                                                                                                                        :
                                                                                                                        null
                                                                                                                    :
                                                                                                                    (stageTypeIdsObj.current[Number(filterFormik.values.json[i].stageId)] === "3" && formDetails.current[i] && formDetails.current[i].id)
                                                                                                                        ?
                                                                                                                        (formDetails.current[i].json) ? formDetails.current[i].json.map(
                                                                                                                            (form: any, i: number) => {
                                                                                                                                return <MenuItem value={form.name} key={form.name}>{form.labelName}</MenuItem>
                                                                                                                            }
                                                                                                                        ) : null
                                                                                                                        :
                                                                                                                        (stageTypeIdsObj.current[Number(filterFormik.values.json[i].stageId)] === "1") ?
                                                                                                                            formDetails.current[i].states ? formDetails.current[i].states.map(
                                                                                                                                (state: any, i: number) => {
                                                                                                                                    return <MenuItem value={state.id} key={state.id}>{state.name}</MenuItem>
                                                                                                                                }
                                                                                                                            ) : null
                                                                                                                            :
                                                                                                                            (stageTypeIdsObj.current[Number(filterFormik.values.json[i].stageId)] === "8") ?
                                                                                                                                <MenuItem value={"Webinar"} selected={true}>Webinar</MenuItem>
                                                                                                                                :

                                                                                                                                (stageTypeIdsObj.current[Number(filterFormik.values.json[i].stageId)] === "9") ?
                                                                                                                                    <MenuItem value={"Scheduling"} selected={true}>Scheduling</MenuItem>
                                                                                                                                    :
                                                                                                                                    null
                                                                                                                :
                                                                                                                null
                                                                                                        }
                                                                                                    </TextField>
                                                                                                    <ErrorMessage formikObj={filterFormik} name={`json`} array={[i + "", 'fieldValue']} isFormSubmitted={isFormSubmitted} />
                                                                                                </Grid>

                                                                                                <Grid sx={{ width: 330 }}
                                                                                                    className={`${(filterFormik.values.json[i].fieldValue || (stageTypeIdsObj.current[Number(filterFormik.values.json[i].stageId)] === "8") || (stageTypeIdsObj.current[Number(filterFormik.values.json[i].stageId)] === "9")) ? '' : 'd-none'}`}
                                                                                                >

                                                                                                    <TextField
                                                                                                        size='small'
                                                                                                        id={`compare${i}`}
                                                                                                        select
                                                                                                        value={condition.compare}
                                                                                                        onChange={filterFormik.handleChange}
                                                                                                        name={`json[${i}].compare`}
                                                                                                        fullWidth
                                                                                                    >
                                                                                                        <MenuItem value={""}></MenuItem>
                                                                                                        {
                                                                                                            getCompareDropDownValues(i).map(
                                                                                                                (item) => {
                                                                                                                    return <MenuItem value={item.value} key={item.value}>{item.name}</MenuItem>
                                                                                                                }
                                                                                                            )
                                                                                                        }
                                                                                                    </TextField>
                                                                                                    <ErrorMessage formikObj={filterFormik} name={`json`} array={[i + "", 'compare']} isFormSubmitted={isFormSubmitted} />
                                                                                                </Grid>
                                                                                                <Grid sx={{ width: 330 }}
                                                                                                    className={`${(filterFormik.values.json[i].compare) ? '' : 'd-none'}`}
                                                                                                >
                                                                                                    {
                                                                                                        (filterFormik.values.json[i].fieldValue === "JB-XDXQ65RS1" && (stageTypeIdsObj.current[Number(filterFormik.values.json[i].stageId)] === "12")) ?
                                                                                                            <TextField
                                                                                                                size='small'
                                                                                                                id={`compareValue${i}`}
                                                                                                                value={condition.compareValue}
                                                                                                                onChange={filterFormik.handleChange}
                                                                                                                name={`json[${i}].compareValue`}
                                                                                                                fullWidth
                                                                                                                select
                                                                                                            >
                                                                                                                <MenuItem value="Proficient">Proficient</MenuItem>
                                                                                                                <MenuItem value="Highly Proficient">Highly Proficient</MenuItem>
                                                                                                                <MenuItem value="Not Proficient">Not Proficient</MenuItem>
                                                                                                            </TextField>
                                                                                                            :
                                                                                                            (filterFormik.values.json[i].fieldType === "number" || (stageTypeIdsObj.current[Number(filterFormik.values.json[i].stageId)] === "12") || ((stageTypeIdsObj.current[Number(filterFormik.values.json[i].stageId)] === "1") && filterFormik.values.json[i].fieldValue === "2")) ?
                                                                                                                <TextField
                                                                                                                    size='small'
                                                                                                                    id={`compareValue${i}`}
                                                                                                                    value={condition.compareValue}
                                                                                                                    onChange={filterFormik.handleChange}
                                                                                                                    name={`json[${i}].compareValue`}
                                                                                                                    fullWidth
                                                                                                                    // label={getFormQuestionType(i, true)}
                                                                                                                    type="number"
                                                                                                                >
                                                                                                                </TextField>
                                                                                                                :
                                                                                                                null
                                                                                                    }
                                                                                                    {
                                                                                                        (filterFormik.values.json[i].fieldType === "text" || filterFormik.values.json[i].fieldType === "textarea") ?
                                                                                                            <TextField
                                                                                                                size='small'
                                                                                                                id={`compareValue${i}`}
                                                                                                                value={condition.compareValue}
                                                                                                                onChange={filterFormik.handleChange}
                                                                                                                name={`json[${i}].compareValue`}
                                                                                                                fullWidth
                                                                                                                // label={getFormQuestionType(i, true)}
                                                                                                                type="text"
                                                                                                            >
                                                                                                            </TextField>
                                                                                                            :
                                                                                                            null
                                                                                                    }

                                                                                                    {
                                                                                                        (filterFormik.values.json[i].fieldType === "email") ?
                                                                                                            <TextField
                                                                                                                size='small'
                                                                                                                id={`compareValue${i}`}
                                                                                                                value={condition.compareValue}
                                                                                                                onChange={filterFormik.handleChange}
                                                                                                                name={`json[${i}].compareValue`}
                                                                                                                fullWidth
                                                                                                                // label={getFormQuestionType(i, true)}
                                                                                                                type="email"
                                                                                                            >
                                                                                                            </TextField>
                                                                                                            :
                                                                                                            null
                                                                                                    }
                                                                                                    {
                                                                                                        (filterFormik.values.json[i].fieldType === "date") ?
                                                                                                            <TextField
                                                                                                                size='small'
                                                                                                                id={`compareValue${i}`}
                                                                                                                value={condition.compareValue}
                                                                                                                onChange={filterFormik.handleChange}
                                                                                                                name={`json[${i}].compareValue`}
                                                                                                                fullWidth
                                                                                                                // label={getFormQuestionType(i, true)}
                                                                                                                type="date"
                                                                                                            >
                                                                                                            </TextField>
                                                                                                            :
                                                                                                            null
                                                                                                    }
                                                                                                    {
                                                                                                        (filterFormik.values.json[i].fieldType === "radio") ?
                                                                                                            <TextField
                                                                                                                size='small'
                                                                                                                id={`compareValue${i}`}
                                                                                                                value={condition.compareValue}
                                                                                                                onChange={filterFormik.handleChange}
                                                                                                                name={`json[${i}].compareValue`}
                                                                                                                fullWidth
                                                                                                                // label={getFormQuestionType(i, true)}
                                                                                                                select
                                                                                                            >
                                                                                                                {
                                                                                                                    (formDetails.current[i] && formDetails.current[i].questionValues) ? formDetails.current[i].questionValues.map(
                                                                                                                        (form: any, i: number) => {
                                                                                                                            return <MenuItem value={form.value} key={form.value}>{form.name}</MenuItem>
                                                                                                                        }
                                                                                                                    )
                                                                                                                        :
                                                                                                                        null
                                                                                                                }
                                                                                                                {
                                                                                                                    (stageTypeIdsObj.current[Number(filterFormik.values.json[i].stageId)] === "8") ?
                                                                                                                        webinarOptions.map((item: string) => {
                                                                                                                            return <MenuItem value={item} key={item}>{item}</MenuItem>
                                                                                                                        })
                                                                                                                        :
                                                                                                                        null
                                                                                                                }
                                                                                                                {
                                                                                                                    (stageTypeIdsObj.current[Number(filterFormik.values.json[i].stageId)] === "9") ?
                                                                                                                        schedulingOptions.map((item: string) => {
                                                                                                                            return <MenuItem value={item} key={item}>{item}</MenuItem>
                                                                                                                        })
                                                                                                                        :
                                                                                                                        null
                                                                                                                }
                                                                                                            </TextField>
                                                                                                            :
                                                                                                            null
                                                                                                    }
                                                                                                    {
                                                                                                        (filterFormik.values.json[i].fieldType === "dropdown") ?
                                                                                                            ((stageTypeIdsObj.current[Number(filterFormik.values.json[i].stageId)] === "12") || (stageTypeIdsObj.current[Number(filterFormik.values.json[i].stageId)] === "3")) ?
                                                                                                                <TextField
                                                                                                                    size='small'
                                                                                                                    id={`compareValue${i}`}
                                                                                                                    value={condition.compareValue}
                                                                                                                    onChange={filterFormik.handleChange}
                                                                                                                    name={`json[${i}].compareValue`}
                                                                                                                    fullWidth
                                                                                                                    // label={getFormQuestionType(i, true)}
                                                                                                                    select
                                                                                                                >
                                                                                                                    {
                                                                                                                        (formDetails.current[i] && formDetails.current[i].questionValues) ? formDetails.current[i].questionValues.map(
                                                                                                                            (form: any, i: number) => {
                                                                                                                                return <MenuItem value={form.value} key={form.value}>{form.name}</MenuItem>
                                                                                                                            }
                                                                                                                        )
                                                                                                                            :
                                                                                                                            null
                                                                                                                    }
                                                                                                                </TextField>
                                                                                                                :
                                                                                                                (stageTypeIdsObj.current[Number(filterFormik.values.json[i].stageId)] === "1") ?
                                                                                                                    <TextField
                                                                                                                        size='small'
                                                                                                                        id={`compareValue${i}`}
                                                                                                                        value={
                                                                                                                            // typeof condition.compareValue === 'string' ? (condition.compareValue.length) ? condition.compareValue.split(',') : [] : condition.compareValue
                                                                                                                            Array.isArray(condition.compareValue) ? condition.compareValue : condition.compareValue.split(',')
                                                                                                                        }
                                                                                                                        onChange={filterFormik.handleChange}
                                                                                                                        name={`json[${i}].compareValue`}
                                                                                                                        fullWidth
                                                                                                                        // label={getFormQuestionType(i, true)}
                                                                                                                        select
                                                                                                                        SelectProps={{
                                                                                                                            multiple: true
                                                                                                                        }}
                                                                                                                    // title={condition.compareValue.join()}
                                                                                                                    >
                                                                                                                        {
                                                                                                                            masterStatesList ? masterStatesList.map(
                                                                                                                                (state: any, i: number) => {
                                                                                                                                    return <MenuItem value={state.id} key={state.id}>{state.label}</MenuItem>
                                                                                                                                }
                                                                                                                            )
                                                                                                                                :
                                                                                                                                null
                                                                                                                        }
                                                                                                                    </TextField>
                                                                                                                    :
                                                                                                                    null
                                                                                                            :
                                                                                                            null
                                                                                                    }

                                                                                                    {
                                                                                                        (filterFormik.values.json[i].fieldType === "checkbox") ?
                                                                                                            <TextField
                                                                                                                size='small'
                                                                                                                id={`compareValue${i}`}
                                                                                                                value={condition.compareValue}
                                                                                                                onChange={filterFormik.handleChange}
                                                                                                                name={`json[${i}].compareValue`}
                                                                                                                fullWidth
                                                                                                                // label={getFormQuestionType(i, true)}
                                                                                                                select
                                                                                                            >
                                                                                                                <MenuItem value={1} key={1}>Is Checked</MenuItem>
                                                                                                                <MenuItem value={0} key={0}>Is Not Checked</MenuItem>
                                                                                                            </TextField>
                                                                                                            :
                                                                                                            null
                                                                                                    }
                                                                                                    <ErrorMessage formikObj={filterFormik} name={`json`} array={[i + "", 'compareValue']} isFormSubmitted={isFormSubmitted} />
                                                                                                </Grid>
                                                                                            </Grid>
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                )
                                                                            }
                                                                        )
                                                                    }
                                                                </div>
                                                            )
                                                        }
                                                    </FieldArray>
                                                    <Grid container spacing={1} className='my-3'>
                                                        <Button variant="text" color="primary" startIcon={<AddCircleOutlineIcon />} onClick={addNewCondition} >
                                                            Add Filter
                                                        </Button>
                                                    </Grid>
                                                </div>
                                            </div>
                                            {/* <Card sx={{ backgroundColor: '#f1f5fa', boxShadow: 'none' }} className='mb-3'>
                                                    <CardContent>
                                                        <Grid container spacing={1}>

                                                            <Grid sx={{ width: '100px' }} className='pt-5 doText'>
                                                                Then
                                                            </Grid>
                                                            <Grid sm={6} md={4} lg={3}
                                                            >
                                                                <TextField
                                                                    size='small'
                                                                    id={`thenMoveTo`}
                                                                    select
                                                                    value={filterFormik.values.thenMoveTo}
                                                                    onChange={filterFormik.handleChange}
                                                                    name={`thenMoveTo`}
                                                                    fullWidth
                                                                    label='Move Applicant to stage'
                                                                >
                                                                    <MenuItem value=""></MenuItem>
                                                                    {stagesList.map(
                                                                        (stage: any, i: number) => {
                                                                            return (stage.stageId !== currentStageId) ?
                                                                                <MenuItem value={stage.stageId} key={stage.stageId}>{(stage.title) ? stage.title : stage.name}</MenuItem>
                                                                                :
                                                                                null
                                                                        }
                                                                    )}
                                                                </TextField>
                                                                <ErrorMessage formikObj={filterFormik} name={`thenMoveTo`} isFormSubmitted={isFormSubmitted} />
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                </Card>
                                                <Card sx={{ backgroundColor: '#f1f5fa', boxShadow: 'none' }} className='mb-3'>
                                                    <CardContent>
                                                        <Grid container spacing={1}>

                                                            <Grid sx={{ width: '100px' }} className='pt-5 doText'>
                                                                Else
                                                            </Grid>
                                                            <Grid sm={6} md={4} lg={3}
                                                            >
                                                                <TextField
                                                                    size='small'
                                                                    id={`elseMoveTo`}
                                                                    select

                                                                    value={filterFormik.values.elseMoveTo}
                                                                    onChange={filterFormik.handleChange}
                                                                    name={`elseMoveTo`}
                                                                    fullWidth
                                                                    label='Move Applicant to stage'
                                                                >
                                                                    <MenuItem value=""></MenuItem>
                                                                    {stagesList.map(
                                                                        (stage: any, i: number) => {
                                                                            return (stage.stageId !== currentStageId) ?
                                                                                <MenuItem value={stage.stageId} key={stage.stageId}>{(stage.title) ? stage.title : stage.name}</MenuItem>
                                                                                :
                                                                                null
                                                                        }
                                                                    )}
                                                                </TextField>
                                                                <ErrorMessage formikObj={filterFormik} name={`elseMoveTo`} isFormSubmitted={isFormSubmitted} />
                                                            </Grid>

                                                        </Grid>
                                                    </CardContent>
                                                </Card> */}
                                        </Form>
                                    )}
                            </Formik >

                        </DialogContent>
                        <Divider />
                        <DialogActions>
                            <Grid
                                container
                                direction="row"
                                justifyContent="flex-end"
                                alignItems="center"
                            >
                                <Button
                                    color="primary"
                                    variant='contained'
                                    type="submit"
                                    className='mt-3 mr-2'
                                    size="small"
                                    onClick={saveFilterForm}
                                // startIcon={<SaveIcon />}
                                >
                                    Apply
                                </Button>

                                <Button
                                    color="primary"
                                    variant='outlined'
                                    type="button"
                                    className='mt-3 mr-2'
                                    size="small"
                                    onClick={() => updateShowValue(false)}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                        </DialogActions>
                    </Dialog>
                </Grid>
                :
                null
        }
        {/* </CardContent>
            </Card>; */}
    </div>
}

export default FilterStage;