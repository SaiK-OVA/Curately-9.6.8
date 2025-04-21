// import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
import {Stack } from "../../../../../../../../shared/modules/MaterialImports/Stack";
import {Typography } from "../../../../../../../../shared/modules/MaterialImports/Typography";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
// import ArticleIcon from "@mui/icons-material/Article";
import WidthFullOutlinedIcon from "@mui/icons-material/WidthFullOutlined";
import styles from "./../../../../shared/config/variables.module.scss";

const FundingOpen = () => {
  return (
    <Stack sx={{ width: "100%" }}>
      <Stack
        sx={{
          width: "100%",
          "&:hover": {
            cursor: "pointer",
            backgroundColor: styles.backGroundColorOnHover,
            color: styles.primaryTextColor,
          },
        }}
      >
        <Stack
          sx={{
            paddingY: "10px",
            paddingLeft: "10px",
            paddingRight: "17px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Stack
            spacing={1}
            direction="row"
          >
            <WidthFullOutlinedIcon
              sx={{
                fontSize: "24px",
                color: styles.primaryTextColor,
                paddingLeft: "8px",
              }}
            />
            <Typography
              variant="body1"
              className="menu-title"
              sx={{ color: styles.primaryTextColor }}
            >
              Funding
            </Typography>
          </Stack>
          <Stack>
            <ArrowDropUpIcon sx={{ color: styles.primaryTextColor }} />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default FundingOpen;
