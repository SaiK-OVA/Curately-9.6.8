// import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
import { Stack } from "../../../../../../../../shared/modules/MaterialImports/Stack";
import { Typography } from "../../../../../../../../shared/modules/MaterialImports/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
// import ArticleIcon from "@mui/icons-material/Article";
// import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import styles from "./../../../../shared/config/variables.module.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";


const BooleanSearchClose = () => {
  return (
    <Stack sx={{ width: "100%" }}>
      <Stack
        sx={{
          width: "100%",
          borderBottom: "1px solid",
          color: styles.blackcolor,
          borderBottomColor: styles.borderBottomColor,
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
            
            <SearchOutlinedIcon
            sx={{
              paddingLeft: "8px",
              fontSize: '24px'
            }}
          />
            <Typography
              variant="body1"
              className="menu-title"
            >
              AND/OR Boolean Search
            </Typography>
          </Stack>
          <Stack>
            <ArrowDropDownIcon sx={{ color: styles.arrowDropDownColor }} />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default BooleanSearchClose;
