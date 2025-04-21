// import { useEffect, useState, useRef, useCallback } from 'react';
import { useEffect, useState, useRef } from '../../../../../shared/modules/React';

// import InputLabel from '@mui/material/InputLabel';

import { Link, useParams, useNavigate } from 'react-router-dom';

// import Select from '@mui/material/Select';
import { MenuItem } from '../../../../../shared/modules/MaterialImports/Menu';

// import Timeline from '@mui/lab/Timeline';
// import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
// import TimelineSeparator from '@mui/lab/TimelineSeparator';
// import TimelineConnector from '@mui/lab/TimelineConnector';
// import TimelineContent from '@mui/lab/TimelineContent';
// import TimelineDot from '@mui/lab/TimelineDot';

// import ReactQuill from 'react-quill';

import { ButtonGroup } from '../../../../../shared/modules/MaterialImports/ButtonGroup';

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';

import './AddSequence.scss';
import { Button, Grid, showToaster, TextField, InputAdornment } from '../../../../../shared/modules/commonImports';
// import Autocomplete, { AutocompleteRenderGetTagProps } from '@mui/material/Autocomplete';
// import { ConfirmDialog, confirmDialog } from '../../../shared/components/ConfirmDialog/ConfirmDialog';
// import Chip from '@mui/material/Chip';
// import { Chips } from 'primereact/chips';
// import { AutoComplete } from 'primereact/autocomplete';
import { useFormik, Formik, FieldArray, Form, Yup } from '../../../../../shared/modules/Formik';
import { DateTime } from '../../../../../shared/modules/Luxon';
// import { showToaster } from '../../../shared/components/SnackBar/SnackBar';
// Field

// import { TextFieldProps } from '@mui/material/TextField';
// import { useFormik } from 'formik';

// import { Editor } from 'primereact/editor';

import ApiService from '../../../../../shared/api/api';
import { trackPromise } from '../../../../../shared/modules/PromiseTrackter';
import { SendEmailDialog, setSendEmailDialogData } from '../../../../../shared/components/SendEmailDialog/SendEmailDialog';
// import Autocomplete from '@mui/material/Autocomplete';
// import { TemplateRespomse } from '../../../shared/interface/common';

// import Editor from './../EmailBody/EmailBody';
import EmailAutoComplete from '../../../../../shared/components/EmailAutoComplete/EmailAutoComplete';
import { confirmDialog } from '../../../../shared/ConfirmDialog/ConfirmDialog';
import { userLocalData } from '../../../../../shared/services/userData';
// import { MUIAutoComplete } from '../../../shared/components/MUIAutoComplete/MUIAutoComplete';
import GridViewIcon from "@mui/icons-material/GridView";
//import IntegrationInstructionsOutlinedIcon from "@mui/icons-material/IntegrationInstructionsOutlined";
//import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import { MUIAutoComplete } from '../../../../../components/shared/MUIAutoComplete/MUIAutoComplete';
//import PlaceHolders from '../../Workflow/PopUps/PlaceHolders/PlaceHolders';
import Editor from '../../../../shared/EmailDialogBox/EmailBody';
import CodeIcon from '@mui/icons-material/Code';
import NotesIcon from '@mui/icons-material/Notes';
// import { debounce } from 'lodash';
const AddSequence = () => {
    interface Stage {
        mergeField: string;
        template: string;
        followUp: string;
        stageID: string;
        scheduledType: string;
        scheduledTime: string;
        scheduledDate: string;
        timeZone: string;
        businessDays: string;
        totalBusinessDays: string;
        fromEmail: { name: string, code: string };
        ccEmail: string[];
        subject: string;
        mailBody: string;
    }

    const { SequenceId } = useParams();
    const { sequenceType } = useParams();
    // const quillRefs = useRef<ReactQuill[] | null[]>([]);
    const navigate = useNavigate();
    const [deletedStages, setDeletedStages] = useState<string[]>([]);
    const [pageLoad, setPageLoad] = useState<boolean>(false);
    const initialRender = useRef(true);
    // const [editedBusinessDays, setEditedBusinessDays] = useState<boolean>(false);

    const editSequenceData = useRef<{ sequenceName: string, stages: Stage[] }>({
        sequenceName: '',
        stages: [
            {
                mergeField: "0",
                template: !userLocalData.isChromeExtensionEnabled() ? "allTemplates" : "emailTemplates",
                followUp: 'Email',
                scheduledType: '1',
                stageID: '',
                scheduledTime: new Date().toTimeString().substring(0, 5),
                scheduledDate: new Date().toISOString().substring(0, 10),
                timeZone: '1',
                // timeZone: 'EST',
                fromEmail: { name: '', code: '' },
                businessDays: '30',
                totalBusinessDays: '30',
                ccEmail: [],
                subject: '',
                mailBody: ''
            }
        ]
    })


    // const temparoryStage: Stage = {
    //     scheduledType: '',
    //     followUp: '',
    //     scheduledDate: '',
    //     scheduledTime: '',
    //     timeZone: '',
    //     fromEmail: '',
    //     ccEmail: [],
    //     subject: '',
    //     mailBody: ''
    // }
    let initialValuesFromLocal = {
        sequenceName: '',
        stages: [
            {
                mergeField: "0",
                template: !userLocalData.isChromeExtensionEnabled() ? "allTemplates" : "emailTemplates",
                followUp: 'Email',
                scheduledType: '1',
                stageID: '',
                scheduledTime: new Date().toTimeString().substring(0, 5),
                scheduledDate: new Date().toISOString().substring(0, 10),
                timeZone: '1',
                // timeZone: 'EST',
                fromEmail: { name: '', code: '' },
                businessDays: '30',
                totalBusinessDays: '30',
                ccEmail: [],
                subject: '',
                mailBody: ''
            }
        ]
    };
    // let tempLocal = (localStorage.getItem('sequenceById')) ? localStorage.getItem('sequenceById') : '';
    // if (tempLocal) {
    //     initialValuesFromLocal = JSON.parse(tempLocal);
    // }

    useEffect(() => {

        // trackPromise(
        //     ApiService.getCall(171, 'getTemplatesList.jsp').then((response: any) => {

        //         // console.log(response.data);
        //         setTemplateList(response.data);
        //         if (SequenceId) {
        //             loadUserData();
        //         } else {
        //             setPageLoad(true);
        //         }
        //     })
        // );
        if (SequenceId) {
            // loadUserData();
            if (initialRender.current) {
                initialRender.current = false;
            } else {
                getSequenceList()
            }

        } else {
            setPageLoad(true);
        }
        // if (!tempLocal && !initialValuesFromLocal && !initialValuesFromLocal) {
        //     showToaster('An error occured. Please try again.', 'error')
        //     navigate('/sequence/list');
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const stageValidationSchema = Yup.object().shape({
        sequenceName: Yup.string()
            .required('Name is required'),
        stages: Yup.array().of(
            Yup.object().shape({
                mergeField: Yup.string(),
                template: Yup.string(),
                stageID: Yup.string(),
                scheduledType: Yup.string()
                    .required('Type is required'),
                followUp: Yup.string()
                    .required('Follow Up is required'),
                scheduledTime: Yup.string(),
                timeZone: Yup.string(),
                scheduledDate: Yup.string(),
                businessDays: Yup.string(),
                // .required('Business Days is required'),
                totalBusinessDays: Yup.string(),
                fromEmail: Yup.string(),
                ccEmail: Yup.array().of(
                    Yup.string()
                ),
                subject: Yup.string(),
                mailBody: Yup.string(),
                // email: Yup.string()
                //     .email('Email is invalid')
                //     .required('Email is required')
            })
        )
    });
    const sequenceFormik = useFormik({
        initialValues: initialValuesFromLocal,
        // {
        //     sequenceName: '',
        //     stages: [
        //         {
        //             mergeField: "0",
        //             template: "0",
        //             followUp: 'Email',
        //             scheduledType: '1',
        //             scheduledTime: new Date().toTimeString().substring(0, 5),
        //             scheduledDate: new Date().toISOString().substring(0, 10),
        //             timeZone: 'EST',
        //             fromEmail: 'adityak@askconsulting.com',
        //             businessDays: '',
        //             totalBusinessDays: '0',
        //             ccEmail: [],
        //             subject: '',
        //             mailBody: ''
        //         }
        //     ]
        // },
        // enableReinitialize: true,
        validationSchema: stageValidationSchema,
        onSubmit: (values) => {
            // if (values.userName === "admin" && values.password === "12345678") {
            // } else {
            //     alert('Enter Valid Credentials.');
            // }
            alert('SUCCESS!! :-)\n\n' + JSON.stringify(values, null, 4));
        },
    });

    const getSequenceList = () => {

        if (sequenceType === 'candidate') {
            const endpoint = 'getSequenceById';
            loadUserData('admin', endpoint);
        } else if (sequenceType === 'contact') {
            let endpoint = 'getSequenceContactById'
            loadUserData('admin', endpoint);
        }
    };

    // const loadUserData = (serverId: any, endpoint: any) => {
    //     //http://35.155.202.216:8080/QADemoCurately/getSequenceContactById/3/2
    //     let tempUser = (SequenceId) ? SequenceId : "";
    //     trackPromise(
    //         ApiService.getById(serverId, endpoint, tempUser + '/' + userLocalData.getvalue('clientId')).then((response: any) => {
    //             // setTeamLeads(response.data);
    //             // console.log(response);
    //             if (response.data.Status === 200) {
    //                 // sequenceFormik.setFieldValue("sequenceName", response.data.SequenceName);
    //                 let newStage: any = [];
    //                 for (let ns = 0; ns < response.data.Stages.length; ns++) {
    //                     let tempData = response.data.Stages[ns];
    //                     newStage.push({
    //                         mergeField: "0",
    //                         template: !userLocalData.isChromeExtensionEnabled() ? "allTemplates" : "emailTemplates",
    //                         followUp: "Email",
    //                         stageID: tempData.StageID,
    //                         scheduledType: (tempData.ScheduledType) ? tempData.ScheduledType : (ns === 0) ? '1' : '2',
    //                         scheduledTime: (tempData.ScheduledDate) ? tempData.ScheduledDate.substring(11, 19) : "",
    //                         scheduledDate: (tempData.ScheduledDate) ? tempData.ScheduledDate.substring(0, 10) : "",
    //                         timeZone: (tempData.TimeZone) ? tempData.TimeZone.trim() : (ns === 0) ? "1" : "EST",
    //                         fromEmail: (tempData.FromAddress) ? { name: tempData.FromAddress, code: tempData.FromAddress } : { name: ``, code: '' },
    //                         businessDays: tempData.NumOfBusinessDays,
    //                         totalBusinessDays: "0",
    //                         ccEmail: (tempData.CCAddress) ? tempData.CCAddress.split(',') : [],
    //                         subject: tempData.Subject,
    //                         mailBody: tempData.Body
    //                     });
    //                     // if (ns === 0) {
    //                     //     setSubject(tempData.Subject);
    //                     // }

    //                 }
    //                 let dataToAppend = {
    //                     sequenceName: response.data.SequenceName,
    //                     stages: newStage
    //                 };
    //                 editSequenceData.current = JSON.parse(JSON.stringify(dataToAppend));
    //                 sequenceFormik.setValues({
    //                     ...dataToAppend
    //                 });
    //                 setPageLoad(true);
    //                 // sequenceFormik.setFieldValue("stages", newStage);
    //                 // setTimeout(() => {
    //                 //     calculateTotalBusinessDays('', '', 0);
    //                 // }, 500);
    //             }
    //         })
    //     );
    // }
    const loadUserData = (serverId: 'admin' | 214 | 2168095, endpoint: string) => {
        const clientId = userLocalData.getvalue('clientId');

        let tempUser = (SequenceId) ? SequenceId : "";
        trackPromise(
            ApiService.getById(serverId, endpoint, tempUser + '/' + clientId).then(response => {
                if (response.data.Status === 200) {
                    const stages = response.data.Stages.map((stage: any) => ({
                        mergeField: "0",
                        template: !userLocalData.isChromeExtensionEnabled() ? "allTemplates" : "emailTemplates",
                        followUp: "Email",
                        stageID: stage.StageID,
                        scheduledType: stage.ScheduledType ?? (stage === 0 ? '1' : '2'),
                        scheduledTime: stage.ScheduledDate?.substring(11, 19) ?? "",
                        scheduledDate: stage.ScheduledDate?.substring(0, 10) ?? "",
                        timeZone: stage.TimeZone?.trim() ?? (stage === 0 ? "1" : "EST"),
                        fromEmail: { name: stage.FromAddress ?? '', code: stage.FromAddress ?? '' },
                        businessDays: stage.NumOfBusinessDays,
                        totalBusinessDays: "0",
                        ccEmail: stage.CCAddress ? stage.CCAddress.split(',') : [],
                        subject: stage.Subject,
                        mailBody: stage.Body
                    }));

                    sequenceFormik.setValues({
                        sequenceName: response.data.SequenceName,
                        stages: stages
                    });
                    editSequenceData.current = JSON.parse(JSON.stringify({
                        sequenceName: response.data.SequenceName,
                        stages
                    }));
                    setPageLoad(true);
                } else {
                    console.error('Failed to load data:', response.data.Message);
                    showToaster('Failed to load campaign data', 'error');
                }
            }).catch(error => {
                console.error('API call failed:', error);
                showToaster('An error occurred while fetching campaign data', 'error');
            })
        );
    };

    // const [stagesList, setStagesList] = useState([
    //     temparoryStage
    // ]);
    const [activeStage, setActiveStage] = useState(0);
    // const [subject, setSubject] = useState("");


    // const [templateList, setTemplateList] = useState([]);

    const openStage = (val: number) => {
        setActiveStage(val);
        scrollTo(val);
    }
    const addStage = () => {
        // setStagesList([...stagesList, temparoryStage]);
        setActiveStage(sequenceFormik.values.stages.length);
        setTimeout(() => {
            scrollTo(sequenceFormik.values.stages.length);
        }, 250);
        // let totalDays = (sequenceFormik.values.stages.length * 2) + 1 + '';
        // for (let sv = 0; sv < sequenceFormik.values.stages.length; sv++) {
        //     totalDays = Number(totalDays) + Number(sequenceFormik.values.stages[sv].businessDays) + '';
        // }
        calculateTotalBusinessDays('add', '', 0);

    }
    const deleteStage = (i: number, stageId: number) => {
        // const removeArray = [...sequenceFormik.values.stages];

        // removeArray.splice(i, 1);

        // sequenceFormik.setFieldValue("stages", removeArray);
        // // setStagesList(removeArray);
        // setActiveStage(sequenceFormik.values.stages.length);
        // // scrollTo(sequenceFormik.values.stages.length);
        if (stageId) {
            trackPromise(
                ApiService.getById('admin', 'stageState', stageId + '/' + userLocalData.getvalue('clientId')).then((response: any) => {
                    // setTeamLeads(response.data);
                    // console.log(response);
                    if (response.data.Status === 200) {
                        if (response.data.Error) {
                            showToaster(response.data.Message, 'error');
                        }
                        if (response.data.Success) {
                            calculateTotalBusinessDays('remove', '', i);
                        }
                    } else {
                        showToaster(response.data.Message, 'error');
                    }
                })
            );
        } else {
            calculateTotalBusinessDays('remove', '', i);
        }



    }
    const scrollTo = (id: number | string) => {
        const scroll = document.getElementById('stageIdToView' + id);
        document.getElementById('stagesList')?.scrollTo({
            top: scroll?.offsetTop ? scroll?.offsetTop - 115 : 500,
            left: 0,
            behavior: 'smooth',
        });
        // window.scrollTo({
        //     top: scroll?.offsetTop ? scroll?.offsetTop + 100 : 100,
        //     left: 0,
        //     behavior: 'smooth',
        // });
    };
    // const updateReactQuill = (i: number) => {
    //     console.log(i);
    // }

    // const showFocus = (name: string, id: number) => {
    //     // showFocus('followUp', fe);
    //     // showFocus('scheduledType', fe);
    //     // showFocus('businessDays', fe);
    //     scrollTo(id);
    //     // const selector = `[id="${name + id}"]`;
    //     const selector = `[name="stages[${id}][${name}]"]`;

    //     const errorElement = document.getElementsByName(selector);
    //     (errorElement[0] as HTMLElement)?.focus();
    // }

    const onSubmit = () => {
        // display form field values on success
        // console.dir(sequenceFormik);


        // console.clear();

        // let formikErrors = sequenceFormik.errors;
        // let keys = Object.keys(formikErrors);
        // console.log(keys);

        // for (var prop in formikErrors) {
        // alert(formikErrors[prop]);
        // break;
        // }
        // if (formikErrors) {
        //     if (formikErrors.sequenceName) {
        //         showToaster(formikErrors.sequenceName, 'error');
        //         isValidForm = false;
        //         return;
        //     } else if (formikErrors.stages) {
        //         for (let fe = 0; fe < formikErrors.stages.length; fe++) {
        //             if (formikErrors.stages[fe] && (formikErrors.stages[fe] as Stage).followUp) {
        //                 showToaster((formikErrors.stages[fe] as Stage)['followUp'], 'error');
        //                 isValidForm = false;
        //                 showFocus('followUp', fe);
        //                 break;
        //             }
        //             if (formikErrors.stages[fe] && (formikErrors.stages[fe] as Stage).scheduledType) {
        //                 showToaster((formikErrors.stages[fe] as Stage)['scheduledType'], 'error');
        //                 isValidForm = false;
        //                 showFocus('scheduledType', fe);
        //                 break;
        //             }
        //             if (formikErrors.stages[fe] && (formikErrors.stages[fe] as Stage).businessDays) {
        //                 showToaster((formikErrors.stages[fe] as Stage)['businessDays'], 'error');
        //                 isValidForm = false;
        //                 showFocus('businessDays', fe);
        //                 break;
        //             }
        //         }
        //     }
        //     if (isValidForm) {
        //         continueSave();
        //     }

        //     // showToaster(sequenceFormik.errors[Object.keys(sequenceFormik.errors)[0]] + '', 'error');
        //     // console.log(keys[Object.keys(keys)[0]]);
        //     // showToaster((sequenceFormik.errors[Object.keys(sequenceFormik.errors)[0] as keyof typeof sequenceFormik.errors]), 'error')
        // }
        // console.log(sequenceFormik.values);
        let isValidForm = true;
        if (!sequenceFormik.values.sequenceName) {
            showToaster('Please enter Campaign Name', 'error');
            isValidForm = false;
            return;
        } else if (sequenceFormik.values.stages) {
            let tempStagesForValidation = sequenceFormik.values.stages;
            for (let fe = 0; fe < tempStagesForValidation.length; fe++) {
                if (tempStagesForValidation[fe]) {

                    if (!tempStagesForValidation[fe].scheduledType) {
                        showToaster('Please select Scheduled Type', 'error');
                        isValidForm = false;
                        scrollTo(fe);
                        break;
                    }
                    if (!tempStagesForValidation[fe].scheduledDate) {
                        showToaster('Please select Scheduled Date', 'error');
                        isValidForm = false;
                        scrollTo(fe);
                        break;
                    }
                    if (!tempStagesForValidation[fe].scheduledTime) {
                        showToaster('Please select Scheduled TIme', 'error');
                        isValidForm = false;
                        scrollTo(fe);
                        break;
                    }
                    if (!tempStagesForValidation[fe].fromEmail || !tempStagesForValidation[fe].fromEmail.code) {
                        showToaster('Please enter a From Email', 'error');
                        isValidForm = false;
                        scrollTo(fe);
                        break;
                    }
                    if (!validateEmail(tempStagesForValidation[fe].fromEmail.code)) {
                        showToaster('Please enter a Valid From Email', 'error');
                        isValidForm = false;
                        scrollTo(fe);
                        break;
                    }
                    // if (!tempStagesForValidation[fe].fromEmail) {
                    //     showToaster('Please select From Email', 'error');
                    //     isValidForm = false;
                    //     scrollTo(fe);
                    //     break;
                    // }
                    if (!tempStagesForValidation[fe].subject) {
                        showToaster('Please enter Subject', 'error');
                        isValidForm = false;
                        scrollTo(fe);
                        break;
                    }
                    if (tempStagesForValidation[fe].mailBody === "" || tempStagesForValidation[fe].mailBody === "<p></p>") {
                        showToaster('Please enter Email Body', 'error');
                        isValidForm = false;
                        scrollTo(fe);
                        break;
                    }
                }
            }
        }
        if (isValidForm) {
            continueSave();
        }

    }
    const continueSave = () => {

        let tempStages = [];
        for (let ts = 0; ts < sequenceFormik.values.stages.length; ts++) {
            // const element = sequenceFormik.values.stages[ts];
            tempStages.push({
                "stageNumber": ts + 1,
                "stageName": "",
                "stageID": (sequenceFormik.values.stages[ts].stageID) ? sequenceFormik.values.stages[ts].stageID : 0,
                "scheduledType": sequenceFormik.values.stages[ts].scheduledType,
                "scheduledDate": sequenceFormik.values.stages[ts].scheduledDate + " " + sequenceFormik.values.stages[ts].scheduledTime,
                "numOfBusinessDays": Number(sequenceFormik.values.stages[ts].businessDays),
                "timeZone": sequenceFormik.values.stages[ts].timeZone,
                "fromAddress": sequenceFormik.values.stages[ts].fromEmail.code,
                "ccAddress": sequenceFormik.values.stages[ts].ccEmail.join(),
                "bccAddress": "",
                "subject": sequenceFormik.values.stages[ts].subject,
                "body": sequenceFormik.values.stages[ts].mailBody,
                "recrId": userLocalData.getvalue('recrId')
            });

        }
        //         {
        //             "stageID": 2,
        //             "stageNumber": 2,
        //             "stageName": "neon1",
        //             "scheduledType": 2,
        //             "scheduledDate": 1,
        //             "numOfBusinessDays": 2,
        //             "timeZone": "EST",
        //             "fromAddress": "mailto:ask.ova1@gmail.com",
        //             "ccAddress": "cc2",
        //             "bccAddress": "bcc2",
        //             "subject": "Subject2",
        //             "body": "Body2"
        //         }
        // {
        //     "sequenceName": "neon",
        //     "sequenceId": 1,
        //     "recrId": 1893,
        //     "stages": [
        //     ]
        // }
        let tempData: any = {
            "sequenceName": sequenceFormik.values.sequenceName,
            "recrId": userLocalData.getvalue('recrId'),
            "isActive": true,
            "stages": tempStages,
            "clientId": userLocalData.getvalue('clientId')
        }
        if (SequenceId) {
            tempData.sequenceId = SequenceId;
            tempData.deletedIds = deletedStages.join();
        }

        if (SequenceId) {
            let tempEditSequenceDataStages = editSequenceData.current.stages;
            if (sequenceType === 'candidate') {
                trackPromise(
                    ApiService.postWithData('admin', 'updateSequence', tempData).then((response: any) => {
                        // setTeamLeads(response.data);
                        // console.log(response);
                        if (response.data.Status === 200) {
                            showToaster('The Campaign has been updated Successfully.', 'success');
                            let toCallEditAPI = false;
                            if (tempEditSequenceDataStages.length !== sequenceFormik.values.stages.length || deletedStages.length) {
                                toCallEditAPI = true;
                            } else {
                                for (let es = 0; es < tempEditSequenceDataStages.length; es++) {
                                    if (tempEditSequenceDataStages[es].businessDays !== sequenceFormik.values.stages[es].businessDays) {
                                        toCallEditAPI = true;
                                        break;
                                    }
                                }
                            }
                            if (toCallEditAPI) {
                                callEditApi();
                            } else {
                                navigate(`/${userLocalData.getvalue('clientName')}/letter/campaigns/${sequenceType}/list/`);
                            }
                        } else {
                            showToaster(response.data.Message, 'error');
                        }

                    })
                );
            }
            else if (sequenceType === 'contact') {

                trackPromise(
                    //http://35.155.202.216:8080/QADemoCurately/saveContactSequence
                    //http://35.155.202.216:8080/QADemoCurately/updateContactSequence
                    ApiService.postWithData('admin', 'updateContactSequence', tempData).then((response: any) => {
                        // setTeamLeads(response.data);
                        // console.log(response);
                        if (response.data.Status === 200) {
                            showToaster('The Campaign has been updated Successfully.', 'success');
                            let toCallEditAPI = false;
                            if (tempEditSequenceDataStages.length !== sequenceFormik.values.stages.length || deletedStages.length) {
                                toCallEditAPI = true;
                            } else {
                                for (let es = 0; es < tempEditSequenceDataStages.length; es++) {
                                    if (tempEditSequenceDataStages[es].businessDays !== sequenceFormik.values.stages[es].businessDays) {
                                        toCallEditAPI = true;
                                        break;
                                    }
                                }
                            }
                            if (toCallEditAPI) {
                                callEditApi();
                            } else {

                                navigate(`/${userLocalData.getvalue('clientName')}/letter/campaigns/${sequenceType}/list/`)
                            }
                        } else {
                            showToaster(response.data.Message, 'error');
                        }

                    })
                );
            }

        }
        else if (sequenceType === 'candidate') {
            trackPromise(
                ApiService.postWithData("admin", 'saveSequence', tempData).then((response: any) => {
                    // setTeamLeads(response.data);
                    // console.log(response);
                    if (response.data.Status === 200) {
                        showToaster('The Campaign has been saved Successfully.', 'success');

                        navigate(`/${userLocalData.getvalue('clientName')}/letter/campaigns/${sequenceType}/list/`)
                    } else {
                        showToaster(response.data.Message, 'error');
                    }

                })
            );
        }

        else if (sequenceType === 'contact') {
            trackPromise(
                ApiService.postWithData('admin', 'saveContactSequence', tempData).then((response: any) => {
                    // setTeamLeads(response.data);
                    // console.log(response);
                    if (response.data.Status === 200) {
                        showToaster('The Campaign has been saved Successfully.', 'success');

                        navigate(`/${userLocalData.getvalue('clientName')}/letter/campaigns/${sequenceType}/list/`)
                    } else {
                        showToaster(response.data.Message, 'error');
                    }

                })
            );
        }
    }
    const callEditApi = () => {

        // ApiService.getByParams(171, 'sequence_assign_candidates_update.jsp', {
        //     sequence_id: (SequenceId) ? +SequenceId : +'',
        //     recrid: userLocalData.getvalue('recrId')
        // }).then((response: any) => {
        //     // console.log(response);
        // });

        navigate(`/${userLocalData.getvalue('clientName')}/letter/campaigns/${sequenceType}/list/`)
    }

    const validateEmail = (email: string) => {
        // return email.match(
        //     /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        // );
        // eslint-disable-next-line no-useless-escape
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email)) {
            showToaster('Enter Valid Email', 'warning');
            return false
        }
        // return re.test(email);
        return true;
    };
    const calculateTotalBusinessDays = (add: string, val: string, index: number) => {
        setTimeout(() => {
            let totalDays = '0';
            let totalHours = 0;
            let totalMinutes = 0;

            let newStage = [
                ...sequenceFormik.values.stages
            ];
            if (add === 'remove') {
                // const removeArray = [...sequenceFormik.values.stages];
                if (sequenceFormik.values.stages[index].stageID) {
                    setDeletedStages([...deletedStages, sequenceFormik.values.stages[index].stageID]);
                }

                newStage.splice(index, 1);

                // sequenceFormik.setFieldValue("stages", removeArray);
                // setStagesList(removeArray);
                setActiveStage(sequenceFormik.values.stages.length);
            }
            if (add === 'timeZone') {
                newStage[index].timeZone = val;
                // sequenceFormik.setFieldValue("stages", newStage);
            }
            if (add === 'change') {
                newStage[index].businessDays = val;
                // sequenceFormik.setFieldValue("stages", newStage);
            }
            for (let sv = 0; sv < newStage.length; sv++) {
                if (!newStage[sv].businessDays) {
                    newStage[sv].businessDays = "";
                }
                if (sv === 0) {
                    let daysToAdd = 0;
                    if (newStage[sv].timeZone === "1") {
                        // daysToAdd = minutesToDays(Number(newStage[sv].businessDays || 0));
                        daysToAdd = minutesToDays(Number(newStage[sv].businessDays || 0));
                        totalMinutes = (Number(newStage[sv].businessDays || 0));
                    } else if (newStage[sv].timeZone === "2") {
                        // let hoursToDaysObj = hoursToDays(Number(newStage[sv].businessDays || 0));
                        let hoursToDaysObj = hoursToDays(Number(newStage[sv].businessDays || 0));
                        daysToAdd = hoursToDaysObj.Days;
                        totalHours = hoursToDaysObj.Hours;
                        totalMinutes = hoursToDaysObj.Minutes;
                    } else {
                        daysToAdd = Number(newStage[sv].businessDays || 0);
                    }

                    totalDays = Number(totalDays) + Number(daysToAdd || 0) + '';
                } else {
                    totalDays = Number(totalDays) + Number(newStage[sv].businessDays || 0) + '';
                }
                // <MenuItem value='1'>Minutes</MenuItem>
                // <MenuItem value='2'>Hours</MenuItem>
                // <MenuItem value='3'>Days</MenuItem>

                newStage[sv].totalBusinessDays = totalDays;
                // changing for testing from days to minutes
                newStage[sv].scheduledTime = DateTime.now().plus({ minutes: Number(totalMinutes), hours: Number(totalHours) }).toFormat('HH:mm')
                newStage[sv].scheduledDate = DateTime.now().plus({ days: Number(totalDays), hours: Number(totalHours) }).toFormat('yyyy-MM-dd')
                // scheduledDate: DateTime.now().toFormat('yyyy-MM-dd'),
            }

            if (add === 'add') {
                // totalDays = Number(totalDays) + (sequenceFormik.values.stages.length * 2) + 1 + '';
                totalDays = Number(totalDays) + 2 + '';
                newStage.push({
                    scheduledType: '2',
                    stageID: "",
                    template: !userLocalData.isChromeExtensionEnabled() ? "allTemplates" : "emailTemplates",
                    mergeField: "0",
                    followUp: 'Email',
                    // scheduledTime: new Date().toTimeString().substring(0, 5),
                    // scheduledDate: DateTime.now().plus({ days: Number(totalDays) }).toFormat('yyyy-MM-dd'),
                    // changing for testing from days to minutes
                    scheduledTime: DateTime.now().plus({ minutes: Number(totalMinutes), hours: Number(totalHours) }).toFormat('HH:mm'),
                    scheduledDate: DateTime.now().plus({ days: Number(totalDays), hours: Number(totalHours) }).toFormat('yyyy-MM-dd'),
                    timeZone: 'EST',
                    fromEmail: { name: ``, code: '' },
                    businessDays: '2',
                    // businessDays: '' + ((sequenceFormik.values.stages.length * 2) + 1),
                    totalBusinessDays: '' + totalDays,
                    ccEmail: [],
                    subject: "",
                    mailBody: ''
                });
                // sequenceFormik.setFieldValue("stages", newStage);
            } else {
                if (val) {
                    // setEditedBusinessDays(true);
                    if (add === 'timeZone') {
                        newStage[index].timeZone = val;
                    }
                    if (add === 'change') {
                        newStage[index].businessDays = val;
                    }
                }
            }
            sequenceFormik.setFieldValue("stages", newStage);
        }, 50);
    }
    function minutesToDays(mins: number) {
        let d = Math.floor(mins / 1440); // 60*24
        // let h = Math.floor((mins - (d * 1440)) / 60);
        // let m = Math.round(mins % 60);

        return d;

        // if (d > 0) {
        //     return (d + " days, " + h + " hours, " + m + " minutes");
        // } else {
        //     return (h + " hours, " + m + " minutes");
        // }
    }
    function hoursToDays(hours: number) {
        let Days = Math.floor(hours / 24);
        let Remainder = hours % 24;
        let Hours = Math.floor(Remainder);
        let Minutes = Math.floor(60 * (Remainder - Hours));
        return ({ "Days": Days, "Hours": Hours, "Minutes": Minutes })
    }
    const getTemplate = (i: number, templateId: string, type: 'emailBuilder' | 'emailTemplates') => {

        // let ed = quillRefs?.current[i]?.getEditor();
        // ed?.insertText(ed?.getSelection()?.index || 0, " <<" + text + ">> ");

        // https://codepen.io/alexkrolick/pen/gmroPj?editors=0010
        // insert star
        // http://52.40.49.193/Accuick/Email/getTemplateById.jsp?tmplid=148
        let tempUrl = (type === "emailTemplates") ? `getEmailTemplatesListById/${templateId}/${userLocalData.getvalue('clientId')}` : `getEmailBuilderTemplatesListById/${templateId}/${userLocalData.getvalue('clientId')}`;
        trackPromise(
            ApiService.getCall('admin', tempUrl).then((response: any) => {
                if (response.data.Success && response.data.list.length > 0) {
                    const template = response.data.list[0];
                    // setTeamLeads(response.data);
                    // console.log(response);
                    setFormFieldValue(i, (type === "emailTemplates") ? template.description || '' : template.htmlFile || "", template.subject || '', "");
                    // setTimeout(() => {
                    //     setFormFieldValue(i, '', template.subject || '', "");
                    // }, 300);
                }
                // let newStage = [
                //     ...sequenceFormik.values.stages
                // ];
                // newStage[i].mailBody = response.data.body;
                // newStage[i].subject = response.data.subject;
                // // if (i === 0) {
                // // loadSubject(response.data.subject);
                // // setSubject(response.data.subject);
                // // for (let ss = 1; ss < newStage.length; ss++) {
                // //     newStage[ss].subject = response.body.subject;
                // // }
                // // }
                // sequenceFormik.setFieldValue("stages", newStage);
            })
        );

    }

    // const mergeField = (i: number, text: string) => {
    //     // let ele = document.getElementById(`mailBody${i}`);
    //     // console.log(getCaretPosition(ele, `mailBody${i}`));
    //     // let caretPos = getCaretPosition(ele, `mailBody${i}`);
    //     // let textFromEditor = ele?.getElementsByClassName('ql-editor')[0].innerHTML;
    //     // let textWithMergeAdded = textFromEditor?.substring(0, caretPos) + ' <<' + text + '>> ' + textFromEditor?.substring(caretPos + 1);

    //     // console.log(textWithMergeAdded);
    //     // console.log(quillRefs.current[i]);

    //     let ed = quillRefs?.current[i]?.getEditor();
    //     ed?.insertText(ed?.getSelection()?.index || 0, " <<" + text + ">> ");

    //     let newStage = [
    //         ...sequenceFormik.values.stages
    //     ];
    //     newStage[i].mergeField = "0";
    //     sequenceFormik.setFieldValue("stages", newStage);

    //     // ed?.insertText(ed?.getSelection()?.index || 0, "★");

    //     // const cursorPosition = quillRefs?.current[i]?.getEditorSelection().index;
    //     // quillRefs?.current[i]?.insertText(cursorPosition, text);
    //     // quillRefs?.current[i]?.setSelection(cursorPosition + 1);
    // }
    const setFormFieldValue = (i: number, mailBody: string, subject: string, templateId: string) => {
        // console.log(i);
        // console.log(text);
        // let ele = document.getElementById(`mailBody${i}`);
        // console.log(ele?.getElementsByClassName('ql-editor')[0]);
        // let ed = quillRefs?.current[i]?.getEditor();
        // ed?.insertText(ed?.getSelection()?.index || 0, " <<" + text + ">> ");
        // setTimeout(() => {
        if (sequenceFormik.values.stages[i].mailBody !== mailBody) {
            let newStage = [
                ...sequenceFormik.values.stages
            ];
            if (subject) {
                newStage[i].subject = subject;
            }
            if (mailBody) {
                newStage[i].mailBody = mailBody;
            }
            if (templateId) {
                newStage[i].template = templateId;
            }
            // if (fromEmail) {
            //     newStage[i].fromEmail = { name: fromEmail, code: fromEmail };
            // }

            sequenceFormik.setFieldValue("stages", newStage);
            // console.log(text);
        }
        // }, 100);
    }


    const clearSubjectAndBody = (i: number) => {

        let newStage = [
            ...sequenceFormik.values.stages
        ];
        newStage[i].subject = "";
        newStage[i].mailBody = "";

        sequenceFormik.setFieldValue("stages", newStage);
    }


    const setFromEmailValue = (i: number, val: any, type: any, addOrRemove: string) => {
        if (val && ((type === "fromEmail" && validateEmail(val)) || (type === "ccEmail" && validateEmail(val[val.length - 1])))) {
            let newStage = [
                ...sequenceFormik.values.stages
            ];
            // console.log(val);
            if (((sequenceFormik.values.stages[i].fromEmail !== val) && type === "fromEmail") || ((sequenceFormik.values.stages[i].ccEmail !== val) && type === "ccEmail")) {
                if (type === "fromEmail") {
                    newStage[i].fromEmail = { name: val, code: val };
                }
                if (type === "ccEmail") {
                    if (addOrRemove === "add") {
                        newStage[i].ccEmail = val;
                    }
                    if (addOrRemove === "remove") {
                        let tempEMails = [...newStage[i].ccEmail];
                        tempEMails = tempEMails.filter(function (email) {
                            return email !== val;
                        });
                        newStage[i].ccEmail = tempEMails;
                    }
                }

                sequenceFormik.setFieldValue("stages", newStage);
                // console.log(text);
            }
        }
        // }, 100);
    }
    // const updateQuill = (i: number, el: ReactQuill | null) => {
    //     if (quillRefs.current[i] !== el) {
    //         quillRefs.current[i] = el;
    //     }
    // }
    // const loadSubject = (val: string) => {
    //     setSubject(val);
    //     let newStage = [
    //         ...sequenceFormik.values.stages
    //     ];
    //     for (let ss = 1; ss < newStage.length; ss++) {
    //         newStage[ss].subject = val;
    //     }
    //     sequenceFormik.setFieldValue("stages", newStage);

    // }


    const sendPreview = (i: number) => {
        if (sequenceFormik.values.stages[i].mailBody === "" || sequenceFormik.values.stages[i].mailBody === "<p></p>") {
            showToaster('Please Enter Body.', 'error');
        } else if (sequenceFormik.values.stages[i].subject === "") {
            showToaster('Please Enter Subject.', 'error');
            scrollTo(i);
        } else {
            setSendEmailDialogData(
                {
                    // subject: ((i !== 0) ? 'Re :' : '') + sequenceFormik.values.stages[i].subject,
                    subject: sequenceFormik.values.stages[i].subject,
                    emailBody: sequenceFormik.values.stages[i].mailBody
                },
                () => showToaster('Mail Sent Successfully', 'success')
            );

        }

    }
    // function getCaretPosition(editableDiv: ParentNode | null, id: string) {
    //     var caretPos = 0,
    //         sel, range;
    //     if (window.getSelection) {
    //         sel = window.getSelection();
    //         if (sel?.rangeCount) {
    //             range = sel?.getRangeAt(0);
    //             // console.log(range.commonAncestorContainer?.parentElement?.closest(".quill")?.getAttribute('id'));
    //             if (range.commonAncestorContainer?.parentElement?.closest(".quill")?.getAttribute('id') === id) {
    //                 caretPos = range.endOffset;
    //             }
    //         }
    //         // } else if (document.getSelection() && document.getSelection()?.createRange) {
    //         //     range = document.getSelection()?.createRange();
    //         //     if (range.parentElement() === editableDiv) {
    //         //         var tempEl = document.createElement("span");
    //         //         editableDiv.insertBefore(tempEl, editableDiv.firstChild);
    //         //         var tempRange = range.duplicate();
    //         //         tempRange.moveToElementText(tempEl);
    //         //         tempRange.setEndPoint("EndToEnd", range);
    //         //         caretPos = tempRange.text.length;
    //         //     }
    //     }
    //     return caretPos;
    // }

    // const insertStar = () => {
    // const cursorPosition = quill.getSelection().index;
    // quill.insertText(cursorPosition, "★");
    // quill.setSelection(cursorPosition + 1);
    // };




    return <>
        <div className='AddSequence'>
            {pageLoad ?
                <Formik
                    // onSubmit={() => sequenceFormik.handleChange}
                    onSubmit={onSubmit}
                    initialValues={sequenceFormik.initialValues}
                // enableReinitialize={true}
                >
                    {
                        // ({ errors, values, touched, setFieldValue, handleChange }) => (
                        ({ }) => (
                            <Form
                            // placeholder={<></>}
                            // onSubmit={sequenceFormik.handleSubmit}
                            >
                                <Grid
                                    container
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="stretch"
                                    className='mainDiv'
                                >
                                    <Grid className='header'>
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                        >
                                            <TextField
                                                id="sequenceName"
                                                variant="outlined"
                                                size="small"
                                                label='Campaign Name'
                                                onChange={sequenceFormik.handleChange}
                                                name="sequenceName"
                                                value={sequenceFormik.values.sequenceName}
                                            />
                                            <Grid className='d-flex'>
                                                <Button color="primary" variant="contained" type="submit" className='mr-2' size="small">
                                                    {(SequenceId) ? 'Update' : 'Save'}
                                                </Button>

                                                <Link to={`/${userLocalData.getvalue('clientName')}/letter/campaigns/${sequenceType}/list`} className="btn btn-primary ml-2 c-white underlineNone">
                                                    <Button variant="outlined" type="button" className='' size="small" color='secondary'>
                                                        Cancel
                                                    </Button>
                                                </Link>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid className='section'>
                                        <Grid container>
                                            <Grid size="auto" className='nav'>
                                                <div>
                                                    <ButtonGroup size="medium" aria-label="button group" orientation="vertical" className='buttonGroup'>
                                                        {
                                                            sequenceFormik.values.stages.map(
                                                                (stage, i) => (
                                                                    <Button
                                                                        variant="outlined"
                                                                        // className='custBtn'
                                                                        className={`${i === activeStage ? "active " : ""}`}
                                                                        startIcon={
                                                                            <span className='iconSpan'>
                                                                                <MailOutlineIcon className='mailIcon' />
                                                                            </span>
                                                                        }
                                                                        onClick={() => openStage(i)}
                                                                        key={`button${i}`}
                                                                    >
                                                                        <span className={`sideLine ${(i === 0) ? 'd-none' : ''}`}></span>
                                                                        <span className='textBtn'>Stage {i + 1}</span>
                                                                        {
                                                                            (i !== 0) ? <span className='deleteIcon' onClick={() => {
                                                                                confirmDialog(
                                                                                    (SequenceId) ? 'This Stage is already assigned. Are you sure you want to delete?' : 'Are you sure you want to delete?',
                                                                                    () =>
                                                                                        deleteStage(i, (SequenceId) ? Number(stage.stageID) : 0)
                                                                                );
                                                                            }}><DeleteOutlineIcon /></span> : null
                                                                        }
                                                                    </Button>
                                                                )
                                                            )
                                                        }
                                                        <Button
                                                            variant="outlined"
                                                            startIcon={
                                                                <AddIcon className='addIcon ml-2' />
                                                            }
                                                            onClick={() => addStage()}
                                                        >
                                                            Add Stage
                                                        </Button>
                                                    </ButtonGroup>
                                                    <span>
                                                        {
                                                            /* <Timeline
                                                            sx={{
                                                                [`& .${timelineItemClasses.root}:before`]: {
                                                                    flex: 0,
                                                                    padding: 0,
                                                                },
                                                            }}
                                                            className='timeline'>
                                                            {
                                                                stagesList.map(
                                                                    (stage, i) => (
                                                                        <TimelineItem className={`timeItem ${i === activeStage ? "active " : ""}`} onClick={() => openStage(i)}>
                                                                            <TimelineSeparator className='timeSeparator'>
                                                                                {
                                                                                    (i !== 0) ? <TimelineConnector className='timeConnector' />
                                                                                        : null
                                                                                }
                                                                                <TimelineDot className={`timeDot ${i === 0 ? "m17" : ""}`}>
                                                                                    <MailOutlineIcon />
                                                                                </TimelineDot>
                                                                                <TimelineConnector className='timeConnector' />
                                                                            </TimelineSeparator>
                                                                            <TimelineContent className='timeContent'>
                                                                                <div>
                                                                                    {stage.name} {i + 1}
                                                                                </div>
                                                                            </TimelineContent>
                                                                        </TimelineItem>
                                                                    )
                                                                )
                                                            }
                                                            </Timeline> */
                                                        }
                                                    </span>
                                                </div>
                                            </Grid>
                                            <Grid size="grow" className='stageContainer p-0'>
                                                <Grid className='article pr-0' id='stagesList'>
                                                    <FieldArray
                                                        name="stages"
                                                    // render={arrayHelpers => ()}
                                                    >
                                                        {({ }) => (
                                                            <div>
                                                                {
                                                                    sequenceFormik.values.stages.map(
                                                                        (stage: Stage, i: number) => {

                                                                            return (
                                                                                <div
                                                                                    className='stageBody bg-white p-5'
                                                                                    id={`stageIdToView${i}`}
                                                                                    key={`stageBody${i}`}
                                                                                >
                                                                                    <Grid
                                                                                        container
                                                                                        direction="column"
                                                                                        justifyContent="center"
                                                                                        alignItems="flex-start"
                                                                                    >
                                                                                        <Grid
                                                                                            container
                                                                                            direction="row"
                                                                                            justifyContent="space-between"
                                                                                            alignItems="center"
                                                                                            className='Stage_main'
                                                                                        >
                                                                                            <h3 className='mt-0 mb-0'>Stage {i + 1}</h3>
                                                                                            <Grid>

                                                                                                {/* <Autocomplete
                                                                                            disablePortal
                                                                                            size='small'
                                                                                            className='mr-4'
                                                                                            id={`template${i}`}
                                                                                            options={templateList}
                                                                                            sx={{ width: 200 }}
                                                                                            // name={`stages[${i}].template`}
                                                                                            defaultValue="0"
                                                                                            renderInput={(params) => <TextField {...params}
                                                                                            // label="Select Template"
                                                                                            />}
                                                                                        /> */}

                                                                                                {/* <TextField sx={{ width: '125px' }} size='small' className='mr-4'
                                                                                            id={`mergeField${i}`}
                                                                                            select
                                                                                            value={stage.mergeField}
                                                                                            onChange={
                                                                                                (e) => {
                                                                                                    mergeField(i, e.target.value);
                                                                                                }
                                                                                            }
                                                                                            name={`stages[${i}].mergeField`}
                                                                                            defaultValue="0"
                                                                                        >
                                                                                            <MenuItem value="0">Merge Fileds</MenuItem>
                                                                                            <MenuItem value="First name">First name</MenuItem>
                                                                                            <MenuItem value="Last name">Last name</MenuItem>
                                                                                            <MenuItem value="First name and Last name">First name and Last name</MenuItem>
                                                                                            <MenuItem value="Email">Email</MenuItem>
                                                                                        </TextField> */}
                                                                                                <Button
                                                                                                    color="primary"
                                                                                                    variant="contained"
                                                                                                    type="button"
                                                                                                    className='mr-2'
                                                                                                    size="small"
                                                                                                    onClick={
                                                                                                        () => sendPreview(i)
                                                                                                    }
                                                                                                >
                                                                                                    Send Preview
                                                                                                </Button>
                                                                                            </Grid>
                                                                                            {/* {
                                                                                        (i === 0) ?
                                                                                    } */}
                                                                                        </Grid>
                                                                                        <Grid
                                                                                            container
                                                                                            spacing={2}
                                                                                            direction="row"
                                                                                            justifyContent="flex-start"
                                                                                            alignItems="center"
                                                                                            className='m-0 w-auto'
                                                                                        >
                                                                                            {i !== 0 ?
                                                                                                <label className='pr-2'>Follow Up Via</label>
                                                                                                :
                                                                                                null
                                                                                            }
                                                                                            <TextField sx={{ width: '125px' }} size='small' className='mr-4'
                                                                                                id={`followUp${i}`}
                                                                                                select
                                                                                                value={stage.followUp}
                                                                                                onChange={sequenceFormik.handleChange}
                                                                                                name={`stages[${i}].followUp`}
                                                                                                fullWidth
                                                                                            >
                                                                                                <MenuItem value='Email'>
                                                                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                                                        <MailOutlineIcon className='mr-2' />
                                                                                                        <div>Email</div>
                                                                                                    </div>
                                                                                                    {/* <ListItemIcon>
                                                                                                <MailOutlineIcon />
                                                                                            </ListItemIcon>
                                                                                            <ListItemText primary="Email" /> */}
                                                                                                </MenuItem>
                                                                                                <MenuItem value='SMS' disabled={true}>
                                                                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                                                        <TextsmsOutlinedIcon className='mr-2' />
                                                                                                        <div>SMS</div>
                                                                                                    </div>
                                                                                                </MenuItem>
                                                                                            </TextField>

                                                                                            {i === 0 ?
                                                                                                null
                                                                                                :
                                                                                                <>
                                                                                                    <label className='pr-2'>in</label>
                                                                                                    <TextField sx={{ width: '75px' }} variant="outlined" size="small" className='mailInputs mr-4'
                                                                                                        id={`businessDays${i}`}
                                                                                                        aria-describedby="outlined-weight-helper-text"
                                                                                                        onChange={
                                                                                                            (e) => {
                                                                                                                sequenceFormik.handleChange(e);
                                                                                                                calculateTotalBusinessDays('change', e.currentTarget.value, i);
                                                                                                            }
                                                                                                        }
                                                                                                        name={`stages[${i}].businessDays`}
                                                                                                        type="number"

                                                                                                        value={stage.businessDays}
                                                                                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                                                                                    />
                                                                                                    {/* <FormControl sx={{ width: '80px' }} variant="outlined" size="small" className='mailInputs'>
                                                                                                <OutlinedInput
                                                                                                    id={`businessDays${i}`}
                                                                                                    aria-describedby="outlined-weight-helper-text"
                                                                                                    onChange={sequenceFormik.handleChange}
                                                                                                    name={`stages[${i}].businessDays`}
                                                                                                    type="number"
                                                                                                    value={stage.businessDays}
                                                                                                />
                                                                                            </FormControl> */}
                                                                                                    <label className='pl-1'>Days</label>
                                                                                                    <label className='pl-2'>
                                                                                                        {
                                                                                                            // for (let index = 0; index < array.length; index++) {
                                                                                                            //     const element = array[index];

                                                                                                            // }
                                                                                                            (
                                                                                                                i > 0 && (stage.totalBusinessDays)
                                                                                                            )
                                                                                                                ?
                                                                                                                DateTime.now().plus({ days: Number(stage.totalBusinessDays) }).toFormat('LLL dd yyyy')
                                                                                                                // changing for testing from days to minutes
                                                                                                                // DateTime.now().plus({ days: Number(stage.totalBusinessDays) }).toFormat('LLL dd yyyy')
                                                                                                                :
                                                                                                                null
                                                                                                        }
                                                                                                    </label>

                                                                                                </>
                                                                                            }

                                                                                            {i !== 0 ?
                                                                                                null
                                                                                                :
                                                                                                <>
                                                                                                    <label className='pl-3 pr-2'>Wait for</label>
                                                                                                    <TextField sx={{ width: '75px' }} variant="outlined" size="small" className='mailInputs mr-4'
                                                                                                        id={`businessDays${i}`}
                                                                                                        aria-describedby="outlined-weight-helper-text"
                                                                                                        onChange={
                                                                                                            (e) => {
                                                                                                                sequenceFormik.handleChange(e);
                                                                                                                calculateTotalBusinessDays('change', e.currentTarget.value, i);
                                                                                                            }
                                                                                                        }
                                                                                                        name={`stages[${i}].businessDays`}
                                                                                                        type="number"

                                                                                                        value={stage.businessDays}
                                                                                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                                                                                    />
                                                                                                    <TextField sx={{ width: '100px' }} size='small' className='mr-4'
                                                                                                        id={`timeZone${i}`}
                                                                                                        select
                                                                                                        value={stage.timeZone}
                                                                                                        onChange={
                                                                                                            (e) => {
                                                                                                                sequenceFormik.handleChange(e);
                                                                                                                calculateTotalBusinessDays('timeZone', e.target.value, i);
                                                                                                            }
                                                                                                        }
                                                                                                        name={`stages[${i}].timeZone`}
                                                                                                        defaultValue="1"
                                                                                                    >
                                                                                                        <MenuItem value='1'>Minutes</MenuItem>
                                                                                                        <MenuItem value='2'>Hours</MenuItem>
                                                                                                        <MenuItem value='3'>Days</MenuItem>
                                                                                                    </TextField>

                                                                                                    {/* <TextField sx={{ width: '135px' }} size='small' className='mr-4'
                                                                                                        id={`scheduledType${i}`}
                                                                                                        select
                                                                                                        value={stage.scheduledType}
                                                                                                        onChange={sequenceFormik.handleChange}
                                                                                                        name={`stages[${i}].scheduledType`}
                                                                                                        defaultValue="1"
                                                                                                    >
                                                                                                        <MenuItem value='1'>Now</MenuItem>
                                                                                                        <MenuItem value='2'>Date and Time</MenuItem>
                                                                                                    </TextField> */}
                                                                                                </>
                                                                                            }
                                                                                            {
                                                                                                ((stage.scheduledType && stage.scheduledType === "2") || i !== 0) ?
                                                                                                    <>
                                                                                                        <label className='pl-2 pr-2'>At</label>
                                                                                                        <TextField
                                                                                                            type="time"
                                                                                                            InputLabelProps={{
                                                                                                                shrink: true,
                                                                                                            }}
                                                                                                            inputProps={{
                                                                                                                step: 300, // 5 min
                                                                                                            }}
                                                                                                            sx={{ width: 120 }}
                                                                                                            size='small' className='mr-4'
                                                                                                            id={`scheduledTime${i}`}
                                                                                                            value={stage.scheduledTime}
                                                                                                            onChange={sequenceFormik.handleChange}
                                                                                                            name={`stages[${i}].scheduledTime`}
                                                                                                        />
                                                                                                        <TextField sx={{ width: '90px' }} size='small' className='mr-4'
                                                                                                            id={`timeZone${i}`}
                                                                                                            select
                                                                                                            value={stage.timeZone}
                                                                                                            onChange={sequenceFormik.handleChange}
                                                                                                            name={`stages[${i}].timeZone`}
                                                                                                        >
                                                                                                            <MenuItem value='EST'>EST</MenuItem>
                                                                                                            <MenuItem value='CST'>CST</MenuItem>
                                                                                                            <MenuItem value='MST'>MST</MenuItem>
                                                                                                            <MenuItem value='PST'>PST</MenuItem>
                                                                                                        </TextField>
                                                                                                    </>
                                                                                                    : null
                                                                                            }{
                                                                                                ((stage.scheduledType && stage.scheduledType === "2") && i === 0) ?
                                                                                                    <>
                                                                                                        <label className='pr-2'>on</label>
                                                                                                        <TextField
                                                                                                            id={`scheduledDate${i}`}
                                                                                                            type="date"
                                                                                                            sx={{ width: 140 }}
                                                                                                            size='small'
                                                                                                            className='mr-3'
                                                                                                            onChange={sequenceFormik.handleChange}
                                                                                                            name={`stages[${i}].scheduledDate`}
                                                                                                            value={stage.scheduledDate}
                                                                                                        />
                                                                                                    </>
                                                                                                    : null
                                                                                            }
                                                                                        </Grid>

                                                                                        <Grid
                                                                                            container
                                                                                            direction="column"
                                                                                            justifyContent="flex-start"
                                                                                            alignItems="stretch"
                                                                                            className='m-0 pt-4'
                                                                                            size={12}
                                                                                        >
                                                                                            {/* <MUIAutoComplete
                                                                                                id={`fromEmail${i}`}
                                                                                                handleChange={(e: any, addOrRemove: string) => {
                                                                                                    setFromEmailValue(i, e, 'fromEmail', addOrRemove);
                                                                                                }}
                                                                                                // emailValue={"fromEmail"}
                                                                                                emailValue={stage.fromEmail.code}
                                                                                                isMultiple={false}
                                                                                                textToShow="From"
                                                                                            /> */}

                                                                                            <EmailAutoComplete
                                                                                                id={`fromEmail${i}`}
                                                                                                handleChange={(e: any, addOrRemove: string) => {
                                                                                                    setFromEmailValue(i, e, 'fromEmail', addOrRemove);
                                                                                                }}
                                                                                                // emailValue={"fromEmail"}
                                                                                                emailValue={stage.fromEmail.code}
                                                                                                isMultiple={false}
                                                                                                textToShow="From"
                                                                                            />
                                                                                            {/* <TextField
                                                                                            id={`fromEmail${i}`}
                                                                                            type="email"
                                                                                            value={stage.fromEmail}
                                                                                            onChange={sequenceFormik.handleChange}
                                                                                            InputProps={{
                                                                                                startAdornment: <InputAdornment position="start">From</InputAdornment>
                                                                                            }}
                                                                                            name={`stages[${i}].fromEmail`}
                                                                                            fullWidth
                                                                                            className='fromInput mailInputs'
                                                                                            size='small'
                                                                                        /> */}


                                                                                            {/* <MUIAutoComplete
                                                                                                id={`ccEmail${i}`}
                                                                                                handleChange={(e: any, addOrRemove: string) => {
                                                                                                    setFromEmailValue(i, e, 'ccEmail', addOrRemove);
                                                                                                }}
                                                                                                // emailValue={"ccEmail"}
                                                                                                emailValue={stage.ccEmail}
                                                                                                isMultiple={true}
                                                                                                textToShow="Cc"
                                                                                            /> */}
                                                                                            {/* <EmailAutoComplete
                                                                                                id={`ccEmail${i}`}
                                                                                                handleChange={(e: any, addOrRemove: string) => {
                                                                                                    setFromEmailValue(i, e, 'ccEmail', addOrRemove);
                                                                                                }}
                                                                                                emailValue={stage.ccEmail}
                                                                                                isMultiple={true}
                                                                                                textToShow="Cc"
                                                                                            /> */}
                                                                                            <Grid
                                                                                                container
                                                                                                direction="row"
                                                                                                justifyContent="flex-start"
                                                                                                alignItems="center"
                                                                                            >
                                                                                                {/* <div className='ccText'>Cc</div>
                                                                                            <Chips
                                                                                                value={stage.ccEmail}
                                                                                                onChange={sequenceFormik.handleChange}
                                                                                                name={`stages[${i}].ccEmail`}
                                                                                                id={`ccEmail${i}`}
                                                                                                className='mailInputs ccInput'
                                                                                                allowDuplicate={false}
                                                                                                // keyfilter={emailRegex}
                                                                                                addOnBlur={true}
                                                                                                onAdd={(e) => validateEmail(e.value)}
                                                                                            /> */}
                                                                                                {/* <Autocomplete
                                                                                            freeSolo
                                                                                            id={`cc${i}`}
                                                                                            // disableClearable
                                                                                            options={[]}
                                                                                            multiple
                                                                                            className='mailInputs ccInput'
                                                                                            value={stage.ccEmail}
                                                                                            onChange={
                                                                                                
                                                                                                (event, value: any) => {
                                                                                                    // setFieldValue(sequenceFormik.values.stages[i].ccEmail, value !== null ? value : stage.ccEmail)
                                                                                                    // stage.ccEmail = value;
                                                                                                    sequenceFormik.values.stages[i].ccEmail =  value;
                                                                                                }
                                                                                            }
                                                                                            renderTags={(value: readonly string[], getTagProps: AutocompleteRenderGetTagProps) =>
                                                                                                value.map((option: string, index: number) => (
                                                                                                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                                                                                ))
                                                                                            }
                                                                                            renderInput={(params) => (
                                                                                                <TextField
                                                                                                    {...params}
                                                                                                    // label="Search input"
                                                                                                    InputProps={{
                                                                                                        ...params.InputProps,
                                                                                                        type: 'search',
                                                                                                    }}
                                                                                                />
                                                                                            )}
                                                                                        /> */}
                                                                                            </Grid>
                                                                                            {/* {i === 0 ? */}

                                                                                            {/* <TextField
                                                                                                size='small'
                                                                                                id={`template${i}`}
                                                                                                select
                                                                                                value={stage.template}
                                                                                                onChange={
                                                                                                    (e) => {
                                                                                                        getTemplate(i, e.target.value);
                                                                                                        // sequenceFormik.handleChange(e);
                                                                                                    }
                                                                                                }
                                                                                                name={`stages[${i}].template`}
                                                                                                fullWidth
                                                                                                className='mailInputs'
                                                                                                defaultValue="0"
                                                                                                InputProps={{
                                                                                                    startAdornment: <InputAdornment position="start">Template</InputAdornment>
                                                                                                }}
                                                                                            >
                                                                                                <MenuItem value="0"></MenuItem>
                                                                                                {templateList.map(
                                                                                                    (template: any, i: number) => {
                                                                                                        return <MenuItem value={template.id} key={template.id}>{template.label}</MenuItem>
                                                                                                    }
                                                                                                )}
                                                                                            </TextField> */}
                                                                                            {/* <TextField
                                                                                        id={`scheduledDate${i}`}
                                                                                        type="date"
                                                                                        sx={{ width: 140 }}
                                                                                        size='small'
                                                                                        className='mr-3'
                                                                                        onChange={sequenceFormik.handleChange}
                                                                                        name={`stages[${i}].scheduledDate`}
                                                                                        value={stage.scheduledDate}
                                                                                    /> */}
                                                                                            <Grid
                                                                                                container
                                                                                                direction="row"
                                                                                                justifyContent="flex-start"
                                                                                                alignItems="center"
                                                                                            >
                                                                                                <Grid size={4}>
                                                                                                    <TextField
                                                                                                        size="small"
                                                                                                        id={`template${i}`}
                                                                                                        select
                                                                                                        value={stage.template}
                                                                                                        onChange={e => {
                                                                                                            // console.log(e)
                                                                                                            sequenceFormik.handleChange(e);
                                                                                                        }}
                                                                                                        name={`stages[${i}].template`}
                                                                                                        fullWidth
                                                                                                        className="mailInputs"
                                                                                                        defaultValue="0"
                                                                                                        InputProps={{
                                                                                                            startAdornment: (
                                                                                                                <InputAdornment position="start">
                                                                                                                    Template
                                                                                                                </InputAdornment>
                                                                                                            ),
                                                                                                        }}
                                                                                                    >
                                                                                                        {
                                                                                                            !userLocalData.isChromeExtensionEnabled() &&
                                                                                                            <MenuItem value="allTemplates">
                                                                                                                <GridViewIcon
                                                                                                                    fontSize="small"
                                                                                                                    style={{ marginRight: 8 }}
                                                                                                                />
                                                                                                                All Templates
                                                                                                            </MenuItem>
                                                                                                        }
                                                                                                        {
                                                                                                            !userLocalData.isChromeExtensionEnabled() &&
                                                                                                            <MenuItem value="emailBuilder">
                                                                                                                <CodeIcon
                                                                                                                    fontSize="small"
                                                                                                                    style={{ marginRight: 8 }}
                                                                                                                />
                                                                                                                HTML Template
                                                                                                            </MenuItem>
                                                                                                        }
                                                                                                        <MenuItem value="emailTemplates">
                                                                                                            <NotesIcon
                                                                                                                fontSize="small"
                                                                                                                style={{ marginRight: 8 }}
                                                                                                            />
                                                                                                            Text Template
                                                                                                        </MenuItem>

                                                                                                        {/* {templateList.map(
                                                                                                    (template: any, i: number) => {
                                                                                                        return <MenuItem value={template.id} key={template.id}>{template.label}</MenuItem>
                                                                                                    }
                                                                                                )} */}
                                                                                                    </TextField>
                                                                                                </Grid>

                                                                                                {/* <TextField
                                                                                                    id={`scheduledDate${i}`}
                                                                                                    type="date"
                                                                                                    sx={{ width: 140 }}
                                                                                                    size='small'
                                                                                                    className='mr-3'
                                                                                                    onChange={sequenceFormik.handleChange}
                                                                                                    name={`stages[${i}].scheduledDate`}
                                                                                                    value={stage.scheduledDate}
                                                                                                /> */}
                                                                                                <Grid size={8} className='all_email_templates'>
                                                                                                    {
                                                                                                        (stage.template === "allTemplates") ?
                                                                                                            <MUIAutoComplete
                                                                                                                id='AllEmailTemplates'
                                                                                                                handleChange={(id: any, name: string, type: "EmailBuilderTemplate" | "EmailTemplates") => {
                                                                                                                    // console.log(id, name)
                                                                                                                    if (id) {
                                                                                                                        getTemplate(i, id, (type === "EmailBuilderTemplate") ? 'emailBuilder' : 'emailTemplates');
                                                                                                                    } else {
                                                                                                                        clearSubjectAndBody(i);
                                                                                                                    }
                                                                                                                    // emailFormik.setFieldValue('templateName', name);
                                                                                                                    // emailFormik.setFieldValue('templateType', 'emailBuilder')

                                                                                                                }}
                                                                                                                valuePassed={''}
                                                                                                                isMultiple={false}
                                                                                                                textToShow="Search All Email Templates"
                                                                                                                placeholder=""
                                                                                                                width="100%"
                                                                                                                type='AllEmailTemplates'
                                                                                                            />
                                                                                                            :
                                                                                                            (stage.template === "emailBuilder") ?
                                                                                                                <MUIAutoComplete
                                                                                                                    id='AllEmailTemplates'
                                                                                                                    handleChange={(id: any, name: string) => {
                                                                                                                        // console.log(id, name);
                                                                                                                        if (id) {
                                                                                                                            getTemplate(i, id, 'emailBuilder');
                                                                                                                        } else {
                                                                                                                            clearSubjectAndBody(i);
                                                                                                                        }

                                                                                                                    }}
                                                                                                                    valuePassed={''}
                                                                                                                    isMultiple={false}
                                                                                                                    textToShow="Search HTML Template"
                                                                                                                    placeholder=""
                                                                                                                    width="100%"
                                                                                                                    type='EmailBuilderTemplate'
                                                                                                                />
                                                                                                                :
                                                                                                                (stage.template === "emailTemplates") ?
                                                                                                                    <MUIAutoComplete
                                                                                                                        id='AllEmailTemplates'
                                                                                                                        handleChange={(id: any, name: string) => {
                                                                                                                            // console.log(id, name);
                                                                                                                            if (id) {
                                                                                                                                getTemplate(i, id, 'emailTemplates');
                                                                                                                            } else {
                                                                                                                                clearSubjectAndBody(i);
                                                                                                                            }

                                                                                                                        }}
                                                                                                                        valuePassed={''}
                                                                                                                        isMultiple={false}
                                                                                                                        textToShow="Search Text Template"
                                                                                                                        placeholder=""
                                                                                                                        width="100%"
                                                                                                                        type='EmailTemplate'
                                                                                                                    />
                                                                                                                    :
                                                                                                                    null
                                                                                                    }


                                                                                                </Grid>
                                                                                            </Grid>
                                                                                            <TextField
                                                                                                id={`subject${i}`}
                                                                                                name={`stages[${i}].subject`}
                                                                                                placeholder="Type a subject for your email"
                                                                                                variant="outlined"
                                                                                                size='small'
                                                                                                InputProps={{
                                                                                                    startAdornment: <InputAdornment position="start">Subject</InputAdornment>
                                                                                                }}
                                                                                                value={stage.subject}
                                                                                                onChange={sequenceFormik.handleChange}
                                                                                            // error={(!emailFormik.values.subject && isFormSubmitted) ? true : false}
                                                                                            />
                                                                                            {/* <FormControl fullWidth variant="outlined" size="small" className='mailInputs'>
                                                                                             <OutlinedInput 
                                                                                            //         id={`subject${i}`}
                                                                                            //         // placeholder='Subject'
                                                                                            //         onChange={
                                                                                            //             (e) => {
                                                                                            //                 loadSubject(e.target.value);
                                                                                            //                 sequenceFormik.handleChange(e)
                                                                                            //             }
                                                                                            //         }
                                                                                            //         name={`stages[${i}].subject`}
                                                                                            //         value={stage.subject}
                                                                                            //     />
                                                                                            // </FormControl>
                                                                                            // :
                                                                                            // <FormControl fullWidth variant="outlined" size="small" className='mailInputs'>
                                                                                            //     <OutlinedInput
                                                                                            //         id={`subject${i}`}
                                                                                            //         startAdornment={<InputAdornment position="start">Re: </InputAdornment>}
                                                                                            //         // onChange={sequenceFormik.handleChange}
                                                                                            //         name={`stages[${i}].subject`}
                                                                                            //         disabled={true}
                                                                                            //         // readOnly={true}
                                                                                            //         value={stage.subject}
                                                                                            //     />
                                                                                            // </FormControl>
                                                                                            // }
                                                                                    */}
                                                                                            {/* <CustomToolbar /> */}
                                                                                            <Editor
                                                                                                toolbarId={`toolbarId${i}`}
                                                                                                id={`text_editor${i}`}
                                                                                                handleChange={(e: any) => {
                                                                                                    setFormFieldValue(i, e, '', '');
                                                                                                }}
                                                                                                editorHtml={stage.mailBody}
                                                                                                mentions={true}
                                                                                                saveTemplate={true}
                                                                                                subject={stage.subject}
                                                                                            />
                                                                                            {/* <ReactQuill
                                                                                        theme="snow"
                                                                                        modules={modules}
                                                                                        // formats={formats}
                                                                                        value={stage.mailBody}
                                                                                        id={`mailBody${i}`}
                                                                                        onChange={(e) => {
                                                                                            setFormFieldValue(i, e)
                                                                                        }}
                                                                                        ref={el => (quillRefs.current[i] = el)}
                                                                                    /> */}
                                                                                            {/* <ReactQuill
                                                                                        theme="snow"
                                                                                        onChange={sequenceFormik.handleChange}
                                                                                    />
                                                                                    <Editor
                                                                                        theme="snow"
                                                                                        onChange={sequenceFormik.handleChange}
                                                                                        value={stage.mailBody}
                                                                                        onTextChange={
                                                                                            (e) => {
                                                                                                setFormFieldValue(i, e.htmlValue)
                                                                                            }
                                                                                        }
                                                                                    ></Editor> */}
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                </div>
                                                                            )
                                                                        }
                                                                    )
                                                                }
                                                            </div>
                                                        )}
                                                    </FieldArray>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    {/* <Grid
                                        className='footer'
                                        container
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        <Button color="primary" variant="contained" type="submit" className='mr-2' size="small">
                                            {(SequenceId) ? 'Update' : 'Save'}
                                        </Button>
                                        <Link to={`/${userLocalData.getvalue('clientName')}/letter/sequence/list`} className="btn btn-primary ml-2 c-white underlineNone">
                                            <Button color="secondary" variant="outlined" type="button" className='' size="small">
                                                Cancel
                                            </Button>
                                        </Link>
                                    </Grid> */}
                                </Grid>
                            </Form>
                        )}
                </Formik >
                :
                null
            }
        </div>
        {/* <ConfirmDialog /> */}
        <SendEmailDialog />
    </>;
}

export default AddSequence;

function handleSendEmail() {
    throw new Error('Function not implemented.');
}
