import { React, useMemo, useRef, useState, useEffect } from "../../../../shared/modules/React";
import { useSearchParams, Link, useParams, useLocation } from "react-router-dom";
import {
	MaterialReactTable,
	type MRT_ColumnDef,
	type MRT_SortingState,
} from "../../../../shared/modules/MaterialReactTable";
import { v4 as uuidv4 } from "uuid";

import { DateTime } from "../../../../shared/modules/Luxon";
import { trackPromise } from "../../../../shared/modules/PromiseTrackter";
import ApiService from "../../../../shared/api/api";
import CustomPagination from "../../../shared/CustomPagination/CustomPagination";

import { Box } from "../../../../shared/modules/MaterialImports/Box";
import { Grid, Button, IconButton, FormControl } from "../../../../shared/modules/commonImports";
import { Menu, MenuItem } from "../../../../shared/modules/MaterialImports/Menu";
import { Stack } from "../../../../shared/modules/MaterialImports/Stack";
import { Checkbox, Select } from "../../../../shared/modules/MaterialImports/FormElements";
import { Typography } from "../../../../shared/modules/MaterialImports/Typography";
import { ButtonGroup } from "../../../../shared/modules/MaterialImports/ButtonGroup";
import { Popover } from "../../../../shared/modules/MaterialImports/Popover";
import { Tooltip } from "../../../../shared/modules/MaterialImports/ToolTip";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";

// import TextareaAutosize from "@mui/material/TextareaAutosize";
// import TextField from "@mui/material/TextField";
// import Toolbar from "@mui/material/Toolbar";

// import { useFormik } from "formik";
// import * as Yup from "yup";

//import { useState } from "react";
//import { DataGrid, GridColDef } from "@mui/x-data-grid";

// import AppBar from "@mui/material/AppBar"
// import Avatar from "@mui/material/Avatar"
// import Dialog from "@mui/material/Dialog"
// import FormControlLabel from "@mui/material/FormControlLabel"
// import FormLabel from "@mui/material/FormLabel"

// styled,
// import Tab from "@mui/material/Tab";
// import TabContext from "@mui/lab/TabContext";
// import TabList from "@mui/lab/TabList";
// import TabPanel from "@mui/lab/TabPanel";
// import Slide from '@mui/material/Slide';
// import { TransitionProps } from '@mui/material/transitions';
// import CloseIcon from '@mui/icons-material/Close';
// import { Divider } from "@mui/material";

import updateDocumentTitle from "../../../../shared/services/title";
import "./FindContacts.scss";
import ContactFilters from "./ContactFilters"; // , { searchData }
import { showToaster } from "../../../shared/SnackBar/SnackBar";
// import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
// import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SwitchLeftIcon from "@mui/icons-material/SwitchLeft";
import AddContacts from "../Add/AddContacts";
// import { globalData } from "../../../../shared/services/globalData";

import TuneIcon from "@mui/icons-material/Tune";
import { userLocalData } from "../../../../shared/services/userData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { confirmDialog } from "../../../shared/ConfirmDialog/ConfirmDialog";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import QuestionMarkRoundedIcon from "@mui/icons-material/QuestionMarkRounded";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import USPhoneFormat from "../../../../shared/utils/USPhoneFormat";
import EmailDialogBox from "../../../shared/EmailDialogBox/EmailDialogBox";
import PhoneDialog from "../../../shared/PhoneDialog/PhoneDialog";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import SouthRoundedIcon from "@mui/icons-material/SouthRounded";
import MenuIcon from "@mui/icons-material/Menu";
// import masterStatesList from "../../../../shared/data/States";
import getStateById from "../../../../shared/utils/StateName";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { MUIAutoComplete } from "../../../shared/MUIAutoComplete/MUIAutoComplete";
// import Sequence from "../../Job/View/Sourced/PopUps/Sequence/Sequence";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
// import ListIcon from '@mui/icons-material/List';
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import MergeContacts from "./MergeContact";

import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

import Copy from "../../../../shared/utils/Copy";
import { NavigateNextOutlined } from "@mui/icons-material";
import {
	ID_ATS_AVIONTEAPI,
	ID_ATS_BULLHORN,
	ID_ATS_JOBDIVA,
} from "../../../../shared/services/Permissions/IDs";

import LinkedInIcon from "@mui/icons-material/LinkedIn";
import IsValidUrl from "../../../../shared/utils/IsValidUrl";
import AddCompanyToModal from "./AddCompanyToModal/AddCompanyToModal";
import { OpenErrorModal } from "../../../shared/ErrorModal/ErrorModal";
import JobDivaLink from "../../../../shared/services/JobDivaLink";
import Mask from "../../../../shared/utils/Mask";
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

// const Transition = React.forwardRef(function Transition(
//     props: TransitionProps & {
//         children: React.ReactElement;
//     },
//     ref: React.Ref<unknown>,
// ) {
//     return <Slide direction="left" ref={ref} {...props} />;
// });
// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//     '& .MuiDialogContent-root': {
//         padding: theme.spacing(2),

//     },
//     '& .MuiDialogActions-root': {
//         padding: theme.spacing(1),
//     },
// }));

export interface DialogTitleProps {
	id: string;
	children?: React.ReactNode;
	onClose: () => void;
}
interface Candidate {
	jobId: number;
	firstName?: string;
	lastName?: string;
	[key: string]: any;
}

// function BootstrapDialogTitle(props: DialogTitleProps) {
//     const { children, onClose, ...other } = props;

//     return (
//         <DialogTitle sx={{ m: 0, p: 2, width: 450 }} {...other}>
//             {children}
//             {onClose ? (
//                 <IconButton
//                     aria-label="close"
//                     onClick={onClose}
//                     sx={{
//                         position: 'absolute',
//                         right: 8,
//                         top: 8,
//                         color: (theme) => theme.palette.grey[500],

//                     }}
//                 >
//                     <CloseIcon />
//                 </IconButton>
//             ) : null}
//         </DialogTitle>
//     );
// }

const FindContacts = () => {
	const params = useParams();
	const location = useLocation();

	//const isCareerPortalEnabled = userLocalData.adminSettings(20005);
	// const isHiringWorkFlowEnabled = userLocalData.adminSettings(20027);
	// const isSovrenEnabled = userLocalData.adminSettings(20048);
	const isQuickActionEnabled = userLocalData.adminSettings(20053);
	const isCampaignsEnabled = userLocalData.adminSettings(20024);
	const isEmailSMSSettingEnabled = userLocalData.checkIntegration(40005);
	const isBulkEmailSettingEnabled =
		userLocalData.checkIntegration(40005) && userLocalData.checkIntegration(400020);

	const [addCompanyToModal, setAddCompanyToModal] = useState(false);

	const columnVisibility = {
		name: true,
		jobTitle: true,
		city: true,
		Actions: isQuickActionEnabled,
		jobdivaId: userLocalData.adminSettings(20047),
		bulhornId: userLocalData.adminSettings(20043),
		aviontId: userLocalData.adminSettings(20045),
	};

	// const [open, setOpen] = React.useState(false);
	const [openAddContactModal, setOpenAddContactModal] = useState(false);
	const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
	const [TableMailOpen, setTableOpenMail] = useState<null | HTMLElement>(null);
	const [callAnchorElement, setCallAnchorElement] = useState<null | HTMLElement>(null);
	const [phoneOnClicked, setPhoneOnClicked] = useState("");
	const [dialogStatus, setDialogStatus] = useState(false);
	const openTableMail = Boolean(TableMailOpen);
	const openCallMenu = Boolean(callAnchorElement);
	const [emailOnClicked, setEmailOnClicked] = useState("");
	const [dialogPhoneStatus, setDialogPhoneStatus] = useState(false);
	const [dataLoading, setDataLoading] = useState(false);
	const [rowCount, setRowCount] = useState(0);
	const [totalCount, setTotalCount] = useState(0);
	// const [sorting, setSorting] = useState<MRT_SortingState>([]);
	const [checkedCounts, setCheckedCount] = useState(0);
	const [rowPageIndex, setRowPageIndex] = useState(0);
	// const [sortColumn, setSortColumn] = useState("Date");
	// const [sortType, setSortType] = useState("desc");
	const [sortAnchorEl, setSortAnchorEl] = React.useState<HTMLButtonElement | null>(null);
	const currentSelectCount = useRef(0);
	const [addEmail, setAddEmail] = useState(false);
	const [addtolistanchorEl, setAddToListAnchorEl] = useState<null | HTMLElement>(null);
	const openAddToListenBtn = Boolean(addtolistanchorEl);
	const [selectCandidList, setSelectCandidList] = useState<any>([]);

	const [addtosequencelistanchorEl, setAddToSequenceListAnchorEl] = useState<null | HTMLElement>(
		null
	);
	const openAddToSequenceListenBtn = Boolean(addtosequencelistanchorEl);
	const [selectSequenceList, setSelectSequenceList] = useState<any>([]);
	const [openSequenceModal, setOpenSequenceModal] = useState(false);
	const [selectedList, setSelectedList] = useState({
		id: "",
		name: "",
	});
	const [selectedSequence, setSelectedSequence] = useState({
		id: "",
		name: "",
	});
	const [selectedPage, setSelectedPage] = useState(false);
	const [selectedPageCount, setSelectedPageCount] = useState(0);
	const initialRender = useRef(true);
	const [searchParams, setSearchParams] = useSearchParams();
	const filtersSearchId = useRef(
		searchParams.get("id") ? (searchParams.get("id") as string) : ""
	);
	// console.log(filtersSearchId.current)
	const filtersSearchData = useRef({
		total: 0,
		filter: {
			fname: "",
			lname: "",
			email: "",
		},
		data: [],
		sort: {
			column: "Date",
			type: "desc",
		},
	});

	const listTitle: string = params?.listId
		? location?.state?.title
			? location.state.title
			: localStorage.getItem("listTitle_" + params?.listId)
			? (localStorage.getItem("listTitle_" + params?.listId) as string)
			: ""
		: "";

	const isFirstTimeLoad = useRef(false);
	useEffect(() => {
		if (!searchParams.get("id")) {
			let v4Id = uuidv4();
			setSearchParams({ id: v4Id }, { state: location.state });
			filtersSearchId.current = v4Id;
		} else {
			filtersSearchId.current = searchParams.get("id") as string;
			if (sessionStorage.getItem("contacts_" + filtersSearchId.current)) {
				filtersSearchData.current = JSON.parse(
					sessionStorage.getItem("contacts_" + filtersSearchId.current) as string
				);
				isFirstTimeLoad.current = true;
			}
		}

		if (params?.listId) {
			localStorage.setItem("listTitle_" + params?.listId, listTitle);
		}
	}, []);
	const filtersDataFromSession = sessionStorage.getItem("contacts_" + filtersSearchId.current)
		? JSON.parse(sessionStorage.getItem("contacts_" + filtersSearchId.current) as string)
				?.filters
		: {
				fname: "",
				lname: "",
				email: "",
		  };
	const [pagination, setPagination] = useState({
		pageIndex: sessionStorage.getItem("contacts_" + filtersSearchId.current)
			? (JSON.parse(sessionStorage.getItem("contacts_" + filtersSearchId.current) as string)
					?.page as string)
				? Number(
						JSON.parse(
							sessionStorage.getItem("contacts_" + filtersSearchId.current) as string
						)?.page as string
				  )
				: 0
			: 0,
		pageSize: 25,
	});

	const sortDataFromSession: { column: string; type: string } = sessionStorage.getItem(
		"contacts_" + filtersSearchId.current
	)
		? (JSON.parse(sessionStorage.getItem("contacts_" + filtersSearchId.current) as string)
				?.sort as { column: string; type: string })
		: {
				column: "",
				type: "",
		  };
	const [sortColumn, setSortColumn] = useState(
		sortDataFromSession?.column ? sortDataFromSession?.column : "Date"
	);
	const [sortType, setSortType] = useState(
		sortDataFromSession?.type ? sortDataFromSession?.type : "desc"
	);

	const addToList = (id: string, name: string) => {
		if (Object.keys(rowSelection).length) {
			if (name && name.trim() && id) {
				handleProfileMenuClose();
				const saveData = {
					listId: id,
					listName: name,
					contIds: Object.keys(rowSelection).join(),
					recrId: userLocalData.getvalue("recrId"),
					clientId: userLocalData.getvalue("clientId"),
				};

				trackPromise(
					// http://35.155.202.216:8080/QADemoCurately/saveListContacts
					ApiService.postWithData("admin", "saveListContacts", saveData).then(
						(response: any) => {
							// console.log(response)
							setSelectedList({ id: "", name: "" });
							if (response.data.Success) {
								showToaster("List Added Successfully", "success");
								handleProfileMenuClose();
								setRowSelection({});
								saveAuditLog(4143);
							} else if (response.data.Message.includes("already assigned")) {
								showToaster(
									"This List is already assigned to this Contact.",
									"error"
								);
							} else {
								showToaster(
									response.data.Message
										? response.data.Message
										: "An error occured while adding Tag",
									"error"
								);
							}
						}
					)
				);
			}
		} else {
			showToaster("Please select Canidate to add to List", "error");
		}
	};

	const handleProfileMenuClose = () => {
		setAddToListAnchorEl(null);
		setAddToSequenceListAnchorEl(null);
	};

	const handleClickAddToListen = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAddToListAnchorEl(event.currentTarget);
	};

	const searchData = useRef({
		fname: filtersDataFromSession?.fname ? filtersDataFromSession?.fname : "",
		lname: filtersDataFromSession?.lname ? filtersDataFromSession?.lname : "",
		email: filtersDataFromSession?.email ? filtersDataFromSession?.email : "",
	});

	const handleSortClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setSortAnchorEl(event.currentTarget);
	};

	const handleSortClose = () => {
		setSortAnchorEl(null);
		saveAuditLog(4153);
	};
	// const [pagination, setPagination] = useState({
	//     pageIndex: 0,
	//     pageSize: 25, //customize the default page size
	// });
	const sortOpen = Boolean(sortAnchorEl);
	const sortId = sortOpen ? "simple-popover" : undefined;
	const [openMergeFields, setOpenMergeFields] = useState(false);
	const [selectedEmail, setSelectedEmail] = useState("");
	const [selectedName, setSelectedName] = useState("");
	const [isBulkEmail, setIsBulkEmail] = useState(false);
	const [menuData, setMenuData] = useState({
		rowId: "",
		contEmail: "",
		first: "",
		candId: "",
		jobId: "",
		mobile: "",
		name: "",
		jobTitle: "",
		city: "",
		modifyDate: "",
	});
	const [contactsToMerge, seContactsToMerge] = useState({
		contactIdA: "",
		contactNameA: "",
		contactIdB: "",
		contactNameB: "",
	});

	const [editContactData, setEditContactData] = useState({
		contId: 0,
		firstName: "",
		lastName: "",
		contEmail: "",
		contEmail2: "",
		mobile: "",
		directPhone: "",
		compid: 0,
		linkedIn: "",
		jobTitle: "",
		department: "",
		pipelineStatus: 0,
		nle: false,
		street: "",
		city: "",
		state: "",
		stateName: "",
		country: "",
		zipcode: "",
		createdBy: userLocalData.getvalue("recrId"),
		createdDate: "",
		modifyBy: userLocalData.getvalue("recrId"),
		modifyDate: "",
		isdelete: false,
	});
	const handleTableMail = (event: React.MouseEvent<HTMLButtonElement>, mailId: any) => {
		//  const filterMailId = filterLocalData.filter((item: any) => item.person_id === mailId)
		if (mailId) {
			setTableOpenMail(event.currentTarget);
			setSelectedRowId(mailId);
			setCallAnchorElement(null);
			// console.log(
			// "aa",
			//     event.currentTarget,
			//     "---" + mailId,
			//     " === " + openTableMail
			// );
		}
	};
	const handleTableCall = (event: React.MouseEvent<HTMLButtonElement>, callId: any) => {
		// const filterCallId = filterLocalData.filter((item: any) => item.person_id === callId)
		// console.log("filterCallId", callId);
		if (callId) {
			setTableOpenMail(null);
			setCallAnchorElement(event.currentTarget);
			setSelectedRowId(callId);
		}
	};
	// const handleClickOpen = (values: any) => {
	//   console.log(values);
	//   setSelectedValue(values)
	//   setOpen(true);
	// };

	const handleTableClose = () => {
		setTableOpenMail(null);
		setCallAnchorElement(null);
	};
	// const handleShowCallSnack = (callId: any) => {
	//     setCallAnchorElement(null);
	// };
	// const handleShowSnack = (snackId: any) => {
	//     setTableOpenMail(null);
	// };
	const handleTableMenuSendMailOpen = (sendMailId: any) => {
		if (sendMailId) {
			setDialogStatus(true);
			setEmailOnClicked(sendMailId);
			setTableOpenMail(null);
		}
		// console.log(sendMailId);
	};
	// const handleClose = () => {
	//     // setOpen(false);
	// };

	// const [open1, setOpen1] = React.useState(false);

	// const handleClickOpen1 = () => {
	//     setOpen1(true);
	// };
	// const handleClose1 = () => {
	//     setOpen1(false);
	// };

	// const [value, setValue] = React.useState("1");
	// const [selectedValue, setSelectedValue] = React.useState<any>({
	// });

	// const handleChange = (event: React.SyntheticEvent, newValue: string) => {
	//     setValue(newValue);
	// };
	// function stringToColor(string: string) {
	//     let hash = 0;
	//     let i;

	//     /* eslint-disable no-bitwise */
	//     for (i = 0; i < string.length; i += 1) {
	//         hash = string.charCodeAt(i) + ((hash << 5) - hash);
	//     }

	//     let color = '#';

	//     for (i = 0; i < 3; i += 1) {
	//         const value = (hash >> (i * 8)) & 0xff;
	//         color += `00${value.toString(16)}`.slice(-2);
	//     }
	//     /* eslint-enable no-bitwise */

	//     return color;
	// }
	// function stringAvatar(name: string) {
	//     return {
	//         sx: {
	//             bgcolor: stringToColor(name),
	//         },
	//         children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
	//     };
	// }

	const [filtersExpand, setFiltersExpand] = useState(false);
	const toggleFilers = () => {
		setFiltersExpand(!filtersExpand);
		saveAuditLog(4136);
	};
	//  const { contactId } = useParams();

	const [sorting, setSorting] = useState<MRT_SortingState>([
		{
			desc: sortType === "desc" ? true : false,
			id: sortColumn.toLowerCase(),
		},
	]);

	const contactPageInitialRender = useRef(true);

	useEffect(() => {
		if (contactPageInitialRender.current) {
			saveAuditLog(4129);
			contactPageInitialRender.current = false;
		}
	}, []);

	const sortingInitialized = useRef(false);

	useEffect(() => {
		if (sorting.length > 0) {
			if (sortingInitialized.current) {
				switch (sorting[0].id) {
					case "name":
						sorting[0].desc ? saveAuditLog(4146) : saveAuditLog(4145);
						break;
					case "title":
						sorting[0].desc ? saveAuditLog(4148) : saveAuditLog(4147);
						break;
					case "location":
						sorting[0].desc ? saveAuditLog(4150) : saveAuditLog(4149);
						break;
					case "date":
						sorting[0].desc ? saveAuditLog(4152) : saveAuditLog(4151);
						break;
					default:
						sorting[0].desc ? saveAuditLog(4152) : saveAuditLog(4151);
				}
			} else {
				sortingInitialized.current = true;
			}
		}
	}, [sorting]);

	const loadContactsData = (type?: string) => {
		type = type ? type : "all";
		// console.log("Form Data", values);
		let sort = "modifydate";
		let sortBy = "desc";
		if (sorting.length > 0) {
			switch (sorting[0].id) {
				case "name":
					sort = "firstName";
					break;
				case "title":
					sort = "jobTitle";
					break;
				case "location":
					sort = "city";
					break;
				case "date":
					sort = "modifyDate";
					break;
				default:
					sort = "modifyDate";
					break;
			}

			sorting[0].desc === true ? (sortBy = "desc") : (sortBy = "asc");
			// console.log(sorting)
		}

		function transformNamesToLowerCase(dataArray: Candidate[]): Candidate[] {
			return dataArray.map((item) => ({
				...item,
				firstName: item.firstName ? item.firstName.toLowerCase() : "",
				lastName: item.lastName ? item.lastName.toLowerCase() : "",
			}));
		}

		let tempData = {
			clientId: userLocalData.getvalue("clientId"),
			fname: searchData.current.fname ? searchData.current.fname : "",
			lname: searchData.current.lname ? searchData.current.lname : "",
			email: searchData.current.email ? searchData.current.email : "",
			sort: sort,
			sortby: sortBy,
			next: pagination.pageSize * pagination.pageIndex,
			pageSize: pagination.pageSize,
		};

		let contactsUrl = params?.listId ? "getContactsByListId" : "contactsList"; //

		if (params?.listId) {
			tempData = Object.assign({}, tempData, { ...tempData, listId: params?.listId });
		}
		//  console.log(tempData);
		// if ((values.firstName === "") && (values.lastName === "") && (values.contEmail === "") && (values.phoneNo === "")) {
		//   showToaster(" You must enter some criteria to search", 'error');
		// } else {
		// let clientId = userLocalData.getvalue('clientId');
		trackPromise(
			//  ApiService.getByParams(214, 'getContactsById', tempData).then(
			//  https://app.curately.ai/Accuick_API/Curately/Contacts/contacts_list.jsp
			//  http://52.88.252.214:90/QADemoCurately/contactsList
			ApiService.postWithData("admin", contactsUrl, tempData).then((result) => {
				// let tempData = result.data.contactsList;
				let contactsList = result.data.contactsList;
				let transformedContactList = transformNamesToLowerCase(contactsList);
				// console.log('tempdata123', updatedData)
				console.log("contactlist", contactsList);
				setListCandidate(result.data ? result.data : []);
				if (transformedContactList && transformedContactList?.length) {
					transformedContactList = transformedContactList.filter(
						(contact: any) => !contact.isdelete
					);

					for (let cl = 0; cl < transformedContactList.length; cl++) {
						if (!transformedContactList[cl].linkedIn) {
							transformedContactList[cl].linkedIn = "";
						} else {
							transformedContactList[cl].linkedIn = transformedContactList[cl]
								.linkedIn
								? transformedContactList[cl].linkedIn.replaceAll("\\/", "/")
								: "";
							transformedContactList[cl].linkedIn =
								transformedContactList[cl].linkedIn &&
								transformedContactList[cl].linkedIn.indexOf("://") === -1
									? "https://" + contactsList[cl].linkedIn
									: contactsList[cl].linkedIn;
							transformedContactList[cl].linkedIn = IsValidUrl.check(
								transformedContactList[cl].linkedIn
							)
								? transformedContactList[cl].linkedIn
								: "";
						}

						transformedContactList[cl].jobDivaExists = transformedContactList[cl]
							?.jobdivaId
							? Number(transformedContactList[cl].jobdivaId)
							: "";
						transformedContactList[cl].avionteExists = transformedContactList[cl]
							?.aviontId
							? Number(transformedContactList[cl].aviontId)
							: "";
						transformedContactList[cl].bullhornExists = transformedContactList[cl]
							?.bulhornId
							? Number(transformedContactList[cl].bulhornId)
							: "";

						transformedContactList[cl].isShowEmail = transformedContactList[cl]
							.isEmailVisible
							? true
							: false;
						transformedContactList[cl].isShowPhone = transformedContactList[cl]
							.isPhoneNumberVisible
							? true
							: false;
					}

					// tempData = tempData.filter((i: any) => !i.isdelete);
					setListCandidate(transformedContactList);
					setRowCount(Number(result.data.total));
					setTotalCount(Number(result.data.total));
					setCheckedCount(0);
					// setIsSearch(true);
					let dataToSave = {
						total: result.data.total,
						filters: searchData.current,
						data: transformedContactList,
						page: pagination.pageIndex,
					};
					sessionStorage.setItem(
						`contacts_${filtersSearchId.current}`,
						JSON.stringify(dataToSave)
					);
					if (
						type !== "filter" &&
						rowPageIndex > 0 &&
						rowPageIndex > pagination.pageIndex
					) {
						let rowDatanext = { ...rowSelection };
						transformedContactList.forEach((contact: any) => {
							if (rowDatanext[contact.contid] === undefined) {
								rowDatanext[contact.contid] = true;
							}
						});
						const falseCount = Object.keys(rowDatanext).filter(
							(key) => rowDatanext[key] === false
						).length;
						const adjustedCount = result.data.total - falseCount;
						currentSelectCount.current = Math.min(adjustedCount, 10000);
						setRowCount(adjustedCount);
						setIsSelectAllChecked(true);
						setRowSelection(rowDatanext);
						setRowPageIndex(
							Math.ceil(currentSelectCount.current / pagination.pageSize)
						);
					} else {
						setIsSelectAllChecked(false);
					}
				} else {
					setListCandidate([]);
					setRowCount(0);
					setTotalCount(0);
					setCheckedCount(0);
				}
				setDataLoading(false);
			})
		);
		// }
	};
	// useEffect(() => {
	//     loadContactsData();

	// }, [
	//     pagination.pageIndex,
	//     pagination.pageSize,
	//     menuData.name,
	//     menuData.jobTitle,
	//     menuData.city,
	//     menuData.modifyDate,
	//     sorting
	// ]);

	// Ref to track initial render

	useEffect(() => {
		// if (initialRender.current) {
		//     initialRender.current = false;
		// } else {
		loadContactsData();
		// }
	}, [
		pagination.pageIndex,
		pagination.pageSize,
		menuData.name,
		menuData.jobTitle,
		menuData.city,
		menuData.modifyDate,
		sorting,
		searchParams,
	]);

	// const validationSchema = Yup.object({
	//   firstName: Yup.string(),
	//   lastName: Yup.string(),
	//   numericId: Yup.string(),
	//   contEmail: Yup.string().contEmail("Invalid contEmail format"),
	//   phoneNo: Yup.string(),
	//   noOfRecords: Yup.string(),
	// });

	// const [records, setRecords] = useState('')
	// const handleChangeSelect1 = (e : any) => {
	//     setRecords(e.target.value)

	// }
	const [listCandidate, setListCandidate] = useState<any[] | never[]>([]);
	// const formik = useFormik({
	//   initialValues,
	//   onSubmit,
	//   validationSchema,

	// });

	// const [isSearch, setIsSearch] = useState(true);
	const [rowSelection, setRowSelection] = useState<any>({});
	const checkedCountCampaignListMerge = Object.keys(rowSelection).filter((id) =>
		Boolean(rowSelection[id])
	).length;

	const checkedCountmerge = Object.keys(rowSelection).filter((id) => {
		const candidate = listCandidate.find((candidate: any) => candidate.contid == id);
		return candidate && Boolean(rowSelection[id]) && candidate.contEmail;
	}).length;

	const checkedSMSCount = Object.keys(rowSelection).filter((id) => {
		const candidate = listCandidate.find((candidate: any) => candidate.contid == id);
		return candidate && Boolean(rowSelection[id]) && candidate.mobile;
	}).length;

	// const openContactView = (id: string) => {
	//     window.open(globalData.getWindowLocation() + "contact/view/" + id);
	// }

	const addToTopSequenceList = (id: string, name: string) => {
		// console.log(Object.keys(rowSelection));
		if (Object.keys(rowSelection).length > 0) {
			if (name && name.trim()) {
				setSelectedSequence({ id: id, name: name });
				handleProfileMenuClose();
				addToSequenceList(id, name, Object.keys(rowSelection).join(","));
			}
		} else {
			showToaster("Select atleast one Candidate", "error");
		}
	};
	const handleClickAddToSequenceListen = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAddToSequenceListAnchorEl(event.currentTarget);
		// loadDistributionList();
		// setSelectedRowId(callId);
	};

	useEffect(() => {
		// if (flatData.length) {
		//     rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
		// }
		setSelectSequenceList(Object.keys(rowSelection));
	}, [rowSelection]);
	const addToSequenceList = (id: string, name: string, contId: string) => {
		if (name && name.trim()) {
			handleProfileMenuClose();
			const saveData = {
				clientId: userLocalData.getvalue("clientId"),
				sequenceId: id,
				recrId: userLocalData.getvalue("recrId"),
				contIds: contId,
			};

			//https://www4.accuick.com/Accuick_API/Curately/Sequence/sequence_assign_users.jsp?clientId=2&userIds=39&sequenceId=9&recrId=61
			ApiService.postWithData("admin", "sequenceAssignContacts", saveData)
				.then((response: any) => {
					// console.log(response);
					//  showToaster((response.data.message) ? response.data.message : "campaign saved successfully", 'success');
					//    loadCanidateData();
					if (
						response.data.message === "Success" ||
						response.data.Message === "Success"
					) {
						showToaster("Campaign has been assigned successfully", "success");
						saveAuditLog(4142);
						let tempData: any = listCandidate;
						for (let index = 0; index < listCandidate.length; index++) {
							if (tempData[index].contId === contId) {
								tempData[index].sequenceCount = tempData[index].sequenceCount + 1;
								const arrSeqIds = tempData[index].sequenceIds;
								tempData[index].sequenceIds = [...arrSeqIds, selectedSequence.id];
								const arrSeqNames = tempData[index].sequenceNames;
								tempData[index].sequenceNames = [
									...arrSeqNames,
									selectedSequence.name,
								];
							}
						}

						setListCandidate(tempData);
						setSelectedSequence({ id: "", name: "" });
						setRowSelection({});
					} else {
						showToaster(
							response.data.Message
								? response.data.Message
								: "An error occured while assigning ",
							"error"
						);
					}
					// if (response.data.Message === "Success") {
					//     showToaster("Sequence has been assigned", 'success');
					//     loadCanidateData();
					//     setSelectedSequence({ id: "", name: "" });
					// } else {
					//     showToaster(response.data.Message ? response.data.Message : "An error occured while assigning ", 'error');
					// }
				})
				.catch((error) => {
					console.error("API Error:", error);
				});
		}
	};

	const deleteContact = (contId: string) => {
		//  let contId = contactId;
		//  console.log(contId);
		trackPromise(
			//http://35.155.202.216:8080/QADemoCurately/deleteContacts/{contId}/{clientId}

			ApiService.deleteById(
				"admin",
				"deleteContacts",
				contId + "/" + userLocalData.getvalue("clientId")
			)

				.then((response: any) => {
					if (response.data.Success === true) {
						showToaster(response.data.Message, "success");
						loadContactsData();
						//  loadEmailTemplates()
					} else if (response.data.Error === true) {
						showToaster(response.data.Message, "error");
					} else {
						showToaster("Something went wrong", "error");
					}
				})
				.catch((error) => {
					console.error("Error:", error);
				})
		);
	};
	const handleBlastEmail = () => {
		const selectedIds = Object.keys(rowSelection);
		if (selectedIds.length === 1) {
			const selectedRowKey = selectedIds[0];
			const selectedRow = listCandidate.find(
				(candidate: any) => candidate.contid == selectedRowKey
			);
			if (selectedRow) {
				setSelectedEmail(selectedRow.contEmail);
				setSelectedName(selectedRow.firstName);
				setIsBulkEmail(false);
				setAddEmail(true);
				setSelectCandidList(selectedIds);
			}
		} else if (selectedIds.length > 1) {
			setSelectedEmail("");
			setSelectedName("");
			setIsBulkEmail(true);
			setAddEmail(true);
			setSelectCandidList(selectedIds);
		}
	};
	const getContactDetails = (contId: string) => {
		//  let contId = contactId;
		//  console.log(contId);

		return new Promise((resolve, reject) => {
			trackPromise(
				// http://52.88.252.214:90/QADemoCurately/getContactsById/{contId}/{clientId}

				ApiService.postWithData("admin", "getContactsById", {
					recrId: userLocalData.getvalue("recrId"),
					clientId: userLocalData.getvalue("clientId"),
					contId: contId,
					isExtension: true, // userLocalData.isChromeExtensionEnabled()
				})

					.then((response: any) => {
						if (Number(response.data?.contId)) {
							if (!response.data.linkedIn) {
								response.data.linkedIn = "";
							} else {
								response.data.linkedIn = response.data.linkedIn
									? response.data.linkedIn.replaceAll("\\/", "/")
									: "";
								response.data.linkedIn =
									response.data.linkedIn &&
									response.data.linkedIn.indexOf("://") === -1
										? "https://" + response.data.linkedIn
										: response.data.linkedIn;
								response.data.linkedIn = IsValidUrl.check(response.data.linkedIn)
									? response.data.linkedIn
									: "";
							}
							setEditContactData({
								contId: response.data.contId ? response.data.contId : 0,
								firstName: response.data.firstName ? response.data.firstName : "",
								lastName: response.data.lastName ? response.data.lastName : "",
								contEmail: response.data.contEmail ? response.data.contEmail : "",
								contEmail2: response.data.contEmail2
									? response.data.contEmail2
									: "",
								mobile: response.data.mobile ? response.data.mobile : "",
								directPhone: response.data.directPhone
									? response.data.directPhone
									: "",
								compid: response.data.compid ? response.data.compid : 0,
								linkedIn: response.data.linkedIn ? response.data.linkedIn : "",
								jobTitle: response.data.jobTitle ? response.data.jobTitle : "",
								department: response.data.department
									? response.data.department
									: "",
								pipelineStatus: response.data.pipelineStatus
									? response.data.pipelineStatus
									: 0,
								street: response.data.street ? response.data.street : "",
								city: response.data.city ? response.data.city : "",
								state: response.data.state ? response.data.state : "",
								country: response.data.country ? response.data.country : "",
								zipcode: response.data.zipcode ? response.data.zipcode : "",
								createdDate: response.data.createdDate
									? response.data.createdDate
									: "",
								modifyDate: response.data.modifyDate
									? response.data.modifyDate
									: "",
								isdelete: response.data.isdelete ? response.data.isdelete : false,

								modifyBy: userLocalData.getvalue("recrId"),
								createdBy: userLocalData.getvalue("recrId"),
								nle: response.data.NLE,
								stateName: response.data.state
									? getStateById(response.data.state)
									: "",
							});
							setOpenAddContactModal(true);
							resolve(response);
						} else if (response.data.Error === true) {
							reject();
							showToaster(response.data.Message, "error");
						} else {
							reject();
							showToaster("Something went wrong", "error");
						}
					})
					.catch((error) => {
						reject();
						console.error("Error:", error);
					})
			);
		});
	};

	const openEditModal = (contId: string) => {
		getContactDetails(contId)
			.then(() => {
				setOpenAddContactModal(true);
			})
			.catch((error) => {
				showToaster("Unable to fetch Job Data", error);
			});
	};

	const openWebSite = (link: string) => {
		window.open(link, "_blank");
	};

	const columns: MRT_ColumnDef<(typeof listCandidate)[0]>[] = useMemo(
		() => [
			{
				accessorFn: (row) => `${row.firstName} ${row.lastName}`,
				id: "name",
				header: "Name",
				enableColumnPinning: true,
				// muiTableHeadCellProps: { sx: { fontSize: "12px", fontWeight: "400" } }, //custom props
				// Cell: ({ renderedCellValue, row }) => (
				//     <span className="d-flex">
				//         {
				//             row.original.NLE ?
				//                 <FiberManualRecordIcon className='c-red mr-1' />
				//                 :
				//                 null
				//         }
				//         <span className="hightLightTd" onClick={() => openContactView(row.original.contid)}>{row.original?.firstName?.toLowerCase() + " " + row.original?.lastName?.toLowerCase()}</span>
				//     </span>
				//     // {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */ }
				//     // <Box >
				//     //   <Button onClick={() => handleClickOpen(row.original)}>{renderedCellValue}</Button>
				//     // </Box>
				// ),
				Cell: ({ row }) => {
					return (
						<span className="contactNameSpan">
							{row.original.NLE ? (
								<FiberManualRecordIcon className="c-red mr-1" />
							) : null}
							{userLocalData.checkIntegration(400040) ? (
								<Link
									to={`../../contact/view/${row.original.contid}`}
									className="hightLightTd"
									state={{
										data: [
											{
												text: params?.listId ? "Contacts" : "Search",
												link: `../../contact/find`,
											},
											{
												text: params?.listId ? listTitle : "Contacts",
												link: params?.listId
													? `../../contact/list/${params?.listId}?id=${filtersSearchId.current}`
													: `../../contact/find?id=${filtersSearchId.current}`,
											},
											{
												text: `${
													row.original.firstName.toLowerCase().trim() +
													" " +
													row.original.lastName.toLowerCase()
												}`,
												link: ``,
											},
										],
									}}
								>
									{row.original.firstName.toLowerCase().trim() +
										" " +
										row.original.lastName.toLowerCase()}
								</Link>
							) : (
								<>
									{" "}
									{row.original.firstName.toLowerCase().trim() +
										" " +
										row.original.lastName.toLowerCase()}
								</>
							)}

							{row.original.linkedIn ? (
								<Tooltip
									title={row.original.linkedIn}
									className="linkedinIcon ml-1"
								>
									<LinkedInIcon
										className="c-cursor"
										onClick={() => openWebSite(row.original.linkedIn)}
									/>
								</Tooltip>
							) : (
								" "
							)}
						</span>
					);
				},
			},
			{
				accessorFn: (row) => row.jobTitle,
				id: "jobTitle",
				header: "Title",
				Cell: ({ row }: any) => {
					let jobTitle = row.original.jobTitle ? row.original.jobTitle : "";
					let displayTitle =
						jobTitle.length > 30 ? jobTitle.slice(0, 30) + "..." : jobTitle;
					return (
						<Tooltip title={jobTitle} classes={{ tooltip: "tt-capital" }}>
							{displayTitle}
						</Tooltip>
					);
				},
			},
			{
				accessorFn: (row) => row.city,
				id: "city",
				header: "Location",
			},
			// {
			//   accessorKey: "Actions",
			//   header: "Actions",
			//   Cell: ({ row }) => (
			//     <Stack key={row.original.clientId}>
			//       <Stack direction={"row"}>
			//         <Tooltip title="Edit" placement="top" color="warning">
			//           <IconButton >
			//             <EditIcon />
			//           </IconButton>
			//         </Tooltip>
			//         <Tooltip title="Delete" placement="top" color="warning">
			//           <IconButton onClick={() => {
			//           //  handleClose();
			//             confirmDialog('Are you sure you want to delete this Contact?', () => {
			//               deleteContact(row.original.contid);
			//             }, "warning");
			//           }}

			//           >
			//             <DeleteOutlineIcon />
			//           </IconButton>
			//         </Tooltip>
			//       </Stack>
			//     </Stack >
			//   ),
			//   size: 200
			// },
			{
				accessorFn: (row) => `${row.modifyDate}`,
				id: "modifyDate",
				header: "Date",
				Cell: ({ row }) => (
					<span>
						{row.original.modifyDate
							? DateTime.fromFormat(
									row.original.modifyDate.substring(0, 19),
									"yyyy-MM-dd hh:mm:ss"
							  ).toFormat("MM/dd/yyyy")
							: ""}
					</span>
				),
			},

			{
				accessorKey: "Actions",
				header: "Quick Actions",

				enableSorting: false,
				Cell: ({ row }) => (
					<Stack key={row.original.candId}>
						<ButtonGroup
							variant="outlined"
							id={row.original.candId}
							// sx={{
							//     // width: "33px",
							//     height: "31px",
							//     mr: 1,
							// }}
							sx={{
								// width: "33px",
								height: "31px",
								"& .MuiButtonGroup-grouped": {
									marginRight: "1px",
									border: "1px solid var(--c-neutral-40)",
								},
							}}
						>
							<Tooltip
								title={
									!row.original.isShowEmail
										? Mask.email(row.original.contEmail)
										: row.original.contEmail
								}
								placement="top"
							>
								<Button
									id={`mailbutton-${row.id}`}
									onClick={(e) => {
										if (row.original.isShowEmail && row.original.contEmail) {
											setMenuData({
												rowId: row.id,
												contEmail: row.original.contEmail,
												first: row.original.firstName,
												candId: row.original.candId,
												jobId: row.original.jobId,
												mobile: "",
												name: "",
												jobTitle: "",
												city: "",
												modifyDate: "",
											});
											handleTableMail(e, `${row.id}`);
										}
									}}
									aria-controls={
										openTableMail && selectedRowId === `${row.id}`
											? `mail-${row.id}`
											: undefined
									}
									aria-haspopup="true"
									aria-expanded={
										openTableMail && selectedRowId === `${row.id}`
											? "true"
											: undefined
									}
									sx={{
										pointerEvents: row.original.contEmail ? "auto" : "none",
										borderColor:
											openTableMail && selectedRowId === `${row.id}`
												? "var(--c-neutral-40) !important"
												: "var(--c-secondary-color)",
										backgroundColor: "#ffffff",
										color:
											openTableMail && selectedRowId === `${row.id}`
												? "var(--c-neutral-40) !important"
												: "#919191",
										borderRightColor:
											openTableMail && selectedRowId === `${row.id}`
												? "var(--c-neutral-40) !important"
												: "var(--c-secondary-color)",
										mr: "0px",
										"&:hover": {
											borderColor: "var(--c-neutral-40)",
											color: "#919191",
											backgroundColor: "#ffffff",
										},
										width: "33px",
									}}
									className="customButtonForHover"
								>
									<Box
										sx={{
											position: "relative",
											display: "inline-block",
											alignItems: "center",
											mt: 1,
										}}
									>
										<MailOutlineOutlinedIcon
											sx={{
												fontSize: "16px",
											}}
										/>

										<Box
											sx={{
												backgroundColor: "#1DB268",
												// display: 'none',
												height: "10px",
												width: "10px",
												borderRadius: "50%",
												fontSize: "10px",
												display: row.original.contEmail ? "flex" : "none",
												justifyContent: "center",
												alignItems: "center",
												color: "red",
												position: "absolute",
												top: -2,
												right: -2,
											}}
										>
											<DoneRoundedIcon
												sx={{
													fontSize: "8px",
													color: "#ffffff",
												}}
											/>
										</Box>

										<Box
											sx={{
												backgroundColor: "#919191",
												// display: 'none',
												height: "10px",
												width: "10px",
												borderRadius: "50%",
												fontSize: "10px",
												display: row.original.contEmail ? "none" : "flex",
												justifyContent: "center",
												alignItems: "center",
												color: "red",
												position: "absolute",
												top: -2,
												right: -2,
											}}
										>
											<CloseRoundedIcon
												sx={{
													fontSize: "8px",
													color: "#ffffff",
												}}
											/>
										</Box>

										<Box
											sx={{
												backgroundColor: "#EB7A2F",
												display: "none",
												height: "10px",
												width: "10px",
												borderRadius: "50%",
												fontSize: "10px",
												// display: 'flex',
												justifyContent: "center",
												alignItems: "center",
												color: "red",
												position: "absolute",
												top: -2,
												right: -2,
											}}
										>
											<QuestionMarkRoundedIcon
												sx={{
													color: "#ffffff",
													fontSize: "8px",
												}}
											/>
										</Box>
									</Box>
									{/* <ArrowDropDownIcon
                                sx={{
                                    fontSize: "16px",
                                }}
                            /> */}
								</Button>
							</Tooltip>

							{userLocalData.getvalue("paymentType") !== 1 &&
							userLocalData.getvalue("paymentType") !== 2 ? (
								<Tooltip
									title={
										!row.original?.isShowPhone
											? Mask.phone(
													`${USPhoneFormat.get(row.original.mobile)}`
											  )
											: `${USPhoneFormat.get(row.original.mobile)}`
									}
									placement="top"
								>
									<Button
										id={`phonebutton-${row.id}`}
										disableRipple
										onClick={(e) => {
											if (row.original?.isShowPhone && row.original.mobile) {
												setMenuData({
													rowId: row.id,
													contEmail: "",
													first: row.original.first,
													candId: row.original.candId,
													jobId: row.original.jobId,
													mobile: row.original.mobile,
													name: "",
													jobTitle: "",
													city: "",
													modifyDate: "",
												});
												handleTableCall(e, `${row.id}`);
											}
										}}
										aria-controls={
											openCallMenu && selectedRowId === `${row.id}`
												? `mobile-${row.id}`
												: undefined
										}
										aria-haspopup="true"
										aria-expanded={
											openCallMenu && selectedRowId === `${row.id}`
												? "true"
												: undefined
										}
										className={`customButtonForHover ${
											row.original.mobile ? "" : "disabled"
										} `}
										sx={{
											borderColor:
												openCallMenu && selectedRowId === `${row.id}`
													? "var(--c-neutral-40) !important"
													: "var(--c-secondary-color)",
											backgroundColor: "#ffffff",
											color:
												openCallMenu && selectedRowId === `${row.id}`
													? "#919191"
													: "#919191",
											"& .MuiButtonGroup-root .MuiButtonGroup-grouped:not(:last-of-type)":
												{
													borderRightColor:
														openCallMenu &&
														selectedRowId === `${row.id}`
															? "var(--c-neutral-40)"
															: "",
												},
											"&:hover": {
												borderColor: "var(--c-neutral-40)",
												color: "#919191",
												backgroundColor: "#ffffff",
											},
											width: "33px",
										}}
									>
										{/* <CallOutlinedIcon
                                                sx={{
                                                    fontSize: "16px",
                                                }}
                                            /> */}
										<Box
											sx={{
												position: "relative",
												display: "inline-block",
												alignItems: "center",
												mt: 1,
											}}
										>
											<CallOutlinedIcon sx={{ fontSize: "16px" }} />
											<Box>
												<CheckCircleRoundedIcon
													htmlColor="#1DB268"
													sx={{
														fontSize: "12px",
														display: row.original.mobile
															? "flex"
															: "none",
														position: "absolute",
														top: -2,
														right: -4,
													}}
												/>
											</Box>
											<Box>
												<CloseRoundedIcon
													sx={{
														backgroundColor: "#919191",
														borderRadius: "50%",
														color: "#ffffff",
														fontSize: "10px",
														display: row.original.mobile
															? "none"
															: "flex",
														position: "absolute",
														top: -2,
														right: -4,
													}}
												/>
											</Box>
										</Box>
										{/* <ArrowDropDownIcon sx={{ fontSize: "16px", }} /> */}
									</Button>
								</Tooltip>
							) : null}

							{userLocalData.checkIntegration(400012) ? (
								<Tooltip title={`Edit`} placement="top">
									<Button
										id={`editbutton-${row.id}`}
										disableRipple
										onClick={() => {
											if (row.original.contid) {
												openEditModal(row.original.contid);
											}
										}}
										aria-controls={
											openCallMenu && selectedRowId === `${row.id}`
												? `mobile-${row.id}`
												: undefined
										}
										aria-haspopup="true"
										aria-expanded={
											openCallMenu && selectedRowId === `${row.id}`
												? "true"
												: undefined
										}
										sx={{
											borderColor:
												openCallMenu && selectedRowId === `${row.id}`
													? "var(--c-neutral-40) !important"
													: "var(--c-secondary-color)",
											backgroundColor: "#ffffff",
											color:
												openCallMenu && selectedRowId === `${row.id}`
													? "#919191"
													: "#919191",
											"& .MuiButtonGroup-root .MuiButtonGroup-grouped:not(:last-of-type)":
												{
													borderRightColor:
														openCallMenu &&
														selectedRowId === `${row.id}`
															? "var(--c-neutral-40)"
															: "",
												},
											"&:hover": {
												borderColor: "var(--c-neutral-40)",
												color: "#919191",
												backgroundColor: "#ffffff",
											},
											width: "33px",
										}}
									>
										<EditIcon
											sx={{
												fontSize: "16px",
											}}
										/>
									</Button>
								</Tooltip>
							) : null}
							{userLocalData.checkIntegration(400011) &&
							userLocalData.checkIntegration(400012) ? (
								<Tooltip title={`delete`} placement="top">
									<Button
										id={`delete-${row.id}`}
										disableRipple
										onClick={() => {
											//  handleClose();
											confirmDialog(
												`Are you sure you want to delete ${row.original.firstName} ${row.original.lastName}'s Contact?`,
												() => {
													deleteContact(row.original.contid);
												},
												"warning"
											);
										}}
										aria-controls={
											openCallMenu && selectedRowId === `${row.id}`
												? `mobile-${row.id}`
												: undefined
										}
										aria-haspopup="true"
										aria-expanded={
											openCallMenu && selectedRowId === `${row.id}`
												? "true"
												: undefined
										}
										sx={{
											borderColor:
												openCallMenu && selectedRowId === `${row.id}`
													? "var(--c-neutral-40) !important"
													: "var(--c-secondary-color)",
											backgroundColor: "#ffffff",
											color:
												openCallMenu && selectedRowId === `${row.id}`
													? "#919191"
													: "#919191",
											"& .MuiButtonGroup-root .MuiButtonGroup-grouped:not(:last-of-type)":
												{
													borderRightColor:
														openCallMenu &&
														selectedRowId === `${row.id}`
															? "var(--c-neutral-40)"
															: "",
												},
											"&:hover": {
												borderColor: "var(--c-neutral-40)",
												color: "#919191",
												backgroundColor: "#ffffff",
											},
											width: "33px",
										}}
									>
										<DeleteOutlineIcon
											sx={{
												// height: "20px",
												// width: "15px",
												fontSize: "16px",
											}}
										/>
									</Button>
								</Tooltip>
							) : null}
						</ButtonGroup>
					</Stack>
				),
				size: 100,
			},

			{
				accessorKey: "jobdivaId",
				header: "JobDiva",
				Cell: ({ row }: any) => {
					return (
						<span className="ml-4">
							{row?.original.jobDivaExists ? (
								<span
									className="ml-0"
									onClick={() => {
										JobDivaLink.jobDivaLinkUrl(
											"contact",
											row?.original.jobdivaId
										);
									}}
									title="JobDiva"
									style={{ cursor: "pointer" }}
								>
									{" "}
									<CheckOutlinedIcon color="success" />
								</span>
							) : row.original?.jobdivaReason ? (
								<Tooltip title="Click here to View Error Message">
									<span
										className="ml-0 errorMsg"
										style={{ cursor: "pointer" }}
										onClick={() => {
											OpenErrorModal({
												errorMessage: row?.original?.jobdivaReason,
												title: "JobDiva - Error Message",
											});
										}}
									>
										{" "}
										<ErrorOutlineOutlinedIcon color="error" />{" "}
									</span>
								</Tooltip>
							) : null}
						</span>
					);
				},
				size: 80,
			},
			{
				accessorKey: "bulhornId",
				header: "Bullhorn",
				Cell: ({ row }: any) => {
					return (
						<span className="ml-4">
							{row?.original.bullhornExists ? (
								<CheckOutlinedIcon color="success" />
							) : row.original?.bullhornReason ? (
								<Tooltip title="Click here to View Error Message">
									<span
										className="ml-0 errorMsg"
										title="Bullhorn"
										style={{ cursor: "pointer" }}
										onClick={() => {
											OpenErrorModal({
												errorMessage: row?.original?.bullhornReason,
												title: "Bullhorn - Error Message",
											});
										}}
									>
										{" "}
										<ErrorOutlineOutlinedIcon color="error" />{" "}
									</span>
								</Tooltip>
							) : null}
						</span>
					);
				},
				size: 80,
			},
			{
				accessorKey: "aviontId",
				header: "Avionte",
				Cell: ({ row }: any) => {
					return (
						<span className="ml-4">
							{row?.original.avionteExists ? (
								<CheckOutlinedIcon color="success" />
							) : row.original?.avionteReason ? (
								<Tooltip title="Click here to View Error Message">
									<span
										className="ml-0 errorMsg"
										title="Avionte"
										style={{ cursor: "pointer" }}
										onClick={() => {
											OpenErrorModal({
												errorMessage: row?.original?.avionteReason,
												title: "Avionte - Error Message",
											});
										}}
									>
										{" "}
										<ErrorOutlineOutlinedIcon color="error" />{" "}
									</span>
								</Tooltip>
							) : null}
						</span>
					);
				},
				size: 80,
			},
		],

		[searchParams]
	);

	// const newSearch = () => {
	//   formik.resetForm();
	//   setIsSearch(true);
	// }

	// const ref = useRef<HTMLTextAreaElement>(null);

	// const [updated, setUpdated] = useState<string>('');
	// const handleClick = () => {
	//     //  "inputRef.current.value" is input value
	//     setUpdated(ref.current!.value);
	//     setOpen1(false);
	//     setIsSearch(true);
	// };

	useEffect(() => {
		updateDocumentTitle.set("Find Contacts");
		return () => {
			updateDocumentTitle.set("");
		};
	}, []);

	const [selectAllElement, setSelectAllElement] = useState<null | HTMLElement>(null);

	const openSelectAllMenu = Boolean(selectAllElement);

	const openSelectAll = (event: React.MouseEvent<HTMLButtonElement>) => {
		setSelectAllElement(event.currentTarget);
	};

	const checkedCount = Object.keys(rowSelection).filter((id) => Boolean(rowSelection[id])).length;

	const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);

	const someAreChecked = !isSelectAllChecked && checkedCount ? true : false;
	const [selectMenuType, setSelectMenuType] = useState<"page" | "all" | "clear" | "">("");

	const selectAllMenuItemClicked = (menuType: any) => {
		setSelectMenuType(menuType);
		if (menuType === "page") {
			const startIndex = pagination.pageIndex > 0 ? 0 : pagination.pageIndex;
			const endIndex = Math.min(
				(pagination.pageIndex + 1) * pagination.pageSize,
				listCandidate.length
			);

			let checkedCheckboxesData: any = {};
			for (let index = startIndex; index < endIndex; index++) {
				checkedCheckboxesData[listCandidate[index].contid] = true;
			}
			//console.log(checkedCheckboxesData);
			setRowPageIndex(0);
			setRowSelection(checkedCheckboxesData);
			setCheckedCount(Object.keys(checkedCheckboxesData).length);
			setIsSelectAllChecked(false);
			setSelectedPage(true);
			setSelectedPageCount(Object.keys(checkedCheckboxesData).length);
			currentSelectCount.current = Object.keys(rowSelection).length;
		} else if (menuType === "all") {
			let rowData: any = {};
			let tempData: any = listCandidate;
			for (let index = 0; index < listCandidate.length; index++) {
				rowData[tempData[index].contid] = true;
			}
			currentSelectCount.current = rowCount > 2500 ? 2500 : rowCount;
			let pIndex = Math.ceil(currentSelectCount.current / pagination.pageSize);
			//  console.log(rowData);
			setRowPageIndex(pIndex);
			setRowSelection(rowData);
			setCheckedCount(Object.keys(rowData).length);
			setSelectedPage(false);
			trackPromise(
				ApiService.postWithData("admin", "getContactIdsList", {
					clientId: userLocalData.getvalue("clientId"),
					fname: searchData.current.fname ? searchData.current.fname : "",
					lname: searchData.current.lname ? searchData.current.lname : "",
					email: searchData.current.email ? searchData.current.email : "",
					sort: "modifyDate",
					sortby: "desc",
					next: 0,
					pageSize: rowCount,
					maxCount: 2500,
					listId: params?.listId ? params?.listId : null,
				}).then((result: any) => {
					// console.log('contact new', result.data);
					let rowData: any = {};

					let tempData: any = result.data?.contactsList ? result.data.contactsList : [];
					for (let index = 0; index < tempData.length; index++) {
						if (tempData[index]?.trim()) {
							rowData[tempData[index].trim()] = true;
						}
					}
					setRowSelection(rowData);
				})
			); //
			setIsSelectAllChecked(true);
		} else if (menuType === "clear") {
			setIsSelectAllChecked(false);
			setRowSelection({});
			setSelectedPage(false);
			setRowPageIndex(0);
			setCheckedCount(0);
			currentSelectCount.current = 0;
		}
		setSelectAllElement(null);
	};

	// const handleMergeFields = () => {
	//     if (checkedCount === 2) {
	//         const tempMerge: any = [];
	//         listCandidate.map((item: any) => {
	//             if (Object.keys(rowSelection).includes(item.contid.toString()) && rowSelection[item.contid]) {
	//                 tempMerge.push({ contactId: item.contid, contactName: item.firstName + " " + item.lastName })
	//             }

	//         })
	//         seContactsToMerge({
	//             contactIdA: tempMerge[0].contactId,
	//             contactNameA: tempMerge[0].contactName,
	//             contactIdB: tempMerge[1].contactId,
	//             contactNameB: tempMerge[1].contactName,
	//         })
	//     } else {
	//         seContactsToMerge({
	//             contactIdA: "",
	//             contactNameA: "",
	//             contactIdB: "",
	//             contactNameB: "",
	//         })
	//     }
	//     setOpenMergeFields(true)
	// }

	const saveAuditLog = (id: number) => {
		ApiService.saveAuditLog(id);
	};

	// Avionte publish Candidate
	const publishCandidateToAvionte = () => {
		let bodyRequest = {
			atsName: "Avionte",
			clientId: userLocalData.getvalue("clientId"),
			recruiterId: userLocalData.getvalue("recrId"),
			moduleName: "Contact",
			curatelyIds: Object.entries(rowSelection)
				.filter(([key, value]) => value)
				.map(([key]) => Number(key)),
		};
		// https://adminapi.cxninja.com/bullhorn-service-dev/job/%7BclientId%7D/%7BjobId%7D
		// if (Object.keys(rowSelection).length === 1) {
		ApiService.postWithData("ats", `ats/post`, bodyRequest)
			.then((response) => {
				if (response.data.Success) {
					showToaster(`Avionte - Contact is Publshed successfully`, "success");
					setRowSelection({});
				} else {
					showToaster(
						response.data.Message
							? response.data.Message
							: "Unable to Publish Contact to Avionte",
						"error"
					);
				}
			})
			.catch((error) => {
				showToaster(
					error.message ? error.message : "Unable to Publish Contact to Avionte",
					"error"
				);
			});
		// } else {
		//     showToaster("Please select Only Candidate to Publish to Avionte", 'error');
		// }
	};

	// publishCandidateToJobdiva
	//

	// Bullhorn publish Candidate
	const publishCandidateToBullhorn = () => {
		let bodyRequest = {
			atsName: "Bullhorn",
			clientId: userLocalData.getvalue("clientId"),
			recruiterId: userLocalData.getvalue("recrId"),
			moduleName: "Contact",
			curatelyIds: Object.entries(rowSelection)
				.filter(([key, value]) => value)
				.map(([key]) => Number(key)),
		};

		ApiService.postWithData("ats", `ats/post`, bodyRequest)
			.then((response) => {
				if (response.data.Success) {
					showToaster(`Bullhorn - Contact is Publshed successfully`, "success");
					setRowSelection({});
				} else {
					showToaster(
						response.data.Message
							? response.data.Message
							: "Unable to Publish Contact to BullHorn",
						"error"
					);
				}
			})
			.catch((error) => {
				showToaster(
					error.message ? error.message : "Unable to Publish Contact to BullHorn",
					"error"
				);
			});
	};

	const handlePaginationChange = (newPage: number) => {
		if (newPage > pagination.pageIndex) {
			saveAuditLog(4154);
		} else if (newPage < pagination.pageIndex) {
			saveAuditLog(4155);
		}
	};

	return (
		<div className="findContact pt-3">
			{params?.listId && (
				<Stack
					direction={"row"}
					alignItems={"center"}
					mb={1}
					className="contact-nav-container"
				>
					<Link to={`/${userLocalData.getvalue("clientName")}/contact/find`}>
						<Typography variant="subtitle1">Search</Typography>
					</Link>
					<NavigateNextOutlined fontSize="small" />
					<Link to={`/${userLocalData.getvalue("clientName")}/contact/find`}>
						<Typography variant="subtitle1">Contacts</Typography>
					</Link>
					{listTitle && (
						<>
							<NavigateNextOutlined fontSize="small" />
							<Typography>{listTitle}</Typography>
						</>
					)}
				</Stack>
			)}
			<Stack
				direction="row"
				className="customCard px-4 py-2"
				justifyContent="space-between"
				alignItems="center"
				sx={{ minHeight: "auto !important" }}
			>
				<Stack direction={"row"} alignItems={"center"} spacing={1}>
					<Typography variant="h6" className="header">
						Contacts
					</Typography>
					{listTitle ? <Typography variant="h6"> - {listTitle}</Typography> : null}
				</Stack>
				<Stack direction="row" className="btn-container" spacing={1}>
					{params?.listId ? (
						<Link
							to={`/${userLocalData.getvalue("clientName")}/contact/list`}
							style={{ textDecoration: "none" }}
						>
							<Button
								variant="outlined"
								type="button"
								color="secondary"
								className="mr-2"
							>
								Back to list
							</Button>
						</Link>
					) : (
						<>
							{userLocalData.checkIntegration(400011) ? (
								<Button
									variant="contained"
									color="primary"
									size="small"
									onClick={() => {
										setEditContactData({
											contId: 0,
											firstName: "",
											lastName: "",
											contEmail: "",
											contEmail2: "",
											mobile: "",
											directPhone: "",
											compid: 0,
											linkedIn: "",
											jobTitle: "",
											department: "",
											pipelineStatus: 0,
											nle: false,
											street: "",
											city: "",
											state: "",
											stateName: "",
											country: "",
											zipcode: "",
											createdBy: userLocalData.getvalue("recrId"),
											createdDate: "",
											modifyBy: userLocalData.getvalue("recrId"),
											modifyDate: "",
											isdelete: false,
										});
										setOpenAddContactModal(true);
										saveAuditLog(4130);
									}}
									// href="#/contact/add"
								>
									{/* <NavLink to="/contact/add" rel="noopener noreferrer" > */}
									Add Contact
									{/* </NavLink> */}
								</Button>
							) : null}
						</>
					)}

					{/* <Button variant="contained" color="primary" size="small" href="#/contact/h1b">
            H1B List
          </Button>
          <Button variant="contained" color="primary" size="small" href="#/contact/findLeads">
            Find Leads
          </Button> */}
				</Stack>
			</Stack>
			<Grid container className="customCard p-0 filterExpand-grid">
				<Grid
					sx={{
						width: filtersExpand ? 0 : 310,
						overflow: "hidden",
						opacity: filtersExpand ? 0 : 1,
					}}
				>
					<ContactFilters
						onSearch={(e: { fname: string; lname: string; email: string }) => {
							selectAllMenuItemClicked("clear");
							searchData.current = e;
							setPagination({ ...pagination, pageIndex: 0 });
							loadContactsData("filter");
						}}
					/>
				</Grid>
				<Grid sx={{ width: filtersExpand ? "calc(100%)" : "calc(100% - 310px)" }}>
					<div className={`MRTableCustom ${filtersExpand ? "pl-0" : ""}`}>
						<Tooltip title={filtersExpand ? "Show Filters" : "Hide Filters"}>
							<IconButton
								disableRipple
								className="filtersHideButton"
								color="primary"
								aria-label={filtersExpand ? "Expand" : "Collapse"}
								onClick={toggleFilers}
							>
								{/* {<img src={CommonImages.GetFilterIcon()} className="filterIcon" />} */}
								<TuneIcon className="c-grey" />
								{/* {filtersExpand ? (
                                                        <KeyboardDoubleArrowRightIcon />
                                                    ) : (
                                                        <KeyboardDoubleArrowLeftIcon />
                                                    )} */}
							</IconButton>
						</Tooltip>

						<MaterialReactTable
							columns={columns}
							enableRowSelection
							data={listCandidate}
							onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
							state={{
								rowSelection,
								pagination,
								sorting,
								isLoading: dataLoading,
								columnVisibility: columnVisibility,
							}} //pass our managed row selection state to the table to use
							enablePinning
							initialState={{
								columnPinning: { left: ["mrt-row-select", "name"] },
								density: "compact",
								showGlobalFilter: false,
							}}
							// enableColumnResizing
							enableDensityToggle={false}
							enableFullScreenToggle={false}
							// muiTableHeadCellProps={{
							//   sx: (theme) => ({
							//     background: 'var(--curatelyPurple)',
							//   }),
							// }}
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
											selectAllMenuItemClicked("clear");
										}
										handlePaginationChange(page);
									}}
								/>
							)}
							manualPagination
							manualSorting
							onSortingChange={setSorting}
							enableGlobalFilterModes
							columnResizeMode="onChange"
							onPaginationChange={setPagination}
							getRowId={(row) => row.contid}
							icons={{
								ArrowDownwardIcon: (props: any) => <SwitchLeftIcon {...props} />,
							}}
							rowCount={totalCount}
							enableStickyHeader
							muiSelectCheckboxProps={(prop) => ({
								//
								onChange: (e) => {
									if (prop.row.id) {
										let duplicateCheckedCount = checkedCount;
										let tempRowSelection: any = { ...rowSelection };
										if (e.target.checked) {
											tempRowSelection[prop.row.id] = e.target.checked;
											duplicateCheckedCount++;
										} else {
											if (tempRowSelection.hasOwnProperty(prop.row.id)) {
												duplicateCheckedCount--;
												delete tempRowSelection[prop.row.id];
											}
										}
										setCheckedCount(duplicateCheckedCount);
										// const duplicateRowSelection = { ...tempRowSelection, [prop.row.id]: e.target.checked }
										setRowSelection(tempRowSelection);
										if (isSelectAllChecked) {
											if (e.target.checked) {
												setRowCount(rowCount + 1);
											} else {
												setRowCount(rowCount - 1);
											}
										} else {
											if (selectedPage) {
												if (e.target.checked) {
													const updatedListCandidate =
														listCandidate.filter(
															(i) => i.contid === prop.row.id
														);
													if (updatedListCandidate.length > 0) {
														setSelectedPageCount(selectedPageCount + 1);
													}
												} else {
													setSelectedPageCount(selectedPageCount - 1);
												}
											}
										}
									}
								},
							})}
							renderTopToolbar={
								<span>
									<Grid
										container
										direction="row"
										justifyContent="flex-start"
										alignItems="center"
										className="actionItems"
										sx={{ width: "90% !important" }}
										columnSpacing={1}
										mb={-4.5}
									>
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
											<span
												className={`selectedCountText ${
													checkedCount === 0 ? "d-none" : "d-block"
												}`}
											>
												{/* {checkedCount} */}
												{rowPageIndex > 0 && !selectedPage
													? rowCount > 10000
														? 10000
														: rowCount
													: selectedPage
													? selectedPageCount
													: checkedCount}{" "}
												Selected
											</span>

											<ArrowDropDownIcon className="arrowDownIcon" />
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
												onClick={() => {
													selectAllMenuItemClicked("page");
													saveAuditLog(4137);
												}}
												className="menuItem"
											>
												Select this page(
												<Box component="span">{listCandidate?.length}</Box>)
											</MenuItem>
											<MenuItem
												disableRipple
												onClick={() => {
													selectAllMenuItemClicked("all");
													saveAuditLog(4138);
												}}
											>
												Select all people (
												<Box component="span">
													{rowCount > 10000 ? 10000 : rowCount}
												</Box>
												)
											</MenuItem>
											<MenuItem
												disableRipple
												onClick={() => {
													selectAllMenuItemClicked("clear");
													saveAuditLog(4139);
												}}
											>
												Clear Selection
											</MenuItem>
										</Menu>
										<ButtonGroup
											variant="outlined"
											className="quickActionButtonGroup"
										>
											{isBulkEmailSettingEnabled && (
												<Tooltip title="Email">
													<Button
														variant="outlined"
														color="secondary"
														// className="mr-2"
														//disabled={(checkedCountmerge > 0) ? false : true}
														//disabled={selectedIds.length > 0 ? (selectedIds.length === 1 ? !isEmailAvailable : false) : true}
														disabled={
															checkedCountmerge > 0 ? false : true
														}
														onClick={handleBlastEmail}
														startIcon={<MailOutlineOutlinedIcon />}
													/>
												</Tooltip>
											)}
											{isEmailSMSSettingEnabled &&
												userLocalData.isPaid() &&
												!userLocalData.isChromeExtensionEnabled() && (
													<Tooltip title="SMS">
														<Button
															variant="outlined"
															color="secondary"
															//  className="mr-2"
															disableRipple
															onClick={() => {
																setPhoneOnClicked(menuData.candId);
																setDialogPhoneStatus(true);
																setCallAnchorElement(null);
															}}
															// disabled={Object.keys(rowSelection).length > 0 ? false : true}
															disabled={
																checkedSMSCount > 0 ? false : true
															}
															startIcon={<CallOutlinedIcon />}
														/>
													</Tooltip>
												)}
											{isCampaignsEnabled && (
												<Tooltip title="Campaign">
													<Button
														variant="outlined"
														color="secondary"
														//  className="mr-2"
														//  onClick={(e) => handleTableSequence(e, '')}
														disabled={
															checkedCountmerge > 0 ? false : true
														}
														//disabled={Object.keys(rowSelection).length > 0 ? false : true}
														startIcon={<SendOutlinedIcon />}
														id="add-sequencelist-btn"
														disableRipple
														aria-controls={
															openAddToSequenceListenBtn
																? "addsequencelistmenu"
																: undefined
														}
														aria-haspopup="true"
														aria-expanded={
															openAddToSequenceListenBtn
																? "true"
																: undefined
														}
														onClick={handleClickAddToSequenceListen}
														//  endIcon={<ArrowDropDownIcon />}
													/>
												</Tooltip>
											)}
											<Menu
												id="addsequencelistmenu"
												anchorEl={addtosequencelistanchorEl}
												open={openAddToSequenceListenBtn}
												onClose={handleProfileMenuClose}
												MenuListProps={{
													"aria-labelledby": "add-sequencelist-btn",
												}}
												anchorOrigin={{
													vertical: "bottom",
													horizontal: "center",
												}}
												transformOrigin={{
													vertical: "top",
													horizontal: "center",
												}}
												PaperProps={{
													style: { overflow: "visible" },
												}}
												sx={{
													boxShadow: "0px",
													"& .MuiList-root.MuiMenu-list": {
														pt: "8px",
														pb: "15px",
														pr: "10px",
														pl: "10px",
													},
												}}
											>
												<MUIAutoComplete
													id="sequenceId1"
													handleChange={(id: any, name: string) => {
														setSelectedSequence({ id, name });
														addToTopSequenceList(id, name);
													}}
													valuePassed={
														selectedSequence.id
															? {
																	label: selectedSequence.name,
																	id: selectedSequence.id,
															  }
															: {}
													}
													isMultiple={false}
													textToShow="Select Campaign"
													width="250px"
													type="contactSequence"
													placeholder="Select Campaign"
												/>
											</Menu>

											<Tooltip title="List">
												<Button
													variant="outlined"
													color="secondary"
													size="small"
													id="add-list-btn"
													startIcon={<FormatListBulletedIcon />}
													//className="mr-2"
													onClick={handleClickAddToListen}
													disabled={
														checkedCountCampaignListMerge > 0
															? false
															: true
													}
													// disabled={Boolean(!Object.keys(rowSelection).length)}
													// endIcon={<ArrowDropDownIcon />}
												/>
											</Tooltip>
										</ButtonGroup>
										<Menu
											id="addlistmenu"
											anchorEl={addtolistanchorEl}
											open={openAddToListenBtn}
											onClose={handleProfileMenuClose}
											MenuListProps={{
												"aria-labelledby": "add-list-btn",
											}}
											anchorOrigin={{
												vertical: "bottom",
												horizontal: "center",
											}}
											transformOrigin={{
												vertical: "top",
												horizontal: "center",
											}}
											PaperProps={{
												style: { overflow: "visible" },
											}}
											sx={{
												boxShadow: "0px",
												"& .MuiList-root.MuiMenu-list": {
													pt: "8px",
													pb: "15px",
													pr: "10px",
													pl: "10px",
												},
											}}
										>
											<MUIAutoComplete
												id="contactList"
												handleChange={(id: any, name: string) => {
													setSelectedList({ id, name });
													addToList(id, name);
												}}
												valuePassed={
													selectedList.id
														? {
																label: selectedList.name,
																id: selectedList.id,
														  }
														: {}
												}
												isMultiple={false}
												textToShow="Select List"
												width="250px"
												type="contactList"
												placeholder="Select / Type to create List"
											/>
										</Menu>

										{/* 
                                        {isHiringWorkFlowEnabled && userLocalData.checkIntegration(400013) ?
                                            <Button
                                                id="add-poollist-btn"
                                                disableRipple
                                                variant="outlined"
                                                color="secondary"
                                                className="ml-2"
                                                disabled={(checkedCountCampaignListMerge === 0 || checkedCountCampaignListMerge === 2) ? false : true}
                                                // disabled={
                                                //     !(Object.keys(rowSelection).length === 0 || Object.keys(rowSelection).length === 2)
                                                // }
                                                onClick={() => { handleMergeFields(); saveAuditLog(4144); }}
                                            >
                                                Merge
                                            </Button>
                                            :
                                            null
                                        } */}

										{userLocalData.adminSettings(ID_ATS_BULLHORN) ? (
											<Button
												variant="outlined"
												color="secondary"
												id="bullhorn-btn"
												disabled={
													Object.keys(rowSelection).length > 0
														? false
														: true
												}
												disableRipple
												aria-haspopup="true"
												onClick={() => {
													publishCandidateToBullhorn();
												}}
											>
												Bullhorn
											</Button>
										) : null}

										{userLocalData.adminSettings(ID_ATS_JOBDIVA) ? (
											<Button
												variant="outlined"
												color="secondary"
												id="jobdiva-btn"
												disabled={
													Object.keys(rowSelection).length > 0
														? false
														: true
												}
												disableRipple
												aria-haspopup="true"
												onClick={() => setAddCompanyToModal(true)}
												// onClick={() => { publishCandidateToJobdiva() }}
											>
												Job Diva
											</Button>
										) : null}
										{userLocalData.adminSettings(ID_ATS_AVIONTEAPI) ? (
											<Button
												variant="outlined"
												color="secondary"
												id="Avionte-btn"
												disabled={
													Object.keys(rowSelection).length > 0
														? false
														: true
												}
												disableRipple
												aria-haspopup="true"
												onClick={() => {
													publishCandidateToAvionte();
												}}
											>
												Avionte
											</Button>
										) : null}
									</Grid>
									<Stack className="customSorting">
										<Button
											variant="outlined"
											startIcon={
												<>
													<SouthRoundedIcon
														className={sortType === "asc" ? "flip" : ""}
													/>
													<MenuIcon />
												</>
											}
											endIcon={<ArrowDropDownIcon />}
											onClick={handleSortClick}
											sx={{ width: "155px", mr: 2, ml: "auto" }}
										>
											{sortColumn === "" ? "Sort By" : sortColumn}
										</Button>
										<Popover
											id={sortId}
											open={sortOpen}
											anchorEl={sortAnchorEl}
											onClose={handleSortClose}
											anchorOrigin={{
												vertical: "bottom",
												horizontal: "center",
											}}
											transformOrigin={{
												vertical: "top",
												horizontal: "center",
											}}
										>
											<Box sx={{ p: 2, width: "200px" }}>
												<FormControl fullWidth className="mb-2">
													<label>Sort by...</label>
													<Select
														id="sortColumn"
														size="small"
														value={sortColumn}
														onChange={(e) =>
															setSortColumn(e.target.value)
														}
														className="sortingPopoverSelect"
													>
														<MenuItem value={"Name"}>Name</MenuItem>
														<MenuItem value={"Title"}>Title</MenuItem>
														<MenuItem value={"Location"}>
															{" "}
															Location
														</MenuItem>
														{/* <MenuItem value={'Status'}>Status</MenuItem> */}
														<MenuItem value={"Date"}>Date</MenuItem>
													</Select>
												</FormControl>

												<FormControl fullWidth className="mb-2">
													<Select
														id="sortType"
														size="small"
														value={sortType}
														onChange={(e) =>
															setSortType(e.target.value)
														}
														className="sortingPopoverSelect"
													>
														<MenuItem value={"asc"}>Ascending</MenuItem>
														<MenuItem value={"desc"}>
															Descending
														</MenuItem>
													</Select>
												</FormControl>
												<Button
													color="primary"
													sx={{
														width: "100% !important",
														height: "32px !important",
														textTransform: "capitalize",
														backgroundColor: "var(--c-primary-color)",
														fontWeight: 700,
														fontSize: "14px",
														fontFamily: "Segoe UI",
														color: "#ffffff",
														whiteSpace: "nowrap",
														boxShadow: "0",
														"&:hover": {
															backgroundColor: "#0852C2",
															color: "#ffffff",
															boxShadow: "0",
														},
													}}
													onClick={() => {
														setSorting([
															{
																desc:
																	sortType === "desc"
																		? true
																		: false,
																id: sortColumn.toLowerCase(),
															},
														]);
														handleSortClose();
													}}
												>
													Apply
												</Button>
											</Box>
										</Popover>
									</Stack>
								</span>
							}
						/>
					</div>
				</Grid>
			</Grid>
			{openAddContactModal ? (
				<AddContacts
					open={openAddContactModal}
					closePopup={(addOrUpdate: boolean) => {
						setEditContactData({
							contId: 0,
							firstName: "",
							lastName: "",
							contEmail: "",
							contEmail2: "",
							mobile: "",
							directPhone: "",
							compid: 0,
							linkedIn: "",
							jobTitle: "",
							department: "",
							pipelineStatus: 0,
							nle: false,
							street: "",
							city: "",
							state: "",
							stateName: "",
							country: "",
							zipcode: "",
							createdBy: userLocalData.getvalue("recrId"),
							createdDate: "",
							modifyBy: userLocalData.getvalue("recrId"),
							modifyDate: "",
							isdelete: false,
						});
						setOpenAddContactModal(false);
						if (addOrUpdate) {
							loadContactsData();
						}
					}}
					add={true}
					contactData={editContactData}
				/>
			) : null}

			{/* {
                openSequenceModal ? (
                    <Sequence
                        open={openSequenceModal}
                        closePopup={() => setOpenSequenceModal(false)}
                        selectedCandidateIds={selectSequenceList}
                    />
                ) : null
            } */}

			{addEmail && (
				<EmailDialogBox
					dialogOpen={addEmail}
					onClose={() => setAddEmail(false)}
					name={selectedName}
					emailId={selectedEmail}
					isBulkEmail={isBulkEmail}
					contactId={selectCandidList.toString()}
				/>
			)}
			{/* <Dialog
                PaperProps={{ sx: { width: "100%", height: "100%", left: 150, m: 0 } }}
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative', height: '40px' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                            sx={{ mb: 2 }}
                        >
                            <Typography>X</Typography>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Stack direction="row" spacing={2} paddingY={2} paddingLeft={4}>
                    <Avatar {...stringAvatar('Kent Dodds')} sx={{ width: 56, height: 56 }} />
                    <Typography >{selectedValue.firstName + ' ' + selectedValue.lastName}</Typography><br></br>
                </Stack>
                <Box
                    sx={{
                        width: "70%",
                        typography: "body1",
                        minHeight: "70vh",
                        overflow: "scroll",
                    }}
                >
                    <TabContext value={value}>
                        <Box sx={{ minHeight: "10vh" }}>
                            <TabList
                                onChange={handleChange}
                                aria-label="lab API tabs example"
                                sx={{
                                    fontFamily: "sans-serif",
                                    backgroundColor: "#f1e7f3",
                                    fontWeight: "500",
                                    color: "black",
                                    width: "70%",
                                    textTransform: "capitalize",
                                    "& .Mui-selected": {
                                        color: "purple",
                                        borderBottom: "2px solid purple",
                                    },
                                    position: "fixed",
                                }}
                            >
                                <Tab
                                    sx={{
                                        fontFamily: "sans-serif",
                                        fontSize: "15px",
                                        fontWeight: "600",
                                        color: "black",
                                        textTransform: "capitalize",
                                    }}
                                    label="Notes"
                                    value="1"
                                />
                                <Tab
                                    sx={{
                                        fontFamily: "sans-serif",
                                        fontSize: "15px",
                                        fontWeight: "600",
                                        color: "black",
                                        textTransform: "capitalize",
                                    }}
                                    label="Activities"
                                    value="2"
                                />
                                <Tab
                                    sx={{
                                        fontFamily: "sans-serif",
                                        fontSize: "15px",
                                        fontWeight: "600",
                                        color: "black",
                                        textTransform: "capitalize",
                                    }}
                                    label="Jobs"
                                    value="3"
                                />
                                <Tab
                                    sx={{
                                        fontFamily: "sans-serif",
                                        fontSize: "15px",
                                        fontWeight: "600",
                                        color: "black",
                                        textTransform: "capitalize",
                                    }}
                                    label="Hires"
                                    value="4"
                                />
                                <Tab
                                    sx={{
                                        fontFamily: "sans-serif",
                                        fontSize: "15px",
                                        fontWeight: "600",
                                        color: "black",
                                        textTransform: "capitalize",
                                    }}
                                    label="Edit"
                                    value="5"
                                />
                            </TabList>
                        </Box>
                        <Box
                            sx={{
                                overflowY: "scroll",
                                minHeight: "50vh",

                            }}
                        >
                            <TabPanel value="1">

                                <Button variant="text" onClick={handleClickOpen1} sx={{ marginLeft: "auto" }}>
                                    Add Notes
                                </Button>
                                {isSearch &&
                                    <Card className="text-center "
                                        sx={{ maxWidth: 345 }}
                                        style={{ height: 100 }}>
                                        <CardContent>
                                            {updated}
                                        </CardContent>
                                    </Card>
                                }
                                <div style={{ width: 150 }}>
                                    <BootstrapDialog
                                        onClose={handleClose1}
                                        aria-labelledby="customized-dialog-title"
                                        open={open1}
                                    //sx={{minWidth:"50%"}}
                                    >
                                        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose1}>
                                            Add notes about {selectedValue.firstName + " " + selectedValue.lastName}
                                        </BootstrapDialogTitle>
                                        <DialogContent dividers>
                                            <p><label >Notes Description</label></p>

                                            <TextareaAutosize
                                                minRows={10}
                                                style={{ width: "100%" }}
                                                ref={ref} />
                                        </DialogContent>
                                        <DialogActions>
                                            <Button autoFocus onClick={handleClick}>
                                                Save
                                            </Button>

                                        </DialogActions>
                                    </BootstrapDialog>
                                </div>

                            </TabPanel>
                            <TabPanel value="2">
                                Item Two
                            </TabPanel>
                            <TabPanel value="3">
                                <h4>Status Type Created Job:Title Client Job Id HM Manager Location Rate Inter Sub Client Sub FHM
                                    Interview Client React Offers</h4>
                            </TabPanel>
                            <TabPanel value="4">
                                Item four
                            </TabPanel>
                            <TabPanel value="5">
                                <h3>Contact Information</h3>
                                <Grid container spacing={2}>
                                    <Grid size={3}>
                                        <FormLabel >Person Id</FormLabel>
                                        <TextField id="outlined-basic" size='small' variant="outlined" />
                                    </Grid>
                                    <Grid size={3}>
                                        <FormLabel >Prefix</FormLabel><br></br>
                                        <TextField
                                            size='small'
                                            id='Prefix'
                                            name="prefix"
                                            select
                                            className='mb-1'
                                            sx={{ width: 195 }}
                                            margin="none"

                                        >
                                            <MenuItem value="1"> Mr.</MenuItem>
                                            <MenuItem value="2"> Mrs.</MenuItem>
                                            <MenuItem value="3"> Ms.</MenuItem>
                                            <MenuItem value="4"> Dr.</MenuItem>
                                            <MenuItem value="5"> Rev. </MenuItem>
                                            <MenuItem value="6"> Hov.</MenuItem>
                                        </TextField>
                                    </Grid>
                                    <Grid size={3}>
                                        <FormLabel >First Name</FormLabel>
                                        <TextField id="Firstname" size='small' variant="outlined" value={(selectedValue.firstName) ? selectedValue.firstName : ""} />
                                    </Grid>
                                    <Grid size={3}>
                                        <FormLabel >Middle Name</FormLabel>
                                        <TextField id="Middlename" size='small' variant="outlined" />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} mt="2px">
                                    <Grid size={3}>
                                        <FormLabel >Last Name</FormLabel>
                                        <TextField id="Lastname" size='small' variant="outlined" value={(selectedValue.lastName) ? selectedValue.lastName : ""} />
                                    </Grid>
                                    <Grid size={3}>
                                        <FormLabel >Nickname/Preferred</FormLabel>
                                        <TextField id="Nickname" size='small' variant="outlined" />
                                    </Grid>
                                    <Grid size={3}>
                                        <FormLabel >Title</FormLabel><br></br>
                                        <TextField id="Title" size='small' variant="outlined" />
                                    </Grid>
                                    <Grid size={3}>
                                        <FormLabel >Department</FormLabel>
                                        <TextField id="Department" size='small' variant="outlined" />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} mt="2px">
                                    <Grid size={3}>
                                        <FormLabel >Employer pipeline Status</FormLabel>
                                        <TextField
                                            size='small'
                                            id='EPS'
                                            name="EPS name"
                                            select
                                            className='mb-2'
                                            sx={{ width: 195 }}
                                            margin="none"
                                        >
                                            <MenuItem value="1">0:Inactive</MenuItem>
                                            <MenuItem value="2">1:Target</MenuItem>
                                            <MenuItem value="3">2:Sendouts</MenuItem>
                                            <MenuItem value="4">3:Interviewing</MenuItem>

                                        </TextField>
                                    </Grid>
                                    <Grid size={3}>
                                        <FormControlLabel control={<Checkbox />} label="nle" />
                                    </Grid>
                                    <Grid size={3}>
                                        <FormControlLabel control={<Checkbox />} label="No Bulk" />
                                    </Grid>
                                    <Grid size={3}>
                                        <FormLabel >Owner</FormLabel><br></br>
                                        <TextField
                                            size='small'
                                            id='Owner'
                                            name="Owner name"
                                            select
                                            className='mb-2'
                                            sx={{ width: 195 }}
                                            margin="none"
                                        >
                                            <MenuItem value="1"> Aditya kumar</MenuItem>
                                            <MenuItem value="2"> Akash kumar</MenuItem>
                                            <MenuItem value="3"> Mastan vali</MenuItem>
                                            <MenuItem value="4"> Sunil yekulla</MenuItem>
                                            <MenuItem value="5"> Adam jones</MenuItem>
                                            <MenuItem value="6"> Adi kulakarni</MenuItem>
                                            <MenuItem value="7"> Akash Mehra</MenuItem>

                                        </TextField>
                                    </Grid>
                                </Grid>
                                <h3>Work Contact Information</h3>
                                <Grid container spacing={2} mt="2px">
                                    <Grid size={3}>
                                        <FormLabel >Phone</FormLabel><br></br>
                                        <TextField id="outlined-basic" size='small' variant="outlined" value={(selectedValue.directPhone)} />
                                    </Grid>
                                    <Grid size={3}>
                                        <FormLabel >Phone</FormLabel><br></br>
                                        <TextField id="outlined-basic" size='small' variant="outlined" />
                                    </Grid>
                                    <Grid size={3}>
                                        <FormLabel >Phone</FormLabel><br></br>
                                        <TextField id="outlined-basic" size='small' variant="outlined" />
                                    </Grid>
                                    <Grid size={3}>
                                        <FormLabel >Phone</FormLabel><br></br>
                                        <TextField id="outlined-basic" size='small' variant="outlined" />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} mt="2px">
                                    <Grid size={3}>
                                        <TextField
                                            size='small'
                                            id='EPS'
                                            name="EPS option"
                                            select
                                            className='mb-2'
                                            label='Phone Type'
                                            sx={{ width: 195 }}
                                            margin="none"
                                        >
                                            <MenuItem value="1">Phone Type</MenuItem>
                                            <MenuItem value="2">Mobile</MenuItem>
                                            <MenuItem value="3">Work-Direct</MenuItem>
                                            <MenuItem value="4">Corporate Phone</MenuItem>

                                        </TextField>
                                    </Grid>
                                    <Grid size={3}>
                                        <TextField
                                            size='small'
                                            id='Phone'
                                            name="Phone number"
                                            select

                                            label='Phone Type'
                                            sx={{ width: 195 }}
                                            margin="none"
                                        >
                                            <MenuItem value="1">Phone Type</MenuItem>
                                            <MenuItem value="2">Mobile</MenuItem>
                                            <MenuItem value="3">Work-Direct</MenuItem>
                                            <MenuItem value="4">Corporate Phone</MenuItem>

                                        </TextField>
                                    </Grid>
                                    <Grid size={3}>
                                        <TextField
                                            size='small'
                                            id='phone1'
                                            name="phone type"
                                            select

                                            label='Phone Type'
                                            sx={{ width: 195 }}
                                            margin="none"
                                        >
                                            <MenuItem value="1">Phone Type</MenuItem>
                                            <MenuItem value="2">Mobile</MenuItem>
                                            <MenuItem value="3">Work-Direct</MenuItem>
                                            <MenuItem value="4">Corporate Phone</MenuItem>

                                        </TextField>
                                    </Grid>
                                    <Grid size={3}>
                                        <TextField
                                            size='small'
                                            id='phone2'
                                            name="phone type"
                                            select

                                            label='Phone Type'
                                            sx={{ width: 195 }}
                                            margin="none"
                                        >
                                            <MenuItem value="1">Phone Type</MenuItem>
                                            <MenuItem value="2">Mobile</MenuItem>
                                            <MenuItem value="3">Work-Direct</MenuItem>
                                            <MenuItem value="4">Corporate Phone</MenuItem>

                                        </TextField>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} mt="2px">
                                    <Grid size={3}>
                                        <TextField
                                            size='small'
                                            id='NoStatus'
                                            name="No Status"
                                            select

                                            label='No Status'
                                            sx={{ width: 195 }}
                                            margin="none"
                                        >
                                            <MenuItem value="1">No Status</MenuItem>
                                            <MenuItem value="2">Verified</MenuItem>
                                            <MenuItem value="3">Questionable</MenuItem>
                                            <MenuItem value="4">Not Working</MenuItem>

                                        </TextField>
                                    </Grid>
                                    <Grid size={3}>
                                        <TextField
                                            size='small'
                                            id='NoStatus'
                                            name="No Status"
                                            select

                                            label='No Status'
                                            sx={{ width: 195 }}
                                            margin="none"
                                        >
                                            <MenuItem value="1">No Status</MenuItem>
                                            <MenuItem value="2">Verified</MenuItem>
                                            <MenuItem value="3">Questionable</MenuItem>
                                            <MenuItem value="4">Not Working</MenuItem>

                                        </TextField>
                                    </Grid>
                                    <Grid size={3}>
                                        <TextField
                                            size='small'
                                            id='NoStatus'
                                            name="No Status"
                                            select

                                            label='No Status'
                                            sx={{ width: 195 }}
                                            margin="none"
                                        >
                                            <MenuItem value="1">No Status</MenuItem>
                                            <MenuItem value="2">Verified</MenuItem>
                                            <MenuItem value="3">Questionable</MenuItem>
                                            <MenuItem value="4">Not Working</MenuItem>

                                        </TextField>
                                    </Grid>
                                    <Grid size={3}>
                                        <TextField
                                            size='small'
                                            id='NoStatus'
                                            name="No Status"
                                            select

                                            label='No Status'
                                            sx={{ width: 195 }}
                                            margin="none"
                                        >
                                            <MenuItem value="1">No Status</MenuItem>
                                            <MenuItem value="2">Verified</MenuItem>
                                            <MenuItem value="3">Questionable</MenuItem>
                                            <MenuItem value="4">Not Working</MenuItem>

                                        </TextField>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} mt="2px">
                                    <Grid size={3}>
                                        <FormLabel >Email</FormLabel><br></br>
                                        <TextField id="outlined-basic" size='small' variant="outlined" value={selectedValue.contEmail} />
                                    </Grid>
                                    <Grid size={3}>
                                        <FormLabel >Alternate Email</FormLabel>
                                        <TextField id="outlined-basic" size='small' variant="outlined" />
                                    </Grid>
                                    <Grid size={3}>
                                        <FormLabel >Reports To</FormLabel>
                                        <TextField id="outlined-basic" size='small' variant="outlined" />
                                    </Grid>
                                    <Grid size={3}>
                                        <FormLabel >Linkedin</FormLabel>
                                        <TextField id="outlined-basic" size='small' variant="outlined" />
                                    </Grid>
                                </Grid>
                                <h3>Alternate Bussiness Address</h3>
                                <Grid container spacing={2} >
                                    <Grid size={6} >
                                        <FormLabel >Office Location Name</FormLabel><br></br>
                                        <TextField id="outlined-basic" size='small' variant="outlined" />
                                    </Grid>
                                    <Grid size={6}>
                                        <FormLabel >Street Address</FormLabel><br></br>
                                        <TextField id="outlined-basic" size='small' variant="outlined" />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} mt="2px">
                                    <Grid size={3}>
                                        <FormLabel >City</FormLabel><br></br>
                                        <TextField id="outlined-basic" size='small' variant="outlined" />
                                    </Grid>
                                    <Grid size={3}>
                                        <FormLabel >State or Prov.</FormLabel>
                                        <TextField id="outlined-basic" size='small' variant="outlined" />
                                    </Grid>
                                    <Grid size={3}>
                                        <FormLabel >Zip Code</FormLabel>
                                        <TextField id="outlined-basic" size='small' variant="outlined" />
                                    </Grid>
                                    <Grid size={3}>
                                        <FormLabel >Country</FormLabel>
                                        <TextField id="outlined-basic" size='small' variant="outlined" />
                                    </Grid>
                                </Grid>
                                <h3>Msp Programs</h3>
                                <Grid container spacing={2} >
                                    <Grid size={12}>
                                        <FormLabel >Companies</FormLabel><br></br>
                                        <TextField id="outlined-basic" size='small' variant="outlined" fullWidth />
                                    </Grid>
                                </Grid>
                            </TabPanel>

                        </Box>
                    </TabContext>
                </Box>

            </Dialog> */}

			<Menu
				id={`mail-${menuData.rowId}`}
				anchorEl={TableMailOpen}
				open={openTableMail && selectedRowId === `${menuData.rowId}`}
				onClose={handleTableClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "center",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
				MenuListProps={{
					"aria-labelledby": `mailbutton-${menuData.rowId}`,
				}}
				sx={{
					"& .MuiPaper-root.MuiMenu-paper.MuiPopover-paper": {
						minWidth: "250px",
					},
				}}
			>
				<Stack sx={{ p: 1.5 }}>
					<Stack
						sx={{
							display: "flex",
							flexDirection: "row",
							mb: 0.5,
						}}
					>
						<Typography
							sx={{
								fontSize: "16px",
								fontFamily: "Segoe UI",
								fontWeight: 600,
								color: "#1A1A1A",
							}}
						>
							{menuData.contEmail}
						</Typography>
						<ContentCopyRoundedIcon
							onClick={() => {
								Copy.text(`${menuData.contEmail}`, "Email");
								setTableOpenMail(null);
							}}
							sx={{
								color: "#737373",
								fontSize: "20px",
								pl: 0.5,
								cursor: "pointer",
							}}
						/>
					</Stack>

					<Typography
						sx={{
							fontSize: "14px",
							fontFamily: "Segoe UI",
							fontWeight: 600,
							color: "#1DB268",
							mb: 0.5,
						}}
					>
						Email is Verified
					</Typography>

					<Stack
						sx={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							mb: 0.5,
						}}
						direction="row"
						spacing={1}
					>
						<Typography
							sx={{
								fontSize: "14px",
								fontFamily: "Segoe UI",
								fontWeight: 400,
								color: "#1A1A1A",
							}}
						>
							Business
						</Typography>

						<Box
							sx={{
								height: "6px",
								width: "6px",
								backgroundColor: "#cacccc",
								borderRadius: "50%",
							}}
						></Box>

						<Typography
							sx={{
								fontSize: "14px",
								fontFamily: "Segoe UI",
								fontWeight: 400,
								color: "#1A1A1A",
							}}
						>
							Primary
						</Typography>
					</Stack>

					<Stack
						sx={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Button
							variant="outlined"
							id={menuData.contEmail}
							disableRipple
							onClick={() => {
								handleTableMenuSendMailOpen(menuData.contEmail);
							}}
							sx={{
								width: "40%",
								whiteSpace: "nowrap",
								textTransform: "capitalize",
								color: "#1A1A1A",
								borderColor: "var(--c-secondary-color)",
								fontSize: "14px",
								fontFamily: "Segoe UI",
								fontWeight: "700",
								"&:hover": {
									color: "var(--c-primary-color)",
									backgroundColor: "#ffffff",
									borderColor: "var(--c-primary-color)",
									boxShadow: 0,
								},
							}}
						>
							Send Email
						</Button>
					</Stack>
				</Stack>
			</Menu>

			{dialogStatus && (
				<EmailDialogBox
					dialogOpen={dialogStatus}
					onClose={() => setDialogStatus(false)}
					name={menuData.first?.toLowerCase()}
					emailId={emailOnClicked}
					contactId={menuData.candId}
					jobId={menuData.jobId}
				/>
			)}

			<Menu
				id={`mobile-${menuData.rowId}`}
				anchorEl={callAnchorElement}
				open={openCallMenu && selectedRowId === `${menuData.rowId}`}
				onClose={handleTableClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "center",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
				MenuListProps={{
					"aria-labelledby": `phonebutton-${menuData.rowId}`,
				}}
				sx={{
					"& .MuiPaper-root.MuiMenu-paper.MuiPopover-paper": {
						minWidth: "250px",
					},
				}}
			>
				<Stack sx={{ mb: 1, p: 1 }}>
					<Typography
						sx={{
							fontSize: "12px",
							fontFamily: "Segoe UI",
							fontWeight: 400,
							color: "#1A1A1A",
						}}
					>
						Mobile Number
					</Typography>
					<Box
						component="div"
						sx={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							mb: 1.5,
						}}
					>
						<Typography
							sx={{
								fontSize: "14px",
								fontFamily: "Segoe UI",
								fontWeight: 600,
								color: "#1A1A1A",
							}}
						>
							{menuData.mobile ? `${menuData.mobile}` : ""}
						</Typography>
						<ContentCopyRoundedIcon
							sx={{
								color: "#737373",
								fontSize: "20px",
								pl: 0.5,
							}}
							onClick={() => {
								Copy.text(`${menuData.mobile}`, "Phone Number");
								setCallAnchorElement(null);
							}}
						/>
					</Box>

					<Button
						variant="contained"
						disableRipple
						onClick={() => {
							setPhoneOnClicked(menuData.mobile);
							setDialogPhoneStatus(true);
							setCallAnchorElement(null);
						}}
						sx={{
							textTransform: "capitalize",
							backgroundColor: "var(--c-primary-color)",
							fontWeight: 700,
							fontSize: "14px",
							fontFamily: "Segoe UI",
							color: "#ffffff",
							height: "32px",
							width: "45%",
							whiteSpace: "nowrap",
							boxShadow: "0",
							"&:hover": {
								backgroundColor: "#0852C2",
								color: "#ffffff",
								boxShadow: "0",
							},
						}}
						startIcon={<CallOutlinedIcon />}
					>
						SMS
					</Button>
				</Stack>
			</Menu>

			{dialogPhoneStatus ? (
				<PhoneDialog
					dialogOpen={dialogPhoneStatus}
					onClose={() => setDialogPhoneStatus(false)}
					name={menuData.first?.toLowerCase()}
					toPhone={phoneOnClicked}
					candidateId={menuData.candId}
					jobId={menuData.jobId}
					contactId={
						!!Object.keys(rowSelection)?.length
							? Object.keys(rowSelection).join(",")
							: ""
					}
				/>
			) : null}
			{openMergeFields ? (
				<MergeContacts
					open={openMergeFields}
					closePopup={(bool: any) => {
						if (bool) {
							setRowSelection({});
							loadContactsData();
						}
						setOpenMergeFields(false);
					}}
					contactsData={contactsToMerge}
				/>
			) : null}

			{addCompanyToModal ? (
				<AddCompanyToModal
					dialogOpen={addCompanyToModal}
					closePopup={() => {
						setAddCompanyToModal(false);
						setRowSelection({});
					}}
					contactId={Object.keys(rowSelection).map((n) => Number(n))}
					moveToJobDiva={true}
					saveJobDiva={(data: any) => {}}
					type={"contact"}
				/>
			) : null}
		</div>
	);
};

export default FindContacts;
