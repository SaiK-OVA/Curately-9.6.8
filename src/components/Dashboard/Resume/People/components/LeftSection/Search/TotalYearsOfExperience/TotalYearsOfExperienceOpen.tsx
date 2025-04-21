import  { useContext } from "react";
import {React} from '../../../../../../../../shared/modules/React';

// import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
import { Stack } from "../../../../../../../../shared/modules/MaterialImports/Stack";
import { Typography } from "../../../../../../../../shared/modules/MaterialImports/Typography";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
// import ArticleIcon from "@mui/icons-material/Article";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import styles from "./../../../../shared/config/variables.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { Store } from "../../../DataLabs/DataLabs";
import '../Search.scss'

const TotalYearsOfExperienceOpen = () => {
  const onClickTYOEFilter = (event: any) => {
    event.stopPropagation();
    setSearchData((prevSearchData: any) => ({
      ...prevSearchData,
      minYear: "",
      maxYear: "",
      isMinYearValidation:false,
      isMaxYearValidation:false,
    }));
  };

  // const onClickTYOEFiltSelOpt = (event: any) => {
  //   event.stopPropagation();
  // };

  const [isMouseTYOEFilt, setIsMouseTYOEFilt] = React.useState(false);
  const onMouseOverTYOEFilt = () => {
    setIsMouseTYOEFilt(true);
  };

  const onMouseOutTYOEFilt = () => {
    setIsMouseTYOEFilt(false);
  };

  const [searchData, setSearchData] = useContext(Store);

  // const onClickRemoveMin = () => {
  //   setSearchData((prevSearchData: any) => ({
  //     ...prevSearchData,
  //     minYear: "",
  //   }));
  // };

  // const onClickRemoveMax = () => {
  //   setSearchData((prevSearchData: any) => ({
  //     ...prevSearchData,
  //     maxYear: "",
  //   }));
  // };

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
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              flexGrow: "1",
              gap: "8px",
            }}
          >
            <PersonOutlineOutlinedIcon
              sx={{
                fontSize: "24px",
                color: styles.primaryTextColor,
                paddingLeft: "8px",
                alignSelf: "center",
              }}
            />
            <Typography
              variant="body1"
              className="menu-title"
              sx={{
                color: styles.primaryTextColor,
                marginTop: "0px !important",
                textAlign: "left",
              }}
            >
              Total Years of Experience
            </Typography>
          </Stack>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: "5px",
            }}
          >
            {searchData.minYear !== "" && searchData.maxYear !== "" && (
              <Stack
                onClick={onClickTYOEFilter}
                onMouseOver={onMouseOverTYOEFilt}
                onMouseOut={onMouseOutTYOEFilt}
               className="filter-child-num-con"
              >
                <CloseIcon
                  sx={{
                    color: isMouseTYOEFilt
                      ? styles.primaryTextColor
                      : "#737373",
                    fontSize: "16px",
                  }}
                />
                <Typography
                  sx={{
                    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                    fontSize: "12px",
                    fontWeight: "600",
                    color: isMouseTYOEFilt
                      ? styles.primaryTextColor
                      : styles.blackcolor,
                  }}
                >
                  2
                </Typography>
              </Stack>
            )}

            {searchData.minYear !== "" && searchData.maxYear === "" && (
              <Stack
                onClick={onClickTYOEFilter}
                onMouseOver={onMouseOverTYOEFilt}
                onMouseOut={onMouseOutTYOEFilt}
              className="filter-child-num-con"
              >
                <CloseIcon
                  sx={{
                    color: isMouseTYOEFilt
                      ? styles.primaryTextColor
                      : "#737373",
                    fontSize: "16px",
                  }}
                />
                <Typography
                  sx={{
                    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                    fontSize: "12px",
                    fontWeight: "600",
                    color: isMouseTYOEFilt
                      ? styles.primaryTextColor
                      : styles.blackcolor,
                  }}
                >
                  1
                </Typography>
              </Stack>
            )}

            {searchData.minYear === "" && searchData.maxYear !== "" && (
              <Stack
                onClick={onClickTYOEFilter}
                onMouseOver={onMouseOverTYOEFilt}
                onMouseOut={onMouseOutTYOEFilt}
             className="filter-child-num-con"
              >
                <CloseIcon
                  sx={{
                    color: isMouseTYOEFilt
                      ? styles.primaryTextColor
                      : "#737373",
                    fontSize: "16px",
                  }}
                />
                <Typography
                  sx={{
                    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                    fontSize: "12px",
                    fontWeight: "600",
                    color: isMouseTYOEFilt
                      ? styles.primaryTextColor
                      : styles.blackcolor,
                  }}
                >
                  1
                </Typography>
              </Stack>
            )}
            <ArrowDropUpIcon sx={{ color: styles.primaryTextColor }} />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default TotalYearsOfExperienceOpen;
