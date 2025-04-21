// import React, { useEffect, useState } from 'react';
import { useEffect, useState } from '../../../../../shared/modules/React';
import FormFields from './FormFields';
import './CustomFields.scss'
import ApiRequests from '../../../../../shared/api/api'
import { useParams } from 'react-router-dom';
import { trackPromise } from '../../../../../shared/modules/PromiseTrackter';



const CustomFields = ({ masterJobData }: { masterJobData: any }) => {
    const [formData, setFormData] = useState<any[]>([]);
    const { jobId } = useParams();
    useEffect(() => {
        console.log(masterJobData)
        trackPromise(
            ApiRequests.getByParams(193, '/Jobs/jobs_userdefined.jsp', { jobId: jobId })
                .then((result) => {
                    setFormData(result.data);
                    // console.log(result.data)

                })
        )
            .catch((error) => {
                console.error('Error fetching custom fields', error);
            });



    }, [jobId]);
    return (

        <div>

            {formData.length > 0 ? <FormFields fields={formData} /> : <p>Loading...</p>}
        </div>
    )
}

export default CustomFields