import {React} from "../../../../../../../../shared/modules/React";
import { useContext } from "react";
// import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
import { Stack } from "../../../../../../../../shared/modules/MaterialImports/Stack";
import { Typography } from "../../../../../../../../shared/modules/MaterialImports/Typography";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
// import ArticleIcon from "@mui/icons-material/Article";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import styles from "./../../../../shared/config/variables.module.scss";
import { Store } from "../../../DataLabs/DataLabs";
import CloseIcon from "@mui/icons-material/Close";
import '../Search.scss'

const EmployeesOpen = () => {
  const [searchData, setSearchData] = useContext(Store);

  const onClickEmployeesFilter = (
    // event: any
  ) => {
    // event.stopPropagation();

    setSearchData((prevSearchData: any) => {

      const updatedNotExistFields = prevSearchData.not_exist_fields.filter(
        (field: any) => field !== "employees"
      );

      return {
        ...prevSearchData,
        no_of_employees: [],
        min: "",
        max: "",
        not_exist_fields: updatedNotExistFields,
      };
    });
  };

  // const onClickEmployeesFiltSelOpt = (event: any) => {
  //   event.stopPropagation();
  // };

  const [isMouseEmployeesFilt, setIsMouseEmployeesFilt] = React.useState(false);
  const onMouseOverEmployeesFilt = () => {
    setIsMouseEmployeesFilt(true);
  };

  const onMouseOutEmployeesFilt = () => {
    setIsMouseEmployeesFilt(false);
  };

  const count_of_no_of_employees = searchData.no_of_employees.length + (searchData.not_exist_fields.length &&
    searchData.not_exist_fields.includes("employees") ? 1 : 0);


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
            direction="row"
          >
            <PeopleAltOutlinedIcon
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
              # Employees
            </Typography>
          </Stack>
          <Stack sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
            {(searchData.no_of_employees.length !== 0 || (searchData.not_exist_fields.length !== 0 &&
              searchData.not_exist_fields.includes("employees"))) && (
                <Stack
                  onClick={onClickEmployeesFilter}
                  onMouseOver={onMouseOverEmployeesFilt}
                  onMouseOut={onMouseOutEmployeesFilt}
                 className="filter-child-num-con"
                >
                  <CloseIcon
                    sx={{
                      color: isMouseEmployeesFilt
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
                      color: isMouseEmployeesFilt
                        ? styles.primaryTextColor
                        : styles.blackcolor,
                    }}
                  >
                    {count_of_no_of_employees}
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

export default EmployeesOpen;
