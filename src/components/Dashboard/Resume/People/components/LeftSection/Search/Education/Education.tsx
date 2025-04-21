import {  useContext } from "react";
import  {React, useState,  useRef } from "../../../../../../../../shared/modules/React";
import {
  Autocomplete,
  // Chip,
  // Box,
  // Checkbox,
  // FormControlLabel,
  // Stack,
  // TextField,
  // Typography,
  debounce,
  InputBase,
  styled,
} from "@mui/material";
import { Stack} from '../../../../../../../../shared/modules/MaterialImports/Stack';
import {Typography} from '../../../../../../../../shared/modules/MaterialImports/Typography';
import {TextField,FormControlLabel} from '../../../../../../../../shared/modules/MaterialImports/FormInputs';
import {Checkbox} from '../../../../../../../../shared/modules/MaterialImports/FormElements';
import { Box} from '../../../../../../../../shared/modules/MaterialImports/Box';
import {CircularProgress} from '../../../../../../../../shared/modules/MaterialImports/CircularProgress';
import { Store } from "../../../DataLabs/DataLabs";
import styles from "./../../../../shared/config/variables.module.scss";
import apiService from "../../../../shared/api/apiService";
import moment from "moment";

const BootstrapInput = styled(InputBase)(() => ({
  "& .MuiInputBase-input": {
    position: "relative",
    backgroundColor: "transparent",
    fontSize: "14px",
    fontFamily:
      'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
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

const Education = () => {
  const [isDegree, setIsDegree] = React.useState(false);
  const onClickIsDegree = () => {
    setIsDegree(!isDegree);
    setSearchData((prevSearchData: any) => ({
      ...prevSearchData,
      eduDegreeList: [],
      education: {
        ...searchData.education,
        degreeIn: [],
      },
    }));
  };

  const [isMajor, setIsMajor] = React.useState(false);
  const onClickIsMajor = () => {
    setIsMajor(!isMajor);
    setSearchData((prevSearchData: any) => ({
      ...prevSearchData,
      eduMajorList: [],
      education: {
        ...searchData.education,
        majorIn: [],
      },
    }));
  };

  const [isSchool, setIsSchool] = React.useState(false);
  const onClickIsSchool = () => {
    setIsSchool(!isSchool);
    setSearchData((prevSearchData: any) => ({
      ...prevSearchData,
      eduSchoolList: [],
      education: {
        ...searchData.education,
        schoolIn: [],
      },
    }));
  };

  const [isYearOfEducation, setIsYearOfEducation] = React.useState(false);
  const onClickIsYearOfEducation = () => {
    setIsYearOfEducation(!isYearOfEducation);
    setFromToYearEduValidation(false)
    setToFromYearEduValidation(false)
    setSearchData((prevSearchData: any) => ({
      ...prevSearchData,

      education: {
        ...searchData.education,

        educationStartYear: "",
        educationEndYear: "",
      },
      isFromYearValidation: false,
      isToYearValidation: false,
    }));
  };

  const [searchData, setSearchData] = useContext(Store);

  const [isDegreeLoader, setIsDegreeLoader] = useState(false);
  const [isMajorLoader, setIsMajorLoader] = useState(false);
  const [isSchoolLoader, setIsSchoolLoader] = useState(false);
  const [toYearEduCurrentValidation, setToYearEduCurrentValidation] =
    useState(false);

    const [fromYearEduCurrentValidation, setFromYearEduCurrentValidation] =
      useState(false);
    
    const [fromToYearEduValidation, setFromToYearEduValidation] =
      useState(false);

    const [toFromYearEduValidation, setToFromYearEduValidation] =
      useState(false);

  const [startYear, setStartYear] = useState(
    searchData.education.educationStartYear
  );
  const [endYear, setEndYear] = useState(searchData.education.educationEndYear);

  const handleChangeStartYear = (event: any) => {
    
    const value = event.target.value;
    const stringValue = `${event.target.value}`
    if (stringValue.length === 4) {
      const endDate = moment(stringValue);

      const today = moment();

      if (endDate.isAfter(today)) {
        setFromYearEduCurrentValidation(true);
        
      } else {
        setFromYearEduCurrentValidation(false);
        
        if (endYear) {
          if (moment(endYear).isAfter(moment(stringValue)) || moment(endYear).isSame(moment(stringValue))) {
            setFromToYearEduValidation(false);
            setSearchData((prevSearchData: any) => ({
              ...prevSearchData,
              isFromYearValidation: false,
            }));
            updateYearOfEducationIn(value, endYear);
          } else {
            setFromToYearEduValidation(true);
            setSearchData((prevSearchData: any) => ({
              ...prevSearchData,
              isFromYearValidation: true,
            }));
          }
        } else {
          updateYearOfEducationIn(value, endYear);
        }
        
      }
    }

    if (stringValue.length <= 4) {
      setStartYear(value);
    }

    if (stringValue.length < 4) {
      setFromToYearEduValidation(false);
      setToFromYearEduValidation(false);
      setFromYearEduCurrentValidation(false);
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        isFromYearValidation: false,
        isToYearValidation: false,
      }));
    }
    
  };

  const handleChangeEndYear = (event: any) => {
    const value = event.target.value;
    const stringValue = `${event.target.value}`
    // let endYearCurrent = 0
    if (stringValue.length === 4) {
      // endYearCurrent = event.target.value
      const endDate = moment(stringValue);

      const today = moment();

      if (endDate.isAfter(today)) {
        setToYearEduCurrentValidation(true);
      } else {
        setToYearEduCurrentValidation(false);
        // updateYearOfEducationIn(startYear, value);
        if (startYear) {
          if (
            moment(startYear).isBefore(moment(stringValue)) ||
            moment(startYear).isSame(moment(stringValue))
          ) {
            setToFromYearEduValidation(false);
            setSearchData((prevSearchData: any) => ({
              ...prevSearchData,
              isToYearValidation: false,
            }));
            updateYearOfEducationIn(startYear, value);
          } else {
            if (!fromYearEduCurrentValidation) {
              setToFromYearEduValidation(true);
              setSearchData((prevSearchData: any) => ({
                ...prevSearchData,
                isToYearValidation: true,
              }));
            } 
          }
        } else {
          updateYearOfEducationIn(startYear, value);
        }


        

      }
    }

    

    if (stringValue.length <= 4) {
      setEndYear(value);
      
    }

    if (stringValue.length < 4) {
      setToFromYearEduValidation(false);
      setFromToYearEduValidation(false);
      setToYearEduCurrentValidation(false);
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        isFromYearValidation: false,
        isToYearValidation: false,
      }));
    }
  };

  const updateYearOfEducationIn = (start: any, end: any) => {
    if (start && end) {
      // const sortedYears = start < end ? [start, end] : [end, start];
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        education: {
          ...searchData.education,
          educationStartYear: start,
          educationEndYear: end,
        },
      }));
    } else if (start) {
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        education: {
          ...searchData.education,
          educationStartYear: start,
        },
      }));
    } else if (end) {
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        education: {
          ...searchData.education,
          educationEndYear: end,
        },
      }));
    } else {
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        education: {
          ...searchData.education,
          educationStartYear: "",
          educationEndYear: "",
        },
      }));
    }
  };

  const handleKeyDownYear = (event: any) => {
    const numericKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const specialKeys = ["Backspace", "Delete", "Tab"];

    if (!numericKeys.includes(event.key) && !specialKeys.includes(event.key)) {
      event.preventDefault();
    }
  };

  // const onChangeDegree = (e: any) => {
  //   const value = e.target.value;
  //   console.log("value", value);
  //   // setDefDegree(value);

  //   if (e.key === "Enter") {
  //     setSearchData((prevSearchData: any) => ({
  //       ...prevSearchData,
  //       education: {
  //         ...searchData.education,
  //         degreeIn: [...prevSearchData.education.degreeIn, value],
  //       },
  //     }));
  //   }
  // };

  // const deleteDegree = (option: any, index: any) => {
  //   console.log("options", option, index);
  //   searchData.education.degreeIn?.splice(index, 1);
  //   setSearchData((prevSearchData: any) => ({
  //     ...prevSearchData,
  //     education: {
  //       ...searchData.education,
  //       degreeIn: searchData.education.degreeIn,
  //     },
  //   }));
  // };

  // const onChangeSchool = (e: any) => {
  //   const value = e.target.value;
  //   console.log("value", value);
  //   // setDefSchool(value);

  //   if (e.key === "Enter") {
  //     setSearchData((prevSearchData: any) => ({
  //       ...prevSearchData,
  //       education: {
  //         ...searchData.education,
  //         schoolIn: [...prevSearchData.education.schoolIn, value],
  //       },
  //     }));
  //   }
  // };

  // const deleteSchool = (option: any, index: any) => {
  //   console.log("options", option, index);
  //   searchData.education.schoolIn?.splice(index, 1);
  //   setSearchData((prevSearchData: any) => ({
  //     ...prevSearchData,
  //     education: {
  //       ...searchData.education,
  //       schoolIn: searchData.education.schoolIn,
  //     },
  //   }));
  // };

  // const onChangeMajor = (e: any) => {
  //   const value = e.target.value;
  //   console.log("value", value);
  //   // setDefMajor(value);

  //   if (e.key === "Enter") {
  //     setSearchData((prevSearchData: any) => ({
  //       ...prevSearchData,
  //       education: {
  //         ...searchData.education,
  //         majorIn: [...prevSearchData.education.majorIn, value],
  //       },
  //     }));
  //   }
  // };

  // const deleteMajor = (option: any, index: any) => {
  //   console.log("options", option, index);
  //   searchData.education.majorIn?.splice(index, 1);
  //   setSearchData((prevSearchData: any) => ({
  //     ...prevSearchData,
  //     education: {
  //       ...searchData.education,
  //       majorIn: searchData.education.majorIn,
  //     },
  //   }));
  // };

  const defDegreeData = searchData.education.degreeIn.map((name: any) => {
    return { name: name, count: 999 };
  });
  const [defDegree, setDefDegree] = useState(defDegreeData);

  const [degreeSuggestions, setDegreeSuggestions] = useState<any[]>([]);

  const handleChangeDegree = (event: any, value: any) => {
    console.log("degree value", value);
    setSearchData((prevSearchData: any) => ({
      ...prevSearchData,
      eduDegreeList: value,
    }));
    if (value.length > 0) {
      const selectedOptions: any[] = [];

      value.forEach((option: any) => {
        const optionName = option && option.name ? option.name : option;
        if (!selectedOptions.includes(optionName)) {
          selectedOptions.push(optionName);
        }
      });

      const updatedDegreeTitles = searchData.education.degreeIn
        .filter((title: string) => !selectedOptions.includes(title))
        .concat(selectedOptions);

      if (event.key === "Enter" && value.length > 0) {
        setSearchData((prevSearchData: any) => ({
          ...prevSearchData,
          education: {
            ...searchData.education,
            degreeIn: updatedDegreeTitles,
          },
        }));
      }

      if (selectedOptions.length === updatedDegreeTitles.length) {
        setSearchData((prevSearchData: any) => ({
          ...prevSearchData,
          education: {
            ...searchData.education,
            degreeIn: updatedDegreeTitles,
          },
        }));
      } else {
        updatedDegreeTitles.shift();
        setSearchData((prevSearchData: any) => ({
          ...prevSearchData,
          education: {
            ...searchData.education,
            degreeIn: updatedDegreeTitles,
          },
        }));
      }
    } else {
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        education: {
          ...searchData.education,
          degreeIn: [],
        },
      }));
    }
  };

  let searchDegreeQuery = useRef<any>(null);

  const sendDegreeRequest = (str: string) => {
    searchDegreeQuery.current = str ? `${str}` : searchDegreeQuery.current;
    // send value to the backend
    console.log(str, "str", searchDegreeQuery.current);
    let dataToPass = {
      field: "degree",
      text: str ? str : searchDegreeQuery.current,
    };

    apiService
      .getSuggessions(dataToPass)
      .then((response: any) => {
        if (response.status === 200) {
          setIsDegreeLoader(false);
          if (response.data.data && response.data.data.length) {
            setDegreeSuggestions(response.data.data);
          }
        }
      })
      .catch((error: any) => {
        console.log("error", error);
      });
  };

  const debouncedSendRequestDegree = debounce(sendDegreeRequest, 500);

  const getDegreeData = (str: string) => {
    debouncedSendRequestDegree(str);
  };

  const defSchoolData = searchData.education.schoolIn.map((name: any) => {
    return { name: name, count: 999 };
  });
  const [defSchool, setDefSchool] = useState(defSchoolData);

  const [schoolSuggestions, setSchoolSuggestions] = useState<any[]>([]);

  const handleChangeSchool = (event: any, value: any) => {
    setSearchData((prevSearchData: any) => ({
      ...prevSearchData,
      eduSchoolList: value,
    }));
    if (value.length > 0) {
      const selectedOptions: any[] = [];

      value.forEach((option: any) => {
        const optionName = option && option.name ? option.name : option;
        if (!selectedOptions.includes(optionName)) {
          selectedOptions.push(optionName);
        }
      });

      const updatedSchoolTitles = searchData.education.schoolIn
        .filter((title: string) => !selectedOptions.includes(title))
        .concat(selectedOptions);

      if (event.key === "Enter" && value.length > 0) {
        setSearchData((prevSearchData: any) => ({
          ...prevSearchData,
          education: {
            ...searchData.education,
            schoolIn: updatedSchoolTitles,
          },
        }));
      }

      if (selectedOptions.length === updatedSchoolTitles.length) {
        setSearchData((prevSearchData: any) => ({
          ...prevSearchData,
          education: {
            ...searchData.education,
            schoolIn: updatedSchoolTitles,
          },
        }));
      } else {
        updatedSchoolTitles.shift();
        setSearchData((prevSearchData: any) => ({
          ...prevSearchData,
          education: {
            ...searchData.education,
            schoolIn: updatedSchoolTitles,
          },
        }));
      }
    } else {
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        education: {
          ...searchData.education,
          schoolIn: [],
        },
      }));
    }
  };

  let searchSchoolQuery = useRef<any>(null);

  const sendSchoolRequest = (str: string) => {
    searchSchoolQuery.current = str ? `${str}` : searchSchoolQuery.current;
    // send value to the backend
    console.log(str, "str", searchSchoolQuery.current);
    let dataToPass = {
      field: "school",
      text: str ? str : searchSchoolQuery.current,
    };

    apiService
      .getSuggessions(dataToPass)
      .then((response: any) => {
        if (response.status === 200) {
          setIsSchoolLoader(false);
          if (response.data.data && response.data.data.length) {
            console.log(response.data.data);
            setSchoolSuggestions(response.data.data);
          }
        }
      })
      .catch((error: any) => {
        console.log("error", error);
      });
  };

  const debouncedSendRequestSchool = debounce(sendSchoolRequest, 500);

  const getSchoolData = (str: string) => {
    debouncedSendRequestSchool(str);
  };

  const defMajorData = searchData.education.majorIn.map((name: any) => {
    return { name: name, count: 999 };
  });
  const [defMajor, setDefMajor] = useState(defMajorData);

  const [majorSuggestions, setMajorSuggestions] = useState<any[]>([]);

  const handleChangeMajor = (event: any, value: any) => {
    setSearchData((prevSearchData: any) => ({
      ...prevSearchData,
      eduMajorList: value,
    }));
    if (value.length > 0) {
      const selectedOptions: any[] = [];

      value.forEach((option: any) => {
        const optionName = option && option.name ? option.name : option;
        if (!selectedOptions.includes(optionName)) {
          selectedOptions.push(optionName);
        }
      });

      const updatedMajorTitles = searchData.education.majorIn
        .filter((title: string) => !selectedOptions.includes(title))
        .concat(selectedOptions);

      if (event.key === "Enter" && value.length > 0) {
        setSearchData((prevSearchData: any) => ({
          ...prevSearchData,
          education: {
            ...searchData.education,
            majorIn: updatedMajorTitles,
          },
        }));
      }

      if (selectedOptions.length === updatedMajorTitles.length) {
        setSearchData((prevSearchData: any) => ({
          ...prevSearchData,
          education: {
            ...searchData.education,
            majorIn: updatedMajorTitles,
          },
        }));
      } else {
        updatedMajorTitles.shift();
        setSearchData((prevSearchData: any) => ({
          ...prevSearchData,
          education: {
            ...searchData.education,
            majorIn: updatedMajorTitles,
          },
        }));
      }
    } else {
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        education: {
          ...searchData.education,
          majorIn: [],
        },
      }));
    }
  };

  let searchMajorQuery = useRef<any>(null);

  const sendMajorRequest = (str: string) => {
    searchMajorQuery.current = str ? `${str}` : searchMajorQuery.current;
    // send value to the backend
    console.log(str, "str", searchMajorQuery.current);
    let dataToPass = {
      field: "major",
      text: str ? str : searchMajorQuery.current,
    };

    apiService
      .getSuggessions(dataToPass)
      .then((response: any) => {
        if (response.status === 200) {
          setIsMajorLoader(false);
          if (response.data.data && response.data.data.length) {
            console.log(response.data.data);
            setMajorSuggestions(response.data.data);
          }
        }
      })
      .catch((error: any) => {
        console.log("error", error);
      });
  };

  const debouncedSendRequestMajor = debounce(sendMajorRequest, 500);

  const getMajorData = (str: string) => {
    debouncedSendRequestMajor(str);
  };

  React.useEffect(() => {
    if (searchData.eduDegreeList.length === 0) {
      setDefDegree([]);
    } else {
      setDefDegree(searchData.eduDegreeList);
    }
    if (searchData.eduSchoolList.length === 0) {
      setDefSchool([]);
    }
    if (searchData.eduMajorList.length === 0) {
      setDefMajor([]);
    }

    if (searchData.education.educationStartYear === "") {
      setStartYear("");
    } else {
      setIsYearOfEducation(true);
    }
    if (searchData.education.educationEndYear === "") {
      setEndYear("");
    } else {
      setIsYearOfEducation(true);
    }

    if (searchData.education.degreeIn.length >= 1) {
      setIsDegree(true);
    }

    if (searchData.education.schoolIn.length >= 1) {
      setIsSchool(true);
    }

    if (searchData.education.majorIn.length >= 1) {
      setIsMajor(true);
    }
  }, [searchData.education]);

  // console.log('zzzzzzzzzz', searchData.education)

  return (
    // <Stack p={1} className={selectBuy ? 'expanded' : ''} onClick={handleSelect}>
    //     <Box className='left-containers-align'>
    //         <Box className='left-containers-align'>
    //             <AssessmentOutlinedIcon className='list-icon' sx={{ fontSize: '24px', }} />
    //             <Typography component='p' className='menu-title'>Education</Typography>
    //         </Box>
    //         <Box className='left-containers-dropdown'>
    //             <ArrowDropDownIcon sx={{ display: selectBuy ? 'none' : 'block' }} />
    //             <ArrowDropUpIcon sx={{ display: selectBuy ? 'block' : 'none' }} />
    //         </Box>
    //     </Box>
    //     <Box sx={{ display: selectBuy ? 'block' : 'none', height: '200px' }}>
    //         Education DropDown
    //     </Box>
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
        <Box sx={{ color: styles.primaryTextColor }}>
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
                borderColor: isDegree
                  ? styles.borderColor1
                  : styles.borderColor2,
                "&:hover": {
                  borderColor: styles.borderColor1,
                },
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                padding: "1px",
                paddingBottom: isDegree ? "10px" : "1px",
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
                          color: isDegree
                            ? styles.blackcolor
                            : styles.lighTextColor,
                          fontSize: "14px",
                          fontWeight: "600",
                          fontFamily:
                            'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        }}
                      >
                        Degree
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
                        onChange={onClickIsDegree}
                        checked={
                          isDegree || searchData.eduDegreeList.length > 0
                        }
                      />
                    </BpCheckboxContainer>
                  }
                />
              </Stack>
              {isDegree && (
                <Box sx={{ color: styles.primaryTextColor, paddingX: "8px" }}>
                  {/* <Autocomplete
                    clearIcon={false}
                    options={[]}
                    freeSolo
                    size="small"
                    multiple
                    renderTags={(value, props) =>
                      value.map((option, index) => {
                        const { onDelete, ...otherProps } = props({ index });
                        return (
                          <Chip
                            onDelete={() => deleteDegree(option, index)}
                            label={option}
                            {...otherProps}
                          />
                        );
                      })
                    }
                    value={
                      defDegreeData?.length === 0 && defDegree?.length === 0
                        ? defDegree
                        : defDegreeData
                    }
                    renderInput={(params) => (
                      <TextField
                        onKeyDown={onChangeDegree}
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
                        placeholder={"Enter Degree..."}
                      />
                    )}
                  /> */}
                  <Autocomplete
                    noOptionsText={null}
                    disablePortal
                    freeSolo
                    multiple
                    size="small"
                    loading={isDegreeLoader}
                    loadingText="Searching..."
                    options={degreeSuggestions}
                    getOptionLabel={(option) => option.name}
                    onInputChange={(event, newInputValue) => {
                      setIsDegreeLoader(true);
                      getDegreeData(newInputValue);
                    }}
                    value={
                      defDegreeData?.length === 0 && defDegree?.length === 0
                        ? defDegree
                        : defDegreeData
                    }
                    onChange={handleChangeDegree}
                    // onKeyDown={(e: any) => handleKeyDownDegree(e)}
                    className="auto-comp"
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
                              {isDegreeLoader ? (
                                <CircularProgress
                                  sx={{ color: "#146EF6" }}
                                  size={14}
                                />
                              ) : null}
                              {params.InputProps.endAdornment}
                            </React.Fragment>
                          ),
                        }}
                        placeholder={"Enter Degree..."}
                      />
                    )}
                    renderOption={(
                      props: object,
                      option: any,
                      // state: object
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
                  />
                </Box>
              )}
            </Stack>
            <Stack
              sx={{
                border: "1px solid",
                borderRadius: "5px",
                borderColor: isMajor
                  ? styles.borderColor1
                  : styles.borderColor2,
                "&:hover": {
                  borderColor: styles.borderColor1,
                },
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                padding: "1px",
                paddingBottom: isMajor ? "10px" : "1px",
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
                          color: isMajor
                            ? styles.blackcolor
                            : styles.lighTextColor,
                          fontSize: "14px",
                          fontWeight: "600",
                          fontFamily:
                            'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        }}
                      >
                        Major
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
                        onChange={onClickIsMajor}
                        checked={isMajor}
                      />
                    </BpCheckboxContainer>
                  }
                />
              </Stack>
              {isMajor && (
                <Box sx={{ color: styles.primaryTextColor, paddingX: "8px" }}>
                  {/* <Autocomplete
                    clearIcon={false}
                    options={[]}
                    freeSolo
                    size="small"
                    multiple
                    renderTags={(value, props) =>
                      value.map((option, index) => {
                        const { onDelete, ...otherProps } = props({ index });
                        return (
                          <Chip
                            onDelete={() => deleteMajor(option, index)}
                            label={option}
                            {...otherProps}
                          />
                        );
                      })
                    }
                    value={
                      defMajorData?.length === 0 && defMajor?.length === 0
                        ? defMajor
                        : defMajorData
                    }
                    renderInput={(params) => (
                      <TextField
                        onKeyDown={onChangeMajor}
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
                        placeholder={"Enter Major..."}
                      />
                    )}
                  /> */}
                  <Autocomplete
                    noOptionsText={null}
                    disablePortal
                    freeSolo
                    multiple
                    size="small"
                    loading={isMajorLoader}
                    loadingText="Searching..."
                    options={majorSuggestions}
                    getOptionLabel={(option) => option.name}
                    onInputChange={(event, newInputValue) => {
                      setIsMajorLoader(true);
                      getMajorData(newInputValue);
                    }}
                    value={
                      defMajorData?.length === 0 && defMajor?.length === 0
                        ? defMajor
                        : defMajorData
                    }
                    onChange={handleChangeMajor}
                    // onKeyDown={(e: any) => handleKeyDownMajor(e)}
                    className="auto-comp"
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
                              {isMajorLoader ? (
                                <CircularProgress
                                  sx={{ color: "#146EF6" }}
                                  size={14}
                                />
                              ) : null}
                              {params.InputProps.endAdornment}
                            </React.Fragment>
                          ),
                        }}
                        placeholder={"Enter Major..."}
                      />
                    )}
                    renderOption={(
                      props: object,
                      option: any,
                      // state: object
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
                  />
                </Box>
              )}
            </Stack>
            <Stack
              sx={{
                border: "1px solid",
                borderRadius: "5px",
                borderColor: isSchool
                  ? styles.borderColor1
                  : styles.borderColor2,
                "&:hover": {
                  borderColor: styles.borderColor1,
                },
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                padding: "1px",
                paddingBottom: isSchool ? "10px" : "1px",
                // marginBottom: "10px",
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
                          color: isSchool
                            ? styles.blackcolor
                            : styles.lighTextColor,
                          fontSize: "14px",
                          fontWeight: "600",
                          fontFamily:
                            'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        }}
                      >
                        School
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
                        onChange={onClickIsSchool}
                        checked={
                          isSchool || searchData.eduSchoolList.length > 0
                        }
                      />
                    </BpCheckboxContainer>
                  }
                />
              </Stack>
              {isSchool && (
                <Box sx={{ color: styles.primaryTextColor, paddingX: "8px" }}>
                  {/* <Autocomplete
                    clearIcon={false}
                    options={[]}
                    freeSolo
                    size="small"
                    multiple
                    renderTags={(value, props) =>
                      value.map((option, index) => {
                        const { onDelete, ...otherProps } = props({ index });
                        return (
                          <Chip
                            onDelete={() => deleteSchool(option, index)}
                            label={option}
                            {...otherProps}
                          />
                        );
                      })
                    }
                    value={
                      defSchoolData?.length === 0 && defSchool?.length === 0
                        ? defSchool
                        : defSchoolData
                    }
                    renderInput={(params) => (
                      <TextField
                        onKeyDown={onChangeSchool}
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
                        placeholder={"Enter School..."}
                      />
                    )}
                  /> */}
                  <Autocomplete
                    noOptionsText={null}
                    disablePortal
                    freeSolo
                    multiple
                    size="small"
                    loading={isSchoolLoader}
                    loadingText="Searching..."
                    options={schoolSuggestions}
                    getOptionLabel={(option) => option.name}
                    onInputChange={(event, newInputValue) => {
                      setIsSchoolLoader(true);
                      getSchoolData(newInputValue);
                    }}
                    value={
                      defSchoolData?.length === 0 && defSchool?.length === 0
                        ? defSchool
                        : defSchoolData
                    }
                    onChange={handleChangeSchool}
                    // onKeyDown={(e: any) => handleKeyDownSchool(e)}
                    className="auto-comp"
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
                              {isSchoolLoader ? (
                                <CircularProgress
                                  sx={{ color: "#146EF6" }}
                                  size={14}
                                />
                              ) : null}
                              {params.InputProps.endAdornment}
                            </React.Fragment>
                          ),
                        }}
                        placeholder={"Enter School..."}
                      />
                    )}
                    renderOption={(
                      props: object,
                      option: any,
                      // state: object
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
                  />
                </Box>
              )}
            </Stack>
            <Stack
              sx={{
                border: "1px solid",
                borderRadius: "5px",
                borderColor: isYearOfEducation
                  ? styles.borderColor1
                  : styles.borderColor2,
                "&:hover": {
                  borderColor: styles.borderColor1,
                },
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                padding: "1px",
                paddingBottom: isYearOfEducation ? "10px" : "1px",
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
                          color: isYearOfEducation
                            ? styles.blackcolor
                            : styles.lighTextColor,
                          fontSize: "14px",
                          fontWeight: "600",
                          fontFamily:
                            'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        }}
                      >
                        Year of Education
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
                        onChange={onClickIsYearOfEducation}
                        checked={isYearOfEducation}
                      />
                    </BpCheckboxContainer>
                  }
                />
              </Stack>
              {isYearOfEducation && (
                // <Stack
                //   sx={{
                //     // height: "30px",
                //     // overflow: "auto",
                //     marginLeft: "12.3px",
                //     marginRight: "13.62px",
                //     marginBottom: "12px",
                //     border: "1px solid",
                //     borderRadius: "3px",
                //     borderColor: styles.greyColor,
                //     // width: "243px",

                //     "&:focus": {
                //       borderColor: styles.borderColor1,
                //     },
                //     "&:hover": {
                //       borderColor: styles.borderColor1,
                //     },
                //   }}
                // >
                //   <BootstrapInput
                //     onChange={onChangeYearOfEdu}
                //     spellCheck="false"
                //     multiline
                //     value={defYearOfEdu}
                //     sx={{
                //       color: styles.defaultTextColor,
                //       fontWeight: "600",
                //       "& .MuiInputBase-input": {
                //         borderRadius: "3px",
                //       },
                //     }}
                //     placeholder="Enter degree..."
                //   />
                // </Stack>

                (<Stack
                  sx={{
                    //   color: styles.blackcolor,
                    //   "&:hover": {
                    //     color: styles.primaryTextColor,
                    //   },
                    // paddingX: "21.75px",
                    paddingY: "10px",
                  }}
                >
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                      width: "100%",
                    }}
                  >
                    <Stack
                      sx={{
                        width: "40%",
                        borderRadius: "4px",
                        paddingX: "5px",
                        paddingY: "2px",
                        display: "flex",
                        // flexDirection: "row",
                        justifyContent: "space-between",
                        backgroundColor: styles.backGroundColorOnHover,
                        "&: hover": {
                          backgroundColor: "#F0F0F0",
                        },
                        cursor: "pointer",
                      }}
                    >
                      <BootstrapInput
                        // type="number"
                        inputProps={{
                          inputMode: "numeric",
                          pattern: "[0-9]*",
                          tabIndex: 1,
                          min: 0,
                        }}
                        value={startYear}
                        onChange={handleChangeStartYear}
                        onKeyDown={handleKeyDownYear}
                        sx={{
                          color: styles.defaultTextColor,
                          fontWeight: "600",
                        }}
                        placeholder="From Year"
                      />
                      {fromYearEduCurrentValidation && (
                        <Typography
                          
                          sx={{
                            fontSize: "12px",
                            fontWeight: "400",
                            fontFamily:
                              'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                          }}
                          variant="body1"
                          color="error"
                        >
                          {`Year <= ${new Date().getFullYear()}`}
                        </Typography>
                      )}
                    </Stack>
                    <Stack
                      sx={{
                        height: "3px",
                        width: "5%",
                        backgroundColor: "#F0F0F0",
                        alignSelf: "center",
                      }}
                    ></Stack>
                    <Stack
                      sx={{
                        width: "40%",
                        borderRadius: "4px",
                        paddingX: "5px",
                        paddingY: "2px",
                        display: "flex",
                        // flexDirection: "row",
                        justifyContent: "space-between",
                        backgroundColor: styles.backGroundColorOnHover,
                        "&: hover": {
                          backgroundColor: "#F0F0F0",
                        },
                        cursor: "pointer",
                      }}
                    >
                      <BootstrapInput
                        // type="number"
                        inputProps={{
                          inputMode: "numeric",
                          pattern: "[0-9]*",
                          tabIndex: 2,
                          min: 0,
                        }}
                        value={endYear}
                        onChange={handleChangeEndYear}
                        onKeyDown={handleKeyDownYear}
                        sx={{
                          color: styles.defaultTextColor,
                          fontWeight: "600",
                        }}
                        placeholder="To Year"
                      />
                      {toYearEduCurrentValidation && (
                        <Typography
                          
                          sx={{
                            fontSize: "12px",
                            fontWeight: "400",
                            fontFamily:
                              'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                          }}
                          variant="body1"
                          color="error"
                        >
                          {`Year <= ${new Date().getFullYear()}`}
                        </Typography>
                      )}
                    </Stack>
                  </Stack>
                  {fromToYearEduValidation && (
                    <Typography
                      
                      sx={{
                        fontSize: "12px",
                        fontWeight: "400",
                        fontFamily:
                          'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                      }}
                      variant="body1"
                      color="error"
                    >
                      From year shouldn't be more than To year
                    </Typography>
                  )}
                  {toFromYearEduValidation && (
                    <Typography
                      
                      sx={{
                        fontSize: "12px",
                        fontWeight: "400",
                        fontFamily:
                          'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                      }}
                      variant="body1"
                      color="error"
                    >
                      To year shouldn't be less than From year
                    </Typography>
                  )}
                </Stack>)
              )}
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Stack>)
  );
};
export default Education;
