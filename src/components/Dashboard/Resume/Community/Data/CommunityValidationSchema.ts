import {z} from './../../../../../shared/modules/Zod';

const CommunityValidationSchema = z.object({
    keywords: z.string(),
    jobTitles: z.array(
        z.object({
            title: z.string(),
            required: z.boolean()
        })
    ),
    location: z.object({
        city: z.string(),
        state: z.string(),
        zipCode: z.string(),
        radius: z.string(),
    }),
    workAuthorization: z.object({
        auth_in_US: z.string(),
        Req_visa_sponsorship: z.string(),
    }),
    skills: z.array(
        z.object({
            recentUse: z.boolean(),
            experLevel: z.string(),
            skillName: z.string(),
        })
    ),
    allSkills: z.string(),
    employer: z.array(
        z.object({
            employerName: z.string(),
        })
    ),
    degTypes: z.array(z.string()),
    IsTopStudent: z.boolean(),
    IsRecentGraduate: z.boolean(),
    IsCurrentStudent: z.boolean(),
    schools: z.array(
        z.object({
            schoolName: z.string(),
        })
    ),
    degrees: z.array(
        z.object({
            degreeName: z.string(),
        })
    ),
    daysBack: z.string(),
    minExp: z.string(),
    maxExp: z.string(),
    minManExp: z.string(),
    maxManExp: z.string(),
    certifications: z.array(
        z.object({
            certificationName: z.string(),
        })
    ),
    industries: z.array(
        z.object({
            indcate: z.string(),
            subCat: z.string(),
        })
    ),
    languageSpoken: z.string(),
    jobDescription: z.string(),
    selectedJobTitle: z.string(),
    selectedJobId: z.string(),
    parsedDocument: z.string(),
    tagId: z.string(),
    tagName: z.string(),
    talentPoolId: z.string(),
    talentPoolName: z.string(),
    preference: z.object({
        CurrentEmpStatus: z.string(),
        EmpAvailabilityStatus: z.string(),
        EmpJobPref: z.string(),
        EmpLocPref: z.string(),
        EmpWorkHoursPref: z.string()
    }),
    communityMemberActivity: z.object({
        jobApplication: z.string(),
        profileUpdate: z.string(),
        avaliablityStatusUpdate: z.string(),
        shiftPrefernceUpdate: z.string(),
        preferenceUpdate: z.string(),
        profileCompletion: z.string(),
        mobileVerified: z.string()
    }),
    email: z.object({
        emailClicked: z.string(),
        emailReplied: z.string(),
        emailBounced: z.string(),
        emailSpamBlocked: z.string(),
        emailUnsubscribed: z.string()
    }),
    sms: z.object({
        smsSent: z.string(),
        smsReplied: z.string(),
        smsUnsubscribed: z.string()
    }),
    candidateActivities: z.object({
        resume: z.string(),
        contact: z.string(),
        email: z.string(),
        candidateLastActivityDate: z.string(),
        candidateActivityType: z.string(),
        placementEndDate: z.string(),
        hiringStatusInValues: z.string(),
        candidateStatusInValues: z.string(),
        candidateProfileSource: z.string()
    }),
    curationActivity: z.object({
        submissionActivity: z.string(),
        interviewActivity: z.string(),
        rating: z.string(),
        notes: z.string()
    }),

});

export default CommunityValidationSchema;