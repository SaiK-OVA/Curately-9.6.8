const stringArray: string[] = [];

const DefaultCommunityJSONObject = {
    keywords: "",
    jobTitles: [
        {
            title: "",
            required: false
        }
    ],
    location: {
        city: "",
        state: "",
        zipCode: "",
        radius: ""
    },
    workAuthorization: {
        auth_in_US: "",
        Req_visa_sponsorship: "",
    },
    skills: [
        {
            recentUse: false,
            experLevel: "",
            skillName: ""
        }
    ],
    allSkills: "",
    employer: [
        {
            employerName: "",
        }
    ],
    degTypes: stringArray,
    IsTopStudent: false,
    IsRecentGraduate: false,
    IsCurrentStudent: false,
    schools: [
        {
            schoolName: "",
        }
    ],
    degrees: [
        {
            degreeName: "",
        }
    ],
    daysBack: "3650", //talentPoolId ? "3650" : "90",
    minExp: "",
    maxExp: "",
    minManExp: "",
    maxManExp: "",
    certifications: [
        {
            certificationName: "",
        }
    ],
    industries: [
        {
            indcate: "",
            subCat: "",
        }
    ],
    languageSpoken: "",
    jobDescription: "",
    selectedJobTitle: "",
    selectedJobId: "",
    parsedDocument: "",
    tagId: "",
    tagName: "",
    talentPoolId: "",
    talentPoolName: "",
    preference:
    {
        CurrentEmpStatus: "",
        EmpAvailabilityStatus: "",
        EmpJobPref: "",
        EmpLocPref: "",
        EmpWorkHoursPref: ""
    },
    communityMemberActivity: {
        jobApplication: "",
        profileUpdate: "",
        avaliablityStatusUpdate: "",
        shiftPrefernceUpdate: "",
        preferenceUpdate: "",
        profileCompletion: "",
        mobileVerified: "",
    },
    email: {
        emailClicked: "",
        emailReplied: "",
        emailBounced: "",
        emailSpamBlocked: "",
        emailUnsubscribed: "",
    },
    sms: {
        smsSent: "",
        smsReplied: "",
        smsUnsubscribed: "",
    },
    candidateActivities: {
        resume: "",
        contact: "",
        email: "",
        candidateLastActivityDate: "",
        candidateActivityType: "",
        placementEndDate: "",
        hiringStatusInValues: "",
        candidateStatusInValues: "",
        candidateProfileSource: "",
    },
    curationActivity: {
        submissionActivity: "",
        interviewActivity: "",
        rating: "",
        notes: "",
    },
}

export default DefaultCommunityJSONObject;