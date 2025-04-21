import {React} from "../../../../../../../../shared/modules/React";
import { useContext } from "react";
// import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
import { Stack } from "../../../../../../../../shared/modules/MaterialImports/Stack";
import { Typography } from "../../../../../../../../shared/modules/MaterialImports/Typography";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
// import ArticleIcon from "@mui/icons-material/Article";
import FactoryOutlinedIcon from "@mui/icons-material/FactoryOutlined";
import styles from "./../../../../shared/config/variables.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { ModalStore } from "../../../DataLabs/DataLabs";
import "../Search.scss";

const IndustryModalOpen = () => {
  const [searchModalData, setSearchModalData] = useContext(ModalStore);

  const onClickIndustryFilter = (event: any) => {
    event.stopPropagation();
    setSearchModalData((prevSearchData: any) => ({
      ...prevSearchData,
      industries: [],
      industries_not_in: [],
      industry_company_not_in_names: [],
      industry_company_names: [],
      industry_all_company_names: [],
      not_exist_fields: prevSearchData.not_exist_fields.filter(
        (field: any) => field !== "industries"
      ),
      exist_fields: prevSearchData.exist_fields.filter(
        (field: any) => field !== "industries"
      ),
    }));
  };

  // const onClickIndustryFiltSelOpt = (event: any) => {
  //   event.stopPropagation();
  // };

  const [isMouseIndustryFilt, setIsMouseIndustryFilt] = React.useState(false);
  const onMouseOverIndustryFilt = () => {
    setIsMouseIndustryFilt(true);
  };

  const onMouseOutIndustryFilt = () => {
    setIsMouseIndustryFilt(false);
  };

  // const removeIndustryElement = (index: any) => {
  //   if (index !== -1) {
  //     const updatedIndustry = searchModalData.industries;
  //     updatedIndustry.splice(index, 1);
  //     setSearchModalData((prevSearchData: any) => ({
  //       ...prevSearchData,
  //       industries: updatedIndustry,
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
            <FactoryOutlinedIcon
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
              Industry & Keywords
            </Typography>
          </Stack>
          <Stack sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
            {searchModalData.industries.length +
              searchModalData.industries_not_in.length +
              searchModalData.industry_company_not_in_names.length +
              searchModalData.industry_company_names.length +
              searchModalData.industry_all_company_names.length +
              // (searchModalData.title_department.length === 0
              //   ? searchModalData.title_department_sub_role.length
              //   : searchModalData.title_department.length)
              (searchModalData.exist_fields.length &&
              searchModalData.exist_fields.includes("industries")
                ? 1
                : 0) +
              (searchModalData.not_exist_fields.length &&
              searchModalData.not_exist_fields.includes("industries")
                ? 1
                : 0) ===
            0 ? (
              <></>
            ) : (
              <>
                <Stack
                  sx={{ display: "flex", flexDirection: "row", gap: "5px" }}
                >
                  <Stack
                    onClick={onClickIndustryFilter}
                    onMouseOver={onMouseOverIndustryFilt}
                    onMouseOut={onMouseOutIndustryFilt}
                    className="filter-child-num-con"
                  >
                    <CloseIcon
                      sx={{
                        color: isMouseIndustryFilt
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
                        color: isMouseIndustryFilt
                          ? styles.primaryTextColor
                          : styles.blackcolor,
                      }}
                    >
                      {searchModalData.industries.length +
                        searchModalData.industries_not_in.length +
                        searchModalData.industry_company_not_in_names.length +
                        searchModalData.industry_company_names.length +
                        searchModalData.industry_all_company_names.length +
                        (searchModalData.exist_fields.length &&
                        searchModalData.exist_fields.includes("industries")
                          ? 1
                          : 0) +
                        (searchModalData.not_exist_fields.length &&
                        searchModalData.not_exist_fields.includes("industries")
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

export default IndustryModalOpen;
