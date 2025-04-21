// import React, { useEffect, useRef, useContext } from "react";
import { useContext } from "react";
import { React, useEffect } from "../../../../../../../../shared/modules/React";
import { Box } from "../../../../../../../../shared/modules/MaterialImports/Box";
import { Stack } from "../../../../../../../../shared/modules/MaterialImports/Stack";
import { Typography } from "../../../../../../../../shared/modules/MaterialImports/Typography";
import { Button } from "../../../../../../../../shared/modules/MaterialImports/Button";
import { ButtonGroup } from "../../../../../../../../shared/modules/MaterialImports/ButtonGroup";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import DragHandleRoundedIcon from "@mui/icons-material/DragHandleRounded";
import { Switch } from "../../../../../../../../shared/modules/MaterialImports/Switch";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { TextField } from "../../../../../../../../shared/modules/MaterialImports/TextField";
import WestRoundedIcon from "@mui/icons-material/WestRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import JobTitleModal from "../JobTitle/JobTitleModal";
import JobTitleModalOpen from "../JobTitle/JobTitleModalOpen";
import JobTitleModalClose from "../JobTitle/JobTitleModalClose";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LocationModal from "../Location/LocationModal";
import EmployeesModal from "../Employees/EmployeesModal";
import EmployeesModalOpen from "../Employees/EmployeesModalOpen";
import EmployeesModalClose from "../Employees/EmployeesModalClose";
import IndustryModal from "../Industry/IndustryModal";
import IndustryModalOpen from "../Industry/IndustryModalOpen";
import IndustryModalClose from "../Industry/IndustryModalClose";
import LocationModalOpen from "../Location/LocationModalOpen";
import LocationModalClose from "../Location/LocationModalClose";
import ArrowLeftOutlinedIcon from "@mui/icons-material/ArrowLeftOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import { Menu, MenuItem } from "../../../../../../../../shared/modules/MaterialImports/Menu";
import { CircularProgress } from "../../../../../../../../shared/modules/MaterialImports/CircularProgress";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
// import Sortable from 'sortablejs'
import { Dialog, DialogTitle, DialogActions } from "../../../../../../../../shared/modules/MaterialImports/Dialog";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import { useTheme } from "@mui/material/styles";
import { ReactSortable } from "react-sortablejs";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Dangerous from "@mui/icons-material/Dangerous";

import apiService from "../../../../shared/api/apiService";
import { debounce } from "@mui/material/utils";
import { Store } from "../../../DataLabs/DataLabs";
import { ModalStore } from "../../../DataLabs/DataLabs";
import EducationModalOpen from "../Education/EducationModalOpen";
import EducationModalClose from "../Education/EducationModalClose";
import EducationModal from "../Education/EducationModal";
import SkillsModalOpen from "../Skills/SkillsOpenModal";
import SkillsModalClose from "../Skills/SkillsCloseModal";
import SkillsModal from "../Skills/SkillsModal";
import LanguageModalOpen from "../Language/LanguageModalOpen";
import LanguageModalClose from "../Language/LanguageModalClose";
import LanguageModal from "../Language/LanguageModal";
import CertificationModalOpen from "../Certification/CertificationModalOpen";
import CertificationModalClose from "../Certification/CertificationModalClose";
import CertificationModal from "../Certification/CertificationModal";
import { userLocalData } from "../../../../../../../../shared/services/userData";
import NameModal from "../Name/NameModal";
import NameModalOpen from "../Name/NameModalOpen";
import NameModalClose from "../Name/NameModalClose";
import CompanyModalOpen from "../Company/CompanyModalOpen";
import CompanyModalClose from "../Company/CompanyModalClose";
import CompanyModal from "../Company/CompanyModal";
import TotalYearsOfExperienceModalOpen from "../TotalYearsOfExperience/TotalYearsOfExperienceModalOpen";
import TotalYearsOfExperienceModalClose from "../TotalYearsOfExperience/TotalYearsOfExperienceModalClose";
import TotalYearsOfExperienceModal from "../TotalYearsOfExperience/TotalYearsOfExperienceModal";
import { ID_ROLE_PEOPLE_CAN_ADD_EDIT_PERSONAS } from "../../../../../../../../shared/services/Permissions/IDs";

interface PersonaModalProps {
  isNewPersona: boolean;
  isManagePersona: boolean;
  isEdit: boolean;
  isCopy: boolean;
  // userNameData: any;
  handleIsNewPersona: () => void;
  handleClose1: () => void;
  handleIsManagePersona: () => void;
  labelName: String;
  handleEditPersona: (PersonaId: any) => void;
  handleCopyPersona: (PersonaId: any) => void;
  managePersonadata: any;
  refetchPersonData: (flag: any) => void;
  isRefetch: any;
  updatePersonaData: any;
  sendPersonaEditData: (user: any) => void;
  sendPersonaCreateData: (userName: any) => void;
  showOnlyPersona: boolean;
}

const companydetails = [
  { id: 1, company: "Amazon", role: "Developer", location: "USA" },
  { id: 2, company: "IBM", role: "Software Developer", location: "Europe" },
  { id: 3, company: "ASK", role: "Devops", location: "Italy" },
  { id: 4, company: "EPAM", role: "Software Engineering", location: "India" },
  { id: 5, company: "Black Rock", role: "Analyst", location: "Germany" },
  { id: 6, company: "Accenture", role: "Manager", location: "USA" },
  { id: 7, company: "Congnizant", role: "Asst Manager", location: "Europe" },
  {
    id: 8,
    company: "Capgemini",
    role: "Front End Developer",
    location: "Italy",
  },
  { id: 9, company: "Tcs", role: "QA Engineer", location: "India" },
  { id: 10, company: "Virtusa", role: "Associate", location: "Germany" },
];

const PersonaModal: React.FC<PersonaModalProps> = ({
  isNewPersona,
  isManagePersona,
  handleIsNewPersona,
  handleIsManagePersona,
  handleClose1,
  isEdit,
  isCopy,
  labelName,
  handleEditPersona,
  handleCopyPersona,
  managePersonadata,
  refetchPersonData,
  isRefetch,
  sendPersonaEditData,
  sendPersonaCreateData,
  updatePersonaData,
  showOnlyPersona = true
}) => {
  const [switchPersonaChecked, setSwitchPersonaChecked] = React.useState<
    boolean[]
  >([]);
  const [searchData, setSearchData] = useContext(Store);
  const [searchModalData, setSearchModalData] = useContext(ModalStore);
  const [isModalCompany, setIsModalCompany] = React.useState(false);
  const [isModalTYE, setIsModalTYE] = React.useState(false);
  const [isModalName, setIsModalName] = React.useState(false);
  const [isModalJobTitle, setIsModalJobTitle] = React.useState(false);
  const [isModalLocation, setIsModalLocation] = React.useState(false);
  const [isModalEmployees, setIsModalEmployees] = React.useState(false);
  const [isModalIndustry, setIsModalIndustry] = React.useState(false);
  const [isModalEducation, setIsModalEducation] = React.useState(false);
  const [isModalSkills, setIsModalSkills] = React.useState(false);
  const [isModalLanguage, setIsModalLanguage] = React.useState(false);
  const [isModalCertification, setIsModalCertification] = React.useState(false);
  const [isJobTitleHover, setIsJobTitleHover] = React.useState(false);
  const [isEmployeeHover, setIsEmployeeHover] = React.useState(false);
  const [isIndustryHover, setIsIndustryHover] = React.useState(false);
  const [isLocationHover, setIsLocationHover] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [nameError, setNameError] = React.useState("");
  const [showError, setShowError] = React.useState(false);
  const closeErrorLayout = () => {
    setShowError(false);
  };

  const recrIds = userLocalData.getvalue("invitedAndReferredRecrIds");
  const isChromeExtEnable = userLocalData.isChromeExtensionEnabled();
  // console.log(isNewPersona, "isNewPersona");
  // debugger
  let updatePersonaName = "";
  if (updatePersonaData) {
    updatePersonaName = updatePersonaData.personaName;
  }
  // console.log(updatePersonaName);
  const [personaName, setPersonaName] = React.useState<string>(
    updatePersonaName ? updatePersonaName : ""
  );
  const [deleteId, setDeleteId] = React.useState<number | null>(null);

  const [personaModalPage, setPersonaModalPage] = React.useState(0);
  const dataPerPage = 2;
  // const totalRecords = Math.ceil(companydetails.length / dataPerPage)
  const [totalRecords, setTotalRecordCount] = React.useState<any>(0);
  const [openPaginationBtn, setOpenPaginationBtn] = React.useState(false);
  const [pagination, setPagination] = React.useState<null | HTMLElement>(null);

  const [modalErrorMessage, setmodalErrorMessage] = React.useState("");
  const handlePersonaPageChange = (newPage: any) => {
    if (newPage >= 0 && newPage < totalRecords) {
      setPersonaModalPage(newPage);
    }
  };

  const [personaData, setPersonaData] = React.useState<any>([]);

  useEffect(() => {
    if (updatePersonaData && updatePersonaData.filterJson) {
      let filteredString = updatePersonaData.filterJson.replace(/'/gi, '"');
      let filterJson = JSON.parse(filteredString);
      console.log(filterJson, "updatePersonaData");

      // setSearchModalData((prevSearchData: any) => ({
      //     ...prevSearchData,
      //     industries: [],
      //     company_names: [],
      //     company_not_in_names: [],
      //     company_past_names: [],
      //     no_of_employees: [],
      //     min: "",
      //     max: "",
      //     person_titles: [],
      //     person_not_titles: [],
      //     person_past_titles: [],
      //     title_is_boolean: "",
      //     title_management_level: [],
      //     title_department: [],
      //     title_department_sub_role: [],
      //     locations: [],
      //     locations_not_in: [],
      //     hq_locations: [],
      //     hq_locations_not_in: [],
      //     full_name: "",
      //     minYear: "",
      //     maxYear: "",
      // }));
      setPersonaName(
        isCopy ? `Copy of ${updatePersonaName}` : updatePersonaName
      );
      if (filterJson.page_num !== "") {
        setPersonaModalPage(filterJson.page_num); // Set the page number
      }
      setSearchModalData((prevState: any) => {
        let updatedState = {
          ...prevState,
          industries: filterJson.industries ? filterJson.industries : [],
          company_names: filterJson.company_names
            ? filterJson.company_names
            : [],
          company_not_in_names: filterJson.company_not_in_names
            ? filterJson.company_not_in_names
            : [],
          company_past_names: filterJson.company_past_names
            ? filterJson.company_past_names
            : [],
          exclude_company_names: filterJson.exclude_company_names
            ? filterJson.exclude_company_names
            : [],
          no_of_employees: filterJson.no_of_employees
            ? filterJson.no_of_employees
            : [],
          locations: filterJson.locations ? filterJson.locations : [],
          hq_locations: filterJson.hq_locations ? filterJson.hq_locations : [],
          locations_not_in: filterJson.locations_not_in
            ? filterJson.locations_not_in
            : [],
          hq_locations_not_in: filterJson.hq_locations_not_in
            ? filterJson.hq_locations_not_in
            : [],
          person_titles: filterJson.person_titles
            ? filterJson.person_titles
            : [],
          full_name: filterJson.full_name ? filterJson.full_name : "",
          minYear: filterJson.minYear ? filterJson.minYear : "",
          maxYear: filterJson.maxYear ? filterJson.maxYear : "",
          min: filterJson.min ? filterJson.min : "",
          max: filterJson.max ? filterJson.max : "",
          education: {
            schoolIn: filterJson.education?.schoolIn
              ? filterJson?.education?.schoolIn
              : [],
            majorIn: filterJson?.education?.majorIn
              ? filterJson?.education?.majorIn
              : [],
            degreeIn: filterJson?.education?.degreeIn
              ? filterJson?.education?.degreeIn
              : [],
            educationStartYear: filterJson?.education?.educationStartYear
              ? filterJson?.education?.educationStartYear
              : "",
            educationEndYear: filterJson?.education?.educationEndYear
              ? filterJson?.education?.educationEndYear
              : "",
          },
          skillsIn: filterJson.skillsIn ? filterJson.skillsIn : [],
          languagesIn: filterJson.languagesIn ? filterJson.languagesIn : [],
          certificationsIn: filterJson.certificationsIn
            ? filterJson.certificationsIn
            : [],
          industries_not_in: filterJson.industries_not_in
            ? filterJson.industries_not_in
            : [],
          industry_company_not_in_names:
            filterJson.industry_company_not_in_names
              ? filterJson.industry_company_not_in_names
              : [],
          industry_company_names: filterJson.industry_company_names
            ? filterJson.industry_company_names
            : [],
          industry_all_company_names: filterJson.industry_all_company_names
            ? filterJson.industry_all_company_names
            : [],
          person_not_titles: filterJson.person_not_titles
            ? filterJson.person_not_titles
            : [],
          person_past_titles: filterJson.person_past_titles
            ? filterJson.person_past_titles
            : [],
          title_management_level: filterJson.title_management_level
            ? filterJson.title_management_level
            : [],
          title_department: filterJson.title_department
            ? filterJson.title_department
            : [],
          title_department_sub_role: filterJson.title_department_sub_role
            ? filterJson.title_department_sub_role
            : [],
          ...filterJson,
        };

        // Specific logic for zipcode and hqzipcode
        if (filterJson.hq_distance) {
          updatedState.hqzipcode = filterJson.zipcode; // Set hqzipcode if hq_distance exists
          updatedState.hqdistance = filterJson.hq_distance;
        } else {
          updatedState.hqzipcode = ""; // Ensure hqzipcode is reset if not applicable
        }

        if (filterJson.distance) {
          updatedState.zipcode = filterJson.zipcode; // Set zipcode if distance exists
          updatedState.distance = filterJson.distance;
        } else {
          updatedState.zipcode = ""; // Ensure zipcode is reset if not applicable
        }
        return updatedState;
      });
    }
  }, [updatePersonaData, isCopy]);

  const getDisabled = () => {
    // let deletedKeys = ["companyId", "userId", "sort_type", "sort_by", "searchBox"]
    let isDisabled = false;
    let isArrayCheck = true;
    let isNotArrCheck = true;
    for (let key in searchModalData) {
      if (
        key !== "companyId" &&
        key !== "userId" &&
        key !== "sort_type" &&
        key !== "searchBox" &&
        key !== "page_num" &&
        key !== "page_size" &&
        key !== "sort_by"
      ) {
        if (Array.isArray(searchModalData[key])) {
          if (searchModalData[key].length > 0) {
            isArrayCheck = false;
          }
        } else {
          if (searchModalData[key] !== "") {
            isNotArrCheck = false;
          }
        }
      }
    }
    if (isArrayCheck && isNotArrCheck) {
      isDisabled = true;
    }
    // console.log(isDisabled, 'isDisabled', 'searchModalData', searchModalData)
    return isDisabled;
  };

  const handlePersonaPagination = (event: any) => {
    setOpenPaginationBtn(!openPaginationBtn);
    setPagination(event.currentTarget);
  };

  const handlePersonaPaginationClose = () => {
    setOpenPaginationBtn(false);
  };

  // const startIndex = personaModalPage * dataPerPage;
  // const endIndex = startIndex + dataPerPage;
  // const visiblePersonaData = companydetails.slice(startIndex, endIndex)

  const [displayTextPersonaData, setDisplayText] = React.useState("");

  const checkFilterApplied = () => {
    let isFilterApplied = false;
    if (
      (searchModalData.industries &&
        searchModalData.industries.length &&
        searchModalData.industries &&
        searchModalData.industries.length) ||
      (searchModalData.company_names && searchModalData.company_names.length) ||
      (searchModalData.company_not_in_names &&
        searchModalData.company_not_in_names.length) ||
      (searchModalData.company_past_names &&
        searchModalData.company_past_names.length) ||
      (searchModalData.exclude_company_names &&
        searchModalData.exclude_company_names.length) ||
      (searchModalData.no_of_employees &&
        searchModalData.no_of_employees.length) ||
      (searchModalData.person_titles && searchModalData.person_titles.length) ||
      (searchModalData.education?.degreeIn &&
        searchModalData.education?.degreeIn.length) ||
      (searchModalData.education?.majorIn &&
        searchModalData.education?.majorIn.length) ||
      (searchModalData.education?.schoolIn &&
        searchModalData.education?.schoolIn.length) ||
      searchModalData.full_name !== "" ||
      searchModalData.minYear !== "" ||
      searchModalData.maxYear !== "" ||
      searchModalData.min !== "" ||
      searchModalData.max !== "" ||
      searchModalData.education.educationStartYear !== "" ||
      (searchModalData.skillsIn && searchModalData.skillsIn.length) ||
      (searchModalData.languagesIn && searchModalData.languagesIn.length) ||
      (searchModalData.certificationsIn &&
        searchModalData.certificationsIn.length) ||
      searchModalData.education.educationEndYear !== "" ||
      (searchModalData.person_not_titles &&
        searchModalData.person_not_titles.length) ||
      (searchModalData.person_past_titles &&
        searchModalData.person_past_titles.length) ||
      (searchModalData.title_management_level &&
        searchModalData.title_management_level.length) ||
      (searchModalData.title_department &&
        searchModalData.title_department.length) ||
      (searchModalData.title_department_sub_role &&
        searchModalData.title_department_sub_role.length) ||
      (searchModalData.locations && searchModalData.locations.length) ||
      (searchModalData.locations_not_in &&
        searchModalData.locations_not_in.length) ||
      (searchModalData.hq_locations && searchModalData.hq_locations.length) ||
      (searchModalData.hq_locations_not_in &&
        searchModalData.hq_locations_not_in.length) ||
      (searchModalData.personaIds && searchModalData.personaIds.length) ||
      searchModalData.full_name !== "" ||
      searchModalData.min !== "" ||
      searchModalData.max !== "" ||
      searchModalData.title_is_boolean !== "" ||
      searchModalData.minYear !== "" ||
      searchModalData.maxYear !== "" ||
      searchModalData.exist_fields.length ||
      searchModalData.not_exist_fields.length ||
      searchModalData.zipcode ||
      searchModalData.hqzipcode ||
      searchModalData.distance ||
      searchModalData.hqdistance
    ) {
      isFilterApplied = true;
    }
    return isFilterApplied;
  };
  useEffect(() => {
    const getTableData = async () => {
      setLoading(true);
      let dataObj = Object.keys(searchModalData);
      let sendData: any = {};
      for (var i = 0; i < dataObj.length; i++) {
        if (
          dataObj[i] !== "industry_adv_settings" &&
          dataObj[i] !== "eduDegreeList" &&
          dataObj[i] !== "eduSchoolList" &&
          dataObj[i] !== "eduMajorList" &&
          dataObj[i] !== "autoSkillsList" &&
          dataObj[i] !== "autoLanguagesList" &&
          dataObj[i] !== "autoCertificationsList" &&
          dataObj[i] !== "userId" &&
          searchModalData[dataObj[i]]
        ) {
          let obj = searchModalData[dataObj[i]];
          if (obj && obj.length) {
            sendData[dataObj[i]] = obj;
          }
        }

        if (dataObj[i] === "education") {
          let objdegreein = searchModalData[dataObj[i]].degreeIn;
          let objschoolIn = searchModalData[dataObj[i]].schoolIn;
          let objmajorIn = searchModalData[dataObj[i]].majorIn;
          let objeducationStartYear = searchModalData[dataObj[i]].educationStartYear;
          let objeducationEndYear = searchModalData[dataObj[i]].educationEndYear;

          if (
            (objdegreein && objdegreein.length) ||
            (objschoolIn && objschoolIn.length) ||
            (objmajorIn && objmajorIn.length) ||
            objeducationStartYear !== "" ||
            objeducationEndYear !== ""
          ) {
            sendData[dataObj[i]] = searchModalData[dataObj[i]];
          }

          // console.log(obj);
        }
      }

      if (searchModalData.userId !== "") {
        sendData.recrId = parseInt(searchModalData.userId);
      }
      if (isChromeExtEnable) {
        sendData.recrIds = recrIds;
      }
      if (sendData.zipcode !== "") {
        sendData.distance = searchModalData.distance;
      }

      if (searchModalData.hqzipcode !== "") {
        sendData.zipcode = searchModalData.hqzipcode; // Replace `zipcode` with `hqzipcode`
        sendData.hq_distance = searchModalData.hqdistance; // Include `hq_distance`
        delete sendData.hqzipcode; // Remove `hqzipcode` after reassignment
      }
      sendData.page_num = personaModalPage;
      sendData.page_size = dataPerPage;
      try {
        let response = await apiService.getTableData(sendData);
        let newData = response.data.data;
        setPersonaData(newData);
        setLoading(false);
        let data = response.data.data;
        //  let totRecords = parseInt(response.data["total records"]);
        // console.log(data, 'data', totRecords)
        setTotalRecordCount(parseInt(response.data["total records"]));
        if (data?.length) {
          const startIndex = personaModalPage * dataPerPage + 1;
          const endIndex =
            parseInt(response.data["total records"]) >= startIndex + dataPerPage - 1
              ? startIndex + dataPerPage - 1
              : Math.min(
                startIndex + dataPerPage - 1,
                response.data.data.length
              );

          // console.log('startIndex', startIndex)
          // console.log('endIndex', endIndex)

          const displayTextData = `${startIndex} - ${endIndex} of ${parseInt(response.data["total records"])}`;
          // console.log(totalRecords, 'totalRecords')
          setDisplayText(displayTextData);
        } else {
          setTotalRecordCount(0);
          setLoading(false);
          // console.log("is coming")
        }
        if (response.data.Error) {
          setShowError(true);
          setmodalErrorMessage(response.data.Message);
        } else {
          setShowError(false);
        }
      } catch (e) {
        setLoading(false);
      }
    };
    console.log(checkFilterApplied(), "checkFilterApplied");
    if (
      !isNewPersona ||
      typeof isNewPersona !== "boolean" ||
      checkFilterApplied()
    ) {
      getTableData();
    }
  }, [personaModalPage, searchModalData]);

  // confirm dialog changes

  const [open, setOpen] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState<any>(null);
  // const theme = useTheme();

  const handleConfirmDelete = (item: any) => {
    setDialogContent(item);
    setOpen(true);
  };

  const handleDelete = () => {
    let { personaId } = dialogContent;
    setDeleteId(personaId);
    sendPersonaDeleteData(personaId);
  };

  const handleClose = () => {
    setOpen(false);
    setDataList(managePersonadata);
  };

  const hanldeSetPersonaName = (item: any) => {
    setPersonaName(item.personaName);
  };

  const handlePersonaSave = () => {
    if (personaName.trim() === "") {
      setNameError("Persona Name is required.");
      return;
    } else {
      // debugger;
      if (isCopy) {
        let updatedData = { ...updatePersonaData, personaName: personaName };
        sendPersonaCreateData(personaName);
      } else {
        let updatedData = { ...updatePersonaData, personaName: personaName };
        if (!updatePersonaName) {
          sendPersonaCreateData(personaName);
        } else {
          sendPersonaEditData(updatedData);
        }
      }
      // }
      if (showOnlyPersona) {
        handleIsManagePersona();
      } else {
        handleClose1();
      }
    }
  };
  const sendPersonaDeleteData = (id: number) => {
    let sendDeleteData: any = {
      personaId: id,
    };

    apiService
      .DeletePersonaData(sendDeleteData)
      .then((response: any) => {
        if (response.data.Success && response.data.Status === 200) {
          let manageData = dataList.filter((val: any) => val.personaId !== id);
          setSearchData((prevState: any) => {
            return {
              ...prevState,
              personaIds: prevState.personaIds?.filter(
                (dataId: any) => dataId !== id
              ),
            };
          });
          setDataList(manageData);
          setOpen(false);
          let enableFlag = isRefetch ? false : true;
          refetchPersonData(enableFlag);
          handleClose1();
        }
      })
      .catch((err: any) => {
        console.log(err, "err");
        setOpen(false);
      });
  };

  const debouncedSendDeleteRequest = debounce(sendPersonaDeleteData, 500);

  const getPersonaDeleteData = (id: number) => {
    debouncedSendDeleteRequest(id);
  };

  React.useEffect(() => {
    if (deleteId !== null) {
      getPersonaDeleteData(deleteId);
    }
    // let tempdata = dataList.map((item: any, key: any) => ({
    //   ...item,
    //   orderBy: key,
    // }));
    // console.log(testdata);
    // setDataList(tempdata);
    // setTempDataList(tempdata);
  }, []);

  // const handleJobTitleHover = () => {
  //   setIsJobTitleHover(true);
  // };
  // const handleJobTitleHoverLeave = () => {
  //   setIsJobTitleHover(false);
  // };

  // const handleEmployeeHover = () => {
  //   setIsEmployeeHover(true);
  // };
  // const handleEmployeeHoverLeave = () => {
  //   setIsEmployeeHover(false);
  // };

  // const handleIndustryHover = () => {
  //   setIsIndustryHover(true);
  // };
  // const handleIndustryHoverLeave = () => {
  //   setIsIndustryHover(false);
  // };

  // const handleLocationHover = () => {
  //   setIsLocationHover(true);
  // };
  // const handleLocationHoverLeave = () => {
  //   setIsLocationHover(false);
  // };

  const handleSwitchPersonaChecked = (PersonaId: any, item: any) => {
    const index = dataList.findIndex(
      (data: any) => data.personaId === PersonaId
    );

    if (index !== -1) {
      const newDataList = [...dataList];
      newDataList[index].isActive = !item.isActive;
      setDataList(newDataList);

      setSwitchPersonaChecked((prevState: any) => ({
        ...prevState,
        [PersonaId]: !prevState[PersonaId],
      }));
      // console.log(newDataList[index].isActive, 'newDataList[index].isActive', searchData)
      if (!newDataList[index].isActive) {
        // console.log(newDataList[index].isActive, 'newDataList[index].isActive', newDataList[index], "here 2")
        setSearchData((prevState: any) => ({
          ...prevState,
          personaIds: prevState.personaIds?.filter(
            (item: any) => item !== newDataList[index].personaId
          ),
        }));
      }

      const updatePersona = newDataList[index];

      sendPersonaEditData(updatePersona);
    }

    // let filteredPersona = dataList.find((data: any) => data.personaId === PersonaId);
    // filteredPersona.isActive = !item.isActive;
    // setDataList([...dataList, filteredPersona])
    // setSwitchPersonaChecked((prevState: any) => ({
    //     ...prevState,
    //     [PersonaId]: !prevState[PersonaId],
    // }));
    // sendPersonaEditData(filteredPersona)
  };

  const onClickModalName = () => {
    setIsModalName(!isModalName)
    setIsModalJobTitle(false);
    setIsModalLocation(false);
    setIsModalEmployees(false);
    setIsModalIndustry(false);
    setIsModalEducation(false);
    setIsModalSkills(false);
    setIsModalLanguage(false);
    setIsModalCertification(false);
    setIsModalTYE(false);
    setIsModalCompany(false);
  };

  const onClickModalCompany = () => {
    setIsModalCompany(!isModalCompany)
    setIsModalTYE(false)
    setIsModalName(false);
    setIsModalJobTitle(false);
    setIsModalLocation(false);
    setIsModalEmployees(false);
    setIsModalIndustry(false);
    setIsModalEducation(false);
    setIsModalSkills(false);
    setIsModalLanguage(false);
    setIsModalCertification(false);
  };

  const onClickModalTYE = () => {
    setIsModalTYE(!isModalTYE)
    setIsModalCompany(false);
    setIsModalName(false);
    setIsModalJobTitle(false);
    setIsModalLocation(false);
    setIsModalEmployees(false);
    setIsModalIndustry(false);
    setIsModalEducation(false);
    setIsModalSkills(false);
    setIsModalLanguage(false);
    setIsModalCertification(false);

  };

  const onClickModalJobTitle = () => {
    setIsModalName(false)
    setIsModalJobTitle(!isModalJobTitle);
    setIsModalLocation(false);
    setIsModalEmployees(false);
    setIsModalIndustry(false);
    setIsModalEducation(false);
    setIsModalSkills(false);
    setIsModalLanguage(false);
    setIsModalCertification(false);
    setIsModalTYE(false);
    setIsModalCompany(false);
  };

  const onClickModalLocation = () => {
    setIsModalName(false);
    setIsModalJobTitle(false);
    setIsModalLocation(!isModalLocation);
    setIsModalEmployees(false);
    setIsModalIndustry(false);
    setIsModalEducation(false);
    setIsModalSkills(false);
    setIsModalLanguage(false);
    setIsModalCertification(false);
    setIsModalTYE(false);
    setIsModalCompany(false);
  };

  const onClickModalEmployees = () => {
    setIsModalName(false);
    setIsModalJobTitle(false);
    setIsModalLocation(false);
    setIsModalEmployees(!isModalEmployees);
    setIsModalIndustry(false);
    setIsModalEducation(false);
    setIsModalSkills(false);
    setIsModalLanguage(false);
    setIsModalCertification(false);
    setIsModalTYE(false);
    setIsModalCompany(false);
  };

  const onClickModalIndustry = () => {
    setIsModalName(false);
    setIsModalJobTitle(false);
    setIsModalLocation(false);
    setIsModalEmployees(false);
    setIsModalIndustry(!isModalIndustry);
    setIsModalEducation(false);
    setIsModalSkills(false);
    setIsModalLanguage(false);
    setIsModalCertification(false);
    setIsModalTYE(false);
    setIsModalCompany(false);
  };

  const onClickModalEducation = () => {
    setIsModalName(false);
    setIsModalJobTitle(false);
    setIsModalLocation(false);
    setIsModalEmployees(false);
    setIsModalIndustry(false);
    setIsModalEducation(!isModalEducation);
    setIsModalSkills(false);
    setIsModalLanguage(false);
    setIsModalCertification(false);
    setIsModalTYE(false);
    setIsModalCompany(false);
  };

  const onClickModalSkills = () => {
    setIsModalName(false);
    setIsModalJobTitle(false);
    setIsModalLocation(false);
    setIsModalEmployees(false);
    setIsModalIndustry(false);
    setIsModalEducation(false);
    setIsModalSkills(!isModalSkills);
    setIsModalLanguage(false);
    setIsModalCertification(false);
    setIsModalTYE(false);
    setIsModalCompany(false);
  };

  const onClickModalLanguage = () => {
    setIsModalName(false);
    setIsModalJobTitle(false);
    setIsModalLocation(false);
    setIsModalEmployees(false);
    setIsModalIndustry(false);
    setIsModalEducation(false);
    setIsModalSkills(false);
    setIsModalLanguage(!isModalLanguage);
    setIsModalCertification(false);
    setIsModalTYE(false);
    setIsModalCompany(false);
  };

  const onClickModalCertification = () => {
    setIsModalName(false);
    setIsModalJobTitle(false);
    setIsModalLocation(false);
    setIsModalEmployees(false);
    setIsModalIndustry(false);
    setIsModalEducation(false);
    setIsModalSkills(false);
    setIsModalLanguage(false);
    setIsModalCertification(!isModalCertification);
    setIsModalTYE(false);
    setIsModalCompany(false);
  };

  // const containerRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //     let container = containerRef.current;

  //     console.log('ccc', container)

  //     if (container) {
  //         const sortableInstance = new Sortable(container, {
  //             handle: '.drag-handle',
  //             // Options for the sortable functionality
  //             // ...

  //         });
  //         console.log('aaa', sortableInstance)
  //         // Cleanup function to destroy the sortable instance when the component unmounts
  //         return () => {
  //             sortableInstance.destroy();
  //         };
  //     }
  // }, []);

  const [dataList, setDataList] = React.useState(managePersonadata);
  const [tempdataList, setTempDataList] = React.useState([]);

  const handleSort = (DataItems: any) => {
    setDataList(DataItems);
  };
  let dataListCopy = [...dataList];

  const handleOrderChange = (event: any) => {
    let newArr: any = [];
    setTempDataList([]);
    dataListCopy.map((item, key) => {
      let newkey = dataListCopy.length - 1 - key;
      let objnew = {
        personaId: item.personaId,
        orderBy: newkey,
      };
      if (
        event.oldIndex > event.newIndex &&
        key <= event.oldIndex &&
        key >= event.newIndex
      ) {
        objnew.orderBy =
          key === event.oldIndex
            ? dataListCopy.length - 1 - event.newIndex
            : dataListCopy.length - 2 - key;
      }
      if (
        event.oldIndex < event.newIndex &&
        key >= event.oldIndex &&
        key <= event.newIndex
      ) {
        objnew.orderBy =
          key === event.oldIndex
            ? dataListCopy.length - 1 - event.newIndex
            : dataListCopy.length - key;
      }
      newArr.push(objnew);
    });

    apiService.swapPersonaOrder(newArr).then((response: any) => {
      let enableFlag = isRefetch ? false : true;
      refetchPersonData(enableFlag);
    });
    console.log(newArr);
  };
  function capitalizeFirstLetter(string: any) {
    if (string) return string.charAt(0).toUpperCase() + string.slice(1);
    else return "";
  }
  return (
    <>
      {!isNewPersona && (
        <Stack sx={{ height: "100%" }}>
          <Stack
            className="topPersonaRow"
            sx={{
              height: "10%",
              backgroundColor: "#ffffff",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              borderTopLeftRadius: "3px",
              borderTopRightRadius: "3px",
            }}
          >
            <Typography
              sx={{
                color: "rgba(71, 71, 71, 1)",
                fontSize: "16px",
                fontWeight: 600,
                fontFamily:
                  'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                ml: 1,
              }}
            >
              Manage Personas
            </Typography>
            <Stack
              component="div"
              direction="row"
              spacing={1}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                mr: "15px",
              }}
            >
              {
                userLocalData.checkIntegration(ID_ROLE_PEOPLE_CAN_ADD_EDIT_PERSONAS) ?
                  <Button
                    variant="contained"
                    disableRipple
                    // onClick={handleIsNewPersona}
                    onClick={() => {
                      handleIsNewPersona();
                      setPersonaName("");
                    }}
                    sx={{
                      textTransform: "capitalize",
                      fontSize: "14px",
                      fontWeight: 500,
                      fontFamily:
                        'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                      backgroundColor: "#146ef6",
                      color: "#ffffff",
                      width: "131px",
                      height: "32px",
                      boxShadow: 0,
                      padding: "6px 8px",
                      "&:hover": {
                        backgroundColor: "rgba(8, 82, 194, 1)",
                        color: "#ffffff",
                        boxShadow: 0,
                      },
                    }}
                  >
                    <PersonAddAltIcon sx={{ fontSize: "18px" }} />
                    &nbsp;New Persona
                  </Button>
                  :
                  null
              }
              {
                showOnlyPersona ?
                  null :
                  <Box
                    component="div"
                    onClick={handleClose1}
                    sx={{ cursor: "pointer" }}
                  >
                    <CloseRoundedIcon
                      sx={{
                        color: "rgba(71, 71, 71, 1)",
                        height: "15px",
                        width: "15px",
                      }}
                    />
                  </Box>

              }
            </Stack>
          </Stack>

          <Stack className="personaListInSettings" sx={{ p: 5, overflowY: "scroll", height: "90%" }}>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 400,
                fontFamily:
                  'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                color: "#1a1a1a",
              }}
            >
              With Personas you can define different groups of people to target
              within key accounts.
            </Typography>

            <Box
              component="div"
              sx={{ display: "flex", flexDirection: "row", mt: 2, mb: 2 }}
            >
              <Box>
                <HelpOutlineRoundedIcon
                  sx={{ fontSize: "13px", color: "#1a1a1a", mb: "2px" }}
                />
              </Box>

              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: 400,
                  fontFamily:
                    'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                  color: "rgba(71, 71, 71, 1)",
                }}
              >
                &nbsp;Drag & drop each Persona configuration to change the order
                in which they will appear in the search page filters.
              </Typography>
            </Box>

            {/* <Stack ref={containerRef}> */}

            <ReactSortable
              list={dataList}
              setList={handleSort}
              handle=".drag-handle"
              group="groupName"
              animation={200}
              delay={2}
              onEnd={handleOrderChange}
            >
              {dataList
                // slice(0).reverse().
                .map((item: any, index: any) => (
                  <Stack
                    component="div"
                    key={index}
                    sx={{
                      height: "66px",
                      backgroundColor: "#ffffff",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      border: "1px solid rgba(230, 230, 230, 1)",
                      borderRadius: "5px",
                      mb: 1,
                      "&:hover": {
                        borderColor: "#146ef6",
                      },
                    }}
                  >
                    <Stack
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        pl: 2,
                      }}
                    >
                      <Box
                        component="div"
                        id={`${item.personaId}`}
                        className="drag-handle"
                        sx={{
                          cursor: "grab",
                          "&:active": {
                            cursor: "grabbing",
                          },
                          "&:hover svg": {
                            color: "#146ef6",
                          },
                        }}
                      >
                        <DragHandleRoundedIcon
                          sx={{ fontSize: "20px", color: "#737373" }}
                        />
                      </Box>

                      <Stack
                        id={`${item.personaId}`}
                        sx={{
                          "& .MuiSwitch-root ": {
                            width: "65px",
                            height: "45px",
                            padding: "11px",
                          },
                          "& .MuiButtonBase-root.MuiSwitch-switchBase": {
                            padding: "12px",
                            pt: "12.5px",
                            "&:hover": {
                              backgroundColor: "transparent",
                            },
                          },
                          "& .MuiSwitch-track": {
                            borderRadius: "12px",
                            opacity: 0.5,
                            backgroundColor: "#CACACC",
                          },
                          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                          {
                            opacity: 1,
                            backgroundColor: "#146EF6",
                          },
                          "& .MuiButtonBase-root.MuiSwitch-switchBase.Mui-checked":
                          {
                            color: "#ffffff",
                          },
                          "& .MuiSwitch-root:hover .MuiSwitch-track": {
                            opacity: 1,
                            backgroundColor: item.isActive
                              ? "#146EF6"
                              : "#737373",
                          },
                        }}
                      >
                        <Switch
                          disableRipple
                          // checked={!!switchPersonaChecked[item.personaId]}
                          checked={item.isActive}
                          id={`${item.personaId}`}
                          onChange={() =>
                            handleSwitchPersonaChecked(item.personaId, item)
                          }
                        />
                      </Stack>

                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 600,
                          fontFamily:
                            'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                          color: "rgba(71, 71, 71, 1)",
                          cursor: "default",
                        }}
                      >
                        {item.personaName}
                      </Typography>
                    </Stack>

                    {
                      userLocalData.checkIntegration(ID_ROLE_PEOPLE_CAN_ADD_EDIT_PERSONAS) ?
                        <Stack
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            pr: 2,
                            cursor: "pointer",
                          }}
                          direction="row"
                          spacing={1}
                        >
                          <Box
                            onClick={() => {
                              handleEditPersona(item.personaId);
                              hanldeSetPersonaName(item);
                            }}
                            sx={{
                              border: "1px solid #cacccc",
                              height: "32px",
                              width: "32px",
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "3px",
                              "&:hover": {
                                borderColor: "#146ef6",
                              },
                              "&:hover svg": {
                                color: "#146ef6",
                              },
                            }}
                          >
                            <BorderColorIcon
                              sx={{ color: "#737373", fontSize: "15px" }}
                            />
                          </Box>

                          <Box
                            onClick={() => handleCopyPersona(item.personaId)}
                            sx={{
                              border: "1px solid #cacccc",
                              height: "32px",
                              width: "32px",
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "3px",
                              "&:hover": {
                                borderColor: "#146ef6",
                              },
                              "&:hover svg": {
                                color: "#146ef6",
                              },
                            }}
                          >
                            <ContentCopyOutlinedIcon
                              sx={{ color: "#737373", fontSize: "15px" }}
                            />
                          </Box>

                          <Box
                            onClick={() => handleConfirmDelete(item)}
                            className="delet-box"
                            sx={{
                              border: "1px solid #cacccc",
                              height: "32px",
                              width: "32px",
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "3px",
                              color: "#737373",
                              "&:hover": {
                                borderColor: "#f75252",
                              },
                              "&:hover svg": {
                                color: "#f75252",
                              },
                            }}
                          >
                            <DeleteOutlinedIcon
                              sx={{ color: "#737373", fontSize: "15px" }}
                            />
                          </Box>
                        </Stack>
                        :
                        null
                    }

                  </Stack>
                ))}
            </ReactSortable>

            {/* </Stack> */}
          </Stack>
        </Stack>
      )}

      {!isManagePersona && (
        <Stack sx={{ height: "100%" }}>
          <Stack
            className="topPersonaRow"
            sx={{
              height: "10%",
              backgroundColor: "#ffffff",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              borderTopLeftRadius: "3px",
              borderTopRightRadius: "3px",
            }}
          >
            <Typography
              sx={{
                color: "rgba(71, 71, 71, 1)",
                fontSize: "16px",
                fontWeight: 600,
                fontFamily:
                  'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                pl: 2,
              }}
            >
              {/* New Persona */}
              {isEdit
                ? "Edit Persona"
                : isCopy
                  ? `Copy Persona`
                  : "New Persona"}
            </Typography>

            {
              showOnlyPersona ?
                null :
                <Box
                  component="div"
                  onClick={handleClose1}
                  sx={{ cursor: "pointer", pr: 2 }}
                >
                  <CloseRoundedIcon
                    sx={{
                      color: "rgba(71, 71, 71, 1)",
                      height: "15px",
                      width: "15px",
                    }}
                  />
                </Box>
            }
          </Stack>

          <Stack
            className="newPersonaModal"
            sx={{
              overflowY: "scroll",
              overflowX: "hidden",
              height: "80%",
              width: "100%",
            }}
          >
            <Stack
              sx={{
                p: "10px 15px 20px 15px",
                backgroundColor: "#ffffff",
                borderBottom: "1px solid #e6e6e6",
                borderTop: "1px solid #e6e6e6",
              }}
            >
              <Typography
                sx={{
                  color: "rgba(0, 0, 0, 1)",
                  fontSize: "13px",
                  fontWeight: 600,
                  fontFamily:
                    'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                  paddingBottom: "5px",
                }}
              >
                Persona Name
              </Typography>

              <TextField
                // value={isEdit ? labelName : personaName || isCopy ? `Copy of ${labelName}` : personaName}
                // value={isEdit ? personaName : (isCopy ? `Copy of ${personaName}` : personaName)}
                spellCheck="false"
                value={personaName}
                // value={(isCopy) ? labelName : personaName}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setNameError("");
                  setPersonaName(event.target.value);
                }}
                sx={{
                  "& .MuiInputBase-input.MuiOutlinedInput-input": {
                    p: "5px 20px 5px 10px",
                    fontSize: "14px",
                    fontWeight: 600,
                    fontFamily:
                      'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                    color: "rgba(0, 0, 0, 1)",
                  },
                  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#146EF6",
                  },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#146EF6",
                    borderWidth: "1px",
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "#919191",
                    fontSize: "14px",
                    fontWeight: 600,
                    fontFamily:
                      'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                    opacity: 1,
                  },
                }}
                style={{ border: nameError ? "1px solid red" : "" }}
                placeholder="e.g. Marketing Leaders"
              />
              {nameError && (
                <Box sx={{ marginTop: "5px" }}>
                  <Typography sx={{ color: "red", fontSize: "12px;" }}>
                    {nameError}
                  </Typography>
                </Box>
              )}
            </Stack>

            <Stack
              sx={{ display: "flex", flexDirection: "row", height: "80%" }}
            >
              <Stack
                className="personaFilters"
                sx={{
                  width: "50%",
                  overflowY: "scroll",
                  pr: "10px",
                  pl: "15px",
                  height: "100%",
                }}
              >
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    pb: "15px",
                    pt: "15px",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 600,
                        fontFamily:
                          'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        color: "#737373",
                      }}
                    >
                      Filters
                    </Typography>
                  </Box>

                  <Box sx={{ pl: "3px" }}>
                    <InfoOutlinedIcon
                      sx={{
                        fontSize: "14px",
                        color: "#146EF6",
                      }}
                    />
                  </Box>
                </Stack>

                <Stack
                  sx={{
                    border: isModalName ? "1px solid #146EF6" : "",
                    borderColor: "#146EF6",
                    backgroundColor: "#ffffff",
                    mb: 1,
                  }}
                >
                  <Box
                    sx={{
                      border: "1px solid transparent",
                      "&:hover": {
                        color: "#146EF6",
                        border: !isModalName ? "1px solid #146EF6" : "",
                        backgroundColor: "#F7F7F7",
                        cursor: "pointer",
                      },
                    }}
                    onClick={onClickModalName}
                  >
                    {isModalName ? (
                      <NameModalOpen />
                    ) : (
                      <Stack>
                        <NameModalClose />
                      </Stack>
                    )}
                  </Box>
                  {isModalName && <NameModal />}
                </Stack>

                <Stack
                  sx={{
                    border: isModalJobTitle ? "1px solid #146EF6" : "",
                    borderColor: "#146EF6",
                    backgroundColor: "#ffffff",
                    mb: 1,
                  }}
                >
                  <Box
                    // sx={{ backgroundColor: isJobTitle ? "#F0F0F0" : "" }}
                    onClick={onClickModalJobTitle}
                  >
                    {isModalJobTitle ? (
                      <JobTitleModalOpen />
                    ) : (
                      <Stack>
                        <JobTitleModalClose
                        // dataJT={dataJT}
                        />
                      </Stack>
                    )}
                  </Box>
                  {isModalJobTitle && (
                    <JobTitleModal
                    // onDataUpdate={handleDataJTChange}
                    />
                  )}
                </Stack>

                <Stack
                  sx={{
                    border: isModalLocation ? "1px solid #146EF6" : "",
                    borderColor: "#146EF6",
                    backgroundColor: "#ffffff",
                    mb: 1,
                  }}
                >
                  <Box
                    // sx={{ backgroundColor: isCompany ? "#F0F0F0" : "" }}
                    onClick={onClickModalLocation}
                  >
                    {isModalLocation ? (
                      <LocationModalOpen />
                    ) : (
                      <Stack>
                        <LocationModalClose />
                      </Stack>
                    )}
                  </Box>
                  {isModalLocation && <LocationModal />}
                </Stack>

                <Stack
                  sx={{
                    border: isModalCompany ? "1px solid #146EF6" : "",
                    borderColor: "#146EF6",
                    backgroundColor: "#ffffff",
                    mb: 1,
                  }}
                >
                  <Box
                    sx={{
                      border: "1px solid transparent",
                      "&:hover": {
                        color: "#146EF6",
                        border: !isModalCompany ? "1px solid #146EF6" : "",
                        backgroundColor: "#F7F7F7",
                        cursor: "pointer",
                      },
                    }}
                    onClick={onClickModalCompany}
                  >
                    {isModalCompany ? (
                      <CompanyModalOpen />
                    ) : (
                      <Stack>
                        <CompanyModalClose />
                      </Stack>
                    )}
                  </Box>
                  {isModalCompany && <CompanyModal />}
                </Stack>

                <Stack
                  sx={{
                    border: isModalEmployees ? "1px solid #146EF6" : "",
                    borderColor: "#146EF6",
                    backgroundColor: "#ffffff",
                    mb: 1,
                  }}
                >
                  <Box
                    // sx={{ backgroundColor: isCompany ? "#F0F0F0" : "" }}
                    onClick={onClickModalEmployees}
                  >
                    {isModalEmployees ? (
                      <EmployeesModalOpen />
                    ) : (
                      <Stack>
                        <EmployeesModalClose />
                      </Stack>
                    )}
                  </Box>
                  {isModalEmployees && <EmployeesModal />}
                </Stack>

                <Stack
                  sx={{
                    border: isModalIndustry ? "1px solid #146EF6" : "",
                    borderColor: "#146EF6",
                    backgroundColor: "#ffffff",
                    mb: 1,
                  }}
                >
                  <Box
                    // sx={{ backgroundColor: isCompany ? "#F0F0F0" : "" }}
                    sx={{
                      border: "1px solid transparent",
                      "&:hover": {
                        color: "#146EF6",
                        border: !isModalIndustry ? "1px solid #146EF6" : "",
                        backgroundColor: "#F7F7F7",
                        cursor: "pointer",
                      },
                    }}
                    onClick={onClickModalIndustry}
                  >
                    {isModalIndustry ? (
                      <IndustryModalOpen />
                    ) : (
                      <Stack>
                        <IndustryModalClose />
                      </Stack>
                    )}
                  </Box>
                  {isModalIndustry && <IndustryModal />}
                </Stack>

                <Stack
                  sx={{
                    border: isModalTYE ? "1px solid #146EF6" : "",
                    borderColor: "#146EF6",
                    backgroundColor: "#ffffff",
                    mb: 1,
                  }}
                >
                  <Box
                    sx={{
                      border: "1px solid transparent",
                      "&:hover": {
                        color: "#146EF6",
                        border: !isModalTYE ? "1px solid #146EF6" : "",
                        backgroundColor: "#F7F7F7",
                        cursor: "pointer",
                      },
                    }}
                    onClick={onClickModalTYE}
                  >
                    {isModalTYE ? (
                      <TotalYearsOfExperienceModalOpen />
                    ) : (
                      <Stack>
                        <TotalYearsOfExperienceModalClose />
                      </Stack>
                    )}
                  </Box>
                  {isModalTYE && <TotalYearsOfExperienceModal />}
                </Stack>

                <Stack
                  sx={{
                    border: isModalEducation ? "1px solid #146EF6" : "",
                    borderColor: "#146EF6",
                    backgroundColor: "#ffffff",
                    mb: 1,
                  }}
                >
                  <Box
                    sx={{
                      border: "1px solid transparent",
                      "&:hover": {
                        color: "#146EF6",
                        border: !isModalEducation ? "1px solid #146EF6" : "",
                        backgroundColor: "#F7F7F7",
                        cursor: "pointer",
                      },
                    }}
                    onClick={onClickModalEducation}
                  >
                    {isModalEducation ? (
                      <EducationModalOpen />
                    ) : (
                      <Stack>
                        <EducationModalClose />
                      </Stack>
                    )}
                  </Box>
                  {isModalEducation && <EducationModal />}
                </Stack>

                <Stack
                  sx={{
                    border: isModalSkills ? "1px solid #146EF6" : "",
                    borderColor: "#146EF6",
                    backgroundColor: "#ffffff",
                    mb: 1,
                  }}
                >
                  <Box
                    sx={{
                      border: "1px solid transparent",
                      "&:hover": {
                        color: "#146EF6",
                        border: !isModalSkills ? "1px solid #146EF6" : "",
                        backgroundColor: "#F7F7F7",
                        cursor: "pointer",
                      },
                    }}
                    onClick={onClickModalSkills}
                  >
                    {isModalSkills ? (
                      <SkillsModalOpen />
                    ) : (
                      <Stack>
                        <SkillsModalClose />
                      </Stack>
                    )}
                  </Box>
                  {isModalSkills && <SkillsModal />}
                </Stack>

                <Stack
                  sx={{
                    border: isModalLanguage ? "1px solid #146EF6" : "",
                    borderColor: "#146EF6",
                    backgroundColor: "#ffffff",
                    mb: 1,
                  }}
                >
                  <Box
                    sx={{
                      border: "1px solid transparent",
                      "&:hover": {
                        color: "#146EF6",
                        border: !isModalLanguage ? "1px solid #146EF6" : "",
                        backgroundColor: "#F7F7F7",
                        cursor: "pointer",
                      },
                    }}
                    onClick={onClickModalLanguage}
                  >
                    {isModalLanguage ? (
                      <LanguageModalOpen />
                    ) : (
                      <Stack>
                        <LanguageModalClose />
                      </Stack>
                    )}
                  </Box>
                  {isModalLanguage && <LanguageModal />}
                </Stack>

                <Stack
                  sx={{
                    border: isModalCertification ? "1px solid #146EF6" : "",
                    borderColor: "#146EF6",
                    backgroundColor: "#ffffff",
                    mb: 1,
                  }}
                >
                  <Box
                    sx={{
                      border: "1px solid transparent",
                      "&:hover": {
                        color: "#146EF6",
                        border: !isModalCertification
                          ? "1px solid #146EF6"
                          : "",
                        backgroundColor: "#F7F7F7",
                        cursor: "pointer",
                      },
                    }}
                    onClick={onClickModalCertification}
                  >
                    {isModalCertification ? (
                      <CertificationModalOpen />
                    ) : (
                      <Stack>
                        <CertificationModalClose />
                      </Stack>
                    )}
                  </Box>
                  {isModalCertification && <CertificationModal />}
                </Stack>
              </Stack>

              <Stack sx={{ width: "50%" }}>
                <Stack
                  sx={{
                    width: "100%",
                    backgroundColor: "#ffffff",
                    height: "100%",
                    borderLeft: "1px solid #e6e6e6",
                  }}
                >
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      pb: "15px",
                      pt: "15px",
                      pr: "10px",
                      pl: "15px",
                      borderBottom: "1px solid #cacccc",
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          color: "rgba(71, 71, 71, 1)",
                          fontSize: "14px",
                          fontWeight: 600,
                          fontFamily:
                            'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        }}
                      >
                        Results
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        sx={{
                          color: "rgba(71, 71, 71, 1)",
                          fontSize: "14px",
                          fontWeight: 600,
                          fontFamily:
                            'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        }}
                      >
                        {isEdit || isCopy || isNewPersona
                          ? `${totalRecords} records found`
                          : "0 records found"}
                      </Typography>
                    </Box>
                  </Stack>
                  {loading ? (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <CircularProgress
                        sx={{ color: "#146EF6", fontSize: "20px" }}
                      />
                    </Box>
                  ) : (
                    <Box>
                      {personaData.length > 0 &&
                        (isEdit || isCopy || isNewPersona) ? (
                        <>
                          {" "}
                          {personaData.map((item: any) => (
                            <Stack
                              key={item.id}
                              sx={{
                                width: "98%",
                                // height: '79px',
                                borderBottom: "1px solid #cacccc",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <Stack sx={{ pl: "10px" }}>
                                <Typography
                                  sx={{
                                    color: "rgba(26, 26, 26, 1)",
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    textTransform: "capitalize",
                                    fontFamily:
                                      'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                    paddingLeft: "2px",
                                  }}
                                  component="div"
                                >
                                  {item.full_name}
                                </Typography>

                                <Typography
                                  sx={{
                                    color: "rgba(71, 71, 71, 1)",
                                    fontSize: "12px",
                                    fontWeight: 400,
                                    fontFamily:
                                      'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                    paddingLeft: "2px",
                                    textTransform: "capitalize",
                                  }}
                                >
                                  {capitalizeFirstLetter(item.job_title)}
                                </Typography>

                                <Typography
                                  sx={{
                                    color: "rgba(71, 71, 71, 1)",
                                    fontSize: "12px",
                                    fontWeight: 400,
                                    fontFamily:
                                      'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                    paddingLeft: "2px",
                                    textTransform: "capitalize",
                                  }}
                                >
                                  {capitalizeFirstLetter(item.job_company_name)}
                                </Typography>

                                {item.location_name && (
                                  <Box
                                    component="div"
                                    sx={{
                                      display: "flex",
                                      flexDirection: "row",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Box component="div">
                                      <PlaceOutlinedIcon
                                        sx={{ fontSize: "14px" }}
                                      />
                                    </Box>
                                    <Box component="div">
                                      <Typography
                                        sx={{
                                          color: "rgba(71, 71, 71, 1)",
                                          fontSize: "12px",
                                          fontWeight: 400,
                                          fontFamily:
                                            'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                          textTransform: "capitalize",
                                        }}
                                      >
                                        {capitalizeFirstLetter(
                                          item.location_name
                                        )}
                                      </Typography>
                                    </Box>
                                  </Box>
                                )}
                              </Stack>

                              {/* <Stack sx={{ pr: '10px' }}>
                                                        <img
                                                            src='https://res.cloudinary.com/doxor5nnu/image/upload/v1683968391/Amazon-Logo-Font-1-scaled_f7sumk.webp'
                                                            alt="img" style={{
                                                                height: '40px', width: '40px',
                                                                backgroundColor: 'rgba(208, 216, 226, 1)',
                                                                borderRadius: '5px'
                                                            }} />
                                                    </Stack> */}
                            </Stack>
                          ))}{" "}
                        </>
                      ) : (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            height: "100%",
                          }}
                        >
                          <Typography
                            sx={{
                              color: "#919191",
                              borderBottomColor: "rgb(192 192 192)",
                              marginTop: "5px",
                            }}
                          >
                            No data available.
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  )}

                  <Stack
                    sx={{
                      pb: "15px",
                      pt: "15px",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Box>
                      <WestRoundedIcon
                        sx={{ color: "#cacccc", fontSize: "20px" }}
                      />
                    </Box>
                    <Typography
                      sx={{
                        color: "rgba(71, 71, 71, 1)",
                        fontSize: "14px",
                        fontWeight: 600,
                        fontFamily:
                          'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        pl: "5px",
                      }}
                    >
                      Please select some filters
                    </Typography>
                  </Stack>
                </Stack>
                {totalRecords && (isEdit || isCopy || isNewPersona) ? (
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
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
                      {displayTextPersonaData}
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
                          cursor:
                            personaModalPage === 0 ? "not-allowed" : "pointer",
                          padding: "1px",
                          "&:hover": {
                            borderColor:
                              personaModalPage !== 0 ? "#146EF6" : "#CACACC",
                            backgroundColor: "#ffffff",
                            "&:not(:last-child):hover": {
                              borderRightColor:
                                personaModalPage !== 0 ? "#146EF6" : "#CACACC",
                            },
                          },
                        }}
                        onClick={() =>
                          handlePersonaPageChange(personaModalPage - 1)
                        }
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
                          width: "55px",
                          backgroundColor: "#ffffff",
                          "&:hover": {
                            backgroundColor: "#ffffff",
                            borderColor: "#146EF6",
                            "&:not(:last-child):hover": {
                              borderRightColor: "#146EF6",
                            },
                          },
                        }}
                        onClick={handlePersonaPagination}
                        endIcon={
                          <ArrowDropDownIcon sx={{ color: "#737373" }} />
                        }
                      >
                        <Typography
                          sx={{
                            pt: "2px",
                            fontSize: "13px",
                            fontWeight: "400",
                          }}
                        >
                          {personaModalPage + 1}
                        </Typography>
                      </Button>
                      <Menu
                        id="pagination-btn-menu"
                        anchorEl={pagination}
                        open={openPaginationBtn}
                        onClose={handlePersonaPaginationClose}
                        MenuListProps={{
                          "aria-labelledby": "pagination-btn",
                        }}
                        sx={{
                          width: "200px",
                          color: "#474747",
                          height: "250px",
                          "& .MuiPaper-root.MuiMenu-paper.MuiPopover-paper": {
                            overflowX: "scroll",
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
                        {Array.from(
                          {
                            length:
                              parseInt(totalRecords) > 100
                                ? 100
                                : Math.ceil(
                                  parseInt(totalRecords) / dataPerPage
                                ),
                          },
                          (_, index) => {
                            const pageNumber = index;
                            const displayNumber = index + 1;
                            return (
                              <MenuItem
                                sx={{
                                  "&:hover": {
                                    backgroundColor: "#146EF6",
                                    color: "#ffffff",
                                  },
                                }}
                                disableRipple
                                key={pageNumber}
                                onClick={() => {
                                  console.log(
                                    personaModalPage,
                                    "dd",
                                    totalRecords
                                  );
                                  handlePersonaPageChange(pageNumber);
                                  handlePersonaPaginationClose();
                                }}
                              >
                                {displayNumber}
                              </MenuItem>
                            );
                          }
                        )}
                      </Menu>

                      <Button
                        sx={{
                          borderColor: "#CACACC",
                          backgroundColor: "#ffffff",
                          color: "#737373",
                          cursor:
                            (personaModalPage + 1) * dataPerPage >= totalRecords
                              ? "not-allowed"
                              : "pointer",
                          padding: "1px",
                          "&:hover": {
                            backgroundColor: "#ffffff",
                            borderColor:
                              (personaModalPage + 1) * dataPerPage >=
                                totalRecords
                                ? "#CACACC"
                                : "#146EF6",
                          },
                        }}
                        onClick={() => {
                          if (
                            (personaModalPage + 1) * dataPerPage >=
                            totalRecords
                          ) {
                            return false;
                          }
                          handlePersonaPageChange(personaModalPage + 1);
                        }}
                      >
                        <ArrowRightOutlinedIcon />
                      </Button>
                    </ButtonGroup>
                  </Stack>
                ) : (
                  <></>
                )}
              </Stack>
            </Stack>
          </Stack>

          <Stack
            sx={{
              height: "10%",
              backgroundColor: "#ffffff",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid #e6e6e6",
              borderBottomLeftRadius: "3px",
              borderBottomRightRadius: "3px",
            }}
          >
            {!isEdit && !isCopy ? (
              <Button
                disableRipple
                onClick={handleIsManagePersona}
                sx={{
                  color: "#146EF6",
                  display: !isEdit ? "block" : "none",
                  fontSize: "16px",
                  height: "30px",
                  fontWeight: 600,
                  p: "0px 5px 0px 5px",
                  fontFamily:
                    'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                  textTransform: "capitalize",
                  ml: 2,
                  "&:hover": {
                    backgroundColor: "#F0F0F0",
                  },
                }}
              >
                Manage Personas
              </Button>
            ) : (
              <Stack></Stack>
            )}

            <Stack
              sx={{ display: "flex", flexDirection: "row", mr: 1 }}
              direction="row"
              spacing={1}
            >
              <Button
                disableRipple
                variant="outlined"
                color="secondary"
                size="small"
                onClick={() => {
                  handleIsManagePersona();
                  setIsModalJobTitle(false);
                  setIsModalLocation(false);
                  setIsModalEmployees(false);
                  setIsModalIndustry(false);
                  setIsModalEducation(false);
                  setIsModalSkills(false);
                  setIsModalLanguage(false);
                  setIsModalCertification(false);
                }}
              >
                Cancel
              </Button>

              <Button
                disableRipple
                onClick={handlePersonaSave}
                variant="contained"
                color="primary"
                disabled={getDisabled()}
                size="small"
              >
                Save Persona
              </Button>
            </Stack>
          </Stack>
        </Stack>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        className="dialog-box"
      >
        {dialogContent && (
          <>
            <DialogTitle
              id="responsive-dialog-title"
              sx={{ textAlign: "center", fontSize: "14px" }}
            >
              {"Are you sure you want to delete "}
              <Typography
                component="span"
                sx={{ fontWeight: "600", paddingRight: "3px" }}
              >
                {dialogContent.personaName}
              </Typography>
              {"?"}
            </DialogTitle>
            {/* <DialogContent>
                        <DialogContentText>
                            {"Are you sure you want to delete " + dialogContent.personaName + "?"}
                        </DialogContentText>
                    </DialogContent> */}
            <DialogActions
              sx={{
                display: "flex",
                justifyContent: "right",
                alignItems: "center",
              }}
            >
              <Button
                autoFocus
                onClick={handleClose}
                // sx={{ textTransform: "none" }}
                disableRipple
                sx={{
                  color: "rgba(26, 26, 26, 1)",
                  height: "31px",
                  borderColor: "rgba(202, 202, 204, 1)",
                  fontSize: "16px",
                  fontWeight: 600,
                  fontFamily:
                    'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                  textTransform: "capitalize",
                  boxShadow: 0,
                  "&:hover": {
                    color: "#146EF6",
                    borderColor: "#146EF6",
                    backgroundColor: "#ffffff",
                    boxShadow: 0,
                  },
                }}
                variant="outlined"
              >
                No
              </Button>

              <Button
                variant="contained"
                onClick={handleDelete}
                color="error"
                disableRipple
                //  sx={{ textTransform: "none" }}
                sx={{
                  color: "#ffffff",
                  height: "31px",
                  backgroundColor: "#146EF6",
                  fontSize: "16px",
                  fontWeight: 600,
                  fontFamily:
                    'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                  textTransform: "capitalize",
                  boxShadow: 0,
                  "&:hover": {
                    color: "#ffffff",
                    backgroundColor: "#0852C2",
                    boxShadow: 0,
                  },
                }}
                autoFocus
              >
                Yes
              </Button>
            </DialogActions>{" "}
          </>
        )}
      </Dialog>

      <Snackbar
        id="closeTableLayout"
        onClose={closeErrorLayout}
        open={showError}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          icon={
            <Dangerous
              sx={{
                color: "#ffffff",
                fontSize: "20px",
              }}
            />
          }
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#d32f2f",
            width: "250px",
            // '& .MuiButtonBase-root.MuiIconButton-root': {
            //   '&:hover': {
            //     backgroundColor: '#ffffff'
            //   }
            // },

            "& .MuiAlert-message": {
              fontSize: "14px",
              fontFamily:
                'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
              fontWeight: 600,
              color: "#ffffff",
            },
          }}
        >
          {modalErrorMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default PersonaModal;
