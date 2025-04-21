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
//     position: "relative",
//     backgroundColor: "#ffffff",
//     fontSize: "14px",
//     width: "243px",
//     fontFamily:
//       'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
//     paddingLeft: "13px",
//   },
// }));

function CustomPopper(props: any) {
  return <Popper {...props} placement="top" />;
}

const Certification = () => {
  const [searchData, setSearchData] = useContext(Store);
  const defCertificationsData = searchData.certificationsIn.map((name: any) => {
    return { name: name, count: 999 };
  });
  const [defCertifications, setDefCertifications] = useState(
    defCertificationsData
  );

  const [isCertificationsLoader, setIsCertificationsLoader] = useState(false);

  const [certificationsSuggestions, setCertificationsSuggestions] = useState<
    any[]
  >([]);

  const handleChangeCertifications = (event: any, value: any) => {
    console.log("certifications value", value);
    setSearchData((prevSearchData: any) => ({
      ...prevSearchData,
      autoCertificationsList: value,
    }));
    if (value.length > 0) {
      const selectedOptions: any[] = [];

      value.forEach((option: any) => {
        const optionName = option && option.name ? option.name : option;
        if (!selectedOptions.includes(optionName)) {
          selectedOptions.push(optionName);
        }
      });

      const updatedCertificationsTitles = searchData.certificationsIn
        .filter((title: string) => !selectedOptions.includes(title))
        .concat(selectedOptions);

      if (event.key === "Enter" && value.length > 0) {
        setSearchData((prevSearchData: any) => ({
          ...prevSearchData,
          certificationsIn: updatedCertificationsTitles,
        }));
      }

      if (selectedOptions.length === updatedCertificationsTitles.length) {
        setSearchData((prevSearchData: any) => ({
          ...prevSearchData,
          certificationsIn: updatedCertificationsTitles,
        }));
      } else {
        updatedCertificationsTitles.shift();
        setSearchData((prevSearchData: any) => ({
          ...prevSearchData,
          certificationsIn: updatedCertificationsTitles,
        }));
      }
    } else {
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        certificationsIn: [],
      }));
    }
  };

  let searchCertificationsQuery = useRef<any>(null);

  const sendCertificationsRequest = (str: string) => {
    searchCertificationsQuery.current = str
      ? `${str}`
      : searchCertificationsQuery.current;
    // send value to the backend
    console.log(str, "str", searchCertificationsQuery.current);
    let dataToPass = {
      field: "certification",
      text: str ? str : searchCertificationsQuery.current,
    };

    apiService
      .getSuggessions(dataToPass)
      .then((response: any) => {
        if (response.status === 200) {
          setIsCertificationsLoader(false);
          if (response.data.data && response.data.data.length) {
            setCertificationsSuggestions(response.data.data);
          }
        }
      })
      .catch((error: any) => {
        console.log("error", error);
      });
  };

  const debouncedSendRequestCertifications = debounce(
    sendCertificationsRequest,
    500
  );

  const getCertificationsData = (str: string) => {
    debouncedSendRequestCertifications(str);
  };

  // const onChangeCertifications = (e: any) => {
  //   const value = e.target.value;
  //   console.log("value", value);
  //   // setDefCertifications(value);

  //   if (e.key === "Enter") {
  //     setSearchData((prevSearchData: any) => ({
  //       ...prevSearchData,
  //       certificationsIn: [...prevSearchData.certificationsIn, value],
  //     }));
  //   }
  // };

  // const deleteCertifications = (option: any, index: any) => {
  //   console.log("options", option, index);
  //   searchData.certificationsIn.splice(index, 1);

  //   setSearchData((prevSearchData: any) => ({
  //     ...prevSearchData,
  //     certificationsIn: searchData.certificationsIn,
  //   }));
  // };

  React.useEffect(() => {
    if (searchData.certificationsIn.length === 0) {
      setDefCertifications([]);
    }
  }, [searchData.certificationsIn]);

  return (
    <Stack
      sx={{
        paddingX: "21.75px",
        paddingBottom: "10px",
      }}
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
                    onDelete={() => deleteCertifications(option, index)}
                    label={option}
                    {...otherProps}
                  />
                );
              })
            }
            value={
              defCertificationsData.length === 0 && defCertifications.length === 0
                ? defCertifications
                : defCertificationsData
            }
            renderInput={(params) => (
              <TextField
                onKeyDown={onChangeCertifications}
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
                placeholder={"Enter Certifications..."}
              />
            )}
          /> */}

          <Autocomplete
            noOptionsText={null}
            disablePortal
            freeSolo
            multiple
            size="small"
            loading={isCertificationsLoader}
            loadingText="Searching..."
            options={certificationsSuggestions}
            getOptionLabel={(option) => option.name}
            onInputChange={(event, newInputValue) => {
              setIsCertificationsLoader(true);
              getCertificationsData(newInputValue);
            }}
            value={
              defCertificationsData?.length === 0 &&
                defCertifications?.length === 0
                ? defCertifications
                : defCertificationsData
            }
            onChange={handleChangeCertifications}
            // onKeyDown={(e: any) => handleKeyDownCertifications(e)}
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
                      {isCertificationsLoader ? (
                        <CircularProgress sx={{ color: "#146EF6" }} size={14} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
                placeholder={"Enter Certifications..."}
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
    </Stack>
  );
};
export default Certification;
