import { React } from "../../../../../../../../shared/modules/React";
import { useContext } from "react";
// import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
import { Stack } from "../../../../../../../../shared/modules/MaterialImports/Stack";
import { Typography } from "../../../../../../../../shared/modules/MaterialImports/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
// import ArticleIcon from "@mui/icons-material/Article";
import ListAltIcon from "@mui/icons-material/ListAlt";
import styles from "./../../../../shared/config/variables.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { Store } from "../../../DataLabs/DataLabs";
import "../Search.scss";

const CompanyClose = () => {
  const [searchData, setSearchData] = useContext(Store);

  const onClickCompanyFilter = (event: any) => {
    event.stopPropagation();
    setSearchData((prevSearchData: any) => {
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

  const onClickCompanyFiltSelOpt = (event: any) => {
    event.stopPropagation();
  };

  const [isMouseCompanyFilt, setIsMouseCompanyFilt] = React.useState(false);
  const onMouseOverCompanyFilt = () => {
    setIsMouseCompanyFilt(true);
  };

  const onMouseOutCompanyFilt = () => {
    setIsMouseCompanyFilt(false);
  };

  const removeElementCompany = (index: any) => {
    if (index !== -1) {
      const updatedCompany = searchData.company_names;
      updatedCompany.splice(index, 1);
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        company_names: updatedCompany,
      }));
    }
  };

  const removeElementNotCompany = (index: any) => {
    if (index !== -1) {
      const updatedNotCompany = searchData.company_not_in_names;
      updatedNotCompany.splice(index, 1);
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        company_not_in_names: updatedNotCompany,
      }));
    }
  };

  const removeElementPastCompany = (index: any) => {
    if (index !== -1) {
      const updatedPastCompany = searchData.company_past_names;
      updatedPastCompany.splice(index, 1);
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        company_past_names: updatedPastCompany,
      }));
    }
  };

  const removeElementExcludeCompany = (index: any) => {
    if (index !== -1) {
      const updatedExcludeCompany = searchData.exclude_company_names;
      updatedExcludeCompany.splice(index, 1);
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        exclude_company_names: updatedExcludeCompany,
      }));
    }
  };

  const removeIsKnown = (title: any) => {
    setSearchData((prevSearchData: any) => {
      const updatedExistFields = prevSearchData.exist_fields.filter(
        (field: any) => field !== title
      );
      return {
        ...prevSearchData,
        exist_fields: updatedExistFields,
      };
    });
  };

  const removeIsUnKnown = (title: any) => {
    setSearchData((prevSearchData: any) => {
      const updatedExistFields = prevSearchData.not_exist_fields.filter(
        (field: any) => field !== title
      );
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
            <ListAltIcon
              sx={{
                fontSize: "24px",
                paddingLeft: "8px",
              }}
            />
            <Typography variant="body1" className="menu-title">
              Company
            </Typography>
          </Stack>

          <Stack sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
            {searchData.company_names.length +
              searchData.company_not_in_names.length +
              searchData.exclude_company_names.length +
              searchData.company_past_names.length +
              (searchData.exist_fields.length &&
                searchData.exist_fields.includes("company")
                ? 1
                : 0) +
              (searchData.not_exist_fields.length &&
                searchData.not_exist_fields.includes("company")
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
                      {searchData.company_names.length +
                        searchData.company_not_in_names.length +
                        searchData.company_past_names.length +
                        searchData.exclude_company_names.length +
                        (searchData.exist_fields.length &&
                          searchData.exist_fields.includes("company")
                          ? 1
                          : 0) +
                        (searchData.not_exist_fields.length &&
                          searchData.not_exist_fields.includes("company")
                          ? 1
                          : 0)}
                    </Typography>
                  </Stack>

                  {/* <ArrowDropDownIcon sx={{ color: styles.arrowDropDownColor }} /> */}
                </Stack>
              </>
            )}
            <ArrowDropDownIcon sx={{ color: styles.arrowDropDownColor }} />
          </Stack>
        </Stack>
        {searchData.company_names.length ? (
          <>
            <Stack
              onClick={onClickCompanyFiltSelOpt}
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
                Companies:
              </Typography>
              {searchData.company_names.map((company: any, index: any) => (
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
                    {company}
                  </Typography>
                  <CloseIcon
                    onClick={() => removeElementCompany(index)}
                    sx={{ color: "#ffffff", fontSize: "small" }}
                  />
                </Stack>
              ))}
            </Stack>
          </>
        ) : (
          <></>
        )}

        {searchData.company_not_in_names.length ? (
          <>
            <Stack
              onClick={onClickCompanyFiltSelOpt}
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
                Excluded Companies:
              </Typography>
              {searchData.company_not_in_names.map(
                (notcompany: any, index: any) => (
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
                      {notcompany}
                    </Typography>
                    <CloseIcon
                      onClick={() => removeElementNotCompany(index)}
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

        {searchData.company_past_names.length ? (
          <>
            <Stack
              onClick={onClickCompanyFiltSelOpt}
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
                Past Companies:
              </Typography>
              {searchData.company_past_names.map(
                (pastcompany: any, index: any) => (
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
                      {pastcompany}
                    </Typography>
                    <CloseIcon
                      onClick={() => removeElementPastCompany(index)}
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
          searchData.exist_fields.includes("company") ? (
          <>
            <Stack
              onClick={onClickCompanyFiltSelOpt}
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
                Companies:
              </Typography>
              {searchData.exist_fields
                .filter((field: any) => field === "company")
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
          searchData.not_exist_fields.includes("company") ? (
          <>
            <Stack
              onClick={onClickCompanyFiltSelOpt}
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
                Companies:
              </Typography>
              {searchData.not_exist_fields
                .filter((field: any) => field === "company")
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

        {searchData.exclude_company_names.length ? (
          <>
            <Stack
              onClick={onClickCompanyFiltSelOpt}
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
                Companies exclude :
              </Typography>
              {searchData.exclude_company_names.map(
                (excludecompany: any, index: any) => (
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
                      {excludecompany}
                    </Typography>
                    <CloseIcon
                      onClick={() => removeElementExcludeCompany(index)}
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
      </Stack>
    </Stack>
  );
};

export default CompanyClose;
