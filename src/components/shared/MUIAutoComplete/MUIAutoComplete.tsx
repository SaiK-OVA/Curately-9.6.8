import { TextField } from '../../../shared/modules/MaterialImports/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { CircularProgress } from '../../../shared/modules/MaterialImports/CircularProgress';


import ApiService from "../../../shared/api/api";
// import { trackPromise } from 'react-promise-tracker';
import './MUIAutoComplete.scss';
// import InputAdornment from '@mui/material/InputAdornment';
import { useEffect, useState, Fragment } from '../../../shared/modules/React';
import { Grid } from '../../../shared/modules/MaterialImports/Grid';
import masterStatesList from '../../../shared/data/States';
import { userLocalData } from '../../../shared/services/userData';
import { LANGUAGES } from '../../../shared/data/Community/Community';
import { CurrentEmpStatus_10010, EmpAvailabilityStatus_10011, EmpJobPref_10012, EmpLocPref_10013, Preferredworkinghours_10019 } from '../../../shared/data/Community/Preference';
import ClearIcon from '@mui/icons-material/Clear';

// import Chip from '@mui/material/Chip';

interface ValueObj {
    label: string;
    id: string;
    objType?: string;
}

// function sleep(delay = 0) {
//     return new Promise((resolve) => {
//         setTimeout(resolve, delay);
//     });
// }

export const MUIAutoComplete = (
    {
        id,
        handleChange,
        valuePassed,
        isMultiple,
        isDisabled,
        textToShow,
        width,
        height,
        type,
        companyId,
        recrId,
        jobId,
        placeholder,
        error = false,
        freeSolo = false,
        className = '',
        addOnEnter,
        existingSequenceIds,
        refToPass,
        callApiOnce = false,
        onlyRecruiter = false
    }:
        {
            id: string,
            handleChange: any,
            valuePassed: any,
            isMultiple: boolean,
            isDisabled?: boolean,
            textToShow?: string,
            width?: string,
            height?: string,
            companyId?: string,
            recrId?: string,
            jobId?: string,
            placeholder: any,
            type: 'email' | 'phone' | 'sms' | 'id' | 'accuickId' | 'states' | 'status' | 'recordedVideo' | 'associatedJob' | 'companyName' | 'userName' | 'jobTitle' | 'jobTitleAndId' | 'language' | 'talentPool' | 'tag' | 'formbuilder' | 'workflow' | 'sequence' | 'communityUser' | 'AllEmailTemplates' | 'EmailBuilderTemplate' | 'EmailTemplate' | 'assignJobToCandidate' | 'assignCompanyToCandidate' | 'PreferencesEmpStatus' | 'PreferencesAvailabilityStatus' | 'PreferencesEmpJob' | 'PreferencesEmpLoc' | 'Preferencesworkinghours' | 'contactList' | 'contactName' | 'DataCollection' | 'workflowCandidate' | 'applicantJobTitle' | 'applicantName' | 'customFields' | 'contactSequence',
            error?: boolean,
            freeSolo?: boolean,
            className?: string,
            addOnEnter?: boolean,
            existingSequenceIds?: any,
            refToPass?: any,
            callApiOnce?: boolean,
            onlyRecruiter?: boolean
        }
) => {

    // let tempEmail = valuePassed;

    // const [selectedValue, setSelectedValue] = useState<string>((tempEmail) ? tempEmail : '');
    // const [mulSelectedValues, setMulSelectedValues] = useState<string[]>((tempEmail) ? tempEmail : []);

    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    // const inputRef = useRef<HTMLInputElement>(null);
    const [defaultOptions, setDefaultOptions] = useState<readonly ValueObj[]>([]);
    const [filteredOptions, setFilteredFromOptions] = useState<readonly ValueObj[]>(
        isMultiple
            ? (valuePassed && typeof valuePassed.id === 'string')
                ? valuePassed.id.split(',').map((a: string) => ({ label: a, id: a }))
                : []
            : [(valuePassed && valuePassed.id) ? valuePassed : null]
    );

    // console.log(valuePassed)
    if (valuePassed && valuePassed.id) {
        // console.log(valuePassed.id.split(',').map(function (a: ValueObj) { return { label: a, id: a } }));
    }
    // [(valuePassed && valuePassed.id) ? valuePassed : null]
    // { label: messageFormik.values.bcc, id: messageFormik.values.bcc }
    // const loading = open && filteredOptions.length === 0 && inputValue;
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        const searchFromApi = setTimeout(() => {
            // setFilteredFromOptions([]);
            // setInputValue((event.target.value) ? event.target.value : '');
            // console.log('in function');
            if (((inputValue === "") && defaultOptions.length) || (callApiOnce && defaultOptions.length)) {
                setFilteredFromOptions(defaultOptions);
            } else if (inputValue || inputValue === "") {
                switch (type) {
                    case "sms":
                        ApiService.getCall('admin', `getSmsList/0/${userLocalData.getvalue('clientId')}`).then((response: any) => {
                            let smsTemplates = response.data.list.map((i: { SMSName: string, SmsId: string, Body: string }) => ({
                                id: i.SmsId,
                                label: i.SMSName,
                                objType: i.Body
                            }));
                            removeSelectedIds([...smsTemplates]);
                        })
                        break;
                    case "phone":
                        ApiService.getByParams(193, 'Curately/Common/recruiter_json_phone.jsp', { search: inputValue }).then((response: any) => {
                            removeSelectedIds([...response.data]);
                        })
                        break;
                    case "userName":
                        ApiService.postWithData('admin', 'getRecruiterJsonUserName', { fullName: inputValue, clientId: userLocalData.getvalue('clientId') }).then((response: any) => {
                            if (response.data.Success) {
                                removeSelectedIds([...response.data.list]);
                            }
                        })
                        break;
                    case "email":
                        ApiService.postWithData('admin', 'recruiterJsonEmail', { search: inputValue, clientId: userLocalData.getvalue('clientId') }).then((response: any) => {
                            removeSelectedIds([...response.data]);
                        })
                        break;
                    case "id":
                        ApiService.postWithData("admin", 'getRecruiterJsonDetails', { "fullName": inputValue, "clientId": userLocalData.getvalue("clientId") }).then((response: any) => {
                            if (response.data?.Success) {
                                removeSelectedIds(!!response.data?.response?.response?.length ? response?.data?.response?.response : []);
                            }
                        })
                        break;
                    case "accuickId":
                        ApiService.postWithData("admin", 'getRecruiterJsonDetails', { "fullName": inputValue, "clientId": userLocalData.getvalue("clientId") }).then((response: any) => {
                            if (response.data?.Success) {
                                removeSelectedIds(!!response.data?.response?.response?.length ? response?.data?.response?.response : []);
                            }
                        })
                        break;
                    case "applicantJobTitle":
                        inputValue && ApiService.postWithData("admin", 'applicantsAutomation', { filterName: "title", filterValue: inputValue, recrId: recrId, clientId: userLocalData.getvalue('clientId') }).then((response: any) => {
                            const filteredOptions = response.data.jobTitles
                                .map((item: any) => ({
                                    label: item.trim(),
                                    id: item,
                                }))
                                .filter((option: any) => option.label !== '');
                            removeSelectedIds(filteredOptions);
                        })
                        break;
                    case "applicantName":
                        inputValue && ApiService.postWithData("admin", 'applicantsAutomation', { filterName: "name", filterValue: inputValue, recrId: recrId, clientId: userLocalData.getvalue('clientId') }).then((response: any) => {

                            const filteredOptions = response.data.names
                                .map((item: any) => ({
                                    label: item.trim(),
                                    id: item,
                                }))
                                .filter((option: any) => option.label !== '');
                            removeSelectedIds(filteredOptions);
                        })
                        break;
                    case "recordedVideo":
                        ApiService.postWithData(214, 'searchvideo', { label: inputValue, clientId: userLocalData.getvalue('clientId'), createdBy: userLocalData.getvalue('recrId') }).then((response: any) => {
                            if (response.data.List) {
                                let tempVideoList = response.data.List.map((i: { label: string, cameratagId: string }) => ({ id: i.cameratagId, label: i.label }))
                                // removeSelectedIds([...tempVideoList]);
                                removeExistingIds([...tempVideoList])
                            }
                        })
                        break;
                    case "associatedJob":
                        ApiService.getByParams(193, 'Contacts/associatedJobs.jsp', { compId: companyId, title: inputValue }).then((response: any) => {
                            removeSelectedIds([...response.data]);
                        })
                        break;
                    case "states":
                        removeSelectedIds([...masterStatesList]);
                        break;
                    case "language":
                        removeSelectedIds([...LANGUAGES]);
                        break;
                    case "PreferencesEmpStatus":
                        removeSelectedIds([...CurrentEmpStatus_10010]);
                        break;
                    case "PreferencesAvailabilityStatus":
                        removeSelectedIds([...EmpAvailabilityStatus_10011]);
                        break;
                    case "PreferencesEmpJob":
                        removeSelectedIds([...EmpJobPref_10012]);
                        break;
                    case "PreferencesEmpLoc":
                        removeSelectedIds([...EmpLocPref_10013]);
                        break;
                    case "Preferencesworkinghours":
                        removeSelectedIds([...Preferredworkinghours_10019]);
                        break;
                    case "companyName":
                        ApiService.postWithData("admin", 'getCompaniesList', { search: inputValue, clientId: userLocalData.getvalue("clientId") }).then((response: any) => {
                            if (response?.data?.Success) {
                                let companyNamesData = !!response?.data?.companiesList?.length ? response.data.companiesList.map((each: any) => ({
                                    id: each.compId || each.id,
                                    label: each.compName || each.label
                                })) : []
                                removeSelectedIds([...companyNamesData]);
                            }
                        })
                        break;
                    case "jobTitle":
                        ApiService.postWithData('admin', 'doAutocomplete', { search: inputValue, clientId: userLocalData.getvalue('clientId') }).then((response: any) => {
                            if (response.data.Message === "Success") {
                                removeSelectedIds([...response.data.list]);
                            }
                        })
                        break;
                    case "jobTitleAndId":
                        ApiService.postWithData('admin', 'getAutoCompletewithJobId', { search: inputValue, clientId: userLocalData.getvalue('clientId') }).then((response: any) => {
                            // removeSelectedIds([...response.data]);
                            let tempData = response.data.list.map((i: { jobTitle: string, jobId: string }) => ({ id: i.jobId, label: i.jobId + " - " + i.jobTitle }))
                            removeSelectedIds(tempData);
                        })
                        break;
                    case "talentPool":
                        ApiService.postWithData('admin', 'autocompleteTalentPool', { search: inputValue, clientId: userLocalData.getvalue('clientId'), recrId: userLocalData.getvalue('recrId') })
                            .then((response: any) => {
                                if (response.data.Message === "Success") {
                                    removeSelectedIds([...response.data.list]);
                                }
                                // console.log(response.data);
                                // let tempTalentPoolList = response.data.TagsList.map((i: { poolName: string, poolid: string }) => ({ id: i.poolid, label: i.poolName }))
                                // removeSelectedIds([...tempTalentPoolList]);
                            })
                        break;
                    case "formbuilder":
                        ApiService.getByParams(193, 'Curately/autocomplete_formbuilder.jsp', { search: inputValue })
                            .then((response: any) => {
                                removeSelectedIds([...response.data]);
                            })
                        break;
                    case "workflow":
                        ApiService.postWithData("admin", 'getAutoWorkflow', { search: inputValue, recrId: userLocalData.getvalue('recrId'), clientId: userLocalData.getvalue("clientId") })
                            .then((response: any) => {
                                if (!!response?.data?.Success) {
                                    let workflowData = !!response?.data?.list?.length ? response.data.list.map((each: any) => ({
                                        id: each.Id || each.id,
                                        label: each.Label || each.label
                                    })) : []
                                    removeSelectedIds([...workflowData]);
                                }
                            })
                        break;
                    case "workflowCandidate":
                        ApiService.postWithData('admin', 'workflowApplicantsViewQuery', { jobId: jobId, search: inputValue, clientId: userLocalData.getvalue('clientId') }).then((response: any) => {
                            if (response?.data?.array && Array.isArray(response.data.array)) {
                                removeSelectedIds([...response.data.array]);
                            }
                        })
                        break;
                    case "tag":
                        ApiService.postWithData('admin', 'getAutocompleteTags', { tagName: inputValue, clientId: userLocalData.getvalue('clientId'), recrId: userLocalData.getvalue('recrId') })
                            .then(
                                (response: any) => {
                                    if (response.data.Success) {
                                        removeSelectedIds([...response.data.list]);
                                    }
                                    // console.log(response.data);
                                    // let tempTagsList = response.data.TagsList.map((i: { TagName: string, Tagid: string }) => ({ id: i.Tagid, label: i.TagName }))
                                    // removeSelectedIds([...tempTagsList]);
                                }
                            )
                        break;
                    case "sequence":
                        // http://35.155.202.214:8080/DemoCurately/searchSequence
                        ApiService.postWithData('admin', 'searchSequence', {
                            "clientId": userLocalData.getvalue('clientId'),
                            "sequenceName": inputValue,
                            recrId: userLocalData.getvalue('recrId')
                        })
                            .then((response: any) => {
                                let tempSequencesList = response.data.list.map((i: { sequenceName: string, sequenceId: string }) => ({ id: i.sequenceId, label: i.sequenceName }))
                                // removeSelectedIds([...tempSequencesList]);
                                removeExistingIds([...tempSequencesList]);
                            })
                        break;
                    case "contactSequence":
                        ApiService.postWithData('admin', 'searchContactSequence', {
                            "clientId": userLocalData.getvalue('clientId'),
                            "sequenceName": inputValue,
                            recrId: userLocalData.getvalue('recrId')
                        })
                            .then((response: any) => {
                                let tempSequencesList = response.data.list.map((i: { sequenceName: string, sequenceId: string }) => ({ id: i.sequenceId, label: i.sequenceName }))
                                removeExistingIds([...tempSequencesList]);
                            })
                        break;
                    case "status":
                        // http://35.155.202.214:8080/DemoCurately/searchSequence
                        ApiService.getCall('admin', 'getshortListBarStages/' + userLocalData.getvalue('clientId'))
                            .then((response: any) => {
                                let tempStatusList = response.data.shortlistBarStages.map((i: { label: string, statusId: string }) => ({ id: i.statusId, label: i.label }))
                                // removeSelectedIds([...tempSequencesList]);
                                removeExistingIds([...tempStatusList]);
                            })
                        break;
                    case "contactName":
                        // http://localhost:90/QADemoCurately/searchcontact
                        ApiService.postWithData('admin', 'searchcontact', {
                            "clientId": userLocalData.getvalue('clientId'),
                            "name": inputValue
                        })
                            .then((response: any) => {
                                removeSelectedIds((response.data?.contactList ? response.data.contactList : []));
                            })
                        break;
                    case "contactList":
                        ApiService.postWithData('admin', 'getList', {
                            "clientId": userLocalData.getvalue('clientId'),
                            "listName": inputValue
                        })
                            .then((response: any) => {
                                let tempList = response.data.list.map((i: { listName: string, listId: string }) => ({ id: i.listId, label: i.listName }))
                                removeSelectedIds([...tempList]);
                            })
                        break;
                    case "communityUser":

                        // http://35.155.202.216:8095/curatelyAdmin/getUserAutoComplete
                        ApiService.postWithData('admin', 'getUserAutoComplete', { search: inputValue ? inputValue.trim() : inputValue, clientId: userLocalData.getvalue('clientId') })
                            .then(
                                (response: any) => {
                                    console.log(response.data)
                                    const filteredOptions = response.data.list
                                        .map((item: any) => ({
                                            label: item.label.trim(),
                                            id: item.id,
                                        }))
                                        .filter((option: any) => option.label !== '');
                                    removeSelectedIds(filteredOptions);
                                    // removeSelectedIds([...response.data]);
                                    // console.log(response.data);
                                }
                            )
                        break;
                    case "assignJobToCandidate":
                        // https://app.curately.ai/Accuick_API/Curately/job_autocomplete.jsp?search=12&clientId=3
                        ApiService.postWithData('admin', 'getAutoCompletewithJobId', { clientId: userLocalData.getvalue('clientId'), search: inputValue })
                            .then(
                                (response: any) => {
                                    let tempData = response.data.list.map((i: { jobTitle: string, jobId: string }) => ({ id: i.jobId, label: i.jobId + " - " + i.jobTitle }))
                                    removeSelectedIds(tempData);
                                    // console.log(response.data);
                                }
                            )
                        break;
                    case "assignCompanyToCandidate":
                        // https://adminapi.cxninja.com/ats-service-qa/jobDiva/searchCompany/3
                        //jobDiva/getCompanies/{clientId}
                        //ApiService.postWithData('ats', `jobDiva/searchCompany/${userLocalData.getvalue('clientId')}`, { company: inputValue, maxReturned:100, offset:0 })
                        ApiService.getCall('ats', `jobDiva/getCompanies/${userLocalData.getvalue('clientId')}`)
                            .then(
                                (response: any) => {
                                    let tempData = response.data.data.map((i: { name: string, id: string }) => ({ id: i.id, label: i.name }))
                                    removeSelectedIds(tempData);
                                    // console.log(response.data);
                                }
                            )
                        break;
                    case "AllEmailTemplates":
                    case "EmailBuilderTemplate":
                    case "EmailTemplate":
                        // http://35.155.202.214:8080/DemoCurately/searchSequence
                        ApiService.postWithData('admin', 'searchTemplates', {
                            //       ApiService.postWithData(216, 'QADemoCurately/searchTemplates', {
                            "clientId": userLocalData.getvalue('clientId'),
                            "templateName": inputValue,
                            recrId: userLocalData.getvalue('recrId'),
                            type: type,
                            onlyRecruiter: onlyRecruiter,
                        })
                            .then((response: any) => {
                                let templatesList = response.data.TemplatesAutoComplete.map((i: { templateName: string, templateId: string, Type: string }) => ({ id: i.templateId, label: i.templateName, objType: i.Type }))
                                removeSelectedIds([...templatesList]);
                            })
                        break;
                    case "DataCollection":
                        //  https://api.curately.ai//QADemoCurately/searchFormBuilder
                        ApiService.postWithData(214, 'searchFormBuilder', {
                            "clientId": userLocalData.getvalue('clientId'),
                            "name": inputValue
                        })
                            .then((response: any) => {
                                removeSelectedIds([...response.data.list]);
                            })
                        break;
                    case "customFields":
                        let placeHolder: any = [];
                        const localPlaceholders = localStorage.getItem('PlaceHolders_FormBuilder_' + userLocalData.getvalue('clientId'));
                        if (localPlaceholders) {
                            placeHolder = JSON.parse(localPlaceholders);
                        } else {
                            ApiService.postWithData('admin', 'placeHolders', {
                                clientId: userLocalData.getvalue('clientId'),
                                userIds: "",
                                jobId: "",
                                recrId: userLocalData.getvalue('recrId'),
                                contId: '',
                            }).then((response: any) => {
                                if ((response.data.Success === "true" || response.data.Success) && response.data.PlaceHolders) {
                                    localStorage.setItem('PlaceHolders_FormBuilder_' + userLocalData.getvalue('clientId'), JSON.stringify(response.data.PlaceHolders))
                                    placeHolder = response.data.PlaceHolders;
                                } else {
                                    console.log(response)
                                }
                            })
                        }
                        let groupedPlaceholders: any = [];
                        Object.keys(placeHolder).map((group: any) => {
                            placeHolder[group].map((item: any) => {
                                if (Object.keys(item).includes('tablename')) {
                                    groupedPlaceholders.push({ ...item, groupName: group })
                                } else {
                                    Object.keys(item).map((list: any) => {
                                        item[list].map((sublist: any) => {
                                            groupedPlaceholders.push({ ...sublist, groupName: list })
                                        })
                                    })
                                }
                            })
                        })
                        const filteredOptions = groupedPlaceholders
                            .map((item: any) => ({
                                label: '{{' + item.viewfieldname.trim() + '}}',
                                id: item.viewfieldname.replace(/ /g, ''),
                                group: item.groupName
                            }))
                            .filter((option: any) => option.label !== '');
                        removeSelectedIds(filteredOptions);
                        break;
                    default:
                        break;
                }
            } else {
                removeSelectedIds([]);
            }
            setLoading(false)
        }, 500);

        return () => clearTimeout(searchFromApi);
    }, [inputValue, type]);

    const removeSelectedIds = (options: ValueObj[]) => {
        if (inputValue === "") {
            setDefaultOptions(options)
        }
        if (options && options.length) {
            if (isMultiple && valuePassed?.id) {
                let tempArray = valuePassed.id.split(',')
                let tempOptions = options.filter(
                    (val: ValueObj) => !tempArray.includes(val.id?.toString())
                ).map((each) => ({
                    ...each,
                    id: each?.id?.toString()
                }));
                setFilteredFromOptions(tempOptions);
            } else {
                setFilteredFromOptions(() =>
                    options.map((each) => ({
                        ...each,
                        id: each?.id?.toString()
                    }))
                );
                // setFilteredFromOptions(options)
            }
        } else {
            setFilteredFromOptions([]);
        }
    }

    const removeExistingIds = (options: any) => {
        if (inputValue === "") {
            setDefaultOptions(options)
        }
        if (!options || options.length === 0) {
            setFilteredFromOptions([]);
            return;
        }
        const existingIds = (existingSequenceIds || []).map((id: any) => id.toString());
        // console.log("Existing IDs:", existingIds);
        const filteredOptions = options.filter((option: any) => !existingIds.includes(option.id.toString()));
        setFilteredFromOptions(filteredOptions);
        // console.log("Filtered Options:", filteredOptions);
    }


    const removeExistingIdsByIdSelected = (selectedIds: string[]) => {
        // let options = [...filteredOptions];
        // if (options?.length && selectedIds?.length) {
        //     let tempOptions = options.filter(
        //         (val: ValueObj) => !selectedIds.includes(val.id)
        //     );
        //     setFilteredFromOptions(tempOptions);
        // }
        if (defaultOptions?.length && selectedIds?.length) {
            let updatedFilteredOptions = defaultOptions.filter(option => !selectedIds.includes(option.id.toString()));
            setFilteredFromOptions(updatedFilteredOptions);

        }
    };



    const getStateById = (id: string) => {
        let tempObj = masterStatesList.find((obj) => {
            return obj.id === id
        });
        return (tempObj && tempObj.label) ? tempObj.label : ""
    }

    const getPreferencesEmpStatusById = (id: string) => {
        let tempObj = CurrentEmpStatus_10010.find((obj) => {
            return obj.id === id
        });
        return (tempObj && tempObj.label) ? tempObj.label : ""
    }

    const getPreferencesAvailabilityStatusById = (id: string) => {
        let tempObj = EmpAvailabilityStatus_10011.find((obj) => {
            return obj.id === id
        });
        return (tempObj && tempObj.label) ? tempObj.label : ""
    }

    const getPreferencesEmpJobById = (id: string) => {
        let tempObj = EmpJobPref_10012.find((obj) => {
            return obj.id === id
        });
        return (tempObj && tempObj.label) ? tempObj.label : ""
    }

    const getPreferencesEmpLocById = (id: string) => {
        let tempObj = EmpLocPref_10013.find((obj) => {
            return obj.id === id
        });
        return (tempObj && tempObj.label) ? tempObj.label : ""
    }

    const getPreferencesworkinghoursById = (id: string) => {
        let tempObj = Preferredworkinghours_10019.find((obj) => {
            return obj.id === id
        });
        return (tempObj && tempObj.label) ? tempObj.label : ""
    }

    const getLanguageById = (id: string) => {
        let tempObj = LANGUAGES.find((obj) => {
            return obj.id === id
        });
        return (tempObj && tempObj.label) ? tempObj.label : ""
    }
    const getLabels = () => {
        switch (type) {

            case "PreferencesEmpStatus":
                return valuePassed.id.split(',').map(
                    function (a: string) {
                        return {
                            id: a, label: getPreferencesEmpStatusById(a)
                        }
                    }
                )
            case "PreferencesAvailabilityStatus":
                return valuePassed.id.split(',').map(
                    function (a: string) {
                        // console.log(a);
                        return {
                            id: a, label: getPreferencesAvailabilityStatusById(a)
                        }
                    }
                )
            case "PreferencesEmpJob":
                return valuePassed.id.split(',').map(
                    function (a: string) {
                        // console.log(a);
                        return {
                            id: a, label: getPreferencesEmpJobById(a)
                        }
                    }
                )
            case "PreferencesEmpLoc":
                return valuePassed.id.split(',').map(
                    function (a: string) {
                        // console.log(a);
                        return {
                            id: a, label: getPreferencesEmpLocById(a)
                        }
                    }
                )
            case "Preferencesworkinghours":
                return valuePassed.id.split(',').map(
                    function (a: string) {
                        // console.log(a);
                        return {
                            id: a, label: getPreferencesworkinghoursById(a)
                        }
                    }
                )
            case "states":
                return valuePassed.id.split(',').map(
                    function (a: string) {
                        // console.log(a);
                        return {
                            id: a, label: getStateById(a)
                        }
                    }
                )
            case "language":
                return valuePassed.id.split(',').map(
                    function (a: string) {
                        // console.log(a);
                        return {
                            id: a, label: getLanguageById(a)
                        }
                    }
                )


            default:
                return String(valuePassed.id).split(',').map(
                    function (a, i) {
                        const labels = String(valuePassed.label).split(',');
                        return {
                            id: a,
                            label: labels[i] || '' // Fallback to empty string if no matching label exists
                        };
                    }
                );

                break;
        }
    }

    // useEffect(() => {
    //     if (!open) {
    //         setFilteredFromOptions([]);
    //     }
    // }, [open]);

    return (
        (<Grid
            sx={{ width: width, height: height }}
        >
            <Autocomplete
                freeSolo={freeSolo}
                // key={(isMultiple) ? null : (valuePassed && valuePassed.id) ? valuePassed.id : null}
                disabled={isDisabled}
                multiple={isMultiple}
                id={`${id}AutoComplete`}
                options={filteredOptions}
                groupBy={(option) => option?.group}
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                clearIcon={<ClearIcon fontSize="small" onClick={() => setInputValue('')} />}
                getOptionLabel={(option) => option?.label}
                fullWidth
                filterSelectedOptions={true}
                clearOnBlur={true}
                onInputChange={(e: any) => {
                    // if(e.key === "Enter")
                    // console.log(e);
                    if (e && e?.target?.value && (inputValue !== e.target.value)) {
                        // searchFromApi(e);
                        setInputValue((e.target.value) ? e.target.value : '');
                        // console.log(filteredOptions)
                    }
                }}
                onFocus={(e: any) => {
                    // if (e && e?.target?.value && (inputValue !== e.target.value)) {
                    setInputValue((e?.target?.value) ? e?.target?.value : '');
                    // searchFromApi(e);
                    // }
                }}
                onKeyDown={(e: any) => {
                    // (type === "talentPool") || 
                    if (((type === "tag") || (type === "contactList") || addOnEnter) && (e.key === "Enter")) {
                        // console.log(e);
                        // console.log(e.target?.value);
                        if (e.target?.value) {
                            handleChange("0", e.target?.value);
                        }
                    }
                }}
                key={
                    (isMultiple) ?
                        (valuePassed && valuePassed.id) ?
                            getLabels()
                            :
                            []
                        :
                        (valuePassed && valuePassed.id)
                            ?
                            valuePassed :
                            null
                }
                defaultValue={
                    (isMultiple) ?
                        (valuePassed && valuePassed.id) ?
                            getLabels()
                            :
                            []
                        :
                        (valuePassed && valuePassed.id)
                            ?
                            valuePassed :
                            null
                }
                // (isMultiple) ? valuePassed ? [valuePassed] : [] : (valuePassed.id) ? valuePassed : null
                onChange={(e, val) => {
                    // console.log('Change');
                    // console.log(val);
                    if (isMultiple) {
                        if (val.length) {
                            let tempVals = val;
                            for (let tv = 0; tv < tempVals.length; tv++) {
                                if (typeof tempVals[tv] === "string") {
                                    tempVals[tv] = {
                                        id: tempVals[tv],
                                        label: tempVals[tv]
                                    }
                                }
                            }
                            let idToPass = val.map((a: ValueObj) => a.id?.toString());
                            let labelToPass = val.map((a: ValueObj) => a.label);
                            handleChange(idToPass.join(','), labelToPass.join(','));
                            removeExistingIdsByIdSelected(idToPass);

                        } else {
                            handleChange('', '');
                            setFilteredFromOptions(defaultOptions);
                        }
                    } else {
                        if (val?.id && val?.label) {
                            // setSelectedValue(val.id);
                            // valuePassed = val.id;
                            handleChange(val.id, val.label, val.objType);

                        } else {
                            handleChange('', '');
                        }
                    }
                }}
                // onSelect={(e) => {
                //     console.log('Select');
                //     console.log(e);
                // let value = (e.target as HTMLInputElement).value;
                // valuePassed = value;
                // if (filteredOptions.length) {
                //     let tempObj = filteredOptions.find(obj => {
                //         return obj.id === value
                //     });
                //     if (tempObj?.id && tempObj?.label) {
                //         handleChange(tempObj?.id, tempObj?.label);
                //     }
                // }
                // }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={placeholder}
                        placeholder={textToShow}
                        size='small'
                        inputRef={refToPass}
                        // ref={inputRef}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <Fragment>
                                    {loading ? <CircularProgress color="inherit" size={20} sx={{ right: '30px', position: 'absolute' }} /> : null}
                                    {params.InputProps.endAdornment}
                                </Fragment>
                            ),
                            // startAdornment: <InputAdornment position="start">{textToShow}</InputAdornment>,
                        }}
                        error={error}
                    />
                )}
                renderOption={(props, option) => (
                    (<li {...props}
                        className={`${{ ...props }.className} commonMUIAutoCompleteOption`}
                        key={option?.label + option?.id}
                        style={{
                            color: '#1A1A1A',
                            fontSize: '14px',
                            fontWeight: 600
                        }}
                    // onMouseEnter={(e: any) => {
                    //     e.target.style.backgroundColor = 'var(--c-primary-color)';
                    //     e.target.style.color = '#ffffff';
                    // }}
                    // onMouseLeave={(e: any) => {
                    //     e.target.style.backgroundColor = 'unset';
                    //     e.target.style.color = 'unset';
                    // }}
                    >{(option?.label) ? option?.label?.toLowerCase() : ""}</li>) // Customize the font color here
                )}
                // renderTags={(value: readonly string[], getTagProps) =>
                //     value.map((option: string, index: number) => (
                //         <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                //     ))
                // }
                className={`customMUIAutoComplete ${className}`}
            // disableCloseOnSelect={isMultiple}
            // openOnFocus={true}
            // selectOnFocus={isMultiple}
            />
        </Grid>)
    );
}

