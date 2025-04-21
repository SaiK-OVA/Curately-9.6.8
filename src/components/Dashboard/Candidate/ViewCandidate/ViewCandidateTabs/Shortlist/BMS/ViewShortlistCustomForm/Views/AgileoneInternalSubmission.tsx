import { AgileOneInternalSubmissionInterface } from "../model/CustomForms/AgileOneInternalSubmission";

const AgileoneInternalSubmission = ({ data }: { data: AgileOneInternalSubmissionInterface }) => {


    const getEthnicityName = (value: string | number) => {
        switch (Number(value)) {
            case 1:
                return "Prefer no to answer";
            case 2:
                return "Hispanic or Latino";
            case 3:
                return "Not Hispanic or Latino";
        }
    }
    const getVeteranName = (value: string | number) => {
        switch (Number(value)) {
            case 5:
                return "I am a Veteran";
            case 6:
                return "I surrently serve in the military";
            case 7:
                return "No";
            case 8:
                return "Prefer Not to Answer";
        }
    }

    return (
        <div>
            <div className='parent'>
                <div className='label'>Name</div>
                <div className='value'>{data.applicant?.firstName ? data.applicant?.firstName : ""} {data.applicant?.lastName ? data.applicant?.lastName : ""}</div>
            </div>
            <div className='parent'>
                <div className='label'>Email</div>
                <div className='value'>{data.applicant?.email ? data.applicant?.email : ""}</div>
            </div>
            <div className='parent'>
                <div className='label'>Phone</div>
                <div className='value'>{data.applicant?.phone ? data.applicant?.phone : ""}</div>
            </div>
            <div className='parent'>
                <div className='label'>Address</div>
                <div className='value'>
                    {data.applicant?.address?.addressLine1 ? data.applicant?.address?.addressLine1 : ""}
                    {(data.applicant?.address?.addressLine1 && data.applicant?.address?.addressLine2) ? ", " : ""}
                    {data.applicant?.address?.addressLine2 ? data.applicant?.address?.addressLine2 : ""}
                    {(data.applicant?.address?.addressLine2 && data.applicant?.address?.city) ? ", " : ""}
                    {data.applicant?.address?.city ? data.applicant?.address?.city : ""}
                    {(data.applicant?.address?.city && data.applicant?.address?.stateProvince) ? ", " : ""}
                    {data.applicant?.address?.stateProvince ? data.applicant?.address?.stateProvince : ""}
                    {(data.applicant?.address?.stateProvince && data.applicant?.address?.postalCode) ? ", " : ""}
                    {data.applicant?.address?.postalCode ? data.applicant?.address?.postalCode : ""}
                </div>
            </div>
            {/* <div className='parent'>
                <div className='label'>Gender</div>
                <div className='value'>{data.applicant?.eeoc?.gender ? data.applicant?.eeoc?.gender : ""}</div>
            </div>
            <div className='parent'>
                <div className='label'>Ethnicity</div>
                <div className='value'>{data.applicant?.eeoc?.ethnicity ? getEthnicityName(data.applicant?.eeoc?.ethnicity) : ""}</div>
            </div>
            <div className='parent'>
                <div className='label'>Race</div>
                <div className='value'>{data.applicant?.eeoc?.race ? data.applicant?.eeoc?.race : ""}</div>
            </div>
            <div className='parent'>
                <div className='label'>Veteran</div>
                <div className='value'>{data.applicant?.eeoc?.veteran ? getVeteranName(data.applicant?.eeoc?.veteran) : ""}</div>
            </div>
            <div className='parent'>
                <div className='label'>Military Spouse</div>
                <div className='value tt-capital'>{data.applicant?.eeoc?.militarySpouse ? data.applicant?.eeoc?.militarySpouse : ""}</div>
            </div>
            <div className='parent'>
                <div className='label'>Disability</div>
                <div className='value'>{data.applicant?.eeoc?.disability ? data.applicant?.eeoc?.disability : ""}</div>
            </div> */}
            <div className='parent'>
                <div className='label'>Pay Rate</div>
                <div className='value'>{data.payRate ? data.payRate : ""}</div>
            </div>
            <div className='parent'>
                <div className='label'>Bill Rate</div>
                <div className='value'>{data.billRate ? data.billRate : ""}</div>
            </div>
            <div className='parent'>
                <div className='label'>Estimated Cost</div>
                <div className='value'>{data.estimatedCost ? data.estimatedCost : ""}</div>
            </div>
        </div>
    );
}
export default AgileoneInternalSubmission;