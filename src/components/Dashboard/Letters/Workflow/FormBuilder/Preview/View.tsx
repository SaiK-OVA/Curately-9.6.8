import { useContext, useEffect, useState ,useRef} from "react";
import { useParams } from "react-router-dom";
import PreviewComponent from "./PreviewNew";

import ApiService from '../../../../../../shared/api/api';

import { trackPromise } from "react-promise-tracker";
import { FormStore } from "../../../../../../App";
import { userLocalData } from "../../../../../../shared/services/userData";
import { showToaster } from "../../../../../shared/SnackBar/SnackBar";

// import { shallow } from 'zustand/shallow';
// import useFormBuilderStore, { FORMBUILDER_STATE } from "../../../../../../shared/store/FormBuilderStore";


// const formBuilderSelector = (state: FORMBUILDER_STATE) => ({
//     formData: state.formData,
//     setFormData: state.setFormData
// });

const View = (props: any) => {

    const { formId } = useParams();
    const [formName, setFormName] = useState("");
    const initialRender = useRef(true);
    const [formData, setFormData] = useContext(FormStore);
    // const { formData, setFormData } = useFormBuilderStore(formBuilderSelector, shallow);
    // const [tempFormData, setTempFormData] = useState([]);

    const getFormDetails = async (id: any) => {

        let postData = { "action": "get", "form_id": id, userid: userLocalData.getvalue('recrId'), clientId: userLocalData.getvalue('clientId') }
        try {
            // let response = await ApiService.displayFormData(postData);
            trackPromise(
                ApiService.postWithData('admin', 'sequenceFormBuilder', postData)
                    .then((response: any) => {
                        // console.log(response.data);
                        if (response?.data?.form_name) {
                            // && response?.data?.form_name.startsWith("curately_")) {
                            setFormData((response?.data?.json?.components) ? response?.data?.json?.components : []);
                            props.setFormStore((response?.data?.json?.components) ? response?.data?.json?.components : [])
                            setFormName((response?.data?.form_name) ? response?.data?.form_name : "")
                            // let parsedData = JSON.parse(response.data.json);
                        } else {
                            showToaster('Json not matching', 'error');
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        // alert('Error occurred.', 'error');
                    })
            )
        }
        catch (e) {

        }

    }
    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
        } else {
            getFormDetails(formId);
        }
       
    }, []);


    return (
        (formName && formId) ?
            <PreviewComponent formId={formId} formNamePassed={formName} isPreview={true} saveCandidateData={""} isShowOneByOne={true} />
            :
            null
    )
}
export default View;