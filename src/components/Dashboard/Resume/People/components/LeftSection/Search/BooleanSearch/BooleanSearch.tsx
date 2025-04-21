import {React} from "../../../../../../../../shared/modules/React";
import { InputBase, styled } from "@mui/material";
import { Box } from "../../../../../../../../shared/modules/MaterialImports/Box";
import { Button } from "../../../../../../../../shared/modules/MaterialImports/Button";
import { CircularProgress } from "../../../../../../../../shared/modules/MaterialImports/CircularProgress";
import { Stack } from "../../../../../../../../shared/modules/MaterialImports/Stack";
import { Typography  } from "../../../../../../../../shared/modules/MaterialImports/Typography";
// import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
// import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import styles from "./../../../../shared/config/variables.module.scss";


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
    width: "242px",

    // padding: "6px 167px 7px 10px",
    fontFamily:
      'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    paddingLeft: "5px",
    // "&:focus": {
    //   borderColor: styles.borderColor1,
    // },
    // "&:hover": {
    //   borderColor: styles.borderColor1,
    // },
  },
}));

const BooleanSearch = () => {
  // const [selectBooleanSearch, setBooleanSearch] = React.useState(false)

  // const handleSelect = () => {
  //     setBooleanSearch(!selectBooleanSearch)
  // }

  const [booleanLoad, setBooleanLoad] = React.useState(false)


  return (
    // <Stack p={1} className={selectBooleanSearch ? 'expanded' : ''} onClick={handleSelect}>
    //     <Box className='left-containers-align'>
    //         <Box className='left-containers-align'>
    //             <AttachMoneyOutlinedIcon className='list-icon' sx={{ fontSize: '24px', }} />
    //             <Typography component='p' className='menu-title'>BooleanSearch</Typography>
    //         </Box>
    //         <Box className='left-containers-dropdown'>
    //             <ArrowDropDownIcon sx={{ display: selectBooleanSearch ? 'none' : 'block' }} />
    //             <ArrowDropUpIcon sx={{ display: selectBooleanSearch ? 'block' : 'none' }} />
    //         </Box>
    //     </Box>
    //     <Box sx={{ display: selectBooleanSearch ? 'block' : 'none', height: '200px' }}>
    //         BooleanSearch DropDown
    //     </Box>
    // </Stack>
    (<Stack>
      <Stack
        sx={{
          color: styles.blackcolor,
          padding : "8px 12px",
          "&:hover": {
            color: styles.primaryTextColor,
          },
        }}
      >
        <Box sx={{  color: styles.primaryTextColor }}>
                <Stack direction="column" spacing={1}>
                  <Stack>
                    <Typography
                      sx={{
                        textAlign: "left",
                        fontFamily:
                          'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        fontWeight: "600",
                        fontSize: "12px",
                        color: styles.defaultTextColor1,
                      }}
                    >
                      Search with Boolean Operators
                    </Typography>
                    <Stack
                      sx={{
                        height: "72px",
                        overflow: "hidden",
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
                        // onChange={onChangeName}
                        spellCheck="false"
                        // value={booleanValue}
                        sx={{
                          color: styles.defaultTextColor,
                          fontWeight: "600",
                          "& .MuiInputBase-input::placeholder": {
                            opacity: 0.8,
                            color: "#737373",
                          },
                        }}
                        placeholder="Enter job titles separated by AND/OR/AND NOT boolean operators
                  "
                        multiline
                      />
                    </Stack>
                    {/* <TextField
                      multiline
                      size="small"
                      placeholder="Enter job titles separated by AND/OR/AND NOT boolean operators"
                      rows={4}
                      
                    /> */}
                  </Stack>
                  <Stack>
                    <Typography
                      sx={{
                        textAlign: "left",
                        fontFamily:
                          'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        fontWeight: "400",
                        fontSize: "13PX",
                        color: "#1A1A1A",
                      }}
                    >
                      Correct syntax: sales AND "Product Design"; Sales OR
                      Design; Sales AND NOT Design.
                    </Typography>
                  </Stack>
                  <Stack>
                    <Button
                      disableRipple
                      variant="contained"
                      size="small"
                      // onClick={submitBoolean}
                      sx={{
                        backgroundColor: "#146EF6",
                        "&:hover": {
                          backgroundColor: "#146ef6",
                        },
                        fontFamily:
                          'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        fontWeight: "700",
                        fontSize: "14PX",
                        color: "#FFFFFF",
                      }}
                    >
                      {booleanLoad ? (
                        <>
                          Apply
                          <CircularProgress size={15} className="loaderIcon" />
                        </>
                      ) : (
                        <>
                          Apply
                          {/* {searchData.title_is_boolean && (
                            <CheckCircleOutlineIcon className="checkIcon" />
                          )} */}
                        </>
                      )}
                    </Button>
                  </Stack>
                </Stack>
        </Box>
      </Stack>
    </Stack>)
  );
};
export default BooleanSearch;
