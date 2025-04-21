export interface AgileOneInternalSubmissionInterface {
    applicant: {
        firstName: string;
        middleName?: string;
        lastName: string;
        email: string;
        phone?: string;
        address?: {
            addressLine1?: string;
            addressLine2?: string;
            city?: string;
            stateProvince?: string;
            postalCode?: string;
            country?: string;
        };
        resume?: {
            fileName?: string;
            fileContent?: string;
        };
        eeoc?: {
            gender?: string;
            ethnicity?: number | string;
            race?: string;
            veteran?: number | string;
            militarySpouse?: string;
            disability?: string;
            disabilityNote?: string;
        };
        xRefCode?: string;
    };
    payRate?: number;
    billRate?: number;
    estimatedCost?: number;
    xRefCode?: string;
}