
import { Dialog, DialogTitle, DialogContent, CloseIcon } from '../../../../../shared/modules/MaterialImports/Dialog';
import { Grid } from '../../../../../shared/modules/MaterialImports/Grid2';
import { IconButton } from '../../../../../shared/modules/MaterialImports/Button';
import { useState, useEffect } from '../../../../../shared/modules/React';
import { JobDataType } from '../../JobDataType';
import RemoveEmptyValuesInObject from '../../../../../shared/utils/RemoveEmptyValuesInObject';

import './PublishJob.scss';
import { DateTime } from 'luxon';
import { userLocalData } from '../../../../../shared/services/userData';

const PublishJob = (
    { jobData, open, closePopup }
        :
        { jobData: JobDataType, open: boolean, closePopup: () => void }
) => {

    const selectedClientIds: string[] = [];
    const [src, setSrc] = useState("");

    useEffect(() => {
        // http://35.155.202.216:8095/idibu/getSendersList
        let startDate = '';
        if (jobData.startDate && DateTime.fromFormat("" + jobData.startDate, 'MM/dd/yyyy').isValid) {
            startDate = DateTime.fromFormat("" + jobData.startDate, 'MM/dd/yyyy').toFormat('yyyy-MM-dd');
        }
        let refNum = "curately_" + userLocalData.getvalue('clientId') + "_" + (jobData.jobId ? jobData.jobId : "");
        let tempData = {
            // email: "mvali@askconsulting.com",
            senderId: 31009873,
            hash: "60853462976a72e24438f4d3c5701fd3",
            partnerId: "curately",
            jobTitle: jobData.jobTitle ? jobData.jobTitle : '',
            boards: selectedClientIds.join(';'),
            jobRef: refNum, // job reference (e.g. REF123) - minimum 4 characters
            startDate: startDate ? startDate : '', // job start date in yyyy-mm-dd format with leading zeroes (e.g. 2013-06-25)
            category: '', // ID of the selected category (available options listed below, e.g. 13)
            location: 'US', // ID of the selected location (available options listed below, e.g. GB)
            sublocation: '', // sublocation's name (e.g. London)
            sublocationId: '', // sublocation's ID (e.g. 1024195)
            mapPostCode: '', // instead of providing the ID or text value of a location, you can provide a postcode as a location source. idibu will use Google's location API to figure out the intended location based on it. By default, we will try to map to the UK postcode, but if you provide the location variable (country code as listed below), the system will look for a location within the provided postcode in the specified country.
            hours: (jobData.jobHours) ?
                (Number(jobData.jobHours) === 1) ? "2" :
                    (Number(jobData.jobHours) === 2) ? "1" : "" : "", // working hours ID (available options listed below, e.g. 1)
            term: jobData.jobType ? jobData.jobType : "", // job type ID (available options listed below, e.g. 2)
            duration: '', // contract duration (not available if term is set to "Permanent" (ID: 2), e.g. Two%20months)
            currency: 'USD', // salary currency's ISO-3 code (please use US instead of USD and EU instead of EUR; all other currencies should be valid 3-letter codes)
            minSalary: jobData.payrateMin ? Number(jobData.payrateMin) : '', // minimum salary (e.g. 2000)
            maxSalary: jobData.payrateMax ? Number(jobData.payrateMax) : '', // maximum salary (e.g. 3000)
            per: (jobData.payrateType) ?
                (Number(jobData.payrateType) === 1) ? "hour" :
                    (Number(jobData.payrateType) === 2) ? "day" :
                        (Number(jobData.payrateType) === 3) ? "week" :
                            (Number(jobData.payrateType) === 4) ? "month" :
                                (Number(jobData.payrateType) === 5) ? "annum" : "" : "", // salary period (available options listed below, e.g. month)
            extraBenefits: '', // extra benefits (e.g. premium%20health%20care)
            salaryDescription: '', // optional salary text override (e.g. 2000%20pounds%20or%20more) - for most job boards, if used, this value will hide all the other salary data
            appUrl: '', // optional URL to use if one wants to apply for the job
            jobDesc: jobData.publicDescription ? jobData.publicDescription.replace(/&nbsp;/g, ' ') : '', // job description (e.g. Here%20is%20a%20test%20description)
            // .replace(/<[^>]*(>|$)| |‌|»|«|>/g, ' ')
            hideRef: true,
            allowNewUsers: true
        }
        console.log(tempData);

        const params = new URLSearchParams(RemoveEmptyValuesInObject(tempData));
        // console.log(params.toString());

        setSrc("https://www.idibu.com/clients/upp/index.php?" + params.toString());
        // setSrc("https://www.idibu.com/clients/upp/index.php?hash=60853462976a72e24438f4d3c5701fd3&email=mvali@askconsulting.com&jobTitle=test%20title&senderId=31009873&boards=1203;1418;1185;");
    }, [])



    return <Dialog
        maxWidth={'lg'}
        fullWidth={true} open={open} id='PublishJob'  >
        <DialogTitle className="header" sx={{ pt: 1, pb: 0, pr: 1, pl: 2 }}>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <span className='addHeader'>
                    Publish
                </span>
                <IconButton
                    aria-label="close"
                    onClick={closePopup}
                    className="closeBtn"
                >
                    <CloseIcon />
                </IconButton>
            </Grid>
        </DialogTitle>
        <DialogContent sx={{ pr: 0, pl: 1, pb: 0 }}>
            <iframe title='Publish Jobs' id='PublishIframe' src={src}></iframe>
        </DialogContent>
    </Dialog>
}


export default PublishJob;