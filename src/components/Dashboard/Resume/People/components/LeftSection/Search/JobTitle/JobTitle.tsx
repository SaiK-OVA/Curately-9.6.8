// import React, { ChangeEvent, useContext, useEffect, useRef } from "react";
import { useContext } from "react";
import {
  React,
  useEffect,
  useRef,
} from "../../../../../../../../shared/modules/React";
// import { useTheme } from "@mui/material/styles";
import "./JobTitle.scss";
import {
  Button,
  // Paper,
  // FormGroup,
} from "../../../../../../../../shared/modules/MaterialImports/Button";
import { Divider } from "../../../../../../../../shared/modules/MaterialImports/Divider";
import { Stack } from "../../../../../../../../shared/modules/MaterialImports/Stack";
import { Typography } from "../../../../../../../../shared/modules/MaterialImports/Typography";
import { Box } from "../../../../../../../../shared/modules/MaterialImports/Box";
import { CircularProgress } from "../../../../../../../../shared/modules/MaterialImports/CircularProgress";

// import ListAltIcon from "@mui/icons-material/ListAlt";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
// import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { useState } from "react";
// import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
// import TripOriginIcon from "@mui/icons-material/TripOrigin";
import Autocomplete from "@mui/material/Autocomplete";
import {
  TextField,
  FormControlLabel,
} from "../../../../../../../../shared/modules/MaterialImports/FormInputs";
// import TextField, { InputProps } from '@material-ui/core/TextField';
// import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
// import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Checkbox } from "../../../../../../../../shared/modules/MaterialImports/FormElements";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { styled } from "@mui/material/styles";
import styles from "./../../../../shared/config/variables.module.scss";
// import { makeStyles } from '@material-ui/core/styles';
import apiService from "../../../../shared/api/apiService";
import { debounce } from "@mui/material/utils";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import InputBase from "@mui/material/InputBase";
import { Store } from "../../../DataLabs/DataLabs";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} arrow />
))(() =>
// { theme }
({
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
})
);

const BootstrapInput = styled(InputBase)(() =>
// { theme }
({
  "& .MuiInputBase-input": {
    // borderRadius: "3px",
    position: "relative",
    backgroundColor: "#ffffff",
    // border: "1px solid",
    // borderColor: styles.greyColor,
    fontSize: "14px",
    // innerHeight: "30px",
    width: "242px",

    // padding: "6px 167px 7px 10px",
    fontFamily:
      'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    paddingLeft: "5px",
    // "&:focus": {
    //   borderColor: styles.borderColor1,
    // },
    // "&:hover": {
    //   borderColor: styles.borderColor1,
    // },
  },
})
);

const BpIcon = styled("span")(() =>
// { theme }
({
  borderRadius: 1,
  width: 16,
  height: 16,
  backgroundColor: "#ffffff",
})
);

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

const BpCheckboxContainer = styled("div")({
  ".bp-icon": {
    border: "1px #CACACC solid",
  },
  "& .bp-checkbox:hover .bp-icon": {
    borderColor: styles.primaryTextColor,
  },
});

// interface Props {
//   onDataUpdate: (newDataJT: string[]) => void;
// }

// const JobTitle: React.FC<Props> = ({ onDataUpdate }) => {

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

interface JobTitleProps {
  parentFrom: string;
  isPropChanged: boolean;
}

// const JobTitle: React.FC<JobTitleProps> = ({ parentFrom }) => {
const JobTitle: React.FC<JobTitleProps> = ({ isPropChanged }) => {
  const managementLevelJsonData = [
    { key: "founder", name: "Founder", index: "1" },
    { key: "director", name: "Director", index: "2" },
    { key: "entry", name: "Entry", index: "3" },
    { key: "manager", name: "Manager", index: "4" },
    { key: "owner", name: "Owner", index: "5" },
    { key: "partner", name: "Partner", index: "6" },
    { key: "senior", name: "Senior", index: "7" },
    { key: "c_suite", name: "C Suite", index: "8" },
    { key: "head", name: "Head", index: "9" },
    { key: "vp", name: "Vp", index: "10" },
    { key: "intern", name: "Intern", index: "11" },
  ];

  const [searchData, setSearchData] = useContext(Store);
  const [isAnyOf, setIsAnyOf] = useState(
    searchData.title_is_boolean ? false : true
  );

  const onClickIsAnyOf = () => {
    setIsAnyOf(true);
    setIsBooleanSearch(false);
    setIsKnown(false);
    setIsUnKnown(false);
    setSearchData((prevSearchData: any) => ({
      ...prevSearchData,
      exist_fields: [
        ...prevSearchData.exist_fields.filter(
          (field: any) => field !== "job_title"
        ),
      ],
      not_exist_fields: [
        ...prevSearchData.not_exist_fields.filter(
          (field: any) => field !== "job_title"
        ),
      ],
      title_is_boolean: "",
    }));
  };

  const [isBooleanSearch, setIsBooleanSearch] = useState(
    searchData.title_is_boolean ? true : false
  );
  const onClickBooleanSearch = () => {
    setIsBooleanSearch(true);
    setIsAnyOf(false);
    setIsKnown(false);
    setIsUnKnown(false);
    setIsNotAnyOf(false);
    setIsPastJobTitle(false);
    setSearchData((prevSearchData: any) => ({
      ...prevSearchData,
      exist_fields: [
        ...prevSearchData.exist_fields.filter(
          (field: any) => field !== "job_title"
        ),
      ],
      not_exist_fields: [
        ...prevSearchData.not_exist_fields.filter(
          (field: any) => field !== "job_title"
        ),
      ],
      person_titles: [],
      person_not_titles: [],
      person_past_titles: [],
    }));
  };

  const [isKnown, setIsKnown] = useState(false);
  const onClickIsKnown = () => {
    setIsKnown(true);
    setIsAnyOf(false);
    setIsBooleanSearch(false);
    setIsUnKnown(false);
    setIsNotAnyOf(false);
    setIsPastJobTitle(false);
    setSearchData((prevSearchData: any) => {
      // Add 'job_title' to exist_fields only if it doesn't already exist
      const updatedExistFields = prevSearchData.exist_fields.includes(
        "job_title"
      )
        ? prevSearchData.exist_fields
        : [...prevSearchData.exist_fields, "job_title"];

      // Filter out 'job_title' from not_exist_fields
      const filteredNotExistFields = prevSearchData.not_exist_fields.filter(
        (field: any) => field !== "job_title"
      );

      return {
        ...prevSearchData,
        exist_fields: updatedExistFields,
        not_exist_fields: filteredNotExistFields,
        title_is_boolean: "",
        person_titles: [],
        person_not_titles: [],
        person_past_titles: [],
      };
    });
  };

  const [isUnKnown, setIsUnKnown] = useState(false);
  const onClickIsUnKnown = () => {
    setIsUnKnown(true);
    setIsAnyOf(false);
    setIsBooleanSearch(false);
    setIsKnown(false);
    setIsNotAnyOf(false);
    setIsPastJobTitle(false);
    setSearchData((prevSearchData: any) => {
      // Filter out 'job_title' from exist_fields
      const filteredExistFields = prevSearchData.exist_fields.filter(
        (field: any) => field !== "job_title"
      );

      // Add 'job_title' to not_exist_fields only if it doesn't already exist
      const updatedNotExistFields = prevSearchData.not_exist_fields.includes(
        "job_title"
      )
        ? prevSearchData.not_exist_fields
        : [...prevSearchData.not_exist_fields, "job_title"];

      return {
        ...prevSearchData,
        exist_fields: filteredExistFields,
        not_exist_fields: updatedNotExistFields,
        title_is_boolean: "",
        person_titles: [],
        person_not_titles: [],
        person_past_titles: [],
      };
    });
  };

  const [isNotAnyOf, setIsNotAnyOf] = useState(
    searchData.person_not_titles.length ? true : false
  );
  const onClickisNotAnyOf = (e: any) => {
    setIsNotAnyOf(!isNotAnyOf);
    console.log(e, "fff");
    if (!e.target.checked) {
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        person_not_titles: [],
      }));
    }
  };

  const [isPastJobTitle, setIsPastJobTitle] = useState(
    searchData.person_past_titles.length ? true : false
  );
  const onClickPastJobTitle = (e: any) => {
    setIsPastJobTitle(!isPastJobTitle);
    if (!e.target.checked) {
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        person_past_titles: [],
      }));
    }
  };

  const [isManagementLevel, setIsManagementLevel] = useState(false);
  const onClickManagementLevel = () => {
    setIsManagementLevel(!isManagementLevel);
  };

  const [isDepartment, setIsDepartment] = useState(false);
  const onClickDepartment = () => {
    setIsDepartment(!isDepartment);
    setOpenParents([]);
  };

  const [top100Films, setRecordsData] = useState<any[] | never[]>([]);
  const [isAnyLoader, setIsAnyLoader] = useState(false);
  const [isNotAnyLoader, setIsNotAnyLoader] = useState(false);
  const [isPastLoader, setIsPastLoader] = useState(false);
  // const [searchTitle, setSearchTitle] = useState("");
  let searchQuery = useRef<any>(null);
  const sendRequest = (str: string) => {
    searchQuery.current = str ? `${str}` : searchQuery.current;
    // send value to the backend
    // console.log(str, "str", searchQuery.current);
    let dataToPass = {
      field: "title",
      text: str ? str : searchQuery.current,
    };

    apiService.getSuggessions(dataToPass).then((response: any) => {
      // setTeamLeads(response.data);
      // console.log(response);
      setIsAnyLoader(false);
      setIsNotAnyLoader(false);
      setIsPastLoader(false);

      if (response.status === 200) {
        // const top100Films = response.data.data;
        if (response.data.data && response.data.data.length) {
          setRecordsData(response.data.data);
        }
      }
    });
  };

  useEffect(() => {
    debouncedUseEffectCall();
  }, [isPropChanged]);

  const defaultAPICall = () => {
    let dataToPass = {
      field: "title",
      text: "",
    };

    apiService.getSuggessions(dataToPass).then((response: any) => {
      // setTeamLeads(response.data);
      // console.log(response);
      setIsAnyLoader(false);
      setIsNotAnyLoader(false);
      setIsPastLoader(false);

      if (response.status === 200) {
        // const top100Films = response.data.data;
        if (response.data.data && response.data.data.length) {
          setRecordsData(response.data.data);
        }
      }
    });
  }

  const debouncedUseEffectCall = debounce(defaultAPICall, 500);
  const debouncedSendRequest = debounce(sendRequest, 500);

  const getSearchData = (str: string) => {
    debouncedSendRequest(str);
  };

  // console.log(searchData.person_titles);
  const defData = searchData.person_titles.map((name: any) => {
    return { name: name, count: 999 };
  });
  const [defJobTitle, setDefJobTitle] = useState(defData);
  // console.log(defJobTitle, "defJobTitle", searchData);
  // console.log("person_titles_len", searchData.person_titles.length);

  // if (searchData.remove_all_filters_JTO === true) {
  //   setDefJobTitle([]);
  // }

  // console.log("defData", defData);
  // console.log("defJobTitle", defJobTitle);

  const defNotData = searchData.person_not_titles.map((name: any) => {
    return { name: name, count: 999 };
  });
  const [defNotTitle, setDefNotTitle] = useState(defNotData);

  const defPastData = searchData.person_past_titles.map((name: any) => {
    return { name: name, count: 999 };
  });
  const [defPastTitle, setDefPastTitle] = useState(defPastData);

  const [booleanValue, setbooleanValue] = React.useState(
    searchData.title_is_boolean
  );
  // setDefJobTitle
  // debugger
  // setDefJobTitle(searchData.person_titles.map((option: any) => option.name));
  // console.log(searchData.person_titles);

  // const newDataJT: string[] = searchData.person_titles;
  // onDataUpdate(newDataJT);

  // const handleOptionSelection = (selectedOptions: any[]) => {

  //   console.log("Selected options:", selectedOptions);

  // };

  // const handleAutocompleteChange = (event: any, value: any) => {
  //   if (value.length > 0) {
  //     // debugger
  //     const selectedOptions = value.map((option: any) =>
  //       option && option.name ? option.name : option
  //     );

  //     const updatedPersonTitles = searchData.person_titles
  //       .filter((title: string) => !selectedOptions.includes(title))
  //       .concat(selectedOptions);

  //     // console.log(value.length)
  //     // console.log(selectedOptions.length)
  //     // console.log(updatedPersonTitles.length)

  //     if (event.key === "Enter" && value.length > 0) {
  //       setSearchData((prevSearchData: any) => ({
  //         ...prevSearchData,
  //         person_titles: updatedPersonTitles,
  //       }));
  //     }

  //     if (selectedOptions.length === updatedPersonTitles.length) {
  //       setSearchData((prevSearchData: any) => ({
  //         ...prevSearchData,
  //         person_titles: updatedPersonTitles,
  //       }));
  //     } else {
  //       updatedPersonTitles.shift();
  //       setSearchData((prevSearchData: any) => ({
  //         ...prevSearchData,
  //         person_titles: updatedPersonTitles,
  //       }));
  //     }
  //   } else {
  //     setSearchData((prevSearchData: any) => ({
  //       ...prevSearchData,
  //       person_titles: [],
  //     }));
  //   }
  // };

  const handleAutocompleteChange = (event: any, value: any) => {
    if (value.length > 0) {
      // const selectedOptions = value
      //   .filter((option: any) => option && option.name)
      //   .map((option: any) => option.name)
      //   .filter(
      //     (name: string, index: number, array: string[]) =>
      //       array.indexOf(name) === index
      //   );

      // const selectedOptions = value.map((option: any) =>
      //   option && option.name ? option.name : option
      // );

      const selectedOptions: any[] = [];

      value.forEach((option: any) => {
        const optionName = option && option.name ? option.name : option;
        if (!selectedOptions.includes(optionName)) {
          selectedOptions.push(optionName);
        }
      });

      const updatedPersonTitles = searchData.person_titles
        .filter((title: string) => !selectedOptions.includes(title))
        .concat(selectedOptions);

      if (event.key === "Enter" && value.length > 0) {
        setSearchData((prevSearchData: any) => ({
          ...prevSearchData,
          person_titles: updatedPersonTitles,
        }));
      }

      if (selectedOptions.length === updatedPersonTitles.length) {
        setSearchData((prevSearchData: any) => ({
          ...prevSearchData,
          person_titles: updatedPersonTitles,
        }));
      } else {
        updatedPersonTitles.shift();
        setSearchData((prevSearchData: any) => ({
          ...prevSearchData,
          person_titles: updatedPersonTitles,
        }));
      }
    } else {
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        person_titles: [],
      }));
    }
  };

  // const excludeJobTitles = (event: any, value: any) => {
  //   if (value.length > 0) {
  //     const selectedOptions = value.map((option: any) =>
  //       option && option.name ? option.name : option
  //     );

  //     const updatedPersonTitles = searchData.person_not_titles
  //       .filter((title: string) => !selectedOptions.includes(title))
  //       .concat(selectedOptions);

  //     // console.log(value.length)
  //     // console.log(selectedOptions.length)
  //     // console.log(updatedPersonTitles.length)

  //     if (event.key === "Enter" && value.length > 0) {
  //       setSearchData((prevSearchData: any) => ({
  //         ...prevSearchData,
  //         person_not_titles: updatedPersonTitles,
  //       }));
  //     }

  //     if (selectedOptions.length === updatedPersonTitles.length) {
  //       setSearchData((prevSearchData: any) => ({
  //         ...prevSearchData,
  //         person_not_titles: updatedPersonTitles,
  //       }));
  //     } else {
  //       updatedPersonTitles.shift();
  //       setSearchData((prevSearchData: any) => ({
  //         ...prevSearchData,
  //         person_not_titles: updatedPersonTitles,
  //       }));
  //     }
  //   } else {
  //     setSearchData((prevSearchData: any) => ({
  //       ...prevSearchData,
  //       person_not_titles: [],
  //     }));
  //   }
  // };

  const excludeJobTitles = (event: any, value: any) => {
    if (value.length > 0) {
      // const selectedOptions = value
      //   .filter((option: any) => option && option.name)
      //   .map((option: any) => option.name)
      //   .filter(
      //     (name: string, index: number, array: string[]) =>
      //       array.indexOf(name) === index
      //   );

      // const selectedOptions = value.map((option: any) =>
      //   option && option.name ? option.name : option
      // );

      const selectedOptions: any[] = [];

      value.forEach((option: any) => {
        const optionName = option && option.name ? option.name : option;
        if (!selectedOptions.includes(optionName)) {
          selectedOptions.push(optionName);
        }
      });

      const updatedPersonTitles = searchData.person_not_titles
        .filter((title: string) => !selectedOptions.includes(title))
        .concat(selectedOptions);

      if (event.key === "Enter" && value.length > 0) {
        setSearchData((prevSearchData: any) => ({
          ...prevSearchData,
          person_not_titles: updatedPersonTitles,
        }));
      }

      if (selectedOptions.length === updatedPersonTitles.length) {
        setSearchData((prevSearchData: any) => ({
          ...prevSearchData,
          person_not_titles: updatedPersonTitles,
        }));
      } else {
        updatedPersonTitles.shift();
        setSearchData((prevSearchData: any) => ({
          ...prevSearchData,
          person_not_titles: updatedPersonTitles,
        }));
      }
    } else {
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        person_not_titles: [],
      }));
    }
  };

  const [booleanLoad, setBooleanLoad] = useState(false);

  const submitBoolean = () => {
    // if (event.key === "Enter") {
    setBooleanLoad(booleanValue !== "" ? true : false);
    setTimeout(() => {
      setSearchData((prevSearchData: any) => {
        const updatedData = {
          ...prevSearchData,
          title_is_boolean: booleanValue,
        };
        setBooleanLoad(false);
        return updatedData;
      });
    }, 1000);
    // }
  };

  // const includeJobTitles = (event: any, value: any) => {
  //   if (value.length > 0) {
  //     const selectedOptions = value.map((option: any) =>
  //       option && option.name ? option.name : option
  //     );

  //     const updatedPersonTitles = searchData.person_past_titles
  //       .filter((title: string) => !selectedOptions.includes(title))
  //       .concat(selectedOptions);

  //     // console.log(value.length)
  //     // console.log(selectedOptions.length)
  //     // console.log(updatedPersonTitles.length)

  //     if (event.key === "Enter" && value.length > 0) {
  //       setSearchData((prevSearchData: any) => ({
  //         ...prevSearchData,
  //         person_past_titles: updatedPersonTitles,
  //       }));
  //     }

  //     if (selectedOptions.length === updatedPersonTitles.length) {
  //       setSearchData((prevSearchData: any) => ({
  //         ...prevSearchData,
  //         person_past_titles: updatedPersonTitles,
  //       }));
  //     } else {
  //       updatedPersonTitles.shift();
  //       setSearchData((prevSearchData: any) => ({
  //         ...prevSearchData,
  //         person_past_titles: updatedPersonTitles,
  //       }));
  //     }
  //   } else {
  //     setSearchData((prevSearchData: any) => ({
  //       ...prevSearchData,
  //       person_past_titles: [],
  //     }));
  //   }
  // };

  // const [title, setSelectTitle] = useContext('');
  //   setSearchData({
  //     person_titles:  ['kkk']
  // })
  // searchData.person_titles = [...searchData.person_titles, 'some'];

  const includeJobTitles = (event: any, value: any) => {
    if (value.length > 0) {
      // const selectedOptions = value
      //   .filter((option: any) => option && option.name)
      //   .map((option: any) => option.name)
      //   .filter(
      //     (name: string, index: number, array: string[]) =>
      //       array.indexOf(name) === index
      //   );

      // const selectedOptions = value.map((option: any) =>
      //   option && option.name ? option.name : option
      // );

      const selectedOptions: any[] = [];

      value.forEach((option: any) => {
        const optionName = option && option.name ? option.name : option;
        if (!selectedOptions.includes(optionName)) {
          selectedOptions.push(optionName);
        }
      });

      const updatedPersonTitles = searchData.person_past_titles
        .filter((title: string) => !selectedOptions.includes(title))
        .concat(selectedOptions);

      if (event.key === "Enter" && value.length > 0) {
        setSearchData((prevSearchData: any) => ({
          ...prevSearchData,
          person_past_titles: updatedPersonTitles,
        }));
      }

      if (selectedOptions.length === updatedPersonTitles.length) {
        setSearchData((prevSearchData: any) => ({
          ...prevSearchData,
          person_past_titles: updatedPersonTitles,
        }));
      } else {
        updatedPersonTitles.shift();
        setSearchData((prevSearchData: any) => ({
          ...prevSearchData,
          person_past_titles: updatedPersonTitles,
        }));
      }
    } else {
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        person_past_titles: [],
      }));
    }
  };

  // const setSelectTitle = () => {
  //   alert(123);
  // searchData.person_titles.push(str);
  // };

  // setSearchData(10);

  // React.useEffect(() => {
  //   // if (!open) {
  //   // getAutoCompleteData();
  //   // }
  // }, []);
  // const [inputValue, setInputValue] = React.useState('');

  // const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(event.target.value);
  // };

  // const classes = useStyles();

  // const inputProps: InputProps = {
  //   classes: {
  //     input: classes.placeholder,
  //     placeholder: classes.placeholder,
  //   },
  // };

  const onChangeName = (e: any) => {
    setbooleanValue(e.target.value);
  };

  const onClickManagementLevelRow = (index: any) => {
    // console.log("index", index);
    const clikedManagementRow = managementLevelJsonData.filter(
      (item: any) => item.index === index
    );
    if (
      searchData.title_management_level.includes(clikedManagementRow[0].key)
    ) {
      // const index_clicked_row = searchData.title_management_level.indexOf(
      //   clikedManagementRow[0].key
      // );
      // const removedItem = searchData.title_management_level.splice(
      //   index_clicked_row,
      //   1
      // );
      const updatedManagementLevel = searchData.title_management_level;
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        title_management_level: updatedManagementLevel,
      }));
    } else {
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        title_management_level: [
          ...prevSearchData.title_management_level,
          clikedManagementRow[0].key,
        ],
      }));
    }
  };

  const removeElementManagementLevel = (index: any) => {
    if (index !== -1) {
      const updatedManagementLevel = searchData.title_management_level;
      updatedManagementLevel.splice(index, 1);
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        title_management_level: updatedManagementLevel,
      }));
    }
  };

  const [checkData, setCheckData] = useState(checkboxData);
  const [openParents, setOpenParents] = useState<boolean[]>([]);
  const [filterValue, setFilterValue] = useState("");

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("searchData.title_department", searchData.title_department);
    // console.log(
    //   "searchData.title_department_sub_role",
    //   searchData.title_department_sub_role
    // );

    const value = event.target.value;
    // console.log("value", value);
    setFilterValue(value);

    if (value !== "" && value !== " ") {
      // Filter the data based on the search value
      const filteredParents = checkboxData.map((parent: any) => {
        // Filter children based on child label
        const filteredChildren = parent.children.filter((child: any) =>
          child.label.toLowerCase().includes(value.toLowerCase())
        );

        return {
          ...parent,
          children: filteredChildren,
        };
      });

      setCheckData(filteredParents);

      // Open the parent items that have matching children
      const matchedParentIds = filteredParents
        .filter((parent: any) => parent.children.length > 0)
        .map((parent: any) => parent.id);
      setOpenParents((prevOpenParents) => {
        return [...prevOpenParents, ...matchedParentIds];
      });
    } else {
      // If search value is empty, reset the filtered data and close all parent items
      setCheckData(checkboxData);
      setOpenParents([]);
    }
  };

  const filteredData = checkData.filter((parent) => {
    const parentMatches = parent.parent
      .toLowerCase()
      .includes(filterValue.toLowerCase());
    const childMatches = parent.children.some((child) =>
      child.label.toLowerCase().includes(filterValue.toLowerCase())
    );

    // console.log("c", parentMatches);

    return parentMatches || childMatches;
  });

  // console.log('fil', filteredData)

  const toggleChildVisibility = (parentId: any) => {
    if (filterValue) {
      // If there is a filter value, do not open or close the parent items
      return;
    }
    setOpenParents((prevIds: any) => {
      if (prevIds.includes(parentId)) {
        return prevIds.filter((id: any) => id !== parentId);
      } else {
        return [...prevIds, parentId];
      }
    });
  };

  // Nagarjuna function

  // const handleParentCheckboxChange = (event: any, parentId: any) => {
  //   const checked_parent = checkData.filter(
  //     (item: any) => item.id === parentId
  //   );
  //   // console.log("checked_parent", checked_parent);
  //   if (searchData.title_department.includes(checked_parent[0].key)) {
  //     const index_checked_parent = searchData.title_department.indexOf(
  //       checked_parent[0].key
  //     );
  //     const removed_uncheck_parent = searchData.title_department.splice(
  //       index_checked_parent,
  //       1
  //     );
  //     console.log("removed_uncheck_parent", removed_uncheck_parent);
  //     const updatedParentArray = searchData.title_department;

  //     const checked_parent_children = checked_parent[0].children;
  //     const checked_parent_children_key_array = checked_parent_children.map(
  //       (item: any) => item.key
  //     );

  //     console.log(
  //       "checked_parent_children_key_array",
  //       checked_parent_children_key_array
  //     );

  //     const unchecked_children_array =
  //       searchData.title_department_sub_role.filter(
  //         (item: any) => !checked_parent_children_key_array.includes(item)
  //       );
  //     // console.log("unchecked_children_array", unchecked_children_array);

  //     setSearchData((prevSearchData: any) => ({
  //       ...prevSearchData,
  //       title_department: updatedParentArray,
  //       title_department_sub_role: unchecked_children_array,
  //     }));
  //   } else {
  //     const checked_parent_children = checked_parent[0].children;

  //     const checked_parent_children_key_array = checked_parent_children.filter(
  //       (item: any) => !searchData.title_department_sub_role.includes(item.key)
  //     );

  //     const unique_checked_parent_children_key_array =
  //       checked_parent_children_key_array.map((item: any) => item.key);

  //     // console.log("checked_parent_children", checked_parent_children);

  //     // console.log(
  //     //   "checked_parent_children_key_array",
  //     //   checked_parent_children_key_array
  //     // );

  //     // console.log(
  //     //   "unique_checked_parent_children_key_array",
  //     //   unique_checked_parent_children_key_array
  //     // );

  //     setSearchData((prevSearchData: any) => ({
  //       ...prevSearchData,
  //       title_department: [
  //         ...prevSearchData.title_department,
  //         checked_parent[0].key,
  //       ],
  //       title_department_sub_role: [
  //         ...prevSearchData.title_department_sub_role,
  //         ...unique_checked_parent_children_key_array,
  //       ],
  //     }));
  //   }
  // };

  // Nagarjuna function

  // const handleChildCheckboxChange = (
  //   event: any,
  //   parentId: any,
  //   childId: any
  // ) => {
  //   // console.log("childId_in_child", childId);
  //   const checked_respective_parent = checkData.filter(
  //     (item: any) => item.id === parentId
  //   );
  //   const checked_respective_parent_children =
  //     checked_respective_parent[0].children;
  //   // console.log("children", checked_respective_parent_children);

  //   const children_length = checked_respective_parent_children.length;
  //   console.log("children_length", children_length);
  //   const clicked_child = checked_respective_parent_children.filter(
  //     (item: any) => item.id === childId
  //   );
  //   // console.log("clicked_child", clicked_child);
  //   // let count_sub_roles = 0;

  //   if (searchData.title_department_sub_role.includes(clicked_child[0].key)) {
  //     // count_sub_roles = count_sub_roles - 1;
  //     // console.log("count_sub_roles", count_sub_roles);
  //     const index_checked_child = searchData.title_department_sub_role.indexOf(
  //       clicked_child[0].key
  //     );
  //     const removed_clicked_child = searchData.title_department_sub_role.splice(
  //       index_checked_child,
  //       1
  //     );
  //     // console.log("removed_clicked_child", removed_clicked_child);
  //     let updatedRespectiveParentArray: any[] = searchData.title_department;

  //     if (
  //       searchData.title_department.includes(checked_respective_parent[0].key)
  //     ) {
  //       const index_clicked_parent = searchData.title_department.indexOf(
  //         checked_respective_parent[0].key
  //       );
  //       // console.log("checked_respective_parent", checked_respective_parent);
  //       const removed_parent = searchData.title_department.splice(
  //         index_clicked_parent,
  //         1
  //       );
  //       updatedRespectiveParentArray = searchData.title_department;
  //     }

  //     const updatedRespectiveChildArray = searchData.title_department_sub_role;

  //     // console.log("updatedRespectiveParentArray", updatedRespectiveParentArray);

  //     setSearchData((prevSearchData: any) => ({
  //       ...prevSearchData,
  //       title_department: updatedRespectiveParentArray,
  //       title_department_sub_role: updatedRespectiveChildArray,
  //     }));
  //   } else {
  //     // const index_checked_child = searchData.title_department_sub_role.indexOf(
  //     //   clicked_child[0].key
  //     // );
  //     // const removed_clicked_child =
  //     //   searchData.title_department_sub_role.splice(index_checked_child, 1);
  //     // console.log("children", checked_respective_parent_children);
  //     // console.log("clicked_child", clicked_child);
  //     let updatedRespParentArray = searchData.title_department;
  //     console.log("children_length", children_length);

  //     // const checked_respective_parent_children_key_array =
  //     //   checked_respective_parent_children.map((item: any) => item.key);

  //     // console.log(
  //     //   "checked_respective_parent_children_key_array",
  //     //   checked_respective_parent_children_key_array
  //     // );

  //     // count_sub_roles = count_sub_roles + 1;
  //     // console.log(
  //     //   "checked_respective_parent[0].key",
  //     //   checked_respective_parent[0].key
  //     // );
  //     // if (count_sub_roles === children_length) {
  //     //   updatedRespParentArray = [
  //     //     ...searchData.title_department,
  //     //     checked_respective_parent[0].key,
  //     //   ];
  //     // }

  //     setSearchData((prevSearchData: any) => ({
  //       ...prevSearchData,
  //       title_department: updatedRespParentArray,
  //       title_department_sub_role: [
  //         ...prevSearchData.title_department_sub_role,
  //         clicked_child[0].key,
  //       ],
  //     }));
  //   }
  // };

  // vamsi function

  // const handleParentCheckboxChange = (event: any, parentId: any) => {
  //   event.stopPropagation();
  //   event.nativeEvent.stopImmediatePropagation();

  //   setCheckData((prevData: any) => {
  //     const updatedData = prevData.map((parent: any) => {
  //       if (parent.id === parentId) {
  //         const updatedChildren = parent.children.map((child: any) => ({
  //           ...child,
  //           checked: event.target.checked,
  //         }));
  //         const parentChecked = event.target.checked;
  //         return {
  //           ...parent,
  //           checked: parentChecked,
  //           indeterminate: false,
  //           children: updatedChildren,
  //         };
  //       }
  //       return parent;
  //     });

  //     const selectedParentValues = updatedData
  //       .filter((parent: any) => parent.checked)
  //       .map((parent: any) => parent.key);
  //     console.log("Selected Parent Values:", selectedParentValues);

  //     const selectedChildValues = updatedData
  //       .flatMap((parent: any) => parent.children)
  //       .filter((child: any) => child.checked)
  //       .map((child: any) => child.key);
  //     console.log("Selected Parent Values:", selectedChildValues);

  //     setSearchData((prevSearchData: any) => ({
  //       ...prevSearchData,
  //       title_department: selectedParentValues,
  //       title_department_sub_role: selectedChildValues,
  //     }));

  //     return updatedData;
  //   });
  // };

  // vamsi function

  // const handleChildCheckboxChange = (
  //   event: any,
  //   parentId: any,
  //   childId: any
  // ) => {
  //   setCheckData((prevData: any) => {
  //     const updatedData = prevData.map((parent: any) => {
  //       if (parent.id === parentId) {
  //         const updatedChildren = parent.children.map((child: any) => {
  //           if (child.id === childId) {
  //             return { ...child, checked: event.target.checked };
  //           }
  //           return child;
  //         });

  //         const parentChecked = updatedChildren.every(
  //           (child: any) => child.checked
  //         );
  //         const parentIndeterminate =
  //           updatedChildren.some((child: any) => child.checked) &&
  //           !parentChecked;
  //         return {
  //           ...parent,
  //           checked: parentChecked,
  //           indeterminate: parentIndeterminate,
  //           children: updatedChildren,
  //         };
  //       }
  //       return parent;
  //     });

  //     const selectedParentValues = updatedData
  //       .filter((parent: any) => parent.checked)
  //       .map((parent: any) => parent.key);
  //     console.log("Selected Parent Values:", selectedParentValues);

  //     const selectedChildValues = updatedData
  //       .flatMap((parent: any) => parent.children)
  //       .filter((child: any) => child.checked)
  //       .map((child: any) => child.key);

  //     setSearchData((prevSearchData: any) => ({
  //       ...prevSearchData,
  //       title_department: selectedParentValues,
  //       title_department_sub_role: selectedChildValues,
  //     }));

  //     return updatedData;
  //   });
  // };

  // Nagarjuna function

  const handleParentCheckboxChange = (event: any, parentId: any) => {
    const checked_parent = checkboxData.filter(
      (item: any) => item.id === parentId
    );

    if (searchData.title_department.includes(checked_parent[0].key)) {
      const index_checked_parent = searchData.title_department.indexOf(
        checked_parent[0].key
      );
      searchData.title_department.splice(index_checked_parent, 1);

      searchData.title_department_sub_role =
        searchData.title_department_sub_role.filter(
          (item: any) =>
            !checked_parent[0].children
              .map((child: any) => child.key)
              .includes(item)
        );
    } else {
      searchData.title_department.push(checked_parent[0].key);

      checked_parent[0].children.forEach((child: any) => {
        if (!searchData.title_department_sub_role.includes(child.key)) {
          // console.log("child.key", child.key);
          searchData.title_department_sub_role.push(child.key);
        }
      });
    }

    setSearchData((prevSearchData: any) => ({
      ...prevSearchData,
      title_department: [...searchData.title_department],
      title_department_sub_role: [...searchData.title_department_sub_role],
    }));
  };

  // Nagarjuna function

  const handleChildCheckboxChange = (
    event: any,
    parentId: any,
    childId: any
  ) => {
    const checked_respective_parent = checkboxData.filter(
      (item: any) => item.id === parentId
    );
    const checked_respective_parent_children =
      checked_respective_parent[0].children;
    const clicked_child = checked_respective_parent_children.find(
      (item: any) => item.id === childId
    );

    // console.log(
    //   "checked_respective_parent_children",
    //   checked_respective_parent_children
    // );

    if (clicked_child === undefined) {
      // Handle the case when the child is not found
      return;
    }

    if (searchData.title_department_sub_role.includes(clicked_child.key)) {
      const index_checked_child = searchData.title_department_sub_role.indexOf(
        clicked_child.key
      );
      searchData.title_department_sub_role.splice(index_checked_child, 1);

      const allChildrenChecked = checked_respective_parent_children.every(
        (child: any) => searchData.title_department_sub_role.includes(child.key)
      );
      // console.log("allChildrenChecked", allChildrenChecked);

      if (!allChildrenChecked) {
        const index_clicked_parent = searchData.title_department.indexOf(
          checked_respective_parent[0].key
        );
        // console.log("index_clicked_parent", index_clicked_parent);
        if (index_clicked_parent !== -1) {
          searchData.title_department.splice(index_clicked_parent, 1);
        }
      }
    } else {
      searchData.title_department_sub_role.push(clicked_child.key);

      const allChildrenChecked = checked_respective_parent_children.every(
        (child: any) => searchData.title_department_sub_role.includes(child.key)
      );
      // console.log("allChildrenChecked", allChildrenChecked);

      if (
        allChildrenChecked &&
        !searchData.title_department.includes(checked_respective_parent[0].key)
      ) {
        searchData.title_department.push(checked_respective_parent[0].key);
      }
    }

    setSearchData((prevSearchData: any) => ({
      ...prevSearchData,
      title_department: [...searchData.title_department],
      title_department_sub_role: [...searchData.title_department_sub_role],
    }));
  };

  // const handleChildCheckboxChange = (
  //   event: any,
  //   parentId: any,
  //   childId: any
  // ) => {
  //   const checked_respective_parent = checkData.filter(
  //     (item: any) => item.id === parentId
  //   );
  //   const checked_respective_parent_children =
  //     checked_respective_parent[0].children;
  //   const clicked_child = checked_respective_parent_children.find(
  //     (item: any) => item.id === childId
  //   );

  //   if (clicked_child === undefined) {
  //     // Handle the case when the child is not found
  //     return;
  //   }

  //   if (searchData.title_department_sub_role.includes(clicked_child.key)) {
  //     const index_checked_child = searchData.title_department_sub_role.indexOf(
  //       clicked_child.key
  //     );
  //     searchData.title_department_sub_role.splice(index_checked_child, 1);

  //     const otherChildrenChecked = checked_respective_parent_children.some(
  //       (child: any) => searchData.title_department_sub_role.includes(child.key)
  //     );

  //     if (!otherChildrenChecked) {
  //       const index_clicked_parent = searchData.title_department.indexOf(
  //         checked_respective_parent[0].key
  //       );
  //       searchData.title_department.splice(index_clicked_parent, 1);
  //     }
  //   } else {
  //     searchData.title_department_sub_role.push(clicked_child.key);

  //     if (
  //       !searchData.title_department.includes(checked_respective_parent[0].key)
  //     ) {
  //       searchData.title_department.push(checked_respective_parent[0].key);
  //     }
  //   }

  //   setSearchData((prevSearchData: any) => ({
  //     ...prevSearchData,
  //     title_department: [...searchData.title_department],
  //     title_department_sub_role: [...searchData.title_department_sub_role],
  //   }));
  // };

  const removeDepartmentParentElement = (index: any) => {
    if (index !== -1) {
      const updatedDepartmentParentTitles = searchData.title_department;
      const removed_parent = updatedDepartmentParentTitles.splice(index, 1);
      // console.log("removed_parent", removed_parent);

      const removed_parent_array = removed_parent.map((item: any) =>
        checkboxData.filter((parent: any) => parent.key === item)
      );

      // console.log("removed_parent_array", removed_parent_array);

      const removed_parent_children_array_of_array = removed_parent_array.map(
        (item: any) => item[0].children.map((chiid: any) => chiid.key)
      );

      // function flattenChildrenArray(
      //   removed_parent_children_array_of_array: any
      // ) {
      //   let removed_parent_children_array: any[] = [];

      //   removed_parent_children_array_of_array.forEach((item: any) => {
      //     if (Array.isArray(item)) {
      //       removed_parent_children_array =
      //         removed_parent_children_array.concat(flattenChildrenArray(item));
      //     } else {
      //       removed_parent_children_array.push(item);
      //     }
      //   });

      //   return removed_parent_children_array;
      // }

      // Example usage
      const removed_parent_children_array = flattenArray(
        removed_parent_children_array_of_array
      );

      // console.log(
      //   "removed_parent_children_array",
      //   removed_parent_children_array
      // );

      // console.log(
      //   "searchData.title_department_sub_role",
      //   searchData.title_department_sub_role
      // );

      const removed_parent_children_key_array: any[] =
        searchData.title_department_sub_role.filter(
          (item: any) => !removed_parent_children_array.includes(item)
        );

      // console.log(
      //   "removed_parent_children_key_array",
      //   removed_parent_children_key_array
      // );

      // const unique_removed_parent_children_key_array =
      //   removed_parent_children_key_array.map((item: any) => item.key);

      // console.log(
      //   "unique_removed_parent_children_key_array",
      //   unique_removed_parent_children_key_array
      // );

      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        title_department: updatedDepartmentParentTitles,
        title_department_sub_role: removed_parent_children_key_array,
      }));
    }
  };

  const removeDepartmentElement = (index: any) => {
    if (index !== -1) {
      const updatedDepartmentTitles = searchData.title_department_sub_role;
      updatedDepartmentTitles.splice(index, 1);
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        title_department_sub_role: updatedDepartmentTitles,
      }));
    }
  };

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
  // console.log(
  //   "department_titles_payload_children_array",
  //   department_titles_payload_children_array
  // );

  // console.log(
  //   "department_titles_payload_children_array",
  //   department_titles_payload_children_array
  // );

  React.useEffect(() => {
    if (searchData.person_titles === "") {
      setDefJobTitle("");
    }
    if (searchData.person_not_titles === "") {
      setDefNotTitle("");
    }
    if (searchData.person_past_titles === "") {
      setDefPastTitle("");
    }
  }, [
    searchData.person_titles,
    searchData.person_not_titles,
    searchData.person_past_titles,
  ]);

  useEffect(() => {
    if (searchData.title_is_boolean === "") {
      setbooleanValue("");
    }
  }, [searchData.title_is_boolean]);

  React.useEffect(() => {
    // getSearchData("");
    // console.log("searchData useEffect", searchData);
    if (searchData.exist_fields.includes("job_title")) {
      setIsUnKnown(false);
      setIsAnyOf(false);
      setIsBooleanSearch(false);
      setIsKnown(true);
      setIsNotAnyOf(false);
      setIsPastJobTitle(false);
    } else if (searchData.not_exist_fields.includes("job_title")) {
      setIsUnKnown(true);
      setIsAnyOf(false);
      setIsBooleanSearch(false);
      setIsKnown(false);
      setIsNotAnyOf(false);
      setIsPastJobTitle(false);
    }
  }, []);

  return (
    (<Stack>
      {/* {parentFrom} */}
      <>
        <Stack
          sx={{
            width: "100%",
            color: styles.blackcolor,
            // "&:hover": {
            //   color: styles.primaryTextColor,
            // },
          }}
        >
          <Stack
            direction="column"
            sx={{
              paddingX: "21.75px",
              marginY: "10px",
            }}
          >
            <Stack
              onClick={onClickIsAnyOf}
              direction="column"
              spacing={1}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                paddingX: "13px",
                paddingY: isAnyOf ? "10px" : "auto",
                minHeight: isAnyOf ? "auto" : "38.18px",
                cursor: "pointer",
                borderRadius: "5px",
                backgroundColor: isAnyOf
                  ? "#ffffff"
                  : styles.backGroundColorOnHover,
                border: "1px solid",
                borderColor: isAnyOf
                  ? styles.borderColor1
                  : styles.borderColor2,
                // height: isAnyOf ? "" : "20px",
                "&:hover": {
                  border: "1px solid",
                  borderColor: "#146EF6",
                  backgroundColor: "#ffffff",
                },
              }}
            >
              <Stack direction="row" spacing={1}>
                {isAnyOf ? (
                  <Stack
                    sx={{
                      height: "16px",
                      width: "16px",
                      borderRadius: "21px",
                      backgroundColor: "#146EF6",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "3px",
                    }}
                  >
                    <Stack
                      sx={{
                        height: "8px",
                        width: "8px",
                        backgroundColor: "#ffffff",
                        borderRadius: "21px",
                      }}
                    ></Stack>
                  </Stack>
                ) : (
                  <Stack
                    sx={{
                      border: "1px solid #CACACA",
                      height: "16px",
                      width: "16px",
                      borderRadius: "21px",
                      "&:hover": {
                        backgroundColor: "ffffff",
                        borderColor: "#146EF6",
                      },
                    }}
                  ></Stack>
                )}
                <Typography
                  sx={{
                    fontFamily:
                      'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                    color: "#737373",
                    fontSize: "14px",
                    fontWeight: "600",
                    marginBottom: "5px",
                  }}
                >
                  Is any of
                </Typography>
              </Stack>

              {isAnyOf && (
                <Stack spacing={1}>
                  {/* <CustomizedAutoComplete
                    placeholder={"Search for a job title"}
                  /> */}

                  <Autocomplete
                    className="auto-comp"
                    multiple
                    size="small"
                    loading={isAnyLoader}
                    loadingText="Searching..."
                    id="tags-outlined"
                    freeSolo
                    // PaperComponent={({ children }) => (
                    //   <Paper
                    //     style={{
                    //       position: "absolute",
                    //       top: "calc(100% + 5px)",
                    //       left: 0,
                    //       zIndex: 9999,
                    //       marginTop: "5px",
                    //     }}
                    //   >
                    //     {children}
                    //   </Paper>
                    // )}
                    // sx={{
                    //   "& .zp-modal-dialog .Select-control": {
                    //     height: "30px",
                    //   },
                    // }}
                    options={top100Films}
                    getOptionLabel={(option) => option.name}
                    // defaultValue={defJobTitle}
                    value={
                      defData.length === 0 && defJobTitle.length === 0
                        ? defJobTitle
                        : defData
                    }
                    // value={
                    //   searchData.person_titles.length === 0 ? [] : defJobTitle
                    // }
                    renderInput={(params) => (
                      <TextField
                        sx={{
                          "& .MuiInputBase-input.MuiOutlinedInput-input": {
                            color: "#1A1A1A",
                            fontSize: "14px",
                            fontWeight: 600,
                            fontFamily:
                              'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            maxHeight: "30px",
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
                          },
                        }}
                        {...params}
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <React.Fragment>
                              {isAnyLoader ? (
                                <CircularProgress
                                  sx={{ color: "#146EF6" }}
                                  size={14}
                                />
                              ) : null}
                              {params.InputProps.endAdornment}
                            </React.Fragment>
                          ),
                        }}
                        placeholder={
                          defData.length === 0 && defJobTitle.length === 0
                            ? "Search for a Job title"
                            : ""
                        }
                      />
                    )}
                    onInputChange={(event, newInputValue) => {
                      setIsAnyLoader(true);
                      getSearchData(newInputValue);
                    }}
                    onChange={handleAutocompleteChange}
                    // onKeyDown={handleAutocompleteKeyDown}
                    renderOption={(
                      props: object,
                      option: any,
                      state: object
                    ) => (
                      <Box
                        sx={{
                          color: styles.blackcolor,
                          fontSize: "14px",
                          fontWeight: "600",
                          fontFamily:
                            'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                          alignItems: "left",
                        }}
                        {...props}
                      // onClick={() => setSelectTitle(option.name)}
                      >
                        {option.name}
                      </Box>
                    )}
                    noOptionsText={null}
                  />

                  <Stack sx={{ cursor: "pointer" }}>
                    <Stack
                      direction="row"
                      spacing={1}
                      // onClick={onClickisNotAnyOf}
                      sx={{ display: "flex", flexDirection: "row" }}
                    >
                      <FormControlLabel
                        sx={{
                          paddingLeft: "5px",

                          flexGrow: "1",
                        }}
                        label={
                          <Box
                            sx={{
                              color: styles.blackcolor,
                              fontSize: "14px",
                              fontWeight: "600",
                              fontFamily:
                                'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            }}
                          >
                            Is not any of
                          </Box>
                        }
                        control={
                          <BpCheckboxContainer>
                            <Checkbox
                              className="bp-checkbox"
                              disableRipple
                              color="default"
                              checked={isNotAnyOf}
                              checkedIcon={
                                <BpCheckedIcon
                                  // className="bp-icon"
                                  style={{
                                    borderColor: isNotAnyOf
                                      ? styles.primaryTextColor
                                      : undefined,
                                  }}
                                />
                              }
                              icon={<BpIcon className="bp-icon" />}
                              onChange={(e: any) => onClickisNotAnyOf(e)}
                            />
                          </BpCheckboxContainer>
                        }
                      />
                    </Stack>
                    {isNotAnyOf && (
                      // <p>test</p>
                      (<Stack sx={{ marginBottom: "10px" }}>
                        {/* <CustomizedAutoComplete
                          placeholder={"Enter titles to exclude"}
                        /> */}
                        <Autocomplete
                          className="auto-comp"
                          freeSolo
                          loading={isNotAnyLoader}
                          loadingText="Searching..."
                          multiple
                          size="small"
                          id="tags-outlined"
                          options={top100Films}
                          getOptionLabel={(option) => option.name}
                          defaultValue={defNotTitle}
                          value={
                            defNotData.length === 0 && defNotTitle.length === 0
                              ? defNotTitle
                              : defNotData
                          }
                          renderInput={(params) => (
                            <TextField
                              sx={{
                                "& .MuiInputBase-input.MuiOutlinedInput-input":
                                {
                                  color: "#1A1A1A",
                                  fontSize: "14px",
                                  fontWeight: 600,
                                  fontFamily:
                                    'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
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
                                },
                              }}
                              {...params}
                              InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                  <React.Fragment>
                                    {isNotAnyLoader ? (
                                      <CircularProgress
                                        sx={{ color: "#146EF6" }}
                                        size={14}
                                      />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                  </React.Fragment>
                                ),
                              }}
                              placeholder={
                                defNotData.length === 0 &&
                                  defNotTitle.length === 0
                                  ? "Enter titles to exclude"
                                  : ""
                              }
                            />
                          )}
                          onInputChange={(event, newInputValue) => {
                            setIsNotAnyLoader(true);
                            getSearchData(newInputValue);
                          }}
                          onChange={excludeJobTitles}
                          renderOption={(
                            props: object,
                            option: any,
                            state: object
                          ) => (
                            <Box
                              sx={{
                                color: styles.blackcolor,
                                fontSize: "14px",
                                fontWeight: "600",
                                fontFamily:
                                  'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                alignItems: "left",
                              }}
                              {...props}
                            // onClick={() => setSelectTitle(option.name)}
                            >
                              {option.name}
                            </Box>
                          )}
                          noOptionsText={null}
                        />
                      </Stack>)

                      // <Autocomplete
                      //   className="auto-comp"
                      //   multiple
                      //   size="small"
                      //   id="tags-outlined"
                      //   options={top100Films}
                      //   getOptionLabel={(option) => option.name}
                      //   defaultValue={[]}
                      //   onInputChange={(event, newInputValue) => {
                      //     getSearchData(newInputValue);
                      //   }}
                      //   renderInput={(params) => (
                      //     <TextField
                      //       sx={{
                      //         paddingBottom: "8px",
                      //       }}
                      //       {...params}
                      //       placeholder="Enter titles to exclude"
                      //     />
                      //   )}
                      //   renderOption={(
                      //     props: object,
                      //     option: any,
                      //     state: object
                      //   ) => (
                      //     <Box
                      //       sx={{
                      //         color: styles.blackcolor,
                      //         fontSize: "14px",
                      //         fontWeight: "600",
                      //         fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                      //         alignItems: "left",
                      //       }}
                      //       {...props}
                      //     >
                      //       {option.name}
                      //     </Box>
                      //   )}
                      // />
                    )}
                  </Stack>
                  <Stack
                    sx={{ cursor: "pointer", marginTop: "-5px !important" }}
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      // onClick={onClickPastJobTitle}
                      sx={{ display: "flex", flexDirection: "row" }}
                    >
                      <FormControlLabel
                        sx={{
                          paddingLeft: "5px",
                          flexGrow: "1",
                        }}
                        label={
                          <Stack sx={{ display: "flex", flexDirection: "row" }}>
                            <Box
                              sx={{
                                color: styles.blackcolor,
                                fontSize: "14px",
                                fontWeight: "600",
                                fontFamily:
                                  'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              }}
                            >
                              Include Past job titles
                            </Box>
                            <BootstrapTooltip
                              title="You can also view contacts who have this job title as a past experience and other job titles"
                              placement="top"
                            >
                              <InfoOutlinedIcon
                                sx={{ color: "#cacacc" }}
                                fontSize="small"
                              />
                            </BootstrapTooltip>
                          </Stack>
                        }
                        control={
                          <BpCheckboxContainer>
                            <Checkbox
                              className="bp-checkbox"
                              disableRipple
                              color="default"
                              checked={isPastJobTitle}
                              checkedIcon={
                                <BpCheckedIcon
                                  // className="bp-icon"
                                  style={{
                                    borderColor: isPastJobTitle
                                      ? styles.primaryTextColor
                                      : undefined,
                                  }}
                                />
                              }
                              icon={<BpIcon className="bp-icon" />}
                              onChange={(e) => onClickPastJobTitle(e)}
                            />
                          </BpCheckboxContainer>
                        }
                      />
                      {/* <Tooltip
                        title="You can also view contacts who have this job title as a past experience and other job titles"
                        placement="top"
                      >
                        <InfoOutlinedIcon
                          sx={{ color: "#cacacc" }}
                          fontSize="small"
                        />
                      </Tooltip> */}
                    </Stack>
                    {isPastJobTitle && (
                      // <p>test</p>
                      (<Stack sx={{ marginBottom: "10px" }}>
                        {/* <CustomizedAutoComplete
                          placeholder={"Search for a past job title"}
                        /> */}
                        <Autocomplete
                          className="auto-comp"
                          freeSolo
                          loading={isPastLoader}
                          loadingText="Searching..."
                          multiple
                          size="small"
                          id="tags-outlined"
                          options={top100Films}
                          getOptionLabel={(option) => option.name}
                          defaultValue={defPastTitle}
                          value={
                            defPastData.length === 0 &&
                              defPastTitle.length === 0
                              ? defPastTitle
                              : defPastData
                          }
                          renderInput={(params) => (
                            <TextField
                              sx={{
                                "& .MuiInputBase-input.MuiOutlinedInput-input":
                                {
                                  color: "#1A1A1A",
                                  fontSize: "14px",
                                  fontWeight: 600,
                                  fontFamily:
                                    'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
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
                                },
                              }}
                              {...params}
                              InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                  <React.Fragment>
                                    {isPastLoader ? (
                                      <CircularProgress
                                        sx={{ color: "#146EF6" }}
                                        size={14}
                                      />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                  </React.Fragment>
                                ),
                              }}
                              placeholder={
                                defPastData.length === 0 &&
                                  defPastTitle.length === 0
                                  ? "Search for a Job title"
                                  : ""
                              }
                            />
                          )}
                          onInputChange={(event, newInputValue) => {
                            setIsPastLoader(true);
                            getSearchData(newInputValue);
                          }}
                          onChange={includeJobTitles}
                          renderOption={(
                            props: object,
                            option: any,
                            state: object
                          ) => (
                            <Box
                              sx={{
                                color: styles.blackcolor,
                                fontSize: "14px",
                                fontWeight: "600",
                                fontFamily:
                                  'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                alignItems: "left",
                              }}
                              {...props}
                            // onClick={() => setSelectTitle(option.name)}
                            >
                              {option.name}
                            </Box>
                          )}
                          noOptionsText={null}
                        />
                      </Stack>)
                      // <Autocomplete
                      //   className="auto-comp"
                      //   multiple
                      //   size="small"
                      //   id="tags-outlined"
                      //   options={top100Films}
                      //   getOptionLabel={(option) => option.name}
                      //   defaultValue={[top100Films[1]]}
                      //   renderInput={(params) => (
                      //     <TextField
                      //       {...params}
                      //       placeholder="Search for a past job title"
                      //     />
                      //   )}
                      //   onInputChange={(event, newInputValue) => {
                      //     getSearchData(newInputValue);
                      //   }}
                      //   renderOption={(
                      //     props: object,
                      //     option: any,
                      //     state: object
                      //   ) => (
                      //     <Box
                      //       sx={{
                      //         color: styles.blackcolor,
                      //         fontSize: "14px",
                      //         fontWeight: "600",
                      //         fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                      //         alignItems: "left",
                      //       }}
                      //       {...props}
                      //     >
                      //       {option.name}
                      //     </Box>
                      //   )}
                      // />
                    )}
                  </Stack>
                </Stack>
              )}
            </Stack>
          </Stack>
          <Stack
            direction="column"
            sx={{
              paddingX: "21.75px",
              marginY: "10px",
            }}
          >
            <Stack
              direction="column"
              onClick={onClickBooleanSearch}
              spacing={1}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                paddingX: "13px",
                paddingY: isBooleanSearch ? "10px" : "auto",
                minHeight: isBooleanSearch ? "auto" : "38.18px",

                cursor: "pointer",
                borderRadius: "5px",
                backgroundColor: isBooleanSearch
                  ? "#ffffff"
                  : styles.backGroundColorOnHover,

                border: "1px solid",
                borderColor: isBooleanSearch
                  ? styles.borderColor1
                  : styles.borderColor2,

                "&:hover": {
                  border: "1px solid",
                  borderColor: "#146EF6",
                  backgroundColor: "#ffffff",
                },
              }}
            >
              <Stack direction="row" spacing={1}>
                {isBooleanSearch ? (
                  <Stack
                    sx={{
                      height: "16px",
                      width: "16px",
                      borderRadius: "21px",
                      backgroundColor: "#146EF6",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "3px",
                    }}
                  >
                    <Stack
                      sx={{
                        height: "8px",
                        width: "8px",
                        backgroundColor: "#ffffff",
                        borderRadius: "21px",
                      }}
                    ></Stack>
                  </Stack>
                ) : (
                  <Stack
                    sx={{
                      border: "1px solid #CACACA",
                      height: "16px",
                      width: "16px",
                      borderRadius: "21px",
                      "&:hover": {
                        backgroundColor: "ffffff",
                        borderColor: "#146EF6",
                      },
                    }}
                  ></Stack>
                )}
                <Typography
                  sx={{
                    fontFamily:
                      'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                    color: "#737373",
                    fontSize: "14px",
                    fontWeight: "600",
                    marginBottom: "5px",
                  }}
                >
                  Boolean Search
                </Typography>
              </Stack>
              {isBooleanSearch && (
                <Stack direction="column" spacing={1}>
                  <Stack>
                    <Typography
                      sx={{
                        textAlign: "left",
                        fontFamily:
                          'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        fontWeight: "600",
                        fontSize: "12px",
                        color: styles.defaultTextColor1,
                      }}
                    >
                      Search with Boolean Operators
                    </Typography>
                    <Stack
                      sx={{
                        height: "72px",
                        overflow: "hidden",
                        border: "1px solid",
                        borderRadius: "3px",
                        borderColor: styles.greyColor,
                        width: "100%",

                        "&:focus": {
                          borderColor: styles.borderColor1,
                        },
                        "&:hover": {
                          borderColor: styles.borderColor1,
                        },
                      }}
                    >
                      <BootstrapInput
                        onChange={onChangeName}
                        spellCheck="false"
                        value={booleanValue}
                        sx={{
                          color: styles.defaultTextColor,
                          fontWeight: "600",
                          "& .MuiInputBase-input::placeholder": {
                            opacity: 0.8,
                            color: "#737373",
                          },
                        }}
                        placeholder="Enter job titles separated by AND/OR/AND NOT boolean operators
                  "
                        multiline
                      />
                    </Stack>
                    {/* <TextField
                      multiline
                      size="small"
                      placeholder="Enter job titles separated by AND/OR/AND NOT boolean operators"
                      rows={4}
                      
                    /> */}
                  </Stack>
                  <Stack>
                    <Typography
                      sx={{
                        textAlign: "left",
                        fontFamily:
                          'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        fontWeight: "400",
                        fontSize: "13PX",
                        color: "#1A1A1A",
                      }}
                    >
                      Correct syntax: sales AND "Product Design"; Sales OR
                      Design; Sales AND NOT Design.
                    </Typography>
                  </Stack>
                  <Stack>
                    <Button
                      disableRipple
                      variant="contained"
                      size="small"
                      onClick={submitBoolean}
                      sx={{
                        backgroundColor: "#146EF6",
                        "&:hover": {
                          backgroundColor: "#146ef6",
                        },
                        fontFamily:
                          'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        fontWeight: "700",
                        fontSize: "14PX",
                        color: "#FFFFFF",
                      }}
                    >
                      {booleanLoad ? (
                        <>
                          Apply
                          <CircularProgress size={15} className="loaderIcon" />
                        </>
                      ) : (
                        <>
                          Apply
                          {searchData.title_is_boolean && (
                            <CheckCircleOutlineIcon className="checkIcon" />
                          )}
                        </>
                      )}
                    </Button>
                  </Stack>
                </Stack>
              )}
            </Stack>
          </Stack>
          <Stack
            direction="column"
            sx={{ paddingX: "21.75px", marginY: "10px" }}
          >
            <Stack
              direction="row"
              onClick={onClickIsKnown}
              spacing={1}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                paddingX: "13px",
                minHeight: "38.18px",
                cursor: "pointer",
                borderRadius: "5px",
                backgroundColor: isKnown
                  ? "#ffffff"
                  : styles.backGroundColorOnHover,
                border: "1px solid",
                borderColor: isKnown
                  ? styles.borderColor1
                  : styles.borderColor2,

                "&:hover": {
                  border: "1px solid",
                  borderColor: "#146EF6",
                  backgroundColor: "#ffffff",
                },
              }}
            >
              {isKnown ? (
                <Stack
                  sx={{
                    height: "16px",
                    width: "16px",
                    borderRadius: "21px",
                    backgroundColor: "#146EF6",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "3px",
                  }}
                >
                  <Stack
                    sx={{
                      height: "8px",
                      width: "8px",
                      backgroundColor: "#ffffff",
                      borderRadius: "21px",
                    }}
                  ></Stack>
                </Stack>
              ) : (
                <Stack
                  sx={{
                    border: "1px solid #CACACA",
                    height: "16px",
                    width: "16px",
                    borderRadius: "21px",
                    "&:hover": {
                      backgroundColor: "ffffff",
                      borderColor: "#146EF6",
                    },
                  }}
                ></Stack>
              )}
              <Typography
                sx={{
                  fontFamily:
                    'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                  color: "#737373",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Is Known
              </Typography>
            </Stack>
          </Stack>
          <Stack
            direction="column"
            sx={{ paddingX: "21.75px", marginY: "10px" }}
          >
            <Stack
              direction="row"
              onClick={onClickIsUnKnown}
              spacing={1}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                paddingX: "13px",
                minHeight: "38.18px",
                cursor: "pointer",
                borderRadius: "5px",
                backgroundColor: isUnKnown
                  ? "#ffffff"
                  : styles.backGroundColorOnHover,
                border: "1px solid",
                borderColor: isUnKnown
                  ? styles.borderColor1
                  : styles.borderColor2,

                "&:hover": {
                  border: "1px solid",
                  borderColor: "#146EF6",
                  backgroundColor: "#ffffff",
                },
              }}
            >
              {isUnKnown ? (
                <Stack
                  sx={{
                    height: "16px",
                    width: "16px",
                    borderRadius: "21px",
                    backgroundColor: "#146EF6",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "3px",
                  }}
                >
                  <Stack
                    sx={{
                      height: "8px",
                      width: "8px",
                      backgroundColor: "#ffffff",
                      borderRadius: "21px",
                    }}
                  ></Stack>
                </Stack>
              ) : (
                <Stack
                  sx={{
                    border: "1px solid #CACACA",
                    height: "16px",
                    width: "16px",
                    borderRadius: "21px",
                    "&:hover": {
                      backgroundColor: "ffffff",
                      borderColor: "#146EF6",
                    },
                  }}
                ></Stack>
              )}
              <Typography
                sx={{
                  fontFamily:
                    'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                  color: "#737373",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Is Unknown
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Divider />
        <Stack sx={{ paddingX: "21.75px", marginY: "10px" }} spacing={2}>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingX: "13px",
              // paddingY: isKnown ? "10px" : "auto",
              minHeight: "30px",
              paddingBottom: isManagementLevel ? "5px" : "0px",
              backgroundColor: "#ffffff",
              // isManagementLevel
              // ? "#ffffff"
              // : styles.backGroundColorOnHover,
              borderRadius: "4px",
              border: "1px solid",
              borderColor: isManagementLevel ? "#146EF6" : "#e3e3e5",
              // borderColor: isManagementLevel ? "#146EF6" : "",
            }}
          >
            <Stack
              direction="row"
              onClick={onClickManagementLevel}
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
            >
              <Typography
                sx={{
                  color: isManagementLevel ? "#146EF6" : "#737373;",
                  fontFamily:
                    'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Management Level
              </Typography>
              {isManagementLevel ? (
                <ArrowDropUpIcon sx={{ color: "#737373" }} />
              ) : (
                <ArrowDropDownIcon sx={{ color: "#cacacc" }} />
              )}
            </Stack>
            <Stack
              sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
            >
              {
                isManagementLevel ? (
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: "100%",
                    }}
                  >
                    {/* <Stack
                  // onClick={onClickisFirstRowStack}
                  sx={{
                    paddingX: "6px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    width: "95%",
                    borderRadius: "3px",
                    "&:hover": {
                      backgroundColor: "#F0F0F0",
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    // onClick={onClickisFirstRow}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexGrow: "1",
                      "& .MuiButtonBase-root.MuiCheckbox-root": {
                        p: "5px ",
                      },
                    }}
                  >
                    <FormControlLabel
                      sx={{
                        paddingLeft: "5px",

                        flexGrow: "1",
                      }}
                      label={
                        <Stack sx={{ display: "flex", flexDirection: "row" }}>
                          <Typography
                            sx={{
                              color: styles.blackcolor,
                              fontSize: "14px",
                              fontWeight: "600",
                              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              marginRight: "5px",
                            }}
                          >
                            Owner
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              fontSize: "14px",
                              fontWeight: "400",
                              color: styles.defaultTextColor,
                              alignSelf: "center",
                            }}
                          >
                            (4.7k)
                          </Typography>
                        </Stack>
                      }
                      control={
                        <BpCheckboxContainer>
                          <Checkbox
                            sx={{}}
                            className="bp-checkbox"
                            disableRipple
                            color="default"
                            defaultChecked={false}
                            checkedIcon={<BpCheckedIcon className="bp-icon" />}
                            icon={<BpIcon className="bp-icon" />}
                            // onChange={onClickisFirstRow}
                          />
                        </BpCheckboxContainer>
                      }
                    />
                  </Stack>
                </Stack> */}

                    {managementLevelJsonData.map((item: any) => (
                      <Stack
                        // onClick={onClickisFirstRowStack}
                        key={item.key}
                        sx={{
                          paddingX: "6px",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          width: "95%",
                          borderRadius: "3px",
                          "&:hover": {
                            backgroundColor: "#F0F0F0",
                          },
                        }}
                      >
                        <Stack
                          direction="row"
                          spacing={1}
                          // onClick={onClickisFirstRow}
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            flexGrow: "1",
                            "& .MuiButtonBase-root.MuiCheckbox-root": {
                              p: "5px ",
                            },
                          }}
                        >
                          <FormControlLabel
                            sx={{
                              paddingLeft: "5px",

                              flexGrow: "1",
                            }}
                            label={
                              <Stack
                                sx={{ display: "flex", flexDirection: "row" }}
                              >
                                <Typography
                                  sx={{
                                    color: styles.blackcolor,
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    fontFamily:
                                      'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                    marginRight: "5px",
                                  }}
                                >
                                  {item.name}
                                </Typography>

                                {/* important */}

                                <Typography
                                  sx={{
                                    fontFamily:
                                      'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                    fontSize: "14px",
                                    fontWeight: "400",
                                    color: styles.defaultTextColor,
                                    alignSelf: "center",
                                    display: "none",
                                  }}
                                >
                                  (4.7k)
                                </Typography>
                              </Stack>
                            }
                            control={
                              <BpCheckboxContainer>
                                <Checkbox
                                  sx={{}}
                                  className="bp-checkbox"
                                  disableRipple
                                  color="default"
                                  checked={
                                    searchData.title_management_level.includes(
                                      item.key
                                    )
                                      ? true
                                      : false
                                  }
                                  checkedIcon={
                                    <BpCheckedIcon
                                      // className="bp-icon"
                                      style={{ borderColor: "#146EF6" }}
                                    />
                                  }
                                  icon={<BpIcon className="bp-icon" />}
                                  onChange={() =>
                                    onClickManagementLevelRow(item.index)
                                  }
                                />
                              </BpCheckboxContainer>
                            }
                          />
                        </Stack>
                      </Stack>
                    ))}

                    {/* <Stack
                  // onClick={onClickisFirstRowStack}
                  sx={{
                    paddingX: "6px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    width: "95%",
                    borderRadius: "3px",
                    "&:hover": {
                      backgroundColor: "#F0F0F0",
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    // onClick={onClickisFirstRow}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexGrow: "1",
                      "& .MuiButtonBase-root.MuiCheckbox-root": {
                        p: "5px ",
                      },
                    }}
                  >
                    <FormControlLabel
                      sx={{
                        paddingLeft: "5px",

                        flexGrow: "1",
                      }}
                      label={
                        <Stack sx={{ display: "flex", flexDirection: "row" }}>
                          <Typography
                            sx={{
                              color: styles.blackcolor,
                              fontSize: "14px",
                              fontWeight: "600",
                              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              marginRight: "5px",
                            }}
                          >
                            Founder
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              fontSize: "14px",
                              fontWeight: "400",
                              color: styles.defaultTextColor,
                              alignSelf: "center",
                            }}
                          >
                            (4.7k)
                          </Typography>
                        </Stack>
                      }
                      control={
                        <BpCheckboxContainer>
                          <Checkbox
                            sx={{}}
                            className="bp-checkbox"
                            disableRipple
                            color="default"
                            defaultChecked={false}
                            checkedIcon={<BpCheckedIcon className="bp-icon" />}
                            icon={<BpIcon className="bp-icon" />}
                            // onChange={onClickisFirstRow}
                          />
                        </BpCheckboxContainer>
                      }
                    />
                  </Stack>
                </Stack>

                <Stack
                  // onClick={onClickisFirstRowStack}
                  sx={{
                    paddingX: "6px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    width: "95%",
                    borderRadius: "3px",
                    "&:hover": {
                      backgroundColor: "#F0F0F0",
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    // onClick={onClickisFirstRow}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexGrow: "1",
                      "& .MuiButtonBase-root.MuiCheckbox-root": {
                        p: "5px ",
                      },
                    }}
                  >
                    <FormControlLabel
                      sx={{
                        paddingLeft: "5px",

                        flexGrow: "1",
                      }}
                      label={
                        <Stack sx={{ display: "flex", flexDirection: "row" }}>
                          <Typography
                            sx={{
                              color: styles.blackcolor,
                              fontSize: "14px",
                              fontWeight: "600",
                              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              marginRight: "5px",
                            }}
                          >
                            C suite
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              fontSize: "14px",
                              fontWeight: "400",
                              color: styles.defaultTextColor,
                              alignSelf: "center",
                            }}
                          >
                            (4.7k)
                          </Typography>
                        </Stack>
                      }
                      control={
                        <BpCheckboxContainer>
                          <Checkbox
                            sx={{}}
                            className="bp-checkbox"
                            disableRipple
                            color="default"
                            defaultChecked={false}
                            checkedIcon={<BpCheckedIcon className="bp-icon" />}
                            icon={<BpIcon className="bp-icon" />}
                            // onChange={onClickisFirstRow}
                          />
                        </BpCheckboxContainer>
                      }
                    />
                  </Stack>
                </Stack>

                <Stack
                  // onClick={onClickisFirstRowStack}
                  sx={{
                    paddingX: "6px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    width: "95%",
                    borderRadius: "3px",
                    "&:hover": {
                      backgroundColor: "#F0F0F0",
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    // onClick={onClickisFirstRow}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexGrow: "1",
                      "& .MuiButtonBase-root.MuiCheckbox-root": {
                        p: "5px ",
                      },
                    }}
                  >
                    <FormControlLabel
                      sx={{
                        paddingLeft: "5px",

                        flexGrow: "1",
                      }}
                      label={
                        <Stack sx={{ display: "flex", flexDirection: "row" }}>
                          <Typography
                            sx={{
                              color: styles.blackcolor,
                              fontSize: "14px",
                              fontWeight: "600",
                              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              marginRight: "5px",
                            }}
                          >
                            Partner
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              fontSize: "14px",
                              fontWeight: "400",
                              color: styles.defaultTextColor,
                              alignSelf: "center",
                            }}
                          >
                            (4.7k)
                          </Typography>
                        </Stack>
                      }
                      control={
                        <BpCheckboxContainer>
                          <Checkbox
                            sx={{}}
                            className="bp-checkbox"
                            disableRipple
                            color="default"
                            defaultChecked={false}
                            checkedIcon={<BpCheckedIcon className="bp-icon" />}
                            icon={<BpIcon className="bp-icon" />}
                            // onChange={onClickisFirstRow}
                          />
                        </BpCheckboxContainer>
                      }
                    />
                  </Stack>
                </Stack>

                <Stack
                  // onClick={onClickisFirstRowStack}
                  sx={{
                    paddingX: "6px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    width: "95%",
                    borderRadius: "3px",
                    "&:hover": {
                      backgroundColor: "#F0F0F0",
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    // onClick={onClickisFirstRow}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexGrow: "1",
                      "& .MuiButtonBase-root.MuiCheckbox-root": {
                        p: "5px ",
                      },
                    }}
                  >
                    <FormControlLabel
                      sx={{
                        paddingLeft: "5px",

                        flexGrow: "1",
                      }}
                      label={
                        <Stack sx={{ display: "flex", flexDirection: "row" }}>
                          <Typography
                            sx={{
                              color: styles.blackcolor,
                              fontSize: "14px",
                              fontWeight: "600",
                              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              marginRight: "5px",
                            }}
                          >
                            Vp
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              fontSize: "14px",
                              fontWeight: "400",
                              color: styles.defaultTextColor,
                              alignSelf: "center",
                            }}
                          >
                            (4.7k)
                          </Typography>
                        </Stack>
                      }
                      control={
                        <BpCheckboxContainer>
                          <Checkbox
                            sx={{}}
                            className="bp-checkbox"
                            disableRipple
                            color="default"
                            defaultChecked={false}
                            checkedIcon={<BpCheckedIcon className="bp-icon" />}
                            icon={<BpIcon className="bp-icon" />}
                            // onChange={onClickisFirstRow}
                          />
                        </BpCheckboxContainer>
                      }
                    />
                  </Stack>
                </Stack>

                <Stack
                  // onClick={onClickisFirstRowStack}
                  sx={{
                    paddingX: "6px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    width: "95%",
                    borderRadius: "3px",
                    "&:hover": {
                      backgroundColor: "#F0F0F0",
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    // onClick={onClickisFirstRow}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexGrow: "1",
                      "& .MuiButtonBase-root.MuiCheckbox-root": {
                        p: "5px ",
                      },
                    }}
                  >
                    <FormControlLabel
                      sx={{
                        paddingLeft: "5px",

                        flexGrow: "1",
                      }}
                      label={
                        <Stack sx={{ display: "flex", flexDirection: "row" }}>
                          <Typography
                            sx={{
                              color: styles.blackcolor,
                              fontSize: "14px",
                              fontWeight: "600",
                              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              marginRight: "5px",
                            }}
                          >
                            Head
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              fontSize: "14px",
                              fontWeight: "400",
                              color: styles.defaultTextColor,
                              alignSelf: "center",
                            }}
                          >
                            (4.7k)
                          </Typography>
                        </Stack>
                      }
                      control={
                        <BpCheckboxContainer>
                          <Checkbox
                            sx={{}}
                            className="bp-checkbox"
                            disableRipple
                            color="default"
                            defaultChecked={false}
                            checkedIcon={<BpCheckedIcon className="bp-icon" />}
                            icon={<BpIcon className="bp-icon" />}
                            // onChange={onClickisFirstRow}
                          />
                        </BpCheckboxContainer>
                      }
                    />
                  </Stack>
                </Stack>

                <Stack
                  // onClick={onClickisFirstRowStack}
                  sx={{
                    paddingX: "6px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    width: "95%",
                    borderRadius: "3px",
                    "&:hover": {
                      backgroundColor: "#F0F0F0",
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    // onClick={onClickisFirstRow}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexGrow: "1",
                      "& .MuiButtonBase-root.MuiCheckbox-root": {
                        p: "5px ",
                      },
                    }}
                  >
                    <FormControlLabel
                      sx={{
                        paddingLeft: "5px",

                        flexGrow: "1",
                      }}
                      label={
                        <Stack sx={{ display: "flex", flexDirection: "row" }}>
                          <Typography
                            sx={{
                              color: styles.blackcolor,
                              fontSize: "14px",
                              fontWeight: "600",
                              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              marginRight: "5px",
                            }}
                          >
                            Director
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              fontSize: "14px",
                              fontWeight: "400",
                              color: styles.defaultTextColor,
                              alignSelf: "center",
                            }}
                          >
                            (4.7k)
                          </Typography>
                        </Stack>
                      }
                      control={
                        <BpCheckboxContainer>
                          <Checkbox
                            sx={{}}
                            className="bp-checkbox"
                            disableRipple
                            color="default"
                            defaultChecked={false}
                            checkedIcon={<BpCheckedIcon className="bp-icon" />}
                            icon={<BpIcon className="bp-icon" />}
                            // onChange={onClickisFirstRow}
                          />
                        </BpCheckboxContainer>
                      }
                    />
                  </Stack>
                </Stack>

                <Stack
                  // onClick={onClickisFirstRowStack}
                  sx={{
                    paddingX: "6px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    width: "95%",
                    borderRadius: "3px",
                    "&:hover": {
                      backgroundColor: "#F0F0F0",
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    // onClick={onClickisFirstRow}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexGrow: "1",
                      "& .MuiButtonBase-root.MuiCheckbox-root": {
                        p: "5px ",
                      },
                    }}
                  >
                    <FormControlLabel
                      sx={{
                        paddingLeft: "5px",

                        flexGrow: "1",
                      }}
                      label={
                        <Stack sx={{ display: "flex", flexDirection: "row" }}>
                          <Typography
                            sx={{
                              color: styles.blackcolor,
                              fontSize: "14px",
                              fontWeight: "600",
                              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              marginRight: "5px",
                            }}
                          >
                            Manager
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              fontSize: "14px",
                              fontWeight: "400",
                              color: styles.defaultTextColor,
                              alignSelf: "center",
                            }}
                          >
                            (4.7k)
                          </Typography>
                        </Stack>
                      }
                      control={
                        <BpCheckboxContainer>
                          <Checkbox
                            sx={{}}
                            className="bp-checkbox"
                            disableRipple
                            color="default"
                            defaultChecked={false}
                            checkedIcon={<BpCheckedIcon className="bp-icon" />}
                            icon={<BpIcon className="bp-icon" />}
                            // onChange={onClickisFirstRow}
                          />
                        </BpCheckboxContainer>
                      }
                    />
                  </Stack>
                </Stack>

                <Stack
                  // onClick={onClickisFirstRowStack}
                  sx={{
                    paddingX: "6px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    width: "95%",
                    borderRadius: "3px",
                    "&:hover": {
                      backgroundColor: "#F0F0F0",
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    // onClick={onClickisFirstRow}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexGrow: "1",
                      "& .MuiButtonBase-root.MuiCheckbox-root": {
                        p: "5px ",
                      },
                    }}
                  >
                    <FormControlLabel
                      sx={{
                        paddingLeft: "5px",

                        flexGrow: "1",
                      }}
                      label={
                        <Stack sx={{ display: "flex", flexDirection: "row" }}>
                          <Typography
                            sx={{
                              color: styles.blackcolor,
                              fontSize: "14px",
                              fontWeight: "600",
                              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              marginRight: "5px",
                            }}
                          >
                            Senior
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              fontSize: "14px",
                              fontWeight: "400",
                              color: styles.defaultTextColor,
                              alignSelf: "center",
                            }}
                          >
                            (4.7k)
                          </Typography>
                        </Stack>
                      }
                      control={
                        <BpCheckboxContainer>
                          <Checkbox
                            sx={{}}
                            className="bp-checkbox"
                            disableRipple
                            color="default"
                            defaultChecked={false}
                            checkedIcon={<BpCheckedIcon className="bp-icon" />}
                            icon={<BpIcon className="bp-icon" />}
                            // onChange={onClickisFirstRow}
                          />
                        </BpCheckboxContainer>
                      }
                    />
                  </Stack>
                </Stack>

                <Stack
                  // onClick={onClickisFirstRowStack}
                  sx={{
                    paddingX: "6px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    width: "95%",
                    borderRadius: "3px",
                    "&:hover": {
                      backgroundColor: "#F0F0F0",
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    // onClick={onClickisFirstRow}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexGrow: "1",
                      "& .MuiButtonBase-root.MuiCheckbox-root": {
                        p: "5px ",
                      },
                    }}
                  >
                    <FormControlLabel
                      sx={{
                        paddingLeft: "5px",

                        flexGrow: "1",
                      }}
                      label={
                        <Stack sx={{ display: "flex", flexDirection: "row" }}>
                          <Typography
                            sx={{
                              color: styles.blackcolor,
                              fontSize: "14px",
                              fontWeight: "600",
                              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              marginRight: "5px",
                            }}
                          >
                            Entry
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              fontSize: "14px",
                              fontWeight: "400",
                              color: styles.defaultTextColor,
                              alignSelf: "center",
                            }}
                          >
                            (4.7k)
                          </Typography>
                        </Stack>
                      }
                      control={
                        <BpCheckboxContainer>
                          <Checkbox
                            sx={{}}
                            className="bp-checkbox"
                            disableRipple
                            color="default"
                            defaultChecked={false}
                            checkedIcon={<BpCheckedIcon className="bp-icon" />}
                            icon={<BpIcon className="bp-icon" />}
                            // onChange={onClickisFirstRow}
                          />
                        </BpCheckboxContainer>
                      }
                    />
                  </Stack>
                </Stack>

                <Stack
                  // onClick={onClickisFirstRowStack}
                  sx={{
                    paddingX: "6px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    width: "95%",
                    borderRadius: "3px",
                    "&:hover": {
                      backgroundColor: "#F0F0F0",
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    // onClick={onClickisFirstRow}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexGrow: "1",
                      "& .MuiButtonBase-root.MuiCheckbox-root": {
                        p: "5px ",
                      },
                    }}
                  >
                    <FormControlLabel
                      sx={{
                        paddingLeft: "5px",

                        flexGrow: "1",
                      }}
                      label={
                        <Stack sx={{ display: "flex", flexDirection: "row" }}>
                          <Typography
                            sx={{
                              color: styles.blackcolor,
                              fontSize: "14px",
                              fontWeight: "600",
                              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              marginRight: "5px",
                            }}
                          >
                            Intern
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              fontSize: "14px",
                              fontWeight: "400",
                              color: styles.defaultTextColor,
                              alignSelf: "center",
                            }}
                          >
                            (4.7k)
                          </Typography>
                        </Stack>
                      }
                      control={
                        <BpCheckboxContainer>
                          <Checkbox
                            sx={{}}
                            className="bp-checkbox"
                            disableRipple
                            color="default"
                            defaultChecked={false}
                            checkedIcon={<BpCheckedIcon className="bp-icon" />}
                            icon={<BpIcon className="bp-icon" />}
                            // onChange={onClickisFirstRow}
                          />
                        </BpCheckboxContainer>
                      }
                    />
                  </Stack>
                </Stack> */}
                  </Stack>
                ) : (
                  // <Stack>
                  (searchData.title_management_level.map((level: any, index: any) => (
                    <Stack
                      key={index}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "2px 7px",
                        backgroundColor: "#f0f0f2",
                        marginRight: "6px",
                        marginBottom: "4px",
                        "&:hover": {
                          backgroundColor: "#e3e3e5",
                        },
                        gap: "10px",
                        borderRadius: "2px",
                        // margin: "1px 2px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily:
                            'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                          fontSize: "12px",
                          fontWeight: "600",
                          color: styles.blackcolor,
                        }}
                      >
                        {level}
                      </Typography>
                      <CloseIcon
                        onClick={() => removeElementManagementLevel(index)}
                        sx={{
                          color: styles.lighTextColor,
                          fontSize: "small",
                          cursor: "pointer",
                        }}
                      />
                    </Stack>
                  )))
                )
                // </Stack>
              }
            </Stack>
          </Stack>

          <Stack
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              // alignItems: "center",
              paddingX: "13px",
              // paddingY: isKnown ? "10px" : "auto",
              minHeight: "30px",
              cursor: "pointer",
              backgroundColor: "#ffffff",
              borderRadius: "4px",
              border: "1px solid",
              borderColor: isDepartment ? "#146EF6" : "#e3e3e5",
            }}
          >
            <Stack
              direction="row"
              onClick={onClickDepartment}
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{
                  color: isDepartment ? "#146EF6" : "#737373;",
                  fontFamily:
                    'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Departments & Jobs Function
              </Typography>

              {isDepartment ? (
                <ArrowDropUpIcon sx={{ color: "#737373" }} />
              ) : (
                <ArrowDropDownIcon sx={{ color: "#cacacc" }} />
              )}
            </Stack>

            {isDepartment ? (
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  mb: 1,
                }}
              >
                <Box component="div">
                  <TextField
                    spellCheck="false"
                    placeholder="Search Departments"
                    size="small"
                    value={filterValue}
                    onChange={handleFilterChange}
                    sx={{
                      "& .MuiInputBase-input.MuiOutlinedInput-input": {
                        color: "#1A1A1A",
                        fontSize: "14px",
                        fontWeight: 600,
                        width: "100%",
                        fontFamily:
                          'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        p: "5px 45px 5px 10px",
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
                      },
                    }}
                  ></TextField>
                </Box>

                <Stack sx={{ width: "100%" }}>
                  {filteredData.map((parent: any) => (
                    <Stack key={parent.id} sx={{ width: "100%" }}>
                      <Stack
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          // justifyContent: "space-between",
                          mt: 2,
                          "&:hover": {
                            backgroundColor: "#F0F0F0",
                          },
                        }}
                      >
                        <Stack
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Stack
                            sx={{
                              "& .MuiButtonBase-root.MuiCheckbox-root": {
                                p: "5px 5px 5px 5px",
                              },
                            }}
                          >
                            <BpCheckboxContainer>
                              <Checkbox
                                disableRipple
                                checked={
                                  searchData.title_department.includes(
                                    parent.key
                                  )
                                    ? true
                                    : false
                                }
                                // checked={parent.checked || false}
                                // indeterminate={parent.indeterminate || false}
                                indeterminate={
                                  !searchData.title_department.includes(
                                    parent.key
                                  ) &&
                                    checkboxData
                                      .filter(
                                        (parent_obj: any) =>
                                          parent.id === parent_obj.id
                                      )[0]
                                      .children.map((item: any) =>
                                        searchData.title_department_sub_role.includes(
                                          item.key
                                        )
                                      )
                                      .some((value: any) => value === true)
                                    ? true
                                    : false
                                }
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
                                onChange={(event: any) =>
                                  handleParentCheckboxChange(event, parent.id)
                                }
                                icon={<BpIcon className="bp-icon" />}
                                checkedIcon={
                                  <BpCheckedIcon
                                    // className="bp-icon"
                                    style={{
                                      borderColor: styles.primaryTextColor,
                                    }}
                                  />
                                }
                                className="bp-checkbox"
                              />
                            </BpCheckboxContainer>
                          </Stack>
                        </Stack>

                        <Stack
                          onClick={() => toggleChildVisibility(parent.id)}
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            flexGrow: "1",
                          }}
                        >
                          <Stack>
                            <Typography
                              sx={{
                                color: styles.blackcolor,
                                fontSize: "14px",
                                fontWeight: "600",
                                fontFamily:
                                  'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              }}
                            >
                              {parent.parent}
                            </Typography>
                          </Stack>

                          <Stack>
                            {openParents.includes(parent.id) ? (
                              <RemoveRoundedIcon
                                sx={{ color: "#146EF6", fontSize: "20px" }}
                              />
                            ) : (
                              <AddRoundedIcon
                                sx={{ color: "#146EF6", fontSize: "20px" }}
                              />
                            )}
                          </Stack>
                        </Stack>
                      </Stack>

                      {openParents.includes(parent.id) && (
                        <Stack>
                          {parent.children.map((child: any) => (
                            <Stack
                              key={child.id}
                              sx={{
                                ml: 3,
                                "& .MuiButtonBase-root.MuiCheckbox-root": {
                                  p: "5px 5px 5px 5px",
                                },
                                "&:hover": {
                                  backgroundColor: "#F0F0F0",
                                },
                              }}
                            >
                              <FormControlLabel
                                key={child.id}
                                control={
                                  <BpCheckboxContainer>
                                    <Checkbox
                                      sx={{ ml: 2 }}
                                      disableRipple
                                      checked={
                                        searchData.title_department_sub_role.includes(
                                          child.key
                                        )
                                          ? true
                                          : false
                                      }
                                      onChange={(event: any) =>
                                        handleChildCheckboxChange(
                                          event,
                                          parent.id,
                                          child.id
                                        )
                                      }
                                      icon={<BpIcon className="bp-icon" />}
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
                                    {child.label}
                                  </Typography>
                                }
                              />
                            </Stack>
                          ))}
                        </Stack>
                      )}
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            ) : (
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  flexWrap: "wrap",
                }}
              >
                {/* {searchData.title_department.length !== 0 ? ( */}
                <>
                  {searchData.title_department.map((label: any, index: any) => (
                    <Stack
                      key={index}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "2px 7px",
                        backgroundColor: "#f0f0f2",
                        marginRight: "6px",
                        marginBottom: "4px",
                        "&:hover": {
                          backgroundColor: "#e3e3e5",
                        },
                        gap: "10px",
                        borderRadius: "2px",
                        // margin: "1px 2px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily:
                            'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                          fontSize: "12px",
                          fontWeight: "600",
                          color: styles.blackcolor,
                        }}
                      >
                        {label}
                      </Typography>
                      <CloseIcon
                        onClick={() => removeDepartmentParentElement(index)}
                        sx={{
                          color: styles.lighTextColor,
                          fontSize: "small",
                          cursor: "pointer",
                        }}
                      />
                    </Stack>
                  ))}
                </>

                {/* ) : ( */}
                <>
                  {searchData.title_department_sub_role.map(
                    (label: any, index: any) =>
                      !department_titles_payload_children_array.includes(
                        label
                      ) && (
                        <Stack
                          key={index}
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "2px 7px",
                            backgroundColor: "#f0f0f2",
                            marginRight: "6px",
                            marginBottom: "4px",
                            "&:hover": {
                              backgroundColor: "#e3e3e5",
                            },
                            gap: "10px",
                            borderRadius: "2px",
                            // margin: "1px 2px",
                          }}
                        >
                          <Typography
                            sx={{
                              fontFamily:
                                'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              fontSize: "12px",
                              fontWeight: "600",
                              color: styles.blackcolor,
                            }}
                          >
                            {label}
                          </Typography>
                          <CloseIcon
                            onClick={() => removeDepartmentElement(index)}
                            sx={{
                              color: styles.lighTextColor,
                              fontSize: "small",
                              cursor: "pointer",
                            }}
                          />
                        </Stack>
                      )
                  )}
                </>
                {/* )} */}
              </Stack>
            )}
          </Stack>
        </Stack>
      </>
    </Stack>)
  );
};
export default JobTitle;
