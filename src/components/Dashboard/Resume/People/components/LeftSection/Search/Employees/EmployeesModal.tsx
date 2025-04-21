import { React } from "../../../../../../../../shared/modules/React";
// import { useContext, useEffect } from "react";
import { useContext, useEffect, useState } from "react";
// import { useRef } from "react";
// import { Box, Stack, TextField, Typography } from "@mui/material";
import { Box } from "../../../../../../../../shared/modules/MaterialImports/Box";
import { Stack } from "../../../../../../../../shared/modules/MaterialImports/Stack";
import { Typography } from "../../../../../../../../shared/modules/MaterialImports/Typography";
// import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
// import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import styles from "./../../../../shared/config/variables.module.scss";
import { styled } from "@mui/material/styles";
import { Checkbox } from "../../../../../../../../shared/modules/MaterialImports/FormElements";
import { FormControlLabel } from "../../../../../../../../shared/modules/MaterialImports/FormInputs";
import InputBase from "@mui/material/InputBase";
import { ModalStore, Store } from "../../../DataLabs/DataLabs";

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

const BootstrapInput = styled(InputBase)(() =>
  // { theme }
  ({
    "& .MuiInputBase-input": {
      // borderRadius: "3px",
      position: "relative",
      backgroundColor: "transparent",
      // border: "1px solid",
      // borderColor: styles.greyColor,
      fontSize: "14px",

      // innerHeight: "30px",
      // width: "243px",

      // padding: "6px 167px 7px 10px",
      fontFamily:
        'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',

      // paddingLeft: "13px",
      // "&:focus": {
      //   borderColor: styles.borderColor1,
      // },
      // "&:hover": {
      //   borderColor: styles.borderColor1,
      // },
    },
  })
);

const EmployeesModal: React.FC = () => {
  const [searchModalData, setSearchModalData] = useContext(ModalStore);

  let predefined = true;
  let custom = false;
  let employeeUnknown = false;

  if (searchModalData.min !== "" || searchModalData.max !== "") {
    predefined = false;
    custom = true;
    employeeUnknown = false;
  }

  const [min, setMin] = useState<any>(searchModalData.min);
  const [max, setMax] = useState<any>(searchModalData.max);

  const [isPredefined, setIsPredefined] = React.useState(predefined);
  const onClickIsPredefined = () => {
    setIsPredefined(true);
    setIsCustom(false);
    setIsEmployeeUnknown(false);
    setSearchModalData((prevSearchData: any) => ({
      ...prevSearchData,
      no_of_employees: [],
      min: "",
      max: "",
      not_exist_fields: [
        ...prevSearchData.not_exist_fields.filter(
          (field: any) => field !== "employees"
        ),
      ],
    }));
  };

  const [isCustom, setIsCustom] = React.useState(custom);

  const onClickIsCustom = () => {
    setIsCustom(true);
    setIsPredefined(false);
    setIsEmployeeUnknown(false);
    setSearchModalData((prevSearchData: any) => ({
      ...prevSearchData,
      no_of_employees: [],
      not_exist_fields: [
        ...prevSearchData.not_exist_fields.filter(
          (field: any) => field !== "employees"
        ),
      ],
    }));
  };

  const [isEmployeeUnknown, setIsEmployeeUnknown] =
    React.useState(employeeUnknown);
  const onClickIsEmployeeUnknown = () => {
    setIsEmployeeUnknown(true);
    setIsCustom(false);
    setIsPredefined(false);

    setSearchModalData((prevSearchData: any) => {
      // Add 'employees' to not_exist_fields only if it doesn't already exist
      const updatedNotExistFields = prevSearchData.not_exist_fields.includes(
        "employees"
      )
        ? prevSearchData.not_exist_fields
        : [...prevSearchData.not_exist_fields, "employees"];

      return {
        ...prevSearchData,
        not_exist_fields: updatedNotExistFields,
        no_of_employees: [],
        min: "",
        max: "",
      };
    });
  };

  // const [isFirstRow, setIsFirstRow] = React.useState(() => {
  //   const storedIsFirstRow = localStorage.getItem("isFirstRow");
  //   return storedIsFirstRow ? JSON.parse(storedIsFirstRow) : true;
  // });

  // localStorage.setItem("isFirstRow", JSON.stringify(isFirstRow));
  // const storedIsFirstRow = localStorage.getItem("isFirstRow");
  // const parsedIsFirstRow = storedIsFirstRow
  //   ? JSON.parse(storedIsFirstRow)
  //   : null;
  let firstRow = true;
  let secondRow = true;
  let thirdRow = true;
  let fourthRow = true;
  let fifthRow = true;
  let sixthRow = true;
  let seventhRow = true;
  let eighthRow = true;
  // let ninthRow = true;
  // let tenthRow = true;
  // let eleventhRow = true;

  if (searchModalData.no_of_employees.includes("1-10")) {
    firstRow = false;
  } else {
    firstRow = true;
  }

  if (searchModalData.no_of_employees.includes("11-50")) {
    secondRow = false;
  } else {
    secondRow = true;
  }

  if (searchModalData.no_of_employees.includes("51-200")) {
    thirdRow = false;
  } else {
    thirdRow = true;
  }
  if (searchModalData.no_of_employees.includes("201-500")) {
    fourthRow = false;
  } else {
    fourthRow = true;
  }

  if (searchModalData.no_of_employees.includes("501-1000")) {
    fifthRow = false;
  } else {
    fifthRow = true;
  }

  if (searchModalData.no_of_employees.includes("1001-5000")) {
    sixthRow = false;
  } else {
    sixthRow = true;
  }

  if (searchModalData.no_of_employees.includes("5001-10000")) {
    seventhRow = false;
  } else {
    seventhRow = true;
  }

  if (searchModalData.no_of_employees.includes("10001+")) {
    eighthRow = false;
  } else {
    eighthRow = true;
  }

  // if (searchModalData.no_of_employees.includes("2001-5000")) {
  //   ninthRow = false;
  // } else {
  //   ninthRow = true;
  // }
  // if (searchModalData.no_of_employees.includes("5001-10000")) {
  //   tenthRow = false;
  // } else {
  //   tenthRow = true;
  // }

  // if (searchModalData.no_of_employees.includes("10001+")) {
  //   eleventhRow = false;
  // } else {
  //   eleventhRow = true;
  // }

  // const [isFirstRow, setIsFirstRow] = React.useState(firstRow);
  const onClickisFirstRow = () => {
    // setIsFirstRow(!isFirstRow);

    // console.log("test-02", isFirstRow);
    if (firstRow === true) {
      setSearchModalData((prevSearchData: any) => ({
        ...prevSearchData,
        no_of_employees: [...prevSearchData.no_of_employees, "1-10"],
      }));
    } else {
      setSearchModalData((prevSearchData: any) => ({
        ...prevSearchData,
        no_of_employees: prevSearchData.no_of_employees.filter(
          (value: string) => value !== "1-10"
        ),
      }));
    }
  };

  // if (searchModalData.isClickclearfiltersEmpOpen) {
  //   console.log("test-01", searchModalData.no_of_employees);

  //   setSearchModalData((prevSearchData: any) => ({
  //     ...prevSearchData,
  //     isClickclearfiltersEmpOpen: false,
  //   }));
  // }

  const onClickisFirstRowStack = (e: any) => {
    e.stopPropagation();
  };

  // const [isSecondRow, setIsSecondRow] = React.useState(() => {
  //   const storedIsSecondRow = localStorage.getItem("isSecondRow");
  //   return storedIsSecondRow ? JSON.parse(storedIsSecondRow) : true;
  // });

  // localStorage.setItem("isSecondRow", JSON.stringify(isSecondRow));
  // const storedIsSecondRow = localStorage.getItem("isSecondRow");
  // const parsedIsSecondRow = storedIsSecondRow
  //   ? JSON.parse(storedIsSecondRow)
  //   : null;

  // const [isSecondRow, setIsSecondRow] = React.useState(secondRow);
  const onClickisSecondRow = () => {
    // setIsSecondRow(!isSecondRow);

    // console.log(isSecondRow);

    if (secondRow === true) {
      setSearchModalData((prevSearchData: any) => ({
        ...prevSearchData,
        no_of_employees: [...prevSearchData.no_of_employees, "11-50"],
      }));
    } else {
      setSearchModalData((prevSearchData: any) => ({
        ...prevSearchData,
        no_of_employees: prevSearchData.no_of_employees.filter(
          (value: string) => value !== "11-50"
        ),
      }));
    }
  };

  const onClickisSecondRowStack = (e: any) => {
    e.stopPropagation();
  };

  // const [isThirdRow, setIsThirdRow] = React.useState(() => {
  //   const storedIsThirdRow = localStorage.getItem("isThirdRow");
  //   return storedIsThirdRow ? JSON.parse(storedIsThirdRow) : true;
  // });

  // localStorage.setItem("isThirdRow", JSON.stringify(isThirdRow));
  // const storedIsThirdRow = localStorage.getItem("isThirdRow");
  // const parsedIsThirdRow = storedIsThirdRow
  //   ? JSON.parse(storedIsThirdRow)
  //   : null;

  // const [isThirdRow, setIsThirdRow] = React.useState(thirdRow);
  const onClickisThirdRow = () => {
    // setIsThirdRow(!isThirdRow);

    if (thirdRow === true) {
      setSearchModalData((prevSearchData: any) => ({
        ...prevSearchData,
        no_of_employees: [...prevSearchData.no_of_employees, "51-200"],
      }));
    } else {
      setSearchModalData((prevSearchData: any) => ({
        ...prevSearchData,
        no_of_employees: prevSearchData.no_of_employees.filter(
          (value: string) => value !== "51-200"
        ),
      }));
    }
  };

  const onClickisThirdRowStack = (e: any) => {
    e.stopPropagation();
  };

  // const [isFourthRow, setIsFourthRow] = React.useState(() => {
  //   const storedIsFourthRow = localStorage.getItem("isFourthRow");
  //   return storedIsFourthRow ? JSON.parse(storedIsFourthRow) : true;
  // });

  // localStorage.setItem("isFourthRow", JSON.stringify(isFourthRow));
  // const storedIsFourthRow = localStorage.getItem("isFourthRow");
  // const parsedIsFourthRow = storedIsFourthRow
  //   ? JSON.parse(storedIsFourthRow)
  //   : null;

  // const [isFourthRow, setIsFourthRow] = React.useState(fourthRow);
  const onClickisFourthRow = () => {
    // setIsFourthRow(!isFourthRow);
    if (fourthRow === true) {
      setSearchModalData((prevSearchData: any) => ({
        ...prevSearchData,
        no_of_employees: [...prevSearchData.no_of_employees, "201-500"],
      }));
    } else {
      setSearchModalData((prevSearchData: any) => ({
        ...prevSearchData,
        no_of_employees: prevSearchData.no_of_employees.filter(
          (value: string) => value !== "201-500"
        ),
      }));
    }
  };

  const onClickisFourthRowStack = (e: any) => {
    e.stopPropagation();
  };

  // const [isFifthRow, setIsFifthRow] = React.useState(() => {
  //   const storedIsFifthRow = localStorage.getItem("isFifthRow");
  //   return storedIsFifthRow ? JSON.parse(storedIsFifthRow) : true;
  // });

  // localStorage.setItem("isFifthRow", JSON.stringify(isFifthRow));
  // const storedIsFifthRow = localStorage.getItem("isFifthRow");
  // const parsedIsFifthRow = storedIsFifthRow
  //   ? JSON.parse(storedIsFifthRow)
  //   : null;

  // const [isFifthRow, setIsFifthRow] = React.useState(fifthRow);
  const onClickisFifthRow = () => {
    // setIsFifthRow(!isFifthRow);
    if (fifthRow === true) {
      setSearchModalData((prevSearchData: any) => ({
        ...prevSearchData,
        no_of_employees: [...prevSearchData.no_of_employees, "501-1000"],
      }));
    } else {
      setSearchModalData((prevSearchData: any) => ({
        ...prevSearchData,
        no_of_employees: prevSearchData.no_of_employees.filter(
          (value: string) => value !== "501-1000"
        ),
      }));
    }
  };

  const onClickisFifthRowStack = (e: any) => {
    e.stopPropagation();
  };

  // const [isSixthRow, setIsSixthRow] = React.useState(() => {
  //   const storedIsSixthRow = localStorage.getItem("isSixthRow");
  //   return storedIsSixthRow ? JSON.parse(storedIsSixthRow) : true;
  // });

  // localStorage.setItem("isSixthRow", JSON.stringify(isSixthRow));
  // const storedIsSixthRow = localStorage.getItem("isSixthRow");
  // const parsedIsSixthRow = storedIsSixthRow
  //   ? JSON.parse(storedIsSixthRow)
  //   : null;

  // const [isSixthRow, setIsSixthRow] = React.useState(sixthRow);
  const onClickisSixthRow = () => {
    // setIsSixthRow(!isSixthRow);
    if (sixthRow === true) {
      setSearchModalData((prevSearchData: any) => ({
        ...prevSearchData,
        no_of_employees: [...prevSearchData.no_of_employees, "1001-5000"],
      }));
    } else {
      setSearchModalData((prevSearchData: any) => ({
        ...prevSearchData,
        no_of_employees: prevSearchData.no_of_employees.filter(
          (value: string) => value !== "1001-5000"
        ),
      }));
    }
  };

  const onClickisSixthRowStack = (e: any) => {
    e.stopPropagation();
  };

  // const [isSeventhRow, setIsSeventhRow] = React.useState(() => {
  //   const storedIsSeventhRow = localStorage.getItem("isSeventhRow");
  //   return storedIsSeventhRow ? JSON.parse(storedIsSeventhRow) : true;
  // });

  // localStorage.setItem("isSeventhRow", JSON.stringify(isSeventhRow));
  // const storedIsSeventhRow = localStorage.getItem("isSeventhRow");
  // const parsedIsSeventhRow = storedIsSeventhRow
  //   ? JSON.parse(storedIsSeventhRow)
  //   : null;

  // const [isSeventhRow, setIsSeventhRow] = React.useState(seventhRow);
  const onClickisSeventhRow = () => {
    // setIsSeventhRow(!isSeventhRow);
    if (seventhRow === true) {
      setSearchModalData((prevSearchData: any) => ({
        ...prevSearchData,
        no_of_employees: [...prevSearchData.no_of_employees, "5001-10000"],
      }));
    } else {
      setSearchModalData((prevSearchData: any) => ({
        ...prevSearchData,
        no_of_employees: prevSearchData.no_of_employees.filter(
          (value: string) => value !== "5001-10000"
        ),
      }));
    }
  };

  const onClickisSeventhRowStack = (e: any) => {
    e.stopPropagation();
  };

  // const [isEighthRow, setIsEighthRow] = React.useState(() => {
  //   const storedIsEighthRow = localStorage.getItem("isEighthRow");
  //   return storedIsEighthRow ? JSON.parse(storedIsEighthRow) : true;
  // });

  // localStorage.setItem("isEighthRow", JSON.stringify(isEighthRow));
  // const storedIsEighthRow = localStorage.getItem("isEighthRow");
  // const parsedIsEighthRow = storedIsEighthRow
  //   ? JSON.parse(storedIsEighthRow)
  //   : null;

  // const [isEighthRow, setIsEighthRow] = React.useState(eighthRow);
  const onClickisEighthRow = () => {
    // setIsEighthRow(!isEighthRow);
    if (eighthRow === true) {
      setSearchModalData((prevSearchData: any) => ({
        ...prevSearchData,
        no_of_employees: [...prevSearchData.no_of_employees, "10001+"],
      }));
    } else {
      setSearchModalData((prevSearchData: any) => ({
        ...prevSearchData,
        no_of_employees: prevSearchData.no_of_employees.filter(
          (value: string) => value !== "10001+"
        ),
      }));
    }
  };

  const onClickisEighthRowStack = (e: any) => {
    e.stopPropagation();
  };

  // const [isNinthRow, setIsNinthRow] = React.useState(() => {
  //   const storedIsNinthRow = localStorage.getItem("isNinthRow");
  //   return storedIsNinthRow ? JSON.parse(storedIsNinthRow) : true;
  // });

  // localStorage.setItem("isNinthRow", JSON.stringify(isNinthRow));
  // const storedIsNinthRow = localStorage.getItem("isNinthRow");
  // const parsedIsNinthRow = storedIsNinthRow
  //   ? JSON.parse(storedIsNinthRow)
  //   : null;

  // const [isNinthRow, setIsNinthRow] = React.useState(ninthRow);
  // const onClickisNinthRow = () => {
  //   // setIsNinthRow(!isNinthRow);
  //   if (ninthRow === true) {
  //     setSearchModalData((prevSearchData: any) => ({
  //       ...prevSearchData,
  //       no_of_employees: [...prevSearchData.no_of_employees, "2001-5000"],
  //     }));
  //   } else {
  //     setSearchModalData((prevSearchData: any) => ({
  //       ...prevSearchData,
  //       no_of_employees: prevSearchData.no_of_employees.filter(
  //         (value: string) => value !== "2001-5000"
  //       ),
  //     }));
  //   }
  // };

  // const onClickisNinthRowStack = (e: any) => {
  //   e.stopPropagation();
  // };

  // const [isTenthRow, setIsTenthRow] = React.useState(() => {
  //   const storedIsTenthRow = localStorage.getItem("isTenthRow");
  //   return storedIsTenthRow ? JSON.parse(storedIsTenthRow) : true;
  // });

  // localStorage.setItem("isTenthRow", JSON.stringify(isTenthRow));
  // const storedIsTenthRow = localStorage.getItem("isTenthRow");
  // const parsedIsTenthRow = storedIsTenthRow
  //   ? JSON.parse(storedIsTenthRow)
  //   : null;

  // const [isTenthRow, setIsTenthRow] = React.useState(tenthRow);
  // const onClickisTenthRow = () => {
  //   // setIsTenthRow(!isTenthRow);
  //   if (tenthRow === true) {
  //     setSearchModalData((prevSearchData: any) => ({
  //       ...prevSearchData,
  //       no_of_employees: [...prevSearchData.no_of_employees, "5001-10000"],
  //     }));
  //   } else {
  //     setSearchModalData((prevSearchData: any) => ({
  //       ...prevSearchData,
  //       no_of_employees: prevSearchData.no_of_employees.filter(
  //         (value: string) => value !== "5001-10000"
  //       ),
  //     }));
  //   }
  // };

  // const onClickisTenthRowStack = (e: any) => {
  //   e.stopPropagation();
  // };

  // const [isEleventhRow, setIsEleventhRow] = React.useState(() => {
  //   const storedIsEleventhRow = localStorage.getItem("isEleventhRow");
  //   return storedIsEleventhRow ? JSON.parse(storedIsEleventhRow) : true;
  // });

  // localStorage.setItem("isEleventhRow", JSON.stringify(isEleventhRow));
  // const storedIsEleventhRow = localStorage.getItem("isEleventhRow");
  // const parsedIsEleventhRow = storedIsEleventhRow
  //   ? JSON.parse(storedIsEleventhRow)
  //   : null;

  // const [isEleventhRow, setIsEleventhRow] = React.useState(eleventhRow);
  // const onClickisEleventhRow = () => {
  //   // setIsEleventhRow(!isEleventhRow);
  //   if (eleventhRow === true) {
  //     setSearchModalData((prevSearchData: any) => ({
  //       ...prevSearchData,
  //       no_of_employees: [...prevSearchData.no_of_employees, "10001+"],
  //     }));
  //   } else {
  //     setSearchModalData((prevSearchData: any) => ({
  //       ...prevSearchData,
  //       no_of_employees: prevSearchData.no_of_employees.filter(
  //         (value: string) => value !== "10001+"
  //       ),
  //     }));
  //   }
  // };

  // const onClickisEleventhRowStack = (e: any) => {
  //   e.stopPropagation();
  // };

  // // Set searchModalData in localStorage when it changes
  // useEffect(() => {
  //   localStorage.setItem("searchModalData", JSON.stringify(searchModalData));
  // }, [searchModalData]);

  // // Get searchModalData from localStorage on component mount
  // useEffect(() => {
  //   const searchDataString = localStorage.getItem("searchModalData");
  //   if (searchDataString !== null) {
  //     const searchDataFromLocalStorage = JSON.parse(searchDataString);
  //     // Set searchModalData retrieved from localStorage
  //     setSearchModalData(searchDataFromLocalStorage);
  //   }
  // }, []);

  React.useEffect(() => {
    // getSearchData("");
    if (searchModalData.not_exist_fields.includes("employees")) {
      setIsPredefined(false);
      setIsCustom(false);
      setIsEmployeeUnknown(true);
    }
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const numericKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const specialKeys = ["Backspace", "Delete", "Tab"];

    if (!numericKeys.includes(event.key) && !specialKeys.includes(event.key)) {
      event.preventDefault();
    }
  };

  const handleChangeMin = (e: any) => {
    const minValue =
      searchModalData.max === ""
        ? e.target.value.toString() + "-"
        : e.target.value.toString() + "-" + searchModalData.max.toString();

    const stringValue = `${e.target.value}`;
    if (stringValue.length <= 6) {
      setMin(e.target.value);
      const currMax = max;

      if (currMax) {
        if (Number(currMax) > e.target.value) {
          setSearchModalData((prevSearchData: any) => ({
            ...prevSearchData,
            min: e.target.value,
            max: max,
            isMinValidation: false,
            isMaxValidation: false,
            no_of_employees: minValue === "-" ? [] : [minValue],
          }));
        } else {
          setSearchModalData((prevSearchData: any) => ({
            ...prevSearchData,
            isMinValidation: true,
          }));
        }
      } else {
        setSearchModalData((prevSearchData: any) => ({
          ...prevSearchData,
          min: e.target.value,
          max: max,
          no_of_employees: minValue === "-" ? [] : [minValue],
        }));
      }
    }

    if (stringValue.length === 0 || searchModalData.max.length === 0) {
      setSearchModalData((prevSearchData: any) => ({
        ...prevSearchData,
        isMinValidation: false,
        isMaxValidation: false,
      }));
    }

    // setSearchModalData((prevSearchData: any) => ({
    //   ...prevSearchData,
    //   min: e.target.value,

    //   no_of_employees: minValue === "-" ? [] : [minValue],
    // }));
  };

  const onClickInputMin = (e: any) => {
    e.stopPropagation();
  };

  const handleChangeMax = (e: any) => {
    const maxValue =
      searchModalData.min === ""
        ? "-" + e.target.value.toString()
        : searchModalData.min.toString() + "-" + e.target.value.toString();

    const stringValue = `${e.target.value}`;
    console.log("string val", stringValue);
    if (stringValue.length <= 6) {
      setMax(e.target.value);
      const currMin = searchModalData.min;
      if (currMin) {
        if (Number(currMin) < e.target.value) {
          setSearchModalData((prevSearchData: any) => ({
            ...prevSearchData,
            max: e.target.value,
            min: min,
            isMinValidation: false,
            isMaxValidation: false,
            no_of_employees: maxValue === "-" ? [] : [maxValue],
          }));
        } else {
          setSearchModalData((prevSearchData: any) => ({
            ...prevSearchData,
            isMaxValidation: true,
          }));
        }
      } else {
        setSearchModalData((prevSearchData: any) => ({
          ...prevSearchData,
          max: e.target.value,
          min: min,
          no_of_employees: maxValue === "-" ? [] : [maxValue],
        }));
      }

      // setSearchModalData((prevSearchData: any) => ({
      //   ...prevSearchData,
      //   max: e.target.value,
      // }));
    }

    if (stringValue.length === 0) {
      setSearchModalData((prevSearchData: any) => ({
        ...prevSearchData,
        max: e.target.value,
        no_of_employees: maxValue === "-" ? [] : [maxValue],
      }));
    }

    if (stringValue.length === 0 || searchModalData.min.length === 0) {
      setSearchModalData((prevSearchData: any) => ({
        ...prevSearchData,
        isMinValidation: false,
        isMaxValidation: false,
      }));
    }

    // setSearchModalData((prevSearchData: any) => ({
    //   ...prevSearchData,
    //   max: e.target.value,
    //   no_of_employees: maxValue === "-" ? [] : [maxValue],
    // }));
  };

  const onClickInputMax = (e: any) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (searchModalData.min === "") {
      setMin("");
    }

    if (searchModalData.max === "") {
      setMax("");
    }
  }, [searchModalData.min, searchModalData.max]);

  return (
    // <Stack p={1} className={selectEmployee ? 'expanded' : ''} onClick={handleSelect}>
    //     <Box className='left-containers-align'>
    //         <Box className='left-containers-align'>
    //             <PeopleAltOutlinedIcon className='list-icon' sx={{ fontSize: '24px', }} />
    //             <Typography component='p' className='menu-title'># Employees</Typography>
    //         </Box>
    //         <Box className='left-containers-dropdown'>
    //             <ArrowDropDownIcon sx={{ display: selectEmployee ? 'none' : 'block' }} />
    //             <ArrowDropUpIcon sx={{ display: selectEmployee ? 'block' : 'none' }} />
    //         </Box>
    //     </Box>
    //     <Box sx={{ display: selectEmployee ? 'block' : 'none', height: '200px' }}>
    //         Employee DropDown
    //     </Box>
    // </Stack>
    <Stack>
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
          DropDown Employees{" "}
        </Box> */}
        <Stack
          sx={{
            paddingX: "21.75px",
            paddingTop: "6px",
            paddingBottom: "15px",
            gap: "5px",
          }}
        >
          <Stack
            onClick={onClickIsPredefined}
            sx={{
              borderRadius: "5px",
              backgroundColor: isPredefined
                ? "#ffffff"
                : styles.backGroundColorOnHover,
              border: "1px solid",
              borderColor: isPredefined
                ? styles.borderColor1
                : styles.borderColor2,

              "&:hover": {
                border: "1px solid",
                borderColor: "#146EF6",
                backgroundColor: "#ffffff",
              },
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                paddingX: "13px",
                minHeight: "38.18px",
                cursor: "pointer",
              }}
            >
              {isPredefined ? (
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
                Predefined Range
              </Typography>
            </Stack>
            {isPredefined && (
              <Stack
                sx={{
                  paddingLeft: "5.83px",
                  paddingRight: "7.17px",
                  paddingBottom: "10px",
                }}
              >
                <Stack
                  onClick={onClickisFirstRowStack}
                  sx={{
                    paddingX: "6px",
                    // paddingY: "5px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
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
                    }}
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
                          1-10
                        </Box>
                      }
                      control={
                        <BpCheckboxContainer>
                          <Checkbox
                            className="bp-checkbox"
                            disableRipple
                            color="default"
                            checked={
                              searchModalData.no_of_employees.includes("1-10")
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
                            onChange={onClickisFirstRow}
                          />
                        </BpCheckboxContainer>
                      }
                    />
                  </Stack>
                  {/* <Typography
                    sx={{
                      fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                      fontSize: "14px",
                      fontWeight: "400",
                      color: styles.defaultTextColor,
                      alignSelf: "center",
                    }}
                  >
                    18.4M
                  </Typography> */}
                </Stack>

                <Stack
                  onClick={onClickisSecondRowStack}
                  sx={{
                    paddingX: "6px",
                    // paddingY: "5px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderRadius: "3px",
                    "&:hover": {
                      backgroundColor: "#F0F0F0",
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    // onClick={onClickisOneToTen}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexGrow: "1",
                    }}
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
                          11-50
                        </Box>
                      }
                      control={
                        <BpCheckboxContainer>
                          <Checkbox
                            className="bp-checkbox"
                            disableRipple
                            color="default"
                            checked={
                              searchModalData.no_of_employees.includes("11-50")
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
                            onChange={onClickisSecondRow}
                          />
                        </BpCheckboxContainer>
                      }
                    />
                  </Stack>
                  {/* <Typography
                    sx={{
                      fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                      fontSize: "14px",
                      fontWeight: "400",
                      color: styles.defaultTextColor,
                      alignSelf: "center",
                    }}
                  >
                    9.4M
                  </Typography> */}
                </Stack>

                <Stack
                  onClick={onClickisThirdRowStack}
                  sx={{
                    paddingX: "6px",
                    // paddingY: "5px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderRadius: "3px",
                    "&:hover": {
                      backgroundColor: "#F0F0F0",
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    // onClick={onClickisOneToTen}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexGrow: "1",
                    }}
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
                          51-200
                        </Box>
                      }
                      control={
                        <BpCheckboxContainer>
                          <Checkbox
                            className="bp-checkbox"
                            disableRipple
                            color="default"
                            checked={
                              searchModalData.no_of_employees.includes("51-200")
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
                            onChange={onClickisThirdRow}
                          />
                        </BpCheckboxContainer>
                      }
                    />
                  </Stack>
                  {/* <Typography
                    sx={{
                      fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                      fontSize: "14px",
                      fontWeight: "400",
                      color: styles.defaultTextColor,
                      alignSelf: "center",
                    }}
                  >
                    15.0M
                  </Typography> */}
                </Stack>

                <Stack
                  onClick={onClickisFourthRowStack}
                  sx={{
                    paddingX: "6px",
                    // paddingY: "5px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderRadius: "3px",
                    "&:hover": {
                      backgroundColor: "#F0F0F0",
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    // onClick={onClickisOneToTen}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexGrow: "1",
                    }}
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
                          201-500
                        </Box>
                      }
                      control={
                        <BpCheckboxContainer>
                          <Checkbox
                            className="bp-checkbox"
                            disableRipple
                            color="default"
                            checked={
                              searchModalData.no_of_employees.includes(
                                "201-500"
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
                            onChange={onClickisFourthRow}
                          />
                        </BpCheckboxContainer>
                      }
                    />
                  </Stack>
                  {/* <Typography
                    sx={{
                      fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                      fontSize: "14px",
                      fontWeight: "400",
                      color: styles.defaultTextColor,
                      alignSelf: "center",
                    }}
                  >
                    12.7M
                  </Typography> */}
                </Stack>

                <Stack
                  onClick={onClickisFifthRowStack}
                  sx={{
                    paddingX: "6px",
                    // paddingY: "5px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderRadius: "3px",
                    "&:hover": {
                      backgroundColor: "#F0F0F0",
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    // onClick={onClickisOneToTen}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexGrow: "1",
                    }}
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
                          501-1000
                        </Box>
                      }
                      control={
                        <BpCheckboxContainer>
                          <Checkbox
                            className="bp-checkbox"
                            disableRipple
                            color="default"
                            checked={
                              searchModalData.no_of_employees.includes(
                                "501-1000"
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
                            onChange={onClickisFifthRow}
                          />
                        </BpCheckboxContainer>
                      }
                    />
                  </Stack>
                  {/* <Typography
                    sx={{
                      fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                      fontSize: "14px",
                      fontWeight: "400",
                      color: styles.defaultTextColor,
                      alignSelf: "center",
                    }}
                  >
                    13.4M
                  </Typography> */}
                </Stack>

                <Stack
                  onClick={onClickisSixthRowStack}
                  sx={{
                    paddingX: "6px",
                    // paddingY: "5px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderRadius: "3px",
                    "&:hover": {
                      backgroundColor: "#F0F0F0",
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    // onClick={onClickisOneToTen}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexGrow: "1",
                    }}
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
                          1001-5000
                        </Box>
                      }
                      control={
                        <BpCheckboxContainer>
                          <Checkbox
                            className="bp-checkbox"
                            disableRipple
                            color="default"
                            checked={
                              searchModalData.no_of_employees.includes(
                                "1001-5000"
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
                            onChange={onClickisSixthRow}
                          />
                        </BpCheckboxContainer>
                      }
                    />
                  </Stack>
                  {/* <Typography
                    sx={{
                      fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                      fontSize: "14px",
                      fontWeight: "400",
                      color: styles.defaultTextColor,
                      alignSelf: "center",
                    }}
                  >
                    17.3M
                  </Typography> */}
                </Stack>

                <Stack
                  onClick={onClickisSeventhRowStack}
                  sx={{
                    paddingX: "6px",
                    // paddingY: "5px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderRadius: "3px",
                    "&:hover": {
                      backgroundColor: "#F0F0F0",
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    // onClick={onClickisOneToTen}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexGrow: "1",
                    }}
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
                          5001-10000
                        </Box>
                      }
                      control={
                        <BpCheckboxContainer>
                          <Checkbox
                            className="bp-checkbox"
                            disableRipple
                            color="default"
                            checked={
                              searchModalData.no_of_employees.includes(
                                "5001-10000"
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
                            onChange={onClickisSeventhRow}
                          />
                        </BpCheckboxContainer>
                      }
                    />
                  </Stack>
                  {/* <Typography
                    sx={{
                      fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                      fontSize: "14px",
                      fontWeight: "400",
                      color: styles.defaultTextColor,
                      alignSelf: "center",
                    }}
                  >
                    13.2M
                  </Typography> */}
                </Stack>

                <Stack
                  onClick={onClickisEighthRowStack}
                  sx={{
                    paddingX: "6px",
                    // paddingY: "5px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderRadius: "3px",
                    "&:hover": {
                      backgroundColor: "#F0F0F0",
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    // onClick={onClickisOneToTen}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexGrow: "1",
                    }}
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
                          10001+
                        </Box>
                      }
                      control={
                        <BpCheckboxContainer>
                          <Checkbox
                            className="bp-checkbox"
                            disableRipple
                            color="default"
                            checked={
                              searchModalData.no_of_employees.includes("10001+")
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
                            onChange={onClickisEighthRow}
                          />
                        </BpCheckboxContainer>
                      }
                    />
                  </Stack>
                  {/* <Typography
                    sx={{
                      fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                      fontSize: "14px",
                      fontWeight: "400",
                      color: styles.defaultTextColor,
                      alignSelf: "center",
                    }}
                  >
                    12.7M
                  </Typography> */}
                </Stack>

                {/* <Stack
                  onClick={onClickisNinthRowStack}
                  sx={{
                    paddingX: "6px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderRadius: "3px",
                    "&:hover": {
                      backgroundColor: "#F0F0F0",
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexGrow: "1",
                    }}
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
                            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                          }}
                        >
                          2001-5000
                        </Box>
                      }
                      control={
                        <BpCheckboxContainer>
                          <Checkbox
                            className="bp-checkbox"
                            disableRipple
                            color="default"
                            checked={
                              searchModalData.no_of_employees.includes("2001-5000")
                                ? true
                                : false
                            }
                            checkedIcon={<BpCheckedIcon 
                               style={{ borderColor: '#146EF6' }} />}
                            icon={<BpIcon className="bp-icon" />}
                            onChange={onClickisNinthRow}
                          />
                        </BpCheckboxContainer>
                      }
                    />
                  </Stack>
                  
                </Stack> */}

                {/* <Stack
                  onClick={onClickisTenthRowStack}
                  sx={{
                    paddingX: "6px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderRadius: "3px",
                    "&:hover": {
                      backgroundColor: "#F0F0F0",
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexGrow: "1",
                    }}
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
                            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                          }}
                        >
                          5001-10000
                        </Box>
                      }
                      control={
                        <BpCheckboxContainer>
                          <Checkbox
                            className="bp-checkbox"
                            disableRipple
                            color="default"
                            checked={
                              searchModalData.no_of_employees.includes("5001-10000")
                                ? true
                                : false
                            }
                            checkedIcon={<BpCheckedIcon 
                               style={{ borderColor: '#146EF6' }} />}
                            icon={<BpIcon className="bp-icon" />}
                            onChange={onClickisTenthRow}
                          />
                        </BpCheckboxContainer>
                      }
                    />
                  </Stack>
                  
                </Stack> */}

                {/* <Stack
                  onClick={onClickisEleventhRowStack}
                  sx={{
                    paddingX: "6px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderRadius: "3px",
                    "&:hover": {
                      backgroundColor: "#F0F0F0",
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexGrow: "1",
                    }}
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
                            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                          }}
                        >
                          10001+
                        </Box>
                      }
                      control={
                        <BpCheckboxContainer>
                          <Checkbox
                            className="bp-checkbox"
                            disableRipple
                            color="default"
                            checked={
                              searchModalData.no_of_employees.includes("10001+")
                                ? true
                                : false
                            }
                            checkedIcon={<BpCheckedIcon 
                               style={{ borderColor: '#146EF6' }} />}
                            icon={<BpIcon className="bp-icon" />}
                            onChange={onClickisEleventhRow}
                          />
                        </BpCheckboxContainer>
                      }
                    />
                  </Stack>
                 
                </Stack> */}
              </Stack>
            )}
          </Stack>
          <Stack
            onClick={onClickIsCustom}
            sx={{
              display: "none",
              borderRadius: "5px",
              backgroundColor: isCustom
                ? "#ffffff"
                : styles.backGroundColorOnHover,
              border: "1px solid",
              borderColor: isCustom ? styles.borderColor1 : styles.borderColor2,

              "&:hover": {
                border: "1px solid",
                borderColor: "#146EF6",
                backgroundColor: "#ffffff",
              },
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                paddingX: "13px",
                minHeight: "38.18px",
                cursor: "pointer",
              }}
            >
              {isCustom ? (
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
                Custom Range
              </Typography>
            </Stack>
            {isCustom && (
              <>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    width: "100%",
                    // paddingX: "10px",
                    paddingBottom: "10px",
                  }}
                >
                  <Stack
                    sx={{
                      width: "32%",
                      borderRadius: "4px",
                      paddingX: "10px",
                      paddingY: "2px",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      backgroundColor: styles.backGroundColorOnHover,
                      "&: hover": {
                        backgroundColor: "#F0F0F0",
                      },
                      cursor: "pointer",
                      height: "30px",
                    }}
                  >
                    <BootstrapInput
                      // type="number"
                      inputProps={{
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                        tabIndex: 1,
                      }}
                      value={min}
                      onChange={handleChangeMin}
                      onClick={onClickInputMin}
                      onKeyDown={handleKeyDown}
                      sx={{
                        color: styles.defaultTextColor,
                        fontWeight: "600",
                      }}
                      placeholder="Min"
                    />
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
                      width: "32%",
                      borderRadius: "4px",
                      paddingX: "10px",
                      paddingY: "2px",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      backgroundColor: styles.backGroundColorOnHover,
                      "&: hover": {
                        backgroundColor: "#F0F0F0",
                      },
                      cursor: "pointer",
                      height: "30px",
                    }}
                  >
                    <BootstrapInput
                      // type="number"
                      inputProps={{
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                        tabIndex: 2,
                      }}
                      value={max}
                      onChange={handleChangeMax}
                      onClick={onClickInputMax}
                      onKeyDown={handleKeyDown}
                      sx={{
                        color: styles.defaultTextColor,
                        fontWeight: "600",
                      }}
                      placeholder="Max"
                    />
                  </Stack>
                </Stack>
                {searchModalData.isMinValidation && (
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
                    Min value shouldn't be more than Max value
                  </Typography>
                )}
                {searchModalData.isMaxValidation && (
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
                    Max value shouldn't be less than Min value
                  </Typography>
                )}
              </>
            )}
          </Stack>

          <Stack
            direction="row"
            onClick={onClickIsEmployeeUnknown}
            spacing={1}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              paddingX: "13px",
              minHeight: "38.18px",
              cursor: "pointer",
              borderRadius: "5px",
              backgroundColor: isEmployeeUnknown
                ? "#ffffff"
                : styles.backGroundColorOnHover,
              border: "1px solid",
              borderColor: isEmployeeUnknown
                ? styles.borderColor1
                : styles.borderColor2,

              "&:hover": {
                border: "1px solid",
                borderColor: "#146EF6",
                backgroundColor: "#ffffff",
              },
            }}
          >
            {isEmployeeUnknown ? (
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
              # of employees is unknown
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
export default EmployeesModal;
