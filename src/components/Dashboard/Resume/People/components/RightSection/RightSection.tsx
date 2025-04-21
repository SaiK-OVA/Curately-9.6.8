import {
  React,
  useEffect,
  // useRef,
  useState,
} from "../../../../../../shared/modules/React";
import { useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
// import { useTheme } from "@mui/material/styles";
// import { DataGrid } from "@mui/x-data-grid";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import CloudIcon from "@mui/icons-material/Cloud";
import UpgradeOutlinedIcon from '@mui/icons-material/UpgradeOutlined';
// import WifiProtectedSetupRoundedIcon from "@mui/icons-material/WifiProtectedSetupRounded";
// import EggAltRoundedIcon from "@mui/icons-material/EggAltRounded";
// import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
// import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import InsertChartOutlinedRoundedIcon from "@mui/icons-material/InsertChartOutlinedRounded";
// import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
// import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
// import ReplaySharpIcon from "@mui/icons-material/ReplaySharp";
import QuestionMarkRoundedIcon from "@mui/icons-material/QuestionMarkRounded";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
// import FormLabel from "@mui/material/FormLabel";
// import SequenceModal from "./SequenceModal";
import TuneIcon from "@mui/icons-material/Tune";
// import ReplayIcon from "@mui/icons-material/Replay";
// import { DataGridPro, GridPinnedColumns } from "@mui/x-data-grid-pro";
import EmailDialogBox from "../../../../../shared/EmailDialogBox/EmailDialogBox";
import {
  Button,
  // IconButton,
  // debounce,
} from "../../../../../../shared/modules/MaterialImports/Button";
import { Card } from "../../../../../../shared/modules/MaterialImports/Card";
import { ButtonGroup } from "../../../../../../shared/modules/MaterialImports/ButtonGroup";
import { Typography } from "../../../../../../shared/modules/MaterialImports/Typography";
import { Box } from "../../../../../../shared/modules/MaterialImports/Box";
import { Stack } from "../../../../../../shared/modules/MaterialImports/Stack";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
// import GetAppIcon from "@mui/icons-material/GetApp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { ID_ATS_JOBDIVA } from "../../../../../../shared/services/Permissions/IDs";
import {
  Menu,
  MenuItem,
} from "../../../../../../shared/modules/MaterialImports/Menu";
// import MenuList from "@mui/material/MenuList";
// import LockIcon from "@mui/icons-material/Lock";
// import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
// import VisibilityIcon from "@mui/icons-material/Visibility";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import searchIconColored from "../../shared/assets/icons/Search-colored.svg";
// import TablePagination from "@mui/material/TablePagination";
// import TableFooter from "@mui/material/TableFooter";
// import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import Link from "@mui/material/Link";
// import { Link as AnchorLink } from "react-router-dom";
// import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
// import Dangerous from "@mui/icons-material/Dangerous";
// import MobileFriendlyOutlinedIcon from "@mui/icons-material/MobileFriendlyOutlined";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import ArrowLeftOutlinedIcon from "@mui/icons-material/ArrowLeftOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
// import IconButton from "@mui/material/IconButton";
// import FirstPageIcon from "@mui/icons-material/FirstPage";
// import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
// import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
// import LastPageIcon from "@mui/icons-material/LastPage";
// import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { styled } from "@mui/material/styles";
import {
  Checkbox,
  Radio,
  RadioGroup,
} from "../../../../../../shared/modules/MaterialImports/FormElements";
// import data from "./Data.json";
import styles from "./../../shared/config/variables.module.scss";
import Modal from "@mui/material/Modal";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Divider } from "../../../../../../shared/modules/MaterialImports/Divider";
import {
  FormControlLabel,
  FormControl,
  TextField,
} from "../../../../../../shared/modules/MaterialImports/FormInputs";
import SettingsIcon from "@mui/icons-material/Settings";
import Autocomplete from "@mui/material/Autocomplete";
import apiService from "../../shared/api/apiService";

import { Store } from "../DataLabs/DataLabs";
import { CircularProgress } from "../../../../../../shared/modules/MaterialImports/CircularProgress";
import EditModal from "./EditModal";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
// import MuiAlert from "@mui/material/Alert";
// import Slide from "@mui/material/Slide";
// import Snackbar from "@mui/material/Snackbar";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
// import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
// import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';

import SearchIcon from "@mui/icons-material/Search";

import { InputAdornment, showToaster } from "../../../../../../shared/modules/commonImports";

import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ViewCompactOutlinedIcon from "@mui/icons-material/ViewCompactOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import DragHandleRoundedIcon from "@mui/icons-material/DragHandleRounded";
// import { SortableContainer, SortableElement } from "react-sortable-hoc";
// import arrayMove from 'array-move';
import { ReactSortable } from "react-sortablejs";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BusinessIcon from "@mui/icons-material/Business";
// import { Formik } from "formik";
import { useFormik, Yup } from "../../../../../../shared/modules/Formik";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
// import SendMailModal from "./SendMailModal";
import SmsModal from "./SmsModal";
import BpRadio from "../../shared/formelements/RadioButton";

// import { json } from "stream/consumers";
import {
  // checkPermision,
  fetchCheckedUserIds,
} from "../../shared/utills/helper";
// import { globalData } from "../../../../../../shared/services/globalData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faTableCells } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import briefcaseIcon from "../../shared/assets/icons/BriefcaseIcon.svg";
import briefcaseDarkIcon from "../../shared/assets/icons/BriefcaseDarkIcon.svg";
import locationIcon from "../../shared/assets/icons/LocationIcon.svg";
import educationIcon from "../../shared/assets/icons/EducationDarkIcon.svg";
import eyeIcon from "../../shared/assets/icons/eye.svg";
import downArrow from "../../shared/assets/icons/downArrow.svg";
import { userLocalData } from "../../../../../../shared/services/userData";
import PhoneDialog from "../../../../../shared/PhoneDialog/PhoneDialog";

import AddCompanyToModal from "../../../../Contacts/Find/AddCompanyToModal/AddCompanyToModal";
import Copy from "../../../../../../shared/utils/Copy";
import MobileCheckBoxModal from "../../shared/mobilecheckboxmodal/MobileCheckBoxModal";
// import { profile } from "node:console";


import "./RightSection.scss";
import { confirmDialog } from "../../../../../shared/ConfirmDialog/ConfirmDialog";
import { trackPromise } from "react-promise-tracker";
import ApiService from "../../../../../../shared/api/api";


const initialValues = {
  tableLayoutName: "",
};

const onSubmit = (values: any) => {
  console.log("layoutFormData", values);
};

const validationSchema = Yup.object({
  tableLayoutName: Yup.string().required("* Required"),
});

// interface TablePaginationActionsProps {
//   count: number;
//   page: number;
//   rowsPerPage: number;
//   onPageChange: (
//     event: React.MouseEvent<HTMLButtonElement>,
//     newPage: number
//   ) => void;
// }

const Editstyle = {
  position: "absolute" as "absolute",
  top: "10%",
  left: "50%",
  transform: "translate(-50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
};

// interface SortableItemProps {
//   value: string;
// }
// const SortableItem = SortableElement(({value}) => <Stack
// sx={{
//   display: "flex",
//   flexDirection: "row",
//   justifyContent: "space-between",
//   border: "1px solid",
//   borderColor: "#cacacc",
// }}
// >
// <FormControlLabel
//   sx={{ flexGrow: "1" }}
//   key={item}
//   control={
//     <BpCheckboxContainer>
//       <Checkbox
//         sx={{ ml: 2 }}
//         disableRipple
//         checked={true}
//         // onChange={(event: any) =>
//         //   handleChildCheckboxChange(

//         //   )
//         // }
//         icon={
//           <BpIcon className="bp-icon" />
//         }
//         checkedIcon={
//           <BpCheckedIcon
//             className="bp-icon"
//             style={{
//               borderColor:
//                 styles.primaryTextColor,
//             }}
//           />
//         }
//         className="bp-checkbox"
//       />
//     </BpCheckboxContainer>
//   }
//   label={
//     <Typography
//       sx={{
//         color: styles.blackcolor,
//         fontSize: "14px",
//         fontWeight: "600",
//         fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
//         textAlign: "left",
//       }}
//     >
//       {item}
//     </Typography>
//   }
// />
// <DragHandleRoundedIcon
//   sx={{
//     fontSize: "20px",
//     color: "#737373",
//     alignSelf: "center",
//     marginRight: "10px",
//   }}
// />
// </Stack>);

// interface SortableListProps {
//   items: string[];
// }

// const SortableList = SortableContainer(({items}) => {
//   return (
//       {items.map((value, index) => (
//         <SortableItem key={`item-${value}`} index={index} value={value} />
//       ))}
//   );
// });

const BpIcon = styled("span")(({ }) => ({
  borderRadius: 1,
  width: 16,
  height: 16,
  backgroundColor: "#ffffff",
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: styles.primaryTextColor,
  "&:before": {
    display: "block",
    width: 16,
    height: 16,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
});

const RadioBpIcon = styled("span")(({ theme }) => ({
  borderRadius: "50%",
  width: 16,
  height: 16,
  boxShadow:
    theme.palette.mode === "dark" ? "red" : "inset 0 0 0 1px rgba(16,22,26,.2)",
}));

const RadioBpCheckedIcon = styled(RadioBpIcon)({
  backgroundColor: "#146EF6",
  boxShadow: "none",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&:before": {
    display: "block",
    width: 16,
    height: 16,
    backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
    content: '""',
  },
});

const BpCheckboxContainer = styled("div")({
  ".bp-icon": {
    border: "1px #CACACC solid",
  },
  "& .bp-checkbox:hover .bp-icon": {
    borderColor: styles.primaryTextColor,
  },
  "& .bp-checkbox.checked .bp-icon": {
    border: "none", // Remove border when checked
  },
  // "& .bp-checkbox .bp-icon.checked": {
  //   border: "none", // Remove border when checked
  // },
  // "& .bp-checkbox.checked:hover .bp-icon": {
  //   borderColor: "transparent", // Remove border when checked and hovered
  // },
});

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} arrow />
))(({ }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#000000",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#000000",
    color: "#ffffff",
    fontSize: "13px",
    fontFamily:
      'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontWeight: "600",
  },
}));

const style1 = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 662,
  height: 335,
  bgcolor: "#FFFFFF",
  borderRadius: "4px",
  boxShadow: 24,
  p: 4,
};

const style2 = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 662,
  height: 369,
  bgcolor: "#FFFFFF",
  borderRadius: "4px",
  boxShadow: 24,
  p: 4,
};

// const labels = [
//   { label: 'vali', id: 1 },
//   { label: 'list4', id: 2 },
//   { label: 'list1', id: 3 },
// ]

// const seqdropdown = ["Testing-1", "Testing-2"];

interface RightSectionProps {
  ishide: boolean;
  onIsHideChange: (value: boolean) => void;
}

// const RightSection: React.FC<RightSectionProps> = ({
//   ishide,
//   onIsHideChange,
// }) => {
//   const [pinnedColumns, setPinnedColumns] = useState<GridPinnedColumns>({
//     left: ["name"],
//   });

// function TablePaginationActions(props: TablePaginationActionsProps) {
//   const theme = useTheme();
//   const { count, page, rowsPerPage, onPageChange } = props;

//   const handleFirstPageButtonClick = (
//     event: React.MouseEvent<HTMLButtonElement>
//   ) => {
//     onPageChange(event, 0);
//   };

//   const handleBackButtonClick = (
//     event: React.MouseEvent<HTMLButtonElement>
//   ) => {
//     onPageChange(event, page - 1);
//   };

//   const handleNextButtonClick = (
//     event: React.MouseEvent<HTMLButtonElement>
//   ) => {
//     onPageChange(event, page + 1);
//   };

//   const handleLastPageButtonClick = (
//     event: React.MouseEvent<HTMLButtonElement>
//   ) => {
//     onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
//   };

//   return (
//     <Box sx={{ flexShrink: 0, ml: 2.5 }}>
//       <IconButton
//         onClick={handleFirstPageButtonClick}
//         disabled={page === 0}
//         aria-label="first page"
//       >
//         {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
//       </IconButton>
//       <IconButton
//         onClick={handleBackButtonClick}
//         disabled={page === 0}
//         aria-label="previous page"
//       >
//         {theme.direction === "rtl" ? (
//           <KeyboardArrowRight />
//         ) : (
//           <KeyboardArrowLeft />
//         )}
//       </IconButton>
//       <IconButton
//         onClick={handleNextButtonClick}
//         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//         aria-label="next page"
//       >
//         {theme.direction === "rtl" ? (
//           <KeyboardArrowLeft />
//         ) : (
//           <KeyboardArrowRight />
//         )}
//       </IconButton>
//       <IconButton
//         onClick={handleLastPageButtonClick}
//         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//         aria-label="last page"
//       >
//         {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
//       </IconButton>
//     </Box>
//   );
// }

const RightSection: React.FC<RightSectionProps> = ({
  ishide,
  onIsHideChange,
}) => {
  // console.log(checkPermision(), 'checkkk')
  // const pageNumberRef = useRef<any>(null);
  const [isMailBodyopen, setMailBodyOpen] = useState<any>(false);
  // const [selectPersonObj, setSelectPersonObj] = useState<any>();
  const [selectPersonFullName, setSelectPersonFullName] = useState<any>();
  const [selectPersonMail, setSelectPersonMail] = useState<any>();
  const [selectPersonCandtId, setSelectPersonCandtId] = useState<any>();
  const [isBulk, setIsBulk] = useState<any>(false);
  const [isOpenCheckboxModal, setOpenCheckboxModal] = useState<any>(false)
  const { settingIds, adminIds } = localStorage.getItem("masterRequireAuthSettings") ? JSON.parse(localStorage.getItem("masterRequireAuthSettings") as string) : {
    settingIds: {},
    // integrationIds: {},
    adminIds: {}
  };
  const handleMailBodyOpen = () => {
    if (checkedCount > 0 && isValidEmail) {
      setMailBodyOpen(true);
    }

    let talentData = talentWithCommunityData.filter((item: any) =>
      checkedRowIds.includes(item.person_id)
    );
    let dataArray = searchData.displayData.filter((item: any) =>
      checkedRowIds.includes(item.id)
    );
    let dataObj: any = fetchCheckedUserIds(checked, searchData.displayData);
    console.log(dataArray, 'dataArraydataArray', dataObj)

    let singleSelectPersonName = talentData
      .map((talent) => {
        let matchingData = dataArray.find(
          (item: any) => item.id === talent.person_id
        );
        return matchingData ? matchingData.full_name : null;
      })
      .filter((name) => name !== null);

    let singleSelectPersonMail = talentData.map((item: any) => item.email);
    let singleSelectPersonId = talentData.map((item: any) => item.userId);
    // console.log('singlePersonCheckObjzzzz', talentData)
    // console.log('singlePersonCheckObjzzzz', talentData)
    // console.log('singleSelectPersonMail', singleSelectPersonMail)
    // console.log('singleSelectPersonId', singleSelectPersonId)

    if (checkedRowIds.length > 0) {
      // setSelectPersonObj(talentData.join());
      setSelectPersonFullName(singleSelectPersonName.join());
      setSelectPersonMail(singleSelectPersonMail.join());
      setSelectPersonCandtId(dataObj);
      setIsBulk(true);
    }
  };

  // const handleMailBosyClose = () => {
  //   setMailBodyOpen(false);
  // };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  // const [showEmailToaster, setShowEmailSuccess] = useState(false);
  // const closeEmailToast = () => {
  //   setShowEmailSuccess(false);
  // };

  const [addCompanyToModal, setAddCompanyToModal] = useState(false);

  // const showEmailSuccess = () => {
  //   setShowEmailSuccess(true);
  // };

  const [isTableLayoutMenu, setIsTableLayoutMenu] =
    useState<null | HTMLElement>(null);

  const openTableLayoutMenu = Boolean(isTableLayoutMenu);

  const onClickTableLayout = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsTableLayoutMenu(event.currentTarget);
    sendListLayoutData();
    // console.log('is coming')
    setIsAll(true);
    setIsPublic(false);
    setIsPrivate(false);
  };

  const handleTableLayoutMenu = () => {
    setIsTableLayoutMenu(null);
  };

  const [isViewChangeMenu, setIsViewChangeMenu] = useState<null | HTMLElement>(
    null
  );

  const openViewChangeMenu = Boolean(isViewChangeMenu);

  const onClickTableChangeView = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setIsViewChangeMenu(event.currentTarget);
  };

  const handleViewChangeMenu = () => {
    setIsViewChangeMenu(null);
  };

  // const [isCardViewMenu, setIsCardViewMenu] = useState<null | HTMLElement>(
  //   null
  // );

  // const openCardViewMenu = Boolean(isCardViewMenu);

  // const onClickCardChangeView = (
  //   event: React.MouseEvent<HTMLButtonElement>
  // ) => {
  //   setIsCardViewMenu(event.currentTarget);
  // };

  // const handleCardViewMenu = () => {
  //   setIsCardViewMenu(null);
  // };

  const [isTableView, setIsTableView] = useState(true);
  const [isCardView, setIsCardView] = useState(false);

  const onClickCardView = () => {
    setIsCardView(true);
    setIsTableView(false);
    handleViewChangeMenu();
  };

  const onClickTableView = () => {
    setIsCardView(false);
    setIsTableView(true);
    handleViewChangeMenu();
  };

  const [isTableLayoutMenuMoreOptions, setIsTableLayoutMenuMoreOptions] =
    useState<null | HTMLElement>(null);

  const openTableLayoutMenuMoreOptions = Boolean(isTableLayoutMenuMoreOptions);

  const [isSelectedMoreOption, setIsSelectedMoreOption] = useState<
    number | null
  >(null);

  const onClickTableLayoutMenuMoreOptions = (
    event: React.MouseEvent<HTMLButtonElement>,
    layoutId: any
  ) => {
    setIsTableLayoutMenuMoreOptions(event.currentTarget);
    event.stopPropagation();
    console.log("layoutIdMoreOptions", layoutId);
    setIsSelectedMoreOption(layoutId);
    setIsOnMouseLayoutMenuMoreOptionsRemove(false);
  };

  const [sequenceData, setSequenceData] = useState<any>([]);
  const onClickLayoutItem = (_event: any, layoutId: any) => {
    // event.stopPropagation();
    console.log("layoutId", layoutId);
    sendChangeSelectedLayout(layoutId);
    setIsTableLayoutMenu(null);
  };

  const [updateLayoutId, setUpdateLayoutId] = useState<null | number>(
    null
  );

  // const [updateLayoutName, setUpdateLayoutName] = useState("");

  // const [updateLayoutVisibility, setUpdateLayoutVisibility] = useState(false)

  // const [updateLayoutVisibilityPrivate, setUpdateLayoutVisibilityPrivate] = useState(false);

  // const [updateLayoutVisibilityPublic, setUpdateLayoutVisibilityPublic] = useState(false);

  // const [isLayoutMenuMoreOptionsEdit, setIsLayoutMenuMoreOptionsEdit] = useState(false);
  const [layoutHeaderName, setLayoutHeaderName] = useState("");
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [checkBoxChecked, setCheckBoxChecked] = useState<any>([]);

  const onClickLayoutMenuMoreOptionsEdit = (event: any, layoutItem: any) => {
    setIsDuplicate(false);
    setLayoutHeaderName(`Edit ${layoutItem.layoutName}`);
    // console.log("layoutIdEdit", layoutId)
    // setIsLayoutMenuMoreOptionsEdit(true);
    setUpdateLayoutId(layoutItem.layoutId);
    event.stopPropagation();
    // sendLayoutUpdateData(layoutId)
    // onClickNewLayout()
    setIsNextLayout(true);
    sendGetLayoutData(layoutItem.layoutId);
    setIsSaveButton(true);

    const filteredLayoutItem = listLayoutData.filter(
      (item: any) => item.layoutId === layoutItem.layoutId
    );

    // console.log("filteredLayoutItem[0]", filteredLayoutItem[0])

    const filteredLayoutItemName = filteredLayoutItem[0]["layoutName"];
    formik.values.tableLayoutName = filteredLayoutItemName;
    // setUpdateLayoutName(filteredLayoutItemName);
    const filteredLayoutItemVisibility = filteredLayoutItem[0]["visibility"];
    let visibilityVal = filteredLayoutItemVisibility ? "public" : "private";
    setDefaultVisibility(visibilityVal);
    // setUpdateLayoutVisibility(filteredLayoutItemVisibility)
    // if (filteredLayoutItemVisibility) {
    //   setUpdateLayoutVisibilityPublic(true);
    // } else {
    //   setUpdateLayoutVisibilityPrivate(true);
    // }
  };

  const onClickLayoutMenuMoreOptionsDuplicate = async (
    event: any,
    layoutItem: any
  ) => {
    setIsDuplicate(true);
    console.log(layoutItem, "lll");
    setLayoutHeaderName(`Edit ${layoutItem.layoutName}`);
    // console.log("layoutIdEdit", layoutId)
    // setIsLayoutMenuMoreOptionsEdit(true);
    setUpdateLayoutId(layoutItem.layoutId);
    event.stopPropagation();
    // sendLayoutUpdateData(layoutId)
    // onClickNewLayout()
    setIsNextLayout(true);
    sendGetLayoutData(layoutItem.layoutId);
    setIsSaveButton(true);

    const filteredLayoutItem = listLayoutData.filter(
      (item: any) => item.layoutId === layoutItem.layoutId
    );

    // console.log("filteredLayoutItem[0]", filteredLayoutItem[0])

    const filteredLayoutItemName =
      "Copy of " + filteredLayoutItem[0]["layoutName"];
    formik.values.tableLayoutName = filteredLayoutItemName;
    // console.log("filteredLayoutItemName", filteredLayoutItemName);
    // setUpdateLayoutName(filteredLayoutItemName);
    const filteredLayoutItemVisibility = filteredLayoutItem[0]["visibility"];

    let visibilityVal = filteredLayoutItemVisibility ? "public" : "private";
    setDefaultVisibility(visibilityVal);
    // setUpdateLayoutVisibility(filteredLayoutItemVisibility)
    // if (filteredLayoutItemVisibility) {
    //   setUpdateLayoutVisibilityPublic(true)
    // }
    // else {
    //   setUpdateLayoutVisibilityPrivate(true)
    // }
  };
  const [defaultVisibilty, setDefaultVisibility] = useState("private");
  // const [closeLayoutError, setLayoutError] = useState(false);
  // const closeTableLayout = () => {
  //   setLayoutError(false);
  // };
  const handleRadioChange = (e: any) => {
    let visibilityValue = e.target.value === "private" ? "private" : "public";
    setDefaultVisibility(visibilityValue);
    // console.log(e.target.value, 'hello')
  };

  const onClickLayoutMenuMoreOptionsRemove = (event: any, layoutId: any) => {
    event.stopPropagation();
    sendDeleteLayout(layoutId);
  };
  const [checked, setChecked] = useState<boolean[]>([]);

  const handleSequenceSave = (_e: any, value: any, type: any) => {
    let sequenceId = value.sequenceId;
    // let userIds = fetchCheckedUserIds(checked, searchData.displayData);
    if (sequenceId) {

      let dataObj: any = fetchCheckedUserIds(checked, searchData.displayData);
      let postData: any = {
        clientId: recrData.clientId,
        recrId: recrData.recrId,
        requestInfo: [],
        sequenceId: sequenceId
      }

      if (dataObj && dataObj.userIdsData.length > 0) {
        // if (dataObj.userIdsData.length === 1) {
        //   postData.requestInfo.push({
        //     isSaveWithEmail: true,
        //     isSaveWithPhoneNumber: true,
        //     userId: dataObj.userIdsData[0],            
        //     contId: dataObj.userIdsData[0],
        //   })
        // } else {
        postData.requestInfo.push({
          isSaveWithEmail: true,
          isSaveWithPhoneNumber: false,
          userIds: dataObj.userIdsData.join(),
          // contIds: dataObj.userIdsData.join(),
        })
        // }
        // dataObj.userIdsData.forEach((userIdVal: any) => {
        //   postData.requestInfo.push({
        //     userId: userIdVal,

        //   })
        // })
      }
      if (dataObj && dataObj.personIds.length > 0) {
        // dataObj.personIds.forEach((personIdVal: any) => {
        //   postData.requestInfo.push({

        //     personId: personIdVal
        //   })
        // })
        // if (dataObj.personIds.length === 1) {
        //   postData.requestInfo.push({
        //     isSaveWithEmail: true,
        //     isSaveWithPhoneNumber: true,
        //     personId: dataObj.personIds[0],
        //   })
        // } else {
        postData.requestInfo.push({
          isSaveWithEmail: true,
          isSaveWithPhoneNumber: false,
          personIds: dataObj.personIds.join(),
        })
        // }
      }
      if (!isContact()) {
        apiService
          .saveSequenceChromeExt(postData)
          .then((response: any) => {
            console.log("SendSequenceList:", response.data);
            if (response.data.Error) {
              showToaster(response.data.Message, 'error');
              handleClose();
            } else {
              showToaster("Campaign saved successfully", "success");
              // setShowSeqSuccess(true);
              getTableData(type);
              handleClose();
            }
          })
          .catch((error: any) => {
            console.error("Error fetching data:", error);
            // setShowSeqSuccess(false);
            handleClose();
          });
      }

      else {
        let postContactData = {
          clientId: recrData.clientId,
          recrId: recrData.recrId,
          sequenceId: sequenceId,
          "userIds": "",
          "contIds": dataObj.userIdsData.join(),
          "isExtension": true,
          "personIds": dataObj.personIds.join(),
          "isSaveWithEmail": true,
          "isSaveWithPhoneNumber": false
        }

        apiService
          .BulkContactSequenceSave(postContactData)
          .then((response: any) => {
            console.log("SendSequenceList:", response.data);
            if (response.data.Error) {
              showToaster(response.data.Message, 'error');
              handleClose();
            } else {
              showToaster("Campaign saved successfully", "success");
              // setShowSeqSuccess(true);
              getTableData(type);
              handleClose();
            }
          })
          .catch((error: any) => {
            console.error("Error fetching data:", error);
            // setShowSeqSuccess(false);
            handleClose();
          });
      }


    }


  };

  const reloadTableData = (data: any) => {
    if (checkboxModalTitle == "Campaign") {
      if (data.Error) {
        showToaster(data.Message, 'error');
      }
      else {
        showToaster("Campaign saved successfully", "success");
        getTableData("isFromAutosave")
      }
    }

    else if (checkboxModalTitle == "Pool") {
      if (data.Error) {
        showToaster(data.Message, 'error');
      } else if (data.Success) {
        if (!isContact()) {
          showToaster("Pool has been assigned successfully", 'success');
        }
        else {
          showToaster("List has been assigned successfully", 'success');
        }

        getTableData("isFromAutosave");
      }
    }

    else {
      if (data.Success) {

        setIsRecordSavedAccuick(data.Success);
        showToaster("Record stored successfully", 'success');
        channelToBroadcast.postMessage({
          checkCreditScore: true
        });
        let creditsData = localStorage.getItem(`credits_${userLocalData.getvalue('recrId')}`)
        if (creditsData) {
          let parsedCreditsData = JSON.parse(creditsData)
          console.log(parsedCreditsData)
          setProfileCredits(parsedCreditsData?.totalProfileCredits)
          setConsumedCredits(parsedCreditsData?.consumedProfileCredits)
          if (userLocalData.getvalue(
            "paymentType"
          ) !== 1 || userLocalData.getvalue(
            "paymentType"
          ) !== 2) {
            setSmsCredits(parsedCreditsData?.totalSmsCredits)
            setConsumedSmsCredits(parsedCreditsData?.consumedSmsCredits)
          }

        }
        const updatedChecked = checked.map(() => false);
        setChecked(updatedChecked);
        setSelectAll(false);
        setSelectAllClicked(false);
        setCheckBoxChecked([]);
        setCheckedRowIds([]);
        getTableData("")
      }
      else {
        showToaster(data.Message ? data.Message : "An error occured while saving.", "error");
      }
    }

  }

  const handleTableLayoutMenuMoreOptions = (event: any) => {
    setIsTableLayoutMenuMoreOptions(null);
    event.stopPropagation();
    // setIsLayoutMenuMoreOptionsEdit(false);
  };

  const [
    isOnMouseLayoutMenuMoreOptionsEdit,
    setIsOnMouseLayoutMenuMoreOptionsEdit,
  ] = useState(false);

  const onMouseOverLayoutMenuMoreOptionsEdit = () => {
    setIsOnMouseLayoutMenuMoreOptionsEdit(true);
  };

  const onMouseOutLayoutMenuMoreOptionsEdit = () => {
    setIsOnMouseLayoutMenuMoreOptionsEdit(false);
  };

  const [
    isOnMouseLayoutMenuMoreOptionsDuplicate,
    setIsOnMouseLayoutMenuMoreOptionsDuplicate,
  ] = useState(false);

  const onMouseOverLayoutMenuMoreOptionsDuplicate = () => {
    setIsOnMouseLayoutMenuMoreOptionsDuplicate(true);
  };

  const onMouseOutLayoutMenuMoreOptionsDuplicate = () => {
    setIsOnMouseLayoutMenuMoreOptionsDuplicate(false);
  };

  const [
    isOnMouseLayoutMenuMoreOptionsRemove,
    setIsOnMouseLayoutMenuMoreOptionsRemove,
  ] = useState(false);

  const onMouseOverLayoutMenuMoreOptionsRemove = () => {
    setIsOnMouseLayoutMenuMoreOptionsRemove(true);
  };

  const onMouseOutLayoutMenuMoreOptionsRemove = () => {
    setIsOnMouseLayoutMenuMoreOptionsRemove(false);
  };

  const [listLayoutData, setListLayoutData] = useState<any>([]);
  const [intialLayoutData, setIntialData] = useState([]);
  const [isAll, setIsAll] = useState(true);

  // console.log(isAllData, 'isAllDataisAllData')
  const [filterValue, setFilterValue] = useState("");
  // console.log("!filterValue", !filterValue)
  const isPrivateData = intialLayoutData.filter((layout: any) => {
    return (
      !layout.visibility &&
      layout.layoutName.toLowerCase().includes(filterValue.toLowerCase())
    );
  });
  const isPublicData = intialLayoutData.filter((layout: any) => {
    return (
      layout.visibility &&
      layout.layoutName.toLowerCase().includes(filterValue.toLowerCase())
    );
  });
  const onClickIsAll = () => {
    setIsAll(true);
    setIsPrivate(false);
    setIsPublic(false);
    setListLayoutData(intialLayoutData);

    const filterAllDataItem = intialLayoutData.filter(
      (item: any) => item.isSelected === true
    );

    console.log("filterAllDataItem", filterAllDataItem);

    const selectedAllLayoutId = filterAllDataItem[0]?.["layoutId"];

    console.log("selectedAllLayoutId", selectedAllLayoutId);

    const filteredAllLayoutItem = intialLayoutData.filter(
      (item: any) => item.layoutId === selectedAllLayoutId
    );
    console.log("filteredAllLayoutItem", filteredAllLayoutItem);

    const updatedFilteredAllListLayoutData: any = filteredAllLayoutItem.map(
      (item: any) => {
        if (item.layoutId === selectedAllLayoutId) {
          return { ...item, isSelected: true };
        }
      }
    );

    console.log(
      "updatedFilteredAllListLayoutData",
      updatedFilteredAllListLayoutData
    );

    const updatedAllListLayoutData: any = intialLayoutData.map((item: any) => {
      if (item.layoutId === selectedAllLayoutId) {
        return { ...updatedFilteredAllListLayoutData[0] };
      } else {
        return { ...item, isSelected: false };
      }
    });

    console.log("updatedAllListLayoutData", updatedAllListLayoutData);

    setListLayoutData(updatedAllListLayoutData);
  };

  const [isPrivate, setIsPrivate] = useState(false);
  const onClickIsPrivate = () => {
    setIsPrivate(true);
    setIsAll(false);
    setIsPublic(false);

    setListLayoutData(isPrivateData);

    const filterPrivateDataItem = intialLayoutData.filter(
      (item: any) => item.isSelected === true
    );

    const selectedPrivateLayoutId = filterPrivateDataItem[0]?.["layoutId"];

    console.log("selectedPrivateLayoutId", selectedPrivateLayoutId);

    const filteredPrivateLayoutItem = isPrivateData.filter(
      (item: any) => item.layoutId === selectedPrivateLayoutId
    );
    console.log("filteredPrivateLayoutItem", filteredPrivateLayoutItem);

    const updatedFilteredPrivateListLayoutData: any =
      filteredPrivateLayoutItem.map((item: any) => {
        if (item.layoutId === selectedPrivateLayoutId) {
          return { ...item, isSelected: true };
        }
      });

    console.log(
      "updatedFilteredPrivateListLayoutData",
      updatedFilteredPrivateListLayoutData
    );

    const updatedPrivateListLayoutData: any = isPrivateData.map((item: any) => {
      if (item.layoutId === selectedPrivateLayoutId) {
        return { ...updatedFilteredPrivateListLayoutData[0] };
      } else {
        return { ...item, isSelected: false };
      }
    });

    console.log("updatedPrivateListLayoutData", updatedPrivateListLayoutData);

    setListLayoutData(updatedPrivateListLayoutData);
  };

  const [isPublic, setIsPublic] = useState(false);
  const onClickIsPublic = () => {
    setIsPublic(true);
    setIsPrivate(false);
    setIsAll(false);
    setListLayoutData(isPublicData);

    const filterPublicDataItem = intialLayoutData.filter(
      (item: any) => item.isSelected === true
    );

    const selectedPublicLayoutId = filterPublicDataItem[0]?.["layoutId"];

    console.log("selectedPublicLayoutId", selectedPublicLayoutId);

    const filteredPublicLayoutItem = isPublicData.filter(
      (item: any) => item.layoutId === selectedPublicLayoutId
    );
    console.log("filteredPublicLayoutItem", filteredPublicLayoutItem);

    const updatedFilteredPublicListLayoutData: any =
      filteredPublicLayoutItem.map((item: any) => {
        if (item.layoutId === selectedPublicLayoutId) {
          return { ...item, isSelected: true };
        }
      });

    console.log(
      "updatedFilteredPublicListLayoutData",
      updatedFilteredPublicListLayoutData
    );

    const updatedPublicListLayoutData: any = isPublicData.map((item: any) => {
      if (item.layoutId === selectedPublicLayoutId) {
        return { ...updatedFilteredPublicListLayoutData[0] };
      } else {
        return { ...item, isSelected: false };
      }
    });

    console.log("updatedPublicListLayoutData", updatedPublicListLayoutData);

    setListLayoutData(updatedPublicListLayoutData);
  };

  const [isNextLayout, setIsNextLayout] = useState(false);
  // const [apiLoading, setApiLoading] = useState(false);

  // let parsedHeaderItems: any;
  const onClickNewLayout = () => {
    setLayoutHeaderName("New Table Layout");
    setIsNextLayout(true);
    setDefaultVisibility("private");
    formik.values.tableLayoutName = "";
    // console.log("headerItems", headerItems)
    // console.log("TypeOfheaderItems", typeof(headerItems))
    // console.log(typeof("string"))
    // if (typeof(headerItems) === typeof("")) {
    //   console.log("working parse")
    //   parsedHeaderItems = JSON.parse(headerItems)
    // }
    // else {
    //   setHeaderItems(headerItems)

    // }
  };

  const [isSaveButton, setIsSaveButton] = useState(false);

  const onClickSaveLayout = () => {
    setIsSaveButton(false);

    setIsTableLayoutMenu(null);
    setIsTableLayoutMenuMoreOptions(null);

    setIsNextLayout(false);
    setIsLayoutColumn(true);
    setIsSetting(false);
    setIsContactLayoutModal(false);
    setIsAccountLayoutModal(false);
    // setIsSettingPrivate(true);
    // setIsSettingPublic(false);
    // sendListLayoutData()
    if (isDuplicate) {
      sendLayoutSaveData();
    } else {
      sendLayoutUpdateData();
      // sendLayoutSaveData()
    }

    // setIsLayoutMenuMoreOptionsEdit(false);
  };

  const handleCloseNextLayout = () => {
    setIsTableLayoutMenu(null);
    setIsTableLayoutMenuMoreOptions(null);

    setIsNextLayout(false);
    setIsLayoutColumn(true);
    setIsSetting(false);
    setIsContactLayoutModal(false);
    setIsAccountLayoutModal(false);
    // setIsSettingPrivate(true);
    // setIsSettingPublic(false);

    // setIsLayoutMenuMoreOptionsEdit(false);
    setIsSaveButton(false);
  };

  const [isLayoutColumn, setIsLayoutColumn] = useState(true);
  const onClickLayoutColumn = () => {
    setIsLayoutColumn(true);
    setIsSetting(false);
  };

  const [isSetting, setIsSetting] = useState(false);
  const onClickSetting = () => {
    setIsLayoutColumn(false);
    setIsSetting(true);
  };

  const defaultHeaderItems = [
    "full_name",
    "title",
    "company",
    "Industry",
    "location",
    "Actions",
  ];

  // const [showMoreEmpHis, setShowMoreEmpHis] = useState(false);
  const toggleShowMoreEmpHis = (id: any) => {
    // setShowMoreEmpHis(!showMoreEmpHis)
    let tableData = [...searchData.displayData];
    tableData.forEach((data: any) => {
      if (data.id === id) {
        data.isEmpHisShowMore = !data.isEmpHisShowMore;
      }
    });

    setSearchData((prevSearchData: any) => ({
      ...prevSearchData,
      displayData: tableData,
    }));
  };
  const numberOfEmpHisLinesToShow = 3;

  // const [showMoreEdu, setShowMoreEdu] = useState(false);
  const toggleShowMoreEdu = (id: any) => {
    // setShowMoreEdu(!showMoreEdu)
    let tableData = [...searchData.displayData];
    tableData.forEach((data: any) => {
      if (data.id === id) {
        data.isEduShowMore = !data.isEduShowMore;
      }
    });

    setSearchData((prevSearchData: any) => ({
      ...prevSearchData,
      displayData: tableData,
    }));
  };
  const numberOfEduLinesToShow = 3;

  const tableHeaderItems: any[] = [
    { name: "Name", key: "full_name" },
    { name: "Title", key: "title" },
    { name: "Company", key: "company" },
    { name: "Industry & Keywords", key: "Industry" },

    { name: "Location", key: "location" },
    { name: "Quick Actions", key: "Actions" },
  ];

  const [headerItems, setHeaderItems] = useState(tableHeaderItems);

  const [mainTableHeaderItems, setMainTableHeaderItems] =
    useState(headerItems);

  // console.log("headerItems", headerItems);

  // const [isTableLayoutName, setIsTableLayoutName] = useState(true);
  // const [isTableLayoutTitle, setIsTableLayoutTitle] = useState(true);
  // const [isTableLayoutCompany, setIsTableLayoutCompany] = useState(true);
  // const [isTableLayoutLocation, setIsTableLayoutLocation] = useState(true);
  // const [isTableLayoutIndustry, setIsTableLayoutIndustry] = useState(false);
  // const [isTableLayoutActions, setIsTableLayoutActions] = useState(false);

  const contactLayoutModalItems = [
    { name: "Persona", key: "persona" },
    { name: "Revenue", key: "revenue" },

    // { index: 7, value: "Persona",, name:"", key:"", },

    // { index: 8, value: "Revenue",, name:"", key:"", },
  ];

  const [contactItems, setContactItems] = useState(
    contactLayoutModalItems
  );

  // console.log("contactItems", contactItems);

  const accountLayoutModalItems = [
    { name: "Funding", key: "funding" },
    // { index: 10, value: "Technologies", name:"", key:"", },
  ];

  const [accountItems, setAccountItems] = useState(
    accountLayoutModalItems
  );

  // const [headerClickedIndices, setHeaderClickedIndices] = useState<
  //   number[]
  // >([]);

  // console.log("headerClickedIndices", headerClickedIndices);
  // if (headerItems.some((item: any) => item.value === "Company")) {
  //   setIsTableLayoutCompany(true);
  //   console.log("working company");
  // }
  const onClickHeaderItem = (key: any) => {
    // const newHeaderClickedIndices = [...headerClickedIndices, key];

    // setHeaderClickedIndices(newHeaderClickedIndices);

    if (!defaultHeaderItems.includes(key)) {
      console.log("headerItemkey", key);
      const filteredHeaderItem = headerItems.filter(
        (item: any) => item.key === key
      );
      // console.log("filteredHeaderItem[0]", filteredHeaderItem[0]);
      if (filteredHeaderItem[0]) {
        if (
          !contactItems.some((item) => item.key === filteredHeaderItem[0].key)
        ) {
          if (
            contactLayoutModalItems.some(
              (item: any) => item.key === filteredHeaderItem[0].key
            )
          ) {
            const newContactItems = [...contactItems, filteredHeaderItem[0]];

            setContactItems(newContactItems);
          }
        }

        if (
          !accountItems.some((item) => item.key === filteredHeaderItem[0].key)
        ) {
          if (
            accountLayoutModalItems.some(
              (item: any) => item.key === filteredHeaderItem[0].key
            )
          ) {
            const newAccountItems = [...accountItems, filteredHeaderItem[0]];

            setAccountItems(newAccountItems);
          }
        }

        const updatedHeaderItems = headerItems.filter(
          (item: any) => item.key !== filteredHeaderItem[0].key
        );
        console.log("updatedHeaderItems", updatedHeaderItems);
        // if (headerClickedIndices.includes(filteredHeaderItem[0].key)) {
        setHeaderItems(updatedHeaderItems);
        // setHeaderClickedIndices([]);
        // }
      }

      // if (filteredHeaderItem[0].name === "Company") {
      //   setIsTableLayoutCompany(false);
      // } else if (filteredHeaderItem[0].name === "Location") {
      //   setIsTableLayoutLocation(false);
      // } else if (filteredHeaderItem[0].name === "Industry & Keywords") {
      //   setIsTableLayoutIndustry(false);
      // } else if (filteredHeaderItem[0].name === "Quick Actions") {
      //   setIsTableLayoutActions(false);
      // }
    }
  };

  const onClickContactItem = (key: any) => {
    console.log("contactItemkey", key);
    const filteredContactItem = contactItems.filter((item) => item.key === key);

    if (filteredContactItem[0]) {
      // Check if filteredContactItem[0] is not already present in headerItems
      if (
        !headerItems.some(
          (item: any) => item.key === filteredContactItem[0].key
        )
      ) {
        // Create a new array with filteredContactItem[0] appended to headerItems
        const newHeaderItems = [...headerItems, filteredContactItem[0]];

        // Update the state with the new array
        setHeaderItems(newHeaderItems);
      }

      // Remove filteredContactItem[0] from contactItems
      const updatedContactItems = contactItems.filter(
        (item) => item.key !== filteredContactItem[0].key
      );
      setContactItems(updatedContactItems);
    }
    // if (filteredContactItem[0].name === "Company") {
    //   setIsTableLayoutCompany(true);
    // } else if (filteredContactItem[0].name === "Location") {
    //   setIsTableLayoutLocation(true);
    // } else if (filteredContactItem[0].name === "Industry & Keywords") {
    //   setIsTableLayoutIndustry(true);
    // } else if (filteredContactItem[0].name === "Quick Actions") {
    //   setIsTableLayoutActions(true);
    // }
  };

  const onClickAccountItem = (key: any) => {
    console.log("contactItemkey", key);
    const filteredAccountItem = accountItems.find((item) => item.key === key);

    if (filteredAccountItem) {
      // Check if filteredAccountItem is not already present in headerItems
      if (
        !headerItems.some((item: any) => item.key === filteredAccountItem.key)
      ) {
        // Create a new array with filteredAccountItem appended to headerItems
        const newHeaderItems = [...headerItems, filteredAccountItem];

        // Update the state with the new array
        setHeaderItems(newHeaderItems);
      }

      // Remove filteredAccountItem from accountItems
      const updatedAccountItems = accountItems.filter(
        (item) => item.key !== filteredAccountItem.key
      );
      setAccountItems(updatedAccountItems);
    }
  };

  const handleSortHeaderList = (HeaderList: any) => {
    setHeaderItems(HeaderList);
  };
  // const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
  //   setHeaderItems((prevItems:any) => arrayMove(prevItems, oldIndex, newIndex));
  // };

  const [isMouseOverCancel, setIsMouseOverCancel] = useState(false);

  const onMouseOverCancel = () => {
    setIsMouseOverCancel(true);
  };

  const onMouseOutCancel = () => {
    setIsMouseOverCancel(false);
  };

  const [isMouseOverPrevious, setIsMouseOverPrevious] = useState(false);

  const onMouseOverPrevious = () => {
    setIsMouseOverPrevious(true);
  };

  const onMouseOutPrevious = () => {
    setIsMouseOverPrevious(false);
  };

  const cancelNextLayoutModal = () => {
    setIsTableLayoutMenu(null);
    setIsTableLayoutMenuMoreOptions(null);

    setIsNextLayout(false);
    setIsMouseOverCancel(false);
    setIsLayoutColumn(true);
    setIsSetting(false);
    setIsContactLayoutModal(false);
    setIsAccountLayoutModal(false);
    // setIsSettingPrivate(true);
    // setIsSettingPublic(false);

    // setIsLayoutMenuMoreOptionsEdit(false);
    setIsSaveButton(false);
  };

  const previousLayoutColumns = () => {
    setIsLayoutColumn(true);
    setIsSetting(false);
    setIsMouseOverPrevious(false);
  };

  const onClickNextButton = () => {
    setIsLayoutColumn(false);
    setIsSetting(true);
  };

  // const [isMainTableLayoutName, setIsMainTableLayoutName] = useState(true);
  // const [isMainTableLayoutTitle, setIsMainTableLayoutTitle] = useState(true);
  // const [isMainTableLayoutCompany, setIsMainTableLayoutCompany] = useState(true);
  // const [isMainTableLayoutLocation, setIsMainTableLayoutLocation] = useState(true);
  // const [isMainTableLayoutIndustry, setIsMainTableLayoutIndustry] = useState(true);
  // const [isMainTableLayoutActions, setIsMainTableLayoutActions] = useState(true);

  // const [isCreateNewLayout, setIsCreateNewLayout] = useState(false);

  const onClickCreateNewLayout = () => {
    // setIsCreateNewLayout(true);
    // if (headerItems.some((item: any) => item.value === "Company")) {
    //   setIsMainTableLayoutCompany(true);
    // }
    // if (headerItems.some((item: any) => item.value === "Location")) {
    //   setIsMainTableLayoutLocation(true);
    // }
    // if (headerItems.some((item: any) => item.value === "Industry & Keywords")) {
    //   setIsMainTableLayoutIndustry(true);
    // }
    // if (headerItems.some((item: any) => item.value === "Quick Actions")) {
    //   setIsMainTableLayoutActions(true);
    // }
    console.log("Value", formik.values.tableLayoutName);

    if (formik.values.tableLayoutName !== "") {
      setMainTableHeaderItems(headerItems);

      setIsTableLayoutMenu(null);
      setIsTableLayoutMenuMoreOptions(null);

      setIsNextLayout(false);
      setIsLayoutColumn(true);
      setIsSetting(false);
      setIsContactLayoutModal(false);
      setIsAccountLayoutModal(false);
      // setIsSettingPrivate(true);
      // setIsSettingPublic(false);
      // sendListLayoutData()
      sendLayoutSaveData();
      // setIsLayoutMenuMoreOptionsEdit(false);

      const listLayoutDataLength = listLayoutData.length;
      const lastListLayoutItem = listLayoutData[listLayoutDataLength - 1];
      console.log("lastListLayoutItem", typeof lastListLayoutItem["layoutId"]);
      sendChangeSelectedLayout(lastListLayoutItem["layoutId"] + 1);
    }
  };

  // const [isSettingPrivate, setIsSettingPrivate] = useState(true);
  // const [isSettingPublic, setIsSettingPublic] = useState(false);

  // const onClickSettingPrivate = () => {
  //   // if (isLayoutMenuMoreOptionsEdit) {
  //   //   setUpdateLayoutVisibilityPrivate(true)
  //   //   setUpdateLayoutVisibilityPublic(false)
  //   // } else {
  //   //   setIsSettingPrivate(true);
  //   //   setIsSettingPublic(false);
  //   // }

  //   setIsSettingPrivate(true);
  //   setIsSettingPublic(false);
  // };

  // const onClickSettingPublic = () => {
  //   // if (isLayoutMenuMoreOptionsEdit) {
  //   //   setUpdateLayoutVisibilityPrivate(false)
  //   //   setUpdateLayoutVisibilityPublic(true)
  //   // } else {
  //   // setIsSettingPrivate(false);
  //   // setIsSettingPublic(true);
  //   // }
  //   setIsSettingPrivate(false);
  //   setIsSettingPublic(true);
  // };

  const [isContactLayoutModal, setIsContactLayoutModal] = useState(false);

  const onClickContactLayoutModal = () => {
    setIsContactLayoutModal(!isContactLayoutModal);
  };

  const [isAccountLayoutModal, setIsAccountLayoutModal] = useState(false);

  const onClickAccountLayoutModal = () => {
    setIsAccountLayoutModal(!isAccountLayoutModal);
  };

  // const [isTableLayoutNameValue, setIsTableLayoutNameValue] = useState("");

  // const handleTableLayoutNameValue = (e: any) => {
  //   setIsTableLayoutNameValue(e.target.value);
  // };

  const navigate = useNavigate();
  const [checkanchorEl, setcheckAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [sequenceanchorEl, setSequenceAnchorEl] =
    useState<null | HTMLElement>(null);
  const [listanchorEl, setListAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [editanchorEl, setEditAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [pushanchorEl, setPushAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [dotanchorEl, setDotAnchorEl] = useState<null | HTMLElement>(
    null
  );

  const [seqanchorEl, setseqAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [lisanchorEl, setlisAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [edianchorEl, setediAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [pusanchorEl, setspusAnchorEl] = useState<null | HTMLElement>(
    null
  );
  // const [moranchorEl, setmoreAnchorEl] = useState<null | HTMLElement>(null);
  const [relevanceanchorEl, setRelevanceAnchorEl] =
    useState<null | HTMLElement>(null);

  const [pagination, setPagination] = useState<null | HTMLElement>(null);

  // const [tablemore, setTableMore] = useState<null | HTMLElement>(null);

  const [selectAll, setSelectAll] = useState(false);
  const [selectAllClicked, setSelectAllClicked] = useState(false);
  // let selectAllClicked = false;

  const [page, setPage] = useState(0);
  const rowsPerPage = 25;

  // const [sort, setSort] = useState("Ascending");
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalSavedRecords, setTotalSavedRecords] = useState(0);

  const [ismodalChecked1, setIsModalChecked1] = useState(false);
  const [ismodalChecked2, setIsModalChecked2] = useState(false);
  const [ismodalChecked3, setIsModalChecked3] = useState(false);
  const [displayText, setDisplayText] = useState("");
  // const [displayData, setDisplayData] = useState<any[] | never[]>([]);

  const [localData, setLocalData] = useState<any[] | never[]>([]);
  const [talentWithCommunityData, setTalentWithCommunityData] = useState<
    any[] | never[]
  >([]);

  const [openmail1, setOpenmail1] = useState(false);
  const [openmail2, setOpenmail2] = useState(false);

  const [openexport1, setOpenExport1] = useState(false);
  // const [openexport2, setOpenExport2] = useState(false);

  const [loading, setLoading] = useState(false);
  const [isRecordSavedAccuick, setIsRecordSavedAccuick] = useState(false);
  const [checkboxModalTitle, setCheckboxModalTitle] = useState<any>("")
  // const [isRecordNotSavedAccuick, setIsRecordNotSavedAccuick] = useState(false);
  // const [multipleRequest, setMultipleRequest] = useState(false);

  const [
    searchData,
    setSearchData,
    isFilterApplied,
    setFilterApply,
    isCompanySelected,
    // setIsCompanySelected,
  ] = useContext(Store);
  // const [isFilterApplied, setFilterApply] = useContext(Store);
  const [listLayoutLoading, setListLayoutLoading] = useState(false);

  // const [searchData, setSearchData] = useContext(Store);
  const [mynumber, setMynumber] = useState<any[] | never[]>([]);

  const [fieldanchorEl, setFieldAnchorEl] = useState<null | HTMLElement>(
    null
  );

  const [sortanchorEl, setSortAnchorEl] = useState<null | HTMLElement>(
    null
  );

  // const [loaderCls, setLoaderCls] = useState(false);

  const [openTableEdit, setTableEditOpen] = useState(false);
  const [currentPageNumber, setCurrentPageNumber] = useState(-1);

  const recrIds = userLocalData.getvalue("invitedAndReferredRecrIds");
  const isChromeExtEnable = userLocalData.isChromeExtensionEnabled();
  const recrData = JSON.parse(localStorage.getItem('demoUserInfo') || '{}')
  // console.log(recrData, 'recrData')

  const filterCheck =
    ((searchData.industries &&
      searchData.industries.length &&
      searchData.industries &&
      searchData.industries.length) ||
      (searchData.company_names && searchData.company_names.length) ||
      (searchData.company_not_in_names &&
        searchData.company_not_in_names.length) ||
      (searchData.company_past_names && searchData.company_past_names.length) ||
      (searchData.exclude_company_names &&
        searchData.exclude_company_names.length) ||
      (searchData.no_of_employees && searchData.no_of_employees.length) ||
      (searchData.person_titles && searchData.person_titles.length) ||
      (searchData.person_not_titles && searchData.person_not_titles.length) ||
      (searchData.person_past_titles && searchData.person_past_titles.length) ||
      (searchData.title_management_level &&
        searchData.title_management_level.length) ||
      (searchData.title_department && searchData.title_department.length) ||
      (searchData.title_department_sub_role &&
        searchData.title_department_sub_role.length) ||
      (searchData.locations && searchData.locations.length) ||
      (searchData.locations_not_in && searchData.locations_not_in.length) ||
      (searchData.hq_locations && searchData.hq_locations.length) ||
      (searchData.hq_locations_not_in &&
        searchData.hq_locations_not_in.length) ||
      (searchData.personaIds && searchData.personaIds.length) ||
      (searchData.skillsIn && searchData.skillsIn.length) ||
      (searchData.languagesIn && searchData.languagesIn.length) ||
      (searchData.certificationsIn && searchData.certificationsIn.length) ||
      (searchData.education.degreeIn && searchData.education.degreeIn.length) ||
      (searchData.education.schoolIn && searchData.education.schoolIn.length) ||
      (searchData.education.majorIn && searchData.education.majorIn.length) ||
      searchData.education.educationStartYear !== "" ||
      searchData.education.educationEndYear !== "" ||
      searchData.booleanSearch !== "" ||
      searchData.full_name !== "" ||
      searchData.min !== "" ||
      searchData.max !== "" ||
      searchData.title_is_boolean !== "" ||
      searchData.minYear !== "" ||
      searchData.maxYear !== "" ||
      searchData.exist_fields.length ||
      searchData.not_exist_fields.length ||
      searchData.industries_not_in.length ||
      searchData.industry_company_not_in_names.length ||
      searchData.industry_company_names.length ||
      searchData.industry_all_company_names.length ||
      searchData.zipcode !== "" ||
      searchData.hqzipcode !== "") &&
    !searchData.isMinYearValidation &&
    !searchData.isMaxYearValidation &&
    !searchData.isFromYearValidation &&
    !searchData.isToYearValidation &&
    !searchData.isMinValidation &&
    !searchData.isMaxValidation;

  // const handleTableEditOpen = () => {
  //   setTableEditOpen(true);
  //   handleClose();
  // };
  const handleTableEditClose = (): void => {
    setTableEditOpen(false);
  };
  const handleOpenmail1 = () => {
    if (checkedCount > 0) {
      setOpenmail1(true);
    }
    setOpenmail2(false);
  };

  // const [parentCheckedRowIds, setParentCheckedRowIds] = useState<any>([]);

  // const submitToAccuick = () => {
  //   // setApiLoading(true);
  //   // newChecked.map()
  //   const newChecked = [...checked];
  //   const filteredData1 = searchData.displayData.filter(
  //     (item: any, index: any) => newChecked[index]
  //   );
  //   const filteredData2 = filteredData1.map((item: any, index: any) => item.id);
  //   // const filteredData = displayData.map((item, index) => {
  //   //   if (newChecked[index]) {
  //   //     return item.id;
  //   //   }
  //   //   // return false
  //   // });
  //   // displayData
  //   if (!filteredData2.length) {
  //     // setApiLoading(false);
  //     return;
  //   }
  //   let dataToPass: any = {
  //     recrId: parseInt(searchData.userId),
  //     companyId: searchData.companyId,
  //     personIds: filteredData2,
  //   };

  //   dataToPass.recrIds = recrIds;


  //   console.log(dataToPass);
  //   apiService.saveToAccuick(dataToPass).then((response: any) => {
  //     // setApiLoading(false);
  //     // const isSuccess = response.data.Success;
  //     // const isError = response.data.Error;
  //     setIsRecordSavedAccuick(response.data.Success);
  //     showToaster("Record Not Saved", 'error');
  //     setRecordsSavedData([...recordsSavedData, response.data.userId]);
  //     // setParentCheckedRowIds([...data, response.data.userId]);
  //   });

  //   setParentCheckedRowIds(checkedRowIds);
  // };

  const [saveType, setSaveType] = useState<any>("")

  const handleBulkSave = (type: string) => {
    setSaveType(type)
    if (parseInt(recrData.paymentType) > 2 && (smsCredits > 0 && smsCredits !== consumedSmsCredits)) {
      if (isContact() && type == "jobDiva") {
        setAddCompanyToModal(true)

      }
      else {
        setCheckboxModalTitle("")
        setOpenCheckboxModal(true)
      }

    }
    else {


      let dataObj: any = fetchCheckedUserIds(checked, searchData.displayData);

      console.log(dataObj, 'dataObj')

      if (!isContact()) {
        let dataToPass: any = {
          recrId: parseInt(searchData.userId),
          companyId: searchData.companyId,
          personIds: dataObj.personIds,
          userIds: dataObj.userIdsData,
          isSaveWithEmail: true,
          isSaveWithPhoneNumber: false
        }

        if (type && type === "jobDiva") {
          dataToPass.ats = ID_ATS_JOBDIVA
        }




        // setApiLoading(true);
        apiService.saveToAccuick(dataToPass).then((response: any) => {
          // setApiLoading(false);
          if (response.data.Success) {
            channelToBroadcast.postMessage({
              checkCreditScore: true
            });

            setIsRecordSavedAccuick(response.data.Success);
            if (response.data.Success) {
              showToaster("Record stored successfully", 'success');
            }

            if (response.data.Error) {
              showToaster("Record Not Saved", 'error');
            }
            let creditsData = localStorage.getItem(`credits_${userLocalData.getvalue('recrId')}`)
            if (creditsData) {
              let parsedCreditsData = JSON.parse(creditsData)
              console.log(parsedCreditsData)
              setProfileCredits(parsedCreditsData?.totalProfileCredits)
              setConsumedCredits(parsedCreditsData?.consumedProfileCredits)
              if (userLocalData.getvalue(
                "paymentType"
              ) !== 1 || userLocalData.getvalue(
                "paymentType"
              ) !== 2) {
                setSmsCredits(parsedCreditsData?.totalSmsCredits)
                setConsumedSmsCredits(parsedCreditsData?.consumedSmsCredits)
              }

            }

            const updatedChecked = checked.map(() => false);
            setChecked(updatedChecked);
            setSelectAll(false);
            setSelectAllClicked(false);
            setCheckBoxChecked([]);
            setCheckedRowIds([]);

            getTableData("")
          }
          else showToaster(response.data.Message ? response.data.Message : "An error occured while saving.", "error");
          // setParentCheckedRowIds([...data, response.data.userId]);
        });
      }

      else {
        let dataToPass: any = {
          clientId: recrData.clientId,
          recrId: recrData.recrId,
          "personIds": dataObj.personIds,
          contIds: dataObj.userIdsData,
          "isSaveWithEmail": true,
          "isSaveWithPhoneNumber": false
        }
        if (type && type === "jobDiva") {
          dataToPass.ats = ID_ATS_JOBDIVA
          setAddCompanyToModal(true)
          return
        }
        // setApiLoading(true);
        apiService.saveContactData(dataToPass).then((response: any) => {
          // setApiLoading(false);
          if (response.data.Success) {
            channelToBroadcast.postMessage({
              checkCreditScore: true
            });

            setIsRecordSavedAccuick(response.data.Success);
            if (response.data.Success) {
              showToaster("Record stored successfully", 'success');
            }

            if (response.data.Error) {
              showToaster("Record Not Saved", 'error');
            }
            let creditsData = localStorage.getItem(`credits_${userLocalData.getvalue('recrId')}`)
            if (creditsData) {
              let parsedCreditsData = JSON.parse(creditsData)
              console.log(parsedCreditsData)
              setProfileCredits(parsedCreditsData?.totalProfileCredits)
              setConsumedCredits(parsedCreditsData?.consumedProfileCredits)
              if (userLocalData.getvalue(
                "paymentType"
              ) !== 1 || userLocalData.getvalue(
                "paymentType"
              ) !== 2) {
                setSmsCredits(parsedCreditsData?.totalSmsCredits)
                setConsumedSmsCredits(parsedCreditsData?.consumedSmsCredits)
              }

            }

            const updatedChecked = checked.map(() => false);
            setChecked(updatedChecked);
            setSelectAll(false);
            setSelectAllClicked(false);
            setCheckBoxChecked([]);
            setCheckedRowIds([]);
            setIsTotal(true);
            getTableData("")
          }
          else showToaster(response.data.Message ? response.data.Message : "An error occured while saving.", "error");
          // setParentCheckedRowIds([...data, response.data.userId]);
        });
      }
    }

  }

  const saveJobDiva = (company: any, isMobileChecked: any) => {
    let dataObj: any = fetchCheckedUserIds(checked, searchData.displayData);
    let dataToPass: any = {
      clientId: recrData.clientId,
      recrId: recrData.recrId,
      "personIds": dataObj.personIds,
      "contIds": dataObj.userIdsData,
      "isSaveWithEmail": true,
      "isSaveWithPhoneNumber": isMobileChecked,
      companyName: company ? company : ""
    }

    dataToPass.ats = ID_ATS_JOBDIVA
    // setApiLoading(true);
    showToaster("Candidates are being saved in the queue", 'warning');
    apiService.saveContactData(dataToPass).then((response: any) => {
      // setApiLoading(false);
      if (response.data.Success) {
        channelToBroadcast.postMessage({
          checkCreditScore: true
        });

        setIsRecordSavedAccuick(response.data.Success);
        if (response.data.Success) {
          showToaster("Record stored successfully", 'success');
        }

        if (response.data.Error) {
          showToaster("Record Not Saved", 'error');
        }
        let creditsData = localStorage.getItem(`credits_${userLocalData.getvalue('recrId')}`)
        if (creditsData) {
          let parsedCreditsData = JSON.parse(creditsData)
          console.log(parsedCreditsData)
          setProfileCredits(parsedCreditsData?.totalProfileCredits)
          setConsumedCredits(parsedCreditsData?.consumedProfileCredits)
          if (userLocalData.getvalue(
            "paymentType"
          ) !== 1 || userLocalData.getvalue(
            "paymentType"
          ) !== 2) {
            setSmsCredits(parsedCreditsData?.totalSmsCredits)
            setConsumedSmsCredits(parsedCreditsData?.consumedSmsCredits)
          }

        }

        const updatedChecked = checked.map(() => false);
        setChecked(updatedChecked);
        setSelectAll(false);
        setSelectAllClicked(false);
        setCheckBoxChecked([]);
        setCheckedRowIds([]);
        setIsTotal(true);
        getTableData("")
      }
      else showToaster(response.data.Message ? response.data.Message : "An error occured while saving.", "error");
      // setParentCheckedRowIds([...data, response.data.userId]);
    });

  }

  // const handleOpenmail2 = () => {
  //   if (checkedCount > 0) {
  //     setOpenmail2(true);
  //   }
  //   setOpenmail1(false);
  // };

  const handleClosemail = () => {
    setOpenmail1(false);
    setOpenmail2(false);
  };

  const handleOpenExport1 = () => {
    if (checkedCount > 0) {
      setOpenExport1(true);
    }
    // setOpenExport2(false);
  };

  // const handleOpenExport2 = () => {
  //   if (checkedCount > 0) {
  //     setOpenExport2(true);
  //   }
  //   setOpenExport1(false);
  // };

  const handleCloseExport = () => {
    setOpenExport1(false);
    // setOpenExport2(false);
  };

  const [valueexport, setValueExport] = useState("Export All Emails");

  const handleChangeExport = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueExport((event.target as HTMLInputElement).value);
  };

  const handleModalCheck1 = (event: any) => {
    setIsModalChecked1(event.target.checked);
  };
  const handleModalCheck2 = (event: any) => {
    setIsModalChecked2(event.target.checked);
  };
  const handleModalCheck3 = (event: any) => {
    setIsModalChecked3(event.target.checked);
  };

  const isAnyCheckboxCheckedModal =
    ismodalChecked1 || ismodalChecked2 || ismodalChecked3;

  // const totalPages = Math.ceil(data.length / rowsPerPage);
  // let totalPageForTable = 0;
  // let data: any[] = [];
  let currentPageNum = 0;

  const maxSelectedRecords = 10000;

  const UniqueIds: { [key: string]: boolean } = {};

  const filterLocalData = localData.filter((item: any) => {
    if (!UniqueIds[item.id]) {
      UniqueIds[item.id] = true;
      return true;
    }
    return false;
  });
  //  console.log(filterLocalData, "filterLocalData");

  // const checkPersonIdExist = (pid: any) => {
  //   let isexist = false;

  //   filterLocalData.filter((item: any) => {
  //     if (item.id === pid) {
  //       isexist = true;
  //     }
  //   });
  //   return isexist;
  // };

  // const checkUserIdExist = (pid: any) => {
  //   let isUserIdExist = false;

  //   filterLocalData.forEach((item: any) => {
  //     if (item.id === pid) {
  //       isUserIdExist = item.userId !== null;
  //     }
  //   });

  //   return isUserIdExist;
  // };

  // console.log('filterLocalData', filterLocalData)

  // console.log('local', localData)

  const handlePageChange = (newPage: any) => {
    if (newPage >= 0 && newPage < totalPages) {
      console.log(newPage);

      // setCurrentPageNumber(page);
      currentPageNum = newPage;
      localStorage.setItem("pdlPageNo", JSON.stringify(newPage));
      getTableData("isFromPageChange");
      setPage(newPage);
    }
    handleClose();
  };

  const [checkedRowIds, setCheckedRowIds] = useState<string[]>([]);
  useEffect(() => {
    // console.log(checkBoxChecked, "checkBoxChecked", checkedRowIds);
    // console.log("searchData..", searchData.displayData);

    const selectedCheckboxes = searchData.displayData.filter((item: any) =>
      checkedRowIds.includes(item.id)
    );

    // console.log("selectedCheckboxes", selectedCheckboxes)

    if (checkedRowIds.length && !selectAllClicked) {
      const resultantValue = selectedCheckboxes.some(
        (item: any) => !!item.recommended_personal_email
      );

      const allHaveProperty = selectedCheckboxes.some((item: any) =>
        item.hasOwnProperty("recommended_personal_email")
      );

      console.log("allHaveProperty 1", allHaveProperty);

      console.log("resultantValue 1", resultantValue);

      if (!resultantValue) {
        setIsValidEmail(false);
      } else {
        console.log("work-1");
        setIsValidEmail(true);
      }

      if (!allHaveProperty) {
        setIsValidSeqPool(false);
      } else {
        setIsValidSeqPool(true);
      }
    }
  }, [checkBoxChecked, checkedRowIds]);

  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidSeqPool, setIsValidSeqPool] = useState(false);

  const handleCheckboxClick = (index: number, rowId: string, _item: any) => {
    // console.log(item.recommended_personal_email, "itemmm");

    const newChecked = [...checked];
    newChecked[index] = !newChecked[index];
    setChecked(newChecked);

    setCheckedRowIds((prevCheckedRowIds) => {
      if (prevCheckedRowIds.includes(rowId)) {
        return prevCheckedRowIds.filter((id) => id !== rowId);
      } else {
        return [...prevCheckedRowIds, rowId];
      }
    });

    // console.log("clicked checkbox index", rowId)

    if (selectAllClicked) {
      // checkBoxChecked

      setCheckBoxChecked((prevSearchData: any) => {
        const checkBoxData = [...prevSearchData];
        const index = checkBoxData.indexOf(rowId);
        if (index !== -1) {
          checkBoxData.splice(index, 1);
        } else {
          checkBoxData.push(rowId);
        }

        return checkBoxData;
      });

      // if (checkBoxChecked.includes(rowId)) {
      //   setCheckBoxChecked(checkBoxChecked.filter((id: any) => id !== rowId));
      // } else {
      //   setCheckBoxChecked([...checkBoxChecked, `${rowId}`])
      // }
    }

    const allChecked = newChecked.every((checkbox) => checkbox);
    const someChecked = newChecked.some((checkbox) => checkbox);
    console.log(allChecked);

    if (allChecked) {
      setSelectAll(true);
    } else if (someChecked) {
      setSelectAll(false);
    } else {
      setSelectAll(false);
    }
  };

  const handleMenuItemClick = (menuType: any) => {
    if (menuType === "page") {
      const currentPage = page;
      setCurrentPageNumber(page);
      const pageSize = rowsPerPage;

      const startIndex = currentPage * pageSize;
      const endIndex = Math.min((currentPage + 1) * pageSize, checked.length);
      console.log(startIndex);
      console.log(endIndex);

      // if (selectAll) {
      //   const updatedChecked = data.map((item: any, index: any) => {
      //     return ((currentPageNum) * (rowsPerPage)) + index < maxSelectedRecords ? true : false
      //   })
      //   setChecked(updatedChecked);
      // } else {
      // let updatedChecked = searchData.displayData.map(() => false);
      // setChecked(updatedChecked);
      // }

      const updatedChecked = searchData.displayData.map(
        (item: any, index: any) => {
          if (index >= startIndex || index < endIndex) {
            return true;
          }
          return item;
        }
      );

      let currCheckedRowIds = searchData.displayData.map(
        (item: any) => item.id
      );
      setCheckedRowIds(currCheckedRowIds);

      setSelectAll(false);
      setSelectAllClicked(false);
      setChecked(updatedChecked);



      const resultantValue = searchData.displayData.some(
        (item: any) => !!item.recommended_personal_email
      );

      const allHaveProperty = searchData.displayData.some((item: any) =>
        item.hasOwnProperty("recommended_personal_email")
      );

      console.log("allHaveProperty 2", allHaveProperty);

      console.log("resultantValue 2", resultantValue);

      if (!resultantValue) {
        setIsValidEmail(false);
      } else {
        setIsValidEmail(true);
      }

      if (!allHaveProperty) {
        setIsValidSeqPool(false);
      } else {
        setIsValidSeqPool(true);
      }

      // const checkIds = searchData.displayData.map((item: any) => item.id)

      // setCheckBoxChecked((prevCheckedIds: any) => {
      //   const prevIdsArray = Array.from(prevCheckedIds);
      //   checkIds.forEach((id: any) => {
      //     if (!prevIdsArray.includes(id)) {
      //       prevIdsArray.push(id);
      //     }
      //   });
      //   return prevIdsArray;
      // });
    } else if (menuType === "advance") {
    } else if (menuType === "all") {
      setCheckBoxChecked([]);
      const updatedChecked = searchData.displayData.map(
        (_item: any, index: any) => {
          // debugger
          return (currentPageNum - 1) * rowsPerPage + index < maxSelectedRecords
            ? true
            : false;
        }
      );

      let currCheckedRowIds = searchData.displayData.map(
        (item: any) => item.id
      );
      setCheckedRowIds(currCheckedRowIds);
      console.log("currCheckedRowIds", currCheckedRowIds);

      console.log("updatedChecked", updatedChecked);
      setChecked(updatedChecked);
      setSelectAll(true);
      setSelectAllClicked(true);

      const resultantValue = searchData.displayData.some(
        (item: any) => !!item.recommended_personal_email
      );

      const allHaveProperty = searchData.displayData.some((item: any) =>
        item.hasOwnProperty("recommended_personal_email")
      );

      console.log("allHaveProperty 3", allHaveProperty);

      console.log("resultantValue 3", resultantValue);

      if (!resultantValue) {
        setIsValidEmail(false);
      } else {
        setIsValidEmail(true);
      }

      if (!allHaveProperty) {
        setIsValidSeqPool(false);
      } else {
        setIsValidSeqPool(true);
      }
    } else if (menuType === "clear") {
      const updatedChecked = checked.map(() => false);
      setChecked(updatedChecked);
      setSelectAll(false);
      setSelectAllClicked(false);
      setCheckBoxChecked([]);
      setIsValidEmail(false);
      setIsValidSeqPool(false);
      setCheckedRowIds([]);
    }
    handleClose();
  };

  const indeterminate = !selectAll && checked.some((checkbox) => checkbox);

  const checkedCount = checked.filter((checkbox) => checkbox).length;

  // const indeterminate = checkBoxChecked.length ? true : false;

  // const checkedCount = checkBoxChecked.length;

  // const handleSelectAllClick = () => {

  //   if (checkedCount > 0) {
  //     const newSelectAll = !selectAll;
  //     setSelectAll(false);

  //     const updatedChecked = checked.map(() => newSelectAll);
  //     setChecked(updatedChecked);
  //   } else {
  //     setSelectAll(false);
  //     // setChecked(false);
  //   }
  // }

  // const handlePageChange = (newPage: any) => {
  //   const totalPages = Math.ceil(data.length / rowsPerPage);
  //   if (newPage >= 0 && newPage < totalPages) {
  //     setPage(newPage);
  //   }
  // };

  // const handleRowsPerPageChange = (rowsPerPage: any) => {
  //   setRowsPerPage(rowsPerPage);
  //   setPage(rowsPerPage);
  //   handleClose()
  // };

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  const numberDisplay = (n: any, _d: any) => {
    if (n >= 1000000) {
      return `${(n / 1000000).toFixed(1)}M`;
    } else if (n >= 1000) {
      return `${(n / 1000).toFixed(1)}K`;
    } else {
      return n.toString();
    }

    // let x = ("" + n).length,
    //   p = Math.pow;
    // d = p(10, d);
    // x -= x % 3;

    // // return Math.round((n * d) / p(10, x)) / d + "kMGTPE"[x / 3];

    // if (x >= 6) {
    //   return Math.round((n * d) / p(10, 6)) / d + "M";
    // } else if (x >= 3) {
    //   return Math.round((n * d) / p(10, 3)) / d + "K";
    // } else {
    //   return n;
    // }
  };

  // const [errorMessage, setErrorMessage] = useState("");

  const [lastPageNumber, setLastPageNumber] = useState<number>(0)

  const getTableData = (isFrom: any) => {
    // let dataToPass = {
    //     "person_titles":["sales","sales manager"],
    //     "person_not_titles":["student"],
    //     "person_past_titles":["manager"]
    //   };
    // console.log(currentPageNum);
    if (isFrom != "isFromAutosave" || isFrom != "bulkListSave") {
      setLoading(true);
    }

    let dataObj = Object.keys(searchData);
    let sendData: any = {};
    // debugger;
    console.log(searchData, "searchDataaaaaaaaaa");
    for (var i = 0; i < dataObj.length; i++) {
      if (
        dataObj[i] !== "displayData" &&
        dataObj[i] !== "industry_adv_settings" &&
        dataObj[i] !== "eduDegreeList" &&
        dataObj[i] !== "eduSchoolList" &&
        dataObj[i] !== "eduMajorList" &&
        dataObj[i] !== "autoSkillsList" &&
        dataObj[i] !== "autoLanguagesList" &&
        dataObj[i] !== "autoCertificationsList" &&
        dataObj[i] !== "userId" &&
        dataObj[i] !== "checkedPersonas" &&
        dataObj[i] !== "isMinValidation" &&
        dataObj[i] !== "isMaxValidation" &&
        dataObj[i] !== "isFromYearValidation" &&
        dataObj[i] !== "isToYearValidation" &&
        searchData[dataObj[i]]
      ) {
        let obj = searchData[dataObj[i]];
        if (obj && obj.length) {
          sendData[dataObj[i]] = obj;
        }
        // console.log(obj);
      }

      if (dataObj[i] === "education") {
        let objdegreein = searchData[dataObj[i]].degreeIn;
        let objschoolIn = searchData[dataObj[i]].schoolIn;
        let objmajorIn = searchData[dataObj[i]].majorIn;
        let objeducationStartYear = searchData[dataObj[i]].educationStartYear;
        let objeducationEndYear = searchData[dataObj[i]].educationEndYear;

        if (
          (objdegreein && objdegreein.length) ||
          (objschoolIn && objschoolIn.length) ||
          (objmajorIn && objmajorIn.length) ||
          objeducationStartYear !== "" ||
          objeducationEndYear !== ""
        ) {
          sendData[dataObj[i]] = searchData[dataObj[i]];
        }

        // console.log(obj);
      }
    }

    if (searchData.userId !== "") {
      sendData.recrId = parseInt(searchData.userId);
    }


    sendData.recrIds = recrIds;


    if (searchData.zipcode !== "") {
      sendData.distance = searchData.distance;
    }

    if (searchData.hqzipcode !== "") {
      sendData.hq_distance = searchData.hqdistance;
      sendData.zipcode = searchData.hqzipcode;
      delete sendData.hqzipcode;
    }

    sendData.sort_by = parametersList[sendData.sort_by];
    if (localStorage.getItem("pdlPageNo")) {
      currentPageNum = JSON.parse(localStorage.getItem("pdlPageNo")!)
      setPage(Number(currentPageNum))
      // localStorage.removeItem("pdlPageNo")
    }
    sendData.page_num = currentPageNum;
    // console.log(currentPageNum, "currentPageNum");
    sendData.page_size = rowsPerPage;
    sendData.is_search_saved = isSavedEnable ? true : false;
    // console.log(isSavedEnable);
    console.log(sendData);

    apiService.getTableData(sendData).then((response: any) => {
      // setTeamLeads(response.data);

      if (response.status === 200) {
        // const top100Films = response.data.data;

        if (isContact() && response.data.talentWithCommunityContact?.length) {
          for (let tcc = 0; tcc < response.data.talentWithCommunityContact.length; tcc++) {
            response.data.talentWithCommunityContact[tcc].userId = response.data.talentWithCommunityContact[tcc].contId;
          }
        }


        let talentWithCommunity: any =
          isContact() ?
            response.data.talentWithCommunityContact?.length ? response.data.talentWithCommunityContact : []
            :
            response.data.talentWithCommunity && response.data.talentWithCommunity.length
              ? response.data.talentWithCommunity
              : [];

        let newData = response.data.data;
        let data = newData;
        let local = response.data.local_saved_records;

        if (local?.length && isContact()) {
          for (let lc = 0; lc < local.length; lc++) {
            local[lc].userId = local[lc].contId;
          }
          local.forEach((eachRecord: any) => {
            data.forEach((data_record: any) => {
              if (eachRecord.id === data_record.id) {
                data_record.userId = eachRecord.contId;
                eachRecord.userId = eachRecord.contId;
                data_record.contId = eachRecord.contId;
                // data_record.sequenceId = eachRecord.sequenceId;
                // data_record.sequenceCount = eachRecord.sequenceCount;
                // data_record.poolId = eachRecord.poolId;
                // data_record.poolCount = eachRecord.poolCount;
                // data_record.sequenceName = eachRecord.sequenceName;
                // data_record.poolName = eachRecord.poolName;
                data_record.recommended_personal_email = eachRecord.work_email
                  ? eachRecord.work_email
                  : false;
                eachRecord.recommended_personal_email = eachRecord.work_email
                  ? eachRecord.work_email
                  : false;
                data_record.mobile_phone = eachRecord.mobile_phone ?
                  eachRecord.mobile_phone :
                  (eachRecord.phone_numbers?.length && eachRecord.phone_numbers[0])
                    ? eachRecord.phone_numbers[0]
                    : data_record.mobile_phone
                      ? data_record.mobile_phone
                      : false;
                eachRecord.mobile_phone = eachRecord.mobile_phone
                data_record.isPackageEmailValidity = eachRecord.isPackageEmailValidity
                data_record.isPackagePhoneValidity = eachRecord.isPackagePhoneValidity
                data_record.isShowEmail = eachRecord.isShowEmail
                data_record.isShowPhone = eachRecord.isShowPhone
              }
            });
          });
        }

        setLocalData(local);

        if (talentWithCommunity.length > 0) {
          if (isContact()) {
            talentWithCommunity.forEach((talent: any) => {
              local.forEach((local_record: any) => {
                if (talent.contId === local_record.contId) {
                  talent.person_id = local_record.id;
                }
              });
            });
          }
          talentWithCommunity.forEach((talent: any) => {
            data.forEach((data_record: any) => {
              if (talent.person_id === data_record.id) {
                data_record.userId = talent.userId;
                data_record.sequenceId = talent.sequenceId;
                data_record.sequenceCount = talent.sequenceCount;
                data_record.poolId = talent.poolId;
                data_record.poolCount = talent.poolCount;
                data_record.listCount = talent.listCount;
                data_record.listId = talent.listId;
                data_record.listName = talent.listName;
                data_record.sequenceName = talent.sequenceName;
                data_record.poolName = talent.poolName;
                data_record.recommended_personal_email = talent.email
                  ? talent.email
                  : false;
                data_record.mobile_phone = talent.phoneNo
                  ? talent.phoneNo
                  : data_record.mobile_phone
                    ? data_record.mobile_phone
                    : false;
                data_record.isPackageEmailValidity = talent.isPackageEmailValidity
                data_record.isPackagePhoneValidity = talent.isPackagePhoneValidity
                data_record.isShowEmail = talent.isShowEmail
                data_record.isShowPhone = talent.isShowPhone
              }
            });
            local.forEach((local_record: any) => {
              if (talent.person_id === local_record.id) {
                local_record.userId = talent.userId;
                local_record.sequenceId = talent.sequenceId;
                local_record.sequenceCount = talent.sequenceCount;
                local_record.poolId = talent.poolId;
                local_record.poolCount = talent.poolCount;
                local_record.sequenceName = talent.sequenceName;
                local_record.poolName = talent.poolName;
                local_record.listCount = talent.listCount;
                local_record.listId = talent.listId;
                local_record.listName = talent.listName;
                local_record.mobile_phone = talent.phoneNo
                  ? talent.phoneNo
                  : local_record.phoneNo
                    ? local_record.phoneNo
                    : false;
                local_record.isPackageEmailValidity = talent.isPackageEmailValidity
                local_record.isPackagePhoneValidity = talent.isPackagePhoneValidity
                local_record.isShowEmail = talent.isShowEmail
                local_record.isShowPhone = talent.isShowPhone
                local_record.recommended_personal_email = talent.email
                  ? talent.email
                  : false;
              }
            });
          });
        }


        setTalentWithCommunityData(talentWithCommunity);

        // console.log(data);
        if (response.data.data && response.data.data.length) {
          // debugger
          // console.log(response);
          let totRecords;
          if (
            response.data["saved_records"] !== undefined &&
            response.data["saved_records"] !== null
          ) {
            setTotalSavedRecords(response.data["saved_records"]);
          }
          if (
            response.data["total records"] !== undefined &&
            response.data["total records"] !== null
          ) {
            setTotalRecords(response.data["total records"]);
            localStorage.setItem(
              "total-records-count",
              response.data["total records"].toString()
            );
          }
          if (isSavedEnable) {
            totRecords = response.data["saved_records"];
          } else {
            totRecords = localStorage.getItem("total-records-count")
              ? localStorage.getItem("total-records-count")
              : response.data["total records"];
          }
          let defaultTotalPages;

          if (currentPageNum === 0 || currentPageNum % 100 === 0) {
            // if (currentPageNum) {
            //   setMynumber(
            //     Array.from(
            //       { length: 100 },
            //       (_, index) => index  (currentPageNum  1)
            //     )
            //   );
            // // const numbers = Array.from({ length: currentPageNum+1 }, (_, index) => index + 100);
            // setTotalPages(currentPageNum ? currentPageNum + 100 : 100);
            // } else {
            //   setMynumber(
            //     Array.from(
            //       {
            //         length:
            //           parseInt(totRecords) > 100
            //             ? 100
            //             : Math.ceil(parseInt(totRecords) / rowsPerPage),
            //       },
            //       (_, index) => index  1
            //     )
            //   );
            // }

            const startPage = currentPageNum === 0 ? 1 : currentPageNum + 1;
            const endPage = Math.min(
              startPage + 99,
              Math.ceil(parseInt(totRecords) / rowsPerPage)
            );
            const pageNumbers = Array.from(
              { length: endPage - startPage + 1 },
              (_, index) => startPage + index
            );
            setMynumber(pageNumbers);
            console.log(pageNumbers, "pageNukk", pageNumbers.length - 1)
            if (pageNumbers.length > 0) {
              setLastPageNumber(pageNumbers.length - 1)
            }

            defaultTotalPages = endPage;
          } else {
            const totalPages = Math.ceil(parseInt(totRecords) / rowsPerPage);
            const startPage = Math.floor(currentPageNum / 100) * 100 + 1;
            const endPage = Math.min(startPage + 99, totalPages);
            const pageNumbers = Array.from(
              { length: endPage - startPage + 1 },
              (_, index) => startPage + index
            );
            setMynumber(pageNumbers);
            if (pageNumbers.length > 0) {
              setLastPageNumber(pageNumbers.length - 1)
            }
            defaultTotalPages = totalPages;
          }

          setTotalPages(defaultTotalPages);

          // totalPageForTable = Math.ceil(
          //   response.data.data.length / rowsPerPage
          // );
          // console.log(totalPageForTable)
          // setTotalPages(2);

          // let sortedData = data.sort((a: any, b: any) => {
          //   if (a.full_name > b.full_name) {
          //     return sort === "asc" ? -1 : 1;
          //   }
          //   if (a.full_name < b.full_name) {
          //     return sort === "asc" ? 1 : -1;
          //   }
          //   return 0;
          // });

          if (selectAll) {
            // const updatedChecked = data.map((item: any, index: any) => {
            //   return ((currentPageNum) * (rowsPerPage)) + index < maxSelectedRecords ? true : false
            // })
            // setChecked(updatedChecked);
          } else {
            if (currentPageNumber != currentPageNum) {
              const updatedChecked = data.map(() => false);
              setChecked(updatedChecked);
            } else {
              const updatedChecked = data.map(() => true);
              if (isFrom === "isFromPageChange") {
                setChecked(updatedChecked);
              }
            }
          }

          // setSelectAll(false);
          // debugger;
          // let displayDataFinal = data.slice(
          //   page * rowsPerPage,
          //   page * rowsPerPage + rowsPerPage
          // );
          // console.log(displayDataFinal);

          const startIndex = currentPageNum * rowsPerPage + 1;
          const endIndex =
            totRecords > startIndex + rowsPerPage - 1
              ? startIndex + rowsPerPage - 1
              : Math.min(startIndex + rowsPerPage - 1, totRecords);
          // : Math.min(startIndex + rowsPerPage - 1, data.length);
          //Math.min((startIndex + rowsPerPage - 1), data.length); //startIndex + rowsPerPage - 1;

          const displayTextData = `${startIndex} - ${endIndex} of ${totRecords}`;

          setDisplayText(displayTextData);

          // const updatedTotalData = data.map((item: any) => {
          //   let linkedInUrl = item.linkedin_url;
          //   local.forEach((ele: any) => {
          //     if (item.id === ele.id) {
          //       linkedInUrl = ele.linkedin_url;
          //     }
          //   });
          //   return { ...item, linkedin_url: linkedInUrl };
          // });

          // console.log(isSaved, 'isSaved', local, isTotal, data, searchData.displayData);
          if (isTotal) {
            // setDisplayData(data);
            setSearchData((prevSearchData: any) => ({
              ...prevSearchData,
              displayData: data,
            }));
          } else if (isSaved) {
            setSearchData((prevSearchData: any) => ({
              ...prevSearchData,
              displayData: local,
            }));
          }

          if (isFrom === "fromClickSave") {
            setSearchData((prevSearchData: any) => ({
              ...prevSearchData,
              displayData: local,
            }));
          }
          // console.log(displayText);

          // setRecordsData(response.data.data);
        } else {
          setTotalPages(0);
          setLocalData([]);
          setTalentWithCommunityData([]);
          setTotalRecords(0);
          setTotalSavedRecords(0);
          setSearchData((prevSearchData: any) => ({
            ...prevSearchData,
            displayData: [],
          }));
        }
        if (response.data.Status === 429) {
          showToaster(response?.data?.Message, "error");
          // setMultipleRequest(true);
          // setErrorMessage(response?.data?.Message);
        }
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    console.log(searchData.displayData, '')
  }, [JSON.stringify(searchData.displayData)]);
  const [pageLoadTime, setPageLodeTime] = useState(0);
  const [isTotal, setIsTotal] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!isSaved) {
      localStorage.setItem("isSavedEnable", "false");
    }

    window.addEventListener("resize", handleResize, false);
    setSelectValue(searchData.sort_by);
    setSelectSortValue(
      searchData.sort_type === "asc" ? "Ascending" : "Descending"
    );

    currentPageNum = 0;
    setPage(0);
    const updatedChecked = checked.map(() => false);
    setChecked(updatedChecked);
    setSelectAll(false);
    setSelectAllClicked(false);
    setCheckBoxChecked([]);
    setCheckedRowIds([]);
    if (searchData.companyId && filterCheck) {
      console.log("is ok");

      getTableData("useEffect");
    } else {
      setTotalPages(0);
      // setTotalRecords(0);
      // setTotalSavedRecords(0);
      // setDisplayData([]);
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        displayData: [],
      }));
      setLocalData([]);
      setTalentWithCommunityData([]);
      setRecordsSavedData([]);
      // setTotalRecords(0);
      // setTotalSavedRecords(0);
    }
    // setLoading(false);
    setPageLodeTime(pageLoadTime + 1);
    localStorage.removeItem("pdlPageNo")
    // sendListLayoutData()
  }, [isFilterApplied, isTotal, isSaved]);

  useEffect(() => { }, [totalSavedRecords]);

  useEffect(() => {
    if (!filterCheck) {
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        displayData: [],
      }));
    }
  }, [filterCheck]);

  useEffect(() => {
    if (!isCompanySelected) {
      setTotalPages(0);
      // setDisplayData([]);
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        displayData: [],
      }));
      setLocalData([]);
      setTalentWithCommunityData([]);
      setRecordsSavedData([]);
      // setTotalRecords(0);
      // setTotalSavedRecords(0);
    }
  }, [isCompanySelected]);

  const [searchParams, setSearchParams] = useSearchParams();


  useEffect(() => {
    sendGetLayoutDataInitial();
    sendListLayoutData();
    localStorage.removeItem("pdlcandName");
    localStorage.removeItem("isProfileAccessed");
    if (localStorage.getItem("pdlSearchData")) {
      if (searchParams.get("isPdlSearch")) {
        setSearchData(JSON.parse(localStorage.getItem("pdlSearchData")!));
        setFilterApply(true);
      } else {
        setSearchData((prevSearchData: any) => ({
          ...prevSearchData,
          searchBox: "",
          person_titles: [],
          person_not_titles: [],
          person_past_titles: [],
          title_management_level: [],
          title_department_sub_role: [],
          title_department: [],
          company_names: [],
          company_not_in_names: [],
          company_past_names: [],
          exclude_company_names: [],
          industries: [],
          industries_not_in: [],
          industry_company_not_in_names: [],
          industry_company_names: [],
          industry_all_company_names: [],
          industry_adv_settings: "",
          locations: [],
          locations_not_in: [],
          hq_locations: [],
          hq_locations_not_in: [],
          sort_type: "asc",
          sort_by: "Relevance",
          full_name: "",
          minYear: "",
          maxYear: "",
          no_of_employees: [],
          title_is_boolean: "",
          min: "",
          max: "",
          personaIds: [],
          checkedPersonas: [],
          companyId: "12938",
          // isClickclearfiltersEmpOpen: false,
          displayData: [],
          exist_fields: [],
          not_exist_fields: [],
          applyFilterToaster: false,
          zipcode: "",
          distance: null,
          hqzipcode: "",
          hqdistance: null,
          skillsValue: "",
          skillsIn: [],
          languagesIn: [],
          certificationsIn: [],
          booleanSearch: "",
          eduDegreeList: [],
          eduSchoolList: [],
          eduMajorList: [],
          autoSkillsList: [],
          autoLanguagesList: [],
          autoCertificationsList: [],
          education: {
            schoolIn: [],
            majorIn: [],
            degreeIn: [],
            educationStartYear: "",
            educationEndYear: "",
          },
          degree_titles: [],
          isMinYearValidation: false,
          isMaxYearValidation: false,
          isFromYearValidation: false,
          isToYearValidation: false,
          isMinValidation: false,
          isMaxValidation: false,
        }));
      }
      localStorage.removeItem("pdlSearchData");
    }
    if (searchParams.get("isPdlSearch")) {
      searchParams.delete("isPdlSearch");
      setSearchParams(searchParams);
    }
  }, []);

  useEffect(() => {
    apiService.getElasticRecordCount().then((response: any) => {
      console.log("elastic rec count", response);
      setTotalRecords(response.data.totalRecordsCount.toString());
      setTotalSavedRecords(response.data.savedRecordsCount.toString());
    });
  }, [filterCheck]);

  useEffect(() => {
    if (searchData.displayData.length === 0) {
      // console.log("working right")
      // setTotalRecords(0);
      // setTotalSavedRecords(0);
      // setCheckBoxChecked([])
      // setSelectAll(false)
      setChecked([]);
    }
    if (selectAll) {
      let currCheckedRowIds = searchData.displayData.map(
        (item: any) => item.id
      );
      setCheckedRowIds(currCheckedRowIds);
    }
  }, [searchData.displayData]);

  const [contactMenu, setContactMenu] = useState<any>(null)

  const openParentCheckbox = Boolean(checkanchorEl);
  const openSequenceIconBtn = Boolean(sequenceanchorEl);
  const openListIconBtn = Boolean(listanchorEl);
  const openEditIconBtn = Boolean(editanchorEl);
  const openPushIconBtn = Boolean(pushanchorEl);
  const openMoreIconBtn = Boolean(dotanchorEl);
  const openSequenceTextBtn = Boolean(seqanchorEl);
  const openListIconTextBtn = Boolean(lisanchorEl);
  const openEditTextBtn = Boolean(edianchorEl);
  const openPushTextBtn = Boolean(pusanchorEl);
  // const openMoreTextBtn = Boolean(moranchorEl);
  const openRelevanceBtn = Boolean(relevanceanchorEl);
  const openPaginationBtn = Boolean(pagination);
  const openFieldBtn = Boolean(fieldanchorEl);
  const openSortBtn = Boolean(sortanchorEl);

  // const openTableMore = Boolean(tablemore);

  // const [tableMailAddSequenceBtn, setTableMailAddSequenceBtn] = useState<null | HTMLElement>(null);

  const [TableMailOpen, setTableOpenMail] = useState<null | HTMLElement>(
    null
  );

  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [TableCallOpen, setTableOpenCall] = useState<null | HTMLElement>(
    null
  );

  // const [openSnack, setOpenSnack] = useState<{ [key: string]: boolean }>(
  //   {}
  // );
  // const [openCallSnack, setOpenCallSnack] = useState<{
  //   [key: string]: boolean;
  // }>({});

  // const [tableMenuSendMail, setTableMenuSendMail] = useState<{
  //   [key: string]: boolean;
  // }>({});

  const handleTableMenuSendMaiOpen = (candtId: any) => {
    // setTableMenuSendMail((prev: any) => ({
    //   ...prev,
    //   [candtId]: true,
    // }));
    setTableOpenMail(null);
    setMailBodyOpen(true);
    let selectedPersonTalentDataObj = talentWithCommunityData.find(
      (person) => person.person_id === candtId
    );
    let selectedPersonData = selectedPersonTalentDataObj?.person_id ?
      searchData.displayData.find(
        (person: any) => person.id === selectedPersonTalentDataObj.person_id
      )
      :
      searchData.displayData.find(
        (person: any) => person.id === candtId
      );


    setSelectPersonCandtId(selectedPersonTalentDataObj?.userId ? selectedPersonTalentDataObj?.userId : selectedPersonData.userId);
    setSelectPersonFullName(selectedPersonData.full_name);
    setSelectPersonMail(selectedPersonTalentDataObj?.email ? selectedPersonTalentDataObj?.email : selectedPersonData.email);
    setIsBulk(false);
    // console.log('aaaaaaaaaaaaaaaaaaaaazzz', selectedPersonData)
  };

  // const handleTableMenuSendMaiClose = (sendMailId: any): void => {
  //   setTableMenuSendMail((prev: any) => ({
  //     ...prev,
  //     [sendMailId]: false,
  //   }));
  //   setMailBodyOpen(false);
  // };
  const openTableMail = Boolean(TableMailOpen);

  // const openTableMailAddSeq = Boolean(tableMailAddSequenceBtn);

  const openTableCall = Boolean(TableCallOpen);

  // const handleShowCallSnack = (callId: any, phNum: any) => {
  //   navigator.clipboard
  //     .writeText(phNum)
  //     .then(() => {
  //       // Clipboard write was successful
  //       setOpenCallSnack((prev: any) => ({
  //         ...prev,
  //         [callId]: true,
  //       }));
  //     })
  //     .catch((error) => {
  //       // Handle any errors here, if necessary
  //       console.error("Failed to copy text: ", error);
  //     });
  //   setTableOpenCall(null);
  // };

  // const handleCallSnackClose = (callId: any) => {
  //   // if (reason === "clickaway") {
  //   //   return;
  //   // }
  //   setOpenCallSnack((prev: any) => ({
  //     ...prev,
  //     [callId]: false,
  //   }));
  // };

  // const handleShowSnack = (snackId: any, emailText: any) => {
  //   navigator.clipboard
  //     .writeText(emailText)
  //     .then(() => {
  //       // Clipboard write was successful
  //       setOpenSnack((prev: any) => ({
  //         ...prev,
  //         [snackId]: true,
  //       }));
  //     })
  //     .catch((error) => {
  //       // Handle any errors here, if necessary
  //       console.error("Failed to copy text: ", error);
  //     });
  //   setTableOpenMail(null);
  // };

  const handleTableClose = () => {
    setTableOpenMail(null);
    // setTableMailAddSequenceBtn(null);
    setTableOpenCall(null);
    // setTableMore(null);
  };

  const getPoolCount = (id: any) => {
    let rec: any = searchData.displayData.filter((item: any) => item.id === id);
    let poolCount = "";
    if (rec && rec.length) {
      poolCount = rec[0].poolCount ? rec[0].poolCount : "";
    }
    return poolCount;
  };

  const getListCount = (id: any) => {
    let rec: any = searchData.displayData.filter((item: any) => item.id === id);
    let poolCount = "";
    if (rec && rec.length) {
      poolCount = rec[0].listCount ? rec[0].listCount : "";
    }
    return poolCount;
  };

  const getPoolName = (id: any) => {
    let rec: any = searchData.displayData.filter((item: any) => item.id === id);
    let poolName: any = [];
    let poolIds: any = [];
    if (rec && rec.length) {
      poolIds = rec[0].poolId ? rec[0].poolId.split(",") : []
      poolName = rec[0].poolName ? rec[0].poolName.split(",") : [];
      // poolName = "demo,test".split(",")
    }
    return poolName.map((each: any, index: number) => ({
      name: each,
      id: poolIds[index]
    }));
  };

  const getListNames = (id: any) => {
    let rec: any = searchData.displayData.filter((item: any) => item.id === id);
    let list: any = [];
    let listIds: any[];
    if (rec && rec.length) {
      listIds = rec[0].listId ? rec[0].listId.split(",") : []
      list = rec[0].listName ? rec[0].listName.split(",") : [];
      // poolName = "demo,test".split(",")
    }
    return list.map((each: any, index: number) => ({
      name: each,
      id: listIds[index]
    }));
  }

  const getSequenceCount = (id: any) => {
    let rec: any = searchData.displayData.filter((item: any) => item.id === id);
    let sequenceCount = "";
    if (rec && rec.length) {
      sequenceCount = rec[0].sequenceCount ? rec[0].sequenceCount : "";
    }
    return sequenceCount;
  };

  const getSequenceName = (id: any) => {
    let rec: any = searchData.displayData.filter((item: any) => item.id === id);
    // console.log(rec, "reccc");
    let sequenceName: any = [];
    let sequenceIds: any[];
    if (rec && rec.length) {
      sequenceIds = rec[0].sequenceId ? rec[0].sequenceId.split(",") : []
      sequenceName = rec[0].sequenceName ? rec[0].sequenceName.split(",") : [];
      // sequenceName = "demo,test".split(",")
    }
    return sequenceName.map((each: any, index: number) => ({
      name: each,
      id: sequenceIds[index]
    }));
  };

  // const handleSnackClose = (snackId: any) => {
  //   // if (reason === "clickaway") {
  //   //   return;
  //   // }
  //   setOpenSnack((prev: any) => ({
  //     ...prev,
  //     [snackId]: false,
  //   }));
  // };

  const handleTableMail = (
    event: React.MouseEvent<HTMLButtonElement>,
    mailId: any
  ) => {
    const filterMailId = filterLocalData.filter(
      (item: any) => item.id === mailId
    );

    setTableOpenMail(filterMailId ? event.currentTarget : null);
    setSelectedRowId(mailId);
    setTableOpenCall(null);
    // setTableMore(null);
    // console.log('aa', mailId)
  };

  // const handleTableMailAddSeq = (
  //   event: React.MouseEvent<HTMLButtonElement>
  // ) => {
  //   setTableMailAddSequenceBtn(event.currentTarget);
  //   setTableOpenCall(null);
  //   setTableMore(null);
  // };

  const handleTableCall = (
    event: React.MouseEvent<HTMLButtonElement>,
    callId: any,
    number: any
  ) => {
    const filterCallId = filterLocalData.filter(
      (item: any) => item.id === callId
    );
    console.log("filterCallId", filterCallId);
    setTableOpenMail(null);
    setTableOpenCall(filterCallId && number ? event.currentTarget : null);
    setSelectedRowId(callId);
    // setTableMore(null);
  };

  // const handleTableMore = (
  //   event: React.MouseEvent<HTMLButtonElement>,
  //   moreId: any
  // ) => {
  //   const filtermoreId = filterLocalData.filter(
  //     (item: any) => item.id === moreId
  //   );

  //   setTableMore(filtermoreId ? event.currentTarget : null);

  //   // console.log('filtermoreId', filtermoreId)
  //   setSelectedRowId(moreId);
  //   setSequenceAnchorEl(null);
  //   setListAnchorEl(null);
  //   setEditAnchorEl(null);
  //   setPushAnchorEl(null);
  //   setDotAnchorEl(null);
  //   // setTitleAnchorEl(null);
  //   setcheckAnchorEl(null);
  //   setseqAnchorEl(null);
  //   setlisAnchorEl(null);
  //   setediAnchorEl(null);
  //   setspusAnchorEl(null);
  //   setmoreAnchorEl(null);
  //   // setrelAnchorEl(null);
  //   // openMoreTextBtn
  //   setPagination(null);
  // };

  const handleSequenceIconBtn = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (checkedCount > 0) {
      setSequenceAnchorEl(event.currentTarget);
    }
    setListAnchorEl(null);
    setEditAnchorEl(null);
    setPushAnchorEl(null);
    setDotAnchorEl(null);
    setcheckAnchorEl(null);
    setseqAnchorEl(null);
    setlisAnchorEl(null);
    setediAnchorEl(null);
    setspusAnchorEl(null);
    // setmoreAnchorEl(null);
    setRelevanceAnchorEl(null);
    setPagination(null);
    // setTableMore(null);
    setSortAnchorEl(null);
    setFieldAnchorEl(null);
  };

  const handleListIconBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (checkedCount > 0) {
      setListAnchorEl(event.currentTarget);
    }
    setSequenceAnchorEl(null);
    setEditAnchorEl(null);
    setPushAnchorEl(null);
    setDotAnchorEl(null);
    setcheckAnchorEl(null);
    setseqAnchorEl(null);
    setlisAnchorEl(null);
    setediAnchorEl(null);
    setspusAnchorEl(null);
    // setmoreAnchorEl(null);
    setRelevanceAnchorEl(null);
    setPagination(null);
    // setTableMore(null);
    setSortAnchorEl(null);
    setFieldAnchorEl(null);
  };

  const handleEditIconBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (checkedCount > 0) {
      setEditAnchorEl(event.currentTarget);
    }
    setSequenceAnchorEl(null);
    setListAnchorEl(null);
    setPushAnchorEl(null);
    setDotAnchorEl(null);
    setcheckAnchorEl(null);
    setseqAnchorEl(null);
    setlisAnchorEl(null);
    setediAnchorEl(null);
    setspusAnchorEl(null);
    // setmoreAnchorEl(null);
    setRelevanceAnchorEl(null);
    setPagination(null);
    // setTableMore(null);
    setSortAnchorEl(null);
    setFieldAnchorEl(null);
  };

  const handlePushIconBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (checkedCount > 0) {
      setPushAnchorEl(event.currentTarget);
    }
    setSequenceAnchorEl(null);
    setListAnchorEl(null);
    setEditAnchorEl(null);
    setDotAnchorEl(null);
    setcheckAnchorEl(null);
    setseqAnchorEl(null);
    setlisAnchorEl(null);
    setediAnchorEl(null);
    setspusAnchorEl(null);
    // setmoreAnchorEl(null);
    setRelevanceAnchorEl(null);
    setPagination(null);
    // setTableMore(null);
    setSortAnchorEl(null);
    setFieldAnchorEl(null);
  };

  const handleMoreIconBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (checkedCount > 0) {
      setDotAnchorEl(event.currentTarget);
    }
    setSequenceAnchorEl(null);
    setListAnchorEl(null);
    setEditAnchorEl(null);
    setPushAnchorEl(null);
    setcheckAnchorEl(null);
    setseqAnchorEl(null);
    setlisAnchorEl(null);
    setediAnchorEl(null);
    setspusAnchorEl(null);
    // setmoreAnchorEl(null);
    setRelevanceAnchorEl(null);
    setPagination(null);
    // setTableMore(null);
    setSortAnchorEl(null);
    setFieldAnchorEl(null);
  };

  const handleRelevance = (event: React.MouseEvent<HTMLButtonElement>) => {
    setRelevanceAnchorEl(event.currentTarget);
    setSequenceAnchorEl(null);
    setListAnchorEl(null);
    setEditAnchorEl(null);
    setPushAnchorEl(null);
    setDotAnchorEl(null);
    setcheckAnchorEl(null);
    setseqAnchorEl(null);
    setlisAnchorEl(null);
    setediAnchorEl(null);
    setspusAnchorEl(null);
    // setmoreAnchorEl(null);
    setPagination(null);
    // setTableMore(null);
    setSortAnchorEl(null);
    setFieldAnchorEl(null);
  };

  const handleCheckboxBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!searchData.displayData.length) {
      return;
    }
    setcheckAnchorEl(event.currentTarget);
    setSequenceAnchorEl(null);
    setListAnchorEl(null);
    setEditAnchorEl(null);
    setPushAnchorEl(null);
    setDotAnchorEl(null);
    setseqAnchorEl(null);
    setlisAnchorEl(null);
    setediAnchorEl(null);
    setspusAnchorEl(null);
    // setmoreAnchorEl(null);
    setRelevanceAnchorEl(null);
    setPagination(null);
    // setTableMore(null);
    setSortAnchorEl(null);
    setFieldAnchorEl(null);
  };

  const handlePagination = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPagination(event.currentTarget);
    setSequenceAnchorEl(null);
    setListAnchorEl(null);
    setEditAnchorEl(null);
    setPushAnchorEl(null);
    setDotAnchorEl(null);
    setcheckAnchorEl(null);
    setseqAnchorEl(null);
    setlisAnchorEl(null);
    setediAnchorEl(null);
    setspusAnchorEl(null);
    // setmoreAnchorEl(null);
    setRelevanceAnchorEl(null);
    // setTableMore(null);
    setSortAnchorEl(null);
    setFieldAnchorEl(null);
  };

  const handleSequenceTextBtn = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (checkedCount > 0 && isValidSeqPool) {
      if (parseInt(recrData.paymentType) > 2 && (smsCredits > 0 && smsCredits !== consumedSmsCredits)) {
        setCheckboxModalTitle("Campaign")
        setOpenCheckboxModal(true)
      }
      else {
        setseqAnchorEl(event.currentTarget);


        try {
          let sendListData: any = {
            clientId: localStorage.getItem("clientId"),
            sequenceName: "",
            recrId: userLocalData.getvalue('recrId')
          };
          let response = await apiService.searchSequence(sendListData);
          console.log(response.data, "herrr see");
          if (response.data) {
            setSequenceData(response.data.list);
          }

          // console.log(response.data.Data, 'response.data.data', response)
        } catch (e) {
          console.log(e, "error");
        }
      }

    }

    setSequenceAnchorEl(null);
    setListAnchorEl(null);
    setEditAnchorEl(null);
    setPushAnchorEl(null);
    setDotAnchorEl(null);
    setcheckAnchorEl(null);
    setlisAnchorEl(null);
    setediAnchorEl(null);
    setspusAnchorEl(null);
    // setmoreAnchorEl(null);
    setRelevanceAnchorEl(null);
    setPagination(null);
    // setTableMore(null);
    setSortAnchorEl(null);
    setFieldAnchorEl(null);
  };

  const assignBulkCampaign = (data: any) => {


    // try {
    //   let sendListData: any = {
    //     clientId: localStorage.getItem("clientId"),
    //     sequenceName: "",
    //     recrId: userLocalData.getvalue('recrId')
    //   };
    //   let response = await apiService.searchSequence(sendListData);
    //   console.log(response.data, "herrr see");
    //   if (response.data) {
    //     setSequenceData(response.data.list);
    //   }

    //   // console.log(response.data.Data, 'response.data.data', response)
    // } catch (e) {
    //   console.log(e, "error");
    // }

    setSequenceAnchorEl(null);
    setListAnchorEl(null);
    setEditAnchorEl(null);
    setPushAnchorEl(null);
    setDotAnchorEl(null);
    setcheckAnchorEl(null);
    setlisAnchorEl(null);
    setediAnchorEl(null);
    setspusAnchorEl(null);
    // setmoreAnchorEl(null);
    setRelevanceAnchorEl(null);
    setPagination(null);
    // setTableMore(null);
    setSortAnchorEl(null);
    setFieldAnchorEl(null);
  }

  const handleListTextBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (checkedCount > 0 && isValidSeqPool) {
      if (parseInt(recrData.paymentType) > 2 && (smsCredits > 0 && smsCredits !== consumedSmsCredits)) {
        setCheckboxModalTitle("Pool")
        setOpenCheckboxModal(true)
      }
      else {
        setlisAnchorEl(event.currentTarget);
        apiService
          .getPoolList("")
          .then((response: any) => {
            console.log("addtolistdata:", response.data);
            setAddTolistOptions(response.data?.list ? response.data?.list : []);
          })
          .catch((error: any) => {
            console.error("Error fetching data:", error);
          });
      }

    }
    setSequenceAnchorEl(null);
    setListAnchorEl(null);
    setEditAnchorEl(null);
    setPushAnchorEl(null);
    setDotAnchorEl(null);
    setcheckAnchorEl(null);
    setseqAnchorEl(null);
    setediAnchorEl(null);
    setspusAnchorEl(null);
    // setmoreAnchorEl(null);
    setRelevanceAnchorEl(null);
    setPagination(null);
    // setTableMore(null);
    setSortAnchorEl(null);
    setFieldAnchorEl(null);
  };

  const handleEditTextBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (checkedCount > 0) {
      setediAnchorEl(event.currentTarget);
    }
    setSequenceAnchorEl(null);
    setListAnchorEl(null);
    setEditAnchorEl(null);
    setPushAnchorEl(null);
    setDotAnchorEl(null);
    setcheckAnchorEl(null);
    setseqAnchorEl(null);
    setlisAnchorEl(null);
    setspusAnchorEl(null);
    // setmoreAnchorEl(null);
    setRelevanceAnchorEl(null);
    setPagination(null);
    // setTableMore(null);
    setSortAnchorEl(null);
    setFieldAnchorEl(null);
  };

  const handlePushTextBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (checkedCount > 0) {
      setspusAnchorEl(event.currentTarget);
    }
    setSequenceAnchorEl(null);
    setListAnchorEl(null);
    setEditAnchorEl(null);
    setPushAnchorEl(null);
    setDotAnchorEl(null);
    setcheckAnchorEl(null);
    setseqAnchorEl(null);
    setlisAnchorEl(null);
    setediAnchorEl(null);
    // setmoreAnchorEl(null);
    setRelevanceAnchorEl(null);
    setPagination(null);
    // setTableMore(null);
    setSortAnchorEl(null);
    setFieldAnchorEl(null);
  };

  // const handleMoreTextBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   if (checkedCount > 0) {
  //     setmoreAnchorEl(event.currentTarget);
  //   }
  //   setSequenceAnchorEl(null);
  //   setListAnchorEl(null);
  //   setEditAnchorEl(null);
  //   setPushAnchorEl(null);
  //   setDotAnchorEl(null);
  //   setcheckAnchorEl(null);
  //   setseqAnchorEl(null);
  //   setlisAnchorEl(null);
  //   setediAnchorEl(null);
  //   setspusAnchorEl(null);
  //   setRelevanceAnchorEl(null);
  //   setPagination(null);
  //   setTableMore(null);
  //   setSortAnchorEl(null);
  //   setFieldAnchorEl(null);
  // };

  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  //   if (checkedCount > 0) {
  //     switch (event.currentTarget.id) {
  //       case "sequence":
  //         setSequenceAnchorEl(event.currentTarget);
  //         break;
  //       case "list":
  //         setListAnchorEl(event.currentTarget);
  //         break;
  //       case "edit":
  //         setEditAnchorEl(event.currentTarget);
  //         break;
  //       case "push":
  //         setPushAnchorEl(event.currentTarget);
  //         break;
  //       case "dot":
  //         setDotAnchorEl(event.currentTarget);
  //         break;
  //       case "seq":
  //         setseqAnchorEl(event.currentTarget);
  //         break;
  //       case "lis":
  //         setlisAnchorEl(event.currentTarget);
  //         break;
  //       case "edi":
  //         setediAnchor setRelevanceAnchorEl(null);El(event.currentTarget);
  //         break;
  //       case "pus":
  //         setspusAnchorEl(event.currentTarget);
  //         break;
  //       case "mor":
  //         setmoreAnchorEl(event.currentTarget);
  //         break;
  //       default:
  //         break;
  //     }
  //   } if (checkedCount >= 0) {
  //     switch (event.currentTarget.id) {
  //       case "title":
  //         setTitleAnchorEl(event.currentTarget);
  //         break;
  //       case "rel":
  //         setrelAnchorEl(event.currentTarget);
  //         break;
  //       case "pagination":
  //         setPagination(event.currentTarget);
  //         break;
  //       case "checkboxbtn":
  //         setcheckAnchorEl(event.currentTarget);
  //         break;
  //       case "che":
  //         setRescheck(event.currentTarget);
  //         break;
  //       default:
  //         break;
  //     }
  //   }
  // }

  const handleRelevanceField = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFieldAnchorEl(event.currentTarget);

    setSelectValue(searchData.sort_by);

    setSortAnchorEl(null);
    // setRelevanceAnchorEl(null);
    setSequenceAnchorEl(null);
    setListAnchorEl(null);
    setEditAnchorEl(null);
    setPushAnchorEl(null);
    setDotAnchorEl(null);
    setcheckAnchorEl(null);
    setseqAnchorEl(null);
    setlisAnchorEl(null);
    setediAnchorEl(null);
    setspusAnchorEl(null);
    // setmoreAnchorEl(null);
    setPagination(null);
    // setTableMore(null);
  };

  const handleRelevancesort = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSortAnchorEl(event.currentTarget);

    setSelectSortValue(
      searchData.sort_type === "asc" ? "Ascending" : "Descending"
    );
    // setRelevanceAnchorEl(null);
    setFieldAnchorEl(null);
    setSequenceAnchorEl(null);
    setListAnchorEl(null);
    setEditAnchorEl(null);
    setPushAnchorEl(null);
    setDotAnchorEl(null);
    setcheckAnchorEl(null);
    setseqAnchorEl(null);
    setlisAnchorEl(null);
    setediAnchorEl(null);
    setspusAnchorEl(null);
    // setmoreAnchorEl(null);
    setPagination(null);
    // setTableMore(null);
  };

  const handleClose = () => {
    setSequenceAnchorEl(null);
    setListAnchorEl(null);
    setEditAnchorEl(null);
    setPushAnchorEl(null);
    setDotAnchorEl(null);
    setcheckAnchorEl(null);
    setseqAnchorEl(null);
    setlisAnchorEl(null);
    setediAnchorEl(null);
    setspusAnchorEl(null);
    // setmoreAnchorEl(null);
    setRelevanceAnchorEl(null);
    setPagination(null);
    // setTableMore(null);
  };

  // const handleMenuItemclick = () => {
  //   setCheck(prevCheck => !prevCheck);
  //   handleClose();
  // }

  const onClickHide = () => {
    const newIsHide = !ishide;
    onIsHideChange(newIsHide);
  };

  const onClickTotal = () => {
    currentPageNum = 0;
    setPage(0);
    setTotalPages(0);
    // setSearchData((prevSearchData: any) => ({
    //   ...prevSearchData,
    //   displayData: [],
    // }));
    setLocalData([]);
    setTalentWithCommunityData([]);
    // setTotalRecords(0);
    // setTotalSavedRecords(0);

    setIsTotal(true);
    // setIsNetNew(false);
    setIsSaved(false);
    isSavedEnable = false;
    localStorage.setItem("isSavedEnable", "false");
    // if (pageLoadTime && searchData.companyId && filterCheck) {
    //   console.log("is ok");

    //   getTableData();
    // } else {
    //   setTotalRecords(0)
    //   setTotalSavedRecords(0)
    // }
  };

  // const [isNetNew, setIsNetNew] = useState(false);
  // const onClickNetNew = () => {
  //   setIsNetNew(true);
  //   setIsTotal(false);
  //   setIsSaved(false);
  //   isSavedEnable = false;
  //   localStorage.setItem("isSavedEnable", "false");
  // };

  let isSavedEnable =
    localStorage.getItem("isSavedEnable") === "true" ? true : false;
  const onClickSaved = () => {
    currentPageNum = 0;
    setPage(0);
    setTotalPages(0);
    // setDisplayData([]);
    // setSearchData((prevSearchData: any) => ({
    //   ...prevSearchData,
    //   displayData: [], 
    // }));
    setLocalData([]);
    setTalentWithCommunityData([]);
    // setTotalRecords(0);
    // // setTotalSavedRecords(0);

    setIsTotal(false);
    setIsSaved(true);
    isSavedEnable = true;
    localStorage.setItem("isSavedEnable", "true");
    // setIsNetNew(false);
    // if (pageLoadTime && searchData.companyId && filterCheck) {
    //   console.log("is ok");

    setTimeout(() => {
      getTableData("fromClickSave")
    }, 0);
    // } else {
    //   setTotalRecords(0)
    //   setTotalSavedRecords(0)
    // }
  };
  const [savedRecords, setSavedReacords] = useState<any>([]);
  const [recordsSavedData, setRecordsSavedData] = useState<any>([]);

  const getNonEmptyEducation = (educationList: any) => {
    const updatedEducationList = educationList.filter(
      (item: any) => item.degrees.length !== 0
    );
    return updatedEducationList;
  };

  const getDateDifference = (startDate: any, endDate: any) => {
    const start = moment(startDate);
    const end = moment(endDate);

    const years = end.diff(start, "years");
    start.add(years, "years");

    const months = end.diff(start, "months");
    start.add(months, "months");

    // const days = end.diff(start, "days");

    if (years !== 0 && months !== 0) {
      return `${years} yrs ${months} mos`;
    } else if (years === 0 && months !== 0) {
      return `${months} mos`;
    }

    return `${years} yrs`;
  };

  // const getTotalExperience = (expList: any) => {
  //   const startDatesList = expList.map((item: any) => {
  //     if (item.start_date) {
  //       return moment(item.start_date);
  //     } else {
  //       return null;
  //     }
  //   });
  //   const endDatesList = expList.map((item: any) => {
  //     if (item.end_date) {
  //       return moment(item.end_date);
  //     } else {
  //       return null;
  //     }
  //   });

  //   const updatedStartDatesList = startDatesList.filter(
  //     (item: any) => item !== null
  //   );
  //   const updatedEndDatesList = endDatesList.filter(
  //     (item: any) => item !== null
  //   );

  //   const startDate = moment.min(updatedStartDatesList);
  //   const endDate = moment.max(updatedEndDatesList);

  //   console.log(startDatesList);

  //   const totalDiff = getDateDifference(startDate, endDate);

  //   return totalDiff;
  // };

  const getMonth = (dateString: any) => {
    const date = moment(dateString);
    const month = date.format("MMM");
    return month;
  };

  // const getDate = (dateString: any) => {
  //   const date = moment(dateString);
  //   const dayOfMonth = date.format("D");
  //   return dayOfMonth;
  // };

  const getYear = (dateString: any) => {
    const date = moment(dateString);
    const year = date.year();
    return year;
  };

  const channelToBroadcast = new BroadcastChannel("checkConsumedProfileCredits");
  const saveToSingleRecord = (row: any, phoneOrEmail: 'phone' | 'email' | 'both') => {
    let dataToPass: any = {
      recrId: parseInt(searchData.userId),
      companyId: searchData.companyId,
      personIds: [row.id],
      isSaveWithEmail: ((phoneOrEmail === 'email') || (phoneOrEmail === 'both')) ? true : false,
      isSaveWithPhoneNumber: ((phoneOrEmail === 'phone') || (phoneOrEmail === 'both')) ? true : false,
      emailType: phoneOrEmail === 'email' ? row.emailType : 0,
      phoneType: phoneOrEmail === "phone" ? row.phoneType : 0
    };

    dataToPass.recrIds = recrIds;

    // setApiLoading(true);
    console.log(dataToPass);
    apiService.saveToAccuick(dataToPass).then((response: any) => {
      // setApiLoading(false);
      if (response.data.Success) {
        channelToBroadcast.postMessage({
          checkCreditScore: true
        });

        setIsRecordSavedAccuick(response.data.Success);
        if (response.data.Success) {
          showToaster("Record stored successfully", 'success');
        }

        if (response.data.Error) {
          showToaster("Record Not Saved", 'error');
        }
        let creditsData = localStorage.getItem(`credits_${userLocalData.getvalue('recrId')}`)
        if (creditsData) {
          let parsedCreditsData = JSON.parse(creditsData)
          console.log(parsedCreditsData)
          setProfileCredits(parsedCreditsData?.totalProfileCredits)
          setConsumedCredits(parsedCreditsData?.consumedProfileCredits)
          if (userLocalData.getvalue(
            "paymentType"
          ) !== 1 || userLocalData.getvalue(
            "paymentType"
          ) !== 2) {
            setSmsCredits(parsedCreditsData?.totalSmsCredits)
            setConsumedSmsCredits(parsedCreditsData?.consumedSmsCredits)
          }

        }
        setSavedReacords(null);
        setSavedReacords([...savedRecords, row.id]);
        let tempPidObj = { userId: response.data.userId, personId: row.id };
        // console.log('aaabbbb', response.data);
        setRecordsSavedData([...savedRecords, tempPidObj]);
        let tableData = [...searchData.displayData];
        tableData.forEach((data: any) => {
          if (data.id === row.id) {
            data.userId = response.data.userId;
            data.mobile_phone = response.data.phone;
            data.sequenceId = "";
            data.sequenceCount = 0;
            data.poolId = "";
            data.poolCount = 0;
            data.sequenceName = "";
            data.poolName = "";
            data.recommended_personal_email = response.data.email;
            data.email = response.data.email;

            data.isPackageEmailValidity = response.data.isPackageEmailValidity;
            data.isPackagePhoneValidity = response.data.isPackagePhoneValidity;
            data.isShowEmail = response.data.isShowEmail;
            data.isShowPhone = response.data.isShowPhone;
          }
        });
        setSearchData((prevSearchData: any) => ({
          ...prevSearchData,
          displayData: tableData,
        }));
        // getTableData("useEffect")
      } else {
        showToaster(response.data.Message ? response.data.Message : "An error occured while saving.", "error");
      }
    });
  };


  const isContact = () => window.location.hash.includes('/contact/people');

  const checkIsRecordExists = (row: any) => {
    let id = row.id;
    // let dataToPass = {
    //   personId: id,
    // };
    // console.log(recordsSavedData);
    // console.log("gowork")
    // console.log(localData);
    let checkLocalObj = localData.filter((item: any) => item.id === id);

    console.log(checkLocalObj, 'local');



    let checkrecordsSavedData = recordsSavedData.filter(
      (item: any) => item.personId === id
    );

    let searchDataObj = searchData?.displayData?.length ? searchData.displayData.filter((item: any) => item.id === id) : [];

    let parentUrl = window.parent.location;
    let originPart = parentUrl.origin.length
      ? parentUrl.origin
      : "https://app.curately.ai/";

    let pathPart = parentUrl.pathname.length ? parentUrl.pathname : "";

    const pdlStartPath = originPart + pathPart;

    let hashPart = parentUrl.hash;

    const parts = hashPart.split("/");

    const urlPart = parts && parts.length > 1 ? parts[1] : "";

    const pdlClientName = hashPart.length && urlPart ? urlPart : "demo";

    localStorage.setItem("pdlStartPath", pdlStartPath);

    localStorage.setItem("pdlClientName", pdlClientName);

    localStorage.setItem("pdlcandName", row.full_name);

    localStorage.setItem("pdlSearchData", JSON.stringify(searchData));

    localStorage.setItem("pdlPageNo", JSON.stringify(page));

    const candidateBreadCrumbsData = [
      {
        text: "Search",
        link: `../../${isContact() ? 'contact' : 'resume'}/people`
      },
      {
        text: "People",
        link: `../../${isContact() ? 'contact' : 'resume'}/people?isPdlSearch=true`,
      },
      {
        text: row.full_name, link: ""
      },
    ];
    const breadCrumbsData = [
      {
        text: "Search",
        link: `../../../${isContact() ? 'contact' : 'resume'}/people`
      },
      {
        text: "People",
        link: `../../../${isContact() ? 'contact' : 'resume'}/people?isPdlSearch=true`,
      },
      {
        text: row.full_name, link: ""
      },
    ];


    // {pid:userid}
    if (checkLocalObj && checkLocalObj.length && checkLocalObj[0].userId) {
      // let url1 = `${pdlStartPath}#/${pdlClientName}/candidate/view/${checkLocalObj[0].userId}`;
      // window.open(url1, "_blank", "noreferrer");
      let url1 = `${isContact() ? 'contact' : 'candidate'}/view/${checkLocalObj[0].userId}`;
      navigate(`../../../${url1}`, { state: { data: candidateBreadCrumbsData } });
      localStorage.setItem("isProfileAccessed", JSON.stringify(true));
    } else if (checkrecordsSavedData && checkrecordsSavedData.length) {
      let url1 = `${isContact() ? 'contact' : 'candidate'}/view/${checkrecordsSavedData[0].userId}`;
      navigate(`../../../${url1}`, { state: { data: candidateBreadCrumbsData } });
      localStorage.setItem("isProfileAccessed", JSON.stringify(true));
    } else if (searchDataObj && searchDataObj.length && searchDataObj[0].userId) {
      let url1 = `${isContact() ? 'contact' : 'candidate'}/view/${searchDataObj[0].userId}`;
      navigate(`../../../${url1}`, { state: { data: candidateBreadCrumbsData } });
      localStorage.setItem("isProfileAccessed", JSON.stringify(true));
    } else {
      localStorage.setItem("UserId", searchData.userId);

      localStorage["short" + id] = JSON.stringify(row);
      // navigate(`/profile/${id}`);

      // let url = `${process.env.PUBLIC_URL
      //   }/profile/${id}`;
      // window.open(url, "_blank", "noreferrer");
      // let url = globalData.getWindowLocation() + `resume/people/profile/${id}`;
      // window.open(url, "_blank", "noreferrer");
      // let url = `profile/${id}`;
      navigate(`profile/${id}`, { state: { data: breadCrumbsData } });
      localStorage.setItem("isProfileAccessed", JSON.stringify(false));
    }
    // apiService.isrecordexists(dataToPass).then((response: any) => {
    //   console.log(response.data.data);
    //   // debugger;
    //   if (response.data.data && response.data.data.full_name) {
    //     localStorage["profile" + id] = JSON.stringify(response.data.data);
    //     // history.push(`/profile/${id}`);

    //     // navigate(`/contacts/${id}`);

    //     let url1 = `${process.env.PUBLIC_URL
    //       }/contacts/${id}`;
    //     window.open(url1, "_blank", "noreferrer");
    //   } else {
    //     localStorage["short" + id] = JSON.stringify(row);
    //     // navigate(`/profile/${id}`);

    //     let url = `${process.env.PUBLIC_URL
    //       }/profile/${id}`;
    //     window.open(url, "_blank", "noreferrer");
    //   }
    // });
  };

  // console.log("listLayoutData", listLayoutData)

  const handleFilterLayouts = (e: any) => {
    setFilterValue(e.target.value);
    // let filteredLayouts = listLayoutData.filter((layout: any) => {
    //   if (!filterValue) return true
    //   if (layout.layoutName.toLowerCase().includes(filterValue.toLowerCase())) {
    //     return true
    //   }
    // }
    // )
    // console.log(filteredLayouts, 'filteredLayouts')
    // setListLayoutData([...filteredLayouts])
    // console.log(listLayoutData, 'listLayoutDatalistLayoutData')
  };

  // const filteredLayoutItemToMainHeader = listLayoutData.filter((item:any) => (
  //   item.isSelected === true
  // ))
  // console.log("filteredLayoutItemToMainHeader", filteredLayoutItemToMainHeader)

  // if (filteredLayoutItemToMainHeader.length !== 0) {

  //   const filteredLayoutItemToMainHeaderJSON = filteredLayoutItemToMainHeader[0]["layoutJSON"]

  //   const parsedFilteredLayoutItemToMainHeaderJSON = JSON.parse(filteredLayoutItemToMainHeaderJSON)

  //   console.log("parsedFilteredLayoutItemToMainHeaderJSON", parsedFilteredLayoutItemToMainHeaderJSON)

  //   // setMainTableHeaderItems(parsedFilteredLayoutItemToMainHeaderJSON)
  // }

  const sendListLayoutData = () => {
    setListLayoutLoading(true);
    let sendListData: any = {
      recrId: parseInt(searchData.userId),
      clientId: localStorage.getItem("clientId"),
    };


    sendListData.recrIds = recrIds;


    apiService.ListLayoutData(sendListData).then((response: any) => {
      setListLayoutLoading(false);
      if (response.data.Success) {
        // console.log(response.data.LayoutList)
        setListLayoutData(response.data.LayoutList);
        setIntialData(response.data.LayoutList);
        // console.log(listLayoutData, 'here')
      }
    });
  };

  const sendLayoutSaveData = () => {
    const headerItemsLength = headerItems.length;
    let sendCreatedData = [];
    for (let i = 0; i < headerItemsLength; i++) {
      let itemObject = { name: "", key: "" };
      itemObject.name = headerItems[i].name;
      itemObject.key = headerItems[i].key;
      sendCreatedData.push(itemObject);
    }

    // console.log("formij", formik, formik.values.tableLayoutName)

    let sendSaveData: any = {
      layoutName: formik.values.tableLayoutName,
      visibility: defaultVisibilty === "private" ? 0 : 1,
      recrId: parseInt(searchData.userId),
      layoutJson: JSON.stringify(sendCreatedData),
    };


    sendSaveData.recrIds = recrIds;


    apiService.SaveLayoutData(sendSaveData).then((response: any) => {
      if (response.data.Success && response.data.Status === 200) {
        // console.log(response.data.Message)
      }
      if (response.data.Error) {
        showToaster(response.data.Message, "error");
        // setLayoutError(true);
        // setErrorMessage(response.data.Message);
      }
    });
  };

  const sendLayoutUpdateData = () => {
    let sendUpdateData: any = {
      layoutId: updateLayoutId,
      layoutName: formik.values.tableLayoutName,
      layoutJson: JSON.stringify(headerItems),
      visibility: defaultVisibilty === "private" ? 0 : 1,
      recrId: parseInt(searchData.userId),
    };


    sendUpdateData.recrIds = recrIds;


    apiService.UpdateLayoutData(sendUpdateData).then((response: any) => {
      if (response.data.Success && response.data.Status === 200) {
        console.log(response.data.Message);
        // onClickNewLayout()

        // const filteredLayoutItem = listLayoutData.map((item: any) => {
        //   if (item.isSelected === true && item.layoutId === updateLayoutId) {
        //     setMainTableHeaderItems(headerItems);
        //   }
        // });
      }
    });
  };

  const sendGetLayoutDataInitial = () => {
    let sendGetData: any = {
      recrId: parseInt(searchData.userId),
      clientId: localStorage.getItem("clientId"),
    };


    sendGetData.recrIds = recrIds;


    apiService.GetLayoutData(sendGetData).then((response: any) => {
      if (response.data.Success) {
        // console.log(response.data)
        const headerItemsJson = response.data.layoutJSON;
        console.log("headerItemsJson", headerItemsJson);

        try {
          const parsedHeaderItemsJson = headerItemsJson;
          // console.log("parsedHeaderItemsJson", parsedHeaderItemsJson)
          setMainTableHeaderItems(parsedHeaderItemsJson);
        } catch (error) {
          console.error("Error parsing layoutJSON123:", error);
        }
      }

      if (response.data.Error) {
        showToaster(response.data.Message, "error");
        // setLayoutError(true);
        // setErrorMessage(response.data.Message);
      }
    });
  };

  const sendGetLayoutData = (layoutId: number) => {
    let sendGetData: any = {
      recrId: parseInt(searchData.userId),
      clientId: localStorage.getItem("clientId"),
      // 5,
    };

    sendGetData.recrIds = recrIds;


    apiService.GetLayoutData(sendGetData).then((response: any) => {
      if (response.data.Success) {
        // console.log("response.data", response.data)
        // onClickNewLayout()

        // setHeaderItems(JSON.parse(response.data.layoutJSON))
        const filteredLayoutItem = listLayoutData.filter(
          (item: any) => item.layoutId === layoutId
        );
        // console.log("filteredLayoutItem", filteredLayoutItem)
        const filteredLayoutItemJSON = filteredLayoutItem[0]["layoutJSON"];
        // const filteredLayoutItemName = filteredLayoutItem[0]["layoutName"];
        // console.log("filteredLayoutItemName", typeof filteredLayoutItemName)
        // console.log("filteredLayoutItemJSON", filteredLayoutItemJSON)
        // const parsedLayoutJSON = JSON.parse(response.data.layoutJSON);
        // console.log("parsedLayoutJSON", parsedLayoutJSON)
        try {
          const parsedLayoutJSON = filteredLayoutItemJSON;
          // console.log("parsedLayoutJSON", parsedLayoutJSON)
          setHeaderItems(parsedLayoutJSON);
        } catch (error) {
          console.error("Error parsing layoutJSON:", error);
        }
      }
    });
  };

  const sendChangeSelectedLayout = (layoutId: number) => {
    let sendChangeSelectedLayoutData: any = {
      recrId: parseInt(searchData.userId),
      layoutId: layoutId,
    };

    sendChangeSelectedLayoutData.recrIds = recrIds;


    apiService
      .ChangeSelectedLayout(sendChangeSelectedLayoutData)
      .then((response: any) => {
        if (response.data.Success && response.data.Status === 200) {
          // console.log("working change", layoutId)
          sendGetLayoutData(layoutId);

          const filteredLayoutItem = listLayoutData.filter(
            (item: any) => item.layoutId === layoutId
          );
          console.log("filteredLayoutItem", filteredLayoutItem);

          const updatedFilteredListLayoutData: any = filteredLayoutItem.map(
            (item: any) => {
              if (item.layoutId === layoutId) {
                return { ...item, isSelected: true };
              }
            }
          );

          console.log(
            "updatedFilteredListLayoutData",
            updatedFilteredListLayoutData
          );

          const updatedListLayoutData: any = listLayoutData.map((item: any) => {
            if (item.layoutId === layoutId) {
              return { ...updatedFilteredListLayoutData[0] };
            } else {
              return { ...item, isSelected: false };
            }
          });

          console.log("updatedListLayoutData", updatedListLayoutData);

          setListLayoutData(updatedListLayoutData);

          if (isAll) {
            setIntialData(updatedListLayoutData);
          } else if (isPrivate || isPublic) {
            const privatePublicFilteredLayoutItem = intialLayoutData.filter(
              (item: any) => item.layoutId === layoutId
            );
            console.log(
              "privatePublicFilteredLayoutItem",
              privatePublicFilteredLayoutItem
            );

            const privatePublicUpdatedFilteredListLayoutData: any =
              privatePublicFilteredLayoutItem.map((item: any) => {
                if (item.layoutId === layoutId) {
                  return { ...item, isSelected: true };
                }
              });

            console.log(
              "privatePublicUpdatedFilteredListLayoutData",
              privatePublicUpdatedFilteredListLayoutData
            );

            const privatePublicUpdatedListLayoutData: any =
              intialLayoutData.map((item: any) => {
                if (item.layoutId === layoutId) {
                  return { ...privatePublicUpdatedFilteredListLayoutData[0] };
                } else {
                  return { ...item, isSelected: false };
                }
              });

            console.log(
              "privatePublicUpdatedListLayoutData",
              privatePublicUpdatedListLayoutData
            );

            setIntialData(privatePublicUpdatedListLayoutData);
          }

          console.log(listLayoutData, "here 1");
          // setMainTableHeaderItems(headerItems)

          const filteredLayoutItemJSON = filteredLayoutItem[0]["layoutJSON"];

          const parsedLayoutJSON = filteredLayoutItemJSON;
          console.log("parsedLayoutJSONSelected", parsedLayoutJSON);

          setMainTableHeaderItems(parsedLayoutJSON);
        }
      });
  };

  const sendDeleteLayout = (layoutId: number) => {
    let sendDeleteLayoutData: any = {
      layoutId: layoutId,
    };

    apiService.DeleteLayout(sendDeleteLayoutData).then((response: any) => {
      if (response.data.Success && response.data.Status === 200) {
        console.log("working delete", layoutId);
        // sendListLayoutData()

        const filteredLayoutItem = listLayoutData.filter(
          (item: any) => item.layoutId === layoutId
        );
        console.log("filteredLayoutItem", filteredLayoutItem);

        // const filteredLayoutItemIndex = listLayoutData.indexOf(
        //   filteredLayoutItem[0]
        // );

        // const updatatedListLayoutData = listLayoutData.splice(
        //   filteredLayoutItemIndex,
        //   1
        // );
        console.log();
        setListLayoutData(listLayoutData);
        console.log(listLayoutData, "here 2");
        setIsTableLayoutMenuMoreOptions(null);

        if (filteredLayoutItem[0]["isSelected"]) {
          console.log("working 3");
          sendChangeSelectedLayout(1);
        }
      }

      if (response.data.Error) {
        showToaster(response.data.Message, "error");
        // setLayoutError(true);
        // setErrorMessage(response.data.Message);
      }
    });
  };

  // const getListLayoutDeleteData = debounce(sendDeleteLayout, 500)

  // const tableHeadersList: any = [
  //   'Name',
  //   'Title',
  //   'Company',
  //   'Quick Actions',
  //   'Contact Location',
  //   '# Employees',
  //   'Industry',
  //   'Keywords',
  //   'Contact Stage',
  //   'Contact Last Activity',
  //   'Contact Owner',
  //   'Contact Lists'
  // ];

  // { id: 5, name: "Contact Location", isSortable: false, },
  // { id: 4, name: "Quick Actions", isSortable: false, },
  // { id: 9, name: "Contact Stage", isSortable: true, },
  //   { id: 10, name: "Contact Last Activity", isSortable: true, },
  //   { id: 11, name: "Contact Owner", isSortable: true, },
  //   { id: 12, name: "Contact Lists", isSortable: false, },

  // { label: "# Employees" },
  // { label: "Quick Actions" },
  // { label: "Keywords" },
  // { label: "Contact Stage" },
  // { label: "Contact Last Activity" },
  // { label: "Contact Owner" },
  // { label: "Contact Lists" },

  // const [anchorEl, setAnchorEl] = useState(null);

  // const handleClick = (event: any) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  // const handleChangePage = (
  //   event: React.MouseEvent<HTMLButtonElement> | null,
  //   newPage: number
  // ) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  // const handlePageSelection = (selectedPage: any) => {
  //   setPage(selectedPage);
  //   setTitleAnchorEl(null);
  // };

  // const renderMenuItems = () => {
  //   const items = [];
  //   for (let i = 1; i <= totalPages; i++) {
  //     items.push(
  //       <MenuItem
  //         key={i}
  //         onClick={() => handlePageSelection(i)}
  //       >
  //         {i}
  //       </MenuItem>
  //     );
  //   }
  //   return items;
  // };

  // const onRequestSort:any;

  // const createSortHandler = (property:any) => (event:any) => {
  //   onRequestSort(event, property);
  // };

  // function TableCellItem({ person }: any) {
  //   return (
  //     <TableCell sx={{
  //       lineHeight: '20px', padding: '5px 10px', fontFamily: 'Regular',
  //       fontWeight: '400',
  //       fontSize: '12px', minWidth: '200px'
  //     }}>{person.cellName}

  //       {/* <TableSortLabel
  //             active={orderBy === headCell.id}
  //             direction={orderBy === headCell.id ? order : 'asc'}
  //             onClick={createSortHandler(headCell.id)}
  //           >
  //             {headCell.label}
  //             {orderBy === headCell.id ? (
  //               <Box component="span" sx={visuallyHidden}>
  //                 {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
  //               </Box>
  //             ) : null}
  //           </TableSortLabel> */}
  //     </TableCell>
  //   )

  // }

  // const tableHeadersList = [
  //   { name: "Name", isSortable: true },
  //   { name: "Title", isSortable: true },
  //   { name: "Company", isSortable: true },
  //   { name: "Industry & Keywords", isSortable: true },
  //   { name: "Location", isSortable: false },
  //   { name: "Quick Actions", isSortable: false },
  // ];

  const tableHeadersListLabels = [
    "Relevance",
    "Name",
    "Title",
    "Company",
    "Industry & Keywords",
    // { label: "Location" },
  ];

  const parametersList: any = {
    Relevance: "",
    Company: "company_name",
    Name: "full_name",
    Title: "job_title",
    Country: "job_country",
    "# Employees": "job_company_size",
    State: "State",
    City: "City",
    Email: "Email",
    Phone: "Phone",
    "Company Country": "company_country",
    "Company State": "company_state",
    "Company City": "company_city",
    "Industry & Keywords": "Industry & Keywords",
  };

  const sortingLabel = ["Ascending", "Descending"];

  const [selectvalue, setSelectValue] = useState("");

  const [selectsortvalue, setSelectSortValue] = useState("");

  const handleClose1 = () => {
    setFieldAnchorEl(null);
    setSortAnchorEl(null);
  };

  const handleFieldmenu = (Field: any) => {
    setSelectValue(Field);
    setFieldAnchorEl(null);
    setSortAnchorEl(null);
  };

  const handleSortmenu = (sorting: any) => {
    setSelectSortValue(sorting);
    // setSort(sorting);
    setSortAnchorEl(null);
  };

  // const [sortColumnId, setSortColumnId] = useState<string | null>(null);

  // const tableSort = (name: any, sorttype: any) => {
  //   setSort(sorttype);
  //   setSortColumnId(name);
  //   setSearchData((prevSearchData: any) => ({
  //     ...prevSearchData,
  //     sort_type: sorttype === "Ascending" ? "asc" : "desc",
  //     sort_by: name,
  //   }));
  // };

  const handleSort = (headerId: string) => {
    // setSort(sort == 'Ascending' ? 'desc' : 'asc');

    // const name = searchData.sort_by;
    const sortAscending = searchData.sort_type;

    // if (name === headerId) {
    // setSortColumnId(headerId);
    const sortedData = searchData.displayData.slice().sort((a: any, b: any) => {
      let columnValueA, columnValueB;

      switch (headerId) {
        case "Name":
          columnValueA = a.full_name || "";
          columnValueB = b.full_name || "";
          break;
        case "Title":
          columnValueA = a.job_title || "";
          columnValueB = b.job_title || "";
          break;
        case "Company":
          columnValueA = a.job_company_name || "";
          columnValueB = b.job_company_name || "";
          break;
        case "Industry & Keywords":
          columnValueA = a.industry || "";
          columnValueB = b.industry || "";
          break;
        default:
          columnValueA = "";
          columnValueB = "";
      }

      if (columnValueA > columnValueB) {
        return sortAscending ? 1 : -1;
      }
      if (columnValueA < columnValueB) {
        return sortAscending ? -1 : 1;
      }
      return 0;
    });

    const displayDataFinal = sortedData.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
    // setDisplayData(displayDataFinal);
    setSearchData((prevSearchData: any) => ({
      ...prevSearchData,
      displayData: displayDataFinal,
    }));
    // }
  };

  // const closeRestore = () => {
  //   setIsRecordSavedAccuick(false);
  // };

  // const closeNotRestore = () => {
  //   setIsRecordNotSavedAccuick(false);
  // };

  // const closeMultipleRequest = () => {
  //   setMultipleRequest(false);
  // };

  const onclickHandleApply = (event: any) => {
    event.stopPropagation();
    const newSortByField = selectvalue || "Relevance";
    setSearchData((prevSearchData: any) => ({
      ...prevSearchData,
      sort_type: selectsortvalue === "Ascending" ? "asc" : "desc",
      sort_by: newSortByField,
    }));
    handleClose();
    handleSort(newSortByField);
  };

  // console.log("page", page);
  // console.log("totalrecords", totalRecords);
  // console.log("savedrecord", totalSavedRecords);
  const [addToTableListanchorEl, setAddToTableListAnchorEl] = useState<{
    [key: string]: HTMLElement | null;
  }>({});
  // const openAddToListenTableBtn = Boolean(addToTableListanchorEl);
  // const [tableListSeqanchorEl, setTableListSeqAnchorEl] =
  //   useState<null | HTMLElement>(null);
  const [tableListSeqanchorEl, setTableListSeqAnchorEl] = useState<{
    [key: string]: HTMLElement | null;
  }>({});
  // const openTableListSeqBtn = Boolean(tableListSeqanchorEl);
  // const [openTableSequenceModal, setOpenTableSequenceModal] = useState(false);
  // const [sequenceModalData, setSequenceModalData] = useState<any>([]);
  const [addTolistOptions, setAddTolistOptions] = useState<any>([]);
  const [seqOptions, setseqOptions] = useState<any>([]);

  const handleClickAddToListenTable = (
    event: React.MouseEvent<HTMLButtonElement>,
    personId: any
  ) => {
    // console.log('filterAddToListId', personId)
    const filterAddToListId = filterLocalData.filter(
      (item: any) => item.id === personId
    );
    //setAddToTableListAnchorEl(filterAddToListId ? event.currentTarget : null);
    setAddToTableListAnchorEl((prev: any) => ({
      ...prev,
      [personId]: filterAddToListId ? event.currentTarget : null,
    }));
    // setSelectedRowId(personId);
    apiService
      .getPoolList("")
      .then((response: any) => {
        console.log(response, "addtolistdata:", response.data.list);
        let poolData = searchData.displayData.filter(
          (data: any) => data.id === personId
        );
        if (!isContact()) {
          let poolArr = poolData[0].poolName?.split(",");
          console.log(poolArr, "sequenceArr", poolData);
          if (poolArr.length) {
            const finalSeq = response.data.list.filter(
              (elem: any) => !poolArr.find((pool: any) => elem.label === pool)
            );
            setAddTolistOptions(finalSeq);
          } else setAddTolistOptions(response.data.list);
        }
        else {
          setAddTolistOptions(response.data.list);
        }

      })
      .catch((error: any) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleAddToListenTableClose = async (
    _e: any,
    value: any,
    item: any,
    type: any
  ) => {
    console.log(value, "itemm", item)
    if ((value && value?.id) || value.listId) {
      let clientId: any = localStorage.getItem("clientId");
      let recrId = userLocalData.getvalue('recrId');
      let dataObj: any = fetchCheckedUserIds(checked, searchData.displayData);
      if (!isContact()) {

        let postData: any = {
          clientId: recrData.clientId,
          recrId: recrData.recrId,
          requestInfo: [],
          poolId: value.id
        }
        let checkedValues = checked.filter((item) => item === true)
        console.log(checked, 'checked')
        if (checkedValues.length > 0) {
          if (dataObj && dataObj.userIdsData.length > 0) {
            // if (dataObj.userIdsData.length === 1) {
            //   postData.requestInfo.push({
            //     isSaveWithEmail: true,
            //     isSaveWithPhoneNumber: true,
            //     userId: dataObj.userIdsData[0],            
            //     contId: dataObj.userIdsData[0],
            //   })
            // } else {
            postData.requestInfo.push({
              isSaveWithEmail: true,
              isSaveWithPhoneNumber: false,
              userIds: dataObj.userIdsData.join(),
              // contIds: dataObj.userIdsData.join(),
            })
            // }
            // dataObj.userIdsData.forEach((userIdVal: any) => {
            //   postData.requestInfo.push({
            //     userId: userIdVal,

            //   })
            // })
          }
          if (dataObj && dataObj.personIds.length > 0) {
            // dataObj.personIds.forEach((personIdVal: any) => {
            //   postData.requestInfo.push({

            //     personId: personIdVal
            //   })
            // })
            // if (dataObj.personIds.length === 1) {
            //   postData.requestInfo.push({
            //     isSaveWithEmail: true,
            //     isSaveWithPhoneNumber: true,
            //     personId: dataObj.personIds[0],
            //   })
            // } else {
            postData.requestInfo.push({
              isSaveWithEmail: true,
              isSaveWithPhoneNumber: false,
              personIds: dataObj.personIds.join(),
            })
            // }
          }
        }
        else {
          postData.requestInfo.push({
            isSaveWithEmail: true,
            isSaveWithPhoneNumber: false,
            userIds: item.userId,
            // contIds: dataObj.userIdsData.join(),
          })
        }


        if (clientId != 7) {
          try {
            let resp = await apiService.InsertPool(postData);
            // setAddToTableListAnchorEl(null);
            if (item?.id) {
              setAddToTableListAnchorEl((prev: any) => ({
                ...prev,
                [item.id]: null
              }));
            }

            handleClose();
            // if (value.label) {
            //   showPoolSuccess();
            // }
            // console.log("resp", resp);
            if (resp.data.Error) {
              showToaster(resp.data.Message, 'error');
            } else if (resp.data.Success && resp.data.Message === "Success") {
              showToaster("Pool has been assigned successfully", 'success');
              getTableData(type);
            }

          } catch (e) {
            // setAddToTableListAnchorEl(null);
            setAddToTableListAnchorEl((prev: any) => ({
              ...prev,
              [item.id]: null
            }));
            handleClose();
            // if (!value.label) {
            //   closePoolToast();
            // }
          }
        }
        else {
          let postData: any = {
            clientId,
            recrId,
            requestInfo: [],
            poolId: value.id
          }
          if (item) {
            if (item.userId) {
              postData.requestInfo.push({ userId: item.userId })
            }
            else {
              postData.requestInfo.push({ userId: 0 })
              postData.requestInfo.push({ personId: item.id })
            }
          }
          else {
            let dataObj: any = fetchCheckedUserIds(checked, searchData.displayData);
            if (dataObj && dataObj.userIdsData.length > 0) {
              dataObj.userIdsData.forEach((userIdVal: any) => {
                postData.requestInfo.push({
                  userId: userIdVal,

                })
              })
            }
            if (dataObj && dataObj.personIds.length > 0) {
              dataObj.personIds.forEach((personIdVal: any) => {
                postData.requestInfo.push({

                  personId: personIdVal
                })
              })
            }
          }

          try {
            let resp = await apiService.saveTalentPoolChromExt(postData);
            // setAddToTableListAnchorEl(null);
            setAddToTableListAnchorEl((prev: any) => ({
              ...prev,
              [item.id]: null
            }));

            handleClose();
            // if (value.label) {
            //   showPoolSuccess();
            // }
            // console.log("resp", resp);
            if (resp.data.Error) {
              showToaster(resp.data.Message, 'error');
            } else if (resp.data.Success) {
              showToaster("Pool has been assigned successfully", 'success');
              getTableData(type);
            }

          } catch (e) {
            // setAddToTableListAnchorEl(null);
            setAddToTableListAnchorEl((prev: any) => ({
              ...prev,
              [item.id]: null
            }));
            handleClose();
            // if (!value.label) {
            //   closePoolToast();
            // }
          }
        }
      }
      else {

        if (type != "bulkListSave") {
          let data = {
            listId: value.listId,
            listName: value.listName,
            "contIds": item.contId,
            recrId,
            clientId
          }
          try {
            let resp = await apiService.saveContactList(data)
            setAddToTableListAnchorEl((prev: any) => ({
              ...prev,
              [item.id]: null
            }));

            handleClose();
            // if (value.listName) {
            //   console.log("issssssssss ck")
            //   showPoolSuccess();
            // }
            console.log("resp", resp);
            if (resp.data.Error) {
              showToaster(resp.data.Message, 'error');
            } else if (resp.data.Success) {
              showToaster("List has been assigned successfully", 'success');
              getTableData(type);
            }
          }
          catch (e) {
            setAddToTableListAnchorEl((prev: any) => ({
              ...prev,
              [item.id]: null
            }));

          }
        }
        else {
          let postData = {
            "listId": value.listId,
            "listName": value.listName,
            "contIds": dataObj.userIdsData.join(),
            recrId,
            clientId,
            "personIds": dataObj.personIds.join(),
            "isSaveWithEmail": true,
            "isSaveWithPhoneNumber": false
          }

          try {
            let resp = await apiService.saveContactList(postData)


            handleClose();
            // if (value.listName) {
            //   console.log("issssssssss ck")
            //   showPoolSuccess();
            // }
            console.log("resp", resp);
            if (resp.data.Error) {
              showToaster(resp.data.Message, 'error');
            } else if (resp.data.Success) {
              showToaster("List has been assigned successfully", 'success');
              getTableData(type);
            }
          }
          catch (e) {
            handleClose()

          }
        }

      }

    } else {
      setAddToTableListAnchorEl((prev: any) => ({
        ...prev,
        [item.id]: null
      }));
    }


  };

  const handleClickAddToSeqListTable = (
    event: React.MouseEvent<HTMLButtonElement>,
    personId: any
  ) => {
    // console.log('filterAddToListId', personId)
    const filterAddToSeqListId = filterLocalData.filter(
      (item: any) => item.id === personId
    );

    // setTableListSeqAnchorEl(filterAddToSeqListId[0].id === personId ? event.currentTarget : null);
    setTableListSeqAnchorEl((prev: any) => ({
      ...prev,
      [personId]: filterAddToSeqListId ? event.currentTarget : null,
    }));
    // setSelectedRowId(personId);

    let sendListData: any = {
      clientId: localStorage.getItem("clientId"),
      sequenceName: "",
      recrId: userLocalData.getvalue('recrId')
    };
    apiService
      .searchSequence(sendListData)
      .then((response: any) => {
        // console.log('searchSequence:', response.data);
        let sequenceData = searchData.displayData.filter(
          (data: any) => data.id === personId
        );
        let sequenceArr = sequenceData[0].sequenceName?.split(",");
        // console.log(sequenceArr, 'sequenceArr', sequenceData)
        if (sequenceArr?.length) {
          const finalSeq = response.data.list.filter(
            (elem: any) =>
              !sequenceArr.find(
                (sequence: any) => elem.sequenceName === sequence
              )
          );
          setseqOptions(finalSeq);
        } else setseqOptions(response.data.list);
      })
      .catch((error: any) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleAddToSeqListTableClose = (
    _e: any,
    value: any,
    item: any,
    type: any
  ) => {
    let seqId = value.sequenceId;
    let clientId: any = localStorage.getItem("clientId");
    let userId = item.userId;
    console.log(userId, "userId", item);
    let recrId = userLocalData.getvalue('recrId');
    if (seqId) {
      if (clientId != 7) {
        apiService
          .SendSequenceList(seqId, userId, null)
          .then((response: any) => {
            console.log("saveSequence:", response.data);
            // setTableListSeqAnchorEl(null);
            setTableListSeqAnchorEl((prev: any) => ({
              ...prev,
              [item.id]: null,
            }));
            if (value.sequenceName) {
              showToaster("Campaign saved successfully", "success");
              // setShowSeqSuccess(true);
            }
            if (response.data.Error) {
              showToaster(response.data.Message, 'error');
            } else if (response.data.Message === "Success") {
              getTableData(type);
            }

          })
          .catch((error: any) => {
            console.error("Error fetching data:", error);
            // if (!value.sequenceName) {
            // setnotSaveSeqSuccess(true);

            setTableListSeqAnchorEl((prev: any) => ({
              ...prev,
              [item.id]: null,
            }));
          });
      }
      else {
        let postData: any = {
          clientId,
          recrId,
          requestInfo: [{
            userId: "",
            personId: ""
          }],
          sequenceId: seqId
        }

        if (item.userId) {
          postData.requestInfo[0].userId = item.userId
        }
        else {
          postData.requestInfo[0].userId = 0
          postData.requestInfo[0].personId = item.id
        }

        apiService
          .saveSequenceChromeExt(postData)
          .then((response: any) => {
            console.log("saveSequence:", response.data);
            // setTableListSeqAnchorEl(null);
            setTableListSeqAnchorEl((prev: any) => ({
              ...prev,
              [item.id]: null,
            }));
            if (value.sequenceName) {
              showToaster("Campaign saved successfully", "success");
              // setShowSeqSuccess(true);
            }
            if (response.data.Error) {
              showToaster(response.data.Message, 'error');
            } else if (response.data.Success) {
              getTableData(type);
            }

          })
          .catch((error: any) => {
            console.error("Error fetching data:", error);
            // if (!value.sequenceName) {
            // setnotSaveSeqSuccess(true);

            setTableListSeqAnchorEl((prev: any) => ({
              ...prev,
              [item.id]: null,
            }));
          });
      }
    } else {
      setTableListSeqAnchorEl((prev: any) => ({
        ...prev,
        [item.id]: null,
      }));
    }
  };

  // const handleClickOpenTableSequenceModal = (personId: any) => {
  //   const filterSequenceModalId = filterLocalData.filter((item: any) => item.id === personId)
  //   setOpenTableSequenceModal(filterSequenceModalId ? true : false);
  //   setSelectedRowId(personId);
  //   handleAddToSeqListTableClose()
  //   apiService.getMySequenceList(searchData.userId)
  //     .then((response: any) => {
  //       console.log('getSequenceList:', response.data);
  //       setSequenceModalData(response.data.Data)
  //     })
  //     .catch((error: any) => {
  //       console.error('Error fetching data:', error);
  //     });
  // };

  // const handleCloseTableSequenceModal = (): void => {
  //   setOpenTableSequenceModal(false);
  // };

  const [openSmsPopup, setOpenSmsPopup] = useState(false);

  // const handleClickOpenSmsPopup = (personId: any) => {
  //   const filterSmsModalId = filterLocalData.filter(
  //     (item: any) => item.id === personId
  //   );
  //   setOpenSmsPopup(filterSmsModalId ? true : false);
  //   setSelectedRowId(personId);
  //   setTableOpenCall(null);
  // };

  const handleCloseSmsPopup = (): void => {
    setOpenSmsPopup(false);
    handleTableClose();
  };

  // const [mySeqListData, setMySeqListData] = useState<any>([]);
  // const [allSeqListData, setAllSeqListData] = useState<any>([]);

  // const handleMySeqList = (data: any) => {
  //   //  console.log('handleMySeqList', data)
  //   // setSequenceModalData(data);
  //   setMySeqListData(data);
  // };

  // const handleAllSeqList = (data: any) => {
  //   // console.log('handleAllSeqList', data)
  //   setAllSeqListData(data);
  //   // setSequenceModalData(data);
  // };

  // const [parentRadioValue, setParentRadioValue] = useState("");

  // const handleSeqParentRadio = (data: any) => {
  //   // console.log('handleSeqParentRadio', data)
  //   setParentRadioValue(data);
  // };

  // const handleSeqData = () => {
  //   if (parentRadioValue === "My Sequences") {
  //     handleMySeqList(mySeqListData);
  //     console.log("my seq");
  //   } else {
  //     handleAllSeqList(allSeqListData);
  //     console.log("all seq");
  //   }
  // };

  // useEffect(() => {
  //   handleSeqData();
  // }, [mySeqListData, allSeqListData]);

  // const [showSeqToaster, setShowSeqSuccess] = useState(false);
  // const [notSaveSeqToaster, setnotSaveSeqSuccess] = useState(false);
  // const closeSeqToast = () => {
  //   setShowSeqSuccess(false);
  // };

  // const closeNotSaveSeqToast = () => {
  //   setnotSaveSeqSuccess(false);
  // };

  // const showSeqSuccess = (): void => {
  //   setShowSeqSuccess(true)
  // }

  const handlePoolChange = async (e: any) => {
    try {
      let poolResp = await apiService.getPoolList(e.target.value);

      if (poolResp?.data) {
        setAddTolistOptions(poolResp.data?.list ? poolResp.data?.list : []);
      }
    } catch (e) {
      console.log(e, "error");
    }
  };

  // const [showPoolToaster, setShowPoolSuccess] = useState(false);
  // const [poolMessage, setPoolMessage] = useState("");
  // const [showSequenceToaster, setShowSequenceSuccess] = useState(false);
  // const [campaignErrorMessage, setCampaignErrorMessage] = useState("");
  // const closePoolToast = () => {
  //   setShowPoolSuccess(false);
  // };

  // const showPoolSuccess = (): void => {
  //   setShowPoolSuccess(true);
  // };
  // const closeSequenceToast = () => {
  //   setShowSequenceSuccess(false);
  // };

  // const showSequenceSuccess = (): void => {
  //   setShowSequenceSuccess(true);
  // };
  // 12345

  // const closeApplyFiltrToast = () => {
  //   setSearchData((prevSearchData: any) => ({
  //     ...prevSearchData,
  //     applyFilterToaster: false,
  //   }));
  // };

  // let checkingTalentAndData = (): any => {
  //   if (checkedRowIds.length === 1) {
  //     let talentData = talentWithCommunityData.filter((item: any) =>
  //       checkedRowIds.includes(item.person_id)
  //     );
  //     let dataArray = searchData.displayData.filter((item: any) =>
  //       checkedRowIds.includes(item.id)
  //     );

  //     // Check if there is at least one matching data
  //     let hasMatch = talentData.some((talent) => {
  //       return dataArray.some((item: any) => item.id === talent.person_id);
  //     });

  //     return hasMatch;
  //   } else {
  //     return true;
  //   }
  // };

  const openContactMenu = Boolean(contactMenu)

  const handleOpenContact = (event: React.MouseEvent<HTMLButtonElement>, rowVal: any) => {
    setSelectedRowId(rowVal.id)
    setContactMenu(event.currentTarget)
    if (rowVal.linkedin_url) {
      let postObj = {
        "linkedinUrl": [
          rowVal?.linkedin_url
        ],
        clientId: recrData.clientId,
        recrId: recrData.recrId,
      }
      // setApiLoading(true);
      apiService.profilesSearch(postObj).then((response: any) => {
        // setApiLoading(false);
        console.log(response, 'fgtt', response.data.Success, response.data)
        if (response.data.Success) {
          let responseData = response.data.data[0]
          let tableData = [...searchData.displayData];

          tableData.forEach((data: any) => {
            if (data.id === rowVal.id) {

              data.recommended_personal_email = responseData && responseData.emails.length > 0 ? responseData.emails[0] : null;
              data.mobile_phone = responseData && responseData.phones.length > 0 ? responseData.phones[0] : null
              data.isShowEmail = responseData.isShowEmail;
              data.isShowPhone = responseData.isShowPhone;
              data.isPackageEmailValidity = responseData.isPackageEmailValidity;
              data.isPackagePhoneValidity = responseData.isPackagePhoneValidity;
              data.emailType = responseData.emailType;
              data.phoneType = responseData.phoneType;
            }
          });
          setSearchData((prevSearchData: any) => ({
            ...prevSearchData,
            displayData: tableData,
          }));


        }
        else {

          setSelectedRowId(rowVal.id)
          setContactMenu(event.currentTarget)
        }
      })
    }
    else {
      let tableData = [...searchData.displayData];

      tableData.forEach((data: any) => {
        if (data.id === rowVal.id) {

          data.recommended_personal_email = null;
          data.mobile_phone = null
          data.isShowEmail = false;
          data.isShowPhone = false;
          data.isPackageEmailValidity = "Empty";
          data.isPackagePhoneValidity = "Empty";
          data.emailType = 1;
          data.phoneType = 1;
        }
      });
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        displayData: tableData,
      }));
      setSelectedRowId(rowVal.id)
      setContactMenu(event.currentTarget)
    }

  }
  const [profileCredits, setProfileCredits] = useState(0);
  const [consumedCredits, setConsumedCredits] = useState(0)
  const [smsCredits, setSmsCredits] = useState(0)
  const [consumedSmsCredits, setConsumedSmsCredits] = useState(0)

  useEffect(() => {
    let creditsData = localStorage.getItem(`credits_${userLocalData.getvalue('recrId')}`)
    if (creditsData) {
      let parsedCreditsData = JSON.parse(creditsData)
      console.log(parsedCreditsData)
      setProfileCredits(parsedCreditsData?.totalProfileCredits)
      setConsumedCredits(parsedCreditsData?.consumedProfileCredits)
      if (userLocalData.getvalue(
        "paymentType"
      ) !== 1 || userLocalData.getvalue(
        "paymentType"
      ) !== 2) {
        setSmsCredits(parsedCreditsData?.totalSmsCredits)
        setConsumedSmsCredits(parsedCreditsData?.consumedSmsCredits)
      }

    }
  }, [])

  const handleCloseContactMenu = (type: string, row: any) => {

    let creditsData = localStorage.getItem(`credits_${userLocalData.getvalue('recrId')}`)
    let isFromMenu = type == "phoneFromMenu" || type == "emailFromMenu";
    if (!type && !row) {
      setContactMenu(null)
      return
    }
    if (!isFromMenu) {
      if (!row.userId) {
        let postObj = {
          "requestInfo": [
            {
              url: row.linkedin_url,
              type: 1,
              firstName: row.first_name,
              lastName: row.last_name,
              isSaveWithEmail: (type == "email" || type == "both") ? true : false,
              isSaveWithPhoneNumber: (type == "phone" || type == "both") ? true : false,
              emailType: null,
              phoneType: null,
              personId: null
            }
          ],
          "clientId": recrData.clientId,
          "recrId": recrData.recrId
        }

        if (type == "email") {
          postObj.requestInfo[0].emailType = row.emailType
        }
        else if (type == "phone") {
          postObj.requestInfo[0].phoneType = row.phoneType
        }
        else {
          postObj.requestInfo[0].emailType = row.emailType
          postObj.requestInfo[0].phoneType = row.phoneType
        }
        if (!row.linkedin_url) {
          postObj.requestInfo[0].personId = row.id;
          delete postObj.requestInfo[0].url;
        }

        let dataToPass: any = {
          recrId: parseInt(searchData.userId),
          companyId: searchData.companyId,
          personIds: [row.id],
          isSaveWithEmail: (type == "email" || type == "both") ? true : false,
          isSaveWithPhoneNumber: (type == "phone" || type == "both") ? true : false
        };
        // if (isChromeExtEnable) {
        //   dataToPass.recrIds = recrIds;
        // }
        // setApiLoading(true);
        console.log(dataToPass);
        apiService.saveLinkedinData(postObj).then((response: any) => {
          // setApiLoading(false);
          if (response.data.Success) {
            channelToBroadcast.postMessage({
              checkCreditScore: true
            });


            if (creditsData) {
              let parsedCreditsData = JSON.parse(creditsData)
              console.log(parsedCreditsData)
              setProfileCredits(parsedCreditsData?.totalProfileCredits)
              setConsumedCredits(parsedCreditsData?.consumedProfileCredits)
              if (userLocalData.getvalue(
                "paymentType"
              ) !== 1 || userLocalData.getvalue(
                "paymentType"
              ) !== 2) {
                setSmsCredits(parsedCreditsData?.totalSmsCredits)
                setConsumedSmsCredits(parsedCreditsData?.consumedSmsCredits)
              }

            }

            setIsRecordSavedAccuick(response.data.Success);
            if (response.data.Success) {
              showToaster("Record stored successfully", 'success');
            }

            if (response.data.Error) {
              showToaster("Record Not Saved", 'error');
            }

            setSavedReacords(null);
            setSavedReacords([...savedRecords, row.id]);
            const userID = isContact() ? response.data.contId : response.data.userId;
            let tempPidObj = { userId: userID, personId: row.id };
            // console.log('aaabbbb', response.data);
            setRecordsSavedData([...savedRecords, tempPidObj]);
            let tableData = [...searchData.displayData];
            tableData.forEach((data: any) => {
              if (data.id === row.id) {
                data.contId = response.data.contId;
                data.userId = userID;
                data.mobile_phone = response.data.phone;
                data.sequenceId = "";
                data.sequenceCount = 0;
                data.poolId = "";
                data.poolCount = 0;
                data.sequenceName = "";
                data.poolName = "";
                data.recommended_personal_email = response.data.email;
                data.email = response.data.email;
                data.isShowEmail = response.data.isShowEmail;
                data.isShowPhone = response.data.isShowPhone;
                data.isPackageEmailValidity = response.data.isPackageEmailValidity;
                data.isPackagePhoneValidity = response.data.isPackagePhoneValidity
              }
            });
            setSearchData((prevSearchData: any) => ({
              ...prevSearchData,
              displayData: tableData,
            }));
          } else {
            showToaster(response.data.Message ? response.data.Message : `An Error occured while saving ${isContact() ? 'Contact' : 'Candidate'}`, "error");
          }

          setContactMenu(null)
          // getTableData("useEffect")
        });
      }

      else {
        let postObj = {
          userId: row.userId,
          contId: row.userId,
          "isShowEmail": type == "email" ? true : false,
          "isShowPhone": type == "phone" ? true : false,
          emailType: 0,
          phoneType: 0,
          "clientId": recrData.clientId,
          "recrId": recrData.recrId
        }


        // if (isChromeExtEnable) {
        //   dataToPass.recrIds = recrIds;
        // }
        // setApiLoading(true);

        apiService.updateCredits(postObj).then((response: any) => {
          // setApiLoading(false);
          channelToBroadcast.postMessage({
            checkCreditScore: true
          });


          if (creditsData) {
            let parsedCreditsData = JSON.parse(creditsData)
            console.log(parsedCreditsData)
            setProfileCredits(parsedCreditsData?.totalProfileCredits)
            setConsumedCredits(parsedCreditsData?.consumedProfileCredits)
            if (userLocalData.getvalue(
              "paymentType"
            ) !== 1 || userLocalData.getvalue(
              "paymentType"
            ) !== 2) {
              setSmsCredits(parsedCreditsData?.totalSmsCredits)
              setConsumedSmsCredits(parsedCreditsData?.consumedSmsCredits)
            }

          }

          setIsRecordSavedAccuick(response.data.Success);
          if (response.data.Success) {
            showToaster("Record stored successfully", 'success');
          }

          if (response.data.Error) {
            showToaster("Record Not Saved", 'error');
          }

          setSavedReacords(null);
          setSavedReacords([...savedRecords, row.id]);
          const userID = isContact() ? response.data.contId : response.data.userId;
          let tempPidObj = { userId: userID, personId: row.id };
          // console.log('aaabbbb', response.data);
          setRecordsSavedData([...savedRecords, tempPidObj]);
          let tableData = [...searchData.displayData];
          tableData.forEach((data: any) => {
            if (data.id === row.id) {
              data.contId = response.data.contId;
              data.userId = userID;
              data.mobile_phone = response.data.phone;
              data.sequenceId = "";
              data.sequenceCount = 0;
              data.poolId = "";
              data.poolCount = 0;
              data.sequenceName = "";
              data.poolName = "";
              data.recommended_personal_email = response.data.email;
              data.isShowEmail = response.data.isShowEmail;
              data.isShowPhone = response.data.isShowPhone;
              data.isPackageEmailValidity = response.data.isPackageEmailValidity;
              data.isPackagePhoneValidity = response.data.isPackagePhoneValidity
            }
          });
          setSearchData((prevSearchData: any) => ({
            ...prevSearchData,
            displayData: tableData,
          }));

          setContactMenu(null)
          // getTableData("useEffect")
        });
      }


    }
    else {

      if (!row.userId) {
        let postObj = {
          "requestInfo": [
            {
              url: row.linkedin_url,
              type: 1,
              firstName: row.first_name,
              lastName: row.last_name,
              isSaveWithEmail: (type == "emailFromMenu") ? true : false,
              isSaveWithPhoneNumber: (type == "phoneFromMenu") ? true : false,
              emailType: row.emailType ? row.emailType : null,
              phoneType: row.phoneType ? row.phoneType : null
            }
          ],
          "clientId": recrData.clientId,
          "recrId": recrData.recrId
        }

        if ((type == "emailFromMenu") || type == "email") {
          postObj.requestInfo[0].emailType = row.emailType
        }
        else if ((type == "phoneFromMenu") || type == "phone") {
          postObj.requestInfo[0].phoneType = row.phoneType
        }

        let dataToPass: any = {
          recrId: parseInt(searchData.userId),
          companyId: searchData.companyId,
          personIds: [row.id],
          isSaveWithEmail: (type == "emailFromMenu") ? true : false,
          isSaveWithPhoneNumber: (type == "phoneFromMenu") ? true : false
        };
        // if (isChromeExtEnable) {
        //   dataToPass.recrIds = recrIds;
        // }
        // setApiLoading(true);
        console.log(dataToPass);
        apiService.saveLinkedinData(postObj).then((response: any) => {
          // setApiLoading(false);
          channelToBroadcast.postMessage({
            checkCreditScore: true
          });

          if (creditsData) {
            let parsedCreditsData = JSON.parse(creditsData)
            console.log(parsedCreditsData)
            setProfileCredits(parsedCreditsData?.totalProfileCredits)
            setConsumedCredits(parsedCreditsData?.consumedProfileCredits)
            if (userLocalData.getvalue(
              "paymentType"
            ) !== 1 || userLocalData.getvalue(
              "paymentType"
            ) !== 2) {
              setSmsCredits(parsedCreditsData?.totalSmsCredits)
              setConsumedSmsCredits(parsedCreditsData?.consumedSmsCredits)
            }

          }


          setIsRecordSavedAccuick(response.data.Success);
          if (response.data.Success) {
            showToaster("Record stored successfully", 'success');
          }

          if (response.data.Error) {
            showToaster("Record Not Saved", 'error');
          }

          setSavedReacords(null);
          setSavedReacords([...savedRecords, row.id]);

          const userID = isContact() ? response.data.contId : response.data.userId;
          let tempPidObj = { userId: userID, personId: row.id };
          // console.log('aaabbbb', response.data);
          setRecordsSavedData([...savedRecords, tempPidObj]);
          let tableData = [...searchData.displayData];
          tableData.forEach((data: any) => {
            if (data.id === row.id) {
              data.userId = userID;
              data.contId = response.data.contId;
              data.mobile_phone = response.data.phone;
              data.sequenceId = "";
              data.sequenceCount = 0;
              data.poolId = "";
              data.poolCount = 0;
              data.sequenceName = "";
              data.poolName = "";
              data.recommended_personal_email = response.data.email;
              data.isShowEmail = response.data.isShowEmail;
              data.isShowPhone = response.data.isShowPhone;
              data.isPackageEmailValidity = response.data.isPackageEmailValidity;
              data.isPackagePhoneValidity = response.data.isPackagePhoneValidity
            }
          });
          setSearchData((prevSearchData: any) => ({
            ...prevSearchData,
            displayData: tableData,
          }));

          setOpenSmsPopup(false);
          handleTableClose();
          // getTableData("useEffect")
        });
      }
      else {
        let postObj = {
          userId: row.userId,
          contId: row.userId,
          "isShowEmail": type == "emailFromMenu" ? true : false,
          "isShowPhone": type == "phoneFromMenu" ? true : false,
          emailType: 0,
          phoneType: 0,
          "clientId": recrData.clientId,
          "recrId": recrData.recrId
        }


        // if (isChromeExtEnable) {
        //   dataToPass.recrIds = recrIds;
        // }
        // setApiLoading(true);

        apiService.updateCredits(postObj).then((response: any) => {
          // setApiLoading(false);
          channelToBroadcast.postMessage({
            checkCreditScore: true
          });


          if (creditsData) {
            let parsedCreditsData = JSON.parse(creditsData)
            console.log(parsedCreditsData)
            setProfileCredits(parsedCreditsData?.totalProfileCredits)
            setConsumedCredits(parsedCreditsData?.consumedProfileCredits)
            if (userLocalData.getvalue(
              "paymentType"
            ) !== 1 || userLocalData.getvalue(
              "paymentType"
            ) !== 2) {
              setSmsCredits(parsedCreditsData?.totalSmsCredits)
              setConsumedSmsCredits(parsedCreditsData?.consumedSmsCredits)
            }

          }

          setIsRecordSavedAccuick(response.data.Success);
          if (response.data.Success) {
            showToaster("Record stored successfully", 'success');
          }

          if (response.data.Error) {
            showToaster("Record Not Saved", 'error');
          }

          setSavedReacords(null);
          setSavedReacords([...savedRecords, row.id]);
          const userID = isContact() ? response.data.contId : response.data.userId;
          let tempPidObj = { userId: userID, personId: row.id };
          // console.log('aaabbbb', response.data);
          setRecordsSavedData([...savedRecords, tempPidObj]);
          let tableData = [...searchData.displayData];
          tableData.forEach((data: any) => {
            if (data.id === row.id) {
              data.contId = response.data.contId;
              data.userId = userID;
              data.mobile_phone = response.data.phone;
              data.sequenceId = "";
              data.sequenceCount = 0;
              data.poolId = "";
              data.poolCount = 0;
              data.sequenceName = "";
              data.poolName = "";
              data.recommended_personal_email = response.data.email;
              data.isShowEmail = response.data.isShowEmail;
              data.isShowPhone = response.data.isShowPhone;
              data.isPackageEmailValidity = response.data.isPackageEmailValidity;
              data.isPackagePhoneValidity = response.data.isPackagePhoneValidity
            }
          });
          setSearchData((prevSearchData: any) => ({
            ...prevSearchData,
            displayData: tableData,
          }));

          setContactMenu(null)
          setOpenSmsPopup(false);
          // getTableData("useEffect")
        });
      }



    }


  }

  const goToUpgrade = () => {

    navigate("/" + userLocalData.getvalue('clientName') + "/upgrade");
  }

  function doMaskMobile() {
    let starValue = "*******" + "xxx";
    return starValue
  }

  function doMaskEmail(emailVal: string) {
    let starVal = "";
    // console.log(emailVal, 'emm')
    if (emailVal && typeof emailVal === "string") {
      // console.log(emailVal, 'emm 23', typeof (emailVal))
      if (emailVal.includes("@")) {
        let emailValue = emailVal.split("@");

        for (let i = 0; i <= 9; i++) {
          starVal = starVal + "*"
        }
        return starVal + emailValue[1]
      }
      else {
        for (let i = 0; i <= 9; i++) {
          starVal = starVal + "*"
        }
        return starVal + emailVal
      }
    }
    else {
      return starVal
    }

  }
  function getMobileTilte(row: any, type: string) {
    let mobileStr = "";

    if (row.mobile_phone && typeof row.mobile_phone == "string") {

      mobileStr = !row.isShowPhone ? doMaskMobile() : row.mobile_phone
    }
    else {
      mobileStr = type == "tooltip" ? "No Number" : "";
    }


    return mobileStr
  }

  function getEmailTitle(row: any) {
    let emailStr = "";

    if (row[isContact() ? "work_email" : "recommended_personal_email"]) {
      emailStr = row.isShowEmail ? row[isContact() ? "work_email" : "recommended_personal_email"] : doMaskEmail(row[isContact() ? "work_email" : "recommended_personal_email"])
    }


    return emailStr

  }

  const deletePool = (userId: any, poolId: any) => {
    trackPromise(
      ApiService.deleteById("admin", `deleteTalentPoolCommunity`, `${userId}/${poolId}/${userLocalData.getvalue("clientId")}`).then((res: any) => {
        if (res?.data?.Success) {
          showToaster(res?.data?.Message, "success");

          getTableData("")
        } else showToaster(res?.data?.Message, "error")
      })
    )
  }

  const deleteList = (userId: any, listId: any) => {
    trackPromise(
      ApiService.deleteById("admin", `deleteListContacts`, `${userId}/${listId}/${userLocalData.getvalue("clientId")}`).then((res: any) => {
        if (res?.data?.Success) {
          showToaster(res?.data?.Message, "success");
          getTableData("")
        } else showToaster(res?.data?.Message, "error")
      })
    )
  }

  const deleteSequence = (userId: any, sequenceId: any) => {
    trackPromise(
      ApiService.postWithData("admin", `sequenceDeleteUser`, {
        "sequenceId": sequenceId,
        "userIds": userId,
        "recrId": userLocalData.getvalue("recrId"),
        "clientId": userLocalData.getvalue("clientId")
      }).then((res: any) => {
        if (res?.data?.Message === "Success") {
          showToaster(res?.data?.Message, "success");
          getTableData("")
          handleClose();
        } else showToaster(res?.data?.Message, "error")
      })
    )
  }


  const deleteContactSequence = (userId: any, sequenceId: any) => {
    trackPromise(
      ApiService.postWithData("admin", `deleteSequenceAssignContact`, {
        "sequenceId": sequenceId,
        "contId": userId,
        "recrId": userLocalData.getvalue("recrId"),
        "clientId": userLocalData.getvalue("clientId")
      }).then((res: any) => {
        if (res?.data?.Success) {
          showToaster(res?.data?.Message, "success");
          getTableData("")
          handleClose();
        } else showToaster(res?.data?.Message, "error")
      })
    )
  }

  // https://qaadminapi.curately.ai/curatelyAdmin/sequenceDeleteUser

  return (
    <Stack
      className="right-section"
      id="people-section"
      sx={{ width: "72%", height: "100%", flexGrow: "1" }}
    >
      {/* Right Section Top */}
      <Stack
        component="div"
        direction="row"
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "solid 1px",
          borderBottomColor: styles.borderBottomColor,
          marginBottom: "0px",
          // paddingTop: "7px",
          fontFamily:
            'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
          paddingLeft: "9px",
        }}
      >
        <Stack direction="row" spacing={2}>
          <Stack
            sx={{
              color: styles.primaryTextColor,
              cursor: "pointer",
              paddingTop: "12.47px",
              paddingBottom: "14.1px",
            }}
            onClick={onClickHide}
          >
            {ishide ? (
              <BootstrapTooltip title="Show Filters" placement="top">
                <TuneIcon className="change-my-color" />
              </BootstrapTooltip>
            ) : (
              <BootstrapTooltip title="Hide Filters" placement="top">
                <TuneIcon className="change-my-color" />
              </BootstrapTooltip>
            )}
          </Stack>
          <Typography
            onClick={onClickTotal}
            sx={{
              paddingTop: "13.47px",
              paddingBottom: "15.1px",
              "&:hover": {
                color: styles.primaryTextColor,
                borderBottom: "1px solid",
                borderBottomColor: styles.primaryTextColor,
              },
              cursor: "pointer",
              fontFamily:
                'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
              fontWeight: "600",
              fontSize: "14px",
              borderBottom: isTotal ? "1px solid" : "",
              borderBottomColor: isTotal ? styles.primaryTextColor : "",
              color: isTotal ? styles.primaryTextColor : "#474747",
            }}
          >
            {`Total (${numberDisplay(totalRecords, 2)})`}
            {/* {searchData.displayData.length ? `Total (${numberDisplay(totalRecords, 2)})` : `Total (0)`} */}
            {/* {filterCheck ?`Total (${numberDisplay(totalRecords, 2)})`:`Total (0)`} */}
          </Typography>
          {/* <Typography
            onClick={onClickNetNew}
            sx={{
              paddingTop: "13.47px",
              paddingBottom: "15.1px",
              "&:hover": {
                color: styles.primaryTextColor,
                borderBottom: "1px solid",
                borderBottomColor: styles.primaryTextColor,
              },
              cursor: "pointer",
              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
              fontWeight: "600",
              fontSize: "14px",
              borderBottom: isNetNew ? "1px solid" : "",
              borderBottomColor: isNetNew ? styles.primaryTextColor : "",
              color: isNetNew ? styles.primaryTextColor : "#474747",
            }}
          >
            Net New (2.2M)
          </Typography> */}
          <Typography
            onClick={onClickSaved}
            sx={{
              paddingTop: "13.47px",
              paddingBottom: "15.1px",
              "&:hover": {
                color: styles.primaryTextColor,
                borderBottom: "1px solid",
                borderBottomColor: styles.primaryTextColor,
              },
              cursor: "pointer",
              fontFamily:
                'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
              fontWeight: "600",
              fontSize: "14px",
              borderBottom: isSaved ? "1px solid" : "",
              borderBottomColor: isSaved ? styles.primaryTextColor : "",
              color: isSaved ? styles.primaryTextColor : "#474747",
            }}
          >
            {`Saved (${numberDisplay(totalSavedRecords, 2)})`}
            {/* {searchData.displayData.length ? `Saved (${numberDisplay(totalSavedRecords, 2)})` : `Saved (0)`} */}
            {/* {filterCheck ? `Saved (${numberDisplay(totalSavedRecords, 2)})`:`Saved (0)`} */}
          </Typography>
        </Stack>


        <Stack
          direction="row"
          spacing={2}
          sx={{
            cursor: "pointer",
            paddingTop: "1.47px",
            paddingBottom: "10.1px",
            pr: "10px",
          }}
        // useFlexGap
        >
          {/* <BootstrapTooltip
            title='Show New Job Change'
            placement='top'
          >
            <Stack
              direction="row"
              spacing={0.5}
              // mt={-0.5}
              sx={{
                color: styles.primaryTextColor,
                // padding: "5px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                "&:hover": {
                  backgroundColor: "#F0F0F0",
                  borderRadius: "4px",
                },
              }}
            >
              <LockIcon sx={{ fontSize: "24px" }} />
              <Typography
                sx={{
                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                  fontWeight: "600",
                  fontSize: "14px",
                }}
                variant="body1"
              >
                50.2k New Job Changes
              </Typography>
            </Stack>
          </BootstrapTooltip> */}
          {/* <Button
            size="small"
            variant="outlined"
          >
            New Job Changes
          </Button> */}

          {/* <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              cursor: "pointer",
            }}
            mt={-0.5}
          >
            <BootstrapTooltip
              title='Export All in View'
              placement='top'
            >
              <Stack>
                <GetAppIcon
                  sx={{
                    color: "#D0D8E2", width: "20px", height: "20px",
                    '&:hover': {
                      color: '#146EF6'
                    }
                  }}
                />
              </Stack>
            </BootstrapTooltip>
            <Stack
            >
              <Typography
                component="h6"
                sx={{
                  color: "#E5E8ED",
                  width: "21px",
                  fontSize: "13px",
                  height: '21px',
                }}
              >
                |
              </Typography>
            </Stack>
          </Stack> */}

          {/* <BootstrapTooltip
            title='Import Contact'
            placement='top'
          >
            <Stack
              direction="row"
              spacing={0.5}
              mt={-0.5}
              sx={{
                color: styles.primaryTextColor,
                cursor: "pointer",
                padding: "5px",
                "&:hover": {
                  backgroundColor: "#F0F0F0",
                  borderRadius: "4px",
                },
              }}
            >
              <PersonAddAlt1Icon sx={{ fontSize: "24px", marginTop: "4px" }} />
              <Typography
                sx={{
                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                  fontWeight: "600",
                  fontSize: "14px",
                }}
                variant="body1"
              >
                Import
              </Typography>
            </Stack>
          </BootstrapTooltip> */}
          {isTableView && (
            <Button
              disableRipple
              id="table-layout"
              aria-controls={
                openTableLayoutMenu ? "table-layout-menu" : undefined
              }
              aria-haspopup="true"
              aria-expanded={openTableLayoutMenu ? "true" : undefined}
              onClick={onClickTableLayout}
            >
              <BootstrapTooltip title="Select Layout" placement="top">
                <Stack className="tableLayout-menu"
                  direction="row"
                  spacing={0.5}
                  mt={-0.5}
                  sx={{
                    color: styles.primaryTextColor,
                  }}
                >
                  {/* <VisibilityIcon sx={{ fontSize: "24px", marginTop: "4px" }} /> */}
                  <img style={{ marginTop: "3px" }} src={eyeIcon} alt="" />
                  <Typography className="contactText fs-14 fw-6 cursor-pointer tt-capital"
                    variant="body1"
                  >
                    Table Layout
                  </Typography>
                </Stack>
              </BootstrapTooltip>
            </Button>
          )}
          <Menu className="tableLayout-menulist"
            id="table-layout"
            anchorEl={isTableLayoutMenu}
            open={openTableLayoutMenu}
            onClose={handleTableLayoutMenu}
          >
            <Stack
              sx={{
                flexGrow: "1",
                height: "100%",
              }}
            >
              <Stack sx={{ margin: "15px", gap: "15px", maxHeight: "20%" }}>
                <TextField className="searchLayout-text mb-2"
                  placeholder="Search Layouts..."
                  size="small"
                  value={filterValue}
                  onChange={handleFilterLayouts}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon className="c-grey fs-20"
                        />
                      </InputAdornment>
                    ),
                    classes: {
                      root: "search-root",
                      focused: "search-focused",
                      notchedOutline: "search-notchedOutline",
                    },
                  }}
                />

                <Stack
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    cursor: "pointer",
                    marginBottom: "10px",
                  }}
                >
                  <Stack
                    onClick={onClickIsAll}
                    sx={{
                      border: "1px solid",
                      borderRadius: "4px 0px 0px 4px",
                      borderColor: isAll ? "transparent" : styles.borderColor2,
                      backgroundColor: isAll ? "#146EF6" : "#ffffff",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      flexGrow: "1",
                      height: "24.2px",
                    }}
                  >
                    <Typography className="contactText fs-12 fw-6"
                      sx={{
                        color: isAll ? "#ffffff" : styles.defaultTextColor,
                      }}
                    >
                      All
                    </Typography>
                  </Stack>
                  <Stack
                    onClick={onClickIsPrivate}
                    sx={{
                      border: "1px solid",
                      borderColor: isPrivate
                        ? "transparent"
                        : styles.borderColor2,
                      backgroundColor: isPrivate ? "#146EF6" : "#ffffff",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",

                      flexGrow: "1",
                      height: "24.2px",
                    }}
                  >
                    <Typography className="contactText fs-12 fw-6"
                      sx={{
                        color: isPrivate ? "#ffffff" : styles.defaultTextColor,
                      }}
                    >
                      Private
                    </Typography>
                  </Stack>
                  <Stack
                    onClick={onClickIsPublic}
                    sx={{
                      border: "1px solid",
                      borderRadius: "0px 4px 4px 0px",
                      borderColor: isPublic
                        ? "transparent"
                        : styles.borderColor2,
                      backgroundColor: isPublic ? "#146EF6" : "#ffffff",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",

                      flexGrow: "1",
                      height: "24.2px",
                    }}
                  >
                    <Typography className="contactText fs-12 fw-6"
                      sx={{
                        color: isPublic ? "#ffffff" : styles.defaultTextColor,
                      }}
                    >
                      Public
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>

              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  // flexGrow: "1",listLayoutData
                  // maxHeight: "50%",
                  maxHeight: "210px",
                  overflowY: "scroll",
                }}
              >
                <Stack>
                  {listLayoutLoading ? (
                    <Stack
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <CircularProgress className="c-lightblue" />
                    </Stack>
                  ) : listLayoutData.length ? (
                    listLayoutData
                      .filter((layout: any) => {
                        if (!filterValue) return true;
                        if (
                          layout.layoutName
                            .toLowerCase()
                            .includes(filterValue.toLowerCase())
                        ) {
                          return true;
                        }
                      })
                      .map((item: any) => {
                        return (
                          <Stack
                            key={item.layoutId}
                            onClick={(event) =>
                              onClickLayoutItem(event, item.layoutId)
                            }
                            sx={{
                              width: "100%",
                              padding: "5px 0px 5px 0px",
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              borderBottom: "1px solid",
                              cursor: "pointer",
                              borderBottomColor: styles.borderBottomColor,
                              "&:hover": {
                                backgroundColor: styles.backGroundColorOnHover,
                              },
                            }}
                          >
                            <Stack
                              sx={{
                                width: "100%",

                                marginLeft: "10px",
                                display: "flex",
                                flexDirection: "row",
                                gap: "10px",
                              }}
                            >
                              {item.isSelected ? (
                                <Stack sx={{ width: "8%" }}>
                                  <CheckCircleRoundedIcon
                                    sx={{
                                      fontSize: "14px",
                                      color: "#4089f8",
                                      marginTop: "5px",
                                      // display: "none",
                                    }}
                                  />
                                </Stack>
                              ) : (
                                <Stack sx={{ width: "8%" }}></Stack>
                              )}

                              <Stack sx={{ width: "92%" }}>
                                <Typography className="contactText fs-14 fw-6"
                                  sx={{
                                    color: styles.blackcolor,
                                  }}
                                >
                                  {item.layoutName}
                                </Typography>
                                {item.visibility ? (
                                  <Stack
                                    sx={{
                                      display: "flex",
                                      flexDirection: "row",
                                      gap: "5px",
                                    }}
                                  >
                                    <LanguageOutlinedIcon style={{ alignSelf: "center", color: " #737373" }} className="fs-16" />
                                    <Typography className="contactText fs-14 fw-4"
                                      sx={{
                                        color: styles.defaultTextColor,
                                      }}
                                    >
                                      Public
                                    </Typography>
                                  </Stack>
                                ) : (
                                  <Stack
                                    sx={{
                                      display: "flex",
                                      flexDirection: "row",
                                      gap: "5px",
                                    }}
                                  >
                                    <PersonOutlinedIcon style={{ alignSelf: "center", color: " #737373" }} className="fs-16"
                                    />
                                    <Typography className="contactText fs-14 fw-4"
                                      sx={{
                                        color: styles.defaultTextColor,
                                      }}
                                    >
                                      Private
                                    </Typography>
                                  </Stack>
                                )}
                              </Stack>
                            </Stack>
                            <Stack sx={{ marginRight: "15px" }}>
                              <Button
                                disableRipple
                                // id="more-icon-btn"
                                // aria-controls={
                                //   openMoreIconBtn ? "more-icon-btn-menu" : undefined
                                // }
                                // aria-haspopup="true"
                                // aria-expanded={openMoreIconBtn ? "true" : undefined}
                                onClick={(event) =>
                                  onClickTableLayoutMenuMoreOptions(
                                    event,
                                    item.layoutId
                                  )
                                }
                                sx={{
                                  // backgroundColor: "#ffffff",
                                  border: "1px solid ",
                                  borderColor: "#E6E6E6",
                                  borderRadius: "4px",
                                  minWidth: "30px",
                                  // borderColor:
                                  //   openMoreIconBtn === true
                                  //     ? "#146EF6 !important"
                                  //     : "#CACACC",
                                  "&:hover": {
                                    backgroundColor: "#ffffff",
                                    borderColor: "#146EF6",
                                  },
                                }}
                              >
                                <MoreHorizOutlinedIcon className="c-grey fs-18"
                                />
                              </Button>
                              <Menu
                                id="table-layout-menu-more-options"
                                anchorEl={isTableLayoutMenuMoreOptions}
                                open={
                                  openTableLayoutMenuMoreOptions &&
                                  isSelectedMoreOption === item.layoutId
                                }
                                onClose={handleTableLayoutMenuMoreOptions}
                                sx={{
                                  "& .MuiList-root.MuiMenu-list": {
                                    paddingTop: "0px",
                                    paddingBottom: "0px",
                                  },
                                }}
                              >
                                {item.layoutName !== "Default Layout" && (
                                  <MenuItem
                                    disableRipple
                                    sx={{
                                      padding: "0px",
                                    }}
                                  >
                                    <Stack
                                      onMouseOver={
                                        onMouseOverLayoutMenuMoreOptionsEdit
                                      }
                                      onMouseOut={
                                        onMouseOutLayoutMenuMoreOptionsEdit
                                      }
                                      onClick={(event) =>
                                        onClickLayoutMenuMoreOptionsEdit(
                                          event,
                                          item
                                        )
                                      }
                                      sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: "5px",
                                        padding: "6px 16px 6px 16px",

                                        width: "100%",
                                        backgroundColor:
                                          isOnMouseLayoutMenuMoreOptionsEdit
                                            ? "#146EF6"
                                            : "#ffffff",
                                      }}
                                    >
                                      <EditOutlinedIcon className="fs-18"
                                        sx={{
                                          color:
                                            isOnMouseLayoutMenuMoreOptionsEdit
                                              ? "#ffffff"
                                              : "#1A1A1A",
                                        }}
                                      />
                                      <Typography className="contactText fs-14 fw-6"
                                        sx={{
                                          color:
                                            isOnMouseLayoutMenuMoreOptionsEdit
                                              ? "#ffffff"
                                              : "#1A1A1A",
                                        }}
                                      >
                                        Edit
                                      </Typography>
                                    </Stack>
                                  </MenuItem>
                                )}

                                <MenuItem
                                  disableRipple
                                  sx={{
                                    padding: "0px",
                                  }}
                                >
                                  <Stack
                                    onMouseOver={
                                      onMouseOverLayoutMenuMoreOptionsDuplicate
                                    }
                                    onMouseOut={
                                      onMouseOutLayoutMenuMoreOptionsDuplicate
                                    }
                                    onClick={(event) =>
                                      onClickLayoutMenuMoreOptionsDuplicate(
                                        event,
                                        item
                                      )
                                    }
                                    sx={{
                                      display: "flex",
                                      flexDirection: "row",
                                      gap: "5px",
                                      padding: "6px 16px 6px 16px",

                                      width: "100%",
                                      backgroundColor:
                                        isOnMouseLayoutMenuMoreOptionsDuplicate
                                          ? "#146EF6"
                                          : "#ffffff",
                                    }}
                                  >
                                    <FileCopyOutlinedIcon className="fs-18"
                                      sx={{
                                        color:
                                          isOnMouseLayoutMenuMoreOptionsDuplicate
                                            ? "#ffffff"
                                            : "#1A1A1A",
                                      }}
                                    />
                                    <Typography className="contactText fs-14 fw-6"
                                      sx={{
                                        color:
                                          isOnMouseLayoutMenuMoreOptionsDuplicate
                                            ? "#ffffff"
                                            : "#1A1A1A",
                                      }}
                                    >
                                      Duplicate
                                    </Typography>
                                  </Stack>
                                </MenuItem>
                                {item.layoutName !== "Default Layout" && (
                                  <MenuItem
                                    disableRipple
                                    sx={{
                                      padding: "0px",
                                    }}
                                  >
                                    <Stack
                                      onMouseOver={
                                        onMouseOverLayoutMenuMoreOptionsRemove
                                      }
                                      onMouseOut={
                                        onMouseOutLayoutMenuMoreOptionsRemove
                                      }
                                      onClick={(event) =>
                                        onClickLayoutMenuMoreOptionsRemove(
                                          event,
                                          item.layoutId
                                        )
                                      }
                                      sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: "5px",

                                        padding: "6px 16px 6px 16px",

                                        width: "100%",
                                        backgroundColor:
                                          isOnMouseLayoutMenuMoreOptionsRemove
                                            ? "#146EF6"
                                            : "#ffffff",
                                      }}
                                    >
                                      <DeleteOutlinedIcon className="fs-18"
                                        sx={{
                                          color:
                                            isOnMouseLayoutMenuMoreOptionsRemove
                                              ? "#ffffff"
                                              : "#f75252",
                                        }}
                                      />
                                      <Typography className="contactText fs-14 fw-6"
                                        sx={{
                                          color:
                                            isOnMouseLayoutMenuMoreOptionsRemove
                                              ? "#ffffff"
                                              : "#f75252",
                                        }}
                                      >
                                        Remove
                                      </Typography>
                                    </Stack>
                                  </MenuItem>
                                )}
                              </Menu>
                            </Stack>
                          </Stack>
                        );
                      })
                  ) : (
                    <Typography sx={{ textAlign: "center" }}>
                      No data found
                    </Typography>
                  )}

                  {/* <Stack
                    sx={{
                      width: "100%",
                      padding: "5px 0px 5px 0px",

                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      borderBottom: "1px solid",
                      borderBottomColor: styles.borderBottomColor,
                      "&:hover": {
                        backgroundColor: styles.backGroundColorOnHover,
                      },
                    }}
                  >
                    <Stack
                      sx={{
                        width: "100%",

                        marginLeft: "10px",
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                      }}
                    >
                      <Stack sx={{ width: "8%" }}>
                        <CheckCircleRoundedIcon
                          sx={{
                            fontSize: "14px",
                            color: "#4089f8",
                            marginTop: "5px",
                          }}
                        />
                      </Stack>
                      <Stack sx={{ width: "92%" }}>
                        <Typography
                          sx={{
                            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            fontSize: "14px",
                            fontWeight: "600",
                            color: styles.blackcolor,
                          }}
                        >
                          Default Layout
                        </Typography>
                        <Stack
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "5px",
                          }}
                        >
                          <LanguageOutlinedIcon
                            sx={{
                              fontSize: "16px",
                              color: "#737373",
                              alignSelf: "center",
                            }}
                          />
                          <Typography
                            sx={{
                              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              fontSize: "14px",
                              fontWeight: "400",
                              color: styles.defaultTextColor,
                            }}
                          >
                            Public
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                    <Stack sx={{ marginRight: "15px" }}>
                      <Button
                        disableRipple
                        id="more-icon-btn"
                        aria-controls={
                          openMoreIconBtn ? "more-icon-btn-menu" : undefined
                        }
                        aria-haspopup="true"
                        aria-expanded={openMoreIconBtn ? "true" : undefined}
                        // onClick={handleMoreIconBtn}
                        sx={{
                          // backgroundColor: "#ffffff",
                          border: "1px solid ",
                          borderColor: "#E6E6E6",
                          borderRadius: "4px",
                          minWidth: "30px",
                          // borderColor:
                          //   openMoreIconBtn === true
                          //     ? "#146EF6 !important"
                          //     : "#CACACC",
                          "&:hover": {
                            backgroundColor: "#ffffff",
                            borderColor: "#146EF6",
                          },
                        }}
                      >
                        <MoreHorizOutlinedIcon
                          sx={{
                            color:
                              openMoreIconBtn === true
                                ? "#146EF6"
                                : checkedCount > 0
                                  ? "#737373"
                                  : "#919191",
                            fontSize: "18px",
                          }}
                        />
                      </Button>
                    </Stack>
                  </Stack> */}
                </Stack>
              </Stack>

              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  maxHeight: "10%",
                  marginTop: "7px",
                }}
              >
                <Button disableRipple onClick={() => onClickNewLayout()}>
                  <Stack
                    direction="row"
                    spacing={0.5}
                    mt={-0.5}
                    sx={{
                      color: styles.primaryTextColor,
                      // padding: "5px",
                      cursor: "pointer",
                      "&:hover": {
                        // backgroundColor: "#F0F0F0",
                        borderRadius: "4px",
                      },
                    }}
                  >
                    <AddOutlinedIcon className="fs-24"
                      sx={{
                        color: styles.primaryTextColor,
                      }}
                    />
                    <Typography className="contactText fw-6 fs-14 cursor-pointer tt-capital"
                      variant="body1"
                    >
                      New Layout
                    </Typography>
                  </Stack>
                </Button>
                <Modal open={isNextLayout} onClose={handleCloseNextLayout}>
                  <Stack
                    direction="column"
                    sx={{
                      width: "1200px",
                      height: "500px",
                      position: "absolute" as "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      bgcolor: "background.paper",
                      boxShadow: 24,
                      borderRadius: "3px",
                    }}
                  >
                    {/* <Stack sx={{ height: "100%" }}> */}

                    <form
                      style={{ height: "100%" }}
                      onSubmit={formik.handleSubmit}
                    >
                      {/* table layout top */}

                      <Stack
                        sx={{
                          width: "97%",
                          padding: "20px 20px 0px 20px",
                          height: "84%",
                        }}
                      >
                        <Stack
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            height: "10%",
                          }}
                        >
                          <Typography className="contactText fw-6 fs-18"
                            sx={{
                              color: styles.blackcolor,
                            }}
                          >
                            {layoutHeaderName}
                          </Typography>

                          <CloseOutlinedIcon
                            onClick={handleCloseNextLayout}
                            sx={{
                              color: "#737373",
                              fontSize: "20px",
                              cursor: "pointer",
                              "&:hover": {
                                backgroundColor: styles.backGroundColorOnHover,
                                borderRadius: "4px",
                              },
                            }}
                          />
                        </Stack>
                        <Stack
                          sx={{
                            // paddingTop: "20px",
                            paddingLeft: "10px",
                            display: "flex",
                            flexDirection: "column",
                            height: "90%",
                          }}
                        >
                          <Stack
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              gap: "30px",
                              height: "10%",
                              // flexGrow: "1",
                            }}
                          >
                            <Stack className="contactText fs-14 fw-6 cursor-pointer"
                              onClick={onClickLayoutColumn}
                              spacing={1}
                              direction="row"
                              sx={{
                                paddingBottom: "12px",
                                color: isLayoutColumn
                                  ? styles.primaryTextColor
                                  : styles.defaultTextColor,
                                borderBottom: isLayoutColumn
                                  ? "1px solid"
                                  : "none",
                                "&:hover": {
                                  color: styles.primaryTextColor,
                                  borderBottom: "1px solid",
                                },
                              }}
                            >
                              <ViewCompactOutlinedIcon className="alignself-center fs-18 mt-1" />
                              <Typography className="contactText fs-16 fw-6">
                                Layout Columns
                              </Typography>
                            </Stack>

                            <Stack className="contactText fs-14 fw-6 cursor-pointer"
                              onClick={onClickSetting}
                              spacing={1}
                              direction="row"
                              sx={{
                                paddingBottom: "12px",
                                color: isSetting
                                  ? styles.primaryTextColor
                                  : styles.defaultTextColor,
                                borderBottom: isSetting ? "1px solid" : "none",
                                "&:hover": {
                                  color: styles.primaryTextColor,
                                  borderBottom: "1px solid",
                                },
                              }}
                            >
                              <SettingsOutlinedIcon className="fs-18 alignself-center mt-1" />
                              <Typography className="contactText fw-6 fs-16"
                              >
                                Settings
                              </Typography>
                            </Stack>
                          </Stack>

                          {isLayoutColumn && (
                            <Stack
                              sx={{
                                display: "flex",
                                flexDirection: "row",

                                height: "90%",
                                width: "100%",
                              }}
                            >
                              <Stack
                                sx={{
                                  width: "36%",
                                  paddingRight: "2%",
                                  overflowY: "scroll",
                                  paddingTop: "20px",
                                  paddingBottom: "20px",
                                }}
                              >
                                <Stack
                                  sx={{
                                    gap: "20px",
                                  }}
                                >
                                  <TextField className="layoutColumnName"
                                    placeholder="Search Columns..."
                                    size="small"
                                    // value={filterValue}
                                    // onChange={handleFilterChange}
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          <SearchIcon className="c-Grey fs-20" />
                                        </InputAdornment>
                                      ),
                                      classes: {
                                        root: "search-root",
                                        focused: "search-focused",
                                        notchedOutline: "search-notchedOutline",
                                      },
                                    }}
                                  />
                                  <ReactSortable
                                    list={headerItems}
                                    setList={handleSortHeaderList}
                                    handle=".drag-handle"
                                  >
                                    {headerItems.map((item: any) => (
                                      <BootstrapTooltip
                                        key={item.key}
                                        title={
                                          defaultHeaderItems.includes(item.key)
                                            ? "Disabled"
                                            : ""
                                        }
                                        placement="top"
                                      >
                                        <Stack
                                          onClick={() =>
                                            onClickHeaderItem(item.key)
                                          }
                                          sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            // justifyContent: "space-between",
                                            border: "1px solid",
                                            borderColor: "#cacacc",
                                            marginBottom: "10px",
                                            cursor: defaultHeaderItems.includes(
                                              item.key
                                            )
                                              ? "not-allowed"
                                              : "pointer",
                                          }}
                                        >
                                          {/* <FormControlLabel
                                          sx={{
                                            flexGrow: "1",
                                            cursor: defaultHeaderItems.includes(
                                              item.key
                                            )
                                              ? "not-allowed"
                                              : "pointer",
                                          }} */}
                                          <BpCheckboxContainer>
                                            <Checkbox
                                              id="layout-check"
                                              sx={{
                                                cursor:
                                                  defaultHeaderItems.includes(
                                                    item.key
                                                  )
                                                    ? "not-allowed "
                                                    : "pointer",
                                              }}
                                              disableRipple
                                              checked={true}
                                              // checked={
                                              //   checkBoxChecked.includes(
                                              //     item.personaId
                                              //   )
                                              //     ? true
                                              //     : false
                                              // }
                                              // onChange={(event: any) =>
                                              //   handleChildCheckboxChange(

                                              //   )
                                              // }

                                              icon={
                                                <BpIcon className="bp-icon" />
                                              }
                                              checkedIcon={
                                                <BpCheckedIcon
                                                  // className="bp-icon"
                                                  style={{
                                                    borderColor:
                                                      defaultHeaderItems.includes(
                                                        item.key
                                                      )
                                                        ? "#e3e3e5"
                                                        : styles.primaryTextColor,
                                                    backgroundColor:
                                                      defaultHeaderItems.includes(
                                                        item.key
                                                      )
                                                        ? "#e3e3e5"
                                                        : styles.primaryTextColor,
                                                  }}
                                                />
                                              }
                                              className="bp-checkbox"
                                            />
                                          </BpCheckboxContainer>

                                          <Stack
                                            sx={{
                                              display: "flex",
                                              flexDirection: "row",
                                              alignItems: "center",
                                              justifyContent: "space-between",
                                              flexGrow: "1",
                                            }}
                                          // onClick={() =>
                                          //   onClickHeaderItem(item.key)
                                          // }
                                          >
                                            <Box
                                              component="label"
                                              htmlFor="layout-check"
                                              sx={{
                                                cursor:
                                                  defaultHeaderItems.includes(
                                                    item.key
                                                  )
                                                    ? "not-allowed "
                                                    : "pointer",
                                              }}
                                            >
                                              <Typography
                                                sx={{
                                                  color:
                                                    defaultHeaderItems.includes(
                                                      item.key
                                                    )
                                                      ? "#919191"
                                                      : styles.blackcolor,
                                                  fontSize: "14px",
                                                  fontWeight: "600",
                                                  fontFamily:
                                                    'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                                  textAlign: "left",
                                                }}
                                              >
                                                {item.name}
                                              </Typography>
                                            </Box>
                                            {/* /> */}

                                            <Box
                                              component="div"
                                              id={`${item.key}`}
                                              className="drag-handle"
                                              sx={{
                                                alignSelf: "center",

                                                cursor: "grab",
                                                "&:active": {
                                                  cursor: "grab",
                                                },
                                                "&:hover svg": {
                                                  color: "#146ef6",
                                                },
                                              }}
                                            >
                                              <DragHandleRoundedIcon className="c-grey fs-20 mr-5" />
                                            </Box>
                                          </Stack>
                                        </Stack>
                                      </BootstrapTooltip>
                                    ))}
                                  </ReactSortable>

                                  <Stack
                                    sx={{
                                      display: "flex",
                                      flexDirection: "column",
                                      gap: "5px",
                                    }}
                                  >
                                    <Stack
                                      onClick={onClickContactLayoutModal}
                                      sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        padding: "5px",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <Stack
                                        sx={{
                                          display: "flex",
                                          flexDirection: "row",
                                          gap: "8px",
                                        }}
                                      >
                                        <PeopleAltIcon sx={{ color: '#737373', fontSize: "20" }} />
                                        <Typography className="contactText fw-6 fs-14"
                                          sx={{
                                            color: styles.blackcolor,
                                          }}
                                        >
                                          Contact
                                        </Typography>
                                        <Typography
                                          sx={{
                                            fontFamily:
                                              'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                            fontWeight: "500",
                                            fontSize: "14px",
                                            color: styles.blackcolor,
                                          }}
                                        >
                                          {contactItems.length}
                                        </Typography>
                                      </Stack>
                                      {isContactLayoutModal ? (
                                        <ExpandMoreIcon className="c-grey fs-20" />
                                      ) : (
                                        <ChevronRightIcon className="c-grey fs-20" />
                                      )}
                                    </Stack>
                                    {isContactLayoutModal &&
                                      contactItems.map((item: any) => (
                                        <Stack
                                          onClick={() =>
                                            onClickContactItem(item.key)
                                          }
                                          key={item.key}
                                          sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            border: "1px solid",
                                            borderColor: "#cacacc",
                                            marginBottom: "10px",
                                          }}
                                        >
                                          <FormControlLabel
                                            sx={{ flexGrow: "1" }}
                                            // key={item}
                                            control={
                                              <BpCheckboxContainer>
                                                <Checkbox
                                                  sx={{ ml: 2 }}
                                                  disableRipple
                                                  checked={false}
                                                  // onChange={(event: any) =>
                                                  //   handleChildCheckboxChange(

                                                  //   )
                                                  // }
                                                  icon={
                                                    <BpIcon className="bp-icon" />
                                                  }
                                                  checkedIcon={
                                                    <BpCheckedIcon
                                                      // className="bp-icon"
                                                      style={{
                                                        borderColor:
                                                          styles.primaryTextColor,
                                                      }}
                                                    />
                                                  }
                                                  className="bp-checkbox"
                                                />
                                              </BpCheckboxContainer>
                                            }
                                            label={
                                              <Typography
                                                sx={{
                                                  color: styles.blackcolor,
                                                  fontSize: "14px",
                                                  fontWeight: "600",
                                                  fontFamily:
                                                    'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                                  textAlign: "left",
                                                }}
                                              >
                                                {item.name}
                                              </Typography>
                                            }
                                          />
                                        </Stack>
                                      ))}

                                    <Stack
                                      onClick={onClickAccountLayoutModal}
                                      sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        padding: "5px",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <Stack
                                        sx={{
                                          display: "flex",
                                          flexDirection: "row",
                                          gap: "8px",
                                        }}
                                      >
                                        <BusinessIcon sx={{ color: '#737373', fontSize: "20" }} />
                                        <Typography className="contactText fw-6 fs-14"
                                          sx={{
                                            color: styles.blackcolor,
                                          }}
                                        >
                                          Account
                                        </Typography>
                                        <Typography
                                          sx={{
                                            fontFamily:
                                              'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                            fontWeight: "600",
                                            fontSize: "14px",
                                            color: styles.blackcolor,
                                          }}
                                        >
                                          {accountItems.length}
                                        </Typography>
                                      </Stack>
                                      {isAccountLayoutModal ? (
                                        <ExpandMoreIcon className="c-grey fs-20" />
                                      ) : (
                                        <ChevronRightIcon className="c-grey fs-20" />
                                      )}
                                    </Stack>
                                    {isAccountLayoutModal &&
                                      accountItems.map((item: any) => (
                                        <Stack
                                          onClick={() =>
                                            onClickAccountItem(item.key)
                                          }
                                          key={item.key}
                                          sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            border: "1px solid",
                                            borderColor: "#cacacc",
                                            marginBottom: "10px",
                                          }}
                                        >
                                          <FormControlLabel
                                            sx={{ flexGrow: "1" }}
                                            // key={item}
                                            control={
                                              <BpCheckboxContainer>
                                                <Checkbox
                                                  sx={{ ml: 2 }}
                                                  disableRipple
                                                  checked={false}
                                                  // onChange={(event: any) =>
                                                  //   handleChildCheckboxChange(

                                                  //   )
                                                  // }
                                                  icon={
                                                    <BpIcon className="bp-icon" />
                                                  }
                                                  checkedIcon={
                                                    <BpCheckedIcon
                                                      // className="bp-icon"
                                                      style={{
                                                        borderColor:
                                                          styles.primaryTextColor,
                                                      }}
                                                    />
                                                  }
                                                  className="bp-checkbox"
                                                />
                                              </BpCheckboxContainer>
                                            }
                                            label={
                                              <Typography className="contactText fw-6 fs-14"
                                                sx={{
                                                  color: styles.blackcolor,
                                                  textAlign: "left",
                                                }}
                                              >
                                                {item.name}
                                              </Typography>
                                            }
                                          />
                                        </Stack>
                                      ))}
                                  </Stack>
                                </Stack>
                              </Stack>
                              <Stack
                                sx={{
                                  width: "64%",
                                  // overflowY: "scroll",
                                  overflowX: "hidden",
                                  border: "1px solid rgb(192 192 192)",
                                  borderRadius: "5px",
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                {searchData.displayData.length > 0 ? (
                                  <TableContainer
                                    component={Paper}
                                    sx={{
                                      // overflow: "auto",
                                      flexGrow: "1",
                                      // border: "1px red solid",
                                      borderBottomLeftRadius: 0,
                                      borderBottomRightRadius: 0,
                                      borderBottomColor: "rgb(192 192 192)",

                                      boxShadow: 0,
                                      pb: "2px",
                                      pr: "0px",
                                    }}
                                    className="table-container"
                                  >
                                    <Table
                                      sx={{
                                        minWidth: 650,
                                        maxHeight: 400,
                                      }}
                                      stickyHeader
                                      aria-label="sticky table"
                                    >
                                      <TableHead>
                                        <TableRow>
                                          {/* {tableHeadersList.map((tableHeadersitem: any) => (
                    <TableCellItem person={{ cellName: tableHeadersitem }} />
                  ))} */}
                                          <>
                                            {headerItems.map(
                                              (header: any, index: any) => (
                                                <TableCell
                                                  key={index}
                                                  sx={{
                                                    lineHeight: "20px",
                                                    padding: "5px 10px",
                                                    fontWeight: "400",
                                                    fontSize: "12px",
                                                    borderBottomColor:
                                                      "rgb(192 192 192)",
                                                    minWidth: "200px",
                                                    // position: header.value === "Name" ? "sticky" : "inherit",
                                                    // position:  "sticky",
                                                    position:
                                                      index === 0
                                                        ? "sticky"
                                                        : "",

                                                    // left:
                                                    //   header.value === "Name"
                                                    //     ? 0
                                                    //     : "auto",
                                                    // zIndex:
                                                    //   header.value === "Name" ? 5 : 2,
                                                    left:
                                                      index === 0 ? 0 : "auto",
                                                    zIndex: index === 0 ? 5 : 2,
                                                    backgroundColor: "#ffffff",
                                                    // background:
                                                    //   header.value === "Name" ? "#ffffff" : "#ffffff",
                                                  }}
                                                // key={header.value}
                                                >
                                                  <Stack
                                                    sx={{
                                                      display: "flex",
                                                      flexDirection: "row",
                                                      alignItems: "center",
                                                      height: "17px",
                                                      fontFamily:
                                                        'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                                    }}
                                                  >
                                                    {header.name}
                                                  </Stack>
                                                </TableCell>
                                              )
                                            )}
                                          </>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        {loading ? (
                                          <TableRow>
                                            <TableCell
                                              colSpan={7}
                                              sx={{
                                                color: "#919191",
                                                border: "none",
                                              }}
                                              align="center"
                                            >
                                              <Box>
                                                <CircularProgress className="c-lightblue" />
                                              </Box>
                                            </TableCell>
                                          </TableRow>
                                        ) : (
                                          <>
                                            {searchData.displayData.length >
                                              0 ? (
                                              searchData.displayData.map(
                                                (row: any, index: any) => (
                                                  <TableRow
                                                    key={index}
                                                    sx={{
                                                      textTransform:
                                                        "capitalize",
                                                      backgroundColor:
                                                        "#ffffff",
                                                      // "&:hover": {
                                                      //   backgroundColor: "#F7F7F7",
                                                      // },
                                                    }}
                                                  >
                                                    <>
                                                      {headerItems.length > 0 &&
                                                        headerItems.map(
                                                          (
                                                            item: any,
                                                            index: any
                                                          ) => (
                                                            <>
                                                              {item.name ===
                                                                "Name" && (
                                                                  <>
                                                                    <TableCell
                                                                      // component="th"
                                                                      // scope="row"
                                                                      key={index}
                                                                      sx={{
                                                                        // paddingRight: '5px',
                                                                        boxShadow:
                                                                          index ===
                                                                            0
                                                                            ? "2px 0px 4px 0px rgba(0, 0, 0, 0.1)"
                                                                            : "",
                                                                        position:
                                                                          index ===
                                                                            0
                                                                            ? "sticky"
                                                                            : "",
                                                                        borderBottomColor:
                                                                          "rgb(192 192 192)",
                                                                        zIndex:
                                                                          index ===
                                                                            0
                                                                            ? 1
                                                                            : "",
                                                                        left: 0,
                                                                        backgroundColor:
                                                                          index ===
                                                                            0
                                                                            ? "inherit"
                                                                            : "",
                                                                        p: 0,
                                                                      }}
                                                                    >
                                                                      <Stack
                                                                        sx={{
                                                                          // p: "10px",
                                                                          display:
                                                                            "flex",
                                                                          flexDirection:
                                                                            "row",
                                                                          alignItems:
                                                                            "center",
                                                                          ml: 1,
                                                                        }}
                                                                        direction="row"
                                                                        spacing={
                                                                          1
                                                                        }
                                                                      >
                                                                        {index ===
                                                                          0 && (
                                                                            <Stack>
                                                                              <BpCheckboxContainer>
                                                                                <Checkbox
                                                                                  disabled
                                                                                  className="bp-checkbox"
                                                                                  disableRipple
                                                                                  checkedIcon={
                                                                                    <BpCheckedIcon
                                                                                    // className="bp-icon"
                                                                                    />
                                                                                  }
                                                                                  icon={
                                                                                    <BpIcon className="bp-icon" />
                                                                                  }
                                                                                  checked={
                                                                                    false
                                                                                  }
                                                                                />
                                                                              </BpCheckboxContainer>
                                                                            </Stack>
                                                                          )}

                                                                        {/* Name column */}
                                                                        <Stack
                                                                          direction="column"
                                                                          spacing={
                                                                            1
                                                                          }
                                                                        >
                                                                          <Box>
                                                                            <Stack
                                                                              style={{
                                                                                color:
                                                                                  styles.primaryTextColor,
                                                                                fontSize:
                                                                                  "14px",
                                                                                fontWeight:
                                                                                  "600",
                                                                                fontFamily:
                                                                                  "Segoe UI",
                                                                                textDecoration:
                                                                                  "none",
                                                                                cursor:
                                                                                  "default",
                                                                              }}
                                                                            >
                                                                              {
                                                                                row.full_name
                                                                              }
                                                                            </Stack>
                                                                          </Box>
                                                                          <Box>
                                                                            <LinkedInIcon sx={{ color: '#919191', fontSize: "20" }} />
                                                                          </Box>
                                                                        </Stack>
                                                                      </Stack>
                                                                    </TableCell>
                                                                  </>
                                                                )}
                                                              {item.name ===
                                                                "Title" && (
                                                                  <TableCell
                                                                    key={index}
                                                                    sx={{
                                                                      // paddingRight: '5px',
                                                                      boxShadow:
                                                                        index ===
                                                                          0
                                                                          ? "2px 0px 4px 0px rgba(0, 0, 0, 0.1)"
                                                                          : "",
                                                                      position:
                                                                        index ===
                                                                          0
                                                                          ? "sticky"
                                                                          : "",
                                                                      borderBottomColor:
                                                                        "rgb(192 192 192)",
                                                                      zIndex:
                                                                        index ===
                                                                          0
                                                                          ? 1
                                                                          : "",
                                                                      left: 0,
                                                                      backgroundColor:
                                                                        index ===
                                                                          0
                                                                          ? "inherit"
                                                                          : "",
                                                                      pl: 1,
                                                                    }}
                                                                  >
                                                                    <Stack
                                                                      sx={{
                                                                        // p: "10px",
                                                                        display:
                                                                          "flex",
                                                                        flexDirection:
                                                                          "row",
                                                                        alignItems:
                                                                          "center",
                                                                        ml: 1,
                                                                      }}
                                                                      direction="row"
                                                                      spacing={1}
                                                                    >
                                                                      {index ===
                                                                        0 && (
                                                                          <Stack>
                                                                            <BpCheckboxContainer>
                                                                              <Checkbox
                                                                                className="bp-checkbox"
                                                                                disableRipple
                                                                                disabled
                                                                                checkedIcon={
                                                                                  <BpCheckedIcon
                                                                                  // className="bp-icon"
                                                                                  />
                                                                                }
                                                                                icon={
                                                                                  <BpIcon className="bp-icon" />
                                                                                }
                                                                                checked={
                                                                                  false
                                                                                }
                                                                              />
                                                                            </BpCheckboxContainer>
                                                                          </Stack>
                                                                        )}

                                                                      <Stack
                                                                        sx={{
                                                                          p: "26.5px 0px",
                                                                        }}
                                                                      >
                                                                        <Typography className="job-title">
                                                                          {" "}
                                                                          {
                                                                            row.job_title
                                                                          }{" "}
                                                                        </Typography>
                                                                      </Stack>
                                                                    </Stack>
                                                                  </TableCell>
                                                                )}
                                                              {item.name ===
                                                                "Company" && (
                                                                  // {isTableLayoutCompany && (
                                                                  <TableCell
                                                                    key={index}
                                                                    sx={{
                                                                      // paddingRight: '5px',
                                                                      boxShadow:
                                                                        index ===
                                                                          0
                                                                          ? "2px 0px 4px 0px rgba(0, 0, 0, 0.1)"
                                                                          : "",
                                                                      position:
                                                                        index ===
                                                                          0
                                                                          ? "sticky"
                                                                          : "",
                                                                      borderBottomColor:
                                                                        "rgb(192 192 192)",
                                                                      zIndex:
                                                                        index ===
                                                                          0
                                                                          ? 1
                                                                          : "",
                                                                      left: 0,
                                                                      backgroundColor:
                                                                        index ===
                                                                          0
                                                                          ? "inherit"
                                                                          : "",
                                                                      p: 0,
                                                                    }}
                                                                  >
                                                                    <Stack
                                                                      sx={{
                                                                        // p: "10px",
                                                                        display:
                                                                          "flex",
                                                                        flexDirection:
                                                                          "row",
                                                                        alignItems:
                                                                          "center",
                                                                        ml: 1,
                                                                      }}
                                                                      direction="row"
                                                                      spacing={1}
                                                                    >
                                                                      {index ===
                                                                        0 && (
                                                                          <Stack>
                                                                            <BpCheckboxContainer>
                                                                              <Checkbox
                                                                                className="bp-checkbox"
                                                                                disableRipple
                                                                                disabled
                                                                                checkedIcon={
                                                                                  <BpCheckedIcon
                                                                                  // className="bp-icon"
                                                                                  />
                                                                                }
                                                                                icon={
                                                                                  <BpIcon className="bp-icon" />
                                                                                }
                                                                                checked={
                                                                                  false
                                                                                }
                                                                              />
                                                                            </BpCheckboxContainer>
                                                                          </Stack>
                                                                        )}

                                                                      <Stack
                                                                        sx={{
                                                                          display:
                                                                            "flex",
                                                                          alignItems:
                                                                            "center",
                                                                          p: "5.5px",
                                                                        }}
                                                                        direction="row"
                                                                        spacing={
                                                                          2
                                                                        }
                                                                      >
                                                                        <Stack
                                                                          direction="column"
                                                                          spacing={
                                                                            2
                                                                          }
                                                                        >
                                                                          <Box
                                                                            sx={{
                                                                              cursor:
                                                                                "default",
                                                                            }}
                                                                          >
                                                                            <Typography className="company-name"
                                                                              component="h6"
                                                                              sx={{
                                                                                color:
                                                                                  styles.primaryTextColor,
                                                                              }}
                                                                            >
                                                                              {
                                                                                row.job_company_name
                                                                              }
                                                                            </Typography>
                                                                          </Box>

                                                                          <Box>
                                                                            <LinkOutlinedIcon sx={{ color: '#919191', fontSize: "20" }} />

                                                                            <LinkedInIcon sx={{ color: '#919191', fontSize: "20" }} />

                                                                            <FacebookIcon sx={{ color: '#919191', fontSize: "20" }} />

                                                                            <TwitterIcon sx={{ color: '#919191', fontSize: "20" }} />
                                                                          </Box>
                                                                        </Stack>
                                                                      </Stack>
                                                                    </Stack>
                                                                  </TableCell>
                                                                  // )}
                                                                )}
                                                              {item.name ===
                                                                "Industry & Keywords" && (
                                                                  // {isTableLayoutIndustry && (
                                                                  <TableCell
                                                                    key={index}
                                                                    sx={{
                                                                      // paddingRight: '5px',
                                                                      boxShadow:
                                                                        index ===
                                                                          0
                                                                          ? "2px 0px 4px 0px rgba(0, 0, 0, 0.1)"
                                                                          : "",
                                                                      position:
                                                                        index ===
                                                                          0
                                                                          ? "sticky"
                                                                          : "",
                                                                      borderBottomColor:
                                                                        "rgb(192 192 192)",
                                                                      zIndex:
                                                                        index ===
                                                                          0
                                                                          ? 1
                                                                          : "",
                                                                      left: 0,
                                                                      backgroundColor:
                                                                        index ===
                                                                          0
                                                                          ? "inherit"
                                                                          : "",
                                                                      p: 0,
                                                                    }}
                                                                  >
                                                                    <Stack
                                                                      sx={{
                                                                        // p: "10px",
                                                                        display:
                                                                          "flex",
                                                                        flexDirection:
                                                                          "row",
                                                                        alignItems:
                                                                          "center",
                                                                        ml: 1,
                                                                      }}
                                                                      direction="row"
                                                                      spacing={1}
                                                                    >
                                                                      {index ===
                                                                        0 && (
                                                                          <Stack>
                                                                            <BpCheckboxContainer>
                                                                              <Checkbox
                                                                                className="bp-checkbox"
                                                                                disableRipple
                                                                                disabled
                                                                                checkedIcon={
                                                                                  <BpCheckedIcon
                                                                                  // className="bp-icon"
                                                                                  />
                                                                                }
                                                                                icon={
                                                                                  <BpIcon className="bp-icon" />
                                                                                }
                                                                                checked={
                                                                                  false
                                                                                }
                                                                              />
                                                                            </BpCheckboxContainer>
                                                                          </Stack>
                                                                        )}

                                                                      <Stack
                                                                        sx={{
                                                                          fontSize:
                                                                            "14px",
                                                                          display:
                                                                            "block",
                                                                          fontFamily:
                                                                            'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                                                          fontWeight: 400,
                                                                          color:
                                                                            "#1A1A1A",
                                                                          p: "26.8px 0px",
                                                                          cursor:
                                                                            "default",
                                                                        }}
                                                                      >
                                                                        <Typography className="job-title">
                                                                          {
                                                                            row.industry
                                                                          }
                                                                        </Typography>
                                                                      </Stack>
                                                                    </Stack>
                                                                  </TableCell>
                                                                  // )}
                                                                )}
                                                              {item.name ===
                                                                "Location" && (
                                                                  // {isTableLayoutLocation && (
                                                                  <TableCell
                                                                    key={index}
                                                                    sx={{
                                                                      // paddingRight: '5px',
                                                                      boxShadow:
                                                                        index ===
                                                                          0
                                                                          ? "2px 0px 4px 0px rgba(0, 0, 0, 0.1)"
                                                                          : "",
                                                                      position:
                                                                        index ===
                                                                          0
                                                                          ? "sticky"
                                                                          : "",
                                                                      borderBottomColor:
                                                                        "rgb(192 192 192)",
                                                                      zIndex:
                                                                        index ===
                                                                          0
                                                                          ? 1
                                                                          : "",
                                                                      left: 0,
                                                                      backgroundColor:
                                                                        index ===
                                                                          0
                                                                          ? "inherit"
                                                                          : "",
                                                                      p: 0,
                                                                    }}
                                                                  >
                                                                    <Stack
                                                                      sx={{
                                                                        // p: "10px",
                                                                        display:
                                                                          "flex",
                                                                        flexDirection:
                                                                          "row",
                                                                        alignItems:
                                                                          "center",
                                                                        ml: 1,
                                                                      }}
                                                                      direction="row"
                                                                      spacing={1}
                                                                    >
                                                                      {index ===
                                                                        0 && (
                                                                          <Stack>
                                                                            <BpCheckboxContainer>
                                                                              <Checkbox
                                                                                className="bp-checkbox"
                                                                                disableRipple
                                                                                disabled
                                                                                checkedIcon={
                                                                                  <BpCheckedIcon
                                                                                  // className="bp-icon"
                                                                                  />
                                                                                }
                                                                                icon={
                                                                                  <BpIcon className="bp-icon" />
                                                                                }
                                                                                checked={
                                                                                  false
                                                                                }
                                                                              />
                                                                            </BpCheckboxContainer>
                                                                          </Stack>
                                                                        )}

                                                                      <Stack className="location">
                                                                        {
                                                                          row.location_name
                                                                        }
                                                                      </Stack>
                                                                    </Stack>
                                                                  </TableCell>
                                                                  // )}
                                                                )}
                                                              {(item.name === "Quick Actions") && (
                                                                // {isTableLayoutActions && (
                                                                <TableCell
                                                                  key={index}
                                                                  sx={{
                                                                    // paddingRight: '5px',
                                                                    boxShadow:
                                                                      index ===
                                                                        0
                                                                        ? "2px 0px 4px 0px rgba(0, 0, 0, 0.1)"
                                                                        : "",
                                                                    position:
                                                                      index ===
                                                                        0
                                                                        ? "sticky"
                                                                        : "",
                                                                    borderBottomColor:
                                                                      "rgb(192 192 192)",
                                                                    zIndex:
                                                                      index ===
                                                                        0
                                                                        ? 1
                                                                        : "",
                                                                    left: 0,
                                                                    backgroundColor:
                                                                      index ===
                                                                        0
                                                                        ? "inherit"
                                                                        : "",
                                                                    p: 0,
                                                                  }}
                                                                >
                                                                  <Stack
                                                                    sx={{
                                                                      // p: "10px",
                                                                      display:
                                                                        "flex",
                                                                      flexDirection:
                                                                        "row",
                                                                      alignItems:
                                                                        "center",
                                                                      ml: 1,
                                                                    }}
                                                                    direction="row"
                                                                    spacing={1}
                                                                  >
                                                                    {index ===
                                                                      0 && (
                                                                        <Stack>
                                                                          <BpCheckboxContainer>
                                                                            <Checkbox
                                                                              className="bp-checkbox"
                                                                              disableRipple
                                                                              disabled
                                                                              checkedIcon={
                                                                                <BpCheckedIcon
                                                                                // className="bp-icon"
                                                                                />
                                                                              }
                                                                              icon={
                                                                                <BpIcon className="bp-icon" />
                                                                              }
                                                                              checked={
                                                                                false
                                                                              }
                                                                            />
                                                                          </BpCheckboxContainer>
                                                                        </Stack>
                                                                      )}

                                                                    {filterLocalData.map(
                                                                      (
                                                                        item: any
                                                                      ) =>
                                                                        row.id ===
                                                                        item.id && (
                                                                          <Stack
                                                                            key={
                                                                              item.id
                                                                            }
                                                                          >
                                                                            <ButtonGroup
                                                                              variant="outlined"
                                                                              disabled
                                                                              id={
                                                                                item.id
                                                                              }
                                                                              sx={{
                                                                                // width: "33px",
                                                                                height:
                                                                                  "31px",
                                                                                mr: 1,
                                                                              }}
                                                                            >
                                                                              <Button className="mail-icon"
                                                                                id={`mailbutton-${row.id}`}
                                                                                disableRipple
                                                                              >
                                                                                <MailOutlineOutlinedIcon className="fs-16" />
                                                                                <ArrowDropDownIcon className="fs-16" />
                                                                              </Button>

                                                                              <Button className="call-icon"
                                                                                id={`${row.id}`}
                                                                                disableRipple>
                                                                                <CallOutlinedIcon className="fs-16"
                                                                                  sx={{
                                                                                    fontSize:
                                                                                      "16px",
                                                                                  }}
                                                                                />
                                                                                <ArrowDropDownIcon className="fs-16" />
                                                                              </Button>

                                                                              <Button
                                                                                className="customButtonForHover call-icon"
                                                                                disableRipple
                                                                              >
                                                                                <PlaylistAddOutlinedIcon className="fs-16" />
                                                                              </Button>

                                                                              <Button className="call-icon"
                                                                                disableRipple>
                                                                                <SendOutlinedIcon className="fs-16" />
                                                                                <ArrowDropDownIcon className="fs-16" />
                                                                              </Button>

                                                                              <Button className="call-icon"
                                                                                id={
                                                                                  row.id
                                                                                }
                                                                                disableRipple>
                                                                                <MoreHorizOutlinedIcon className="fs-16" />
                                                                              </Button>
                                                                            </ButtonGroup>
                                                                          </Stack>
                                                                        )
                                                                    )}
                                                                  </Stack>
                                                                </TableCell>
                                                                // )}
                                                              )}
                                                            </>
                                                          )
                                                        )}
                                                    </>
                                                    {/*<TableCell sx={{ fontFamily: 'Segoe UI' }}>{row.employe}</TableCell>
        <TableCell sx={{ fontFamily: 'Segoe UI' }}>{row.industry}</TableCell>
        <TableCell sx={{ fontFamily: 'Segoe UI' }}>{row.keywords}</TableCell>
        <TableCell sx={{ fontFamily: 'Segoe UI' }}>{row.contactstage}</TableCell>
        <TableCell sx={{ fontFamily: 'Segoe UI' }}>{row.contactla}</TableCell>
        <TableCell sx={{ fontFamily: 'Segoe UI' }}>{row.contactown}</TableCell>
        <TableCell sx={{ fontFamily: 'Segoe UI' }}>{row.contactL}</TableCell> */}
                                                  </TableRow>
                                                )
                                              )
                                            ) : (
                                              <TableRow>
                                                <TableCell
                                                  colSpan={7}
                                                  sx={{
                                                    textAlign: "center",
                                                    color: "#919191",
                                                    borderBottomColor:
                                                      "rgb(192 192 192)",
                                                  }}
                                                >
                                                  No data available.
                                                </TableCell>
                                              </TableRow>
                                            )}
                                          </>
                                        )}
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                ) : loading ? (
                                  <div
                                    style={{
                                      height: "100%",
                                      width: "100%",
                                      textAlign: "center",
                                      alignContent: "center",
                                    }}
                                  >
                                    <CircularProgress className="c-lightblue" />
                                  </div>
                                ) : (
                                  <Stack
                                    sx={{
                                      height: "400px",
                                      display: "flex",
                                      flexDirection: "coloumn",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <img className="mb-15"
                                      src={searchIconColored}
                                      alt=""
                                    />
                                    <Typography className="contactText fs-18 fw-6" sx={{ color: "#474747" }}>
                                      Start your people search by applying any
                                      filters in filter panel.
                                    </Typography>
                                  </Stack>
                                )}
                              </Stack>
                            </Stack>
                          )}

                          {isSetting && (
                            <Stack
                              sx={{
                                height: "90%",
                                width: "100%",
                              }}
                            >
                              <Stack
                                sx={{
                                  paddingTop: "20px",
                                  gap: "15px",
                                }}
                              >
                                <Stack sx={{ gap: "5px" }}>
                                  <Typography className="contactText fs-14 fw-6"
                                    sx={{
                                      marginBottom: '2px',
                                      color: styles.blackcolor,
                                    }}
                                  >
                                    Table Layout Name
                                  </Typography>

                                  <TextField
                                    placeholder="Table Layout 1"
                                    size="small"
                                    // value={isTableLayoutNameValue}
                                    // onChange={handleTableLayoutNameValue}
                                    id="tableLayoutName"
                                    name="tableLayoutName"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    // value={formik.values.tableLayoutName}
                                    value={formik.values.tableLayoutName}
                                    InputProps={{
                                      // startAdornment: (
                                      //   <InputAdornment position="start">
                                      //     <SearchIcon
                                      //       sx={{
                                      //         fontSize: "20px",
                                      //         color: "#919191",
                                      //       }}
                                      //     />
                                      //   </InputAdornment>
                                      // ),
                                      classes: {
                                        root: "search-root",
                                        focused: "search-focused",
                                        notchedOutline: "search-notchedOutline",
                                      },
                                    }}
                                    sx={{
                                      "& .MuiInputBase-root.MuiOutlinedInput-root":
                                      {
                                        // borderRadius: "0px",
                                        width: "40%",
                                      },

                                      "& .MuiInputBase-input.MuiOutlinedInput-input":
                                      {
                                        color: "#1A1A1A",
                                        fontSize: "14px",
                                        fontWeight: 600,
                                        width: "100%",
                                        minHeight: "25px",
                                        fontFamily:
                                          'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                        p: "5px 45px 5px 5px",
                                      },
                                      "& .MuiInputBase-input::placeholder": {
                                        color: "#919191",
                                        fontSize: "14px",
                                        fontWeight: 600,
                                        fontFamily:
                                          'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                        opacity: 1,
                                      },
                                      "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                                      {
                                        borderColor: "#146EF6",
                                      },
                                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                      {
                                        borderColor: "#146EF6",
                                        borderWidth: "1px",
                                        // borderRadius: "0px",
                                      },
                                    }}
                                  />
                                  {formik.errors.tableLayoutName &&
                                    formik.touched.tableLayoutName && (
                                      <Typography
                                        sx={{
                                          fontFamily:
                                            'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                          fontWeight: "500",
                                          fontSize: "12px",
                                          color: "red",
                                        }}
                                      >
                                        {formik.errors.tableLayoutName}
                                      </Typography>
                                    )}
                                  {/* {
                                      isTableLayoutNameValue === "" && (
                                        <Typography
                                      sx={{
                                        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                        fontWeight: "500",
                                        fontSize: "12px",
                                        color: "red",
                                      }}
                                    >
                                      * Required
                                    </Typography>
                                      )
                                    } */}
                                </Stack>
                                <Stack sx={{ gap: "5px", width: "10%" }}>
                                  <Typography className="contactText fs-14 fw-6"
                                    sx={{
                                      color: styles.blackcolor,
                                    }}
                                  >
                                    Visibility
                                  </Typography>
                                  <Stack
                                    sx={{
                                      marginLeft: "10px",
                                      gap: "10px",
                                    }}
                                  >
                                    {/* new code  */}

                                    <FormControl>
                                      <RadioGroup
                                        defaultValue="female"
                                        aria-labelledby="demo-customized-radios"
                                        name="customized-radios"
                                      >
                                        <FormControlLabel
                                          value="private"
                                          checked={
                                            defaultVisibilty === "private"
                                          }
                                          onChange={handleRadioChange}
                                          control={<BpRadio />}
                                          label="Private"
                                        />
                                        <FormControlLabel
                                          value="public"
                                          checked={
                                            defaultVisibilty === "public"
                                          }
                                          onChange={handleRadioChange}
                                          control={<BpRadio />}
                                          label="Public"
                                        />
                                      </RadioGroup>
                                    </FormControl>
                                  </Stack>
                                </Stack>
                              </Stack>
                            </Stack>
                          )}
                        </Stack>
                      </Stack>

                      {/* table layout footer */}

                      <Stack
                        sx={{
                          height: "12%",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          // alignItems: "center",
                          borderTop: "1px solid",
                          borderTopColor: styles.borderColor2,
                        }}
                      >
                        {/* <Typography
                            sx={{
                              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              fontWeight: "600",
                              fontSize: "14px",
                              color: styles.primaryTextColor,
                            }}
                          >
                            Footer
                          </Typography> */}
                        <Stack
                          onMouseOver={onMouseOverCancel}
                          onMouseOut={onMouseOutCancel}
                          sx={{
                            border: "1px solid",
                            borderColor: isMouseOverCancel
                              ? styles.primaryTextColor
                              : styles.borderColor2,
                            borderRadius: "4px",
                            marginLeft: "10px",
                            alignSelf: "center",
                          }}
                        >
                          <Button
                            disableRipple
                            onClick={cancelNextLayoutModal}
                            sx={{
                              height: "35px",
                              width: "70px",
                            }}
                          >
                            <Typography className="contactText fs-14 fw-6 tt-capital"
                              sx={{
                                color: isMouseOverCancel
                                  ? styles.primaryTextColor
                                  : styles.blackcolor,
                              }}
                            >
                              Cancel
                            </Typography>
                          </Button>
                        </Stack>
                        {isLayoutColumn && (
                          <Button
                            disableRipple
                            onClick={onClickNextButton}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "60px",
                              height: "30px",
                              alignSelf: "center",
                              marginRight: "10px",
                              // gap: "4px",
                              backgroundColor: "#146ef6",
                              "&:hover": {
                                backgroundColor: "#146ef6",
                              },
                            }}
                            variant="contained"
                          >
                            <Typography className="contactText fs-14 fw-6 tt-capital"
                              sx={{
                                fontStyle: "normal",
                                lineHeight: "17px",
                                color: "#FBFBFD",
                                letterSpacing: "0.005em",
                              }}
                            >
                              Next
                            </Typography>
                          </Button>
                        )}
                        {isSetting && (
                          <Stack
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              gap: "10px",
                            }}
                          >
                            <Stack
                              onMouseOver={onMouseOverPrevious}
                              onMouseOut={onMouseOutPrevious}
                              sx={{
                                border: "1px solid",
                                borderColor: isMouseOverPrevious
                                  ? styles.primaryTextColor
                                  : styles.borderColor2,
                                borderRadius: "4px",
                                marginLeft: "10px",
                                alignSelf: "center",
                              }}
                            >
                              <Button
                                disableRipple
                                onClick={previousLayoutColumns}
                                sx={{
                                  height: "35px",
                                  width: "70px",
                                }}
                              >
                                <Typography className="contactText fs-14 fw-6 tt-capital"
                                  sx={{
                                    color: isMouseOverPrevious
                                      ? styles.primaryTextColor
                                      : styles.blackcolor,
                                  }}
                                >
                                  Previous
                                </Typography>
                              </Button>
                            </Stack>
                            {!isSaveButton && (
                              <BootstrapTooltip
                                title={
                                  formik.values.tableLayoutName === ""
                                    ? "Enter Layout Name"
                                    : ""
                                }
                                placement="top"
                              >
                                <Button
                                  type="submit"
                                  disableRipple
                                  onClick={onClickCreateNewLayout}
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    miWidth: "60px",
                                    height: "30px",
                                    alignSelf: "center",
                                    marginRight: "10px",
                                    cursor:
                                      formik.values.tableLayoutName === ""
                                        ? "not-allowed"
                                        : "pointer",
                                    // gap: "4px",
                                    backgroundColor:
                                      formik.values.tableLayoutName === ""
                                        ? "#cacacc"
                                        : "#146ef6",
                                    "&:hover": {
                                      backgroundColor:
                                        formik.values.tableLayoutName === ""
                                          ? "#cacacc"
                                          : "#146ef6",
                                    },
                                  }}
                                  variant="contained"
                                >
                                  <Typography className="contactText fs-14 fw-6 tt-capital"
                                    sx={{
                                      fontStyle: "normal", lineHeight: "17px",
                                      color: "#FBFBFD",
                                      letterSpacing: "0.005em",
                                    }}
                                  >
                                    Create New Layout
                                  </Typography>
                                </Button>
                              </BootstrapTooltip>
                            )}

                            {isSaveButton && (
                              <Button
                                type="submit"
                                disableRipple
                                onClick={onClickSaveLayout}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  miWidth: "60px",
                                  height: "30px",
                                  alignSelf: "center",
                                  marginRight: "10px",
                                  cursor: "pointer",
                                  // gap: "4px",
                                  backgroundColor: "#146ef6",
                                  "&:hover": {
                                    backgroundColor: "#146ef6",
                                  },
                                }}
                                variant="contained"
                              >
                                <Typography className="contactText fs-14 fw-6 tt-capital"
                                  sx={{
                                    fontStyle: "normal",
                                    lineHeight: "17px",
                                    color: "#FBFBFD",
                                    letterSpacing: "0.005em",
                                  }}
                                >
                                  Save
                                </Typography>
                              </Button>
                            )}
                          </Stack>
                        )}
                      </Stack>
                    </form>

                    {/* </Stack> */}
                  </Stack>
                </Modal>
              </Stack>
            </Stack>
          </Menu>

          <Button
            disableRipple
            id="table-view"
            aria-controls={openViewChangeMenu ? "table-layout-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openViewChangeMenu ? "true" : undefined}
            onClick={onClickTableChangeView}
          >
            <BootstrapTooltip title="Select view" placement="top">
              <Stack
                direction="row"
                spacing={0.5}
                mt={-0.5}
                sx={{
                  color: styles.primaryTextColor,
                  padding: "5px",
                  cursor: "pointer",
                  width: "100%",
                  "&:hover": {
                    backgroundColor: "#F0F0F0",
                    borderRadius: "4px",
                  },
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {/* <VisibilityIcon sx={{ fontSize: "24px", marginTop: "4px" }} /> */}
                {/* <img src={eyeIcon} alt="" /> */}
                {isTableView ? (
                  <FontAwesomeIcon style={{ marginRight: "4px", marginTop: "2px" }}
                    icon={faTableCells}
                  />
                ) : (
                  <FontAwesomeIcon style={{ marginRight: "4px", marginTop: "2px" }}
                    icon={faCreditCard}
                  />
                )}
                {isTableView && (
                  <Typography className="contactText fs-14 fw-6 cursor-pointer tt-capital"
                    variant="body1"
                  >
                    Table View
                  </Typography>
                )}
                {isCardView && (
                  <Typography className="contactText fs-14 fw-6 cursor-pointer tt-capital"
                    variant="body1"
                  >
                    Card View
                  </Typography>
                )}
                <ArrowDropDownIcon className="fs-24" />
              </Stack>
            </BootstrapTooltip>
          </Button>
          <Menu
            id="table-view"
            anchorEl={isViewChangeMenu}
            open={openViewChangeMenu}
            onClose={handleViewChangeMenu}
            sx={{
              "& .MuiPaper-root.MuiMenu-paper.MuiPopover-paper": {
                // maxHeight: "380px",
                minWidth: "130px",
                minHeight: "80px",
                // height : "100%",
                border: "1px solid #cacacc",
                borderRadius: "8px",
                padding: "0px 8px",
                overflowY: "hidden",
                display: "flex",
                flexDirection: "column",
              },
              "& .MuiList-root.MuiMenu-list": {
                // flexGrow: "1",
              },
              // "& .MuiPaper-root-MuiPopover-paper-MuiMenu-paper"
            }}
          // MenuListProps={{
          //   "aria-labelledby": "basic-button",
          // }}
          >
            <Stack
              direction="row"
              spacing={1.5}
              onClick={onClickCardView}
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "8px",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#F0F0F0",
                  borderRadius: "4px",
                },
              }}
            >
              <FontAwesomeIcon icon={faCreditCard} />
              <Typography className="fw-6 fs-14 contactText"
                sx={{
                  color: styles.blackcolor,
                }}
              >
                Card View
              </Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={1.5}
              onClick={onClickTableView}
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "8px",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#F0F0F0",
                  borderRadius: "4px",
                },
              }}
            >
              <FontAwesomeIcon icon={faTableCells} />
              <Typography className="fw-6 fs-14 contactText"
                sx={{
                  color: styles.blackcolor,
                }}
              >
                Table View
              </Typography>
            </Stack>
          </Menu>
        </Stack>
      </Stack>

      {/* Top Icon Buttons */}
      {/* {
        dimensions.width < 1400 ? ( */}

      {

        <Stack
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: "9px",
            paddingTop: "5px",
            paddingBottom: "5px",
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", flexDirection: "row" }}
          >
            <Box mr={1}>
              <Button
                disableRipple
                id="parent-checkbox-1"
                aria-controls={
                  openParentCheckbox ? "parent-checkbox-1-menu" : undefined
                }
                aria-haspopup="true"
                aria-expanded={openParentCheckbox ? "true" : undefined}
                sx={{
                  backgroundColor: "#F0F0F0",
                  height: "24px",
                  width: "auto",
                  marginRight: "1px",
                  position: "relative",
                  fontSize: "14px",
                  textTransform: "capitalize",
                  whiteSpace: "nowrap",
                  padding: "0px",
                  "&:hover": {
                    backgroundColor: "#F0F0F0",
                  },
                }}
                onClick={handleCheckboxBtn}
              >
                <BpCheckboxContainer>
                  <Checkbox
                    className="bp-checkbox"
                    disableRipple
                    color="default"
                    checkedIcon={
                      <BpCheckedIcon
                        // className="bp-icon"
                        style={{
                          borderColor:
                            checkedCount > 0
                              ? styles.primaryTextColor
                              : undefined,
                        }}
                      />
                    }
                    icon={
                      <BpIcon
                        className="bp-icon"
                        sx={{ backgroundColor: "#F0F0F0" }}
                      />
                    }
                    checked={selectAll}
                    // onClick={handleSelectAllClick}
                    indeterminate={indeterminate}
                    sx={{
                      "& .MuiSvgIcon-root": {
                        width: "16px",
                        height: "16px",
                        fill: styles.primaryTextColor,
                        borderRadius: "1px",
                      },
                      "&.MuiCheckbox-indeterminate": {
                        "& .MuiSvgIcon-root": {
                          width: "22px",
                          height: "22px",
                          borderRadius: "1px",
                        },
                      },
                    }}
                  />
                </BpCheckboxContainer>

                <Typography
                  component="p"
                  sx={{
                    display: checkedCount === 0 ? "none" : "block",
                    paddingLeft: "1px",
                    fontSize: "14px",
                    fontWeight: "600",
                    fontFamily:
                      'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                    color: "#737373",
                  }}
                >
                  {/* {(checkedCount && selectAll)
                  ? totalRecords > 10000
                    ? 10000
                    : totalRecords
                  : checkedCount} Selected */}
                  {selectAllClicked && (isTotal || isSaved)
                    ? (isTotal && totalRecords > 10000) ||
                      (isSaved && totalSavedRecords > 10000)
                      ? 10000 - checkBoxChecked.length
                      : (isTotal ? totalRecords : totalSavedRecords) -
                      checkBoxChecked.length
                    : checkedCount}{" "}
                  Selected
                </Typography>

                <ArrowDropDownIcon
                  sx={{ color: "#737373", paddingLeft: "1px" }}
                />
              </Button>
              <Menu
                id="parent-checkbox-1-menu"
                anchorEl={checkanchorEl}
                open={openParentCheckbox}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "parent-checkbox-1",
                }}
                sx={{
                  width: "327px",
                  height: "175px",
                  borderRadius: "3px",
                  marginTop: "2px",
                  padding: "15px",
                  "& .MuiList-root": {
                    paddingTop: "0px",
                    paddingBottom: "0px",
                  },
                  "& .MuiPaper-root.MuiPopover-paper.MuiMenu-paper": {
                    maxHeight: "calc(100% - 70px)",
                  },
                  "& .MuiMenuItem-root": {
                    lineHeight: "17px",
                    color: "#474747",
                    fontSize: "14px",
                    // paddingTop: '0px',
                    // paddingBottom: '0px',
                    padding: "8px",
                    minHeight: "20px",
                    fontFamily:
                      'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                    fontWeight: "600",
                    // paddingLeft: '4px',
                    // paddingRight: '15px',
                    "&:hover": {
                      backgroundColor: styles.primaryTextColor,
                      color: "#ffffff",
                    },
                  },
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
              >
                <MenuItem
                  disableRipple
                  onClick={() => handleMenuItemClick("page")}
                  sx={{
                    "&:hover": {
                      borderRadius: "5px 5px 0px 0px",
                    },
                  }}
                >
                  Select this page
                </MenuItem>
                <MenuItem
                  disableRipple
                  sx={{ display: "none" }}
                  onClick={() => handleMenuItemClick("advance")}
                >
                  Advance selection
                </MenuItem>
                <MenuItem
                  disableRipple
                  onClick={() => handleMenuItemClick("all")}
                >
                  Select all people (
                  <Box component="span">
                    {searchData.displayData.length && (isTotal || isSaved)
                      ? isTotal
                        ? totalRecords > 10000
                          ? 10000
                          : totalRecords
                        : totalSavedRecords > 10000
                          ? 10000
                          : totalSavedRecords
                      : 0}
                  </Box>
                  )
                </MenuItem>
                <MenuItem
                  disableRipple
                  onClick={() => handleMenuItemClick("clear")}
                  sx={{
                    "&:hover": {
                      borderRadius: "0px 0px 5px 5px",
                    },
                  }}
                >
                  Clear Selection
                </MenuItem>
              </Menu>
            </Box>

            {/* important */}

            {/* <Button
            disableRipple
            onClick={submitToAccuick}
            sx={{
              backgroundColor: (checkedCount > 0 && !apiLoading) ? "#146EF6" : "#ffffff",
              "&:hover": {
                backgroundColor: (checkedCount > 0 && !apiLoading) ? "#146EF6 !important" : "#ffffff !important",
              },
              height: "32px",
              fontWeight: checkedCount > 0 ? 600 : 400,
              border: "1px solid",
              cursor: checkedCount > 0 ? 'pointer' : 'not-allowed',

              borderColor: (checkedCount > 0 && !apiLoading) ? "#146Ef6" : "rgb(192 192 192)"
            }}
          >
            <Typography
              sx={{
                fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                fontSize: "12px",
                fontWeight: 600,
                cursor: checkedCount > 0 ? 'pointer' : 'not-allowed',

                color: (checkedCount > 0 && !apiLoading) ? "#ffffff" : "#919191",
                textTransform: "capitalize"
              }}
            >Access Email</Typography>
          </Button> */}

            {/* 1234 */}
            <Stack sx={{ display: "none" }}>
              <Stack
                sx={{
                  display: dimensions.width < 1328 ? "block" : "none",
                  ml: 2,
                }}
              >
                <ButtonGroup
                  variant="outlined"
                  disableRipple
                  className={checkedCount > 0 ? "record-selected" : "default-box"}
                  sx={{
                    "& .MuiButtonGroup-grouped": {
                      marginRight: checkedCount > 0 ? "1px" : "",
                    },
                  }}
                >
                  {!isContact() && <BootstrapTooltip
                    title={
                      checkedCount > 0
                        ? "Email"
                        : "Please select some records first"
                    }
                    placement="top"
                  >
                    <Button
                      // className="right-section-btn-clr"
                      sx={{
                        backgroundColor: "#ffffff",
                        borderColor: openmail1 ? "#146EF6 !important" : "#CACACC",
                        width: "32px",
                        "&:hover": {
                          backgroundColor: "#ffffff",
                        },
                      }}
                      className={
                        checkedCount > 0
                          ? "right-section-btn right-section-btn-clr"
                          : "right-section-btn"
                      }
                      onClick={handleOpenmail1}
                    >
                      <MailOutlineOutlinedIcon
                        sx={{
                          color: openmail1
                            ? "#146EF6"
                            : checkedCount > 0
                              ? "#737373"
                              : "#919191",
                          fontSize: "18px",
                        }}
                      />
                    </Button>
                  </BootstrapTooltip>}

                  <Modal open={openmail1} onClose={handleClosemail}>
                    <Box sx={style1}>
                      <Stack
                        pb={5}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <WarningAmberRoundedIcon
                            sx={{ width: "17px", height: "14.88px" }}
                          />
                          <Typography
                            component="h6"
                            sx={{
                              fontSize: "16px",
                              fontFamily:
                                'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              color: "#474747",
                              fontWeight: "600",
                            }}
                          >
                            Warning
                          </Typography>
                        </Box>
                        <Box
                          onClick={handleClosemail}
                          sx={{
                            height: "21px",
                            width: "21px",
                            textAlign: "center",
                            "&:hover": {
                              backgroundColor: "#F0F0F0",
                            },
                            "&:hover svg": {
                              color: "#146EF6",
                            },
                          }}
                        >
                          <ClearOutlinedIcon
                            sx={{
                              color: "#737373",
                              height: "16px",
                              width: "16px",
                              fontSize: "15px",
                              cursor: "pointer",
                            }}
                          />
                        </Box>
                      </Stack>

                      <Typography sx={{ color: "#474747", fontSize: "12px" }}>
                        Are you sure you want to also email to the following
                        contacts?
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          "& .MuiButtonBase-root.MuiCheckbox-root": {
                            pl: 0,
                          },
                        }}
                      >
                        <BpCheckboxContainer>
                          <Checkbox
                            className="bp-checkbox"
                            disableRipple
                            checked={ismodalChecked1}
                            onChange={handleModalCheck1}
                            checkedIcon={
                              <BpCheckedIcon
                                // className="bp-icon"
                                style={{
                                  borderColor: ismodalChecked1
                                    ? styles.primaryTextColor
                                    : undefined,
                                }}
                              />
                            }
                            icon={
                              <BpIcon
                                className="bp-icon"
                                sx={{
                                  border: "1px solid #CACACC",
                                  borderRadius: "1px",
                                }}
                              />
                            }
                          />
                        </BpCheckboxContainer>
                        <Typography
                          component="p"
                          sx={{
                            fontSize: "14px",
                            fontWeight: "600",
                            fontFamily:
                              'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            color: "#1A1A1A",
                          }}
                        >
                          Email 1 contact
                          <Box
                            component="span"
                            sx={{
                              textDecoration: "underline",
                              paddingLeft: "5px",
                            }}
                          >
                            active
                          </Box>
                          ,
                          <Box
                            component="span"
                            sx={{
                              textDecoration: "underline",
                              paddingLeft: "5px",
                            }}
                          >
                            paused
                          </Box>
                          , or
                          <Box
                            component="span"
                            sx={{
                              textDecoration: "underline",
                              paddingLeft: "5px",
                              paddingRight: "5px",
                            }}
                          >
                            failed
                          </Box>
                          in other sequences:
                          <Box
                            component="span"
                            sx={{
                              paddingLeft: "5px",
                              color: styles.primaryTextColor,
                              fontWeight: "400",
                              paddingRight: "10px",
                            }}
                          >
                            Kristi Althoff
                          </Box>
                        </Typography>
                        <InfoOutlinedIcon
                          sx={{ color: "#737373", width: "13px", height: "13px" }}
                        />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          "& .MuiButtonBase-root.MuiCheckbox-root": {
                            pl: 0,
                          },
                        }}
                      >
                        <BpCheckboxContainer>
                          <Checkbox
                            className="bp-checkbox"
                            disableRipple
                            checked={ismodalChecked2}
                            onChange={handleModalCheck2}
                            checkedIcon={
                              <BpCheckedIcon
                                // className="bp-icon"
                                style={{
                                  borderColor: ismodalChecked2
                                    ? styles.primaryTextColor
                                    : undefined,
                                }}
                              />
                            }
                            icon={
                              <BpIcon
                                className="bp-icon"
                                sx={{
                                  border: "1px solid #CACACC",
                                  borderRadius: "1px",
                                }}
                              />
                            }
                          />
                        </BpCheckboxContainer>
                        <Typography
                          component="p"
                          sx={{
                            fontSize: "14px",
                            fontWeight: "600",
                            fontFamily:
                              'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            color: "#1A1A1A",
                          }}
                        >
                          Email 1 contact who have a job change available (this
                          contact may cause your Campaign to <br />
                          have inaccurate information):
                          <Box
                            component="span"
                            sx={{
                              paddingLeft: "5px",
                              color: styles.primaryTextColor,
                              fontWeight: "400",
                              paddingRight: "0px",
                            }}
                          >
                            Kristi Althoff
                          </Box>
                        </Typography>
                        <InfoOutlinedIcon
                          sx={{ color: "#737373", width: "13px", height: "13px" }}
                        />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          "& .MuiButtonBase-root.MuiCheckbox-root": {
                            pl: 0,
                          },
                        }}
                      >
                        <BpCheckboxContainer>
                          <Checkbox
                            className="bp-checkbox"
                            disableRipple
                            checked={ismodalChecked3}
                            onChange={handleModalCheck3}
                            checkedIcon={
                              <BpCheckedIcon
                                // className="bp-icon"
                                style={{
                                  borderColor: ismodalChecked3
                                    ? styles.primaryTextColor
                                    : undefined,
                                }}
                              />
                            }
                            icon={
                              <BpIcon
                                className="bp-icon"
                                sx={{
                                  border: "1px solid #CACACC",
                                  borderRadius: "1px",
                                }}
                              />
                            }
                          />
                        </BpCheckboxContainer>
                        <Typography
                          component="p"
                          sx={{
                            fontSize: "14px",
                            fontWeight: "600",
                            fontFamily:
                              'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            color: "#1A1A1A",
                          }}
                        >
                          Email 1 contact without a verified email:
                          <Box
                            component="span"
                            sx={{
                              paddingLeft: "5px",
                              color: styles.primaryTextColor,
                              fontWeight: "400",
                              paddingRight: "5px",
                            }}
                          >
                            Kristi Althoff
                          </Box>
                        </Typography>
                        <InfoOutlinedIcon
                          sx={{ color: "#737373", width: "13px", height: "13px" }}
                        />
                      </Box>

                      <Typography
                        component="p"
                        sx={{
                          fontSize: "14px",
                          fontWeight: "400",
                          fontFamily:
                            'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                          color: "#1A1A1A",
                          mb: 6,
                        }}
                      >
                        When we couldn't verify an email, we provide
                        <Box component="span" sx={{ fontWeight: "700" }}>
                          {" "}
                          free guessed emails
                        </Box>
                        . But sending emails to those
                        <br />
                        people may cause{" "}
                        <Box component="span" sx={{ fontWeight: "700" }}>
                          high bounce rate
                        </Box>{" "}
                        and damage your domain reputation.
                      </Typography>
                      <Divider />

                      <Box>
                        <Button
                          variant="contained"
                          startIcon={
                            <SendOutlinedIcon
                              sx={{
                                width: "13px",
                                height: "13px",
                              }}
                            />
                          }
                          sx={{
                            color: "#ffffff",
                            backgroundColor: !isAnyCheckboxCheckedModal
                              ? "#CACACC"
                              : styles.primaryTextColor,
                            width: !isAnyCheckboxCheckedModal ? "185px" : "142px",
                            height: "32px",
                            fontSize: "14px",
                            textTransform: "capitalize",
                            padding: "10px",
                            boxShadow: "0",
                            borderRadius: "3px",
                            mt: 2,
                            "&:hover": {
                              color: "#ffffff",
                              backgroundColor: !isAnyCheckboxCheckedModal
                                ? "#CACACC"
                                : styles.primaryTextColor,
                              boxShadow: "0",
                              borderRadius: "3px",
                            },
                          }}
                        >
                          {!isAnyCheckboxCheckedModal
                            ? "No Contacts Selected"
                            : "Email Selected"}
                        </Button>
                      </Box>
                    </Box>
                  </Modal>

                  <BootstrapTooltip
                    title={
                      checkedCount > 0
                        ? "Campaign"
                        : "Please select some records first"
                    }
                    placement="top"
                  >
                    <Button
                      id="sequence-icon-btn"
                      aria-controls={
                        openSequenceIconBtn ? "sequence-icon-btn-menu" : undefined
                      }
                      aria-haspopup="true"
                      aria-expanded={openSequenceIconBtn ? "true" : undefined}
                      sx={{
                        backgroundColor: "#ffffff",
                        width: "auto",
                        borderColor:
                          openSequenceIconBtn === true
                            ? "#146EF6 !important"
                            : "#CACACC",
                        "&:hover": {
                          backgroundColor: "#ffffff",
                        },
                      }}
                      onClick={handleSequenceIconBtn}
                    >
                      <SendOutlinedIcon
                        sx={{
                          color:
                            openSequenceIconBtn === true
                              ? "#146EF6"
                              : checkedCount > 0
                                ? "#737373"
                                : "#919191",
                          fontSize: "18px",
                        }}
                      />
                      <ArrowDropDownIcon
                        sx={{
                          color:
                            openSequenceIconBtn === true
                              ? "#146EF6"
                              : checkedCount > 0
                                ? "#737373"
                                : "#919191",
                          fontSize: "18px",
                        }}
                      />
                    </Button>
                  </BootstrapTooltip>
                  <Menu
                    id="sequence-icon-btn-menu"
                    anchorEl={sequenceanchorEl}
                    open={openSequenceIconBtn}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "sequence-icon-btn",
                    }}
                    sx={{
                      width: "236px",
                      // height: "163px",
                      borderRadius: "3px",
                      marginTop: "2px",
                      padding: "30px",
                      "& .MuiList-root": {
                        // paddingLeft: '1px',
                        paddingTop: "0px",
                        paddingBottom: "0px",
                        // paddingRight: '1px'
                      },
                      "& .MuiMenuItem-root": {
                        fontSize: "14px",
                        // paddingTop: '0px',
                        // paddingBottom: '0px',
                        padding: "5px",
                        minHeight: "25px",
                        fontFamily:
                          'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        fontWeight: "600",
                        // paddingLeft: '4px',
                        // paddingRight: '15px',
                        "&:hover": {
                          backgroundColor: styles.primaryTextColor,
                          color: "#ffffff",
                        },
                      },
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
                  >
                    <MenuItem
                      disableRipple
                      onClick={handleClose}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "9px",
                        "&:hover": {
                          borderRadius: "5px 5px 0px 0px",
                        },
                      }}
                    >
                      <Box component="span">
                        <CloudIcon sx={{ height: "11px", width: "16px" }} />
                      </Box>
                      Add to existing Campaign
                    </MenuItem>
                    <MenuItem
                      disableRipple
                      onClick={handleClose}
                      sx={{ display: "flex", alignItems: "center", gap: "9px" }}
                    >
                      <Box component="span">
                        <CloudIcon sx={{ height: "11px", width: "16px" }} />
                      </Box>
                      Add to new Campaign
                    </MenuItem>
                    <MenuItem
                      disableRipple
                      onClick={handleClose}
                      sx={{ display: "flex", alignItems: "center", gap: "9px" }}
                    >
                      <Box component="span">
                        <CloudIcon sx={{ height: "11px", width: "16px" }} />
                      </Box>
                      Mark Campaign As Finished
                    </MenuItem>
                    <MenuItem
                      disableRipple
                      onClick={handleClose}
                      sx={{ display: "flex", alignItems: "center", gap: "9px" }}
                    >
                      <Box component="span">
                        <CloudIcon sx={{ height: "11px", width: "16px" }} />
                      </Box>
                      Remove From Campaign
                    </MenuItem>
                    <MenuItem
                      disableRipple
                      onClick={handleClose}
                      sx={{ display: "flex", alignItems: "center", gap: "9px" }}
                    >
                      <Box component="span">
                        <CloudIcon sx={{ height: "11px", width: "16px" }} />
                      </Box>
                      Connect Salesloft
                    </MenuItem>
                    <MenuItem
                      disableRipple
                      onClick={handleClose}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "9px",
                        "&:hover": {
                          borderRadius: "0px 0px 5px 5px",
                        },
                      }}
                    >
                      <Box component="span">
                        <CloudIcon sx={{ height: "11px", width: "16px" }} />
                      </Box>
                      Connect Outreach
                    </MenuItem>
                  </Menu>

                  <BootstrapTooltip
                    title={
                      checkedCount > 0
                        ? "Pools"
                        : "Please select some records first"
                    }
                    placement="top"
                  >
                    <Button
                      disableRipple
                      id="list-icon-btn"
                      aria-controls={
                        openListIconBtn ? "list-icon-btn-menu" : undefined
                      }
                      aria-haspopup="true"
                      aria-expanded={openListIconBtn ? "true" : undefined}
                      sx={{
                        backgroundColor: "#ffffff",
                        width: "auto",
                        borderColor:
                          openListIconBtn === true
                            ? "#146EF6 !important"
                            : "#CACACC",
                        "&:hover": {
                          backgroundColor: "#ffffff",
                        },
                      }}
                      onClick={handleListIconBtn}
                    >
                      <PlaylistAddOutlinedIcon
                        sx={{
                          color:
                            openListIconBtn === true
                              ? "#146EF6"
                              : checkedCount > 0
                                ? "#737373"
                                : "#919191",
                          fontSize: "18px",
                        }}
                      />
                      <ArrowDropDownIcon
                        sx={{
                          color:
                            openListIconBtn === true
                              ? "#146EF6"
                              : checkedCount > 0
                                ? "#737373"
                                : "#919191",
                          fontSize: "18px",
                        }}
                      />
                    </Button>
                  </BootstrapTooltip>
                  <Menu
                    id="list-icon-btn-menu"
                    anchorEl={listanchorEl}
                    open={openListIconBtn}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "list-icon-btn",
                    }}
                    sx={{
                      width: "157px",
                      // height: "69px",
                      borderRadius: "3px",
                      marginTop: "2px",
                      padding: "15px",
                      "& .MuiList-root": {
                        paddingTop: "0px",
                        paddingBottom: "0px",
                      },
                      "& .MuiMenuItem-root": {
                        lineHeight: "17px",
                        color: "#474747",
                        fontSize: "14px",
                        padding: "8px",
                        // paddingBottom: '0px',
                        minHeight: "20px",
                        fontFamily:
                          'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        fontWeight: "600",
                        // paddingLeft: '4px',
                        // paddingRight: '15px',
                        "&:hover": {
                          backgroundColor: styles.primaryTextColor,
                          color: "#ffffff",
                        },
                      },
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
                  >
                    <MenuItem
                      disableRipple
                      onClick={handleClose}
                      sx={{
                        "&:hover": {
                          borderRadius: "5px 5px 0px 0px",
                        },
                      }}
                    >
                      Add to Pool
                    </MenuItem>
                    <MenuItem
                      disableRipple
                      onClick={handleClose}
                      sx={{
                        "&:hover": {
                          borderRadius: "0px 0px 5px 5px",
                        },
                      }}
                    >
                      Remove from Pool
                    </MenuItem>
                  </Menu>

                  <BootstrapTooltip
                    title={
                      checkedCount > 0
                        ? "Export Selected records to CSV"
                        : "Please select some records first"
                    }
                    placement="top"
                  >
                    <Button
                      disableRipple
                      sx={{
                        backgroundColor: "#ffffff",
                        width: "32px",
                        borderColor: openexport1
                          ? "#146EF6 !important"
                          : "#CACACC",
                        "&:hover": {
                          backgroundColor: "#ffffff",
                        },
                      }}
                      onClick={handleOpenExport1}
                    >
                      <FileDownloadOutlinedIcon
                        sx={{
                          color: openexport1
                            ? "#146EF6 !important"
                            : checkedCount > 0
                              ? "#737373"
                              : "#919191",
                          fontSize: "18px",
                        }}
                      />
                    </Button>
                  </BootstrapTooltip>
                  <Modal open={openexport1} onClose={handleCloseExport}>
                    <Box sx={style2}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 5,
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily:
                              'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            color: "#474747",
                            fontSize: "16px",
                            fontWeight: "600",
                          }}
                        >
                          Export to CSV
                        </Typography>
                        <Box
                          sx={{
                            height: "21px",
                            width: "21px",
                            textAlign: "center",
                            "&:hover": {
                              backgroundColor: "#F0F0F0",
                            },
                            "&:hover svg": {
                              color: "#146EF6",
                            },
                          }}
                        >
                          <ClearOutlinedIcon
                            onClick={handleCloseExport}
                            sx={{
                              color: "#737373",
                              height: "16px",
                              width: "16px",
                              cursor: "pointer",
                            }}
                          />
                        </Box>
                      </Box>

                      <Typography
                        sx={{
                          fontFamily:
                            'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                          fontWeight: "400",
                          fontSize: "12px",
                          color: "#474747",
                        }}
                      >
                        Please click the button below to start the export. You are
                        exporting 1 record. We will email you once the export is{" "}
                        <br /> completed.
                      </Typography>

                      <FormControl sx={{ mb: 2 }}>
                        <RadioGroup
                          value={valueexport}
                          onChange={handleChangeExport}
                        >
                          <FormControlLabel
                            value="Export All Emails"
                            control={
                              <Radio
                                disableRipple
                                color="default"
                                checkedIcon={<RadioBpCheckedIcon />}
                                icon={<RadioBpIcon />}
                              />
                            }
                            label={
                              <Stack
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  flexDirection: "row",
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontSize: "14px",
                                    fontFamily:
                                      'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                    fontWeight: "600",
                                  }}
                                >
                                  Export All Emails
                                </Typography>
                                <Box component="span">
                                  <InfoOutlinedIcon
                                    sx={{
                                      color: "#737373",
                                      height: "13px",
                                      width: "13px",
                                    }}
                                  />
                                </Box>
                              </Stack>
                            }
                          />
                          <FormControlLabel
                            value="Export Verified Emails only"
                            control={
                              <Radio
                                disableRipple
                                color="default"
                                checkedIcon={<RadioBpCheckedIcon />}
                                icon={<RadioBpIcon />}
                              />
                            }
                            label={
                              <Stack
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  flexDirection: "row",
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontSize: "14px",
                                    fontFamily:
                                      'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                    fontWeight: "600",
                                  }}
                                >
                                  Export Verified Emails only
                                </Typography>
                                <Box component="span">
                                  <InfoOutlinedIcon
                                    sx={{
                                      color: "#737373",
                                      height: "13px",
                                      width: "13px",
                                    }}
                                  />
                                </Box>
                              </Stack>
                            }
                          />
                        </RadioGroup>
                      </FormControl>

                      <Divider />

                      <Box sx={{ mb: 4, mt: 4, fontFamily: "Segoe UI" }}>
                        <Typography
                          component="p"
                          sx={{
                            fontSize: "12px",
                            color: "#474747",
                            fontWeight: "400",
                          }}
                        >
                          You can edit what default columns are always exported in
                          your CSV file.
                        </Typography>
                        <Button
                          variant="outlined"
                          disableRipple
                          startIcon={
                            <SettingsIcon
                              sx={{ color: "#146EF6", fontSize: "13px" }}
                            />
                          }
                          sx={{
                            color: "#1A1A1A",
                            fontSize: "14px",
                            fontWeight: "600",
                            borderColor: "#CACACC",
                            backgroundColor: "#FBFBFD",
                            width: "200px",
                            height: " 32px",
                            padding: "5px",
                            fontFamily:
                              'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            whiteSpace: "nowrap",
                            textTransform: "capitalize",
                            marginTop: "10px",
                            "&:hover": {
                              borderColor: styles.primaryTextColor,
                              backgroundColor: "#FBFBFD",
                              color: styles.primaryTextColor,
                            },
                          }}
                        >
                          Edit Export CSV Settings
                        </Button>
                      </Box>

                      <Divider />
                      <Stack mt={2} direction="row" spacing={2}>
                        <Button
                          variant="outlined"
                          disableRipple
                          sx={{
                            borderColor: "#CACACC",
                            width: "70px",
                            height: "33px",
                            textTransform: "capitalize",
                            backgroundColor: "#FBFBFD",
                            color: "#1A1A1A",
                            fontWeight: 600,
                            fontFamily:
                              'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            fontSize: "14px",
                            "&:hover": {
                              borderColor: styles.primaryTextColor,
                              backgroundColor: "#FBFBFD",
                              color: styles.primaryTextColor,
                            },
                          }}
                          onClick={handleCloseExport}
                        >
                          cancel
                        </Button>
                        <Button
                          variant="contained"
                          disableRipple
                          sx={{
                            width: "90px",
                            height: "33px",
                            backgroundColor: styles.primaryTextColor,
                            textTransform: "capitalize",
                            padding: "15px",
                            whiteSpace: "nowrap",
                            fontWeight: 600,
                            fontFamily:
                              'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            fontSize: "14px",
                            boxShadow: "0",
                            "&:hover": {
                              backgroundColor: "#0852C2",
                              color: "#ffffff",
                              boxShadow: "0",
                            },
                          }}
                        >
                          Start Export
                        </Button>
                      </Stack>
                    </Box>
                  </Modal>

                  <BootstrapTooltip
                    title={
                      checkedCount > 0
                        ? "Edit"
                        : "Please select some records first"
                    }
                    placement="top"
                  >
                    <Button
                      disableRipple
                      id="edit-icon-btn"
                      aria-controls={
                        openEditIconBtn ? "edit-icon-btn-menu" : undefined
                      }
                      aria-haspopup="true"
                      aria-expanded={openEditIconBtn ? "true" : undefined}
                      sx={{
                        display: "none",
                        backgroundColor: "#ffffff",
                        width: "auto",
                        borderColor:
                          openEditIconBtn === true
                            ? "#146EF6 !important"
                            : "#CACACC",
                        "&:hover": {
                          backgroundColor: "#ffffff",
                        },
                      }}
                      onClick={handleEditIconBtn}
                    >
                      <CreateOutlinedIcon
                        sx={{
                          color:
                            openEditIconBtn === true
                              ? "#146EF6"
                              : checkedCount > 0
                                ? "#737373"
                                : "#919191",
                          fontSize: "18px",
                        }}
                      />
                      <ArrowDropDownIcon
                        sx={{
                          color:
                            openEditIconBtn === true
                              ? "#146EF6"
                              : checkedCount > 0
                                ? "#737373"
                                : "#919191",
                          fontSize: "18px",
                        }}
                      />
                    </Button>
                  </BootstrapTooltip>
                  <Menu
                    id="edit-icon-btn-menu"
                    anchorEl={editanchorEl}
                    open={openEditIconBtn}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "edit-icon-btn",
                    }}
                    sx={{
                      width: "135px",
                      // height: "136px",
                      borderRadius: "3px",
                      marginTop: "2px",
                      padding: "15px",
                      "& .MuiList-root": {
                        paddingTop: "0px",
                        paddingBottom: "0px",
                      },
                      "& .MuiMenuItem-root": {
                        lineHeight: "17px",
                        color: "#474747",
                        fontSize: "14px",
                        // paddingTop: '0px',
                        // paddingBottom: '0px',
                        padding: "8px",
                        minHeight: "25px",
                        fontFamily:
                          'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        fontWeight: "600",
                        // paddingLeft: '4px',
                        // paddingRight: '15px',
                        "&:hover": {
                          backgroundColor: styles.primaryTextColor,
                          color: "#ffffff",
                        },
                      },
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
                  >
                    <MenuItem
                      disableRipple
                      onClick={handleClose}
                      sx={{
                        "&:hover": {
                          borderRadius: "5px 5px 0px 0px",
                        },
                      }}
                    >
                      Set Stage
                    </MenuItem>
                    <MenuItem disableRipple onClick={handleClose}>
                      Assign Owner
                    </MenuItem>
                    <MenuItem disableRipple onClick={handleClose}>
                      Assign Account
                    </MenuItem>
                    <MenuItem
                      disableRipple
                      onClick={handleClose}
                      sx={{
                        "&:hover": {
                          borderRadius: "0px 0px 5px 5px",
                        },
                      }}
                    >
                      Set Custom Field
                    </MenuItem>
                  </Menu>

                  <BootstrapTooltip
                    title={
                      checkedCount > 0
                        ? "Push to CRM/ATS"
                        : "Please select some records first"
                    }
                    placement="top"
                    sx={{ display: "none" }}
                  >
                    <Button
                      disableRipple
                      id="push-icon-btn"
                      aria-controls={
                        openPushIconBtn ? "push-icon-btn-menu" : undefined
                      }
                      aria-haspopup="true"
                      aria-expanded={openPushIconBtn ? "true" : undefined}
                      sx={{
                        display: "none",
                        backgroundColor: "#ffffff",
                        width: "auto",
                        borderColor:
                          openPushIconBtn === true
                            ? "#146EF6 !important"
                            : "#CACACC",
                        "&:hover": {
                          backgroundColor: "#ffffff",
                        },
                      }}
                      onClick={handlePushIconBtn}
                    >
                      <CloudUploadOutlinedIcon
                        sx={{
                          color:
                            openPushIconBtn === true
                              ? "#146EF6"
                              : checkedCount > 0
                                ? "#737373"
                                : "#919191",
                          fontSize: "18px",
                        }}
                      />
                      <ArrowDropDownIcon
                        sx={{
                          color:
                            openPushIconBtn === true
                              ? "#146EF6"
                              : checkedCount > 0
                                ? "#737373"
                                : "#919191",
                          fontSize: "18px",
                        }}
                      />
                    </Button>
                  </BootstrapTooltip>
                  <Menu
                    id="push-icon-btn-menu"
                    anchorEl={pushanchorEl}
                    open={openPushIconBtn}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "push-icon-btn",
                    }}
                    sx={{
                      width: "185px",
                      // height: "95px",
                      borderRadius: "3px",
                      marginTop: "2px",
                      padding: "20px",
                      "& .MuiList-root": {
                        paddingTop: "0px",
                        paddingBottom: "0px",
                      },
                      "& .MuiMenuItem-root": {
                        lineHeight: "18px",
                        color: "#474747",
                        fontSize: "14px",
                        // paddingTop: '0px',
                        // paddingBottom: '0px',
                        padding: "8px",
                        minHeight: "25px",
                        fontFamily:
                          'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        fontWeight: "600",
                        // paddingLeft: '4px',
                        // paddingRight: '15px',
                        "&:hover": {
                          backgroundColor: styles.primaryTextColor,
                          color: "#ffffff",
                        },
                      },
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
                  >
                    <MenuItem
                      disableRipple
                      onClick={handleClose}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "9px",
                        "&:hover": {
                          borderRadius: "5px 5px 0px 0px",
                        },
                      }}
                    >
                      <Box component="span">
                        <CloudIcon sx={{ height: "11px", width: "16px" }} />
                      </Box>
                      Connect Salesforce
                    </MenuItem>
                    <MenuItem
                      disableRipple
                      onClick={handleClose}
                      sx={{ display: "flex", alignItems: "center", gap: "9px" }}
                    >
                      <Box component="span">
                        <CloudIcon sx={{ height: "11px", width: "16px" }} />
                      </Box>
                      Connect HubSpot
                    </MenuItem>
                    <MenuItem
                      disableRipple
                      onClick={handleClose}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "9px",
                        "&:hover": {
                          borderRadius: "0px 0px 5px 5px",
                        },
                      }}
                    >
                      <Box component="span">
                        <CloudIcon sx={{ height: "11px", width: "16px" }} />
                      </Box>
                      Connect Greenhouse
                    </MenuItem>
                  </Menu>

                  <BootstrapTooltip
                    title={
                      checkedCount > 0 ? "" : "Please select some records first"
                    }
                    placement="top"
                  >
                    <Button
                      disableRipple
                      id="more-icon-btn"
                      aria-controls={
                        openMoreIconBtn ? "more-icon-btn-menu" : undefined
                      }
                      aria-haspopup="true"
                      aria-expanded={openMoreIconBtn ? "true" : undefined}
                      onClick={handleMoreIconBtn}
                      sx={{
                        backgroundColor: "#ffffff",
                        width: "32px",
                        borderColor:
                          openMoreIconBtn === true
                            ? "#146EF6 !important"
                            : "#CACACC",
                        "&:hover": {
                          backgroundColor: "#ffffff",
                        },
                      }}
                    >
                      <MoreHorizOutlinedIcon
                        sx={{
                          color:
                            openMoreIconBtn === true
                              ? "#146EF6"
                              : checkedCount > 0
                                ? "#737373"
                                : "#919191",
                          fontSize: "18px",
                        }}
                      />
                    </Button>
                  </BootstrapTooltip>
                  <Menu
                    id="more-icon-btn-menu"
                    anchorEl={dotanchorEl}
                    open={openMoreIconBtn}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "more-icon-btn",
                    }}
                    sx={{
                      width: "198px",
                      // height: "221px",
                      borderRadius: "3px",
                      marginTop: "2px",
                      padding: "15px",
                      "& .MuiList-root": {
                        paddingTop: "0px",
                        paddingBottom: "0px",
                      },
                      "& .MuiMenuItem-root": {
                        lineHeight: "18px",
                        color: "#474747",
                        fontSize: "14px",
                        // paddingTop: '0px',
                        // paddingBottom: '0px',
                        padding: "8px",
                        minHeight: "25px",
                        fontFamily:
                          'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        fontWeight: "600",
                        // paddingLeft: '4px',
                        // paddingRight: '15px',
                        "&:hover": {
                          backgroundColor: styles.primaryTextColor,
                          color: "#ffffff",
                        },
                      },
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
                  >
                    <MenuItem
                      disableRipple
                      onClick={handleClose}
                      sx={{
                        "&:hover": {
                          borderRadius: "5px 5px 0px 0px",
                        },
                      }}
                    >
                      New Tasks
                    </MenuItem>
                    <MenuItem disableRipple onClick={handleClose}>
                      View Companies
                    </MenuItem>
                    <MenuItem disableRipple onClick={handleClose}>
                      Enrich Emails
                    </MenuItem>
                    <MenuItem disableRipple onClick={handleClose}>
                      Enrich Mobile Numbers
                    </MenuItem>
                    <MenuItem disableRipple onClick={handleClose}>
                      Delete
                    </MenuItem>
                    <MenuItem
                      disableRipple
                      onClick={handleClose}
                      sx={{
                        "&:hover": {
                          borderRadius: "0px 0px 5px 5px",
                        },
                      }}
                    >
                      Merge Duplicates
                    </MenuItem>
                  </Menu>
                </ButtonGroup>
              </Stack>
            </Stack>
            {/* display: dimensions.width > 1328 ? "block" : "none", */}
            <Stack sx={{ ml: 2 }}>
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  fontSize: "8px",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                }}
              >
                <Box
                  mr={1}
                  className={
                    checkedCount > 0 && isValidEmail
                      ? "record-selected"
                      : "default-box"
                  }
                >
                  {!isChromeExtEnable && <BootstrapTooltip
                    title={
                      checkedCount > 0 && isValidEmail
                        ? "Email"
                        : "Please select some records first"
                    }
                    placement="top"
                  >
                    <Button
                      sx={{
                        backgroundColor: "#ffffff",
                        fontFamily:
                          'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        // color: isMailBodyopen ? "#146EF6 !important" : "",
                        // borderColor: isMailBodyopen ? "#146EF6 !important" : "",
                        color: checkedCount > 0 && isValidEmail ? "#146EF6 !important" : "#CACACC",
                        borderColor: checkedCount > 0 && isValidEmail
                          ? "#146EF6 !important"
                          : "#CACACC",
                        "&:hover": {
                          backgroundColor: "#ffffff",
                        },
                      }}
                      variant="outlined"
                      // className='right-section-btn right-section-btn-clr'
                      className={
                        checkedCount > 0 && isValidEmail
                          ? "right-section-btn right-section-btn-clr"
                          : "right-section-btn"
                      }
                      startIcon={
                        <MailOutlineOutlinedIcon
                          sx={{
                            color: isMailBodyopen
                              ? "#146EF6"
                              : checkedCount > 0 && isValidEmail
                                ? "#737373"
                                : "#919191",
                          }}
                        />
                      }
                      disableRipple
                      onClick={handleMailBodyOpen}
                    >
                      Email
                    </Button>
                  </BootstrapTooltip>
                  }

                  <Modal open={openmail2} onClose={handleClosemail}>
                    <Box sx={style1}>
                      <Stack
                        pb={5}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <WarningAmberRoundedIcon
                            sx={{ width: "17px", height: "14.88px" }}
                          />
                          <Typography
                            component="h6"
                            sx={{
                              fontSize: "16px",
                              fontFamily:
                                'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              color: "#474747",
                              fontWeight: "600",
                            }}
                          >
                            Warning
                          </Typography>
                        </Box>
                        <Box
                          onClick={handleClosemail}
                          sx={{
                            height: "21px",
                            width: "21px",
                            textAlign: "center",
                            "&:hover": {
                              backgroundColor: "#F0F0F0",
                            },
                            "&:hover svg": {
                              color: "#146EF6",
                            },
                          }}
                        >
                          <ClearOutlinedIcon
                            sx={{
                              color: "#737373",
                              height: "16px",
                              width: "16px",
                              cursor: "pointer",
                            }}
                          />
                        </Box>
                      </Stack>

                      <Typography sx={{ color: "#474747", fontSize: "12px" }}>
                        Are you sure you want to also email to the following
                        contacts?
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          "& .MuiButtonBase-root.MuiCheckbox-root": {
                            pl: 0,
                          },
                        }}
                      >
                        <BpCheckboxContainer>
                          <Checkbox
                            className="bp-checkbox"
                            disableRipple
                            checked={ismodalChecked1}
                            onChange={handleModalCheck1}
                            checkedIcon={
                              <BpCheckedIcon
                                // className="bp-icon"
                                style={{
                                  borderColor: ismodalChecked1
                                    ? styles.primaryTextColor
                                    : undefined,
                                }}
                              />
                            }
                            icon={
                              <BpIcon
                                className="bp-icon"
                                sx={{
                                  border: "1px solid #CACACC",
                                  borderRadius: "1px",
                                }}
                              />
                            }
                          />
                        </BpCheckboxContainer>
                        <Typography
                          component="p"
                          sx={{
                            fontSize: "14px",
                            fontWeight: "600",
                            fontFamily:
                              'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            color: "#1A1A1A",
                          }}
                        >
                          Email 1 contact
                          <Box
                            component="span"
                            sx={{
                              textDecoration: "underline",
                              paddingLeft: "5px",
                            }}
                          >
                            active
                          </Box>
                          ,
                          <Box
                            component="span"
                            sx={{
                              textDecoration: "underline",
                              paddingLeft: "5px",
                            }}
                          >
                            paused
                          </Box>
                          , or
                          <Box
                            component="span"
                            sx={{
                              textDecoration: "underline",
                              paddingLeft: "5px",
                              paddingRight: "5px",
                            }}
                          >
                            failed
                          </Box>
                          in other sequences:
                          <Box
                            component="span"
                            sx={{
                              paddingLeft: "5px",
                              color: styles.primaryTextColor,
                              fontWeight: "400",
                              paddingRight: "10px",
                            }}
                          >
                            Kristi Althoff
                          </Box>
                        </Typography>
                        <InfoOutlinedIcon
                          sx={{
                            color: "#737373",
                            width: "13px",
                            height: "13px",
                          }}
                        />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          "& .MuiButtonBase-root.MuiCheckbox-root": {
                            pl: 0,
                          },
                        }}
                      >
                        <BpCheckboxContainer>
                          <Checkbox
                            className="bp-checkbox"
                            disableRipple
                            checked={ismodalChecked2}
                            onChange={handleModalCheck2}
                            checkedIcon={
                              <BpCheckedIcon
                                // className="bp-icon"
                                style={{
                                  borderColor: ismodalChecked2
                                    ? styles.primaryTextColor
                                    : undefined,
                                }}
                              />
                            }
                            icon={
                              <BpIcon
                                className="bp-icon"
                                sx={{
                                  border: "1px solid #CACACC",
                                  borderRadius: "1px",
                                }}
                              />
                            }
                          />
                        </BpCheckboxContainer>
                        <Typography
                          component="p"
                          sx={{
                            fontSize: "14px",
                            fontWeight: "600",
                            fontFamily:
                              'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            color: "#1A1A1A",
                          }}
                        >
                          Email 1 contact who have a job change available (this
                          contact may cause your Campaign to <br />
                          have inaccurate information):
                          <Box
                            component="span"
                            sx={{
                              paddingLeft: "5px",
                              color: styles.primaryTextColor,
                              fontWeight: "400",
                              paddingRight: "0px",
                            }}
                          >
                            Kristi Althoff
                          </Box>
                        </Typography>
                        <InfoOutlinedIcon
                          sx={{
                            color: "#737373",
                            width: "13px",
                            height: "13px",
                          }}
                        />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          "& .MuiButtonBase-root.MuiCheckbox-root": {
                            pl: 0,
                          },
                        }}
                      >
                        <BpCheckboxContainer>
                          <Checkbox
                            className="bp-checkbox"
                            disableRipple
                            checked={ismodalChecked3}
                            onChange={handleModalCheck3}
                            checkedIcon={
                              <BpCheckedIcon
                                // className="bp-icon"
                                style={{
                                  borderColor: ismodalChecked1
                                    ? styles.primaryTextColor
                                    : undefined,
                                }}
                              />
                            }
                            icon={
                              <BpIcon
                                className="bp-icon"
                                sx={{
                                  border: "1px solid #CACACC",
                                  borderRadius: "1px",
                                }}
                              />
                            }
                          />
                        </BpCheckboxContainer>
                        <Typography
                          component="p"
                          sx={{
                            fontSize: "14px",
                            fontWeight: "600",
                            fontFamily:
                              'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            color: "#1A1A1A",
                          }}
                        >
                          Email 1 contact without a verified email:
                          <Box
                            component="span"
                            sx={{
                              paddingLeft: "5px",
                              color: styles.primaryTextColor,
                              fontWeight: "400",
                              paddingRight: "5px",
                            }}
                          >
                            Kristi Althoff
                          </Box>
                        </Typography>
                        <InfoOutlinedIcon
                          sx={{
                            color: "#737373",
                            width: "13px",
                            height: "13px",
                          }}
                        />
                      </Box>

                      <Typography
                        component="p"
                        sx={{
                          fontSize: "14px",
                          fontWeight: "400",
                          fontFamily:
                            'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                          color: "#1A1A1A",
                          mb: 6,
                        }}
                      >
                        When we couldn't verify an email, we provide
                        <Box component="span" sx={{ fontWeight: "700" }}>
                          {" "}
                          free guessed emails
                        </Box>
                        . But sending emails to those
                        <br />
                        people may cause{" "}
                        <Box component="span" sx={{ fontWeight: "700" }}>
                          high bounce rate
                        </Box>{" "}
                        and damage your domain reputation.
                      </Typography>
                      <Divider />

                      <Box>
                        <Button
                          variant="contained"
                          disableRipple
                          startIcon={
                            <SendOutlinedIcon
                              sx={{
                                width: "13px",
                                height: "13px",
                              }}
                            />
                          }
                          sx={{
                            color: "#ffffff",
                            backgroundColor: !isAnyCheckboxCheckedModal
                              ? "#CACACC"
                              : styles.primaryTextColor,
                            width: !isAnyCheckboxCheckedModal ? "185px" : "142px",
                            height: "32px",
                            fontSize: "14px",
                            textTransform: "capitalize",
                            padding: "10px",
                            boxShadow: "0",
                            borderRadius: "3px",
                            mt: 2,
                            "&:hover": {
                              color: "#ffffff",
                              backgroundColor: !isAnyCheckboxCheckedModal
                                ? "#CACACC"
                                : styles.primaryTextColor,
                              boxShadow: "0",
                              borderRadius: "3px",
                            },
                          }}
                          onClick={() => {
                            if (isAnyCheckboxCheckedModal) {
                              handleClosemail();
                            }
                          }}
                        >
                          {!isAnyCheckboxCheckedModal
                            ? "No Contacts Selected"
                            : "Email Selected"}
                        </Button>
                      </Box>
                    </Box>
                  </Modal>
                </Box>

                <Box
                  mr={1}
                  className={
                    checkedCount > 0 && isValidSeqPool
                      ? "record-selected"
                      : "default-box"
                  }
                >
                  <BootstrapTooltip
                    title={
                      checkedCount > 0 && isValidSeqPool
                        ? "Campaign"
                        : "Please select some records first"
                    }
                    placement="top"
                  >
                    <Button
                      id="sequence-Text-btn"
                      aria-controls={
                        openSequenceTextBtn ? "sequence-Text-btn-menu" : undefined
                      }
                      aria-haspopup="true"
                      aria-expanded={openSequenceTextBtn ? "true" : undefined}
                      sx={{

                        backgroundColor: "#ffffff",
                        color: checkedCount > 0 ? "#146EF6 !important" : "#CACACC",
                        borderColor: checkedCount > 0
                          ? "#146EF6 !important"
                          : "#CACACC",
                        fontFamily:
                          'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        "&:hover": {
                          backgroundColor: "#ffffff",
                        },
                      }}
                      onClick={handleSequenceTextBtn}
                      variant="outlined"
                      className={
                        checkedCount > 0 && isValidSeqPool
                          ? "right-section-btn right-section-btn-clr"
                          : "right-section-btn"
                      }
                      startIcon={
                        <SendOutlinedIcon
                          sx={{
                            color: openSequenceTextBtn
                              ? "#146EF6"
                              : checkedCount > 0 && isValidSeqPool
                                ? "#737373"
                                : "#919191",
                          }}
                        />
                      }
                      endIcon={
                        <ArrowDropDownIcon
                          sx={{
                            color: openSequenceTextBtn
                              ? "#146EF6"
                              : checkedCount > 0 && isValidSeqPool
                                ? "#737373"
                                : "#919191",
                          }}
                        />
                      }
                      disableRipple
                    >
                      Campaign
                    </Button>
                  </BootstrapTooltip>
                  <Menu
                    id="sequence-Text-btn-menu"
                    anchorEl={seqanchorEl}
                    open={openSequenceTextBtn}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "sequence-Text-btn",
                    }}
                    sx={{
                      width: "300px",
                      // height: "163px",
                      borderRadius: "3px",
                      marginTop: "2px",
                      padding: "30px",
                      "& .MuiList-root": {
                        // paddingLeft: '1px',
                        paddingTop: "0px",
                        paddingBottom: "0px",
                        // paddingRight: '1px'
                      },
                      "& .MuiMenuItem-root": {
                        fontSize: "14px",
                        // paddingTop: '0px',
                        // paddingBottom: '0px',
                        padding: "5px",
                        minHeight: "25px",
                        fontFamily:
                          'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        fontWeight: "600",
                        // paddingLeft: '4px',
                        // paddingRight: '15px',
                        "&:hover": {
                          backgroundColor: styles.primaryTextColor,
                          color: "#ffffff",
                        },
                      },
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
                  >
                    {settingIds[110007] &&
                      adminIds[20024] &&
                      userLocalData.getvalue("paymentType") !== 1 ? (
                      <Box sx={{ width: "250px" }}>
                        <Autocomplete
                          disablePortal
                          id="combo-box-demo"
                          options={sequenceData}
                          sx={{ padding: " 8px 10px 15px" }}
                          onChange={(e, value) =>
                            handleSequenceSave(e, value, "isFromAutosave")
                          }
                          getOptionLabel={(option: any) => option.sequenceName}
                          PaperComponent={({ children }) => (
                            <Paper className="campaign-paper">
                              {children}
                            </Paper>
                          )}
                          renderOption={(
                            props,
                            option: { sequenceName: string } | null
                          ) => {
                            // console.log(option, "option");
                            return (
                              <li className="contactText fs-14 fw-6"
                                {...props}
                                style={{
                                  color: "#1A1A1A",
                                  marginLeft: "10px",
                                  marginRight: "10px",
                                }}
                                onMouseEnter={(e: any) => {
                                  e.target.style.backgroundColor = "#F7F7F7";
                                }}
                                onMouseLeave={(e: any) => {
                                  e.target.style.backgroundColor = "unset";
                                }}
                              >
                                {option ? option.sequenceName : ""}
                              </li>
                            );
                          }}
                          renderInput={(params: any) => (
                            <TextField className="campaignList"
                              {...params}
                              placeholder="Select / Type to Campaign list"
                            // onChange={handlePoolChange}
                            />
                          )}
                        />{" "}
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: "250px",
                          margin: "5px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          className=""
                          onClick={() => {
                            goToUpgrade();
                          }}
                          startIcon={<UpgradeOutlinedIcon fontSize="small" />}
                        >
                          Upgrade
                        </Button>
                      </Box>
                    )}
                  </Menu>
                </Box>



                <Box
                  mr={1}
                  className={
                    checkedCount > 0 && isValidSeqPool
                      ? "record-selected"
                      : "default-box"
                  }
                >
                  <BootstrapTooltip
                    title={
                      checkedCount > 0 && isValidSeqPool
                        ? !isContact() ? "Pools" : "List"
                        : "Please select some records first"
                    }
                    placement="top"
                  >
                    <Button
                      id="list-Text-btn"
                      aria-controls={
                        openListIconTextBtn ? "list-Text-btn-menu" : undefined
                      }
                      aria-haspopup="true"
                      aria-expanded={openListIconTextBtn ? "true" : undefined}
                      sx={{

                        backgroundColor: "#ffffff",
                        color: checkedCount > 0 ? "#146EF6 !important" : "#CACACC",
                        borderColor: checkedCount > 0
                          ? "#146EF6 !important"
                          : "#CACACC",
                        fontFamily:
                          'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        "&:hover": {
                          backgroundColor: "#ffffff",
                        },
                      }}
                      variant="outlined"
                      onClick={handleListTextBtn}
                      className={
                        checkedCount > 0 && isValidSeqPool
                          ? "right-section-btn right-section-btn-clr"
                          : "right-section-btn"
                      }
                      startIcon={
                        isContact() ? <ListAltOutlinedIcon sx={{
                          color: openListIconTextBtn
                            ? "#146EF6"
                            : checkedCount > 0
                              ? "#737373"
                              : "#919191",
                          position: "relative",
                          top: "1px"
                        }} /> : <PlaylistAddOutlinedIcon
                          sx={{
                            color: openListIconTextBtn
                              ? "#146EF6"
                              : checkedCount > 0 && isValidSeqPool
                                ? "#737373"
                                : "#919191",
                          }}
                        />

                      }
                      endIcon={
                        <ArrowDropDownIcon
                          sx={{
                            color: openListIconTextBtn
                              ? "#146EF6"
                              : checkedCount > 0 && isValidSeqPool
                                ? "#737373"
                                : "#919191",
                          }}
                        />
                      }
                      disableRipple
                    >
                      {isContact() ? <span>List</span> : <span>Pool</span>}
                    </Button>
                  </BootstrapTooltip>
                  <Menu
                    id="list-Text-btn-menu"
                    anchorEl={lisanchorEl}
                    open={openListIconTextBtn}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "list-Text-btn",
                    }}
                    sx={{
                      width: "310px",
                      // height: "69px",
                      borderRadius: "3px",
                      marginTop: "2px",
                      padding: "15px",
                      "& .MuiList-root": {
                        paddingTop: "0px",
                        paddingBottom: "0px",
                      },
                      "& .MuiMenuItem-root": {
                        lineHeight: "17px",
                        color: "#474747",
                        fontSize: "14px",
                        // paddingTop: '0px',
                        // paddingBottom: '0px',
                        padding: "8px",
                        minHeight: "20px",
                        fontFamily:
                          'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        fontWeight: "600",
                        // paddingLeft: '4px',
                        // paddingRight: '15px',
                        "&:hover": {
                          backgroundColor: styles.primaryTextColor,
                          color: "#ffffff",
                        },
                      },
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
                  >
                    <Box sx={{ width: "279px" }}>
                      <Autocomplete
                        disablePortal
                        disableClearable
                        onChange={(e, value) =>
                          handleAddToListenTableClose(
                            e,
                            value,
                            null,
                            "bulkListSave"
                          )
                        }
                        id="combo-box-demo"
                        options={addTolistOptions}
                        getOptionLabel={(option: any) => !isContact() ? option.label : option.listName}
                        sx={{
                          // width: '100%',
                          height: "50px",
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
                          padding: " 8px 10px 15px",
                        }}
                        PaperComponent={({ children }) => (
                          <Paper className="pool-paper">
                            {children}
                          </Paper>
                        )}
                        renderOption={(
                          props,
                          option: { label: string, listName: string } | null
                        ) => (
                          <li className="contactText fs-14 fw-6"
                            {...props}
                            style={{
                              color: "#1A1A1A",
                              marginLeft: "10px",
                              marginRight: "10px",
                            }}
                            onMouseEnter={(e: any) => {
                              e.target.style.backgroundColor = "#F7F7F7";
                            }}
                            onMouseLeave={(e: any) => {
                              e.target.style.backgroundColor = "unset";
                            }}
                          >
                            {option ? !isContact() ? option.label : option.listName : ""}
                          </li>
                        )}
                        renderInput={(params) => (
                          <TextField className="pool-text"
                            {...params}
                            placeholder="Select / Type to pool list"
                            onChange={handlePoolChange}
                          />
                        )}
                      />
                    </Box>
                  </Menu>
                </Box>

                <Box mr={1} className={
                  checkedCount > 0
                    ? "record-selected"
                    : "default-box"
                }>
                  <BootstrapTooltip
                    title={
                      checkedCount > 0 && isValidSeqPool
                        ? "Save"
                        : "Please select some records first"
                    }
                    placement="top"
                  >
                    <Button


                      sx={{
                        backgroundColor: "#ffffff",
                        color: checkedCount > 0 ? "#146EF6 !important" : "#CACACC",
                        borderColor: checkedCount > 0 ? "#146EF6 !important" : "#CACACC"
                        ,
                        fontFamily:
                          'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        "&:hover": {
                          backgroundColor: "#ffffff",
                        },
                      }}
                      onClick={() => handleBulkSave("")}
                      variant="outlined"
                      className={
                        checkedCount > 0 && isValidSeqPool
                          ? "right-section-btn right-section-btn-clr"
                          : "right-section-btn"
                      }



                      disableRipple
                    >
                      Save
                    </Button>
                  </BootstrapTooltip>
                </Box>

                {userLocalData.adminSettings(ID_ATS_JOBDIVA) && <Box mr={1} className={
                  checkedCount > 0
                    ? "record-selected"
                    : "default-box"
                }>
                  <BootstrapTooltip
                    title={
                      checkedCount > 0
                        ? "Save to JobDiva"
                        : "Please select some records first"
                    }
                    placement="top"
                  >
                    <Button
                      sx={{
                        backgroundColor: "#ffffff",
                        color: checkedCount > 0 ? "#146EF6 !important" : "#CACACC",
                        borderColor: checkedCount > 0 ? "#146EF6 !important" : "#CACACC"
                        ,
                        fontFamily:
                          'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        "&:hover": {
                          backgroundColor: "#ffffff",
                        },
                      }}
                      onClick={() => handleBulkSave("jobDiva")}
                      // onClick={handleSequenceTextBtn}
                      variant="outlined"
                      className={
                        checkedCount > 0 && isValidSeqPool
                          ? "right-section-btn right-section-btn-clr"
                          : "right-section-btn"
                      }



                      disableRipple
                    >
                      Save to JobDiva
                    </Button>
                  </BootstrapTooltip>
                </Box>}

                <Box
                  sx={{ display: "none" }}
                  mr={1}
                  className={checkedCount > 0 ? "record-selected" : "default-box"}
                >
                  <BootstrapTooltip
                    title={
                      checkedCount > 0
                        ? "Edit"
                        : "Please select some records first"
                    }
                    placement="top"
                  >
                    <Button
                      id="edit-Text-btn"
                      aria-controls={
                        openEditTextBtn ? "edit-Text-btn-menu" : undefined
                      }
                      aria-haspopup="true"
                      aria-expanded={openEditTextBtn ? "true" : undefined}
                      sx={{
                        backgroundColor: "#ffffff",
                        fontFamily:
                          'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        color: openEditTextBtn ? "#146EF6 !important" : "",
                        borderColor: openEditTextBtn ? "#146EF6 !important" : "",
                        "&:hover": {
                          backgroundColor: "#ffffff",
                        },
                      }}
                      variant="outlined"
                      onClick={handleEditTextBtn}
                      className={
                        checkedCount > 0
                          ? "right-section-btn-clr right-section-btn"
                          : "right-section-btn"
                      }
                      startIcon={
                        <CreateOutlinedIcon
                          sx={{
                            color: openEditTextBtn
                              ? "#146EF6"
                              : checkedCount > 0
                                ? "#737373"
                                : "#919191",
                          }}
                        />
                      }
                      endIcon={
                        <ArrowDropDownIcon
                          sx={{
                            color: openEditTextBtn
                              ? "#146EF6"
                              : checkedCount > 0
                                ? "#737373"
                                : "#919191",
                          }}
                        />
                      }
                      disableRipple
                    >
                      Edit
                    </Button>
                  </BootstrapTooltip>
                  <Menu
                    id="edit-Text-btn-menu"
                    anchorEl={edianchorEl}
                    open={openEditTextBtn}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "edit-Text-btn",
                    }}
                    sx={{
                      width: "135px",
                      // height: "136px",
                      borderRadius: "3px",
                      marginTop: "2px",
                      padding: "15px",
                      "& .MuiList-root": {
                        paddingTop: "0px",
                        paddingBottom: "0px",
                      },
                      "& .MuiMenuItem-root": {
                        lineHeight: "17px",
                        color: "#474747",
                        fontSize: "14px",
                        // paddingTop: '0px',
                        // paddingBottom: '0px',
                        padding: "8px",
                        minHeight: "25px",
                        fontFamily:
                          'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        fontWeight: "600",
                        // paddingLeft: '4px',
                        // paddingRight: '15px',
                        "&:hover": {
                          backgroundColor: styles.primaryTextColor,
                          color: "#ffffff",
                        },
                      },
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
                  >
                    <MenuItem
                      disableRipple
                      onClick={handleClose}
                      sx={{
                        "&:hover": {
                          borderRadius: "5px 5px 0px 0px",
                        },
                      }}
                    >
                      Set Stage
                    </MenuItem>
                    <MenuItem disableRipple onClick={handleClose}>
                      Assign Owner
                    </MenuItem>
                    <MenuItem disableRipple onClick={handleClose}>
                      Assign Account
                    </MenuItem>
                    <MenuItem
                      disableRipple
                      onClick={handleClose}
                      sx={{
                        "&:hover": {
                          borderRadius: "0px 0px 5px 5px",
                        },
                      }}
                    >
                      Set Custom Field
                    </MenuItem>
                  </Menu>
                </Box>

                <Box
                  mr={1}
                  sx={{ display: "none" }}
                  className={checkedCount > 0 ? "record-selected" : "default-box"}
                >
                  <BootstrapTooltip
                    title={
                      checkedCount > 0
                        ? "Push to CRM/ATS"
                        : "Please select some records first"
                    }
                    placement="top"
                  >
                    <Button
                      id="push-Text-btn"
                      aria-controls={
                        openPushTextBtn ? "push-Text-btn-menu" : undefined
                      }
                      aria-haspopup="true"
                      aria-expanded={openPushTextBtn ? "true" : undefined}
                      sx={{
                        backgroundColor: "#ffffff",
                        whiteSpace: "nowrap",
                        fontFamily:
                          'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        color: openPushTextBtn ? "#146EF6 !important" : "",
                        borderColor: openPushTextBtn ? "#146EF6 !important" : "",
                        "&:hover": {
                          backgroundColor: "#ffffff",
                        },
                      }}
                      variant="outlined"
                      onClick={handlePushTextBtn}
                      className={
                        checkedCount > 0
                          ? "right-section-btn-clr right-section-btn"
                          : "right-section-btn"
                      }
                      startIcon={
                        <CloudUploadOutlinedIcon
                          sx={{
                            color: openPushTextBtn
                              ? "#146EF6"
                              : checkedCount > 0
                                ? "#737373"
                                : "#919191",
                          }}
                        />
                      }
                      endIcon={<ArrowDropDownIcon sx={{ color: "#919191" }} />}
                      disableRipple
                    >
                      Push to CRM/ATS
                    </Button>
                  </BootstrapTooltip>
                  <Menu
                    id="push-Text-btn-menu"
                    anchorEl={pusanchorEl}
                    open={openPushTextBtn}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "push-Text-btn",
                    }}
                    sx={{
                      width: "185px",
                      // height: "95px",
                      borderRadius: "3px",
                      marginTop: "2px",
                      padding: "20px",
                      "& .MuiList-root": {
                        paddingTop: "0px",
                        paddingBottom: "0px",
                      },
                      "& .MuiMenuItem-root": {
                        lineHeight: "15px",
                        color: "#474747",
                        fontSize: "14px",
                        // paddingTop: '0px',
                        // paddingBottom: '0px',
                        padding: "8px",
                        minHeight: "20px",
                        fontFamily:
                          'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        fontWeight: "600",
                        // paddingLeft: '4px',
                        // paddingRight: '15px',
                        "&:hover": {
                          backgroundColor: styles.primaryTextColor,
                          color: "#ffffff",
                        },
                      },
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
                  >
                    <MenuItem
                      disableRipple
                      onClick={handleClose}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "9px",
                        "&:hover": {
                          borderRadius: "5px 5px 0px 0px",
                        },
                      }}
                    >
                      <Box component="span">
                        <CloudIcon sx={{ height: "11px", width: "16px" }} />
                      </Box>
                      Connect Salesforce
                    </MenuItem>
                    <MenuItem
                      disableRipple
                      onClick={handleClose}
                      sx={{ display: "flex", alignItems: "center", gap: "9px" }}
                    >
                      <Box component="span">
                        <CloudIcon sx={{ height: "11px", width: "16px" }} />
                      </Box>
                      Connect HubSpot
                    </MenuItem>
                    <MenuItem
                      disableRipple
                      onClick={handleClose}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "9px",
                        "&:hover": {
                          borderRadius: "0px 0px 5px 5px",
                        },
                      }}
                    >
                      <Box component="span">
                        <CloudIcon sx={{ height: "11px", width: "16px" }} />
                      </Box>
                      Connect Greenhouse
                    </MenuItem>
                  </Menu>
                </Box>
              </Stack>
            </Stack>
          </Box>

          {/* important */}

          <Stack sx={{ display: "none" }}>
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                fontSize: "8px",
                padding: "5px",
              }}
            >
              <Box
                sx={{
                  mr: 1,
                }}
                className="record-selected default-box"
              >
                <Button
                  disableRipple
                  variant="outlined"
                  id="relevance-btn"
                  aria-controls={
                    openRelevanceBtn ? "relevance-btn-menu" : undefined
                  }
                  aria-haspopup="true"
                  aria-expanded={openRelevanceBtn ? "true" : undefined}
                  onClick={handleRelevance}
                  sx={{
                    backgroundColor: "#ffffff",
                    width: "32px",
                    height: "35px",
                    fontFamily:
                      'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                    borderColor: openRelevanceBtn ? "#146EF6 !important" : "",
                    color: openRelevanceBtn ? "#146EF6 !important" : "",
                    whiteSpace: "nowrap",
                  }}
                  className="right-section-btn right-section-btn-clr"
                  startIcon={
                    <InsertChartOutlinedRoundedIcon
                      sx={{ color: openRelevanceBtn ? "#146EF6" : "#737373" }}
                    />
                  }
                  endIcon={
                    <ArrowDropDownIcon
                      sx={{ color: openRelevanceBtn ? "#146EF6" : "#737373" }}
                    />
                  }
                >
                  {searchData.sort_by}
                </Button>
                <Menu
                  id="relevance-btn-menu"
                  anchorEl={relevanceanchorEl}
                  open={openRelevanceBtn}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "relevance-btn",
                  }}
                  sx={{
                    width: "216px",
                    // height: "180px",
                    borderRadius: "8px",
                    marginTop: "2px",
                    padding: "30px",
                    "& .MuiList-root": {
                      padding: "15px",
                    },
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
                >
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: "400",
                      fontFamily:
                        'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                      color: "#474747",
                    }}
                  >
                    Sort by...
                  </Typography>

                  <Box sx={{ mb: "8px", mt: "2px" }}>
                    <Button
                      disableRipple
                      variant="outlined"
                      id="select-field-btn"
                      aria-controls={
                        openFieldBtn ? "field-select-btn-menu" : undefined
                      }
                      aria-haspopup="true"
                      aria-expanded={openFieldBtn ? "true" : undefined}
                      onClick={handleRelevanceField}
                      sx={{
                        backgroundColor: "#ffffff",
                        width: "180px",
                        height: "30px",
                        fontFamily:
                          'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        textTransform: "capitalize",
                        borderColor: openFieldBtn
                          ? "#146EF6 !important"
                          : "#919191",
                        color: openFieldBtn ? "#146EF6 !important" : "#1A1A1A",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        whiteSpace: "nowrap",
                        p: 0,
                        pl: "10px",
                        pr: "10px",
                        "&:hover": {
                          color: "#146EF6",
                          backgroundColor: "#ffffff",
                          borderColor: "#146EF6",
                        },
                        "&:hover svg": {
                          color: "#146EF6",
                        },
                      }}
                      endIcon={
                        <ArrowDropDownIcon
                          sx={{
                            color: openFieldBtn
                              ? "#146EF6 !important"
                              : "#1A1A1A",
                          }}
                        />
                      }
                    >
                      {selectvalue ? selectvalue : "Relevance"}
                    </Button>
                    <Menu
                      id="field-select-btn-menu"
                      anchorEl={fieldanchorEl}
                      open={openFieldBtn}
                      onClick={handleClose1}
                      MenuListProps={{
                        "aria-labelledby": "select-field-btn",
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
                        "& .MuiPaper-root.MuiMenu-paper.MuiPopover-paper": {
                          minWidth: "180px",
                        },
                      }}
                    >
                      {tableHeadersListLabels.map((item) => (
                        <MenuItem
                          disableRipple
                          onClick={() => handleFieldmenu(item)}
                          key={item}
                          sx={{
                            fontFamily:
                              'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            textTransform: "capitalize",
                            fontWeight: 600,
                            fontSize: "14px",
                            "&:hover": {
                              backgroundColor: "#146EF6",
                              color: "#ffffff",
                            },
                          }}
                        >
                          {item}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>

                  <Box sx={{ mb: "8px", mt: "2px" }}>
                    <Button
                      disableRipple
                      variant="outlined"
                      id="select-sort-btn"
                      aria-controls={
                        openSortBtn ? "select-sort-btn-menu" : undefined
                      }
                      aria-haspopup="true"
                      aria-expanded={openSortBtn ? "true" : undefined}
                      onClick={handleRelevancesort}
                      sx={{
                        backgroundColor: "#ffffff",
                        width: "180px",
                        height: "30px",
                        fontFamily:
                          'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        textTransform: "capitalize",
                        borderColor: openSortBtn
                          ? "#146EF6 !important"
                          : "#919191",
                        color: openSortBtn ? "#146EF6 !important" : "#1A1A1A",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        p: 0,
                        pl: "10px",
                        pr: "10px",
                        "&:hover": {
                          color: "#146EF6",
                          backgroundColor: "#ffffff",
                          borderColor: "#146EF6",
                        },
                        "&:hover svg": {
                          color: "#146EF6",
                        },
                      }}
                      endIcon={
                        <ArrowDropDownIcon
                          sx={{
                            color: openSortBtn ? "#146EF6 !important" : "#1A1A1A",
                          }}
                        />
                      }
                    >
                      {selectsortvalue ? selectsortvalue : "Ascending"}
                    </Button>
                    <Menu
                      id="select-sort-btn-menu"
                      anchorEl={sortanchorEl}
                      open={openSortBtn}
                      onClick={handleClose1}
                      MenuListProps={{
                        "aria-labelledby": "select-sort-btn",
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
                        "& .MuiPaper-root.MuiMenu-paper.MuiPopover-paper": {
                          minWidth: "180px",
                        },
                      }}
                    >
                      {sortingLabel.map((item) => (
                        <MenuItem
                          key={item}
                          disableRipple
                          onClick={() => handleSortmenu(item)}
                          sx={{
                            // minHeight: '35px',
                            fontFamily:
                              'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            textTransform: "capitalize",
                            fontWeight: 600,
                            fontSize: "14px",
                            "&:hover": {
                              backgroundColor: "#146EF6",
                              color: "#ffffff",
                            },
                          }}
                        >
                          {item}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>

                  <Button
                    variant="contained"
                    onClick={onclickHandleApply}
                    disableRipple
                    sx={{
                      width: "180px",
                      height: "33px",
                      boxShadow: "0",
                      textTransform: "capitalize",
                      fontSize: "14px",
                      fontWeight: "600",
                      fontFamily:
                        'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                      backgroundColor: styles.primaryTextColor,
                      color: "#ffffff",
                      "&:hover": {
                        backgroundColor: "#0852C2",
                        color: "#ffffff",
                        boxShadow: "0",
                      },
                    }}
                  >
                    Apply
                  </Button>
                </Menu>
              </Box>

              <Box
                // sx={{ display: dimensions.width > 1328 ? "block" : "none" }}
                sx={{ display: "none" }}
              >
                <Button
                  sx={{
                    fontSize: "12px",
                    padding: "10px",
                    color: "#ffffff",
                    backgroundColor: "#146EF6",
                    fontFamily:
                      'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                    textTransform: "capitalize",
                    fontWeight: "500",
                    height: "32px",
                    whiteSpace: "nowrap",
                    "&:hover": {
                      backgroundColor: "#0852C2",
                      boxShadow: "0px 0px 0px 0px",
                    },
                  }}
                  variant="contained"
                  startIcon={<QueryBuilderOutlinedIcon />}
                  disableRipple
                >
                  Schedule enrichment
                </Button>
              </Box>
            </Stack>
          </Stack>
        </Stack>

      }

      {/* ) : ( */}

      {/* )
      } */}

      {/* Table with Pagination */}
      {isTableView && (
        <Stack sx={{ flexGrow: "1", paddingLeft: "9px" }}>
          <Stack
            className="table-parent"
            sx={{
              width: "99.5%",
              border: "1px rgb(192 192 192) solid",
              borderRadius: "5px",
            }}
          >
            {searchData.displayData.length > 0 ? (
              <TableContainer
                component={Paper}
                sx={{
                  overflow: "auto",
                  flexGrow: "1",
                  // border: "1px #CACACC solid",
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  borderBottomColor: "rgb(192 192 192)",
                  boxShadow: 0,
                  pb: "2px",
                }}
                className="table-container"
              >
                <Table
                  sx={{ minWidth: 650, maxHeight: 400 }}
                  stickyHeader
                  aria-label="sticky table"
                >
                  <TableHead>
                    <TableRow>
                      {/* {tableHeadersList.map((tableHeadersitem: any) => (
                    <TableCellItem person={{ cellName: tableHeadersitem }} />
                  ))} */}
                      <TableCell
                        sx={{
                          left: 0,
                          position: "sticky",
                          backgroundColor: "#ffffff",
                          borderBottomColor: "rgb(192 192 192)",
                          zIndex: 6,
                          // width : "30px"
                        }}
                      >
                        {/* <Typography></Typography> */}
                      </TableCell>

                      {mainTableHeaderItems.map((header: any, index: any) => {
                        // (((header.name === "Quick Actions") && userLocalData.adminSettings(20053)) || (header.name !== "Quick Actions")) &&
                        return <TableCell
                          key={index}
                          sx={{
                            lineHeight: "20px",
                            padding: "5px 10px",
                            fontWeight: "400",
                            fontSize: "12px",
                            borderBottomColor: "rgb(192 192 192)",
                            minWidth: "200px",
                            // position: header.value === "Name" ? "sticky" : "inherit",
                            // position: "sticky",

                            position: index === 0 ? "sticky" : "",
                            // width : index === 0 ? "200px" : "",
                            // left:
                            //   header.value === "Name"
                            //     ? 0
                            //     : "auto",
                            // zIndex:
                            //   header.value === "Name" ? 5 : 2,
                            left: index === 0 ? "35px" : 0,
                            zIndex: index === 0 ? 5 : 2,
                            backgroundColor: "#ffffff",
                            // background:
                            //   header.value === "Name" ? "#ffffff" : "#ffffff",
                          }}
                        // key={header.value}
                        >
                          <Stack
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              height: "17px",
                              fontFamily:
                                'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            }}
                          >
                            {header.name}
                            {/* {header.isSortable && (
      <Box
        component="span"
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <ArrowDropUpIcon
          sx={{
            fontSize: "small",
            color:
              sort === "Ascending" && sortColumnId === header.name
                ? styles.primaryTextColor
                : "#9DAABF",
            cursor: "pointer",
          }}
          onClick={() => tableSort(header.name, "Ascending")}
        />
        <ArrowDropDownIcon
          sx={{
            fontSize: "small",
            color:
              sort === "Descending" && sortColumnId === header.name
                ? styles.primaryTextColor
                : "#9DAABF",
            cursor: "pointer",
          }}
          onClick={() => tableSort(header.name, "Descending")}
        />
      </Box>
    )} */}
                          </Stack>
                        </TableCell>
                      })}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell
                          colSpan={7}
                          sx={{ color: "#919191", border: "none" }}
                          align="center"
                        >
                          <Box>
                            <CircularProgress className="c-lightblue" />
                          </Box>
                        </TableCell>
                      </TableRow>
                    ) : (
                      <>
                        {searchData.displayData.length > 0 ? (
                          searchData.displayData.map((row: any, index: any) => (
                            <TableRow
                              key={index}
                              sx={{
                                textTransform: "capitalize",
                                backgroundColor: "#ffffff",
                                height: "50px",
                                "&:hover": {
                                  backgroundColor: "#F7F7F7",
                                },
                              }}
                            >
                              <TableCell
                                // component="th"
                                // scope="row"
                                sx={{
                                  // paddingRight: '5px',
                                  // boxShadow:

                                  //   "2px 0px 4px 0px rgba(0, 0, 0, 0.1)" ,
                                  "& .MuiTableCell-root": {
                                    p: 0,
                                  },
                                  position: "sticky",
                                  borderBottomColor: "rgb(192 192 192)",
                                  zIndex: 2,
                                  left: 0,
                                  backgroundColor: "inherit",
                                  p: 0,
                                  // width : "30px"
                                }}
                              >
                                <Stack
                                  sx={{
                                    // p: "10px",
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                  }}
                                  direction="row"
                                  spacing={1}
                                >
                                  <Stack>
                                    <BpCheckboxContainer>
                                      <Checkbox
                                        className="bp-checkbox"
                                        disableRipple
                                        checkedIcon={
                                          <BpCheckedIcon
                                            // className="bp-icon"
                                            style={{
                                              borderColor:
                                                styles.primaryTextColor,
                                            }}
                                          />
                                        }
                                        icon={<BpIcon className="bp-icon" />}
                                        // checked={checked[index]}
                                        // checked={(checkBoxChecked.includes(row.id)) ? true : false}
                                        checked={
                                          selectAllClicked
                                            ? checkBoxChecked.includes(row.id)
                                              ? false
                                              : true
                                            : (!selectAllClicked &&
                                              checked[index]) ||
                                            false
                                        }
                                        onClick={() =>
                                          handleCheckboxClick(
                                            index,
                                            row.id,
                                            row
                                          )
                                        }
                                      />
                                    </BpCheckboxContainer>
                                  </Stack>

                                  {/* Name column  */}

                                  {/* {isMainTableLayoutName && ( */}

                                  {/* <Stack
                              direction="column"
                              spacing={1}
                            >
                              <Box>
                                <Stack
                                  onClick={() => checkIsRecordExists(row)}
                                  style={{
                                    color: styles.primaryTextColor,
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                    textDecoration: "none",
                                    cursor: "pointer",
                                  }}
                                  onMouseEnter={(e: any) => {
                                    e.target.style.textDecoration =
                                      "underline";
                                  }}
                                  onMouseLeave={(e: any) => {
                                    e.target.style.textDecoration = "none";
                                  }}
                                >
                                  {row.full_name}
                                </Stack>
                              </Box>
                              <Box>
                                <BootstrapTooltip
                                  title={"https://" + row.linkedin_url}
                                  placement="bottom"
                                >
                                  <Link
                                    href={"https://" + row.linkedin_url}
                                    target="_blank"
                                  >
                                    <LinkedInIcon
                                      sx={{
                                        color: "#919191",
                                        fontSize: "20px",
                                        "&:hover": {
                                          color: styles.primaryTextColor,
                                        },
                                      }}
                                    />
                                  </Link>
                                </BootstrapTooltip>
                              </Box>
                            </Stack> */}

                                  {/* )} */}
                                </Stack>
                                {/* <Stack
                            sx={{
                              height: "28px",
                              backgroundColor: "#F8F8FA",
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            direction="row"
                            spacing="10%"
                          >
                            <Stack
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                cursor: "default",
                              }}
                              direction="row"
                              spacing={0.5}
                            >
                              <Stack
                                sx={{
                                  backgroundColor: "#146EF6",
                                  color: "#ffffff",
                                  borderRadius: "50%",
                                  height: "17px",
                                  width: "17px",
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <ReplaySharpIcon sx={{ fontSize: "18px" }} />
                              </Stack>
                              <Typography
                                component="p"
                                sx={{
                                  fontSize: "12px",
                                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                  fontWeight: 400,
                                  color: "#474747",
                                }}
                              >
                                Update Available
                              </Typography>
                            </Stack>
                            <Stack
                              sx={{
                                backgroundColor: "#ffffff",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                height: "20px",
                                width: "48px",
                                borderRadius: "10px",
                                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.15)",
                                cursor: "pointer",
                              }}
                              direction="row"
                              spacing={0.5}
                            >
                              <DoneOutlinedIcon
                                sx={{
                                  fontSize: "15px",
                                  color: "#146EF6",
                                  mt: "2px",
                                }}
                              />
                              <ClearOutlinedIcon
                                sx={{
                                  fontSize: "15px",
                                  color: "#737373",
                                  pt: "2px",
                                }}
                              />
                            </Stack>
                          </Stack> */}
                              </TableCell>

                              {mainTableHeaderItems.length > 0 &&
                                mainTableHeaderItems.map(
                                  (item: any, index: any) => (
                                    <>
                                      {item.name === "Name" && (
                                        <TableCell
                                          // component="th"
                                          // scope="row"
                                          key={index}
                                          sx={{
                                            // paddingRight: '5px',
                                            "& .MuiTableCell-root": {
                                              p: 0,
                                            },
                                            boxShadow:
                                              index === 0
                                                ? "2px 0px 4px 0px rgba(0, 0, 0, 0.1)"
                                                : "",
                                            position:
                                              index === 0 ? "sticky" : "",
                                            borderBottomColor:
                                              "rgb(192 192 192)",
                                            zIndex: index === 0 ? 1 : "",
                                            // width : index === 0 ? "200px" : "",
                                            left: 34,
                                            backgroundColor:
                                              index === 0 ? "inherit" : "",
                                            p: 1,
                                          }}
                                        >
                                          <Stack
                                            direction="row"
                                            spacing={1}
                                            sx={{ paddingLeft: "10px" }}
                                          >
                                            <Box>
                                              <Stack
                                                onClick={() =>
                                                  checkIsRecordExists(row)
                                                }
                                                style={{
                                                  color:
                                                    styles.primaryTextColor,
                                                  fontSize: "14px",
                                                  fontWeight: "600",
                                                  fontFamily:
                                                    'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                                  textDecoration: "none",
                                                  cursor: "pointer",
                                                }}
                                                onMouseEnter={(e: any) => {
                                                  e.target.style.textDecoration =
                                                    "underline";
                                                }}
                                                onMouseLeave={(e: any) => {
                                                  e.target.style.textDecoration =
                                                    "none";
                                                }}
                                              >
                                                {row.full_name}
                                              </Stack>
                                            </Box>
                                            {row.linkedin_url &&
                                              typeof row.linkedin_url ===
                                              "string" && (
                                                <Box>
                                                  <BootstrapTooltip
                                                    title={
                                                      "https://" +
                                                      row.linkedin_url
                                                    }
                                                    placement="bottom"
                                                  >
                                                    <Link
                                                      href={
                                                        "https://" +
                                                        row.linkedin_url
                                                      }
                                                      target="_blank"
                                                    >
                                                      <LinkedInIcon
                                                        sx={{
                                                          color: "#919191",
                                                          fontSize: "20px",
                                                          "&:hover": {
                                                            color:
                                                              styles.primaryTextColor,
                                                          },
                                                        }}
                                                      />
                                                    </Link>
                                                  </BootstrapTooltip>
                                                </Box>
                                              )}
                                          </Stack>
                                        </TableCell>
                                      )}

                                      {item.name === "Title" && (
                                        <TableCell
                                          key={index}
                                          sx={{
                                            // paddingRight: '5px',
                                            boxShadow:
                                              index === 0
                                                ? "2px 0px 4px 0px rgba(0, 0, 0, 0.1)"
                                                : "",
                                            position:
                                              index === 0 ? "sticky" : "",
                                            borderBottomColor:
                                              "rgb(192 192 192)",
                                            zIndex: index === 0 ? 1 : "",
                                            left: 34,
                                            backgroundColor:
                                              index === 0 ? "inherit" : "",
                                            p: 1,
                                          }}
                                        >
                                          <Stack
                                          // sx={{
                                          //   pt: "5px ",
                                          //   pl: '11.5px',
                                          //   pb: '16px',
                                          //   pr: '11.5px',
                                          // }}
                                          >
                                            <Typography
                                              sx={{
                                                fontSize: "14px",
                                                fontFamily:
                                                  'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                                fontWeight: 400,
                                                color: "#1A1A1A",
                                                width: "190px",
                                                overflow: "hidden",
                                                whiteSpace: "nowrap",
                                                textOverflow: "ellipsis",
                                                // maxWidth: '300px',
                                                // overflow: 'hidden',
                                                // textOverflow: 'ellipsis'
                                              }}
                                            >
                                              <BootstrapTooltip
                                                title={row.job_title}
                                                sx={{
                                                  textTransform: "capitalize",
                                                }}
                                                placement="top"
                                              >
                                                <span> {row.job_title}</span>
                                              </BootstrapTooltip>
                                            </Typography>
                                          </Stack>

                                          {/* </BootstrapTooltip> */}
                                          {/* <Stack
                            sx={{
                              height: "28px",
                              backgroundColor: "#F8F8FA",
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                            direction="row"
                            spacing={2}
                          >
                            <Typography
                              component="p"
                              sx={{
                                fontSize: "12px",
                                fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                fontWeight: 400,
                                color: "#474747",
                                pl: 2,
                              }}
                            >
                              New
                            </Typography>
                            <Stack>
                              <Typography
                                component="p"
                                sx={{
                                  fontSize: "12px",
                                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                  fontWeight: 400,
                                  color: "#474747",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {row.job_title}
                              </Typography>
                            </Stack>
                          </Stack> */}
                                        </TableCell>
                                      )}

                                      {item.name === "Company" && (
                                        <TableCell
                                          key={index}
                                          sx={{
                                            // paddingRight: '5px',
                                            boxShadow:
                                              index === 0
                                                ? "2px 0px 4px 0px rgba(0, 0, 0, 0.1)"
                                                : "",
                                            position:
                                              index === 0 ? "sticky" : "",
                                            borderBottomColor:
                                              "rgb(192 192 192)",
                                            zIndex: index === 0 ? 1 : "",
                                            left: 34,
                                            backgroundColor:
                                              index === 0 ? "inherit" : "",
                                            p: 1,
                                          }}
                                        >
                                          <Stack
                                            sx={{
                                              display: "flex",
                                              alignItems: "center",
                                              p: "5.5px",
                                            }}
                                            direction="row"
                                            spacing={2}
                                          >
                                            {/* <Stack>
                                    <img
                                      src="https://res.cloudinary.com/doxor5nnu/image/upload/v1683968391/Amazon-Logo-Font-1-scaled_f7sumk.webp"
                                      style={{
                                        height: "36px",
                                        width: "37px",
                                        borderRadius: "3px",
                                      }}
                                      alt="avatar"
                                    />
                                  </Stack> */}
                                            <Stack
                                              direction="column"
                                              spacing={2}
                                            >
                                              {/* // onMouseEnter={(e: any) => { */}
                                              {/* //   e.target.style.textDecoration = 'underline'; */}

                                              {/* // }} */}
                                              {/* // onMouseLeave={(e: any) => { */}
                                              {/* //   e.target.style.textDecoration = 'none'; */}
                                              {/* // }} */}
                                              <Box
                                                sx={
                                                  {
                                                    // cursor: "pointer",
                                                  }
                                                }
                                              >
                                                <Typography
                                                  component="h6"
                                                  sx={{
                                                    color: styles.blackcolor,
                                                    fontSize: "14px",
                                                    // fontWeight: "600",
                                                    fontFamily:
                                                      'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                                    whiteSpace: "nowrap",
                                                    width: "190px",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                  }}
                                                >
                                                  <BootstrapTooltip
                                                    title={row.job_company_name}
                                                    sx={{
                                                      textTransform:
                                                        "capitalize",
                                                    }}
                                                    placement="top"
                                                  >
                                                    <span>
                                                      {row.job_company_name}
                                                    </span>
                                                  </BootstrapTooltip>
                                                </Typography>
                                              </Box>

                                              <Box sx={{ display: "none" }}>
                                                <BootstrapTooltip
                                                  title=""
                                                  placement="bottom"
                                                >
                                                  {/* <AnchorLink to={`/contacts/${row.id}`}> */}
                                                  <LinkOutlinedIcon
                                                    sx={{
                                                      color: "#919191",
                                                      height: "20px",
                                                      cursor: "pointer",
                                                      "&:hover": {
                                                        color:
                                                          styles.primaryTextColor,
                                                      },
                                                    }}
                                                  />
                                                  {/* </AnchorLink> */}
                                                </BootstrapTooltip>
                                                <BootstrapTooltip
                                                  title=""
                                                  placement="bottom"
                                                >
                                                  {/* <AnchorLink to={`/contacts/${row.id}`}> */}
                                                  <LinkedInIcon
                                                    sx={{
                                                      color: "#919191",
                                                      height: "20px",
                                                      cursor: "pointer",
                                                      "&:hover": {
                                                        color:
                                                          styles.primaryTextColor,
                                                      },
                                                    }}
                                                  />
                                                  {/* </AnchorLink> */}
                                                </BootstrapTooltip>
                                                <BootstrapTooltip
                                                  title=""
                                                  placement="bottom"
                                                >
                                                  {/* <AnchorLink to={`/contacts/${row.id}`}> */}
                                                  <FacebookIcon
                                                    sx={{
                                                      color: "#919191",
                                                      height: "20px",
                                                      cursor: "pointer",
                                                      "&:hover": {
                                                        color:
                                                          styles.primaryTextColor,
                                                      },
                                                    }}
                                                  />
                                                  {/* </AnchorLink> */}
                                                </BootstrapTooltip>
                                                <BootstrapTooltip
                                                  title=""
                                                  placement="bottom"
                                                >
                                                  {/* <AnchorLink to={`/contacts/${row.id}`}> */}
                                                  <TwitterIcon
                                                    sx={{
                                                      color: "#919191",
                                                      height: "20px",
                                                      cursor: "pointer",
                                                      "&:hover": {
                                                        color:
                                                          styles.primaryTextColor,
                                                      },
                                                    }}
                                                  />
                                                  {/* </AnchorLink> */}
                                                </BootstrapTooltip>
                                              </Box>
                                            </Stack>
                                          </Stack>

                                          {/* <Stack
                                  sx={{
                                    height: "28px",
                                    backgroundColor: "#F8F8FA",
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                  }}
                                  direction="row"
                                  spacing={2}
                                >
                                  <Typography
                                    component="p"
                                    sx={{
                                      fontSize: "12px",
                                      fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                      fontWeight: 400,
                                      color: "#474747",
                                      pl: 2,
                                    }}
                                  >
                                    New
                                  </Typography>
                                  <Stack>
                                    <Typography
                                      component="p"
                                      sx={{
                                        fontSize: "12px",
                                        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                        fontWeight: 400,
                                        color: "#474747",
                                        whiteSpace: "nowrap",
                                      }}
                                    >
                                      {row.job_company_name}
                                    </Typography>
                                  </Stack>
                                </Stack> */}
                                        </TableCell>
                                      )}

                                      {item.name === "Industry & Keywords" && (
                                        <TableCell
                                          key={index}
                                          sx={{
                                            // paddingRight: '5px',
                                            boxShadow:
                                              index === 0
                                                ? "2px 0px 4px 0px rgba(0, 0, 0, 0.1)"
                                                : "",
                                            position:
                                              index === 0 ? "sticky" : "",
                                            borderBottomColor:
                                              "rgb(192 192 192)",
                                            zIndex: index === 0 ? 1 : "",
                                            left: 34,
                                            backgroundColor:
                                              index === 0 ? "inherit" : "",
                                            p: 1,
                                          }}
                                        >
                                          <Stack
                                            sx={{
                                              fontSize: "14px",
                                              display: "block",
                                              fontFamily:
                                                'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                              fontWeight: 400,
                                              color: "#1A1A1A",
                                              // p: "26.8px 11.5px",
                                              p: 0,
                                            }}
                                          >
                                            <Typography
                                              sx={{
                                                fontSize: "14px",
                                                fontFamily:
                                                  'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                                fontWeight: 400,
                                                color: "#1A1A1A",
                                                whiteSpace: "nowrap",
                                                width: "190px",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                              }}
                                            >
                                              <BootstrapTooltip
                                                title={row.industry}
                                                sx={{
                                                  textTransform: "capitalize",
                                                }}
                                                placement="top"
                                              >
                                                <span> {row.industry} </span>
                                              </BootstrapTooltip>
                                            </Typography>
                                          </Stack>
                                          {/* <Stack
                                  sx={{
                                    height: "28px",
                                    backgroundColor: "#F8F8FA",
                                  }}
                                ></Stack> */}
                                        </TableCell>
                                      )}

                                      {item.name === "Location" && (
                                        <TableCell
                                          key={index}
                                          sx={{
                                            // paddingRight: '5px',
                                            boxShadow:
                                              index === 0
                                                ? "2px 0px 4px 0px rgba(0, 0, 0, 0.1)"
                                                : "",
                                            position:
                                              index === 0 ? "sticky" : "",
                                            borderBottomColor:
                                              "rgb(192 192 192)",
                                            zIndex: index === 0 ? 1 : "",
                                            left: 34,
                                            backgroundColor:
                                              index === 0 ? "inherit" : "",
                                            p: 1,
                                          }}
                                        >
                                          <Stack
                                            sx={{
                                              fontSize: "14px",
                                              fontFamily:
                                                'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                              fontWeight: 400,
                                              color: "#1A1A1A",
                                              // p: "26.5px 11.5px",
                                              p: 0,
                                              whiteSpace: "nowrap",
                                            }}
                                          >
                                            {row.location_name}
                                          </Stack>

                                          {/* <Stack
                                  sx={{
                                    height: "28px",
                                    backgroundColor: "#F8F8FA",
                                  }}
                                ></Stack> */}
                                        </TableCell>
                                      )}

                                      {(item.name === "Quick Actions") && (
                                        <TableCell
                                          key={index}
                                          sx={{
                                            // paddingRight: '5px',
                                            boxShadow:
                                              index === 0
                                                ? "2px 0px 4px 0px rgba(0, 0, 0, 0.1)"
                                                : "",
                                            position:
                                              index === 0 ? "sticky" : "",
                                            borderBottomColor:
                                              "rgb(192 192 192)",
                                            zIndex: index === 0 ? 1 : "",
                                            left: 34,
                                            backgroundColor:
                                              index === 0 ? "inherit" : "",
                                            p: 1,
                                          }}
                                        >
                                          {row.userId ? (
                                            <Stack key={row.id} sx={{ ml: 1 }}>
                                              <ButtonGroup
                                                variant="outlined"
                                                id={row.id}
                                                sx={{
                                                  width: "200px",
                                                  height: "31px",
                                                  "& .MuiButtonGroup-grouped": {
                                                    marginRight: "1px",
                                                  },
                                                }}
                                              >
                                                {userLocalData.checkIntegration(
                                                  400026
                                                ) && <BootstrapTooltip
                                                  title={getEmailTitle(row)}
                                                  placement="top"
                                                >
                                                    <Button
                                                      id={`${row.id}`}
                                                      disableRipple
                                                      onClick={(e) =>
                                                        handleTableMail(
                                                          e,
                                                          `${row.id}`
                                                        )
                                                      }
                                                      aria-controls={
                                                        openTableMail &&
                                                          selectedRowId ===
                                                          `${row.id}`
                                                          ? `${row.id}`
                                                          : undefined
                                                      }
                                                      aria-haspopup="true"
                                                      aria-expanded={
                                                        openTableMail &&
                                                          selectedRowId ===
                                                          `${row.id}`
                                                          ? "true"
                                                          : undefined
                                                      }
                                                      sx={{
                                                        pointerEvents:
                                                          row[isContact() ? "work_email" : "recommended_personal_email"] && typeof row[isContact() ? "work_email" : "recommended_personal_email"] == "string"
                                                            ? "auto"
                                                            : "none",
                                                        borderColor:
                                                          openTableMail &&
                                                            selectedRowId ===
                                                            `${row.id}`
                                                            ? "#146EF6 !important"
                                                            : "#CACACC ",
                                                        backgroundColor:
                                                          "#ffffff",
                                                        color:
                                                          openTableMail &&
                                                            selectedRowId ===
                                                            `${row.id}`
                                                            ? styles.primaryTextColor
                                                            : "#919191",
                                                        borderRightColor:
                                                          openTableMail &&
                                                            selectedRowId ===
                                                            `${row.id}`
                                                            ? "#146EF6 !important"
                                                            : "#CACACC",
                                                        mr: "5px",
                                                        "&:hover": {
                                                          borderColor:
                                                            styles.primaryTextColor,
                                                          color:
                                                            styles.primaryTextColor,
                                                          backgroundColor:
                                                            "#ffffff",
                                                        },
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
                                                        <MailOutlineOutlinedIcon className="fs-16" />

                                                        <Box
                                                          sx={{
                                                            backgroundColor:
                                                              "#1DB268",
                                                            // display: 'none',
                                                            height: "10px",
                                                            width: "10px",
                                                            borderRadius: "50%",
                                                            fontSize: "10px",
                                                            display:
                                                              row[isContact() ? "work_email" : "recommended_personal_email"] && typeof row[isContact() ? "work_email" : "recommended_personal_email"] == "string"
                                                                ? "flex"
                                                                : "none",
                                                            justifyContent:
                                                              "center",
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
                                                            backgroundColor:
                                                              "#919191",
                                                            // display: 'none',
                                                            height: "10px",
                                                            width: "10px",
                                                            borderRadius: "50%",
                                                            fontSize: "10px",
                                                            display:
                                                              row[isContact() ? "work_email" : "recommended_personal_email"] && typeof row[isContact() ? "work_email" : "recommended_personal_email"] == "string"
                                                                ? "none"
                                                                : "flex",
                                                            justifyContent:
                                                              "center",
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
                                                            backgroundColor:
                                                              "#EB7A2F",
                                                            display: "none",
                                                            height: "10px",
                                                            width: "10px",
                                                            borderRadius: "50%",
                                                            fontSize: "10px",
                                                            // display: 'flex',
                                                            justifyContent:
                                                              "center",
                                                            alignItems: "center",
                                                            color: "red",
                                                            position: "absolute",
                                                            top: -2,
                                                            right: -2,
                                                          }}
                                                        >
                                                          <QuestionMarkRoundedIcon className="fs-8 c-white" />
                                                        </Box>
                                                      </Box>
                                                      <ArrowDropDownIcon className="fs-8" />
                                                    </Button>
                                                  </BootstrapTooltip>}


                                                <Menu
                                                  id={`${row.id}`}
                                                  anchorEl={TableMailOpen}
                                                  open={
                                                    openTableMail &&
                                                    selectedRowId ===
                                                    `${row.id}`
                                                  }
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
                                                    "aria-labelledby": row.id,
                                                  }}
                                                  sx={{
                                                    "& .MuiPaper-root.MuiMenu-paper.MuiPopover-paper":
                                                    {
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
                                                      <Typography className="contactText fw-6 fs-16 c-black">
                                                        {row.isShowEmail
                                                          ? row[isContact() ? "work_email" : "recommended_personal_email"]
                                                          : doMaskEmail(
                                                            row[isContact() ? "work_email" : "recommended_personal_email"]
                                                          )}
                                                      </Typography>
                                                      {row.isShowEmail ? (
                                                        <ContentCopyRoundedIcon
                                                          onClick={() =>
                                                            Copy.text(`${row[isContact() ? "work_email" : "recommended_personal_email"]}`, 'Email')
                                                            // handleShowSnack(
                                                            //   row.id,
                                                            //   row[isContact() ? "work_email":"recommended_personal_email"]
                                                            // )
                                                          }
                                                          sx={{
                                                            color: "#737373",
                                                            fontSize: "20px",
                                                            pl: 0.5,
                                                            cursor: "pointer",
                                                          }}
                                                        />
                                                      ) : (
                                                        <></>
                                                      )}
                                                    </Stack>

                                                    <Typography className="contactText c-green fs-14 fw-6 mb:0.5">
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
                                                      <Typography className="contactText fw-4 fs-14 c-black">
                                                        Business
                                                      </Typography>

                                                      <Box
                                                        sx={{
                                                          height: "6px",
                                                          width: "6px",
                                                          backgroundColor:
                                                            "#cacccc",
                                                          borderRadius: "50%",
                                                        }}
                                                      ></Box>

                                                      <Typography className="contactText fw-4 fs-14 c-black">
                                                        Primary
                                                      </Typography>
                                                    </Stack>

                                                    <Stack
                                                      sx={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        justifyContent:
                                                          "space-between",
                                                        alignItems: "center",
                                                      }}
                                                    >
                                                      {row.isPackageEmailValidity ==
                                                        "EMPTY" ? <Button className="viewButton tt-capital fw-7 fs-14"
                                                          variant="contained"
                                                          color="primary"
                                                          // id={item.id}
                                                          disableRipple
                                                          onClick={() =>
                                                            handleTableMenuSendMaiOpen(
                                                              row.id
                                                            )
                                                          }>
                                                        Send Email
                                                      </Button> : row.isPackageEmailValidity ==
                                                        "VIEW" ? (
                                                        <Button className="viewButton tt-capital fw-7 fs-14"
                                                          variant="outlined"
                                                          color="primary"
                                                          id={`${row.id}`}
                                                          onClick={() => {
                                                            handleCloseContactMenu(
                                                              "emailFromMenu",
                                                              row
                                                            );
                                                          }}
                                                        >
                                                          View
                                                        </Button>
                                                      ) : (
                                                        <Button className="upgradeButton"
                                                          variant="outlined"
                                                          onClick={() => {
                                                            goToUpgrade();
                                                          }}
                                                          startIcon={
                                                            <UpgradeOutlinedIcon fontSize="small" />
                                                          }
                                                        >
                                                          Upgrade
                                                        </Button>
                                                      )}
                                                    </Stack>
                                                  </Stack>
                                                </Menu>
                                                {/* <Modal
                                            id={item.id}
                                            open={tableMenuSendMail[row.id] || false}
                                            onClose={() => handleTableMenuSendMaiClose(row.id)}
                                          >
                                            <Stack
                                              key={row.id}
                                              sx={{
                                                position: 'absolute' as 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%)',
                                                width: 650,
                                                height: 500,
                                                borderRadius: '5px',
                                                bgcolor: 'background.paper',
                                                boxShadow: 24,

                                              }}
                                            >

                                              <SendMailModal
                                                PersonId={row.id}
                                                handleTableMenuSendMaiClose={handleTableMenuSendMaiClose}
                                                PersonMail={row.recommended_personal_email}
                                                showEmailSuccess={showEmailSuccess}
                                                personObj={row}
                                                checkedRowValues={checkedRowIds}
                                                isBulk={false}
                                              />

                                            </Stack>
                                          </Modal> */}
                                                {/* <Snackbar
                                                  id={row.id}
                                                  open={openSnack[row.id] || false}
                                                  autoHideDuration={3000}
                                                  onClose={() => handleSnackClose(row.id)}
                                                  anchorOrigin={{ vertical: "top", horizontal: "right", }}
                                                  TransitionComponent={Slide}
                                                >
                                                  <MuiAlert
                                                    onClose={() => handleSnackClose(row.id)}
                                                    elevation={6}
                                                    variant="filled"
                                                    icon={<MarkEmailReadOutlinedIcon sx={{ color: "#ffffff", fontSize: "20px", }} />}
                                                    action={
                                                      <IconButton disableRipple onClick={() => handleSnackClose(row.id)} >
                                                        <CloseRoundedIcon sx={{ fontSize: "16px", color: "#ffffff", cursor: "pointer", }} />
                                                      </IconButton>
                                                    }
                                                    sx={{                                                      display: "flex", alignItems: "center", backgroundColor: "#2e7d32", width: "250px",
                                                      "& .MuiAlert-message": { fontSize: "14px", fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontWeight: 600, color: "#ffffff", },
                                                    }}
                                                  >
                                                    Email Copied
                                                  </MuiAlert>
                                                </Snackbar> */}

                                                {userLocalData.checkIntegration(
                                                  400027
                                                ) && <BootstrapTooltip
                                                  title={
                                                    <>{getMobileTilte(row, "tooltip")}</>
                                                  }
                                                  placement="top"
                                                >
                                                    <Button
                                                      id={`${row.id}`}
                                                      disableRipple
                                                      onClick={(e) =>
                                                        handleTableCall(
                                                          e,
                                                          `${row.id}`,
                                                          row.mobile_phone
                                                        )
                                                      }
                                                      aria-controls={
                                                        openTableCall &&
                                                          selectedRowId === `${row.id}`
                                                          ? `${row.id}`
                                                          : undefined
                                                      }
                                                      aria-haspopup="true"
                                                      aria-expanded={
                                                        openTableCall &&
                                                          selectedRowId === `${row.id}`
                                                          ? "true"
                                                          : undefined
                                                      }
                                                      className="customButtonForHover"
                                                      sx={{
                                                        cursor: row.mobile_phone
                                                          ? "pointer"
                                                          : "not-allowed",
                                                        borderColor:
                                                          openTableCall &&
                                                            selectedRowId === `${row.id}` &&
                                                            row.mobile_phone
                                                            ? "#146EF6 !important"
                                                            : "#CACACC",
                                                        backgroundColor: "#ffffff",
                                                        color:
                                                          openTableCall &&
                                                            selectedRowId === `${row.id}` &&
                                                            row.mobile_phone
                                                            ? styles.primaryTextColor
                                                            : "#919191",
                                                        "& .MuiButtonGroup-root .MuiButtonGroup-grouped:not(:last-of-type)":
                                                        {
                                                          borderRightColor:
                                                            openTableCall &&
                                                              selectedRowId === `${row.id}` &&
                                                              row.mobile_phone
                                                              ? styles.primaryTextColor
                                                              : "#CACACC",
                                                        },
                                                        "&:hover": {
                                                          borderColor:
                                                            styles.primaryTextColor,
                                                          color: styles.primaryTextColor,
                                                          backgroundColor: "#ffffff",
                                                        },
                                                      }}
                                                    >
                                                      <CallOutlinedIcon className="fs-16" />
                                                      <ArrowDropDownIcon className="fs-16" />
                                                    </Button>
                                                  </BootstrapTooltip>}

                                                <Menu
                                                  id={`${row.id}`}
                                                  anchorEl={TableCallOpen}
                                                  open={
                                                    openTableCall &&
                                                    selectedRowId ===
                                                    `${row.id}`
                                                  }
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
                                                    "aria-labelledby": row.id,
                                                  }}
                                                  sx={{
                                                    "& .MuiPaper-root.MuiMenu-paper.MuiPopover-paper":
                                                    {
                                                      minWidth: "250px",
                                                    },
                                                  }}
                                                >
                                                  <Stack sx={{ mb: 1, p: 1 }}>
                                                    <Typography className="contactText fs-12 fw-4"
                                                      sx={{
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
                                                      <Typography className="contactText fs-14 fw-6"
                                                        sx={{
                                                          color: "#1A1A1A",
                                                        }}
                                                      >
                                                        {/* `(${row.mobile_phone.slice(2, 5)})-${row.mobile_phone.slice(5, 8)}-${row.mobile_phone.slice(8)}` */}
                                                        {getMobileTilte(
                                                          row,
                                                          "title"
                                                        )}
                                                      </Typography>
                                                      {row.isShowPhone ? (
                                                        <ContentCopyRoundedIcon className=" fs-20 cursor-pointer"
                                                          sx={{
                                                            color: "#737373",
                                                            pl: 0.5,
                                                          }}
                                                          onClick={() =>
                                                            Copy.text(`${row.mobile_phone}`, 'Number')
                                                            // handleShowCallSnack(
                                                            //   row.id,
                                                            //   row.mobile_phone
                                                            // )
                                                          }
                                                        />
                                                      ) : (
                                                        <></>
                                                      )}
                                                    </Box>
                                                    {row.isPackagePhoneValidity ==
                                                      "EMPTY" ? null : row.isPackagePhoneValidity ==
                                                        "VIEW" ? (
                                                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                        <Button
                                                          variant="contained"
                                                          color="primary"
                                                          id={`${row.id}`}
                                                          className="viewButton tt-capital fw-7 fs-14"
                                                          onClick={() => {
                                                            handleCloseContactMenu(
                                                              "phoneFromMenu",
                                                              row
                                                            );
                                                          }}
                                                        >
                                                          View
                                                        </Button>
                                                      </Box>
                                                    ) : (
                                                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                        <Button
                                                          variant="contained"
                                                          color="primary"
                                                          size="small"
                                                          onClick={() => {
                                                            goToUpgrade();
                                                          }}
                                                          startIcon={
                                                            <UpgradeOutlinedIcon fontSize="small" />
                                                          }
                                                        >
                                                          Upgrade
                                                        </Button>
                                                      </Box>
                                                    )}
                                                  </Stack>

                                                  {/* <SmsModal
                                                    rowId={row.id}
                                                    localData={localData}
                                                    openSmsPopup={openSmsPopup}
                                                    handleCloseSmsPopup={
                                                      handleCloseSmsPopup
                                                    }
                                                    mobile={
                                                      row.mobile_phone
                                                        ? row.mobile_phone
                                                        : ""
                                                    }
                                                  /> */}

                                                  {/* <Stack
                                                    sx={{ borderBottom: "#F0F0F0" }}
                                                  ></Stack>

                                                  <Stack sx={{ mt: 1, p: 1 }}>
                                                    <Typography
                                                      sx={{
                                                        fontSize: "12px",
                                                        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                                        fontWeight: 400,
                                                        color: "#1A1A1A",
                                                      }}
                                                    >
                                                      Direct Dial (1 Credit)
                                                    </Typography>
                                                    <Typography
                                                      sx={{
                                                        fontSize: "12px",
                                                        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                                        fontWeight: 400,
                                                        color: "#1A1A1A",
                                                        mb: 0.5,
                                                      }}
                                                    >
                                                      ***-***-****
                                                    </Typography>

                                                    <Button
                                                      variant="contained"
                                                      disableRipple
                                                      sx={{
                                                        textTransform: "capitalize",
                                                        backgroundColor: "#146EF6",
                                                        fontWeight: 700,
                                                        fontSize: "14px",
                                                        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                                        color: "#ffffff",
                                                        height: "32px",
                                                        width: "100%",
                                                        whiteSpace: "nowrap",
                                                        boxShadow: "0",
                                                        "&:hover": {
                                                          backgroundColor: "#0852C2",
                                                          color: "#ffffff",
                                                          boxShadow: "0",
                                                        },
                                                      }}
                                                      startIcon={
                                                        <CloudDownloadOutlinedIcon />
                                                      }
                                                    >
                                                      Request Direct Dial
                                                    </Button>
                                                  </Stack> */}
                                                </Menu>

                                                {row.id === selectedRowId && (
                                                  <PhoneDialog
                                                    dialogOpen={openSmsPopup}
                                                    onClose={
                                                      handleCloseSmsPopup
                                                    }
                                                    name={
                                                      row.full_name
                                                        ? row.full_name
                                                        : ""
                                                    }
                                                    toPhone={
                                                      row.mobile_phone
                                                        ? row.mobile_phone
                                                        : ""
                                                    }
                                                    candidateId={
                                                      row.userId
                                                        ? row.userId
                                                        : ""
                                                    }
                                                    jobId={""}
                                                  />
                                                )}

                                                {

                                                  <BootstrapTooltip
                                                    title={isContact() ? "Add to List" : 'Add to Pool'}
                                                    placement="top"
                                                  >
                                                    <Button
                                                      className="customButtonForHover"
                                                      id={`${row.id}`}
                                                      onClick={(event: any) =>
                                                        handleClickAddToListenTable(
                                                          event,
                                                          row.id
                                                        )
                                                      }
                                                      disableRipple
                                                      sx={{
                                                        borderColor:
                                                          Boolean(addToTableListanchorEl[row.id])
                                                            ? "#146EF6 !important"
                                                            : "#CACACC",
                                                        backgroundColor:
                                                          "#ffffff",
                                                        color:
                                                          Boolean(addToTableListanchorEl[row.id])
                                                            ? styles.primaryTextColor
                                                            : "#919191",
                                                        "&:hover": {
                                                          color:
                                                            styles.primaryTextColor,
                                                          backgroundColor:
                                                            "#ffffff",
                                                        },
                                                      }}
                                                    >
                                                      {!isContact() ? <PlaylistAddOutlinedIcon className="fs-16" />
                                                        : <ListAltOutlinedIcon className="fs-16" />}
                                                      {!isContact() ? getPoolCount(row.id) : getListCount(row.id)}
                                                    </Button>
                                                  </BootstrapTooltip>
                                                }
                                                {((userLocalData.checkIntegration(
                                                  400006
                                                ) ||
                                                  userLocalData.checkIntegration(
                                                    400007
                                                  )) &&
                                                  userLocalData.adminSettings(
                                                    20020
                                                  )) || isContact() ? (
                                                  <Menu
                                                    id={`${row.id}`}
                                                    anchorEl={addToTableListanchorEl[row.id] || null}
                                                    open={Boolean(addToTableListanchorEl[row.id])}
                                                    onClose={(e, value) =>
                                                      handleAddToListenTableClose(
                                                        e,
                                                        value,
                                                        row,
                                                        "isFromAutosave"
                                                      )
                                                    }
                                                    MenuListProps={{
                                                      "aria-labelledby": row.id,
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
                                                      style: {
                                                        overflow: "visible",
                                                      },
                                                    }}
                                                    sx={{
                                                      boxShadow: "0px",
                                                      "& .MuiList-root.MuiMenu-list":
                                                      {
                                                        pt: "8px",
                                                        pb: "15px",
                                                        pr: "10px",
                                                        pl: "10px",
                                                      },
                                                    }}
                                                  >
                                                    <Stack mb={1} sx={{
                                                      "& .MuiButton-root": {
                                                        border: "none !important",
                                                        justifyContent: "space-between !important",
                                                        textTransform: "capitalize",
                                                      }
                                                    }}>
                                                      {!isContact() ? getPoolName(row.id).map(
                                                        (item: any) => (
                                                          <Button
                                                            size="small"
                                                            key={item}
                                                            color="inherit"
                                                            endIcon={<CloseRoundedIcon fontSize="small" />}
                                                            onClick={() => {
                                                              confirmDialog(`Are you sure, you want to delete pool - ${item.name}?`, () => {
                                                                deletePool(row.userId, item.id);
                                                                setAddToTableListAnchorEl((prev: any) => ({
                                                                  ...prev,
                                                                  [row.id]: null
                                                                }));
                                                              })
                                                            }}
                                                          // className="seq-select-option"
                                                          >
                                                            {item.name}
                                                          </Button>
                                                        )
                                                      ) : getListNames(row.id).map(
                                                        (item: any) => (
                                                          <Button
                                                            size="small"
                                                            key={item}
                                                            color="inherit"
                                                            endIcon={<CloseRoundedIcon fontSize="small" />}
                                                            onClick={() => {
                                                              confirmDialog(`Are you sure, you want to delete list - ${item.name}?`, () => {
                                                                deleteList(row.userId, item.id);
                                                                setAddToTableListAnchorEl((prev: any) => ({
                                                                  ...prev,
                                                                  [row.id]: null
                                                                }));
                                                              })
                                                            }}
                                                          // className="seq-select-option"
                                                          >
                                                            {item.name}
                                                          </Button>
                                                        )
                                                      )
                                                      }
                                                    </Stack>

                                                    {/* {JSON.stringify(addTolistOptions)}---- */}
                                                    <Autocomplete
                                                      disablePortal
                                                      disableClearable
                                                      onChange={(e, value) =>
                                                        handleAddToListenTableClose(
                                                          e,
                                                          value,
                                                          row,
                                                          "isFromAutosave"
                                                        )
                                                      }
                                                      id="combo-box-demo"
                                                      options={addTolistOptions}
                                                      getOptionLabel={(
                                                        option: any
                                                      ) => !isContact() ? option.label : option.listName}
                                                      sx={{
                                                        width: "259px",
                                                        height: "30px",
                                                        "& .MuiOutlinedInput-root":
                                                        {
                                                          p: 0,
                                                        },
                                                        "& .MuiAutocomplete-popupIndicator":
                                                        {
                                                          transform: "unset",
                                                          color: "#737373",
                                                          "& .MuiTouchRipple-root":
                                                          {
                                                            display: "none",
                                                          },
                                                          "&:hover": {
                                                            backgroundColor:
                                                              "#ffffff",
                                                          },
                                                        },
                                                      }}
                                                      PaperComponent={({
                                                        children,
                                                      }) => (
                                                        <Paper className="pool-paper" >
                                                          {children}
                                                        </Paper>
                                                      )}
                                                      renderOption={(
                                                        props,
                                                        option: {
                                                          label: string;
                                                          listName: string
                                                        } | null
                                                      ) => (
                                                        <li
                                                          {...props}
                                                          style={{
                                                            color: "#1A1A1A",
                                                            fontSize: "14px",
                                                            fontWeight: 600,
                                                            fontFamily:
                                                              'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                                            marginLeft: "10px",
                                                            marginRight: "10px",
                                                          }}
                                                          onMouseEnter={(
                                                            e: any
                                                          ) => {
                                                            e.target.style.backgroundColor =
                                                              "#F7F7F7";
                                                          }}
                                                          onMouseLeave={(
                                                            e: any
                                                          ) => {
                                                            e.target.style.backgroundColor =
                                                              "unset";
                                                          }}
                                                        >
                                                          {option
                                                            ? option.label || option.listName
                                                            : ""}
                                                        </li>
                                                      )}
                                                      renderInput={(params) => (
                                                        <TextField className="campaignList"
                                                          {...params}
                                                          placeholder={!isContact() ? "Select Pool" : "select List"}
                                                          onChange={
                                                            handlePoolChange
                                                          }
                                                        />
                                                      )}
                                                    />
                                                  </Menu>
                                                ) : (
                                                  <Menu
                                                    id={`${row.id}`}
                                                    anchorEl={addToTableListanchorEl[row.id] || null}
                                                    open={Boolean(addToTableListanchorEl[row.id])}
                                                    onClose={(e, value) =>
                                                      handleAddToListenTableClose(
                                                        e,
                                                        value,
                                                        row,
                                                        "isFromAutosave"
                                                      )
                                                    }
                                                    MenuListProps={{
                                                      "aria-labelledby": row.id,
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
                                                      style: {
                                                        overflow: "visible",
                                                      },
                                                    }}
                                                    sx={{
                                                      boxShadow: "0px",
                                                      "& .MuiList-root.MuiMenu-list":
                                                      {
                                                        pt: "8px",
                                                        pb: "15px",
                                                        pr: "10px",
                                                        pl: "10px",
                                                      },
                                                    }}
                                                  >
                                                    <Button
                                                      variant="contained"
                                                      color="primary"
                                                      size="small"
                                                      className=""
                                                      onClick={() => {
                                                        goToUpgrade();
                                                      }}
                                                      startIcon={
                                                        <UpgradeOutlinedIcon fontSize="small" />
                                                      }
                                                    >
                                                      Upgrade
                                                    </Button>
                                                  </Menu>
                                                )}

                                                <BootstrapTooltip
                                                  title={Number(getSequenceCount(row.id)) > 0 ? `In ${getSequenceCount(row.id)} Campaign` : `Add to Campaign`}
                                                  placement="top"
                                                >
                                                  <Button
                                                    id={row.id}
                                                    className="customButtonForHover"
                                                    onClick={(event: any) =>
                                                      handleClickAddToSeqListTable(
                                                        event,
                                                        row.id
                                                      )
                                                    }
                                                    disableRipple
                                                    sx={{
                                                      borderColor: "#CACACC",
                                                      backgroundColor:
                                                        "#ffffff",
                                                      color: "#919191",
                                                      borderRightColor:
                                                        "#CACACC !important",
                                                      borderBottomRightRadius:
                                                        "4px !important",
                                                      borderTopRightRadius:
                                                        "4px !important",
                                                      "&:hover": {
                                                        color:
                                                          styles.primaryTextColor,
                                                        backgroundColor:
                                                          "#ffffff",
                                                        borderRightColor:
                                                          "#146EF6 !important",
                                                      },
                                                    }}
                                                  >
                                                    <SendOutlinedIcon className="fs-16" />
                                                    {getSequenceCount(row.id)}
                                                    {/* <ArrowDropDownIcon
                                                      sx={{
                                                        fontSize: "16px",
                                                      }}
                                                    /> */}
                                                  </Button>
                                                </BootstrapTooltip>
                                                {settingIds[110007] &&
                                                  adminIds[20024] &&
                                                  userLocalData.getvalue(
                                                    "paymentType"
                                                  ) !== 1 ? (
                                                  <Menu
                                                    id={`${row.id}`}
                                                    anchorEl={tableListSeqanchorEl[row.id] || null}
                                                    open={Boolean(tableListSeqanchorEl[row.id])}
                                                    onClose={(e, value) =>
                                                      handleAddToSeqListTableClose(
                                                        e,
                                                        value,
                                                        row,
                                                        "isFromAutosave"
                                                      )
                                                    }
                                                    MenuListProps={{
                                                      "aria-labelledby": row.id,
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
                                                      style: {
                                                        overflow: "visible",
                                                      },
                                                    }}
                                                    sx={{
                                                      boxShadow: "0px",
                                                      "& .MuiList-root.MuiMenu-list":
                                                      {
                                                        pt: "8px",
                                                        pb: "15px",
                                                        pr: "10px",
                                                        pl: "10px",
                                                      },
                                                    }}
                                                  >
                                                    <Box>
                                                      <Stack mb={1} sx={{
                                                        "& .MuiButton-root": {
                                                          border: "none !important",
                                                          justifyContent: "space-between !important",
                                                          textTransform: "capitalize",
                                                        }
                                                      }}>
                                                        {getSequenceName(
                                                          row.id
                                                        ).map((item: any) => (
                                                          <Button
                                                            size="small"
                                                            endIcon={<CloseRoundedIcon fontSize="small" />}
                                                            color="inherit"
                                                            key={item}
                                                            onClick={() => {
                                                              confirmDialog(`Are you sure, you want to delete Campaign - ${item.name}?`, () => {
                                                                !isContact() ? deleteSequence(row.userId, item.id) : deleteContactSequence(row.contId, item.id);
                                                                setAddToTableListAnchorEl((prev: any) => ({
                                                                  ...prev,
                                                                  [row.id]: null
                                                                }));
                                                                setTableListSeqAnchorEl((prev: any) => ({
                                                                  ...prev,
                                                                  [row.id]: null,
                                                                }));

                                                              })
                                                            }}
                                                          // className="seq-select-option"
                                                          >
                                                            {item.name}
                                                          </Button>
                                                        ))}
                                                      </Stack>

                                                      {/* <Button
                                                      variant="contained"
                                                      className="seq-add-to-list-btn"
                                                      sx={{ textTransform: 'capitalize' }}
                                                      onClick={() => handleClickOpenTableSequenceModal(row.id)}
                                                      startIcon={<PlaylistAddOutlinedIcon />}
                                                    >
                                                      Add To List
                                                    </Button> */}

                                                      <Autocomplete
                                                        disablePortal
                                                        disableClearable
                                                        onChange={(e, value) =>
                                                          handleAddToSeqListTableClose(
                                                            e,
                                                            value,
                                                            row,
                                                            "isFromAutosave"
                                                          )
                                                        }
                                                        id="combo-box-demo"
                                                        options={seqOptions}
                                                        getOptionLabel={(
                                                          option: any
                                                        ) =>
                                                          option.sequenceName
                                                        }
                                                        sx={{
                                                          width: "259px",
                                                          height: "30px",
                                                          "& .MuiOutlinedInput-root":
                                                          {
                                                            p: 0,
                                                          },
                                                          "& .MuiAutocomplete-popupIndicator":
                                                          {
                                                            transform:
                                                              "unset",
                                                            color: "#737373",
                                                            "& .MuiTouchRipple-root":
                                                            {
                                                              display:
                                                                "none",
                                                            },
                                                            "&:hover": {
                                                              backgroundColor:
                                                                "#ffffff",
                                                            },
                                                          },
                                                        }}
                                                        PaperComponent={({
                                                          children,
                                                        }) => (
                                                          <Paper className="pool-paper">
                                                            {children}
                                                          </Paper>
                                                        )}
                                                        renderOption={(
                                                          props,
                                                          option: {
                                                            sequenceName: string;
                                                          } | null
                                                        ) => (
                                                          <li
                                                            {...props}
                                                            style={{
                                                              color: "#1A1A1A",
                                                              fontSize: "14px",
                                                              fontWeight: 600,
                                                              fontFamily:
                                                                'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                                              marginLeft:
                                                                "10px",
                                                              marginRight:
                                                                "10px",
                                                            }}
                                                            onMouseEnter={(
                                                              e: any
                                                            ) => {
                                                              e.target.style.backgroundColor =
                                                                "#F7F7F7";
                                                            }}
                                                            onMouseLeave={(
                                                              e: any
                                                            ) => {
                                                              e.target.style.backgroundColor =
                                                                "unset";
                                                            }}
                                                          >
                                                            {option
                                                              ? option.sequenceName
                                                              : ""}
                                                          </li>
                                                        )}
                                                        renderInput={(
                                                          params
                                                        ) => (
                                                          <TextField className="campaignList"
                                                            {...params}
                                                            placeholder="Select / Type to Campaign list"
                                                          // onChange={handlePoolChange}
                                                          />
                                                        )}
                                                      />
                                                    </Box>
                                                  </Menu>
                                                ) : (
                                                  <Menu
                                                    id={`${row.id}`}
                                                    anchorEl={tableListSeqanchorEl[row.id] || null}
                                                    open={Boolean(tableListSeqanchorEl[row.id])}
                                                    onClose={() =>
                                                      setTableListSeqAnchorEl((prev: any) => ({
                                                        ...prev,
                                                        [row.id]: null,
                                                      }))
                                                    }
                                                    MenuListProps={{
                                                      "aria-labelledby": row.id,
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
                                                      style: {
                                                        overflow: "visible",
                                                      },
                                                    }}
                                                    sx={{
                                                      boxShadow: "0px",
                                                      "& .MuiList-root.MuiMenu-list":
                                                      {
                                                        pt: "8px",
                                                        pb: "15px",
                                                        pr: "10px",
                                                        pl: "10px",
                                                      },
                                                    }}
                                                  >
                                                    <Button
                                                      variant="contained"
                                                      color="primary"
                                                      size="small"
                                                      className=""
                                                      onClick={() => {
                                                        goToUpgrade();
                                                      }}
                                                      startIcon={
                                                        <UpgradeOutlinedIcon fontSize="small" />
                                                      }
                                                    >
                                                      Upgrade
                                                    </Button>
                                                  </Menu>
                                                )}
                                              </ButtonGroup>
                                            </Stack>
                                          ) : (
                                            <>
                                              <Stack
                                                key={row.id}
                                                sx={{ ml: 1 }}
                                                className="access-contact-block"
                                              >
                                                {
                                                  savedRecords.includes(row.id)
                                                    // || parentCheckedRowIds.includes(row.id)
                                                    ? (
                                                      <Button className="access-contact"
                                                        variant="contained"
                                                        disableRipple
                                                      // onClick={() => saveToSingleRecord(row.id)}
                                                      >
                                                        {isRecordSavedAccuick
                                                          ? "Saved"
                                                          : "Not Saved"}
                                                        {/* {savedRecords.includes(row.id) ? 'Saved' : 'Save to Accuick'} */}
                                                        {/* {(apiLoading && savedRecords === row.id) && <CircularProgress size={15} sx={{
                                              color: "#ffffff",
                                              ml: "10px"
                                            }} />} */}
                                                      </Button>
                                                    ) :
                                                    <>
                                                      <Button
                                                        variant="contained"
                                                        className="access-contact fs-14"
                                                        style={{ justifyContent: 'space-around' }}
                                                        disableRipple
                                                        endIcon={
                                                          <ExpandMoreIcon />
                                                        }
                                                        onClick={(event: any) =>
                                                          handleOpenContact(
                                                            event,
                                                            row
                                                          )
                                                        }
                                                      >
                                                        Access Contact
                                                        {/* {savedRecords.includes(row.id) ? 'Saved' : 'Save to Accuick'} */}
                                                      </Button>
                                                      <Menu
                                                        id={row.id}
                                                        anchorEl={contactMenu}
                                                        open={
                                                          openContactMenu &&
                                                          selectedRowId ===
                                                          `${row.id}`
                                                        }
                                                        onClose={() =>
                                                          handleCloseContactMenu(
                                                            "",
                                                            null
                                                          )
                                                        }
                                                        anchorOrigin={{
                                                          vertical: "bottom",
                                                          horizontal: "center",
                                                        }}
                                                        transformOrigin={{
                                                          vertical: "top",
                                                          horizontal: "center",
                                                        }}
                                                        MenuListProps={{
                                                          "aria-labelledby":
                                                            row.id,
                                                        }}
                                                        sx={{
                                                          "& .MuiPaper-root.MuiMenu-paper.MuiPopover-paper":
                                                          {
                                                            minWidth: "160px",
                                                            "& .MuiPaper-root.MuiMenu-paper.MuiPopover-paper":
                                                            {
                                                              overflowX:
                                                                "hidden",
                                                              border:
                                                                "#D9D9D9 1px solid",
                                                              boxShadow:
                                                                "0px 0px 0px 0px",
                                                            },
                                                            "& .MuiList-root.MuiMenu-list":
                                                            {
                                                              pt: 0,
                                                              mb: 0,
                                                              mr: 0,
                                                              pb: 0,
                                                            },
                                                          },
                                                        }}
                                                      >
                                                        {profileCredits !== 0 && profileCredits !== consumedCredits ? <MenuItem
                                                          sx={{
                                                            "&.MuiButtonBase-root.MuiMenuItem-root":
                                                            {
                                                              pr: "8px",
                                                              pl: "8px",
                                                              mr: "0px !important",
                                                            },

                                                            width: "100%",
                                                          }}
                                                          disableRipple
                                                          onClick={() =>
                                                            setContactMenu(null)
                                                          }
                                                        >
                                                          <div
                                                            style={{
                                                              display: "flex",
                                                              justifyContent: "space-between",
                                                              width: "100%",
                                                            }}
                                                          >
                                                            <span>Email</span>
                                                            {row.recommended_personal_email && typeof row.recommended_personal_email == "string" ? <Button
                                                              variant="contained"
                                                              id={`${row.id}`}
                                                              className="viewButton tt-capital fw-7 fs-14"
                                                              onClick={() => {
                                                                if (isContact()) {
                                                                  handleCloseContactMenu(
                                                                    "email",
                                                                    row
                                                                  )
                                                                } else {
                                                                  saveToSingleRecord(row, 'email');
                                                                }
                                                              }}
                                                            >
                                                              View
                                                            </Button> : <span>N/A</span>}

                                                          </div>
                                                        </MenuItem> :
                                                          <MenuItem
                                                            sx={{
                                                              "&.MuiButtonBase-root.MuiMenuItem-root":
                                                              {
                                                                pr: "8px",
                                                                pl: "8px",
                                                                mr: "0px !important",
                                                              },

                                                              width: "100%",
                                                            }}
                                                            disableRipple
                                                            onClick={() =>
                                                              setContactMenu(null)
                                                            }
                                                          >
                                                            <div
                                                              style={{
                                                                display: "flex",
                                                                justifyContent:
                                                                  "space-between",
                                                                width: "100%",
                                                              }}
                                                            >
                                                              <span>Email</span>

                                                              <Button
                                                                variant="contained"
                                                                color="primary"
                                                                size="small"
                                                                className=""
                                                                onClick={() => {
                                                                  goToUpgrade();
                                                                }}
                                                                startIcon={
                                                                  <UpgradeOutlinedIcon fontSize="small" />
                                                                }
                                                              >
                                                                Upgrade
                                                              </Button>

                                                            </div>
                                                          </MenuItem>}

                                                        <MenuItem
                                                          sx={{
                                                            "&.MuiButtonBase-root.MuiMenuItem-root":
                                                            {
                                                              pr: "8px",
                                                              pl: "8px",
                                                              mr: "0px !important",
                                                            },

                                                            width: "100%",
                                                          }}
                                                          disableRipple
                                                          onClick={() => {

                                                            setContactMenu(null)
                                                          }

                                                          }
                                                        >
                                                          <div
                                                            style={{
                                                              display: "flex",
                                                              justifyContent:
                                                                "space-between",
                                                              width: "100%",
                                                            }}
                                                          >
                                                            <span>Mobile</span>

                                                            {row.mobile_phone ? recrData.paymentType &&
                                                              parseInt(recrData.paymentType) <= 2 || (smsCredits > 0 && smsCredits === consumedSmsCredits) ? (
                                                              <Button
                                                                variant="contained"
                                                                color="primary"
                                                                size="small"
                                                                className=""
                                                                onClick={() => {
                                                                  goToUpgrade();
                                                                }}
                                                                startIcon={
                                                                  <UpgradeOutlinedIcon fontSize="small" />
                                                                }
                                                              >
                                                                Upgrade
                                                              </Button>
                                                            ) : <Button
                                                              variant="contained"
                                                              color="primary"
                                                              id={`${row.id}`}
                                                              className="viewButton tt-capital fw-7 fs-14"
                                                              onClick={() => {
                                                                if (isContact()) {
                                                                  handleCloseContactMenu(
                                                                    "phone",
                                                                    row
                                                                  )
                                                                } else {
                                                                  saveToSingleRecord(row, 'phone');
                                                                }
                                                              }}
                                                            >
                                                              View
                                                            </Button> : <span>N/A</span>}
                                                          </div>
                                                        </MenuItem>
                                                        {row.recommended_personal_email && typeof row.recommended_personal_email == "string" && row.mobile_phone && <MenuItem
                                                          sx={{
                                                            "&.MuiButtonBase-root.MuiMenuItem-root":
                                                            {
                                                              pr: "8px",
                                                              pl: "8px",
                                                              mr: "0px !important",
                                                            },

                                                            width: "100%",
                                                          }}
                                                          disableRipple
                                                          onClick={() => {
                                                            setContactMenu(null)
                                                          }}
                                                        >
                                                          <div
                                                            style={{
                                                              display: "flex",
                                                              justifyContent: "space-between",
                                                              width: "100%",
                                                            }}
                                                          >
                                                            <span>Both</span>
                                                            {recrData.paymentType &&
                                                              parseInt(recrData.paymentType) <= 2 ? (
                                                              <Button
                                                                variant="contained"
                                                                color="primary"
                                                                size="small"
                                                                className=""
                                                                onClick={() => {
                                                                  goToUpgrade();
                                                                }}
                                                                startIcon={
                                                                  <UpgradeOutlinedIcon fontSize="small" />
                                                                }
                                                              >
                                                                Upgrade
                                                              </Button>
                                                            ) : <Button
                                                              variant="contained"
                                                              color="primary"
                                                              size="small"
                                                              className="viewButton tt-capital fw-7 fs-14"
                                                              onClick={() => {
                                                                if (isContact()) {
                                                                  handleCloseContactMenu(
                                                                    "both",
                                                                    row
                                                                  );
                                                                } else {
                                                                  saveToSingleRecord(row, 'both');
                                                                }
                                                              }}

                                                            >
                                                              View
                                                            </Button>}
                                                          </div>
                                                        </MenuItem>}
                                                      </Menu>
                                                    </>
                                                }
                                              </Stack>
                                            </>
                                          )}
                                        </TableCell>
                                      )}
                                    </>
                                  )
                                )}

                              {/* Title column */}

                              {/* <TableCell sx={{ fontSize: '14px', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontWeight: 400, color: '#1A1A1A', }}>10</TableCell> */}

                              {/* Company Column */}
                              {/* {isMainTableLayoutCompany && ( */}

                              {/* )} */}

                              {/* <TableCell sx={{ fontSize: '14px', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontWeight: 400, color: '#1A1A1A', }}>10,000</TableCell> */}

                              {/* Industry column */}
                              {/* {isMainTableLayoutIndustry && ( */}

                              {/* )} */}
                              {/* Location */}

                              {/* {isMainTableLayoutLocation && ( */}

                              {/* )} */}
                              {/* Quick actions column */}
                              {/* {isMainTableLayoutActions && ( */}

                              {/* )} */}
                              {/*<TableCell sx={{ fontFamily: 'Segoe UI' }}>{row.employe}</TableCell>
        <TableCell sx={{ fontFamily: 'Segoe UI' }}>{row.industry}</TableCell>
        <TableCell sx={{ fontFamily: 'Segoe UI' }}>{row.keywords}</TableCell>
        <TableCell sx={{ fontFamily: 'Segoe UI' }}>{row.contactstage}</TableCell>
        <TableCell sx={{ fontFamily: 'Segoe UI' }}>{row.contactla}</TableCell>
        <TableCell sx={{ fontFamily: 'Segoe UI' }}>{row.contactown}</TableCell>
        <TableCell sx={{ fontFamily: 'Segoe UI' }}>{row.contactL}</TableCell> */}
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={7}
                              sx={{
                                textAlign: "center",
                                color: "#919191",
                                borderBottomColor: "rgb(192 192 192)",
                              }}
                            >
                              No data available.
                            </TableCell>
                          </TableRow>
                        )}
                      </>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : loading ? (
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  textAlign: "center",
                  alignContent: "center",
                }}
              >
                <CircularProgress className="c-lightblue" />
              </div>
            ) : (
              <Stack
                sx={{
                  height: "400px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img className="mb-15"
                  src={searchIconColored}
                  alt=""
                />
                <Typography className="contactText fs-18 fw-6" sx={{ color: "#474747" }}>
                  Start your people search by applying any filters in filter
                  panel.
                </Typography>
              </Stack>
            )}

            {/* {Pagination Part} */}
            {isSaved ? (
              <>
                {totalSavedRecords && searchData.displayData.length > 0 ? (
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      mt: "2px",
                      borderTop: "1px solid rgb(192 192 192)",
                    }}
                    pt={1}
                    pb={1}
                  >
                    <Typography
                      component="p"
                      sx={{
                        padding: "0 10px",
                        height: "17px",
                        fontSize: "12px",
                      }}
                    >
                      {" "}
                      {displayText}
                    </Typography>

                    <ButtonGroup
                      sx={{
                        height: "24px",
                        "& .MuiButtonGroup-grouped": {
                          minWidth: "25px !important",
                          marginRight: "1px",
                        },
                        fontFamily:
                          'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                      }}
                      disableRipple
                    >
                      <Button
                        sx={{
                          borderColor: "#CACACC",
                          backgroundColor: "#ffffff",
                          color: "#737373",
                          cursor: page === 0 ? "not-allowed" : "pointer",
                          padding: "1px",
                          "&:hover": {
                            borderColor:
                              page !== 0 ? styles.primaryTextColor : "#CACACC",
                            backgroundColor: "#ffffff",
                            "&:not(:last-child):hover": {
                              borderRightColor:
                                page !== 0
                                  ? styles.primaryTextColor
                                  : "#CACACC",
                            },
                          },
                        }}
                        disabled={page === 0}
                        onClick={() => handlePageChange(page - 1)}
                      >
                        <ArrowLeftOutlinedIcon />
                      </Button>
                      <Button
                        id="pagination-btn"
                        aria-controls={
                          openPaginationBtn ? "pagination-btn-menu" : undefined
                        }
                        aria-haspopup="true"
                        aria-expanded={openPaginationBtn ? "true" : undefined}
                        sx={{
                          borderColor: "#CACACC",
                          color: "#474747",
                          fontSize: "13px",
                          width: "55px",
                          fontWeight: "400",
                          backgroundColor: "#ffffff",
                          "&:hover": {
                            backgroundColor: "#ffffff",
                            borderColor: styles.primaryTextColor,
                            "&:not(:last-child):hover": {
                              borderRightColor: styles.primaryTextColor,
                            },
                          },
                        }}
                        onClick={handlePagination}
                      >
                        {page + 1}
                        <ArrowDropDownIcon sx={{ color: "#737373" }} />
                      </Button>
                      <Menu
                        id="pagination-btn-menu"
                        anchorEl={pagination}
                        open={openPaginationBtn}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "pagination-btn",
                        }}
                        sx={{
                          width: "200px",
                          color: "#474747",
                          height: "250px",
                          "& .MuiPaper-root.MuiMenu-paper.MuiPopover-paper": {
                            overflowX: "hidden",
                            border: "#D9D9D9 1px solid",
                            boxShadow: "0px 0px 0px 0px",
                          },
                          "& .MuiList-root.MuiMenu-list": {
                            pt: 0,
                            mb: 1,
                            mr: 1,
                          },
                        }}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                        transformOrigin={{
                          vertical: "bottom",
                          horizontal: "center",
                        }}
                      >
                        {mynumber.map((pageNumber) => (
                          <MenuItem
                            sx={{
                              "&.MuiButtonBase-root.MuiMenuItem-root": {
                                pr: "8px",
                                pl: "8px",
                                mr: "8px !important",
                              },
                              "&:hover": {
                                backgroundColor: "#146EF6",
                                color: "#ffffff",
                                mr: "8px !important",
                              },
                            }}
                            disableRipple
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber - 1)}
                          >
                            {pageNumber}
                          </MenuItem>
                        ))}
                        {/* {Array.from({ length: totalPages }, (_, index) => {
                  const pageNumber = index;
                  const displayNumber = index + 1;
                  return (
                    <MenuItem sx={{
                      '&:hover': {
                        backgroundColor: '#146EF6',
                        color: '#ffffff'
                      }}} disableRipple key={pageNumber} onClick={() => handlePageChange(pageNumber)}>
                      {displayNumber}
                    </MenuItem>
                  );
                })} */}
                      </Menu>

                      <Button
                        sx={{
                          borderColor: "#CACACC",
                          backgroundColor: "#ffffff",
                          color: "#737373",
                          cursor:
                            (page + 1) * rowsPerPage >= totalSavedRecords ||
                              page + 1 >= 100
                              ? "not-allowed"
                              : "pointer",
                          padding: "1px",
                          "&:hover": {
                            backgroundColor: "#ffffff",
                            borderColor:
                              (page + 1) * rowsPerPage >= totalSavedRecords ||
                                page + 1 >= 100
                                ? "#CACACC"
                                : styles.primaryTextColor,
                          },
                        }}
                        disabled={lastPageNumber === page}
                        onClick={() => {
                          if (
                            (page + 1) * rowsPerPage >= totalSavedRecords ||
                            page + 1 >= 100
                          ) {
                            return false;
                          }
                          handlePageChange(page + 1);
                        }}
                      >
                        <ArrowRightOutlinedIcon />
                      </Button>
                    </ButtonGroup>
                  </Stack>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <>
                {totalRecords && searchData.displayData.length > 0 ? (
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      mt: "2px",
                      borderTop: "1px solid rgb(192 192 192)",
                    }}
                    pt={1}
                    pb={1}
                  >
                    <Typography
                      component="p"
                      sx={{
                        padding: "0 10px",
                        height: "17px",
                        fontSize: "12px",
                      }}
                    >
                      {" "}
                      {searchData.displayData.length ? `${displayText}` : ""}
                    </Typography>

                    <ButtonGroup
                      sx={{
                        height: "24px",
                        "& .MuiButtonGroup-grouped": {
                          minWidth: "25px !important",
                          marginRight: "1px",
                        },
                        fontFamily:
                          'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                      }}
                      disableRipple
                    >
                      <Button
                        sx={{
                          borderColor: "#CACACC",
                          backgroundColor: "#ffffff",
                          color: "#737373",
                          cursor: page === 0 ? "not-allowed" : "pointer",
                          padding: "1px",
                          "&:hover": {
                            borderColor:
                              page !== 0 ? styles.primaryTextColor : "#CACACC",
                            backgroundColor: "#ffffff",
                            "&:not(:last-child):hover": {
                              borderRightColor:
                                page !== 0
                                  ? styles.primaryTextColor
                                  : "#CACACC",
                            },
                          },
                        }}
                        onClick={() => handlePageChange(page - 1)}
                      >
                        <ArrowLeftOutlinedIcon />
                      </Button>
                      <Button
                        id="pagination-btn"
                        aria-controls={
                          openPaginationBtn ? "pagination-btn-menu" : undefined
                        }
                        aria-haspopup="true"
                        aria-expanded={openPaginationBtn ? "true" : undefined}
                        sx={{
                          borderColor: "#CACACC",
                          color: "#474747",
                          fontSize: "13px",
                          width: "55px",
                          fontWeight: "400",
                          backgroundColor: "#ffffff",
                          "&:hover": {
                            backgroundColor: "#ffffff",
                            borderColor: styles.primaryTextColor,
                            "&:not(:last-child):hover": {
                              borderRightColor: styles.primaryTextColor,
                            },
                          },
                        }}
                        onClick={handlePagination}
                      >
                        {page + 1}
                        <ArrowDropDownIcon sx={{ color: "#737373" }} />
                      </Button>
                      <Menu
                        id="pagination-btn-menu"
                        anchorEl={pagination}
                        open={openPaginationBtn}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "pagination-btn",
                        }}
                        sx={{
                          width: "200px",
                          color: "#474747",
                          height: "250px",
                          "& .MuiPaper-root.MuiMenu-paper.MuiPopover-paper": {
                            overflowX: "hidden",
                            border: "#D9D9D9 1px solid",
                            boxShadow: "0px 0px 0px 0px",
                          },
                          "& .MuiList-root.MuiMenu-list": {
                            pt: 0,
                            mb: 1,
                            mr: 1,
                          },
                        }}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                        transformOrigin={{
                          vertical: "bottom",
                          horizontal: "center",
                        }}
                      >
                        {mynumber.map((pageNumber) => (
                          <MenuItem
                            sx={{
                              "&.MuiButtonBase-root.MuiMenuItem-root": {
                                pr: "8px",
                                pl: "8px",
                              },
                              "&:hover": {
                                backgroundColor: "#146EF6",
                                color: "#ffffff",
                                mr: "8px !important",
                              },
                            }}
                            disableRipple
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber - 1)}
                          >
                            {pageNumber}
                          </MenuItem>
                        ))}
                      </Menu>

                      <Button
                        sx={{
                          borderColor: "#CACACC",
                          backgroundColor: "#ffffff",
                          color: "#737373",
                          cursor:
                            (page + 1) * rowsPerPage >= totalRecords ||
                              page + 1 >= 100
                              ? "not-allowed"
                              : "pointer",
                          padding: "1px",
                          "&:hover": {
                            backgroundColor: "#ffffff",
                            borderColor:
                              (page + 1) * rowsPerPage >= totalRecords ||
                                page + 1 >= 100
                                ? "#CACACC"
                                : styles.primaryTextColor,
                          },
                        }}
                        disabled={lastPageNumber === page}
                        onClick={() => {
                          if (
                            (page + 1) * rowsPerPage >= totalRecords ||
                            page + 1 >= 100
                          ) {
                            return false;
                          }
                          handlePageChange(page + 1);
                        }}
                      >
                        <ArrowRightOutlinedIcon />
                      </Button>
                    </ButtonGroup>
                  </Stack>
                ) : (
                  <></>
                )}
              </>
            )}

            {/* <TablePagination
            sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
          </Stack>

          {/* <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            borderBottom: "1px #CACACC solid",
            borderRight: "1px #CACACC solid",
            borderLeft: "1px #CACACC solid",
            padding: "0",
            width: "99%",
            fontFamily: 'Segoe UI'
          }}
          p={1}
        >
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
            colSpan={3}
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: {
                "aria-label": "rows per page",
              },
              native: true,
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </Stack> */}
        </Stack>
      )}

      {/* Card View */}

      {isCardView && (
        <Stack>
          <>
            {loading ? (
              <Box
                className="cards-parent"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress className="c-lightblue" />
              </Box>
            ) : (
              <Stack className="cards-parent" sx={{ overflowY: "auto" }}>
                {searchData.displayData.length > 0 ? (
                  searchData.displayData.map((row: any, index: any) => (
                    <Stack key={index} sx={{ padding: "8px" }}>
                      <Card
                        sx={{
                          width: "100%",
                          // minHeight: "266px",
                          boxShadow: "0px 2px 9px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <Stack sx={{ padding: "16px 20px" }}>
                          <Stack
                            direction="row"
                            sx={{ justifyContent: "space-between" }}
                          >
                            <Stack direction="row">
                              <Stack
                                sx={{
                                  // minWidth: "150px",
                                  display: "flex",
                                  flexDirection: "row",
                                  // justifyContent: "center",
                                  // alignItems: "center",
                                }}
                              >
                                <Stack>
                                  <BpCheckboxContainer>
                                    <Checkbox
                                      sx={{
                                        padding: "0px !important",
                                        marginRight: "12px",
                                        marginTop: "2px",
                                      }}
                                      className="bp-checkbox"
                                      disableRipple
                                      checkedIcon={
                                        <BpCheckedIcon
                                          // className="bp-icon"
                                          style={{
                                            borderColor:
                                              styles.primaryTextColor,
                                          }}
                                        />
                                      }
                                      icon={<BpIcon className="bp-icon" />}
                                      // checked={checked[index]}
                                      // checked={(checkBoxChecked.includes(row.id)) ? true : false}
                                      checked={
                                        selectAllClicked
                                          ? checkBoxChecked.includes(row.id)
                                            ? false
                                            : true
                                          : (!selectAllClicked &&
                                            checked[index]) ||
                                          false
                                      }
                                      onClick={() =>
                                        handleCheckboxClick(index, row.id, row)
                                      }
                                    />
                                  </BpCheckboxContainer>
                                </Stack>
                                {/* <Stack
                                  sx={{
                                    height: "70px",
                                    width: "70px",
                                    borderRadius: "40px",
                                    backgroundColor: "#E7F0FE",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  {row?.first_name && (
                                    <Typography
                                      sx={{
                                        fontFamily:
                                          'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                        fontSize: "26px",
                                        fontWeight: "700",
                                        color: "#BAC8DE",
                                        textTransform: "capitalize",
                                      }}
                                    >
                                      {row?.first_name[0]}
                                    </Typography>
                                  )}
                                  {row?.last_name && (
                                    <Typography
                                      sx={{
                                        fontFamily:
                                          'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                        fontSize: "32px",
                                        fontWeight: "700",
                                        color: "#BAC8DE",
                                        textTransform: "capitalize",
                                      }}
                                    >
                                      {row?.last_name[0]}
                                    </Typography>
                                  )}
                                </Stack> */}
                              </Stack>
                              <Stack sx={{ marginLeft: "12px" }}>
                                <Stack
                                  direction="row"
                                  spacing={1.0}
                                  sx={{
                                    alignItems: "center",
                                    marginBottom: "8px",
                                  }}
                                >
                                  <Typography
                                    onClick={() => checkIsRecordExists(row)}
                                    sx={{
                                      fontFamily:
                                        'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                      fontSize: "14px",
                                      fontWeight: "600",
                                      color: "#146ef6",
                                      textTransform: "capitalize",
                                      "&:hover": {
                                        textDecoration: "underline",
                                        cursor: "pointer",
                                      },
                                    }}
                                  >
                                    {row.first_name} {row.last_name}
                                  </Typography>
                                  {row.linkedin_url &&
                                    typeof row.linkedin_url === "string" && (
                                      <Box sx={{ marginTop: "2px !important" }}>
                                        <BootstrapTooltip
                                          title={"https://" + row.linkedin_url}
                                          placement="bottom"
                                        >
                                          <Link
                                            href={"https://" + row.linkedin_url}
                                            target="_blank"
                                          >
                                            <LinkedInIcon
                                              sx={{
                                                color: "#919191",
                                                fontSize: "20px",
                                                "&:hover": {
                                                  color:
                                                    styles.primaryTextColor,
                                                },
                                              }}
                                            />
                                          </Link>
                                        </BootstrapTooltip>
                                      </Box>
                                    )}
                                </Stack>
                                {row.job_title && (
                                  <Stack
                                    direction="row"
                                    spacing={1.0}
                                    sx={{
                                      alignItems: "center",
                                      padding: "4px 0px",
                                    }}
                                  >
                                    <img src={briefcaseIcon} alt="" />
                                    <Typography
                                      sx={{
                                        fontFamily:
                                          'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                        fontSize: "14px",
                                        fontWeight: "400",
                                        color: "#474747",
                                        textTransform: "capitalize",
                                      }}
                                    >
                                      {`${row.job_title} ${row.job_company_website
                                        ? `@${row.job_company_website}`
                                        : ""
                                        }`}
                                    </Typography>
                                  </Stack>
                                )}
                                {row.location_name && (
                                  <Stack
                                    direction="row"
                                    spacing={1.0}
                                    sx={{
                                      alignItems: "center",
                                      padding: "4px 0px",
                                    }}
                                  >
                                    <img src={locationIcon} alt="" />
                                    <Typography
                                      sx={{
                                        fontFamily:
                                          'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                        fontSize: "14px",
                                        fontWeight: "400",
                                        color: "#474747",
                                        textTransform: "capitalize",
                                      }}
                                    >
                                      {row.location_name}
                                    </Typography>
                                  </Stack>
                                )}
                              </Stack>
                            </Stack>
                            <Stack sx={{ alignSelf: "center" }}>
                              {row.userId ? (
                                <Stack key={row.id}>
                                  <ButtonGroup
                                    variant="outlined"
                                    id={row.id}
                                    sx={{
                                      width: "200px",
                                      height: "31px",
                                      "& .MuiButtonGroup-grouped": {
                                        marginRight: "1px",
                                      },
                                    }}
                                  >
                                    {userLocalData.checkIntegration(
                                      400026
                                    ) && <BootstrapTooltip
                                      title={getEmailTitle(row)}
                                      placement="top"
                                    >
                                        <Button
                                          id={`${row.id}`}
                                          disableRipple
                                          onClick={(e) =>
                                            handleTableMail(e, `${row.id}`)
                                          }
                                          aria-controls={
                                            openTableMail &&
                                              selectedRowId === `${row.id}`
                                              ? `${row.id}`
                                              : undefined
                                          }
                                          aria-haspopup="true"
                                          aria-expanded={
                                            openTableMail &&
                                              selectedRowId === `${row.id}`
                                              ? "true"
                                              : undefined
                                          }
                                          sx={{
                                            pointerEvents:
                                              row.recommended_personal_email && typeof row.recommended_personal_email == "string"
                                                ? "auto"
                                                : "none",
                                            borderColor:
                                              openTableMail &&
                                                selectedRowId === `${row.id}`
                                                ? "#146EF6 !important"
                                                : "#CACACC ",
                                            backgroundColor: "#ffffff",
                                            color:
                                              openTableMail &&
                                                selectedRowId === `${row.id}`
                                                ? styles.primaryTextColor
                                                : "#919191",
                                            borderRightColor:
                                              openTableMail &&
                                                selectedRowId === `${row.id}`
                                                ? "#146EF6 !important"
                                                : "#CACACC",
                                            mr: "5px",
                                            "&:hover": {
                                              borderColor:
                                                styles.primaryTextColor,
                                              color: styles.primaryTextColor,
                                              backgroundColor: "#ffffff",
                                            },
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
                                            <MailOutlineOutlinedIcon className="fs-16" />

                                            <Box
                                              sx={{
                                                backgroundColor: "#1DB268",
                                                // display: 'none',
                                                height: "10px",
                                                width: "10px",
                                                borderRadius: "50%",
                                                fontSize: "10px",
                                                display:
                                                  row.recommended_personal_email && typeof row.recommended_personal_email == "string"
                                                    ? "flex"
                                                    : "none",
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
                                                display:
                                                  row.recommended_personal_email && typeof row.recommended_personal_email == "string"
                                                    ? "none"
                                                    : "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                color: "red",
                                                position: "absolute",
                                                top: -2,
                                                right: -2,
                                              }}
                                            >
                                              <CloseRoundedIcon className="fs-8 c-white" />
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
                                              <QuestionMarkRoundedIcon className="fs-8 c-white" />
                                            </Box>
                                          </Box>
                                          <ArrowDropDownIcon className="fs-16" />
                                        </Button>
                                      </BootstrapTooltip>}


                                    <Menu
                                      id={`${row.id}`}
                                      anchorEl={TableMailOpen}
                                      open={
                                        openTableMail &&
                                        selectedRowId === `${row.id}`
                                      }
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
                                        "aria-labelledby": row.id,
                                      }}
                                      sx={{
                                        "& .MuiPaper-root.MuiMenu-paper.MuiPopover-paper":
                                        {
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
                                          <Typography className="contactText fs-16 fw-6 c-black" >
                                            {row.isShowEmail
                                              ? row.recommended_personal_email
                                              : doMaskEmail(
                                                row.recommended_personal_email
                                              )}
                                          </Typography>
                                          {row.isShowEmail ? (
                                            <ContentCopyRoundedIcon className="fs-20 cursor-pointer c-black pl-0.5"
                                              onClick={() =>
                                                Copy.text(`${row.recommended_personal_email}`, 'Email')
                                                // handleShowSnack(
                                                //   row.id,
                                                //   row.recommended_personal_email
                                                // )
                                              }
                                            />
                                          ) : (
                                            <></>
                                          )}
                                        </Stack>

                                        <Typography className="contactText c-green fw-6 fs-14 mb:0.5">
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
                                          <Typography className="contactText fw-4 fs-14 c-black">
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

                                          <Typography className="contactText fw-4 fs-14 c-black">
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
                                          {row.isPackageEmailValidity ==
                                            "EMPTY" ? <Button className="viewButton tt-capital fw-7 fs-14"
                                              variant="contained"
                                              color="primary"
                                              // id={item.id}
                                              disableRipple
                                              onClick={() =>
                                                handleTableMenuSendMaiOpen(
                                                  row.id
                                                )
                                              }
                                            >
                                            Send Email
                                          </Button> : row.isPackageEmailValidity ==
                                            "VIEW" ? (
                                            <Button className="viewButton tt-capital fw-7 fs-14"
                                              variant="outlined"
                                              color="primary"
                                              id={`${row.id}`}
                                              onClick={() => {
                                                handleCloseContactMenu(
                                                  "emailFromMenu",
                                                  row
                                                );
                                              }}
                                            >
                                              View
                                            </Button>
                                          ) : (
                                            <Button className="upgradeButton"
                                              variant="outlined"
                                              onClick={() => {
                                                goToUpgrade();
                                              }}
                                              startIcon={
                                                <UpgradeOutlinedIcon fontSize="small" />
                                              }
                                            >
                                              Upgrade
                                            </Button>
                                          )}
                                        </Stack>
                                      </Stack>
                                    </Menu>
                                    {/* <Modal
                                            id={item.id}
                                            open={tableMenuSendMail[row.id] || false}
                                            onClose={() => handleTableMenuSendMaiClose(row.id)}
                                          >
                                            <Stack
                                              key={row.id}
                                              sx={{
                                                position: 'absolute' as 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%)',
                                                width: 650,
                                                height: 500,
                                                borderRadius: '5px',
                                                bgcolor: 'background.paper',
                                                boxShadow: 24,

                                              }}
                                            >

                                              <SendMailModal
                                                PersonId={row.id}
                                                handleTableMenuSendMaiClose={handleTableMenuSendMaiClose}
                                                PersonMail={row.recommended_personal_email}
                                                showEmailSuccess={showEmailSuccess}
                                                personObj={row}
                                                checkedRowValues={checkedRowIds}
                                                isBulk={false}
                                              />

                                            </Stack>
                                          </Modal> */}
                                    {userLocalData.checkIntegration(
                                      400027
                                    ) && <BootstrapTooltip
                                      title={
                                        <>{getMobileTilte(row, "tooltip")}</>
                                      }
                                      placement="top"
                                    >
                                        <Button
                                          id={`${row.id}`}
                                          disableRipple
                                          onClick={(e) =>
                                            handleTableCall(
                                              e,
                                              `${row.id}`,
                                              row.mobile_phone
                                            )
                                          }
                                          aria-controls={
                                            openTableCall &&
                                              selectedRowId === `${row.id}`
                                              ? `${row.id}`
                                              : undefined
                                          }
                                          aria-haspopup="true"
                                          aria-expanded={
                                            openTableCall &&
                                              selectedRowId === `${row.id}`
                                              ? "true"
                                              : undefined
                                          }
                                          className="customButtonForHover"
                                          sx={{
                                            cursor: row.mobile_phone
                                              ? "pointer"
                                              : "not-allowed",
                                            borderColor:
                                              openTableCall &&
                                                selectedRowId === `${row.id}` &&
                                                row.mobile_phone
                                                ? "#146EF6 !important"
                                                : "#CACACC",
                                            backgroundColor: "#ffffff",
                                            color:
                                              openTableCall &&
                                                selectedRowId === `${row.id}` &&
                                                row.mobile_phone
                                                ? styles.primaryTextColor
                                                : "#919191",
                                            "& .MuiButtonGroup-root .MuiButtonGroup-grouped:not(:last-of-type)":
                                            {
                                              borderRightColor:
                                                openTableCall &&
                                                  selectedRowId === `${row.id}` &&
                                                  row.mobile_phone
                                                  ? styles.primaryTextColor
                                                  : "#CACACC",
                                            },
                                            "&:hover": {
                                              borderColor:
                                                styles.primaryTextColor,
                                              color: styles.primaryTextColor,
                                              backgroundColor: "#ffffff",
                                            },
                                          }}
                                        >
                                          <CallOutlinedIcon
                                            sx={{
                                              fontSize: "16px",
                                            }}
                                          />
                                          <ArrowDropDownIcon className="fs-16" />
                                        </Button>
                                      </BootstrapTooltip>}


                                    <Menu
                                      id={`${row.id}`}
                                      anchorEl={TableCallOpen}
                                      open={
                                        openTableCall &&
                                        selectedRowId === `${row.id}`
                                      }
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
                                        "aria-labelledby": row.id,
                                      }}
                                      sx={{
                                        "& .MuiPaper-root.MuiMenu-paper.MuiPopover-paper":
                                        {
                                          minWidth: "250px",
                                        },
                                      }}
                                    >
                                      <Stack sx={{ mb: 1, p: 1 }}>
                                        <Typography className="contactText fs-12 fw-4"
                                          sx={{
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
                                          <Typography className="contactText fs-14 fw-6"
                                            sx={{
                                              color: "#1A1A1A",
                                            }}
                                          >
                                            {/* `(${row.mobile_phone.slice(2, 5)})-${row.mobile_phone.slice(5, 8)}-${row.mobile_phone.slice(8)}` */}
                                            {getMobileTilte(row, "title")}
                                          </Typography>
                                          {row.isShowPhone ? (
                                            <ContentCopyRoundedIcon className=" fs-20 cursor-pointer"
                                              sx={{
                                                color: "#737373",
                                                pl: 0.5,
                                              }}
                                              onClick={() =>
                                                Copy.text(`${row.mobile_phone}`, 'Number')
                                                // handleShowCallSnack(
                                                //   row.id,
                                                //   row.mobile_phone
                                                // )
                                              }
                                            />
                                          ) : (
                                            <></>
                                          )}
                                        </Box>

                                        {row.isPackagePhoneValidity ==
                                          "EMPTY" ? null : row.isPackagePhoneValidity ==
                                            "VIEW" ? (
                                          <Box sx={{ display: "flex", justifyContent: "center" }}>
                                            <Button
                                              variant="contained"
                                              color="primary"
                                              id={`${row.id}`}
                                              className="viewButton tt-capital fw-7 fs-14"
                                              onClick={() => {
                                                handleCloseContactMenu(
                                                  "phoneFromMenu",
                                                  row
                                                );
                                              }}
                                            >
                                              View
                                            </Button>
                                          </Box>
                                        ) : (
                                          <Box sx={{ display: "flex", justifyContent: "center" }}>

                                            <Button
                                              variant="contained"
                                              color="primary"
                                              size="small"
                                              className=""
                                              sx={{ width: "fit-content", }}
                                              onClick={() => {
                                                goToUpgrade();
                                              }}
                                              startIcon={
                                                <UpgradeOutlinedIcon fontSize="small" />
                                              }
                                            >
                                              Upgrade
                                            </Button>
                                          </Box>
                                        )}
                                      </Stack>

                                      <SmsModal
                                        rowId={row.id}
                                        localData={localData}
                                        openSmsPopup={openSmsPopup}
                                        handleCloseSmsPopup={
                                          handleCloseSmsPopup
                                        }
                                        mobile={
                                          row.mobile_phone
                                            ? row.mobile_phone
                                            : ""
                                        }
                                      />

                                      {/* <Stack
                                                    sx={{ borderBottom: "#F0F0F0" }}
                                                  ></Stack>

                                                  <Stack sx={{ mt: 1, p: 1 }}>
                                                    <Typography
                                                      sx={{
                                                        fontSize: "12px",
                                                        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                                        fontWeight: 400,
                                                        color: "#1A1A1A",
                                                      }}
                                                    >
                                                      Direct Dial (1 Credit)
                                                    </Typography>
                                                    <Typography
                                                      sx={{
                                                        fontSize: "12px",
                                                        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                                        fontWeight: 400,
                                                        color: "#1A1A1A",
                                                        mb: 0.5,
                                                      }}
                                                    >
                                                      ***-***-****
                                                    </Typography>

                                                    <Button
                                                      variant="contained"
                                                      disableRipple
                                                      sx={{
                                                        textTransform: "capitalize",
                                                        backgroundColor: "#146EF6",
                                                        fontWeight: 700,
                                                        fontSize: "14px",
                                                        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                                        color: "#ffffff",
                                                        height: "32px",
                                                        width: "100%",
                                                        whiteSpace: "nowrap",
                                                        boxShadow: "0",
                                                        "&:hover": {
                                                          backgroundColor: "#0852C2",
                                                          color: "#ffffff",
                                                          boxShadow: "0",
                                                        },
                                                      }}
                                                      startIcon={
                                                        <CloudDownloadOutlinedIcon />
                                                      }
                                                    >
                                                      Request Direct Dial
                                                    </Button>
                                                  </Stack> */}
                                    </Menu>


                                    {

                                      <BootstrapTooltip
                                        title={isContact() ? "Add to List" : 'Add to Pool'}
                                        placement="top"
                                      >
                                        <Button
                                          className="customButtonForHover"
                                          id={`${row.id}`}
                                          onClick={(event: any) =>
                                            handleClickAddToListenTable(
                                              event,
                                              row.id
                                            )
                                          }
                                          disableRipple
                                          sx={{
                                            borderColor:
                                              Boolean(addToTableListanchorEl[row.id])
                                                ? "#146EF6 !important"
                                                : "#CACACC",
                                            backgroundColor:
                                              "#ffffff",
                                            color:
                                              Boolean(addToTableListanchorEl[row.id])
                                                ? styles.primaryTextColor
                                                : "#919191",
                                            "&:hover": {
                                              color:
                                                styles.primaryTextColor,
                                              backgroundColor:
                                                "#ffffff",
                                            },
                                          }}
                                        >
                                          {!isContact() ? <PlaylistAddOutlinedIcon className="fs-16" />
                                            : <ListAltOutlinedIcon className="fs-16" />}
                                          {!isContact() ? getPoolCount(row.id) : getListCount(row.id)}
                                        </Button>
                                      </BootstrapTooltip>
                                    }

                                    {((userLocalData.checkIntegration(
                                      400006
                                    ) ||
                                      userLocalData.checkIntegration(
                                        400007
                                      )) &&
                                      userLocalData.adminSettings(
                                        20020
                                      )) || isContact() ? (
                                      <Menu
                                        id={`${row.id}`}
                                        anchorEl={addToTableListanchorEl[row.id] || null}
                                        open={Boolean(addToTableListanchorEl[row.id])}
                                        onClose={(e, value) =>
                                          handleAddToListenTableClose(
                                            e,
                                            value,
                                            row,
                                            "isFromAutosave"
                                          )
                                        }
                                        MenuListProps={{
                                          "aria-labelledby": row.id,
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
                                          style: {
                                            overflow: "visible",
                                          },
                                        }}
                                        sx={{
                                          boxShadow: "0px",
                                          "& .MuiList-root.MuiMenu-list":
                                          {
                                            pt: "8px",
                                            pb: "15px",
                                            pr: "10px",
                                            pl: "10px",
                                          },
                                        }}
                                      >
                                        <Stack mb={1} sx={{
                                          "& .MuiButton-root": {
                                            border: "none !important",
                                            justifyContent: "space-between !important",
                                            textTransform: "capitalize",
                                          }
                                        }}>
                                          {!isContact() ? getPoolName(row.id).map(
                                            (item: any) => (
                                              <Button
                                                size="small"
                                                endIcon={<CloseRoundedIcon fontSize="small" />}
                                                key={item}
                                                onClick={() => {
                                                  confirmDialog(`Are you sure, you want to delete pool - ${item.name}?`, () => {
                                                    deletePool(row.userId, item.id);
                                                    setAddToTableListAnchorEl((prev: any) => ({
                                                      ...prev,
                                                      [row.id]: null
                                                    }));
                                                  })
                                                }}
                                              // className="seq-select-option"
                                              >
                                                {item.name}
                                              </Button>
                                            )
                                          ) : getListNames(row.id).map(
                                            (item: any) => (
                                              <Button
                                                size="small"
                                                endIcon={<CloseRoundedIcon fontSize="small" />}
                                                key={item}
                                                onClick={() => {
                                                  confirmDialog(`Are you sure, you want to delete list - ${item.name}?`, () => {
                                                    deleteList(row.userId, item.id);
                                                    setAddToTableListAnchorEl((prev: any) => ({
                                                      ...prev,
                                                      [row.id]: null
                                                    }));
                                                  })
                                                }}
                                              // className="seq-select-option"
                                              >
                                                {item.name}
                                              </Button>
                                            )
                                          )
                                          }
                                        </Stack>

                                        {/* {JSON.stringify(addTolistOptions)}---- */}
                                        <Autocomplete
                                          disablePortal
                                          disableClearable
                                          onChange={(e, value) =>
                                            handleAddToListenTableClose(
                                              e,
                                              value,
                                              row,
                                              "isFromAutosave"
                                            )
                                          }
                                          id="combo-box-demo"
                                          options={addTolistOptions}
                                          getOptionLabel={(
                                            option: any
                                          ) => !isContact() ? option.label : option.listName}
                                          sx={{
                                            width: "259px",
                                            height: "30px",
                                            "& .MuiOutlinedInput-root":
                                            {
                                              p: 0,
                                            },
                                            "& .MuiAutocomplete-popupIndicator":
                                            {
                                              transform: "unset",
                                              color: "#737373",
                                              "& .MuiTouchRipple-root":
                                              {
                                                display: "none",
                                              },
                                              "&:hover": {
                                                backgroundColor:
                                                  "#ffffff",
                                              },
                                            },
                                          }}
                                          PaperComponent={({
                                            children,
                                          }) => (
                                            <Paper className="pool-paper">
                                              {children}
                                            </Paper>
                                          )}
                                          renderOption={(
                                            props,
                                            option: {
                                              label: string;
                                              listName: string
                                            } | null
                                          ) => (
                                            <li
                                              {...props}
                                              style={{
                                                color: "#1A1A1A",
                                                fontSize: "14px",
                                                fontWeight: 600,
                                                fontFamily:
                                                  'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                                marginLeft: "10px",
                                                marginRight: "10px",
                                              }}
                                              onMouseEnter={(
                                                e: any
                                              ) => {
                                                e.target.style.backgroundColor =
                                                  "#F7F7F7";
                                              }}
                                              onMouseLeave={(
                                                e: any
                                              ) => {
                                                e.target.style.backgroundColor =
                                                  "unset";
                                              }}
                                            >
                                              {option
                                                ? option.label || option.listName
                                                : ""}
                                            </li>
                                          )}
                                          renderInput={(params) => (
                                            <TextField className="campaignList"
                                              {...params}
                                              placeholder={!isContact() ? "Select Pool" : "select List"}
                                              onChange={
                                                handlePoolChange
                                              }
                                            />
                                          )}
                                        />
                                      </Menu>
                                    ) : (
                                      <Menu
                                        id={`${row.id}`}
                                        anchorEl={addToTableListanchorEl[row.id] || null}
                                        open={Boolean(addToTableListanchorEl[row.id])}
                                        onClose={(e, value) =>
                                          handleAddToListenTableClose(
                                            e,
                                            value,
                                            row,
                                            "isFromAutosave"
                                          )
                                        }
                                        MenuListProps={{
                                          "aria-labelledby": row.id,
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
                                          style: {
                                            overflow: "visible",
                                          },
                                        }}
                                        sx={{
                                          boxShadow: "0px",
                                          "& .MuiList-root.MuiMenu-list":
                                          {
                                            pt: "8px",
                                            pb: "15px",
                                            pr: "10px",
                                            pl: "10px",
                                          },
                                        }}
                                      >
                                        <Button
                                          variant="contained"
                                          color="primary"
                                          size="small"
                                          className=""
                                          onClick={() => {
                                            goToUpgrade();
                                          }}
                                          startIcon={
                                            <UpgradeOutlinedIcon fontSize="small" />
                                          }
                                        >
                                          Upgrade
                                        </Button>
                                      </Menu>
                                    )}

                                    <BootstrapTooltip
                                      title={Number(getSequenceCount(row.id)) > 0 ? `In ${getSequenceCount(row.id)} Campaign` : `Add to Campaign`}
                                      placement="top"
                                    >
                                      <Button
                                        id={row.id}
                                        className="customButtonForHover"
                                        onClick={(event: any) =>
                                          handleClickAddToSeqListTable(
                                            event,
                                            row.id
                                          )
                                        }
                                        disableRipple
                                        sx={{
                                          borderColor: "#CACACC",
                                          backgroundColor: "#ffffff",
                                          color: "#919191",
                                          borderRightColor:
                                            "#CACACC !important",
                                          borderBottomRightRadius:
                                            "4px !important",
                                          borderTopRightRadius:
                                            "4px !important",
                                          "&:hover": {
                                            color: styles.primaryTextColor,
                                            backgroundColor: "#ffffff",
                                            borderRightColor:
                                              "#146EF6 !important",
                                          },
                                        }}
                                      >
                                        <SendOutlinedIcon className="fs-16" />
                                        {getSequenceCount(row.id)}
                                        {/* <ArrowDropDownIcon
                                                      sx={{
                                                        fontSize: "16px",
                                                      }}
                                                    /> */}
                                      </Button>
                                    </BootstrapTooltip>

                                    {settingIds[110007] &&
                                      adminIds[20024] &&
                                      userLocalData.getvalue("paymentType") !==
                                      1 ? (
                                      <Menu
                                        id={`${row.id}`}
                                        anchorEl={tableListSeqanchorEl[row.id] || null}
                                        open={Boolean(tableListSeqanchorEl[row.id])}
                                        onClose={(e, value) =>
                                          handleAddToSeqListTableClose(
                                            e,
                                            value,
                                            row,
                                            "isFromAutosave"
                                          )
                                        }
                                        MenuListProps={{
                                          "aria-labelledby": row.id,
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
                                          style: {
                                            overflow: "visible",
                                          },
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
                                        <Box>
                                          <Stack mb={1} sx={{
                                            "& .MuiButton-root": {
                                              border: "none !important",
                                              justifyContent: "space-between !important",
                                              textTransform: "capitalize",
                                            }
                                          }}>
                                            {getSequenceName(row.id).map(
                                              (item: any) => (
                                                <Button
                                                  size="small"
                                                  endIcon={<CloseRoundedIcon />}
                                                  color="inherit"
                                                  key={item}
                                                  onClick={() => {
                                                    confirmDialog(`Are you sure, you want to delete Campaign - ${item.name}?`, () => {
                                                      deleteSequence(row.userId, item.id);
                                                      setAddToTableListAnchorEl((prev: any) => ({
                                                        ...prev,
                                                        [row.id]: null
                                                      }));
                                                      setTableListSeqAnchorEl((prev: any) => ({
                                                        ...prev,
                                                        [row.id]: null,
                                                      }));
                                                    })
                                                  }}
                                                // className="seq-select-option"
                                                >
                                                  {item.name}
                                                </Button>
                                              )
                                            )}
                                          </Stack>

                                          {/* <Button
                                                      variant="contained"
                                                      className="seq-add-to-list-btn"
                                                      sx={{ textTransform: 'capitalize' }}
                                                      onClick={() => handleClickOpenTableSequenceModal(row.id)}
                                                      startIcon={<PlaylistAddOutlinedIcon />}
                                                    >
                                                      Add To List
                                                    </Button> */}

                                          <Autocomplete
                                            disablePortal
                                            disableClearable
                                            onChange={(e, value) =>
                                              handleAddToSeqListTableClose(
                                                e,
                                                value,
                                                row,
                                                "isFromAutosave"
                                              )
                                            }
                                            id="combo-box-demo"
                                            options={seqOptions}
                                            getOptionLabel={(option: any) =>
                                              option.sequenceName
                                            }
                                            sx={{
                                              width: "259px",
                                              height: "30px",
                                              "& .MuiOutlinedInput-root": {
                                                p: 0,
                                              },
                                              "& .MuiAutocomplete-popupIndicator":
                                              {
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
                                            PaperComponent={({ children }) => (
                                              <Paper className="pool-paper">
                                                {children}
                                              </Paper>
                                            )}
                                            renderOption={(
                                              props,
                                              option: {
                                                sequenceName: string;
                                              } | null
                                            ) => (
                                              <li
                                                {...props}
                                                style={{
                                                  color: "#1A1A1A",
                                                  fontSize: "14px",
                                                  fontWeight: 600,
                                                  fontFamily:
                                                    'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                                  marginLeft: "10px",
                                                  marginRight: "10px",
                                                }}
                                                onMouseEnter={(e: any) => {
                                                  e.target.style.backgroundColor =
                                                    "#F7F7F7";
                                                }}
                                                onMouseLeave={(e: any) => {
                                                  e.target.style.backgroundColor =
                                                    "unset";
                                                }}
                                              >
                                                {option
                                                  ? option.sequenceName
                                                  : ""}
                                              </li>
                                            )}
                                            renderInput={(params) => (
                                              <TextField className="campaignList"
                                                {...params}
                                                placeholder="Select / Type to Campaign list"
                                              // onChange={handlePoolChange}
                                              />
                                            )}
                                          />
                                        </Box>
                                      </Menu>
                                    ) : (
                                      <Menu
                                        id={`${row.id}`}
                                        anchorEl={tableListSeqanchorEl[row.id] || null}
                                        open={Boolean(tableListSeqanchorEl[row.id])}
                                        onClose={(e, value) =>
                                          handleAddToSeqListTableClose(
                                            e,
                                            value,
                                            row,
                                            "isFromAutosave"
                                          )
                                        }
                                        MenuListProps={{
                                          "aria-labelledby": row.id,
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
                                          style: {
                                            overflow: "visible",
                                          },
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
                                        <Button
                                          variant="contained"
                                          color="primary"
                                          size="small"
                                          className=""
                                          onClick={() => {
                                            goToUpgrade();
                                          }}
                                          startIcon={
                                            <UpgradeOutlinedIcon fontSize="small" />
                                          }
                                        >
                                          Upgrade
                                        </Button>
                                      </Menu>
                                    )}
                                  </ButtonGroup>
                                </Stack>
                              ) : (
                                <>
                                  <Stack key={row.id}>
                                    {savedRecords.includes(row.id)
                                      //  || parentCheckedRowIds.includes(row.id) 
                                      ? (
                                        <Button
                                          variant="contained"
                                          disableRipple
                                          // onClick={() => saveToSingleRecord(row.id)}
                                          sx={{
                                            // display: 'flex',
                                            // alignItems: "center",
                                            // justifyContent: "center",
                                            // alignSelf: "center",
                                            minWidth: "200px",
                                            height: "30px",
                                            whiteSpace: "nowrap",
                                            textTransform: "capitalize",
                                            backgroundColor: "#146ef6",
                                            boxShadow: 0,
                                            "&:hover": {
                                              backgroundColor: "#0852C2",
                                              boxShadow: 0,
                                            },
                                          }}
                                        >
                                          {isRecordSavedAccuick
                                            ? "Saved"
                                            : "Not Saved"}
                                          {/* {savedRecords.includes(row.id) ? 'Saved' : 'Save to Accuick'} */}
                                          {/* {(apiLoading && savedRecords === row.id) && <CircularProgress size={15} sx={{
                                              color: "#ffffff",
                                              ml: "10px"
                                            }} />} */}
                                        </Button>
                                      ) : (
                                        <>
                                          <Button
                                            variant="contained"
                                            className="access-contact fs-14"
                                            style={{ justifyContent: 'space-around' }}
                                            disableRipple
                                            endIcon={<ExpandMoreIcon />}
                                            onClick={(event: any) =>
                                              handleOpenContact(event, row)
                                            }
                                          >
                                            Access Contact
                                            {/* {savedRecords.includes(row.id) ? 'Saved' : 'Save to Accuick'} */}
                                          </Button>
                                          <Menu className="contactPopup"
                                            id={row.id}
                                            anchorEl={contactMenu}
                                            open={
                                              openContactMenu &&
                                              selectedRowId === `${row.id}`
                                            }
                                            onClose={() =>
                                              handleCloseContactMenu("", null)
                                            }
                                            anchorOrigin={{
                                              vertical: "bottom",
                                              horizontal: "center",
                                            }}
                                            transformOrigin={{
                                              vertical: "top",
                                              horizontal: "center",
                                            }}
                                            MenuListProps={{
                                              "aria-labelledby": row.id,
                                            }}>
                                            <MenuItem
                                              sx={{
                                                "&.MuiButtonBase-root.MuiMenuItem-root":
                                                {
                                                  pr: "8px",
                                                  pl: "8px",
                                                  mr: "0px !important",
                                                },

                                                width: "100%",
                                              }}
                                              disableRipple
                                              onClick={() =>
                                                setContactMenu(null)
                                              }
                                            >
                                              <div
                                                style={{
                                                  display: "flex",
                                                  justifyContent: "space-between",
                                                  width: "100%",
                                                }}
                                              >
                                                <span>Email</span>
                                                {row.recommended_personal_email && typeof row.recommended_personal_email == "string" ? <Button
                                                  variant="contained"
                                                  color="primary"
                                                  id={`${row.id}`}
                                                  className="viewButton tt-capital fw-7 fs-14"
                                                  onClick={() => {
                                                    if (isContact()) {
                                                      handleCloseContactMenu(
                                                        "email",
                                                        row
                                                      )
                                                    } else {
                                                      saveToSingleRecord(row, 'email');
                                                    }
                                                  }}
                                                >
                                                  View
                                                </Button> : <span>N/A</span>}

                                              </div>
                                            </MenuItem>
                                            <MenuItem
                                              sx={{
                                                "&.MuiButtonBase-root.MuiMenuItem-root":
                                                {
                                                  pr: "8px",
                                                  pl: "8px",
                                                  mr: "0px !important",
                                                },

                                                width: "100%",
                                              }}
                                              disableRipple
                                              onClick={() => {

                                                setContactMenu(null)
                                              }}
                                            >
                                              <div
                                                style={{
                                                  display: "flex",
                                                  justifyContent: "space-between",
                                                  width: "100%",
                                                }}
                                              >
                                                <span>Mobile</span>

                                                {row.mobile_phone ? recrData.paymentType &&
                                                  parseInt(recrData.paymentType) <= 2 || (smsCredits > 0 && smsCredits === consumedSmsCredits) ? (
                                                  <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                    className=""
                                                    onClick={() => {
                                                      goToUpgrade();
                                                    }}
                                                    startIcon={
                                                      <UpgradeOutlinedIcon fontSize="small" />
                                                    }
                                                  >
                                                    Upgrade
                                                  </Button>
                                                ) : <Button
                                                  variant="contained"
                                                  color="primary"
                                                  id={`${row.id}`}
                                                  className="viewButton tt-capital fw-7 fs-14"
                                                  onClick={() => {
                                                    if (isContact()) {
                                                      handleCloseContactMenu(
                                                        "phone",
                                                        row
                                                      )
                                                    } else {
                                                      saveToSingleRecord(row, 'phone');
                                                    }
                                                  }}
                                                >
                                                  View
                                                </Button> : <span>N/A</span>}
                                              </div>
                                            </MenuItem>
                                            {row.recommended_personal_email && typeof row.recommended_personal_email == "string" && row.mobile_phone && <MenuItem
                                              sx={{
                                                "&.MuiButtonBase-root.MuiMenuItem-root":
                                                {
                                                  pr: "8px",
                                                  pl: "8px",
                                                  mr: "0px !important",
                                                },

                                                width: "100%",
                                              }}
                                              disableRipple
                                              onClick={() =>
                                                handleCloseContactMenu(
                                                  "",
                                                  null
                                                )
                                              }
                                            >
                                              <div
                                                style={{
                                                  display: "flex",
                                                  justifyContent: "space-between",
                                                  width: "100%",
                                                }}
                                              >
                                                <span>Both</span>
                                                {recrData.paymentType &&
                                                  parseInt(recrData.paymentType) <= 2 ? (
                                                  <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                    className=""
                                                    onClick={() => {
                                                      goToUpgrade();
                                                    }}
                                                    startIcon={
                                                      <UpgradeOutlinedIcon fontSize="small" />
                                                    }
                                                  >
                                                    Upgrade
                                                  </Button>
                                                ) : <Button
                                                  variant="contained"
                                                  color="primary"
                                                  size="small"
                                                  className="viewButton tt-capital fw-7 fs-14"
                                                  onClick={() => {
                                                    handleCloseContactMenu(
                                                      "both",
                                                      row
                                                    );
                                                  }}

                                                >
                                                  View
                                                </Button>}
                                              </div>
                                            </MenuItem>}

                                          </Menu>
                                        </>
                                      )}
                                  </Stack>
                                </>
                              )}
                            </Stack>
                          </Stack>

                          <Divider
                            sx={{ margin: "12px 0px" }}
                            orientation="horizontal"
                          />

                          {row.experience.length > 0 && (
                            <Stack
                              direction="row"
                              spacing={3.0}
                              sx={{
                                alignItems: "flex-start",
                                marginBottom: "8px",
                                marginLeft: "40px",
                              }}
                            >
                              <Stack
                                direction="row"
                                spacing={1.0}
                                sx={{
                                  alignItems: "center",

                                  minWidth: "150px",
                                }}
                              >
                                <img src={briefcaseDarkIcon} alt="" />
                                <Typography className="contactText fs-14 fw-6 c-black">
                                  Work Experience
                                </Typography>
                              </Stack>
                              <Stack>
                                {row.inferred_years_experience && (
                                  <Typography className="contactText fs-14 fw-4 c-grey mb:8" >
                                    {`${row.inferred_years_experience} yrs of total work experience`}
                                  </Typography>
                                )}
                                {row.experience
                                  .slice(
                                    0,
                                    // showMoreEmpHis || 
                                    row.isEmpHisShowMore
                                      ? row.experience?.length
                                      : numberOfEmpHisLinesToShow
                                  )
                                  .map((item: any, index: any) => (
                                    <Stack
                                      key={index}
                                      direction="row"
                                      spacing={1.0}
                                      sx={{
                                        alignItems: "center",
                                        padding: "4px 0px",
                                      }}
                                    >
                                      <Typography className="contactText fs-14 fw-4 c-black tt-capital">
                                        {`${item.title?.name
                                          ? `${item.title?.name}`
                                          : ""
                                          } ${item.company?.website
                                            ? `@${item.company?.website}`
                                            : ""
                                          }`}
                                      </Typography>
                                      {item.start_date && item.end_date && (
                                        <Typography className="contactText fs-14 fw-4 c-grey">
                                          {`(${`${getMonth(
                                            item.start_date
                                          )} ${getYear(
                                            item.start_date
                                          )}`} - ${`${getMonth(
                                            item.end_date
                                          )} ${getYear(
                                            item.end_date
                                          )}`}) - ${getDateDifference(
                                            item.start_date,
                                            item.end_date
                                          )}`}
                                        </Typography>
                                      )}
                                    </Stack>
                                  ))}
                                {row.experience?.length >
                                  numberOfEmpHisLinesToShow && (
                                    <p
                                      style={{
                                        fontFamily:
                                          'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                      }}
                                      className="showMoreLess"
                                      onClick={() => toggleShowMoreEmpHis(row.id)}
                                    >
                                      {
                                        // showMoreEmpHis || 
                                        row.isEmpHisShowMore
                                          ? "Show Less"
                                          : "Show More"}
                                      {!row.isEmpHisShowMore && (
                                        <img
                                          style={{
                                            marginLeft: "6px",
                                            marginTop: "4px",
                                          }}
                                          src={downArrow}
                                          alt=""
                                        />
                                      )}
                                    </p>
                                  )}
                              </Stack>
                            </Stack>
                          )}

                          {getNonEmptyEducation(row.education).length > 0 && (
                            <Stack
                              direction="row"
                              spacing={3.0}
                              sx={{
                                alignItems: "flex-start",
                                marginBottom: "8px",
                                marginLeft: "40px",
                              }}
                            >
                              <Stack
                                direction="row"
                                spacing={1.0}
                                sx={{
                                  alignItems: "center",

                                  minWidth: "150px",
                                }}
                              >
                                <img src={educationIcon} alt="" />
                                <Typography className="contactText fs-14 fw-6 c-black" >
                                  Education
                                </Typography>
                              </Stack>
                              <Stack>
                                {getNonEmptyEducation(row.education)
                                  .slice(
                                    0,
                                    // showMoreEdu || 
                                    row.isEduShowMore
                                      ? getNonEmptyEducation(row.education)
                                        ?.length
                                      : numberOfEduLinesToShow
                                  )
                                  .map(
                                    (item: any, index: any) =>
                                      item.degrees?.length > 0 && (
                                        <Stack
                                          key={index}
                                          direction="row"
                                          spacing={1.0}
                                          sx={{
                                            alignItems: "center",
                                            padding: "4px 0px",
                                          }}
                                        >
                                          <Typography className="contactText fs-14 fw-4 c-black tt-capital">
                                            {`${item.degrees?.join(" , ")}`}
                                          </Typography>
                                          {item.school?.name && (
                                            <Typography className="contactText fs-14 fw-4 c-darkGrey tt-capital"  >
                                              {item.school?.name}
                                            </Typography>
                                          )}
                                          {item.start_date && item.end_date && (
                                            <Typography className="contactText fs-14 fw-4 c-darkGrey">
                                              {`(${`${getMonth(
                                                item.start_date
                                              )} ${getYear(
                                                item.start_date
                                              )}`} - ${`${getMonth(
                                                item.end_date
                                              )} ${getYear(item.end_date)}`})`}
                                            </Typography>
                                          )}
                                        </Stack>
                                      )
                                  )}
                                {getNonEmptyEducation(row.education)?.length >
                                  numberOfEduLinesToShow && (
                                    <p
                                      style={{
                                        fontFamily:
                                          'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                      }}
                                      className="showMoreLess"
                                      onClick={() => toggleShowMoreEdu(row.id)}
                                    >
                                      {
                                        // showMoreEdu || 
                                        row.isEduShowMore
                                          ? "Show Less"
                                          : "Show More"}
                                      {!row.isEduShowMore && (
                                        <img
                                          style={{
                                            marginLeft: "6px",
                                            marginTop: "4px",
                                          }}
                                          src={downArrow}
                                          alt=""
                                        />
                                      )}
                                    </p>
                                  )}
                              </Stack>
                            </Stack>
                          )}
                        </Stack>
                      </Card>
                    </Stack>
                  ))
                ) : (
                  <Box
                    sx={{
                      height: "400px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img className="mb-15"
                      src={searchIconColored}
                      alt=""
                    />
                    <Typography className="contactText fs-18 fw-6" sx={{ color: "#474747" }}
                    >
                      Start your people search by applying any filters in filter
                      panel.
                    </Typography>
                  </Box>
                )}
              </Stack>
            )}

            {/* {Pagination Part in card view} */}
            {isSaved ? (
              <>
                {totalSavedRecords && searchData.displayData.length > 0 ? (
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      mt: "2px",
                      borderTop: "1px solid rgb(192 192 192)",
                    }}
                    pt={1}
                    pb={1}
                  >
                    <Typography
                      component="p"
                      sx={{
                        padding: "0 10px",
                        height: "17px",
                        fontSize: "12px",
                      }}
                    >
                      {" "}
                      {displayText}
                    </Typography>

                    <ButtonGroup className="card-pagination"
                      disableRipple
                    >
                      <Button
                        sx={{
                          borderColor: "#CACACC",
                          backgroundColor: "#ffffff",
                          color: "#737373",
                          cursor: page === 0 ? "not-allowed" : "pointer",
                          padding: "1px",
                          "&:hover": {
                            borderColor:
                              page !== 0 ? styles.primaryTextColor : "#CACACC",
                            backgroundColor: "#ffffff",
                            "&:not(:last-child):hover": {
                              borderRightColor:
                                page !== 0
                                  ? styles.primaryTextColor
                                  : "#CACACC",
                            },
                          },
                        }}
                        onClick={() => handlePageChange(page - 1)}
                      >
                        <ArrowLeftOutlinedIcon />
                      </Button>
                      <Button
                        id="pagination-btn"
                        aria-controls={
                          openPaginationBtn ? "pagination-btn-menu" : undefined
                        }
                        aria-haspopup="true"
                        aria-expanded={openPaginationBtn ? "true" : undefined}
                        sx={{
                          borderColor: "#CACACC",
                          color: "#474747",
                          fontSize: "13px",
                          width: "55px",
                          fontWeight: "400",
                          backgroundColor: "#ffffff",
                          "&:hover": {
                            backgroundColor: "#ffffff",
                            borderColor: styles.primaryTextColor,
                            "&:not(:last-child):hover": {
                              borderRightColor: styles.primaryTextColor,
                            },
                          },
                        }}
                        onClick={handlePagination}
                      >
                        {page + 1}
                        <ArrowDropDownIcon sx={{ color: "#737373" }} />
                      </Button>
                      <Menu className="paginationHidden"
                        id="pagination-btn-menu"
                        anchorEl={pagination}
                        open={openPaginationBtn}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "pagination-btn",
                        }}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                        transformOrigin={{
                          vertical: "bottom",
                          horizontal: "center",
                        }}
                      >
                        {mynumber.map((pageNumber) => (
                          <MenuItem className="pagenumber"
                            disableRipple
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber - 1)}
                          >
                            {pageNumber}
                          </MenuItem>
                        ))}
                        {/* {Array.from({ length: totalPages }, (_, index) => {
        const pageNumber = index;
        const displayNumber = index + 1;
        return (
          <MenuItem sx={{
            '&:hover': {
              backgroundColor: '#146EF6',
              color: '#ffffff'
            }}} disableRipple key={pageNumber} onClick={() => handlePageChange(pageNumber)}>
            {displayNumber}
          </MenuItem>
        );
      })} */}
                      </Menu>

                      <Button
                        sx={{
                          borderColor: "#CACACC",
                          backgroundColor: "#ffffff",
                          color: "#737373",
                          cursor:
                            (page + 1) * rowsPerPage >= totalSavedRecords ||
                              page + 1 >= 100
                              ? "not-allowed"
                              : "pointer",
                          padding: "1px",
                          "&:hover": {
                            backgroundColor: "#ffffff",
                            borderColor:
                              (page + 1) * rowsPerPage >= totalSavedRecords ||
                                page + 1 >= 100
                                ? "#CACACC"
                                : styles.primaryTextColor,
                          },
                        }}
                        disabled={lastPageNumber === page}
                        onClick={() => {
                          if (
                            (page + 1) * rowsPerPage >= totalSavedRecords ||
                            page + 1 >= 100
                          ) {
                            return false;
                          }
                          handlePageChange(page + 1);
                        }}
                      >
                        <ArrowRightOutlinedIcon />
                      </Button>
                    </ButtonGroup>
                  </Stack>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <>
                {totalRecords && searchData.displayData.length > 0 ? (
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      mt: "2px",
                      borderTop: "1px solid rgb(192 192 192)",
                    }}
                    pt={1}
                    pb={1}
                  >
                    <Typography
                      component="p"
                      sx={{
                        padding: "0 10px",
                        height: "17px",
                        fontSize: "12px",
                      }}
                    >
                      {" "}
                      {searchData.displayData.length ? `${displayText}` : ""}
                    </Typography>

                    <ButtonGroup className="buttongroup"
                      disableRipple
                    >
                      <Button
                        sx={{
                          borderColor: "#CACACC",
                          backgroundColor: "#ffffff",
                          color: "#737373",
                          cursor: page === 0 ? "not-allowed" : "pointer",
                          padding: "1px",
                          "&:hover": {
                            borderColor:
                              page !== 0 ? styles.primaryTextColor : "#CACACC",
                            backgroundColor: "#ffffff",
                            "&:not(:last-child):hover": {
                              borderRightColor:
                                page !== 0
                                  ? styles.primaryTextColor
                                  : "#CACACC",
                            },
                          },
                        }}
                        onClick={() => handlePageChange(page - 1)}
                      >
                        <ArrowLeftOutlinedIcon />
                      </Button>
                      <Button
                        id="pagination-btn"
                        aria-controls={
                          openPaginationBtn ? "pagination-btn-menu" : undefined
                        }
                        aria-haspopup="true"
                        aria-expanded={openPaginationBtn ? "true" : undefined}
                        sx={{
                          borderColor: "#CACACC",
                          color: "#474747",
                          fontSize: "13px",
                          width: "55px",
                          fontWeight: "400",
                          backgroundColor: "#ffffff",
                          "&:hover": {
                            backgroundColor: "#ffffff",
                            borderColor: styles.primaryTextColor,
                            "&:not(:last-child):hover": {
                              borderRightColor: styles.primaryTextColor,
                            },
                          },
                        }}
                        onClick={handlePagination}
                      >
                        {page + 1}
                        <ArrowDropDownIcon className="c-grey" />
                      </Button>
                      <Menu className="paginationHidden"
                        id="pagination-btn-menu"
                        anchorEl={pagination}
                        open={openPaginationBtn}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "pagination-btn",
                        }}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                        transformOrigin={{
                          vertical: "bottom",
                          horizontal: "center",
                        }}
                      >
                        {mynumber.map((pageNumber) => (
                          <MenuItem className="pagenumber"
                            disableRipple
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber - 1)}
                          >
                            {pageNumber}
                          </MenuItem>
                        ))}
                      </Menu>

                      <Button
                        sx={{
                          borderColor: "#CACACC",
                          backgroundColor: "#ffffff",
                          color: "#737373",
                          cursor:
                            (page + 1) * rowsPerPage >= totalRecords ||
                              page + 1 >= 100
                              ? "not-allowed"
                              : "pointer",
                          padding: "1px",
                          "&:hover": {
                            backgroundColor: "#ffffff",
                            borderColor:
                              (page + 1) * rowsPerPage >= totalRecords ||
                                page + 1 >= 100
                                ? "#CACACC"
                                : styles.primaryTextColor,
                          },
                        }}
                        disabled={lastPageNumber === page}
                        onClick={() => {
                          if (
                            (page + 1) * rowsPerPage >= totalRecords ||
                            page + 1 >= 100
                          ) {
                            return false;
                          }
                          handlePageChange(page + 1);
                        }}
                      >
                        <ArrowRightOutlinedIcon />
                      </Button>
                    </ButtonGroup>
                  </Stack>
                ) : (
                  <></>
                )}
              </>
            )}
          </>
        </Stack>
      )}

      {/* Edit Modal */}

      <Modal
        open={openTableEdit}
        onClose={handleTableEditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ overflowY: "scroll", height: "100vh" }}
      >
        <Box sx={Editstyle}>
          <EditModal handleTableEditClose={handleTableEditClose} />
        </Box>
      </Modal>

      {/* <Modal
        open={isMailBodyopen}
        onClose={handleMailBosyClose}
      >
        <Stack
        sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 750,
            height: 500,
            borderRadius: '5px',
            bgcolor: 'background.paper',
            boxShadow: 24,

          }}
        >
          <SendMailModal
            PersonId={""}
            handleTableMenuSendMaiClose={handleTableMenuSendMaiClose}
            PersonMail={singleSelectMail}
            PersonName={singleSelectFirstName}
            checkedRowIds={checkedRowIds}
            showEmailSuccess={showEmailSuccess}
            personObj={""}
            checkedRowValues={checked}
            isBulk={true}
          />
          </Stack>
      </Modal> */}
      {isMailBodyopen && (
        <EmailDialogBox
          dialogOpen={isMailBodyopen}
          onClose={() => {
            setMailBodyOpen(false)
            getTableData("")
          }}
          name={selectPersonFullName}
          emailId={selectPersonMail}
          candidateId={selectPersonCandtId}
          isBulkEmail={isBulk}
          jobId={""}
          isFromPeople={true}
        />
      )}
      {
        addCompanyToModal ?
          <AddCompanyToModal
            dialogOpen={addCompanyToModal}
            closePopup={() => { setAddCompanyToModal(false); }}
            contactId={searchData.displayData.map((data: any) => data.id)}
            moveToJobDiva={true}
            saveJobDiva={saveJobDiva}
            type="people"
          />
          :
          null
      }
      {
        isOpenCheckboxModal ?
          <MobileCheckBoxModal
            dialogOpen={isOpenCheckboxModal}
            closePopup={() => { setOpenCheckboxModal(false); }}
            title={checkboxModalTitle}
            checkedData={checked}
            reloadFunc={reloadTableData}
            saveType={saveType}
          />
          :
          null
      }
    </Stack>
  );
};
export default RightSection;