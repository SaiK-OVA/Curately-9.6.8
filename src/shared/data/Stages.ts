// import shortid from "shortid";

import { StageInterface } from "../../components/Dashboard/Letters/Workflow/Add/AddWorkflow";


const StagesList: StageInterface[] = [
    // {
    //     number: "1",
    //     name: 'Trigger',
    //     title: 'Trigger',
    //     stageId: "0",
    //     stageTypeId: "1"
    // },
    {
        number: "2",
        name: 'Approved',
        title: 'Approved',
        stageId: "0",
        stageTypeId: "2",
        isInAdmin: true
    },
    {
        number: "3",
        name: 'Data Collection',
        title: 'Data Collection',
        stageId: "0",
        stageTypeId: "3",
        isInAdmin: true
    },
    {
        number: "4",
        name: 'Client Submission',
        title: 'Client Submission',
        stageId: "0",
        stageTypeId: "4",
        isInAdmin: false
    },
    {
        number: "5",
        name: 'Onboarding',
        title: 'Onboarding',
        stageId: "0",
        stageTypeId: "5",
        isInAdmin: false
    },
    {
        number: "6",
        name: 'Rejected',
        title: 'Rejected',
        stageId: "0",
        stageTypeId: "6",
        isInAdmin: true
    },
    {
        number: "7",
        name: 'On Hold',
        title: 'On Hold',
        stageId: "0",
        stageTypeId: "7",
        isInAdmin: true
    },
    {
        number: "8",
        name: 'Webinar',
        title: 'Webinar',
        stageId: "0",
        stageTypeId: "8",
        isInAdmin: true
    },
    {
        number: "9",
        name: 'Scheduling',
        title: 'Scheduling',
        stageId: "0",
        stageTypeId: "9",
        isInAdmin: true
    },
    {
        number: "10",
        name: 'Video Recording',
        title: 'Video Recording',
        stageId: "0",
        stageTypeId: "10",
        isInAdmin: true
    },
    {
        number: "11",
        name: 'Filter',
        title: 'Filter',
        stageId: "0",
        stageTypeId: "11",
        isInAdmin: true
    },
    {
        number: "12",
        name: 'Assessment',
        title: 'Assessment',
        stageId: "0",
        stageTypeId: "12",
        isInAdmin: true
    },
    {
        number: "13",
        name: 'Info',
        title: 'Info',
        stageId: "0",
        stageTypeId: "13",
        isInAdmin: true
    },
    {
        number: "14",
        name: 'System Checker',
        title: 'System Checker',
        stageId: "0",
        stageTypeId: "14",
        isInAdmin: false
    },
    {
        number: "15",
        name: 'Document Signing',
        title: 'Document Signing',
        stageId: "0",
        stageTypeId: "15",
        isInAdmin: true
    }
];

const masterStagesList = StagesList.filter(item => item.isInAdmin);

export default masterStagesList;