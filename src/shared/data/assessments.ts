export const masterAssessment: AssessmentInterface[] = [
    {
        userId: 1893,
        assessmentsId: "JB-HTELNQ8LF",
        name: "Personality and Aptitude",
        description: "This assessment measures your customer service skills - things like \r\nproblem solving and critical thinking - giving you the opportunity to \r\nshow employers your capabilities and potential.",
        completeTime: "15 m",
        assessmentCode: "CCAT",
        source: "criteriaCorp",
        assessmentURL: "ASKZChqjN1QHPhpz",
        noOfJobs: 520,
        primaryAssessment: true,
        badgePath: "badge-customer-support.png",
        completionStatus: 10018001,
        requiredBadgePath: "",
        orderId: "",
        highestScore: "0",
        date: "2023-01-03 05:33:14.0",
        count: 0,
        isChecked: false
    },
    {
        userId: 1893,
        assessmentsId: "JB-XDXQ65RS1",
        name: "Computer Literacy",
        description: "This assessment shows employers you have the computer skills needed \r\nto do the job and awards you a badge to show you know your stuff.",
        completeTime: "13 m",
        assessmentCode: "CLIK",
        source: "criteriaCorp",
        assessmentURL: "ASKXjuUt7DqM24ev",
        noOfJobs: 310,
        primaryAssessment: true,
        badgePath: "badge-literacy.png",
        completionStatus: 10018001,
        requiredBadgePath: "",
        orderId: "",
        highestScore: "0",
        date: "2023-01-08 05:16:32.0",
        count: 0,
        isChecked: false
    },
    {
        userId: 1893,
        assessmentsId: "JB-0WE9SVBRK",
        name: "Typing",
        description: "This assessment measures your typing speed and accuracy.",
        completeTime: "1 m",
        assessmentCode: "TT",
        source: "criteriaCorp",
        assessmentURL: "ASKDZ1ejWg6ReQb6",
        noOfJobs: 450,
        primaryAssessment: false,
        badgePath: "badge-typingtest.png",
        completionStatus: 10018001,
        requiredBadgePath: "",
        orderId: "",
        highestScore: "0",
        date: "2023-01-03 05:33:34.0",
        count: 0,
        isChecked: false
    },
    {
        userId: 1893,
        assessmentsId: "JB-GHBP3ZY6N",
        name: "Microsoft Word",
        description: "This assessment measures how well you know Microsoft Word with just 20 questions.",
        completeTime: "10 m",
        assessmentCode: "Word 16",
        source: "criteriaCorp",
        assessmentURL: "ASKsCws1vnt3a7ML",
        noOfJobs: 250,
        primaryAssessment: false,
        badgePath: "badge-word.png",
        completionStatus: 10018001,
        requiredBadgePath: "",
        orderId: "",
        highestScore: "0",
        date: "2023-01-07 05:07:38.0",
        count: 0,
        isChecked: false
    },
    {
        userId: 1893,
        assessmentsId: "JB-AAJAZ4K91",
        name: "Microsoft Excel",
        description: "This assessment measures how well you know Microsoft Excel with just 20 questions.",
        completeTime: "10 m",
        assessmentCode: "Excel 16",
        source: "criteriaCorp",
        noOfJobs: 750,
        primaryAssessment: false,
        badgePath: "badge-excel.png",
        requiredBadgePath: "",
        completionStatus: 0,
        orderId: "",
        count: 0,
        isChecked: false
    },
    {
        userId: 1893,
        assessmentsId: "JB-TS406IM8D",
        name: "Ten Key",
        description: "This assessment measures your 10-key typing speed and accuracy.",
        completeTime: "5 m",
        assessmentCode: "TKT",
        source: "criteriaCorp",
        assessmentURL: "ASKp9PBxCjnqZU1x",
        noOfJobs: 400,
        primaryAssessment: false,
        badgePath: "badge-tenkey.png",
        completionStatus: 10018001,
        requiredBadgePath: "",
        orderId: "",
        highestScore: "0",
        date: "2023-01-08 04:17:35.0",
        count: 0,
        isChecked: false
    }
];

export interface AssessmentInterface {
    userId: number;
    assessmentsId: string;
    name: string;
    description: string;
    completeTime: string;
    assessmentCode: string;
    source: string;
    assessmentURL?: string;
    noOfJobs: number;
    primaryAssessment: boolean;
    badgePath: string;
    completionStatus: number
    requiredBadgePath: string;
    orderId: string;
    highestScore?: string;
    date?: string;
    count: number
    isChecked: false
}