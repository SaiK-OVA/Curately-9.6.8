import { useEffect, useState } from "react";
import { Stack } from '../../../../../../shared/modules/MaterialImports/Stack';
import { Typography } from '../../../../../../shared/modules/MaterialImports/Typography';
import { CloseIcon } from '../../../../../../shared/modules/MaterialImports/Dialog';


const TotalCount = ({ formikValues, handleClearAllFilters }: { formikValues: any; handleClearAllFilters: () => void }) => {

    const [count, setCount] = useState<number>(0);
    useEffect(() => {
        setCount(
            (formikValues.keywords !== "" ? 1 : 0) +
            (formikValues.jobTitles.reduce((count: any, obj: any) => obj.title ? ++count : count, 0)) +
            (formikValues.skills.reduce((count: any, obj: any) => obj.skillName ? ++count : count, 0)) +
            (formikValues.allSkills !== "" ? 1 : 0) +
            (formikValues.location.city !== "" ? 1 : 0) +
            (formikValues.location.state.length ? 1 : 0) +
            (formikValues.location.radius !== "" ? 1 : 0) +
            (formikValues.location.zipCode !== "" ? 1 : 0) + (formikValues.workAuthorization.auth_in_US !== "" ? 1 : 0) + (formikValues.workAuthorization.Req_visa_sponsorship !== "" ? 1 : 0) +
            (formikValues.employer.reduce((count: any, obj: any) => obj.employerName ? ++count : count, 0)) + (formikValues.degTypes.length > 0 ? 1 : 0) +
            (formikValues.IsTopStudent === true || formikValues.IsRecentGraduate === true || formikValues.IsCurrentStudent === true ? 1 : 0) +
            formikValues.schools.reduce((count: any, obj: any) => obj.schoolName ? ++count : count, 0) +
            formikValues.degrees.reduce((count: any, obj: any) => obj.degreeName ? ++count : count, 0) +
            formikValues.certifications.reduce((count: any, obj: any) => obj.certificationName ? ++count : count, 0) + formikValues.industries.reduce((count: any, obj: any) => obj.indcate ? ++count : count, 0) +
            ((formikValues.minExp || formikValues.maxExp) ? 1 : 0) +
            ((formikValues.minManExp || formikValues.maxManExp) ? 1 : 0) +
            (formikValues.preference.EmpAvailabilityStatus !== "" ? 1 : 0) +
            (formikValues.preference.EmpJobPref !== "" ? 1 : 0) +
            (formikValues.preference.EmpLocPref !== "" ? 1 : 0) +
            (formikValues.preference.EmpWorkHoursPref !== "" ? 1 : 0) +
            // (formikValues.preference.auth_in_US !== "" ? 1 : 0) +
            // (formikValues.preference.Req_visa_sponsorship !== "" ? 1 : 0) +
            (formikValues.preference.CurrentEmpStatus !== "" ? 1 : 0) +
            (formikValues.talentPoolName ? 1 : 0) +
            (formikValues.tagName ? formikValues.tagName.split(',').length : 0) +
            (formikValues.languageSpoken ? formikValues.languageSpoken.split(',').length : 0) +

            (formikValues.communityMemberActivity?.jobApplication !== "" ? 1 : 0) +
            (formikValues.communityMemberActivity?.profileUpdate !== "" ? 1 : 0) +
            (formikValues.communityMemberActivity?.avaliablityStatusUpdate !== "" ? 1 : 0) +
            (formikValues.communityMemberActivity?.shiftPrefernceUpdate !== "" ? 1 : 0) +
            (formikValues.communityMemberActivity?.preferenceUpdate !== "" ? 1 : 0) +
            (formikValues.communityMemberActivity?.profileCompletion !== "" ? 1 : 0) +
            (formikValues.communityMemberActivity?.mobileVerified !== "" ? 1 : 0) +

            (formikValues.email?.emailClicked !== "" ? 1 : 0) +
            (formikValues.email?.emailReplied !== "" ? 1 : 0) +
            (formikValues.email?.emailBounced !== "" ? 1 : 0) +
            (formikValues.email?.emailSpamBlocked !== "" ? 1 : 0) +
            (formikValues.email?.emailUnsubscribed !== "" ? 1 : 0) +

            (formikValues.sms?.smsSent !== "" ? 1 : 0) +
            (formikValues.sms?.smsReplied !== "" ? 1 : 0) +
            (formikValues.sms?.smsUnsubscribed !== "" ? 1 : 0) +

            (formikValues.candidateActivities?.resume !== "" ? 1 : 0) +
            (formikValues.candidateActivities?.contact !== "" ? 1 : 0) +
            (formikValues.candidateActivities?.email !== "" ? 1 : 0) +
            (formikValues.candidateActivities?.candidateLastActivityDate !== "" ? 1 : 0) +
            (formikValues.candidateActivities?.candidateActivityType !== "" ? 1 : 0) +
            (formikValues.candidateActivities?.placementEndDate !== "" ? 1 : 0) +
            (formikValues.candidateActivities?.hiringStatusInValues !== "" ? 1 : 0) +
            (formikValues.candidateActivities?.candidateStatusInValues !== "" ? 1 : 0) +
            (formikValues.candidateActivities?.candidateProfileSource !== "" ? 1 : 0) +

            (formikValues.curationActivity?.submissionActivity !== "" ? 1 : 0) +
            (formikValues.curationActivity?.interviewActivity !== "" ? 1 : 0) +
            (formikValues.curationActivity?.rating !== "" ? 1 : 0) +
            (formikValues.curationActivity?.notes !== "" ? 1 : 0)
        );

    }, [formikValues])

    return count ?
        <Stack className='clearStack' direction="row" justifyContent="space-around" onClick={handleClearAllFilters}    >
            <CloseIcon />
            <Typography>{count}</Typography>
        </Stack>
        :
        null
}

export default TotalCount;