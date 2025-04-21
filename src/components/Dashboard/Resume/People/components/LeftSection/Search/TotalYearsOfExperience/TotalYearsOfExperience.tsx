import { useContext } from "react";
import { useEffect, useState } from "../../../../../../../../shared/modules/React";
import { Stack} from "../../../../../../../../shared/modules/MaterialImports/Stack";
  import {Typography } from "../../../../../../../../shared/modules/MaterialImports/Typography";
import styles from "./../../../../shared/config/variables.module.scss";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
// import NumericInput from 'react-numeric-input';
import { Store } from "../../../DataLabs/DataLabs";

const BootstrapInput = styled(InputBase)(() => ({
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
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',

    // paddingLeft: "13px",
    // "&:focus": {
    //   borderColor: styles.borderColor1,
    // },
    // "&:hover": {
    //   borderColor: styles.borderColor1,
    // },
  },
}));

const TotalYearsOfExperience = () => {
  const [searchData, setSearchData] = useContext(Store);

  const [minYear, setMinYear] = useState<any>(searchData.minYear);
  const [maxYear, setMaxYear] = useState<any>(searchData.maxYear);


  const [minYearValidation, setMinYearValidation] = useState(false);
  const [maxYearValidation, setMaxYearValidation] = useState(false);

  const handleChangeMinYear = (e: any) => {

    // if (maxYear <= e.target.value) {
    //   if (maxYear > 0) {
    //     setSearchData((prevSearchData: any) => ({
    //       ...prevSearchData,
    //       maxYear: e.target.value,
    //     }));
    //   }

    // }
    console.log("min year", e.target.value)

    const stringValue = `${e.target.value}`
    setMinYear(e.target.value);
    if (stringValue.length <= 2) {
      const currMaxYear = maxYear
      
      if (currMaxYear) {
        if (Number(currMaxYear) > e.target.value) {  
          setSearchData((prevSearchData: any) => ({
            ...prevSearchData,
            minYear: e.target.value,
            maxYear: maxYear,
            isMinYearValidation: false,
            isMaxYearValidation: false,
          }));
        }
        else if(Number(currMaxYear) < e.target.value){
          setSearchData((prevSearchData: any) => ({
            ...prevSearchData,
            minYear: e.target.value,
            maxYear: maxYear,
            isMinYearValidation: true,
          }));
        }
        else {
          setSearchData((prevSearchData: any) => ({
            ...prevSearchData,
            minYear: e.target.value,
            isMinYearValidation: true,
            isMaxYearValidation: false,
          }));
        }
      } else {
        setSearchData((prevSearchData: any) => ({
          ...prevSearchData,
          minYear: e.target.value,
          maxYear: maxYear,
        }));
      }
      
      
    }

    if (stringValue.length === 0 || searchData.maxYear.length === 0) {
         setSearchData((prevSearchData: any) => ({
            ...prevSearchData,
            isMinYearValidation: false,
            isMaxYearValidation: false,
          }));
    }

    
  };

  const handleChangeMaxYear = (e: any) => {

    // if (minYear > e.target.value) {
    //   if (minYear > 0) {
    //     setSearchData((prevSearchData: any) => ({
    //       ...prevSearchData,
    //       minYear: e.target.value,
    //     }));
    //   }

    // }

    const stringValue = `${e.target.value}`
    if (stringValue.length <= 2) {
      setMaxYear(e.target.value);
      const currMinYear = searchData.minYear;
      if (currMinYear) {
        if (Number(currMinYear) < e.target.value) {
          
          setSearchData((prevSearchData: any) => ({
            ...prevSearchData,
            maxYear: e.target.value,
            minYear: minYear,
            isMinYearValidation: false,
            isMaxYearValidation: false,
          }));
        } else {
          setSearchData((prevSearchData: any) => ({
            ...prevSearchData,
            isMinYearValidation: false,
            isMaxYearValidation: true,
          }));
        }
      } else {
        setSearchData((prevSearchData: any) => ({
          ...prevSearchData,
          maxYear: e.target.value,
          minYear: minYear,
        }));
      }


      // setSearchData((prevSearchData: any) => ({
      //   ...prevSearchData,
      //   maxYear: e.target.value,
      // }));
    }

    if (stringValue.length === 0 || searchData.minYear.length > 0) {
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        maxYear: e.target.value,
      }));
    }

    if (stringValue.length === 0 || searchData.minYear.length === 0) {
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        isMinYearValidation: false,
        isMaxYearValidation: false,
      }));
    }
    
  };

  const handleKeyDownMin = (event: any) => {
    const numericKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const specialKeys = ["Backspace", "Delete", "Tab"];

    if (!numericKeys.includes(event.key) && !specialKeys.includes(event.key)) {
      event.preventDefault();
    }
  };

  const handleKeyDownMax = (event: any) => {
    const numericKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const specialKeys = ["Backspace", "Delete", "Tab"];

    if (!numericKeys.includes(event.key) && !specialKeys.includes(event.key)) {
      event.preventDefault();
    }
  };

  useEffect(() => {
    if (searchData.minYear === "") {
      setMinYear('')
    }
    if (searchData.maxYear === "") {
      setMaxYear("")
    }
  },[searchData.minYear, searchData.maxYear])


  return (
    // <Stack p={1} className={selectTotalYearsOfExperience ? 'expanded' : ''} onClick={handleSelect}>
    //     <Box className='left-containers-align'>
    //         <Box className='left-containers-align'>
    //             <PersonOutlineOutlinedIcon className='list-icon' sx={{ fontSize: '24px', }} />
    //             <Typography component='p' className='menu-title'>TotalYearsOfExperience</Typography>
    //         </Box>
    //         <Box className='left-containers-dropdown'>
    //             <ArrowDropDownIcon sx={{ display: selectTotalYearsOfExperience ? 'none' : 'block' }} />
    //             <ArrowDropUpIcon sx={{ display: selectTotalYearsOfExperience ? 'block' : 'none' }} />
    //         </Box>
    //     </Box>
    //     <Box sx={{ display: selectTotalYearsOfExperience ? 'block' : 'none', height: '200px' }}>
    //         TotalYearsOfExperience DropDown
    //     </Box>
    // </Stack>
    (<Stack>
      <Stack
        sx={{
          //   color: styles.blackcolor,
          //   "&:hover": {
          //     color: styles.primaryTextColor,
          //   },
          paddingX: "21.75px",
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
              width: "35%",
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
                min: 0,
              }}
              value={minYear}
              onChange={handleChangeMinYear}
              onKeyDown={handleKeyDownMin}
              sx={{
                color: styles.defaultTextColor,
                fontWeight: "600",
              }}
              placeholder="Min Year"
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
              width: "35%",
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
                min: 0,
              }}
              value={maxYear}
              onChange={handleChangeMaxYear}
              onKeyDown={handleKeyDownMax}
              sx={{
                color: styles.defaultTextColor,
                fontWeight: "600",
              }}
              placeholder="Max Year"
            />
          </Stack>
        </Stack>
        {searchData.isMinYearValidation && (
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
            Min year shouldn't be more than Max year
          </Typography>
        )}
        {searchData.isMaxYearValidation && (
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
            Max year shouldn't be less than Min year
          </Typography>
        )}
      </Stack>
    </Stack>)
  );
};
export default TotalYearsOfExperience;
