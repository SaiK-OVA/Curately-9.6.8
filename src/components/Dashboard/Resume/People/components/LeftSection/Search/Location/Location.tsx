import { React } from "../../../../../../../../shared/modules/React";
import { useContext } from "react";
import { Box } from "../../../../../../../../shared/modules/MaterialImports/Box";
import { CircularProgress } from "../../../../../../../../shared/modules/MaterialImports/CircularProgress";
import { Stack } from "../../../../../../../../shared/modules/MaterialImports/Stack";
import { Typography } from "../../../../../../../../shared/modules/MaterialImports/Typography";
// import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import styles from "./../../../../shared/config/variables.module.scss";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { FormControl, TextField } from '../../../../../../../../shared/modules/MaterialImports/FormInputs';
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import apiService from "../../../../shared/api/apiService";
import { debounce } from "@mui/material/utils";
import Autocomplete from "@mui/material/Autocomplete";
import { Store } from "../../../DataLabs/DataLabs";
import { SelectChangeEvent } from '@mui/material/Select';
import { Select } from '../../../../../../../../shared/modules/MaterialImports/FormElements';
import { MenuItem } from '../../../../../../../../shared/modules/MaterialImports/Menu';

const BootstrapInput = styled(InputBase)((
  // { theme }
) => ({
  "& .MuiInputBase-input": {
    // borderRadius: "3px",
    position: "relative",
    backgroundColor: "#ffffff",

    // border: "1px solid",
    // borderColor: styles.greyColor,
    fontSize: "14px",
    // innerHeight: "30px",
    width: "243px",

    // padding: "6px 167px 7px 10px",
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    paddingLeft: "13px",
    // "&:focus": {
    //   borderColor: styles.borderColor1,
    // },
    // "&:hover": {
    //   borderColor: styles.borderColor1,
    // },
  },
}));

const milesData = [
  {
    name: "within 5 miles",
    value: 5,
  },
  {
    name: "within 10 miles",
    value: 10,
  },
  {
    name: "within 20 miles",
    value: 20,
  },
  {
    name: "within 30 miles",
    value: 30,
  },
  {
    name: "within 40 miles",
    value: 40,
  },
  {
    name: "within 50 miles",
    value: 50,
  },
  {
    name: "within 75 miles",
    value: 75,
  },
  {
    name: "within 100 miles",
    value: 100,
  },
];

interface LocationProps {
  getZipCode: (value: any, value2: any) => void;
  getHqZipCode: (value: any, value2: any) => void;
  isFilterCleared?: boolean
}
const Location: React.FC<LocationProps> = ({ getZipCode, isFilterCleared, getHqZipCode }) => {
  // const [selectLocation, setLocation] = React.useState(false)

  // const handleSelect = () => {
  //     setLocation(!selectLocation)
  // }

  const [searchData, setSearchData] = useContext(Store);
  console.log(searchData, 'searchDatasearchData')
  const [miles, setMiles] = React.useState<any>("within 10 miles")
  const [hqMiles, setHqMiles] = React.useState<any>("within 10 miles")


  const [isContact, setIsContact] = React.useState(true);
  const onClickContact = () => {
    setIsContact(true);
    setIsAccount(false);
    setHqMiles("within 10 miles")
    setSearchData((prevSearchData: any) => {
      return {
        ...prevSearchData,
        hqzipcode: "",
        hqdistance: null
      }
    })
    getHqZipCode("", 25)
  };

  const [isAccount, setIsAccount] = React.useState(false);
  const onClickAccount = () => {
    setIsAccount(true);
    setIsContact(false);
    setMiles("within 10 miles")
    setSearchData((prevSearchData: any) => {
      return {
        ...prevSearchData,
        zipcode: "",
        distance: null
      }
    })
    getZipCode("", 25)
  };

  const [isRegion, setIsRegion] = React.useState((searchData.locations.length > 0 || searchData.locations_not_in.length > 0) ? true : false);

  const onClickRegion = () => {
    setIsRegion(true);
    setIsZip(false);
    setzipCodeVal("")
    setHqZipCodeVal("")
    setMiles("within 10 miles")
    setHqMiles("within 10 miles")
    setSearchData((prevSearchData: any) => {
      return {
        ...prevSearchData,
        zipcode: "",
        distance: null,
        hqzipcode: "",
        hqdistance: null
      }
    })
    getZipCode("", 25)
    getHqZipCode("", 25)
    console.log("is cominggg")
  };

  const [isExclude, setIsExclude] = React.useState(
    searchData.locations_not_in.length ? true : false
  );
  const onClickExclude = () => {
    setIsExclude(!isExclude);
  };

  const [isHqExclude, setIsHqExclude] = React.useState(
    searchData.hq_locations_not_in.length ? true : false
  );
  const onClickHqExclude = () => {
    setIsHqExclude(!isHqExclude);
  };

  const [isZip, setIsZip] = React.useState(searchData.zipcode !== "" || searchData.hqzipcode !== "" ? true : false);
  const onClickZip = () => {
    setIsZip(true);

    setIsRegion(false);
    setDefLocations([]);
    setDefNotLocation([])
    setDefHqLocations([])
    setDefNotHqLocation([])
    setSearchData((prevSearchData: any) => {
      return {
        ...prevSearchData,
        locations: [],
        locations_not_in: [],
        hq_locations: [],
        hq_locations_not_in: [],
      }
    })
  };

  // React.useEffect(() => {
  //   setSearchData((prevSearchData: any) => {
  //     return {
  //       ...prevSearchData,
  //       locations: [],
  //       zipcode: ""
  //     }
  //   })
  //   getZipCode("", miles)
  // }, [isZip, isRegion])

  React.useEffect(() => {
    console.log(searchData.zipcode, 'searchData.zipcode')
    if (searchData.zipcode === "")
      setzipCodeVal("")
  }, [searchData.zipcode])

  React.useEffect(() => {
    console.log(searchData.hqzipcode, 'searchData.hqzipcode')
    if (searchData.hqzipcode === "")
      setHqZipCodeVal("")
  }, [searchData.hqzipcode])

  const [isMiles, setIsMiles] = React.useState(false);
  // const onClickMiles = () => {
  //   setIsMiles(!isMiles);
  // };

  const [top100Films, setRecordsData] = React.useState<any[] | never[]>([]);
  const [isAnyConatactLoader, setIsAnyConatactLoader] = React.useState(false)
  const [isNotAnyConatactLoader, setIsNotAnyConatactLoader] = React.useState(false)
  const [isAnyAccountLoader, setIsAnyAccountLoader] = React.useState(false)
  const [isNotAnyAccountLoader, setIsNotAnyAccountLoader] = React.useState(false)

  // const zipCodeData = searchData.zipcode
  const [zipCodeVal, setzipCodeVal] = React.useState(searchData.zipcode)
  const [hqZipCodeVal, setHqZipCodeVal] = React.useState(searchData.hqzipcode)
  const sendRequest = (str: string) => {
    // send value to the backend

    let dataToPass = {
      field: "location",
      text: str,
    };

    apiService.getSuggessions(dataToPass).then((response: any) => {
      // setTeamLeads(response.data);
      // console.log(response);

      if (response.status === 200) {
        setIsAnyConatactLoader(false)
        setIsNotAnyConatactLoader(false)
        setIsAnyAccountLoader(false)
        setIsNotAnyAccountLoader(false)
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

  // const [selectedOptionsContact, setSelectedOptionsContact] = React.useState(
  //   []
  // );

  // Load selected options from local storage on component mount
  // React.useEffect(() => {
  //   const savedOptions = localStorage.getItem("selectedOptionsContact");
  //   if (savedOptions) {
  //     setSelectedOptionsContact(JSON.parse(savedOptions));
  //   }
  // }, []);

  // Update selected options and save them to local storage
  const defLocationData = searchData.locations.map((name: any) => {
    return { name: name, count: 999 };
  });
  const [deflocations, setDefLocations] = React.useState(defLocationData);

  const defNotLocationData = searchData.locations_not_in.map((name: any) => {
    return { name: name, count: 999 };
  });
  const [defNotLocation, setDefNotLocation] =
    React.useState(defNotLocationData);

  const defLocationHqData = searchData.hq_locations.map((name: any) => {
    return { name: name, count: 888 };
  });
  const [defhqlocations, setDefHqLocations] = React.useState(defLocationHqData);

  const defNotHqLocationData = searchData.hq_locations_not_in.map(
    (name: any) => {
      return { name: name, count: 999 };
    }
  );
  const [defNotHqLocation, setDefNotHqLocation] =
    React.useState(defNotHqLocationData);

  // const [selectedOptionsAccount, setSelectedOptionsAccount] = React.useState(
  //   []
  // );

  const handleAutocompleteChangeContact = (event: any, value: any) => {
    // debugger;
    if (value.length > 0) {
      // const selectedOptions = value.map((option: any) => option.name);

      // const selectedOptions = value.map((option: any) => (option && option.name ? option.name : option));
      // debugger

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

      const updatedLocation = searchData.locations
        .filter((title: string) => !selectedOptions.includes(title))
        .concat(selectedOptions);

      // console.log(value.length)
      // console.log(selectedOptions.length)
      // console.log(updatedLocation.length)

      // if (event.key === 'Enter' && value.length > 0) {
      //   setSearchData((prevSearchData: any) => ({
      //     ...prevSearchData,
      //     locations: updatedLocation,
      //   }));
      // }

      if (selectedOptions.length === updatedLocation.length) {
        setSearchData((prevSearchData: any) => ({
          ...prevSearchData,
          locations: updatedLocation,
        }));
      } else {
        updatedLocation.shift();
        setSearchData((prevSearchData: any) => ({
          ...prevSearchData,
          locations: updatedLocation,
        }));
      }
    } else {
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        locations: [],
      }));
    }

    // if (value.length > 0) {
    //   const selectedOptions = value.map((option: any) => option.name);

    //   // Remove selected options from locations
    //   const updatedLocation = searchData.locations
    //     .filter((title: string) => !selectedOptions.includes(title))
    //     .concat(selectedOptions);

    //   if (selectedOptions.length === updatedLocation.length) {
    //     setSearchData((prevSearchData: any) => ({
    //       ...prevSearchData,
    //       locations: updatedLocation,
    //     }));
    //   } else {
    //     updatedLocation.shift();
    //     setSearchData((prevSearchData: any) => ({
    //       ...prevSearchData,
    //       locations: updatedLocation,
    //     }));
    //   }

    //   // Remove selected options from locations_not_in
    //   const updatedExcludeLocation = searchData.locations_not_in.filter(
    //     (location: string) => !selectedOptions.includes(location)
    //   );

    //   setSearchData((prevSearchData: any) => ({
    //     ...prevSearchData,
    //     locations_not_in: updatedExcludeLocation,
    //   }));
    // } else {
    //   setSearchData((prevSearchData: any) => ({
    //     ...prevSearchData,
    //     locations: [],
    //   }));
    // }
  };

  const excludeJoblocation = (event: any, value: any) => {
    if (value.length > 0) {
      // const selectedOptions = value.map((option: any) => option.name);

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

      const updatedLocation = searchData.locations_not_in
        .filter((location: string) => !selectedOptions.includes(location))
        .concat(selectedOptions);

      // console.log(value.length)
      // console.log(selectedOptions.length)
      // console.log(updatedLocation.length)

      // if (event.key === 'Enter' && value.length > 0) {
      //   setSearchData((prevSearchData: any) => ({
      //     ...prevSearchData,
      //     locations_not_in: updatedLocation,
      //   }));
      // }

      if (selectedOptions.length === updatedLocation.length) {
        setSearchData((prevSearchData: any) => ({
          ...prevSearchData,
          locations_not_in: updatedLocation,
        }));
      } else {
        updatedLocation.shift();
        setSearchData((prevSearchData: any) => ({
          ...prevSearchData,
          locations_not_in: updatedLocation,
        }));
      }
    } else {
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        locations_not_in: [],
      }));
    }

    // if (value.length > 0) {
    //   const selectedOptions = value.map((option: any) => option.name);

    //   // Remove selected options from locations_not_in
    //   const updatedLocation = searchData.locations_not_in
    //     .filter((location: string) => !selectedOptions.includes(location))
    //     .concat(selectedOptions);

    //   if (selectedOptions.length === updatedLocation.length) {
    //     setSearchData((prevSearchData: any) => ({
    //       ...prevSearchData,
    //       locations_not_in: updatedLocation,
    //     }));
    //   } else {
    //     updatedLocation.shift();
    //     setSearchData((prevSearchData: any) => ({
    //       ...prevSearchData,
    //       locations_not_in: updatedLocation,
    //     }));
    //   }
    // } else {
    //   setSearchData((prevSearchData: any) => ({
    //     ...prevSearchData,
    //     locations_not_in: [],
    //   }));
    // }
  };

  // const [selectedOptionsAccount, setSelectedOptionsAccount] = React.useState(
  //   []
  // );

  // Load selected options from local storage on component mount
  // React.useEffect(() => {
  //   const savedOptions = localStorage.getItem("selectedOptionsAccount");
  //   if (savedOptions) {
  //     setSelectedOptionsAccount(JSON.parse(savedOptions));
  //   }
  // }, []);

  // Update selected options and save them to local storage
  const handleAutocompleteChangeAccount = (event: any, value: any) => {
    if (value.length > 0) {
      // const selectedOptions = value.map((option: any) => option.name);

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

      const updatedHqLocation = searchData.hq_locations
        .filter((hqlocations: string) => !selectedOptions.includes(hqlocations))
        .concat(selectedOptions);

      // console.log(value.length)
      // console.log(selectedOptions.length)
      // console.log(updatedHqLocation.length)

      // if (event.key === 'Enter' && value.length > 0) {
      //   setSearchData((prevSearchData: any) => ({
      //     ...prevSearchData,
      //     hq_locations: updatedHqLocation,
      //   }));
      // }

      if (selectedOptions.length === updatedHqLocation.length) {
        setSearchData((prevSearchData: any) => ({
          ...prevSearchData,
          hq_locations: updatedHqLocation,
        }));
      } else {
        updatedHqLocation.shift();
        setSearchData((prevSearchData: any) => ({
          ...prevSearchData,
          hq_locations: updatedHqLocation,
        }));
      }
    } else {
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        hq_locations: [],
      }));
    }
  };

  const excludeJobHqlocation = (event: any, value: any) => {
    if (value.length > 0) {
      // const selectedOptions = value.map((option: any) => option.name);

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

      const updatedHqLocation = searchData.hq_locations_not_in
        .filter((hqlocation: string) => !selectedOptions.includes(hqlocation))
        .concat(selectedOptions);

      // console.log(value.length)
      // console.log(selectedOptions.length)
      // console.log(updatedHqLocation.length)

      // if (event.key === 'Enter' && value.length > 0) {
      //   setSearchData((prevSearchData: any) => ({
      //     ...prevSearchData,
      //     hq_locations_not_in: updatedHqLocation,
      //   }));
      // }

      if (selectedOptions.length === updatedHqLocation.length) {
        setSearchData((prevSearchData: any) => ({
          ...prevSearchData,
          hq_locations_not_in: updatedHqLocation,
        }));
      } else {
        updatedHqLocation.shift();
        setSearchData((prevSearchData: any) => ({
          ...prevSearchData,
          hq_locations_not_in: updatedHqLocation,
        }));
      }
    } else {
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        hq_locations_not_in: [],
      }));
    }

    // if (value.length > 0) {
    //   const selectedOptions = value.map((option: any) => option.name);

    //   // Remove selected options from locations_not_in
    //   const updatedLocation = searchData.locations_not_in
    //     .filter((location: string) => !selectedOptions.includes(location))
    //     .concat(selectedOptions);

    //   if (selectedOptions.length === updatedLocation.length) {
    //     setSearchData((prevSearchData: any) => ({
    //       ...prevSearchData,
    //       locations_not_in: updatedLocation,
    //     }));
    //   } else {
    //     updatedLocation.shift();
    //     setSearchData((prevSearchData: any) => ({
    //       ...prevSearchData,
    //       locations_not_in: updatedLocation,
    //     }));
    //   }
    // } else {
    //   setSearchData((prevSearchData: any) => ({
    //     ...prevSearchData,
    //     locations_not_in: [],
    //   }));
    // }
  };
  React.useEffect(() => {
    // getSearchData("");
  }, []);

  const handleZipCodeChange = (e: any) => {
    // if (e.target.value.length == 5) {
    //   setSearchData((prevSearchData: any) => {
    //     return {
    //       ...prevSearchData,
    //       zipcode: e.target.value,
    //       distance: miles
    //     }
    //   })
    // }
    getZipCode(e.target.value, miles)

  }

  const handleHqZipCodeChange = (e: any) => {

    getHqZipCode(e.target.value, hqMiles)

  }

  const handleMilesChange = (event: SelectChangeEvent) => {
    setMiles(event.target.value);
    getZipCode(zipCodeVal, event.target.value)
    setSearchData((prevSearchData: any) => {
      return {
        ...prevSearchData,
        distance: event.target.value
      }
    })
  };

  const handleHqMilesChange = (event: SelectChangeEvent) => {
    setHqMiles(event.target.value);
    getHqZipCode(hqZipCodeVal, event.target.value)
    setSearchData((prevSearchData: any) => {
      return {
        ...prevSearchData,
        hqdistance: event.target.value
      }
    })
  };

  React.useEffect(() => {
    if (hqZipCodeVal) {
      setIsContact(false)
      setIsAccount(true)
    }
  }, []);

  return (
    // <Stack p={1} className={selectLocation ? 'expanded' : ''} onClick={handleSelect}>
    //     <Box className='left-containers-align'>
    //         <Box className='left-containers-align'>
    //             <LocationOnOutlinedIcon className='list-icon' sx={{ fontSize: '24px', }} />
    //             <Typography component='p' className='menu-title'>Location</Typography>
    //         </Box>
    //         <Box className='left-containers-dropdown'>
    //             <ArrowDropDownIcon sx={{ display: selectLocation ? 'none' : 'block' }} />
    //             <ArrowDropUpIcon sx={{ display: selectLocation ? 'block' : 'none' }} />
    //         </Box>
    //     </Box>
    //     <Box sx={{ display: selectLocation ? 'block' : 'none', height: '200px' }}>
    //         Location DropDown
    //     </Box>
    // </Stack>
    <Stack>
      <Stack
        sx={{
          color: styles.blackcolor,
          // "&:hover": {
          //   color: styles.primaryTextColor,
          // },
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingBottom: "10px",
          gap: "9px",
        }}
      >
        {/* <Box sx={{ height: "200px", color: styles.primaryTextColor }}>
          {" "}
          DropDown Location{" "}
        </Box> */}
        <Stack
          sx={{
            width: "95%",
            height: "34px",
            // display: "flex",
            display: "none",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Stack
            onClick={onClickContact}
            sx={{
              cursor: "pointer",
              "&:hover": {
                borderBottom: "1px solid",
                borderBottomColor: styles.borderColor1,
                color: styles.primaryTextColor,
              },
              color: isContact
                ? styles.primaryTextColor
                : styles.defaultTextColor,
              borderBottom: isContact ? "1px solid" : "1px solid",
              borderBottomColor: isContact
                ? styles.borderColor1
                : styles.borderColor2,
              display: "flex ",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: "50%",
              height: "100%",
            }}
          >
            <PersonOutlineOutlinedIcon
              sx={{ fontSize: "16px", marginRight: "7px" }}
            />
            <Typography
              sx={{
                fontFamily:
                  'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              Contact
            </Typography>
          </Stack>
          <Stack
            onClick={onClickAccount}
            sx={{
              cursor: "pointer",
              "&:hover": {
                borderBottom: "1px solid",
                borderBottomColor: styles.borderColor1,
                color: styles.primaryTextColor,
              },
              color: isAccount
                ? styles.primaryTextColor
                : styles.defaultTextColor,
              borderBottom: isAccount ? "1px solid" : "1px solid",
              borderBottomColor: isAccount
                ? styles.borderColor1
                : styles.borderColor2,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: "50%",
              height: "100%",
            }}
          >
            <ApartmentOutlinedIcon
              sx={{ fontSize: "16px", marginRight: "7px" }}
            />
            <Typography
              sx={{
                fontFamily:
                  'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              Account HQ
            </Typography>
          </Stack>
        </Stack>
        {isContact && (
          <Stack
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              // paddingX: "22px",
              gap: "9px",
            }}
          >
            <Stack
              onClick={onClickRegion}
              sx={{
                cursor: "pointer",
                borderRadius: "5px",
                width: "268px",
                gap: "10px",
                minHeight: "38px",
                border: "1px solid",
                borderColor: isRegion
                  ? styles.borderColor1
                  : styles.borderColor2,
                backgroundColor: isRegion
                  ? "#ffffff"
                  : styles.backGroundColorOnHover,
                "&:hover": {
                  backgroundColor: "#ffffff",
                  borderColor: styles.borderColor1,
                },
              }}
            >
              <Stack sx={{ padding: "10px 13px", gap: "10px" }}>
                <Stack spacing={1} direction="row">
                  {isRegion ? (
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
                    Select Region
                  </Typography>
                </Stack>
                {isRegion && (
                  <>
                    <Stack>
                      <Typography
                        sx={{
                          textAlign: "left",
                          fontFamily:
                            'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                          color: styles.defaultTextColor,
                          fontSize: "14px",
                          fontWeight: "600",
                          marginBottom: "5px",
                        }}
                      >
                        City/State/Country/Zip
                      </Typography>
                      <Autocomplete
                        className="auto-comp"
                        freeSolo
                        multiple
                        size="small"
                        id="location"
                        options={top100Films}
                        loading={isAnyConatactLoader}
                        loadingText="Searching..."
                        getOptionLabel={(option) => option.name}
                        // defaultValue={deflocations}
                        value={
                          defLocationData.length === 0 &&
                            deflocations.length === 0
                            ? deflocations
                            : defLocationData
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
                                  {isAnyConatactLoader ? (
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
                              defLocationData.length === 0 &&
                                deflocations.length === 0
                                ? "Enter Location..."
                                : ""
                            }
                          />
                        )}
                        onInputChange={(event, newInputValue) => {
                          setIsAnyConatactLoader(true);
                          getSearchData(newInputValue);
                        }}
                        // value={selectedOptionsContact}
                        onChange={handleAutocompleteChangeContact}
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
                      {/* <CustomizedAutoComplete placeholder={"Enter Location..."} /> */}
                    </Stack>
                    <Stack
                      onClick={onClickExclude}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        cursor: "pointer",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily:
                            'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                          color: styles.primaryTextColor,
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        Exclude locations
                      </Typography>
                      {isExclude ? (
                        <ArrowDropUpIcon
                          sx={{ color: styles.primaryTextColor }}
                        />
                      ) : (
                        <ArrowDropDownIcon
                          sx={{ color: styles.primaryTextColor }}
                        />
                      )}
                    </Stack>
                    {isExclude && (
                      <Stack>
                        <Typography
                          sx={{
                            textAlign: "left",
                            fontFamily:
                              'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            color: styles.defaultTextColor,
                            fontSize: "14px",
                            fontWeight: "600",
                            marginBottom: "5px",
                          }}
                        >
                          City/State/Country to exclude:
                        </Typography>
                        <Autocomplete
                          className="auto-comp"
                          freeSolo
                          multiple
                          size="small"
                          loading={isNotAnyAccountLoader}
                          loadingText="Searching..."
                          id="exclude-location"
                          options={top100Films}
                          getOptionLabel={(option) => option.name}
                          // defaultValue={defNotLocation}
                          value={
                            defNotLocationData.length === 0 &&
                              defNotLocation.length === 0
                              ? defNotLocation
                              : defNotLocationData
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
                                    {isNotAnyConatactLoader ? (
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
                                defNotLocationData.length === 0 &&
                                  defNotLocation.length === 0
                                  ? "Enter Locations to exclude..."
                                  : ""
                              }
                            />
                          )}
                          onInputChange={(event, newInputValue) => {
                            setIsNotAnyConatactLoader(true);
                            getSearchData(newInputValue);
                          }}
                          // onChange={handleAutocompleteChange}
                          onChange={excludeJoblocation}
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
                        {/* <CustomizedAutoComplete
                        placeholder={"Enter Locations to exclude..."}
                      /> */}
                      </Stack>
                    )}
                  </>
                )}
              </Stack>
            </Stack>
            <Stack
              onClick={onClickZip}
              sx={{
                cursor: "pointer",
                borderRadius: "5px",
                width: "268px",
                minHeight: "38px",
                border: "1px solid",
                borderColor: isZip ? styles.borderColor1 : styles.borderColor2,
                backgroundColor: isZip
                  ? "#ffffff"
                  : styles.backGroundColorOnHover,
                "&:hover": {
                  backgroundColor: "#ffffff",
                  borderColor: styles.borderColor1,
                },
              }}
            >
              <Stack sx={{ padding: "10px 13px", gap: "10px" }}>
                <Stack direction="row" spacing={1}>
                  {isZip ? (
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
                    Select ZIP code radius
                  </Typography>
                </Stack>
                {isZip && (
                  <>
                    <Stack>
                      <Typography
                        sx={{
                          textAlign: "left",
                          fontFamily:
                            'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                          color: styles.defaultTextColor,
                          fontSize: "14px",
                          fontWeight: "600",
                          marginBottom: "5px",
                        }}
                      >
                        Address/City/ZIP
                      </Typography>
                      <Stack
                        sx={{
                          // height: "30px",
                          // overflow: "auto",
                          border: "1px solid",
                          borderRadius: "3px",
                          borderColor: styles.greyColor,
                          width: "243px",

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

                            "& .MuiInputBase-input": {
                              borderRadius: "3px",
                            },

                            "& .MuiInputBase-input::placeholder": {
                              opacity: 0.8,
                              color: "#737373",
                            },
                          }}
                          placeholder="e.g. 91405"
                          value={zipCodeVal}
                          onChange={(e) => {
                            handleZipCodeChange(e);
                            setzipCodeVal(e.target.value);
                          }}
                        />
                      </Stack>
                    </Stack>
                    <Box sx={{ width: "100%" }}>
                      <FormControl
                        sx={{
                          m: 0,
                          width: "100%",
                          "&:hover": {
                            borderColor: styles.borderColor1,
                          },
                        }}
                      >
                        <Select
                          value={miles || ""}
                          onChange={handleMilesChange}
                          size="small"
                          displayEmpty
                          inputProps={{
                            "aria-label": "Select distance in miles",
                          }}
                          renderValue={(selected) => {
                            if (selected.toString() == "25") {
                              return (
                                <span
                                  style={{ color: styles.placeholderTextColor }}
                                >
                                  {`Select distance in miles`}
                                </span>
                              );
                            }
                            return (
                              milesData.find((mile) => mile.value.toString() === selected.toString())
                                ?.name || selected
                            );
                          }}
                          sx={{
                            width: "100%",
                            textAlign: "left",
                            fontFamily:
                              'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            fontSize: "14px",
                            fontWeight: "600",
                            color: styles.defaultTextColor,
                          }}
                        >

                          {milesData.map((mile: any) => (
                            <MenuItem
                              key={mile.value}
                              value={mile.value}
                              sx={{
                                color: styles.defaultTextColor,
                                fontFamily:
                                  'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                fontSize: "14px",
                                fontWeight: "600",
                              }}
                            >
                              {mile.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                    {/* <Stack
                      onClick={onClickMiles}
                      sx={{
                        padding: "0px 13px",
                        cursor: "pointer",
                        backgroundColor: "#ffffff",
                        borderRadius: "3px",
                        border: "1px solid",
                        borderColor: isMiles
                          ? styles.borderColor1
                          : styles.greyColor,
                        "&: hover": {
                          borderColor: styles.borderColor1,
                        },
                        height: "30px",
                        width: "243px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                       <Typography
                        sx={{
                          color: styles.defaultTextColor,
                          fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                          fontSize: "14px",
                          fontWeight: "600",
                          paddingLeft: "13px",
                        }}
                      >
                        Within 50 Miles
                      </Typography>

                      <ArrowDropDownIcon sx={{ color: "#737373" }} />
               
                    </Stack> */}
                    <Stack
                      sx={{
                        height: "56px",
                        // width: "241.5px",
                        padding: "12px 14px",
                        gap: "12px",
                        backgroundColor: "#F7F7F7",
                        // border: "1px solid #146EF6",
                        borderRadius: "3px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <HelpOutlineIcon sx={{ color: "#919191" }} />
                      <Typography
                        sx={{
                          fontFamily:
                            'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                          fontSize: "12px",
                          fontWeight: "400",
                          color: styles.defaultTextColor,
                        }}
                      >
                        This filter only applies to net new people, but not
                        existing contacts
                      </Typography>
                    </Stack>
                  </>
                )}
              </Stack>
            </Stack>
          </Stack>
        )}
        {isAccount && (
          <Stack
            sx={{
              // display: "flex",
              display: "none",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              // paddingX: "22px",
              gap: "9px",
            }}
          >
            <Stack
              onClick={onClickRegion}
              sx={{
                cursor: "pointer",
                borderRadius: "5px",
                width: "268px",
                gap: "10px",
                minHeight: "38px",
                border: "1px solid",
                borderColor: isRegion
                  ? styles.borderColor1
                  : styles.borderColor2,
                backgroundColor: isRegion
                  ? "#ffffff"
                  : styles.backGroundColorOnHover,
                "&:hover": {
                  backgroundColor: "#ffffff",
                  borderColor: styles.borderColor1,
                },
              }}
            >
              <Stack sx={{ padding: "10px 13px", gap: "10px" }}>
                <Stack spacing={1} direction="row">
                  {isRegion ? (
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
                    Select Region
                  </Typography>
                </Stack>
                {isRegion && (
                  <>
                    <Stack>
                      <Typography
                        sx={{
                          textAlign: "left",
                          fontFamily:
                            'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                          color: styles.defaultTextColor,
                          fontSize: "14px",
                          fontWeight: "600",
                          marginBottom: "5px",
                        }}
                      >
                        City/State/Country/Zip
                      </Typography>
                      <Autocomplete
                        className="auto-comp"
                        freeSolo
                        multiple
                        size="small"
                        id="hq-location"
                        options={top100Films}
                        loading={isAnyAccountLoader}
                        loadingText="Searching..."
                        getOptionLabel={(option) => option.name}
                        // defaultValue={defhqlocations}
                        value={
                          defLocationHqData.length === 0 &&
                            defhqlocations.length === 0
                            ? defhqlocations
                            : defLocationHqData
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
                                  {isAnyAccountLoader ? (
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
                              defLocationHqData.length === 0 &&
                                defhqlocations.length === 0
                                ? "Enter Location..."
                                : ""
                            }
                          />
                        )}
                        onInputChange={(event, newInputValue) => {
                          setIsAnyAccountLoader(true);
                          getSearchData(newInputValue);
                        }}
                        // value={selectedOptionsAccount}
                        onChange={handleAutocompleteChangeAccount}
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
                      {/* <CustomizedAutoComplete placeholder={"Enter Location..."} /> */}
                    </Stack>
                    <Stack
                      onClick={onClickHqExclude}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        cursor: "pointer",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily:
                            'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                          color: styles.primaryTextColor,
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        Exclude locations
                      </Typography>
                      {isHqExclude ? (
                        <ArrowDropUpIcon
                          sx={{ color: styles.primaryTextColor }}
                        />
                      ) : (
                        <ArrowDropDownIcon
                          sx={{ color: styles.primaryTextColor }}
                        />
                      )}
                    </Stack>
                    {isHqExclude && (
                      <Stack>
                        <Typography
                          sx={{
                            textAlign: "left",
                            fontFamily:
                              'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            color: styles.defaultTextColor,
                            fontSize: "14px",
                            fontWeight: "600",
                            marginBottom: "5px",
                          }}
                        >
                          City/State/Country to exclude:
                        </Typography>
                        <Autocomplete
                          className="auto-comp"
                          freeSolo
                          loading={isNotAnyAccountLoader}
                          loadingText="Searching..."
                          multiple
                          size="small"
                          id="hq-exclude-location"
                          options={top100Films}
                          getOptionLabel={(option) => option.name}
                          // defaultValue={defNotHqLocation}
                          value={
                            defNotHqLocationData.length === 0 &&
                              defNotHqLocation.length === 0
                              ? defNotHqLocation
                              : defNotHqLocationData
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
                                    {isNotAnyAccountLoader ? (
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
                                defNotHqLocationData.length === 0 &&
                                  defNotHqLocation.length === 0
                                  ? "Enter Locations to exclude..."
                                  : ""
                              }
                            />
                          )}
                          onInputChange={(event, newInputValue) => {
                            setIsNotAnyAccountLoader(true);
                            getSearchData(newInputValue);
                          }}
                          onChange={excludeJobHqlocation}
                          // onChange={handleAutocompleteChange}
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
                        {/* <CustomizedAutoComplete
                        placeholder={"Enter Locations to exclude..."}
                      /> */}
                      </Stack>
                    )}
                  </>
                )}
              </Stack>
            </Stack>
            <Stack
              onClick={onClickZip}
              sx={{
                cursor: "pointer",
                borderRadius: "5px",
                width: "268px",
                minHeight: "38px",
                border: "1px solid",
                borderColor: isZip ? styles.borderColor1 : styles.borderColor2,
                backgroundColor: isZip
                  ? "#ffffff"
                  : styles.backGroundColorOnHover,
                "&:hover": {
                  backgroundColor: "#ffffff",
                  borderColor: styles.borderColor1,
                },
              }}
            >
              <Stack sx={{ padding: "10px 13px", gap: "10px" }}>
                <Stack direction="row" spacing={1}>
                  {isZip ? (
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
                    Select ZIP code radius
                  </Typography>
                </Stack>
                {isZip && (
                  <>
                    <Stack>
                      <Typography
                        sx={{
                          textAlign: "left",
                          fontFamily:
                            'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                          color: styles.defaultTextColor,
                          fontSize: "14px",
                          fontWeight: "600",
                          marginBottom: "5px",
                        }}
                      >
                        Address/City/ZIP
                      </Typography>
                      <Stack
                        sx={{
                          // height: "30px",
                          // overflow: "auto",
                          border: "1px solid",
                          borderRadius: "3px",
                          borderColor: styles.greyColor,
                          width: "243px",

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
                            "& .MuiInputBase-input": {
                              borderRadius: "3px",
                            },
                            "& .MuiInputBase-input::placeholder": {
                              opacity: 0.8,
                              color: "#737373",
                            },
                          }}
                          placeholder="e.g. 91405"
                          value={hqZipCodeVal}
                          onChange={(e) => {
                            handleHqZipCodeChange(e);
                            setHqZipCodeVal(e.target.value);
                          }}
                        />
                      </Stack>
                    </Stack>
                    <Box sx={{ width: "100%" }}>
                      <FormControl
                        sx={{
                          m: 0,
                          width: "100%",
                          "&: hover": {
                            borderColor: styles.borderColor1,
                          },
                        }}
                      >
                        <Select
                          value={hqMiles}
                          onChange={handleHqMilesChange}
                          size="small"
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          sx={{
                            width: "100%",
                            textAlign: "left",
                            color: styles.defaultTextColor,
                            fontFamily:
                              'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                        >
                          {milesData.map((mile: any) => {
                            return (
                              <MenuItem
                                value={mile.value}
                                sx={{
                                  color: styles.defaultTextColor,
                                  fontFamily:
                                    'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                  fontSize: "14px",
                                  fontWeight: "600",
                                }}
                              >
                                {mile.name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </Box>
                    {/* <Stack
                      onClick={onClickMiles}
                      sx={{
                        cursor: "pointer",
                        backgroundColor: "#ffffff",
                        borderRadius: "3px",
                        border: "1px solid",
                        borderColor: isMiles
                          ? styles.borderColor1
                          : styles.greyColor,
                        "&: hover": {
                          borderColor: styles.borderColor1,
                        },
                        height: "30px",
                        width: "243px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          color: styles.defaultTextColor,
                          fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                          fontSize: "14px",
                          fontWeight: "600",
                          paddingLeft: "13px",
                        }}
                      >
                        Within 50 Miles
                      </Typography>

                  
                  </Stack> */}
                    <Stack
                      sx={{
                        height: "56px",
                        // width: "241.5px",
                        padding: "12px 14px",
                        gap: "12px",
                        backgroundColor: "#F7F7F7",
                        // border: "1px solid #146EF6",
                        borderRadius: "3px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <HelpOutlineIcon sx={{ color: "#919191" }} />
                      <Typography
                        sx={{
                          fontFamily:
                            'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                          fontSize: "12px",
                          fontWeight: "400",
                          color: styles.defaultTextColor,
                        }}
                      >
                        This filter only applies to net new people, but not
                        existing contacts
                      </Typography>
                    </Stack>
                  </>
                )}
              </Stack>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};
export default Location;
