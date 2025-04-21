export interface DashboardCardInterface {
    i: string;
    id: string;
    x: number;
    y: number;
    w: number;
    h: number;
    order: number;
    draggableHandle: string;
    title: string;
    customTitle: string;
    inputs: {
        settings: boolean;
        allCompany: boolean;
        assignedClients: boolean;
        accountManager: boolean;
        relationType: boolean;
        billRate: boolean;
        jobType: boolean;
        clientType: boolean;
        graph: boolean;
        graphValue: string;
        graphName: string;
        datesDiv: boolean;
    };
    defaultValues: {
        graphMonthsSelected: string;
        dateSelected: string;
        fromDate: string;
        toDate: string;
        modifiedTitle: string;
        companyType: string;
        assignedClientIds: string[];
        assignedClientNames: string[];
        accountManagerIds: string[];
        accountManagerNames: string[];
        userIds: string[];
        userNames: string[];
        clientIds: string[];
        clientNames: string[];
        relationshipType: string;
        billRate: string;
        jobType: string;
        clientType: string;
        chartData?: any;
        withOutStatus?: string;
        placementType?: string;
    }
    datesDivInputs?: {
        today: true,
        yesterday: true,
        nextWeek: true
    }
}