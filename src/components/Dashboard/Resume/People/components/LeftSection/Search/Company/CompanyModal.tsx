import { useContext } from "react";
import { React, useState } from "../../../../../../../../shared/modules/React";
import { Stack } from "../../../../../../../../shared/modules/MaterialImports/Stack";
import { Typography } from "../../../../../../../../shared/modules/MaterialImports/Typography";
import { Box } from "../../../../../../../../shared/modules/MaterialImports/Box";
import { CircularProgress } from "../../../../../../../../shared/modules/MaterialImports/CircularProgress";
// import ListAltIcon from "@mui/icons-material/ListAlt";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
// import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
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
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
// import InputBase from "@mui/material/InputBase";
import apiService from "../../../../shared/api/apiService";
import { debounce } from "@mui/material/utils";
import { ModalStore, Store } from "../../../DataLabs/DataLabs";

// const BootstrapInput = styled(InputBase)(({ theme }) => ({
//   "& .MuiInputBase-input": {
//     // borderRadius: "3px",
//     position: "relative",
//     backgroundColor: "#ffffff",
//     // border: "1px solid",
//     // borderColor: styles.greyColor,
//     fontSize: "14px",

//     // innerHeight: "30px",
//     width: "243px",

//     // padding: "6px 167px 7px 10px",
//     fontFamily:
//       'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
//     paddingLeft: "13px",
//     // "&:focus": {
//     //   borderColor: styles.borderColor1,
//     // },
//     // "&:hover": {
//     //   borderColor: styles.borderColor1,
//     // },
//   },
// }));

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

// import { makeStyles } from '@material-ui/core/styles';
// import apiService from "../../../../shared/api/apiService";
// import { debounce } from "@mui/material/utils";

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

// const top100Films:any = [];

function CompanyModal() {
  const [searchModalData, setSearchModalData] = useContext(ModalStore);
  const [isAnyOf, setIsAnyOf] = useState(true);
  const [isExclude, setIsExclude] = useState(false);
  const onClickIsAnyOf = () => {
    setIsAnyOf(true);
    setIsKnown(false);
    setIsUnKnown(false);
    setIsExclude(false);
    setSearchModalData((prevSearchData: any) => ({
      ...prevSearchData,
      exist_fields: [
        ...prevSearchData.exist_fields.filter(
          (field: any) => field !== "company"
        ),
      ],
      not_exist_fields: [
        ...prevSearchData.not_exist_fields.filter(
          (field: any) => field !== "company"
        ),
      ],
      exclude_company_names: [],
    }));
  };

  const onClickIsExclude = () => {
    setIsExclude(true);
    setIsKnown(false);
    setIsAnyOf(false);
    setIsUnKnown(false);
    setIsNotAnyOf(false);
    setIsPastJobTitle(false);
    setSearchModalData((prevSearchData: any) => ({
      ...prevSearchData,
      exist_fields: [
        ...prevSearchData.exist_fields.filter(
          (field: any) => field !== "company"
        ),
      ],
      not_exist_fields: [
        ...prevSearchData.not_exist_fields.filter(
          (field: any) => field !== "company"
        ),
      ],
      company_names: [],
      company_not_in_names: [],
      company_past_names: [],
    }));
  };

  const [isKnown, setIsKnown] = useState(false);
  const onClickIsKnown = () => {
    setIsKnown(true);
    setIsAnyOf(false);
    setIsUnKnown(false);
    setIsNotAnyOf(false);
    setIsPastJobTitle(false);
    setIsExclude(false);
    setSearchModalData((prevSearchData: any) => {
      // Add 'company' to exist_fields only if it doesn't already exist
      const updatedExistFields = prevSearchData.exist_fields.includes("company")
        ? prevSearchData.exist_fields
        : [...prevSearchData.exist_fields, "company"];

      // Filter out 'company' from not_exist_fields
      const filteredNotExistFields = prevSearchData.not_exist_fields.filter(
        (field: any) => field !== "company"
      );

      return {
        ...prevSearchData,
        exist_fields: updatedExistFields,
        not_exist_fields: filteredNotExistFields,
        company_names: [],
        company_not_in_names: [],
        company_past_names: [],
        exclude_company_names: [],
      };
    });
  };

  const [isUnKnown, setIsUnKnown] = useState(false);
  const onClickIsUnKnown = () => {
    setIsUnKnown(true);
    setIsAnyOf(false);
    setIsKnown(false);
    setIsNotAnyOf(false);
    setIsPastJobTitle(false);
    setIsExclude(false);
    setSearchModalData((prevSearchData: any) => {
      // Filter out 'company' from exist_fields without duplicates
      const filteredExistFields = prevSearchData.exist_fields.filter(
        (field: any) => field !== "company"
      );

      // Add 'company' to not_exist_fields only if it doesn't already exist
      const updatedNotExistFields = prevSearchData.not_exist_fields.includes(
        "company"
      )
        ? prevSearchData.not_exist_fields
        : [...prevSearchData.not_exist_fields, "company"];

      return {
        ...prevSearchData,
        exist_fields: filteredExistFields,
        not_exist_fields: updatedNotExistFields,
        company_names: [],
        company_not_in_names: [],
        company_past_names: [],
        exclude_company_names: [],
      };
    });
  };

  const [isNotAnyOf, setIsNotAnyOf] = useState(
    searchModalData.company_not_in_names.length ? true : false
  );
  const onClickisNotAnyOf = (e: any) => {
    setIsNotAnyOf(!isNotAnyOf);
    if (!e.target.checked) {
      setSearchModalData((prevSearchData: any) => ({
        ...prevSearchData,
        company_not_in_names: [],
      }));
    }
  };

  const [isPastJobTitle, setIsPastJobTitle] = useState(
    searchModalData.company_past_names.length ? true : false
  );
  const onClickPastJobTitle = (e: any) => {
    setIsPastJobTitle(!isPastJobTitle);
    if (!e.target.checked) {
      setSearchModalData((prevSearchData: any) => ({
        ...prevSearchData,
        company_past_names: [],
      }));
    }
  };

  // const [isInclude, setIsInclude] = useState(false);
  // const onClickInclude = () => {
  //   setIsInclude(!isInclude);
  // };

  const [top100Films, setRecordsData] = useState<any[] | never[]>([]);
  const [isAnyCompanyLoader, setIsAnyCompanyLoader] = useState(false);
  const [isNotAnyCompanyLoader, setIsNotAnyCompanyLoader] = useState(false);
  const [isPastCompanyLoader, setIsPastCompanyLoader] = useState(false);
  const [isExcludeCompanyLoader, setIsExcludeCompanyLoader] = useState(false);

  const sendRequest = (str: string) => {
    // send value to the backend

    let dataToPass = {
      field: "company",
      text: str,
    };

    apiService.getSuggessions(dataToPass).then((response: any) => {
      // setTeamLeads(response.data);
      // console.log(response);

      if (response.status === 200) {
        // const top100Films = response.data.data;
        setIsAnyCompanyLoader(false);
        setIsNotAnyCompanyLoader(false);
        setIsPastCompanyLoader(false);
        setIsExcludeCompanyLoader(false);
        if (response.data.data && response.data.data.length) {
          setRecordsData(response.data.data);
        }
      }
    });
  };

  const debouncedSendRequest = debounce(sendRequest, 500);

  const getSearchData = (str: string) => {
    debouncedSendRequest(str);
  };

  const defCompanyData = searchModalData.company_names.map((name: any) => {
    return { name: name, count: 999 };
  });
  const [defCompany, setDefCompany] = useState(defCompanyData);

  const defNotCompanyData = searchModalData.company_not_in_names.map((name: any) => {
    return { name: name, count: 999 };
  });
  const [defNotCompany, setDefNotCompany] = useState(defNotCompanyData);

  const defPastCompanyData = searchModalData.company_past_names.map((name: any) => {
    return { name: name, count: 999 };
  });
  const [defPastCompany, setDefPastCompany] = useState(defPastCompanyData);

  const defExcludeCompanyData = searchModalData.exclude_company_names.map(
    (name: any) => {
      return { name: name, count: 999 };
    }
  );
  const [defExcludeCompany, setDefExcludeCompany] = useState(
    defExcludeCompanyData
  );

  // const isAnyOfCompany = (event: any, value: any) => {
  //   if (value.length > 0) {
  //     const selectedOptions = value.map((option: any) => (option && option.name ? option.name : option));

  //     const updatedCompany = searchModalData.company_names
  //       .filter((company: string) => !selectedOptions.includes(company))
  //       .concat(selectedOptions);

  //     // console.log(value.length)
  //     // console.log(selectedOptions.length)
  //     // console.log(updatedCompany.length)

  //     if (event.key === 'Enter' && value.length > 0) {
  //       setSearchModalData((prevSearchData: any) => ({
  //         ...prevSearchData,
  //         company_names: updatedCompany,
  //       }));
  //     }

  //     if (selectedOptions.length === updatedCompany.length) {
  //       setSearchModalData((prevSearchData: any) => ({
  //         ...prevSearchData,
  //         company_names: updatedCompany,
  //       }));
  //     } else {
  //       updatedCompany.shift();
  //       setSearchModalData((prevSearchData: any) => ({
  //         ...prevSearchData,
  //         company_names: updatedCompany,
  //       }));
  //     }
  //   } else {
  //     setSearchModalData((prevSearchData: any) => ({
  //       ...prevSearchData,
  //       company_names: [],
  //     }));
  //   }
  // };

  const isAnyOfCompany = (event: any, value: any) => {
    
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

      const updatedCompany = searchModalData.company_names
        .filter((company: string) => !selectedOptions.includes(company))
        .concat(selectedOptions);

      if (event.key === "Enter" && value.length > 0) {
        setSearchModalData((prevSearchData: any) => ({
          ...prevSearchData,
          company_names: updatedCompany,
        }));
      }

      if (selectedOptions.length === updatedCompany.length) {
        setSearchModalData((prevSearchData: any) => ({
          ...prevSearchData,
          company_names: updatedCompany,
        }));
      } else {
        updatedCompany.shift();
        setSearchModalData((prevSearchData: any) => ({
          ...prevSearchData,
          company_names: updatedCompany,
        }));
      }
    } else {
      setSearchModalData((prevSearchData: any) => ({
        ...prevSearchData,
        company_names: [],
      }));
    }
  };

  // const isNotAnyCompany = (event: any, value: any) => {
  //   if (value.length > 0) {
  //     const selectedOptions = value.map((option: any) =>
  //       option && option.name ? option.name : option
  //     );

  //     const updatedNotCompany = searchModalData.company_not_in_names
  //       .filter((notcompany: string) => !selectedOptions.includes(notcompany))
  //       .concat(selectedOptions);

  //     // console.log(value.length)
  //     // console.log(selectedOptions.length)
  //     // console.log(updatedNotCompany.length)

  //     if (event.key === "Enter" && value.length > 0) {
  //       setSearchModalData((prevSearchData: any) => ({
  //         ...prevSearchData,
  //         company_not_in_names: updatedNotCompany,
  //       }));
  //     }

  //     if (selectedOptions.length === updatedNotCompany.length) {
  //       setSearchModalData((prevSearchData: any) => ({
  //         ...prevSearchData,
  //         company_not_in_names: updatedNotCompany,
  //       }));
  //     } else {
  //       updatedNotCompany.shift();
  //       setSearchModalData((prevSearchData: any) => ({
  //         ...prevSearchData,
  //         company_not_in_names: updatedNotCompany,
  //       }));
  //     }
  //   } else {
  //     setSearchModalData((prevSearchData: any) => ({
  //       ...prevSearchData,
  //       company_not_in_names: [],
  //     }));
  //   }
  // };

  const isNotAnyCompany = (event: any, value: any) => {
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

      const updatedNotCompany = searchModalData.company_not_in_names
        .filter((notcompany: string) => !selectedOptions.includes(notcompany))
        .concat(selectedOptions);

      if (event.key === "Enter" && value.length > 0) {
        setSearchModalData((prevSearchData: any) => ({
          ...prevSearchData,
          company_not_in_names: updatedNotCompany,
        }));
      }

      if (selectedOptions.length === updatedNotCompany.length) {
        setSearchModalData((prevSearchData: any) => ({
          ...prevSearchData,
          company_not_in_names: updatedNotCompany,
        }));
      } else {
        updatedNotCompany.shift();
        setSearchModalData((prevSearchData: any) => ({
          ...prevSearchData,
          company_not_in_names: updatedNotCompany,
        }));
      }
    } else {
      setSearchModalData((prevSearchData: any) => ({
        ...prevSearchData,
        company_not_in_names: [],
      }));
    }
  };

  // const includeCompany = (event: any, value: any) => {
  //   if (value.length > 0) {
  //     const selectedOptions = value.map((option: any) =>
  //       option && option.name ? option.name : option
  //     );

  //     const updatedPastCompany = searchModalData.company_past_names
  //       .filter((pastcompany: string) => !selectedOptions.includes(pastcompany))
  //       .concat(selectedOptions);

  //     // console.log(value.length)
  //     // console.log(selectedOptions.length)
  //     // console.log(updatedPastCompany.length)

  //     if (event.key === "Enter" && value.length > 0) {
  //       setSearchModalData((prevSearchData: any) => ({
  //         ...prevSearchData,
  //         company_past_names: updatedPastCompany,
  //       }));
  //     }

  //     if (selectedOptions.length === updatedPastCompany.length) {
  //       setSearchModalData((prevSearchData: any) => ({
  //         ...prevSearchData,
  //         company_past_names: updatedPastCompany,
  //       }));
  //     } else {
  //       updatedPastCompany.shift();
  //       setSearchModalData((prevSearchData: any) => ({
  //         ...prevSearchData,
  //         company_past_names: updatedPastCompany,
  //       }));
  //     }
  //   } else {
  //     setSearchModalData((prevSearchData: any) => ({
  //       ...prevSearchData,
  //       company_past_names: [],
  //     }));
  //   }
  // };

  const includeCompany = (event: any, value: any) => {
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

      const updatedPastCompany = searchModalData.company_past_names
        .filter((pastcompany: string) => !selectedOptions.includes(pastcompany))
        .concat(selectedOptions);

      if (event.key === "Enter" && value.length > 0) {
        setSearchModalData((prevSearchData: any) => ({
          ...prevSearchData,
          company_past_names: updatedPastCompany,
        }));
      }

      if (selectedOptions.length === updatedPastCompany.length) {
        setSearchModalData((prevSearchData: any) => ({
          ...prevSearchData,
          company_past_names: updatedPastCompany,
        }));
      } else {
        updatedPastCompany.shift();
        setSearchModalData((prevSearchData: any) => ({
          ...prevSearchData,
          company_past_names: updatedPastCompany,
        }));
      }
    } else {
      setSearchModalData((prevSearchData: any) => ({
        ...prevSearchData,
        company_past_names: [],
      }));
    }
  };

  const excludeCompany = (event: any, value: any) => {
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

      const updatedexcludeCompany = searchModalData.exclude_company_names
        .filter(
          (excludecompany: string) => !selectedOptions.includes(excludecompany)
        )
        .concat(selectedOptions);

      if (event.key === "Enter" && value.length > 0) {
        setSearchModalData((prevSearchData: any) => ({
          ...prevSearchData,
          exclude_company_names: updatedexcludeCompany,
        }));
      }

      if (selectedOptions.length === updatedexcludeCompany.length) {
        setSearchModalData((prevSearchData: any) => ({
          ...prevSearchData,
          exclude_company_names: updatedexcludeCompany,
        }));
      } else {
        updatedexcludeCompany.shift();
        setSearchModalData((prevSearchData: any) => ({
          ...prevSearchData,
          exclude_company_names: updatedexcludeCompany,
        }));
      }
    } else {
      setSearchModalData((prevSearchData: any) => ({
        ...prevSearchData,
        exclude_company_names: [],
      }));
    }
  };

  React.useEffect(() => {
    if (searchModalData.company_names === "") {
      setDefCompany("");
    }
    if (searchModalData.company_not_in_names === "") {
      setDefNotCompany("");
    }
    if (searchModalData.company_past_names === "") {
      setDefPastCompany("");
    }
    if (searchModalData.exclude_company_names === "") {
      setDefExcludeCompany("");
    }
  }, [
    searchModalData.company_names,
    searchModalData.company_not_in_names,
    searchModalData.company_past_names,
    searchModalData.exclude_company_names,
  ]);

  React.useEffect(() => {
    // getSearchData("");
    if (searchModalData.exist_fields.includes("company")) {
      setIsUnKnown(false);
      setIsAnyOf(false);
      setIsKnown(true);
      setIsNotAnyOf(false);
      setIsPastJobTitle(false);
    } else if (searchModalData.not_exist_fields.includes("company")) {
      setIsUnKnown(true);
      setIsAnyOf(false);
      setIsKnown(false);
      setIsNotAnyOf(false);
      setIsPastJobTitle(false);
    }
  }, []);

  // const dummydata = [
  //   { label: "OVA" },
  //   { label: "ASK Consulting" },
  //   { label: "IBM" },
  //   { label: "Accenture" },
  // ];

  return (
    // <Stack
    //   sx={{
    //     border: isClick ? "1px solid" : "",
    //     borderColor: isClick ? "#146EF6" : "",
    //   }}
    // >
    //   <Stack
    //     sx={{
    //       width: "100%",
    //       "&:hover": {
    //         cursor: "pointer",
    //         backgroundColor: "#F0F0F0",
    //         color: "#146EF6",
    //       },
    //     }}
    //     // className={selectCompany ? "expanded" : ""}
    //     onClick={handleClick}
    //   >
    //     <Stack
    //       sx={{
    //         padding: "10px",
    //         display: "flex",
    //         flexDirection: "row",
    //         justifyContent: "space-between",
    //       }}
    //     >
    //       <Stack
    //         spacing={1}
    //         direction="row"
    //       >
    //         < ApartmentOutlinedIcon
    //           sx={{
    //             color: isClick === true ? "#146EF6" : "",
    //             fontSize: '24px',
    //             "&:hover": {
    //               color: "#146EF6",
    //             },
    //           }}
    //         />
    //         <Typography
    //           sx={{
    //             color: isClick === true ? "#146EF6" : "",
    //           }}
    //           variant="body1"
    //           className="menu-title"
    //         >
    //           Company
    //         </Typography>
    //       </Stack>
    //       <Stack>
    //         {isClick === false && <ArrowDropDownIcon />}
    //         {isClick === true && <ArrowDropUpIcon />}
    //       </Stack>
    //     </Stack>
    //   </Stack>
    //   {isClick && (
    //     <Stack sx={{ width: "100%" }}>
    //       <Stack
    //         direction="column"
    //         sx={{ padding: "10px" }}
    //       >
    //         <Stack
    //           direction="row"
    //           onClick={onClickIsAnyOf}
    //           sx={{
    //             borderRadius: "4px",
    //             backgroundColor: "#F0F0F0",
    //             "&:hover": {
    //               border: "1px solid",
    //               borderColor: "#146EF6",
    //               backgroundColor: "#ffffff",
    //             },
    //           }}
    //         >
    //           <Radio />
    //           <Typography
    //             sx={{ marginTop: "8px", color: "#737373" }}
    //             variant="body1"
    //           >
    //             Is any of
    //           </Typography>
    //         </Stack>
    //         {isAnyOf && (
    //           <Stack>
    //             <Typography variant="body1">is any of trigger</Typography>
    //           </Stack>
    //         )}
    //       </Stack>
    //       <Stack sx={{ padding: "10px" }}>
    //         <Stack
    //           direction="row"
    //           sx={{
    //             borderRadius: "4px",
    //             backgroundColor: "#F0F0F0",
    //             "&:hover": {
    //               border: "1px solid",
    //               borderColor: "#146EF6",
    //               backgroundColor: "#ffffff",
    //             },
    //           }}
    //         >
    //           <Radio />
    //           <Typography
    //             sx={{ marginTop: "8px", color: "#737373" }}
    //             variant="body1"
    //           >
    //             Is Known
    //           </Typography>
    //         </Stack>
    //       </Stack>
    //       <Stack sx={{ padding: "10px" }}>
    //         <Stack
    //           direction="row"
    //           sx={{
    //             borderRadius: "4px",
    //             backgroundColor: "#F0F0F0",
    //             "&:hover": {
    //               border: "1px solid",
    //               borderColor: "#146EF6",
    //               backgroundColor: "#ffffff",
    //             },
    //           }}
    //         >
    //           <Radio />
    //           <Typography
    //             sx={{ marginTop: "8px", color: "#737373" }}
    //             variant="body1"
    //           >
    //             Is Unknown
    //           </Typography>
    //         </Stack>
    //       </Stack>
    //       {/* <Stack sx={{ padding: "10px" }}>
    //         <Stack
    //           sx={{
    //             border: "1px solid",
    //             padding: "10px",
    //             borderColor: "#146EF6",
    //             borderRadius: "6px",
    //           }}
    //         >
    //           <Stack>
    //             <Stack
    //               direction="row"
    //               spacing={1}
    //             >
    //               <Typography>radio</Typography>
    //               <Typography>label</Typography>
    //             </Stack>
    //             <Stack>
    //               <Typography>Select field</Typography>
    //             </Stack>
    //           </Stack>
    //           <Stack>
    //             <Stack
    //               direction="row"
    //               spacing={1}
    //             >
    //               <Typography>CheckBox</Typography>
    //               <Typography>label</Typography>
    //             </Stack>
    //             <Stack>
    //               <Typography>Select field</Typography>
    //             </Stack>
    //           </Stack>
    //           <Stack>
    //             <Stack
    //               direction="row"
    //               spacing={1}
    //             >
    //               <Typography>CheckBox</Typography>
    //               <Typography>label</Typography>
    //             </Stack>
    //             <Stack>
    //               <Typography>Select field</Typography>
    //             </Stack>
    //           </Stack>
    //         </Stack>
    //       </Stack> */}
    //     </Stack>
    //   )}
    // </Stack>
    (<Stack>
      <Stack
        sx={{
          color: styles.blackcolor,
          "&:hover": {
            color: styles.primaryTextColor,
          },
        }}
      >
        {/* <Box sx={{ height: "200px", color: styles.primaryTextColor }}>
          {" "}
          DropDown Company{" "}
        </Box> */}
        <Stack
          sx={{
            width: "100%",
            color: styles.blackcolor,
          }}
        >
          <Stack
            direction="column"
            sx={{ paddingX: "21.75px", marginTop: "10px" }}
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
                  {/* <CustomizedAutoComplete placeholder={"Enter Companies..."} /> */}

                  <Autocomplete
                    noOptionsText={null}
                    loading={isAnyCompanyLoader}
                    loadingText="Searching..."
                    freeSolo
                    className="auto-comp"
                    multiple
                    size="small"
                    id="tags-outlined"
                    options={top100Films}
                    getOptionLabel={(option) => option.name}
                    // defaultValue={defCompany}
                    value={
                      defCompanyData.length === 0 && defCompany.length === 0
                        ? defCompany
                        : defCompanyData
                    }
                    renderInput={(params) => (
                      <TextField
                        sx={{
                          // "& MuiAutocomplete-root.MuiOutlinedInput-root.MuiInputBase-sizeSmall.MuiAutocomplete-input":
                          //   {
                          //     padding: "0px 4px 0px 8px !important",
                          //   },
                          "& .MuiInputBase-input.MuiOutlinedInput-input": {
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
                              {isAnyCompanyLoader ? (
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
                          defCompanyData.length === 0 && defCompany.length === 0
                            ? "Enter Companies..."
                            : ""
                        }
                      />
                    )}
                    onInputChange={(event, newInputValue) => {
                      setIsAnyCompanyLoader(true);
                      getSearchData(newInputValue);
                    }}
                    onChange={isAnyOfCompany}
                    renderOption={(
                      props: object,
                      option: any,
                      state: object
                    ) => (
                      <Stack
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          width: "100%",
                        }}
                        {...props}
                        // onClick={() => setSelectTitle(option.name)}
                      >
                        <Typography
                          sx={{
                            color: styles.blackcolor,
                            fontSize: "14px",
                            fontWeight: "600",
                            fontFamily:
                              'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            width: "100%",

                            alignItems: "left",
                          }}
                        >
                          {option.name}
                        </Typography>

                        <Typography
                          sx={{
                            color: styles.blackcolor,
                            fontSize: "12px",
                            fontWeight: "400",
                            fontFamily:
                              'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            alignItems: "left",
                            width: "100%",
                          }}
                        >
                          {option.meta.website}
                        </Typography>
                      </Stack>
                    )}
                  />
                  {/* <Autocomplete
                    size="small"
                    multiple
                    id="tags-outlined"
                    options={top100Films}
                    getOptionLabel={(option) => option.title}
                    filterSelectedOptions
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Favorites"
                      />
                    )}
                  /> */}

                  {/* <Autocomplete
                        className="auto-comp"
                        multiple
                        size="small"
                        id="tags-outlined"
                        options={top100Films}
                        getOptionLabel={(option) => option.name}
                        defaultValue={[top100Films[1]]}
                        renderInput={(params) => (
                          <TextField
                            sx={{
                              paddingBottom: "8px",
                            }}
                            {...params}
                            placeholder="Enter titles to exclude"
                          />
                        )}
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
                              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              alignItems: "left",
                            }}
                            {...props}
                          >
                            {option.name}
                          </Box>
                        )}
                      /> */}

                  <Stack sx={{ cursor: "pointer" }}>
                    <Stack
                      direction="row"
                      spacing={1}
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
                              onChange={onClickisNotAnyOf}
                            />
                          </BpCheckboxContainer>
                        }
                      />
                    </Stack>
                    {isNotAnyOf && (
                      // <p>test</p>
                      (<Stack sx={{ marginBottom: "10px" }}>
                        {/* <CustomizedAutoComplete
                          placeholder={"Enter Companies to exclude..."}
                        /> */}
                        <Autocomplete
                          noOptionsText={null}
                          freeSolo
                          loading={isNotAnyCompanyLoader}
                          loadingText="Searching..."
                          className="auto-comp"
                          multiple
                          size="small"
                          id="tags-outlined"
                          options={top100Films}
                          getOptionLabel={(option) => option.name}
                          // defaultValue={defNotCompany}
                          value={
                            defNotCompanyData.length === 0 &&
                            defNotCompany.length === 0
                              ? defNotCompany
                              : defNotCompanyData
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
                                    {isNotAnyCompanyLoader ? (
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
                                defNotCompanyData.length === 0 &&
                                defNotCompany.length === 0
                                  ? "Enter Companies to exclude..."
                                  : ""
                              }
                            />
                          )}
                          onInputChange={(event, newInputValue) => {
                            setIsNotAnyCompanyLoader(true);
                            getSearchData(newInputValue);
                          }}
                          onChange={isNotAnyCompany}
                          renderOption={(
                            props: object,
                            option: any,
                            state: object
                          ) => (
                            <Stack
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                width: "100%",
                              }}
                              {...props}
                              // onClick={() => setSelectTitle(option.name)}
                            >
                              <Typography
                                sx={{
                                  color: styles.blackcolor,
                                  fontSize: "14px",
                                  fontWeight: "600",
                                  fontFamily:
                                    'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                  width: "100%",

                                  alignItems: "left",
                                }}
                              >
                                {option.name}
                              </Typography>

                              <Typography
                                sx={{
                                  color: styles.blackcolor,
                                  fontSize: "12px",
                                  fontWeight: "400",
                                  fontFamily:
                                    'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                  alignItems: "left",
                                  width: "100%",
                                }}
                              >
                                {option.meta.website}
                              </Typography>
                            </Stack>
                          )}
                        />
                      </Stack>)
                      // <Autocomplete
                      //   size="small"
                      //   multiple
                      //   id="tags-outlined"
                      //   options={top100Films}
                      //   getOptionLabel={(option) => option.title}
                      //   filterSelectedOptions
                      //   renderInput={(params) => (
                      //     <TextField
                      //       {...params}
                      //       placeholder="Favorites"
                      //     />
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
                              Include past company
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
                              onChange={onClickPastJobTitle}
                            />
                          </BpCheckboxContainer>
                        }
                      />
                    </Stack>
                    {isPastJobTitle && (
                      // <p>test</p>
                      (<Stack sx={{ marginBottom: "10px" }}>
                        {/* <CustomizedAutoComplete
                          placeholder={"Enter past companies"}
                        /> */}
                        <Autocomplete
                          noOptionsText={null}
                          loading={isPastCompanyLoader}
                          freeSolo
                          className="auto-comp"
                          multiple
                          size="small"
                          id="tags-outlined"
                          options={top100Films}
                          loadingText="Searching..."
                          getOptionLabel={(option) => option.name}
                          // defaultValue={defPastCompany}
                          value={
                            defPastCompanyData.length === 0 &&
                            defPastCompany.length === 0
                              ? defPastCompany
                              : defPastCompanyData
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
                                    {isPastCompanyLoader ? (
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
                                defPastCompanyData.length === 0 &&
                                defPastCompany.length === 0
                                  ? "Enter past companies..."
                                  : ""
                              }
                            />
                          )}
                          onInputChange={(event, newInputValue) => {
                            setIsPastCompanyLoader(true);
                            getSearchData(newInputValue);
                          }}
                          onChange={includeCompany}
                          renderOption={(
                            props: object,
                            option: any,
                            state: object
                          ) => (
                            <Stack
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                width: "100%",
                              }}
                              {...props}
                              // onClick={() => setSelectTitle(option.name)}
                            >
                              <Typography
                                sx={{
                                  color: styles.blackcolor,
                                  fontSize: "14px",
                                  fontWeight: "600",
                                  fontFamily:
                                    'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                  width: "100%",

                                  alignItems: "left",
                                }}
                              >
                                {option.name}
                              </Typography>

                              <Typography
                                sx={{
                                  color: styles.blackcolor,
                                  fontSize: "12px",
                                  fontWeight: "400",
                                  fontFamily:
                                    'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                  alignItems: "left",
                                  width: "100%",
                                }}
                              >
                                {option.meta.website}
                              </Typography>
                            </Stack>
                          )}
                        />
                      </Stack>)
                      // <Autocomplete
                      //   size="small"
                      //   multiple
                      //   id="tags-outlined"
                      //   options={top100Films}
                      //   getOptionLabel={(option) => option.title}
                      //   filterSelectedOptions
                      //   renderInput={(params) => (
                      //     <TextField
                      //       {...params}
                      //       placeholder="Favorites"
                      //     />
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
            sx={{ paddingX: "21.75px", marginTop: "10px" }}
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
                paddingLeft: "13px",
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
                paddingLeft: "13px",
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

          <Stack
            direction="column"
            sx={{
              paddingX: "21.75px",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            <Stack
              onClick={onClickIsExclude}
              direction="column"
              spacing={1}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                paddingX: "13px",
                paddingY: isExclude ? "10px" : "auto",
                minHeight: isExclude ? "auto" : "38.18px",
                cursor: "pointer",
                borderRadius: "5px",
                backgroundColor: isExclude
                  ? "#ffffff"
                  : styles.backGroundColorOnHover,
                border: "1px solid",
                borderColor: isExclude
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
                {isExclude ? (
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
                  Is exclude of
                </Typography>
              </Stack>

              {isExclude && (
                <Stack spacing={1}>
                  <Autocomplete
                    noOptionsText={null}
                    freeSolo
                    loading={isExcludeCompanyLoader}
                    loadingText="Searching..."
                    className="auto-comp"
                    multiple
                    size="small"
                    id="tags-outlined"
                    options={top100Films}
                    getOptionLabel={(option) => option.name}
                    // defaultValue={defExcludeCompany}
                    value={
                      defExcludeCompanyData.length === 0 &&
                      defExcludeCompany.length === 0
                        ? defExcludeCompany
                        : defExcludeCompanyData
                    }
                    renderInput={(params) => (
                      <TextField
                        sx={{
                          "& .MuiInputBase-input.MuiOutlinedInput-input": {
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
                              {isExcludeCompanyLoader ? (
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
                          defExcludeCompanyData.length === 0 &&
                          defExcludeCompany.length === 0
                            ? "Enter Companies to exclude..."
                            : ""
                        }
                      />
                    )}
                    onInputChange={(event, newInputValue) => {
                      setIsExcludeCompanyLoader(true);
                      getSearchData(newInputValue);
                    }}
                    onChange={excludeCompany}
                    renderOption={(
                      props: object,
                      option: any,
                      state: object
                    ) => (
                      <Stack
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          width: "100%",
                        }}
                        {...props}
                        // onClick={() => setSelectTitle(option.name)}
                      >
                        <Typography
                          sx={{
                            color: styles.blackcolor,
                            fontSize: "14px",
                            fontWeight: "600",
                            fontFamily:
                              'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            width: "100%",

                            alignItems: "left",
                          }}
                        >
                          {option.name}
                        </Typography>

                        <Typography
                          sx={{
                            color: styles.blackcolor,
                            fontSize: "12px",
                            fontWeight: "400",
                            fontFamily:
                              'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            alignItems: "left",
                            width: "100%",
                          }}
                        >
                          {option.meta.website}
                        </Typography>
                      </Stack>
                    )}
                  />
                </Stack>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      {/* isExcluded previous code */}
      {/* <Stack
        sx={{
          borderTop: "1px solid",
          borderTopColor: styles.borderBottomColor,
        }}
      >
        <Stack
          onClick={onClickInclude}
          sx={{
            "&:hover": {
              backgroundColor: styles.backGroundColorOnHover,
            },
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingX: "21.75px",
            height: "42px",
            cursor: "pointer",
          }}
        >
          <Typography
            sx={{
              fontFamily:
                'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
              fontSize: "14px",
              fontWeight: "600",
              color: styles.primaryTextColor,
            }}
          >
            Include / exclude list of companies
          </Typography>
          {isInclude ? (
            <ArrowDropUpIcon sx={{ color: styles.primaryTextColor }} />
          ) : (
            <ArrowDropDownIcon sx={{ color: styles.primaryTextColor }} />
          )}
        </Stack>
        {isInclude && (
          <Stack spacing={2}>
            <Stack
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                paddingX: "21.75px",
              }}
            >
              <Typography
                sx={{
                  fontFamily:
                    'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                  fontSize: "12px",
                  fontWeight: "600",
                  color: styles.defaultTextColor,
                }}
              >
                Include list of companies
              </Typography>
              <Stack
                sx={{
                  height: "100px",
                  overflow: "auto",
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
                  spellCheck="false"
                  sx={{
                    color: styles.defaultTextColor,
                    fontWeight: "600",
                  }}
                  placeholder="e.g. 91405"
                  multiline
                />
              </Stack>
              <Button
                disableRipple
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  gap: "4px",
                  backgroundColor: "#146ef6",
                  "&:hover": {
                    backgroundColor: "#146ef6",
                  },
                  marginTop: "10px",
                  marginBottom: "5px",
                }}
                variant="contained"
              >
                <Typography
                  sx={{
                    fontFamily:
                      'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                    fontStyle: "normal",
                    fontWeight: "700",
                    fontSize: "14px",
                    lineHeight: "17px",
                    color: "#FBFBFD",
                    letterSpacing: "0.005em",
                    textTransform: "capitalize",
                  }}
                >
                  Save and Search
                </Typography>
              </Button>
              <Stack sx={{ display: "flex", flexDirection: "row" }}>
                <Typography
                  sx={{
                    fontFamily:
                      'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                    fontSize: "12px",
                    fontWeight: "600",
                    color: styles.defaultTextColor,
                    textDecorationLine: "underline",
                  }}
                >
                  I only have company names
                </Typography>
                <BootstrapTooltip
                  title="Do you only have the company names? You can enrich them with websites for free by uploading them in a CSV file here. Once you finish the import, you can find them in the companies tab and export the results (filter by the file name under CSV Import). Please allow up to 1-2 hours for the enrichment to complete."
                  placement="top"
                >
                  <InfoOutlinedIcon
                    sx={{
                      color: "#cacacc",
                      fontSize: "18px",
                      cursor: "pointer",
                    }}
                  />
                </BootstrapTooltip>
              </Stack>
            </Stack>
            <Stack
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                paddingX: "21.75px",
                paddingBottom: "10px",
              }}
            >
              <Typography
                sx={{
                  fontFamily:
                    'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                  fontSize: "12px",
                  fontWeight: "600",
                  color: styles.defaultTextColor,
                }}
              >
                Include list of companies
              </Typography>
              <Stack
                sx={{
                  height: "100px",
                  overflow: "auto",
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
                  spellCheck="false"
                  sx={{
                    color: styles.defaultTextColor,
                    fontWeight: "600",
                  }}
                  placeholder="e.g. 91405"
                  multiline
                />
              </Stack>
              <Button
                disableRipple
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  gap: "4px",
                  backgroundColor: "#146ef6",
                  "&:hover": {
                    backgroundColor: "#146ef6",
                  },
                  marginTop: "10px",
                  marginBottom: "5px",
                }}
                variant="contained"
              >
                <Typography
                  sx={{
                    fontFamily:
                      'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                    fontStyle: "normal",
                    fontWeight: "700",
                    fontSize: "14px",
                    lineHeight: "17px",
                    color: "#FBFBFD",
                    letterSpacing: "0.005em",
                    textTransform: "capitalize",
                  }}
                >
                  Save and Search
                </Typography>
              </Button>
              <Stack sx={{ display: "flex", flexDirection: "row" }}>
                <Typography
                  sx={{
                    fontFamily:
                      'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                    fontSize: "12px",
                    fontWeight: "600",
                    color: styles.defaultTextColor,
                    textDecorationLine: "underline",
                  }}
                >
                  I only have company names
                </Typography>
                <BootstrapTooltip
                  title="Do you only have the company names? You can enrich them with websites for free by uploading them in a CSV file here. Once you finish the import, you can find them in the companies tab and export the results (filter by the file name under CSV Import). Please allow up to 1-2 hours for the enrichment to complete."
                  placement="top"
                >
                  <InfoOutlinedIcon
                    sx={{
                      color: "#cacacc",
                      fontSize: "18px",
                      cursor: "pointer",
                    }}
                  />
                </BootstrapTooltip>
              </Stack>
            </Stack>
          </Stack>
        )}
      </Stack> */}
    </Stack>)
  );
}
export default CompanyModal;
