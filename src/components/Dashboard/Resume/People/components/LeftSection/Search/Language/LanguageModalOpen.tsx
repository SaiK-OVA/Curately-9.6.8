// import React, { useState, useContext } from "react";
import  { useContext } from "react";
import { useState} from "../../../../../../../../shared/modules/React";
import { Stack } from "../../../../../../../../shared/modules/MaterialImports/Stack";
import { Typography } from "../../../../../../../../shared/modules/MaterialImports/Typography";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import styles from "./../../../../shared/config/variables.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import CloseIcon from "@mui/icons-material/Close";
import { ModalStore } from "../../../DataLabs/DataLabs";

const LanguageModalOpen = () => {
  const [searchModalData, setSearchModalData] = useContext(ModalStore);
  const [isMouseLanguagesFilt, setIsMouseLanguagesFilt] = useState(false);

  const onClickLanguagesFilter = (event: any) => {
    // event.stopPropagation();
    setSearchModalData((prevSearchData: any) => ({
      ...prevSearchData,
      languagesIn: [],
      autoLanguagesList: [],
    }));
  };

  // const onClickRemoveLanguages = () => {
  //   setSearchModalData((prevSearchData: any) => ({
  //     ...prevSearchData,
  //     languagesIn: [],
  //     autoLanguagesList: [],
  //   }));
  // };

  const onMouseOverLanguagesFilt = () => {
    setIsMouseLanguagesFilt(true);
  };

  const onMouseOutLanguagesFilt = () => {
    setIsMouseLanguagesFilt(false);
  };

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
          <Stack spacing={1} direction="row" sx={{ alignItems: "center" }}>
            <FontAwesomeIcon
              style={{
                color: styles.primaryTextColor,
                paddingLeft: "8px",
              }}
              icon={faLanguage}
            />
            <Typography
              variant="body1"
              className="menu-title"
              sx={{ color: styles.primaryTextColor }}
            >
              Language
            </Typography>
          </Stack>
          <Stack sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
            {searchModalData.languagesIn && searchModalData.languagesIn.length ? (
              <Stack sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
                <Stack
                  onClick={onClickLanguagesFilter}
                  onMouseOver={onMouseOverLanguagesFilt}
                  onMouseOut={onMouseOutLanguagesFilt}
                  className="filter-child-num-con "
                >
                  <CloseIcon
                    sx={{
                      color: isMouseLanguagesFilt
                        ? styles.primaryTextColor
                        : "#737373",
                      fontSize: "16px",
                    }}
                    // onClick={onClickRemoveLanguages}
                  />
                  <Typography
                    sx={{
                      fontFamily:
                        'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                      fontSize: "12px",
                      fontWeight: "600",
                      color: isMouseLanguagesFilt
                        ? styles.primaryTextColor
                        : styles.blackcolor,
                    }}
                  >
                    {searchModalData.languagesIn.length}
                  </Typography>
                </Stack>
              </Stack>
            ) : (
              <></>
            )}
            <ArrowDropUpIcon sx={{ color: styles.primaryTextColor }} />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LanguageModalOpen;
