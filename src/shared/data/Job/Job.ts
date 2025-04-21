interface MenuValues {
    label: string;
    id: string;
}
const type: MenuValues[] = [
    { id: "0", label: "" },
    { id: "1", label: "Permanent" },
    { id: "2", label: "Contract/Temp" },
    { id: "3", label: "Contract to Perm" },
    { id: "4", label: "Freelance" }
];
const hours: MenuValues[] = [
    { id: "0", label: "" },
    { id: "1", label: "Full-time" },
    { id: "2", label: "Part-time" }
]
const workType: MenuValues[] = [
    { id: "1", label: "Remote" },
    { id: "2", label: "Hybrid" },
    { id: "3", label: "On-Site" }
];
const jobCategory: MenuValues[] = [
    { id: "", label: "" },
    { id: "1", label: "Remote" },
    { id: "490", label: "Accounting Finance" },
    { id: "463", label: "Admin Clerical" },
    { id: "37", label: "Call Center" },
    { id: "492", label: "Clinical" },
    { id: "491", label: "Creative Marketing" },
    { id: "39", label: "Engineering" },
    { id: "494", label: "Health IT" },
    { id: "493", label: "Healthcare" },
    { id: "58", label: "Human Resources" },
    { id: "102", label: "Industrial" },
    { id: "59", label: "Information Technology" },
    { id: "497", label: "Lab" },
    { id: "63", label: "Legal" },
    { id: "498", label: "Pharma" },
    { id: "496", label: "Professional" },
    { id: "72", label: "Sales" },
    { id: "103", label: "Scientific" },
    { id: "495", label: "Supply Chain" },
    { id: "499", label: "Global Product Development and Supply" },
    { id: "500", label: "Research and Development" },
];
const jobStatus: MenuValues[] = [
    { id: "0", label: "" },
    { id: "1", label: "Open" },
    { id: "2", label: "On Hold" }, // Halted
    { id: "3", label: "Closed" },
    { id: "4", label: "Cancelled " },
    { id: "5", label: "Pipeline" },
    //{ id: "6", label: "Heads Up " },
    { id: "7", label: "Re-Opened " },
    // { id: "8", label: "Automation" },
    // { id: "9", label: "POC " },
    // { id: "10", label: "Knowledge Bank " }
    { id: "11", label: "Filled" },
    { id: "12", label: "Declined" },
];

const priority = [
    { id: "A", label: "A" },
    { id: "B", label: "B" },
    { id: "C", label: "C" },
    { id: "D", label: "D" },
];
// [
//     // { id: "0", label: "none" },
//     { id: "D", label: "A+" },
//     { id: "A", label: "A" },
//     { id: "B", label: "B" },
//     { id: "E", label: "C" },
//     { id: "C", label: "Covered" },
//     { id: "G", label: "FYI" },
//     { id: "H", label: "Hot" },
//     { id: "N", label: "New" },
//     { id: "F", label: "Forecasted" },
//     { id: "I", label: "Interviewing" }
// ];

const masterJobData = {
    type,
    typeById: (val: number | string) => {
        let obj = type.find(i => String(i.id) === String(val));
        if (obj?.label) {
            return obj.label
        } else {
            return "";
        }
    },
    hours,
    hourById: (val: number | string) => {
        let obj = hours.find(i => String(i.id) === String(val));
        if (obj?.label) {
            return obj.label
        } else {
            return "";
        }
    },
    workType,
    workTypeById: (val: number | string) => {
        let obj = workType.find(i => String(i.id) === String(val));
        if (obj?.label) {
            return obj.label
        } else {
            return "";
        }
    },
    jobCategory,
    jobCategoryById: (val: number | string) => {
        let obj = jobCategory.find(i => String(i.id) === String(val));
        if (obj?.label) {
            return obj.label
        } else {
            return "";
        }
    },
    jobStatus,
    jobStatusById: (val: number | string) => {
        let obj = jobStatus.find(i => String(i.id) === String(val));
        if (obj?.label) {
            return obj.label
        } else {
            return "";
        }
    },
    priority,
    priorityById: (val: number | string) => {
        let obj = priority.find(i => String(i.id) === String(val));
        if (obj?.label) {
            return obj.label
        } else {
            return "";
        }
    },
};

// {
//     masterJobData.type.map(item => {
//         return <MenuItem value={ item.id }> { item.label } </MenuItem>
//     })
// }

export default masterJobData;