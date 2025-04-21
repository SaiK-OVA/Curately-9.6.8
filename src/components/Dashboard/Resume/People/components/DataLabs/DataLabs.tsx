import { React, useState } from "../../../../../../shared/modules/React";
import { createContext } from 'react';
import { Grid } from "../../../../../../shared/modules/MaterialImports/Grid";
// import { useLocation } from "react-router-dom";
import Header from "./../../components/Header/Header";
import LeftSection from "./../../components/LeftSection/LeftSection";
import RightSection from "./../../components/RightSection/RightSection";
import "./../../People.scss";
import { Stack } from "../../../../../../shared/modules/MaterialImports/Stack";
import { Typography } from "../../../../../../shared/modules/MaterialImports/Typography";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import styles from "./../../shared/config/variables.module.scss";
import { userLocalData } from "../../../../../../shared/services/userData";
import PersonaList from "../../../../Settings/Persona/PersonaList";
// import { Outlet, Link } from "react-router-dom";

interface AppProps {
  // className?: string;
  showOnlyPersona: boolean;
}

export const Store = createContext<any>(null);
export const ModalStore = React.createContext<any>(null);

const DataLabs: React.FC<AppProps> = ({
  showOnlyPersona,
  // className 
}
  // props
) => {
  const [ishide, setIsHide] = useState(false);
  // const { search } = useLocation();
  const userId = userLocalData.getvalue("recrId");

  const handleIsHideChange = (value: boolean) => {
    setIsHide(value);
  };

  const [isPeople, setIsPeople] = useState(true);
  const onClickPeople = () => {
    setIsPeople(true);
    setIsCompanies(false);
    setIsLists(false);
  };

  const [isCompanies, setIsCompanies] = useState(false);
  const onClickCompanies = () => {
    setIsPeople(false);
    setIsCompanies(true);
    setIsLists(false);
  };

  const [isLists, setIsLists] = useState(false);
  const onClickLists = () => {
    setIsPeople(false);
    setIsCompanies(false);
    setIsLists(true);
  };
  const [searchData, setSearchData] = React.useState({
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
    userId: userId ? userId : "61",
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
  });

  // console.log("searchData... 123", searchData);

  const [isFilterApplied, setIsFilterApplied] = React.useState(false);
  const [isCompanySelected, setIsCompanySelected] = React.useState(false);
  // setIsFilterApplied(true);

  // sepearate state for modal

  const [searchModalData, setSearchModalData] = React.useState({
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
    userId: userId ? userId : "61",
    exist_fields: [],
    not_exist_fields: [],
    zipcode: "",
    distance: null,
    hqzipcode: "",
    hqdistance: null,
    // isClickclearfiltersEmpOpen: false,
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
    isMinYearValidation: false,
    isMaxYearValidation: false,
    isFromYearValidation: false,
    isToYearValidation: false,
    isMinValidation: false,
    isMaxValidation: false,
  });

  // console.log("searchModalData... 123", searchModalData);

  //{'person_titles':[],'person_not_titles':[],'person_past_titles':[] }
  //{'person_titles':[],'person_not_titles':[],'person_past_titles':[] }
  //<any[] | never[]>([])
  // searchData.person_titles = [...searchData.person_titles, 'gg'];
  return (
    <div className="App">
      {
        showOnlyPersona ?
          null :
          <Grid container direction="row">
            <Header />
          </Grid>
      }
      <Stack
        spacing={4}
        direction="row"
        sx={{
          paddingLeft: "19px",
          borderBottom: "1px solid",
          borderBottomColor: styles.borderBottomColor,
        }}
      >
        <Stack
          onClick={onClickPeople}
          spacing={0.5}
          direction="row"
          sx={{
            cursor: "pointer",
            display: "none",
            fontFamily: "Segoe UI",
            fontWeight: "600",
            fontSize: "14px",
            paddingBottom: "12px",
            color: isPeople ? styles.primaryTextColor : styles.defaultTextColor,
            borderBottom: isPeople ? "1px solid" : "none",
            "&:hover": {
              color: styles.primaryTextColor,
              borderBottom: "1px solid",
            },
          }}
        >
          <PeopleOutlinedIcon fontSize="small" />
          <Typography
            sx={{
              fontFamily: "Segoe UI",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            People
          </Typography>
        </Stack>

        {/* important */}

        <Stack sx={{ display: "none" }}>
          <Stack
            onClick={onClickCompanies}
            spacing={0.5}
            direction="row"
            sx={{
              cursor: "pointer",
              fontFamily: "Segoe UI",
              fontWeight: "600",
              fontSize: "14px",
              paddingBottom: "12px",
              color: isCompanies
                ? styles.primaryTextColor
                : styles.defaultTextColor,
              borderBottom: isCompanies ? "1px solid" : "none",
              "&:hover": {
                color: styles.primaryTextColor,
                borderBottom: "1px solid",
              },
            }}
          >
            <ArticleOutlinedIcon fontSize="small" />
            <Typography
              sx={{
                fontFamily: "Segoe UI",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              Companies
            </Typography>
          </Stack>
          <Stack
            onClick={onClickLists}
            spacing={0.5}
            direction="row"
            sx={{
              cursor: "pointer",
              fontFamily: "Segoe UI",
              fontWeight: "600",
              fontSize: "14px",
              paddingBottom: "12px",
              color: isLists
                ? styles.primaryTextColor
                : styles.defaultTextColor,
              borderBottom: isLists ? "1px solid" : "none",
              "&:hover": {
                color: styles.primaryTextColor,
                borderBottom: "1px solid",
              },
            }}
          >
            <ArticleOutlinedIcon fontSize="small" />
            <Typography
              sx={{
                fontFamily: "Segoe UI",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              Lists
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Grid sx={{ flexWrap: "nowrap" }} container direction="row" justifyContent="space-between">
        <Store.Provider
          value={[
            searchData,
            setSearchData,
            isFilterApplied,
            setIsFilterApplied,
            isCompanySelected,
            setIsCompanySelected,
          ]}
        >
          <ModalStore.Provider value={[searchModalData, setSearchModalData]}>
            {
              showOnlyPersona ? <PersonaList showOnlyPersona={showOnlyPersona} />
                :
                <LeftSection ishide={ishide} />
            }
          </ModalStore.Provider>
          {
            showOnlyPersona ? <></>
              :
              <RightSection ishide={ishide} onIsHideChange={handleIsHideChange} />
          }
        </Store.Provider>
        {/* <LeftSection ishide={ishide} />
        <RightSection
          ishide={ishide}
          onIsHideChange={handleIsHideChange}
        /> */}
      </Grid>
    </div>
  );
};

export default DataLabs;
