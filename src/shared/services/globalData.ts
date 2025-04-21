import { userLocalData } from "./userData";

const globalData = {

    getWindowLocation() {
        // return window.location.origin + "/curately/";
        return window.location.origin + window.location.pathname + "#/" + userLocalData.getvalue("clientName") + "/";
    }

}

export { globalData };