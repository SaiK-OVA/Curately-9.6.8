import { useEffect, useState } from '../../../../../shared/modules/React';


// import InputLabel from '@mui/material/InputLabel';

import { Link, useParams, useNavigate } from 'react-router-dom';

// import Select from '@mui/material/Select';
import {MenuItem} from '../../../../../shared/modules/MaterialImports/Menu';


// import Timeline from '@mui/lab/Timeline';
// import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
// import TimelineSeparator from '@mui/lab/TimelineSeparator';
// import TimelineConnector from '@mui/lab/TimelineConnector';
// import TimelineContent from '@mui/lab/TimelineContent';
// import TimelineDot from '@mui/lab/TimelineDot';

// import ReactQuill from 'react-quill';

import {ButtonGroup} from '../../../../../shared/modules/MaterialImports/ButtonGroup';

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';

import './EditSequence.scss';
import { Button, Grid, showToaster, TextField, InputAdornment} from '../../../../../shared/modules/commonImports';
// import Autocomplete, { AutocompleteRenderGetTagProps } from '@mui/material/Autocomplete';
// import Chip from '@mui/material/Chip';
import { Chips } from 'primereact/chips';
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
// import { TemplateResponse } from '../../../shared/interface/common';

import Editor from './../EmailBody/EmailBody'
import { confirmDialog } from '../../../../shared/ConfirmDialog/ConfirmDialog';
import { userLocalData } from '../../../../../shared/services/userData';


const EditSequence = () => {

    const { SequenceId } = useParams();
    const { sequenceType } = useParams();
    // const quillRefs = useRef<ReactQuill[] | null[]>([]);
    const navigate = useNavigate();
    const [deletedStages, setDeletedStages] = useState<string[]>([]);

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
        fromEmail: string;
        ccEmail: string[];
        subject: string;
        mailBody: string;
    }
    // const temporaryStage: Stage = {
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
                template: "0",
                followUp: 'Email',
                scheduledType: '1',
                stageID: '',
                scheduledTime: new Date().toTimeString().substring(0, 5),
                scheduledDate: new Date().toISOString().substring(0, 10),
                timeZone: 'EST',
                fromEmail: 'adityak@askconsulting.com',
                businessDays: '',
                totalBusinessDays: '0',
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

        trackPromise(
            ApiService.getCall(171, 'getTemplatesList.jsp').then((response: any) => {

                // console.log(response.data);
                setTemplateList(response.data);
                if (SequenceId) {
                    loadUserData();
                }
            })
        );
        // if (!tempLocal && !initialValuesFromLocal && !initialValuesFromLocal) {
        //     showToaster('An error occurred. Please try again.', 'error')
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
    const loadUserData = () => {
        let tempUser = (SequenceId) ? SequenceId : "";
        trackPromise(
            ApiService.getById(171, 'getSequenceById', +tempUser).then((response: any) => {
                // setTeamLeads(response.data);
                // console.log(response);
                if (response.data.Status === 200) {
                    // sequenceFormik.setFieldValue("sequenceName", response.data.SequenceName);
                    let newStage: any = [];
                    for (let ns = 0; ns < response.data.Stages.length; ns++) {
                        let tempData = response.data.Stages[ns];
                        newStage.push({
                            mergeField: "0",
                            template: "0",
                            followUp: "Email",
                            stageID: tempData.StageID,
                            scheduledType: (tempData.ScheduledType) ? tempData.ScheduledType : (ns === 0) ? '1' : '2',
                            scheduledTime: (tempData.ScheduledDate) ? tempData.ScheduledDate.substring(11, 19) : "",
                            scheduledDate: (tempData.ScheduledDate) ? tempData.ScheduledDate.substring(0, 10) : "",
                            timeZone: tempData.TimeZone,
                            fromEmail: tempData.FromAddress,
                            businessDays: tempData.NumOfBusinessDays,
                            totalBusinessDays: "0",
                            ccEmail: (tempData.CCAddress) ? tempData.CCAddress.split(',') : [],
                            subject: tempData.Subject,
                            mailBody: tempData.Body
                        });
                        // if (ns === 0) {
                        //     setSubject(tempData.Subject);
                        // }

                    }
                    sequenceFormik.setValues({
                        sequenceName: response.data.SequenceName,
                        stages: newStage
                    })
                    // sequenceFormik.setFieldValue("stages", newStage);
                    // setTimeout(() => {
                    //     calculateTotalBusinessDays('', '', 0);
                    // }, 500);
                }
            })
        );
    }

    // const [stagesList, setStagesList] = useState([
    //     temporaryStage
    // ]);
    const [activeStage, setActiveStage] = useState(0);
    // const [subject, setSubject] = useState("");


    const [templateList, setTemplateList] = useState([]);

    const openStage = (val: number) => {
        setActiveStage(val);
        scrollTo(val);
    }
    const addStage = () => {
        // setStagesList([...stagesList, temporaryStage]);
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
    const deleteStage = (i: number) => {
        // const removeArray = [...sequenceFormik.values.stages];

        // removeArray.splice(i, 1);

        // sequenceFormik.setFieldValue("stages", removeArray);
        // // setStagesList(removeArray);
        // setActiveStage(sequenceFormik.values.stages.length);
        // // scrollTo(sequenceFormik.values.stages.length);

        calculateTotalBusinessDays('remove', '', i);


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
        // console.log(sequenceFormik.values);
        console.dir(sequenceFormik);

        // console.clear();

        // let formikErrors = sequenceFormik.errors;
        // let keys = Object.keys(formikErrors);
        // console.log(keys);

        // for (var prop in formikErrors) {
        // alert(formikErrors[prop]);
        // break;
        // }
        let isValidForm = true;
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
        if (!sequenceFormik.values.sequenceName) {
            showToaster('Please enter Campaign Name', 'error');
            isValidForm = false;
            return;
        } else if (sequenceFormik.values.stages) {
            let tempStagesForValidation = sequenceFormik.values.stages;
            for (let fe = 0; fe < tempStagesForValidation.length; fe++) {
                if (tempStagesForValidation[fe]) {
                    if (!validateEmail(tempStagesForValidation[fe].fromEmail)) {
                        showToaster('Please enter a Valid From Email', 'error');
                        isValidForm = false;
                        scrollTo(fe);
                        break;
                    }
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
                    if (!tempStagesForValidation[fe].fromEmail) {
                        showToaster('Please select From Email', 'error');
                        isValidForm = false;
                        scrollTo(fe);
                        break;
                    }
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
                "stageID": sequenceFormik.values.stages[ts].stageID,
                "scheduledType": sequenceFormik.values.stages[ts].scheduledType,
                "scheduledDate": sequenceFormik.values.stages[ts].scheduledDate + " " + sequenceFormik.values.stages[ts].scheduledTime,
                "numOfBusinessDays": Number(sequenceFormik.values.stages[ts].businessDays),
                "timeZone": sequenceFormik.values.stages[ts].timeZone,
                "fromAddress": sequenceFormik.values.stages[ts].fromEmail,
                "ccAddress": sequenceFormik.values.stages[ts].ccEmail.join(),
                "bccAddress": "",
                "subject": sequenceFormik.values.stages[ts].subject,
                "body": sequenceFormik.values.stages[ts].mailBody,
                "recrId": 1893
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
            if (sequenceType === 'candidate') {
                trackPromise(
                    ApiService.postWithData('233seq', 'DemoSequence/updateSequence', tempData).then((response: any) => {
                        // setTeamLeads(response.data);
                        // console.log(response);
                        if (response.data.Status === 200) {
                            showToaster('The Sequence has been updated Successfully.', 'success');
                            navigate(`/${userLocalData.getvalue('clientName')}/letter/sequences/${sequenceType}/list/`)
                        } else {
                            showToaster(response.data.Message, 'error');
                        }

                    })
                );
            }
            else if (sequenceType === 'contact') {
                trackPromise(
                    //http://35.155.202.216:8080/QADemoCurately/updateContactSequence
                    ApiService.postWithData(216, 'QADemoCurately/updateContactSequence', tempData).then((response: any) => {
                        // setTeamLeads(response.data);
                        // console.log(response);
                        if (response.data.Status === 200) {
                            showToaster('The Sequence has been updated Successfully.', 'success');
                            navigate(`/${userLocalData.getvalue('clientName')}/letter/sequences/${sequenceType}/list/`)
                        } else {
                            showToaster(response.data.Message, 'error');
                        }

                    })
                );
            }




        } else {
            if (sequenceType === 'candidate') {
                trackPromise(
                    ApiService.postWithData('233seq', 'DemoSequence/saveSequence', tempData).then((response: any) => {
                        // setTeamLeads(response.data);
                        // console.log(response);
                        if (response.data.Status === 200) {
                            showToaster('The Sequence has been saved Successfully.', 'success');
                            navigate(`/${userLocalData.getvalue('clientName')}/letter/sequences/${sequenceType}/list/`)
                        } else {
                            showToaster(response.data.Message, 'error');
                        }

                    })
                );
            }
            else if (sequenceType === 'contact') {
                trackPromise(
                    ApiService.postWithData(216, 'QADemoCurately/saveContactSequence', tempData).then((response: any) => {
                        // setTeamLeads(response.data);
                        // console.log(response);
                        if (response.data.Status === 200) {
                            showToaster('The Sequence has been saved Successfully.', 'success');
                            navigate(`/${userLocalData.getvalue('clientName')}/letter/sequences/${sequenceType}/list/`)
                        } else {
                            showToaster(response.data.Message, 'error');
                        }

                    })
                );
            }
        }
    }
    // const continueSave = () => {

    //     let tempStages = [];
    //     for (let ts = 0; ts < sequenceFormik.values.stages.length; ts++) {
    //         // const element = sequenceFormik.values.stages[ts];
    //         tempStages.push({
    //             "stageNumber": ts + 1,
    //             "stageName": "",
    //             "stageID": (sequenceFormik.values.stages[ts].stageID) ? sequenceFormik.values.stages[ts].stageID : 0,
    //             "scheduledType": sequenceFormik.values.stages[ts].scheduledType,
    //             "scheduledDate": sequenceFormik.values.stages[ts].scheduledDate + " " + sequenceFormik.values.stages[ts].scheduledTime,
    //             "numOfBusinessDays": Number(sequenceFormik.values.stages[ts].businessDays),
    //             "timeZone": sequenceFormik.values.stages[ts].timeZone,
    //             "fromAddress": sequenceFormik.values.stages[ts].fromEmail.code,
    //             "ccAddress": sequenceFormik.values.stages[ts].ccEmail.join(),
    //             "bccAddress": "",
    //             "subject": sequenceFormik.values.stages[ts].subject,
    //             "body": sequenceFormik.values.stages[ts].mailBody,
    //             "recrId": userLocalData.getvalue('recrId')
    //         });

    //     }
    //     //         {
    //     //             "stageID": 2,
    //     //             "stageNumber": 2,
    //     //             "stageName": "neon1",
    //     //             "scheduledType": 2,
    //     //             "scheduledDate": 1,
    //     //             "numOfBusinessDays": 2,
    //     //             "timeZone": "EST",
    //     //             "fromAddress": "mailto:ask.ova1@gmail.com",
    //     //             "ccAddress": "cc2",
    //     //             "bccAddress": "bcc2",
    //     //             "subject": "Subject2",
    //     //             "body": "Body2"
    //     //         }
    //     // {
    //     //     "sequenceName": "neon",
    //     //     "sequenceId": 1,
    //     //     "recrId": 1893,
    //     //     "stages": [
    //     //     ]
    //     // }
    //     let tempData: any = {
    //         "sequenceName": sequenceFormik.values.sequenceName,
    //         "recrId": userLocalData.getvalue('recrId'),
    //         "isActive": true,
    //         "stages": tempStages,
    //         "clientId": userLocalData.getvalue('clientId')
    //     }
    //     if (SequenceId) {
    //         tempData.sequenceId = SequenceId;
    //         tempData.deletedIds = deletedStages.join();
    //     }

    //     if (SequenceId) {
    //         let tempEditSequenceDataStages = editSequence.current.stages;
    //         if (sequenceScope === 'candidate') {
    //             trackPromise(
    //                 ApiService.postWithData('233seq', 'DemoSequence/updateSequence', tempData).then((response: any) => {
    //                     // setTeamLeads(response.data);
    //                     // console.log(response);
    //                     if (response.data.Status === 200) {
    //                         showToaster('The Sequence has been updated Successfully.', 'success');
    //                         let toCallEditAPI = false;
    //                         if (tempEditSequenceDataStages.length !== sequenceFormik.values.stages.length || deletedStages.length) {
    //                             toCallEditAPI = true;
    //                         } else {
    //                             for (let es = 0; es < tempEditSequenceDataStages.length; es++) {
    //                                 if (tempEditSequenceDataStages[es].businessDays !== sequenceFormik.values.stages[es].businessDays) {
    //                                     toCallEditAPI = true;
    //                                     break;
    //                                 }
    //                             }
    //                         }
    //                         if (toCallEditAPI) {
    //                             callEditApi();
    //                         } else {
    //                             navigate("/" + userLocalData.getvalue('clientName') + "/letter/sequence/list/");
    //                         }
    //                     } else {
    //                         showToaster(response.data.Message, 'error');
    //                     }

    //                 })
    //             );
    //         }
    //         else if (sequenceScope === 'contact') {

    //             trackPromise(
    //                 //http://35.155.202.216:8080/QADemoCurately/saveContactSequence
    //                 //http://35.155.202.216:8080/QADemoCurately/updateContactSequence
    //                 ApiService.postWithData(216, 'QADemoCurately/updateContactSequence', tempData).then((response: any) => {
    //                     // setTeamLeads(response.data);
    //                     // console.log(response);
    //                     if (response.data.Status === 200) {
    //                         showToaster('The Sequence has been updated Successfully.', 'success');
    //                         let toCallEditAPI = false;
    //                         if (tempEditSequenceDataStages.length !== sequenceFormik.values.stages.length || deletedStages.length) {
    //                             toCallEditAPI = true;
    //                         } else {
    //                             for (let es = 0; es < tempEditSequenceDataStages.length; es++) {
    //                                 if (tempEditSequenceDataStages[es].businessDays !== sequenceFormik.values.stages[es].businessDays) {
    //                                     toCallEditAPI = true;
    //                                     break;
    //                                 }
    //                             }
    //                         }
    //                         if (toCallEditAPI) {
    //                             callEditApi();
    //                         } else {
    //                             navigate("/" + userLocalData.getvalue('clientName') + "/letter/sequence/list/");
    //                         }
    //                     } else {
    //                         showToaster(response.data.Message, 'error');
    //                     }

    //                 })
    //             );
    //         }

    //     }
    //     else if (sequenceScope === 'candidate') {
    //         trackPromise(
    //             ApiService.postWithData('233seq', 'DemoSequence/saveSequence', tempData).then((response: any) => {
    //                 // setTeamLeads(response.data);
    //                 // console.log(response);
    //                 if (response.data.Status === 200) {
    //                     showToaster('The Sequence has been saved Successfully.', 'success');
    //                     navigate("/" + userLocalData.getvalue('clientName') + "/letter/sequence/list/");
    //                 } else {
    //                     showToaster(response.data.Message, 'error');
    //                 }

    //             })
    //         );
    //     }

    //     else if (sequenceScope === 'contact') {
    //         trackPromise(
    //             ApiService.postWithData(216, 'QADemoCurately/saveContactSequence', tempData).then((response: any) => {
    //                 // setTeamLeads(response.data);
    //                 // console.log(response);
    //                 if (response.data.Status === 200) {
    //                     showToaster('The Sequence has been saved Successfully.', 'success');
    //                     navigate("/" + userLocalData.getvalue('clientName') + "/letter/sequence/list/");
    //                 } else {
    //                     showToaster(response.data.Message, 'error');
    //                 }

    //             })
    //         );
    //     }
    // }
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
            if (add === 'change') {
                newStage[index].businessDays = val;
                // sequenceFormik.setFieldValue("stages", newStage);
            }
            for (let sv = 0; sv < newStage.length; sv++) {
                if (!newStage[sv].businessDays) {
                    newStage[sv].businessDays = "0";
                }
                totalDays = Number(totalDays) + Number(newStage[sv].businessDays) + '';
                newStage[sv].totalBusinessDays = totalDays;
            }

            if (add === 'add') {
                // totalDays = Number(totalDays) + (sequenceFormik.values.stages.length * 2) + 1 + '';
                totalDays = Number(totalDays) + 2 + '';
                newStage.push({
                    scheduledType: '2',
                    stageID: "",
                    template: "0",
                    mergeField: "0",
                    followUp: 'Email',
                    scheduledTime: new Date().toTimeString().substring(0, 5),
                    scheduledDate: DateTime.now().plus({ days: Number(totalDays) }).toFormat('yyyy-MM-dd'),
                    timeZone: 'EST',
                    fromEmail: 'adityak@askconsulting.com',
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
                    newStage[index].businessDays = val;
                }
            }
            sequenceFormik.setFieldValue("stages", newStage);
        }, 150);
    }
    const getTemplate = (i: number, templateId: string) => {

        // let ed = quillRefs?.current[i]?.getEditor();
        // ed?.insertText(ed?.getSelection()?.index || 0, " <<" + text + ">> ");

        // https://codepen.io/alexkrolick/pen/gmroPj?editors=0010
        // insert star
        // http://52.40.49.193/Accuick/Email/getTemplateById.jsp?tmplid=148

        trackPromise(
            ApiService.getByParams(171, 'getTemplateById.jsp', { tmplid: templateId }).then((response: any) => {
                // setTeamLeads(response.data);
                // console.log(response);
                setMailBody(i, response.data.body, response.data.subject, templateId);
                setTimeout(() => {
                    setMailBody(i, '', response.data.subject, templateId);
                }, 300);
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
    const setMailBody = (i: number, mailBody: string, subject: string, templateId: string) => {
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

            sequenceFormik.setFieldValue("stages", newStage);
            // console.log(text);
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

        < Formik
            // onSubmit={() => sequenceFormik.handleChange}
            onSubmit={onSubmit}
            initialValues={sequenceFormik.initialValues}
        // enableReinitialize={true}
        >
            {
                ({ }) => (
                    <Form
                        placeholder={<></>}
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

                                    <Link to={`/${userLocalData.getvalue('clientName')}/letter/sequences/list`} className="btn btn-primary ml-2 c-white underlineNone">
                                        <Button variant="outlined" type="button" className='' size="small" color='secondary'>
                                            Back to list
                                        </Button>
                                    </Link>
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
                                                                        confirmDialog(`Are you sure you want to delete?`, () =>
                                                                            deleteStage(i)
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
                                                                                    className='pb-2'
                                                                                >
                                                                                    <h3 className='pr-3 mt-0'>Stage {i + 1}</h3>
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
                                                                                            <MenuItem value="0">Merge Fields</MenuItem>
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
                                                                                        <Grid
                                                                                            container
                                                                                            spacing={2}
                                                                                            direction="row"
                                                                                            justifyContent="flex-start"
                                                                                            alignItems="center"
                                                                                            className='m-0 w-auto'
                                                                                        >
                                                                                            <label className='pr-2'>in</label>
                                                                                            <TextField sx={{ width: '65px' }} variant="outlined" size="small" className='mailInputs mr-4'
                                                                                                id={`businessDays${i}`}
                                                                                                aria-describedby="outlined-weight-helper-text"
                                                                                                onChange={
                                                                                                    (e) => {
                                                                                                        sequenceFormik.handleChange(e);
                                                                                                        calculateTotalBusinessDays('change', e.currentTarget.value, i);
                                                                                                    }
                                                                                                }
                                                                                                name={`stages[${i}].businessDays`}
                                                                                                type="text"
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
                                                                                                        :
                                                                                                        null
                                                                                                }
                                                                                            </label>

                                                                                        </Grid>
                                                                                    }

                                                                                    {i !== 0 ?
                                                                                        null
                                                                                        :
                                                                                        <>
                                                                                            <label className='pr-2'>Scheduled for</label>

                                                                                            <TextField sx={{ width: '135px' }} size='small' className='mr-4'
                                                                                                id={`scheduledType${i}`}
                                                                                                select
                                                                                                value={stage.scheduledType}
                                                                                                onChange={sequenceFormik.handleChange}
                                                                                                name={`stages[${i}].scheduledType`}
                                                                                                defaultValue="1"
                                                                                            >
                                                                                                <MenuItem value='1'>Now</MenuItem>
                                                                                                <MenuItem value='2'>Date and Time</MenuItem>
                                                                                            </TextField>
                                                                                        </>
                                                                                    }
                                                                                    {
                                                                                        ((stage.scheduledType && stage.scheduledType === "2") || i !== 0) ?
                                                                                            <Grid
                                                                                                container
                                                                                                spacing={2}
                                                                                                direction="row"
                                                                                                justifyContent="flex-start"
                                                                                                alignItems="center"
                                                                                                className='m-0 w-auto'
                                                                                            >
                                                                                                <label className='pl-2 pr-2'>At</label>
                                                                                                <TextField
                                                                                                    type="time"
                                                                                                    InputLabelProps={{
                                                                                                        shrink: true,
                                                                                                    }}
                                                                                                    inputProps={{
                                                                                                        step: 300, // 5 min
                                                                                                    }}
                                                                                                    sx={{ width: 110 }}
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
                                                                                            </Grid>
                                                                                            : null
                                                                                    }{
                                                                                        ((stage.scheduledType && stage.scheduledType === "2") && i === 0) ?
                                                                                            <Grid
                                                                                                container
                                                                                                spacing={2}
                                                                                                direction="row"
                                                                                                justifyContent="flex-start"
                                                                                                alignItems="center"
                                                                                                className='m-0 w-auto'
                                                                                            >
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
                                                                                            </Grid>
                                                                                            : null
                                                                                    }
                                                                                </Grid>

                                                                                <Grid
                                                                                    container
                                                                                    direction="column"
                                                                                    justifyContent="flex-start"
                                                                                    alignItems="stretch"
                                                                                    className='m-0 pt-4'
                                                                                >
                                                                                    <TextField
                                                                                        id={`fromEmail${i}`}
                                                                                        // select
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
                                                                                    >
                                                                                        {/* <MenuItem value={'adityak@askconsulting.com'}>adityak@askconsulting.com</MenuItem> */}
                                                                                    </TextField>
                                                                                    <Grid
                                                                                        container
                                                                                        direction="row"
                                                                                        justifyContent="flex-start"
                                                                                        alignItems="center"
                                                                                    >
                                                                                        <div className='ccText'>Cc:</div>
                                                                                        {/* <Autocomplete
                                                                                            value={value}
                                                                                            onChange={(event, newValue) => {
                                                                                                setValue(newValue);
                                                                                            }}
                                                                                            multiple
                                                                                            id="tags-filled"
                                                                                            options={userList.map((option) => option.name)}
                                                                                            freeSolo
                                                                                            renderTags={(value: string[], getTagProps) =>
                                                                                                value.map((option: string, index: number) => (
                                                                                                    <Chip
                                                                                                        variant="outlined"
                                                                                                        label={option}
                                                                                                        {...getTagProps({ index })}
                                                                                                    />
                                                                                                ))
                                                                                            }
                                                                                            renderInput={(params) => (
                                                                                                <TextField
                                                                                                    {...params}
                                                                                                    variant="filled"
                                                                                                    label="Users"
                                                                                                    placeholder="Search"
                                                                                                />
                                                                                            )}
                                                                                        /> */}
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
                                                                                        />
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

                                                                                    <TextField
                                                                                        size='small'
                                                                                        id={`template${i}`}
                                                                                        select
                                                                                        value={stage.template}
                                                                                        onChange={
                                                                                            (e: { target: { value: string; }; }) => {
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
                                                                                    </TextField>
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

                                                                                    <TextField
                                                                                        id={`subject${i}`}
                                                                                        // select
                                                                                        type="text"
                                                                                        value={stage.subject}
                                                                                        onChange={sequenceFormik.handleChange}
                                                                                        InputProps={{
                                                                                            startAdornment: <InputAdornment position="start">Subject</InputAdornment>
                                                                                        }}
                                                                                        name={`stages[${i}].subject`}
                                                                                        fullWidth
                                                                                        className='mailInputs'
                                                                                        size='small'
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
                                                                                        id={"" + i}
                                                                                        handleChange={(e: any) => {
                                                                                            setMailBody(i, e, '', '');
                                                                                        }}
                                                                                        editorHtml={stage.mailBody}
                                                                                        placeholder={""}
                                                                                        saveTemplate={false}
                                                                                        mentions={false}
                                                                                    />
                                                                                    {/* <ReactQuill
                                                                                        theme="snow"
                                                                                        modules={modules}
                                                                                        // formats={formats}
                                                                                        value={stage.mailBody}
                                                                                        id={`mailBody${i}`}
                                                                                        onChange={(e) => {
                                                                                            setMailBody(i, e)
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
                                                                                                setMailBody(i, e.htmlValue)
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

                            <Grid className='footer text-right'>
                                <Button color="primary" variant="contained" type="submit" className='mr-2' size="small">
                                    {(SequenceId) ? 'Update' : 'Save'}
                                </Button>
                                <Link to={`/${userLocalData.getvalue('clientName')}/letter/sequences/${sequenceType}/list`} className="btn btn-primary ml-2 c-white underlineNone">
                                    <Button variant="outlined" type="button" className='' size="small" color='secondary'>
                                        Cancel
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </Form>
                )}
        </Formik >
        {/* <ConfirmDialog /> */}
        <SendEmailDialog />
    </>;
}

export default EditSequence;