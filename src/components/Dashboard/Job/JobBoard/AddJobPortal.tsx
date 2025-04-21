import { Grid } from "../../../../shared/modules/MaterialImports/Grid";
import { Button } from "../../../../shared/modules/MaterialImports/Button";
// import Stack from "@mui/material/Stack";
import { TextField, FormControlLabel } from '../../../../shared/modules/MaterialImports/FormInputs';
// import { TextFieldProps } from '@mui/material/TextField';
import { MenuItem } from '../../../../shared/modules/MaterialImports/Menu';
import { Checkbox } from '../../../../shared/modules/MaterialImports/FormElements';
import { Divider } from '../../../../shared/modules/MaterialImports/Divider';
import { React, SyntheticEvent, useState, Fragment, useEffect, useCallback } from '../../../../shared/modules/React';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { debounce } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import { useFormik, Yup } from "../../../../shared/modules/Formik";
import { showToaster } from '../../../shared/SnackBar/SnackBar';
import ApiService from '../../../../shared/api/api';
// import updateDocumentTitle from '../../../../shared/services/title';
import Editor from '../../../shared/EmailDialogBox/EmailBody';
import ErrorMessage from '../../../shared/Error/ErrorMessage';
import { Dialog, DialogContent, DialogTitle, DialogActions } from '../../../../shared/modules/MaterialImports/Dialog';
import { DatePicker, AdapterLuxon, LocalizationProvider } from '../../../../shared/modules/MaterialImports/DatePicker';
import { DateTime } from '../../../../shared/modules/Luxon';
import { trackPromise } from "../../../../shared/modules/PromiseTrackter";
import { userLocalData } from "../../../../shared/services/userData";
// import { globalData } from "../../../../shared/services/globalData";
// import LinearProgress from "@mui/material/LinearProgress";

//import { dataDynamicBoard as addDataDynamicBoard, type addDynamicBoard } from './JobBoardsDynamic'
import './AddJobPortal.scss';
import { Loader } from "../../../shared/Loader/Loader";
import JobBoardData from "./JobBoardData";
import { JobSector_Category, Job_CountryShortCode } from "./JobSectors";
import { GetFormattedJobBoardData } from "../../Settings/JobBoards/JobBoards";
import { useLayoutEffect } from "react";


interface ICountry {
    id: string;
    place_name: string;
    state: string;
    country: string;
}

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
            id={`addJobBoardTabsPanel-${index}`}
            aria-labelledby={`addJobBoardTabsPanel-${index}`}
            {...other}
            className='addJobBoardTabsPanel customTabsPanel'
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
        'aria-controls': `addJobBoardTabsPanel-${index}`,
    };
}


const AddJobPortal = (
    { open, closePopup, add, jobData, idibuSources }: {
        open: boolean;
        closePopup: (addOrCancel: string) => void;
        add: boolean;
        jobData: any;
        idibuSources?: any
    }
) => {
    const userInfo = JSON.parse(localStorage.getItem("demoUserInfo") || "" as string);
    const [value, setValue] = useState(0);
    let clientId = userLocalData.getvalue('clientId');
    let userId = userLocalData.getvalue('recrId');

    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const [locationList, setLocationList] = useState<any[]>();
    const [categoryList, setCategoryList] = useState<any[] | undefined>();
    const [sublocationList, setSublocationList] = useState<any>([]);

    const [jobLocation, setJobLocation] = useState<any>('US');
    const [subscribedJobBoards, setSubscribedJobBoards] = useState<any>([]);
    const [listJobBoards, setListJobBoards] = useState<any>([]);
    const [listJobPortals, setListJobPortals] = useState<any>([]);
    const [listSenderId, setListenderId] = useState<any>([]);


    const [receivedData, setReceivedData] = useState('');

    const handleReceiveData = (data: any) => {
        let tempData = data;
        tempData.extrafield = tempData.extrafield.map((each: any) => ({
            ...each,
            value: (Array.isArray(each.value) && !!each?.value?.length) ? each.value.join(",") : each.value,
            // type: (Array.isArray(each.value) && !!each?.value?.length) ? "multi" : undefined
        }))

        setReceivedData(tempData);
        const tempIndex = addJobBoardFormik.values.boardDetails?.findIndex((item: { boardId: string }) => item?.boardId?.toString() === tempData?.boardId?.toString());
        console.log(tempIndex);
        if (tempIndex !== -1) {

            addJobBoardFormik.setFieldValue(`boardDetails[${tempIndex}].extrafield`, tempData.extrafield);
            addJobBoardFormik.setFieldValue(`boardDetails[${tempIndex}].duration`, [tempData.duration]);

        } else {
            addJobBoardFormik.setFieldValue("boardDetails", [...addJobBoardFormik.values.boardDetails, tempData]);
        }

        console.log(addJobBoardFormik.values);

    };

    const getAllSubscribedJobBoards = useCallback(debounce(() => {
        ApiService.getCall('admin', `listAllSubscribedJobBoards`)
            .then((response) => {
                let jobBoardPortals = GetFormattedJobBoardData(response.data?.idibu?.response?.portals?.portal || []);
                if (!!userInfo?.idibuJobBoards?.length && jobBoardPortals?.length) {

                    jobBoardPortals = jobBoardPortals.filter((each) => userInfo?.idibuJobBoards?.includes(each.id));

                    let tempBoardIds = [];
                    let boardDetailsObj = {
                        "boardId": "",
                        "extrafield": [{ "name": "", "value": "", "description": "", "required": "", }],
                        "duration": [{ "name": "", "value": "", }]
                    };
                    let tempBoardDetails: any = addJobBoardFormik.values.boardDetails;

                    for (let iam = 0; iam < jobBoardPortals.length; iam++) {
                        if (!add && idibuSources && !!jobData?.portals?.portal?.length) {
                            const isChecked = idibuSources.includes(jobBoardPortals[iam]?.name);
                            jobBoardPortals[iam].checked = isChecked;
                            if (isChecked) {
                                tempBoardIds.push(jobBoardPortals[iam]?.id?.toString())
                                tempBoardDetails = [...tempBoardDetails, { ...boardDetailsObj, boardId: jobBoardPortals[iam]?.id?.toString() }]
                            }
                        } else if (!add && jobData?.portals?.portal) {
                            const isChecked = jobData?.portals?.portal?.filter((i: any) => i.status !== "deleted").some((each: any) => each?.id?.toString() === jobBoardPortals[iam]?.id?.toString())
                            jobBoardPortals[iam].checked = isChecked;
                            if (isChecked) {
                                tempBoardIds.push(jobBoardPortals[iam]?.id?.toString())
                                tempBoardDetails = [...tempBoardDetails, { ...boardDetailsObj, boardId: jobBoardPortals[iam]?.id?.toString() }]
                            }
                        } else {
                            jobBoardPortals[iam].checked = false;
                        }
                    }
                    addJobBoardFormik.setFieldValue("boardids", [...tempBoardIds]);
                    addJobBoardFormik.setFieldValue("boardDetails", [...tempBoardDetails])
                    setSubscribedJobBoards(jobBoardPortals);
                    console.log("getAllSubscribedJobBoards");
                    console.log(response.data.idibu.response.portals.portal);
                }
            })
    }, 400), [])

    const getAllSenderList = useCallback(
        debounce(() => {
            // ApiService.getCall('admin', `getSendersList`).then((response) => {
            //     for (let iam = 0; iam < response.data.idibu.response.users.user.length; iam++) {
            //         response.data.idibu.response.users.user[iam].checked = false;
            //     }
            //     setListenderId(response.data.idibu.response.users.user);
            //     console.log("getAllSender");
            //     console.log(response.data.idibu.response.users.user);
            // });
            ApiService.postWithData('admin', `getIdibuSenderList`, { clientId: userLocalData.getvalue('clientId'), idibuTeamId: userInfo?.idibuTeams[0] }).then((response) => {
                if (response.data.Success) {
                    for (let iam = 0; iam < response.data.idibuSenderList.length; iam++) {
                        response.data.idibuSenderList[iam].checked = false;
                    }
                    setListenderId(response.data.idibuSenderList);
                    console.log("getAllSender");
                    console.log(response.data.idibuSenderList);
                } else { showToaster((response.data.Message) ? response.data.Message : 'An error occured', 'error') }
            });
        }, 400),
        []
    );

    const updateBoardDetails = (event: any, newValue: any) => {
        if (checkAllValidations()) {
            if (addJobBoardFormik.values.boardids.length > 0) {
                setValue(newValue)
            } else { showToaster('Please select any one job board.', 'warning'); return false; }

            setListJobBoards(addJobBoardFormik.values.boardids);
        }

        // let boardIdList = [];
        // boardIdList = removeDups(addJobBoardFormik.values.boardids);

        // const temp1 = [...addBoardDynamicList];
        // boardIdList && boardIdList.map((setting, si) => {

        //     // console.log(setting)
        //     let subData = { "boardId": (setting ? setting : "") }

        //     ApiService.postWithData('admin', `getBoardSpecificFields`, subData)
        //         .then((response) => {
        //             let tempResponse = response.data?.idibu?.boards?.board;
        //             if (tempResponse) {
        //                 //let arryBoard = temp1[0].boardDetails[si];
        //                 const newBoard = { id: tempResponse.id, name: tempResponse.name, field: [], duration: { name: "duration", value: ""} }
        //                 console.log(newBoard);

        //                 temp1[0].boardDetails.push(newBoard);

        //                 let tempExtraFeilds = tempResponse?.extrafields?.extrafield;

        //                 for (let tda = 0; tda < tempExtraFeilds?.length; tda++) {
        //                     const newExtra = {
        //                         name: tempExtraFeilds[tda].name,
        //                         description: tempExtraFeilds[tda].description,
        //                         value: "",
        //                         required: (tempExtraFeilds[tda].required) ? true : false,
        //                     }
        //                     console.log(newExtra);
        //                   temp1[0].boardDetails[si].field.push(newExtra);

        //                 } // for board
        //             };
        //         } /// response
        //         )

        // })
        // console.log("temp1");
        // console.log(temp1);
        // setAddBoardDynamicList(temp1);

    };
    // const [filterKeyword, setFilterKeyword] = useState<string>("");
    // const filteredPostalCodes = getAllSubLocationList(filterKeyword);
    // const debouncedSetter = useMemo(
    //     () => debounce((keyword: string) => setFilterKeyword(keyword), 500),
    //     []
    //   );


    useLayoutEffect(() => {
        if (!userInfo?.idibuJobBoards?.length) {
            closePopup("");
            showToaster("Job Boards doesn't exits. Please contact Admin", "error");
        }
    }, [])

    useEffect(() => {
        //  getAllJobBoardList('1185');
        if (!!userInfo?.idibuJobBoards?.length) {
            getAllSubLocationList(jobData?.sub_location?.content ? jobData?.sub_location?.content?.split(" ")[0] : 'ab');
            getAllSenderList();
            getAllSubscribedJobBoards();
        }
    }, []);

    //console.log(jobData);
    const initialValues = jobData.jobId ?
        {
            "jobTitle": jobData && jobData.jobTitle ? jobData.jobTitle : null,
            "reference": !add ? (jobData ? jobData?.reference : "") : (jobData && jobData?.companyId) ? "CUR_" + jobData.companyId + "_" + jobData.jobId : null,
            "description": jobData && jobData.publicDescription ? jobData.publicDescription : null,
            "categoryId": jobData?.sector?.id || "",
            "startdate": jobData && jobData?.startDate ?
                (new Date(jobData.startDate)?.getFullYear() >= 2000 ? DateTime.now().toFormat('MM/dd/yyyy') : DateTime.now().toFormat('MM/dd/yyyy'))
                : DateTime.now().toFormat('MM/dd/yyyy'),
            "totalDuration": jobData && jobData.jobHours ? jobData.jobHours : "",
            "salarymin": jobData && typeof jobData.payrateMin === "number" ? jobData.payrateMin : "",
            "salarymax": jobData && typeof jobData.payrateMax === "number" ? jobData.payrateMax : "",
            "publish": jobData && jobData?.startDate ?
                (new Date(jobData.startDate)?.getFullYear() >= 2000 ? DateTime.now().toFormat('MM/dd/yyyy') : DateTime.now().toFormat('MM/dd/yyyy'))
                : DateTime.now().toFormat('MM/dd/yyyy'),
            "location": jobData?.location?.code || "US",
            "sublocation": jobData?.sub_location?.id || "",
            "sublocationContent": jobData?.sub_location?.content || "",
            "senderId": jobData?.sender?.id || "",
            "salaryper": jobData?.salaryper || "hour",
            "currency": jobData?.currency || "USD",
            "jobtype": jobData?.jobType || "",
            "boardids": [],
            "boardDetails": []
            // "boardDetails": [{
            //     "boardId": "",
            //     "extrafield": [{
            //         "name": "",
            //         "value": "",
            //         "description": "",
            //         "required": "",
            //     }],
            //     "duration": [{
            //         "name": "",
            //         "value": "",
            //     }]
            // }],

        } : {
            "jobTitle": "",
            "reference": "",
            "description": "",
            "categoryId": "",
            "startdate": DateTime.now().toFormat('MM/dd/yyyy'),
            "totalDuration": "",
            "salarymin": "",
            "salarymax": "",
            "publish": DateTime.now().toFormat('MM/dd/yyyy'),
            "location": "US",
            "sublocation": "",
            "sublocationContent": "",
            "senderId": "",
            "salaryper": "hour",
            "currency": "USD",
            "jobtype": "",
            "boardids": [],
            "boardDetails": []
            // "boardDetails": [{
            //     "boardId": "",
            //     "extrafield": [{
            //         "name": "",
            //         "value": "",
            //         "description": "",
            //         "required": "",
            //     }],
            //     "duration": [{
            //         "name": "",
            //         "value": "",
            //     }]
            // }],

        }

    const documentSchema = Yup.object({
        "jobTitle": Yup.string().required('Required'),
        "reference": Yup.string().required('Required'),
        "description": Yup.string().required('Required'),
        "categoryId": Yup.string().required('Required'),
        "startdate": Yup.string().required('Required'),
        "totalDuration": Yup.string().required('Required'),
        "salarymin": Yup.string().required('Required'),
        "salarymax": Yup.string().required('Required'),
        "publish": Yup.string().required('Required'),
        "location": Yup.string().required('Required'),
        "sublocation": Yup.string().required('Required'),
        "sublocationContent": Yup.string(),
        "senderId": Yup.string().required('Required'),
        "salaryper": Yup.string().required('Required'),
        "currency": Yup.string().required('Required'),
        "jobtype": Yup.string().required('Required'),
        "boardids": Yup.array(),
        "boardDetails": Yup.object().shape({
            boardId: Yup.string(),
            extrafield: Yup.array().of(
                Yup.object().shape({
                    name: Yup.string(),
                    value: Yup.string(),
                    description: Yup.string(),
                    required: Yup.string(),
                })
            ),
            duration: Yup.array().of(Yup.object().shape({
                name: Yup.string(),
                value: Yup.string(),
            })
            ),
        })

    })
    const addJobBoardFormik = useFormik({
        initialValues,
        validationSchema: documentSchema,
        onSubmit: () => {
            setIsFormSubmitted(true);
        },
        validateOnMount: true

    });

    const getAllSubLocationList = useCallback(debounce((placename: any) => {

        let subData = {
            "location": (addJobBoardFormik?.values?.location ? addJobBoardFormik?.values?.location : jobData?.location?.code ? jobData?.location?.code : "US"),
            "filterName": (placename ? placename : "")
        }
        ApiService.postWithData('admin', `getSublocation`, subData)
            .then((response) => {

                let tempData = response.data.idibu?.response?.locations?.location;
                let tempApplicantsList = [];
                for (let ap = 0; ap < tempData.length; ap++) {
                    tempApplicantsList.push(
                        {
                            place_name: tempData[ap].place_name,
                            country: tempData[ap].country,
                            state: tempData[ap].state,
                            id: tempData[ap].id,
                        }
                    )
                }
                console.log("Sublocation");
                console.log(tempApplicantsList);
                setSublocationList(tempApplicantsList);
            })
    }, 400),
        [addJobBoardFormik?.values?.location]
    );

    const convertDateFormat = (inputDate: string): string => {
        // Split the input date string into an array of [ month, day,year]
        const [month, day, year] = inputDate.split('/');

        // Return the date in the desired format: yyyy-mm-dd
        return `${year}-${month}-${day}`;
    };

    const checkBoardDetailsValues = () => {
        const condArr = ["", null, undefined];

        if (!!addJobBoardFormik.values?.boardDetails?.length) {
            return addJobBoardFormik.values?.boardDetails.every((each: any) => {
                let extrafieldsValid = each.extrafield.every((extrafield: any) => {
                    if (extrafield?.required) {
                        if (!condArr.includes(extrafield.value)) {
                            if (["doubleSelect"].includes(extrafield.type)) {
                                let valuesArr = extrafield?.value?.split(",");
                                const parentValue = (extrafield?.value && valuesArr) ? valuesArr.splice(0, 1)[0] : "";
                                const childValue = (extrafield?.value && valuesArr) ? valuesArr.join(",") : ""
                                if (condArr.includes(parentValue)) {
                                    showToaster(`${extrafield.description} Parent is required`, "error");
                                    return false;
                                }

                                if (condArr.includes(childValue)) {
                                    showToaster(`${extrafield.description} is required`, "error");
                                    return false;
                                }
                            }
                            return true;
                        }
                        else {
                            showToaster(`${extrafield.description} is required`, "error");
                            return false;
                        }
                    } else return true;
                })

                let durationValid = !condArr.includes(each?.duration[0]?.value) ? true : false;
                if (!durationValid) {
                    showToaster(`Duration is required`, "error")
                }

                return (extrafieldsValid && durationValid)
            })

        } else {
            showToaster('Please select at least one JobBoard', 'error');
            return false
        }
    }

    const saveForm = () => {

        setIsFormSubmitted(true);
        //   addJobBoardFormik.setValues("boardDetails", addBoardDynamicList[0]);
        // estStartDate: (addJobBoardFormik.values.startDate) ? DateTime.fromISO(new Date(addJobBoardFormik.values.startDate).toISOString()).toFormat('yyyy-MM-dd') : null,
        // estEndDate: (addJobBoardFormik.values.endDate) ? DateTime.fromISO(new Date(addJobBoardFormik.values.endDate).toISOString()).toFormat('yyyy-MM-dd') : null,
        if (checkAllValidations() && checkBoardDetailsValues()) {
            // const outStartDate = convertDateFormat(addJobBoardFormik.values.startdate);
            // const outPublishDate = convertDateFormat(addJobBoardFormik.values.publish);

            let jobPortalTemp = {
                "jobTitle": addJobBoardFormik.values.jobTitle,
                "reference": addJobBoardFormik.values.reference,
                "description": addJobBoardFormik.values.description,
                "categoryId": addJobBoardFormik.values.categoryId,
                "startdate": (addJobBoardFormik.values.startdate) ? DateTime.fromISO(new Date(addJobBoardFormik.values.startdate).toISOString()).toFormat('yyyy-MM-dd') : null,
                "totalDuration": addJobBoardFormik.values.totalDuration,
                "salarymin": addJobBoardFormik.values.salarymin,
                "salarymax": addJobBoardFormik.values.salarymax,
                "publish": (addJobBoardFormik.values.publish) ? DateTime.fromISO(new Date(addJobBoardFormik.values.publish).toISOString()).toFormat('yyyy-MM-dd') : null,
                "location": addJobBoardFormik.values.location,
                "sublocation": addJobBoardFormik.values.sublocation?.toString(),
                "senderId": addJobBoardFormik.values.senderId?.toString(),
                "salaryper": addJobBoardFormik.values.salaryper,
                "currency": addJobBoardFormik.values.currency,
                "jobtype": addJobBoardFormik.values.jobtype,
                "boardids": addJobBoardFormik.values.boardids,
                "boardDetails": addJobBoardFormik.values.boardDetails,
                "recrId": userLocalData.getvalue('recrId'),
                "clientId": userLocalData.getvalue('clientId'),
                "jobId": jobData?.jobId,
            }

            if (!add) {
                jobPortalTemp = Object.assign({}, jobPortalTemp, { ...jobPortalTemp, "method": "repost", "idibuJobId": jobData?.idibuJobId, })
            }

            console.log(jobPortalTemp);

            //  if (addJobBoardFormik.isValid) {

            trackPromise(
                ApiService.postWithData('admin', add ? 'postJobs' : "updatePostJobs", jobPortalTemp)
                    .then((response) => {

                        if (response?.data && response?.data?.Success) {
                            const newJobId = response.data.idibu.job.id;
                            showToaster
                                (`${addJobBoardFormik.values.jobTitle} - ${newJobId} - Post Job has been ${add ? "saved" : "updated"} successfully.`, 'success');
                            addJobBoardFormik.resetForm();
                            closePopup("add")
                        } else {
                            showToaster((response.data.Message) ? response.data.Message : 'An error occured', 'error')
                        }

                    }).catch((error) => {
                        showToaster(`Error in ${add ? "creating" : "updating"} Post Job: `, "error");
                        console.error(`Error in ${add ? "creating" : "updating"} Post Job: `, "error");
                    })
            )
            //  }
        }
    }
    const checkAllValidations = () => {

        if (addJobBoardFormik.values.jobTitle === "") {
            showToaster('Please enter Job Post Title', 'error');
            return false
        }
        else if (addJobBoardFormik.values.reference === "") {
            showToaster('Please enter reference', 'error');
            return false
        }
        else if (addJobBoardFormik.values.senderId === "") {
            showToaster('Please Enter Sender Name', 'error');
            return false
        }
        else if (!addJobBoardFormik.values.description) {
            showToaster('Please enter Description ', 'error');
            return false
        }

        else if (!addJobBoardFormik.values.categoryId || addJobBoardFormik.values.categoryId === "0") {
            showToaster('Please select Category(Sector)', 'error');
            return false
        }

        else if (!addJobBoardFormik.values.jobtype || addJobBoardFormik.values.jobtype === "0") {
            showToaster('Please select Job Type', 'error');
            return false
        }
        else if (addJobBoardFormik.values.totalDuration === "") {
            showToaster('Please enter Working Hours', 'error');
            return false
        }
        else if (!addJobBoardFormik.values.location || addJobBoardFormik.values.location === "0") {
            showToaster('Please select Location', 'error');
            return false
        }
        else if (!addJobBoardFormik.values.sublocation || addJobBoardFormik.values.sublocation === "0") {
            showToaster('Please select Sub Location', 'error');
            return false
        }
        else if (!addJobBoardFormik.values.startdate || addJobBoardFormik.values.startdate === "0") {
            showToaster('Please Enter Start Date', 'error');
            return false
        }
        else if (!addJobBoardFormik.values.publish || addJobBoardFormik.values.publish === "0") {
            showToaster('Please Enter Publish Date', 'error');
            return false
        }
        else if (!addJobBoardFormik.values.currency || addJobBoardFormik.values.currency === "0") {
            showToaster('Please Select Currency', 'error');
            return false
        }
        else if (addJobBoardFormik.values.salarymin === "") {
            showToaster('Please enter Minimum Salary', 'error');
            return false
        }
        else if (addJobBoardFormik.values.salarymax === "") {
            showToaster('Please enter Maximum Salary', 'error');
            return false
        }
        else if (Number(addJobBoardFormik.values.salarymin) >= Number(addJobBoardFormik.values.salarymax)) {
            showToaster('Minimum Salary should be less than Maximum Salary', 'error');
            return false;
        }
        else if (!addJobBoardFormik.values.salaryper || addJobBoardFormik.values.salaryper === "0") {
            showToaster('Please Enter Salary Per', 'error');
            return false
        }
        else if (!addJobBoardFormik.values.boardids || addJobBoardFormik.values.boardids.length === 0) {
            showToaster('Please select at least one JobBoard', 'error');
            return false
        }


        return true;
    }


    const handleBoardData = (boardData: any) => {
        console.log(boardData);
    }


    const handleJobBoardsChange = (e: any) => {
        const { value, checked, name } = e.target;
        console.log("Value - " + value + " , Checked - " + checked + " , Name - " + name);
        const tempJobBoardForm = [...subscribedJobBoards];

        let boardDetailsObj = {
            "boardId": "",
            "extrafield": [{ "name": "", "value": "", "description": "", "required": "", }],
            "duration": [{ "name": "", "value": "", }]
        };

        let tempBoardDetails: any = addJobBoardFormik.values.boardDetails;

        const tempIdx = tempJobBoardForm.findIndex((item: { id: any }) => parseInt(item.id) == parseInt(name));
        if (checked) {

            if (tempIdx !== -1) {
                tempJobBoardForm[tempIdx].checked = true;
            }

            addJobBoardFormik.setFieldValue("boardids", [...addJobBoardFormik.values.boardids, value]);
            tempBoardDetails = [...tempBoardDetails, { ...boardDetailsObj, boardId: value }]
            addJobBoardFormik.setFieldValue("boardDetails", [...tempBoardDetails])
        } else {
            tempJobBoardForm[tempIdx].checked = false;
            addJobBoardFormik.setFieldValue(
                "boardids",
                addJobBoardFormik.values.boardids.filter((v: any) => parseInt(v) !== parseInt(name))
            );
            tempBoardDetails = tempBoardDetails.filter((v: any) => v.boardId?.toString() !== name.toString());
            addJobBoardFormik.setFieldValue("boardDetails", [...tempBoardDetails])
        }
        setSubscribedJobBoards(tempJobBoardForm);
        console.log(addJobBoardFormik.values.boardids);
        //    handlePortalFiledsData(value, checked);
        //addJobBoardFormik.values.boardids
    };

    // const handlePortalFiledsData = (newValue: any, checked: boolean) => {

    //     console.log(" ===   -- " + checked + " -- " + newValue);
    //     let subData = { "boardId": (newValue ? newValue : "") }
    //     if (checked) {
    //         ApiService.postWithData('admin', `getBoardSpecificFields`, subData)
    //             .then((response: any) => {
    //                 let tempResponse = response.data?.idibu?.boards?.board;
    //                 setListJobPortals([...listJobPortals, tempResponse]);
    //                 if (tempResponse) {
    //                     //let arryBoard = temp1[0].boardDetails[si];

    //                     const tempIndex = addJobBoardFormik.values.boardDetails.findIndex((item: { portalId: any }) => parseInt(item.portalId) === parseInt(newValue));
    //                     console.log(" ===== " + tempIndex)
    //                     let tempExtraFeilds = tempResponse?.extrafields?.extrafield;
    //                     let tempExtra = [];
    //                     for (let tda = 0; tda < tempExtraFeilds?.length; tda++) {
    //                         const newExtra = {
    //                             name: tempExtraFeilds[tda].name,
    //                             description: tempExtraFeilds[tda].description,
    //                             value: "",
    //                             required: (tempExtraFeilds[tda].required) ? true : false,
    //                         }
    //                         console.log(newExtra);
    //                         tempExtra.push(newExtra);

    //                     } // for board


    //                     const newBoard = { id: tempResponse.id, name: tempResponse.name, field: tempExtra, duration: { name: "duration", value: "" } }
    //                     console.log(newBoard);
    //                     if (tempIndex !== -1) {
    //                     }
    //                     else {
    //                         addJobBoardFormik.setFieldValue(`boardDetails`, [...addJobBoardFormik.values.boardDetails, newBoard], true);
    //                     }
    //                 };
    //             } /// response
    //             )
    //     } else {   //// un checked

    //         const portIndex = listJobPortals.findIndex((item: { id: any }) => parseInt(item.id) === parseInt(newValue));
    //         if (portIndex !== -1) {
    //             console.log("portIndex - " + portIndex)
    //             let listJobPortalws = listJobPortals.filter((item: any) => item.id !== newValue);
    //             setListJobPortals(listJobPortalws);
    //         }
    //         const tempIndex = addJobBoardFormik.values.boardDetails.findIndex((item: { portalId: any }) => parseInt(item.portalId) === parseInt(newValue));
    //         if (tempIndex !== -1) {
    //             console.log("tempIndex - " + tempIndex)
    //             addJobBoardFormik.setFieldValue(
    //                 `boardDetails`,
    //                 addJobBoardFormik.values.boardDetails.filter((v: any) => v.portalId !== newValue)
    //             );
    //         }
    //     }

    //     console.log(listJobPortals)
    //     console.log(addJobBoardFormik.values.boardDetails)
    //     // SubscribeJobBoardFormik.values.field && SubscribeJobBoardFormik.values.field.length>0
    // }



    return (
        <Dialog
            maxWidth={'md'}
            // sx={{ width: 900, maxWidth: 900, minWidth: 900 }}
            fullWidth={true} open={open} id='AddJobPortalModal'
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
                        Post Job
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
                                onClick={() => closePopup("")}
                            >Cancel</Button>
                            {value !== 0 ? <Button variant="contained"
                                // className={`${value !== 0 ? '' : 'v-hidden'}`}
                                type='button'
                                color="primary"
                                onClick={saveForm}
                            // disabled={(!addJobBoardFormik.isValid || !addJobBoardFormik.values.primaryRecruiter)} //|| checkAssignWorkflowIsEnabled()
                            >{add ? "Save" : "Update"}</Button> : null}
                        </Grid>
                    </div>
                </Grid>
            </DialogTitle>
            <Divider />
            <DialogContent className='py-0'>
                <form
                    onSubmit={addJobBoardFormik.handleSubmit}
                >
                    <Grid className='customCard mt-2 mr-2  px-0 pb-0' sx={{ width: "850 !important", margin: "auto", bgcolor: '#ffffff', boxShadow: 'none !important' }}>
                        {/* <p>Received data from child: {receivedData}</p> */}
                        <CustomTabPanel value={value} index={0}>
                            <div className='jobPanelDiv  mr-2 '>
                                <Grid container spacing={1} >
                                    <Grid size={12} className='mt-1 pr-2   '>
                                        <b>Basic Information</b>
                                    </Grid>
                                    <Grid size={4} className='pr-2'>

                                        <TextField fullWidth className='mt-1'
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            label={
                                                <>
                                                    Job Title #
                                                    <span style={{ color: 'red' }}>*</span>
                                                </>
                                            }
                                            id="jobTitle"
                                            name="jobTitle"
                                            value={addJobBoardFormik.values.jobTitle}
                                            onChange={addJobBoardFormik.handleChange}
                                            disabled={add ? false : true}
                                        // title={roleData?.roleId ? "Role Name Can't be edited" : ""}
                                        />
                                        <ErrorMessage formikObj={addJobBoardFormik} name={'jobTitle'} isFormSubmitted={isFormSubmitted} />
                                    </Grid>
                                    <Grid size={4} className='pr-2'>
                                        <TextField
                                            type="text"
                                            id="reference" name='reference'
                                            size="small"
                                            label={
                                                <>
                                                    Reference #
                                                    <span style={{ color: 'red' }}>*</span>
                                                </>
                                            }
                                            variant="outlined"
                                            fullWidth
                                            value={addJobBoardFormik.values.reference}
                                            onChange={addJobBoardFormik.handleChange}
                                            disabled={add ? false : true}
                                        />
                                        <ErrorMessage formikObj={addJobBoardFormik} name={'reference'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                    </Grid>
                                    <Grid size={4} className='pr-2'>
                                        <TextField
                                            fullWidth
                                            id="senderId"
                                            name="senderId"
                                            size="small"
                                            variant="outlined"
                                            select
                                            value={addJobBoardFormik.values.senderId}
                                            onChange={addJobBoardFormik.handleChange}
                                            label={
                                                <Fragment>
                                                    Sender Id (User)
                                                    <span style={{ color: 'red' }}>*</span>
                                                </Fragment>
                                            }
                                            disabled={add ? false : true}
                                        >
                                            <MenuItem value=""></MenuItem>
                                            {listSenderId && listSenderId.map((sector: any, index: number) => (
                                                <MenuItem key={index} value={sector.idibuId}>{sector?.email} ({sector.idibuId})</MenuItem>
                                            ))}


                                        </TextField>
                                        <ErrorMessage formikObj={addJobBoardFormik} name={'senderId'} isFormSubmitted={isFormSubmitted}></ErrorMessage>

                                    </Grid>
                                    <Grid size={12} className='pr-2'>
                                        <label className="inputLabel">Job Description <span style={{ color: 'red' }}>*</span></label>
                                        <div>
                                            <Editor
                                                toolbarId='description'
                                                placeholder='Description'
                                                id='description'
                                                handleChange={(e: any) => {
                                                    addJobBoardFormik.setFieldValue('description', e);
                                                }}
                                                editorHtml={addJobBoardFormik.values.description}
                                                mentions={false}
                                                saveTemplate={false}
                                            />
                                        </div>

                                        {/* <TextField
                                            fullWidth
                                            id="description"
                                            name="description"
                                            size="small"
                                            variant="outlined"
                                            multiline
                                            value={addJobBoardFormik.values.description}
                                            onChange={addJobBoardFormik.handleChange}
                                            label={
                                                <Fragment>
                                                    Description  
                                                    <span style={{ color: 'red' }}>*</span>
                                                </Fragment>
                                            }
                                        />   */}
                                        <ErrorMessage formikObj={addJobBoardFormik} name={'description'} isFormSubmitted={isFormSubmitted}></ErrorMessage>

                                    </Grid>
                                    <Grid size={3} className='pr-2'>
                                        <TextField
                                            fullWidth
                                            id="categoryId"
                                            name="categoryId"
                                            size="small"
                                            variant="outlined"
                                            select
                                            value={addJobBoardFormik.values.categoryId}
                                            onChange={addJobBoardFormik.handleChange}
                                            label={
                                                <Fragment>
                                                    Category (Sector)
                                                    <span style={{ color: 'red' }}>*</span>
                                                </Fragment>
                                            }
                                        >
                                            <MenuItem value=""></MenuItem>
                                            {JobSector_Category && JobSector_Category.sort((a, b) => a.label.localeCompare(b.label)).map((sector: any, index: number) => (
                                                <MenuItem key={index} value={sector.id}>{sector.label}</MenuItem>
                                            ))}


                                        </TextField>
                                        <ErrorMessage formikObj={addJobBoardFormik} name={'categoryId'} isFormSubmitted={isFormSubmitted}></ErrorMessage>

                                    </Grid>
                                    <Grid size={3} className='pr-2'>

                                        <TextField
                                            fullWidth
                                            size="small"
                                            id="jobtype"
                                            name="jobtype"
                                            value={addJobBoardFormik.values.jobtype}
                                            onChange={addJobBoardFormik.handleChange}
                                            select
                                            label={
                                                <Fragment>
                                                    Job Type
                                                    <span style={{ color: 'red' }}>*</span>
                                                </Fragment>
                                            }
                                        >
                                            <MenuItem value=""></MenuItem>
                                            <MenuItem value="1">Contract</MenuItem>
                                            <MenuItem value="2">Permanent</MenuItem>
                                            {/* <MenuItem value="3">Contract</MenuItem> */}
                                            <MenuItem value="4">Temporary</MenuItem>
                                        </TextField>
                                        <ErrorMessage formikObj={addJobBoardFormik} name={'jobtype'} isFormSubmitted={isFormSubmitted}></ErrorMessage>

                                    </Grid>
                                    <Grid size={3} className='pr-2'>

                                        <TextField
                                            fullWidth
                                            size="small"
                                            id="totalDuration"
                                            name="totalDuration"
                                            value={addJobBoardFormik.values.totalDuration}
                                            onChange={addJobBoardFormik.handleChange}
                                            select
                                            label={
                                                <Fragment>
                                                    Working hours
                                                    <span style={{ color: 'red' }}>*</span>
                                                </Fragment>
                                            }
                                        >
                                            <MenuItem value=""></MenuItem>
                                            <MenuItem value="1">Full-time</MenuItem>
                                            <MenuItem value="2">Part-time</MenuItem>
                                        </TextField>
                                        <ErrorMessage formikObj={addJobBoardFormik} name={'totalDuration'} isFormSubmitted={isFormSubmitted}></ErrorMessage>

                                    </Grid>
                                    <Grid size={3} className='pr-2'>
                                        <TextField fullWidth
                                            label={
                                                <Fragment>
                                                    Country :
                                                    <span style={{ color: 'red' }}>*</span>
                                                </Fragment>
                                            }
                                            id="location"
                                            name='location'
                                            size="small"
                                            variant="outlined"
                                            select
                                            value={addJobBoardFormik.values.location}
                                            onChange={(event) => {
                                                const description = event.target.value; //.split('\n');
                                                addJobBoardFormik.setFieldValue('location', description);
                                                setJobLocation(description);
                                                // getAllSubLocationList('');
                                            }}
                                        >
                                            <MenuItem value=""></MenuItem>
                                            {Job_CountryShortCode && Job_CountryShortCode.map((sector: any, index: number) => (
                                                <MenuItem key={index} value={sector.id}>{sector.label}</MenuItem>
                                            ))}

                                        </TextField>
                                        <ErrorMessage formikObj={addJobBoardFormik} name={'location'} isFormSubmitted={isFormSubmitted}></ErrorMessage>

                                    </Grid>
                                    <Grid size={4} className='pr-2'>

                                        <Autocomplete
                                            value={addJobBoardFormik?.values?.sublocation || ""}
                                            onChange={(_: SyntheticEvent, newValue: string | null) =>
                                                addJobBoardFormik.setFieldValue("sublocation", newValue)
                                            }
                                            onKeyUp={(e: any) => getAllSubLocationList(e.target.value)}
                                            options={sublocationList?.map((p: any) => p.id) ?? []}
                                            getOptionLabel={(option: string) => {
                                                return (
                                                    (sublocationList.find((p: any) => p.id === option)?.place_name ?? "") + " - " + (sublocationList.find((p: any) => p.id === option)?.state ?? "") + " - " + (sublocationList.find((p: any) => p.id === option)?.country ?? "")
                                                );
                                            }}
                                            sx={{
                                                "& .MuiAutocomplete-popupIndicator": {
                                                    transform: "unset",
                                                    color: "#737373",
                                                    '& .MuiTouchRipple-root': {
                                                        display: 'none',
                                                    },
                                                    '&:hover': {
                                                        backgroundColor: '#ffffff'
                                                    }
                                                },
                                                '& .MuiOutlinedInput-root': {
                                                    p: 0
                                                },
                                                '& .MuiAutocomplete-clearIndicator': {
                                                    color: '#919191',
                                                    height: '8px',
                                                    width: '8px',
                                                    mr: 1,
                                                    '&:hover': {
                                                        backgroundColor: '#ffffff'
                                                    }
                                                },
                                                // width: "40%"
                                            }}
                                            renderInput={(params) => (
                                                <TextField {...params} sx={{
                                                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                                        color: '#1A1A1A',
                                                        fontSize: '14px',
                                                        fontFamily: 'Segoe UI',
                                                        minWidth: '60px',
                                                        paddingLeft: '24px',
                                                    },
                                                    '& .MuiInputBase-input::placeholder': {
                                                        color: '#737373',
                                                        fontSize: '14px',
                                                        // fontWeight: 600,
                                                        fontFamily: 'Segoe UI',
                                                        opacity: 1,
                                                    },
                                                    '& .MuiAutocomplete-hasPopupIcon.MuiAutocomplete-root.MuiOutlinedInput-root': {
                                                        p: '1px '
                                                    },
                                                    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: 'var(--c-primary-color)',
                                                    },
                                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: 'var(--c-primary-color)',
                                                        borderWidth: '1px'
                                                    },
                                                }}
                                                    placeholder="Sub Location" id="" />
                                            )}
                                        />
                                        {/* 
                                        <Autocomplete
                                            id="sublocation"
                                            size="small"
                                            value={addJobBoardFormik.values.sublocation}
                                            options={sublocationList && sublocationList.map((option: any) => option.place_name)}

                                            freeSolo
                                            renderTags={(value: readonly string[], getTagProps) =>
                                                value.map((option: any, index: number) => (
                                                    <Chip variant="outlined" label={option.place_name +" -> "+option.state +" -> "+option.country} {...getTagProps({ index })} />
                                                ))
                                            }
                                            onKeyUp={(e: any) => getAllSubLocationList(e.target.value)}
                                            onChange={(e: object, value: any | null) => {

                                                addJobBoardFormik.setFieldValue("sublocation", value);
                                            }}
                                            sx={{

                                                height: "20px",
                                                "& .MuiOutlinedInput-root": {
                                                    p: 0,
                                                },
                                                "& .MuiAutocomplete-popupIndicator": {
                                                    transform: "unset",
                                                    color: "#737373",
                                                    "& .MuiTouchRipple-root": {
                                                        display: "none",
                                                    },
                                                    "&:hover": {
                                                        backgroundColor: "#ffffff",
                                                    },
                                                },
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant="outlined"
                                                    size="small"
                                                />
                                            )}
                                        /> */}

                                        {/* <TextField fullWidth
                                            label={
                                                <Fragment>
                                                    Location :
                                                    <span style={{ color: 'red' }}>*</span>
                                                </Fragment>
                                            }
                                            id="sublocation"
                                            name='sublocation'
                                            size="small"
                                            variant="outlined"
                                            select
                                            value={addJobBoardFormik.values.sublocation}
                                            onChange={addJobBoardFormik.handleChange} >
                                            <MenuItem value="">--Select State--</MenuItem>
                                            {
                                                [...masterStatesList].map((state) => {
                                                    return <MenuItem key={state.id} value={state.id}>{state.label}</MenuItem>
                                                })
                                            }
                                        </TextField> */}
                                        <ErrorMessage formikObj={addJobBoardFormik} name={'sublocation'} isFormSubmitted={isFormSubmitted}></ErrorMessage>

                                    </Grid>
                                    <Grid size={4} className='pr-2'>

                                        <LocalizationProvider dateAdapter={AdapterLuxon} >
                                            <DatePicker
                                                label={
                                                    <Fragment>
                                                        Start Date
                                                        <span style={{ color: 'red' }}>*</span>
                                                    </Fragment>
                                                }
                                                slotProps={{ textField: { size: 'small' } }}
                                                sx={{ width: '100%' }}
                                                onChange={(date: any) => addJobBoardFormik.setFieldValue("startdate", (date) ? date?.toFormat('MM/dd/yyyy') : null, true)}
                                                value={(addJobBoardFormik.values.startdate) ? DateTime.fromFormat(addJobBoardFormik.values.startdate, 'MM/dd/yyyy') : null}
                                            />
                                        </LocalizationProvider>
                                        <ErrorMessage formikObj={addJobBoardFormik} name={'startdate'} isFormSubmitted={isFormSubmitted}></ErrorMessage>

                                    </Grid>
                                    <Grid size={4} className='pr-2'>
                                        <LocalizationProvider dateAdapter={AdapterLuxon} >
                                            <DatePicker
                                                label={
                                                    <Fragment>
                                                        Publish Date
                                                        <span style={{ color: 'red' }}>*</span>
                                                    </Fragment>
                                                }

                                                slotProps={{ textField: { size: 'small' } }}
                                                sx={{ width: '100%' }}
                                                onChange={(date: any) => addJobBoardFormik.setFieldValue("publish", (date) ? date?.toFormat('MM/dd/yyyy') : null, true)}
                                                value={(addJobBoardFormik.values.publish) ? DateTime.fromFormat(addJobBoardFormik.values.publish, 'MM/dd/yyyy') : null}
                                            />
                                        </LocalizationProvider>
                                        <ErrorMessage formikObj={addJobBoardFormik} name={'publish'} isFormSubmitted={isFormSubmitted}></ErrorMessage>

                                    </Grid>
                                    <Grid size={3} className='mt-2 pr-2'>

                                        <TextField
                                            fullWidth
                                            size="small"
                                            id="currency"
                                            name="currency"
                                            value={addJobBoardFormik.values.currency}
                                            onChange={addJobBoardFormik.handleChange}
                                            select
                                            label={
                                                <Fragment>
                                                    Currency
                                                    <span style={{ color: 'red' }}>*</span>
                                                </Fragment>
                                            }
                                        >
                                            <MenuItem value=""></MenuItem>
                                            <MenuItem value="AUD">AUD (Australian Dollar)</MenuItem>
                                            <MenuItem value="EU">EUR (Euro)</MenuItem>
                                            <MenuItem value="GBP">GBP (British Pound)</MenuItem>
                                            <MenuItem value="NZD">NZD (New Zealand Dollar)</MenuItem>
                                            <MenuItem value="USD">USD (U.S. Dollar)</MenuItem>
                                        </TextField>
                                        <ErrorMessage formikObj={addJobBoardFormik} name={'currency'} isFormSubmitted={isFormSubmitted}></ErrorMessage>

                                    </Grid>
                                    <Grid size={3} className='mt-2 pr-2'>
                                        <TextField
                                            label={
                                                <Fragment>
                                                    Salary Min
                                                    <span style={{ color: 'red' }}>*</span>
                                                </Fragment>
                                            }
                                            size="small"
                                            fullWidth
                                            id="salarymin"
                                            name='salarymin'
                                            value={addJobBoardFormik.values.salarymin}
                                            onChange={addJobBoardFormik.handleChange}
                                            onBlur={() => {

                                                const min = Number(addJobBoardFormik.values.salarymin);
                                                const max = Number(addJobBoardFormik.values.salarymax);
                                                if (min && max && min >= max) {
                                                    addJobBoardFormik.setFieldError('salarymin', "Minimum Salary should be less than Maximum");
                                                } else {
                                                    addJobBoardFormik.setFieldError('salarymin', '');
                                                }
                                            }}
                                            type="number"


                                        />
                                        <ErrorMessage formikObj={addJobBoardFormik} name={'salarymin'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                    </Grid>
                                    <Grid size={3} className='mt-2 pr-2'>
                                        <TextField
                                            label={
                                                <Fragment>
                                                    Salary Max
                                                    <span style={{ color: 'red' }}>*</span>
                                                </Fragment>
                                            }
                                            size="small"
                                            fullWidth
                                            id="salarymax"
                                            name='salarymax'
                                            value={addJobBoardFormik.values.salarymax}
                                            onChange={addJobBoardFormik.handleChange}
                                            onBlur={() => {

                                                const min = Number(addJobBoardFormik.values.salarymin);
                                                const max = Number(addJobBoardFormik.values.salarymax);
                                                if (max && min && max < min) {
                                                    addJobBoardFormik.setFieldError('salarymax', "Maximum Salary should be greater than Minimum");
                                                } else {
                                                    addJobBoardFormik.setFieldError('salarymax', '');
                                                }
                                            }}
                                            type="number"

                                        />
                                        <ErrorMessage formikObj={addJobBoardFormik} name={'salarymax'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                                    </Grid>
                                    <Grid size={3} className='mt-2 pr-2'>

                                        <TextField
                                            fullWidth
                                            size="small"
                                            id="salaryper"
                                            name="salaryper"
                                            value={addJobBoardFormik.values.salaryper}
                                            onChange={addJobBoardFormik.handleChange}
                                            select
                                            label={
                                                <Fragment>
                                                    Salaray Per
                                                    <span style={{ color: 'red' }}>*</span>
                                                </Fragment>
                                            }
                                        >
                                            <MenuItem value=""></MenuItem>
                                            <MenuItem value="annum">Annum</MenuItem>
                                            <MenuItem value="month">Month</MenuItem>
                                            <MenuItem value="week">Week</MenuItem>
                                            <MenuItem value="day">Day</MenuItem>
                                            <MenuItem value="hour">Hour</MenuItem>
                                        </TextField>
                                        <ErrorMessage formikObj={addJobBoardFormik} name={'salaryper'} isFormSubmitted={isFormSubmitted}></ErrorMessage>

                                    </Grid>
                                    <Grid size={12} className='mt-1 pr-2'>
                                        <b>Job Board Information</b>
                                    </Grid>
                                    <Grid size={12} className='ml-4 mt-2 pr-2'>
                                        <Grid container spacing={2}>
                                            {subscribedJobBoards && subscribedJobBoards.map((jobBoard: any, index: number) => {
                                                return <Grid size={4} key={index}>
                                                    <FormControlLabel
                                                        control={<Checkbox checked={jobBoard.checked} value={jobBoard.id} name={jobBoard.id} onChange={handleJobBoardsChange} />}
                                                        label={jobBoard.name}
                                                        labelPlacement="end"
                                                    />
                                                </Grid>
                                            })}
                                        </Grid>
                                    </Grid>

                                </Grid>
                            </div>
                        </CustomTabPanel>


                        <CustomTabPanel value={value} index={1}>
                            <div className='jobPanelDiv'>
                                <Grid container spacing={2} >
                                    <Grid size={12} className='mt-1 pr-2'>

                                        {addJobBoardFormik.values.boardids && addJobBoardFormik.values.boardids.length > 0 ?
                                            <Grid container direction="row"
                                                justifyContent="flex-start"
                                                alignItems="flex-start"
                                                sx={{ width: "100%" }}
                                            >
                                                {
                                                    addJobBoardFormik.values.boardids.map((setting: any, si) => (
                                                        <Grid size={12} key={setting} >
                                                            <JobBoardData
                                                                boardId={setting}
                                                                boardData={handleBoardData}
                                                                sendData={handleReceiveData}
                                                                jobBoardsExistingData={jobData?.jobBoardsExistingData?.find((each: any) => each?.id?.toString() === setting?.toString()) || {}}
                                                            />
                                                        </Grid>
                                                    ))
                                                }
                                            </Grid>
                                            :
                                            null
                                        }
                                    </Grid>

                                </Grid>
                            </div>
                        </CustomTabPanel>


                    </Grid>
                </form >
            </DialogContent >
            <Divider />
            <DialogActions>
                <Grid
                    container
                    direction="row"
                    //  justifyContent={`${(value === 0) ? 'flex-end' : (value === 7) ? 'flex-start' : 'space-between'}`}
                    // sx={{ minHeight: 'auto !important' }}
                    alignItems="center"
                    className="px-4"
                    sx={{
                        display: 'flex',
                        justifyContent: value === 1 ? 'flex-start' : 'flex-end',
                    }}
                >
                    {value === 1 ? <Button type="button" color="secondary" onClick={() => setValue(value - 1)} size="medium" variant="outlined">
                        <ArrowBackIosNewIcon
                            sx={{
                                fontSize: "14px",
                                paddingRight: "2px",
                            }}
                        />
                        Back
                    </Button> : null}

                    {value === 0 ? <Button type="button" color="primary" onClick={() => updateBoardDetails("e", value + 1)} size="medium" variant="contained">

                        Continue
                        <ArrowForwardIosIcon
                            sx={{
                                fontSize: "14px",
                                paddingLeft: "2px",
                            }}
                        />
                    </Button> : null}
                </Grid>
            </DialogActions>
        </Dialog >

    );
}
export default AddJobPortal;
