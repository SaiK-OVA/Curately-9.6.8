// import React, { useState, useContext } from "react";
 import {useState  } from "../../../../../../../../shared/modules/React";
import  { useContext  } from "react";
import { Typography } from "../../../../../../../../shared/modules/MaterialImports/Typography";
import { Stack} from "../../../../../../../../shared/modules/MaterialImports/Stack";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import styles from "./../../../../shared/config/variables.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import CloseIcon from "@mui/icons-material/Close";
import { ModalStore } from "../../../DataLabs/DataLabs";

const LanguageModalClose = () => {
  const [searchModalData, setSearchModalData] = useContext(ModalStore);
  const [isMouseLanguagesFilt, setIsMouseLanguagesFilt] = useState(false);

  const onClickLanguagesFilter = (event: any) => {
    event.stopPropagation();
    setSearchModalData((prevSearchData: any) => ({
      ...prevSearchData,
      languagesIn: [],
      autoLanguagesList: [],
    }));
  };

  const onClickRemoveLanguages = () => {
    setSearchModalData((prevSearchData: any) => ({
      ...prevSearchData,
      languagesIn: [],
      autoLanguagesList: [],
    }));
  };

  const onClickLanguagesFiltSelOpt = (event: any) => {
    event.stopPropagation();
  };

  const onMouseOverLanguagesFilt = () => {
    setIsMouseLanguagesFilt(true);
  };

  const onMouseOutLanguagesFilt = () => {
    setIsMouseLanguagesFilt(false);
  };

  const removeLanguagesElement = (index: any) => {
    if (index !== -1) {
      const updatedAutoLanguagesList = searchModalData.autoLanguagesList;
      updatedAutoLanguagesList.splice(index, 1);
      const updatedLanguages = searchModalData.languagesIn;
      updatedLanguages.splice(index, 1);
      setSearchModalData((prevSearchData: any) => ({
        ...prevSearchData,
        languagesIn: updatedLanguages,
        autoLanguagesList: updatedAutoLanguagesList,
      }));
    }
  };

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
          <Stack spacing={1} direction="row" sx={{ alignItems: "center" }}>
            <FontAwesomeIcon
              style={{
                paddingLeft: "8px",
              }}
              icon={faLanguage}
            />
            <Typography variant="body1" className="menu-title">
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
                  className="filter-child-num-con"
                >
                  <CloseIcon
                    sx={{
                      color: isMouseLanguagesFilt
                        ? styles.primaryTextColor
                        : "#737373",
                      fontSize: "16px",
                    }}
                    onClick={onClickRemoveLanguages}
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
            <ArrowDropDownIcon sx={{ color: styles.arrowDropDownColor }} />
          </Stack>
        </Stack>
        {searchModalData.languagesIn && searchModalData.languagesIn.length ? (
          <Stack
            onClick={onClickLanguagesFiltSelOpt}
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              backgroundColor: "#ffffff !important",
              paddingTop: "6px",
              paddingLeft: "22.83px",
              paddingBottom: "14px",
            }}
          >
            <Typography
              sx={{
                fontFamily:
                  'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                fontSize: "12px",
                fontWeight: "600",
                color: "#000000",
                marginRight: "22px",
              }}
            >
              Languages:
            </Typography>
            {searchModalData.languagesIn.map((languages: any, index: any) => (
              <Stack
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "2px 7px",
                  backgroundColor: "#919191",
                  gap: "10px",
                  borderRadius: "2px",
                  margin: "1px 2px",
                }}
              >
                <Typography
                  sx={{
                    fontFamily:
                      'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#ffffff",
                  }}
                >
                  {languages}
                </Typography>
                <CloseIcon
                  onClick={() => removeLanguagesElement(index)}
                  sx={{ color: "#ffffff", fontSize: "small" }}
                />
              </Stack>
            ))}
          </Stack>
        ) : (
          <></>
        )}
      </Stack>
    </Stack>
  );
};

export default LanguageModalClose;
