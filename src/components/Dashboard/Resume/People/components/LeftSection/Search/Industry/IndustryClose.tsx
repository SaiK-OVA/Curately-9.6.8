import {React} from "../../../../../../../../shared/modules/React";
import { useContext } from "react";
// import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
import {Stack } from "../../../../../../../../shared/modules/MaterialImports/Stack";
import { Typography } from "../../../../../../../../shared/modules/MaterialImports/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
// import ArticleIcon from "@mui/icons-material/Article";
import FactoryOutlinedIcon from "@mui/icons-material/FactoryOutlined";
import styles from "./../../../../shared/config/variables.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { Store } from "../../../DataLabs/DataLabs";
import '../Search.scss'

const IndustryClose = () => {
  const [searchData, setSearchData] = useContext(Store);

  const onClickIndustryFilter = (event: any) => {
    event.stopPropagation();
    setSearchData((prevSearchData: any) => ({
      ...prevSearchData,
      industries: [],
      industries_not_in: [],
      industry_company_not_in_names: [],
      industry_company_names: [],
      industry_all_company_names: [],
    }));
  };

  const onClickIndustryFiltSelOpt = (event: any) => {
    event.stopPropagation();
  };

  const [isMouseIndustryFilt, setIsMouseIndustryFilt] = React.useState(false);
  const onMouseOverIndustryFilt = () => {
    setIsMouseIndustryFilt(true);
  };

  const onMouseOutIndustryFilt = () => {
    setIsMouseIndustryFilt(false);
  };

  const removeIndustryElement = (index: any) => {
    if (index !== -1) {
      const updatedIndustry = searchData.industries;
      updatedIndustry.splice(index, 1);
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        industries: updatedIndustry,
      }));
    }
  };

  const removeNotInIndustryElement = (index: any) => {
    if (index !== -1) {
      const updatedNotInIndustry = searchData.industries_not_in;
      updatedNotInIndustry.splice(index, 1);
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        industries_not_in: updatedNotInIndustry,
      }));
    }
  };

    const removeCompanyNotInIndustryElement = (index: any) => {
      if (index !== -1) {
        const updatedCompanyNotInIndustry = searchData.industry_company_not_in_names;
        updatedCompanyNotInIndustry.splice(index, 1);
        setSearchData((prevSearchData: any) => ({
          ...prevSearchData,
          industry_company_not_in_names: updatedCompanyNotInIndustry,
        }));
      }
    };

    const removeCompanyIndustryElement = (index: any) => {
      if (index !== -1) {
        const updatedCompanyIndustry =
          searchData.industry_company_names;
        updatedCompanyIndustry.splice(index, 1);
        setSearchData((prevSearchData: any) => ({
          ...prevSearchData,
          industry_company_names: updatedCompanyIndustry,
        }));
      }
    };

    const removeCompanyAllIndustryElement = (index: any) => {
      if (index !== -1) {
        const updatedCompanyAllIndustry =
          searchData.industry_all_company_names;
        updatedCompanyAllIndustry.splice(index, 1);
        setSearchData((prevSearchData: any) => ({
          ...prevSearchData,
          industry_all_company_names: updatedCompanyAllIndustry,
        }));
      }
    };

  const removeIsKnown = (title: any) => {
    setSearchData((prevSearchData: any) => {
      const updatedExistFields = prevSearchData.exist_fields.filter((field: any) => field !== title);
      return {
        ...prevSearchData,
        exist_fields: updatedExistFields,
      };
    });
  };

  const removeIsUnKnown = (title: any) => {
    setSearchData((prevSearchData: any) => {
      const updatedExistFields = prevSearchData.not_exist_fields.filter((field: any) => field !== title);
      return {
        ...prevSearchData,
        not_exist_fields: updatedExistFields,
      };
    });
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
          <Stack spacing={1} direction="row">
            <FactoryOutlinedIcon
              sx={{
                fontSize: "24px",

                paddingLeft: "8px",
              }}
            />
            <Typography variant="body1" className="menu-title">
              Industry & Keywords
            </Typography>
          </Stack>
          <Stack sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
            {/* {searchData.industries.length == 0 ? (
              <></>
            ) : ( */}
            {(searchData.industries.length !== 0 ||
              searchData.industries_not_in.length !== 0 ||
              searchData.industry_company_not_in_names.length !== 0 ||
              searchData.industry_company_names.length !== 0 ||
              searchData.industry_all_company_names.length !== 0) && (
              <Stack sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
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
                    {searchData.industries.length +
                      searchData.industries_not_in.length +
                      searchData.industry_company_not_in_names.length +
                      searchData.industry_company_names.length +
                      searchData.industry_all_company_names.length +
                      (searchData.exist_fields.length &&
                      searchData.exist_fields.includes("industries")
                        ? 1
                        : 0) +
                      (searchData.not_exist_fields.length &&
                      searchData.not_exist_fields.includes("industries")
                        ? 1
                        : 0)}
                  </Typography>
                </Stack>

                {/* <ArrowDropDownIcon sx={{ color: styles.arrowDropDownColor }} /> */}
              </Stack>
            )}
            {/* )} */}
            <ArrowDropDownIcon sx={{ color: styles.arrowDropDownColor }} />
          </Stack>
        </Stack>

        {searchData.industries.length ? (
          <>
            <Stack
              onClick={onClickIndustryFiltSelOpt}
              direction="row"
              useFlexGap
              flexWrap="wrap"
              sx={{
                display: "flex",
                flexDirection: "row",
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
                Industry:
              </Typography>
              {searchData.industries.map((industry: any, index: any) => (
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
                    {industry}
                  </Typography>
                  <CloseIcon
                    onClick={() => removeIndustryElement(index)}
                    sx={{ color: "#ffffff", fontSize: "small" }}
                  />
                </Stack>
              ))}
            </Stack>
          </>
        ) : (
          <></>
        )}
        {searchData.industries_not_in.length ? (
          <>
            <Stack
              onClick={onClickIndustryFiltSelOpt}
              direction="row"
              useFlexGap
              flexWrap="wrap"
              sx={{
                display: "flex",
                flexDirection: "row",
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
                Industry not in :
              </Typography>
              {searchData.industries_not_in.map((industry: any, index: any) => (
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
                    {industry}
                  </Typography>
                  <CloseIcon
                    onClick={() => removeNotInIndustryElement(index)}
                    sx={{ color: "#ffffff", fontSize: "small" }}
                  />
                </Stack>
              ))}
            </Stack>
          </>
        ) : (
          <></>
        )}

        {searchData.industry_company_names.length ? (
          <>
            <Stack
              onClick={onClickIndustryFiltSelOpt}
              direction="row"
              useFlexGap
              flexWrap="wrap"
              sx={{
                display: "flex",
                flexDirection: "row",
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
                Industry include :
              </Typography>
              {searchData.industry_company_names.map(
                (industry: any, index: any) => (
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
                      {industry}
                    </Typography>
                    <CloseIcon
                      onClick={() => removeCompanyIndustryElement(index)}
                      sx={{ color: "#ffffff", fontSize: "small" }}
                    />
                  </Stack>
                )
              )}
            </Stack>
          </>
        ) : (
          <></>
        )}

        {searchData.industry_all_company_names.length ? (
          <>
            <Stack
              onClick={onClickIndustryFiltSelOpt}
              direction="row"
              useFlexGap
              flexWrap="wrap"
              sx={{
                display: "flex",
                flexDirection: "row",
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
                Industry include all :
              </Typography>
              {searchData.industry_all_company_names.map(
                (industry: any, index: any) => (
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
                      {industry}
                    </Typography>
                    <CloseIcon
                      onClick={() => removeCompanyAllIndustryElement(index)}
                      sx={{ color: "#ffffff", fontSize: "small" }}
                    />
                  </Stack>
                )
              )}
            </Stack>
          </>
        ) : (
          <></>
        )}

        {searchData.industry_company_not_in_names.length ? (
          <>
            <Stack
              onClick={onClickIndustryFiltSelOpt}
              direction="row"
              useFlexGap
              flexWrap="wrap"
              sx={{
                display: "flex",
                flexDirection: "row",
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
                Industry to exclude:
              </Typography>
              {searchData.industry_company_not_in_names.map(
                (industry: any, index: any) => (
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
                      {industry}
                    </Typography>
                    <CloseIcon
                      onClick={() => removeCompanyNotInIndustryElement(index)}
                      sx={{ color: "#ffffff", fontSize: "small" }}
                    />
                  </Stack>
                )
              )}
            </Stack>
          </>
        ) : (
          <></>
        )}

        {searchData.exist_fields.length &&
        searchData.exist_fields.includes("industries") ? (
          <>
            <Stack
              onClick={onClickIndustryFiltSelOpt}
              direction="row"
              useFlexGap
              flexWrap="wrap"
              sx={{
                display: "flex",
                flexDirection: "row",
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
                Industry exist:
              </Typography>
              {searchData.exist_fields
                .filter((field: any) => field === "industries")
                .map((field: any) => (
                  <Stack
                    key={field}
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
                      Known
                    </Typography>
                    <CloseIcon
                      onClick={() => removeIsKnown(field)}
                      sx={{ color: "#ffffff", fontSize: "small" }}
                    />
                  </Stack>
                ))}
            </Stack>
          </>
        ) : (
          <></>
        )}

        {searchData.not_exist_fields &&
        searchData.not_exist_fields.includes("industries") ? (
          <>
            <Stack
              onClick={onClickIndustryFiltSelOpt}
              direction="row"
              useFlexGap
              flexWrap="wrap"
              sx={{
                display: "flex",
                flexDirection: "row",
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
                Industry not exist:
              </Typography>
              {searchData.not_exist_fields
                .filter((field: any) => field === "industries")
                .map((field: any) => (
                  <Stack
                    key={field}
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
                      UnKnown
                    </Typography>
                    <CloseIcon
                      onClick={() => removeIsUnKnown(field)}
                      sx={{ color: "#ffffff", fontSize: "small" }}
                    />
                  </Stack>
                ))}
            </Stack>
          </>
        ) : (
          <></>
        )}
      </Stack>
    </Stack>
  );
};

export default IndustryClose;
