import  {React} from "../../../../../../../../shared/modules/React";
import { useContext } from "react";
import { Box } from "../../../../../../../../shared/modules/MaterialImports/Box";
import { CircularProgress  } from "../../../../../../../../shared/modules/MaterialImports/CircularProgress";
import {Stack } from "../../../../../../../../shared/modules/MaterialImports/Stack";
import {Typography } from "../../../../../../../../shared/modules/MaterialImports/Typography";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import styles from "./../../../../shared/config/variables.module.scss";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import {Checkbox} from "../../../../../../../../shared/modules/MaterialImports/FormElements";
import {TextField, FormControlLabel} from "../../../../../../../../shared/modules/MaterialImports/FormInputs";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import apiService from "../../../../shared/api/apiService";
import { debounce } from "@mui/material/utils";
import Autocomplete from "@mui/material/Autocomplete";
import { ModalStore } from "../../../DataLabs/DataLabs";

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} arrow />
))(() => ({
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

const BpIcon = styled("span")(() => ({
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

const BpCheckboxContainer = styled("div")({
  ".bp-icon": {
    border: "1px #CACACC solid",
  },
  "& .bp-checkbox:hover .bp-icon": {
    borderColor: styles.primaryTextColor,
  },
});

const IndustryModal = () => {
  // const [selectIndustry, setIndustry] = React.useState(false)

  // const handleSelect = () => {
  //     setIndustry(!selectIndustry)
  // }

  const [isAdvSetting, setIsAdvSetting] = React.useState(false);
  const onClickAdvSetting = () => {
    setIsAdvSetting(!isAdvSetting);
  };

  const [isNotAnyOf, setIsNotAnyOf] = React.useState(true);
  const onClickIsNotAnyOf = () => {
    setIsNotAnyOf(true);
    setIsKnown(false);
    setIsUnKnown(false);
    setSearchModalData((prevSearchData: any) => {
      // Add 'job_title' to exist_fields only if it doesn't already exist
      return {
        ...prevSearchData,
        industry_adv_settings: "notAnyOf",
        exist_fields: [
          ...prevSearchData.exist_fields.filter(
            (field: any) => field !== "industries"
          ),
        ],
        not_exist_fields: [
          ...prevSearchData.not_exist_fields.filter(
            (field: any) => field !== "industries"
          ),
        ],
      };
    });
  };

  const [isKnown, setIsKnown] = React.useState(false);
  const onClickIsKnown = () => {
    setIsKnown(true);
    setIsNotAnyOf(false);
    setIsUnKnown(false);
    setSearchModalData((prevSearchData: any) => {
      // Add 'job_title' to exist_fields only if it doesn't already exist
      const updatedExistFields = prevSearchData.exist_fields.includes(
        "industries"
      )
        ? prevSearchData.exist_fields
        : [...prevSearchData.exist_fields, "industries"];

      // Filter out 'job_title' from not_exist_fields
      const filteredNotExistFields = prevSearchData.not_exist_fields.filter(
        (field: any) => field !== "industries"
      );

      return {
        ...prevSearchData,
        industry_adv_settings: "known",
        exist_fields: updatedExistFields,
        not_exist_fields: filteredNotExistFields,
        industries_not_in: [],
      };
    });
  };

  const [isUnKnown, setIsUnKnown] = React.useState(false);
  const onClickIsUnKnown = () => {
    setIsUnKnown(true);
    setIsKnown(false);
    setIsNotAnyOf(false);
    setSearchModalData((prevSearchData: any) => {
      // Add 'job_title' to exist_fields only if it doesn't already exist
      const updatedNotExistFields = prevSearchData.not_exist_fields.includes(
        "industries"
      )
        ? prevSearchData.not_exist_fields
        : [...prevSearchData.not_exist_fields, "industries"];

      // Filter out 'job_title' from not_exist_fields
      const filteredExistFields = prevSearchData.exist_fields.filter(
        (field: any) => field !== "industries"
      );

      return {
        ...prevSearchData,
        industry_adv_settings: "unKnown",
        exist_fields: filteredExistFields,
        not_exist_fields: updatedNotExistFields,
        industries_not_in: [],
      };
    });
  };

  const [isCompanyKeywords, setIsCompanyKeywords] = React.useState(false);
  const onClickCompanyKeywords = () => {
    setIsCompanyKeywords(!isCompanyKeywords);
    setIsInclude(true);
    if (searchModalData.industry_all_company_names.length !== 0) {
      setIsAll(true);
    } else {
      setIsAll(false);
    }
    if (searchModalData.industry_company_not_in_names.length !== 0) {
      setIsExclude(true);
    } else {
      setIsExclude(false);
    }
  };

  const [isInclude, setIsInclude] = React.useState(true);
  const onClickIsInclude = () => {
    setIsInclude(!isInclude);
    setIsIncludeAdvanced(false);
    // setIsAll(false);
    // setIsExclude(false);
    setSearchModalData((prevSearchData: any) => ({
      ...prevSearchData,
      industry_company_names: [],
    }));
  };

  const [isAll, setIsAll] = React.useState(false);
  const onClickIsAll = () => {
    // setIsInclude(false);
    setIsAll(!isAll);
    setIsAllAdvanced(false);
    // setIsExclude(false);
    setSearchModalData((prevSearchData: any) => ({
      ...prevSearchData,
      industry_all_company_names: [],
    }));
  };

  const [isExclude, setIsExclude] = React.useState(false);
  const onClickIsExclude = () => {
    // setIsInclude(false);
    // setIsAll(false);
    setIsExclude(!isExclude);
    setIsExcludeAdvanced(false);
    setSearchModalData((prevSearchData: any) => ({
      ...prevSearchData,
      industry_company_not_in_names: [],
    }));
  };

  const [isIncludeAdvanced, setIsIncludeAdvanced] = React.useState(false);
  const onClickIncludeAdvanced = () => {
    setIsIncludeAdvanced(!isIncludeAdvanced);
  };

  const [isAllAdvanced, setIsAllAdvanced] = React.useState(false);
  const onClickAllAdvanced = () => {
    setIsAllAdvanced(!isAllAdvanced);
  };

  const [isExcludeAdvanced, setIsExcludeAdvanced] = React.useState(false);
  const onClickExcludeAdvanced = () => {
    setIsExcludeAdvanced(!isExcludeAdvanced);
  };

  const [searchModalData, setSearchModalData] = useContext(ModalStore);

  const defIndustryData = searchModalData.industries.map((name: any) => {
    return { name: name, count: 999 };
  });
  const [defIndustry, setDefIndustry] = React.useState(defIndustryData);

  const defNotIndustryData = searchModalData.industries_not_in.map((name: any) => {
    return { name: name, count: 999 };
  });
  const [defNotIndustry, setDefNotIndustry] =
    React.useState(defNotIndustryData);

  const defExcludeCompanyIndustryData =
    searchModalData.industry_company_not_in_names.map((name: any) => {
      return { name: name, count: 999 };
    });
  const [defExcludeCompanyIndustry, setDefExcludeCompanyIndustry] =
    React.useState(defExcludeCompanyIndustryData);

  const defIncludeCompanyIndustryData = searchModalData.industry_company_names.map(
    (name: any) => {
      return { name: name, count: 999 };
    }
  );
  const [defIncludeCompanyIndustry, setDefIncludeCompanyIndustry] =
    React.useState(defIncludeCompanyIndustryData);

  const defIncludeAllCompanyIndustryData =
    searchModalData.industry_all_company_names.map((name: any) => {
      return { name: name, count: 999 };
    });
  const [defIncludeAllCompanyIndustry, setDefIncludeAllCompanyIndustry] =
    React.useState(defIncludeAllCompanyIndustryData);

  // console.log("defIndData", defIndustryData);
  // console.log("defInd", defIndustry);

  const handleAutocompleteChange = (event: any, value: any) => {
    if (value.length > 0) {
      // const selectedOptions = value.map((option: any) => (option && option.name ? option.name : option));

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

      const updatedIndustry = searchModalData.industries
        .filter((industry: string) => !selectedOptions.includes(industry))
        .concat(selectedOptions);

      // console.log(value.length)
      // console.log(selectedOptions.length)
      // console.log(updatedIndustry.length)

      if (event.key === "Enter" && value.length > 0) {
        setSearchModalData((prevSearchData: any) => ({
          ...prevSearchData,
          industries: updatedIndustry,
        }));
      }

      if (selectedOptions.length === updatedIndustry.length) {
        setSearchModalData((prevSearchData: any) => ({
          ...prevSearchData,
          industries: updatedIndustry,
        }));
      } else {
        updatedIndustry.shift();
        setSearchModalData((prevSearchData: any) => ({
          ...prevSearchData,
          industries: updatedIndustry,
        }));
      }
    } else {
      setSearchModalData((prevSearchData: any) => ({
        ...prevSearchData,
        industries: [],
      }));
    }
  };

  const handleExcludeAutocompleteChange = (event: any, value: any) => {
    setSelectedOptions(value);
    if (value.length > 0) {
      // const selectedOptions = value.map((option: any) => (option && option.name ? option.name : option));

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

      const updatedIndustry = searchModalData.industries_not_in
        .filter((industry: string) => !selectedOptions.includes(industry))
        .concat(selectedOptions);

      // console.log(value.length)
      // console.log(selectedOptions.length)
      // console.log(updatedIndustry.length)

      if (event.key === "Enter" && value.length > 0) {
        setSearchModalData((prevSearchData: any) => ({
          ...prevSearchData,
          industries_not_in: updatedIndustry,
        }));
      }

      if (selectedOptions.length === updatedIndustry.length) {
        setSearchModalData((prevSearchData: any) => ({
          ...prevSearchData,
          industries_not_in: updatedIndustry,
        }));
      } else {
        updatedIndustry.shift();
        setSearchModalData((prevSearchData: any) => ({
          ...prevSearchData,
          industries_not_in: updatedIndustry,
        }));
      }
    } else {
      setSearchModalData((prevSearchData: any) => ({
        ...prevSearchData,
        industries_not_in: [],
      }));
    }
  };

  const handleExcludeCompanyAutocompleteChange = (event: any, value: any) => {
    setSelectedOptions(value);
    if (value.length > 0) {
      // const selectedOptions = value.map((option: any) => (option && option.name ? option.name : option));

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

      const updatedIndustry = searchModalData.industry_company_not_in_names
        .filter((industry: string) => !selectedOptions.includes(industry))
        .concat(selectedOptions);

      // console.log(value.length)
      // console.log(selectedOptions.length)
      // console.log(updatedIndustry.length)

      if (event.key === "Enter" && value.length > 0) {
        setSearchModalData((prevSearchData: any) => ({
          ...prevSearchData,
          industry_company_not_in_names: updatedIndustry,
        }));
      }

      if (selectedOptions.length === updatedIndustry.length) {
        setSearchModalData((prevSearchData: any) => ({
          ...prevSearchData,
          industry_company_not_in_names: updatedIndustry,
        }));
      } else {
        updatedIndustry.shift();
        setSearchModalData((prevSearchData: any) => ({
          ...prevSearchData,
          industry_company_not_in_names: updatedIndustry,
        }));
      }
    } else {
      setSearchModalData((prevSearchData: any) => ({
        ...prevSearchData,
        industry_company_not_in_names: [],
      }));
    }
  };

  const handleIncludeCompanyAutocompleteChange = (event: any, value: any) => {
    setSelectedOptions(value);
    if (value.length > 0) {
      // const selectedOptions = value.map((option: any) => (option && option.name ? option.name : option));

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

      const updatedIndustry = searchModalData.industry_company_names
        .filter((industry: string) => !selectedOptions.includes(industry))
        .concat(selectedOptions);

      // console.log(value.length)
      // console.log(selectedOptions.length)
      // console.log(updatedIndustry.length)

      if (event.key === "Enter" && value.length > 0) {
        setSearchModalData((prevSearchData: any) => ({
          ...prevSearchData,
          industry_company_names: updatedIndustry,
        }));
      }

      if (selectedOptions.length === updatedIndustry.length) {
        setSearchModalData((prevSearchData: any) => ({
          ...prevSearchData,
          industry_company_names: updatedIndustry,
        }));
      } else {
        updatedIndustry.shift();
        setSearchModalData((prevSearchData: any) => ({
          ...prevSearchData,
          industry_company_names: updatedIndustry,
        }));
      }
    } else {
      setSearchModalData((prevSearchData: any) => ({
        ...prevSearchData,
        industry_company_names: [],
      }));
    }
  };

  const handleIncludeAllCompanyAutocompleteChange = (
    event: any,
    value: any
  ) => {
    setSelectedOptions(value);
    if (value.length > 0) {
      // const selectedOptions = value.map((option: any) => (option && option.name ? option.name : option));

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

      const updatedIndustry = searchModalData.industry_all_company_names
        .filter((industry: string) => !selectedOptions.includes(industry))
        .concat(selectedOptions);

      // console.log(value.length)
      // console.log(selectedOptions.length)
      // console.log(updatedIndustry.length)

      if (event.key === "Enter" && value.length > 0) {
        setSearchModalData((prevSearchData: any) => ({
          ...prevSearchData,
          industry_all_company_names: updatedIndustry,
        }));
      }

      if (selectedOptions.length === updatedIndustry.length) {
        setSearchModalData((prevSearchData: any) => ({
          ...prevSearchData,
          industry_all_company_names: updatedIndustry,
        }));
      } else {
        updatedIndustry.shift();
        setSearchModalData((prevSearchData: any) => ({
          ...prevSearchData,
          industry_all_company_names: updatedIndustry,
        }));
      }
    } else {
      setSearchModalData((prevSearchData: any) => ({
        ...prevSearchData,
        industry_all_company_names: [],
      }));
    }
  };

  const [top100Films, setRecordsData] = React.useState<any[] | never[]>([]);
  const [isAnyIndustryLoader, setIsAnyIndustryLoader] = React.useState(false);
  const [isNotIndustryLoader, setIsNotIndustryLoader] = React.useState(false);
  const [isExcludeCompanyIndustryLoader, setIsExcludeCompanyIndustryLoader] =
    React.useState(false);
  const [isIncludeCompanyIndustryLoader, setIsIncludeCompanyIndustryLoader] =
    React.useState(false);
  const [
    isIncludeAllCompanyIndustryLoader,
    setIsIncludeAllCompanyIndustryLoader,
  ] = React.useState(false);

  const sendRequest = (str: string) => {
    // send value to the backend

    let dataToPass = {
      field: "industry",
      text: str,
    };

    apiService.getSuggessions(dataToPass).then((response: any) => {
      // setTeamLeads(response.data);
      // console.log(response);

      if (response.status === 200) {
        setIsAnyIndustryLoader(false);
        setIsNotIndustryLoader(false);
        setIsIncludeCompanyIndustryLoader(false);
        setIsIncludeAllCompanyIndustryLoader(false);
        setIsExcludeCompanyIndustryLoader(false);
        // const top100Films = response.data.data;
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


    const sendCompanyRequest = (str: string) => {
    // send value to the backend

    let dataToPass = {
      field: "company",
      text: str,
    };

    apiService.getSuggessions(dataToPass).then((response: any) => {
      // setTeamLeads(response.data);
      // console.log(response);

      if (response.status === 200) {
        setIsAnyIndustryLoader(false);
        setIsNotIndustryLoader(false);
        setIsIncludeCompanyIndustryLoader(false);
        setIsIncludeAllCompanyIndustryLoader(false);
        setIsExcludeCompanyIndustryLoader(false);
        // const top100Films = response.data.data;
        if (response.data.data && response.data.data.length) {
          setRecordsData(response.data.data);
        }
      }
    });
  };

  const debouncedSendCompanyRequest = debounce(sendCompanyRequest, 500);

  const getSearchCompanyData = (str: string) => {
    debouncedSendCompanyRequest(str);
  };

  React.useEffect(() => {
    if (searchModalData.industries === "") {
      setDefIndustry([]);
    }
    if (searchModalData.industries_not_in === "") {
      setDefNotIndustry([]);
    }
    if (searchModalData.industry_company_not_in_names === "") {
      setDefExcludeCompanyIndustry([]);
    }
    if (searchModalData.industry_company_names === "") {
      setDefIncludeCompanyIndustry([]);
    }
    if (searchModalData.industry_all_company_names === "") {
      setDefIncludeAllCompanyIndustry([]);
    }
  }, [
    searchModalData.industries,
    searchModalData.industries_not_in,
    searchModalData.industry_company_not_in_names,
    searchModalData.industry_all_company_names,
    searchModalData.industry_company_names,
  ]);

  React.useEffect(() => {
    getSearchData("");
    if (searchModalData.industries_not_in.length !== 0) {
      setIsNotAnyOf(true);
      setIsAdvSetting(true)
    } else if (searchModalData.industry_adv_settings === "known") {
      setIsKnown(true);
      setIsNotAnyOf(false);
      setIsAdvSetting(true)
    } else if (searchModalData.industry_adv_settings === "unKnown") {
      setIsUnKnown(true);
      setIsNotAnyOf(false);
      setIsAdvSetting(true)
    }

    if (
      searchModalData.industry_company_not_in_names.length !== 0 ||
      searchModalData.industry_company_names.length !== 0 ||
      searchModalData.industry_all_company_names.length !== 0
    ) {
      setIsCompanyKeywords(true);
    }

    if (searchModalData.industry_company_not_in_names.length !== 0) {
      setIsExclude(true);
    }
    if (searchModalData.industry_company_names.length !== 0) {
      setIsInclude(true);
    }
    if (searchModalData.industry_all_company_names.length !== 0) {
      setIsAll(true);
    }
  }, []);
  const [selectedOptions, setSelectedOptions] = React.useState<any>([]);

  return (
    // <Stack p={1} className={selectIndustry ? 'expanded' : ''} onClick={handleSelect}>
    //     <Box className='left-containers-align'>
    //         <Box className='left-containers-align'>
    //             <FactoryOutlinedIcon className='list-icon' sx={{ fontSize: '24px', }} />
    //             <Typography component='p' className='menu-title'>Industry & Keywords</Typography>
    //         </Box>
    //         <Box className='left-containers-dropdown'>
    //             <ArrowDropDownIcon sx={{ display: selectIndustry ? 'none' : 'block' }} />
    //             <ArrowDropUpIcon sx={{ display: selectIndustry ? 'block' : 'none' }} />
    //         </Box>
    //     </Box>
    //     <Box sx={{ display: selectIndustry ? 'block' : 'none', height: '200px' }}>
    //         Industry DropDown
    //     </Box>
    // </Stack>
    (<Stack>
      <Stack
        sx={{
          gap: "5px",
        }}
      >
        {/* <Box sx={{ height: "200px", color: styles.primaryTextColor }}>
          {" "}
          DropDown Industry{" "}
        </Box> */}
        <Stack sx={{ paddingLeft: "25px", paddingRight: "17px", gap: "5px" }}>
          <Stack
            sx={
              {
                // marginBottom: "10px",
              }
            }
          >
            <Autocomplete
              className="auto-comp"
              multiple
              loading={isAnyIndustryLoader}
              loadingText="Searching..."
              freeSolo
              size="small"
              id="tags-outlined"
              options={top100Films}
              getOptionLabel={(option) => option.name}
              // defaultValue={defIndustry}
              value={
                defIndustryData.length === 0 && defIndustry.length === 0
                  ? defIndustry
                  : defIndustryData
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
                        {isAnyIndustryLoader ? (
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
                    defIndustryData.length === 0 && defIndustry.length === 0
                      ? "Search Industries..."
                      : ""
                  }
                />
              )}
              onInputChange={(_event, newInputValue) => {
                setIsAnyIndustryLoader(true);
                getSearchData(newInputValue);
              }}
              onChange={handleAutocompleteChange}
              renderOption={(props: object, option: any) => (
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
            {/* <CustomizedAutoComplete placeholder={"Search Industries..."} /> */}
          </Stack>
          {isAdvSetting ? (
            <Stack
              onClick={onClickAdvSetting}
              sx={{ display: "flex", flexDirection: "row", cursor: "pointer" }}
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
                Hide advanced Settings
              </Typography>
              <ArrowDropUpIcon sx={{ color: styles.primaryTextColor }} />
            </Stack>
          ) : (
            <Stack
              onClick={onClickAdvSetting}
              sx={{ display: "flex", flexDirection: "row", cursor: "pointer" }}
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
                Advanced settings
              </Typography>
              {isAdvSetting ? (
                <ArrowDropUpIcon sx={{ color: styles.primaryTextColor }} />
              ) : (
                <ArrowDropDownIcon sx={{ color: styles.primaryTextColor }} />
              )}
            </Stack>
          )}
          {isAdvSetting && (
            <>
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
                  onClick={onClickIsNotAnyOf}
                  sx={{
                    border: "1px solid",
                    borderRadius: "4px 0px 0px 4px",
                    borderColor: isNotAnyOf
                      ? "transparent"
                      : styles.borderColor2,
                    backgroundColor: isNotAnyOf ? "#146EF6" : "#ffffff",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    flexGrow: "1",
                    height: "24.2px",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily:
                        'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                      fontSize: "12px",
                      fontWeight: "600",
                      color: isNotAnyOf ? "#ffffff" : styles.defaultTextColor,
                    }}
                  >
                    Is not any of
                  </Typography>
                </Stack>
                <Stack
                  onClick={onClickIsKnown}
                  sx={{
                    border: "1px solid",
                    borderColor: isKnown ? "transparent" : styles.borderColor2,
                    backgroundColor: isKnown ? "#146EF6" : "#ffffff",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",

                    flexGrow: "1",
                    height: "24.2px",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily:
                        'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                      fontSize: "12px",
                      fontWeight: "600",
                      color: isKnown ? "#ffffff" : styles.defaultTextColor,
                    }}
                  >
                    Is Known
                  </Typography>
                </Stack>
                <Stack
                  onClick={onClickIsUnKnown}
                  sx={{
                    border: "1px solid",
                    borderRadius: "0px 4px 4px 0px",
                    borderColor: isUnKnown
                      ? "transparent"
                      : styles.borderColor2,
                    backgroundColor: isUnKnown ? "#146EF6" : "#ffffff",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",

                    flexGrow: "1",
                    height: "24.2px",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily:
                        'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                      fontSize: "12px",
                      fontWeight: "600",
                      color: isUnKnown ? "#ffffff" : styles.defaultTextColor,
                    }}
                  >
                    Is Unknown
                  </Typography>
                </Stack>
              </Stack>
              <Stack
                sx={
                  {
                    // marginBottom: "10px",
                  }
                }
              >
                {isNotAnyOf && (
                  <Autocomplete
                    className="auto-comp"
                    multiple
                    freeSolo
                    size="small"
                    loading={isNotIndustryLoader}
                    loadingText="Searching..."
                    id="tags-outlined"
                    options={top100Films}
                    getOptionLabel={(option) => option.name}
                    // defaultValue={[]}
                    value={
                      defNotIndustryData.length === 0 &&
                      defNotIndustry.length === 0
                        ? defNotIndustry
                        : defNotIndustryData
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
                              {isNotIndustryLoader ? (
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
                          defNotIndustryData.length === 0 &&
                          defNotIndustry.length === 0
                            ? "Search Industries to exclude..."
                            : ""
                        }
                      />
                    )}
                    onInputChange={(_event, newInputValue) => {
                      setIsNotIndustryLoader(true);
                      getSearchData(newInputValue);
                    }}
                    onChange={handleExcludeAutocompleteChange}
                    renderOption={(props: object, option: any) => (
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
                )}

                {/* <CustomizedAutoComplete
                  placeholder={"Search Industries to exclude..."}
                /> */}
              </Stack>
            </>
          )}
        </Stack>
        <Stack
          onClick={onClickCompanyKeywords}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            "&:hover": {
              backgroundColor: styles.backGroundColorOnHover,
            },
            cursor: "pointer",
            height: "43.73px",
            paddingLeft: "25px",
            paddingRight: "17px",
            gap: "5px",

            borderTop: "1px solid",
            borderTopColor: styles.borderColor2,
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
            Company Keywords
          </Typography>
          {isCompanyKeywords ? (
            <ArrowDropUpIcon sx={{ color: styles.primaryTextColor }} />
          ) : (
            <ArrowDropDownIcon sx={{ color: styles.primaryTextColor }} />
          )}
        </Stack>
        {isCompanyKeywords && (
          <Stack
            sx={{
              paddingLeft: "25px",
              paddingRight: "17px",
              gap: "10px",
            }}
          >
            <Stack
              sx={{
                border: "1px solid",
                borderRadius: "5px",
                borderColor: isInclude
                  ? styles.borderColor1
                  : styles.borderColor2,
                "&:hover": {
                  borderColor: styles.borderColor1,
                },
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                padding: "1px",
                paddingBottom: isInclude ? "10px" : "1px",
              }}
            >
              <Stack
                sx={{
                  height: "38.18px",
                  paddingLeft: "12.3px",
                  // width: "100%",
                  backgroundColor: styles.backGroundColorOnHover,
                  "&:hover": {
                    backgroundColor: "#ffffff",
                  },
                  display: "flex",
                  flexDirection: "row",
                  gap: "5px",
                }}
              >
                <FormControlLabel
                  sx={{
                    paddingLeft: "5px",

                    flexGrow: "1",
                  }}
                  label={
                    <Stack
                      sx={{ display: "flex", flexDirection: "row", gap: "5px" }}
                    >
                      <Box
                        sx={{
                          color: isInclude
                            ? styles.blackcolor
                            : styles.lighTextColor,
                          fontSize: "14px",
                          fontWeight: "600",
                          fontFamily:
                            'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        }}
                      >
                        Include Keywords
                      </Box>
                      <BootstrapTooltip
                        title={`Keyword filters may slow down your search.
                        Note: By default, social media description and 
                        SEO description are not included because they
                        can be inaccurate. For example, a company that mentioned
                        "marketing" in its descriptions is not necessarily a 
                        marketing company.`}
                        placement="top">
                        <HelpOutlineIcon
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
                        defaultChecked
                        // checked={isInclude}
                        checkedIcon={
                          <BpCheckedIcon
                            // className="bp-icon"
                            style={{
                              borderColor: styles.primaryTextColor,
                            }}
                          />
                        }
                        icon={<BpIcon className="bp-icon" />}
                        onChange={onClickIsInclude}
                      />
                    </BpCheckboxContainer>
                  }
                />
              </Stack>
              {isInclude && (
                <>
                  <Stack
                    sx={{
                      paddingLeft: "12.3px",
                      paddingRight: "13.62px",
                      marginBottom: "12px",
                    }}
                  >
                    {/* <CustomizedAutoComplete placeholder={"e.g. Cloud, AWS"} /> */}
                    <Autocomplete
                      className="auto-comp"
                      multiple
                      freeSolo
                      size="small"
                      loading={isIncludeCompanyIndustryLoader}
                      loadingText="Searching..."
                      id="tags-outlined"
                      options={top100Films}
                      getOptionLabel={(option) => option.name}
                      // defaultValue={[]}
                      value={
                        defIncludeCompanyIndustryData.length === 0 &&
                        defIncludeCompanyIndustry.length === 0
                          ? defIncludeCompanyIndustry
                          : defIncludeCompanyIndustryData
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
                                {isIncludeCompanyIndustryLoader ? (
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
                            defIncludeCompanyIndustryData.length === 0 &&
                            defIncludeCompanyIndustry.length === 0
                              ? "Search companies to include..."
                              : ""
                          }
                        />
                      )}
                      onInputChange={(_event, newInputValue) => {
                        setIsIncludeCompanyIndustryLoader(true);
                        getSearchCompanyData(newInputValue);
                      }}
                      onChange={handleIncludeCompanyAutocompleteChange}
                      renderOption={(props: object, option: any) => (
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
                                {option.meta?.website}
                              </Typography>
                            </Stack>
                      )}
                      noOptionsText={null}
                    />
                  </Stack>
                  <Stack
                    sx={{ cursor: "pointer" }}
                    onClick={onClickIncludeAdvanced}
                  >
                    {isIncludeAdvanced ? (
                      <Stack
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          paddingLeft: "12.3px",
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
                          Hide Advanced
                        </Typography>
                        <ArrowDropUpIcon
                          sx={{ color: styles.primaryTextColor }}
                        />
                      </Stack>
                    ) : (
                      <Stack
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          paddingLeft: "12.3px",
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
                          Advanced
                        </Typography>
                        <ArrowDropDownIcon
                          sx={{ color: styles.primaryTextColor }}
                        />
                      </Stack>
                    )}
                  </Stack>
                  {isIncludeAdvanced && (
                    <>
                      <Typography
                        sx={{
                          fontFamily:
                            'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                          fontSize: "14px",
                          fontWeight: "600",
                          color: styles.defaultTextColor,
                          paddingLeft: "12.3px",
                          marginTop: "10px",
                          marginBottom: "10px",
                          paddingRight: "20px",
                          textAlign: "left",
                        }}
                      >
                        What kind of keywords would you like to search for?
                      </Typography>
                      <Stack sx={{ paddingLeft: "16.38px", gap: "15px" }}>
                        <Stack
                          sx={{
                            height: "17px",
                            // paddingLeft: "12.3px",
                            width: "100%",
                            // backgroundColor: styles.backGroundColorOnHover,
                            // "&:hover": {
                            //   backgroundColor: "#ffffff",
                            // },
                            display: "flex",
                            flexDirection: "row",
                            gap: "5px",
                          }}
                        >
                          <FormControlLabel
                            sx={{
                              paddingLeft: "5px",

                              flexGrow: "1",
                            }}
                            label={
                              <Stack
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  gap: "5px",
                                }}
                              >
                                <Box
                                  sx={{
                                    color: styles.blackcolor,
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    fontFamily:
                                      'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                  }}
                                >
                                  Company name
                                </Box>
                              </Stack>
                            }
                            control={
                              <BpCheckboxContainer>
                                <Checkbox
                                  className="bp-checkbox"
                                  disableRipple
                                  color="default"
                                  checkedIcon={
                                    <BpCheckedIcon
                                    // className="bp-icon"
                                    />
                                  }
                                  icon={<BpIcon className="bp-icon" />}
                                />
                              </BpCheckboxContainer>
                            }
                          />
                        </Stack>
                        <Stack
                          sx={{
                            height: "17px",
                            // paddingLeft: "12.3px",
                            width: "100%",
                            // backgroundColor: styles.backGroundColorOnHover,
                            // "&:hover": {
                            //   backgroundColor: "#ffffff",
                            // },
                            display: "flex",
                            flexDirection: "row",
                            gap: "5px",
                          }}
                        >
                          <FormControlLabel
                            sx={{
                              paddingLeft: "5px",

                              flexGrow: "1",
                            }}
                            label={
                              <Stack
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  gap: "5px",
                                }}
                              >
                                <Box
                                  sx={{
                                    color: styles.blackcolor,
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    fontFamily:
                                      'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                  }}
                                >
                                  Social media tags
                                </Box>
                                <BootstrapTooltip
                                  title={`The industry, subindustries, and specialties listed on a company's 
                                    social media profiles`}
                                  placement="top"
                                >
                                  <HelpOutlineIcon
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
                                  checkedIcon={
                                    <BpCheckedIcon
                                    // className="bp-icon"
                                    />
                                  }
                                  icon={<BpIcon className="bp-icon" />}
                                />
                              </BpCheckboxContainer>
                            }
                          />
                        </Stack>
                        <Stack
                          sx={{
                            height: "17px",
                            // paddingLeft: "12.3px",
                            width: "100%",
                            // backgroundColor: styles.backGroundColorOnHover,
                            // "&:hover": {
                            //   backgroundColor: "#ffffff",
                            // },
                            display: "flex",
                            flexDirection: "row",
                            gap: "5px",
                          }}
                        >
                          <FormControlLabel
                            sx={{
                              paddingLeft: "5px",

                              flexGrow: "1",
                            }}
                            label={
                              <Stack
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  gap: "5px",
                                }}
                              >
                                <Box
                                  sx={{
                                    color: styles.blackcolor,
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    fontFamily:
                                      'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                  }}
                                >
                                  Social media discription
                                </Box>
                                <BootstrapTooltip
                                  title={`The words a company uses to describe itself on its social media
                                  profiles.This may not be accurate.`}
                                  placement="top"
                                >
                                  <HelpOutlineIcon
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
                                  checkedIcon={
                                    <BpCheckedIcon
                                    //  className="bp-icon"
                                    />
                                  }
                                  icon={<BpIcon className="bp-icon" />}
                                />
                              </BpCheckboxContainer>
                            }
                          />
                        </Stack>
                        <Stack
                          sx={{
                            height: "17px",
                            // paddingLeft: "12.3px",
                            width: "100%",
                            // backgroundColor: styles.backGroundColorOnHover,
                            // "&:hover": {
                            //   backgroundColor: "#ffffff",
                            // },
                            display: "flex",
                            flexDirection: "row",
                            gap: "5px",
                          }}
                        >
                          <FormControlLabel
                            sx={{
                              paddingLeft: "5px",

                              flexGrow: "1",
                            }}
                            label={
                              <Stack
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  gap: "5px",
                                }}
                              >
                                <Box
                                  sx={{
                                    color: styles.blackcolor,
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    fontFamily:
                                      'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                  }}
                                >
                                  SEO discription
                                </Box>
                                <BootstrapTooltip
                                  title={`The SEO description the company puts up for search
                                    engines such as Google and Bing. This may not be accurate.`}
                                  placement="top"
                                >
                                  <HelpOutlineIcon
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
                                  checkedIcon={
                                    <BpCheckedIcon
                                    // className="bp-icon"
                                    />
                                  }
                                  icon={<BpIcon className="bp-icon" />}
                                />
                              </BpCheckboxContainer>
                            }
                          />
                        </Stack>
                      </Stack>
                    </>
                  )}
                </>
              )}
            </Stack>
            <Stack
              sx={{
                border: "1px solid",
                borderRadius: "5px",
                borderColor: isAll ? styles.borderColor1 : styles.borderColor2,
                "&:hover": {
                  borderColor: styles.borderColor1,
                },
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                padding: "1px",
                paddingBottom: isAll ? "10px" : "1px",
              }}
            >
              <Stack
                sx={{
                  height: "38.18px",
                  paddingLeft: "12.3px",
                  // width: "100%",
                  backgroundColor: styles.backGroundColorOnHover,
                  "&:hover": {
                    backgroundColor: "#ffffff",
                  },
                  display: "flex",
                  flexDirection: "row",
                  gap: "5px",
                }}
              >
                <FormControlLabel
                  sx={{
                    paddingLeft: "5px",

                    flexGrow: "1",
                  }}
                  label={
                    <Stack
                      sx={{ display: "flex", flexDirection: "row", gap: "5px" }}
                    >
                      <Box
                        sx={{
                          color: isAll
                            ? styles.blackcolor
                            : styles.lighTextColor,
                          fontSize: "14px",
                          fontWeight: "600",
                          fontFamily:
                            'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        }}
                      >
                        Include All
                      </Box>
                      <BootstrapTooltip
                        title={`Keyword filters may slow down your search.
                      Note: By default, social media description and 
                      SEO description are not included because they
                      can be inaccurate. For example, a company that mentioned
                      "marketing" in its descriptions is not necessarily a 
                      marketing company.`}
                        placement="top">
                        <HelpOutlineIcon
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
                        checked={isAll}
                        checkedIcon={
                          <BpCheckedIcon
                            // className="bp-icon"
                            style={{
                              borderColor: styles.primaryTextColor,
                            }}
                          />
                        }
                        icon={<BpIcon className="bp-icon" />}
                        onChange={onClickIsAll}
                      />
                    </BpCheckboxContainer>
                  }
                />
              </Stack>
              {isAll && (
                <>
                  <Stack
                    sx={{
                      paddingLeft: "12.3px",
                      paddingRight: "13.62px",
                      marginBottom: "12px",
                    }}
                  >
                    <Autocomplete
                      className="auto-comp"
                      multiple
                      freeSolo
                      size="small"
                      loading={isIncludeAllCompanyIndustryLoader}
                      loadingText="Searching..."
                      id="tags-outlined"
                      options={top100Films}
                      getOptionLabel={(option) => option.name}
                      // defaultValue={[]}
                      value={
                        defIncludeAllCompanyIndustryData.length === 0 &&
                        defIncludeAllCompanyIndustry.length === 0
                          ? defIncludeAllCompanyIndustry
                          : defIncludeAllCompanyIndustryData
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
                                {isIncludeAllCompanyIndustryLoader ? (
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
                            defIncludeAllCompanyIndustryData.length === 0 &&
                            defIncludeAllCompanyIndustry.length === 0
                              ? "Search companies to include all..."
                              : ""
                          }
                        />
                      )}
                      onInputChange={(_event, newInputValue) => {
                        setIsIncludeAllCompanyIndustryLoader(true);
                        getSearchCompanyData(newInputValue);
                      }}
                      onChange={handleIncludeAllCompanyAutocompleteChange}
                      renderOption={(props: object, option: any) => (
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
                      noOptionsText={null}
                    />
                  </Stack>
                  <Stack
                    sx={{ cursor: "pointer" }}
                    onClick={onClickAllAdvanced}
                  >
                    {isAllAdvanced ? (
                      <Stack
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          paddingLeft: "12.3px",
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
                          Hide Advanced
                        </Typography>
                        <ArrowDropUpIcon
                          sx={{ color: styles.primaryTextColor }}
                        />
                      </Stack>
                    ) : (
                      <Stack
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          paddingLeft: "12.3px",
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
                          Advanced
                        </Typography>
                        <ArrowDropDownIcon
                          sx={{ color: styles.primaryTextColor }}
                        />
                      </Stack>
                    )}
                  </Stack>
                  {isAllAdvanced && (
                    <>
                      <Typography
                        sx={{
                          fontFamily:
                            'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                          fontSize: "14px",
                          fontWeight: "600",
                          color: styles.defaultTextColor,
                          paddingLeft: "12.3px",
                          marginTop: "10px",
                          marginBottom: "10px",
                          paddingRight: "20px",
                          textAlign: "left",
                        }}
                      >
                        What kind of keywords would you like to search for?
                      </Typography>
                      <Stack sx={{ paddingLeft: "16.38px", gap: "15px" }}>
                        <Stack
                          sx={{
                            height: "17px",
                            // paddingLeft: "12.3px",
                            width: "100%",
                            // backgroundColor: styles.backGroundColorOnHover,
                            // "&:hover": {
                            //   backgroundColor: "#ffffff",
                            // },
                            display: "flex",
                            flexDirection: "row",
                            gap: "5px",
                          }}
                        >
                          <FormControlLabel
                            sx={{
                              paddingLeft: "5px",

                              flexGrow: "1",
                            }}
                            label={
                              <Stack
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  gap: "5px",
                                }}
                              >
                                <Box
                                  sx={{
                                    color: styles.blackcolor,
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    fontFamily:
                                      'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                  }}
                                >
                                  Company name
                                </Box>
                              </Stack>
                            }
                            control={
                              <BpCheckboxContainer>
                                <Checkbox
                                  className="bp-checkbox"
                                  disableRipple
                                  color="default"
                                  checkedIcon={
                                    <BpCheckedIcon
                                      // className="bp-icon"
                                      style={{
                                        borderColor: styles.primaryTextColor,
                                      }}
                                    />
                                  }
                                  icon={<BpIcon className="bp-icon" />}
                                />
                              </BpCheckboxContainer>
                            }
                          />
                        </Stack>
                        <Stack
                          sx={{
                            height: "17px",
                            // paddingLeft: "12.3px",
                            width: "100%",
                            // backgroundColor: styles.backGroundColorOnHover,
                            // "&:hover": {
                            //   backgroundColor: "#ffffff",
                            // },
                            display: "flex",
                            flexDirection: "row",
                            gap: "5px",
                          }}
                        >
                          <FormControlLabel
                            sx={{
                              paddingLeft: "5px",

                              flexGrow: "1",
                            }}
                            label={
                              <Stack
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  gap: "5px",
                                }}
                              >
                                <Box
                                  sx={{
                                    color: styles.blackcolor,
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    fontFamily:
                                      'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                  }}
                                >
                                  Social media tags
                                </Box>
                                <BootstrapTooltip
                                  title={`The industry, subindustries, and specialties listed on a company's 
                                    social media profiles`}
                                  placement="top"
                                >
                                  <HelpOutlineIcon
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
                                  checkedIcon={
                                    <BpCheckedIcon
                                      // className="bp-icon"
                                      style={{
                                        borderColor: styles.primaryTextColor,
                                      }}
                                    />
                                  }
                                  icon={<BpIcon className="bp-icon" />}
                                />
                              </BpCheckboxContainer>
                            }
                          />
                        </Stack>
                        <Stack
                          sx={{
                            height: "17px",
                            // paddingLeft: "12.3px",
                            width: "100%",
                            // backgroundColor: styles.backGroundColorOnHover,
                            // "&:hover": {
                            //   backgroundColor: "#ffffff",
                            // },
                            display: "flex",
                            flexDirection: "row",
                            gap: "5px",
                          }}
                        >
                          <FormControlLabel
                            sx={{
                              paddingLeft: "5px",

                              flexGrow: "1",
                            }}
                            label={
                              <Stack
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  gap: "5px",
                                }}
                              >
                                <Box
                                  sx={{
                                    color: styles.blackcolor,
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    fontFamily:
                                      'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                  }}
                                >
                                  Social media discription
                                </Box>
                                <BootstrapTooltip
                                  title={`The words a company uses to describe itself on its social media
                                  profiles.This may not be accurate.`}
                                  placement="top"
                                >
                                  <HelpOutlineIcon
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
                                  checkedIcon={
                                    <BpCheckedIcon
                                      // className="bp-icon"
                                      style={{
                                        borderColor: styles.primaryTextColor,
                                      }}
                                    />
                                  }
                                  icon={<BpIcon className="bp-icon" />}
                                />
                              </BpCheckboxContainer>
                            }
                          />
                        </Stack>
                        <Stack
                          sx={{
                            height: "17px",
                            // paddingLeft: "12.3px",
                            width: "100%",
                            // backgroundColor: styles.backGroundColorOnHover,
                            // "&:hover": {
                            //   backgroundColor: "#ffffff",
                            // },
                            display: "flex",
                            flexDirection: "row",
                            gap: "5px",
                          }}
                        >
                          <FormControlLabel
                            sx={{
                              paddingLeft: "5px",

                              flexGrow: "1",
                            }}
                            label={
                              <Stack
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  gap: "5px",
                                }}
                              >
                                <Box
                                  sx={{
                                    color: styles.blackcolor,
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    fontFamily:
                                      'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                  }}
                                >
                                  SEO discription
                                </Box>
                                <BootstrapTooltip
                                  title={`The SEO description the company puts up for search
                                  engines such as Google and Bing. This may not be accurate.`}
                                  placement="top"
                                >
                                  <HelpOutlineIcon
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
                                  checkedIcon={
                                    <BpCheckedIcon
                                      // className="bp-icon"
                                      style={{
                                        borderColor: styles.primaryTextColor,
                                      }}
                                    />
                                  }
                                  icon={<BpIcon className="bp-icon" />}
                                />
                              </BpCheckboxContainer>
                            }
                          />
                        </Stack>
                      </Stack>
                    </>
                  )}
                </>
              )}
            </Stack>
            <Stack
              sx={{
                border: "1px solid",
                borderRadius: "5px",
                borderColor: isExclude
                  ? styles.borderColor1
                  : styles.borderColor2,
                "&:hover": {
                  borderColor: styles.borderColor1,
                },
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                padding: "1px",
                paddingBottom: isExclude ? "10px" : "1px",
                marginBottom: "10px",
              }}
            >
              <Stack
                sx={{
                  height: "38.18px",
                  paddingLeft: "12.3px",
                  // width: "100%",
                  backgroundColor: styles.backGroundColorOnHover,
                  "&:hover": {
                    backgroundColor: "#ffffff",
                  },
                  display: "flex",
                  flexDirection: "row",
                  gap: "5px",
                }}
              >
                <FormControlLabel
                  sx={{
                    paddingLeft: "5px",

                    flexGrow: "1",
                  }}
                  label={
                    <Stack
                      sx={{ display: "flex", flexDirection: "row", gap: "5px" }}
                    >
                      <Box
                        sx={{
                          color: isExclude
                            ? styles.blackcolor
                            : styles.lighTextColor,
                          fontSize: "14px",
                          fontWeight: "600",
                          fontFamily:
                            'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        }}
                      >
                        Exclude keywords
                      </Box>
                      <BootstrapTooltip
                        title={`Keyword filters may slow down your search.`}
                        placement="top">
                        <HelpOutlineIcon
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
                        checked={isExclude}
                        checkedIcon={
                          <BpCheckedIcon
                            // className="bp-icon"
                            style={{
                              borderColor: styles.primaryTextColor,
                            }}
                          />
                        }
                        icon={<BpIcon className="bp-icon" />}
                        onChange={onClickIsExclude}
                      />
                    </BpCheckboxContainer>
                  }
                />
              </Stack>
              {isExclude && (
                <>
                  <Stack
                    sx={{
                      paddingLeft: "12.3px",
                      paddingRight: "13.62px",
                      marginBottom: "12px",
                    }}
                  >
                    <Autocomplete
                      className="auto-comp"
                      multiple
                      freeSolo
                      size="small"
                      loading={isExcludeCompanyIndustryLoader}
                      loadingText="Searching..."
                      id="tags-outlined"
                      options={top100Films}
                      getOptionLabel={(option) => option.name}
                      // defaultValue={[]}
                      value={
                        defExcludeCompanyIndustryData.length === 0 &&
                        defExcludeCompanyIndustry.length === 0
                          ? defExcludeCompanyIndustry
                          : defExcludeCompanyIndustryData
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
                                {isExcludeCompanyIndustryLoader ? (
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
                            defExcludeCompanyIndustryData.length === 0 &&
                            defExcludeCompanyIndustry.length === 0
                              ? "Search companies to exclude..."
                              : ""
                          }
                        />
                      )}
                      onInputChange={(_event, newInputValue) => {
                        setIsExcludeCompanyIndustryLoader(true);
                        getSearchCompanyData(newInputValue);
                      }}
                      onChange={handleExcludeCompanyAutocompleteChange}
                      renderOption={(props: object, option: any) => (
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
                      noOptionsText={null}
                    />
                  </Stack>
                  <Stack
                    sx={{ cursor: "pointer" }}
                    onClick={onClickExcludeAdvanced}
                  >
                    {isExcludeAdvanced ? (
                      <Stack
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          paddingLeft: "12.3px",
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
                          Hide Advanced
                        </Typography>
                        <ArrowDropUpIcon
                          sx={{ color: styles.primaryTextColor }}
                        />
                      </Stack>
                    ) : (
                      <Stack
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          paddingLeft: "12.3px",
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
                          Advanced
                        </Typography>
                        <ArrowDropDownIcon
                          sx={{ color: styles.primaryTextColor }}
                        />
                      </Stack>
                    )}
                  </Stack>
                  {isExcludeAdvanced && (
                    <>
                      <Typography
                        sx={{
                          fontFamily:
                            'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                          fontSize: "14px",
                          fontWeight: "600",
                          color: styles.defaultTextColor,
                          paddingLeft: "12.3px",
                          marginTop: "10px",
                          marginBottom: "10px",
                          paddingRight: "20px",
                          textAlign: "left",
                        }}
                      >
                        What kind of keywords would you like to search for?
                      </Typography>
                      <Stack sx={{ paddingLeft: "16.38px", gap: "15px" }}>
                        <Stack
                          sx={{
                            height: "17px",
                            // paddingLeft: "12.3px",
                            width: "100%",
                            // backgroundColor: styles.backGroundColorOnHover,
                            // "&:hover": {
                            //   backgroundColor: "#ffffff",
                            // },
                            display: "flex",
                            flexDirection: "row",
                            gap: "5px",
                          }}
                        >
                          <FormControlLabel
                            sx={{
                              paddingLeft: "5px",

                              flexGrow: "1",
                            }}
                            label={
                              <Stack
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  gap: "5px",
                                }}
                              >
                                <Box
                                  sx={{
                                    color: styles.blackcolor,
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    fontFamily:
                                      'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                  }}
                                >
                                  Company name
                                </Box>
                              </Stack>
                            }
                            control={
                              <BpCheckboxContainer>
                                <Checkbox
                                  className="bp-checkbox"
                                  disableRipple
                                  color="default"
                                  checkedIcon={
                                    <BpCheckedIcon
                                      // className="bp-icon"
                                      style={{
                                        borderColor: styles.primaryTextColor,
                                      }}
                                    />
                                  }
                                  icon={<BpIcon className="bp-icon" />}
                                />
                              </BpCheckboxContainer>
                            }
                          />
                        </Stack>
                        <Stack
                          sx={{
                            height: "17px",
                            // paddingLeft: "12.3px",
                            width: "100%",
                            // backgroundColor: styles.backGroundColorOnHover,
                            // "&:hover": {
                            //   backgroundColor: "#ffffff",
                            // },
                            display: "flex",
                            flexDirection: "row",
                            gap: "5px",
                          }}
                        >
                          <FormControlLabel
                            sx={{
                              paddingLeft: "5px",

                              flexGrow: "1",
                            }}
                            label={
                              <Stack
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  gap: "5px",
                                }}
                              >
                                <Box
                                  sx={{
                                    color: styles.blackcolor,
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    fontFamily:
                                      'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                  }}
                                >
                                  Social media tags
                                </Box>
                                <BootstrapTooltip
                                  title={`The industry, subindustries, and specialties listed on a company's 
                                    social media profiles`}
                                  placement="top"
                                >
                                  <HelpOutlineIcon
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
                                  checkedIcon={
                                    <BpCheckedIcon
                                      // className="bp-icon"
                                      style={{
                                        borderColor: styles.primaryTextColor,
                                      }}
                                    />
                                  }
                                  icon={<BpIcon className="bp-icon" />}
                                />
                              </BpCheckboxContainer>
                            }
                          />
                        </Stack>
                        <Stack
                          sx={{
                            height: "17px",
                            // paddingLeft: "12.3px",
                            width: "100%",
                            // backgroundColor: styles.backGroundColorOnHover,
                            // "&:hover": {
                            //   backgroundColor: "#ffffff",
                            // },
                            display: "flex",
                            flexDirection: "row",
                            gap: "5px",
                          }}
                        >
                          <FormControlLabel
                            sx={{
                              paddingLeft: "5px",

                              flexGrow: "1",
                            }}
                            label={
                              <Stack
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  gap: "5px",
                                }}
                              >
                                <Box
                                  sx={{
                                    color: styles.blackcolor,
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    fontFamily:
                                      'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                  }}
                                >
                                  Social media discription
                                </Box>
                                <BootstrapTooltip
                                  title={`The words a company uses to describe itself on its social media
                                  profiles.This may not be accurate.`}
                                  placement="top"
                                >
                                  <HelpOutlineIcon
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
                                  checkedIcon={
                                    <BpCheckedIcon
                                      // className="bp-icon"
                                      style={{
                                        borderColor: styles.primaryTextColor,
                                      }}
                                    />
                                  }
                                  icon={<BpIcon className="bp-icon" />}
                                />
                              </BpCheckboxContainer>
                            }
                          />
                        </Stack>
                        <Stack
                          sx={{
                            height: "17px",
                            // paddingLeft: "12.3px",
                            width: "100%",
                            // backgroundColor: styles.backGroundColorOnHover,
                            // "&:hover": {
                            //   backgroundColor: "#ffffff",
                            // },
                            display: "flex",
                            flexDirection: "row",
                            gap: "5px",
                          }}
                        >
                          <FormControlLabel
                            sx={{
                              paddingLeft: "5px",

                              flexGrow: "1",
                            }}
                            label={
                              <Stack
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  gap: "5px",
                                }}
                              >
                                <Box
                                  sx={{
                                    color: styles.blackcolor,
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    fontFamily:
                                      'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                  }}
                                >
                                  SEO discription
                                </Box>
                                <BootstrapTooltip
                                  title={`The SEO description the company puts up for search
                                  engines such as Google and Bing. This may not be accurate.`}
                                  placement="top"
                                >
                                  <HelpOutlineIcon
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
                                  checkedIcon={
                                    <BpCheckedIcon
                                      // className="bp-icon"
                                      style={{
                                        borderColor: styles.primaryTextColor,
                                      }}
                                    />
                                  }
                                  icon={<BpIcon className="bp-icon" />}
                                />
                              </BpCheckboxContainer>
                            }
                          />
                        </Stack>
                      </Stack>
                    </>
                  )}
                </>
              )}
            </Stack>
          </Stack>
        )}
      </Stack>
    </Stack>)
  );
};
export default IndustryModal;
