import { useEffect, useState } from '../../../../../../../../shared/modules/React';
import { DateTime } from '../../../../../../../../shared/modules/Luxon';
import { ClientSubmissionInterface, InternalSubmissionInterface, InterviewRequestInterface, OfferRequestInterface } from './model/CustomFormsInterface';

import './ViewShortlistCustomForm.scss';
import { AgileOneInternalSubmissionInterface } from './model/CustomForms/AgileOneInternalSubmission';
import AgileoneInternalSubmission from './Views/AgileoneInternalSubmission';


const ViewShortlistCustomForm = ({ customStageName, json }: { customStageName: string, json: any }) => {


    const [data, setData] = useState<{
        stageName: string;
        internalSubmission: InternalSubmissionInterface;
        interviewRequest: InterviewRequestInterface;
        offerRequest: OfferRequestInterface;
        clientSubmission: ClientSubmissionInterface;
        agileoneInternalSubmission: AgileOneInternalSubmissionInterface;
    }>({
        stageName: "",
        internalSubmission: {} as InternalSubmissionInterface,
        interviewRequest: {} as InterviewRequestInterface,
        offerRequest: {} as OfferRequestInterface,
        clientSubmission: {} as ClientSubmissionInterface,
        agileoneInternalSubmission: {} as AgileOneInternalSubmissionInterface
    });
    useEffect(() => {
        console.log(customStageName);
        console.log(json);
        const name = getStageName(customStageName)
        //  === "BMS_InternalSubmission") ? "internalSubmission" : (customStageName === "beelineInterview") ? "interviewRequest" : (customStageName === "beelineOffer") ? "offerRequest" : (customStageName === "BMS_ClientSubmission") ? "clientSubmission" : "";
        if (name) {
            setData({
                ...data,
                stageName: customStageName,
                [name]: json
            });
        }
    }, []);

    const getStageName = (stageName: string) => {
        switch (stageName) {
            case "BMS_InternalSubmission":
                return "internalSubmission";
            case "beelineInterview":
                return "interviewRequest";
            case "beelineOffer":
                return "offerRequest";
            case "BMS_ClientSubmission":
                return "clientSubmission";
            case "AGILEONE_InternalSubmission":
                return "agileoneInternalSubmission";
            default:
                return "";
        }
    }

    return <div id="ViewShortlistCustomForm">
        {
            (data.stageName === "BMS_InternalSubmission") ?
                <>
                    <div className='parent'>
                        <div className='label'>Name</div>
                        <div className='value'>{data.internalSubmission['first-name'] ? data.internalSubmission['first-name'] : ""} {data.internalSubmission['last-name'] ? data.internalSubmission['last-name'] : ""}</div>
                    </div>
                    <div className='parent'>
                        <div className='label'>Email</div>
                        <div className='value'>{data.internalSubmission['email'] ? data.internalSubmission['email'] : ""}</div>
                    </div>
                    <div className='parent'>
                        <div className='label'>Phone</div>
                        <div className='value'>{data.internalSubmission['phone'] ? data.internalSubmission['phone'] : ""}</div>
                    </div>
                    <div className='parent'>
                        <div className='label'>Address</div>
                        <div className='value'>
                            {data.internalSubmission.address?.address1 ? data.internalSubmission.address?.address1 : ""}
                            {(data.internalSubmission.address?.address1 && data.internalSubmission.address?.city) ? ", " : ""}
                            {data.internalSubmission.address?.city ? data.internalSubmission.address?.city : ""}
                            {(data.internalSubmission.address?.city && data.internalSubmission.address?.state) ? ", " : ""}
                            {data.internalSubmission.address?.state ? data.internalSubmission.address?.state : ""}
                            {(data.internalSubmission.address?.state && data.internalSubmission.address['postal-code']) ? ", " : ""}
                            {data.internalSubmission.address['postal-code'] ? data.internalSubmission.address['postal-code'] : ""}
                        </div>
                    </div>
                    <div className='parent'>
                        <div className='label'>Desired Location</div>
                        <div className='value'>
                            {data.internalSubmission['desired-location']?.address1 ? data.internalSubmission['desired-location']?.address1 : ""}
                            {(data.internalSubmission['desired-location']?.address1 && data.internalSubmission['desired-location']?.city) ? ", " : ""}
                            {data.internalSubmission['desired-location']?.city ? data.internalSubmission['desired-location']?.city : ""}
                            {(data.internalSubmission['desired-location']?.city && data.internalSubmission['desired-location']?.state) ? ", " : ""}
                            {data.internalSubmission['desired-location']?.state ? data.internalSubmission['desired-location']?.state : ""}
                            {(data.internalSubmission['desired-location']?.state && data.internalSubmission['desired-location']['postal-code']) ? ", " : ""}
                            {data.internalSubmission['desired-location']['postal-code'] ? data.internalSubmission['desired-location']['postal-code'] : ""}
                        </div>
                    </div>
                    <div className='parent'>
                        <div className='label'>Willing to Relocate</div>
                        <div className='value'>{data.internalSubmission['willing-to-relocate'] ? "Yes" : "No"}</div>
                    </div>
                    <div className='parent'>
                        <div className='label'>Rates</div>
                        <div className='value'>
                            {
                                data.internalSubmission['rates']?.map((item) => (
                                    item.amount ?
                                        `${item.currency ? item.currency : ""} ${item.amount} ${item.unit ? " / " + item.unit : ""}` : ''
                                )
                                )
                            }
                        </div>
                    </div>
                    <div className='parent'>
                        <div className='label'>Position</div>
                        <div className='value'>{data.internalSubmission['desired-positions'] ? data.internalSubmission['desired-positions']?.join(', ') : ""}</div>
                    </div>
                    <div className='parent'>
                        <div className='label'>Job Title</div>
                        <div className=''>
                            {
                                data.internalSubmission['experience']?.map((item: { 'job-title': string; organization: string; summary: string; 'start-date': string; 'end-date': string; }) => (
                                    item['job-title'] ?
                                        <div>
                                            <div className=''>{`${item['job-title']} ${item.organization ? ", " + item.organization : ""}`}</div>
                                            <div className='pb-2'>{`${item['start-date'] ? DateTime.fromFormat(item['start-date'], 'dd-MM-yyyy').toFormat('MM/dd/yyyy') : ""} ${(item['start-date'] && item['end-date']) ? " - " : ""}`} {`${item['end-date'] ? DateTime.fromFormat(item['end-date'], 'dd-MM-yyyy').toFormat('MM/dd/yyyy') : ""}`}</div>
                                        </div>
                                        :
                                        ''
                                ))
                            }
                        </div>
                    </div>
                    <div className='parent'>
                        <div className='label'>Employment Preferences</div>
                        <div className='value'>{data.internalSubmission['employment-preferences']?.length ? data.internalSubmission['employment-preferences'].join(', ') : ""}</div>
                    </div>
                    <div className='parent'>
                        <div className='label'>Desired Position</div>
                        <div className='value'>{data.internalSubmission['desired-positions']?.length ? data.internalSubmission['desired-positions'].join(', ') : ""}</div>
                    </div>
                    <div className='parent'>
                        <div className='label'>Skills</div>
                        <div className='value'>{data.internalSubmission['skills']?.length ? data.internalSubmission['skills'].join(', ') : ""}</div>
                    </div>
                    <div className='parent'>
                        <div className='label'>Payment Preference</div>
                        <div className='value'>{data.internalSubmission['payment-preference'] ? data.internalSubmission['payment-preference'] : ""}</div>
                    </div>
                    <div className='parent'>
                        <div className='label'>Summary</div>
                        <div className='value' dangerouslySetInnerHTML={{ __html: data.internalSubmission.summary }}></div>
                    </div>
                </>
                :
                null
        }
        {
            (data.stageName === "beelineInterview") ?
                <>
                    <div className='parent'>
                        <div className='label'>Status</div>
                        <div className='value'>{data.interviewRequest.status ? data.interviewRequest.status : ""} </div>
                    </div>
                    <div className='parent'>
                        <div className='label'>Selected Interview</div>
                        <div className='value'>
                            {
                                (data.interviewRequest['interview-id'] && data.interviewRequest['available-dates'] && data.interviewRequest['available-dates'].length) ?
                                    data.interviewRequest['available-dates'].find((item) => item['interview-date-id'] === data.interviewRequest['interview-id'])?.['interview-date-id'] ?
                                        <div>
                                            {
                                                data.interviewRequest['available-dates'].find((item) => item['interview-date-id'] === data.interviewRequest['interview-id'])?.['start-date']
                                            }
                                            {
                                                data.interviewRequest['available-dates'].find((item) => item['interview-date-id'] === data.interviewRequest['interview-id'])?.['end-date']
                                            }
                                        </div>
                                        : ""
                                    : ""
                            } </div>
                    </div>
                    <div className='parent'>
                        <div className='label'>Contact</div>
                        <div className='value'>
                            <div>{data.interviewRequest.contact?.name ? data.interviewRequest.contact?.name : ""}</div>
                            <div>{data.interviewRequest.contact?.phone ? data.interviewRequest.contact?.phone : ""}</div>
                            <div>{data.interviewRequest.contact?.email ? data.interviewRequest.contact?.email : ""}</div>
                            <div>{data.interviewRequest.contact?.details ? data.interviewRequest.contact?.details : ""}</div>
                        </div>
                    </div>
                    <div className='parent'>
                        <div className='label'>Meeting Type</div>
                        <div className='value'>{data.interviewRequest['meeting-type'] ? data.interviewRequest['meeting-type'] : ""} </div>
                    </div>
                    <div className='parent'>
                        <div className='label'>Meeting Details</div>
                        <div className='value'>{data.interviewRequest['meeting-details'] ? data.interviewRequest['meeting-details'] : ""} </div>
                    </div>
                    <div className='parent'>
                        <div className='label'>Interview Comments</div>
                        <div className='value'>{data.interviewRequest['interview-comments'] ? data.interviewRequest['interview-comments'] : ""} </div>
                    </div>
                </>
                :
                null
        }
        {
            (data.stageName === "beelineOffer") ?
                <>
                    <div className='parent'>
                        <div className='label'>Status</div>
                        <div className='value'>{data.offerRequest.status ? data.offerRequest.status : ""} </div>
                    </div>
                    <div className='parent'>
                        <div className='label'>Offer Date</div>
                        <div className='value'>
                            {
                                data.offerRequest['start-date'] ?
                                    DateTime.fromFormat(data.offerRequest['start-date'], 'yyyy-MM-dd').toFormat('MM/dd/yyyy')
                                    :
                                    ""
                            }
                            {(data.offerRequest['start-date'] && data.offerRequest['end-date']) ? " - " : ""}
                            {
                                data.offerRequest['end-date'] ?
                                    DateTime.fromFormat(data.offerRequest['end-date'], 'yyyy-MM-dd').toFormat('MM/dd/yyyy')
                                    :
                                    ""
                            }
                        </div>
                    </div>
                    <div className='parent'>
                        <div className='label'>Pay Rate</div>
                        <div className='value'>
                            {
                                data.offerRequest['pay-rate'].amount ?
                                    `${data.offerRequest['pay-rate'].currency ? data.offerRequest['pay-rate'].currency : ""} ${data.offerRequest['pay-rate'].amount} ${data.offerRequest['pay-rate'].unit ? " / " + data.offerRequest['pay-rate'].unit : ""}` : ''
                            }
                        </div>
                    </div>
                    <div className='parent'>
                        <div className='label'>Payment Model</div>
                        <div className='value'>{data.offerRequest['payment-model'] ? data.offerRequest['payment-model'] : ""} </div>
                    </div>
                    <div className='parent'>
                        <div className='label'>Onboarding Instructions</div>
                        <div className='value'>{data.offerRequest['onboarding-instructions'] ? data.offerRequest['onboarding-instructions'] : ""} </div>
                    </div>
                </>
                :
                null
        }
        {
            (data.stageName === "BMS_ClientSubmission") ?
                <>
                    <div className='parent'>
                        <div className='label'>Name</div>
                        <div className='value'>{data.clientSubmission.protected?.name?.first ? data.clientSubmission.protected?.name?.first : ""} {data.clientSubmission.protected?.name?.last ? data.clientSubmission.protected?.name?.last : ""}</div>
                    </div>
                    <div className='parent'>
                        <div className='label'>Phone</div>
                        <div className='value'>{data.clientSubmission.protected?.['phone-number'] ? data.clientSubmission.protected?.['phone-number'] : ""}</div>
                    </div>
                    <div className='parent'>
                        <div className='label'>Email</div>
                        <div className='value'>{data.clientSubmission.protected?.email ? data.clientSubmission.protected?.email : ""}</div>
                    </div>
                    <div className='parent'>
                        <div className='label'>National ID</div>
                        <div className='value'>{data.clientSubmission.protected?.['national-id'] ? data.clientSubmission.protected?.['national-id'] : ""}</div>
                    </div>
                    <div className='parent'>
                        <div className='label'>Last 4 SSN</div>
                        <div className='value'>{data.clientSubmission.protected?.['last-4-ssn'] ? data.clientSubmission.protected?.['last-4-ssn'] : ""}</div>
                    </div>
                    <div className='parent'>
                        <div className='label'>Preferred Rate</div>
                        <div className='value'>{data.clientSubmission.protected?.['preferred-rate'] ? data.clientSubmission.protected?.['preferred-rate'] : ""}</div>
                    </div>
                    <div className='parent'>
                        <div className='label'>Home Address</div>
                        <div className='value'>
                            {data.clientSubmission.protected?.['home-address']?.address1 ? data.clientSubmission.protected?.['home-address']?.address1 : ""}
                            {(data.clientSubmission.protected?.['home-address']?.address1 && data.clientSubmission.protected?.['home-address']?.city) ? ", " : ""}
                            {data.clientSubmission.protected?.['home-address']?.city ? data.clientSubmission.protected?.['home-address']?.city : ""}
                            {(data.clientSubmission.protected?.['home-address']?.city && data.clientSubmission.protected?.['home-address']?.state) ? ", " : ""}
                            {data.clientSubmission.protected?.['home-address']?.state ? data.clientSubmission.protected?.['home-address']?.state : ""}
                            {(data.clientSubmission.protected?.['home-address']?.state && data.clientSubmission.protected?.['home-address']['postal-code']) ? ", " : ""}
                            {data.clientSubmission.protected?.['home-address']['postal-code'] ? data.clientSubmission.protected?.['home-address']['postal-code'] : ""}
                        </div>
                    </div>
                    <div className='parent'>
                        <div className='label'>Payment Model</div>
                        <div className='value'>{data.clientSubmission['selected-payment-model'] ? data.clientSubmission['selected-payment-model'] : ""}</div>
                    </div>
                    <div className='parent'>
                        <div className='label'>Supplier Comments</div>
                        <div className='value'>{data.clientSubmission['supplier-comments'] ? data.clientSubmission['supplier-comments'] : ""}</div>
                    </div>
                    <div className='parent'>
                        <div className='label'>Client Defined Fields</div>
                        <div className='value'>
                            {
                                data.clientSubmission['client-defined-fields']?.['application-submission'].length ?
                                    data.clientSubmission['client-defined-fields']?.['application-submission'].map((item) => (
                                        (item.name && item.value && typeof item.value === 'string') ?
                                            <div className='parent'>
                                                <div className='label'>{item.name}</div>
                                                <div className='value'>{item.value}</div>
                                            </div>
                                            :
                                            <></>
                                    ))
                                    :
                                    null
                            }
                        </div>
                    </div>
                </>
                :
                null
        }
        {
            (data.stageName === "AGILEONE_InternalSubmission") ?
                <AgileoneInternalSubmission data={data.agileoneInternalSubmission} />
                :
                null
        }
    </div>
}

export default ViewShortlistCustomForm;