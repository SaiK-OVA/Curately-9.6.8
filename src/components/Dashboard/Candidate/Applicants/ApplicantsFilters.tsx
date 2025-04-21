import { useState, SyntheticEvent, useEffect, useRef } from "../../../../shared/modules/React";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
} from "./../../../../shared/modules/MaterialImports/Accordion";
import { Typography } from "./../../../../shared/modules/MaterialImports/Typography";
import { Stack } from "./../../../../shared/modules/MaterialImports/Stack";
// import TextField from './../../../../shared/modules/MaterialImports/TextField';
import { Chip } from "./../../../../shared/modules/MaterialImports/Chip";
import { Button } from "./../../../../shared/modules/MaterialImports/Button";
// import Autocomplete from './../../../../shared/modules/MaterialImports/Autocomplete';
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import SubtitlesOutlinedIcon from "@mui/icons-material/SubtitlesOutlined";
import CloseIcon from "@mui/icons-material/Close";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
// import ClearIcon from "@mui/icons-material/Clear";
import masterStatesList from "../../../../shared/data/States";
// import Paper from './../../../../shared/modules/MaterialImports/Paper';
// import ApiService from "../../../../shared/api/api";
import "./ApplicantsFilters.scss";
import { MUIAutoComplete } from "../../../shared/MUIAutoComplete/MUIAutoComplete";
import { Tooltip } from "./../../../../shared/modules/MaterialImports/ToolTip";
import { userLocalData } from "../../../../shared/services/userData";

import { Radio, RadioGroup } from "./../../../../shared/modules/MaterialImports/FormElements";
import {
	FormControlLabel,
	TextField,
} from "./../../../../shared/modules/MaterialImports/FormInputs";
// import { v4 as uuidv4 } from 'uuid';
import { useSearchParams } from "react-router-dom";
// import { showToaster } from '../../../shared/SnackBar/SnackBar';
// import { useDebounce } from '../../../../shared/services/useDebounce';
// import { debounce } from "lodash";
// import { useCallback } from 'react';
import ApiService from "../../../../shared/api/api";
// import { number } from 'yup';
import MailOutlineIcon from "@mui/icons-material/MailOutline";

export interface jobFilterProps {
	onSearch: any;
	filters: any;
	recrIdPassed: string;
}

export interface searchData {
	name: string;
	job: string;
	state: string[];
	status: string;
	statusName: string;
	searchByRecruiter: boolean;
	recrId: string;
	email: string;
}

// const statesList = masterStatesList;

// const statusList: any = [
//     // { value: "1", label: "Lead" },
//     // { value: "2", label: "Not reviewed" },
//     // { value: "3", label: "Contacted" },
//     // { value: "4", label: "Presented" },
//     // { value: "5", label: "Interviewing" },
//     // { value: "6", label: "Offer Made" },
//     // { value: "7", label: "Onboarding" },
//     // { value: "8", label: "On Assignment" },
//     // { value: "9", label: "Past Contractor" },
//     // { value: "10", label: "Do Not Hire" },

//     { value: "-1", "label": "New" },
//     { value: "0", "label": "View" },
//     { value: "50", "label": "Not Qualified" },
//     { value: "100", "label": "Submitted" },
//     { value: "200", "label": "Shortlist" },
//     { value: "300", "label": "Interview" },
//     { value: "350", "label": "Client Reject" },
//     { value: "400", "label": "Offer" },
//     { value: "500", "label": "Start" },
//     { value: "550", "label": "Bad Delivery" }

//     // { value: "0", label: "New" },
//     // { value: "1", label: "View" },
//     // { value: "2", label: "Shortlist" },
//     // { value: "3", label: "Contacted" },
//     // { value: "4", label: "Pipeline" },
//     // { value: "5", label: "Not Interested" },
//     // { value: "6", label: "Not Available" },
//     // { value: "7", label: "Submitted by Competition" },
//     // { value: "8", label: "Internal Submission" },
//     // { value: "9", label: "Call First" },
//     // { value: "10", label: "Not Qualified" },
//     // { value: "11", label: "Client Submission" },
//     // { value: "12", label: "Interview Requested" },
//     // { value: "13", label: "Offer Made" },
//     // { value: "14", label: "Forward to HM" },
//     // { value: "15", label: "Placement" },
//     // { value: "16", label: "Bad Delivery" },
//     // { value: "17", label: "Off Market" },
//     // { value: "18", label: "Internal Reject" },
//     // { value: "19", label: "Client Reject" },
//     // { value: "20", label: "1st Round Interview" },
//     // { value: "21", label: "2nd Round Interview" },
//     // { value: "22", label: "Interview No Show" },
//     // { value: "23", label: "Start" },
//     // { value: "24", label: "3rd Round Interview" },
//     // { value: "25", label: "Final Round Interview" },
//     // { value: "26", label: "Direct Offer" },
//     // { value: "27", label: "Initiate Onboard" },
//     // { value: "28", label: "Withdrawn" },
//     // { value: "29", label: "Offer Rescinded" },
//     // { value: "30", label: "Clone" },
//     // { value: "31", label: "AM/RM Approved" },
//     // { value: "32", label: "AM/RM Left MSG" },
// ];

const ApplicantsFilters = ({ onSearch, filters, recrIdPassed }: jobFilterProps) => {
	// const { id } = useParams();

	const [searchParams, setSearchParams] = useSearchParams();

	const filtersSearchId = useRef(searchParams.get("id") ? searchParams.get("id") : "");

	const filtersDataFromSession: searchData = sessionStorage.getItem(
		"applicants_" + filtersSearchId.current
	)
		? (JSON.parse(sessionStorage.getItem("applicants_" + filtersSearchId.current) as string)
			?.filters as searchData)
		: {
			name: "",
			job: "",
			state: [],
			status: "",
			statusName: "",
			searchByRecruiter: false,
			recrId: recrIdPassed,
			email: "",
		};

	const [expanded, setExpanded] = useState<string | false>(false);
	const [searchData, setSearchData] = useState<searchData>({
		name: filtersDataFromSession?.name ? filtersDataFromSession?.name : "",
		job: filtersDataFromSession?.job ? filtersDataFromSession?.job : "",
		state: filtersDataFromSession?.state ? filtersDataFromSession?.state : [],
		status: filtersDataFromSession?.status ? filtersDataFromSession?.status : "",
		statusName: filtersDataFromSession?.statusName ? filtersDataFromSession?.statusName : "",
		searchByRecruiter: filtersDataFromSession?.searchByRecruiter
			? filtersDataFromSession?.searchByRecruiter
			: false,
		recrId: filtersDataFromSession?.recrId ? filtersDataFromSession?.recrId : "",
		email: filtersDataFromSession?.email ? filtersDataFromSession?.email : "",
	});
	// const [jobTitleList, setJobTitleList] = useState([]);
	// const [nameList, setNameList] = useState([]);
	// const [statusNameList, setStatusNameList] = useState<{
	//     value: string;
	//     label: string;
	// }[]>([]);
	const [selectedJobTab, setSelectedJobTab] = useState(
		filtersDataFromSession?.recrId || recrIdPassed ? "my" : "all"
	);
	// const debouncedSearchByName = useDebounce((searchTerm) => {
	//     loadList('name', searchTerm);
	// }, 400);

	// const debouncedSearchByJob = useDebounce((searchTerm) => {
	//     loadList('title', searchTerm);
	// }, 400);

	// const clientId = userLocalData.getvalue('clientId');

	// const CustomPaper = (props: any) => {
	//     return <Paper elevation={3} {...props} sx={{
	//         '& .MuiAutocomplete-option': {
	//             fontWeight: '600',
	//             color: 'var(--c-text-header)'
	//         }
	//     }} />;
	// };

	const inputRef = useRef<HTMLInputElement>(null);
	//input ref
	const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
		setExpanded(isExpanded ? panel : false);
		// Focus the input if the panel is expanded
		if (isExpanded) {
			// Delay the focus slightly to ensure the panel is fully expanded
			setTimeout(() => {
				inputRef.current?.focus();
			}, 0);
		}
	};

	const handleClearAll = () => {
		setSearchData({
			name: "",
			job: "",
			state: [],
			status: "",
			statusName: "",
			searchByRecruiter: false,
			recrId: selectedJobTab === "my" ? recrIdPassed : "",
			email: "",
		});
		onSearch({
			name: "",
			job: "",
			state: [],
			status: "",
			statusName: "",
			searchByRecruiter: false,
			recrId: selectedJobTab === "my" ? recrIdPassed : "",
			email: "",
		});
	};

	const getStateById = (id: string) => {
		let tempObj = masterStatesList.find((obj) => {
			return obj.id === id;
		});
		return tempObj && tempObj.label ? tempObj.label : "";
	};

	const handleClear = (key: string, e?: SyntheticEvent, i?: number) => {
		e?.stopPropagation();

		if (key === "state") {
			if (i === undefined) {
				setSearchData({
					...searchData,
					[key as keyof typeof searchData]: [],
				});
				onSearch({
					...searchData,
					[key as keyof typeof searchData]: [],
				});
			} else {
				let newStateList = [...searchData.state];
				newStateList.splice(i, 1);
				setSearchData({
					...searchData,
					state: newStateList,
				});
				onSearch({
					...searchData,
					state: newStateList,
				});
			}
		} else if (key === "statusName" || key === "status") {
			setSearchData({
				...searchData,
				statusName: "",
				status: "",
			});
			onSearch({
				...searchData,
				statusName: "",
				status: "",
			});
		} else if (key === "job") {
			setSearchData({
				...searchData,
				job: "",
			});
			onSearch({
				...searchData,
				job: "",
			});
		} else if (key === "name") {
			setSearchData({
				...searchData,
				name: "",
			});
			onSearch({
				...searchData,
				name: "",
			});
		} else {
			setSearchData({
				...searchData,
				[key as keyof typeof searchData]: "",
			});
			onSearch({
				...searchData,
				[key as keyof typeof searchData]: "",
			});
		}
	};

	// const handleStatesChange = (value: string) => {
	//     setSearchData({
	//         ...searchData,
	//         state: value ? value.split(',') : [""]
	//     })
	// }
	const handleStatesChange = (value: string) => {
		const newStateArray = value ? value.split(",") : [];
		setSearchData((prev) => ({ ...prev, state: newStateArray }));
		onSearch({ ...searchData, state: newStateArray });
	};

	// const getStatusById = (id: string) => {
	//     //console.log(statusNameList);
	//     let tempObj = statusNameList.find((obj: any) => {
	//         return obj.value === id
	//     });
	//     // console.log(tempObj);
	//     return (tempObj && tempObj.label) ? tempObj.label : ""
	// }
	const handleStatusChange = (value: string, name: string) => {
		// let SName = getStatusById(value);
		//console.log("SName " + SName);
		setSearchData({
			...searchData,
			status: value ? value : "",
			statusName: name ? name : "",
		});
		onSearch({ ...searchData, status: value, statusName: name });
	};

	const handleJobTitleChange = (value: string) => {
		setSearchData((prevState) => ({
			...prevState,
			job: value,
		}));
		onSearch({ ...searchData, job: value });
	};
	const handleNameChange = (value: string) => {
		setSearchData((prevState) => ({
			...prevState,
			name: value,
		}));
		onSearch({ ...searchData, name: value });
	};

	const handleEmailChange = (value: string) => {
		setSearchData((prevState) => ({
			...prevState,
			email: value,
		}));
		onSearch({ ...searchData, email: value });
	};

	const searchJobs = () => {
		const data = {
			name: searchData.name,
			job: searchData.job,
			state: searchData.state,
			status: searchData.status,
			statusName: searchData.statusName,
			searchByRecruiter: searchData.searchByRecruiter,
			recrId: recrIdPassed,
			email: searchData.email,
		};
		onSearch(data);
	};

	// const handleStatusChange = (val: any) => {
	//     setSearchData({
	//         ...searchData,
	//         status: val.value,
	//         statusName: val.label
	//     })
	// }

	// const loadList = useCallback(debounce((filterName: string, keyValue: string) => {
	//     const data = {
	//         filterName: filterName,
	//         filterValue: keyValue,
	//         clientId: userLocalData.getvalue('clientId'),
	//         recrId: (selectedJobTab === "all") ? "" : userLocalData.getvalue('recrId')
	//     };

	//     ApiService.postWithData("admin", 'applicantsAutomation', data).then(
	//         (result: any) => {
	//             if (filterName === 'title') {
	//                 setJobTitleList(result.data);
	//                 // setSearchData({
	//                 //     ...searchData,
	//                 //     job: keyValue
	//                 // })
	//             } else if (filterName === 'names') {
	//                 setNameList(result.data)
	//                 // setSearchData({
	//                 //     ...searchData,
	//                 //     name: keyValue
	//                 // })
	//             } else {
	//                 // console.log(result.data)
	//             }
	//             console.log("value : " + result.data);
	//         }

	//     )
	//     if (filterName === 'statusName') {
	//         let SName = getStatusById(keyValue);
	//         setSearchData({
	//             ...searchData,
	//             status: keyValue,
	//             statusName: SName
	//         })
	//     }
	// }, 400), []);

	// useEffect(() => {
	//     if (!searchParams.get('id')) {
	//         let v4Id = uuidv4();
	//         setSearchParams({ id: v4Id });
	//         filtersSearchId.current = v4Id;
	//     } else {
	//         filtersSearchId.current = searchParams.get('id') as string;
	//         if (sessionStorage.getItem('applicants_' + filtersSearchId.current)) {
	//             filtersSearchData.current = JSON.parse(sessionStorage.getItem('applicants_' + filtersSearchId.current) as string);
	//             isFirstTimeLoad.current = true;
	//         }

	//     }
	// }, []);

	useEffect(() => {
		setSearchData({
			name: filters.name,
			job: filters.job,
			state: filters.state,
			status: filters.status,
			statusName: filters.statusName,
			searchByRecruiter: filters.searchByRecruiter,
			recrId: filters.recrId,
			email: filters.email,
		});
	}, [
		filters.name,
		filters.job,
		filters.state,
		filters.status,
		filters.statusName,
		filters.searchByRecruiter,
		filters.recrId,
		filters.email,
	]);

	// useEffect(() => {
	//     // http://52.88.252.214:90/QADemoCurately/getshortListBarStages/3
	//     ApiService.getCall(214, 'getshortListBarStages/' + userLocalData.getvalue('clientId')).then((result) => {
	//         const response = result.data.shortlistBarStages
	//         const StatusName = response.map((i: { statusId: string, label: string }) => ({ value: i.statusId, label: i.label }))
	//         setStatusNameList(StatusName)

	//     })
	// }, []);

	// const fetchShortListBarStages = useCallback(
	//     debounce(async () => {
	//         try {
	//             const result = await ApiService.getCall(214, `getshortListBarStages/${clientId}`);
	//             const response = result.data.shortlistBarStages;
	//             const StatusName = response.map((i: any) => ({
	//                 value: i.statusId,
	//                 label: i.label,
	//             }));
	//             setStatusNameList(StatusName);
	//         } catch (error) {
	//             console.error('Error fetching shortlist bar stages:', error);
	//         }
	//     }, 600),
	//     [clientId]
	// );

	// useEffect(() => {
	//     fetchShortListBarStages();
	//     return () => {
	//         fetchShortListBarStages.cancel();
	//     };
	// }, [fetchShortListBarStages]);

	// const [selectedJobTab, setSelectedJobTab] = useState('all');

	const applicantsTabChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedJobTab((event.target as HTMLInputElement).value);
		setSearchData({
			...searchData,
			searchByRecruiter: (event.target as HTMLInputElement).value === "my" ? true : false,
			recrId:
				(event.target as HTMLInputElement).value === "my"
					? userLocalData.getvalue("recrId")
					: "",
			job: "",
		});
		// setSearchData({
		//     ...searchData,
		// })
		onSearch({
			...searchData,
			searchByRecruiter: (event.target as HTMLInputElement).value === "my" ? true : false,
			recrId:
				(event.target as HTMLInputElement).value === "my"
					? userLocalData.getvalue("recrId")
					: "",
			job: "",
		});
	};
	// const activeCriteriaCount =
	//     (searchData.name !== "" ? 1 : 0) +
	//     (searchData.job !== "" ? 1 : 0) +
	//     searchData.state.length +
	//     (searchData.status !== "" ? 1 : 0);

	// const handleApplyFilters = () => {
	//     if (activeCriteriaCount < 1) {
	//         showToaster('Please select any search criteria', 'error');
	//     } else {
	//         searchJobs();

	//     }
	// };

	const saveAuditLog = (id: number) => {
		ApiService.saveAuditLog(id);
	};

	return (
		<div id="ApplicantsFilters">
			<div className="accordian-wrap customFilterChips">
				<RadioGroup
					row
					aria-labelledby="jobsByRecruiter"
					name="jobsByRecruiter"
					value={selectedJobTab}
					onChange={applicantsTabChange}
					className="pl-3"
				>
					<FormControlLabel value="all" control={<Radio />} label="All Jobs" />
					<FormControlLabel value="my" control={<Radio />} label="My Jobs" />
				</RadioGroup>
				<Stack direction="row" justifyContent="space-between" className="heading">
					<Stack direction="row" spacing={1} alignItems="center">
						<Typography component="h5">Filters</Typography>
						{(searchData.name !== "" ||
							searchData.job !== "" ||
							searchData.state.length > 0 ||
							searchData.status !== "" ||
							searchData.email !== "") && (
								<Stack
									className="clearStack"
									direction="row"
									justifyContent="space-around"
									onClick={handleClearAll}
								>
									<CloseIcon />
									<Typography>
										{(searchData.name !== "" ? 1 : 0) +
											(searchData.job !== "" ? 1 : 0) +
											searchData.state.length +
											(searchData.status !== "" ? 1 : 0) +
											(searchData.email !== "" ? 1 : 0)}
									</Typography>
								</Stack>
							)}
					</Stack>
				</Stack>
				<div className="filterListTab">
					<Accordion
						disableGutters
						square
						expanded={expanded === "panel1"}
						onChange={handleChange("panel1")}
					>
						<AccordionSummary
							expandIcon={<ArrowDropDownIcon />}
							aria-controls="panel1bh-content"
							id="panel1bh-header"
						>
							<Stack sx={{ width: "100%" }}>
								<Stack
									className="acc-title"
									direction="row"
									justifyContent="space-between"
								>
									<Stack direction="row" alignItems="center">
										<AccountBoxOutlinedIcon className="title-icon" />
										<Typography>Name</Typography>
									</Stack>
									{searchData.name !== "" && (
										<Stack
											className="clearStack"
											direction="row"
											justifyContent="space-around"
											onClick={(event) => handleClear("name", event)}
										>
											<CloseIcon />
											<Typography>
												{searchData.name !== "" ? 1 : 0}
											</Typography>
										</Stack>
									)}
								</Stack>
								{searchData.name !== "" && expanded !== "panel1" && (
									<Stack direction="row" mt={1} flexWrap="wrap">
										<div className="filterLabelName">Name:</div>
										{/* {searchData.name !== "" && <Chip label={searchData.name} icon={<CloseIcon />} className='selectedChips' onClick={(event) => handleClear("name", event)} />
                                        } */}
										<Chip
											label={searchData.name}
											icon={<CloseIcon />}
											onClick={(event) => handleClear("name", event)}
										/>
									</Stack>
								)}
							</Stack>
						</AccordionSummary>
						<AccordionDetails>
							{/* <MUIAutoComplete
								id="appName"
								handleChange={(id: any, name: string | any) => {
									// if (name !== "") {
									setSearchData({
										...searchData,
										name: name,
									});
									handleNameChange(name);
									saveAuditLog(3899);
									// }
								}}
                                
								valuePassed={{ id: searchData.name, label: searchData.name }}
								// valuePassed={searchData.name}
								// value={searchData.name}
								isMultiple={false}
								width="100%"
								type="applicantName"
								placeholder="Name"
								refToPass={expanded === "panel1" ? inputRef : null}
                                
							/> */}

							<MUIAutoComplete
								id="appName"
								handleChange={(id: any, name: string | any) => {
									let condArr = [undefined, null];
									if (!condArr.includes(id) || !condArr.includes(name)) {
										if ([0, "0"].includes(id)) {
											handleNameChange(name);
										} else {
											setSearchData({
												...searchData,
												name: name,
											});
											handleNameChange(name);
											saveAuditLog(3899);
										}
									}
								}}
								addOnEnter={true}
								valuePassed={searchData.name ? { label: searchData.name, id: searchData.name } : {}}
								isMultiple={false}
								width="100%"
								type="applicantName"
								placeholder="Name"
								refToPass={expanded === "panel1" ? inputRef : null}
							/>



							{/* <Autocomplete
                                id="name"
                                options={nameList.map((option: any) => option)}
                                value={searchData.name}
                                freeSolo
                                renderTags={(value: readonly string[], getTagProps) =>
                                    value.map((option: any, index: number) => (
                                        <Chip variant="outlined" label={option.label} {...getTagProps({ index })} />
                                    ))
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        inputRef={expanded === 'panel1' ? inputRef : null}
                                        variant="outlined"
                                        placeholder="Enter name..."
                                        autoFocus={expanded === 'panel1' ? true : false}
                                        InputProps={{
                                            ...params.InputProps,
                                            // type: 'search',
                                        }}

                                    />
                                )}
                                PaperComponent={CustomPaper}
                                onChange={(event, value) => (value ? handleNameChange(value) : "")}
                                onInputChange={(event, value, reason) => {
                                    if (reason === 'input') {
                                        if (value !== "") debouncedSearchByName(value);
                                    }
                                }}

                                clearIcon={<ClearIcon fontSize="small" onClick={(event) => handleClear("name", event)} />}
                            /> */}
						</AccordionDetails>
					</Accordion>
					<Accordion
						disableGutters
						square
						expanded={expanded === "panel2"}
						onChange={handleChange("panel2")}
					>
						<AccordionSummary
							expandIcon={<ArrowDropDownIcon />}
							aria-controls="panel2bh-content"
							id="panel2bh-header"
						>
							<Stack sx={{ width: "100%" }}>
								<Stack
									className="acc-title"
									direction="row"
									justifyContent="space-between"
								>
									<Stack direction="row" alignItems="center">
										<WorkOutlineOutlinedIcon className="title-icon" />
										<Typography>Job</Typography>
									</Stack>
									{searchData.job !== "" && (
										<Stack
											className="clearStack"
											direction="row"
											justifyContent="space-around"
											onClick={(event) => handleClear("job", event)}
										>
											<CloseIcon />
											<Typography>{searchData.job !== "" ? 1 : 0}</Typography>
										</Stack>
									)}
								</Stack>
								{searchData.job !== "" && expanded !== "panel2" && (
									<Stack direction="row" mt={1} flexWrap="wrap">
										<div className="filterLabelName">Title:</div>
										<Tooltip title={`${searchData.job}`} placement="bottom">
											<Chip
												label={searchData.job}
												icon={<CloseIcon />}
												className="selectedChips"
												onClick={(event) => handleClear("job", event)}
											/>
										</Tooltip>
									</Stack>
								)}
							</Stack>
						</AccordionSummary>
						<AccordionDetails>
							<MUIAutoComplete
								id="appJob"
								handleChange={(id: any, name: string) => {
									// if (name !== "") {
									setSearchData({
										...searchData,
										job: name,
									});
									handleJobTitleChange(name);
									saveAuditLog(3900);
									// }
								}}
								valuePassed={{ id: searchData.job, label: searchData.job }}
								// value={searchData.name}
								isMultiple={false}
								recrId={
									selectedJobTab === "all" ? "" : userLocalData.getvalue("recrId")
								}
								width="100%"
								type="applicantJobTitle"
								placeholder="Job Title"
								refToPass={expanded === "panel2" ? inputRef : null}
							/>
							{/* <Autocomplete
                                id="job"
                                options={jobTitleList.map((option: any) => option)}
                                value={searchData.job}
                                freeSolo
                                renderTags={(value: readonly string[], getTagProps) =>
                                    value.map((option: any, index: number) => (
                                        <Chip variant="outlined" label={option.label} {...getTagProps({ index })} />
                                    ))
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        inputRef={expanded === 'panel2' ? inputRef : null}
                                        variant="outlined"
                                        placeholder="Enter job title..."
                                        autoFocus={expanded === 'panel2' ? true : false}
                                        InputProps={{
                                            ...params.InputProps,
                                            // type: 'search',
                                        }}
                                    />
                                )}
                                PaperComponent={CustomPaper}
                                onChange={(event, value) => (value ? handleJobTitleChange(value) : "")}
                                onInputChange={(event, value, reason) => {
                                    if (reason === 'input') {
                                        if (value !== "") debouncedSearchByJob(value);
                                    }
                                }}

                                clearIcon={
                                    <ClearIcon fontSize="small" onClick={(event) => handleClear("job", event)} />}
                            /> */}
						</AccordionDetails>
					</Accordion>

					<Accordion
						disableGutters
						square
						expanded={expanded === "panel5"}
						onChange={handleChange("panel5")}
					>
						<AccordionSummary
							expandIcon={<ArrowDropDownIcon />}
							aria-controls="panel5bh-content"
							id="panel5bh-header"
						>
							<Stack sx={{ width: "100%" }}>
								<Stack
									className="acc-title"
									direction="row"
									justifyContent="space-between"
								>
									<Stack direction="row" alignItems="center">
										<MailOutlineIcon className="title-icon" />
										<Typography>Email</Typography>
									</Stack>
									{searchData.email !== "" && (
										<Stack
											className="clearStack"
											direction="row"
											justifyContent="space-around"
											onClick={(event) => handleClear("email", event)}
										>
											<CloseIcon />
											<Typography>
												{searchData.email !== "" ? 1 : 0}
											</Typography>
										</Stack>
									)}
								</Stack>
								{searchData.email !== "" && expanded !== "panel5" && (
									<Stack direction="row" mt={1} flexWrap="wrap">
										<div className="filterLabelName">Email:</div>
										<Tooltip title={`${searchData.email}`} placement="bottom">
											<Chip
												label={searchData.email}
												icon={<CloseIcon />}
												className="selectedChips"
												onClick={(event) => handleClear("email", event)}
											/>
										</Tooltip>
									</Stack>
								)}
							</Stack>
						</AccordionSummary>
						<AccordionDetails>
							<TextField
								id="email-input"
								label="Enter Email"
								variant="outlined"
								size="small"
								fullWidth
								value={searchData.email}
								onChange={(e: any) => handleEmailChange(e.target.value)}
								placeholder="Enter a valid email"

							/>
						</AccordionDetails>
					</Accordion>

					<Accordion
						disableGutters
						square
						expanded={expanded === "panel3"}
						onChange={handleChange("panel3")}
					>
						<AccordionSummary
							expandIcon={<ArrowDropDownIcon />}
							aria-controls="panel3bh-content"
							id="panel3bh-header"
						>
							<Stack sx={{ width: "100%" }}>
								<Stack
									className="acc-title"
									direction="row"
									justifyContent="space-between"
								>
									<Stack direction="row" alignItems="center">
										<PlaceOutlinedIcon className="title-icon" />
										<Typography>Location</Typography>
									</Stack>
									{searchData.state.length > 0 && (
										<Stack
											className="clearStack"
											direction="row"
											justifyContent="space-around"
											onClick={(event) => handleClear("state", event)}
										>
											<CloseIcon />
											<Typography>{searchData.state.length}</Typography>
										</Stack>
									)}
								</Stack>
								{expanded !== "panel3" && (
									<Stack mt={1} flexWrap="wrap">
										{searchData.state.length > 0 && (
											<div className="mb-1">
												<Typography className="filterLabelName">
													States:
												</Typography>
												{searchData.state.map((item: any, i: number) => (
													<Chip
														label={item}
														key={i}
														icon={<CloseIcon />}
														className="selectedChips"
														onClick={(event) =>
															handleClear("state", event, i)
														}
													/>
												))}
											</div>
										)}
									</Stack>
								)}
							</Stack>
						</AccordionSummary>
						<AccordionDetails>
							{/* <Autocomplete
                                multiple
                                id="tags-filled"
                                options={statesList.map((option) => option.label)}
                                value={searchData.state}
                                freeSolo
                                renderTags={(value: readonly string[], getTagProps) =>
                                    value.map((option: string, index: number) => (
                                        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                    ))
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        placeholder="Enter state..."
                                    />
                                )}
                                PaperComponent={CustomPaper}
                                onChange={(event, value) => (value ? handleStatesChange(value) : "")}
                                sx={{ mb: 1 }}
                                clearIcon={<ClearIcon fontSize="small" onClick={(event) => handleClear("state", event)} />}
                            /> */}
							<MUIAutoComplete
								id="state"
								handleChange={(id: any, name: string) => {
									handleStatesChange(id);
									getStateById(id);
									saveAuditLog(3901);
									// console.log(id);
								}}
								valuePassed={
									Array.isArray(searchData.state)
										? {
											label: searchData.state.join(),
											id: searchData.state.join(),
										}
										: searchData.state
											? {
												label: getStateById(searchData.state),
												id: searchData.state,
											}
											: {}
								}
								isMultiple={true}
								// width="200px"
								type="states"
								placeholder="Select the states"
								refToPass={expanded === "panel3" ? inputRef : null}
							/>
						</AccordionDetails>
					</Accordion>
					<Accordion
						disableGutters
						square
						expanded={expanded === "panel4"}
						onChange={handleChange("panel4")}
					>
						<AccordionSummary
							expandIcon={<ArrowDropDownIcon />}
							aria-controls="panel4bh-content"
							id="panel4bh-header"
						>
							<Stack sx={{ width: "100%" }}>
								<Stack
									className="acc-title"
									direction="row"
									justifyContent="space-between"
								>
									<Stack direction="row" alignItems="center">
										<SubtitlesOutlinedIcon className="title-icon" />
										<Typography>Status</Typography>
									</Stack>
									{searchData.statusName.length > 0 && (
										<Stack
											className="clearStack"
											direction="row"
											justifyContent="space-around"
											onClick={(event) => handleClear("statusName", event)}
										>
											<CloseIcon />
											<Typography>
												{searchData.statusName !== "" && 1}
											</Typography>
										</Stack>
									)}
								</Stack>
								{searchData.statusName !== "" && expanded !== "panel4" && (
									<Stack direction="row" mt={1} flexWrap="wrap">
										<div className="filterLabelName">status:</div>
										<Chip
											label={searchData.statusName}
											icon={<CloseIcon />}
											onClick={(event) => handleClear("statusName", event)}
										/>
									</Stack>
								)}
							</Stack>
						</AccordionSummary>
						<AccordionDetails>
							<MUIAutoComplete
								id="status"
								handleChange={(id: any, name: string) => {
									handleStatusChange(id, name);
									// console.log(id);
									saveAuditLog(3902);
								}}
								valuePassed={
									Array.isArray(searchData.status)
										? {
											label: searchData.status.join(),
											id: searchData.status.join(),
										}
										: searchData.status
											? { label: searchData.statusName, id: searchData.status }
											: {}
								}
								isMultiple={false}
								// width="200px"
								type="status"
								placeholder="Select the Status"
								refToPass={expanded === "panel4" ? inputRef : null}
								callApiOnce={true}
							/>
							{/* <Autocomplete
                                id="status"
                                options={statusNameList.map((option: any) => option)}
                                value={searchData.statusName}
                                freeSolo
                                renderTags={(value: readonly string[], getTagProps) =>
                                    value.map((option: any, index: number) => (
                                        <Chip variant="outlined" label={option.label} {...getTagProps({ index })} />
                                    ))
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        inputRef={statusInputRef}
                                        variant="outlined"
                                        placeholder="Select Status..."
                                        autoFocus={expanded === 'panel4' ? true : false}
                                        InputProps={{
                                            ...params.InputProps,
                                            // type: 'search',
                                        }}
                                    />
                                )}
                                PaperComponent={CustomPaper}
                                onChange={(event, value) => (value ? handleStatusChange(value) : "")}
                                //onKeyUp={(e: any) => loadList('statusName',  e.target.value)}
                                clearIcon={<ClearIcon fontSize="small" onClick={(event) => handleClear("statusName", event)} />}
                            /> */}
						</AccordionDetails>
					</Accordion>
				</div>
			</div>
			{/* 
            {(activeCriteriaCount > 1) && (
                <Stack
                    className='clearStack'
                    direction="row"
                    justifyContent="space-around"
                    onClick={handleClearAll}
                >
                    <CloseIcon />
                    <Typography>{activeCriteriaCount}</Typography>
                </Stack>
            )} */}

			<div className="filterBtnWrap">
				<Button
					variant="text"
					onClick={() => {
						saveAuditLog(3903);
						searchJobs();
					}}
				>
					Apply Filters
				</Button>
			</div>
		</div>
	);
};

export default ApplicantsFilters;
