import { useContext } from "react";
import { useEffect, useState, useCallback } from "../../../../../shared/modules/React";
import { FormStore } from "../../../../../App";
import ApiService from "../../../../../shared/api/api";
import { userLocalData } from "../../../../../shared/services/userData";
import { trackPromise } from "../../../../../shared/modules/PromiseTrackter";
import { showToaster } from "../../../../shared/SnackBar/SnackBar";
import Parsable from "../../../../../shared/utils/Parsable";
import FormContainer from "../../../Letters/Workflow/FormBuilder/forms/FormContainer";
import { debounce } from "lodash";
import JobFormData from "../../../../../shared/data/JobFormData";


// import { shallow } from 'zustand/shallow';
// import useFormBuilderStore, { FORMBUILDER_STATE } from "../../../../../shared/store/FormBuilderStore";


// const formBuilderSelector = (state: FORMBUILDER_STATE) => ({
//     formData: state.formData, 
//     setFormData: state.setFormData
// });

const ModuleForm = ({ moduleName, moduleId }: { moduleName: string, moduleId: number }) => {


    const [formData, setFormData] = useContext(FormStore);
    // const { formData, setFormData } = useFormBuilderStore(formBuilderSelector, shallow); 
    const [isLoaded, setIsLoaded] = useState(false);
    const isCustomFieldDeleteSettingEnabled = (userLocalData.checkSettings(130002) === 6);


    // http://35.155.202.216:8080/QADemoCurately/saveCustomSettings
    const saveFormBuilderData = (formData: any, formName: string) => {

        const labelArray = formData.map((item: any) => { return item.labelName });
        const isDuplicate = labelArray.some(function (item: any, i: number) {
            return labelArray.indexOf(item) !== i
        });

        const tabName = (moduleId === 20001) ? "Job" : (moduleId === 20002) ? "Candidate" : (moduleId === 20039)
            ? "Application Form" : "Contact";
        const listArry = formData.map((item: any) => {
            return {
                "viewfieldName": tabName + " " + item.labelName,
                "dataKey": item.datakey ? item.datakey : ""
            }
        });

        if (isDuplicate) {
            showToaster('Please enter unique question name', 'error');
        } else {
            trackPromise(
                ApiService.postWithData('admin', 'saveCustomSettings', {
                    "moduleId": moduleId,
                    "json": JSON.stringify(formData),
                    "createdBy": userLocalData.getvalue('recrId'),
                    "clientId": userLocalData.getvalue('clientId'),
                    "dataKeys": {
                        "type": (moduleId === 20001) ? "Job" : (moduleId === 20002) ? "Candidate" : (moduleId === 20039)
                            ? "Application Form" : "Contact",
                        "list": listArry
                    }
                })
                    .then((response: any) => {
                        if (response.data?.Success) {
                            showToaster(response.data.Message, 'success');
                        } else {
                            showToaster(response.data.Message ? response.data.Message : 'An error ocurred while saving.', 'error');
                        }
                    })
            )
        }

    }
    const formbuilderCancel = () => {
        // console.log("formbuilderCancel");
    }


    // http://35.155.202.216:8080/QADemoCurately/getCustomSettingsById/402/3
    const getFormData = useCallback(
        debounce(() => {
            setIsLoaded(false);
            trackPromise(
                ApiService.getById('admin', 'getCustomSettingsById', moduleId + "/" + userLocalData.getvalue('clientId'))
                    .then((response: any) => {
                        if (response.data?.Success && response.data?.list?.length && Parsable.isJSON(response.data.list[0].json) && JSON.parse(response.data.list[0].json).length) {

                            setFormData(JSON.parse(response.data.list[0].json));
                        } else {
                            setFormData((moduleId === 20039) ? JobFormData : []);
                        }
                        setIsLoaded(true);
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
        <div>
            {
                isLoaded ?
                    <FormContainer callParentSave={saveFormBuilderData} cancelClicked={formbuilderCancel} formIdPassed={""} formNamePassed={moduleName} isFormBuilder={false} showCancel={false} showSave={true} generateDataKey={true} isCustomFieldDeleteSettingEnabled={isCustomFieldDeleteSettingEnabled} />
                    :
                    null
            }
        </div>
    )
}

export default ModuleForm;