import masterStatesList from "../data/States";

const getStateById = (id: string) => {
    let tempObj = masterStatesList.find((obj) => {
        return obj.id === id
    });
    return (tempObj && tempObj.label) ? tempObj.label : ""
}

export default getStateById;