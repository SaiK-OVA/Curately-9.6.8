import { React, useState, useMemo, useEffect, useRef } from "../../../../shared/modules/React";
import { Button, Grid, IconButton, FormControl } from '../../../../shared/modules/commonImports';
import { Typography } from "../../../../shared/modules/MaterialImports/Typography";
import { Stack } from "../../../../shared/modules/MaterialImports/Stack";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_SortingState,
} from "../../../../shared/modules/MaterialReactTable";
import { DateTime } from "../../../../shared/modules/Luxon";
import { showToaster } from "../../../shared/SnackBar/SnackBar";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import { Box } from "../../../../shared/modules/MaterialImports/Box";
import { Checkbox } from "../../../../shared/modules/MaterialImports/FormElements";
import { Menu } from "../../../../shared/modules/MaterialImports/Menu";
import { MenuItem } from "../../../../shared/modules/MaterialImports/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SwitchLeftIcon from "@mui/icons-material/SwitchLeft";
// import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
// import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ApplicantsFilters, { searchData } from "./ApplicantsFilters";
import ApiService from "../../../../shared/api/api";
// import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
// import { styled } from '@mui/material/styles';
// import { globalData } from "../../../../shared/services/globalData";
import { Chip } from "../../../../shared/modules/MaterialImports/Chip";
import { Popover } from "../../../../shared/modules/MaterialImports/Popover";
import { Select } from "../../../../shared/modules/MaterialImports/FormElements";
import { Tooltip } from "../../../../shared/modules/MaterialImports/ToolTip";
import { CircularProgress } from "../../../../shared/modules/MaterialImports/CircularProgress";
import MenuIcon from "@mui/icons-material/Menu";
import SouthRoundedIcon from "@mui/icons-material/SouthRounded";
import TuneIcon from "@mui/icons-material/Tune";
import { trackPromise } from "../../../../shared/modules/PromiseTrackter";
import { userLocalData } from "../../../../shared/services/userData";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { MUIAutoComplete } from "../../../shared/MUIAutoComplete/MUIAutoComplete";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import EmailDialogBox from "../../../shared/EmailDialogBox/EmailDialogBox";
import PhoneDialog from "../../../shared/PhoneDialog/PhoneDialog";
// import Sequence from "../../Job/View/Sourced/PopUps/Sequence/Sequence";
import CustomPagination from "../../../shared/CustomPagination/CustomPagination";
// import { debounce } from "lodash";
// import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { DataCollectionQAsDialog, OpenDataCollectionQAs } from "../../Job/Workflow/DataCollectionQAs";
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import { v4 as uuidv4 } from 'uuid';
import "./Applicants.scss";
import { useParams } from 'react-router-dom';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
// import Link from '@mui/material/Link';

// import { Class } from "@mui/icons-material";
// import { CommonImages } from "../../../../shared/images/CommonImages";

// const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
//     height: 7,
//     borderRadius: 5,
//     [`&.${linearProgressClasses.colorPrimary}`]: {
//         backgroundColor: '#cfcfcf',
//         width: 'calc(100% - 30px)',
//         marginLeft: '10px'
//     },
//     [`& .${linearProgressClasses.bar}`]: {
//         borderRadius: 5,
//         backgroundColor: 'rgb(224,195,45)',
//         background: 'linear-gradient(90deg, rgba(224,195,45,1) 0%, rgba(224,195,45,1) 36%, rgba(58,114,21,1) 100%)'
//     },
// }));

// interface Pagination {
//   pageIndex: number;
//   pageSize: number;
// }

interface Candidate {
  jobId: number;
  firstName: string;
  lastName: string;
  [key: string]: any;
}

interface RowSelectionType {
  [key: string]: boolean;
}
import { useSearchParams, Link } from 'react-router-dom';
// import NewLayout from "./NewLayout";
import NewLayoutMenu from "./NewLayoutMenu";
import Parsable from "../../../../shared/utils/Parsable";
import { ButtonGroup } from "@mui/material";

const Applicants = () => {
  const isBullHornSettingEnabled = userLocalData.adminSettings(20043);
  const isVoiceAISettingEnabled = userLocalData.adminSettings(20044);
  // const isEvaluteSettingEnabled = userLocalData.adminSettings(20046);	


  const isCampaignsEnabled = userLocalData.adminSettings(20024);
  const isAvionteAPISettingEnabled = userLocalData.adminSettings(20045);
  const isJobDivaAPISettingEnabled = userLocalData.adminSettings(20047);

  const [searchParams, setSearchParams] = useSearchParams();
  const { recrId } = useParams();

  const filtersSearchId = useRef(searchParams.get('id') ? searchParams.get('id') as string : "");
  const filtersSearchData = useRef({
    total: 0,
    filter: {
      name: "",
      job: "",
      state: [],
      status: '',
      statusName: '',
      searchByRecruiter: false
    },
    data: [],
    sort: {
      column: "Date",
      type: "desc"
    }
  });
  const isFirstTimeLoad = useRef(false);

  useEffect(() => {
    // getAllLayoutData();
    loadLayoutData();
    if (!searchParams.get('id')) {
      let v4Id = uuidv4();
      setSearchParams({ id: v4Id });
      filtersSearchId.current = v4Id;
    } else {
      filtersSearchId.current = searchParams.get('id') as string;
      if (sessionStorage.getItem('applicants_' + filtersSearchId.current)) {
        filtersSearchData.current = JSON.parse(sessionStorage.getItem('applicants_' + filtersSearchId.current) as string);
        isFirstTimeLoad.current = true;
      }
    }
  }, []);
  const [applicantsData, setApplicantsData] = useState<any>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionType>({});
  const [applicantsRowSelection, setApplicantsRowSelection] = useState<RowSelectionType>({});
  const [dataLoading, setDataLoading] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  // const [pageCount, setPageCount] = useState(0);
  const [allPageCount, setAllPageCount] = useState(0);
  // const [rowPageIndex, setRowPageIndex] = useState(0);
  const [checkedCounts, setCheckedCount] = useState(0);
  // const [selectedPage, setSelectedPage] = useState(false);
  const dataToPass = useRef<any>({});
  const [menuType, setMenuType] = useState<string | null>(null);
  const [openNewLayoutModal, setOpenNewLayoutModal] = useState(false);
  const layoutRef = useRef(null);


  const handlePaginationChange = (newPageIndex: any) => {
    setPagination({ ...pagination, pageIndex: newPageIndex });

    if (menuType !== "all") {
      setRowSelection({});
      setApplicantsRowSelection({});
      setCheckedCount(0);
      setSelectedRowCount(0);
      // setSelectedPage(false);
      setIsSelectAllChecked(false);

    }
  };

  const filtersDataFromSession: searchData = sessionStorage.getItem('applicants_' + filtersSearchId.current) ? JSON.parse(sessionStorage.getItem('applicants_' + filtersSearchId.current) as string)?.filters as searchData : {
    name: "",
    job: "",
    state: [],
    status: '',
    statusName: '',
    searchByRecruiter: false,
    recrId: "",
    email: ""
  };
  const [filters, setFilters] = useState({
    name: filtersDataFromSession?.name ? filtersDataFromSession?.name : "",
    job: filtersDataFromSession?.job ? filtersDataFromSession?.job : "",
    state: filtersDataFromSession?.state ? filtersDataFromSession?.state : [],
    status: filtersDataFromSession?.status ? filtersDataFromSession?.status : '',
    statusName: filtersDataFromSession?.statusName ? filtersDataFromSession?.statusName : '',
    searchByRecruiter: filtersDataFromSession?.searchByRecruiter ? filtersDataFromSession?.searchByRecruiter : false,
    recrId: filtersDataFromSession?.recrId ? filtersDataFromSession?.recrId : recrId ? recrId : "",
    email: filtersDataFromSession?.email ? filtersDataFromSession?.email : "",

  });
  const [selectAllElement, setSelectAllElement] = useState<null | HTMLElement>(
    null
  );
  const [pagination, setPagination] = useState({
    pageIndex: sessionStorage.getItem('applicants_' + filtersSearchId.current) ? JSON.parse(sessionStorage.getItem('applicants_' + filtersSearchId.current) as string)?.page as string ? Number(JSON.parse(sessionStorage.getItem('applicants_' + filtersSearchId.current) as string)?.page as string) : 0 : 0,
    pageSize: 25, //customize the default page size
  });
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const openSelectAllMenu = Boolean(selectAllElement);
  const openSelectAll = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSelectAllElement(event.currentTarget);
  };
  // const checkedCount = Object.keys(rowSelection).length;
  const checkedCount = checkedCounts;
  const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);
  const someAreChecked = !isSelectAllChecked && checkedCount ? true : false;
  const [filtersExpand, setFiltersExpand] = useState(false);
  const [sortAnchorEl, setSortAnchorEl] =
    React.useState<HTMLButtonElement | null>(null);

  const sortDataFromSession: { column: string; type: string } = sessionStorage.getItem('applicants_' + filtersSearchId.current) ? JSON.parse(sessionStorage.getItem('applicants_' + filtersSearchId.current) as string)?.sort as { column: string; type: string } : {
    column: "",
    type: ""
  };
  const [sortColumn, setSortColumn] = useState(sortDataFromSession?.column ? sortDataFromSession?.column : "Date");
  const [sortType, setSortType] = useState(sortDataFromSession?.type ? sortDataFromSession?.type : "desc");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [isBulkEmail, setIsBulkEmail] = useState(false);
  const [addEmail, setAddEmail] = useState(false);
  const [selectCandidList, setSelectCandidList] = useState<any>([]);
  const [selectedSMS, setSelectedSMS] = useState("");
  const [isBulkSMS, setIsBulkSMS] = useState(false);
  const [addSMS, setAddSMS] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState("");
  const [addtosequencelistanchorEl, setAddToSequenceListAnchorEl] =
    useState<null | HTMLElement>(null);
  const openAddToSequenceListenBtn = Boolean(addtosequencelistanchorEl);
  // const [addtolistanchorEl, setAddToListAnchorEl] = useState<null | HTMLElement>(null);
  const [addtopoollistanchorEl, setAddToPoolListAnchorEl] =
    useState<null | HTMLElement>(null);
  // const [TableListOpen, setTableOpenList] = useState<null | HTMLElement>(null);
  const [selectedSequence, setSelectedSequence] = useState({
    id: "",
    name: "",
  });
  const [selectedTalentPool, setSelectedTalentPool] = useState({
    id: "",
    name: "",
  });
  // const [openSequenceModal, setOpenSequenceModal] = useState(false);
  // const [menuData, setMenuData] = useState({
  //   rowId: "",
  //   email: "",
  //   first: "",
  //   candId: "",
  //   jobId: "",
  //   phone: "",
  //   poolCount: 0,
  //   poolIds: [],
  //   poolNames: [],
  //   sequenceIds: [],
  //   sequenceNames: [],
  //   sequenceCount: 0,
  //   linkedIn: "",
  // });

  const openAddToPoolListenBtn = Boolean(addtopoollistanchorEl);

  // console.log(recrId, "parm..");
  // const [anchorElNewLayout, setAnchorElNewLayout] = React.useState<HTMLButtonElement | null>(null);

  // const handleClose = () => {
  //   setAnchorElNewLayout(null);
  // };


  // const open = Boolean(anchorElNewLayout);
  // const newId = open ? 'simple-popover' : undefined;


  const currentSelectCount = useRef(0);
  const [selectedRowCount, setSelectedRowCount] = useState(0);
  const [layoutData, setLayoutData] = useState<any[]>([]);
  // const [checkedColumnsList, setCheckedColumnsList] = useState<{ name: string, isactive: boolean, key: string, checked: boolean, type: string }[]>([]);
  const [orderedColumnsList, setOrderedColumnsList] = useState<{ name: string, isactive: boolean, key: string, checked: boolean, type: string }[]>([]);
  const [menuLayoutColumns, setMenuLayoutColumns] = useState<{ name: string, isactive: boolean, key: string, checked: boolean, type: string }[]>([]);
  const [isLayoutFetched, setIsLayoutFetched] = useState(false);
  const pinnedColumn = { "name": "Name", "key": "firstName,lastName" };

  const loadLayoutData = () => {
    let data = localStorage.getItem("applicants_layout");
    if (data && Parsable.isJSON(data)) {

      let { allLayoutData, orderedLayoutData } = JSON.parse(data);
      setLayoutData([...allLayoutData]);
      setOrderedColumnsList([...orderedLayoutData]);
      setMenuLayoutColumns([...orderedLayoutData]);
      setIsLayoutFetched(true);

    } else getAllLayoutData();
  }

  // const getAllLayoutData = () => {
  //   const requestData = {
  //     clientId: userLocalData.getvalue("clientId"),
  //     // userId: userLocalData.getvalue("recrId"),
  //   };
  //   trackPromise(
  //     ApiService.getByParams("admin", "applicantsLayout", requestData)
  //       .then((response: any) => {
  //         if (response.data.Success) {
  //           setLayoutData(response?.data?.layoutDetails || []);
  //           getLayoutDataByRecrId(response?.data?.layoutDetails || []);
  //         } else {
  //           showToaster((response.data.Message) ? response.data.Message : "An error occured while saving the Candidate.", 'error');
  //           setIsLayoutFetched(true);
  //         }
  //       })
  //   )
  // };

  const getAllLayoutData = () => {
    trackPromise(
      ApiService.postWithData("admin", "getApplicantsLayout", {
        clientId: userLocalData.getvalue('clientId'),
        userId: userLocalData.getvalue('recrId')
      }).then(
        (response: any) => {
          if (response.data.Success === true) {
            let layoutJson = response.data?.layoutJson || [];
            let layoutDetails = response.data?.layoutDetails || [];
            setLayoutData(layoutDetails || []);

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
              setOrderedColumnsList([...finalColumnsList]);
              setMenuLayoutColumns([...finalColumnsList]);
              localStorage.setItem("applicants_layout", JSON.stringify({
                allLayoutData: layoutDetails, orderedLayoutData: finalColumnsList
              }))

            } else {
              const finalColumnsList = layoutDetails.map((each: any) => ({
                ...each,
                checked: each.isactive
              }));
              setOrderedColumnsList([...finalColumnsList]);
              setMenuLayoutColumns([...finalColumnsList]);
              localStorage.setItem("applicants_layout", JSON.stringify({
                allLayoutData: layoutDetails, orderedLayoutData: finalColumnsList
              }))
            }

            // if (!!layoutJson?.length && !!allLayoutData?.length) {
            //   // Handling ordered data based on all data
            //   let orderedData = layoutJson.map((each: any) => {
            // let column = allLayoutData.find((item: any) => item?.name === each?.name) || undefined;
            // return {
            //   name: column?.name ? column.name : each.name,
            //   key: column?.key ? column.key : each.key,
            //   isactive: column?.isactive ? column?.isactive : false,
            //   checked: column?.isactive ? column.isactive : ((each?.name && each?.key) ? true : false),
            //   type: column?.type ? column?.type : "STRING"
            // }
            //   });

            //   //Handling ordered data along with default columns from all data
            //   let defaultData = allLayoutData.filter((each) => {
            //     return orderedData.every((data: any) => each.name !== data.name)
            //   }).filter((each) => each.isactive).map((each) => ({
            //     name: each.name, key: each.key, isactive: true, checked: true, type: each?.type ? each?.type : "STRING"
            //   }));

            //   let finalCheckedList = orderedData.concat(defaultData)
            //   setCheckedColumnsList(finalCheckedList);

            // } else if (!!layoutJson?.length) {

            //   let tempLayoutList = layoutJson.map((each: any) => ({
            //     name: each.name,
            //     key: each.key,
            //     isactive: false,
            //     checked: ((each?.name && each?.key) ? true : false),
            //     type: "STRING"
            //   }));
            //   setCheckedColumnsList(() => tempLayoutList.filter((each: any) => each.checked));

            // } else if (!!allLayoutData?.length) {

            //   let tempLayoutList = allLayoutData.map((each: any) => ({
            //     name: each.name,
            //     key: each.key,
            //     isactive: each.isactive,
            //     checked: each.isactive,
            //     type: each?.type ? each?.type : "STRING"
            //   }));
            //   setCheckedColumnsList(() => tempLayoutList.filter((each: any) => each.checked));
            // } else return;
            setIsLayoutFetched(true);
          } else {
            showToaster((response.data.Message) ? response.data.Message : "An error occured while Fetching Layout Data.", 'error');
            setIsLayoutFetched(true);
          }
        }
      ))

  }

  const handleSortClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setSortAnchorEl(null);
    setPagination({
      pageIndex: 0,
      pageSize: pagination.pageSize, //customize the default page size
    });

    currentSelectCount.current = 0;
  };

  const sortOpen = Boolean(sortAnchorEl);
  const sortId = sortOpen ? "simple-popover" : undefined;

  const toggleFilers = () => {
    setFiltersExpand(!filtersExpand);
  };

  const formatPoolData = (id: string, name: string, candidateId: string) => {
    let tempData: any = applicantsData;

    for (let index = 0; index < applicantsData.length; index++) {
      if (tempData[index].candId === candidateId) {
        tempData[index].poolCount = tempData[index].poolCount + 1;
        const arrPoolIds = tempData[index].poolIds;
        tempData[index].poolIds = [...arrPoolIds, id];

        const arrPoolNames = tempData[index].poolNames;
        tempData[index].poolNames = [...arrPoolNames, name];
      }
    }

    console.log(tempData)
    setApplicantsData([...tempData]);
  };

  // const openJobView = (id: string) => {
  //   window.open(globalData.getWindowLocation() + "job/view/" + id);
  // };

  const publishApplicantToAvionte = () => {

    let bodyRequest = {
      "atsName": "Avionte",
      "clientId": userLocalData.getvalue('clientId'),
      "recruiterId": userLocalData.getvalue('recrId'),
      "moduleName": "Applicant",
      "curatelyIds": Object.entries(applicantsRowSelection).filter(([key, value]) => value).map(([key]) => key),
    }

    // const keysWithTrueValue = Object.keys(rowSelection).filter(id => Boolean(rowSelection[id]));
    //if (keysWithTrueValue.length === 1) {
    // https://adminapi.cxninja.com/bullhorn-service-dev/job/%7BclientId%7D/%7BjobId%7D
    ApiService.postWithData('ats', `ats/post`, bodyRequest).then((response) => {
      if (response.data.Success) {
        showToaster(`Applicant is Publshed successfully`, 'success');
        setRowSelection({});
        setApplicantsRowSelection({});
        setCheckedCount(0);
        setSelectedRowCount(0);
        setIsSelectAllChecked(false);
        loadApplicantsData();
      } else {
        showToaster((response.data.Message) ? response.data.Message : "Unable to Publish Applicant to Avionte", 'error');
      }
    }).catch(error => {
      showToaster(error.message ? error.message : "Unable to Publish Applicant to Avionte", 'error');
    });
    // }        
  }

  // Job Diva publish Submission

  const publishApplicantToJobDiva = () => {

    let bodyRequest = {
      "atsName": "Jobdiva",
      "clientId": userLocalData.getvalue('clientId'),
      "recruiterId": userLocalData.getvalue('recrId'),
      "moduleName": "Applicant",
      "curatelyIds": Object.entries(applicantsRowSelection).filter(([key, value]) => value).map(([key]) => key),
    }

    ApiService.postWithData('ats', `ats/post`, bodyRequest).then((response) => {
      if (response.data.Success) {
        showToaster(`Applicant is Publshed successfully`, 'success');
        setRowSelection({});
        setApplicantsRowSelection({});
        setCheckedCount(0);
        setSelectedRowCount(0);
        setIsSelectAllChecked(false);
        loadApplicantsData();
      } else {
        showToaster((response.data.Message) ? response.data.Message : "Unable to Publish Applicant to Jobdiva", 'error');
      }
    }).catch(error => {
      showToaster(error.message ? error.message : "Unable to Publish Applicant to Jobdiva", 'error');
    });

  }


  // Bullhorn publish job Submission

  const publishApplicantToBullhorn = () => {

    let bodyRequest = {
      "atsName": "Bullhorn",
      "clientId": userLocalData.getvalue('clientId'),
      "recruiterId": userLocalData.getvalue('recrId'),
      "moduleName": "Applicant",
      "curatelyIds": Object.entries(applicantsRowSelection).filter(([key, value]) => value).map(([key]) => key),
    }


    // const keysWithTrueValue = Object.keys(applicantsRowSelection).filter(id => Boolean(applicantsRowSelection[id]));
    // if (keysWithTrueValue.length === 1) {
    // https://adminapi.cxninja.com/bullhorn-service-dev/job/%7BclientId%7D/%7BjobId%7D
    ApiService.postWithData('ats', `ats/post`, bodyRequest).then((response) => {
      if (response.data.Success) {
        showToaster(`Applicant is Publshed successfully`, 'success');
        setRowSelection({});
        setApplicantsRowSelection({});
        setCheckedCount(0);
        setSelectedRowCount(0);
        setIsSelectAllChecked(false);
        loadApplicantsData();
      } else {
        showToaster((response.data.Message) ? response.data.Message : "Unable to Publish Applicant to BullHorn", 'error');
      }
    }).catch(error => {
      showToaster(error.message ? error.message : "Unable to Publish Applicant to BullHorn", 'error');
    });
    //}
  }


  const addToTalentPool = (
    id: string,
    name: string,
    filteredApplicantIds: string
  ) => {
    if (name && name.trim()) {
      handleProfileMenuClose();
      // const saveData = {
      //     poolId: id,
      //     poolName: name,
      //     candId: candidateId,
      //     createdBy: userLocalData.getvalue('recrId'),
      //     clientId: userLocalData.getvalue('clientId')
      // }
      const saveData = {
        clientId: userLocalData.getvalue("clientId"),
        poolId: id,
        recrId: userLocalData.getvalue("recrId"),
        userIds: filteredApplicantIds,
      };

      // ApiRequests.postWithData(214, 'savetalentpool', saveData)
      trackPromise(
        // https://www4.accuick.com/Accuick_API/Curately/talent_pool_insert_index.jsp?clientId=2&poolId=23&recrId=61&userIds=22362
        ApiService.postWithData(
          "admin",
          "talentPoolInsertIndex",
          saveData
        ).then((response: any) => {
          handleProfileMenuClose();
          if (response.data.Message === "Success") {
            showToaster("Pool has been assigned successfully", "success");
            //    console.log("after : "+ tempData);
            //    loadCanidateData();
            let candidateIds = filteredApplicantIds.split(",");
            !!candidateIds?.length &&
              candidateIds.map((candId: string) => {
                formatPoolData(id, name, candId);
              });
          } else {
            showToaster(
              response.data.Message
                ? response.data.Message
                : "An error occured while assigning ",
              "error"
            );
          }
          setSelectedTalentPool({ id: "", name: "" });
        })
      );
    }
  };

  // const openCandidateView = (id: string, jobId: string) => {
  //   window.open(globalData.getWindowLocation() + "candidate/view/" + id.trim() + "/" + jobId);
  // };

  const addToTopTalentPool = (id: string, name: string) => {
    const selectedIds = Object.keys(applicantsRowSelection).filter(
      (key) => applicantsRowSelection[key]
    );
    if (Object.keys(applicantsRowSelection).length > 0) {
      if (name && name.trim()) {
        setSelectedTalentPool({ id: id, name: name });
        handleProfileMenuClose();
        const filteredApplicants = applicantsData.filter((candidate: any) =>
          selectedIds.includes(candidate.applicantId)
        );
        const filteredApplicantIds = filteredApplicants.map((candidate: any) =>
          candidate.candId
          // candidate.candId.replace(/\s+/g, "")
        );
        addToTalentPool(id, name, filteredApplicantIds.join(","));
      }
    } else {
      showToaster("Select atleast one Candidate", "error");
    }
  };

  const columns: MRT_ColumnDef<any>[] = useMemo(
    () => {

      const defaultColumns = [
        {
          accessorKey: "name", //simple recommended way to define a column
          header: "Name",
          accessorFn: (row: any) => `${row.firstName} ${row.lastName}`,
          Cell: ({ row }: any) => {
            // <span
            //   className="hightLightTd"
            //   onClick={() =>
            //     openCandidateView(row.original.candId, row.original.jobId)
            //   }
            // >
            //   {row.original.firstName.toLowerCase().trim() +
            //     " " +
            //     row.original.lastName.toLowerCase()}
            // </span>
            return <Link to={`../../candidate/view/${row.original.candId}/${row.original.jobId}`} className="hightLightTd" state={{
              data: [{
                text: "Search",
                link: `../../resume/applicants`
              }, {
                text: "Applicants",
                link: `../../resume/applicants?id=${filtersSearchId.current}`
              },
              {
                text: `${row.original.firstName.toLowerCase().trim() + " " + row.original.lastName.toLowerCase()}`,
                link: ``
              }]
            }} >
              {row.original.firstName.toLowerCase().trim() + " " + row.original.lastName.toLowerCase()}
            </Link>
          },
          size: 100,
          enableColumnPinning: true,
          enableSorting: false,
          enableHiding: true,
          columnVisibility: false

        },
        {
          accessorKey: "jobTitle",
          header: "Job",
          Cell: ({ row }: any) => {
            let jobTitle = row.original.jobTitle
              ? row.original.jobTitle.toLowerCase()
              : "";
            let displayTitle =
              jobTitle.length > 30 ? jobTitle.slice(0, 30) + "..." : jobTitle;
            return (
              <Tooltip title={jobTitle} classes={{ tooltip: "tt-capital" }}>
                {/* <span className="hightLightTd" onClick={() => openJobView(row.original.jobId)}> {displayTitle} </span> */}
                <Link to={`../../job/view/${row.original.jobId}`} className="hightLightTd" state={{
                  data: [{
                    text: "Search",
                    link: `../../resume/applicants`
                  }, {
                    text: "Applicants",
                    link: `../../resume/applicants?id=${filtersSearchId.current}`
                  },
                  {
                    text: `${displayTitle}`,
                    link: ``
                  }]
                }}>
                  {displayTitle}
                </Link>
              </Tooltip>
            );
          },
          enableSorting: false,

        },

        {
          accessorKey: "score",
          header: "Match Score",
          Cell: ({ row }: any) =>
            row.original.hasOwnProperty("score") ? (
              <Box sx={{ position: "relative", display: "inline-flex" }}>
                <CircularProgress
                  variant="determinate"
                  value={Math.round(row.original.score)}
                />
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="caption"
                    component="div"
                    color="text.secondary"
                  >{`${Math.round(row.original.score)}%`}</Typography>
                </Box>
              </Box>
            ) : null,
          // <Stack direction="row" alignItems="center">
          //     <span style={{ fontSize: 13 }}>{Number(row.original.score)}%</span>
          //     <BorderLinearProgress variant="determinate" value={Number(row.original.score)} sx={{ maxWidth: '150px' }} />
          // </Stack>
          enableSorting: false,
          size: 150,
        },
        {
          accessorKey: "statusName",
          header: "Status",
          size: 80,
          enableSorting: false,

        },
        {
          accessorKey: "date",
          header: "Date",
          Cell: ({ row }: any) => (
            <span>
              {DateTime.fromFormat(
                row.original.date.substring(0, 19),
                "yyyy-MM-dd"
              ).toFormat("MM/dd/yyyy")}
            </span>
          ),
          //size: 3105.55
          enableSorting: false,

        },

        {
          accessorKey: "document",
          header: "Form",
          Cell: ({ row }: any) => (
            row.original.showIcon ? (
              <AssignmentOutlinedIcon
                className="hightLightTd"
                style={{ cursor: 'pointer' }}
                onClick={() => handleDocumentClick(row.original.candId, row.original.jobId, row.original.firstName, row.original.lastName)}
              // onClick={() => handleDocumentClick(row.original.candId, row.original.jobId)}
              />
            ) : null
          ),
          size: 50,
          enableSorting: false,
        },


        // {
        //     accessorKey: "date",
        //     header: "Date",
        //     Cell: ({  row }) => (
        //         <span>
        //             {/* Submitted by Competition */}
        //             {DateTime.fromFormat(row.original.date, 'yyyy-MM-dd').toFormat('MM-dd-yyyy')}
        //         </span>
        //     ),
        //     // size: 80
        // },
      ]
      // .filter((each) => each.checked)

      let finalColumnsList = orderedColumnsList.map((each: any) => {
        switch (each.name) {
          case "Name": return {
            accessorKey: each.key, //simple recommended way to define a column
            header: each.name,
            accessorFn: (row: any) => `${row.firstName} ${row.lastName}`,
            enableHiding: false,
            Cell: ({ row }: any) => {
              // <span
              //   className="hightLightTd"
              //   onClick={() =>
              //     openCandidateView(row.original.candId, row.original.jobId)
              //   }
              // >
              //   {row.original.firstName.toLowerCase().trim() +
              //     " " +
              //     row.original.lastName.toLowerCase()}
              // </span>
              return <Link to={`../../candidate/view/${row.original.candId}/${row.original.jobId}`} className="hightLightTd" state={{
                data: [{
                  text: "Search",
                  link: `../../resume/applicants`
                }, {
                  text: "Applicants",
                  link: `../../resume/applicants?id=${filtersSearchId.current}`
                },
                {
                  text: `${row.original.firstName.toLowerCase().trim() + " " + row.original.lastName.toLowerCase()}`,
                  link: ``
                }]
              }} >
                {row.original.firstName.toLowerCase().trim() + " " + row.original.lastName.toLowerCase()}
              </Link>
            },
            size: 100,
            enableColumnPinning: false,
            enableSorting: false,
          };
          case "Title": return {
            accessorKey: each.key,
            header: each.name,
            Cell: ({ row }: any) => {
              let jobTitle = row.original.jobTitle
                ? row.original.jobTitle.toLowerCase()
                : "";
              let displayTitle =
                jobTitle.length > 30 ? jobTitle.slice(0, 30) + "..." : jobTitle;
              return (
                <Tooltip title={jobTitle} classes={{ tooltip: "tt-capital" }}>
                  {/* <span className="hightLightTd" onClick={() => openJobView(row.original.jobId)}> {displayTitle} </span> */}
                  <Link to={`../../job/view/${row.original.jobId}`} className="hightLightTd" state={{
                    data: [{
                      text: "Search",
                      link: `../../resume/applicants`
                    }, {
                      text: "Applicants",
                      link: `../../resume/applicants?id=${filtersSearchId.current}`
                    },
                    {
                      text: `${displayTitle}`,
                      link: ``
                    }]
                  }}>
                    {displayTitle}
                  </Link>
                </Tooltip>
              );
            },
            enableSorting: false,
            enableColumnPinning: false,
            enableHiding: true,
          };
          case "Match score": return {
            accessorKey: each.key,
            header: each.name,
            Cell: ({ row }: any) =>
              row.original.hasOwnProperty("score") ? (
                <Box sx={{ position: "relative", display: "inline-flex" }}>
                  <CircularProgress
                    variant="determinate"
                    value={Math.round(row.original.score)}
                  />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: "absolute",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="caption"
                      component="div"
                      color="text.secondary"
                    >{`${Math.round(row.original.score)}%`}</Typography>
                  </Box>
                </Box>
              ) : null,
            enableSorting: false,
            enableColumnPinning: false,
            size: 150,
            enableHiding: true,
          };
          case "Form Details": return {
            accessorKey: each.key,
            header: each.name,
            Cell: ({ row }: any) => (
              row.original.showIcon ? (
                <AssignmentOutlinedIcon
                  className="hightLightTd"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleDocumentClick(row.original.candId, row.original.jobId, row.original.firstName, row.original.lastName)}
                />
              ) : null
            ),
            size: 50,
            enableSorting: false,
            enableColumnPinning: false,
            enableHiding: true,
          };
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
                (row?.original[each?.key]) ? <Tooltip title={each.name} >
                  <span className="ml-4">
                    {(row.original[each.key]) ? <CheckOutlinedIcon /> : ""}
                  </span>
                </Tooltip> : ""
              ),
              size: 80,
              Header: () => <span>{
                (each.name === "Bulhorn" ? "Bullhorn" :
                  each.name === "Aviont" ? "Avionte" : each.name
                )}</span>,
              enableSorting: false,
              enableColumnPinning: false,
              enableHiding: true,
            };
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
      });
      finalColumnsList = finalColumnsList.map((each, index) => ({
        ...each, enableColumnPinning: index === 0
      }))
      if (!!orderedColumnsList?.length && !!layoutData?.length) return [...finalColumnsList];
      else return [...defaultColumns];

    }, [orderedColumnsList]);


  const handleDocumentClick = (userId: any, jobId: any, firstName: string, lastName: string) => {
    const requestData = {
      clientId: userLocalData.getvalue("clientId"),
      jobId: jobId,
      userId: userId,
      recrId: userLocalData.getvalue("recrId"),
    };
    const fullName = `${firstName} ${lastName}`;
    trackPromise(
      ApiService.postWithData("admin", "getApplicantsAnswers", requestData)
        .then((response) => {
          if (response.data && response.data.applicantsAnswersData) {
            let tempData = response.data.applicantsAnswersData;
            const tempQuestions = response.data.json ? JSON.parse(response.data.json) : [];
            console.log(tempQuestions);
            for (let d = 0; d < tempData.length; d++) {
              if (tempData[d].questionType === "date") {
                if (tempData[d].answer) {
                  let formattedDate = DateTime.fromISO(tempData[d].answer).toFormat('MM/dd/yyyy');
                  tempData[d].answer = formattedDate;
                }
              } else if (tempData[d].questionType === "checkbox") {
                tempData[d].answer = (tempData[d].answer === "true") ? "Yes" : (tempData[d].answer === "false") ? "No" : tempData[d].answer;
              }
            }


            OpenDataCollectionQAs(tempData, fullName);
          } else {
            showToaster("No data available", "error");
          }
        })
        .catch((error) => {
          // console.error("API Error in handleDocumentClick:", error);
          showToaster("An error occurred while fetching data", error);
        })
    );
  };

  const handleVoiceAIClick = () => {

    let userIds = Object.entries(rowSelection)
      .filter(([key, value]) => value === true)
      .map(([key, value]) => parseInt(key));
    if (userIds.length) {
      let data = {
        "jobId": "",
        "type": "applicants",
        "recrId": userLocalData.getvalue('recrId'),
        "userIds": userIds,
        "clientId": userLocalData.getvalue('clientId')
      }

      //  https://adminapi.cxninja.com/voice-ai-prod/candidates/submitCandidates
      trackPromise(
        ApiService.postWithData('voiceai', 'candidates/submitCandidates', data).then((response: any) => {

          if (response.data?.length) {
            let calculatedData = response.data;
            let errorResponse = ""; let successResponse = "";
            for (let si = 0; si < calculatedData.length; si++) {

              if (calculatedData[si]?.error) {
                errorResponse += calculatedData[si].failureUserId + " - " + calculatedData[si].errorResponse + "\n";

                // setRowSelection({});
              } else {
                successResponse += calculatedData[si]?.first_name + " " + calculatedData[si]?.last_name + " - User Voice AI Created Successfully.\n";
                //     showToaster(calculatedData[si]?.first_name + " " + calculatedData[si]?.last_name + " - User Voice AI Created Successfully.", 'success');
                setRowSelection({});
              }
            }

            (errorResponse) ? showToaster(errorResponse, 'error') : null;
            (successResponse) ? showToaster(successResponse, 'success') : null;

          }

        })
          .catch((error) => {
            console.error('Error fetching Voice AI:', error);
          })
      )
    }
  }


  const handleSearch = (data: any) => {
    // if (data.name === "" && data.job === "" && data.state.length === 0 && data.status === "" && data.statusName === "") {
    //     showToaster('Please enter some Search Criteria', 'error');
    // } else {

    let dataToSave = {
      total: sessionStorage.getItem('applicants_' + filtersSearchId.current) ? JSON.parse(sessionStorage.getItem('applicants_' + filtersSearchId.current) as string)?.total : 0,
      filters: data,
      data: sessionStorage.getItem('applicants_' + filtersSearchId.current) ? JSON.parse(sessionStorage.getItem('applicants_' + filtersSearchId.current) as string)?.data : [],
      page: pagination.pageIndex
    }
    sessionStorage.setItem('applicants_' + filtersSearchId.current, JSON.stringify(dataToSave));
    setFilters({
      name: data.name,
      job: data.job,
      state: data.state,
      status: data.status,
      statusName: data.statusName,
      searchByRecruiter: data.searchByRecruiter,
      recrId: data.recrId,
      email: data.email
    });
    dataToPass.current = {
      ...dataToPass.current,
      name: data.name,
      title: data.job,
      location: data.state.length > 0 ? data.state.join() : "",
      status: data.status,
      recrId: data.recrId ? userLocalData.getvalue("recrId") : "",
      next: 0,
      email: data.email
    };
    selectAllMenuItemClicked("clear");

    if (pagination.pageIndex !== 0) {
      setPagination({ pageSize: 25, pageIndex: 0 });
    }
    //  else {
    //   loadApplicantsData();
    // }
    // setCheckedCount(0)
    // }
  };


  function transformNamesToLowerCase(dataArray: Candidate[]): Candidate[] {
    return dataArray.map(item => ({
      ...item,
      firstName: item.firstName.toLowerCase(),
      lastName: item.lastName.toLowerCase()
    }));
  }

  const selectAllMenuItemClicked = (menuType: any) => {
    setMenuType(menuType);
    if (menuType === "page") {
      // const startIndex = pagination.pageIndex * pagination.pageSize;
      const endIndex = Math.min(
        (pagination.pageIndex + 1) * pagination.pageSize,
        applicantsData.length
      );
      // console.log(endIndex)
      let checkedCheckboxesData: any = {};
      for (let index = 0; index < endIndex; index++) {
        checkedCheckboxesData[applicantsData[index].applicantId] = true;
      }
      // console.log(checkedCheckboxesData);
      setSelectedRowCount(0);
      setAllPageCount(0);
      // setRowPageIndex(0);
      // setPageCount(pagination.pageIndex);
      setCheckedCount(Object.keys(checkedCheckboxesData).length);
      // setSelectedPage(true);
      // setRowSelection(checkedCheckboxesData);
      setApplicantsRowSelection(checkedCheckboxesData);
      let tempIdRowSelection: any = {};
      applicantsData.forEach((each: any) => {
        tempIdRowSelection[each.id] = true
      });
      setRowSelection(tempIdRowSelection);
      setIsSelectAllChecked(false);
      currentSelectCount.current = Object.keys(rowSelection).length;
    } else if (menuType === "all") {
      trackPromise(
        ApiService.postWithData(
          "admin",
          "curatelyApplicantsListAll",
          {
            next: 0,
            pageSize: 2500,
            sortBy: dataToPass.current.sortBy,
            orderBy: dataToPass.current.orderBy,
            name: dataToPass.current.name,
            title: dataToPass.current.title,
            location: dataToPass.current.location,
            status: dataToPass.current.status,
            recrId: dataToPass.current.recrId,
            clientId: userLocalData.getvalue("clientId"),
            email: dataToPass.current.email
          }
        ).then((result) => {
          // console.log(result);

          let rowData: any = {};

          let tempData: any = result.data?.applicants
            ? result.data.applicants.map((applicant: number) => "" + applicant)
            : [];
          for (let index = 0; index < tempData.length; index++) {
            if (tempData[index]?.toString().trim()) {
              rowData[tempData[index]?.toString().trim()] = true;
            }
          }
          setIsSelectAllChecked(true);
          // setRowSelection(rowData);
          setApplicantsRowSelection(rowData);
          let tempIdRowSelection: any = {};
          applicantsData.forEach((each: any) => {
            tempIdRowSelection[each.id] = true
          });
          setRowSelection(tempIdRowSelection);
          setCheckedCount(Object.keys(rowData).length);
          // setRowCount(Object.keys(rowData).length);
          // setSelectedPage(false);
          setSelectedRowCount(Object.keys(rowData).length);
          // setRowCount(10000);
        })
      );
    } else if (menuType === "clear") {
      setIsSelectAllChecked(false);
      setRowSelection({});
      setApplicantsRowSelection({});
      // setRowPageIndex(0);
      setAllPageCount(0);
      // setPageCount(0);
      setSelectedRowCount(0);
      setCheckedCount(0);
      // setSelectedPage(false);
      currentSelectCount.current = 0;
    }
    setSelectAllElement(null);
  };


  // useCallback(debounce(
  const loadApplicantsData = () => {
    // setDataLoading(true);
    // (allPageCount === 0 && pageCount !== pagination.pageIndex) && selectAllMenuItemClicked("clear");
    allPageCount === 1 && selectAllMenuItemClicked("all");
    trackPromise(
      ApiService.postWithData(
        'admin',
        "curatelyApplicantsList",
        {
          ...dataToPass.current, clientId: userLocalData.getvalue('clientId'),
          // layoutRecrId: userLocalData.getvalue("recrId")
        }
      ).then((result: any) => {
        let tempData = result.data.data;
        tempData = transformNamesToLowerCase(tempData);
        tempData = tempData.map((applicant: any, index: number) => ({
          ...applicant,
          applicantId: "" + applicant.applicantId,
          showIcon: applicant.formAnswersData ? true : false,
          id: index.toString()
        }));
        console.log(tempData)
        // for (let td = 0; td < tempData.length; td++) {
        //   tempData[td].applicantId = tempData[td].applicantid ? "" + tempData[td].applicantid : '';
        //   tempData[td].candId = tempData[td].userid ? tempData[td].userid.trim() : '';
        //   tempData[td].date = tempData[td].dateenter ? tempData[td].dateenter : '';
        //   tempData[td].jobId = tempData[td].jobid ? tempData[td].jobid : '';
        //   tempData[td].matchStatus = tempData[td].score ? "" + tempData[td].score : '0';
        //   tempData[td].phone = tempData[td].phoneno ? tempData[td].phoneno : '';
        //   tempData[td].statusId = tempData[td].status ? "" + tempData[td].status : '';
        //   tempData[td].statusName = tempData[td].label ? "" + tempData[td].label : '';
        //   tempData[td].candId = tempData[td].userid ? tempData[td].userid.trim() : '';
        // }
        setRowCount(result.data.Total);
        // const getCountByName = (data: any, filterName: string) => {
        //   return data.filter(
        //     (item: any) => `${item.firstName} ${item.lastName}`.trim() === filterName
        //   ).length;
        // };
        const getCountByName = (data: any, filterName: string) => {
          const lowerFilter = filterName.toLowerCase();
          return data.filter((item: any) =>
            item.firstName.toLowerCase().includes(lowerFilter) ||
            item.lastName.toLowerCase().includes(lowerFilter)
          ).length;
        };

        const matchingRowCount = getCountByName(tempData, filters.name);
        if (filters.name) {
          setRowCount(matchingRowCount);
          setSelectedRowCount(matchingRowCount);
        }
        // console.log('ROWCOUNT', rowCount, 'tempdata', tempData, 'matchingRowCount', matchingRowCount)
        // for (let al = 0; al < tempData.length; al++) {
        //     tempData[al].rowId = "" + tempData[al].candId + tempData[al].jobId;
        // }
        if (menuType === "all") {
          let tempRowSelection = rowSelection;
          tempData.forEach((each: any) => {
            tempRowSelection[each.id] = applicantsRowSelection[each.applicantId]
          });
          setRowSelection(tempRowSelection);
        }
        if (tempData.length) {
          tempData.forEach((each: any) => {
            each.firstName = each.firstName ? each.firstName.toLowerCase() : "";
            each.lastName = each.lastName ? each.lastName.toLowerCase() : "";
          });
        }
        setApplicantsData(tempData);
        let dataToSave = {
          total: result.data.Total,
          filters: sessionStorage.getItem('applicants_' + filtersSearchId.current) ? JSON.parse(sessionStorage.getItem('applicants_' + filtersSearchId.current) as string)?.filters : filters,
          data: tempData,
          sort: {
            column: getSortColumnName(dataToPass.current.sortBy),
            type: dataToPass.current.orderBy
          },
          page: !dataToPass.current.next ? dataToPass.current.next : dataToPass.current.next / dataToPass.current.pageSize
        }
        sessionStorage.setItem('applicants_' + filtersSearchId.current, JSON.stringify(dataToSave));
        if (!isSelectAllChecked) {
          // setSelectedRowCount(result.data.Total);
          setSelectedRowCount(
            result.data.Total > 2500 ? 2500 : result.data.Total
          );
        }

        // if ((rowPageIndex > 0) && (rowPageIndex > pagination.pageIndex)) {
        //     // let rowData={...rowSelection};
        //     let rowDatanext: any = {};
        //     for (let index = 0; index < tempData.length; index++) {
        //         rowDatanext[tempData[index].rowId] = true;
        //     }
        //     setRowSelection({ ...rowSelection, ...rowDatanext });
        //     setIsSelectAllChecked(true);
        // } else {
        //     setIsSelectAllChecked(false);
        // }
        setDataLoading(false);
      })
    )
  };
  // , 400), [])

  const getSortColumnName = (id: string): string => {
    let label = "";
    switch (id) {
      case "name":
        label = "Name";
        break;
      case "jobTitle":
        label = "Job";
        break;
      case "title":
        label = "Job";
        break;
      case "score":
        label = "Match Score";
        break;
      case "status":
        label = "Status";
        break;
      case "date":
        label = "Date";
        break;
      default:
        label = "Date";
    }
    return label;
  }


  useEffect(() => {

    dataToPass.current = {
      ...dataToPass.current,
      name: filters.name,
      title: filters.job,
      location: filters.state.length > 0 ? filters.state.join() : "",
      status: filters.status,
      recrId: filters.recrId,
      email: filters.email
    };
    if (!isFirstTimeLoad.current) {
      if (pagination.pageIndex === 0) {
        loadApplicantsData();
      } else {
        setPagination({
          pageIndex: 0,
          pageSize: pagination.pageSize, //customize the default page size
        });
      }
    }
  }, [
    filters.name,
    filters.job,
    filters.state,
    filters.status,
    filters.recrId,
    filters.email
  ]);

  useEffect(() => {
    let sortBy = "date";
    let orderBy = "desc";
    if (sorting.length > 0) {
      // Name
      // Job
      // Match Score
      // Status
      // Date
      switch (sorting[0].id) {
        case "Name":
          sortBy = "name";
          sorting[0].desc ? saveAuditLog(3913) : saveAuditLog(3912);
          break;
        case "jobTitle":
          sortBy = "title";
          sorting[0].desc ? saveAuditLog(3915) : saveAuditLog(3914);
          break;
        case "Job":
          sortBy = "title";
          sorting[0].desc ? saveAuditLog(3915) : saveAuditLog(3914);
          break;
        case "score":
          sortBy = "score";
          sorting[0].desc ? saveAuditLog(3917) : saveAuditLog(3916);
          break;
        case "Match Score":
          sortBy = "score";
          sorting[0].desc ? saveAuditLog(3917) : saveAuditLog(3916);
          break;
        case "statusName":
          sortBy = "status";
          sorting[0].desc ? saveAuditLog(3919) : saveAuditLog(3918);
          break;
        case "Status":
          sortBy = "status";
          sorting[0].desc ? saveAuditLog(3919) : saveAuditLog(3918);
          break;
        case "Date":
          sortBy = "date";
          sorting[0].desc ? saveAuditLog(3921) : saveAuditLog(3920);
          break;
        default:
          sortBy = "date";
          sorting[0].desc ? saveAuditLog(3921) : saveAuditLog(3920);
      }

      sorting[0].desc === true ? (orderBy = "desc") : (orderBy = "asc");
    }

    const count = pagination.pageSize * pagination.pageIndex;
    dataToPass.current = {
      next: count,
      pageSize: pagination.pageSize,
      sortBy: sortBy,
      orderBy: orderBy,
      name: filters.name,
      title: filters.job,
      location: filters.state.length > 0 ? filters.state.join() : "",
      status: filters.status,
      recrId: filters.recrId,
      email: filters.email
    };

    if (isFirstTimeLoad.current) {
      isFirstTimeLoad.current = false;
      setRowCount(filtersSearchData.current.total);
      setApplicantsData(filtersSearchData.current.data);
    } else {
      loadApplicantsData();
    }
    // if (
    //   filters.name !== "" ||
    //   filters.job !== "" ||
    //   filters.state.length !== 0 ||
    //   filters.status !== ""
    // ) {
    //   if (checkedCounts > 0) {
    //     selectAllMenuItemClicked("clear");
    //   }
    // }
  }, [
    pagination.pageIndex,
    pagination.pageSize,
    sorting,
  ]);

  const formatSequenceData = (
    id: string,
    name: string,
    candidateId: string
  ) => {
    let tempData: any = applicantsData;

    for (let index = 0; index < applicantsData.length; index++) {
      if (Number(tempData[index].candId) === Number(candidateId)) {
        tempData[index].sequenceCount = tempData[index].sequenceCount + 1;

        const arrSeqIds = tempData[index].sequenceIds;
        tempData[index].sequenceIds = [...arrSeqIds, id];

        const arrSeqNames = tempData[index].sequenceNames;
        tempData[index].sequenceNames = [...arrSeqNames, name];
      }
    }

    setApplicantsData([...tempData]);
  };

  const handleDelete = (key: string, i?: number) => {
    if (key === "state" && i !== undefined) {
      let newStateList = [...filters.state];
      newStateList.splice(i, 1);
      setFilters({
        ...filters,
        state: newStateList,
      });
    } else if (key === "statusName" || key === "status") {
      setFilters({
        ...filters,
        statusName: "",
        status: "",
      });
    } else {
      setFilters({
        ...filters,
        [key as keyof typeof filters]: "",
      });
    }
    // if (checkedCounts > 0) {
    selectAllMenuItemClicked("clear");
    // }
  };

  // const handlePaginationChange = (newPagination: Pagination) => {
  //   setPagination(newPagination);
  //   setSelectedPage(false);
  //   // if(isSelectAllChecked){
  //   //     setRowCount(10000);
  //   // }
  //   if (!isSelectAllChecked) {
  //     setCheckedCount(0);
  //     setRowSelection({});
  //   }
  // };

  const addToSequenceList = (id: string, name: string, candidateId: string) => {
    if (name && name.trim()) {
      handleProfileMenuClose();
      const saveData = {
        clientId: userLocalData.getvalue("clientId"),
        sequenceId: id,
        recrId: userLocalData.getvalue("recrId"),
        userIds: candidateId,
      };

      //https://www4.accuick.com/Accuick_API/Curately/Sequence/sequence_assign_users.jsp?clientId=2&userIds=39&sequenceId=9&recrId=61
      ApiService.postWithData(
        "admin",
        "sequenceAssignUsers",
        saveData
      )
        .then((response: any) => {
          // console.log(response);
          //  showToaster(
          //     response.data.message
          //       ? response.data.message
          //       : "campaign saved successfully",
          //     "success"
          //   );
          //    loadCanidateData();



          if ((response.data.message === "Success") || (response.data.Message === "Success")) {
            showToaster("Campaign has been assigned successfully", 'success');
            // loadCanidateData();
            let candidateIds = candidateId.split(",");
            !!candidateIds?.length &&
              candidateIds.map((candId: string) => {
                formatSequenceData(id, name, candId);
              });
            setSelectedSequence({ id: "", name: "" });
          } else {
            showToaster(response.data.Message ? response.data.Message : "An error occured while assigning ", 'error');
          }
        })
        .catch((error) => {
          console.error("API Error:", error);
        });
    }
  };

  const handleClickAddToPoolListen = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAddToPoolListAnchorEl(event.currentTarget);
    // loadDistributionList();
    // setSelectedRowId(callId);
    saveAuditLog(3911);
  };

  const addToTopSequenceList = (id: string, name: string) => {
    const selectedIds = Object.keys(applicantsRowSelection).filter(
      (key) => applicantsRowSelection[key]
    );
    if (Object.keys(applicantsRowSelection).length > 0) {
      if (name && name.trim()) {
        setSelectedSequence({ id: id, name: name });
        handleProfileMenuClose();
        const filteredApplicants = applicantsData.filter((candidate: any) =>
          selectedIds.includes(candidate.applicantId)
        );
        const filteredApplicantIds = filteredApplicants.map((candidate: any) =>
          candidate.candId
          // candidate.candId.replace(/\s+/g, "")
        );
        addToSequenceList(id, name, filteredApplicantIds.join(","));
      }
    } else {
      showToaster("Select atleast one Candidate", "error");
    }
  };
  const selectedJobIdForBlastEmail = useRef("");

  const handleBlastEmail = () => {
    selectedJobIdForBlastEmail.current = "";
    const selectedIds = Object.keys(applicantsRowSelection).filter(
      (key) => applicantsRowSelection[key]
    );
    if (selectedIds.length === 1) {
      const selectedRowKey = selectedIds[0];
      const selectedRow = applicantsData.find(
        (candidate: any) => candidate.applicantId === selectedRowKey
      );

      const filteredApplicants = applicantsData.filter((candidate: any) =>
        selectedIds.includes(candidate.applicantId)
      );
      const filteredApplicantIds = filteredApplicants.map((candidate: any) =>
        candidate.candId
        // candidate.candId.replace(/\s+/g, "")
      );
      if (selectedRow) {
        selectedJobIdForBlastEmail.current = selectedRow.jobId;
        setSelectedEmail(selectedRow.email);
        setSelectedName(selectedRow.firstName);
        setIsBulkEmail(false);
        setAddEmail(true);
        setSelectCandidList(filteredApplicantIds);
      }
    } else if (selectedIds.length > 1) {
      setSelectedEmail("");
      setSelectedName("");
      setIsBulkEmail(true);
      setAddEmail(true);
      const filteredApplicants = applicantsData.filter((candidate: any) =>
        selectedIds.includes(candidate.applicantId)
      );
      const filteredApplicantIds = filteredApplicants.map((candidate: any) =>
        candidate.candId
        // candidate.candId.replace(/\s+/g, "")
      );
      setSelectCandidList(filteredApplicantIds);
    }
  };

  const handleClickAddToSequenceListen = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAddToSequenceListAnchorEl(event.currentTarget);
    // loadDistributionList();
    // setSelectedRowId(callId);
    saveAuditLog(3910);
  };

  const handleBlastSMS = () => {
    const selectedIds = Object.keys(applicantsRowSelection).filter(
      (key) => applicantsRowSelection[key]
    );
    if (selectedIds.length === 1) {
      const selectedRowKey = selectedIds[0];
      const selectedRow = applicantsData.find(
        (candidate: any) => candidate.applicantId === selectedRowKey
      );
      const filteredApplicants = applicantsData.filter((candidate: any) =>
        selectedIds.includes(candidate.applicantId)
      );
      const filteredApplicantIds = filteredApplicants.map((candidate: any) =>
        candidate.candId
        // candidate.candId.replace(/\s+/g, "")
      );
      // console.log(selectedRow);
      if (selectedRow) {
        setSelectedSMS(selectedRow.phone);
        setSelectedName(selectedRow.firstName);
        setSelectedJobId(selectedRow.jobId);
        setIsBulkSMS(false);
        setAddSMS(true);
        setSelectCandidList(filteredApplicantIds);
      }
    } else if (selectedIds.length > 1) {
      setSelectedSMS("");
      setSelectedName("");
      setSelectedJobId("");
      setIsBulkSMS(true);
      setAddSMS(true);
      const filteredApplicants = applicantsData.filter((candidate: any) =>
        selectedIds.includes(candidate.applicantId)
      );
      const filteredApplicantIds = filteredApplicants.map((candidate: any) =>
        candidate.candId
        // candidate.candId.replace(/\s+/g, "")
      );
      setSelectCandidList(filteredApplicantIds);
    }
  };

  const handleProfileMenuClose = () => {
    // setAddToListAnchorEl(null);
    setAddToPoolListAnchorEl(null);
    // setTableOpenList(null);
    setAddToSequenceListAnchorEl(null);
  };

  // const handleSortingChange = () => {
  //   const sortedData = [...applicantsData].sort((a, b) => {
  //     if (sortType === "asc") {
  //       return a[sortColumn] > b[sortColumn] ? 1 : -1;
  //     } else {
  //       return a[sortColumn] < b[sortColumn] ? 1 : -1;
  //     }
  //   });
  //   setApplicantsData(sortedData);
  //   handleSortClose();
  // };
  const isEmailSMSSettingEnabled = userLocalData.checkIntegration(40005);
  const isBulkEmailSettingEnabled =
    userLocalData.checkIntegration(40005) &&
    userLocalData.checkIntegration(400020);
  const selectedIds = Object.keys(applicantsRowSelection).filter(
    (key) => applicantsRowSelection[key]
  );
  const isGroupEnabled = selectedIds.length > 0;
  useEffect(() => {
    saveAuditLog(3898);
  }, [])

  const saveAuditLog = (id: number) => {
    ApiService.saveAuditLog(id);
  }


  const openAddModal = () => {
    setOpenNewLayoutModal(true);
  };


  const columnVisibility = useMemo(() => {
    let visibleColumns: any = {};
    menuLayoutColumns.forEach((each) => {
      visibleColumns[each.key] = each.checked ? each.checked : false
    })
    return visibleColumns;

  }, [menuLayoutColumns]);


  const columnOrderState = useMemo(() => {
    let columnOrder = menuLayoutColumns.map((each) => each.key);
    columnOrder.unshift("mrt-row-select");
    return columnOrder;

  }, [menuLayoutColumns])



  return (
    <div id="canApplicants">
      <Grid container className="customCard p-0 filterExpand-grid mt-4">
        <Grid
          sx={{
            width: filtersExpand ? 0 : 310,
            overflow: "hidden",
            opacity: filtersExpand ? 0 : 1,
          }}
        >
          <Stack direction="row" className="applicantsFilterHead">
            <GroupOutlinedIcon />
            <Typography component="h5">Applicants</Typography>
          </Stack>
          <ApplicantsFilters
            onSearch={handleSearch}
            filters={filters}
            recrIdPassed={recrId ? recrId : ""}
          />
        </Grid>
        <Grid
          sx={{ width: filtersExpand ? "calc(100%)" : "calc(100% - 310px)" }}
        >
          <div className={`MRTableCustom ${filtersExpand ? "pl-0" : ""}`}>
            <Stack direction="row" alignItems="center">
              <Tooltip title={filtersExpand ? "Show Filters" : "Hide Filters"}>
                <IconButton
                  disableRipple
                  className="filtersHideButton"
                  color="primary"
                  aria-label={filtersExpand ? "Expand" : "Collapse"}
                  onClick={() => { saveAuditLog(3904); toggleFilers() }}
                >
                  <TuneIcon className="c-grey" />
                  {/* {<img src={CommonImages.GetFilterIcon()} className="filterIcon" />} */}
                  {/* {
                                    filtersExpand ?
                                        <KeyboardDoubleArrowRightIcon />
                                        :
                                        <KeyboardDoubleArrowLeftIcon />
                                } */}
                </IconButton>
              </Tooltip>
              <Box className="selectedFilterChips">
                {filters.name !== "" && (
                  <Chip
                    className="ml-2"
                    label={`Name: ${filters.name}`}
                    variant="outlined"
                    onDelete={() => handleDelete("name")}
                  />
                )}

                {filters.job !== "" && (
                  <Chip
                    className="ml-2"
                    label={`Job: ${filters.job}`}
                    variant="outlined"
                    onDelete={() => handleDelete("job")}
                  />
                )}
                {filters.email !== "" && (
                  <Chip
                    className="ml-2"
                    label={`Email: ${filters.email}`}
                    variant="outlined"
                    onDelete={() => handleDelete("email")}
                  />
                )}
                {filters.state.length > 0 && (
                  <Chip
                    className="ml-2"
                    label={`State: ${filters.state.join(", ")}`}
                    variant="outlined"
                    onDelete={() => handleDelete("state")}
                  />
                )}

                {filters.statusName !== "" && (
                  <Chip
                    className="ml-2"
                    label={`Status: ${filters.statusName}`}
                    variant="outlined"
                    onDelete={() => handleDelete("statusName")}
                  />
                )}
              </Box>
            </Stack>
            {
              addEmail && (
                <EmailDialogBox
                  dialogOpen={addEmail}
                  onClose={() => setAddEmail(false)}
                  name={selectedName}
                  emailId={selectedEmail}
                  isBulkEmail={isBulkEmail}
                  candidateId={selectCandidList.toString()}
                  jobId={selectedJobIdForBlastEmail.current}
                />
              ) //
            }
            {addSMS && (
              <PhoneDialog
                dialogOpen={addSMS}
                onClose={() => setAddSMS(false)}
                name={selectedName}
                toPhone={selectedSMS}
                candidateId={selectCandidList.toString()}
                isBulkSMS={isBulkSMS}
                jobId={selectedJobId}
              />
            )}
            {/* {openSequenceModal ? (
              <Sequence
                open={openSequenceModal}
                closePopup={() => setOpenSequenceModal(false)}
                selectedCandidateIds={selectSequenceList}
              />
            ) : null} */}
            <Menu
              id="addpoollistmenu"
              anchorEl={addtopoollistanchorEl}
              open={openAddToPoolListenBtn}
              onClose={handleProfileMenuClose}
              MenuListProps={{
                "aria-labelledby": "add-poollist-btn",
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
                id="talentPoolId1"
                handleChange={(id: any, name: string) => {
                  setSelectedTalentPool({ id, name });
                  addToTopTalentPool(id, name);
                }}
                valuePassed={
                  selectedTalentPool.id
                    ? {
                      label: selectedTalentPool.name,
                      id: selectedTalentPool.id,
                    }
                    : {}
                }
                isMultiple={false}
                textToShow="Talent Pool"
                width="250px"
                type="talentPool"
                placeholder="Select Pool"
              />
            </Menu>
            <MaterialReactTable
              columns={isLayoutFetched ? columns : []}
              enableHiding
              enableRowSelection
              data={applicantsData}
              onRowSelectionChange={(data: any) => {
                let tempApplicantsRowSelection = applicantsRowSelection;
                Object.entries(data).map(([key, value]: any) => {
                  let tempApplicantData = applicantsData.find((each: any) => parseInt(each.id) === parseInt(key)) || undefined;
                  if (tempApplicantData) {
                    tempApplicantsRowSelection[tempApplicantData.applicantId] = value
                  }
                });
                setApplicantsRowSelection(tempApplicantsRowSelection)
                setRowSelection(data);
              }}
              state={{
                rowSelection,
                pagination,
                sorting,
                isLoading: (dataLoading || !isLayoutFetched),
                columnPinning: isLayoutFetched ? { left: ["mrt-row-select", pinnedColumn.key] } : {},
                columnVisibility: columnVisibility,
                columnOrder: columnOrderState
              }}
              enablePinning
              initialState={{
                columnPinning: isLayoutFetched ? { left: ["mrt-row-select", pinnedColumn.key] } : {},
                density: "compact",
                showGlobalFilter: false,
              }}
              enableDensityToggle={false}
              enableFullScreenToggle={false}
              manualPagination
              onSortingChange={setSorting}
              enableGlobalFilterModes
              columnResizeMode="onChange"
              onPaginationChange={setPagination}
              // getRowId={(row) => row.applicantId}
              getRowId={(row) => row.id}
              icons={{
                ArrowDownwardIcon: (props: any) => (
                  <SwitchLeftIcon {...props} />
                ),
              }}
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
                    }),
                      handlePaginationChange(page)
                  }
                  }
                />
              )}
              rowCount={rowCount}
              enableStickyHeader
              renderTopToolbar={
                <Grid
                  container
                  direction="row"
                  className=""
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid >
                    <Stack direction="row" alignItems={"center"} spacing={1}>
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
                            indeterminate={someAreChecked}
                          />
                        </div>
                        <span
                          className={`selectedCountText ${checkedCount === 0 ? "d-none" : "d-block"
                            }`}
                        >
                          {/* {!selectedPage && isSelectAllChecked
                            ? selectedRowCount > 2500
                              ? 2500
                              : selectedRowCount
                            : selectedPage
                              ? checkedCount
                              : checkedCount}{" "} */}
                          {checkedCount} {" "}
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
                          onClick={() => { saveAuditLog(3905); selectAllMenuItemClicked("page") }}
                          className="menuItem"
                        >
                          Select this page (
                          <Box component="span">{applicantsData.length}</Box>)
                        </MenuItem>
                        <MenuItem
                          disableRipple
                          onClick={() => { saveAuditLog(3906); selectAllMenuItemClicked("all") }}
                        >
                          Select all people (
                          <Box component="span">
                            {rowCount > 2500 ? 2500 : rowCount}
                          </Box>
                          )
                        </MenuItem>
                        <MenuItem
                          disableRipple
                          onClick={() => { saveAuditLog(3907); selectAllMenuItemClicked("clear") }}
                        >
                          Clear Selection
                        </MenuItem>
                      </Menu>

                      <ButtonGroup variant="outlined" className='quickActionButtonGroup'>
                        {isBulkEmailSettingEnabled && (
                          <Tooltip title="Email">
                            <Button
                              variant="outlined"
                              color="secondary"
                              disabled={
                                selectedIds.length === 0 ||
                                (selectedIds.length === 1 &&
                                  !applicantsData.find(
                                    (candidate: { applicantId: string }) =>
                                      candidate.applicantId === selectedIds[0]
                                  )?.email)
                              }
                              onClick={() => { saveAuditLog(3908); handleBlastEmail() }}
                              startIcon={<MailOutlineOutlinedIcon />}
                            />
                          </Tooltip>
                        )}

                        {isEmailSMSSettingEnabled && userLocalData.isPaid() && !userLocalData.isChromeExtensionEnabled() && (
                          <Tooltip title="SMS">
                            <Button
                              variant="outlined"
                              color="secondary"
                              disabled={
                                selectedIds.length === 0 ||
                                (selectedIds.length === 1 &&
                                  !applicantsData.find(
                                    (candidate: { applicantId: string }) =>
                                      candidate.applicantId === selectedIds[0]
                                  )?.phone)
                              }
                              onClick={() => { saveAuditLog(3909); handleBlastSMS() }}
                              startIcon={<CallOutlinedIcon />}
                            />
                          </Tooltip>
                        )}
                        {isCampaignsEnabled ?
                          <Tooltip title="Campaign">
                            <Button
                              variant="outlined"
                              color="secondary"
                              disabled={!isGroupEnabled}
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
                                openAddToSequenceListenBtn ? "true" : undefined
                              }
                              onClick={handleClickAddToSequenceListen}
                            // endIcon={<ArrowDropDownIcon />}
                            />
                          </Tooltip>
                          : null
                        }

                        <Tooltip title="Pool">
                          <Button
                            id="add-poollist-btn"
                            aria-controls={
                              openAddToPoolListenBtn ? "addpoollistmenu" : undefined
                            }
                            aria-haspopup="true"
                            aria-expanded={
                              openAddToPoolListenBtn ? "true" : undefined
                            }
                            onClick={handleClickAddToPoolListen}
                            startIcon={<PlaylistAddOutlinedIcon />}
                            disableRipple
                            variant="outlined"
                            color="secondary"
                            disabled={!isGroupEnabled}
                          // endIcon={<ArrowDropDownIcon />}

                          />
                        </Tooltip>
                      </ButtonGroup>

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
                          // existingSequenceIds={menuData?.sequenceIds}
                          existingSequenceIds={[]}
                          isMultiple={false}
                          textToShow="Select Campaign"
                          width="250px"
                          type="sequence"
                          placeholder="Select Campaign"
                        />
                      </Menu>

                      {isBullHornSettingEnabled ?
                        <Button variant="outlined" color="secondary" id="bullhorn-btn"
                          disabled={(checkedCount > 0) ? false : true}
                          disableRipple aria-haspopup="true"
                          onClick={() => { publishApplicantToBullhorn() }}
                        >
                          Bullhorn
                        </Button>
                        :
                        null
                      }
                      {/* {isJobDivaAPISettingEnabled ?
                        <Button variant="outlined" color="secondary" className="mr-2" id="jobdiva-btn"
                          disabled={(checkedCount === 1) ? false : true}
                          disableRipple aria-haspopup="true"
                          onClick={() => { publishApplicantToJobDiva() }}
                        >
                          Job Diva
                        </Button>
                        :
                        null
                      } */}
                      {/* {isVoiceAISettingEnabled ?
                        <Button variant="outlined" color="secondary" className="mr-2" id="voiceai-btn"
                          disabled={(checkedCount > 0) ? false : true}
                          disableRipple aria-haspopup="true"
                        // onClick={() => { handleVoiceAIClick() }}
                        >
                          Voice AI
                        </Button>
                        :
                        null
                      } */}
                      {/* {isEvaluteSettingEnabled ?
                                        <Button variant="outlined" color="secondary" className="mr-2" id="voiceai-btn"
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
                        <Button variant="outlined" color="secondary" id="avionte-btn"
                          disabled={(checkedCount > 0) ? false : true}
                          disableRipple aria-haspopup="true"
                          onClick={() => { publishApplicantToAvionte() }}
                        >
                          Avionte
                        </Button>
                        :
                        null
                      }

                    </Stack>
                  </Grid>


                  <Grid >
                    <Stack direction="row" alignItems="center" >
                      <Button variant="outlined" disabled={orderedColumnsList?.length === 0} className="mr-2" onClick={openAddModal} ref={layoutRef} color="secondary" aria-describedby={"Table Layout"} endIcon={<ArrowDropDownIcon />}>
                        Table Layout
                      </Button>
                      {openNewLayoutModal && <NewLayoutMenu
                        ref={layoutRef}
                        open={openNewLayoutModal}
                        handleClosemenu={() => setOpenNewLayoutModal(false)}
                        columnsData={menuLayoutColumns}
                        handleColumnAction={setMenuLayoutColumns}
                        layoutType="applicants"
                        pinnedColumn={pinnedColumn.name}
                        resetLayout={getAllLayoutData}
                      />}
                      <Box className="customSorting">
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
                                onChange={(e) => setSortColumn(e.target.value)}
                                className="sortingPopoverSelect"
                              >
                                <MenuItem value={"Name"}>Name</MenuItem>
                                <MenuItem value={"Job"}>Job</MenuItem>
                                <MenuItem value={"Match Score"}>
                                  Match Score
                                </MenuItem>
                                <MenuItem value={"Status"}>Status</MenuItem>
                                <MenuItem value={"Date"}>Date</MenuItem>
                              </Select>
                            </FormControl>

                            <FormControl fullWidth className="mb-2">
                              <Select
                                id="sortType"
                                size="small"
                                value={sortType}
                                onChange={(e) => setSortType(e.target.value)}
                                className="sortingPopoverSelect"
                              >
                                <MenuItem value={"asc"}>Ascending</MenuItem>
                                <MenuItem value={"desc"}>Descending</MenuItem>
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
                                    desc: sortType === "desc" ? true : false,
                                    id: sortColumn,
                                  },
                                ]);
                                saveAuditLog(3922);
                                handleSortClose();
                              }}
                            >
                              Apply
                            </Button>
                          </Box>
                        </Popover>
                      </Box>
                    </Stack>
                  </Grid>
                </Grid>
              }
              muiSelectCheckboxProps={(prop) => ({
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
                    const finalRowSelection = {
                      ...rowSelection,
                      [prop.row.id]: e.target.checked,
                    }

                    let tempApplicantsRowSelection = applicantsRowSelection;
                    Object.entries(finalRowSelection).map(([key, value]: any) => {
                      let tempApplicantData = applicantsData.find((each: any) => parseInt(each.id) === parseInt(key)) || undefined;
                      if (tempApplicantData) {
                        tempApplicantsRowSelection[tempApplicantData.applicantId] = value
                      }
                    });
                    setRowSelection(finalRowSelection);
                    setApplicantsRowSelection(tempApplicantsRowSelection)

                    if (isSelectAllChecked) {
                      if (e.target.checked) {
                        setSelectedRowCount(selectedRowCount + 1);
                      } else {
                        setSelectedRowCount(selectedRowCount - 1);
                      }
                    }
                  }
                },
              })}
            />

            {/* {
              (openNewLayoutModal) ?
                <NewLayout
                  open={openNewLayoutModal}
                  closePopup={() => {
                    setOpenNewLayoutModal(false);
                    getLayoutDataByRecrId(layoutData);
                    handleClose();
                  }} layoutType={"APPLICANTS"}
                  allLayoutData={layoutData}
                  userLayoutData={checkedColumnsList}
                />
                :
                null
            } */}
          </div>



        </Grid>
        <DataCollectionQAsDialog />
      </Grid>
    </div>
  );
};

export default Applicants;
