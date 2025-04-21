import { useContext } from "react";
import { useEffect, useState, useCallback } from "../../../../../shared/modules/React";
import { FormStore } from "../../../../../App";
import ApiService from "../../../../../shared/api/api";
import { userLocalData } from "../../../../../shared/services/userData";
import { trackPromise } from "react-promise-tracker";
import { showToaster } from "../../../../shared/SnackBar/SnackBar";
import Parsable from "../../../../../shared/utils/Parsable";
// import FormContainer from "../../../Letters/Workflow/FormBuilder/forms/FormContainer";
import PreviewComponent from "../../../Letters/Workflow/FormBuilder/Preview/PreviewNew";
// import { shallow } from 'zustand/shallow';

// import useFormBuilderStore, { FORMBUILDER_STATE } from "../../../../../shared/store/FormBuilderStore";

// const formBuilderSelector = (state: FORMBUILDER_STATE) => ({
//     formData: state.formData,
//     setFormData: state.setFormData
// });

import './ModuleFormAnswer.scss';
import { debounce } from "lodash";

const ModuleFormAnswer = ({ moduleName, moduleId, moduleById }: { moduleName: string, moduleId: number, moduleById: number }) => {


    const [formData, setFormData] = useContext(FormStore);
    // const { formData, setFormData } = useFormBuilderStore(formBuilderSelector, shallow);

    const [autoId, setAutoId] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);

    const [formAnswers, setFormAnswers] = useState({});

    // http://35.155.202.216:8080/QADemoCurately/saveorupdatecustomanswers
    const saveFormBuilderData = (formData: any, completeJson: any) => {
        console.log(formData);
        trackPromise(
            ApiService.postWithData(214, 'saveorupdatecustomanswers',
                autoId ? {
                    "autoId": autoId,
                    "moduleId": moduleId,
                    "moduleById": moduleById,
                    "json": JSON.stringify(formData),
                    "completedJson": completeJson,
                    "recrid": userLocalData.getvalue('recrId'),
                    "clientId": userLocalData.getvalue('clientId')
                } : {
                    "moduleId": moduleId,
                    "moduleById": moduleById,
                    "json": JSON.stringify(formData),
                    "completedJson": completeJson,
                    "recrid": userLocalData.getvalue('recrId'),
                    "clientId": userLocalData.getvalue('clientId')
                }
            )
                .then((response: any) => {
                    if (response.data?.Sucess || response.data?.Success) {
                        showToaster(`Form has been ${autoId ? 'updated' : 'saved'} successfully.`, 'success');
                    } else {
                        showToaster(response.data.Message ? response.data.Message : 'An error ocurred while saving.', 'error');
                    }
                })
        )
    }
    // const formbuilderCancel = () => {
    //     // console.log("formbuilderCancel");
    // }


    // http://35.155.202.216:8080/QADemoCurately/getcustomanswers/9/10/3
    const getFormAnswersData = (jsonData: any) => {
        trackPromise(
            ApiService.getById('admin', 'getcustomanswers', moduleId + "/" + moduleById + "/" + userLocalData.getvalue('clientId'))
                .then((response: any) => {
                    setIsLoaded(true);
                    // console.log(response.data);
                    if (response.data?.autoId) {
                        setAutoId(response.data.autoId);
                        if (Parsable.isJSON(response.data.json) && JSON.parse(response.data.json).length) {
                            // console.log(JSON.parse(response.data.json));
                            let tempRespAnswers = JSON.parse(response.data.json);
                            let tempAnswers = {};
                            for (let jd = 0; jd < jsonData.length; jd++) {
                                // answer: "Test"
                                // quesId: "a5d5d1b2-ef7d-470c-bd01-a93109340238"
                                let tempAnswerObj = tempRespAnswers.find((i: { quesId: string }) => i.quesId + "" === jsonData[jd].id + "");
                                if (tempAnswerObj?.quesId) {
                                    if (jsonData[jd].fieldType === 'ssn') {
                                        console.log(tempAnswerObj);
                                        jsonData[jd].actVal = "";
                                        if (tempAnswerObj.answer) {
                                            jsonData[jd].actVal = tempAnswerObj.answer;
                                            let stars = '';
                                            for (let i = 0; i < tempAnswerObj.answer.length; i++) {
                                                stars += '*';
                                            }
                                            // @ts-ignore
                                            tempAnswers[jsonData[jd].id] = stars;

                                        }

                                    } else if (Parsable.isJSON(tempAnswerObj.answer)) {
                                        // @ts-ignore
                                        tempAnswers[jsonData[jd].id] = JSON.parse(tempAnswerObj.answer);
                                    } else {
                                        // @ts-ignore
                                        tempAnswers[jsonData[jd].id] = tempAnswerObj.answer;
                                    }
                                } else {
                                    // @ts-ignore
                                    tempAnswers[jsonData[jd].id] = "";
                                }
                            }
                            setFormAnswers(tempAnswers);
                            setFormData(jsonData);
                            setIsLoaded(true);
                        }
                        // if (response.data?.list?.length && Parsable.isJSON(response.data.list[0].json)) {
                        //     setFormData(JSON.parse(response.data.list[0].json));
                        // } else {
                        //     setFormData([]);
                        // }
                    } else {
                        setFormData(jsonData);
                        setIsLoaded(true);
                    }
                })
        )
    }
    const getFormData = useCallback(
        debounce(() => {
            trackPromise(
                ApiService.getById('admin', 'getCustomSettingsById', moduleId + "/" + userLocalData.getvalue('clientId'))
                    .then((response: any) => {
                        if (response.data?.Success) {
                            // console.log(response.data.list);
                            if (response.data?.list?.length && Parsable.isJSON(response.data.list[0].json)) {
                                getFormAnswersData(JSON.parse(response.data.list[0].json));
                                // console.log(JSON.parse(response.data.list[0].json));
                            } else {
                                setFormData([]);
                                setIsLoaded(true);
                            }
                        }
                    })
            )
        }, 600), []
    );


    useEffect(() => {
        getFormData();
        return () => {
            setFormData([]);
        }
    }, []);



    return (
        <div className="formBuilder">
            {
                isLoaded ?
                    <PreviewComponent formId={""} formNamePassed={""} isPreview={false} saveCandidateData={saveFormBuilderData} isShowOneByOne={false} formAnswers={formAnswers} />
                    :
                    null
            }
        </div>
    )
}

export default ModuleFormAnswer;