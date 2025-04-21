// import * as React from "react";
// import { Box, Stack, Typography } from "@mui/material";
import { Box } from "../../../../../../../../shared/modules/MaterialImports/Box";
import { Stack } from "../../../../../../../../shared/modules/MaterialImports/Stack";
// import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
// import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import styles from "./../../../../shared/config/variables.module.scss";
const JobPostings = () => {
  // const [selectJob, setJob] = React.useState(false)

  // const handleSelect = () => {
  //     setJob(!selectJob)
  // }

  return (
    // <Stack p={1} className={selectJob ? 'expanded' : ''} onClick={handleSelect}>
    //     <Box className='left-containers-align'>
    //         <Box className='left-containers-align'>
    //             <WorkOutlineOutlinedIcon className='list-icon' sx={{ fontSize: '24px', }} />
    //             <Typography component='p' className='menu-title'>Job Posting</Typography>
    //         </Box>
    //         <Box className='left-containers-dropdown'>
    //             <ArrowDropDownIcon sx={{ display: selectJob ? 'none' : 'block' }} />
    //             <ArrowDropUpIcon sx={{ display: selectJob ? 'block' : 'none' }} />
    //         </Box>
    //     </Box>
    //     <Box sx={{ display: selectJob ? 'block' : 'none', height: '200px' }}>
    //         Job Posting DropDown
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
          DropDown Job Postings{" "}
        </Box>
      </Stack>
    </Stack>)
  );
};
export default JobPostings;
