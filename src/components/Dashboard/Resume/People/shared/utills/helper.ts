// import { userLocalData } from "../../../../../../shared/services/userData";
export const checkPermision = (checkStr: any) => {
    let canHavePermision = true;
    let queryString = window.location.search.split("&");
    // console.log(queryString, 'queryString')
    if (queryString.length > 2) {
        let permisionSet = queryString[2].split("=")
        let allPermisiions = permisionSet[1].split(",")
        console.log(allPermisiions, 'allPermisiions')
        if (allPermisiions.indexOf(checkStr) === -1) {
            canHavePermision = false
        }
    }

    return canHavePermision
}

export const fetchCheckedUserIds = (checkedRowValues: any, usersData: any) => {
    let checkedUsers: any = [];
    let checkedUserIds = "";
    let filteredUserIds: any = []
    let personIds: any = [];
    let completeObjUsersList: any = [];

    let checkedIndexes = checkedRowValues.map((checked: any, index: any) => {
        if (checked) {
            return index
        }
    })
    if (checkedIndexes.length) {
        checkedIndexes.forEach((checked: any) => {
            if (checked !== undefined) {
                checkedUsers.push(usersData[checked])
            }
        })
        filteredUserIds = checkedUsers.map((checked: any) => {
            if (checked.userId) {
                completeObjUsersList.push(checked);
                return checked.userId;
            }
        }).filter((userVal: any) => userVal !== undefined);

        personIds = checkedUsers.map((checked: any) => {

            if (!checked.userId) {
                completeObjUsersList.push(checked);
                return checked.id
            }

        }).filter((userVal: any) => userVal !== undefined)

        checkedUserIds = filteredUserIds.join(",")


    }

    console.log(checkedUserIds, 'checkedUserIds')

    // if (userLocalData.getvalue("clientId") != 7) {
    //     return checkedUserIds
    // }
    // else {
    return {
        userIdsData: filteredUserIds,
        personIds,
        completeObjUsersList: completeObjUsersList
    }
    // }
}