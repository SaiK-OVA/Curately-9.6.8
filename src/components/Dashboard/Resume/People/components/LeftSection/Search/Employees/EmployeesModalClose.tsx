import {React} from "../../../../../../../../shared/modules/React";
import { useContext } from "react";
// import { Box, Button, Card, Stack, TextField, Typography } from "../../../../../../../../shared/modules/MaterialImports/Stack";
import { Stack} from "../../../../../../../../shared/modules/MaterialImports/Stack";
import {Typography } from "../../../../../../../../shared/modules/MaterialImports/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
// import ArticleIcon from "@mui/icons-material/Article";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import styles from "./../../../../shared/config/variables.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { ModalStore } from "../../../DataLabs/DataLabs";
import '../Search.scss'

const EmployeesModalClose = () => {
    const [searchModalData, setSearchModalData] = useContext(ModalStore);

    const onClickEmployeesFilter = (event: any) => {
        event.stopPropagation();
        setSearchModalData((prevSearchData: any) => ({
            ...prevSearchData,
            no_of_employees: [],
            min: "",
            max: "",
        }));
    };

    const onClickEmployeesFiltSelOpt = (event: any) => {
        event.stopPropagation();
    };

    const [isMouseEmployeesFilt, setIsMouseEmployeesFilt] = React.useState(false);
    const onMouseOverEmployeesFilt = () => {
        setIsMouseEmployeesFilt(true);
    };

    const onMouseOutEmployeesFilt = () => {
        setIsMouseEmployeesFilt(false);
    };

    const count_of_no_of_employees = searchModalData.no_of_employees.length;

    const onClickRemoveItem = (index: any) => {
        if (index !== -1) {
            const updatedNoOfEmp = searchModalData.no_of_employees;
            updatedNoOfEmp.splice(index, 1);
            setSearchModalData((prevSearchData: any) => ({
                ...prevSearchData,
                no_of_employees: updatedNoOfEmp,
                min: "",
                max: "",
            }));
        }
    };

    return (
        <Stack sx={{ width: "100%" }}>
            <Stack
                sx={{
                    width: "100%",
                    border: "1px solid transparent",
                    color: styles.blackcolor,
                    borderBottomColor: styles.borderBottomColor,
                    "&:hover": {
                        cursor: "pointer",
                        backgroundColor: styles.backGroundColorOnHover,
                        color: styles.primaryTextColor,
                        border: '1px solid #146EF6'
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

                                paddingLeft: "8px",
                            }}
                        />
                        <Typography
                            variant="body1"
                            className="menu-title"
                        >
                            # Employees
                        </Typography>
                    </Stack>
                    <Stack sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
                        {searchModalData.no_of_employees.length !== 0 && (
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

                        <ArrowDropDownIcon sx={{ color: styles.arrowDropDownColor }} />
                    </Stack>
                </Stack>
                <Stack
                    onClick={onClickEmployeesFiltSelOpt}
                    sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
                >
                    {searchModalData.no_of_employees.map((item: string, index: any) => (
                        <Stack
                            key={index}
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                backgroundColor: "#ffffff !important",
                                paddingTop: "6px",
                                paddingLeft: "22.83px",
                                paddingBottom: "14px",
                            }}
                        >
                            {/* <Typography
            sx={{
              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
              fontSize: "12px",
              fontWeight: "600",
              color: "#000000",
              marginRight: "22px",
            }}
          >
            Employees:
          </Typography> */}
                            <Stack
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: "2px 7px",
                                    backgroundColor: "#919191",
                                    gap: "10px",
                                    // width: "80px",
                                    height: "20px",
                                    borderRadius: "2px",
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
                                    {item}
                                </Typography>
                                <CloseIcon
                                    onClick={() => onClickRemoveItem(index)}
                                    sx={{ color: "#ffffff", fontSize: "small" }}
                                />
                            </Stack>
                        </Stack>
                    ))}
                </Stack>
            </Stack>
        </Stack>
    );
};

export default EmployeesModalClose;
