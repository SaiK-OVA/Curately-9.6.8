import { React, useState } from "../../../../../../shared/modules/React";
import Search from "./Search/Search";
// import { Card, Stack } from '@mui/material';
import "./LeftSection.scss";

import "./LeftSection.css";
import { Button } from "../../../../../../shared/modules/MaterialImports/Button";
import { Stack } from "../../../../../../shared/modules/MaterialImports/Stack";
import { Typography } from "../../../../../../shared/modules/MaterialImports/Typography";
// import Divider from "@mui/material/Divider";
import styles from "./../../shared/config/variables.module.scss";
import { userLocalData } from "../../../../../../shared/services/userData";
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';

interface LeftSectionProps {
  ishide: boolean;
}

const LeftSection: React.FC<LeftSectionProps> = ({ ishide }) => {
  const [isSearch, setIsSearch] = useState(true);
  const onClickSearch = () => {
    setIsSearch(true);
    setIsSavedSearch(false);
  };

  const [isSavedSearch, setIsSavedSearch] = useState(false);
  // const onClickSavedSearch = () => {
  //   setIsSearch(false);
  //   setIsSavedSearch(true);
  // };

  return (
    // <div className="left-section">
    // </div>
    (<Stack
      sx={{
        display: ishide ? "none" : "column",
        borderRight: "1px solid",
        borderRightColor: styles.borderBottomColor,
      }}
    >
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          // alignItems: "center",
          justifyContent: "space-between",

          backgroundColor: "#ffffff",
          // paddingLeft: "8px",
          // pt: "8px",
          // height: "50px",
          cursor: "pointer",
          borderBottom: "1px solid",
          borderBottomColor: styles.borderBottomColor,
        }}
      >
        <Stack
          onClick={onClickSearch}
          sx={{
            textAlign: "left",
            // color: "#1976d2",
            // height: "17px",
            paddingTop: "15.6px",
            paddingBottom: "17px",
            marginRight: "20px",
            // paddingBottom: "8px",
            marginLeft: "19px",
            color: isSearch ? styles.primaryTextColor : styles.defaultTextColor,

            borderBottom: isSearch ? "1px solid" : "1px solid transparent",

            "&:hover": {
              color: styles.primaryTextColor,
              borderBottom: "1px solid",
            },
          }}
        >
          <Typography
            sx={{
              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
              fontWeight: "600",
              fontSize: "14px",
              height: "17px",
            }}
          >
            Search
          </Typography>
        </Stack>
        {
          userLocalData.getvalue('clientId') === 2 ?
            <Button variant="contained" color="primary" startIcon={<AutoFixHighOutlinedIcon />} className="mr-3 mt-3 bg-purple" onClick={() => window.open("https://aisourcingdev.curately.ai/")}>
              AI Sourcing
            </Button> : null
        }
        {/* <Stack
          onClick={onClickSavedSearch}
          sx={{
            textAlign: "left",
            // paddingBottom: "8px",
            paddingTop: "15.6px",
            paddingBottom: "17px",
            color: isSavedSearch
              ? styles.primaryTextColor
              : styles.defaultTextColor,
            borderBottom: isSavedSearch ? "1px solid" : "1px solid transparent",
            "&:hover": {
              color: styles.primaryTextColor,
              borderBottom: "1px solid",
            },
          }}
        >
          <Typography
            sx={{
              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
              fontWeight: "600",
              fontSize: "14px",
              height: "17px",

              // color: isSavedSearch
              //   ? styles.primaryTextColor
              //   : styles.defaultTextColor,
              // borderBottom: isSavedSearch ? "1px solid" : "none",
              // "&:hover": {
              //   color: styles.primaryTextColor,
              //   borderBottom: "1px solid",
              // },
            }}
          >
            Saved searches
          </Typography>
        </Stack> */}
      </Stack>
      {/* <Divider /> */}
      {/* <Search /> */}
      {isSearch && <Search />}
      {isSavedSearch && (
        <Typography
          sx={{
            width: "310px",
            color: styles.primaryTextColor,
            marginTop: "100px",
          }}
        >
          Saved search triggered
        </Typography>
      )}
    </Stack>)
  );
};
export default LeftSection;
