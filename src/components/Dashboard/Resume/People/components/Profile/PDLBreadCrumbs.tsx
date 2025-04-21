import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {  useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

const PDLBreadCrumbs = () => {

  const [links, setLinks] = useState<any[]>([])

  const handleLinkClick = (text: any) => {

    if (text === "Search") {
        localStorage.setItem("isPdlSearch", JSON.stringify(true))
        // localStorage.setItem(
        //   "pdlSearchData",
        //   JSON.stringify({
        //     searchBox: "",
        //     person_titles: [],
        //     person_not_titles: [],
        //     person_past_titles: [],
        //     title_management_level: [],
        //     title_department_sub_role: [],
        //     title_department: [],
        //     company_names: [],
        //     company_not_in_names: [],
        //     company_past_names: [],
        //     exclude_company_names: [],
        //     industries: [],
        //     industries_not_in: [],
        //     industry_company_not_in_names: [],
        //     industry_company_names: [],
        //     industry_all_company_names: [],
        //     industry_adv_settings: "",
        //     locations: [],
        //     locations_not_in: [],
        //     hq_locations: [],
        //     hq_locations_not_in: [],
        //     sort_type: "asc",
        //     sort_by: "Relevance",
        //     full_name: "",
        //     minYear: "",
        //     maxYear: "",
        //     no_of_employees: [],
        //     title_is_boolean: "",
        //     min: "",
        //     max: "",
        //     personaIds: [],
        //     checkedPersonas: [],
        //     companyId: "12938",
        //     // isClickclearfiltersEmpOpen: false,
        //     displayData: [],
        //     exist_fields: [],
        //     not_exist_fields: [],
        //     applyFilterToaster: false,
        //     zipcode: "",
        //     distance: null,
        //     hqzipcode: "",
        //     hqdistance: null,
        //     skillsValue: "",
        //     skillsIn: [],
        //     languagesIn: [],
        //     certificationsIn: [],
        //     booleanSearch: "",
        //     eduDegreeList: [],
        //     eduSchoolList: [],
        //     eduMajorList: [],
        //     autoSkillsList: [],
        //     autoLanguagesList: [],
        //     autoCertificationsList: [],
        //     education: {
        //       schoolIn: [],
        //       majorIn: [],
        //       degreeIn: [],
        //       educationStartYear: "",
        //       educationEndYear: "",
        //     },
        //     degree_titles: [],
        //     isMinYearValidation: false,
        //     isMaxYearValidation: false,
        //     isMinValidation: false,
        //     isMaxValidation: false,
        //   })
        // );
        
    }
  };

 

  

  useEffect(() => {

     const profNotAccLinks = [
       {
         text: "Search",
         link: `../../people`,
       },
       {
         text: "People",
         link: `../../people`,
       },
       {
         text: localStorage.getItem("pdlcandName")!,
         link: "",
       },
     ];

     const profAccLinks = [
       {
         text: "Search",
         link: `../../resume/people`,
       },
       {
         text: "People",
         link: `../../resume/people`,
       },
       {
         text: localStorage.getItem("pdlcandName")!,
         link: "",
       },
     ];

    const isProfAccessed = JSON.parse(localStorage.getItem("isProfileAccessed")!);

    console.log("isProfAccessed", isProfAccessed);

    if (isProfAccessed) {
        setLinks(profAccLinks)
    } else {
        setLinks(profNotAccLinks)
    }

  }, []);

  return (
    <>
      <div role="breadcrumbnav" id="breadCrumbNav">
        <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon />}>
          {links.map((item) => {
            return item.link ? (
              <Link
                to={item.link}
                key={item.text}
                onClick={() => handleLinkClick(item.text)}
              >
                {item.text}
              </Link>
            ) : (
              <Typography className="titleDisplay tt-capital" key={item.text}>
                {item.text}
              </Typography>
            );
          })}
        </Breadcrumbs>
      </div>
    </>
  );
};

export default PDLBreadCrumbs;
