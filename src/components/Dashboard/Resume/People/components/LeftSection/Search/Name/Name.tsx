// import * as React, {ChangeEvent} from "react";
import  { useContext } from "react";
import  { React } from "../../../../../../../../shared/modules/React";
// import { Box, Stack, Typography, TextField } from "@mui/material";
import { Stack } from "../../../../../../../../shared/modules/MaterialImports/Stack";
// import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
// import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import styles from "./../../../../shared/config/variables.module.scss";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Store } from "../../../DataLabs/DataLabs";

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

const Name = () => {
  // const [selectName, setSelectName] = React.useState(false)

  // const handleSelect = () => {
  //     setSelectName(!selectName)
  // }
  const [searchData, setSearchData] = useContext(Store);
  const onChangeName = (e: any) => {
    setDefName(e.target.value);

    setSearchData((prevSearchData: any) => ({
      ...prevSearchData,
      full_name: e.target.value,
    }));

    console.log('aaaaaa', e.target.value)
  };

  // const defNameData = [{ "name": searchData.full_name, "count": 999 }];

  const [defName, setDefName] = React.useState(searchData.full_name);

  const handleAutocompleteChange = (event: any) => {
    console.log('event:', event.target.value);

    // if (event.key === "Enter") {
    setSearchData((prevSearchData: any) => ({
      ...prevSearchData,
      full_name: event.target.value,
    }));
    // }
    // console.log(value);
    // if (value.length > 0) {
    //   const selectedOptions = value.map((option: any) => option.name);

    //   const updatedPersonTitles = searchData.person_titles
    //     .filter((title: string) => !selectedOptions.includes(title))
    //     .concat(selectedOptions);

    //   // console.log(value.length)
    //   // console.log(selectedOptions.length)
    //   // console.log(updatedPersonTitles.length)

    //   if (selectedOptions.length === updatedPersonTitles.length) {
    //     setSearchData((prevSearchData: any) => ({
    //       ...prevSearchData,
    //       person_titles: updatedPersonTitles,
    //     }));
    //   } else {
    //     updatedPersonTitles.shift();
    //     setSearchData((prevSearchData: any) => ({
    //       ...prevSearchData,
    //       person_titles: updatedPersonTitles,
    //     }));
    //   }
    // } else {
    //   setSearchData((prevSearchData: any) => ({
    //     ...prevSearchData,
    //     person_titles: [],
    //   }));
    // }
  };

  React.useEffect(() => {
    if (searchData.full_name == "") {
      setDefName("");
    }
  }, [searchData.full_name]);
  return (
    // <Stack p={1} className={selectName ? 'expanded' : ''} onClick={handleSelect}>
    //     <Box className='left-containers-align'>
    //         <Box className='left-containers-align'>
    //             <AccountBoxOutlinedIcon className='list-icon' sx={{ fontSize: '24px' }} />
    //             <Typography component='p' className='menu-title'>Name</Typography>
    //         </Box>
    //         <Box className='left-containers-dropdown'>
    //             <ArrowDropDownIcon sx={{ display: selectName ? 'none' : 'block' }} />
    //             <ArrowDropUpIcon sx={{ display: selectName ? 'block' : 'none' }} />
    //         </Box>
    //     </Box>
    //     <Box sx={{ display: selectName ? 'block' : 'none', height: '200px' }}>
    //         Name DropDown
    //     </Box>
    // </Stack>
    (<Stack>
      <Stack
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
        {/* <Stack
          sx={{
            padding: "10px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Stack
            spacing={1}
            direction="row"
          >
            <AccountBoxOutlinedIcon
              sx={{
                fontSize: "24px",
                color: styles.primaryTextColor,
                paddingLeft: "8px",
              }}
            />
            <Typography
              variant="body1"
              className="menu-title"
            >
              Name
            </Typography>
          </Stack>
          <Stack>
            <ArrowDropUpIcon />
          </Stack>
        </Stack> */}
        <Stack
          sx={{
            // height: "30px",
            // overflow: "auto",
            border: "1px solid",
            borderRadius: "3px",
            borderColor: styles.greyColor,
            // width: "243px",

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
            spellCheck='false'
            value={defName}
            sx={{
              color: styles.defaultTextColor,
              fontWeight: "600",
              '& .MuiInputBase-input': {
                borderRadius: "3px",
              },
            }}
            // value={searchData.full_name}
            placeholder="Enter name..."
          // onKeyDown={onChangeName}
          // handleKeyDown={()=>handleAutocompleteChange}
          />
        </Stack>
      </Stack>
    </Stack>)
  );
};
export default Name;
