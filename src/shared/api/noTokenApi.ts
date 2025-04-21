import axios from 'axios';
import { userLocalData } from '../services/userData';
import { IP, serverIp } from './api';
import { showToaster } from '../modules/commonImports';


axios.interceptors.response.use(
    response => response,
    error => {
        const status = error.response ? error.response.status : null;

        // console.log(error);

        if (status === 401) {
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

        return Promise.reject(error);
    }
);
class NoTokenApiService {

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


    // validateWorkEmail = async (email: any) => {
    //     try {
    //         let response = await axios.post(
    //             `https://node.curately.ai/validate-email`, { data: email }
    //         )
    //         console.log(response, 'response')
    //         let isBoolean = response.data.debounce.free_email === "false" ? true : false
    //         return isBoolean; // e.g., true or false
    //     } catch (error) {
    //         console.error('Error validating email:', error);
    //         return false; // Fallback if API request fails
    //     }
    // };

    

    validateWorkEmail(email: any) {
        // console.log(process.env.REACT_APP_API_KEY, 'env')
        return axios.post(
            `https://node.curately.ai/validate-email`, { data: email }
        )
    }

}

export default new NoTokenApiService();