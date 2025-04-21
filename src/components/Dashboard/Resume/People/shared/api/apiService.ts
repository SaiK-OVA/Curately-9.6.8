import axios from 'axios';
import { userLocalData } from '../../../../../../shared/services/userData';
// import { TemplateResponse } from '../interface/common';

// import { Employee } from '../../core/interfaces/employee';
// import * as dotenv from 'dotenv';
// dotenv.config();

// const apiUrl = process.env.REACT_APP_API_URL || '';
// console.log(process.env);
// import UserData from '../../shared/data/userData';

// const Url171 = (process.env.NODE_ENV === "development" || window.location.protocol === 'http:') ? "https://devapi.cxninja.com/" : "https://api.curately.ai/";
// const adminApi = (process.env.NODE_ENV === "development" || window.location.protocol === 'http:') ? "https://adminapi.cxninja.com/" : "https://adminapi.curately.ai/";
// const adminApi = (process.env.NODE_ENV === "development" || window.location.protocol === 'http:') ? import.meta.env.VITE_URL_CXADMIN + "curatelyAdmin/" : import.meta.env.VITE_URL_ADMIN;

// const Url171 = (process.env.NODE_ENV === "development" || window.location.protocol === 'http:') ? import.meta.env.VITE_URL_216 + "QADemoCurately/" : import.meta.env.VITE_URL_PEOPLE;

const adminApi = import.meta.env.VITE_URL_ADMIN;

const Url171 = import.meta.env.VITE_URL_PEOPLE;

const chromExtUrl = import.meta.env.VITE_URL_ADMIN_ONLY;
//  import.meta.env.VITE_URL_214

// https://api.cxninja.com/
// https://adminapi.curately.ai => curately admin
// http://35.155.202.216:8080/
// http://52.34.40.39:8900/
// https://qaapi.cxninja.com/

// const Url233 = (process.env.NODE_ENV === "development") ? "http://35.155.228.233:41088/Sequence/api/v1/" : "https://resume.accuick.com/Sequence/api/v1/";

// const Url233 = (process.env.NODE_ENV === "development" || window.location.protocol === 'http:') ? "http://35.155.228.233:41088/Sequence/" : "https://sequence.accuick.com/Sequence/";

// const Url233 = (process.env.NODE_ENV === "development" || window.location.protocol === 'http:') ? "http://34.208.108.171:41088/SequenceApi/" : "https://resume.accuick.com/SequenceApi";

// http://35.155.228.233:41088/Sequence/api/v1/getSequence
// NODE_ENV: "development"
// alert(apiUrl);

const recrId = userLocalData.getvalue('recrId')

const isChromeExtEnable = userLocalData.isChromeExtensionEnabled();


// console.log("working", isChromeExtEnable);

const recrIds = userLocalData.getvalue('invitedAndReferredRecrIds');

// console.log("recrIds", recrIds);

class ApiService {


  isCandidate = () => window.location.hash.includes('/resume/people');
  isContact = () => window.location.hash.includes('/contact/people');
  getClientId(): any {
    let clientId: any = userLocalData.getvalue('clientId');
      // ? localStorage.getItem("clientId")
      // : "3";
    let warName = "";
    if (clientId && clientId === "2") {
      warName = "QADemoCurately"; //DemoCurately
    } else {
      warName = "QADemoCurately";
    }
    return warName;
  }

  getSuggessions(data: any): any {
    // http://35.155.202.216:8080/DemoCurately/peoplebyskillncompany
    const header: any = new Headers();
    header.append("Access-Control-Allow-Origin", "*");
    header.append("Content-Type", "application/json;charset=UTF-8");
    // axios.get(Url233 + 'getAuditLog');
    return axios.post(Url171 + "suggestions", { ...data, candidate: this.isCandidate(), contact: this.isContact(), isExtension: userLocalData.isChromeExtensionEnabled() }, header);
  }
  getTableData(data: any): any {
    // http://35.155.202.216:8080/DemoCurately/peoplebyskillncompany
    const header: any = new Headers();
    header.append("Access-Control-Allow-Origin", "*");
    header.append("Content-Type", "application/json;charset=UTF-8");
    // Url171 + 'personsearch',

    data.clientId = userLocalData.getvalue('clientId');
    if (data.distance && !this.isNumber(data.distance)) {
      data.distance = Number(data.distance.replace(/[^0-9]/g, ''));
    }
    data.isUSLocationEnabled = userLocalData.adminSettings(20041) ? false : true
    // axios.get(Url233 + 'getAuditLog');
    return axios.post(`${Url171}${this.isContact() ? 'contactsearchescluster ' : 'personsearchescluster'}`, { ...data, candidate: this.isCandidate(), contact: this.isContact(), isExtension: userLocalData.isChromeExtensionEnabled() }, header);
  }

  isNumber(n: string) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); }

  saveToAccuick(data: any): any {
    // { "recrId": 1893, "companyId": "12938", "personIds": ["rBgUTNZJDBydAUuBUKzwfw_0000"], "clientId": "3",  }
    const header: any = new Headers();
    header.append("Access-Control-Allow-Origin", "*");
    header.append("Content-Type", "application/json;charset=UTF-8");
    // axios.get(Url233 + 'getAuditLog');
    data.clientId = userLocalData.getvalue('clientId');
    const contactData = {
      recrId: data.recrId,
      personIds: data.personIds,
      clientId: data.clientId,
      isSaveWithEmail: data.isSaveWithEmail,
      isSaveWithPhoneNumber: data.isSaveWithPhoneNumber,
      candidate: this.isCandidate(),
      contact: this.isContact(),
      isExtension: userLocalData.isChromeExtensionEnabled()
    }
    return axios.post(`${Url171}${this.isContact() ? 'savetocontact' : 'saveToAccuick'}`, this.isContact() ? { ...contactData } : { ...data }, header);
  }
  getProfileData(data: any): any {
    // http://35.155.202.216:8080/DemoCurately/peoplebyskillncompany
    const header: any = new Headers();
    header.append("Access-Control-Allow-Origin", "*");
    header.append("Content-Type", "application/json;charset=UTF-8");
    data.clientId = userLocalData.getvalue('clientId');
    // axios.get(Url233 + 'getAuditLog');
    return axios.post(Url171 + "searchbypid", { ...data, candidate: this.isCandidate(), contact: this.isContact(), isExtension: userLocalData.isChromeExtensionEnabled() }, header);
  }
  isrecordexists(data: any): any {
    // http://35.155.202.216:8080/DemoCurately/peoplebyskillncompany
    const header: any = new Headers();
    header.append("Access-Control-Allow-Origin", "*");
    header.append("Content-Type", "application/json;charset=UTF-8");
    data.clientId = userLocalData.getvalue('clientId');
    // axios.get(Url233 + 'getAuditLog');
    return axios.post(Url171 + "isrecordexists", { ...data, candidate: this.isCandidate(), contact: this.isContact(), isExtension: userLocalData.isChromeExtensionEnabled() }, header);
  }

  PersonaDatalist(data: any): any {
    // http://35.155.202.216:8080/DemoCurately/peoplebyskillncompany
    const header: any = new Headers();
    header.append("Access-Control-Allow-Origin", "*");
    header.append("Content-Type", "application/json;charset=UTF-8");
    data.clientId = userLocalData.getvalue('clientId');
    // axios.get(Url233 + 'getAuditLog');
    return axios.post(Url171 + "getPersonaByUserId", { ...data, candidate: this.isCandidate(), contact: this.isContact(), isExtension: userLocalData.isChromeExtensionEnabled() }, header);
  }

  PersonaManageData(data: any): any {
    // http://35.155.202.216:8080/DemoCurately/peoplebyskillncompany
    const header: any = new Headers();
    header.append("Access-Control-Allow-Origin", "*");
    header.append("Content-Type", "application/json;charset=UTF-8");
    data.clientId = userLocalData.getvalue('clientId');
    // axios.get(Url233 + 'getAuditLog');
    return axios.post(Url171 + "managePersonaList", { ...data, candidate: this.isCandidate(), contact: this.isContact(), isExtension: userLocalData.isChromeExtensionEnabled() }, header);
  }

  CreatePersonaData(data: any): any {
    // http://35.155.202.216:8080/DemoCurately/peoplebyskillncompany
    const header: any = new Headers();
    header.append("Access-Control-Allow-Origin", "*");
    header.append("Content-Type", "application/json;charset=UTF-8");
    // axios.get(Url233 + 'getAuditLog');
    data.clientId = userLocalData.getvalue('clientId');
    return axios.post(Url171 + "createPersona", { ...data, candidate: this.isCandidate(), contact: this.isContact(), isExtension: userLocalData.isChromeExtensionEnabled() }, header);
  }
  swapPersonaOrder(data: any): any {
    // http://35.155.202.216:8080/DemoCurately/peoplebyskillncompany
    const header: any = new Headers();
    header.append("Access-Control-Allow-Origin", "*");
    header.append("Content-Type", "application/json;charset=UTF-8");
    // axios.get(Url233 + 'getAuditLog');
    let clientId = userLocalData.getvalue('clientId');
    const url = Url171 + `swapPersonaOrder/${clientId}/61`;
    return axios.post(url, data, header);
  }

  DeletePersonaData(data: any): any {
    // http://35.155.202.216:8080/DemoCurately/peoplebyskillncompany
    const header: any = new Headers();
    header.append("Access-Control-Allow-Origin", "*");
    header.append("Content-Type", "application/json;charset=UTF-8");
    // axios.get(Url233 + 'getAuditLog');
    data.clientId = userLocalData.getvalue('clientId');
    return axios.post(Url171 + "deletePersona", { ...data, candidate: this.isCandidate(), contact: this.isContact(), isExtension: userLocalData.isChromeExtensionEnabled() }, header);
  }

  EditPersonaData(data: any): any {
    // http://35.155.202.216:8080/DemoCurately/peoplebyskillncompany
    const header: any = new Headers();
    header.append("Access-Control-Allow-Origin", "*");
    header.append("Content-Type", "application/json;charset=UTF-8");
    // axios.get(Url233 + 'getAuditLog');
    data.clientId = userLocalData.getvalue('clientId');
    return axios.post(Url171 + "editPersona", { ...data, candidate: this.isCandidate(), contact: this.isContact(), isExtension: userLocalData.isChromeExtensionEnabled() }, header);
  }

  GetCompanyData(data: any) {
    return axios(
      "https://www4.accuick.com/ChatBot/companySearch.jsp?search=" + data
    );
  }
  ListLayoutData(data: any): any {
    // http://35.155.202.216:8080/DemoCurately/peoplebyskillncompany
    const header: any = new Headers();
    header.append("Access-Control-Allow-Origin", "*");
    header.append("Content-Type", "application/json;charset=UTF-8");
    // axios.get(Url233 + 'getAuditLog');
    data.clientId = userLocalData.getvalue('clientId');
    return axios.post(Url171 + "listlayout", { ...data, candidate: this.isCandidate(), contact: this.isContact(), isExtension: userLocalData.isChromeExtensionEnabled() }, header);
  }

  SaveLayoutData(data: any): any {
    // http://35.155.202.216:8080/DemoCurately/peoplebyskillncompany
    const header: any = new Headers();
    header.append("Access-Control-Allow-Origin", "*");
    header.append("Content-Type", "application/json;charset=UTF-8");
    // axios.get(Url233 + 'getAuditLog');
    data.clientId = userLocalData.getvalue('clientId');
    return axios.post(Url171 + "saveLayout", { ...data, candidate: this.isCandidate(), contact: this.isContact(), isExtension: userLocalData.isChromeExtensionEnabled() }, header);
  }

  UpdateLayoutData(data: any): any {
    // http://35.155.202.216:8080/DemoCurately/peoplebyskillncompany
    const header: any = new Headers();
    header.append("Access-Control-Allow-Origin", "*");
    header.append("Content-Type", "application/json;charset=UTF-8");
    // axios.get(Url233 + 'getAuditLog');
    data.clientId = userLocalData.getvalue('clientId');
    return axios.post(Url171 + "updateLayout", { ...data, candidate: this.isCandidate(), contact: this.isContact(), isExtension: userLocalData.isChromeExtensionEnabled() }, header);
  }

  getElasticRecordCount(): any {
    const header: any = new Headers();
    header.append("Access-Control-Allow-Origin", "*");
    header.append("Content-Type", "application/json;charset=UTF-8");
    // axios.get(Url233 + 'getAuditLog');
    let data: any = {
      recrId: recrId,
      clientId: userLocalData.getvalue('clientId'),
      isUSLocationEnabled: userLocalData.adminSettings(20041) ? false : true
    };
    console.log("isChromeExtEnable", isChromeExtEnable);
    if (isChromeExtEnable) {
      data.recrIds = recrIds
    }

    return axios.post(`${Url171}getElasticRecordCount`, { ...data, candidate: this.isCandidate(), contact: this.isContact(), isExtension: userLocalData.isChromeExtensionEnabled() }, header);
  }

  GetLayoutData(data: any): any {
    // http://35.155.202.216:8080/DemoCurately/peoplebyskillncompany
    const header: any = new Headers();
    header.append("Access-Control-Allow-Origin", "*");
    header.append("Content-Type", "application/json;charset=UTF-8");
    // axios.get(Url233 + 'getAuditLog');
    data.clientId = userLocalData.getvalue('clientId');
    return axios.post(Url171 + "getlayout", { ...data, candidate: this.isCandidate(), contact: this.isContact(), isExtension: userLocalData.isChromeExtensionEnabled() }, header);
  }

  ChangeSelectedLayout(data: any): any {
    // http://35.155.202.216:8080/DemoCurately/peoplebyskillncompany
    const header: any = new Headers();
    header.append("Access-Control-Allow-Origin", "*");
    header.append("Content-Type", "application/json;charset=UTF-8");
    // axios.get(Url233 + 'getAuditLog');
    data.clientId = userLocalData.getvalue('clientId');
    return axios.post(Url171 + "changeselectedlayout", { ...data, candidate: this.isCandidate(), contact: this.isContact(), isExtension: userLocalData.isChromeExtensionEnabled() }, header);
  }

  DeleteLayout(data: any): any {
    // http://35.155.202.216:8080/DemoCurately/peoplebyskillncompany
    const header: any = new Headers();
    header.append("Access-Control-Allow-Origin", "*");
    header.append("Content-Type", "application/json;charset=UTF-8");
    // axios.get(Url233 + 'getAuditLog');
    data.clientId = userLocalData.getvalue('clientId');
    return axios.post(Url171 + "deletelayout", { ...data, candidate: this.isCandidate(), contact: this.isContact(), isExtension: userLocalData.isChromeExtensionEnabled() }, header);
  }

  AddToList(userId: any): any {
    const header: any = {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    };
    const apiUrl = `https://www4.accuick.com/Accuick_API/distributionlist.jsp?userId=${userId}&type=Candidate`;

    return axios.get(apiUrl, header);
  }

  getListByContactId(data: any) {
    const header: any = {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    };

    const apiUrl = `${chromExtUrl}curatelyAdmin/getListById/${data.contId}/${data.clientId}`;

    return axios.get(apiUrl, header);
  }

  getMySequenceList(userId: any): any {
    // let clientId = localStorage.getItem("clientId")
    //   ? localStorage.getItem("clientId")
    //   : "3";
    let data: any = {
      recrId: recrId,
      clientId: userLocalData.getvalue('clientId'),
    };
    if (isChromeExtEnable) {
      data.recrIds = recrIds
    }
    return axios.post(adminApi + `getSequenceList`, { ...data, candidate: this.isCandidate(), contact: this.isContact(), isExtension: userLocalData.isChromeExtensionEnabled() });
  }

  getAllSequenceList(): any {
    // let clientId = localStorage.getItem("clientId")
    //   ? localStorage.getItem("clientId")
    //   : "3";
    // const header: any = {
    //     'Content-Type': 'application/json;charset=UTF-8',
    //     'Access-Control-Allow-Origin': '*',
    // };
    // const apiUrl = `https://app.curately.ai/Accuick_API/Curately/Sequence/sequence_list.jsp?clientId=${clientId}`;

    // return axios.get(apiUrl, header);
    let data: any = {
      recrId: recrId,
      clientId: userLocalData.getvalue('clientId'),
    };
    if (isChromeExtEnable) {
      data.recrIds = recrIds
    }
    return axios.post(`${adminApi}getSequenceList`, { ...data, candidate: this.isCandidate(), contact: this.isContact(), isExtension: userLocalData.isChromeExtensionEnabled() });
  }

  SendSequenceList(seqId: any, userId: any, canUserId: any): any {
    // let clientId = localStorage.getItem("clientId")
    //   ? localStorage.getItem("clientId")
    //   : "3";
    // const header: any = {
    //   "Content-Type": "application/json;charset=UTF-8",
    //   "Access-Control-Allow-Origin": "*",
    // };
    // const apiUrl = `https://app.curately.ai/Accuick_API/Curately/Sequence/sequence_assign_users.jsp?sequenceId=${seqId}&userIds=42172&recrId=${userId}&clientId=${clientId}`;

    // return axios.get(apiUrl, header);
    let data: any = {
      recrId: recrId,
      sequenceId: seqId,
      userIds: userId,
      contIds: userId,
      clientId: userLocalData.getvalue('clientId'),
    };
    if (isChromeExtEnable) {
      data.recrIds = recrIds
    }
    return axios.post(`${adminApi}${this.isContact() ? 'sequenceAssignContacts' : 'sequenceAssignUsers'}`, { ...data, candidate: this.isCandidate(), contact: this.isContact(), isExtension: userLocalData.isChromeExtensionEnabled() });
  }

  BulkContactSequenceSave(data: any) {
    return axios.post(`${adminApi}sequenceAssignContacts`, data);
  }

  getTemplateList() {
    let clientId = userLocalData.getvalue('clientId');

    // const header: any = new Headers();
    // return axios.post(
    //     `${Url171}QADemoCurately/searchTemplates`,
    //     {
    //         clientId,
    //         templateName: "",
    //         type: "AllEmailTemplates"
    //     },
    //     header
    // );
    return axios.get(`${adminApi}getEmailTemplatesList/1893/${clientId}`);
  }

  getTemplateDetails(templateId: any) {
    let clientId = userLocalData.getvalue('clientId');
    return axios.get(
      `${adminApi}getEmailTemplatesListById/${templateId}/${clientId}`
    );
  }

  sendEmailTemplate(emailObj: any) {
    let clientId = userLocalData.getvalue('clientId');
    let regex = /(<([^>]+)>)/gi;
    let replacedstring = emailObj.body.replace(regex, "");
    // return axios.get(`
    // https://app.curately.ai/Accuick_API/Curately/Email/email_sent.jsp?clientId=${clientId}&subject=${emailObj.subject}&body=${replacedstring}&senderName=${emailObj.fromName}&senderEmail=${emailObj.fromEmail}&userIds=${emailObj.candId}&sendFrom=browser&recrId=61`)
    //35.155.202.216:8095/curatelyAdmin/emailSent
    let data: any = {
      clientId,
      userIds: emailObj.userIds,
      contId: 0,
      subject: emailObj.subject,
      body: replacedstring,
      recrId: recrId,
      senderName: emailObj.fromName,
      senderEmail: emailObj.fromEmail,
      sendFrom: "browser",
    };
    if (isChromeExtEnable) {
      data.recrIds = recrIds
    }
    http: return axios.post(`${adminApi}emailSent`, { ...data, candidate: this.isCandidate(), contact: this.isContact(), isExtension: userLocalData.isChromeExtensionEnabled() });
  }

  getFromList(data: any) {
    let clientId = userLocalData.getvalue('clientId');
    // return axios.get(`https://app.curately.ai/Accuick_API/Common/recruiter_json_email.jsp?search=${data}&clientId=${clientId}`)
    return axios.post(`${adminApi}recruiterJsonEmail`, {
      clientId: Number(clientId),
      search: null,
      candidate: this.isCandidate(), contact: this.isContact(), isExtension: userLocalData.isChromeExtensionEnabled()
    });
  }

  getPoolList(data: any) {
    let urlMethod = this.isContact() ? "getList" : "autocompleteTalentPool"
    let clientId = userLocalData.getvalue('clientId');

    let postData = this.isContact() ? {

      "clientId": clientId,
      "listName": data,
      isExtension: userLocalData.isChromeExtensionEnabled()

    }
      : {
        clientId: Number(clientId),
        recrId: userLocalData.getvalue('recrId'),
        search: data,
        candidate: this.isCandidate(), contact: this.isContact(), isExtension: userLocalData.isChromeExtensionEnabled()
      }
    // return axios.get(`https://app.curately.ai/Accuick_API/Curately/autocomplete_talentpool.jsp?search=${data}&clientId=${clientId}`)
    return axios.post(`${adminApi}${urlMethod}`, postData);
  }

  InsertPool(data: any) {
    let clientId = userLocalData.getvalue('clientId');
    // return axios.get(`https://app.curately.ai/Accuick_API/Curately/talent_pool_insert_index.jsp?clientId=${clientId}&poolId=${data.poolId}&recrId=61&userIds=42172`)


    return axios.post(`${chromExtUrl}curatelyAdmin/saveToTalentpool`, data);
  }

  SendEmail(data:any){
    return axios.post(`${chromExtUrl}curatelyAdmin/email/send`, data);
  }
  SendEmailContact(data:any){
    return axios.post(`${chromExtUrl}curatelyAdmin/emailContacts/send`, data);
  }
  

  saveContactList(data: any) {
    return axios.post(`${chromExtUrl}curatelyAdmin/saveListContacts`, data);
  }

  saveContactData(data: any) {
    return axios.post(`${Url171}savetocontact`, data);
  }

  searchSequence(data: any) {
    const header: any = {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    };

    const apiUrl = `${this.isContact() ? `${adminApi}searchContactSequence` : `${Url171}searchSequence`}`;

    return axios.post(apiUrl, { ...data, candidate: this.isCandidate(), contact: this.isContact(), isExtension: userLocalData.isChromeExtensionEnabled() }, header);
  }

  getPlaceHolder(data: any) {
    const header: any = {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    };
    const apiUrl = `${adminApi}placeHolders`;
    return axios.post(apiUrl, data, header);
  }

  sendEmailChromeExt(data: any) {
    const header: any = {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    };
    const apiUrl = `${chromExtUrl}curatelyAdmin/email/send`;
    return axios.post(apiUrl, data, header);
  }

  saveTalentPoolChromExt(data: any) {
    const header: any = {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    };
    const apiUrl = `${chromExtUrl}curatelyAdmin/saveToTalentpool`;
    return axios.post(apiUrl, { ...data, candidate: this.isCandidate(), contact: this.isContact(), isExtension: userLocalData.isChromeExtensionEnabled() }, header);
  }
  saveSequenceChromeExt(data: any) {
    const header: any = {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    };
    const apiUrl = `${chromExtUrl}curatelyAdmin/saveToSequence`;
    return axios.post(apiUrl, { ...data, candidate: this.isCandidate(), contact: this.isContact(), isExtension: userLocalData.isChromeExtensionEnabled() }, header);
  }

  profilesSearch(data: any) {
    const header: any = {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    };
    const apiUrl = `${chromExtUrl}curatelyAdmin/${this.isContact() ? 'contacts' : 'profiles'}/search`;
    return axios.post(apiUrl, { ...data, }, header);
  }

  saveLinkedinData(data: any) {
    const header: any = {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    };
    const apiUrl = `${chromExtUrl}curatelyAdmin/${this.isContact() ? 'saveContactLinkedinData ' : 'saveLinkedinData'}`;
    return axios.post(apiUrl, { ...data, }, header);
  }

  updateCredits(data: any) {
    const header: any = {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    };
    const apiUrl = `${chromExtUrl}curatelyAdmin/${this.isContact() ? 'updateContactVisibilityFlagsAndCredits ' : 'updateVisibilityFlagsAndCredits'}`;
    return axios.post(apiUrl, { ...data, }, header);
  }
}

export default new ApiService();