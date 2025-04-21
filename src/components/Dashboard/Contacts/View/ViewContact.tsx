import { useEffect, useState } from '../../../../shared/modules/React';
import { Box } from '../../../../shared/modules/MaterialImports/Box';
import { Stack } from '../../../../shared/modules/MaterialImports/Stack';
import { Button, Grid, TextField } from '../../../../shared/modules/commonImports';
import { Menu, MenuItem } from '../../../../shared/modules/MaterialImports/Menu';
import { Divider } from '../../../../shared/modules/MaterialImports/Divider';
import { Tabs, Tab } from '../../../../shared/modules/MaterialImports/Tabs';
import { Typography } from '../../../../shared/modules/MaterialImports/Typography';
import { Cloud, BorderColor, MailOutlineOutlined, CallOutlined, ClearOutlined } from '@mui/icons-material';
//import Activities from '../../../shared/Activities/Activities';
// import { TabContext, TabList } from '@mui/lab';
// import { Link, LinkedIn, Facebook, Twitter, HelpOutlineOutlined } from '@mui/icons-material';
import Tasks from '../../../shared/Tasks/Tasks';
import ApiService from "../../../../shared/api/api";
import Jobs from './Jobs/Jobs';
import Placements from './Placements/Placements';
import Activities from '../../../shared/Activities/Activities';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { useParams } from 'react-router-dom';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailDialogBox from '../../../shared/EmailDialogBox/EmailDialogBox';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import { userLocalData } from '../../../../shared/services/userData';
import { showToaster } from '../../../shared/SnackBar/SnackBar';
import AddContacts from '../Add/AddContacts';
import { trackPromise } from '../../../../shared/modules/PromiseTrackter';
import PhoneDialog from '../../../shared/PhoneDialog/PhoneDialog';
import getStateById from '../../../../shared/utils/StateName';
import ModuleFormAnswer from '../../Settings/CustomForms/ModuleFormAnswer/ModuleFormAnswer';
import { MUIAutoComplete } from '../../../shared/MUIAutoComplete/MUIAutoComplete';
import { confirmDialog } from '../../../shared/ConfirmDialog/ConfirmDialog';
import USPhoneFormat from '../../../../shared/utils/USPhoneFormat';

import './ViewContact.scss';
import updateDocumentTitle from '../../../../shared/services/title';
import BasicBreadcrumbs from '../../../../shared/components/BreadCrumbs/BreadCrumbs';
import { RestrictMaskInterface } from '../../Candidate/ViewCandidate/ViewCandidate';
import Mask from '../../../../shared/utils/Mask';
import { Tooltip } from '../../../../shared/modules/MaterialImports/ToolTip';
import UpgradeButton from '../../../shared/UpgradeButton/UpgradeButton';
import CandidateCommonAPIs from '../../../../shared/utils/SaveCandidate/SaveCandidate';
import IsValidUrl from '../../../../shared/utils/IsValidUrl';
import { ID_SETTINGS_HIRING_WORKFLOW } from '../../../../shared/services/Permissions/IDs';
import Convert from '../../../../shared/utils/Convert';
import masterStatesList from '../../../../shared/data/States';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}


function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`contactTabsPanel-${index}`}
            aria-labelledby={`contactTabsPanel-${index}`}
            {...other}
            className='contactTabsPanel customTabsPanel'
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const ViewContactComponent = ({ contactId, isInModal }: { contactId: any, isInModal: boolean }) => {


    const [NameEditanchorEl, setNameEditAnchorEl] = useState<null | HTMLElement>(null);
    const [addSequenceanchorEl, setAddSequenceAnchorEl] = useState<null | HTMLElement>(null);
    const [, setCRMAnchorEl] = useState<null | HTMLElement>(null);
    const [MoreanchorEl, setMoreAnchorEl] = useState<null | HTMLElement>(null);
    const [addtolistanchorEl, setAddToListAnchorEl] = useState<null | HTMLElement>(null);
    const [listData, setLists] = useState<any>([]);
    // const [distributionData, setDistributionData] = useState<any>([]);
    const [dialogStatus, setDialogStatus] = useState(false);
    const [emailOnClicked, setEmailOnClicked] = useState('');
    const openNameEdit = Boolean(NameEditanchorEl);
    const [sequenceListData, setSequenceListData] = useState<any>([]);
    const openAddSequenceBtn = Boolean(addSequenceanchorEl);
    const openMoreBtn = Boolean(MoreanchorEl);
    const openAddToListenBtn = Boolean(addtolistanchorEl);
    const { companyId } = useParams();
    const [dialogPhoneStatus, setDialogPhoneStatus] = useState(false);
    const [phoneOnClicked, setPhoneOnClicked] = useState('');

    const [addtoSeqlistanchorEl, setAddToSeqListAnchorEl] = useState<null | HTMLElement>(null);

    const openAddToSequenceListenBtn = Boolean(addtoSeqlistanchorEl);
    const isHighVolumeHiringSettingEnabled = !userLocalData.adminSettings(30002);
    const isCampaignsEnabled = userLocalData.adminSettings(20024);
    const isCareerPortalEnabled = userLocalData.adminSettings(20005);
    const isHiringWorkFlowEnabled = userLocalData.adminSettings(20027);

    const [selectedList, setSelectedList] = useState({
        id: "",
        name: ""
    });

    const [selectedSequence, setSelectedSequence] = useState({
        id: "",
        name: ""
    });

    const [restrictMaskValidationState, setRestrictMaskValidationState] = useState<RestrictMaskInterface>({
        isShowEmail: true,
        isShowPhone: true,
        isPackageEmailValidity: "EMPTY",
        isPackagePhoneValidity: "EMPTY",
        emailType: 0,
        phoneType: 0
    });

    const openWebSite = (w: string) => {
        window.open(w);
    }

    const handleClickAddToSequenceListen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAddToSeqListAnchorEl(event.currentTarget);
    };

    const [editContactData, setEditContactData] = useState({
        "contId": 0,
        "firstName": "",
        "lastName": "",
        "contEmail": "",
        "contEmail2": "",
        "mobile": "",
        "directPhone": "",
        "compid": 0,
        "linkedIn": "",
        "jobTitle": "",
        "department": "",
        "pipelineStatus": 0,
        "NLE": false,
        "street": "",
        "city": "",
        "state": "",
        "stateName": "",
        "country": "",
        "zipcode": "",
        "createdBy": userLocalData.getvalue('recrId'),
        "createdDate": "",
        "modifyBy": userLocalData.getvalue('recrId'),
        "modifyDate": "",
        "isdelete": false,
        isPackageEmailValidity: "EMPTY",
        isPackagePhoneValidity: "EMPTY",
        isPhoneNumberVisible: false,
        isShowEmail: false,
        isShowPhone: false,
    });



    const deleteList = (id: string) => {
        // http://52.88.252.214:90/QADemoCurately/deleteListContacts/10/2/3
        trackPromise(
            ApiService.deleteById('admin', 'deleteListContacts', contactId + "/" + id + "/" + userLocalData.getvalue('clientId'))
                .then(
                    (response: any) => {
                        // console.log(response)
                        if (response.data.Success) {
                            showToaster("List has been deleted Successfully", 'success');
                            loadLists();
                        } else {
                            showToaster("An error occured while deleting", 'error');
                        }
                    }
                ))
    }

    const addToList = (id: string, name: string) => {
        if (name && name.trim() && id) {
            handleProfileMenuClose();
            const saveData = {
                listId: Number(id),
                listName: name,
                contIds: Number(contactId),
                recrId: userLocalData.getvalue('recrId'),
                clientId: userLocalData.getvalue('clientId')
            }

            trackPromise(
                // http://35.155.202.216:8080/QADemoCurately/saveListContacts
                ApiService.postWithData('admin', 'saveListContacts', saveData)
                    .then(
                        (response: any) => {
                            // console.log(response)
                            setSelectedList({ id: "", name: "" });
                            if (response.data.Success) {
                                showToaster('List Added Successfully', 'success');
                                handleProfileMenuClose();
                                loadLists();
                            } else if (response.data.Message.includes("already assigned")) {
                                showToaster("This List is already assigned to this Contact.", 'error')
                            } else {
                                showToaster(response.data.Message ? response.data.Message : "An error occured while adding Tag", 'error')
                            }

                        }
                    )
            )
        }
    }

    const loadLists = () => {
        // http://35.155.202.216:8080/QADemoCurately/getListContacts/{contId}/{clientId}
        trackPromise(
            ApiService.getById('admin', 'getListContactsById', contactId + '/' + userLocalData.getvalue("clientId"))
                .then((response: any) => {
                    setLists((response.data.Success && response.data.list?.length) ? response.data.list : []);
                })
        )
    }
    const loadCompaignLists = () => {
        // http://35.155.202.216:8080/QADemoCurately/getListContacts/{contId}/{clientId}
        trackPromise(
            ApiService.postWithData('admin', 'getContactSequenceList', { "contId": contactId, "clientId": userLocalData.getvalue("clientId") })
                .then((response: any) => {
                    /// console.log(response.data.data);
                    let sequenceList = [];
                    if (response.data.Success && response.data.list?.length) {
                        sequenceList = response.data.list.filter((ele: { sequenceId: number }, i: number) => response.data.list.findIndex((obj: { sequenceId: number }) => obj.sequenceId === ele.sequenceId) === i);
                        sequenceList = sequenceList.filter((ele: { isdelete: boolean }) => !ele.isdelete);
                        setSequenceListData([...sequenceList]);
                    } else setSequenceListData([]);

                    // setSequenceListData((response.data.Success && response.data.data?.length) ? response.data.data : []);
                })
        )
    }
    const addToSequenceList = (id: string, name: string) => {
        if (name && name.trim()) {
            handleProfileMenuClose();
            const saveData = {
                clientId: userLocalData.getvalue('clientId'),
                sequenceId: id,
                recrId: userLocalData.getvalue('recrId'),
                contIds: contactId,
            }
            ApiService.postWithData('admin', 'sequenceAssignContacts', saveData)
                .then(
                    (response: any) => {
                        // console.log(response);
                        //    showToaster((response.data.message) ? response.data.message : "Campaign saved successfully", 'success');
                        if ((response.data.message === "Success") || (response.data.Message === "Success")) {
                            showToaster("Campaign has been assigned successfully", 'success');

                            loadCompaignLists();
                            setSelectedSequence({ id: "", name: "" });
                            setAddToSeqListAnchorEl(null);
                        } else {
                            showToaster(response.data.Message ? response.data.Message : "An error occured while assigning ", 'error');
                        }
                        // if (response.data.Message === "Success") {
                        //     showToaster("Sequence has been assigned", 'success');
                        //     loadCanidateData();
                        //     setSelectedSequence({ id: "", name: "" });
                        // } else {
                        //     showToaster(response.data.Message ? response.data.Message : "An error occured while assigning ", 'error');
                        // }
                    }
                )
                .catch((error) => {
                    console.error("API Error:", error);
                });

        }
    }

    const deleteSequenceId = (id: string) => {
        const delData = {
            clientId: userLocalData.getvalue('clientId'),
            sequenceId: parseInt(id),
            recrId: userLocalData.getvalue('recrId'),
            contId: contactId,
        }
        //  console.log(delData);
        trackPromise(

            ApiService.postWithData('admin', 'deleteSequenceAssignContact', delData)
                .then(
                    (response: any) => {
                        // console.log(response)
                        if (response.data.Success) {
                            showToaster("Campaign has been deleted Successfully", 'success');
                            loadCompaignLists();
                        } else {
                            showToaster("An error occured while deleting", 'error');
                        }
                    }
                ))
    }
    // const loadDistributionData = () => {
    //     trackPromise(
    //         ApiService.getByParams(193, 'distribution_data.jsp', { contId: contactId, type: "Contact" })
    //             .then(
    //                 (response: any) => {
    //                     // console.log(response);
    //                     setDistributionData(response.data);
    //                 }
    //             )
    //     )
    // }

    const getContactData = () => {
        trackPromise(
            // http://52.88.252.214:90/QADemoCurately/getContactsById/{contId}/{clientId}

            ApiService.postWithData('admin', 'getContactsById', {
                "recrId": userLocalData.getvalue("recrId"),
                "clientId": userLocalData.getvalue("clientId"),
                "contId": contactId,
                "isExtension": true // userLocalData.isChromeExtensionEnabled()
            }).then((response: any) => {
                if (Number(response.data?.contId)) {

                    if (!response.data.linkedIn) {
                        response.data.linkedIn = "";
                    } else {

                        response.data.linkedIn = response.data.linkedIn ? response.data.linkedIn.replaceAll('\\/', '/') : ""
                        response.data.linkedIn = (response.data.linkedIn && (response.data.linkedIn.indexOf('://') === -1)) ? 'https://' + response.data.linkedIn : response.data.linkedIn;
                        response.data.linkedIn = IsValidUrl.check(response.data.linkedIn) ? response.data.linkedIn : "";
                    }
                    let stateName = response.data.state ? response.data.state : "";
                    if (stateName) {
                        stateName = masterStatesList.find(
                            (state) => state.label.toLowerCase() === response.data.state.toLowerCase()
                        )?.id
                    }
                    setEditContactData({
                        ...response.data,
                        nle: response.data.NLE,
                        // stateName: (response.data.state)
                        // ? Convert.capitalizeAllLetters(getStateById(response.data.state) || response.data.state):  "",                  
                        stateName: stateName ? Convert.capitalizeAllLetters(stateName) : "",
                        firstName: response.data.firstName ? Convert.capitalizeWords(response.data.firstName) : "",
                        lastName: response.data.lastName ? Convert.capitalizeWords(response.data.lastName) : "",
                        city: (response.data.city) ? Convert.capitalizeWords(response.data.city) : "",
                        compid: (response.data.compid) ? (response.data.compid) : "",
                        contEmail: (response.data.contEmail) ? (response.data.contEmail) : "",
                        contEmail2: (response.data.contEmail2) ? (response.data.contEmail2) : "",
                        country: (response.data.country) ? Convert.capitalizeWords(response.data.country) : "",
                        department: (response.data.department) ? (response.data.department) : "",
                        directPhone: (response.data.directPhone) ? (response.data.directPhone) : "",
                        jobTitle: (response.data.jobTitle) ? (response.data.jobTitle) : "",
                        linkedIn: (response.data.linkedIn) ? (response.data.linkedIn) : "",
                        mobile: (response.data.mobile) ? (response.data.mobile) : "",
                        pipelineStatus: (response.data.pipelineStatus) ? (response.data.pipelineStatus) : "",
                        state: (response.data.state) ? (response.data.state) : "",
                        street: (response.data.street) ? Convert.capitalizeWords(response.data.street) : "",
                        zipcode: (response.data.zipcode) ? (response.data.zipcode) : "",
                    });
                    updateDocumentTitle.set(response.data.firstName + " " + response.data.lastName + " | Contact");
                    if (userLocalData.isChromeExtensionEnabled() || userLocalData.adminSettings(ID_SETTINGS_HIRING_WORKFLOW)) {
                        setRestrictMaskValidationState({
                            isShowEmail: Boolean(response.data.isShowEmail),
                            isShowPhone: Boolean(response.data.isShowPhone),
                            isPackageEmailValidity: response.data.isPackageEmailValidity ? response.data.isPackageEmailValidity : "EMPTY",
                            isPackagePhoneValidity: response.data.isPackagePhoneValidity ? response.data.isPackagePhoneValidity : "EMPTY",
                            emailType: 0,
                            phoneType: 0,
                        });
                    }
                }

            }
            )
        )
    }

    useEffect(() => {
        getContactData();
        return () => {
            updateDocumentTitle.set('');
        }
    }, [contactId]);

    // const [companyData, setCompanyData] = useState({
    //     "companyName": "",
    //     "ownerName": "",
    //     "mainPhone": "",
    //     "alternativePhone1": "",
    //     "alternativePhone2": "",
    //     "fax": "",
    //     "mainCompnay": "",
    //     "jobsWebsite": "",
    //     "streetAddress": "",
    //     "streetAddress1": "",
    //     "city": "",
    //     "state": "",
    //     "postalCode": "",
    //     "country": "",
    //     "region": "",
    //     "active": "",
    //     "bulk": "",
    //     "userAgency": "",
    //     "pipelineStatus": "",
    //     "industry": "",
    //     "sic": "",
    //     "started": "",
    //     "employees": "",
    //     "revenue": "",
    //     "exchange": "",
    //     "symbol": "",
    //     "Sent": "",
    //     "received": "",
    //     "fee": "",
    //     "flatFree": "",
    //     "guaranteeInformation": "",
    //     "terms": "",
    //     "dateEstablishement": "",
    //     "expireDate": "",
    //     "primarycontact": "",
    //     "mspProgram": "",
    //     "create1": "",
    //     "create2": "",
    //     "allUsers": "",
    //     "customUsers": "",
    //     "companyId": "",
    //     "notes": "",
    // })

    useEffect(() => {
        loadLists();
        loadCompaignLists();
        // loadDistributionData();
        // if (companyId) {
        //     let clientId = userLocalData.getvalue('clientId');
        //     trackPromise(
        //         // ApiService.getByParams(193, 'Company/company_details.jsp', { compId: companyId }).then(
        //         ApiService.getCall(216, `/QADemoCurately/getContactsById/${companyId}/${clientId}`).then(
        //             (response: any) => {
        //                 // console.log(response.data);
        //                 response.data.web = getValidUrl(response.data.web);
        //                 setCompanyData({
        //                     "companyName": (response.data.compName) ? response.data.compName : "",
        //                     "ownerName": (response.data.enterby) ? response.data.enterby : "",
        //                     "mainPhone": (response.data.phone) ? response.data.phone : "",
        //                     "alternativePhone1": (response.data.phone2) ? response.data.phone2 : "",
        //                     "alternativePhone2": (response.data.phone3) ? response.data.phone3 : "",
        //                     "fax": (response.data.fax) ? response.data.fax : "",
        //                     "mainCompnay": (response.data.web) ? response.data.web : "",
        //                     "jobsWebsite": (response.data.WebJobs) ? response.data.WebJobs : "",
        //                     "streetAddress": (response.data.address1) ? response.data.address1 : "",
        //                     "streetAddress1": (response.data.address2) ? response.data.address2 : "",
        //                     "city": (response.data.city) ? response.data.city : "",
        //                     "state": (response.data.state) ? response.data.state : "",
        //                     "postalCode": (response.data.zip) ? response.data.zip : "",
        //                     "country": (response.data.Locale) ? response.data.Locale : "",
        //                     "region": (response.data.geo) ? response.data.geo : "",
        //                     "active": (response.data.active) ? response.data.active : "",
        //                     "bulk": (response.data.chkNoBulk) ? response.data.chkNoBulk : "",
        //                     "userAgency": (response.data.chkAgency) ? response.data.chkAgency : "",
        //                     "pipelineStatus": (response.data.CompanyStatus_ID) ? response.data.CompanyStatus_ID : "",
        //                     "industry": (response.data.Category_ID) ? response.data.Category_ID : "",
        //                     "sic": (response.data.SIC) ? response.data.SIC : "",
        //                     "started": (response.data.Established) ? response.data.Established : "",
        //                     "employees": (response.data.num_employ) ? response.data.num_employ : "",
        //                     "revenue": (response.data.revenue) ? response.data.revenue : "",
        //                     "exchange": (response.data.echange) ? response.data.echange : "",
        //                     "symbol": (response.data.tradeSymbol) ? response.data.tradeSymbol : "",
        //                     "Sent": (response.data.sadasd) ? response.data.sadasd : "",
        //                     "received": (response.data.sadasd) ? response.data.sadasd : "",
        //                     "fee": (response.data.sadasd) ? response.data.sadasd : "",
        //                     "flatFree": (response.data.feeflat) ? response.data.feeflat : "",
        //                     "guaranteeInformation": (response.data.sadasd) ? response.data.sadasd : "",
        //                     "terms": (response.data.sadasd) ? response.data.sadasd : "",
        //                     "dateEstablishement": (response.data.Established) ? response.data.Established : "",
        //                     "expireDate": (response.data.ExpireDate) ? response.data.ExpireDate : "",
        //                     "primarycontact": (response.data.fee_contct) ? response.data.fee_contct : "",
        //                     "mspProgram": (response.data.sadasd) ? response.data.sadasd : "",
        //                     "create1": (response.data.sadasd) ? response.data.sadasd : "",
        //                     "create2": (response.data.sadasd) ? response.data.sadasd : "",
        //                     "allUsers": (response.data.sadasd) ? response.data.sadasd : "",
        //                     "customUsers": (response.data.sadasd) ? response.data.sadasd : "",
        //                     "companyId": (companyId) ? companyId : "",
        //                     "notes": (response.data.description) ? response.data.description : "",
        //                 });
        //             }
        //         ))
        // }
    }, []);

    // const getIndustryValue = (id: string) => {
    //     switch (id) {
    //         case "70":
    //             return "Aerospace &amp; Defense";
    //         case "71":
    //             return "Agriculture";
    //         case "72":
    //             return "Auto &amp; Transportation";
    //         case "73":
    //             return "Banking";
    //         case "74":
    //             return "Business Services";
    //         case "75":
    //             return "Chemicals";
    //         case "76":
    //             return "Computer Hardware";
    //         case "77":
    //             return "Computer Services";
    //         case "78":
    //             return "Computer Software";
    //         case "79":
    //             return "Construction";
    //         case "81":
    //             return "Consumer Products Mfg";
    //         case "82":
    //             return "Consumer Services";
    //         case "83":
    //             return "Education";
    //         case "84":
    //             return "Electronics";
    //         case "85":
    //             return "Energy &amp; Utilities";
    //         case "86":
    //             return "Environmental Services";
    //         case "87":
    //             return "Financial Services";
    //         case "88":
    //             return "Food &amp; Beverage";
    //         case "89":
    //             return "Healthcare";
    //         case "102":
    //             return "Information Technology";
    //         case "90":
    //             return "Industrial Manufacturing";
    //         case "91":
    //             return "Insurance";
    //         case "92":
    //             return "Media";
    //         case "93":
    //             return "Metals &amp; Mining";
    //         case "94":
    //             return "Pharmaceuticals";
    //         case "95":
    //             return "Real Estate";
    //         case "96":
    //             return "Security Products/Service";
    //         case "100":
    //             return "Telecommun. Equipment";
    //         case "99":
    //             return "Telecommun. Services ";
    //         case "101":
    //             return "Transportation Services";

    //         default:
    //             return "";
    //     }
    // }
    // const getValidUrl = (url = "") => {
    //     let newUrl = window.decodeURIComponent(url);
    //     newUrl = newUrl.trim().replace(/\s/g, "");

    //     if (/^(:\/\/)/.test(newUrl)) {
    //         return `http${newUrl}`;
    //     }
    //     if (!/^(f|ht)tps?:\/\//i.test(newUrl)) {
    //         return `http://${newUrl}`;
    //     }

    //     return newUrl;
    // };


    const viewAPIContact = (emailOrPhone: 'email' | 'phone', type: number) => {
        let linkedinUrlToPass = editContactData.linkedIn;
        if (linkedinUrlToPass.endsWith('/')) {
            linkedinUrlToPass = linkedinUrlToPass.substring(0, linkedinUrlToPass.length - 1);
        }
        CandidateCommonAPIs.save(
            linkedinUrlToPass,
            type,
            emailOrPhone,
            editContactData.contId.toString(),
            () => {
                getContactData();
            },
            (message: string) => {
                showToaster(message, 'error')
            },
            editContactData.firstName,
            editContactData.lastName,
            false
        );
    }


    const handleClickNameEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
        setNameEditAnchorEl(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setAddSequenceAnchorEl(null);
        setCRMAnchorEl(null);
        setMoreAnchorEl(null);
        setAddToListAnchorEl(null);
        setNameEditAnchorEl(null);
        // setAddToSeqListAnchorEl(null);
    };


    // const handleClickMoreBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     setMoreAnchorEl(event.currentTarget);
    // };

    const handleClickAddToListen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAddToListAnchorEl(event.currentTarget);
    };

    const [value, setValue] = useState(0);


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const [openAddContactModal, setOpenAddContactModal] = useState(false);

    return (
        <div
            className='fullViewPage'>
            <Grid>
                {!isInModal ? <BasicBreadcrumbs /> : null}
            </Grid>
            <Grid
                container
                direction="row"
                justifyContent="start"
                alignItems="start"
            >
                <Grid sx={{ width: 'calc(100% - 385px)' }}>
                    <div className='candidate-wrapper'>
                        <div className='contact-container'>
                            <div className='column left pt-0'>

                                <div className='customCard'>
                                    <div className='card-body'>

                                        <Stack className='card-row'>
                                            <Stack className='card-column'>
                                                <Box className='p-4'>
                                                    <Box className='name-box showEditonHover'>
                                                        <Typography className='name-text' variant="h6">
                                                            {
                                                                editContactData.NLE ?
                                                                    <FiberManualRecordIcon className='c-red mr-1' />
                                                                    :
                                                                    null
                                                            }
                                                            {editContactData.firstName} {editContactData.lastName}</Typography>
                                                        {
                                                            editContactData.linkedIn ?
                                                                <Box className="linkedinIcon ml-3">
                                                                    <LinkedInIcon className='c-cursor' onClick={() => openWebSite(editContactData.linkedIn)} />
                                                                </Box>
                                                                : null
                                                        }
                                                        {
                                                            (editContactData.contId && userLocalData.checkIntegration(400012) && editContactData.isShowPhone && editContactData.isShowEmail) ?
                                                                <BorderColorIcon className='editModalIcon' onClick={() => setOpenAddContactModal(true)} />
                                                                :
                                                                null
                                                        }
                                                        <Box className='name-edit'>
                                                            <Button
                                                                id="name-edit-btn"
                                                                aria-controls={openNameEdit ? 'name-edit-btn-menu' : undefined}
                                                                aria-haspopup="true"
                                                                aria-expanded={openNameEdit ? 'true' : undefined}
                                                                onClick={handleClickNameEdit}
                                                                disableRipple
                                                                startIcon={<BorderColor sx={{ fontSize: '14px' }} />}
                                                                className='name-edit'
                                                                sx={{
                                                                    backgroundColor: openNameEdit === true ? "#F7F7F7" : '#FFFFFF',
                                                                    color: openNameEdit === true ? 'var(--c-primary-color)' : 'var(--c-secondary-color)',
                                                                }}
                                                            >
                                                                Edit
                                                            </Button>
                                                            <Menu
                                                                id="name-edit-btn-menu"
                                                                anchorEl={NameEditanchorEl}
                                                                open={openNameEdit}
                                                                onClose={handleProfileMenuClose}
                                                                MenuListProps={{
                                                                    'aria-labelledby': 'name-edit-btn',
                                                                }}
                                                                anchorOrigin={{
                                                                    vertical: "bottom",
                                                                    horizontal: "center"
                                                                }}
                                                                transformOrigin={{
                                                                    vertical: "top",
                                                                    horizontal: "center"
                                                                }}
                                                                PaperProps={{
                                                                    style: { overflow: "visible" }
                                                                }}
                                                                sx={{
                                                                    width: '300px',
                                                                    // height: '140px',
                                                                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                                                        padding: '4px 5px'
                                                                    },
                                                                    '& .MuiList-root.MuiMenu-list': {
                                                                        p: 0
                                                                    }
                                                                }}
                                                            >

                                                                <Box sx={{ border: '1px solid var(--c-secondary-color)', borderRadius: '3px' }}>
                                                                    <Box sx={{ display: 'flex', flexDirection: 'column', p: 1 }}>
                                                                        <TextField
                                                                            sx={{
                                                                                mb: '5px',
                                                                                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                                                                    borderColor: 'var(--c-primary-color)',
                                                                                },
                                                                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                                                    borderColor: 'var(--c-secondary-color)',
                                                                                    borderWidth: '1px',
                                                                                },
                                                                            }}
                                                                        />
                                                                        <TextField
                                                                            sx={{
                                                                                mb: '5px',
                                                                                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                                                                    borderColor: 'var(--c-primary-color)',
                                                                                },
                                                                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                                                    borderColor: 'var(--c-secondary-color)',
                                                                                    borderWidth: '1px',
                                                                                },
                                                                            }}
                                                                        />
                                                                    </Box>
                                                                    <Box sx={{ borderTop: '1px solid #E6E6E6' }}></Box>
                                                                    <Stack direction='row' sx={{ p: 1, backgroundColor: '#F7F7F7' }} >
                                                                        <Button variant="outlined"
                                                                            disableRipple
                                                                            onClick={handleProfileMenuClose}
                                                                            sx={{
                                                                                width: '138px',
                                                                                height: '31px',
                                                                                m: '1px',
                                                                                textTransform: 'capitalize',
                                                                                fontSize: '14px',
                                                                                fontWeight: 600,
                                                                                fontFamily: 'Segoe UI',
                                                                                color: '#1A1A1A',
                                                                                borderColor: 'var(--c-secondary-color)',
                                                                                backgroundColor: '#FBFBFD',
                                                                                boxShadow: '0px',
                                                                                '&:hover': {
                                                                                    borderColor: 'var(--c-primary-color)',
                                                                                    color: 'var(--c-primary-color)',
                                                                                    backgroundColor: '#ffffff',
                                                                                }
                                                                            }}
                                                                        >
                                                                            Cancel
                                                                        </Button>
                                                                        <Button variant="contained"
                                                                            disableRipple
                                                                            sx={{
                                                                                width: '134px',
                                                                                height: '31px',
                                                                                m: '1px',
                                                                                textTransform: 'capitalize',
                                                                                fontSize: '14px',
                                                                                fontWeight: 600,
                                                                                fontFamily: 'Segoe UI',
                                                                                color: '#ffffff',
                                                                                backgroundColor: 'var(--c-primary-color)',
                                                                                boxShadow: '0px',
                                                                                '&:hover': {
                                                                                    backgroundColor: '#0852C2',
                                                                                    color: '#ffffff'
                                                                                }
                                                                            }}
                                                                        >
                                                                            Save
                                                                        </Button>
                                                                    </Stack>
                                                                </Box>
                                                            </Menu>
                                                        </Box>
                                                    </Box>

                                                    <Typography component='p' className='name-sub-head'>
                                                        {editContactData.jobTitle}
                                                        {editContactData.street && (
                                                            <> at <Box component='span'>{editContactData.street}</Box>,</>
                                                        )}
                                                        {editContactData.city && (
                                                            <> <Box component='span'>{editContactData.city}</Box>,</>
                                                        )}
                                                        {editContactData.stateName && (
                                                            <> <Box component='span'>{editContactData.stateName}</Box>,</>
                                                        )}
                                                        {editContactData.country && (
                                                            <> <Box component='span'>{editContactData.country}</Box></>
                                                        )}
                                                    </Typography>


                                                    {/* <Button variant="contained"
                                                        id='addseqbtn'
                                                        aria-controls={openAddSequenceBtn ? 'addseqbtnmenu' : undefined}
                                                        aria-haspopup="true"
                                                        aria-expanded={openAddSequenceBtn ? 'true' : undefined}
                                                        onClick={handleClickAddSequenceBtn}
                                                        disableRipple
                                                        className='sequence-btn'
                                                        sx={{
                                                            textTransform: 'capitalize', backgroundColor: openAddSequenceBtn === true ? '#0852C2' : 'var(--c-primary-color)'
                                                        }}
                                                        startIcon={<SendOutlined />}
                                                        endIcon={<ArrowDropDown />}
                                                    >
                                                        Add to Sequence
                                                    </Button> */}
                                                </Box>
                                                <Divider className='custom-divider' />
                                                <Menu
                                                    id="addseqbtnmenu"
                                                    anchorEl={addSequenceanchorEl}
                                                    open={openAddSequenceBtn}
                                                    onClose={handleProfileMenuClose}
                                                    MenuListProps={{
                                                        'aria-labelledby': 'addseqbtn',
                                                    }}
                                                    anchorOrigin={{
                                                        vertical: "bottom",
                                                        horizontal: "center"
                                                    }}
                                                    transformOrigin={{
                                                        vertical: "top",
                                                        horizontal: "center"
                                                    }}
                                                    PaperProps={{
                                                        style: { overflow: "visible" }
                                                    }}
                                                    className='menu-block'
                                                >
                                                    <MenuItem disableRipple onClick={handleProfileMenuClose} sx={{
                                                        display: 'flex', alignItems: 'center', gap: '9px', '&:hover': {
                                                            borderRadius: '5px 5px 0px 0px'
                                                        }
                                                    }}>
                                                        <Box component='span' >
                                                            <Cloud sx={{ height: '11px', width: '16px' }} />
                                                        </Box>
                                                        Add contact to an apollo sequence
                                                    </MenuItem>
                                                    <MenuItem disableRipple onClick={handleProfileMenuClose} sx={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                                                        <Box component='span' >
                                                            <Cloud sx={{ height: '11px', width: '16px' }} />
                                                        </Box>
                                                        Mark all sequence as finished
                                                    </MenuItem>
                                                    <MenuItem disableRipple onClick={handleProfileMenuClose} sx={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                                                        <Box component='span' >
                                                            <Cloud sx={{ height: '11px', width: '16px' }} />
                                                        </Box>
                                                        Remove From Sequence
                                                    </MenuItem>
                                                    <MenuItem disableRipple onClick={handleProfileMenuClose} sx={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                                                        <Box component='span' >
                                                            <Cloud sx={{ height: '11px', width: '16px' }} />
                                                        </Box>
                                                        Connect Salesloft
                                                    </MenuItem>
                                                    <MenuItem disableRipple onClick={handleProfileMenuClose} sx={{
                                                        display: 'flex', alignItems: 'center', gap: '9px', '&:hover': {
                                                            borderRadius: '0px 0px 5px 5px'
                                                        }
                                                    }}>
                                                        <Box component='span' >
                                                            <Cloud sx={{ height: '11px', width: '16px' }} />
                                                        </Box>
                                                        Connect Outreach
                                                    </MenuItem>
                                                </Menu>
                                                <Stack direction='row' spacing={1} className='p-4 more-wrapper'>
                                                    {/* <IconButton aria-label="upload">
                                                    <FileUploadOutlined />
                                                </IconButton>
                                                <IconButton aria-label="download">
                                                    <FileDownloadOutlined />
                                                </IconButton>
                                                <IconButton aria-label="download">
                                                    <PostAddOutlined />
                                                </IconButton> */}
                                                    {/* <Menu
                                                    id="crmbtnmenu"
                                                    anchorEl={crmanchorEl}
                                                    open={openCRMBtn}
                                                    onClose={handleProfileMenuClose}
                                                    MenuListProps={{
                                                        'aria-labelledby': 'crmbtn',
                                                    }}
                                                    anchorOrigin={{
                                                        vertical: "bottom",
                                                        horizontal: "center"
                                                    }}
                                                    transformOrigin={{
                                                        vertical: "top",
                                                        horizontal: "center"
                                                    }}
                                                    PaperProps={{
                                                        style: { overflow: "visible" }
                                                    }}
                                                    sx={{
                                                        width: "327px",
                                                        height: '175px',
                                                        borderRadius: '3px',
                                                        marginTop: '2px',
                                                        padding: '15px',
                                                        '& .MuiList-root': {
                                                            paddingTop: '0px',
                                                            paddingBottom: '0px',

                                                        },
                                                        '& .MuiMenuItem-root': {
                                                            lineHeight: '17px',
                                                            color: '#474747',
                                                            fontSize: '14px',
                                                            // paddingTop: '0px',
                                                            // paddingBottom: '0px',
                                                            padding: '8px',
                                                            minHeight: '20px',
                                                            fontFamily: 'Segoe UI',
                                                            fontWeight: '600',
                                                            // paddingLeft: '4px',
                                                            // paddingRight: '15px',
                                                            '&:hover': {
                                                                backgroundColor: 'var(--c-primary-color)',
                                                                color: '#ffffff',
                                                            },
                                                        },

                                                    }}
                                                >
                                                    <MenuItem disableRipple onClick={handleProfileMenuClose} sx={{
                                                        display: 'flex', alignItems: 'center', gap: '9px', '&:hover': {
                                                            borderRadius: '5px 5px 0px 0px'
                                                        }
                                                    }}>
                                                        <Box component='span' >
                                                            <Cloud sx={{ height: '11px', width: '16px' }} />
                                                        </Box>
                                                        Connect Salesforce
                                                    </MenuItem>
                                                    <MenuItem disableRipple onClick={handleProfileMenuClose} sx={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                                                        <Box component='span' >
                                                            <Cloud sx={{ height: '11px', width: '16px' }} />
                                                        </Box>
                                                        Connect HubSpot
                                                    </MenuItem>
                                                    <MenuItem disableRipple onClick={handleProfileMenuClose} sx={{
                                                        display: 'flex', alignItems: 'center', gap: '9px', '&:hover': {
                                                            borderRadius: '0px 0px 5px 5px'
                                                        }
                                                    }}>
                                                        <Box component='span' >
                                                            <Cloud sx={{ height: '11px', width: '16px' }} />
                                                        </Box>
                                                        Connect Greenhouse
                                                    </MenuItem>

                                                </Menu>
                                                <Button
                                                    disableRipple
                                                    id='morebtn'
                                                    aria-controls={openMoreBtn ? 'morebtnmenu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={openMoreBtn ? 'true' : undefined}
                                                    onClick={handleClickMoreBtn}
                                                    endIcon={<ArrowDropDown />}
                                                    sx={{
                                                        color: '#737373',
                                                        textTransform: 'capitalize',
                                                        fontSize: '14px',
                                                        backgroundColor: openMoreBtn === true ? '#F0F0F0' : '#ffffff',
                                                        '&:hover': {
                                                            backgroundColor: '#F0F0F0'
                                                        }
                                                    }}
                                                >
                                                    <GridViewIcon sx={{ fontSize: '18px' }} />
                                                    CRM/ATS
                                                </Button> */}

                                                    {/* <Button
                                                    disableRipple
                                                    id='morebtn'
                                                    aria-controls={openMoreBtn ? 'morebtnmenu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={openMoreBtn ? 'true' : undefined}
                                                    onClick={handleClickMoreBtn}
                                                    endIcon={<ArrowDropDown />}
                                                    sx={{
                                                        color: '#737373',
                                                        textTransform: 'capitalize',
                                                        fontSize: '14px',
                                                        backgroundColor: openMoreBtn === true ? '#F0F0F0' : '#ffffff',
                                                        '&:hover': {
                                                            backgroundColor: '#F0F0F0'
                                                        }
                                                    }}
                                                >
                                                    More
                                                </Button> */}
                                                    {/* <Menu
                                                    id="morebtnmenu"
                                                    anchorEl={MoreanchorEl}
                                                    open={openMoreBtn}
                                                    onClose={handleProfileMenuClose}
                                                    MenuListProps={{
                                                        'aria-labelledby': 'morebtn',
                                                    }}
                                                    anchorOrigin={{
                                                        vertical: "bottom",
                                                        horizontal: "center"
                                                    }}
                                                    transformOrigin={{
                                                        vertical: "top",
                                                        horizontal: "center"
                                                    }}
                                                    PaperProps={{
                                                        style: { overflow: "visible" }
                                                    }}
                                                    sx={{
                                                        width: "327px",
                                                        height: '175px',
                                                        borderRadius: '3px',
                                                        marginTop: '2px',
                                                        padding: '15px',
                                                        '& .MuiList-root': {
                                                            paddingTop: '0px',
                                                            paddingBottom: '0px',

                                                        },
                                                        '& .MuiMenuItem-root': {
                                                            lineHeight: '17px',
                                                            color: '#474747',
                                                            fontSize: '14px',
                                                            // paddingTop: '0px',
                                                            // paddingBottom: '0px',
                                                            padding: '8px',
                                                            minHeight: '20px',
                                                            fontFamily: 'Segoe UI',
                                                            fontWeight: '600',
                                                            // paddingLeft: '4px',
                                                            // paddingRight: '15px',
                                                            '&:hover': {
                                                                backgroundColor: 'var(--c-primary-color)',
                                                                color: '#ffffff',
                                                            },
                                                        },

                                                    }}
                                                >
                                                    <MenuItem disableRipple onClick={handleProfileMenuClose} sx={{
                                                        display: 'flex', alignItems: 'center', gap: '9px', '&:hover': {
                                                            borderRadius: '5px 5px 0px 0px'
                                                        }
                                                    }}>
                                                        Edit Contact Info
                                                    </MenuItem>
                                                    <MenuItem disableRipple onClick={handleProfileMenuClose} sx={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                                                        Delete
                                                    </MenuItem>
                                                    <MenuItem disableRipple onClick={handleProfileMenuClose} sx={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                                                        Enrich Email
                                                    </MenuItem>
                                                    <MenuItem disableRipple onClick={handleProfileMenuClose} sx={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                                                        Enrich Mobile Number
                                                    </MenuItem>
                                                    <MenuItem disableRipple onClick={handleProfileMenuClose} sx={{
                                                        display: 'flex', alignItems: 'center', gap: '9px', '&:hover': {
                                                            borderRadius: '0px 0px 5px 5px'
                                                        }
                                                    }}>
                                                        Merge Duplicate
                                                    </MenuItem>
                                                </Menu> */}

                                                    <Menu
                                                        id="morebtnmenu"
                                                        anchorEl={MoreanchorEl}
                                                        open={openMoreBtn}
                                                        onClose={handleProfileMenuClose}
                                                        MenuListProps={{
                                                            'aria-labelledby': 'morebtn',
                                                        }}
                                                        anchorOrigin={{
                                                            vertical: "bottom",
                                                            horizontal: "center"
                                                        }}
                                                        transformOrigin={{
                                                            vertical: "top",
                                                            horizontal: "center"
                                                        }}
                                                        PaperProps={{
                                                            style: { overflow: "visible" }
                                                        }}
                                                        sx={{
                                                            width: "327px",
                                                            height: '175px',
                                                            borderRadius: '3px',
                                                            marginTop: '2px',
                                                            padding: '15px',
                                                            '& .MuiList-root': {
                                                                paddingTop: '0px',
                                                                paddingBottom: '0px',

                                                            },
                                                            '& .MuiMenuItem-root': {
                                                                lineHeight: '17px',
                                                                color: '#474747',
                                                                fontSize: '14px',
                                                                // paddingTop: '0px',
                                                                // paddingBottom: '0px',
                                                                padding: '8px',
                                                                minHeight: '20px',
                                                                fontFamily: 'Segoe UI',
                                                                fontWeight: '600',
                                                                // paddingLeft: '4px',
                                                                // paddingRight: '15px',
                                                                '&:hover': {
                                                                    backgroundColor: 'var(--c-primary-color)',
                                                                    color: '#ffffff',
                                                                },
                                                            },

                                                        }}
                                                    >
                                                        <MenuItem disableRipple onClick={handleProfileMenuClose} sx={{
                                                            display: 'flex', alignItems: 'center', gap: '9px', '&:hover': {
                                                                borderRadius: '5px 5px 0px 0px'
                                                            }
                                                        }}>
                                                            Edit Contact
                                                        </MenuItem>
                                                        {/* <MenuItem disableRipple onClick={handleProfileMenuClose} sx={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                                                            Delete
                                                        </MenuItem>
                                                        <MenuItem disableRipple onClick={handleProfileMenuClose} sx={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                                                            Enrich Email
                                                        </MenuItem>
                                                        <MenuItem disableRipple onClick={handleProfileMenuClose} sx={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                                                            Enrich Mobile Number
                                                        </MenuItem>
                                                        <MenuItem disableRipple onClick={handleProfileMenuClose} sx={{
                                                            display: 'flex', alignItems: 'center', gap: '9px', '&:hover': {
                                                                borderRadius: '0px 0px 5px 5px'
                                                            }
                                                        }}>
                                                            Merge Duplicate
                                                        </MenuItem> */}
                                                    </Menu>
                                                    {/* <Chip className='body-text' icon={<Add className='square-icon' />} label="Resumes (1)" variant="outlined" sx={{ border: 'none' }} /> */}
                                                </Stack>

                                            </Stack>
                                            <Stack className='card-column pt-2 px-4 conDetails-stack'>
                                                {dialogStatus && <EmailDialogBox
                                                    dialogOpen={dialogStatus}
                                                    onClose={() => setDialogStatus(false)}
                                                    name={editContactData.firstName}
                                                    emailId={emailOnClicked}
                                                    contactId={contactId}
                                                />}
                                                {editContactData.contEmail && (
                                                    <>
                                                        <Box className="mail-box" >
                                                            <Box className="emailicon-wrap">
                                                                <MailOutlineOutlined className='mail-icon' />
                                                            </Box>
                                                            <Box className="box-inner">
                                                                <Box className="box-internal">
                                                                    <Tooltip title={!restrictMaskValidationState.isShowEmail ? "" : editContactData.contEmail}>
                                                                        <Typography
                                                                            className='email-text'
                                                                            onClick={() => {
                                                                                if (restrictMaskValidationState.isShowEmail) {
                                                                                    setDialogStatus(true);
                                                                                    setEmailOnClicked(editContactData.contEmail);
                                                                                }
                                                                            }}
                                                                        >{!restrictMaskValidationState.isShowEmail ? Mask.email(editContactData.contEmail) : editContactData.contEmail}</Typography>
                                                                    </Tooltip>
                                                                    <Typography className='email-subtext'>Business Primary</Typography>
                                                                </Box>
                                                                {
                                                                    (!restrictMaskValidationState.isShowEmail) ?
                                                                        <UpgradeButton validationCheck={restrictMaskValidationState.isPackageEmailValidity} callViewAPI={() => viewAPIContact('email', restrictMaskValidationState.emailType)} />
                                                                        :
                                                                        null
                                                                }
                                                            </Box>
                                                        </Box>
                                                    </>
                                                )}
                                                {editContactData.contEmail2 && (
                                                    <>
                                                        <Box className="mail-box" >

                                                            <Box className="emailicon-wrap">
                                                                <MailOutlineOutlined className='mail-icon' />
                                                            </Box>
                                                            <Box className="box-inner">
                                                                <Box className="box-internal">
                                                                    <Tooltip title={!restrictMaskValidationState.isShowEmail ? "" : editContactData.contEmail2}>
                                                                        <Typography
                                                                            className='email-text'
                                                                            onClick={() => {
                                                                                if (restrictMaskValidationState.isShowEmail) {
                                                                                    setDialogStatus(true);
                                                                                    setEmailOnClicked(editContactData.contEmail2);
                                                                                }
                                                                            }}
                                                                        >{!restrictMaskValidationState.isShowEmail ? Mask.email(editContactData.contEmail2) : editContactData.contEmail2}</Typography>
                                                                    </Tooltip>
                                                                    <Typography className='email-subtext'>Secondary</Typography>
                                                                </Box>
                                                                {
                                                                    (!restrictMaskValidationState.isShowEmail) ?
                                                                        <UpgradeButton validationCheck={restrictMaskValidationState.isPackageEmailValidity} callViewAPI={() => viewAPIContact('email', restrictMaskValidationState.emailType)} />
                                                                        :
                                                                        null
                                                                }
                                                            </Box>
                                                        </Box>
                                                    </>
                                                )}
                                                {/********  Phone  ***  */}
                                                {editContactData.mobile && (
                                                    <>
                                                        <Box className="mail-box" >
                                                            <Box className="emailicon-wrap">
                                                                <CallOutlined className='mail-icon' />
                                                            </Box>
                                                            <Box className="box-inner">
                                                                <Box className="box-internal">
                                                                    <Tooltip title={!restrictMaskValidationState.isShowPhone ? "" : editContactData.mobile}>
                                                                        <Typography
                                                                            className='email-text'
                                                                            onClick={() => {
                                                                                if (restrictMaskValidationState.isShowPhone) {
                                                                                    if (!userLocalData.isChromeExtensionEnabled()) {
                                                                                        setDialogPhoneStatus(true);
                                                                                    }
                                                                                    setPhoneOnClicked(editContactData.mobile);
                                                                                }
                                                                            }}
                                                                        >{!restrictMaskValidationState.isShowPhone ? Mask.phone(editContactData.mobile) : USPhoneFormat.get(editContactData.mobile)}</Typography>
                                                                    </Tooltip>
                                                                    <Typography className='email-subtext'>Primary</Typography>
                                                                </Box>
                                                                {
                                                                    (!restrictMaskValidationState.isShowPhone) ?
                                                                        <UpgradeButton validationCheck={restrictMaskValidationState.isPackagePhoneValidity} callViewAPI={() => viewAPIContact('phone', restrictMaskValidationState.phoneType)} />
                                                                        :
                                                                        null
                                                                }
                                                            </Box>
                                                        </Box>
                                                    </>
                                                )}
                                                {editContactData.directPhone && (
                                                    <>
                                                        <Box className="mail-box" >
                                                            <Box className="emailicon-wrap">
                                                                <CallOutlined className='mail-icon' />
                                                            </Box>
                                                            <Box className="box-inner">
                                                                <Box className="box-internal">
                                                                    <Tooltip title={!restrictMaskValidationState.isShowPhone ? "" : editContactData.directPhone}>
                                                                        <Typography
                                                                            className='email-text'
                                                                            onClick={() => {
                                                                                if (restrictMaskValidationState.isShowPhone) {
                                                                                    if (!userLocalData.isChromeExtensionEnabled()) {
                                                                                        setDialogPhoneStatus(true);
                                                                                    }
                                                                                    setPhoneOnClicked(editContactData.directPhone);
                                                                                }
                                                                            }}
                                                                        >{!restrictMaskValidationState.isShowPhone ? Mask.phone(editContactData.directPhone) : USPhoneFormat.get(editContactData.directPhone)}</Typography>
                                                                    </Tooltip>
                                                                    <Typography className='email-subtext'>Secondary</Typography>
                                                                </Box>
                                                                {
                                                                    (!restrictMaskValidationState.isShowPhone) ?
                                                                        <UpgradeButton validationCheck={restrictMaskValidationState.isPackagePhoneValidity} callViewAPI={() => viewAPIContact('phone', restrictMaskValidationState.phoneType)} />
                                                                        :
                                                                        null
                                                                }
                                                            </Box>
                                                        </Box>
                                                    </>
                                                )}

                                                {/**  view contact */}
                                                {/* <Box className="mail-box">
                                                    <Box className="emailicon-wrap">
                                                        <MailOutlineOutlined className='mail-icon' />
                                                    </Box>


                                                    <Box className="box-inner">
                                                        <Box>
                                                            <Typography className='email-text' sx={{ cursor: 'pointer' }} onClick={() => {
                                                                setDialogStatus(true);
                                                                setEmailOnClicked(editContactData.contEmail);
                                                            }}
                                                            >{!restrictMaskValidationState.isShowEmail ? Mask.email(editContactData.contEmail) : editContactData.contEmail}</Typography>

                                                            <Typography className='email-subtext'>Business Primary</Typography>
                                                        </Box>
                                                        <Box className="hover-box">
                                                            {editContactData.contEmail !== "" && <Button
                                                                disableRipple
                                                                className='button-hover'>
                                                                <ContentCopyOutlined sx={{
                                                                    fontSize: '15px',
                                                                    color: 'var(--c-secondary-color)'
                                                                }} />
                                                            </Button>
                                                            }
                                                            <Button
                                                                disableRipple
                                                                className='button-hover'
                                                            >
                                                                <BorderColor sx={{ fontSize: '15px', color: 'var(--c-secondary-color)' }} />
                                                            </Button>
                                                            {editContactData.contEmail !== "" && <Button
                                                                disableRipple
                                                                className='button-hover'
                                                            >
                                                                <DeleteOutlined sx={{ fontSize: '15px', color: 'var(--c-secondary-color)' }} />
                                                            </Button>
                                                            }
                                                        </Box>
                                                    </Box>
                                                </Box>

                                                <Box className="mail-box">
                                                    <Box className="emailicon-wrap">
                                                        <MailOutlineOutlined className='mail-icon' />
                                                    </Box>


                                                    <Box className="box-inner">
                                                        <Box>
                                                            <Typography className='email-text'
                                                            >{!restrictMaskValidationState.isShowEmail ? Mask.email(editContactData.contEmail2) : editContactData.contEmail2}</Typography>

                                                            <Typography className='email-subtext'>Secondary</Typography>
                                                        </Box>
                                                        <Box className="hover-box">
                                                            {editContactData.contEmail2 !== "" && <Button
                                                                disableRipple
                                                                className='button-hover'>
                                                                <ContentCopyOutlined sx={{
                                                                    fontSize: '15px',
                                                                    color: 'var(--c-secondary-color)'
                                                                }} />
                                                            </Button>
                                                            }
                                                            <Button
                                                                disableRipple
                                                                className='button-hover'
                                                            >
                                                                <BorderColor sx={{ fontSize: '15px', color: 'var(--c-secondary-color)' }} />
                                                            </Button>
                                                            {editContactData.contEmail2 !== "" && <Button
                                                                disableRipple
                                                                className='button-hover'
                                                            >
                                                                <DeleteOutlined sx={{ fontSize: '15px', color: 'var(--c-secondary-color)' }} />
                                                            </Button>
                                                            }
                                                        </Box>
                                                    </Box>
                                                </Box>

                                                <Box className="mail-box">
                                                    <Box className="emailicon-wrap">
                                                        <CallOutlined className='mail-icon' />
                                                    </Box>

                                                    <Box className="box-inner">
                                                        <Box>
                                                            <Typography className='email-text'
                                                                onClick={() => {
                                                                    setPhoneOnClicked(editContactData.mobile);
                                                                    if (!userLocalData.isChromeExtensionEnabled()) {
                                                                        setDialogPhoneStatus(true);
                                                                    }
                                                                }}
                                                            >
                                                                {(editContactData.mobile) ? (!restrictMaskValidationState.isShowPhone ? Mask.phone(editContactData.mobile) : USPhoneFormat.get(editContactData.mobile)) : ""}
                                                            </Typography>

                                                            <Box component='span' className='email-subtext'>Primary</Box>
                                                        </Box>
                                                        <Box className="hover-box">
                                                            <Button
                                                                disableRipple
                                                                className='button-hover'
                                                            >
                                                                <ContentCopyOutlined sx={{
                                                                    fontSize: '15px',
                                                                    color: 'var(--c-secondary-color)'
                                                                }} />
                                                            </Button>
                                                            <Button
                                                                disableRipple
                                                                className='button-hover'
                                                            >
                                                                <BorderColor sx={{ fontSize: '15px', color: 'var(--c-secondary-color)' }} />
                                                            </Button>
                                                            <Button
                                                                disableRipple
                                                                className='button-hover'
                                                            >
                                                                <DeleteOutlined sx={{ fontSize: '15px', color: 'var(--c-secondary-color)' }} />
                                                            </Button>
                                                        </Box>
                                                    </Box>
                                                </Box>

                                                <Box className="mail-box">
                                                    <Box className="emailicon-wrap">
                                                        <CallOutlined className='mail-icon' />
                                                    </Box>

                                                    <Box className="box-inner">
                                                        <Box>
                                                            <Typography className='email-text'
                                                                onClick={() => {
                                                                    setPhoneOnClicked(editContactData.directPhone);
                                                                    if (!userLocalData.isChromeExtensionEnabled()) {
                                                                        setDialogPhoneStatus(true);
                                                                    }
                                                                }}
                                                            >
                                                                {(editContactData.directPhone) ? (!restrictMaskValidationState.isShowPhone ? Mask.phone(editContactData.directPhone) : USPhoneFormat.get(editContactData.directPhone)) : ""}
                                                            </Typography>

                                                            <Box component='span' className='email-subtext'>Secondary</Box>
                                                        </Box>
                                                        <Box className="hover-box">
                                                            {editContactData.directPhone !== "" && <Button
                                                                disableRipple
                                                                className='button-hover'
                                                            >
                                                                <ContentCopyOutlined sx={{
                                                                    fontSize: '15px',
                                                                    color: 'var(--c-secondary-color)'
                                                                }} />
                                                            </Button>
                                                            }
                                                            <Button
                                                                disableRipple
                                                                className='button-hover'
                                                            >
                                                                <BorderColor sx={{ fontSize: '15px', color: 'var(--c-secondary-color)' }} />
                                                            </Button>
                                                            {editContactData.directPhone !== "" && <Button
                                                                disableRipple
                                                                className='button-hover'
                                                            >
                                                                <DeleteOutlined sx={{ fontSize: '15px', color: 'var(--c-secondary-color)' }} />
                                                            </Button>
                                                            }
                                                        </Box>
                                                    </Box>
                                                </Box> */}
                                                {/**  view contact */}
                                                {/* <Box>
                                                    <Button
                                                        disableRipple
                                                        startIcon={<Add sx={{ color: 'var(--c-primary-color)', height: '15px', width: '15px' }} />}
                                                        className='add-number-btn'
                                                    >
                                                        Add Phone Number
                                                    </Button>
                                                </Box> */}

                                            </Stack>

                                        </Stack>
                                        <Stack className='list-wrapper'>
                                            <Box component='h6' className='list-head'>
                                                Lists:
                                                {listData.map((item: any, i: number) => (
                                                    <Box component='span' sx={{ ml: 1, mb: 1, display: 'inline-block' }} key={i}>
                                                        <Button
                                                            disableRipple
                                                            endIcon={< ClearOutlined sx={{ color: '#737373', height: '10px', width: '10px' }} />}
                                                            className='label-btn'
                                                            onClick={() => {
                                                                handleProfileMenuClose();
                                                                confirmDialog(`Are you sure you want to remove - ${item.listName}?`, () => {
                                                                    deleteList(item.listId);
                                                                }, "warning");
                                                            }}
                                                        >
                                                            {item.listName}
                                                        </Button>
                                                    </Box>
                                                ))}
                                            </Box>
                                            <Box component='h6' sx={{ paddingRight: 0, m: 0 }}>
                                                <Button
                                                    id="add-list-btn"
                                                    aria-controls={openAddToListenBtn ? "addlistmenu" : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={openAddToListenBtn ? 'true' : undefined}
                                                    onClick={handleClickAddToListen}
                                                    //  startIcon={< PlaylistAddOutlined />}
                                                    disableRipple
                                                    className='addlist-btn'
                                                >
                                                    Add
                                                </Button>
                                                <Menu
                                                    id="addlistmenu"
                                                    anchorEl={addtolistanchorEl}
                                                    open={openAddToListenBtn}
                                                    onClose={handleProfileMenuClose}
                                                    MenuListProps={{
                                                        'aria-labelledby': 'add-list-btn',
                                                    }}
                                                    anchorOrigin={{
                                                        vertical: "bottom",
                                                        horizontal: "center"
                                                    }}
                                                    transformOrigin={{
                                                        vertical: "top",
                                                        horizontal: "center"
                                                    }}
                                                    PaperProps={{
                                                        style: { overflow: "visible" }
                                                    }}

                                                    sx={{
                                                        boxShadow: '0px',
                                                        '& .MuiList-root.MuiMenu-list': {
                                                            pt: '8px',
                                                            pb: '15px',
                                                            pr: '10px',
                                                            pl: '10px'
                                                        }
                                                    }}
                                                >


                                                    <MUIAutoComplete
                                                        id='contactList'
                                                        handleChange={(id: any, name: string) => {
                                                            setSelectedList({ id, name });
                                                            addToList(id, name);
                                                        }}
                                                        valuePassed={
                                                            (selectedList.id) ? { label: selectedList.name, id: selectedList.id } :
                                                                {}
                                                        }
                                                        isMultiple={false}
                                                        textToShow="Select List"
                                                        width="250px"
                                                        type='contactList'
                                                        placeholder="Select / Type to create List"
                                                    />
                                                </Menu>

                                            </Box>

                                        </Stack>
                                        {
                                            isCampaignsEnabled && isHighVolumeHiringSettingEnabled && restrictMaskValidationState.isShowEmail && Boolean(editContactData.contEmail || editContactData.contEmail2) ?
                                                <Stack className='list-wrapper'>
                                                    <Box component='h6' className='list-head'>
                                                        Campaign:

                                                        {sequenceListData.map((item: any, i: number) => (
                                                            <Box component='span' sx={{ ml: 1, mb: 1, display: 'inline-block' }} key={i}>
                                                                <Button
                                                                    disableRipple
                                                                    endIcon={< ClearOutlinedIcon sx={{ color: '#737373', height: '10px', width: '10px' }} />}
                                                                    className='label-btn'
                                                                    onClick={() => {
                                                                        handleProfileMenuClose();
                                                                        confirmDialog(`Are you sure you want to remove - ${item.sequenceName}?`, () => {
                                                                            deleteSequenceId(item.sequenceId);
                                                                        }, "warning"
                                                                        );
                                                                    }}
                                                                >
                                                                    {item.sequenceName}

                                                                </Button>
                                                            </Box>
                                                        ))}

                                                    </Box>
                                                    <Box component='h6' sx={{ paddingRight: 0, m: 0 }}>

                                                        <Button
                                                            id="add-seqlist-btn"
                                                            aria-controls={openAddToSequenceListenBtn ? "addseqlistmenu" : undefined}
                                                            aria-haspopup="true"
                                                            aria-expanded={openAddToSequenceListenBtn ? 'true' : undefined}
                                                            onClick={handleClickAddToSequenceListen}
                                                            //   startIcon={< PlaylistAddOutlined />}
                                                            disableRipple
                                                            className='addlist-btn'
                                                        >
                                                            Add
                                                        </Button>
                                                        <Menu
                                                            id="addseqlistmenu"
                                                            anchorEl={addtoSeqlistanchorEl}
                                                            open={openAddToSequenceListenBtn}
                                                            onClose={() => {
                                                                setAddToSeqListAnchorEl(null);
                                                                handleProfileMenuClose();
                                                            }}
                                                            MenuListProps={{
                                                                'aria-labelledby': 'add-seqlist-btn',
                                                            }}
                                                            anchorOrigin={{
                                                                vertical: "bottom",
                                                                horizontal: "center"
                                                            }}
                                                            transformOrigin={{
                                                                vertical: "top",
                                                                horizontal: "center"
                                                            }}
                                                            PaperProps={{
                                                                style: { overflow: "visible" }
                                                            }}

                                                            sx={{
                                                                boxShadow: '0px',
                                                                '& .MuiList-root.MuiMenu-list': {
                                                                    pt: '8px',
                                                                    pb: '15px',
                                                                    pr: '10px',
                                                                    pl: '10px'
                                                                }
                                                            }}
                                                        >
                                                            <MUIAutoComplete
                                                                id='sequenceId1'
                                                                handleChange={(id: any, name: string) => {
                                                                    setSelectedSequence({ id, name });
                                                                    addToSequenceList(id, name);
                                                                }}
                                                                valuePassed={
                                                                    (selectedSequence.id) ? { label: selectedSequence.name, id: selectedSequence.id } :
                                                                        {}
                                                                }
                                                                existingSequenceIds={sequenceListData.map((item: any) => item.sequenceId)}
                                                                isMultiple={false}
                                                                textToShow="Select Campaign"
                                                                width="250px"
                                                                type='contactSequence'
                                                                placeholder="Select Campaign"
                                                            />
                                                        </Menu>
                                                    </Box>
                                                </Stack>
                                                :
                                                null
                                        }

                                    </div>
                                </div>
                                <div className='card'>
                                    <div className='card-inner'>
                                        <Box sx={{ width: '100%' }}>
                                            <Box
                                                className='customCard py-0 customCenteredTabs '
                                                sx={{ borderBottom: 1, borderColor: 'divider', minHeight: 'auto !important', marginBottom: '0 !important' }}

                                            >
                                                <Tabs value={value} onChange={handleChange} aria-label="Placements Tabs" centered>
                                                    {/* <TabList value={value} onChange={handleTabChange} aria-label="lab API tabs example"> */}
                                                    {/* <Tab className='body-text-dark' label="Overview" value="0" /> */}


                                                    <Tab className='body-text-dark' label={<span className='tabLabelName'>Jobs</span>} />
                                                    <Tab className={`body-text-dark ${isHiringWorkFlowEnabled ? "" : 'd-none'}`} label={<span className='tabLabelName'>Placements</span>} />
                                                    <Tab className={`body-text-dark ${isCareerPortalEnabled ? "" : 'd-none'}`} label={<span className='tabLabelName'>Custom Fields</span>} />
                                                </Tabs>
                                            </Box>
                                            <CustomTabPanel value={value} index={0}>
                                                {
                                                    editContactData.firstName ?
                                                        <Jobs contactId={(contactId) ? contactId : ""}
                                                            firstName={editContactData.firstName}
                                                            lastName={editContactData.lastName} />
                                                        :
                                                        null
                                                }
                                            </CustomTabPanel>
                                            <CustomTabPanel value={value} index={1}>
                                                {
                                                    editContactData.firstName ?
                                                        <Placements 
                                                            contactId={(contactId) ? contactId : ""}
                                                        />
                                                        :
                                                        null
                                                }
                                            </CustomTabPanel>
                                            <CustomTabPanel value={value} index={2}>
                                                <ModuleFormAnswer moduleById={Number(contactId)} moduleId={20004} moduleName='Contact Form' />
                                            </CustomTabPanel>

                                            {/* <CustomTabPanel value={value} index={0}>
                                                <div className='customCard'>
                                                    <Stack className='column left'>
                                                        <Stack >
                                                            <Stack>
                                                                <Box className="logo-wrapper">
                                                                    <Typography>Assured Partners</Typography>
                                                                </Box>
                                                                <Stack direction='row' justifyContent="center" spacing={1}>
                                                                    <Box className='icon-wrap'>
                                                                        <Link sx={{ color: '#919191' }} />
                                                                    </Box>
                                                                    <Box className='icon-wrap'>
                                                                        <LinkedIn sx={{ color: '#737373' }} />
                                                                    </Box>
                                                                    <Box className='icon-wrap'>
                                                                        <Facebook sx={{ color: '#919191' }} />
                                                                    </Box>
                                                                    <Box className='icon-wrap'>
                                                                        <Twitter sx={{ color: '#919191' }} />
                                                                    </Box>
                                                                </Stack>
                                                            </Stack>

                                                            <Stack mt={4} pl={1}>
                                                                <Stack direction='row' sx={{ justifyContent: 'space-between' }}>
                                                                    <Box sx={{ width: '50%' }}>
                                                                        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 0.3 }}>
                                                                            <div className='customMainLabel'>
                                                                                Company Phone
                                                                            </div>
                                                                            <Box component='span' sx={{ color: '#737373' }}>
                                                                                <HelpOutlineOutlined sx={{ fontSize: '13.33px', mt: '5px' }} />
                                                                            </Box>
                                                                        </Box>
                                                                        <div className='customDataLabel'>
                                                                            {companyData.mainPhone}
                                                                        </div>
                                                                    </Box>
                                                                    <Box sx={{ width: '50%' }}>
                                                                        <div className='customMainLabel'>
                                                                            Account Owner
                                                                        </div>
                                                                        <div className='customDataLabel'>
                                                                            {companyData.ownerName}
                                                                        </div>
                                                                    </Box>
                                                                </Stack>

                                                                <Stack direction='row' mt={1} sx={{ display: 'flex', flexDirection: 'row' }}>
                                                                    <Box sx={{ width: '50%' }}>
                                                                        <div className='customMainLabel'>
                                                                            Industry
                                                                        </div>
                                                                        <div className='customDataLabel'>
                                                                            {getIndustryValue(companyData.industry)}
                                                                        </div>
                                                                    </Box>
                                                                    <Box sx={{ width: '50%' }}>
                                                                        <div className='customMainLabel'>
                                                                            Employees
                                                                        </div>
                                                                        <div className='customDataLabel'>
                                                                            {companyData.employees}
                                                                        </div>
                                                                    </Box>
                                                                </Stack>

                                                                <Stack direction='row' mt={1} sx={{ display: 'flex', flexDirection: 'row' }}>
                                                                    <Box sx={{ width: '50%' }}>
                                                                        <div className='customMainLabel'>
                                                                            Account Stage
                                                                        </div>
                                                                    </Box>
                                                                    <Box sx={{ width: '50%' }}>
                                                                        <div className='customMainLabel'>
                                                                            Founded Year
                                                                        </div>
                                                                        <div className='customDataLabel'>
                                                                            {companyData.started}
                                                                        </div>
                                                                    </Box>
                                                                </Stack>

                                                                <Stack direction='row' mt={1} sx={{ display: 'flex', flexDirection: 'row' }}>
                                                                    <Box sx={{ width: '50%' }}>
                                                                        <div className='customMainLabel'>
                                                                            Trading
                                                                        </div>
                                                                    </Box>
                                                                    <Box sx={{ width: '50%' }}>
                                                                        <div className='customMainLabel'>
                                                                            Annual Revenue
                                                                        </div>
                                                                        <div className='customDataLabel'>
                                                                            {companyData.revenue}
                                                                        </div>
                                                                    </Box>
                                                                </Stack>
                                                            </Stack>
                                                        </Stack>
                                                    </Stack>
                                                </div>
                                            </CustomTabPanel> */}
                                        </Box>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </Grid>
                <Grid
                    sx={{ width: 385 }}>
                    {
                        userLocalData.checkIntegration(400014) ?
                            <>
                                <div className='mb-5 d-none' >
                                    <Tasks contName={editContactData.firstName + " " + editContactData.lastName} contactId={contactId} />

                                    {/* <ContactActivities /> */}
                                </div>
                                {
                                    editContactData.contId ?
                                        <Activities note={true} email={restrictMaskValidationState.isShowEmail && Boolean(editContactData.contEmail || editContactData.contEmail2)} call={false} reqCall={true} meeting={true} componentFrom="contact" contactId={contactId} contactName={editContactData.firstName + " " + editContactData.lastName}
                                            companyId={companyId}
                                            candidateId={""}
                                            isShowEmail={restrictMaskValidationState.isShowEmail && Boolean(editContactData.contEmail || editContactData.contEmail2)}
                                            isShowPhone={restrictMaskValidationState.isShowPhone && Boolean(editContactData.mobile || editContactData.directPhone)}
                                        />
                                        :
                                        null
                                }
                            </>
                            :
                            null
                    }
                </Grid>
            </Grid>

            {
                (openAddContactModal) ?
                    <AddContacts
                        open={openAddContactModal}
                        closePopup={(e: boolean) => {
                            if (e) {
                                getContactData();
                            }
                            setOpenAddContactModal(false)
                        }}
                        add={false}
                        contactData={editContactData}
                    />
                    :
                    null
            }
            {
                dialogPhoneStatus ?
                    <PhoneDialog
                        dialogOpen={dialogPhoneStatus}
                        onClose={() => setDialogPhoneStatus(false)}
                        name={editContactData.firstName}
                        toPhone={phoneOnClicked}
                        contactId={(contactId) ? contactId : ""}
                        candidateId={''}
                    // jobId={jobId}
                    />
                    :
                    null
            }
        </div>
    );
};

const ViewContact = ({ viewContactId, isInModal }: { viewContactId?: any, isInModal?: boolean }) => {
    const { contactId } = useParams();
    return (
        <ViewContactComponent contactId={contactId ? contactId : viewContactId} isInModal={isInModal || false} />
    )
}

export default ViewContact;
