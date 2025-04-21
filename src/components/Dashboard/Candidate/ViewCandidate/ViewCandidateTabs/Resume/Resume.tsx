

// import { trackPromise } from "../../../../../../shared/modules/PromiseTrackter";
import { React, useEffect, useState } from "../../../../../../shared/modules/React";

// import ApiService from "../../../../../../shared/api/api";

import "./Resume.scss";


const Resume = (
    { htmlData }: { htmlData: string }
    // { candidateId, jobId, sourceId, documentId, extension, htmlData }:
    //     { candidateId?: string, jobId?: string, sourceId?: string, documentId?: string, extension?: string, htmlData: string }
) => {

    const [dataToShow, setDataToShow] = useState('');

    // console.log(htmlData)



    // const resumeData = () => {
    //     trackPromise(
    //         ApiService.getByParams(193, '/Candidate/getText.jsp',
    //             {
    //                 docName: `${documentId}.${extension}`,
    //                 searchId: sourceId
    //             }
    //         ).then((secondApiResponse) => {

    //             if (secondApiResponse?.data?.source) {
    //                 // setHtmlData(secondApiResponse?.data?.source);
    //             }
    //         }).catch((error) => {
    //             console.error('Error:', error);
    //         }));
    // };

    // const dataToShow = (htmlData && htmlData.trim()) ? dataToShow.trim().replaceAll('\n', '<br>') : "";

    const removeJunkText = (val: string) => {
        // eslint-disable-next-line no-useless-escape
        return val ? val.replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '') : "";
    }

    const candidatePoolView = window.location.href.includes('/talentPool/Candidate/view/');

    useEffect(() => {
        let tempDataToShow = (htmlData && htmlData.trim()) ? htmlData.trim().replaceAll('\n', ' <br> ') : "";
        tempDataToShow = removeJunkText(tempDataToShow);
        if (candidatePoolView) {

            const phoneRegex = /(?:[-+(). ]*\d){10,13}/gm;
            var phoneMatches = tempDataToShow.match(phoneRegex);
            // console.log(phoneMatches);
            if (phoneMatches && phoneMatches.length > 0) {
                tempDataToShow = tempDataToShow.replace(phoneRegex, function (match: string | string[]) {
                    return "";
                    // return "[phone]";
                });
            }


            const emailRegex = /\w+@\w+\.\w+/gm;
            var emailMatches = tempDataToShow.match(emailRegex);
            // console.log(emailMatches);
            if (emailMatches && emailMatches.length > 0) {
                tempDataToShow = tempDataToShow.replace(emailRegex, function (match: string | string[]) {
                    return "";
                    // return "[email]";
                });
            }
        }


        setDataToShow(tempDataToShow);
    }, [])

    return (

        <div dangerouslySetInnerHTML={{ __html: dataToShow }}>

        </div>

    );
};

export default React.memo(Resume);
