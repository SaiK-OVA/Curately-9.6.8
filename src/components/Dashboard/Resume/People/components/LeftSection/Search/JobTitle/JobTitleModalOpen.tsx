// import React from "react";
import React, { useContext } from "react";
import { Stack } from "../../../../../../../../shared/modules/MaterialImports/Stack";
import { Typography } from "../../../../../../../../shared/modules/MaterialImports/Typography";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArticleIcon from "@mui/icons-material/Article";
// import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import styles from "./../../../../shared/config/variables.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { ModalStore } from "../../../DataLabs/DataLabs";
import "../Search.scss";

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

const JobTitleModalOpen = () => {
  // const removeElement = (index: any) => {
  //   if (index !== -1) {
  //     const updatedPersonTitles = searchModalData.person_titles;
  //     updatedPersonTitles.splice(index, 1);
  //     setSearchModalData((prevSearchData: any) => ({
  //       ...prevSearchData,
  //       person_titles: updatedPersonTitles,
  //     }));
  //   }
  // };

  // const removeElementNot = (index: any) => {
  //   if (index !== -1) {
  //     const updatedPersonTitles = searchModalData.person_not_titles;
  //     updatedPersonTitles.splice(index, 1);
  //     setSearchModalData((prevSearchData: any) => ({
  //       ...prevSearchData,
  //       person_not_titles: updatedPersonTitles,
  //     }));
  //   }
  // };

  // const removeElementPast = (index: any) => {
  //   if (index !== -1) {
  //     const updatedPersonTitles = searchModalData.person_past_titles;
  //     updatedPersonTitles.splice(index, 1);
  //     setSearchModalData((prevSearchData: any) => ({
  //       ...prevSearchData,
  //       person_past_titles: updatedPersonTitles,
  //     }));
  //   }
  // };

  const onClickJobTitleFilter = () =>
    // event: any
    {
      // event.stopPropagation();
      setSearchModalData((prevSearchData: any) => {
        const updatedExistFields = prevSearchData.exist_fields.filter(
          (field: any) => field !== "job_title"
        );
        const updatedNotExistFields = prevSearchData.not_exist_fields.filter(
          (field: any) => field !== "job_title"
        );

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

  // const onClickJTFSelOpt = (event: any) => {
  //   event.stopPropagation();
  // };

  const [isMouseJTF, setIsMouseJTF] = React.useState(false);
  const onMouseOverJTF = () => {
    setIsMouseJTF(true);
  };

  const onMouseOutJTF = () => {
    setIsMouseJTF(false);
  };

  const [searchModalData, setSearchModalData] = useContext(ModalStore);

  const department_titles_payload_array = searchModalData.title_department;

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
            <ArticleIcon
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
              Job Titles
            </Typography>
          </Stack>
          <Stack sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
            {(searchModalData.title_is_boolean ? 1 : 0) +
              searchModalData.person_titles.length +
              searchModalData.person_not_titles.length +
              searchModalData.person_past_titles.length +
              searchModalData.title_management_level.length +
              // (searchModalData.title_department.length === 0
              //   ? searchModalData.title_department_sub_role.length
              //   : searchModalData.title_department.length)
              (searchModalData.exist_fields.length &&
              searchModalData.exist_fields.includes("job_title")
                ? 1
                : 0) +
              (searchModalData.not_exist_fields.length &&
              searchModalData.not_exist_fields.includes("job_title")
                ? 1
                : 0) +
              (searchModalData.title_department_sub_role.length +
                searchModalData.title_department.length -
                department_titles_payload_children_array.length) ===
            0 ? (
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
                        fontFamily:
                          'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        fontSize: "12px",
                        fontWeight: "600",
                        color: isMouseJTF
                          ? styles.primaryTextColor
                          : styles.blackcolor,
                      }}
                    >
                      {(searchModalData.title_is_boolean ? 1 : 0) +
                        searchModalData.person_titles.length +
                        searchModalData.person_not_titles.length +
                        searchModalData.person_past_titles.length +
                        searchModalData.title_management_level.length +
                        (searchModalData.exist_fields.length &&
                        searchModalData.exist_fields.includes("job_title")
                          ? 1
                          : 0) +
                        (searchModalData.not_exist_fields.length &&
                        searchModalData.not_exist_fields.includes("job_title")
                          ? 1
                          : 0) +
                        (searchModalData.title_department_sub_role.length +
                          searchModalData.title_department.length -
                          department_titles_payload_children_array.length)}
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

export default JobTitleModalOpen;
