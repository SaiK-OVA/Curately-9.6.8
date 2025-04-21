import { useContext } from "react";
import  {React, useState, useRef } from "../../../../../../../../shared/modules/React";
import {
  Autocomplete,
  // Chip, 
  debounce,
  // InputBase,  
  // styled,  
  // Typography,
} from "@mui/material";
import {TextField} from "../../../../../../../../shared/modules/MaterialImports/TextField";
import {Stack} from "../../../../../../../../shared/modules/MaterialImports/Stack";
import {CircularProgress} from "../../../../../../../../shared/modules/MaterialImports/CircularProgress";
import {Box} from "../../../../../../../../shared/modules/MaterialImports/Box";
// import { ModalStore, Store } from "../../../DataLabs/DataLabs";
import { ModalStore} from "../../../DataLabs/DataLabs";
import styles from "./../../../../shared/config/variables.module.scss";
import apiService from "../../../../shared/api/apiService";

// const BootstrapInput = styled(InputBase)(() => ({
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

const SkillsModal = () => {
  const [searchModalData, setSearchModalData] = useContext(ModalStore);

  const [isSkillsLoader, setIsSkillsLoader] = useState(false);

  const defSkillsData = searchModalData.skillsIn.map((name: any) => {
    return { name: name, count: 999 };
  });
  const [defSkills, setDefSkills] = useState(defSkillsData);

  const [skillsSuggestions, setSkillsSuggestions] = useState<any[]>([]);

  const handleChangeSkills = (event: any, value: any) => {
    console.log("skills value", value);
    setSearchModalData((prevSearchData: any) => ({
      ...prevSearchData,
      autoSkillsList: value,
    }));
    if (value.length > 0) {
      const selectedOptions: any[] = [];

      value.forEach((option: any) => {
        const optionName = option && option.name ? option.name : option;
        if (!selectedOptions.includes(optionName)) {
          selectedOptions.push(optionName);
        }
      });

      const updatedSkillsTitles = searchModalData.skillsIn
        .filter((title: string) => !selectedOptions.includes(title))
        .concat(selectedOptions);

      if (event.key === "Enter" && value.length > 0) {
        setSearchModalData((prevSearchData: any) => ({
          ...prevSearchData,
          skillsIn: updatedSkillsTitles,
        }));
      }

      if (selectedOptions.length === updatedSkillsTitles.length) {
        setSearchModalData((prevSearchData: any) => ({
          ...prevSearchData,
          skillsIn: updatedSkillsTitles,
        }));
      } else {
        updatedSkillsTitles.shift();
        setSearchModalData((prevSearchData: any) => ({
          ...prevSearchData,
          skillsIn: updatedSkillsTitles,
        }));
      }
    } else {
      setSearchModalData((prevSearchData: any) => ({
        ...prevSearchData,
        skillsIn: [],
      }));
    }
  };

  let searchSkillsQuery = useRef<any>(null);

  const sendSkillsRequest = (str: string) => {
    searchSkillsQuery.current = str ? `${str}` : searchSkillsQuery.current;
    // send value to the backend
    console.log(str, "str", searchSkillsQuery.current);
    let dataToPass = {
      field: "skill",
      text: str ? str : searchSkillsQuery.current,
    };

    apiService
      .getSuggessions(dataToPass)
      .then((response: any) => {
        if (response.status === 200) {
          setIsSkillsLoader(false);
          if (response.data.data && response.data.data.length) {
            setSkillsSuggestions(response.data.data);
          }
        }
      })
      .catch((error: any) => {
        console.log("error", error);
      });
  };

  const debouncedSendRequestSkills = debounce(sendSkillsRequest, 500);

  const getSkillsData = (str: string) => {
    debouncedSendRequestSkills(str);
  };

  // const onChangeSkills = (e: any) => {
  //   const value = e.target.value;
  //   console.log("value", value);
  //   // setDefSkills(value);

  //   if (e.key === "Enter") {
  //     setSearchModalData((prevSearchData: any) => ({
  //       ...prevSearchData,
  //       skillsIn: [...prevSearchData.skillsIn, value],
  //     }));
  //   }
  // };

  // const deleteSkills = (option: any, index: any) => {
  //   console.log("options", option, index);
  //   searchModalData.skillsIn.splice(index, 1);

  //   setSearchModalData((prevSearchData: any) => ({
  //     ...prevSearchData,
  //     skillsIn: searchModalData.skillsIn,
  //   }));
  // };

  //console.log('skillssss', searchModalData.skillsIn)

  React.useEffect(() => {
    console.log("work 1");
    if (searchModalData.skillsIn.length === 0) {
      console.log("work 2");
      setDefSkills([]);
    }
  }, [searchModalData.skillsIn]);

  return (
    // <Stack p={1} className={selectEmail ? 'expanded' : ''} onClick={handleSelect}>
    //     <Box className='left-containers-align'>
    //         <Box className='left-containers-align'>
    //             <MarkEmailUnreadOutlinedIcon className='list-icon' sx={{ fontSize: '24px', }} />
    //             <Typography component='p' className='menu-title'>Email Status</Typography>
    //         </Box>
    //         <Box className='left-containers-dropdown'>
    //             <ArrowDropDownIcon sx={{ display: selectEmail ? 'none' : 'block' }} />
    //             <ArrowDropUpIcon sx={{ display: selectEmail ? 'block' : 'none' }} />
    //         </Box>
    //     </Box>
    //     <Box sx={{ display: selectEmail ? 'block' : 'none', height: '200px' }}>
    //         Email Status DropDown
    //     </Box>
    // </Stack>
    (<Stack
      sx={{
        // color: styles.blackcolor,
        // "&:hover": {
        //   color: styles.primaryTextColor,
        // },
        paddingX: "21.75px",
        paddingBottom: "10px",
      }}
      // className={selectJobTitle ? "expanded" : ""}
    >
      <Stack
        sx={{
          color: styles.blackcolor,
          "&:hover": {
            color: styles.primaryTextColor,
          },
        }}
      >
        <Box sx={{ color: styles.primaryTextColor }}>
          <Autocomplete
            noOptionsText={null}
            disablePortal
            multiple
            freeSolo
            size="small"
            loading={isSkillsLoader}
            loadingText="Searching..."
            options={skillsSuggestions}
            getOptionLabel={(option) => option.name}
            onInputChange={(event, newInputValue) => {
              setIsSkillsLoader(true);
              getSkillsData(newInputValue);
            }}
            value={
              defSkillsData?.length === 0 && defSkills?.length === 0
                ? defSkills
                : defSkillsData
            }
            onChange={handleChangeSkills}
            // onKeyDown={(e: any) => handleKeyDownSkills(e)}
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
                      {isSkillsLoader ? (
                        <CircularProgress sx={{ color: "#146EF6" }} size={14} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
                placeholder={"Enter Skills..."}
              />
            )}
            renderOption={(props: object, option: any, state: object) => (
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
      </Stack>
    </Stack>)
  );
};
export default SkillsModal;
