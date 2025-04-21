// import * as React from "react";
// import { Box, Stack, Typography } from "@mui/material";
import { Box } from "../../../../../../../../shared/modules/MaterialImports/Box";
import { Stack } from "../../../../../../../../shared/modules/MaterialImports/Stack";
// import ListAltIcon from "@mui/icons-material/ListAlt";
// import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import ArticleIcon from "@mui/icons-material/Article";

import "../Search.scss";
import "./Lists.scss";
import styles from "./../../../../shared/config/variables.module.scss";
// interface ListsProps {
//   isList: boolean;
// }

const Lists = () => {
  // const [selectList, setSelectList] = React.useState(false);

  // const handleSelect = () => {
  //   setSelectList(!selectList);
  // };

  return (
    <Stack>
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
          DropDown List{" "}
        </Box>
      </Stack>
    </Stack>
  );
};

export default Lists;
