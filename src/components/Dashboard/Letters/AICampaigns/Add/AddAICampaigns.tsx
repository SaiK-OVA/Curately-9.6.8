import { useEffect, useState, useRef } from 'react';



import { Link, useParams, useNavigate } from 'react-router-dom';

import { Button, Grid, showToaster, TextField } from '../../../../../shared/modules/commonImports';
import * as Yup from 'yup';
import { useFormik, Formik, FieldArray, Form } from 'formik';
import { DateTime } from 'luxon';



import ApiService from '../../../../../shared/api/api';
import { trackPromise } from 'react-promise-tracker';
import { SendEmailDialog, setSendEmailDialogData } from '../../../../../shared/components/SendEmailDialog/SendEmailDialog';

import { userLocalData } from '../../../../../shared/services/userData';


import AiSettings from './AiSettings/AiSettings';
import AiMetrics from './AiMetrics/AiMetrics';
// import { debounce } from 'lodash';
import Stage from './Stage/Stage';
import StageName from './StageName/StageName';

import './AddAICampaigns.scss';
import { MUIAutoComplete } from '../../../../shared/MUIAutoComplete/MUIAutoComplete';

export interface StageInterface {
    mergeField: string;
    template: string;
    followUp: string;
    stageID: string;
    stageName: string;
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
    bccEmail: string[],
    weekDays: string[]
}

const sequenceStageTitles = ["sub stage 1", "sub stage 2", "sub stage 3", "sub stage 4", "sub stage 5", "sub stage 6", "sub stage 7", "sub stage 8", "sub stage 9", "sub stage 10", "First outreach", "First Outreach", "Follow up in case of no response", "Follow up", "Follow Up", "Follow-up", "2nd Follow up in case of no response", "Respon se to acknowledge no interest", "Initial Contact to Schedule Interview", "Interview Confirmation email", "Interview Reminders", "Interview Feedback and Final Decision", "Interview Scheduling - Recruiter Screen", "Interview Scheduling - Skill Assessment", "Onboarding Details", "Feedback along with final hiring decision", "Extending Offer", "Offer Acceptance response", "Offer Rejected response", "Onboarding Details for joining"];

const AICampaigns = () => {

    // const { SequenceId } = useParams();
    const { sequenceType, SequenceId } = useParams();
    // const quillRefs = useRef<ReactQuill[] | null[]>([]);
    const navigate = useNavigate();
    const [deletedStages, setDeletedStages] = useState<string[]>([]);
    const [pageLoad, setPageLoad] = useState<boolean>(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    // const [isMetricsOpen, setIsMetricsOpen] = useState(false);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    // const [editedBusinessDays, setEditedBusinessDays] = useState<boolean>(false);
    const initialRender = useRef(true);

    const editSequenceData = useRef<{ sequenceName: string, stages: StageInterface[] }>({
        sequenceName: '',
        stages: [
            {
                mergeField: "0",
                template: !userLocalData.isChromeExtensionEnabled() ? "allTemplates" : "emailTemplates",
                followUp: 'Email',
                scheduledType: '1',
                stageName: '',
                stageID: '',
                scheduledTime: new Date().toTimeString().substring(0, 5),
                scheduledDate: new Date().toISOString().substring(0, 10),
                timeZone: '1',
                // timeZone: 'EST',
                fromEmail: { name: '', code: '' },
                businessDays: '1',
                totalBusinessDays: '30',
                ccEmail: [],
                subject: '',
                mailBody: '',
                bccEmail: [],
                weekDays: [],
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
        jobTitle: '',
        jobId: '',
        descr: "",
        stages: [
            {
                mergeField: "0",
                template: !userLocalData.isChromeExtensionEnabled() ? "allTemplates" : "emailTemplates",
                followUp: 'Email',
                scheduledType: '1',
                stageName: '',
                stageID: '',
                scheduledTime: new Date().toTimeString().substring(0, 5),
                scheduledDate: new Date().toISOString().substring(0, 10),
                timeZone: '1',
                // timeZone: 'EST',
                fromEmail: { name: '', code: '' },
                businessDays: '1',
                totalBusinessDays: '30',
                ccEmail: [],
                subject: '',
                mailBody: '',
                bccEmail: [],
                daysAfterFirstMessage: 0,
                weekDays: [],
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
        jobTitle: Yup.string().required('Job Title is required'),
        stages: Yup.array().of(
            Yup.object().shape({
                mergeField: Yup.string(),
                template: Yup.string(),
                stageName: Yup.string(),
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
        validationSchema: stageValidationSchema,
        onSubmit: (values) => {
            alert('SUCCESS!! :-)\n\n' + JSON.stringify(values, null, 4));
        },
    });

    const getSequenceList = () => {
        const endpoint = 'getSequenceById';
        loadUserData("admin", endpoint);
    };

    useEffect(() => {
        getJdParseStagesData()
    }, [sequenceFormik.values.jobId]);

    const handleRegenerateParseJd = (stageMailBody: string, stageSubject: string) => {
        const condArray = [null, undefined, ""];
        const tempStageData = {
            "emailNotes": stageMailBody,
            "emailSubject": stageSubject,
            "clientId": userLocalData.getvalue("clientId")
        }
        let regeneratedData: any = { mailBody: stageMailBody, subject: stageSubject }
        if (!condArray.includes(tempStageData.emailNotes) && !condArray.includes(tempStageData.emailSubject)) {
            trackPromise(
                regeneratedData = ApiService.postWithData('admin', 'getEmailNoteTemplate', tempStageData).then((response: any) => {
                    if (response.data.Success) {

                        const lText = JSON.parse(response.data?.response);
                        return { mailBody: lText.template.email.split('\n').join('<br>') || stageMailBody, subject: lText.template.subject || stageSubject }
                    } else {
                        console.log("Failed to get Re-Generate Details");
                        return regeneratedData
                    }
                })
            );
            return regeneratedData;
        } else return regeneratedData;

    }

    const getJdParseStagesData = async () => {
        let payLoad = {
            "clientId": userLocalData.getvalue("clientId"),
            "jobId": sequenceFormik.values.jobId
        }
        if (![null, undefined, ""].includes(payLoad.jobId) && !SequenceId) {
            trackPromise(
                ApiService.postWithData("admin", "campaigns", payLoad).then(async (res) => {
                    if (res.data.Success) {
                        let jobRelatedStages = res.data?.response?.campaign?.stages || [];
                        let subStages = jobRelatedStages[0].sub_stages;
                        if (!!jobRelatedStages?.length && !!Object.keys(subStages)?.length) {
                            let stagesData: any[] = [];

                            for (let item = 0; item <= sequenceStageTitles.length; item++) {
                                if (subStages.hasOwnProperty(sequenceStageTitles[item])) {
                                    let regeneratedData = await handleRegenerateParseJd(subStages[sequenceStageTitles[item]].email_notes, subStages[sequenceStageTitles[item]].email_subject)
                                    stagesData.push({
                                        stageName: sequenceStageTitles[item],
                                        mailBody: regeneratedData.mailBody,
                                        subject: regeneratedData.subject
                                    })
                                }
                            }

                            let totalDays = '0';
                            let totalHours = 0;
                            let totalMinutes = 0;

                            stagesData = stagesData.map((each) => ({
                                ...each,
                                scheduledType: '2',
                                stageID: "",
                                template: !userLocalData.isChromeExtensionEnabled() ? "allTemplates" : "emailTemplates",
                                mergeField: "0",
                                followUp: 'Email',
                                scheduledTime: DateTime.now().plus({ minutes: Number(totalMinutes), hours: Number(totalHours) }).toFormat('HH:mm'),
                                scheduledDate: DateTime.now().plus({ days: Number(totalDays), hours: Number(totalHours) }).toFormat('yyyy-MM-dd'),
                                timeZone: 'EST',
                                fromEmail: { name: ``, code: '' },
                                businessDays: '1',
                                totalBusinessDays: '' + totalDays,
                                ccEmail: [],
                                bccEmail: [],
                                weekDays: []

                            }))
                            sequenceFormik.setFieldValue("stages", stagesData)
                        } else {
                            sequenceFormik.setFieldValue("stages", [{
                                mergeField: "0",
                                template: !userLocalData.isChromeExtensionEnabled() ? "allTemplates" : "emailTemplates",
                                followUp: 'Email',
                                scheduledType: '1',
                                stageName: '',
                                stageID: '',
                                scheduledTime: new Date().toTimeString().substring(0, 5),
                                scheduledDate: new Date().toISOString().substring(0, 10),
                                timeZone: '1',
                                // timeZone: 'EST',
                                fromEmail: { name: '', code: '' },
                                businessDays: '1',
                                totalBusinessDays: '30',
                                ccEmail: [],
                                subject: '',
                                mailBody: '',
                                bccEmail: [],
                                weekDays: [],
                            }])
                        }
                    }
                })
            )
        }
    }

    const handleJobTitle = (jobId: any) => {
        ApiService.postWithData('admin', 'getAutoCompleteList', { jobTitle: jobId, clientId: userLocalData.getvalue('clientId') })
            //ApiService.getByParams(193, 'Curately/job_autocomplete.jsp', { search: jobId, clientId: userLocalData.getvalue('clientId') })
            .then(
                (response: any) => {
                    //  console.log(response.data);
                    if (Array.isArray(response.data?.list) && !!response.data?.list?.length) {
                        sequenceFormik.setFieldValue("jobTitle", response.data?.list[0]?.label || "")
                        sequenceFormik.setFieldValue("jobId", response.data?.list[0]?.id || "")
                    }
                }
            )
    }

    const loadUserData = (serverId: 'admin' | 214, endpoint: string) => {
        const clientId = userLocalData.getvalue('clientId');

        let tempUser = (SequenceId) ? SequenceId : "";
        trackPromise(
            ApiService.getById(serverId, endpoint, tempUser + '/' + clientId).then(response => {

                if (response.data.Status === 200) {
                    const stages = response.data.Stages.map((stage: any) => ({
                        mergeField: "0",
                        template: !userLocalData.isChromeExtensionEnabled() ? "allTemplates" : "emailTemplates",
                        followUp: "Email",
                        stageName: stage.StageName,
                        stageID: stage.StageID,
                        scheduledType: stage.ScheduledType ?? (stage === 0 ? '1' : '2'),
                        scheduledTime: stage.ScheduledDate?.substring(11, 19) ?? "",
                        scheduledDate: stage.ScheduledDate?.substring(0, 10) ?? "",
                        timeZone: stage.TimeZone?.trim() ?? (stage === 0 ? "1" : "EST"),
                        fromEmail: { name: stage.FromAddress ?? '', code: stage.FromAddress ?? '' },
                        businessDays: stage.NumOfBusinessDays,
                        totalBusinessDays: "0",
                        ccEmail: stage.CCAddress,
                        bccEmail: stage.BCCAddress,
                        subject: stage.Subject,
                        mailBody: stage.Body,
                        weekDays: stage?.weekDays?.split(",") || []
                    }));

                    sequenceFormik.setValues({
                        ...sequenceFormik.values,
                        sequenceName: response.data.SequenceName,
                        jobId: response.data.JobId,
                        descr: response.data.descr,
                        stages: stages
                    });
                    handleJobTitle(response.data.JobId);

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
        } else if (!sequenceFormik.values.jobId && !sequenceFormik.values.jobTitle) {
            showToaster('Please enter Job Title', 'error');
            isValidForm = false;
            return;
        }
        else if (sequenceFormik.values.stages) {
            let tempStagesForValidation = sequenceFormik.values.stages;
            for (let fe = 0; fe < tempStagesForValidation.length; fe++) {
                if (tempStagesForValidation[fe]) {

                    if (!tempStagesForValidation[fe].scheduledType) {
                        showToaster('Please select Scheduled Type', 'error');
                        isValidForm = false;
                        scrollTo(fe);
                        break;
                    }
                    // if (!tempStagesForValidation[fe].scheduledDate) {
                    //     showToaster('Please select Scheduled Date', 'error');
                    //     isValidForm = false;
                    //     scrollTo(fe);
                    //     break;
                    // }
                    // if (!tempStagesForValidation[fe].scheduledTime) {
                    //     showToaster('Please select Scheduled TIme', 'error');
                    //     isValidForm = false;
                    //     scrollTo(fe);
                    //     break;
                    // }
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
                    if (!tempStagesForValidation[fe].subject?.trim()) {
                        showToaster('Please enter Subject', 'error');
                        isValidForm = false;
                        scrollTo(fe);
                        break;
                    }
                    const emailBodyToCheck = tempStagesForValidation[fe].mailBody.replace(/<p>/g, "").replace(/<br>/g, "").replace(/<\/p>/g, "");
                    if (emailBodyToCheck === "") {
                        showToaster('Please enter Email Body', 'error');
                        isValidForm = false;
                        scrollTo(fe);
                        break;
                    }
                    // if (!tempStagesForValidation[fe].businessDays) {
                    //     showToaster('Please enter business days', 'error');
                    //     isValidForm = false;
                    //     scrollTo(fe);
                    //     break;
                    // }
                    // if (!tempStagesForValidation[fe].weekDays?.length) {
                    //     showToaster('Please select week days', 'error');
                    //     isValidForm = false;
                    //     scrollTo(fe);
                    //     break;
                    // }

                }
            }
        }
        if (isValidForm) {
            continueSave();
        } else {
            console.log('Form is not Valid');
        }

    }
    const continueSave = () => {

        let tempStages = [];
        for (let ts = 0; ts < sequenceFormik.values.stages.length; ts++) {
            // const element = sequenceFormik.values.stages[ts];
            tempStages.push({
                "stageNumber": ts + 1,
                "stageName": sequenceFormik.values.stages[ts].stageName,
                "stageID": (sequenceFormik.values.stages[ts].stageID) ? sequenceFormik.values.stages[ts].stageID : 0,
                "scheduledType": sequenceFormik.values.stages[ts].scheduledType,
                // "scheduledDate": sequenceFormik.values.stages[ts].scheduledDate + " " + sequenceFormik.values.stages[ts].scheduledTime,
                "numOfBusinessDays": Number(sequenceFormik.values.stages[ts].businessDays),
                "timeZone": sequenceFormik.values.stages[ts].timeZone,
                "fromAddress": sequenceFormik.values.stages[ts].fromEmail.code,
                "ccAddress": Array.isArray(sequenceFormik.values.stages[ts].ccEmail) ? sequenceFormik.values.stages[ts].ccEmail.join() : sequenceFormik.values.stages[ts].ccEmail,
                "bccAddress": Array.isArray(sequenceFormik.values.stages[ts].bccEmail) ? sequenceFormik.values.stages[ts].bccEmail.join() : sequenceFormik.values.stages[ts].bccEmail,
                "subject": sequenceFormik.values.stages[ts].subject,
                "body": sequenceFormik.values.stages[ts].mailBody,
                "recrId": userLocalData.getvalue('recrId'),
                "weekDays": sequenceFormik.values.stages[ts].weekDays.join(",") || ""
            });

        }
        let tempData: any = {
            "sequenceName": sequenceFormik.values.sequenceName,
            "recrId": userLocalData.getvalue('recrId'),
            "isActive": true,
            "stages": tempStages,
            "clientId": userLocalData.getvalue('clientId'),
            "jobId": Number(sequenceFormik.values.jobId),
            "descr": sequenceFormik.values.descr,
        }
        if (SequenceId) {
            tempData.sequenceId = SequenceId;
            tempData.deletedIds = deletedStages.join();
            trackPromise(
                ApiService.postWithData("admin", 'updateSequence', tempData).then((response: any) => {
                    if (response.data.Success) {
                        showToaster('The Campaign has been updated Successfully.', 'success');

                        navigate(`/${userLocalData.getvalue('clientName')}/letter/campaigns/${sequenceType}/list/`)
                    } else {
                        showToaster(response.data.Message, 'error');
                    }
                })
            );
        }
        else {
            trackPromise(
                ApiService.postWithData("admin", 'saveSequence', tempData).then((response: any) => {
                    if (response.data.Success) {
                        showToaster('The Campaign has been saved Successfully.', 'success');

                        navigate(`/${userLocalData.getvalue('clientName')}/letter/campaigns/${sequenceType}/list/`)
                    } else {
                        showToaster(response.data.Message, 'error');
                    }

                })
            );
        }


        // console.log(tempData, SequenceId);
        // console.log(sequenceFormik.values);


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
                    stageName: "",
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
                    businessDays: '1',
                    // businessDays: '' + ((sequenceFormik.values.stages.length * 2) + 1),
                    totalBusinessDays: '' + totalDays,
                    ccEmail: [],
                    subject: "",
                    mailBody: '',
                    bccEmail: [],
                    daysAfterFirstMessage: 0,
                    weekDays: []
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
            })
        );

    }

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




    return <>
        <div className='AICampaigns'>
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
                                            justifyContent="flex-end"
                                            alignItems="center"
                                        >

                                            {/* <Grid className='d-flex'>  */}
                                            <Button color="primary" className='mr-2' onClick={handleOpen}>
                                                Metrics

                                            </Button>
                                            <AiMetrics open={open} handleClose={handleClose} />

                                            <Button color="primary" className='mr-2' onClick={() => setIsSettingsOpen(true)}>
                                                Settings
                                            </Button>

                                            {isSettingsOpen ?

                                                <AiSettings
                                                    open={isSettingsOpen}
                                                    closePopup={() => setIsSettingsOpen(false)}
                                                /> : null
                                            }

                                            <Button color="primary" variant="contained" type="submit" className='mr-2' size="small">
                                                {(SequenceId) ? 'Update' : 'Save'}
                                            </Button>

                                            <Link to={`/${userLocalData.getvalue('clientName')}/letter/campaigns/${sequenceType}/list`} className="btn btn-primary ml-2 c-white underlineNone">
                                                <Button variant="outlined" type="button" className='' size="small" color='secondary'>
                                                    Cancel
                                                </Button>
                                            </Link>
                                            {/* </Grid> */}
                                        </Grid>
                                    </Grid>

                                    <Grid className='section'>
                                        <Grid container>
                                            <Grid size="auto" className='nav'>
                                                <TextField
                                                    id="sequenceName"
                                                    variant="outlined"
                                                    size="small"
                                                    label={
                                                        <span> Campaign Name
                                                            <span style={{ color: 'red' }}> *</span>
                                                        </span>
                                                    }

                                                    onChange={sequenceFormik.handleChange}
                                                    name="sequenceName"
                                                    value={sequenceFormik.values.sequenceName}
                                                    fullWidth
                                                    sx={{ marginBottom: "15px" }}
                                                />

                                                <MUIAutoComplete
                                                    id='jobTitle'
                                                    handleChange={(id: any, name: string) => {
                                                        sequenceFormik.setFieldValue('jobId', id);
                                                        sequenceFormik.setFieldValue('jobTitle', name);
                                                        // setTimeout(() => {
                                                        //     updateJobDetails(id, name);
                                                        // }, 120);
                                                        // setJobModalOpen(false);
                                                        // saveDataForm("", id);
                                                    }}
                                                    valuePassed={(sequenceFormik.values.jobId && sequenceFormik.values.jobTitle) ? { label: sequenceFormik.values.jobTitle, id: sequenceFormik.values.jobId } : {}}
                                                    isMultiple={false}
                                                    textToShow="Select Job"
                                                    width="100%"
                                                    type='assignJobToCandidate'
                                                    placeholder={
                                                        <span>Enter Job Title  <span style={{ color: 'red' }}> *</span>
                                                        </span>}
                                                    error={sequenceFormik.touched.jobTitle && Boolean(sequenceFormik.errors.jobTitle)}
                                                    isDisabled={Boolean(SequenceId)}
                                                />
                                                <TextField
                                                    className={`mt-2`}
                                                    fullWidth
                                                    id="Description"
                                                    variant="outlined"
                                                    size="small"
                                                    placeholder='Enter or Paste Description'
                                                    name={`descr`}
                                                    value={sequenceFormik.values.descr}
                                                    onChange={sequenceFormik.handleChange}
                                                    multiline
                                                    rows={3}
                                                    maxRows={3}
                                                />
                                                <StageName
                                                    sequenceFormik={sequenceFormik}
                                                    activeStage={activeStage}
                                                    openStage={openStage}
                                                    SequenceId={SequenceId ? Number(SequenceId) : 0}
                                                    deleteStage={deleteStage}
                                                    addStage={addStage}
                                                />
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
                                                                        (stage: StageInterface, i: number) => {

                                                                            return (
                                                                                <Stage
                                                                                    stage={stage}
                                                                                    i={i} sequenceFormik={sequenceFormik}
                                                                                    calculateTotalBusinessDays={calculateTotalBusinessDays}
                                                                                    setFromEmailValue={setFromEmailValue}
                                                                                    getTemplate={getTemplate}
                                                                                    clearSubjectAndBody={clearSubjectAndBody}
                                                                                    setFormFieldValue={setFormFieldValue}
                                                                                    handleRegenerateCB={handleRegenerateParseJd}
                                                                                />
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

export default AICampaigns;