import { roleNumbersInterface } from "./auth/validating";
import { ID_ADDON_CHROME_EXTENSION, ID_PLATFORM_DIRECT_SOURCING } from "./Permissions/IDs";

const userLocalData = {
    getvalue(val:
        // "Userid" | "Username" | "anew" | "assign_clients" | "aupdate" | "aview" | "blastemail" | "blastsms" | "branch" | "clients" | "cnew" | "cpids" | "cupdate" | "cview" | "email" | "fullname" | "indeedemail" | "intranet" | "jadvr" | "jnew" | "jupdate" | "jview" | "location" | "p1new" | "p1update" | "p1view" | "phone" | "pnew" | "pupdate" | "pview" | "role" | "searchbot" | "sessid" | "specific" | "encoded" | "clientName" | "clientId" 
        "role" | "clientId" | "phone" | "addons" | "settings" | "clientName" | "recrId" | "recrFullName" | "userName" | "chromExtensionClient" | "chromExtensionClient" | "email" | "platform" | "modules" | "paymentType" | "invitedAndReferredRecrIds" | "emailEngineAccountActive" | "inviteCode" | "referralCode" | "stripeCustomerId" | "shortName" | "talentPoolCreated" | "campaignCreated" | "installedChromeExtension" | "invitedYourTeamMates" | "invitedBy"
    ) {
        let tempUserData = JSON.parse(localStorage.getItem('demoUserInfo') || '{}');
        return tempUserData[val];
    },
    getSettings(val: "settingsRoleWise" | "integrationsRoleWise" | "adminRoleWise") {
        let tempUserData = JSON.parse(localStorage.getItem('masterRoleWiseSettings') || ((val === "integrationsRoleWise") ? '[]' : '{}'));
        return tempUserData[val];
    },
    checkIntegration(val: roleNumbersInterface['integrationsRoleWiseNumbers']) {
        if (userLocalData.getSettings('integrationsRoleWise')) {
            let tempIntegrations = userLocalData.getSettings('integrationsRoleWise');
            return tempIntegrations.includes(val)
        }
        return "";
    },
    checkSettings(val: roleNumbersInterface['settingRoleWiseNumbers']) {
        if (userLocalData.getSettings('settingsRoleWise')) {
            let roleSettings = userLocalData.getSettings('settingsRoleWise');
            return (roleSettings[val] || "");
        }
        return "";
    },
    adminSettings(val: roleNumbersInterface['adminWiseNumber']) {
        if (userLocalData.getSettings('adminRoleWise')) {
            let adminSettings = userLocalData.getSettings('adminRoleWise');
            return (adminSettings[val] || "");
        }
        return "";
    },
    browserExtensionClientId: 7,
    isChromeExtensionEnabled() {
        return this.getvalue('clientId') ? (this.getvalue('clientId') === this.browserExtensionClientId) ? true : (this.adminSettings(ID_ADDON_CHROME_EXTENSION) && !this.adminSettings(ID_PLATFORM_DIRECT_SOURCING)) ? true : false : false;
    },
    isClient7() {
        return this.getvalue('clientId') ? (this.getvalue('clientId') === this.browserExtensionClientId) : false;
    },
    isPaid() {
        return (this.isChromeExtensionEnabled()) ? (this.getvalue('paymentType') === 1) ? false : true : true;
    }




}

// const data = {
//     "Userid": "1893",
//     "Username": "Adityak",
//     "anew": 1,
//     "assign_clients": "",
//     "aupdate": 1,
//     "aview": 1,
//     "blastemail": 1,
//     "blastsms": 1,
//     "branch": "",
//     "clients": "",
//     "cnew": 1,
//     "cpids": "",
//     "cupdate": 1,
//     "cview": 1,
//     "email": "adityak@askconsulting.com",
//     "fullname": "Aditya Kumar",
//     "indeedemail": "",
//     "intranet": 1,
//     "jadvr": 1,
//     "jnew": 1,
//     "jupdate": 1,
//     "jview": 1,
//     "location": "Hyderabad",
//     "p1new": 1,
//     "p1update": 1,
//     "p1view": 1,
//     "phone": "",
//     "pnew": 1,
//     "pupdate": 1,
//     "pview": 1,
//     "role": "R",
//     "searchbot": 1,
//     "sessid": "5C228BB586561655C7D5E037DF7CA9F9",
//     "specific": 0
// }

export { userLocalData };