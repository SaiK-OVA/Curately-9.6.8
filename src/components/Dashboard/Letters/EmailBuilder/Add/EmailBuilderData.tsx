import { useState, useEffect, useCallback } from "react";



import AddEmailBuilder from "./AddEmailBuilder";
import { userLocalData } from "../../../../../shared/services/userData";
import { trackPromise } from "react-promise-tracker";

import ApiService from '../../../../../shared/api/api';
import { showToaster } from "../../../../shared/SnackBar/SnackBar";
import { debounce } from "@mui/material";


const EmailBuilderData = (
    { templateId, closePopup }: {
        templateId: any; closePopup: () => void
    }
) => {
    // const { templateId } = useParams();

    const [templateDataLoaded, setTemplateDataLoaded] = useState(templateId ? false : true);


    const [templateData, setTemplateData] = useState({
        templateName: "",
        templateId: (templateId) ? templateId : "",
        subject: "",
        description: "",
        jsonFile: "",
        htmlFile: "",
        createdBy: userLocalData.getvalue('recrId'),
        type: 1,
        isActive: true,
        clientId: userLocalData.getvalue('clientId')
    });

    const loadTemplate = useCallback(debounce(() => {
        trackPromise(
            ApiService.getById('admin', 'getEmailBuilderTemplatesListById', (templateId ? templateId : "") + '/' + userLocalData.getvalue('clientId'))
                .then(async (response: any) => {
                    //  console.log(response.data);
                    if (response.data?.list && response.data?.list.length && response.data?.list[0] && response.data.list[0].jsonFile) {
                        // setTemplate(response.data.list[0].jsonFile);
                        // addEmailTemplateFormik.setTouched('')
                        let jsonToParse = response.data.list[0].jsonFile ? fixInvalidJSON(response.data.list[0].jsonFile) : '';
                        setTemplateData({
                            templateName: (response.data.list[0].templateName) ? response.data.list[0].templateName : "",
                            templateId: (templateId) ? templateId : "",
                            subject: (response.data.list[0].subject) ? response.data.list[0].subject : "",
                            description: (response.data.list[0].description) ? response.data.list[0].description : "",
                            jsonFile: jsonToParse,
                            htmlFile: (response.data.list[0].htmlFile) ? response.data.list[0].htmlFile : "",
                            createdBy: userLocalData.getvalue('recrId'),
                            type: 1,
                            isActive: true,
                            clientId: userLocalData.getvalue('clientId')
                        });
                    } else {
                        showToaster('Error loading template', 'error');
                    }
                    setTemplateDataLoaded(true);
                })
                .catch((error) => {
                    console.error("Error:", error);
                    // alert('Error occurred.', 'error');
                })
        )
    }, 400), []
    );

    const fixInvalidJSON = (jsonString: string) => {
        return jsonString.replace(/:\s*"([^"]*<[^>]+>[^"]*)"/g, (match, content) => {

            const escapedContent = content.replace(/(?<!\\)"/g, '\\"');
            return `: "${escapedContent}"`;
        });
    };


    useEffect(() => {
        if (templateId) {
            loadTemplate();
        }
    }, [])


    return <>
        {
            ((templateId && templateDataLoaded) || !templateId)
                ?
                <AddEmailBuilder templateData={templateData} closePopup={closePopup} />
                :
                null
        }
    </>
}
export default EmailBuilderData;