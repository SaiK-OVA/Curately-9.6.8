import {React} from "../../../../../../../../shared/modules/React";
import { useContext } from "react";
// import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
import { Stack } from "../../../../../../../../shared/modules/MaterialImports/Stack";
import { Typography } from "../../../../../../../../shared/modules/MaterialImports/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import ArticleIcon from "@mui/icons-material/Article";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import styles from "./../../../../shared/config/variables.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { Store } from "../../../DataLabs/DataLabs";
import '../Search.scss'

// interface Props {
//   dataJT: string[];
// }

const checkboxData = [
  {
    id: 1,
    parent: "Customer Service",
    key: "customer_service",
    children: [
      { id: 1, label: "Customer Success", key: "customer_success" },
      { id: 2, label: "Support", key: "support" },
    ],
  },
  {
    id: 2,
    parent: "Design",
    key: "design",
    children: [
      { id: 1, label: "Graphic Design", key: "graphic_design" },
      { id: 2, label: "Product Design", key: "product_design" },
      { id: 3, label: "Web Design", key: "web_design" },
    ],
  },
  {
    id: 3,
    parent: "Education",
    key: "education",
    children: [
      {
        id: 1,
        label: "Education Administration",
        key: "education_administration",
      },
      { id: 2, label: "Professor", key: "professor" },
      { id: 3, label: "Researcher", key: "researcher" },
      { id: 4, label: "Teacher", key: "teacher" },
    ],
  },
  {
    id: 4,
    parent: "Engineering",
    key: "engineering",
    children: [
      { id: 1, label: "Mechanical", key: "mechanical" },
      { id: 2, label: "Project Engineering", key: "project_engineering" },
      { id: 3, label: "Data", key: "data" },
      { id: 4, label: "Devops", key: "devops" },
      { id: 5, label: "Electrical", key: "electrical" },
      { id: 6, label: "Information Technology", key: "information_technology" },
      { id: 7, label: "Network", key: "network" },
      { id: 8, label: "Quality Assurance", key: "quality_assurance" },
      { id: 9, label: "Security", key: "security" },
      { id: 10, label: "Software", key: "software" },
      { id: 11, label: "Systems", key: "systems" },
      { id: 12, label: "Web", key: "web" },
    ],
  },
  {
    id: 5,
    parent: "Finance",
    key: "finance",
    children: [
      { id: 1, label: "Accounting", key: "accounting" },
      { id: 2, label: "Investment", key: "investment" },
    ],
  },
  {
    id: 6,
    parent: "Health",
    key: "health",
    children: [
      { id: 1, label: "Dental", key: "dental" },
      { id: 2, label: "Doctor", key: "doctor" },
      { id: 3, label: "Fitness", key: "fitness" },
      { id: 4, label: "Nursing", key: "nursing" },
      { id: 5, label: "Therapy", key: "therapy" },
      { id: 6, label: "Wellness", key: "wellness" },
    ],
  },
  {
    id: 7,
    parent: "Human Resources",
    key: "human_resources",
    children: [
      { id: 1, label: "Compensation", key: "compensation" },
      { id: 2, label: "Employee Development", key: "employee_development" },
      { id: 3, label: "Recruiting", key: "recruiting" },
    ],
  },
  {
    id: 8,
    parent: "Legal",
    key: "legal",
    children: [
      { id: 1, label: "Judicial", key: "judicial" },
      { id: 2, label: "Lawyer", key: "lawyer" },
      { id: 3, label: "Paralegal", key: "paralegal" },
    ],
  },
  {
    id: 9,
    parent: "Marketing",
    key: "marketing",
    children: [
      { id: 1, label: "Brand Marketing", key: "brand_marketing" },
      { id: 2, label: "Content Marketing", key: "content_marketing" },
      { id: 3, label: "Product Marketing", key: "product_marketing" },
      { id: 4, label: "Project Management", key: "project_management" },
    ],
  },
  {
    id: 10,
    parent: "Media",
    key: "media",
    children: [
      { id: 1, label: "Broadcasting", key: "broadcasting" },
      { id: 2, label: "Editorial", key: "editorial" },
      { id: 3, label: "Journalism", key: "journalism" },
      { id: 3, label: "Video", key: "video" },
      { id: 3, label: "Writing", key: "writing" },
    ],
  },
  {
    id: 11,
    parent: "Operations",
    key: "operations",
    children: [
      { id: 1, label: "Logistics", key: "logistics" },
      { id: 2, label: "Office_management", key: "office_management" },
      { id: 3, label: "Product", key: "product" },
    ],
  },
  {
    id: 12,
    parent: "Public Relations",
    key: "public_relations",
    children: [
      { id: 1, label: "Events", key: "events" },
      { id: 2, label: "Media Relations", key: "media_relations" },
    ],
  },
  {
    id: 13,
    parent: "Real Estate",
    key: "real_estate",
    children: [
      { id: 1, label: "Property Management", key: "property_management" },
      { id: 2, label: "Realtor", key: "realtor" },
    ],
  },
  {
    id: 14,
    parent: "Sales",
    key: "sales",
    children: [
      { id: 1, label: "Accounts", key: "accounts" },
      { id: 2, label: "Business Development", key: "business_development" },
      { id: 3, label: "Pipeline", key: "pipeline" },
    ],
  },
  {
    id: 15,
    parent: "Trades",
    key: "trades",
    children: [],
  },
];

// const JobTitleClose: React.FC<Props> = ({ dataJT }) => {
const JobTitleClose = () => {
  // console.log(dataJT);

  const removeElement = (index: any) => {
    if (index !== -1) {
      const updatedPersonTitles = searchData.person_titles;
      updatedPersonTitles.splice(index, 1);
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        person_titles: updatedPersonTitles,
      }));
    }
  };

  const removeElementNot = (index: any) => {
    if (index !== -1) {
      const updatedPersonTitles = searchData.person_not_titles;
      updatedPersonTitles.splice(index, 1);
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        person_not_titles: updatedPersonTitles,
      }));
    }
  };

  const removeElementPast = (index: any) => {
    if (index !== -1) {
      const updatedPersonTitles = searchData.person_past_titles;
      updatedPersonTitles.splice(index, 1);
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        person_past_titles: updatedPersonTitles,
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

  const removeElementManagementLevel = (index: any) => {
    if (index !== -1) {
      const updatedManagementLevel = searchData.title_management_level;
      updatedManagementLevel.splice(index, 1);
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        title_management_level: updatedManagementLevel,
      }));
    }
  };

  // const removeDepartmentElement = (index: any) => {
  //   if (index !== -1) {
  //     const updatedDepartmentElement = searchData.title_department_sub_role;
  //     updatedDepartmentElement.splice(index, 1);
  //     setSearchData((prevSearchData: any) => ({
  //       ...prevSearchData,
  //       title_department_sub_role: updatedDepartmentElement,
  //     }));
  //   }
  // };

  const removeDepartmentElement = (index: any) => {
    if (index !== -1) {
      const updatedDepartmentTitles = searchData.title_department_sub_role;
      updatedDepartmentTitles.splice(index, 1);
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        title_department_sub_role: updatedDepartmentTitles,
      }));
    }
  };

  // const removeDepartmentParentElement = (index: any) => {
  //   if (index !== -1) {
  //     const updatedDepartmentParentTitles = searchData.title_department;
  //     updatedDepartmentParentTitles.splice(index, 1);
  //     setSearchData((prevSearchData: any) => ({
  //       ...prevSearchData,
  //       title_department: updatedDepartmentParentTitles,
  //     }));
  //   }
  // };

  const removeDepartmentParentElement = (index: any) => {
    if (index !== -1) {
      const updatedDepartmentParentTitles = searchData.title_department;
      const removed_parent = updatedDepartmentParentTitles.splice(index, 1);
      // console.log("removed_parent", removed_parent);

      const removed_parent_array = removed_parent.map((item: any) =>
        checkboxData.filter((parent: any) => parent.key === item)
      );

      // console.log("removed_parent_array", removed_parent_array);

      const removed_parent_children_array_of_array = removed_parent_array.map(
        (item: any) => item[0].children.map((chiid: any) => chiid.key)
      );

      // function flattenChildrenArray(
      //   removed_parent_children_array_of_array: any
      // ) {
      //   let removed_parent_children_array: any[] = [];

      //   removed_parent_children_array_of_array.forEach((item: any) => {
      //     if (Array.isArray(item)) {
      //       removed_parent_children_array =
      //         removed_parent_children_array.concat(flattenChildrenArray(item));
      //     } else {
      //       removed_parent_children_array.push(item);
      //     }
      //   });

      //   return removed_parent_children_array;
      // }

      // Example usage
      const removed_parent_children_array = flattenArray(
        removed_parent_children_array_of_array
      );

      console.log(
        "removed_parent_children_array",
        removed_parent_children_array
      );

      console.log(
        "searchData.title_department_sub_role",
        searchData.title_department_sub_role
      );

      const removed_parent_children_key_array: any[] =
        searchData.title_department_sub_role.filter(
          (item: any) => !removed_parent_children_array.includes(item)
        );

      console.log(
        "removed_parent_children_key_array",
        removed_parent_children_key_array
      );

      // const unique_removed_parent_children_key_array =
      //   removed_parent_children_key_array.map((item: any) => item.key);

      // console.log(
      //   "unique_removed_parent_children_key_array",
      //   unique_removed_parent_children_key_array
      // );

      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        title_department: updatedDepartmentParentTitles,
        title_department_sub_role: removed_parent_children_key_array,
      }));
    }
  };

  const onClickJobTitleFilter = (event: any) => {
    event.stopPropagation();
    setSearchData((prevSearchData: any) => {
      const updatedExistFields = prevSearchData.exist_fields.filter((field: any) => field !== "job_title");
      const updatedNotExistFields = prevSearchData.not_exist_fields.filter((field: any) => field !== "job_title");

      return {
        ...prevSearchData,
        person_titles: [],
        person_not_titles: [],
        person_past_titles: [],
        title_is_boolean: "",
        title_management_level: [],
        title_department: [],
        title_department_sub_role: [],
        exist_fields: updatedExistFields,
        not_exist_fields: updatedNotExistFields,
      };
    });

  };

  const onClickJTFSelOpt = (event: any) => {
    event.stopPropagation();
  };

  const [isMouseJTF, setIsMouseJTF] = React.useState(false);
  const onMouseOverJTF = () => {
    setIsMouseJTF(true);
  };

  const onMouseOutJTF = () => {
    setIsMouseJTF(false);
  };

  const onClickRemoveBoolean = () => {
    setSearchData((prevSearchData: any) => ({
      ...prevSearchData,
      title_is_boolean: "",
    }));
  };

  const [searchData, setSearchData] = useContext(Store);

  const department_titles_payload_array = searchData.title_department;

  const department_titles_payload_parent_array =
    department_titles_payload_array.map((item: any) =>
      checkboxData.filter((parent: any) => parent.key === item)
    );

  // console.log(
  //   "department_titles_payload_parent_array",
  //   department_titles_payload_parent_array
  // );

  const department_titles_payload_children_array_of_array =
    department_titles_payload_parent_array.map((item: any) =>
      item[0].children.map((chiid: any) => chiid.key)
    );

  function flattenArray(
    department_titles_payload_children_array_of_array: any
  ) {
    let department_titles_payload_children_array: any[] = [];

    department_titles_payload_children_array_of_array.forEach((item: any) => {
      if (Array.isArray(item)) {
        department_titles_payload_children_array =
          department_titles_payload_children_array.concat(flattenArray(item));
      } else {
        department_titles_payload_children_array.push(item);
      }
    });

    return department_titles_payload_children_array;
  }

  // Example usage
  const department_titles_payload_children_array = flattenArray(
    department_titles_payload_children_array_of_array
  );

  return (
    <Stack sx={{ width: "100%" }}>
      <Stack
        sx={{
          width: "100%",
          borderBottom: "1px solid",
          borderBottomColor: styles.borderBottomColor,
          color: styles.blackcolor,
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
            <ArticleOutlinedIcon
              sx={{
                fontSize: "24px",

                paddingLeft: "8px",
              }}
            />
            <Typography
              variant="body1"
              className="menu-title"
            >
              Job Titles
            </Typography>
          </Stack>

          <Stack sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
            {searchData.person_titles.length +
              searchData.person_not_titles.length +
              searchData.person_past_titles.length +
              searchData.title_management_level.length +
              (searchData.exist_fields.length && searchData.exist_fields.includes("job_title") ? 1 : 0)
              + (searchData.not_exist_fields.length && searchData.not_exist_fields.includes("job_title") ? 1 : 0) +
              // (searchData.title_department.length === 0
              //   ? searchData.title_department_sub_role.length
              //   : searchData.title_department.length)
              (searchData.title_department_sub_role.length +
                searchData.title_department.length -
                department_titles_payload_children_array.length) ===
              0 + searchData.title_is_boolean.length ? (
              <></>
            ) : (
              <>
                <Stack
                  sx={{ display: "flex", flexDirection: "row", gap: "5px" }}
                >
                  <Stack
                    onClick={onClickJobTitleFilter}
                    onMouseOver={onMouseOverJTF}
                    onMouseOut={onMouseOutJTF}
                 className="filter-child-num-con"
                  >
                    <CloseIcon
                      sx={{
                        color: isMouseJTF ? styles.primaryTextColor : "#737373",
                        fontSize: "16px",
                      }}
                    />
                    <Typography
                      sx={{
                        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        fontSize: "12px",
                        fontWeight: "600",
                        color: isMouseJTF
                          ? styles.primaryTextColor
                          : styles.blackcolor,
                      }}
                    >
                      {searchData.person_titles.length +
                        searchData.person_not_titles.length +
                        searchData.person_past_titles.length +
                        searchData.title_management_level.length +
                        (searchData.exist_fields.length && searchData.exist_fields.includes("job_title") ? 1 : 0)
                        + (searchData.not_exist_fields.length && searchData.not_exist_fields.includes("job_title") ? 1 : 0) +
                        (searchData.title_department_sub_role.length +
                          searchData.title_department.length -
                          department_titles_payload_children_array.length) +
                        (searchData.title_is_boolean &&
                          searchData.title_is_boolean.length
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
        {searchData.person_titles.length ? (
          <>
            <Stack
              onClick={onClickJTFSelOpt}
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
                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#000000",
                  marginRight: "22px",
                }}
              >
                Title:
              </Typography>
              {searchData.person_titles.map((title: any, index: any) => (
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
                      fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#ffffff",
                    }}
                  >
                    {title}
                  </Typography>
                  <CloseIcon
                    onClick={() => removeElement(index)}
                    sx={{ color: "#ffffff", fontSize: "small" }}
                  />
                </Stack>
              ))}
            </Stack>
          </>
        ) : (
          <></>
        )}

        {searchData.person_not_titles.length ? (
          <>
            <Stack
              onClick={onClickJTFSelOpt}
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
                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#000000",
                  marginRight: "22px",
                }}
              >
                Person Not In Title:
              </Typography>
              {searchData.person_not_titles.map((title: any, index: any) => (
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
                      fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#ffffff",
                    }}
                  >
                    {title}
                  </Typography>
                  <CloseIcon
                    onClick={() => removeElementNot(index)}
                    sx={{ color: "#ffffff", fontSize: "small" }}
                  />
                </Stack>
              ))}
            </Stack>
          </>
        ) : (
          <></>
        )}

        {searchData.person_past_titles.length ? (
          <>
            <Stack
              onClick={onClickJTFSelOpt}
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
                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#000000",
                  marginRight: "22px",
                }}
              >
                Person Past Title:
              </Typography>
              {searchData.person_past_titles.map((title: any, index: any) => (
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
                      fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#ffffff",
                    }}
                  >
                    {title}
                  </Typography>
                  <CloseIcon
                    onClick={() => removeElementPast(index)}
                    sx={{ color: "#ffffff", fontSize: "small" }}
                  />
                </Stack>
              ))}
            </Stack>
          </>
        ) : (
          <></>
        )}

        {searchData.title_is_boolean !== "" ? (
          <Stack
            // onClick={onClickNameFiltSelOpt}
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
                fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                fontSize: "12px",
                fontWeight: "600",
                color: "#000000",
                marginRight: "22px",
              }}
            >
              Title Boolean Query:
            </Typography>
            <Stack
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
                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#ffffff",
                }}
              >
                {searchData.title_is_boolean}
              </Typography>
              <CloseIcon
                sx={{ color: "#ffffff", fontSize: "small" }}
                onClick={onClickRemoveBoolean}
              />
            </Stack>
          </Stack>
        ) : (
          <></>
        )}
        {searchData.title_management_level.length ? (
          <>
            <Stack
              onClick={onClickJTFSelOpt}
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
                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#000000",
                  marginRight: "22px",
                }}
              >
                Management Level:
              </Typography>
              {searchData.title_management_level.map(
                (level: any, index: any) => (
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
                        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        fontSize: "12px",
                        fontWeight: "600",
                        color: "#ffffff",
                      }}
                    >
                      {level}
                    </Typography>
                    <CloseIcon
                      onClick={() => removeElementManagementLevel(index)}
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

        {searchData.title_department.length === 0 &&
          searchData.title_department_sub_role.length === 0 ? (
          <></>
        ) : (
          <>
            <Stack
              onClick={onClickJTFSelOpt}
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
                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#000000",
                  marginRight: "22px",
                }}
              >
                Department :
              </Typography>
              <>
                <>
                  {searchData.title_department.map((label: any, index: any) => (
                    <Stack
                      key={index}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
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
                          fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "#ffffff",
                        }}
                      >
                        {label}
                      </Typography>

                      <CloseIcon
                        onClick={() => removeDepartmentParentElement(index)}
                        sx={{
                          color: "#ffffff",
                          fontSize: "16px",
                        }}
                      />
                    </Stack>
                  ))}
                </>

                <>
                  {searchData.title_department_sub_role.map(
                    (label: any, index: any) =>
                      !department_titles_payload_children_array.includes(
                        label
                      ) && (
                        <Stack
                          key={index}
                          sx={{
                            display: "flex",
                            flexDirection: "row",
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
                              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              fontSize: "12px",
                              fontWeight: "600",
                              color: "#ffffff",
                            }}
                          >
                            {label}
                          </Typography>

                          <CloseIcon
                            onClick={() => removeDepartmentElement(index)}
                            sx={{
                              color: "#ffffff",
                              fontSize: "16px",
                            }}
                          />
                        </Stack>
                      )
                  )}
                </>
              </>
            </Stack>
          </>
        )}


        {(searchData.exist_fields.length && searchData.exist_fields.includes("job_title")) ? (<>
          <Stack
            onClick={onClickJTFSelOpt}
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
                fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                fontSize: "12px",
                fontWeight: "600",
                color: "#000000",
                marginRight: "22px",
              }}
            >
              Title:
            </Typography>
            {searchData.exist_fields
              .filter((field: any) => field === "job_title")
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
                      fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
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
          </Stack></>) : (<></>)}

        {(searchData.not_exist_fields && searchData.not_exist_fields.includes("job_title")) ? (<>
          <Stack
            onClick={onClickJTFSelOpt}
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
                fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                fontSize: "12px",
                fontWeight: "600",
                color: "#000000",
                marginRight: "22px",
              }}
            >
              Title:
            </Typography>
            {searchData.not_exist_fields
              .filter((field: any) => field === "job_title")
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
                      fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
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
          </Stack></>) : (<></>)}
      </Stack>
    </Stack>
  );
};

export default JobTitleClose;
