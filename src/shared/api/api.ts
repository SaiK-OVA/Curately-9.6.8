import axios from 'axios';
import { userLocalData } from '../services/userData';
import { showToaster } from '../modules/commonImports';

export interface IP {
    url: 193 | 171 | 233 | '233seq' | 'CTS' | 'CHAT' | 216 | 2168095 | 214 | 'ova' | 'csr' | 'admin' | 'cxadmin' | 'jd' | 'merge' | 'report' | 'adminonly' | 'beeline' | 'bullhorn' | 'voiceai' | 'ats'
}

// const Url193 = (process.env.NODE_ENV === "development" || window.location.protocol === 'http:') ? "http://52.41.18.83:41088/Accuick_API/" : window.location.origin + "/Accuick_API/";
// // https://app.curately.ai
// // const Url193 = (process.env.NODE_ENV === "development" || window.location.protocol === 'http:') ? "http://52.40.49.193/Accuick_API/" : "https://app.curately.ai/Accuick_API/";

// const Url171 = (process.env.NODE_ENV === "development" || window.location.protocol === 'http:') ? "http://34.208.108.171:41088/Pipl/" : "https://resume.accuick.com/Pipl/";

// const Url233 = (process.env.NODE_ENV === "development" || window.location.protocol === 'http:') ? "http://35.155.228.233:41088/Automation/" : "https://sequence.accuick.com/Automation/";

// const Url233seq = (process.env.NODE_ENV === "development" || window.location.protocol === 'http:') ? "http://35.155.228.233:41088/" : "https://sequence.accuick.com/";

// const Url216 = (process.env.NODE_ENV === "development" || window.location.protocol === 'http:') ? "http://35.155.202.216:8080/" : "https://devapi.cxninja.com/";

// const Url2168095 = (process.env.NODE_ENV === "development" || window.location.protocol === 'http:') ? "http://35.155.202.216:8095/" : "https://qa.ova.work/";
// // /reporting-service/getJobReportData

// const UrlCTS = (process.env.NODE_ENV === "development" || window.location.protocol === 'http:') ? "http://52.34.40.39:8900/CloudTalentApi/api/" : "https://qaapi.cxninja.com/CloudTalentApi/api/";

// const UrlChat = (process.env.NODE_ENV === "development" || window.location.protocol === 'http:') ? "http://52.34.40.39:8900/ChatGPT/" : "https://qaapi.cxninja.com/ChatGPT/";


// // const Url214 = (process.env.NODE_ENV === "development" || window.location.protocol === 'http:') ? "http://52.88.252.214:90/" : "https://api.cxninja.com/";
// // export const Url214 =
// //     (process.env.NODE_ENV === "development" || window.location.protocol === 'http:') ?
// //         (userLocalData.getvalue('clientId') === "2") ?
// //             "http://52.88.252.214:90/DemoCurately/" : "http://52.88.252.214:90/QADemoCurately/" :
// //         (userLocalData.getvalue('clientId') === "2") ?
// //             "https://api.curately.ai/DemoCurately/" : "https://api.curately.ai/QADemoCurately/";
// const Url214 = (process.env.NODE_ENV === "development" || window.location.protocol === 'http:') ? "http://52.88.252.214:90/QADemoCurately/" : "https://api.curately.ai/QADemoCurately/";  // Production - Tomcat



// const UrlOVAURL = (process.env.NODE_ENV === "development" || window.location.protocol === 'http:') ? "http://52.34.40.39:8900/CommonApis/" : "https://www.ova.work/CommonApis/";

// const csrUrl = (process.env.NODE_ENV === "development" || window.location.protocol === 'http:') ? 'http://52.34.40.39:8900/System_Checker/' : 'https://devapi.csrninja.com/System_Checker/'; // dev - Tomcat

// // const adminUrl = (process.env.NODE_ENV === "development" || window.location.protocol === 'http:') ? 'http://52.88.252.214:8095/' : 'https://adminapi.curately.ai/';

// const adminUrl = 'https://adminapi.curately.ai/curatelyAdmin/'; // prod - admin

// const cxAdminUrl = 'https://adminapi.cxninja.com/'; // dev - admin 


export const serverIp = (ip: IP['url']) => {

    let url = "";
    switch (ip) {
        case 193:
            url = import.meta.env.VITE_URL_193 + 'Accuick_API/';
            break;
        case 171:
            url = import.meta.env.VITE_URL_171;
            break;
        case 233:
            url = import.meta.env.VITE_URL_233;
            break;
        case '233seq':
            url = import.meta.env.VITE_URL_233SEQ;
            break;
        case 216:
            url = import.meta.env.VITE_URL_216;
            break;
        case 2168095:
            url = import.meta.env.VITE_URL_2168095;
            break;
        case 'CTS':
            url = import.meta.env.VITE_URL_CTS;
            break;
        case 'CHAT':
            url = import.meta.env.VITE_URL_CHAT;
            break;
        case 214:
            url = import.meta.env.VITE_URL_214;
            break;
        case "ova":
            url = import.meta.env.VITE_URL_OVA;
            break;
        case 'csr':
            url = import.meta.env.VITE_URL_CSR;
            break;
        case 'admin':
            url = import.meta.env.VITE_URL_ADMIN;
            break;
        case 'cxadmin':
            url = import.meta.env.VITE_URL_CXADMIN;
            break;
        case 'jd':
            url = import.meta.env.VITE_URL_JD;
            break;
        case 'merge':
            url = import.meta.env.VITE_URL_MERGE;
            break;
        case 'report':
            url = import.meta.env.VITE_URL_ADMIN_REPORTING;
            break;
        case 'adminonly':
            url = import.meta.env.VITE_URL_ADMIN_ONLY;
            break;
        case 'beeline':
            url = import.meta.env.VITE_URL_BEELINE;
            break;
        case 'bullhorn':
            url = import.meta.env.VITE_URL_BULLHORN;
            break;
        case 'voiceai':
            url = import.meta.env.VITE_URL_VOICEAI;
            break;
        case 'ats':
            url = import.meta.env.VITE_URL_ATS;
            break;





        default:
            break;
    }

    return url;

}

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        // if (token && config.url?.startsWith(import.meta.env.VITE_URL_ADMIN)) {
        //     // config.headers['Authorization'] = `Bearer ${token}`;
        //     config.headers['curately-auth-token'] = token;
        // }
        // if (config.url && !config.url?.endsWith('.jsp')) {
        //     config.headers['Curately-Auth-Token'] = `Testing`;
        // }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);
axios.interceptors.response.use(
    response => {
        return Promise.resolve(response);
    },
    error => {
        const status = error.response ? error.response.status : null;

        if (status === 401) {
            // Handle unauthorized access
        } else if (status === 404) {
            // Handle not found errors
        } else {
            // Handle other errors
        }

        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    response => response,
    error => {
        const status = error.response ? error.response.status : null;

        // console.log(error);

        if (status === 400) {
            showToaster(error.response?.data?.Message ? error.response?.data?.Message : 'Error occured.', 'error');
            // Handle unauthorized access
        } else if (status === 401) {
            showToaster(error.response?.data?.Message ? error.response?.data?.Message : 'Unauthorized Request.', 'error');
            // Handle unauthorized access
        } else if (status === 403) {
            showToaster(error.response?.data?.Message ? error.response?.data?.Message : 'The Request is forbidden.', 'error');
            // Handle Forbidden errors
        } else if (status === 404) {
            showToaster('The Requested API does not exist.', 'error');
            // Handle not found errors
        } else {
            showToaster(error.response?.data?.Message ? error.response?.data?.Message : 'An error occured while fetching data from API.', 'error');
            // Handle other errors
        }
        error.message = error.response?.data?.Message ? error.response?.data?.Message : error.message;

        return Promise.reject(error);
    }
);
class ApiRequests {

    /**
     * Get Method 
     */
    getByParams(
        /**
         * IP address 
         */
        ip: IP['url'],
        /**
         * A string corresponding to the component key.
         * Uses the index of components instead if not provided.
         */
        url: string, data: any
    ) {
        return axios.get(
            serverIp(ip) + url,
            {
                params: {
                    ...data,
                    clientId: userLocalData.getvalue('clientId')
                }
            }
        )
    }

    getCall(
        /**
         * IP address 
         */
        ip: IP['url'],
        /**
         * A string corresponding to the component key.
         * Uses the index of components instead if not provided.
         */
        url: string
    ) {
        return axios.get(
            serverIp(ip) + url
        )
    }

    getCallWithHeaders(
        /**
         * IP address 
         */
        ip: IP['url'],
        /**
         * A string corresponding to the component key.
         * Uses the index of components instead if not provided.
         */
        url: string,
        headers: any
    ) {
        return axios.get(
            serverIp(ip) + url,
            headers
        )
    }

    getById(ip: IP['url'], url: string, id: string | number) {
        // ID will be passed in URL
        return axios.get(
            serverIp(ip) + url + '/' + id
        )
    }

    deleteById(ip: IP['url'], url: string, id: string) {
        // ID will be passed in URL
        return axios.delete(
            serverIp(ip) + url + '/' + id
        )
    }

    postWithData(ip: IP['url'], url: string, data: any) {
        return axios.post(
            serverIp(ip) + url,
            data
        )
    }

    saveReferFriendData(ip: IP['url'], url: string, data: any) {
        return axios.post(
            serverIp(ip) + url,
            data
        )
    }

    getReferFreindData(ip: IP['url'], url: string, id: string | number) {
        // ID will be passed in URL
        return axios.get(
            serverIp(ip) + url + '/' + id
        )
    }



    putWithData(ip: IP['url'], url: string, data: any) {
        return axios.put(
            serverIp(ip) + url,
            data
        )
    }

    postWithFormUrlData(ip: IP['url'], url: string, data: any) {
        return axios.post(
            serverIp(ip) + url,
            data,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        )
    }

    postWithFileData(ip: IP['url'], url: string, data: any) {
        return axios.post(
            serverIp(ip) + url,
            data,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        )
    }

    postWithParams(ip: IP['url'], url: string, data: any) {
        return axios.post(
            serverIp(ip) + url,
            null,
            { params: data },
        )
    }


    postWithHeaders(ip: IP['url'], url: string, data: any, headers: any) {
        return axios.post(
            serverIp(ip) + url,
            data,
            headers
        )
    }

    getFormFields(data: any) {
        return axios.get(
            `${import.meta.env.VITE_URL_ADMIN}workflowAssignedForms/${data.workflowId}/${data.clientId}`
        )
    }

    saveTemplateData(data: any) {
        return axios.post(
            `${import.meta.env.VITE_URL_193}Accuick_API/Curately/Workflow/workflow_documentsigning_save.jsp`,
            data

        )
    }

    saveAuditLog(actionId: number, userId?: number, jsonData?: any) {
        return axios.post(
            `${import.meta.env.VITE_URL_ADMIN}saveAuditLog`,
            {
                actionId: actionId,
                userId: userId ? userId : 0,
                jsonData: jsonData ? jsonData : "",
                clientId: userLocalData.getvalue('clientId'),
                recrId: userLocalData.getvalue('recrId'),
            }
        );
    }



}

export default new ApiRequests();