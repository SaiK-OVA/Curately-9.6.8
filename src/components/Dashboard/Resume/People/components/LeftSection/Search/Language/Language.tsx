import { useContext } from "react";
import { React, useState, useRef } from "../../../../../../../../shared/modules/React";
import {
  // Chip,
  debounce,
  // InputBase,
  // styled,  
} from "@mui/material";
import { Box } from "../../../../../../../../shared/modules/MaterialImports/Box";
import { CircularProgress } from "../../../../../../../../shared/modules/MaterialImports/CircularProgress";
import { Stack } from "../../../../../../../../shared/modules/MaterialImports/Stack";
import { TextField } from "../../../../../../../../shared/modules/MaterialImports/TextField";
import { Store } from "../../../DataLabs/DataLabs";
import styles from "./../../../../shared/config/variables.module.scss";
import apiService from "../../../../shared/api/apiService";

import Popper from "@mui/material/Popper";
import Autocomplete from "@mui/material/Autocomplete";


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

function CustomPopper(props: any) {
  return <Popper {...props} placement="top" />;
}

const Language = () => {
  const [searchData, setSearchData] = useContext(Store);
  const defLanguagesData = searchData.languagesIn.map((name: any) => {
    return { name: name, count: 999 };
  });
  const [defLanguages, setDefLanguages] = useState(defLanguagesData);

  const [isLanguagesLoader, setIsLanguagesLoader] = useState(false);

  const [languagesSuggestions, setLanguagesSuggestions] = useState<any[]>([]);

  const handleChangeLanguages = (event: any, value: any) => {
    console.log("languages value", value);
    setSearchData((prevSearchData: any) => ({
      ...prevSearchData,
      autoLanguagesList: value,
    }));
    if (value.length > 0) {
      const selectedOptions: any[] = [];

      value.forEach((option: any) => {
        const optionName = option && option.name ? option.name : option;
        if (!selectedOptions.includes(optionName)) {
          selectedOptions.push(optionName);
        }
      });

      const updatedLanguagesTitles = searchData.languagesIn
        .filter((title: string) => !selectedOptions.includes(title))
        .concat(selectedOptions);

      if (event.key === "Enter" && value.length > 0) {
        setSearchData((prevSearchData: any) => ({
          ...prevSearchData,
          languagesIn: updatedLanguagesTitles,
        }));
      }

      if (selectedOptions.length === updatedLanguagesTitles.length) {
        setSearchData((prevSearchData: any) => ({
          ...prevSearchData,
          languagesIn: updatedLanguagesTitles,
        }));
      } else {
        updatedLanguagesTitles.shift();
        setSearchData((prevSearchData: any) => ({
          ...prevSearchData,
          languagesIn: updatedLanguagesTitles,
        }));
      }
    } else {
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        languagesIn: [],
      }));
    }
  };

  let searchLanguagesQuery = useRef<any>(null);

  const sendLanguagesRequest = (str: string) => {
    searchLanguagesQuery.current = str
      ? `${str}`
      : searchLanguagesQuery.current;
    // send value to the backend
    console.log(str, "str", searchLanguagesQuery.current);
    let dataToPass = {
      field: "language",
      text: str ? str : searchLanguagesQuery.current,
    };

    apiService
      .getSuggessions(dataToPass)
      .then((response: any) => {
        if (response.status === 200) {
          setIsLanguagesLoader(false);
          if (response.data.data && response.data.data.length) {
            setLanguagesSuggestions(response.data.data);
          }
        }
      })
      .catch((error: any) => {
        console.log("error", error);
      });
  };

  const debouncedSendRequestLanguages = debounce(sendLanguagesRequest, 500);

  const getLanguagesData = (str: string) => {
    debouncedSendRequestLanguages(str);
  };

  // const onChangeLanguages = (e: any) => {
  //   const value = e.target.value;
  //   console.log("value", value);
  //   // setDefLanguages(value);

  //   if (e.key === "Enter") {
  //     setSearchData((prevSearchData: any) => ({
  //       ...prevSearchData,
  //       languagesIn: [...prevSearchData.languagesIn, value],
  //     }));
  //   }
  // };

  // const deleteLanguages = (option: any, index: any) => {
  //   console.log("options", option, index);
  //   searchData.languagesIn.splice(index, 1);

  //   setSearchData((prevSearchData: any) => ({
  //     ...prevSearchData,
  //     languagesIn: searchData.languagesIn,
  //   }));
  // };

  React.useEffect(() => {
    if (searchData.languagesIn.length === 0) {
      setDefLanguages([]);
    }
  }, [searchData.languagesIn]);

  return (
    // <Stack p={1} className={selectLanguage ? 'expanded' : ''} onClick={handleSelect}>
    //     <Box className='left-containers-align'>
    //         <Box className='left-containers-align'>
    //             <PersonOutlineOutlinedIcon className='list-icon' sx={{ fontSize: '24px', }} />
    //             <Typography component='p' className='menu-title'>Language</Typography>
    //         </Box>
    //         <Box className='left-containers-dropdown'>
    //             <ArrowDropDownIcon sx={{ display: selectLanguage ? 'none' : 'block' }} />
    //             <ArrowDropUpIcon sx={{ display: selectLanguage ? 'block' : 'none' }} />
    //         </Box>
    //     </Box>
    //     <Box sx={{ display: selectLanguage ? 'block' : 'none', height: '200px' }}>
    //         Language DropDown
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
                    onDelete={() => deleteLanguages(option, index)}
                    label={option}
                    {...otherProps}
                  />
                );
              })
            }
            value={
              defLanguagesData.length === 0 && defLanguages.length === 0
                ? defLanguages
                : defLanguagesData
            }
            renderInput={(params) => (
              <TextField
                onKeyDown={onChangeLanguages}
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
                placeholder={"Enter Languages..."}
              />
            )}
          /> */}
          <Autocomplete
            noOptionsText={null}
            disablePortal
            freeSolo
            multiple
            size="small"
            loading={isLanguagesLoader}
            loadingText="Searching..."
            options={languagesSuggestions}
            getOptionLabel={(option) => option.name}
            onInputChange={(event, newInputValue) => {
              setIsLanguagesLoader(true);
              getLanguagesData(newInputValue);
            }}
            value={
              defLanguagesData?.length === 0 && defLanguages?.length === 0
                ? defLanguages
                : defLanguagesData
            }
            onChange={handleChangeLanguages}
            // onKeyDown={(e: any) => handleKeyDownLanguages(e)}
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
                      {isLanguagesLoader ? (
                        <CircularProgress sx={{ color: "#146EF6" }} size={14} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
                placeholder={"Enter Languages..."}
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
            PopperComponent={CustomPopper}
          />
        </Box>
      </Stack>
    </Stack>)
  );
};
export default Language;
