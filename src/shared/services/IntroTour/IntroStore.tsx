import {create} from 'zustand'

interface Step {
    className: string;
    content: string;
    placement?: string;
}

interface StoreState {
    stepsData: {
        dashboard: Step[];
        applicants: Step[];
        [key: string]: Step[];
    };
    getStepsData: (page: string) => Step[];
    setStepsData: (page: string, newSteps: Step[]) => void;
}


const useStore = create<StoreState>((set, get) => ({

    stepsData: {
        dashboard: [
            { className: "intro-tour.MenuBar", content: "Welcome!! Please spare a minute to learn about our page", placement: "center" },
            { className: "intro-tour.Home", content: "This is home page", placement: "right" },
            { className: "intro-tour.candidate", content: "This is Candidate page", placement: "right" },
            { className: "intro-tour.contact", content: "This is Contact page", placement: "right" },
            { className: "intro-tour.job", content: "This is Job Portal page", placement: "right" },
            { className: "intro-tour.automation", content: "This is Campaign Portal page", placement: "right" },
            { className: "intro-tour.reports", content: "This is Insights Portal page", placement: "right" },
            { className: "intro-tour.settings", content: "Here is Settings Page", placement: "right" },
            { className: "intro-tour.MenuBar", content: "Thankyou!!! Have a great day", placement: "center" }
        ],
        applicants: [
            { className: "intro-applicant", content: "Welcome to our Applicant Page! This is your central hub for managing all aspects of your candidate journey", placement: "center" },
            { className: "filtersHideButton", content: "To help you quickly find the right applicants, we've included a powerful filter feature. Use it to sort job applications based on specific criteria ", placement: "right" },
            { className: "filterListTab", content: "These are the options for filtering candidate applications", placement: "right" },
            { className: "filterBtnWrap", content: "Once you've narrowed down your options, you can easily see how well each candidate matches your ideal profile by applying filters", placement: "left" },
        ],
        contacts: [
            { className: "findContact.pt-3", content: " Welcome to our Contact Page! This page is helpful for managing the applicants contact information", placement: "center" },
            { className: "intro-btn", content: " For adding contact to the page", placement: "left" },
            { className: "filtersHideButton", content: "This filter feature helpful to sort contact details of job applicants based on specific criteria ", placement: "right" },
            { className: "customSorting", content: "In this Tab, you can seamlessly move contacts into appropriate campaigns, add or merge them to your dynamic lists and even sorting out them based on date", placement: "top" }
        ],
        // job: [
        //     { className: "intro-tour.dashboard", content: "This page provides an overview of your application's current status within the hiring process", placement: "center" },
        //     { className: "intro-job", content: " For adding Job Vacany ", placement: "left" }
        // ]
    },
    getStepsData: (page: string) => {
        const state = get();
        return state.stepsData[page] || [];
    },

    setStepsData: (page: string, newSteps: any[]) => {
        set((state: { stepsData: any; }) => ({
            stepsData: {
                ...state.stepsData,
                [page]: newSteps,
            },
        }));
    },


}));

export default useStore;
