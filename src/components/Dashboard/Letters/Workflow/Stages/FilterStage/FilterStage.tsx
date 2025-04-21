import { useParams } from 'react-router-dom';
import { trackPromise } from '../../../../../../shared/modules/PromiseTrackter';
import { useEffect, useRef, useState } from '../../../../../../shared/modules/React';
import { Card, CardContent } from '../../../../../../shared/modules/MaterialImports/Card';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { FieldArray, Form, Formik, useFormik, Yup } from '../../../../../../shared/modules/Formik';
import { showToaster, TextField, Grid, Button, IconButton } from '../../../../../../shared/modules/commonImports';

import { Dialog, DialogTitle, DialogContent, DialogActions } from '../../../../../../shared/modules/MaterialImports/Dialog';
import { Divider } from '../../../../../../shared/modules/MaterialImports/Divider';
import CloseIcon from '@mui/icons-material/Close';
import ApiService from '../../../../../../shared/api/api';
import { MenuItem } from '../../../../../../shared/modules/MaterialImports/Menu';

import './FilterStage.scss';
import { StageInterface } from '../../Add/AddWorkflow';
import { Typography } from '../../../../../../shared/modules/MaterialImports/Typography';

import SaveIcon from '@mui/icons-material/Save';
import { userLocalData } from '../../../../../../shared/services/userData';
import ErrorMessage from '../../../../../shared/Error/ErrorMessage';
import masterStatesList from '../../../../../../shared/data/States';
// import { MUIAutoComplete } from '../../../../shared/components/MUIAutoComplete/MUIAutoComplete';

export interface FilterStageInterface {
    stageId: string;
    name: string;
    title: string;
    stageTypeId: string;
}

// interface RowData {
//     status: number;
// }

const FilterStage = ({
    stagesList, stageId, passedStageData = {}
}: {
    stagesList: StageInterface[], stageId: string, passedStageData: any
}) => {

    // const [reasonList, setReasonList] = useState<any>([]);
    const [thenRejectLabel, setThenRejectLabel] = useState("");
    const [elseRejectLabel, setElseRejectLabel] = useState("");
    const [reasonDataReject, setReasonDataReject] = useState<any>([]);
    const [reasonDataHold, setReasonDataHold] = useState<any>([]);
    const [thenRejectReasonList, setThenRejectReason] = useState<any>([]);
    const [elseRejectReasonList, setElseRejectReason] = useState<any>([]);

    const [initialLoad, setInitialLoad] = useState(false);

    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    // const initialRender = useRef(true);
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
    ]

    const stageTypeIdsObj = useRef<any>({});
    // const dataCollectionObj = useRef<any>({});
    const isSaveOpened = useRef<boolean>(false);
    //  const saveSelectedIndex = useRef<number>(-1);
    const removeIndex = useRef<number>(-1);


    const { WorkflowId } = useParams();
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
        thenMoveTo: Yup.string().required('Please select Stage to move'),
        elseMoveTo: Yup.string().required('Please select Stage to move'),
        thenReasonId: Yup.string(),
        elseReasonId: Yup.string(),
        filterId: Yup.string()
    })

    // console.log(JSON.parse(passedStageData.json));

    const thenElseObj = useRef({
        thenMoveTo: "",
        elseMoveTo: "",
        thenReasonId: "",
        elseReasonId: ""

    });
    const [jsonToDisplayConditions, setJsonToDisplayConditions] = useState((passedStageData.filterId) ? JSON.parse(passedStageData.json).json : []);
    const filterFormik = useFormik({
        initialValues: (passedStageData.filterId) ?
            {
                json: JSON.parse(passedStageData.json).json,
                thenMoveTo: (JSON.parse(passedStageData.json)).thenMoveTo,
                elseMoveTo: (JSON.parse(passedStageData.json)).elseMoveTo,
                thenReasonId: (JSON.parse(passedStageData.json)).thenReasonId,
                elseReasonId: (JSON.parse(passedStageData.json)).elseReasonId,
                filterId: passedStageData.filterId
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
                thenMoveTo: "",
                elseMoveTo: "",
                thenReasonId: "",
                elseReasonId: "",
                filterId: "0"
            }
        ,
        validationSchema: filterSchema,
        onSubmit: (values) => {
            // if (values.userName === "admin" && values.password === "12345678") {
            // }
            setIsFormSubmitted(true);
            // console.log(values);
            // alert('SUCCESS!! :-)\n\n' + JSON.stringify(values, null, 4));
        },

    })
    const loadStageData = (val: string, i: number, toGetQuestion: boolean) => {
        if (val) {

            let tempStageCards = [...filterStagesList.current];

            let stageIdIndex = tempStageCards.findIndex(x => x.stageId === val);
            if (stageIdIndex !== -1) {
                let stageTypeId = stageTypeIdsObj.current[Number(val)];
                if ((stageTypeId === "12") || (stageTypeId === "3")) {
                    // if (stageTypeId === "12") {
                    // } else
                    // if (stageTypeId === "3" && dataCollectionObj.current.id) {
                    //     console.log(formDetails.current);
                    //     if (formDetails.current[i]) {
                    //         formDetails.current[i] = {
                    //             ...formDetails.current[i],
                    //             name: dataCollectionObj.current.name,
                    //             id: dataCollectionObj.current.id,
                    //             json: JSON.parse(dataCollectionObj.current.json).components,
                    //             questionSelectedId: "",
                    //             questionType: "",
                    //             questionValues: [],
                    //             questionArray: []

                    //         }
                    //     } else {
                    //         formDetails.current.push({
                    //             name: dataCollectionObj.current.name,
                    //             id: dataCollectionObj.current.id,
                    //             json: JSON.parse(dataCollectionObj.current.json).components,
                    //             assessments: [],
                    //             questionSelectedId: "",
                    //             questionType: "",
                    //             questionValues: [],
                    //             questionArray: []
                    //         })
                    //     }
                    //     console.log("log console");
                    //     if (passedStageData.json) {
                    //         let tempFilters1 = JSON.parse(passedStageData.json).json;
                    //         if (i === tempFilters1.length - 1) {
                    //             setInitialLoad(true);
                    //         }
                    //     }
                    //     getFormQuestionType(i, false, '');
                    // } else {
                    trackPromise(
                        ApiService.postWithParams(193, 'Curately/Workflow/workflow_filter_stages_data.jsp', {
                            stageId: val, stageTypeId: stageTypeId,
                            clientId: userLocalData.getvalue('clientId')
                        }).then((response: any) => {
                            if (stageTypeId === "12") {
                                if (response.data.assessments && response.data.assessments.length) {
                                    formDetails.current[i] = {
                                        ...formDetails.current[i],
                                        assessments: response.data.assessments,
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
                                    console.log(JSON.parse(response.data.json).components);
                                    let componentData = JSON.parse(response.data.json).components;
                                    if (JSON.parse(response.data.json).curately) {
                                        for (let cd = 0; cd < componentData.length; cd++) {
                                            componentData[cd].name = componentData[cd].id;
                                            componentData[cd].Type = componentData[cd].inputType;
                                            // (componentData[cd].Type === "email") = componentData[cd].inputType;
                                            // componentData[cd].choicesToDisplay = componentData[cd].inputType;
                                            // ifx()
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
                                            if ((componentData[cd].Type === "dropdown")) {
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
                                            if (componentData[cd].Type === "weighted") {
                                                let tempChoices = [];
                                                if (componentData[cd].choices) {
                                                    for (let cho = 0; cho < componentData[cd].choices.length; cho++) {
                                                        tempChoices.push({
                                                            name: componentData[cd].choices[cho].name,
                                                            value: componentData[cd].choices[cho].name
                                                        })
                                                    }
                                                }
                                                componentData[cd].choices = tempChoices;
                                            }
                                        }
                                    } else {
                                        for (let cd = 0; cd < componentData.length; cd++) {
                                            if (componentData[cd].Type === "radio") {
                                                componentData[cd].choices = (componentData[cd] && componentData[cd].Settings && componentData[cd].Settings[4] && componentData[cd].Settings[4].Possiblevalue) ? componentData[cd].Settings[4]?.Possiblevalue : [];
                                            } else if ((componentData[cd].Type === "dropdown") || (componentData[cd].Type === "weighted")) {
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
                }
            }
        } else {
            let tempFilters3 = JSON.parse(passedStageData.json).json;
            if (i === tempFilters3.length - 1) {
                setInitialLoad(true);
            }
        }
    }
    // const loadDataCollectionObj = (val: string, i: number) => {
    //     if (val) {

    //         let tempStageCards = [...filterStagesList.current];

    //         let stageIdIndex = tempStageCards.findIndex(x => x.stageId === val);
    //         if (stageIdIndex !== -1) {
    //             let stageTypeId = stageTypeIdsObj.current[Number(val)];
    //             trackPromise(
    //                 ApiService.getFilterStagesData(val, stageTypeId).then((response: any) => {
    //                     if (stageTypeId === "3") {
    //                         if (response.data.formName && response.data.formId) {
    //                             formDetails.current[i] = {
    //                                 ...formDetails.current[i],
    //                                 name: response.data.formName,
    //                                 id: response.data.formId,
    //                                 json: JSON.parse(response.data.json).components,
    //                                 questionSelectedId: "",
    //                                 questionType: "",
    //                                 questionValues: [],
    //                                 questionArray: []

    //                             }
    //                             dataCollectionObj.current = {
    //                                 ...formDetails.current[i],
    //                                 name: response.data.formName,
    //                                 id: response.data.formId,
    //                                 json: JSON.parse(response.data.json).components,
    //                                 questionSelectedId: "",
    //                                 questionType: "",
    //                                 questionValues: [],
    //                                 questionArray: []

    //                             }
    //                             // updateValue(i, response.data.formId);
    //                             // console.log(formDetails.current[i].json);
    //                         }
    //                         if (passedStageData.json) {
    //                             let tempFilters4 = JSON.parse(passedStageData.json).json;
    //                             // console.log(tempFilters4);
    //                             for (let tf = 0; tf < tempFilters4.length; tf++) {
    //                                 loadStageData(tempFilters4[tf].stageId, tf, true);
    //                             }
    //                         }
    //                     }
    //                     // console.log(response);
    //                     if (passedStageData.json) {
    //                         let tempFilters5 = JSON.parse(passedStageData.json).json;
    //                         if (i === tempFilters5.length - 1) {
    //                             setInitialLoad(true);
    //                         }
    //                     }
    //                     setTimeout(() => {
    //                         getFormQuestionType(i, false, '');
    //                     }, 500);
    //                 })
    //             )
    //         }
    //     } else {
    //         let tempFilters6 = JSON.parse(passedStageData.json).json;
    //         if (i === tempFilters6.length - 1) {
    //             setInitialLoad(true);
    //         }
    //     }
    // }

    const loadStagesList = () => {
        if (WorkflowId) {
            trackPromise(
                ApiService.getByParams(193, 'Curately/Workflow/workflow_filter_stages.jsp', {
                    workflowId: WorkflowId,
                    clientId: userLocalData.getvalue('clientId')
                }).then((response: any) => {
                    if (response.data.stages && response.data.stages.length) {
                        filterStagesList.current = response.data.stages;
                        stageTypeIdsObj.current = response.data.stages.reduce(
                            (obj: any, item: FilterStageInterface) => Object.assign(obj, { [item.stageId]: item.stageTypeId }), {}
                        );

                        // console.log(stageTypeIdsObj.current);

                        // getStageData(response.data.stages[0]);
                        if (!passedStageData.filterId && passedStageData.filterId !== "0") {
                            setInitialLoad(true);
                        } else if (passedStageData.json) {
                            let tempFilters7 = JSON.parse(passedStageData.json).json;
                            // let result = tempFilters7.find((obj: any) => {
                            //     return obj.stageTypeId === "3"
                            // })
                            // if (result.stageId) {
                            //     let index = tempFilters7.map(function (e: any) {
                            //         return e.stageTypeId;
                            //     }).indexOf('3');
                            //     loadDataCollectionObj(result.stageId, index);
                            // } else {
                            for (let tf = 0; tf < tempFilters7.length; tf++) {
                                loadStageData(tempFilters7[tf].stageId, tf, true);
                            }
                            // }

                            if (!tempFilters7.length) {
                                setInitialLoad(true);
                            }
                        }
                        getReasonsListData();
                    } else {
                        showToaster('No Stages found on this Workflow to create Filters', 'error');
                    }
                    // console.log(response);
                })
            );
        }
    }

    // const updateValue = (i: number, value: string) => {
    //     setTimeout(() => {
    //         let tempConditions = [
    //             ...filterFormik.values.json
    //         ];
    //         tempConditions[i].fieldValue = value;
    //         filterFormik.setFieldValue('json', tempConditions);
    //     }, 250);
    // }

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
                        let question: any = formDetails.current[i].json.find((x: any) => x.name?.toString() === val);
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
                    }
                    if (tempJson.json[tj].stageTypeId === "3") {
                        tempJson.json[tj].fieldValue = "" + tempJson.json[tj].fieldValue;
                    }
                }
                filterFormik.setFieldValue('json', tempJson.json);
                // formDetails.current = [...tempFormDetails];
                // tempJson.thenMoveTo = thenElseObj.current.thenMoveTo;
                // tempJson.elseMoveTo = thenElseObj.current.elseMoveTo;
                console.log(tempJson);
                let tempData = {

                    filterId: (filterFormik.values.filterId) ? filterFormik.values.filterId : "0",
                    stageId: stageId,
                    json: JSON.stringify(tempJson),
                    recrId: userLocalData.getvalue('recrId'),
                    clientId: userLocalData.getvalue('clientId')
                }

                trackPromise(
                    ApiService.postWithData('admin', 'stageFilter', tempData).then((response: any) => {
                        // console.log(tempJson);
                        updateShowValue(false);
                        if (response.data.Success) {
                            setJsonToDisplayConditions(tempJson.json);
                            thenElseObj.current.elseMoveTo = filterFormik.values.elseMoveTo;
                            thenElseObj.current.thenMoveTo = filterFormik.values.thenMoveTo;
                            thenElseObj.current.elseReasonId = filterFormik.values.elseReasonId;
                            thenElseObj.current.thenReasonId = filterFormik.values.thenReasonId;
                            showToaster(`Filters have been saved.`, 'success');
                            // ${(passedStageData.filterId !== "0") ? "updated" : "saved"}
                        } else {
                            showToaster(response.data.Error, 'error');
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
    // const loadOrAnd = () => {
    //     let tempAndOr = (filterFormik.values.json.length && filterFormik.values.json[0].condition) ? filterFormik.values.json[0].condition : "";
    //     for (let oa = 0; oa < filterFormik.values.json.length; oa++) {
    //         const element = filterFormik.values.json[oa].condition;

    //     }
    // }

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
                    if (!formDetails.current[i].questionValues.length && result.fieldType === "yes/no") {
                        formDetails.current[i].questionValues = [
                            { name: "Yes", value: "Yes" },
                            { name: "No", value: "No" }
                        ];
                    }
                } else if ((formDetails.current[i].questionType === "dropdown") || (formDetails.current[i].questionType === "weighted")) {
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
        filterFormik.setFieldValue('json', tempConditions);
    }


    const checkFormQuestionType = (i: number) => {
        if (filterFormik.values.json[i] && filterFormik.values.json[i].fieldValue) {
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
                        return obj.name.toString() === filterFormik.values.json[i].fieldValue.toString()
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
        // let temp = [
        //     { value: "==", name: "is equal to" },
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
                    { value: "==", name: "is equal to" },
                    { value: "!=", name: "is not equal to" },
                    { value: "<", name: "is lower than" },
                    { value: ">", name: "is greater than" },
                    { value: "<=", name: "is lower or equal to" },
                    { value: ">=", name: "is greater or equal than" },
                    // { value: "**", name: "contains" }
                ];
            case "date":
                return [
                    { value: "==", name: "is on" },
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
            case "weighted":
                return [
                    { value: "==", name: "is" },
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
                    { value: "==", name: "is equal to" },
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
        // if (val) {
        //     let tempConditions = [
        //         ...jsonToDisplayConditions
        //     ];
        //     // tempConditions[i].isShown = val;
        //     filterFormik.setFieldValue('json', tempConditions)
        // }
    }
    // saveFilterForm();
    // thenElseObj

    useEffect(() => {
        // if (passedStageData.json && JSON.parse(passedStageData.json) && JSON.parse(passedStageData.json).json) {
        //     let tempJson = JSON.parse(passedStageData.json).json;
        //     for (let tj = 0; tj < tempJson.length; tj++) {
        //         tempJson[tj].isShown = false;
        //     }
        //     passedStageData.json.json = JSON.stringify(tempJson);
        // }
        thenElseObj.current = {
            thenMoveTo: (passedStageData.filterId && (JSON.parse(passedStageData.json))) ? (JSON.parse(passedStageData.json)).thenMoveTo : "",
            thenReasonId: (passedStageData.filterId && (JSON.parse(passedStageData.json))) ? (JSON.parse(passedStageData.json)).thenReasonId : "",
            elseMoveTo: (passedStageData.filterId && (JSON.parse(passedStageData.json))) ? (JSON.parse(passedStageData.json)).elseMoveTo : "",
            elseReasonId: (passedStageData.filterId && (JSON.parse(passedStageData.json))) ? (JSON.parse(passedStageData.json)).elseReasonId : "",
        };
        // if (initialRender.current) {
        //     initialRender.current = false;
        // } else {
        loadStagesList();
        // }
    }, []);

    // const filterActiveStatus = (data: RowData[]) => {
    //     return data.filter(row => row.status === 1);
    // };

    const getReasonsListData = () => {
        let clientId = userLocalData.getvalue('clientId');
        trackPromise(
            //http://35.155.202.216:8080/QADemoCurately/getReasonTypeList/2
            //ApiService.getCall(216, `QADemoCurately/getReasonList/${clientId}`)
            ApiService.getCall('admin', `getReasonList/${clientId}`)
                .then((response: any) => {
                    // setReasonList(response.data.list);                    
                    const reasonRejected = response.data.list.filter((item: any) => (item.reasonTypeId === 50001) && (item.status === 1));
                    // const reasonRejectedActive = filterActiveStatus(reasonRejected)
                    setReasonDataReject(reasonRejected);
                    const reasonHold = response.data.list.filter((item: any) => (item.reasonTypeId === 50002) && (item.status === 1));
                    // const reasonRejectedHold = filterActiveStatus(reasonHold)
                    setReasonDataHold(reasonHold);

                    if (thenElseObj.current.thenMoveTo) {
                        if (stagesList.length) {
                            let value = thenElseObj.current.thenMoveTo
                            let tempObj = stagesList.find(obj => {
                                return obj.stageId === value
                            });
                            if ((tempObj?.stageTypeId === "7") || tempObj?.stageTypeId === "6") {
                                setThenRejectLabel((tempObj?.name) ? tempObj?.name + " Reason" : "")
                            } else {
                                setThenRejectLabel("")
                            }
                            if (tempObj?.stageTypeId === "7") {
                                setThenRejectReason(reasonHold);
                            }
                            if (tempObj?.stageTypeId === "6") {
                                setThenRejectReason(reasonRejected);
                                (tempObj.name);
                                // setElseRejectLabel(tempObj.name)

                            }
                        }
                    }
                    if (thenElseObj.current.elseMoveTo) {
                        if (stagesList.length) {
                            let value = thenElseObj.current.elseMoveTo;
                            let tempObj = stagesList.find(obj => {
                                return obj.stageId === value
                            });
                            if ((tempObj?.stageTypeId === "7") || tempObj?.stageTypeId === "6") {
                                setElseRejectLabel((tempObj?.name) ? tempObj?.name + " Reason" : "")
                            } else {
                                setElseRejectLabel("")
                            }
                            if (tempObj?.stageTypeId === "7") {
                                setElseRejectReason(reasonHold);
                            }
                            if (tempObj?.stageTypeId === "6") {
                                setElseRejectReason(reasonRejected);
                                (tempObj.name);
                            }
                        }
                    }
                }
                )
        )
    }

    return <Card className='FilterStage'>
        <CardContent>

            {
                (initialLoad) ?
                    <Grid>
                        {
                            jsonToDisplayConditions?.length ?
                                null
                                :
                                <Button
                                    variant="text"
                                    color="primary"
                                    startIcon={<AddCircleOutlineIcon />}
                                    className={`mb-4 fs-16 fw-7 tt-none addButton`}
                                    onClick={() => updateShowValue(true)}
                                    title={`Add Condition`}
                                    sx={{ width: 350 }}
                                >
                                    Add a Condition
                                </Button>
                        }
                        <Grid className={`editGrid_filter`} onClick={() => updateShowValue(true)} sx={{ display: 'inline-flex' }}>
                            <span className='editFilter'>

                                {/* {
                                    filterFormik.values.json?.length ?
                                        <Grid container spacing={1} className='mb-3'>
                                            <Grid size="auto">
                                                <span className='ifText'>IF</span>
                                            </Grid>
                                            <Grid size="grow">
                                                <Divider className='mt-3' />
                                            </Grid>
                                        </Grid>
                                        :
                                        null
                                } */}
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
                                                                        If
                                                                    </Grid>
                                                                    :
                                                                    <Typography variant='body1' sx={{ width: '65px', display: 'inline-block' }} className={`pl-3 ${(jsonToDisplayConditions[i - 1].condition) ? '' : 'd-none'}`}>
                                                                        {(jsonToDisplayConditions[i - 1].condition === "&&") ? "AND" : "OR"}
                                                                    </Typography>
                                                            }
                                                            {/* <Grid
                                                                className={`${(i === jsonToDisplayConditions.length - 1) ? 'd-none' : ''}`}
                                                            >
                                                            </Grid> */}
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
                                {
                                    (jsonToDisplayConditions?.length && thenElseObj.current.thenMoveTo && thenElseObj.current.thenMoveTo !== "0") ?
                                        <Grid className='my-3'>
                                            {/* <Grid container spacing={1} className='mb-3'>
                                                <Grid size="auto">
                                                    <span className='doText'>THEN</span>
                                                </Grid>
                                                <Grid size="grow">
                                                    <Divider className='mt-3' />
                                                </Grid>
                                            </Grid> */}
                                            <Grid sx={{ width: '65px', display: 'inline-block' }} className='pt-5 doText'>
                                                THEN
                                            </Grid>
                                            <Typography variant='body1' sx={{ display: 'inline-block' }}>
                                                <span className='pr-4'> Move Applicant to </span>
                                                {getNameOfSelect(0, thenElseObj.current.thenMoveTo, "stages")}
                                            </Typography>
                                        </Grid>
                                        :
                                        null
                                }
                                {
                                    (jsonToDisplayConditions?.length && thenElseObj.current.elseMoveTo && thenElseObj.current.elseMoveTo !== "0") ?
                                        <Grid className='my-3'>
                                            {/* <Grid container spacing={1} className='mb-3'>
                                                <Grid size="auto">
                                                    <span className='doText'>ELSE</span>
                                                </Grid>
                                                <Grid size="grow">
                                                    <Divider className='mt-3' />
                                                </Grid>
                                            </Grid> */}
                                            <Grid sx={{ width: '65px', display: 'inline-block' }} className='pt-5 doText'>
                                                ELSE
                                            </Grid>
                                            <Typography variant='body1' sx={{ display: 'inline-block' }}>
                                                <span className='pr-4'> Move Applicant to </span>
                                                {getNameOfSelect(0, thenElseObj.current.elseMoveTo, "stages")}
                                            </Typography>
                                        </Grid>
                                        :
                                        null
                                }
                            </span>
                            <span className='pl-5'>
                                {
                                    filterFormik.values.json?.length ?
                                        <IconButton
                                            aria-label="Edit"
                                            className='editIcon'
                                            onClick={() => updateShowValue(true)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        :
                                        null
                                }
                            </span>
                        </Grid>
                        <Dialog open={isSaveOpened.current} className='filterDialog' maxWidth={'lg'}>
                            <DialogTitle className='py-2'>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <span className='pr-2'>Filter Stage </span>
                                    <span onClick={() => updateShowValue(false)} className="closePopup">
                                        <CloseIcon />
                                    </span>
                                </Grid>
                            </DialogTitle>
                            <Divider />
                            <DialogContent className='dialogContent'>
                                {/* ${(filterFormik.values.json[i].isShown) ? '' : 'd-none'} */}

                                <Formik
                                    onSubmit={saveFilterForm}
                                    initialValues={filterFormik.initialValues}
                                    enableReinitialize
                                >
                                    {
                                        ({
                                            // errors, values, touched, setFieldValue, handleChange 
                                        }) => (
                                            <Form >
                                                {/* placeholder={""} */}
                                                <Grid
                                                    container
                                                    direction="row"
                                                    justifyContent="space-between"
                                                    alignItems="center"
                                                >
                                                    {/* <Typography variant="h6">Filter stage</Typography>
                                                            <Button
                                                        color="primary"
                                                        variant='contained'
                                                        type="submit"
                                                        className='mt-3 mr-2'
                                                        size="small"
                                                        // onClick={saveFilterForm}
                                                        startIcon={<SaveIcon />}
                                                    >
                                                        {(filterFormik.values.filterId !== "0") ? "Update" : "Save"}
                                                    </Button> */}

                                                </Grid>
                                                {/* <Grid container spacing={1} className='mb-3'>
                                                    <Grid size="auto">
                                                        <span className='ifText'>IF</span>
                                                    </Grid>
                                                    <Grid size="grow">
                                                        <Divider className='mt-3' />
                                                    </Grid>
                                                </Grid> */}
                                                <Card sx={{ backgroundColor: '#f1f5fa', boxShadow: 'none' }} className='mb-3'>
                                                    <CardContent>
                                                        <FieldArray
                                                            name="json"
                                                        >
                                                            {
                                                                ({
                                                                    // push, remove
                                                                }) => (
                                                                    <div>
                                                                        {
                                                                            filterFormik.values.json.map(
                                                                                (condition: any, i: number) => {

                                                                                    return (
                                                                                        <Grid container spacing={1} key={`condition${i}`} className='mb-4'>

                                                                                            {
                                                                                                (i === 0) ?
                                                                                                    <Grid sx={{ width: '100px' }} className='pt-5 ifText'>
                                                                                                        If
                                                                                                    </Grid>
                                                                                                    :
                                                                                                    null

                                                                                            }
                                                                                            <Grid sx={{ width: '100px' }} className={`pt-2 ${(i === 0) ? 'ml-n100' : ''} ${(i === filterFormik.values.json.length - 1) ? 'v-hidden' : ''}`}>
                                                                                                <TextField
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
                                                                                                </TextField>
                                                                                            </Grid>
                                                                                            <Grid
                                                                                                size="grow"
                                                                                                className={`mt-2 `}
                                                                                                sx={{ maxWidth: 'calc(100% - 145px) !important' }}
                                                                                            >
                                                                                                <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                                                                                    {/*  sm={6} md={4}  */}
                                                                                                    <Grid sx={{ width: 180 }}>
                                                                                                        <TextField
                                                                                                            size='small'
                                                                                                            id={`stageId${i}`}
                                                                                                            select
                                                                                                            value={condition.stageId}
                                                                                                            onChange={
                                                                                                                (e) => {
                                                                                                                    filterFormik.handleChange(e);
                                                                                                                    loadStageData(e.target.value, i, false);
                                                                                                                }
                                                                                                            }
                                                                                                            name={`json[${i}].stageId`}
                                                                                                            fullWidth
                                                                                                            label="Stage"
                                                                                                        >

                                                                                                            <MenuItem value=""></MenuItem>
                                                                                                            {
                                                                                                                /* <MenuItem value="1">Data Collection</MenuItem>
                                                                                                                <MenuItem value="2">Assessment</MenuItem>
                                                                                                                <MenuItem value="3">Webinar</MenuItem> */
                                                                                                            }
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
                                                                                                    {/*  sm={6} md={4}  */}
                                                                                                    <Grid sx={{ width: 180 }}
                                                                                                        className={`${(filterFormik.values.json[i].stageId) ? '' : 'd-none'}`}
                                                                                                    >

                                                                                                        <TextField
                                                                                                            size='small'
                                                                                                            id={`fieldValue${i}`}
                                                                                                            select
                                                                                                            value={condition.fieldValue}
                                                                                                            onChange={
                                                                                                                (e) => {
                                                                                                                    // filterFormik.handleChange(e)
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
                                                                                                                        ? "Question" : ""
                                                                                                                }`}
                                                                                                        >

                                                                                                            <MenuItem value=""></MenuItem>
                                                                                                            {
                                                                                                                (formDetails.current && formDetails.current[i])
                                                                                                                    ?
                                                                                                                    stageTypeIdsObj.current[Number(filterFormik.values.json[i].stageId)] === "12" ?
                                                                                                                        (formDetails.current[i].assessments) ? formDetails.current[i].assessments.map(
                                                                                                                            (assessment: any, i: number) => {
                                                                                                                                return <MenuItem value={assessment.assessmentsId} key={assessment.assessmentsId}>{assessment.name}</MenuItem>
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
                                                                                                                                null
                                                                                                                    :
                                                                                                                    null
                                                                                                            }
                                                                                                        </TextField>
                                                                                                        <ErrorMessage formikObj={filterFormik} name={`json`} array={[i + "", 'fieldValue']} isFormSubmitted={isFormSubmitted} />
                                                                                                    </Grid>
                                                                                                    {
                                                                                                        /* 
                                                                                                        <Grid sm={6} md={4} lg={3}>
                 
                                                                                                        <TextField
                                                                                                            size='small'
                                                                                                            id={`fieldValue${i}`}
                                                                                                            select
                                                                                                            value={condition.fieldValue}
                                                                                                            onChange={filterFormik.handleChange}
                                                                                                            name={`json[${i}].fieldValue`}
                                                                                                            fullWidth
                                                                                                        >
                 
                                                                                                            <MenuItem value=""></MenuItem>
                                                                                                            {
                                                                                                                (stageTypeIdsObj.current[Number(filterFormik.values.json[i].stageId)] === "3" && formDetails.current[i].id !== "")
                                                                                                                    ?
                                                                                                                    formDetails.current[i].json.map(
                                                                                                                        (form: any, i: number) => {
                                                                                                                            return <MenuItem value={form.name} key={form.name}>{form.labelName}</MenuItem>
                                                                                                                        }
                                                                                                                    )
                                                                                                                    :
                                                                                                                    null
                                                                                                            }
                                                                                                        </TextField>
                                                                                                        </Grid> 
                                                                                                        */
                                                                                                    }

                                                                                                    <Grid sx={{ width: 180 }}
                                                                                                        className={`${(filterFormik.values.json[i].fieldValue) ? '' : 'd-none'}`}
                                                                                                    >
                                                                                                        {/* {
                                                                                                            (stageTypeIdsObj.current[Number(filterFormik.values.json[i].stageId)] === "3" && formDetails.current[i] && formDetails.current[i].id) ? */}

                                                                                                        <TextField
                                                                                                            size='small'
                                                                                                            id={`compare${i}`}
                                                                                                            select
                                                                                                            value={condition.compare}
                                                                                                            onChange={filterFormik.handleChange}
                                                                                                            name={`json[${i}].compare`}
                                                                                                            fullWidth
                                                                                                        >
                                                                                                            {
                                                                                                                /*
                                                                                                                (checkFormQuestionType(i) === "number") 
                                                                                                                (checkFormQuestionType(i) === "text")
                                                                                                                (checkFormQuestionType(i) === "date")
                                                                                                                (checkFormQuestionType(i) === "textarea")
                                                                                                                (checkFormQuestionType(i) === "radio")
                                                                                                                (checkFormQuestionType(i) === "dropdown")
                                                                                                                (checkFormQuestionType(i) === "checkbox")
                                                                                                                */
                                                                                                            }
                                                                                                            <MenuItem value={""}></MenuItem>
                                                                                                            {
                                                                                                                getCompareDropDownValues(i).map(
                                                                                                                    (item) => {
                                                                                                                        return <MenuItem value={item.value} key={item.value}>{item.name}</MenuItem>
                                                                                                                    }
                                                                                                                )
                                                                                                            }
                                                                                                            {/* {
                                                                                                                (['number', 'checkbox', "text", "date", "textarea", "radio", "dropdown"].includes(checkFormQuestionType(i))) ?
                                                                                                                    <MenuItem value={"=="}>is equal to</MenuItem>
                                                                                                                    :
                                                                                                                    null
                                                                                                            }
                                                                                                            {
                                                                                                                (['number'].includes(checkFormQuestionType(i))) ?
                                                                                                                    <MenuItem value={">="}>is equal or greater than</MenuItem>
                                                                                                                    :
                                                                                                                    null
                                                                                                            }
                                                                                                            {
                                                                                                                (['number'].includes(checkFormQuestionType(i))) ?
                                                                                                                    <MenuItem value={"!="}>is not equal to</MenuItem>
                                                                                                                    :
                                                                                                                    null
                                                                                                            }
                                                                                                            {
                                                                                                                (['number'].includes(checkFormQuestionType(i))) ?
                                                                                                                    <MenuItem value={"<="}>is equal and less than</MenuItem>
                                                                                                                    :
                                                                                                                    null
                                                                                                            }
                                                                                                            {
                                                                                                                (['number'].includes(checkFormQuestionType(i))) ?
                                                                                                                    <MenuItem value={"<"}>is less than</MenuItem>
                                                                                                                    :
                                                                                                                    null
                                                                                                            }
                                                                                                            {
                                                                                                                (['number'].includes(checkFormQuestionType(i))) ?
                                                                                                                    <MenuItem value={">"}>is greater than</MenuItem>
                                                                                                                    :
                                                                                                                    null
                                                                                                            }
                                                                                                            {
                                                                                                                (['text', 'textarea'].includes(checkFormQuestionType(i))) ?
                                                                                                                    <MenuItem value={"**"}>contains</MenuItem>
                                                                                                                    :
                                                                                                                    null
                                                                                                            } */}
                                                                                                        </TextField>
                                                                                                        {/* :

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
                                                                                                                    <MenuItem value={"=="}>Is Equal</MenuItem>
                                                                                                                    <MenuItem value={">="}>Is Equal or Greater than</MenuItem>
                                                                                                                    <MenuItem value={"!="}>Is Not Equal to</MenuItem>
                                                                                                                    <MenuItem value={"<="}>Is Equal and Less than</MenuItem>
                                                                                                                    <MenuItem value={"<"}>Is Less than</MenuItem>
                                                                                                                    <MenuItem value={">"}>Is Greater than</MenuItem>

                                                                                                                </TextField>
                                                                                                        } */}
                                                                                                        <ErrorMessage formikObj={filterFormik} name={`json`} array={[i + "", 'compare']} isFormSubmitted={isFormSubmitted} />
                                                                                                    </Grid>
                                                                                                    <Grid sx={{ width: 300 }}
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
                                                                                                                    // label={getFormQuestionType(i, true)}
                                                                                                                    select
                                                                                                                >
                                                                                                                    {/* <MenuItem value=""></MenuItem> */}
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
                                                                                                        {/* {
                                                                                                            (filterFormik.values.json[i].fieldType === "textarea") ?
                                                                                                                <TextField
                                                                                                                    size='small'
                                                                                                                    id={`compareValue${i}`}
                                                                                                                    value={condition.compareValue}
                                                                                                                    onChange={filterFormik.handleChange}
                                                                                                                    name={`json[${i}].compareValue`}
                                                                                                                    fullWidth
                                                                                                                    // label={getFormQuestionType(i, true)}
                                                                                                                    type="text"
                                                                                                                    multiline
                                                                                                                    rows={4}
                                                                                                                >
                                                                                                                </TextField>
                                                                                                                :
                                                                                                                null
                                                                                                        } */}
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
                                                                                                                                return <MenuItem value={form.name} key={form.value}>{form.name}</MenuItem>
                                                                                                                            }
                                                                                                                        )
                                                                                                                            :
                                                                                                                            null
                                                                                                                    }
                                                                                                                </TextField>
                                                                                                                :
                                                                                                                null
                                                                                                        }
                                                                                                        {
                                                                                                            ((filterFormik.values.json[i].fieldType === "dropdown") || (filterFormik.values.json[i].fieldType === "weighted")) ?
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
                                                                                                                                Array.isArray(condition.compareValue) ? condition.compareValue : condition.compareValue ? condition.compareValue.toString().split(',') : ""
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

                                                                                                                        // <MUIAutoComplete
                                                                                                                        //     id={`compareValue${i}`}
                                                                                                                        //     handleChange={(id: any, name: string) => {
                                                                                                                        //         console.log(id);
                                                                                                                        //         filterFormik.setFieldValue(`json[${i}].compareValue`, id);
                                                                                                                        //     }}
                                                                                                                        //     valuePassed={(condition.compareValue) ? { label: condition.compareValue, id: condition.compareValue } : {}}
                                                                                                                        //     isMultiple={true}
                                                                                                                        //     textToShow="Select States"
                                                                                                                        //     width="100%"
                                                                                                                        //     type='states'
                                                                                                                        // />
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
                                                                                                {/* <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className='mt-2 mb-3'>
                                                                                                    <Grid lg={3}
                                                                                                    >
                                                                                                    </Grid>
                                                                                                </Grid> */}
                                                                                            </Grid>
                                                                                            {/* ${(filterFormik.values.json[i].isShown) ? 'd-none' : ''} */}
                                                                                            <Grid size="auto" sx={{ width: '45px' }}>
                                                                                                <IconButton onClick={(e) => removeCondition(i)}
                                                                                                    className={`${(filterFormik.values.json.length === 1) ? 'd-none' : ''}`}>
                                                                                                    <RemoveCircleOutlineIcon className='c-red' />
                                                                                                </IconButton>
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
                                                                Add Condition
                                                            </Button>
                                                        </Grid>
                                                    </CardContent>
                                                </Card>
                                                <Card sx={{ backgroundColor: '#f1f5fa', boxShadow: 'none' }} className='mb-3'>
                                                    <CardContent>
                                                        {/* <Grid container spacing={1} className='mb-3'>
                                                            <Grid size="auto">
                                                                <span className='doText'>THEN</span>
                                                            </Grid>
                                                            <Grid size="grow">
                                                                <Divider className='mt-3' />
                                                            </Grid>
                                                        </Grid> */}
                                                        <Grid container spacing={1}>

                                                            <Grid sx={{ width: '100px' }} className='pt-5 doText'>
                                                                Then
                                                            </Grid>
                                                            <Grid size={6}>
                                                                <TextField
                                                                    size='small'
                                                                    id={`thenMoveTo`}
                                                                    select
                                                                    value={filterFormik.values.thenMoveTo}
                                                                    onChange={(e) => {
                                                                        console.log(stagesList);
                                                                        console.log(e.target.value);
                                                                        if (stagesList.length) {
                                                                            let value = (e.target as HTMLInputElement).value;
                                                                            let tempObj = stagesList.find(obj => {
                                                                                return obj.stageId === value
                                                                            });
                                                                            if ((tempObj?.stageTypeId === "7") || tempObj?.stageTypeId === "6") {
                                                                                setThenRejectLabel((tempObj?.name) ? tempObj?.name + " Reason" : "")
                                                                            } else {
                                                                                setThenRejectLabel("")
                                                                            }
                                                                            if (tempObj?.stageTypeId === "7") {
                                                                                setThenRejectReason(reasonDataHold);
                                                                            }
                                                                            if (tempObj?.stageTypeId === "6") {
                                                                                setThenRejectReason(reasonDataReject);
                                                                                (tempObj.name);
                                                                                // setElseRejectLabel(tempObj.name)

                                                                            }
                                                                        }
                                                                        filterFormik.handleChange(e)
                                                                    }}
                                                                    //     (e) => {
                                                                    //         console.log(e);
                                                                    //         thenElseObj.current.thenMoveTo = e.target.value;
                                                                    //         saveFilterForm();
                                                                    //     }
                                                                    // }
                                                                    name={`thenMoveTo`}
                                                                    fullWidth
                                                                    label='Move Applicant to stage'
                                                                >
                                                                    <MenuItem value=""></MenuItem>
                                                                    {stagesList.map(
                                                                        (stage: any, i: number) => {
                                                                            return (stage.stageId !== stageId) ?
                                                                                <MenuItem value={stage.stageId} key={stage.stageId}>{(stage.title) ? stage.title : stage.name}</MenuItem>
                                                                                :
                                                                                null
                                                                        }
                                                                    )}
                                                                </TextField>
                                                                <ErrorMessage formikObj={filterFormik} name={`thenMoveTo`} isFormSubmitted={isFormSubmitted} />
                                                            </Grid>




                                                            <Grid size={6} className={`${thenRejectLabel ? "" : "d-none"}`} >
                                                                <TextField
                                                                    size='small'
                                                                    id={`thenMoveTo`}
                                                                    select
                                                                    //     (e) => {
                                                                    //         console.log(e);
                                                                    //         thenElseObj.current.thenMoveTo = e.target.value;
                                                                    //         saveFilterForm();
                                                                    //     }
                                                                    // }
                                                                    name={`thenMoveTo`}
                                                                    fullWidth
                                                                    label={thenRejectLabel}
                                                                >
                                                                    <MenuItem value=""></MenuItem>
                                                                    {/* {
                                                                        thenRejectReasonList.map((reason: any) => {
                                                                            return <MenuItem value={reason.reasonId} key={reason.reasonId}>{reason.reasonName}</MenuItem>
                                                                        })
                                                                    } */}
                                                                    {
                                                                        thenRejectReasonList.filter((reason: { status: number; }) => reason.status === 1).map((reason: any) => {
                                                                            return <MenuItem value={reason.reasonId} key={reason.reasonId}>{reason.reasonName}</MenuItem>
                                                                        })
                                                                    }
                                                                </TextField>
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                </Card>
                                                <Card sx={{ backgroundColor: '#f1f5fa', boxShadow: 'none' }} className='mb-3'>
                                                    <CardContent>
                                                        {/* <Grid container spacing={1} className='mb-3'>
                                                            <Grid size="auto">
                                                                <span className='doText'>ELSE</span>
                                                            </Grid>
                                                            <Grid size="grow">
                                                                <Divider className='mt-3' />
                                                            </Grid>
                                                        </Grid> */}
                                                        <Grid container spacing={1}>

                                                            <Grid sx={{ width: '100px' }} className='pt-5 doText'>
                                                                Else
                                                            </Grid>
                                                            <Grid size={6} >
                                                                <TextField
                                                                    size='small'
                                                                    id={`elseMoveTo`}
                                                                    select

                                                                    value={filterFormik.values.elseMoveTo}
                                                                    onChange={(e) => {
                                                                        console.log(stagesList);
                                                                        console.log(e.target.value);
                                                                        if (stagesList.length) {
                                                                            let value = (e.target as HTMLInputElement).value;
                                                                            let tempObj = stagesList.find(obj => {
                                                                                return obj.stageId === value
                                                                            });
                                                                            if ((tempObj?.stageTypeId === "7") || tempObj?.stageTypeId === "6") {
                                                                                setElseRejectLabel((tempObj?.name) ? tempObj?.name + " Reason" : "")
                                                                            } else {
                                                                                setElseRejectLabel("")
                                                                            }
                                                                            if (tempObj?.stageTypeId === "7") {
                                                                                setElseRejectReason(reasonDataHold);
                                                                            }
                                                                            if (tempObj?.stageTypeId === "6") {
                                                                                setElseRejectReason(reasonDataReject);
                                                                                (tempObj.name);
                                                                                // setElseRejectLabel(tempObj.name)
                                                                            }
                                                                        }
                                                                        filterFormik.handleChange(e)
                                                                    }}
                                                                    // value={thenElseObj.current.elseMoveTo}
                                                                    // onChange={
                                                                    //     (e) => {
                                                                    //         console.log(e);
                                                                    //         thenElseObj.current.elseMoveTo = e.target.value;
                                                                    //         saveFilterForm();
                                                                    //     }
                                                                    // }
                                                                    name={`elseMoveTo`}
                                                                    fullWidth
                                                                    label='Move Applicant to stage'
                                                                >
                                                                    <MenuItem value=""></MenuItem>
                                                                    {stagesList.map(
                                                                        (stage: any, i: number) => {
                                                                            return (stage.stageId !== stageId) ?
                                                                                <MenuItem value={stage.stageId} key={stage.stageId}>{(stage.title) ? stage.title : stage.name}</MenuItem>
                                                                                :
                                                                                null
                                                                        }
                                                                    )}
                                                                </TextField>
                                                                <ErrorMessage formikObj={filterFormik} name={`elseMoveTo`} isFormSubmitted={isFormSubmitted} />
                                                            </Grid>


                                                            <Grid size={6} className={`${elseRejectLabel ? "" : "d-none"}`} >
                                                                <TextField
                                                                    size='small'
                                                                    id={`elseMoveTo`}
                                                                    select
                                                                    //     (e) => {
                                                                    //         console.log(e);
                                                                    //         thenElseObj.current.thenMoveTo = e.target.value;
                                                                    //         saveFilterForm();
                                                                    //     }
                                                                    // }
                                                                    name={`elseMoveTo`}
                                                                    fullWidth
                                                                    label={elseRejectLabel}
                                                                >
                                                                    <MenuItem value=""></MenuItem>
                                                                    {/* {
                                                                        elseRejectReasonList.map((reason: any) => {
                                                                            return <MenuItem value={reason.reasonId} key={reason.reasonId}>{reason.reasonName}</MenuItem>
                                                                        })
                                                                    } */}
                                                                    {
                                                                        elseRejectReasonList.filter((reason: { status: number; }) => reason.status === 1).map((reason: any) => {
                                                                            return <MenuItem value={reason.reasonId} key={reason.reasonId}>{reason.reasonName}</MenuItem>
                                                                        })
                                                                    }

                                                                </TextField>
                                                            </Grid>

                                                        </Grid>
                                                    </CardContent>
                                                </Card>
                                                {/* <Card className='mb-3'>
                                                    <CardContent>
                                                        <Typography variant='h6'>IF</Typography>
                                                        {
                                                            filterFormik.values.json.map(
                                                                (condition: any, i: number) => {

                                                                    return (
                                                                        <div className='mb-2' key={`displayCondition${i}`}>
                                                                            <Grid container
                                                                                direction="row"
                                                                                justifyContent="flex-start"
                                                                                alignItems="center"
                                                                                className='my-3 '>
                                                                                <Typography variant='body1' className={`pr-5 ${(filterFormik.values.json[i].stageId) ? '' : 'd-none'}`}>
                                                                                    {getNameOfSelect(i, filterFormik.values.json[i].stageId, "stageId")}
                                                                                </Typography>
                                                                                <Typography variant='body1' className={`pr-3 ${(filterFormik.values.json[i].fieldValue) ? '' : 'd-none'}`}>
                                                                                    <span className='pr-4'> - </span>{getNameOfSelect(i, filterFormik.values.json[i].fieldValue, "fieldValue")}
                                                                                </Typography>
                                                                                <Typography variant='body1' className={`pr-3 ${(filterFormik.values.json[i].compare) ? '' : 'd-none'}`}>
                                                                                    {filterFormik.values.json[i].compare}
                                                                                </Typography>
                                                                                <Typography variant='body1' className={`pl-3 ${(filterFormik.values.json[i].compareValue) ? '' : 'd-none'}`}>
                                                                                    {filterFormik.values.json[i].compareValue}
                                                                                </Typography>
                                                                            </Grid>

                                                                            <Grid
                                                                                className={`mb-3 ${(i === filterFormik.values.json.length - 1) ? 'd-none' : ''}`}
                                                                            >
                                                                                <Typography variant='body1' className={`pl-3 ${(filterFormik.values.json[i].condition) ? '' : 'd-none'}`}>
                                                                                    {(filterFormik.values.json[i].condition === "&&") ? "AND" : "OR"}
                                                                                </Typography>
                                                                            </Grid>
                                                                        </div>
                                                                    )
                                                                }
                                                            )
                                                        } */}
                                                {/* {
                                                            (filterFormik.values.thenMoveTo && filterFormik.values.thenMoveTo !== "0") ?
                                                                <Grid className='my-3'>
                                                                    <Typography variant='h6'>THEN</Typography>
                                                                    <Typography variant='body1'>
                                                                        <span className='pr-4'> Move Applicant to </span>
                                                                        {getNameOfSelect(0, filterFormik.values.thenMoveTo, "stages")}
                                                                    </Typography>
                                                                </Grid>
                                                                :
                                                                null
                                                        }
                                                        {
                                                            (filterFormik.values.elseMoveTo && filterFormik.values.elseMoveTo !== "0") ?
                                                                <Grid className='my-3'>
                                                                    <Typography variant='h6'>ELSE</Typography>
                                                                    <Typography variant='body1'>
                                                                        <span className='pr-4'> Move Applicant to </span>
                                                                        {getNameOfSelect(0, filterFormik.values.elseMoveTo, "stages")}
                                                                    </Typography>
                                                                </Grid>
                                                                :
                                                                null
                                                        } 
                                                    </CardContent>
                                                </Card>*/}
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
                                        startIcon={<SaveIcon />}
                                    >
                                        Save
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
        </CardContent>
    </Card >;
}

export default FilterStage;