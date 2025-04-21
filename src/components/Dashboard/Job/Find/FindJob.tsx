import { MaterialReactTable, type MRT_ColumnDef } from "../../../../shared/modules/MaterialReactTable";
import { useEffect, useMemo, useRef, useState } from "../../../../shared/modules/React";
import { Stack } from '../../../../shared/modules/MaterialImports/Stack';
import { Typography } from '../../../../shared/modules/MaterialImports/Typography';
import { Grid, Button, IconButton } from '../../../../shared/modules/commonImports';
import ApiService from "../../../../shared/api/api";
// import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
// import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Menu, MenuItem } from "../../../../shared/modules/MaterialImports/Menu";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { Checkbox } from "../../../../shared/modules/MaterialImports/FormElements";
import { Box } from "../../../../shared/modules/MaterialImports/Box";
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
import { Tooltip } from '../../../../shared/modules/MaterialImports/ToolTip';
// import { useParams } from 'react-router-dom';
import FindJobFilters from "./FindJobFilters/FindJobFilters";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { confirmDialog } from "../../../shared/ConfirmDialog/ConfirmDialog";
import { showToaster } from '../../../shared/SnackBar/SnackBar';
import AddJob from "../Add/AddJob";
import { globalData } from "../../../../shared/services/globalData";
import { trackPromise } from "../../../../shared/modules/PromiseTrackter";
import { userLocalData } from "../../../../shared/services/userData";
import { DateTime, DateTimeMaybeValid } from "../../../../shared/modules/Luxon";
// import { CommonImages } from "../../../../shared/images/CommonImages";
import TuneIcon from '@mui/icons-material/Tune';
import MergeFields from "./MergeFields/MergeFields";
import ApplicantsListView from "./ApplicantsListView/ApplicantsListView";
import PublishJob from "./PublishJob/PublishJob";
// import { styled } from '@mui/material/styles';
import AddJobPortal from "../JobBoard/AddJobPortal";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CustomPagination from '../../../shared/CustomPagination/CustomPagination'

import './FindJob.scss';
import { JobDataType } from "../JobDataType";
import { Link, useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import masterStatesList from "../../../../shared/data/States";
// import NewLayout from "../../Candidate/Applicants/NewLayout";
import Parsable from "../../../../shared/utils/Parsable";
import NewLayoutMenu from "../../Candidate/Applicants/NewLayoutMenu";
import ApplicantsStatus from "./ApplicantsStatus/applicantsStatus";
import CreateQuestionsModal from "./VoiceAI/CreateQuestionsModal";
import { ID_ROLE_JOB_ALLOW_TO_MERGE_JOBS, ID_ROLE_JOB_ALLOW_TO_POST_JOBS_ON_INTERNAL_AND_EXTERNAL_SITES, ID_SETTINGS_QUICK_ACTION } from "../../../../shared/services/Permissions/IDs";
import ErrorOutlineOutlined from "@mui/icons-material/ErrorOutlineOutlined";
import { OpenErrorModal } from "../../../shared/ErrorModal/ErrorModal";
import JobDivaLink from "../../../../shared/services/JobDivaLink";

const hidedNames = ["Shortlist Count", "Subs Count", "Interview Count", "Inteview Count", "Offer Count", "Starts Count", "Internal Job Description", "Public Job Description"];

interface JobData {
    jobId: number;
    jobTitle?: string;
    [key: string]: any;
}

const FindJob = () => {
    const isBullHornSettingEnabled = userLocalData.adminSettings(20043);
    const isVoiceAISettingEnabled = userLocalData.adminSettings(20044);
    const isEvaluteSettingEnabled = userLocalData.adminSettings(20046);
    const isAvionteAPISettingEnabled = userLocalData.adminSettings(20045);
    const isJobDivaAPISettingEnabled = userLocalData.adminSettings(20047);

    const isHiringWorkFlowEnabled = userLocalData.adminSettings(20027);
    const isQuickActionsEnabled = userLocalData.adminSettings(ID_SETTINGS_QUICK_ACTION);

    const isIDIBUSettingEnabled = userLocalData.adminSettings(20016);
    const [jobData, setJobData] = useState<any>([]);
    const [rowCount, setRowCount] = useState(0);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isPublishPopUpOpen, setIsPublishPopUpOpen] = useState(false);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const jobApplicantDetails = useRef({ jobId: "", appCount: 0 });
    const [isApplicantsJobSelected, setIsApplicantsJobSelected] = useState(false);
    const [rowSelection, setRowSelection] = useState<any>({});
    const [selectedRowCount, setSelectedRowCount] = useState(0);
    const [editJobData, setEditJobData] = useState<JobDataType>({
        companyName: userLocalData.getvalue('clientName'),
        companyId: userLocalData.getvalue('clientId'),
        jobTitle: "",
        internalJobTitle: "",
        primaryRecruiter: "",
        collaborator: "",
        collaboratorName: "",
        jobCategory: "",
        pipelineStatus: "",
        priority: "",
        jobType: "",
        jobHours: "",
        publicDescription: "",
        originalDescription: "",
        referenceNo: "",
        openings: "",
        startDate: new Date(),
        endDate: new Date(),
        businessUnit: "",
        remoteJob: "",
        remote_value: "",
        streetAddress: "",
        jobCity: "",
        stateOrPro: "",
        jobPostalCode: "",
        workType: "",
        specificLocation: "",
        candidateLocation: "",
        jobShift: [],
        hoursWeek: "",
        payHours: "",
        payrateMin: "",
        payrateMax: "",
        payrateType: "1",
        billRateMin: "",
        billRateMax: "",
        billRateType: "1",
        dsBillMin: "",
        dsBillMax: "",
        dsBillType: "1",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        workflowId: "",
        workflowName: "",
        formId: "",
        formName: "",
        jobId: "",
        json: "",
        workflowDetails: {
            workflow_edit: false,
            isdelete: false,
            ispause: false,
            workflow_job_id: 0,
            workflowid: 0,
            workflowname: ""
        }
    });
    // const initialRender = useRef(true);
    const [openMergeFields, setOpenMergeFields] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const filtersSearchId = useRef(searchParams.get('id') ? searchParams.get('id') as string : "");
    const isFirstTimeLoad = useRef(false);
    const filtersSearchData = useRef({
        total: 0,
        filter: {
            jobId: "",
            jobClientId: "",
            contactId: "",
            contactName: "",
            recruiterId: "",
            recruiterName: "",
            fromDate: "",
            toDate: "",
            city: "",
            state: [],
            searchString: "",
            jobStatus: "",
            jobTitle: "",
            companyName: "",
            companyId: "",
            jobCategory: "",
            zipcode: "",
        },
        data: [],
        page: 0,
    })
    const filtersDataFromSession = sessionStorage.getItem(`jobs_${filtersSearchId.current}`) ? JSON.parse(sessionStorage.getItem(`jobs_${filtersSearchId.current}`) as string)?.filters : {
        jobId: "",
        jobClientId: "",
        contactId: "",
        contactName: "",
        recruiterId: "",
        recruiterName: "",
        fromDate: "",
        toDate: "",
        city: "",
        state: [],
        searchString: "",
        jobStatus: "",
        jobTitle: "",
        companyName: "",
        companyId: "",
        jobCategory: "",
        zipcode: "",
    }

    const jobFilterData = useRef({
        jobId: filtersDataFromSession?.jobId ? filtersDataFromSession?.jobId : "",
        jobClientId: filtersDataFromSession?.jobClientId ? filtersDataFromSession?.jobClientId : "",
        contactId: filtersDataFromSession?.contactId ? filtersDataFromSession?.contactId : "",
        contactName: filtersDataFromSession?.contactName ? filtersDataFromSession?.contactName : "",
        recruiterId: filtersDataFromSession?.recruiterId ? filtersDataFromSession?.recruiterId : "",
        recruiterName: filtersDataFromSession?.recruiterName ? filtersDataFromSession?.recruiterName : "",
        fromDate: filtersDataFromSession?.fromDate ? filtersDataFromSession?.fromDate : "",
        toDate: filtersDataFromSession?.toDate ? filtersDataFromSession?.toDate : "",
        city: filtersDataFromSession?.city ? filtersDataFromSession?.city : "",
        state: filtersDataFromSession?.state ? filtersDataFromSession?.state : "",
        searchString: filtersDataFromSession?.searchString ? filtersDataFromSession?.searchString : "",
        jobStatus: filtersDataFromSession?.jobStatus ? filtersDataFromSession?.jobStatus : "",
        jobTitle: filtersDataFromSession?.jobTitle ? filtersDataFromSession?.jobTitle : "",
        companyName: filtersDataFromSession?.companyName ? filtersDataFromSession?.companyName : "",
        companyId: filtersDataFromSession?.companyId ? filtersDataFromSession?.companyId : "",
        jobCategory: filtersDataFromSession?.jobCategory ? filtersDataFromSession?.jobCategory : "",
        zipcode: filtersDataFromSession?.zipcode ? filtersDataFromSession?.zipcode : ""
    });
    const [openNewLayoutModal, setOpenNewLayoutModal] = useState(false);
    const layoutRef = useRef(null);
    useEffect(() => {
        // getAllLayoutData();
        loadLayoutData();
        if (!searchParams.get('id')) {
            let v4Id = uuidv4();
            setSearchParams({ id: v4Id });
            filtersSearchId.current = v4Id;
        } else {
            filtersSearchId.current = searchParams.get('id') as string;
            if (sessionStorage.getItem(`jobs_${filtersSearchId.current}`)) {
                filtersSearchData.current = JSON.parse(sessionStorage.getItem(`jobs_${filtersSearchId.current}`) as string)
                isFirstTimeLoad.current = true;
            }
        }
    }, []);

    const [layoutData, setLayoutData] = useState<any[]>([]);
    // const [checkedColumnsList, setCheckedColumnsList] = useState<{ name: string, isactive: boolean, key: string, checked: boolean, type: string }[]>([]);
    const [isLayoutFetched, setIsLayoutFetched] = useState(false);
    const [orderedColumnsList, setOrderedColumnsList] = useState<{ name: string, isactive: boolean, key: string, checked: boolean, type: string }[]>([]);
    const [menuLayoutColumns, setMenuLayoutColumns] = useState<{ name: string, isactive: boolean, key: string, checked: boolean, type: string }[]>([]);
    const pinnedColumn = { "name": "Job Title", "key": "jobTitle" };
    const [applicantsStatusList, setApplicantsStatusList] = useState([]);
    const [openApplicantsStatus, setOpenApplicantsStatus] = useState(false);
    const [statusData, setStatusData] = useState<{ type: string, jobId: string | number, jobTitle: string }>({ type: "", jobId: "", jobTitle: "" });
    const [openVoiceAIModal, setOpenVoiceAiModal] = useState(false)

    const loadLayoutData = () => {
        let data = localStorage.getItem("jobs_layout");
        if (data && Parsable.isJSON(data)) {

            let { allLayoutData, orderedLayoutData } = JSON.parse(data);
            setLayoutData([...allLayoutData]);
            setOrderedColumnsList([...orderedLayoutData]);
            setMenuLayoutColumns([...orderedLayoutData]);
            setIsLayoutFetched(true);

        } else getAllLayoutData();
    }

    // const getAllLayoutData = () => {
    //     const requestData = {
    //         clientId: userLocalData.getvalue("clientId"),
    //         // userId: userLocalData.getvalue("recrId"),
    //     };
    //     trackPromise(
    //         ApiService.getByParams("admin", "jobLayout", requestData)
    //             .then((response: any) => {
    //                 if (response.data.Success) {
    //                     setLayoutData(response?.data?.layoutDetails || []);
    //                     getLayoutDataByRecrId(response?.data?.layoutDetails || []);
    //                 } else {
    //                     showToaster((response.data.Message) ? response.data.Message : "An error occured while saving the Candidate.", 'error');
    //                     setIsLayoutFetched(true);
    //                 }
    //             })
    //     )
    // };

    const getAllLayoutData = () => {
        // allLayoutData = allLayoutData ? allLayoutData : layoutData;
        trackPromise(
            ApiService.postWithData("admin", "getJobLayout", {
                clientId: userLocalData.getvalue('clientId'),
                userId: userLocalData.getvalue('recrId')
            }).then(
                (response: any) => {
                    if (response.data.Success === true) {
                        let layoutJson: any = response.data?.layoutJson || [];
                        let layoutDetails: any = response.data?.layoutDetails || [];
                        setLayoutData(layoutDetails);

                        if (!!layoutJson?.length && !!layoutDetails?.length) {
                            let checkedLayoutData = layoutJson.map((each: any) => {
                                let column = layoutDetails.find((item: any) => item?.name === each?.name) || undefined;
                                return {
                                    name: column?.name ? column.name : each.name,
                                    key: column?.key ? column.key : each.key,
                                    isactive: column?.isactive ? column?.isactive : false,
                                    checked: column?.isactive ? column.isactive : ((each?.name && each?.key) ? true : false),
                                    type: column?.type ? column?.type : "STRING"
                                }
                            });

                            let uncheckedLayoutData = layoutDetails.filter((each: any) => {
                                return checkedLayoutData.every((data: any) => each.name !== data.name)
                            }).map((each: any) => ({ ...each, checked: false }));

                            let finalColumnsList = checkedLayoutData.concat(uncheckedLayoutData);
                            const fixedColumnIndex = finalColumnsList.findIndex((each: any) => each.name === pinnedColumn.name);
                            const fixedColumnData = finalColumnsList.splice(fixedColumnIndex, 1);
                            finalColumnsList.unshift({ ...fixedColumnData[0] });
                            finalColumnsList = finalColumnsList.filter((each: any) => !hidedNames.includes(each.name))

                            setOrderedColumnsList([...finalColumnsList]);
                            setMenuLayoutColumns([...finalColumnsList]);
                            localStorage.setItem("jobs_layout", JSON.stringify({
                                allLayoutData: layoutDetails, orderedLayoutData: finalColumnsList
                            }))

                        } else {
                            let finalColumnsList = layoutDetails.filter((each: any) => !hidedNames.includes(each.name)).map((each: any) => ({
                                ...each,
                                checked: each.isactive
                            }));
                            setOrderedColumnsList([...finalColumnsList]);
                            setMenuLayoutColumns([...finalColumnsList]);
                            localStorage.setItem("jobs_layout", JSON.stringify({
                                allLayoutData: layoutDetails, orderedLayoutData: finalColumnsList
                            }))
                        }



                        // if (!!layoutJson?.length && !!allLayoutData?.length) {
                        //     // Handling ordered data based on all data
                        //     let orderedData = layoutJson.map((each: any) => {
                        //         let column = allLayoutData.find((item: any) => item?.name === each?.name) || undefined;
                        //         return {
                        //             name: column?.name ? column.name : each.name,
                        //             key: column?.key ? column.key : each.key,
                        //             isactive: column?.isactive ? column?.isactive : false,
                        //             checked: column?.isactive ? column.isactive : ((each?.name && each?.key) ? true : false),
                        //             type: column?.type ? column?.type : "STRING"
                        //         }
                        //     });

                        //     //Handling ordered data along with default columns from all data
                        //     let defaultData = allLayoutData.filter((each) => {
                        //         return orderedData.every((data: any) => each.name !== data.name)
                        //     }).filter((each) => each.isactive).map((each) => ({
                        //         name: each.name, key: each.key, isactive: true, checked: true, type: each?.type ? each?.type : "STRING"
                        //     }));

                        //     let finalCheckedList = orderedData.concat(defaultData)
                        //     setCheckedColumnsList(finalCheckedList);

                        // } else if (!!layoutJson?.length) {

                        //     let tempLayoutList = layoutJson.map((each: any) => ({
                        //         name: each.name,
                        //         key: each.key,
                        //         isactive: false,
                        //         checked: ((each?.name && each?.key) ? true : false),
                        //         type: "STRING"
                        //     }));
                        //     setCheckedColumnsList(() => tempLayoutList.filter((each: any) => each.checked));

                        // } else if (!!allLayoutData?.length) {

                        //     let tempLayoutList = allLayoutData.map((each: any) => ({
                        //         name: each.name,
                        //         key: each.key,
                        //         isactive: each.isactive,
                        //         checked: each.isactive,
                        //         type: each?.type ? each?.type : "STRING"
                        //     }));
                        //     setCheckedColumnsList(() => tempLayoutList.filter((each: any) => each.checked));
                        // } else return;
                        setIsLayoutFetched(true);
                    } else {
                        showToaster((response.data.Message) ? response.data.Message : "An error occured while saving the Jobs Layout.", 'error')
                        setIsLayoutFetched(true);
                    }
                }
            ))
    }

    const isJobAddSettingEnabled = userLocalData.checkIntegration(400001);
    const isJobDeleteSettingEnabled = userLocalData.checkIntegration(400002);

    const [mergeJobData, setMergeJobData] = useState({
        jobIdA: "",
        jobTitleA: "",
        jobIdB: "",
        jobTitleB: ""
    });
    const [filterTrigger, setFilterTrigger] = useState(false);
    const checkedCountmerge = Object.keys(rowSelection).filter((id) => Boolean(rowSelection[id])).length;
    const [selectedPage, setSelectedPage] = useState(false)
    // const [selectedPageCount, setSelectedPageCount] = useState(0)
    // const [checkedCounts, setCheckedCount] = useState(0);

    const [openAddJobBoardModal, setOpenAddJobBoardModal] = useState(false);
    const openBoardModal = () => {

        const jobBoardId = jobData.find((i: { jobId: string }) => { return i.jobId.toString() === (Object.keys(rowSelection).filter((id) => Boolean(rowSelection[id]))[0]) })
        //   const jobBoardId = jobData.find((i: { jobId: string }) => { return i.jobId === Object.keys(rowSelection).filter((id) => Boolean(rowSelection[id]))[0] });
        let jobId = jobBoardId && jobBoardId.jobId;
        saveAuditLog(4157);

        fetchJobDetails(jobId)
            .then(() => {
                setIsEditMode(false);
                setOpenAddJobBoardModal(true); // Open the modal only after state is updated
            })
            .catch(error => {
                showToaster("Unable to fetch Job Data", error)
            });
    };


    useEffect(() => {
        //do something when the row selection changes...
        //   console.info({ rowSelection });
        const keysWithTrueValue = Object.keys(rowSelection).filter(id => Boolean(rowSelection[id]));
        if (keysWithTrueValue.length === 2) {
            let jobA = jobData.find((i: { jobId: number }) => i.jobId.toString() === keysWithTrueValue[0]);
            let jobB = jobData.find((i: { jobId: number }) => i.jobId.toString() === keysWithTrueValue[1]);
            setMergeJobData({
                jobIdA: (jobA?.jobId) ? jobA?.jobId : "",
                jobTitleA: (jobA?.jobTitle) ? jobA?.jobTitle : "",
                jobIdB: (jobB?.jobId) ? jobB?.jobId : "",
                jobTitleB: (jobB?.jobTitle) ? jobB?.jobTitle : ""
            });
        } else {
            setMergeJobData({
                jobIdA: "",
                jobTitleA: "",
                jobIdB: "",
                jobTitleB: ""
            });
        }
    }, [rowSelection]);

    const fetchJobDetails = (jobId: any) => {
        return new Promise((resolve, reject) => {
            trackPromise(
                ApiService.getCall('admin', `getjobdatabase/${jobId}/${userLocalData.getvalue('clientId')}`)
                    .then((result) => {

                        // console.log(result.data)
                        if (result.data.Success && result.data.Job && result.data.Job.length) {

                            let jobDetails = result.data.Job[0] || {};

                            let tempShifts: any = [];

                            if (jobDetails.jobShift && jobDetails.jobShift.length) {
                                for (let si = 0; si < jobDetails.jobShift.length; si++) {
                                    const shift = jobDetails.jobShift[si];
                                    let startTime: DateTimeMaybeValid = DateTime.local();
                                    let endTime: DateTimeMaybeValid = DateTime.local();
                                    if (shift.startTime) {
                                        startTime = (shift.startTime) ? DateTime.fromFormat(shift.startTime.substring(0, 5), 'hh:mm') : DateTime.local();
                                        // endTime = (shift.endTime) ? DateTime.fromISO(new Date(new Date().getFullYear() + " " + shift.endTime).toISOString()) : DateTime.local();
                                        endTime = (shift.endTime) ? DateTime.fromFormat(shift.endTime.substring(0, 5), 'hh:mm') : DateTime.local();
                                        // endTime = (shift.endTime) ? DateTime.fromISO(new Date(new Date().getFullYear() + " " + shift.endTime).toISOString()) : DateTime.local();
                                    }
                                    tempShifts.push({
                                        days: (shift.days && shift.days.length) ? shift.days.split(',') : [],
                                        startTime: startTime,
                                        endTime: endTime,
                                        timeZone: shift.timeZone,
                                        shiftId: Number(shift.shiftid) ? Number(shift.shiftid) : 0
                                    })
                                }
                            }
                            jobDetails.workflowDetails = {
                                workflow_edit: false,
                                isdelete: false,
                                ispause: false,
                                workflow_job_id: 0,
                                workflowid: 0,
                                workflowname: ""
                            }
                            if (jobDetails.workFlow && jobDetails.workFlow.length && jobDetails.workFlow[0].workflow_job_id) {
                                jobDetails.workflowDetails = jobDetails.workFlow[0];
                            }
                            if (jobDetails.estEndDate && new Date(jobDetails.estEndDate) < new Date("1990-01-01")) {
                                jobDetails.estEndDate = "";
                            }
                            setEditJobData({
                                "companyName": userLocalData.getvalue('clientName'),
                                "companyId": userLocalData.getvalue('clientId'),
                                "jobTitle": jobDetails.jobTitle,
                                "internalJobTitle": jobDetails.intJobTitle,
                                "primaryRecruiter": (jobDetails.primaryRecruiter && jobDetails.fullName) ? jobDetails.primaryRecruiter : "",
                                "primaryName": (jobDetails.primaryRecruiter && jobDetails.fullName) ? jobDetails.fullName : "",
                                "collaborator": jobDetails.collaborator || "",
                                "collaboratorName": Array.isArray(jobDetails.collaboratorNames) ? jobDetails.collaboratorNames.join() : (jobDetails.collaboratorNames || ""),
                                "jobCategory": jobDetails.category,
                                "pipelineStatus": String(jobDetails.status),
                                "priority": String(jobDetails.priority),
                                "jobType": String(jobDetails.jobType),
                                "jobHours": String(jobDetails.jobHours),
                                "publicDescription": jobDetails.publicJobDescr,
                                "originalDescription": jobDetails.interJobDescr,
                                "referenceNo": jobDetails.referenceNo,
                                "openings": jobDetails.openings,
                                // @ts-ignore
                                "startDate": ((jobDetails.estStartDate) && (jobDetails.estStartDate !== "1900-01-01")) ? DateTime.fromFormat(jobDetails.estStartDate, 'yyyy-MM-dd').toFormat('MM/dd/yyyy') : null,
                                // @ts-ignore
                                "endDate": ((jobDetails.estEndDate) && (jobDetails.estEndDate !== "1900-01-01")) ? DateTime.fromFormat(jobDetails.estEndDate, 'yyyy-MM-dd').toFormat('MM/dd/yyyy') : null,
                                "businessUnit": jobDetails.businessUnit,
                                "remoteJob": "",
                                "remote_value": "",
                                "streetAddress": jobDetails.workStreet,
                                "jobCity": jobDetails.workCity,
                                "stateOrPro": jobDetails.workState,
                                "jobPostalCode": jobDetails.workZipcode,
                                "workType": String(jobDetails.workType),
                                "specificLocation": (jobDetails.specificLocation) ? "Yes" : "No",
                                "candidateLocation": jobDetails.candStreet,
                                "jobShift": tempShifts,
                                "hoursWeek": "",
                                "payrateMin": Number(jobDetails.payrateMin) ? jobDetails.payrateMin : "",
                                "payrateMax": Number(jobDetails.payrateMax) ? jobDetails.payrateMax : "",
                                "payrateType": jobDetails.payrateType || "1",
                                "billRateMin": Number(jobDetails.billRateMin) ? jobDetails.billRateMin : "",
                                "billRateMax": Number(jobDetails.billRateMax) ? jobDetails.billRateMax : "",
                                "billRateType": jobDetails.billRateType || "1",
                                "dsBillMin": Number(jobDetails.dsBillMin) ? jobDetails.dsBillMin : "",
                                "dsBillMax": Number(jobDetails.dsBillMax) ? jobDetails.dsBillMax : "",
                                "dsBillType": jobDetails.dsBillType || "1",
                                "firstName": "",
                                "lastName": "",
                                "email": "",
                                "phone": "",
                                "workflowId": (Number(jobDetails.workflowId) && jobDetails.workflowName) ? jobDetails.workflowId : "",
                                "workflowName": (Number(jobDetails.workflowId) && jobDetails.workflowName) ? jobDetails.workflowName : "",
                                "formId": (Number(jobDetails.formId) && jobDetails.formName) ? jobDetails.formId : 0,
                                "formName": (Number(jobDetails.formId) && jobDetails.formName) ? jobDetails.formName : "",
                                "jobId": jobDetails.jobId,
                                "json": jobDetails.json,
                                "workflowDetails": jobDetails.workflowDetails,
                                contId: jobDetails.contId,
                                contName: jobDetails.contName,
                            });
                        }

                        resolve(result);
                    })
                    .catch((error) => {
                        console.error('Error fetching job details:', error);
                        reject(error);
                    })
            )
        })
    };

    const openJobView = (id: string) => {
        window.open(globalData.getWindowLocation() + "job/view/" + id);
    }
    const openAddModal = () => {
        setEditJobData({
            ...editJobData,
            jobId: ""
        })
        setOpenAddJobModal(true);
        setIsEditMode(false);
        saveAuditLog(4158);
    };
    const openEditModal = (rowData: any) => {
        fetchJobDetails(rowData.jobId)
            .then(() => {
                setIsEditMode(true);
                setOpenAddJobModal(true); // Open the modal only after state is updated
            })
            .catch(error => {
                showToaster("Unable to fetch Job Data", error)
            });
    };

    const handleStatusClick = (type: string, count: number, jobId: string | number, jobTitle: string) => {
        if (![0, "0", null, undefined, ""].includes(count)) {
            const statusObj: { [key: string]: number } = { Submissions: 100, Shortlists: 200, Interviews: 300, Offers: 400, Starts: 500 };
            setStatusData({ type, jobId, jobTitle });
            trackPromise(
                ApiService.getCall("admin", `/getJobSubmissionShortlist/${jobId}/${userLocalData.getvalue("clientId")}/${statusObj[type]}`).then((res: any) => {
                    if (res?.data?.Success) {
                        setApplicantsStatusList(res?.data?.List || []);
                        setOpenApplicantsStatus(true);
                    }
                })
            )
        }
    }

    const columns: MRT_ColumnDef<(typeof jobData)[0]>[] = useMemo(
        () => {
            const defaultColumns = [
                // {
                //     accessorKey: "jobTitle", //simple recommended way to define a column
                //     header: "Job",
                //     size: 100,
                //     Cell: ({ renderedCellValue, row }) => (
                //         <span className="hightLightTd" onClick={() => openJobView(row.original.jobId)}>{row.original.jobTitle.toLowerCase()}</span>
                //     ),
                // },
                {
                    accessorKey: "jobTitle",
                    enableColumnPinning: true,
                    header: "Job",
                    size: 100,
                    Cell: ({ row }: any) => {
                        let jobTitle = (row.original.jobTitle) ? row.original.jobTitle : "";
                        let displayTitle = jobTitle.length > 30 ? jobTitle.slice(0, 30) + "..." : jobTitle;
                        return (
                            <Tooltip title={jobTitle} classes={{ tooltip: 'tt-capital' }}>
                                <Link className="hightLightTd" to={`../../job/view/${row.original.jobId}`} state={{
                                    data: [{
                                        text: "Search",
                                        link: `../../job/find`
                                    },
                                    {
                                        text: "Job",
                                        link: `../../job/find?id=${filtersSearchId.current}`
                                    },
                                    {
                                        text: jobTitle,
                                        link: ``
                                    }]
                                }}>
                                    {displayTitle}
                                </Link>
                            </Tooltip>
                        );
                    },
                },
                {
                    accessorKey: "appCount",
                    accessorFn: (row: any) => `${row.appCount} ${row.newCount}`,
                    header: "Applicants",
                    Cell: ({ row }: any) => (
                        <span><span
                            className="hightLightTd"
                            onClick={() => {
                                jobApplicantDetails.current = { jobId: row.original.jobId, appCount: row.original.appCount };
                                setIsApplicantsJobSelected(true);
                            }}
                        >
                            {row.original.appCount}
                        </span> ({row.original.newCount} New)</span>
                    ),
                    enableHiding: true
                },
                {
                    accessorKey: "status",
                    header: "Status",
                    accessorFn: (row: any) => `${row.appCount} ${row.startsCount} ${row.subsCount} ${row.interviewCount} ${row.shortlistCount}`,
                    Cell: ({ row }: any) => (
                        <Stack direction="row" alignItems="center" className="statusRow">
                            <Tooltip title="Submissions">
                                <span className={`${![0, "0", null, undefined, ""].includes(row.original.subsCount) ? "cursor-pointer" : ""}`}
                                    onClick={() => handleStatusClick("Submissions", row.original.subsCount, row.original.jobId, row.original.jobTitle)}>
                                    {row.original.subsCount === "" ? 0 : <span className="highlightCount">{row.original.subsCount}</span>}
                                </span>
                            </Tooltip>
                            <Tooltip title="Shortlists">
                                <span className={`${![0, "0", null, undefined, ""].includes(row.original.shortlistCount) ? "cursor-pointer" : ""}`}
                                    onClick={() => handleStatusClick("Shortlists", row.original.shortlistCount, row.original.jobId, row.original.jobTitle)}>
                                    {row.original.shortlistCount === "" ? 0 : <span className="highlightCount">{row.original.shortlistCount}</span>}
                                </span>
                            </Tooltip>
                            <Tooltip title="Interviews">
                                <span className={`${![0, "0", null, undefined, ""].includes(row.original.interviewCount) ? "cursor-pointer" : ""}`}
                                    onClick={() => handleStatusClick("Interviews", row.original.interviewCount, row.original.jobId, row.original.jobTitle)}>
                                    {row.original.interviewCount === "" ? 0 : <span className="highlightCount">{row.original.interviewCount}</span>}
                                </span>
                            </Tooltip>
                            <Tooltip title="Offers">
                                <span className={`${![0, "0", null, undefined, ""].includes(row.original.offerCount) ? "cursor-pointer" : ""}`}
                                    onClick={() => handleStatusClick("Offers", row.original.offerCount, row.original.jobId, row.original.jobTitle)}>
                                    {row.original.offerCount === "" ? 0 : <span className="highlightCount">{row.original.offerCount}</span>}
                                </span>
                            </Tooltip>
                            <Tooltip title="Starts">
                                <span className={`${![0, "0", null, undefined, ""].includes(row.original.startsCount) ? "cursor-pointer" : ""}`}
                                    onClick={() => handleStatusClick("Starts", row.original.startsCount, row.original.jobId, row.original.jobTitle)}>
                                    {row.original.startsCount === "" ? 0 : <span className="highlightCount">{row.original.startsCount}</span>}
                                </span>
                            </Tooltip>
                        </Stack>
                    ),
                    size: 80,
                    enableHiding: true
                },
                {
                    accessorKey: "daysBack",
                    header: "Days Opened",
                    Cell: ({ row }: any) => (
                        <span>
                            {(!row.original.daysBack) || (Number(row.original.daysBack) === 0) ? 'Today' : ""}
                            {Number(row.original.daysBack) === 1 && 'Yesterday'}
                            {Number(row.original.daysBack) > 1 && row.original.daysBack + ' Days'}
                        </span>
                    ),
                    size: 80
                },
                { header: "Reference No", accessorKey: "referenceNo", size: 80 },
                {
                    accessorKey: 'actions',
                    header: 'Actions',
                    enableSorting: false,
                    Cell: ({ row }: any) => (
                        <div>
                            {
                                isJobAddSettingEnabled
                                    ?
                                    <Tooltip title="Edit">
                                        <span><ModeEditOutlineOutlinedIcon
                                            sx={{ color: '#7f7f7f' }}
                                            className="cursor-pointer"
                                            onClick={() => openEditModal(row.original)} /></span>
                                    </Tooltip>
                                    :
                                    null
                            }
                            {
                                isJobDeleteSettingEnabled
                                    ?
                                    <Tooltip title="Delete"
                                        className="fs-16 cursor-pointer"
                                    >
                                        <span>
                                            <DeleteOutlineOutlinedIcon sx={{ color: '#7f7f7f', marginLeft: '5px' }} onClick={() => {
                                                confirmDialog(`Are you sure you want to delete ${row.original.jobTitle} ?`, () => {
                                                    deleteJobById("" + row.original.jobId); // Replace 1 with the actual jobId you want to delete
                                                }, "warning");
                                            }} />
                                        </span>
                                    </Tooltip>
                                    :
                                    null
                            }

                        </div>
                    ),
                },

            ];

            let finalColumnsList = orderedColumnsList.map((each, _index) => {
                switch (each.name) {
                    case "Job Title": return {
                        accessorKey: each.key,
                        enableColumnPinning: false,
                        header: each.name,
                        size: 100,
                        Cell: ({ row }: any) => {
                            let jobTitle = (row.original.jobTitle) ? row.original.jobTitle : "";
                            let displayTitle = jobTitle.length > 30 ? jobTitle.slice(0, 30) + "..." : jobTitle;
                            return (
                                <Tooltip title={jobTitle} classes={{ tooltip: 'tt-capital' }}>
                                    <Link className="hightLightTd" to={`../../job/view/${row.original.jobId}`} state={{
                                        data: [{
                                            text: "Search",
                                            link: `../../job/find`
                                        },
                                        {
                                            text: "Job",
                                            link: `../../job/find?id=${filtersSearchId.current}`
                                        },
                                        {
                                            text: jobTitle,
                                            link: ``
                                        }]
                                    }}>
                                        {displayTitle}
                                    </Link>
                                </Tooltip>
                            );
                        },
                        enableHiding: false,
                    };
                    case "App Count": return {
                        accessorKey: each.key,
                        accessorFn: (row: any) => `${row.appCount} ${row.newCount}`,
                        header: each.name,
                        Cell: ({ row }: any) => (
                            <span><span
                                className="hightLightTd"
                                onClick={() => {
                                    jobApplicantDetails.current = { jobId: row.original.jobId, appCount: row.original.appCount };
                                    setIsApplicantsJobSelected(true);
                                }}
                            >
                                {row.original.appCount}
                            </span> ({row.original.newCount} New)</span>
                        ),
                        enableSorting: false,
                        enableColumnPinning: false,
                        enableHiding: true,
                    };
                    case "Status": return {
                        accessorKey: each.key,
                        header: each.name,
                        accessorFn: (row: any) => `${row.appCount} ${row.startsCount} ${row.subsCount} ${row.interviewCount} ${row.shortlistCount}`,
                        Cell: ({ row }: any) => (
                            <Stack direction="row" alignItems="center" className="statusRow">
                                <Tooltip title="Submissions">
                                    <span className={`${![0, "0", null, undefined, ""].includes(row.original.subsCount) ? "cursor-pointer" : ""}`}
                                        onClick={() => handleStatusClick("Submissions", row.original.subsCount, row.original.jobId, row.original.jobTitle)}>
                                        {row.original.subsCount === "" ? 0 : <span className="highlightCount">{row.original.subsCount}</span>}
                                    </span>
                                </Tooltip>
                                <Tooltip title="Shortlists">
                                    <span className={`${![0, "0", null, undefined, ""].includes(row.original.shortlistCount) ? "cursor-pointer" : ""}`}
                                        onClick={() => handleStatusClick("Shortlists", row.original.shortlistCount, row.original.jobId, row.original.jobTitle)}>
                                        {row.original.shortlistCount === "" ? 0 : <span className="highlightCount">{row.original.shortlistCount}</span>}
                                    </span>
                                </Tooltip>
                                <Tooltip title="Interviews">
                                    <span className={`${![0, "0", null, undefined, ""].includes(row.original.interviewCount) ? "cursor-pointer" : ""}`}
                                        onClick={() => handleStatusClick("Interviews", row.original.interviewCount, row.original.jobId, row.original.jobTitle)}>
                                        {row.original.interviewCount === "" ? 0 : <span className="highlightCount">{row.original.interviewCount}</span>}
                                    </span>
                                </Tooltip>
                                <Tooltip title="Offers">
                                    <span className={`${![0, "0", null, undefined, ""].includes(row.original.offerCount) ? "cursor-pointer" : ""}`}
                                        onClick={() => handleStatusClick("Offers", row.original.offerCount, row.original.jobId, row.original.jobTitle)}>
                                        {row.original.offerCount === "" ? 0 : <span className="highlightCount">{row.original.offerCount}</span>}
                                    </span>
                                </Tooltip>
                                <Tooltip title="Starts">
                                    <span className={`${![0, "0", null, undefined, ""].includes(row.original.startsCount) ? "cursor-pointer" : ""}`}
                                        onClick={() => handleStatusClick("Starts", row.original.startsCount, row.original.jobId, row.original.jobTitle)}>
                                        {row.original.startsCount === "" ? 0 : <span className="highlightCount">{row.original.startsCount}</span>}
                                    </span>
                                </Tooltip>
                            </Stack>
                        ),
                        size: 80,
                        enableSorting: false,
                        enableColumnPinning: false,
                        enableHiding: true,
                    };
                    case "Days Back": return {
                        accessorKey: each.key,
                        header: each.name,
                        Cell: ({ row }: any) => (
                            <span>
                                {(!row.original.daysBack) || (Number(row.original.daysBack) === 0) ? 'Today' : ""}
                                {Number(row.original.daysBack) === 1 && 'Yesterday'}
                                {Number(row.original.daysBack) > 1 && row.original.daysBack + ' Days'}
                            </span>
                        ),
                        size: 80,
                        enableSorting: false,
                        enableColumnPinning: false,
                        enableHiding: true,
                    };
                    case "Specific Location": return {
                        accessorKey: each.key,
                        header: each.name,
                        Cell: ({ row }: any) => (
                            <span>{row?.original[each?.key] ? "Yes" : "No"}</span>
                        ),
                        size: 80,
                        enableSorting: false,
                        enableColumnPinning: false,
                        enableHiding: true,
                    };
                    case "Work Location": return {
                        accessorKey: each.key, header: each.name,
                        Cell: ({ row }: any) => {
                            let location = [row.original.workStreet.trim(), row.original.workCity.trim(), row.original.workState.trim(), row.original.workZipcode.trim()]
                                .filter((each) => ![null, undefined, ""].includes(each)).join(", ").trim();
                            if (location.length > 25)
                                return (
                                    <Tooltip title={location}>
                                        <span>{location.slice(0, 20)}...</span>
                                    </Tooltip>
                                )
                            else return (<span>{location}</span>)
                        },
                        size: 80, enableSorting: false, enableColumnPinning: false, enableHiding: true,
                    }
                    case "Candidate Location": return {
                        accessorKey: each.key, header: each.name,
                        Cell: ({ row }: any) => {
                            let location = row.original.candStreet
                            if (location.length > 25)
                                return (
                                    <Tooltip title={location}>
                                        <span>{location.slice(0, 20)}...</span>
                                    </Tooltip>
                                )
                            else return (<span>{location}</span>)
                        },
                        size: 80, enableSorting: false, enableColumnPinning: false, enableHiding: true,
                    }
                    default: switch (each.type) {
                        case "DATE": return {
                            accessorKey: each.key,
                            header: each.name,
                            size: each.name.length > 12 ? 180 : 75,
                            enableSorting: false,
                            enableColumnPinning: false,
                            Cell: ({ row }: any) => (
                                row.original[each.key] &&
                                (row.original[each.key].trim().length > 10 ? <span>
                                    {DateTime.fromFormat(row.original[each.key].trim().substring(0, 19), "yyyy-MM-dd hh:mm:ss")?.toFormat("MM/dd/yyyy")}
                                </span> :
                                    <span>
                                        {DateTime.fromFormat(row.original[each.key].trim(), "yyyy-MM-dd")?.toFormat("MM/dd/yyyy")}
                                    </span>)
                            ),
                            enableHiding: true,
                        };
                        case "CHECK": return {
                            accessorKey: each.key,
                            header: each.name,
                            Cell: ({ row }: any) => (
                                (row?.original[each?.key] ?
                                    <>
                                        {each.name === "JobDiva" ? <span className="ml-4" title={each.name} style={{ cursor: 'pointer' }}
                                            onClick={() => { JobDivaLink.jobDivaLinkUrl("job", row.original[each.key]) }}
                                        >
                                            {(row.original[each.key]) ? <CheckOutlinedIcon color='success' /> : ""}
                                        </span> :
                                            <span className="ml-4" title={each.name}>
                                                {(row.original[each.key]) ? <CheckOutlinedIcon color='success' /> : ""}
                                            </span>
                                        }
                                    </>
                                    : !["", null, undefined].includes(row?.original[`${each?.name.toLowerCase()}IsSuccess`]) &&
                                        !row?.original[`${each?.name.toLowerCase()}IsSuccess`] ?
                                        // title={each.name}
                                        <Tooltip title="Click here to View Error Message">
                                            <span className="ml-4 errorMsg" style={{ cursor: 'pointer' }} onClick={() => OpenErrorModal({
                                                errorMessage: row?.original[`${each?.name.toLowerCase()}Reason`], title: `${each?.name} - Error Message`
                                            })}>
                                                <ErrorOutlineOutlined color="error" />
                                            </span>
                                        </Tooltip>
                                        : ""
                                )
                            ),
                            Header: () => <span>{
                                (each.name === "Bulhorn" ? "Bullhorn" :
                                    each.name === "Aviont" ? "Avionte" : each.name
                                )}</span>,
                            size: 80,
                            enableSorting: false,
                            enableColumnPinning: false,
                            enableHiding: true,
                        };
                        // case "CHECK": return {
                        //     accessorKey: each.key,
                        //     header: each.name,
                        //     Cell: ({ row }: any) => (
                        //         (row?.original[each?.key]) ? <Tooltip title={each.name} >
                        //             <span className="ml-4">
                        //                 {(row.original[each.key]) ? <CheckOutlinedIcon /> : ""}
                        //             </span>
                        //         </Tooltip> : ""
                        //     ),
                        //     size: 80,
                        //     enableSorting: false,
                        //     enableColumnPinning: false,
                        //     enableHiding: true,
                        // };
                        default: return {
                            accessorKey: each.key,
                            header: each.name,
                            size: each.name.length > 12 ? 180 : 75,
                            enableSorting: false,
                            enableColumnPinning: false,
                            enableHiding: true,
                        }
                    }
                }
            })
            finalColumnsList = finalColumnsList.map((each, index) => ({
                ...each, enableColumnPinning: index === 0 ? true : false
            }));

            if (!!orderedColumnsList?.length && !!layoutData?.length) return [...finalColumnsList, {
                accessorKey: 'actions',
                header: 'Actions',
                enableSorting: false,
                Cell: ({ row }: any) => (
                    <div>
                        {
                            isJobAddSettingEnabled
                                ?
                                <Tooltip title="Edit">
                                    <span><ModeEditOutlineOutlinedIcon
                                        sx={{ color: '#7f7f7f' }}
                                        className="cursor-pointer"
                                        onClick={() => openEditModal(row.original)} /></span>
                                </Tooltip>
                                :
                                null
                        }
                        {
                            isJobDeleteSettingEnabled
                                ?
                                <Tooltip title="Delete"
                                    className="fs-16 cursor-pointer"
                                >
                                    <span>
                                        <DeleteOutlineOutlinedIcon sx={{ color: '#7f7f7f', marginLeft: '5px' }} onClick={() => {
                                            confirmDialog(`Are you sure you want to delete ${row.original.jobTitle} ?`, () => {
                                                deleteJobById("" + row.original.jobId); // Replace 1 with the actual jobId you want to delete
                                            }, "warning");
                                        }} />
                                    </span>
                                </Tooltip>
                                :
                                null
                        }

                    </div>
                ),
            }].filter((each) => !hidedNames.includes(each.header));
            else return [...defaultColumns];
        }, [orderedColumnsList]);

    const [filtersExpand, setFiltersExpand] = useState(false);
    const toggleFilers = () => {
        setFiltersExpand(!filtersExpand);
        saveAuditLog(4171);
    }

    // const loadJobs = (data: any) => {
    //     // setIsDataLoading(true);
    //     // (allPageCount === 0 && pageCount !== pagination.pageIndex) && selectAllMenuItemClicked("clear");
    //     // (allPageCount === 1) && selectAllMenuItemClicked("all");
    //     // console.log(data);
    //     // if (!isSelectAllChecked) {
    //     //     selectAllMenuItemClicked("clear");
    //     // }
    //     let tempData = {
    //         next: (data.next) ? Number(data.next) : 0,
    //         pageSize: (data.pageSize) ? Number(data.pageSize) : 25,
    //         pageIndex: (data.pageIndex) ? Number(data.pageIndex) : 0,
    //         clientId: userLocalData.getvalue('clientId'),
    //         jobId: (data.jobId) ? Number(data.jobId) : "",
    //         contId: (data.contactId) ? data.contactId : "",
    //         primaryRecruiter: (data.recruiterId) ? Number(data.recruiterId) : "",
    //         fromDate: (data.fromDate) ? data.fromDate : "",
    //         createDate: (data.toDate) ? data.toDate : "",
    //         workCity: (data.city) ? data.city : "",
    //         workState: (data.state) ? data.state : "",
    //         workZipcode: (data.zipcode) ? data.zipcode : "",
    //         status: (data.jobStatus) ? data.jobStatus : "",
    //         jobTitle: (data.jobTitle) ? data.jobTitle : "",
    //         category: (data.jobCategory) ? data.jobCategory : "",
    //         jobClientId: (data.jobClientId) ? data.jobClientId : "",
    //         searchString: (data.searchString) ? data.searchString : "",
    //         //publicJobDescr: (data.publicJobDescr) ? data.publicJobDescr : "",
    //         //referenceNo: (data.referenceNo) ? data.referenceNo : "",
    //     }
    //     trackPromise(
    //         ApiService.postWithData('admin', 'getJobsApplicantsDashboard', tempData).then(
    //             (result) => {
    //                 // console.log(result);
    //                 let tempData = result.data.Applicants;
    //                 setJobData(result.data.Applicants ? result.data.Applicants : []);
    //                 if (data.next === 0) {
    //                     setRowCount(result.data.Total);
    //                     if (!isSelectAllChecked) {
    //                         setSelectedRowCount(result.data.Total);
    //                     }
    //                 }

    //                 if (rowPageIndex > 0 && rowPageIndex > pagination.pageIndex) {
    //                     let rowDatanext = { ...rowSelection };
    //                     for (let index = 0; index < tempData.length; index++) {
    //                         const jobId = tempData[index].jobId;
    //                         if (rowDatanext[jobId] === undefined) {
    //                             rowDatanext[jobId] = true;
    //                         }
    //                     }
    //                     const falseCount = Object.keys(rowDatanext).filter(key => rowDatanext[key] === false).length;
    //                     const total = Number(result.data.total);
    //                     const adjustedCount = total - falseCount;
    //                     currentSelectCount.current = (adjustedCount > 10000) ? 10000 : adjustedCount;
    //                     setRowCount(adjustedCount);
    //                     setIsSelectAllChecked(true);
    //                     currentSelectCount.current = (rowCount > 10000) ? 10000 : rowCount;
    //                     setRowSelection(rowDatanext);
    //                     setIsSelectAllChecked(true);
    //                     let pIndex = Math.ceil((currentSelectCount.current) / pagination.pageSize);
    //                     setRowPageIndex(pIndex);

    //                 } else {
    //                     setIsSelectAllChecked(false);
    //                 }

    //                 setIsDataLoading(false);
    //             },
    //         )
    //     )
    // }

    const getStatesCodes = (obj: any, val: string[] | string) => {
        let newValues: string[] = [];
        if (obj === masterStatesList) {
            for (let i = 0; i < val.length; i++) {
                newValues.push(obj[obj.findIndex((x: any) => x.label === val[i])].id);
            }
            return newValues.toString();
        }
    }

    function transformJobToLowerCase(dataArray: JobData[]): JobData[] {
        return dataArray.map(item => ({
            ...item,
            jobTitle: item.jobTitle ? item.jobTitle.toLowerCase() : ""
        }));
    }

    const loadJobs = (data: any, removeSelection: boolean = false) => {
        let tempData = {
            next: (data.next) ? Number(data.next) : 0,
            pageSize: (data.pageSize) ? Number(data.pageSize) : 25,
            pageIndex: (data.pageIndex) ? Number(data.pageIndex) : 0,
            clientId: userLocalData.getvalue('clientId'),
            jobId: (data.jobId) ? Number(data.jobId) : "",
            contId: (data.contactId) ? data.contactId : "",
            primaryRecruiter: (data.recruiterId) ? Number(data.recruiterId) : "",
            fromDate: (data.fromDate) ? data.fromDate : "",
            toDate: (data.toDate) ? data.toDate : "",
            workCity: (data.city) ? data.city : "",
            workState: (data.state) ? getStatesCodes(masterStatesList, data.state) : "",
            workZipcode: (data.zipcode) ? data.zipcode : "",
            status: (data.jobStatus) ? data.jobStatus : "",
            jobTitle: (data.jobTitle) ? data.jobTitle : "",
            category: (data.jobCategory) ? data.jobCategory : "",
            jobClientId: (data.jobClientId) ? data.jobClientId : "",
            searchString: (data.searchString) ? data.searchString : "",
        };

        trackPromise(
            ApiService.postWithData('admin', 'getJobsApplicantsDashboard', tempData).then(
                (result) => {
                    let tempData = result.data.Applicants || [];
                    let jobTransferData = transformJobToLowerCase(tempData)
                    setJobData(jobTransferData);
                    if (removeSelection) {
                        setRowSelection({});
                    } else {
                        const selectedIds = Object.keys(rowSelection).filter(id => rowSelection[id]);

                        // Update row selection based on new data
                        const updatedRowSelection = { ...rowSelection };
                        jobTransferData.forEach((job: any) => {
                            if (selectedIds.includes(job.jobId.toString())) {
                                updatedRowSelection[job.jobId] = true;
                            } else {
                                updatedRowSelection[job.jobId] = false;
                            }
                        });

                        setRowSelection(updatedRowSelection);
                    }

                    let dataToSave = {
                        total: result.data.Total,
                        filters: sessionStorage.getItem(`jobs_${filtersSearchId.current}`) ? JSON.parse(sessionStorage.getItem(`jobs_${filtersSearchId.current}`) as string)?.filters : jobFilterData.current,
                        data: result.data.Applicants ? result.data.Applicants : [],
                        page: pagination.pageIndex
                    }
                    sessionStorage.setItem(`jobs_${filtersSearchId.current}`, JSON.stringify(dataToSave));
                    if (data.next === 0) {
                        setRowCount(result.data.Total);
                        if (!isSelectAllChecked) {
                            setSelectedRowCount(result.data.Total);
                        }
                    }
                    setIsDataLoading(false);
                },
            )
        );
    }
    const deleteJobById = (jobId: string) => {
        trackPromise(
            // ApiService.deleteById(214, 'deleteJob', jobId + '/' + userLocalData.getvalue('clientId'))
            ApiService.postWithData('admin', 'deleteJob', {
                "jobId": jobId,
                "clientId": userLocalData.getvalue('clientId'),
                "recrId": userLocalData.getvalue('recrId')
            }).then((response) => {
                if (response.data.Success) {
                    showToaster(`Job${(jobId.split(',').length > 1) ? 's are' : ''} deleted successfully`, 'success');
                    // setPagination();
                    saveAuditLog(4177);
                    selectAllMenuItemClicked("clear");
                    setPagination({ ...pagination, pageIndex: 0 });
                    let updatedRowSelection = { ...rowSelection };
                    let updatedCheckedCount = checkedCount;
                    let updatedRowCount = selectedRowCount;
                    let jobIdsList = jobId.split(',');
                    for (let jl = 0; jl < jobIdsList.length; jl++) {
                        const element = jobIdsList[jl];
                        updatedRowSelection[element] = false;
                        updatedCheckedCount = updatedCheckedCount - 1;
                        updatedRowCount = updatedRowCount - 1;
                    }
                    setRowSelection(updatedRowSelection);
                    // setCheckedCount(updatedCheckedCount);
                    setSelectedRowCount(updatedRowCount);
                    loadJobs({ ...jobFilterData.current, pageIndex: 0, next: 0 }, true);
                    // let tempJobs = [...jobData];
                    // tempJobs = tempJobs.filter((i) => {
                    //     return ((i.jobId !== "1") && i.jobId !== "11")
                    // });
                    // setJobData(tempJobs);
                } else {
                    showToaster("An error occurred while deleting", 'error');
                }
            })
        )
    }
    const cloneJobById = () => {
        const keysWithTrueValue = Object.keys(rowSelection).filter(id => Boolean(rowSelection[id]));
        if (keysWithTrueValue.length === 1) {
            trackPromise(
                // https://api.curately.ai/QADemoCurately/clonejob
                ApiService.postWithData('admin', 'clonejob', {
                    "jobId": Number(keysWithTrueValue[0]),
                    "clientId": userLocalData.getvalue('clientId'),
                    createdBy: userLocalData.getvalue('recrId')
                }).then((response) => {
                    if (response.data.success && response.data.JobId) {
                        showToaster(`Job is cloned successfully`, 'success');
                        openJobView(response.data.JobId);
                        loadJobs(jobFilterData.current, true);
                        // setRowSelection({});
                    } else {
                        showToaster((response.data.Message) ? response.data.Message : "An error occurred while deleting", 'error');
                    }
                })
            )
        }
    }

    // const publishJob = () => {
    //     const keysWithTrueValue = Object.keys(rowSelection).filter(id => Boolean(rowSelection[id]));
    //     if (keysWithTrueValue.length === 1) {
    //         fetchJobDetails(Number(keysWithTrueValue[0]))
    //             .then(() => {
    //                 setIsPublishPopUpOpen(true);
    //                 saveAuditLog(4178);
    //             })
    //             .catch(error => {
    //                 showToaster("Unable to fetch Job Data", error)
    //             });
    //     }
    // }


    const publishJobToAvionte = () => {

        let bodyRequest = {
            "atsName": "Avionte",
            "clientId": userLocalData.getvalue('clientId'),
            "recruiterId": userLocalData.getvalue('recrId'),
            "moduleName": "Job",
            "curatelyIds": Object.entries(rowSelection).filter(([_key, value]) => value).map(([key]) => key),
        }

        // const keysWithTrueValue = Object.keys(rowSelection).filter(id => Boolean(rowSelection[id]));
        //if (keysWithTrueValue.length === 1) {
        // https://adminapi.cxninja.com/bullhorn-service-dev/job/%7BclientId%7D/%7BjobId%7D
        ApiService.postWithData('ats', `ats/post`, bodyRequest).then((response) => {
            if (response.data.Success) {
                showToaster(`Job is Publshed successfully`, 'success');
                setRowSelection({});
                loadJobs(jobFilterData.current, true);
            } else {
                showToaster((response.data.Message) ? response.data.Message : "Unable to Publish Job to Avionte", 'error');
            }
        }).catch(error => {
            showToaster(error.message ? error.message : "Unable to Publish Job to Avionte", 'error');
        });
        // }        
    }

    // publishJobToJobDiva

    // const publishJobToJobDiva = () => {

    //     let bodyRequest = {
    //         "atsName": "Jobdiva",
    //         "clientId": userLocalData.getvalue('clientId'),
    //         "recruiterId": userLocalData.getvalue('recrId'),
    //         "moduleName": "Job",
    //         "curatelyIds": Object.entries(rowSelection).filter(([key, value]) => value).map(([key]) => key),
    //     }

    //     ApiService.postWithData('ats', `ats/post`, bodyRequest).then((response) => {
    //         if (response.data.Success) {
    //             showToaster(`Job is Publshed successfully`, 'success');
    //             setRowSelection({});
    //             loadJobs(jobFilterData.current, true);
    //         } else {
    //             showToaster((response.data.Message) ? response.data.Message : "Unable to Publish Job to Jobdiva", 'error');
    //         }
    //     }).catch(error => {
    //         showToaster(error.message ? error.message : "Unable to Publish Job to Jobdiva", 'error');
    //     });

    // }


    const publishJobToBullhorn = () => {


        let bodyRequest = {
            "atsName": "Bullhorn",
            "clientId": userLocalData.getvalue('clientId'),
            "recruiterId": userLocalData.getvalue('recrId'),
            "moduleName": "Job",
            "curatelyIds": Object.entries(rowSelection).filter(([_key, value]) => value).map(([key]) => key),
        }


        // const keysWithTrueValue = Object.keys(rowSelection).filter(id => Boolean(rowSelection[id]));
        //if (keysWithTrueValue.length === 1) {
        // https://adminapi.cxninja.com/bullhorn-service-dev/job/%7BclientId%7D/%7BjobId%7D
        ApiService.postWithData('ats', `ats/post`, bodyRequest).then((response) => {
            if (response.data.Success) {
                showToaster(`Job is Publshed successfully`, 'success');
                setRowSelection({});
                loadJobs(jobFilterData.current, true);
            } else {
                showToaster((response.data.Message) ? response.data.Message : "Unable to Publish Job to BullHorn", 'error');
            }
        }).catch(error => {
            showToaster(error.message ? error.message : "Unable to Publish Job to BullHorn", 'error');
        });
        // }
    }


    const publishJobToVoiceAI = () => {
        //  const keysWithTrueValue = Object.keys(rowSelection).filter(id => Boolean(rowSelection[id]));

        let jobIds = Object.entries(rowSelection)
            .filter(([_key, value]) => value === true)
            .map(([key, _value]) => parseInt(key));

        if (jobIds.length) {
            let data = {
                "jobIds": jobIds,
                "clientId": userLocalData.getvalue('clientId'),
                "recrId": userLocalData.getvalue('recrId'),
                "questions": []
            }
            // https://adminapi.cxninja.com/voice-ai-prod/jobs/submitJob
            ApiService.postWithData('voiceai', `jobs/submitJob`, data).then((response) => {
                if (response.data?.length) {
                    let calculatedData = response.data;

                    console.log(calculatedData);
                    let errorResponse = ""; let successResponse = "";
                    for (let si = 0; si < calculatedData.length; si++) {

                        if (calculatedData[si]?.error) {
                            errorResponse += calculatedData[si].failureJobId + " - " + calculatedData[si].errorResponse + "\n";

                            // setRowSelection({});
                        } else {
                            successResponse += calculatedData[si]?.title + " - User Voice AI Created Successfully.\n";
                            //     showToaster(calculatedData[si]?.first_name + " " + calculatedData[si]?.last_name + " - User Voice AI Created Successfully.", 'success');
                            // setRowSelection({});
                            // loadJobs(jobFilterData.current, true);
                        }
                    }

                    (errorResponse) ? showToaster(errorResponse, 'error') : null;
                    if (successResponse) {
                        setRowSelection({});
                        if (pagination.pageIndex === 0) {
                            loadJobs(jobFilterData.current, true);
                        } else setPagination({ ...pagination, pageIndex: 0 });
                        showToaster(successResponse, 'success')
                    }

                }
                // if (response.data.Success) {
                //     showToaster(`Job is Publshed successfully`, 'success');
                //      setRowSelection({});
                // } else {
                //     showToaster((response.data.Message) ? response.data.Message : "Unable to Publish Job to Voice AI", 'error');
                // }
            }).catch(error => {
                showToaster(error.message ? error.message : "Unable to Publish Job to Voice AI", 'error');
            });
        }
    }


    // const handleFilterSearch = (data: any) => {
    //     setPagination({
    //         pageIndex: 0,
    //         pageSize: 25, //customize the default page size
    //     })
    //     const count = pagination.pageSize * pagination.pageIndex;
    //     data.next = count;
    //     data.pageSize = pagination.pageSize;
    //     jobFilterData.current = data;
    //     loadJobs(data);
    // }
    const handleFilterSearch = (data: any) => {
        let sessionData = sessionStorage.getItem(`jobs_${filtersSearchId.current}`);
        let dataToSave = {
            total: sessionData ? JSON.parse(sessionData as string)?.total : 0,
            filters: data,
            data: sessionData ? JSON.parse(sessionData as string)?.data : [],
            page: pagination.pageIndex
        }
        sessionStorage.setItem(`jobs_${filtersSearchId.current}`, JSON.stringify(dataToSave))

        jobFilterData.current = {
            ...jobFilterData.current,
            ...data,
            next: 0,
            pageIndex: 0,
        };
        setPagination({ ...pagination, pageIndex: 0 });
        setFilterTrigger(f => !f);

        setSelectedRowCount(0);
        setRowSelection({});
        setIsSelectAllChecked(false);
        selectAllMenuItemClicked("clear")
        // setPageCount(0); 
        // setRowPageIndex(0);
    };




    const [selectAllElement, setSelectAllElement] = useState<null | HTMLElement>(
        null
    );

    const [pagination, setPagination] = useState({
        pageIndex: sessionStorage.getItem(`jobs_${filtersSearchId.current}`) ? (JSON.parse(sessionStorage.getItem(`jobs_${filtersSearchId.current}`) as string)?.page ? Number(JSON.parse(sessionStorage.getItem(`jobs_${filtersSearchId.current}`) as string)?.page) : 0) : 0,
        pageSize: 25, //customize the default page size
    });

    const openSelectAllMenu = Boolean(selectAllElement);

    const openSelectAll = (event: React.MouseEvent<HTMLButtonElement>) => {
        setSelectAllElement(event.currentTarget);
    };

    const checkedCount = Object.keys(rowSelection).filter((id) => Boolean(rowSelection[id])).length;

    const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);
    // const [rowPageIndex, setRowPageIndex] = useState(0);

    const someAreChecked = (!isSelectAllChecked && checkedCount) ? true : false;
    const [openAddJobModal, setOpenAddJobModal] = useState(false);
    const [selectMenuType, setSelectMenuType] = useState<"page" | "all" | "clear" | "">("")

    const currentSelectCount = useRef(0);
    // const [rowPageIndex, setRowPageIndex] = useState(0);
    // const [pageCount, setPageCount] = useState(0);
    // const [allPageCount, setAllPageCount] = useState(0);


    const selectAllMenuItemClicked = (menuType: any) => {
        if (menuType === "page" || ((menuType === "all") && (rowCount <= 25))) {
            let checkedCheckboxesData: any = {};
            for (let index = 0; index < jobData.length; index++) {
                checkedCheckboxesData[jobData[index].jobId] = true;
            }
            // setCheckedCount(Object.keys(checkedCheckboxesData).length);
            setRowSelection(checkedCheckboxesData);
            setIsSelectAllChecked(false);
            currentSelectCount.current = Object.keys(checkedCheckboxesData).length;
        } else if (menuType === "all") {
            let dataToPass = {
                next: 0,
                pageSize: 2500,
                pageIndex: 0,
                clientId: userLocalData.getvalue('clientId'),
                jobId: (jobFilterData.current.jobId) ? Number(jobFilterData.current.jobId) : "",
                contId: (jobFilterData.current.contactId) ? jobFilterData.current.contactId : "",
                primaryRecruiter: (jobFilterData.current.recruiterId) ? Number(jobFilterData.current.recruiterId) : "",
                fromDate: (jobFilterData.current.fromDate) ? jobFilterData.current.fromDate : "",
                createDate: (jobFilterData.current.toDate) ? jobFilterData.current.toDate : "",
                workCity: (jobFilterData.current.city) ? jobFilterData.current.city : "",
                workState: (jobFilterData.current.state) ? getStatesCodes(masterStatesList, jobFilterData.current.state) : "",
                workZipcode: (jobFilterData.current.zipcode) ? jobFilterData.current.zipcode : "",
                status: (jobFilterData.current.jobStatus) ? jobFilterData.current.jobStatus : "",
                jobTitle: (jobFilterData.current.jobTitle) ? jobFilterData.current.jobTitle : "",
                category: (jobFilterData.current.jobCategory) ? jobFilterData.current.jobCategory : "",
                jobClientId: (jobFilterData.current.jobClientId) ? jobFilterData.current.jobClientId : "",
                searchString: (jobFilterData.current.searchString) ? jobFilterData.current.searchString : "",
                isSelect: true
            }

            setSelectedPage(false);
            trackPromise(
                ApiService.postWithData('admin', 'getJobsApplicantsDashboard', dataToPass).then((result) => {
                    let rowData: any = {};
                    let tempData: any = result.data?.Applicants || [];
                    for (let index = 0; index < tempData.length; index++) {
                        rowData[tempData[index].jobId] = true;
                    }

                    setRowSelection(rowData);
                    setSelectedRowCount(tempData.length);
                })
            );

            setIsSelectAllChecked(true);
        } else if (menuType === "clear") {
            setIsSelectAllChecked(false);
            setRowSelection({});
            currentSelectCount.current = 0;
        }
        setSelectAllElement(null);
        setSelectMenuType(menuType);
    };

    useEffect(() => {
        // if (initialRender.current) {
        //     initialRender.current = false;
        // } else {
        const data = {
            ...jobFilterData.current,
            next: pagination.pageSize * pagination.pageIndex,
            pageSize: pagination.pageSize,
            pageIndex: pagination.pageIndex
        }
        if (isFirstTimeLoad.current) {
            isFirstTimeLoad.current = false;
            setRowCount(filtersSearchData.current.total);
            setJobData(filtersSearchData.current.data);

        } else loadJobs(data);
        setRowSelection({});
        // }
    }, [pagination.pageIndex, pagination.pageSize, filterTrigger])

    const saveAuditLog = (id: number) => {
        ApiService.saveAuditLog(id);
    }

    useEffect(() => {
        saveAuditLog(4156);
    }, [])

    const handlePaginationChange = (newPage: number) => {
        if (newPage > pagination.pageIndex) {
            saveAuditLog(4179);
        } else if (newPage < pagination.pageIndex) {
            saveAuditLog(4180);
        }
    };

    const columnVisibility = useMemo(() => {
        let visibleColumns: any = {};
        const getChecked = (data: any) => data?.checked ? data.checked : false;
        if (!!menuLayoutColumns?.length) {
            menuLayoutColumns.forEach((each) => {
                switch (each.key) {
                    case "bulhornId": visibleColumns[each.key] = isBullHornSettingEnabled ? (getChecked(each)) : false; break;
                    case "voiceAiId": visibleColumns[each.key] = isVoiceAISettingEnabled ? (getChecked(each)) : false; break;
                    case "aviontId": visibleColumns[each.key] = isAvionteAPISettingEnabled ? (getChecked(each)) : false; break;
                    case "evaluteId": visibleColumns[each.key] = isEvaluteSettingEnabled ? (getChecked(each)) : false; break;
                    case "jobDivaId": visibleColumns[each.key] = isJobDivaAPISettingEnabled ? (getChecked(each)) : false; break;
                    case "status": visibleColumns[each.key] = isHiringWorkFlowEnabled ? getChecked(each) : false; break;
                    case "appCount": visibleColumns[each.key] = isHiringWorkFlowEnabled ? getChecked(each) : false; break;
                    case "referenceNo": visibleColumns[each.key] = isHiringWorkFlowEnabled ? getChecked(each) : true; break;
                    default: visibleColumns[each.key] = getChecked(each); break;
                }
            })
        } else {
            columns.forEach((each: any) => {
                switch (each.accessorKey) {
                    case "status": visibleColumns[each.accessorKey] = isHiringWorkFlowEnabled ? true : false; break;
                    case "appCount": visibleColumns[each.accessorKey] = isHiringWorkFlowEnabled ? true : false; break;
                    default: visibleColumns[each.accessorKey] = true; break;
                }
            })
        }
        visibleColumns["actions"] = isQuickActionsEnabled ? true : false;
        return visibleColumns;
    }, [menuLayoutColumns, columns]);

    const columnOrderState = useMemo(() => {
        let columnOrder = menuLayoutColumns.map((each) => each.key);
        columnOrder.unshift("mrt-row-select");
        return columnOrder;
    }, [menuLayoutColumns]);

    return (
        <div className="FindJob mx-4 pt-4">
            <Stack
                direction="row"
                className="customCard px-4 py-2"
                justifyContent="space-between"
                alignItems="center"
                sx={{ minHeight: 'auto !important' }}
            >
                <Typography variant="h6" className="header">
                    Jobs
                </Typography>
                <Stack direction="row" className="btn-container" spacing={1}>
                    {isIDIBUSettingEnabled && userLocalData.checkIntegration(ID_ROLE_JOB_ALLOW_TO_POST_JOBS_ON_INTERNAL_AND_EXTERNAL_SITES) ?
                        <Button
                            id="add-jobboard-btn"
                            disableRipple
                            variant="contained"
                            color="primary"
                            className="ml-2"
                            disabled={(checkedCount === 1) ? false : true}
                            onClick={openBoardModal}
                        >
                            Post Job
                        </Button>
                        :
                        null
                    }

                    {
                        isJobAddSettingEnabled ?
                            <Button
                                variant="contained"
                                size="small"
                                // href="#/job/add"
                                onClick={openAddModal}
                                color="primary"
                            >
                                Add Job
                            </Button>
                            :
                            null
                    }
                </Stack>
            </Stack>
            <Grid container spacing={0} className="customCard p-0 filterExpand-grid">
                <Grid sx={{ width: filtersExpand ? 0 : 310, overflow: 'hidden', opacity: filtersExpand ? 0 : 1 }}>
                    <FindJobFilters onSearch={handleFilterSearch} onFiltersChange={jobFilterData.current} />
                </Grid>
                <Grid sx={{ width: filtersExpand ? 'calc(100%)' : 'calc(100% - 310px)' }}>
                    <div className={`MRTableCustom ${filtersExpand ? 'pl-0' : ''}`}>
                        <Tooltip title={filtersExpand ? "Show Filters" : "Hide Filters"}>
                            <IconButton disableRipple className="filtersHideButton" color="primary" aria-label={filtersExpand ? "Expand" : "Collapse"} onClick={toggleFilers}>
                                {/* {<img src={CommonImages.GetFilterIcon()} className="filterIcon" />} */}
                                <TuneIcon className="c-grey" />
                                {/* {
                                filtersExpand ?
                                    <KeyboardDoubleArrowRightIcon />
                                    :
                                    <KeyboardDoubleArrowLeftIcon />
                            } */}
                            </IconButton>
                        </Tooltip>
                        <Grid container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            className="actionItems"
                            sx={{ width: "98% !important", marginTop: "30px" }}>
                            <Grid >
                                <Stack direction={"row"} alignItems={"center"}>
                                    <Button
                                        disableRipple
                                        id="select-all-button"
                                        className="select-all-button"
                                        aria-controls={
                                            openSelectAllMenu ? "select-all-menu" : undefined
                                        }
                                        aria-haspopup="true"
                                        aria-expanded={openSelectAllMenu ? "true" : undefined}
                                        onClick={openSelectAll}
                                    >
                                        <div>
                                            <Checkbox
                                                className="select-all-checkbox"
                                                disableRipple
                                                color="default"
                                                checked={isSelectAllChecked}
                                                // onClick={handleSelectAllClick}
                                                indeterminate={someAreChecked}
                                            />
                                        </div>
                                        <span className={`selectedCountText ${checkedCount === 0 ? "d-none" : "d-block"}`}>
                                            {/* {(rowPageIndex > 0) ? (rowCount > 10000) ? 10000 : rowCount : checkedCount} Selected */}
                                            {/* {(isSelectAllChecked) ? ((selectedRowCount > 10000) ? 10000 : selectedRowCount) : checkedCount} Selected */}
                                            {((0 > 0 && !selectedPage)) ? (rowCount > 2500) ? 2500 : rowCount : selectedPage ? 0 : checkedCount} Selected
                                            {/* {((rowPageIndex > 0 && !selectedPage)) ? (rowCount > 2500) ? 2500 : rowCount : selectedPage ? selectedPageCount : checkedCount} */}
                                            {/* selectedPageCount   0 */}
                                        </span>

                                        <ArrowDropDownIcon
                                            className="arrowDownIcon"
                                        />
                                    </Button>
                                    <Menu
                                        id="select-all-menu"
                                        className="select-all-menu"
                                        anchorEl={selectAllElement}
                                        open={openSelectAllMenu}
                                        onClose={() => setSelectAllElement(null)}
                                        MenuListProps={{
                                            "aria-labelledby": "select-all-checkbox",
                                        }}
                                        anchorOrigin={{
                                            vertical: "bottom",
                                            horizontal: "left",
                                        }}
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "left",
                                        }}
                                        PaperProps={{
                                            style: { overflow: "visible" },
                                        }}
                                    >
                                        <MenuItem
                                            disableRipple
                                            onClick={() => { selectAllMenuItemClicked("page"); saveAuditLog(4172) }}
                                            className="menuItem"
                                        >
                                            Select this page(
                                            <Box component="span">{jobData.length}</Box>)
                                        </MenuItem>
                                        <MenuItem
                                            disableRipple
                                            onClick={() => { selectAllMenuItemClicked("all"); saveAuditLog(4173) }}
                                        >
                                            Select all Jobs (<Box component="span">{(rowCount > 2500) ? 2500 : rowCount}</Box>)
                                        </MenuItem>
                                        <MenuItem
                                            disableRipple
                                            onClick={() => { selectAllMenuItemClicked("clear"); saveAuditLog(4174) }}
                                        >
                                            Clear Selection
                                        </MenuItem>
                                    </Menu>
                                    {/* <Button
                                variant="outlined"
                                color="secondary"
                                className="ml-2"
                                //disabled={Object.keys(rowSelection).length > 0 ? false : true}
                                //onClick={() => setAddEmail(true)}
                                //startIcon={<MailOutlineOutlinedIcon />}
                            >
                                New
                            </Button> */}
                                    {isHiringWorkFlowEnabled ?
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            className="ml-2"
                                            //  onClick={(e) => handleTableSequence(e, '')}
                                            disabled={(checkedCountmerge === 1) ? false : true}
                                            // disabled={Object.keys(rowSelection).length === 1 ? false : true}
                                            //startIcon={<SendOutlinedIcon />}
                                            id="add-sequencelist-btn"
                                            disableRipple
                                            //aria-controls={openAddToSequenceListenBtn ? "addsequencelistmenu" : undefined}
                                            aria-haspopup="true"
                                            onClick={() => { cloneJobById(); saveAuditLog(4175); }}
                                        >
                                            Clone
                                        </Button> : null
                                    }

                                    {
                                        isHiringWorkFlowEnabled && userLocalData.checkIntegration(ID_ROLE_JOB_ALLOW_TO_MERGE_JOBS) ?
                                            <Button
                                                id="add-poollist-btn"

                                                disableRipple
                                                variant="outlined"
                                                color="secondary"
                                                className="ml-2"
                                                disabled={(checkedCountmerge === 0 || checkedCountmerge === 2) ? false : true}
                                                // disabled={
                                                //     !(Object.keys(rowSelection).length === 0 || Object.keys(rowSelection).length === 2)
                                                // }
                                                onClick={() => { setOpenMergeFields(true) }}
                                            >
                                                Merge
                                            </Button>
                                            :
                                            null
                                    }
                                    <Button
                                        id="add-poollist-btn"
                                        disableRipple
                                        variant="outlined"
                                        color="secondary"
                                        className="ml-2"
                                        disabled={isJobDeleteSettingEnabled && (checkedCountmerge > 0) ? false : true}
                                        // disabled={Object.keys(rowSelection).length > 0 ? false : true}
                                        onClick={() => {
                                            confirmDialog('Are you sure you want to delete the selected jobs?', () => {
                                                deleteJobById(Object.keys(rowSelection).filter((id) => Boolean(rowSelection[id])).join()); // Replace 1 with the actual jobId you want to delete
                                            }, "warning");
                                        }}
                                    >
                                        Delete
                                    </Button>
                                    {/* {isIDIBUSettingEnabled && userLocalData.checkIntegration(ID_ROLE_JOB_ALLOW_TO_POST_JOBS_ON_INTERNAL_AND_EXTERNAL_SITES) ?
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            className="ml-2"
                                            disabled={(checkedCount === 1) ? false : true}
                                            //startIcon={<SendOutlinedIcon />}
                                            id="publish-btn"
                                            disableRipple
                                            //aria-controls={openAddToSequenceListenBtn ? "addsequencelistmenu" : undefined}
                                            aria-haspopup="true"
                                            onClick={() => { publishJob() }}
                                        >
                                            Publish
                                        </Button>
                                        :
                                        null
                                    } */}
                                    {isBullHornSettingEnabled ?
                                        <Button variant="outlined" color="secondary" className="ml-2" id="bullhorn-btn"
                                            disabled={(checkedCount > 0) ? false : true}
                                            disableRipple aria-haspopup="true"
                                            onClick={() => { publishJobToBullhorn() }}
                                        >
                                            Bullhorn
                                        </Button>
                                        :
                                        null
                                    }
                                    {/* {isJobDivaAPISettingEnabled ?
                                        <Button variant="outlined" color="secondary" className="ml-2" id="jobdiva-btn"
                                            disabled={(checkedCount === 1) ? false : true}
                                            disableRipple aria-haspopup="true"
                                            onClick={() => { publishJobToJobDiva() }}
                                        >
                                            Job Diva
                                        </Button>
                                        :
                                        null
                                    } */}
                                    {isVoiceAISettingEnabled ?
                                        <Button variant="outlined" color="secondary" className="ml-2" id="voiceai-btn"
                                            disabled={(checkedCount > 0) ? false : true}
                                            disableRipple aria-haspopup="true"
                                            onClick={() => { publishJobToVoiceAI() }}
                                        // onClick={() => setOpenVoiceAiModal(true)}
                                        >
                                            Voice AI
                                        </Button>
                                        :
                                        null
                                    }
                                    {/* {isEvaluteSettingEnabled ?
                                        <Button variant="outlined" color="secondary" className="ml-2" id="voiceai-btn"
                                            disabled={(checkedCount > 0) ? false : true}
                                            disableRipple aria-haspopup="true"
                                        //  onClick={() => { publishJobToEvalute() }}
                                        >
                                            Evalute
                                        </Button>
                                        :
                                        null
                                    } */}
                                    {isAvionteAPISettingEnabled ?
                                        <Button variant="outlined" color="secondary" className="ml-2" id="voiceai-btn"
                                            disabled={(checkedCount > 0) ? false : true}
                                            disableRipple aria-haspopup="true"
                                            onClick={() => { publishJobToAvionte() }}
                                        >
                                            Avionte
                                        </Button>
                                        :
                                        null
                                    }
                                </Stack>
                            </Grid>
                            <Grid >
                                <Button variant="outlined" disabled={orderedColumnsList?.length === 0} color="secondary" ref={layoutRef} onClick={() => setOpenNewLayoutModal(true)} endIcon={<ArrowDropDownIcon />} >
                                    Table Layout
                                </Button>
                                {openNewLayoutModal && <NewLayoutMenu
                                    ref={layoutRef}
                                    open={openNewLayoutModal}
                                    handleClosemenu={() => setOpenNewLayoutModal(false)}
                                    columnsData={menuLayoutColumns}
                                    handleColumnAction={setMenuLayoutColumns}
                                    layoutType="jobs"
                                    pinnedColumn={pinnedColumn.name}
                                    resetLayout={getAllLayoutData}
                                />}
                            </Grid>
                        </Grid>
                        <MaterialReactTable
                            columns={isLayoutFetched ? columns : []}
                            enableHiding
                            enableRowSelection
                            data={jobData}
                            onRowSelectionChange={setRowSelection}
                            // muiSelectCheckboxProps={(prop) => ({
                            //     onChange: (e) => {
                            //         if (prop.row.id) {
                            //             let duplicateCheckedCount = checkedCount;
                            //             let tempRowSelection: any = { ...rowSelection };
                            //             if (e.target.checked) {
                            //                 tempRowSelection[prop.row.id] = e.target.checked;
                            //                 duplicateCheckedCount++;
                            //             } else {
                            //                 if (tempRowSelection.hasOwnProperty(prop.row.id)) {
                            //                     duplicateCheckedCount--;
                            //                     delete tempRowSelection[prop.row.id];
                            //                 }
                            //             }
                            //             setCheckedCount(duplicateCheckedCount)
                            //             setRowSelection({ ...rowSelection, [prop.row.id]: e.target.checked });
                            //             console.log(e.target.checked);
                            //             if (isSelectAllChecked) {
                            //                 if (e.target.checked) {
                            //                     setSelectedRowCount(selectedRowCount + 1);
                            //                 } else {
                            //                     setSelectedRowCount(selectedRowCount - 1);
                            //                 }
                            //             }
                            //             else {
                            //                 if (selectedPage) {
                            //                     if (e.target.checked) {
                            //                         const updatedListCandidate = jobData.filter((i: any) => i.jobid === prop.row.id);
                            //                         if (updatedListCandidate.length > 0) {
                            //                             setSelectedPageCount(selectedPageCount + 1);
                            //                         }
                            //                     } else {
                            //                         setSelectedPageCount(selectedPageCount - 1);
                            //                     }
                            //                 }
                            //             }
                            //         }
                            //     }
                            // })}
                            muiSelectCheckboxProps={(prop) => ({
                                onChange: (e) => {
                                    const checked = e.target.checked;
                                    let updatedRowSelection = { ...rowSelection };
                                    updatedRowSelection[prop.row.id] = checked;
                                    setRowSelection(updatedRowSelection);
                                    // setCheckedCount(checked ? checkedCount + 1 : checkedCount - 1);
                                    if (checked) {
                                        setSelectedRowCount(selectedRowCount + 1);
                                    } else {
                                        setSelectedRowCount(selectedRowCount - 1);
                                    }
                                },
                                checked: !!rowSelection[prop.row.id],
                            })}
                            state={{
                                rowSelection, pagination,
                                isLoading: !isLayoutFetched,
                                columnPinning: isLayoutFetched ? { left: ["mrt-row-select", pinnedColumn.key] } : {},
                                columnVisibility: columnVisibility,
                                columnOrder: columnOrderState
                            }} //pass our managed row selection state to the table to use
                            enablePinning
                            enableStickyHeader
                            initialState={{
                                columnPinning: isLayoutFetched ? { left: ["mrt-row-select", pinnedColumn.key] } : {},
                                density: 'compact',
                                showGlobalFilter: false,
                            }}
                            // enableColumnResizing
                            enableGlobalFilterModes
                            columnResizeMode="onChange"
                            onPaginationChange={setPagination}
                            enablePagination={false}
                            renderBottomToolbarCustomActions={() => (
                                <CustomPagination
                                    page={pagination.pageIndex}
                                    rowsPerPage={25}
                                    rowCount={rowCount}
                                    onChangePage={(page: any) => {
                                        setPagination({
                                            ...pagination,
                                            pageIndex: page,
                                            pageSize: 25,
                                        });

                                        if (!["all", "clear"].includes(selectMenuType)) {
                                            selectAllMenuItemClicked("clear")
                                        };
                                        handlePaginationChange(page);

                                    }}
                                />
                            )}
                            getRowId={(row) => row.jobId}
                            icons={{
                                ArrowDownwardIcon: (props: any) => <SwitchLeftIcon  {...props} />
                            }}
                            rowCount={rowCount}
                            manualPagination
                            // paginateExpandedRows={true}
                            // enableRowVirtualization
                            // onColumnSizingChange={(e) => columnChanged(e)}
                            // onColumnSizingInfoChange={(e) => columnInfo(e)}
                            // muiPaginationProps={{ className: 'customMRTPagination' }}
                            // muiTableFooterProps={{ className: 'customMRTPagination' }}
                            muiBottomToolbarProps={{ className: isDataLoading ? 'customMRTPagination' : '' }}

                        />
                    </div>

                </Grid>
            </Grid>
            {
                (openAddJobModal) ?
                    <AddJob
                        open={openAddJobModal}
                        closePopup={(addOrCancel: string) => {
                            setOpenAddJobModal(false);
                            if (addOrCancel) {
                                // const data = {
                                //     next: 0,
                                //     pageSize: 25
                                // }
                                // jobFilterData.current = {
                                //     ...jobFilterData.current,
                                //     ...data
                                // };
                                setPagination({ ...pagination, pageIndex: 0 });
                                loadJobs(jobFilterData.current, true);
                            }

                        }
                        }
                        add={!isEditMode}
                        jobData={editJobData}
                    />
                    :
                    null
            }
            {
                isPublishPopUpOpen ?
                    <PublishJob jobData={editJobData} open={isPublishPopUpOpen} closePopup={() => { setIsPublishPopUpOpen(false) }} />
                    :
                    null
            }
            {
                openMergeFields ?
                    <MergeFields
                        open={openMergeFields}
                        closePopup={(bool) => {
                            if (bool) {
                                setRowSelection({});
                                // loadJobs(jobFilterData.current, true)
                                loadJobs({ ...jobFilterData.current, pageIndex: pagination.pageIndex, next: pagination.pageSize * pagination.pageIndex }, true);
                            }
                            setOpenMergeFields(false);
                        }}
                        jobsData={mergeJobData}
                    />
                    :
                    null
            }
            {
                isApplicantsJobSelected ?
                    <ApplicantsListView
                        open={isApplicantsJobSelected}
                        closePopup={() => {
                            jobApplicantDetails.current = { jobId: "", appCount: 0 }
                            setIsApplicantsJobSelected(false);
                        }}
                        jobId={jobApplicantDetails.current.jobId}
                        appCount={jobApplicantDetails.current.appCount}
                    />
                    :
                    null
            }

            {(openAddJobBoardModal) ?
                <AddJobPortal
                    open={openAddJobBoardModal}
                    closePopup={() => { setOpenAddJobBoardModal(false) }}
                    add={!isEditMode}
                    jobData={editJobData}
                />
                :
                null
            }

            {openApplicantsStatus ? <ApplicantsStatus
                open={openApplicantsStatus}
                closePopup={() => {
                    setApplicantsStatusList([]);
                    setStatusData({ type: "", jobId: "", jobTitle: "" });
                    setOpenApplicantsStatus(false);
                }}
                applicantsStatusList={applicantsStatusList}
                statusData={statusData} />
                : null}

            {openVoiceAIModal &&
                <CreateQuestionsModal
                    open={openVoiceAIModal}
                    closePopup={() => { setOpenVoiceAiModal(false) }}
                    jobIds={Object.entries(rowSelection).filter(([_, value]) => value).map(([key]) => key)}
                    loadJobs={() => {
                        setOpenVoiceAiModal(false);
                        setRowSelection({});
                        if (pagination.pageIndex === 0) {
                            loadJobs(jobFilterData.current, true);
                        } else setPagination({ ...pagination, pageIndex: 0 });
                    }}
                />}

        </div >
    );
}

export default FindJob;