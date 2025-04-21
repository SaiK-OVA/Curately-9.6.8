import { useContext } from 'react';
import { React, useState, Fragment, useRef, useEffect } from '../../../../shared/modules/React';
import { Grid, Button, IconButton, InputLabel } from "../../../../shared/modules/commonImports";
// import Stack from "@mui/material/Stack";
import { Box } from "../../../../shared/modules/MaterialImports/Box";
import { TextField, FormControlLabel, FormControl } from '../../../../shared/modules/MaterialImports/FormInputs';
// import { TextFieldProps } from '@mui/material/TextField';
import { MenuItem } from '../../../../shared/modules/MaterialImports/Menu';
// import Checkbox from '@mui/material/Checkbox';
import { Tabs, Tab } from '../../../../shared/modules/MaterialImports/Tabs';
import { Radio, RadioGroup } from '../../../../shared/modules/MaterialImports/FormElements';
// import FormLabel from '@mui/material/FormLabel';
import { Divider } from '../../../../shared/modules/MaterialImports/Divider';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ViewWorkflow from "../View/AssignWorkflow/ViewWorkflow";
// import InputAdornment from '@mui/material/InputAdornment';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

import { useFormik, Yup } from "../../../../shared/modules/Formik";
import { showToaster } from '../../../shared/SnackBar/SnackBar';
import ApiService from '../../../../shared/api/api';
// import updateDocumentTitle from '../../../../shared/services/title';
import { MUIAutoComplete } from '../../../shared/MUIAutoComplete/MUIAutoComplete';
import Editor from '../../../shared/EmailDialogBox/EmailBody';
import ErrorMessage from '../../../shared/Error/ErrorMessage';
import { Dialog, DialogContent, DialogTitle, DialogActions } from '../../../../shared/modules/MaterialImports/Dialog';
import { DatePicker, AdapterLuxon, LocalizationProvider } from '../../../../shared/modules/MaterialImports/DatePicker';
import { TimePicker } from '@mui/x-date-pickers';
import { DateTime } from '../../../../shared/modules/Luxon';
import { ToggleButton, ToggleButtonGroup } from '../../../../shared/modules/MaterialImports/ToggleButton';
import { trackPromise } from "../../../../shared/modules/PromiseTrackter";
import { userLocalData } from "../../../../shared/services/userData";
// import { globalData } from "../../../../shared/services/globalData";
// import LinearProgress from "@mui/material/LinearProgress";

import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import { Loader } from "../../../shared/Loader/Loader";
import masterStatesList from "../../../../shared/data/States";
import { Stack } from "../../../../shared/modules/MaterialImports/Stack";
import FormContainer from "../../Letters/Workflow/FormBuilder/forms/FormContainer";
import { FormStore } from "../../../../App";
import AssignWorkflow from "../View/AssignWorkflow/AssignWorkflow";
import { AssignWorkflowInterface } from "../View/AssignWorkflow/AssignWorkflowInterface";
import Parsable from "../../../../shared/utils/Parsable";
// import masterJobStatus from "../../../../shared/data/JobStatus";
import { Typography } from "../../../../shared/modules/MaterialImports/Typography";

import masterJobData from '../../../../shared/data/Job/Job';
import { ID_SETTINGS_FORMATJD } from '../../../../shared/services/Permissions/IDs';

// import masterJobPriority from "../../../../shared/data/JobPriority";
import './AddJob.scss';
import JobFormData from '../../../../shared/data/JobFormData';
import { confirmDialog } from '../../../shared/ConfirmDialog/ConfirmDialog';
// import ModuleForm from "../../Settings/CustomForms/ModuleForm/ModuleForm";
// import { shallow } from 'zustand/shallow';
// import useFormBuilderStore, { FORMBUILDER_STATE } from "../../../../shared/store/FormBuilderStore";


// const formBuilderSelector = (state: FORMBUILDER_STATE) => ({
//     formData: state.formData,
//     setFormData: state.setFormData
// });

// import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
// import EmailIcon from '@mui/icons-material/Email';
// import LanguageIcon from '@mui/icons-material/Language';


// interface BoardData {
//     boardId: string,
//     boardImage: string,
//     boardName: string,
//     subscribe: boolean
// }


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const StaffingMarkup = {
    '463' : 29,
    'LI' : 31,
    'Production' : 31,
    '39' : 35,
    '490' : 35,
    '496' : 35,
    'R&D' : 35,
    '59' : 35,
}

const DirectSourcingMarkup = {
    '463' : 26,
    'LI' : 28,
    'Production' : 30,
    '39' : 32,
    '490' : 32,
    '496' : 32,
    'R&D' : 32,
    '59' : 32,
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`addJobTabsPanel-${index}`}
            aria-labelledby={`addJobTabsPanel-${index}`}
            {...other}
            className='addJobTabsPanel customTabsPanel'
        >
            {/* {value === index && ( */}
            <div className={`${value === index ? "" : "d-none"}`}>{children}</div>
            {/* )} */}
        </div>
    );
}

function tabProperties(index: number) {
    return {
        id: `companyTabs-${index}`,
        'aria-controls': `addJobTabsPanel-${index}`,
    };
}

const AddJob = (
    { open, closePopup, add, jobData }: {
        open: boolean;
        closePopup: (addOrCancel: string) => void;
        add: boolean;
        jobData: any;
    }
) => {


    const isCareerPortalEnabled = userLocalData.adminSettings(20005);
    const isWorkflowEnabled = userLocalData.adminSettings(20025);
    const isFormatJDEnabled = userLocalData.adminSettings(ID_SETTINGS_FORMATJD);
    // const [boardsData, setBoardsData] = useState<BoardData[]>([
    //     {
    //         boardId: "1",
    //         boardImage: 'https://www.google.co.in/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
    //         boardName: 'Google',
    //         subscribe: true
    //     },
    //     {
    //         boardId: "2",
    //         boardImage: 'https://gdm-catalog-fmapi-prod.imgix.net/ProductLogo/9255f59a-e07f-4de6-b5c0-9d4fb6e9e8e5.png?w=100&q=50',
    //         boardName: 'Indeed',
    //         subscribe: false
    //     },
    // ])

    // const handleBoard = (id: string, status: boolean) => {
    //     let tempJobBoards = [...boardsData];
    //     let index = tempJobBoards.findIndex(jobs => jobs.boardId === id);
    //     if (index !== -1) {
    //         tempJobBoards[index].subscribe = status;
    //         setBoardsData([...tempJobBoards]);
    //     }

    // }
    // const columns: MRT_ColumnDef<any>[] = useMemo(
    //     () => [
    //         {
    //             accessorKey: 'boardName',
    //             header: 'Board Name',
    //             Cell: ({ row }) => (
    //                 <div>
    //                     <Grid direction={"row"}>
    //                         <Grid
    //                             container
    //                             direction="row"
    //                             justifyContent="flex-start"
    //                             alignItems="center"
    //                         >
    //                             <span><img src={row.original.boardImage} style={{ width: '80px', height: '30px' }} /></span>
    //                             <span className="pl-5 boardName">{row.original.boardName}</span>
    //                         </Grid>
    //                     </Grid>
    //                 </div>
    //             )
    //         },
    //         {
    //             accessorKey: "actions",
    //             header: "Actions",
    //             Cell: ({ row }) => (
    //                 <div>
    //                     <Grid direction={"row"}>
    //                         <Button><LanguageIcon /></Button>
    //                         <Button className="email"><EmailIcon /></Button>
    //                         {row.original.subscribe ?
    //                             <span><Button variant="outlined" className="unPub" onClick={() => handleBoard(row.original.boardId, false)}>Unpublish</Button></span>
    //                             : <span><Button variant="outlined" className="pub" onClick={() => handleBoard(row.original.boardId, true)}>Publish</Button></span>}
    //                     </Grid >
    //                 </div >
    //             )
    //         },
    //     ], []);


    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    // const [formatDays, SetFormatDays] = React.useState(() => ['MON']);
    // const [startTime, setStartTime] = React.useState<Dayjs | null>(dayjs.utc('2022-04-17T15:30'),);
    // const [endTime, setEndTime] = React.useState<Dayjs | null>(dayjs.utc('2022-04-17T15:30'),);
    // submissionsAllowed
    // mspCoordinator
    // costCenterNumber
    // businessUnit
    // const [jobForm, setJobForm] = useState();
    // {
    //     workingDaysWeek: [{
    //         days: [],
    //         startTime: DateTime.local(),
    //         endTime: DateTime.local(),
    //         timeZone: '',
    //         shiftId: 0
    //     }]
    // }

    const [formData, setFormData] = useContext(FormStore);
    // const { formData, setFormData } = useFormBuilderStore(formBuilderSelector, shallow); 


    const getFormattedJD = async (description?: string) => {
        description = description ? description : addJobFormik.values.publicDescription
        if (description) {

            const formData = {
                "description": description,
            }

            trackPromise(
                ApiService.postWithData('admin', `getJobFormatDescription`, formData).then((response) => {
                    //   setFormattedJD(response?.data?.formatted_job_description || {})
                    const updatedResponse = response?.data?.formatted_job_description || {};

                    const targetBadRequest = updatedResponse.includes('Bad Request');
                    if (targetBadRequest) {
                        showToaster("Something went wrong! Please update Job Description", "error")
                        console.log("Something went wrong! Please update Job Description")
                    } else {
                        addJobFormik.setFieldValue('publicDescription', updatedResponse);
                    }
                    //  addJobFormik.setFieldValue('publicDescription', updatedResponse);

                    // let dataFormatted = Object.keys(updatedResponse).map((each: any, index) => (
                    //     {
                    //         title: typeof updatedResponse[each] === "object" ? (updatedResponse[each]?.title || each.replaceAll("_", " ")) : each.replaceAll("_", " "),
                    //         description: typeof updatedResponse[each] === "object" ? (updatedResponse[each]?.description || "") : (updatedResponse[each] || "")
                    //     }
                    // ))
                    // let dataView = ""; let dataEducation = "";
                    // for (let td = 0; td < dataFormatted.length; td++) {

                    //     if ((dataFormatted[td].title === "Education") || (dataFormatted[td].title === "education")) {
                    //         dataEducation += '<p><b>' + dataFormatted[td].title + '</b></p>';
                    //         dataEducation += '<p>' + dataFormatted[td].description + '</p><br />';
                    //     } else if (dataFormatted[td].description) {
                    //         dataView += '<p><b>' + dataFormatted[td].title + '</b></p>';
                    //         dataView += '<p>' + dataFormatted[td].description + '</p><br />';
                    //     }
                    // }
                    // dataView += dataEducation;
                    // console.log("dataView", dataView)
                    // addJobFormik.setFieldValue('publicDescription', updatedResponse);
                })

            )
        } else showToaster("Something went wrong! Please enter Job Description", "error")
    }



    const handleScheduleChange = (index: any, field: any, value: any) => {
        let tempJobFormik = [
            ...addJobFormik.values.jobShift
        ]
        if (field && value) {
            tempJobFormik[index][field] = value;
            addJobFormik.setFieldValue('jobShift', tempJobFormik);
        }
    };

    const createContact = (input: string) => {
        if (typeof input !== 'string' || !input.trim()) {
            console.error('Invalid input type or empty string:', input);
            return;
        }

        const names = input.split(' ');
        const firstName = names[0];
        const lastName = names.slice(1).join(' ') || '';

        if (firstName && lastName) {
            let tempData = {
                clientId: userLocalData.getvalue('clientId'),
                createdBy: userLocalData.getvalue('recrId'),
                contId: 0,
                firstName: firstName.trim(),
                lastName: lastName.trim(),
            };
            trackPromise(
                ApiService.postWithData('admin', 'saveOrUpdateContacts', tempData)
                    .then((response) => {
                        if (response.data && response.data.Success) {
                            const newContId = response.data.contId;
                            const newContName = `${firstName} ${lastName}`;
                            // setOptions((prevOptions: any) => [...prevOptions, { label: newContName, id: newContId }]);
                            addJobFormik.setFieldValue('contId', newContId || "");
                            addJobFormik.setFieldValue('contName', newContName);
                        } else {
                            console.error('Failed to create new contact:', response.data.Message);
                        }

                    }).catch((error) => {
                        console.error('Error in creating contact:', error);
                    })
            )
        } else {
            addJobFormik.setFieldValue('contId', "", true);
            addJobFormik.setFieldValue('contName', "", true);
            showToaster("Must enter first and last name with space", "error")
        }

    }

    const handleAddSchedule = () => {
        let tempJobFormik = [
            ...addJobFormik.values.jobShift
        ]
        tempJobFormik.push({
            days: [],
            startTime: null,
            endTime: null,
            timeZone: "",
            shiftId: 0
        });
        addJobFormik.setFieldValue('jobShift', tempJobFormik);
    };

    const handleDeleteSchedule = (index: any) => {
        let tempJobFormik = [
            ...addJobFormik.values.jobShift
        ];
        tempJobFormik.splice(index, 1);
        addJobFormik.setFieldValue('jobShift', tempJobFormik);
    };


    // useEffect(() => {
    //     if (jobData.jobId) {
    //         if (Parsable.isJSON(jobData.json)) {
    //             setFormData(JSON.parse(jobData.json).length ? JSON.parse(jobData.json) : JobFormData);
    //         } else {
    //             setFormData(JobFormData);
    //         }
    //     } else {
    //         setFormData(JobFormData);
    //     }
    //     // else{
    //     //     updateDocumentTitle.set('Add Job');
    //     // }
    //     return () => {
    //         setFormData([]);
    //     }
    // }, []);



    const initialAddJObDetails = jobData.jobId ? jobData : {
        "companyName": userLocalData.getvalue('clientName'),
        "companyId": userLocalData.getvalue('clientId'),
        "jobTitle": "",
        "internalJobTitle": "",
        "primaryRecruiter": "",
        "primaryName": "",
        "collaborator": "",
        collaboratorName: "",
        "jobCategory": "",
        "pipelineStatus": "1",
        priority: "",
        "jobType": "",
        "jobHours": "",
        "publicDescription": "",
        "originalDescription": "",
        "referenceNo": "",
        "openings": "",
        "startDate": "",
        "endDate": "",
        "businessUnit": "",
        "remoteJob": "",
        "remote_value": "",
        "streetAddress": "",
        "jobCity": "",
        "stateOrPro": "",
        "jobPostalCode": "",
        "workType": "",
        "specificLocation": "",
        "candidateLocation": "",
        "hoursWeek": "",
        "payrateMax": "",
        "payrateMin": "",
        "payrateType": "1",
        "billRateMin": "",
        "billRateMax": "",
        "billRateType": "1",
        "dsBillMin": "",
        "dsBillMax": "",
        "dsBillType": "1",
        "firstName": "",
        "lastName": "",
        "email": "",
        "phone": "",
        "workflowId": "",
        "workflowName": "",
        "formId": "",
        "formName": "",
        "jobShift": [
        ],
        contId: "",
        contName: "",

    }
    const addJobSchema = Yup.object().shape({
        jobShift: Yup.array().of(
            Yup.object().shape({
                "days": Yup.array().required().of(Yup.string()),
                "startTime": Yup.mixed().required().nullable().transform((_, val) => val ? val : null),
                "endTime": Yup.mixed().required().nullable().transform((_, val) => val ? val : null),
                "timeZone": Yup.string().required(),
                "shiftId": Yup.number(),
            })
        ),
        "companyName": Yup.string(),
        "companyId": Yup.string(),
        "jobTitle": Yup.string().required('Position Title is required.'),
        "internalJobTitle": Yup.string(),
        "primaryRecruiter": Yup.string(),
        "primaryName": Yup.string(),
        "collaborator": Yup.string(),
        "collaboratorName": Yup.string(),
        "jobCategory": Yup.string().required('Labour category is required.'),
        // .required('Job Category * is required.'),
        "pipelineStatus": Yup.string(),
        priority: Yup.string(),
        "jobType": Yup.string(),
        "jobHours": Yup.string(),
        "publicDescription": Yup.string().required('Public Description is required.'),
        "originalDescription": Yup.string().required('Internal Description is required.'),
        // .required('Original Description By is required.'),
        "referenceNo": Yup.string().required('Reference No is required.'),
        "openings": Yup.string().required('Position is required.'),
        "startDate": Yup.mixed().nullable().transform((_, val) => val ? val : null),
        "endDate": Yup.mixed().nullable().transform((_, val) => val ? val : null),
        "businessUnit": Yup.string(),
        "remoteJob": Yup.string(),
        "remote_value": Yup.string(),
        "streetAddress": Yup.string(),
        "jobCity": Yup.string().when("workType", {
            is: (workType: string) => (workType !== "1") ? true : false,
            then: (f: any) => f.required('Job City is required.'),
            otherwise: (f: any) => f.notRequired()
        }),
        "stateOrPro": Yup.string().when("workType", {
            is: (workType: string) => (workType !== "1") ? true : false,
            then: (f: any) => f.required('State or Pro is required.'),
            otherwise: (f: any) => f.notRequired()
        }),
        "jobPostalCode": Yup.string().when("workType", {
            is: (workType: string) => (workType !== "1") ? true : false,
            then: (f: any) => f.required('Job Postal Code is required.').matches(/(^\d{5}$)|(^\d{5}-\d{4}$)/, "Please enter a valid Postal Code."),
            otherwise: (f: any) => f.notRequired()
        }),
        "workType": Yup.string().required('Work type is required'),
        "specificLocation": Yup.string().required('Specific location is required'),
        "candidateLocation": Yup.string().when("specificLocation", {
            is: "Yes",
            then: (f: any) => f.required('Candidate Location is required'),
            otherwise: (f: any) => f.notRequired()
        }),

        "startTime": Yup.string(),
        "endTime": Yup.string(),
        "timeZone": Yup.string(),

        "hoursWeek": Yup.string(),

        "payrateMax": Yup.string().required('PayRate Max is required'),
        "payrateMin": Yup.string().required('PayRate Min is required'),
        "payRateType": Yup.string(),

        "billRateMin": Yup.string(),
        "billRateMax": Yup.string(),
        "billRateType": Yup.string(),

        "dsBillMin": Yup.string(),
        "dsBillMax": Yup.string(),
        "dsBillType": Yup.string(),


        "firstName": Yup.string(),
        // .required('First Name * is required.'),
        "lastName": Yup.string(),
        "email": Yup.string(),
        "phone": Yup.string(),

        "workflowName": Yup.string(),
        "formId": Yup.string(),
        "workflowId": Yup.string(),
        "formName": Yup.string(),
        contId: Yup.string(),
        contName: Yup.string(),
    });
    const getFormData = async () => {
        if (jobData?.jobId && Parsable.isJSON(jobData.json) && JSON.parse(jobData.json).length) {
            const parsedData = JSON.parse(jobData.json);
            if (parsedData.length) {
                setFormData(parsedData);
                return;
            }
        }
        try {
            const response = await trackPromise(
                ApiService.getById('admin', 'getCustomSettingsById', `20039/${userLocalData.getvalue('clientId')}`)
            );

            if (response.data?.Success) {
                const parsedData = response.data.list?.length && Parsable.isJSON(response.data.list[0].json)
                    ? JSON.parse(response.data.list[0].json).map((item: any) => ({
                        ...item,
                        canDelete: false,
                    }))
                    : [];
                setFormData(parsedData?.length ? parsedData : JobFormData);
            } else {
                setFormData(JobFormData);
            }
        } catch (error) {
            showToaster("Error fetching custom settings:", 'error');
            setFormData(JobFormData);
        }
    };

    useEffect(() => {
        getFormData();
        return () => setFormData([]);
    }, []);




    const createJob = (passedJobData: any, addOrEdit: "add" | "edit") => {
        if (addOrEdit === "edit") {
            if (!passedJobData.jobId) {
                showToaster('Job ID is missing', 'error');
                return;
            }
        }
        trackPromise(
            ApiService.postWithData('admin', (addOrEdit === "add") ? 'createjobbydatabase' : 'updateJobs', passedJobData)
                .then((response) => {
                    if (response.data.success || response.data.Success) {
                        // passedJobData.jobId = response.data.JobId;
                        if (addOrEdit === "add") {
                            const newJobId = response.data.JobId;
                            addJobFormik.setFieldValue("jobId", newJobId);
                            passedJobData.jobId = newJobId;
                        }
                        if (assignWorkflowRef.current?.isWorkflowSelected() && !jobData?.workflowDetails?.workflow_job_id) {
                            assignWorkflowRef.current?.assignWorkflow(passedJobData.jobId);
                        } else {
                            showToaster(`Job ${(addOrEdit === "add") ? "created" : "updated"} successfully.`, 'success');
                            addJobFormik.resetForm();
                            closePopup(addOrEdit);
                        }
                        setFormData([]);
                    } else {
                        showToaster((response.data.message) ? response.data.message : 'An error occurred', 'error');
                    }
                })
        );
    };

    // const updateJob = (jobData: any) => {
    //     if (!jobData.jobId) {
    //         showToaster('Job ID is missing', 'error');
    //         return;
    //     }
    //     trackPromise(
    //         ApiService.postWithData(214, 'updateJobs', jobData)
    //             .then((response) => {
    //                 if (response.data.Success === true) {
    //                     showToaster('Job updated successfully.', 'success');
    //                     closePopup("edit")

    //                 } else {
    //                     showToaster('An error occurred', 'error');
    //                 }
    //             })
    //     );
    // };
    // const ApplicationForm = (formData: any) => {
    //     // if (addJobFormik.isValid) {
    //     // if (value === 4) {
    //     // let formLabelEmpty = false;
    //     for (let cq = 0; cq < formData.length; cq++) {
    //         if (!['conditionallogic', 'label', 'divider', 'displaytext', 'pagebreak'].includes(formData[cq].fieldType)) {
    //             if (formData[cq].inputType === 'checkbox') {
    //                 if (!formData[cq].checkboxOption.value) {
    //                     // formLabelEmpty = true;
    //                     if (value === 4) showToaster('Please Enter Checkbox Option', 'error');
    //                     return true;
    //                 }
    //             } else if (!formData[cq].labelName) {
    //                 // formLabelEmpty = true;
    //                 if (value === 4) showToaster('Please Enter Question', 'error');
    //                 return true;
    //             }
    //         }

    //     }
    //     return false;
    //     // if (formLabelEmpty) return;
    //     // }
    //     // }

    // }
    const saveForm = () => {
        setIsFormSubmitted(true);
        saveAuditLog(4159);

        if (checkAllValidations() && (!isCareerPortalEnabled || checkFormValidation())) {
            if (addJobFormik.isValid) {
                const tempJobShifts = addJobFormik.values.jobShift.map((shift:
                    {
                        days: string[];
                        startTime: string;
                        endTime: string;
                        timeZone: string;
                        shiftId: number
                    }) => ({
                        days: (shift.days && shift.days.length) ? shift.days.join() : "",
                        startTime: (shift.startTime) ? DateTime.fromISO(new Date(shift.startTime).toISOString()).toFormat('HH:mm:ss') : "",
                        endTime: (shift.endTime) ? DateTime.fromISO(new Date(shift.endTime).toISOString()).toFormat('HH:mm:ss') : "",
                        timeZone: shift.timeZone,
                        shiftId: Number(shift.shiftId) ? Number(shift.shiftId) : 0
                    }));

                const jobDataTemp = {
                    jobId: addJobFormik.values.jobId,
                    jobTitle: addJobFormik.values.jobTitle,
                    intJobTitle: addJobFormik.values.internalJobTitle,
                    referenceNo: addJobFormik.values.referenceNo,
                    accuickJobId: Number(jobData.accuickJobId) || 0,
                    openings: addJobFormik.values.openings || 0,
                    category: addJobFormik.values.jobCategory || 0,
                    status: Number(addJobFormik.values.pipelineStatus) || 0,
                    priority: addJobFormik.values.priority,
                    jobType: Number(addJobFormik.values.jobType) || 0,
                    company: Number(addJobFormik.values.companyId) || 0,
                    businessUnit: addJobFormik.values.businessUnit || "",
                    primaryRecruiter: Number(addJobFormik.values.primaryRecruiter) || 0,
                    collaborator: addJobFormik.values.collaborator || "",
                    collaboratorName: Array.isArray(addJobFormik.values.collaboratorNames) ? addJobFormik.values.collaboratorNames.join() : (addJobFormik.values.collaboratorNames || ""),
                    publicJobDescr: addJobFormik.values.publicDescription,
                    interJobDescr: addJobFormik.values.originalDescription,
                    workType: Number(addJobFormik.values.workType) || 0,
                    specificLocation: (addJobFormik.values.specificLocation === "Yes") ? true : false,
                    workStreet: addJobFormik.values.streetAddress || "",
                    workCity: addJobFormik.values.jobCity || "",
                    workState: addJobFormik.values.stateOrPro || "",
                    workZipcode: addJobFormik.values.jobPostalCode || "",
                    estStartDate: (addJobFormik.values.startDate) ? DateTime.fromISO(new Date(addJobFormik.values.startDate).toISOString()).toFormat('yyyy-MM-dd') : null,
                    estEndDate: (addJobFormik.values.endDate) ? DateTime.fromISO(new Date(addJobFormik.values.endDate).toISOString()).toFormat('yyyy-MM-dd') : null,
                    workTimezone: addJobFormik.values.timeZone || "",
                    jobHours: Number(addJobFormik.values.jobHours) || 0,
                    payrateMin: Number(addJobFormik.values.payrateMin) || 0,
                    payrateMax: Number(addJobFormik.values.payrateMax) || 0,
                    payrateType: Number(addJobFormik.values.payrateType) || 1,
                    billRateMin: Number(addJobFormik.values.billRateMin) || 0,
                    billRateMax: Number(addJobFormik.values.billRateMax) || 0,
                    billRateType: Number(addJobFormik.values.billRateType) || 1,
                    dsBillMin: Number(addJobFormik.values.dsBillMin) || 0,
                    dsBillMax: Number(addJobFormik.values.dsBillMax) || 0,
                    dsBillType: Number(addJobFormik.values.dsBillType) || 1,
                    candStreet: addJobFormik.values.candidateLocation || "",
                    candCity: '',
                    candState: '',
                    candZipcode: '',
                    candTimezone: '',
                    workflowId: Number(addJobFormik.values.workflowId) || 0,
                    formId: Number(addJobFormik.values.formId) || 0,
                    isDelete: false,
                    createdBy: Number(userLocalData.getvalue('recrId')),
                    createDate: new Date().toISOString(),
                    modifyBy: Number(userLocalData.getvalue('recrId')),
                    modifyDate: new Date().toISOString(),
                    contId: Number(addJobFormik.values.contId) || 0,
                    contName: addJobFormik.values.contName,
                    clientId: Number(userLocalData.getvalue('clientId')),
                    jobShift: tempJobShifts,
                    json: (formData) ? JSON.stringify(formData) : ''
                };

                const keyValuesObject: any = {
                    companyName: "Company Name",
                    companyId: "Company Id",
                    jobTitle: "Job Title",
                    internalJobTitle: "Internal Position Title",
                    primaryRecruiter: "Primary Recruiter",
                    primaryName: "Primary Name",
                    collaborator: "Collaborator",
                    collaboratorName: "Collaborator Name",
                    jobCategory: "Job Category",
                    pipelineStatus: "Pipeline Status",
                    priority: "Priority",
                    jobType: "Job Type",
                    jobHours: "Job Hours",
                    publicDescription: "Public Job Description",
                    originalDescription: "Original Job Description",
                    referenceNo: "Reference No",
                    openings: "Openings",
                    startDate: "Start Date",
                    endDate: "End Date",
                    businessUnit: "Business Unit",
                    remoteJob: "Remote Job",
                    remote_value: "Remote Value",
                    streetAddress: "Street Address",
                    jobCity: "Job City",
                    stateOrPro: "State or Pro",
                    jobPostalCode: "Job Postal Code",
                    workType: "Work Type",
                    specificLocation: "Specific Location",
                    candidateLocation: "Candidate Location",
                    hoursWeek: "Hours Week",
                    payrateMax: "PayRate Max",
                    payrateMin: "PayRate Min",
                    payrateType: "PayRate Type",
                    billRateMin: "BillRate Min",
                    billRateMax: "BillRate Max",
                    billRateType: "BillRate Type",
                    dsBillMin: "Discount Bill Min",
                    dsBillMax: "Discount Bill Max",
                    dsBillType: "Discount Bill Type",
                    firstName: "First Name",
                    lastName: "Last Name",
                    email: "Email",
                    phone: "Phone",
                    workflowId: "Workflow Id",
                    workflowName: "Workflow Name",
                    workflowDetails: "Workflow Details",
                    formId: "Form Id",
                    formName: "Form Name",
                    jobShift: "Job Shift",
                    contId: "Cont Id",
                    contName: "Cont Name",

                }
                if (jobDataTemp.jobId) {
                    const oldVaues = addJobFormik.initialValues;
                    const newValues = addJobFormik.values;
                    const changedValuesArry: any = [];
                    const keys = Object.keys(oldVaues);
                    keys.map((key: string) => {
                        if (key !== 'jobShift' &&
                            key !== 'primaryRecruiter' &&
                            key !== 'collaborator' &&
                            key !== 'workflowId' &&
                            key !== 'workflowName' &&
                            key !== 'workflowDetails' &&
                            key !== 'formId' &&
                            key !== 'formName' &&
                            key !== 'contId'
                        ) { // primaryRecruiter, collaborator, workflowId, formId, jobShift, contId
                            if (oldVaues[key] !== newValues[key]) {
                                changedValuesArry.push(
                                    {
                                        name: keyValuesObject[key],
                                        oldValue: oldVaues[key],
                                        newValue: newValues[key]
                                    }
                                );
                            }
                        }
                    })
                    // updateJob(jobDataTemp); // Update existing job
                    const dataWithChanges = { ...jobDataTemp, changes: changedValuesArry }
                    createJob(dataWithChanges, "edit"); // Update existing job
                } else {
                    createJob(jobDataTemp, "add"); // Create new job
                }
            }
            else {
                showToaster('Please fill all required fields.', 'error');
            }
        }
    }

    const addJobFormik = useFormik({
        initialValues: initialAddJObDetails,
        validationSchema: addJobSchema,
        onSubmit: () => {
            setIsFormSubmitted(true);
        },
        validateOnMount: true
    });


    const [value, setValue] = useState(0);
    const [tabState, settabState] = useState([false, false, false, false, false, false]);

    // const labels = ["BasicDetails", "Description", "Requirement", "Location", "Compensation"]


    const checkValidations = (i: number) => {
        // return true
        if (i === 1) {
            if (!addJobFormik.values.jobTitle || (addJobFormik.values.jobTitle && !addJobFormik.values.jobTitle.trim())) {
                showToaster('Please enter Position Title', 'error');
                return false
            }
            else if (!addJobFormik.values.referenceNo) {
                showToaster('Please enter reference', 'error');
                return false
            }
            else if (!addJobFormik.values.openings) {
                showToaster('Please enter no.of positions ', 'error');
                return false
            }
        }
        if (i === 2) {
            if (!addJobFormik.values.jobCategory) {
                showToaster('Please select labour category', 'error');
                return false
            }
        }

        else if (i === 3) {

            const postalCodeRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
            if (!addJobFormik.values.workType || addJobFormik.values.workType === "0") {
                showToaster('Please select Work Type', 'error');
                return false
            }
            else if (!addJobFormik.values.specificLocation || addJobFormik.values.specificLocation === "0") {
                showToaster('Please select specific location', 'error');
                return false
            }
            else if (addJobFormik.values.specificLocation === "Yes" && !addJobFormik.values.candidateLocation) {
                showToaster('Please Enter Candidate location', 'error');
                return false
            }
            else if ((addJobFormik.values.workType !== "1") && !addJobFormik.values.jobCity || (addJobFormik.values.jobCity && !addJobFormik.values.jobCity.trim())) {
                showToaster('Please enter City', 'error');
                return false
            }
            else if ((addJobFormik.values.workType !== "1") && !addJobFormik.values.stateOrPro || (addJobFormik.values.stateOrPro && !addJobFormik.values.stateOrPro.trim())) {
                showToaster('Please enter State', 'error');
                return false
            }
            else if ((addJobFormik.values.workType !== "1") && !addJobFormik.values.jobPostalCode || (addJobFormik.values.jobPostalCode && !addJobFormik.values.jobPostalCode.trim())) {
                showToaster('Please enter Postal Code', 'error');
                return false
            }
            else if ((addJobFormik.values.workType !== "1") && !postalCodeRegex.test(addJobFormik.values.jobPostalCode)) {
                showToaster('Please enter a valid Postal Code.', 'error');
                return false
            }
            else {
                for (let js = 0; js < addJobFormik.values.jobShift.length; js++) {
                    if (!addJobFormik.values.jobShift[js].days.length) {
                        showToaster('Please select Days', 'error');
                        return false;
                    }
                    if (!addJobFormik.values.jobShift[js].startTime) {
                        showToaster('Please enter Start Time', 'error');
                        return false;
                    }
                    if (!addJobFormik.values.jobShift[js].endTime) {
                        showToaster('Please enter End Time', 'error');
                        return false;
                    }
                    // if (addJobFormik.values.jobShift[js].startTime && addJobFormik.values.jobShift[js].endTime) {
                    // if (addJobFormik.values.jobShift[js].startTime >= addJobFormik.values.jobShift[js].endTime) {
                    //     showToaster('Start Time must be earlier than End Time', 'error');
                    //     return false;
                    // }
                    // }
                    if (!addJobFormik.values.jobShift[js].timeZone) {
                        showToaster('Please select Time Zone', 'error');
                        return false;
                    }
                }
            }

            if (!addJobFormik.values.payrateMin || (addJobFormik.values.payrateMin < 0)) {
                showToaster('Min PayRate must be greater than zero', 'error');
                return false
            }
            if (!addJobFormik.values.payrateMax || (addJobFormik.values.payrateMax < 0)) {
                showToaster('Max PayRate must be greater than zero', 'error');
                return false
            }
            if (addJobFormik.values.payrateMin !== null && addJobFormik.values.payrateMin !== undefined && addJobFormik.values.payrateMin !== "" && addJobFormik.values.payrateMin > 0 &&
                addJobFormik.values.payrateMax !== null && addJobFormik.values.payrateMax !== undefined && addJobFormik.values.payrateMax !== "" && addJobFormik.values.payrateMax > 0) {
                if (parseFloat(addJobFormik.values.payrateMin) > parseFloat(addJobFormik.values.payrateMax)) {
                    showToaster('Max PayRate must be greater than Min PayRate.', 'error');
                    return false
                }
            }
            if (addJobFormik.values.billRateMin && (addJobFormik.values.billRateMin < 0)) {
                showToaster('Min BillRate must be greater than zero', 'error');
                return false
            }
            if (addJobFormik.values.billRateMax && (addJobFormik.values.billRateMax < 0)) {
                showToaster('Max BillRate must be greater than zero', 'error');
                return false
            }
            if (addJobFormik.values.billRateMin !== null && addJobFormik.values.billRateMin !== undefined && addJobFormik.values.billRateMin !== "" && addJobFormik.values.billRateMin > 0 &&
                addJobFormik.values.billRateMax !== null && addJobFormik.values.billRateMax !== undefined && addJobFormik.values.billRateMax !== "" && addJobFormik.values.billRateMax > 0) {
                if (parseFloat(addJobFormik.values.billRateMin) > parseFloat(addJobFormik.values.billRateMax)) {
                    showToaster('Max BillRate must be greater than Min BillRate.', 'error');
                    return false
                }
            }
            if (addJobFormik.values.dsBillMin && (addJobFormik.values.dsBillMin < 0)) {
                showToaster('Min Discounted Bill Rate must be greater than zero', 'error');
                return false
            }
            if (addJobFormik.values.dsBillMax && (addJobFormik.values.dsBillMax < 0)) {
                showToaster('Max Discounted Bill Rate must be greater than zero', 'error');
                return false
            }
            if (addJobFormik.values.dsBillMin !== null && addJobFormik.values.dsBillMin !== undefined && addJobFormik.values.dsBillMin !== "" && addJobFormik.values.dsBillMin > 0 &&
                addJobFormik.values.dsBillMax !== null && addJobFormik.values.dsBillMax !== undefined && addJobFormik.values.dsBillMax !== "" && addJobFormik.values.dsBillMax > 0) {
                if (parseFloat(addJobFormik.values.dsBillMin) >= parseFloat(addJobFormik.values.dsBillMax)) {
                    showToaster('Max Discounted Bill Rate must be greater than Min Discounted Bill Rate.', 'error');
                    return false
                }
            }
            if (addJobFormik.values.startDate && addJobFormik.values.endDate) {
                const startDate = DateTime.fromFormat(addJobFormik.values.startDate, "MM/dd/yyyy");
                const endDate = DateTime.fromFormat(addJobFormik.values.endDate, "MM/dd/yyyy");
                if (startDate >= endDate) {
                    showToaster('End date must be greater than start date.', 'error');
                    return false;
                }
            }
        }

        else if (i === 4) {
            if (!addJobFormik.values.primaryRecruiter) {
                showToaster('Please enter Primary Recruiter', 'error');
                return false
            }
            if (!addJobFormik.values.publicDescription || (addJobFormik.values.publicDescription && !addJobFormik.values.publicDescription.replace(/<[^>]*>?/gm, '').trim())) {
                showToaster('Please enter Public Description', 'error');
                return false
            }

            else if (!addJobFormik.values.originalDescription || (addJobFormik.values.originalDescription && !addJobFormik.values.originalDescription.replace(/<[^>]*>?/gm, '').trim())) {
                showToaster('Please enter Internal Description', 'error');
                return false
            }

        }
        else if ((i === 5) && isCareerPortalEnabled) {
            if (!checkFormValidation()) {
                return false;
            }
        }
        //else if (i === 5) {
        //     //     if (!addJobFormik.values.formId) {
        //     //         showToaster('Please select Form', 'error');
        //     //         return false
        //     //     }
        //     // } else if (i === 6) {
        //     //     if (!addJobFormik.values.workflowId) {
        //     //         showToaster('Please select Workflow', 'error');
        //     //         return false
        //     //     }
        // }
        // employmentType
        // billRateMin
        // billRateMax
        // payrateMin
        // payrateMax
        let width: number = 100 / ((jobData?.jobId && jobData?.workflowDetails?.workflow_job_id) ? 5 : 6);
        if (progress < (width * i)) {
            setProgress(width * i);
        }
        return true;
    }
    const checkAllValidations = () => {
        const condArr = [null, undefined, "", 0];

        if (!addJobFormik.values.jobTitle || (addJobFormik.values.jobTitle && !addJobFormik.values.jobTitle.trim())) {
            showToaster('Please enter Position Title', 'error');
            return false
        }
        else if (!addJobFormik.values.referenceNo) {
            showToaster('Please enter reference', 'error');
            return false
        }
        else if (!addJobFormik.values.openings) {
            showToaster('Please enter No. of Positions ', 'error');
            return false
        }

        else if (!addJobFormik.values.workType || addJobFormik.values.workType === "0") {
            showToaster('Please select Work Type', 'error');
            return false
        }
        else if (!addJobFormik.values.specificLocation || addJobFormik.values.specificLocation === "0") {
            showToaster('Please select specific location', 'error');
            return false
        }
        else if ((addJobFormik.values.workType !== "1") && !addJobFormik.values.jobCity || (addJobFormik.values.jobCity && !addJobFormik.values.jobCity.trim())) {
            showToaster('Please enter City', 'error');
            return false
        }
        else if ((addJobFormik.values.workType !== "1") && !addJobFormik.values.stateOrPro || (addJobFormik.values.stateOrPro && !addJobFormik.values.stateOrPro.trim())) {
            showToaster('Please enter State', 'error');
            return false
        }
        else if ((addJobFormik.values.workType !== "1") && !addJobFormik.values.jobPostalCode || (addJobFormik.values.jobPostalCode && !addJobFormik.values.jobPostalCode.trim())) {
            showToaster('Please enter Postal Code', 'error');
            return false
        } else {
            for (let js = 0; js < addJobFormik.values.jobShift.length; js++) {
                if (!addJobFormik.values.jobShift[js].days.length) {
                    showToaster('Please select Days', 'error');
                    return false;
                }
                if (!addJobFormik.values.jobShift[js].startTime) {
                    showToaster('Please enter Start Time', 'error');
                    return false;
                }
                if (!addJobFormik.values.jobShift[js].endTime) {
                    showToaster('Please enter End Time', 'error');
                    return false;
                }
                if (!addJobFormik.values.jobShift[js].timeZone) {
                    showToaster('Please select Time Zone', 'error');
                    return false;
                }

            }
        }

        if (!addJobFormik.values.payrateMin || (addJobFormik.values.payrateMin < 0)) {
            showToaster('Min PayRate must be greater than zero', 'error');
            return false
        }

        if (!addJobFormik.values.payrateMax || (addJobFormik.values.payrateMax < 0)) {
            showToaster('Max PayRate must be greater than zero', 'error');
            return false
        }

        if (addJobFormik.values.payrateMin !== null && addJobFormik.values.payrateMin !== undefined && addJobFormik.values.payrateMin !== "" && addJobFormik.values.payrateMin > 0 &&
            addJobFormik.values.payrateMax !== null && addJobFormik.values.payrateMax !== undefined && addJobFormik.values.payrateMax !== "" && addJobFormik.values.payrateMax > 0) {

            if (parseFloat(addJobFormik.values.payrateMin) > parseFloat(addJobFormik.values.payrateMax)) {
                showToaster('Max PayRate must be greater than Min PayRate.', 'error');
                return false
            }
        }

        if (addJobFormik.values.billRateMin) {
            if (addJobFormik.values.billRateMin < 0) {
                showToaster('Min BillRate must be greater than zero', 'error');
                return false
            }
            if (!addJobFormik.values.billRateMax) {
                showToaster("Max Bill Rate is required when Min Bill Rate exists", "error")
                return false;
            }
        }

        if (addJobFormik.values.billRateMax) {
            if (addJobFormik.values.billRateMax < 0) {
                showToaster('Max BillRate must be greater than zero', 'error');
                return false
            }
            if (!addJobFormik.values.billRateMin) {
                showToaster("Min Bill Rate is required when Max Bill Rate exists", "error")
                return false;
            }
        }
        if (addJobFormik.values.billRateMin !== null && addJobFormik.values.billRateMin !== undefined && addJobFormik.values.billRateMin !== "" && addJobFormik.values.billRateMin > 0 &&
            addJobFormik.values.billRateMax !== null && addJobFormik.values.billRateMax !== undefined && addJobFormik.values.billRateMax !== "" && addJobFormik.values.billRateMax > 0) {

            if (parseFloat(addJobFormik.values.billRateMin) > parseFloat(addJobFormik.values.billRateMax)) {
                showToaster('Max BillRate must be greater than Min BillRate.', 'error');
                return false
            }

            if (Number(addJobFormik.values.payrateType) && Number(addJobFormik.values.billRateType) && (Number(addJobFormik.values.payrateType) === Number(addJobFormik.values.billRateType))) {
                if (!condArr.includes(addJobFormik.values.payrateMin) && addJobFormik.values.payrateMin > 0 && !condArr.includes(addJobFormik.values.payrateMax) && addJobFormik.values.payrateMax > 0) {
                    if (parseFloat(addJobFormik.values.payrateMin) > parseFloat(addJobFormik.values.billRateMin)) {
                        showToaster("Minimum Bill Rate should be greater than Minimum Pay Rate", "error");
                        return false;
                    }

                    if (parseFloat(addJobFormik.values.payrateMax) > parseFloat(addJobFormik.values.billRateMax)) {
                        showToaster("Maximum Bill Rate should be greater than Maximum Pay Rate", "error");
                        return false;
                    }
                }
            }
        }


        if (addJobFormik.values.dsBillMin) {
            if (addJobFormik.values.dsBillMin < 0) {
                showToaster('Min Discounted Bill Rate must be greater than zero', 'error');
                return false
            }
            if (!addJobFormik.values.dsBillMax) {
                showToaster("Max Discounted Bill Rate is required when Min Discounted Bill Rate exists", "error")
                return false;
            }
        }

        if (addJobFormik.values.dsBillMax) {
            if (addJobFormik.values.dsBillMax < 0) {
                showToaster('Max Discounted Bill Rate must be greater than zero', 'error');
                return false;
            }
            if (!addJobFormik.values.dsBillMin) {
                showToaster("Min Discounted Bill Rate is required when Max Discounted Bill Rate exists", "error")
                return false;
            }
        }
        if (addJobFormik.values.dsBillMin !== null && addJobFormik.values.dsBillMin !== undefined && addJobFormik.values.dsBillMin !== "" && addJobFormik.values.dsBillMin > 0 &&
            addJobFormik.values.dsBillMax !== null && addJobFormik.values.dsBillMax !== undefined && addJobFormik.values.dsBillMax !== "" && addJobFormik.values.dsBillMax > 0) {

            if (parseFloat(addJobFormik.values.dsBillMin) > parseFloat(addJobFormik.values.dsBillMax)) {
                showToaster('Max Discounted Bill Rate must be greater than Min Discounted Bill Rate.', 'error');
                return false
            }



            if (Number(addJobFormik.values.dsBillType) && Number(addJobFormik.values.billRateType) && (Number(addJobFormik.values.dsBillType) === Number(addJobFormik.values.billRateType))) {
                if (!condArr.includes(addJobFormik.values.billRateMin) && addJobFormik.values.billRateMin > 0 && !condArr.includes(addJobFormik.values.billRateMax) && addJobFormik.values.billRateMax > 0) {
                    if (parseFloat(addJobFormik.values.billRateMin) < parseFloat(addJobFormik.values.dsBillMin)) {
                        showToaster("Minimum Discounted Bill Rate should be lesser than Minimum Bill Rate", "error");
                        return false;
                    }

                    if (parseFloat(addJobFormik.values.billRateMax) < parseFloat(addJobFormik.values.dsBillMax)) {
                        showToaster("Maximum Discounted Bill Rate should be lesser than Maximum Bill Rate", "error");
                        return false;
                    }
                }
            }

            if (Number(addJobFormik.values.payrateType) && Number(addJobFormik.values.dsBillType) && (Number(addJobFormik.values.payrateType) === Number(addJobFormik.values.dsBillType))) {
                if (!condArr.includes(addJobFormik.values.payrateMin) && addJobFormik.values.payrateMin > 0 && !condArr.includes(addJobFormik.values.payrateMax) && addJobFormik.values.payrateMax > 0) {
                    if (parseFloat(addJobFormik.values.payrateMin) > parseFloat(addJobFormik.values.dsBillMin)) {
                        showToaster("Minimum Discounted Bill Rate should be greater than Minimum Pay Rate", "error");
                        return false;
                    }

                    if (parseFloat(addJobFormik.values.payrateMax) > parseFloat(addJobFormik.values.dsBillMax)) {
                        showToaster("Maximum Discounted Bill Rate should be greater than Maximum Pay Rate", "error");
                        return false;
                    }
                }
            }
        }

        if (!addJobFormik.values.primaryRecruiter) {
            showToaster('Please enter Primary Recruiter', 'error');
            return false
        }
        else if (!addJobFormik.values.publicDescription || (addJobFormik.values.publicDescription && !addJobFormik.values.publicDescription.replace(/<[^>]*>?/gm, '').trim())) {
            showToaster('Please enter Public Description', 'error');
            return false
        }
        else if (!addJobFormik.values.originalDescription || (addJobFormik.values.originalDescription && !addJobFormik.values.originalDescription.replace(/<[^>]*>?/gm, '').trim())) {
            showToaster('Please enter Internal Description', 'error');
            return false
        } else if ((checkFormValidation() || !isCareerPortalEnabled)) {

        } else if (assignWorkflowRef.current && !assignWorkflowRef.current?.checkIsValid() && !jobData?.workflowDetails?.workflow_job_id) {
            updateTabState("e", 5);
            showToaster('Please fill all mandatory fields.', 'error');
            return false
        }

        return true;
    }
    // const updateTabState = (event: any, newValue: any) => {

    //     if (checkValidations(newValue)) {
    //         setValue(newValue);
    //         // if (newValue === 4) {
    //         //     saveForm();
    //         // } else
    //         if (newValue >= 0 && newValue <= 3) {
    //             let tempTabState = tabState;
    //             tempTabState[newValue - 1] = true;
    //             settabState({
    //                 ...tempTabState
    //             })
    //         }
    //         setIsFormSubmitted(false);
    //     } else {
    //         setIsFormSubmitted(true);
    //     }

    //     // if (newValue === 4) {
    //     //     let tempTabState = tabState;
    //     //     tempTabState[newValue] = true;
    //     //     settabState({
    //     //         ...tempTabState
    //     //     })
    //     // }
    // };
    const updateTabState = (event: any, newValue: any) => {
        let validUpToTab = value;
        let tempTabState = [...tabState];
        for (let index = value; index <= newValue; index++) {
            if (!checkValidations(index)) {
                setIsFormSubmitted(true);
                setValue(validUpToTab);
                return;
            }
            validUpToTab = index;
            tempTabState[index] = true;
        }
        setValue(newValue);
        settabState(tempTabState);
        setIsFormSubmitted(false);
    };


    const checkFormValidation = () => {

        let formLabelEmpty = false;
        for (let cq = 0; cq < formData.length; cq++) {
            if (!['conditionallogic', 'label', 'divider', 'displaytext', 'pagebreak'].includes(formData[cq].fieldType)) {
                if (formData[cq].inputType === 'checkbox') {
                    if (!formData[cq].checkboxOption.value) {
                        formLabelEmpty = true;
                        showToaster('Please Enter Checkbox Option', 'error');
                        break;
                    } else if (!(/^(?=.*[a-zA-Z0-9]).{1,}$/.test(formData[cq].checkboxOption.value))) {
                        formLabelEmpty = true;
                        showToaster('Please Enter valid Checkbox Option', 'error');
                        break;
                    }
                    if (!formData[cq].labelName) {
                        formLabelEmpty = true;
                        showToaster('Please Enter Question', 'error');
                        break;
                    } else if (!(/^(?=.*[a-zA-Z0-9]).{1,}$/.test(formData[cq].labelName))) {
                        formLabelEmpty = true;
                        showToaster('Please Enter valid Question', 'error');
                        break;
                    }
                } else
                    if (!formData[cq].labelName) {
                        formLabelEmpty = true;
                        showToaster('Please Enter Question', 'error');
                        break;
                    } else if (!(/^(?=.*[a-zA-Z0-9]).{1,}$/.test(formData[cq].labelName))) {
                        formLabelEmpty = true;
                        showToaster('Please Enter valid Question', 'error');
                        break;
                    }
            }
        }
        if (formLabelEmpty) {
            updateTabState("e", 4);
        }

        return !formLabelEmpty;
    }

    const [progress, setProgress] = useState<any>(0);

    // const handlePositionChange = (event: any) => {
    //     const result = event.target.value.replace(/\D/g, '');
    //     addJobFormik.setFieldValue("openings", result);
    //     // setValue(result);
    // };
    // const handlePayRateChange = (event: any) => {
    //     const result = event.target.value.replace(/\D/g, '');
    //     addJobFormik.setFieldValue("payrateMax", result);
    //     // setValue(result);
    // };
    // const handlePayHoursChange = (event: any) => {
    //     const result = event.target.value.replace(/\D/g, '');
    //     addJobFormik.setFieldValue("payrateMin", result);
    //     // setValue(result);
    // };

    const saveFormBuilderData = () => {
        // console.log("saveFormBuilderData");
    }
    const formbuilderCancel = () => {
        // console.log("formbuilderCancel");
    }

    const hideAssignWorkflow = () => {
        // console.log('');
        closePopup("Add");
    }

    const assignWorkflowRef = useRef<AssignWorkflowInterface>(null);


    // const checkAssignWorkflowIsEnabled = () => {
    //     if (assignWorkflowRef.current) {
    //         return !assignWorkflowRef.current?.checkIsValid();
    //     }
    //     return false;
    // }

    const saveAuditLog = (id: number) => {
        ApiService.saveAuditLog(id);
    }

    const calculatePayRate = (type: 'min' | 'max') => {
        const id = addJobFormik.values.jobCategory;
        const billRate = type === 'min' ? addJobFormik.values.billRateMin : addJobFormik.values.billRateMax;
        let payRate = 0;
        let DBillRate = 0;
        let devider = 0;
        let multiplier = 0;
        let update = false;
        console.log(billRate)
        if (billRate !== "") {
            switch(id) {
                case '463':
                    devider = Number('1.' + StaffingMarkup[463])
                    multiplier = Number('1.' + DirectSourcingMarkup[463])
                    payRate = billRate/devider;
                    DBillRate = payRate * multiplier;
                    update = true;
                  break;
                case '39':
                    devider = Number('1.' + StaffingMarkup[39])
                    multiplier = Number('1.' + DirectSourcingMarkup[39])
                    payRate = billRate/devider;
                    DBillRate = payRate * multiplier;
                    update = true;
                    break;
                case '39':
                    devider = Number('1.' + StaffingMarkup[39])
                    multiplier = Number('1.' + DirectSourcingMarkup[39])
                    payRate = billRate/devider;
                    DBillRate = payRate * multiplier;
                    update = true;
                    break;
                case '490':
                    devider = Number('1.' + StaffingMarkup[490])
                    multiplier = Number('1.' + DirectSourcingMarkup[490])
                    payRate = billRate/devider;
                    DBillRate = payRate * multiplier;
                    update = true;
                    break;
                case '496':
                    devider = Number('1.' + StaffingMarkup[496])
                    multiplier = Number('1.' + DirectSourcingMarkup[496])
                    payRate = billRate/devider;
                    DBillRate = payRate * multiplier;
                    break;
                case '59':
                    devider = Number('1.' + StaffingMarkup[59])
                    multiplier = Number('1.' + DirectSourcingMarkup[59])
                    payRate = billRate/devider;
                    DBillRate = payRate * multiplier;
                    update = true;
                    break;
            }
        }

        if (update) {
            if (type === 'min') {
                addJobFormik.setFieldValue('payrateMin', payRate.toFixed(2));
                addJobFormik.setFieldValue('dsBillMin', DBillRate.toFixed(2));
            }
    
            if (type === 'max') {
                addJobFormik.setFieldValue('payrateMax', payRate.toFixed(2));
                addJobFormik.setFieldValue('dsBillMax', DBillRate.toFixed(2)); 

                if ( addJobFormik.values.billRateMin === "" || addJobFormik.values.billRateMin === '0' || addJobFormik.values.billRateMin === 0) {
                    addJobFormik.setFieldValue('payrateMin', payRate.toFixed(2));
                    addJobFormik.setFieldValue('dsBillMin', DBillRate.toFixed(2));
                }
            }
        }
    }

    const initialFormDataRef = useRef<any>(formData);
    useEffect(() => {
        if (formData) {
            initialFormDataRef.current = formData;
        }
    }, [formData]);
    const isJobStructureEdited = () => {
        const applicationFormChanged  = initialFormDataRef.current 
        ? JSON.stringify(formData) !== JSON.stringify(initialFormDataRef.current)
        : false;
        const defaultValuesChanged = JSON.stringify(addJobFormik.values) !== JSON.stringify(initialAddJObDetails);
        return  (defaultValuesChanged || applicationFormChanged) ;
    };
    const handleCancelClick = () => {
        if (isJobStructureEdited()) {
            confirmDialog(
                "Are you sure you want to discard your changes?",
                () => closePopup(""),
                "warning"
            );
        } else {
            closePopup("");
        }
    };
    
    return (
        <Dialog
            maxWidth={'md'}
            // sx={{ width: 900, maxWidth: 900, minWidth: 900 }}
            fullWidth={true} open={open} id='AddJobModal'
        >
            <Loader />
            <DialogTitle
                className='py-2'
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <span className='addHeader'>
                        {add ? "Add" : "Edit"} Job
                    </span>
                    <div>
                        <Grid
                            container
                            direction="row"
                            justifyContent="end"
                            alignItems="center"
                        >
                            {/* <CloseIcon /> onClick={() => closePopup()}  */}
                            <Button variant="outlined"
                                type='button'
                                color="secondary"
                                className='mr-2'
                                onClick={handleCancelClick}
                            >Cancel</Button>
                            <Button variant="contained"
                                type='button'
                                color="primary"
                                onClick={saveForm}
                                disabled={(!addJobFormik.isValid || !addJobFormik.values.primaryRecruiter)} //|| checkAssignWorkflowIsEnabled()
                            >{add ? "Save" : "Update"} Job</Button>
                        </Grid>
                    </div>
                </Grid>
            </DialogTitle>
            <Divider />
            <DialogContent className='py-0'>
                <form
                    onSubmit={addJobFormik.handleSubmit}
                >
                    <Grid className='customCard mt-2 px-0 pb-0' sx={{ width: "850px !important", margin: 'auto', bgcolor: '#ffffff', boxShadow: 'none !important' }}>
                        {/* <span className='addHeader pl-3'>Add New Job</span>
                        <Divider className='mt-3' /> */}

                        {/* <LinearProgress variant="determinate" value={progress} /> */}
                        <Box
                            className='py-0 customCenteredJobTabs '
                        //   sx={{ borderBottom: 1, borderColor: 'divider', minHeight: 'auto !important', marginBottom: '0 !important' }}

                        >
                            <Tabs value={value} onChange={updateTabState} aria-label="Add Job Tabs" variant="fullWidth">
                                <Tab className={`  ${(value >= 0) ? 'tabActive' : 'tabinActive'} `} label="Basic Details" {...tabProperties(0)} />
                                <Tab className={`   ${(value >= 1) ? 'tabActive' : 'tabinActive'} `} label="Requirement" {...tabProperties(1)} />
                                <Tab className={`   ${(value >= 2) ? 'tabActive' : 'tabinActive'} `} label="Location" {...tabProperties(2)} />
                                <Tab className={`  ${(value >= 3) ? 'tabActive' : 'tabinActive'} `} label="Description" {...tabProperties(3)} />

                                <Tab className={`  ${(value >= 4) ? 'tabActive' : 'tabinActive'} ${!isCareerPortalEnabled ? 'd-none' : ''} `} label="Application Form" {...tabProperties(4)} />

                                <Tab className={`${(value >= 5) ? 'tabActive' : 'tabinActive'} ${!isWorkflowEnabled ? 'd-none' : ''} `} label="Hiring Workflow" {...tabProperties(5)} />
                                {/* {
                                    jobData?.jobId && jobData?.workflowDetails?.workflow_job_id ?
                                    <Tab className={`${(value >= 5) ? 'tabActive' : 'tabinActive'}`} label="Hiring Workflow" {...tabProperties(5)} /> : null
                                } */}
                                {/* <Tab className={`  ${(value >= 6) ? 'tabActive' : 'tabinActive'} `} label="Job Board" {...tabProperties(6)} /> */}
                            </Tabs>
                        </Box>
                        <div className=''>

                            <CustomTabPanel value={value} index={0}>
                                <div className='jobPanelDiv'>
                                    <Grid container spacing={2} className="d-none">
                                        <Grid size={6} className='mt-5 pr-2'>
                                            <MUIAutoComplete
                                                id='companyName'
                                                handleChange={(id: any, name: string) => {
                                                    addJobFormik.setFieldValue("companyName", name);
                                                    addJobFormik.setFieldValue("companyId", id);
                                                }}
                                                valuePassed={{}}
                                                isMultiple={false}
                                                isDisabled={true}
                                                width="100%"
                                                type='companyName'
                                                placeholder={
                                                    <Fragment>
                                                        Company Name
                                                        <span style={{ color: 'red' }}>*</span>
                                                    </Fragment>
                                                }
                                            />
                                            <ErrorMessage formikObj={addJobFormik} name={'companyId'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} className="mb-3 mt-2" direction="row"
                                        justifyContent="center"
                                        alignItems="flex-start">
                                        <Grid size={6} className="pr-2">
                                            <TextField fullWidth
                                                id="jobTitle"
                                                name="jobTitle"
                                                size="small"
                                                variant="outlined"
                                                type="text"
                                                value={addJobFormik.values.jobTitle}
                                                onChange={addJobFormik.handleChange}
                                                label={
                                                    <Fragment>
                                                        Position Title
                                                        <span style={{ color: 'red' }}>*</span>
                                                    </Fragment>
                                                }
                                            />
                                            <ErrorMessage formikObj={addJobFormik} name={'jobTitle'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                            {/* <div className='subTextForInput'>
                                                (This information will be published on job boards)
                                            </div> */}
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} className="mb-2" direction="row"
                                        justifyContent="center"
                                        alignItems="flex-start">
                                        <Grid size={6} className='pr-2'>
                                            <TextField fullWidth
                                                id="internalJobTitle"
                                                name="internalJobTitle"
                                                size="small"
                                                variant="outlined"
                                                type="text"
                                                value={addJobFormik.values.internalJobTitle}
                                                onChange={addJobFormik.handleChange}
                                                label={
                                                    <Fragment>
                                                        Internal position title
                                                        {/* <span style={{ color: 'red' }}>*</span> */}
                                                    </Fragment>
                                                }
                                            />
                                            <ErrorMessage formikObj={addJobFormik} name={'internalJobTitle'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                            {/* <div className='subTextForInput'>
                                                (This information will be published on job boards)
                                            </div> */}
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} className="mb-3" direction="row"
                                        justifyContent="center"
                                        alignItems="flex-start">
                                        <Grid size={6} className='pr-2'>
                                            <TextField
                                                type="text"
                                                id="referenceNo" name='referenceNo'
                                                size="small"
                                                label={
                                                    <>
                                                        Reference #
                                                        <span style={{ color: 'red' }}>*</span>
                                                    </>
                                                }
                                                variant="outlined"
                                                fullWidth
                                                value={addJobFormik.values.referenceNo}
                                                onChange={addJobFormik.handleChange}
                                            />
                                            <ErrorMessage formikObj={addJobFormik} name={'referenceNo'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} className="mb-3" direction="row"
                                        justifyContent="center"
                                        alignItems="flex-start">
                                        <Grid size={6} className='pr-2'>
                                            <TextField
                                                label={
                                                    <Fragment>
                                                        No. of Positions
                                                        <span style={{ color: 'red' }}>*</span>
                                                    </Fragment>
                                                }
                                                size="small"
                                                fullWidth
                                                id="openings"
                                                name="openings"
                                                value={addJobFormik.values.openings}
                                                onChange={addJobFormik.handleChange}
                                                type="number"
                                            />
                                            <ErrorMessage formikObj={addJobFormik} name={'openings'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                        </Grid>
                                    </Grid>
                                </div>

                            </CustomTabPanel>


                            <CustomTabPanel value={value} index={1}>

                                <div className='jobPanelDiv'>
                                    <Grid container spacing={2} className="mb-1 mt-3" direction="row"
                                        justifyContent="center"
                                        alignItems="flex-start">
                                        <Grid size={6} className='mt-1 pr-2'>
                                            <Box>
                                                <TextField
                                                    fullWidth
                                                    id="jobCategory"
                                                    name="jobCategory"
                                                    size="small"
                                                    variant="outlined"
                                                    select
                                                    value={addJobFormik.values.jobCategory}
                                                    onChange={addJobFormik.handleChange}
                                                    label={
                                                        <Fragment>
                                                            Labor Category
                                                            <span style={{ color: 'red' }}>*</span>
                                                        </Fragment>
                                                    }
                                                >
                                                    {
                                                        masterJobData.jobCategory.map(item => {
                                                            return <MenuItem value={item.id}> {item.label} </MenuItem>
                                                        })
                                                    }
                                                    {/* <MenuItem value=""></MenuItem>
                                                    <MenuItem value="490">Accounting Finance</MenuItem>
                                                    <MenuItem value="463">Admin Clerical</MenuItem>
                                                    <MenuItem value="37">Call Center</MenuItem>
                                                    <MenuItem value="492">Clinical</MenuItem>
                                                    <MenuItem value="491">Creative Marketing</MenuItem>
                                                    <MenuItem value="39">Engineering</MenuItem>
                                                    <MenuItem value="494">Health IT</MenuItem>
                                                    <MenuItem value="493">Healthcare</MenuItem>
                                                    <MenuItem value="58">Human Resources</MenuItem>
                                                    <MenuItem value="102">Industrial</MenuItem>
                                                    <MenuItem value="59">Information Technology</MenuItem>
                                                    <MenuItem value="497">Lab</MenuItem>
                                                    <MenuItem value="63">Legal</MenuItem>
                                                    <MenuItem value="498">Pharma</MenuItem>
                                                    <MenuItem value="496">Professional</MenuItem>
                                                    <MenuItem value="72">Sales</MenuItem>
                                                    <MenuItem value="103">Scientific</MenuItem>
                                                    <MenuItem value="495">Supply Chain</MenuItem> */}

                                                </TextField>
                                                <ErrorMessage formikObj={addJobFormik} name={'jobCategory'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                                {/* <div className='subTextForInput'>
                                                    (This information will be published on job boards)
                                                </div> */}
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} className="mb-1 mt-1" direction="row"
                                        justifyContent="center"
                                        alignItems="flex-start">
                                        <Grid size={6} className='mt-1 pr-2'>
                                            <Box>
                                                <TextField
                                                    fullWidth
                                                    label="Job Status"
                                                    id="pipelineStatus"
                                                    name="pipelineStatus"
                                                    size="small"
                                                    select
                                                    value={addJobFormik.values.pipelineStatus}
                                                    onChange={addJobFormik.handleChange}
                                                >
                                                    {/* <MenuItem value="0"></MenuItem> */}
                                                    {/* <MenuItem value="1: Open Req">Open</MenuItem>
                                                    <MenuItem value="0: Hold">Halted</MenuItem>
                                                    <MenuItem value="0: Inactive">Closed</MenuItem>
                                                    <MenuItem value="0: Canceled">Cancelled </MenuItem>
                                                    <MenuItem value="Pipeline">Pipeline</MenuItem>
                                                    <MenuItem value="Heads Up">Heads Up </MenuItem>
                                                    <MenuItem value="Re-Opened">Re-Opened </MenuItem>
                                                    <MenuItem value="Automation">Automation</MenuItem>
                                                    <MenuItem value="POC"> POC </MenuItem>
                                                    <MenuItem value="Knowledge Bank"> Knowledge Bank </MenuItem> */}
                                                    {
                                                        [...masterJobData.jobStatus].map((val) => {
                                                            return <MenuItem value={val.id} key={val.id}>{val.label}</MenuItem>
                                                        })

                                                    }
                                                    {/* <MenuItem value="2">Halted</MenuItem>
                                                    <MenuItem value="3">Closed</MenuItem>
                                                    <MenuItem value="4">Cancelled </MenuItem>
                                                    <MenuItem value="5">Pipeline</MenuItem>
                                                    <MenuItem value="6">Heads Up </MenuItem>
                                                    <MenuItem value="7">Re-Opened </MenuItem>
                                                    <MenuItem value="8">Automation</MenuItem>
                                                    <MenuItem value="9">POC </MenuItem>
                                                    <MenuItem value="10">Knowledge Bank </MenuItem> */}
                                                </TextField>
                                            </Box>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={2} className="mb-1 mt-2" direction="row"
                                        justifyContent="center"
                                        alignItems="flex-start">
                                        <Grid size={6} className='mt-2 pr-2'>
                                            <Box>
                                                <TextField
                                                    fullWidth
                                                    label="Priority"
                                                    id="priority"
                                                    name="priority"
                                                    size="small"
                                                    select
                                                    value={addJobFormik.values.priority}
                                                    onChange={addJobFormik.handleChange}
                                                >
                                                    <MenuItem value=""></MenuItem>
                                                    {
                                                        [...masterJobData.priority].map((val) => {
                                                            return <MenuItem value={val.id} key={val.id}>{val.label}</MenuItem>
                                                        })

                                                    }
                                                </TextField>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} className="mb-2 mt-4" direction="row"
                                        justifyContent="center"
                                        alignItems="flex-start">
                                        <Grid size={6} className='pr-2'>
                                            <Box>
                                                <TextField
                                                    fullWidth
                                                    label="Job Hours"
                                                    size="small"
                                                    id="jobHours"
                                                    name="jobHours"
                                                    value={addJobFormik.values.jobHours}
                                                    onChange={addJobFormik.handleChange}
                                                    select
                                                >
                                                    {
                                                        masterJobData.hours.map(item => {
                                                            return <MenuItem value={item.id}>{item.label}</MenuItem>
                                                        })
                                                    }
                                                    {/* <MenuItem value="0"></MenuItem>
                                                    <MenuItem value="1">Full-time</MenuItem>
                                                    <MenuItem value="2">Part-time</MenuItem> */}
                                                </TextField>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} className="mb-2 mt-4" direction="row"
                                        justifyContent="center"
                                        alignItems="flex-start">
                                        <Grid size={6} className='pr-2'>
                                            <Box>
                                                <TextField
                                                    fullWidth
                                                    label={
                                                        <Fragment>
                                                            Job Type
                                                            {/* <span style={{ color: 'red' }}>*</span> */}
                                                        </Fragment>
                                                    }
                                                    size="small"
                                                    id="jobType"
                                                    name='jobType'
                                                    variant="outlined"
                                                    select
                                                    value={addJobFormik.values.jobType}
                                                    onChange={addJobFormik.handleChange}
                                                >
                                                    {
                                                        masterJobData.type.map(item => {
                                                            return <MenuItem value={item.id}>{item.label}</MenuItem>
                                                        })
                                                    }
                                                    {/* <MenuItem value="0"></MenuItem>
                                                    <MenuItem value="1">Permanent </MenuItem>
                                                    <MenuItem value="2">Contract/Temp </MenuItem>
                                                    <MenuItem value="3">Contract to Perm </MenuItem>
                                                    <MenuItem value="4">Freelance</MenuItem> */}
                                                </TextField>
                                                <ErrorMessage formikObj={addJobFormik} name={'jobType'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} className="mb-4 mt-1" direction="row"
                                        justifyContent="center"
                                        alignItems="flex-start">
                                        <Grid size={6} className='pr-2'>
                                            <MUIAutoComplete
                                                id='contId'
                                                handleChange={(id: any, name: string | any) => {
                                                    let condArr = [undefined, null];
                                                    if (!condArr.includes(id) || !condArr.includes(name)) {
                                                        if ([0, "0"].includes(id)) {
                                                            createContact(name);
                                                        } else {
                                                            addJobFormik.setFieldValue('contId', id ? id : "", true);
                                                            addJobFormik.setFieldValue('contName', name ? name : "", true);
                                                        }
                                                    }
                                                }}
                                                addOnEnter={true}
                                                valuePassed={(addJobFormik.values.contId) ? { label: addJobFormik.values.contName, id: addJobFormik.values.contId } : {}}
                                                isMultiple={false} freeSolo={false}
                                                width="100%"
                                                type='contactName'
                                                placeholder={
                                                    <span>
                                                        Hiring Manager
                                                    </span>
                                                }

                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} className="mb-1 mt-1" direction="row"
                                        justifyContent="center"
                                        alignItems="flex-start">
                                        <Grid size={6} className='pr-2'>
                                            <TextField
                                                label="Business Unit"
                                                id="businessUnit"
                                                name='businessUnit'
                                                size="small"
                                                variant="outlined"
                                                fullWidth
                                                value={addJobFormik.values.businessUnit}
                                                onChange={addJobFormik.handleChange} />
                                        </Grid>
                                    </Grid>
                                </div>

                            </CustomTabPanel>


                            <CustomTabPanel value={value} index={2}>
                                <div className='jobPanelDiv'>
                                    <Grid container spacing={2} className="mb-3" direction="row"
                                        justifyContent="center"
                                        alignItems="flex-start">
                                        <Grid size={6} className='pr-2'>
                                            <label className='inputLabel'>Work Location Type<span style={{ color: 'red' }}>*</span></label>

                                            <FormControl>
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="worklocation-radio-buttons-group-label"
                                                    name="workType"
                                                    value={addJobFormik.values.workType}
                                                    onChange={addJobFormik.handleChange}
                                                >
                                                    {
                                                        masterJobData.workType.map(item => {
                                                            return <FormControlLabel value={item.id} control={<Radio />} label={item.label} />
                                                        })
                                                    }

                                                    {/* <FormControlLabel value="1" control={<Radio />} label="Remote" />
                                                    <FormControlLabel value="2" control={<Radio />} label="Hybrid" />
                                                    <FormControlLabel value="3" control={<Radio />} label="On-Site" /> */}

                                                </RadioGroup>
                                                <ErrorMessage formikObj={addJobFormik} name={'workType'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} className="mb-3" direction="row"
                                        justifyContent="center"
                                        alignItems="flex-start">

                                        <Grid size={6} className='pr-2'>
                                            <Stack>
                                                <label className='inputLabel'>Is the Candidate required to reside in a specific location?<span style={{ color: 'red' }}>*</span></label>

                                                <FormControl>
                                                    <RadioGroup
                                                        row
                                                        aria-labelledby="Candidate-require-row-radio-buttons-group-label"
                                                        name="specificLocation"
                                                        value={addJobFormik.values.specificLocation}
                                                        onChange={addJobFormik.handleChange}
                                                    >
                                                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                                        <FormControlLabel value="No" control={<Radio />} label="No" />
                                                    </RadioGroup>
                                                    <ErrorMessage formikObj={addJobFormik} name={'specificLocation'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                                </FormControl>
                                            </Stack>
                                        </Grid>

                                    </Grid>
                                    <Grid container spacing={2} className="mb-2" direction="row"
                                        justifyContent="center"
                                        alignItems="flex-start">
                                        <Grid size={6} className='pr-2'>
                                            <label className='inputLabel'>Candidate Location {(addJobFormik.values.specificLocation === "Yes") ? <span style={{ color: 'red' }}>*</span> : null}</label>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} className="mb-3" direction="row"
                                        justifyContent="center"
                                        alignItems="flex-start">
                                        <Grid size={6} className='pr-2'>


                                            <Box>

                                                <TextField fullWidth
                                                    id="candidateLocation"
                                                    name='candidateLocation'
                                                    size="small"
                                                    placeholder="Enter Zipcode or City, State or State Time Zone  "
                                                    value={addJobFormik.values.candidateLocation}
                                                    onChange={addJobFormik.handleChange}
                                                >

                                                </TextField>
                                                <ErrorMessage formikObj={addJobFormik} name={'candidateLocation'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                            </Box>

                                        </Grid>


                                    </Grid>
                                    {/* <Grid size={6} className='pr-2'>
                                            <Box>
                                                <TextField fullWidth label="Work Location"
                                                    id="workLocation"
                                                    name='workLocation'
                                                    size="small"
                                                    placeholder="Enter Zipcode or City, State or State Time Zone  "
                                                    value={addJobFormik.values.candidateLocation}
                                                    onChange={addJobFormik.handleChange}
                                                >

                                                </TextField>
                                            </Box>
                                        </Grid> */}
                                    {/* <Grid size={6} className='pr-2'>
                                            <Box>
                                                <FormControlLabel
                                                    control={<Checkbox />}
                                                    label="Remote Job"
                                                    labelPlacement="end"
                                                    id="remoteJob"
                                                    name="remoteJob"
                                                    value={addJobFormik.values.remoteJob}
                                                    onChange={addJobFormik.handleChange}
                                                    sx={{ mr: 0 }}
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid size={6} className='pr-2'>
                                            <Box>
                                                <TextField fullWidth
                                                    label="Remote Job"
                                                    id="remote_value"
                                                    name="remote_value"
                                                    select
                                                    size="small"
                                                    value={addJobFormik.values.remote_value}
                                                    onChange={addJobFormik.handleChange}
                                                    disabled={!addJobFormik.values.remoteJob}
                                                >
                                                    <MenuItem value=""></MenuItem>
                                                    <MenuItem value="always">Always </MenuItem>
                                                    <MenuItem value="until covid">Until Covid</MenuItem>
                                                </TextField>
                                            </Box>
                                        </Grid> */}
                                    <Grid container spacing={2} className="mb-2" direction="row"
                                        justifyContent="center"
                                        alignItems="flex-start">
                                        <Grid size={6} className='pr-2'>
                                            <label className='inputLabel'>Work Location</label>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} className="mb-2" direction="row"
                                        justifyContent="center"
                                        alignItems="flex-start">
                                        <Grid size={6} className='pr-2'>
                                            <TextField
                                                label={
                                                    <Fragment>
                                                        Street Address :
                                                        {/* <span style={{ color: 'red' }}>*</span> */}
                                                    </Fragment>
                                                }
                                                id="streetAddress"
                                                name='streetAddress'
                                                size="small"
                                                variant="outlined"
                                                fullWidth
                                                value={addJobFormik.values.streetAddress}
                                                onChange={addJobFormik.handleChange} />
                                            <ErrorMessage formikObj={addJobFormik} name={'streetAddress'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} className="mb-2" direction="row"
                                        justifyContent="center"
                                        alignItems="flex-start">
                                        <Grid size={6} className='pr-2'>
                                            <TextField
                                                label={
                                                    <Fragment>
                                                        Job City
                                                        {
                                                            (addJobFormik.values.workType !== "1") ?
                                                                <span style={{ color: 'red' }}>*</span>
                                                                :
                                                                null
                                                        }
                                                    </Fragment>
                                                }
                                                id="jobCity"
                                                name='jobCity'
                                                size="small"
                                                fullWidth
                                                value={addJobFormik.values.jobCity}
                                                onChange={addJobFormik.handleChange}
                                            />
                                            <ErrorMessage formikObj={addJobFormik} name={'jobCity'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} className="mb-2" direction="row"
                                        justifyContent="center"
                                        alignItems="flex-start">
                                        <Grid size={6} className='pr-2'>
                                            <Box>
                                                <TextField fullWidth
                                                    label={
                                                        <Fragment>
                                                            State or Prov :
                                                            {
                                                                (addJobFormik.values.workType !== "1") ?
                                                                    <span style={{ color: 'red' }}>*</span>
                                                                    :
                                                                    null
                                                            }
                                                        </Fragment>
                                                    }
                                                    id="stateOrPro"
                                                    name='stateOrPro'
                                                    size="small"
                                                    variant="outlined"
                                                    select
                                                    value={addJobFormik.values.stateOrPro}
                                                    onChange={addJobFormik.handleChange} >
                                                    <MenuItem value="">--Select State--</MenuItem>
                                                    {
                                                        [...masterStatesList].map((state) => {
                                                            return <MenuItem value={state.id}>{state.label}</MenuItem>
                                                        })
                                                    }
                                                </TextField>
                                                <ErrorMessage formikObj={addJobFormik} name={'stateOrPro'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} className="mb-2" direction="row"
                                        justifyContent="center"
                                        alignItems="flex-start">
                                        <Grid size={6} className='pr-2'>
                                            <TextField
                                                label={
                                                    <Fragment>
                                                        Job Postal Code
                                                        {
                                                            (addJobFormik.values.workType !== "1") ?
                                                                <span style={{ color: 'red' }}>*</span>
                                                                :
                                                                null
                                                        }
                                                    </Fragment>
                                                }
                                                size="small"
                                                fullWidth
                                                id="jobPostalCode"
                                                name='jobPostalCode'
                                                value={addJobFormik.values.jobPostalCode}
                                                onChange={addJobFormik.handleChange}
                                            />
                                            <ErrorMessage formikObj={addJobFormik} name={'jobPostalCode'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} className="mb-2" direction="row"
                                        justifyContent="center"
                                        alignItems="flex-start">
                                        <Grid size={6} className='pr-2'>

                                            <LocalizationProvider dateAdapter={AdapterLuxon} >
                                                <DatePicker
                                                    label="Start Date"
                                                    slotProps={{ textField: { size: 'small' } }}
                                                    sx={{ width: '100%' }}
                                                    onChange={(date: any) => addJobFormik.setFieldValue("startDate", (date) ? date?.toFormat('MM/dd/yyyy') : null, true)}
                                                    value={(addJobFormik.values.startDate) ? DateTime.fromFormat(addJobFormik.values.startDate, 'MM/dd/yyyy') : null}
                                                    minDate={(addJobFormik?.values?.startDate) ? (
                                                        new Date(addJobFormik?.values?.startDate).getTime() > new Date().getTime() ?
                                                            DateTime.now() : DateTime.fromFormat(addJobFormik.values.startDate, 'MM/dd/yyyy')) : DateTime.now()}
                                                />
                                            </LocalizationProvider>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} className="mb-2 mt-2" direction="row"
                                        justifyContent="center"
                                        alignItems="flex-start">
                                        <Grid size={6} className='pr-2'>
                                            <LocalizationProvider dateAdapter={AdapterLuxon} >
                                                <DatePicker
                                                    label="Est.End Date"
                                                    slotProps={{ textField: { size: 'small' } }}
                                                    sx={{ width: '100%' }}
                                                    minDate={(addJobFormik.values.startDate) ? DateTime.fromFormat(addJobFormik.values.startDate, 'MM/dd/yyyy') : DateTime.now()}
                                                    // onChange={(newValue) => {
                                                    //     const newEndDate = newValue ? newValue.toFormat("MM/dd/yyyy") : '';
                                                    //     const currentStartDate = addJobFormik.values.startDate;

                                                    //     if (currentStartDate && DateTime.fromFormat(newEndDate, "MM/dd/yyyy") <= DateTime.fromFormat(currentStartDate, "MM/dd/yyyy")) {
                                                    //         showToaster('End date cannot be before start date.', 'error');
                                                    //     } else {
                                                    //         addJobFormik.setFieldValue('endDate', newEndDate);
                                                    //     }
                                                    // }}
                                                    onChange={(date: any) => addJobFormik.setFieldValue("endDate", (date) ? date?.toFormat('MM/dd/yyyy') : null, true)}
                                                    value={(addJobFormik.values.endDate) ? DateTime.fromFormat(addJobFormik.values.endDate, 'MM/dd/yyyy') : null}
                                                />
                                            </LocalizationProvider>
                                        </Grid>
                                    </Grid>
                                    <Grid size={12} className="mt-2">
                                        <Grid container spacing={2} className="mb-2 mt-2" direction="row"
                                            justifyContent="center"
                                            alignItems="flex-start">
                                            <Grid size={6} className="mb-2">
                                                <label className='inputLabel'>Schedule Days</label>
                                            </Grid>
                                            <Grid size={12} className="mb-2">
                                                {addJobFormik.values.jobShift.map((schedule: any, i: number) => (
                                                    <Box key={i} sx={{ marginBottom: 2 }}>

                                                        <Grid
                                                            container
                                                            direction="row"
                                                            justifyContent="start"
                                                            alignItems="start"
                                                            spacing={2}
                                                        >

                                                            <Grid size={3} spacing={1} ></Grid>
                                                            <Grid size={9} spacing={1} >
                                                                <ToggleButtonGroup
                                                                    id={`days${i}`}
                                                                    value={schedule.days}
                                                                    onChange={(e, newFormats) => handleScheduleChange(i, 'days', newFormats)}
                                                                    aria-label="Working Day"
                                                                >
                                                                    <ToggleButton value="MON" className="togglewidth"  >  MON  </ToggleButton>
                                                                    <ToggleButton value="TUE" className="togglewidth" >  TUE </ToggleButton>
                                                                    <ToggleButton value="WED" className="togglewidth" >  WED </ToggleButton>
                                                                    <ToggleButton value="THU" className="togglewidth"  >  THU </ToggleButton>
                                                                    <ToggleButton value="FRI" className="togglewidth" >  FRI </ToggleButton>
                                                                    <ToggleButton value="SAT" className="togglewidth" >  SAT </ToggleButton>
                                                                    <ToggleButton value="SUN" className="togglewidth" >  SUN </ToggleButton>
                                                                </ToggleButtonGroup>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container spacing={2} className="mb-3 mt-0" direction="row"
                                                            justifyContent="start"
                                                            alignItems="start">
                                                            <Grid size={3} container spacing={1} className="pt-2"></Grid>
                                                            <Grid size={9} container spacing={1} className="pt-2">
                                                                {/* Start Time Picker */}
                                                                <Grid size={3}>
                                                                    <InputLabel id="start-time-label" className="p-2">Start Time</InputLabel>
                                                                    <LocalizationProvider dateAdapter={AdapterLuxon}>
                                                                        <TimePicker
                                                                            slotProps={{ textField: { size: 'small' } }}
                                                                            value={schedule.startTime}
                                                                            onChange={(newValue) => handleScheduleChange(i, 'startTime', newValue)}


                                                                        // renderInput={(params:TextFieldProps) => <TextField {...params} size="small" fullWidth />}
                                                                        />
                                                                    </LocalizationProvider>
                                                                </Grid>
                                                                {/* End Time Picker */}
                                                                <Grid size={3}>
                                                                    <InputLabel id="timezone-label" className="p-2">End Time</InputLabel>
                                                                    <LocalizationProvider dateAdapter={AdapterLuxon}>
                                                                        <TimePicker
                                                                            slotProps={{ textField: { size: 'small' } }}
                                                                            value={schedule.endTime}
                                                                            onChange={(newValue) => handleScheduleChange(i, 'endTime', newValue)}
                                                                        // renderInput={(params:TextFieldProps) => <TextField {...params} size="small" fullWidth />}
                                                                        />
                                                                    </LocalizationProvider>
                                                                </Grid>
                                                                {/* Time Zone Dropdown */}
                                                                <Grid size={3}>
                                                                    <InputLabel id="timezone-label" className="p-2">Timezone</InputLabel>
                                                                    <TextField
                                                                        select
                                                                        size="small"
                                                                        fullWidth
                                                                        placeholder="Select Timezone"
                                                                        value={schedule.timeZone || " "}
                                                                        onChange={(e) => handleScheduleChange(i, 'timeZone', e.target.value)}
                                                                    >
                                                                        <MenuItem value="" disabled>Select Timezone</MenuItem>

                                                                        <MenuItem value="EST"> EST </MenuItem>
                                                                        <MenuItem value="CST"> CST </MenuItem>
                                                                        <MenuItem value="MST"> MST </MenuItem>
                                                                        <MenuItem value="PST"> PST </MenuItem>
                                                                    </TextField>
                                                                </Grid>
                                                                <Grid size={3} style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>

                                                                    <IconButton onClick={() => handleDeleteSchedule(i)}>
                                                                        <CloseIcon />
                                                                    </IconButton>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                ))}
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2} className="mb-2" direction="row"
                                            justifyContent="center"
                                            alignItems="flex-start">
                                            <Grid size={6} container spacing={1}>
                                                <Button startIcon={<AddIcon />} onClick={handleAddSchedule}>
                                                    Add Schedule
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={2} className="mt-2 mb-2" direction="row" justifyContent="center" alignItems="flex-start">
                                        <Grid size={6} className="mt-1 mb-1"><label className='inputLabel'>Bill Rate</label></Grid>
                                    </Grid>

                                    <Grid container spacing={2} className="mb-2" direction="row" justifyContent="start" alignItems="flex-start">
                                        <Grid size={3} className="mt-2 mb-1"></Grid>
                                        <Grid size={9} className="mb-1">
                                            <Grid container direction="row" justifyContent="start" alignItems="center">
                                                <TextField
                                                    label={<Fragment>Min</Fragment>}
                                                    size="small"
                                                    fullWidth
                                                    id="billRateMin"
                                                    name='billRateMin'
                                                    value={addJobFormik.values.billRateMin}
                                                    onChange={addJobFormik.handleChange}
                                                    onBlur={() => {
                                                        const min = Number(addJobFormik.values.billRateMin);
                                                        const max = Number(addJobFormik.values.billRateMax);
                                                        const payrateMin = Number(addJobFormik.values.payrateMin);
                                                        let error = false;
                                                        if (min && max && min > max) {
                                                            addJobFormik.setFieldError('billRateMin', "Minimum Bill Rate should be less than Maximum");
                                                            error = true;
                                                        }
                                                        
                                                        if (min && Number(addJobFormik.values.payrateType) && Number(addJobFormik.values.billRateType) && (Number(addJobFormik.values.billRateType) === Number(addJobFormik.values.payrateType))) {
                                                            if (payrateMin && payrateMin > min) {
                                                                addJobFormik.setFieldError('billRateMin', "Minimum Bill Rate should be greater than Minimum Pay Rate");
                                                                error = true;
                                                            }
                                                        }

                                                        if(!error) {
                                                            calculatePayRate('min')
                                                        }
                                                    }}
                                                    type="number"
                                                    sx={{ maxWidth: "100px" }}
                                                />
                                                <label>  &nbsp; - &nbsp; </label>
                                                <TextField
                                                    label={<Fragment>Max</Fragment>}
                                                    size="small"
                                                    fullWidth
                                                    id="billRateMax"
                                                    name='billRateMax'
                                                    value={addJobFormik.values.billRateMax}
                                                    onChange={addJobFormik.handleChange}
                                                    onBlur={() => {
                                                        const min = Number(addJobFormik.values.billRateMin);
                                                        const max = Number(addJobFormik.values.billRateMax);
                                                        const payrateMax = Number(addJobFormik.values.payrateMax);
                                                        let error = false;
                                                        if (max && min && max < min) {
                                                            addJobFormik.setFieldError('billRateMax', "Maximum Bill Rate should be greater than Minimum");
                                                            error = true;
                                                        }
                                                        
                                                        if (max && Number(addJobFormik.values.payrateType) && Number(addJobFormik.values.billRateType) && (Number(addJobFormik.values.billRateType) === Number(addJobFormik.values.payrateType))) {
                                                            if (payrateMax && payrateMax > max) {
                                                                addJobFormik.setFieldError('billRateMax', "Maximum Bill Rate should be greater than Maximum Pay Rate");
                                                                error = true;
                                                            }
                                                        } 

                                                        if(!error) {
                                                            calculatePayRate('max');
                                                        }
                                                        
                                                    }}
                                                    type="number"
                                                    sx={{ maxWidth: '100px' }}
                                                />
                                                <label>  &nbsp; / &nbsp; </label>
                                                <TextField
                                                    label="Type"
                                                    size="small"
                                                    fullWidth
                                                    id="billRateType"
                                                    name='billRateType'
                                                    value={addJobFormik.values.billRateType}
                                                    onChange={addJobFormik.handleChange}
                                                    select
                                                    sx={{ maxWidth: "150px" }}
                                                >
                                                    <MenuItem value="1">Hour</MenuItem>
                                                    <MenuItem value="2">Day</MenuItem>
                                                    <MenuItem value="3">Week</MenuItem>
                                                    <MenuItem value="4">Month</MenuItem>
                                                    <MenuItem value="5">Year</MenuItem>
                                                    <MenuItem value="6">Milestone</MenuItem>
                                                    <MenuItem value="7">Project</MenuItem>
                                                </TextField>
                                                <ErrorMessage formikObj={addJobFormik} name={'billRateType'} isFormSubmitted={isFormSubmitted}></ErrorMessage>

                                            </Grid>
                                            <Grid container spacing={2} direction="row" justifyContent="start" alignItems="flex-start">
                                                {
                                                    typeof addJobFormik.errors.billRateMin === 'string' ?
                                                        <Grid size={12}><Typography variant="caption" color="error">{addJobFormik.errors.billRateMin}</Typography></Grid>
                                                        :
                                                        typeof addJobFormik.errors.billRateMax === 'string' ?
                                                            <Grid size={12}> <Typography variant="caption" color="error">{addJobFormik.errors.billRateMax}</Typography></Grid>
                                                            :
                                                            null
                                                }
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={2} className="mt-2 mb-2" direction="row" justifyContent="center" alignItems="flex-start">
                                        <Grid size={6} className="mt-1 mb-1"><label className='inputLabel'>PayRate{<span style={{ color: 'red' }}>*</span>}</label></Grid>
                                    </Grid>

                                    <Grid container spacing={2} className="mb-2" direction="row" justifyContent="start" alignItems="flex-start">
                                        <Grid size={3} className="mt-2 mb-1"></Grid>
                                        <Grid size={9} className="mb-1">
                                            <Grid container direction="row" justifyContent="start" alignItems="center">
                                                <TextField
                                                    label={<Fragment>Min{<span style={{ color: 'red' }}>*</span>}</Fragment>}
                                                    size="small"
                                                    fullWidth
                                                    id="payrateMin"
                                                    name='payrateMin'
                                                    value={addJobFormik.values.payrateMin}
                                                    onChange={addJobFormik.handleChange}
                                                    onBlur={() => {
                                                        const min = Number(addJobFormik.values.payrateMin);
                                                        const max = Number(addJobFormik.values.payrateMax);
                                                        if (min && max && min > max) {
                                                            addJobFormik.setFieldError('payrateMin', "Minimum PayRate should be less than Maximum");
                                                        }
                                                    }}
                                                    type="number"
                                                    sx={{ maxWidth: "100px" }}
                                                />
                                                {/* <ErrorMessage formikObj={addJobFormik} name={'payrateMin'} isFormSubmitted={isFormSubmitted}></ErrorMessage> */}

                                                <label>  &nbsp; - &nbsp; </label>
                                                <TextField
                                                    label={<Fragment>Max{<span style={{ color: 'red' }}>*</span>}</Fragment>}
                                                    size="small"
                                                    fullWidth
                                                    id="payrateMax"
                                                    name='payrateMax'
                                                    value={addJobFormik.values.payrateMax}
                                                    onChange={addJobFormik.handleChange}
                                                    onBlur={() => {
                                                        const min = Number(addJobFormik.values.payrateMin);
                                                        const max = Number(addJobFormik.values.payrateMax);
                                                        if (max && min && max < min) {
                                                            addJobFormik.setFieldError('payrateMax', "Maximum PayRate should be greater than Minimum");
                                                        }
                                                    }}
                                                    type="number"
                                                    sx={{ maxWidth: '100px' }}
                                                />
                                                {/* <ErrorMessage formikObj={addJobFormik} name={'payrateMax'} isFormSubmitted={isFormSubmitted}></ErrorMessage> */}
                                                <label>  &nbsp; / &nbsp; </label>
                                                <TextField
                                                    label="Type"
                                                    size="small"
                                                    fullWidth
                                                    id="payrateType"
                                                    name='payrateType'
                                                    value={addJobFormik.values.payrateType}
                                                    onChange={addJobFormik.handleChange}
                                                    select
                                                    sx={{ maxWidth: "150px" }}
                                                >
                                                    <MenuItem value="1">Hour</MenuItem>
                                                    <MenuItem value="2">Day</MenuItem>
                                                    <MenuItem value="3">Week</MenuItem>
                                                    <MenuItem value="4">Month</MenuItem>
                                                    <MenuItem value="5">Year</MenuItem>
                                                    <MenuItem value="6">Milestone</MenuItem>
                                                    <MenuItem value="7">Project</MenuItem>
                                                </TextField>
                                                <ErrorMessage formikObj={addJobFormik} name={'payrateType'} isFormSubmitted={isFormSubmitted}></ErrorMessage>

                                            </Grid>
                                            <Grid container spacing={2} direction="row" justifyContent="start" alignItems="flex-start">
                                                {
                                                    typeof addJobFormik.errors.payrateMin === 'string' ?
                                                        <Grid size={12}><Typography variant="caption" color="error">{addJobFormik.errors.payrateMin}</Typography></Grid>
                                                        :
                                                        typeof addJobFormik.errors.payrateMax === 'string' ?
                                                            <Grid size={12}> <Typography variant="caption" color="error">{addJobFormik.errors.payrateMax}</Typography></Grid>
                                                            :
                                                            null
                                                }
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={2} className="mt-2 mb-2" direction="row" justifyContent="center" alignItems="flex-start">
                                        <Grid size={6} className="mt-1 mb-1"><label className='inputLabel'>Discounted Bill Rate</label></Grid>
                                    </Grid>

                                    <Grid container spacing={2} className="mb-2" direction="row" justifyContent="start" alignItems="flex-start">
                                        <Grid size={3} className="mt-2 mb-1"></Grid>
                                        <Grid size={9} className="mb-1">
                                            <Grid container direction="row" justifyContent="start" alignItems="center">
                                                <TextField
                                                    label={<Fragment>Min</Fragment>}
                                                    size="small"
                                                    fullWidth
                                                    id="dsBillMin"
                                                    name='dsBillMin'
                                                    value={addJobFormik.values.dsBillMin}
                                                    onChange={addJobFormik.handleChange}
                                                    onBlur={() => {
                                                        const min = Number(addJobFormik.values.dsBillMin);
                                                        const max = Number(addJobFormik.values.dsBillMax);
                                                        const billrateMin = Number(addJobFormik.values.billRateMin);
                                                        const payrateMin = Number(addJobFormik.values.payrateMin);
                                                        if (min && max && min > max) {
                                                            addJobFormik.setFieldError('dsBillMin', "Minimum Discounted Bill Rate should be less than Maximum");
                                                        }

                                                        if (min && Number(addJobFormik.values.dsBillType) && Number(addJobFormik.values.payrateType) && (Number(addJobFormik.values.payrateType) === Number(addJobFormik.values.dsBillType))) {
                                                            if (payrateMin && payrateMin > min) {
                                                                addJobFormik.setFieldError('dsBillMin', "Minimum Discounted Bill Rate should be greter than Minimum Pay Rate");
                                                            }
                                                        }

                                                        if (min && Number(addJobFormik.values.dsBillType) && Number(addJobFormik.values.billRateType) && (Number(addJobFormik.values.billRateType) === Number(addJobFormik.values.dsBillType))) {
                                                            if (billrateMin && billrateMin < min) {
                                                                addJobFormik.setFieldError('dsBillMin', "Minimum Discounted Bill Rate should be lesser than Minimum Bill Rate");
                                                            }
                                                        }
                                                    }}
                                                    type="number"
                                                    sx={{ maxWidth: "100px" }}
                                                />
                                                <label>  &nbsp; - &nbsp; </label>
                                                <TextField
                                                    label={<Fragment>Max</Fragment>}
                                                    size="small"
                                                    fullWidth
                                                    id="dsBillMax"
                                                    name='dsBillMax'
                                                    value={addJobFormik.values.dsBillMax}
                                                    onChange={addJobFormik.handleChange}
                                                    onBlur={() => {
                                                        const min = Number(addJobFormik.values.dsBillMin);
                                                        const max = Number(addJobFormik.values.dsBillMax);
                                                        const billrateMax = Number(addJobFormik.values.billRateMax);
                                                        const payrateMax = Number(addJobFormik.values.payrateMax);
                                                        if (max && min && max < min) {
                                                            addJobFormik.setFieldError('dsBillMax', "Maximum Discounted Bill Rate should be greater than Minimum");
                                                        }

                                                        if (max && Number(addJobFormik.values.dsBillType) && Number(addJobFormik.values.payrateType) && (Number(addJobFormik.values.payrateType) === Number(addJobFormik.values.dsBillType))) {
                                                            if (payrateMax && payrateMax > max) {
                                                                addJobFormik.setFieldError('dsBillMax', "Maximum Discounted Bill Rate should be greater than Maximum Pay Rate");
                                                            }
                                                        }

                                                        if (max && Number(addJobFormik.values.dsBillType) && Number(addJobFormik.values.billRateType) && (Number(addJobFormik.values.billRateType) === Number(addJobFormik.values.dsBillType))) {
                                                            if (billrateMax && billrateMax < max) {
                                                                addJobFormik.setFieldError('dsBillMax', "Maximum Discounted Bill Rate should be lesser than Maximum Bill Rate");
                                                            }
                                                        }
                                                    }}
                                                    type="number"
                                                    sx={{ maxWidth: '100px' }}
                                                />
                                                <label>  &nbsp; / &nbsp; </label>
                                                <TextField
                                                    label="Type"
                                                    size="small"
                                                    fullWidth
                                                    id="dsBillType"
                                                    name='dsBillType'
                                                    value={addJobFormik.values.dsBillType}
                                                    onChange={addJobFormik.handleChange}
                                                    select
                                                    sx={{ maxWidth: "150px" }}
                                                >
                                                    <MenuItem value="1">Hour</MenuItem>
                                                    <MenuItem value="2">Day</MenuItem>
                                                    <MenuItem value="3">Week</MenuItem>
                                                    <MenuItem value="4">Month</MenuItem>
                                                    <MenuItem value="5">Year</MenuItem>
                                                    <MenuItem value="6">Milestone</MenuItem>
                                                    <MenuItem value="7">Project</MenuItem>
                                                </TextField>
                                                <ErrorMessage formikObj={addJobFormik} name={'dsBillType'} isFormSubmitted={isFormSubmitted}></ErrorMessage>

                                            </Grid>
                                            <Grid container spacing={2} direction="row" justifyContent="start" alignItems="flex-start">
                                                {
                                                    typeof addJobFormik.errors.dsBillMin === 'string' ?
                                                        <Grid size={12}><Typography variant="caption" color="error">{addJobFormik.errors.dsBillMin}</Typography></Grid>
                                                        :
                                                        typeof addJobFormik.errors.dsBillMax === 'string' ?
                                                            <Grid size={12}> <Typography variant="caption" color="error">{addJobFormik.errors.dsBillMax}</Typography></Grid>
                                                            :
                                                            null
                                                }
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                </div>

                            </CustomTabPanel>

                            <CustomTabPanel value={value} index={3}>
                                <div className='jobPanelDiv'>
                                    <Grid container spacing={2} className="mb-2">
                                        <Grid size={6} className='pr-2'>
                                            <MUIAutoComplete
                                                id='primaryRecruiter'
                                                handleChange={(id: any, name: string) => {
                                                    addJobFormik.setFieldValue('primaryRecruiter', id, true);
                                                    addJobFormik.setFieldValue('primaryName', name, true);
                                                }}
                                                valuePassed={(addJobFormik.values.primaryRecruiter) ? { label: addJobFormik.values.primaryName, id: addJobFormik.values.primaryRecruiter } : {}}
                                                isMultiple={false}
                                                width="100%"
                                                type='id'
                                                placeholder={
                                                    <span>
                                                        Select Primary Recruiter <span style={{ color: 'red' }}>*</span>
                                                    </span>
                                                }

                                            />
                                            <ErrorMessage formikObj={addJobFormik} name={'primaryRecruiter'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} className="mb-2">
                                        <Grid size={6} className='pr-2'>
                                            <MUIAutoComplete
                                                id='collaborator'
                                                handleChange={(id: any, name: string) => {
                                                    addJobFormik.setFieldValue('collaborator', id);
                                                    addJobFormik.setFieldValue('collaboratorName', name);
                                                }}
                                                // valuePassed={(addJobFormik.values.collaboratorName) ? { label: addJobFormik.values.collaboratorName, id: addJobFormik.values.collaborator || "0" } : {}}

                                                valuePassed={
                                                    Array.isArray((addJobFormik.values.collaborator)) ?
                                                        { label: addJobFormik.values.collaboratorName.join(), id: addJobFormik.values.collaborator.join() }
                                                        :
                                                        (addJobFormik.values.collaborator) ?
                                                            { label: addJobFormik.values.collaboratorName, id: addJobFormik.values.collaborator }
                                                            :
                                                            {}
                                                }
                                                isMultiple={true}
                                                width="100%"
                                                type='id'
                                                placeholder="Select Collaborator"
                                            />
                                            {/* <TextField
                                                label={"Collaborator"}
                                                size="small"
                                                fullWidth
                                                id="collaborator"
                                                name='collaborator'
                                                value={addJobFormik.values.collaborator}
                                                onChange={addJobFormik.handleChange}
                                            /> */}
                                        </Grid>

                                    </Grid>

                                    <Grid container spacing={2} className="mb-3 mt-2" direction="row"
                                        justifyContent="center"
                                        alignItems="flex-start">
                                        <Grid size={12} className='pr-2'>
                                            <label className="inputLabel">Public Job Description <span style={{ color: 'red' }}>*</span></label><span className='subTextForInput'> (This information will be published on job boards)</span>
                                            {isFormatJDEnabled && <div className='button-group'><Button onClick={() => getFormattedJD(addJobFormik.values.publicDescription)} variant="outlined"
                                                type='button'
                                                startIcon={<AutoFixHighOutlinedIcon />}
                                                className='mr-2 ' style={{ float: 'right', cursor: 'pointer' }}>Job Formatter</Button>
                                            </div>
                                            }

                                            <div className='mt-1'>

                                                <Editor
                                                    toolbarId='publicDescription'
                                                    placeholder='Public Description'
                                                    id='publicDescription'
                                                    handleChange={(e: any) => {
                                                        addJobFormik.setFieldValue('publicDescription', e);
                                                    }}
                                                    editorHtml={addJobFormik.values.publicDescription}
                                                    mentions={false}
                                                    saveTemplate={false}
                                                />
                                            </div>
                                            <div style={{ paddingTop: '10px' }}>
                                                <ErrorMessage formikObj={addJobFormik} name={'publicDescription'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} className="mb-2" direction="row"
                                        justifyContent="center"
                                        alignItems="flex-start">
                                        <Grid size={12} className='pr-2'>
                                            <label className="inputLabel">Original Job Description <span style={{ color: 'red' }}>*</span></label>
                                            <div>
                                                <Editor
                                                    toolbarId='originalDescription'
                                                    placeholder='Internal Description'
                                                    id='originalDescription'
                                                    handleChange={(e: any) => {
                                                        addJobFormik.setFieldValue('originalDescription', e);
                                                    }}
                                                    editorHtml={addJobFormik.values.originalDescription}
                                                    mentions={false}
                                                    saveTemplate={false}
                                                />
                                            </div>
                                            <div style={{ paddingTop: '10px' }}>
                                                <ErrorMessage formikObj={addJobFormik} name={'originalDescription'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                            </div>
                                        </Grid>
                                    </Grid>

                                </div>

                            </CustomTabPanel>

                            {
                                isCareerPortalEnabled ?
                                    <CustomTabPanel value={value} index={4}>
                                        <div className='jobPanelDiv p-0'>

                                            <FormContainer callParentSave={saveFormBuilderData} cancelClicked={formbuilderCancel} formIdPassed={""} formNamePassed={""} isFormBuilder={false} showSave={false} showCancel={false} customFields={true} />
                                            {/* <Grid container spacing={2} className="mb-2 mt-5" direction="row"
                                        justifyContent="center"
                                        alignItems="flex-start">
                                        <Grid size={6} className='pr-2'>
                                            <MUIAutoComplete
                                                id='formId'
                                                handleChange={(id: any, name: string) => {
                                                    addJobFormik.setFieldValue('formId', id);
                                                    addJobFormik.setFieldValue('formName', name);
                                                }}
                                                valuePassed={(addJobFormik.values.formId) ? { label: addJobFormik.values.formName, id: addJobFormik.values.formId } : {}}
                                                isMultiple={false}
                                                textToShow="Select Form"
                                                width="100%"
                                                type='formbuilder'
                                                placeholder="Search Form"
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} className="mb-2 mt-5" direction="row"
                                        justifyContent="center"
                                        alignItems="flex-start">
                                        <Grid size={6} className='pr-2'>
                                            <Button variant="outlined" color="primary" type="button"
                                                onClick={() => {
                                                    window.open(globalData.getWindowLocation() + "letter/formBuilder/add");
                                                }}
                                            >
                                                Add New Form
                                            </Button>
                                        </Grid>
                                    </Grid> */}
                                        </div>
                                    </CustomTabPanel>
                                    :
                                    null
                            }
                            {
                                isWorkflowEnabled ?
                                    jobData?.jobId && jobData?.workflowDetails?.workflow_job_id ?
                                        <CustomTabPanel value={value} index={5}>
                                            <div className='jobPanelDiv'>
                                                <ViewWorkflow ref={assignWorkflowRef} workflowJobID={jobData?.workflowDetails?.workflow_job_id} closePopup={hideAssignWorkflow} />

                                            </div>
                                        </CustomTabPanel>
                                        :
                                        <CustomTabPanel value={value} index={5}>
                                            <div className='jobPanelDiv'>

                                                {/* <Grid container spacing={2} className="mb-2 mt-5" direction="row"
                                        justifyContent="center"
                                        alignItems="flex-start">

                                        <Grid size={6} className='pr-2'>
                                            <MUIAutoComplete
                                                id='workflowId'
                                                handleChange={(id: any, name: string) => {
                                                    addJobFormik.setFieldValue('workflowId', id);
                                                    addJobFormik.setFieldValue('workflowName', name);
                                                }}
                                                valuePassed={(addJobFormik.values.workflowId) ? { label: addJobFormik.values.workflowName, id: addJobFormik.values.workflowId } : {}}
                                                isMultiple={false}
                                                textToShow="Select Hiring Workflow"
                                                width="100%"
                                                type='workflow'
                                                placeholder="Select Hiring Workflow"
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} className="mb-2 mt-5" direction="row"
                                        justifyContent="center"
                                        alignItems="flex-start">
                                        <Grid size={6} className='pr-2'>
                                            <Button variant="outlined" color="primary" type="button"
                                                onClick={() => {
                                                    window.open(globalData.getWindowLocation() + "letter/Workflow/add");
                                                }}
                                            >
                                                Add New Workflow
                                            </Button>
                                        </Grid>
                                    </Grid> */}
                                                <AssignWorkflow ref={assignWorkflowRef} closePopup={hideAssignWorkflow} />

                                            </div>
                                            {/* <Stack
                                    direction="row"
                                    className="customCard px-4 py-2"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    sx={{ minHeight: 'auto !important' }}
                                >
                                    <Button onClick={() => setValue(3)} ><ArrowBackIosNewIcon />Location</Button>
                                    <Stack direction="row" className="btn-container" spacing={1}>
                                        <Button variant="contained" className='btnPrimary' type='button' onClick={saveForm}>Create and Save Job<ArrowForwardIosIcon /></Button>
                                    </Stack>
                                </Stack> */}
                                        </CustomTabPanel>
                                    :
                                    null
                            }
                            {/* <CustomTabPanel value={value} index={6}>
                                <div>
                                    <Grid container className="MRTableCustom customCard p-0 filterExpand-grid" >
                                        <Grid className='w-100'>
                                            <MaterialReactTable
                                                columns={columns}
                                                enableRowSelection
                                                data={boardsData}
                                                initialState={{
                                                    density: 'compact',
                                                }}
                                                enableDensityToggle={false}
                                                enableFullScreenToggle={false}
                                                enableColumnResizing={false}
                                                enableFilters={false}
                                                enableGlobalFilterModes={false}
                                                enableColumnFilters={false}
                                                enableColumnActions={false}
                                                enableHiding={false}
                                                enableBottomToolbar={false}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                            </CustomTabPanel> */}
                        </div>
                    </Grid>
                </form >
            </DialogContent >
            <Divider />
            <DialogActions>
                <Grid
                    display="flex"
                    justifyContent={`${(value === 0) ? 'flex-end' : (value === 7) ? 'flex-start' : 'space-between'}`}
                    // sx={{ minHeight: 'auto !important' }}
                    alignItems="center"
                    className="px-4"
                    size="grow"
                >
                    <Button type="button" color="secondary" className={`${value !== 0 ? '' : 'v-hidden'}`} onClick={() => {
                        if (!isCareerPortalEnabled && isWorkflowEnabled && (value === 5)) {
                            setValue(3);
                        } else {
                            setValue(value - 1);
                        }
                    }} size="medium" variant="outlined">
                        <ArrowBackIosNewIcon
                            sx={{
                                fontSize: "14px",
                                paddingRight: "2px",
                            }}
                        />
                        Back
                        {/* {
                            (value === 1) ? 'Basic Details' : (value === 2) ? 'Requirement' : (value === 3) ? 'Location' : (value === 4) ? 'Description' : (value === 5) ? 'Application Form' : ''
                        } */}
                    </Button>
                    {/* (
                        ((jobData?.jobId && jobData?.workflowDetails?.workflow_job_id) && (value === 5))
                        ||
                        (!isCareerPortalEnabled && (value === 3))
                        ||
                        (!isWorkflowEnabled && (value === 4))
                    ) */}

                    <Button type="button" color="primary" className={` ${(
                        // (
                        //     (value === 5)
                        //     ||
                        //     ((jobData?.jobId && jobData?.workflowDetails?.workflow_job_id) && (value === 5))
                        //     ||
                        //     (!isCareerPortalEnabled && (value === 3))
                        //     ||
                        //     (!isWorkflowEnabled && (value === 4))
                        // )
                        // &&
                        // (
                        //     (value === 5)
                        //     ||
                        //     (!isCareerPortalEnabled && isWorkflowEnabled)
                        // )
                        (
                            (value === 5)
                            ||
                            (value === 4 && !isWorkflowEnabled)
                            ||
                            (value === 3 && !isWorkflowEnabled && !isCareerPortalEnabled)
                            ||
                            ((jobData?.jobId && jobData?.workflowDetails?.workflow_job_id) && (value === 5) && isWorkflowEnabled)
                        )
                    ) ? 'v-hidden' : ''}`} onClick={() => {
                        if (!isCareerPortalEnabled && isWorkflowEnabled && (value === 3)) {
                            updateTabState("e", 5)
                        } else {
                            updateTabState("e", value + 1)
                        }
                    }} size="medium" variant="contained">
                        {/* {
                            (value === 0) ? 'Job Description' : (value === 1) ? 'Requirement' : (value === 2) ? 'Location' : (value === 3) ? 'Description' : (value === 4) ? 'Application Form' : ''
                        } */}
                        Continue
                        <ArrowForwardIosIcon


                            sx={{
                                fontSize: "14px",
                                paddingLeft: "2px",
                            }}
                        />
                    </Button>
                </Grid>
            </DialogActions>
        </Dialog >
    );
}
export default AddJob;