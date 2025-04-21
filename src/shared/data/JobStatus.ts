interface JobStatus {
    label: string;
    id: string;
}
const list = [
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
]
const masterJobStatus = {
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


export default masterJobStatus;