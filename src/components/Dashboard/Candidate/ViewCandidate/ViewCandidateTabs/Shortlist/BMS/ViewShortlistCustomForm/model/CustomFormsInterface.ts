export interface InternalSubmissionInterface {
    'first-name': string;
    'last-name': string;
    headline: string;
    summary: string;
    'available-date': string;
    'is-active': boolean;
    rates: {
        unit: string;
        currency: string;
        amount: number;
    }[];
    available: boolean;
    'willing-to-relocate': boolean;
    email: string;
    phone: string;
    'payment-preference': string;
    'desired-positions': string[];
    'employment-preferences': string[];
    skills: string[];
    experience: {
        city: string;
        'end-date': string;
        'is-current': boolean;
        'job-title': string;
        organization: string;
        phone: string;
        'start-date': string;
        state: string;
        summary: string;
    }[];
    address: {
        address1: string;
        address2: string;
        city: string;
        state: string;
        'postal-code': string;
        'country-code': string;
        street1: string;
        street2: string;
    };
    resume: {
        name: string;
        data: string;
        'content-type': string;
    };
    'desired-location': {
        address1: string;
        address2: string;
        city: string;
        state: string;
        'postal-code': string;
        'country-code': string;
        street1: string;
        street2: string;
    };
}


export interface InterviewRequestInterface {
    status: string;
    contact: {
        name: string;
        phone: string;
        email: string;
        details: string;
    };
    'interview-id': string;
    'meeting-type': string;
    'meeting-details': string;
    'available-dates': {
        'start-date': string;
        'end-date': string;
        'interview-date-id': string;
    }[];
    'provide-interview-information-flag': boolean;
    'interview-comments': string;
    'reschedule-required': string;
}

export interface OfferRequestInterface {
    status: string;
    'pay-rate': {
        unit: string;
        currency: string;
        amount: number;
    };
    'start-date': string;
    'end-date': string;
    'onboarding-instructions': string;
    'payment-model': string;
    'offer-id': string;
}



export interface ClientSubmissionInterface {
    protected: {
        'date-of-birth': {
            month: number;
            day: number;
        };
        email: string;
        'home-address': {
            address1: string;
            address2: string;
            'country-code': string;
            'postal-code': string;
            city: string;
            street1: string;
            street2: string;
            state: string;
        };
        'last-4-ssn': number;
        name: {
            first: string;
            last: string;
        };
        'phone-number': string;
        'national-id': number;
        'preferred-rate': number;
    };
    'talent-pool': string;
    'selected-payment-model': string;
    'supplier-comments': string;
    'former-consultant': boolean;
    'former-employee': boolean;
    'profile-id': string;
    'request-id': string;
    resume: {
        'content-type': string;
        data: string;
        name: string;
    };
    'resume-id': string;
    'client-defined-fields': {
        'application-submission': {
            name: string;
            value: {
                'base64-data': string;
                'file-name': string;
                'content-type': string;
            } | string;
        }[];
    };
    'preferred-rate': {
        amount: string;
        currency: string;
        unit: string;
    };
}

