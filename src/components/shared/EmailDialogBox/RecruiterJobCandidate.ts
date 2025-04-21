export interface RecruiterJobCandidate {
    Recruiter: {
        clientName: string;
        recrId: number;
        firstName: string;
        lastName: string;
        fullName: string;
        email: string;
        phone: string;
        roleId: number;
        roleName: string;
    };
    Candidate: {
        lastName: string;
        firstName: string;
        workHistory: {
            endDate: string;
            companyName: string;
            jobTitle: string;
            startDate: string;
        }[];
        email: string;
    };
    ClientSection: {
        client_description_section: string;
    };
    Job: {
        jobId: number;
        jobTitle: string;
        jobdescription: string;
        workStreet: string;
        workCity: string;
        workState: string;
        workZipcode: string;
        workTimezone: string;
        estStartDate: string;
        estEndDate: string;
        jobDuration: number;
        payRate: {
            payrateMin: number;
            payrateMax: number;
            payrateType: number;
        };
    };
    Personalise: {
        personalise_section: string;
    };
}
