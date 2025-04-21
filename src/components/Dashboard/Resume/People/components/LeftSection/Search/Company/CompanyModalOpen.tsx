// import React from "react";
import { useContext } from "react";
import { React } from "../../../../../../../../shared/modules/React";
// import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
import { Stack } from "../../../../../../../../shared/modules/MaterialImports/Stack";
import { Typography } from "../../../../../../../../shared/modules/MaterialImports/Typography";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
// import ArticleIcon from "@mui/icons-material/Article";
import ListAltIcon from "@mui/icons-material/ListAlt";
import styles from "./../../../../shared/config/variables.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { ModalStore, Store } from "../../../DataLabs/DataLabs";

import "../Search.scss";

const CompanyModalOpen = () => {
  const [searchModalData, setSearchModalData] = useContext(ModalStore);

  const onClickCompanyFilter = () =>
    // event: any
    {
      // event.stopPropagation();
      setSearchModalData((prevSearchData: any) => {
        const updatedExistFields = prevSearchData.exist_fields.filter(
          (field: any) => field !== "company"
        );
        const updatedNotExistFields = prevSearchData.not_exist_fields.filter(
          (field: any) => field !== "company"
        );

        return {
          ...prevSearchData,
          company_names: [],
          company_not_in_names: [],
          company_past_names: [],
          exclude_company_names: [],
          exist_fields: updatedExistFields,
          not_exist_fields: updatedNotExistFields,
        };
      });
    };

  // const onClickCompanyFiltSelOpt = (event: any) => {
  //   event.stopPropagation();
  // };

  const [isMouseCompanyFilt, setIsMouseCompanyFilt] = React.useState(false);
  const onMouseOverCompanyFilt = () => {
    setIsMouseCompanyFilt(true);
  };

  const onMouseOutCompanyFilt = () => {
    setIsMouseCompanyFilt(false);
  };

  // const removeElementCompany = (index: any) => {
  //   if (index !== -1) {
  //     const updatedCompany = searchModalData.company_names;
  //     updatedCompany.splice(index, 1);
  //     setSearchModalData((prevSearchData: any) => ({
  //       ...prevSearchData,
  //       company_names: updatedCompany,
  //     }));
  //   }
  // };

  // const removeElementNotCompany = (index: any) => {
  //   if (index !== -1) {
  //     const updatedNotCompany = searchModalData.company_not_in_names;
  //     updatedNotCompany.splice(index, 1);
  //     setSearchModalData((prevSearchData: any) => ({
  //       ...prevSearchData,
  //       company_not_in_names: updatedNotCompany,
  //     }));
  //   }
  // };

  // const removeElementPastCompany = (index: any) => {
  //   if (index !== -1) {
  //     const updatedPastCompany = searchModalData.company_past_names;
  //     updatedPastCompany.splice(index, 1);
  //     setSearchModalData((prevSearchData: any) => ({
  //       ...prevSearchData,
  //       company_past_names: updatedPastCompany,
  //     }));
  //   }
  // };

  // const removeElementExcludeCompany = (index: any) => {
  //   if (index !== -1) {
  //     const updatedExcludeCompany = searchModalData.exclude_company_names;
  //     updatedExcludeCompany.splice(index, 1);
  //     setSearchModalData((prevSearchData: any) => ({
  //       ...prevSearchData,
  //       exclude_company_names: updatedExcludeCompany,
  //     }));
  //   }
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
          <Stack spacing={1} direction="row">
            <ListAltIcon
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
              Company
            </Typography>
          </Stack>
          <Stack sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
            {searchModalData.company_names.length +
              searchModalData.company_not_in_names.length +
              searchModalData.company_past_names.length +
              searchModalData.exclude_company_names.length +
              (searchModalData.exist_fields.length &&
              searchModalData.exist_fields.includes("company")
                ? 1
                : 0) +
              (searchModalData.not_exist_fields.length &&
              searchModalData.not_exist_fields.includes("company")
                ? 1
                : 0) ==
            0 ? (
              <></>
            ) : (
              <>
                <Stack
                  sx={{ display: "flex", flexDirection: "row", gap: "5px" }}
                >
                  <Stack
                    onClick={onClickCompanyFilter}
                    onMouseOver={onMouseOverCompanyFilt}
                    onMouseOut={onMouseOutCompanyFilt}
                    className="filter-child-num-con"
                  >
                    <CloseIcon
                      sx={{
                        color: isMouseCompanyFilt
                          ? styles.primaryTextColor
                          : "#737373",
                        fontSize: "16px",
                      }}
                    />
                    <Typography
                      sx={{
                        fontFamily:
                          'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        fontSize: "12px",
                        fontWeight: "600",
                        color: isMouseCompanyFilt
                          ? styles.primaryTextColor
                          : styles.blackcolor,
                      }}
                    >
                      {searchModalData.company_names.length +
                        searchModalData.company_not_in_names.length +
                        searchModalData.company_past_names.length +
                        searchModalData.exclude_company_names.length +
                        (searchModalData.exist_fields.length &&
                        searchModalData.exist_fields.includes("company")
                          ? 1
                          : 0) +
                        (searchModalData.not_exist_fields.length &&
                        searchModalData.not_exist_fields.includes("company")
                          ? 1
                          : 0)}
                    </Typography>
                  </Stack>

                  {/* <ArrowDropDownIcon sx={{ color: styles.arrowDropDownColor }} /> */}
                </Stack>
              </>
            )}
            <ArrowDropUpIcon sx={{ color: styles.primaryTextColor }} />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CompanyModalOpen;
