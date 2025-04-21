// import * as React from "react";
// import { Box, Stack, Typography } from "@mui/material";
import { Box } from "../../../../../../../../shared/modules/MaterialImports/Box";
import { Stack } from "../../../../../../../../shared/modules/MaterialImports/Stack";
// import WidthFullOutlinedIcon from "@mui/icons-material/WidthFullOutlined";
// import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import styles from "./../../../../shared/config/variables.module.scss";
const Funding = () => {
  // const [selectFunding, setFunding] = React.useState(false)

  // const handleSelect = () => {
  //     setFunding(!selectFunding)
  // }

  return (
    // <Stack p={1} className={selectFunding ? 'expanded' : ''} onClick={handleSelect}>
    //     <Box className='left-containers-align'>
    //         <Box className='left-containers-align'>
    //             <WidthFullOutlinedIcon className='list-icon' sx={{ fontSize: '24px', }} />
    //             <Typography component='p' className='menu-title'>Funding</Typography>
    //         </Box>
    //         <Box className='left-containers-dropdown'>
    //             <ArrowDropDownIcon sx={{ display: selectFunding ? 'none' : 'block' }} />
    //             <ArrowDropUpIcon sx={{ display: selectFunding ? 'block' : 'none' }} />
    //         </Box>
    //     </Box>
    //     <Box sx={{ display: selectFunding ? 'block' : 'none', height: '200px' }}>
    //         Funding DropDown
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
        <Box sx={{ height: "200px", color: styles.primaryTextColor }}>
          {" "}
          DropDown Funding{" "}
        </Box>
      </Stack>
    </Stack>)
  );
};
export default Funding;
