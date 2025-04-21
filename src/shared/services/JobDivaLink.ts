

// Ensure the environment variable is correctly set
const contactUrl: string = 'https://www2.jobdiva.com/employers/myactivities/contactmgr/vieweditcustomerformV2.jsp?cid=';
const jobUrl: string = 'https://www2.jobdiva.com/employers/myjobs/vieweditjobform.jsp?jobid=';
const candidateUrl: string = 'https://www2.jobdiva.com/employers/myreports/viewcandidate2_real.jsp?candidateid=';

const JobDivaLink = {


    jobDivaLinkUrl(linkUrlType: string, id: string) {
        // Construct the URL
        const resultUrl: string = (linkUrlType === "contact") ? `${contactUrl}${id}` : (linkUrlType === "job") ? `${jobUrl}${id}` : `${candidateUrl}${id}`;

        // Open the URL in a new window/tab
        window.open(resultUrl);

    }

}

export default JobDivaLink;