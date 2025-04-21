import { React, useEffect, useRef, useState } from "../../../../../../../shared/modules/React";
import { useContext } from "react";
import JobTitle from "./JobTitle/JobTitle";
import Company from "./Company/Company";
import {
  // Box,
  // Button,
  // Stack,
  // TextField,
  // Typography,
  // InputAdornment,
  // Card,
  // Modal,
  styled,
  InputBase,
  // Collapse,
} from "@mui/material";
import { Box } from '../../../../../../../shared/modules/MaterialImports/Box';
import { Typography } from '../../../../../../../shared/modules/MaterialImports/Typography';
import { Stack } from '../../../../../../../shared/modules/MaterialImports/Stack';
import { Button, TextField, InputAdornment, showToaster } from '../../../../../../../shared/modules/commonImports'
// import Divider from "@mui/material/Divider";
// import Lists from "./Lists/Lists";
import Persona from "./Persona/Persona";
// import PersonaModalFilter from "./Persona/PersonaModalFilter";
import Name from "./Name/Name";
import Location from "./Location/Location";
import Employees from "./Employees/Employees";
import Industry from "./Industry/Industry";
import Skills from "./Skills/Skills";
import Language from "./Language/Language";
import Certification from "./Certification/Certification";
// import BooleanSearch from "./BooleanSearch/BooleanSearch";
// import Funding from "./Funding/Funding";
// import JobPostings from "./JobPostings/JobPostings";
// import LaunchIcon from "@mui/icons-material/Launch";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import "./Search.scss";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
// import ArticleIcon from "@mui/icons-material/Article";
// import ListsClose from "./Lists/ListsClose";
import PersonaClose from "./Persona/PersonaClose";
// import PersonaModalFilterClose from "./Persona/PersonaModalFilterClose";
import NameClose from "./Name/NameClose";
import JobTitleClose from "./JobTitle/JobTitleClose";
import CompanyClose from "./Company/CompanyClose";
import LocationClose from "./Location/LocationClose";
import EmployeesClose from "./Employees/EmployeesClose";
import IndustryClose from "./Industry/IndustryClose";
import SkillsClose from "./Skills/SkillsClose";
import LanguageClose from "./Language/LanguageClose";
import CertificationClose from "./Certification/CertificationClose";
// import BooleanSearchClose from "./BooleanSearch/BooleanSearchClose";
// import FundingClose from "./Funding/FundingClose";
// import JobPostingsClose from "./JobPostings/JobPostingsClose";
// import ListsOpen from "./Lists/ListsOpen";
import PersonaOpen from "./Persona/PersonaOpen";
// import PersonaModalFilterOpen from "./Persona/PersonaModalFilterOpen";
import NameOpen from "./Name/NameOpen";
import JobTitleOpen from "./JobTitle/JobTitleOpen";
import CompanyOpen from "./Company/CompanyOpen";
import LocationOpen from "./Location/LocationOpen";
import EmployeesOpen from "./Employees/EmployeesOpen";
import IndustryOpen from "./Industry/IndustryOpen";
import SkillsOpen from "./Skills/SkillsOpen";
import LanguageOpen from "./Language/LanguageOpen";
import CertificationOpen from "./Certification/CertificationOpen";
// import BooleanSearchOpen from "./BooleanSearch/BooleanSearchOpen";
// import FundingOpen from "./Funding/FundingOpen";
// import JobPostingsOpen from "./JobPostings/JobPostingsOpen";
import styles from "./../../../shared/config/variables.module.scss";
import TotalYearsOfExperience from "./TotalYearsOfExperience/TotalYearsOfExperience";
import TotalYearsOfExperienceOpen from "./TotalYearsOfExperience/TotalYearsOfExperienceOpen";
import TotalYearsOfExperienceClose from "./TotalYearsOfExperience/TotalYearsOfExperienceClose";
import CloseIcon from "@mui/icons-material/Close";
import {
  Store,
  // ModalStore 
} from "../../DataLabs/DataLabs";

// Modal components
// import NameModal from "./Name/NameModal";
// import NameModalClose from "./Name/NameModalClose";
// import NameModalOpen from "./Name/NameModalOpen";
// import JobTitleModal from "./JobTitle/JobTitleModal";
// import JobTitleModalClose from "./JobTitle/JobTitleModalClose";
// import JobTitleModalOpen from "./JobTitle/JobTitleModalOpen";
// import LocationModal from "./Location/LocationModal";
// import LocationModalClose from "./Location/LocationModalClose";
// import LocationModalOpen from "./Location/LocationModalOpen";
// import CompanyModal from "./Company/CompanyModal";
// import CompanyModalClose from "./Company/CompanyModalClose";
// import CompanyModalOpen from "./Company/CompanyModalOpen";
// import EmployeesModal from "./Employees/EmployeesModal";
// import EmployeesModalClose from "./Employees/EmployeesModalClose";
// import EmployeesModalOpen from "./Employees/EmployeesModalOpen";
// import IndustryModal from "./Industry/IndustryModal";
// import IndustryModalClose from "./Industry/IndustryModalClose";
// import IndustryModalOpen from "./Industry/IndustryModalOpen";
// import TotalYearsOfExperienceModal from "./TotalYearsOfExperience/TotalYearsOfExperienceModal";
// import TotalYearsOfExperienceModalClose from "./TotalYearsOfExperience/TotalYearsOfExperienceModalClose";
// import TotalYearsOfExperienceModalOpen from "./TotalYearsOfExperience/TotalYearsOfExperienceModalOpen";
// import SaveTo from "./SaveTo/SaveTo";
import EducationOpen from "./Education/EducationOpen";
import EducationClose from "./Education/EducationClose";
import Education from "./Education/Education";
// interface SearchProps {
//   onDataUpdate: (newDataJT: string[]) => void;
// }

const BootstrapInput = styled(InputBase)(() => ({
  "& .MuiInputBase-input": {
    position: "relative",
    backgroundColor: "#ffffff",
    fontSize: "14px",
    width: "242px",
    fontFamily:
      'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    paddingLeft: "5px",
  },
}));

const checkboxData = [
  {
    id: 1,
    parent: "Customer Service",
    key: "customer_service",
    children: [
      { id: 1, label: "Customer Success", key: "customer_success" },
      { id: 2, label: "Support", key: "support" },
    ],
  },
  {
    id: 2,
    parent: "Design",
    key: "design",
    children: [
      { id: 1, label: "Graphic Design", key: "graphic_design" },
      { id: 2, label: "Product Design", key: "product_design" },
      { id: 3, label: "Web Design", key: "web_design" },
    ],
  },
  {
    id: 3,
    parent: "Education",
    key: "education",
    children: [
      {
        id: 1,
        label: "Education Administration",
        key: "education_administration",
      },
      { id: 2, label: "Professor", key: "professor" },
      { id: 3, label: "Researcher", key: "researcher" },
      { id: 4, label: "Teacher", key: "teacher" },
    ],
  },
  {
    id: 4,
    parent: "Engineering",
    key: "engineering",
    children: [
      { id: 1, label: "Mechanical", key: "mechanical" },
      { id: 2, label: "Project Engineering", key: "project_engineering" },
      { id: 3, label: "Data", key: "data" },
      { id: 4, label: "Devops", key: "devops" },
      { id: 5, label: "Electrical", key: "electrical" },
      { id: 6, label: "Information Technology", key: "information_technology" },
      { id: 7, label: "Network", key: "network" },
      { id: 8, label: "Quality Assurance", key: "quality_assurance" },
      { id: 9, label: "Security", key: "security" },
      { id: 10, label: "Software", key: "software" },
      { id: 11, label: "Systems", key: "systems" },
      { id: 12, label: "Web", key: "web" },
    ],
  },
  {
    id: 5,
    parent: "Finance",
    key: "finance",
    children: [
      { id: 1, label: "Accounting", key: "accounting" },
      { id: 2, label: "Investment", key: "investment" },
    ],
  },
  {
    id: 6,
    parent: "Health",
    key: "health",
    children: [
      { id: 1, label: "Dental", key: "dental" },
      { id: 2, label: "Doctor", key: "doctor" },
      { id: 3, label: "Fitness", key: "fitness" },
      { id: 4, label: "Nursing", key: "nursing" },
      { id: 5, label: "Therapy", key: "therapy" },
      { id: 6, label: "Wellness", key: "wellness" },
    ],
  },
  {
    id: 7,
    parent: "Human Resources",
    key: "human_resources",
    children: [
      { id: 1, label: "Compensation", key: "compensation" },
      { id: 2, label: "Employee Development", key: "employee_development" },
      { id: 3, label: "Recruiting", key: "recruiting" },
    ],
  },
  {
    id: 8,
    parent: "Legal",
    key: "legal",
    children: [
      { id: 1, label: "Judicial", key: "judicial" },
      { id: 2, label: "Lawyer", key: "lawyer" },
      { id: 3, label: "Paralegal", key: "paralegal" },
    ],
  },
  {
    id: 9,
    parent: "Marketing",
    key: "marketing",
    children: [
      { id: 1, label: "Brand Marketing", key: "brand_marketing" },
      { id: 2, label: "Content Marketing", key: "content_marketing" },
      { id: 3, label: "Product Marketing", key: "product_marketing" },
      { id: 4, label: "Project Management", key: "project_management" },
    ],
  },
  {
    id: 10,
    parent: "Media",
    key: "media",
    children: [
      { id: 1, label: "Broadcasting", key: "broadcasting" },
      { id: 2, label: "Editorial", key: "editorial" },
      { id: 3, label: "Journalism", key: "journalism" },
      { id: 3, label: "Video", key: "video" },
      { id: 3, label: "Writing", key: "writing" },
    ],
  },
  {
    id: 11,
    parent: "Operations",
    key: "operations",
    children: [
      { id: 1, label: "Logistics", key: "logistics" },
      { id: 2, label: "Office_management", key: "office_management" },
      { id: 3, label: "Product", key: "product" },
    ],
  },
  {
    id: 12,
    parent: "Public Relations",
    key: "public_relations",
    children: [
      { id: 1, label: "Events", key: "events" },
      { id: 2, label: "Media Relations", key: "media_relations" },
    ],
  },
  {
    id: 13,
    parent: "Real Estate",
    key: "real_estate",
    children: [
      { id: 1, label: "Property Management", key: "property_management" },
      { id: 2, label: "Realtor", key: "realtor" },
    ],
  },
  {
    id: 14,
    parent: "Sales",
    key: "sales",
    children: [
      { id: 1, label: "Accounts", key: "accounts" },
      { id: 2, label: "Business Development", key: "business_development" },
      { id: 3, label: "Pipeline", key: "pipeline" },
    ],
  },
  {
    id: 15,
    parent: "Trades",
    key: "trades",
    children: [],
  },
];

// const Search: React.FC<SearchProps> = ({ onDataUpdate }) => {
const Search = () => {
  // const [companyData, setCompanyData] = useState<any>([])

  // const handleCompanyData = (data: any) => {
  //   // console.log('CompanyData', data)
  //   setCompanyData(data)
  // }

  // const refForUpdatingData = useRef<any>(null);
  // const [item, setItem] = React.useState({ "1": false });
  // const onClickHandle = (id: string) => {
  //   if (id === "1") {
  //     setItem({ "1": true });
  //   }
  // };

  // const boxes = [
  //   { id: "1", component: <Lists /> },
  //   { id: "2", component: <Persona /> },
  //   { id: "3", component: <Name /> },
  //   { id: "4", component: <JobTitle /> },
  //   { id: "5", component: <Company /> },
  //   { id: "6", component: <Location /> },
  //   { id: "7", component: <Employees /> },
  //   { id: "8", component: <Industry /> },
  //   { id: "9", component: <Education /> },
  //   { id: "10", component: <Skills /> },
  //   { id: "11", component: <Language /> },
  //   { id: "12", component: <Certification /> },
  //   { id: "13", component: <BooleanSearch /> },
  //   { id: "14", component: <Funding /> },
  //   { id: "15", component: <JobPostings /> },
  // ];
  // const [isMoreFilters, setIsMoreFilters] = useState(false);
  const [zipCodeValue, setZipCodeValue] = useState("");
  const [hqZipCodeValue, setHqZipCodeValue] = useState("");
  // const handleCloseMoreFilters = () => {
  //   setIsMoreFilters(false);
  // };

  // const onClickMoreFilters = () => {
  //   setIsList(false);
  //   setIsPersona(false);
  //   setIsName(false);
  //   setIsJobTitle(false);
  //   setIsCompany(false);
  //   setIsLocation(false);
  //   setIsTotalYearsOfExperience(false);
  //   setIsEmployees(false);
  //   setIsIndustry(false);
  //   setIsEducation(false);
  //   setIsSkills(false);
  //   setIsLanguage(false);
  //   setIsCertification(false);
  //   setIsBooleanSearch(false);
  //   setIsFunding(false);
  //   setIsJobPostings(false);

  //   setIsNameModal(false);
  //   setIsJobTitleModal(false);
  //   setIsLocationModal(false);
  //   setIsCompanyModal(false);
  //   setIsEmployeesModal(false);
  //   setIsIndustryModal(false);
  //   setIsTotalYearOfExperienceModal(false);
  //   setIsPersonaModal(false);
  //   setSearchModalData((prevState: any) => {
  //     return { ...prevState, ...searchData };
  //   });
  //   setIsMoreFilters(true);
  // };

  // const [isNameModal, setIsNameModal] = useState(false);

  // const onClickNameModal = () => {
  //   setIsNameModal(!isNameModal);
  //   setIsJobTitleModal(false);
  //   setIsLocationModal(false);
  //   setIsCompanyModal(false);
  //   setIsEmployeesModal(false);
  //   setIsIndustryModal(false);
  //   setIsTotalYearOfExperienceModal(false);
  //   setIsPersonaModal(false);
  // };

  // const [isJobTitleModal, setIsJobTitleModal] = useState(false);
  const [isSearchProp, setSearchProp] = useState(false);

  // const onClickJobTitleModal = () => {
  //   setIsJobTitleModal(!isJobTitleModal);
  //   setIsNameModal(false);
  //   console.log(isNameModal, "isNA");
  //   setIsLocationModal(false);
  //   setIsCompanyModal(false);
  //   setIsEmployeesModal(false);
  //   setIsIndustryModal(false);
  //   setIsTotalYearOfExperienceModal(false);
  //   setIsPersonaModal(false);
  // };

  // const [isLocationModal, setIsLocationModal] = useState(false);

  // const onClickLocationModal = () => {
  //   setIsLocationModal(!isLocationModal);
  //   setIsNameModal(false);
  //   setIsJobTitleModal(false);
  //   setIsCompanyModal(false);
  //   setIsEmployeesModal(false);
  //   setIsIndustryModal(false);
  //   setIsTotalYearOfExperienceModal(false);
  //   setIsPersonaModal(false);
  // };

  // const [isCompanyModal, setIsCompanyModal] = useState(false);

  // const onClickCompanyModal = () => {
  //   setIsCompanyModal(!isCompanyModal);
  //   setIsNameModal(false);
  //   setIsJobTitleModal(false);
  //   setIsLocationModal(false);
  //   setIsEmployeesModal(false);
  //   setIsIndustryModal(false);
  //   setIsTotalYearOfExperienceModal(false);
  //   setIsPersonaModal(false);
  // };

  // const [isEmployeesModal, setIsEmployeesModal] = useState(false);

  // const onClickEmployeesModal = () => {
  //   setIsEmployeesModal(!isEmployeesModal);
  //   setIsNameModal(false);
  //   setIsJobTitleModal(false);
  //   setIsLocationModal(false);
  //   setIsCompanyModal(false);
  //   setIsIndustryModal(false);
  //   setIsTotalYearOfExperienceModal(false);
  //   setIsPersonaModal(false);
  // };

  // const [isIndustryModal, setIsIndustryModal] = useState(false);

  // const onClickIndustryModal = () => {
  //   setIsIndustryModal(!isIndustryModal);
  //   setIsNameModal(false);
  //   setIsJobTitleModal(false);
  //   setIsLocationModal(false);
  //   setIsCompanyModal(false);
  //   setIsEmployeesModal(false);
  //   setIsTotalYearOfExperienceModal(false);
  //   setIsPersonaModal(false);
  // };

  // const [isTotalYearOfExperienceModal, setIsTotalYearOfExperienceModal] =
  useState(false);

  // const onClickTotalYearOfExperienceModal = () => {
  //   setIsTotalYearOfExperienceModal(!isTotalYearOfExperienceModal);
  //   setIsNameModal(false);
  //   setIsJobTitleModal(false);
  //   setIsLocationModal(false);
  //   setIsCompanyModal(false);
  //   setIsEmployeesModal(false);
  //   setIsIndustryModal(false);
  //   setIsPersonaModal(false);
  // };

  // const [isPersonaModal, setIsPersonaModal] = useState(false);

  // const onClickPersonaModal = () => {
  //   setIsPersonaModal(!isPersonaModal);
  //   setIsNameModal(false);
  //   setIsJobTitleModal(false);
  //   setIsLocationModal(false);
  //   setIsCompanyModal(false);
  //   setIsEmployeesModal(false);
  //   setIsIndustryModal(false);
  //   setIsTotalYearOfExperienceModal(false);
  // };

  const [isList, setIsList] = useState(false);
  const [isPersona, setIsPersona] = useState(false);
  const [isName, setIsName] = useState(false);
  const [isJobTitle, setIsJobTitle] = useState(false);
  const [isCompany, setIsCompany] = useState(false);
  const [isLocation, setIsLocation] = useState(false);
  const [isTotalYearsOfExperience, setIsTotalYearsOfExperience] =
    useState(false);

  const [isEmployees, setIsEmployees] = useState(false);
  const [isIndustry, setIsIndustry] = useState(false);
  const [isEducation, setIsEducation] = useState(false);
  const [isSkills, setIsSkills] = useState(false);
  const [isLanguage, setIsLanguage] = useState(false);
  const [isCertification, setIsCertification] = useState(false);
  const [isBooleanSearch, setIsBooleanSearch] = useState(false);
  const [isFunding, setIsFunding] = useState(false);
  const [isJobPostings, setIsJobPostings] = useState(false);
  // const [searchData, setSearchData] = useContext(Store);
  // const [searchModalData, setSearchModalData] = useContext(ModalStore);

  const [isFilterCleared, setFilterCleared] = useState(false);
  const onClickClearFilter = (event: any) => {
    setFilterCleared(!isFilterCleared);
    event.stopPropagation();
    setZipCodeValue("");
    setHqZipCodeValue("");
    setSearchData((prevSearchData: any) => ({
      ...prevSearchData,
      industries: [],
      industries_not_in: [],
      industry_company_not_in_names: [],
      industry_company_names: [],
      industry_all_company_names: [],
      company_names: [],
      company_not_in_names: [],
      company_past_names: [],
      exclude_company_names: [],
      no_of_employees: [],
      min: "",
      max: "",
      person_titles: [],
      person_not_titles: [],
      person_past_titles: [],
      title_is_boolean: "",
      title_management_level: [],
      title_department: [],
      title_department_sub_role: [],
      locations: [],
      locations_not_in: [],
      autoSkillsList: [],
      autoLanguagesList: [],
      autoCertificationsList: [],
      eduDegreeList: [],
      eduSchoolList: [],
      eduMajorList: [],
      hq_locations: [],
      hq_locations_not_in: [],
      full_name: "",
      minYear: "",
      maxYear: "",
      personaIds: [],
      checkedPersonas: [],
      displayData: [],
      exist_fields: [],
      not_exist_fields: [],
      zipcode: "",
      hqzipcode: "",
      skillsIn: [],
      languagesIn: [],
      certificationsIn: [],
      education: {
        schoolIn: [],
        majorIn: [],
        degreeIn: [],
        educationStartYear: "",
        educationEndYear: "",
      },
      booleanSearch: "",
      isMinYearValidation: false,
      isMaxYearValidation: false,
      isFromYearValidation: false,
      isToYearValidation: false,
      isMinValidation: false,
      isMaxValidation: false,
    }));
  };

  // const onClickList = () => {
  //   setIsList(!isList);
  //   setIsPersona(false);
  //   setIsName(false);
  //   setIsJobTitle(false);
  //   setIsCompany(false);
  //   setIsLocation(false);
  //   setIsTotalYearsOfExperience(false);

  //   setIsEmployees(false);
  //   setIsIndustry(false);
  //   setIsEducation(false);
  //   setIsSkills(false);
  //   setIsLanguage(false);
  //   setIsCertification(false);
  //   setIsBooleanSearch(false);
  //   setIsFunding(false);
  //   setIsJobPostings(false);
  // };

  const onClickPersona = () => {
    setIsList(false);
    setIsPersona(!isPersona);
    setIsName(false);
    setIsJobTitle(false);
    setIsCompany(false);
    setIsLocation(false);
    setIsTotalYearsOfExperience(false);

    setIsEmployees(false);
    setIsIndustry(false);
    setIsEducation(false);
    setIsSkills(false);
    setIsLanguage(false);
    setIsCertification(false);
    setIsBooleanSearch(false);
    setIsFunding(false);
    setIsJobPostings(false);
  };

  const onClickName = () => {
    setIsList(false);
    setIsPersona(false);
    setIsName(!isName);
    setIsJobTitle(false);
    setIsCompany(false);
    setIsLocation(false);
    setIsTotalYearsOfExperience(false);

    setIsEmployees(false);
    setIsIndustry(false);
    setIsEducation(false);
    setIsSkills(false);
    setIsLanguage(false);
    setIsCertification(false);
    setIsBooleanSearch(false);
    setIsFunding(false);
    setIsJobPostings(false);
  };

  useEffect(() => {
    if (isJobTitle) {
      setSearchProp((prev: any) => !prev);
    }
  }, [isJobTitle]);

  const onClickJobTitle = () => {
    setIsList(false);
    setIsPersona(false);
    setIsName(false);
    setIsJobTitle(!isJobTitle);
    setIsCompany(false);
    setIsLocation(false);
    setIsTotalYearsOfExperience(false);

    setIsEmployees(false);
    setIsIndustry(false);
    setIsEducation(false);
    setIsSkills(false);
    setIsLanguage(false);
    setIsCertification(false);
    setIsBooleanSearch(false);
    setIsFunding(false);
    setIsJobPostings(false);
  };

  const onClickCompany = () => {
    setIsList(false);
    setIsPersona(false);
    setIsName(false);
    setIsJobTitle(false);
    setIsCompany(!isCompany);
    setIsLocation(false);
    setIsTotalYearsOfExperience(false);

    setIsEmployees(false);
    setIsIndustry(false);
    setIsEducation(false);
    setIsSkills(false);
    setIsLanguage(false);
    setIsCertification(false);
    setIsBooleanSearch(false);
    setIsFunding(false);
    setIsJobPostings(false);
  };

  const onClickLocation = () => {
    setIsList(false);
    setIsPersona(false);
    setIsName(false);
    setIsJobTitle(false);
    setIsCompany(false);
    setIsLocation(!isLocation);
    setIsTotalYearsOfExperience(false);
    setIsEmployees(false);
    setIsIndustry(false);
    setIsEducation(false);
    setIsSkills(false);
    setIsLanguage(false);
    setIsCertification(false);
    setIsBooleanSearch(false);
    setIsFunding(false);
    setIsJobPostings(false);
  };

  const onClickTotalYearsOfExperience = () => {
    setIsList(false);
    setIsPersona(false);
    setIsName(false);
    setIsJobTitle(false);
    setIsCompany(false);
    setIsLocation(false);
    setIsTotalYearsOfExperience(!isTotalYearsOfExperience);
    setIsEmployees(false);
    setIsIndustry(false);
    setIsEducation(false);
    setIsSkills(false);
    setIsLanguage(false);
    setIsCertification(false);
    setIsBooleanSearch(false);
    setIsFunding(false);
    setIsJobPostings(false);
  };

  const onClickEmployees = () => {
    setIsList(false);
    setIsPersona(false);
    setIsName(false);
    setIsJobTitle(false);
    setIsCompany(false);
    setIsLocation(false);
    setIsTotalYearsOfExperience(false);

    setIsEmployees(!isEmployees);
    setIsIndustry(false);
    setIsEducation(false);
    setIsSkills(false);
    setIsLanguage(false);
    setIsCertification(false);
    setIsBooleanSearch(false);
    setIsFunding(false);
    setIsJobPostings(false);
  };

  const onClickIndustry = () => {
    setIsList(false);
    setIsPersona(false);
    setIsName(false);
    setIsJobTitle(false);
    setIsCompany(false);
    setIsLocation(false);
    setIsTotalYearsOfExperience(false);

    setIsEmployees(false);
    setIsIndustry(!isIndustry);
    setIsEducation(false);
    setIsSkills(false);
    setIsLanguage(false);
    setIsCertification(false);
    setIsBooleanSearch(false);
    setIsFunding(false);
    setIsJobPostings(false);
  };

  const onClickEducation = () => {
    setIsList(false);
    setIsPersona(false);
    setIsName(false);
    setIsJobTitle(false);
    setIsCompany(false);
    setIsLocation(false);
    setIsTotalYearsOfExperience(false);

    setIsEmployees(false);
    setIsIndustry(false);
    setIsEducation(!isEducation);
    setIsSkills(false);
    setIsLanguage(false);
    setIsCertification(false);
    setIsBooleanSearch(false);
    setIsFunding(false);
    setIsJobPostings(false);
  };

  const onClickSkills = () => {
    setIsList(false);
    setIsPersona(false);
    setIsName(false);
    setIsJobTitle(false);
    setIsCompany(false);
    setIsLocation(false);
    setIsTotalYearsOfExperience(false);

    setIsEmployees(false);
    setIsIndustry(false);
    setIsEducation(false);
    setIsSkills(!isSkills);
    setIsLanguage(false);
    setIsCertification(false);
    setIsBooleanSearch(false);
    setIsFunding(false);
    setIsJobPostings(false);
  };

  const onClickLanguage = () => {
    setIsList(false);
    setIsPersona(false);
    setIsName(false);
    setIsJobTitle(false);
    setIsCompany(false);
    setIsLocation(false);
    setIsTotalYearsOfExperience(false);

    setIsEmployees(false);
    setIsIndustry(false);
    setIsEducation(false);
    setIsSkills(false);
    setIsLanguage(!isLanguage);
    setIsCertification(false);
    setIsBooleanSearch(false);
    setIsFunding(false);
    setIsJobPostings(false);
  };

  const onClickCertification = () => {
    setIsList(false);
    setIsPersona(false);
    setIsName(false);
    setIsJobTitle(false);
    setIsCompany(false);
    setIsLocation(false);
    setIsTotalYearsOfExperience(false);

    setIsEmployees(false);
    setIsIndustry(false);
    setIsEducation(false);
    setIsSkills(false);
    setIsLanguage(false);
    setIsCertification(!isCertification);
    setIsBooleanSearch(false);
    setIsFunding(false);
    setIsJobPostings(false);
  };

  // const onClickBooleanSearch = () => {
  //   setIsList(false);
  //   setIsPersona(false);
  //   setIsName(false);
  //   setIsJobTitle(false);
  //   setIsCompany(false);
  //   setIsLocation(false);
  //   setIsTotalYearsOfExperience(false);

  //   setIsEmployees(false);
  //   setIsIndustry(false);
  //   setIsEducation(false);
  //   setIsSkills(false);
  //   setIsLanguage(false);
  //   setIsCertification(false);
  //   setIsBooleanSearch(!isBooleanSearch);
  //   setIsFunding(false);
  //   setIsJobPostings(false);
  // };

  // const onClickFunding = () => {
  //   setIsList(false);
  //   setIsPersona(false);
  //   setIsName(false);
  //   setIsJobTitle(false);
  //   setIsCompany(false);
  //   setIsLocation(false);
  //   setIsTotalYearsOfExperience(false);

  //   setIsEmployees(false);
  //   setIsIndustry(false);
  //   setIsEducation(false);
  //   setIsSkills(false);
  //   setIsLanguage(false);
  //   setIsCertification(false);
  //   setIsBooleanSearch(false);
  //   setIsFunding(!isFunding);
  //   setIsJobPostings(false);
  // };

  // const onClickJobPosting = () => {
  //   setIsList(false);
  //   setIsPersona(false);
  //   setIsName(false);
  //   setIsJobTitle(false);
  //   setIsCompany(false);
  //   setIsLocation(false);
  //   setIsTotalYearsOfExperience(false);

  //   setIsEmployees(false);
  //   setIsIndustry(false);
  //   setIsEducation(false);
  //   setIsSkills(false);
  //   setIsLanguage(false);
  //   setIsCertification(false);
  //   setIsBooleanSearch(false);
  //   setIsFunding(false);
  //   setIsJobPostings(!isJobPostings);
  // };

  // const isSaveTextfieldEmpty = () => {
  //   setIsList(false);
  //   setIsPersona(false);
  //   setIsName(false);
  //   setIsJobTitle(false);
  //   setIsCompany(false);
  //   setIsLocation(false);
  //   setIsTotalYearsOfExperience(false);

  //   setIsEmployees(false);
  //   setIsIndustry(false);
  //   setIsEducation(false);
  //   setIsSkills(false);
  //   setIsLanguage(false);
  //   setIsCertification(false);
  //   setIsBooleanSearch(false);
  //   setIsFunding(false);
  //   setIsJobPostings(false);

  //   setSearchData((prevSearchData: any) => ({
  //     ...prevSearchData,
  //     industries: [],
  //     industries_not_in: [],
  //     industry_company_not_in_names: [],
  //     industry_company_names: [],
  //     industry_all_company_names: [],
  //     company_names: [],
  //     company_not_in_names: [],
  //     company_past_names: [],
  //     exclude_company_names: [],
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
  //     personaIds: [],
  //   }));
  // };

  // const [dataJT, setDataJT] = useState<string[]>([]);

  // const handleDataJTChange = (newDataJT: string[]) => {
  //   setDataJT(newDataJT);
  // };

  const [searchData, setSearchData, isFilterApplied, setIsFilterApplied] =
    useContext(Store);
  // const [isFilterApplied, setIsFilterApplied] = useContext(Store);

  // const applyFiters = () => {
  //   setSearchData((prevState: any) => {
  //     return { ...prevState, ...searchModalData };
  //   });
  //   setIsMoreFilters(false);
  // };

  const applyFiltersMain = () => {
    // let chStatus = true; //!isFilterApplied;
    setIsFilterApplied(!isFilterApplied);
    console.log(searchData, "searchDaa");
    if (
      !searchData.isMinYearValidation &&
      !searchData.isMaxYearValidation &&
      !searchData.isFromYearValidation &&
      !searchData.isToYearValidation &&
      !searchData.isMinValidation &&
      !searchData.isMaxValidation
    ) {
      if (
        (searchData.industries &&
          searchData.industries.length &&
          searchData.industries &&
          searchData.industries.length) ||
        (searchData.company_names && searchData.company_names.length) ||
        (searchData.company_not_in_names &&
          searchData.company_not_in_names.length) ||
        (searchData.exclude_company_names &&
          searchData.exclude_company_names.length) ||
        (searchData.company_past_names &&
          searchData.company_past_names.length) ||
        (searchData.no_of_employees && searchData.no_of_employees.length) ||
        (searchData.person_titles && searchData.person_titles.length) ||
        (searchData.person_not_titles && searchData.person_not_titles.length) ||
        (searchData.person_past_titles &&
          searchData.person_past_titles.length) ||
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
        searchData.full_name !== "" ||
        searchData.min !== "" ||
        searchData.max !== "" ||
        searchData.title_is_boolean !== "" ||
        searchData.minYear !== "" ||
        searchData.maxYear !== "" ||
        searchData.exist_fields.length ||
        searchData.not_exist_fields.length ||
        searchData.industries_not_in.length ||
        searchData.industry_company_names.length ||
        searchData.industry_all_company_names.length ||
        searchData.industry_company_not_in_names.length ||
        searchData.zipcode !== "" ||
        searchData.booleanSearch !== "" ||
        searchData.hqzipcode !== "" ||
        (searchData.skillsIn && searchData.skillsIn.length) ||
        (searchData.languagesIn && searchData.languagesIn.length) ||
        (searchData.certificationsIn && searchData.certificationsIn.length) ||
        (searchData.education.degreeIn &&
          searchData.education.degreeIn.length) ||
        (searchData.education.schoolIn &&
          searchData.education.schoolIn.length) ||
        (searchData.education.majorIn && searchData.education.majorIn.length) ||
        (searchData.education.educationStartYear !== "" ||
          searchData.education.educationEndYear !== "")
      ) {
        setSearchData((prevSearchData: any) => ({
          ...prevSearchData,
          applyFilterToaster: false,
        }));
      } else {
        if (zipCodeValue !== "" || hqZipCodeValue !== "") {
          setSearchData((prevSearchData: any) => ({
            ...prevSearchData,
            applyFilterToaster: false,
          }));
        } else {
          setSearchData((prevSearchData: any) => ({
            ...prevSearchData,
            applyFilterToaster: true,
          }));
          checkValidations();
        }
      }
    } else {
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        applyFilterToaster: true,
      }));
      checkValidations();
    }
    // const newData = searchData.companyId
    // const filterCompanyData = companyData.find((item: any) => item.compid === newData)
    // const filteredCompanyName = filterCompanyData ? filterCompanyData.compname : ''

    // setSearchData((prevSearchData: any) => ({
    //   ...prevSearchData,
    //   company_names: [filteredCompanyName],
    // }));

    // console.log('newData:', filteredCompanyName)
  };

  const checkValidations = () => {
    let tempText = "";
    if (!searchData.isMinYearValidation && !searchData.isMaxYearValidation && !searchData.isFromYearValidation && !searchData.isToYearValidation && !searchData.isMinValidation && !searchData.isMaxValidation) {
      tempText = "Please Add your filter to begin your search";
    }
    else if (searchData.isMinYearValidation) {
      tempText = "Min Work Experience must be smaller than Max Work Experience.";
    }
    else if (searchData.isMaxYearValidation) {
      tempText = "Max Work Experience must be greater than Min Work Experience.";
    }
    else if (searchData.isFromYearValidation) {
      tempText = "From year shouldn't be more than To year.";
    }
    else if (searchData.isToYearValidation) {
      tempText = "To year shouldn't be less than From year.";
    }
    else if (searchData.isMinValidation) {
      tempText = "Min value must be smaller than Max value.";
    }
    else if (searchData.isMaxValidation) {
      tempText = "Max value must be greater than Min value.";
    }

    if (tempText) {
      showToaster(tempText, "error");
    }
  }

  const onChangeSearchPeople = (e: any) => {
    const inputValue = e.target.value;
    setDefSearchPeople(e.target.value);
    const updatedValue = inputValue
      .replace(/\band\b/gi, "AND")
      .replace(/\bor\b/gi, "OR")
      .replace(/\bnot\b/gi, "NOT")
      .trim();

    setSearchData((prevSearchData: any) => ({
      ...prevSearchData,
      booleanSearch: updatedValue,
    }));
  };

  // const defSearchPeopleData = [{ "name": searchData.searchBox, "count": 999 }];

  const [defSearchPeople, setDefSearchPeople] = React.useState(
    searchData.booleanSearch || ""
  );



  const handleAutocompleteChangeSearchPeople = (event: any) => {
    // console.log(event);
    const inputValue = event.target.value;

    const updatedValue = inputValue
      .replace(/\band\b/gi, "AND")
      .replace(/\bor\b/gi, "OR")
      .replace(/\bnot\b/gi, "NOT");

    if (event.key === "Enter") {
      console.log("working enter");
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        booleanSearch: updatedValue,
      }));
    }
  };

  const parentFrom = "Search";

  const persona = "persona";

  const department_titles_payload_array = searchData.title_department;

  const department_titles_payload_parent_array =
    department_titles_payload_array.map((item: any) =>
      checkboxData.filter((parent: any) => parent.key === item)
    );

  // console.log(
  //   "department_titles_payload_parent_array",
  //   department_titles_payload_parent_array
  // );

  const department_titles_payload_children_array_of_array =
    department_titles_payload_parent_array.map((item: any) =>
      item[0].children.map((chiid: any) => chiid.key)
    );

  function flattenArray(
    department_titles_payload_children_array_of_array: any
  ) {
    let department_titles_payload_children_array: any[] = [];

    department_titles_payload_children_array_of_array.forEach((item: any) => {
      if (Array.isArray(item)) {
        department_titles_payload_children_array =
          department_titles_payload_children_array.concat(flattenArray(item));
      } else {
        department_titles_payload_children_array.push(item);
      }
    });

    return department_titles_payload_children_array;
  }

  // Example usage
  const department_titles_payload_children_array = flattenArray(
    department_titles_payload_children_array_of_array
  );

  const [mileValue, setMileValue] = useState(null);
  const [hqMileValue, setHqMileValue] = useState(null);
  const getZipCode = (value: any, value2: any) => {
    setZipCodeValue(value);
    setMileValue(value2);
    setHqZipCodeValue("");
    setHqMileValue(null);
  };

  const getHqZipCode = (value: any, value2: any) => {
    setHqZipCodeValue(value);
    setHqMileValue(value2);
    setZipCodeValue("");
    setMileValue(null);
  };

  const [isbooleanClick, setIsBooleanClick] = useState(false);
  const wrapperRef = useRef<any>(null);
  const bootstrapInputRef = useRef<HTMLInputElement>(null);

  const checkBooleanClick = () => {
    setIsBooleanClick(true);
    setTimeout(() => {
      console.log("is coming here")
      bootstrapInputRef.current?.focus(); // Automatically focus on BootstrapInput
    }, 0);
  };

  const handleClickOutside = (event: any) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      if (defSearchPeople === "") {
        setIsBooleanClick(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, [defSearchPeople]);

  useEffect(() => {

    if (searchData.booleanSearch === "") {
      console.log("working trig search");
      setIsBooleanClick(false);
      setDefSearchPeople("");
    }
    else {
      setDefSearchPeople(searchData.booleanSearch)
      const input = bootstrapInputRef.current;
      if (input) {
        const length = input.value?.length;
        input.focus();
        input.setSelectionRange(length, length); // sets cursor at the end
      }

    }
  }, [searchData.booleanSearch]);



  return (
    <Stack sx={{ position: "relative" }}>
      <Stack
        sx={{
          width: "310px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#ffffff",

          height: "100%",
          borderRadius: "inherit",
        }}
      >
        {/* <Stack
          sx={{ textAlign: "left", color: "#1976d2" }}
          p={1}
        >
          <Typography
            sx={{
              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
              fontWeight: "600",
              fontSize: "14px",
              color: "#146EF6",
              paddingLeft: "8px",
            }}
          >
            Search
          </Typography>
        </Stack>
        <Divider /> */}
        <Box
          className="left-filter-container"
          sx={{
            borderBottom: "1px solid",
            borderBottomColor: styles.borderBottomColor,
          }}
        >
          <Stack
            sx={{
              fontFamily:
                'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
              fontStyle: "normal",
              fontWeight: "600",
              fontSize: "16px",
              color: styles.defaultTextColor,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: "8px",
            }}
          >
            Filters
            {(searchData.industries &&
              searchData.industries.length &&
              searchData.industries &&
              searchData.industries.length) ||
              (searchData.company_names && searchData.company_names.length) ||
              (searchData.company_not_in_names &&
                searchData.company_not_in_names.length) ||
              (searchData.exclude_company_names &&
                searchData.exclude_company_names.length) ||
              (searchData.company_past_names &&
                searchData.company_past_names.length) ||
              (searchData.no_of_employees && searchData.no_of_employees.length) ||
              (searchData.person_titles && searchData.person_titles.length) ||
              (searchData.person_not_titles &&
                searchData.person_not_titles.length) ||
              (searchData.person_past_titles &&
                searchData.person_past_titles.length) ||
              (searchData.title_management_level &&
                searchData.title_management_level.length) ||
              (searchData.title_department &&
                searchData.title_department.length) ||
              (searchData.title_department_sub_role &&
                searchData.title_department_sub_role.length) ||
              (searchData.locations && searchData.locations.length) ||
              (searchData.locations_not_in &&
                searchData.locations_not_in.length) ||
              (searchData.hq_locations && searchData.hq_locations.length) ||
              (searchData.hq_locations_not_in &&
                searchData.hq_locations_not_in.length) ||
              (searchData.personaIds && searchData.personaIds.length) ||
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
              searchData.industry_company_names.length ||
              searchData.industry_all_company_names.length ||
              searchData.industry_company_not_in_names.length ||
              searchData.zipcode !== "" ||
              searchData.hqzipcode !== "" ||
              (searchData.skillsIn && searchData.skillsIn.length) ||
              (searchData.languagesIn && searchData.languagesIn.length) ||
              (searchData.certificationsIn &&
                searchData.certificationsIn.length) ||
              (searchData.education.degreeIn &&
                searchData.education.degreeIn.length) ||
              (searchData.education.schoolIn &&
                searchData.education.schoolIn.length) ||
              (searchData.education.majorIn &&
                searchData.education.majorIn.length) ||
              searchData.education.educationStartYear !== "" ||
              searchData.education.educationEndYear !== "" ? (
              <Stack className="filter-num-con" onClick={onClickClearFilter}>
                <CloseIcon
                  sx={{
                    color: "#737373",
                    fontSize: "16px",
                  }}
                />
                <Typography
                  sx={{
                    fontFamily:
                      'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                    fontSize: "12px",
                    fontWeight: "600",
                  }}
                >
                  {searchData.person_titles.length +
                    searchData.person_not_titles.length +
                    searchData.person_past_titles.length +
                    searchData.title_management_level.length +
                    (searchData.title_department_sub_role.length +
                      searchData.title_department.length -
                      department_titles_payload_children_array.length) +
                    (searchData.title_is_boolean &&
                      searchData.title_is_boolean.length
                      ? 1
                      : 0) +
                    (searchData.booleanSearch && searchData.booleanSearch.length
                      ? 1
                      : 0) +
                    (searchData.full_name && searchData.full_name.length
                      ? 1
                      : 0) +
                    (searchData.locations.length +
                      searchData.locations_not_in.length +
                      searchData.hq_locations.length +
                      searchData.hq_locations_not_in.length) +
                    searchData.no_of_employees.length +
                    (searchData.minYear !== "" ? 1 : 0) +
                    (searchData.maxYear !== "" ? 1 : 0) +
                    (searchData.company_names.length +
                      searchData.company_not_in_names.length +
                      searchData.exclude_company_names.length +
                      searchData.company_past_names.length) +
                    searchData.industries.length +
                    searchData.personaIds.length +
                    searchData.exist_fields.length +
                    searchData.not_exist_fields.length +
                    searchData.industries_not_in.length +
                    searchData.industry_company_names.length +
                    searchData.industry_all_company_names.length +
                    searchData.industry_company_not_in_names.length +
                    (searchData.zipcode !== "" ? 1 : 0) +
                    (searchData.hqzipcode !== "" ? 1 : 0) +
                    searchData.skillsIn.length +
                    searchData.languagesIn.length +
                    searchData.certificationsIn.length +
                    searchData.education.degreeIn.length +
                    searchData.education.schoolIn.length +
                    searchData.education.majorIn.length +
                    (searchData.education.educationStartYear !== "" ? 1 : 0) +
                    (searchData.education.educationEndYear !== "" ? 1 : 0)}
                </Typography>
              </Stack>
            ) : (
              <></>
            )}
          </Stack>
          {/* <Typography
            onClick={applyFiltersMain}
            sx={{
              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
              fontStyle: "normal",
              fontWeight: "600",
              fontSize: "12px",
              color: (searchData.companyId ? styles.primaryTextColor : "#919191"),
              cursor: "pointer",
            }}
          >
            Apply Filter
          </Typography> */}
        </Box>
        {/* <Divider /> */}
        <Box
          p={1}
          sx={{
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid",
            borderBottomColor: styles.borderBottomColor,
          }}
          ref={wrapperRef}
        >
          {isbooleanClick || defSearchPeople !== "" ? (
            <Stack
              sx={{
                height: "72px",
                overflow: "hidden",
                border: "1px solid",
                borderRadius: "3px",
                borderColor: styles.greyColor,
                width: "100%",
                position: 'relative',

                "&:focus": {
                  borderColor: styles.borderColor1,
                },
                "&:hover": {
                  borderColor: styles.borderColor1,
                },
              }}
            >
              <InputAdornment
                position="start"
                sx={{
                  position: "absolute",
                  left: "8px",
                  top: "20px",
                  // transform: "translateY(-50%)",
                  zIndex: 1,
                  color: "#737373",
                }}
              >
                <SearchOutlinedIcon sx={{ fontSize: "25px" }} />
              </InputAdornment>
              <BootstrapInput
                inputRef={bootstrapInputRef}


                spellCheck="false"
                onChange={onChangeSearchPeople}
                onKeyDown={handleAutocompleteChangeSearchPeople}
                value={defSearchPeople}
                sx={{
                  color: styles.defaultTextColor,
                  paddingLeft: "40px",
                  fontWeight: "600",
                  "& .MuiInputBase-input::placeholder": {
                    opacity: 0.8,
                    color: "#737373",
                  },
                }}

                placeholder="Keywords OR boolean"
                multiline
              />
            </Stack>
          ) : (
            <>
              <TextField
                onClick={checkBooleanClick}
                sx={{
                  color: "#1A1A1A !important",
                  fontSize: "16px !important",
                  fontWeight: "600 !important",
                  fontFamily: "Segoe UI !important",
                  width: "100%",
                  "& .MuiInputBase-input": {
                    color: "#1A1A1A",
                    fontSize: "14px !important",
                    fontWeight: "600 !important",
                    fontFamily:
                      'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                    opacity: 1,
                  },
                  "& .MuiInputBase-input::placeholder": {
                    opacity: 0.8,
                    color: "#737373",
                  },
                }}
                placeholder="Keywords OR boolean"
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchOutlinedIcon
                        sx={{
                          marginRight: "10px",
                          paddingLeft: "8px",
                          color: "#737373",
                          fontSize: "30px",
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </>
          )}
        </Box>
        {/* <Divider /> */}
        {/* <Stack sx={{ overflowY: "scroll", height: "55vh" }}>
          {boxes.map((box) => (
            <React.Fragment key={box.id}>
              <Box
                className="left-containers"
                onClick={() => onClickHandle(box.id)}
              >
                {box.component}
              </Box>
              <Divider />
            </React.Fragment>
          ))}
        </Stack> */}
        <Stack
          className={isbooleanClick ? "left-sec-list-bool" : "left-sec-list"}
          sx={{
            overflowY: "scroll",
            flexGrow: "1",
            width: "310px",
          }}
        >
          {/* <Stack>
            <SaveTo isSaveTextfieldEmpty={isSaveTextfieldEmpty} />
          </Stack> */}
          {/* DataToComapany={handleCompanyData} */}

          {/* <Stack
            sx={{
              border: isBooleanSearch ? "1px solid " : "",
              borderColor: styles.borderColor1,
            }}
          >
            <Box
              // sx={{ backgroundColor: isCompany ? "#F0F0F0" : "" }}
              onClick={onClickBooleanSearch}
            >
              {isBooleanSearch ? <BooleanSearchOpen /> : <BooleanSearchClose />}
            </Box>
            {isBooleanSearch && <BooleanSearch />}
          </Stack> */}

          {/* <Box
            onClick={onClickBooleanSearch}
            className="left-containers"
            sx={{ paddingLeft: "8px" }}
          >
            <BooleanSearch />
          </Box> */}
          {/* <Divider /> */}

          <Stack
            sx={{
              border: isName ? "1px solid " : "",
              borderColor: styles.borderColor1,
              pointerEvents: searchData.companyId === "" ? "none" : "auto",
              opacity: searchData.companyId === "" ? "0.5" : "1",
            }}
          >
            <Box
              // sx={{ backgroundColor: isName ? "#F0F0F0" : "" }}
              onClick={onClickName}
            >
              {isName ? <NameOpen /> : <NameClose />}
            </Box>
            {isName && <Name />}
          </Stack>

          <Stack
            sx={{
              border: isPersona ? "1px solid " : "",
              borderColor: styles.borderColor1,
              pointerEvents: searchData.companyId === "" ? "none" : "auto",
              opacity: searchData.companyId === "" ? "0.5" : "1",
            }}
          >
            <Box
              // sx={{ backgroundColor: isPersona ? "#F0F0F0" : "" }}
              onClick={onClickPersona}
            >
              {isPersona ? <PersonaOpen /> : <PersonaClose />}
            </Box>
            {isPersona && <Persona persona={persona} />}
            {/* {isPersona && <Persona persona={persona} refForUpdatingData={refForUpdatingData} />} */}
          </Stack>

          <Stack
            sx={{
              border: isJobTitle ? "1px solid " : "",
              borderColor: styles.borderColor1,
              pointerEvents: searchData.companyId === "" ? "none" : "auto",
              opacity: searchData.companyId === "" ? "0.5" : "1",
            }}
          >
            <Box
              // sx={{ backgroundColor: isJobTitle ? "#F0F0F0" : "" }}
              onClick={onClickJobTitle}
            >
              {isJobTitle ? (
                <JobTitleOpen />
              ) : (
                <JobTitleClose
                // dataJT={dataJT}
                />
              )}
            </Box>
            {isJobTitle && (
              <JobTitle
                isPropChanged={isSearchProp}
                parentFrom={parentFrom}
              // onDataUpdate={handleDataJTChange}
              />
            )}
          </Stack>

          <Stack
            sx={{
              border: isLocation ? "1px solid " : "",
              borderColor: styles.borderColor1,
              pointerEvents: searchData.companyId === "" ? "none" : "auto",
              opacity: searchData.companyId === "" ? "0.5" : "1",
            }}
          >
            <Box
              // sx={{ backgroundColor: isCompany ? "#F0F0F0" : "" }}
              onClick={onClickLocation}
            >
              {isLocation ? (
                <LocationOpen />
              ) : (
                <LocationClose
                  getZipCode={getZipCode}
                  getHqZipCode={getHqZipCode}
                />
              )}
            </Box>
            {isLocation && (
              <Location
                getZipCode={getZipCode}
                isFilterCleared={isFilterCleared}
                getHqZipCode={getHqZipCode}
              />
            )}
          </Stack>

          {/* important */}

          <Stack>
            <Stack
              sx={{
                border: isCompany ? "1px solid " : "",
                borderColor: styles.borderColor1,
                pointerEvents: searchData.companyId === "" ? "none" : "auto",
                opacity: searchData.companyId === "" ? "0.5" : "1",
              }}
            >
              <Box onClick={onClickCompany}>
                {isCompany ? <CompanyOpen /> : <CompanyClose />}
              </Box>
              {isCompany && <Company />}
            </Stack>
          </Stack>

          <Stack
            sx={{
              border: isEmployees ? "1px solid " : "",
              borderColor: styles.borderColor1,
              pointerEvents: searchData.companyId === "" ? "none" : "auto",
              opacity: searchData.companyId === "" ? "0.5" : "1",
            }}
          >
            <Box
              // sx={{ backgroundColor: isCompany ? "#F0F0F0" : "" }}
              onClick={onClickEmployees}
            >
              {isEmployees ? <EmployeesOpen /> : <EmployeesClose />}
            </Box>
            {isEmployees && <Employees />}
          </Stack>

          <Stack
            sx={{
              border: isIndustry ? "1px solid " : "",
              borderColor: styles.borderColor1,
              pointerEvents: searchData.companyId === "" ? "none" : "auto",
              opacity: searchData.companyId === "" ? "0.5" : "1",
            }}
          >
            <Box
              // sx={{ backgroundColor: isCompany ? "#F0F0F0" : "" }}
              onClick={onClickIndustry}
            >
              {isIndustry ? <IndustryOpen /> : <IndustryClose />}
            </Box>
            {isIndustry && <Industry />}
          </Stack>

          <Stack
            sx={{
              border: isTotalYearsOfExperience ? "1px solid " : "",
              borderColor: styles.borderColor1,
              pointerEvents: searchData.companyId === "" ? "none" : "auto",
              opacity: searchData.companyId === "" ? "0.5" : "1",
            }}
          >
            <Box
              // sx={{ backgroundColor: isCompany ? "#F0F0F0" : "" }}
              onClick={onClickTotalYearsOfExperience}
            >
              {isTotalYearsOfExperience ? (
                <TotalYearsOfExperienceOpen />
              ) : (
                <TotalYearsOfExperienceClose />
              )}
            </Box>
            {isTotalYearsOfExperience && <TotalYearsOfExperience />}
          </Stack>

          {/* <Stack
            sx={{
              border: isList ? "1px solid " : "",
              borderColor: styles.borderColor1,
            }}
          >
            <Box
              // sx={{ backgroundColor: isList ? "#F0F0F0" : "" }}
              onClick={onClickList}
            >
              {isList ? <ListsOpen /> : <ListsClose />}
            </Box>
            {isList && <Lists />}
          </Stack> */}

          {/* <Box
            onClick={onClickList}
            className="left-containers"
          >
            <Lists />
          </Box> */}
          {/* <Divider /> */}

          {/* <Box
            onClick={onClickPersona}
            className="left-containers"
            sx={{ paddingLeft: "8px" }}
          >
            <Persona />
          </Box> */}
          {/* <Divider /> */}
          {/* <Box
            onClick={onClickName}
            className="left-containers"
            sx={{ paddingLeft: "8px" }}
          >
            <Name />
          </Box> */}
          {/* <Divider /> */}
          {/* <Box
            onClick={onClickLocation}
            className="left-containers"
            sx={{ paddingLeft: "8px" }}
          >
            <Location />
          </Box> */}
          {/* <Divider /> */}

          {/* <Divider /> */}

          <Stack
            sx={{
              border: isEducation ? "1px solid " : "",
              borderColor: styles.borderColor1,
            }}
          >
            <Box
              // sx={{ backgroundColor: isEducation ? "#F0F0F0" : "" }}
              onClick={onClickEducation}
            >
              {isEducation ? <EducationOpen /> : <EducationClose />}
            </Box>
            {isEducation && <Education />}
          </Stack>

          {/* <Box
            onClick={onClickEducation}
            className="left-containers"
            sx={{ paddingLeft: "8px" }}
          >
            <Education />
          </Box> */}
          {/* <Divider /> */}

          <Stack
            sx={{
              border: isSkills ? "1px solid " : "",
              borderColor: styles.borderColor1,
            }}
          >
            <Box
              // sx={{ backgroundColor: isSkills ? "#F0F0F0" : "" }}
              onClick={onClickSkills}
            >
              {isSkills ? <SkillsOpen /> : <SkillsClose />}
            </Box>
            {isSkills && <Skills />}
          </Stack>

          {/* <Box
            onClick={onClickSkills}
            className="left-containers"
            sx={{ paddingLeft: "8px" }}
          >
            <Skills />
          </Box> */}
          {/* <Divider /> */}

          <Stack
            sx={{
              border: isLanguage ? "1px solid " : "",
              borderColor: styles.borderColor1,
            }}
          >
            <Box
              // sx={{ backgroundColor: isCompany ? "#F0F0F0" : "" }}
              onClick={onClickLanguage}
            >
              {isLanguage ? <LanguageOpen /> : <LanguageClose />}
            </Box>
            {isLanguage && <Language />}
          </Stack>

          {/* <Box
            onClick={onClickLanguage}
            className="left-containers"
            sx={{ paddingLeft: "8px" }}
          >
            <Language />
          </Box> */}
          {/* <Divider /> */}

          <Stack
            sx={{
              border: isCertification ? "1px solid " : "",
              borderColor: styles.borderColor1,
            }}
          >
            <Box
              // sx={{ backgroundColor: isCompany ? "#F0F0F0" : "" }}
              onClick={onClickCertification}
            >
              {isCertification ? <CertificationOpen /> : <CertificationClose />}
            </Box>
            {isCertification && <Certification />}
          </Stack>

          {/* <Box
            onClick={onClickCertification}
            className="left-containers"
            sx={{ paddingLeft: "8px" }}
          >
            <Certification />
          </Box> */}
          {/* <Divider /> */}

          {/* <Stack
            sx={{
              border: isFunding ? "1px solid " : "",
              borderColor: styles.borderColor1,
            }}
          >
            <Box
              // sx={{ backgroundColor: isCompany ? "#F0F0F0" : "" }}
              onClick={onClickFunding}
            >
              {isFunding ? <FundingOpen /> : <FundingClose />}
            </Box>
            {isFunding && <Funding />}
          </Stack> */}

          {/* <Box
            onClick={onClickFunding}
            className="left-containers"
            sx={{ paddingLeft: "8px" }}
          >
            <Funding />
          </Box> */}
          {/* <Divider /> */}

          {/* <Stack
            sx={{
              border: isJobPostings ? "1px solid " : "",
              borderColor: styles.borderColor1,
            }}
          >
            <Box
              // sx={{ backgroundColor: isCompany ? "#F0F0F0" : "" }}
              onClick={onClickJobPosting}
            >
              {isJobPostings ? <JobPostingsOpen /> : <JobPostingsClose />}
            </Box>
            {isJobPostings && <JobPostings />}
          </Stack> */}

          {/* <Box
            onClick={onClickJobPPosting}
            className="left-containers"
            sx={{ paddingLeft: "8px" }}
          >
            <JobPostings />
          </Box> */}
          {/* <Divider /> */}
        </Stack>
        <Stack sx={{ height: "50px" }}></Stack>
      </Stack>

      <Stack
        sx={{
          width: "310px",
          padding: "10px",
          position: "absolute",
          bottom: "0px",
          left: "0px",
          borderRadius: "inherit",
          // backgroundColor: "#FBFBFD",
          boxShadow: "0 -5px 12px rgba(0,0,0,.12)",
        }}
      >
        <Button
          disableRipple
          onClick={() => {
            setSearchData((prevSearchData: any) => {
              return {
                ...prevSearchData,
                zipcode: zipCodeValue ? zipCodeValue : "",
                distance: mileValue,
                hqzipcode: hqZipCodeValue ? hqZipCodeValue : "",
                hqdistance: hqMileValue,
              };
            });
            applyFiltersMain();
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            gap: "4px",
            backgroundColor: "#146ef6",
            pointerEvents: searchData.companyId === "" ? "none" : "auto",
            opacity: searchData.companyId === "" ? "0.5" : "1",
            "&:hover": {
              backgroundColor: "#146ef6",
            },
          }}
          variant="contained"
        >
          <Typography
            sx={{
              fontFamily:
                'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
              fontStyle: "normal",
              fontWeight: "600",
              fontSize: "14px",
              lineHeight: "17px",
              color: "#FBFBFD",
              letterSpacing: "0.005em",
              textTransform: "capitalize",
            }}
          >
            Apply Filters
          </Typography>
          {/* <LaunchIcon sx={{ fontSize: "24px" }} /> */}
        </Button>
      </Stack>

      {/* <Stack
        sx={{
          width: "290px",
          padding: "10px",
          position: "fixed",
          bottom: "0",
          left: "0",
          borderRadius: "inherit",
          boxShadow: "0 -5px 12px rgba(0,0,0,.12)",
        }}
      >
        <Button
          disableRipple
          onClick={onClickMoreFilters}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            gap: "4px",
            backgroundColor: "#146ef6",
            pointerEvents: searchData.companyId === '' ? 'none' : 'auto',
            opacity: searchData.companyId === '' ? '0.5' : '1',
            "&:hover": {
              backgroundColor: "#146ef6",
            },
          }}
          variant="contained"
        >
          <Typography
            sx={{
              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
              fontStyle: "normal",
              fontWeight: "600",
              fontSize: "14px",
              lineHeight: "17px",
              color: "#FBFBFD",
              letterSpacing: "0.005em",
              textTransform: "capitalize",
            }}
          >
            More Filters
          </Typography>
          <LaunchIcon sx={{ fontSize: "24px" }} />
        </Button>
        <Modal
          open={isMoreFilters}
          onClose={handleCloseMoreFilters}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Stack
            direction="column"
            sx={{
              width: "940px",
              height: "450px",
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
            }}
          >
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                maxHeight: "10%",
                padding: "20px 20px 10px 20px",
                borderBottom: "1px solid #cccccc"
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                  fontStyle: "normal",
                  fontWeight: "600",
                  fontSize: "16px",
                  color: styles.defaultTextColor,
                }}
              >
                Filters
              </Typography>
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                
                <Button
                  disableRipple
                  onClick={applyFiters}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    // width: "100%",
                    gap: "4px",
                    backgroundColor: "#146ef6",
                    "&:hover": {
                      backgroundColor: "#146ef6",
                    },
                  }}
                  variant="contained"
                >
                  <Typography
                    sx={{
                      fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                      fontStyle: "normal",
                      fontWeight: "600",
                      fontSize: "14px",
                      lineHeight: "17px",
                      color: "#FBFBFD",
                      letterSpacing: "0.005em",
                      textTransform: "capitalize",
                    }}
                  >
                    Apply Filters
                  </Typography>
                </Button>
                <CloseIcon
                  onClick={handleCloseMoreFilters}
                  sx={{
                    color: "#737373",
                    fontSize: "24px",
                    cursor: "pointer",
                  }}
                />
              </Stack>
            </Stack>

            <Stack
              sx={{
                overflowY: "scroll",
                display: "flex",
                flexDirection: "row",
                gap: "30px",
                flexWrap: "wrap",
                paddingBottom: "10px",
                padding: "10px 20px 20px 20px",
              }}
            >
             
              <Stack
                sx={{
                  border: isNameModal ? "1px solid " : "",
                  borderColor: styles.borderColor1,
                  borderRadius: "3px",
                  boxShadow: "2px 2px 1px 0px rgba(0,0,0,0.1), 2px 1px 1px 0px rgba(0,0,0,0.24), 0px 1px 3px 0px rgba(0,0,0,0.52)",
                  width: "30%",
                  maxHeight: isNameModal
                    ? "none"
                    : searchData.full_name === "" && searchModalData.full_name === ""
                      ? "45px"
                      : "none",
                }}
              >
                <Box
                  onClick={onClickNameModal}
                >
                  {isNameModal ? <NameModalOpen /> : <NameModalClose />}
                </Box>
                {isNameModal && <NameModal />}
              </Stack>

              <Stack
                sx={{
                  border: isJobTitleModal ? "1px solid " : "",
                  borderColor: styles.borderColor1,
                  borderRadius: "3px",
                  boxShadow: "2px 2px 1px 0px rgba(0,0,0,0.1), 2px 1px 1px 0px rgba(0,0,0,0.24), 0px 1px 3px 0px rgba(0,0,0,0.52)",
                  width: "30%",
                  maxHeight: isJobTitleModal
                    ? "none"
                    : searchData.person_titles.length === 0 &&
                      searchData.person_not_titles.length === 0 &&
                      searchData.person_past_titles.length === 0 &&
                      searchData.title_management_level.length === 0 &&
                      searchData.title_department_sub_role.length === 0 &&
                      searchData.title_is_boolean === "" &&
                      searchModalData.person_titles.length === 0 &&
                      searchModalData.person_not_titles.length === 0 &&
                      searchModalData.person_past_titles.length === 0 &&
                      searchModalData.title_management_level.length === 0 &&
                      searchModalData.title_department_sub_role.length === 0 &&
                      searchModalData.title_is_boolean === ""
                      ? "45px"
                      : "none",
                }}
              >
                <Box
                  onClick={onClickJobTitleModal}
                >
                  {isJobTitleModal ? (
                    <JobTitleModalOpen />
                  ) : (
                    <JobTitleModalClose
                    // dataJT={dataJT}
                    />
                  )}
                </Box>
                {isJobTitleModal && (
                  <JobTitleModal
                  // parentFrom={parentFrom}
                  // onDataUpdate={handleDataJTChange}
                  />
                )}
              </Stack>

              <Stack
                sx={{
                  border: isLocationModal ? "1px solid " : "",
                  borderColor: styles.borderColor1,
                  borderRadius: "3px",
                  boxShadow: "2px 2px 1px 0px rgba(0,0,0,0.1), 2px 1px 1px 0px rgba(0,0,0,0.24), 0px 1px 3px 0px rgba(0,0,0,0.52)",
                  width: "30%",
                  height: isLocationModal
                    ? "none"
                    : searchData.locations.length === 0 &&
                      searchData.locations_not_in.length === 0 &&
                      searchData.hq_locations.length === 0 &&
                      searchData.hq_locations_not_in.length === 0 &&
                      searchModalData.locations.length === 0 &&
                      searchModalData.locations_not_in.length === 0 &&
                      searchModalData.hq_locations.length === 0 &&
                      searchModalData.hq_locations_not_in.length === 0
                      ? "45px"
                      : "none",
                }}
              >
                <Box
                  // sx={{ backgroundColor: isCompany ? "#F0F0F0" : "" }}
                  onClick={onClickLocationModal}
                >
                  {isLocationModal ? <LocationModalOpen /> : <LocationModalClose />}
                </Box>
                {isLocationModal && <LocationModal />}
              </Stack>
              
              <Stack
                sx={{
                  border: isCompanyModal ? "1px solid " : "",
                  borderColor: styles.borderColor1,
                  borderRadius: "3px",
                  boxShadow: "2px 2px 1px 0px rgba(0,0,0,0.1), 2px 1px 1px 0px rgba(0,0,0,0.24), 0px 1px 3px 0px rgba(0,0,0,0.52)",
                  width: "30%",
                  maxHeight: isCompanyModal
                    ? "none"
                    : searchData.company_names.length === 0 &&
                      searchData.company_not_in_names.length === 0 &&
                      searchData.company_past_names.length === 0 &&
                      searchModalData.company_names.length === 0 &&
                      searchModalData.company_not_in_names.length === 0 &&
                      searchModalData.company_past_names.length === 0
                      ? "45px"
                      : "none",
                }}
              >
                <Box
                  // sx={{ backgroundColor: isName ? "#F0F0F0" : "" }}
                  onClick={onClickCompanyModal}
                >
                  {isCompanyModal ? <CompanyModalOpen /> : <CompanyModalClose />}
                </Box>
                {isCompanyModal && <CompanyModal />}
              </Stack>
              
              <Stack
                sx={{
                  border: isEmployeesModal ? "1px solid " : "",
                  borderColor: styles.borderColor1,
                  borderRadius: "3px",
                  boxShadow: "2px 2px 1px 0px rgba(0,0,0,0.1), 2px 1px 1px 0px rgba(0,0,0,0.24), 0px 1px 3px 0px rgba(0,0,0,0.52)",
                  width: "30%",
                  maxHeight: isEmployeesModal
                    ? "none"
                    : searchData.no_of_employees.length === 0 && searchModalData.no_of_employees.length === 0
                      ? "45px"
                      : "none",
                }}
              >
                <Box
                  // sx={{ backgroundColor: isJobTitle ? "#F0F0F0" : "" }}
                  onClick={onClickEmployeesModal}
                >
                  {isEmployeesModal ? (
                    <EmployeesModalOpen />
                  ) : (
                    <EmployeesModalClose
                    // dataJT={dataJT}
                    />
                  )}
                </Box>
                {isEmployeesModal && (
                  <EmployeesModal
                  // parentFrom={parentFrom}
                  // onDataUpdate={handleDataJTChange}
                  />
                )}
              </Stack>
              
              <Stack
                sx={{
                  border: isIndustryModal ? "1px solid " : "",
                  borderColor: styles.borderColor1,
                  borderRadius: "3px",
                  boxShadow: "2px 2px 1px 0px rgba(0,0,0,0.1), 2px 1px 1px 0px rgba(0,0,0,0.24), 0px 1px 3px 0px rgba(0,0,0,0.52)",
                  width: "30%",
                  maxHeight: isIndustryModal
                    ? "none"
                    : searchData.industries.length === 0 && searchModalData.industries.length === 0
                      ? "45px"
                      : "none",
                }}
              >
                <Box
                  // sx={{ backgroundColor: isCompany ? "#F0F0F0" : "" }}
                  onClick={onClickIndustryModal}
                >
                  {isIndustryModal ? <IndustryModalOpen /> : <IndustryModalClose />}
                </Box>
                {isIndustryModal && <IndustryModal />}
              </Stack>
              

              <Stack
                sx={{
                  border: isTotalYearOfExperienceModal ? "1px solid " : "",
                  borderColor: styles.borderColor1,
                  borderRadius: "3px",
                  boxShadow: "2px 2px 1px 0px rgba(0,0,0,0.1), 2px 1px 1px 0px rgba(0,0,0,0.24), 0px 1px 3px 0px rgba(0,0,0,0.52)",
                  width: "30%",
                  maxHeight: isTotalYearOfExperienceModal
                    ? "none"
                    : searchData.minYear === "" && searchData.maxYear === "" &&
                      searchModalData.minYear === "" && searchModalData.maxYear === ""
                      ? "45px"
                      : "none",
                }}
              >
                <Box
                  // sx={{ backgroundColor: isName ? "#F0F0F0" : "" }}
                  onClick={onClickTotalYearOfExperienceModal}
                >
                  {isTotalYearOfExperienceModal ? (
                    <TotalYearsOfExperienceModalOpen />
                  ) : (
                    <TotalYearsOfExperienceModalClose />
                  )}
                </Box>
                {isTotalYearOfExperienceModal && <TotalYearsOfExperienceModal />}
              </Stack>
              
              <Stack
                sx={{
                  border: isPersonaModal ? "1px solid " : "",
                  borderColor: styles.borderColor1,
                  borderRadius: "3px",
                  boxShadow: "2px 2px 1px 0px rgba(0,0,0,0.1), 2px 1px 1px 0px rgba(0,0,0,0.24), 0px 1px 3px 0px rgba(0,0,0,0.52)",
                  width: "30%",
                  maxHeight: isPersonaModal ? "none" : "45px",
                }}
              >
                <Box
                  // sx={{ backgroundColor: isPersonaModal ? "#F0F0F0" : "" }}
                  onClick={onClickPersonaModal}
                >
                  {isPersonaModal ? <PersonaModalFilterOpen /> : <PersonaModalFilterClose />}
                </Box>
                {isPersonaModal && <PersonaModalFilter persona={persona} />}

                
              </Stack>
              
            </Stack>
          </Stack>
        </Modal>
      </Stack>  */}
    </Stack>
  );
};
export default Search;
