
import { useContext, useEffect, useState } from 'react';
import './AddFormBuilder.scss';
import { userLocalData } from '../../../../../../shared/services/userData';
import { useNavigate, useParams } from 'react-router-dom';
import FormContainer from '../forms/FormContainer';


import ApiService from '../../../../../../shared/api/api';
import { showToaster } from '../../../../../shared/SnackBar/SnackBar';
import { FormStore } from '../../../../../../App';

// import { shallow } from 'zustand/shallow';
// import useFormBuilderStore, { FORMBUILDER_STATE } from '../../../../../../shared/store/FormBuilderStore';


// const formBuilderSelector = (state: FORMBUILDER_STATE) => ({
//     formData: state.formData,
//     setFormData: state.setFormData
// });



const AddFormBuilder = () => {
    const navigate = useNavigate();
    const [formName, setFormName] = useState("");
    const { formId } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const [formData, setFormData] = useContext(FormStore);
    // const { formData, setFormData } = useFormBuilderStore(formBuilderSelector, shallow);

    const saveData = async (data: any, name: string) => {
        // console.log(data)
        let updatedData = data.map((item: any, index: number) => ({
            ...item,
            isActive: index === 0
        }));

        let postData: any = {
            "action": "save",
            "form_name": name,
            "json": {
                components: updatedData,
                curately: true
            },
            "userid": userLocalData.getvalue('recrId'),
            "webFormDesc": "",
            "webformThankContent": "",
            "clientId": userLocalData.getvalue('clientId')
        }
        // console.log(updatedData);

        postData.aliasName = postData.form_name.charAt(0);
        // postData.form_name = "curately_" + formName
        postData.form_name = name;
        if (formId) {
            postData.form_id = formId;
        }
        // let resp = await apiService.saveFormData(postData)
        ApiService.postWithData('admin', 'sequenceFormBuilder', postData)
            .then((response: any) => {
                if (response.data.Success) {
                    let toastMessage = !formId ? "Your form has been saved successfully" : "Your form has been updated successfully";
                    showToaster(toastMessage, 'success');
                    navigate(`/${userLocalData.getvalue('clientName')}/letter/forms/list`);
                    saveAuditLog(4189);
                }
                else{
                    showToaster(response.data.Message, 'error');
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                // alert('Error occurred.', 'error');
            });

    }


    useEffect(() => {
        const fetchFormData = async () => {
            let postData = { "action": "get", "form_id": formId, userid: userLocalData.getvalue('recrId'), clientId: userLocalData.getvalue('clientId') }
            // let response = await ApiService.displayFormData(postData)
            ApiService.postWithData('admin', 'sequenceFormBuilder', postData)
                .then((response: any) => {

                    let form_name = response.data?.form_name;
                    setFormName(form_name);
                    let parsedData = response.data.json.components;
                    let updatedData = parsedData.map((item: any, index: number) => ({
                        ...item,
                        isActive: index === 0
                    }));
                    setFormData(updatedData);
                    setIsLoaded(true);
                    // console.log(response, 'fg', response.data.json.components);
                })
                .catch((error) => {
                    console.error("Error:", error);
                    // alert('Error occurred.', 'error');
                    setIsLoaded(true)
                });


        }
        if (formId) {
            fetchFormData()
        }
        else {
            setIsLoaded(true)
        }

    }, [formId]);

    const saveAuditLog = (id: number) => {
        ApiService.saveAuditLog(id);
    }

    const handleCancel = () => {
        navigate(`/${userLocalData.getvalue('clientName')}/letter/forms/list`);
    }
    return (
        <>
            {isLoaded ?
                <FormContainer callParentSave={saveData} cancelClicked={handleCancel} formIdPassed={(formId) ? formId : ""} formNamePassed={formName} isFormBuilder={true} showSave={true} showCancel={true} />
                :
                null
            }
        </>
    )
}

export default AddFormBuilder;