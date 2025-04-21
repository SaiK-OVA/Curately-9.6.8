import { trackPromise } from "react-promise-tracker";
import ApiService from "../../api/api";
import { userLocalData } from "../../services/userData";

const CandidateCommonAPIs = {
    save: (linkedinUrl: string, type: number, emailOrPhone: 'email' | 'phone', userId: string, successCallBack: () => void, errorCallBack: (message: string) => void, firstName: string = "", lastName: string = "", isCandidate: boolean = true) => {
        trackPromise(
            ApiService.postWithData(
                'admin',
                (!isCandidate && !userId) ? "saveContactLinkedinData" : (!isCandidate && userId) ? "updateContactVisibilityFlagsAndCredits" : userId ? 'updateVisibilityFlagsAndCredits' : 'saveLinkedinData',
                (!isCandidate && userId) ?
                    {
                        clientId: userLocalData.getvalue('clientId'),
                        recrId: userLocalData.getvalue('recrId'),
                        contId: userId,
                        isShowEmail: (emailOrPhone === 'email') ? true : false,
                        isShowPhone: (emailOrPhone === 'phone') ? true : false,
                        emailType: 1,
                        phoneType: 1,
                    }
                    :
                    (!isCandidate || !userId) ?
                        {
                            requestInfo: [
                                {
                                    url: linkedinUrl,
                                    type: !isCandidate ? 1 : type,
                                    firstName: firstName,
                                    lastName: lastName,
                                    isSaveWithEmail: (emailOrPhone === 'email') ? true : false,
                                    isSaveWithPhoneNumber: (emailOrPhone === 'phone') ? true : false,
                                    emailType: userId ? 0 : 1,
                                    phoneType: userId ? 0 : 1,
                                }
                            ],
                            clientId: userLocalData.getvalue('clientId'),
                            recrId: userLocalData.getvalue('recrId')
                        }
                        :
                        {
                            clientId: userLocalData.getvalue('clientId'),
                            recrId: userLocalData.getvalue('recrId'),
                            userId: userId,
                            isShowEmail: (emailOrPhone === 'email') ? true : false,
                            isShowPhone: (emailOrPhone === 'phone') ? true : false
                        }


            ).then(async (response) => {
                console.log(response.data);
                if (response.data?.userId || response.data?.Success || response.data?.success) {
                    successCallBack();
                } else {
                    errorCallBack(response.data.Message ? response.data.Message : "An error occured while saving Candidate Data.")
                }
            })
        )
    }
}

export default CandidateCommonAPIs;