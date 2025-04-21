import React from "react";
import { useLocation, Navigate, useParams } from "react-router-dom";
import { checkAuth } from "./auth";
import { userLocalData } from "../userData";
import Parsable from "../../utils/Parsable";
import { cookieStore } from "../cookies/cookies";

interface User {
    roleId: string;
    clientId: number;
    phone: string;
    clientName: string;
    shortName: string;
    recrId: number;
    recrFullName: string;
    userName: string;
    chromExtensionClient: string;
    email: string;
    role: {
        roleName: string;
        roleId: string;
        settings:
        {
            settingId: number;
            name: string;
            isEnabled: boolean;
            subSettings: {
                autoId: number;
                settingId: number;
                subSettingId: number;
                name: string;
                type: string;
                value: number;
            }[]
        }[];
        integrations: {
            settingId: number;
            name: string;
            isEnabled: boolean;
            subSettings: {
                autoId: number;
                integrationId: number;
                subIntegrationId: number;
                name: string;
                isChecked: boolean;
            }[]
        }[]
    };
    addons: string[];
    platform: string[];
    settings: string[];
    modules: string[];
    invitedAndReferredRecrIds: string[];
    paymentType: number;
    emailEngineAccountActive: "0" | "1";
    inviteCode: string;
    referralCode: string;
    stripeCustomerId: string;
    talentPoolCreated: boolean;
    campaignCreated: boolean;
    installedChromeExtension: boolean;
    invitedYourTeamMates: boolean;
    invitedBy: number;
    idibuJobBoards: any[];
    idibuTeams: any[]
}
export interface roleNumbersInterface {
    settingRoleWiseNumbers: 10001 | 10002 | 10003 | 10004 | 100001 | 100002 | 110001 | 110002 | 110003 | 110004 | 110005 | 110006 | 110007 | 110008 | 110009 | 120001 | 120002 | 130001 | 130002 | 130003 | 130004 | 130005 | 130006 | 130007 | 130008 | 130009;
    integrationsRoleWiseNumbers: 40001 | 40002 | 40003 | 40004 | 40005 | 40006 | 40007 | 40008 | 400001 | 400002 | 400003 | 400004 | 400005 | 400006 | 400007 | 400008 | 400009 | 400010 | 400011 | 400012 | 400013 | 400014 | 400015 | 400016 | 400017 | 400018 | 400019 | 400020 | 400021 | 400022 | 400023 | 400024 | 400025 | 400026 | 400027 | 400028 | 400029 | 400030 | 400031 | 400032 | 400033 | 400034 | 400035 | 400036 | 400037 | 400038 | 400039 | 400040 | 400041 | 400042 | 400043 | 400044 | 400045 | 400047;
    adminWiseNumber: 20001 | 20002 | 20003 | 20004 | 20005 | 20006 | 20007 | 20008 | 20009 | 20010 | 20011 | 20012 | 20013 | 20014 | 20015 | 20016 | 20017 | 20018 | 20019 | 20020 | 20021 | 20022 | 20023 | 20024 | 20025 | 20026 | 20027 | 20028 | 20029 | 20030 | 20031 | 20032 | 20033 | 20034 | 20035 | 20036 | 20037 | 20040 | 20041 | 20042 | 20043 | 20044 | 20045 | 20046 | 20047 | 20048 | 20049 | 20050 | 20051 | 20052 | 20053 | 20054 | 30001 | 30002 | 30003 | 30004 | 30005;

};

interface AuthContextType {
    user: any;
    signIn: (user: User, authToken: string, callback: VoidFunction) => void;
    signOut: (callback: VoidFunction) => void;
}
let AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
    let [user, setUser] = React.useState<any>(userLocalData.getvalue('userName'));

    let signIn = (userData: User, authToken: string, callback: VoidFunction) => {
        localStorage.setItem('authToken', authToken);
        return checkAuth.signIn(() => {
            // localStorage.setItem('curatelyUsername', userData.Username);
            // localStorage.setItem('curatelyUserId', userData.Userid);

            let tempData = {
                roleId: userData.roleId,
                role: userData.role,
                clientId: Number(userData.clientId),
                clientName: userData.shortName.toLowerCase(),
                clientMainName: userData.clientName,
                phone: userData.phone,
                addons: userData.addons,
                recrId: Number(userData.recrId),
                recrFullName: userData.recrFullName,
                userName: userData.userName,
                chromExtensionClient: userData.chromExtensionClient,
                email: userData.email,
                platform: userData.platform,
                modules: userData.modules,
                settings: userData.settings,
                paymentType: Number(userData.paymentType),
                invitedAndReferredRecrIds: [...(userData.invitedAndReferredRecrIds ? userData.invitedAndReferredRecrIds : []), userData.recrId].join(),
                emailEngineAccountActive: Boolean(userData.emailEngineAccountActive) ? "1" : "0",
                inviteCode: userData.inviteCode ? userData.inviteCode : "",
                referralCode: userData.referralCode ? userData.referralCode : "",
                stripeCustomerId: userData.stripeCustomerId ? userData.stripeCustomerId : "",


                shortName: userData.shortName,
                talentPoolCreated: userData.talentPoolCreated,
                campaignCreated: userData.campaignCreated,
                installedChromeExtension: userData.installedChromeExtension,
                invitedYourTeamMates: userData.invitedYourTeamMates,
                invitedBy: userData.invitedBy,
                idibuJobBoards: userData.idibuJobBoards || [],
                idibuTeams: userData.idibuTeams || []


                // clientId: userData.clientId,
                // clientName: userData.clientName,
                // Userid: userData.Userid,
                // Username: userData.Username,
                // anew: Number(userData.anew),
                // assign_clients: userData.assign_clients,
                // aupdate: Number(userData.aupdate),
                // aview: Number(userData.aview),
                // blastemail: Number(userData.blastemail),
                // blastsms: Number(userData.blastsms),
                // branch: userData.branch,
                // clients: userData.clients,
                // cnew: Number(userData.cnew),
                // cpids: userData.cpids,
                // cupdate: Number(userData.cupdate),
                // cview: Number(userData.cview),
                // email: userData.email,
                // fullname: userData.fullname,
                // indeedemail: userData.indeedemail,
                // intranet: Number(userData.intranet),
                // jadvr: Number(userData.jadvr),
                // jnew: Number(userData.jnew),
                // jupdate: Number(userData.jupdate),
                // jview: Number(userData.jview),
                // location: userData.location,
                // p1new: Number(userData.p1new),
                // p1update: Number(userData.p1update),
                // p1view: Number(userData.p1view),
                // phone: userData.phone,
                // pnew: Number(userData.pnew),
                // pupdate: Number(userData.pupdate),
                // pview: Number(userData.pview),
                // role: userData.role,
                // searchbot: Number(userData.searchbot),
                // sessid: userData.sessid,
                // specific: Number(userData.specific),
                // encoded: userData.encoded
            };

            setUser(tempData);
            localStorage.setItem('demoUserInfo', JSON.stringify(tempData));
            localStorage.setItem('emailEngineAccountActive', Boolean(userData.emailEngineAccountActive) ? "1" : "0");
            let tempRole: User["role"] = (userLocalData.getvalue('role') && Parsable.isJSON(userLocalData.getvalue('role'))) ? JSON.parse(userLocalData.getvalue('role')) : {};
            if (tempRole?.roleId && Number(tempRole?.roleId)) {
                if (!tempRole?.roleId) {
                    tempRole.roleId = tempData?.roleId;
                }
            }
            if ((tempRole?.roleId && Number(tempRole?.roleId)) || tempRole?.roleName || userLocalData.isChromeExtensionEnabled()) {
                // let settings = {
                //     IsJobEnabled: false,
                //     JobSettings: [0],
                //     IsCandidateEnabled: false,
                //     CandidateSettings: [0],
                //     IsContactEnabled: false,
                //     ContactSettings: [0],
                //     IsClientEnabled: false,
                //     ClientSettings: [0],
                //     IsEnabled: false,
                //     Settings: [0],
                //     IsEmailAndSmsEnabled: false,
                //     EmailAndSmsSettings: [0],
                //     IsTalentEnabled: false,
                //     TalentSettings: [0],
                //     IsAnalyticsEnabled: false,
                //     AnalyticsSettings: [0],
                //     IsSubscriptionEnabled: false,
                //     SubscriptionSettings: [0]
                // };


                let adminSettings = {
                    20001: 0,
                    20002: 0,
                    20003: 0,
                    20004: 0,
                    20005: 0,
                    20006: 0,
                    20007: 0,
                    20008: 0,
                    20009: 0,
                    20010: 0,
                    20011: 0,
                    20012: 0,
                    20013: 0,
                    20014: 0,
                    20015: 0,
                    20016: 0,
                    20017: 0,
                    20018: 0,
                    20019: 0,
                    20020: 0,
                    20021: 0,
                    20022: 0,
                    20023: 0,
                    20024: 0,
                    20025: 0,
                    20026: 0,
                    20027: 0,
                    20028: 0,
                    20029: 0,
                    20030: 0,
                    20031: 0,
                    20032: 0,
                    20033: 0,
                    20034: 0,
                    20035: 0,
                    20036: 0,
                    20037: 0,
                    20041: 0,
                    20042: 0,
                    20043: 0,
                    20044: 0,
                    20045: 0,
                    20046: 0,
                    30001: 0,
                    30002: 0,
                    30003: 0,
                    30004: 0,
                    30005: 0
                }
                let localAdminModuleData: { name: string, modulesid: string }[] = (userLocalData.getvalue('modules') && Array.isArray(userLocalData.getvalue('modules'))) ? userLocalData.getvalue('modules') : [];

                for (let ad = 0; ad < localAdminModuleData.length; ad++) {
                    const element = localAdminModuleData[ad];
                    if (element.modulesid && !((Number(userData.clientId) === userLocalData.browserExtensionClientId) && ["20001"].includes("" + element.modulesid))) {
                        // @ts-ignore
                        adminSettings[element.modulesid] = 1;
                    }
                }

                let localPlatformModuleData: { name: string, platformid: string }[] = (userLocalData.getvalue('platform') && Array.isArray(userLocalData.getvalue('platform'))) ? userLocalData.getvalue('platform') : [];


                for (let ad = 0; ad < localPlatformModuleData.length; ad++) {
                    const element = localPlatformModuleData[ad];
                    if (element.platformid) {
                        // @ts-ignore
                        adminSettings[element.platformid] = 1;
                    }
                }


                let localAddOnsModuleData: { name: string, addonsid: string }[] = (userLocalData.getvalue('addons') && Array.isArray(userLocalData.getvalue('addons'))) ? userLocalData.getvalue('addons') : [];


                for (let ad = 0; ad < localAddOnsModuleData.length; ad++) {
                    const element = localAddOnsModuleData[ad];
                    if (element.addonsid) {
                        // @ts-ignore
                        adminSettings[element.addonsid] = 1;
                    }
                }
                let localSettingsModuleData: { name: string, settingsid: string }[] = (userLocalData.getvalue('settings') && Array.isArray(userLocalData.getvalue('settings'))) ? userLocalData.getvalue('settings') : [];


                for (let ad = 0; ad < localSettingsModuleData.length; ad++) {
                    const element = localSettingsModuleData[ad];
                    if (element.settingsid && !((Number(userData.clientId) === userLocalData.browserExtensionClientId) && ["20023", "20025", "20028", "20021"].includes("" + element.settingsid))) {
                        // @ts-ignore
                        adminSettings[element.settingsid] = 1;
                    }
                }


                let integrationsRoleWise = [];


                for (let rs = 0; rs < tempRole.integrations?.length; rs++) {
                    const element = tempRole.integrations[rs];
                    let subSettings = [];
                    if (element.isEnabled) {
                        let isInAdmin = true;
                        if (((element.settingId === 40001) && !adminSettings[20001]) || ((element.settingId === 40002) && !adminSettings[20002]) || ((element.settingId === 40003) && !adminSettings[20004]) || ((element.settingId === 40004) && !adminSettings[20003]) || ((element.settingId === 400009) && !adminSettings[20021])) {
                            isInAdmin = false;
                        }
                        if (isInAdmin) {
                            integrationsRoleWise.push(element.settingId);
                            if (element.subSettings?.length) {
                                for (let rss = 0; rss < element.subSettings.length; rss++) {
                                    const subElement = element.subSettings[rss];
                                    if (subElement.isChecked) {
                                        subSettings.push(subElement.subIntegrationId);
                                        integrationsRoleWise.push(subElement.subIntegrationId);
                                    }
                                }
                            }
                        }
                        // if (element.settingId === 40001) {
                        //     settings.IsJobEnabled = element.isEnabled;
                        //     settings.JobSettings = subSettings;
                        // } else if (element.settingId === 40002) {
                        //     settings.IsCandidateEnabled = element.isEnabled;
                        //     settings.CandidateSettings = subSettings;
                        // } else if (element.settingId === 40003) {
                        //     settings.IsContactEnabled = element.isEnabled;
                        //     settings.ContactSettings = subSettings;
                        // } else if (element.settingId === 40004) {
                        //     settings.IsClientEnabled = element.isEnabled;
                        //     settings.ClientSettings = subSettings;
                        // } else if (element.settingId === 40005) {
                        //     settings.IsEmailAndSmsEnabled = element.isEnabled;
                        //     settings.EmailAndSmsSettings = subSettings;
                        // } else if (element.settingId === 40006) {
                        //     settings.IsTalentEnabled = element.isEnabled;
                        //     settings.TalentSettings = subSettings;
                        // } else if (element.settingId === 40007) {
                        //     settings.IsAnalyticsEnabled = element.isEnabled;
                        //     settings.AnalyticsSettings = subSettings;
                        // } else if (element.settingId === 40008) {
                        //     settings.IsSubscriptionEnabled = element.isEnabled;
                        //     settings.SubscriptionSettings = subSettings;
                        // }
                    }

                }

                // settings.candidateSettings.push(1)
                // let integrations = {
                //     IsAdminEnabled: false,
                //     AdminSettings: {
                //         User: 0,
                //         Role: 0
                //     }
                //     ,
                //     IsCompanyEnabled: false,
                //     CompanySettings: {
                //         Brand: 0,
                //         Goals: 0,
                //         CareerPortal: 0,
                //         Organization: 0,
                //         Source: 0,
                //         SendingLimit: 0,
                //         SequenceRuleset: 0,
                //         Community: 0,
                //         Referral: 0,
                //     }
                //     ,
                //     IsDeveloperEnabled: false,
                //     DeveloperSettings: {
                //         Webhook: 0,
                //         API: 0,
                //     }
                //     ,
                //     IsAppEnabled: false,
                //     AppSettings: {
                //         MessageTemplates: 0,
                //         CustomFields: 0,
                //         Reasons: 0,
                //         OptionBanks: 0,
                //         DuplicateSettings: 0,
                //         Score: 0,
                //         Goals: 0,
                //         HolidaySetting: 0,
                //     }
                //     ,
                // };

                let settingsRoleWise = {
                    10001: 0,
                    10002: 0,
                    10003: 0,
                    10004: 0,
                    100001: 0,
                    100002: 0,
                    110001: 0,
                    110002: 0,
                    110003: 0,
                    110004: 0,
                    110005: 0,
                    110006: 0,
                    110007: 0,
                    110008: 0,
                    110009: 0,
                    120001: 0,
                    120002: 0,
                    130001: 0,
                    130002: 0,
                    130003: 0,
                    130004: 0,
                    130005: 0,
                    130006: 0,
                    130007: 0,
                    130008: 0,
                    130009: 0
                };

                for (let rs = 0; rs < tempRole.settings?.length; rs++) {
                    const element = tempRole.settings[rs];
                    if (element.isEnabled) {
                        // @ts-ignore
                        settingsRoleWise[element.settingId] = 1;
                        // if (element.settingId === 10001) {
                        //     integrations.IsAdminEnabled = true;
                        // } else if (element.settingId === 10002) {
                        //     integrations.IsCompanyEnabled = true;
                        // } else if (element.settingId === 10003) {
                        //     integrations.IsDeveloperEnabled = true;
                        // } else if (element.settingId === 10004) {
                        //     integrations.IsAppEnabled = true;
                        // }
                        if (element.subSettings?.length) {
                            for (let rss = 0; rss < element.subSettings.length; rss++) {
                                const subElement = element.subSettings[rss];
                                // @ts-ignore
                                settingsRoleWise[subElement.subSettingId] = subElement.value;
                                // if (subElement.subSettingId === 100001) {
                                //     integrations.AdminSettings.User = subElement.value;
                                // } else if (subElement.subSettingId === 100002) {
                                //     integrations.AdminSettings.Role = subElement.value;
                                // } else if (subElement.subSettingId === 110001) {
                                //     integrations.CompanySettings.Brand = subElement.value;
                                // } else if (subElement.subSettingId === 110002) {
                                //     integrations.CompanySettings.Goals = subElement.value;
                                // } else if (subElement.subSettingId === 110003) {
                                //     integrations.CompanySettings.CareerPortal = subElement.value;
                                // } else if (subElement.subSettingId === 110004) {
                                //     integrations.CompanySettings.Organization = subElement.value;
                                // } else if (subElement.subSettingId === 110005) {
                                //     integrations.CompanySettings.Source = subElement.value;
                                // } else if (subElement.subSettingId === 110006) {
                                //     integrations.CompanySettings.SendingLimit = subElement.value;
                                // } else if (subElement.subSettingId === 110007) {
                                //     integrations.CompanySettings.SequenceRuleset = subElement.value;
                                // } else if (subElement.subSettingId === 110008) {
                                //     integrations.CompanySettings.Community = subElement.value;
                                // } else if (subElement.subSettingId === 110009) {
                                //     integrations.CompanySettings.Referral = subElement.value;
                                // } else if (subElement.subSettingId === 120001) {
                                //     integrations.DeveloperSettings.Webhook = subElement.value;
                                // } else if (subElement.subSettingId === 120002) {
                                //     integrations.DeveloperSettings.API = subElement.value;
                                // } else if (subElement.subSettingId === 130001) {
                                //     integrations.AppSettings.MessageTemplates = subElement.value;
                                // } else if (subElement.subSettingId === 130002) {
                                //     integrations.AppSettings.CustomFields = subElement.value;
                                // } else if (subElement.subSettingId === 130003) {
                                //     integrations.AppSettings.Reasons = subElement.value;
                                // } else if (subElement.subSettingId === 130004) {
                                //     integrations.AppSettings.OptionBanks = subElement.value;
                                // } else if (subElement.subSettingId === 130005) {
                                //     integrations.AppSettings.DuplicateSettings = subElement.value;
                                // } else if (subElement.subSettingId === 130006) {
                                //     integrations.AppSettings.Score = subElement.value;
                                // } else if (subElement.subSettingId === 130007) {
                                //     integrations.AppSettings.Goals = subElement.value;
                                // } else if (subElement.subSettingId === 130008) {
                                //     integrations.AppSettings.HolidaySetting = subElement.value;
                                // }
                            }
                        }
                    }

                }

                // if (userLocalData.isClient7()) {

                //     adminSettings['20019'] = 1;
                //     adminSettings['20020'] = 1;
                //     adminSettings['20022'] = 1;
                //     adminSettings['20024'] = 1;
                //     adminSettings['30003'] = 1;



                //     settingsRoleWise['10001'] = 1;
                //     // settingsRoleWise['100001'] = 1;
                //     // settingsRoleWise['100002'] = 1;
                //     settingsRoleWise['110007'] = 1;
                //     settingsRoleWise['110008'] = 1;
                //     settingsRoleWise['130001'] = 1;
                //     // settingsRoleWise['130003'] = 1;
                //     settingsRoleWise['130001'] = 6;
                //     settingsRoleWise['130008'] = 6;

                //     integrationsRoleWise = [
                //         40002,
                //         40005,
                //         40006,
                //         40007,
                //         400005,
                //         400006,
                //         400007,
                //         400008,
                //         400020,
                //         400030,
                //         400031,
                //         400032,
                //         400033,
                //         400034,
                //         400035,
                //         400036,
                //         400037,
                //     ];
                //     cookieStore.setCookie('extensionClient', 'true');
                // }

                localStorage.setItem("masterRoleWiseSettings", JSON.stringify({
                    settingsRoleWise: settingsRoleWise,
                    integrationsRoleWise: integrationsRoleWise,
                    adminRoleWise: adminSettings
                }));


                localStorage.setItem("masterRequireAuthSettings", JSON.stringify({
                    settingIds: settingsRoleWise,
                    integrationIds: integrationsRoleWise.reduce((obj: any, val) => (obj[val] = 1, obj), {}),
                    adminIds: adminSettings
                }));
                // const passDataToExtensionChannel = new BroadcastChannel('passDataToExtension');
                window?.postMessage({
                    curatelyLoginFromBrowser: true,
                    json: userData,
                    // demoUserInfo: tempData,
                    // masterRoleWiseSettings: JSON.stringify({
                    //     settingsRoleWise: settingsRoleWise,
                    //     integrationsRoleWise: integrationsRoleWise,
                    //     adminRoleWise: adminSettings
                    // })
                }, '*');


                // console.log(settings);
                // console.log(integrations);
            }
            callback();
        });
    };

    let signOut = (callback: VoidFunction) => {
        return checkAuth.signOut(() => {
            localStorage.clear();
            sessionStorage.clear();
            // localStorage.removeItem('curatelyUsername');
            setUser(null);
            callback();
        });
    };

    let value = { user, signIn, signOut };

    return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>;
}

function useAuth() {
    return React.useContext(AuthContext);
}
function RequireAuth({ children,
    // settingId, integrationId, adminId 
}: {
    children: JSX.Element,
    // settingId?: roleNumbersInterface["settingRoleWiseNumbers"], integrationId?: roleNumbersInterface["integrationsRoleWiseNumbers"], adminId?: roleNumbersInterface["adminWiseNumber"] 
}) {
    // console.log(role);

    let auth = useAuth();
    let location = useLocation();

    let { clientName } = useParams();
    // console.log(userLocalData.getvalue('clientName'));
    if (!auth.user || ((clientName !== userLocalData.getvalue('clientName')) && !(localStorage.getItem('switchCuratelyAccount')))) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.

        if (cookieStore.getCookie('extensionClient')) {
            return <Navigate to="/signin" state={{ from: location }} replace />;
        }
        return <Navigate to="/login" state={{ from: location }} replace />;
        // return <Navigate to={`/login?redirectTo=${window.location.hash}`} state={{ from: location }} replace />;
    }
    // if (adminId) {
    //     if (userLocalData.adminSettings(adminId)) {
    //         return children
    //     } else {
    //         return <Navigate to={`/${clientName}/unAuthorized`} state={{ from: location }} replace />;
    //     }
    // }
    // if (integrationId) {
    //     if (userLocalData.checkIntegration(integrationId)) {
    //         return children
    //     } else {
    //         return <Navigate to={`/${clientName}/unAuthorized`} state={{ from: location }} replace />;
    //     }
    // }
    // if (settingId) {
    //     if (userLocalData.checkSettings(settingId)) {
    //         return children
    //     } else {
    //         return <Navigate to={`/${clientName}/unAuthorized`} state={{ from: location }} replace />;
    //     }
    // }


    return children;
}

export { AuthProvider, RequireAuth, useAuth };


// {
//     Userid: "1893",
//     Username: "Adityak",
//     anew: "1",
//     assign_clients: "",
//     aupdate: "1",
//     aview: "1",
//     blastemail: "1",
//     blastsms: "1",
//     branch: "",
//     clients: "",
//     cnew: "1",
//     cpids: "",
//     cupdate: "1",
//     cview: "1",
//     email: "adityak@askconsulting.com",
//     fullname: "Aditya Kumar",
//     indeedemail: "",
//     intranet: "1",
//     jadvr: "1",
//     jnew: "1",
//     jupdate: "1",
//     jview: "1",
//     location: "Hyderabad",
//     p1new: "1",
//     p1update: "1",
//     p1view: "1",
//     phone: "",
//     pnew: "1",
//     pupdate: "1",
//     pview: "1",
//     role: "R",
//     searchbot: "1",
//     sessid: "95F3920F452157CD6D66DBDB1D860CA6",
//     specific: "0",
// }