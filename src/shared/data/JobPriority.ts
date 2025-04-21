const list = [
    { id: "A", label: "A" },
    { id: "B", label: "B" },
    { id: "C", label: "C" },
    { id: "D", label: "D" },
];
// [
//     { id: "0", label: "none" },
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
// ]
const masterJobPriority = {
    list,
    getNameById: (val: number | string) => {
        let tempJobStatus = list.find(i => Number(i.id) === Number(val));
        if (tempJobStatus?.label) {
            return tempJobStatus.label
        } else {
            return "";
        }
    }
};


export default masterJobPriority;