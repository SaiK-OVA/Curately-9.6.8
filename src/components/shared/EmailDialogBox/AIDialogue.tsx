import { React, useState, useEffect, useCallback } from '../../../shared/modules/React';
import { Accordion, AccordionDetails, AccordionSummary } from '../../../shared/modules/MaterialImports/Accordion';
import { Checkbox } from '../../../shared/modules/MaterialImports/FormElements';
import { FormControlLabel } from '../../../shared/modules/MaterialImports/FormInputs';
import { Typography } from '../../../shared/modules/MaterialImports/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
// import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { TextField, IconButton, Button } from '../../../shared/modules/commonImports';
// import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';
import { Chip } from '../../../shared/modules/MaterialImports/Chip';
// import { Dialog as ReactDialog } from 'primereact/dialog';
import { confirmDialog } from "../ConfirmDialog/ConfirmDialog";
import './AIDialogue.scss';
import { showToaster } from "../SnackBar/SnackBar";
import { trackPromise } from '../../../shared/modules/PromiseTrackter';
import ApiService from "../../../shared/api/api";
import { userLocalData } from "../../../shared/services/userData";
import DoneIcon from '@mui/icons-material/Done';
import { Loader } from '../../shared/Loader/Loader';
import { debounce } from "lodash";
// import { AnyAaaaRecord } from 'dns';
import { MenuItem } from '../../../shared/modules/MaterialImports/Menu';
// import CircularProgress from '@mui/material/CircularProgress';
import USPhoneFormat from '../../../shared/utils/USPhoneFormat';
import Convert from '../../../shared/utils/Convert';
import { Stack } from '../../../shared/modules/MaterialImports/Stack';
import KeyboardDoubleArrowRight from '@mui/icons-material/KeyboardDoubleArrowRight';
import { RecruiterJobCandidate } from './RecruiterJobCandidate';


interface AIDialogProps {
    showAiDialog: boolean;
    setShowAiDialog: (value: boolean) => void;
    jobId: any;
    candidateId: any;
    contactId: any;
    handleReplaceEmailContinue: (bodyContent: any, rndSubject: any) => void;
}

type OptionType = {
    label: string;
    defaultChecked: boolean;
};

type ExpandedState = {
    [key: string]: boolean;
};

const AIDialog = ({
    showAiDialog,
    setShowAiDialog,
    jobId,
    candidateId,
    contactId,
    handleReplaceEmailContinue,
}: AIDialogProps) => {
    const [expandedd, setExpandedd] = useState<ExpandedState>({});
    const [jobCandidateRecruiterDetails, setJobCandidateRecruiterDetails] = useState<RecruiterJobCandidate>({
        Recruiter: {
            clientName: "",
            recrId: 0,
            firstName: "",
            lastName: "",
            fullName: "",
            email: "",
            phone: "",
            roleId: 0,
            roleName: "",
        },
        Candidate: {
            lastName: "",
            firstName: "",
            workHistory: [{
                endDate: "",
                companyName: "",
                jobTitle: "",
                startDate: "",
            }],
            email: "",
        },
        ClientSection: {
            client_description_section: "",
        },
        Job: {
            jobId: 0,
            jobTitle: "",
            jobdescription: "",
            workStreet: "",
            workCity: "",
            workState: "",
            workZipcode: "",
            workTimezone: "",
            estStartDate: "",
            estEndDate: "",
            jobDuration: 0,
            payRate: {
                payrateMin: 0,
                payrateMax: 0,
                payrateType: 0,
            },
        },
        Personalise: {
            personalise_section: "",
        }
    });
    const [jobCandidateOpen, setJobCandidateOpen] = useState<any>([]);
    const [personalizedEmail, setPersonalizedEmail] = useState(false);
    const [langTextOpen, setLangTextOpen] = useState<any>('');
    // const [langDescOpen, setLangDescOpen] = useState<any>('');
    const [perToneSection, setPerToneSection] = useState<any>('');
    const [perToneSectionData, setPerToneSectionData] = useState<any>('');

    const [rndSubject, setRndSubject] = useState<any>('');
    const [isEmailLoaded, setIsEmailLoaded] = useState(false);

    const [phraseEmail, setPhraseEmail] = useState(false);

    const handleCheckboxChanges = (sectionIndex: number, optionIndex: number, checked: boolean) => {
        const updatedStates = [...checkboxStates];
        updatedStates[sectionIndex][optionIndex] = checked;
        // console.log(updatedStates);
        setCheckboxStates(updatedStates);
        setPhraseEmail(false);
    };

    //http://35.155.202.216:8095/curatelyAdmin/emailOpening

    const generateDraftWithPlaceholders = (email_opening: any) => {
        const placeholderJobTitle = `<span class="placeholder" style="color: #999; font-style: italic;">Loading Job Details Section...</span>`;
        const placeholderJobDescription = `<span class="placeholder" style="color: #999; font-style: italic;">Loading Job Description...</span>`;
        const placeholderPersonalization = `<span class="placeholder" style="color: #999; font-style: italic;">Loading Personalization...</span>`;
        // const placeholderCompany = `<span class="placeholder" style="color: #999; font-style: italic;">Loading Company info...</span>`;
        const placeholderContactSection = `<span class="placeholder" style="color: #999; font-style: italic;">Loading Contact Section...</span>`;

        let longText = email_opening.split('\n').join('<br>');
        longText += `<br>${placeholderPersonalization}<br>`;
        //longText += `<br>${placeholderCompany}<br>`;
        longText += `<br>${placeholderJobTitle}<br>`;
        longText += `<br>${placeholderJobDescription}<br>`;
        longText += `<br>${placeholderContactSection}<br>`;

        return longText;
    };



    const generateDraft = (jobCandidateRecruiterDet: any, email_opening: any, firstlink: boolean, pToneSetion: any) => {
        // let jobDesc = "";

        const formatBody = email_opening;
        let longText = formatBody.split('\n').join('<br>');

        accordionData.map((section, sectionIndex) => {

            if ((section.id !== 1) && (countChecked(sectionIndex) > 0)) {
                //  if (section.id !== 4) {
                longText += `<br>`; //`<br><b>${section.title} :</b><br>`;  //
                //  }
                if (section.id === 4) {
                    if (jobCandidateRecruiterDet?.Job?.jobTitle) {
                        longText += `<br> <b>Job Title :  </b> ${jobCandidateRecruiterDet?.Job?.jobTitle} `;
                    }
                    if (jobCandidateRecruiterDet?.Job?.workCity || jobCandidateRecruiterDet?.Job?.workState || jobCandidateRecruiterDet?.Job?.workZipcode) {
                        (firstlink) ? longText += `<br><b>Job Location :  </b> ${jobCandidateRecruiterDet?.Job?.workCity},  ${jobCandidateRecruiterDet?.Job?.workState},  ${jobCandidateRecruiterDet?.Job?.workZipcode}` : "";
                    }
                    if ((jobCandidateRecruiterDet?.Job?.jobDuration > 0) && Convert.formatToDaysCount(jobCandidateRecruiterDet?.Job?.jobDuration)) {
                        (firstlink) ? longText += `<br> <b>Job Duration :  </b> ${jobCandidateRecruiterDet?.Job?.jobDuration > 0 ? Convert.formatToDaysCount(jobCandidateRecruiterDet?.Job?.jobDuration) : ""} ` : "";
                    }
                    if (jobCandidateRecruiterDet?.Job?.payRate.payrateMin || jobCandidateRecruiterDet?.Job?.payRate.payrateMax || jobCandidateRecruiterDet?.Job?.payRate.payrateType) {
                        (firstlink) ? longText += `<br> <b>Pay Rate :  </b> ${jobCandidateRecruiterDet?.Job?.payRate.payrateMin} -  ${jobCandidateRecruiterDet?.Job?.payRate.payrateMax}  ${jobCandidateRecruiterDet?.Job?.payRate.payrateType === 1 ? '/ Hour' : jobCandidateRecruiterDet?.Job?.payRate.payrateType === 2 ? '/ Day' : jobCandidateRecruiterDet?.Job?.payRate.payrateType === 3 ? '/ Week' : jobCandidateRecruiterDet?.Job?.payRate.payrateType === 4 ? '/ Month' : jobCandidateRecruiterDet?.Job?.payRate.payrateType === 5 ? '/ Year' : jobCandidateRecruiterDet?.Job?.payRate.payrateType === 6 ? '/ Milestone' : jobCandidateRecruiterDet?.Job?.payRate.payrateType === 7 ? '/ Project' : ''} ` : "";
                    }
                }
                if (section.id === 6) {
                    if (jobCandidateRecruiterDet?.Recruiter?.fullName) {
                        (firstlink) ? longText += `<br> ${jobCandidateRecruiterDet?.Recruiter?.fullName} ` : "";
                    }
                    if (jobCandidateRecruiterDet?.Recruiter?.email) {
                        (firstlink) ? longText += `<br> ${jobCandidateRecruiterDet?.Recruiter?.email} ` : "";
                    }
                    if (jobCandidateRecruiterDet?.Recruiter?.phone) {
                        (firstlink) ? longText += `<br> ${USPhoneFormat.get(jobCandidateRecruiterDet?.Recruiter?.phone)} ` : "";
                    }
                }
                if (section.id === 3) {
                    (firstlink) ? longText += `<br> ${jobCandidateRecruiterDet?.ClientSection?.client_description_section} ` : "";
                }
                if (section.id === 2) {
                    //  longText += `<br><b>${section.title} :</b><br>`; loading
                    ((pToneSetion !== "") && (pToneSetion === "loading")) ?
                        longText += `<br><span class="placeholder" style="color: #999; font-style: italic;">Loading Personalization...</span>` : (pToneSetion !== "") ? longText += `<br>${pToneSetion.trim()}`
                            : longText += `<br>${jobCandidateRecruiterDet?.Personalise?.personalise_section.trim()}`;

                } else {

                    section.options.map((option: OptionType, optionIndex: number) => {
                        if (checkboxStates[sectionIndex][optionIndex]) {
                            const selectedOption = accordionData[sectionIndex].options[optionIndex];
                            if ((selectedOption.label.trim() !== "Job Title") && (selectedOption.description.trim() !== "") && (!firstlink)) longText += `<br>${selectedOption.description.trim()}`;
                        }
                    });

                    if (section.id === 4) {
                        longText += `<br><br>${jobCandidateRecruiterDet?.Job?.jobdescription.trim()}`;
                    }
                }

            }
        });
        longText += `<br><br><br>`;
        const arrayTitle = [`Unlock Your Potential: Join Us as ${jobCandidateRecruiterDet?.Job?.jobTitle}`,
        `Exciting Career Move: ${jobCandidateRecruiterDet?.Job?.jobTitle} Role Open!`,
        `Your Next Big Opportunity: ${jobCandidateRecruiterDet?.Job?.jobTitle} Position Available`,
        `Explore a New Challenge: Become Our ${jobCandidateRecruiterDet?.Job?.jobTitle}`,
        `We are Hiring: Exciting ${jobCandidateRecruiterDet?.Job?.jobTitle} Position Awaits You`,
        `Step Up Your Career: ${jobCandidateRecruiterDet?.Job?.jobTitle} Opportunity`,
        `Be Part of Our Team: ${jobCandidateRecruiterDet?.Job?.jobTitle} Role Open`,
        `Advance Your Career with Us: ${jobCandidateRecruiterDet?.Job?.jobTitle} Position`,
        `New Opportunity: Join Us as ${jobCandidateRecruiterDet?.Job?.jobTitle}`,
        `Take the Next Step: ${jobCandidateRecruiterDet?.Job?.jobTitle} Role Available`]

        const randomIndex = Math.floor(Math.random() * arrayTitle.length);

        setRndSubject(arrayTitle[randomIndex])
        setIsEmailLoaded(true);
        handleReplaceEmailContinue(longText, arrayTitle[randomIndex]);
        setPhraseEmail(true);
        //  console.log(longText);
        setLangTextOpen(longText);
        setPersonalizedEmail(false);
    }

    const generateRePhraseDraft = (langTextOpen: any) => {
        setIsEmailLoaded(false);
        const data = {
            "text": langTextOpen ? langTextOpen.split('<br>').join('\n') : ""
        }

        trackPromise(
            ApiService.postWithData('admin', 'rephrase', data).then((response: any) => {

                if (response.data.Success) {
                    let lText = response.data?.response?.rephrased_text;

                    lText = lText.split('\n').join('<br>');

                    if (lText.trim() === "") {
                        showToaster(`Re-Phrase Data not returned properly. please try again!`, 'error');
                        return false;
                    }
                    setIsEmailLoaded(true);
                    handleReplaceEmailContinue(lText, rndSubject);
                    setPhraseEmail(true);
                    setLangTextOpen(lText);
                } else {
                    console.log("Failed to get Re-Phrase Details");
                }
            }).catch(error => {
                console.log("Re-Phrase : " + error.message);
            })
        );
    };

    const generateCandidateDraft = useCallback(
        debounce(() => {
            setIsEmailLoaded(false);
            const data = {
                "jobId": jobId ? jobId : "",
                "candId": candidateId ? candidateId : "",
                "clientId": userLocalData.getvalue('clientId'),
                "recrId": userLocalData.getvalue('recrId'),
            }

            trackPromise(
                ApiService.postWithData('admin', 'emailOpening', data).then((response: any) => {

                    if (response.data.Success) {
                        setJobCandidateOpen(response.data?.response?.email_opening);

                        handleReplaceEmailContinue(generateDraftWithPlaceholders(response.data?.response?.email_opening), "");

                        getJobCandidateRecruiterDetails(response.data?.response?.email_opening);
                    } else {
                        console.log("Failed to get email opening");
                    }
                }).catch(error => {
                    console.log("Candidate Email Open : " + error.message);
                })
            );
        }, 600),
        []
    );

    const getJobCandidateRecruiterDetails = (email_opening: any) => {
        const data = {
            "jobId": jobId ? jobId : "",
            "candId": candidateId ? candidateId : "",
            "mode": "c",
            "clientId": userLocalData.getvalue('clientId'),
            "recrId": userLocalData.getvalue('recrId'),
            "action": "get",
            "userId": candidateId ? candidateId : "",
        }
        trackPromise(
            ApiService.postWithData('admin', 'getJobCandidateRecruiterDetails', data).then((response: any) => {
                //  console.log(response.data?.output);
                if (response.data.Success) {
                    const respData = {
                        Recruiter: {
                            clientName: response.data?.output?.Recruiter?.clientName ? response.data?.output?.Recruiter.clientName : "",
                            recrId: response.data?.output?.Recruiter?.recrId ? response.data?.output?.Recruiter.recrId : "",
                            firstName: response.data?.output?.Recruiter?.firstName ? response.data?.output?.Recruiter.firstName : "",
                            lastName: response.data?.output?.Recruiter?.lastName ? response.data?.output?.Recruiter.lastName : "",
                            fullName: response.data?.output?.Recruiter?.fullName ? response.data?.output?.Recruiter.fullName : "",
                            email: response.data?.output?.Recruiter?.email ? response.data?.output?.Recruiter.email : "",
                            phone: response.data?.output?.Recruiter?.phone ? response.data?.output?.Recruiter.phone : "",
                            roleId: response.data?.output?.Recruiter?.roleId ? response.data?.output?.Recruiter.roleId : "",
                            roleName: response.data?.output?.Recruiter?.roleName ? response.data?.output?.Recruiter.roleName : "",
                        },
                        Candidate: {
                            lastName: response.data?.output?.Candidate?.lastName ? response.data?.output?.Candidate.lastName : "",
                            firstName: response.data?.output?.Candidate?.firstName ? response.data?.output?.Candidate.firstName : "",
                            workHistory: response.data?.output?.Candidate?.workHistory?.length ? response.data?.output?.Candidate.workHistory : [],
                            email: response.data?.output?.email ? response.data?.output.email : "",
                        },
                        ClientSection: {
                            client_description_section: response.data?.output?.ClientSection?.client_description_section ? response.data?.output?.ClientSection.client_description_section : "",
                        },
                        Job: {
                            jobId: response.data?.output?.Job?.jobId ? response.data?.output?.Job.jobId : "",
                            jobTitle: response.data?.output?.Job?.jobTitle ? response.data?.output?.Job.jobTitle : "",
                            jobdescription: response.data?.output?.Job?.jobdescription ? response.data?.output?.Job.jobdescription : "",
                            workStreet: response.data?.output?.Job?.workStreet ? response.data?.output?.Job.workStreet : "",
                            workCity: response.data?.output?.Job?.workCity ? response.data?.output?.Job.workCity : "",
                            workState: response.data?.output?.Job?.workState ? response.data?.output?.Job.workState : "",
                            workZipcode: response.data?.output?.Job?.workZipcode ? response.data?.output?.Job.workZipcode : "",
                            workTimezone: response.data?.output?.Job?.workTimezone ? response.data?.output?.Job.workTimezone : "",
                            estStartDate: response.data?.output?.Job?.estStartDate ? response.data?.output?.Job.estStartDate : "",
                            estEndDate: response.data?.output?.Job?.estEndDate ? response.data?.output?.Job.estEndDate : "",
                            jobDuration: response.data?.output?.Job?.jobDuration ? response.data?.output?.Job.jobDuration : "",
                            payRate: {
                                payrateMin: response.data?.output?.Job?.payrateMin ? response.data?.output?.Job.payrateMin : "",
                                payrateMax: response.data?.output?.Job?.payrateMax ? response.data?.output?.Job.payrateMax : "",
                                payrateType: response.data?.output?.Job?.payrateType ? response.data?.output.payrateType : "",
                            },
                        },
                        Personalise: {
                            personalise_section: response.data?.output?.Personalise?.personalise_section ? response.data?.output?.Personalise.personalise_section : "",
                        }
                    }
                    setJobCandidateRecruiterDetails(respData);
                    generateDraft(respData, email_opening, true, "");
                } else {
                    console.log("Failed to get JobCandidateRecruiterDetails");
                }
            }).catch(error => {
                console.log("Job Candidate Details : " + error.message);
            })
        );
    };


    const accordionData = [
        {
            id: 1,
            title: 'About You',
            options: [
                { sno: 1, label: 'Name', defaultChecked: true, description: 'This is your name.' },
                { sno: 2, label: 'Company', defaultChecked: true, description: 'This is the company you work for.' },
                { sno: 3, label: 'Position', defaultChecked: true, description: 'This is your position in the company.' }
            ]
        },

        {
            id: 2,
            title: 'Personalization',
            options: [
                //   {sno: 6, label: 'Skills', defaultChecked: true, description: 'These are the skills.' },
                { sno: 1, label: 'Job Title', defaultChecked: true, description: 'This is the job title.' },
                { sno: 2, label: 'Company', defaultChecked: true, description: 'This is the company.' },
                // {sno: 3, label: 'Location', defaultChecked: true, description: 'This is the location.' },
                // {sno: 4, label: 'Career Objective', defaultChecked: true, description: 'This is the career objective.' },
                // {sno: 5, label: 'Recent 2 Job Description', defaultChecked: true, description: 'These are the descriptions of the recent 2 jobs.' }
            ]
        },
        {
            id: 3,
            title: 'Company Info',
            options: [
                { sno: 1, label: 'About Company', defaultChecked: false, description: `${jobCandidateRecruiterDetails?.ClientSection?.client_description_section}` }
            ]
        },
        {
            id: 4,
            title: 'Job Details',
            options: [
                // {label: 'Job Name', defaultChecked: false, description: 'Job Name :  {{ Contact JobTitile }}' },
                { sno: 1, label: 'Job Title', defaultChecked: true, description: `<b>Job Title : </b>  ${jobCandidateRecruiterDetails?.Job?.jobTitle}` },
                {
                    sno: 2, label: 'Job Location', defaultChecked: false, description: `<b>Job Location :</b> ${jobCandidateRecruiterDetails?.Job?.workCity} ${jobCandidateRecruiterDetails?.Job?.workState} ${jobCandidateRecruiterDetails?.Job?.workZipcode}`
                },
                { sno: 3, label: 'Job Duration', defaultChecked: false, description: `<b>Job Duration : </b>  ${jobCandidateRecruiterDetails?.Job?.jobDuration > 0 ? Convert.formatToDaysCount(jobCandidateRecruiterDetails?.Job?.jobDuration) : ""} ` },

                { sno: 4, label: 'Pay Rate', defaultChecked: false, description: `<b>Pay Rate : </b>  ${jobCandidateRecruiterDetails?.Job?.payRate.payrateMin} -  ${jobCandidateRecruiterDetails?.Job?.payRate.payrateMax}  ${jobCandidateRecruiterDetails?.Job?.payRate.payrateType === 1 ? '/ Hour' : jobCandidateRecruiterDetails?.Job?.payRate.payrateType === 2 ? '/ Day' : jobCandidateRecruiterDetails?.Job?.payRate.payrateType === 3 ? '/ Week' : jobCandidateRecruiterDetails?.Job?.payRate.payrateType === 4 ? '/ Month' : jobCandidateRecruiterDetails?.Job?.payRate.payrateType === 5 ? '/ Year' : jobCandidateRecruiterDetails?.Job?.payRate.payrateType === 6 ? '/ Milestone' : jobCandidateRecruiterDetails?.Job?.payRate.payrateType === 7 ? '/ Project' : ''} ` },

                // {label: 'Job Duration', defaultChecked: false, description: 'Job Duration : {{ Job Duration }}' }
            ]
        },
        // {
        //     id: 3,
        //     title: 'Candidate Profile',
        //     options: [
        //         //  { label: 'Client/Company Name', defaultChecked: false, description: 'Client/Company Name : {{Company Name}}' },
        //         //   { label: 'Title', defaultChecked: false, description: 'Title : {{Title}}' },
        //         //  { label: 'Skills', defaultChecked: false, description: 'Skills : {{Skills}}' },
        //         //  { label: 'Location', defaultChecked: false, description: 'Location : {{Location}}' }
        //     ]
        // },

        {
            id: 5,
            title: 'Job Description',
            options: [
                //   { label: 'Job Requirement', defaultChecked: false, description: `Job Requirement : ${clientDescriptionSection} ` },
                //   { label: 'CTA with Attachment', defaultChecked: false, description: 'CTA with Attachment :   {{CTA with Attachment}}' },
                //   { label: 'CTA without Attachment', defaultChecked: false, description: 'CTA without Attachment :   {{CTA without Attachment}}' }
            ]
        },
        {
            id: 6,
            title: 'Contact Section',
            options: [
                { sno: 1, label: 'Recruiter Name', defaultChecked: false, description: `${jobCandidateRecruiterDetails?.Recruiter?.fullName}` },
                { sno: 2, label: 'Email', defaultChecked: false, description: `${jobCandidateRecruiterDetails?.Recruiter?.email}` },
                { sno: 3, label: 'Phone', defaultChecked: false, description: `${USPhoneFormat.get(jobCandidateRecruiterDetails?.Recruiter?.phone)}` }
            ]
        }
    ];

    const [checkboxStates, setCheckboxStates] = useState(() => {
        return accordionData.map(section => section.options.map(option => option.defaultChecked = true));
    })



    useEffect(() => {
        const updatedStates = [...checkboxStates];
        updatedStates[2][0] = false;
        // console.log(updatedStates);
        setCheckboxStates(updatedStates);

        generateCandidateDraft();
    }, []);


    const closeAiDialog = () => {
        setShowAiDialog(false);
    };

    const handleExpandCollapseAll = () => {
        if (Object.keys(expandedd).length === accordionData.length) {
            setExpandedd({});
        } else {
            const allExpanded: ExpandedState = {};
            accordionData.forEach((_, index) => {
                allExpanded[`panel${index}`] = true;
            });
            setExpandedd(allExpanded);
        }
    };

    const handleResetDefaults = () => {
        setCheckboxStates(accordionData.map(section => section.options.map(option => option.defaultChecked)));
    };

    const handleAccordionChanges = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpandedd({
            ...expandedd,
            [panel]: isExpanded,
        });
    };

    const handlePerToneSection = (e: any) => {
        let perToneSetion = e.target.value;
        setPerToneSection(perToneSetion);
        const data =
        {
            "jobId": jobId ? jobId : "",
            "candId": candidateId ? candidateId : "",
            "clientId": userLocalData.getvalue('clientId'),
            "tonality": perToneSetion ? perToneSetion : "",
        }
        generateDraft(jobCandidateRecruiterDetails, jobCandidateOpen, true, "loading");

        trackPromise(
            ApiService.postWithData('admin', 'getPersonalise', data).then((response: any) => {
                //  console.log(response.data);
                if (response.data.Success) {
                    let perSection = response.data?.response?.personalise_section;

                    setPerToneSectionData(response.data?.response?.personalise_section);
                    generateDraft(jobCandidateRecruiterDetails, jobCandidateOpen, true, perSection);
                    //setPhraseEmail(false);

                } else {
                    console.log("Failed to get Personalise");
                }
            }).catch(error => {
                console.log("Personalise : " + error.message);
            })
        );
    };


    const countChecked = (sectionIndex: any) => {
        return checkboxStates[sectionIndex].filter(checked => checked).length;
    };


    // const footer = (
    //     <footer className='generate-button'  >
    //         <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
    //             <Button
    //                 variant="outlined"
    //                 color="primary"
    //                 startIcon={<AutoFixHighOutlinedIcon />}
    //                 onClick={() => {
    //                     phraseEmail ?
    //                         generateRePhraseDraft(langTextOpen)
    //                         :
    //                         confirmDialog(`The selected email body content will replace the current content. Do you want to proceed?`, () => {
    //                             generateDraft(jobCandidateRecruiterDetails, jobCandidateOpen, false, perToneSectionData);
    //                         });

    //                     setPersonalizedEmail(false);
    //                 }}
    //             >
    //                 Regenerate Draft
    //             </Button>
    //             {/* <Button
    //                 variant="outlined"
    //                 color="primary"
    //                 startIcon={<AutoFixHighOutlinedIcon />}
    //                 onClick={() => {
    //                     generateRePhraseDraft(langTextOpen);
    //                     setPersonalizedEmail(false);
    //                 }}
    //             >
    //                 Re-Phrase
    //             </Button> */}
    //         </div>
    //     </footer>
    // );


    // const header = (
    //     <div className="inline-flex align-items-center justify-content-between gap-2 top-0" style={{
    //         padding: '8px',
    //         border: '1px solid #ddd',
    //         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    //         opacity: '0.95',
    //         borderRadius: '4px',
    //         position: 'absolute',
    //         top: 0,
    //         left: 0,
    //         right: 0,
    //         width: '100%',
    //         backgroundColor: 'white',
    //         zIndex: 1
    //     }}>
    //         <Grid container alignItems="center" style={{ position: 'relative' }}>
    //             <Grid >
    //                 <DragIndicatorIcon fontSize="medium" sx={{ paddingLeft: '5px' }} />
    //             </Grid>
    //             {/* <Grid >
    //                 <AutoFixHighOutlinedIcon fontSize="medium" sx={{ paddingLeft: '2px' }} />
    //             </Grid> */}
    //             <Grid style={{ flexGrow: 1, textAlign: 'center' }}>
    //                 <h2 className="ai-dialog-title">Write with AI</h2>
    //             </Grid>
    //             <Grid >
    //                 <IconButton aria-label="close" onClick={closeAiDialog}>
    //                     <CloseIcon />
    //                 </IconButton>
    //             </Grid>
    //         </Grid>
    //     </div>
    // );

    const footer = (
        <Stack alignItems={"center"} justifyContent={"center"} borderTop={"1px solid #cccccc"} py={1.5}
            borderRadius={"0px 0px 4px 4px"}
        // bgcolor={"var(--c-primary-20)"}
        >
            <Button variant="outlined"
                color="primary"
                startIcon={<AutoFixHighOutlinedIcon />}
                onClick={() => {
                    phraseEmail ?
                        generateRePhraseDraft(langTextOpen)
                        :
                        confirmDialog(`The selected email body content will replace the current content. Do you want to proceed?`, () => {
                            generateDraft(jobCandidateRecruiterDetails, jobCandidateOpen, false, perToneSectionData);
                        });

                    setPersonalizedEmail(false);
                }}

                sx={{
                    borderColor: "#7e57c2",
                    color: "#7e57c2",
                    marginleft: "8px",
                    "&:hover": {
                        bgcolor: "#7e57c2",
                        color: "#FFFFFF"
                    }
                }}
            >
                Regenerate Draft

            </Button>
        </Stack>
    )
    const header = (
        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}
            py={0.75} px={1} borderBottom={"1px solid #cccccc"}
            borderRadius={"4px 4px 0px 0px"}
        // bgcolor={"var(--c-primary-20)"}
        >
            <Typography variant='subtitle1' className="ai-dialog-title">Write with AI</Typography>
            <IconButton aria-label="close" onClick={closeAiDialog} size='small'>
                <KeyboardDoubleArrowRight />
            </IconButton>
        </Stack>
    );

    return (
        // <ReactDialog className='AIDialogue'
        //     header={header}
        //     visible={showAiDialog}
        //     //  style={{ width: '24%', height: 'calc(100% - 65px)', zIndex: 1050 }}
        //     onHide={closeAiDialog}
        //     position="left"
        //     modal={false}
        //     closable={false}
        //     footer={footer}
        //     maskClassName='AIDialogueMask'
        // >
        <>
            <header>{header}</header>
            <div className='AIDialogue'>
                <div className='dialogtop'>
                    <div>
                        <h4>Personalized Email</h4>
                        <div className='headercontent'>Select fields to include in your message. Some fields are required and can't be deselected</div>
                    </div>
                    {personalizedEmail ? (
                        <div>
                            <div className='headerbutton' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button variant="text" size='small' onClick={handleResetDefaults}>
                                    Reset Defaults
                                </Button>
                                <Button variant="text" size='small' onClick={handleExpandCollapseAll}>
                                    {Object.keys(expandedd).length === accordionData.length ? 'Collapse All' : 'Expand All'}
                                </Button>
                            </div>
                            <div className='accordian-wrap'>
                                {accordionData.map((accordion, sectionIndex) => (
                                    <Accordion
                                        key={sectionIndex}
                                        expanded={expandedd[`panel${sectionIndex}`] ?? false}
                                        onChange={handleAccordionChanges(`panel${sectionIndex}`)}
                                        className={`accordion_header ${(accordion.id === 6) || (accordion.id === 5) ? "d-none" : ""}`}
                                    >
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls={`panel${sectionIndex}-content`}
                                            id={`panel${sectionIndex}-header`}
                                        >
                                            <Typography style={{ fontWeight: 700 }}>{accordion.title}</Typography>
                                            <span className='accordion_header_count'>
                                                {countChecked(sectionIndex)}
                                            </span>
                                        </AccordionSummary>
                                        <AccordionDetails className='accordion_details' style={{ display: 'flex', flexDirection: 'column' }}>
                                            {accordion.options.map((option: OptionType, optionIndex: number) => (
                                                <FormControlLabel
                                                    key={optionIndex}
                                                    control={
                                                        <Checkbox
                                                            checked={checkboxStates[sectionIndex][optionIndex]}
                                                            onChange={(e) => handleCheckboxChanges(sectionIndex, optionIndex, e.target.checked)}
                                                            disabled={option.defaultChecked}
                                                        />
                                                    }
                                                    label={option.label}
                                                />
                                            ))}
                                        </AccordionDetails>
                                    </Accordion>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h4>Applied Filters</h4>
                            <div >
                                {accordionData.map((accordion, sectionIndex) => (
                                    <div key={sectionIndex} className={`accordion_details_border ${(accordion.id === 6) || (accordion.id === 5) ? "d-none" : ""}`} >
                                        <Typography style={{ fontWeight: "500", }}>{accordion.title}</Typography>
                                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                            {accordion.options.map((option: OptionType, optionIndex: number) => (
                                                <>
                                                    {(checkboxStates[sectionIndex][optionIndex]) ?
                                                        <Chip
                                                            key={optionIndex}
                                                            label={option.label}
                                                            icon={option.defaultChecked ? <DoneIcon style={{ height: '14px' }} className=' iconcolor' /> : <DoneIcon style={{ height: '14px' }} className='iconcolor_active' onClick={() => handleCheckboxChanges(sectionIndex, optionIndex, false)} />}
                                                            onClick={() => !option.defaultChecked && handleCheckboxChanges(sectionIndex, optionIndex, false)}
                                                            // onDelete={() => !option.defaultChecked && handleCheckboxChanges(sectionIndex, optionIndex, false)}
                                                            className={option.defaultChecked ? 'btnCursor_default' : 'btnCursor_pointer_active iconcolor'}
                                                        />
                                                        :
                                                        <Chip
                                                            key={optionIndex}
                                                            label={option.label}
                                                            icon={<AddIcon style={{ height: '14px' }} className='iconcolor_cursor' />}
                                                            onClick={() => handleCheckboxChanges(sectionIndex, optionIndex, true)}
                                                            className='btnCursor_pointer'
                                                        />
                                                    }
                                                </>
                                            ))}

                                        </div>
                                    </div>

                                ))}
                                <div className={`accordion_details_border `} >
                                    <Typography style={{ fontWeight: "500", }}>Personalize Tone </Typography>
                                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                        <TextField
                                            id="perToneSection"
                                            size="small"
                                            select
                                            onChange={(e) => handlePerToneSection(e)}
                                            value={perToneSection}
                                            fullWidth
                                            className="mailInputs"
                                        // sx={{ fontSize: 12, width: 150 }}
                                        >
                                            <MenuItem value=""></MenuItem>
                                            <MenuItem value="Professional">Professional</MenuItem>
                                            <MenuItem value="Casual">Casual</MenuItem>
                                            <MenuItem value="Enthusiastic">Enthusiastic</MenuItem>
                                            <MenuItem value="Persuasive">Persuasive</MenuItem>
                                            <MenuItem value="Friendly">Friendly</MenuItem>
                                        </TextField>

                                    </div>
                                </div>
                                <Typography variant="body1" style={{ display: 'flex', alignItems: 'center' }}>
                                    <InfoIcon style={{ marginRight: '8px' }} />
                                    Message is drafted with AI using data from the job post, recruiter profile, and candidate profile
                                </Typography>
                            </div>

                            {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>

                            <Button variant="contained" size='small' onClick={() => applyDraft()}  >
                                Draft Again
                            </Button>
                        </div> */}
                        </div>
                    )}
                </div>
                <Loader />
            </div>
            <footer>{footer}</footer>
        </>
        // </ReactDialog>
    );
};

export default AIDialog;
