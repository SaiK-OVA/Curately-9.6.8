import BeefreeSDK from '@mailupinc/bee-plugin'

import { useCallback, useEffect, useState } from '../../../../../shared/modules/React';
import { useNavigate, useParams } from 'react-router-dom';
// import { EmailBuilderTemplateJson } from '../data/data';


import { Form, Formik, useFormik,Yup} from "../../../../../shared/modules/Formik";

import {Button} from '../../../../../shared/modules/MaterialImports/Button';
import {Grid} from '../../../../../shared/modules/MaterialImports/Grid';
import {Dialog,DialogActions,DialogContent,DialogTitle} from '../../../../../shared/modules/MaterialImports/Dialog';
// import IconButton from '@mui/material/IconButton';
import {TextField} from '../../../../../shared/modules/MaterialImports/TextField';
import { specialLinks, mergeContents, ModuleDescriptorOrderNames } from '../utils/config';


import ApiService from '../../../../../shared/api/api';

import { showToaster } from '../../../../shared/SnackBar/SnackBar';
import ErrorMessage from '../../../../shared/Error/ErrorMessage';
import { trackPromise } from '../../../../../shared/modules/PromiseTrackter';
import { userLocalData } from '../../../../../shared/services/userData';
import { MUIAutoComplete } from '../../../../shared/MUIAutoComplete/MUIAutoComplete';


import './AddEmailBuilder.scss';
import { CircularProgress } from '../../../../../shared/modules/MaterialImports/CircularProgress';
import { debounce } from 'lodash';
// import { confirmDialog } from '../../../../shared/ConfirmDialog/ConfirmDialog';

const AddEmailBuilder = ({ templateData, closePopup }: { templateData: any; closePopup: () => void }) => {

    const { templateId, candidateId, jobId } = useParams();
    const navigate = useNavigate();

    // const [placeHolder, setPlaceholder] = useState<any[]>();

    const [isTagsDataLoaded, setIsTagsDataLoaded] = useState(false);
    const mergeTags: any = [];

    useEffect(() => {
        // const Placeholders = localStorage.getItem('PlaceHolders');
        // if (Placeholders) {
        //     parsePlaceholders(JSON.parse(Placeholders))
        // } else {
        placeHodlerListAPI();
        // }
    }, []);

    const placeHodlerListAPI = useCallback(debounce(() => {
        trackPromise(
            ApiService.postWithData('admin', 'placeHolders', {
                clientId: userLocalData.getvalue('clientId'),
                userIds: candidateId ? candidateId : "",
                jobId: jobId ? jobId : "",
                recrId: userLocalData.getvalue('recrId')
            }).then(
                (result: any) => {
                    //       console.log(result.data.PlaceHolders);
                    //   setPlaceholder(result.data.PlaceHolders);
                    if ((result.data.Success === "true" || result.data.Success) && result.data.PlaceHolders) {
                        localStorage.setItem('PlaceHolders', JSON.stringify(result.data.PlaceHolders))
                        parsePlaceholders(result.data.PlaceHolders)
                    } else {
                        console.log(result)
                    }


                }

            )
        )

    }, 400), [])

    const parsePlaceholders = (placeHolder: any) => {
        console.log(placeHolder)
        if (placeHolder["Custom Details"] && Array.isArray(placeHolder["Custom Details"])) {
            for (let cd = 0; cd < placeHolder["Custom Details"].length; cd++) {
                const element = placeHolder["Custom Details"][cd];
                Object.keys(element).map(item => {
                    if (Array.isArray(placeHolder["Custom Details"][cd][item])) {
                        placeHolder[item] = placeHolder["Custom Details"][cd][item];
                    }
                })
            }
            delete placeHolder["Custom Details"];
        }
        const filteredPlaceholders = placeHolder ? Object.keys(placeHolder).reduce((acc: any, category: any) => {
            const filteredItems = placeHolder[category].filter((item: { viewfieldname: string }) =>
                item.viewfieldname.toLowerCase().includes(searchTerm.toLowerCase())
            );
            if (filteredItems.length > 0) {
                // @ts-ignore
                acc[category] = filteredItems;
            }
            return acc;
        }, {})
            : {};


        filteredPlaceholders && Object.keys(filteredPlaceholders).map((category, index) => {

            for (let i = 0; i < filteredPlaceholders[category].length; i++) {
                if (filteredPlaceholders[category][i]) {
                    mergeTags.push({
                        name: filteredPlaceholders[category][i].viewfieldname,
                        value: `{{` + filteredPlaceholders[category][i].viewfieldname + `}}`,
                        isInHtml: "",
                    }

                    );
                }
            }
            // console.log(mergeTags);       
        })
        setIsTagsDataLoaded(true);
        setMergeTagsForDisplay(mergeTags);
        setTimeout(() => {
        }, 3000);
    }

    const [searchTerm, setSearchTerm] = useState('');

    const [mergeTagsForDisplay, setMergeTagsForDisplay] = useState<{
        name: string,
        value: string,
        isInHtml?: boolean
    }[]>([mergeTags]);

    // const isTemplateLoaded = useRef(false); 

    const [openSendEmail, setOpenSendEmail] = useState(false);
    const [openAddName, setOpenAddName] = useState(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [isSendFormSubmitted, setIsSendFormSubmitted] = useState(false);

    const [isEmailBuilderLoaded, setIsEmailBuilderLoaded] = useState(false);
    const [isPreviewOpened, setIsPreviewOpened] = useState(false);

    const beeTest = new BeefreeSDK();
    // token, authConfiguration


    //Put your credentials in the .env file
    const clientId = import.meta.env.VITE_BEEFREESDK_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_BEEFREESDK_CLIENT_SECRET;
    const beeConfig = {
        uid: 'CuratelyEmailBuilder', //needed for identify resources of the that user and billing stuff
        container: 'CuratelyEmailBuilder', // Identifies the id of div element that contains the Beefree SDK builder
        language: 'en-US',
        specialLinks,
        mergeTags,
        mergeContents,
        modulesGroups: [
            {
                label: 'Text',
                collapsable: true,
                collapsedOnLoad: false,
                modulesNames: [
                    ModuleDescriptorOrderNames.HEADING,
                    ModuleDescriptorOrderNames.PARAGRAPH,
                    ModuleDescriptorOrderNames.LIST
                ]
            },
            {
                label: 'UI',
                collapsable: true,
                collapsedOnLoad: false,
                modulesNames: [
                    ModuleDescriptorOrderNames.IMAGE,
                    ModuleDescriptorOrderNames.BUTTON,
                    ModuleDescriptorOrderNames.DIVIDER,
                    ModuleDescriptorOrderNames.SPACER,
                    ModuleDescriptorOrderNames.VIDEO,
                    ModuleDescriptorOrderNames.ICONS,
                    ModuleDescriptorOrderNames.HTML,
                    ModuleDescriptorOrderNames.MENU,
                    ModuleDescriptorOrderNames.SOCIAL,
                ]
            },
            {
                label: 'Others',
                collapsable: true,
                collapsedOnLoad: false,
                modulesNames: [
                    'Dynamics Contents',
                    'Gifs',
                    'Stickers',
                ]
            }
        ],
        defaultModulesOrder: [
            'Button',
            'Html',
            'Icons',
            ModuleDescriptorOrderNames.VIDEO,
            ModuleDescriptorOrderNames.HTML,
            ModuleDescriptorOrderNames.IMAGE,
            'Stickers'
        ],
        onSave: (jsonFile: string, htmlFile: string) => {
            // console.log('onSave', jsonFile, htmlFile);
            addEmailTemplateFormik.setValues({
                ...addEmailTemplateFormik.values,
                jsonFile: jsonFile,
                htmlFile: htmlFile
            });
            setOpenAddName(true);
        },
        onSaveAsTemplate: (jsonFile: string) => {
            //  console.log('onSaveAsTemplate', jsonFile)
        },
        onSend: (htmlFile: string) => {
            //   console.log('onSend', htmlFile);
            addEmailTemplateFormik.setValues({
                ...addEmailTemplateFormik.values,
                htmlFile: htmlFile
            });
            if (htmlFile && htmlFile.length) {
                setIsSendFormSubmitted(false);
                sendEmailFormik.resetForm();
                for (let mt = 0; mt < mergeTagsForDisplay.length; mt++) {
                    mergeTagsForDisplay[mt].isInHtml = htmlFile.includes(mergeTagsForDisplay[mt].value) ? true : false;
                }
                sendEmailFormik.setValues({
                    ...sendEmailFormik.values,
                    subject: addEmailTemplateFormik.values.subject,
                    firstNameCheck: htmlFile.includes("<<First name>>") ? true : false,
                    lastNameCheck: htmlFile.includes("<<Last name>>") ? true : false,
                    firstNameAndLastNameCheck: htmlFile.includes("<<First name and Last name>>") ? true : false,
                    emailCheck: htmlFile.includes("<<Email>>") ? true : false,
                    signatureCheck: htmlFile.includes("<<Signature>>") ? true : false,
                    candIdCheck: htmlFile.includes("<<Candid>>") ? true : false,
                    candidateLinkCheck: htmlFile.includes("<<CandidateLink>>") ? true : false,
                    recruiterNameCheck: htmlFile.includes("<<Recruiter Name>>") ? true : false,
                })
                setMergeTagsForDisplay(mergeTagsForDisplay);
                setOpenSendEmail(true);
                // sendEmail(htmlFile);
            } else {
                showToaster('No Data Found', 'error');
            }
        },
        // onError: (errorMessage: string) => {
        //     console.log('onError ', errorMessage)
        // },
        onLoad: () => {
            setIsEmailBuilderLoaded(true);
            // beeTest.token.access_token
            // if (templateId && !isTemplateLoaded.current) {

            // }
            console.warn('*** [integration] loading a new template... ')
        },
        onAutoSave: (jsonFile: string) => {
            //  console.log(`${new Date().toISOString()} autosaving...,`, jsonFile)
            window.localStorage.setItem('newsletter.autosave', jsonFile)
        },
        onChange: (msg: any, response: any) => {
            //   console.log("dsadasasdsdasdssadsdadas");
            //  console.warn('*** [integration] (OnChange) message --> ', msg, response)
        },
        onWarning: (e: { message: any; }) => console.warn('*** [integration] (OnWarning) message --> ', e.message),
        onPreview: (opened: any) => console.warn(`*** [integration] --> (onPreview) preview open status ${opened}`),
        onTogglePreview: (toggled: any) => {
            console.warn(`*** [integration] --> (onTogglePreview) toggle status ${toggled}`);
            setIsPreviewOpened(toggled);
        },
        onSessionStarted: (sessionInfo: { sessionId: string | undefined; }) => {
            console.warn('*** [integration] --> (onSessionStarted) ', sessionInfo);
            prompt('press ctrl+c to copy the session ID', sessionInfo.sessionId)
        },
        onSessionChange: (sessionInfo: any) => console.warn('*** [integration] --> (onSessionChange) ', sessionInfo),
        // customCss: `https://app.curately.ai/Accuick_API/Curately/Custom/CSS/EmailBuilder.css?v=${import.meta.env.VITE_APP_NAME}`

    }

    const sendEmail = () => {
        setIsSendFormSubmitted(true);
        if (sendEmailFormik.isValid) {
            let htmlFile = addEmailTemplateFormik.values.htmlFile;
            //  console.log(htmlFile);
            htmlFile = htmlFile.replace(/<<First name>>/gi, sendEmailFormik.values.firstName);
            htmlFile = htmlFile.replace(/<<Last name>>/gi, sendEmailFormik.values.lastName);
            htmlFile = htmlFile.replace(/<<First name and Last name>>/gi, sendEmailFormik.values.firstNameAndLastName);
            htmlFile = htmlFile.replace(/<<Email>>/gi, sendEmailFormik.values.email);
            htmlFile = htmlFile.replace(/<<Signature>>/gi, sendEmailFormik.values.signature);
            htmlFile = htmlFile.replace(/<<Candid>>/gi, sendEmailFormik.values.candId);
            htmlFile = htmlFile.replace(/<<CandidateLink>>/gi, sendEmailFormik.values.candidateLink);
            htmlFile = htmlFile.replace(/<<Recruiter Name>>/gi, sendEmailFormik.values.recruiterName);

            //  console.log(htmlFile);
            // return;
            // const data = {
            //     // subject: sendEmailFormik.values.subject,
            //     // body: encodeURIComponent(htmlFile),
            //     // fromName: userLocalData.getvalue('recrFullName'),
            //     // fromEmail: userLocalData.getvalue('email'),
            //     // toEmail: sendEmailFormik.values.toEmails,
            //     // toEmail: userLocalData.getvalue('email'),
            //     // candId: "",
            //     // contId: "contactId",
            //     // jobId: jobId,
            //     // workflow_job_cand_id: workflowJobCandidateId,
                
            // }
            let dataToPass = {
                "fromName": userLocalData.getvalue('recrFullName'),
                "fromAddress": userLocalData.getvalue('email'),
                "email": sendEmailFormik.values.toEmails,
                "toName": "HTML Email",
                "subject": sendEmailFormik.values.subject,
                "body": htmlFile,
                "clientId": userLocalData.getvalue('clientId')
            };
            trackPromise(
                // ApiService.postWithData("admin", 'previewmail', dataToPass).then(
                //     (result) => {
                //         // console.log(result.data);
                //         if (result.data.Message === "Success") {
                //             setOpenSendEmail(false);
                //             showToaster("Email sent Successfully", 'success');
                //         } else {
                //             showToaster("Sending Email failed.", 'error');
                //         }
                //     },
                // )
                ApiService.postWithData('admin', 'previewmail', dataToPass).then((response: any) => {
                    if (response.data.Status === 200) {
                        showToaster('Preview Email has been Send.', 'success');
                        setOpenSendEmail(false);
                    } else {
                        showToaster('An error occurred while sending Preview Email', 'error');
                    }
                })
            )
        }
    }

    const initialAddEmailTemplate = templateData;
    const addEmailTemplateSchema = Yup.object().shape({
        templateName: Yup.string().required('Template Name is required.'),
        templateId: Yup.string(),
        subject: Yup.string().required('Subject is required.'),
        description: Yup.string(),
        jsonFile: Yup.string(),
        htmlFile: Yup.string(),
        createdBy: Yup.string(),
        type: Yup.number(),
        isActive: Yup.boolean(),
        clientId: Yup.string()
    });

    const addEmailTemplateFormik = useFormik({
        initialValues: initialAddEmailTemplate,
        validationSchema: addEmailTemplateSchema,
        onSubmit: () => {
            // setIsFormSubmitted(true);
            //  console.log(addEmailTemplateFormik.values);
        },
        enableReinitialize: true
    });

    const sendEmailFormikSchema = Yup.object().shape({
        subject: Yup.string().required('Subject is required'),
        toEmails: Yup.string().required('Subject is required'),
        firstName: Yup.string().when('firstNameCheck', {
            is: true,
            then: (f:any) => f.required('First Name is required')
        }),
        lastName: Yup.string().when('lastNameCheck', {
            is: true,
            then: (f:any) => f.required('Last Name is required')
        }),
        firstNameAndLastName: Yup.string().when('firstNameAndLastNameCheck', {
            is: true,
            then: (f:any) => f.required('First Name And Last Name is required')
        }),
        email: Yup.string().when('emailCheck', {
            is: true,
            then: (f:any) => f.required('Email is required')
        }).email('In Valid Email'),
        signature: Yup.string().when('signatureCheck', {
            is: true,
            then: (f:any) => f.required('Signature is required')
        }),
        candId: Yup.string().when('candIdCheck', {
            is: true,
            then: (f:any) => f.required('Cand ID is required')
        }),
        candidateLink: Yup.string().when('candidateLinkCheck', {
            is: true,
            then: (f:any) => f.required('Candidate Link is required')
        }),
        recruiterName: Yup.string().when('recruiterNameCheck', {
            is: true,
            then: (f:any) => f.required('Recruiter Name is required')
        }),

        firstNameCheck: Yup.boolean(),
        lastNameCheck: Yup.boolean(),
        firstNameAndLastNameCheck: Yup.boolean(),
        emailCheck: Yup.boolean(),
        signatureCheck: Yup.boolean(),
        candIdCheck: Yup.boolean(),
        candidateLinkCheck: Yup.boolean(),
        recruiterNameCheck: Yup.boolean()
    });

    const sendEmailFormik = useFormik({
        initialValues: {
            subject: "",
            toEmails: "",
            firstName: "",
            lastName: "",
            firstNameAndLastName: "",
            email: "",
            signature: "",
            candId: "",
            candidateLink: "",
            recruiterName: "",
            firstNameCheck: false,
            lastNameCheck: false,
            firstNameAndLastNameCheck: false,
            emailCheck: false,
            signatureCheck: false,
            candIdCheck: false,
            candidateLinkCheck: false,
            recruiterNameCheck: false,
        },
        validationSchema: sendEmailFormikSchema,
        onSubmit: () => {
            // setIsFormSubmitted(true);
            //  console.log(sendEmailFormik.values);
        },
        enableReinitialize: true
    });

    const getToken = () => {
        trackPromise(
            beeTest.getToken(clientId, clientSecret)
                .then((response) => {
                    // {
                    //     "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.hbmRsZSI6Im5sIn0.L1GI2SSPHrq65",
                    //     "token_type": "bearer",
                    //     "expires_in": 300,
                    //     "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.X2hhbmRsZSI6Im5sIn0.L1GI2SSPHrq65",
                    //     "as:client_id": "e5c7bb16-b6ab-439a-956c-774488f760c5",
                    //     "userName": "M7BjFkZtE1ya",
                    //     "as:region": "eu-west-1",
                    //     ".issued": "Wed, 15 Nov 2023 19:52:08 GMT",
                    //     ".expires": "Wed, 15 Nov 2023 19:57:08 GMT"
                    // }
                    console.log(mergeTags);
                    console.log(mergeTagsForDisplay);
                    beeTest.start(beeConfig, templateData.jsonFile ? JSON.parse(templateData.jsonFile) : {});
                    setTimeout(() => {
                    }, 3000);
                })
        )


    }

    useEffect(() => {
        // if (templateId) {
        //     loadTemplate(); 
        // } else {

        getToken();

        // }
    }, []);

    const saveForm = () => {
        setIsFormSubmitted(true);
        if (addEmailTemplateFormik.isValid) {

            //http://35.155.202.216:8080/QADemoCurately/saveEmailTempaltes

            trackPromise(
                ApiService.postWithData('admin', 'saveEmailBuilderTemplates', { ...addEmailTemplateFormik.values })
                    .then(
                        (response: any) => {
                            //  console.log(response.data);
                            if (response.data.Success) {
                                showToaster(response.data.Message, 'success');
                                setOpenAddName(false);
                                goToList();
                            } else {
                                showToaster(response.data.Message, 'error');
                            }
                        })
                    .catch((error) => {
                        console.error("Error:", error);
                        // alert('Error occurred.', 'error');
                    }
                    )
            )
        } else {
            showToaster('Please fill all required fields.', 'error')
        }
        // beeTest.save();
    }

    const goToList = () => {
        // navigate("/" + userLocalData.getvalue('clientName') + "/settings/templates");
        closePopup();
        // setOpenAddName(false);
    }

    return (
        <div className='p-2 pb-0' id='emailBuilder'>
            <Grid
                container
                direction={'column'}
                justifyContent="start"
                alignItems="flex-end"
                className={`${isEmailBuilderLoaded ? "" : "d-none"}`}
            >
                <div style={{ position: "relative" }}>

                    {
                        isEmailBuilderLoaded ?
                            <Grid
                                direction="row"
                                justifyContent="flex-end"
                                alignItems="center"
                                sx={{
                                    position: "absolute",
                                    right: "calc(100vw - 140px)",
                                    top: "7px",
                                    width: "50px",
                                    backgroundColor: isPreviewOpened ? "#ffffff" : isEmailBuilderLoaded ? "#515658" : "",
                                    height: "42px",
                                    display: isPreviewOpened ? "none" : "block"
                                    // isPreviewOpened
                                }}
                            >
                            </Grid>
                            :
                            null
                    }
                </div>
                <div style={{ position: "relative" }}>

                    {
                        isEmailBuilderLoaded ?
                            <Grid
                                direction="row"
                                justifyContent="flex-end"
                                alignItems="center"
                                sx={{
                                    position: "absolute",
                                    left: isPreviewOpened ? "-560px" : "-333px",
                                    top: "7px",
                                    width: "193px",
                                    backgroundColor: isPreviewOpened ? "#ffffff !important" : isEmailBuilderLoaded ? "#515658 !important" : "",
                                    height: "42px"
                                }}
                            >
                                {/* <Button variant="outlined"
                                    type='button'
                                    color="secondary"
                                    className={`mr-2 ${isPreviewOpened ? 'c-darkGrey' : 'c-paleBlue'}`}
                                    onClick={() => {
                                        if (isPreviewOpened) {
                                            goToList();
                                        } else {
                                            confirmDialog(`Are you sure you want to discard the changes?`, () => {
                                                goToList();
                                            }, "warning"
                                            );
                                        }
                                    }}
                                    sx={{
                                        right: "0",
                                        position: "absolute",
                                        top: "8px",
                                        borderColor: ` ${isPreviewOpened ? 'var(--curtelyDarkGrey)' : 'var(--curtelyDarkGrey)'} !important`
                                    }}
                                >Back to List</Button> */}
                            </Grid>
                            :
                            null
                    }
                </div>
                <div id='CuratelyEmailBuilder'></div>
            </Grid >

            <CircularProgress className={`centered ${isEmailBuilderLoaded ? "d-none" : ""}`} />

            <Formik
                onSubmit={saveForm}
                initialValues={addEmailTemplateFormik.initialValues}
                enableReinitialize={true}
            >
                {
                    () => (
                        <Form
                            placeholder={'Add Form'} >
                            {/* <TextField
                                id='description'
                                placeholder='Description'
                                variant='outlined'
                                value={addEmailTemplateFormik.values.description}
                                fullWidth
                                size='small'
                                onChange={addEmailTemplateFormik.handleChange}
                                className='mb-2'
                                sx={{
                                    fontSize: 12
                                }}
                            /> */}

                            <Dialog
                                maxWidth={'md'}
                                fullWidth={true} open={openAddName} className='AddEmailBuilderModal'
                                id=''
                            >
                                <DialogTitle className="header">
                                    <span>{templateId ? "Update" : "Save"} Form</span>

                                    {/* <IconButton
                                        aria-label="close"
                                        onClick={}
                                        className="closeBtn"
                                    >
                                        <CloseIcon />
                                    </IconButton> */}
                                </DialogTitle>
                                <DialogContent>
                                    <Grid container spacing={2} className="mb-1">
                                        <Grid size={12} className='mt-1'>
                                            <TextField
                                                id='templateName'
                                                placeholder='Template Name'
                                                variant='outlined'
                                                value={addEmailTemplateFormik.values.templateName}
                                                fullWidth
                                                size='small'
                                                onChange={addEmailTemplateFormik.handleChange}
                                                className='mb-2'
                                                sx={{
                                                    fontSize: 12
                                                }}
                                            />
                                            <ErrorMessage formikObj={addEmailTemplateFormik} name={'templateName'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                        </Grid>
                                        <Grid size={12} className='mt-1'>
                                            <TextField
                                                id='subject'
                                                placeholder='Subject'
                                                variant='outlined'
                                                value={addEmailTemplateFormik.values.subject}
                                                fullWidth
                                                size='small'
                                                onChange={addEmailTemplateFormik.handleChange}
                                                className='mb-2'
                                                sx={{
                                                    fontSize: 12
                                                }}
                                            />
                                            <ErrorMessage formikObj={addEmailTemplateFormik} name={'subject'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                        </Grid>
                                    </Grid>
                                </DialogContent>
                                <DialogActions>
                                    {/* <Button
                                        className="btnSecondary"
                                        onClick={() => setOpenAddName(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        className="btnPrimary"
                                    >
                                        Save
                                    </Button> */}
                                    <Button variant="outlined"
                                        type='button'
                                        color="secondary"
                                        className='mr-2'
                                        onClick={
                                            () => {
                                                setOpenAddName(false);
                                                // goToList();
                                            }
                                        }
                                    >Cancel</Button>
                                    <Button variant="contained"
                                        type='button'
                                        color="primary"
                                        onClick={saveForm}
                                    // disabled={}
                                    >{templateId ? "Update" : "Save"}</Button>
                                </DialogActions>
                            </Dialog>



                        </Form>
                    )
                }
            </Formik>


            <Formik
                onSubmit={sendEmail}
                initialValues={sendEmailFormik.initialValues}
                enableReinitialize={true}
            >
                {
                    () => (
                        <Form placeholder={'Add Form'}>

                            <Dialog
                                maxWidth={'md'}
                                fullWidth={true} open={openSendEmail} className='sendEmailBuilder'
                                id='sendEmailBuilder'
                            >
                                <DialogTitle className="header">
                                    Send Test Email
                                </DialogTitle>
                                <DialogContent>
                                    <Grid container spacing={2} className="mb-1">
                                        <Grid size={12} className='mt-1'>
                                            <TextField
                                                id='subject'
                                                placeholder='Subject'
                                                variant='outlined'
                                                value={sendEmailFormik.values.subject}
                                                fullWidth
                                                size='small'
                                                onChange={sendEmailFormik.handleChange}
                                                className='mb-2'
                                                sx={{
                                                    fontSize: 12
                                                }}
                                            />
                                            <ErrorMessage formikObj={sendEmailFormik} name={'subject'} isFormSubmitted={isSendFormSubmitted}></ErrorMessage>
                                        </Grid>
                                        <Grid size={12}>
                                            <MUIAutoComplete
                                                id='emails'
                                                handleChange={(id: any, name: string) => {
                                                    sendEmailFormik.setFieldValue('toEmails', id);
                                                    // saveDataForm("", id);
                                                }}
                                                valuePassed={(sendEmailFormik.values.toEmails) ? { label: sendEmailFormik.values.toEmails, id: sendEmailFormik.values.toEmails } : {}}
                                                isMultiple={true}
                                                textToShow="To Email"
                                                width="100%"
                                                type='email'
                                                placeholder="Send Email to"
                                                freeSolo={true}
                                            />
                                        </Grid>
                                        <Grid size={6} className={`mt-1 ${sendEmailFormik.values.firstNameCheck ? '' : 'd-none'}`}>
                                            <TextField
                                                id='firstName'
                                                placeholder='First Name'
                                                variant='outlined'
                                                value={sendEmailFormik.values.firstName}
                                                fullWidth
                                                size='small'
                                                onChange={sendEmailFormik.handleChange}
                                                className='mb-2'
                                            />
                                            <ErrorMessage formikObj={sendEmailFormik} name={'firstName'} isFormSubmitted={isSendFormSubmitted}></ErrorMessage>
                                        </Grid>
                                        <Grid size={6} className={`mt-1 ${sendEmailFormik.values.lastNameCheck ? '' : 'd-none'}`}>
                                            <TextField
                                                id='lastName'
                                                placeholder='Last Name'
                                                variant='outlined'
                                                value={sendEmailFormik.values.lastName}
                                                fullWidth
                                                size='small'
                                                onChange={sendEmailFormik.handleChange}
                                                className='mb-2'
                                            />
                                            <ErrorMessage formikObj={sendEmailFormik} name={'lastName'} isFormSubmitted={isSendFormSubmitted}></ErrorMessage>
                                        </Grid>
                                        <Grid size={6} className={`mt-1 ${sendEmailFormik.values.emailCheck ? '' : 'd-none'}`}>
                                            <TextField
                                                id='email'
                                                placeholder='Email'
                                                variant='outlined'
                                                value={sendEmailFormik.values.email}
                                                fullWidth
                                                size='small'
                                                onChange={sendEmailFormik.handleChange}
                                                type="email"
                                                className='mb-2'
                                            />
                                            <ErrorMessage formikObj={sendEmailFormik} name={'email'} isFormSubmitted={isSendFormSubmitted}></ErrorMessage>
                                        </Grid>
                                        <Grid size={6} className={`mt-1 ${sendEmailFormik.values.firstNameAndLastNameCheck ? '' : 'd-none'}`}>
                                            <TextField
                                                id='firstNameAndLastName'
                                                placeholder='First Name And Last Name'
                                                variant='outlined'
                                                value={sendEmailFormik.values.firstNameAndLastName}
                                                fullWidth
                                                size='small'
                                                onChange={sendEmailFormik.handleChange}
                                                className='mb-2'
                                            />
                                            <ErrorMessage formikObj={sendEmailFormik} name={'firstNameAndLastName'} isFormSubmitted={isSendFormSubmitted}></ErrorMessage>
                                        </Grid>
                                        <Grid size={6} className={`mt-1 ${sendEmailFormik.values.signatureCheck ? '' : 'd-none'}`}>
                                            <TextField
                                                id='signature'
                                                placeholder='Signature'
                                                variant='outlined'
                                                value={sendEmailFormik.values.signature}
                                                fullWidth
                                                size='small'
                                                onChange={sendEmailFormik.handleChange}
                                                className='mb-2'
                                            />
                                            <ErrorMessage formikObj={sendEmailFormik} name={'signature'} isFormSubmitted={isSendFormSubmitted}></ErrorMessage>
                                        </Grid>
                                        <Grid size={6} className={`mt-1 ${sendEmailFormik.values.candIdCheck ? '' : 'd-none'}`}>
                                            <TextField
                                                id='candId'
                                                placeholder='Candidate ID'
                                                variant='outlined'
                                                value={sendEmailFormik.values.candId}
                                                fullWidth
                                                size='small'
                                                onChange={sendEmailFormik.handleChange}
                                                className='mb-2'
                                            />
                                            <ErrorMessage formikObj={sendEmailFormik} name={'candId'} isFormSubmitted={isSendFormSubmitted}></ErrorMessage>
                                        </Grid>
                                        <Grid size={6} className={`mt-1 ${sendEmailFormik.values.candidateLinkCheck ? '' : 'd-none'}`}>
                                            <TextField
                                                id='candidateLink'
                                                placeholder='Candidate Link'
                                                variant='outlined'
                                                value={sendEmailFormik.values.candidateLink}
                                                fullWidth
                                                size='small'
                                                onChange={sendEmailFormik.handleChange}
                                                className='mb-2'
                                            />
                                            <ErrorMessage formikObj={sendEmailFormik} name={'candidateLink'} isFormSubmitted={isSendFormSubmitted}></ErrorMessage>
                                        </Grid>
                                        <Grid size={6} className={`mt-1 ${sendEmailFormik.values.recruiterNameCheck ? '' : 'd-none'}`}>
                                            <TextField
                                                id='recruiterName'
                                                placeholder='Recruiter Name'
                                                variant='outlined'
                                                value={sendEmailFormik.values.recruiterName}
                                                fullWidth
                                                size='small'
                                                onChange={sendEmailFormik.handleChange}
                                                className='mb-2'
                                            />
                                            <ErrorMessage formikObj={sendEmailFormik} name={'recruiterName'} isFormSubmitted={isSendFormSubmitted}></ErrorMessage>
                                        </Grid>
                                    </Grid>
                                </DialogContent>
                                <DialogActions>
                                    <Button variant="outlined"
                                        type='button'
                                        color="secondary"
                                        className='mr-2'
                                        onClick={
                                            () => {
                                                setOpenSendEmail(false);
                                            }
                                        }
                                    >Cancel</Button>
                                    <Button variant="contained"
                                        type='button'
                                        color="primary"
                                        onClick={sendEmail}
                                    // disabled={}
                                    >Send Email</Button>
                                </DialogActions>
                            </Dialog>

                        </Form>
                    )
                }
            </Formik>
        </div >
    )
}

export default AddEmailBuilder;